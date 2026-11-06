# Multi-Account Performance Aggregator

Small Next.js app for aggregating Instagram, YouTube, and X account performance. Built for free-tier launch with optional paid plans later.

## Current stage (paused)

### Working
- Next.js + TypeScript + Tailwind
- Supabase Auth (magic link)
- Protected routes (`/dashboard`, `/connect`)
- Database schema for `connected_accounts` (run `supabase/schema.sql`)
- Basic dashboard that lists connected accounts
- Instagram connect route shell (`/api/instagram/connect`)

### In progress / blocked
- Instagram OAuth: Meta app is created but returns `Invalid platform app`. Needs redirect URI + Instagram product configuration on the Meta side.
- Token exchange and Insights pull not implemented yet.
- YouTube and X connectors not started.

## Setup

1. Clone and install:
   ```bash
   git clone https://github.com/FacundoGo/multi-account-tool.git
   cd multi-account-tool
   npm install --legacy-peer-deps
   ```

2. Create `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://dqrckpjyjfwcflhifyff.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   INSTAGRAM_CLIENT_ID=your_meta_app_id
   INSTAGRAM_CLIENT_SECRET=your_meta_app_secret
   ```

3. In Supabase:
   - Run `supabase/schema.sql` in the SQL Editor
   - Authentication → URL Configuration → add `http://localhost:3000/auth/callback`

4. Run:
   ```bash
   npm run dev
   ```

## Next steps when resuming

1. Finish Meta app setup (redirect URI, Instagram product, Enforce HTTPS off for local).
2. Complete Instagram token exchange in `/api/instagram/callback`.
3. Store real tokens and pull Insights.
4. Add YouTube, then X.
5. Add free-tier account limits and export.

## Repo

https://github.com/FacundoGo/multi-account-tool
