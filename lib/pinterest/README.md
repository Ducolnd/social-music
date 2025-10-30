# Pinterest Scraper via Google Search

A utility for searching Pinterest images using Google's search API.

## Overview

This implementation searches for Pinterest images using Google's search API instead of directly scraping Pinterest. This approach is:
- **Less likely to violate Pinterest's ToS** - We're not scraping Pinterest directly
- **More stable** - Using Google's infrastructure
- **Faster** - API calls are typically quicker than browser automation
- **More reliable** - Google handles the heavy lifting

## Installation

The scraper requires the following packages:

```bash
npm install googlethis google-img-scrap
```

## Usage

### Basic Usage

```typescript
import { searchPinterestImages } from '@/lib/pinterest/scraper';

// Search for Pinterest images
const result = await searchPinterestImages({
  query: 'gym equipment',
  limit: 20,
});

console.log(`Found ${result.count} pins`);
for (const pin of result.pins) {
  console.log(`- ${pin.title}: ${pin.url}`);
}
```

### Using the API Route

```typescript
// GET request
const response = await fetch('/api/pinterest/search?query=gym&limit=20');
const data = await response.json();
console.log(data.pins);

// POST request
const response = await fetch('/api/pinterest/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: 'gym', limit: 20 }),
});
const data = await response.json();
```

## Data Structure

### PinterestPin

```typescript
interface PinterestPin {
  title: string;    // Title/description of the pin
  image: string;    // Image URL
  url: string;      // Direct URL to the Pinterest pin
  pinId?: string;   // Pinterest pin ID (extracted from URL)
}
```

### PinterestSearchResult

```typescript
interface PinterestSearchResult {
  query: string;           // Search query used
  pins: PinterestPin[];    // Array of Pinterest pins
  count: number;           // Total number of results
}
```

## API Reference

### `searchPinterestImages(options: PinterestSearchOptions): Promise<PinterestSearchResult>`

Search for Pinterest images using Google.

**Options:**
- `query` (string, required): Search query
- `limit` (number, default: 20): Maximum number of results (1-100)

**Returns:** Pinterest search results with an array of pins

## How It Works

The scraper uses two methods to find Pinterest images:

1. **google-img-scrap**: Searches witGoogle for images with Pinterest domain restriction
2. **googlethis**: Searches for Pinterest images using Google's site: operator

The results from both methods are combined and deduplicated based on URL.

## Error Handling

Errors are caught and wrapped in a user-friendly error message:

```typescript
try {
  const result = await searchPinterestImages({ query: 'gym' });
} catch (error) {
  console.error('Search failed:', error.message);
}
```

## Examples

### Example 1: Search and Display Pins

```typescript
import { searchPinterestImages } from '@/lib/pinterest/scraper';

const result = await searchPinterestImages({
  query: 'fitness motivation',
  limit: 10,
});

for (const pin of result.pins) {
  console.log(`${pin.title}`);
  console.log(`  Image: ${pin.image}`);
  console.log(`  URL: ${pin.url}`);
}
```

### Example 2: Filter Pins by ID

```typescript
const result = await searchPinterestImages({
  query: 'workout plans',
  limit: 50,
});

// Get pins that have valid pin IDs
const validPins = result.pins.filter(pin => pin.pinId);
console.log(`Found ${validPins.length} pins with valid IDs`);
```

## Limitations

1. **Search Quality**: Results depend on Google's search quality for Pinterest content
2. **Rate Limiting**: Google may rate-limit requests if used excessively
3. **Image URLs**: Some image URLs may be thumbnails, not full-size images
4. **Not Official**: This is not an official Pinterest API

## Best Practices

1. **Add Delays**: Don't make rapid successive requests. Add delays between requests
2. **Cache Results**: Cache results to avoid redundant requests
3. **Error Handling**: Always handle errors gracefully
4. **Limit Requests**: Don't abuse the service - use reasonable limits

## Alternatives

### Pinterest Official API

Pinterest provides an official API for developers:
- https://developers.pinterest.com/
- More reliable and stable
- Legal and supported by Pinterest
- Better performance

## License & Disclaimer

This scraper is provided as-is for development purposes. Users are responsible for ensuring compliance with Pinterest's Terms of Service, Google's Terms of Service, and applicable laws.
