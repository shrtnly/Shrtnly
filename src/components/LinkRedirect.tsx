import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';

const LinkRedirect: React.FC = () => {
  const { shortCode } = useParams<{ shortCode: string }>();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!shortCode) {
      // Invalid short code - redirect to home immediately
      window.location.replace('/');
      return;
    }

    // Start redirect process immediately
    performOptimizedRedirect();
  }, [shortCode]);

  const performOptimizedRedirect = async () => {
    try {
      // Step 1: Fetch link data with minimal fields for speed
      const { data: linkData, error: fetchError } = await supabase
        .from('links')
        .select('id, original_url, user_id, click_count, is_active')
        .eq('short_code', shortCode)
        .eq('is_active', true)
        .single();

      if (fetchError || !linkData) {
        // Link not found - redirect to home immediately
        setError(true);
        setTimeout(() => {
          window.location.replace('/');
        }, 2000);
        return;
      }

      // Step 2: Redirect IMMEDIATELY - don't wait for analytics
      window.location.replace(linkData.original_url);

      // Step 3: Handle analytics and click counting in background using sendBeacon
      // This happens after redirect, so it doesn't delay the user
      handleBackgroundAnalytics(linkData);

    } catch (err) {
      // Error occurred - redirect to home
      setError(true);
      setTimeout(() => {
        window.location.replace('/');
      }, 2000);
    }
  };

  const handleBackgroundAnalytics = async (linkData: any) => {
    try {
      // Prepare analytics data
      const analyticsData = await prepareAnalyticsData(linkData);
      
      // Use sendBeacon for reliable background data transmission
      // This works even if the user has already navigated away
      if (navigator.sendBeacon) {
        const analyticsPayload = JSON.stringify({
          type: 'link_analytics',
          data: analyticsData
        });
        
        // Send to a dedicated analytics endpoint (would need to be created)
        const analyticsUrl = `${window.location.origin}/api/analytics`;
        navigator.sendBeacon(analyticsUrl, analyticsPayload);
      }

      // Fallback: Use fetch with keepalive for browsers without sendBeacon
      if (!navigator.sendBeacon) {
        fetch(`${window.location.origin}/api/analytics`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'link_analytics',
            data: analyticsData
          }),
          keepalive: true // Ensures request completes even after navigation
        }).catch(() => {
          // Silently handle errors - don't impact user experience
        });
      }

      // Update click count asynchronously (non-blocking)
      updateClickCountAsync(linkData.id, linkData.click_count);

    } catch (error) {
      // Silently handle analytics errors - don't impact redirect
      console.debug('Analytics processing failed:', error);
    }
  };

  const prepareAnalyticsData = async (linkData: any) => {
    // Get client information efficiently
    const clientIP = await getClientIPFast();
    const userAgent = navigator.userAgent;
    const referrer = document.referrer;
    
    // Fast user agent parsing (simplified for performance)
    const deviceInfo = parseUserAgentFast(userAgent);
    
    return {
      link_id: linkData.id,
      user_id: linkData.user_id,
      event_type: 'click',
      ip_address: clientIP,
      user_agent: userAgent,
      referrer: referrer,
      device_type: deviceInfo.deviceType,
      browser: deviceInfo.browser,
      os: deviceInfo.os,
      country: 'Unknown', // Would be determined by IP geolocation service
      utm_source: getUTMParameter('utm_source'),
      utm_medium: getUTMParameter('utm_medium'),
      utm_campaign: getUTMParameter('utm_campaign'),
      timestamp: new Date().toISOString()
    };
  };

  // Optimized IP detection (uses cached value if available)
  const getClientIPFast = async (): Promise<string | null> => {
    try {
      // Check session cache first
      const cachedIP = sessionStorage.getItem('user_ip');
      if (cachedIP) return cachedIP;

      // Quick IP fetch with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1000); // 1 second timeout

      const response = await fetch('https://api.ipify.org?format=json', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const data = await response.json();
      if (data.ip) {
        sessionStorage.setItem('user_ip', data.ip);
        return data.ip;
      }
    } catch (error) {
      // Return fallback IP for session tracking
      const fallbackIP = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
      sessionStorage.setItem('user_ip', fallbackIP);
      return fallbackIP;
    }
    return null;
  };

  // Simplified user agent parsing for speed
  const parseUserAgentFast = (ua: string) => {
    const lowerUA = ua.toLowerCase();
    
    // Device detection (simplified)
    let deviceType = 'Desktop';
    if (lowerUA.includes('mobile') || lowerUA.includes('android') || lowerUA.includes('iphone')) {
      deviceType = lowerUA.includes('tablet') || lowerUA.includes('ipad') ? 'Tablet' : 'Mobile';
    }
    
    // Browser detection (simplified)
    let browser = 'Other';
    if (lowerUA.includes('chrome') && !lowerUA.includes('edg')) browser = 'Chrome';
    else if (lowerUA.includes('safari') && !lowerUA.includes('chrome')) browser = 'Safari';
    else if (lowerUA.includes('firefox')) browser = 'Firefox';
    else if (lowerUA.includes('edg')) browser = 'Edge';
    
    // OS detection (simplified)
    let os = 'Other';
    if (lowerUA.includes('windows')) os = 'Windows';
    else if (lowerUA.includes('mac')) os = 'macOS';
    else if (lowerUA.includes('linux')) os = 'Linux';
    else if (lowerUA.includes('android')) os = 'Android';
    else if (lowerUA.includes('ios') || lowerUA.includes('iphone') || lowerUA.includes('ipad')) os = 'iOS';
    
    return { deviceType, browser, os };
  };

  // Async click count update (non-blocking)
  const updateClickCountAsync = (linkId: string, currentCount: number) => {
    // Use setTimeout to ensure this doesn't block the redirect
    setTimeout(async () => {
      try {
        await supabase
          .from('links')
          .update({ click_count: currentCount + 1 })
          .eq('id', linkId);
      } catch (error) {
        // Silently handle errors - don't impact user experience
        console.debug('Click count update failed:', error);
      }
    }, 0);
  };

  // Helper function to extract UTM parameters
  const getUTMParameter = (param: string): string | null => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  };

  // Only show error UI if there's actually an error
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

  // Return minimal loading state while redirect happens
  // This should rarely be seen due to immediate redirect
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-sm">Redirecting...</p>
      </div>
    </div>
  );
};

export default LinkRedirect;