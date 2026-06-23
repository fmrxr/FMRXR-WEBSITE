import Link from "next/link";
import { signOut } from "@/app/actions/auth";

const LINKS = [
  ["Overview", "/admin"],
  ["Projects", "/admin/projects"],
  ["Articles", "/admin/articles"],
  ["Services", "/admin/services"],
  ["Industries", "/admin/industries"],
  ["Stack", "/admin/stack"],
  ["Clients", "/admin/clients"],
  ["Settings", "/admin/settings"],
  ["Team", "/admin/team"],
] as const;

export function Sidebar() {
  return (
    <aside className="flex w-56 shrink-0 flex-col gap-1 border-r p-4">
      <div className="mb-4 font-bold">FMRXR//</div>
      {LINKS.map(([label, href]) => (
        <Link key={href} href={href} className="rounded px-2 py-1.5 text-sm hover:bg-muted">{label}</Link>
      ))}
      <form action={signOut} className="mt-auto">
        <button className="rounded px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted">Sign out</button>
      </form>
    </aside>
  );
}
