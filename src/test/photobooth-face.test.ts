import { describe, it, expect } from "vitest";
import { parseFaceBox } from "@/lib/photobooth/face";

// Rectangle des visages envoye par la borne : valide, ou ignore.
describe("rectangle des visages", () => {
  it("accepte un rectangle dans l'image", () => {
    expect(parseFaceBox({ x: 0.42, y: 0.47, w: 0.19, h: 0.15 })).toEqual({ x: 0.42, y: 0.47, w: 0.19, h: 0.15 });
  });
  it("refuse hors de l'image, vide ou mal forme", () => {
    expect(parseFaceBox({ x: 0.9, y: 0.1, w: 0.3, h: 0.2 })).toBeNull();
    expect(parseFaceBox({ x: -0.1, y: 0.1, w: 0.2, h: 0.2 })).toBeNull();
    expect(parseFaceBox({ x: 0.1, y: 0.1, w: 0, h: 0.2 })).toBeNull();
    expect(parseFaceBox({ x: "0.1", y: 0.1, w: 0.2, h: 0.2 })).toBeNull();
    expect(parseFaceBox(null)).toBeNull();
  });
});
