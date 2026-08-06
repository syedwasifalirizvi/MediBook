import { AppointmentStatus } from '../types';

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatTimeSlot(time: string): string {
  return time;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getStatusBadgeStyle(status: AppointmentStatus | string): {
  bg: string;
  text: string;
  border: string;
  label: string;
} {
  switch (status.toLowerCase()) {
    case 'upcoming':
      return {
        bg: 'bg-[#464858]/40',
        text: 'text-[#1F2937]',
        border: 'border-[#0F3040]/40',
        label: 'Upcoming',
      };
    case 'completed':
      return {
        bg: 'bg-[#2E7D32]/10',
        text: 'text-[#2E7D32]',
        border: 'border-[#2E7D32]/20',
        label: 'Completed',
      };
    case 'cancelled':
      return {
        bg: 'bg-[#C62828]/10',
        text: 'text-[#C62828]',
        border: 'border-[#C62828]/20',
        label: 'Cancelled',
      };
    case 'paid':
      return {
        bg: 'bg-[#2E7D32]/10',
        text: 'text-[#2E7D32]',
        border: 'border-[#2E7D32]/20',
        label: 'Paid',
      };
    case 'pending':
      return {
        bg: 'bg-[#A56F63]/15',
        text: 'text-[#967432]',
        border: 'border-[#A56F63]/30',
        label: 'Pending',
      };
    default:
      return {
        bg: 'bg-gray-100',
        text: 'text-gray-700',
        border: 'border-gray-200',
        label: status,
      };
  }
}
