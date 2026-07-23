import Link from "next/link";
import { legacyHref } from "@/lib/os/nav";

interface StubModuleProps {
  title: string;
  /** id technique du monolithe — pour le deep-link /os/legacy#<id> */
  moduleId: string;
  phase: "B" | "C" | "D";
}

/** Page stub Phase A pour un module pas encore porté nativement (§6). */
export function StubModule({ title, moduleId, phase }: StubModuleProps) {
  return (
    <div className="fm-rise fm-glass-card flex max-w-lg flex-col gap-3 rounded-2xl p-5 md:p-8">
      <span className="font-grotesk text-xs uppercase tracking-[0.16em] text-fmmuted">Phase {phase} — bientôt</span>
      <h1 className="font-display text-xl text-fmfg md:text-2xl">{title}</h1>
      <p className="font-grotesk text-sm text-fmmuted">
        Ce module natif arrive dans une prochaine vague de FMRXR OS. En attendant, tes données restent accessibles dans l&apos;ancienne
        version.
      </p>
      <Link href={legacyHref(moduleId)} className="fm-link mt-2 inline-block font-grotesk text-sm text-fmaccent">
        Ouvrir dans l&apos;ancienne version →
      </Link>
    </div>
  );
}
