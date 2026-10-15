"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FaceLandmarker } from "@mediapipe/tasks-vision";
import { averageBlendshapes, expressionScores, readExpression, type Blendshapes, type ExpressionId } from "@/lib/photobooth/expression";

// Lecture d'expression locale : modele officiel MediaPipe FaceLandmarker,
// execute sur l'appareil pendant le scan et le debut du quiz. Une douzaine
// d'images suffisent ; le modele est ensuite ferme pour liberer la memoire
// (important sur iPhone). Rien n'est envoye : seule la categorie sort.

const SAMPLES = 12;
const INTERVAL_MS = 250;

export function useExpressionReader(video: React.RefObject<HTMLVideoElement | null>, active: boolean) {
  const [reading, setReading] = useState<ExpressionId | null>(null);
  const [scores, setScores] = useState<ReturnType<typeof expressionScores> | null>(null);
  const modelRef = useRef<FaceLandmarker | null>(null);
  const samplesRef = useRef<Blendshapes[]>([]);
  const loadingRef = useRef(false);

  const close = () => {
    try { modelRef.current?.close(); } catch { /* deja ferme */ }
    modelRef.current = null;
  };

  useEffect(() => {
    if (!active || reading) return;
    let stopped = false;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    const ensureModel = async () => {
      if (modelRef.current || loadingRef.current) return;
      loadingRef.current = true;
      try {
        const { FilesetResolver, FaceLandmarker } = await import("@mediapipe/tasks-vision");
        const files = await FilesetResolver.forVisionTasks("/photobooth/mediapipe/wasm");
        const make = (delegate: "GPU" | "CPU") => FaceLandmarker.createFromOptions(files, {
          baseOptions: { modelAssetPath: "/photobooth/mediapipe/face_landmarker.task", delegate },
          runningMode: "VIDEO",
          numFaces: 1,
          outputFaceBlendshapes: true,
        });
        modelRef.current = await make("GPU").catch(() => make("CPU"));
      } catch {
        // Pas de lecture possible : la borne fonctionne sans.
      } finally {
        loadingRef.current = false;
      }
    };
    ensureModel();

    const id = window.setInterval(() => {
      const v = video.current;
      const m = modelRef.current;
      if (stopped || !v || !m || v.readyState < 2 || !v.videoWidth) return;
      const h = Math.round((480 * v.videoHeight) / v.videoWidth);
      if (canvas.width !== 480 || canvas.height !== h) { canvas.width = 480; canvas.height = h; }
      ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
      try {
        const r = m.detectForVideo(canvas, performance.now());
        const cats = r.faceBlendshapes?.[0]?.categories;
        if (!cats?.length) return;
        samplesRef.current.push(Object.fromEntries(cats.map((c) => [c.categoryName, c.score])));
        const avg = averageBlendshapes(samplesRef.current);
        setScores(expressionScores(avg));
        if (samplesRef.current.length >= SAMPLES) {
          setReading(readExpression(avg));
          stopped = true;
          window.clearInterval(id);
          close();
        }
      } catch {
        stopped = true;
        window.clearInterval(id);
        close();
      }
    }, INTERVAL_MS);

    return () => { stopped = true; window.clearInterval(id); };
  }, [active, reading, video]);

  useEffect(() => () => close(), []);

  const reset = useCallback(() => {
    samplesRef.current = [];
    setReading(null);
    setScores(null);
  }, []);

  return { reading, scores, reset };
}
