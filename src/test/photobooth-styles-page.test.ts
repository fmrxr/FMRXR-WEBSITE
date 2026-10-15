import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { STYLE_IDS } from "@/lib/photobooth/styles";

// La page /photobooth montre une vraie sortie de la borne pour chaque style :
// un style ajouté sans son image laisserait une carte vide.
describe("images des styles sur /photobooth", () => {
  it("chaque style a son image", () => {
    for (const id of STYLE_IDS) {
      expect(fs.existsSync(path.join(process.cwd(), "public/photobooth/styles", `${id}.webp`)), id).toBe(true);
    }
  });
});
