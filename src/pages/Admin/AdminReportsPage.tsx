import React from 'react';
import { TrendingUp, DollarSign, Calendar, Users, Download } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../utils/formatters';

export const AdminReportsPage: React.FC = () => {
  const { appointments, doctors } = useData();

  const totalRevenue = appointments.reduce((acc, curr) => acc + curr.fee, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs uppercase font-bold tracking-wider text-[#0F3040]">Admin Governance</span>
          <h1 className="font-display text-3xl font-bold text-[#1F2937]">Financial & System Reports</h1>
          <p className="text-xs text-[#6B7280]">Platform revenue breakdown and clinical performance telemetry.</p>
        </div>

        <button
          onClick={() => alert('Exporting platform CSV report...')}
          className="px-5 py-2.5 text-xs font-bold text-[#1F2937] bg-white border border-black/10 rounded-full hover:bg-black/5 flex items-center gap-1.5"
        >
          <Download className="w-4 h-4 text-[#0F3040]" /> Export CSV Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-black/10 shadow-card space-y-2">
          <span className="text-xs font-bold text-[#6B7280]">Gross Platform Bookings</span>
          <p className="font-display text-3xl font-bold text-[#1F2937]">{formatCurrency(totalRevenue)}</p>
          <span className="text-[11px] font-semibold text-[#2E7D32]">+18.5% compared to last month</span>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-black/10 shadow-card space-y-2">
          <span className="text-xs font-bold text-[#6B7280]">Average Consultation Value</span>
          <p className="font-display text-3xl font-bold text-[#1F2937]">
            {formatCurrency(totalRevenue / (appointments.length || 1))}
          </p>
          <span className="text-[11px] text-[#6B7280]">Based on {appointments.length} appointments</span>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-black/10 shadow-card space-y-2">
          <span className="text-xs font-bold text-[#6B7280]">Active Clinical Network</span>
          <p className="font-display text-3xl font-bold text-[#1F2937]">{doctors.length} Doctors</p>
          <span className="text-[11px] font-semibold text-[#0F3040]">100% License Verification Pass</span>
        </div>
      </div>
    </div>
  );
};
