"use client";
import { useState } from "react";
import type { CampaignConfig, ContactField, Locale } from "@/lib/photobooth/config";

// Formulaire de la generation : l'email pour recevoir le portrait (l'invite
// peut partir, la borne passe au suivant) et, avec l'option contact, les
// coordonnees demandees par la marque. La case marketing n'est jamais cochee
// d'avance.

type Props = {
  config: CampaignConfig;
  locale: Locale;
  t: Record<string, string>;
  slug: string;
  accessKey: string;
  session: string;
  usageId: string;
  /** Formulaire envoye (ou deja envoye). */
  onSubmitted: () => void;
  /** L'invite part : la borne revient a l'accueil. */
  onLeave?: () => void;
  compact?: boolean;
};

export function Delivery({ config, locale, t, slug, accessKey, session, usageId, onSubmitted, onLeave, compact }: Props) {
  const lead = config.leadCapture.enabled ? config.leadCapture : null;
  const fields: readonly ContactField[] = lead ? lead.fields : ["email"];
  const [v, setV] = useState({ name: "", email: "", phone: "", answer: "" });
  const [optIn, setOptIn] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const [sentEmail, setSentEmail] = useState(false);
  if (!lead && !config.emailDelivery) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setError(null);
    try {
      const r = await fetch("/api/photobooth/deliver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug, k: accessKey, session, usageId,
          ...Object.fromEntries(Object.entries(v).filter(([, x]) => x.trim())),
          ...(lead ? { optIn } : {}),
        }),
      });
      const j = await r.json();
      if (!j.ok) {
        setState("idle");
        setError(t[`form_${j.error}`] ?? t.form_DEFAULT);
        return;
      }
      setSentEmail(Boolean(j.email));
      setState("sent");
      onSubmitted();
    } catch {
      setState("idle");
      setError(t.form_DEFAULT);
    }
  }

  if (state === "sent") {
    return (
      <div data-testid="delivery-sent" className="flex flex-col items-center gap-3 rounded-xl border border-fmaccent/50 bg-fmcard/80 px-5 py-4 text-center">
        <p className="text-fmfg">{sentEmail ? t.mailSent : t.formThanks}</p>
        {onLeave && sentEmail && (
          <button onClick={onLeave} className="rounded-full border border-fmborder px-6 py-2.5 text-sm text-fmfg/85 hover:border-fmfg/50">{t.mailLeave}</button>
        )}
      </div>
    );
  }

  const input = "w-full rounded-lg border border-fmborder bg-fmbg/80 px-4 py-3 text-fmfg placeholder:text-fmmuted focus:border-fmaccent focus:outline-none";
  return (
    <form onSubmit={submit} data-testid="delivery-form" className={`flex w-full max-w-md flex-col gap-3 rounded-xl border border-fmborder bg-fmcard/80 p-4 text-start ${compact ? "" : "md:p-5"}`}>
      <p className="font-semibold text-fmfg">{lead ? t.formTitle : t.mailTitle}</p>
      <p className="-mt-1 text-xs text-fmmuted">{lead ? t.formHint : t.mailHint}</p>
      {fields.includes("name") && (
        <input className={input} autoComplete="name" placeholder={t.formName} value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} required maxLength={120} />
      )}
      {fields.includes("email") && (
        <input className={input} type="email" inputMode="email" autoComplete="email" placeholder={t.formEmail} value={v.email} onChange={(e) => setV({ ...v, email: e.target.value })} required maxLength={200} dir="ltr" />
      )}
      {fields.includes("phone") && (
        <input className={input} type="tel" inputMode="tel" autoComplete="tel" placeholder={t.formPhone} value={v.phone} onChange={(e) => setV({ ...v, phone: e.target.value })} maxLength={40} dir="ltr" />
      )}
      {lead?.question && (
        <input className={input} placeholder={lead.question[locale]} value={v.answer} onChange={(e) => setV({ ...v, answer: e.target.value })} maxLength={300} />
      )}
      {lead && (
        <label className="flex items-start gap-3 text-sm text-fmfg/85">
          <input type="checkbox" checked={optIn} onChange={(e) => setOptIn(e.target.checked)} className="mt-1 size-4 accent-[var(--color-fmaccent,#7bef7b)]" />
          <span>{lead.optIn[locale]}</span>
        </label>
      )}
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button type="submit" disabled={state === "sending"} className="rounded-full bg-fmfg px-6 py-3 font-semibold text-fmbg transition hover:bg-fmaccent disabled:opacity-50">
        {state === "sending" ? t.formSending : lead ? t.formSend : t.mailSend}
      </button>
      <p className="text-[11px] leading-snug text-fmmuted">{lead ? t.formPrivacy : t.mailPrivacy}</p>
    </form>
  );
}
