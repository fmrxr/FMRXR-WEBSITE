"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn, signUp } from "@/app/actions/auth";

export default function AuthPage() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [error, setError] = useState<string | null>(null);

  async function action(fd: FormData) {
    const res = mode === "in" ? await signIn(fd) : await signUp(fd);
    if (res?.error) setError(res.error);
  }

  return (
    <main className="fm fm-canvas flex min-h-dvh flex-col items-center justify-center px-5">
      <div className="relative z-10 w-full max-w-sm">
        <Link href="/" className="fm-display text-lg tracking-[0.04em] text-fmfg">
          FMRXR<span className="text-fmaccent">//</span>
        </Link>
        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-fmmuted">Admin access</p>

        <form action={action} className="fm-glass-card mt-8 flex flex-col gap-4 rounded-xl p-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">Email</label>
            <input id="email" name="email" type="email" required
              className="rounded-md border border-fmborder bg-fmbg/60 px-3 py-2 text-sm text-fmfg outline-none focus:border-fmaccent/60" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">Password</label>
            <input id="password" name="password" type="password" required minLength={8}
              className="rounded-md border border-fmborder bg-fmbg/60 px-3 py-2 text-sm text-fmfg outline-none focus:border-fmaccent/60" />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit"
            className="mt-1 rounded-md bg-fmfg px-4 py-2 text-sm font-medium uppercase tracking-[0.08em] text-fmbg transition-opacity hover:opacity-90">
            {mode === "in" ? "Sign in" : "Create account"}
          </button>
        </form>

        <button
          className="fm-link mt-5 text-[12px] uppercase tracking-[0.1em] text-fmmuted"
          onClick={() => setMode(mode === "in" ? "up" : "in")}
        >
          {mode === "in" ? "First time? Create the admin account" : "Have an account? Sign in"}
        </button>
      </div>
    </main>
  );
}
