/**
 * Social Connections Service
 * 
 * Central service for managing social media platform connections.
 * This service provides a clean interface for working with the social_connections table.
 */

import { createClient } from '@/lib/supabase/server';
import type {
  SocialConnection,
  SocialConnectionInsert,
  SocialConnectionUpdate,
  Platform,
} from '@/lib/types/social-connections';

export class SocialConnectionsService {
  private supabase: any;

  constructor() {
    // Initialize Supabase client (will be async in actual usage)
    this.supabase = null;
  }

  /**
   * Initialize the Supabase client
   * Call this before using any other methods
   */
  private async init() {
    if (!this.supabase) {
      this.supabase = await createClient();
    }
  }

  /**
   * Get all social connections for the current authenticated user
   */
  async getAllConnections(): Promise<SocialConnection[]> {
    await this.init();
    const { data, error } = await this.supabase
      .from('social_connections')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch connections: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Get a specific connection by platform
   */
  async getConnection(platform: Platform): Promise<SocialConnection | null> {
    await this.init();
    const { data, error } = await this.supabase
      .from('social_connections')
      .select('*')
      .eq('platform', platform)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return null;
      }
      throw new Error(`Failed to fetch ${platform} connection: ${error.message}`);
    }

    return data;
  }

  /**
   * Check if a connection exists for a platform
   */
  async hasConnection(platform: Platform): Promise<boolean> {
    const connection = await this.getConnection(platform);
    return connection !== null;
  }

  /**
   * Create a new social connection
   * Throws error if connection already exists for this platform
   */
  async createConnection(connection: SocialConnectionInsert): Promise<SocialConnection> {
    await this.init();
    const { data, error } = await this.supabase
      .from('social_connections')
      .insert(connection)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create ${connection.platform} connection: ${error.message}`);
    }

    return data;
  }

  /**
   * Update an existing social connection
   * Only updates if connection exists
   */
  async updateConnection(
    platform: Platform,
    updates: SocialConnectionUpdate
  ): Promise<SocialConnection> {
    await this.init();
    const { data, error } = await this.supabase
      .from('social_connections')
      .update(updates)
      .eq('platform', platform)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update ${platform} connection: ${error.message}`);
    }

    return data;
  }

  /**
   * Upsert (insert or update) a social connection
   * Useful for OAuth callbacks where we might be creating or refreshing a connection
   */
  async upsertConnection(connection: SocialConnectionInsert): Promise<SocialConnection> {
    await this.init();
    const { data, error } = await this.supabase
      .from('social_connections')
      .upsert(connection, {
        onConflict: 'user_id,platform',
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to upsert ${connection.platform} connection: ${error.message}`);
    }

    return data;
  }

  /**
   * Delete a social connection
   */
  async deleteConnection(platform: Platform): Promise<void> {
    await this.init();
    const { error } = await this.supabase
      .from('social_connections')
      .delete()
      .eq('platform', platform);

    if (error) {
      throw new Error(`Failed to delete ${platform} connection: ${error.message}`);
    }
  }

  /**
   * Get all connections for specific platforms
   */
  async getConnectionsByPlatforms(platforms: Platform[]): Promise<SocialConnection[]> {
    await this.init();
    const { data, error } = await this.supabase
      .from('social_connections')
      .select('*')
      .in('platform', platforms)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch connections: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Refresh an access token for a platform
   */
  async refreshToken(
    platform: Platform,
    newAccessToken: string,
    newRefreshToken?: string | null,
    expiresAt?: string | null
  ): Promise<SocialConnection> {
    return this.updateConnection(platform, {
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
      expires_at: expiresAt,
    });
  }

  /**
   * Get connections grouped by platform status (connected/disconnected)
   */
  async getConnectionsStatus(platforms: Platform[]): Promise<Record<Platform, boolean>> {
    const connections = await this.getConnectionsByPlatforms(platforms);
    const status: Record<Platform, boolean> = {} as Record<Platform, boolean>;

    platforms.forEach(platform => {
      status[platform] = connections.some(c => c.platform === platform);
    });

    return status;
  }
}

// Export a singleton instance for convenience
export const socialConnectionsService = new SocialConnectionsService();

