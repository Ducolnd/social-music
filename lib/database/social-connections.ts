/**
 * Social Connections Database Utilities
 * 
 * Helper functions for interacting with the social_connections table
 */

import { createClient } from '@/lib/supabase/server';
import type {
  SocialConnection,
  SocialConnectionInsert,
  SocialConnectionUpdate,
  Platform,
} from '@/lib/types/social-connections';

/**
 * Get all social connections for the current user
 */
export async function getUserConnections(): Promise<SocialConnection[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('social_connections')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch connections: ${error.message}`);
  }

  return data || [];
}

/**
 * Get a specific social connection for the current user
 */
export async function getUserConnection(
  platform: Platform
): Promise<SocialConnection | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('social_connections')
    .select('*')
    .eq('platform', platform)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned
      return null;
    }
    throw new Error(`Failed to fetch connection: ${error.message}`);
  }

  return data;
}

/**
 * Get connections for specific platforms
 */
export async function getUserConnectionsByPlatforms(
  platforms: Platform[]
): Promise<SocialConnection[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
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
 * Create a new social connection
 */
export async function createConnection(
  connection: SocialConnectionInsert
): Promise<SocialConnection> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('social_connections')
    .insert(connection)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create connection: ${error.message}`);
  }

  return data;
}

/**
 * Update an existing social connection
 */
export async function updateConnection(
  platform: Platform,
  updates: SocialConnectionUpdate
): Promise<SocialConnection> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('social_connections')
    .update(updates)
    .eq('platform', platform)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update connection: ${error.message}`);
  }

  return data;
}

/**
 * Delete a social connection
 */
export async function deleteConnection(platform: Platform): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from('social_connections')
    .delete()
    .eq('platform', platform);

  if (error) {
    throw new Error(`Failed to delete connection: ${error.message}`);
  }
}

/**
 * Upsert (insert or update) a social connection
 * Useful for OAuth callbacks where we might be creating or updating a connection
 */
export async function upsertConnection(
  connection: SocialConnectionInsert
): Promise<SocialConnection> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('social_connections')
    .upsert(connection, {
      onConflict: 'user_id,platform',
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to upsert connection: ${error.message}`);
  }

  return data;
}

/**
 * Check if a connection exists for a platform
 */
export async function connectionExists(platform: Platform): Promise<boolean> {
  const connection = await getUserConnection(platform);
  return connection !== null;
}

