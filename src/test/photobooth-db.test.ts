import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Tests de la base reelle : reservation atomique, idempotence, transitions, RLS.
// Lancement : npx dotenv -e .env.local -- npm test
// Ils se sautent si les cles manquent ou si la migration 0017 n'est pas appliquee.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

let svc: SupabaseClient;
let ready = false;
if (url && service) {
  svc = createClient(url, service, { auth: { persistSession: false } });
  const { error } = await svc.from("photobooth_campaigns").select("id").limit(1);
  ready = !error;
}

const slug = `test-pb-${Date.now()}`;
let campaignId = "";

const reserve = (key: string) =>
  svc.rpc("photobooth_reserve", { _campaign_id: campaignId, _session_id: "test-session", _idempotency_key: key, _model: "flare", _mood: {} });

describe.skipIf(!ready)("photobooth en base", () => {
  beforeAll(async () => {
    const { data, error } = await svc.from("photobooth_campaigns")
      .insert({ slug, name: "Test", status: "active", quota_limit: 3, max_concurrent: 50, reserve_cost_musd: 100 })
      .select("id").single();
    if (error) throw error;
    campaignId = data.id;
  });
  afterAll(async () => {
    await svc.from("photobooth_campaigns").delete().eq("id", campaignId);
  });

  it("20 demandes simultanees pour 3 places : exactement 3 reservations", async () => {
    const results = await Promise.all(Array.from({ length: 20 }, (_, i) => reserve(`concurrent-${i}`)));
    const ok = results.filter((r) => r.data?.ok);
    const refused = results.filter((r) => r.data?.error === "QUOTA_EXHAUSTED");
    expect(ok).toHaveLength(3);
    expect(refused).toHaveLength(17);
  });

  it("meme cle d'idempotence : meme reservation", async () => {
    const { data: rows } = await svc.from("photobooth_usage").select("idempotency_key").eq("campaign_id", campaignId).limit(1);
    const again = await reserve(rows![0].idempotency_key);
    expect(again.data).toMatchObject({ ok: true, duplicate: true });
  });

  it("un echec libere une place, un succes non", async () => {
    const { data: rows } = await svc.from("photobooth_usage").select("id").eq("campaign_id", campaignId).order("created_at");
    await svc.rpc("photobooth_transition", { _usage_id: rows![0].id, _to: "processing" });
    await svc.rpc("photobooth_transition", { _usage_id: rows![0].id, _to: "succeeded", _result_url: "https://x/y.png" });
    await svc.rpc("photobooth_transition", { _usage_id: rows![1].id, _to: "failed", _error_code: "TEST" });
    const r = await reserve("after-release");
    expect(r.data).toMatchObject({ ok: true });
    expect((await reserve("after-release-2")).data).toMatchObject({ ok: false, error: "QUOTA_EXHAUSTED" });
  });

  it("un etat terminal ne bouge plus (callback en double)", async () => {
    const { data: rows } = await svc.from("photobooth_usage").select("id").eq("campaign_id", campaignId).eq("status", "succeeded");
    const r = await svc.rpc("photobooth_transition", { _usage_id: rows![0].id, _to: "failed" });
    expect(r.data).toMatchObject({ ok: false, noop: true, status: "succeeded" });
  });

  it("campagne suspendue : refus", async () => {
    await svc.from("photobooth_campaigns").update({ status: "suspended", quota_limit: 100 }).eq("id", campaignId);
    expect((await reserve("suspended-1")).data).toMatchObject({ ok: false, error: "CAMPAIGN_SUSPENDED" });
  });

  it("plafond budgetaire : refus", async () => {
    await svc.from("photobooth_campaigns").update({ status: "active", spending_limit_musd: 100 }).eq("id", campaignId);
    expect((await reserve("budget-1")).data).toMatchObject({ ok: false, error: "SPENDING_LIMIT_REACHED" });
  });

  it("campagne expiree : refus", async () => {
    await svc.from("photobooth_campaigns").update({ spending_limit_musd: null, expires_at: new Date(Date.now() - 1000).toISOString() }).eq("id", campaignId);
    expect((await reserve("expired-1")).data).toMatchObject({ ok: false, error: "CAMPAIGN_EXPIRED" });
  });

  it.skipIf(!anon)("anon ne lit ni campagnes ni consommation, et ne peut pas reserver", async () => {
    const a = createClient(url!, anon!);
    expect((await a.from("photobooth_campaigns").select("id").eq("id", campaignId)).data ?? []).toHaveLength(0);
    expect((await a.from("photobooth_usage").select("id").eq("campaign_id", campaignId)).data ?? []).toHaveLength(0);
    const r = await a.rpc("photobooth_reserve", { _campaign_id: campaignId, _session_id: "x", _idempotency_key: "anon-1", _model: "flare", _mood: {} });
    expect(r.error).not.toBeNull();
    const u = await a.from("photobooth_campaigns").update({ quota_limit: 999999 }).eq("id", campaignId).select("id");
    expect(u.data ?? []).toHaveLength(0);
  });
});
