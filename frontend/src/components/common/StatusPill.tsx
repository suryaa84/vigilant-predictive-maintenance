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
  const configs: Record<MachineStatus, { label: string; bg: string; text: string; border: string; dot: string }> = {
    healthy: {
      label: 'Healthy',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
      dot: 'bg-emerald-400',
    },
    warning: {
      label: 'Warning',
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      dot: 'bg-amber-400',
    },
    critical: {
      label: 'Critical',
      bg: 'bg-rose-500/10',
      text: 'text-rose-400',
      border: 'border-rose-500/30',
      dot: 'bg-rose-400',
    },
    offline: {
      label: 'Offline',
      bg: 'bg-slate-800',
      text: 'text-slate-400',
      border: 'border-slate-700',
      dot: 'bg-slate-500',
    },
  };

  const config = configs[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border} ${className}`}
    >
      {showDot && (
        <span className="relative flex h-2 w-2">
          {status === 'healthy' && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40"></span>
          )}
          {status === 'critical' && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-60"></span>
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dot}`}></span>
        </span>
      )}
      {config.label}
    </span>
  );
};
