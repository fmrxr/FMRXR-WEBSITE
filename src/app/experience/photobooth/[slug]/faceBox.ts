"use client";

// Ou sont les visages sur la photo prise ? Mesure faite sur l'appareil, au
// declenchement, avec le modele de visage officiel MediaPipe (deja utilise
// pour l'expression). Seul un rectangle normalise sort : il sert a recadrer
// les mises en page (carte, Polaroid) sur les visages. Le cadrage etant garde
// a la generation, les visages sont au meme endroit dans le portrait.

import type { FaceBox } from "@/lib/photobooth/face";
export type { FaceBox };

export async function locateFaces(canvas: HTMLCanvasElement): Promise<FaceBox | null> {
  let model: import("@mediapipe/tasks-vision").FaceLandmarker | null = null;
  try {
    const { FilesetResolver, FaceLandmarker } = await import("@mediapipe/tasks-vision");
    const files = await FilesetResolver.forVisionTasks("/photobooth/mediapipe/wasm");
    const make = (delegate: "GPU" | "CPU") => FaceLandmarker.createFromOptions(files, {
      baseOptions: { modelAssetPath: "/photobooth/mediapipe/face_landmarker.task", delegate },
      runningMode: "IMAGE",
      numFaces: 6, // photo de groupe : tous les visages
    });
    model = await make("GPU").catch(() => make("CPU"));
    const faces = model.detect(canvas).faceLandmarks ?? [];
    if (!faces.length) return null;
    let x0 = 1, y0 = 1, x1 = 0, y1 = 0;
    for (const f of faces) for (const p of f) {
      x0 = Math.min(x0, p.x); y0 = Math.min(y0, p.y);
      x1 = Math.max(x1, p.x); y1 = Math.max(y1, p.y);
    }
    const c = (v: number) => Math.min(1, Math.max(0, v));
    return { x: c(x0), y: c(y0), w: c(x1) - c(x0), h: c(y1) - c(y0) };
  } catch {
    return null; // pas de mesure : la mise en page recadre comme avant
  } finally {
    try { model?.close(); } catch { /* deja ferme */ }
  }
}
