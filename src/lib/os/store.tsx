"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { OsGraph } from "./types";

const AUTOSAVE_DEBOUNCE_MS = 600;
const API = "/api/os/graph";

interface OsConflict {
  remoteData: OsGraph;
  remoteUpdatedAt: string | null;
}

interface OsContextValue {
  graph: OsGraph | null;
  loading: boolean;
  saving: boolean;
  error: string | null;
  lastSavedAt: string | null;
  conflict: OsConflict | null;
  /** Applique une mutation au graphe (clone défensif) et programme l'autosave. */
  mutate: (fn: (draft: OsGraph) => void) => void;
  /**
   * Raccourci : pousse une entrée dans `log` via mutate(). `extra.snapshot` — état complet de
   * l'entité au moment de l'événement, notamment sur suppression — rend l'historique d'une entité
   * rejouable (filtrer `log` par `entity`/`snapshot`) au lieu de n'être qu'une phrase perdue.
   */
  logChange: (action: string, entity: string, detail: string, extra?: { entityType?: string; snapshot?: unknown }) => void;
  /** Sauvegarde immédiate (annule le debounce en cours). */
  save: () => Promise<void>;
  /** Conflit 409 : écrase le distant avec la version locale. */
  resolveConflictKeepMine: () => Promise<void>;
  /** Conflit 409 : abandonne les changements locaux, reprend la version distante. */
  resolveConflictTakeRemote: () => void;
  reload: () => Promise<void>;
}

const OsContext = createContext<OsContextValue | null>(null);

export function OsProvider({ children }: { children: ReactNode }) {
  const [graph, setGraph] = useState<OsGraph | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [conflict, setConflict] = useState<OsConflict | null>(null);

  const updatedAtRef = useRef<string | null>(null);
  const graphRef = useRef<OsGraph | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    graphRef.current = graph;
  }, [graph]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API, { cache: "no-store" });
      if (!res.ok) throw new Error(`Chargement échoué (${res.status})`);
      const json: { data: OsGraph | null; updated_at: string | null } = await res.json();
      if (json.data) {
        setGraph(json.data);
        updatedAtRef.current = json.updated_at;
        setLastSavedAt(json.updated_at);
      } else {
        setError("Base vide — l'import initial n'a pas encore été lancé (POST /api/os/import).");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch on mount (GET /api/os/graph); no data-fetching library in scope for Phase A.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  const persist = useCallback(async (force: boolean) => {
    const current = graphRef.current;
    if (!current) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(API, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: current, prevUpdated: updatedAtRef.current, force }),
      });
      if (res.status === 409) {
        const json: { data: OsGraph | null; updated_at: string | null } = await res.json();
        if (json.data) setConflict({ remoteData: json.data, remoteUpdatedAt: json.updated_at });
        return;
      }
      if (!res.ok) throw new Error(`Sauvegarde échouée (${res.status})`);
      const json: { updated_at: string | null } = await res.json();
      updatedAtRef.current = json.updated_at;
      setLastSavedAt(json.updated_at);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur réseau");
    } finally {
      setSaving(false);
    }
  }, []);

  const scheduleSave = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      void persist(false);
    }, AUTOSAVE_DEBOUNCE_MS);
  }, [persist]);

  useEffect(
    () => () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    },
    [],
  );

  const mutate = useCallback(
    (fn: (draft: OsGraph) => void) => {
      setGraph((prev) => {
        if (!prev) return prev;
        const draft = structuredClone(prev);
        fn(draft);
        draft.meta = draft.meta || {};
        draft.meta.updated = new Date().toISOString();
        draft.meta.updated_by = "OS web";
        return draft;
      });
      scheduleSave();
    },
    [scheduleSave],
  );

  const logChange = useCallback(
    (action: string, entity: string, detail: string, extra?: { entityType?: string; snapshot?: unknown }) => {
      mutate((draft) => {
        draft.log = draft.log || [];
        draft.log.unshift({
          ts: new Date().toISOString(),
          action,
          entity,
          detail,
          by: "OS web",
          synced: true,
          ...(extra?.entityType ? { entityType: extra.entityType } : {}),
          ...(extra?.snapshot !== undefined ? { snapshot: extra.snapshot } : {}),
        });
      });
    },
    [mutate],
  );

  const save = useCallback(async () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    await persist(false);
  }, [persist]);

  const resolveConflictKeepMine = useCallback(async () => {
    setConflict(null);
    await persist(true);
  }, [persist]);

  const resolveConflictTakeRemote = useCallback(() => {
    setConflict((prevConflict) => {
      if (!prevConflict) return prevConflict;
      setGraph(prevConflict.remoteData);
      updatedAtRef.current = prevConflict.remoteUpdatedAt;
      setLastSavedAt(prevConflict.remoteUpdatedAt);
      return null;
    });
  }, []);

  const reload = useCallback(async () => {
    await load();
  }, [load]);

  const value: OsContextValue = {
    graph,
    loading,
    saving,
    error,
    lastSavedAt,
    conflict,
    mutate,
    logChange,
    save,
    resolveConflictKeepMine,
    resolveConflictTakeRemote,
    reload,
  };

  return <OsContext.Provider value={value}>{children}</OsContext.Provider>;
}

export function useOs(): OsContextValue {
  const ctx = useContext(OsContext);
  if (!ctx) throw new Error("useOs must be used within <OsProvider>");
  return ctx;
}
