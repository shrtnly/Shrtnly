import { Link as RouterLink } from 'react-router-dom';
import React, { useState, useRef } from 'react';
import { nanoid } from 'nanoid';
import { Link2, Copy, Check, ChevronDown, ChevronUp, Settings, BarChart3 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { CreateLinkData, Link } from '../types';
import { useAnnouncement } from '../hooks/useFocusManagement';
import { useIPTracking } from '../hooks/useIPTracking';
import { useAuth } from '../contexts/AuthContext';
import QRCodeGenerator from './QRCodeGenerator';

const MAX_ALIAS_LENGTH = 10;
const AUTO_CODE_LENGTH = 5;

interface LinkFormProps {
  onLinkCreated: (link: Link) => void;
}

const LinkForm: React.FC<LinkFormProps> = ({ onLinkCreated }) => {
  const [formData, setFormData] = useState<CreateLinkData>({
    original_url: '',
    short_code: '',
    title: '',
    description: '',
    custom_domain: 'shrtnly.pro'
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
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'original_url') {
      const url = value.trim();
      setUrlValid(url === '' ? null : validateUrl(url));
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const generateShortCode = (): string => nanoid(AUTO_CODE_LENGTH);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const { original_url, short_code } = formData;

    if (short_code && short_code.length > MAX_ALIAS_LENGTH) {
      setError(`Custom alias must be less than ${MAX_ALIAS_LENGTH + 1} characters.`);
      setIsLoading(false);
      return;
    }

    if (!original_url.trim()) {
      setError('Please enter a URL to shorten');
      setIsLoading(false);
      return;
    }

    if (!validateUrl(original_url)) {
      setError('Please enter a valid URL (include https:// or http://)');
      setIsLoading(false);
      return;
    }

    const shortCode = short_code || generateShortCode();

    try {
      const { data, error: supabaseError } = await supabase
        .from('links')
        .insert({
          original_url,
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
      setFormData({ original_url: '', short_code: '', title: '', description: '', custom_domain: 'shrtnly.pro' });
      announce('Short link created successfully', 'assertive');

      setTimeout(() => resultRef.current?.focus(), 100);

      if (user && data) {
        const ua = navigator.userAgent.toLowerCase();
        const referrer = document.referrer;

        const deviceType = /mobile|android|iphone/.test(ua) ? 'Mobile' : /tablet|ipad/.test(ua) ? 'Tablet' : 'Desktop';
        const browser = /chrome/.test(ua) && !/edg/.test(ua) ? 'Chrome'
                      : /safari/.test(ua) && !/chrome/.test(ua) ? 'Safari'
                      : /firefox/.test(ua) ? 'Firefox'
                      : /edg/.test(ua) ? 'Edge'
                      : /opera/.test(ua) ? 'Opera' : 'Other';
        const os = /windows/.test(ua) ? 'Windows'
                 : /mac|darwin/.test(ua) ? 'macOS'
                 : /linux/.test(ua) ? 'Linux'
                 : /android/.test(ua) ? 'Android'
                 : /ios|iphone|ipad/.test(ua) ? 'iOS' : 'Other';

        await supabase.from('link_analytics').insert({
          link_id: data.id,
          user_id: user.id,
          event_type: 'view',
          ip_address: clientIP,
          user_agent: navigator.userAgent,
          referrer,
          device_type: deviceType,
          browser,
          os,
          country: 'Unknown',
          utm_source: new URLSearchParams(window.location.search).get('utm_source'),
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign')
        });
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
    <div className="link-form-wrapper">
      {/* The rest of your JSX goes here as written */}
      {/* ... for brevity, the layout section is omitted here since you provided it completely ... */}
    </div>
  );
};

export default LinkForm;
