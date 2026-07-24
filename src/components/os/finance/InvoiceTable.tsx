"use client";

import { useState } from "react";
import { Card } from "../Card";
import { restOf } from "@/lib/os/compute";
import type { Currency, InvoiceStatus, OsInvoice } from "@/lib/os/types";

const STATUS_LABELS: Record<InvoiceStatus, string> = {
  draft: "brouillon",
  sent: "envoyée",
  partial: "acompte reçu",
  paid: "payée",
  late: "en retard",
  disputed: "contestée",
};

export interface InvoicePatch {
  amount: number | null;
  advance?: number;
  currency: Currency;
  issued?: string;
  paid_date?: string;
  notes?: string;
}

interface InvoiceRowProps {
  invoice: OsInvoice;
  clientName?: string;
  onStatusChange: (id: string, status: InvoiceStatus) => void;
  onSave: (id: string, patch: InvoicePatch) => void;
  onDelete: (id: string) => void;
}

function InvoiceRow({ invoice: f, clientName, onStatusChange, onSave, onDelete }: InvoiceRowProps) {
  const [editing, setEditing] = useState(false);
  const [amount, setAmount] = useState(f.amount != null ? String(f.amount) : "");
  const [advance, setAdvance] = useState(f.advance != null ? String(f.advance) : "");
  const [currency, setCurrency] = useState<Currency>(f.currency);
  const [issued, setIssued] = useState(f.issued || "");
  const [paidDate, setPaidDate] = useState(f.paid_date || "");
  const [notes, setNotes] = useState(f.notes || "");

  function submit() {
    onSave(f.id, {
      amount: amount === "" ? null : parseFloat(amount),
      advance: advance === "" ? undefined : parseFloat(advance),
      currency,
      issued: issued || undefined,
      paid_date: paidDate || undefined,
      notes: notes || undefined,
    });
    setEditing(false);
  }

  return (
    <div className="border-b border-fmborder py-3 last:border-0">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-fmmuted">
            {f.ref}
            {clientName && <span className="text-fmfg">· {clientName}</span>}
          </div>
          <div className="mt-0.5 font-grotesk text-sm text-fmfg">{f.label}</div>
          <div className="mt-0.5 font-mono text-[10.5px] text-fmmuted">{f.issued}</div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="text-right font-mono text-sm">
            {f.amount == null ? (
              <span className="text-[#d9a441]">à compléter</span>
            ) : (
              <>
                <span className="text-fmfg">
                  {f.amount.toLocaleString("fr-FR")} {f.currency === "EUR" ? "€" : f.currency}
                </span>
                {f.advance ? (
                  <div className="text-[10px] text-fmmuted">
                    avance {f.advance.toLocaleString("fr-FR")} · reste {restOf(f).toLocaleString("fr-FR")}
                  </div>
                ) : null}
              </>
            )}
          </div>
          <select
            value={f.status}
            onChange={(e) => onStatusChange(f.id, e.target.value as InvoiceStatus)}
            className="rounded border border-fmborder bg-fmmutedbg px-2 py-1 font-grotesk text-xs text-fmfg"
          >
            {Object.entries(STATUS_LABELS).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
          <button type="button" onClick={() => setEditing((e) => !e)} className="px-1 text-fmmuted hover:text-fmaccent" title="Modifier">
            ✎
          </button>
          <button type="button" onClick={() => onDelete(f.id)} className="px-1 text-fmmuted hover:text-[#ff4d5e]" title="Supprimer">
            ✕
          </button>
        </div>
      </div>
      {editing && (
        <div className="mt-3 flex flex-wrap items-center gap-2 rounded-xl border border-fmborder bg-fmmutedbg/40 p-3">
          <input
            className="w-28 rounded border border-fmborder bg-fmmutedbg px-2 py-1 font-grotesk text-xs text-fmfg"
            placeholder="Montant"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            className="w-28 rounded border border-fmborder bg-fmmutedbg px-2 py-1 font-grotesk text-xs text-fmfg"
            placeholder="Avance"
            type="number"
            value={advance}
            onChange={(e) => setAdvance(e.target.value)}
          />
          <select
            className="rounded border border-fmborder bg-fmmutedbg px-2 py-1 font-grotesk text-xs text-fmfg"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
          >
            <option value="TND">TND</option>
            <option value="EUR">EUR</option>
          </select>
          <input
            className="w-32 rounded border border-fmborder bg-fmmutedbg px-2 py-1 font-grotesk text-xs text-fmfg"
            placeholder="Émise AAAA-MM-JJ"
            value={issued}
            onChange={(e) => setIssued(e.target.value)}
          />
          <input
            className="w-32 rounded border border-fmborder bg-fmmutedbg px-2 py-1 font-grotesk text-xs text-fmfg"
            placeholder="Payée le (si payée)"
            value={paidDate}
            onChange={(e) => setPaidDate(e.target.value)}
          />
          <input
            className="min-w-[160px] flex-1 rounded border border-fmborder bg-fmmutedbg px-2 py-1 font-grotesk text-xs text-fmfg"
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <button type="button" className="fm-link font-grotesk text-xs text-fmaccent" onClick={submit}>
            Sauvegarder
          </button>
          <button type="button" className="fm-link font-grotesk text-xs text-fmmuted" onClick={() => setEditing(false)}>
            Annuler
          </button>
        </div>
      )}
    </div>
  );
}

interface InvoiceTableProps {
  invoices: OsInvoice[];
  clientName: (id?: string) => string | undefined;
  onStatusChange: (id: string, status: InvoiceStatus) => void;
  onSave: (id: string, patch: InvoicePatch) => void;
  onDelete: (id: string) => void;
}

/** Liste factures — porte le tableau de RENDER.finance (sans le générateur de documents). */
export function InvoiceTable({ invoices, clientName, onStatusChange, onSave, onDelete }: InvoiceTableProps) {
  return (
    <Card>
      {invoices.length === 0 && <p className="font-grotesk text-sm text-fmmuted">Aucune facture.</p>}
      {invoices.map((f) => (
        <InvoiceRow key={f.id} invoice={f} clientName={clientName(f.client)} onStatusChange={onStatusChange} onSave={onSave} onDelete={onDelete} />
      ))}
    </Card>
  );
}
