import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

async function getPosts() {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, summary, tags, publishedAt, image
    }`
  );
}

async function getAllTags() {
  return client.fetch(
    `array::unique(*[_type == "post" && defined(tags)].tags[])`
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const metadata = {
  title: "Artiklar",
  description: "Artiklar, erfaringar og refleksjonar frå arbeidet med å gjere noko anna i kommunane.",
};

export default async function ArtikkelListePage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const [posts, allTags] = await Promise.all([getPosts(), getAllTags()]);

  const filteredPosts = tag
    ? posts.filter((post: any) => post.tags?.includes(tag))
    : posts;

  return (
    <div className="min-h-screen">
      <Nav />

      <div className="mx-auto max-w-[720px] px-6 py-20 sm:py-28">
        <h1
          className="text-3xl sm:text-4xl tracking-tight mb-4 text-[#18251D]"
          style={{ fontFamily: "var(--font-serif), 'Fraunces', serif", fontWeight: 400 }}
        >
          Døme og beskrivingar
        </h1>
        <p className="text-[#43565A] text-base sm:text-lg mb-10 leading-relaxed">
          Artiklar, erfaringar og refleksjonar frå arbeidet med å gjere noko anna i kommunane.
        </p>

        {/* Tag filters */}
        {allTags && allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12">
            <Link
              href="/artiklar"
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                !tag
                  ? "bg-[#2D4233] text-white"
                  : "bg-[#FAF7EF] text-[#43565A] hover:bg-[#E8E2D6] border border-[rgba(28,28,26,0.09)]"
              }`}
            >
              Alle
            </Link>
            {allTags.map((t: string) => (
              <Link
                key={t}
                href={`/artiklar?tag=${encodeURIComponent(t)}`}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  tag === t
                    ? "bg-[#2D4233] text-white"
                    : "bg-[#FAF7EF] text-[#43565A] hover:bg-[#E8E2D6] border border-[rgba(28,28,26,0.09)]"
                }`}
              >
                {capitalize(t)}
              </Link>
            ))}
          </div>
        )}

        {/* Post list */}
        {filteredPosts.length > 0 ? (
          <div className="space-y-6">
            {filteredPosts.map((post: any) => (
              <Link
                key={post._id}
                href={`/artiklar/${post.slug?.current}`}
                className="group block border border-[rgba(28,28,26,0.09)] rounded-xl overflow-hidden bg-[#FAF7EF] hover:shadow-[0_4px_14px_rgba(28,28,26,0.09)] transition-shadow"
              >
                {post.image && (
                  <div className="aspect-[2.2/1] relative bg-[#FAF7EF]">
                    <Image
                      src={urlFor(post.image).width(800).height(360).url()}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6 sm:p-8">
                {post.publishedAt && (
                  <p className="text-xs text-[#6F7A73] mb-2">
                    {new Date(post.publishedAt).toLocaleDateString("nn-NO", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
                <h2 className="text-lg sm:text-xl font-medium text-[#18251D] group-hover:text-[#2D4233] transition-colors">
                  {post.title}
                </h2>
                {post.summary && (
                  <p className="mt-2 text-[#43565A] text-sm sm:text-base leading-relaxed line-clamp-2">
                    {post.summary}
                  </p>
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {post.tags.map((t: string) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-full text-xs bg-[#FAF7EF] text-[#43565A]"
                      >
                        {capitalize(t)}
                      </span>
                    ))}
                  </div>
                )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[#43565A] text-base">
              {tag
                ? `Ingen artiklar med emneord "${tag}" enno.`
                : "Ingen artiklar enno."}
            </p>
            <p className="text-[#6F7A73] text-sm mt-2">
              Legg til artiklar i{" "}
              <Link href="/studio" className="underline text-[#2D4233]">
                Sanity Studio
              </Link>
              .
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
