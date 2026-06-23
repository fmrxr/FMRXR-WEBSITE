import { getRow } from "@/lib/crud";
import { EntityForm } from "@/components/admin/EntityForm";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = await getRow("services", id);
  return <EntityForm entityKey="services" initial={row} id={id} />;
}
