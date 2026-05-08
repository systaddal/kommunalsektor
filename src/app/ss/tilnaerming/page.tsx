import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Korleis me jobbar",
  description: "Forstå folk og forstå system. Slik jobbar Selseng & Systaddal med fornying av offentleg sektor.",
  openGraph: {
    title: "Korleis me jobbar — Selseng & Systaddal",
    description: "Forstå folk og forstå system. Slik jobbar Selseng & Systaddal med fornying av offentleg sektor.",
    url: "https://selsengsystaddal.no/tilnaerming",
  },
};

export default function TilnaermingPage() {
  return (
    <article className="px-6 sm:px-10 pt-20 pb-20 sm:pt-28 sm:pb-28">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <span className="inline-block text-[14px] text-[#666] border border-[#ccc] rounded-full px-3.5 py-1">
            Korleis me jobbar
          </span>
        </div>
        <div className="space-y-7 text-[#444] leading-[1.7] text-xl tracking-tight">
          <p>
            Me trur på folk. Samstundes trur me at det er mykje sant i sitatet:
            Den som trur den er ferdig utlært er ikkje utlært, men ferdig. Så
            har det blitt stadig meir synleg at noko grunnleggande er gale med
            måten samfunnsutviklinga treff kommunane på. Samstundes dukkar det
            stadig opp døme på verksemder, mest private — men også nokre
            offentlege — som ser ut til å ha knekt ein kode. Difor er ein del
            av jobbinga vår leiting. Etter det som gir meir meining, etter noko
            som treff verda slik den er no betre enn den forståinga som ligg
            bak den tradisjonelle styrings- og organisasjonstenkingane i
            offentleg sektor.
          </p>
          <p className="text-[#111] font-medium">
            For oss kan det oppsummerast i to punkt: Forstå folk og forstå
            system.
          </p>
          <p>
            I praksis har vårt bidrag vore å først forstå problema djupt nok
            til at ein er trygg på å ha skilt symptoma frå diagnosen. Først då
            kan me søke etter dei beste av dei utprøvde og anerkjente
            løysingane, gå raskt over til handling og kontinuerleg justere og
            reflektere over det som skjer. Ikkje åleine, men saman med dei som
            står i det.
          </p>
          <p>
            For å klare dette i praksis har me lært oss nye verktøy, metodar og
            rammeverk som bidreg til praksis og handling. Me har søkt dei
            praksisnære og tilgjengelege verktøya som raskt kan bidra til
            handling, og unngått abstraksjonar og enkle løysingar. Den gode
            nyheita er at ikkje berre finst dei, dei kan lett takast i bruk. Av
            alle som vil. Difor trur me at læringa vår har overføringsverdi til
            andre. Me trur at mange av dei utfordringane som kommunane står i
            kan møtast utan dei store endringane i rammebetingselsar frå oven.
            Kanskje til og med helst utan for mykje innblanding frå oven.
          </p>
          <p>
            Me har brukt anerkjende verktøy og metodar, og tilpassa dei
            kommunal kontekst. Dei er testa og brukt i den verkelegheita som
            kommunane står i. Alle verktøya har me brukt sjølv, på og med
            faktiske kommunale tenester. Inngangen er å alltid ta utgangspunkt
            i det handlingsrommet som finst, og bruke det til å skape
            meiningsfull endring og utvikling. Så utvidar handlingsrommet seg
            etter kvart. Saman med evna vår til å bidra til endå meir
            handlingsrom.
          </p>
          <p>
            Erfaringar frå dei som har gått føre oss peikar på at alle
            organisasjonar må meistre to ting samstundes: Folk og system. Rolla
            vår er å fasilitere prosessar som får fram det beste i begge. Med
            klår retning, etisk refleksjon og eit folkeleg språk som held fast
            på verdiane. Også når det stormar. Vår hypotese er at det ikkje
            berre er mogeleg, men realistisk at ein kvar kommune kan auke
            organisasjonen og dei tilsette si evne til å halde fram i eigen
            regi. Me vil gjerne hjelpe til, men verken kan eller vil ta over
            det ansvaret som dei tilsette har.
          </p>
        </div>
      </div>
    </article>
  );
}
