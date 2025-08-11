import React from 'react';
import { BarChart3, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import UserOverview from '../components/analytics/UserOverview';
import EngagementMetrics from '../components/analytics/EngagementMetrics';
import PerformanceIndicators from '../components/analytics/PerformanceIndicators';
import HistoricalData from '../components/analytics/HistoricalData';
import DateRangeFilter from '../components/analytics/DateRangeFilter';
import { useRealAnalyticsData } from '../hooks/useRealAnalyticsData';
import AuthModal from '../components/auth/AuthModal';
import { Helmet } from "react-helmet-async";

const AnalyticsPage: React.FC = () => {
  const { user } = useAuth();
  const { data, loading, updateDateRange, updateSelectedLinks, exportToCSV, exportToPDF } = useRealAnalyticsData();
  const [authModalOpen, setAuthModalOpen] = React.useState(false);

  // Show auth prompt for non-authenticated users
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">
              Sign in to view your personalized analytics and track your link performance.
            </p>
          </div>
          
          <button
            onClick={() => setAuthModalOpen(true)}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Sign In to View Analytics
          </button>
          
          <AuthModal
            isOpen={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
          />
        </div>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No analytics data available.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-600 rounded-xl">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="text-gray-600">Comprehensive insights into your link performance</p>
              </div>
            </div>
          </div>

          {/* Date Range Filter */}
          <DateRangeFilter
            onDateRangeChange={updateDateRange}
            onSelectedLinksChange={updateSelectedLinks}
            onRefresh={data?.refetch || (() => {})}
            onExportCSV={exportToCSV}
            onExportPDF={exportToPDF}
            isLoading={loading}
            availableLinks={data?.rawData.links.map(link => ({
              short_code: link.short_code,
              title: link.title,
              original_url: link.original_url
            })) || []}
            selectedLinks={data?.filterOptions.selectedLinks || []}
          />

          {/* Dashboard Content */}
          <div className="space-y-8">
            {/* User Overview */}
            <UserOverview userData={data.userData} />

            {/* Engagement Metrics */}
            <EngagementMetrics data={data.engagementData} />

            {/* Performance Indicators */}
            <PerformanceIndicators data={data.performanceData} />

            {/* Historical Data */}
            <HistoricalData data={data.historicalData} />
          </div>

          {/* Real-time Update Notice */}
          <div className="mt-8 bg-blue-50 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-900">Live Data</span>
            </div>
            <p className="text-blue-700 text-sm">
              All metrics are updated in real-time as you create and share links
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsPage;