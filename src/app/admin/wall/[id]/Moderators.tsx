"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addModerator, removeModerator } from "@/app/actions/wall";
import { MAX_MODERATORS } from "@/lib/wall/config";

// Les 5 moderateurs d'un mur : un lien personnel pour le telephone, un pour
// l'ecran geant. Retirer quelqu'un coupe ses deux liens aussitot.

type Row = { id: string; name: string; phone: string; screen: string };

export function Moderators({ wallId, list }: { wallId: string; list: Row[] }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const copy = (path: string) => { navigator.clipboard.writeText(`${location.origin}${path}`); toast.success("Lien copié"); };

  const add = async () => {
    setBusy(true);
    const r = await addModerator(wallId, name);
    setBusy(false);
    if ("error" in r) return void toast.error(r.error);
    setName("");
    toast.success("Modérateur ajouté");
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-3">
      {list.map((m) => (
        <div key={m.id} className="flex flex-wrap items-center gap-2 rounded-lg border p-3">
          <p className="min-w-32 flex-1 font-semibold">{m.name}</p>
          <Button size="sm" variant="outline" onClick={() => copy(m.phone)}>Lien téléphone</Button>
          <Button size="sm" variant="outline" onClick={() => copy(m.screen)}>Lien écran géant</Button>
          <Button size="sm" variant="outline" className="text-destructive" onClick={async () => {
            if (!confirm(`Retirer ${m.name} ? Ses liens ne marcheront plus.`)) return;
            const r = await removeModerator(wallId, m.id);
            if ("error" in r) toast.error(r.error); else router.refresh();
          }}>Retirer</Button>
        </div>
      ))}
      {list.length < MAX_MODERATORS ? (
        <div className="flex gap-2">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Prénom du modérateur" maxLength={40} className="max-w-xs"
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); void add(); } }} />
          <Button size="sm" onClick={() => void add()} disabled={busy || !name.trim()}>Ajouter ({list.length}/{MAX_MODERATORS})</Button>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">{MAX_MODERATORS} modérateurs sur {MAX_MODERATORS}. Retirez-en un pour en ajouter un autre.</p>
      )}
    </div>
  );
}
