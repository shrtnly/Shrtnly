import React from 'react';
import { Link } from 'react-router-dom';
import { Link2, Github, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-slate-950 text-white py-12 mt-16 transition-colors duration-theme">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Link2 className="w-6 h-6" />
              <span className="text-xl font-bold">Shrtnly</span>
            </div>
            <p className="text-gray-400 dark:text-gray-300 text-sm mb-4">
              Fast, secure, and accessible URL shortening service with QR code generation.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="p-2 bg-gray-800 dark:bg-slate-800 rounded-lg hover:bg-gray-700 dark:hover:bg-slate-700 transition-colors duration-theme focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Follow us on Twitter"
              >
                <Twitter size={16} />
              </a>
              <a 
                href="#" 
                className="p-2 bg-gray-800 dark:bg-slate-800 rounded-lg hover:bg-gray-700 dark:hover:bg-slate-700 transition-colors duration-theme focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="View our GitHub repository"
              >
                <Github size={16} />
              </a>
              <a 
                href="mailto:support@shrtnly.com" 
                className="p-2 bg-gray-800 dark:bg-slate-800 rounded-lg hover:bg-gray-700 dark:hover:bg-slate-700 transition-colors duration-theme focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Email us"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors duration-theme">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors duration-theme">
                  Analytics
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors duration-theme">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors duration-theme">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-sm text-gray-400 dark:text-gray-300">
              <li>Custom Short Codes</li>
              <li>QR Code Generation</li>
              <li>Click Tracking</li>
              <li>Link Management</li>
              <li>Mobile Optimized</li>
              <li>Accessibility First</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:support@shrtnly.com" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors duration-theme">
                  Email Support
                </a>
              </li>
              <li>
                <span className="text-gray-400 dark:text-gray-300">Response: 24 hours</span>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors duration-theme">
                  Contact Form
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 dark:border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 dark:text-gray-300 text-sm">
            © {new Date().getFullYear()} Shrtnly. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors duration-theme">
              Privacy
            </Link>
            <Link to="/contact" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors duration-theme">
              Terms
            </Link>
            <Link to="/contact" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors duration-theme">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;