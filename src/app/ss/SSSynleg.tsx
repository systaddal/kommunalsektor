"use client";

import { useEffect, useRef } from "react";

// Let innhaldet gli roleg inn når det kjem til syne.
// Serveren sender alt synleg. Berre det som ligg under skjermkanten når
// sida er lasta, blir gøymt og glir inn seinare. Utan JavaScript, eller
// når lesaren har bede om mindre rørsle, står alt stille og synleg.
export default function SSSynleg({
  children,
  className = "",
  som: Som = "div",
}: {
  children: React.ReactNode;
  className?: string;
  som?: "div" | "section" | "li";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    // Tilstanden står rett på elementet. Då slepp React å teikne opp att,
    // og CSS-en tek seg av resten.
    el.dataset.ssInn = "skjult";
    const io = new IntersectionObserver(
      (treff) => {
        if (treff.some((t) => t.isIntersecting)) {
          el.dataset.ssInn = "synleg";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Som
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      data-ss-inn="open"
      className={`ss-inn ${className}`}
    >
      {children}
    </Som>
  );
}
