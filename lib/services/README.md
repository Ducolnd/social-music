# Services Directory

This directory contains service classes and utilities for interacting with the database and external APIs.

## Social Connections Service

The `social-connections-service.ts` provides a centralized service class for managing social media platform connections.

### Usage

```typescript
import { socialConnectionsService } from '@/lib/services/social-connections-service';

// Get all connections
const connections = await socialConnectionsService.getAllConnections();

// Get a specific connection
const tiktokConnection = await socialConnectionsService.getConnection('tiktok');

// Check if connected
const isConnected = await socialConnectionsService.hasConnection('tiktok');

// Create/update a connection (useful for OAuth)
const connection = await socialConnectionsService.upsertConnection({
  user_id: userId,
  platform: 'tiktok',
  platform_user_id: 'openid-123',
  access_token: 'token-xyz',
  refresh_token: 'refresh-abc',
  expires_at: '2025-01-29T12:00:00Z',
});

// Get connection status for multiple platforms
const status = await socialConnectionsService.getConnectionsStatus(['tiktok', 'soundcloud', 'youtube']);
console.log(status); // { tiktok: true, soundcloud: false, youtube: true }
```

### Alternative: Functional Interface

If you prefer a functional approach, use the utilities in `lib/database/social-connections.ts`:

```typescript
import { 
  getUserConnections, 
  getUserConnection, 
  upsertConnection,
  deleteConnection 
} from '@/lib/database/social-connections';

const connections = await getUserConnections();
```

Both interfaces work the same way - choose based on your preferred coding style.

