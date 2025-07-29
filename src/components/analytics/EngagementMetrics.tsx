import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart,
} from 'recharts';
import { Activity, Clock, MousePointer, Target, RefreshCw, TrendingUp, Zap, Users, Eye } from 'lucide-react';
import OSUserReport from './OSUserReport';
import CountryUserReport from './CountryUserReport';

interface EngagementMetricsProps {
  data: {
    realTimeMetrics: {
      clicks_last_hour: number;
      clicks_last_24h: number;
      active_links_today: number;
      top_performing_link: string | null;
      conversion_rate: number;
      bounce_rate: number;
    };
    topLinkPerformance: Array<{
      short_code: string;
      title: string | null;
      original_url: string;
      total_clicks: number;
      unique_clicks: number;
      click_through_rate: number;
      avg_daily_clicks: number;
      last_clicked: string | null;
      created_at: string;
      performance_score: number;
      trend: 'up' | 'down' | 'stable';
      trend_percentage: number;
    }>;
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
    clickHeatmap: Array<{ hour: number; day: string; clicks: number }>;
    conversionFunnel: Array<{ stage: string; count: number; percentage: number }>;
    osUserData: Array<{ os: string; users: number; percentage: number; color: string }>;
    countryUserData: Array<{ country: string; users: number; percentage: number; color?: string }>;
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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

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
            <Zap className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Real-time Analytics & Performance</h2>
        </div>
        <button
          onClick={onRefresh}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600 transition"
        >
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Real-time Metrics Dashboard */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Live Metrics
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Last Hour</p>
                <p className="text-2xl font-bold">{data.realTimeMetrics.clicks_last_hour}</p>
                <p className="text-blue-100 text-xs">clicks</p>
              </div>
              <Zap className="w-8 h-8 text-blue-200" />
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Last 24 Hours</p>
                <p className="text-2xl font-bold">{data.realTimeMetrics.clicks_last_24h}</p>
                <p className="text-green-100 text-xs">clicks</p>
              </div>
              <MousePointer className="w-8 h-8 text-green-200" />
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Active Links Today</p>
                <p className="text-2xl font-bold">{data.realTimeMetrics.active_links_today}</p>
                <p className="text-purple-100 text-xs">links</p>
              </div>
              <Activity className="w-8 h-8 text-purple-200" />
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Conversion Rate</p>
                <p className="text-2xl font-bold">{data.realTimeMetrics.conversion_rate}%</p>
                <p className="text-orange-100 text-xs">rate</p>
              </div>
              <Target className="w-8 h-8 text-orange-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Top Link Performance */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performing Links</h3>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unique</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CTR</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.topLinkPerformance.slice(0, 5).map((link, index) => (
                  <tr key={link.short_code} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-sm">#{index + 1}</span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">/{link.short_code}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {link.title || 'Untitled'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatNumber(link.total_clicks)}</div>
                      <div className="text-sm text-gray-500">{link.avg_daily_clicks}/day avg</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatNumber(link.unique_clicks)}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{link.click_through_rate}%</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className={`flex items-center gap-1 ${getTrendColor(link.trend)}`}>
                        {getTrendIcon(link.trend)}
                        <span className="text-sm font-medium">{link.trend_percentage}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${link.performance_score}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{link.performance_score}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        
{/* Daily Sessions Chart */}
<div>
  <h3 className="text-lg font-medium text-gray-900 mb-4">
    Shorten URL (Last 7 Days)
  </h3>
  <div className="h-64">
    {data.dailySessions.length === 0 ? (
      <p className="text-gray-500 text-center mt-20">
        No session data available.
      </p>
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
  
{/* Device Type Usage */}
<div>
  <h3 className="text-lg font-medium text-gray-900 mb-4">Device Type Usage</h3>
  <div className="h-64">
    {data.deviceTypes.length === 0 ? (
      <p className="text-gray-500 text-center mt-20">No device data available.</p>
    ) : (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data.deviceTypes}
            dataKey="visits"
            nameKey="device"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={40}
            label={({ name, value, percent }) =>
              `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
            }
          >
            {data.deviceTypes.map((entry, index) => (
              <Cell key={`device-cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => `${value} visits`}
            labelFormatter={(label) => `Device: ${label}`}
          />
        </PieChart>
      </ResponsiveContainer>
    )}
  </div>
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

      {/* Conversion Funnel   --------
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Conversion Funnel</h3>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="space-y-4">
            {data.conversionFunnel.map((stage, index) => (
              <div key={stage.stage} className="flex items-center">
                <div className="w-32 text-sm font-medium text-gray-700">{stage.stage}</div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-6 relative">
                    <div 
                      className={`h-6 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                        index === 0 ? 'bg-blue-500' : 
                        index === 1 ? 'bg-green-500' : 
                        index === 2 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${stage.percentage}%` }}
                    >
                      {stage.percentage}%
                    </div>
                  </div>
                </div>
                <div className="w-20 text-right text-sm font-medium text-gray-900">
                  {formatNumber(stage.count)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      */}

{/* Key Metrics */}
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
  {/* Avg Session */}
  <div className="p-4 bg-blue-50 rounded-lg">
    <div className="flex items-center gap-2 mb-2">
      <Clock className="w-4 h-4 text-blue-600" />
      <span className="text-sm font-medium text-blue-600">Avg Session</span>
    </div>
    <p className="text-xl font-bold text-blue-900">
      {formatDuration(data.averageSessionDuration)}
    </p>
  </div>

  {/* Interactions/Day */}
  <div className="p-4 bg-green-50 rounded-lg">
    <div className="flex items-center gap-2 mb-2">
      <MousePointer className="w-4 h-4 text-green-600" />
      <span className="text-sm font-medium text-green-600">Interactions/Day</span>
    </div>
    <p className="text-xl font-bold text-green-900">
      {data.interactionFrequency}
    </p>
  </div>

  {/* Link Creation */}
  <div className="p-4 bg-purple-50 rounded-lg">
    <div className="flex items-center gap-2 mb-2">
      <Target className="w-4 h-4 text-purple-600" />
      <span className="text-sm font-medium text-purple-600">Link Creation</span>
    </div>
    <p className="text-xl font-bold text-purple-900">
      {data.completionRates.linkCreation}%
    </p>
  </div>

  {/* QR Generation */}
  <div className="p-4 bg-orange-50 rounded-lg">
    <div className="flex items-center gap-2 mb-2">
      <Target className="w-4 h-4 text-orange-600" />
      <span className="text-sm font-medium text-orange-600">QR Generation</span>
    </div>
    <p className="text-xl font-bold text-orange-900">
      {data.completionRates.qrGeneration}%
    </p>
  </div>
</div>

      {/* OS User Report */}
      <div className="mb-8">
        <OSUserReport data={data.osUserData} />
      </div>

      {/* Country User Report */}
      <div className="mb-8">
        <CountryUserReport data={data.countryUserData} />
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span>Data updates every 30 seconds • Last updated: {new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export default EngagementMetrics;