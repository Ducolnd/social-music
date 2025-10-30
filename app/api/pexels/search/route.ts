/**
 * Pexels Search API Route
 * 
 * API endpoint for searching Pexels images.
 * 
 * GET /api/pexels/search?query=music&per_page=10
 * POST /api/pexels/search
 */

import { NextRequest, NextResponse } from 'next/server';
import { searchPhotos } from '@/lib/pexels/client';
import type { PhotosWithTotalResults } from 'pexels';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const perPageParam = searchParams.get('per_page');
    const pageParam = searchParams.get('page');
    const orientation = searchParams.get('orientation') as 'landscape' | 'portrait' | 'square' | null;
    const size = searchParams.get('size') as 'large' | 'medium' | 'small' | null;
    const color = searchParams.get('color');

    // Validate query parameter
    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    // Parse and validate per_page
    const per_page = perPageParam ? parseInt(perPageParam, 10) : 10;
    if (isNaN(per_page) || per_page < 1 || per_page > 80) {
      return NextResponse.json(
        { error: 'Per page must be between 1 and 80' },
        { status: 400 }
      );
    }

    // Parse and validate page
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: 'Page must be a positive integer' },
        { status: 400 }
      );
    }

    // Validate orientation if provided
    if (orientation && !['landscape', 'portrait', 'square'].includes(orientation)) {
      return NextResponse.json(
        { error: 'Orientation must be landscape, portrait, or square' },
        { status: 400 }
      );
    }

    // Validate size if provided
    if (size && !['large', 'medium', 'small'].includes(size)) {
      return NextResponse.json(
        { error: 'Size must be large, medium, or small' },
        { status: 400 }
      );
    }

    // Search for photos
    const result: PhotosWithTotalResults = await searchPhotos({
      query,
      per_page,
      page,
      orientation: orientation || undefined,
      size: size || undefined,
      color: color || undefined,
    });

    return NextResponse.json(result, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Pexels search error:', error);

    return NextResponse.json(
      {
        error: 'An error occurred while searching Pexels',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST handler for searching Pexels (alternative to GET)
 * 
 * POST /api/pexels/search
 * Body: { query: "music", per_page?: 10, page?: 1, orientation?: "portrait", size?: "medium", color?: "red" }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      query,
      per_page = 10,
      page = 1,
      orientation,
      size,
      color,
    } = body;

    // Validate query parameter
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required and must be a string' },
        { status: 400 }
      );
    }

    // Validate per_page
    if (typeof per_page !== 'number' || per_page < 1 || per_page > 80) {
      return NextResponse.json(
        { error: 'Per page must be a number between 1 and 80' },
        { status: 400 }
      );
    }

    // Validate page
    if (typeof page !== 'number' || page < 1) {
      return NextResponse.json(
        { error: 'Page must be a positive number' },
        { status: 400 }
      );
    }

    // Validate orientation if provided
    if (orientation && !['landscape', 'portrait', 'square'].includes(orientation)) {
      return NextResponse.json(
        { error: 'Orientation must be landscape, portrait, or square' },
        { status: 400 }
      );
    }

    // Validate size if provided
    if (size && !['large', 'medium', 'small'].includes(size)) {
      return NextResponse.json(
        { error: 'Size must be large, medium, or small' },
        { status: 400 }
      );
    }

    // Search for photos
    const result: PhotosWithTotalResults = await searchPhotos({
      query,
      per_page,
      page,
      orientation: orientation || undefined,
      size: size || undefined,
      color: color || undefined,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Pexels search error:', error);

    return NextResponse.json(
      {
        error: 'An error occurred while searching Pexels',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

