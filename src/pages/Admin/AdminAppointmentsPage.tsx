import React, { useState } from 'react';
import { Calendar, Search, CheckCircle2, XCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { formatDate, formatCurrency, getStatusBadgeStyle } from '../../utils/formatters';

export const AdminAppointmentsPage: React.FC = () => {
  const { appointments, cancelAppointment } = useData();
  const [search, setSearch] = useState('');

  const filtered = appointments.filter(
    (a) =>
      a.doctorName.toLowerCase().includes(search.toLowerCase()) ||
      a.patientName.toLowerCase().includes(search.toLowerCase()) ||
      a.doctorSpecialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="space-y-1">
        <span className="text-xs uppercase font-bold tracking-wider text-[#0F3040]">Admin Governance</span>
        <h1 className="font-display text-3xl font-bold text-[#1F2937]">System Appointment Ledger</h1>
        <p className="text-xs text-[#6B7280]">Audit all patient consultation bookings across clinical departments.</p>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden border border-black/5 shadow-card">
        <div className="p-4 border-b border-black/5 bg-white/60">
          <input
            type="text"
            placeholder="Search by doctor, patient, or specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-80 px-4 py-2 text-xs bg-white border border-black/10 rounded-full"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1F2937]">
            <thead className="bg-[#0F3040]/10 uppercase font-bold text-[10px] text-[#1F2937] border-b border-black/5">
              <tr>
                <th className="p-4">Ref ID</th>
                <th className="p-4">Patient</th>
                <th className="p-4">Doctor</th>
                <th className="p-4">Date & Slot</th>
                <th className="p-4">Fee</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filtered.map((apt) => {
                const badge = getStatusBadgeStyle(apt.status);
                return (
                  <tr key={apt.id} className="hover:bg-black/5 transition-colors">
                    <td className="p-4 font-mono font-bold text-[#6B7280]">{apt.id}</td>
                    <td className="p-4 font-bold">{apt.patientName}</td>
                    <td className="p-4 text-[#0F3040] font-semibold">{apt.doctorName}</td>
                    <td className="p-4 text-[#6B7280]">{formatDate(apt.date)} • {apt.timeSlot}</td>
                    <td className="p-4 font-mono font-bold">{formatCurrency(apt.fee)}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-[10px] font-bold rounded-full border ${badge.bg} ${badge.text} ${badge.border}`}>
                        {badge.label}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {apt.status === 'upcoming' && (
                        <button
                          onClick={() => cancelAppointment(apt.id)}
                          className="px-2.5 py-1 text-red-600 hover:bg-red-50 font-bold rounded-md"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
