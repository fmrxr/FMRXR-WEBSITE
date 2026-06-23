import { getSettings } from "@/app/actions/settings";
import { SettingsForm } from "./form";
export default async function Page() {
  const settings = await getSettings();
  return <SettingsForm initial={settings ?? {}} />;
}
