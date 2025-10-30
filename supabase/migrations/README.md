# Supabase Migrations

This directory contains SQL migration files for the database schema.

## Applying Migrations

### Option 1: Using Supabase Dashboard (Recommended for Development)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of the migration file
4. Paste it into the SQL Editor
5. Click **Run** to execute the migration

### Option 2: Using Supabase CLI

If you have the Supabase CLI installed and configured:

```bash
# Link your project (if not already linked)
supabase link --project-ref your-project-ref

# Apply migrations
supabase db push

# Or apply a specific migration
supabase migration up
```

### Option 3: Using MCP Supabase Tools

If your development environment supports MCP (Model Context Protocol) for Supabase:

- The migration is ready to be applied via MCP tools
- Ensure you have proper authentication configured
- Use the migration name: `create_social_connections`

## Current Migrations

### 20250128000000_create_social_connections.sql

Creates the `social_connections` table for storing OAuth connections across multiple platforms (TikTok, SoundCloud, YouTube, Instagram, etc.).

**Features:**
- Platform-agnostic design
- Stores access and refresh tokens
- Tracks token expiration
- Stores OAuth scopes
- Row Level Security (RLS) enabled
- Unique constraint per user per platform

## Verifying the Migration

After applying the migration, you can verify it worked by running this query in the SQL Editor:

```sql
-- Check if table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'social_connections'
);

-- Check table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'social_connections'
ORDER BY ordinal_position;

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'social_connections';
```

## Rollback

To rollback this migration (if needed):

```sql
-- Drop policies
DROP POLICY IF EXISTS "Users can view own connections" ON social_connections;
DROP POLICY IF EXISTS "Users can insert own connections" ON social_connections;
DROP POLICY IF EXISTS "Users can update own connections" ON social_connections;
DROP POLICY IF EXISTS "Users can delete own connections" ON social_connections;

-- Drop trigger
DROP TRIGGER IF EXISTS update_social_connections_updated_at ON social_connections;

-- Drop function
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Drop table
DROP TABLE IF EXISTS social_connections;
```

