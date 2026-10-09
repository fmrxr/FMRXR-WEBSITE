# FMRXR Web — Phase 1

Next.js 16 (App Router) + Supabase (Postgres / Auth / Storage) admin CMS and public site.
All FMRXR content is managed from `/admin`; public pages render it live (RLS-protected).

## Stack

- **Frontend:** Next.js 16, React 19 (RSC + Server Actions), TypeScript, Tailwind v4, shadcn/Base-UI, Zod.
- **Backend:** hosted Supabase — Postgres + Auth (email/password) + Storage (`media` bucket).
- **Hosting:** Hostinger (Node app pulling from GitHub `main`), live at https://fmrxr.com since 30/09/2026.

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

## Deploy (Hostinger)

1. Check the active GitHub account first: `gh auth status` must show **`fmrxr`**
   (the machine also has `spoofypooff-boop`, a test account).
2. Push to `main` on [fmrxr/FMRXR-WEBSITE](https://github.com/fmrxr/FMRXR-WEBSITE).
   Hostinger pulls and builds (`npm run build` → `next start`) on its own, with a delay of
   a few minutes. Never assume a push is live: check the real page before relying on it.
3. Project pages read Supabase live (`force-dynamic`), so publishing content is instant.
   **Deploy the code first, publish the content that depends on it second.**
4. Environment variables live in the Hostinger app settings: the three Supabase values,
   plus `NEXT_PUBLIC_GA_ID`, `GOOGLE_SITE_VERIFICATION`, `OS_AGENT_TOKEN`, `ANTHROPIC_API_KEY`
   and, for lead e-mails, `SMTP_USER` / `SMTP_PASS` (Google app password) / `LEAD_NOTIFY_TO`.
   Without the SMTP pair, briefs are still saved, just not e-mailed.
   The `OS_*_PATH` / `*_LAUNCH_BAT_PATH` variables are local Windows paths, dev only.
5. On a fresh install, claim the admin account at `/auth`.

`netlify.toml` no longer deploys the site: the old Netlify site
(`fmrxrstudio.netlify.app`) only 301-redirects to https://fmrxr.com. Keep it as a
fallback until Hostinger is proven stable (removing its `[[redirects]]` block brings it back).

## Phase 2 (not built)

Interactive-experiences engine (live WebGL/GLSL/p5/TouchDesigner-export, sandboxed
embeds, scroll/cursor-reactive wrapper), media performance tiers + transcoding, full
GEO entity graph + `VideoObject`. `/experiential` currently ships as a placeholder.
