"use client";

import Link from "next/link";
import { useState } from "react";
import { submitLead } from "@/app/actions/leads";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { track } from "@/lib/track";

type Attachment = { url: string; name: string; type: string };
const MAX_MB = 50;

// Fourchettes en euros : c'est la devise de la majorité des devis du studio.
// « Not defined yet » reste un vrai choix, pas un champ vide.
const BUDGETS = ["Under €5k", "€5k to €15k", "€15k to €30k", "€30k to €75k", "€75k and above", "Not defined yet"];
const TIMELINES = ["Within 1 month", "1 to 3 months", "3 to 6 months", "6 months or more", "Not fixed yet"];

const fieldCls =
  "w-full rounded-md border border-fmborder bg-fmbg/60 px-4 py-3 text-sm text-fmfg outline-none focus:border-fmaccent/60";

export function StartForm({
  industries,
  services,
  defaultIndustry,
  defaultService,
  refProject,
}: {
  industries: { slug: string; name: string }[];
  services: { slug: string; title: string }[];
  defaultIndustry: string;
  defaultService: string;
  // Slug du projet depuis lequel la personne est venue (« Discuss a similar
  // project ») : joint à la demande pour que le studio sache de quoi on parle.
  refProject?: string;
}) {
  const [d, setD] = useState({
    name: "",
    email: "",
    company: "",
    // L'URL porte des slugs (?industry=music), les menus et la demande
    // enregistrée portent des noms : on accepte l'un ou l'autre.
    industry: industries.find((i) => i.slug === defaultIndustry || i.name === defaultIndustry)?.name ?? "",
    service: services.find((s) => s.slug === defaultService || s.title === defaultService)?.title ?? "",
    budget: "",
    timeline: "",
    location: "",
    message: "",
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [started, setStarted] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [uploading, setUploading] = useState(false);
  const set = (k: string, v: string) => setD((s) => ({ ...s, [k]: v }));

  // Entonnoir mesuré dans GA4 : form_start au premier champ touché, puis
  // generate_lead (événement recommandé GA4) ou form_error. Seulement les
  // choix des menus, jamais ce que la personne a écrit.
  const funnel = () => ({ industry: d.industry || "none", service: d.service || "none", budget: d.budget || "none", ref: refProject || "none" });
  function onFirstFocus() {
    if (started) return;
    setStarted(true);
    track("form_start", { form: "start", industry: d.industry || "none", service: d.service || "none", ref: refProject || "none" });
  }

  async function addFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);
    const supabase = getSupabaseBrowser();
    const next: Attachment[] = [];
    for (const file of Array.from(files)) {
      if (file.size > MAX_MB * 1024 * 1024) {
        setError(`${file.name} is over ${MAX_MB} MB`);
        continue;
      }
      const ext = file.name.split(".").pop() ?? "bin";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("briefs").upload(path, file, {
        contentType: file.type,
        upsert: false,
      });
      if (upErr) {
        setError(upErr.message);
        continue;
      }
      const { data } = supabase.storage.from("briefs").getPublicUrl(path);
      next.push({ url: data.publicUrl, name: file.name, type: file.type });
    }
    setAttachments((a) => [...a, ...next]);
    setUploading(false);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const ref = refProject ? `

Seen on fmrxr.com/projects/${refProject}` : "";
    const res = await submitLead({ ...d, message: (d.message + ref).trim().slice(0, 2000), attachments });
    setBusy(false);
    if ("error" in res) {
      setError(res.error);
      track("form_error", { form: "start" });
      return;
    }
    track("generate_lead", { form: "start", ...funnel() });
    setSent(true);
  }

  if (sent) {
    return (
      <div className="fm-glass-card rounded-xl p-8 text-center">
        <p className="text-[11px] uppercase tracking-[0.15em] text-fmaccent">● Request received</p>
        <h2 className="fm-display mt-4 text-2xl text-fmfg">Thank you, {d.name.split(" ")[0] || "there"}.</h2>
        <p className="fm-grotesk mx-auto mt-3 max-w-md text-sm text-fmmuted">
          Your project request is with the studio. We&apos;ll be in touch shortly.
        </p>
        <Link href="/" className="fm-link mt-6 inline-block text-[11px] uppercase tracking-[0.12em] text-fmmuted">
          ← Back home
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} onFocusCapture={onFirstFocus} className="fm-glass-card flex flex-col gap-4 rounded-xl p-6 md:p-8">
      {refProject && (
        <p className="text-[10px] uppercase tracking-[0.15em] text-fmmuted">
          <span className="text-fmaccent">●</span> About a project like{" "}
          <Link href={`/projects/${refProject}`} className="fm-link text-fmfg">{refProject.replace(/-/g, " ")}</Link>
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">Name *</label>
          <input className={fieldCls} required value={d.name} onChange={(e) => set("name", e.target.value)} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">Email *</label>
          <input type="email" className={fieldCls} required value={d.email} onChange={(e) => set("email", e.target.value)} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">Company / Organisation</label>
        <input className={fieldCls} value={d.company} onChange={(e) => set("company", e.target.value)} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">Industry</label>
          <select className={fieldCls} value={d.industry} onChange={(e) => set("industry", e.target.value)}>
            <option value="">Select…</option>
            {industries.map((i) => (
              <option key={i.slug} value={i.name}>{i.name}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">Service</label>
          <select className={fieldCls} value={d.service} onChange={(e) => set("service", e.target.value)}>
            <option value="">Select…</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>{s.title}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">Budget range</label>
          <select className={fieldCls} value={d.budget} onChange={(e) => set("budget", e.target.value)}>
            <option value="">Select…</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">Project date</label>
          <select className={fieldCls} value={d.timeline} onChange={(e) => set("timeline", e.target.value)}>
            <option value="">Select…</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">Location</label>
          <input className={fieldCls} value={d.location} onChange={(e) => set("location", e.target.value)} placeholder="City, country" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">Project brief</label>
        <textarea rows={4} className={fieldCls} value={d.message} onChange={(e) => set("message", e.target.value)} placeholder="Venue, scope, audience, references…" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">
          Attach a brief · image · reference · pdf · video (max {MAX_MB} MB each)
        </label>
        <label className="flex cursor-pointer items-center justify-center rounded-md border border-dashed border-fmborder px-4 py-6 text-center text-sm text-fmmuted transition-colors hover:bg-white/[0.02]">
          <input
            type="file"
            multiple
            accept="image/*,application/pdf,video/*"
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
          />
          {uploading ? "Uploading…" : "Click to add files"}
        </label>
        {attachments.length > 0 && (
          <ul className="flex flex-col gap-1.5">
            {attachments.map((f, i) => (
              <li key={i} className="flex items-center justify-between gap-3 rounded-md border border-fmborder bg-fmbg/40 px-3 py-2 text-xs text-fmfg">
                <span className="truncate">{f.name}</span>
                <button type="button" aria-label="Remove" onClick={() => setAttachments((a) => a.filter((_, j) => j !== i))} className="shrink-0 text-fmmuted hover:text-fmfg">✕</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={busy || uploading}
        className="fm-glass-card group mt-1 self-start rounded-md px-7 py-3 text-sm font-medium uppercase tracking-[0.1em] text-fmfg disabled:opacity-60"
      >
        {busy ? (
          "Sending…"
        ) : (
          <>
            Send request{" "}
            <span className="inline-block text-fmaccent transition-transform group-hover:translate-x-1">→</span>
          </>
        )}
      </button>
    </form>
  );
}
