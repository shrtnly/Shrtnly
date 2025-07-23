/*
  # Create authentication tokens table

  1. New Tables
    - `auth_tokens`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `token_hash` (text, hashed token for security)
      - `token_type` (text, 'email_verification' or 'password_reset')
      - `expires_at` (timestamp)
      - `used_at` (timestamp, nullable)
      - `created_at` (timestamp)
      - `ip_address` (text)
      - `user_agent` (text)
      - `attempts` (integer, for rate limiting)

  2. Security
    - Enable RLS on `auth_tokens` table
    - Add policies for secure token management
    - Add indexes for performance
    - Add constraints for data integrity

  3. Rate Limiting
    - Track verification attempts
    - Implement cooldown periods
*/

-- Create auth_tokens table
CREATE TABLE IF NOT EXISTS auth_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  token_hash text NOT NULL,
  token_type text NOT NULL CHECK (token_type IN ('email_verification', 'password_reset')),
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  created_at timestamptz DEFAULT now(),
  ip_address text,
  user_agent text,
  attempts integer DEFAULT 0,
  UNIQUE(token_hash)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_auth_tokens_user_id ON auth_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_auth_tokens_token_hash ON auth_tokens(token_hash);
CREATE INDEX IF NOT EXISTS idx_auth_tokens_type_expires ON auth_tokens(token_type, expires_at);
CREATE INDEX IF NOT EXISTS idx_auth_tokens_created_at ON auth_tokens(created_at DESC);

-- Enable RLS
ALTER TABLE auth_tokens ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own tokens"
  ON auth_tokens
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create security log table
CREATE TABLE IF NOT EXISTS auth_security_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type text NOT NULL,
  event_data jsonb,
  ip_address text,
  user_agent text,
  success boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create index for security logs
CREATE INDEX IF NOT EXISTS idx_auth_security_logs_user_id ON auth_security_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_auth_security_logs_created_at ON auth_security_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_auth_security_logs_event_type ON auth_security_logs(event_type);

-- Enable RLS for security logs
ALTER TABLE auth_security_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for security logs (admin only)
CREATE POLICY "Only service role can access security logs"
  ON auth_security_logs
  FOR ALL
  TO service_role
  USING (true);

-- Function to clean up expired tokens
CREATE OR REPLACE FUNCTION cleanup_expired_tokens()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM auth_tokens 
  WHERE expires_at < now() 
  AND used_at IS NULL;
END;
$$;

-- Function to log security events
CREATE OR REPLACE FUNCTION log_security_event(
  p_user_id uuid,
  p_event_type text,
  p_event_data jsonb DEFAULT NULL,
  p_ip_address text DEFAULT NULL,
  p_user_agent text DEFAULT NULL,
  p_success boolean DEFAULT false
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO auth_security_logs (
    user_id,
    event_type,
    event_data,
    ip_address,
    user_agent,
    success
  ) VALUES (
    p_user_id,
    p_event_type,
    p_event_data,
    p_ip_address,
    p_user_agent,
    p_success
  );
END;
$$;