import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { resolveConfig } from "./config";
import { quotaState } from "./quota";
import { isShareActive, shareUrl } from "./server";

// Donnees de l'espace client. Lues en service_role, mais seulement pour les
// campagnes dont l'utilisateur est membre : l'appartenance est verifiee ici,
// a chaque appel, et jamais deduite d'un identifiant venu du navigateur.
// Tableau de bord : compteurs et etats. Galerie (clientGallery) : les
// portraits de SA campagne, 7 jours (retention Higgsfield), pour le QR et
// l'impression des demandes tardives ; les visiteurs en sont informes.

export type ClientCampaign = {
  id: string;
  slug: string;
  name: string;
  status: "draft" | "active" | "suspended" | "ended";
  boothUrl: string | null; // seulement si la campagne est active
  quota: number;
  dailyLimit: number | null;
  startsAt: string | null;
  expiresAt: string | null;
  model: string;
  counters: { succeeded: number; active: number; failed: number; today: number; remaining: number; pct: number; level: string };
  recent: { date: string; status: string; error: string | null }[];
};

export async function campaignIdsFor(userId: string): Promise<string[]> {
  const { data } = await getSupabaseAdmin()
    .from("photobooth_campaign_members").select("campaign_id").eq("user_id", userId);
  return (data ?? []).map((r) => r.campaign_id);
}

export async function clientCampaigns(userId: string, origin: string): Promise<ClientCampaign[]> {
  const ids = await campaignIdsFor(userId);
  if (ids.length === 0) return [];
  const sb = getSupabaseAdmin();
  const [{ data: campaigns }, { data: usage }, { data: history }] = await Promise.all([
    sb.from("photobooth_campaigns")
      .select("id, slug, name, status, access_key, quota_limit, daily_quota_limit, warning_threshold, critical_threshold, starts_at, expires_at, config")
      .in("id", ids).order("created_at", { ascending: false }),
    sb.from("photobooth_campaign_usage").select("*").in("campaign_id", ids),
    sb.from("photobooth_usage").select("campaign_id, status, error_code, created_at")
      .in("campaign_id", ids).order("created_at", { ascending: false }).limit(500),
  ]);

  return (campaigns ?? []).map((c) => {
    const u = (usage ?? []).find((x) => x.campaign_id === c.id) ?? { succeeded: 0, active: 0, failed: 0, today: 0 };
    const q = quotaState({ quota: c.quota_limit, succeeded: u.succeeded, active: u.active, warning: c.warning_threshold, critical: c.critical_threshold });
    const cfg = resolveConfig(c.config);
    return {
      id: c.id,
      slug: c.slug,
      name: c.name,
      status: c.status,
      boothUrl: c.status === "active" ? `${origin}/experience/photobooth/${c.slug}?k=${c.access_key}` : null,
      quota: c.quota_limit,
      dailyLimit: c.daily_quota_limit,
      startsAt: c.starts_at,
      expiresAt: c.expires_at,
      model: cfg.ok ? cfg.config.model : "",
      counters: { succeeded: u.succeeded, active: u.active, failed: u.failed, today: u.today, remaining: q.remaining, pct: q.pct, level: q.level },
      recent: (history ?? []).filter((h) => h.campaign_id === c.id).slice(0, 20)
        .map((h) => ({ date: h.created_at, status: h.status, error: h.error_code })),
    };
  });
}

export type GalleryItem = { id: string; completedAt: string; title: string; shareUrl: string | null };

/** L'utilisateur est-il membre de la campagne (ou admin) ? */
export async function canSeeCampaign(userId: string, campaignId: string, isAdmin: boolean): Promise<boolean> {
  if (isAdmin) return true;
  const { count } = await getSupabaseAdmin()
    .from("photobooth_campaign_members").select("*", { count: "exact", head: true })
    .eq("campaign_id", campaignId).eq("user_id", userId);
  return (count ?? 0) > 0;
}

/**
 * Portraits reussis de la campagne, des 7 derniers jours (au-dela, l'image
 * n'est plus garantie chez Higgsfield). Appartenance verifiee par l'appelant.
 */
export async function clientGallery(campaignId: string) {
  const sb = getSupabaseAdmin();
  const since = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString();
  const [{ data: campaign }, { data: rows }] = await Promise.all([
    sb.from("photobooth_campaigns").select("id, name, config").eq("id", campaignId).maybeSingle(),
    sb.from("photobooth_usage").select("id, completed_at, share_token, mood")
      .eq("campaign_id", campaignId).eq("status", "succeeded").gte("completed_at", since)
      .order("completed_at", { ascending: false }).limit(300),
  ]);
  if (!campaign) return null;
  const cfg = resolveConfig(campaign.config);
  const share = cfg.ok && cfg.config.shareEnabled;
  const items: GalleryItem[] = (rows ?? []).filter((r) => isShareActive(r.completed_at)).map((r) => {
    const mood = r.mood as { title?: Record<string, string> } | null;
    return {
      id: r.id,
      completedAt: r.completed_at!,
      title: mood?.title?.fr ?? "",
      shareUrl: share && r.share_token ? shareUrl(r.share_token) : null,
    };
  });
  return { name: campaign.name, print: cfg.ok ? cfg.config.print : null, items };
}
