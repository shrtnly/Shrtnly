/*
  # Enhance link_analytics table for comprehensive data collection

  1. Table Updates
    - Add missing columns to link_analytics table
    - Add indexes for better performance
    - Add constraints for data integrity

  2. Security
    - Update RLS policies for proper access control
    - Add policies for anonymous users to insert analytics data

  3. Functions
    - Create function to automatically collect analytics data
*/

-- Add missing columns to link_analytics table if they don't exist
DO $$
BEGIN
  -- Add country column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'link_analytics' AND column_name = 'country'
  ) THEN
    ALTER TABLE link_analytics ADD COLUMN country text;
  END IF;

  -- Add city column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'link_analytics' AND column_name = 'city'
  ) THEN
    ALTER TABLE link_analytics ADD COLUMN city text;
  END IF;

  -- Add device_type column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'link_analytics' AND column_name = 'device_type'
  ) THEN
    ALTER TABLE link_analytics ADD COLUMN device_type text;
  END IF;

  -- Add browser column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'link_analytics' AND column_name = 'browser'
  ) THEN
    ALTER TABLE link_analytics ADD COLUMN browser text;
  END IF;

  -- Add os column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'link_analytics' AND column_name = 'os'
  ) THEN
    ALTER TABLE link_analytics ADD COLUMN os text;
  END IF;

  -- Add utm_source column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'link_analytics' AND column_name = 'utm_source'
  ) THEN
    ALTER TABLE link_analytics ADD COLUMN utm_source text;
  END IF;

  -- Add utm_medium column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'link_analytics' AND column_name = 'utm_medium'
  ) THEN
    ALTER TABLE link_analytics ADD COLUMN utm_medium text;
  END IF;

  -- Add utm_campaign column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'link_analytics' AND column_name = 'utm_campaign'
  ) THEN
    ALTER TABLE link_analytics ADD COLUMN utm_campaign text;
  END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_link_analytics_event_type_created_at ON link_analytics(event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_link_analytics_country ON link_analytics(country);
CREATE INDEX IF NOT EXISTS idx_link_analytics_device_type ON link_analytics(device_type);
CREATE INDEX IF NOT EXISTS idx_link_analytics_browser ON link_analytics(browser);
CREATE INDEX IF NOT EXISTS idx_link_analytics_utm_source ON link_analytics(utm_source);

-- Update RLS policies to allow anonymous users to insert analytics data
DROP POLICY IF EXISTS "Anonymous users can insert analytics" ON link_analytics;
CREATE POLICY "Anonymous users can insert analytics"
  ON link_analytics
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow public users to insert analytics data
DROP POLICY IF EXISTS "Public users can insert analytics" ON link_analytics;
CREATE POLICY "Public users can insert analytics"
  ON link_analytics
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Function to parse user agent and extract device info
CREATE OR REPLACE FUNCTION parse_user_agent(user_agent text)
RETURNS jsonb
LANGUAGE plpgsql
AS $$
DECLARE
  result jsonb := '{}';
  ua text := lower(coalesce(user_agent, ''));
BEGIN
  -- Detect device type
  IF ua LIKE '%mobile%' OR ua LIKE '%android%' OR ua LIKE '%iphone%' THEN
    result := result || '{"device_type": "Mobile"}';
  ELSIF ua LIKE '%tablet%' OR ua LIKE '%ipad%' THEN
    result := result || '{"device_type": "Tablet"}';
  ELSE
    result := result || '{"device_type": "Desktop"}';
  END IF;

  -- Detect browser
  IF ua LIKE '%chrome%' AND ua NOT LIKE '%edg%' THEN
    result := result || '{"browser": "Chrome"}';
  ELSIF ua LIKE '%safari%' AND ua NOT LIKE '%chrome%' THEN
    result := result || '{"browser": "Safari"}';
  ELSIF ua LIKE '%firefox%' THEN
    result := result || '{"browser": "Firefox"}';
  ELSIF ua LIKE '%edg%' THEN
    result := result || '{"browser": "Edge"}';
  ELSE
    result := result || '{"browser": "Other"}';
  END IF;

  -- Detect OS
  IF ua LIKE '%windows%' THEN
    result := result || '{"os": "Windows"}';
  ELSIF ua LIKE '%mac%' OR ua LIKE '%darwin%' THEN
    result := result || '{"os": "macOS"}';
  ELSIF ua LIKE '%linux%' THEN
    result := result || '{"os": "Linux"}';
  ELSIF ua LIKE '%android%' THEN
    result := result || '{"os": "Android"}';
  ELSIF ua LIKE '%ios%' OR ua LIKE '%iphone%' OR ua LIKE '%ipad%' THEN
    result := result || '{"os": "iOS"}';
  ELSE
    result := result || '{"os": "Other"}';
  END IF;

  RETURN result;
END;
$$;