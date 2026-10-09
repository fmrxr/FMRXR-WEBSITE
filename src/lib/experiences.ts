// Catalogue des expériences web jouables sur /experiences. Une entrée par
// expérience, ses fichiers dans public/experiences/<slug>/ (préparés par
// scripts/experiences/prepare.py). La fiche et ses fichiers partent dans le
// même déploiement : pas de table Supabase, sinon une fiche publiée avant son
// code afficherait un lecteur vide. Le détail de chaque œuvre reste sa fiche
// projet (/projects/<project>), pour qu'une œuvre n'ait qu'une seule page.

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
  credits: ["FMRXR Labs", "Effet Mère mixer shader, ported from TouchDesigner to WebGL"],
  entry: `/experiences/labs/index.html?s=${shader}`,
  ...media(slug), requires: [], project: "fmrxr-labs",
});

export const EXPERIENCES: Experience[] = [
  {
    slug: "radiance", title: "RADIANCE", row: "body", year: 2026, featured: true,
    pitch: "Your hand becomes a light source. Radiance cascades trace how it spills across the room, live.",
    credits: ["FMRXR Studio, 2026", "Hand tracking by MediaPipe, on your device"],
    entry: "/experiences/radiance/index.html", ...media("radiance"),
    requires: ["camera"], desktopOnly: true, project: "radiance",
  },
  {
    slug: "access-protocol", title: "ACCESS PROTOCOL", row: "games", year: 2026,
    pitch: "Catch ten keys in forty seconds before the firewall falls. The promo game of a cyberpunk Halloween night.",
    credits: ["For Morninglory Paris · Cyberpunk Halloween at 42 Marches", "Portfolio demo, no ticket is issued"],
    entry: "/experiences/access-protocol/index.html", ...media("access-protocol"),
    requires: ["sound"], project: "access-protocol",
  },
  {
    slug: "spicy-airport", title: "SPICY AIRPORT", row: "spaces", year: 2026,
    pitch: "A turbofan parked at stand A07. Start it, open it, take it apart and walk through it.",
    credits: ["SOFI AIRLINES · SPICY COCKPIT universe", "Music: SPICY HOT! by Spicy Sofi, used with permission"],
    entry: "/experiences/spicy-airport/index.html", ...media("spicy-airport"),
    requires: ["sound"], desktopOnly: true, project: "spicy-airport",
  },
  {
    slug: "le-son-de-la-terre", title: "LE SON DE LA TERRE", row: "spaces", year: 2026,
    pitch: "A barge on the Seine, Notre-Dame behind it, the DJ booth rising from the deck at dusk.",
    credits: ["FMRXR Studio", "Real-time 3D viewer"],
    entry: "/experiences/le-son-de-la-terre/index.html", ...media("le-son-de-la-terre"),
    requires: [], project: "le-son-de-la-terre",
  },
  lab("lab-phyllotaxis", "phyllotaxis_grid", "PHYLLOTAXIS", "A sunflower's growth rule laid out as a breathing grid."),
  lab("lab-depth-tunnel", "tox13_depth_tunnel", "DEPTH TUNNEL", "Noise folded into an endless corridor of depth."),
  lab("lab-bouncing-bars", "tox4_bouncing_bars", "BOUNCING BARS", "Bars that fall, bounce and settle like a rhythm section."),
  lab("lab-lightpos-noise", "tox8_lightpos_noise", "LIGHT FIELD", "Rails of coloured light drifting through a noise field."),
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
