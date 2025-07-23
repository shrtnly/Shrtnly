import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import { Activity, Clock, MousePointer, Target, RefreshCw } from 'lucide-react';

interface EngagementMetricsProps {
  data: {
    dailySessions: Array<{ date: string; sessions: number }>;
    averageSessionDuration: number;
    interactionFrequency: number;
    featureUsage: Array<{ feature: string; usage: number; color: string }>;
    completionRates: {
      linkCreation: number;
      qrGeneration: number;
      linkSharing: number;
    };
    referralSources: Array<{ source: string; visits: number }>;
    geographicData: Array<{ country: string; visits: number }>;
    deviceTypes: Array<{ device: string; visits: number; }>;
    browserStats: Array<{ browser: string; visits: number; }>;
  };
  onRefresh?: () => void;
}

const EngagementMetrics: React.FC<EngagementMetricsProps> = ({ data, onRefresh }) => {
  const formatDuration = (minutes: number) =>
    `${Math.floor(minutes / 60)}h ${minutes % 60}m`;

  const formatNumber = (num: number): string =>
    num >= 1_000_000 ? (num / 1_000_000).toFixed(1) + 'M'
      : num >= 1_000 ? (num / 1_000).toFixed(1) + 'K'
        : num.toLocaleString();

  // Calculate total clicks for referral sources
  const totalClicks = data.referralSources.reduce((sum, src) => sum + src.visits, 0);
  const COLORS = ['#4285F4', '#FBBC05', '#34A853', '#EA4335', '#9B59B6', '#F39C12'];

  // Map referral sources with calculated percentage and color
  const referralSources = data.referralSources.map((src, i) => ({
    ...src,
    percentage: totalClicks > 0 ? ((src.visits / totalClicks) * 100).toFixed(0) : '0',
    color: COLORS[i % COLORS.length],
  }));

  // For PieChart zero data handling
  const referralSourcesData = totalClicks > 0
    ? referralSources
    : [{ source: 'No Data', visits: 0, percentage: '0', color: '#E5E7EB' }];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Activity className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Engagement Metrics</h2>
        </div>
        <button
          onClick={onRefresh}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600 transition"
        >
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        {/* Daily Sessions Chart */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Sessions (Last 7 Days)</h3>
          <div className="h-64">
            {data.dailySessions.length === 0 ? (
              <p className="text-gray-500 text-center mt-20">No session data available.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.dailySessions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Referral Sources Pie Chart */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Referral Sources</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={referralSourcesData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="visits"
                  label={({ source, percentage }) =>
                    totalClicks > 0 ? `${source}: ${percentage}%` : 'No Data'
                  }
                >
                  {referralSourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `${value} visits`}
                  labelFormatter={(label) => `Source: ${label}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Top Sources:</h4>
            {totalClicks === 0 ? (
              <p className="text-gray-500 text-sm">No referral data available.</p>
            ) : (
              <div className="grid gap-2">
                {referralSources.slice(0, 3).map((src, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: src.color }} />
                      <span className="text-sm font-medium text-gray-700">{src.source}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-gray-900">{src.visits}</span>
                      <span className="text-xs text-gray-500 ml-1">({src.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">Avg Session</span>
          </div>
          <p className="text-xl font-bold text-blue-900">{formatDuration(data.averageSessionDuration)}</p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <MousePointer className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-600">Interactions/Day</span>
          </div>
          <p className="text-xl font-bold text-green-900">{data.interactionFrequency}</p>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">Link Creation</span>
          </div>
          <p className="text-xl font-bold text-purple-900">{data.completionRates.linkCreation}%</p>
        </div>

        <div className="p-4 bg-orange-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-600">QR Generation</span>
          </div>
          <p className="text-xl font-bold text-orange-900">{data.completionRates.qrGeneration}%</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span>Data updates in real-time</span>
      </div>
    </div>
  );
};

export default EngagementMetrics;