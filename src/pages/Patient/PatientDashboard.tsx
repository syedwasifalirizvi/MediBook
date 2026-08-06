import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  FileText,
  Heart,
  Activity,
  Plus,
  ArrowRight,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  FilePlus,
  Stethoscope,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/common/StatCard';
import { AppointmentCard } from '../../components/common/AppointmentCard';
import { DoctorCard } from '../../components/common/DoctorCard';
import { formatDate } from '../../utils/formatters';

export const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const { appointments, prescriptions, reports, favorites, doctors } = useData();

  const userAppointments = appointments.filter((a) => a.patientId === (user?.id || 'patient-1'));
  const upcomingAppointments = userAppointments.filter((a) => a.status === 'upcoming');
  const nextAppointment = upcomingAppointments[0];

  const userPrescriptions = prescriptions.filter((p) => p.patientId === (user?.id || 'patient-1'));
  const userReports = reports.filter((r) => r.patientId === (user?.id || 'patient-1'));
  const favoriteDoctors = doctors.filter((d) => favorites.includes(d.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-black/10 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs uppercase font-bold tracking-wider text-[#0F3040]">Patient Portal</span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#1F2937]">
            Hello, {user?.name || 'Sarah'} 👋
          </h1>
          <p className="text-xs text-[#6B7280]">
            Here is your personalized health overview and scheduled consultation summary.
          </p>
        </div>

        <Link
          to="/doctors"
          className="px-6 py-3 text-xs font-bold text-white bg-[#0F3040] hover:bg-[#D99B7F] rounded-full shadow-soft transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" /> Book New Appointment
        </Link>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Upcoming Consults"
          value={upcomingAppointments.length}
          icon={Calendar}
          subtext="Next visit scheduled soon"
        />
        <StatCard
          title="Active Prescriptions"
          value={userPrescriptions.length}
          icon={FileText}
          subtext="Digital Rx records available"
        />
        <StatCard
          title="Saved Doctors"
          value={favoriteDoctors.length}
          icon={Heart}
          subtext="Favorite care specialists"
        />
        <StatCard
          title="Lab & Diagnostics"
          value={userReports.length}
          icon={Activity}
          subtext="Verified diagnostic reports"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Next Appointment & Prescriptions */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Next Consultation Spotlight */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-xl text-[#1F2937]">Next Consultation Spotlight</h3>
              <Link to="/patient/appointments" className="text-xs font-bold text-[#0F3040] hover:underline flex items-center gap-1">
                <span>All Appointments ({userAppointments.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {nextAppointment ? (
              <AppointmentCard appointment={nextAppointment} />
            ) : (
              <div className="glass-card p-8 rounded-3xl border border-black/5 text-center space-y-3">
                <Calendar className="w-10 h-10 text-[#0F3040] mx-auto" />
                <h4 className="font-bold text-sm text-[#1F2937]">No Upcoming Appointments</h4>
                <p className="text-xs text-[#6B7280]">Schedule a consultation with a top specialist today.</p>
                <Link
                  to="/doctors"
                  className="inline-block px-5 py-2 text-xs font-semibold text-white bg-[#0F3040] rounded-full"
                >
                  Find a Doctor
                </Link>
              </div>
            )}
          </div>

          {/* Recent Prescriptions Preview */}
          <div className="glass-card p-6 rounded-3xl border border-black/5 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-lg text-[#1F2937] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0F3040]" /> Recent Digital Prescriptions
              </h3>
              <Link to="/patient/prescriptions" className="text-xs font-bold text-[#0F3040] hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {userPrescriptions.map((rx) => (
                <div key={rx.id} className="p-4 bg-white/80 rounded-2xl border border-black/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                  <div>
                    <h4 className="font-bold text-[#1F2937]">{rx.diagnosis}</h4>
                    <p className="text-[#6B7280]">Prescribed by {rx.doctorName} • {formatDate(rx.date)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {rx.medicines.map((m, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-[#0F3040]/15 text-[#1F2937] font-semibold rounded text-[10px]">
                          {m.name} ({m.dosage})
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    to="/patient/prescriptions"
                    className="px-3 py-1.5 text-xs font-semibold text-[#0F3040] border border-[#0F3040]/30 rounded-xl hover:bg-[#0F3040]/10 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Lab Reports & Quick Vitals */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Medical Reports Widget */}
          <div className="glass-card p-6 rounded-3xl border border-black/5 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-[#1F2937] flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#0F3040]" /> Diagnostic Reports
              </h3>
              <Link to="/patient/reports" className="text-xs font-bold text-[#0F3040] hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {userReports.map((rep) => (
                <div key={rep.id} className="p-3 bg-white/80 rounded-2xl border border-black/5 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1F2937] truncate">{rep.title}</span>
                    <span className="px-2 py-0.5 bg-[#2E7D32]/10 text-[#2E7D32] font-bold text-[10px] rounded-full">
                      {rep.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6B7280]">{rep.type} • {formatDate(rep.date)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Favorites Widget */}
          <div className="glass-card p-6 rounded-3xl border border-black/5 shadow-card space-y-4">
            <h3 className="font-display font-bold text-base text-[#1F2937] flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#A56F63]" /> Saved Specialists
            </h3>

            {favoriteDoctors.length === 0 ? (
              <p className="text-xs text-[#6B7280] italic">No saved doctors yet.</p>
            ) : (
              <div className="space-y-3">
                {favoriteDoctors.slice(0, 3).map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-2 rounded-2xl bg-white/60">
                    <div className="flex items-center gap-3">
                      <img src={doc.avatar} alt={doc.name} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <h5 className="font-bold text-xs text-[#1F2937]">{doc.name}</h5>
                        <p className="text-[10px] text-[#6B7280]">{doc.specialtyName}</p>
                      </div>
                    </div>
                    <Link
                      to={`/booking/${doc.id}`}
                      className="px-3 py-1 text-[11px] font-bold text-white bg-[#0F3040] rounded-xl"
                    >
                      Book
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
