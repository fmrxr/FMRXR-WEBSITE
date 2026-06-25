import { getPublished } from "@/lib/public-data";
import { PageHero } from "@/components/site/PageHero";
import { StartForm } from "@/components/site/StartForm";

export const revalidate = 60;
export const metadata = { title: "Start a project — FMRXR//" };

export default async function StartPage({
  searchParams,
}: {
  searchParams: Promise<{ industry?: string; service?: string }>;
}) {
  const sp = await searchParams;
  const [industries, services] = await Promise.all([
    getPublished("industries"),
    getPublished("services"),
  ]);
  return (
    <>
      <PageHero index="Start a project" title="Tell us about it." intro="A few details and your request lands straight with the studio. Brief to opening night." />
      <section className="mx-auto max-w-2xl px-5 pb-24 md:px-8">
        <StartForm
          industries={industries}
          services={services}
          defaultIndustry={sp.industry ?? ""}
          defaultService={sp.service ?? ""}
        />
      </section>
    </>
  );
}
