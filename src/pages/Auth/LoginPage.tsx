import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stethoscope, User, Stethoscope as DocIcon, Shield, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const { login, demoLogin } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<UserRole>('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const res = login(email, password, role);
    if (res.success) {
      if (res.role === 'doctor') navigate('/doctor/dashboard');
      else if (res.role === 'admin') navigate('/admin/dashboard');
      else navigate('/patient/dashboard');
    } else {
      setErrorMessage(res.message || 'Invalid credentials or user role.');
    }
  };

  const handleDemoClick = (targetRole: UserRole) => {
    demoLogin(targetRole);
    if (targetRole === 'doctor') navigate('/doctor/dashboard');
    else if (targetRole === 'admin') navigate('/admin/dashboard');
    else navigate('/patient/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#0F3040] text-white flex items-center justify-center mx-auto shadow-soft">
            <Stethoscope className="w-6 h-6 stroke-[2.2]" />
          </div>
          <h1 className="font-display text-3xl font-bold text-[#1F2937]">Welcome Back</h1>
          <p className="text-xs text-[#6B7280]">Sign in to manage your appointments, prescriptions, and health records.</p>
        </div>

        {/* Role Switcher Tabs */}
        <div className="p-1 bg-white/70 rounded-full border border-black/10 grid grid-cols-3 gap-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setRole('patient');
              setEmail('patient@example.com');
            }}
            className={`py-2 rounded-full transition-all flex items-center justify-center gap-1.5 ${
              role === 'patient' ? 'bg-[#0F3040] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#1F2937]'
            }`}
          >
            <User className="w-3.5 h-3.5" /> Patient
          </button>
          <button
            type="button"
            onClick={() => {
              setRole('doctor');
              setEmail('doctor@medibook.com');
            }}
            className={`py-2 rounded-full transition-all flex items-center justify-center gap-1.5 ${
              role === 'doctor' ? 'bg-[#0F3040] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#1F2937]'
            }`}
          >
            <DocIcon className="w-3.5 h-3.5" /> Doctor
          </button>
          <button
            type="button"
            onClick={() => {
              setRole('admin');
              setEmail('admin@medibook.com');
            }}
            className={`py-2 rounded-full transition-all flex items-center justify-center gap-1.5 ${
              role === 'admin' ? 'bg-[#0F3040] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#1F2937]'
            }`}
          >
            <Shield className="w-3.5 h-3.5" /> Admin
          </button>
        </div>

        {/* Direct Demo Login Quick Banner */}
        <div className="p-4 glass-card rounded-2xl border border-[#A56F63]/30 space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#967432] block">
            ⚡ Quick 1-Click Demo Login
          </span>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              onClick={() => handleDemoClick('patient')}
              className="px-2 py-1.5 bg-[#0F3040]/15 text-[#1F2937] rounded-xl font-bold hover:bg-[#0F3040]/30 transition-colors text-center truncate"
            >
              Patient Demo
            </button>
            <button
              onClick={() => handleDemoClick('doctor')}
              className="px-2 py-1.5 bg-[#0F3040]/15 text-[#1F2937] rounded-xl font-bold hover:bg-[#0F3040]/30 transition-colors text-center truncate"
            >
              Doctor Demo
            </button>
            <button
              onClick={() => handleDemoClick('admin')}
              className="px-2 py-1.5 bg-[#0F3040]/15 text-[#1F2937] rounded-xl font-bold hover:bg-[#0F3040]/30 transition-colors text-center truncate"
            >
              Admin Demo
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-black/10 shadow-card space-y-4">
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-[#C62828] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1F2937]">Email Address</label>
            <input
              type="email"
              required
              placeholder="e.g. patient@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 text-xs bg-white border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0F3040]/50 text-[#1F2937]"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-[#1F2937]">Password</label>
              <Link to="/forgot-password" className="text-[#0F3040] hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 text-xs bg-white border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0F3040]/50 text-[#1F2937]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 text-xs font-bold text-white bg-[#0F3040] hover:bg-[#D99B7F] rounded-2xl shadow-soft transition-all flex items-center justify-center gap-2"
          >
            <span>Sign In to Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-[#6B7280]">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-[#0F3040] hover:underline">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};
