import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { deleteStoredPortrait } from "./server";

// Fin de conservation (config retentionDays) : on efface nos copies du
// portrait et tout ce qui identifie l'invite (coordonnees, adresse d'envoi,
// reference de la photo source, position des visages). Restent les champs
// anonymes qui font les statistiques (style, solo ou groupe, case cochee ou
// non). La ligne elle-meme reste : elle compte dans le quota facture.
// Lancee en tache de fond par la galerie et la borne, 100 lignes a la fois.

type Mood = Record<string, unknown> & {
  contact?: { optIn?: boolean; at?: string; [k: string]: unknown } | null;
  delivery?: { sentAt?: string | null; error?: string | null; [k: string]: unknown } | null;
};

/** Ce qui reste d'un profil apres la conservation (pur, teste). */
export function anonymize(mood: Mood): Mood {
  const keep = ["style", "shot", "locale", "title", "description", "variant", "id", "tarot"];
  const out: Mood = Object.fromEntries(keep.filter((k) => k in mood).map((k) => [k, mood[k]]));
  if (mood.contact) out.contact = { optIn: Boolean(mood.contact.optIn) };
  if (mood.delivery) out.delivery = { sentAt: mood.delivery.sentAt ?? null, error: mood.delivery.error ?? null };
  out.hidden = true;
  out.purged = true;
  return out;
}

const RUNNING = new Set<string>();

export async function purgeExpired(campaignId: string, retentionDays: number): Promise<number> {
  if (RUNNING.has(campaignId)) return 0;
  RUNNING.add(campaignId);
  try {
    const sb = getSupabaseAdmin();
    const before = new Date(Date.now() - retentionDays * 24 * 3600 * 1000).toISOString();
    const { data } = await sb.from("photobooth_usage").select("id, mood")
      .eq("campaign_id", campaignId).lt("created_at", before).is("mood->purged", null)
      .order("created_at").limit(100);
    for (const r of data ?? []) {
      await deleteStoredPortrait(r.id);
      await sb.from("photobooth_usage").update({ mood: anonymize((r.mood ?? {}) as Mood) }).eq("id", r.id);
    }
    return data?.length ?? 0;
  } finally {
    RUNNING.delete(campaignId);
  }
}
