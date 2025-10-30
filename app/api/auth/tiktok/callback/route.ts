/**
 * TikTok OAuth Callback Endpoint
 * 
 * Handles the OAuth callback from TikTok, exchanges the authorization code
 * for an access token, and stores the connection in the database.
 */

import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { exchangeCodeForToken } from '@/lib/auth/oauth';
import { getTikTokOAuthConfig, getTikTokUserInfo } from '@/lib/auth/tiktok';
import { socialConnectionsService } from '@/lib/services/social-connections-service';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Get authorization code and state from callback URL
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const scopes = searchParams.get('scopes');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    // Handle authorization errors
    if (error || !code) {
      console.error('TikTok OAuth error:', error, errorDescription);
      redirect('/dashboard/settings/connections?error=tiktok_auth_failed');
    }

    // Verify state parameter to prevent CSRF attacks
    const cookieStore = await cookies();
    const storedState = cookieStore.get('tiktok_oauth_state')?.value;

    if (!storedState || state !== storedState) {
      console.error('Invalid state parameter');
      redirect('/dashboard/settings/connections?error=invalid_state');
    }

    // Clear the state cookie
    cookieStore.delete('tiktok_oauth_state');

    // Exchange authorization code for access token
    const config = getTikTokOAuthConfig();
    const tokenData = await exchangeCodeForToken(config, code, state, storedState);

    // Get user info from TikTok
    const userInfo = await getTikTokUserInfo(tokenData.access_token);

    // Get the current authenticated user
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('Failed to get authenticated user:', userError);
      redirect('/dashboard/settings/connections?error=not_authenticated');
    }

    // Calculate expiration timestamp
    const expiresAt = tokenData.expires_in
      ? new Date(Date.now() + tokenData.expires_in * 1000).toISOString()
      : null;

    // Store connection in database using upsert (will create or update)
    await socialConnectionsService.upsertConnection({
      user_id: user.id,
      platform: 'tiktok',
      platform_user_id: userInfo.open_id,
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token || null,
      expires_at: expiresAt,
      scopes: scopes || tokenData.scope || null,
    });


  } catch (error) {
    console.error('TikTok OAuth callback error:', error);
    redirect('/dashboard/settings/connections?error=tiktok_callback_failed');
  }

  // Redirect to connections page with success message
  redirect('/dashboard/settings/connections?success=tiktok_connected');
}

