# Catalogue d'expériences `/experiential` · Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remplacer la page d'attente `/experiential` par un catalogue façon Netflix d'expériences web FMRXR, jouables dans un lecteur en haut de page.

**Architecture:** Un registre typé (`src/lib/experiences.ts`) décrit chaque expérience. Ses fichiers statiques vivent dans `public/experiences/<slug>/`, et un script Python les prépare depuis les sources du disque (copie + correctifs vérifiés). La page serveur rend l'en-tête, puis un composant client `ExperienceCatalog` gère la sélection (`?play=`), le lecteur (iframe montée au clic sur PLAY) et les rangées (gabarit `ProjectRow` + `CardFilm`).

**Tech Stack:** Next.js 16.2 (App Router), React 19, Tailwind v4, Vitest (environnement node), Python 3 pour la préparation des fichiers, playwright-core pour les affiches.

Spec : `docs/superpowers/specs/2026-10-09-experiences-catalog-design.md`.

---

## Carte des fichiers

| Fichier | Rôle |
|---|---|
| `src/lib/experiences.ts` (créer) | Type `Experience`, registre `EXPERIENCES`, libellés `ROWS`, fonctions pures `findExperience`, `featuredExperience`, `experiencesByRow`, `allowFor` |
| `src/test/experiences.test.ts` (créer) | Tests des fonctions pures et de la cohérence du registre |
| `src/components/site/ExperienceCatalog.tsx` (créer) | Client : état de sélection, synchronisation `?play=`, lecteur, rangées |
| `src/app/(public)/experiential/page.tsx` (modifier) | Métadonnées indexables, `PageHero`, `Suspense` + `ExperienceCatalog` |
| `src/app/sitemap.ts` (modifier) | Ajouter `/experiential` |
| `src/proxy.ts` (modifier) | Exclure `/experiences/` du proxy Supabase (fichiers statiques lourds) |
| `scripts/experiences/prepare.py` (créer) | Copie + correctifs de chaque expérience vers `public/experiences/` |
| `scripts/experiences/labs.html` (créer) | Lecteur WebGL2 des shaders Labs (source copiée par `prepare.py`) |
| `scripts/experiences/capture.mjs` (créer) | Affiches jpg + boucles mp4 via playwright-core + ffmpeg |
| `public/experiences/**` (généré) | Fichiers servis |

---

### Task 1: Registre et fonctions pures (TDD)

**Files:**
- Create: `src/lib/experiences.ts`
- Test: `src/test/experiences.test.ts`

- [ ] **Step 1: Écrire les tests**

```ts
import { describe, it, expect } from "vitest";
import { EXPERIENCES, ROWS, findExperience, featuredExperience, experiencesByRow, allowFor } from "@/lib/experiences";

describe("experiences registry", () => {
  it("has unique slugs", () => {
    const slugs = EXPERIENCES.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
  it("has exactly one featured entry, RADIANCE", () => {
    expect(EXPERIENCES.filter((e) => e.featured).map((e) => e.slug)).toEqual(["radiance"]);
  });
  it("serves every entry from /experiences/", () => {
    for (const e of EXPERIENCES) expect(e.entry.startsWith("/experiences/")).toBe(true);
  });
  it("credits Spicy Sofi on SPICY AIRPORT", () => {
    expect(findExperience("spicy-airport")?.credits.join(" ")).toMatch(/SPICY HOT! by Spicy Sofi, used with permission/);
  });
  it("credits RADIANCE to FMRXR only", () => {
    const c = findExperience("radiance")!.credits.join(" ");
    expect(c).toMatch(/FMRXR Studio/);
    expect(c).not.toMatch(/SPECTRUM|FB Art/);
  });
});

describe("findExperience / featuredExperience", () => {
  it("finds by slug", () => expect(findExperience("access-protocol")?.title).toBe("ACCESS PROTOCOL"));
  it("returns undefined for unknown or empty slugs", () => {
    expect(findExperience("nope")).toBeUndefined();
    expect(findExperience(null)).toBeUndefined();
  });
  it("featured is RADIANCE", () => expect(featuredExperience().slug).toBe("radiance"));
});

describe("experiencesByRow", () => {
  it("returns rows in ROWS order, skipping empty rows", () => {
    const rows = experiencesByRow();
    expect(rows.map((r) => r.id)).toEqual(ROWS.map((r) => r.id).filter((id) => EXPERIENCES.some((e) => e.row === id)));
    expect(rows.find((r) => r.id === "labs")!.items.length).toBe(4);
  });
});

describe("allowFor", () => {
  it("always allows fullscreen and autoplay", () => {
    expect(allowFor({ requires: [] } as any)).toBe("fullscreen; autoplay");
  });
  it("adds camera and microphone when required", () => {
    expect(allowFor({ requires: ["camera", "microphone"] } as any)).toBe("fullscreen; autoplay; camera; microphone");
  });
  it("ignores sound, which needs no permission", () => {
    expect(allowFor({ requires: ["sound"] } as any)).toBe("fullscreen; autoplay");
  });
});
```

- [ ] **Step 2: Lancer, vérifier l'échec**

Run: `npx vitest run src/test/experiences.test.ts`
Expected: FAIL, `Cannot find module '@/lib/experiences'`.

- [ ] **Step 3: Implémenter `src/lib/experiences.ts`**

```ts
// Catalogue des expériences web jouables sur /experiential. Une entrée par
// expérience, ses fichiers dans public/experiences/<slug>/ (préparés par
// scripts/experiences/prepare.py). La fiche et ses fichiers partent dans le
// même déploiement : pas de table Supabase, sinon une fiche publiée avant son
// code afficherait un lecteur vide.

export type RowId = "body" | "games" | "spaces" | "labs";
export type Requirement = "camera" | "microphone" | "sound";

export type Experience = {
  slug: string;
  title: string;
  row: RowId;
  year: number;
  pitch: string;
  credits: string[];
  entry: string;
  poster: string;
  preview?: string;
  requires: Requirement[];
  desktopOnly?: boolean;
  featured?: boolean;
  project: string;
};

export const ROWS: { id: RowId; label: string }[] = [
  { id: "body", label: "Body & camera" },
  { id: "games", label: "Games" },
  { id: "spaces", label: "3D spaces" },
  { id: "labs", label: "Labs · live shaders" },
];

const media = (slug: string) => ({
  poster: `/experiences/_media/${slug}.jpg`,
  preview: `/experiences/_media/${slug}.mp4`,
});

const lab = (slug: string, shader: string, title: string, pitch: string): Experience => ({
  slug, title, row: "labs", year: 2026, pitch,
  credits: ["FMRXR Labs · Effet Mère mixer shader, ported from TouchDesigner to WebGL"],
  entry: `/experiences/labs/index.html?s=${shader}`,
  ...media(slug), requires: [],
});

export const EXPERIENCES: Experience[] = [
  {
    slug: "radiance", title: "RADIANCE", row: "body", year: 2026, featured: true,
    pitch: "Your hand becomes a light source. Radiance cascades trace how it spills across the room, live.",
    credits: ["FMRXR Studio, 2026", "Hand tracking: MediaPipe, on your device"],
    entry: "/experiences/radiance/index.html", ...media("radiance"),
    requires: ["camera"], desktopOnly: true,
  },
  {
    slug: "access-protocol", title: "ACCESS PROTOCOL", row: "games", year: 2026,
    pitch: "Catch ten keys in forty seconds before the firewall falls. The promo game of a cyberpunk Halloween night.",
    credits: ["For Morninglory Paris · Cyberpunk Halloween at 42 Marches, 31/10/2026", "Portfolio demo, no ticket is issued"],
    entry: "/experiences/access-protocol/index.html", ...media("access-protocol"),
    requires: ["sound"],
  },
  {
    slug: "spicy-airport", title: "SPICY AIRPORT", row: "spaces", year: 2026,
    pitch: "A turbofan parked at stand A07. Start it, open it, take it apart and walk through it.",
    credits: ["SOFI AIRLINES · SPICY COCKPIT universe", "Music: SPICY HOT! by Spicy Sofi, used with permission"],
    entry: "/experiences/spicy-airport/index.html", ...media("spicy-airport"),
    requires: ["sound"], desktopOnly: true,
  },
  {
    slug: "le-son-de-la-terre", title: "LE SON DE LA TERRE", row: "spaces", year: 2026,
    pitch: "A barge on the Seine, Notre-Dame behind it, the DJ booth rising from the deck at dusk.",
    credits: ["FMRXR Studio · 3D viewer"],
    entry: "/experiences/le-son-de-la-terre/index.html", ...media("le-son-de-la-terre"),
    requires: [],
  },
  lab("lab-phyllotaxis", "phyllotaxis_grid", "PHYLLOTAXIS", "A sunflower's growth rule laid out as a breathing grid."),
  lab("lab-depth-tunnel", "tox13_depth_tunnel", "DEPTH TUNNEL", "Noise folded into an endless corridor of depth."),
  lab("lab-bouncing-bars", "tox4_bouncing_bars", "BOUNCING BARS", "Bars that fall, bounce and settle like a rhythm section."),
  lab("lab-lightpos-noise", "tox8_lightpos_noise", "LIGHT FIELD", "A moving light combing through a noise field."),
];

export function findExperience(slug: string | null | undefined): Experience | undefined {
  if (!slug) return undefined;
  return EXPERIENCES.find((e) => e.slug === slug);
}

export function featuredExperience(): Experience {
  return EXPERIENCES.find((e) => e.featured) ?? EXPERIENCES[0];
}

export function experiencesByRow(): { id: RowId; label: string; items: Experience[] }[] {
  return ROWS.map((r) => ({ ...r, items: EXPERIENCES.filter((e) => e.row === r.id) })).filter((r) => r.items.length);
}

// Permissions déléguées à l'iframe. Le son n'en demande aucune.
export function allowFor(e: Pick<Experience, "requires">): string {
  const extra = e.requires.filter((r) => r === "camera" || r === "microphone");
  return ["fullscreen", "autoplay", ...extra].join("; ");
}
```

- [ ] **Step 4: Relancer, vérifier le succès**

Run: `npx vitest run src/test/experiences.test.ts`
Expected: PASS (11 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/experiences.ts src/test/experiences.test.ts
git commit -m "Experiences: registre du catalogue et ses tests"
```

---

### Task 2: Sortir `/experiences/` du proxy

**Files:** Modify: `src/proxy.ts` (export `config`)

- [ ] **Step 1:** Remplacer le matcher pour exclure le dossier statique (sinon chaque `.wasm`, `.glb`, `.mjs` déclenche un appel Supabase de session) :

```ts
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|experiences/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
```

- [ ] **Step 2: Commit** `git commit -am "Proxy: ne pas passer les fichiers d'experiences par la session Supabase"`

---

### Task 3: Script de préparation `scripts/experiences/prepare.py`

**Files:** Create: `scripts/experiences/prepare.py`

Chaque étape copie une source du disque d'Haïfa puis applique des remplacements **vérifiés** (le script s'arrête si un motif attendu manque, plutôt que de publier un fichier à moitié corrigé). Il se relance sans risque : il efface puis recrée chaque dossier cible.

- [ ] **Step 1: Écrire le script**

```python
"""Prépare public/experiences/ depuis les sources sur disque.
python scripts/experiences/prepare.py [radiance|access|spicy|terre|labs ...]
Sans argument : tout. Chaque remplacement est vérifié ; un motif absent arrête tout."""
import os, re, shutil, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, "public", "experiences")
PRO = os.path.dirname(ROOT)  # E:\FMRXR\CLAUDE PRO
SRC = {
    "radiance": r"E:\FB ART&EVENT\radiance_cascades_mediapipe (2)\radiance_cascades_final.html",
    "access": os.path.join(PRO, "Clients", "Morninglory Paris", "Contenu & Brief", "Cyberpunk Halloween 42 Marches", "Jeu", "game_shotgun", "public"),
    "spicy": os.path.join(PRO, "spicy-airport"),
    "terre": os.path.join(PRO, "Concepts", "LeSonDeLaTerre_3D", "index.html"),
    "shaders": os.path.join(PRO, "EFFET MÈRE", "Shaders"),
}
MP = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35"


def fresh(name):
    d = os.path.join(OUT, name)
    shutil.rmtree(d, ignore_errors=True)
    os.makedirs(d)
    return d


def sub(text, old, new, count=1, regex=False):
    n = len(re.findall(old, text)) if regex else text.count(old)
    if n < count:
        sys.exit(f"motif introuvable ({n}/{count}) : {old[:80]}")
    return re.sub(old, new, text) if regex else text.replace(old, new)


def radiance():
    d = fresh("radiance")
    s = open(SRC["radiance"], encoding="utf-8").read()
    s = sub(s, "import('./mediapipe/vision_bundle.mjs')", f"import('{MP}/vision_bundle.mjs')")
    s = sub(s, "'./mediapipe/wasm'", f"'{MP}/wasm'")
    assert "./mediapipe/" not in s, "chemin local MediaPipe restant"
    open(os.path.join(d, "index.html"), "w", encoding="utf-8").write(s)


def access():
    d = os.path.join(OUT, "access-protocol")
    shutil.rmtree(d, ignore_errors=True)
    shutil.copytree(SRC["access"], d)
    g = os.path.join(d, "game.js")
    s = open(g, encoding="utf-8").read()
    # codes promo : supprimés du fichier, pas masqués
    s = sub(s, r",\s*promo:\s*'[A-Za-z0-9+/=]+'", "", 3, regex=True)
    s = sub(s, "SHOTGUN: 'https://shotgun.live/events/cyberpunk-halloween-2026?utm_source=game'", "SHOTGUN: '/projects'")
    s = sub(s, "STORAGE: 'ch42_shotgun_v1'", "STORAGE: 'fmrxr_demo_access_protocol'")
    s = sub(s, "code: atob(LEVEL.promo)", "code: 'DEMO'")
    s = sub(s, "box.innerHTML = `<div class=\"promo\"><span>PROMO CODE</span><b>${t.code}</b><span>−${t.discount}% ON SHOTGUN</span></div>`;",
            "box.innerHTML = `<div class=\"promo\"><span>ACCESS GRANTED</span><b>PORTFOLIO DEMO</b><span>NO TICKET IS ISSUED</span></div>`;")
    open(g, "w", encoding="utf-8").write(s)
    h = os.path.join(d, "index.html")
    s = open(h, encoding="utf-8").read()
    s = sub(s, r'\s*<meta (property|name)="(og|twitter):[^>]*>', "", 1, regex=True)
    s = sub(s, "https://shotgun.live/events/cyberpunk-halloween-2026?utm_source=game", "https://fmrxr.com/experiential", 1)
    s = sub(s, "ENTER THIS PROMO CODE WHEN YOU BUY YOUR TICKET ON SHOTGUN", "THIS IS THE FMRXR PORTFOLIO DEMO OF THE GAME")
    s = sub(s, "GET MY TICKET ON SHOTGUN", "MORE FMRXR EXPERIENCES")
    s = sub(s, ">COPY CODE<", " hidden>COPY CODE<")
    open(h, "w", encoding="utf-8").write(s)
    leaks = re.compile(r"promo:|CYBER10|PIXEL20|SOFI30|Q1lC|UElY|U09G|shotgun\.live|cyberhalloween\.netlify", re.I)
    for root, _, files in os.walk(d):
        for f in files:
            if f.endswith((".js", ".html", ".css", ".json")):
                t = open(os.path.join(root, f), encoding="utf-8", errors="ignore").read()
                if leaks.search(t):
                    sys.exit(f"fuite dans {f} : {leaks.search(t).group(0)}")


def spicy():
    cfg = os.path.join(SRC["spicy"], "vite.config.ts")
    s = open(cfg, encoding="utf-8").read()
    if "base:" not in s:
        s = sub(s, "defineConfig({", "defineConfig({\n  base: './',")
        open(cfg, "w", encoding="utf-8").write(s)
    subprocess.run("npm run build", cwd=SRC["spicy"], shell=True, check=True)
    d = os.path.join(OUT, "spicy-airport")
    shutil.rmtree(d, ignore_errors=True)
    shutil.copytree(os.path.join(SRC["spicy"], "dist"), d)
    assert 'src="/assets' not in open(os.path.join(d, "index.html"), encoding="utf-8").read(), "chemins absolus restants"


def terre():
    d = fresh("le-son-de-la-terre")
    shutil.copy(SRC["terre"], os.path.join(d, "index.html"))


def labs():
    d = fresh("labs")
    shutil.copy(os.path.join(ROOT, "scripts", "experiences", "labs.html"), os.path.join(d, "index.html"))
    for name, rel in [("phyllotaxis_grid", "phyllotaxis_grid.glsl"), ("tox13_depth_tunnel", "mixer_tox/tox13_depth_tunnel.glsl"),
                      ("tox4_bouncing_bars", "mixer_tox/tox4_bouncing_bars.glsl"), ("tox8_lightpos_noise", "mixer_tox/tox8_lightpos_noise.glsl")]:
        shutil.copy(os.path.join(SRC["shaders"], rel), os.path.join(d, name + ".glsl"))


STEPS = {"radiance": radiance, "access": access, "spicy": spicy, "terre": terre, "labs": labs}
if __name__ == "__main__":
    for k in sys.argv[1:] or STEPS:
        STEPS[k]()
        print("ok", k)
```

- [ ] **Step 2: Lancer chaque étape séparément et lire la sortie**

Run: `python scripts/experiences/prepare.py radiance access terre`
Expected: `ok radiance`, `ok access`, `ok terre`. Si un motif manque, ouvrir la source, corriger le motif dans le script (jamais la source), relancer.

- [ ] **Step 3: Contrôle anti-fuite indépendant**

Run: `grep -riE "CYBER10|PIXEL20|SOFI30|Q1lC|UElY|U09G|promo:" public/experiences/access-protocol || echo CLEAN`
Expected: `CLEAN`

- [ ] **Step 4: Commit** (sans SPICY ni Labs, qui viennent aux tâches 4 et 5)

```bash
git add scripts/experiences/prepare.py public/experiences/radiance public/experiences/access-protocol public/experiences/le-son-de-la-terre
git commit -m "Experiences: preparation RADIANCE, ACCESS PROTOCOL demo, Le Son de la Terre"
```

---

### Task 4: SPICY AIRPORT

- [ ] **Step 1:** `python scripts/experiences/prepare.py spicy` → `ok spicy`. Le script ajoute `base: './'` à `spicy-airport/vite.config.ts` (dépôt git séparé, à commiter là-bas : `git -C ../spicy-airport commit -am "Build en base relative pour l'embarquer sur fmrxr.com"`).
- [ ] **Step 2:** Ouvrir `http://localhost:3000/experiences/spicy-airport/index.html` dans le panneau : la scène se charge, `read_console_messages` sans 404.
- [ ] **Step 3: Commit** `git add public/experiences/spicy-airport && git commit -m "Experiences: SPICY AIRPORT"`

---

### Task 5: Lecteur Labs `scripts/experiences/labs.html`

Les shaders TouchDesigner déclarent leurs paramètres en `uniform vec4` et écrivent dans `fragColor` via `TDOutputSwizzle`. Le lecteur lit les uniforms déclarés, fournit le temps et l'aspect, et des valeurs par défaut par shader.

- [ ] **Step 1:** Lire l'en-tête de chacun des 4 `.glsl` (uniforms, fonction `main`, appels `TD*`) et relever des valeurs par défaut lisibles (les `.tox` ne sont pas sur disque : régler à l'œil dans le panneau).
- [ ] **Step 2:** Écrire `labs.html` : WebGL2 plein cadre, `fetch(<s>.glsl)`, préfixe `#version 300 es` + `precision highp float;` + `out vec4 fragColor;` + shims `vec4 TDOutputSwizzle(vec4 c){return c;}` et `vUV` (varying du vertex plein écran), table `DEFAULTS[shader] = {uName:[x,y,z,w]}`, temps en `u_time`/`uTime`, `u_aspect`, légende en bas à gauche (nom du shader en Geist Mono), message lisible si WebGL2 manque ou si la compilation échoue (journal du compilateur affiché).
- [ ] **Step 3:** `python scripts/experiences/prepare.py labs`, ouvrir les 4 `?s=` dans le panneau, ajuster `DEFAULTS` jusqu'à une image vivante, relancer.
- [ ] **Step 4: Commit** `git add scripts/experiences/labs.html public/experiences/labs && git commit -m "Experiences: lecteur WebGL des shaders Labs"`

---

### Task 6: Affiches et boucles `scripts/experiences/capture.mjs`

- [ ] **Step 1:** Script playwright-core (Chromium de `%LOCALAPPDATA%/ms-playwright/chromium-1243`) : pour chaque entrée, page 1280×720 sur `http://localhost:3000<entry>`, attente 4 s, capture jpg dans `public/experiences/_media/<slug>.jpg`, puis enregistrement vidéo 8 s (`recordVideo`), conversion ffmpeg en mp4 H.264 muet 960×540, `-crf 30`, sous 1,5 Mo. Pour RADIANCE : refuser la caméra (pas de `permissions`) et bouger la souris en cercle pendant l'enregistrement. Pour ACCESS : cliquer le bouton de démarrage avant d'enregistrer.
- [ ] **Step 2:** `NODE_PATH=<…>/node_modules node scripts/experiences/capture.mjs`, puis regarder chaque jpg (Read) : pas d'écran noir, pas d'écran d'erreur.
- [ ] **Step 3: Commit** `git add scripts/experiences/capture.mjs public/experiences/_media && git commit -m "Experiences: affiches et boucles d'apercu"`

---

### Task 7: `ExperienceCatalog` (lecteur + rangées)

**Files:** Create: `src/components/site/ExperienceCatalog.tsx`

- [ ] **Step 1: Écrire le composant**

Comportement exigé par la spec : sélection depuis `?play=` (repli sur `featuredExperience()`), état affiche puis lecture au clic sur PLAY uniquement, iframe démontée sur STOP ou changement de sélection, plein écran sur le cadre, lien « Open alone », rangées `ProjectRow` + cartes `CardFilm`, clic carte = sélection + `router.replace("?play=slug", { scroll: false })` + défilement doux vers le lecteur, message « Best experienced on a computer » à la place de PLAY pour `desktopOnly` sur écran étroit ou pointeur grossier, événements `experience_select` / `experience_play`.

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProjectRow } from "@/components/site/ProjectRow";
import { CardFilm } from "@/components/site/CardFilm";
import { track } from "@/lib/track";
import { allowFor, experiencesByRow, featuredExperience, findExperience, type Experience } from "@/lib/experiences";

const NEEDS: Record<string, string> = { camera: "Camera", microphone: "Microphone", sound: "Sound on" };

function useCoarseOrNarrow() {
  const [v, setV] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    const on = () => setV(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return v;
}

export function ExperienceCatalog() {
  const params = useSearchParams();
  const router = useRouter();
  const [current, setCurrent] = useState<Experience>(() => findExperience(params.get("play")) ?? featuredExperience());
  const [playing, setPlaying] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const small = useCoarseOrNarrow();
  const blocked = !!current.desktopOnly && small;

  // Retour arrière du navigateur : l'URL fait foi.
  useEffect(() => {
    const e = findExperience(params.get("play"));
    if (e && e.slug !== current.slug) { setCurrent(e); setPlaying(false); }
  }, [params]); // eslint-disable-line react-hooks/exhaustive-deps

  function select(e: Experience) {
    setCurrent(e);
    setPlaying(false); // démonte l'iframe : caméra, son et WebGL s'arrêtent
    router.replace(`?play=${e.slug}`, { scroll: false });
    frame.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    track("experience_select", { experience: e.slug });
  }

  function play() {
    setPlaying(true);
    track("experience_play", { experience: current.slug });
  }

  return (
    <>
      <section className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div ref={frame} className="relative aspect-video w-full overflow-hidden rounded-xl border border-fmborder bg-black">
          {playing ? (
            <iframe
              key={current.slug}
              src={current.entry}
              title={current.title}
              allow={allowFor(current)}
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <>
              {current.preview ? (
                <CardFilm src={current.preview} poster={current.poster} className="absolute inset-0 h-full w-full object-cover opacity-70" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={current.poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-10">
                <p className="text-[11px] uppercase tracking-[0.15em] text-fmmuted">{current.year} · {current.credits[0]}</p>
                <h2 className="fm-display mt-2 text-[clamp(2rem,6vw,4.5rem)] text-fmfg">{current.title}</h2>
                <p className="fm-grotesk mt-3 max-w-xl text-sm text-fmfg/85 md:text-base">{current.pitch}</p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {blocked ? (
                    <span className="rounded-full border border-fmborder px-5 py-3 text-[11px] uppercase tracking-[0.15em] text-fmmuted">Best experienced on a computer</span>
                  ) : (
                    <button type="button" onClick={play} className="rounded-full bg-fmaccent px-7 py-3 text-[12px] font-bold uppercase tracking-[0.15em] text-fmbg transition hover:brightness-110">
                      ▶ Play
                    </button>
                  )}
                  {current.requires.map((r) => (
                    <span key={r} className="rounded-full border border-fmborder px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-fmmuted">{NEEDS[r]}</span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 py-3 text-[11px] uppercase tracking-[0.15em] text-fmmuted">
          <span className="truncate">{current.title} · {current.credits.slice(1).join(" · ") || current.credits[0]}</span>
          <span className="flex gap-4">
            {playing && (
              <>
                <button type="button" onClick={() => frame.current?.requestFullscreen?.()} className="hover:text-fmaccent">Fullscreen</button>
                <button type="button" onClick={() => setPlaying(false)} className="hover:text-fmaccent">Stop</button>
              </>
            )}
            <a href={current.entry} target="_blank" rel="noopener" className="hover:text-fmaccent">Open alone ↗</a>
          </span>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] space-y-12 px-5 pb-24 pt-10 md:px-8">
        {experiencesByRow().map((row) => (
          <div key={row.id}>
            <h3 className="mb-4 text-[11px] uppercase tracking-[0.15em] text-fmmuted">— {row.label}</h3>
            <ProjectRow>
              {row.items.map((e) => (
                <button
                  key={e.slug}
                  type="button"
                  onClick={() => select(e)}
                  aria-current={e.slug === current.slug}
                  className={`fm-glass-card group block w-[78vw] max-w-[300px] shrink-0 snap-start overflow-hidden rounded-xl text-left sm:w-72 ${e.slug === current.slug ? "ring-1 ring-fmaccent" : ""}`}
                >
                  <div className="relative aspect-video overflow-hidden">
                    {e.preview ? (
                      <CardFilm src={e.preview} poster={e.poster} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={e.poster} alt="" loading="lazy" className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="p-4">
                    <p className="fm-display text-lg text-fmfg">{e.title}</p>
                    <p className="fm-grotesk mt-1 line-clamp-2 text-sm text-fmmuted">{e.pitch}</p>
                  </div>
                </button>
              ))}
            </ProjectRow>
          </div>
        ))}
      </section>
    </>
  );
}
```

- [ ] **Step 2:** `npx tsc --noEmit -p .` → aucune erreur sur ce fichier.
- [ ] **Step 3: Commit** `git add src/components/site/ExperienceCatalog.tsx && git commit -m "Experiences: lecteur et rangees du catalogue"`

---

### Task 8: Page, métadonnées, sitemap

**Files:** Modify: `src/app/(public)/experiential/page.tsx`, `src/app/sitemap.ts`

- [ ] **Step 1: Réécrire la page**

```tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/site/PageHero";
import { ExperienceCatalog } from "@/components/site/ExperienceCatalog";

export const metadata: Metadata = {
  title: "Experiences · Playable web works by FMRXR",
  description:
    "Play FMRXR's web experiences in your browser: RADIANCE hand-tracked light, the ACCESS PROTOCOL game, the SPICY AIRPORT turbofan, Le Son de la Terre in 3D and live shaders from the lab.",
  alternates: { canonical: "/experiential" },
  openGraph: { type: "website", url: "/experiential", title: "Experiences · FMRXR//", description: "Playable web works by FMRXR Studio, live in your browser." },
};

export default function Experiential() {
  return (
    <>
      <PageHero index="Experiences" title="Play the systems" intro="Our installations, games and shaders, running live in your browser. Pick one, press play." />
      {/* useSearchParams exige une frontière Suspense pour le rendu serveur. */}
      <Suspense>
        <ExperienceCatalog />
      </Suspense>
    </>
  );
}
```

- [ ] **Step 2: Sitemap** : dans le tableau `index` de `src/app/sitemap.ts`, après `/projects`, ajouter :

```ts
    { url: `${BASE}/experiential`, changeFrequency: "monthly", priority: 0.7 },
```

- [ ] **Step 3:** `npx vitest run` (tous les tests) puis `npm run lint`. Expected : PASS, aucune erreur.
- [ ] **Step 4: Commit** `git commit -am "Experiences: page /experiential indexable et sitemap"`

---

### Task 9: Vérification dans le navigateur

- [ ] `http://localhost:3000/experiential` : affiche RADIANCE, 4 rangées, aucune erreur console.
- [ ] Pour chaque carte : clic → affiche, URL `?play=<slug>`, PLAY → iframe vivante, Stop → retour affiche. RADIANCE : refuser la caméra, le mode souris doit répondre.
- [ ] Recharger sur `?play=spicy-airport` : SPICY AIRPORT sélectionné, crédit Spicy Sofi visible sous le lecteur.
- [ ] `resize_window` mobile : rangées qui défilent, « Best experienced on a computer » sur RADIANCE et SPICY AIRPORT, ACCESS jouable.
- [ ] `npm run build` : succès.
- [ ] Capture d'écran finale pour Haïfa.

### Task 10: Mise en ligne (sur accord explicite)

- [ ] `gh auth status` : compte actif `fmrxr`.
- [ ] Demander à Haïfa avant `git push origin main` (Hostinger tire automatiquement, avec plusieurs minutes de délai).
- [ ] Après déploiement : vérifier `https://fmrxr.com/experiential` et `https://fmrxr.com/experiences/radiance/index.html` réellement en ligne avant de l'annoncer.
- [ ] Mettre à jour le lien de navigation si `/experiential` n'est pas dans le menu (vérifier `Header.tsx`, `Footer.tsx`).

---

### Task 11: Lien vers la fiche projet et embed caméra (révision)

- [ ] Registre : `project` obligatoire. Valeurs : `radiance`, `access-protocol`, `spicy-airport`, `le-son-de-la-terre`, et `fmrxr-labs` pour les quatre shaders. Test ajouté : chaque entrée a un `project` non vide.
- [ ] `ExperienceCatalog` : lien « View the project → » vers `/projects/${current.project}` dans la barre sous le lecteur.
- [ ] `GameEmbed` : `allow` = `"fullscreen; autoplay; clipboard-write"` + `"; camera; microphone"` si `url` commence par `https://fmrxr.com/experiences/` ou `/experiences/`.

### Task 12: Fiches projet Supabase (après déploiement du code)

- [ ] Créer en **non publié**, via l'API REST service-role, les fiches `radiance`, `spicy-airport`, `le-son-de-la-terre`, `fmrxr-labs` : titre, année 2026, client (FMRXR Studio · SOFI AIRLINES pour SPICY), summary, description, stack, crédits, `cover_url` = affiche, galerie = un élément `embed: true` vers l'expérience + l'affiche.
- [ ] Après vérification de `https://fmrxr.com/experiences/*` en ligne : publier les quatre fiches, et changer l'URL de l'embed de `access-protocol` vers `https://fmrxr.com/experiences/access-protocol/index.html`.
