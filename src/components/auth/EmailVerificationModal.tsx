import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle, AlertCircle, Clock, RefreshCw } from 'lucide-react';
import Modal from '../Modal';
import { createAuthToken, logSecurityEvent } from '../../lib/authTokens';
import { useAuth } from '../../contexts/AuthContext';

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  userId: string;
}

const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({
  isOpen,
  onClose,
  email,
  userId
}) => {
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const handleResendVerification = async () => {
    if (resendCooldown > 0 || isResending) return;

    setIsResending(true);
    setMessage(null);

    try {
      const result = await createAuthToken(userId, 'email_verification', email);
      
      if (result.success) {
        setMessage({
          type: 'success',
          text: 'Verification email sent successfully! Please check your inbox.'
        });
        setResendCooldown(60); // 60 second cooldown
        
        // Log successful resend
        await logSecurityEvent(
          userId,
          'email_verification_resent',
          { email },
          null,
          navigator.userAgent,
          true
        );
      } else {
        setMessage({
          type: 'error',
          text: result.error || 'Failed to send verification email. Please try again.'
        });
        
        // Log failed resend
        await logSecurityEvent(
          userId,
          'email_verification_resend_failed',
          { email, error: result.error },
          null,
          navigator.userAgent,
          false
        );
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsResending(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Email Verification Required"
      className="max-w-md"
    >
      <div className="text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Check Your Email
          </h3>
          <p className="text-gray-600">
            We've sent a verification link to:
          </p>
          <p className="font-medium text-gray-900 mt-1 break-all">
            {email}
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-left">
              <h4 className="font-medium text-blue-900 mb-1">Next Steps:</h4>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. Check your email inbox (and spam folder)</li>
                <li>2. Click the verification link in the email</li>
                <li>3. Return here to start using your account</li>
              </ol>
            </div>
          </div>
        </div>

        {message && (
          <div className={`p-3 rounded-lg mb-4 ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            <div className="flex items-center gap-2">
              {message.type === 'success' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              <span className="text-sm">{message.text}</span>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={handleResendVerification}
            disabled={isResending || resendCooldown > 0}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isResending ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : resendCooldown > 0 ? (
              <>
                <Clock className="w-4 h-4" />
                Resend in {formatTime(resendCooldown)}
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                Resend Verification Email
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="w-full text-gray-600 hover:text-gray-800 py-2 px-4 text-sm font-medium transition-colors"
          >
            I'll verify later
          </button>
        </div>

        <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs text-yellow-800">
                <strong>Security Notice:</strong> The verification link will expire in 24 hours. 
                If you don't receive the email within a few minutes, check your spam folder or try resending.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EmailVerificationModal;