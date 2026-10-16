import { STYLES, isStyleId } from "./styles";

// Statistiques d'une campagne pour la galerie d'equipe (pures, testees) :
// ce que la marque montre apres l'evenement. Calculees depuis
// photobooth_usage (portraits, styles, emails, contacts) et photobooth_audit
// (vues des pages de partage, telechargements).

export type StatRow = {
  status: string;
  completed_at: string | null;
  mood: {
    style?: string; shot?: string; hidden?: boolean;
    contact?: { optIn?: boolean } | null;
    delivery?: { sentAt?: string | null; error?: string | null } | null;
  } | null;
};

export type CampaignStats = {
  portraits: number;
  groups: number;
  failed: number;
  emailsRequested: number;
  emailsSent: number;
  contacts: number;
  optIns: number;
  shareViews: number;
  downloads: number;
  styles: { id: string; label: string; count: number }[];
  /** Par jour si l'evenement dure plusieurs jours, sinon par heure. */
  timeline: { label: string; count: number }[];
  peak: string | null;
};

export function computeStats(rows: StatRow[], events: { shareViews: number; downloads: number }, timeZone = "Africa/Tunis"): CampaignStats {
  const ok = rows.filter((r) => r.status === "succeeded" && r.completed_at);
  const styles = new Map<string, number>();
  let groups = 0, emailsRequested = 0, emailsSent = 0, contacts = 0, optIns = 0;
  for (const r of ok) {
    const m = r.mood ?? {};
    const id = isStyleId(m.style) ? m.style : "mood";
    styles.set(id, (styles.get(id) ?? 0) + 1);
    if (m.shot === "group") groups++;
    if (m.delivery) {
      emailsRequested++;
      if (m.delivery.sentAt && !m.delivery.error) emailsSent++;
    }
    if (m.contact) {
      contacts++;
      if (m.contact.optIn) optIns++;
    }
  }
  const day = (iso: string) => new Intl.DateTimeFormat("fr-FR", { timeZone, day: "2-digit", month: "2-digit" }).format(new Date(iso));
  const hour = (iso: string) => {
    const h = new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", hourCycle: "h23" }).formatToParts(new Date(iso)).find((p) => p.type === "hour")?.value ?? "";
    return `${h}h`;
  };
  const days = new Set(ok.map((r) => day(r.completed_at!)));
  const bucket = days.size > 1 ? day : hour;
  const tl = new Map<string, number>();
  for (const r of [...ok].sort((a, b) => a.completed_at!.localeCompare(b.completed_at!))) {
    const k = bucket(r.completed_at!);
    tl.set(k, (tl.get(k) ?? 0) + 1);
  }
  const timeline = [...tl].map(([label, count]) => ({ label, count }));
  const peak = timeline.length ? timeline.reduce((a, b) => (b.count > a.count ? b : a)).label : null;
  return {
    portraits: ok.length,
    groups,
    failed: rows.filter((r) => r.status === "failed").length,
    emailsRequested, emailsSent, contacts, optIns,
    shareViews: events.shareViews,
    downloads: events.downloads,
    styles: [...styles].map(([id, count]) => ({ id, label: isStyleId(id) ? STYLES[id].label.fr : id, count })).sort((a, b) => b.count - a.count),
    timeline,
    peak,
  };
}
