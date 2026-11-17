import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { PieChart as PieIcon, ShieldCheck, HelpCircle } from 'lucide-react';
import { MOCK_FAULT_DISTRIBUTION } from '../../data/mockData';
import { DemoTag } from '../common/DemoTag';
import { useTheme } from '../../context/useTheme';

export const FaultDistributionCard: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeId, setActiveId] = useState<string | null>(null);

  const chartData = MOCK_FAULT_DISTRIBUTION.map((item) => ({
    id: item.id,
    name: item.name,
    shortName: item.id === 'normal' ? 'Normal' : item.id === 'imbalance' ? 'Imbalance' : item.id === 'misalignment' ? 'Misalign' : item.id === 'bearing' ? 'Bearing' : 'Looseness',
    value: item.percentage,
    color: item.color,
    count: item.sampleCount,
    severity: item.severity,
    description: item.description,
    trend: item.trend,
  }));

  const activeCategory = chartData.find((c) => c.id === activeId) || null;

  return (
    <div className="rounded-xl bg-white dark:bg-[#0d121e] border border-slate-200/90 dark:border-slate-800/90 p-5 shadow-sm dark:shadow-none flex flex-col justify-between theme-transition">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
              <PieIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase font-mono tracking-wider">
                  Fault Classification Distribution
                </h3>
                <DemoTag label="DEMO" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Spectral pattern decomposition & diagnostic clustering
              </p>
            </div>
          </div>

          <span
            className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1 cursor-help"
            title="Categorized using mock FFT spectral energy distribution rules"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span className="hidden sm:inline">Mock Rules</span>
          </span>
        </div>

        {/* Donut Chart & Key Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center my-4">
          {/* Donut Canvas with Dynamic Center Display */}
          <div className="sm:col-span-5 h-44 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={46}
                  outerRadius={66}
                  paddingAngle={3}
                  dataKey="value"
                  stroke={isDark ? '#0d121e' : '#ffffff'}
                  strokeWidth={2}
                  onMouseEnter={(_, index) => setActiveId(chartData[index].id)}
                  onMouseLeave={() => setActiveId(null)}
                  onClick={(_, index) =>
                    setActiveId((prev) =>
                      prev === chartData[index].id ? null : chartData[index].id
                    )
                  }
                  className="cursor-pointer"
                >
                  {chartData.map((entry) => {
                    const isSelected = activeId === entry.id;
                    const isAnySelected = activeId !== null;
                    return (
                      <Cell
                        key={`cell-${entry.id}`}
                        fill={entry.color}
                        opacity={!isAnySelected || isSelected ? 1 : 0.4}
                        className="transition-opacity duration-200"
                      />
                    );
                  })}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Dynamic Unobstructed Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-200">
              {activeCategory ? (
                <>
                  <span
                    className="text-[11px] font-mono font-semibold uppercase leading-none truncate max-w-[70px]"
                    style={{ color: activeCategory.color }}
                  >
                    {activeCategory.shortName}
                  </span>
                  <span
                    className="text-xl font-bold font-mono leading-tight"
                    style={{ color: activeCategory.color }}
                  >
                    {activeCategory.value}%
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 capitalize">
                    {activeCategory.severity} Fault
                  </span>
                </>
              ) : (
                <>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase leading-none">
                    Normal
                  </span>
                  <span className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-400 leading-tight">
                    78%
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500">
                    Baseline
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Breakdown List (Interactive with Donut) */}
          <div className="sm:col-span-7 space-y-1.5">
            {chartData.map((item) => {
              const isSelected = activeId === item.id;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveId(item.id)}
                  onMouseLeave={() => setActiveId(null)}
                  onClick={() =>
                    setActiveId((prev) => (prev === item.id ? null : item.id))
                  }
                  className={`p-2 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-100 dark:bg-slate-800/90 border-slate-300 dark:border-slate-700 shadow-xs'
                      : 'bg-slate-50/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700/80'
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-label={`${item.name}, probability ${item.value}%`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform"
                        style={{
                          backgroundColor: item.color,
                          transform: isSelected ? 'scale(1.25)' : 'scale(1)',
                        }}
                      />
                      <span
                        className={`truncate ${
                          isSelected
                            ? 'font-bold text-slate-900 dark:text-slate-100'
                            : 'font-medium text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-slate-100 ml-2">
                      {item.value}%
                    </span>
                  </div>

                  {/* Progress Mini Bar */}
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${item.value}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ISSUE 1 FIX: External Tooltip / Diagnostic Callout Container */}
        {activeCategory ? (
          <div
            className="mt-3.5 p-3 rounded-lg border theme-transition animate-in fade-in duration-150"
            style={{
              borderColor: `${activeCategory.color}50`,
              backgroundColor: isDark
                ? `${activeCategory.color}12`
                : `${activeCategory.color}0a`,
            }}
          >
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: activeCategory.color }}
                />
                <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 font-mono">
                  {activeCategory.name}
                </span>
                <span
                  className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded border font-semibold"
                  style={{
                    borderColor: `${activeCategory.color}60`,
                    color: activeCategory.color,
                  }}
                >
                  {activeCategory.severity} Severity
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-slate-600 dark:text-slate-300">
                  Probability: <strong className="text-slate-900 dark:text-slate-100">{activeCategory.value}%</strong>
                </span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span className="text-slate-600 dark:text-slate-300">
                  Samples: <strong className="text-slate-900 dark:text-slate-100">{activeCategory.count.toLocaleString()}</strong>
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
              {activeCategory.description}
            </p>
          </div>
        ) : (
          <div className="mt-3.5 p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/40 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-[11px] font-mono">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              Hover or click any donut slice or category above to inspect harmonic diagnostics
            </span>
            <span className="text-[10px] font-mono text-slate-400 shrink-0 hidden sm:inline">
              Interactive Diagnostics
            </span>
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5 truncate">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          Rotor balance is within ISO 1940 Grade G2.5 limits
        </span>
        <span className="text-slate-400 dark:text-slate-500 shrink-0 ml-2">Demo Inference</span>
      </div>
    </div>
  );
};
