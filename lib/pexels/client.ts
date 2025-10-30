/**
 * Pexels API Client
 * 
 * Server-side client for interacting with the Pexels API
 */

import { createClient } from 'pexels';
import type { Photo, PhotosWithTotalResults, PaginationParams } from 'pexels';

const API_KEY = process.env.PEXELS_API_KEY;

if (!API_KEY) {
  throw new Error('PEXELS_API_KEY environment variable is not set');
}

const pexelsClient = createClient(API_KEY);

/**
 * Search options for Pexels photos
 */
export interface PexelsSearchOptions extends PaginationParams {
  query: string;
  orientation?: 'landscape' | 'portrait' | 'square';
  size?: 'large' | 'medium' | 'small';
  color?: string;
}

/**
 * Search for photos on Pexels
 */
export async function searchPhotos(
  options: PexelsSearchOptions
): Promise<PhotosWithTotalResults> {
  try {
    const { query, per_page = 10, page = 1, orientation, size, color } = options;

    const response = await pexelsClient.photos.search({
      query,
      per_page: Math.min(per_page, 80), // Pexels max is 80
      page,
      ...(orientation && { orientation }),
      ...(size && { size }),
      ...(color && { color }),
    } as PaginationParams & { query: string });

    if ('error' in response) {
      throw new Error(`Pexels API error: ${response.error}`);
    }

    return response;
  } catch (error) {
    console.error('Error searching Pexels photos:', error);
    throw new Error(
      `Failed to search Pexels photos: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Get photo by ID
 */
export async function getPhotoById(id: number): Promise<Photo> {
  try {
    const response = await pexelsClient.photos.show({ id });

    if ('error' in response) {
      throw new Error(`Pexels API error: ${response.error}`);
    }

    return response;
  } catch (error) {
    console.error('Error fetching Pexels photo:', error);
    throw new Error(
      `Failed to fetch Pexels photo: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
