import React, { useState } from 'react';
import { AlertCircle, WifiOff, ServerOff, ChevronDown, ChevronUp, Terminal } from 'lucide-react';
import { DemoTag } from '../common/DemoTag';

export const SystemStatusStrip: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-950/20 via-slate-900 to-slate-900/90 p-3.5 shadow-lg shadow-black/40">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left message with icon */}
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0 mt-0.5">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider font-mono">
                System Integration Notice
              </span>
              <DemoTag label="MILESTONE 1 DEMO" />
            </div>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              Hardware connection is not configured yet. Telemetry readings, vibration spectra, and health calculations are currently simulated with mock datasets.
            </p>
          </div>
        </div>

        {/* Right Status Badges & Toggle */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/90 border border-slate-700 text-[11px] font-mono text-slate-300">
            <WifiOff className="w-3.5 h-3.5 text-amber-400" />
            <span>ESP32:</span>
            <span className="text-amber-400 font-semibold">Simulated</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/90 border border-slate-700 text-[11px] font-mono text-slate-300">
            <ServerOff className="w-3.5 h-3.5 text-slate-400" />
            <span>FastAPI Backend:</span>
            <span className="text-slate-400 font-semibold">Mock Engine</span>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1 border border-slate-700 cursor-pointer transition-colors"
            aria-expanded={expanded}
            aria-label="Toggle system architecture details"
          >
            <Terminal className="w-3 h-3 text-slate-400" />
            <span className="text-[11px] hidden sm:inline">Details</span>
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Expandable Architecture Roadmap / Diagnostic detail */}
      {expanded && (
        <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 animate-in fade-in duration-150">
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase">IoT Node Pipeline</span>
            <p className="text-slate-200 font-medium text-xs mt-0.5">ESP32 + ADXL345 / MAX9814</p>
            <p className="text-[11px] text-amber-400/90 mt-1">Pending Milestone 2 (MQTT/TLS)</p>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Backend API</span>
            <p className="text-slate-200 font-medium text-xs mt-0.5">FastAPI + TimescaleDB</p>
            <p className="text-[11px] text-amber-400/90 mt-1">Pending Milestone 2 Integration</p>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Diagnostic Engine</span>
            <p className="text-slate-200 font-medium text-xs mt-0.5">ISO 10816 Velocity RMS</p>
            <p className="text-[11px] text-emerald-400/90 mt-1">Calculated via Mock Rules</p>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase">ML Model Serving</span>
            <p className="text-slate-200 font-medium text-xs mt-0.5">RUL LSTM & Autoencoders</p>
            <p className="text-[11px] text-sky-400/90 mt-1">Scheduled for Milestone 3</p>
          </div>
        </div>
      )}
    </div>
  );
};
