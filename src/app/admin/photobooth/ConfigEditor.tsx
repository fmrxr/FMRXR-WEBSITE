"use client";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { STYLE_IDS, STYLES } from "@/lib/photobooth/styles";
import {
  GESTURES, LOCALES, PAPERS, resolveConfig,
  type CampaignConfig, type Locale, type Localized,
} from "@/lib/photobooth/config";

// Editeur visuel de la configuration d'une campagne. Il manipule l'objet
// complet (defaut + surcharge) et le valide a chaque frappe avec le meme
// schema que le serveur. Le JSON reste accessible en mode avance.

const LOCALE_LABEL: Record<Locale, string> = { fr: "Français", en: "English", ar: "العربية" };
const GESTURE_LABEL: Record<string, string> = {
  open_palm: "✋ Main ouverte", fist: "✊ Poing", thumb_up: "👍 Pouce levé", peace: "✌️ Paix",
};
const QUESTION_ROLE = [
  "Énergie : son titre forme le 1er mot du titre d’ambiance, fragments attendus : atmosphere, expression.",
  "Univers : sa palette s’affiche au visiteur, fragments attendus : lighting, palette.",
  "Style : son titre forme le 2e mot, fragments attendus : composition, texture, camera.",
];

const toLines = (r: Record<string, string>) => Object.entries(r).map(([k, v]) => `${k}: ${v}`).join("\n");
const fromLines = (s: string) =>
  Object.fromEntries(
    s.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => {
      const i = l.indexOf(":");
      return i < 0 ? [l, ""] : [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    }),
  );

export function ConfigEditor({ value, onChange }: { value: CampaignConfig; onChange: (c: CampaignConfig) => void }) {
  const [loc, setLoc] = useState<Locale>("fr");
  const [json, setJson] = useState<string | null>(null);
  const check = useMemo(() => resolveConfig(value), [value]);
  const c = value;
  const set = (patch: Partial<CampaignConfig>) => onChange({ ...c, ...patch });
  const setText = (k: "title" | "intro" | "privacy" | "quotaMessage", v: string) =>
    set({ [k]: { ...c[k], [loc]: v } } as Partial<CampaignConfig>);
  const dir = loc === "ar" ? "rtl" : "ltr";

  const setQ = (qi: number, fn: (q: CampaignConfig["questions"][number]) => CampaignConfig["questions"][number]) =>
    set({ questions: c.questions.map((q, i) => (i === qi ? fn(structuredClone(q)) : q)) });

  const select = (val: string, onSel: (v: string) => void, opts: [string, string][]) => (
    <select value={val} onChange={(e) => onSel(e.target.value)} className="h-9 rounded-md border bg-transparent px-3 text-sm">
      {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
    </select>
  );

  if (json !== null) {
    let parsed: unknown = null;
    let err: string | null = null;
    try { parsed = JSON.parse(json); } catch { err = "JSON invalide"; }
    const r = err ? null : resolveConfig(parsed);
    return (
      <div className="flex flex-col gap-2">
        <Textarea rows={22} value={json} onChange={(e) => setJson(e.target.value)} className="font-mono text-xs" />
        <p className="text-xs text-red-400">{err ?? (r && !r.ok ? r.error : "")}</p>
        <div className="flex gap-2">
          <Button type="button" size="sm" disabled={!r?.ok} onClick={() => { if (r?.ok) { onChange(r.config); setJson(null); } }}>
            Appliquer et revenir à l’éditeur
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => setJson(null)}>Annuler</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1">
          {LOCALES.map((l) => (
            <button
              key={l} type="button" onClick={() => setLoc(l)}
              className={`rounded-md px-3 py-1.5 text-xs ${l === loc ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
            >
              {LOCALE_LABEL[l]}
            </button>
          ))}
        </div>
        <Button type="button" size="sm" variant="ghost" onClick={() => setJson(JSON.stringify(c, null, 2))}>JSON avancé</Button>
      </div>
      <p className="-mt-3 text-xs text-muted-foreground">Les champs de texte ci-dessous s’éditent dans la langue sélectionnée.</p>

      <fieldset className="grid gap-4 rounded-lg border p-4">
        <legend className="px-1 text-sm font-medium">Textes de la borne</legend>
        <div className="flex flex-col gap-2"><Label>Titre</Label><Input dir={dir} value={c.title[loc]} onChange={(e) => setText("title", e.target.value)} /></div>
        <div className="flex flex-col gap-2"><Label>Introduction</Label><Textarea dir={dir} rows={2} value={c.intro[loc]} onChange={(e) => setText("intro", e.target.value)} /></div>
        <div className="flex flex-col gap-2"><Label>Mention caméra et données</Label><Textarea dir={dir} rows={3} value={c.privacy[loc]} onChange={(e) => setText("privacy", e.target.value)} /></div>
        <div className="flex flex-col gap-2"><Label>Message quand le quota est atteint</Label><Textarea dir={dir} rows={2} value={c.quotaMessage[loc]} onChange={(e) => setText("quotaMessage", e.target.value)} /></div>
      </fieldset>

      <fieldset className="grid gap-4 rounded-lg border p-4 md:grid-cols-2">
        <legend className="px-1 text-sm font-medium">Langues et marque</legend>
        <div className="flex flex-col gap-2">
          <Label>Langues proposées</Label>
          <div className="flex gap-4 text-sm">
            {LOCALES.map((l) => (
              <label key={l} className="flex items-center gap-1.5">
                <input
                  type="checkbox" checked={c.locales.includes(l)}
                  onChange={(e) => set({ locales: e.target.checked ? [...c.locales, l] : c.locales.filter((x) => x !== l) })}
                />
                {l.toUpperCase()}
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Langue par défaut</Label>
          {select(c.defaultLocale, (v) => set({ defaultLocale: v as Locale }), LOCALES.map((l) => [l, LOCALE_LABEL[l]]))}
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
          <Label>Logo client (URL https, fichier officiel fourni par le client)</Label>
          <Input value={c.clientLogoUrl} placeholder="https://…" onChange={(e) => set({ clientLogoUrl: e.target.value })} />
        </div>
      </fieldset>

      <fieldset className="grid gap-3 rounded-lg border p-4">
        <legend className="px-1 text-sm font-medium">Styles proposés au visiteur</legend>
        <p className="text-xs text-muted-foreground">
          Un seul style coché : pas d’écran de choix. Plusieurs : le visiteur choisit parmi eux.
        </p>
        {(["editorial", "transform"] as const).map((fam) => (
          <div key={fam} className="flex flex-col gap-2">
            <p className="text-xs font-medium">
              {fam === "editorial"
                ? "Éditoriaux · le visage reste exact"
                : "Transformations · ressemblance reconnaissable, mais pas exacte"}
            </p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {STYLE_IDS.filter((id) => STYLES[id].family === fam).map((id) => {
                const on = c.styles.includes(id);
                return (
                  <label key={id} className={`flex cursor-pointer items-start gap-2 rounded-md border p-2.5 text-sm ${on ? "border-fmaccent/60 bg-fmaccent/5" : ""}`}>
                    <input
                      type="checkbox" className="mt-0.5" checked={on}
                      onChange={(e) => {
                        const next = e.target.checked ? [...c.styles, id] : c.styles.filter((x) => x !== id);
                        // garde l'ordre du registre, et au moins un style
                        if (next.length) set({ styles: STYLE_IDS.filter((x) => next.includes(x)) });
                      }}
                    />
                    <span>
                      <span className="font-medium">
                        {STYLES[id].label.fr}
                        {STYLES[id].isNew && <span className="fm-new ms-2">Nouveau</span>}
                      </span>
                      {STYLES[id].layout !== "none" && <span className="ml-1 text-[10px] uppercase text-muted-foreground">mise en page</span>}
                      <span className="block text-xs text-muted-foreground">{STYLES[id].blurb.fr}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </fieldset>

      <fieldset className="grid gap-4 rounded-lg border p-4 md:grid-cols-2">
        <legend className="px-1 text-sm font-medium">Génération</legend>
        <p className="text-xs text-muted-foreground md:col-span-2">
          Modèle, résolution, qualité, retouche légère de la peau et variété des mises en scène : automatiques,
          identiques pour toutes les campagnes.
        </p>
        <div className="flex flex-col gap-2">
          <Label>Format</Label>
          {select(c.aspectRatio, (v) => set({ aspectRatio: v as CampaignConfig["aspectRatio"] }), [["3:4", "3:4 portrait"], ["2:3", "2:3 portrait"], ["9:16", "9:16 story"], ["1:1", "1:1 carré"]])}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Compte à rebours (s)</Label>
          <Input type="number" min={0} max={10} value={c.countdownSeconds} onChange={(e) => set({ countdownSeconds: Number(e.target.value) })} />
        </div>
        <label className="flex items-center gap-2 text-sm md:col-span-2">
          <input type="checkbox" checked={c.shareEnabled} onChange={(e) => set({ shareEnabled: e.target.checked })} />
          QR code de partage sur l’écran résultat (lien valable 7 jours)
        </label>
        <div className="flex flex-col gap-2 md:col-span-2">
          <Label>Direction visuelle commune (anglais conseillé)</Label>
          <Textarea rows={3} value={c.styleBrief} onChange={(e) => set({ styleBrief: e.target.value })} />
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
          <Label>À éviter</Label>
          <Textarea rows={2} value={c.negative} onChange={(e) => set({ negative: e.target.value })} />
        </div>
      </fieldset>

      <fieldset className="grid gap-4 rounded-lg border p-4 md:grid-cols-2">
        <legend className="px-1 text-sm font-medium">Impression</legend>
        <label className="flex items-center gap-2 text-sm md:col-span-2">
          <input type="checkbox" checked={c.print.enabled} onChange={(e) => set({ print: { ...c.print, enabled: e.target.checked } })} />
          Bouton « Imprimer » sur l’écran résultat
        </label>
        {c.print.enabled && (
          <>
            <div className="flex flex-col gap-2 md:col-span-2">
              <Label>Mode</Label>
              {select(c.print.mode, (v) => set({ print: { ...c.print, mode: v as CampaignConfig["print"]["mode"] } }), [
                ["agent", "Agent local : détecte l’imprimante, imprime sans dialogue (recommandé)"],
                ["browser", "Navigateur : boîte d’impression, aucune détection possible"],
              ])}
            </div>
            {c.print.mode === "agent" && (
              <>
                <div className="flex flex-col gap-2">
                  <Label>Adresse de l’agent</Label>
                  <Input value={c.print.agentUrl} onChange={(e) => set({ print: { ...c.print, agentUrl: e.target.value } })} className="font-mono text-xs" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Imprimante (vide = celle par défaut)</Label>
                  <Input value={c.print.printer} onChange={(e) => set({ print: { ...c.print, printer: e.target.value } })} />
                </div>
              </>
            )}
            <div className="flex flex-col gap-2">
              <Label>Papier</Label>
              {select(c.print.paper, (v) => set({ print: { ...c.print, paper: v as CampaignConfig["print"]["paper"] } }), PAPERS.map((p) => [p, p === "10x15" ? "10 × 15 cm (photo)" : p === "13x18" ? "13 × 18 cm" : p]))}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Cadrage</Label>
              {select(c.print.fit, (v) => set({ print: { ...c.print, fit: v as CampaignConfig["print"]["fit"] } }), [["cover", "Plein papier (bords recadrés)"], ["contain", "Image entière (marges)"]])}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Impressions max par portrait</Label>
              <Input type="number" min={1} max={10} value={c.print.maxPrints} onChange={(e) => set({ print: { ...c.print, maxPrints: Number(e.target.value) } })} />
            </div>
          </>
        )}
      </fieldset>

      {c.questions.map((q, qi) => (
        <fieldset key={qi} className="grid gap-4 rounded-lg border p-4">
          <legend className="px-1 text-sm font-medium">Question {qi + 1}</legend>
          <p className="-mt-2 text-xs text-muted-foreground">{QUESTION_ROLE[qi]}</p>
          <Input dir={dir} value={q.prompt[loc]} onChange={(e) => setQ(qi, (x) => { x.prompt[loc] = e.target.value; return x; })} />
          <div className="grid gap-3 md:grid-cols-2">
            {q.options.map((o, oi) => (
              <div key={oi} className="flex flex-col gap-2 rounded-md border p-3">
                <div className="flex gap-2">
                  {select(o.gesture, (v) => setQ(qi, (x) => { x.options[oi].gesture = v as (typeof GESTURES)[number]; return x; }), GESTURES.map((g) => [g, GESTURE_LABEL[g]]))}
                  <Input
                    value={o.id} className="font-mono text-xs" title="Identifiant interne (minuscules)"
                    onChange={(e) => setQ(qi, (x) => { x.options[oi].id = e.target.value; return x; })}
                  />
                </div>
                <Input dir={dir} placeholder="Libellé affiché" value={o.label[loc]} onChange={(e) => setQ(qi, (x) => { x.options[oi].label[loc] = e.target.value; return x; })} />
                {qi !== 1 && (
                  <Input
                    dir={dir} placeholder="Mot du titre d’ambiance" value={o.title?.[loc] ?? ""}
                    onChange={(e) => setQ(qi, (x) => {
                      x.options[oi].title = { ...(x.options[oi].title ?? { fr: "", en: "", ar: "" }), [loc]: e.target.value } as Localized;
                      return x;
                    })}
                  />
                )}
                {qi === 1 && (
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="#hex, #hex, …" value={(o.palette ?? []).join(", ")} className="font-mono text-xs"
                      onChange={(e) => setQ(qi, (x) => { x.options[oi].palette = e.target.value.split(",").map((h) => h.trim()).filter(Boolean); return x; })}
                    />
                    <div className="flex shrink-0 gap-1">
                      {(o.palette ?? []).filter((h) => /^#[0-9a-fA-F]{6}$/.test(h)).map((h, i) => (
                        <span key={i} className="size-5 rounded-full border border-white/10" style={{ background: h }} />
                      ))}
                    </div>
                  </div>
                )}
                <Textarea
                  rows={3} className="font-mono text-xs" placeholder="clé: valeur (anglais), une par ligne"
                  defaultValue={toLines(o.fragments)}
                  onBlur={(e) => setQ(qi, (x) => { x.options[oi].fragments = fromLines(e.target.value); return x; })}
                />
              </div>
            ))}
          </div>
        </fieldset>
      ))}

      <p className={`text-sm ${check.ok ? "text-fmaccent" : "text-red-400"}`}>
        {check.ok ? "Configuration valide." : `À corriger : ${check.error}`}
      </p>
    </div>
  );
}
