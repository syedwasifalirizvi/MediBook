export type UserRole = 'patient' | 'doctor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  gender?: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  address?: string;
  createdAt: string;
  // Doctor specific extra info in User profile
  doctorProfileId?: string;
  // Patient specific extra info
  bloodGroup?: string;
  emergencyContact?: string;
}

export interface Doctor {
  id: string;
  userId?: string;
  name: string;
  title: string;
  specialtyId: string;
  specialtyName: string;
  qualification: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  consultationFee: number;
  clinicName: string;
  clinicAddress: string;
  languages: string[];
  avatar: string;
  about: string;
  availableDays: string[]; // e.g., ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  availableTimeSlots: string[]; // e.g., ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM']
  isVerified: boolean;
  isTopRated?: boolean;
}

export interface Specialty {
  id: string;
  name: string;
  iconName: string;
  description: string;
  doctorCount: number;
}

export type AppointmentStatus = 'upcoming' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  doctorTitle: string;
  doctorSpecialty: string;
  doctorAvatar: string;
  clinicName: string;
  clinicAddress: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:MM AM/PM
  fee: number;
  status: AppointmentStatus;
  type: 'in_person' | 'video_consult';
  symptomsReason: string;
  notes?: string;
  createdAt: string;
  paymentStatus: 'paid' | 'pending';
}

export interface Review {
  id: string;
  doctorId: string;
  patientName: string;
  patientAvatar?: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Prescription {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  diagnosis: string;
  medicines: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }[];
  notes: string;
}

export interface MedicalReport {
  id: string;
  patientId: string;
  doctorId?: string;
  title: string;
  type: string; // e.g., 'Blood Test', 'MRI Scan', 'ECG', 'General Checkup'
  date: string;
  fileSize: string;
  fileUrl?: string;
  status: 'Normal' | 'Requires Attention' | 'Pending Review';
  summary: string;
}

export interface HealthArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  readTime: string;
  publishedDate: string;
  imageUrl: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'appointment' | 'prescription' | 'system' | 'report';
  link?: string;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}
