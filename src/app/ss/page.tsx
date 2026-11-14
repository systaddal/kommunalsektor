import Image from "next/image";
import { PortableText } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ssPortableText } from "./ssPortableText";
import SSAnimatedHeadline from "./SSAnimatedHeadline";
import SSLenke from "./SSLenke";
import SSModell, { type ModellTema } from "./SSModell";
import SSSubstack from "./SSSubstack";
import SSSynleg from "./SSSynleg";

type Bilete = {
  asset?: { _ref: string };
  alt?: string;
  namn?: string;
  _key?: string;
};

type Framside = {
  heroVenstre?: string;
  heroVerb?: string;
  heroHogre?: string;
  tagline?: string;
  bolk1Tittel?: string;
  bolk1Ingress?: unknown[];
  kjerneTittel?: string;
  kjerneTekst?: string;
  effektTittel?: string;
  effektar?: string[];
  effektKort?: { _key: string; tittel?: string; tekst?: string }[];
  omradeTittel?: string;
  omradeIngress?: string;
  ctaTekst?: string;
  substackTittel?: string;
  substackIngress?: string;
  substackUrl?: string;
  substackLenketekst?: string;
  substackTal?: number;
  folkaTittel?: string;
  folkaIngress?: string;
  folkaLenketekst?: string;
  opningsbilete?: Bilete;
  landskapsbilete?: Bilete;
  landskapTekst?: string;
  portrett?: Bilete[];
};

async function hentData(): Promise<{ side: Framside | null; tema: ModellTema[] }> {
  return client.fetch(
    `{
      "side": *[_type == "ssHomepage"][0],
      "tema": *[_type == "ssTema"] | order(rekkjefolgje asc) {
        _id, tittel, slug, posisjon
      }
    }`,
    {},
    { next: { revalidate: 60 } },
  );
}

const merkelapp =
  "text-[13px] uppercase tracking-[0.08em] font-medium text-[#6B6258]";
const knapp =
  "inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-colors";
const knappHandling = `${knapp} text-[#FAF8F3] bg-[#A65F3D] hover:bg-[#8C4E32]`;
const knappRoleg = `${knapp} text-[#314D3C] border border-[#B9B0A2] hover:bg-[#ECE4D6]`;

// Eitt ikon per effekt, i den faste rekkjefølgja: ressursbruk, trivsel,
// produkt og tenester, samhandling, tempo. Teikna i koden, så dei følgjer
// fargane i drakta.
const effektIkon = [
  <g key="0"><circle cx="16" cy="16" r="11" /><path d="M16 9v7l5 3" /></g>,
  <path key="1" d="M16 27s-10-6-10-13a6 6 0 0 1 10-4 6 6 0 0 1 10 4c0 7-10 13-10 13z" />,
  <g key="2"><rect x="6" y="6" width="20" height="20" rx="4" /><path d="M11 16l4 4 7-8" /></g>,
  <g key="3"><circle cx="11" cy="16" r="6" /><circle cx="21" cy="16" r="6" /></g>,
  <g key="4"><path d="M6 22l7-7 5 5 8-9" /><path d="M20 11h6v6" /></g>,
];

function harBilete(b?: Bilete): b is Bilete & { asset: { _ref: string } } {
  return Boolean(b?.asset?._ref);
}

export default async function SSHome() {
  const { side, tema } = await hentData();

  if (!side) {
    return (
      <div className="px-6 sm:px-10 py-20 text-center text-[#938C7F]">
        <p>
          Innhald ikkje funne. Legg til framsideinnhald i{" "}
          <a href="/studio" className="underline">
            studio
          </a>
          .
        </p>
      </div>
    );
  }

  const effektKort =
    side.effektKort && side.effektKort.length > 0
      ? side.effektKort
      : (side.effektar ?? []).map((e) => ({ _key: e, tittel: e, tekst: undefined }));
  const portrett = (side.portrett ?? []).filter(harBilete);
  const medOpningsbilete = harBilete(side.opningsbilete);

  return (
    <>
      {/* ── Toppen ──────────────────────────────────────────── */}
      {medOpningsbilete ? (
        <section className="px-6 sm:px-10 pt-6 sm:pt-10 pb-16 sm:pb-24">
          <div className="max-w-6xl mx-auto grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
            <div className="flex flex-col gap-5">
              <SSAnimatedHeadline
                venstre={side.heroVenstre}
                verb={side.heroVerb}
                hogre={side.heroHogre}
                venstrestilt
              />
              {side.tagline && (
                <p className="ss-subtitle !text-left">{side.tagline}</p>
              )}
              <div className="flex flex-wrap gap-3 mt-2">
                <SSLenke href="/ss/kontakt" className={knappHandling}>
                  {side.ctaTekst ?? "Kontakt oss"}
                </SSLenke>
                {effektKort.length > 0 && (
                  <a href="#effektar" className={knappRoleg}>
                    {side.effektTittel ?? "Kva som blir betre"}
                  </a>
                )}
              </div>
            </div>
            <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] max-h-[560px] w-full overflow-hidden rounded-[20px] bg-[#DDD1BE]">
              <Image
                src={urlFor(side.opningsbilete)
                  .width(1400)
                  .height(1750)
                  .fit("crop")
                  .auto("format")
                  .url()}
                alt={side.opningsbilete?.alt ?? ""}
                fill
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      ) : (
        <section className="px-6 sm:px-10 pt-20 sm:pt-28 pb-16 sm:pb-24">
          <div className="max-w-3xl mx-auto">
            <div className="mb-4 sm:mb-5">
              <SSAnimatedHeadline
                venstre={side.heroVenstre}
                verb={side.heroVerb}
                hogre={side.heroHogre}
              />
            </div>
            {side.tagline && <p className="ss-subtitle">{side.tagline}</p>}
          </div>
        </section>
      )}

      {/* ── 1 · Utgangspunktet og effektane ─────────────────── */}
      <section className="px-6 sm:px-10 pb-20 sm:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            {side.bolk1Tittel && (
              <h2 className="ss-h2">{side.bolk1Tittel}</h2>
            )}
            {side.bolk1Ingress && side.bolk1Ingress.length > 0 && (
              <div className="prose-ss text-[#6B6860] leading-relaxed text-lg">
                <PortableText
                  value={side.bolk1Ingress as never}
                  components={ssPortableText}
                />
              </div>
            )}
          </div>

          {effektKort.length > 0 && (
            <div id="effektar" className="scroll-mt-28 mt-16 sm:mt-20">
              {side.effektTittel && (
                <p className={`${merkelapp} mb-6`}>{side.effektTittel}</p>
              )}
              <SSSynleg className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {effektKort.map((e, i) => (
                  <article
                    key={e._key}
                    className="flex flex-col gap-3 rounded-2xl border border-[#ECE4D6] bg-[#FAF8F3] p-6"
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      stroke="#A65F3D"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      {effektIkon[i % effektIkon.length]}
                    </svg>
                    <h3 className="font-[family-name:var(--font-serif-ss)] text-xl font-semibold leading-snug text-[#314D3C]">
                      {e.tittel}
                    </h3>
                    {e.tekst && (
                      <p className="text-[15px] leading-relaxed text-[#6B6860]">
                        {e.tekst}
                      </p>
                    )}
                  </article>
                ))}
                <div className="flex flex-col justify-between gap-6 rounded-2xl bg-[#314D3C] p-6">
                  <p className="font-[family-name:var(--font-serif-ss)] text-xl font-semibold leading-snug text-[#F6F1E8]">
                    Fortel oss kva de står i.
                  </p>
                  <SSLenke
                    href="/ss/kontakt"
                    className={`${knapp} self-start text-[#2F2B26] bg-[#FAF8F3] hover:bg-[#ECE4D6]`}
                  >
                    {side.ctaTekst ?? "Kontakt oss"}{" "}
                    <span aria-hidden>&rarr;</span>
                  </SSLenke>
                </div>
              </SSSynleg>
            </div>
          )}
        </div>
      </section>

      {/* ── Modellen: dei fire områda rundt kjernen ─────────── */}
      {tema.length > 0 && (
        <section className="border-y border-[#ECE4D6] bg-[#FAF8F3] px-6 sm:px-10 py-20 sm:py-24">
          <div className="max-w-6xl mx-auto grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col gap-4">
              <p className={merkelapp}>
                {side.omradeTittel ?? "For deg som vil etterprøve oss"}
              </p>
              {side.kjerneTittel && (
                <h2 className="ss-h2">{side.kjerneTittel}</h2>
              )}
              {side.kjerneTekst && (
                <p className="text-lg leading-relaxed text-[#2F2B26]">
                  {side.kjerneTekst}
                </p>
              )}
              {side.omradeIngress && (
                <p className="leading-relaxed text-[#6B6860]">
                  {side.omradeIngress}
                </p>
              )}
            </div>
            <SSModell tema={tema} kjerne={side.kjerneTittel ?? "Trua på folk"} />
          </div>
        </section>
      )}

      {/* ── Landskapet ──────────────────────────────────────── */}
      {harBilete(side.landskapsbilete) && (
        <section className="relative flex min-h-[340px] items-end overflow-hidden sm:min-h-[460px]">
          <Image
            src={urlFor(side.landskapsbilete)
              .width(2400)
              .height(1100)
              .fit("crop")
              .auto("format")
              .url()}
            alt={side.landskapsbilete.alt ?? ""}
            fill
            sizes="100vw"
            className="object-cover"
          />
          {side.landskapTekst && (
            <>
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#2F2B26]/75 via-[#2F2B26]/25 to-transparent"
              />
              <div className="relative w-full px-6 sm:px-10 py-10 sm:py-14">
                <SSSynleg className="max-w-6xl mx-auto">
                  <p className="max-w-[20ch] font-[family-name:var(--font-serif-ss)] text-[clamp(1.75rem,3.6vw,2.5rem)] font-semibold leading-[1.15] text-[#FAF8F3]">
                    {side.landskapTekst}
                  </p>
                </SSSynleg>
              </div>
            </>
          )}
        </section>
      )}

      {/* ── 2 · Substack ────────────────────────────────────── */}
      <SSSubstack
        tittel={side.substackTittel}
        ingress={side.substackIngress}
        url={side.substackUrl}
        lenketekst={side.substackLenketekst}
        tal={side.substackTal}
      />

      {/* ── 3 · Folka ───────────────────────────────────────── */}
      <section className="bg-[#314D3C] px-6 sm:px-10 py-20 sm:py-24 text-[#F6F1E8]">
        <div
          className={
            portrett.length > 0
              ? "max-w-6xl mx-auto grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
              : "max-w-3xl mx-auto"
          }
        >
          <div className="flex flex-col gap-5">
            {side.folkaTittel && (
              <h2 className="ss-h2 !text-[#F6F1E8]">{side.folkaTittel}</h2>
            )}
            {side.folkaIngress && (
              <p className="leading-relaxed text-[#E4DBCB]">
                {side.folkaIngress}
              </p>
            )}
            <SSLenke
              href="/ss/folk"
              className="self-start font-medium text-[#F6F1E8] underline decoration-[#A65F3D] decoration-2 underline-offset-[6px] hover:decoration-[#F6F1E8] transition-colors"
            >
              {side.folkaLenketekst ?? "Meir om folka"}{" "}
              <span aria-hidden>&rarr;</span>
            </SSLenke>
          </div>

          {portrett.length > 0 && (
            <SSSynleg className="grid grid-cols-2 gap-4">
              {portrett.map((p, i) => (
                <SSLenke
                  key={p._key ?? p.asset._ref}
                  href="/ss/folk"
                  className={`group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-[#28402F] ${i % 2 === 1 ? "sm:mt-10" : ""}`}
                >
                  <Image
                    src={urlFor(p)
                      .width(700)
                      .height(933)
                      .fit("crop")
                      .auto("format")
                      .url()}
                    alt={p.namn ? `Portrett av ${p.namn}` : ""}
                    fill
                    sizes="(min-width: 1024px) 280px, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  {p.namn && (
                    <span className="absolute inset-x-3 bottom-3 rounded-[10px] bg-[#FAF8F3] px-3 py-2 text-[13px] font-medium text-[#2F2B26]">
                      {p.namn}
                    </span>
                  )}
                </SSLenke>
              ))}
            </SSSynleg>
          )}
        </div>
      </section>
    </>
  );
}
