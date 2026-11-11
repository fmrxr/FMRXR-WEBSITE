import { getSettings } from "@/app/actions/settings";
import { getPublished } from "@/lib/public-data";
import { getSupabaseServer } from "@/lib/supabase/server";
import { projectCover } from "@/lib/project-cover";
import { SettingsForm } from "./form";
import { HeroProjectsPicker, type PickProject } from "./hero-projects";

export const dynamic = "force-dynamic";

export default async function Page() {
  const supabase = await getSupabaseServer();
  const [settings, projects, hero] = await Promise.all([
    getSettings(),
    getPublished("projects"),
    // Lu à part : une erreur ici signale la migration 0023 manquante.
    supabase.from("site_settings").select("hero_projects").limit(1).maybeSingle(),
  ]);
  const picks: PickProject[] = (projects as (PickProject & { cover_media?: string | null })[]).flatMap((p) => {
    const c = projectCover(p);
    if (!c) return [];
    return [{ slug: p.slug, title: p.title, client: p.client, year: p.year, film: c.video ? c.src : null, cover_url: c.video ? c.poster : c.src }];
  });
  return (
    <div className="flex flex-col gap-10">
      <HeroProjectsPicker
        projects={picks}
        initial={(hero.data?.hero_projects as string[] | null) ?? []}
        error={hero.error?.message ?? null}
      />
      <SettingsForm initial={settings ?? {}} />
    </div>
  );
}
