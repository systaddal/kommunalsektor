import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const serif = {
  fontFamily: "var(--font-serif), 'Fraunces', serif",
  fontWeight: 400 as const,
};

const CIRCLE_URL = "https://selsengsystaddal.circle.so/s/kommunalsektor-no";

const rom = [
  { namn: "Del og lær", tekst: "Spør, del erfaringar og lær av andre som står i kommunal kvardag." },
  { namn: "Inspirasjon", tekst: "Del det gode arbeidet ditt, og hent idéar frå andre kommunar." },
  { namn: "Ressursar", tekst: "Verktøy, malar og døme du kan ta rett inn i neste møte." },
  { namn: "Arrangement", tekst: "Webinar, samlingar og Kommunefredag. Møt folk som vil det same." },
];

export const metadata = {
  title: "Fellesskap",
  description:
    "Eit praksisfellesskap for folk som vil utvikle kommunal sektor innanfrå. Del erfaringar, lær av andre og gå frå prat til handling.",
};

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function FellesskapPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      <section>
        <div className="mx-auto max-w-3xl px-6 py-24 sm:py-28 text-center">
          <div className="flex justify-center mb-6">
            <span
              className="inline-flex items-center gap-2 rounded-full bg-[#D8E0D6] px-4 py-1.5 text-xs tracking-wide text-[#2D4233]"
              style={{ fontFamily: "var(--font-mono), ui-monospace, monospace" }}
            >
              <svg viewBox="0 0 135 171" aria-hidden="true" fill="currentColor" className="w-[11px] h-auto">
                <path d="M135 0V62.6113C135 118.177 74.445 166.696 67.5 171C60.555 166.696 0.000299323 118.177 0 62.6113V0H135Z" />
              </svg>
              Del og lær
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl tracking-tight leading-tight text-[#2D4233]" style={serif}>
            Bli med i fellesskapet
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#43565A] max-w-xl mx-auto leading-relaxed">
            Eit lukka praksisfellesskap for folk som vil utvikle kommunal sektor innanfrå. Her deler me erfaringar, lærer av kvarandre og går frå prat til handling.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <a
              href={CIRCLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#C7653A] text-[#FAF7EF] px-6 py-3 rounded-full text-sm font-medium hover:bg-[#A8542F] transition-colors"
            >
              Bli medlem
              <Arrow />
            </a>
            <Link
              href="/#kontakt"
              className="border border-[#2D4233] px-6 py-3 rounded-full text-sm font-medium text-[#2D4233] hover:bg-[#D8E0D6] transition-colors"
            >
              Spør oss først
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(28,28,26,0.09)]">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <div className="max-w-[720px] mb-12">
            <h2 className="text-3xl sm:text-4xl tracking-tight mb-4 text-[#18251D]" style={serif}>
              Fire rom, éin stad å dele
            </h2>
            <p className="text-[#43565A] text-base sm:text-lg leading-relaxed">
              Fellesskapet er delt i fire rom, så det er lett å finne fram til det du treng der og då.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {rom.map((r) => (
              <div key={r.namn} className="border border-[rgba(28,28,26,0.09)] rounded-xl bg-[#FAF7EF] p-6 sm:p-7">
                <h3 className="text-lg font-medium text-[#18251D]">{r.namn}</h3>
                <p className="mt-2 text-[#43565A] text-sm sm:text-base leading-relaxed">{r.tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(28,28,26,0.09)]">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28 text-center">
          <h2 className="text-3xl sm:text-4xl tracking-tight text-[#18251D] mb-4" style={serif}>
            Klar for å dele?
          </h2>
          <p className="text-[#43565A] leading-relaxed text-base mb-10 max-w-lg mx-auto">
            Fellesskapet er ope for folk som jobbar med og i kommunal sektor. Bli med, eller ta kontakt om du vil høyre meir først.
          </p>
          <a
            href={CIRCLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#C7653A] text-[#FAF7EF] px-6 py-3 rounded-full text-sm font-medium hover:bg-[#A8542F] transition-colors"
          >
            Bli medlem
            <Arrow />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
