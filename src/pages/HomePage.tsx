import React, { useState } from 'react';
import { Link2, CheckCircle, Zap, Shield, BarChart3, QrCode, Globe } from 'lucide-react';
import SkipLinks from '../components/SkipLinks';
import LinkForm from '../components/LinkForm';
import RecentLinks from '../components/RecentLinks';
import AnalyticsDashboardCard from '../components/AnalyticsDashboardCard';
import AuthModal from '../components/auth/AuthModal';
import { Link } from '../types';
import { motion } from "framer-motion";
import AnimatedParagraphs from '../components/AnimatedParagraphs';

const HomePage: React.FC = () => {
  const [newLink, setNewLink] = useState<Link | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleLinkCreated = (link: Link) => {
    setNewLink(link);
  };


  
  const handleSignInClick = () => {
    setAuthModalOpen(true);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <SkipLinks />

      <main id="main-content" className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">

    {/* Hero animated paragraphs */}
      <div className="mb-6">
        <AnimatedParagraphs />
      </div>
          
          {/* Main Link Form */}
          <div className="mb-16">
            <LinkForm onLinkCreated={handleLinkCreated} />
          </div>
          {/* Recent Links Section */}
          <div className="mb-16">
            <RecentLinks newLink={newLink} />
          </div>
          
          {/* Hero Section - Optimized for Readability */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white text-center shadow-lg mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">
              Free URL Shortener – Create Short Links in Seconds
            </h1>

            <p className="text-lg sm:text-xl mb-6 text-purple-100 leading-relaxed">
              Turn long URLs into clean, professional short links. Get instant QR codes and track every click.
            </p>

            <div className="text-left max-w-2xl mx-auto">
              <div className="space-y-3 text-base sm:text-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full mt-3"></span>
                  <span>Create short, shareable links in under 5 seconds</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full mt-3"></span>
                  <span>Download high-quality QR codes for print and digital use</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full mt-3"></span>
                  <span>Monitor performance with real-time click analytics</span>
                </div>
              </div>
            </div>
          </div>


          {/* Features Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Why Shrtnly is the Best URL Shortener</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 leading-relaxed">
                Get powerful tools to create, track, and improve your short links. Perfect for businesses and marketers.
              </p>
            </div>
            
            <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Custom Short Links</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Build your brand with custom short codes. Make memorable links that people trust and remember.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <QrCode className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Free QR Code Generator</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Get instant QR codes for mobile sharing. Perfect for business cards, flyers, and print ads.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Click Analytics</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Track every click with detailed reports. See which links work best and improve your results.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Shield className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Safe & Secure Links</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Stay safe with secure link previews. See where links go before you click them.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Globe className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">No Registration Required</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Start shortening URLs right away. No signup needed. Just paste your link and share.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-indigo-100 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Easy to Use</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Simple design that works for everyone. Full keyboard support and screen reader friendly.
                </p>
              </div>
            </div>
          </div>

          {/* How it Works Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Create Short URLs in 4 Easy Steps</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 leading-relaxed">
                Turn any long URL into a short link in under 5 seconds. It's that simple.
              </p>
            </div>
            
            <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 shadow-lg">
                    1
                  </div>
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-blue-200 -translate-y-1/2"></div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Enter Your Long URL</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Copy your long URL. Paste it into our shortener tool.
                </p>
              </div>

              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 shadow-lg">
                    2
                  </div>
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-green-200 -translate-y-1/2"></div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Customize Your Link</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Add custom codes and titles. Organize your links the way you want.
                </p>
              </div>

              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 shadow-lg">
                    3
                  </div>
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-purple-200 -translate-y-1/2"></div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Generate Short Link</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Get your short URL and QR code instantly. Ready to share anywhere.
                </p>
              </div>

              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 shadow-lg">
                    4
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Share and Monitor</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Share your link anywhere. Watch real-time stats for every click.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Start Creating Short URLs Now</h2>
            <p className="text-lg sm:text-xl mb-6 opacity-90 leading-relaxed">
              Join 10,000+ users who trust Shrtnly. Fast, reliable URL shortening made simple.
            </p>
            <button
              onClick={() => document.getElementById('link-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-blue-600 px-6 sm:px-8 py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors min-h-[44px]"
            >
              Create Your First Short URL
            </button>
          </div>
        </div>
      </main>
      
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;