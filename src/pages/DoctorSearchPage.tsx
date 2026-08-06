import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, Star, DollarSign, RotateCcw, Stethoscope } from 'lucide-react';
import { useData } from '../context/DataContext';
import { DoctorCard } from '../components/common/DoctorCard';
import { EmptyState } from '../components/common/EmptyState';

export const DoctorSearchPage: React.FC = () => {
  const { doctors, specialties } = useData();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get('search') || '';
  const initialSpecialty = searchParams.get('specialty') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedSpecialty, setSelectedSpecialty] = useState(initialSpecialty);
  const [minRating, setMinRating] = useState<number>(0);
  const [maxFee, setMaxFee] = useState<number>(300);
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'fee_asc' | 'fee_desc'>('rating');

  // Filtered & Sorted Doctors
  const filteredDoctors = useMemo(() => {
    return doctors
      .filter((doc) => {
        const matchesQuery =
          !searchQuery ||
          doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.specialtyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.clinicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.title.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesSpecialty = !selectedSpecialty || doc.specialtyId === selectedSpecialty;
        const matchesRating = doc.rating >= minRating;
        const matchesFee = doc.consultationFee <= maxFee;

        return matchesQuery && matchesSpecialty && matchesRating && matchesFee;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
        if (sortBy === 'fee_asc') return a.consultationFee - b.consultationFee;
        if (sortBy === 'fee_desc') return b.consultationFee - a.consultationFee;
        return 0;
      });
  }, [doctors, searchQuery, selectedSpecialty, minRating, maxFee, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSpecialty('');
    setMinRating(0);
    setMaxFee(300);
    setSortBy('rating');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs uppercase font-bold tracking-wider text-[#0F3040]">Find Care</span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1F2937]">Search Medical Specialists</h1>
        <p className="text-xs text-[#6B7280]">
          Browse verified healthcare professionals, check patient reviews, and book instant consultations.
        </p>
      </div>

      {/* Filter and Search Control Panel */}
      <div className="glass-panel p-6 rounded-3xl border border-black/10 shadow-card space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          
          {/* Keyword Search */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-[#0F3040] absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search doctor name, specialty, or clinic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0F3040]/50 text-[#1F2937]"
            />
          </div>

          {/* Specialty Select */}
          <div className="sm:col-span-3">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full py-2.5 px-3 text-sm bg-white border border-black/10 rounded-2xl focus:outline-none text-[#1F2937] cursor-pointer"
            >
              <option value="">All Specialties</option>
              {specialties.map((spec) => (
                <option key={spec.id} value={spec.id}>
                  {spec.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div className="sm:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2.5 px-3 text-sm bg-white border border-black/10 rounded-2xl focus:outline-none text-[#1F2937] cursor-pointer"
            >
              <option value="rating">Sort by: Highest Rating</option>
              <option value="experience">Sort by: Most Experience</option>
              <option value="fee_asc">Sort by: Fee (Low to High)</option>
              <option value="fee_desc">Sort by: Fee (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Secondary Filters Bar */}
        <div className="pt-4 border-t border-black/5 flex flex-wrap items-center justify-between gap-4 text-xs">
          
          <div className="flex flex-wrap items-center gap-6">
            {/* Min Rating */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#1F2937]">Min Rating:</span>
              <div className="flex items-center gap-1">
                {[0, 4.0, 4.5, 4.8].map((r) => (
                  <button
                    key={r}
                    onClick={() => setMinRating(r)}
                    className={`px-2.5 py-1 rounded-lg border transition-colors ${
                      minRating === r
                        ? 'bg-[#0F3040] text-white border-[#0F3040]'
                        : 'bg-white text-[#6B7280] border-black/10 hover:border-black/20'
                    }`}
                  >
                    {r === 0 ? 'Any' : `${r}+★`}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Fee Slider */}
            <div className="flex items-center gap-3">
              <span className="font-semibold text-[#1F2937]">Max Fee:</span>
              <input
                type="range"
                min="50"
                max="300"
                step="10"
                value={maxFee}
                onChange={(e) => setMaxFee(Number(e.target.value))}
                className="accent-[#0F3040] cursor-pointer"
              />
              <span className="font-mono font-bold text-[#1F2937]">${maxFee}</span>
            </div>
          </div>

          {/* Reset button */}
          <button
            onClick={handleResetFilters}
            className="text-[#C62828] hover:underline flex items-center gap-1 font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[#6B7280]">
        <span>
          Showing <strong className="text-[#1F2937]">{filteredDoctors.length}</strong> available doctors
        </span>
      </div>

      {/* Doctor Cards Grid */}
      {filteredDoctors.length === 0 ? (
        <EmptyState
          icon={Stethoscope}
          title="No doctors matched your search"
          description="Try relaxing your filters, adjusting the consultation fee range, or choosing another medical specialty."
          actionText="Reset All Filters"
          onAction={handleResetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>
      )}
    </div>
  );
};
