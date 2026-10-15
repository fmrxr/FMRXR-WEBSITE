import { headers } from "next/headers";
import { currentUser } from "@/lib/auth";
import { clientCampaigns } from "@/lib/photobooth/client";
import { CopyLink } from "./copy-link";

export const dynamic = "force-dynamic";

const STATUS: Record<string, string> = {
  draft: "En préparation", active: "Active", suspended: "En pause", ended: "Terminée",
};
const USAGE: Record<string, string> = {
  reserved: "En cours", processing: "En cours", succeeded: "Réussi",
  failed: "Échec (non décompté)", cancelled: "Annulé (non décompté)", unknown: "En vérification",
};
const BAR: Record<string, string> = {
  ok: "bg-fmaccent", warning: "bg-amber-400", critical: "bg-orange-500", blocked: "bg-red-500",
};
const fmt = (d: string | null) => (d ? new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : "—");

export default async function ClientHome() {
  const user = (await currentUser())!;
  const h = await headers();
  const origin = `${h.get("x-forwarded-proto") ?? "https"}://${h.get("host")}`;
  const campaigns = await clientCampaigns(user.id, origin);

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 md:px-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fmaccent">AI Mood Photobooth</p>
      <h1 className="fm-display mt-2 text-4xl md:text-6xl">Vos campagnes</h1>

      {campaigns.length === 0 && <p className="mt-8 text-fmmuted">Aucune campagne n’est rattachée à ce compte.</p>}

      <div className="mt-10 flex flex-col gap-6">
        {campaigns.map((c) => (
          <section key={c.id} className="rounded-xl border border-fmborder bg-fmcard/70 p-5 md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="fm-grotesk text-xl font-semibold">{c.name}</h2>
                <p className="mt-1 text-sm text-fmmuted">{fmt(c.startsAt)} → {fmt(c.expiresAt)}</p>
              </div>
              <span className="rounded-full border border-fmborder px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em]">
                {STATUS[c.status] ?? c.status}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4">
              <Stat label="Portraits autorisés" value={c.quota} />
              <Stat label="Portraits réalisés" value={c.counters.succeeded} />
              <Stat label="Restants" value={c.counters.remaining} />
              <Stat label="Aujourd’hui" value={`${c.counters.today}${c.dailyLimit !== null ? ` / ${c.dailyLimit}` : ""}`} />
            </div>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-fmmutedbg">
              <div className={`h-full ${BAR[c.counters.level]}`} style={{ width: `${c.counters.pct}%` }} />
            </div>
            <p className="mt-2 text-xs text-fmmuted">
              {c.counters.pct.toFixed(1)} % du forfait utilisé
              {c.counters.active > 0 && ` · ${c.counters.active} en cours`}
              {c.counters.failed > 0 && ` · ${c.counters.failed} échec(s), non décomptés`}
            </p>

            {c.boothUrl && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href={c.boothUrl} target="_blank" rel="noreferrer" className="rounded-full bg-fmfg px-5 py-2.5 text-sm font-semibold text-fmbg hover:bg-fmaccent">
                  Ouvrir la borne
                </a>
                <CopyLink url={c.boothUrl} />
              </div>
            )}

            {c.recent.length > 0 && (
              <details className="mt-6">
                <summary className="cursor-pointer text-sm text-fmmuted">Dernières générations</summary>
                <ul className="mt-3 flex flex-col gap-1 text-sm">
                  {c.recent.map((r, i) => (
                    <li key={i} className="flex justify-between gap-4 border-b border-fmborder/60 py-1.5">
                      <span className="text-fmmuted">{new Date(r.date).toLocaleString("fr-FR")}</span>
                      <span>{USAGE[r.status] ?? r.status}</span>
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </section>
        ))}
      </div>
      <p className="mt-10 text-xs text-fmmuted">
        Pour modifier un forfait, des dates ou des textes, contactez FMRXR Studio : fmrxr.studio@gmail.com
      </p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div>
      <p className="text-xs text-fmmuted">{label}</p>
      <p className="fm-display mt-1 text-3xl">{value}</p>
    </div>
  );
}
