import { redirect } from "next/navigation";
import { currentRoles } from "@/lib/auth";
import { Sidebar } from "@/components/admin/Sidebar";
import { Toaster } from "@/components/ui/sonner";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const roles = await currentRoles();
  if (!roles.includes("admin") && !roles.includes("editor")) redirect("/auth");
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">{children}</main>
      <Toaster />
    </div>
  );
}
