import { Link as RouterLink } from 'react-router-dom';
import React, { useState, useRef } from 'react';
import { nanoid } from 'nanoid';
import { Link2, Copy, Check, ChevronDown, ChevronUp, Settings } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { CreateLinkData, Link } from '../types';
import { useAnnouncement } from '../hooks/useFocusManagement';
import { useIPTracking } from '../hooks/useIPTracking';
import { useAuth } from '../contexts/AuthContext';
import QRCodeGenerator from './QRCodeGenerator';
import { BarChart3 } from 'lucide-react';


interface LinkFormProps {
  onLinkCreated: (link: Link) => void;
}

const LinkForm: React.FC<LinkFormProps> = ({ onLinkCreated }) => {
  const [formData, setFormData] = useState<CreateLinkData>({
    original_url: '',
    short_code: '',
    title: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdLink, setCreatedLink] = useState<Link | null>(null);
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [urlValid, setUrlValid] = useState<boolean | null>(null);
  const { announce } = useAnnouncement();
  const { clientIP } = useIPTracking();
  const { user } = useAuth();
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validate URL in real-time
    if (name === 'original_url') {
      const url = value.trim();
      if (url === '') {
        setUrlValid(null);
      } else {
        setUrlValid(validateUrl(url));
      }
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const generateShortCode = (): string => {
    return nanoid(5);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Validation
    if (!formData.original_url.trim()) {
      setError('Please enter a URL to shorten');
      setIsLoading(false);
      return;
    }

    if (!validateUrl(formData.original_url)) {
      setError('Please enter a valid URL (include https:// or https://)');
      setIsLoading(false);
      return;
    }

    const shortCode = formData.short_code || generateShortCode();

    try {
      const { data, error: supabaseError } = await supabase
        .from('links')
        .insert({
          original_url: formData.original_url,
          short_code: shortCode,
          title: formData.title || null,
          description: formData.description || null,
          user_id: user?.id || null,
          created_ip: clientIP,
        })
        .select()
        .single();

      if (supabaseError) {
        if (supabaseError.code === '23505') {
          setError('This short code is already taken. Please choose another one.');
        } else {
          setError('Failed to create short link. Please try again.');
        }
        return;
      }

      setCreatedLink(data);
      onLinkCreated(data);
      
      // Reset form
      setFormData({
        original_url: '',
        short_code: '',
        title: '',
        description: '',
      });

      // Announce success and focus on result
      announce('Short link created successfully', 'assertive');
      setTimeout(() => {
        resultRef.current?.focus();
      }, 100);

      // Track link creation event
      if (user && data) {
        const userAgent = navigator.userAgent;
        const referrer = document.referrer;
        
        // Enhanced device and browser detection
        const parseUserAgent = (ua: string) => {
          const lowerUA = ua.toLowerCase();
          let deviceType = 'Desktop';
          let browser = 'Other';
          let os = 'Other';
          
          // Device detection
          if (lowerUA.includes('mobile') || lowerUA.includes('android') || lowerUA.includes('iphone')) {
            deviceType = 'Mobile';
          } else if (lowerUA.includes('tablet') || lowerUA.includes('ipad')) {
            deviceType = 'Tablet';
          }
          
          // Browser detection
          if (lowerUA.includes('chrome') && !lowerUA.includes('edg')) {
            browser = 'Chrome';
          } else if (lowerUA.includes('safari') && !lowerUA.includes('chrome')) {
            browser = 'Safari';
          } else if (lowerUA.includes('firefox')) {
            browser = 'Firefox';
          } else if (lowerUA.includes('edg')) {
            browser = 'Edge';
          } else if (lowerUA.includes('opera')) {
            browser = 'Opera';
          }
          
          // OS detection
          if (lowerUA.includes('windows')) {
            os = 'Windows';
          } else if (lowerUA.includes('mac') || lowerUA.includes('darwin')) {
            os = 'macOS';
          } else if (lowerUA.includes('linux')) {
            os = 'Linux';
          } else if (lowerUA.includes('android')) {
            os = 'Android';
          } else if (lowerUA.includes('ios') || lowerUA.includes('iphone') || lowerUA.includes('ipad')) {
            os = 'iOS';
          }
          
          return { deviceType, browser, os };
        };
        
        const { deviceType, browser, os } = parseUserAgent(userAgent);
        
        supabase
          .from('link_analytics')
          .insert({
            link_id: data.id,
            user_id: user.id,
            event_type: 'view',
            ip_address: clientIP,
            user_agent: userAgent,
            referrer: referrer,
            device_type: deviceType,
            browser: browser,
            os: os,
            country: 'Unknown', // Would be determined by IP geolocation
            utm_source: new URLSearchParams(window.location.search).get('utm_source'),
            utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
            utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
          })
          .then(() => {})
          .catch(() => {}); // Silently handle errors
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Error creating link:', err);
    } finally {
      setIsLoading(false);
    }
  };


  const copyToClipboard = async () => {
    if (!createdLink) return;

    const shortUrl = `${window.location.origin}/${createdLink.short_code}`;
    
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      announce('Short link copied to clipboard', 'polite');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      announce('Failed to copy link', 'polite');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100 w-full max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Link2 className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Shorten Your URL</h2>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" id="link-form">
        {/* URL and Short Code Row */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-4">

<form onSubmit={handleSubmit} className="space-y-6 mt-8">
  {/* Original URL */}
  <div className="w-full">
    <label htmlFor="original_url" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
      Original URL *
    </label>
    <div className="relative">
      <input
        type="url"
        id="original_url"
        name="original_url"
        value={formData.original_url}
        onChange={handleChange}
        placeholder="https://example.com/very-long-url"
        className={`w-full px-4 py-3 sm:py-4 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
          urlValid === null 
            ? 'border-gray-300 focus:border-blue-500' 
            : urlValid 
              ? 'border-green-300 focus:border-green-500 bg-green-50' 
              : 'border-red-300 focus:border-red-500 bg-red-50'
        }`}
        required
        aria-describedby={error ? "url-error" : undefined}
      />
      {urlValid !== null && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {urlValid ? (
            <Check className="w-5 h-5 text-green-600" />
          ) : (
            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
              <span className="text-white text-xs">!</span>
            </div>
          )}
        </div>
      )}
    </div>
    {urlValid === false && formData.original_url.trim() !== '' && (
      <p className="mt-1 text-sm text-red-600">Enter a valid URL starting with http:// or https://</p>
    )}
  </div>

  {/* Domain + Alias */}
  <div className="w-full grid grid-cols-1 md:grid-cols-10 gap-4">
    <div className="md:col-span-7">
      <label htmlFor="custom_domain" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
        Choose Domain
      </label>
      <select
        id="custom_domain"
        name="custom_domain"
        value={formData.custom_domain}
        onChange={(e) => {
          const value = e.target.value;
          setFormData((prev) => ({ ...prev, custom_domain: value }));
          if (value === "add_domain") {
            window.open("https://t.ly/register?via=dawod", "_blank");
          }
        }}
        className="w-full px-4 py-3 sm:py-4 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
      >
        <option value="shrtnly.pro">shrtnly.pro</option>
        <option value="tinyurl.com">tinyurl.com</option>
        <option value="add_domain">➕ Add Domain</option>
      </select>
    </div>

    <div className="md:col-span-3">
      <label htmlFor="short_code" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
        Alias (optional)
      </label>
      <input
        type="text"
        id="short_code"
        name="short_code"
        value={formData.short_code}
        onChange={handleChange}
        placeholder="e.g. mylink"
        className="w-full px-4 py-3 sm:py-4 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        pattern="[a-zA-Z0-9_-]+"
        maxLength={5}
        title="Only letters, numbers, hyphens, and underscores allowed"
      />
    </div>
  </div>



        {/* Advanced Options Toggle */}
        <div className="border-t border-gray-200 pt-4">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-2 py-1 min-h-[44px]"
            aria-expanded={showAdvanced}
            aria-controls="advanced-options"
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm sm:text-base">
              {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
            </span>
            {showAdvanced ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Advanced Options */}
        <div 
          id="advanced-options"
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            showAdvanced ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-4 pt-2">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                Title (optional)
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Link Title"
                className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                Description (optional)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleTextareaChange}
                placeholder="What does this link lead to?"
                rows={3}
                className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div 
            id="url-error"
            className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700"
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 sm:py-4 px-6 rounded-lg font-medium text-sm sm:text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px]"
        >
          {isLoading ? 'Shortening URL...' : 'Shorten URL Now'}
        </button>
      </form>

      {/* Success Result */}
      {createdLink && (
        <div 
          ref={resultRef}
          className="mt-6 sm:mt-8 p-4 sm:p-6 bg-green-50 border border-green-200 rounded-lg"
          tabIndex={-1}
          aria-labelledby="success-title"
        >
          <h3 id="success-title" className="text-base sm:text-lg font-semibold text-green-800 mb-4 text-center">
            Your Short Link is Ready!
          </h3>
          
          {/* Short Link Display */}
          <div className="mb-6">
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Your Short Link</label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 sm:p-4 bg-white rounded-lg border-2 border-green-300 shadow-sm">
              <input
                type="text"
                value={`${window.location.origin}/${createdLink.short_code}`}
                readOnly
                className="flex-1 text-sm sm:text-lg font-mono text-blue-600 bg-transparent focus:outline-none select-all break-all"
                aria-label="Generated short URL"
                onClick={(e) => e.currentTarget.select()}
              />
              <button
                onClick={copyToClipboard}
                className={`px-4 py-3 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] text-sm sm:text-base ${
                  copied 
                    ? 'bg-green-600 text-white' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
              >
                {copied ? (
                  <>
                    <Check size={16} className="inline mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} className="inline mr-2" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

{/* Direct Link Buttons */}
<div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:gap-4">
  <a
    href={`${window.location.origin}/${createdLink.short_code}`}
    target="_blank"
    rel="noopener noreferrer"
    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium text-sm sm:text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors min-h-[44px]"
  >
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
    Open Short Link
  </a>

<RouterLink
  to="/analytics"
  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg font-medium text-sm sm:text-base hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors min-h-[44px] mt-3 sm:mt-0"
>
  <BarChart3 className="w-4 h-4" />
  Go Analytics
</RouterLink>
</div>
          
          {/* Link Details */}
          <div className="mb-6 space-y-2">
            {createdLink.title && (
              <p className="text-xs sm:text-sm text-gray-600 break-words">
                <strong>Title:</strong> {createdLink.title}
              </p>
            )}
            <p className="text-xs sm:text-sm text-gray-600 break-words">
              <strong>Original URL:</strong> 
              <span className="break-all ml-1">{createdLink.original_url}</span>
            </p>
          </div>
          
          {/* QR Code Section */}
          <div className="border-t border-green-200 pt-6">
            <div className="flex justify-center overflow-x-auto">
              <QRCodeGenerator 
                url={`${window.location.origin}/${createdLink.short_code}`}
                title={createdLink.title || 'Short Link'}
                size={window.innerWidth < 640 ? 150 : 200}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkForm;