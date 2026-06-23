# FMRXR Web — Phase 1

Next.js 16 (App Router) + Supabase (Postgres / Auth / Storage) admin CMS and public site.
All FMRXR content is managed from `/admin`; public pages render it live (RLS-protected).

## Stack

- **Frontend:** Next.js 16, React 19 (RSC + Server Actions), TypeScript, Tailwind v4, shadcn/Base-UI, Zod.
- **Backend:** hosted Supabase — Postgres + Auth (email/password) + Storage (`media` bucket).
- **Hosting:** Netlify (`netlify.toml` + `@netlify/plugin-nextjs`).

## Local development

```bash
npm install
cp .env.local.example .env.local   # then fill in the three values below
npm run dev
```

`.env.local` (git-ignored — never commit it):

```
NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
SUPABASE_SERVICE_ROLE_KEY=<service_role key>
```

## Database setup (hosted Supabase, no Docker)

1. Create a project at [supabase.com](https://supabase.com) (region near Tunis, e.g. Frankfurt).
2. Copy URL + anon key + service_role key (Project Settings → API) into `.env.local`, and note the project `ref`.
3. Apply the migrations (schema, RLS, storage, seed):

```bash
npx supabase link --project-ref <ref>
npx supabase db push
```

This creates all tables, the `has_role()` function, RLS policies, the first-user-admin
trigger, the `media` storage bucket, and seeds the FMRXR content.

## First admin

After deploy (or locally), sign up at `/auth` with `fmrxr.studio@gmail.com`. The
`grant_first_admin` trigger auto-promotes the **first** signed-up user to `admin`.
Additional teammates are invited from `/admin/team` (admin role only).

## Tests

```bash
npm test                                   # pure unit tests (schemas, roles, registry)
npx dotenv -e .env.local -- npm test       # includes DB tests (RLS / write-guard) once .env.local is set
```

## Deploy to Netlify

1. Push this `fmrxr-web/` repo to GitHub.
2. In Netlify: connect the repo (build settings come from `netlify.toml`).
3. Set the three env vars (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
   `SUPABASE_SERVICE_ROLE_KEY`) in **Site settings → Environment variables**.
4. Deploy, then claim the admin account at `/auth`.

## Phase 2 (not built)

Interactive-experiences engine (live WebGL/GLSL/p5/TouchDesigner-export, sandboxed
embeds, scroll/cursor-reactive wrapper), media performance tiers + transcoding, full
GEO entity graph + `VideoObject`. `/experiential` currently ships as a placeholder.
