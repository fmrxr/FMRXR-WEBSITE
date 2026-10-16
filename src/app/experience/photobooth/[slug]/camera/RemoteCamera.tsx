"use client";
import { useEffect, useRef, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { CHUNK, ICE_SERVERS, channelName, type Control, type Facing, type Signal } from "@/lib/photobooth/remote-camera";

// Page ouverte sur l'iPhone (QR de la borne) : envoie la camera a la borne en
// WebRTC sur le Wi-Fi, et lui renvoie une photo pleine definition a chaque
// declenchement. Ecran garde allume tant que la page est ouverte.

type State = "starting" | "connecting" | "connected" | "error";

export function RemoteCamera({ pairId, campaign }: { pairId: string; campaign: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [facing, setFacing] = useState<Facing>("environment");
  const [state, setState] = useState<State>("starting");
  const [photos, setPhotos] = useState(0);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let pc: RTCPeerConnection | null = null;
    let stream: MediaStream | null = null;
    let wake: WakeLockSentinel | null = null;
    let queued: RTCIceCandidateInit[] = [];
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
      const sender = peer.addTrack(track, stream);
      // Capteur en haute definition pour la photo ; apercu allege pour la borne.
      const set = track.getSettings();
      if (Math.max(set.width ?? 0, set.height ?? 0) > 2000) {
        const p = sender.getParameters();
        p.encodings = [{ ...(p.encodings?.[0] ?? {}), scaleResolutionDownBy: 2, maxBitrate: 4_000_000 }];
        await sender.setParameters(p).catch(() => undefined);
      }
      const dc = peer.createDataChannel("ctl");
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
          video: { facingMode: facing, width: { ideal: 3840 }, height: { ideal: 2160 }, frameRate: { ideal: 30 } },
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
    })();

    return () => {
      cancelled = true;
      pc?.close();
      stream?.getTracks().forEach((tr) => tr.stop());
      void wake?.release().catch(() => undefined);
      void sb.removeChannel(ch);
    };
  }, [pairId, facing]);

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
        <p className="text-xs text-fmfg/70">Caméra de la borne · même Wi-Fi · {photos} photo{photos > 1 ? "s" : ""}. Gardez cette page ouverte.</p>
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
