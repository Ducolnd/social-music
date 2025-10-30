/**
 * Gemini API Types
 * 
 * Type definitions for Gemini caption generation
 */

export interface GeminiCaptionRequest {
  context: string;
  keyword: string;
}

export interface GeminiCaptionResponse {
  captions: string[];
}

export interface GeminiError {
  error: string;
  details?: string;
}

