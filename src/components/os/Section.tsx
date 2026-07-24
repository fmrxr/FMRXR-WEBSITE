"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

const STORAGE_KEY = "fmrxr-os-collapsed-sections";

function readCollapsedMap(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeCollapsedMap(map: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // localStorage indisponible (SSR/privé) — l'état ne persiste juste pas
  }
}

interface SectionProps {
  /**
   * Identifiant stable et unique dans toute l'app — sert de clé de persistance. Doit rester
   * indépendant du `title` affiché (qui contient souvent un compteur variable) pour que l'état
   * replié/déplié ne se réinitialise pas quand les données changent.
   */
  id: string;
  title: ReactNode;
  /** Rendu à droite du titre, toujours visible (même repliée) — ex. un bouton "+ Ajouter". */
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Section de module repliable/dépliable, état mémorisé en localStorage (même pattern que la bascule
 * devise de Money.tsx : lecture unique au montage, écriture à chaque bascule).
 */
export function Section({ id, title, actions, children, className }: SectionProps) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = readCollapsedMap()[id];
    // Lecture unique d'une préférence navigateur au montage, pas de valeur SSR pour la dériver —
    // même pattern que Money.tsx / use-mobile.ts.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setCollapsed(true);
  }, [id]);

  function toggle() {
    setCollapsed((c) => {
      const next = !c;
      const map = readCollapsedMap();
      if (next) map[id] = true;
      else delete map[id];
      writeCollapsedMap(map);
      return next;
    });
  }

  return (
    <div className={className}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={toggle}
          aria-expanded={!collapsed}
          className="flex min-w-0 items-center gap-1.5 font-grotesk text-xs uppercase tracking-[0.16em] text-fmmuted hover:text-fmfg"
        >
          <span className={`inline-block shrink-0 transition-transform duration-150 ${collapsed ? "-rotate-90" : ""}`}>▾</span>
          {title}
        </button>
        {actions}
      </div>
      {!collapsed && children}
    </div>
  );
}
