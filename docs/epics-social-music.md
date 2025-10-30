# Social Music - Epic Breakdown

## Epic Overview

**Epic:** Social Music Platform Foundation
**Epic Slug:** social-music-foundation
**Goal:** Build the foundational UI structure and core video generation feature for the Social Music platform, enabling music producers to create social media content automatically.

**Scope:** Create dashboard layout with navigation, placeholder pages for video generation and posts management, SoundCloud integration for track fetching, and n8n automation for video generation.

**Success Criteria:**
- Dashboard with sidebar navigation is fully functional
- All placeholder pages display correctly with descriptive content
- Users can connect SoundCloud account via OAuth
- Users can fetch and display their tracks from SoundCloud
- Video generation triggers n8n automation successfully
- Generated videos are displayed in dashboard

**Dependencies:** None (starting from scratch)

---

## Epic Details

### Epic: Social Music Platform Foundation

**Epic Goal:** Build the foundational UI structure and core video generation feature for the Social Music platform, enabling music producers to create social media content automatically.

**Epic Scope:**
- Create dashboard layout with sidebar navigation
- Build placeholder pages for video generation and posts management
- Implement SoundCloud OAuth integration
- Create n8n webhook integration for video generation
- Display generated videos in dashboard

**Epic Success Criteria:**
- Dashboard layout renders correctly with sidebar navigation
- Protected routes redirect unauthenticated users
- Users can connect SoundCloud account
- Tracks are fetched and displayed
- Video generation triggers n8n automation
- Generated videos are displayed in dashboard

---

## Story Map

```
Epic: Social Music Platform Foundation
├── Story 1: Project Backbone (5 points)
│   ├── Dashboard layout with sidebar
│   ├── Header and footer components
│   ├── Placeholder pages (video generation, posts)
│   └── Landing page
└── Story 2: SoundCloud Integration + Video Generation (5 points)
    ├── SoundCloud OAuth
    ├── Track fetching
    ├── n8n webhook integration
    └── Video display
```

**Total Story Points:** 10
**Estimated Timeline:** 2 weeks (1 sprint)

---

## Implementation Sequence

1. **Story 1** → Build project backbone (dashboard, header, footer, placeholder pages)
2. **Story 2** → Implement SoundCloud integration and video generation (depends on Story 1)

---

## Story Summaries

### Story 1: Project Backbone
**Story Points:** 5
**Estimated Time:** 5-7 days

Build the foundational UI structure including dashboard layout with sidebar navigation, header with user menu, footer with social links, placeholder pages for video generation and posts management, and landing page.

**Key Deliverables:**
- Dashboard layout with sidebar navigation
- Header component with user menu
- Footer component with social links
- Dashboard home page
- Video generation page (placeholder)
- Posts management page (placeholder)
- Landing page
- Protected routes implementation

### Story 2: SoundCloud Integration + Video Generation
**Story Points:** 5
**Estimated Time:** 5-7 days

Implement SoundCloud OAuth integration, track fetching, n8n webhook integration for video generation, and display generated videos in the dashboard.

**Key Deliverables:**
- SoundCloud accounts database table
- SoundCloud OAuth flow
- Track fetching API
- n8n webhook integration
- Video generation UI
- Generated videos display

---

**Next Steps:** Generate individual story files for implementation.

