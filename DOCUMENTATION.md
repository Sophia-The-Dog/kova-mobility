# Kova Mobility — Platform Documentation

## Architecture

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Backend**: Supabase (existing project)
- **Validation**: Zod
- **Hosting**: Vercel
- **Analytics**: GA4 + Microsoft Clarity

## Zone Engine

1. User enters address via Google Places Autocomplete
2. Places API returns lat/lng coordinates
3. Coordinates sent to /api/zone endpoint
4. Server runs point-in-polygon against zone boundaries
5. Returns zone classification, eligibility, pricing, and messaging
6. UI updates instantly (no page reload)

### Zone Pricing (Biweekly)

| Tier | Zone A | Zone B | Zone C |
|------|--------|--------|--------|
| Core (3 days) | $228 | $258 | $298 |
| Plus (5 days) | $321 | $361 | $411 |
| Black Label (7 days) | $598 | $648 | $718 |

## Deployment

1. npm install
2. Copy .env.example to .env.local and fill in values
3. Run SQL from src/lib/schema.sql in Supabase SQL editor
4. npm run build to verify
5. Deploy to Vercel
