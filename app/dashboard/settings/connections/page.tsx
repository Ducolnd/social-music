'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { SocialConnection } from '@/lib/types/social-connections';
import type { SpotifyArtist as SpotifyArtistDB } from '@/lib/types/spotify-artist';
import type { Artist } from '@spotify/web-api-ts-sdk';

interface ConnectionStatus {
  [key: string]: SocialConnection | null;
}

export default function ConnectionsSettingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [connections, setConnections] = useState<ConnectionStatus>({});
  const [isLoading, setIsLoading] = useState(true);
  
  // Spotify artist state
  const [spotifyArtist, setSpotifyArtist] = useState<SpotifyArtistDB | null>(null);
  const [isSearchingSpotify, setIsSearchingSpotify] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Artist[]>([]);
  const [isConnectingSpotify, setIsConnectingSpotify] = useState(false);

  // Check for success/error messages in URL
  const success = searchParams.get('success');
  const error = searchParams.get('error');

  useEffect(() => {
    fetchConnections();
    fetchSpotifyArtist();
    
    // Clean up URL params after showing message
    if (success || error) {
      setTimeout(() => {
        router.replace('/dashboard/settings/connections');
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, error]);

  const fetchConnections = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/connections');
      const data = await response.json();
      
      if (response.ok) {
        setConnections(data.connections || {});
      } else {
        console.error('Failed to fetch connections:', data.error);
      }
    } catch (error) {
      console.error('Failed to fetch connections:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSpotifyArtist = async () => {
    try {
      const response = await fetch('/api/spotify/artists');
      const data = await response.json();
      
      if (response.ok) {
        setSpotifyArtist(data.artist);
      }
    } catch (error) {
      console.error('Failed to fetch Spotify artist:', error);
    }
  };

  const handleSearchSpotify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      return;
    }

    try {
      setIsSearchingSpotify(true);
      const response = await fetch(`/api/spotify/artists/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      
      if (response.ok) {
        setSearchResults(data.artists || []);
      } else {
        console.error('Failed to search artists:', data.error);
        alert('Failed to search artists');
      }
    } catch (error) {
      console.error('Failed to search artists:', error);
      alert('Failed to search artists');
    } finally {
      setIsSearchingSpotify(false);
    }
  };

  const handleConnectSpotifyArtist = async (artist: Artist) => {
    try {
      setIsConnectingSpotify(true);
      const response = await fetch('/api/spotify/artists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          artist_id: artist.id,
          artist_name: artist.name,
        }),
      });
      
      if (response.ok) {
        await fetchSpotifyArtist();
        setSearchQuery('');
        setSearchResults([]);
      } else {
        const data = await response.json();
        alert(`Failed to connect artist: ${data.error}`);
      }
    } catch (error) {
      console.error('Failed to connect artist:', error);
      alert('Failed to connect artist');
    } finally {
      setIsConnectingSpotify(false);
    }
  };

  const handleDisconnectSpotifyArtist = async () => {
    if (confirm('Are you sure you want to disconnect your Spotify artist?')) {
      try {
        const response = await fetch('/api/spotify/artists', {
          method: 'DELETE',
        });
        
        if (response.ok) {
          await fetchSpotifyArtist();
        } else {
          const data = await response.json();
          alert(`Failed to disconnect: ${data.error}`);
        }
      } catch (error) {
        console.error('Failed to disconnect Spotify artist:', error);
        alert('Failed to disconnect artist');
      }
    }
  };

  const handleConnect = (platform: string) => {
    router.push(`/api/auth/${platform}/initiate`);
  };

  const handleDisconnect = async (platform: string) => {
    if (confirm(`Are you sure you want to disconnect your ${platform} account?`)) {
      try {
        const response = await fetch(`/api/connections?platform=${platform}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          await fetchConnections();
        } else {
          const data = await response.json();
          alert(`Failed to disconnect: ${data.error}`);
        }
      } catch (error) {
        console.error('Failed to disconnect:', error);
        alert('Failed to disconnect account');
      }
    }
  };

  const platforms = [
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: '🎵',
      bgColor: 'bg-black',
      description: 'Share your music videos to TikTok',
      enabled: true,
    },
    {
      id: 'soundcloud',
      name: 'SoundCloud',
      icon: '☁️',
      bgColor: 'bg-orange-500',
      description: 'Import tracks from SoundCloud',
      enabled: false,
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: '▶️',
      bgColor: 'bg-red-600',
      description: 'Post videos to YouTube',
      enabled: false,
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: '📸',
      bgColor: 'bg-gradient-to-br from-purple-600 to-pink-600',
      description: 'Share to Instagram',
      enabled: false,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media Connections</CardTitle>
        <CardDescription>
          Connect your social media accounts to enable cross-platform posting
        </CardDescription>
        
        {/* Success/Error Messages */}
        {success && (
          <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-500 rounded-md">
            <p className="text-green-700 dark:text-green-400 text-sm">
              ✓ Successfully connected your account!
            </p>
          </div>
        )}
        {error && (
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-500 rounded-md">
            <p className="text-red-700 dark:text-red-400 text-sm">
              ✗ Connection failed. Please try again.
            </p>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8 text-slate-500">Loading connections...</div>
        ) : (
          <div className="space-y-4">
            {/* Spotify Artist Connection */}
            <div className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-xl">
                  🎵
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">Spotify Artist</h3>
                    {spotifyArtist && (
                      <Badge variant="default" className="bg-green-500">
                        Connected
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {spotifyArtist 
                      ? `Connected as ${spotifyArtist.artist_name}`
                      : 'Connect your Spotify artist profile'}
                  </p>
                  {spotifyArtist && (
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                      Connected {new Date(spotifyArtist.created_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
                {spotifyArtist && (
                  <button
                    onClick={handleDisconnectSpotifyArtist}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                  >
                    Disconnect
                  </button>
                )}
              </div>

              {!spotifyArtist && (
                <div className="mt-4">
                  <form onSubmit={handleSearchSpotify} className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Search for your artist name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1"
                      disabled={isSearchingSpotify}
                    />
                    <button
                      type="submit"
                      disabled={isSearchingSpotify || !searchQuery.trim()}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSearchingSpotify ? 'Searching...' : 'Search'}
                    </button>
                  </form>

                  {searchResults.length > 0 && (
                    <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
                      {searchResults.map((artist) => (
                        <div
                          key={artist.id}
                          className="p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                          onClick={() => handleConnectSpotifyArtist(artist)}
                        >
                          <div className="flex items-center gap-3">
                            {artist.images && artist.images.length > 0 && (
                              <img
                                src={artist.images[0].url}
                                alt={artist.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            )}
                            <div className="flex-1">
                              <p className="font-semibold">{artist.name}</p>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                {artist.followers.total.toLocaleString()} followers
                              </p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleConnectSpotifyArtist(artist);
                              }}
                              disabled={isConnectingSpotify}
                              className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Connect
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Other Platform Connections */}
            {platforms.map((platform) => {
              const connection = connections[platform.id];
              const isConnected = connection !== null;

              return (
                <div
                  key={platform.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${platform.bgColor} rounded-lg flex items-center justify-center text-xl`}>
                      {platform.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{platform.name}</h3>
                        {isConnected && (
                          <Badge variant="default" className="bg-green-500">
                            Connected
                          </Badge>
                        )}
                        {!platform.enabled && (
                          <Badge variant="outline">Coming Soon</Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {isConnected 
                          ? `Connected as @${connection?.platform_user_id?.substring(0, 8)}...`
                          : platform.description}
                      </p>
                      {isConnected && connection?.created_at && (
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                          Connected {new Date(connection.created_at).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    {isConnected ? (
                      <button
                        onClick={() => handleDisconnect(platform.id)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                        disabled={!platform.enabled}
                      >
                        Disconnect
                      </button>
                    ) : (
                      <button
                        onClick={() => handleConnect(platform.id)}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!platform.enabled}
                      >
                        Connect
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
