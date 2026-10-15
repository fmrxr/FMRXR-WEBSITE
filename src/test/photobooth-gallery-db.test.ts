import { describe, it, expect, vi, afterAll } from "vitest";
import { createClient } from "@supabase/supabase-js";

// Galerie client en base reelle : seuls les membres de la campagne (ou
// l'admin) y ont acces ; seuls les portraits reussis de moins de 7 jours.

vi.mock("server-only", () => ({}));
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ready = Boolean(url && service);
const svc = ready ? createClient(url!, service!, { auth: { persistSession: false } }) : null;
let campaignId = "";
let memberId = "";
let otherId = "";

describe.skipIf(!ready)("galerie client", () => {
  afterAll(async () => {
    if (campaignId) await svc!.from("photobooth_campaigns").delete().eq("id", campaignId);
    for (const id of [memberId, otherId]) if (id) await svc!.auth.admin.deleteUser(id);
  });

  it("acces reserve aux membres, portraits reussis recents seulement", async () => {
    const { canSeeCampaign, clientGallery } = await import("@/lib/photobooth/client");
    const stamp = Date.now();
    const mk = async (tag: string) => (await svc!.auth.admin.createUser({ email: `pb-gal-${tag}-${stamp}@example.test`, password: `x-${stamp}-Aa1!`, email_confirm: true })).data.user!.id;
    memberId = await mk("member");
    otherId = await mk("other");
    const { data: c } = await svc!.from("photobooth_campaigns")
      .insert({ slug: `test-gallery-${stamp}`, name: "G", status: "active", quota_limit: 5 }).select("id").single();
    campaignId = c!.id;
    await svc!.from("photobooth_campaign_members").insert({ campaign_id: campaignId, user_id: memberId });
    for (const k of ["gal-key-ok-1", "gal-key-old-1", "gal-key-fail-1"]) {
      await svc!.rpc("photobooth_reserve", { _campaign_id: campaignId, _session_id: "s-gallery", _idempotency_key: k, _model: "flare", _mood: { title: { fr: "Test" } } });
    }
    const { data: rows } = await svc!.from("photobooth_usage").select("id, idempotency_key").eq("campaign_id", campaignId);
    const id = (k: string) => rows!.find((r) => r.idempotency_key === k)!.id;
    for (const k of ["gal-key-ok-1", "gal-key-old-1"]) {
      await svc!.rpc("photobooth_transition", { _usage_id: id(k), _to: "processing" });
      await svc!.rpc("photobooth_transition", { _usage_id: id(k), _to: "succeeded", _result_url: "https://cdn.example/x.png" });
    }
    await svc!.rpc("photobooth_transition", { _usage_id: id("gal-key-fail-1"), _to: "failed", _error_code: "TEST" });
    await svc!.from("photobooth_usage").update({ completed_at: new Date(Date.now() - 9 * 86400e3).toISOString() }).eq("id", id("gal-key-old-1"));

    expect(await canSeeCampaign(memberId, campaignId, false)).toBe(true);
    expect(await canSeeCampaign(otherId, campaignId, false)).toBe(false);
    expect(await canSeeCampaign(otherId, campaignId, true)).toBe(true);

    const g = await clientGallery(campaignId);
    expect(g!.items.map((x) => x.id)).toEqual([id("gal-key-ok-1")]);
    expect(g!.items[0].shareUrl).toMatch(/^https:\/\/fmrxr\.com\/experience\/photobooth\/share\/[0-9a-f]{32}$/);
    }, 30000);
});
