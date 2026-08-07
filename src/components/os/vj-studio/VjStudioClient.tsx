"use client";

import { useEffect, useState, useCallback } from "react";
import { Section } from "@/components/os/Section";

const VJ_URL = "http://127.0.0.1:5099";

interface VjRender {
  id: string;
  batch_id: string;
  job_id: string;
  clip_seconds: number;
  status: string;
  phase?: string;
  phase_progress?: number | null;
  frames_done?: number | null;
  frames_total?: number | null;
  eta_seconds?: number | null;
  execution_time?: number | null;
  output_path: string | null;
  regenerated?: boolean;
  submitted_at: string;
}

interface VjPrompt {
  id: string;
  num: number;
  cat: string;
  text_raw: string;
  text_expanded: string;
  negative: string;
  kept: boolean;
  stills: string[];
  renders: VjRender[];
}

interface VjProject {
  id: string;
  name: string;
  created_at: string;
  audio_path: string;
  bpm: number | null;
  status: string;
  prompts: VjPrompt[];
}

interface VjProjectSummary {
  id: string;
  name: string;
  created_at: string;
  audio_path: string;
  bpm: number | null;
  prompt_count: number;
  kept_count: number;
  render_count: number;
}

interface VjStatus {
  online: boolean;
  project_count: number;
  jobs_running: number;
}

async function fetchJson<T>(url: string, opts?: RequestInit): Promise<T | null> {
  try {
    const r = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(8000), ...opts });
    if (!r.ok) return null;
    return (await r.json()) as T;
  } catch {
    return null;
  }
}

function fileUrl(path: string): string {
  return `${VJ_URL}/api/vj/file?path=${encodeURIComponent(path)}`;
}

function statusColor(status: string): string {
  if (status === "SUCCEEDED") return "text-fmaccent";
  if (status === "FAILED") return "text-[#ff4d5e]";
  return "text-[#d9a441]";
}

function formatEta(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m < 60) return `${m}min${s ? ` ${s}s` : ""}`;
  const h = Math.floor(m / 60);
  return `${h}h${String(m % 60).padStart(2, "0")}`;
}

// ─── Live progress bar for a render actively GENERATING — frame count comes
// from Deforum's own phase_progress (0-1 fraction of max_frames), server-side
// computed into frames_done/frames_total/eta_seconds in render-status.
function RenderProgress({ r }: { r: VjRender }) {
  if (r.status !== "ACCEPTED" || r.phase !== "GENERATING" || !r.frames_total) return null;
  const pct = Math.round((r.phase_progress ?? 0) * 100);
  return (
    <div className="mt-1.5 flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-fmmutedbg">
        <div className="h-full rounded-full bg-fmaccent transition-[width] duration-500" style={{ width: `${pct}%` }} />
      </div>
      <span className="whitespace-nowrap font-grotesk text-[10px] text-fmmuted">
        {r.frames_done ?? 0}/{r.frames_total} frames · {pct}%
        {typeof r.eta_seconds === "number" && r.eta_seconds > 0 ? ` · reste ~${formatEta(r.eta_seconds)}` : ""}
      </span>
    </div>
  );
}

// ─── Local interface status/launch card — same pattern as CfLocalInterfaceCard,
// same local server (port 5099) and launch route, just VJ-specific status shape.
function VjLocalInterfaceCard({ onOnline }: { onOnline: (online: boolean) => void }) {
  const [status, setStatus] = useState<VjStatus | null | "loading">("loading");
  const [launchState, setLaunchState] = useState<"idle" | "launching" | "launched" | string>("idle");

  const refresh = useCallback(() => {
    setStatus("loading");
    fetchJson<VjStatus>(`${VJ_URL}/api/vj/status`).then((s) => {
      setStatus(s);
      onOnline(!!s?.online);
    });
  }, [onOnline]);

  useEffect(() => {
    let cancelled = false;
    fetchJson<VjStatus>(`${VJ_URL}/api/vj/status`).then((s) => {
      if (cancelled) return;
      setStatus(s);
      onOnline(!!s?.online);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only fetch, `refresh` (used by the button) intentionally not a dep here
  }, []);

  async function launch() {
    setLaunchState("launching");
    try {
      const r = await fetch("/api/os/content-factory/launch", { method: "POST" });
      const j = await r.json();
      if (!r.ok) {
        setLaunchState(j.error || `erreur ${r.status}`);
        return;
      }
      setLaunchState("launched");
      setTimeout(refresh, 4000);
    } catch (e) {
      setLaunchState((e as Error).message);
    }
  }

  const online = status !== "loading" && status !== null;

  return (
    <div className="fm-glass-card rounded-2xl p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="font-grotesk text-sm font-semibold text-fmfg">VJ Studio — moteur local</div>
        <div className="flex items-center gap-2">
          {!online && (
            <button
              type="button"
              onClick={launch}
              disabled={launchState === "launching"}
              className="rounded-lg border border-fmaccent/40 px-3 py-1.5 font-grotesk text-xs text-fmaccent hover:bg-fmaccent/10 disabled:opacity-50"
            >
              {launchState === "launching" ? "Lancement…" : "▶ Lancer (Content Factory)"}
            </button>
          )}
          <button type="button" onClick={refresh} className="rounded-lg border border-fmborder px-3 py-1.5 font-grotesk text-xs text-fmmuted hover:border-fmaccent/40">
            ↺ Rafraîchir
          </button>
        </div>
      </div>
      <div className="mt-2.5 font-grotesk text-xs">
        {status === "loading" ? (
          <span className="text-fmmuted">Vérification…</span>
        ) : !online ? (
          <span className="text-[#ff4d5e]">⚫ Hors ligne — lance CONTENT_FACTORY/launch.bat sur ce poste (même serveur que Content Factory)</span>
        ) : (
          <span className="text-fmaccent">
            ● En ligne — {status.project_count} projet(s) archivé(s), {status.jobs_running} rendu(s) en cours
          </span>
        )}
      </div>
      <p className="mt-2 font-grotesk text-[10.5px] text-fmmuted">
        Génère des boucles VJ (Stable Diffusion + Deforum) synchronisées au BPM — accessible uniquement depuis ce poste (GPU local).
      </p>
    </div>
  );
}

function RenderBadge({ r }: { r: VjRender }) {
  const label = r.phase && r.status === "ACCEPTED" ? r.phase : r.status;
  return (
    <a
      href={r.output_path ? fileUrl(r.output_path) : undefined}
      target={r.output_path ? "_blank" : undefined}
      rel="noopener noreferrer"
      className={`rounded-full border border-fmborder px-2 py-0.5 font-grotesk text-[10px] ${statusColor(r.status)} ${r.output_path ? "hover:border-fmaccent/40" : "cursor-default"}`}
      title={`${r.clip_seconds}s — job ${r.job_id}${r.regenerated ? " (régénéré)" : ""}`}
    >
      {r.clip_seconds}s · {label}
      {r.output_path ? " ▶" : ""}
    </a>
  );
}

function PromptRow({
  project,
  prompt,
  onKeepToggled,
  onRegenerated,
}: {
  project: VjProject;
  prompt: VjPrompt;
  onKeepToggled: (promptId: string, kept: boolean) => void;
  onRegenerated: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [showRegen, setShowRegen] = useState(false);
  const [clipSeconds, setClipSeconds] = useState(20);
  const [audioOverride, setAudioOverride] = useState("");

  async function toggleKeep() {
    setBusy(true);
    const res = await fetchJson<{ kept: boolean }>(`${VJ_URL}/api/vj/projects/${project.id}/prompts/${prompt.id}/keep`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kept: !prompt.kept }),
    });
    setBusy(false);
    if (res) onKeepToggled(prompt.id, res.kept);
  }

  async function regenerate() {
    setBusy(true);
    const body: Record<string, unknown> = { clip_seconds: clipSeconds };
    if (audioOverride.trim()) body.audio_path = audioOverride.trim();
    const res = await fetchJson<{ job_id: string }>(`${VJ_URL}/api/vj/projects/${project.id}/prompts/${prompt.id}/regenerate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setBusy(false);
    if (res) {
      setShowRegen(false);
      onRegenerated();
    }
  }

  return (
    <div className="fm-glass-card rounded-xl p-3">
      <div className="flex items-start gap-3">
        {prompt.stills[0] && (
          <img src={fileUrl(prompt.stills[0])} alt="" className="h-16 w-28 shrink-0 rounded-lg border border-fmborder object-cover" loading="lazy" />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-grotesk text-[10px] text-fmmuted">#{String(prompt.num).padStart(2, "0")}</span>
            <span className="rounded-full border border-fmborder px-2 py-0.5 font-grotesk text-[10px] text-fmmuted">{prompt.cat}</span>
            <button
              type="button"
              onClick={toggleKeep}
              disabled={busy}
              className={`rounded-full border px-2 py-0.5 font-grotesk text-[10px] disabled:opacity-50 ${
                prompt.kept ? "border-fmaccent/40 bg-fmaccent/15 text-fmaccent" : "border-fmborder text-fmmuted hover:border-fmaccent/40"
              }`}
            >
              {prompt.kept ? "✓ gardé" : "garder"}
            </button>
          </div>
          <p className="mt-1 line-clamp-2 font-grotesk text-xs text-fmmuted">{prompt.text_raw}</p>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {prompt.renders.map((r) => (
              <RenderBadge key={r.id} r={r} />
            ))}
            <button
              type="button"
              onClick={() => setShowRegen((s) => !s)}
              className="rounded-full border border-fmborder px-2 py-0.5 font-grotesk text-[10px] text-fmmuted hover:border-fmaccent/40"
            >
              ↻ régénérer
            </button>
          </div>
          {prompt.renders.map((r) => (
            <RenderProgress key={r.id} r={r} />
          ))}
          {showRegen && (
            <div className="mt-2 flex flex-wrap items-center gap-2 rounded-lg border border-fmborder p-2">
              <label className="font-grotesk text-[10px] text-fmmuted">
                Durée (s)
                <input
                  type="number"
                  value={clipSeconds}
                  onChange={(e) => setClipSeconds(Number(e.target.value))}
                  className="ml-1.5 w-16 rounded border border-fmborder bg-fmmutedbg px-1.5 py-0.5 font-grotesk text-xs text-fmfg"
                />
              </label>
              <input
                placeholder="Nouvelle piste audio (optionnel — sinon réutilise celle du projet)"
                value={audioOverride}
                onChange={(e) => setAudioOverride(e.target.value)}
                className="min-w-[220px] flex-1 rounded border border-fmborder bg-fmmutedbg px-2 py-0.5 font-grotesk text-[10.5px] text-fmfg"
              />
              <button
                type="button"
                onClick={regenerate}
                disabled={busy}
                className="rounded-lg border border-fmaccent/40 px-2.5 py-1 font-grotesk text-[10.5px] text-fmaccent hover:bg-fmaccent/10 disabled:opacity-50"
              >
                {busy ? "…" : "Lancer"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface VjOptions {
  checkpoints: string[];
  samplers: string[];
  schedulers: string[];
  defaults: {
    checkpoint: string;
    negative: string;
    expand_suffix: string;
    stills: { w: number; h: number; steps: number; cfg: number; sampler: string; scheduler: string; batch: number };
    render: { w: number; h: number; steps: number; fps: number; cfg: number; clip_seconds: number; sampler: string; scheduler: string; clip_skip: number };
  };
}

function NewProjectForm({ onCreated, onCancel }: { onCreated: (id: string) => void; onCancel: () => void }) {
  const [name, setName] = useState("");
  const [rawText, setRawText] = useState("");
  const [audioPath, setAudioPath] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [options, setOptions] = useState<VjOptions | null>(null);
  const [checkpoint, setCheckpoint] = useState("");
  const [negative, setNegative] = useState("");
  const [expandSuffix, setExpandSuffix] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [renderW, setRenderW] = useState(0);
  const [renderH, setRenderH] = useState(0);
  const [renderSteps, setRenderSteps] = useState(0);
  const [renderFps, setRenderFps] = useState(0);
  const [clipSeconds, setClipSeconds] = useState(0);

  useEffect(() => {
    fetchJson<VjOptions>(`${VJ_URL}/api/vj/options`).then((o) => {
      if (!o) return;
      setOptions(o);
      setCheckpoint(o.defaults.checkpoint);
      setNegative(o.defaults.negative);
      setExpandSuffix(o.defaults.expand_suffix);
      setRenderW(o.defaults.render.w);
      setRenderH(o.defaults.render.h);
      setRenderSteps(o.defaults.render.steps);
      setRenderFps(o.defaults.render.fps);
      setClipSeconds(o.defaults.render.clip_seconds);
    });
  }, []);

  async function browseAudio() {
    const res = await fetchJson<{ path: string; error?: string }>(`${VJ_URL}/api/browse-audio-file`);
    if (res?.path) setAudioPath(res.path);
  }

  async function submit() {
    const lines = rawText.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) {
      setErr("Ajoute au moins une idée de prompt (une par ligne).");
      return;
    }
    setBusy(true);
    setErr(null);
    const res = await fetchJson<{ id: string }>(`${VJ_URL}/api/vj/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim() || undefined,
        audio_path: audioPath.trim() || undefined,
        raw_prompts: lines.map((text, i) => ({ text, num: i + 1, cat: "NOUVEAU" })),
        config: {
          checkpoint: checkpoint || undefined,
          negative: negative || undefined,
          expand_suffix: expandSuffix,
          render: {
            w: renderW || undefined,
            h: renderH || undefined,
            steps: renderSteps || undefined,
            fps: renderFps || undefined,
            clip_seconds: clipSeconds || undefined,
          },
        },
      }),
    });
    setBusy(false);
    if (res) onCreated(res.id);
    else setErr("Échec de la création — vérifie que le moteur local tourne.");
  }

  return (
    <div className="fm-glass-card rounded-2xl p-4">
      <div className="font-grotesk text-sm font-semibold text-fmfg">Nouveau projet</div>
      <div className="mt-3 flex flex-col gap-2">
        <input
          placeholder="Nom du projet"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
        />
        <textarea
          placeholder="Idées de prompts, une par ligne — seront étoffées automatiquement (fog, void, drift, macro…) si elles sont brutes."
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          rows={6}
          className="rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-xs text-fmfg"
        />
        <div className="flex items-center gap-2">
          <input
            placeholder="Chemin de la piste audio (pour le sync BPM)"
            value={audioPath}
            onChange={(e) => setAudioPath(e.target.value)}
            className="min-w-[200px] flex-1 rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-xs text-fmfg"
          />
          <button type="button" onClick={browseAudio} className="rounded-lg border border-fmborder px-3 py-1.5 font-grotesk text-xs text-fmmuted hover:border-fmaccent/40">
            Parcourir…
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label className="font-grotesk text-xs text-fmmuted">Checkpoint</label>
          <select
            value={checkpoint}
            onChange={(e) => setCheckpoint(e.target.value)}
            className="min-w-[200px] flex-1 rounded border border-fmborder bg-fmmutedbg px-2 py-1.5 font-grotesk text-xs text-fmfg"
          >
            {(options?.checkpoints || [checkpoint].filter(Boolean)).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => setShowAdvanced((s) => !s)}
          className="self-start font-grotesk text-[10.5px] text-fmmuted hover:text-fmfg"
        >
          {showAdvanced ? "▾" : "▸"} réglages avancés (modèle, style, résolution…)
        </button>

        {showAdvanced && options && (
          <div className="flex flex-col gap-2 rounded-lg border border-fmborder p-2.5">
            <label className="font-grotesk text-[10px] text-fmmuted">
              Négatif
              <textarea
                value={negative}
                onChange={(e) => setNegative(e.target.value)}
                rows={2}
                className="mt-1 w-full rounded border border-fmborder bg-fmmutedbg px-2 py-1 font-grotesk text-[10.5px] text-fmfg"
              />
            </label>
            <label className="font-grotesk text-[10px] text-fmmuted">
              Suffixe d&apos;expansion (ajouté aux prompts bruts — vide = aucun)
              <input
                value={expandSuffix}
                onChange={(e) => setExpandSuffix(e.target.value)}
                className="mt-1 w-full rounded border border-fmborder bg-fmmutedbg px-2 py-1 font-grotesk text-[10.5px] text-fmfg"
              />
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <label className="font-grotesk text-[10px] text-fmmuted">
                Largeur
                <input
                  type="number"
                  value={renderW}
                  onChange={(e) => setRenderW(Number(e.target.value))}
                  className="ml-1.5 w-20 rounded border border-fmborder bg-fmmutedbg px-1.5 py-0.5 font-grotesk text-xs text-fmfg"
                />
              </label>
              <label className="font-grotesk text-[10px] text-fmmuted">
                Hauteur
                <input
                  type="number"
                  value={renderH}
                  onChange={(e) => setRenderH(Number(e.target.value))}
                  className="ml-1.5 w-20 rounded border border-fmborder bg-fmmutedbg px-1.5 py-0.5 font-grotesk text-xs text-fmfg"
                />
              </label>
              <label className="font-grotesk text-[10px] text-fmmuted">
                Steps
                <input
                  type="number"
                  value={renderSteps}
                  onChange={(e) => setRenderSteps(Number(e.target.value))}
                  className="ml-1.5 w-16 rounded border border-fmborder bg-fmmutedbg px-1.5 py-0.5 font-grotesk text-xs text-fmfg"
                />
              </label>
              <label className="font-grotesk text-[10px] text-fmmuted">
                FPS
                <input
                  type="number"
                  value={renderFps}
                  onChange={(e) => setRenderFps(Number(e.target.value))}
                  className="ml-1.5 w-16 rounded border border-fmborder bg-fmmutedbg px-1.5 py-0.5 font-grotesk text-xs text-fmfg"
                />
              </label>
              <label className="font-grotesk text-[10px] text-fmmuted">
                Durée clip par défaut (s)
                <input
                  type="number"
                  value={clipSeconds}
                  onChange={(e) => setClipSeconds(Number(e.target.value))}
                  className="ml-1.5 w-16 rounded border border-fmborder bg-fmmutedbg px-1.5 py-0.5 font-grotesk text-xs text-fmfg"
                />
              </label>
            </div>
          </div>
        )}

        {err && <p className="font-grotesk text-xs text-[#ff4d5e]">{err}</p>}
        <div className="mt-1 flex items-center gap-2">
          <button
            type="button"
            onClick={submit}
            disabled={busy}
            className="rounded-lg border border-fmaccent/40 px-3 py-1.5 font-grotesk text-xs text-fmaccent hover:bg-fmaccent/10 disabled:opacity-50"
          >
            {busy ? "Création…" : "Créer et lancer le screening"}
          </button>
          <button type="button" onClick={onCancel} className="rounded-lg border border-fmborder px-3 py-1.5 font-grotesk text-xs text-fmmuted hover:border-fmaccent/40">
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

export function VjStudioClient() {
  const [online, setOnline] = useState(false);
  const [projects, setProjects] = useState<VjProjectSummary[] | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [project, setProject] = useState<VjProject | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [onlyKept, setOnlyKept] = useState(false);
  const [clipSeconds, setClipSeconds] = useState(20);

  const refreshProjects = useCallback(() => {
    fetchJson<VjProjectSummary[]>(`${VJ_URL}/api/vj/projects`).then(setProjects);
  }, []);

  const refreshProject = useCallback((id: string) => {
    fetchJson<VjProject>(`${VJ_URL}/api/vj/projects/${id}/render-status`).then((p) => {
      if (p) setProject(p);
    });
  }, []);

  useEffect(() => {
    if (online) refreshProjects();
  }, [online, refreshProjects]);

  useEffect(() => {
    if (!selectedId) return;
    refreshProject(selectedId);
    const interval = setInterval(() => refreshProject(selectedId), 10000);
    return () => clearInterval(interval);
  }, [selectedId, refreshProject]);

  function backToArchive() {
    setSelectedId(null);
    setProject(null);
  }

  async function renderKept() {
    if (!project) return;
    await fetchJson(`${VJ_URL}/api/vj/projects/${project.id}/render`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clip_seconds: clipSeconds }),
    });
    refreshProject(project.id);
  }

  const visiblePrompts = project ? (onlyKept ? project.prompts.filter((p) => p.kept) : project.prompts) : [];

  return (
    <div className="fm-rise flex flex-col gap-6">
      <VjLocalInterfaceCard onOnline={setOnline} />

      <Section id="vj-studio-help" title="Mode d'emploi">
        <ol className="fm-glass-card flex list-decimal flex-col gap-2 rounded-2xl p-4 pl-8 font-grotesk text-xs text-fmmuted marker:text-fmaccent">
          <li>
            <span className="text-fmfg">Lance le moteur local</span> (bouton ▶ ci-dessus) si le statut est hors ligne — ouvre une fenêtre sur ce poste. Nécessite le GPU local et Stable Diffusion WebUI + Deforum déjà lancés.
          </li>
          <li>
            <span className="text-fmfg">+ Nouveau projet</span> — colle tes idées de prompts, une par ligne (brutes ou déjà détaillées, elles seront complétées automatiquement si besoin), et choisis la piste audio de référence pour le sync BPM.
          </li>
          <li>
            Le <span className="text-fmfg">screening</span> se lance tout seul : 3 variantes par prompt en image fixe, pour choisir vite sans lancer de rendu vidéo.
          </li>
          <li>
            Dans le projet, coche <span className="text-fmfg">« garder »</span> sur les prompts qui te plaisent — les autres restent dans l&apos;archive, réutilisables plus tard.
          </li>
          <li>
            Choisis une <span className="text-fmfg">durée de clip</span> puis <span className="text-fmfg">« ▶ Rendre les gardés non-rendus »</span> — détecte le BPM de la piste et lance les rendus Deforum synchronisés, un par un (GPU local = un seul rendu à la fois, ça peut prendre plusieurs dizaines de minutes par clip).
          </li>
          <li>
            Suis l&apos;avancement en direct sous chaque prompt (statut + étape) — clique un badge <span className="text-fmfg">terminé</span> pour ouvrir le clip.
          </li>
          <li>
            <span className="text-fmfg">↻ régénérer</span> marche à tout moment sur n&apos;importe quel prompt archivé — même longtemps après, avec une autre piste audio ou une autre durée, sans retaper le prompt.
          </li>
        </ol>
      </Section>

      {!online && <p className="font-grotesk text-sm text-fmmuted">Lance le moteur local pour voir l&apos;archive des projets.</p>}

      {online && !selectedId && (
        <>
          <div className="flex items-center justify-between">
            <h1 className="font-grotesk text-xs uppercase tracking-[0.16em] text-fmmuted">📼 Archive — {projects?.length ?? 0} projet(s)</h1>
            <button
              type="button"
              onClick={() => setShowNew((s) => !s)}
              className="rounded-lg border border-fmborder px-3 py-1.5 font-grotesk text-sm text-fmfg hover:border-fmaccent/40"
            >
              + Nouveau projet
            </button>
          </div>

          {showNew && (
            <NewProjectForm
              onCancel={() => setShowNew(false)}
              onCreated={(id) => {
                setShowNew(false);
                refreshProjects();
                setSelectedId(id);
              }}
            />
          )}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(projects || []).map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedId(p.id)}
                className="fm-glass-card rounded-xl p-3 text-left hover:border-fmaccent/40"
              >
                <div className="font-grotesk text-[13px] font-medium text-fmfg">{p.name}</div>
                <div className="mt-1 font-grotesk text-[10px] text-fmmuted">{new Date(p.created_at).toLocaleDateString("fr-FR")}</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="rounded-full border border-fmborder px-2 py-0.5 font-grotesk text-[10px] text-fmmuted">{p.prompt_count} prompts</span>
                  <span className="rounded-full border border-fmborder px-2 py-0.5 font-grotesk text-[10px] text-fmaccent">{p.kept_count} gardés</span>
                  <span className="rounded-full border border-fmborder px-2 py-0.5 font-grotesk text-[10px] text-fmmuted">{p.render_count} rendus</span>
                  {p.bpm && <span className="rounded-full border border-fmborder px-2 py-0.5 font-grotesk text-[10px] text-fmmuted">{p.bpm} BPM</span>}
                </div>
              </button>
            ))}
            {projects?.length === 0 && <p className="font-grotesk text-sm text-fmmuted">Aucun projet. Clique « + Nouveau projet ».</p>}
          </div>
        </>
      )}

      {online && selectedId && project && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <button type="button" onClick={backToArchive} className="font-grotesk text-xs text-fmmuted hover:text-fmfg">
              ← retour à l&apos;archive
            </button>
            <div className="flex items-center gap-2">
              <label className="font-grotesk text-[10.5px] text-fmmuted">
                Durée clip (s)
                <input
                  type="number"
                  value={clipSeconds}
                  onChange={(e) => setClipSeconds(Number(e.target.value))}
                  className="ml-1.5 w-16 rounded border border-fmborder bg-fmmutedbg px-1.5 py-0.5 font-grotesk text-xs text-fmfg"
                />
              </label>
              <button
                type="button"
                onClick={renderKept}
                className="rounded-lg border border-fmaccent/40 px-3 py-1.5 font-grotesk text-xs text-fmaccent hover:bg-fmaccent/10"
              >
                ▶ Rendre les gardés non-rendus
              </button>
            </div>
          </div>

          <div>
            <h2 className="font-grotesk text-sm font-semibold text-fmfg">{project.name}</h2>
            <div className="mt-1 flex flex-wrap gap-1.5">
              <span className="rounded-full border border-fmborder px-2 py-0.5 font-grotesk text-[10px] text-fmmuted">{project.audio_path || "aucune piste"}</span>
              {project.bpm && <span className="rounded-full border border-fmborder px-2 py-0.5 font-grotesk text-[10px] text-fmmuted">{project.bpm} BPM</span>}
              <button
                type="button"
                onClick={() => setOnlyKept((v) => !v)}
                className={`rounded-full border px-2 py-0.5 font-grotesk text-[10px] ${onlyKept ? "border-fmaccent/40 bg-fmaccent/15 text-fmaccent" : "border-fmborder text-fmmuted"}`}
              >
                {onlyKept ? "gardés uniquement" : "tous les prompts"}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {visiblePrompts.map((prompt) => (
              <PromptRow
                key={prompt.id}
                project={project}
                prompt={prompt}
                onKeepToggled={(pid, kept) =>
                  setProject((prev) => (prev ? { ...prev, prompts: prev.prompts.map((p) => (p.id === pid ? { ...p, kept } : p)) } : prev))
                }
                onRegenerated={() => refreshProject(project.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
