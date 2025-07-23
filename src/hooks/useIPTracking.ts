import { useState, useEffect } from 'react';
import { getClientIP } from '../lib/ipUtils';

export const useIPTracking = () => {
  const [clientIP, setClientIP] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const ip = await getClientIP();
        setClientIP(ip);
      } catch (error) {
        console.error('Failed to get client IP:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIP();
  }, []);

  return { clientIP, isLoading };
};