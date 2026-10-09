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
    expect(rows.find((r) => r.id === "labs")!.items.length).toBe(5);
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
});
