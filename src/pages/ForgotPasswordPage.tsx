import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { createAuthToken, logSecurityEvent } from '../lib/authTokens';
import { supabase } from '../lib/supabase';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'request' | 'sent'>('request');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!email.trim()) {
      setError('Email address is required');
      setIsLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      // Check if user exists
      const { data: userData, error: userError } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('email', email.toLowerCase().trim())
        .single();

      if (userError || !userData) {
        // Don't reveal if email exists or not for security
        setStep('sent');
        setIsLoading(false);
        return;
      }

      // Create password reset token
      const result = await createAuthToken(userData.id, 'password_reset', email);
      
      if (result.success) {
        setStep('sent');
        
        await logSecurityEvent(
          userData.id,
          'password_reset_requested',
          { email },
          null,
          navigator.userAgent,
          true
        );
      } else {
        setError(result.error || 'Failed to send reset email. Please try again.');
        
        await logSecurityEvent(
          userData.id,
          'password_reset_request_failed',
          { email, error: result.error },
          null,
          navigator.userAgent,
          false
        );
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Password reset error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        {step === 'request' ? (
          <>
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password</h1>
              <p className="text-gray-600">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your email address"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !email.trim()}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Sending Reset Link...
                  </div>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h1>
              <p className="text-gray-600 mb-4">
                If an account with that email exists, we've sent a password reset link to:
              </p>
              <p className="font-medium text-gray-900 mb-6 break-all">
                {email}
              </p>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <h3 className="font-medium text-blue-900 mb-1">Next Steps:</h3>
                    <ol className="text-sm text-blue-800 space-y-1">
                      <li>1. Check your email inbox (and spam folder)</li>
                      <li>2. Click the reset link in the email</li>
                      <li>3. Create a new password</li>
                      <li>4. Sign in with your new password</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  to="/"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors inline-block text-center"
                >
                  Return to Home
                </Link>

                <button
                  onClick={() => setStep('request')}
                  className="w-full text-gray-600 hover:text-gray-800 py-2 px-4 text-sm font-medium transition-colors"
                >
                  Try a different email
                </button>
              </div>

              <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-xs text-yellow-800">
                      <strong>Important:</strong> The reset link will expire in 24 hours for security. 
                      If you don't receive the email, check your spam folder.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;