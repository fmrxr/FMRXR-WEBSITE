import { ENTITIES } from "@/lib/entities";
import { EntityForm } from "@/components/admin/EntityForm";
export default function Page() {
  const cfg = ENTITIES["projects"];
  return <EntityForm config={cfg} initial={{ published: false }} />;
}
