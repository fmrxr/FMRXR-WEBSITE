import Link from "next/link";
import { currentUser } from "@/lib/auth";
import {
  SchemaMissingError, STATUS_LABEL, daysUntil, formatDate, formatDelta,
  lastSeen, listActivity, recentlyTouched, targetDate,
  type CollabActivity, type Opportunity,
} from "@/lib/collab/opportunities";
import { SeenButton } from "./seen-button";

export const dynamic = "force-dynamic";

function Reply({ n, unread }: { n: CollabActivity; unread: boolean }) {
  return (
    <li
      className={`border-l-2 py-3 pl-4 ${unread ? "border-fmaccent" : "border-fmborder"}`}
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <Link
          href={`/collab/${n.slug}`}
          className="fm-link font-grotesk text-sm text-fmfg"
        >
          {n.title}
        </Link>
        <span className="font-grotesk text-[11px] text-fmaccent">{n.author_email ?? "inconnu"}</span>
        <span className="font-grotesk text-[11px] text-fmmuted">
          {new Date(n.created_at).toLocaleString("fr-FR", {
            day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
          })}
        </span>
        {unread && (
          <span className="rounded-full border border-fmaccent/50 px-2 py-0.5 font-grotesk text-[9px] uppercase tracking-[0.1em] text-fmaccent">
            nouveau
          </span>
        )}
      </div>
      <p className="mt-1.5 whitespace-pre-wrap font-grotesk text-sm leading-relaxed text-fmfg/85">
        {n.body}
      </p>
    </li>
  );
}

function Touched({ o }: { o: Opportunity }) {
  const toTarget = daysUntil(targetDate(o.deadline));
  return (
    <Link
      href={`/collab/${o.slug}`}
      className="fm-row flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-fmborder px-4 py-3 last:border-b-0"
    >
      <span className="min-w-0 flex-1 truncate font-grotesk text-sm text-fmfg">{o.title}</span>
      <span className="font-grotesk text-[11px] text-fmmuted">{STATUS_LABEL[o.status]}</span>
      {o.assignee && <span className="font-grotesk text-[11px] text-fmaccent">{o.assignee}</span>}
      <span className="font-grotesk text-[11px] text-fmmuted">
        cible {o.deadline ? formatDate(targetDate(o.deadline)) : "—"}
        {toTarget !== null && ` · ${formatDelta(toTarget)}`}
      </span>
    </Link>
  );
}

export default async function OsCollab() {
  let replies: CollabActivity[];
  let touched: Opportunity[];
  let seen: string | null;
  let me: string | undefined;

  try {
    const [a, b, c, u] = await Promise.all([
      listActivity(), recentlyTouched(), lastSeen(), currentUser(),
    ]);
    replies = a; touched = b; seen = c; me = u?.email;
  } catch (e) {
    if (e instanceof SchemaMissingError) {
      return (
        <p className="fm-rise font-grotesk text-sm text-fmmuted">
          L’espace Opportunities n’est pas initialisé : la migration 0012 n’a pas été appliquée.
        </p>
      );
    }
    throw e;
  }

  // Non lu = ecrit apres le dernier passage, et pas par soi-meme : se compter
  // soi-meme ferait clignoter le module a chaque fois qu'on y repond.
  const isUnread = (n: CollabActivity) =>
    n.author_email !== me && (!seen || n.created_at > seen);
  const unreadCount = replies.filter(isUnread).length;

  const authors = [...new Set(replies.map((n) => n.author_email).filter((a) => a && a !== me))];

  return (
    <div className="fm-rise flex flex-col gap-10">
      <header className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <h1 className="font-display text-xl text-fmfg">Collaborateurs</h1>
        <p className="font-grotesk text-xs text-fmmuted">
          {unreadCount > 0
            ? `${unreadCount} réponse${unreadCount > 1 ? "s" : ""} non lue${unreadCount > 1 ? "s" : ""}`
            : "Tout est lu"}
          {authors.length > 0 && ` · ${authors.join(", ")}`}
        </p>
        <div className="ml-auto flex items-center gap-3">
          <SeenButton count={unreadCount} />
          <Link
            href="/collab"
            className="fm-link shrink-0 font-grotesk text-[11px] uppercase tracking-[0.1em] text-fmmuted"
          >
            Ouvrir l’espace →
          </Link>
        </div>
      </header>

      <section>
        <h2 className="mb-3 font-grotesk text-xs uppercase tracking-[0.16em] text-fmmuted">
          Réponses
        </h2>
        {replies.length === 0 ? (
          <p className="font-grotesk text-sm text-fmmuted">
            Personne n’a encore écrit dans un dossier.
          </p>
        ) : (
          <ul className="flex flex-col gap-1">
            {replies.map((n) => <Reply key={n.id} n={n} unread={isUnread(n)} />)}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-3 font-grotesk text-xs uppercase tracking-[0.16em] text-fmmuted">
          Dossiers modifiés en dernier
        </h2>
        {touched.length === 0 ? (
          <p className="font-grotesk text-sm text-fmmuted">
            Aucun dossier n’a encore été modifié depuis son import.
          </p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-fmborder">
            {touched.map((o) => <Touched key={o.id} o={o} />)}
          </div>
        )}
      </section>
    </div>
  );
}
