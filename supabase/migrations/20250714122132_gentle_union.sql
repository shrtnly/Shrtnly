/*
  # Fix auth_tokens RLS policies

  1. Security Updates
    - Add INSERT policy for authenticated users to create tokens
    - Add INSERT policy for service role (for system operations)
    - Update existing policies to ensure proper access control

  2. Changes
    - Allow authenticated users to insert their own tokens
    - Allow service role full access for system operations
    - Maintain security while enabling token creation functionality
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can insert own tokens" ON auth_tokens;
DROP POLICY IF EXISTS "Service role can manage all tokens" ON auth_tokens;
DROP POLICY IF EXISTS "Users can view own tokens" ON auth_tokens;

-- Allow authenticated users to insert their own tokens
CREATE POLICY "Users can insert own tokens"
  ON auth_tokens
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow service role full access for system operations
CREATE POLICY "Service role can manage all tokens"
  ON auth_tokens
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow users to view their own tokens
CREATE POLICY "Users can view own tokens"
  ON auth_tokens
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to update their own tokens (for marking as used)
CREATE POLICY "Users can update own tokens"
  ON auth_tokens
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);