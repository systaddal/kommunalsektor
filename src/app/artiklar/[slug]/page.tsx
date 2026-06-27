import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";

const serif = {
  fontFamily: "var(--font-serif), 'Fraunces', serif",
  fontWeight: 400 as const,
};

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

async function getPost(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, summary, body, tags, publishedAt, image
    }`,
    { slug }
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const ogImage = post.image
    ? urlFor(post.image).width(1200).height(630).url()
    : undefined;

  return {
    title: post.title,
    description: post.summary ?? undefined,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary ?? undefined,
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
      ...(post.publishedAt && { publishedTime: post.publishedAt }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary ?? undefined,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function ArtikkelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <div className="min-h-screen">
      <Nav />

      {/* Hero image */}
      {post.image && (
        <div className="mx-auto max-w-5xl px-6 mt-4">
          <div className="aspect-[2.4/1] relative rounded-2xl overflow-hidden bg-[#FAF7EF]">
            <Image
              src={urlFor(post.image).width(1200).height(500).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      <article className="mx-auto max-w-[720px] px-6 py-12 sm:py-16">
        {/* Back link */}
        <Link
          href="/artiklar"
          className="text-sm text-[#43565A] hover:text-[#18251D] transition-colors inline-flex items-center gap-1.5 mb-8"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10 3L5 8L10 13" />
          </svg>
          Alle artiklar
        </Link>

        {/* Date and tags */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {post.publishedAt && (
            <p className="text-sm text-[#6F7A73]">
              {new Date(post.publishedAt).toLocaleDateString("nn-NO", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((t: string) => (
                <Link
                  key={t}
                  href={`/artiklar?tag=${encodeURIComponent(t)}`}
                  className="px-2 py-0.5 rounded-full text-xs bg-[#D8E0D6] text-[#2D4233] hover:bg-[#B8C9B2] transition-colors"
                >
                  {capitalize(t)}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Title */}
        <h1
          className="text-3xl sm:text-4xl tracking-tight mb-6 text-[#18251D] leading-tight"
          style={serif}
        >
          {post.title}
        </h1>

        {/* Summary */}
        {post.summary && (
          <p className="text-lg text-[#43565A] leading-relaxed mb-10 border-l-2 border-[#B8C9B2] pl-5">
            {post.summary}
          </p>
        )}

        {/* Body */}
        {post.body && (
          <div className="prose prose-gray max-w-none text-[#18251D] leading-[1.75]">
            <PortableText value={post.body} />
          </div>
        )}
      </article>

      <Footer />
    </div>
  );
}
