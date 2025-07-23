import { useState, useEffect } from 'react';

// Mock data generator for demonstration
const generateMockData = () => {
  const now = new Date();
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toISOString().split('T')[0],
      links: Math.floor(Math.random() * 20) + 5,
      clicks: Math.floor(Math.random() * 100) + 20,
      qrScans: Math.floor(Math.random() * 30) + 5,
    };
  });

  const last7Days = last30Days.slice(-7).map(day => ({
    date: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
    sessions: Math.floor(Math.random() * 10) + 2,
  }));

  return {
    userData: {
      totalTimeSpent: 1247, // minutes
      accountCreated: '2024-01-15',
      lastLogin: new Date().toISOString(),
      subscriptionStatus: 'premium' as const,
      activityLevel: 'high' as const,
      totalLinks: 156,
      totalClicks: 2847,
    },
    engagementData: {
      dailySessions: last7Days,
      averageSessionDuration: 23, // minutes
      interactionFrequency: 15,
      featureUsage: [
        { feature: 'Link Creation', usage: 45, color: '#3B82F6' },
        { feature: 'QR Generation', usage: 30, color: '#10B981' },
        { feature: 'Analytics View', usage: 15, color: '#8B5CF6' },
        { feature: 'Link Sharing', usage: 10, color: '#F59E0B' },
      ],
      completionRates: {
        linkCreation: 92,
        qrGeneration: 78,
        linkSharing: 65,
      },
    },
    performanceData: {
      successMetrics: {
        linkClickRate: 87.5,
        qrScanRate: 23.4,
        linkRetention: 94.2,
      },
      progressTracking: {
        dailyGoal: 5,
        weeklyGoal: 25,
        monthlyGoal: 100,
        currentDaily: 3,
        currentWeekly: 18,
        currentMonthly: 67,
      },
      achievements: [
        {
          title: 'Link Master',
          description: 'Created 100+ links',
          achieved: true,
          progress: 100,
        },
        {
          title: 'QR Enthusiast',
          description: 'Generated 50 QR codes',
          achieved: false,
          progress: 76,
        },
        {
          title: 'Viral Creator',
          description: 'Get 1000+ total clicks',
          achieved: true,
          progress: 100,
        },
        {
          title: 'Consistency King',
          description: 'Create links for 30 consecutive days',
          achieved: false,
          progress: 43,
        },
      ],
      platformComparison: {
        userAverage: 18.7,
        platformAverage: 12.3,
        percentile: 85,
      },
    },
    historicalData: {
      activityTrends: last30Days,
      growthPatterns: {
        trend: 'up' as const,
        percentage: 23.5,
        period: 'last month',
      },
      seasonalData: [
        { month: 'Jan', activity: 45, year: 2024 },
        { month: 'Feb', activity: 52, year: 2024 },
        { month: 'Mar', activity: 48, year: 2024 },
        { month: 'Apr', activity: 61, year: 2024 },
        { month: 'May', activity: 55, year: 2024 },
        { month: 'Jun', activity: 67, year: 2024 },
        { month: 'Jul', activity: 73, year: 2024 },
        { month: 'Aug', activity: 69, year: 2024 },
        { month: 'Sep', activity: 58, year: 2024 },
        { month: 'Oct', activity: 64, year: 2024 },
        { month: 'Nov', activity: 71, year: 2024 },
        { month: 'Dec', activity: 78, year: 2024 },
      ],
      yearOverYear: {
        currentYear: 847,
        previousYear: 623,
        growth: 36,
      },
    },
  };
};

export const useAnalyticsData = () => {
  const [data, setData] = useState(generateMockData());
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const updateDateRange = (startDate: string, endDate: string) => {
    setLoading(true);
    setDateRange({ start: startDate, end: endDate });
    
    // Simulate API call
    setTimeout(() => {
      setData(generateMockData());
      setLoading(false);
    }, 1000);
  };

  const exportToCSV = () => {
    const csvData = data.historicalData.activityTrends.map(item => 
      `${item.date},${item.links},${item.clicks},${item.qrScans}`
    ).join('\n');
    
    const header = 'Date,Links Created,Clicks,QR Scans\n';
    const csv = header + csvData;
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToPDF = async () => {
    // This would typically use a library like jsPDF with html2canvas
    // For now, we'll create a simple text-based PDF
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Analytics Report', 20, 30);
    
    doc.setFontSize(12);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 50);
    doc.text(`Total Links: ${data.userData.totalLinks}`, 20, 70);
    doc.text(`Total Clicks: ${data.userData.totalClicks}`, 20, 90);
    doc.text(`Activity Level: ${data.userData.activityLevel}`, 20, 110);
    
    doc.save(`analytics-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return {
    data,
    loading,
    updateDateRange,
    exportToCSV,
    exportToPDF,
  };
};