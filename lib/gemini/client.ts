/**
 * Gemini API Client
 * 
 * Server-side client for interacting with the Google Gemini API
 */

import { GoogleGenAI, Type } from '@google/genai';
import type { GeminiCaptionRequest, GeminiCaptionResponse } from '@/lib/types/gemini';

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('GEMINI_API_KEY environment variable is not set');
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const captionSchema = {
  type: Type.OBJECT,
  properties: {
    captions: {
      type: Type.ARRAY,
      description: 'An array of 5 short TikTok captions.',
      items: {
        type: Type.STRING,
        description: 'A single TikTok caption, between 3 and 10 words.',
      },
    },
  },
  required: ['captions'],
};

/**
 * Generate captions using Gemini AI
 */
export async function generateCaptions(
  request: GeminiCaptionRequest
): Promise<GeminiCaptionResponse> {
  try {
    const { context, keyword } = request;

    const prompt = `
      You are an expert social media manager specializing in viral TikTok content. A user is creating a post for their page.

      **Page Context:** "${context}"

      **Post Keyword:** "${keyword}"

      Generate exactly 5 distinct, compelling, and very short (3-10 words) captions for this TikTok post. The captions should be energetic, attention-grabbing, and tailored to the provided context and keyword.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: captionSchema,
        temperature: 0.8,
        topP: 0.9,
      },
    });

    const jsonString = response.text || '';
    if (!jsonString) {
      throw new Error('Empty response from Gemini API');
    }
    const parsed = JSON.parse(jsonString);

    if (parsed && Array.isArray(parsed.captions)) {
      return { captions: parsed.captions };
    } else {
      console.warn('API returned unexpected format:', parsed);
      throw new Error('Invalid response format from Gemini API');
    }
  } catch (error) {
    console.error('Error generating captions:', error);
    throw new Error(
      `Failed to generate captions: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

