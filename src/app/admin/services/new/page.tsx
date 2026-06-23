import { EntityForm } from "@/components/admin/EntityForm";
export default function Page() {
  return <EntityForm entityKey="services" initial={{ published: false }} />;
}
