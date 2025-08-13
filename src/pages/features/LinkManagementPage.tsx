import React from 'react';
import { Settings, Link2, Edit3, Trash2, Eye, BarChart3, Calendar, Shield, Folder, Tag, Search, Download } from 'lucide-react';

const LinkManagementPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="container mx-auto px-0 py-0">
        <div className="max-w-4xl mx-auto">
          {/* SEO Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-600 rounded-xl">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Advanced URL Link Management - Organize & Control Your Short Links</h1>
                <p className="text-gray-600">Professional link management tools for businesses, marketers, and content creators</p>
              </div>
            </div>
            
            {/* SEO Meta Description Equivalent */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <p className="text-blue-800 text-sm">
                <strong>Professional URL Management:</strong> Organize thousands of shortened links with folders, 
                custom tags, bulk operations, and advanced analytics. Perfect for digital marketing teams, 
                content creators, and businesses managing multiple campaigns across platforms.
              </p>
            </div>
          </div>

          {/* Hero Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Enterprise-Grade URL Link Management System</h2>
            <p className="text-lg text-gray-600 mb-6">
              Transform your URL shortening workflow with Shrtnly's professional link management platform. 
              Designed for marketing teams, agencies, and businesses that need to organize, track, and optimize 
              hundreds or thousands of shortened URLs. Our enterprise-grade tools provide complete control over 
              your link portfolio with advanced organization, editing capabilities, and team collaboration features.
            </p>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-4 bg-blue-50 rounded-lg">
                <Edit3 className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Dynamic Link Editing</h3>
                <p className="text-gray-600">Update destination URLs, campaign parameters, and metadata without changing 
                short codes. Maintain link integrity across all marketing channels while adapting to campaign changes.</p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <Folder className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Intelligent Organization</h3>
                <p className="text-gray-600">Create hierarchical folder structures, apply custom tags, and use advanced 
                search filters. Find any link instantly from thousands of URLs with smart categorization.</p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <Calendar className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Automated Lifecycle Management</h3>
                <p className="text-gray-600">Schedule automatic expiration for promotional campaigns, set renewal reminders, 
                and manage link lifecycles with precision timing for maximum campaign effectiveness.</p>
              </div>
            </div>
          </div>

          {/* SEO Content Block */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Why Professional Link Management Matters</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Scale Your Marketing Operations</h3>
                <p className="text-gray-600 mb-4">
                  As your business grows, so does your need for organized link management. Professional marketers 
                  and agencies manage hundreds of campaigns simultaneously across multiple platforms. Without proper 
                  organization, finding and updating specific links becomes time-consuming and error-prone.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Manage 10,000+ links efficiently</li>
                  <li>• Reduce campaign setup time by 75%</li>
                  <li>• Eliminate broken link incidents</li>
                  <li>• Improve team collaboration</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Maintain Brand Consistency</h3>
                <p className="text-gray-600 mb-4">
                  Consistent, branded short links build trust and improve click-through rates. Our link management 
                  system ensures all your shortened URLs follow brand guidelines and maintain professional appearance 
                  across all marketing channels and customer touchpoints.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Branded short code templates</li>
                  <li>• Consistent naming conventions</li>
                  <li>• Brand compliance monitoring</li>
                  <li>• Professional link appearance</li>
                </ul>
              </div>
            </div>
          </div>
          {/* Key Features */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Complete Link Management Feature Set</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Link2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Branded Short URLs</h3>
                  <p className="text-gray-600">
                    Create memorable, branded short URLs that reinforce your business identity and build customer trust. 
                    Custom aliases like "yoursite.com/summer-sale" perform 39% better than random character links, 
                    improving click-through rates and brand recognition across all digital marketing channels.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprehensive Analytics Integration</h3>
                  <p className="text-gray-600">
                    Access detailed performance analytics for every shortened URL including click tracking, geographic 
                    distribution, device analytics, and referral source attribution. Integrate with Google Analytics, 
                    Facebook Pixel, and other marketing tools for complete campaign visibility and ROI measurement.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Enterprise Security & Access Control</h3>
                  <p className="text-gray-600">
                    Implement enterprise-grade security with password protection, IP whitelisting, geographic restrictions, 
                    and device-specific access controls. Protect sensitive content, prevent link abuse, and ensure 
                    compliance with corporate security policies and data protection regulations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Download className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Bulk Operations & Enterprise Integration</h3>
                  <p className="text-gray-600">
                    Streamline operations with bulk editing, batch creation, and mass export capabilities. Import 
                    existing link libraries from other platforms, export comprehensive analytics for stakeholder 
                    reporting, and integrate with existing marketing automation and CRM systems via API.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Tools */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Professional Management Tools</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Tag className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Smart Tagging System</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Organize links with custom tags and categories. Filter by campaign, platform, or content type 
                  for instant access to relevant links.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Custom tag creation</li>
                  <li>• Multi-tag filtering</li>
                  <li>• Tag-based analytics</li>
                  <li>• Automated tagging rules</li>
                </ul>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Search className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Advanced Search & Filtering</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Find any link instantly with powerful search capabilities. Filter by date, performance, 
                  tags, or custom criteria to locate specific links quickly.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Full-text search</li>
                  <li>• Date range filtering</li>
                  <li>• Performance-based sorting</li>
                  <li>• Saved search queries</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-blue-600 rounded-xl p-8 text-white mb-8">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Shrtnly for Link Management?</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold mb-2">Enterprise-Grade Reliability</h3>
                <p className="text-blue-100">
                  99.9% uptime guarantee with global CDN ensures your links work reliably worldwide. 
                  Professional tools designed for businesses that depend on link performance.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Intuitive User Experience</h3>
                <p className="text-blue-100">
                  User-friendly dashboard that makes complex link management tasks simple and efficient. 
                  Save time with automation and bulk operations while maintaining full control.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Scalable Solutions</h3>
                <p className="text-blue-100">
                  From individual creators to enterprise teams, our platform scales with your needs. 
                  Manage unlimited links with team collaboration and permission controls.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Data-Driven Insights</h3>
                <p className="text-blue-100">
                  Make informed decisions with comprehensive analytics and reporting. 
                  Optimize campaigns based on real performance data and user behavior insights.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Start Managing Your Links Like a Pro</h2>
            <p className="text-lg text-gray-600 mb-6">
              Join thousands of professionals who trust Shrtnly for their link management needs. 
              Create your first managed link and experience the difference professional tools make.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Create Your First Managed Link
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LinkManagementPage;