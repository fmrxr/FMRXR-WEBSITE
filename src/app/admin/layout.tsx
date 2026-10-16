import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { currentRoles } from "@/lib/auth";
import { Sidebar } from "@/components/admin/Sidebar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "CMS · FMRXR",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const roles = await currentRoles();
  if (!roles.includes("admin") && !roles.includes("editor")) redirect("/auth");
  return (
    // fm-admin remappe les variables shadcn sur la palette de marque, fm et
    // fm-canvas posent le fond et la grille. La portee s'arrete a /admin.
    <div className="fm fm-admin fm-canvas relative min-h-screen md:flex">
      <Sidebar roles={roles} />
      {/* min-w-0 : un tableau large defile dans son cadre au lieu d'elargir la page */}
      <main className="relative z-10 min-w-0 flex-1 p-4 md:p-8">{children}</main>
      <Toaster theme="dark" />
    </div>
  );
}
