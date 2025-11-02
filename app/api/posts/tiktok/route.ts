/**
 * TikTok Posting API
 * 
 * Posts images directly to TikTok using the Content Posting API.
 * This endpoint checks for a connected TikTok account and posts the content immediately.
 * 
 * Reference: https://developers.tiktok.com/doc/content-posting-api-post-photo-to-tiktok
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { socialConnectionsService } from '@/lib/services/social-connections-service';
import { isTokenExpired, isTokenExpiringSoon } from '@/lib/types/social-connections';
import { getTikTokOAuthConfig } from '@/lib/auth/tiktok';
import { refreshAccessToken } from '@/lib/auth/oauth';

interface PostRequest {
  imageUrl: string;
  caption: string;
}

const TIKTOK_API_BASE = 'https://open.tiktokapis.com/v2';

/**
 * Post image directly to TikTok
 */
async function postImageToTikTok(
  accessToken: string,
  imageUrl: string,
  caption: string
): Promise<{ publish_id: string }> {
  const response = await fetch(
    `${TIKTOK_API_BASE}/post/publish/content/init/`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post_info: {
          title: caption,
          description: caption,
          disable_comment: false,
          privacy_level: 'PUBLIC_TO_EVERYONE',
          auto_add_music: true,
        },
        source_info: {
          source: 'PULL_FROM_URL',
          photo_cover_index: 0,
          photo_images: [imageUrl],
        },
        post_mode: 'DIRECT_POST',
        media_type: 'PHOTO',
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      `Failed to post to TikTok: ${response.status} - ${JSON.stringify(error)}`
    );
  }

  const data = await response.json();
  
  if (data.error) {
    throw new Error(
      `TikTok API error: ${data.error.message || data.error_description || 'Unknown error'}`
    );
  }

  const publishId = data.data?.publish_id;
  if (!publishId) {
    throw new Error('Failed to get publish_id from TikTok API');
  }

  return { publish_id: publishId };
}

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get request body
    const body: PostRequest = await request.json();
    const { imageUrl, caption } = body;

    if (!imageUrl || !caption) {
      return NextResponse.json(
        { error: 'imageUrl and caption are required' },
        { status: 400 }
      );
    }

    // Check for TikTok connection
    const connection = await socialConnectionsService.getConnection('tiktok');
    
    if (!connection) {
      return NextResponse.json(
        { error: 'TikTok account not connected. Please connect your TikTok account first.' },
        { status: 400 }
      );
    }

    // Check if token is expired or expiring soon
    let accessToken = connection.access_token;
    
    if (isTokenExpired(connection.expires_at) || isTokenExpiringSoon(connection.expires_at)) {
      if (!connection.refresh_token) {
        return NextResponse.json(
          { error: 'TikTok access token expired and no refresh token available. Please reconnect your account.' },
          { status: 401 }
        );
      }

      // Refresh the token
      try {
        const config = getTikTokOAuthConfig();
        const tokenData = await refreshAccessToken(config, connection.refresh_token);
        
        // Update connection with new token
        await socialConnectionsService.refreshToken(
          'tiktok',
          tokenData.access_token,
          tokenData.refresh_token || connection.refresh_token,
          tokenData.expires_in
            ? new Date(Date.now() + tokenData.expires_in * 1000).toISOString()
            : null
        );
        
        accessToken = tokenData.access_token;
      } catch (refreshError) {
        console.error('Failed to refresh TikTok token:', refreshError);
        return NextResponse.json(
          { error: 'Failed to refresh TikTok access token. Please reconnect your account.' },
          { status: 401 }
        );
      }
    }

    // Post image directly to TikTok
    const { publish_id } = await postImageToTikTok(accessToken, imageUrl, caption);

    return NextResponse.json({
      success: true,
      publish_id,
      message: 'Post published successfully to TikTok',
    });
  } catch (error) {
    console.error('Error posting to TikTok:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to post to TikTok',
      },
      { status: 500 }
    );
  }
}

