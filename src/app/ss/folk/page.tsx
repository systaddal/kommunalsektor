import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Helle & Joakim",
  description: "Endring, leiing og samfunnsutvikling. Møt folka bak Selseng & Systaddal.",
  openGraph: {
    title: "Helle & Joakim — Selseng & Systaddal",
    description: "Endring, leiing og samfunnsutvikling. Møt folka bak Selseng & Systaddal.",
    url: "https://selsengsystaddal.no/folk",
  },
};

export default function FolkPage() {
  return (
    <article className="px-6 sm:px-10 pt-20 pb-20 sm:pt-28 sm:pb-28">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <span className="inline-block text-[14px] text-[#666] border border-[#ccc] rounded-full px-3.5 py-1">
            Helle & Joakim
          </span>
        </div>
        <div className="space-y-7 text-[#444] leading-[1.7] text-xl tracking-tight">
          <p>
            Me er Helle Selseng og Joakim Systaddal. Vårt oppdrag er endring,
            leiing og samfunnsutvikling. Det me tek med oss inn i oppdrag, er
            ein kombinasjon av jordnær gjennomføring og fagleg djupne. Me finn
            det som faktisk står i vegen, og får ting til å skje saman med dei
            som skal leve med løysingane.
          </p>
        </div>

        <div className="mt-16 space-y-12">
          <div>
            <h2 className="text-lg font-medium text-[#111] mb-4 tracking-tight">
              Helle Selseng
            </h2>
            <div className="space-y-5 text-[#444] leading-[1.7] text-xl tracking-tight">
              <p>
                Helle er jurist og leiar, med tyngde i arbeidsrett, HR og
                organisasjonsutvikling. Ho har vore HR-leiar i Sogndal
                kommune, med brei erfaring frå krevjande personalsaker,
                endringsprosessar og arbeidsgjevarrolla.
              </p>
              <p>
                Ho har òg vore fast stadfortredar for kommunedirektøren og del
                av krise- og beredskapsleiing.
              </p>
              <p>
                Før tida i kommunen var ho med og bygde opp private
                verksemder, mellom anna i eigedomsbransjen, med fag- og
                resultatansvar. Helle kombinerer struktur, tempo og kvalitet –
                og held stø kurs når det står mykje på spel.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium text-[#111] mb-4 tracking-tight">
              Joakim Systaddal
            </h2>
            <div className="space-y-5 text-[#444] leading-[1.7] text-xl tracking-tight">
              <p>
                Joakim er leiar og utviklar i skjeringspunktet mellom
                teknologi, omstilling og samfunnsutvikling. Han har leia og
                fasilitert komplekse endringsprosessar – frå IKT og
                digitalisering til innovasjon og strategisk utviklingsarbeid –
                både i privat næringsliv og i kommunar.
              </p>
              <p>
                Dei siste åra har han hatt fleire roller i Sogndal kommune, med
                ansvar for å drive utvikling på tvers av tenester og nivå, og
                byggje samarbeid med eksterne aktørar.
              </p>
              <p>
                Joakim er særleg oppteken av metodikk som verkar i kvardagen:
                smidige arbeidsformer, tenestedesign, læring i organisasjonar
                og tillitsbasert styring.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium text-[#111] mb-4 tracking-tight">
              Saman
            </h2>
            <div className="space-y-5 text-[#444] leading-[1.7] text-xl tracking-tight">
              <p>
                Me står trygt i rom der det er mykje på spel: når ein skal
                endre måten ein jobbar på, rydde i roller og ansvar, styrkje
                leiing og samspel, eller skape retning som faktisk blir omsett
                til handling.
              </p>
              <p>
                Me trur på ærlegdom, tydeleg språk og samarbeid. Gode løysingar
                veks fram når ein vågar å sjå realitetane, og samstundes har
                respekt for folk, fag og lokalt handlingsrom.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
