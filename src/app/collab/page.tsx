import Link from "next/link";
import {
  BUCKET_LABEL, BUCKET_ORDER, CATEGORY_LABEL, LEAD_DAYS, STATUS_LABEL,
  SchemaMissingError, bucketOf, daysUntil, formatDate, formatDelta, lastScan,
  listOpportunities, targetDate, type Bucket, type Opportunity,
} from "@/lib/collab/opportunities";

export const dynamic = "force-dynamic";

function SchemaMissing() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16 md:px-8">
      <h1 className="fm-display text-2xl text-fmfg">L’espace n’est pas encore initialisé</h1>
      <p className="fm-grotesk mt-4 text-sm leading-relaxed text-fmfg/80">
        Les tables n’existent pas encore dans Supabase. Ouvre le projet{" "}
        <strong className="text-fmfg">fmrxr-web</strong>, va dans SQL Editor, colle le contenu de{" "}
        <code className="text-fmaccent">supabase/migrations/0012_opportunities.sql</code> et
        exécute. Cette page se remplira ensuite toute seule.
      </p>
    </div>
  );
}

const STATUS_TINT: Record<string, string> = {
  to_study: "border-fmborder text-fmmuted",
  preparing: "border-fmaccent/40 text-fmaccent",
  submitted: "border-sky-400/40 text-sky-300",
  result: "border-fmfg/30 text-fmfg/70",
};

function Chip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] ${className}`}>
      {children}
    </span>
  );
}

function Row({ o }: { o: Opportunity }) {
  const target = targetDate(o.deadline);
  const toTarget = daysUntil(target);
  const toDeadline = daysUntil(o.deadline);
  const late = toTarget !== null && toTarget < 0 && (toDeadline ?? 0) >= 0;

  return (
    <Link
      href={`/collab/${o.slug}`}
      className="fm-row grid grid-cols-1 gap-3 border-b border-fmborder px-5 py-4 last:border-b-0 md:grid-cols-[1fr_auto] md:items-center md:gap-6 md:px-6"
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          {o.priority !== null && o.priority <= 2 && (
            <Chip className="border-fmaccent/50 text-fmaccent">Priorité {o.priority}</Chip>
          )}
          <p className="fm-display truncate text-[15px] text-fmfg">{o.title}</p>
          <span className="fm-arrow text-fmmuted">→</span>
        </div>
        <p className="fm-grotesk mt-1 truncate text-xs text-fmmuted">
          {[o.org, o.location, o.category ? CATEGORY_LABEL[o.category] ?? o.category : null]
            .filter(Boolean).join(" · ")}
        </p>
        {o.funding && (
          <p className="fm-grotesk mt-1.5 truncate text-xs text-fmfg/70">{o.funding}</p>
        )}
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-2 md:justify-end">
        <div className="md:text-right">
          <p className="text-[10px] uppercase tracking-[0.1em] text-fmmuted">Cible</p>
          <p className={`fm-grotesk text-sm ${late ? "text-amber-300" : "text-fmfg"}`}>
            {target ? formatDate(target) : (o.deadline_note ?? "—")}
          </p>
          <p className="fm-grotesk text-[11px] text-fmmuted">
            {target ? formatDelta(toTarget) : ""}
          </p>
        </div>
        <div className="md:text-right">
          <p className="text-[10px] uppercase tracking-[0.1em] text-fmmuted">Limite</p>
          {/* Sans date ferme, la note est deja portee par la colonne Cible : la
              repeter ici donnerait deux fois la meme phrase cote a cote. */}
          <p className="fm-grotesk text-sm text-fmfg/70">
            {o.deadline ? formatDate(o.deadline) : "—"}
          </p>
          <p className="fm-grotesk text-[11px] text-fmmuted">
            {o.deadline ? formatDelta(toDeadline) : ""}
          </p>
        </div>
        <div className="flex flex-col items-start gap-1.5 md:items-end">
          <Chip className={STATUS_TINT[o.status] ?? "border-fmborder text-fmmuted"}>
            {STATUS_LABEL[o.status]}
          </Chip>
          {o.assignee && <span className="fm-grotesk text-[11px] text-fmmuted">{o.assignee}</span>}
        </div>
      </div>
    </Link>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-fmbg p-5">
      <p className="fm-display text-2xl text-fmfg">{value}</p>
      <p className="fm-grotesk mt-1.5 text-xs leading-relaxed text-fmmuted">{label}</p>
    </div>
  );
}

export default async function CollabIndex({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { who } = await searchParams;
  const filter = typeof who === "string" ? who : null;

  let all: Opportunity[];
  let scan: Awaited<ReturnType<typeof lastScan>>;
  try {
    [all, scan] = await Promise.all([listOpportunities(), lastScan()]);
  } catch (e) {
    if (e instanceof SchemaMissingError) return <SchemaMissing />;
    throw e;
  }
  const rows = filter ? all.filter((o) => o.assignee === filter) : all;

  const open = rows.filter((o) => bucketOf(o) !== "closed" && o.eligible);
  const urgent = open.filter((o) => ["late", "now"].includes(bucketOf(o)));
  const submitted = rows.filter((o) => o.status === "submitted" || o.status === "result");
  const pot = open.reduce((sum, o) => sum + (o.funding_eur ?? 0), 0);

  const assignees = [...new Set(all.map((o) => o.assignee).filter(Boolean))] as string[];

  const groups = BUCKET_ORDER.map((b) => ({
    bucket: b,
    items: rows.filter((o) => bucketOf(o) === b && (b === "closed" || o.eligible)),
  })).filter((g) => g.items.length > 0);

  const ineligible = rows.filter((o) => !o.eligible && bucketOf(o) !== "closed");
  const scanAge = scan ? daysUntil(scan.at.slice(0, 10)) : null;

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-14">
      <p className="text-[10px] uppercase tracking-[0.14em] text-fmmuted">Espace partagé</p>
      <h1 className="fm-display mt-2 text-3xl text-fmfg md:text-4xl">Appels à candidatures</h1>
      <p className="fm-grotesk mt-4 max-w-2xl text-sm leading-relaxed text-fmfg/80">
        Chaque appel affiche deux dates. La <strong className="text-fmfg">cible</strong> est la date
        à laquelle le dossier doit être déposé, {`${LEAD_DAYS} jours`} avant la clôture. La{" "}
        <strong className="text-fmfg">limite</strong> est la clôture officielle. Sur un corpus de
        48 567 soumissions, les dossiers déposés {`${LEAD_DAYS} jours`} ou plus à l’avance sont
        retenus dans 71,4 % des cas, contre 59,3 % pour ceux déposés la veille. C’est la cible
        qui compte, pas la limite.
      </p>

      <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder sm:grid-cols-2 lg:grid-cols-4">
        <Stat value={String(open.length)} label="Appels ouverts et éligibles" />
        <Stat value={String(urgent.length)} label={`Cible atteinte ou sous 15 jours`} />
        <Stat
          value={pot ? `${Math.round(pot / 1000)} k€` : "—"}
          label="Dotation cumulée des appels ouverts"
        />
        <Stat value={String(submitted.length)} label="Dossiers déposés ou tranchés" />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="fm-grotesk flex flex-wrap items-center gap-2 text-xs">
          <span className="text-fmmuted">Qui :</span>
          <Link
            href="/collab"
            className={`rounded-full border px-3 py-1 ${!filter ? "border-fmaccent/50 text-fmaccent" : "border-fmborder text-fmmuted"}`}
          >
            tout le monde
          </Link>
          {assignees.map((a) => (
            <Link
              key={a}
              href={`/collab?who=${encodeURIComponent(a)}`}
              className={`rounded-full border px-3 py-1 ${filter === a ? "border-fmaccent/50 text-fmaccent" : "border-fmborder text-fmmuted"}`}
            >
              {a}
            </Link>
          ))}
        </div>
        <p className="fm-grotesk ml-auto text-xs text-fmmuted">
          {scan
            ? `Dernier relevé : ${formatDate(scan.at.slice(0, 10))}${
                scanAge !== null && scanAge <= -8 ? " — à rafraîchir" : ""
              }`
            : "Aucun relevé enregistré"}
        </p>
      </div>

      {groups.map((g) => (
        <section key={g.bucket} className="mt-10">
          <div className="flex items-baseline gap-3">
            <h2 className="fm-display text-lg text-fmfg">{BUCKET_LABEL[g.bucket as Bucket]}</h2>
            <span className="fm-grotesk text-xs text-fmmuted">{g.items.length}</span>
          </div>
          <div className="mt-3 overflow-hidden rounded-xl border border-fmborder">
            {g.items.map((o) => <Row key={o.id} o={o} />)}
          </div>
        </section>
      ))}

      {ineligible.length > 0 && (
        <section className="mt-10">
          <h2 className="fm-display text-lg text-fmfg">Repérés, non éligibles</h2>
          <p className="fm-grotesk mt-1 text-xs text-fmmuted">
            Gardés pour ne pas les réanalyser au prochain relevé.
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-fmborder">
            {ineligible.map((o) => (
              <Link
                key={o.id}
                href={`/collab/${o.slug}`}
                className="fm-row flex items-center gap-3 border-b border-fmborder px-5 py-3 last:border-b-0"
              >
                <p className="fm-grotesk truncate text-sm text-fmfg/60">{o.title}</p>
                <span className="fm-grotesk ml-auto shrink-0 text-xs text-fmmuted">
                  {o.notes ?? o.summary ?? ""}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {all.length === 0 && (
        <p className="fm-grotesk mt-10 rounded-xl border border-fmborder px-5 py-8 text-sm text-fmmuted">
          Aucun appel enregistré. La table <code>opportunities</code> est vide.
        </p>
      )}
    </div>
  );
}
