import React, { useState } from 'react';
import { Stethoscope, Plus, Search, Trash2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Modal } from '../../components/common/Modal';
import { formatCurrency } from '../../utils/formatters';

export const AdminDoctorsPage: React.FC = () => {
  const { doctors, addDoctor, deleteDoctor, updateDoctor, specialties } = useData();

  const [search, setSearch] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Add doctor form state
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [specialtyId, setSpecialtyId] = useState(specialties[0]?.id || 'cardiology');
  const [qualification, setQualification] = useState('');
  const [experienceYears, setExperienceYears] = useState(10);
  const [consultationFee, setConsultationFee] = useState(120);
  const [clinicName, setClinicName] = useState('');
  const [clinicAddress, setClinicAddress] = useState('');

  const filtered = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialtyName.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const specObj = specialties.find((s) => s.id === specialtyId);
    addDoctor({
      name,
      title,
      specialtyId,
      specialtyName: specObj?.name || 'General Medicine',
      qualification,
      experienceYears: Number(experienceYears),
      rating: 5.0,
      reviewsCount: 1,
      consultationFee: Number(consultationFee),
      clinicName,
      clinicAddress,
      languages: ['English'],
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
      about: `${name} is a board-certified specialist at ${clinicName}.`,
      availableDays: ['Mon', 'Wed', 'Fri'],
      availableTimeSlots: ['09:00 AM', '11:00 AM', '02:00 PM'],
      isVerified: true,
      isTopRated: true,
    });
    setAddModalOpen(false);
    setName('');
    setTitle('');
    setClinicName('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs uppercase font-bold tracking-wider text-[#0F3040]">Admin Governance</span>
          <h1 className="font-display text-3xl font-bold text-[#1F2937]">Doctor Credentials & Verification</h1>
          <p className="text-xs text-[#6B7280]">Verify medical licenses, update consultation fees, and register specialists.</p>
        </div>

        <button
          onClick={() => setAddModalOpen(true)}
          className="px-5 py-2.5 text-xs font-bold text-white bg-[#0F3040] hover:bg-[#D99B7F] rounded-full shadow-soft flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Doctor
        </button>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden border border-black/5 shadow-card">
        <div className="p-4 border-b border-black/5 bg-white/60">
          <input
            type="text"
            placeholder="Search doctor or specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-80 px-4 py-2 text-xs bg-white border border-black/10 rounded-full"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1F2937]">
            <thead className="bg-[#0F3040]/10 uppercase font-bold text-[10px] text-[#1F2937] border-b border-black/5">
              <tr>
                <th className="p-4">Doctor</th>
                <th className="p-4">Specialty</th>
                <th className="p-4">Experience</th>
                <th className="p-4">Fee</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-black/5 transition-colors">
                  <td className="p-4 font-bold flex items-center gap-3">
                    <img src={d.avatar} alt={d.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p>{d.name}</p>
                      <p className="text-[10px] text-[#6B7280]">{d.qualification}</p>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-[#0F3040]">{d.specialtyName}</td>
                  <td className="p-4 text-[#6B7280]">{d.experienceYears} Yrs</td>
                  <td className="p-4 font-mono font-bold">{formatCurrency(d.consultationFee)}</td>
                  <td className="p-4">
                    <button
                      onClick={() => updateDoctor(d.id, { isVerified: !d.isVerified })}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        d.isVerified ? 'bg-[#2E7D32]/10 text-[#2E7D32]' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {d.isVerified ? 'Verified' : 'Verify Now'}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => deleteDoctor(d.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} title="Register New Doctor">
        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-[#1F2937]">Doctor Name</label>
            <input
              type="text"
              required
              placeholder="Dr. Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 bg-white border border-black/10 rounded-xl"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#1F2937]">Title / Designation</label>
            <input
              type="text"
              required
              placeholder="e.g. Senior Cardiologist"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 bg-white border border-black/10 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-[#1F2937]">Specialty</label>
              <select
                value={specialtyId}
                onChange={(e) => setSpecialtyId(e.target.value)}
                className="w-full p-2.5 bg-white border border-black/10 rounded-xl"
              >
                {specialties.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#1F2937]">Fee ($)</label>
              <input
                type="number"
                required
                value={consultationFee}
                onChange={(e) => setConsultationFee(Number(e.target.value))}
                className="w-full p-2.5 bg-white border border-black/10 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#1F2937]">Clinic Name</label>
            <input
              type="text"
              required
              placeholder="e.g. St. Jude Heart Institute"
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
              className="w-full p-2.5 bg-white border border-black/10 rounded-xl"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 font-bold text-white bg-[#0F3040] rounded-xl hover:bg-[#D99B7F]"
          >
            Save & Add Doctor
          </button>
        </form>
      </Modal>
    </div>
  );
};
