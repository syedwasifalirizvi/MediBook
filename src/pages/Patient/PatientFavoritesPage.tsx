import React from 'react';
import { Heart, Stethoscope } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { DoctorCard } from '../../components/common/DoctorCard';
import { EmptyState } from '../../components/common/EmptyState';

export const PatientFavoritesPage: React.FC = () => {
  const { doctors, favorites } = useData();
  const favoriteDoctors = doctors.filter((d) => favorites.includes(d.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="space-y-2">
        <span className="text-xs uppercase font-bold tracking-wider text-[#0F3040]">Patient Portal</span>
        <h1 className="font-display text-3xl font-bold text-[#1F2937]">Saved Favorite Specialists</h1>
        <p className="text-xs text-[#6B7280]">Quick access to your preferred healthcare providers and doctors.</p>
      </div>

      {favoriteDoctors.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="No Favorite Doctors Saved"
          description="Click the heart icon on any doctor profile card to save them for rapid future consultation booking."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteDoctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>
      )}
    </div>
  );
};
