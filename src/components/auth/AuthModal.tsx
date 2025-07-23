import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Github } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Modal from '../Modal';
import PasswordResetModal from './PasswordResetModal';
import EmailVerificationModal from './EmailVerificationModal';
import { createAuthToken, logSecurityEvent } from '../../lib/authTokens';
import { supabase } from '../../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'signin' }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [pendingVerification, setPendingVerification] = useState<{
    email: string;
    userId: string;
  } | null>(null);

  const { signUp, signIn } = useAuth();

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      fullName: '',
      confirmPassword: '',
    });
    setError(null);
    setSuccess(null);
    setShowPasswordReset(false);
    setShowEmailVerification(false);
    setPendingVerification(null);
  };

  const handleModeSwitch = (newMode: 'signin' | 'signup') => {
    setMode(newMode);
    resetForm();
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('Email address is required');
      return false;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!formData.password) {
      setError('Password is required');
      return false;
    }

    if (mode === 'signup') {
      if (!formData.fullName.trim()) {
        setError('Full name is required');
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      if (mode === 'signup') {
        const { error } = await signUp(formData.email, formData.password, formData.fullName);
        
        if (error) {
          if (error.message.includes('already registered')) {
            setError('An account with this email already exists. Please sign in instead.');
          } else if (error.message.includes('invalid email')) {
            setError('Please enter a valid email address');
          } else if (error.message.includes('weak password')) {
            setError('Password is too weak. Please choose a stronger password.');
          } else {
            setError(error.message);
          }
          
          await logSecurityEvent(
            null,
            'signup_failed',
            { email: formData.email, error: error.message },
            null,
            navigator.userAgent,
            false
          );
        } else {
          setSuccess('Account created successfully! Please check your email for confirmation.');
          
          // Get the user ID from the response
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            // Create email verification token
            const tokenResult = await createAuthToken(user.id, 'email_verification', formData.email);
            
            if (tokenResult.success) {
              setPendingVerification({
                email: formData.email,
                userId: user.id
              });
              
              setTimeout(() => {
                setShowEmailVerification(true);
              }, 2000);
              
              await logSecurityEvent(
                user.id,
                'signup_successful',
                { email: formData.email },
                null,
                navigator.userAgent,
                true
              );
            } else {
              setError('Account created but failed to send verification email. Please try signing in.');
            }
          }
        }
      } else {
        const { error } = await signIn(formData.email, formData.password);
        
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            setError('Invalid email or password. Please check your credentials and try again.');
          } else if (error.message.includes('Email not confirmed')) {
            setError('Please verify your email address before signing in. Check your inbox for a verification link.');
          } else if (error.message.includes('Too many requests')) {
            setError('Too many login attempts. Please wait a few minutes before trying again.');
          } else {
            setError(error.message);
          }
          
          await logSecurityEvent(
            null,
            'signin_failed',
            { email: formData.email, error: error.message },
            null,
            navigator.userAgent,
            false
          );
        } else {
          setSuccess('Successfully signed in!');
          setTimeout(() => {
            onClose();
            resetForm();
          }, 1000);
          
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            await logSecurityEvent(
              user.id,
              'signin_successful',
              { email: formData.email },
              null,
              navigator.userAgent,
              true
            );
          }
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Authentication error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        setError('Failed to sign in with Google. Please try again.');
        await logSecurityEvent(
          null,
          'google_signin_failed',
          { error: error.message },
          null,
          navigator.userAgent,
          false
        );
      }
    } catch (err) {
      setError('An unexpected error occurred with Google sign-in.');
      console.error('Google sign-in error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        setError('Failed to sign in with GitHub. Please try again.');
        await logSecurityEvent(
          null,
          'github_signin_failed',
          { error: error.message },
          null,
          navigator.userAgent,
          false
        );
      }
    } catch (err) {
      setError('An unexpected error occurred with GitHub sign-in.');
      console.error('GitHub sign-in error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    // Clear errors when user starts typing
    if (error) setError(null);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'signin' ? 'Sign In' : 'Create Account'}
      className="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required={mode === 'signup'}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your full name"
              />
            </div>
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mode === 'signup' && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required={mode === 'signup'}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Confirm your password"
              />
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              {mode === 'signin' ? 'Signing In...' : 'Creating Account...'}
            </div>
          ) : (
            mode === 'signin' ? 'Sign In' : 'Create Account'
          )}
        </button>

        {/* Social Authentication */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>

          <button
            type="button"
            onClick={handleGitHubSignIn}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
          </button>
        </div>

        <div className="text-center space-y-2">
          <button
            type="button"
            onClick={() => handleModeSwitch(mode === 'signin' ? 'signup' : 'signin')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            {mode === 'signin' 
              ? "Don't have an account? Sign up" 
              : "Already have an account? Sign in"
            }
          </button>
          
          {mode === 'signin' && (
            <div>
              <button
                type="button"
                onClick={() => setShowPasswordReset(true)}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
              >
                Forgot your password?
              </button>
            </div>
          )}
        </div>
      </form>
      
      <PasswordResetModal
        isOpen={showPasswordReset}
        onClose={() => setShowPasswordReset(false)}
      />
      
      {pendingVerification && (
        <EmailVerificationModal
          isOpen={showEmailVerification}
          onClose={() => {
            setShowEmailVerification(false);
            onClose();
          }}
          email={pendingVerification.email}
          userId={pendingVerification.userId}
        />
      )}
    </Modal>
  );
};

export default AuthModal;