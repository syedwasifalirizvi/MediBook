import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className={`relative w-full ${maxWidth} bg-[#F8F7F5] rounded-3xl shadow-float border border-black/10 overflow-hidden z-10`}
        >
          {/* Header */}
          <div className="px-6 py-4 bg-white/70 backdrop-blur-md border-b border-black/5 flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-[#1F2937]">{title}</h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-black/5 text-[#6B7280] hover:text-[#1F2937] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
