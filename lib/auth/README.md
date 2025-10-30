# OAuth Authentication Library

This directory contains reusable OAuth utilities and platform-specific implementations.

## Architecture

The OAuth implementation follows a two-layer architecture:

1. **Generic OAuth Utilities** (`oauth.ts`) - Reusable OAuth 2.0 utilities
2. **Platform-Specific Implementations** (e.g., `tiktok.ts`) - Platform configurations

## Generic OAuth Flow

The generic OAuth utilities provide:

- `generateStateToken()` - Generate secure CSRF state tokens
- `buildAuthorizationUrl()` - Build OAuth authorization URLs
- `exchangeCodeForToken()` - Exchange authorization code for access token
- `refreshAccessToken()` - Refresh expired access tokens

## Platform Implementations

### TikTok OAuth

**Files:**
- `lib/auth/tiktok.ts` - TikTok OAuth configuration and API helpers
- `app/api/auth/tiktok/initiate/route.ts` - Initiate OAuth flow
- `app/api/auth/tiktok/callback/route.ts` - Handle OAuth callback

**Environment Variables:**
```env
TIKTOK_CLIENT_KEY=your_client_key
TIKTOK_CLIENT_SECRET=your_client_secret
TIKTOK_REDIRECT_URI=http://localhost:3000/api/auth/tiktok/callback
```

**Usage:**

1. User clicks "Connect TikTok" button linking to `/api/auth/tiktok/initiate`
2. User is redirected to TikTok authorization page
3. After authorization, TikTok redirects to `/api/auth/tiktok/callback`
4. Callback exchanges code for tokens and stores in database
5. User is redirected to connections page with success message

**Scopes Used:**
- `user.info.basic` - Get basic user information
- `video.upload` - Upload videos to TikTok

## Adding New Platforms

To add OAuth support for a new platform:

1. **Create platform configuration** (`lib/auth/platform-name.ts`):
   ```typescript
   export function getPlatformOAuthConfig(): OAuthConfig {
     return {
       clientId: process.env.PLATFORM_CLIENT_ID,
       clientSecret: process.env.PLATFORM_CLIENT_SECRET,
       redirectUri: process.env.PLATFORM_REDIRECT_URI,
       scopes: ['scope1', 'scope2'],
       authorizationUrl: 'https://platform.com/oauth/authorize',
       tokenUrl: 'https://platform.com/oauth/token',
     };
   }
   ```

2. **Create OAuth routes**:
   - `app/api/auth/platform-name/initiate/route.ts` - Initiate OAuth
   - `app/api/auth/platform-name/callback/route.ts` - Handle callback

3. **Update environment variables** and platform configuration

## Security Features

- **CSRF Protection** - State tokens prevent CSRF attacks
- **Secure State Storage** - State stored in httpOnly cookies
- **State Verification** - State validated on callback
- **Token Storage** - Tokens stored securely in database
- **RLS Policies** - Row-level security ensures users can only access their own data

## Error Handling

All OAuth endpoints handle errors gracefully:
- Invalid state parameters redirect with error
- Token exchange failures redirect with error
- All errors logged for debugging
- User-friendly error messages in redirects

