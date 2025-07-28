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
      <div className="mb-12">
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
          
          {/* Analytics Dashboard Card 
          <div className="mb-16">
            <AnalyticsDashboardCard onSignInClick={handleSignInClick} />
          </div>
*/}

{/* Hero Section */}
          
<div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white text-center shadow-lg mb-8 sm:mb-12">
  <h1 className="text-2xl sm:text-3xl font-bold mb-4">
    Free URL Shortener – Create Short Links Instantly
  </h1>

  <p className="text-lg sm:text-xl mb-6 text-purple-100">
    Shorten URLs instantly with automatic QR codes and real-time analytics.
  </p>

  <ul className="text-base sm:text-lg text-left list-disc ">
    <li>Transform long URLs into short, shareable links in seconds</li>
    <li>Get automatic QR codes for every link you create</li>
    <li>Track clicks and boost social media engagement with detailed analytics</li>
  </ul>
</div>


          {/* Features Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Why Choose Shrtnly for URL Shortening?</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                Access powerful features that help you create, track, and optimize your short links.
              </p>
            </div>
            
            <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Create Custom Short Links</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600">
                  Build brand recognition with personalized short codes. Create memorable, professional links that reflect your brand.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <QrCode className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Instant QR Code Generator</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600">
                  Generate QR codes instantly for mobile sharing. Perfect for print materials, business cards, and offline marketing campaigns.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Advanced Click Analytics</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600">
                  Monitor every click with detailed analytics. Discover which links perform best and optimize your marketing strategy.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Shield className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Safe Link Previews</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600">
                  Browse safely with built-in link previews. See exactly where links lead before you click them.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Globe className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Start Without Registration</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600">
                  Begin shortening URLs immediately. No signup required. Simply paste your link and start sharing.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-indigo-100 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Fully Accessible Design</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600">
                  Designed for everyone to use. Includes complete screen reader support and full keyboard navigation.
                </p>
              </div>
            </div>
          </div>

          {/* How it Works Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">How to Create Short URLs in 4 Simple Steps</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                Transform any long URL into a short link in less than 5 seconds.
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
                <p className="text-sm sm:text-base text-gray-600">
                  Copy your long URL and paste it into our URL shortener tool.
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
                <p className="text-sm sm:text-base text-gray-600">
                  Add custom codes, titles, or descriptions to organize your links effectively.
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
                <p className="text-sm sm:text-base text-gray-600">
                  Receive your shortened URL and QR code instantly, ready to share anywhere.
                </p>
              </div>

              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 shadow-lg">
                    4
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Share and Monitor</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Share your short link and monitor real-time analytics for every click.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Start Creating Short URLs Today</h2>
            <p className="text-lg sm:text-xl mb-6 opacity-90">
              Join over 10,000 users who trust Shrtnly for fast, reliable URL shortening.
            </p>
            <button
              onClick={() => document.getElementById('link-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-blue-600 px-6 sm:px-8 py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors min-h-[44px]"
            >
              Create Your First Short URL Free
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