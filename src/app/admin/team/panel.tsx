"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createMember, revokeMember, type TeamMember } from "@/app/actions/team";
import { ROLES, type Role } from "@/lib/roles";

// Ce que chaque role ouvre, affiche a cote du selecteur : creer un compte est
// l'endroit ou l'on se trompe, et le libelle seul ne dit pas ce qu'il donne.
const SCOPE: Record<Role, string> = {
  admin: "OS, CMS et espace collaboratif",
  editor: "CMS et espace collaboratif",
  guest: "espace collaboratif seulement",
};

const DATE = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
});

function when(value: string | null): string {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  const days = Math.floor((Date.now() - d.getTime()) / 86_400_000);
  const suffix = days === 0 ? "aujourd’hui" : days === 1 ? "hier" : `il y a ${days} j`;
  return `${DATE.format(d)} · ${suffix}`;
}

export function TeamPanel({ team }: { team: TeamMember[] }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("guest");
  // Le mot de passe temporaire n'est renvoye qu'une fois et n'est stocke nulle
  // part : il reste a l'ecran jusqu'a ce qu'on le ferme.
  const [fresh, setFresh] = useState<{ email: string; password: string } | null>(null);

  async function create() {
    try {
      const res = await createMember(email, role);
      if (res.password) {
        setFresh({ email: email.trim().toLowerCase(), password: res.password });
        toast.success("Compte créé");
      } else {
        toast.success("Rôle ajouté au compte existant");
      }
      setEmail("");
      router.refresh();
    } catch (e: any) { toast.error(e.message); }
  }

  async function revoke(userId: string, r: Role) {
    try {
      await revokeMember(userId, r);
      toast.success("Rôle retiré");
      router.refresh();
    } catch (e: any) { toast.error(e.message); }
  }

  const dormant = team.filter((m) => !m.last_sign_in_at).length;

  return (
    <div className="max-w-4xl">
      <h1 className="mb-4 text-2xl">Équipe</h1>

      <div className="mb-2 flex gap-2">
        <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <select value={role} onChange={(e) => setRole(e.target.value as Role)}
          className="rounded border px-2">
          {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
        <Button onClick={create}>Créer</Button>
      </div>
      <p className="mb-6 text-xs text-muted-foreground">{role} : {SCOPE[role]}</p>

      {fresh && (
        <div className="mb-6 rounded-lg border border-amber-500/40 bg-amber-500/5 p-4">
          <p className="text-sm font-medium">Mot de passe temporaire, affiché une seule fois</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Transmets-le à {fresh.email} par ton propre canal, et dis-lui de le remplacer
            depuis Mon compte. Il n’est enregistré nulle part : si tu fermes ce bloc sans
            le copier, il faudra recréer le compte.
          </p>
          <code className="mt-3 block select-all rounded bg-background px-3 py-2 font-mono text-sm">
            {fresh.password}
          </code>
          <Button variant="ghost" size="sm" className="mt-2" onClick={() => setFresh(null)}>
            J’ai copié, fermer
          </Button>
        </div>
      )}

      {dormant > 0 && (
        <p className="mb-4 text-xs text-amber-400">
          {dormant} compte{dormant > 1 ? "s" : ""} jamais utilisé{dormant > 1 ? "s" : ""} :
          le mot de passe transmis n’a pas servi.
        </p>
      )}

      <div className="overflow-hidden rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
              <th className="px-4 py-2 font-normal">Personne</th>
              <th className="px-4 py-2 font-normal">Dernière connexion</th>
              <th className="px-4 py-2 font-normal">Messages</th>
              <th className="px-4 py-2 font-normal">Compte créé</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody>
            {team.map((m) => (
              <tr key={m.user_id} className="border-b last:border-b-0 align-top">
                <td className="px-4 py-3">
                  <p>{m.email}</p>
                  <p className="mt-1 flex flex-wrap gap-1">
                    {m.roles.map((r) => (
                      <span key={r}
                        className="rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                        {r}
                      </span>
                    ))}
                  </p>
                </td>
                <td className={`px-4 py-3 ${m.last_sign_in_at ? "" : "text-amber-400"}`}>
                  {m.last_sign_in_at ? when(m.last_sign_in_at) : "jamais"}
                </td>
                <td className="px-4 py-3">
                  {m.notes_count === 0 ? (
                    <span className="text-muted-foreground">aucun</span>
                  ) : (
                    <>
                      <p>{m.notes_count}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        dernier {when(m.last_note_at)}
                      </p>
                    </>
                  )}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{when(m.created_at)}</td>
                <td className="px-4 py-3 text-right">
                  {m.roles.map((r) => (
                    <Button key={r} variant="ghost" size="sm" onClick={() => revoke(m.user_id, r)}>
                      Retirer {r}
                    </Button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        « Messages » compte ce que la personne a écrit dans les fils de l’espace
        Opportunities. Retirer son dernier rôle lui ferme l’accès sans supprimer
        le compte ni ce qu’elle a écrit.
      </p>
    </div>
  );
}
