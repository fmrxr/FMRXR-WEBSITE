"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { grantClientAccess, revokeClientAccess } from "@/app/actions/photobooth";

type Member = { user_id: string; email: string; last_sign_in_at: string | null };

export function ClientAccess({ campaignId, members }: { campaignId: string; members: Member[] }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [secret, setSecret] = useState<{ email: string; password: string } | null>(null);

  async function grant(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const r = await grantClientAccess(campaignId, email);
    setBusy(false);
    if ("error" in r) return void toast.error(r.error);
    if (r.password) setSecret({ email: email.trim().toLowerCase(), password: r.password });
    else toast.success("Compte existant : accès ajouté");
    setEmail("");
    router.refresh();
  }

  return (
    <section className="mt-4 rounded-lg border p-4">
      <p className="text-sm font-medium">Accès client</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Le client se connecte sur /auth et voit en lecture seule cette campagne : forfait, consommation, dates, lien de la borne.
        Il ne voit ni les portraits, ni le budget, ni les réglages.
      </p>

      {members.length > 0 && (
        <ul className="mt-3 flex flex-col gap-1 text-sm">
          {members.map((m) => (
            <li key={m.user_id} className="flex items-center justify-between gap-3 border-b py-1.5 last:border-0">
              <span>
                {m.email}{" "}
                <span className="text-xs text-muted-foreground">
                  · {m.last_sign_in_at ? `dernière connexion ${new Date(m.last_sign_in_at).toLocaleDateString("fr-FR")}` : "jamais connecté"}
                </span>
              </span>
              <Button
                size="sm" variant="ghost"
                onClick={async () => {
                  if (!confirm(`Retirer l’accès de ${m.email} à cette campagne ?`)) return;
                  const r = await revokeClientAccess(campaignId, m.user_id);
                  if ("error" in r) toast.error(String(r.error)); else toast.success("Accès retiré");
                  router.refresh();
                }}
              >
                Retirer
              </Button>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={grant} className="mt-3 flex gap-2">
        <Input type="email" placeholder="email du client" value={email} onChange={(e) => setEmail(e.target.value)} required className="max-w-xs" />
        <Button type="submit" size="sm" disabled={busy}>{busy ? "…" : "Donner l’accès"}</Button>
      </form>

      {secret && (
        <div className="mt-3 rounded-md border border-fmaccent/40 bg-fmaccent/10 p-3 text-sm">
          <p>Compte créé pour <strong>{secret.email}</strong>. Mot de passe temporaire, affiché une seule fois :</p>
          <p className="mt-1 select-all font-mono">{secret.password}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            À transmettre par votre propre canal, avec l’adresse https://fmrxr.com/auth. Le client pourra le changer dans « Mon compte ».
          </p>
          <Button size="sm" variant="ghost" className="mt-1" onClick={() => setSecret(null)}>J’ai noté</Button>
        </div>
      )}
    </section>
  );
}
