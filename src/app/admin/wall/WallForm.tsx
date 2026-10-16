"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createWall, updateWall, type WallCampaignRow } from "@/app/actions/wall";
import { uploadImage } from "@/app/actions/media";
import { DEFAULT_CONFIG, KINDS, LOCALES, resolveConfig, SKINS, wallConfigSchema, type WallConfig } from "@/lib/wall/config";

// Formulaire de campagne Live Wall : reglages visuels + JSON en mode avance.

const toLocal = (iso: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60_000).toISOString().slice(0, 16);
};

const SKIN_LABEL: Record<string, string> = {
  memory: "Mur de mémoire (notes, polaroids)",
  instagram: "À la manière d’Instagram",
  facebook: "À la manière de Facebook",
  reddit: "À la manière de Reddit",
};
const KIND_LABEL: Record<string, string> = { text: "Mots doux", drawing: "Dessins", signature: "Signatures", photo: "Photos", sticker: "Stickers seuls" };

export function WallForm({ initial }: { initial?: WallCampaignRow }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [f, setF] = useState({
    slug: initial?.slug ?? "",
    name: initial?.name ?? "",
    client_name: initial?.client_name ?? "",
    status: initial?.status ?? "draft",
    starts_at: toLocal(initial?.starts_at ?? null),
    expires_at: toLocal(initial?.expires_at ?? null),
  });
  const [c, setC] = useState<WallConfig>(() => {
    const r = resolveConfig(initial?.config ?? {});
    return r.ok ? r.config : DEFAULT_CONFIG;
  });
  const [json, setJson] = useState("");
  const set = <K extends keyof WallConfig>(k: K, v: WallConfig[K]) => setC((s) => ({ ...s, [k]: v }));
  const check = wallConfigSchema.safeParse(c);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = { ...f, config: advanced ? json : JSON.stringify(c) };
    const r = initial ? await updateWall(initial.id, payload) : await createWall(payload);
    setSaving(false);
    if ("error" in r) return void toast.error(r.error);
    toast.success("Enregistré");
    router.push(`/admin/wall/${initial ? initial.id : (r as { id: string }).id}`);
    router.refresh();
  }

  async function addStickers(files: FileList | null) {
    if (!files?.length) return;
    const added: WallConfig["stickers"] = [];
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.set("file", file);
      const r = await uploadImage(fd);
      if ("error" in r) { toast.error(r.error); continue; }
      const base = file.name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30) || "sticker";
      added.push({ id: `${base}-${Math.random().toString(36).slice(2, 6)}`, url: r.url, label: file.name.replace(/\.[^.]+$/, "") });
    }
    setC((s) => ({ ...s, stickers: [...s.stickers, ...added].slice(0, 40) }));
  }

  const text = (label: string, k: keyof typeof f, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <Input value={f[k]} onChange={(e) => setF((s) => ({ ...s, [k]: e.target.value }))} {...props} />
    </div>
  );
  // label sert aussi de cle : check1 est appele dans des .map (langues, types de message)
  const check1 = (label: string, v: boolean, on: (b: boolean) => void, hint?: string) => (
    <label key={label} className="flex items-start gap-2 text-sm">
      <input type="checkbox" checked={v} onChange={(e) => on(e.target.checked)} className="mt-0.5" />
      <span>{label}{hint && <span className="block text-xs text-muted-foreground">{hint}</span>}</span>
    </label>
  );

  return (
    <form onSubmit={submit} className="flex max-w-3xl flex-col gap-8">
      <section className="grid gap-4 sm:grid-cols-2">
        {text("Nom de la campagne", "name", { required: true })}
        {text("Client", "client_name")}
        {text("Slug (URL)", "slug", { required: true, pattern: "[a-z0-9][a-z0-9-]{1,60}" })}
        <div className="flex flex-col gap-1.5">
          <Label>Statut</Label>
          <select value={f.status} onChange={(e) => setF((s) => ({ ...s, status: e.target.value as typeof s.status }))} className="h-9 rounded-md border px-2 text-sm">
            <option value="draft">Brouillon</option><option value="active">Actif</option>
            <option value="suspended">En pause</option><option value="ended">Terminé</option>
          </select>
        </div>
        {text("Début", "starts_at", { type: "datetime-local" })}
        {text("Fin", "expires_at", { type: "datetime-local" })}
      </section>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={advanced} onChange={(e) => { setAdvanced(e.target.checked); setJson(JSON.stringify(c, null, 2)); }} />
        Mode avancé (JSON)
      </label>

      {advanced ? (
        <textarea value={json} onChange={(e) => setJson(e.target.value)} rows={30} className="w-full rounded-md border p-3 font-mono text-xs" />
      ) : (
        <>
          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Textes</h2>
            {LOCALES.map((l) => (
              <div key={l} className="grid gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5"><Label>Titre ({l})</Label>
                  <Input dir={l === "ar" ? "rtl" : "ltr"} value={c.title[l]} onChange={(e) => set("title", { ...c.title, [l]: e.target.value })} /></div>
                <div className="flex flex-col gap-1.5"><Label>Question posée ({l})</Label>
                  <Input dir={l === "ar" ? "rtl" : "ltr"} value={c.prompt[l]} onChange={(e) => set("prompt", { ...c.prompt, [l]: e.target.value })} /></div>
              </div>
            ))}
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="flex flex-col gap-1.5"><Label>Nom de marque (r/…, page)</Label>
                <Input value={c.brandName} onChange={(e) => set("brandName", e.target.value)} /></div>
              <div className="flex flex-col gap-1.5 sm:col-span-2"><Label>Logo client (URL)</Label>
                <Input value={c.clientLogoUrl} onChange={(e) => set("clientLogoUrl", e.target.value)} placeholder="https://…" /></div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <span>Langues :</span>
              {LOCALES.map((l) => check1(l.toUpperCase(), c.locales.includes(l), (b) => set("locales", b ? [...c.locales, l] : c.locales.filter((x) => x !== l))))}
              <label className="flex min-w-0 max-w-full flex-wrap items-center gap-2">Par défaut
                <select value={c.defaultLocale} onChange={(e) => set("defaultLocale", e.target.value as WallConfig["defaultLocale"])} className="rounded-md border px-2 py-1">
                  {LOCALES.map((l) => <option key={l} value={l}>{l}</option>)}
                </select></label>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold">Format des cartes</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {SKINS.map((s) => (
                <label key={s} className={`flex cursor-pointer items-center gap-2 rounded-md border p-3 text-sm ${c.skin === s ? "border-foreground" : ""}`}>
                  <input type="radio" name="skin" checked={c.skin === s} onChange={() => set("skin", s)} />{SKIN_LABEL[s]}
                </label>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Les formats réseaux reprennent la mise en page (en-tête, likes, fil de commentaires), jamais les logos ni les noms des plateformes.</p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold">Ce que les invités envoient</h2>
            <div className="flex flex-wrap gap-4">
              {KINDS.map((k) => check1(KIND_LABEL[k], c.kinds[k], (b) => set("kinds", { ...c.kinds, [k]: b })))}
            </div>
            <div className="flex flex-wrap gap-6">
              {check1("Likes", c.likes, (b) => set("likes", b))}
              {check1("Commentaires", c.comments, (b) => set("comments", b))}
            </div>
            <div className="grid gap-3 sm:grid-cols-4">
              {([["maxChars", "Caractères max"], ["maxPostsPerSession", "Messages par invité"], ["cooldownSec", "Délai entre 2 envois (s)"], ["maxOnWall", "Cartes sur le mur"]] as const).map(([k, l]) => (
                <div key={k} className="flex flex-col gap-1.5"><Label>{l}</Label>
                  <Input type="number" value={c[k]} onChange={(e) => set(k, Number(e.target.value))} /></div>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold">Option : stickers digitaux de marque</h2>
            {check1("Activer les stickers", c.stickersEnabled, (b) => set("stickersEnabled", b), "Posés sur les messages, collés seuls sur le mur, ou en réaction dans les commentaires.")}
            {c.stickersEnabled && (
              <>
                <div className="flex flex-wrap gap-2">
                  {c.stickers.map((s, i) => (
                    <div key={s.id} className="group relative grid h-20 w-20 place-items-center rounded-lg border bg-muted p-1.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.url} alt={s.label} className="max-h-full max-w-full object-contain" />
                      <button type="button" onClick={() => set("stickers", c.stickers.filter((_, j) => j !== i))}
                        className="absolute -right-2 -top-2 hidden h-5 w-5 rounded-full bg-destructive text-xs text-white group-hover:block">×</button>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <label className="cursor-pointer rounded-md border px-3 py-1.5">Ajouter les stickers du client (PNG/WebP transparents)
                    <input type="file" multiple accept="image/png,image/webp,image/svg+xml" className="hidden" onChange={(e) => void addStickers(e.target.files)} />
                  </label>
                  <button type="button" className="text-muted-foreground underline" onClick={() => set("stickers", DEFAULT_CONFIG.stickers)}>Remettre le set FMRXR</button>
                  <label className="flex min-w-0 max-w-full flex-wrap items-center gap-2">Max par message
                    <Input type="number" className="w-20" value={c.maxStickersPerPost} onChange={(e) => set("maxStickersPerPost", Number(e.target.value))} /></label>
                </div>
              </>
            )}
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold">Interaction</h2>
            {check1("Écran tactile : déplacer, ouvrir et liker les cartes sur l’écran géant", c.screenInteractive, (b) => set("screenInteractive", b))}
            {check1("Les invités déplacent leur carte depuis leur téléphone", c.guestMove, (b) => set("guestMove", b))}
            <div className="flex flex-col gap-1.5">
              <Label>Option : capteur devant l’écran géant</Label>
              <select value={c.sensor} onChange={(e) => set("sensor", e.target.value as WallConfig["sensor"])} className="h-9 max-w-sm rounded-md border px-2 text-sm">
                <option value="none">Aucun</option>
                <option value="camera">Caméra : suivi des mains (poing = attraper, main ouverte = lâcher)</option>
              </select>
              {c.sensor === "camera" && check1("Caméra face au public (image en miroir)", c.sensorMirror, (b) => set("sensorMirror", b))}
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold">Modération</h2>
            <div className="flex flex-wrap gap-6 text-sm">
              <label className="flex min-w-0 max-w-full flex-wrap items-center gap-2">Messages
                <select value={c.moderation} onChange={(e) => set("moderation", e.target.value as WallConfig["moderation"])} className="rounded-md border px-2 py-1">
                  <option value="auto">Automatique (les messages signalés attendent)</option><option value="manual">Manuelle (tout attend)</option>
                </select></label>
              <label className="flex min-w-0 max-w-full flex-wrap items-center gap-2">Photos
                <select value={c.photoModeration} onChange={(e) => set("photoModeration", e.target.value as WallConfig["photoModeration"])} className="rounded-md border px-2 py-1">
                  <option value="manual">Manuelle</option><option value="auto">Automatique</option>
                </select></label>
            </div>
            <div className="flex flex-col gap-1.5"><Label>Mots bloqués en plus (séparés par des virgules)</Label>
              <Input value={c.blockedWords.join(", ")} onChange={(e) => set("blockedWords", e.target.value.split(",").map((w) => w.trim()).filter((w) => w.length >= 2))} /></div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold">Couleurs</h2>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <label className="flex min-w-0 max-w-full flex-wrap items-center gap-2">Accent <input type="color" value={c.accent} onChange={(e) => set("accent", e.target.value)} /></label>
              <label className="flex min-w-0 max-w-full flex-wrap items-center gap-2">Fond <input type="color" value={c.background} onChange={(e) => set("background", e.target.value)} /></label>
              <span>Cartes :</span>
              {c.palette.map((p, i) => (
                <input key={i} type="color" value={p} onChange={(e) => set("palette", c.palette.map((x, j) => (j === i ? e.target.value : x)))} />
              ))}
            </div>
          </section>
          {!check.success && <p className="text-sm text-destructive">{check.error.issues[0].path.join(".")} : {check.error.issues[0].message}</p>}
        </>
      )}

      <div><Button type="submit" disabled={saving || (!advanced && !check.success)}>{saving ? "Enregistrement…" : "Enregistrer"}</Button></div>
    </form>
  );
}
