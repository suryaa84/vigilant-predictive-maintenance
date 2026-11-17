import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'amber' | 'rose' | 'sky' | 'purple' | 'slate' | 'default';
  size?: 'sm' | 'md';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  dot = false,
}) => {
  const variantStyles: Record<string, string> = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/90 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30',
    amber: 'bg-amber-50 text-amber-700 border-amber-200/90 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/30',
    rose: 'bg-rose-50 text-rose-700 border-rose-200/90 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/30',
    sky: 'bg-sky-50 text-sky-700 border-sky-200/90 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/30',
    purple: 'bg-purple-50 text-purple-700 border-purple-200/90 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/30',
    slate: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800/80 dark:text-slate-300 dark:border-slate-700',
    default: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800',
  };

  const dotColors: Record<string, string> = {
    emerald: 'bg-emerald-500 dark:bg-emerald-400',
    amber: 'bg-amber-500 dark:bg-amber-400',
    rose: 'bg-rose-500 dark:bg-rose-400',
    sky: 'bg-sky-500 dark:bg-sky-400',
    purple: 'bg-purple-500 dark:bg-purple-400',
    slate: 'bg-slate-500 dark:bg-slate-400',
    default: 'bg-slate-400 dark:bg-slate-500',
  };

  const sizeStyles = {
    sm: 'text-[10px] px-1.5 py-0.5 tracking-wider font-mono font-medium',
    md: 'text-xs px-2.5 py-1 tracking-wide font-medium',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border theme-transition ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${dotColors[variant]} shrink-0`}
        />
      )}
      {children}
    </span>
  );
};
