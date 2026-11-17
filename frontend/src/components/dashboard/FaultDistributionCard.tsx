import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { PieChart as PieIcon, ShieldCheck, HelpCircle } from 'lucide-react';
import { MOCK_FAULT_DISTRIBUTION } from '../../data/mockData';
import { DemoTag } from '../common/DemoTag';

interface PieTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      name: string;
      value: number;
      color: string;
      count: number;
      description: string;
    };
  }>;
}

const CustomPieTooltip: React.FC<PieTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900/95 border border-slate-700/80 rounded-xl p-3 shadow-xl backdrop-blur-md text-xs font-mono">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: data.color }}
          />
          <span className="font-semibold text-slate-100">{data.name}</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-slate-300">
          <span>Probability:</span>
          <span className="font-bold text-slate-100">{data.value}%</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-slate-400 text-[10px] mt-0.5">
          <span>Synthetic Samples:</span>
          <span>{data.count.toLocaleString()}</span>
        </div>
      </div>
    );
  }
  return null;
};

export const FaultDistributionCard: React.FC = () => {
  const chartData = MOCK_FAULT_DISTRIBUTION.map((item) => ({
    name: item.name,
    value: item.percentage,
    color: item.color,
    count: item.sampleCount,
    description: item.description,
  }));

  return (
    <div className="rounded-xl bg-[#0d121e] border border-slate-800/90 p-5 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-slate-800/80">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
              <PieIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-slate-100 uppercase font-mono tracking-wider">
                  Fault Classification Distribution
                </h3>
                <DemoTag label="DEMO" />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Spectral pattern decomposition & diagnostic clustering
              </p>
            </div>
          </div>

          <span
            className="text-[11px] font-mono text-slate-400 flex items-center gap-1 cursor-help"
            title="Categorized using mock FFT spectral energy distribution rules"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Mock Rules</span>
          </span>
        </div>

        {/* Donut Chart & Key Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center my-4">
          {/* Donut Canvas */}
          <div className="sm:col-span-5 h-44 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<CustomPieTooltip />} />
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={68}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="#0d121e"
                  strokeWidth={2}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs font-mono text-slate-400 uppercase leading-none">
                Normal
              </span>
              <span className="text-xl font-bold font-mono text-emerald-400 leading-tight">
                78%
              </span>
              <span className="text-[9px] font-mono text-slate-400">Baseline</span>
            </div>
          </div>

          {/* Breakdown List */}
          <div className="sm:col-span-7 space-y-2">
            {MOCK_FAULT_DISTRIBUTION.map((item) => (
              <div
                key={item.id}
                className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-slate-200 font-medium truncate">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-bold text-slate-100 ml-2">
                    {item.percentage}%
                  </span>
                </div>

                {/* Progress Mini Bar */}
                <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span className="flex items-center gap-1.5 truncate">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          Rotor balance is within ISO 1940 Grade G2.5 limits
        </span>
        <span className="text-slate-400 shrink-0 ml-2">Demo Inference</span>
      </div>
    </div>
  );
};
