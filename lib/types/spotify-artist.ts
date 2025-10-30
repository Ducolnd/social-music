/**
 * Spotify Artist Database Types
 * 
 * Types for the spotify_artists table that stores artist associations
 */

export interface SpotifyArtist {
  id: string;
  user_id: string;
  artist_id: string;
  artist_name: string;
  created_at: string; // ISO 8601 timestamp
  updated_at: string; // ISO 8601 timestamp
}

export interface SpotifyArtistInsert {
  user_id: string;
  artist_id: string;
  artist_name: string;
}

export interface SpotifyArtistUpdate {
  artist_id?: string;
  artist_name?: string;
}

