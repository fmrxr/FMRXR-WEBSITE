"use client";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { saveHeroProjects } from "@/app/actions/home";

export type PickProject = { slug: string; title: string; cover_url?: string; film?: string | null; client?: string; year?: string };

const MAX = 3;

// Les 3 projets du hero de l'accueil. L'ordre des clics est l'ordre de
// défilement ; enregistré aussitôt, comme les bascules de /admin/experiences.
export function HeroProjectsPicker({ projects, initial, error }: { projects: PickProject[]; initial: string[]; error: string | null }) {
  const [sel, setSel] = useState<string[]>(initial);
  const [pending, start] = useTransition();

  function save(next: string[]) {
    const prev = sel;
    setSel(next);
    start(async () => {
      const r = await saveHeroProjects(next);
      if (r.ok) toast.success("Hero de l’accueil mis à jour");
      else {
        setSel(prev);
        toast.error(`Échec : ${r.error}`);
      }
    });
  }

  function toggle(slug: string) {
    if (sel.includes(slug)) return save(sel.filter((s) => s !== slug));
    if (sel.length >= MAX) return toast.error(`Trois projets au plus : retire-en un d’abord`);
    save([...sel, slug]);
  }

  return (
    <section className="flex max-w-2xl flex-col gap-3">
      <h2 className="text-lg font-semibold">Hero de l’accueil : 3 projets</h2>
      <p className="-mt-2 text-xs text-muted-foreground">
        Clique trois projets dans l’ordre où ils défilent. Chacun s’affiche sur sa couverture animée (celle de la page Work), sinon sur sa couverture fixe.
        Sans choix, ce sont les trois premiers projets publiés.
      </p>
      {error ? (
        <p className="rounded-md border border-destructive/50 p-3 text-sm">
          Colonne introuvable : la migration <code>0023_home_highlights.sql</code> n’est pas encore appliquée ({error}).
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {projects.map((p) => {
            const n = sel.indexOf(p.slug);
            return (
              <button
                key={p.slug}
                type="button"
                disabled={pending}
                onClick={() => toggle(p.slug)}
                data-testid={`hero-project-${p.slug}`}
                className={`relative overflow-hidden rounded-lg border text-left transition disabled:opacity-50 ${n >= 0 ? "border-primary ring-2 ring-primary" : "opacity-70 hover:opacity-100"}`}
              >
                {p.film ? (
                  <video src={p.film} poster={p.cover_url || undefined} muted loop autoPlay playsInline preload="metadata" className="aspect-[16/9] w-full object-cover" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.cover_url} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />
                )}
                {p.film && <span className="absolute right-2 top-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">animée</span>}
                <span className="block truncate p-2 text-xs font-semibold">{p.title}</span>
                {n >= 0 && (
                  <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {n + 1}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
