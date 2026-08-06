import React, { useState } from 'react';
import { User, Phone, Mail, ShieldCheck, Heart, AlertCircle, Save, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ProfilePage: React.FC = () => {
  const { user, updateUserProfile } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [bloodGroup, setBloodGroup] = useState(user?.bloodGroup || 'O+');
  const [allergies, setAllergies] = useState(user?.allergies?.join(', ') || 'Penicillin');
  const [emergencyContact, setEmergencyContact] = useState(user?.emergencyContact || '+1 (555) 999-0000');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      email,
      phone,
      bloodGroup,
      allergies: allergies.split(',').map((a) => a.trim()),
      emergencyContact,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="space-y-1">
        <span className="text-xs uppercase font-bold tracking-wider text-[#0F3040]">Account Management</span>
        <h1 className="font-display text-3xl font-bold text-[#1F2937]">User Profile & Medical Emergency Info</h1>
        <p className="text-xs text-[#6B7280]">Update personal contact information, blood type, and emergency records.</p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-[#2E7D32]/10 border border-[#2E7D32]/30 rounded-2xl text-xs text-[#2E7D32] font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> Profile records updated successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="glass-panel p-6 sm:p-8 rounded-3xl border border-black/10 shadow-card space-y-6">
        {/* Avatar & Role Card */}
        <div className="flex items-center gap-4 pb-6 border-b border-black/5">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400'}
            alt={user?.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#0F3040]"
          />
          <div>
            <h3 className="font-display font-bold text-lg text-[#1F2937]">{user?.name}</h3>
            <span className="px-3 py-1 bg-[#0F3040]/15 text-[#1F2937] text-xs font-bold rounded-full uppercase tracking-wider">
              Role: {user?.role}
            </span>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-[#1F2937]">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-white border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0F3040]/50 text-[#1F2937]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#1F2937]">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-white border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0F3040]/50 text-[#1F2937]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#1F2937]">Phone Number</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 bg-white border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0F3040]/50 text-[#1F2937]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#1F2937]">Blood Group</label>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-full p-3 bg-white border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0F3040]/50 text-[#1F2937]"
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          <div className="sm:col-span-2 space-y-1">
            <label className="font-bold text-[#1F2937]">Allergies / Known Medical Conditions</label>
            <input
              type="text"
              placeholder="e.g. Penicillin, Peanuts, Asthma"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              className="w-full p-3 bg-white border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0F3040]/50 text-[#1F2937]"
            />
          </div>

          <div className="sm:col-span-2 space-y-1">
            <label className="font-bold text-[#1F2937]">Emergency Contact Number</label>
            <input
              type="tel"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              className="w-full p-3 bg-white border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0F3040]/50 text-[#1F2937]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3 text-xs font-bold text-white bg-[#0F3040] hover:bg-[#D99B7F] rounded-full shadow-soft transition-all flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" /> Save Profile Changes
        </button>
      </form>
    </div>
  );
};
