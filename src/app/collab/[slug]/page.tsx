import Link from "next/link";
import { notFound } from "next/navigation";
import { currentUser } from "@/lib/auth";
import {
  CATEGORY_LABEL, LEAD_DAYS, daysUntil, formatDate, formatDelta,
  getOpportunity, targetDate,
} from "@/lib/collab/opportunities";
import { AssigneeControl, NoteThread, NotesField, StatusControl, TaskList } from "./controls";

export const dynamic = "force-dynamic";

function Prose({ title, body }: { title: string; body: string | null }) {
  if (!body) return null;
  return (
    <div>
      <h2 className="fm-display text-lg text-fmfg">{title}</h2>
      <p className="fm-grotesk mt-2 whitespace-pre-wrap text-[15px] leading-relaxed text-fmfg/85">
        {body}
      </p>
    </div>
  );
}

export default async function Dossier({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [found, user] = await Promise.all([getOpportunity(slug), currentUser()]);
  if (!found) notFound();
  const { opportunity: o, tasks, notes } = found;

  const target = targetDate(o.deadline);
  const toTarget = daysUntil(target);
  const toDeadline = daysUntil(o.deadline);
  const late = toTarget !== null && toTarget < 0 && (toDeadline ?? 0) >= 0;
  const closed = toDeadline !== null && toDeadline < 0;

  const facts: [string, string][] = [
    ["Organisateur", o.org ?? "—"],
    ["Lieu", o.location ?? "—"],
    ["Nature", o.category ? CATEGORY_LABEL[o.category] ?? o.category : "—"],
    ["Dotation", o.funding ?? "—"],
    ["Voyage", o.covers_travel === null ? "à vérifier" : o.covers_travel ? "pris en charge" : "non pris en charge"],
    ["Production", o.covers_production === null ? "à vérifier" : o.covers_production ? "prise en charge" : "non prise en charge"],
    ["Repéré via", o.source ?? "—"],
  ];

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 md:px-8 md:py-14">
      <Link href="/collab" prefetch={false} className="fm-link text-xs uppercase tracking-[0.12em] text-fmmuted">
        ← Tous les appels
      </Link>

      <h1 className="fm-display mt-5 text-2xl leading-tight text-fmfg md:text-3xl">{o.title}</h1>
      {o.url && (
        <a
          href={o.url}
          target="_blank"
          rel="noopener noreferrer"
          className="fm-link fm-grotesk mt-2 inline-block break-all text-xs text-fmaccent"
        >
          {o.url}
        </a>
      )}
      {!o.eligible && (
        <p className="fm-grotesk mt-4 rounded-lg border border-fmborder bg-fmmutedbg/60 px-4 py-3 text-sm text-fmmuted">
          Non éligible. Conservé pour mémoire, afin de ne pas le réanalyser au prochain relevé.
        </p>
      )}

      {/* Les deux dates cote a cote : la cible porte la couleur, la limite reste
          en retrait, pour qu'on ne travaille pas a la date qui ne sert a rien. */}
      <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder sm:grid-cols-2">
        <div className="bg-fmbg p-5">
          <p className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">
            Date cible · {`${LEAD_DAYS} jours`} d’avance
          </p>
          <p className={`fm-display mt-2 text-xl ${late ? "text-amber-300" : "text-fmaccent"}`}>
            {target ? formatDate(target) : (o.deadline_note ?? "à établir")}
          </p>
          <p className="fm-grotesk mt-1 text-xs text-fmmuted">
            {closed
              ? "l'appel est clos"
              : target
                ? late
                  ? `cible passée ${formatDelta(toTarget)}, il reste ${toDeadline} jours avant la clôture`
                  : formatDelta(toTarget)
                : "aucune date limite publiée"}
          </p>
        </div>
        <div className="bg-fmbg p-5">
          <p className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">Clôture officielle</p>
          <p className="fm-display mt-2 text-xl text-fmfg/70">
            {o.deadline ? formatDate(o.deadline) : "—"}
          </p>
          <p className="fm-grotesk mt-1 text-xs text-fmmuted">
            {o.deadline ? formatDelta(toDeadline) : ""}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <p className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">Avancement</p>
          <div className="mt-2">
            <StatusControl slug={o.slug} status={o.status} outcome={o.outcome} />
          </div>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">En charge</p>
          <div className="mt-2">
            <AssigneeControl slug={o.slug} assignee={o.assignee} />
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-8">
        <Prose title="Ce que c'est" body={o.summary} />
        <Prose title="Pourquoi ce dossier tient" body={o.why_fit} />
        <Prose title="Contraintes" body={o.constraints_note} />
        <Prose title="Ce que le dossier doit contenir" body={o.dossier} />
      </div>

      <dl className="mt-10 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder sm:grid-cols-2">
        {facts.map(([k, v]) => (
          <div key={k} className="bg-fmbg p-4">
            <dt className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">{k}</dt>
            <dd className="fm-grotesk mt-1.5 text-sm leading-relaxed text-fmfg/85">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10">
        <TaskList slug={o.slug} opportunityId={o.id} tasks={tasks} />
      </div>

      <div className="mt-10">
        <h2 className="fm-display text-lg text-fmfg">Décisions et angle retenu</h2>
        <p className="fm-grotesk mt-1 text-xs text-fmmuted">
          Un seul texte, partagé, réécrit au fil du montage.
        </p>
        <div className="mt-3">
          <NotesField slug={o.slug} notes={o.notes} />
        </div>
      </div>

      <div className="mt-10 border-t border-fmborder pt-8">
        <NoteThread
          slug={o.slug}
          opportunityId={o.id}
          notes={notes}
          me={user?.email ?? ""}
        />
      </div>
    </div>
  );
}
