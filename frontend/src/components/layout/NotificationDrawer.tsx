import React, { useState } from 'react';
import { Bell, Check, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { NOTIFICATION_ITEMS } from '../../data/mockData';
import { DemoTag } from '../common/DemoTag';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [notifications, setNotifications] = useState(NOTIFICATION_ITEMS);

  if (!isOpen) return null;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const getIcon = (severity: 'critical' | 'warning' | 'info') => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="w-4 h-4 text-rose-500 dark:text-rose-400 shrink-0 mt-0.5" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />;
      case 'info':
        return <Info className="w-4 h-4 text-sky-500 dark:text-sky-400 shrink-0 mt-0.5" />;
    }
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="absolute right-0 top-14 w-88 md:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl shadow-2xl shadow-slate-900/10 dark:shadow-black/80 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 theme-transition">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/70">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Alerts & Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.2 text-[10px] font-mono bg-rose-500/15 text-rose-700 dark:text-rose-400 border border-rose-500/30 rounded-full font-semibold">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
              title="Mark all as read"
            >
              <Check className="w-3 h-3" />
              Mark read
            </button>
          )}
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            aria-label="Close notifications"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Simulated Notice */}
      <div className="px-3.5 py-1.5 bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20 flex items-center justify-between">
        <span className="text-[11px] text-amber-800 dark:text-amber-300 font-mono">
          Simulated alerts feed • Milestone 1
        </span>
        <DemoTag label="MOCK" />
      </div>

      {/* List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`p-3.5 flex gap-3 transition-colors ${
              item.unread
                ? 'bg-slate-50/80 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800/70'
                : 'hover:bg-slate-50 dark:hover:bg-slate-800/20'
            }`}
          >
            {getIcon(item.severity)}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className={`text-xs font-medium leading-snug ${item.unread ? 'text-slate-900 dark:text-slate-100 font-semibold' : 'text-slate-700 dark:text-slate-300'}`}>
                  {item.title}
                </p>
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 shrink-0">
                  {item.time}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-between">
                <span>{item.subtitle}</span>
                {item.unread && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 shrink-0"></span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-100 dark:border-slate-800 text-center">
        <p className="text-[11px] text-slate-500">
          Telemetry trigger thresholds conform to ISO 10816 standards
        </p>
      </div>
    </div>
  );
};
