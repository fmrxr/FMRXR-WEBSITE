"use client";
import { useEffect, useRef, useState } from "react";

// Option capteur de l'ecran geant : une camera face au public suit jusqu'a
// deux mains (MediaPipe, sur le PC de l'ecran, aucune image ne sort).
// Poing ferme ou pince pouce-index = attraper la carte sous la main,
// main ouverte = la lacher. Chaque main a son curseur : deux personnes
// peuvent jouer en meme temps.

export type Hand = { id: number; x: number; y: number; grab: boolean };

type Landmark = { x: number; y: number };

const SMOOTH = 0.35; // lissage du curseur (0 = fige, 1 = brut)
const GRAB_FRAMES = 3; // images consecutives avant de changer d'etat : evite les clignotements

export function useHandSensor(enabled: boolean, mirror: boolean) {
  const video = useRef<HTMLVideoElement | null>(null);
  const [hands, setHands] = useState<Hand[]>([]);
  const [status, setStatus] = useState<"off" | "loading" | "ready" | "failed">("off");

  useEffect(() => {
    if (!enabled) return;
    let stop = false;
    let raf = 0;
    let stream: MediaStream | null = null;
    const state = new Map<number, { x: number; y: number; grab: boolean; votes: number }>();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus("loading");

    (async () => {
      try {
        const { FilesetResolver, GestureRecognizer } = await import("@mediapipe/tasks-vision");
        const files = await FilesetResolver.forVisionTasks("/photobooth/mediapipe/wasm");
        const make = (delegate: "GPU" | "CPU") => GestureRecognizer.createFromOptions(files, {
          baseOptions: { modelAssetPath: "/photobooth/mediapipe/gesture_recognizer.task", delegate },
          runningMode: "VIDEO", numHands: 2,
          minHandDetectionConfidence: 0.5, minHandPresenceConfidence: 0.5, minTrackingConfidence: 0.5,
        });
        const rec = await make("GPU").catch(() => make("CPU"));
        stream = await navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" }, audio: false });
        if (stop) return;
        const v = document.createElement("video");
        v.muted = true; v.playsInline = true; v.srcObject = stream;
        await v.play();
        video.current = v;
        setStatus("ready");
        let last = -1;
        const loop = () => {
          if (stop) return;
          if (v.currentTime !== last && v.readyState >= 2) {
            last = v.currentTime;
            const r = rec.recognizeForVideo(v, performance.now());
            const seen: Hand[] = [];
            (r.landmarks ?? []).forEach((lm: Landmark[], i: number) => {
              // Centre de la paume : stable, que la main soit ouverte ou fermee.
              const ids = [0, 5, 9, 13, 17];
              let x = ids.reduce((s, j) => s + lm[j].x, 0) / ids.length;
              const y = ids.reduce((s, j) => s + lm[j].y, 0) / ids.length;
              if (mirror) x = 1 - x;
              const name = r.gestures?.[i]?.[0]?.categoryName ?? "";
              const size = Math.hypot(lm[0].x - lm[9].x, lm[0].y - lm[9].y) || 0.1;
              const pinch = Math.hypot(lm[4].x - lm[8].x, lm[4].y - lm[8].y) / size < 0.35;
              const wantGrab = name === "Closed_Fist" || pinch;
              const wantOpen = name === "Open_Palm" || (!pinch && name !== "Closed_Fist");
              // Main la plus proche du curseur precedent : garde l'identite d'une image a l'autre.
              let id = i, best = Infinity;
              for (const [k, s] of state) {
                const d = Math.hypot(s.x - x, s.y - y);
                if (d < best && d < 0.25 && !seen.some((h) => h.id === k)) { best = d; id = k; }
              }
              const prev = state.get(id) ?? { x, y, grab: false, votes: 0 };
              const sx = prev.x + (x - prev.x) * SMOOTH, sy = prev.y + (y - prev.y) * SMOOTH;
              let { grab, votes } = prev;
              if ((wantGrab && !grab) || (wantOpen && grab)) votes += 1; else votes = 0;
              if (votes >= GRAB_FRAMES) { grab = !grab; votes = 0; }
              state.set(id, { x: sx, y: sy, grab, votes });
              seen.push({ id, x: sx, y: sy, grab });
            });
            for (const k of [...state.keys()]) if (!seen.some((h) => h.id === k)) state.delete(k);
            setHands(seen);
          }
          raf = requestAnimationFrame(loop);
        };
        loop();
      } catch (e) {
        console.error("wall: capteur indisponible", e);
        if (!stop) setStatus("failed");
      }
    })();

    return () => {
      stop = true;
      cancelAnimationFrame(raf);
      stream?.getTracks().forEach((t) => t.stop());
      setHands([]);
    };
  }, [enabled, mirror]);

  return { hands, status };
}
