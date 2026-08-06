import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  Stethoscope,
  Search,
  Calendar,
  Bell,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Heart,
  Shield,
  LayoutDashboard,
  FileText,
  UserCheck,
  CheckCircle2,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, demoLogin } = useAuth();
  const { notifications, markAllNotificationsRead } = useData();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const userNotifs = user ? notifications.filter(n => n.userId === user.id) : [];
  const unreadCount = userNotifs.filter(n => !n.read).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/doctors?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'doctor') return '/doctor/dashboard';
    if (user.role === 'admin') return '/admin/dashboard';
    return '/patient/dashboard';
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#F8F7F5]/80 border-b border-[#000000]/[0.06] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#0F3040] flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform duration-200">
              <Stethoscope className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold tracking-tight text-[#1F2937]">
                Medi<span className="text-[#0F3040]">Book</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#6B7280] font-semibold">
                Healthcare Concierge
              </span>
            </div>
          </Link>

          {/* Quick Search Input (Desktop) */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative w-64 lg:w-80">
            <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search doctors, specialties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white/70 border border-black/10 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0F3040]/50 focus:bg-white placeholder-[#6B7280] transition-all"
            />
          </form>

          {/* Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#1F2937]">
            <Link
              to="/doctors"
              className={`hover:text-[#0F3040] transition-colors ${
                location.pathname.startsWith('/doctors') ? 'text-[#0F3040] font-semibold' : ''
              }`}
            >
              Find Doctors
            </Link>
            <Link
              to="/specialties"
              className={`hover:text-[#0F3040] transition-colors ${
                location.pathname === '/specialties' ? 'text-[#0F3040] font-semibold' : ''
              }`}
            >
              Specialties
            </Link>
            <Link
              to="/articles"
              className={`hover:text-[#0F3040] transition-colors ${
                location.pathname === '/articles' ? 'text-[#0F3040] font-semibold' : ''
              }`}
            >
              Health Hub
            </Link>
          </nav>

          {/* Action Right Section */}
          <div className="hidden sm:flex items-center gap-3">
            {isAuthenticated && user ? (
              <>
                {/* Notifications Bell */}
                <div className="relative">
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="p-2.5 rounded-full bg-white/80 border border-black/5 hover:bg-white text-[#1F2937] transition-colors relative shadow-sm"
                    aria-label="Notifications"
                  >
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#C62828] rounded-full ring-2 ring-[#F8F7F5]" />
                    )}
                  </button>

                  {/* Notifications Popover */}
                  {notificationsOpen && (
                    <div className="absolute right-0 mt-3 w-80 sm:w-96 glass-card rounded-2xl shadow-card p-4 border border-black/10 z-50">
                      <div className="flex items-center justify-between pb-3 border-b border-black/5">
                        <h4 className="font-semibold text-sm text-[#1F2937] flex items-center gap-2">
                          <Bell className="w-4 h-4 text-[#0F3040]" /> Notifications
                        </h4>
                        {unreadCount > 0 && (
                          <button
                            onClick={() => user && markAllNotificationsRead(user.id)}
                            className="text-xs text-[#0F3040] hover:underline font-medium"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>

                      <div className="max-h-72 overflow-y-auto divide-y divide-black/5 my-2">
                        {userNotifs.length === 0 ? (
                          <p className="text-xs text-[#6B7280] text-center py-6">No notifications yet.</p>
                        ) : (
                          userNotifs.map((n) => (
                            <div
                              key={n.id}
                              onClick={() => {
                                if (n.link) navigate(n.link);
                                setNotificationsOpen(false);
                              }}
                              className={`py-3 px-2 text-xs cursor-pointer hover:bg-black/5 rounded-lg transition-colors ${
                                !n.read ? 'bg-[#464858]/15 font-medium' : ''
                              }`}
                            >
                              <div className="flex items-center justify-between font-semibold text-[#1F2937]">
                                <span>{n.title}</span>
                                <span className="text-[10px] text-[#6B7280] font-normal">{n.timestamp}</span>
                              </div>
                              <p className="text-[#6B7280] mt-1 line-clamp-2">{n.message}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Dashboard & Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 pr-3 glass-card rounded-full border border-black/10 hover:border-[#0F3040] transition-all shadow-sm"
                  >
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border border-[#0F3040]"
                    />
                    <div className="text-left hidden md:block leading-tight">
                      <p className="text-xs font-semibold text-[#1F2937] truncate max-w-[100px]">{user.name}</p>
                      <p className="text-[10px] capitalize text-[#0F3040] font-medium">{user.role}</p>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-[#6B7280]" />
                  </button>

                  {/* Profile Dropdown Items */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 glass-card rounded-2xl shadow-card p-2 border border-black/10 z-50 divide-y divide-black/5">
                      <div className="px-3 py-2">
                        <p className="text-xs font-bold text-[#1F2937]">{user.name}</p>
                        <p className="text-[11px] text-[#6B7280] truncate">{user.email}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md bg-[#0F3040]/20 text-[#1F2937]">
                          Role: {user.role}
                        </span>
                      </div>

                      <div className="py-1">
                        <Link
                          to={getDashboardLink()}
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs text-[#1F2937] hover:bg-black/5 rounded-lg transition-colors font-medium"
                        >
                          <LayoutDashboard className="w-4 h-4 text-[#0F3040]" />
                          Dashboard
                        </Link>
                        {user.role === 'patient' && (
                          <>
                            <Link
                              to="/patient/appointments"
                              onClick={() => setProfileDropdownOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 text-xs text-[#1F2937] hover:bg-black/5 rounded-lg transition-colors font-medium"
                            >
                              <Calendar className="w-4 h-4 text-[#0F3040]" />
                              Appointments
                            </Link>
                            <Link
                              to="/patient/favorites"
                              onClick={() => setProfileDropdownOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 text-xs text-[#1F2937] hover:bg-black/5 rounded-lg transition-colors font-medium"
                            >
                              <Heart className="w-4 h-4 text-[#A56F63]" />
                              Favorites
                            </Link>
                          </>
                        )}
                        <Link
                          to="/profile"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs text-[#1F2937] hover:bg-black/5 rounded-lg transition-colors font-medium"
                        >
                          <UserIcon className="w-4 h-4 text-[#0F3040]" />
                          Profile Settings
                        </Link>
                      </div>

                      <div className="pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setProfileDropdownOpen(false);
                            navigate('/login');
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#C62828] hover:bg-[#C62828]/10 rounded-lg transition-colors font-semibold"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs font-semibold text-[#1F2937] hover:text-[#0F3040] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0F3040] rounded-full hover:bg-[#D99B7F] shadow-soft transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#1F2937] hover:bg-black/5 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden glass-panel border-t border-black/10 px-4 pt-4 pb-6 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search doctors, specialties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-black/10 rounded-full"
            />
          </form>

          <nav className="flex flex-col gap-2 pt-2 border-t border-black/5">
            <Link
              to="/doctors"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-[#1F2937] hover:bg-black/5"
            >
              Find Doctors
            </Link>
            <Link
              to="/specialties"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-[#1F2937] hover:bg-black/5"
            >
              Medical Specialties
            </Link>
            <Link
              to="/articles"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-[#1F2937] hover:bg-black/5"
            >
              Health Articles
            </Link>

            {isAuthenticated && user ? (
              <>
                <Link
                  to={getDashboardLink()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-[#0F3040] hover:bg-black/5"
                >
                  My Dashboard ({user.role})
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                    navigate('/login');
                  }}
                  className="w-full text-left px-3 py-2 text-sm font-semibold text-[#C62828] hover:bg-[#C62828]/10 rounded-lg"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="pt-2 flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-sm font-semibold text-[#1F2937] glass-card rounded-full"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-sm font-semibold text-white bg-[#0F3040] rounded-full"
                >
                  Create Account
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
