import { describe, it, expect, vi } from "vitest";

vi.mock("server-only", () => ({}));
vi.mock("@/lib/supabase/admin", () => ({ getSupabaseAdmin: () => { throw new Error("pas d'acces base dans ce test"); } }));

const { isShareActive, shareUrl, findShared, SHARE_TTL_MS } = await import("@/lib/photobooth/server");

describe("partage par QR", () => {
  it("le lien vit 7 jours apres la generation", () => {
    const now = Date.parse("2026-10-15T12:00:00Z");
    expect(isShareActive(new Date(now - SHARE_TTL_MS + 60_000).toISOString(), now)).toBe(true);
    expect(isShareActive(new Date(now - SHARE_TTL_MS - 60_000).toISOString(), now)).toBe(false);
    expect(isShareActive(null, now)).toBe(false);
  });
  it("le QR pointe vers le site public, jamais localhost", () => {
    expect(shareUrl("a".repeat(32))).toBe(`https://fmrxr.com/experience/photobooth/share/${"a".repeat(32)}`);
  });
  it("un jeton mal forme est refuse sans toucher la base", async () => {
    expect(await findShared("../../etc")).toEqual({ ok: false, reason: "NOT_FOUND" });
    expect(await findShared("23a11a1e-1826-4b56-8f2c-291efb692653")).toEqual({ ok: false, reason: "NOT_FOUND" });
  });
});
