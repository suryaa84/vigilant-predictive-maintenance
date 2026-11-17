import React from 'react';
import {
  Wrench,
  Calendar,
  UserCheck,
  CheckCircle,
  FileText,
  Layers,
} from 'lucide-react';
import type { MaintenanceSummary } from '../../types';
import { DemoTag } from '../common/DemoTag';

interface MaintenanceSummaryCardProps {
  summary: MaintenanceSummary;
}

export const MaintenanceSummaryCard: React.FC<MaintenanceSummaryCardProps> = ({
  summary,
}) => {
  return (
    <div className="rounded-xl bg-white dark:bg-[#0d121e] border border-slate-200/90 dark:border-slate-800/90 p-5 shadow-sm dark:shadow-none flex flex-col justify-between theme-transition">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase font-mono tracking-wider">
                  Maintenance Schedule & Actions
                </h3>
                <DemoTag label="DEMO" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Reliability-centered condition-based work orders
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 font-semibold">
              {summary.priority} Priority
            </span>
          </div>
        </div>

        {/* Schedule & Countdown Banner */}
        <div className="mt-3.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">
                Next Inspection Window
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
                {summary.nextInspectionDate}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30">
              In {summary.daysRemaining} days
            </span>
            <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
              Zero Downtime Required
            </p>
          </div>
        </div>

        {/* Diagnostic Action & Findings */}
        <div className="mt-3 space-y-2.5 text-xs">
          <div className="p-3 rounded-lg bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800/80">
            <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-semibold">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Recommended Action
            </span>
            <p className="text-slate-800 dark:text-slate-200 mt-1 leading-relaxed">
              {summary.recommendedAction}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800/80">
            <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-semibold">
              <FileText className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              Current Diagnostic Assessment
            </span>
            <p className="text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
              {summary.diagnosticFinding}
            </p>
          </div>
        </div>

        {/* Parts Required & Strategy */}
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/60">
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block">Assigned Engineer</span>
            <p className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              {summary.assignedEngineer}
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">{summary.engineerRole}</p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/60">
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block">Maintenance Strategy</span>
            <p className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              {summary.strategy}
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Work Order: {summary.cmmsWorkOrderId}</p>
          </div>
        </div>

        {/* Parts list */}
        <div className="mt-3">
          <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 block mb-1">
            Required Consumables / Parts:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {summary.partsRequired.map((part, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              >
                {part}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
        <span>CMMS Integration Target: SAP PM / Maximo (Milestone 3)</span>
        <span className="text-slate-400 dark:text-slate-500">Mock Work Order</span>
      </div>
    </div>
  );
};
