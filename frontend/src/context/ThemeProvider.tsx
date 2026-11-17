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

  const transitionTimerRef = useRef<number | null>(null);

  const applyThemeToDOM = (newTheme: Theme, animate = false) => {
    const root = document.documentElement;

    if (animate) {
      root.classList.add('theme-transitioning');
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }
      transitionTimerRef.current = window.setTimeout(() => {
        root.classList.remove('theme-transitioning');
      }, 350);
    }

    root.setAttribute('data-theme', newTheme);
    if (newTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyThemeToDOM(newTheme, true);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // Ignore storage errors
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Initial mount: ensure DOM attributes match without triggering animated transition
  useEffect(() => {
    applyThemeToDOM(theme, false);
    return () => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
