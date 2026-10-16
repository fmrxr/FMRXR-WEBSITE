"use client";
import { useEffect, useRef, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { CHUNK, ICE_SERVERS, channelName, type Control, type Facing, type Signal } from "@/lib/photobooth/remote-camera";
import { decideFromHands, type Point } from "@/lib/photobooth/gestures";
import type { GestureRecognizer } from "@mediapipe/tasks-vision";

/**
 * Detection des gestes sur l'iPhone : meme modele, meme vignette de 640 px et
 * meme decision que la borne. GPU d'abord, CPU en secours.
 */
async function loadRecognizer(): Promise<GestureRecognizer | null> {
  try {
    const { FilesetResolver, GestureRecognizer } = await import("@mediapipe/tasks-vision");
    const files = await FilesetResolver.forVisionTasks("/photobooth/mediapipe/wasm");
    const make = (delegate: "GPU" | "CPU") => GestureRecognizer.createFromOptions(files, {
      baseOptions: { modelAssetPath: "/photobooth/mediapipe/gesture_recognizer.task", delegate },
      runningMode: "VIDEO",
      // Deux mains : vue en pied, la main baissee masquait celle qui faisait le geste.
      numHands: 2,
      minHandDetectionConfidence: 0.5,
      minHandPresenceConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    return await make("GPU").catch(() => make("CPU"));
  } catch {
    return null;
  }
}

// Page ouverte sur l'iPhone (QR de la borne) : envoie la camera a la borne en
// WebRTC sur le Wi-Fi, et lui renvoie une photo pleine definition a chaque
// declenchement. Ecran garde allume tant que la page est ouverte.

type State = "starting" | "connecting" | "connected" | "error";

export function RemoteCamera({ pairId, campaign, minScore }: { pairId: string; campaign: string; minScore: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [facing, setFacing] = useState<Facing>("environment");
  const [state, setState] = useState<State>("starting");
  const [photos, setPhotos] = useState(0);
  const [flash, setFlash] = useState(false);
  // Toujours pas connecte apres 20 s : aide reseau.
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    if (state === "connected") return;
    const id = window.setTimeout(() => setSlow(true), 20_000);
    return () => window.clearTimeout(id);
  }, [state]);

  useEffect(() => {
    let cancelled = false;
    let pc: RTCPeerConnection | null = null;
    let stream: MediaStream | null = null;
    let wake: WakeLockSentinel | null = null;
    let queued: RTCIceCandidateInit[] = [];
    let ctl: RTCDataChannel | null = null; // canal de donnees de la connexion en cours
    let recognizer: GestureRecognizer | null = null;
    let raf = 0;
    const sb = getSupabaseBrowser();
    const ch = sb.channel(channelName(pairId), { config: { broadcast: { self: false } } });
    const send = (m: Signal) => ch.send({ type: "broadcast", event: "sig", payload: m });

    async function snap(dc: RTCDataChannel, id: string) {
      const v = videoRef.current;
      const fail = () => dc.send(JSON.stringify({ t: "photo-error", id } satisfies Control));
      if (!v || !v.videoWidth) return fail();
      // Image du capteur a sa pleine definition, pas le flux compresse.
      const c = document.createElement("canvas");
      c.width = v.videoWidth;
      c.height = v.videoHeight;
      c.getContext("2d")!.drawImage(v, 0, 0);
      const blob = await new Promise<Blob | null>((r) => c.toBlob(r, "image/jpeg", 0.92));
      if (!blob) return fail();
      const buf = new Uint8Array(await blob.arrayBuffer());
      dc.send(JSON.stringify({ t: "photo-start", id, size: buf.length, mime: "image/jpeg", facing } satisfies Control));
      for (let i = 0; i < buf.length; i += CHUNK) {
        while (dc.bufferedAmount > 4 * 1024 * 1024) await new Promise((r) => setTimeout(r, 20));
        dc.send(buf.subarray(i, i + CHUNK));
      }
      dc.send(JSON.stringify({ t: "photo-end", id } satisfies Control));
      setPhotos((n) => n + 1);
      setFlash(true);
      setTimeout(() => setFlash(false), 300);
    }

    // Nouvelle connexion (premier lancement, ou borne rechargee : elle redit bonjour).
    async function connect() {
      if (!stream) return;
      pc?.close();
      queued = [];
      const peer = new RTCPeerConnection({ iceServers: ICE_SERVERS });
      pc = peer;
      const track = stream.getVideoTracks()[0];
      // Latence avant nettete : l'apercu doit suivre le geste.
      track.contentHint = "motion";
      const sender = peer.addTrack(track, stream);
      // Capteur en haute definition pour la photo ; apercu en 720p au plus pour la borne.
      const set = track.getSettings();
      const longSide = Math.max(set.width ?? 0, set.height ?? 0);
      const p = sender.getParameters();
      p.degradationPreference = "maintain-framerate";
      p.encodings = [{
        ...(p.encodings?.[0] ?? {}),
        maxFramerate: 30,
        maxBitrate: 2_500_000,
        ...(longSide > 1280 ? { scaleResolutionDownBy: longSide / 1280 } : {}),
      }];
      await sender.setParameters(p).catch(() => undefined);
      const dc = peer.createDataChannel("ctl");
      ctl = dc;
      dc.binaryType = "arraybuffer";
      dc.onmessage = (e) => {
        if (typeof e.data !== "string") return;
        const m = JSON.parse(e.data) as Control;
        if (m.t === "snap") void snap(dc, m.id);
      };
      peer.onicecandidate = (e) => { if (e.candidate) void send({ t: "ice", from: "phone", candidate: e.candidate.toJSON() }); };
      peer.onconnectionstatechange = () => {
        if (peer !== pc) return;
        if (peer.connectionState === "connected") setState("connected");
        else if (peer.connectionState === "failed" || peer.connectionState === "disconnected") setState("connecting");
      };
      setState("connecting");
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      await send({ t: "facing", facing });
      await send({ t: "offer", sdp: offer.sdp! });
    }

    ch.on("broadcast", { event: "sig" }, async ({ payload }) => {
      const m = payload as Signal;
      if (m.t === "hello" && m.from === "booth") return void connect();
      if (!pc) return;
      if (m.t === "answer") {
        await pc.setRemoteDescription({ type: "answer", sdp: m.sdp }).catch(() => undefined);
        for (const c of queued) await pc.addIceCandidate(c).catch(() => undefined);
        queued = [];
      } else if (m.t === "ice" && m.from === "booth") {
        if (pc.remoteDescription) await pc.addIceCandidate(m.candidate).catch(() => undefined);
        else queued.push(m.candidate);
      }
    });

    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          // 1080p : Safari ferme l'onglet quand une camera 4K tourne avec MediaPipe.
          video: { facingMode: facing, width: { ideal: 1920 }, height: { ideal: 1080 }, frameRate: { ideal: 30 } },
          audio: false,
        });
      } catch {
        if (!cancelled) setState("error");
        return;
      }
      if (cancelled) return stream.getTracks().forEach((tr) => tr.stop());
      const v = videoRef.current!;
      v.srcObject = stream;
      await v.play().catch(() => undefined);
      wake = await navigator.wakeLock?.request("screen").catch(() => null) ?? null;
      ch.subscribe((status) => { if (status === "SUBSCRIBED") void connect(); });

      // Gestes detectes ici, envoyes a la borne : changement immediat, sinon 5 fois par seconde.
      recognizer = await loadRecognizer();
      if (!recognizer || cancelled) return;
      const frame = document.createElement("canvas");
      const fctx = frame.getContext("2d")!;
      let lastTime = -1;
      let lastSent = "";
      let lastAt = 0;
      const loop = () => {
        raf = requestAnimationFrame(loop);
        if (!recognizer || v.readyState < 2 || v.currentTime === lastTime || !v.videoWidth) return;
        lastTime = v.currentTime;
        const h = Math.round((640 * v.videoHeight) / v.videoWidth);
        if (frame.width !== 640 || frame.height !== h) {
          frame.width = 640;
          frame.height = h;
        }
        fctx.drawImage(v, 0, 0, frame.width, frame.height);
        let g: ReturnType<typeof decideFromHands>["gesture"] = null;
        let hand = false;
        try {
          const res = recognizer.recognizeForVideo(frame, performance.now());
          const pick = decideFromHands(res.gestures, res.landmarks as Point[][] | undefined, minScore);
          g = pick.gesture;
          hand = pick.hand;
        } catch {
          return;
        }
        const msg = JSON.stringify({ t: "hand", g, hand } satisfies Control);
        const now = performance.now();
        if (ctl?.readyState === "open" && (msg !== lastSent || now - lastAt > 200)) {
          ctl.send(msg);
          lastSent = msg;
          lastAt = now;
        }
      };
      raf = requestAnimationFrame(loop);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      try { recognizer?.close(); } catch { /* deja ferme */ }
      pc?.close();
      stream?.getTracks().forEach((tr) => tr.stop());
      void wake?.release().catch(() => undefined);
      void sb.removeChannel(ch);
    };
  }, [pairId, facing, minScore]);

  const label = state === "connected" ? "Connecté à la borne" : state === "error" ? "Caméra refusée : autorisez la caméra dans Safari (Réglages › Safari › Caméra)." : "Connexion à la borne…";

  return (
    <main className="fm fixed inset-0 flex flex-col bg-black text-fmfg">
      <video ref={videoRef} playsInline muted className={`absolute inset-0 h-full w-full object-cover ${facing === "user" ? "-scale-x-100" : ""}`} />
      {flash && <div className="pointer-events-none absolute inset-0 bg-white/70" />}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 bg-gradient-to-b from-black/80 to-transparent p-4">
        <p className="fm-display text-sm tracking-[0.08em]" dir="ltr">FMRXR<span className="text-fmaccent">{"//"}</span></p>
        <p className="truncate text-xs text-fmfg/80">{campaign}</p>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 bg-gradient-to-t from-black/85 to-transparent p-6 pb-10 text-center">
        <p className="flex items-center gap-2 text-sm">
          <span className={`size-2.5 rounded-full ${state === "connected" ? "bg-fmaccent" : state === "error" ? "bg-red-500" : "animate-pulse bg-fmfg/60"}`} />
          {label}
        </p>
        <p role="note" className="rounded-xl border border-amber-400/60 bg-amber-400/15 px-4 py-2.5 text-xs font-semibold text-amber-100">
          Cet iPhone et la borne doivent être connectés au même réseau Wi-Fi.
        </p>
        {slow && state !== "connected" && (
          <div role="alert" className="max-w-sm rounded-xl bg-black/60 px-4 py-3 text-start text-xs leading-relaxed text-fmfg/90 backdrop-blur">
            <p className="font-semibold">Toujours pas connecté ?</p>
            <ul className="mt-1.5 list-disc space-y-1 ps-4">
              <li>Vérifiez dans Réglages › Wi-Fi que cet iPhone est sur le même réseau que la borne, et pas en 4G/5G.</li>
              <li>Certains Wi-Fi invités ou d’événement empêchent les appareils de se parler : utilisez un autre réseau.</li>
              <li>En dernier recours : activez le partage de connexion d’un téléphone et connectez-y la borne et cet iPhone.</li>
            </ul>
          </div>
        )}
        <p className="text-xs text-fmfg/70">Caméra de la borne · {photos} photo{photos > 1 ? "s" : ""}. Gardez cette page ouverte.</p>
        <button
          onClick={() => setFacing((f) => (f === "user" ? "environment" : "user"))}
          className="rounded-full border border-white/30 bg-black/40 px-5 py-2.5 text-sm backdrop-blur"
        >
          {facing === "user" ? "Caméra arrière" : "Caméra avant"}
        </button>
      </div>
    </main>
  );
}
