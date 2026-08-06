import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg'; label?: string }> = ({
  size = 'md',
  label = 'Loading care data...',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-3">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-[#0F3040]`} />
      {label && <p className="text-xs font-semibold text-[#6B7280]">{label}</p>}
    </div>
  );
};

export const DoctorCardSkeleton: React.FC = () => {
  return (
    <div className="glass-card rounded-3xl p-5 border border-black/5 animate-pulse space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-[#0F3040]/10 rounded-2xl" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-[#0F3040]/10 rounded w-1/3" />
          <div className="h-5 bg-[#0F3040]/10 rounded w-3/4" />
          <div className="h-3 bg-[#0F3040]/10 rounded w-1/2" />
        </div>
      </div>
      <div className="h-10 bg-[#0F3040]/10 rounded-xl w-full" />
    </div>
  );
};

export const TableSkeleton: React.FC = () => {
  return (
    <div className="glass-card rounded-3xl p-6 border border-black/5 animate-pulse space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center justify-between gap-4 py-3 border-b border-black/5">
          <div className="h-4 bg-[#0F3040]/10 rounded w-1/4" />
          <div className="h-4 bg-[#0F3040]/10 rounded w-1/4" />
          <div className="h-4 bg-[#0F3040]/10 rounded w-1/6" />
        </div>
      ))}
    </div>
  );
};

export const PageSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8 animate-pulse">
      <div className="h-10 bg-[#0F3040]/10 rounded-2xl w-1/3" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-40 bg-[#0F3040]/10 rounded-3xl" />
        <div className="h-40 bg-[#0F3040]/10 rounded-3xl" />
        <div className="h-40 bg-[#0F3040]/10 rounded-3xl" />
      </div>
      <div className="h-64 bg-[#0F3040]/10 rounded-3xl" />
    </div>
  );
};
