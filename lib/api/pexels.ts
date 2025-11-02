/**
 * Pexels API Client Functions
 * 
 * Client-side functions for calling the Pexels API routes with strongly typed responses
 */

import type { PhotosWithTotalResults } from 'pexels';

export interface PexelsSearchRequest {
  query: string;
  per_page?: number;
  page?: number;
  orientation?: 'landscape' | 'portrait' | 'square';
  size?: 'large' | 'medium' | 'small';
  color?: string;
}

export interface PexelsApiError {
  error: string;
  details?: string;
}

/**
 * Search for photos on Pexels
 */
export async function searchPexelsPhotos(
  request: PexelsSearchRequest
): Promise<PhotosWithTotalResults> {
  const response = await fetch('/api/pexels/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error: PexelsApiError = await response.json();
    throw new Error(error.error || 'Failed to search Pexels photos');
  }

  const data: PhotosWithTotalResults = await response.json();
  return data;
}
