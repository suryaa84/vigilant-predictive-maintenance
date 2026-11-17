import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { DemoTag } from '../common/DemoTag';

export interface KpiCardProps {
  label: string;
  value: string | number;
  unit: string;
  deltaPercent?: number;
  trend?: 'up' | 'down' | 'steady';
  status?: 'healthy' | 'normal' | 'warning' | 'critical';
  benchmark: string;
  isoStandard?: string;
  icon: React.ElementType;
  isDemo?: boolean;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  unit,
  deltaPercent,
  trend = 'steady',
  status = 'normal',
  benchmark,
  isoStandard,
  icon: Icon,
  isDemo = true,
}) => {
  const getStatusBorder = () => {
    switch (status) {
      case 'healthy':
        return 'hover:border-emerald-300 dark:hover:border-emerald-500/40 border-slate-200/90 dark:border-slate-800/90';
      case 'warning':
        return 'hover:border-amber-300 dark:hover:border-amber-500/40 border-amber-200 dark:border-amber-500/20';
      case 'critical':
        return 'hover:border-rose-300 dark:hover:border-rose-500/50 border-rose-200 dark:border-rose-500/30';
      default:
        return 'hover:border-slate-300 dark:hover:border-slate-700 border-slate-200/90 dark:border-slate-800/90';
    }
  };

  const getIconColor = () => {
    switch (status) {
      case 'healthy':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/20';
      case 'warning':
        return 'text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-500/10 dark:border-amber-500/20';
      case 'critical':
        return 'text-rose-700 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-500/10 dark:border-rose-500/20';
      default:
        return 'text-slate-700 bg-slate-100 border-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:border-slate-700';
    }
  };

  const renderTrend = () => {
    if (deltaPercent === undefined) return null;

    if (trend === 'up') {
      const isPositiveGood = status === 'healthy' || label.includes('Health');
      return (
        <span
          className={`inline-flex items-center text-[11px] font-mono font-medium ${
            isPositiveGood
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-amber-600 dark:text-amber-400'
          }`}
        >
          <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
          +{Math.abs(deltaPercent)}%
        </span>
      );
    }
    if (trend === 'down') {
      const isNegativeGood = label.includes('Vibration') || label.includes('Temperature');
      return (
        <span
          className={`inline-flex items-center text-[11px] font-mono font-medium ${
            isNegativeGood
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-rose-600 dark:text-rose-400'
          }`}
        >
          <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
          -{Math.abs(deltaPercent)}%
        </span>
      );
    }
    return (
      <span className="inline-flex items-center text-[11px] font-mono text-slate-500 dark:text-slate-400">
        <Minus className="w-3 h-3 mr-0.5" />
        0.0% steady
      </span>
    );
  };

  return (
    <div
      className={`relative rounded-xl bg-white dark:bg-[#0d121e] border ${getStatusBorder()} p-5 transition-all duration-200 shadow-sm dark:shadow-none hover:shadow-md dark:hover:shadow-black/40 flex flex-col justify-between theme-transition`}
    >
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${getIconColor()}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
              {label}
            </h3>
            {isoStandard && (
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block -mt-0.5">
                {isoStandard}
              </span>
            )}
          </div>
        </div>

        {isDemo && <DemoTag label="DEMO" />}
      </div>

      {/* Metric Main Value */}
      <div className="my-1.5 flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tracking-tight tabular-nums">
          {value}
        </span>
        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 font-mono">
          {unit}
        </span>
      </div>

      {/* Benchmark & Trend Row */}
      <div className="pt-2.5 mt-1 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate max-w-[65%]" title={benchmark}>
          {benchmark}
        </span>
        <div className="shrink-0">{renderTrend()}</div>
      </div>
    </div>
  );
};
