import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import SSNav from "./SSNav";
import SSPageEnd from "./SSPageEnd";
import SSConsent from "./SSConsent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-serif-ss",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
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
      className={`${inter.variable} ${sourceSerif.variable}`}
      style={{
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
        background: "#F6F1E8",
        color: "#2F2B26",
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
