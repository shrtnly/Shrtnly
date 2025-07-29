// Geographic utilities for IP-based location detection

export interface LocationData {
  country: string;
  countryCode: string;
  city: string;
  region: string;
  latitude?: number;
  longitude?: number;
}

// Free IP geolocation services
const GEO_SERVICES = [
  'https://ipapi.co/json/',
  'https://ip-api.com/json/',
  'https://ipinfo.io/json',
  'https://api.ipgeolocation.io/ipgeo?apiKey=free'
];

export const getLocationFromIP = async (ip?: string): Promise<LocationData | null> => {
  try {
    // Try multiple services for better reliability
    for (const service of GEO_SERVICES) {
      try {
        const url = ip ? `${service}?ip=${ip}` : service;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) continue;

        const data = await response.json();
        
        // Normalize response format from different services
        let locationData: LocationData | null = null;

        if (service.includes('ipapi.co')) {
          locationData = {
            country: data.country_name || 'Unknown',
            countryCode: data.country_code || 'XX',
            city: data.city || 'Unknown',
            region: data.region || 'Unknown',
            latitude: data.latitude,
            longitude: data.longitude
          };
        } else if (service.includes('ip-api.com')) {
          locationData = {
            country: data.country || 'Unknown',
            countryCode: data.countryCode || 'XX',
            city: data.city || 'Unknown',
            region: data.regionName || 'Unknown',
            latitude: data.lat,
            longitude: data.lon
          };
        } else if (service.includes('ipinfo.io')) {
          locationData = {
            country: data.country || 'Unknown',
            countryCode: data.country || 'XX',
            city: data.city || 'Unknown',
            region: data.region || 'Unknown',
            latitude: data.loc ? parseFloat(data.loc.split(',')[0]) : undefined,
            longitude: data.loc ? parseFloat(data.loc.split(',')[1]) : undefined
          };
        }

        if (locationData && locationData.country !== 'Unknown') {
          // Cache the result
          sessionStorage.setItem('user_location', JSON.stringify(locationData));
          return locationData;
        }
      } catch (error) {
        console.warn(`Geo service ${service} failed:`, error);
        continue;
      }
    }

    // Fallback: check cached location
    const cachedLocation = sessionStorage.getItem('user_location');
    if (cachedLocation) {
      return JSON.parse(cachedLocation);
    }

    return null;
  } catch (error) {
    console.error('Error getting location:', error);
    return null;
  }
};

// Enhanced country detection with multiple fallback methods
export const detectUserCountry = async (): Promise<string> => {
  try {
    // Method 1: Check cached location
    const cachedLocation = sessionStorage.getItem('user_location');
    if (cachedLocation) {
      const location = JSON.parse(cachedLocation);
      if (location.country && location.country !== 'Unknown') {
        return location.country;
      }
    }

    // Method 2: Try to get location from IP
    const location = await getLocationFromIP();
    if (location && location.country !== 'Unknown') {
      return location.country;
    }

    // Method 3: Browser language/locale detection
    const browserCountry = getBrowserCountry();
    if (browserCountry !== 'Unknown') {
      return browserCountry;
    }

    // Method 4: Timezone-based detection
    const timezoneCountry = getCountryFromTimezone();
    if (timezoneCountry !== 'Unknown') {
      return timezoneCountry;
    }

    return 'Unknown';
  } catch (error) {
    console.error('Error detecting user country:', error);
    return 'Unknown';
  }
};

// Get country from browser language/locale
export const getBrowserCountry = (): string => {
  try {
    const language = navigator.language || navigator.languages?.[0];
    if (!language) return 'Unknown';

    // Extract country code from locale (e.g., 'en-US' -> 'US')
    const countryCode = language.split('-')[1];
    if (!countryCode) return 'Unknown';

    // Map country codes to country names
    const countryMap: Record<string, string> = {
      'US': 'United States',
      'CA': 'Canada',
      'GB': 'United Kingdom',
      'DE': 'Germany',
      'FR': 'France',
      'JP': 'Japan',
      'AU': 'Australia',
      'BR': 'Brazil',
      'IN': 'India',
      'CN': 'China',
      'RU': 'Russia',
      'IT': 'Italy',
      'ES': 'Spain',
      'NL': 'Netherlands',
      'SE': 'Sweden',
      'NO': 'Norway',
      'DK': 'Denmark',
      'FI': 'Finland',
      'KR': 'South Korea',
      'MX': 'Mexico',
      'AR': 'Argentina',
      'CL': 'Chile',
      'CO': 'Colombia',
      'PE': 'Peru',
      'VE': 'Venezuela',
      'ZA': 'South Africa',
      'EG': 'Egypt',
      'NG': 'Nigeria',
      'KE': 'Kenya',
      'MA': 'Morocco'
    };

    return countryMap[countryCode.toUpperCase()] || 'Unknown';
  } catch (error) {
    return 'Unknown';
  }
};

// Get country from timezone
export const getCountryFromTimezone = (): string => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!timezone) return 'Unknown';

    // Map common timezones to countries
    const timezoneMap: Record<string, string> = {
      'America/New_York': 'United States',
      'America/Los_Angeles': 'United States',
      'America/Chicago': 'United States',
      'America/Denver': 'United States',
      'America/Toronto': 'Canada',
      'America/Vancouver': 'Canada',
      'Europe/London': 'United Kingdom',
      'Europe/Berlin': 'Germany',
      'Europe/Paris': 'France',
      'Europe/Rome': 'Italy',
      'Europe/Madrid': 'Spain',
      'Europe/Amsterdam': 'Netherlands',
      'Europe/Stockholm': 'Sweden',
      'Europe/Oslo': 'Norway',
      'Europe/Copenhagen': 'Denmark',
      'Europe/Helsinki': 'Finland',
      'Asia/Tokyo': 'Japan',
      'Asia/Seoul': 'South Korea',
      'Asia/Shanghai': 'China',
      'Asia/Mumbai': 'India',
      'Asia/Kolkata': 'India',
      'Australia/Sydney': 'Australia',
      'Australia/Melbourne': 'Australia',
      'America/Sao_Paulo': 'Brazil',
      'America/Mexico_City': 'Mexico',
      'America/Buenos_Aires': 'Argentina',
      'Africa/Cairo': 'Egypt',
      'Africa/Lagos': 'Nigeria',
      'Africa/Johannesburg': 'South Africa'
    };

    return timezoneMap[timezone] || 'Unknown';
  } catch (error) {
    return 'Unknown';
  }
};

// Enhanced country name standardization
export const standardizeCountryName = (country: string): string => {
  if (!country || country.toLowerCase() === 'unknown') return 'Unknown';

  const countryMappings: Record<string, string> = {
    'usa': 'United States',
    'us': 'United States',
    'america': 'United States',
    'uk': 'United Kingdom',
    'britain': 'United Kingdom',
    'england': 'United Kingdom',
    'deutschland': 'Germany',
    'brasil': 'Brazil',
    'espana': 'Spain',
    'italia': 'Italy',
    'nederland': 'Netherlands',
    'россия': 'Russia',
    '中国': 'China',
    '日本': 'Japan',
    '한국': 'South Korea',
    'south korea': 'South Korea',
    'north korea': 'North Korea'
  };

  const normalized = country.toLowerCase().trim();
  return countryMappings[normalized] || 
         country.charAt(0).toUpperCase() + country.slice(1).toLowerCase();
};

// Get comprehensive location data
export const getComprehensiveLocation = async (): Promise<LocationData> => {
  try {
    // Try IP-based detection first
    const ipLocation = await getLocationFromIP();
    if (ipLocation && ipLocation.country !== 'Unknown') {
      return ipLocation;
    }

    // Fallback to browser-based detection
    const browserCountry = getBrowserCountry();
    const timezoneCountry = getCountryFromTimezone();
    
    return {
      country: browserCountry !== 'Unknown' ? browserCountry : timezoneCountry,
      countryCode: 'XX',
      city: 'Unknown',
      region: 'Unknown'
    };
  } catch (error) {
    console.error('Error getting comprehensive location:', error);
    return {
      country: 'Unknown',
      countryCode: 'XX',
      city: 'Unknown',
      region: 'Unknown'
    };
  }
};