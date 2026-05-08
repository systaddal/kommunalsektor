"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const allPages = [
  {
    href: "/ss",
    title: "Heim",
    desc: "Kvar kjem me frå og kvifor er me her",
  },
  {
    href: "/ss/tilnaerming",
    title: "Korleis",
    desc: "Forstå folk og forstå system",
  },
  {
    href: "/ss/arbeid",
    title: "Kva",
    desc: "To parallelle spor: forankring og handling",
  },
  {
    href: "/ss/folk",
    title: "Folka",
    desc: "Å vere, heller enn å framstå",
  },
];

export default function SSNavCards() {
  const pathname = usePathname();
  const cards = allPages.filter((p) => p.href !== pathname);

  return (
    <section className="px-6 sm:px-10 pt-10 pb-4">
      <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="flex flex-col justify-between rounded-2xl border border-[#eee] bg-[#fafafa] p-6 min-h-[140px] group hover:border-[#ddd] hover:shadow-sm transition-all"
          >
            <h2 className="text-[#111] font-medium text-lg tracking-tight">
              {card.title}
            </h2>
            <p className="text-[#999] text-sm leading-relaxed mt-auto pt-8">
              {card.desc}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
