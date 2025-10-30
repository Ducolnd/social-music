/**
 * TikTok OAuth Configuration
 * 
 * TikTok-specific OAuth implementation based on:
 * https://developers.tiktok.com/doc/login-kit-web
 */

import type { OAuthConfig } from './oauth';

/**
 * TikTok OAuth scopes
 * See: https://developers.tiktok.com/doc/scopes-reference
 */
export const TIKTOK_SCOPES = {
  // User Info scopes
  USER_INFO_BASIC: 'user.info.basic',
  USER_INFO_PROFILE: 'user.info.profile',
  USER_INFO_STATS: 'user.info.stats',
  
  // Video scopes
  VIDEO_LIST: 'video.list',
  VIDEO_UPLOAD: 'video.upload',
  VIDEO_DELETE: 'video.delete',
  
  // Comment scopes
  COMMENT_LIST: 'comment.list',
  COMMENT_CREATE: 'comment.create',
} as const;

export type TikTokScope = typeof TIKTOK_SCOPES[keyof typeof TIKTOK_SCOPES];

/**
 * Get TikTok OAuth configuration
 */
export function getTikTokOAuthConfig(): OAuthConfig {
  const clientId = process.env.TIKTOK_CLIENT_KEY;
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET;
  const redirectUri = process.env.TIKTOK_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error(
      'TikTok OAuth configuration incomplete. Please set TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET, and TIKTOK_REDIRECT_URI environment variables.'
    );
  }

  return {
    clientKey: clientId,
    clientSecret,
    redirectUri,
    scopes: [TIKTOK_SCOPES.USER_INFO_BASIC, TIKTOK_SCOPES.VIDEO_UPLOAD],
    authorizationUrl: 'https://www.tiktok.com/v2/auth/authorize/',
    tokenUrl: 'https://open.tiktokapis.com/v2/oauth/token/',
  };
}

/**
 * TikTok API response types
 */
export interface TikTokTokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  refresh_expires_in?: number;
  scope?: string;
  open_id?: string;
  error?: string;
  error_description?: string;
  log_id?: string;
}

/**
 * TikTok user fields organized by scope
 */
export const TIKTOK_USER_FIELDS = {
  // Basic info - user.info.basic scope
  BASIC: [
    'open_id',
    'union_id',
    'avatar_url',
    'avatar_url_100',
    'avatar_large_url',
    'display_name',
  ] as const,
  
  // Profile info - user.info.profile scope
  PROFILE: [
    'bio_description',
    'profile_deep_link',
    'is_verified',
    'username',
  ] as const,
  
  // Stats - user.info.stats scope
  STATS: [
    'follower_count',
    'following_count',
    'likes_count',
    'video_count',
  ] as const,
} as const;

/**
 * All TikTok user fields
 */
export const ALL_TIKTOK_USER_FIELDS = [
  ...TIKTOK_USER_FIELDS.BASIC,
  ...TIKTOK_USER_FIELDS.PROFILE,
  ...TIKTOK_USER_FIELDS.STATS,
] as const;

/**
 * Get user fields based on granted scopes
 */
export function getTikTokUserFields(scopes: string[]): string[] {
  const fields: string[] = [];
  
  if (scopes.includes(TIKTOK_SCOPES.USER_INFO_BASIC)) {
    fields.push(...TIKTOK_USER_FIELDS.BASIC);
  }
  
  if (scopes.includes(TIKTOK_SCOPES.USER_INFO_PROFILE)) {
    fields.push(...TIKTOK_USER_FIELDS.PROFILE);
  }
  
  if (scopes.includes(TIKTOK_SCOPES.USER_INFO_STATS)) {
    fields.push(...TIKTOK_USER_FIELDS.STATS);
  }
  
  return fields;
}

/**
 * TikTok User Info Interface
 */
export interface TikTokUserInfo {
  open_id: string;
  union_id?: string;
  avatar_url?: string;
  avatar_url_100?: string;
  avatar_large_url?: string;
  display_name?: string;
  bio_description?: string;
  profile_deep_link?: string;
  is_verified?: boolean;
  username?: string;
  follower_count?: number;
  following_count?: number;
  likes_count?: number;
  video_count?: number;
}

/**
 * Get user info from TikTok
 * @param accessToken - TikTok access token
 * @param scopes - Optional array of granted scopes. If not provided, defaults to requesting all available fields
 * @returns TikTok user information
 */
export async function getTikTokUserInfo(
  accessToken: string,
  scopes?: string[]
): Promise<TikTokUserInfo> {
  // If scopes are provided, get fields based on scopes; otherwise request all fields
  const fields = scopes 
    ? getTikTokUserFields(scopes)
    : TIKTOK_USER_FIELDS.BASIC;

  // Format fields as comma-separated string for query parameter
  // const fieldsParam = 'open_id,union_id,avatar_url';//fields.join(',');
  const fieldsParam = fields.join(',');

  const response = await fetch(
    `https://open.tiktokapis.com/v2/user/info/?fields=${fieldsParam}`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    console.log(error);
    throw new Error(`Failed to get TikTok user info: ${response.status} - ${JSON.stringify(error)}`);
  }

  const data = await response.json();

  return data.data?.user || data.data?.users?.[0];
}

