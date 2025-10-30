# Story: TikTok Integration + Spotify API + Pinterest Scraper

Status: ContextReadyDraft

## Story

As a music producer,
I want to connect my TikTok account, fetch music data from Spotify, scrape photos from Pinterest, and generate videos automatically,
so that I can create and post social media content without manual video editing.

## Acceptance Criteria

### TikTok Integration (Already Complete)
1. ✅ TikTok accounts table is created in database
2. ✅ TikTok Login Kit integration is implemented (authentication flow)
3. ✅ TikTok Content Kit integration is implemented (video posting capability)
4. ✅ Users can connect their TikTok account via Login Kit
5. ✅ Access tokens are stored securely in database
6. ✅ TikTok integration library/utility is created for reusable API calls
7. ✅ Users can verify TikTok connection status in dashboard

### Spotify API Integration
8. Spotify accounts table is created in database
9. Users can connect their Spotify account via OAuth
10. OAuth callback stores access tokens securely
11. Users can search for artists on Spotify
12. Users can search for songs/tracks on Spotify
13. Users can search for playlists on Spotify
14. Results are displayed in dashboard with metadata (title, artist, album, duration, etc.)
15. Users can select music data for video generation

### Pinterest Scraper Integration
16. Pinterest scraper utility is created
17. Users can search for photos/pins on Pinterest
18. Scraper returns image URLs based on search queries
19. Scraped images are displayed in dashboard
20. Users can select images for video generation
21. Error handling works for scraping failures

### Video Generation & Posting
22. Users can select music data and images for video generation
23. Video generation triggers n8n webhook with required data
24. Generated videos are displayed in dashboard
25. Users can post generated videos to TikTok via Content Kit
26. Posting status is tracked and displayed
27. Error handling works for API failures
28. Loading states are shown during async operations

## Tasks / Subtasks

### TikTok Integration (Already Complete)
- [x] Create database migration for tiktok_accounts table (AC: 1)
- [x] Create `lib/tiktok/login-kit.ts` - TikTok Login Kit integration (AC: 2)
- [x] Create `lib/tiktok/content-kit.ts` - TikTok Content Kit integration (AC: 3)
- [x] Create `lib/tiktok/client.ts` - Reusable TikTok API client library (AC: 6)
- [x] Create `app/api/auth/tiktok/callback/route.ts` for Login Kit callback (AC: 4)
- [x] Create `app/api/auth/tiktok/initiate/route.ts` for Login Kit initiation (AC: 4)
- [ ] Create `app/api/tiktok/post/route.ts` for video posting via Content Kit (AC: 25)
- [x] Add TikTok connection UI to dashboard (AC: 4, 7)
- [x] Implement connection status verification (AC: 7)

### Spotify API Integration
- [ ] Create database migration for spotify_accounts table (AC: 8)
- [ ] Create `lib/spotify/client.ts` - Spotify API client library (AC: 11, 12, 13)
- [ ] Create `app/api/auth/spotify/callback/route.ts` for OAuth callback (AC: 10)
- [ ] Create `app/api/auth/spotify/initiate/route.ts` for OAuth initiation (AC: 9)
- [ ] Create `app/api/spotify/search/route.ts` for artist/track/playlist search (AC: 11, 12, 13)
- [ ] Add Spotify connection UI to dashboard (AC: 9)
- [ ] Display search results with metadata in UI (AC: 14)
- [ ] Add music selection functionality for video generation (AC: 15)

### Pinterest Scraper Integration
- [x] Create `lib/pinterest/scraper.ts` - Pinterest scraping utility (AC: 16, 18)
- [x] Create `app/api/pinterest/search/route.ts` for image searching (AC: 17)
- [x] Implement image scraping with query support (AC: 18)
- [ ] Display scraped images in dashboard (AC: 19)
- [ ] Add image selection functionality for video generation (AC: 20)
- [x] Implement error handling for scraping failures (AC: 21)

### Video Generation & Posting
- [ ] Create `app/api/video/generate/route.ts` for n8n webhook integration (AC: 23)
- [ ] Update `app/dashboard/video-generation/page.tsx` with music and image selection UI
- [ ] Add "Generate Video" button functionality (AC: 22, 23)
- [ ] Create API route to fetch generated videos (AC: 24)
- [ ] Update dashboard to display generated videos (AC: 24)
- [ ] Add "Post to TikTok" functionality (AC: 25)
- [ ] Display posting status for videos (AC: 26)
- [ ] Implement error handling for API failures (AC: 27)
- [ ] Add loading states during async operations (AC: 28)

## Dev Notes

### Technical Summary

Complete TikTok integration (Login Kit and Content Kit already done), implement Spotify API integration for music data, Pinterest scraper for images, and n8n webhook integration for video generation and posting. Users should be able to:
1. ✅ Connect their TikTok account using Login Kit (already complete)
2. ✅ Use reusable TikTok integration library for API interactions (already complete)
3. Connect their Spotify account via OAuth
4. Search for artists, tracks, and playlists on Spotify
5. Scrape photos from Pinterest based on search queries
6. Select music and images to generate videos via n8n automation
7. Post generated videos to TikTok using Content Kit
8. Track posting status and view all generated content

### Project Structure Notes

- Files already created (TikTok integration - complete):
  - `supabase/migrations/20250128_create_social_connections.sql` (includes tiktok_accounts)
  - `lib/tiktok/login-kit.ts` ✅
  - `lib/tiktok/content-kit.ts` ✅
  - `lib/tiktok/client.ts` ✅
  - `app/api/auth/tiktok/callback/route.ts` ✅
  - `app/api/auth/tiktok/initiate/route.ts` ✅
- Files to create:
  - `supabase/migrations/20250128_create_spotify_accounts.sql` (new)
  - `lib/spotify/client.ts` (new - Spotify API client library)
  - `lib/pinterest/scraper.ts` (new - Pinterest scraping utility)
  - `app/api/auth/spotify/callback/route.ts` (new)
  - `app/api/auth/spotify/initiate/route.ts` (new)
  - `app/api/spotify/search/route.ts` (new)
  - `app/api/pinterest/search/route.ts` (new)
  - `app/api/tiktok/post/route.ts` (new - for video posting)
  - `app/api/video/generate/route.ts` (new)
  - `app/api/video/generated/route.ts` (new)
- Files to update:
  - `app/dashboard/video-generation/page.tsx` (music and image selection UI, posting)
  - `app/dashboard/settings/connections/page.tsx` (add Spotify connection UI)
  - `app/dashboard/page.tsx` (display generated videos and posting status)
- Expected test locations: `__tests__/api/`, `__tests__/app/`, `__tests__/lib/spotify/`, `__tests__/lib/pinterest/`
- Estimated effort: 7 story points (7-9 days)

### References

- **Tech Spec:** See tech-spec-social-music-backbone.md for detailed implementation
- **Architecture:** Next.js 14 App Router with API routes
- **External APIs:** 
  - TikTok API (Login Kit + Content Kit) - https://developers.tiktok.com/doc/tiktok-login-kit-getting-started ✅
  - Spotify API (OAuth + Web API) - https://developer.spotify.com/documentation/web-api
  - Pinterest scraping (custom utility) - Note: May need to use unofficial API or web scraping
  - n8n webhook for video generation
- **Database:** Supabase PostgreSQL
- **Library Pattern:** Create reusable Spotify integration library and Pinterest scraping utility for maintainable API interactions

## Dev Agent Record

### Context Reference

- `docs/stories/story-context-1.2.xml` - Story context for TikTok/Spotify API/Pinterest integration and video generation (needs regeneration)

### Agent Model Used

<!-- Will be populated during dev-story execution -->

### Debug Log References

<!-- Will be populated during dev-story execution -->

### Completion Notes List

**2025-01-XX: Pinterest Scraper Implementation**
- Created Pinterest image search using Google Search API (googlethis + google-img-scrap)
- Uses dual-method approach: GOOGLE_IMG_SCRAP and googlethis.image for comprehensive results
- Implements domain restriction to Pinterest.com and site: operator for accurate results
- Combines results from both methods with deduplication based on URL
- Automatically extracts Pinterest pin IDs from URLs
- Created comprehensive type definitions for Pinterest data structures
- Implemented API route with both GET and POST support for searching Pinterest images
- Added comprehensive documentation
- **ADVANTAGES**: 
  - Less likely to violate Pinterest's ToS (using Google search instead of direct scraping)
  - More stable and faster than browser automation
  - No heavy dependencies (no Playwright/headless browser needed)
  - Better reliability using Google's infrastructure
  - Still not an official Pinterest API - results depend on Google's index

### File List

- `lib/pinterest/scraper.ts` - Pinterest search utility using Google (95 lines)
- `lib/pinterest/README.md` - Documentation (156 lines)
- `lib/types/pinterest.ts` - Type definitions for Pinterest data structures (38 lines)
- `app/api/pinterest/search/route.ts` - API route for Pinterest image searching (120 lines)

