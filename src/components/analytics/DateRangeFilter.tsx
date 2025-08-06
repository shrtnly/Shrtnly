import React, { useState } from 'react';
import { Calendar, Filter, Download, Link2, RefreshCw } from 'lucide-react';

interface DateRangeFilterProps {
  onDateRangeChange: (startDate: string, endDate: string) => void;
  onSelectedLinksChange: (selectedLinks: string[]) => void;
  onExportCSV: () => void;
  onExportPDF: () => void;
  onRefresh: () => void;
  availableLinks: Array<{ short_code: string; title: string | null; original_url: string }>;
  selectedLinks: string[];
  isLoading?: boolean;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ 
  onDateRangeChange, 
  onSelectedLinksChange,
  onExportCSV, 
  onExportPDF,
  onRefresh,
  availableLinks,
  selectedLinks,
  isLoading = false
}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [quickFilter, setQuickFilter] = useState('all');
  const [showLinkDropdown, setShowLinkDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  const quickFilters = [
    { value: 'custom', label: 'Custom Range' },
    { value: 'today', label: 'Today' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 3 Months' },
    { value: '6m', label: 'Last 6 Months' },
    { value: '1y', label: 'Last Year' },
    { value: 'all', label: 'All Time' },
  ];

  const handleQuickFilter = (value: string) => {
    setQuickFilter(value);
    setShowDateDropdown(false);
    
    if (value !== 'custom') {
      const endDate = new Date();
      const startDate = new Date();
      
      switch (value) {
        case 'today':
          startDate.setHours(0, 0, 0, 0);
          endDate.setHours(23, 59, 59, 999);
          break;
        case '7d':
          startDate.setDate(endDate.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(endDate.getDate() - 30);
          break;
        case '90d':
          startDate.setDate(endDate.getDate() - 90);
          break;
        case '6m':
          startDate.setMonth(endDate.getMonth() - 6);
          break;
        case '1y':
          startDate.setFullYear(endDate.getFullYear() - 1);
          break;
        case 'all':
          setStartDate('');
          setEndDate('');
          onDateRangeChange('', '');
          return;
      }
      
      const startDateStr = startDate.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];
      
      setStartDate(startDateStr);
      setEndDate(endDateStr);
      onDateRangeChange(startDateStr, endDateStr);
    }
  };

  const handleLinkToggle = (shortCode: string) => {
    const newSelectedLinks = selectedLinks.includes(shortCode)
      ? selectedLinks.filter(code => code !== shortCode)
      : [...selectedLinks, shortCode];
    
    onSelectedLinksChange(newSelectedLinks);
  };

  const handleSelectAllLinks = () => {
    if (selectedLinks.length === availableLinks.length) {
      onSelectedLinksChange([]);
    } else {
      onSelectedLinksChange(availableLinks.map(link => link.short_code));
    }
  };

  const handleCustomDateChange = () => {
    if (startDate && endDate) {
      onDateRangeChange(startDate, endDate);
    }
  };

  const getCurrentFilterLabel = () => {
    const filter = quickFilters.find(f => f.value === quickFilter);
    return filter ? filter.label : 'Select Range';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="space-y-6">
        {/* Header with Refresh Button */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Filter className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Analytics Filters</h3>
          </div>

          <div className="flex items-center gap-3">
            {/* Refresh Button */}
<button
  type="button"  // 🔧 This line prevents unwanted page reload
  onClick={onRefresh}
  disabled={isLoading}
  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
>
  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
  {isLoading ? 'Refreshing...' : 'Refresh'}
</button>

            {/* Export Controls */}
            <button
              onClick={onExportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors text-sm"
            >
              <Download size={16} />
              CSV
            </button>
            <button
              onClick={onExportPDF}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors text-sm"
            >
              <Download size={16} />
              PDF
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Date Range Dropdown */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <div className="relative">
              <button
                onClick={() => setShowDateDropdown(!showDateDropdown)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900">{getCurrentFilterLabel()}</span>
                </div>
                <svg className={`w-4 h-4 text-gray-500 transition-transform ${showDateDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showDateDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-64 overflow-y-auto">
                  {quickFilters.map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => handleQuickFilter(filter.value)}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                        quickFilter === filter.value ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-900'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Link Filter Dropdown */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Links ({selectedLinks.length} of {availableLinks.length} selected)
            </label>
            <div className="relative">
              <button
                onClick={() => setShowLinkDropdown(!showLinkDropdown)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900">
                    {selectedLinks.length === 0 ? 'All Links' : 
                     selectedLinks.length === 1 ? '1 Link Selected' : 
                     `${selectedLinks.length} Links Selected`}
                  </span>
                </div>
                <svg className={`w-4 h-4 text-gray-500 transition-transform ${showLinkDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showLinkDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-64 overflow-y-auto">
                  <div className="p-3 border-b border-gray-200 bg-gray-50">
                    <button
                      onClick={handleSelectAllLinks}
                      className="w-full text-left px-2 py-1 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
                    >
                      {selectedLinks.length === availableLinks.length ? 'Deselect All' : 'Select All'}
                    </button>
                  </div>
                  <div className="p-2">
                    {availableLinks.map((link) => (
                      <label
                        key={link.short_code}
                        className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedLinks.includes(link.short_code)}
                          onChange={() => handleLinkToggle(link.short_code)}
                          className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-gray-900 truncate">
                            /{link.short_code}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {link.title || 'Untitled'}
                          </div>
                          <div className="text-xs text-gray-400 truncate">
                            {link.original_url}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Custom Date Range */}
        {quickFilter === 'custom' && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1">
                <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  id="start-date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  id="end-date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                onClick={handleCustomDateChange}
                disabled={!startDate || !endDate}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateRangeFilter;