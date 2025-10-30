/**
 * Gemini Captions API Route
 * 
 * API endpoint for generating captions using Gemini AI.
 * 
 * POST /api/gemini/captions
 * Body: { context: "...", keyword: "..." }
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateCaptions } from '@/lib/gemini/client';
import type { GeminiCaptionResponse } from '@/lib/types/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { context, keyword } = body;

    // Validate required fields
    if (!context || typeof context !== 'string') {
      return NextResponse.json(
        { error: 'Context is required and must be a string' },
        { status: 400 }
      );
    }

    if (!keyword || typeof keyword !== 'string') {
      return NextResponse.json(
        { error: 'Keyword is required and must be a string' },
        { status: 400 }
      );
    }

    // Generate captions
    const result: GeminiCaptionResponse = await generateCaptions({
      context,
      keyword,
    });

    return NextResponse.json(result, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Gemini captions error:', error);

    return NextResponse.json(
      {
        error: 'An error occurred while generating captions',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

