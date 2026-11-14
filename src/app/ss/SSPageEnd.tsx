"use client";

import { usePathname } from "next/navigation";
import SSNavCards from "./SSNavCards";
import SSFooter from "./SSFooter";

// Nav-kort og footer-CTA er overflødige på kontaktsida — den er sjølv målet.
// Framsida har Folka som eigen bolk, så korta blir dobbelt opp der.
export default function SSPageEnd() {
  const rawPathname = usePathname();
  const pathname = rawPathname.startsWith("/ss")
    ? rawPathname
    : `/ss${rawPathname === "/" ? "" : rawPathname}`;

  if (pathname === "/ss/kontakt") return null;

  const utanNavKort = pathname === "/ss";

  return (
    <>
      {!utanNavKort && <SSNavCards />}
      <SSFooter brei={pathname === "/ss"} />
    </>
  );
}
