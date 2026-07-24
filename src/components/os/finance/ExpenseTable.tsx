"use client";

import { useState } from "react";
import { Card } from "../Card";
import type { Currency, OsExpense, OsProject } from "@/lib/os/types";

export const EXPENSE_CATEGORIES = [
  "Matériel & équipement",
  "Logiciels & SaaS",
  "Sous-traitance / freelance",
  "Déplacement & transport",
  "Location / venue",
  "Marketing & pub",
  "Charges sociales & fiscales",
  "Frais bancaires",
  "Autre",
];

export interface ExpenseDraft {
  label: string;
  category: string;
  amount: number;
  currency: Currency;
  date: string;
  project?: string;
  vendor?: string;
  recurring: boolean;
}

function ExpenseForm({
  initial,
  projects,
  onSubmit,
  onCancel,
}: {
  initial?: OsExpense;
  projects: OsProject[];
  onSubmit: (draft: ExpenseDraft) => void;
  onCancel: () => void;
}) {
  const [label, setLabel] = useState(initial?.label || "");
  const [category, setCategory] = useState(initial?.category || EXPENSE_CATEGORIES[0]);
  const [amount, setAmount] = useState(initial?.amount != null ? String(initial.amount) : "");
  const [currency, setCurrency] = useState<Currency>(initial?.currency || "TND");
  const [date, setDate] = useState(initial?.date || new Date().toISOString().slice(0, 10));
  const [project, setProject] = useState(initial?.project || "");
  const [vendor, setVendor] = useState(initial?.vendor || "");
  const [recurring, setRecurring] = useState(!!initial?.recurring);

  function submit() {
    if (!label.trim()) return;
    onSubmit({
      label: label.trim(),
      category,
      amount: amount === "" ? 0 : parseFloat(amount),
      currency,
      date,
      project: project || undefined,
      vendor: vendor.trim() || undefined,
      recurring,
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-fmborder bg-fmmutedbg/40 p-3">
      <input
        className="min-w-[180px] flex-1 rounded border border-fmborder bg-fmmutedbg px-2 py-1 font-grotesk text-xs text-fmfg"
        placeholder="Poste / libellé"
        value={label}
        autoFocus
        onChange={(e) => setLabel(e.target.value)}
      />
      <select
        className="rounded border border-fmborder bg-fmmutedbg px-2 py-1 font-grotesk text-xs text-fmfg"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {EXPENSE_CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <input
        className="w-24 rounded border border-fmborder bg-fmmutedbg px-2 py-1 font-grotesk text-xs text-fmfg"
        placeholder="Montant"
        type="number"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
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
        type="date"
        className="rounded border border-fmborder bg-fmmutedbg px-2 py-1 font-grotesk text-xs text-fmfg"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <select
        className="rounded border border-fmborder bg-fmmutedbg px-2 py-1 font-grotesk text-xs text-fmfg"
        value={project}
        onChange={(e) => setProject(e.target.value)}
      >
        <option value="">— aucun projet —</option>
        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <input
        className="w-32 rounded border border-fmborder bg-fmmutedbg px-2 py-1 font-grotesk text-xs text-fmfg"
        placeholder="Fournisseur"
        value={vendor}
        onChange={(e) => setVendor(e.target.value)}
      />
      <label className="flex items-center gap-1.5 font-grotesk text-xs text-fmmuted">
        <input type="checkbox" checked={recurring} onChange={(e) => setRecurring(e.target.checked)} />
        récurrente
      </label>
      <button type="button" className="fm-link font-grotesk text-xs text-fmaccent" onClick={submit}>
        {initial ? "Sauvegarder" : "Ajouter"}
      </button>
      <button type="button" className="fm-link font-grotesk text-xs text-fmmuted" onClick={onCancel}>
        Annuler
      </button>
    </div>
  );
}

interface ExpenseTableProps {
  expenses: OsExpense[];
  projects: OsProject[];
  onAdd: (draft: ExpenseDraft) => void;
  onSave: (id: string, draft: ExpenseDraft) => void;
  onDelete: (id: string) => void;
}

/** Liste dépenses + formulaire d'ajout/édition — porte la table + expenseForm() de RENDER.finance. */
export function ExpenseTable({ expenses, projects, onAdd, onSave, onDelete }: ExpenseTableProps) {
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {adding ? (
        <ExpenseForm
          projects={projects}
          onSubmit={(draft) => {
            onAdd(draft);
            setAdding(false);
          }}
          onCancel={() => setAdding(false)}
        />
      ) : (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="self-start rounded-lg border border-fmborder px-3 py-1.5 font-grotesk text-sm text-fmfg hover:border-fmaccent/40"
        >
          + Dépense
        </button>
      )}

      <Card>
        {expenses.length === 0 && <p className="font-grotesk text-sm text-fmmuted">Aucune dépense enregistrée.</p>}
        {expenses.map((e) =>
          editingId === e.id ? (
            <div key={e.id} className="border-b border-fmborder py-2.5 last:border-0">
              <ExpenseForm
                initial={e}
                projects={projects}
                onSubmit={(draft) => {
                  onSave(e.id, draft);
                  setEditingId(null);
                }}
                onCancel={() => setEditingId(null)}
              />
            </div>
          ) : (
            <div key={e.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-fmborder py-2.5 last:border-0">
              <div className="min-w-0 flex-1">
                <div className="font-grotesk text-sm text-fmfg">
                  {e.label}
                  {e.recurring && <span className="ml-2 text-[10px] uppercase text-fmmuted">récurrent</span>}
                </div>
                <div className="mt-0.5 font-mono text-[10.5px] text-fmmuted">
                  {e.date} · {e.category}
                  {e.project ? ` · ${projects.find((p) => p.id === e.project)?.name ?? e.project}` : ""}
                </div>
              </div>
              <span className="font-mono text-sm text-[#ff4d5e]">
                {(e.amount || 0).toLocaleString("fr-FR")} {e.currency === "EUR" ? "€" : e.currency}
              </span>
              <button type="button" onClick={() => setEditingId(e.id)} className="px-1 text-fmmuted hover:text-fmaccent" title="Modifier">
                ✎
              </button>
              <button type="button" onClick={() => onDelete(e.id)} className="px-1 text-fmmuted hover:text-[#ff4d5e]" title="Supprimer">
                ✕
              </button>
            </div>
          ),
        )}
      </Card>
    </div>
  );
}
