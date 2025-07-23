/*
  # Create user profiles and analytics tables

  1. New Tables
    - `user_profiles`
      - `id` (uuid, references auth.users)
      - `email` (text)
      - `full_name` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `link_analytics`
      - `id` (uuid, primary key)
      - `link_id` (uuid, references links)
      - `user_id` (uuid, references auth.users)
      - `event_type` (text) - 'click', 'qr_scan', 'view'
      - `ip_address` (text)
      - `user_agent` (text)
      - `referrer` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data

  3. Changes
    - Update links table to reference auth.users
    - Add user_id column to links table
*/

-- Create user profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create link analytics table
CREATE TABLE IF NOT EXISTS link_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  link_id uuid REFERENCES links(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type text NOT NULL CHECK (event_type IN ('click', 'qr_scan', 'view')),
  ip_address text,
  user_agent text,
  referrer text,
  created_at timestamptz DEFAULT now()
);

-- Add user_id to links table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'links' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE links ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE link_analytics ENABLE ROW LEVEL SECURITY;

-- User profiles policies
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Link analytics policies
CREATE POLICY "Users can read own analytics"
  ON link_analytics
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analytics"
  ON link_analytics
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Update links table policies to include user_id
DROP POLICY IF EXISTS "Users can manage their IP links" ON links;

CREATE POLICY "Authenticated users can manage their links"
  ON links
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id OR (user_id IS NULL AND created_ip = ((current_setting('request.headers'::text))::json ->> 'x-forwarded-for'::text)))
  WITH CHECK (auth.uid() = user_id OR (user_id IS NULL AND created_ip = ((current_setting('request.headers'::text))::json ->> 'x-forwarded-for'::text)));

-- Function to handle user profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO user_profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_link_analytics_user_id ON link_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_link_analytics_link_id ON link_analytics(link_id);
CREATE INDEX IF NOT EXISTS idx_link_analytics_created_at ON link_analytics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_links_user_id ON links(user_id);