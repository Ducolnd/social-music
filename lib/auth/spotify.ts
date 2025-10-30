/**
 * Spotify API Configuration
 * 
 * Simplified Spotify integration for artist search and association
 * Using Spotify Web API SDK (@spotify/web-api-ts-sdk)
 */

import { SpotifyApi, Artist } from '@spotify/web-api-ts-sdk';

/**
 * Get Spotify API client using Client Credentials flow
 * This is a public API key that doesn't require user authentication
 * Suitable for public artist searches
 */
export function getSpotifyApi(): SpotifyApi {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      'Spotify API configuration incomplete. Please set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET environment variables.'
    );
  }

  // Using client credentials flow for public API access (no user auth required)
  return SpotifyApi.withClientCredentials(
    clientId,
    clientSecret,
    [] // No scopes needed for public artist search
  );
}

/**
 * Search for artists on Spotify
 * @returns Array of full Artist objects from the Spotify SDK
 */
export async function searchSpotifyArtists(query: string): Promise<Artist[]> {
  try {
    const api = getSpotifyApi();
    const response = await api.search(query, ['artist'], undefined, 10);
    
    // Return the full Artist objects from the SDK
    return response.artists.items;
  } catch (error) {
    console.error('Failed to search Spotify artists:', error);
    throw new Error('Failed to search Spotify artists');
  }
}

/**
 * Get artist details by Spotify artist ID
 * @returns Full Artist object from the Spotify SDK, or null if not found
 */
export async function getSpotifyArtistById(artistId: string): Promise<Artist | null> {
  try {
    const api = getSpotifyApi();
    const artist = await api.artists.get(artistId);
    
    // Return the full Artist object from the SDK
    return artist;
  } catch (error) {
    console.error('Failed to get Spotify artist:', error);
    return null;
  }
}

// Re-export Artist type from SDK for convenience
export type { Artist } from '@spotify/web-api-ts-sdk';
