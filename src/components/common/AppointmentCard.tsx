import React from 'react';
import { Calendar, Clock, MapPin, Video, UserCheck, AlertCircle, FileText, RefreshCw, XCircle } from 'lucide-react';
import { Appointment } from '../../types';
import { formatDate, formatCurrency, getStatusBadgeStyle } from '../../utils/formatters';

interface AppointmentCardProps {
  appointment: Appointment;
  onReschedule?: (apt: Appointment) => void;
  onCancel?: (apt: Appointment) => void;
  onViewPrescription?: (apt: Appointment) => void;
  onViewReport?: (apt: Appointment) => void;
  isDoctorView?: boolean;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onReschedule,
  onCancel,
  onViewPrescription,
  onViewReport,
  isDoctorView = false,
}) => {
  const badge = getStatusBadgeStyle(appointment.status);

  return (
    <div className="glass-card rounded-3xl p-6 border border-black/5 hover:border-black/10 transition-all shadow-card space-y-4">
      {/* Top Bar: Date/Time & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-black/5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#0F3040]/15 text-[#1F2937] rounded-2xl flex items-center justify-center">
            <Calendar className="w-5 h-5 text-[#0F3040]" />
          </div>
          <div>
            <h4 className="font-bold text-[#1F2937] text-base">{formatDate(appointment.date)}</h4>
            <div className="flex items-center gap-2 text-xs text-[#6B7280] font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>{appointment.timeSlot}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                {appointment.type === 'video_consult' ? (
                  <>
                    <Video className="w-3.5 h-3.5 text-blue-600" /> Video Consult
                  </>
                ) : (
                  <>
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Clinic Visit
                  </>
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 text-xs font-bold rounded-full border ${badge.bg} ${badge.text} ${badge.border}`}
          >
            {badge.label}
          </span>
        </div>
      </div>

      {/* Main Info: Doctor or Patient */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={
              isDoctorView
                ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
                : appointment.doctorAvatar
            }
            alt={isDoctorView ? appointment.patientName : appointment.doctorName}
            className="w-12 h-12 rounded-2xl object-cover border border-black/10"
          />
          <div>
            <h5 className="font-bold text-[#1F2937] text-sm">
              {isDoctorView ? appointment.patientName : appointment.doctorName}
            </h5>
            <p className="text-xs text-[#6B7280]">
              {isDoctorView ? `Phone: ${appointment.patientPhone}` : appointment.doctorTitle}
            </p>
            <p className="text-[11px] text-[#0F3040] font-semibold">
              {appointment.clinicName}
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] uppercase text-[#6B7280] font-bold">Consultation Fee</span>
          <p className="text-base font-bold text-[#1F2937]">{formatCurrency(appointment.fee)}</p>
        </div>
      </div>

      {/* Symptoms Reason */}
      {appointment.symptomsReason && (
        <div className="p-3 bg-[#F8F7F5] rounded-2xl text-xs text-[#6B7280] border border-black/5">
          <span className="font-semibold text-[#1F2937]">Note/Reason: </span>
          {appointment.symptomsReason}
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-3 border-t border-black/5 flex flex-wrap items-center justify-between gap-2">
        <div className="text-[11px] text-[#6B7280]">
          Ref ID: <span className="font-mono text-[#1F2937]">{appointment.id}</span>
        </div>

        <div className="flex items-center gap-2">
          {appointment.status === 'upcoming' && (
            <>
              {onReschedule && (
                <button
                  onClick={() => onReschedule(appointment)}
                  className="px-3 py-1.5 text-xs font-semibold text-[#1F2937] bg-white border border-black/10 rounded-xl hover:bg-black/5 transition-colors flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#0F3040]" /> Reschedule
                </button>
              )}
              {onCancel && (
                <button
                  onClick={() => onCancel(appointment)}
                  className="px-3 py-1.5 text-xs font-semibold text-[#C62828] bg-red-50 border border-red-100 rounded-xl hover:bg-red-100 transition-colors flex items-center gap-1"
                >
                  <XCircle className="w-3.5 h-3.5" /> Cancel
                </button>
              )}
            </>
          )}

          {appointment.status === 'completed' && (
            <>
              {onViewPrescription && (
                <button
                  onClick={() => onViewPrescription(appointment)}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0F3040] rounded-xl hover:bg-[#D99B7F] transition-colors flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" /> Prescription
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
