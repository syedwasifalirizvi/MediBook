import React, { useState } from 'react';
import { FileText, Download, Printer, Search, Pill } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { formatDate } from '../../utils/formatters';

export const PatientPrescriptionsPage: React.FC = () => {
  const { user } = useAuth();
  const { prescriptions } = useData();
  const [search, setSearch] = useState('');

  const userRx = prescriptions.filter((p) => p.patientId === (user?.id || 'patient-1'));
  const filtered = userRx.filter(
    (p) =>
      p.diagnosis.toLowerCase().includes(search.toLowerCase()) ||
      p.doctorName.toLowerCase().includes(search.toLowerCase()) ||
      p.medicines.some((m) => m.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs uppercase font-bold tracking-wider text-[#0F3040]">Patient Portal</span>
          <h1 className="font-display text-3xl font-bold text-[#1F2937]">Digital Prescriptions</h1>
          <p className="text-xs text-[#6B7280]">Access and print official medication orders issued by your doctors.</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#0F3040] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search diagnosis or medicine..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-black/10 rounded-full"
          />
        </div>
      </div>

      <div className="space-y-6">
        {filtered.map((rx) => (
          <div key={rx.id} className="glass-card p-6 sm:p-8 rounded-3xl border border-black/5 shadow-card space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-black/5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0F3040]/15 text-[#0F3040] flex items-center justify-center">
                  <Pill className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-[#1F2937]">{rx.diagnosis}</h3>
                  <p className="text-xs text-[#6B7280]">Prescribed by {rx.doctorName} • {rx.doctorSpecialty}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="text-[#6B7280] font-medium">{formatDate(rx.date)}</span>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 text-xs font-semibold text-[#1F2937] bg-white border border-black/10 rounded-xl hover:bg-black/5 transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Rx
                </button>
              </div>
            </div>

            {/* Medicines List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rx.medicines.map((m, idx) => (
                <div key={idx} className="p-4 bg-white/80 rounded-2xl border border-black/5 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1F2937] text-sm">{m.name}</span>
                    <span className="px-2 py-0.5 bg-[#0F3040]/20 text-[#1F2937] font-bold rounded-md">
                      {m.dosage}
                    </span>
                  </div>
                  <p className="text-[#6B7280]"><strong className="text-[#1F2937]">Frequency:</strong> {m.frequency}</p>
                  <p className="text-[#6B7280]"><strong className="text-[#1F2937]">Duration:</strong> {m.duration}</p>
                  <p className="text-[11px] text-[#6B7280] italic bg-[#F8F7F5] p-2 rounded-lg">{m.instructions}</p>
                </div>
              ))}
            </div>

            {rx.notes && (
              <div className="p-3 bg-[#F8F7F5] rounded-xl text-xs text-[#6B7280]">
                <strong className="text-[#1F2937]">Special Doctor Advice:</strong> {rx.notes}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
