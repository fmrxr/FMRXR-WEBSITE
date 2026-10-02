import Link from "next/link";
import {
  LEAD_DAYS, SchemaMissingError, formatDate,
  listOpportunities, type Opportunity,
} from "@/lib/collab/opportunities";
import {
  axisBounds, batchesOf, monthsOf, peakOpen, today, windowsOf,
  type Batch, type Day, type Month,
} from "@/lib/collab/schedule";

export const dynamic = "force-dynamic";

// Semaine commencant le lundi, usage francais. La reference envoyee demarrait au
// dimanche, convention americaine d'un gabarit generique.
const WEEKDAYS = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"];

/** Titre raccourci : une case de calendrier ne tient pas une phrase. */
function short(title: string) {
  const head = title.split(/\s[—·:(]|,\s/)[0];
  return head.length > 22 ? `${head.slice(0, 21)}…` : head;
}

function Cell({ day, peak }: { day: Day; peak: number }) {
  // Fond neutre, pas colore. Une premiere version teintait la case en vert, la
  // meme teinte que les pastilles « date cible » : la densite et l'identite se
  // disputaient la couleur et la grille entiere virait a l'olive. La magnitude
  // ne porte plus que sur la clarte, la teinte reste aux marqueurs.
  const heat = day.inMonth && day.open > 0 ? 0.025 + (day.open / peak) * 0.065 : 0;

  // Le compte ne s'ecrit pas dans la case : deux nombres cote a cote, le
  // quantieme et le total, se lisent comme une plage de dates. Le fond porte la
  // magnitude, l'infobulle donne le chiffre exact.
  return (
    <div
      title={day.inMonth && day.open > 0 ? `${day.open} appel${day.open > 1 ? "s" : ""} déposable${day.open > 1 ? "s" : ""} ce jour-là` : undefined}
      className={`relative min-h-20 border-b border-r border-fmborder p-1.5 last:border-r-0 ${
        day.inMonth ? "" : "opacity-25"
      }`}
      style={heat ? { backgroundColor: `rgba(245, 245, 248, ${heat.toFixed(3)})` } : undefined}
    >
      <div className="flex items-baseline gap-1.5">
        <span
          className={`fm-grotesk text-[11px] tabular-nums ${
            day.isToday
              ? "rounded bg-fmfg px-1 font-medium text-fmbg"
              : day.past
                ? "text-fmmuted/60"
                : "text-fmfg/75"
          }`}
        >
          {day.date.getUTCDate()}
        </span>
      </div>

      <div className="mt-1 flex flex-col gap-0.5">
        {day.events.map((e) => (
          <Link
            key={e.kind + e.window.slug}
            href={`/collab/${e.window.slug}`}
            prefetch={false}
            title={`${e.kind === "deadline" ? "Clôture" : "Date cible"} · ${e.window.title}`}
            className={`fm-grotesk flex items-center gap-1 truncate rounded px-1 py-0.5 text-[10px] leading-tight transition-colors ${
              e.kind === "deadline"
                ? "bg-[#ef4444]/18 text-fmfg hover:bg-[#ef4444]/30"
                : "bg-fmaccent/15 text-fmfg hover:bg-fmaccent/25"
            }`}
          >
            <span
              className={`size-1 shrink-0 rounded-full ${
                e.kind === "deadline" ? "bg-[#ef4444]" : "bg-fmaccent"
              }`}
              aria-hidden
            />
            <span className="truncate">{short(e.window.title)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

const DAY_LABEL = new Intl.DateTimeFormat("fr-FR", { weekday: "short", day: "numeric", timeZone: "UTC" });

/**
 * Vue telephone : l'agenda, pas la grille.
 *
 * Une grille de sept colonnes sur 375 px ne laisse que cinquante pixels par
 * jour, de quoi afficher un quantieme et rien d'autre. Les applications de
 * calendrier basculent toutes en liste a cette largeur, et c'est la bonne
 * reponse : seuls les jours qui portent quelque chose, dans l'ordre.
 */
function Agenda({ m }: { m: Month }) {
  const days = m.weeks.flat().filter((d) => d.inMonth && d.events.length > 0);
  if (days.length === 0) {
    return (
      <p className="fm-grotesk mt-3 rounded-xl border border-fmborder px-4 py-5 text-xs text-fmmuted">
        Aucune échéance ce mois-ci.
      </p>
    );
  }
  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-fmborder md:hidden">
      {days.map((day) => (
        <div
          key={day.date.getTime()}
          className="flex gap-3 border-b border-fmborder px-4 py-3 last:border-b-0"
        >
          <div className="w-16 shrink-0 pt-0.5">
            <p
              className={`fm-grotesk text-xs capitalize tabular-nums ${
                day.isToday ? "font-medium text-fmaccent" : day.past ? "text-fmmuted/60" : "text-fmfg"
              }`}
            >
              {DAY_LABEL.format(day.date)}
            </p>
            {day.open > 0 && (
              <p className="fm-grotesk text-[10px] tabular-nums text-fmmuted">
                {day.open} ouvert{day.open > 1 ? "s" : ""}
              </p>
            )}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            {day.events.map((e) => (
              <Link
                key={e.kind + e.window.slug}
                href={`/collab/${e.window.slug}`}
                prefetch={false}
                className="fm-grotesk flex items-center gap-2 text-xs text-fmfg"
              >
                <span
                  className={`size-1.5 shrink-0 rounded-full ${
                    e.kind === "deadline" ? "bg-[#ef4444]" : "bg-fmaccent"
                  }`}
                  aria-hidden
                />
                <span className="min-w-0 flex-1 truncate">{e.window.title}</span>
                <span className="shrink-0 text-[10px] uppercase tracking-[0.08em] text-fmmuted">
                  {e.kind === "deadline" ? "clôture" : "cible"}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function MonthGrid({ m, peak }: { m: Month; peak: number }) {
  return (
    <section>
      <h2 className="fm-display text-lg capitalize text-fmfg">{m.label}</h2>
      {/* Grille au-dela de 768 px seulement. En dessous, sept colonnes rendent
          les pastilles illisibles et un defilement lateral n'est qu'un pis-aller :
          c'est la vue agenda qui prend le relais. */}
      <div className="mt-3 hidden overflow-hidden rounded-xl border border-fmborder md:block">
        <div>
        <div className="grid grid-cols-7 border-b border-fmborder bg-fmmutedbg/40">
          {WEEKDAYS.map((d) => (
            <span
              key={d}
              className="border-r border-fmborder px-2 py-1.5 text-center text-[10px] uppercase tracking-[0.12em] text-fmmuted last:border-r-0"
            >
              {d}
            </span>
          ))}
        </div>
        {m.weeks.map((week) => (
          <div key={week[0].date.getTime()} className="grid grid-cols-7">
            {week.map((day) => <Cell key={day.date.getTime()} day={day} peak={peak} />)}
          </div>
        ))}
        </div>
      </div>
      <Agenda m={m} />
    </section>
  );
}

function Legend({ peak }: { peak: number }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      <span className="flex items-center gap-2">
        <span className="size-2 rounded-full bg-[#ef4444]" aria-hidden />
        <span className="fm-grotesk text-[11px] text-fmmuted">Clôture, dernier jour utile</span>
      </span>
      <span className="flex items-center gap-2">
        <span className="size-2 rounded-full bg-fmaccent" aria-hidden />
        <span className="fm-grotesk text-[11px] text-fmmuted">
          Date cible, {`${LEAD_DAYS} jours`} avant la clôture
        </span>
      </span>
      <span className="flex items-center gap-2">
        <span className="flex" aria-hidden>
          {[0.25, 0.5, 0.75, 1].map((f) => (
            <span
              key={f}
              className="h-3 w-4 border border-fmborder"
              style={{ backgroundColor: `rgba(245, 245, 248, ${(0.025 + f * 0.065).toFixed(3)})` }}
            />
          ))}
        </span>
        <span className="fm-grotesk text-[11px] text-fmmuted">
          Fond : appels déposables ce jour-là, jusqu’à {peak}
        </span>
      </span>
    </div>
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
      {/* Sur telephone chaque ligne passe a la ligne plutot que d'etre coupee :
          la place manque en largeur, pas en hauteur. */}
      <ul className="fm-grotesk mt-2.5 flex flex-col gap-1">
        {b.windows.map((w) => (
          <li key={w.slug} className="text-xs text-fmfg/80 md:truncate">
            <Link href={`/collab/${w.slug}`} prefetch={false} className="fm-link">
              {w.title}
            </Link>
            <span className="tabular-nums text-fmmuted"> · ferme le {formatDate(w.end)}</span>
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
  const months = monthsOf(windows, bounds);
  const peak = peakOpen(months);
  const batches = batchesOf(windows);
  const now = today();
  const undated = all.filter((o) => o.eligible && !o.deadline);

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-14">
      <Link href="/collab" prefetch={false} className="fm-link text-xs uppercase tracking-[0.12em] text-fmmuted">
        ← Tous les appels
      </Link>

      <h1 className="fm-display mt-5 text-3xl text-fmfg md:text-4xl">Calendrier</h1>
      <p className="fm-grotesk mt-4 max-w-2xl text-sm leading-relaxed text-fmfg/80">
        Chaque appel pose deux repères : sa <strong className="text-fmfg">date cible</strong>,
        soit {`${LEAD_DAYS} jours`} avant la clôture, et sa{" "}
        <strong className="text-fmfg">clôture</strong>. Le fond d’une journée s’assombrit avec le
        nombre d’appels qu’on peut y déposer : les semaines chargées se repèrent sans lire une
        seule date. Tout est calculé depuis les clôtures enregistrées.
      </p>

      {windows.length === 0 ? (
        <p className="fm-grotesk mt-10 rounded-xl border border-fmborder px-5 py-8 text-sm text-fmmuted">
          Aucun appel daté et ouvert.
        </p>
      ) : (
        <>
          <div className="mt-6">
            <Legend peak={peak} />
          </div>

          <div className="mt-6 flex flex-col gap-8">
            {months.map((m) => <MonthGrid key={`${m.year}-${m.month}`} m={m} peak={peak} />)}
          </div>

          <h2 className="fm-display mt-12 text-lg text-fmfg">Ce qui part ensemble</h2>
          <p className="fm-grotesk mt-1 max-w-2xl text-xs leading-relaxed text-fmmuted">
            Chaque bloc réunit des appels dont les fenêtres de dépôt se recouvrent toutes, deux à
            deux : il existe une période où ils peuvent partir le même jour. Un même dossier peut
            apparaître dans plusieurs blocs.
          </p>
          <div className="mt-4 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder md:grid-cols-2">
            {batches.map((b, i) => <BatchCard key={`${b.from.getTime()}-${b.windows.length}`} b={b} rank={i} />)}
          </div>
        </>
      )}

      {undated.length > 0 && (
        <section className="mt-10">
          <h2 className="fm-display text-lg text-fmfg">Hors calendrier</h2>
          <p className="fm-grotesk mt-1 text-xs text-fmmuted">
            Aucune clôture publiée, donc impossibles à placer. À dater avant de pouvoir les
            arbitrer avec le reste.
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
        Du {formatDate(now)} au {formatDate(bounds.to)}.
      </p>
    </div>
  );
}
