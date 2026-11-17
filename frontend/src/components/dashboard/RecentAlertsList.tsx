import React, { useState } from 'react';
import {
  AlertTriangle,
  AlertCircle,
  Info,
  Clock,
  Check,
} from 'lucide-react';
import { MOCK_ALERTS } from '../../data/mockData';
import type { AlertEvent, AlertSeverity } from '../../types';
import { DemoTag } from '../common/DemoTag';

export const RecentAlertsList: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertEvent[]>(MOCK_ALERTS);
  const [filter, setFilter] = useState<'all' | AlertSeverity>('all');

  const filteredAlerts = alerts.filter(
    (a) => filter === 'all' || a.severity === filter
  );

  const toggleAcknowledge = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: !a.acknowledged } : a))
    );
  };

  const getSeverityBadge = (severity: AlertSeverity) => {
    switch (severity) {
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/30 uppercase">
            <AlertCircle className="w-3 h-3" />
            Critical
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30 uppercase">
            <AlertTriangle className="w-3 h-3" />
            Warning
          </span>
        );
      case 'info':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-500/15 dark:text-sky-300 dark:border-sky-500/30 uppercase">
            <Info className="w-3 h-3" />
            Info
          </span>
        );
    }
  };

  return (
    <div className="rounded-xl bg-white dark:bg-[#0d121e] border border-slate-200/90 dark:border-slate-800/90 p-5 shadow-sm dark:shadow-none flex flex-col justify-between theme-transition">
      <div>
        {/* Header with Title and Filter Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase font-mono tracking-wider">
                  Recent Telemetry Alerts & Events
                </h3>
                <DemoTag label="MOCK EVENTS" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Synthetic threshold breaches and edge diagnostic events
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900/90 p-1 rounded-lg border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
            {(['all', 'critical', 'warning', 'info'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-2 py-1 text-[11px] font-mono rounded capitalize transition-all cursor-pointer ${
                  filter === s
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-semibold border border-slate-200 dark:border-slate-600 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Alerts List */}
        <div className="mt-3.5 space-y-2.5">
          {filteredAlerts.length === 0 ? (
            <div className="p-8 text-center rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80">
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                No simulated alerts found matching '{filter}' filter.
              </p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3.5 rounded-lg border transition-all ${
                  alert.acknowledged
                    ? 'bg-slate-50/60 dark:bg-slate-900/30 border-slate-200/70 dark:border-slate-800/60 opacity-70'
                    : alert.severity === 'critical'
                    ? 'bg-rose-50/60 border-rose-200 hover:border-rose-300 dark:bg-rose-950/10 dark:border-rose-500/30 dark:hover:border-rose-500/50'
                    : alert.severity === 'warning'
                    ? 'bg-amber-50/60 border-amber-200 hover:border-amber-300 dark:bg-amber-950/10 dark:border-amber-500/30 dark:hover:border-amber-500/50'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 dark:bg-slate-900/60 dark:border-slate-800 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    {getSeverityBadge(alert.severity)}
                    <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                      {alert.title}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      ({alert.id} • Simulated)
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                      {alert.relativeTime}
                    </span>

                    <button
                      onClick={() => toggleAcknowledge(alert.id)}
                      className={`text-[11px] font-mono px-2 py-0.5 rounded border transition-colors cursor-pointer flex items-center gap-1 ${
                        alert.acknowledged
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30 hover:bg-emerald-100 dark:hover:bg-emerald-500/20'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-xs'
                      }`}
                      title={alert.acknowledged ? 'Click to unacknowledge' : 'Click to acknowledge event'}
                    >
                      <Check className="w-3 h-3" />
                      {alert.acknowledged ? 'Acked' : 'Ack'}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {alert.description}
                </p>

                {/* Telemetry diagnostics metadata */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/60 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 gap-2">
                  <div className="flex items-center gap-3">
                    <span>Sensor: <strong className="text-slate-700 dark:text-slate-300">{alert.sensor}</strong></span>
                    <span>Reading: <strong className="text-slate-800 dark:text-slate-200">{alert.reading}</strong></span>
                  </div>
                  <span className="text-amber-700 dark:text-amber-400/90 font-medium">{alert.threshold}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
        <span>Synthetic event logs for UI/UX testing • Real ESP32 MQTT alarms in Milestone 2</span>
        <span className="text-slate-400 dark:text-slate-500">Total: {alerts.length} mock events</span>
      </div>
    </div>
  );
};
