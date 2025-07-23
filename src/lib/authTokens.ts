import { supabase } from './supabase';
import { getClientIP } from './ipUtils';

// Secure token generation using Web Crypto API
export const generateSecureToken = (): string => {
  const array = new Uint8Array(32); // 32 bytes = 256 bits
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Hash token for secure storage
export const hashToken = async (token: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Rate limiting check
export const checkRateLimit = async (
  userId: string, 
  tokenType: 'email_verification' | 'password_reset'
): Promise<{ allowed: boolean; waitTime?: number }> => {
  const now = new Date();
  const oneHour = new Date(now.getTime() - 60 * 60 * 1000);
  
  // Check recent attempts
  const { data: recentAttempts } = await supabase
    .from('auth_tokens')
    .select('created_at, attempts')
    .eq('user_id', userId)
    .eq('token_type', tokenType)
    .gte('created_at', oneHour.toISOString())
    .order('created_at', { ascending: false });

  if (!recentAttempts || recentAttempts.length === 0) {
    return { allowed: true };
  }

  // Rate limiting rules
  const maxAttempts = tokenType === 'email_verification' ? 5 : 3;
  const cooldownMinutes = tokenType === 'email_verification' ? 15 : 30;

  const totalAttempts = recentAttempts.reduce((sum, attempt) => sum + (attempt.attempts || 1), 0);
  
  if (totalAttempts >= maxAttempts) {
    const lastAttempt = new Date(recentAttempts[0].created_at);
    const cooldownEnd = new Date(lastAttempt.getTime() + cooldownMinutes * 60 * 1000);
    
    if (now < cooldownEnd) {
      const waitTime = Math.ceil((cooldownEnd.getTime() - now.getTime()) / 1000 / 60);
      return { allowed: false, waitTime };
    }
  }

  return { allowed: true };
};

// Create authentication token
export const createAuthToken = async (
  userId: string,
  tokenType: 'email_verification' | 'password_reset',
  email?: string
): Promise<{ success: boolean; token?: string; error?: string }> => {
  try {
    // Check rate limiting
    const rateLimit = await checkRateLimit(userId, tokenType);
    if (!rateLimit.allowed) {
      return {
        success: false,
        error: `Too many attempts. Please wait ${rateLimit.waitTime} minutes before trying again.`
      };
    }

    // Generate secure token
    const token = generateSecureToken();
    const tokenHash = await hashToken(token);
    
    // Set expiration time
    const expiresAt = new Date();
    if (tokenType === 'email_verification') {
      expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours
    } else {
      expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour
    }

    // Get client info
    const clientIP = await getClientIP();
    const userAgent = navigator.userAgent;

    // Invalidate existing tokens of the same type
    await supabase
      .from('auth_tokens')
      .update({ used_at: new Date().toISOString() })
      .eq('user_id', userId)
      .eq('token_type', tokenType)
      .is('used_at', null);

    // Create new token
    const { error: insertError } = await supabase
      .from('auth_tokens')
      .insert({
        user_id: userId,
        token_hash: tokenHash,
        token_type: tokenType,
        expires_at: expiresAt.toISOString(),
        ip_address: clientIP,
        user_agent: userAgent,
        attempts: 1
      });

    if (insertError) {
      throw insertError;
    }

    // Log security event
    await logSecurityEvent(userId, `${tokenType}_token_created`, {
      token_type: tokenType,
      expires_at: expiresAt.toISOString()
    }, clientIP, userAgent, true);

    // Send email if email is provided
    if (email) {
      await sendAuthEmail(email, token, tokenType);
    }

    return { success: true, token };

  } catch (error) {
    console.error('Error creating auth token:', error);
    return {
      success: false,
      error: 'Failed to create authentication token. Please try again.'
    };
  }
};

// Verify authentication token
export const verifyAuthToken = async (
  token: string,
  tokenType: 'email_verification' | 'password_reset'
): Promise<{ success: boolean; userId?: string; error?: string }> => {
  try {
    const tokenHash = await hashToken(token);
    const now = new Date().toISOString();

    // Find valid token
    const { data: tokenData, error: fetchError } = await supabase
      .from('auth_tokens')
      .select('*')
      .eq('token_hash', tokenHash)
      .eq('token_type', tokenType)
      .is('used_at', null)
      .gt('expires_at', now)
      .single();

    if (fetchError || !tokenData) {
      // Log failed attempt
      await logSecurityEvent(null, `${tokenType}_token_verification_failed`, {
        token_type: tokenType,
        reason: 'invalid_or_expired_token'
      }, await getClientIP(), navigator.userAgent, false);

      return {
        success: false,
        error: 'Invalid or expired token. Please request a new one.'
      };
    }

    // Mark token as used
    const { error: updateError } = await supabase
      .from('auth_tokens')
      .update({ 
        used_at: now,
        attempts: (tokenData.attempts || 0) + 1
      })
      .eq('id', tokenData.id);

    if (updateError) {
      throw updateError;
    }

    // Log successful verification
    await logSecurityEvent(tokenData.user_id, `${tokenType}_token_verified`, {
      token_type: tokenType,
      token_id: tokenData.id
    }, await getClientIP(), navigator.userAgent, true);

    return { success: true, userId: tokenData.user_id };

  } catch (error) {
    console.error('Error verifying auth token:', error);
    return {
      success: false,
      error: 'Failed to verify token. Please try again.'
    };
  }
};

// Send authentication email
export const sendAuthEmail = async (
  email: string,
  token: string,
  type: 'email_verification' | 'password_reset',
  userName?: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { data, error } = await supabase.functions.invoke('send-verification-email', {
      body: {
        email,
        token,
        type: type === 'email_verification' ? 'verification' : 'password_reset',
        userName
      }
    });

    if (error) {
      throw error;
    }

    return { success: true };

  } catch (error) {
    console.error('Error sending auth email:', error);
    return {
      success: false,
      error: 'Failed to send email. Please try again.'
    };
  }
};

// Log security events
export const logSecurityEvent = async (
  userId: string | null,
  eventType: string,
  eventData: any = {},
  ipAddress?: string | null,
  userAgent?: string,
  success: boolean = false
): Promise<void> => {
  try {
    await supabase
      .from('auth_security_logs')
      .insert({
        user_id: userId,
        event_type: eventType,
        event_data: eventData,
        ip_address: ipAddress,
        user_agent: userAgent,
        success
      });
  } catch (error) {
    console.error('Error logging security event:', error);
  }
};

// Clean up expired tokens (should be called periodically)
export const cleanupExpiredTokens = async (): Promise<void> => {
  try {
    await supabase.rpc('cleanup_expired_tokens');
  } catch (error) {
    console.error('Error cleaning up expired tokens:', error);
  }
};

// Password strength validation
export const validatePasswordStrength = (password: string): {
  isValid: boolean;
  errors: string[];
  score: number;
} => {
  const errors: string[] = [];
  let score = 0;

  // Minimum length (reduced requirement)
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  } else {
    score += 1;
  }

  // Maximum length
  if (password.length > 128) {
    errors.push('Password must be less than 128 characters long');
  }

  // Uppercase letter (optional)
  if (/[A-Z]/.test(password)) {
    score += 1;
  }

  // Lowercase letter (optional)
  if (/[a-z]/.test(password)) {
    score += 1;
  }

  // Number (optional)
  if (/\d/.test(password)) {
    score += 1;
  }

  // Special character (optional)
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    score += 1;
  }

  // Common patterns
  const commonPatterns = [
    /123456/,
    /password/i,
    /qwerty/i,
    /abc123/i,
    /admin/i,
    /letmein/i
  ];

  if (commonPatterns.some(pattern => pattern.test(password))) {
    errors.push('Password contains common patterns and is not secure');
    score = Math.max(0, score - 2);
  }

  // Repeated characters
  if (/(.)\1{2,}/.test(password)) {
    errors.push('Password should not contain repeated characters');
    score = Math.max(0, score - 1);
  }

  return {
    isValid: errors.length === 0 && score >= 1, // Much more lenient
    errors,
    score: Math.min(5, score)
  };
};