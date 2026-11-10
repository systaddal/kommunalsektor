import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import PersonvernInnhald from "@/components/PersonvernInnhald";

export const metadata: Metadata = {
  title: "Personvern",
  description:
    "Korleis Selseng & Systaddal behandlar personopplysningar på KommunalSektor, og kva rettar du har.",
};

const serif = {
  fontFamily: "var(--font-serif), 'Fraunces', serif",
  fontWeight: 400 as const,
};

export default function PersonvernPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#18251D] mb-10"
          style={serif}
        >
          Personvernerklæring
        </h1>
        <PersonvernInnhald
          farger={{
            tekst: "#18251D",
            dempa: "#43565A",
            linje: "#DCD6CA",
            lenkje: "#2D4233",
            overskrift: serif,
          }}
        />
      </article>
      <Footer />
    </div>
  );
}
