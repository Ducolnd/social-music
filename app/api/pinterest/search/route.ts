/**
 * Pinterest Search API Route
 * 
 * API endpoint for searching Pinterest images via Google Search.
 * 
 * GET /api/pinterest/search?query=gym&limit=20
 * POST /api/pinterest/search
 */

import { NextRequest, NextResponse } from 'next/server';
import { searchPinterestImages } from '@/lib/pinterest/scraper';
import type { PinterestSearchResult } from '@/lib/types/pinterest';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const limitParam = searchParams.get('limit');

    // Validate query parameter
    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    // Parse and validate limit
    const limit = limitParam ? parseInt(limitParam, 10) : 20;
    
    if (isNaN(limit) || limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: 'Limit must be between 1 and 100' },
        { status: 400 }
      );
    }

    // Search for Pinterest images
    const result: PinterestSearchResult = await searchPinterestImages({
      query,
      limit,
    });

    // Return the results
    return NextResponse.json(result, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Pinterest search error:', error);

    // Generic error response
    return NextResponse.json(
      { 
        error: 'An error occurred while searching Pinterest',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * POST handler for searching Pinterest (alternative to GET)
 * 
 * POST /api/pinterest/search
 * Body: { query: "gym", limit?: 20 }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, limit = 20 } = body;

    // Validate query parameter
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required and must be a string' },
        { status: 400 }
      );
    }

    // Validate limit
    if (typeof limit !== 'number' || limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: 'Limit must be a number between 1 and 100' },
        { status: 400 }
      );
    }

    // Search for Pinterest images
    const result: PinterestSearchResult = await searchPinterestImages({
      query,
      limit,
    });

    // Return the results
    return NextResponse.json(result);

  } catch (error) {
    console.error('Pinterest search error:', error);

    // Generic error response
    return NextResponse.json(
      { 
        error: 'An error occurred while searching Pinterest',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
