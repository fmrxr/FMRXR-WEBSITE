"use client";
import { useState, useTransition } from "react";
import {
  OUTCOME_LABEL, STATUS_LABEL,
  type OpportunityNote, type OpportunityStatus, type OpportunityTask,
} from "@/lib/collab/types";
import {
  addNote, addTask, deleteNote, deleteTask, setAssignee, setNotes, setStatus, toggleTask,
} from "../actions";

const FIELD =
  "fm-grotesk w-full rounded-lg border border-fmborder bg-fmmutedbg px-3 py-2 text-sm text-fmfg placeholder:text-fmmuted focus:border-fmaccent/50 focus:outline-none";
const BTN =
  "fm-grotesk shrink-0 rounded-lg border border-fmborder px-3 py-2 text-xs uppercase tracking-[0.1em] text-fmfg transition-colors hover:border-fmaccent/50 hover:text-fmaccent disabled:opacity-40";

export function StatusControl({
  slug, status, outcome,
}: { slug: string; status: OpportunityStatus; outcome: string | null }) {
  const [pending, start] = useTransition();
  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={status}
        disabled={pending}
        onChange={(e) => start(() => setStatus(slug, e.target.value, outcome ?? undefined))}
        className={FIELD + " max-w-[13rem]"}
      >
        {(Object.keys(STATUS_LABEL) as OpportunityStatus[]).map((s) => (
          <option key={s} value={s}>{STATUS_LABEL[s]}</option>
        ))}
      </select>
      {status === "result" && (
        <select
          value={outcome ?? ""}
          disabled={pending}
          onChange={(e) => start(() => setStatus(slug, "result", e.target.value))}
          className={FIELD + " max-w-[13rem]"}
        >
          <option value="">résultat ?</option>
          {(Object.keys(OUTCOME_LABEL) as (keyof typeof OUTCOME_LABEL)[]).map((o) => (
            <option key={o} value={o}>{OUTCOME_LABEL[o]}</option>
          ))}
        </select>
      )}
    </div>
  );
}

export function AssigneeControl({ slug, assignee }: { slug: string; assignee: string | null }) {
  const [value, setValue] = useState(assignee ?? "");
  const [pending, start] = useTransition();
  const dirty = value.trim() !== (assignee ?? "");
  return (
    <div className="flex items-center gap-2">
      <input
        value={value}
        placeholder="personne en charge"
        onChange={(e) => setValue(e.target.value)}
        className={FIELD}
      />
      <button
        type="button"
        className={BTN}
        disabled={pending || !dirty}
        onClick={() => start(() => setAssignee(slug, value))}
      >
        {pending ? "…" : "OK"}
      </button>
    </div>
  );
}

export function NotesField({ slug, notes }: { slug: string; notes: string | null }) {
  const [value, setValue] = useState(notes ?? "");
  const [pending, start] = useTransition();
  const dirty = value.trim() !== (notes ?? "");
  return (
    <div>
      <textarea
        value={value}
        rows={5}
        placeholder="Angle retenu, pièces à produire, décisions prises."
        onChange={(e) => setValue(e.target.value)}
        className={FIELD + " resize-y"}
      />
      <button
        type="button"
        className={BTN + " mt-2"}
        disabled={pending || !dirty}
        onClick={() => start(() => setNotes(slug, value))}
      >
        {pending ? "Enregistrement…" : dirty ? "Enregistrer" : "Enregistré"}
      </button>
    </div>
  );
}

export function TaskList({
  slug, opportunityId, tasks,
}: { slug: string; opportunityId: string; tasks: OpportunityTask[] }) {
  const [label, setLabel] = useState("");
  const [who, setWho] = useState("");
  const [due, setDue] = useState("");
  const [pending, start] = useTransition();

  function submit() {
    if (!label.trim()) return;
    start(async () => {
      await addTask(slug, opportunityId, label, who, due);
      setLabel(""); setDue("");
    });
  }

  const done = tasks.filter((t) => t.done).length;

  return (
    <div>
      <div className="flex items-baseline gap-3">
        <h2 className="fm-display text-lg text-fmfg">Pièces du dossier</h2>
        {tasks.length > 0 && (
          <span className="fm-grotesk text-xs text-fmmuted">{done} / {tasks.length}</span>
        )}
      </div>

      {tasks.length > 0 && (
        <ul className="mt-3 overflow-hidden rounded-xl border border-fmborder">
          {tasks.map((t) => (
            <li
              key={t.id}
              className="flex items-center gap-3 border-b border-fmborder px-4 py-3 last:border-b-0"
            >
              <input
                type="checkbox"
                checked={t.done}
                onChange={(e) => start(() => toggleTask(slug, t.id, e.target.checked))}
                className="size-4 shrink-0 accent-[var(--color-fmaccent)]"
              />
              <span
                className={`fm-grotesk min-w-0 flex-1 text-sm ${t.done ? "text-fmmuted line-through" : "text-fmfg"}`}
              >
                {t.label}
              </span>
              {t.assignee && (
                <span className="fm-grotesk shrink-0 text-[11px] text-fmmuted">{t.assignee}</span>
              )}
              {t.due_date && (
                <span className="fm-grotesk shrink-0 text-[11px] text-fmmuted">{t.due_date}</span>
              )}
              <button
                type="button"
                onClick={() => start(() => deleteTask(slug, t.id))}
                className="shrink-0 text-xs text-fmmuted transition-colors hover:text-red-400"
                aria-label="Supprimer"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          value={label}
          placeholder="Pièce à produire"
          onChange={(e) => setLabel(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
          className={FIELD}
        />
        <input
          value={who}
          placeholder="qui"
          onChange={(e) => setWho(e.target.value)}
          className={FIELD + " sm:max-w-[9rem]"}
        />
        <input
          type="date"
          value={due}
          onChange={(e) => setDue(e.target.value)}
          className={FIELD + " sm:max-w-[10rem]"}
        />
        <button type="button" className={BTN} disabled={pending || !label.trim()} onClick={submit}>
          Ajouter
        </button>
      </div>
    </div>
  );
}

export function NoteThread({
  slug, opportunityId, notes, me,
}: { slug: string; opportunityId: string; notes: OpportunityNote[]; me: string }) {
  const [body, setBody] = useState("");
  const [pending, start] = useTransition();

  function submit() {
    if (!body.trim()) return;
    start(async () => { await addNote(slug, opportunityId, body); setBody(""); });
  }

  return (
    <div>
      <h2 className="fm-display text-lg text-fmfg">Fil de discussion</h2>
      <div className="mt-3">
        <textarea
          value={body}
          rows={3}
          placeholder="Une question, une info reçue, un arbitrage."
          onChange={(e) => setBody(e.target.value)}
          className={FIELD + " resize-y"}
        />
        <button
          type="button"
          className={BTN + " mt-2"}
          disabled={pending || !body.trim()}
          onClick={submit}
        >
          {pending ? "…" : "Publier"}
        </button>
      </div>

      {notes.length > 0 && (
        <ul className="mt-5 flex flex-col gap-3">
          {notes.map((n) => (
            <li key={n.id} className="rounded-xl border border-fmborder bg-fmmutedbg/40 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="fm-grotesk text-[11px] text-fmaccent">
                  {n.author_email ?? "inconnu"}
                </span>
                <span className="fm-grotesk text-[11px] text-fmmuted">
                  {new Date(n.created_at).toLocaleString("fr-FR", {
                    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                  })}
                </span>
                {n.author_email === me && (
                  <button
                    type="button"
                    onClick={() => start(() => deleteNote(slug, n.id))}
                    className="ml-auto text-xs text-fmmuted transition-colors hover:text-red-400"
                    aria-label="Supprimer"
                  >
                    ×
                  </button>
                )}
              </div>
              <p className="fm-grotesk mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-fmfg/85">
                {n.body}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
