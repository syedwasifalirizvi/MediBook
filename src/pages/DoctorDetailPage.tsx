import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  Calendar as CalendarIcon,
  Languages,
  Building,
  CheckCircle2,
  Heart,
  MessageSquare,
  ChevronRight,
  User,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import { Modal } from '../components/common/Modal';

export const DoctorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { doctors, reviews, isFavorite, toggleFavorite, addReview } = useData();
  const { user } = useAuth();

  const doctor = doctors.find((d) => d.id === id) || doctors[0];

  // Date selection (Next 7 days starting from tomorrow)
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d.toISOString().split('T')[0];
  });

  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0]);
  const [selectedSlot, setSelectedSlot] = useState<string>(doctor.availableTimeSlots[0] || '10:00 AM');
  const [consultationType, setConsultationType] = useState<'in_person' | 'video_consult'>('in_person');

  // Review modal state
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const doctorReviews = reviews.filter((r) => r.doctorId === doctor.id);
  const favorite = isFavorite(doctor.id);

  const handleProceedToBooking = () => {
    navigate(`/booking/${doctor.id}?date=${selectedDate}&slot=${encodeURIComponent(selectedSlot)}&type=${consultationType}`);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewComment.trim()) {
      addReview({
        doctorId: doctor.id,
        patientName: user ? user.name : 'Anonymous Patient',
        patientAvatar: user?.avatar,
        rating: reviewRating,
        comment: reviewComment,
      });
      setReviewModalOpen(false);
      setReviewComment('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-[#6B7280]">
        <Link to="/" className="hover:text-[#1F2937]">Home</Link>
        <span>/</span>
        <Link to="/doctors" className="hover:text-[#1F2937]">Doctors</Link>
        <span>/</span>
        <span className="text-[#1F2937] font-semibold">{doctor.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Doctor Profile Info & Reviews */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Main Hero Header Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-black/10 shadow-card space-y-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative shrink-0">
                <img
                  src={doctor.avatar}
                  alt={doctor.name}
                  className="w-28 h-28 rounded-3xl object-cover border-2 border-white shadow-soft"
                />
                {doctor.isVerified && (
                  <span className="absolute -bottom-1 -right-1 bg-[#0F3040] text-white p-1.5 rounded-full shadow-sm">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                )}
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 bg-[#464858]/40 text-[#1F2937] text-xs font-bold rounded-full">
                    {doctor.specialtyName}
                  </span>
                  <button
                    onClick={() => toggleFavorite(doctor.id)}
                    className={`p-2 rounded-full border transition-colors ${
                      favorite
                        ? 'bg-red-50 border-red-200 text-red-500'
                        : 'bg-white border-black/10 text-[#6B7280]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#1F2937]">
                  {doctor.name}
                </h1>

                <p className="text-xs text-[#6B7280]">{doctor.title}</p>
                <p className="text-xs text-[#0F3040] font-semibold">{doctor.qualification}</p>

                <div className="flex flex-wrap items-center gap-4 text-xs pt-2">
                  <div className="flex items-center gap-1 text-[#A56F63] font-bold">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{doctor.rating.toFixed(2)}</span>
                    <span className="text-[#6B7280] font-normal">({doctor.reviewsCount} reviews)</span>
                  </div>
                  <span className="text-[#6B7280]">•</span>
                  <span className="text-[#6B7280]">{doctor.experienceYears} Years Experience</span>
                </div>
              </div>
            </div>

            {/* Quick Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-black/5 text-xs text-[#6B7280]">
              <div className="flex items-center gap-3 p-3 bg-white/70 rounded-2xl border border-black/5">
                <Building className="w-4 h-4 text-[#0F3040] shrink-0" />
                <div>
                  <p className="font-semibold text-[#1F2937]">{doctor.clinicName}</p>
                  <p className="text-[11px] truncate">{doctor.clinicAddress}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white/70 rounded-2xl border border-black/5">
                <Languages className="w-4 h-4 text-[#0F3040] shrink-0" />
                <div>
                  <p className="font-semibold text-[#1F2937]">Languages Spoken</p>
                  <p className="text-[11px]">{doctor.languages.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* About & Bio */}
          <div className="glass-card p-6 rounded-3xl border border-black/5 shadow-card space-y-3">
            <h3 className="font-display font-bold text-lg text-[#1F2937]">About & Clinical Expertise</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">{doctor.about}</p>
          </div>

          {/* Patient Reviews Section */}
          <div className="glass-card p-6 rounded-3xl border border-black/5 shadow-card space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-[#1F2937]">Patient Feedback & Reviews</h3>
                <p className="text-xs text-[#6B7280]">Verified patient ratings after completed consultations.</p>
              </div>
              <button
                onClick={() => setReviewModalOpen(true)}
                className="px-4 py-2 text-xs font-semibold text-[#1F2937] bg-[#464858]/30 hover:bg-[#464858]/50 rounded-xl transition-colors"
              >
                Write a Review
              </button>
            </div>

            {doctorReviews.length === 0 ? (
              <p className="text-xs text-[#6B7280] italic py-4">No reviews yet. Be the first to share your experience.</p>
            ) : (
              <div className="space-y-4 divide-y divide-black/5">
                {doctorReviews.map((rev) => (
                  <div key={rev.id} className="pt-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#0F3040]/20 text-[#1F2937] flex items-center justify-center font-bold text-[10px]">
                          {rev.patientName[0]}
                        </div>
                        <span className="font-bold text-[#1F2937]">{rev.patientName}</span>
                      </div>
                      <span className="text-[10px] text-[#6B7280]">{formatDate(rev.date)}</span>
                    </div>

                    <div className="flex items-center gap-1 text-[#A56F63]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>

                    <p className="text-[#6B7280] leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sticky Booking Widget */}
        <div className="lg:col-span-5 sticky top-28">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-black/10 shadow-float space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-black/5">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#6B7280]">Consultation Fee</span>
                <p className="font-display text-3xl font-bold text-[#1F2937]">
                  {formatCurrency(doctor.consultationFee)}
                </p>
              </div>
              <span className="px-3 py-1 bg-[#2E7D32]/10 text-[#2E7D32] text-xs font-bold rounded-full">
                Instant Booking
              </span>
            </div>

            {/* Consultation Type Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1F2937]">Consultation Mode</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setConsultationType('in_person')}
                  className={`p-3 text-xs font-semibold rounded-2xl border transition-all flex items-center justify-center gap-2 ${
                    consultationType === 'in_person'
                      ? 'bg-[#0F3040] text-white border-[#0F3040] shadow-soft'
                      : 'bg-white text-[#1F2937] border-black/10 hover:border-black/20'
                  }`}
                >
                  <MapPin className="w-4 h-4" /> In-Person Visit
                </button>
                <button
                  type="button"
                  onClick={() => setConsultationType('video_consult')}
                  className={`p-3 text-xs font-semibold rounded-2xl border transition-all flex items-center justify-center gap-2 ${
                    consultationType === 'video_consult'
                      ? 'bg-[#0F3040] text-white border-[#0F3040] shadow-soft'
                      : 'bg-white text-[#1F2937] border-black/10 hover:border-black/20'
                  }`}
                >
                  <CalendarIcon className="w-4 h-4" /> Video Call
                </button>
              </div>
            </div>

            {/* Date Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1F2937]">Select Date</label>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {availableDates.map((dateStr) => {
                  const d = new Date(dateStr);
                  const isSelected = selectedDate === dateStr;
                  return (
                    <button
                      key={dateStr}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`flex-1 min-w-[70px] p-2.5 rounded-2xl border text-center transition-all ${
                        isSelected
                          ? 'bg-[#1F2937] text-white border-[#1F2937]'
                          : 'bg-white text-[#1F2937] border-black/10 hover:border-black/20'
                      }`}
                    >
                      <p className="text-[10px] uppercase font-bold text-[#0F3040]">
                        {d.toLocaleDateString('en-US', { weekday: 'short' })}
                      </p>
                      <p className="text-sm font-bold">{d.getDate()}</p>
                      <p className="text-[9px] text-gray-400">
                        {d.toLocaleDateString('en-US', { month: 'short' })}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Picker */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1F2937]">Available Time Slots</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {doctor.availableTimeSlots.map((slot) => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-[#0F3040] text-white border-[#0F3040] shadow-sm'
                          : 'bg-white text-[#1F2937] border-black/10 hover:border-black/20'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Booking Summary */}
            <div className="p-4 bg-[#F8F7F5] rounded-2xl border border-black/5 text-xs space-y-1 text-[#6B7280]">
              <div className="flex justify-between font-semibold text-[#1F2937]">
                <span>Date & Time:</span>
                <span>{formatDate(selectedDate)} at {selectedSlot}</span>
              </div>
              <div className="flex justify-between">
                <span>Clinic:</span>
                <span className="truncate max-w-[180px]">{doctor.clinicName}</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleProceedToBooking}
              className="w-full py-4 text-sm font-bold text-white bg-[#0F3040] hover:bg-[#D99B7F] rounded-2xl shadow-soft transition-all flex items-center justify-center gap-2 group"
            >
              <span>Proceed to Booking</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      <Modal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        title={`Review ${doctor.name}`}
      >
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1F2937]">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setReviewRating(star)}
                  className={`p-2 rounded-xl border ${
                    reviewRating >= star ? 'bg-[#A56F63]/20 text-[#A56F63] border-[#A56F63]' : 'bg-white text-gray-300'
                  }`}
                >
                  <Star className="w-5 h-5 fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1F2937]">Your Feedback</label>
            <textarea
              required
              rows={4}
              placeholder="Share details about your consultation experience, doctor punctuality, and staff care..."
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              className="w-full p-3 text-xs bg-white border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0F3040]/50 text-[#1F2937]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-xs font-bold text-white bg-[#0F3040] rounded-xl hover:bg-[#D99B7F] transition-colors"
          >
            Submit Review
          </button>
        </form>
      </Modal>
    </div>
  );
};
