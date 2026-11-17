import React, { useState } from 'react';
import { AlertCircle, WifiOff, ServerOff, ChevronDown, ChevronUp, Terminal } from 'lucide-react';
import { DemoTag } from '../common/DemoTag';

export const SystemStatusStrip: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-amber-300/80 dark:border-amber-500/30 bg-gradient-to-r from-amber-50/90 via-white to-amber-50/40 dark:from-amber-950/20 dark:via-slate-900 dark:to-slate-900/90 p-3.5 shadow-sm dark:shadow-lg dark:shadow-black/40 theme-transition">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left message with icon */}
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-100 border border-amber-300 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/30 dark:text-amber-400 shrink-0 mt-0.5 shadow-xs">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-amber-800 dark:text-amber-300 uppercase tracking-wider font-mono">
                System Integration Notice
              </span>
              <DemoTag label="MILESTONE 1 DEMO" />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
              Hardware connection is not configured yet. Telemetry readings, vibration spectra, and health calculations are currently simulated with mock datasets.
            </p>
          </div>
        </div>

        {/* Right Status Badges & Toggle */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-[11px] font-mono text-slate-700 dark:text-slate-300 shadow-xs">
            <WifiOff className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>ESP32:</span>
            <span className="text-amber-700 dark:text-amber-400 font-semibold">Simulated</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-[11px] font-mono text-slate-700 dark:text-slate-300 shadow-xs">
            <ServerOff className="w-3.5 h-3.5 text-slate-400 dark:text-slate-400" />
            <span>FastAPI:</span>
            <span className="text-slate-600 dark:text-slate-400 font-semibold">Mock Engine</span>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-md bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-mono flex items-center gap-1 border border-slate-200 dark:border-slate-700 shadow-xs cursor-pointer transition-colors"
            aria-expanded={expanded}
            aria-label="Toggle system architecture details"
          >
            <Terminal className="w-3 h-3 text-slate-500 dark:text-slate-400" />
            <span className="text-[11px] hidden sm:inline">Details</span>
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Expandable Architecture Roadmap / Diagnostic detail */}
      {expanded && (
        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 animate-in fade-in duration-150">
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-mono text-slate-500 uppercase">IoT Node Pipeline</span>
            <p className="text-slate-800 dark:text-slate-200 font-medium text-xs mt-0.5">ESP32 + ADXL345 / MAX9814</p>
            <p className="text-[11px] text-amber-700 dark:text-amber-400/90 mt-1">Pending Milestone 2 (MQTT/TLS)</p>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-mono text-slate-500 uppercase">Backend API</span>
            <p className="text-slate-800 dark:text-slate-200 font-medium text-xs mt-0.5">FastAPI + TimescaleDB</p>
            <p className="text-[11px] text-amber-700 dark:text-amber-400/90 mt-1">Pending Milestone 2 Integration</p>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-mono text-slate-500 uppercase">Diagnostic Engine</span>
            <p className="text-slate-800 dark:text-slate-200 font-medium text-xs mt-0.5">ISO 10816 Velocity RMS</p>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-400/90 mt-1">Calculated via Mock Rules</p>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-mono text-slate-500 uppercase">ML Model Serving</span>
            <p className="text-slate-800 dark:text-slate-200 font-medium text-xs mt-0.5">RUL LSTM & Autoencoders</p>
            <p className="text-[11px] text-sky-700 dark:text-sky-400/90 mt-1">Scheduled for Milestone 3</p>
          </div>
        </div>
      )}
    </div>
  );
};
