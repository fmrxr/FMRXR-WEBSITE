"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/actions/auth";
import { SpaceSwitcher } from "@/components/shell/SpaceSwitcher";
import type { Role } from "@/lib/roles";

// Groupes plutot qu'une liste a plat : onze entrees d'affilee ne disent pas
// lesquelles touchent le site public et lesquelles sont de la configuration.
const GROUPS: { title: string; links: [string, string][] }[] = [
  {
    title: "Contenu",
    links: [
      ["Projects", "/admin/projects"],
      ["Articles", "/admin/articles"],
      ["Services", "/admin/services"],
      ["Industries", "/admin/industries"],
      ["Stack", "/admin/stack"],
    ],
  },
  {
    title: "Relation",
    links: [
      ["Requests", "/admin/requests"],
      ["Clients", "/admin/clients"],
    ],
  },
  {
    title: "Expériences",
    links: [
      ["Page Experiences", "/admin/experiences"],
      ["Photobooth", "/admin/photobooth"],
    ],
  },
  {
    title: "Réglages",
    links: [
      ["Settings", "/admin/settings"],
      ["Team", "/admin/team"],
    ],
  },
];

// Bureau : colonne fixe a gauche. Telephone : barre en haut et menu en tiroir,
// sinon la colonne de 224 px ne laissait que 170 px au contenu.
export function Sidebar({ roles }: { roles: Role[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(pathname);
  // une navigation referme le tiroir
  if (seen !== pathname) { setSeen(pathname); setOpen(false); }
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <aside className="relative z-10 hidden w-56 shrink-0 flex-col gap-1 border-r border-fmborder bg-fmbg/60 p-4 backdrop-blur md:flex">
        <NavContent roles={roles} pathname={pathname} />
      </aside>

      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-fmborder bg-fmbg/90 px-4 py-3 backdrop-blur md:hidden">
        <Link href="/admin" className="fm-display text-sm tracking-[0.06em] text-fmfg">
          FMRXR<span className="text-fmaccent">{"//"}</span> <span className="ml-1 text-[10px] uppercase tracking-[0.14em] text-fmmuted">CMS</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="admin-drawer"
          className="rounded-md border border-fmborder px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-fmfg"
        >
          Menu
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true" aria-label="Menu du CMS">
          <button type="button" aria-label="Fermer le menu" onClick={() => setOpen(false)} className="absolute inset-0 bg-black/60" />
          <aside id="admin-drawer" className="absolute inset-y-0 left-0 flex w-[82vw] max-w-72 flex-col gap-1 overflow-y-auto border-r border-fmborder bg-fmbg p-4">
            <button type="button" onClick={() => setOpen(false)} className="mb-2 self-end text-xs uppercase tracking-[0.14em] text-fmmuted">
              Fermer ✕
            </button>
            <NavContent roles={roles} pathname={pathname} />
          </aside>
        </div>
      )}
    </>
  );
}

function NavContent({ roles, pathname }: { roles: Role[]; pathname: string }) {
  const item = (href: string) => {
    // Comparaison exacte : sinon /admin surlignerait toutes les sous-pages.
    const active = pathname === href;
    return [
      "fm-grotesk rounded-md px-2.5 py-2 text-sm transition-colors md:py-1.5",
      active ? "bg-fmmutedbg text-fmfg" : "text-fmmuted hover:bg-fmmutedbg/60 hover:text-fmfg",
    ].join(" ");
  };

  return (
    <>
      <Link href="/" className="fm-display mb-1 px-2.5 text-sm tracking-[0.06em] text-fmfg">
        FMRXR<span className="text-fmaccent">{"//"}</span>
      </Link>
      <div className="mb-5 px-1.5">
        <SpaceSwitcher roles={roles} />
      </div>

      <Link href="/admin" className={item("/admin")}>Vue d’ensemble</Link>

      <nav className="mt-4 flex flex-col gap-4">
        {GROUPS.map((g) => (
          <div key={g.title} className="flex flex-col gap-0.5">
            <p className="px-2.5 pb-1 text-[10px] uppercase tracking-[0.14em] text-fmmuted/70">
              {g.title}
            </p>
            {g.links.map(([label, href]) => (
              <Link key={href} href={href} className={item(href)}>{label}</Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-0.5 border-t border-fmborder pt-3">
        <Link href="/account" prefetch={false} className="fm-link fm-grotesk px-2.5 py-1 text-xs text-fmmuted">
          Mon compte →
        </Link>
        <Link href="/" className="fm-link fm-grotesk px-2.5 py-1 text-xs text-fmmuted">
          Site public →
        </Link>
        <form action={signOut}>
          <button
            type="submit"
            className="fm-link fm-grotesk px-2.5 py-1 text-left text-xs text-fmmuted"
          >
            Déconnexion
          </button>
        </form>
      </div>
    </>
  );
}
