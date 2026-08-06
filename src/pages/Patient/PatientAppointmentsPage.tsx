import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Appointment, AppointmentStatus } from '../../types';
import { AppointmentCard } from '../../components/common/AppointmentCard';
import { Modal } from '../../components/common/Modal';
import { EmptyState } from '../../components/common/EmptyState';
import { Calendar, RefreshCw, XCircle, FileText, CheckCircle2 } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export const PatientAppointmentsPage: React.FC = () => {
  const { user } = useAuth();
  const { appointments, cancelAppointment, rescheduleAppointment, prescriptions } = useData();

  const [activeTab, setActiveTab] = useState<AppointmentStatus | 'all'>('upcoming');

  // Modal States
  const [selectedApt, setSelectedApt] = useState<Appointment | null>(null);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [prescriptionModalOpen, setPrescriptionModalOpen] = useState(false);

  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('11:00 AM');
  const [cancelReason, setCancelReason] = useState('');

  const patientAppointments = appointments.filter((a) => a.patientId === (user?.id || 'patient-1'));

  const filtered = patientAppointments.filter((a) => {
    if (activeTab === 'all') return true;
    return a.status === activeTab;
  });

  const handleOpenReschedule = (apt: Appointment) => {
    setSelectedApt(apt);
    setNewDate(apt.date);
    setNewTime(apt.timeSlot);
    setRescheduleModalOpen(true);
  };

  const handleConfirmReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedApt && newDate) {
      rescheduleAppointment(selectedApt.id, newDate, newTime);
      setRescheduleModalOpen(false);
    }
  };

  const handleOpenCancel = (apt: Appointment) => {
    setSelectedApt(apt);
    setCancelReason('');
    setCancelModalOpen(true);
  };

  const handleConfirmCancel = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedApt) {
      cancelAppointment(selectedApt.id, cancelReason);
      setCancelModalOpen(false);
    }
  };

  const handleViewPrescription = (apt: Appointment) => {
    setSelectedApt(apt);
    setPrescriptionModalOpen(true);
  };

  const activeRx = selectedApt ? prescriptions.find((p) => p.appointmentId === selectedApt.id) || prescriptions[0] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs uppercase font-bold tracking-wider text-[#0F3040]">Patient Portal</span>
        <h1 className="font-display text-3xl font-bold text-[#1F2937]">My Consultation Schedule</h1>
        <p className="text-xs text-[#6B7280]">
          Manage upcoming appointments, view consultation history, or download medical prescriptions.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-black/5 pb-2">
        {(['upcoming', 'completed', 'cancelled', 'all'] as const).map((tab) => {
          const count =
            tab === 'all'
              ? patientAppointments.length
              : patientAppointments.filter((a) => a.status === tab).length;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all capitalize ${
                activeTab === tab
                  ? 'bg-[#0F3040] text-white shadow-soft'
                  : 'bg-white/70 text-[#6B7280] hover:text-[#1F2937]'
              }`}
            >
              {tab} ({count})
            </button>
          );
        })}
      </div>

      {/* Appointments List */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title={`No ${activeTab} appointments found`}
          description="You do not have any registered consultation entries under this filter category."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((apt) => (
            <AppointmentCard
              key={apt.id}
              appointment={apt}
              onReschedule={handleOpenReschedule}
              onCancel={handleOpenCancel}
              onViewPrescription={handleViewPrescription}
            />
          ))}
        </div>
      )}

      {/* RESCHEDULE MODAL */}
      <Modal
        isOpen={rescheduleModalOpen}
        onClose={() => setRescheduleModalOpen(false)}
        title="Reschedule Appointment"
      >
        <form onSubmit={handleConfirmReschedule} className="space-y-4">
          <p className="text-xs text-[#6B7280]">
            Selecting a new consultation date and time slot for <strong>{selectedApt?.doctorName}</strong>.
          </p>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1F2937]">New Date</label>
            <input
              type="date"
              required
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full p-2.5 text-xs bg-white border border-black/10 rounded-xl"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1F2937]">New Time Slot</label>
            <select
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full p-2.5 text-xs bg-white border border-black/10 rounded-xl"
            >
              <option value="09:00 AM">09:00 AM</option>
              <option value="10:30 AM">10:30 AM</option>
              <option value="01:30 PM">01:30 PM</option>
              <option value="03:00 PM">03:00 PM</option>
              <option value="04:30 PM">04:30 PM</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-xs font-bold text-white bg-[#0F3040] rounded-xl hover:bg-[#D99B7F]"
          >
            Confirm New Schedule
          </button>
        </form>
      </Modal>

      {/* CANCEL MODAL */}
      <Modal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        title="Cancel Appointment"
      >
        <form onSubmit={handleConfirmCancel} className="space-y-4">
          <p className="text-xs text-[#C62828] font-semibold">
            Are you sure you want to cancel your appointment with {selectedApt?.doctorName}?
          </p>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1F2937]">Reason for Cancellation (Optional)</label>
            <textarea
              rows={3}
              placeholder="Schedule conflict, feeling better, etc."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full p-3 text-xs bg-white border border-black/10 rounded-xl"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-xs font-bold text-white bg-[#C62828] rounded-xl hover:bg-red-800"
          >
            Confirm Cancellation
          </button>
        </form>
      </Modal>

      {/* PRESCRIPTION VIEW MODAL */}
      <Modal
        isOpen={prescriptionModalOpen}
        onClose={() => setPrescriptionModalOpen(false)}
        title="Digital Prescription Pass"
        maxWidth="max-w-2xl"
      >
        {activeRx ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-black/5 pb-4">
              <div>
                <h4 className="font-display font-bold text-base text-[#1F2937]">{activeRx.doctorName}</h4>
                <p className="text-xs text-[#0F3040]">{activeRx.doctorSpecialty}</p>
              </div>
              <div className="text-right text-xs">
                <span className="text-[#6B7280]">Date:</span>
                <p className="font-bold text-[#1F2937]">{formatDate(activeRx.date)}</p>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-black/5 text-xs">
              <span className="font-bold text-[#1F2937]">Diagnosis: </span>
              <span className="text-[#6B7280]">{activeRx.diagnosis}</span>
            </div>

            <div className="space-y-3">
              <h5 className="font-bold text-xs text-[#1F2937]">Prescribed Medications</h5>
              {activeRx.medicines.map((m, idx) => (
                <div key={idx} className="p-3 bg-white/80 rounded-xl border border-black/5 text-xs space-y-1">
                  <div className="flex justify-between font-bold text-[#1F2937]">
                    <span>{m.name} ({m.dosage})</span>
                    <span className="text-[#0F3040]">{m.duration}</span>
                  </div>
                  <p className="text-[#6B7280]">Frequency: {m.frequency}</p>
                  <p className="text-[11px] text-gray-500 italic">Instructions: {m.instructions}</p>
                </div>
              ))}
            </div>

            {activeRx.notes && (
              <div className="p-3 bg-[#F8F7F5] rounded-xl text-xs text-[#6B7280] border border-black/5">
                <span className="font-bold text-[#1F2937]">Doctor Notes: </span>
                {activeRx.notes}
              </div>
            )}
          </div>
        ) : (
          <p className="text-xs text-[#6B7280]">No prescription data available for this appointment.</p>
        )}
      </Modal>
    </div>
  );
};
