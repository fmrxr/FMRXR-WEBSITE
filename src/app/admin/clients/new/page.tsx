import { EntityForm } from "@/components/admin/EntityForm";
export default function Page() {
  return <EntityForm entityKey="clients" initial={{ published: false }} />;
}
