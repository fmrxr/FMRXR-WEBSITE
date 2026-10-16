// Rectangle des visages sur la photo (coordonnees normalisees 0-1), mesure
// sur la borne au declenchement. Sert a recadrer la carte et le Polaroid.

export type FaceBox = { x: number; y: number; w: number; h: number };

/** Validation cote serveur d'un rectangle recu du navigateur. */
export function parseFaceBox(raw: unknown): FaceBox | null {
  if (!raw || typeof raw !== "object") return null;
  const b = raw as Record<string, unknown>;
  const n = (k: string) => (typeof b[k] === "number" && Number.isFinite(b[k]) ? (b[k] as number) : NaN);
  const box = { x: n("x"), y: n("y"), w: n("w"), h: n("h") };
  const ok = Object.values(box).every((v) => v >= 0 && v <= 1) && box.x + box.w <= 1.001 && box.y + box.h <= 1.001 && box.w > 0 && box.h > 0;
  return ok ? box : null;
}
