import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Download, Share2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface QRCodeGeneratorProps {
  url: string;
  title?: string;
  size?: number;
  className?: string;
  linkId?: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ 
  url, 
  title = 'QR Code', 
  size = 200,
  className = '',
  linkId
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    generateQRCode();
  }, [url, size]);

  const generateQRCode = async () => {
    if (!canvasRef.current || !url) return;

    setIsGenerating(true);
    setError(null);

    try {
      await QRCode.toCanvas(canvasRef.current, url, {
        width: size,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'M'
      });
    } catch (err) {
      console.error('Error generating QR code:', err);
      setError('Failed to generate QR code');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (!canvasRef.current) return;

    // Track QR generation event
    if (user && linkId) {
      // Get client information for analytics
      import('../lib/ipUtils').then(async ({ getClientIP }) => {
        const clientIP = await getClientIP();
        const userAgent = navigator.userAgent;
        const referrer = document.referrer;
        
        // Parse user agent for device info
        const parseUserAgent = (ua: string) => {
          const lowerUA = ua.toLowerCase();
          let deviceType = 'Desktop';
          let browser = 'Other';
          let os = 'Other';
          
          if (lowerUA.includes('mobile') || lowerUA.includes('android') || lowerUA.includes('iphone')) {
            deviceType = 'Mobile';
          } else if (lowerUA.includes('tablet') || lowerUA.includes('ipad')) {
            deviceType = 'Tablet';
          }
          
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
            link_id: linkId,
            user_id: user.id,
            event_type: 'qr_scan',
            ip_address: clientIP,
            user_agent: userAgent,
            referrer: referrer,
            device_type: deviceType,
            browser: browser,
            os: os,
            country: 'Unknown',
            utm_source: new URLSearchParams(window.location.search).get('utm_source'),
            utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
            utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
          })
          .then(() => {})
          .catch(() => {}); // Silently handle errors
      });
    }
    
    const link = document.createElement('a');
    link.download = `qr-code-${title.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  const shareQRCode = async () => {
    if (!canvasRef.current) return;

    try {
      const canvas = canvasRef.current;
      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const file = new File([blob], 'qr-code.png', { type: 'image/png' });
        
        if (navigator.share && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `QR Code for ${title}`,
            text: `Scan this QR code to visit: ${url}`,
            files: [file]
          });
        } else {
          // Fallback: copy URL to clipboard
          await navigator.clipboard.writeText(url);
          alert('QR code URL copied to clipboard!');
        }
      });
    } catch (err) {
      console.error('Error sharing QR code:', err);
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">QR Code</h3>
        
        <div className="relative inline-block">
          {isGenerating && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
          
          {error ? (
            <div className="flex items-center justify-center w-48 h-48 bg-gray-100 rounded-lg text-gray-500 text-sm">
              {error}
            </div>
          ) : (
            <canvas
              ref={canvasRef}
              className="border border-gray-200 rounded-lg"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          )}
        </div>

        <p className="text-sm text-gray-600 mt-3 mb-4">
          Scan with your mobile device to visit the link
        </p>

        <div className="flex gap-2 justify-center">
          <button
            onClick={downloadQRCode}
            disabled={isGenerating || !!error}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            aria-label="Download QR code as PNG image"
          >
            <Download size={16} />
            Download
          </button>
          
          <button
            onClick={shareQRCode}
            disabled={isGenerating || !!error}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            aria-label="Share QR code"
          >
            <Share2 size={16} />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;