"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "@/app/actions/auth";

// Pas de creation de compte ici. Le compte admin existe, et les acces se
// donnent depuis /admin/team : laisser une inscription ouverte reviendrait a
// laisser n'importe qui se creer un compte sur le domaine.
export function AuthForm({ initialError }: { initialError?: string }) {
  const [error, setError] = useState<string | null>(initialError ?? null);

  async function action(fd: FormData) {
    const res = await signIn(fd);
    if (res?.error) setError(res.error);
  }

  return (
    <main className="fm fm-canvas flex min-h-dvh flex-col items-center justify-center px-5">
      <div className="relative z-10 w-full max-w-sm">
        <Link href="/" className="fm-display text-lg tracking-[0.04em] text-fmfg">
          FMRXR<span className="text-fmaccent">//</span>
        </Link>
        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-fmmuted">Accès réservé</p>

        <form action={action} className="fm-glass-card mt-8 flex flex-col gap-4 rounded-xl p-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">Email</label>
            <input id="email" name="email" type="email" required autoComplete="email"
              className="rounded-md border border-fmborder bg-fmbg/60 px-3 py-2 text-sm text-fmfg outline-none focus:border-fmaccent/60" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">Mot de passe</label>
            <input id="password" name="password" type="password" required minLength={8}
              autoComplete="current-password"
              className="rounded-md border border-fmborder bg-fmbg/60 px-3 py-2 text-sm text-fmfg outline-none focus:border-fmaccent/60" />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit"
            className="mt-1 rounded-md bg-fmfg px-4 py-2 text-sm font-medium uppercase tracking-[0.08em] text-fmbg transition-opacity hover:opacity-90">
            Se connecter
          </button>
        </form>

        <p className="fm-grotesk mt-5 text-[12px] leading-relaxed text-fmmuted">
          Les comptes sont créés par FMRXR. Si vous n’en avez pas encore, demandez-le
          plutôt que d’essayer de vous inscrire.
        </p>
      </div>
    </main>
  );
}
