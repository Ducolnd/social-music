/**
 * Social Connections Database Types
 * 
 * Types for the social_connections table that stores OAuth connections
 * for various social media platforms (TikTok, SoundCloud, YouTube, Instagram, etc.)
 */

export type Platform = 'tiktok' | 'soundcloud' | 'youtube' | 'instagram' | string;

export interface SocialConnection {
  id: string;
  user_id: string;
  platform: Platform;
  platform_user_id: string;
  access_token: string;
  refresh_token: string | null;
  expires_at: string | null; // ISO 8601 timestamp
  scopes: string | null;
  created_at: string; // ISO 8601 timestamp
  updated_at: string; // ISO 8601 timestamp
}

export interface SocialConnectionInsert {
  user_id: string;
  platform: Platform;
  platform_user_id: string;
  access_token: string;
  refresh_token?: string | null;
  expires_at?: string | null;
  scopes?: string | null;
}

export interface SocialConnectionUpdate {
  access_token?: string;
  refresh_token?: string | null;
  expires_at?: string | null;
  scopes?: string | null;
  platform_user_id?: string;
}

/**
 * Helper function to parse scopes string into an array
 */
export function parseScopes(scopes: string | null): string[] {
  if (!scopes) return [];
  // Try JSON first, fall back to comma-separated
  try {
    return JSON.parse(scopes);
  } catch {
    return scopes.split(',').map(s => s.trim()).filter(Boolean);
  }
}

/**
 * Helper function to stringify scopes array into a string
 */
export function stringifyScopes(scopes: string[]): string {
  return JSON.stringify(scopes);
}

/**
 * Helper function to check if a token is expired
 */
export function isTokenExpired(expiresAt: string | null): boolean {
  if (!expiresAt) return false;
  return new Date(expiresAt) < new Date();
}

/**
 * Helper function to check if a token will expire soon
 * @param expiresAt - ISO 8601 timestamp when token expires
 * @param bufferSeconds - Buffer time in seconds before expiration (default: 300 = 5 minutes)
 */
export function isTokenExpiringSoon(expiresAt: string | null, bufferSeconds: number = 300): boolean {
  if (!expiresAt) return false;
  const expirationDate = new Date(expiresAt);
  const now = new Date();
  return expirationDate.getTime() - now.getTime() < bufferSeconds * 1000;
}

/**
 * Helper type for platform-specific configuration
 */
export interface PlatformConfig {
  platform: Platform;
  displayName: string;
  oauthUrl: string;
  scopes: string[];
}

/**
 * Platform-specific configurations
 */
export const PLATFORM_CONFIGS: Record<Platform, PlatformConfig> = {
  tiktok: {
    platform: 'tiktok',
    displayName: 'TikTok',
    oauthUrl: 'https://www.tiktok.com/v2/auth/authorize',
    scopes: ['user.info.basic', 'video.upload'],
  },
  soundcloud: {
    platform: 'soundcloud',
    displayName: 'SoundCloud',
    oauthUrl: 'https://soundcloud.com/connect',
    scopes: ['non-expiring'],
  },
  youtube: {
    platform: 'youtube',
    displayName: 'YouTube',
    oauthUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    scopes: ['https://www.googleapis.com/auth/youtube.upload'],
  },
  instagram: {
    platform: 'instagram',
    displayName: 'Instagram',
    oauthUrl: 'https://api.instagram.com/oauth/authorize',
    scopes: ['user_profile', 'user_media'],
  },
};

