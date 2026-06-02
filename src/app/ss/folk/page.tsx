import type { Metadata } from "next";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ssPortableText } from "../ssPortableText";
import SSTag from "../SSTag";

export const metadata: Metadata = {
  title: "Helle & Joakim",
  description:
    "Endring, leiing og samfunnsutvikling. Møt folka bak Selseng & Systaddal.",
  openGraph: {
    title: "Helle & Joakim — Selseng & Systaddal",
    description:
      "Endring, leiing og samfunnsutvikling. Møt folka bak Selseng & Systaddal.",
    url: "https://selsengsystaddal.no/folk",
  },
};

type Person = {
  name: string;
  image?: any;
  bio: any[];
};

// Statiske portrett til folk som ikkje (enno) har bilde i Sanity
const STATIC_PORTRAITS: Record<string, string> = {
  helle: "/ss/helle.jpg",
  joakim: "/ss/joakim.jpg",
};

function portraitFor(person: Person): string | null {
  if (person.image) return urlFor(person.image).width(1400).height(933).url();
  const name = person.name?.toLowerCase() ?? "";
  for (const [key, src] of Object.entries(STATIC_PORTRAITS)) {
    if (name.includes(key)) return src;
  }
  return null;
}

type SSFolkPage = {
  tagline: string;
  intro: any[];
  people: Person[];
};

async function getSSFolkPage(): Promise<SSFolkPage | null> {
  return client.fetch(
    `*[_type == "ssFolkPage"][0]`,
    {},
    { next: { revalidate: 60 } },
  );
}

export default async function FolkPage() {
  const data = await getSSFolkPage();

  if (!data) {
    return (
      <div className="px-6 sm:px-10 py-20 text-center text-[#999]">
        <p>
          Innhald ikkje funne. Legg til folk-innhald i{" "}
          <a href="/studio" className="underline">
            studio
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <article className="px-6 sm:px-10 pt-20 pb-20 sm:pt-28 sm:pb-28">
      <div className="max-w-3xl mx-auto">
        {data.tagline && (
          <div className="mb-10">
            <SSTag>{data.tagline}</SSTag>
          </div>
        )}
        {data.intro && (
          <div className="space-y-7 text-[#444] leading-[1.7] text-lg tracking-tight prose-ss">
            <PortableText value={data.intro} components={ssPortableText} />
          </div>
        )}

        {data.people && data.people.length > 0 && (
          <div className="mt-16 space-y-16">
            {data.people.map((person) => {
              const portrait = portraitFor(person);
              return (
                <div key={person.name}>
                  {portrait && (
                    <div className="relative aspect-[3/2] rounded-2xl overflow-hidden bg-[#f0f0f0] mb-6">
                      <Image
                        src={portrait}
                        alt={person.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 768px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h2 className="text-lg font-medium text-[#111] mb-4 tracking-tight">
                    {person.name}
                  </h2>
                  {person.bio && (
                    <div className="space-y-5 text-[#444] leading-[1.7] text-lg tracking-tight prose-ss">
                      <PortableText value={person.bio} components={ssPortableText} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}
