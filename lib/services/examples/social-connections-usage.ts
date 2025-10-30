/**
 * Social Connections Service - Usage Examples
 * 
 * This file demonstrates how to use the social connections service
 * for managing OAuth connections across different platforms.
 */

import { socialConnectionsService } from '../social-connections-service';
import type { SocialConnectionInsert } from '@/lib/types/social-connections';

// Example 1: Check if a user has connected a platform
export async function checkPlatformConnection(platform: string) {
  const isConnected = await socialConnectionsService.hasConnection(platform as any);
  console.log(`${platform} is ${isConnected ? 'connected' : 'not connected'}`);
  return isConnected;
}

// Example 2: Get all connections for the current user
export async function getUserConnections() {
  try {
    const connections = await socialConnectionsService.getAllConnections();
    console.log(`User has ${connections.length} platform connections`);
    return connections;
  } catch (error) {
    console.error('Failed to fetch connections:', error);
    throw error;
  }
}

// Example 3: Save a connection after OAuth callback (upsert)
export async function saveOAuthConnection(
  userId: string,
  platform: string,
  platformUserId: string,
  accessToken: string,
  refreshToken?: string | null,
  expiresAt?: string | null
) {
  const connection: SocialConnectionInsert = {
    user_id: userId,
    platform: platform as any,
    platform_user_id: platformUserId,
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_at: expiresAt,
  };

  const savedConnection = await socialConnectionsService.upsertConnection(connection);
  console.log(`Successfully saved ${platform} connection`);
  return savedConnection;
}

// Example 4: Update tokens (e.g., after refresh)
export async function refreshTokens(
  platform: string,
  newAccessToken: string,
  newRefreshToken?: string,
  expiresAt?: string
) {
  const updated = await socialConnectionsService.refreshToken(
    platform as any,
    newAccessToken,
    newRefreshToken,
    expiresAt
  );
  console.log(`${platform} tokens refreshed`);
  return updated;
}

// Example 5: Get connection status for multiple platforms
export async function getPlatformsConnectionStatus() {
  const platforms = ['tiktok', 'soundcloud', 'youtube', 'instagram'] as const;
  const status = await socialConnectionsService.getConnectionsStatus(platforms);
  
  console.log('Platform connection status:');
  Object.entries(status).forEach(([platform, connected]) => {
    console.log(`  ${platform}: ${connected ? '✅ Connected' : '❌ Not connected'}`);
  });
  
  return status;
}

// Example 6: Disconnect a platform
export async function disconnectPlatform(platform: string) {
  await socialConnectionsService.deleteConnection(platform as any);
  console.log(`${platform} connection removed`);
}

// Example 7: Get specific platform connection with error handling
export async function getPlatformConnectionSafely(platform: string) {
  try {
    const connection = await socialConnectionsService.getConnection(platform as any);
    if (!connection) {
      console.log(`${platform} is not connected`);
      return null;
    }
    console.log(`${platform} connected on ${new Date(connection.created_at).toLocaleDateString()}`);
    return connection;
  } catch (error) {
    console.error(`Error fetching ${platform} connection:`, error);
    throw error;
  }
}

