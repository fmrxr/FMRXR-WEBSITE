import { describe, it, expect, vi, afterAll } from "vitest";
import { createClient } from "@supabase/supabase-js";

// Reconciliation automatique sur la vraie base, fournisseur simule.
// Lancement : npx dotenv -e .env.local -- npm test

vi.mock("server-only", () => ({}));
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ready = Boolean(url && service);
const svc = ready ? createClient(url!, service!, { auth: { persistSession: false } }) : null;
let campaignId = "";

describe.skipIf(!ready)("reconciliation des generations abandonnees", () => {
  afterAll(async () => { if (campaignId) await svc!.from("photobooth_campaigns").delete().eq("id", campaignId); });

  it("finalise une generation abandonnee de plus de 90 s, ne touche pas une recente", async () => {
    const { reconcileStale, createSupabaseDb } = await import("@/lib/photobooth/server");
    const { data: c } = await svc!.from("photobooth_campaigns")
      .insert({ slug: `test-reconcile-${Date.now()}`, name: "R", status: "active", quota_limit: 5 }).select("id").single();
    campaignId = c!.id;
    for (const k of ["stale-key-1", "fresh-key-1"]) {
      await svc!.rpc("photobooth_reserve", { _campaign_id: campaignId, _session_id: "s-reconcile", _idempotency_key: k, _model: "flare", _mood: {} });
    }
    const { data: rows } = await svc!.from("photobooth_usage").select("id, idempotency_key").eq("campaign_id", campaignId);
    const stale = rows!.find((r) => r.idempotency_key === "stale-key-1")!.id;
    const fresh = rows!.find((r) => r.idempotency_key === "fresh-key-1")!.id;
    for (const id of [stale, fresh]) {
      await svc!.rpc("photobooth_transition", { _usage_id: id, _to: "processing", _status_url: `https://api.higgsfield.ai/requests/${id}/status` });
    }
    // la premiere a ete lancee il y a 5 minutes
    await svc!.from("photobooth_usage").update({ created_at: new Date(Date.now() - 300_000).toISOString() }).eq("id", stale);

    const status = vi.fn(async () => ({ status: "completed" as const, imageUrl: "https://cdn.example/out.png" }));
    const provider = { uploadReference: vi.fn(), submit: vi.fn(), status };
    await reconcileStale(campaignId, provider, createSupabaseDb());

    const { data: after } = await svc!.from("photobooth_usage").select("id, status").eq("campaign_id", campaignId);
    expect(after!.find((r) => r.id === stale)!.status).toBe("succeeded");
    expect(after!.find((r) => r.id === fresh)!.status).toBe("processing");
    expect(status).toHaveBeenCalledTimes(1);
    expect(provider.submit).not.toHaveBeenCalled();
  });
});
