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
}

const CustomSensorTooltip: React.FC<SensorTooltipProps> = ({
  active,
  payload,
  label,
  showVibration = true,
  showTemperature = true,
  showAcoustic = false,
  showRpm = false,
}) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0]?.payload;
    return (
      <div className="bg-slate-900/95 border border-slate-700/80 rounded-xl p-3.5 shadow-2xl backdrop-blur-md text-xs font-mono min-w-[200px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 text-slate-300">
          <span className="font-semibold text-slate-200 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {dataPoint?.fullTimestamp || label}
          </span>
          <DemoTag label="MOCK" />
        </div>

        <div className="space-y-1.5">
          {showVibration && (
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Vibration RMS:
              </span>
              <span className="font-bold text-slate-100">
                {dataPoint?.vibrationRms?.toFixed(2)} mm/s
              </span>
            </div>
          )}

          {showVibration && (
            <div className="flex items-center justify-between gap-4 text-slate-400 text-[11px]">
              <span className="pl-3.5">Peak Velocity:</span>
              <span>{dataPoint?.vibrationPeak?.toFixed(2)} mm/s</span>
            </div>
          )}

          {showTemperature && (
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Temperature:
              </span>
              <span className="font-bold text-slate-100">
                {dataPoint?.temperature?.toFixed(1)} °C
              </span>
            </div>
          )}

          {showAcoustic && (
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-sky-400">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                Acoustic Sound:
              </span>
              <span className="font-bold text-slate-100">
                {dataPoint?.acousticSound?.toFixed(1)} dB
              </span>
            </div>
          )}

          {showRpm && (
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-purple-400">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                Shaft Speed:
              </span>
              <span className="font-bold text-slate-100">
                {dataPoint?.rpm} RPM
              </span>
            </div>
          )}
        </div>

        <div className="mt-2.5 pt-2 border-t border-slate-800 text-[10px] text-slate-500">
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
  const [timeRange, setTimeRange] = useState<TimeRange>('1h');
  const [showVibration, setShowVibration] = useState(true);
  const [showTemperature, setShowTemperature] = useState(true);
  const [showAcoustic, setShowAcoustic] = useState(false);
  const [showRpm, setShowRpm] = useState(false);

  const data = MOCK_SENSOR_SERIES[timeRange];

  const ranges: { label: string; value: TimeRange }[] = [
    { label: '1 Hour (High-Res)', value: '1h' },
    { label: '6 Hours', value: '6h' },
    { label: '24 Hours', value: '24h' },
    { label: '7 Days', value: '7d' },
  ];

  return (
    <div className="rounded-xl bg-[#0d121e] border border-slate-800/90 p-5 shadow-sm">
      {/* Header with Title and Range Picker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-slate-100 uppercase font-mono tracking-wider">
                Multi-Sensor Telemetry Trends
              </h2>
              <DemoTag label="DEMO SERIES" />
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulated time-series vibration velocity (ISO 10816) & surface temperature for {machineName}
            </p>
          </div>
        </div>

        {/* Range Buttons */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800 self-start sm:self-auto">
          {ranges.map((r) => (
            <button
              key={r.value}
              onClick={() => setTimeRange(r.value)}
              className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all cursor-pointer ${
                timeRange === r.value
                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
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
          <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3 text-slate-400" />
            Metrics:
          </span>

          {/* Vibration toggle */}
          <button
            onClick={() => setShowVibration(!showVibration)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-mono transition-colors cursor-pointer ${
              showVibration
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 opacity-60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Vibration RMS (mm/s)
          </button>

          {/* Temperature toggle */}
          <button
            onClick={() => setShowTemperature(!showTemperature)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-mono transition-colors cursor-pointer ${
              showTemperature
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 opacity-60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Temperature (°C)
          </button>

          {/* Acoustic toggle */}
          <button
            onClick={() => setShowAcoustic(!showAcoustic)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-mono transition-colors cursor-pointer ${
              showAcoustic
                ? 'bg-sky-500/10 border-sky-500/40 text-sky-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 opacity-60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            Acoustic (dB)
          </button>

          {/* RPM toggle */}
          <button
            onClick={() => setShowRpm(!showRpm)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-mono transition-colors cursor-pointer ${
              showRpm
                ? 'bg-purple-500/10 border-purple-500/40 text-purple-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 opacity-60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            RPM
          </button>
        </div>

        {/* Threshold Markers Legend */}
        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
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
              stroke="#1e293b"
              vertical={false}
            />

            <XAxis
              dataKey="time"
              stroke="#64748b"
              fontSize={11}
              fontFamily="monospace"
              tickLine={false}
              axisLine={{ stroke: '#1e293b' }}
            />

            {/* Left Y Axis: Vibration */}
            <YAxis
              yAxisId="vib"
              domain={[0, 6]}
              stroke="#10b981"
              fontSize={11}
              fontFamily="monospace"
              tickLine={false}
              axisLine={{ stroke: '#1e293b' }}
              tickFormatter={(v) => `${v.toFixed(1)}`}
              label={{
                value: 'Vibration (mm/s)',
                angle: -90,
                position: 'insideLeft',
                offset: 20,
                fill: '#10b981',
                fontSize: 10,
                fontFamily: 'monospace',
              }}
            />

            {/* Right Y Axis: Temperature */}
            <YAxis
              yAxisId="temp"
              orientation="right"
              domain={[20, 90]}
              stroke="#f59e0b"
              fontSize={11}
              fontFamily="monospace"
              tickLine={false}
              axisLine={{ stroke: '#1e293b' }}
              tickFormatter={(v) => `${v}°`}
              label={{
                value: 'Temp (°C)',
                angle: 90,
                position: 'insideRight',
                offset: 15,
                fill: '#f59e0b',
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
                />
              }
            />

            {/* ISO Warning Reference Line */}
            <ReferenceLine
              yAxisId="vib"
              y={4.5}
              stroke="#f43f5e"
              strokeDasharray="4 4"
              strokeWidth={1.5}
            />

            {/* Temp Warning Reference Line */}
            <ReferenceLine
              yAxisId="temp"
              y={75.0}
              stroke="#f59e0b"
              strokeDasharray="4 4"
              strokeWidth={1.5}
            />

            {/* Lines */}
            {showVibration && (
              <Line
                yAxisId="vib"
                type="monotone"
                dataKey="vibrationRms"
                stroke="#10b981"
                strokeWidth={2.2}
                dot={{ r: 2.5, fill: '#10b981', strokeWidth: 0 }}
                activeDot={{ r: 5, fill: '#34d399' }}
                name="Vibration RMS"
              />
            )}

            {showTemperature && (
              <Line
                yAxisId="temp"
                type="monotone"
                dataKey="temperature"
                stroke="#f59e0b"
                strokeWidth={2.2}
                dot={{ r: 2.5, fill: '#f59e0b', strokeWidth: 0 }}
                activeDot={{ r: 5, fill: '#fbbf24' }}
                name="Temperature"
              />
            )}

            {showAcoustic && (
              <Line
                yAxisId="acoustic"
                type="monotone"
                dataKey="acousticSound"
                stroke="#38bdf8"
                strokeWidth={2}
                strokeDasharray="2 2"
                dot={{ r: 2, fill: '#38bdf8' }}
                name="Acoustic Sound"
              />
            )}

            {showRpm && (
              <Line
                yAxisId="rpm"
                type="monotone"
                dataKey="rpm"
                stroke="#a855f7"
                strokeWidth={1.8}
                dot={{ r: 2, fill: '#a855f7' }}
                name="Shaft Speed"
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer with Diagnostic Note */}
      <div className="mt-2 pt-2.5 border-t border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-400 font-mono gap-1.5">
        <span className="flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
          ISO 10816-3 Zone A/B: RMS vibration velocity currently within safe running boundaries.
        </span>
        <span className="text-slate-400">
          Source: ESP32 Virtual Accelerometer (Mock Telemetry)
        </span>
      </div>
    </div>
  );
};
