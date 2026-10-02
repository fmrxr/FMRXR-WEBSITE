import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentRoles, currentUser } from "@/lib/auth";
import { landingPath } from "@/lib/roles";
import { signOut } from "@/app/actions/auth";
import { PasswordForm } from "./form";

export const metadata: Metadata = {
  title: "Mon compte",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

// Accessible des qu'une session existe, role ou pas : quelqu'un qui attend
// encore son role doit pouvoir remplacer le mot de passe temporaire qu'on lui a
// transmis, sans attendre qu'on lui ouvre un espace.
export default async function Account() {
  const [user, roles] = await Promise.all([currentUser(), currentRoles()]);
  if (!user) redirect("/auth");

  return (
    <main className="fm fm-canvas flex min-h-dvh flex-col items-center justify-center px-5">
      <div className="relative z-10 w-full max-w-sm">
        <Link href="/" className="fm-display text-lg tracking-[0.04em] text-fmfg">
          FMRXR<span className="text-fmaccent">//</span>
        </Link>
        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-fmmuted">Mon compte</p>

        <p className="fm-grotesk mt-6 text-sm text-fmfg/80">{user.email}</p>
        <p className="fm-grotesk mt-1 text-xs text-fmmuted">
          {roles.length > 0 ? roles.join(", ") : "aucun rôle attribué"}
        </p>

        <div className="mt-8">
          <PasswordForm />
        </div>

        <div className="mt-10 flex items-center gap-4 border-t border-fmborder pt-5">
          <Link
            href={landingPath(roles)}
            className="fm-link fm-grotesk text-xs uppercase tracking-[0.12em] text-fmmuted"
          >
            ← Retour
          </Link>
          <form action={signOut} className="ml-auto">
            <button type="submit" className="fm-link fm-grotesk text-xs uppercase tracking-[0.12em] text-fmmuted">
              Sortir
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
