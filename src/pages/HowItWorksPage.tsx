import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Video, FileCheck, ShieldCheck, HeartPulse, CheckCircle2 } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Search Verified Doctors',
      description: 'Filter by medical specialty, location, patient ratings, consultation fee, or insurance coverage to find the perfect specialist.',
      icon: Search,
    },
    {
      num: '02',
      title: 'Select Real-Time Slots',
      description: 'Pick an available date and time slot instantly. Choose between in-clinic visit or secure online video consultation.',
      icon: Calendar,
    },
    {
      num: '03',
      title: 'Consult & Receive Care',
      description: 'Meet your specialist, discuss symptoms, receive digital prescriptions, and follow up with seamless medical records tracking.',
      icon: Video,
    },
    {
      num: '04',
      title: 'Manage Health Records',
      description: 'Access digital scripts, diagnostic reports, and visit summaries securely from your encrypted MediBook patient dashboard.',
      icon: FileCheck,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-[#A56F63]">Frictionless Healthcare</span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1F2937]">How MediBook Works</h1>
        <p className="text-sm text-[#6B7280]">
          Experience modern healthcare concierge booking engineered to save time, verify specialist credentials, and protect patient privacy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => {
          const IconComp = step.icon;
          return (
            <div
              key={step.num}
              className="glass-card rounded-3xl p-6 border border-black/10 flex flex-col justify-between space-y-4 shadow-card hover:border-[#0F3040] transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F3040] text-white flex items-center justify-center font-bold">
                    <IconComp className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="font-display text-2xl font-bold text-[#A56F63] opacity-60">{step.num}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-[#1F2937]">{step.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">{step.description}</p>
              </div>

              <div className="pt-4 border-t border-black/5 flex items-center gap-2 text-[11px] font-semibold text-[#0F3040]">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" /> Verified Standard
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center space-y-6 border border-black/10 max-w-3xl mx-auto shadow-card">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F2937]">Ready to Book Your Consultation?</h2>
        <p className="text-xs text-[#6B7280] max-w-lg mx-auto">
          Join thousands of patients using MediBook for instant specialist appointments and HIPAA-compliant care.
        </p>
        <Link
          to="/doctors"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0F3040] text-white text-xs font-bold rounded-full hover:bg-[#D99B7F] shadow-soft transition-all"
        >
          Find Doctors Now
        </Link>
      </div>
    </div>
  );
};
