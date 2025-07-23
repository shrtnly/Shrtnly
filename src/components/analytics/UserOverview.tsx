import React from 'react';
import { User, Calendar, TrendingUp } from 'lucide-react';

interface UserOverviewProps {
  userData: {
    accountCreated: string;
    lastLogin: string;
    activityLevel: 'high' | 'medium' | 'low';
    totalLinks: number;
    totalClicks: number;
  };
}

const UserOverview: React.FC<UserOverviewProps> = ({ userData }) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  const getActivityColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <User className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">User Overview</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Links */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">Total Links</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">{formatNumber(userData.totalLinks)}</p>
        </div>

        {/* Total Clicks */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-600">Total Clicks</span>
          </div>
          <p className="text-2xl font-bold text-green-900">{formatNumber(userData.totalClicks)}</p>
        </div>

        {/* Account Created */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Member Since</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            {new Date(userData.accountCreated).toLocaleDateString()}
          </p>
        </div>

        {/* Activity Level */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Activity Level</span>
          </div>
          <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium capitalize ${getActivityColor(userData.activityLevel)}`}>
            {userData.activityLevel}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserOverview;