import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import StepTabs from "@/components/StepTabs";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import PodcastSection from "@/components/PodcastSection";
import { getEpisodes } from "@/lib/podcast";

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
    `*[_type == "post"] | order(publishedAt desc)[0...3]{
      _id, title, slug, summary, publishedAt, image
    }`,
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

function Hero({ data }: { data: Frontpage }) {
  return (
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
            Frå prat til handling
          </span>
        </div>

        <div className="flex justify-center mb-8">
          <svg width={60} height={76} viewBox="0 0 135 171" fill="currentColor" className="text-[#2D4233]">
            <path d="M135 0V62.6113C135 118.177 74.445 166.696 67.5 171C60.555 166.696 0.000299323 118.177 0 62.6113V0H135Z" />
          </svg>
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight text-[#2D4233]"
          style={serif}
        >
          {data.heroHeading}
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-[#43565A] max-w-xl mx-auto leading-relaxed">
          {data.heroSubtitle}
        </p>

        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link
            href="#artiklar"
            className="inline-flex items-center gap-2 bg-[#C7653A] text-[#FAF7EF] px-6 py-3 rounded-full text-sm font-medium hover:bg-[#A8542F] transition-colors"
          >
            Les meir
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          <Link
            href="#kontakt"
            className="border border-[#2D4233] px-6 py-3 rounded-full text-sm font-medium text-[#2D4233] hover:bg-[#D8E0D6] transition-colors"
          >
            Ta kontakt
          </Link>
        </div>

        <div className="mt-14 border-t border-[#D8D2C4] pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto text-left">
          <Link
            href="/artiklar"
            className="group flex items-start justify-between gap-3 rounded-xl border border-[rgba(28,28,26,0.12)] bg-[#FAF7EF] px-5 py-4 hover:border-[#2D4233] transition-colors"
          >
            <span>
              <span className="block text-sm font-medium text-[#18251D]">Siste saker</span>
              <span className="block mt-0.5 text-xs text-[#43565A]">Erfaringar frå praksis</span>
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C7653A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 flex-shrink-0">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          <Link
            href="/#podkast"
            className="group flex items-start justify-between gap-3 rounded-xl border border-[rgba(28,28,26,0.12)] bg-[#FAF7EF] px-5 py-4 hover:border-[#2D4233] transition-colors"
          >
            <span>
              <span className="block text-sm font-medium text-[#18251D]">Samfunnsoppdraget</span>
              <span className="block mt-0.5 text-xs text-[#43565A]">Podcast frå KommunalSektor</span>
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C7653A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 flex-shrink-0">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function SectionArtiklar({ data, posts }: { data: Frontpage; posts: Post[] }) {
  return (
    <section id="artiklar" className="border-t border-[rgba(28,28,26,0.09)]">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="max-w-[720px]">
            <h2
              className="text-3xl sm:text-4xl tracking-tight mb-4 text-[#18251D]"
              style={serif}
            >
              {data.domeHeading || "Siste artiklar"}
            </h2>
            {data.domeSubtitle && (
              <p className="text-[#43565A] text-base sm:text-lg leading-relaxed">
                {data.domeSubtitle}
              </p>
            )}
          </div>
          <Link
            href="/artiklar"
            className="bg-[#2D4233] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#3A5240] transition-colors flex-shrink-0 self-start sm:self-auto"
          >
            Sjå alle artiklar
          </Link>
        </div>

        {posts && posts.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/artiklar/${post.slug?.current ?? ""}`}
                className="group block border border-[rgba(28,28,26,0.09)] rounded-xl overflow-hidden bg-[#FAF7EF] hover:shadow-[0_4px_14px_rgba(28,28,26,0.09)] transition-shadow"
              >
                {post.image ? (
                  <div className="aspect-[16/10] relative bg-[#FAF7EF]">
                    <Image
                      src={urlFor(post.image).width(640).height(400).url()}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ) : null}
                <div className="p-5">
                  {formatDate(post.publishedAt) && (
                    <p className="text-xs text-[#6F7A73] mb-2">
                      {formatDate(post.publishedAt)}
                    </p>
                  )}
                  <h3 className="text-base sm:text-lg font-medium text-[#18251D] group-hover:text-[#2D4233] transition-colors">
                    {post.title}
                  </h3>
                  {post.summary && (
                    <p className="mt-2 text-[#43565A] text-sm leading-relaxed line-clamp-2">
                      {post.summary}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-[rgba(28,28,26,0.14)] rounded-xl p-10 text-center">
            <p className="text-[#43565A] text-base">
              Ingen artiklar publiserte enno.
            </p>
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
          <h2 className="text-3xl sm:text-4xl tracking-tight mb-6 text-[#18251D]" style={serif}>
            {data.fmHeading}
          </h2>
          <p className="text-[#43565A] text-base leading-relaxed">
            {data.fmSubtitle}
          </p>
        </div>

        {data.fmSteps && <StepTabs steps={data.fmSteps} />}

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="border border-[rgba(28,28,26,0.14)] rounded-xl p-6 bg-[#FAF7EF]">
            <h4 className="text-lg tracking-tight text-[#18251D] mb-4" style={serif}>
              {data.fmCalloutLeftTitle}
            </h4>
            <ul className="space-y-2">
              {data.fmCalloutLeftItems?.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-[#43565A] text-sm leading-relaxed"
                >
                  <span className="flex-shrink-0 w-1 h-1 rounded-full bg-[#43565A] mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-[#B8C9B2] rounded-xl p-6 bg-[#D8E0D6]">
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

function SectionKontakt({ data }: { data: Frontpage }) {
  const email = data.kontaktEmail || "post@kommunalsektor.no";

  return (
    <section id="kontakt" className="border-t border-[rgba(28,28,26,0.09)]">
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28 text-center">
        <h2 className="text-3xl sm:text-4xl tracking-tight text-[#18251D] mb-4" style={serif}>
          {data.kontaktHeading}
        </h2>
        <p className="text-[#43565A] leading-relaxed text-base mb-10 max-w-lg mx-auto">
          {data.kontaktSubtitle}
        </p>

        <a
          href={`mailto:${email}`}
          className="inline-flex items-center gap-3 bg-[#FAF7EF] border border-[rgba(28,28,26,0.14)] rounded-2xl px-8 py-5 hover:border-[#B8C9B2] hover:bg-[#FAF7EF] transition-all group"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#2D4233] flex-shrink-0">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <span className="text-lg font-medium text-[#18251D] group-hover:text-[#2D4233] transition-colors">
            {email}
          </span>
        </a>

        <div className="mt-10 text-sm text-[#43565A] space-y-0.5">
          {data.kontaktCompany && <p className="font-medium text-[#18251D]">{data.kontaktCompany}</p>}
          {data.kontaktPeople && <p>{data.kontaktPeople}</p>}
          {data.kontaktLocation && <p className="pt-1">{data.kontaktLocation}</p>}
        </div>
      </div>
    </section>
  );
}

export default async function Home() {
  const [data, episodes, posts] = await Promise.all([
    getFrontpage(),
    getEpisodes(8),
    getLatestPosts(),
  ]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#43565A]">
        <p>Innhald ikkje funne. Legg til framsideinnhald i <a href="/studio" className="underline">studio</a>.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Nav />
      <Hero data={data} />
      <PodcastSection episodes={episodes} />
      <SectionArtiklar data={data} posts={posts} />
      <SectionFramgangsmaate data={data} />
      <SectionKontakt data={data} />
      <Footer />
    </div>
  );
}