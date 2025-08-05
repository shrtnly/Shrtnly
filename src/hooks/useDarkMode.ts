import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface UseDarkModeReturn {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useDarkMode = (): UseDarkModeReturn => {
  const [theme, setThemeState] = useState<Theme>('system');
  const [isDark, setIsDark] = useState(false);

  // Check system preference
  const getSystemPreference = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  // Apply theme to document
  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    const systemPrefersDark = getSystemPreference();
    
    let shouldBeDark = false;
    
    switch (newTheme) {
      case 'dark':
        shouldBeDark = true;
        break;
      case 'light':
        shouldBeDark = false;
        break;
      case 'system':
        shouldBeDark = systemPrefersDark;
        break;
    }
    
    if (shouldBeDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    setIsDark(shouldBeDark);
    
    // Store preference in localStorage
    try {
      localStorage.setItem('theme-preference', newTheme);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  };

  // Set theme and apply it
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
  };

  // Toggle between light and dark (skips system)
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  // Initialize theme on mount
  useEffect(() => {
    let savedTheme: Theme = 'system';
    
    try {
      const saved = localStorage.getItem('theme-preference') as Theme;
      if (saved && ['light', 'dark', 'system'].includes(saved)) {
        savedTheme = saved;
      }
    } catch (error) {
      console.warn('Failed to read theme preference:', error);
    }
    
    setThemeState(savedTheme);
    applyTheme(savedTheme);
  }, []);

  // Listen for system preference changes
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
  };
};