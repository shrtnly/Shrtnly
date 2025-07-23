// Utility functions for IP address handling

export const getClientIP = async (): Promise<string | null> => {
  try {
    // Check if IP is already cached in session storage
    const cachedIP = sessionStorage.getItem('user_ip');
    if (cachedIP && isValidIP(cachedIP)) {
      return cachedIP;
    }

    // Try to get IP from external service
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      
      if (data.ip && isValidIP(data.ip)) {
        // Cache the IP for the session
        sessionStorage.setItem('user_ip', data.ip);
        return data.ip;
      }
    } catch (error) {
      console.warn('Failed to get IP from external service:', error);
    }

    // Fallback: generate a session-based identifier
    let sessionIP = sessionStorage.getItem('session_ip');
    if (!sessionIP) {
      // Generate a pseudo-IP for session tracking
      sessionIP = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
      sessionStorage.setItem('session_ip', sessionIP);
    }
    
    return sessionIP;
  } catch (error) {
    console.error('Error getting client IP:', error);
    // Final fallback
    return `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  }
};

export const isValidIP = (ip: string): boolean => {
  // Basic IP validation (IPv4 and IPv6)
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
};

export const formatIP = (ip: string | null): string => {
  if (!ip) return 'Unknown';
  
  // Mask the last part of IPv4 for privacy display
  if (ip.includes('.')) {
    const parts = ip.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.***`;
    }
  }
  
  // For IPv6, show only first few segments
  if (ip.includes(':')) {
    const parts = ip.split(':');
    if (parts.length > 2) {
      return `${parts[0]}:${parts[1]}:***`;
    }
  }
  
  return ip;
};