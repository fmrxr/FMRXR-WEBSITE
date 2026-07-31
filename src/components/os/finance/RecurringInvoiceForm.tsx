"use client";

import { useState } from "react";
import { nextDocRef } from "@/lib/os/document";
import type { Currency, InvoiceStatus, OsGraph } from "@/lib/os/types";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

/** Ajoute `n` mois à une date AAAA-MM-JJ (même jour du mois, comme le calendrier BXTR : 27 de chaque mois). */
function addMonths(dateStr: string, n: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(y, m - 1 + n, d);
  return dt.toISOString().slice(0, 10);
}

export interface RecurringBatchInvoice {
  id: string;
  ref: string;
  type: "invoice";
  client: string;
  label: string;
  amount: number;
  currency: Currency;
  issued: string;
  status: InvoiceStatus;
  notes: string;
}

interface RecurringInvoiceFormProps {
  graph: Pick<OsGraph, "clients" | "finance" | "meta">;
  onGenerate: (invoices: RecurringBatchInvoice[]) => void;
  onCancel: () => void;
}

/**
 * Génère une série de factures mensuelles en un coup — le besoin exact de la série BXTR (juillet→
 * décembre, montants variables) qui n'a pu être créée que par script externe + sync manuel la
 * première fois. Un montant par ligne = une facture ; la référence s'auto-incrémente comme le
 * générateur de document classique (nextDocRef), sans dépendre d'un fichier HTML par facture.
 */
export function RecurringInvoiceForm({ graph, onGenerate, onCancel }: RecurringInvoiceFormProps) {
  const clients = graph.clients || [];
  const [clientId, setClientId] = useState(clients[0]?.id || "");
  const [label, setLabel] = useState("");
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState<InvoiceStatus>("sent");
  const [amountsText, setAmountsText] = useState("");

  const amounts = amountsText
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => parseFloat(l.replace(",", ".")))
    .filter((n) => !Number.isNaN(n) && n > 0);

  function buildBatch(): RecurringBatchInvoice[] {
    const client = clients.find((c) => c.id === clientId);
    if (!client || amounts.length === 0 || !label.trim()) return [];

    // Compte courant par année — chaque facture générée dans ce lot doit voir les précédentes du
    // même lot, pas seulement celles déjà dans le graphe (nextDocRef ne connaît que ce dernier).
    const runningCountByYear = new Map<number, number>();
    const out: RecurringBatchInvoice[] = [];

    amounts.forEach((amount, i) => {
      const issued = addMonths(startDate, i);
      const year = Number(issued.slice(0, 4));
      const existingCount = graph.finance.filter((f) => f.client === clientId && (f.issued || "").startsWith(String(year))).length;
      const already = runningCountByYear.get(year) || 0;
      const ref = nextDocRef("invoice", client.name, year, existingCount + already, graph.meta?.seq);
      runningCountByYear.set(year, already + 1);

      out.push({
        id: `fact-${slugify(ref)}`,
        ref,
        type: "invoice",
        client: clientId,
        label: label.trim(),
        amount,
        currency,
        issued,
        status,
        notes: `Facture ${i + 1}/${amounts.length} d'une série récurrente générée depuis FMRXR OS le ${new Date().toLocaleDateString("fr-FR")}.`,
      });
    });
    return out;
  }

  const preview = buildBatch();

  return (
    <div className="fm-glass-card flex flex-col gap-3 rounded-2xl p-4">
      <h3 className="font-grotesk text-xs uppercase tracking-[0.14em] text-fmmuted">Factures récurrentes / par lot</h3>
      <div className="flex flex-wrap items-center gap-2">
        <select
          className="rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
        >
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <input
          className="min-w-[200px] flex-1 rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
          placeholder="Libellé (ex : Retainer Baxter Advisors)"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <select
          className="rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
          value={currency}
          onChange={(e) => setCurrency(e.target.value as Currency)}
        >
          <option value="TND">TND</option>
          <option value="EUR">EUR</option>
        </select>
        <input
          type="date"
          className="rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <select
          className="rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
          value={status}
          onChange={(e) => setStatus(e.target.value as InvoiceStatus)}
        >
          <option value="sent">envoyée</option>
          <option value="draft">brouillon</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">
          Montants — un par ligne, un mois d&apos;écart entre chaque (même jour que la date de départ)
        </label>
        <textarea
          className="w-full rounded border border-fmborder bg-fmmutedbg px-3 py-2 font-mono text-sm text-fmfg"
          rows={6}
          placeholder={"1600\n1000\n2000\n2000\n2000\n2000"}
          value={amountsText}
          onChange={(e) => setAmountsText(e.target.value)}
        />
      </div>

      {preview.length > 0 && (
        <div className="rounded-lg border border-fmborder bg-fmmutedbg/40 p-3">
          <div className="mb-1.5 font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Aperçu — {preview.length} facture{preview.length > 1 ? "s" : ""}</div>
          <div className="flex flex-col gap-1">
            {preview.map((f) => (
              <div key={f.id} className="flex items-center justify-between gap-2 font-mono text-xs text-fmfg">
                <span>{f.ref}</span>
                <span className="text-fmmuted">
                  {f.issued} · {f.amount.toLocaleString("fr-FR")} {f.currency === "EUR" ? "€" : f.currency}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={preview.length === 0}
          onClick={() => onGenerate(preview)}
          className="rounded-lg border border-fmborder px-3 py-1.5 font-grotesk text-sm text-fmfg hover:border-fmaccent/40 disabled:opacity-40"
        >
          Générer {preview.length > 0 ? `${preview.length} facture${preview.length > 1 ? "s" : ""}` : ""}
        </button>
        <button type="button" className="fm-link font-grotesk text-sm text-fmmuted" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </div>
  );
}
