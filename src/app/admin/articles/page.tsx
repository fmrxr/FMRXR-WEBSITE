import { listRows } from "@/lib/crud";
import { EntityTable } from "@/components/admin/EntityTable";
export default async function Page() {
  const rows = await listRows("articles");
  return <EntityTable entityKey="articles" rows={rows} />;
}
