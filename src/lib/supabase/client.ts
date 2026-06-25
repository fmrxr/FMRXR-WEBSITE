import { createBrowserClient } from "@supabase/ssr";

// Browser (anon) client — used for direct-to-storage uploads from the public
// brief form, bypassing Next.js Server Action body-size limits for video files.
export function getSupabaseBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
