import { listRows } from "@/lib/crud";
import { ENTITIES } from "@/lib/entities";
import { EntityTable } from "@/components/admin/EntityTable";
export default async function Page() {
  const cfg = ENTITIES["projects"];
  const rows = await listRows("projects");
  return <EntityTable config={cfg} rows={rows} />;
}
