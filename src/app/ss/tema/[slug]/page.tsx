import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { ssPortableText } from "../../ssPortableText";
import SSHandlingsromMerke from "../../SSHandlingsromMerke";
import SSLenke from "../../SSLenke";
import SSTag from "../../SSTag";

type Posisjon = "topp" | "hogre" | "botn" | "venstre";

type Tema = {
  tittel: string;
  posisjon: Posisjon;
  ingress?: string;
  body?: unknown[];
};

type Nabo = { tittel: string; slug: { current: string }; posisjon: Posisjon };

async function hentTema(slug: string): Promise<Tema | null> {
  return client.fetch(
    `*[_type == "ssTema" && slug.current == $slug][0]{ tittel, posisjon, ingress, body }`,
    { slug },
    { next: { revalidate: 60 } },
  );
}

async function hentNaboar(slug: string): Promise<Nabo[]> {
  return client.fetch(
    `*[_type == "ssTema" && slug.current != $slug] | order(rekkjefolgje asc){
      tittel, slug, posisjon
    }`,
    { slug },
    { next: { revalidate: 60 } },
  );
}

export async function generateStaticParams() {
  const slugs: { slug: { current: string } }[] = await client.fetch(
    `*[_type == "ssTema" && defined(slug.current)]{ slug }`,
  );
  return slugs.map((s) => ({ slug: s.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tema = await hentTema(slug);
  if (!tema) return {};
  return {
    title: tema.tittel,
    description: tema.ingress,
    openGraph: {
      title: `${tema.tittel} — Selseng & Systaddal`,
      description: tema.ingress,
      url: `https://selsengsystaddal.no/tema/${slug}`,
    },
  };
}

export default async function SSTemaSide({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tema = await hentTema(slug);
  if (!tema) notFound();
  const naboar = await hentNaboar(slug);

  return (
    <>
      <section className="px-6 sm:px-10 pt-14 sm:pt-20 pb-16 sm:pb-20">
        <div className="max-w-3xl mx-auto">
          <SSTag>Slik jobbar me</SSTag>

          <div className="flex items-start gap-5 mt-8">
            <SSHandlingsromMerke posisjon={tema.posisjon} />
            <h1 className="text-3xl sm:text-[2.6rem] font-medium text-[#2F2B26] tracking-tight leading-[1.12] text-balance">
              {tema.tittel}
            </h1>
          </div>

          {tema.ingress && (
            <p className="text-[#6B6860] text-lg leading-relaxed mt-6 max-w-xl">
              {tema.ingress}
            </p>
          )}

          {tema.body && (
            <div className="space-y-7 text-[#2F2B26] leading-[1.7] text-lg tracking-tight prose-ss mt-12">
              <PortableText
                value={tema.body as never}
                components={ssPortableText}
              />
            </div>
          )}

          <SSLenke
            href="/ss/kontakt"
            className="inline-flex items-center gap-2 mt-14 text-[#F6F1E8] bg-[#A65F3D] rounded-full px-7 py-3 font-medium hover:bg-[#8C4E32] transition-colors"
          >
            Ta ein prat med oss <span aria-hidden>&rarr;</span>
          </SSLenke>
        </div>
      </section>

      {naboar.length > 0 && (
        <section className="px-6 sm:px-10 pb-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-[11px] uppercase tracking-[0.16em] font-medium text-[#A65F3D] mb-5">
              Dei andre delane
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {naboar.map((n) => (
                <SSLenke
                  key={n.slug.current}
                  href={`/ss/tema/${n.slug.current}`}
                  className="group flex flex-col gap-4 rounded-2xl border border-[#E4DBCB] bg-[#FAF8F3] p-5 hover:border-[#CFC5B2] hover:shadow-sm transition-all"
                >
                  <SSHandlingsromMerke posisjon={n.posisjon} />
                  <span className="text-[#2F2B26] font-medium tracking-tight leading-snug">
                    {n.tittel}
                  </span>
                </SSLenke>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
