/**
 * Pinterest Types
 * 
 * Type definitions for Pinterest image search results
 */

export interface PinterestPin {
  /** Title/description of the pin */
  title: string;
  
  /** Image URL */
  image: string;
  
  /** Direct URL to the Pinterest pin */
  url: string;
  
  /** Pinterest pin ID (extracted from URL) */
  pinId?: string;
}

export interface PinterestSearchOptions {
  /** Search query */
  query: string;
  
  /** Maximum number of results (default: 20) */
  limit?: number;
}

export interface PinterestSearchResult {
  /** Search query used */
  query: string;
  
  /** Array of Pinterest pins */
  pins: PinterestPin[];
  
  /** Total number of results found */
  count: number;
}
