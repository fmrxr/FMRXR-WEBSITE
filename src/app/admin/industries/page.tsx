import { listRows } from "@/lib/crud";
import { EntityTable } from "@/components/admin/EntityTable";
export default async function Page() {
  const rows = await listRows("industries");
  return <EntityTable entityKey="industries" rows={rows} />;
}
