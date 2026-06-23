import { getSiteSettings } from "@/lib/public-data";
export const revalidate = 60;
export default async function Contact() {
  const s = await getSiteSettings();
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="mt-4">{s.email}</p>
      <p>{s.phone}</p>
      <p>{s.location}</p>
    </main>
  );
}
