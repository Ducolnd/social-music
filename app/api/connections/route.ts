/**
 * Connections API Route
 * 
 * Returns the current user's social media connections
 */

import { NextResponse } from 'next/server';
import { socialConnectionsService } from '@/lib/services/social-connections-service';

export async function GET() {
  try {
    const platforms = ['tiktok', 'soundcloud', 'youtube', 'instagram'] as const;
    
    // Fetch connections for all platforms
    const allConnections = await socialConnectionsService.getAllConnections();
    
    // Build connections map
    const connections: Record<string, unknown | null> = {};
    for (const platform of platforms) {
      const connection = allConnections.find(c => c.platform === platform);
      connections[platform] = connection || null;
    }
    
    return NextResponse.json({ connections });
  } catch (error) {
    console.error('Failed to fetch connections:', error);
    return NextResponse.json(
      { error: 'Failed to fetch connections' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform');
    
    if (!platform) {
      return NextResponse.json(
        { error: 'Platform parameter required' },
        { status: 400 }
      );
    }
    
    await socialConnectionsService.deleteConnection(platform as 'tiktok' | 'soundcloud' | 'youtube' | 'instagram');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete connection:', error);
    return NextResponse.json(
      { error: 'Failed to delete connection' },
      { status: 500 }
    );
  }
}

