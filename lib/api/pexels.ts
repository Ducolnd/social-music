/**
 * Pexels API Client Functions
 * 
 * Client-side functions for calling the Pexels API routes with strongly typed responses
 */

import type { PhotosWithTotalResults } from 'pexels';

export interface PexelsSearchParams {
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
  params: PexelsSearchParams
): Promise<PhotosWithTotalResults> {
  const searchParams = new URLSearchParams({
    query: params.query,
  });

  if (params.per_page !== undefined) {
    searchParams.append('per_page', String(params.per_page));
  }
  if (params.page !== undefined) {
    searchParams.append('page', String(params.page));
  }
  if (params.orientation) {
    searchParams.append('orientation', params.orientation);
  }
  if (params.size) {
    searchParams.append('size', params.size);
  }
  if (params.color) {
    searchParams.append('color', params.color);
  }

  const response = await fetch(`/api/pexels/search?${searchParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error: PexelsApiError = await response.json();
    throw new Error(error.error || 'Failed to search Pexels photos');
  }

  const data: PhotosWithTotalResults = await response.json();
  return data;
}

/**
 * Search for photos on Pexels using POST
 */
export async function searchPexelsPhotosPost(
  params: PexelsSearchParams
): Promise<PhotosWithTotalResults> {
  const response = await fetch('/api/pexels/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const error: PexelsApiError = await response.json();
    throw new Error(error.error || 'Failed to search Pexels photos');
  }

  const data: PhotosWithTotalResults = await response.json();
  return data;
}
