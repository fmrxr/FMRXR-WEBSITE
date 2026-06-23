import { listRows } from "@/lib/crud";
import { ENTITIES } from "@/lib/entities";
import { EntityTable } from "@/components/admin/EntityTable";
export default async function Page() {
  const cfg = ENTITIES["stack"];
  const rows = await listRows("stack");
  return <EntityTable config={cfg} rows={rows} />;
}
