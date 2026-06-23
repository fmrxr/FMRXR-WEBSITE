import { describe, it, expect } from "vitest";
import { createClient } from "@supabase/supabase-js";

// Verifies the RLS second wall: an anon token cannot write, even if a
// Server Action were bypassed. Skips cleanly without credentials.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const ready = Boolean(url && anon);

describe.skipIf(!ready)("write guard (RLS second wall)", () => {
  it("anon insert into services is rejected", async () => {
    const a = createClient(url!, anon!);
    const { error } = await a.from("services").insert({ slug: "guard-test", title: "Z" });
    expect(error).not.toBeNull();
  });

  it("anon update of projects is rejected", async () => {
    const a = createClient(url!, anon!);
    const { error, data } = await a.from("projects").update({ title: "hacked" }).eq("slug", "lik").select();
    expect((data?.length ?? 0) === 0 || error !== null).toBe(true);
  });
});
