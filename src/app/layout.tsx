import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import Sporing from "./Sporing";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteTitle = "KommunalSektor — Handlingsrommet finst alt";
const siteDescription =
  "Erfaringar, rammeverk og inspirasjon for kommunar som vil gjere noko anna. Frå praksis, ikkje skrivebordsøvingar.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "https://kommunalsektor.vercel.app"),
  ),
  title: {
    default: siteTitle,
    template: "%s — KommunalSektor",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "nn_NO",
    siteName: "KommunalSektor",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nn">
      <body
        className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} antialiased`}
        style={{
          fontFamily: "var(--font-dm-sans), 'Inter', sans-serif",
        }}
      >
        {children}
        <Sporing />
      </body>
    </html>
  );
}
