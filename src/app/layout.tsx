import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
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

const siteTitle = "KommunalSektor — Eit nytt operativsystem for kommunane";
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
      <head>
        <Script
          src="https://plausible.io/js/pa-i1OZagD_-M1z4WeS1m3QQ.js"
          strategy="afterInteractive"
          async
        />
        <Script id="plausible-init" strategy="afterInteractive">
          {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`}
        </Script>
      </head>
      <body
        className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} antialiased`}
        style={{
          fontFamily: "var(--font-dm-sans), 'Inter', sans-serif",
        }}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
