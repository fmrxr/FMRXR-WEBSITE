"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const selectBase =
  "w-full rounded-md border border-fmborder bg-fmbg/60 px-4 py-3 text-sm outline-none focus:border-fmaccent/60";

export function StartRequest({
  industries,
  services,
}: {
  industries: { slug: string; name: string }[];
  services: { slug: string; title: string }[];
}) {
  const router = useRouter();
  const [industry, setIndustry] = useState("");
  const [service, setService] = useState("");

  function start() {
    const q = new URLSearchParams();
    if (industry) q.set("industry", industry);
    if (service) q.set("service", service);
    router.push(`/start${q.toString() ? `?${q.toString()}` : ""}`);
  }

  return (
    <div className="mx-auto mt-10 flex max-w-2xl flex-col items-stretch gap-3 sm:flex-row">
      <select value={industry} onChange={(e) => setIndustry(e.target.value)} className={`${selectBase} ${industry ? "text-fmfg" : "text-fmaccent"}`} aria-label="Industry">
        <option value="" className="text-fmaccent">Your industry</option>
        {industries.map((i) => (
          <option key={i.slug} value={i.name} className="text-fmfg">{i.name}</option>
        ))}
      </select>
      <select value={service} onChange={(e) => setService(e.target.value)} className={`${selectBase} ${service ? "text-fmfg" : "text-fmaccent"}`} aria-label="Service">
        <option value="" className="text-fmaccent">Service needed</option>
        {services.map((s) => (
          <option key={s.slug} value={s.title} className="text-fmfg">{s.title}</option>
        ))}
      </select>
      <button
        onClick={start}
        className="fm-glass-card group shrink-0 rounded-md px-7 py-3 text-sm font-medium uppercase tracking-[0.1em] text-fmfg"
      >
        Start{" "}
        <span className="inline-block text-fmaccent transition-transform group-hover:translate-x-1">→</span>
      </button>
    </div>
  );
}
