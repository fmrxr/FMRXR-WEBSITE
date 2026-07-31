"use client";

import { useState } from "react";
import { useOs } from "@/lib/os/store";
import { financeOverview } from "@/lib/os/compute";
import { parseRefSeq } from "@/lib/os/document";
import type { GeneratedDocument } from "@/components/os/finance/DocumentGeneratorForm";
import { DocumentGeneratorForm } from "@/components/os/finance/DocumentGeneratorForm";
import { RecurringInvoiceForm } from "@/components/os/finance/RecurringInvoiceForm";
import type { RecurringBatchInvoice } from "@/components/os/finance/RecurringInvoiceForm";
import { FinanceOverviewCards } from "@/components/os/finance/FinanceOverviewCards";
import { FinanceForecast } from "@/components/os/finance/FinanceForecast";
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
  const [showRecurring, setShowRecurring] = useState(false);
  const [clientFilter, setClientFilter] = useState("");
  const [query, setQuery] = useState("");

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

  // Filtre client + recherche libre, partagés par les 3 tableaux — les dépenses n'ayant pas de
  // champ client, seul le texte s'y applique.
  const q = query.trim().toLowerCase();
  const hits = (...vals: (string | undefined)[]) => !q || vals.some((v) => (v || "").toLowerCase().includes(q));
  const invoicesFiltered = invoicesSorted.filter((f) => (!clientFilter || f.client === clientFilter) && hits(f.ref, f.label, f.notes));
  const quotesFiltered = quotesSorted.filter((f) => (!clientFilter || f.client === clientFilter) && hits(f.ref, f.label));
  const expensesFiltered = expensesSorted.filter((e) => hits(e.label, e.vendor, e.notes, e.category));

  function setInvoiceStatus(id: string, status: InvoiceStatus) {
    const before = graph!.finance.find((x) => x.id === id);
    if (!before || before.status === status) return;
    mutate((draft) => {
      const f = draft.finance.find((x) => x.id === id);
      if (!f || f.status === status) return;
      f.status = status;
      if (status === "paid" && !f.paid_date) f.paid_date = new Date().toISOString().slice(0, 10);
      if (status !== "paid") delete f.paid_date;
    });
    const after = { ...before, status, ...(status === "paid" && !before.paid_date ? { paid_date: new Date().toISOString().slice(0, 10) } : {}) };
    logChange("update", id, `statut facture ${before.ref || id} : ${before.status} → ${status}`, { entityType: "invoice", snapshot: { before, after } });
  }

  function saveInvoice(id: string, patch: InvoicePatch) {
    const before = graph!.finance.find((x) => x.id === id);
    if (!before) return;
    mutate((draft) => {
      const f = draft.finance.find((x) => x.id === id);
      if (!f) return;
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
    const after = { ...before, amount: patch.amount, currency: patch.currency, advance: patch.advance, issued: patch.issued || before.issued };
    logChange("update", id, `facture modifiée : ${before.ref || id}`, { entityType: "invoice", snapshot: { before, after } });
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
    logChange("delete", id, `facture supprimée (→ corbeille) : ${f.ref}`, { entityType: "invoice", snapshot: f });
  }

  function setQuoteStatus(id: string, status: QuoteStatus) {
    const before = (graph!.quotes || []).find((x) => x.id === id);
    if (!before || before.status === status) return;
    mutate((draft) => {
      const q = (draft.quotes || []).find((x) => x.id === id);
      if (q && q.status !== status) q.status = status;
    });
    logChange("update", id, `statut devis ${before.ref || id} : ${before.status} → ${status}`, {
      entityType: "quote",
      snapshot: { before, after: { ...before, status } },
    });
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
    logChange("delete", id, `devis supprimé (→ corbeille) : ${q.ref}`, { entityType: "quote", snapshot: q });
  }

  function convertQuoteToInvoice(q: OsQuote) {
    if (q.status !== "accepted") {
      mutate((draft) => {
        const target = (draft.quotes || []).find((x) => x.id === q.id);
        if (target) target.status = "accepted";
      });
      logChange("update", q.id, `statut devis : → accepté (conversion en facture)`, {
        entityType: "quote",
        snapshot: { before: q, after: { ...q, status: "accepted" } },
      });
    }
    setGenerator({ kind: "invoice", presetClientId: q.client, presetTitle: q.label, presetPu: q.amount });
  }

  function addExpense(draft: ExpenseDraft) {
    const id = genId("exp");
    const created = { id, ...draft };
    mutate((g) => {
      g.expenses = g.expenses || [];
      g.expenses.push(created);
    });
    logChange("create", id, `dépense ajoutée : ${draft.label} · ${draft.amount.toLocaleString("fr-FR")} ${draft.currency}`, {
      entityType: "expense",
      snapshot: created,
    });
  }

  function saveExpense(id: string, patch: ExpenseDraft) {
    const before = (graph!.expenses || []).find((x) => x.id === id);
    if (!before) return;
    mutate((g) => {
      const e = (g.expenses || []).find((x) => x.id === id);
      if (e) Object.assign(e, patch);
    });
    logChange("update", id, `dépense modifiée : ${patch.label} · ${patch.amount.toLocaleString("fr-FR")} ${patch.currency}`, {
      entityType: "expense",
      snapshot: { before, after: { ...before, ...patch } },
    });
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
    logChange("delete", id, `dépense supprimée (→ corbeille) : ${e.label}`, { entityType: "expense", snapshot: e });
  }

  function handleGenerateRecurring(invoices: RecurringBatchInvoice[]) {
    if (invoices.length === 0) return;
    mutate((draft) => {
      invoices.forEach((inv) => {
        draft.finance.push(inv);
        const seq = parseRefSeq(inv.ref);
        if (seq) {
          draft.meta = draft.meta || {};
          draft.meta.seq = draft.meta.seq || {};
          draft.meta.seq[seq.key] = Math.max(draft.meta.seq[seq.key] || 0, seq.value);
        }
      });
    });
    invoices.forEach((inv) => {
      logChange("create", inv.id, `facture générée (série) : ${inv.ref} · ${inv.label} · ${inv.amount.toLocaleString("fr-FR")} ${inv.currency}`, {
        entityType: "invoice",
        snapshot: inv,
      });
    });
    setShowRecurring(false);
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
      const created = {
        id,
        type: "invoice" as const,
        ref: doc.ref,
        client: doc.clientId,
        label,
        amount: doc.total,
        currency: doc.currency,
        issued: doc.issued,
        status: doc.advance ? ("partial" as const) : ("draft" as const),
        ...(doc.advance ? { advance: doc.advance } : {}),
        notes: `Générée depuis FMRXR OS le ${new Date().toLocaleDateString("fr-FR")}`,
      };
      mutate((draft) => {
        draft.finance.push(created);
        if (seq) {
          draft.meta = draft.meta || {};
          draft.meta.seq = draft.meta.seq || {};
          draft.meta.seq[seq.key] = Math.max(draft.meta.seq[seq.key] || 0, seq.value);
        }
      });
      logChange("create", id, `facture générée : ${doc.ref} · ${label} · ${doc.total.toLocaleString("fr-FR")} ${doc.currency}`, {
        entityType: "invoice",
        snapshot: created,
      });
    } else {
      const id = `quo-${slugify(doc.ref)}`;
      const created = {
        id,
        ref: doc.ref,
        client: doc.clientId,
        label,
        amount: doc.total,
        currency: doc.currency,
        issued: doc.issued,
        validity: doc.due,
        status: "draft" as const,
        ...(doc.advance ? { advance: doc.advance } : {}),
      };
      mutate((draft) => {
        draft.quotes = draft.quotes || [];
        draft.quotes.push(created);
        if (seq) {
          draft.meta = draft.meta || {};
          draft.meta.seq = draft.meta.seq || {};
          draft.meta.seq[seq.key] = Math.max(draft.meta.seq[seq.key] || 0, seq.value);
        }
      });
      logChange("create", id, `devis généré : ${doc.ref} · ${label} · ${doc.total.toLocaleString("fr-FR")} ${doc.currency}`, {
        entityType: "quote",
        snapshot: created,
      });
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
      ) : showRecurring ? (
        <RecurringInvoiceForm graph={graph} onGenerate={handleGenerateRecurring} onCancel={() => setShowRecurring(false)} />
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
          <button
            type="button"
            onClick={() => setShowRecurring(true)}
            className="rounded-lg border border-fmborder px-3 py-1.5 font-grotesk text-sm text-fmmuted hover:border-fmaccent/40"
          >
            + Factures récurrentes
          </button>
        </div>
      )}

      <FinanceOverviewCards overview={overview} now={now} />

      <Section id="finance-forecast" title="Prévisions">
        <FinanceForecast graph={graph} now={now} />
      </Section>

      <div className="flex flex-wrap items-center gap-2">
        <input
          className="min-w-[200px] flex-1 rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
          placeholder="Rechercher — réf., libellé, notes, fournisseur…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
          value={clientFilter}
          onChange={(e) => setClientFilter(e.target.value)}
        >
          <option value="">— tous les clients —</option>
          {(graph.clients || []).map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {(query || clientFilter) && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setClientFilter("");
            }}
            className="fm-link font-grotesk text-xs text-fmmuted"
          >
            Réinitialiser
          </button>
        )}
      </div>

      <Section id="finance-invoices" title={`Factures — ${invoicesFiltered.length}${invoicesFiltered.length !== invoicesSorted.length ? ` / ${invoicesSorted.length}` : ""}`}>
        <InvoiceTable invoices={invoicesFiltered} clientName={clientName} onStatusChange={setInvoiceStatus} onSave={saveInvoice} onDelete={deleteInvoice} />
      </Section>

      <Section id="finance-quotes" title={`Devis — ${quotesFiltered.length}${quotesFiltered.length !== quotesSorted.length ? ` / ${quotesSorted.length}` : ""}`}>
        <QuoteTable quotes={quotesFiltered} clientName={clientName} onStatusChange={setQuoteStatus} onConvert={convertQuoteToInvoice} onDelete={deleteQuote} />
      </Section>

      <Section id="finance-expenses" title={`Dépenses — ${expensesFiltered.length}${expensesFiltered.length !== expensesSorted.length ? ` / ${expensesSorted.length}` : ""}`}>
        <ExpenseTable expenses={expensesFiltered} projects={graph.projects} onAdd={addExpense} onSave={saveExpense} onDelete={deleteExpense} />
      </Section>
    </div>
  );
}
