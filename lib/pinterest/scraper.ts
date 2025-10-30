/**
 * Pinterest Scraper via Google Search
 * 
 * This implementation searches for Pinterest images using Google's search API.
 * This approach avoids directly scraping Pinterest and is less likely to violate their ToS.
 */

import googlethis from 'googlethis';
import { GOOGLE_IMG_SCRAP } from 'google-img-scrap';
import type { PinterestPin, PinterestSearchOptions, PinterestSearchResult } from '@/lib/types/pinterest';

/**
 * Extract pin ID from Pinterest URL
 */
function extractPinId(url: string): string | undefined {
  const match = url.match(/\/pin\/(\d+)/);
  return match ? match[1] : undefined;
}

/**
 * Search for Pinterest images using Google
 * 
 * @param options - Search options
 * @returns Array of Pinterest pins
 */
export async function searchPinterestImages(
  options: PinterestSearchOptions
): Promise<PinterestSearchResult> {
  const { query, limit = 20 } = options;
  
  const pins: PinterestPin[] = [];
  
  try {
    // Method 1: Use GOOGLE_IMG_SCRAP to search for Pinterest images
    const v1 = await GOOGLE_IMG_SCRAP({
      search: query,
      domains: ['pinterest.com'],
      limit: Math.ceil(limit / 2),
    });

    // Method 2: Use googlethis to search for Pinterest images via site search
    const googleQuery = `${query} site:pinterest.com`;
    const v2 = await googlethis.image(googleQuery);

    // Combine results from both methods
    if (v1.result) {
      for (const response of v1.result.slice(0, Math.ceil(limit / 2))) {
        if (response.title && response.url && response.originalUrl) {
          pins.push({
            title: response.title,
            image: response.url,
            url: response.originalUrl,
            pinId: extractPinId(response.originalUrl),
          });
        }
      }
    }

    if (v2) {
      for (const response of v2.slice(0, Math.ceil(limit / 2))) {
        if (response.origin?.title && response.url && response.origin?.website?.url) {
          pins.push({
            title: response.origin.title,
            image: response.url,
            url: response.origin.website.url,
            pinId: extractPinId(response.origin.website.url),
          });
        }
      }
    }

    // Remove duplicates based on URL
    const uniquePins = Array.from(
      new Map(pins.map(pin => [pin.url, pin])).values()
    ).slice(0, limit);

    return {
      query,
      pins: uniquePins,
      count: uniquePins.length,
    };

  } catch (error) {
    console.error('Error searching Pinterest images:', error);
    throw new Error(`Failed to search Pinterest images: ${error}`);
  }
}

/**
 * Export the main function as default for convenience
 */
export default searchPinterestImages;
