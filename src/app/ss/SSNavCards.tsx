"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSSHref } from "./useSSHref";

type NavCard = {
  path: string;
  title: string;
  desc: string;
  // Eitt bilde = fyller ramma. To = side om side (mellombels til fellesbiletet kjem).
  images?: string[];
};

const allPages: NavCard[] = [
  {
    path: "/ss",
    title: "Heim",
    desc: "Kvar kjem me frå og kvifor er me her",
  },
  {
    path: "/ss/folk",
    title: "Folka",
    desc: "Å vere, heller enn å framstå",
    images: ["/ss/helle.jpg", "/ss/joakim.jpg"],
  },
];

export default function SSNavCards() {
  const pathname = usePathname();
  const ssHref = useSSHref();
  const normalizedPathname = pathname.startsWith("/ss") ? pathname : `/ss${pathname === "/" ? "" : pathname}`;
  const cards = allPages.filter((p) => p.path !== normalizedPathname);

  return (
    <section className="px-6 sm:px-10 pt-10 pb-4">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4">
        {cards.map((card) => (
          <Link
            key={card.path}
            href={ssHref(card.path)}
            className="flex-1 flex flex-col rounded-2xl border border-[#eee] bg-[#fafafa] p-6 min-h-[140px] group hover:border-[#ddd] hover:shadow-sm transition-all"
          >
            <h2 className="text-[#111] font-medium text-lg tracking-tight">
              {card.title}
            </h2>

            {card.images && (
              <div className="relative aspect-[2/1] rounded-xl overflow-hidden bg-[#eee] mt-4 flex gap-px">
                {card.images.map((src) => (
                  <div key={src} className="relative flex-1">
                    <Image
                      src={src}
                      alt={card.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            <p className="text-[#999] text-sm leading-relaxed mt-auto pt-8">
              {card.desc}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
