import React, { useState } from 'react';
import { Users, Search, Phone, Mail } from 'lucide-react';
import { INITIAL_USERS } from '../../data/mockData';

export const AdminPatientsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const patients = INITIAL_USERS.filter((u) => u.role === 'patient');

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="space-y-1">
        <span className="text-xs uppercase font-bold tracking-wider text-[#0F3040]">Admin Governance</span>
        <h1 className="font-display text-3xl font-bold text-[#1F2937]">Registered Patient Accounts</h1>
        <p className="text-xs text-[#6B7280]">System user ledger and patient account status.</p>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden border border-black/5 shadow-card">
        <div className="p-4 border-b border-black/5 bg-white/60">
          <input
            type="text"
            placeholder="Search patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-80 px-4 py-2 text-xs bg-white border border-black/10 rounded-full"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1F2937]">
            <thead className="bg-[#0F3040]/10 uppercase font-bold text-[10px] text-[#1F2937] border-b border-black/5">
              <tr>
                <th className="p-4">Patient Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Blood Group</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-black/5 transition-colors">
                  <td className="p-4 font-bold flex items-center gap-3">
                    <img src={p.avatar} alt={p.name} className="w-8 h-8 rounded-full object-cover" />
                    {p.name}
                  </td>
                  <td className="p-4 text-[#6B7280]">{p.email}</td>
                  <td className="p-4 font-mono text-[#6B7280]">{p.phone}</td>
                  <td className="p-4 font-bold text-[#0F3040]">{p.bloodGroup || 'O+'}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-[#2E7D32]/10 text-[#2E7D32] font-bold text-[10px] rounded-full">
                      Active
                    </span>
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
