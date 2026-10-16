import { describe, it, expect } from "vitest";
import { PRODUCTS } from "@/lib/products";
import { EXPERIENCES, ROWS, findExperience, featuredExperience, experiencesByRow, allowFor, visibleExperiences, isVisible, heroSlug, PHOTOBOOTH_SLUG, LIVE_WALL_SLUG, PRODUCT_SLUGS, CONFIGURABLE_SLUGS } from "@/lib/experiences";
import fs from "node:fs";

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
  it("links every entry to a project page", () => {
    for (const e of EXPERIENCES) expect(e.project).toMatch(/^[a-z0-9-]+$/);
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
    expect(rows.find((r) => r.id === "labs")!.items.length).toBe(7);
  });
});

describe("allowFor", () => {
  it("always allows fullscreen and autoplay", () => {
    expect(allowFor({ requires: [] })).toBe("fullscreen; autoplay");
  });
  it("adds camera and microphone when required", () => {
    expect(allowFor({ requires: ["camera", "microphone"] })).toBe("fullscreen; autoplay; camera; microphone");
  });
  it("ignores sound, which needs no permission", () => {
    expect(allowFor({ requires: ["sound"] })).toBe("fullscreen; autoplay");
  });
  it("delegates xr-spatial-tracking for VR, or the VR button is hidden in the iframe", () => {
    expect(allowFor({ requires: ["sound", "vr"] })).toBe("fullscreen; autoplay; xr-spatial-tracking");
  });
  it("serves L'ASSEMBLEUR as a copy of its prototype source", () => {
    expect(fs.readFileSync("public/experiences/assembleur/index.html", "utf8"))
      .toBe(fs.readFileSync("experience/assembleur/PROTOTYPE/index.html", "utf8"));
  });
});

describe("visibilité réglée dans le CMS", () => {
  it("null = jamais réglé : tout s'affiche", () => {
    expect(visibleExperiences(null)).toEqual(EXPERIENCES);
    expect(isVisible(PHOTOBOOTH_SLUG, null)).toBe(true);
  });
  it("photobooth seul : catalogue vide, bloc visible", () => {
    expect(visibleExperiences([PHOTOBOOTH_SLUG])).toEqual([]);
    expect(isVisible(PHOTOBOOTH_SLUG, [PHOTOBOOTH_SLUG])).toBe(true);
    expect(isVisible("radiance", [PHOTOBOOTH_SLUG])).toBe(false);
  });
  it("une expérience cachée ne s'ouvre pas par ?play=", () => {
    const list = visibleExperiences(["access-protocol"]);
    expect(findExperience("radiance", list)).toBeUndefined();
    expect(featuredExperience(list).slug).toBe("access-protocol");
    expect(experiencesByRow(list).map((r) => r.id)).toEqual(["games"]);
  });
  it("une slug inconnue dans le réglage est ignorée", () => {
    expect(visibleExperiences(["nope"])).toEqual([]);
  });
});

describe("hero réglé dans le CMS", () => {
  it("la première de la liste est le hero", () => {
    expect(heroSlug(["spicy-airport", PHOTOBOOTH_SLUG])).toBe("spicy-airport");
    expect(heroSlug([])).toBeNull();
    expect(heroSlug(null)).toBeNull();
  });
});

describe("ce que le CMS peut enregistrer", () => {
  it("accepte tous les blocs produit et tout le catalogue", () => {
    expect(CONFIGURABLE_SLUGS).toContain(PHOTOBOOTH_SLUG);
    expect(CONFIGURABLE_SLUGS).toContain(LIVE_WALL_SLUG);
    for (const p of PRODUCTS) expect(CONFIGURABLE_SLUGS).toContain(p.slug);
    for (const e of EXPERIENCES) expect(CONFIGURABLE_SLUGS).toContain(e.slug);
    expect(new Set(CONFIGURABLE_SLUGS).size).toBe(CONFIGURABLE_SLUGS.length);
  });
  it("chaque bloc produit de la page admin est accepte a l'enregistrement", () => {
    // la page admin liste ses blocs depuis la fiche produits : chacun doit etre accepte
    const src = fs.readFileSync("src/app/admin/experiences/page.tsx", "utf8");
    expect(src).toContain("PRODUCTS.map");
    for (const p of PRODUCTS) expect(PRODUCT_SLUGS).toContain(p.slug);
  });
  it("chaque produit a sa page Decouvrir", () => {
    for (const p of PRODUCTS) {
      const page = p.slug === "photobooth" ? "src/app/(public)/photobooth/page.tsx" : `src/app/(public)/${p.slug}/page.tsx`;
      expect(fs.existsSync(page)).toBe(true);
    }
  });
});
