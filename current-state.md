# Current State

Last updated: 2026-03-17

## Summary
Soundlog is no longer just the original Nuxt + Supabase auth starter. The project now has:

- initial product documentation under `agent-os/product/`
- a first-pass Soundlog data model in Supabase
- authenticated server APIs for artist pages and social links
- a redesigned marketing homepage aligned to the current Soundlog positioning
- refactored auth pages using Tailwind utility classes instead of the old generated starter styles

The project is still in early implementation. Core account auth works, but the main Soundlog product flow is only partially built.

## Implemented

### Product documentation
These files exist and define the current product baseline:

- `agent-os/product/mission.md`
- `agent-os/product/roadmap.md`
- `agent-os/product/tech-stack.md`

They establish Soundlog as a Spotify-first artist page product for independent artists.

### Frontend
The current app has the following user-facing pages:

- `app/pages/index.vue`
- `app/pages/login.vue`
- `app/pages/register.vue`
- `app/pages/forgot-password.vue`
- `app/pages/new-password.vue`

What is currently true on the frontend:

- the homepage has been rebuilt into a custom Soundlog landing page
- the homepage includes:
  - headline/value proposition
  - primary CTA and secondary auth CTA
  - trial note
  - example artist page preview
  - supporting value sections
- the example artist page preview includes:
  - artist name and slug
  - social links with icons
  - latest release block
  - streaming platform links with icons
- auth pages have been restyled away from the starter’s generated CSS classes
- most page-level styling now uses Tailwind utility classes directly

### Shared UI pieces
These components are implemented and in use:

- `app/components/AppBackToLogin.vue`
- `app/components/ErrorAlert.vue`
- `app/components/SuccessAlert.vue`

### Backend API
The following Soundlog API routes exist:

- `GET /api/artist-pages`
- `POST /api/artist-pages`
- `POST /api/artist-pages/:id/publish`
- `POST /api/artist-pages/:id/refresh`
- `GET /api/artist-pages/:id/social-links`
- `PATCH /api/artist-pages/:id/social-links`

What these currently do:

- list artist pages for the signed-in user
- create artist pages with:
  - `spotifyArtistId`
  - `displayName`
  - generated or provided slug
  - optional `aboutText`
- enforce a max of 5 artist pages per account at the API layer
- publish an artist page by setting `status = published`
- queue a manual refresh by creating a `sync_runs` row
- read and replace social links for a specific artist page

### Supabase schema
There is one Soundlog migration:

- `supabase/migrations/20260315213000_soundlog_core.sql`

It currently creates:

- `artist_pages`
- `artist_social_links`
- `sync_runs`

It also includes:

- `updated_at` trigger handling
- indexes for core lookup fields
- RLS enabled on all three tables
- owner-based policies for artist pages, social links, and sync runs

### Server utilities
These helpers exist:

- `server/utils/auth.ts`
  - enforces authenticated access via Supabase user session
- `server/utils/slug.ts`
  - generates normalized artist slugs

## Partially implemented

### Soundlog domain model
The current schema only covers the first layer of the product.

Implemented:

- artist page records
- manual social links
- sync queue rows

Not yet implemented:

- artist profile cache
- releases cache
- cross-platform release link resolver data
- public page snapshot tables
- team/member access model
- verification workflow

### Sync flow
The product has a `refresh` endpoint and `sync_runs` queue rows, but there is no actual background worker or refresh processor yet.

Current behavior:

- refresh requests are accepted
- a `sync_runs` row is created with `queued` status
- `artist_pages.last_synced_at` is updated when refresh is requested

Missing behavior:

- no worker to consume queued jobs
- no Spotify import job
- no retry/backoff logic
- no sync status UI

### Homepage
The homepage is actively iterated and visually far ahead of the rest of the app.

Current state:

- strong marketing shell exists
- example artist preview reflects the intended product direction

Still true:

- the homepage is marketing-only and not connected to live Soundlog data
- some copy/layout refinements may still be in progress

## Not implemented yet

### Spotify integration
This is not yet built in the actual app flow.

Missing:

- Spotify OAuth login/connect flow
- Spotify artist lookup/import
- automated profile hydration from Spotify
- automated release syncing from Spotify

### Cross-platform resolver
The planned streaming-link resolver is not implemented yet.

Missing:

- release matching pipeline
- platform adapters
- resolver cache tables
- confidence scoring
- manual override UI for bad matches

### Public artist pages
The core public product surface is not live yet.

Missing:

- host/subdomain tenant resolution
- public published artist page route/rendering
- slug-based artist microsites under `*.soundlog.app`
- public SEO/social metadata for artist pages

### Dashboard/product UI
The backend endpoints exist, but there is no real Soundlog dashboard yet.

Missing:

- list/create/manage artist pages UI
- social links editor UI
- publish/unpublish controls in product UI
- manual refresh UI
- onboarding flow after signup

### Verification and trust signals
Missing:

- artist ownership verification flow
- verified/unverified UX beyond stored database field

## Technical notes

- `pnpm build` has been passing after recent homepage and frontend changes
- the app still uses Nuxt + Nitro + Supabase
- Tailwind is the primary styling approach
- global transitions still exist in `app/app.vue`
- the project still carries some starter-project naming in places such as package metadata and auth page titles

## Known inconsistencies / cleanup still needed

- `README.md` still describes the original Supabase auth starter rather than Soundlog
- `package.json` description still references generic Supabase auth
- auth page titles still use `supaAuth` naming
- only part of the original project docs/spec guidance has been updated to match the current direction
- there are local uncommitted changes at the time of writing:
  - `AGENTS.md`
  - `app/pages/index.vue`

## Recommended next implementation steps

1. Build the actual Soundlog dashboard UI on top of the existing artist-page APIs.
2. Implement Spotify connect/import so artist page creation is based on real Spotify data.
3. Add a real background sync worker for `sync_runs`.
4. Build public artist page rendering and slug/subdomain resolution.
5. Start the release/cross-platform link resolver only after the import flow and public page flow are working.
