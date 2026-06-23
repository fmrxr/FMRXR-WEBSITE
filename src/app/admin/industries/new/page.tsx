import { EntityForm } from "@/components/admin/EntityForm";
export default function Page() {
  return <EntityForm entityKey="industries" initial={{ published: false }} />;
}
