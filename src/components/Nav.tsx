"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const items = [
  { href: "/", label: "Hjem", section: null },
  { href: "/#podkast", label: "Podcast", section: "podkast" },
  { href: "/artiklar", label: "Artiklar", section: null },
  { href: "/om", label: "Om oss", section: null },
  { href: "/#kontakt", label: "Kontakt", section: "kontakt" },
];

const sectionIds = ["podkast", "kontakt"];

export default function Nav() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  function isActive(item: (typeof items)[number]) {
    // On subpages, highlight the page link
    if (pathname !== "/") {
      if (item.href.startsWith("/#")) return false;
      if (item.href === "/") return false;
      return pathname.startsWith(item.href);
    }

    // On home page with a visible section
    if (activeSection) {
      if (item.section) {
        if (item.section === "podkast") return activeSection === "podkast";
        if (item.section === "kontakt") return activeSection === "kontakt";
      }
      return false;
    }

    // Default: Hjem is active on home page when at top
    return item.href === "/";
  }

  return (
    <header className="sticky top-0 z-50 flex justify-center pt-4 pb-2 pointer-events-none">
      <nav className="pointer-events-auto hidden md:inline-flex items-center gap-1 bg-white/80 backdrop-blur-md border border-[rgba(28,28,26,0.08)] rounded-full px-1.5 py-1.5 shadow-sm">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-5 py-2 rounded-full text-sm transition-all ${
              isActive(item)
                ? "bg-[#E8E2D6] text-[#1C1C1A] font-medium"
                : "text-[#3a3a38] hover:bg-[#E8E2D6] hover:text-[#1C1C1A]"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
