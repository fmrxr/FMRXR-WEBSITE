import { listLeads } from "@/app/actions/leads";
import { RequestsPanel } from "./panel";

export default async function Page() {
  const leads = await listLeads();
  return <RequestsPanel leads={leads} />;
}
