"use client";

import Link from "next/link";
import { useState } from "react";
import { submitLead } from "@/app/actions/leads";
import { getSupabaseBrowser } from "@/lib/supabase/client";

type Attachment = { url: string; name: string; type: string };
const MAX_MB = 50;

const fieldCls =
  "w-full rounded-md border border-fmborder bg-fmbg/60 px-4 py-3 text-sm text-fmfg outline-none focus:border-fmaccent/60";

export function StartForm({
  industries,
  services,
  defaultIndustry,
  defaultService,
}: {
  industries: { slug: string; name: string }[];
  services: { slug: string; title: string }[];
  defaultIndustry: string;
  defaultService: string;
}) {
  const [d, setD] = useState({
    name: "",
    email: "",
    company: "",
    industry: defaultIndustry,
    service: defaultService,
    message: "",
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [uploading, setUploading] = useState(false);
  const set = (k: string, v: string) => setD((s) => ({ ...s, [k]: v }));

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
    const res = await submitLead({ ...d, attachments });
    setBusy(false);
    if ("error" in res) {
      setError(res.error);
      return;
    }
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
    <form onSubmit={submit} className="fm-glass-card flex flex-col gap-4 rounded-xl p-6 md:p-8">
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

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">Project brief</label>
        <textarea rows={4} className={fieldCls} value={d.message} onChange={(e) => set("message", e.target.value)} placeholder="Venue, dates, scope, references…" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">
          Attach a brief — image · reference · pdf · video (max {MAX_MB} MB each)
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
