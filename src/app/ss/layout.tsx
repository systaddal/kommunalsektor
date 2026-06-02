import type { Metadata } from "next";
import { TikTok_Sans } from "next/font/google";
import SSNav from "./SSNav";
import SSPageEnd from "./SSPageEnd";
import SSConsent from "./SSConsent";

const tiktokSans = TikTok_Sans({
  variable: "--font-tiktok",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Selseng & Systaddal",
    template: "%s — Selseng & Systaddal",
  },
  description: "Fornying av offentleg sektor. Frå innsida.",
  metadataBase: new URL("https://selsengsystaddal.no"),
  openGraph: {
    type: "website",
    locale: "nn_NO",
    siteName: "Selseng & Systaddal",
    title: "Selseng & Systaddal",
    description: "Fornying av offentleg sektor. Frå innsida.",
    url: "https://selsengsystaddal.no",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function SSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={tiktokSans.variable}
      style={{
        fontFamily: "var(--font-tiktok), 'TikTok Sans', sans-serif",
        background: "#fff",
        color: "#111",
        minHeight: "100vh",
      }}
    >
      <SSNav />
      {children}
      <SSPageEnd />
      {/* HubSpot tracking bak samtykke — kun Selseng & Systaddal */}
      <SSConsent />
    </div>
  );
}
