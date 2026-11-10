"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Loader2, Plus, Trash2 } from "lucide-react";
import { SKINS, type Skin } from "@/lib/wall/config";

// La charte du mur, posee par l'equipe du client : fond, cartes, stickers.
// Ce que cette page n'ouvre pas (moderateurs, mots bloques, limites) est
// refuse cote serveur, pas seulement cache ici : voir lib/wall/brand.ts.

type Sticker = { id: string; url: string; label: string };
type Brand = {
  title: { fr: string; en: string; ar: string };
  prompt: { fr: string; en: string; ar: string };
  brandName: string; clientLogoUrl: string; skin: Skin;
  accent: string; background: string; backgroundImage: string; palette: string[];
  papers: ({ url: string; ink: "dark" | "light" } | null)[];
  stickersEnabled: boolean; stickers: Sticker[]; maxStickersPerPost: number;
  defaultLocale: "fr" | "en" | "ar";
};

const SKIN_LABEL: Record<Skin, string> = {
  memory: "Notes mémoire", instagram: "Fil photo",
  facebook: "Fil d’actualité", reddit: "Forum",
};

export function Brand({ slug, m }: { slug: string; m: string }) {
  const [b, setB] = useState<Brand | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const logoInput = useRef<HTMLInputElement>(null);
  const stickerInput = useRef<HTMLInputElement>(null);
  const paperInput = useRef<HTMLInputElement>(null);
  const bgInput = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    const r = await fetch(`/api/wall/brand?slug=${slug}&m=${m}`, { cache: "no-store" })
      .then((x) => x.json()).catch(() => null);
    if (r?.ok) setB(r.brand);
  }, [slug, m]);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void load(); }, [load]);

  const set = <K extends keyof Brand>(k: K, v: Brand[K]) => {
    setB((p) => (p ? { ...p, [k]: v } : p));
    setSaved(false);
  };

  const save = async () => {
    if (!b) return;
    setSaving(true);
    setError(null);
    const r = await fetch("/api/wall/brand", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, m, patch: b }),
    }).then((x) => x.json()).catch(() => null);
    setSaving(false);
    if (!r?.ok) return setError(r?.error ?? "Enregistrement impossible.");
    setB(r.brand);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  const upload = async (file: File, kind: "sticker" | "logo" | "background") => {
    const fd = new FormData();
    fd.append("slug", slug); fd.append("m", m); fd.append("kind", kind); fd.append("file", file);
    const r = await fetch("/api/wall/brand/upload", { method: "POST", body: fd })
      .then((x) => x.json()).catch(() => null);
    if (!r?.ok) {
      setError(r?.error === "TYPE" ? "Image PNG, JPG ou WebP seulement."
        : r?.error === "TOO_LARGE" ? `Image trop lourde (${Math.round((r.max ?? 0) / 1_000_000)} Mo au plus).`
        : "Envoi impossible.");
      return null;
    }
    return r.url as string;
  };

  /**
   * La couleur du texte à poser sur un papier, mesurée sur l'image même :
   * on lit la luminance moyenne d'une version réduite. Demander au client
   * de la choisir lui-même, c'est lui demander de deviner à la place de
   * ses invités, et une carte illisible ne se voit qu'une fois le mur en
   * salle.
   */
  const inkOf = async (url: string): Promise<"dark" | "light"> => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    await new Promise((r) => { img.onload = img.onerror = r; });
    if (!img.naturalWidth) return "dark";
    const cv = document.createElement("canvas");
    cv.width = cv.height = 24;
    const g = cv.getContext("2d");
    if (!g) return "dark";
    g.drawImage(img, 0, 0, 24, 24);
    try {
      const d = g.getImageData(0, 0, 24, 24).data;
      let sum = 0;
      for (let i = 0; i < d.length; i += 4) sum += 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
      return sum / (d.length / 4) < 128 ? "light" : "dark";
    } catch { return "dark"; }
  };

  const setPaper = (i: number, v: { url: string; ink: "dark" | "light" } | null) => {
    const next = [...(b?.papers ?? [])];
    while (next.length < (b?.palette.length ?? 0)) next.push(null);
    next[i] = v;
    set("papers", next);
  };

  const pickPaper = (i: number) => {
    const el = paperInput.current;
    if (!el) return;
    el.onchange = async () => {
      const f = el.files?.[0]; el.value = "";
      if (!f) return;
      setBusy("paper" + i);
      const url = await upload(f, "sticker");
      setBusy(null);
      if (url) setPaper(i, { url, ink: await inkOf(url) });
    };
    el.click();
  };

  if (!b) return <p className="p-6 text-fmmuted">Chargement…</p>;

  return (
    <div className="flex flex-col gap-6">
      {error && <p className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm">{error}</p>}

      <Section title="Le fond" hint="Une couleur, ou une image en 4K derrière les cartes. La couleur reste visible pendant que l’image se charge, gardez-les proches.">
        <div className="flex flex-wrap gap-5">
          <Color label="Couleur du mur" value={b.background} onChange={(v) => set("background", v)} />
          <Color label="Accent" value={b.accent} onChange={(v) => set("accent", v)} />
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          {b.backgroundImage
            // eslint-disable-next-line @next/next/no-img-element
            ? <img src={b.backgroundImage} alt="" className="h-20 w-36 rounded-lg border border-fmborder object-cover" />
            : <span className="grid h-20 w-36 place-items-center rounded-lg border border-dashed border-fmborder text-xs text-fmmuted">couleur seule</span>}
          <input ref={bgInput} type="file" accept="image/png,image/jpeg,image/webp" className="hidden"
            onChange={async (e) => {
              const f = e.target.files?.[0]; e.target.value = ""; if (!f) return;
              setBusy("bg");
              const url = await upload(f, "background");
              setBusy(null);
              if (url) set("backgroundImage", url);
            }} />
          <div className="flex flex-col gap-2">
            <button onClick={() => bgInput.current?.click()}
              className="flex min-h-11 items-center gap-2 rounded-full border border-fmborder px-4 text-sm">
              {busy === "bg" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              {b.backgroundImage ? "Remplacer l’image" : "Image de fond (4K)"}
            </button>
            <span className="text-[11px] text-fmmuted">PNG, JPG ou WebP · 12 Mo au plus · 3840 × 2160 conseillé</span>
          </div>
          {b.backgroundImage && (
            <button onClick={() => set("backgroundImage", "")}
              className="min-h-11 rounded-full border border-fmborder px-4 text-sm text-fmmuted">Retirer</button>
          )}
        </div>
      </Section>

      <Section title="Les cartes" hint="La forme des cartes, et les couleurs de papier tirées au sort pour chaque message.">
        <div className="flex flex-wrap gap-2">
          {SKINS.map((s) => (
            <button key={s} onClick={() => set("skin", s)}
              className={`min-h-11 rounded-full border px-4 text-sm ${b.skin === s ? "border-fmfg bg-fmfg text-fmbg" : "border-fmborder"}`}>
              {SKIN_LABEL[s]}
            </button>
          ))}
        </div>
        <p className="mt-5 text-[13px] leading-relaxed text-fmmuted">
          Chaque papier est une couleur, et peut porter votre image. La couleur reste
          dessous : elle s’affiche pendant que l’image se charge.
        </p>
        <div className="mt-3 flex flex-wrap items-start gap-3">
          {b.palette.map((c, i) => {
            const sheet = b.papers?.[i] ?? null;
            return (
              <div key={i} className="flex w-[88px] flex-col items-center gap-1.5">
                <div className="relative h-[88px] w-[88px] overflow-hidden rounded-lg border border-fmborder bg-cover bg-center"
                  style={{ backgroundColor: c, backgroundImage: sheet ? `url(${sheet.url})` : undefined }}>
                  <span className="absolute inset-x-1 top-1 text-[9px] font-semibold"
                    style={{ color: sheet?.ink === "light" ? "#f6f6f8" : "#1b1a22" }}>Aa</span>
                </div>
                <input type="color" value={c} aria-label={`Couleur ${i + 1}`}
                  onChange={(e) => set("palette", b.palette.map((x, j) => (j === i ? e.target.value : x)))}
                  className="h-9 w-full cursor-pointer rounded-md border border-fmborder bg-transparent" />
                <div className="flex w-full gap-1">
                  <button onClick={() => pickPaper(i)}
                    className="min-h-9 flex-1 rounded-md border border-fmborder text-[10px] text-fmmuted hover:text-fmfg">
                    {busy === "paper" + i ? "…" : sheet ? "changer" : "image"}
                  </button>
                  {sheet && (
                    <button aria-label="Retirer l’image" onClick={() => setPaper(i, null)}
                      className="min-h-9 w-9 rounded-md border border-fmborder text-fmmuted hover:text-fmfg">
                      <Trash2 className="mx-auto h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                {b.palette.length > 1 && (
                  <button onClick={() => {
                    set("palette", b.palette.filter((_, j) => j !== i));
                    set("papers", (b.papers ?? []).filter((_, j) => j !== i));
                  }} className="text-[10px] text-fmmuted hover:text-fmfg">retirer le papier</button>
                )}
              </div>
            );
          })}
          {b.palette.length < 8 && (
            <button onClick={() => { set("palette", [...b.palette, "#ffffff"]); set("papers", [...(b.papers ?? []), null]); }}
              className="flex min-h-11 items-center gap-1 rounded-full border border-fmborder px-4 text-sm">
              <Plus className="h-4 w-4" /> Papier
            </button>
          )}
        </div>
        <input ref={paperInput} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" />
      </Section>

      <Section title="Le logo" hint="Posé sur le mur et sur l’écran du téléphone. PNG, JPG ou WebP, 1,5 Mo au plus.">
        <div className="flex flex-wrap items-center gap-4">
          {b.clientLogoUrl
            // eslint-disable-next-line @next/next/no-img-element
            ? <img src={b.clientLogoUrl} alt="" className="h-12 w-auto max-w-[220px] object-contain" />
            : <span className="text-sm text-fmmuted">aucun logo</span>}
          <input ref={logoInput} type="file" accept="image/png,image/jpeg,image/webp" className="hidden"
            onChange={async (e) => {
              const f = e.target.files?.[0]; if (!f) return;
              setBusy("logo");
              const url = await upload(f, "logo");
              setBusy(null);
              if (url) set("clientLogoUrl", url);
              e.target.value = "";
            }} />
          <button onClick={() => logoInput.current?.click()}
            className="flex min-h-11 items-center gap-2 rounded-full border border-fmborder px-4 text-sm">
            {busy === "logo" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            {b.clientLogoUrl ? "Remplacer" : "Ajouter"}
          </button>
          {b.clientLogoUrl && (
            <button onClick={() => set("clientLogoUrl", "")}
              className="min-h-11 rounded-full border border-fmborder px-4 text-sm text-fmmuted">Retirer</button>
          )}
        </div>
      </Section>

      <Section title="Les stickers" hint="Les invités les posent sur leur message et s’en servent comme réactions.">
        <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm">
          <input type="checkbox" checked={b.stickersEnabled}
            onChange={(e) => set("stickersEnabled", e.target.checked)} className="h-5 w-5 accent-[var(--color-fmaccent)]" />
          Stickers ouverts aux invités
        </label>
        <div className="mt-4 flex flex-wrap gap-3">
          {b.stickers.map((s) => (
            <div key={s.id} className="group relative rounded-lg border border-fmborder bg-fmcard p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.url} alt={s.label} className="h-14 w-14 object-contain" />
              <button onClick={() => set("stickers", b.stickers.filter((x) => x.id !== s.id))}
                aria-label={`Retirer ${s.label}`}
                className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full border border-fmborder bg-fmbg">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <input ref={stickerInput} type="file" accept="image/png,image/jpeg,image/webp" multiple className="hidden"
            onChange={async (e) => {
              const files = [...(e.target.files ?? [])];
              e.target.value = "";
              setBusy("stickers");
              const add: Sticker[] = [];
              for (const f of files.slice(0, 40 - b.stickers.length)) {
                const url = await upload(f, "sticker");
                if (!url) break;
                const base = f.name.replace(/\.[^.]+$/, "");
                add.push({
                  id: (base.toLowerCase().replace(/[^a-z0-9_-]+/g, "-").slice(0, 32) || "sticker") + "-" + Math.random().toString(36).slice(2, 6),
                  url, label: base.slice(0, 60),
                });
              }
              setBusy(null);
              if (add.length) set("stickers", [...b.stickers, ...add]);
            }} />
          {b.stickers.length < 40 && (
            <button onClick={() => stickerInput.current?.click()}
              className="flex h-[74px] w-[74px] flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-fmborder text-[11px] text-fmmuted">
              {busy === "stickers" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Ajouter
            </button>
          )}
        </div>
      </Section>

      <Section title="Les mots du mur" hint="Le titre affiché en tête, et la question posée à l’invité, dans les trois langues.">
        {(["fr", "en", "ar"] as const).map((l) => (
          <div key={l} className="mb-3 grid gap-2 sm:grid-cols-2">
            <Field label={`Titre · ${l.toUpperCase()}`} value={b.title[l]} rtl={l === "ar"}
              onChange={(v) => set("title", { ...b.title, [l]: v })} />
            <Field label={`Question · ${l.toUpperCase()}`} value={b.prompt[l]} rtl={l === "ar"}
              onChange={(v) => set("prompt", { ...b.prompt, [l]: v })} />
          </div>
        ))}
      </Section>

      {/* Apercu : la charte se juge sur une carte, pas sur des pastilles. */}
      <Section title="Aperçu" hint="Une carte comme les invités la verront.">
        <div className="rounded-xl bg-cover bg-center p-6" style={{ backgroundColor: b.background, backgroundImage: b.backgroundImage ? `url(${b.backgroundImage})` : undefined }}>
          <div className="relative w-[16em] rounded-[0.25em] p-[0.7em] text-[#1b1a22] shadow-[0_0.8em_1.6em_-0.6em_rgba(0,0,0,0.6)]"
            style={{ background: b.palette[0], fontSize: "14px" }}>
            <span className="absolute -top-[0.55em] left-1/2 h-[1.1em] w-[4.5em] -translate-x-1/2 rotate-[-3deg] bg-white/55" />
            <p className="min-h-[5em] text-[1.3em] font-semibold leading-snug">{b.prompt.fr || "Un mot doux pour la marque"}</p>
            <div className="mt-[0.6em] flex items-center justify-between text-[0.65em] text-[#1b1a22]/60">
              <span className="font-semibold">— Lina</span>
              <span style={{ color: b.accent }}>♥ 12</span>
            </div>
          </div>
        </div>
      </Section>

      <div className="sticky bottom-3 flex items-center gap-3">
        <button onClick={save} disabled={saving}
          className="flex min-h-12 items-center gap-2 rounded-full bg-fmaccent px-6 font-semibold text-black disabled:opacity-60">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
          Enregistrer la charte
        </button>
        {saved && <span className="text-sm text-fmaccent">Enregistré · le mur suit tout de suite</span>}
      </div>
    </div>
  );
}

function Section({ title, hint, children }: { title: string; hint: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-fmborder bg-fmcard p-4">
      <h2 className="fm-display text-lg text-fmfg">{title}</h2>
      <p className="mb-4 mt-1 text-[13px] leading-relaxed text-fmmuted">{hint}</p>
      {children}
    </section>
  );
}

function Color({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex items-center gap-3 text-sm">
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)}
        className="h-11 w-11 cursor-pointer rounded-lg border border-fmborder bg-transparent" />
      <span className="flex flex-col">
        {label}
        <span className="font-mono text-xs text-fmmuted">{value}</span>
      </span>
    </label>
  );
}

function Field({ label, value, onChange, rtl }: { label: string; value: string; onChange: (v: string) => void; rtl?: boolean }) {
  return (
    <label className="flex flex-col gap-1 text-xs text-fmmuted">
      {label}
      <input value={value} dir={rtl ? "rtl" : undefined} onChange={(e) => onChange(e.target.value)}
        className="min-h-11 rounded-lg border border-fmborder bg-fmbg px-3 text-sm text-fmfg" />
    </label>
  );
}
