import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { logSecurityEvent } from '../lib/authTokens';

const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          setStatus('error');
          setMessage('Authentication failed. Please try again.');
          
          await logSecurityEvent(
            null,
            'oauth_callback_failed',
            { error: error.message },
            null,
            navigator.userAgent,
            false
          );
          
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 3000);
          return;
        }

        if (data.session && data.session.user) {
          const user = data.session.user;
          
          // Check if this is a new user (first time OAuth login)
          const { data: existingProfile } = await supabase
            .from('user_profiles')
            .select('id')
            .eq('id', user.id)
            .single();

          if (!existingProfile) {
            // Create user profile for new OAuth user
            const { error: profileError } = await supabase
              .from('user_profiles')
              .insert({
                id: user.id,
                email: user.email || '',
                full_name: user.user_metadata?.full_name || user.user_metadata?.name || '',
              });

            if (profileError) {
              console.error('Error creating user profile:', profileError);
            }
          }

          setStatus('success');
          setMessage('Successfully signed in! Redirecting...');
          
          await logSecurityEvent(
            user.id,
            'oauth_signin_successful',
            { 
              provider: user.app_metadata?.provider || 'unknown',
              email: user.email 
            },
            null,
            navigator.userAgent,
            true
          );
          
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 2000);
        } else {
          setStatus('error');
          setMessage('No authentication session found. Please try signing in again.');
          
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 3000);
        }
      } catch (err) {
        console.error('Unexpected auth callback error:', err);
        setStatus('error');
        setMessage('An unexpected error occurred. Please try again.');
        
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 3000);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {status === 'processing' && (
          <>
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Completing Sign In</h1>
              <p className="text-gray-600">
                Please wait while we complete your authentication...
              </p>
            </div>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome!</h1>
              <p className="text-gray-600">
                {message}
              </p>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Authentication Failed</h1>
              <p className="text-gray-600 mb-4">
                {message}
              </p>
            </div>

            <button
              onClick={() => navigate('/', { replace: true })}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Return to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthCallbackPage;