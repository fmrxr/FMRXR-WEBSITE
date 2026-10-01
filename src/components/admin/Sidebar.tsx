"use client";
import Link from "next/link";
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
    title: "Réglages",
    links: [
      ["Settings", "/admin/settings"],
      ["Team", "/admin/team"],
    ],
  },
];

export function Sidebar({ roles }: { roles: Role[] }) {
  const pathname = usePathname();

  const item = (href: string) => {
    // Comparaison exacte : sinon /admin surlignerait toutes les sous-pages.
    const active = pathname === href;
    return [
      "fm-grotesk rounded-md px-2.5 py-1.5 text-sm transition-colors",
      active ? "bg-fmmutedbg text-fmfg" : "text-fmmuted hover:bg-fmmutedbg/60 hover:text-fmfg",
    ].join(" ");
  };

  return (
    <aside className="relative z-10 flex w-56 shrink-0 flex-col gap-1 border-r border-fmborder bg-fmbg/60 p-4 backdrop-blur">
      <Link href="/" className="fm-display mb-1 px-2.5 text-sm tracking-[0.06em] text-fmfg">
        FMRXR<span className="text-fmaccent">//</span>
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
    </aside>
  );
}
