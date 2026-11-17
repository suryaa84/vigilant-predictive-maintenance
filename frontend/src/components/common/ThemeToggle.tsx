import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/useTheme';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex items-center justify-between p-1 rounded-lg border theme-transition cursor-pointer select-none ${
        isDark
          ? 'bg-slate-900 border-slate-700/80 hover:border-slate-600 text-slate-300'
          : 'bg-slate-100 border-slate-200 hover:border-slate-300 text-slate-700 shadow-xs'
      } ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Current: ${isDark ? 'Dark' : 'Light'} Mode. Click to switch to ${isDark ? 'Light' : 'Dark'} Mode.`}
    >
      <div className="flex items-center gap-1.5 px-2 py-1">
        <span
          className={`inline-block transition-transform duration-300 ease-out ${
            isDark ? 'rotate-0 scale-100' : 'rotate-180 scale-95'
          }`}
        >
          {isDark ? (
            <Moon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          )}
        </span>
        <span className="text-xs font-mono font-medium text-slate-800 dark:text-slate-200 min-w-[32px] text-left">
          {isDark ? 'Dark' : 'Light'}
        </span>
      </div>

      <div
        className={`w-6 h-6 rounded-md flex items-center justify-center transition-all duration-300 ease-out ${
          isDark
            ? 'bg-slate-800 text-amber-300 hover:text-amber-200 rotate-0'
            : 'bg-white text-slate-700 shadow-xs hover:text-slate-900 rotate-180'
        }`}
      >
        {isDark ? (
          <Sun className="w-3.5 h-3.5 transition-transform duration-300 hover:rotate-45" />
        ) : (
          <Moon className="w-3.5 h-3.5 transition-transform duration-300 hover:-rotate-12 text-slate-700" />
        )}
      </div>
    </button>
  );
};
