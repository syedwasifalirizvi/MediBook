import React, { useState } from 'react';
import { Send, User, CheckCheck, MessageSquare } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export const DoctorMessagesPage: React.FC = () => {
  const { user } = useAuth();
  const { messages, sendMessage } = useData();

  const [input, setInput] = useState('');

  const activeMessages = messages.filter(
    (m) => m.senderId === 'patient-1' || m.receiverId === 'patient-1'
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({
        senderId: user?.role === 'doctor' ? 'doc-user-1' : 'patient-1',
        receiverId: user?.role === 'doctor' ? 'patient-1' : 'doc-user-1',
        senderName: user?.name || 'Dr. Eleanor Vance',
        text: input,
      });
      setInput('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="space-y-1">
        <span className="text-xs uppercase font-bold tracking-wider text-[#0F3040]">Communication Hub</span>
        <h1 className="font-display text-3xl font-bold text-[#1F2937]">Patient Secure Messaging</h1>
        <p className="text-xs text-[#6B7280]">Direct HIPAA-compliant consultation chat between doctor and patient.</p>
      </div>

      <div className="glass-panel rounded-3xl border border-black/10 shadow-card flex flex-col h-[600px] overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 bg-white/80 border-b border-black/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#0F3040]/20 text-[#1F2937] font-bold flex items-center justify-center">
            SJ
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#1F2937]">Sarah Jenkins</h4>
            <span className="text-[10px] text-[#2E7D32] font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" /> Online
            </span>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#F8F7F5]/50">
          {activeMessages.map((m) => {
            const isMe = user?.role === 'doctor' ? m.senderId === 'doc-user-1' : m.senderId === 'patient-1';
            return (
              <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs sm:max-w-md p-4 rounded-2xl text-xs space-y-1 ${
                    isMe
                      ? 'bg-[#0F3040] text-white rounded-br-none shadow-sm'
                      : 'bg-white text-[#1F2937] rounded-bl-none border border-black/5 shadow-sm'
                  }`}
                >
                  <p className="font-semibold text-[10px] opacity-80">{m.senderName}</p>
                  <p className="leading-relaxed">{m.text}</p>
                  <span className={`block text-[9px] text-right opacity-70 ${isMe ? 'text-white' : 'text-[#6B7280]'}`}>
                    {m.timestamp}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-black/5 flex gap-2">
          <input
            type="text"
            placeholder="Type your message or clinical advice..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-4 py-3 text-xs bg-[#F8F7F5] border border-black/10 rounded-2xl focus:outline-none"
          />
          <button
            type="submit"
            className="px-5 py-3 text-xs font-bold text-white bg-[#0F3040] rounded-2xl hover:bg-[#D99B7F] transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Send className="w-4 h-4" /> Send
          </button>
        </form>
      </div>
    </div>
  );
};
