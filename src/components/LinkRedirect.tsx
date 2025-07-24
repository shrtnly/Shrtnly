import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const LinkRedirect: React.FC = () => {
  const { shortCode } = useParams<{ shortCode: string }>();

  useEffect(() => {
    if (!shortCode) {
      // Invalid short code - redirect to home
      window.location.href = '/';
      return;
    }

    // Immediately start the redirect process
    redirectToOriginalUrl();
  }, [shortCode]);

  const redirectToOriginalUrl = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('links')
        .select('*')
        .eq('short_code', shortCode)
        .eq('is_active', true)
        .single();

      if (fetchError || !data) {
        // Link not found - redirect to home
        window.location.href = '/';
        return;
      }

      // Update click count in background (don't wait for it)
      supabase
        .from('links')
        .update({ click_count: data.click_count + 1 })
        .eq('id', data.id)
        .then(() => {})
        .catch(() => {}); // Silently handle errors for click tracking

      // Track click event in analytics
      if (data.user_id) {
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
            link_id: data.id,
            user_id: data.user_id,
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
      window.location.href = data.original_url;

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

  // Return completely empty component - no UI elements at all
  return null;
};

export default LinkRedirect;