import { describe, it, expect } from "vitest";
import { channelName, isPairId, newPairId } from "@/lib/photobooth/remote-camera";

// Code d'appairage de la camera iPhone : 128 bits aleatoires, seul le QR le porte.
describe("code d'appairage", () => {
  it("32 caracteres hexadecimaux, jamais deux fois le meme", () => {
    const a = newPairId();
    expect(isPairId(a)).toBe(true);
    expect(new Set(Array.from({ length: 200 }, newPairId)).size).toBe(200);
  });
  it("refuse tout autre format (pas d'injection dans le nom du canal)", () => {
    expect(isPairId("abc")).toBe(false);
    expect(isPairId("../../x".padEnd(32, "0"))).toBe(false);
    expect(isPairId(null)).toBe(false);
    expect(channelName("a".repeat(32))).toBe(`pb-cam-${"a".repeat(32)}`);
  });
});
