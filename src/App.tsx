import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DoctorSearchPage } from './pages/DoctorSearchPage';
import { DoctorDetailPage } from './pages/DoctorDetailPage';
import { BookingPage } from './pages/BookingPage';
import { BookingSuccessPage } from './pages/BookingSuccessPage';
import { SpecialtiesPage } from './pages/SpecialtiesPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Auth Pages
import { LoginPage } from './pages/Auth/LoginPage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import { ForgotPasswordPage } from './pages/Auth/ForgotPasswordPage';

// Patient Pages
import { PatientDashboard } from './pages/Patient/PatientDashboard';
import { PatientAppointmentsPage } from './pages/Patient/PatientAppointmentsPage';
import { PatientMedicalHistoryPage } from './pages/Patient/PatientMedicalHistoryPage';
import { PatientPrescriptionsPage } from './pages/Patient/PatientPrescriptionsPage';
import { PatientReportsPage } from './pages/Patient/PatientReportsPage';
import { PatientFavoritesPage } from './pages/Patient/PatientFavoritesPage';

// Doctor Pages
import { DoctorDashboard } from './pages/Doctor/DoctorDashboard';
import { DoctorPatientsPage } from './pages/Doctor/DoctorPatientsPage';
import { DoctorSchedulePage } from './pages/Doctor/DoctorSchedulePage';
import { DoctorReviewsPage } from './pages/Doctor/DoctorReviewsPage';
import { DoctorMessagesPage } from './pages/Doctor/DoctorMessagesPage';

// Admin Pages
import { AdminDashboard } from './pages/Admin/AdminDashboard';
import { AdminDoctorsPage } from './pages/Admin/AdminDoctorsPage';
import { AdminPatientsPage } from './pages/Admin/AdminPatientsPage';
import { AdminAppointmentsPage } from './pages/Admin/AdminAppointmentsPage';
import { AdminDepartmentsPage } from './pages/Admin/AdminDepartmentsPage';
import { AdminReportsPage } from './pages/Admin/AdminReportsPage';

// Profile Page
import { ProfilePage } from './pages/Profile/ProfilePage';

// Protected Route Guard
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRole?: string }> = ({
  children,
  allowedRole,
}) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col bg-[#F8F7F5] text-[#1F2937]">
              <Navbar />
              <main className="flex-1 pt-20">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/doctors" element={<DoctorSearchPage />} />
                  <Route path="/doctors/:doctorId" element={<DoctorDetailPage />} />
                  <Route path="/booking/:doctorId" element={<BookingPage />} />
                  <Route path="/booking/success/:aptId" element={<BookingSuccessPage />} />
                  <Route path="/specialties" element={<SpecialtiesPage />} />
                  <Route path="/articles" element={<ArticlesPage />} />
                  <Route path="/how-it-works" element={<HowItWorksPage />} />

                  {/* Auth Routes */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                  {/* Patient Routes */}
                  <Route
                    path="/patient/dashboard"
                    element={
                      <ProtectedRoute allowedRole="patient">
                        <PatientDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/patient/appointments"
                    element={
                      <ProtectedRoute allowedRole="patient">
                        <PatientAppointmentsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/patient/medical-history"
                    element={
                      <ProtectedRoute allowedRole="patient">
                        <PatientMedicalHistoryPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/patient/prescriptions"
                    element={
                      <ProtectedRoute allowedRole="patient">
                        <PatientPrescriptionsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/patient/reports"
                    element={
                      <ProtectedRoute allowedRole="patient">
                        <PatientReportsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/patient/favorites"
                    element={
                      <ProtectedRoute allowedRole="patient">
                        <PatientFavoritesPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Doctor Routes */}
                  <Route
                    path="/doctor/dashboard"
                    element={
                      <ProtectedRoute allowedRole="doctor">
                        <DoctorDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/doctor/patients"
                    element={
                      <ProtectedRoute allowedRole="doctor">
                        <DoctorPatientsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/doctor/schedule"
                    element={
                      <ProtectedRoute allowedRole="doctor">
                        <DoctorSchedulePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/doctor/reviews"
                    element={
                      <ProtectedRoute allowedRole="doctor">
                        <DoctorReviewsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/doctor/messages"
                    element={
                      <ProtectedRoute allowedRole="doctor">
                        <DoctorMessagesPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Admin Routes */}
                  <Route
                    path="/admin/dashboard"
                    element={
                      <ProtectedRoute allowedRole="admin">
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/doctors"
                    element={
                      <ProtectedRoute allowedRole="admin">
                        <AdminDoctorsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/patients"
                    element={
                      <ProtectedRoute allowedRole="admin">
                        <AdminPatientsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/appointments"
                    element={
                      <ProtectedRoute allowedRole="admin">
                        <AdminAppointmentsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/departments"
                    element={
                      <ProtectedRoute allowedRole="admin">
                        <AdminDepartmentsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/reports"
                    element={
                      <ProtectedRoute allowedRole="admin">
                        <AdminReportsPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Profile Route */}
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />

                  {/* 404 Fallback Catch-all Route */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
