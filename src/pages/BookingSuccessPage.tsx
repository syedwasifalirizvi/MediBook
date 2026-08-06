import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Calendar, Clock, MapPin, Printer, ArrowRight, ShieldCheck } from 'lucide-react';
import { useData } from '../context/DataContext';
import { formatDate, formatCurrency } from '../utils/formatters';

export const BookingSuccessPage: React.FC = () => {
  const { aptId } = useParams<{ aptId: string }>();
  const { appointments } = useData();

  const appointment = appointments.find((a) => a.id === aptId) || appointments[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center space-y-8">
      {/* Success Badge */}
      <div className="w-20 h-20 rounded-full bg-[#2E7D32]/15 text-[#2E7D32] flex items-center justify-center mx-auto shadow-soft animate-bounce">
        <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase font-bold tracking-widest text-[#2E7D32]">Booking Confirmed</span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1F2937]">Appointment Pass Created</h1>
        <p className="text-xs text-[#6B7280] max-w-md mx-auto">
          Your appointment has been successfully booked and synchronized with the doctor's calendar.
        </p>
      </div>

      {/* Printable Digital Pass Card */}
      <div className="glass-panel p-8 rounded-3xl border border-black/10 shadow-float text-left space-y-6 relative overflow-hidden print:border-none print:shadow-none">
        <div className="absolute top-0 right-0 bg-[#0F3040] text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
          Official Digital Pass
        </div>

        {/* Doctor Header */}
        <div className="flex items-center gap-4">
          <img
            src={appointment.doctorAvatar}
            alt={appointment.doctorName}
            className="w-16 h-16 rounded-2xl object-cover border border-black/10"
          />
          <div>
            <h3 className="font-display font-bold text-lg text-[#1F2937]">{appointment.doctorName}</h3>
            <p className="text-xs text-[#6B7280]">{appointment.doctorTitle}</p>
            <span className="text-[11px] font-bold text-[#0F3040]">{appointment.doctorSpecialty}</span>
          </div>
        </div>

        {/* Pass Details */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-white/80 rounded-2xl border border-black/5 text-xs">
          <div>
            <p className="text-[10px] text-[#6B7280] uppercase font-bold">Booking Reference</p>
            <p className="font-mono font-bold text-[#1F2937]">{appointment.id}</p>
          </div>
          <div>
            <p className="text-[10px] text-[#6B7280] uppercase font-bold">Date & Time</p>
            <p className="font-bold text-[#1F2937]">{formatDate(appointment.date)} • {appointment.timeSlot}</p>
          </div>
          <div>
            <p className="text-[10px] text-[#6B7280] uppercase font-bold">Fee Status</p>
            <p className="font-bold text-[#2E7D32] uppercase">{appointment.paymentStatus}</p>
          </div>
        </div>

        {/* Clinic Location */}
        <div className="text-xs space-y-1">
          <p className="font-bold text-[#1F2937] flex items-center gap-1">
            <MapPin className="w-4 h-4 text-[#0F3040]" /> Location / Clinic
          </p>
          <p className="text-[#6B7280] pl-5">{appointment.clinicName}</p>
          <p className="text-[#6B7280] pl-5 text-[11px]">{appointment.clinicAddress}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-[#1F2937] bg-white border border-black/10 rounded-full hover:bg-black/5 transition-colors flex items-center justify-center gap-2"
        >
          <Printer className="w-4 h-4 text-[#0F3040]" /> Print Digital Pass
        </button>

        <Link
          to="/patient/appointments"
          className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-white bg-[#0F3040] hover:bg-[#D99B7F] rounded-full shadow-soft transition-all flex items-center justify-center gap-2"
        >
          <span>View My Appointments</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
