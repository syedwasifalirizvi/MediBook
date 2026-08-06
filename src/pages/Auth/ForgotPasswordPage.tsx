import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#A56F63]/20 text-[#A56F63] flex items-center justify-center mx-auto shadow-soft">
            <KeyRound className="w-6 h-6 stroke-[2.2]" />
          </div>
          <h1 className="font-display text-3xl font-bold text-[#1F2937]">Password Recovery</h1>
          <p className="text-xs text-[#6B7280]">Enter your registered email address to receive reset instructions.</p>
        </div>

        {submitted ? (
          <div className="glass-panel p-8 rounded-3xl border border-black/10 shadow-card text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-[#2E7D32] mx-auto" />
            <h3 className="font-bold text-base text-[#1F2937]">Reset Link Sent!</h3>
            <p className="text-xs text-[#6B7280]">
              We sent a verification link to <strong className="text-[#1F2937]">{email}</strong>. Check your inbox and follow the instructions.
            </p>
            <Link
              to="/login"
              className="inline-block px-6 py-2.5 text-xs font-bold text-white bg-[#0F3040] rounded-full hover:bg-[#D99B7F] transition-colors"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-black/10 shadow-card space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1F2937]">Email Address</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 text-xs bg-white border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0F3040]/50 text-[#1F2937]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 text-xs font-bold text-white bg-[#0F3040] hover:bg-[#D99B7F] rounded-2xl shadow-soft transition-all"
            >
              Send Reset Instructions
            </button>
          </form>
        )}

        <div className="text-center">
          <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] hover:text-[#1F2937]">
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
};
