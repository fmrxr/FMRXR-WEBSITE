import { redirect } from "next/navigation";
import { currentRoles } from "@/lib/auth";
import { listTeam } from "@/app/actions/team";
import { TeamPanel } from "./panel";
export default async function Page() {
  const roles = await currentRoles();
  if (!roles.includes("admin")) redirect("/admin");
  const team = await listTeam();
  return <TeamPanel team={team} />;
}
