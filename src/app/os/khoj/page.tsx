import { KhojLocalCard } from "@/components/os/khoj/KhojLocalCard";

export default function KhojPage() {
  return (
    <div className="fm-rise flex flex-col gap-4">
      <div>
        <h1 className="font-display text-xl text-fmfg">Khoj</h1>
        <p className="mt-1 font-grotesk text-sm text-fmmuted">
          Second cerveau auto-hébergé (khoj-ai/khoj) — chat avec un LLM, recherche sémantique sur tes propres documents.
          Outil séparé du module <a href="/os/brain" className="fm-link text-fmaccent">Brain</a>, utile pour indexer et
          penser à partir de fichiers plus larges (PDF, Markdown, notes) que le graphe de connaissances FMRXR OS.
        </p>
      </div>
      <KhojLocalCard />
    </div>
  );
}
