import React, { useState } from 'react';
import { Calendar, Clock, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export const DoctorSchedulePage: React.FC = () => {
  const [days, setDays] = useState(['Mon', 'Tue', 'Thu', 'Fri']);
  const [slots, setSlots] = useState(['09:00 AM', '10:30 AM', '01:30 PM', '03:00 PM', '04:30 PM']);
  const [newSlot, setNewSlot] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleDay = (day: string) => {
    setDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
  };

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSlot && !slots.includes(newSlot)) {
      setSlots([...slots, newSlot]);
      setNewSlot('');
    }
  };

  const handleRemoveSlot = (slot: string) => {
    setSlots(slots.filter((s) => s !== slot));
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="space-y-2">
        <span className="text-xs uppercase font-bold tracking-wider text-[#0F3040]">Doctor Portal</span>
        <h1 className="font-display text-3xl font-bold text-[#1F2937]">Schedule & Time Slot Settings</h1>
        <p className="text-xs text-[#6B7280]">Configure your weekly clinical availability and daily booking windows.</p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-[#2E7D32]/10 border border-[#2E7D32]/30 rounded-2xl text-xs text-[#2E7D32] font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> Schedule settings updated successfully!
        </div>
      )}

      {/* Available Working Days */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-black/10 shadow-card space-y-4">
        <h3 className="font-display font-bold text-lg text-[#1F2937]">Working Days</h3>
        <p className="text-xs text-[#6B7280]">Select the days when patients can book consultations.</p>

        <div className="flex flex-wrap gap-3 pt-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
            const active = days.includes(day);
            return (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`w-14 h-14 rounded-2xl font-bold text-xs transition-all ${
                  active
                    ? 'bg-[#0F3040] text-white shadow-soft scale-105'
                    : 'bg-white text-[#6B7280] border border-black/10 hover:border-black/20'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Time Slots */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-black/10 shadow-card space-y-6">
        <h3 className="font-display font-bold text-lg text-[#1F2937]">Daily Consultation Slots</h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {slots.map((slot) => (
            <div key={slot} className="p-3 bg-white/80 rounded-2xl border border-black/5 flex items-center justify-between text-xs">
              <span className="font-bold text-[#1F2937]">{slot}</span>
              <button
                onClick={() => handleRemoveSlot(slot)}
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Add New Slot Form */}
        <form onSubmit={handleAddSlot} className="flex gap-2 max-w-sm">
          <input
            type="text"
            placeholder="e.g. 05:30 PM"
            value={newSlot}
            onChange={(e) => setNewSlot(e.target.value)}
            className="w-full p-2.5 text-xs bg-white border border-black/10 rounded-xl"
          />
          <button
            type="submit"
            className="px-4 py-2.5 text-xs font-bold text-white bg-[#0F3040] rounded-xl hover:bg-[#D99B7F] shrink-0"
          >
            Add Slot
          </button>
        </form>
      </div>

      <button
        onClick={handleSave}
        className="px-8 py-3 text-xs font-bold text-white bg-[#0F3040] hover:bg-[#D99B7F] rounded-full shadow-soft"
      >
        Save Schedule Configuration
      </button>
    </div>
  );
};
