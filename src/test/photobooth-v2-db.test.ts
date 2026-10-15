import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { randomBytes } from "node:crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// V2 en base reelle : un compte client (sans role, membre d'une campagne) ne
// voit que ce qu'il doit voir. Lancement : npx dotenv -e .env.local -- npm test
// Se saute si la migration 0018 n'est pas appliquee.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

let svc: SupabaseClient;
let ready = false;
if (url && anon && service) {
  svc = createClient(url, service, { auth: { persistSession: false } });
  const { error } = await svc.from("photobooth_campaign_members").select("user_id").limit(1);
  ready = !error;
}

const stamp = Date.now();
const email = `pb-client-${stamp}@example.test`;
const password = randomBytes(12).toString("base64url");
let userId = "";
let mine = "";
let other = "";
let client: SupabaseClient;

describe.skipIf(!ready)("espace client photobooth", () => {
  beforeAll(async () => {
    const { data: u, error } = await svc.auth.admin.createUser({ email, password, email_confirm: true });
    if (error) throw error;
    userId = u.user.id;
    const { data: cs, error: cErr } = await svc.from("photobooth_campaigns")
      .insert([
        { slug: `test-client-a-${stamp}`, name: "A", status: "active", quota_limit: 1 },
        { slug: `test-client-b-${stamp}`, name: "B", status: "active", quota_limit: 1 },
      ]).select("id, slug");
    if (cErr) throw cErr;
    mine = cs!.find((c) => c.slug.includes("-a-"))!.id;
    other = cs!.find((c) => c.slug.includes("-b-"))!.id;
    await svc.from("photobooth_campaign_members").insert({ campaign_id: mine, user_id: userId });
    client = createClient(url!, anon!, { auth: { persistSession: false } });
    const { error: sErr } = await client.auth.signInWithPassword({ email, password });
    if (sErr) throw sErr;
  });

  afterAll(async () => {
    await svc.from("photobooth_campaigns").delete().in("id", [mine, other]);
    if (userId) await svc.auth.admin.deleteUser(userId);
  });

  it("le client voit sa propre appartenance", async () => {
    const { data } = await client.from("photobooth_campaign_members").select("campaign_id");
    expect(data?.map((r) => r.campaign_id)).toEqual([mine]);
  });

  it("le client ne lit aucune campagne ni consommation en direct (seul le serveur le fait)", async () => {
    expect((await client.from("photobooth_campaigns").select("id")).data ?? []).toHaveLength(0);
    expect((await client.from("photobooth_usage").select("id")).data ?? []).toHaveLength(0);
  });

  it("le client ne peut pas s'ajouter a une autre campagne", async () => {
    const { error } = await client.from("photobooth_campaign_members").insert({ campaign_id: other, user_id: userId });
    expect(error).not.toBeNull();
  });

  it("le client ne peut pas modifier son quota", async () => {
    const { data } = await client.from("photobooth_campaigns").update({ quota_limit: 99999 }).eq("id", mine).select("id");
    expect(data ?? []).toHaveLength(0);
    const { data: c } = await svc.from("photobooth_campaigns").select("quota_limit").eq("id", mine).single();
    expect(c!.quota_limit).toBe(1);
  });

  it("le client n'a aucun role, donc aucun acces a /collab (opportunites)", async () => {
    expect((await client.from("user_roles").select("role")).data ?? []).toHaveLength(0);
    expect((await client.from("opportunities").select("id").limit(1)).data ?? []).toHaveLength(0);
    expect((await client.from("opportunity_notes").select("id").limit(1)).data ?? []).toHaveLength(0);
  });

  it("chaque generation recoit un jeton de partage unique de 32 caracteres hexa", async () => {
    const keys = ["share-key-1", "share-key-2"];
    for (const k of keys) {
      await svc.rpc("photobooth_reserve", { _campaign_id: other, _session_id: "test-session", _idempotency_key: k, _model: "flare", _mood: {} });
    }
    await svc.from("photobooth_campaigns").update({ quota_limit: 5 }).eq("id", other);
    await svc.rpc("photobooth_reserve", { _campaign_id: other, _session_id: "test-session", _idempotency_key: "share-key-3", _model: "flare", _mood: {} });
    const { data } = await svc.from("photobooth_usage").select("share_token").eq("campaign_id", other);
    const tokens = (data ?? []).map((r) => r.share_token);
    expect(tokens.length).toBeGreaterThan(1);
    expect(new Set(tokens).size).toBe(tokens.length);
    for (const t of tokens) expect(t).toMatch(/^[0-9a-f]{32}$/);
  });
});
