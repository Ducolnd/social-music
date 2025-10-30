-- Create social_connections table for storing OAuth connections across all platforms
-- Supports TikTok, SoundCloud, YouTube, Instagram, and future platforms

-- Create the table
CREATE TABLE IF NOT EXISTS social_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  platform_user_id TEXT NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  expires_at TIMESTAMPTZ,
  scopes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure one connection per platform per user
  CONSTRAINT unique_user_platform UNIQUE(user_id, platform)
);

-- Create indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_social_connections_user_id ON social_connections(user_id);
CREATE INDEX IF NOT EXISTS idx_social_connections_platform ON social_connections(platform);
CREATE INDEX IF NOT EXISTS idx_social_connections_user_platform ON social_connections(user_id, platform);

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at on row updates
CREATE TRIGGER update_social_connections_updated_at
  BEFORE UPDATE ON social_connections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE social_connections ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Policy: Users can view their own connections
CREATE POLICY "Users can view own connections"
  ON social_connections
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own connections
CREATE POLICY "Users can insert own connections"
  ON social_connections
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own connections
CREATE POLICY "Users can update own connections"
  ON social_connections
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own connections
CREATE POLICY "Users can delete own connections"
  ON social_connections
  FOR DELETE
  USING (auth.uid() = user_id);

-- Add comment to table for documentation
COMMENT ON TABLE social_connections IS 'Stores OAuth connections for various social media platforms (TikTok, SoundCloud, YouTube, Instagram, etc.)';
COMMENT ON COLUMN social_connections.platform IS 'Platform name (tiktok, soundcloud, youtube, instagram, etc.)';
COMMENT ON COLUMN social_connections.platform_user_id IS 'User ID on the external platform';
COMMENT ON COLUMN social_connections.access_token IS 'OAuth access token - should be encrypted at rest';
COMMENT ON COLUMN social_connections.refresh_token IS 'OAuth refresh token - should be encrypted at rest, nullable';
COMMENT ON COLUMN social_connections.expires_at IS 'Timestamp when access_token expires';
COMMENT ON COLUMN social_connections.scopes IS 'OAuth scopes/permissions granted (comma-separated or JSON)';

