import React from 'react';
import {
  HeartPulse,
  Gauge,
  Thermometer,
  Activity,
  Cpu,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import type { Machine } from '../types';
import { MOCK_KPIS_BY_MACHINE } from '../data/mockData';
import { SystemStatusStrip } from '../components/dashboard/SystemStatusStrip';
import { KpiCard } from '../components/dashboard/KpiCard';
import { SensorTrendsChart } from '../components/dashboard/SensorTrendsChart';
import { MachineStatusCard } from '../components/dashboard/MachineStatusCard';
import { FaultDistributionCard } from '../components/dashboard/FaultDistributionCard';
import { RecentAlertsList } from '../components/dashboard/RecentAlertsList';
import { MaintenanceSummaryCard } from '../components/dashboard/MaintenanceSummaryCard';
import { MOCK_MAINTENANCE_SUMMARY } from '../data/mockData';
import { DemoTag } from '../components/common/DemoTag';
import { StatusPill } from '../components/common/StatusPill';

interface OverviewPageProps {
  machine: Machine;
  onSelectMachine: (machine: Machine) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ machine }) => {
  const kpis = MOCK_KPIS_BY_MACHINE[machine.id] || MOCK_KPIS_BY_MACHINE['DEMO-MTR-01'];

  return (
    <div className="space-y-6">
      {/* 1. System Status Strip (Simulated Hardware Notice) */}
      <SystemStatusStrip />

      {/* 2. Welcome & Machine Overview Strip */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-[#0d121e] border border-slate-200/90 dark:border-slate-800/80 shadow-sm dark:shadow-none theme-transition">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                {machine.name} • Diagnostic Overview
              </h2>
              <StatusPill status={machine.status} />
              <DemoTag label="SYNTHETIC TELEMETRY" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {machine.type} • {machine.location} • Tag:{' '}
              <span className="font-mono text-slate-700 dark:text-slate-300">{machine.tag}</span>
            </p>
          </div>
        </div>

        {/* Diagnostic Metadata Badges */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-xs font-mono">
          <div className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-slate-500 dark:text-slate-400">Standard:</span>
            <span className="text-slate-800 dark:text-slate-200 font-semibold">ISO 10816-3</span>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-slate-500 dark:text-slate-400">Power:</span>
            <span className="text-slate-800 dark:text-slate-200 font-semibold">{machine.ratedPowerKw} kW</span>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-500 dark:text-slate-400">Virtual Stream:</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Active</span>
          </div>
        </div>
      </div>

      {/* 3. Four Core KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Machine Health Score */}
        <KpiCard
          label={kpis.healthScore.label}
          value={kpis.healthScore.displayValue}
          unit={kpis.healthScore.unit}
          deltaPercent={kpis.healthScore.deltaPercent}
          trend={kpis.healthScore.trend}
          status={kpis.healthScore.status}
          benchmark={kpis.healthScore.benchmark}
          isoStandard={kpis.healthScore.isoStandard}
          icon={HeartPulse}
          isDemo={kpis.healthScore.isDemo}
        />

        {/* Current RPM */}
        <KpiCard
          label={kpis.currentRpm.label}
          value={kpis.currentRpm.displayValue}
          unit={kpis.currentRpm.unit}
          deltaPercent={kpis.currentRpm.deltaPercent}
          trend={kpis.currentRpm.trend}
          status={kpis.currentRpm.status}
          benchmark={kpis.currentRpm.benchmark}
          icon={Gauge}
          isDemo={kpis.currentRpm.isDemo}
        />

        {/* Surface Temperature */}
        <KpiCard
          label={kpis.temperature.label}
          value={kpis.temperature.displayValue}
          unit={kpis.temperature.unit}
          deltaPercent={kpis.temperature.deltaPercent}
          trend={kpis.temperature.trend}
          status={kpis.temperature.status}
          benchmark={kpis.temperature.benchmark}
          icon={Thermometer}
          isDemo={kpis.temperature.isDemo}
        />

        {/* Vibration RMS */}
        <KpiCard
          label={kpis.vibrationRms.label}
          value={kpis.vibrationRms.displayValue}
          unit={kpis.vibrationRms.unit}
          deltaPercent={kpis.vibrationRms.deltaPercent}
          trend={kpis.vibrationRms.trend}
          status={kpis.vibrationRms.status}
          benchmark={kpis.vibrationRms.benchmark}
          isoStandard={kpis.vibrationRms.isoStandard}
          icon={Activity}
          isDemo={kpis.vibrationRms.isDemo}
        />
      </div>

      {/* 4. Sensor Trends Chart & Machine Status Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <SensorTrendsChart machineName={machine.name} />
        </div>
        <div className="xl:col-span-1">
          <MachineStatusCard machine={machine} />
        </div>
      </div>

      {/* 5. Fault Distribution & Maintenance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FaultDistributionCard />
        <MaintenanceSummaryCard summary={MOCK_MAINTENANCE_SUMMARY} />
      </div>

      {/* 6. Recent Alerts & Activity List */}
      <div>
        <RecentAlertsList />
      </div>
    </div>
  );
};
