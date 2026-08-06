import React from 'react';
import { Building, Stethoscope, Plus } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminDepartmentsPage: React.FC = () => {
  const { specialties } = useData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs uppercase font-bold tracking-wider text-[#0F3040]">Admin Governance</span>
          <h1 className="font-display text-3xl font-bold text-[#1F2937]">Clinical Departments & Specialties</h1>
          <p className="text-xs text-[#6B7280]">Manage medical specialties, descriptions, and doctor assignments.</p>
        </div>

        <button
          onClick={() => alert('Department creation wizard ready')}
          className="px-5 py-2.5 text-xs font-bold text-white bg-[#0F3040] hover:bg-[#D99B7F] rounded-full shadow-soft flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Department
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {specialties.map((sp) => (
          <div key={sp.id} className="glass-card p-6 rounded-3xl border border-black/5 shadow-card space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0F3040]/15 text-[#0F3040] flex items-center justify-center font-bold">
              <Stethoscope className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#1F2937]">{sp.name}</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">{sp.description}</p>
            <div className="pt-2 flex items-center justify-between text-xs border-t border-black/5">
              <span className="font-bold text-[#0F3040]">{sp.doctorCount} Doctors Active</span>
              <button className="text-[#1F2937] hover:underline font-semibold">Edit Info</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
