import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";

process.env.WALL_KEY_SECRET ||= "test-secret-not-for-production";
import { DEFAULT_CONFIG, publicConfig, resolveConfig } from "@/lib/wall/config";
import { accessFor, modKey, screenKey } from "@/lib/wall/keys";
import { cleanText, flagText } from "@/lib/wall/moderation";
import { autoPos, parsePos, parseStickers, parseStrokes } from "@/lib/wall/shapes";

describe("live wall : acces", () => {
  const key = "a".repeat(32);
  it("chaque cle donne son acces, et seulement le sien", () => {
    expect(accessFor(key, { k: key })).toBe("guest");
    expect(accessFor(key, { s: screenKey(key) })).toBe("screen");
    expect(accessFor(key, { m: modKey(key) })).toBe("mod");
    expect(accessFor(key, { k: screenKey(key) })).toBeNull();
    expect(accessFor(key, { m: key })).toBeNull();
    expect(accessFor(key, {})).toBeNull();
  });
  it("connaitre la cle invite (QR public) ne permet pas de calculer s ou m", () => {
    // L'ancienne derivation sans secret, que n'importe quel invite pouvait refaire.
    const naive = (r: string) => createHash("sha256").update(`${key}:wall:${r}`).digest("hex").slice(0, 32);
    expect(accessFor(key, { m: naive("mod") })).toBeNull();
    expect(accessFor(key, { s: naive("screen") })).toBeNull();
    expect(modKey(key)).not.toBe(naive("mod"));
  });
  it("changer la cle coupe les liens derives", () => {
    expect(accessFor("b".repeat(32), { s: screenKey(key) })).toBeNull();
  });
});

describe("live wall : moderation", () => {
  it("laisse passer un mot doux", () => {
    expect(flagText("Merci pour cette soirée magique ❤")).toBeNull();
    expect(flagText("شكرا على هذه الليلة")).toBeNull();
  });
  it("signale insultes, liens, numeros et comptes", () => {
    expect(flagText("quel connard")).toBe("mot");
    expect(flagText("F*ck no, fuck")).toBe("mot");
    expect(flagText("va sur www.example.com")).toBe("lien");
    expect(flagText("appelle 22 333 444")).toBe("numero");
    expect(flagText("suivez @moncompte")).toBe("compte");
    expect(flagText("rien", ["rien"])).toBe("mot");
  });
  it("nettoie les caracteres invisibles et coupe a la longueur", () => {
    expect(cleanText("a‮b​  c", 10)).toBe("ab c");
    expect(cleanText("x".repeat(50), 5)).toBe("xxxxx");
    expect(cleanText(42, 5)).toBe("");
  });
});

describe("live wall : formes", () => {
  it("accepte un dessin valide et borne les valeurs", () => {
    const s = parseStrokes([{ c: "#112233", w: 500, p: [-5, 10, 2000, 30.4] }]);
    expect(s).toEqual([{ c: "#112233", w: 80, p: [0, 10, 1000, 30] }]);
  });
  it("refuse un dessin vide, trop lourd ou mal forme", () => {
    expect(parseStrokes([])).toBeNull();
    expect(parseStrokes([{ c: "red", w: 5, p: [1, 2] }])).toBeNull();
    expect(parseStrokes([{ c: "#000000", w: 5, p: [1, 2, 3] }])).toBeNull();
    expect(parseStrokes([{ c: "#000000", w: 5, p: Array(9000).fill(1) }])).toBeNull();
  });
  it("ne garde que les stickers de la campagne, dans la limite", () => {
    const ok = new Set(["a"]);
    const r = parseStickers([{ id: "a", x: 2, y: 0.5, s: 0.3, r: 10 }, { id: "zz", x: 0, y: 0, s: 0.3, r: 0 }, { id: "a", x: 0, y: 0, s: 0.3, r: 0 }], ok, 1);
    expect(r).toEqual([{ id: "a", x: 1, y: 0.5, s: 0.3, r: 10 }]);
  });
  it("garde les cartes deplacees dans le mur", () => {
    expect(parsePos(-1, 2, 90)).toEqual({ x: 0.04, y: 0.94, r: 20 });
    expect(parsePos("a", 0.5, 0)).toBeNull();
  });
  it("repartit les nouvelles cartes sans les empiler", () => {
    const pts = Array.from({ length: 40 }, (_, i) => autoPos(i, i));
    for (const p of pts) {
      expect(p.x).toBeGreaterThan(0.05); expect(p.x).toBeLessThan(0.95);
      expect(p.y).toBeGreaterThan(0.1); expect(p.y).toBeLessThan(0.9);
    }
    const close = pts.filter((a, i) => pts.some((b, j) => j !== i && Math.hypot(a.x - b.x, a.y - b.y) < 0.02));
    expect(close.length).toBe(0);
  });
});

describe("live wall : configuration", () => {
  it("la configuration par defaut est valide", () => {
    expect(resolveConfig({}).ok).toBe(true);
  });
  it("refuse une campagne sans aucun type de message", () => {
    const r = resolveConfig({ kinds: { text: false, drawing: false, signature: false, photo: false, sticker: false } });
    expect(r.ok).toBe(false);
  });
  it("n'envoie jamais les mots bloques aux telephones", () => {
    const pub = publicConfig({ ...DEFAULT_CONFIG, blockedWords: ["secret"] });
    expect(JSON.stringify(pub)).not.toContain("secret");
  });
  it("sans l'option stickers, aucun sticker n'est propose", () => {
    expect(publicConfig({ ...DEFAULT_CONFIG, stickersEnabled: false }).stickers).toEqual([]);
  });
});

describe("live wall : moderateurs nommes", () => {
  const key = "c".repeat(32);
  const mods = [{ id: "abc123", name: "Rym", key: "d".repeat(32) }];
  it("le lien personnel donne la moderation et signe les actions", async () => {
    const { moderatorName } = await import("@/lib/wall/keys");
    expect(accessFor(key, { m: "d".repeat(32) }, mods)).toBe("mod");
    expect(moderatorName(key, "d".repeat(32), mods)).toBe("Rym");
    expect(moderatorName(key, modKey(key), mods)).toBe("Équipe");
  });
  it("un moderateur retire perd l'acces", () => {
    expect(accessFor(key, { m: "d".repeat(32) }, [])).toBeNull();
  });
  it("le lien personnel ne vaut pas cle invite", () => {
    expect(accessFor(key, { k: "d".repeat(32) }, mods)).toBeNull();
  });
  it("les moderateurs ne partent jamais vers les telephones", () => {
    const pub = publicConfig({ ...DEFAULT_CONFIG, moderators: mods });
    expect(JSON.stringify(pub)).not.toContain("d".repeat(32));
  });
});
