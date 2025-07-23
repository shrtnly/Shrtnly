import React from 'react';
import { Shield, Eye, Lock, Database, UserCheck, AlertCircle } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-600 rounded-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
                <p className="text-gray-600">How we protect and handle your data</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          {/* Privacy Overview */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Our Privacy Commitment</h2>
                <p className="text-gray-600">
                  At Shrtnly, we believe in transparency and user privacy. We collect minimal data necessary 
                  to provide our URL shortening service and never sell your personal information to third parties.
                </p>
              </div>
            </div>
          </div>

          {/* Data Collection */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Information We Collect</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">When You Create a Short Link</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                    <span>The original URL you want to shorten</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                    <span>Optional title and description you provide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                    <span>IP address for session management and abuse prevention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                    <span>Timestamp of link creation</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">When Someone Clicks Your Link</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                    <span>Click count (anonymous aggregated data)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                    <span>Timestamp of access</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Data */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">How We Use Your Information</h2>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Service Operation</h4>
                <p className="text-sm text-gray-600">
                  To create, manage, and redirect your shortened links effectively.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Analytics</h4>
                <p className="text-sm text-gray-600">
                  To provide you with click statistics and usage insights for your links.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Abuse Prevention</h4>
                <p className="text-sm text-gray-600">
                  To prevent spam, malicious links, and other forms of service abuse.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Service Improvement</h4>
                <p className="text-sm text-gray-600">
                  To understand usage patterns and improve our service quality.
                </p>
              </div>
            </div>
          </div>

          {/* Data Protection */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900">Data Protection & Security</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Encryption</h4>
                  <p className="text-sm text-gray-600">All data is transmitted using HTTPS encryption</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Secure Storage</h4>
                  <p className="text-sm text-gray-600">Data is stored in secure, industry-standard databases</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Access Control</h4>
                  <p className="text-sm text-gray-600">Strict access controls limit who can view your data</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Regular Audits</h4>
                  <p className="text-sm text-gray-600">We regularly review and update our security practices</p>
                </div>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-6 h-6 text-orange-600" />
              <h2 className="text-xl font-semibold text-gray-900">Your Rights & Choices</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Link Management</h4>
                <p className="text-sm text-gray-600">
                  You can deactivate any links you've created by contacting us. Deactivated links will no longer redirect.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Data Deletion</h4>
                <p className="text-sm text-gray-600">
                  You can request deletion of your data by contacting us. We'll remove your information within 30 days.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Data Portability</h4>
                <p className="text-sm text-gray-600">
                  You can request a copy of your data in a machine-readable format.
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-blue-50 rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Questions About Privacy?</h3>
            <p className="text-gray-600 mb-4">
              If you have any questions about this privacy policy or how we handle your data, please contact us.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPage;