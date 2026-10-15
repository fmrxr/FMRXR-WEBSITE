"use client";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { saveExperienceVisibility } from "@/app/actions/experiences";

export type Item = { slug: string; title: string; group: string; poster: string; pitch: string };

// Une bascule par expérience, enregistrée aussitôt : la page publique suit
// au rechargement suivant. L'ordre de la liste fait foi : la première est le
// hero de /experiences (Photobooth en tête de page, ou expérience ouverte
// dans le lecteur du haut).
export function VisibilityForm({ items, initial }: { items: Item[]; initial: string[] }) {
  const [visible, setVisible] = useState<string[]>(initial);
  const [pending, start] = useTransition();

  function save(next: string[]) {
    const prev = visible;
    setVisible(next);
    start(async () => {
      const r = await saveExperienceVisibility(next);
      if (r.ok) toast.success("Page Experiences mise à jour");
      else {
        setVisible(prev);
        toast.error(`Échec : ${r.error}`);
      }
    });
  }

  const toggle = (slug: string, on: boolean) =>
    save(on ? [...visible, slug] : visible.filter((s) => s !== slug));

  // Mettre en hero une expérience cachée l'affiche du même coup.
  const makeHero = (slug: string) => save([slug, ...visible.filter((s) => s !== slug)]);
  const hero = visible[0] ?? null;
  const heroTitle = items.find((i) => i.slug === hero)?.title;

  const groups = [...new Set(items.map((i) => i.group))];
  const shown = items.filter((i) => visible.includes(i.slug)).length;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-3 text-sm">
        <span>
          <strong>{shown}</strong> / {items.length} affichées{shown === 0 && " · la page n’affichera que son titre"}
          {heroTitle && <> · hero : <strong data-testid="exp-hero">{heroTitle}</strong></>}
        </span>
        <span className="flex gap-2">
          <button type="button" disabled={pending} onClick={() => save(items.map((i) => i.slug))} className="rounded-md border px-3 py-1.5 hover:border-foreground/40 disabled:opacity-50">
            Tout afficher
          </button>
          <button type="button" disabled={pending} onClick={() => save([])} className="rounded-md border px-3 py-1.5 hover:border-foreground/40 disabled:opacity-50">
            Tout cacher
          </button>
          <a href="/experiences" target="_blank" rel="noreferrer" className="rounded-md border px-3 py-1.5 hover:border-foreground/40">
            Voir la page ↗
          </a>
        </span>
      </div>

      {groups.map((g) => (
        <section key={g}>
          <h2 className="mb-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{g}</h2>
          <div className="flex flex-col gap-2">
            {items.filter((i) => i.group === g).map((i) => {
              const on = visible.includes(i.slug);
              return (
                <label key={i.slug} data-testid={`exp-${i.slug}`} className={`flex cursor-pointer items-center gap-4 rounded-lg border p-3 transition ${on ? "" : "opacity-60"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={i.poster} alt="" loading="lazy" className="h-12 w-20 shrink-0 rounded object-cover" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">{i.title}</span>
                    <span className="block truncate text-xs text-muted-foreground">{i.pitch}</span>
                  </span>
                  {i.slug === hero ? (
                    <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">Hero</span>
                  ) : (
                    <button
                      type="button"
                      data-testid={`hero-${i.slug}`}
                      disabled={pending}
                      onClick={(e) => { e.preventDefault(); makeHero(i.slug); }}
                      className="rounded-full border px-2.5 py-1 text-[11px] text-muted-foreground hover:border-foreground/40 hover:text-foreground disabled:opacity-50"
                    >
                      Mettre en hero
                    </button>
                  )}
                  <span className="w-12 text-right text-xs text-muted-foreground">{on ? "Visible" : "Caché"}</span>
                  <Switch checked={on} disabled={pending} onCheckedChange={(v) => toggle(i.slug, v)} />
                </label>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
