"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { HandLandmarker } from "@mediapipe/tasks-vision";
import QRCode from "qrcode";
import type { CampaignConfig, Gesture, Locale } from "@/lib/photobooth/config";
import { classifyGesture, GestureStabilizer } from "@/lib/photobooth/gestures";
import { buildMoodProfile, type Answers } from "@/lib/photobooth/mood";
import { ERROR_ALIAS, ERRORS, GESTURE_GLYPH, UI } from "./strings";
import s from "./booth.module.css";

type Step = "attract" | "camera" | "scan" | "quiz" | "mood" | "capture" | "confirm" | "generating" | "result" | "error";
type Tracker = "idle" | "loading" | "ready" | "failed";

const POLL_MS = 3000;
const GEN_DEADLINE_MS = 4 * 60_000;
const IDLE_MS = 90_000;
const MAX_SIDE = 1536;

const uuid = () => crypto.randomUUID();

export function Booth({
  slug, accessKey, config, blocked,
}: { slug: string; accessKey: string; config: CampaignConfig; blocked: string | null }) {
  const [locale, setLocale] = useState<Locale>(config.defaultLocale);
  const [step, setStep] = useState<Step>("attract");
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [chosen, setChosen] = useState<string | null>(null);
  const [tracker, setTracker] = useState<Tracker>("idle");
  const [live, setLive] = useState<{ gesture: Gesture | null; progress: number }>({ gesture: null, progress: 0 });
  const [count, setCount] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);
  const [photo, setPhoto] = useState<{ blob: Blob; url: string } | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [qr, setQr] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const landmarkerRef = useRef<HandLandmarker | null>(null);
  const sessionRef = useRef(uuid());
  const idemRef = useRef<string | null>(null);
  const usageRef = useRef<string | null>(null);
  const pollRef = useRef<number | null>(null);

  const t = UI[locale];
  const err = ERRORS[locale];
  const rtl = locale === "ar";
  const mood = useMemo(
    () => (answers.length === 3 ? buildMoodProfile(answers as Answers, config) : null),
    [answers, config],
  );

  // ---------- camera ----------
  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((tr) => tr.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  const fail = useCallback((code: string) => {
    setErrorCode(ERROR_ALIAS[code] ?? code);
    setStep("error");
  }, []);

  // ---------- hand tracking (local, rien n'est envoye) ----------
  const loadTracker = useCallback(async () => {
    if (landmarkerRef.current) return setTracker("ready");
    setTracker("loading");
    try {
      const { FilesetResolver, HandLandmarker } = await import("@mediapipe/tasks-vision");
      const files = await FilesetResolver.forVisionTasks("/photobooth/mediapipe/wasm");
      const make = (delegate: "GPU" | "CPU") =>
        HandLandmarker.createFromOptions(files, {
          baseOptions: { modelAssetPath: "/photobooth/mediapipe/hand_landmarker.task", delegate },
          runningMode: "VIDEO",
          numHands: 1,
          minHandDetectionConfidence: 0.6,
          minHandPresenceConfidence: 0.6,
          minTrackingConfidence: 0.5,
        });
      landmarkerRef.current = await make("GPU").catch(() => make("CPU"));
      setTracker("ready");
    } catch {
      setTracker("failed"); // le quiz reste faisable au toucher
    }
  }, []);

  const startCamera = useCallback(async () => {
    setStep("camera");
    if (!navigator.mediaDevices?.getUserMedia) return fail("CAMERA_UNAVAILABLE");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      });
      streamRef.current = stream;
      const v = videoRef.current!;
      v.srcObject = stream;
      await v.play();
      setStep("scan");
      loadTracker();
    } catch (e) {
      const name = (e as DOMException)?.name;
      fail(name === "NotAllowedError" || name === "SecurityError" ? "CAMERA_DENIED" : "CAMERA_UNAVAILABLE");
    }
  }, [fail, loadTracker]);

  useEffect(() => () => {
    stopCamera();
    landmarkerRef.current?.close();
    if (pollRef.current) window.clearTimeout(pollRef.current);
  }, [stopCamera]);

  // ---------- flow ----------
  const reset = useCallback(() => {
    stopCamera();
    if (pollRef.current) window.clearTimeout(pollRef.current);
    if (photo) URL.revokeObjectURL(photo.url);
    setPhoto(null);
    setResultUrl(null);
    setQr(null);
    setAnswers([]);
    setQIndex(0);
    setChosen(null);
    setErrorCode(null);
    setCount(null);
    idemRef.current = null;
    usageRef.current = null;
    sessionRef.current = uuid();
    setStep("attract");
  }, [photo, stopCamera]);

  // Scan : animation de calibrage, puis quiz.
  useEffect(() => {
    if (step !== "scan") return;
    const id = window.setTimeout(() => setStep("quiz"), 2800);
    return () => window.clearTimeout(id);
  }, [step]);

  // Retour a l'accueil si la borne reste sans interaction.
  useEffect(() => {
    if (step === "attract" || step === "generating") return;
    const id = window.setTimeout(reset, IDLE_MS);
    return () => window.clearTimeout(id);
  }, [step, qIndex, reset]);

  const choose = useCallback((optionId: string) => {
    if (chosen) return;
    setChosen(optionId);
    window.setTimeout(() => {
      setAnswers((a) => {
        const next = [...a.slice(0, qIndex), optionId];
        if (next.length === 3) setStep("mood");
        else setQIndex(next.length);
        return next;
      });
      setChosen(null);
    }, 650);
  }, [chosen, qIndex]);

  // Boucle de detection pendant le quiz.
  useEffect(() => {
    if (step !== "quiz" || tracker !== "ready") return;
    const lm = landmarkerRef.current!;
    const v = videoRef.current!;
    const stab = new GestureStabilizer(900, 250);
    const question = config.questions[qIndex];
    let raf = 0;
    let lastTime = -1;
    // Arme seulement quand la main a change ou disparu : un geste tenu ne
    // repond pas a la question suivante tout seul.
    let armed = qIndex === 0;
    const previous = qIndex > 0
      ? config.questions[qIndex - 1].options.find((o) => o.id === answers[qIndex - 1])?.gesture ?? null
      : null;
    let lastUi = "";

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (v.readyState < 2 || v.currentTime === lastTime) return;
      lastTime = v.currentTime;
      let g: Gesture | null = null;
      try {
        const res = lm.detectForVideo(v, performance.now());
        g = res.landmarks?.[0] ? classifyGesture(res.landmarks[0]) : null;
      } catch {
        return;
      }
      if (!armed && (g === null || g !== previous)) armed = true;
      const r = armed ? stab.update(g, performance.now()) : { gesture: g, progress: 0, confirmed: false };
      const key = `${r.gesture}:${Math.round(r.progress * 20)}`;
      if (key !== lastUi) {
        lastUi = key;
        setLive({ gesture: r.gesture, progress: r.progress });
      }
      if (r.confirmed && r.gesture) {
        const opt = question.options.find((o) => o.gesture === r.gesture);
        if (opt) {
          cancelAnimationFrame(raf);
          choose(opt.id);
        }
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [step, tracker, qIndex, config.questions, answers, choose]);

  // ---------- capture ----------
  const snap = useCallback(() => {
    const v = videoRef.current;
    if (!v || !v.videoWidth) return fail("CAPTURE_FAILED");
    const [aw, ah] = config.aspectRatio.split(":").map(Number);
    const target = aw / ah;
    let sw = v.videoWidth;
    let sh = v.videoHeight;
    if (sw / sh > target) sw = Math.round(sh * target);
    else sh = Math.round(sw / target);
    const sx = (v.videoWidth - sw) / 2;
    const sy = (v.videoHeight - sh) / 2;
    const scale = Math.min(1, MAX_SIDE / Math.max(sw, sh));
    const c = document.createElement("canvas");
    c.width = Math.round(sw * scale);
    c.height = Math.round(sh * scale);
    const ctx = c.getContext("2d")!;
    // Meme miroir que l'apercu : la photo ressemble a ce que la personne a vu.
    ctx.translate(c.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(v, sx, sy, sw, sh, 0, 0, c.width, c.height);
    c.toBlob((blob) => {
      if (!blob || blob.size > config.maxUploadBytes) return fail(blob ? "UPLOAD_TOO_LARGE" : "CAPTURE_FAILED");
      setFlash(true);
      window.setTimeout(() => setFlash(false), 450);
      setPhoto({ blob, url: URL.createObjectURL(blob) });
      idemRef.current = uuid(); // une photo confirmee = une cle = au plus une image facturee
      setStep("confirm");
    }, "image/jpeg", 0.92);
  }, [config.aspectRatio, config.maxUploadBytes, fail]);

  const startCountdown = useCallback(() => {
    if (count !== null) return;
    let n = config.countdownSeconds;
    if (n === 0) return snap();
    setCount(n);
    const id = window.setInterval(() => {
      n -= 1;
      if (n <= 0) {
        window.clearInterval(id);
        setCount(null);
        snap();
      } else setCount(n);
    }, 1000);
  }, [config.countdownSeconds, count, snap]);

  const retake = useCallback(() => {
    if (photo) URL.revokeObjectURL(photo.url);
    setPhoto(null);
    idemRef.current = null;
    setStep("capture");
  }, [photo]);

  // ---------- generation ----------
  const poll = useCallback((usageId: string, deadline: number) => {
    const tick = async () => {
      if (Date.now() > deadline) return fail("TIMEOUT");
      try {
        const r = await fetch(`/api/photobooth/status/${usageId}?session=${encodeURIComponent(sessionRef.current)}`, { cache: "no-store" });
        const j = await r.json();
        if (j.status === "succeeded") {
          setResultUrl(j.image);
          if (config.shareEnabled && j.shareUrl) {
            QRCode.toString(j.shareUrl, { type: "svg", margin: 1, errorCorrectionLevel: "M", color: { dark: "#0d0c14", light: "#f5f5f8" } })
              .then(setQr).catch(() => setQr(null));
          }
          stopCamera();
          setStep("result");
          return;
        }
        if (j.status === "failed") return fail(j.error ?? "DEFAULT");
        if (j.status === "unknown") return fail("UNKNOWN");
        if (j.status === "not_found") return fail("DEFAULT");
      } catch {
        /* reseau : on reessaie au prochain tour */
      }
      pollRef.current = window.setTimeout(tick, POLL_MS);
    };
    pollRef.current = window.setTimeout(tick, 1500);
  }, [config.shareEnabled, fail, stopCamera]);

  const generate = useCallback(async () => {
    if (!photo || !idemRef.current) return;
    setStep("generating");
    const fd = new FormData();
    fd.set("slug", slug);
    fd.set("k", accessKey);
    fd.set("session", sessionRef.current);
    fd.set("idem", idemRef.current);
    fd.set("answers", JSON.stringify(answers));
    fd.set("image", photo.blob, "portrait.jpg");
    try {
      const r = await fetch("/api/photobooth/generate", { method: "POST", body: fd });
      const j = await r.json();
      if (!j.ok) return fail(j.error ?? "DEFAULT");
      usageRef.current = j.usageId;
      poll(j.usageId, Date.now() + GEN_DEADLINE_MS);
    } catch {
      fail("DEFAULT");
    }
  }, [accessKey, answers, fail, photo, poll, slug]);

  const resumeCheck = useCallback(() => {
    if (!usageRef.current) return reset();
    setStep("generating");
    poll(usageRef.current, Date.now() + GEN_DEADLINE_MS);
  }, [poll, reset]);

  // ---------- render ----------
  const cameraOn = ["scan", "quiz", "mood", "capture"].includes(step);
  const question = config.questions[qIndex];
  const errorText = errorCode === "QUOTA_EXHAUSTED"
    ? config.quotaMessage[locale]
    : err[errorCode ?? "DEFAULT"] ?? err.DEFAULT;
  const canRetry = errorCode && ["DEFAULT", "CONCURRENCY_LIMIT_REACHED", "PROVIDER_BUSY", "RATE_LIMITED", "PROVIDER_FAILED", "UPLOAD_FAILED", "PROVIDER_NSFW", "CAPTURE_FAILED"].includes(errorCode)
    || (errorCode && !(errorCode in err) && errorCode !== "QUOTA_EXHAUSTED");

  return (
    <div className={`fm ${s.stage}`} dir={rtl ? "rtl" : "ltr"} lang={locale}>
      <video
        ref={videoRef}
        className={s.video}
        playsInline
        muted
        style={{ opacity: cameraOn ? 1 : 0, filter: step === "mood" ? "blur(18px) brightness(0.5)" : "none" }}
      />
      <div className={s.veil} />
      {flash && <div className={s.flash} />}

      {/* barre haute : marque + langues */}
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-5 md:p-8">
        <div className="flex items-center gap-4">
          <span dir="ltr" className="fm-display text-sm tracking-[0.06em]">FMRXR<span className="text-fmaccent">{"//"}</span></span>
          {config.clientLogoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={config.clientLogoUrl} alt="" className="h-7 w-auto opacity-90" />
          )}
        </div>
        {step === "attract" && config.locales.length > 1 && (
          <div className="flex gap-1 font-mono text-xs">
            {config.locales.map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`rounded px-2.5 py-1.5 uppercase ${l === locale ? "bg-fmfg text-fmbg" : "text-fmmuted hover:text-fmfg"}`}
              >
                {l}
              </button>
            ))}
          </div>
        )}
        {step !== "attract" && step !== "generating" && (
          <button onClick={reset} className="font-mono text-xs uppercase tracking-[0.14em] text-fmmuted hover:text-fmfg">
            {t.restart}
          </button>
        )}
      </header>

      <main className="relative z-10 flex h-full flex-col">
        {step === "attract" && (
          <section className={`${s.enter} m-auto flex max-w-3xl flex-col items-center gap-8 px-6 text-center`}>
            <div className={s.field} />
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fmaccent">AI Mood Photobooth</p>
            <h1 className="fm-display text-[clamp(3rem,11vw,9rem)]">{config.title[locale]}</h1>
            <p className="max-w-xl text-lg text-fmfg/80 md:text-xl">{config.intro[locale]}</p>
            {blocked ? (
              <p className="rounded-md border border-fmborder bg-fmcard/80 px-5 py-4 text-fmmuted">{err[blocked] ?? err.CAMPAIGN_INACTIVE}</p>
            ) : (
              <button onClick={startCamera} className="rounded-full bg-fmfg px-10 py-4 text-lg font-semibold text-fmbg transition hover:bg-fmaccent">
                {t.start}
              </button>
            )}
            <p className="max-w-lg text-xs leading-relaxed text-fmmuted">{config.privacy[locale]}</p>
          </section>
        )}

        {step === "camera" && (
          <section className="m-auto px-6 text-center">
            <p className={`${s.pulse} font-mono text-xs uppercase tracking-[0.2em] text-fmmuted`}>{t.starting}</p>
          </section>
        )}

        {step === "scan" && (
          <>
            <div className={s.frame} style={{ aspectRatio: config.aspectRatio.replace(":", "/") }}>
              <div className="absolute inset-0 overflow-hidden"><div className={s.scanLine} /></div>
            </div>
            <div className={s.field} />
            <section className="mt-auto p-8 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fmaccent">{t.scanning}</p>
              <p className="fm-display mt-2 text-3xl md:text-5xl">{t.scanHint}</p>
            </section>
          </>
        )}

        {step === "quiz" && question && (
          <section key={qIndex} className={`${s.enter} mt-auto flex flex-col gap-6 p-5 pb-8 md:p-10`}>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fmaccent">
                {t.question} <bdi dir="ltr">{qIndex + 1} / 3</bdi>
              </p>
              <h2 className="fm-display mt-3 text-[clamp(2rem,5.5vw,4.5rem)]">{question.prompt[locale]}</h2>
              <p className="mt-3 text-sm text-fmmuted">
                {tracker === "failed" ? t.manualOnly : live.gesture ? t.gestureHint : t.noHand}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {question.options.map((o) => {
                const active = live.gesture === o.gesture;
                const picked = chosen === o.id;
                const C = 2 * Math.PI * 22;
                return (
                  <button
                    key={o.id}
                    onClick={() => choose(o.id)}
                    className={`group flex min-h-28 items-center gap-4 rounded-xl border p-4 text-start backdrop-blur-md transition ${
                      picked ? "border-fmaccent bg-fmaccent/20" : active ? "border-fmfg/60 bg-fmcard/80" : "border-fmborder bg-fmcard/60 hover:border-fmfg/40"
                    }`}
                  >
                    <span className="relative grid size-14 shrink-0 place-items-center text-2xl">
                      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 50 50" aria-hidden>
                        <circle cx="25" cy="25" r="22" fill="none" stroke="rgba(245,245,248,0.12)" strokeWidth="2" />
                        <circle
                          cx="25" cy="25" r="22" fill="none" stroke="var(--color-fmaccent)" strokeWidth="2.5"
                          strokeDasharray={C} strokeDashoffset={C * (1 - (picked ? 1 : active ? live.progress : 0))}
                          className={s.ring}
                        />
                      </svg>
                      <span aria-hidden>{GESTURE_GLYPH[o.gesture]}</span>
                    </span>
                    <span className="text-base leading-snug md:text-lg">{o.label[locale]}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {step === "mood" && mood && (
          <section className={`${s.enter} m-auto flex max-w-3xl flex-col items-center gap-7 px-6 text-center`}>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fmaccent">{t.moodLabel}</p>
            <h2 className="fm-display text-[clamp(2.5rem,8vw,6.5rem)]">{mood.title[locale]}</h2>
            <div className="flex gap-2">
              {mood.palette.map((c) => (
                <span key={c} className="h-12 w-12 rounded-full border border-white/10 md:h-16 md:w-16" style={{ background: c }} />
              ))}
            </div>
            <p className="text-fmfg/80">{mood.description[locale]}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={() => setStep("capture")} className="rounded-full bg-fmfg px-8 py-3.5 font-semibold text-fmbg transition hover:bg-fmaccent">
                {t.continue}
              </button>
              <button onClick={() => { setAnswers([]); setQIndex(0); setStep("quiz"); }} className="rounded-full border border-fmborder px-8 py-3.5 text-fmfg/80 hover:border-fmfg/50">
                {t.restart}
              </button>
            </div>
          </section>
        )}

        {step === "capture" && (
          <>
            <div className={s.frame} style={{ aspectRatio: config.aspectRatio.replace(":", "/") }} />
            {count !== null && (
              <div className="pointer-events-none absolute inset-0 grid place-items-center">
                <span key={count} className={`${s.enter} fm-display text-[30vh] text-fmfg/90`}>{count}</span>
              </div>
            )}
            <section className="mt-auto flex flex-col items-center gap-4 p-8 text-center">
              <p className="text-fmfg/80">{t.frame}</p>
              <button
                onClick={startCountdown}
                disabled={count !== null}
                aria-label={t.capture}
                className="grid size-20 place-items-center rounded-full border-2 border-fmfg/80 transition hover:border-fmaccent disabled:opacity-40"
              >
                <span className="size-14 rounded-full bg-fmfg" />
              </button>
            </section>
          </>
        )}

        {step === "confirm" && photo && (
          <section className={`${s.enter} m-auto flex flex-col items-center gap-6 px-6 py-24 text-center`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.url} alt="" className="max-h-[58vh] rounded-xl border border-fmborder object-contain" />
            <p className="max-w-md text-xs text-fmmuted">{t.confirmNote}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={generate} className="rounded-full bg-fmfg px-8 py-3.5 font-semibold text-fmbg transition hover:bg-fmaccent">
                {t.confirm}
              </button>
              <button onClick={retake} className="rounded-full border border-fmborder px-8 py-3.5 text-fmfg/80 hover:border-fmfg/50">
                {t.retake}
              </button>
            </div>
          </section>
        )}

        {step === "generating" && (
          <section className="m-auto flex flex-col items-center gap-6 px-6 text-center">
            <div className={s.field} />
            {photo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photo.url} alt="" className={`${s.pulse} max-h-[42vh] rounded-xl object-contain grayscale`} />
            )}
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fmaccent">{mood?.title[locale]}</p>
            <h2 className="fm-display text-[clamp(2rem,6vw,4.5rem)]">{t.generating}</h2>
            <p className="text-sm text-fmmuted">{t.generatingHint}</p>
          </section>
        )}

        {step === "result" && resultUrl && (
          <section className={`${s.enter} m-auto flex w-full flex-col items-center gap-6 px-5 py-20 text-center`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={resultUrl} alt={mood?.title[locale] ?? ""} className="max-h-[68vh] max-w-full rounded-xl object-contain shadow-2xl" />
            {mood && (
              <div>
                <p className="fm-display text-3xl md:text-5xl">{mood.title[locale]}</p>
                <p className="mt-2 text-sm text-fmmuted">{mood.description[locale]}</p>
              </div>
            )}
            {qr && (
              <div className="flex items-center gap-4 rounded-xl border border-fmborder bg-fmcard/80 p-3 text-start">
                <div className="size-28 shrink-0 overflow-hidden rounded-md [&>svg]:h-full [&>svg]:w-full" dangerouslySetInnerHTML={{ __html: qr }} />
                <p className="max-w-[16rem] text-sm text-fmfg/80">{t.scanToGet}</p>
              </div>
            )}
            <div className="flex flex-wrap justify-center gap-3">
              <a href={`${resultUrl}&dl=1`} className="rounded-full bg-fmfg px-8 py-3.5 font-semibold text-fmbg transition hover:bg-fmaccent">
                {t.download}
              </a>
              <button onClick={reset} className="rounded-full border border-fmborder px-8 py-3.5 text-fmfg/80 hover:border-fmfg/50">
                {t.done}
              </button>
            </div>
          </section>
        )}

        {step === "error" && (
          <section className={`${s.enter} m-auto flex max-w-xl flex-col items-center gap-6 px-6 text-center`}>
            <p className="fm-display text-[clamp(1.6rem,4vw,2.8rem)] normal-case">{errorText}</p>
            <div className="flex flex-wrap justify-center gap-3">
              {errorCode === "TIMEOUT" && (
                <button onClick={resumeCheck} className="rounded-full bg-fmfg px-8 py-3.5 font-semibold text-fmbg">{t.retry}</button>
              )}
              {canRetry && photo && errorCode !== "TIMEOUT" && (
                <button onClick={retake} className="rounded-full bg-fmfg px-8 py-3.5 font-semibold text-fmbg">{t.retry}</button>
              )}
              {(errorCode === "CAMERA_DENIED" || errorCode === "CAMERA_UNAVAILABLE") && (
                <button onClick={startCamera} className="rounded-full bg-fmfg px-8 py-3.5 font-semibold text-fmbg">{t.retry}</button>
              )}
              <button onClick={reset} className="rounded-full border border-fmborder px-8 py-3.5 text-fmfg/80 hover:border-fmfg/50">{t.exit}</button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
