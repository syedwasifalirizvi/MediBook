import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Calendar,
  ShieldCheck,
  Star,
  ArrowRight,
  HeartPulse,
  Sparkles,
  Brain,
  Baby,
  Bone,
  Eye,
  Smile,
  Stethoscope,
  CheckCircle2,
  Clock,
  UserCheck,
  Award,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { DoctorCard } from '../components/common/DoctorCard';
import { TESTIMONIALS, INITIAL_ARTICLES } from '../data/mockData';

const SPECIALTY_ICONS: Record<string, React.FC<{ className?: string }>> = {
  cardiology: HeartPulse,
  dermatology: Sparkles,
  neurology: Brain,
  pediatrics: Baby,
  orthopedics: Bone,
  ophthalmology: Eye,
  psychiatry: Smile,
  general: Stethoscope,
};

export const LandingPage: React.FC = () => {
  const { doctors, specialties } = useData();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const topDoctors = doctors.filter(d => d.isTopRated || d.rating >= 4.9).slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('search', searchQuery);
    if (selectedSpecialty) params.append('specialty', selectedSpecialty);
    navigate(`/doctors?${params.toString()}`);
  };

  return (
    <div className="space-y-24 pb-12">
      {/* 1. LUXURY HERO SECTION */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#0F3040]/10 via-[#464858]/15 to-transparent blur-3xl -z-10 pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-black/10 text-xs font-semibold text-[#1F2937] shadow-sm animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-[#0F3040] animate-ping" />
            <ShieldCheck className="w-4 h-4 text-[#0F3040]" />
            <span>Trusted Healthcare Booking for 50,000+ Patients</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1F2937] max-w-4xl mx-auto leading-[1.15]">
            World-Class Care, <br />
            <span className="text-[#0F3040] italic">Thoughtfully Scheduled.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#6B7280] max-w-2xl mx-auto font-normal leading-relaxed">
            Connect with board-certified medical specialists. Book in-person visits or telemedicine consultations with zero wait time.
          </p>

          {/* Search Bar Widget */}
          <form
            onSubmit={handleSearch}
            className="max-w-4xl mx-auto glass-panel p-3 rounded-3xl sm:rounded-full shadow-float border border-black/10 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
          >
            <div className="sm:col-span-5 flex items-center gap-3 px-4 py-2">
              <Search className="w-5 h-5 text-[#0F3040]" />
              <input
                type="text"
                placeholder="Doctor name, condition, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm bg-transparent focus:outline-none placeholder-[#6B7280] text-[#1F2937]"
              />
            </div>

            <div className="sm:col-span-4 flex items-center gap-3 px-4 py-2 border-t sm:border-t-0 sm:border-l border-black/10">
              <Stethoscope className="w-5 h-5 text-[#0F3040]" />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full text-sm bg-transparent focus:outline-none text-[#1F2937] cursor-pointer"
              >
                <option value="">All Medical Specialties</option>
                {specialties.map(spec => (
                  <option key={spec.id} value={spec.id}>{spec.name}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-3">
              <button
                type="submit"
                className="w-full py-3.5 px-6 text-sm font-semibold text-white bg-[#0F3040] hover:bg-[#D99B7F] rounded-full shadow-soft transition-all flex items-center justify-center gap-2"
              >
                <span>Find Doctors</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Key Metrics Strip */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
            <div className="glass-card p-4 rounded-2xl border border-black/5">
              <p className="font-display text-2xl font-bold text-[#1F2937]">250+</p>
              <p className="text-xs text-[#6B7280]">Board-Certified Specialists</p>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-black/5">
              <p className="font-display text-2xl font-bold text-[#1F2937]">4.9 / 5.0</p>
              <p className="text-xs text-[#6B7280]">Average Patient Rating</p>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-black/5">
              <p className="font-display text-2xl font-bold text-[#1F2937]">Instant</p>
              <p className="text-xs text-[#6B7280]">Booking Confirmation</p>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-black/5">
              <p className="font-display text-2xl font-bold text-[#1F2937]">100%</p>
              <p className="text-xs text-[#6B7280]">HIPAA Compliant Privacy</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPECIALTIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-[#0F3040]">Clinical Departments</span>
            <h2 className="font-display text-3xl font-bold text-[#1F2937]">Browse by Specialty</h2>
          </div>
          <Link
            to="/specialties"
            className="text-xs font-bold text-[#0F3040] hover:underline flex items-center gap-1"
          >
            <span>View All Specialties</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {specialties.map((spec) => {
            const IconComponent = SPECIALTY_ICONS[spec.id] || Stethoscope;
            return (
              <Link
                key={spec.id}
                to={`/doctors?specialty=${spec.id}`}
                className="glass-card rounded-3xl p-6 border border-black/5 hover:border-[#0F3040]/50 transition-all hover:shadow-card group space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0F3040]/15 text-[#1F2937] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6 text-[#0F3040]" />
                </div>
                <h3 className="font-display text-base font-bold text-[#1F2937] group-hover:text-[#0F3040] transition-colors">
                  {spec.name}
                </h3>
                <p className="text-xs text-[#6B7280] line-clamp-2">{spec.description}</p>
                <div className="text-[11px] font-semibold text-[#0F3040] pt-1">
                  {spec.doctorCount} Doctors Available
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. TOP RATED DOCTORS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-[#0F3040]">Verified Experts</span>
            <h2 className="font-display text-3xl font-bold text-[#1F2937]">Top-Rated Specialists</h2>
          </div>
          <Link
            to="/doctors"
            className="text-xs font-bold text-[#0F3040] hover:underline flex items-center gap-1"
          >
            <span>Explore All Doctors ({doctors.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topDoctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-black/10 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs uppercase font-bold tracking-wider text-[#A56F63]">Frictionless Care</span>
            <h2 className="font-display text-3xl font-bold text-[#1F2937]">How MediBook Works</h2>
            <p className="text-xs text-[#6B7280]">Book your appointment in under 60 seconds.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 relative text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#0F3040] text-white flex items-center justify-center font-bold text-lg mx-auto sm:mx-0 shadow-soft">
                01
              </div>
              <h3 className="font-display font-bold text-base text-[#1F2937]">Search Specialist</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Filter by medical department, rating, location, or consultation fee.
              </p>
            </div>

            <div className="space-y-3 relative text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#0F3040] text-white flex items-center justify-center font-bold text-lg mx-auto sm:mx-0 shadow-soft">
                02
              </div>
              <h3 className="font-display font-bold text-base text-[#1F2937]">Choose Date & Slot</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Select real-time available time slots that fit your daily schedule.
              </p>
            </div>

            <div className="space-y-3 relative text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#0F3040] text-white flex items-center justify-center font-bold text-lg mx-auto sm:mx-0 shadow-soft">
                03
              </div>
              <h3 className="font-display font-bold text-base text-[#1F2937]">Instant Confirmation</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Receive digital booking pass, SMS alert, and automated calendar sync.
              </p>
            </div>

            <div className="space-y-3 relative text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#0F3040] text-white flex items-center justify-center font-bold text-lg mx-auto sm:mx-0 shadow-soft">
                04
              </div>
              <h3 className="font-display font-bold text-base text-[#1F2937]">Care & Prescriptions</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Consult with your doctor and access digital prescriptions & lab reports anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-wider text-[#0F3040]">Patient Stories</span>
          <h2 className="font-display text-3xl font-bold text-[#1F2937]">Loved by Patients & Clinicians</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="glass-card rounded-3xl p-6 border border-black/5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#A56F63]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-[#1F2937] italic leading-relaxed">"{t.quote}"</p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-black/5">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-xs text-[#1F2937]">{t.name}</h4>
                  <p className="text-[10px] text-[#6B7280]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. HEALTH ARTICLES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-[#0F3040]">Medical Knowledge</span>
            <h2 className="font-display text-3xl font-bold text-[#1F2937]">Latest Health Articles</h2>
          </div>
          <Link to="/articles" className="text-xs font-bold text-[#0F3040] hover:underline flex items-center gap-1">
            <span>Read All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_ARTICLES.map((art) => (
            <Link
              key={art.id}
              to={`/articles/${art.id}`}
              className="glass-card rounded-3xl overflow-hidden border border-black/5 hover:border-[#0F3040]/50 transition-all group flex flex-col justify-between"
            >
              <div>
                <img src={art.imageUrl} alt={art.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-[#6B7280]">
                    <span className="font-bold text-[#0F3040]">{art.category}</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="font-display font-bold text-base text-[#1F2937] group-hover:text-[#0F3040] transition-colors leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[#6B7280] line-clamp-2">{art.summary}</p>
                </div>
              </div>
              <div className="px-6 pb-6 text-[11px] text-[#6B7280] font-medium">
                By {art.author} • {art.publishedDate}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
