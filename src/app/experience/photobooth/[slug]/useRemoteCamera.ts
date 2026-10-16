"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { ICE_SERVERS, channelName, newPairId, type Control, type Facing, type Signal } from "@/lib/photobooth/remote-camera";

// Cote borne : recoit la camera de l'iPhone (voir lib/photobooth/remote-camera).
// Le code d'appairage est garde sur la borne : si elle se recharge, elle dit
// bonjour sur le meme canal et l'iPhone, toujours ouvert, se reconnecte seul.

export type RemoteStatus = "off" | "waiting" | "connected";

const storageKey = (slug: string) => `pb-pair:${slug}`;
const readPair = (slug: string) => {
  try {
    return localStorage.getItem(storageKey(slug));
  } catch {
    return null;
  }
};
const writePair = (slug: string, id: string | null) => {
  try {
    if (id) localStorage.setItem(storageKey(slug), id);
    else localStorage.removeItem(storageKey(slug));
  } catch {
    // stockage indisponible : l'appairage vaut pour cette visite
  }
};

type Pending = { resolve: (r: { blob: Blob; facing: Facing } | null) => void; chunks: Uint8Array[]; got: number; size: number; mime: string; facing: Facing };

export function useRemoteCamera(slug: string) {
  const [pairId, setPairId] = useState<string | null>(() => (typeof window === "undefined" ? null : readPair(slug)));
  const [status, setStatus] = useState<RemoteStatus>("off");
  const [facing, setFacing] = useState<Facing>("environment");
  const streamRef = useRef<MediaStream | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const pending = useRef(new Map<string, Pending>());
  const current = useRef<string | null>(null);

  useEffect(() => {
    if (!pairId) return;
    let pc: RTCPeerConnection | null = null;
    let queued: RTCIceCandidateInit[] = [];
    const sb = getSupabaseBrowser();
    const ch = sb.channel(channelName(pairId), { config: { broadcast: { self: false } } });
    const send = (m: Signal) => ch.send({ type: "broadcast", event: "sig", payload: m });

    const onControl = (e: MessageEvent) => {
      if (typeof e.data === "string") {
        const m = JSON.parse(e.data) as Control;
        if (m.t === "photo-start") {
          const p = pending.current.get(m.id);
          if (p) Object.assign(p, { size: m.size, mime: m.mime, facing: m.facing, chunks: [], got: 0 });
          current.current = m.id;
        } else if (m.t === "photo-end" || m.t === "photo-error") {
          const p = pending.current.get(m.id);
          pending.current.delete(m.id);
          current.current = null;
          if (!p) return;
          p.resolve(m.t === "photo-end" && p.got === p.size ? { blob: new Blob(p.chunks as BlobPart[], { type: p.mime }), facing: p.facing } : null);
        }
        return;
      }
      const p = current.current ? pending.current.get(current.current) : null;
      if (!p) return;
      const chunk = new Uint8Array(e.data as ArrayBuffer);
      p.chunks.push(chunk);
      p.got += chunk.byteLength;
    };

    ch.on("broadcast", { event: "sig" }, async ({ payload }) => {
      const m = payload as Signal;
      if (m.t === "facing") return setFacing(m.facing);
      if (m.t === "offer") {
        // Nouvelle offre (premiere connexion, iPhone recharge, camera retournee).
        pc?.close();
        queued = [];
        const peer = new RTCPeerConnection({ iceServers: ICE_SERVERS });
        pc = peer;
        peer.ontrack = (e) => {
          streamRef.current = e.streams[0] ?? new MediaStream([e.track]);
          setStatus("connected");
        };
        peer.ondatachannel = (e) => {
          e.channel.binaryType = "arraybuffer";
          e.channel.onmessage = onControl;
          dcRef.current = e.channel;
        };
        peer.onicecandidate = (e) => { if (e.candidate) void send({ t: "ice", from: "booth", candidate: e.candidate.toJSON() }); };
        peer.onconnectionstatechange = () => {
          if (peer !== pc) return;
          if (peer.connectionState === "failed" || peer.connectionState === "closed") setStatus("waiting");
        };
        await peer.setRemoteDescription({ type: "offer", sdp: m.sdp });
        for (const c of queued) await peer.addIceCandidate(c).catch(() => undefined);
        queued = [];
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        await send({ t: "answer", sdp: answer.sdp! });
      } else if (m.t === "ice" && m.from === "phone") {
        if (pc?.remoteDescription) await pc.addIceCandidate(m.candidate).catch(() => undefined);
        else queued.push(m.candidate);
      }
    });
    // Bonjour : un iPhone deja ouvert sur ce code se reconnecte.
    ch.subscribe((s) => {
      if (s === "SUBSCRIBED") {
        setStatus((cur) => (cur === "connected" ? cur : "waiting"));
        void send({ t: "hello", from: "booth" });
      }
    });

    return () => {
      pc?.close();
      dcRef.current = null;
      streamRef.current = null;
      void sb.removeChannel(ch);
    };
  }, [pairId]);

  /** Nouveau code d'appairage (nouveau QR). */
  const pair = useCallback(() => {
    const id = newPairId();
    writePair(slug, id);
    setStatus("waiting");
    setPairId(id);
    return id;
  }, [slug]);

  /** Oublier l'iPhone : retour a la camera de la borne. */
  const unpair = useCallback(() => {
    writePair(slug, null);
    setPairId(null);
    setStatus("off");
  }, [slug]);

  /** Photo pleine definition prise sur l'iPhone ; null si pas de reponse en 8 s. */
  const requestPhoto = useCallback(async (): Promise<{ blob: Blob; facing: Facing } | null> => {
    const dc = dcRef.current;
    if (!dc || dc.readyState !== "open") return null;
    const id = Math.random().toString(36).slice(2);
    const result = new Promise<{ blob: Blob; facing: Facing } | null>((resolve) => {
      pending.current.set(id, { resolve, chunks: [], got: 0, size: 0, mime: "image/jpeg", facing: "environment" });
      setTimeout(() => {
        if (pending.current.delete(id)) resolve(null);
      }, 8000);
    });
    dc.send(JSON.stringify({ t: "snap", id } satisfies Control));
    return result;
  }, []);

  return { pairId, status, facing, stream: streamRef, pair, unpair, requestPhoto };
}
