import { getSiteSettings } from "@/lib/public-data";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const revalidate = 60;

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <div className="fm fm-canvas flex min-h-dvh flex-col">
      <Header />
      <main className="relative z-10 flex-1 pt-28 md:pt-32">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
