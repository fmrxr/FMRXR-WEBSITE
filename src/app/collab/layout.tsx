import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentRoles, currentUser } from "@/lib/auth";
import { signOut } from "@/app/actions/auth";
import { SpaceSwitcher } from "@/components/shell/SpaceSwitcher";

export const metadata: Metadata = {
  title: "Opportunities · FMRXR",
  // Espace prive : jamais d'indexation, meme si une URL fuite.
  robots: { index: false, follow: false },
};

export default async function CollabLayout({ children }: { children: React.ReactNode }) {
  const [user, roles] = await Promise.all([currentUser(), currentRoles()]);
  if (!user) redirect("/auth");

  // Un compte authentifie sans role n'entre pas, mais on le lui dit au lieu de
  // le renvoyer vers /auth : il vient de s'y connecter avec succes, le renvoyer
  // la-bas se lit comme un mot de passe refuse.
  if (roles.length === 0) {
    return (
      <div className="fm fm-canvas relative flex min-h-screen items-center justify-center px-5">
        <div className="relative z-10 max-w-md">
          <p className="fm-display text-lg text-fmfg">Compte créé, accès pas encore ouvert</p>
          <p className="fm-grotesk mt-3 text-sm leading-relaxed text-fmfg/80">
            La connexion a fonctionné. Ce compte n’a simplement aucun rôle attribué,
            donc il ne voit encore rien. Demandez à FMRXR d’ouvrir l’accès, puis
            rechargez cette page.
          </p>
          <p className="fm-grotesk mt-4 text-xs text-fmmuted">{user.email}</p>
          <Link href="/account" className="fm-link fm-grotesk mt-3 inline-block text-xs uppercase tracking-[0.12em] text-fmmuted">
            Changer mon mot de passe
          </Link>
          <form action={signOut} className="mt-5">
            <button type="submit" className="fm-link text-xs uppercase tracking-[0.12em] text-fmmuted">
              Sortir
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fm fm-canvas relative flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-fmborder bg-fmbg/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-5 py-4 md:px-8">
          <Link href="/collab" className="fm-display text-sm tracking-[0.08em] text-fmfg">
            FMRXR<span className="text-fmaccent">//</span>
          </Link>
          {/* Le selecteur ne rend rien quand un seul espace est ouvert, cas d'un
              invite : on lui affiche alors le titre en clair, sinon la pastille
              active du selecteur dit deja ou l'on est. */}
          {roles.includes("admin") || roles.includes("editor") ? (
            <SpaceSwitcher roles={roles} />
          ) : (
            <span className="text-[10px] uppercase tracking-[0.14em] text-fmmuted">Opportunities</span>
          )}
          <div className="ml-auto flex items-center gap-4">
            <Link href="/account" className="fm-link hidden text-xs text-fmmuted sm:inline">
              {user.email}
            </Link>
            <form action={signOut}>
              <button type="submit" className="fm-link text-xs uppercase tracking-[0.12em] text-fmmuted">
                Sortir
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="relative z-10 flex-1">{children}</main>
    </div>
  );
}
