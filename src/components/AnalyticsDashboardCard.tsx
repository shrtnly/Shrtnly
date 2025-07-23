import React from 'react';
import { BarChart3, TrendingUp, Lock } from 'lucide-react';

interface AnalyticsDashboardCardProps {
  onSignInClick?: () => void;
  className?: string;
}

const AnalyticsDashboardCard: React.FC<AnalyticsDashboardCardProps> = ({ 
  onSignInClick, 
  className = '' 
}) => {
  return (
    <div className={`analytics-dashboard-card ${className}`}>
      {/* Main Card Container */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-xl backdrop-blur-sm">
        {/* Background Pattern Overlay */}
        <div className="absolute inset-0 bg-white bg-opacity-5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
        </div>

        {/* Card Content */}
        <div className="relative z-10 p-6 sm:p-8">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
                <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Analytics
              </h2>
            </div>
            
            {/* Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-1 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
              <Lock className="w-4 h-4 text-white opacity-80" />
              <span className="text-xs sm:text-sm text-white opacity-90 font-medium">
                Locked
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Sign-in Prompt */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white bg-opacity-20 rounded-full backdrop-blur-sm mb-4">
                <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              
              <p className="text-white text-base sm:text-lg leading-relaxed max-w-md mx-auto">
                Sign in to view your personalized analytics and track your link performance
              </p>
            </div>

            {/* Feature Preview */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8">
              <div className="text-center p-3 sm:p-4 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-bold text-white mb-1">---</div>
                <div className="text-xs sm:text-sm text-white opacity-80">Total Clicks</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-bold text-white mb-1">---</div>
                <div className="text-xs sm:text-sm text-white opacity-80">Links Created</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-bold text-white mb-1">---</div>
                <div className="text-xs sm:text-sm text-white opacity-80">QR Scans</div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="pt-4">
              <button
                onClick={onSignInClick}
                className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-3 sm:py-4 px-6 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              >
                <span className="flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  Sign In to Unlock Analytics
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
      </div>
    </div>
  );
};

export default AnalyticsDashboardCard;