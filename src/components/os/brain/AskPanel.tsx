"use client";

import { useEffect, useRef, useState } from "react";

interface AskPanelProps {
  onOpenEntity: (id: string) => void;
  /** Question posée depuis l'extérieur (ex: bouton "Expliquer ce nœud" du drawer) — déclenche l'envoi. */
  externalQuestion?: string | null;
  onExternalQuestionHandled?: () => void;
}

/** Panneau de question au Brain (Sprint F3) — appelle /api/os/brain/ask, rend les citations [id] cliquables. */
export function AskPanel({ onOpenEntity, externalQuestion, onExternalQuestionHandled }: AskPanelProps) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [citedEntityIds, setCitedEntityIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const askedExternal = useRef<string | null>(null);

  async function ask(q: string) {
    if (!q.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/os/brain/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "échec de la requête");
      setAnswer(json.answer as string);
      setCitedEntityIds((json.citedEntityIds as string[]) || []);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (externalQuestion && externalQuestion !== askedExternal.current) {
      askedExternal.current = externalQuestion;
      setQuestion(externalQuestion);
      void ask(externalQuestion);
      onExternalQuestionHandled?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalQuestion]);

  // Rend le texte de réponse en éclatant les citations [id] en chips cliquables inline.
  function renderAnswer(text: string) {
    const parts = text.split(/(\[[\w-]+\])/g);
    return parts.map((part, i) => {
      const m = part.match(/^\[([\w-]+)\]$/);
      if (m && citedEntityIds.includes(m[1])) {
        return (
          <button
            key={i}
            type="button"
            onClick={() => onOpenEntity(m[1])}
            className="fm-link mx-0.5 rounded border border-fmaccent/40 px-1 py-0.5 font-mono text-[11px] text-fmaccent"
          >
            {m[1]}
          </button>
        );
      }
      return <span key={i}>{part}</span>;
    });
  }

  return (
    <div className="fm-glass-card flex flex-col gap-2.5 rounded-2xl p-4">
      <form
        className="flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          void ask(question);
        }}
      >
        <input
          className="min-w-[200px] flex-1 rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
          placeholder="Demander au Brain — ex: quels projets utilisent TouchDesigner ?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="rounded-lg border border-fmborder px-3 py-1.5 font-grotesk text-sm text-fmfg hover:border-fmaccent/40 disabled:opacity-40"
        >
          {loading ? "…" : "Demander"}
        </button>
      </form>

      {error && <p className="font-grotesk text-xs text-[#ff4d5e]">{error}</p>}
      {answer && !error && (
        <p className="whitespace-pre-wrap font-grotesk text-sm leading-relaxed text-fmfg">{renderAnswer(answer)}</p>
      )}
    </div>
  );
}
