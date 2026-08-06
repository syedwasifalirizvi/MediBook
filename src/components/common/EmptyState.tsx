import React from 'react';
import { LucideIcon, FolderOpen } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = FolderOpen,
  title,
  description,
  actionText,
  onAction,
}) => {
  return (
    <div className="glass-card rounded-3xl p-10 text-center border border-black/5 space-y-4 max-w-md mx-auto my-8">
      <div className="w-16 h-16 rounded-2xl bg-[#0F3040]/15 text-[#0F3040] flex items-center justify-center mx-auto shadow-sm">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="font-display font-bold text-lg text-[#1F2937]">{title}</h3>
      <p className="text-xs text-[#6B7280] max-w-sm mx-auto leading-relaxed">{description}</p>

      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#0F3040] rounded-full hover:bg-[#D99B7F] shadow-soft transition-all"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
