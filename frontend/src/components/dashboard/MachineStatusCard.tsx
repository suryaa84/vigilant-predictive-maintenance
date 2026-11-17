import React from 'react';
import {
  Cpu,
  Gauge,
  Clock,
  Calendar,
  Zap,
  MapPin,
  Radio,
  CheckCircle2,
} from 'lucide-react';
import type { Machine } from '../../types';
import { StatusPill } from '../common/StatusPill';
import { DemoTag } from '../common/DemoTag';

interface MachineStatusCardProps {
  machine: Machine;
}

export const MachineStatusCard: React.FC<MachineStatusCardProps> = ({ machine }) => {
  return (
    <div className="rounded-xl bg-[#0d121e] border border-slate-800/90 p-5 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-slate-800/80">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-bold text-slate-100 font-mono">
                  {machine.name}
                </h3>
                <StatusPill status={machine.status} />
              </div>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                Tag: {machine.tag}
              </p>
            </div>
          </div>

          <DemoTag label="DEMO ASSET" />
        </div>

        {/* Machine Type and Location */}
        <div className="mt-3.5 space-y-1.5 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-slate-400">Class:</span>
            <span className="font-medium text-slate-200">{machine.type}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span className="text-slate-400">Location:</span>
            <span className="font-medium text-slate-200">{machine.location}</span>
          </div>
        </div>

        {/* Core Specs Grid */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {/* Uptime */}
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">Uptime</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-xl font-bold font-mono text-slate-100 tabular-nums">
                {machine.uptime}%
              </span>
              <span className="text-[10px] font-mono text-emerald-400">(MTBF 2.4k hrs)</span>
            </div>
            <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full"
                style={{ width: `${machine.uptime}%` }}
              />
            </div>
          </div>

          {/* Operating Speed */}
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">Operating Speed</span>
              <Gauge className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-xl font-bold font-mono text-slate-100 tabular-nums">
                {machine.operatingSpeedRpm}
              </span>
              <span className="text-xs font-mono text-slate-400">RPM</span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 mt-1 truncate">
              Rated: {machine.ratedSpeedRpm} RPM • {machine.ratedPowerKw} kW
            </p>
          </div>
        </div>

        {/* Inspection & Maintenance Dates */}
        <div className="mt-3.5 space-y-2 p-3 rounded-lg bg-slate-900/50 border border-slate-800/80 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Last Inspection Date:
            </span>
            <span className="font-mono text-slate-200 font-medium">
              {machine.lastInspectionDate}
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-slate-800/80 pt-2">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              Next Scheduled Inspection:
            </span>
            <span className="font-mono text-emerald-300 font-semibold">
              {machine.nextInspectionDate}
            </span>
          </div>
        </div>
      </div>

      {/* Simulated Telemetry Node Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-2 text-slate-400">
          <Radio className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="truncate max-w-[170px]" title={machine.telemetryNode.name}>
            {machine.telemetryNode.name}
          </span>
        </div>
        <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 shrink-0">
          MOCK SENSORS
        </span>
      </div>
    </div>
  );
};
