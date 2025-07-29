import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Monitor, Smartphone, Tablet } from 'lucide-react';

interface OSUserReportProps {
  data: Array<{
    os: string;
    users: number;
    percentage: number;
    color: string;
  }>;
}

const OSUserReport: React.FC<OSUserReportProps> = ({ data }) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  const getOSIcon = (osName: string) => {
    const lowerOS = osName.toLowerCase();
    if (lowerOS.includes('windows')) {
      return <Monitor className="w-5 h-5 text-blue-600" />;
    } else if (lowerOS.includes('ios') || lowerOS.includes('iphone') || lowerOS.includes('ipad')) {
      return <Smartphone className="w-5 h-5 text-gray-600" />;
    } else if (lowerOS.includes('android')) {
      return <Smartphone className="w-5 h-5 text-green-600" />;
    } else if (lowerOS.includes('mac') || lowerOS.includes('darwin')) {
      return <Monitor className="w-5 h-5 text-gray-800" />;
    } else if (lowerOS.includes('linux')) {
      return <Monitor className="w-5 h-5 text-orange-600" />;
    }
    return <Tablet className="w-5 h-5 text-gray-500" />;
  };

  const totalUsers = data.reduce((sum, item) => sum + item.users, 0);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Monitor className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Operating System Analytics</h3>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">

      
      {/* OS Statistics List */}
      <div className="mt-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Detailed OS Statistics</h4>
        <div className="space-y-3">
          {data.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No operating system data available.</p>
          ) : (
            data.map((osData, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  {getOSIcon(osData.os)}
                  <div>
                    <div className="font-medium text-gray-900">{osData.os}</div>
                    <div className="text-sm text-gray-600">{osData.percentage}% of total users</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">{formatNumber(osData.users)}</div>
                  <div className="text-sm text-gray-500">users</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">{formatNumber(totalUsers)}</div>
            <div className="text-sm text-blue-700">Total Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">{data.length}</div>
            <div className="text-sm text-blue-700">Operating Systems</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">
              {data.length > 0 ? data[0].os : 'N/A'}
            </div>
            <div className="text-sm text-blue-700">Most Popular OS</div>
          </div>
        </div>
      </div>
  );
};

export default OSUserReport;