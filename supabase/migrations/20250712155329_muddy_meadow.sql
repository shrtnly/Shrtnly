/*
  # Create links table for URL shortener

  1. New Tables
    - `links`
      - `id` (uuid, primary key)
      - `original_url` (text, not null) - The original long URL
      - `short_code` (text, unique, not null) - The short identifier
      - `title` (text) - Optional title for the link
      - `description` (text) - Optional description
      - `click_count` (integer, default 0) - Number of times visited
      - `created_at` (timestamp)
      - `created_by` (uuid, nullable) - User who created the link (for future auth)
      - `expires_at` (timestamp, nullable) - Optional expiration date
      - `is_active` (boolean, default true) - Whether the link is active

  2. Security
    - Enable RLS on `links` table
    - Add policy for public read access to active links
    - Add policy for public insert access (anonymous link creation)
*/

CREATE TABLE IF NOT EXISTS links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  original_url text NOT NULL,
  short_code text UNIQUE NOT NULL,
  title text,
  description text,
  click_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  created_by uuid,
  expires_at timestamptz,
  is_active boolean DEFAULT true
);

ALTER TABLE links ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active links
CREATE POLICY "Public can read active links"
  ON links
  FOR SELECT
  TO public
  USING (is_active = true);

-- Allow public insert for anonymous link creation
CREATE POLICY "Public can create links"
  ON links
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow public update for click counting
CREATE POLICY "Public can update click count"
  ON links
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_links_short_code ON links(short_code);
CREATE INDEX IF NOT EXISTS idx_links_created_at ON links(created_at DESC);