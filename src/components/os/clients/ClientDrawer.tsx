"use client";

import Link from "next/link";
import { clientOverview } from "@/lib/os/compute";
import { STATUS_LABELS as INVOICE_STATUS_LABELS } from "../finance/InvoiceTable";
import { STATUS_LABELS as QUOTE_STATUS_LABELS } from "../finance/QuoteTable";
import type { OsClient, OsGraph } from "@/lib/os/types";

function Field({ label, value }: { label: string; value?: React.ReactNode }) {
  if (value == null || value === "") return null;
  return (
    <div>
      <div className="font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">{label}</div>
      <div className="mt-0.5 font-grotesk text-sm text-fmfg">{value}</div>
    </div>
  );
}

interface ClientDrawerProps {
  client: OsClient | null;
  graph: Pick<OsGraph, "finance" | "quotes" | "projects" | "meta">;
  onClose: () => void;
}

/**
 * Fiche client native — remplace la dépendance à /os/legacy#crm (qui 500 en production, la route
 * pont lisant un fichier sur le disque local). Porte le bloc "Client 360" de openEnt() du monolithe.
 */
export function ClientDrawer({ client: c, graph, onClose }: ClientDrawerProps) {
  if (!c) return null;

  const overview = clientOverview(c.id, graph.finance, graph.quotes || [], graph.meta?.eur_tnd);
  const projects = graph.projects.filter((p) => p.client === c.id);
  const docs = [
    ...graph.finance.filter((f) => f.client === c.id).map((f) => ({ ...f, kind: "invoice" as const })),
    ...(graph.quotes || []).filter((q) => q.client === c.id).map((q) => ({ ...q, kind: "quote" as const })),
  ].sort((a, b) => (b.issued || "").localeCompare(a.issued || ""));

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/60" onClick={onClose} aria-hidden="true" />
      <aside className="fm-glass-card fixed inset-y-0 right-0 z-50 flex w-96 max-w-[90vw] flex-col gap-3 overflow-y-auto rounded-none border-y-0 border-r-0 p-5">
        <div className="flex items-start justify-between gap-2">
          <span className="font-grotesk text-[10px] uppercase tracking-[0.14em] text-fmmuted">{c.segment || "Client"}</span>
          <button type="button" onClick={onClose} aria-label="Fermer" className="text-fmmuted hover:text-fmfg">
            ✕
          </button>
        </div>
        <h2 className="font-display text-lg text-fmfg">{c.name}</h2>

        <div className="flex flex-col gap-3">
          <Field label="Email" value={c.email && <a href={`mailto:${c.email}`} className="fm-link text-fmaccent">{c.email}</a>} />
          <Field label="Téléphone" value={c.phone && <a href={`tel:${c.phone}`} className="fm-link text-fmaccent">{c.phone}</a>} />
          <Field label="Web" value={c.web && <a href={c.web} target="_blank" rel="noreferrer" className="fm-link text-fmaccent">{c.web} ↗</a>} />
        </div>

        {(overview.invoiceCount > 0 || overview.quoteCount > 0) && (
          <div className="rounded-lg border border-fmborder bg-fmmutedbg/60 p-3">
            <div className="font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Client 360 — consolidé TND</div>
            <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs">
              <span className="text-fmfg">facturé {overview.factureTND.toLocaleString("fr-FR")}</span>
              <span className="text-fmaccent">encaissé {overview.encaisseTND.toLocaleString("fr-FR")}</span>
              {overview.enAttenteTND > 0 && <span className="text-[#d9a441]">en attente {overview.enAttenteTND.toLocaleString("fr-FR")}</span>}
            </div>
            <div className="mt-1 font-grotesk text-[10.5px] text-fmmuted">
              {overview.invoiceCount} facture{overview.invoiceCount > 1 ? "s" : ""} · {overview.quoteCount} devis
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <h3 className="mb-2 font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Projets liés</h3>
            <div className="flex flex-wrap gap-1.5">
              {projects.map((p) => (
                <Link key={p.id} href="/os/projets" className="rounded-full border border-fmborder px-2.5 py-1 font-grotesk text-xs text-fmfg hover:border-fmaccent/40">
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {docs.length > 0 && (
          <div>
            <h3 className="mb-2 font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Historique facturation — {docs.length}</h3>
            <div className="flex flex-col gap-2">
              {docs.map((d) => {
                const label = d.kind === "quote" ? QUOTE_STATUS_LABELS[d.status] : INVOICE_STATUS_LABELS[d.status];
                return (
                  <Link
                    key={d.id}
                    href="/os/finance"
                    className="flex items-baseline justify-between gap-2 font-grotesk text-xs text-fmfg hover:text-fmaccent"
                  >
                    <span className="truncate">{d.ref || d.id}</span>
                    <span className="shrink-0 font-mono text-[10.5px] text-fmmuted">
                      {d.issued}
                      {d.amount != null ? ` · ${d.amount.toLocaleString("fr-FR")} ${d.currency === "EUR" ? "€" : d.currency}` : ""} · {label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <Field label="Notes" value={c.notes} />
      </aside>
    </>
  );
}
