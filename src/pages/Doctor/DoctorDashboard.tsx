import React, { useState } from 'react';
import {
  Users,
  Calendar,
  DollarSign,
  Star,
  Clock,
  Plus,
  FileText,
  CheckCircle2,
  Video,
  MapPin,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/common/StatCard';
import { Modal } from '../../components/common/Modal';
import { formatDate, formatCurrency } from '../../utils/formatters';

export const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { appointments, addPrescription } = useData();

  // Filter doctor's appointments
  const docAppointments = appointments.filter((a) => a.doctorId === 'doc-1' || a.doctorId === user?.doctorProfileId);
  const todayAppointments = docAppointments.filter((a) => a.status === 'upcoming');

  const [prescriptionModalOpen, setPrescriptionModalOpen] = useState(false);
  const [selectedPatientApt, setSelectedPatientApt] = useState<any>(null);

  // Rx Form
  const [diagnosis, setDiagnosis] = useState('');
  const [medName, setMedName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('Daily after meals');
  const [duration, setDuration] = useState('14 Days');
  const [notes, setNotes] = useState('');

  const handleOpenRxModal = (apt: any) => {
    setSelectedPatientApt(apt);
    setPrescriptionModalOpen(true);
  };

  const handleCreateRx = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPatientApt) {
      addPrescription({
        appointmentId: selectedPatientApt.id,
        patientId: selectedPatientApt.patientId,
        doctorId: selectedPatientApt.doctorId,
        doctorName: selectedPatientApt.doctorName,
        doctorSpecialty: selectedPatientApt.doctorSpecialty,
        date: new Date().toISOString().split('T')[0],
        diagnosis,
        medicines: [
          {
            name: medName,
            dosage,
            frequency,
            duration,
            instructions: 'Take as prescribed with water.',
          },
        ],
        notes,
      });
      setPrescriptionModalOpen(false);
      setDiagnosis('');
      setMedName('');
      setDosage('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-black/10 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs uppercase font-bold tracking-wider text-[#0F3040]">Doctor Portal</span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#1F2937]">
            Dr. Eleanor Vance 🩺
          </h1>
          <p className="text-xs text-[#6B7280]">
            St. Jude Heart Institute • Department of Cardiology & Electrophysiology
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-4 py-2 bg-[#2E7D32]/10 border border-[#2E7D32]/20 text-[#2E7D32] text-xs font-bold rounded-full flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse" /> Clinic Active & Receiving Patients
          </span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Today's Appointments"
          value={todayAppointments.length}
          icon={Calendar}
          subtext="Scheduled visits for today"
        />
        <StatCard
          title="Total Patients Treated"
          value="142"
          icon={Users}
          subtext="+12 new patients this week"
        />
        <StatCard
          title="Monthly Revenue"
          value="$18,450"
          icon={DollarSign}
          subtext="Consultation & lab referrals"
        />
        <StatCard
          title="Patient Rating"
          value="4.95 ★"
          icon={Star}
          subtext="Based on 142 reviews"
        />
      </div>

      {/* Today's Schedule Queue */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-black/5 shadow-card space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-xl text-[#1F2937]">Today's Patient Queue</h3>
            <p className="text-xs text-[#6B7280]">Real-time patient check-ins and scheduled slots.</p>
          </div>
          <span className="text-xs font-bold text-[#0F3040]">
            {todayAppointments.length} Patients Pending
          </span>
        </div>

        <div className="space-y-4">
          {todayAppointments.map((apt) => (
            <div
              key={apt.id}
              className="p-5 bg-white/80 rounded-2xl border border-black/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#0F3040]/15 text-[#0F3040] rounded-2xl font-mono font-bold text-xs shrink-0">
                  {apt.timeSlot}
                </div>
                <div>
                  <h4 className="font-bold text-[#1F2937] text-sm">{apt.patientName}</h4>
                  <p className="text-[#6B7280]">{apt.patientPhone} • {apt.patientEmail}</p>
                  <p className="text-[11px] text-[#6B7280] pt-1">
                    <strong className="text-[#1F2937]">Reason: </strong> {apt.symptomsReason}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 font-bold rounded-full text-[11px] flex items-center gap-1">
                  {apt.type === 'video_consult' ? <Video className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                  {apt.type.replace('_', ' ')}
                </span>
                <button
                  onClick={() => handleOpenRxModal(apt)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#0F3040] rounded-xl hover:bg-[#D99B7F] transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" /> Issue Prescription
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prescription Issue Modal */}
      <Modal
        isOpen={prescriptionModalOpen}
        onClose={() => setPrescriptionModalOpen(false)}
        title={`Issue Digital Prescription - ${selectedPatientApt?.patientName}`}
      >
        <form onSubmit={handleCreateRx} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1F2937]">Clinical Diagnosis</label>
            <input
              type="text"
              required
              placeholder="e.g. Mild Hypertension & Sinus Tachycardia"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="w-full p-2.5 text-xs bg-white border border-black/10 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1F2937]">Medication Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Lisinopril"
                value={medName}
                onChange={(e) => setMedName(e.target.value)}
                className="w-full p-2.5 text-xs bg-white border border-black/10 rounded-xl"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1F2937]">Dosage</label>
              <input
                type="text"
                required
                placeholder="e.g. 10mg"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="w-full p-2.5 text-xs bg-white border border-black/10 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1F2937]">Frequency</label>
              <input
                type="text"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full p-2.5 text-xs bg-white border border-black/10 rounded-xl"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1F2937]">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full p-2.5 text-xs bg-white border border-black/10 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1F2937]">Lifestyle / Dietary Instructions</label>
            <textarea
              rows={3}
              placeholder="e.g. Reduce daily sodium intake below 2,000mg..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2.5 text-xs bg-white border border-black/10 rounded-xl"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-xs font-bold text-white bg-[#0F3040] rounded-xl hover:bg-[#D99B7F]"
          >
            Save & Sync Digital Prescription
          </button>
        </form>
      </Modal>
    </div>
  );
};
