import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { getSiteSettings } from "@/lib/public-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fmrxr.com"),
  title: {
    default: "FMRXR// Creative Technology · New media art studio, Tunis",
    // Les pages enfants fournissent leur propre titre, complété par la marque.
    template: "%s · FMRXR//",
  },
  description:
    "FMRXR Studio builds generative systems and immersive installations: new media art, projection mapping, real-time generative art, XR and live A/V. Tunis, since 2017.",
  keywords: [
    "new media art", "generative art", "immersive installation",
    "projection mapping", "TouchDesigner", "GLSL", "VJing", "live A/V",
    "XR", "interactive installation", "digital art Tunisia", "real-time visuals",
    "FMRXR", "Effet Mère", "Haïfa Becheikh",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "FMRXR Studio",
    locale: "en_US",
    url: "/",
    title: "FMRXR// Creative Technology · New media art studio, Tunis",
    description:
      "Generative systems, immersive installations and live A/V. Emotional data, immersive arts, intelligent realities.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@fmrxrstudio",
    creator: "@fmrxrstudio",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const s = await getSiteSettings();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: s.name,
    description: s.description,
    email: s.email,
    url: "https://fmrxr.com",
    founder: { "@type": "Person", name: s.founder },
  };
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
