import { redirect } from "next/navigation";
import { currentRoles } from "@/lib/auth";
import { OsShell } from "@/components/os/OsShell";

export const metadata = { title: "FMRXR OS", robots: { index: false, follow: false } };

// Espace privé (admin uniquement) — Command Center natif de FMRXR OS.
export default async function OsLayout({ children }: { children: React.ReactNode }) {
  const roles = await currentRoles();
  if (!roles.includes("admin")) redirect("/auth");

  return (
    <div className="fm fm-canvas relative min-h-screen">
      <OsShell>{children}</OsShell>
    </div>
  );
}
