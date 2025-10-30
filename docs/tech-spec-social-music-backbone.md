# Social Music - Technical Specification

**Author:** Duco
**Date:** January 27, 2025
**Project Level:** 1
**Project Type:** software
**Development Context:** Brownfield - Building on existing Next.js + Supabase template

---

## Source Tree Structure

```
app/
├── layout.tsx                          # Root layout (existing)
├── page.tsx                           # Landing page (new)
├── auth/
│   ├── login/page.tsx                 # Login (existing)
│   ├── sign-up/page.tsx               # Sign up (existing)
│   └── ...                            # Other auth pages (existing)
├── dashboard/
│   ├── layout.tsx                     # Dashboard layout with sidebar (new)
│   ├── page.tsx                       # Dashboard home (new)
│   ├── video-generation/page.tsx     # Video generation page (new)
│   └── posts/page.tsx                 # Posts management page (new)
├── components/
│   ├── header.tsx                     # Header with navigation (new)
│   ├── footer.tsx                     # Footer with social links (new)
│   ├── sidebar.tsx                    # Sidebar navigation (new)
│   └── ...                            # Existing components
├── lib/
│   ├── supabase/
│   │   ├── client.ts                  # Supabase client (existing)
│   │   ├── server.ts                   # Server client (existing)
│   │   └── middleware.ts               # Middleware (existing)
│   └── utils.ts                       # Utilities (existing)
├── middleware.ts                      # Route protection (existing)
└── ...                                # Other existing files

supabase/
├── migrations/
│   └── 20250127_create_soundcloud_accounts.sql  # SoundCloud accounts table (new)
└── ...                                # Other migrations

public/
└── ...                                # Static assets
```

---

## Technical Approach

**Story 1: Project Backbone**
Build the foundational UI structure and navigation system for the Social Music platform. This includes:
1. Creating dashboard layout with sidebar navigation
2. Building placeholder pages for video generation and posts management
3. Implementing header with user menu and footer with social links
4. Setting up protected routes for authenticated areas
5. Creating landing page for marketing

**Story 2: SoundCloud Integration + Video Generation**
Implement the core feature that allows users to:
1. Connect their SoundCloud account via OAuth
2. Fetch their tracks from SoundCloud
3. Trigger n8n automation to generate videos
4. Display generated videos in the dashboard

**Architecture Pattern:**
- Client-side: Next.js 14 App Router with React Server Components
- Authentication: Supabase Auth (already implemented)
- Database: Supabase PostgreSQL
- Video Generation: n8n automation via webhook
- Image Source: Public no-copyright image database (e.g., Unsplash API)

---

## Implementation Stack

**Frontend:**
- Next.js 14.2.0 (App Router)
- React 18.3.1
- TypeScript 5.3.3
- Tailwind CSS 3.4.1
- shadcn/ui components (existing)

**Backend:**
- Supabase Auth (existing)
- Supabase PostgreSQL 15.1
- Supabase JavaScript Client 2.39.3

**External Services:**
- SoundCloud API (OAuth + track fetching)
- n8n automation platform (webhook integration)
- Unsplash API (no-copyright images)

**Development Tools:**
- Node.js 20.11.0
- npm 10.2.4
- Git for version control

---

## Technical Details

### Story 1: Project Backbone

#### 1. Dashboard Layout (`app/dashboard/layout.tsx`)
- Create dashboard layout component with sidebar navigation
- Include sidebar component for navigation menu
- Wrap children with layout structure
- Implement responsive design for mobile/desktop

#### 2. Sidebar Navigation (`components/sidebar.tsx`)
- Navigation items:
  - Dashboard (home icon)
  - Video Generation (video icon)
  - Posts Management (list icon)
- Active state highlighting
- Collapsible on mobile
- User profile section at bottom

#### 3. Header Component (`components/header.tsx`)
- Logo/brand name
- User menu dropdown:
  - Profile
  - Settings
  - Logout
- Responsive design

#### 4. Footer Component (`components/footer.tsx`)
- Social media links (Instagram, Twitter, TikTok, YouTube)
- Copyright notice
- Additional links (About, Privacy, Terms)

#### 5. Dashboard Home Page (`app/dashboard/page.tsx`)
- Welcome message
- Quick stats placeholder
- Recent activity placeholder
- Call-to-action to create first video

#### 6. Video Generation Page (`app/dashboard/video-generation/page.tsx`)
- Placeholder content: "Video Generation - Connect your SoundCloud account to start creating videos"
- Empty state with instructions
- Future: Form to select track and generate video

#### 7. Posts Management Page (`app/dashboard/posts/page.tsx`)
- Placeholder content: "Posts Management - View and manage your social media posts"
- Empty state with instructions
- Future: List of generated videos and posts

#### 8. Landing Page (`app/page.tsx`)
- Hero section with value proposition
- Features section
- Call-to-action to sign up
- Footer with social links

#### 9. Protected Routes (`middleware.ts`)
- Protect `/dashboard/*` routes
- Redirect unauthenticated users to login
- Use existing Supabase middleware

### Story 2: SoundCloud Integration + Video Generation

#### 1. Database Schema (`supabase/migrations/20250127_create_soundcloud_accounts.sql`)
```sql
CREATE TABLE soundcloud_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  soundcloud_user_id TEXT NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  username TEXT NOT NULL,
  profile_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE INDEX idx_soundcloud_accounts_user_id ON soundcloud_accounts(user_id);
```

#### 2. SoundCloud OAuth Integration
- Create OAuth flow using SoundCloud API
- Store access tokens securely in database
- Implement token refresh mechanism
- Create API route for OAuth callback

#### 3. Track Fetching
- Create API route to fetch user's tracks from SoundCloud
- Display tracks in dashboard
- Allow user to select track for video generation

#### 4. n8n Webhook Integration
- Create API route to trigger n8n automation
- Fetch image from Unsplash API (based on track metadata)
- Generate caption from track title and artist
- Send webhook to n8n with:
  - Image URL (from Unsplash)
  - SoundCloud track URL
  - Generated caption
  - User ID for tracking

#### 5. Video Generation Display
- Show generated videos in dashboard
- Display video preview
- Allow user to download or share

---

## Development Setup

### Prerequisites
- Node.js 20.11.0 or higher
- npm 10.2.4 or higher
- Supabase account and project
- SoundCloud API credentials
- n8n instance (self-hosted or cloud)

### Environment Variables
```env
# Existing Supabase variables
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# New variables for Story 2
SOUNDCLOUD_CLIENT_ID=your_soundcloud_client_id
SOUNDCLOUD_CLIENT_SECRET=your_soundcloud_client_secret
N8N_WEBHOOK_URL=your_n8n_webhook_url
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

### Installation Steps
1. Clone repository (already done)
2. Install dependencies: `npm install`
3. Run database migrations: `supabase db push`
4. Set up environment variables
5. Start development server: `npm run dev`

---

## Implementation Guide

### Phase 1: Project Backbone (Story 1)

**Step 1: Create Dashboard Layout**
- Create `app/dashboard/layout.tsx`
- Implement sidebar navigation
- Add header and footer components
- Set up responsive design

**Step 2: Build Sidebar Navigation**
- Create `components/sidebar.tsx`
- Add navigation items (Dashboard, Video Generation, Posts)
- Implement active state logic
- Add user profile section

**Step 3: Create Header Component**
- Create `components/header.tsx`
- Add logo/brand
- Implement user menu dropdown
- Add logout functionality

**Step 4: Create Footer Component**
- Create `components/footer.tsx`
- Add social media links
- Add copyright notice
- Style with Tailwind

**Step 5: Create Dashboard Pages**
- Create `app/dashboard/page.tsx` (home)
- Create `app/dashboard/video-generation/page.tsx` (placeholder)
- Create `app/dashboard/posts/page.tsx` (placeholder)
- Add placeholder content describing each page

**Step 6: Create Landing Page**
- Update `app/page.tsx`
- Add hero section
- Add features section
- Add call-to-action

**Step 7: Set Up Protected Routes**
- Verify `middleware.ts` is protecting `/dashboard/*`
- Test authentication flow
- Ensure redirects work correctly

### Phase 2: SoundCloud Integration + Video Generation (Story 2)

**Step 1: Create Database Migration**
- Create `supabase/migrations/20250127_create_soundcloud_accounts.sql`
- Run migration: `supabase db push`
- Verify table creation

**Step 2: Implement SoundCloud OAuth**
- Create `app/api/auth/soundcloud/callback/route.ts`
- Create OAuth initiation endpoint
- Handle OAuth callback and store tokens
- Test OAuth flow

**Step 3: Create Track Fetching API**
- Create `app/api/soundcloud/tracks/route.ts`
- Fetch user's tracks from SoundCloud
- Return tracks as JSON
- Handle errors gracefully

**Step 4: Create n8n Webhook Integration**
- Create `app/api/video/generate/route.ts`
- Fetch image from Unsplash API
- Generate caption from track metadata
- Send webhook to n8n with required data
- Return job ID for tracking

**Step 5: Build Video Generation UI**
- Update `app/dashboard/video-generation/page.tsx`
- Add SoundCloud connection button
- Display user's tracks
- Add "Generate Video" button
- Show loading state during generation

**Step 6: Display Generated Videos**
- Create API route to fetch generated videos
- Update dashboard to show videos
- Add video preview component
- Implement download/share functionality

---

## Testing Approach

### Story 1 Testing
- **Unit Tests**: Test sidebar navigation logic
- **Component Tests**: Test header/footer rendering
- **Integration Tests**: Test protected route redirects
- **Manual Testing**: Verify responsive design on mobile/desktop

### Story 2 Testing
- **Unit Tests**: Test SoundCloud API integration
- **Integration Tests**: Test OAuth flow end-to-end
- **API Tests**: Test n8n webhook integration
- **E2E Tests**: Test video generation workflow

### Testing Tools
- Jest 29.7.0 for unit tests
- React Testing Library 14.1.2 for component tests
- Playwright 1.41.0 for E2E tests

---

## Deployment Strategy

### Development
- Local development with `npm run dev`
- Supabase local instance for testing
- n8n local instance for webhook testing

### Staging
- Deploy to Vercel preview environment
- Connect to Supabase staging project
- Use n8n staging instance

### Production
- Deploy to Vercel production
- Connect to Supabase production project
- Use n8n production instance
- Monitor with Vercel Analytics

### Environment Management
- Use Vercel environment variables
- Separate Supabase projects per environment
- Use n8n webhook URLs per environment

---

## Success Criteria

### Story 1 Success
- ✅ Dashboard layout renders correctly
- ✅ Sidebar navigation works on all pages
- ✅ Protected routes redirect unauthenticated users
- ✅ All placeholder pages display correctly
- ✅ Landing page looks professional
- ✅ Responsive design works on mobile/desktop

### Story 2 Success
- ✅ Users can connect SoundCloud account
- ✅ Tracks are fetched and displayed
- ✅ Video generation triggers n8n automation
- ✅ Generated videos are displayed in dashboard
- ✅ Error handling works for API failures

---

## Future Enhancements

- Add analytics tracking
- Implement video editing capabilities
- Add social media posting integration
- Create user preferences system
- Add batch video generation
- Implement video templates

---

**Next Steps**: Generate epic and stories from this tech spec.

