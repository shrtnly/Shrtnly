/*
  # Fix auth_security_logs RLS policies

  1. Security Policies
    - Allow authenticated users to insert security logs
    - Allow anonymous users to insert security logs (for failed login attempts)
    - Allow service role full access for system operations
    - Maintain read restrictions for security

  2. Changes
    - Add INSERT policy for authenticated users
    - Add INSERT policy for anonymous users
    - Keep existing service role policy
    - Ensure proper security logging functionality
*/

-- Allow authenticated users to insert security logs
CREATE POLICY "Authenticated users can insert security logs"
  ON auth_security_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow anonymous users to insert security logs (for failed login attempts, etc.)
CREATE POLICY "Anonymous users can insert security logs"
  ON auth_security_logs
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow public role to insert security logs (fallback)
CREATE POLICY "Public can insert security logs"
  ON auth_security_logs
  FOR INSERT
  TO public
  WITH CHECK (true);