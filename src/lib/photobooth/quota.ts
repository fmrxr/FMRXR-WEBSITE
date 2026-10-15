// Lecture du quota pour l'affichage admin. La regle qui bloque vraiment est en
// base (photobooth_reserve) ; ceci n'est que sa lecture, avec la meme formule :
//   restant = quota - reussies - reservations actives

export type QuotaLevel = "ok" | "warning" | "critical" | "blocked";

export function quotaState(a: {
  quota: number; succeeded: number; active: number; warning: number; critical: number;
}) {
  const used = a.succeeded + a.active;
  const remaining = Math.max(0, a.quota - used);
  const pct = a.quota > 0 ? Math.min(100, (used / a.quota) * 100) : 100;
  const level: QuotaLevel =
    remaining === 0 ? "blocked" : pct >= a.critical ? "critical" : pct >= a.warning ? "warning" : "ok";
  return { used, remaining, pct, level };
}

export const usd = (musd: number | null | undefined) =>
  musd === null || musd === undefined ? "—" : `${(musd / 1000).toFixed(2)} $`;
