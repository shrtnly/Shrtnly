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
import { Link as RouterLink } from 'react-router-dom';

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
      
      {/* Header with Navigation */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-blue-600">
              <RouterLink to="/">Shrtnly</RouterLink>
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li><RouterLink to="/" className="text-gray-600 hover:text-blue-600">Home</RouterLink></li>
                <li><RouterLink to="/features" className="text-gray-600 hover:text-blue-600">Features</RouterLink></li>
                <li><RouterLink to="/pricing" className="text-gray-600 hover:text-blue-600">Pricing</RouterLink></li>
                <li><RouterLink to="/blog" className="text-gray-600 hover:text-blue-600">Blog</RouterLink></li>
                <li><RouterLink to="/about" className="text-gray-600 hover:text-blue-600">About</RouterLink></li>
                <li><RouterLink to="/contact" className="text-gray-600 hover:text-blue-600">Contact</RouterLink></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main id="main-content" className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section with H1 */}
          <div className="bg-blue-600 rounded-2xl p-6 sm:p-8 text-white text-center shadow-lg mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">
              Free URL Shortener – Create Short Links in Seconds
            </h1>
            <p className="text-lg sm:text-xl mb-6 text-blue-100 leading-relaxed">
              Turn long URLs into clean, professional short links. Get instant QR codes and track every click.
            </p>
            <div className="text-left max-w-2xl mx-auto">
              <div className="space-y-4 text-base sm:text-lg">
                <div className="flex items-start gap-3">
                  <span className="w-2.5 h-2.5 mt-2 bg-white rounded-full flex-shrink-0"></span>
                  <span>Create short, shareable links in under 5 seconds</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-2.5 h-2.5 mt-2 bg-white rounded-full flex-shrink-0"></span>
                  <span>Download high-quality QR codes for print and digital use</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-2.5 h-2.5 mt-2 bg-white rounded-full flex-shrink-0"></span>
                  <span>Monitor performance with real-time click analytics</span>
                </div>
              </div>
            </div>
          </div>

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
          
          {/* Analytics Dashboard Card */}
          <div className="mb-16">
            <AnalyticsDashboardCard onSignInClick={handleSignInClick} />
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
                <RouterLink to="/features/custom-links" className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 inline-block">
                  Learn more →
                </RouterLink>
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
                <RouterLink to="/features/qr-codes" className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 inline-block">
                  Learn more →
                </RouterLink>
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
                <RouterLink to="/features/analytics" className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 inline-block">
                  Learn more →
                </RouterLink>
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
                <RouterLink to="/features/security" className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 inline-block">
                  Learn more →
                </RouterLink>
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
                <RouterLink to="/features/no-signup" className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 inline-block">
                  Learn more →
                </RouterLink>
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
                <RouterLink to="/features/accessibility" className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 inline-block">
                  Learn more →
                </RouterLink>
              </div>
            </div>
          </div>
          
          {/* How it Works Section */}
          <div className="mb-20">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                How to Create Short URLs in 4 Easy Steps
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Shorten your long URLs in seconds with QR codes and link tracking.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-0 relative">
              {[
                {
                  title: "Enter Your Long URL",
                  desc: "Paste your original long link into the shortener field.",
                  color: "bg-blue-600",
                  lineColor: "bg-blue-200",
                  icon: "1"
                },
                {
                  title: "Customize Your Link",
                  desc: "Personalize with custom alias, title, or tags.",
                  color: "bg-green-600",
                  lineColor: "bg-green-200",
                  icon: "2"
                },
                {
                  title: "Generate Short Link",
                  desc: "Click 'Shorten' to get your short link & QR code.",
                  color: "bg-purple-600",
                  lineColor: "bg-purple-200",
                  icon: "3"
                },
                {
                  title: "Share and Track",
                  desc: "Monitor performance with real-time analytics.",
                  color: "bg-orange-600",
                  lineColor: "bg-orange-200",
                  icon: "4"
                }
              ].map((step, index) => (
                <div key={index} className="text-center relative group">
                  <div className="flex items-center justify-center mb-5">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 ${step.color} text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                      {step.icon}
                    </div>
                    {index !== 3 && (
                      <div className={`hidden lg:block absolute top-7 left-full w-12 h-1 ${step.lineColor}`}></div>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Resources Section */}
          <div className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">Resources & Guides</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">URL Shortening Best Practices</h3>
                <p className="text-gray-600 mb-4">Learn how to effectively use short links in your marketing campaigns.</p>
                <RouterLink to="/blog/best-practices" className="text-blue-600 hover:text-blue-800 font-medium">
                  Read article →
                </RouterLink>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">QR Code Marketing Guide</h3>
                <p className="text-gray-600 mb-4">Discover innovative ways to use QR codes in your marketing strategy.</p>
                <RouterLink to="/blog/qr-code-marketing" className="text-blue-600 hover:text-blue-800 font-medium">
                  Read article →
                </RouterLink>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">API Documentation</h3>
                <p className="text-gray-600 mb-4">Integrate Shrtnly with your applications using our REST API.</p>
                <a href="https://docs.shrtnly.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                  View docs →
                </a>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-blue-600 rounded-2xl p-6 sm:p-8 text-white text-center shadow-lg mb-8 sm:mb-12">
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

      {/* Footer with Internal and External Links */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><RouterLink to="/features" className="text-gray-300 hover:text-white">Features</RouterLink></li>
                <li><RouterLink to="/pricing" className="text-gray-300 hover:text-white">Pricing</RouterLink></li>
                <li><RouterLink to="/api" className="text-gray-300 hover:text-white">API</RouterLink></li>
                <li><RouterLink to="/integrations" className="text-gray-300 hover:text-white">Integrations</RouterLink></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><RouterLink to="/blog" className="text-gray-300 hover:text-white">Blog</RouterLink></li>
                <li><RouterLink to="/help" className="text-gray-300 hover:text-white">Help Center</RouterLink></li>
                <li><a href="https://docs.shrtnly.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Documentation</a></li>
                <li><RouterLink to="/tutorials" className="text-gray-300 hover:text-white">Tutorials</RouterLink></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><RouterLink to="/about" className="text-gray-300 hover:text-white">About Us</RouterLink></li>
                <li><RouterLink to="/careers" className="text-gray-300 hover:text-white">Careers</RouterLink></li>
                <li><RouterLink to="/contact" className="text-gray-300 hover:text-white">Contact</RouterLink></li>
                <li><RouterLink to="/partners" className="text-gray-300 hover:text-white">Partners</RouterLink></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="https://twitter.com/shrtnly" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Twitter</a></li>
                <li><a href="https://facebook.com/shrtnly" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Facebook</a></li>
                <li><a href="https://linkedin.com/company/shrtnly" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">LinkedIn</a></li>
                <li><a href="https://github.com/shrtnly" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Shrtnly. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <RouterLink to="/privacy" className="hover:text-white">Privacy Policy</RouterLink>
              <RouterLink to="/terms" className="hover:text-white">Terms of Service</RouterLink>
              <RouterLink to="/cookies" className="hover:text-white">Cookie Policy</RouterLink>
            </div>
          </div>
        </div>
      </footer>
      
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;