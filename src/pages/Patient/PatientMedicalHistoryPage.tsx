import React from 'react';
import { Clock, Calendar, FileText, Activity, ShieldCheck, Stethoscope } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { formatDate } from '../../utils/formatters';

export const PatientMedicalHistoryPage: React.FC = () => {
  const { user } = useAuth();
  const { appointments, prescriptions, reports } = useData();

  const userAppointments = appointments.filter((a) => a.patientId === (user?.id || 'patient-1'));
  const userPrescriptions = prescriptions.filter((p) => p.patientId === (user?.id || 'patient-1'));
  const userReports = reports.filter((r) => r.patientId === (user?.id || 'patient-1'));

  // Merge events chronologically
  const timelineEvents = [
    ...userAppointments.map((a) => ({
      id: a.id,
      date: a.date,
      title: `Consultation with ${a.doctorName}`,
      subtitle: a.doctorSpecialty,
      type: 'appointment' as const,
      details: a.symptomsReason,
      status: a.status,
    })),
    ...userPrescriptions.map((p) => ({
      id: p.id,
      date: p.date,
      title: `Prescription Issued: ${p.diagnosis}`,
      subtitle: `By ${p.doctorName}`,
      type: 'prescription' as const,
      details: p.medicines.map((m) => m.name).join(', '),
      status: 'active',
    })),
    ...userReports.map((r) => ({
      id: r.id,
      date: r.date,
      title: `Lab Report: ${r.title}`,
      subtitle: r.type,
      type: 'report' as const,
      details: r.summary,
      status: r.status,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="space-y-2">
        <span className="text-xs uppercase font-bold tracking-wider text-[#0F3040]">Patient Records</span>
        <h1 className="font-display text-3xl font-bold text-[#1F2937]">Medical Consultation Timeline</h1>
        <p className="text-xs text-[#6B7280]">
          Comprehensive longitudinal medical history tracking past appointments, prescriptions, and lab tests.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-black/10 shadow-card relative">
        <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-[#0F3040]/30 hidden sm:block" />

        <div className="space-y-8 sm:pl-12">
          {timelineEvents.map((evt) => (
            <div key={evt.id} className="relative group">
              {/* Timeline Bullet */}
              <div className="absolute -left-[3.25rem] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-[#0F3040] hidden sm:flex items-center justify-center text-[#0F3040] shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#0F3040]" />
              </div>

              <div className="glass-card p-5 rounded-2xl border border-black/5 hover:border-black/10 transition-all space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#6B7280]">
                  <span className="font-bold text-[#0F3040] uppercase tracking-wider text-[10px]">{evt.type}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {formatDate(evt.date)}</span>
                </div>

                <h4 className="font-bold text-[#1F2937] text-sm">{evt.title}</h4>
                <p className="text-[#6B7280] font-medium">{evt.subtitle}</p>
                <p className="text-[#6B7280] pt-1">{evt.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
