import { ENTITIES } from "@/lib/entities";
import { EntityForm } from "@/components/admin/EntityForm";
export default function Page() {
  const cfg = ENTITIES["stack"];
  return <EntityForm config={cfg} initial={{ published: false }} />;
}
