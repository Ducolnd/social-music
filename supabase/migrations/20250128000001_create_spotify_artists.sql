-- Create spotify_artists table for storing simplified Spotify artist connections
-- This is not a full OAuth integration, just stores which artist is associated with the user

CREATE TABLE IF NOT EXISTS spotify_artists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  artist_id TEXT NOT NULL,
  artist_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure one artist per user
  CONSTRAINT unique_user_artist UNIQUE(user_id)
);

-- Create indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_spotify_artists_user_id ON spotify_artists(user_id);
CREATE INDEX IF NOT EXISTS idx_spotify_artists_artist_id ON spotify_artists(artist_id);

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_spotify_artists_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at on row updates
CREATE TRIGGER update_spotify_artists_updated_at
  BEFORE UPDATE ON spotify_artists
  FOR EACH ROW
  EXECUTE FUNCTION update_spotify_artists_updated_at();

-- Enable Row Level Security
ALTER TABLE spotify_artists ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Policy: Users can view their own artist connection
CREATE POLICY "Users can view own spotify artist"
  ON spotify_artists
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own artist connection
CREATE POLICY "Users can insert own spotify artist"
  ON spotify_artists
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own artist connection
CREATE POLICY "Users can update own spotify artist"
  ON spotify_artists
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own artist connection
CREATE POLICY "Users can delete own spotify artist"
  ON spotify_artists
  FOR DELETE
  USING (auth.uid() = user_id);

-- Add comment to table for documentation
COMMENT ON TABLE spotify_artists IS 'Stores simplified Spotify artist associations for users (not full OAuth)';
COMMENT ON COLUMN spotify_artists.artist_id IS 'Spotify artist ID';
COMMENT ON COLUMN spotify_artists.artist_name IS 'Display name of the artist';

