import React from 'react';
import { HelpCircle, Link2, QrCode, BarChart3, Share2, Zap, CheckCircle, Copy, Download, Eye } from 'lucide-react';

const HowItWorksPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* SEO Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-600 rounded-xl">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">How to Create Short URLs - Complete Step-by-Step Guide</h1>
                <p className="text-gray-600">Learn how to shorten URLs, generate QR codes, and track link performance in 4 simple steps</p>
              </div>
            </div>
            
            {/* SEO Meta Description Equivalent */}
            <div className="bg-purple-50 rounded-lg p-4 mb-6">
              <p className="text-purple-800 text-sm">
                <strong>URL Shortening Made Simple:</strong> Create professional short links in under 30 seconds. 
                No registration required. Includes automatic QR code generation, real-time analytics, and 
                custom branding options. Perfect for social media, email marketing, and print campaigns.
              </p>
            </div>
          </div>

          {/* Hero Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Create Professional Short URLs Fast</h2>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              Shrtnly makes URL shortening simple. Create professional short links in under 30 seconds.
            </p>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              Perfect for social media managers, marketers, and business owners. Get professional tools without the complexity.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Create branded links, get QR codes, and track performance. No registration needed.
            </p>
            
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Why 10,000+ Users Choose Shrtnly</h3>
              </div>
              <div className="grid gap-3 md:grid-cols-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Instant link creation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Automatic QR codes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Real-time analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">99.9% uptime guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Benefits Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Transform Long URLs into Marketing Assets</h2>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share2 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Boost Social Media Engagement</h3>
                <p className="text-gray-600">
                  Clean, professional short links increase click-through rates by up to 39% on social media platforms. 
                  Perfect for Twitter, Instagram, LinkedIn, and TikTok marketing campaigns.
                </p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Marketing Performance</h3>
                <p className="text-gray-600">
                  Monitor every click with detailed analytics including geographic data, device types, and referral sources. 
                  Optimize campaigns based on real performance data and user behavior insights.
                </p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Bridge Offline & Online</h3>
                <p className="text-gray-600">
                  Automatically generated QR codes connect print materials to digital experiences. Perfect for 
                  business cards, flyers, posters, and offline marketing campaigns with trackable results.
                </p>
              </div>
            </div>
          </div>
          {/* Step-by-Step Process */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Complete URL Shortening Process - 4 Easy Steps</h2>
            
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Link2 className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Step 1: Enter Your Long URL</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Copy and paste any long URL into our professional URL shortening tool. Our platform supports 
                    all types of web addresses including e-commerce product pages, blog articles, landing pages, 
                    social media posts, and file downloads. Supports URLs up to 2,048 characters with HTTP, HTTPS, 
                    and FTP protocols for maximum compatibility.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Supported Content:</strong> E-commerce product pages • Blog articles and content • 
                      Landing pages and forms • Social media posts • File downloads and documents • 
                      Video and multimedia content • Email campaign links
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Zap className="w-6 h-6 text-green-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Step 2: Customize & Brand Your Link</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Transform generic short links into powerful marketing assets with custom branding, memorable aliases, 
                    and campaign tracking parameters. Professional customization options improve click-through rates 
                    by up to 39% while building brand trust and recognition. Add UTM parameters for comprehensive 
                    campaign tracking and attribution across all marketing channels.
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Professional Features:</strong> Custom branded aliases • Campaign tracking codes • 
                      UTM parameter integration • Expiration date scheduling • Password protection • 
                      Geographic targeting • A/B testing support
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <QrCode className="w-6 h-6 text-purple-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Step 3: Receive Short Link & QR Code</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Instantly receive your professional shortened URL and automatically generated high-resolution QR code. 
                    Perfect for omnichannel marketing campaigns including social media, email marketing, print materials, 
                    business cards, presentations, and offline advertising. Download QR codes in multiple formats 
                    including PNG, SVG, and PDF for any marketing application.
                  </p>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-purple-800">
                      <strong>QR Code Features:</strong> High-resolution downloads (up to 2000px) • Multiple formats 
                      (PNG, SVG, PDF) • Customizable designs and colors • Vector formats for scaling • 
                      Print-ready quality • Batch QR generation
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <BarChart3 className="w-6 h-6 text-orange-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Step 4: Monitor & Optimize Performance</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Access comprehensive analytics dashboard with real-time performance monitoring including click tracking, 
                    geographic distribution, device analytics, referral source attribution, and conversion metrics. 
                    Use actionable insights to optimize campaigns, improve targeting, and maximize marketing ROI 
                    with data-driven decision making and automated performance alerts.
                  </p>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-sm text-orange-800">
                      <strong>Analytics Dashboard:</strong> Real-time click tracking • Geographic heatmaps and distribution • 
                      Device, browser, and OS analytics • Referral source attribution • Conversion funnel analysis • 
                      Time-based performance trends • Custom reporting and exports
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Features */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Advanced URL Shortening Capabilities</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Professional Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-900">Bulk URL Shortening</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-900">API Integration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-900">Custom Domain Support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-900">Link Expiration Control</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-900">Password Protection</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Analytics & Tracking</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-900">Geographic Targeting</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-900">UTM Parameter Support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-900">Conversion Tracking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-900">Team Collaboration Tools</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-900">White-label Reporting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Perfect for Every Marketing Channel</h2>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center p-4">
                <Share2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Social Media Marketing</h3>
                <p className="text-gray-600">
                  Share clean, professional links on Twitter, Facebook, Instagram, LinkedIn, and TikTok 
                  while tracking engagement and optimizing performance across platforms.
                </p>
              </div>
              
              <div className="text-center p-4">
                <BarChart3 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Marketing Campaigns</h3>
                <p className="text-gray-600">
                  Create trackable links for email newsletters, promotional campaigns, and automated sequences 
                  to measure click-through rates and optimize your email marketing strategy.
                </p>
              </div>
              
              <div className="text-center p-4">
                <QrCode className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Print & Offline Marketing</h3>
                <p className="text-gray-600">
                  Use QR codes on business cards, flyers, posters, and advertisements to bridge 
                  offline marketing with digital tracking and comprehensive analytics.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick Actions Guide</h2>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <Copy className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Copy Link</h4>
                <p className="text-sm text-gray-600">One-click copying to clipboard for instant sharing</p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <Download className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Download QR</h4>
                <p className="text-sm text-gray-600">High-resolution QR codes in multiple formats</p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg text-center">
                <Eye className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">View Analytics</h4>
                <p className="text-sm text-gray-600">Detailed performance metrics and insights</p>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg text-center">
                <Share2 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Share Directly</h4>
                <p className="text-sm text-gray-600">Native sharing to social platforms and apps</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-semibold mb-4">Ready to Start Shortening URLs?</h2>
            <p className="text-lg mb-6 text-blue-100">
              Join thousands of marketers, businesses, and content creators who trust Shrtnly 
              for their URL shortening and analytics needs
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors"
            >
              Create Your First Short Link Now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HowItWorksPage;