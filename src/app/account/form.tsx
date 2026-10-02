"use client";
import { useState, useTransition } from "react";
import { changePassword } from "@/app/actions/account";

const FIELD =
  "fm-grotesk w-full rounded-lg border border-fmborder bg-fmmutedbg px-3 py-2 text-sm text-fmfg placeholder:text-fmmuted focus:border-fmaccent/50 focus:outline-none";

export function PasswordForm() {
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();

  const mismatch = confirm.length > 0 && pwd !== confirm;
  const ready = pwd.length >= 10 && pwd === confirm;

  function submit() {
    if (!ready) return;
    start(async () => {
      const res = await changePassword(pwd);
      if (res.error) setMsg({ ok: false, text: res.error });
      else {
        setMsg({ ok: true, text: "Mot de passe modifié. Il remplace celui qu’on t’a transmis." });
        setPwd(""); setConfirm("");
      }
    });
  }

  return (
    <div className="flex max-w-sm flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="pwd" className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">
          Nouveau mot de passe
        </label>
        <input
          id="pwd" type="password" value={pwd} autoComplete="new-password" minLength={10}
          onChange={(e) => setPwd(e.target.value)} className={FIELD}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="confirm" className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">
          Répéter
        </label>
        <input
          id="confirm" type="password" value={confirm} autoComplete="new-password"
          onChange={(e) => setConfirm(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
          className={FIELD}
        />
      </div>

      {mismatch && <p className="fm-grotesk text-xs text-amber-300">Les deux saisies diffèrent.</p>}
      {pwd.length > 0 && pwd.length < 10 && (
        <p className="fm-grotesk text-xs text-fmmuted">Au moins 10 caractères.</p>
      )}
      {msg && (
        <p className={`fm-grotesk text-xs ${msg.ok ? "text-fmaccent" : "text-red-400"}`}>{msg.text}</p>
      )}

      <button
        type="button" disabled={!ready || pending} onClick={submit}
        className="fm-grotesk mt-1 self-start rounded-lg border border-fmborder px-3 py-2 text-xs uppercase tracking-[0.1em] text-fmfg transition-colors hover:border-fmaccent/50 hover:text-fmaccent disabled:opacity-40"
      >
        {pending ? "Enregistrement…" : "Changer le mot de passe"}
      </button>
    </div>
  );
}
