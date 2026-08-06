import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Doctor,
  Specialty,
  Appointment,
  Review,
  Prescription,
  MedicalReport,
  Notification,
  DirectMessage,
  AppointmentStatus,
} from '../types';
import {
  INITIAL_DOCTORS,
  INITIAL_SPECIALTIES,
  INITIAL_APPOINTMENTS,
  INITIAL_REVIEWS,
  INITIAL_PRESCRIPTIONS,
  INITIAL_REPORTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_MESSAGES,
} from '../data/mockData';

interface DataContextType {
  doctors: Doctor[];
  specialties: Specialty[];
  appointments: Appointment[];
  reviews: Review[];
  prescriptions: Prescription[];
  reports: MedicalReport[];
  notifications: Notification[];
  messages: DirectMessage[];
  favorites: string[]; // doctorIds
  // Actions
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status' | 'paymentStatus'>) => Appointment;
  cancelAppointment: (id: string, reason?: string) => void;
  rescheduleAppointment: (id: string, newDate: string, newTime: string) => void;
  toggleFavorite: (doctorId: string) => void;
  isFavorite: (doctorId: string) => boolean;
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  addPrescription: (prescription: Omit<Prescription, 'id'>) => void;
  addReport: (report: Omit<MedicalReport, 'id'>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: (userId: string) => void;
  sendMessage: (msg: Omit<DirectMessage, 'id' | 'timestamp' | 'isRead'>) => void;
  addDoctor: (doc: Omit<Doctor, 'id'>) => void;
  updateDoctor: (id: string, data: Partial<Doctor>) => void;
  deleteDoctor: (id: string) => void;
  resetDemoData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  DOCTORS: 'medibook_doctors',
  SPECIALTIES: 'medibook_specialties',
  APPOINTMENTS: 'medibook_appointments',
  REVIEWS: 'medibook_reviews',
  PRESCRIPTIONS: 'medibook_prescriptions',
  REPORTS: 'medibook_reports',
  NOTIFICATIONS: 'medibook_notifications',
  MESSAGES: 'medibook_messages',
  FAVORITES: 'medibook_favorites',
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DOCTORS);
      return saved ? JSON.parse(saved) : INITIAL_DOCTORS;
    } catch {
      return INITIAL_DOCTORS;
    }
  });

  const [specialties] = useState<Specialty[]>(INITIAL_SPECIALTIES);

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [prescriptions, setPrescriptions] = useState<Prescription[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRESCRIPTIONS);
      return saved ? JSON.parse(saved) : INITIAL_PRESCRIPTIONS;
    } catch {
      return INITIAL_PRESCRIPTIONS;
    }
  });

  const [reports, setReports] = useState<MedicalReport[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REPORTS);
      return saved ? JSON.parse(saved) : INITIAL_REPORTS;
    } catch {
      return INITIAL_REPORTS;
    }
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [messages, setMessages] = useState<DirectMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return saved ? JSON.parse(saved) : ['doc-1', 'doc-6'];
    } catch {
      return ['doc-1', 'doc-6'];
    }
  });

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRESCRIPTIONS, JSON.stringify(prescriptions));
  }, [prescriptions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }, [favorites]);

  const addAppointment = (data: Omit<Appointment, 'id' | 'createdAt' | 'status' | 'paymentStatus'>): Appointment => {
    const newApt: Appointment = {
      ...data,
      id: `apt-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'upcoming',
      paymentStatus: 'paid',
    };

    setAppointments(prev => [newApt, ...prev]);

    // Create notifications for patient and doctor
    const newNotifPatient: Notification = {
      id: `notif-${Date.now()}-p`,
      userId: data.patientId,
      title: 'Appointment Confirmed',
      message: `Your booking with ${data.doctorName} for ${data.date} at ${data.timeSlot} is confirmed.`,
      timestamp: 'Just now',
      read: false,
      type: 'appointment',
      link: '/patient/appointments',
    };

    setNotifications(prev => [newNotifPatient, ...prev]);

    return newApt;
  };

  const cancelAppointment = (id: string, reason?: string) => {
    setAppointments(prev =>
      prev.map(apt => (apt.id === id ? { ...apt, status: 'cancelled' as AppointmentStatus, notes: reason || apt.notes } : apt))
    );
  };

  const rescheduleAppointment = (id: string, newDate: string, newTime: string) => {
    setAppointments(prev =>
      prev.map(apt => (apt.id === id ? { ...apt, date: newDate, timeSlot: newTime } : apt))
    );
  };

  const toggleFavorite = (doctorId: string) => {
    setFavorites(prev =>
      prev.includes(doctorId) ? prev.filter(id => id !== doctorId) : [...prev, doctorId]
    );
  };

  const isFavorite = (doctorId: string) => favorites.includes(doctorId);

  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews(prev => [newRev, ...prev]);

    // Update doctor's rating and review count
    setDoctors(prev =>
      prev.map(d => {
        if (d.id === reviewData.doctorId) {
          const docRevs = [...reviews.filter(r => r.doctorId === d.id), newRev];
          const avg = docRevs.reduce((acc, curr) => acc + curr.rating, 0) / docRevs.length;
          return {
            ...d,
            rating: Number(avg.toFixed(2)),
            reviewsCount: docRevs.length,
          };
        }
        return d;
      })
    );
  };

  const addPrescription = (rxData: Omit<Prescription, 'id'>) => {
    const newRx: Prescription = {
      ...rxData,
      id: `rx-${Date.now()}`,
    };
    setPrescriptions(prev => [newRx, ...prev]);
  };

  const addReport = (repData: Omit<MedicalReport, 'id'>) => {
    const newRep: MedicalReport = {
      ...repData,
      id: `rep-${Date.now()}`,
    };
    setReports(prev => [newRep, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = (userId: string) => {
    setNotifications(prev => prev.map(n => (n.userId === userId ? { ...n, read: true } : n)));
  };

  const sendMessage = (msg: Omit<DirectMessage, 'id' | 'timestamp' | 'isRead'>) => {
    const newMsg: DirectMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const addDoctor = (docData: Omit<Doctor, 'id'>) => {
    const newDoc: Doctor = {
      ...docData,
      id: `doc-${Date.now()}`,
    };
    setDoctors(prev => [newDoc, ...prev]);
  };

  const updateDoctor = (id: string, data: Partial<Doctor>) => {
    setDoctors(prev => prev.map(d => (d.id === id ? { ...d, ...data } : d)));
  };

  const deleteDoctor = (id: string) => {
    setDoctors(prev => prev.filter(d => d.id !== id));
  };

  const resetDemoData = () => {
    setDoctors(INITIAL_DOCTORS);
    setAppointments(INITIAL_APPOINTMENTS);
    setReviews(INITIAL_REVIEWS);
    setPrescriptions(INITIAL_PRESCRIPTIONS);
    setReports(INITIAL_REPORTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setMessages(INITIAL_MESSAGES);
    setFavorites(['doc-1', 'doc-6']);
    localStorage.clear();
  };

  return (
    <DataContext.Provider
      value={{
        doctors,
        specialties,
        appointments,
        reviews,
        prescriptions,
        reports,
        notifications,
        messages,
        favorites,
        addAppointment,
        cancelAppointment,
        rescheduleAppointment,
        toggleFavorite,
        isFavorite,
        addReview,
        addPrescription,
        addReport,
        markNotificationRead,
        markAllNotificationsRead,
        sendMessage,
        addDoctor,
        updateDoctor,
        deleteDoctor,
        resetDemoData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
