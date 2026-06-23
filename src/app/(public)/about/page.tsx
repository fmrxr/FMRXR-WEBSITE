import { getSiteSettings } from "@/lib/public-data";
export const revalidate = 60;
export default async function About() {
  const s = await getSiteSettings();
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold">About</h1>
      <p className="mt-4">{s.name} — {s.tagline}</p>
      <p className="mt-2 text-muted-foreground">{s.description}</p>
      <p className="mt-4">Founder: {s.founder}</p>
    </main>
  );
}
