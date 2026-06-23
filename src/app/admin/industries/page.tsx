import { listRows } from "@/lib/crud";
import { ENTITIES } from "@/lib/entities";
import { EntityTable } from "@/components/admin/EntityTable";
export default async function Page() {
  const cfg = ENTITIES["industries"];
  const rows = await listRows("industries");
  return <EntityTable config={cfg} rows={rows} />;
}
