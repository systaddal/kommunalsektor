import type { Metadata } from "next";
import Link from "next/link";
import { PortableText } from "next-sanity";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { client } from "@/sanity/lib/client";

export const metadata: Metadata = {
  title: "Om oss",
  description: "Kven vi er, kva vi trur på, og kvifor KommunalSektor finst.",
};

const serif = {
  fontFamily: "var(--font-serif), 'Fraunces', serif",
  fontWeight: 400 as const,
};

type Partner = { name: string; url?: string; text: string };

type AboutPage = {
  heading: string;
  introLeft: any[];
  introRight: any[];
  partnararHeading: string;
  partnarar: Partner[];
  offentlegeHeading: string;
  offentlegePartnarar: Partner[];
};

async function getAboutPage(): Promise<AboutPage> {
  return client.fetch(
    `*[_type == "aboutPage"][0]`,
    {},
    { next: { revalidate: 60 } },
  );
}

export default async function OmPage() {
  const data = await getAboutPage();

  if (!data) {
    return (
      <div className="min-h-screen">
        <Nav />
        <div className="flex items-center justify-center py-32 text-[#43565A]">
          <p>
            Innhald ikkje funne. Legg til «Om oss» i{" "}
            <a href="/studio" className="underline">
              studio
            </a>
            .
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#18251D] mb-8"
          style={serif}
        >
          {data.heading}
        </h1>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 text-[#18251D] leading-[1.75] text-base">
          <div className="space-y-5 prose-kvifor">
            {data.introLeft && <PortableText value={data.introLeft} />}
          </div>
          <div className="space-y-5 prose-kvifor">
            {data.introRight && <PortableText value={data.introRight} />}
          </div>
        </div>
      </section>

      {/* Partnarar */}
      {data.partnarar && data.partnarar.length > 0 && (
        <section className="border-t border-[rgba(28,28,26,0.09)]">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
            <h2
              className="text-2xl sm:text-3xl tracking-tight mb-10 text-[#18251D]"
              style={serif}
            >
              {data.partnararHeading}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {data.partnarar.map((partner) => (
                <div
                  key={partner.name}
                  className="border border-[rgba(28,28,26,0.09)] rounded-xl p-6 bg-[#FAF7EF] flex flex-col"
                >
                  {partner.url ? (
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-semibold text-[#2D4233] hover:underline"
                    >
                      {partner.name} &rarr;
                    </a>
                  ) : (
                    <h3 className="text-base font-semibold text-[#18251D]">
                      {partner.name}
                    </h3>
                  )}
                  <p className="mt-3 text-[#43565A] text-sm leading-relaxed flex-1">
                    {partner.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Offentlege hjelparar */}
      {data.offentlegePartnarar && data.offentlegePartnarar.length > 0 && (
        <section className="border-t border-[rgba(28,28,26,0.09)]">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
            <h2
              className="text-2xl sm:text-3xl tracking-tight mb-10 text-[#18251D]"
              style={serif}
            >
              {data.offentlegeHeading}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {data.offentlegePartnarar.map((partner) => (
                <div
                  key={partner.name}
                  className="border border-[rgba(28,28,26,0.09)] rounded-xl p-6 bg-[#FAF7EF] flex flex-col"
                >
                  <h3 className="text-base font-semibold text-[#18251D]">
                    {partner.name}
                  </h3>
                  <p className="mt-3 text-[#43565A] text-sm leading-relaxed flex-1">
                    {partner.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
