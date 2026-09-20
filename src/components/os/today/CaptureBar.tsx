"use client";

import { useEffect, useRef, useState } from "react";
import { useOs } from "@/lib/os/store";
import { genId } from "@/lib/os/id";
import { TODAY_COPY } from "@/lib/os/today-copy";

/**
 * Saisie universelle. C'est le seul endroit du Command Center qui écrit dans le graphe : une
 * tâche sans projet ni échéance, à trier ensuite depuis le module Tâches. Raccourci `c`.
 */
export function CaptureBar() {
  const { mutate, logChange } = useOs();
  const [label, setLabel] = useState("");
  const [saved, setSaved] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "c") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function submit() {
    const text = label.trim();
    if (!text) return;
    const id = genId("t");
    const task = { id, label: text, done: false };
    mutate((draft) => {
      draft.tasks = draft.tasks || [];
      draft.tasks.push(task);
    });
    logChange("create", id, `${TODAY_COPY.capture.logPrefix} ${text}`, { entityType: "task", snapshot: task });
    setLabel("");
    setSaved(text);
    window.setTimeout(() => setSaved(null), 3000);
  }

  return (
    <div className="flex items-center gap-2 rounded-2xl border border-fmborder bg-fmcard/40 px-4 py-2.5">
      <input
        ref={inputRef}
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
          if (e.key === "Escape") setLabel("");
        }}
        placeholder={TODAY_COPY.capture.placeholder}
        aria-label={TODAY_COPY.capture.placeholder}
        className="flex-1 bg-transparent font-grotesk text-sm text-fmfg outline-none placeholder:text-fmmuted"
      />
      {saved ? (
        <span className="font-grotesk text-[11px] text-fmaccent">{TODAY_COPY.capture.saved}</span>
      ) : label.trim() ? (
        <button type="button" onClick={submit} className="fm-link font-grotesk text-xs text-fmaccent">
          {TODAY_COPY.capture.action}
        </button>
      ) : (
        <kbd className="rounded border border-fmborder px-1.5 py-0.5 font-mono text-[10px] text-fmmuted">c</kbd>
      )}
    </div>
  );
}
