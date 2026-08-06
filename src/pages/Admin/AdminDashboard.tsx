import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Stethoscope,
  Calendar,
  DollarSign,
  ShieldCheck,
  TrendingUp,
  Building,
  Activity,
  UserCheck,
  Plus,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/common/StatCard';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const AdminDashboard: React.FC = () => {
  const { doctors, appointments, specialties } = useData();

  const totalRevenue = appointments.reduce((acc, curr) => acc + curr.fee, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-black/10 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs uppercase font-bold tracking-wider text-[#A56F63]">Admin Command Center</span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#1F2937]">
            Platform Governance & Analytics
          </h1>
          <p className="text-xs text-[#6B7280]">
            System-wide operational ledger, doctor verification, and revenue management.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/doctors"
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#0F3040] hover:bg-[#D99B7F] rounded-full shadow-soft flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Manage Doctors
          </Link>
          <Link
            to="/admin/departments"
            className="px-5 py-2.5 text-xs font-bold text-[#1F2937] bg-white border border-black/10 rounded-full hover:bg-black/5"
          >
            Departments
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Doctors"
          value={doctors.length}
          change="+18%"
          trend="up"
          icon={Stethoscope}
          subtext="Verified Specialists"
        />
        <StatCard
          title="Total Patients"
          value="1,248"
          change="+24%"
          trend="up"
          icon={Users}
          subtext="Registered Accounts"
        />
        <StatCard
          title="Total Consultations"
          value={appointments.length}
          change="+12%"
          trend="up"
          icon={Calendar}
          subtext="Bookings completed"
        />
        <StatCard
          title="Gross Revenue"
          value={formatCurrency(totalRevenue)}
          change="+32%"
          trend="up"
          icon={DollarSign}
          subtext="Platform Booking Fees"
        />
      </div>

      {/* Department Distribution & Doctor Roster */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Doctor Roster Overview */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-black/5 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-lg text-[#1F2937]">Specialist Doctor Directory</h3>
              <Link to="/admin/doctors" className="text-xs font-bold text-[#0F3040] hover:underline">
                View All ({doctors.length})
              </Link>
            </div>

            <div className="space-y-3">
              {doctors.map((doc) => (
                <div key={doc.id} className="p-4 bg-white/80 rounded-2xl border border-black/5 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={doc.avatar} alt={doc.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-[#1F2937] text-sm">{doc.name}</h4>
                      <p className="text-[#6B7280]">{doc.specialtyName} • {doc.clinicName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-bold text-[#1F2937]">{formatCurrency(doc.consultationFee)}</span>
                    <span className={`px-2.5 py-1 font-bold text-[10px] rounded-full ${
                      doc.isVerified ? 'bg-[#2E7D32]/10 text-[#2E7D32]' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {doc.isVerified ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Departments & Activity */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-black/5 shadow-card space-y-4">
            <h3 className="font-display font-bold text-base text-[#1F2937]">Clinical Departments</h3>

            <div className="space-y-3">
              {specialties.map((sp) => (
                <div key={sp.id} className="p-3 bg-white/80 rounded-2xl border border-black/5 flex items-center justify-between text-xs">
                  <div>
                    <h5 className="font-bold text-[#1F2937]">{sp.name}</h5>
                    <p className="text-[10px] text-[#6B7280]">{sp.doctorCount} Doctors Listed</p>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#0F3040]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
