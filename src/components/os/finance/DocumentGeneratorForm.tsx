"use client";

import { useState } from "react";
import { ItemRows } from "./ItemRows";
import { buildDocumentHtml, documentFilename, nextDocRef } from "@/lib/os/document";
import type { DocumentItem } from "@/lib/os/document";
import type { Currency, OsGraph } from "@/lib/os/types";

const DEFAULT_INVOICE_CONDITIONS =
  "Règlement à réception par virement bancaire.\n\nEn cas de retard de paiement, des pénalités de 1,5% par mois seront applicables.";
const DEFAULT_QUOTE_CONDITIONS =
  "Devis valable 30 jours à compter de la date d'émission.\n\nAcompte à la commande, solde à la livraison. Règlement par virement bancaire.";

export interface GeneratedDocument {
  kind: "invoice" | "quote";
  ref: string;
  clientId: string;
  items: DocumentItem[];
  total: number;
  currency: Currency;
  issued: string;
  due: string;
  advance?: number;
  html: string;
  filename: string;
}

interface DocumentGeneratorFormProps {
  kind: "invoice" | "quote";
  graph: Pick<OsGraph, "clients" | "finance" | "quotes" | "meta">;
  presetClientId?: string;
  presetTitle?: string;
  presetPu?: number;
  onGenerated: (doc: GeneratedDocument) => void;
  onCancel: () => void;
}

/** Formulaire facture/devis — porte newInvoice()/newQuote()/createInvoice()/createQuote() du monolithe. */
export function DocumentGeneratorForm({ kind, graph, presetClientId, presetTitle, presetPu, onGenerated, onCancel }: DocumentGeneratorFormProps) {
  const clients = graph.clients || [];
  const [clientId, setClientId] = useState(presetClientId || clients[0]?.id || "");
  const [matriculeFiscal, setMatriculeFiscal] = useState("");
  const [items, setItems] = useState<DocumentItem[]>([{ title: presetTitle || "", desc: "", qty: 1, pu: presetPu ?? 0 }]);
  const [advance, setAdvance] = useState("");
  const [currency, setCurrency] = useState<Currency>("TND");
  const [issued, setIssued] = useState(new Date().toISOString().slice(0, 10));
  const [due, setDue] = useState(kind === "quote" ? "30 jours" : "à réception");
  const [conditions, setConditions] = useState(kind === "quote" ? DEFAULT_QUOTE_CONDITIONS : DEFAULT_INVOICE_CONDITIONS);

  function computeRef(forClientId: string): string {
    const client = clients.find((c) => c.id === forClientId);
    const year = new Date().getFullYear();
    const docs = kind === "quote" ? graph.quotes || [] : graph.finance;
    const existingCount = docs.filter((d) => d.client === forClientId && (d.issued || "").startsWith(String(year))).length;
    return nextDocRef(kind, client?.name || "CLI", year, existingCount, graph.meta?.seq);
  }

  // Référence éditable à la main, mais recalculée dès que le client change — pattern "ajuster un
  // state quand une prop/dérivée change" pendant le rendu (pas dans un effet), comme documenté par
  // React : https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [ref, setRef] = useState(() => computeRef(clientId));
  const [refForClientId, setRefForClientId] = useState(clientId);
  if (clientId !== refForClientId) {
    setRefForClientId(clientId);
    setRef(computeRef(clientId));
  }

  function submit() {
    const client = clients.find((c) => c.id === clientId);
    if (!client) {
      alert("Sélectionne un client.");
      return;
    }
    const validItems = items.filter((it) => it.title.trim() && !Number.isNaN(it.pu));
    if (!validItems.length) {
      alert("Au moins une prestation avec titre et prix unitaire requise.");
      return;
    }
    const total = validItems.reduce((s, it) => s + it.qty * it.pu, 0);
    const advanceNum = advance === "" || parseFloat(advance) === 0 ? undefined : parseFloat(advance);

    const html = buildDocumentHtml({
      kind,
      ref,
      clientName: client.name,
      clientEmail: client.email,
      matriculeFiscal: matriculeFiscal || undefined,
      items: validItems,
      advance: advanceNum,
      currency,
      issued,
      due: due || (kind === "quote" ? "30 jours" : "à réception"),
      conditions,
    });

    onGenerated({
      kind,
      ref,
      clientId,
      items: validItems,
      total,
      currency,
      issued,
      due,
      advance: advanceNum,
      html,
      filename: documentFilename({ kind, ref, clientName: client.name, items: validItems, currency, issued, due, conditions }),
    });
  }

  return (
    <div className="fm-glass-card flex flex-col gap-3 rounded-2xl p-5">
      <h2 className="font-grotesk text-sm font-semibold text-fmfg">{kind === "quote" ? "Générer un devis" : "Générer une facture"}</h2>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Client</label>
          <select
            className="w-full rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          >
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Référence</label>
          <input
            className="w-full rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-mono text-sm text-fmfg"
            value={ref}
            onChange={(e) => setRef(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Matricule fiscal client (optionnel)</label>
        <input
          className="w-full rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
          placeholder="ex : 1389883G"
          value={matriculeFiscal}
          onChange={(e) => setMatriculeFiscal(e.target.value)}
        />
      </div>

      <div>
        <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Prestations</label>
        <ItemRows items={items} onChange={setItems} />
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">
            {kind === "quote" ? "Acompte à la commande (optionnel)" : "Avance reçue (optionnel)"}
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="0"
            className="w-full rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            value={advance}
            onChange={(e) => setAdvance(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Devise</label>
          <select
            className="w-full rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
          >
            <option value="TND">TND</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Date d&apos;émission</label>
          <input
            type="date"
            className="w-full rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            value={issued}
            onChange={(e) => setIssued(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">
            {kind === "quote" ? "Validité" : "Échéance"}
          </label>
          <input
            className="w-full rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            value={due}
            onChange={(e) => setDue(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Conditions</label>
        <textarea
          className="w-full rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
          rows={3}
          value={conditions}
          onChange={(e) => setConditions(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <button type="button" onClick={submit} className="rounded-lg border border-fmaccent/40 px-4 py-1.5 font-grotesk text-sm text-fmaccent hover:bg-fmaccent/10">
          Générer &amp; enregistrer
        </button>
        <button type="button" onClick={onCancel} className="fm-link font-grotesk text-sm text-fmmuted">
          Annuler
        </button>
      </div>
      <p className="font-grotesk text-xs text-fmmuted">
        Génère le fichier HTML au template FMRXR// (barre ✏️ Éditer · 💾 Enregistrer · ⟲ Réinitialiser · ⬇ PDF, auto-save inclus), l&apos;ajoute au
        registre Finance et au journal.
      </p>
    </div>
  );
}
