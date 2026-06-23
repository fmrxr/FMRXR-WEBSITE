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
  title: "FMRXR// — Creative Technology",
  description: "Emotional data · Immersive arts · Intelligent realities. Immersive experiences at the intersection of art, technology and brand. Tunis, since 2017.",
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
    url: "https://fmrxr.studio",
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
