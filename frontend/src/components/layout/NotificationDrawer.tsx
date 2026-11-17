import React from 'react';
import { Bell, Check, AlertTriangle, AlertCircle, Info, X, CheckCheck } from 'lucide-react';
import { DemoTag } from '../common/DemoTag';
import { useNotifications } from '../../context/useNotifications';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  if (!isOpen) return null;

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

  return (
    <div
      className="absolute right-0 top-14 w-88 md:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl shadow-2xl shadow-slate-900/10 dark:shadow-black/80 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 theme-transition"
      role="dialog"
      aria-label="Alerts and notifications panel"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/70">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Alerts & Notifications</h3>
          {unreadCount > 0 ? (
            <span className="px-1.5 py-0.2 text-[10px] font-mono bg-rose-500/15 text-rose-700 dark:text-rose-400 border border-rose-500/30 rounded-full font-semibold">
              {unreadCount} unread
            </span>
          ) : (
            <span className="px-1.5 py-0.2 text-[10px] font-mono bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 rounded-full font-semibold">
              All caught up
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-slate-600 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer font-medium px-1.5 py-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Mark all notifications as read and close"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Mark all read
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
          Simulated telemetry alerts feed
        </span>
        <DemoTag label="MOCK" />
      </div>

      {/* List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80">
        {notifications.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              if (item.unread) markAsRead(item.id);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                if (item.unread) markAsRead(item.id);
              }
            }}
            tabIndex={item.unread ? 0 : -1}
            role="button"
            aria-label={`${item.title}, ${item.unread ? 'unread. Click to mark as read' : 'read'}`}
            className={`p-3.5 flex gap-3 transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 ${
              item.unread
                ? 'bg-slate-50/90 hover:bg-slate-100/90 dark:bg-slate-800/40 dark:hover:bg-slate-800/70 border-l-2 border-l-emerald-500'
                : 'hover:bg-slate-50 dark:hover:bg-slate-800/20 opacity-75'
            }`}
          >
            {getIcon(item.severity)}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className={`text-xs leading-snug ${item.unread ? 'text-slate-900 dark:text-slate-100 font-semibold' : 'text-slate-600 dark:text-slate-400'}`}>
                  {item.title}
                </p>
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 shrink-0">
                  {item.time}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-between">
                <span>{item.subtitle}</span>
                {item.unread ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 shrink-0" />
                    Unread
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 dark:text-slate-500">
                    <Check className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                    Read
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
        <span>Click any unread alert to mark as read</span>
        <span className="font-mono">{notifications.length} total</span>
      </div>
    </div>
  );
};
