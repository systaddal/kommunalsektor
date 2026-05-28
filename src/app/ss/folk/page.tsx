import type { Metadata } from "next";
import { PortableText } from "next-sanity";
import { client } from "@/sanity/lib/client";

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
  bio: any[];
};

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
            <span className="inline-block text-[14px] text-[#666] border border-[#ccc] rounded-full px-3.5 py-1">
              {data.tagline}
            </span>
          </div>
        )}
        {data.intro && (
          <div className="space-y-7 text-[#444] leading-[1.7] text-xl tracking-tight prose-ss">
            <PortableText value={data.intro} />
          </div>
        )}

        {data.people && data.people.length > 0 && (
          <div className="mt-16 space-y-12">
            {data.people.map((person) => (
              <div key={person.name}>
                <h2 className="text-lg font-medium text-[#111] mb-4 tracking-tight">
                  {person.name}
                </h2>
                {person.bio && (
                  <div className="space-y-5 text-[#444] leading-[1.7] text-xl tracking-tight prose-ss">
                    <PortableText value={person.bio} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
