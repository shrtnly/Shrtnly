import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Globe, MapPin, Users } from 'lucide-react';

interface CountryUserReportProps {
  data: Array<{
    country: string;
    users: number;
    percentage: number;
    color?: string;
  }>;
}

const CountryUserReport: React.FC<CountryUserReportProps> = ({ data }) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  const getCountryFlag = (countryName: string): string => {
    const flagMap: Record<string, string> = {
      'United States': '🇺🇸',
      'USA': '🇺🇸',
      'US': '🇺🇸',
      'Canada': '🇨🇦',
      'United Kingdom': '🇬🇧',
      'UK': '🇬🇧',
      'Britain': '🇬🇧',
      'England': '🇬🇧',
      'Germany': '🇩🇪',
      'Deutschland': '🇩🇪',
      'France': '🇫🇷',
      'Japan': '🇯🇵',
      'Australia': '🇦🇺',
      'Brazil': '🇧🇷',
      'Brasil': '🇧🇷',
      'India': '🇮🇳',
      'China': '🇨🇳',
      'Russia': '🇷🇺',
      'Italy': '🇮🇹',
      'Italia': '🇮🇹',
      'Spain': '🇪🇸',
      'España': '🇪🇸',
      'Netherlands': '🇳🇱',
      'Nederland': '🇳🇱',
      'Sweden': '🇸🇪',
      'Norway': '🇳🇴',
      'Denmark': '🇩🇰',
      'Finland': '🇫🇮',
      'South Korea': '🇰🇷',
      'Korea': '🇰🇷',
      'Mexico': '🇲🇽',
      'Argentina': '🇦🇷',
      'Chile': '🇨🇱',
      'Colombia': '🇨🇴',
      'Peru': '🇵🇪',
      'Venezuela': '🇻🇪',
      'South Africa': '🇿🇦',
      'Egypt': '🇪🇬',
      'Nigeria': '🇳🇬',
      'Kenya': '🇰🇪',
      'Morocco': '🇲🇦',
      'Turkey': '🇹🇷',
      'Poland': '🇵🇱',
      'Ukraine': '🇺🇦',
      'Thailand': '🇹🇭',
      'Vietnam': '🇻🇳',
      'Philippines': '🇵🇭',
      'Indonesia': '🇮🇩',
      'Malaysia': '🇲🇾',
      'Singapore': '🇸🇬',
      'Pakistan': '🇵🇰',
      'Bangladesh': '🇧🇩',
      'Sri Lanka': '🇱🇰',
      'Israel': '🇮🇱',
      'Saudi Arabia': '🇸🇦',
      'Unknown': '🌍'
    };
    return flagMap[countryName] || '🌍';
  };

  // Generate colors for countries if not provided
  const dataWithColors = data.map((item, index) => ({
    ...item,
    color: item.color || `hsl(${(index * 137.5) % 360}, 70%, 50%)`
  }));

  const totalUsers = data.reduce((sum, item) => sum + item.users, 0);
  const topCountries = data.slice(0, 10); // Show top 10 countries

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <Globe className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Geographic Visit Distribution</h3>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Country Distribution Pie Chart */}
        <div>
          <div className="h-0">
            {topCountries.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                No geographic data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topCountries}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    dataKey="users"
                    nameKey="country"
                    label={({ country, percentage }) => 
                      percentage > 5 ? `${country}: ${percentage}%` : ''
                    }
                  >
                    {topCountries.map((entry, index) => (
                      <Cell key={`country-cell-${index}`} fill={dataWithColors[index]?.color || '#8884d8'} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${formatNumber(value)} users`, 'Users']}
                    labelFormatter={(label) => `Country: ${label}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Country Usage Bar Chart */}
        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-4">User Count by Country</h4>
          <div className="h-64">
            {topCountries.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                No geographic data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topCountries}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="country" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval={0}
                  />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => [`${formatNumber(value)} users`, 'Users']}
                    labelFormatter={(label) => `Country: ${label}`}
                  />
                  <Bar dataKey="users" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Country Statistics List */}
      <div className="mt-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Country Rankings</h4>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {data.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No country data available.</p>
          ) : (
            data.map((countryData, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium text-gray-500 w-8">#{index + 1}</div>
                  <div className="text-2xl">{getCountryFlag(countryData.country)}</div>
                  <div>
                    <div className="font-medium text-gray-900">{countryData.country}</div>
                    <div className="text-sm text-gray-600">{countryData.percentage}% of total users</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">{formatNumber(countryData.users)}</div>
                  <div className="text-sm text-gray-500">users</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Geographic Summary */}
      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-900">{formatNumber(totalUsers)}</div>
            <div className="text-sm text-green-700">Total Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-900">{data.length}</div>
            <div className="text-sm text-green-700">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-900">
              {data.length > 0 ? data[0].country : 'N/A'}
            </div>
            <div className="text-sm text-green-700">Top Country</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-900">
              {data.length > 0 ? `${data[0].percentage}%` : '0%'}
            </div>
            <div className="text-sm text-green-700">Market Share</div>
          </div>
        </div>
      </div>

      {/* Global Reach Indicator */}
      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
        <MapPin className="w-4 h-4" />
        <span>Global reach across {data.length} {data.length === 1 ? 'country' : 'countries'}</span>
      </div>
    </div>
  );
};

export default CountryUserReport;