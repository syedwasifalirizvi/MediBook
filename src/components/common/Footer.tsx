import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Stethoscope,
  ShieldCheck,
  PhoneCall,
  Mail,
  CheckCircle2,
  Award,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  HelpCircle,
  FileText,
  MapPin,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Modal } from './Modal';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'faq' | 'contact' | null>(null);

  const { demoLogin } = useAuth();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <>
      <footer className="bg-[#0F3040] text-white pt-16 pb-12 mt-24 border-t border-[#464858]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
            
            {/* Brand Col */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#A56F63] flex items-center justify-center text-white shadow-soft">
                  <Stethoscope className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="font-display text-2xl font-bold tracking-tight text-white">
                  Medi<span className="text-[#D99B7F]">Book</span>
                </span>
              </div>
              <p className="text-sm text-gray-300 max-w-sm leading-relaxed">
                Elevating healthcare delivery through frictionless appointment scheduling, verified specialist credentials, and digital care coordination.
              </p>
              
              <div className="flex items-center gap-4 pt-2 text-xs text-gray-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#D99B7F]" /> HIPAA Compliant
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#A56F63]" /> Board Certified Specialists
                </span>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-3">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D99B7F] flex items-center justify-center transition-colors text-white"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D99B7F] flex items-center justify-center transition-colors text-white"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D99B7F] flex items-center justify-center transition-colors text-white"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D99B7F] flex items-center justify-center transition-colors text-white"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#D99B7F]">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/doctors" className="hover:text-white transition-colors">Find a Doctor</Link></li>
                <li><Link to="/specialties" className="hover:text-white transition-colors">Medical Specialties</Link></li>
                <li><Link to="/articles" className="hover:text-white transition-colors">Health Knowledge Base</Link></li>
                <li><button onClick={() => setActiveModal('faq')} className="hover:text-white transition-colors text-left">Frequently Asked Questions (FAQ)</button></li>
                <li><button onClick={() => setActiveModal('contact')} className="hover:text-white transition-colors text-left">Contact Us</button></li>
              </ul>
            </div>

            {/* Column 3: Demo Portals */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#D99B7F]">Quick Portals</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <button
                    onClick={() => demoLogin('patient')}
                    className="hover:text-[#D99B7F] transition-colors text-left"
                  >
                    Patient Portal (Demo)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => demoLogin('doctor')}
                    className="hover:text-[#D99B7F] transition-colors text-left"
                  >
                    Doctor Portal (Demo)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => demoLogin('admin')}
                    className="hover:text-[#D99B7F] transition-colors text-left"
                  >
                    Admin Control (Demo)
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Newsletter & Emergency */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#D99B7F]">Stay Informed</h4>
              <p className="text-xs text-gray-300">Subscribe for medical insights and preventive health tips.</p>

              {subscribed ? (
                <div className="p-3 bg-[#2E7D32]/30 border border-[#2E7D32]/50 rounded-xl text-xs text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" /> Thank you for subscribing!
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white/10 border border-white/10 rounded-xl focus:outline-none focus:border-[#D99B7F] text-white placeholder-gray-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#A56F63] text-white text-xs font-semibold rounded-xl hover:bg-[#D99B7F] transition-colors whitespace-nowrap"
                  >
                    Join
                  </button>
                </form>
              )}

              <div className="p-3 bg-red-950/60 border border-red-800/40 rounded-xl flex items-center gap-3">
                <PhoneCall className="w-5 h-5 text-red-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase">Emergency Hotline</p>
                  <p className="text-xs font-bold text-red-200">Call 911 or 1-800-MED-HELP</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
            <p>© {new Date().getFullYear()} MediBook Inc. Built with React 19, TypeScript & Tailwind CSS.</p>
            <div className="flex items-center gap-6">
              <button onClick={() => setActiveModal('privacy')} className="hover:text-white transition-colors">
                Privacy Policy
              </button>
              <button onClick={() => setActiveModal('terms')} className="hover:text-white transition-colors">
                Terms of Service
              </button>
              <button onClick={() => setActiveModal('contact')} className="hover:text-white transition-colors">
                Support & Contact
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals for Privacy, Terms, FAQ, Contact */}
      <Modal
        isOpen={activeModal === 'privacy'}
        onClose={() => setActiveModal(null)}
        title="MediBook Privacy Policy"
      >
        <div className="space-y-4 text-xs text-[#1F2937] leading-relaxed max-h-96 overflow-y-auto pr-2">
          <p className="font-semibold text-sm text-[#0F3040]">Last Updated: January 2026</p>
          <p>
            MediBook is committed to safeguarding patient health information in compliance with HIPAA guidelines. All sensitive communication and diagnostic data is encrypted both in transit and at rest.
          </p>
          <h4 className="font-bold text-[#0F3040]">1. Data Collection</h4>
          <p>We collect essential information required to facilitate consultations, including name, contact details, medical history notes, and appointment schedules.</p>
          <h4 className="font-bold text-[#0F3040]">2. Data Protection</h4>
          <p>Your medical records are stored strictly for your care team. We do not sell or monetize personal health data under any circumstances.</p>
          <h4 className="font-bold text-[#0F3040]">3. Patient Rights</h4>
          <p>You may request exported transcripts of your medical history, prescriptions, or account details at any time through your Patient Dashboard.</p>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'terms'}
        onClose={() => setActiveModal(null)}
        title="Terms of Service"
      >
        <div className="space-y-4 text-xs text-[#1F2937] leading-relaxed max-h-96 overflow-y-auto pr-2">
          <p className="font-semibold text-sm text-[#0F3040]">Standard Platform Terms</p>
          <p>
            By utilizing MediBook, you agree to our terms of appointment booking, specialist verification guidelines, and respectful platform participation.
          </p>
          <h4 className="font-bold text-[#0F3040]">1. Appointment Cancellations</h4>
          <p>Appointments may be rescheduled or cancelled up to 2 hours prior to the scheduled slot without penalty.</p>
          <h4 className="font-bold text-[#0F3040]">2. Specialist Verifications</h4>
          <p>All physicians listed on MediBook undergo strict credential checks and state board license verifications.</p>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'faq'}
        onClose={() => setActiveModal(null)}
        title="Frequently Asked Questions (FAQ)"
      >
        <div className="space-y-4 text-xs text-[#1F2937] leading-relaxed max-h-96 overflow-y-auto pr-2">
          <div>
            <h4 className="font-bold text-[#0F3040] text-sm">How do I book an appointment?</h4>
            <p className="text-[#6B7280]">Browse specialists by category or name, select an available time slot, choose in-person or video consultation, and confirm your booking.</p>
          </div>
          <div>
            <h4 className="font-bold text-[#0F3040] text-sm">Are video consultations secure?</h4>
            <p className="text-[#6B7280]">Yes, video sessions utilize end-to-end encrypted WebRTC channels conforming to HIPAA tele-health regulations.</p>
          </div>
          <div>
            <h4 className="font-bold text-[#0F3040] text-sm">How do I access my prescriptions?</h4>
            <p className="text-[#6B7280]">Log into your Patient Portal and navigate to "Prescriptions" to view digital scripts, dosages, and PDF export options.</p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'contact'}
        onClose={() => setActiveModal(null)}
        title="Contact Healthcare Concierge"
      >
        <div className="space-y-4 text-xs text-[#1F2937]">
          <div className="flex items-center gap-3 p-3 bg-[#0F3040]/5 rounded-xl">
            <Mail className="w-5 h-5 text-[#0F3040]" />
            <div>
              <p className="font-bold text-[#0F3040]">Email Support</p>
              <p className="text-[#6B7280]">support@medibook.app</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#0F3040]/5 rounded-xl">
            <PhoneCall className="w-5 h-5 text-[#0F3040]" />
            <div>
              <p className="font-bold text-[#0F3040]">Patient Concierge Desk</p>
              <p className="text-[#6B7280]">1-800-555-MEDIBOOK (Mon-Fri 8am-8pm EST)</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#0F3040]/5 rounded-xl">
            <MapPin className="w-5 h-5 text-[#0F3040]" />
            <div>
              <p className="font-bold text-[#0F3040]">Headquarters</p>
              <p className="text-[#6B7280]">450 Medical Plaza, Suite 1200, Boston, MA 02115</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
