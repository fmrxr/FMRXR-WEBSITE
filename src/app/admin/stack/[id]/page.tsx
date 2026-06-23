import { getRow } from "@/lib/crud";
import { ENTITIES } from "@/lib/entities";
import { EntityForm } from "@/components/admin/EntityForm";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cfg = ENTITIES["stack"];
  const row = await getRow("stack", id);
  return <EntityForm config={cfg} initial={row} id={id} />;
}
