"use client";

import { useState } from "react";
import { useOs } from "@/lib/os/store";
import { financeOverview } from "@/lib/os/compute";
import { parseRefSeq } from "@/lib/os/document";
import type { GeneratedDocument } from "@/components/os/finance/DocumentGeneratorForm";
import { DocumentGeneratorForm } from "@/components/os/finance/DocumentGeneratorForm";
import { FinanceOverviewCards } from "@/components/os/finance/FinanceOverviewCards";
import { InvoiceTable } from "@/components/os/finance/InvoiceTable";
import type { InvoicePatch } from "@/components/os/finance/InvoiceTable";
import { QuoteTable } from "@/components/os/finance/QuoteTable";
import { ExpenseTable } from "@/components/os/finance/ExpenseTable";
import type { ExpenseDraft } from "@/components/os/finance/ExpenseTable";
import { Section } from "@/components/os/Section";
import { genId } from "@/lib/os/id";
import type { InvoiceStatus, OsQuote, QuoteStatus } from "@/lib/os/types";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

type GeneratorState = { kind: "invoice" | "quote"; presetClientId?: string; presetTitle?: string; presetPu?: number } | null;

export default function FinancePage() {
  const { graph, loading, error, mutate, logChange } = useOs();
  const [generator, setGenerator] = useState<GeneratorState>(null);

  if (loading) return <p className="fm-rise font-grotesk text-sm text-fmmuted">Chargement du graphe…</p>;
  if (error && !graph) return <p className="fm-rise font-grotesk text-sm text-[#ff4d5e]">{error}</p>;
  if (!graph) return null;

  const now = new Date();
  const eurTnd = graph.meta?.eur_tnd;
  const overview = financeOverview(graph.finance, graph.expenses || [], now, eurTnd, 75_000);
  const clientName = (id?: string) => (id ? graph.clients?.find((c) => c.id === id)?.name : undefined);

  const invoicesSorted = [...graph.finance].sort((a, b) => (b.issued || "").localeCompare(a.issued || ""));
  const quotesSorted = [...(graph.quotes || [])].sort((a, b) => (b.issued || "").localeCompare(a.issued || ""));
  const expensesSorted = [...(graph.expenses || [])].sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  function setInvoiceStatus(id: string, status: InvoiceStatus) {
    let ref = "";
    let oldStatus: InvoiceStatus | null = null;
    mutate((draft) => {
      const f = draft.finance.find((x) => x.id === id);
      if (!f || f.status === status) return;
      ref = f.ref || f.id;
      oldStatus = f.status;
      f.status = status;
      if (status === "paid" && !f.paid_date) f.paid_date = new Date().toISOString().slice(0, 10);
      if (status !== "paid") delete f.paid_date;
    });
    if (oldStatus) logChange("update", id, `statut facture ${ref} : ${oldStatus} → ${status}`);
  }

  function saveInvoice(id: string, patch: InvoicePatch) {
    let ref = "";
    mutate((draft) => {
      const f = draft.finance.find((x) => x.id === id);
      if (!f) return;
      ref = f.ref || f.id;
      f.amount = patch.amount;
      f.currency = patch.currency;
      if (patch.advance != null) {
        f.advance = patch.advance;
        if (f.status === "sent") f.status = "partial";
      } else delete f.advance;
      if (patch.issued) f.issued = patch.issued;
      if (patch.paid_date) f.paid_date = patch.paid_date;
      else delete f.paid_date;
      if (patch.notes) f.notes = patch.notes;
      else delete f.notes;
    });
    logChange("update", id, `facture modifiée : ${ref}`);
  }

  function deleteInvoice(id: string) {
    const f = graph!.finance.find((x) => x.id === id);
    if (!f) return;
    if (!confirm(`Supprimer la facture ${f.ref} ?`)) return;
    mutate((draft) => {
      draft.trash = draft.trash || [];
      draft.trash.unshift({ ts: new Date().toISOString(), kind: "invoice", data: f });
      draft.finance = draft.finance.filter((x) => x.id !== id);
    });
    logChange("delete", id, `facture supprimée (→ corbeille) : ${f.ref}`);
  }

  function setQuoteStatus(id: string, status: QuoteStatus) {
    let ref = "";
    let oldStatus: QuoteStatus | null = null;
    mutate((draft) => {
      const q = (draft.quotes || []).find((x) => x.id === id);
      if (!q || q.status === status) return;
      ref = q.ref || q.id;
      oldStatus = q.status;
      q.status = status;
    });
    if (oldStatus) logChange("update", id, `statut devis ${ref} : ${oldStatus} → ${status}`);
  }

  function deleteQuote(id: string) {
    const q = (graph!.quotes || []).find((x) => x.id === id);
    if (!q) return;
    if (!confirm(`Supprimer le devis ${q.ref} ?`)) return;
    mutate((draft) => {
      draft.trash = draft.trash || [];
      draft.trash.unshift({ ts: new Date().toISOString(), kind: "quote", data: q });
      draft.quotes = (draft.quotes || []).filter((x) => x.id !== id);
    });
    logChange("delete", id, `devis supprimé (→ corbeille) : ${q.ref}`);
  }

  function convertQuoteToInvoice(q: OsQuote) {
    if (q.status !== "accepted") {
      mutate((draft) => {
        const target = (draft.quotes || []).find((x) => x.id === q.id);
        if (target) target.status = "accepted";
      });
      logChange("update", q.id, `statut devis : → accepté (conversion en facture)`);
    }
    setGenerator({ kind: "invoice", presetClientId: q.client, presetTitle: q.label, presetPu: q.amount });
  }

  function addExpense(draft: ExpenseDraft) {
    const id = genId("exp");
    mutate((g) => {
      g.expenses = g.expenses || [];
      g.expenses.push({ id, ...draft });
    });
    logChange("create", id, `dépense ajoutée : ${draft.label} · ${draft.amount.toLocaleString("fr-FR")} ${draft.currency}`);
  }

  function saveExpense(id: string, patch: ExpenseDraft) {
    mutate((g) => {
      const e = (g.expenses || []).find((x) => x.id === id);
      if (!e) return;
      Object.assign(e, patch);
    });
    logChange("update", id, `dépense modifiée : ${patch.label} · ${patch.amount.toLocaleString("fr-FR")} ${patch.currency}`);
  }

  function deleteExpense(id: string) {
    const e = (graph!.expenses || []).find((x) => x.id === id);
    if (!e) return;
    if (!confirm(`Supprimer la dépense « ${e.label} » ?`)) return;
    mutate((draft) => {
      draft.trash = draft.trash || [];
      draft.trash.unshift({ ts: new Date().toISOString(), kind: "expense", data: e });
      draft.expenses = (draft.expenses || []).filter((x) => x.id !== id);
    });
    logChange("delete", id, `dépense supprimée (→ corbeille) : ${e.label}`);
  }

  function handleGenerated(doc: GeneratedDocument) {
    try {
      const url = URL.createObjectURL(new Blob([doc.html], { type: "text/html" }));
      window.open(url, "_blank");
    } catch {
      // aperçu bloqué (popup) — le document reste généré et accessible via le bouton Enregistrer de sa propre barre d'outils
    }

    const seq = parseRefSeq(doc.ref);
    const label = doc.items[0]?.title + (doc.items.length > 1 ? ` (+${doc.items.length - 1})` : "");

    if (doc.kind === "invoice") {
      const id = `fact-${slugify(doc.ref)}`;
      mutate((draft) => {
        draft.finance.push({
          id,
          type: "invoice",
          ref: doc.ref,
          client: doc.clientId,
          label,
          amount: doc.total,
          currency: doc.currency,
          issued: doc.issued,
          status: doc.advance ? "partial" : "draft",
          ...(doc.advance ? { advance: doc.advance } : {}),
          notes: `Générée depuis FMRXR OS le ${new Date().toLocaleDateString("fr-FR")}`,
        });
        if (seq) {
          draft.meta = draft.meta || {};
          draft.meta.seq = draft.meta.seq || {};
          draft.meta.seq[seq.key] = Math.max(draft.meta.seq[seq.key] || 0, seq.value);
        }
      });
      logChange("create", id, `facture générée : ${doc.ref} · ${label} · ${doc.total.toLocaleString("fr-FR")} ${doc.currency}`);
    } else {
      const id = `quo-${slugify(doc.ref)}`;
      mutate((draft) => {
        draft.quotes = draft.quotes || [];
        draft.quotes.push({
          id,
          ref: doc.ref,
          client: doc.clientId,
          label,
          amount: doc.total,
          currency: doc.currency,
          issued: doc.issued,
          validity: doc.due,
          status: "draft",
          ...(doc.advance ? { advance: doc.advance } : {}),
        });
        if (seq) {
          draft.meta = draft.meta || {};
          draft.meta.seq = draft.meta.seq || {};
          draft.meta.seq[seq.key] = Math.max(draft.meta.seq[seq.key] || 0, seq.value);
        }
      });
      logChange("create", id, `devis généré : ${doc.ref} · ${label} · ${doc.total.toLocaleString("fr-FR")} ${doc.currency}`);
    }
    setGenerator(null);
  }

  return (
    <div className="fm-rise flex flex-col gap-6">
      {generator ? (
        <DocumentGeneratorForm
          kind={generator.kind}
          graph={graph}
          presetClientId={generator.presetClientId}
          presetTitle={generator.presetTitle}
          presetPu={generator.presetPu}
          onGenerated={handleGenerated}
          onCancel={() => setGenerator(null)}
        />
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setGenerator({ kind: "invoice" })}
            className="rounded-lg border border-fmborder px-3 py-1.5 font-grotesk text-sm text-fmfg hover:border-fmaccent/40"
          >
            + Générer une facture
          </button>
          <button
            type="button"
            onClick={() => setGenerator({ kind: "quote" })}
            className="rounded-lg border border-fmborder px-3 py-1.5 font-grotesk text-sm text-fmmuted hover:border-fmaccent/40"
          >
            + Générer un devis
          </button>
        </div>
      )}

      <FinanceOverviewCards overview={overview} now={now} />

      <Section id="finance-invoices" title={`Factures — ${invoicesSorted.length}`}>
        <InvoiceTable invoices={invoicesSorted} clientName={clientName} onStatusChange={setInvoiceStatus} onSave={saveInvoice} onDelete={deleteInvoice} />
      </Section>

      <Section id="finance-quotes" title={`Devis — ${quotesSorted.length}`}>
        <QuoteTable quotes={quotesSorted} clientName={clientName} onStatusChange={setQuoteStatus} onConvert={convertQuoteToInvoice} onDelete={deleteQuote} />
      </Section>

      <Section id="finance-expenses" title={`Dépenses — ${expensesSorted.length}`}>
        <ExpenseTable expenses={expensesSorted} projects={graph.projects} onAdd={addExpense} onSave={saveExpense} onDelete={deleteExpense} />
      </Section>
    </div>
  );
}
