import type { CampaignStats } from "@/lib/photobooth/stats";
import type { Contact } from "@/lib/photobooth/contact";

// Statistiques et contacts de la galerie d'equipe : le bilan que la marque
// emporte apres l'evenement.

export function GalleryStats({ stats, lead }: { stats: CampaignStats; lead: boolean }) {
  const tiles: [string, number | string, string?][] = [
    ["Portraits", stats.portraits, stats.groups ? `dont ${stats.groups} de groupe` : undefined],
    ["Vues des pages de partage", stats.shareViews, "scans du QR et liens ouverts"],
    ["Téléchargements", stats.downloads],
    ["Emails envoyés", stats.emailsSent, stats.emailsRequested > stats.emailsSent ? `${stats.emailsRequested} demandés` : undefined],
    ...(lead ? [["Contacts collectés", stats.contacts, `${stats.optIns} inscrits aux nouvelles`] as [string, number, string]] : []),
  ];
  const maxStyle = Math.max(1, ...stats.styles.map((s) => s.count));
  const maxTl = Math.max(1, ...stats.timeline.map((s) => s.count));
  return (
    <section aria-label="Statistiques" className="mt-8">
      <div className={`grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder sm:grid-cols-2 ${tiles.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
        {tiles.map(([label, value, sub]) => (
          <div key={label} className="bg-fmbg p-5">
            <p className="text-xs text-fmmuted">{label}</p>
            <p className="fm-display mt-1 text-3xl text-fmfg">{value}</p>
            {sub && <p className="mt-1 text-xs text-fmmuted">{sub}</p>}
          </div>
        ))}
      </div>
      {stats.portraits > 0 && (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-fmborder p-5">
            <p className="text-sm text-fmfg">Styles choisis</p>
            <ul className="mt-3 space-y-2">
              {stats.styles.map((s) => (
                <li key={s.id} className="grid grid-cols-[9rem_1fr_2.5rem] items-center gap-3 text-sm">
                  <span className="truncate text-fmfg/85">{s.label}</span>
                  <span className="h-2 rounded-full bg-fmaccent/80" style={{ width: `${(s.count / maxStyle) * 100}%` }} />
                  <span className="text-end tabular-nums text-fmmuted">{s.count}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-fmborder p-5">
            <p className="text-sm text-fmfg">
              Affluence{stats.peak ? <span className="text-fmmuted"> · pic à {stats.peak}</span> : null}
            </p>
            <div className="mt-3 flex h-32 items-end gap-1" role="img" aria-label="Portraits par période">
              {stats.timeline.map((t) => (
                <div key={t.label} className="flex min-w-0 flex-1 flex-col items-center gap-1">
                  <span className="w-full rounded-t bg-fmfg/70" style={{ height: `${Math.max(4, (t.count / maxTl) * 100)}px` }} title={`${t.label} : ${t.count}`} />
                  <span className="truncate text-[10px] text-fmmuted">{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function GalleryContacts({ rows, csvUrl }: { rows: { id: string; date: string; title: string; contact: Contact }[]; csvUrl: string }) {
  return (
    <section aria-label="Contacts" className="mt-8 rounded-xl border border-fmborder p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-fmfg">Contacts collectés <span className="text-fmmuted">· {rows.length}</span></p>
        <a href={csvUrl} className="rounded-full bg-fmfg px-5 py-2 text-sm font-semibold text-fmbg hover:bg-fmaccent">Exporter en CSV</a>
      </div>
      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-fmmuted">Aucun contact pour l’instant.</p>
      ) : (
        <div className="mt-4 max-h-80 overflow-auto">
          <table className="w-full min-w-[40rem] text-start text-sm">
            <thead className="sticky top-0 bg-fmbg text-xs text-fmmuted">
              <tr>
                {["Date", "Nom", "Email", "Téléphone", "Réponse", "Nouvelles"].map((h) => <th key={h} className="py-2 pe-4 text-start font-normal">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-fmborder">
              {rows.slice(0, 200).map((r) => (
                <tr key={r.id}>
                  <td className="py-2 pe-4 text-fmmuted">{new Date(r.date).toLocaleString("fr-FR", { timeZone: "Africa/Tunis", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}</td>
                  <td className="py-2 pe-4">{r.contact.name ?? ""}</td>
                  <td className="py-2 pe-4" dir="ltr">{r.contact.email ?? ""}</td>
                  <td className="py-2 pe-4" dir="ltr">{r.contact.phone ?? ""}</td>
                  <td className="py-2 pe-4">{r.contact.answer ?? ""}</td>
                  <td className="py-2 pe-4">{r.contact.optIn ? "Oui" : "Non"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-3 text-xs text-fmmuted">
        Seuls les invités qui ont coché la case acceptent de recevoir des nouvelles. Les contacts sont effacés à la fin de la durée de conservation : exportez-les avant.
      </p>
    </section>
  );
}
