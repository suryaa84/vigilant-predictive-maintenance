import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/useTheme';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex items-center justify-between p-1 rounded-lg border theme-transition cursor-pointer ${
        theme === 'dark'
          ? 'bg-slate-900 border-slate-700/80 hover:border-slate-600 text-slate-300'
          : 'bg-slate-100 border-slate-200 hover:border-slate-300 text-slate-700 shadow-xs'
      } ${className}`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Current: ${theme === 'dark' ? 'Dark' : 'Light'} Mode. Click to switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode.`}
    >
      <div className="flex items-center gap-1.5 px-2 py-1">
        {theme === 'dark' ? (
          <>
            <Moon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-xs font-mono font-medium text-slate-200">Dark</span>
          </>
        ) : (
          <>
            <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="text-xs font-mono font-medium text-slate-800">Light</span>
          </>
        )}
      </div>

      <div
        className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
          theme === 'dark'
            ? 'bg-slate-800 text-amber-300 hover:text-amber-200'
            : 'bg-white text-slate-700 shadow-xs hover:text-slate-900'
        }`}
      >
        {theme === 'dark' ? (
          <Sun className="w-3.5 h-3.5" />
        ) : (
          <Moon className="w-3.5 h-3.5 text-slate-700" />
        )}
      </div>
    </button>
  );
};
