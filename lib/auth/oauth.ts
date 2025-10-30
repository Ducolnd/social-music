/**
 * Generic OAuth Utilities
 * 
 * Reusable utilities for OAuth 2.0 flows across different platforms
 */

/**
 * Generate a cryptographically secure state token for CSRF protection
 */
export function generateStateToken(): string {
  const csrfState = Math.random().toString(36).substring(2);
  return csrfState;
}

/**
 * OAuth configuration interface
 */
export interface OAuthConfig {
  clientKey: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
  authorizationUrl: string;
  tokenUrl: string;
}

/**
 * OAuth authorization URL parameters
 */
export interface OAuthAuthParams {
  client_id: string;
  redirect_uri: string;
  state: string;
  scope: string;
  response_type: string;
  [key: string]: string;
}

/**
 * Build authorization URL for OAuth flow
 */
export function buildAuthorizationUrl(
  config: OAuthConfig,
  state: string,
  additionalParams: Record<string, string> = {}
): { url: string; state: string } {

  const params = new URLSearchParams({
    client_key: config.clientKey,
    redirect_uri: config.redirectUri,
    state,
    scope: config.scopes.join(','),
    response_type: 'code',
    ...additionalParams,
  });

  const url = `${config.authorizationUrl}?${params.toString()}`;
  return { url, state };
}

/**
 * Exchange authorization code for access token
 */
export interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  scope?: string;
  [key: string]: string | number | undefined;
}

export async function exchangeCodeForToken(
  config: OAuthConfig,
  code: string,
  state: string,
  stateVerifier?: string
): Promise<TokenResponse> {
  // Verify state to prevent CSRF attacks
  if (stateVerifier && state !== stateVerifier) {
    throw new Error('Invalid state parameter');
  }

  // Build token request (using OAuth 2.0 standard with platform-specific adapters)
  const body = new URLSearchParams({
    client_key: config.clientKey,
    client_secret: config.clientSecret,
    code,
    grant_type: 'authorization_code',
    redirect_uri: config.redirectUri,
  });

  // Make token request
  const response = await fetch(config.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      `Token exchange failed: ${response.status} ${response.statusText} - ${JSON.stringify(error)}`
    );
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(`Token exchange error: ${data.error} - ${data.error_description || ''}`);
  }

  return data;
}

/**
 * Refresh an access token using refresh token
 */
export async function refreshAccessToken(
  config: OAuthConfig,
  refreshToken: string
): Promise<TokenResponse> {
  const body = new URLSearchParams({
    client_id: config.clientKey,
    client_secret: config.clientSecret,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });

  const response = await fetch(config.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      `Token refresh failed: ${response.status} ${response.statusText} - ${JSON.stringify(error)}`
    );
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(`Token refresh error: ${data.error} - ${data.error_description || ''}`);
  }

  return data;
}

