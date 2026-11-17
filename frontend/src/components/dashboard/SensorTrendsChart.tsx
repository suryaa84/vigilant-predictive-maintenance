import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import { Activity, Clock, ShieldAlert, Filter } from 'lucide-react';
import { MOCK_SENSOR_SERIES } from '../../data/mockData';
import type { SensorDataPoint, TimeRange } from '../../types';
import { DemoTag } from '../common/DemoTag';
import { useTheme } from '../../context/useTheme';

interface SensorTrendsChartProps {
  machineName?: string;
}

interface SensorTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: SensorDataPoint;
  }>;
  label?: string;
  showVibration?: boolean;
  showTemperature?: boolean;
  showAcoustic?: boolean;
  showRpm?: boolean;
  theme?: 'dark' | 'light';
}

const CustomSensorTooltip: React.FC<SensorTooltipProps> = ({
  active,
  payload,
  label,
  showVibration = true,
  showTemperature = true,
  showAcoustic = false,
  showRpm = false,
  theme = 'dark',
}) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0]?.payload;
    const isDark = theme === 'dark';

    return (
      <div
        className={`border rounded-xl p-3.5 backdrop-blur-md text-xs font-mono min-w-[210px] theme-transition ${
          isDark
            ? 'bg-slate-900/95 border-slate-700/80 text-slate-300 shadow-2xl'
            : 'bg-white/98 border-slate-200 text-slate-700 shadow-xl shadow-slate-900/10'
        }`}
      >
        <div
          className={`flex items-center justify-between border-b pb-2 mb-2 ${
            isDark ? 'border-slate-800 text-slate-200' : 'border-slate-100 text-slate-800'
          }`}
        >
          <span className="font-semibold flex items-center gap-1.5">
            <Clock className={`w-3.5 h-3.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
            {dataPoint?.fullTimestamp || label}
          </span>
          <DemoTag label="MOCK" />
        </div>

        <div className="space-y-1.5">
          {showVibration && (
            <div className="flex items-center justify-between gap-4">
              <span className={`flex items-center gap-1.5 ${isDark ? 'text-emerald-400' : 'text-emerald-700 font-medium'}`}>
                <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-emerald-500'}`} />
                Vibration RMS:
              </span>
              <span className={`font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                {dataPoint?.vibrationRms?.toFixed(2)} mm/s
              </span>
            </div>
          )}

          {showVibration && (
            <div className={`flex items-center justify-between gap-4 text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <span className="pl-3.5">Peak Velocity:</span>
              <span>{dataPoint?.vibrationPeak?.toFixed(2)} mm/s</span>
            </div>
          )}

          {showTemperature && (
            <div className="flex items-center justify-between gap-4">
              <span className={`flex items-center gap-1.5 ${isDark ? 'text-amber-400' : 'text-amber-700 font-medium'}`}>
                <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-amber-400' : 'bg-amber-500'}`} />
                Temperature:
              </span>
              <span className={`font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                {dataPoint?.temperature?.toFixed(1)} °C
              </span>
            </div>
          )}

          {showAcoustic && (
            <div className="flex items-center justify-between gap-4">
              <span className={`flex items-center gap-1.5 ${isDark ? 'text-sky-400' : 'text-sky-700 font-medium'}`}>
                <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-sky-400' : 'bg-sky-500'}`} />
                Acoustic Sound:
              </span>
              <span className={`font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                {dataPoint?.acousticSound?.toFixed(1)} dB
              </span>
            </div>
          )}

          {showRpm && (
            <div className="flex items-center justify-between gap-4">
              <span className={`flex items-center gap-1.5 ${isDark ? 'text-purple-400' : 'text-purple-700 font-medium'}`}>
                <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-purple-400' : 'bg-purple-500'}`} />
                Shaft Speed:
              </span>
              <span className={`font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                {dataPoint?.rpm} RPM
              </span>
            </div>
          )}
        </div>

        <div className={`mt-2.5 pt-2 border-t text-[10px] ${isDark ? 'border-slate-800 text-slate-500' : 'border-slate-100 text-slate-400'}`}>
          ISO 10816 Limit: 4.50 mm/s (Alert)
        </div>
      </div>
    );
  }
  return null;
};

export const SensorTrendsChart: React.FC<SensorTrendsChartProps> = ({
  machineName = 'Demo Motor 01',
}) => {
  const { theme } = useTheme();
  const [timeRange, setTimeRange] = useState<TimeRange>('1h');
  const [showVibration, setShowVibration] = useState(true);
  const [showTemperature, setShowTemperature] = useState(true);
  const [showAcoustic, setShowAcoustic] = useState(false);
  const [showRpm, setShowRpm] = useState(false);

  const isDark = theme === 'dark';
  const data = MOCK_SENSOR_SERIES[timeRange];

  const ranges: { label: string; value: TimeRange }[] = [
    { label: '1 Hour (High-Res)', value: '1h' },
    { label: '6 Hours', value: '6h' },
    { label: '24 Hours', value: '24h' },
    { label: '7 Days', value: '7d' },
  ];

  return (
    <div className="rounded-xl bg-white dark:bg-[#0d121e] border border-slate-200/90 dark:border-slate-800/90 p-5 shadow-sm dark:shadow-none theme-transition">
      {/* Header with Title and Range Picker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase font-mono tracking-wider">
                Multi-Sensor Telemetry Trends
              </h2>
              <DemoTag label="DEMO SERIES" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Simulated time-series vibration velocity (ISO 10816) & surface temperature for {machineName}
            </p>
          </div>
        </div>

        {/* Range Buttons */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900/90 p-1 rounded-lg border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
          {ranges.map((r) => (
            <button
              key={r.value}
              onClick={() => setTimeRange(r.value)}
              className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all cursor-pointer ${
                timeRange === r.value
                  ? 'bg-white dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-semibold border border-slate-200 dark:border-emerald-500/30 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Toggles & Legend Bar */}
      <div className="py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px] flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3 text-slate-400 dark:text-slate-500" />
            Metrics:
          </span>

          {/* Vibration toggle */}
          <button
            onClick={() => setShowVibration(!showVibration)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-mono transition-colors cursor-pointer ${
              showVibration
                ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 font-medium'
                : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-500 opacity-60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            Vibration RMS (mm/s)
          </button>

          {/* Temperature toggle */}
          <button
            onClick={() => setShowTemperature(!showTemperature)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-mono transition-colors cursor-pointer ${
              showTemperature
                ? 'bg-amber-50 dark:bg-amber-500/10 border-amber-300 dark:border-amber-500/40 text-amber-800 dark:text-amber-300 font-medium'
                : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-500 opacity-60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400" />
            Temperature (°C)
          </button>

          {/* Acoustic toggle */}
          <button
            onClick={() => setShowAcoustic(!showAcoustic)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-mono transition-colors cursor-pointer ${
              showAcoustic
                ? 'bg-sky-50 dark:bg-sky-500/10 border-sky-300 dark:border-sky-500/40 text-sky-800 dark:text-sky-300 font-medium'
                : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-500 opacity-60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-sky-500 dark:bg-sky-400" />
            Acoustic (dB)
          </button>

          {/* RPM toggle */}
          <button
            onClick={() => setShowRpm(!showRpm)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-mono transition-colors cursor-pointer ${
              showRpm
                ? 'bg-purple-50 dark:bg-purple-500/10 border-purple-300 dark:border-purple-500/40 text-purple-800 dark:text-purple-300 font-medium'
                : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-500 opacity-60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-purple-500 dark:bg-purple-400" />
            RPM
          </button>
        </div>

        {/* Threshold Markers Legend */}
        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 border-t border-dashed border-rose-500" />
            <span>ISO Warning (4.5 mm/s)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 border-t border-dashed border-amber-500" />
            <span>Temp Limit (75°C)</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-80 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 15, left: -10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? '#1e293b' : '#e2e8f0'}
              vertical={false}
            />

            <XAxis
              dataKey="time"
              stroke={isDark ? '#64748b' : '#94a3b8'}
              fontSize={11}
              fontFamily="monospace"
              tickLine={false}
              axisLine={{ stroke: isDark ? '#1e293b' : '#e2e8f0' }}
            />

            {/* Left Y Axis: Vibration */}
            <YAxis
              yAxisId="vib"
              domain={[0, 6]}
              stroke={isDark ? '#10b981' : '#059669'}
              fontSize={11}
              fontFamily="monospace"
              tickLine={false}
              axisLine={{ stroke: isDark ? '#1e293b' : '#e2e8f0' }}
              tickFormatter={(v) => `${v.toFixed(1)}`}
              label={{
                value: 'Vibration (mm/s)',
                angle: -90,
                position: 'insideLeft',
                offset: 20,
                fill: isDark ? '#10b981' : '#059669',
                fontSize: 10,
                fontFamily: 'monospace',
              }}
            />

            {/* Right Y Axis: Temperature */}
            <YAxis
              yAxisId="temp"
              orientation="right"
              domain={[20, 90]}
              stroke={isDark ? '#f59e0b' : '#d97706'}
              fontSize={11}
              fontFamily="monospace"
              tickLine={false}
              axisLine={{ stroke: isDark ? '#1e293b' : '#e2e8f0' }}
              tickFormatter={(v) => `${v}°`}
              label={{
                value: 'Temp (°C)',
                angle: 90,
                position: 'insideRight',
                offset: 15,
                fill: isDark ? '#f59e0b' : '#d97706',
                fontSize: 10,
                fontFamily: 'monospace',
              }}
            />

            {/* Hidden Y-Axis for Acoustic Sound */}
            {showAcoustic && (
              <YAxis
                yAxisId="acoustic"
                orientation="right"
                domain={[40, 100]}
                hide={true}
              />
            )}

            {/* Hidden Y-Axis for RPM */}
            {showRpm && (
              <YAxis
                yAxisId="rpm"
                orientation="right"
                domain={[1000, 2000]}
                hide={true}
              />
            )}

            <Tooltip
              content={
                <CustomSensorTooltip
                  showVibration={showVibration}
                  showTemperature={showTemperature}
                  showAcoustic={showAcoustic}
                  showRpm={showRpm}
                  theme={theme}
                />
              }
            />

            {/* ISO Warning Reference Line */}
            <ReferenceLine
              yAxisId="vib"
              y={4.5}
              stroke={isDark ? '#f43f5e' : '#e11d48'}
              strokeDasharray="4 4"
              strokeWidth={1.5}
            />

            {/* Temp Warning Reference Line */}
            <ReferenceLine
              yAxisId="temp"
              y={75.0}
              stroke={isDark ? '#f59e0b' : '#d97706'}
              strokeDasharray="4 4"
              strokeWidth={1.5}
            />

            {/* Lines */}
            {showVibration && (
              <Line
                yAxisId="vib"
                type="monotone"
                dataKey="vibrationRms"
                stroke={isDark ? '#10b981' : '#059669'}
                strokeWidth={2.2}
                dot={{ r: 2.5, fill: isDark ? '#10b981' : '#059669', strokeWidth: 0 }}
                activeDot={{ r: 5, fill: isDark ? '#34d399' : '#10b981' }}
                name="Vibration RMS"
              />
            )}

            {showTemperature && (
              <Line
                yAxisId="temp"
                type="monotone"
                dataKey="temperature"
                stroke={isDark ? '#f59e0b' : '#d97706'}
                strokeWidth={2.2}
                dot={{ r: 2.5, fill: isDark ? '#f59e0b' : '#d97706', strokeWidth: 0 }}
                activeDot={{ r: 5, fill: isDark ? '#fbbf24' : '#f59e0b' }}
                name="Temperature"
              />
            )}

            {showAcoustic && (
              <Line
                yAxisId="acoustic"
                type="monotone"
                dataKey="acousticSound"
                stroke={isDark ? '#38bdf8' : '#0284c7'}
                strokeWidth={2}
                strokeDasharray="2 2"
                dot={{ r: 2, fill: isDark ? '#38bdf8' : '#0284c7' }}
                name="Acoustic Sound"
              />
            )}

            {showRpm && (
              <Line
                yAxisId="rpm"
                type="monotone"
                dataKey="rpm"
                stroke={isDark ? '#a855f7' : '#7c3aed'}
                strokeWidth={1.8}
                dot={{ r: 2, fill: isDark ? '#a855f7' : '#7c3aed' }}
                name="Shaft Speed"
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer with Diagnostic Note */}
      <div className="mt-2 pt-2.5 border-t border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono gap-1.5">
        <span className="flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          ISO 10816-3 Zone A/B: RMS vibration velocity currently within safe running boundaries.
        </span>
        <span className="text-slate-400 dark:text-slate-500">
          Source: ESP32 Virtual Accelerometer (Mock Telemetry)
        </span>
      </div>
    </div>
  );
};
