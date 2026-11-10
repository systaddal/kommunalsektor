import type { Metadata } from "next";
import SSTag from "../SSTag";
import SSSamtykkeVal from "../SSSamtykkeVal";
import PersonvernInnhald from "@/components/PersonvernInnhald";

export const metadata: Metadata = {
  title: "Personvern",
  description:
    "Korleis Selseng & Systaddal behandlar personopplysningar, og kva rettar du har.",
};

export default function SSPersonvernPage() {
  return (
    <article className="px-6 sm:px-10 pt-20 pb-16 sm:pt-28 sm:pb-20">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <SSTag>Personvern</SSTag>
        </div>
        <h1
          className="text-3xl sm:text-4xl tracking-tight text-[#2F2B26] mb-10"
          style={{ fontFamily: "var(--font-serif-ss), 'Source Serif 4', serif" }}
        >
          Personvernerklæring
        </h1>
        <PersonvernInnhald
          farger={{
            tekst: "#2F2B26",
            dempa: "#6B6860",
            linje: "#E4DBCB",
            lenkje: "#314D3C",
            overskrift: {
              fontFamily: "var(--font-serif-ss), 'Source Serif 4', serif",
            },
          }}
          samtykke={<SSSamtykkeVal />}
        />
      </div>
    </article>
  );
}
