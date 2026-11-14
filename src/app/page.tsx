import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import StepTabs from "@/components/StepTabs";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import PodcastSpelar from "@/components/PodcastSpelar";
import PodcastOmslag from "@/components/PodcastOmslag";
import SSSynleg from "@/app/ss/SSSynleg";
import { getEpisodes, getPodcastCover, PODCAST_RSS_URL, type Episode } from "@/lib/podcast";

const serif = {
  fontFamily: "var(--font-serif), 'Fraunces', serif",
  fontWeight: 400 as const,
};

type Step = {
  num: string;
  label: string;
  title: string;
  activities: string[];
  effects: string[];
};

type Post = {
  _id: string;
  title: string;
  slug?: { current?: string };
  summary?: string;
  publishedAt?: string;
  image?: unknown;
};

type Frontpage = {
  heroHeading: string;
  heroSubtitle: string;
  heroEyebrow?: string;
  heroPrimaryLabel?: string;
  heroSecondaryLabel?: string;
  entryCards?: { title?: string; sub?: string }[];
  domeButtonLabel?: string;
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

async function getLatestPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc)[0...6]{
      _id, title, slug, summary, publishedAt, image
    }`,
    {},
    { next: { revalidate: 60 } },
  );
}

type PodcastSettings = {
  label?: string;
  heading?: string;
  intro?: string;
  spotifyUrl?: string;
  appleUrl?: string;
};

async function getPodcastSettings(): Promise<PodcastSettings | null> {
  return client.fetch(
    `*[_type == "podcastSettings"][0]`,
    {},
    { next: { revalidate: 60 } },
  );
}

function formatDate(iso?: string): string | null {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("nn-NO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const mono = {
  fontFamily: "var(--font-mono), ui-monospace, monospace",
};
const merkelapp = "text-xs font-medium uppercase tracking-[0.1em]";
const breidd = "mx-auto max-w-6xl px-6 sm:px-8";

function Pil({ storleik = 16 }: { storleik?: number }) {
  return (
    <svg
      width={storleik}
      height={storleik}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function Skjold({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 135 171" aria-hidden="true" fill="currentColor" className={className}>
      <path d="M135 0V62.6113C135 118.177 74.445 166.696 67.5 171C60.555 166.696 0.000299323 118.177 0 62.6113V0H135Z" />
    </svg>
  );
}

function lenkjeTil(post: Post): string {
  return `/artiklar/${post.slug?.current ?? ""}`;
}

// Opninga: overskrift og knappar til venstre, siste sak stort til høgre.
// Saka skifter kvar gong me publiserer, så opninga er aldri den same lenge.
function Hero({ data, siste }: { data: Frontpage; siste?: Post }) {
  return (
    <section>
      <div
        className={`${breidd} grid items-center gap-12 pt-10 pb-20 sm:pt-14 sm:pb-24 ${
          siste ? "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14" : "max-w-3xl text-center"
        }`}
      >
        <div className={`flex flex-col gap-6 ${siste ? "" : "items-center"}`}>
          <p className={`${merkelapp} inline-flex items-center gap-2.5 text-[#2D4233]`} style={mono}>
            <Skjold className="h-auto w-[11px]" />
            {data.heroEyebrow || "Frå prat til handling"}
          </p>
          <h1
            className="text-4xl leading-[1.08] tracking-tight text-[#2D4233] sm:text-5xl lg:text-[3.75rem]"
            style={serif}
          >
            {data.heroHeading}
          </h1>
          <p className="max-w-[34ch] text-lg leading-relaxed text-[#43565A] sm:text-[1.19rem]">
            {data.heroSubtitle}
          </p>
          <div className="mt-1 flex flex-wrap gap-3">
            <Link
              href="/fellesskap"
              className="inline-flex items-center gap-2 rounded-full bg-[#A8542F] px-6 py-3 text-sm font-medium text-[#FAF7EF] transition-colors hover:bg-[#8F4626]"
            >
              {data.heroPrimaryLabel || "Bli med i fellesskapet"}
              <Pil />
            </Link>
            <Link
              href="#kontakt"
              className="rounded-full border border-[#2D4233] px-6 py-3 text-sm font-medium text-[#2D4233] transition-colors hover:bg-[#D8E0D6]"
            >
              {data.heroSecondaryLabel || "Ta kontakt"}
            </Link>
          </div>
        </div>

        {siste && (
          <Link
            href={lenkjeTil(siste)}
            className="group flex flex-col overflow-hidden rounded-2xl border border-[#D8D2C4] bg-[#FAF7EF] transition-shadow hover:shadow-[0_6px_22px_rgba(28,28,26,0.10)]"
          >
            {siste.image ? (
              <div className="relative aspect-[16/9] overflow-hidden bg-[#D8E0D6]">
                <Image
                  src={urlFor(siste.image).width(1280).height(720).fit("crop").auto("format").url()}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 620px, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>
            ) : null}
            <div className="flex flex-col gap-2.5 px-6 pt-6 pb-7 sm:px-7">
              <p className={`${merkelapp} text-[#2D4233]`} style={mono}>
                {["Siste sak", formatDate(siste.publishedAt)].filter(Boolean).join(" · ")}
              </p>
              <h2 className="text-[1.75rem] leading-tight text-[#18251D] sm:text-[2.1rem]" style={serif}>
                {siste.title}
              </h2>
              {siste.summary && (
                <p className="line-clamp-3 text-base leading-relaxed text-[#43565A]">
                  {siste.summary}
                </p>
              )}
              <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-[#A8542F]">
                Les saka <Pil />
              </span>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
}

// Artiklane i avisoppsett: éi stor sak og resten som rader med lite bilete.
function SectionArtiklar({ data, posts }: { data: Frontpage; posts: Post[] }) {
  const [stor, ...rader] = posts;

  return (
    <section id="artiklar" className="border-t border-[#D8D2C4]">
      <div className={`${breidd} py-20 sm:py-24`}>
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[640px]">
            <h2 className="mb-3 text-3xl tracking-tight text-[#18251D] sm:text-[2.5rem] sm:leading-[1.15]" style={serif}>
              {data.domeHeading || "Siste artiklar"}
            </h2>
            {data.domeSubtitle && (
              <p className="text-base leading-relaxed text-[#43565A] sm:text-[1.06rem]">
                {data.domeSubtitle}
              </p>
            )}
          </div>
          <Link
            href="/artiklar"
            className="inline-flex flex-shrink-0 items-center gap-2 self-start text-sm font-semibold text-[#2D4233] transition-colors hover:text-[#A8542F] sm:self-auto"
          >
            {data.domeButtonLabel || "Sjå alle artiklar"} <Pil />
          </Link>
        </div>

        {stor ? (
          <SSSynleg className="grid items-start gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
            <Link href={lenkjeTil(stor)} className="group flex flex-col gap-4">
              {stor.image ? (
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[#D8E0D6]">
                  <Image
                    src={urlFor(stor.image).width(1280).height(720).fit("crop").auto("format").url()}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 640px, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </div>
              ) : null}
              {formatDate(stor.publishedAt) && (
                <p className={`${merkelapp} text-[#43565A]`} style={mono}>
                  {formatDate(stor.publishedAt)}
                </p>
              )}
              <h3 className="text-[1.7rem] leading-tight text-[#18251D] transition-colors group-hover:text-[#2D4233] sm:text-[2rem]" style={serif}>
                {stor.title}
              </h3>
              {stor.summary && (
                <p className="line-clamp-3 max-w-[56ch] text-base leading-relaxed text-[#43565A]">
                  {stor.summary}
                </p>
              )}
            </Link>

            {rader.length > 0 && (
              <div className="flex flex-col border-b border-[#D8D2C4]">
                {rader.map((post) => (
                  <Link
                    key={post._id}
                    href={lenkjeTil(post)}
                    className="group flex items-center gap-5 border-t border-[#D8D2C4] py-[18px]"
                  >
                    {post.image ? (
                      <div className="relative h-[84px] w-[134px] flex-shrink-0 overflow-hidden rounded-lg bg-[#D8E0D6] sm:h-[105px] sm:w-[168px]">
                        <Image
                          src={urlFor(post.image).width(336).height(210).fit("crop").auto("format").url()}
                          alt=""
                          fill
                          sizes="168px"
                          className="object-cover"
                        />
                      </div>
                    ) : null}
                    <div className="flex min-w-0 flex-col gap-1.5">
                      {formatDate(post.publishedAt) && (
                        <p className={`${merkelapp} text-[#43565A]`} style={mono}>
                          {formatDate(post.publishedAt)}
                        </p>
                      )}
                      <h3 className="text-lg leading-snug text-[#18251D] transition-colors group-hover:text-[#2D4233] sm:text-[1.375rem]" style={serif}>
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </SSSynleg>
        ) : (
          <div className="rounded-xl border border-dashed border-[rgba(28,28,26,0.14)] p-10 text-center">
            <p className="text-base text-[#43565A]">Ingen artiklar publiserte enno.</p>
          </div>
        )}
      </div>
    </section>
  );
}

// Podkasten på mørk grøn flate: omslag og lenkjer til venstre, siste episode
// stort og dei tre neste som rader til høgre.
function SectionPodkast({
  episodes,
  settings,
  omslag,
}: {
  episodes: Episode[];
  settings?: PodcastSettings;
  omslag: string | null;
}) {
  const label = settings?.label || "Podcast";
  const heading = settings?.heading || "Lytt til podcasten Samfunnsoppdraget";
  const intro =
    settings?.intro ||
    "Samtalar med ulike perspektiv om korleis ein best kan bidra til kommunane sitt samfunnsoppdrag.";
  const spotifyUrl =
    settings?.spotifyUrl || "https://open.spotify.com/show/033zfEoDsDQ30p0SrAv31v";
  const appleUrl =
    settings?.appleUrl ||
    "https://podcasts.apple.com/us/podcast/samfunnsoppdraget/id6780780479";
  const lys =
    "rounded-full bg-[#F5F1E8] px-5 py-2.5 text-sm font-medium text-[#2D4233] transition-colors hover:bg-[#D8E0D6]";

  return (
    <section id="podkast" className="scroll-mt-20 bg-[#2D4233] text-[#F5F1E8]">
      <div className={`${breidd} grid items-start gap-x-16 gap-y-12 py-20 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]`}>
        <div className="flex flex-col gap-5">
          {omslag && <PodcastOmslag src={omslag} />}
          <p className={`${merkelapp} text-[#B8C9B2]`} style={mono}>
            {label}
          </p>
          <h2 className="text-3xl tracking-tight text-[#F5F1E8] sm:text-[2.5rem] sm:leading-[1.15]" style={serif}>
            {heading}
          </h2>
          <p className="max-w-[40ch] leading-relaxed text-[#D8E0D6]">{intro}</p>
          <div className="mt-1 flex flex-wrap gap-2.5">
            {spotifyUrl && (
              <a href={spotifyUrl} target="_blank" rel="noopener noreferrer" className={lys}>
                Spotify
              </a>
            )}
            {appleUrl && (
              <a href={appleUrl} target="_blank" rel="noopener noreferrer" className={lys}>
                Apple Podcasts
              </a>
            )}
            <a
              href={PODCAST_RSS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#B8C9B2] px-5 py-2.5 text-sm font-medium text-[#F5F1E8] transition-colors hover:bg-[#3A5240]"
            >
              RSS
            </a>
          </div>
        </div>

        <SSSynleg>
          {episodes.length > 0 ? (
            <>
              <PodcastSpelar
                episodes={episodes.map((ep) => ({
                  ...ep,
                  datoTekst: formatDate(ep.pubDate ?? undefined),
                }))}
              />
              <Link
                href="/podcast"
                className="flex items-center gap-2 border-t border-[#44594A] pt-5 text-sm font-semibold text-[#F5F1E8] transition-colors hover:text-[#C49A5A]"
              >
                Alle episodar <Pil />
              </Link>
            </>
          ) : (
            <p className="text-[#D8E0D6]">Episodane er på veg. Abonner via lenkjene.</p>
          )}
        </SSSynleg>
      </div>
    </section>
  );
}

function Punkt({ children, farge }: { children: React.ReactNode; farge: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1 flex-shrink-0" style={{ color: farge }}>
        <Pil />
      </span>
      <span>{children}</span>
    </li>
  );
}

function SectionFramgangsmaate({ data }: { data: Frontpage }) {
  return (
    <section id="framgangsmaate">
      <div className={`${breidd} py-20 sm:py-24`}>
        <div className="mb-11 max-w-[640px]">
          <h2 className="mb-3 text-3xl tracking-tight text-[#18251D] sm:text-[2.5rem] sm:leading-[1.15]" style={serif}>
            {data.fmHeading}
          </h2>
          <p className="text-base leading-relaxed text-[#43565A] sm:text-[1.06rem]">
            {data.fmSubtitle}
          </p>
        </div>

        {data.fmSteps && <StepTabs steps={data.fmSteps} />}

        <SSSynleg className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[#D8D2C4] bg-[#FAF7EF] p-7 sm:p-8">
            <h3 className="mb-4 text-xl tracking-tight text-[#18251D] sm:text-2xl" style={serif}>
              {data.fmCalloutLeftTitle}
            </h3>
            <ul className="space-y-2.5 text-[0.95rem] leading-relaxed text-[#43565A]">
              {data.fmCalloutLeftItems?.map((item, i) => (
                <Punkt key={i} farge="#C7653A">
                  {item}
                </Punkt>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#B8C9B2] bg-[#D8E0D6] p-7 sm:p-8">
            <h3 className="mb-4 text-xl tracking-tight text-[#2D4233] sm:text-2xl" style={serif}>
              {data.fmCalloutRightTitle}
            </h3>
            <ul className="space-y-2.5 text-[0.95rem] leading-relaxed text-[#2D4233]">
              {data.fmCalloutRightItems?.map((item, i) => (
                <Punkt key={i} farge="#2D4233">
                  {item}
                </Punkt>
              ))}
            </ul>
          </div>
        </SSSynleg>
      </div>
    </section>
  );
}

function SectionKontakt({ data }: { data: Frontpage }) {
  const email = data.kontaktEmail || "post@kommunalsektor.no";

  return (
    <section id="kontakt" className="scroll-mt-20 bg-[#D8E0D6]">
      <div className={`${breidd} flex flex-col gap-10 py-20 md:flex-row md:items-center md:justify-between`}>
        <div className="max-w-[46ch]">
          <h2 className="mb-3 text-3xl tracking-tight text-[#2D4233] sm:text-[2.5rem] sm:leading-[1.15]" style={serif}>
            {data.kontaktHeading}
          </h2>
          <p className="leading-relaxed text-[#18251D]">{data.kontaktSubtitle}</p>
        </div>

        <div className="flex flex-col items-start gap-4">
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-3 rounded-full bg-[#2D4233] px-7 py-4 text-base font-medium text-[#F5F1E8] transition-colors hover:bg-[#3A5240] sm:text-[1.06rem]"
          >
            {email} <Pil />
          </a>
          <div className="text-sm leading-relaxed text-[#43565A]">
            {data.kontaktPeople && <p>{data.kontaktPeople}</p>}
            {(data.kontaktCompany || data.kontaktLocation) && (
              <p>{[data.kontaktCompany, data.kontaktLocation].filter(Boolean).join(", ")}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function Home() {
  const [data, episodes, posts, podcast, omslag] = await Promise.all([
    getFrontpage(),
    getEpisodes(4),
    getLatestPosts(),
    getPodcastSettings(),
    getPodcastCover(),
  ]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#43565A]">
        <p>Innhald ikkje funne. Legg til framsideinnhald i <a href="/studio" className="underline">studio</a>.</p>
      </div>
    );
  }

  // Siste sak står i opninga. Resten går i avisoppsettet under.
  const [siste, ...resten] = posts ?? [];

  return (
    <div className="min-h-screen">
      <Nav />
      <Hero data={data} siste={siste} />
      <SectionArtiklar data={data} posts={resten} />
      <SectionPodkast episodes={episodes} settings={podcast ?? undefined} omslag={omslag} />
      <SectionFramgangsmaate data={data} />
      <SectionKontakt data={data} />
      <Footer />
    </div>
  );
}
