"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Role } from "@/lib/roles";

/**
 * Passage d'un espace a l'autre : OS, CMS, Opportunities.
 *
 * Les trois vivent sous le meme domaine mais n'ont aucune navigation commune,
 * et les liens croises etaient en bas de chaque barre laterale, sous la liste
 * des modules. En haut et toujours au meme endroit, on sait ou l'on est et ou
 * l'on peut aller sans se souvenir d'une URL.
 *
 * Un espace qu'on ne peut pas ouvrir n'est pas affiche : montrer « OS » a un
 * invite ne ferait que l'envoyer sur une redirection.
 */
const SPACES: { label: string; href: string; allowed: Role[] }[] = [
  { label: "OS", href: "/os", allowed: ["admin"] },
  { label: "CMS", href: "/admin", allowed: ["admin", "editor"] },
  { label: "Opportunities", href: "/collab", allowed: ["admin", "editor", "guest"] },
];

export function SpaceSwitcher({ roles }: { roles: Role[] }) {
  const pathname = usePathname();
  const visible = SPACES.filter((s) => s.allowed.some((r) => roles.includes(r)));
  if (visible.length < 2) return null;

  return (
    <div className="flex flex-wrap items-center gap-1">
      {visible.map((s) => {
        const active = pathname === s.href || pathname.startsWith(`${s.href}/`);
        return (
          <Link
            key={s.href}
            href={s.href}
            aria-current={active ? "page" : undefined}
            className={[
              "fm-grotesk rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.1em] transition-colors",
              active
                ? "border-fmaccent/50 text-fmaccent"
                : "border-fmborder text-fmmuted hover:border-fmfg/30 hover:text-fmfg",
            ].join(" ")}
          >
            {s.label}
          </Link>
        );
      })}
    </div>
  );
}
