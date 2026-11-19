import React, { useEffect, useState, useRef } from 'react';
import { ThemeContext, type Theme } from './ThemeContextDefinition';

const THEME_STORAGE_KEY = 'vigilant-theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    } catch {
      // LocalStorage access fail fallback
    }
    // Default initial theme is Dark Mode as requested
    return 'dark';
  });

  const isInitialMount = useRef(true);
  const transitionTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;

    if (!isInitialMount.current) {
      root.classList.add('theme-transitioning');
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }
      transitionTimerRef.current = window.setTimeout(() => {
        root.classList.remove('theme-transitioning');
      }, 350);
    } else {
      isInitialMount.current = false;
    }

    root.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage errors
    }

    return () => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
