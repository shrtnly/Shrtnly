import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { verifyAuthToken, logSecurityEvent } from '../lib/authTokens';
import { supabase } from '../lib/supabase';

const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link. Please check your email for the correct link.');
        return;
      }

      try {
        // Verify the token
        const result = await verifyAuthToken(token, 'email_verification');
        
        if (result.success && result.userId) {
          // Update user's email verification status
          const { error: updateError } = await supabase.auth.admin.updateUserById(
            result.userId,
            { email_confirm: true }
          );

          if (updateError) {
            console.error('Error updating user verification status:', updateError);
          }

          // Log successful verification
          await logSecurityEvent(
            result.userId,
            'email_verified',
            { verification_method: 'email_link' },
            null,
            navigator.userAgent,
            true
          );

          setStatus('success');
          setMessage('Your email has been successfully verified! You can now access all features.');
          
          // Redirect to home page after 3 seconds
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 3000);
          
        } else {
          setStatus('error');
          setMessage(result.error || 'Failed to verify email. The link may be expired or invalid.');
          
          // Log failed verification
          await logSecurityEvent(
            null,
            'email_verification_failed',
            { 
              error: result.error,
              token_provided: !!token 
            },
            null,
            navigator.userAgent,
            false
          );
        }
      } catch (error) {
        console.error('Email verification error:', error);
        setStatus('error');
        setMessage('An unexpected error occurred during verification. Please try again.');
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {status === 'verifying' && (
          <>
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Verifying Email</h1>
              <p className="text-gray-600">
                Please wait while we verify your email address...
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
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h1>
              <p className="text-gray-600 mb-4">
                {message}
              </p>
              <p className="text-sm text-gray-500">
                Redirecting you to the homepage in a few seconds...
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-medium text-green-900">Welcome to Shrtnly!</h3>
                  <p className="text-sm text-green-700 mt-1">
                    You can now create unlimited short links, track analytics, and access all premium features.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/', { replace: true })}
              className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Go to Homepage
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h1>
              <p className="text-gray-600 mb-4">
                {message}
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="text-left">
                <h3 className="font-medium text-red-900 mb-2">Common Issues:</h3>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• The verification link may have expired (24 hours)</li>
                  <li>• The link may have already been used</li>
                  <li>• The link may be incomplete or corrupted</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => navigate('/signin', { replace: true })}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Sign In to Request New Link
              </button>
              
              <button
                onClick={() => navigate('/', { replace: true })}
                className="w-full text-gray-600 hover:text-gray-800 py-2 px-4 text-sm font-medium transition-colors"
              >
                Go to Homepage
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;