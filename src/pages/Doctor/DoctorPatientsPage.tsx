import React, { useState } from 'react';
import { Users, Search, Phone, Mail, Calendar, FileText } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { formatDate } from '../../utils/formatters';

export const DoctorPatientsPage: React.FC = () => {
  const { appointments } = useData();
  const [search, setSearch] = useState('');

  // Extract unique patients from appointments
  const patientsMap = new Map<string, any>();
  appointments.forEach((apt) => {
    if (!patientsMap.has(apt.patientId)) {
      patientsMap.set(apt.patientId, {
        id: apt.patientId,
        name: apt.patientName,
        email: apt.patientEmail,
        phone: apt.patientPhone,
        lastVisit: apt.date,
        totalVisits: 1,
        latestReason: apt.symptomsReason,
      });
    } else {
      const p = patientsMap.get(apt.patientId);
      p.totalVisits += 1;
    }
  });

  const patients = Array.from(patientsMap.values()).filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs uppercase font-bold tracking-wider text-[#0F3040]">Doctor Portal</span>
          <h1 className="font-display text-3xl font-bold text-[#1F2937]">Patient Directory</h1>
          <p className="text-xs text-[#6B7280]">Manage patient records, contact info, and consultation histories.</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#0F3040] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search patient by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-black/10 rounded-full"
          />
        </div>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden border border-black/5 shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1F2937]">
            <thead className="bg-[#0F3040]/10 text-[#1F2937] uppercase font-bold tracking-wider text-[10px] border-b border-black/5">
              <tr>
                <th className="p-4">Patient Name</th>
                <th className="p-4">Contact Phone</th>
                <th className="p-4">Email</th>
                <th className="p-4">Last Visit</th>
                <th className="p-4">Total Consults</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {patients.map((p) => (
                <tr key={p.id} className="hover:bg-black/5 transition-colors">
                  <td className="p-4 font-bold flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0F3040]/20 text-[#1F2937] flex items-center justify-center font-bold">
                      {p.name[0]}
                    </div>
                    {p.name}
                  </td>
                  <td className="p-4 font-mono text-[#6B7280]">{p.phone}</td>
                  <td className="p-4 text-[#6B7280]">{p.email}</td>
                  <td className="p-4 text-[#6B7280]">{formatDate(p.lastVisit)}</td>
                  <td className="p-4 font-bold text-[#0F3040]">{p.totalVisits} Visits</td>
                  <td className="p-4 text-right">
                    <button className="px-3 py-1 bg-[#0F3040] text-white rounded-lg text-[11px] font-semibold">
                      View Records
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
