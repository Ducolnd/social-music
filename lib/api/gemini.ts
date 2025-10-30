/**
 * Gemini API Client Functions
 * 
 * Client-side functions for calling the Gemini API routes with strongly typed responses
 */

import type { GeminiCaptionRequest, GeminiCaptionResponse } from '@/lib/types/gemini';

export interface GeminiApiError {
  error: string;
  details?: string;
}

/**
 * Generate captions using Gemini AI
 */
export async function generateGeminiCaptions(
  request: GeminiCaptionRequest
): Promise<GeminiCaptionResponse> {
  const response = await fetch('/api/gemini/captions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error: GeminiApiError = await response.json();
    throw new Error(error.error || 'Failed to generate captions');
  }

  const data: GeminiCaptionResponse = await response.json();
  return data;
}



