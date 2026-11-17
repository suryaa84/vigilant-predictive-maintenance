import React from 'react';
import type { MachineStatus } from '../../types';

interface StatusPillProps {
  status: MachineStatus;
  showDot?: boolean;
  className?: string;
}

export const StatusPill: React.FC<StatusPillProps> = ({
  status,
  showDot = true,
  className = '',
}) => {
  const configs: Record<MachineStatus, { label: string; bg: string; text: string; border: string; dot: string; ping: string }> = {
    healthy: {
      label: 'Healthy',
      bg: 'bg-emerald-50 dark:bg-emerald-500/10',
      text: 'text-emerald-700 dark:text-emerald-400 font-semibold dark:font-medium',
      border: 'border-emerald-200 dark:border-emerald-500/30',
      dot: 'bg-emerald-500 dark:bg-emerald-400',
      ping: 'bg-emerald-500 dark:bg-emerald-400',
    },
    warning: {
      label: 'Warning',
      bg: 'bg-amber-50 dark:bg-amber-500/10',
      text: 'text-amber-700 dark:text-amber-400 font-semibold dark:font-medium',
      border: 'border-amber-200 dark:border-amber-500/30',
      dot: 'bg-amber-500 dark:bg-amber-400',
      ping: 'bg-amber-500 dark:bg-amber-400',
    },
    critical: {
      label: 'Critical',
      bg: 'bg-rose-50 dark:bg-rose-500/10',
      text: 'text-rose-700 dark:text-rose-400 font-semibold dark:font-medium',
      border: 'border-rose-200 dark:border-rose-500/30',
      dot: 'bg-rose-500 dark:bg-rose-400',
      ping: 'bg-rose-500 dark:bg-rose-400',
    },
    offline: {
      label: 'Offline',
      bg: 'bg-slate-100 dark:bg-slate-800',
      text: 'text-slate-600 dark:text-slate-400',
      border: 'border-slate-200 dark:border-slate-700',
      dot: 'bg-slate-400 dark:bg-slate-500',
      ping: 'bg-slate-400 dark:bg-slate-500',
    },
  };

  const config = configs[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs border theme-transition ${config.bg} ${config.text} ${config.border} ${className}`}
    >
      {showDot && (
        <span className="relative flex h-2 w-2">
          {status === 'healthy' && (
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.ping} opacity-40`}></span>
          )}
          {status === 'critical' && (
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.ping} opacity-60`}></span>
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dot}`}></span>
        </span>
      )}
      {config.label}
    </span>
  );
};
