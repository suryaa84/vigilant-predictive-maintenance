import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Activity,
  HeartPulse,
  AlertTriangle,
  TrendingDown,
  Wrench,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Radio,
  X,
} from 'lucide-react';
import { DemoTag } from '../common/DemoTag';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItemConfig {
  name: string;
  path: string;
  icon: React.ElementType;
  badge?: string;
  isImplemented?: boolean;
}

const NAV_ITEMS: NavItemConfig[] = [
  {
    name: 'Overview',
    path: '/',
    icon: LayoutDashboard,
    isImplemented: true,
  },
  {
    name: 'Live Monitoring',
    path: '/live-monitoring',
    icon: Activity,
    badge: 'M2',
  },
  {
    name: 'Machine Health',
    path: '/machine-health',
    icon: HeartPulse,
    badge: 'M2',
  },
  {
    name: 'Fault Detection',
    path: '/fault-detection',
    icon: AlertTriangle,
    badge: 'M3',
  },
  {
    name: 'RUL Prediction',
    path: '/rul-prediction',
    icon: TrendingDown,
    badge: 'M3',
  },
  {
    name: 'Maintenance History',
    path: '/maintenance-history',
    icon: Wrench,
    badge: 'M2',
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: Settings,
    badge: 'M2',
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-[#0b0f17] border-r border-slate-800/80 transition-all duration-200 ease-in-out ${
          collapsed ? 'w-20' : 'w-64'
        } ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80 bg-slate-950/40">
          <NavLink
            to="/"
            onClick={onCloseMobile}
            className="flex items-center gap-3 overflow-hidden group focus:outline-none"
          >
            {/* Logo Icon */}
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-950/40 border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-xs shadow-emerald-500/20 group-hover:border-emerald-500/50 transition-colors">
              <ShieldAlert className="w-5 h-5 text-emerald-400" />
            </div>

            {/* Brand Title */}
            {!collapsed && (
              <div className="flex flex-col min-w-0 transition-opacity duration-200">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm tracking-widest text-slate-100 uppercase">
                    VIGILANT
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold px-1 py-0.2 bg-emerald-500/10 rounded border border-emerald-500/20">
                    SaaS
                  </span>
                </div>
                <span className="text-[10px] tracking-tight text-slate-400 font-medium truncate">
                  Predictive Maintenance
                </span>
              </div>
            )}
          </NavLink>

          {/* Mobile Close Button */}
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-md text-slate-400 hover:text-slate-200 lg:hidden"
            aria-label="Close sidebar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Milestone Indicator */}
        {!collapsed ? (
          <div className="mx-3 mt-3 px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-800/90 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[11px] font-mono text-slate-300">Milestone 1 Active</span>
            </div>
            <DemoTag label="MOCK" />
          </div>
        ) : (
          <div className="flex justify-center mt-3">
            <span
              title="Milestone 1 Active (Mock Telemetry)"
              className="w-2.5 h-2.5 rounded-full bg-amber-400"
            />
          </div>
        )}

        {/* Navigation Section */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {!collapsed && (
            <div className="px-3 pb-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
              Platform Modules
            </div>
          )}

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                title={collapsed ? item.name : undefined}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative ${
                    isActive
                      ? 'bg-slate-800/80 text-emerald-400 border border-emerald-500/30 shadow-xs'
                      : 'text-slate-300 hover:text-slate-100 hover:bg-slate-900/60 border border-transparent'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive
                          ? 'text-emerald-400'
                          : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    />

                    {!collapsed && (
                      <span className="truncate flex-1">{item.name}</span>
                    )}

                    {!collapsed && item.badge && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60 font-normal">
                        {item.badge}
                      </span>
                    )}

                    {/* Active Indicator Bar on Collapsed */}
                    {collapsed && isActive && (
                      <div className="absolute right-0 top-2 bottom-2 w-1 bg-emerald-400 rounded-l" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Telemetry Hardware Link Status */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/30">
          {!collapsed ? (
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-medium text-slate-400 flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-amber-400" />
                  ESP32 Gateway
                </span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                  MOCK
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-tight">
                Simulated sensor stream (Sampling 1kHz)
              </p>
            </div>
          ) : (
            <div className="flex justify-center" title="ESP32 Gateway: Simulated Mock Data">
              <Radio className="w-4 h-4 text-amber-400" />
            </div>
          )}

          {/* Desktop Collapse Toggle */}
          <div className="hidden lg:flex items-center justify-end mt-2">
            <button
              onClick={onToggleCollapse}
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-md transition-colors w-full flex items-center justify-center gap-2 text-xs cursor-pointer"
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <>
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-slate-400 text-xs">Collapse Menu</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
