import React, { useState, useEffect, useRef } from 'react';
import { Eye, Calendar, ExternalLink, Trash2, User, Share2, ArrowLeft, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Link } from '../types';
import { useAnnouncement } from '../hooks/useFocusManagement';
import { useAuth } from '../contexts/AuthContext';

interface RecentLinksProps {
  newLink: Link | null;
}

const RecentLinks: React.FC<RecentLinksProps> = ({ newLink }) => {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(3);
  const [hasMore, setHasMore] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const { announce } = useAnnouncement();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchRecentLinks();
    } else {
      setLinks([]);
      setLoading(false);
    }
  }, [user, currentPage]);

  useEffect(() => {
    if (newLink) {
      setLinks(prev => [newLink, ...prev.slice(0, pageSize - 1)]);
    }
  }, [newLink, pageSize]);

  const fetchRecentLinks = async () => {
    setLoading(true);
    try {
      const from = currentPage * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from('links')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .range(from, to);

      if (user) {
        query = query.eq('user_id', user.id);
      } else {
        setLinks([]);
        setLoading(false);
        return;
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching links:', error);
        return;
      }

      setLinks(data || []);
      setHasMore((data?.length || 0) === pageSize);
    } catch (err) {
      console.error('Error fetching recent links:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const deleteLink = async (linkId: string) => {
    try {
      const { error } = await supabase
        .from('links')
        .update({ is_active: false })
        .eq('id', linkId)
        .eq('user_id', user?.id);

      if (error) {
        announce('Failed to delete link', 'assertive');
        return;
      }

      setLinks(prev => prev.filter(link => link.id !== linkId));
      announce('Link deleted successfully', 'polite');
    } catch (err) {
      console.error('Error deleting link:', err);
      announce('Failed to delete link', 'assertive');
    }
  };

  const sharelink = async (shortCode: string) => {
    const shareUrl = `${window.location.origin}/${shortCode}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this link',
          url: shareUrl,
        });
        announce('Link shared successfully!', 'polite');
      } catch (error: any) {
        if (error.name === 'NotAllowedError') {
          // Permission denied: fallback to clipboard copy
          try {
            await navigator.clipboard.writeText(shareUrl);
            announce('Link copied to clipboard.', 'polite');
          } catch (err) {
            console.error('Could not copy link:', err);
            announce('Failed to copy link.', 'assertive');
          }
        } else {
          console.error('Error sharing link:', error);
          announce('Failed to share link.', 'assertive');
        }
      }
    } else {
      // If navigator.share is not available at all
      try {
        await navigator.clipboard.writeText(shareUrl);
        announce('Link copied to clipboard.', 'polite');
      } catch (err) {
        console.error('Could not copy link:', err);
        announce('Failed to copy link.', 'assertive');
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Recent Links</h2>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <User className="w-6 h-6 text-blue-600" />
          <h3 className="text-2xl font-bold text-gray-900">
            {user ? 'Links' : 'Recent Links'}
          </h3>
        </div>
        {user && (
          <div className="text-xs text-gray-400">
            {user.email}
          </div>
        )}
      </div>

      <div
        ref={listRef}
        className="space-y-4"
        id="recent-links"
        aria-live="polite"
        aria-label="Recently created short links"
      >
        {links.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            {user
              ? 'No links created yet. Create your first short link above!'
              : 'Sign in to see your recent links and track analytics.'}
          </p>
        ) : (
          links.map((link) => (
            <div
              key={link.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">
                    {link.title || 'Untitled Link'}
                  </h3>

                  <p className="text-sm text-blue-600 font-mono truncate">
                    {window.location.origin}/{link.short_code}
                  </p>

                  <p className="text-sm text-gray-500 truncate mt-1">
                    → {link.original_url}
                  </p>

                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Eye size={12} />
                      {link.click_count} visits
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(link.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <a
                    href={link.original_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={`Open ${link.title || 'link'} in new tab`}
                  >
                    <ExternalLink size={16} />
                  </a>

                  <button
                    onClick={() => sharelink(link.short_code)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={`Share ${link.title || 'link'}`}
                  >
                    <Share2 size={16} />
                  </button>

                  <button
                    onClick={() => deleteLink(link.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                    aria-label={`Delete ${link.title || 'link'}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded ${currentPage === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
          aria-label="Previous Page"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNextPage}
          disabled={!hasMore}
          className={`px-4 py-2 rounded ${!hasMore ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
          aria-label="Next Page"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default RecentLinks;
