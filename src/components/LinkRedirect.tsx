import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';

const LinkRedirect: React.FC = () => {
  const { shortCode } = useParams<{ shortCode: string }>();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!shortCode) {
      window.location.replace('/');
      return;
    }
    performOptimizedRedirect();
  }, [shortCode]);

  const performOptimizedRedirect = async () => {
    try {
      const { data: linkData, error: fetchError } = await supabase
        .from('links')
        .select('id, original_url, user_id, click_count, is_active')
        .eq('short_code', shortCode)
        .eq('is_active', true)
        .single();

      if (fetchError || !linkData) {
        setError(true);
        setTimeout(() => {
          window.location.replace('/');
        }, 2000);
        return;
      }

      window.location.replace(linkData.original_url);
      handleBackgroundAnalytics(linkData);

    } catch (err) {
      setError(true);
      setTimeout(() => {
        window.location.replace('/');
      }, 2000);
    }
  };

  const handleBackgroundAnalytics = async (linkData: any) => {
    try {
      const analyticsData = await prepareAnalyticsData(linkData);

      const payload = JSON.stringify({ type: 'link_analytics', data: analyticsData });
      const url = `${window.location.origin}/api/analytics`;

      if (navigator.sendBeacon) {
        navigator.sendBeacon(url, payload);
      } else {
        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }

      updateClickCountAsync(linkData.id, linkData.click_count);
    } catch (error) {
      console.debug('Analytics failed:', error);
    }
  };

  const prepareAnalyticsData = async (linkData: any) => {
    const clientIP = await getClientIPFast();
    const userAgent = navigator.userAgent;
    const referrer = document.referrer;
    const deviceInfo = parseUserAgentFast(userAgent);

    return {
      link_id: linkData.id,
      user_id: linkData.user_id,
      event_type: 'click',
      ip_address: clientIP,
      user_agent: userAgent,
      referrer,
      device_type: deviceInfo.deviceType,
      browser: deviceInfo.browser,
      os: deviceInfo.os,
      country: 'Unknown',
      utm_source: getUTMParameter('utm_source'),
      utm_medium: getUTMParameter('utm_medium'),
      utm_campaign: getUTMParameter('utm_campaign'),
      timestamp: new Date().toISOString(),
    };
  };

  const getClientIPFast = async (): Promise<string | null> => {
    try {
      const cachedIP = sessionStorage.getItem('user_ip');
      if (cachedIP) return cachedIP;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1000);
      const response = await fetch('https://api.ipify.org?format=json', { signal: controller.signal });
      clearTimeout(timeoutId);

      const data = await response.json();
      if (data.ip) {
        sessionStorage.setItem('user_ip', data.ip);
        return data.ip;
      }
    } catch {
      const fallbackIP = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
      sessionStorage.setItem('user_ip', fallbackIP);
      return fallbackIP;
    }
    return null;
  };

  const parseUserAgentFast = (ua: string) => {
    const lowerUA = ua.toLowerCase();
    let deviceType = 'Desktop';
    if (lowerUA.includes('mobile') || lowerUA.includes('android') || lowerUA.includes('iphone')) {
      deviceType = lowerUA.includes('tablet') || lowerUA.includes('ipad') ? 'Tablet' : 'Mobile';
    }

    let browser = 'Other';
    if (lowerUA.includes('chrome') && !lowerUA.includes('edg')) browser = 'Chrome';
    else if (lowerUA.includes('safari') && !lowerUA.includes('chrome')) browser = 'Safari';
    else if (lowerUA.includes('firefox')) browser = 'Firefox';
    else if (lowerUA.includes('edg')) browser = 'Edge';

    let os = 'Other';
    if (lowerUA.includes('windows')) os = 'Windows';
    else if (lowerUA.includes('mac')) os = 'macOS';
    else if (lowerUA.includes('linux')) os = 'Linux';
    else if (lowerUA.includes('android')) os = 'Android';
    else if (lowerUA.includes('ios') || lowerUA.includes('iphone') || lowerUA.includes('ipad')) os = 'iOS';

    return { deviceType, browser, os };
  };

  const updateClickCountAsync = (linkId: string, currentCount: number) => {
    setTimeout(async () => {
      try {
        await supabase
          .from('links')
          .update({ click_count: currentCount + 1 })
          .eq('id', linkId);
      } catch (error) {
        console.debug('Click count update failed:', error);
      }
    }, 0);
  };

  const getUTMParameter = (param: string): string | null => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  };

  // Only render UI when there's an error
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

  // Show nothing (pure redirect with no UI)
  return null;
};

export default LinkRedirect;
