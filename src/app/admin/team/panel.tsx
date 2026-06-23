"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { inviteMember, revokeMember } from "@/app/actions/team";

export function TeamPanel({ team }: { team: { user_id: string; role: string; email: string }[] }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "editor">("editor");
  async function invite() {
    try { await inviteMember(email, role); toast.success("Invited"); setEmail(""); router.refresh(); }
    catch (e: any) { toast.error(e.message); }
  }
  async function revoke(userId: string, r: string) {
    await revokeMember(userId, r as "admin" | "editor"); toast.success("Revoked"); router.refresh();
  }
  return (
    <div className="max-w-2xl">
      <h1 className="mb-4 text-2xl font-bold">Team</h1>
      <div className="mb-6 flex gap-2">
        <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <select value={role} onChange={(e) => setRole(e.target.value as any)} className="rounded border px-2">
          <option value="editor">editor</option><option value="admin">admin</option>
        </select>
        <Button onClick={invite}>Invite</Button>
      </div>
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
