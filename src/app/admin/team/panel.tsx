"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createMember, revokeMember } from "@/app/actions/team";
import { ROLES, type Role } from "@/lib/roles";

// Ce que chaque role ouvre, affiche a cote du selecteur : inviter quelqu'un est
// l'endroit ou l'on se trompe, et le libelle seul ne dit pas ce qu'il donne.
const SCOPE: Record<Role, string> = {
  admin: "OS, CMS et espace collaboratif",
  editor: "CMS et espace collaboratif",
  guest: "espace collaboratif seulement",
};

export function TeamPanel({ team }: { team: { user_id: string; role: string; email: string }[] }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("guest");
  // Le mot de passe temporaire n'est renvoye qu'une fois et n'est stocke nulle
  // part : il reste a l'ecran jusqu'a ce que Haifa le ferme.
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
  async function revoke(userId: string, r: string) {
    await revokeMember(userId, r as Role); toast.success("Revoked"); router.refresh();
  }
  return (
    <div className="max-w-2xl">
      <h1 className="mb-4 text-2xl font-bold">Team</h1>
      <div className="mb-2 flex gap-2">
        <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <select value={role} onChange={(e) => setRole(e.target.value as Role)} className="rounded border px-2">
          {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
        <Button onClick={create}>Créer</Button>
      </div>
      <p className="mb-6 text-xs text-muted-foreground">
        {role} : {SCOPE[role]}
      </p>

      {fresh && (
        <div className="mb-6 rounded-lg border border-amber-500/40 bg-amber-500/5 p-4">
          <p className="text-sm font-medium">Mot de passe temporaire, affiché une seule fois</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Transmets-le à {fresh.email} par ton propre canal. Il n’est enregistré nulle part :
            si tu fermes ce bloc sans le copier, il faudra recréer le compte.
          </p>
          <code className="mt-3 block select-all rounded bg-background px-3 py-2 font-mono text-sm">
            {fresh.password}
          </code>
          <Button variant="ghost" size="sm" className="mt-2" onClick={() => setFresh(null)}>
            J’ai copié, fermer
          </Button>
        </div>
      )}
      <table className="w-full text-sm">
        <tbody>
          {team.map((m) => (
            <tr key={m.user_id + m.role} className="border-b">
              <td className="py-2">{m.email}</td>
              <td className="py-2">{m.role}</td>
              <td className="py-2 text-right">
                <Button variant="ghost" size="sm" onClick={() => revoke(m.user_id, m.role)}>Revoke</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
