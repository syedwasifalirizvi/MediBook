import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  CreditCard,
  CheckCircle2,
  ChevronRight,
  MapPin,
  ArrowLeft,
  Lock,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { formatDate, formatCurrency } from '../utils/formatters';

export const BookingPage: React.FC = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { doctors, addAppointment } = useData();
  const { user } = useAuth();

  const doctor = doctors.find((d) => d.id === doctorId) || doctors[0];

  const dateParam = searchParams.get('date') || new Date().toISOString().split('T')[0];
  const slotParam = searchParams.get('slot') || doctor.availableTimeSlots[0] || '10:00 AM';
  const typeParam = (searchParams.get('type') as 'in_person' | 'video_consult') || 'in_person';

  // Form State
  const [patientName, setPatientName] = useState(user ? user.name : 'Sarah Jenkins');
  const [patientEmail, setPatientEmail] = useState(user ? user.email : 'patient@example.com');
  const [patientPhone, setPatientPhone] = useState(user?.phone || '+1 (555) 234-5678');
  const [symptomsReason, setSymptomsReason] = useState('General consultation and health review.');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'insurance' | 'clinic'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newApt = addAppointment({
        patientId: user ? user.id : 'patient-1',
        patientName,
        patientEmail,
        patientPhone,
        doctorId: doctor.id,
        doctorName: doctor.name,
        doctorTitle: doctor.title,
        doctorSpecialty: doctor.specialtyName,
        doctorAvatar: doctor.avatar,
        clinicName: doctor.clinicName,
        clinicAddress: doctor.clinicAddress,
        date: dateParam,
        timeSlot: slotParam,
        fee: doctor.consultationFee,
        type: typeParam,
        symptomsReason,
      });

      setIsSubmitting(false);
      navigate(`/booking/success/${newApt.id}`);
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back link */}
      <Link
        to={`/doctors/${doctor.id}`}
        className="inline-flex items-center gap-2 text-xs font-bold text-[#0F3040] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Doctor Profile
      </Link>

      <div className="space-y-2">
        <span className="text-xs uppercase font-bold tracking-wider text-[#0F3040]">Frictionless Checkout</span>
        <h1 className="font-display text-3xl font-bold text-[#1F2937]">Confirm Your Appointment</h1>
        <p className="text-xs text-[#6B7280]">Review slot selection and complete your consultation registration.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Details */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleConfirmBooking} className="space-y-6">
            
            {/* Patient Personal Information */}
            <div className="glass-panel p-6 rounded-3xl border border-black/10 shadow-card space-y-4">
              <h3 className="font-display font-bold text-base text-[#1F2937] flex items-center gap-2">
                <User className="w-4 h-4 text-[#0F3040]" /> Patient Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-[#1F2937]">Full Name</label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full p-2.5 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F3040]/50 text-[#1F2937]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#1F2937]">Contact Phone</label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full p-2.5 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F3040]/50 text-[#1F2937]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="font-semibold text-[#1F2937]">Email Address (For Confirmation & Pass)</label>
                  <input
                    type="email"
                    required
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    className="w-full p-2.5 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F3040]/50 text-[#1F2937]"
                  />
                </div>
              </div>
            </div>

            {/* Medical Reason / Symptoms */}
            <div className="glass-panel p-6 rounded-3xl border border-black/10 shadow-card space-y-4">
              <h3 className="font-display font-bold text-base text-[#1F2937] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0F3040]" /> Reason for Visit / Symptoms
              </h3>
              <textarea
                rows={3}
                required
                placeholder="Briefly describe your symptoms or reason for scheduling..."
                value={symptomsReason}
                onChange={(e) => setSymptomsReason(e.target.value)}
                className="w-full p-3 text-xs bg-white border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0F3040]/50 text-[#1F2937]"
              />
            </div>

            {/* Payment Guarantee Selection */}
            <div className="glass-panel p-6 rounded-3xl border border-black/10 shadow-card space-y-4">
              <h3 className="font-display font-bold text-base text-[#1F2937] flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#0F3040]" /> Payment Options
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 text-xs font-semibold rounded-2xl border text-left transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-[#0F3040] text-white border-[#0F3040]'
                      : 'bg-white text-[#1F2937] border-black/10'
                  }`}
                >
                  <p className="font-bold">Credit/Debit Card</p>
                  <p className="text-[10px] opacity-80">Instant Digital Pay</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('insurance')}
                  className={`p-3 text-xs font-semibold rounded-2xl border text-left transition-all ${
                    paymentMethod === 'insurance'
                      ? 'bg-[#0F3040] text-white border-[#0F3040]'
                      : 'bg-white text-[#1F2937] border-black/10'
                  }`}
                >
                  <p className="font-bold">Health Insurance</p>
                  <p className="text-[10px] opacity-80">Direct Claim Copay</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('clinic')}
                  className={`p-3 text-xs font-semibold rounded-2xl border text-left transition-all ${
                    paymentMethod === 'clinic'
                      ? 'bg-[#0F3040] text-white border-[#0F3040]'
                      : 'bg-white text-[#1F2937] border-black/10'
                  }`}
                >
                  <p className="font-bold">Pay at Clinic</p>
                  <p className="text-[10px] opacity-80">Upon Check-in</p>
                </button>
              </div>

              <div className="pt-2 text-[11px] text-[#6B7280] flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit SSL Encrypted Healthcare Billing Protection</span>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 text-sm font-bold text-white bg-[#0F3040] hover:bg-[#D99B7F] rounded-2xl shadow-soft transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Confirming Booking...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Complete Booking • {formatCurrency(doctor.consultationFee)}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="lg:col-span-5">
          <div className="glass-card p-6 rounded-3xl border border-black/10 shadow-card space-y-6">
            <h3 className="font-display font-bold text-lg text-[#1F2937] border-b border-black/5 pb-3">
              Consultation Summary
            </h3>

            {/* Doctor Thumbnail */}
            <div className="flex items-center gap-4">
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="w-16 h-16 rounded-2xl object-cover border border-black/10"
              />
              <div>
                <h4 className="font-bold text-sm text-[#1F2937]">{doctor.name}</h4>
                <p className="text-xs text-[#6B7280]">{doctor.title}</p>
                <span className="text-[11px] font-semibold text-[#0F3040]">{doctor.specialtyName}</span>
              </div>
            </div>

            {/* Slot Details */}
            <div className="space-y-2 pt-4 border-t border-black/5 text-xs">
              <div className="flex items-center justify-between text-[#1F2937]">
                <span className="flex items-center gap-2 text-[#6B7280]">
                  <Calendar className="w-4 h-4 text-[#0F3040]" /> Date
                </span>
                <span className="font-bold">{formatDate(dateParam)}</span>
              </div>

              <div className="flex items-center justify-between text-[#1F2937]">
                <span className="flex items-center gap-2 text-[#6B7280]">
                  <Clock className="w-4 h-4 text-[#0F3040]" /> Time
                </span>
                <span className="font-bold">{slotParam}</span>
              </div>

              <div className="flex items-center justify-between text-[#1F2937]">
                <span className="flex items-center gap-2 text-[#6B7280]">
                  <MapPin className="w-4 h-4 text-[#0F3040]" /> Type
                </span>
                <span className="font-bold capitalize">{typeParam.replace('_', ' ')}</span>
              </div>
            </div>

            {/* Fee Breakdown */}
            <div className="space-y-2 pt-4 border-t border-black/5 text-xs">
              <div className="flex justify-between text-[#6B7280]">
                <span>Doctor Consultation Fee</span>
                <span className="font-mono text-[#1F2937]">{formatCurrency(doctor.consultationFee)}</span>
              </div>
              <div className="flex justify-between text-[#6B7280]">
                <span>Digital Pass & Care Sync</span>
                <span className="font-mono text-[#2E7D32]">FREE</span>
              </div>
              <div className="flex justify-between text-[#1F2937] font-bold text-base pt-2 border-t border-black/5">
                <span>Total Amount Due</span>
                <span className="font-mono text-[#0F3040]">{formatCurrency(doctor.consultationFee)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
