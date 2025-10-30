/**
 * Post Generation Types
 * 
 * Type definitions for the post generation workflow
 */

import type { Photo } from 'pexels';

export interface PostGenerationState {
  step: number;
  context: string;
  initialCaptions: string[];
  selectedImage: Photo | null;
  imageSearchQuery: string;
  imageSearchResults: Photo[];
  captionQuery: string;
  generatedCaptions: string[];
  selectedCaptions: string[];
  finalVariants: FinalVariant[];
  selectedVariants: string[];
}

export interface FinalVariant {
  id: string;
  image: Photo;
  caption: string;
}

