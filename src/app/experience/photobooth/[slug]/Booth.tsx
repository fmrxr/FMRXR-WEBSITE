"use client";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { GestureRecognizer } from "@mediapipe/tasks-vision";
import QRCode from "qrcode";
import type { CampaignConfig, Gesture, Locale } from "@/lib/photobooth/config";
import { decideGesture, GestureStabilizer, type Point } from "@/lib/photobooth/gestures";
import { buildMoodProfile, type Answers, type Shot } from "@/lib/photobooth/mood";
import { ERROR_ALIAS, ERRORS, GESTURE_GLYPH, UI } from "./strings";
import s from "./booth.module.css";
import { PAGE_SIZE, usePrinter } from "./usePrinter";
import { useExpressionReader } from "./useExpression";
import { TeamGallery } from "./TeamGallery";
import { CameraPicker, readCamera } from "./CameraPicker";
import { useRemoteCamera } from "./useRemoteCamera";
import { RemotePair } from "./RemotePair";
import { EXPRESSION_LABEL } from "@/lib/photobooth/expression";
import { STYLES, type StyleId } from "@/lib/photobooth/styles";

type Step = "attract" | "camera" | "scan" | "howto" | "shot" | "style" | "quiz" | "mood" | "capture" | "confirm" | "generating" | "result" | "error";
type Tracker = "idle" | "loading" | "ready" | "failed";

const POLL_MS = 3000;
const GEN_DEADLINE_MS = 4 * 60_000;
const IDLE_MS = 90_000;
// Cote long de la photo envoyee. Test IQOS du 16/10 : en pied, bras leves,
// le visage ne faisait qu'une centaine de pixels sur une photo 810x1080, et le
// modele reinventait des traits qui ne ressemblaient plus a la personne.
const MAX_SIDE = 2048;

const uuid = () => crypto.randomUUID();

// Portrait seul ou photo de groupe : memes gestes que le quiz.
const SHOT_OPTIONS: { id: Shot; gesture: Gesture; labelKey: "shotSolo" | "shotGroup" }[] = [
  { id: "solo", gesture: "open_palm", labelKey: "shotSolo" },
  { id: "group", gesture: "peace", labelKey: "shotGroup" },
];

// Tutoriel des gestes : les visiteurs n'ont jamais repondu avec la main.
// Ils s'entrainent sur la main ouverte pour passer a la suite.
const HOWTO_OPTIONS: { id: string; gesture: Gesture }[] = [{ id: "go", gesture: "open_palm" }];
// Apres le quiz, tout se fait aussi a la main : pouce leve = valider, V = reprendre.
const MOOD_OPTIONS: { id: string; gesture: Gesture }[] = [{ id: "continue", gesture: "thumb_up" }];
const CAPTURE_OPTIONS: { id: string; gesture: Gesture }[] = [{ id: "shoot", gesture: "thumb_up" }];
const CONFIRM_OPTIONS: { id: string; gesture: Gesture }[] = [
  { id: "confirm", gesture: "thumb_up" },
  { id: "retake", gesture: "peace" },
];
const GESTURE_STEPS = ["howto", "shot", "quiz", "mood", "capture", "confirm"];
// Ou s'affiche le retour du geste : grand cadre sur les ecrans de choix,
// bandeau sur ceux dont le centre est deja occupe (ambiance, photo).
const ZONE_STEPS = ["howto", "shot", "quiz"];
const PILL_STEPS = ["mood", "capture", "confirm"];

/**
 * Moteur de detection de la main : GPU (WebGL) par defaut, CPU en secours.
 * Sur iPhone (iOS 18.7, Safari 26.5, 15/10/2026) le GPU fonctionne : les
 * « None » venaient d'une main a moitie hors champ, pas du moteur.
 * Pour comparer sur place : &delegate=cpu ou &delegate=gpu.
 */
function preferredDelegate(): "GPU" | "CPU" {
  return new URLSearchParams(window.location.search).get("delegate") === "cpu" ? "CPU" : "GPU";
}

// MediaPipe ecrit des messages d'information de son moteur (ex. « INFO: Created
// TensorFlow Lite XNNPACK delegate for CPU. ») via console.error. Ce ne sont
// pas des erreurs, mais Next.js les affiche comme telles en developpement. On
// ne retire que ces lignes « INFO: », tout le reste passe.
let mediapipeInfoFiltered = false;
function filterMediapipeInfo() {
  if (mediapipeInfoFiltered) return;
  mediapipeInfoFiltered = true;
  const original = console.error;
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].startsWith("INFO: ")) return;
    original(...args);
  };
}

export function Booth({
  slug, accessKey, config, blocked,
}: { slug: string; accessKey: string; config: CampaignConfig; blocked: string | null }) {
  const [locale, setLocale] = useState<Locale>(config.defaultLocale);
  const [step, setStep] = useState<Step>("attract");
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [qIndex, setQIndex] = useState(0);
  // Portrait seul ou photo de groupe (ecran apres le scan), et format de capture.
  const [shot, setShot] = useState<Shot | null>(null);
  // Style choisi parmi ceux actives pour la campagne (un seul = pas d'ecran).
  const [style, setStyle] = useState<StyleId>(config.styles[0]);
  const [captureAspect, setCaptureAspect] = useState<CampaignConfig["aspectRatio"]>(config.aspectRatio);
  const [answers, setAnswers] = useState<string[]>([]);
  // Camera choisie sur cette borne (CameraPicker), memorisee dans le navigateur.
  const [cameraId, setCameraId] = useState<string | null>(() => (typeof window === "undefined" ? null : readCamera(slug)));
  // Camera iPhone a distance (QR, meme Wi-Fi) : prioritaire quand elle est connectee.
  const remote = useRemoteCamera(slug);
  const [pairOpen, setPairOpen] = useState(false);
  const [usingRemote, setUsingRemote] = useState(false);
  const [chosen, setChosen] = useState<string | null>(null);
  const [tracker, setTracker] = useState<Tracker>("idle");
  // hand : une main est dans l'image (meme sans geste reconnu) ;
  // waiting : le geste qui vient de valider l'etape precedente est encore tenu.
  type Live = { gesture: Gesture | null; progress: number; hand: boolean; waiting: boolean };
  const IDLE_LIVE: Live = { gesture: null, progress: 0, hand: false, waiting: false };
  const [live, setLive] = useState<Live>(IDLE_LIVE);
  const [count, setCount] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);
  const [photo, setPhoto] = useState<{ blob: Blob; url: string } | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [qr, setQr] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const landmarkerRef = useRef<GestureRecognizer | null>(null);
  const trackerLoading = useRef(false); // un seul chargement a la fois (recommencer pendant le chargement)
  const delegateRef = useRef<"GPU" | "CPU" | null>(null);
  // Mode calibrage operateur : ?debug=1 affiche squelette, score, fps, lumiere.
  const debug = useSyncExternalStore(
    () => () => {},
    () => new URLSearchParams(window.location.search).get("debug") === "1",
    () => false,
  );
  // Statut imprimante surveille a l'accueil (pour l'equipe) et sur le resultat.
  const printer = usePrinter(config.print, step === "attract" || step === "result" || debug);
  const resetPrints = printer.reset;
  // Lecture d'expression locale pendant le scan et le debut du quiz.
  // En groupe, la lecture d'expression (un seul visage) n'a pas de sens.
  const expression = useExpressionReader(videoRef, (step === "scan" || step === "howto" || step === "shot" || step === "quiz") && shot !== "group");
  const resetExpression = expression.reset;
  // Dernier geste qui a valide une etape : tant qu'il reste tenu, l'etape
  // suivante ne s'arme pas (un pouce leve ne valide pas deux ecrans d'affilee).
  const lastGestureRef = useRef<Gesture | null>(null);
  // Actions declarees plus bas (photo, generation) : la boucle les lit ici.
  const actionsRef = useRef<{ shoot: () => void; confirm: () => void; retake: () => void }>({
    shoot: () => {}, confirm: () => {}, retake: () => {},
  });
  const debugRef = useRef<{ category: string; score: number; decided: Gesture | null; fps: number; landmarks: Point[] | null }>(
    { category: "-", score: 0, decided: null, fps: 0, landmarks: null },
  );
  const [calib, setCalib] = useState({ delegate: "-", cam: "0×0", fps: 0, luma: 0, category: "-", score: 0, decided: null as Gesture | null });
  const [lowLight, setLowLight] = useState(false);
  const lumaRef = useRef(0);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const sessionRef = useRef(uuid());
  const idemRef = useRef<string | null>(null);
  const usageRef = useRef<string | null>(null);
  const pollRef = useRef<number | null>(null);

  const t = UI[locale];
  const err = ERRORS[locale];
  const rtl = locale === "ar";
  const mood = useMemo(
    () => (answers.length === config.questions.length ? buildMoodProfile(answers as Answers, config) : null),
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
  const loadTracker = useCallback(async (cpuOnly = false) => {
    filterMediapipeInfo();
    if (landmarkerRef.current) return setTracker("ready");
    if (trackerLoading.current) return;
    trackerLoading.current = true;
    setTracker("loading");
    const t0 = performance.now();
    try {
      // Modele officiel GestureRecognizer (il contient aussi le suivi de la main).
      const { FilesetResolver, GestureRecognizer } = await import("@mediapipe/tasks-vision");
      const files = await FilesetResolver.forVisionTasks("/photobooth/mediapipe/wasm");
      const make = async (delegate: "GPU" | "CPU") => {
        const r = await GestureRecognizer.createFromOptions(files, {
          baseOptions: { modelAssetPath: "/photobooth/mediapipe/gesture_recognizer.task", delegate },
          runningMode: "VIDEO",
          numHands: 1,
          minHandDetectionConfidence: 0.5,
          minHandPresenceConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });
        delegateRef.current = delegate;
        return r;
      };
      // GPU (WebGL) d'abord ; certains telephones et navigateurs le refusent : CPU.
      // Apres un plantage en cours de route, on repart directement en CPU.
      landmarkerRef.current = cpuOnly || preferredDelegate() === "CPU"
        ? await make("CPU")
        : await make("GPU").catch(() => make("CPU"));
      setTracker("ready");
      console.warn(`photobooth: modele pret en ${Math.round(performance.now() - t0)} ms (${delegateRef.current})`);
    } catch (e) {
      console.error("photobooth: chargement du modele impossible", e);
      setTracker("failed"); // le quiz reste faisable au toucher
    } finally {
      trackerLoading.current = false;
    }
  }, []);

  const startCamera = useCallback(async () => {
    setStep("camera");
    if (!navigator.mediaDevices?.getUserMedia) return fail("CAMERA_UNAVAILABLE");
    // Le modele des gestes se charge pendant l'autorisation camera et le scan,
    // pas apres : il est pret quand arrive la premiere question.
    loadTracker();
    // iPhone connecte par QR : son flux remplace la camera de la borne.
    if (remote.status === "connected" && remote.stream.current) {
      const v = videoRef.current!;
      v.srcObject = remote.stream.current;
      await v.play().catch(() => undefined);
      setUsingRemote(true);
      setStep("scan");
      return;
    }
    setUsingRemote(false);
    // Camera choisie sur cette borne (webcam USB, iPhone en webcam...), sinon
    // la camera frontale par defaut.
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const constraints = (deviceId: string | null): MediaStreamConstraints => ({
      // Telephone / tablette : 1280x720 suffit au portrait et divise par deux la
      // memoire de l'image. Sur iPhone, Safari tue l'onglet (et le recharge)
      // quand camera pleine resolution + MediaPipe depassent sa limite memoire.
      video: {
        ...(deviceId ? { deviceId: { exact: deviceId } } : { facingMode: "user" }),
        // Poste fixe / borne : la meilleure definition de la webcam (jusqu'a 4K),
        // sans sacrifier la fluidite de l'apercu et du suivi de la main.
        ...(coarse
          ? { width: { ideal: 1280 }, height: { ideal: 720 } }
          : { width: { ideal: 3840 }, height: { ideal: 2160 }, frameRate: { ideal: 30 } }),
      },
      audio: false,
    });
    try {
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints(cameraId));
      } catch (e) {
        // Camera memorisee debranchee : on repart sur la camera par defaut.
        const name = (e as DOMException)?.name;
        if (!cameraId || (name !== "OverconstrainedError" && name !== "NotFoundError" && name !== "NotReadableError")) throw e;
        setCameraId(null);
        stream = await navigator.mediaDevices.getUserMedia(constraints(null));
      }
      streamRef.current = stream;
      const v = videoRef.current!;
      v.srcObject = stream;
      await v.play();
      setStep("scan");
    } catch (e) {
      const name = (e as DOMException)?.name;
      fail(name === "NotAllowedError" || name === "SecurityError" ? "CAMERA_DENIED" : "CAMERA_UNAVAILABLE");
    }
  }, [fail, loadTracker, cameraId, remote.status, remote.stream]);

  useEffect(() => () => {
    stopCamera();
    // Oublier le moteur ferme : sinon, au remontage (rechargement a chaud en
    // dev, double montage de React en mode strict), la boucle lui envoie des
    // images et MediaPipe s'arrete sur « Aborted() ».
    landmarkerRef.current?.close();
    landmarkerRef.current = null;
    if (pollRef.current) window.clearTimeout(pollRef.current);
  }, [stopCamera]);

  // ---------- flow ----------
  const reset = useCallback(() => {
    stopCamera();
    lastGestureRef.current = null;
    if (pollRef.current) window.clearTimeout(pollRef.current);
    if (photo) URL.revokeObjectURL(photo.url);
    setPhoto(null);
    setResultUrl(null);
    setQr(null);
    resetPrints();
    resetExpression();
    setAnswers([]);
    setQIndex(0);
    setShot(null);
    setStyle(config.styles[0]);
    setCaptureAspect(config.aspectRatio);
    setChosen(null);
    setErrorCode(null);
    setCount(null);
    idemRef.current = null;
    usageRef.current = null;
    sessionRef.current = uuid();
    setStep("attract");
  }, [photo, stopCamera, resetPrints, resetExpression, config.aspectRatio, config.styles]);

  // Scan : animation de calibrage, puis quiz.
  useEffect(() => {
    if (step !== "scan") return;
    const id = window.setTimeout(() => setStep("howto"), 2800);
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
        if (next.length === config.questions.length) setStep("mood");
        else setQIndex(next.length);
        return next;
      });
      setChosen(null);
    }, 650);
  }, [chosen, qIndex, config.questions.length]);

  const leaveHowto = useCallback(() => {
    if (chosen) return;
    setChosen("go");
    window.setTimeout(() => {
      setChosen(null);
      setStep("shot");
    }, 650);
  }, [chosen]);

  const chooseShot = useCallback((id: string) => {
    if (chosen) return;
    setChosen(id);
    const v = videoRef.current;
    const landscape = (v?.videoWidth ?? 0) > (v?.videoHeight ?? 0);
    window.setTimeout(() => {
      setShot(id as Shot);
      // Groupe devant une camera en paysage : 4:3 horizontal pour ne couper
      // personne (le serveur refait ce calcul d'apres la photo recue).
      setCaptureAspect(id === "group" && landscape ? "4:3" : config.aspectRatio);
      setChosen(null);
      setStep(config.styles.length > 1 ? "style" : "quiz");
    }, 650);
  }, [chosen, config.aspectRatio, config.styles.length]);

  // Boucle de detection : tutoriel, choix portrait/groupe, quiz, puis
  // validation de l'ambiance, prise de vue et confirmation.
  useEffect(() => {
    if (!GESTURE_STEPS.includes(step) || tracker !== "ready") return;
    const lm = landmarkerRef.current;
    // Moteur ferme entre-temps (composant remonte) : on le recharge, la boucle
    // repartira quand il sera pret.
    if (!lm) {
      loadTracker();
      return;
    }
    // Le modele analyse une vignette de largeur fixe plutot que l'image pleine
    // resolution de la camera : plus leger pour le GPU, et la taille d'entree
    // ne change pas si la webcam renegocie sa resolution apres demarrage (cause
    // connue de « Aborted() » dans MediaPipe).
    const frame = document.createElement("canvas");
    const fctx = frame.getContext("2d")!;
    let crashed = false;
    const v = videoRef.current!;
    const dbg = debugRef.current;
    const stab = new GestureStabilizer(config.gestureHoldMs, 250);
    // Ecrans tactiles (telephones, tablettes) : ~15 analyses/s pour garder la
    // fluidite et la batterie ; poste fixe : a chaque image.
    const minInterval = window.matchMedia("(pointer: coarse)").matches ? 66 : 0;
    let lastRun = 0;
    let frames = 0;
    let fpsSince = performance.now();
    const options: { id: string; gesture: Gesture }[] =
      step === "howto" ? HOWTO_OPTIONS
      : step === "shot" ? SHOT_OPTIONS
      : step === "quiz" ? config.questions[qIndex].options
      : step === "mood" ? MOOD_OPTIONS
      : step === "capture" ? CAPTURE_OPTIONS
      : CONFIRM_OPTIONS;
    const onConfirm = (id: string) => {
      if (step === "howto") return leaveHowto();
      if (step === "shot") return chooseShot(id);
      if (step === "quiz") return choose(id);
      if (step === "mood") return setStep("capture");
      if (step === "capture") return actionsRef.current.shoot();
      return id === "retake" ? actionsRef.current.retake() : actionsRef.current.confirm();
    };
    let raf = 0;
    let lastTime = -1;
    // Arme seulement quand la main a change ou disparu : un geste tenu ne
    // repond pas a l'etape suivante tout seul (ex. la main ouverte du
    // tutoriel ne choisit pas « seul·e », le pouce qui lance la photo ne la
    // valide pas).
    let armed = step === "howto";
    const previous = step === "howto" ? null : lastGestureRef.current;
    let lastUi = "";

    const loop = () => {
      raf = requestAnimationFrame(loop);
      const now = performance.now();
      if (v.readyState < 2 || v.currentTime === lastTime || now - lastRun < minInterval) return;
      lastTime = v.currentTime;
      lastRun = now;
      let g: Gesture | null = null;
      let hand = false;
      try {
        if (!v.videoWidth || !v.videoHeight) return;
        // La vignette suit le format reel de la camera. iOS annonce d'abord la
        // camera en paysage (1280x720) puis la passe en portrait (720x1280) :
        // une vignette figee a la premiere image ecrasait la main en hauteur,
        // et le modele repondait « None » (test iPhone du 15/10/2026).
        const h = Math.round((640 * v.videoHeight) / v.videoWidth);
        if (frame.width !== 640 || frame.height !== h) {
          frame.width = 640;
          frame.height = h;
        }
        fctx.drawImage(v, 0, 0, frame.width, frame.height);
        const res = lm.recognizeForVideo(frame, now);
        const top = res.gestures?.[0]?.[0];
        const marks = res.landmarks?.[0] as Point[] | undefined;
        g = decideGesture(top, marks, config.gestureMinScore);
        hand = Boolean(marks?.length);
        frames++;
        const d = debugRef.current;
        d.category = top?.categoryName ?? "-";
        d.score = top?.score ?? 0;
        d.decided = g;
        d.landmarks = marks ?? null;
        if (now - fpsSince > 1000) {
          d.fps = Math.round((frames * 1000) / (now - fpsSince));
          frames = 0;
          fpsSince = now;
        }
      } catch {
        // Le moteur WebAssembly s'est arrete (« Aborted() ») : il ne repondra
        // plus. On le jette et on le relance en CPU ; si le CPU echoue aussi,
        // la borne passe en reponses au toucher (tracker « failed »).
        if (crashed) return;
        crashed = true;
        cancelAnimationFrame(raf);
        try { lm.close(); } catch { /* deja arrete */ }
        landmarkerRef.current = null;
        if (delegateRef.current === "GPU") loadTracker(true);
        else setTracker("failed");
        return;
      }
      if (!armed && (g === null || g !== previous)) armed = true;
      const r = armed ? stab.update(g, performance.now()) : { gesture: g, progress: 0, confirmed: false };
      const key = `${r.gesture}:${Math.round(r.progress * 20)}:${hand}:${armed}`;
      if (key !== lastUi) {
        lastUi = key;
        setLive({ gesture: r.gesture, progress: r.progress, hand, waiting: !armed && g !== null });
      }
      if (r.confirmed && r.gesture) {
        const opt = options.find((o) => o.gesture === r.gesture);
        if (opt) {
          cancelAnimationFrame(raf);
          lastGestureRef.current = r.gesture;
          onConfirm(opt.id);
        }
      }
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      setLive({ gesture: null, progress: 0, hand: false, waiting: false });
      // Hors du quiz, plus de main a montrer : le squelette ne doit pas rester.
      dbg.landmarks = null;
      dbg.decided = null;
    };
  }, [step, tracker, qIndex, shot, config.questions, config.gestureHoldMs, config.gestureMinScore, answers, choose, chooseShot, leaveHowto, loadTracker]);

  // Lumiere : luminance moyenne de l'image, mesuree sur une vignette.
  // Sous ~55/255 la reconnaissance chute (calibrage : poing perdu a 80 % de noir).
  useEffect(() => {
    if (!["quiz", "capture", "scan", "howto", "shot"].includes(step)) return;
    const c = document.createElement("canvas");
    c.width = 32;
    c.height = 18;
    const ctx = c.getContext("2d", { willReadFrequently: true })!;
    const id = window.setInterval(() => {
      const v = videoRef.current;
      if (!v || v.readyState < 2) return;
      ctx.drawImage(v, 0, 0, 32, 18);
      const px = ctx.getImageData(0, 0, 32, 18).data;
      let sum = 0;
      for (let i = 0; i < px.length; i += 4) sum += 0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2];
      lumaRef.current = sum / (px.length / 4);
      setLowLight(lumaRef.current < 55);
    }, 700);
    return () => window.clearInterval(id);
  }, [step]);

  // Diagnostic a distance (mode debug) : erreurs et etat envoyes au serveur de
  // developpement, pour un telephone dont on ne voit pas la console.
  const [debugErrors, setDebugErrors] = useState<string[]>([]);
  const stateRef = useRef({ step, tracker });
  useEffect(() => {
    stateRef.current = { step, tracker };
    try { sessionStorage.setItem("pb-last-step", step); } catch { /* indisponible */ }
  }, [step, tracker]);
  useEffect(() => {
    if (!debug) return;
    const events: string[] = [];
    const push = (kind: string, args: unknown[]) => {
      const msg = `${kind}: ${args.map((a) => (a instanceof Error ? `${a.name} ${a.message} ${a.stack?.split("\n").slice(0, 3).join(" | ")}` : typeof a === "string" ? a : JSON.stringify(a))).join(" ")}`.slice(0, 600);
      events.push(msg);
      if (kind !== "warn") setDebugErrors((e) => [...e.slice(-2), msg.slice(0, 160)]);
    };
    const oe = console.error;
    const ow = console.warn;
    console.error = (...a: unknown[]) => { push("error", a); oe(...a); };
    console.warn = (...a: unknown[]) => { push("warn", a); ow(...a); };
    const onErr = (e: ErrorEvent) => push("window", [e.message, `${e.filename}:${e.lineno}`]);
    const onRej = (e: PromiseRejectionEvent) => push("rejection", [e.reason]);
    window.addEventListener("error", onErr);
    window.addEventListener("unhandledrejection", onRej);
    // Plantage d'onglet : iOS recharge la page sans prevenir. On garde la
    // derniere etape en sessionStorage ; un rechargement trouve en pleine
    // experience (pas a l'accueil) est un plantage, on le signale.
    try {
      const prev = sessionStorage.getItem("pb-last-step");
      const loads = Number(sessionStorage.getItem("pb-loads") ?? 0) + 1;
      sessionStorage.setItem("pb-loads", String(loads));
      if (prev && prev !== "attract" && prev !== "result" && prev !== "error") {
        push("CRASH-RELOAD", [`page rechargee alors qu'elle etait a l'etape « ${prev} » (chargement n°${loads})`]);
      }
    } catch { /* stockage indisponible */ }
    const send = () => {
      const v = videoRef.current;
      const d = debugRef.current;
      const body = JSON.stringify({
        ua: navigator.userAgent, ...stateRef.current, delegate: delegateRef.current,
        cam: `${v?.videoWidth ?? 0}x${v?.videoHeight ?? 0}`, readyState: v?.readyState, currentTime: v?.currentTime,
        fps: d.fps, seen: `${d.category} ${d.score.toFixed(2)}`, luma: Math.round(lumaRef.current),
        // orientation de la main telle que le modele la voit (0 poignet, 4 pouce, 12 majeur)
        hand: d.landmarks ? [0, 4, 12].map((i) => `${i}:${d.landmarks![i].x.toFixed(2)},${d.landmarks![i].y.toFixed(2)}`).join(" ") : null,
        events: events.splice(0),
      });
      fetch("/api/photobooth/debug-log", { method: "POST", body, keepalive: true }).catch(() => {});
    };
    send();
    const id = window.setInterval(send, 2000);
    return () => {
      window.clearInterval(id);
      console.error = oe;
      console.warn = ow;
      window.removeEventListener("error", onErr);
      window.removeEventListener("unhandledrejection", onRej);
    };
  }, [debug]);

  // Calibrage : dessine le squelette de la main et rafraichit le panneau.
  useEffect(() => {
    if (!debug) return;
    let raf = 0;
    let last = 0;
    const BONES = [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12],
      [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [17, 18], [18, 19], [19, 20], [0, 17]];
    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      const cv = overlayRef.current;
      if (!cv) return;
      const w = (cv.width = cv.clientWidth);
      const h = (cv.height = cv.clientHeight);
      const ctx = cv.getContext("2d")!;
      ctx.clearRect(0, 0, w, h);
      const v = videoRef.current;
      const m = stateRef.current.step === "quiz" ? debugRef.current.landmarks : null;
      if (v && v.videoWidth && m) {
        // meme cadrage que la video : object-cover puis miroir
        const scale = Math.max(w / v.videoWidth, h / v.videoHeight);
        const dw = v.videoWidth * scale;
        const dh = v.videoHeight * scale;
        const ox = (w - dw) / 2;
        const oy = (h - dh) / 2;
        const P = (p: Point) => [w - (ox + p.x * dw), oy + p.y * dh];
        ctx.strokeStyle = debugRef.current.decided ? "#7bef7b" : "#f5f5f8";
        ctx.lineWidth = 3;
        for (const [a, b] of BONES) {
          const [x1, y1] = P(m[a]);
          const [x2, y2] = P(m[b]);
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }
      if (t - last > 200) {
        last = t;
        const d = debugRef.current;
        setCalib({
          delegate: delegateRef.current ?? "-",
          cam: `${v?.videoWidth ?? 0}×${v?.videoHeight ?? 0}`,
          fps: d.fps, luma: Math.round(lumaRef.current),
          category: d.category, score: d.score, decided: d.decided,
        });
      }
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [debug]);

  // ---------- capture ----------
  const snap = useCallback(async () => {
    // iPhone par QR : photo prise sur son capteur, en pleine definition. Sinon
    // (ou sans reponse en 8 s) : l'image affichee.
    let source: CanvasImageSource | null = null;
    let w = 0;
    let h = 0;
    // Miroir comme l'apercu ; camera arriere de l'iPhone : jamais inversee.
    let mirror = !(usingRemote && remote.facing === "environment");
    if (usingRemote) {
      const r = await remote.requestPhoto();
      const bmp = r ? await createImageBitmap(r.blob).catch(() => null) : null;
      if (r && bmp) {
        source = bmp;
        w = bmp.width;
        h = bmp.height;
        mirror = r.facing === "user";
      }
    }
    if (!source) {
      const v = videoRef.current;
      if (!v || !v.videoWidth) return fail("CAPTURE_FAILED");
      source = v;
      w = v.videoWidth;
      h = v.videoHeight;
    }
    const [aw, ah] = captureAspect.split(":").map(Number);
    const target = aw / ah;
    let sw = w;
    let sh = h;
    if (sw / sh > target) sw = Math.round(sh * target);
    else sh = Math.round(sw / target);
    const sx = (w - sw) / 2;
    const sy = (h - sh) / 2;
    const scale = Math.min(1, MAX_SIDE / Math.max(sw, sh));
    const c = document.createElement("canvas");
    c.width = Math.round(sw * scale);
    c.height = Math.round(sh * scale);
    const ctx = c.getContext("2d")!;
    // Meme miroir que l'apercu : la photo ressemble a ce que la personne a vu.
    if (mirror) {
      ctx.translate(c.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(source, sx, sy, sw, sh, 0, 0, c.width, c.height);
    // JPEG 0.92, puis 0.82 si la photo depasse la taille autorisee (photo 4K).
    const done = (blob: Blob | null, retried: boolean) => {
      if (blob && blob.size > config.maxUploadBytes && !retried) return c.toBlob((b) => done(b, true), "image/jpeg", 0.82);
      if (!blob || blob.size > config.maxUploadBytes) return fail(blob ? "UPLOAD_TOO_LARGE" : "CAPTURE_FAILED");
      setFlash(true);
      window.setTimeout(() => setFlash(false), 450);
      setPhoto({ blob, url: URL.createObjectURL(blob) });
      idemRef.current = uuid(); // une photo confirmee = une cle = au plus une image facturee
      setStep("confirm");
    };
    c.toBlob((b) => done(b, false), "image/jpeg", 0.92);
  }, [captureAspect, config.maxUploadBytes, fail, usingRemote, remote]);

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
    fd.set("shot", shot ?? "solo");
    fd.set("style", style);
    fd.set("locale", locale);
    if (expression.reading && shot !== "group") fd.set("expr", expression.reading);
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
  }, [accessKey, answers, fail, photo, poll, slug, expression.reading, shot, style, locale]);

  // La boucle des gestes (declaree plus haut) declenche ces actions.
  useEffect(() => {
    actionsRef.current = { shoot: startCountdown, confirm: generate, retake };
  }, [startCountdown, generate, retake]);

  const resumeCheck = useCallback(() => {
    if (!usageRef.current) return reset();
    setStep("generating");
    poll(usageRef.current, Date.now() + GEN_DEADLINE_MS);
  }, [poll, reset]);

  // ---------- render ----------
  const cameraOn = ["scan", "howto", "shot", "quiz", "mood", "capture"].includes(step);
  const question = config.questions[qIndex];
  // Gestes qui servent a choisir (seul/groupe + questions), pour l'aide-memoire.
  const chooseGestures = (Object.keys(GESTURE_GLYPH) as Gesture[]).filter((g) =>
    SHOT_OPTIONS.some((o) => o.gesture === g) || config.questions.some((q) => q.options.some((o) => o.gesture === g)));
  // Gestes acceptes par l'ecran en cours (cadre vide des ecrans de choix).
  const stepGestures: Gesture[] = step === "shot" ? SHOT_OPTIONS.map((o) => o.gesture)
    : step === "quiz" && question ? question.options.map((o) => o.gesture)
    : [];
  // Tutoriel en trois temps, deduits de ce que voit la camera : lever, tenir, c'est fait.
  const howtoPhase: "raise" | "hold" | "done" = chosen === "go" ? "done" : live.hand || live.gesture ? "hold" : "raise";
  // Ce que le geste en cours va faire a cette etape.
  const actionFor = (g: Gesture): string | null => {
    if (step === "howto") return g === "open_palm" ? t.howtoGo : null;
    if (step === "shot") {
      const o = SHOT_OPTIONS.find((x) => x.gesture === g);
      return o ? t[o.labelKey] : null;
    }
    if (step === "quiz") return question?.options.find((o) => o.gesture === g)?.label[locale] ?? null;
    if (step === "mood") return g === "thumb_up" ? t.continue : null;
    if (step === "capture") return g === "thumb_up" ? t.capture : null;
    if (step === "confirm") return g === "thumb_up" ? t.confirm : g === "peace" ? t.retake : null;
    return null;
  };
  // Texte du cadre : etat de la main, puis ce que le geste va faire.
  const gaugeAction = live.gesture && !live.waiting ? actionFor(live.gesture) : null;
  const gauge = {
    action: gaugeAction,
    text: live.waiting ? t.lowerHand
      : gaugeAction ? gaugeAction
      : live.gesture ? t.gestureUnused
      : live.hand ? t.handSeen
      : t.handHere,
  };
  // Progression du geste en cours sur un bouton (anneau), comme les reponses du quiz.
  const ring = (g: Gesture) => {
    const C = 2 * Math.PI * 22;
    return (
      <span className="relative grid size-9 shrink-0 place-items-center text-lg">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 50 50" aria-hidden>
          <circle cx="25" cy="25" r="22" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" />
          <circle
            cx="25" cy="25" r="22" fill="none" stroke="var(--color-fmaccent)" strokeWidth="3"
            strokeDasharray={C} strokeDashoffset={C * (1 - (live.gesture === g ? live.progress : 0))}
            className={s.ring}
          />
        </svg>
        <span aria-hidden>{GESTURE_GLYPH[g]}</span>
      </span>
    );
  };
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
        style={{
          opacity: cameraOn ? 1 : 0, filter: step === "mood" ? "blur(18px) brightness(0.5)" : "none",
          // Camera arriere de l'iPhone : on ne retourne pas l'image.
          ...(usingRemote && remote.facing === "environment" ? { transform: "none" } : {}),
        }}
      />
      <div className={s.veil} />
      {debug && <canvas ref={overlayRef} className="pointer-events-none absolute inset-0 z-[5] h-full w-full" />}
      {debug && (
        <div data-testid="calibration" className="absolute left-3 top-16 z-30 rounded-md bg-black/80 p-3 font-mono text-[11px] leading-relaxed text-fmfg">
          <p className="text-fmaccent">CALIBRAGE</p>
          <p>modèle {tracker} · {calib.delegate}</p>
          <p>caméra {calib.cam}</p>
          <p>analyse {calib.fps} img/s</p>
          <p>lumière {calib.luma}/255 {calib.luma < 55 ? "⚠ trop sombre" : "ok"}</p>
          <p data-testid="calib-seen">vu {calib.category} {calib.score.toFixed(2)}</p>
          <p>imprimante {printer.state.kind}{"name" in printer.state ? ` · ${printer.state.name}` : ""}</p>
          {debugErrors.map((e, i) => <p key={i} className="max-w-[80vw] break-all text-red-300">{e}</p>)}
          <p>expression {expression.reading ?? "…"}{expression.scores ? ` · sourire ${expression.scores.smile.toFixed(2)} sourcils ${expression.scores.raise.toFixed(2)}` : ""}</p>
          <p data-testid="calib-decided">retenu {calib.decided ?? "—"} (seuil {config.gestureMinScore}, maintien {config.gestureHoldMs} ms)</p>
        </div>
      )}
      {flash && <div className={s.flash} />}

      {/* barre haute : marque + langues */}
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-5 md:p-8">
        <div className="flex items-center gap-4">
          <span dir="ltr" className="fm-display text-sm tracking-[0.06em]">FMRXR<span className="text-fmaccent">{"//"}</span></span>
          {config.clientLogoUrl && (
            // Logo officiel tel quel, sur plaque blanche (logos faits pour fond clair).
            // eslint-disable-next-line @next/next/no-img-element
            <img src={config.clientLogoUrl} alt="" className="h-9 w-auto rounded-md bg-white object-contain p-1" />
          )}
        </div>
        {step === "attract" && config.print.enabled && config.print.mode === "agent" && (
          <span
            data-testid="printer-badge"
            title={"name" in printer.state ? printer.state.name : ""}
            className="ms-auto me-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-fmmuted"
          >
            <span className={`size-2 rounded-full ${printer.state.kind === "ready" ? "bg-fmaccent" : printer.state.kind === "checking" ? "bg-fmmuted" : "bg-red-500"}`} />
            {t[`printer_${printer.state.kind}`] ?? printer.state.kind}
          </span>
        )}
        {step === "attract" && <TeamGallery slug={slug} accessKey={accessKey} t={t} />}
        {step === "attract" && remote.status === "connected" && (
          <span className="me-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-fmaccent">
            <span className="size-2 rounded-full bg-fmaccent" /> iPhone
          </span>
        )}
        {step === "attract" && (
          <CameraPicker
            slug={slug} value={cameraId} onChange={setCameraId} t={t}
            extra={{ label: remote.status === "connected" ? `${t.remoteOption} ✓` : t.remoteOption, onSelect: () => { if (!remote.pairId) remote.pair(); setPairOpen(true); } }}
          />
        )}
        {pairOpen && (
          <RemotePair
            slug={slug} accessKey={accessKey} pairId={remote.pairId} status={remote.status} t={t}
            onNew={() => remote.pair()} onForget={() => { remote.unpair(); setPairOpen(false); }} onClose={() => setPairOpen(false)}
          />
        )}
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

      <main className="relative z-10 flex min-h-full flex-col overflow-x-clip">
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
            <div className={s.frame} style={{ aspectRatio: captureAspect.replace(":", "/") }}>
              <div className="absolute inset-0 overflow-hidden"><div className={s.scanLine} /></div>
            </div>
            <div className={s.field} />
            <section className="mt-auto p-8 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fmaccent">{t.scanning}</p>
              <p className="fm-display mt-2 text-3xl md:text-5xl">{t.scanHint}</p>
            </section>
          </>
        )}

        {ZONE_STEPS.includes(step) && tracker !== "failed" && (
          // Le cadre de la main est l'interface : a hauteur du visage, au-dessus
          // des reponses (sur telephone, la main libre arrive sinon en bas, a
          // moitie hors champ). Son contour se remplit pendant qu'on tient le
          // geste, et il dit ce que le geste va faire.
          <div
            aria-live="polite"
            className={`pointer-events-none absolute inset-x-0 top-[14%] z-[1] mx-auto grid aspect-[3/4] w-[46vw] max-w-xs place-items-center md:top-[10%] md:w-[22vw] ${
              chosen ? "rounded-3xl bg-fmaccent/15" : ""
            }`}
          >
            <svg className="absolute inset-0 size-full overflow-visible" viewBox="0 0 300 400" preserveAspectRatio="none" aria-hidden>
              <rect
                x="2" y="2" width="296" height="396" rx="26" fill="none"
                stroke={live.hand ? "rgba(245,245,248,0.3)" : "rgba(245,245,248,0.5)"} strokeWidth="2"
                strokeDasharray={live.hand ? undefined : "10 9"}
              />
              {(chosen || (gauge.action && live.progress > 0)) && (
                <rect
                  x="2" y="2" width="296" height="396" rx="26" fill="none"
                  stroke="var(--color-fmaccent)" strokeWidth="5"
                  pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - (chosen ? 1 : live.progress)}
                  className={s.ring}
                />
              )}
            </svg>
            <div className="flex flex-col items-center gap-2 px-3 text-center">
              {chosen ? (
                <span className="text-5xl text-fmaccent md:text-6xl" aria-hidden>✓</span>
              ) : (
                live.gesture ? (
                  <span aria-hidden className="text-5xl md:text-6xl">{GESTURE_GLYPH[live.gesture]}</span>
                ) : step === "howto" ? (
                  // Tutoriel : la main ouverte est bien le geste a faire.
                  <span aria-hidden className={`${s.ghost} text-5xl opacity-60 md:text-6xl`}>{GESTURE_GLYPH.open_palm}</span>
                ) : (
                  // Ecrans de choix : les gestes acceptes ici, pas un geste suggere.
                  <span aria-hidden className="flex gap-2 text-3xl opacity-70 md:text-4xl">
                    {stepGestures.map((g) => <span key={g}>{GESTURE_GLYPH[g]}</span>)}
                  </span>
                )
              )}
              <span className="rounded-full bg-black/60 px-3 py-1 text-xs leading-snug text-fmfg md:text-sm">{gauge.text}</span>
            </div>
          </div>
        )}
        {PILL_STEPS.includes(step) && tracker === "ready" && (live.gesture || live.hand) && !(step === "capture" && count !== null) && (
          // Ecrans sans cadre (ambiance, prise de vue, validation) : meme retour, en bandeau.
          <div
            aria-live="polite"
            className="pointer-events-none absolute inset-x-0 top-[11%] z-[2] mx-auto flex w-max max-w-[92vw] items-center gap-3 rounded-full border border-fmaccent/50 bg-black/70 py-2 ps-3 pe-4 backdrop-blur-md"
          >
            <span className="text-2xl" aria-hidden>{live.gesture ? GESTURE_GLYPH[live.gesture] : GESTURE_GLYPH.open_palm}</span>
            <span className="text-sm md:text-base">{gauge.text}</span>
            {gauge.action && (
              <span className="h-1.5 w-20 overflow-hidden rounded-full bg-white/15 md:w-28">
                <span className="block h-full bg-fmaccent" style={{ width: `${Math.round(live.progress * 100)}%` }} />
              </span>
            )}
          </div>
        )}
        {step === "howto" && (
          <section className="mt-auto flex flex-col items-center gap-3 p-4 pb-8 text-center md:gap-5 md:p-10">
            <h2 key={howtoPhase} className={`${s.enter} fm-display text-[clamp(2.2rem,8vw,6rem)]`}>
              {howtoPhase === "raise" ? t.howtoRaise : howtoPhase === "hold" ? t.howtoHold : t.howtoDone}
            </h2>
            <p className="max-w-md text-base text-fmfg/85 md:text-xl">
              {tracker === "failed" ? t.manualOnly
                : lowLight ? t.lowLight
                : howtoPhase === "raise" ? t.howtoRaiseHint
                : howtoPhase === "hold" ? t.howtoHoldHint
                : t.howtoDoneHint}
            </p>
            {/* Aide-memoire pour la suite : ce que chaque geste fera. */}
            <ul className="mt-1 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-fmmuted md:text-base" aria-label={t.howtoGestures}>
              <li><span aria-hidden className="me-1.5 text-fmfg">{chooseGestures.map((g) => GESTURE_GLYPH[g]).join(" ")}</span>{t.legendChoose}</li>
              <li><span aria-hidden className="me-1.5 text-fmfg">{GESTURE_GLYPH.thumb_up}</span>{t.legendYes}</li>
              <li>{t.legendTap}</li>
            </ul>
            <button
              data-testid="howto-skip"
              onClick={leaveHowto}
              className={tracker === "failed"
                ? "mt-2 rounded-full bg-fmfg px-8 py-3.5 font-semibold text-fmbg"
                : "mt-1 px-4 py-2 text-sm text-fmfg/70 underline-offset-4 hover:text-fmfg hover:underline"}
            >
              {tracker === "failed" ? t.howtoContinue : t.howtoSkip}
            </button>
          </section>
        )}
        {step === "shot" && (
          <section className={`${s.enter} mt-auto flex flex-col gap-3 p-4 pb-6 md:gap-6 md:p-10`}>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fmaccent">{t.shotLabel}</p>
              <h2 className="fm-display mt-2 text-[clamp(1.4rem,5.5vw,4.5rem)] md:mt-3">{t.shotTitle}</h2>
              <p className="mt-2 text-xs text-fmfg/70 md:mt-3 md:text-sm md:text-fmmuted">
                {tracker === "failed" ? t.manualOnly : lowLight ? t.lowLight : live.gesture ? t.gestureHint : t.noHand}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 md:mx-auto md:w-full md:max-w-3xl md:gap-3">
              {SHOT_OPTIONS.map((o) => {
                const active = live.gesture === o.gesture;
                const picked = chosen === o.id;
                const C = 2 * Math.PI * 22;
                return (
                  <button
                    key={o.id}
                    data-testid={`shot-${o.id}`}
                    onClick={() => chooseShot(o.id)}
                    className={`flex min-h-16 items-center gap-2.5 rounded-xl border p-2.5 text-start backdrop-blur-md transition md:min-h-28 md:gap-4 md:p-4 ${
                      picked ? "border-fmaccent bg-fmaccent/20" : active ? "border-fmfg/60 bg-fmcard/80" : "border-fmborder bg-fmcard/60 hover:border-fmfg/40"
                    }`}
                  >
                    <span className="relative grid size-11 shrink-0 place-items-center text-xl md:size-14 md:text-2xl">
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
                    <span className="text-sm leading-snug md:text-lg">{t[o.labelKey]}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {step === "style" && (
          <section className={`${s.enter} mt-auto flex max-h-full flex-col gap-3 overflow-y-auto p-4 pb-6 md:gap-5 md:p-10`}>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fmaccent">{t.styleLabel}</p>
              <h2 className="fm-display mt-2 text-[clamp(1.4rem,5.5vw,4.5rem)] md:mt-3">{t.styleTitle}</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 xl:grid-cols-4">
              {config.styles.map((id) => {
                const st = STYLES[id];
                return (
                  <button
                    key={id}
                    data-testid={`style-${id}`}
                    onClick={() => { setStyle(id); setStep("quiz"); }}
                    className="flex min-h-20 flex-col justify-center gap-1 rounded-xl border border-fmborder bg-fmcard/70 p-3 text-start backdrop-blur-md transition hover:border-fmaccent/60 md:min-h-28 md:p-4"
                  >
                    <span className="text-sm font-semibold leading-snug md:text-lg">{st.label[locale]}</span>
                    <span className="text-[11px] leading-snug text-fmmuted md:text-sm">{st.blurb[locale]}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {step === "quiz" && question && (
          <section key={qIndex} className={`${s.enter} mt-auto flex flex-col gap-3 p-4 pb-6 md:gap-6 md:p-10`}>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fmaccent">
                {t.question} <bdi dir="ltr">{qIndex + 1} / {config.questions.length}</bdi>
              </p>
              <h2 className="fm-display mt-2 text-[clamp(1.4rem,5.5vw,4.5rem)] md:mt-3">{question.prompt[locale]}</h2>
              <p className="mt-2 text-xs text-fmfg/70 md:mt-3 md:text-sm md:text-fmmuted">
                {tracker === "failed" ? t.manualOnly : lowLight ? t.lowLight : live.gesture ? t.gestureHint : t.noHand}
              </p>
            </div>
            <div className={`grid grid-cols-2 gap-2 md:gap-3 ${question.options.length === 4 ? "md:grid-cols-4" : question.options.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
              {question.options.map((o) => {
                const active = live.gesture === o.gesture;
                const picked = chosen === o.id;
                const C = 2 * Math.PI * 22;
                return (
                  <button
                    key={o.id}
                    onClick={() => choose(o.id)}
                    className={`group flex min-h-16 items-center gap-2.5 rounded-xl border p-2.5 text-start backdrop-blur-md transition md:min-h-28 md:gap-4 md:p-4 ${
                      picked ? "border-fmaccent bg-fmaccent/20" : active ? "border-fmfg/60 bg-fmcard/80" : "border-fmborder bg-fmcard/60 hover:border-fmfg/40"
                    }`}
                  >
                    <span className="relative grid size-11 shrink-0 place-items-center text-xl md:size-14 md:text-2xl">
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
                    <span className="text-sm leading-snug md:text-lg">{o.label[locale]}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {step === "mood" && mood && (
          <section className={`${s.enter} m-auto flex max-w-3xl flex-col items-center gap-7 px-6 text-center`}>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fmaccent">
              {t.moodLabel}{config.styles.length > 1 ? ` · ${STYLES[style].label[locale]}` : ""}
            </p>
            <h2 className="fm-display text-[clamp(2.5rem,8vw,6.5rem)]">{mood.title[locale]}</h2>
            <div className="flex gap-2">
              {mood.palette.map((c) => (
                <span key={c} className="h-12 w-12 rounded-full border border-white/10 md:h-16 md:w-16" style={{ background: c }} />
              ))}
            </div>
            <p className="text-fmfg/80">{mood.description[locale]}</p>
            {tracker === "ready" && <p className="text-sm text-fmmuted">{t.moodGesture}</p>}
            {expression.reading && shot !== "group" && (
              <p data-testid="expression" className="rounded-full border border-fmborder bg-fmcard/70 px-4 py-2 text-sm">
                {t.yourExpression} <strong className="text-fmaccent">{EXPRESSION_LABEL[expression.reading][locale]}</strong>
                <span className="mt-0.5 block text-[11px] text-fmmuted">{t.expressionNote}</span>
              </p>
            )}
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={() => setStep("capture")} className="flex items-center gap-2 rounded-full bg-fmfg py-2 ps-3 pe-8 font-semibold text-fmbg transition hover:bg-fmaccent">
                {ring("thumb_up")}
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
            <div className={s.frame} style={{ aspectRatio: captureAspect.replace(":", "/") }} />
            {count !== null && (
              <div className="pointer-events-none absolute inset-0 grid place-items-center">
                <span key={count} className={`${s.enter} fm-display text-[30vh] text-fmfg/90`}>{count}</span>
              </div>
            )}
            <section className="mt-auto flex flex-col items-center gap-4 p-8 text-center">
              <p className="text-fmfg/80">{t.frame}</p>
              {tracker === "ready" && count === null && (
                <p className="flex items-center gap-2 text-sm text-fmfg/80">{ring("thumb_up")}{t.shootGesture}</p>
              )}
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
              <button onClick={generate} className="flex items-center gap-2 rounded-full bg-fmfg py-2 ps-3 pe-8 font-semibold text-fmbg transition hover:bg-fmaccent">
                {ring("thumb_up")}
                {t.confirm}
              </button>
              <button onClick={retake} className="flex items-center gap-2 rounded-full border border-fmborder py-2 ps-3 pe-8 text-fmfg/80 hover:border-fmfg/50">
                {ring("peace")}
                {t.retake}
              </button>
            </div>
            {tracker === "ready" && <p className="text-sm text-fmmuted">{t.confirmGesture}</p>}
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
          // Paysage (ordinateur, tablette couchee) : portrait a gauche, actions a
          // droite, tout tient sans defiler. Portrait (telephone, borne
          // verticale) : empile, la page defile si besoin.
          <section className={`${s.enter} m-auto grid w-full max-w-6xl items-center justify-items-center gap-5 px-5 pb-10 pt-20 text-center md:gap-6 md:py-20 landscape:md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] landscape:md:gap-10 landscape:md:py-16`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={resultUrl} alt={mood?.title[locale] ?? ""} className="max-h-[52vh] max-w-full rounded-xl object-contain shadow-2xl portrait:md:max-h-[60vh] landscape:md:max-h-[78vh]" />
            <div className="flex flex-col items-center gap-5 md:gap-6">
            {mood && (
              <div>
                <p className="fm-display text-3xl md:text-5xl">{mood.title[locale]}</p>
                <p className="mt-2 text-sm text-fmmuted">{mood.description[locale]}</p>
              </div>
            )}
            <div className="flex flex-wrap justify-center gap-3">
              <a href={`${resultUrl}&dl=1`} className="rounded-full bg-fmfg px-8 py-3.5 font-semibold text-fmbg transition hover:bg-fmaccent">
                {t.download}
              </a>
              {config.print.enabled && (
                <button
                  data-testid="print"
                  onClick={() => printer.print(resultUrl, usageRef.current ?? sessionRef.current)}
                  disabled={!printer.canPrint}
                  className="rounded-full border border-fmfg/70 px-8 py-3.5 font-semibold text-fmfg transition hover:bg-fmfg hover:text-fmbg disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-fmfg"
                >
                  {printer.busy ? t.printing : printer.count >= config.print.maxPrints ? t.printed : t.print}
                </button>
              )}
              <button onClick={reset} className="rounded-full border border-fmborder px-8 py-3.5 text-fmfg/80 hover:border-fmfg/50">
                {t.done}
              </button>
            </div>
            {config.print.enabled && (
              <p data-testid="print-status" className="text-xs text-fmmuted">
                {printer.error ? t.printFailed
                  : printer.count > 0 ? t.printDone
                  : printer.state.kind === "ready" || printer.state.kind === "browser" ? ""
                  : t.printUnavailable}
              </p>
            )}
            {qr && (
              // Sous 640 px (telephone personnel), le QR « recuperer sur votre
              // telephone » n'a pas de sens : le bouton Telecharger suffit.
              <div className="hidden items-center gap-4 rounded-xl border border-fmborder bg-fmcard/80 p-3 text-start sm:flex">
                <div className="size-28 shrink-0 overflow-hidden rounded-md [&>svg]:h-full [&>svg]:w-full" dangerouslySetInnerHTML={{ __html: qr }} />
                <p className="max-w-[16rem] text-sm text-fmfg/80">{t.scanToGet}</p>
              </div>
            )}
            </div>
            {/* Copie destinee a l'impression navigateur : seule visible sur papier. */}
            <div id="pb-print" aria-hidden className="hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={resultUrl} alt="" />
            </div>
            <style>{`
              @page { size: ${PAGE_SIZE[config.print.paper]}; margin: 0; }
              @media print {
                body * { visibility: hidden !important; }
                #pb-print, #pb-print * { visibility: visible !important; }
                #pb-print { display: block !important; position: fixed; inset: 0; }
                #pb-print img { width: 100%; height: 100%; object-fit: ${config.print.fit}; }
              }
            `}</style>
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
