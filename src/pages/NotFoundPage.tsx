import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, ArrowLeft, Home, Search } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="glass-card rounded-3xl p-8 sm:p-12 max-w-lg w-full text-center space-y-6 border border-black/5 shadow-card">
        <div className="w-20 h-20 rounded-3xl bg-[#0F3040]/10 text-[#0F3040] flex items-center justify-center mx-auto shadow-inner">
          <Stethoscope className="w-10 h-10 stroke-[2.2]" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-[#A56F63]">Error 404</span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1F2937] mt-1">Page Not Found</h1>
          <p className="text-sm text-[#6B7280] mt-3 leading-relaxed">
            We couldn't locate the medical portal or specialist page you were looking for. It may have moved or no longer exists.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-white bg-[#0F3040] hover:bg-[#D99B7F] rounded-full shadow-soft transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Return Home
          </Link>
          <Link
            to="/doctors"
            className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-[#1F2937] bg-white border border-black/10 hover:border-[#0F3040] rounded-full transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4 text-[#A56F63]" /> Find Doctors
          </Link>
        </div>
      </div>
    </div>
  );
};
