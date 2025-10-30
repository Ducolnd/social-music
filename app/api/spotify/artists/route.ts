import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { SpotifyArtistInsert } from '@/lib/types/spotify-artist';

/**
 * Get or connect Spotify artist
 * GET /api/spotify/artists - Get current user's Spotify artist
 * POST /api/spotify/artists - Connect a Spotify artist
 * DELETE /api/spotify/artists - Disconnect current user's Spotify artist
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user's Spotify artist
    const { data, error } = await supabase
      .from('spotify_artists')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return NextResponse.json({ artist: null });
      }
      throw error;
    }

    return NextResponse.json({ artist: data });
  } catch (error) {
    console.error('Failed to get Spotify artist:', error);
    return NextResponse.json(
      { error: 'Failed to get Spotify artist' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { artist_id, artist_name } = await request.json();

    if (!artist_id || !artist_name) {
      return NextResponse.json(
        { error: 'artist_id and artist_name are required' },
        { status: 400 }
      );
    }

    // Upsert the artist connection
    const { data, error } = await supabase
      .from('spotify_artists')
      .upsert({
        user_id: user.id,
        artist_id,
        artist_name,
      }, {
        onConflict: 'user_id',
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ artist: data });
  } catch (error) {
    console.error('Failed to connect Spotify artist:', error);
    return NextResponse.json(
      { error: 'Failed to connect Spotify artist' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Delete the artist connection
    const { error } = await supabase
      .from('spotify_artists')
      .delete()
      .eq('user_id', user.id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to disconnect Spotify artist:', error);
    return NextResponse.json(
      { error: 'Failed to disconnect Spotify artist' },
      { status: 500 }
    );
  }
}

