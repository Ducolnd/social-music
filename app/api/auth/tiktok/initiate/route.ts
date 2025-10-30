/**
 * TikTok OAuth Initiation Endpoint
 * 
 * Initiates the TikTok OAuth flow by generating a state token
 * and redirecting the user to TikTok's authorization page.
 * 
 * Based on: https://developers.tiktok.com/doc/login-kit-web
 */

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { buildAuthorizationUrl, generateStateToken } from '@/lib/auth/oauth';
import { getTikTokOAuthConfig } from '@/lib/auth/tiktok';

export async function GET() {
  try {
    // Get TikTok OAuth configuration
    const config = getTikTokOAuthConfig();

    // Generate state token for CSRF protection
    const state = generateStateToken();

    // Store state in httpOnly cookie for verification on callback
    const cookieStore = await cookies();
    cookieStore.set('tiktok_oauth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 600, // 10 minutes
      path: '/',
    });

    // Build authorization URL
    const { url } = buildAuthorizationUrl(config, state, {
      // disable_auto_auth: '0', // TikTok specific: skip auth page for valid sessions
    });

    // Redirect to TikTok authorization page
    return NextResponse.redirect(url);
  } catch (error) {
    console.error('TikTok OAuth initiation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to initiate OAuth' },
      { status: 500 }
    );
  }
}

