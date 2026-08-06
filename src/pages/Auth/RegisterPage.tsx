import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stethoscope, User, Stethoscope as DocIcon, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<UserRole>('patient');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const res = register({ name, email, role, phone });
    if (res.success) {
      if (res.role === 'doctor') navigate('/doctor/dashboard');
      else navigate('/patient/dashboard');
    } else {
      setErrorMessage(res.message || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#0F3040] text-white flex items-center justify-center mx-auto shadow-soft">
            <Stethoscope className="w-6 h-6 stroke-[2.2]" />
          </div>
          <h1 className="font-display text-3xl font-bold text-[#1F2937]">Create an Account</h1>
          <p className="text-xs text-[#6B7280]">Join MediBook to experience modern healthcare concierge services.</p>
        </div>

        {/* Role Selection */}
        <div className="p-1 bg-white/70 rounded-full border border-black/10 grid grid-cols-2 gap-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setRole('patient')}
            className={`py-2 rounded-full transition-all flex items-center justify-center gap-1.5 ${
              role === 'patient' ? 'bg-[#0F3040] text-white shadow-sm' : 'text-[#6B7280]'
            }`}
          >
            <User className="w-3.5 h-3.5" /> Patient Registration
          </button>
          <button
            type="button"
            onClick={() => setRole('doctor')}
            className={`py-2 rounded-full transition-all flex items-center justify-center gap-1.5 ${
              role === 'doctor' ? 'bg-[#0F3040] text-white shadow-sm' : 'text-[#6B7280]'
            }`}
          >
            <DocIcon className="w-3.5 h-3.5" /> Doctor Registration
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleRegisterSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-black/10 shadow-card space-y-4">
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-[#C62828] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1F2937]">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Sarah Jenkins"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 text-xs bg-white border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0F3040]/50 text-[#1F2937]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1F2937]">Email Address</label>
            <input
              type="email"
              required
              placeholder="sarah@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 text-xs bg-white border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0F3040]/50 text-[#1F2937]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1F2937]">Phone Number</label>
            <input
              type="tel"
              required
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 text-xs bg-white border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0F3040]/50 text-[#1F2937]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1F2937]">Password</label>
            <input
              type="password"
              required
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 text-xs bg-white border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0F3040]/50 text-[#1F2937]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 text-xs font-bold text-white bg-[#0F3040] hover:bg-[#D99B7F] rounded-2xl shadow-soft transition-all flex items-center justify-center gap-2"
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-[#6B7280]">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-[#0F3040] hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
