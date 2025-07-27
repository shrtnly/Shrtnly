import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { Calendar, TrendingUp, TrendingDown, Activity, Clock, MousePointer } from 'lucide-react';

interface HistoricalDataProps {
  data: {
    activityTrends: Array<{
      date: string;
      links: number;
      clicks: number;
      qrScans: number;
    }>;
    growthPatterns: {
      trend: 'up' | 'down' | 'stable';
      percentage: number;
      period: string;
    };
    seasonalData: Array<{
      month: string;
      activity: number;
      year: number;
    }>;
    yearOverYear: {
      currentYear: number;
      previousYear: number;
      growth: number;
    };
    clickTrends: Array<{
      date: string;
      total_clicks: number;
      unique_clicks: number;
      returning_clicks: number;
    }>;
    hourlyDistribution: Array<{
      hour: number;
      clicks: number;
      percentage: number;
    }>;
  };
}

const HistoricalData: React.FC<HistoricalDataProps> = ({ data }) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600 bg-green-100';
      case 'down': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-100 rounded-lg">
          <Calendar className="w-6 h-6 text-orange-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Historical Data</h2>
      </div>

      {/* Activity Trends */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Click Analysis Trends</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.clickTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value, name) => [
                  value, 
                  name === 'total_clicks' ? 'Total Clicks' : 
                  name === 'unique_clicks' ? 'Unique Clicks' : 'Returning Clicks'
                ]}
              />
              <Line type="monotone" dataKey="total_clicks" stroke="#3B82F6" strokeWidth={3} name="Total Clicks" />
              <Line type="monotone" dataKey="unique_clicks" stroke="#10B981" strokeWidth={2} name="Unique Clicks" />
              <Line type="monotone" dataKey="returning_clicks" stroke="#8B5CF6" strokeWidth={2} name="Returning Clicks" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hourly Distribution */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Peak Traffic Hours</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.hourlyDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="hour" 
                tickFormatter={(value) => `${value}:00`}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(value) => `${value}:00 - ${value + 1}:00`}
                formatter={(value, name) => [value, name === 'clicks' ? 'Clicks' : 'Percentage']}
              />
              <Bar dataKey="clicks" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <div className="text-sm font-medium text-blue-900">Peak Hour</div>
            <div className="text-lg font-bold text-blue-600">
              {data.hourlyDistribution.reduce((max, hour) => hour.clicks > max.clicks ? hour : max, data.hourlyDistribution[0]).hour}:00
            </div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <MousePointer className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <div className="text-sm font-medium text-green-900">Peak Clicks</div>
            <div className="text-lg font-bold text-green-600">
              {Math.max(...data.hourlyDistribution.map(h => h.clicks))}
            </div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <Activity className="w-5 h-5 text-purple-600 mx-auto mb-1" />
            <div className="text-sm font-medium text-purple-900">Active Hours</div>
            <div className="text-lg font-bold text-purple-600">
              {data.hourlyDistribution.filter(h => h.clicks > 0).length}
            </div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-orange-600 mx-auto mb-1" />
            <div className="text-sm font-medium text-orange-900">Avg/Hour</div>
            <div className="text-lg font-bold text-orange-600">
              {Math.round(data.hourlyDistribution.reduce((sum, h) => sum + h.clicks, 0) / 24)}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Overall Activity Trends</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.activityTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value, name) => [value, name === 'links' ? 'Links Created' : name === 'clicks' ? 'Clicks' : 'QR Scans']}
              />
              <Line type="monotone" dataKey="links" stroke="#3B82F6" strokeWidth={2} name="Links Created" />
              <Line type="monotone" dataKey="clicks" stroke="#10B981" strokeWidth={2} name="Clicks" />
              <Line type="monotone" dataKey="qrScans" stroke="#8B5CF6" strokeWidth={2} name="QR Scans" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Growth Patterns */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Growth Analysis</h3>
          <div className="p-6 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              {getTrendIcon(data.growthPatterns.trend)}
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTrendColor(data.growthPatterns.trend)}`}>
                {data.growthPatterns.trend.toUpperCase()}
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-gray-900">
                {data.growthPatterns.percentage > 0 ? '+' : ''}{data.growthPatterns.percentage}%
              </p>
              <p className="text-sm text-gray-600">
                Growth over {data.growthPatterns.period}
              </p>
            </div>
          </div>
        </div>

        {/* Year over Year */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Year-over-Year Comparison</h3>
          <div className="p-6 bg-gray-50 rounded-lg">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{data.yearOverYear.currentYear}</p>
                <p className="text-sm text-gray-600">This Year</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-600">{data.yearOverYear.previousYear}</p>
                <p className="text-sm text-gray-600">Last Year</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className={`text-lg font-semibold ${data.yearOverYear.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {data.yearOverYear.growth >= 0 ? '+' : ''}{data.yearOverYear.growth}% Growth
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Seasonal Variations
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Seasonal Activity Patterns</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.seasonalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} activities`, 'Activity']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Area type="monotone" dataKey="activity" stroke="#F59E0B" fill="#FEF3C7" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

       */}
      
      {/* Interactive Data Points */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Advanced Analytics Insights</h4>
        <div className="grid gap-2 md:grid-cols-4">
          <div className="p-3 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-sm font-medium text-gray-900">Peak Activity Day</div>
            <div className="text-xs text-gray-600">
              {data.activityTrends.reduce((max, day) => 
                (day.links + day.clicks + day.qrScans) > (max.links + max.clicks + max.qrScans) ? day : max
              ).date}
            </div>
          </div>
          <div className="p-3 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-sm font-medium text-gray-900">Total Activities</div>
            <div className="text-xs text-gray-600">
              {data.activityTrends.reduce((sum, day) => sum + day.links + day.clicks + day.qrScans, 0)} events
            </div>
          </div>
          <div className="p-3 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-sm font-medium text-gray-900">Click Conversion</div>
            <div className="text-xs text-gray-600">
              {data.clickTrends.length > 0 ? 
                Math.round((data.clickTrends.reduce((sum, day) => sum + day.unique_clicks, 0) / 
                data.clickTrends.reduce((sum, day) => sum + day.total_clicks, 0)) * 100) : 0}% unique
            </div>
          </div>
          <div className="p-3 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-sm font-medium text-gray-900">Best Performance</div>
            <div className="text-xs text-gray-600">
              {data.hourlyDistribution.reduce((max, hour) => hour.clicks > max.clicks ? hour : max, data.hourlyDistribution[0]).hour}:00 - {data.hourlyDistribution.reduce((max, hour) => hour.clicks > max.clicks ? hour : max, data.hourlyDistribution[0]).hour + 1}:00
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalData;