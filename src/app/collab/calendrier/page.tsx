import Link from "next/link";
import {
  LEAD_DAYS, SchemaMissingError, STATUS_LABEL, formatDate,
  listOpportunities, type Opportunity,
} from "@/lib/collab/opportunities";
import {
  axisBounds, batchesOf, monthTicks, position, today, windowsOf,
  type Batch, type Window,
} from "@/lib/collab/schedule";

export const dynamic = "force-dynamic";

type Bounds = ReturnType<typeof axisBounds>;

function Gridlines({ bounds }: { bounds: Bounds }) {
  return (
    <>
      {monthTicks(bounds).map((t) => (
        <div
          key={t.date.getTime()}
          className="absolute inset-y-0 w-px bg-fmborder/60"
          style={{ left: `${position(t.date, bounds)}%` }}
        />
      ))}
      {/* Aujourd'hui est l'origine de l'axe, pas une date au milieu. */}
      <div className="absolute inset-y-0 w-px bg-fmaccent/50" style={{ left: 0 }} />
    </>
  );
}

function Row({ w, bounds }: { w: Window; bounds: Bounds }) {
  const left = position(w.start, bounds);
  const right = position(w.end, bounds);
  const prepRight = position(w.late ? w.start : w.target, bounds);

  return (
    <Link
      href={`/collab/${w.slug}`}
      prefetch={false}
      className="fm-row grid grid-cols-1 items-center gap-1 border-b border-fmborder px-4 py-3 last:border-b-0 md:grid-cols-[minmax(0,11rem)_1fr_minmax(0,10rem)] md:gap-4"
    >
      <div className="min-w-0">
        <p className="fm-grotesk truncate text-sm text-fmfg">{w.title}</p>
        <p className="fm-grotesk truncate text-[11px] text-fmmuted">
          {STATUS_LABEL[w.status]}{w.assignee && ` · ${w.assignee}`}
        </p>
      </div>

      <div className="relative h-7">
        <Gridlines bounds={bounds} />
        {/* Trait fin : le temps qui reste avant que la fenetre s'ouvre. */}
        {!w.late && prepRight > 0 && (
          <div
            className="absolute top-1/2 h-px -translate-y-1/2 bg-fmborder"
            style={{ left: 0, width: `${prepRight}%` }}
          />
        )}
        <div
          className={`absolute top-1/2 h-2.5 -translate-y-1/2 rounded-full ${
            w.late ? "bg-amber-400/70" : "bg-fmaccent/70"
          }`}
          style={{ left: `${left}%`, width: `${Math.max(0.6, right - left)}%` }}
        />
      </div>

      <div className="shrink-0 md:text-right">
        <p className={`fm-grotesk text-xs ${w.late ? "text-amber-300" : "text-fmfg"}`}>
          {w.late ? "déposable maintenant" : `prêt le ${formatDate(w.target)}`}
        </p>
        <p className="fm-grotesk text-[11px] text-fmmuted">clôture {formatDate(w.end)}</p>
      </div>
    </Link>
  );
}

function BatchCard({ b, rank }: { b: Batch; rank: number }) {
  const pot = b.windows.reduce((s, w) => s + (w.funding_eur ?? 0), 0);
  return (
    <div className="bg-fmbg p-5">
      <div className="flex flex-wrap items-baseline gap-x-3">
        <p className="fm-display text-sm text-fmfg">
          {b.windows.length} dossier{b.windows.length > 1 ? "s" : ""}
        </p>
        <p className="fm-grotesk text-[11px] text-fmmuted">
          du {formatDate(b.from)} au {formatDate(b.to)} · {b.days} jour{b.days > 1 ? "s" : ""}
          {pot > 0 && ` · ${Math.round(pot / 1000)} k€`}
        </p>
        {rank === 0 && (
          <span className="rounded-full border border-fmaccent/50 px-2 py-0.5 text-[9px] uppercase tracking-[0.1em] text-fmaccent">
            maintenant
          </span>
        )}
      </div>
      <ul className="fm-grotesk mt-2.5 flex flex-col gap-1">
        {b.windows.map((w) => (
          <li key={w.slug} className="truncate text-xs text-fmfg/80">
            <Link href={`/collab/${w.slug}`} prefetch={false} className="fm-link">
              {w.title}
            </Link>
            <span className="text-fmmuted"> · ferme le {formatDate(w.end)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function Calendrier() {
  let all: Opportunity[];
  try {
    all = await listOpportunities();
  } catch (e) {
    if (e instanceof SchemaMissingError) {
      return (
        <div className="mx-auto max-w-2xl px-5 py-16 md:px-8">
          <h1 className="fm-display text-2xl text-fmfg">L’espace n’est pas encore initialisé</h1>
        </div>
      );
    }
    throw e;
  }

  const windows = windowsOf(all);
  const bounds = axisBounds(windows);
  const batches = batchesOf(windows);
  const now = today();
  const undated = all.filter((o) => o.eligible && !o.deadline);
  const busiest = Math.max(0, ...batches.map((b) => b.windows.length));

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-14">
      <Link href="/collab" prefetch={false} className="fm-link text-xs uppercase tracking-[0.12em] text-fmmuted">
        ← Tous les appels
      </Link>

      <h1 className="fm-display mt-5 text-3xl text-fmfg md:text-4xl">Calendrier</h1>
      <p className="fm-grotesk mt-4 max-w-2xl text-sm leading-relaxed text-fmfg/80">
        Chaque barre est la <strong className="text-fmfg">fenêtre de dépôt</strong> d’un appel :
        de sa date cible à sa clôture, soit les {`${LEAD_DAYS} jours`} pendant lesquels le dossier
        peut encore partir avec l’avance qui compte. Le trait fin qui la précède est le temps
        restant pour le préparer. Tout est calculé depuis les clôtures enregistrées.
      </p>

      {windows.length === 0 ? (
        <p className="fm-grotesk mt-10 rounded-xl border border-fmborder px-5 py-8 text-sm text-fmmuted">
          Aucun appel daté et ouvert.
        </p>
      ) : (
        <>
          <div className="mt-8 overflow-hidden rounded-xl border border-fmborder">
            {windows.map((w) => <Row key={w.slug} w={w} bounds={bounds} />)}
            <div className="relative h-5 px-4 pb-2 md:ml-[11rem] md:mr-[10rem]">
              {monthTicks(bounds).map((t) => (
                <span
                  key={t.date.getTime()}
                  className="absolute top-0 -translate-x-1/2 text-[10px] uppercase tracking-[0.1em] text-fmmuted"
                  style={{ left: `${position(t.date, bounds)}%` }}
                >
                  {t.label}
                </span>
              ))}
            </div>
          </div>

          <h2 className="fm-display mt-12 text-lg text-fmfg">Ce qui part ensemble</h2>
          <p className="fm-grotesk mt-1 max-w-2xl text-xs leading-relaxed text-fmmuted">
            Chaque bloc réunit des appels dont les fenêtres se recouvrent toutes, deux à deux :
            il existe une période où ils peuvent partir le même jour. Un même dossier peut
            apparaître dans plusieurs blocs, sa fenêtre croisant plusieurs groupes.
          </p>
          <div className="mt-4 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder md:grid-cols-2">
            {batches.map((b, i) => <BatchCard key={`${b.from.getTime()}-${b.windows.length}`} b={b} rank={i} />)}
          </div>
        </>
      )}

      <section className="mt-10 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder sm:grid-cols-3">
        <div className="bg-fmbg p-5">
          <p className="fm-display text-2xl text-fmfg">{busiest}</p>
          <p className="fm-grotesk mt-1.5 text-xs leading-relaxed text-fmmuted">
            Dossiers déposables en même temps, au plus chargé
          </p>
        </div>
        <div className="bg-fmbg p-5">
          <p className="fm-display text-2xl text-fmfg">{windows.filter((w) => w.late).length}</p>
          <p className="fm-grotesk mt-1.5 text-xs leading-relaxed text-fmmuted">
            Fenêtres déjà ouvertes, à traiter sans attendre
          </p>
        </div>
        <div className="bg-fmbg p-5">
          <p className="fm-display text-2xl text-fmfg">{batches.length}</p>
          <p className="fm-grotesk mt-1.5 text-xs leading-relaxed text-fmmuted">
            Périodes distinctes à arbitrer
          </p>
        </div>
      </section>

      {undated.length > 0 && (
        <section className="mt-10">
          <h2 className="fm-display text-lg text-fmfg">Hors calendrier</h2>
          <p className="fm-grotesk mt-1 text-xs text-fmmuted">
            Aucune clôture publiée, donc impossibles à placer sur l’axe. À dater avant de pouvoir
            les arbitrer avec le reste.
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-fmborder">
            {undated.map((o) => (
              <Link
                key={o.id}
                href={`/collab/${o.slug}`}
                prefetch={false}
                className="fm-row flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-fmborder px-4 py-3 last:border-b-0"
              >
                <span className="fm-grotesk text-sm text-fmfg">{o.title}</span>
                <span className="fm-grotesk ml-auto text-[11px] text-fmmuted">
                  {o.deadline_note ?? "date à trouver"}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <p className="fm-grotesk mt-8 text-xs text-fmmuted">
        Axe du {formatDate(now)} au {formatDate(bounds.to)}, {bounds.days} jours d’horizon.
      </p>
    </div>
  );
}
