import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { Theme } from '../hooks/useDarkMode';

interface ThemeToggleProps {
  theme: Theme;
  isDark: boolean;
  onThemeChange: (theme: Theme) => void;
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  theme, 
  isDark, 
  onThemeChange, 
  className = '' 
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themeOptions = [
    { value: 'light' as Theme, label: 'Light', icon: Sun },
    { value: 'dark' as Theme, label: 'Dark', icon: Moon },
    { value: 'system' as Theme, label: 'System', icon: Monitor },
  ];

  const currentOption = themeOptions.find(option => option.value === theme) || themeOptions[2];
  const CurrentIcon = currentOption.icon;

  const handleThemeSelect = (newTheme: Theme) => {
    onThemeChange(newTheme);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg bg-surface-primary border border-border-primary text-text-primary hover:bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-theme"
        aria-label={`Current theme: ${currentOption.label}. Click to change theme`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <CurrentIcon className="w-5 h-5" />
        <span className="hidden sm:block text-sm font-medium">
          {currentOption.label}
        </span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-surface-elevated border border-border-primary rounded-lg shadow-xl py-1 z-50 transition-all duration-200">
          {themeOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = option.value === theme;
            
            return (
              <button
                key={option.value}
                onClick={() => handleThemeSelect(option.value)}
                className={`flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors duration-150 ${
                  isSelected 
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                    : 'text-text-primary hover:bg-surface-secondary'
                }`}
                aria-label={`Switch to ${option.label.toLowerCase()} theme`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{option.label}</span>
                {isSelected && (
                  <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;