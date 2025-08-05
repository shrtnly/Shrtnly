import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Link2, BarChart3, Shield, Mail, Menu, X, ChevronDown,
  Settings, TrendingUp, HelpCircle, Info, FileText
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Theme } from '../hooks/useDarkMode';
import UserMenu from './UserMenu';
import AuthModal from './auth/AuthModal';
import ThemeToggle from './ThemeToggle';

interface NavigationProps {
  theme: Theme;
  isDark: boolean;
  onThemeChange: (theme: Theme) => void;
}

const Navigation: React.FC<NavigationProps> = ({ theme, isDark, onThemeChange }) => {
  const location = useLocation();
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [featuresDropdownOpen, setFeaturesDropdownOpen] = React.useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = React.useState(false);
  
  const navItems = [
    { path: '/', label: 'Home', icon: Link2 },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  ];
  
  const featuresItems = [
    { path: '/features/link-management', label: 'Link Management', icon: Settings, description: 'Advanced URL management tools' },
    { path: '/features/monitoring-analysis', label: 'Monitoring & Analysis', icon: TrendingUp, description: 'Real-time analytics and insights' },
    { path: '/features/how-it-works', label: 'How It Works', icon: HelpCircle, description: 'Simple 4-step process' },
    { path: '/features/about', label: 'About Shrtnly', icon: Info, description: 'Our story and mission' },
    { path: '/privacy', label: 'Privacy Policy', icon: Shield, description: 'Data protection policy' },
    { path: '/contact', label: 'Contact', icon: Mail },
    { path: '/blog', label: 'Blog', icon: FileText, description: 'Tips and insights' },
  ];

  return (
    <nav className="bg-surface-primary shadow-sm border-b border-border-primary transition-colors duration-theme" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-bold text-text-primary hover:text-blue-600 transition-colors duration-theme focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-2 py-1"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="p-2 bg-blue-600 rounded-lg">
              <Link2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="hidden sm:block">Shrtnly</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-theme focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isActive 
                      ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
            
            {/* Features Dropdown */}
            <div className="relative">
              <button
                onClick={() => setFeaturesDropdownOpen(!featuresDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors duration-theme focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Settings size={18} />
                Features
                <ChevronDown className={`w-4 h-4 transition-transform ${featuresDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {featuresDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-surface-elevated border border-border-primary rounded-lg shadow-xl py-2 z-50 max-h-[80vh] overflow-y-auto transition-colors duration-theme">
                  {featuresItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setFeaturesDropdownOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-theme ${
                          isActive ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20' : 'text-text-primary hover:bg-surface-secondary'
                        }`}
                      >
                        <Icon size={16} />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          
          {/* Auth + Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <ThemeToggle 
              theme={theme} 
              isDark={isDark} 
              onThemeChange={onThemeChange}
              className="hidden sm:block"
            />
            
            {user ? (
              <UserMenu />
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="hidden sm:block bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Sign In
              </button>
            )}
            
            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors duration-theme focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`md:hidden border-t border-border-primary transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-[500px] opacity-100 py-4' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-theme focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px] ${
                    isActive ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
            
            {/* Mobile Features Dropdown */}
            <div className="border-t border-border-primary pt-2 mt-2">
              <button
                onClick={() => setMobileFeaturesOpen(!mobileFeaturesOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-lg font-medium transition-colors duration-theme focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px]"
              >
                <div className="flex items-center gap-3">
                  <Settings size={18} />
                  Features
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileFeaturesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {mobileFeaturesOpen && (
                <div className="mt-1 ml-4 border-l border-border-primary pl-2">
                  {featuresItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-theme min-h-[44px] ${
                          isActive ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                        }`}
                      >
                        <Icon size={18} />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
            
            {/* Mobile Theme Toggle */}
            <div className="border-t border-border-primary pt-2 mt-2">
              <ThemeToggle 
                theme={theme} 
                isDark={isDark} 
                onThemeChange={onThemeChange}
                className="w-full"
              />
            </div>
            
            {/* Mobile Sign In */}
            {!user && (
              <button
                onClick={() => {
                  setAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors min-h-[44px] mt-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </nav>
  );
};

export default Navigation;