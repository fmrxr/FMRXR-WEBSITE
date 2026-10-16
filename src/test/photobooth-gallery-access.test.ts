import { describe, it, expect } from "vitest";
import { galleryKey, galleryPath, galleryPin, isGalleryKey, isGalleryPin, isHidden } from "@/lib/photobooth/gallery-access";

// Galerie d'equipe : cle propre, derivee de la cle de la campagne.

describe("cle de galerie", () => {
  const access = "8dc7acf26915464aa83b852ca1b37027";
  it("differente de la cle de la borne : le lien de la borne n'ouvre pas la galerie", () => {
    expect(galleryKey(access)).not.toBe(access);
    expect(isGalleryKey(access, access)).toBe(false);
  });
  it("acceptee seulement exacte", () => {
    expect(isGalleryKey(access, galleryKey(access))).toBe(true);
    expect(isGalleryKey(access, galleryKey(access).slice(1))).toBe(false);
    expect(isGalleryKey(access, null)).toBe(false);
    expect(isGalleryKey(access, "")).toBe(false);
  });
  it("change avec la cle de la campagne (regenerer coupe l'ancien lien)", () => {
    expect(galleryKey("une-autre-cle-0000")).not.toBe(galleryKey(access));
    expect(isGalleryKey("une-autre-cle-0000", galleryKey(access))).toBe(false);
  });
  it("lien de galerie", () => {
    expect(galleryPath("iqos-test", access)).toBe(`/experience/photobooth/iqos-test/galerie?g=${galleryKey(access)}`);
  });
});

describe("code equipe (premiere page de la borne)", () => {
  const access = "8dc7acf26915464aa83b852ca1b37027";
  it("6 chiffres, stable, accepte seulement exact", () => {
    const pin = galleryPin(access);
    expect(pin).toMatch(/^\d{6}$/);
    expect(galleryPin(access)).toBe(pin);
    expect(isGalleryPin(access, pin)).toBe(true);
    expect(isGalleryPin(access, pin === "000000" ? "000001" : "000000")).toBe(false);
    expect(isGalleryPin(access, "12345")).toBe(false);
    expect(isGalleryPin(access, null)).toBe(false);
  });
  it("change avec la cle de la campagne", () => {
    expect(isGalleryPin("une-autre-cle-0000", galleryPin(access)) && galleryPin("une-autre-cle-0000") === galleryPin(access)).toBe(false);
  });
});

describe("portrait supprime", () => {
  it("masque seulement avec le drapeau", () => {
    expect(isHidden({ hidden: true })).toBe(true);
    expect(isHidden({ title: { fr: "x" } })).toBe(false);
    expect(isHidden(null)).toBe(false);
  });
});
