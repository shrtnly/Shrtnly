/*
  # Add IP tracking to links table

  1. New Columns
    - `created_ip` (text) - stores the IP address of the user who created the link

  2. Security
    - Update RLS policies to allow IP-based filtering
    - Add policy for users to manage links from their IP

  3. Performance
    - Add index on created_ip for efficient queries
*/

-- Add IP tracking column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'links' AND column_name = 'created_ip'
  ) THEN
    ALTER TABLE links ADD COLUMN created_ip text;
  END IF;
END $$;

-- Add index for efficient IP-based queries
CREATE INDEX IF NOT EXISTS idx_links_created_ip ON links(created_ip);

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Public can read active links" ON links;
DROP POLICY IF EXISTS "Users can manage their IP links" ON links;

-- Recreate the read policy
CREATE POLICY "Public can read active links"
  ON links
  FOR SELECT
  TO public
  USING (is_active = true);

-- Add policy for IP-based link management (without IF NOT EXISTS)
CREATE POLICY "Users can manage their IP links"
  ON links
  FOR ALL
  TO public
  USING (created_ip = current_setting('request.headers')::json->>'x-forwarded-for' OR created_ip IS NULL)
  WITH CHECK (true);