import { describe, it, expect } from "vitest";
import { createClient } from "@supabase/supabase-js";

// These run only when Supabase credentials are present (e.g.
// `npx dotenv -e .env.local -- npm test`). Otherwise they skip cleanly.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ready = Boolean(url && anon && service);

describe.skipIf(!ready)("RLS", () => {
  it("anon cannot insert a project", async () => {
    const a = createClient(url!, anon!);
    const { error } = await a.from("projects").insert({ slug: "rls-anon-test", title: "X" });
    expect(error).not.toBeNull();
  });

  it("anon cannot read unpublished projects", async () => {
    const svc = createClient(url!, service!);
    await svc.from("projects").insert({ slug: "rls-hidden-test", title: "Hidden", published: false });
    const a = createClient(url!, anon!);
    const { data } = await a.from("projects").select("*").eq("slug", "rls-hidden-test");
    expect(data?.length ?? 0).toBe(0);
    await svc.from("projects").delete().eq("slug", "rls-hidden-test");
  });
});
