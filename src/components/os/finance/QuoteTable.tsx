import { Card } from "../Card";
import type { OsQuote, QuoteStatus } from "@/lib/os/types";

const STATUS_LABELS: Record<QuoteStatus, string> = {
  draft: "brouillon",
  sent: "envoyé",
  accepted: "accepté",
  rejected: "refusé",
  expired: "expiré",
};

interface QuoteTableProps {
  quotes: OsQuote[];
  clientName: (id?: string) => string | undefined;
  onStatusChange: (id: string, status: QuoteStatus) => void;
  onConvert: (quote: OsQuote) => void;
  onDelete: (id: string) => void;
}

/** Liste devis — statut, conversion en facture (pré-remplit le générateur) et suppression natifs. */
export function QuoteTable({ quotes, clientName, onStatusChange, onConvert, onDelete }: QuoteTableProps) {
  return (
    <Card>
      {quotes.length === 0 && <p className="font-grotesk text-sm text-fmmuted">Aucun devis.</p>}
      {quotes.map((q) => (
        <div key={q.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-fmborder py-2.5 last:border-0">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-fmmuted">
              {q.ref}
              {clientName(q.client) && <span className="text-fmfg">· {clientName(q.client)}</span>}
            </div>
            <div className="mt-0.5 font-mono text-[10.5px] text-fmmuted">{q.issued}</div>
          </div>
          <span className="font-mono text-sm text-fmfg">
            {q.amount.toLocaleString("fr-FR")} {q.currency === "EUR" ? "€" : q.currency}
          </span>
          <select
            value={q.status}
            onChange={(e) => onStatusChange(q.id, e.target.value as QuoteStatus)}
            className="rounded border border-fmborder bg-fmmutedbg px-2 py-1 font-grotesk text-xs text-fmfg"
          >
            {Object.entries(STATUS_LABELS).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
          <button type="button" onClick={() => onConvert(q)} className="fm-link font-grotesk text-xs text-fmaccent" title="Convertir en facture">
            → facture
          </button>
          <button type="button" onClick={() => onDelete(q.id)} className="px-1 text-fmmuted hover:text-[#ff4d5e]" title="Supprimer">
            ✕
          </button>
        </div>
      ))}
    </Card>
  );
}
