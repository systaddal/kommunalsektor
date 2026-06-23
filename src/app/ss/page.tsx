import { PortableText } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { ssPortableText } from "./ssPortableText";
import SSTag from "./SSTag";
import SSAnimatedHeadline from "./SSAnimatedHeadline";

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

// Tag-pillen er sidetittelen, så ein leiande h1 med same tekst er overflødig
function withoutDuplicateTitle(body: any[], tagline?: string): any[] {
  if (!Array.isArray(body) || body.length === 0 || !tagline) return body;
  const first = body[0];
  const firstText: string = (first?.children ?? [])
    .map((c: any) => c?.text ?? "")
    .join("");
  const isDuplicateTitle =
    first?._type === "block" &&
    first?.style === "h1" &&
    firstText.trim().toLowerCase() === tagline.trim().toLowerCase();
  return isDuplicateTitle ? body.slice(1) : body;
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
        <div className="mb-12 sm:mb-16">
          <SSAnimatedHeadline />
        </div>
        {data.tagline && (
          <div className="mb-10">
            <SSTag>{data.tagline}</SSTag>
          </div>
        )}
        {data.body && (
          <div className="space-y-7 text-[#444] leading-[1.7] text-lg tracking-tight prose-ss">
            <PortableText
              value={withoutDuplicateTitle(data.body, data.tagline)}
              components={ssPortableText}
            />
          </div>
        )}
      </div>
    </section>
  );
}
