"use client";

// Ou sont les visages sur la photo prise, et la photo est-elle exploitable ?
// Mesure faite sur l'appareil, au declenchement, avec le modele de visage
// officiel MediaPipe (deja utilise pour l'expression). Sortent seulement un
// rectangle normalise (recadrage des mises en page carte et Polaroid : le
// cadrage etant garde a la generation, les visages sont au meme endroit dans
// le portrait) et la liste des defauts (photo-check.ts).

import type { FaceBox } from "@/lib/photobooth/face";
import { laplacianVariance, meanLuma, photoIssues, type PhotoIssue } from "@/lib/photobooth/photo-check";
export type { FaceBox };

export type PhotoCheck = { face: FaceBox | null; issues: PhotoIssue[] };

/** null : mesure impossible (modele indisponible) ; la photo part sans controle. */
export async function checkPhoto(canvas: HTMLCanvasElement, shot: "solo" | "group"): Promise<PhotoCheck | null> {
  let model: import("@mediapipe/tasks-vision").FaceLandmarker | null = null;
  try {
    const { FilesetResolver, FaceLandmarker } = await import("@mediapipe/tasks-vision");
    const files = await FilesetResolver.forVisionTasks("/photobooth/mediapipe/wasm");
    const make = (delegate: "GPU" | "CPU") => FaceLandmarker.createFromOptions(files, {
      baseOptions: { modelAssetPath: "/photobooth/mediapipe/face_landmarker.task", delegate },
      runningMode: "IMAGE",
      numFaces: 6, // photo de groupe : tous les visages
      outputFaceBlendshapes: true, // yeux fermes
    });
    model = await make("GPU").catch(() => make("CPU"));
    const res = model.detect(canvas);
    const marks = res.faceLandmarks ?? [];
    const c = (v: number) => Math.min(1, Math.max(0, v));
    const boxes = marks.map((f) => {
      let x0 = 1, y0 = 1, x1 = 0, y1 = 0;
      for (const p of f) {
        x0 = Math.min(x0, p.x); y0 = Math.min(y0, p.y);
        x1 = Math.max(x1, p.x); y1 = Math.max(y1, p.y);
      }
      // Valeurs brutes (peuvent deborder de 0-1) : un visage coupe au bord se voit.
      return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
    });
    if (!boxes.length) return { face: null, issues: photoIssues({ faces: [], luma: 0, sharpness: 0, eyesClosed: 0 }, shot) };

    const x0 = c(Math.min(...boxes.map((b) => b.x))), y0 = c(Math.min(...boxes.map((b) => b.y)));
    const x1 = c(Math.max(...boxes.map((b) => b.x + b.w))), y1 = c(Math.max(...boxes.map((b) => b.y + b.h)));
    const face: FaceBox = { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };

    // Lumiere et nettete mesurees sur la zone des visages, reduite a 160 px.
    const sw = Math.max(1, Math.round(face.w * canvas.width)), sh = Math.max(1, Math.round(face.h * canvas.height));
    const scale = Math.min(1, 160 / Math.max(sw, sh));
    const tw = Math.max(3, Math.round(sw * scale)), th = Math.max(3, Math.round(sh * scale));
    const t = document.createElement("canvas");
    t.width = tw; t.height = th;
    const ctx = t.getContext("2d", { willReadFrequently: true })!;
    ctx.drawImage(canvas, face.x * canvas.width, face.y * canvas.height, sw, sh, 0, 0, tw, th);
    const px = ctx.getImageData(0, 0, tw, th).data;

    const blink = (res.faceBlendshapes ?? []).map((b) => {
      const s = (name: string) => b.categories.find((k) => k.categoryName === name)?.score ?? 0;
      return (s("eyeBlinkLeft") + s("eyeBlinkRight")) / 2;
    });
    const issues = photoIssues({
      faces: boxes,
      luma: meanLuma(px),
      sharpness: laplacianVariance(px, tw, th),
      eyesClosed: blink.length ? Math.max(...blink) : 0,
    }, shot);
    return { face, issues };
  } catch {
    return null;
  } finally {
    try { model?.close(); } catch { /* deja ferme */ }
  }
}

/** Rectangle des visages seul (recadrage), comme avant le controle. */
export async function locateFaces(canvas: HTMLCanvasElement): Promise<FaceBox | null> {
  return (await checkPhoto(canvas, "solo"))?.face ?? null;
}
