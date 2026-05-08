import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kva me gjer",
  description: "To parallelle spor: forankring og handling. Slik bidreg Selseng & Systaddal til endring i kommunane.",
  openGraph: {
    title: "Kva me gjer — Selseng & Systaddal",
    description: "To parallelle spor: forankring og handling. Slik bidreg Selseng & Systaddal til endring i kommunane.",
    url: "https://selsengsystaddal.no/arbeid",
  },
};

export default function ArbeidPage() {
  return (
    <article className="px-6 sm:px-10 pt-20 pb-20 sm:pt-28 sm:pb-28">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <span className="inline-block text-[14px] text-[#666] border border-[#ccc] rounded-full px-3.5 py-1">
            Kva me gjer
          </span>
        </div>
        <div className="space-y-7 text-[#444] leading-[1.7] text-xl tracking-tight">
          <p>Me jobbar i to parallelle spor:</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          <div className="rounded-2xl border border-[#eee] bg-[#fafafa] p-6 flex flex-col justify-between min-h-[240px]">
            <h2 className="text-[#111] font-medium text-lg tracking-tight">
              1. Forankring
            </h2>
            <p className="text-[#999] text-sm leading-relaxed mt-auto pt-6">
              Det må starte på overordna nivå — helst partssamansett. Dette
              arbeidet rettar seg typisk mot kommunedirektøren og hans
              leiargruppe, dei største hovudsamanslutningane på
              tillitsvaldsida og vernetenesta.
            </p>
          </div>

          <div className="rounded-2xl border border-[#eee] bg-[#fafafa] p-6 flex flex-col justify-between min-h-[240px]">
            <h2 className="text-[#111] font-medium text-lg tracking-tight">
              2. Handling
            </h2>
            <p className="text-[#999] text-sm leading-relaxed mt-auto pt-6">
              Ute i tenestene, der organisasjonen treff innbyggjarane.
              Fasilitering av korte, engasjerande prosessar som grip fatt i
              faktiske problem, og leverer løysingar som kan prøvast ut i
              praksis. I løpet av dagar, ikkje veker, månadar eller år.
            </p>
          </div>
        </div>

        <div className="space-y-7 text-[#444] leading-[1.7] text-xl tracking-tight mt-12">
          <p>
            Desse to spora vekselverkar med kvarandre og bidreg til kollektiv
            læring. Mest mogeleg av det som vert jobba med må gjerast
            gjennomsiktig og synleg for heile organisasjonen. Då inspirerer ein
            til meir utprøving og bidreg til breiast mogeleg læring.
          </p>
          <p className="text-[#111] font-medium">
            Målet er å bidra til organisasjonar som er kjekke å jobbe i og som
            betyr noko for dei som dei er til for.
          </p>
          <p>
            Me meiner at dagens styringslogikk er utdatert og gir for lite
            plass til det menneskelege. Me trur på mindre synsing, sjefing og
            kontrollering, og meir læring, meistring og handling.
          </p>
        </div>
      </div>
    </article>
  );
}
