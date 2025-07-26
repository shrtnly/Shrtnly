import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ExternalLink, Clock, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

const LinkRedirect: React.FC = () => {
  const { shortCode } = useParams<{ shortCode: string }>();
  const [countdown, setCountdown] = useState(2);
  const [redirecting, setRedirecting] = useState(true);
  const [linkData, setLinkData] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!shortCode) {
      // Invalid short code - redirect to home
      window.location.href = '/';
      return;
    }

    // Fetch link data first
    fetchLinkData();
  }, [shortCode]);

  // Countdown timer effect
  useEffect(() => {
    if (!redirecting || !linkData) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setRedirecting(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [redirecting, linkData]);

  // Redirect when countdown finishes
  useEffect(() => {
    if (!redirecting && linkData) {
      redirectToOriginalUrl();
    }
  }, [redirecting, linkData]);

  const fetchLinkData = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('links')
        .select('*')
        .eq('short_code', shortCode)
        .eq('is_active', true)
        .single();

      if (fetchError || !data) {
        // Link not found - redirect to home
        setError(true);
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
        return;
      }

      setLinkData(data);
    } catch (err) {
      setError(true);
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    }
  };
  const redirectToOriginalUrl = async () => {
    if (!linkData) return;

    try {
      // Update click count in background (don't wait for it)
      supabase
        .from('links')
        .update({ click_count: linkData.click_count + 1 })
        .eq('id', linkData.id)
        .then(() => {})
        .catch(() => {}); // Silently handle errors for click tracking

      // Track click event in analytics
      if (linkData.user_id) {
        // Get client information for analytics
        const ipUtils = await import('../lib/ipUtils');
        const clientIP = await ipUtils.getClientIP();
        const userAgent = navigator.userAgent;
        const referrer = document.referrer;
        
        // Parse user agent for device info
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
            link_id: linkData.id,
            user_id: linkData.user_id,
            event_type: 'click',
            ip_address: clientIP,
            user_agent: userAgent,
            referrer: referrer,
            device_type: deviceType,
            browser: browser,
            os: os,
            country: 'Unknown', // Would be determined by IP geolocation service
            utm_source: getUTMParameter('utm_source'),
            utm_medium: getUTMParameter('utm_medium'),
            utm_campaign: getUTMParameter('utm_campaign'),
          })
          .then(() => {})
          .catch(() => {}); // Silently handle errors
      }

      // Redirect immediately to the original URL
      window.location.href = linkData.original_url;

    } catch (err) {
      // Error occurred - redirect to home
      window.location.href = '/';
    }
  };

  // Helper function to extract UTM parameters
  const getUTMParameter = (param: string): string | null => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <ExternalLink className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Link Not Found</h1>
            <p className="text-gray-600">
              The short link you're looking for doesn't exist or has been deactivated.
            </p>
          </div>
          <p className="text-sm text-gray-500">
            Redirecting to homepage in a few seconds...
          </p>
        </div>
      </div>
    );
  }

  if (!linkData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Loading...</h1>
            <p className="text-gray-600">
              Preparing your link...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            {redirecting ? (
              <Clock className="w-8 h-8 text-green-600" />
            ) : (
              <ArrowRight className="w-8 h-8 text-green-600" />
            )}
          </div>
          
          {redirecting ? (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Redirecting in {countdown}...
              </h1>
              <p className="text-gray-600 mb-4">
                Taking you to your destination
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Redirecting Now...
              </h1>
              <p className="text-gray-600 mb-4">
                If you're not redirected automatically, click below
              </p>
            </>
          )}
        </div>

        {/* Link Preview */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="text-sm text-gray-600 mb-1">You're being redirected to:</div>
          <div className="font-medium text-gray-900 break-all">
            {linkData.title || 'Untitled Link'}
          </div>
          <div className="text-xs text-gray-500 mt-1 break-all">
            {linkData.original_url}
          </div>
        </div>

        {/* Manual redirect button (shown after countdown) */}
        {!redirecting && (
          <a
            href={linkData.original_url}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Continue to Destination
          </a>
        )}

        {/* Progress bar */}
        {redirecting && (
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${((2 - countdown) / 2) * 100}%` }}
            />
          </div>
        )}

        <p className="text-xs text-gray-500">
          Powered by Shrtnly • Safe link redirection
        </p>
      </div>
    </div>
  );
};

export default LinkRedirect;