import React from 'react';
import { TrendingUp, Target, Award, BarChart3 } from 'lucide-react';

interface PerformanceIndicatorsProps {
  data: {
    successMetrics: {
      linkClickRate: number;
      qrScanRate: number;
      linkRetention: number;
    };
    progressTracking: {
      dailyGoal: number;
      weeklyGoal: number;
      monthlyGoal: number;
      currentDaily: number;
      currentWeekly: number;
      currentMonthly: number;
    };
    achievements: Array<{
      title: string;
      description: string;
      achieved: boolean;
      progress: number;
    }>;
    platformComparison: {
      userAverage: number;
      platformAverage: number;
      percentile: number;
    };
  };
}

const PerformanceIndicators: React.FC<PerformanceIndicatorsProps> = ({ data }) => {
  const ProgressBar: React.FC<{ current: number; goal: number; label: string }> = ({ current, goal, label }) => {
    const percentage = Math.min((current / goal) * 100, 100);
    
    return (
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-gray-700">{label}</span>
          <span className="text-gray-600">{current}/{goal}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-1">{percentage.toFixed(1)}% complete</div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <TrendingUp className="w-6 h-6 text-purple-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Performance Indicators</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Success Metrics */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Success Metrics</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-700">Link Click Rate</span>
                <span className="text-lg font-bold text-green-900">{data.successMetrics.linkClickRate}%</span>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700">QR Scan Rate</span>
                <span className="text-lg font-bold text-blue-900">{data.successMetrics.qrScanRate}%</span>
              </div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-purple-700">Link Retention</span>
                <span className="text-lg font-bold text-purple-900">{data.successMetrics.linkRetention}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Tracking */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Goal Progress</h3>
          <div className="space-y-4">
            <ProgressBar 
              current={data.progressTracking.currentDaily} 
              goal={data.progressTracking.dailyGoal} 
              label="Daily Links" 
            />
            <ProgressBar 
              current={data.progressTracking.currentWeekly} 
              goal={data.progressTracking.weeklyGoal} 
              label="Weekly Links" 
            />
            <ProgressBar 
              current={data.progressTracking.currentMonthly} 
              goal={data.progressTracking.monthlyGoal} 
              label="Monthly Links" 
            />
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Achievements</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {data.achievements.map((achievement, index) => (
            <div key={index} className={`p-4 rounded-lg border-2 ${achievement.achieved ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${achievement.achieved ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <Award className={`w-5 h-5 ${achievement.achieved ? 'text-green-600' : 'text-gray-400'}`} />
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${achievement.achieved ? 'text-green-900' : 'text-gray-700'}`}>
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                  {!achievement.achieved && (
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div 
                        className="bg-blue-600 h-1 rounded-full"
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Comparison */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-medium text-blue-900">Platform Comparison</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-900">{data.platformComparison.userAverage}</p>
            <p className="text-sm text-blue-700">Your Average</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-900">{data.platformComparison.platformAverage}</p>
            <p className="text-sm text-blue-700">Platform Average</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-900">{data.platformComparison.percentile}th</p>
            <p className="text-sm text-blue-700">Percentile</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceIndicators;