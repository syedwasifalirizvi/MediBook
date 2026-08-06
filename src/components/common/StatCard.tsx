import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down';
  icon: LucideIcon;
  subtext?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  trend = 'up',
  icon: Icon,
  subtext,
}) => {
  return (
    <div className="glass-card rounded-3xl p-6 border border-black/5 hover:border-[#0F3040]/40 transition-all shadow-card">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs uppercase font-bold tracking-wider text-[#6B7280]">{title}</span>
        <div className="p-3 bg-[#0F3040]/15 text-[#1F2937] rounded-2xl">
          <Icon className="w-5 h-5 text-[#0F3040]" />
        </div>
      </div>

      <div className="flex items-baseline justify-between">
        <h3 className="font-display font-bold text-2xl text-[#1F2937]">{value}</h3>
        {change && (
          <span
            className={`text-xs font-bold flex items-center gap-0.5 px-2 py-0.5 rounded-md ${
              trend === 'up' ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'
            }`}
          >
            {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {change}
          </span>
        )}
      </div>

      {subtext && <p className="text-[11px] text-[#6B7280] mt-2">{subtext}</p>}
    </div>
  );
};
