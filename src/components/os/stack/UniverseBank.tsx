"use client";

import { useState } from "react";
import { Section } from "@/components/os/Section";
import type { OsGraphicConcept, OsGraphicUniverse } from "@/lib/os/types";

function ConceptCard({ concept }: { concept: OsGraphicConcept }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-fmborder bg-fmmutedbg">
      <a href={concept.preview} target="_blank" rel="noreferrer" className="block aspect-[4/5] overflow-hidden bg-black">
        {/* Aperçus hébergés dans le bucket media, dimensions fixes : pas besoin de next/image dans l'OS. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={concept.preview} alt={concept.name} loading="lazy" className="h-full w-full object-cover" />
      </a>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-grotesk text-sm font-medium text-fmfg">{concept.name}</h4>
          {concept.selected && (
            <span className="shrink-0 rounded-full border border-fmaccent px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-fmaccent">Sélection</span>
          )}
        </div>
        <p className="font-grotesk text-sm text-fmaccent">{concept.concept}</p>
        <p className="font-grotesk text-xs leading-relaxed text-fmfg">{concept.pitch}</p>
        <p className="font-grotesk text-xs leading-relaxed text-fmmuted">{concept.esthetique}</p>
        <p className="mt-auto border-t border-fmborder pt-2 font-mono text-[10px] leading-relaxed text-fmmuted">{concept.fabrication}</p>
      </div>
    </article>
  );
}

function Universe({ universe, onlySelected }: { universe: OsGraphicUniverse; onlySelected: boolean }) {
  const count = universe.styles.reduce((n, s) => n + s.concepts.length, 0);
  return (
    <Section id={`universe-${universe.id}`} title={`${universe.name} · ${universe.styles.length} styles · ${count} concepts`}>
      <div className="flex flex-col gap-6">
        <p className="max-w-3xl font-grotesk text-sm text-fmfg">{universe.principe}</p>
        {universe.styles.map((style) => {
          const concepts = onlySelected ? style.concepts.filter((c) => c.selected) : style.concepts;
          if (concepts.length === 0) return null;
          return (
            <div key={style.id} className="flex flex-col gap-3">
              <div>
                <h3 className="font-grotesk text-base font-medium text-fmfg">
                  {style.name} <span className="font-normal text-fmmuted">· {style.formule}</span>
                </h3>
                <p className="mt-1 max-w-3xl font-grotesk text-xs text-fmmuted">{style.principe}</p>
                <div className="mt-2 flex flex-wrap items-center gap-1">
                  {style.palette.map((color) => (
                    <span key={color} title={color} className="h-4 w-4 rounded-sm border border-fmborder" style={{ background: color }} />
                  ))}
                  <span className="ml-2 font-mono text-[10px] text-fmmuted">{style.typo}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
                {concepts.map((concept) => (
                  <ConceptCard key={concept.id} concept={concept} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/** Banque d'univers graphiques : univers > styles > concepts avec aperçu. */
export function UniverseBank({ universes }: { universes: OsGraphicUniverse[] }) {
  const [onlySelected, setOnlySelected] = useState(false);
  if (universes.length === 0) return null;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="font-grotesk text-sm font-medium text-fmfg">Univers graphiques · {universes.length}</h2>
        <button
          type="button"
          onClick={() => setOnlySelected((v) => !v)}
          className={`rounded-full border px-3 py-1 font-grotesk text-xs ${onlySelected ? "border-fmaccent text-fmaccent" : "border-fmborder text-fmmuted hover:border-fmaccent/40"}`}
        >
          Sélection seulement
        </button>
      </div>
      {universes.map((universe) => (
        <Universe key={universe.id} universe={universe} onlySelected={onlySelected} />
      ))}
    </div>
  );
}
