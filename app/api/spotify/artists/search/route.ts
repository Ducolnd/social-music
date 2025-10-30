import { NextRequest, NextResponse } from 'next/server';
import { searchSpotifyArtists } from '@/lib/auth/spotify';
import type { Artist } from '@spotify/web-api-ts-sdk';

/**
 * Search Spotify artists
 * GET /api/spotify/artists/search?q={query}
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter "q" is required' },
        { status: 400 }
      );
    }

    const artists: Artist[] = await searchSpotifyArtists(query);

    return NextResponse.json({ artists });
  } catch (error) {
    console.error('Failed to search Spotify artists:', error);
    return NextResponse.json(
      { error: 'Failed to search Spotify artists' },
      { status: 500 }
    );
  }
}

