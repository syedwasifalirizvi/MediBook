import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, Heart, ShieldCheck, ChevronRight, Award } from 'lucide-react';
import { Doctor } from '../../types';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../utils/formatters';

interface DoctorCardProps {
  doctor: Doctor;
  compact?: boolean;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, compact = false }) => {
  const { isFavorite, toggleFavorite } = useData();
  const favorite = isFavorite(doctor.id);

  return (
    <div className="glass-card rounded-3xl p-5 border border-black/5 hover:border-[#0F3040]/50 transition-all duration-300 hover:shadow-card group relative flex flex-col justify-between">
      <div>
        {/* Top Header: Image, Favorite, Badge */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="relative">
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-sm group-hover:scale-105 transition-transform duration-300"
            />
            {doctor.isVerified && (
              <span
                className="absolute -bottom-1 -right-1 bg-[#0F3040] text-white p-1 rounded-full shadow-sm"
                title="Verified Specialist"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {doctor.isTopRated && (
              <span className="px-2.5 py-1 bg-[#A56F63]/15 border border-[#A56F63]/30 text-[#967432] text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                <Award className="w-3 h-3" /> Top Rated
              </span>
            )}
            <button
              onClick={() => toggleFavorite(doctor.id)}
              className={`p-2 rounded-full border transition-all ${
                favorite
                  ? 'bg-red-50 border-red-200 text-red-500'
                  : 'bg-white/80 border-black/5 text-[#6B7280] hover:text-[#1F2937]'
              }`}
              title={favorite ? 'Remove from favorites' : 'Save to favorites'}
            >
              <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Doctor Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[11px] font-semibold text-[#1F2937] bg-[#464858]/40 rounded-md">
              {doctor.specialtyName}
            </span>
            <span className="text-xs text-[#6B7280] flex items-center gap-1">
              • {doctor.experienceYears} yrs exp.
            </span>
          </div>

          <Link to={`/doctors/${doctor.id}`} className="block group-hover:text-[#0F3040] transition-colors">
            <h3 className="font-display text-lg font-bold text-[#1F2937] leading-snug">
              {doctor.name}
            </h3>
          </Link>

          <p className="text-xs text-[#6B7280] line-clamp-1">{doctor.title}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 text-xs py-1">
            <div className="flex items-center gap-1 text-[#A56F63] font-bold">
              <Star className="w-4 h-4 fill-current" />
              <span>{doctor.rating.toFixed(2)}</span>
            </div>
            <span className="text-[#6B7280]">({doctor.reviewsCount} reviews)</span>
          </div>

          {!compact && (
            <div className="space-y-1.5 pt-2 border-t border-black/5 text-xs text-[#6B7280]">
              <div className="flex items-center gap-2 truncate">
                <MapPin className="w-3.5 h-3.5 text-[#0F3040] shrink-0" />
                <span className="truncate">{doctor.clinicName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#0F3040] shrink-0" />
                <span>Available: {doctor.availableDays.slice(0, 3).join(', ')}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Fee & Booking Action */}
      <div className="mt-5 pt-4 border-t border-black/5 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#6B7280]">Consultation</span>
          <p className="text-base font-bold text-[#1F2937]">{formatCurrency(doctor.consultationFee)}</p>
        </div>

        <Link
          to={`/booking/${doctor.id}`}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#0F3040] rounded-xl hover:bg-[#D99B7F] shadow-soft transition-all flex items-center gap-1.5 group/btn"
        >
          <span>Book Now</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
