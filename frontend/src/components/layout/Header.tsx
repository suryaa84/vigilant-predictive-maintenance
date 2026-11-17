import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Bell,
  Cpu,
  ChevronDown,
  User,
  ShieldCheck,
} from 'lucide-react';
import { DEMO_MACHINES } from '../../data/mockData';
import type { Machine } from '../../types';
import { NotificationDrawer } from './NotificationDrawer';
import { DemoTag } from '../common/DemoTag';
import { StatusPill } from '../common/StatusPill';
import { ThemeToggle } from '../common/ThemeToggle';

interface HeaderProps {
  selectedMachine: Machine;
  onSelectMachine: (machine: Machine) => void;
  onToggleMobileSidebar: () => void;
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  selectedMachine,
  onSelectMachine,
  onToggleMobileSidebar,
  title = 'Overview',
  subtitle = 'Fleet Health & Diagnostics',
}) => {
  const [machineDropdownOpen, setMachineDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const machineDropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        machineDropdownRef.current &&
        !machineDropdownRef.current.contains(e.target as Node)
      ) {
        setMachineDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/92 dark:bg-[#090d15]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 lg:px-6 flex items-center justify-between gap-4 theme-transition">
      {/* Left: Mobile hamburger & breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleMobileSidebar}
          className="p-2 -ml-1 text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden transition-colors cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {title}
            </span>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate hidden sm:inline">
              {subtitle}
            </span>
          </div>
          <h1 className="text-base font-semibold text-slate-900 dark:text-slate-100 tracking-tight truncate hidden md:block">
            VIGILANT Monitoring Hub
          </h1>
        </div>
      </div>

      {/* Right Area: Machine Selector, Demo Indicator, Theme Toggle, Notifications, User */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Machine Quick Selector Dropdown */}
        <div className="relative" ref={machineDropdownRef}>
          <button
            onClick={() => setMachineDropdownOpen(!machineDropdownOpen)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 text-slate-800 dark:text-slate-200 text-xs font-medium transition-all shadow-xs cursor-pointer"
            aria-expanded={machineDropdownOpen}
            aria-label="Select industrial machine"
          >
            <Cpu className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div className="text-left hidden sm:block">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-semibold text-slate-900 dark:text-slate-100 truncate max-w-[130px]">
                  {selectedMachine.name}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  ({selectedMachine.tag.split('-')[0]})
                </span>
              </div>
            </div>
            <span className="sm:hidden text-xs font-medium truncate max-w-[90px]">
              {selectedMachine.name}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-0.5" />
          </button>

          {/* Machine Dropdown Menu */}
          {machineDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl shadow-xl dark:shadow-2xl dark:shadow-black/80 z-50 overflow-hidden animate-in fade-in slide-in-from-top-1">
              <div className="p-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 font-medium tracking-wider">
                    Target Machinery
                  </span>
                  <DemoTag label="MOCK ASSETS" />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Select a rotating machine to switch telemetry profiles
                </p>
              </div>

              <div className="p-1.5 space-y-1 max-h-64 overflow-y-auto">
                {DEMO_MACHINES.map((m) => {
                  const isSelected = m.id === selectedMachine.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => {
                        onSelectMachine(m);
                        setMachineDropdownOpen(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-lg flex items-start justify-between gap-2 transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-50 dark:bg-slate-800 border border-emerald-500/30 dark:border-emerald-500/40 text-slate-900 dark:text-slate-100'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                            {m.name}
                          </span>
                          <StatusPill status={m.status} showDot={false} className="text-[10px] py-0 px-1.5" />
                        </div>
                        <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {m.tag} • {m.ratedPowerKw} kW
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {m.location}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono font-semibold text-slate-800 dark:text-slate-200">
                          {m.healthScore}/100
                        </span>
                        <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Score</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Demo Indicator Pill */}
        <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/25">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[11px] font-mono text-amber-700 dark:text-amber-300 font-medium tracking-wide">
            SIMULATED TELEMETRY
          </span>
        </div>

        {/* Theme Toggle Button */}
        <ThemeToggle />

        {/* Notifications Icon Button */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="relative p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors shadow-xs cursor-pointer"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-white dark:border-slate-900" />
          </button>

          {/* Drawer / Popover */}
          <NotificationDrawer
            isOpen={notificationOpen}
            onClose={() => setNotificationOpen(false)}
          />
        </div>

        {/* User Profile */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer"
            aria-expanded={userMenuOpen}
            aria-label="User profile menu"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-gradient-to-br dark:from-slate-700 dark:to-slate-900 border border-slate-200 dark:border-slate-600/80 flex items-center justify-center text-slate-700 dark:text-slate-200 text-xs font-mono font-bold shrink-0 shadow-xs">
              JV
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-none">
                J. Vance
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                Reliability Eng. (L2)
              </span>
            </div>
          </button>

          {/* User Popover */}
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl shadow-xl dark:shadow-2xl dark:shadow-black/80 z-50 p-3 animate-in fade-in slide-in-from-top-1">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200 text-sm">
                  JV
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">Jordan Vance</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">j.vance@industrial-plant.demo</p>
                </div>
              </div>
              <div className="mt-2.5 space-y-1">
                <div className="flex items-center justify-between text-xs py-1.5 px-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    Role: Reliability Analyst
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">Admin</span>
                </div>
                <div className="flex items-center justify-between text-xs py-1.5 px-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    ISO 18436-2 Cat III
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Active</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Milestone 1 Demo</span>
                <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400">No Auth Required</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
