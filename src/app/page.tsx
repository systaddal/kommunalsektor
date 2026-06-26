import Link from "next/link";
import { client } from "@/sanity/lib/client";
import StepTabs from "@/components/StepTabs";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import PodcastSection from "@/components/PodcastSection";
import { getEpisodes } from "@/lib/podcast";

const serif = {
  fontFamily: "var(--font-serif), 'Fraunces', serif",
  fontWeight: 400 as const,
};

type OsRow = { oldTitle: string; oldDesc: string; newTitle: string; newDesc: string };
type Outcome = { title: string; desc: string };
type Step = {
  num: string;
  label: string;
  title: string;
  activities: string[];
  effects: string[];
};

type Frontpage = {
  heroHeading: string;
  heroSubtitle: string;
  osHeading: string;
  osIntro: string;
  osRows: OsRow[];
  osSummary: string;
  osOutcomes: Outcome[];
  fmHeading: string;
  fmSubtitle: string;
  fmSteps: Step[];
  fmCalloutLeftTitle: string;
  fmCalloutLeftItems: string[];
  fmCalloutRightTitle: string;
  fmCalloutRightItems: string[];
  domeHeading: string;
  domeSubtitle: string;
  kontaktHeading: string;
  kontaktSubtitle: string;
  kontaktEmail: string;
  kontaktCompany: string;
  kontaktPeople: string;
  kontaktLocation: string;
};

async function getFrontpage(): Promise<Frontpage> {
  return client.fetch(
    `*[_type == "frontpage"][0]`,
    {},
    { next: { revalidate: 60 } },
  );
}

function Hero({ data }: { data: Frontpage }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 sm:py-32 text-center">
      <div className="flex justify-center mb-8">
        <svg
          width={40}
          height={51}
          viewBox="0 0 135 171"
          fill="currentColor"
          className="text-[#2D4233]"
        >
          <path d="M135 0V62.6113C135 118.177 74.445 166.696 67.5 171C60.555 166.696 0.000299323 118.177 0 62.6113V0H135Z" />
        </svg>
      </div>
      <h1
        className="text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight text-[#1C1C1A]"
        style={serif}
      >
        {data.heroHeading}
      </h1>
      <p className="mt-6 text-lg sm:text-xl text-[#6B6860] max-w-xl mx-auto leading-relaxed">
        {data.heroSubtitle}
      </p>
      <div className="mt-10 flex gap-4 justify-center">
        <Link
          href="#operativsystem"
          className="bg-[#2D4233] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#3A5240] transition-colors"
        >
          Les meir
        </Link>
        <Link
          href="#kontakt"
          className="border border-[rgba(28,28,26,0.14)] px-6 py-3 rounded-full text-sm font-medium text-[#1C1C1A] hover:bg-[#E8E2D6] transition-colors"
        >
          Ta kontakt
        </Link>
      </div>
    </section>
  );
}

function SectionOperativsystem({ data }: { data: Frontpage }) {
  return (
    <section id="operativsystem" className="border-t border-[rgba(28,28,26,0.09)]">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <div className="max-w-[720px] mb-12">
          <h2 className="text-3xl sm:text-4xl tracking-tight mb-6 text-[#1C1C1A]" style={serif}>
            {data.osHeading}
          </h2>
          <p className="text-[#3a3a38] leading-[1.75] text-base">
            {data.osIntro}
          </p>
        </div>

        {data.osRows && data.osRows.length > 0 && (
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6860] mb-4">
              Dei gamle systema
            </p>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2D4233] mb-4 max-md:hidden">
              Dei nye systema
            </p>

            {data.osRows.map((row, i) => (
              <div key={i} className="contents">
                <div className="border border-[rgba(28,28,26,0.09)] rounded-xl p-5 bg-[#F8F6F1] mb-3">
                  <p className="font-semibold text-[#1C1C1A] text-sm">{row.oldTitle}</p>
                  <p className="text-[#6B6860] text-sm mt-1">{row.oldDesc}</p>
                </div>
                {i === 0 && (
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#2D4233] mb-4 md:hidden">
                    Dei nye systema
                  </p>
                )}
                <div className="border border-[#C8DEC8] rounded-xl p-5 bg-[#EEF5EE] mb-3">
                  <p className="font-semibold text-[#1C1C1A] text-sm">{row.newTitle}</p>
                  <p className="text-[#3a3a38] text-sm mt-1">{row.newDesc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {data.osSummary && (
          <p className="text-sm text-[#6B6860] mt-6 italic text-center">
            {data.osSummary}
          </p>
        )}

        {data.osOutcomes && data.osOutcomes.length > 0 && (
          <div className="mt-14 border-t border-[rgba(28,28,26,0.09)] pt-10 grid sm:grid-cols-3 gap-6">
            {data.osOutcomes.map((item) => (
              <div key={item.title} className="border-l-2 border-[#2D4233] pl-5 py-1">
                <p className="font-semibold text-[#1C1C1A] text-sm">{item.title}</p>
                <p className="text-[#6B6860] text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function SectionFramgangsmaate({ data }: { data: Frontpage }) {
  return (
    <section id="framgangsmaate" className="border-t border-[rgba(28,28,26,0.09)]">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl tracking-tight mb-6 text-[#1C1C1A]" style={serif}>
            {data.fmHeading}
          </h2>
          <p className="text-[#6B6860] text-base leading-relaxed">
            {data.fmSubtitle}
          </p>
        </div>

        {data.fmSteps && <StepTabs steps={data.fmSteps} />}

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="border border-[rgba(28,28,26,0.14)] rounded-xl p-6 bg-[#F8F6F1]">
            <h4 className="text-lg tracking-tight text-[#1C1C1A] mb-4" style={serif}>
              {data.fmCalloutLeftTitle}
            </h4>
            <ul className="space-y-2">
              {data.fmCalloutLeftItems?.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-[#3a3a38] text-sm leading-relaxed"
                >
                  <span className="flex-shrink-0 w-1 h-1 rounded-full bg-[#6B6860] mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-[#C8DEC8] rounded-xl p-6 bg-[#EEF5EE]">
            <h4 className="text-lg tracking-tight text-[#2D4233] mb-4" style={serif}>
              {data.fmCalloutRightTitle}
            </h4>
            <ul className="space-y-2">
              {data.fmCalloutRightItems?.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-[#2D4233] text-sm leading-relaxed"
                >
                  <span className="flex-shrink-0 w-1 h-1 rounded-full bg-[#2D4233] mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionDomeOgKontakt({ data }: { data: Frontpage }) {
  const email = data.kontaktEmail || "post@kommunalsektor.no";

  return (
    <>
      <section id="dome" className="border-t border-[rgba(28,28,26,0.09)]">
        <div className="mx-auto max-w-5xl px-6 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl tracking-tight text-[#1C1C1A]" style={serif}>
              {data.domeHeading}
            </h2>
            <p className="text-[#6B6860] text-base mt-2">
              {data.domeSubtitle}
            </p>
          </div>
          <Link
            href="/artiklar"
            className="bg-[#2D4233] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#3A5240] transition-colors flex-shrink-0"
          >
            Sjå alle artiklar
          </Link>
        </div>
      </section>

      <section id="kontakt" className="border-t border-[rgba(28,28,26,0.09)]">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28 text-center">
          <h2 className="text-3xl sm:text-4xl tracking-tight text-[#1C1C1A] mb-4" style={serif}>
            {data.kontaktHeading}
          </h2>
          <p className="text-[#3a3a38] leading-relaxed text-base mb-10 max-w-lg mx-auto">
            {data.kontaktSubtitle}
          </p>

          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-3 bg-white border border-[rgba(28,28,26,0.14)] rounded-2xl px-8 py-5 hover:border-[#C8DEC8] hover:bg-[#FAFAF7] transition-all group"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#2D4233] flex-shrink-0">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span className="text-lg font-medium text-[#1C1C1A] group-hover:text-[#2D4233] transition-colors">
              {email}
            </span>
          </a>

          <div className="mt-10 text-sm text-[#6B6860] space-y-0.5">
            {data.kontaktCompany && <p className="font-medium text-[#1C1C1A]">{data.kontaktCompany}</p>}
            {data.kontaktPeople && <p>{data.kontaktPeople}</p>}
            {data.kontaktLocation && <p className="pt-1">{data.kontaktLocation}</p>}
          </div>
        </div>
      </section>
    </>
  );
}

export default async function Home() {
  const [data, episodes] = await Promise.all([
    getFrontpage(),
    getEpisodes(8),
  ]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#6B6860]">
        <p>Innhald ikkje funne. Legg til framsideinnhald i <a href="/studio" className="underline">studio</a>.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Nav />
      <Hero data={data} />
      <PodcastSection episodes={episodes} />
      <SectionOperativsystem data={data} />
      <SectionFramgangsmaate data={data} />
      <SectionDomeOgKontakt data={data} />
      <Footer />
    </div>
  );
}
