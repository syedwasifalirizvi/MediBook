import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Stethoscope, ArrowRight, Activity, Heart, Eye, Brain, Baby, ShieldAlert } from 'lucide-react';

export const SpecialtiesPage: React.FC = () => {
  const { specialties, doctors } = useData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-[#A56F63]">Medical Departments</span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1F2937]">Explore Medical Specialties</h1>
        <p className="text-sm text-[#6B7280]">
          Connect with top-rated board-certified specialists across Cardiology, Neurology, Pediatrics, Orthopedics, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {specialties.map((spec) => {
          const specDoctors = doctors.filter((d) => d.specialtyId === spec.id);
          return (
            <div
              key={spec.id}
              className="glass-card rounded-3xl p-6 border border-black/10 hover:border-[#0F3040] transition-all group flex flex-col justify-between shadow-card hover:shadow-soft"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#0F3040]/10 text-[#0F3040] flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                  <Stethoscope className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-[#1F2937] group-hover:text-[#0F3040] transition-colors">
                    {spec.name}
                  </h3>
                  <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">{spec.description}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-black/5 mt-6 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#0F3040] bg-[#0F3040]/10 px-3 py-1 rounded-full">
                  {specDoctors.length} Doctors Available
                </span>
                <Link
                  to={`/doctors?specialty=${spec.id}`}
                  className="text-xs font-bold text-[#0F3040] group-hover:text-[#D99B7F] flex items-center gap-1 transition-colors"
                >
                  View Specialists <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
