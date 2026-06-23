import { ENTITIES } from "@/lib/entities";
import { EntityForm } from "@/components/admin/EntityForm";
export default function Page() {
  const cfg = ENTITIES["services"];
  return <EntityForm config={cfg} initial={{ published: false }} />;
}
