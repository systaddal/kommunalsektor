import { hentSubstack, norskDato } from "@/lib/substack";
import SSArtikkelbilete from "./SSArtikkelbilete";
import SSSynleg from "./SSSynleg";

type Props = {
  tittel?: string;
  ingress?: string;
  url?: string;
  lenketekst?: string;
  tal?: number;
};

export default async function SSSubstack({
  tittel,
  ingress,
  url,
  lenketekst,
  tal,
}: Props) {
  const innlegg = await hentSubstack(url, tal ?? 3);
  if (!url || innlegg.length === 0) return null;

  return (
    <section className="px-6 sm:px-10 py-20 sm:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div className="max-w-2xl">
            {tittel && (
              <h2 className="ss-h2">{tittel}</h2>
            )}
            {ingress && (
              <p className="text-[#6B6860] leading-relaxed mt-3">{ingress}</p>
            )}
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#A65F3D] font-medium hover:text-[#8C4E32] transition-colors"
          >
            {lenketekst ?? "Les alt på Substack"}{" "}
            <span aria-hidden>&rarr;</span>
          </a>
        </div>

        <SSSynleg className="grid gap-x-6 gap-y-10 mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {innlegg.map((post) => (
            <a
              key={post.lenke}
              href={post.lenke}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col"
            >
              {post.bilete && <SSArtikkelbilete src={post.bilete} />}
              {norskDato(post.dato) && (
                <span className="text-[13px] text-[#6B6258] mb-2">
                  {norskDato(post.dato)}
                </span>
              )}
              <h3 className="font-[family-name:var(--font-serif-ss)] text-[#2F2B26] font-semibold leading-snug tracking-tight text-[1.35rem] group-hover:text-[#A65F3D] transition-colors">
                {post.tittel}
              </h3>
              {post.samandrag && (
                <p className="text-[#6B6860] text-[15px] leading-relaxed mt-2">
                  {post.samandrag}
                </p>
              )}
            </a>
          ))}
        </SSSynleg>
      </div>
    </section>
  );
}
