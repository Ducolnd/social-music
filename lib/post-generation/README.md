# Post Generation POC

A Proof of Concept implementation for generating social media posts with AI-powered captions and image selection.

## Features

- **Multi-step workflow**: Guided process for creating posts
- **Pexels Integration**: Search and select images from Pexels API
- **Gemini AI Integration**: Generate compelling captions using Google's Gemini AI
- **TikTok-style Preview**: Preview posts with caption overlays
- **Strongly Typed APIs**: Full TypeScript support with type-safe API routes

## Setup

### Environment Variables

Add the following to your `.env.local` file:

```bash
# Pexels API Key
# Get your key from: https://www.pexels.com/api/
PEXELS_API_KEY=your_pexels_api_key_here

# Gemini API Key
# Get your key from: https://ai.google.dev/
GEMINI_API_KEY=your_gemini_api_key_here
```

### API Keys

1. **Pexels API**:
   - Sign up at https://www.pexels.com/api/
   - Free tier includes 200 requests per hour
   - Copy your API key from the dashboard

2. **Gemini API**:
   - Sign up at https://ai.google.dev/
   - Get your API key from the Google AI Studio
   - Free tier includes generous usage limits

## Architecture

### API Routes

- `/api/pexels/search` - Search for images on Pexels
- `/api/gemini/captions` - Generate captions using Gemini AI

### Library Structure

```
lib/
├── pexels/
│   └── client.ts          # Server-side Pexels client (uses official types from 'pexels' package)
├── gemini/
│   └── client.ts          # Server-side Gemini client
├── api/
│   ├── pexels.ts          # Client-side Pexels API calls (uses PhotosWithTotalResults from 'pexels')
│   └── gemini.ts          # Client-side Gemini API calls
└── types/
    ├── gemini.ts           # Gemini type definitions
    └── post-generation.ts  # Post generation workflow types (uses Photo from 'pexels')
```

### Page Component

- `app/dashboard/video-generation/page.tsx` - Main post generation page with multi-step workflow

## Usage

1. Navigate to `/dashboard/video-generation`
2. Follow the step-by-step workflow:
   - Step 1: Generate initial caption options (mock)
   - Step 2: Search for images on Pexels
   - Step 3: Select an image
   - Step 4: Generate captions with Gemini AI
   - Step 5: Select up to 5 captions
   - Step 6: Preview final variants
   - Step 7: Success screen

## API Documentation

### Pexels Search API

**GET** `/api/pexels/search?query=music&per_page=10`

**POST** `/api/pexels/search`
```json
{
  "query": "music",
  "per_page": 10,
  "orientation": "portrait",
  "size": "medium"
}
```

**Response:**
```typescript
{
  total_results: number;
  page: number;
  per_page: number;
  photos: Photo[];
  next_page?: number;
}
```

Note: We use the official `Photo` and `PhotosWithTotalResults` types from the `pexels` package instead of custom types.

### Gemini Captions API

**POST** `/api/gemini/captions`
```json
{
  "context": "Music producer creating electronic dance music content",
  "keyword": "late night vibes"
}
```

**Response:**
```typescript
{
  captions: string[];
}
```

## Type Safety

All API routes return strongly typed responses:

```typescript
import { searchPexelsPhotos } from '@/lib/api/pexels';
import { generateGeminiCaptions } from '@/lib/api/gemini';

// Type-safe Pexels search
const result = await searchPexelsPhotos({
  query: 'music',
  per_page: 10,
});
// result is typed as PhotosWithTotalResults from 'pexels' package

// Type-safe Gemini caption generation
const captions = await generateGeminiCaptions({
  context: '...',
  keyword: '...',
});
// captions is typed as GeminiCaptionResponse
```

## Future Enhancements

- [ ] Replace mock user context with actual settings table
- [ ] Implement actual TikTok posting functionality
- [ ] Add image editing capabilities
- [ ] Support for multiple platforms
- [ ] Save drafts functionality
- [ ] Analytics and tracking

