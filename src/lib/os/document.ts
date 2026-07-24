// FMRXR OS — générateur de documents (facture/devis), porté de invoiceHTML()/newInvoice()/
// newQuote() du monolithe. Le document généré est un fichier HTML autonome — barre d'outils
// interactive standard FMRXR (✏️ Éditer · 💾 Enregistrer · ⟲ Réinitialiser · ⬇ PDF) + auto-save
// localStorage, comme documenté dans CLAUDE.md (porté du modèle FMRXR_Document_Reunion_NeoPhi).

import type { Currency } from "./types";

export const SELLER = {
  name: "FMRXR Studio",
  person: "Haïfa Al Jamila BECHEIKH",
  title: "Directrice Créative",
  mf: "1912365J",
  city: "Tunis, Tunisie",
  email: "fmrxr.studio@gmail.com",
  phone: "+216 56 930 469",
  web: "fmrxr-studio.webflow.io",
  bank: {
    holder: "Haïfa Al Jamila BECHEIKH",
    bank: "AMEN BANK — Agence Gammarth",
    rib: "07 052 0110105529216 58",
    iban: "TN 59 07 052 0110105529216 58 TND",
    swift: "CFCTTNTTXXX",
  },
};

export const LEGAL =
  "Cette facture relève du régime de l'auto-entrepreneur et n'est donc pas soumise à la TVA ni au timbre fiscal. Aucune retenue à la source n'est appliquée, conformément à l'article 7 du décret-loi n°33 du 10 juin 2020.";

export interface DocumentItem {
  title: string;
  desc?: string;
  qty: number;
  pu: number;
}

export interface DocumentInput {
  kind: "invoice" | "quote";
  ref: string;
  clientName: string;
  clientEmail?: string;
  matriculeFiscal?: string;
  items: DocumentItem[];
  advance?: number | null;
  currency: Currency;
  issued: string;
  due: string;
  conditions: string;
}

/** Code client (lettres uniquement, 4 max, majuscules) — porte le calcul de `nextRef()`. */
function clientCode(clientName: string): string {
  const code = (clientName || "CLI").replace(/[^A-Za-z]/g, "").slice(0, 4).toUpperCase();
  return code || "CLI";
}

/** Préfixe de séquence (sert de clé dans meta.seq) — ex. "FMRXR-RAWD-2026-" ou "FMRXR-DEV-RAWD-2026-". */
export function docSeqPrefix(kind: "invoice" | "quote", clientName: string, year: number): string {
  const code = clientCode(clientName);
  return kind === "quote" ? `FMRXR-DEV-${code}-${year}-` : `FMRXR-${code}-${year}-`;
}

/**
 * Prochaine référence séquentielle — porte nextRef()/nextQuoteRef() + seqNext(). `existingCount`
 * = nombre de documents déjà émis pour ce client cette année (fallback si meta.seq n'a pas suivi).
 */
export function nextDocRef(
  kind: "invoice" | "quote",
  clientName: string,
  year: number,
  existingCount: number,
  storedSeq: Record<string, number> | undefined,
): string {
  const prefix = docSeqPrefix(kind, clientName, year);
  const stored = storedSeq?.[prefix] || 0;
  const n = Math.max(stored, existingCount) + 1;
  return `${prefix}${String(n).padStart(2, "0")}`;
}

/** Extrait {clé, valeur} d'une référence pour mettre à jour meta.seq — porte seqStore(). */
export function parseRefSeq(ref: string): { key: string; value: number } | null {
  const m = ref.match(/^(.*?)(\d+)$/);
  if (!m) return null;
  return { key: m[1], value: parseInt(m[2], 10) };
}

export function itemsTotal(items: DocumentItem[]): number {
  return items.reduce((s, it) => s + it.qty * it.pu, 0);
}

function esc(s: string | undefined | null): string {
  if (s == null) return "";
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function money(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function frDate(d: string): string {
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export function documentFilename(input: DocumentInput): string {
  const kindLabel = input.kind === "quote" ? "Devis" : "Facture";
  return `FMRXR_${kindLabel}_${input.ref.replace(/[^A-Za-z0-9-]/g, "_")}.html`;
}

/** Génère le document HTML autonome (branded, barre d'outils interactive incluse). */
export function buildDocumentHtml(input: DocumentInput): string {
  const docLabel = input.kind === "quote" ? "Devis" : "Facture";
  const isDevis = input.kind === "quote";
  const cur = input.currency === "EUR" ? "EUR" : "TND";
  const total = itemsTotal(input.items);
  const advance = input.advance || 0;
  const storageKey = `fmrxr-doc-${input.ref.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const fname = documentFilename(input);

  const itemsRows = input.items
    .map(
      (it) => `<tr><td><div class="item-title">${esc(it.title)}</div><div class="item-desc">${String(it.desc || "")
        .split("\n")
        .filter(Boolean)
        .map(esc)
        .join("<br>")}</div></td>
   <td style="text-align:center;padding-top:22px">${it.qty}</td><td style="text-align:right;padding-right:32px;padding-top:22px">${money(it.pu)}</td><td style="padding-top:22px">${money(it.qty * it.pu)}</td></tr>`,
    )
    .join("");

  const totalsBlock =
    advance && !isDevis
      ? `<div class="row"><span>Total TTC</span><span>${money(total)} ${cur}</span></div>
   <div class="row"><span>Avance reçue</span><span>− ${money(advance)} ${cur}</span></div>
   <div class="row-total"><span class="label">Reste à payer</span><span class="amount">${money(total - advance)} ${cur}</span></div>`
      : `<div class="row-total"><span class="label">Total TTC</span><span class="amount">${money(total)} ${cur}</span></div>${
          advance && isDevis ? `<div class="row" style="border-bottom:none"><span>Acompte à la commande</span><span>${money(advance)} ${cur}</span></div>` : ""
        }`;

  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${docLabel} ${esc(input.ref)}</title><style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter','Helvetica Neue',Helvetica,Arial,sans-serif;background:#0a0a0a;color:#0a0a0a;font-size:13px;line-height:1.5}
.page{max-width:820px;margin:40px auto;background:#fff}.topbar{background:#0a0a0a;padding:20px 56px;display:flex;justify-content:space-between;align-items:center}
.logo-mark{font-size:18px;font-weight:700;letter-spacing:.12em;color:#fff;text-transform:uppercase}.logo-mark span{font-weight:200}
.doc-label{font-size:9px;letter-spacing:.3em;text-transform:uppercase;color:#555}.body{padding:52px 56px 56px}
.meta-row{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:48px;padding-bottom:36px;border-bottom:1px solid #e0e0e0}
.meta-col h3,.ref-block h3{font-size:8.5px;letter-spacing:.25em;text-transform:uppercase;color:#aaa;margin-bottom:10px;font-weight:500}
.meta-col p{font-size:13px;color:#111;line-height:1.8}.meta-col p strong{font-weight:600}
.ref-block{text-align:right}.ref-num{font-size:13px;font-weight:600;letter-spacing:.08em;color:#111}.ref-date{font-size:11px;color:#aaa;margin-top:4px;letter-spacing:.06em}
.invoice-table{width:100%;border-collapse:collapse}.invoice-table thead tr{border-bottom:2px solid #0a0a0a}
.invoice-table thead th{padding:10px 0;text-align:left;font-size:8.5px;letter-spacing:.22em;text-transform:uppercase;font-weight:600;color:#aaa}
.invoice-table thead th:last-child{text-align:right}.invoice-table tbody tr{border-bottom:1px solid #f0f0f0}
.invoice-table tbody td{padding:22px 0;vertical-align:top;font-size:13px;color:#111}
.invoice-table tbody td:last-child{text-align:right;font-weight:600;white-space:nowrap;font-size:14px}
.item-title{font-weight:600;font-size:14px;margin-bottom:6px;color:#0a0a0a}.item-desc{font-size:11.5px;color:#888;line-height:1.7;font-weight:400}
.totals-section{display:flex;justify-content:flex-end}.totals-inner{width:300px}
.totals-inner .row{display:flex;justify-content:space-between;padding:8px 0;font-size:12px;color:#888;border-bottom:1px solid #f0f0f0}
.row-total{display:flex;justify-content:space-between;align-items:center;background:#0a0a0a;color:#fff;padding:16px 20px;margin-top:2px}
.row-total .label{font-size:9px;letter-spacing:.22em;text-transform:uppercase;font-weight:500}.row-total .amount{font-size:18px;font-weight:700;letter-spacing:.02em}
.divider{height:1px;background:#f0f0f0;margin:48px 0}.bank-section{display:grid;grid-template-columns:1fr 1fr;gap:48px;margin-bottom:48px}
.bank-block h4,.conditions-block h4,.sig-block h4{font-size:8.5px;letter-spacing:.25em;text-transform:uppercase;color:#aaa;margin-bottom:14px;font-weight:500}
.bank-block table{border-collapse:collapse;width:100%}.bank-block td{padding:4px 0;font-size:12px;vertical-align:top;line-height:1.6}
.bank-block td:first-child{width:90px;color:#aaa;font-size:10.5px;letter-spacing:.06em}.bank-block td:last-child{color:#111;font-weight:500}
.conditions-block p{font-size:11.5px;color:#888;line-height:1.8}
.sig-section{display:grid;grid-template-columns:1fr 1fr;gap:48px;padding-top:36px;border-top:1px solid #f0f0f0}
.sig-block p{font-size:12px;color:#555;line-height:1.8}.sig-line{margin-top:40px;border-top:1px solid #ddd;padding-top:8px;font-size:9px;color:#ccc;letter-spacing:.15em;text-transform:uppercase}
.bottombar{background:#0a0a0a;padding:16px 56px;display:flex;justify-content:space-between;align-items:center;margin-top:56px}
.bottombar .bl{font-size:10px;font-weight:700;letter-spacing:.14em;color:#333;text-transform:uppercase}.bottombar .bl span{font-weight:200}
.bottombar .br{font-size:10px;color:#444;text-align:right;line-height:1.8;letter-spacing:.04em}
.export-bar{position:fixed;top:0;left:0;right:0;z-index:999;background:#0a0a0a;display:flex;justify-content:space-between;align-items:center;padding:12px 32px;box-shadow:0 2px 12px rgba(0,0,0,.3)}
.export-bar-label{font-size:11px;color:#888;letter-spacing:.1em;text-transform:uppercase}.export-bar-label strong{color:#fff;font-weight:600}
.eb-btns{display:flex;gap:8px;align-items:center}
.btn-pdf,.btn-eb{font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;border:none;padding:10px 20px;cursor:pointer;transition:all .15s}
.btn-pdf{background:#CC0000;color:#fff}.btn-pdf:hover{background:#A00}
.btn-eb{background:#1c1c1c;color:#bbb;border:1px solid #333}.btn-eb:hover{background:#262626;color:#fff}
.btn-eb.on{background:#2d7a4a;color:#fff;border-color:#2d7a4a}
.save-state{font-size:10px;color:#666;letter-spacing:.06em;min-width:96px}
#doc[contenteditable="true"]{outline:none}
body.editing #doc td,body.editing #doc p,body.editing #doc li,body.editing #doc h1,body.editing #doc h2,body.editing #doc .meta-col p{border-radius:2px;transition:background .12s}
body.editing #doc [contenteditable]:focus{background:#fffdf5;box-shadow:0 0 0 2px rgba(204,0,0,.18)}
.edit-hint{display:none;background:#fff8e6;border-bottom:1px solid #ecd9a0;color:#7a5a1a;font-size:11px;padding:7px 56px;letter-spacing:.02em}
body.editing .edit-hint{display:block}
@media print{.export-bar,.edit-hint{display:none!important}body{background:#fff;margin:0;padding:0}.page{margin:0;max-width:none}[contenteditable]{outline:none!important;background:none!important;box-shadow:none!important}}
</style></head><body>
<div class="edit-hint">✏️ Mode édition actif — clique dans le texte pour le modifier. Tes changements sont sauvegardés automatiquement dans le navigateur ; « Enregistrer » écrit le fichier sur ton disque.</div>
<div class="page">
<div class="topbar"><div class="logo-mark">FMRXR<span>//</span></div><div class="doc-label">${docLabel} · ${esc(input.ref)}</div></div>
<div class="body" id="doc">
<div class="meta-row"><div>
<div class="meta-col" style="margin-bottom:28px"><h3>Prestataire</h3><p><strong>${SELLER.name}</strong><br>${SELLER.person}<br>${SELLER.title}<br>Matricule fiscal : ${SELLER.mf}<br>${SELLER.city}<br>${SELLER.email} · ${SELLER.phone}</p></div>
<div class="meta-col"><h3>Client</h3><p><strong>${esc(input.clientName)}</strong><br>${input.matriculeFiscal ? "Matricule fiscal : " + esc(input.matriculeFiscal) + "<br>" : ""}${input.clientEmail ? esc(input.clientEmail) : ""}</p></div></div>
<div class="ref-block"><h3>Référence</h3><div class="ref-num">${esc(input.ref)}</div><div class="ref-date">${isDevis ? "Émis" : "Émise"} le ${frDate(input.issued)}</div><div class="ref-date" style="margin-top:2px">${isDevis ? "Validité" : "Échéance"} : ${esc(input.due)}</div></div></div>
<table class="invoice-table"><thead><tr><th style="width:58%">Prestation</th><th style="text-align:center">Qté</th><th style="text-align:right;padding-right:32px">P.U.</th><th>Total ${cur}</th></tr></thead>
<tbody>${itemsRows}</tbody></table>
<div class="totals-section"><div class="totals-inner">
<div class="row"><span>Sous-total HT</span><span>${money(total)} ${cur}</span></div>
<div class="row"><span>TVA (non applicable)</span><span>—</span></div>
${totalsBlock}</div></div>
<div class="divider"></div>
<div class="bank-section"><div class="bank-block"><h4>Coordonnées bancaires</h4><table>
<tr><td>Titulaire</td><td>${SELLER.bank.holder}</td></tr><tr><td>Banque</td><td>${SELLER.bank.bank}</td></tr>
<tr><td>RIB</td><td>${SELLER.bank.rib}</td></tr><tr><td>IBAN</td><td>${SELLER.bank.iban}</td></tr><tr><td>BIC/SWIFT</td><td>${SELLER.bank.swift}</td></tr></table></div>
<div class="conditions-block"><h4>Conditions</h4><p>${input.conditions.split("\n").filter(Boolean).map(esc).join("<br><br>")}</p></div></div>
<div style="margin-bottom:40px;padding:14px 20px;background:#f7f7f5;border-left:3px solid #0a0a0a;font-size:11px;color:#666;line-height:1.8">${LEGAL}</div>
<div class="sig-section"><div class="sig-block"><h4>Prestataire</h4><p>${SELLER.person}<br>${SELLER.name} · Tunis, le ${frDate(input.issued)}</p><div class="sig-line">Signature</div></div>
<div class="sig-block"><h4>Client — bon pour accord</h4><p>${esc(input.clientName)}</p><div class="sig-line">Signature &amp; cachet</div></div></div>
</div>
<div class="bottombar"><div class="bl">FMRXR<span>//</span></div><div class="br">${SELLER.email} · ${SELLER.phone} · ${SELLER.web}</div></div>
</div>
<div class="export-bar">
 <span class="export-bar-label"><strong>FMRXR//</strong> · ${docLabel} · ${esc(input.ref)} · <span id="saveState" class="save-state">prêt</span></span>
 <div class="eb-btns">
  <button class="btn-eb" id="editBtn" onclick="toggleEdit()">✏️ Éditer</button>
  <button class="btn-eb" onclick="resetDoc()" title="Revenir à la version d'origine">⟲ Réinitialiser</button>
  <button class="btn-eb" onclick="saveToDisk()">💾 Enregistrer</button>
  <button class="btn-pdf" onclick="exportPDF()">⬇ PDF</button>
 </div>
</div>
<script>
document.body.style.marginTop='56px';
var DOC=document.getElementById('doc'), KEY=${JSON.stringify(storageKey)};
var editing=false, saveTimer=null;
var ORIGINAL=DOC.innerHTML;
function setState(t,c){var el=document.getElementById('saveState');el.textContent=t;el.style.color=c||'#666';}
try{var saved=localStorage.getItem(KEY);if(saved){DOC.innerHTML=saved;setState('modifs restaurées','#5BBF7A');}}catch(e){}
function persist(){try{localStorage.setItem(KEY,DOC.innerHTML);setState('enregistré (navigateur) · '+new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}),'#5BBF7A');}catch(e){setState('erreur stockage','#CC0000');}}
DOC.addEventListener('input',function(){clearTimeout(saveTimer);setState('modification…','#D9A441');saveTimer=setTimeout(persist,600);});
function toggleEdit(){
 editing=!editing;
 DOC.setAttribute('contenteditable',editing?'true':'false');
 document.body.classList.toggle('editing',editing);
 var b=document.getElementById('editBtn');
 b.classList.toggle('on',editing);
 b.textContent=editing?'✓ Terminer':'✏️ Éditer';
 if(editing){DOC.focus();setState('mode édition','#D9A441');}else{persist();}
}
function saveToDisk(){
 var html='<!DOCTYPE html>\\n'+document.documentElement.outerHTML;
 var a=document.createElement('a');
 a.href=URL.createObjectURL(new Blob([html],{type:'text/html'}));
 a.download=${JSON.stringify(fname)};a.click();
 setState('téléchargé ✓','#5BBF7A');
}
function resetDoc(){
 if(!confirm('Revenir à la version d\\'origine ? Tes modifications locales seront effacées.'))return;
 DOC.innerHTML=ORIGINAL;
 try{localStorage.removeItem(KEY);}catch(e){}
 if(editing)toggleEdit();
 setState('réinitialisé','#666');
}
function exportPDF(){
 var wasEditing=editing;if(wasEditing)toggleEdit();
 var t=document.title;document.title=${JSON.stringify(fname.replace(/\.html$/, ""))};
 window.print();document.title=t;
}
</script>
</body></html>`;
}
