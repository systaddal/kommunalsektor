"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSSHref } from "./useSSHref";

const allPages = [
  {
    path: "/ss",
    title: "Heim",
    desc: "Kvar kjem me frå og kvifor er me her",
  },
  {
    path: "/ss/folk",
    title: "Folka",
    desc: "Å vere, heller enn å framstå",
  },
];

export default function SSNavCards() {
  const pathname = usePathname();
  const ssHref = useSSHref();
  const normalizedPathname = pathname.startsWith("/ss") ? pathname : `/ss${pathname === "/" ? "" : pathname}`;
  const cards = allPages.filter((p) => p.path !== normalizedPathname);

  return (
    <section className="px-6 sm:px-10 pt-10 pb-4">
      <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.path}
            href={ssHref(card.path)}
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
