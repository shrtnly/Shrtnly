import React from 'react';
import { Info, Target, Users, Shield, Zap, Heart, Award, Globe } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* SEO Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-indigo-600 rounded-xl">
                <Info className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">About Shrtnly - Leading URL Shortening & Analytics Platform</h1>
                <p className="text-gray-600">Trusted by 10,000+ businesses worldwide for professional link management and marketing optimization</p>
              </div>
            </div>
            
            {/* SEO Meta Description Equivalent */}
            <div className="bg-indigo-50 rounded-lg p-4 mb-6">
              <p className="text-indigo-800 text-sm">
                <strong>About Shrtnly:</strong> Founded in 2024, we're the fastest-growing URL shortening platform 
                serving 10,000+ users globally. Specializing in enterprise-grade link management, real-time analytics, 
                and marketing optimization tools for businesses, agencies, and content creators.
              </p>
            </div>
          </div>

          {/* Hero Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">The Story Behind Shrtnly</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We started Shrtnly in 2024. Our team saw a problem: URL shorteners were too basic for modern businesses.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We built something better. A platform that works for everyone - from solo creators to large marketing teams.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Today, we help businesses manage millions of links worldwide. Fast, secure, and easy to use.
            </p>
            
            <div className="grid gap-6 md:grid-cols-4">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">50,000+</h3>
                <p className="text-gray-600">Active Users Globally</p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">10M+</h3>
                <p className="text-gray-600">Links Created Monthly</p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">99.9%</h3>
                <p className="text-gray-600">Uptime Reliability</p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">150+</h3>
                <p className="text-gray-600">Countries Served</p>
              </div>
            </div>
          </div>

          {/* Company Milestones */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Journey to Becoming the Leading URL Shortener</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  2024
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Platform Launch & Rapid Growth</h3>
                  <p className="text-gray-600">
                    Launched Shrtnly with enterprise-grade infrastructure and advanced analytics. Achieved 10,000+ 
                    users within the first six months, establishing ourselves as the fastest-growing URL shortening 
                    platform in the market with industry-leading uptime and performance.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  Q2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Enterprise Features & API Launch</h3>
                  <p className="text-gray-600">
                    Introduced advanced link management, team collaboration tools, and comprehensive API access. 
                    Partnered with leading marketing agencies and enterprise clients to provide scalable solutions 
                    for high-volume link management and sophisticated analytics requirements.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                  Q3
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Expansion & Security Certification</h3>
                  <p className="text-gray-600">
                    Expanded to serve 150+ countries with localized support and compliance. Achieved SOC 2 Type II 
                    certification and GDPR compliance, establishing Shrtnly as the most secure and trusted URL 
                    shortening platform for enterprise and government clients worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Mission & Vision */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Our Mission: Democratizing Professional Link Management</h3>
                </div>
                <p className="text-gray-600">
                  To democratize access to enterprise-grade URL shortening and analytics tools, empowering businesses 
                  of all sizes to optimize their digital marketing efforts. We believe every organization deserves 
                  professional-quality link management capabilities, comprehensive analytics, and reliable infrastructure 
                  to maximize their marketing ROI and drive sustainable growth.
                </p>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-red-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Our Vision: The Future of Digital Marketing</h3>
                </div>
                <p className="text-gray-600">
                  To become the global standard for intelligent link management and marketing optimization, 
                  pioneering innovations in predictive analytics, automated optimization, and seamless 
                  integration across the entire digital marketing ecosystem. We envision a future where 
                  every link is a strategic marketing asset that drives measurable business results.
                </p>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">What Drives Us</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Security & Privacy First</h3>
                  <p className="text-gray-600">
                    We prioritize user privacy and data security in everything we do. Our platform uses 
                    enterprise-grade encryption, secure data handling practices, and transparent privacy 
                    policies to protect your information and maintain your trust.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation & Performance</h3>
                  <p className="text-gray-600">
                    We continuously innovate to provide faster, more reliable, and more feature-rich 
                    URL shortening services. Our platform is built on modern infrastructure that scales 
                    with your needs and delivers consistent performance worldwide.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">User-Centric Design</h3>
                  <p className="text-gray-600">
                    Every feature we build is designed with our users in mind. We listen to feedback, 
                    prioritize accessibility, and create intuitive interfaces that make complex tasks 
                    simple and efficient for users of all technical levels.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Excellence & Reliability</h3>
                  <p className="text-gray-600">
                    We maintain the highest standards of service quality and reliability. Our 99.9% uptime 
                    guarantee, 24/7 monitoring, and dedicated support team ensure your links work when you 
                    need them most, every time.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Technology & Infrastructure */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Built on Modern Technology</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Scalable Infrastructure</h3>
                <p className="text-gray-600 mb-4">
                  Our platform is built on cloud-native architecture that automatically scales to handle 
                  millions of clicks while maintaining lightning-fast response times globally.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Global CDN for fast redirects</li>
                  <li>• Auto-scaling server infrastructure</li>
                  <li>• Real-time analytics processing</li>
                  <li>• 99.9% uptime SLA</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Security & Compliance</h3>
                <p className="text-gray-600 mb-4">
                  We implement industry-leading security measures and comply with international data 
                  protection regulations to keep your data safe and your links secure.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• GDPR & CCPA compliant</li>
                  <li>• End-to-end encryption</li>
                  <li>• Regular security audits</li>
                  <li>• SOC 2 Type II certified</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Team & Community */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white mb-8">
            <h2 className="text-2xl font-semibold mb-4">Join Our Growing Community</h2>
            <p className="text-lg mb-6 text-indigo-100">
              Shrtnly is more than just a URL shortener – we're a community of marketers, content creators, 
              developers, and businesses who believe in the power of optimized link sharing.
            </p>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">24/7</div>
                <div className="text-indigo-200 text-sm">Customer Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">150+</div>
                <div className="text-indigo-200 text-sm">Countries Served</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">5★</div>
                <div className="text-indigo-200 text-sm">Average Rating</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Experience the Difference?</h2>
            <p className="text-lg text-gray-600 mb-6">
              Join thousands of satisfied users who trust Shrtnly for their URL shortening needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/'}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
              >
                Start Shortening URLs
              </button>
              <button
                onClick={() => window.location.href = '/contact'}
                className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Contact Our Team
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;