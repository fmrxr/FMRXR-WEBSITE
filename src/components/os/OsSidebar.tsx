"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { modulesByGroup } from "@/lib/os/nav";
import { signOut } from "@/app/actions/auth";

interface OsSidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export function OsSidebar({ mobileOpen, onClose }: OsSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {mobileOpen && <div className="fixed inset-0 z-40 bg-black/60 md:hidden" onClick={onClose} aria-hidden="true" />}

      <aside
        className={cn(
          "fm-glass-card fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col gap-5 overflow-y-auto rounded-none border-y-0 border-l-0 p-5 transition-transform duration-200 ease-out",
          "md:static md:z-auto md:w-60 md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <Link href="/os/today" className="font-display fm-glow-accent text-lg text-fmaccent" onClick={onClose}>
            FMRXR//
          </Link>
          <button type="button" onClick={onClose} aria-label="Fermer le menu" className="font-grotesk text-lg text-fmmuted md:hidden">
            ✕
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-5 overflow-y-auto">
          {modulesByGroup().map(({ group, modules }) => (
            <div key={group}>
              <div className="mb-1.5 font-grotesk text-[10px] uppercase tracking-[0.16em] text-fmmuted">{group}</div>
              <div className="flex flex-col gap-0.5">
                {modules.map((m) => {
                  const active = pathname === m.href || pathname.startsWith(m.href + "/");
                  return (
                    <Link
                      key={m.id}
                      href={m.href}
                      onClick={onClose}
                      className={cn(
                        "fm-link rounded-lg px-2.5 py-1.5 font-grotesk text-sm",
                        active ? "bg-fmmutedbg text-fmaccent" : "text-fmfg/80",
                      )}
                    >
                      {m.label}
                      {!m.native && <span className="ml-1.5 text-[10px] text-fmmuted">bientôt</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="flex flex-col gap-1 border-t border-fmborder pt-3">
          <Link href="/os/legacy" className="fm-link px-2.5 py-1 font-grotesk text-xs text-fmmuted">
            Ancienne version →
          </Link>
          <Link href="/admin" className="fm-link px-2.5 py-1 font-grotesk text-xs text-fmmuted">
            Admin →
          </Link>
          <form action={signOut}>
            <button type="submit" className="fm-link px-2.5 py-1 text-left font-grotesk text-xs text-fmmuted">
              Déconnexion
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
