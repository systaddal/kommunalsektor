import { PortableText } from "next-sanity";
import { client } from "@/sanity/lib/client";

type SSHomepage = {
  tagline: string;
  body: any[];
};

async function getSSHomepage(): Promise<SSHomepage | null> {
  return client.fetch(
    `*[_type == "ssHomepage"][0]`,
    {},
    { next: { revalidate: 60 } },
  );
}

export default async function SSHome() {
  const data = await getSSHomepage();

  if (!data) {
    return (
      <div className="px-6 sm:px-10 py-20 text-center text-[#999]">
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

  return (
    <section id="om" className="px-6 sm:px-10 py-20 sm:py-28">
      <div className="max-w-3xl mx-auto">
        {data.tagline && (
          <div className="mb-10">
            <span className="inline-block text-[14px] text-[#666] border border-[#ccc] rounded-full px-3.5 py-1">
              {data.tagline}
            </span>
          </div>
        )}
        {data.body && (
          <div className="space-y-7 text-[#444] leading-[1.7] text-xl tracking-tight prose-ss">
            <PortableText value={data.body} />
          </div>
        )}
      </div>
    </section>
  );
}
