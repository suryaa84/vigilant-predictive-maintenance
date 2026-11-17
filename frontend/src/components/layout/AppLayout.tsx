import React, { useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import type { Machine } from '../../types';
import { ShieldCheck } from 'lucide-react';

interface AppLayoutProps {
  selectedMachine: Machine;
  onSelectMachine: (machine: Machine) => void;
}

const ROUTE_TITLES: Record<string, { title: string; subtitle: string }> = {
  '/': { title: 'Overview', subtitle: 'Fleet Telemetry & Machine Health' },
  '/overview': { title: 'Overview', subtitle: 'Fleet Telemetry & Machine Health' },
  '/live-monitoring': { title: 'Live Monitoring', subtitle: 'Waveforms & High-Speed Ingestion' },
  '/machine-health': { title: 'Machine Health', subtitle: 'ISO 10816 Degradation Matrices' },
  '/fault-detection': { title: 'Fault Detection', subtitle: 'Harmonic & FFT Spectral Classifier' },
  '/rul-prediction': { title: 'RUL Prediction', subtitle: 'Weibull & LSTM Time-To-Failure' },
  '/maintenance-history': { title: 'Maintenance History', subtitle: 'Work Orders & Lubrication Audits' },
  '/settings': { title: 'Settings', subtitle: 'Sensor Node & Gateway Configuration' },
};

export const AppLayout: React.FC<AppLayoutProps> = ({
  selectedMachine,
  onSelectMachine,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const routeMeta = ROUTE_TITLES[location.pathname] || {
    title: 'VIGILANT',
    subtitle: 'Industrial Predictive Analytics',
  };

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Persistent Left Sidebar */}
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Content Area (offset by sidebar width) */}
      <div
        className={`flex-1 flex flex-col transition-all duration-200 ease-in-out ${
          collapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Sticky Top Header */}
        <Header
          selectedMachine={selectedMachine}
          onSelectMachine={onSelectMachine}
          onToggleMobileSidebar={() => setMobileOpen(!mobileOpen)}
          title={routeMeta.title}
          subtitle={routeMeta.subtitle}
        />

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-slate-800/80 bg-[#090d15]/80 py-4 px-6 text-xs text-slate-400">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 font-mono">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-300 tracking-wider">
                VIGILANT — Predictive Maintenance Platform
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-amber-400">Milestone 1 Frontend Build</span>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                ISO 10816-3 Certified Diagnostics
              </span>
              <span>•</span>
              <span>Mock Telemetry Engine Active</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
