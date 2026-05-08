"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSSHref } from "./useSSHref";

const links = [
  { path: "/ss", label: "Heim" },
  { path: "/ss/tilnaerming", label: "Korleis" },
  { path: "/ss/arbeid", label: "Kva" },
  { path: "/ss/folk", label: "Folka" },
];

export default function SSNav() {
  const rawPathname = usePathname();
  const ssHref = useSSHref();
  const pathname = rawPathname.startsWith("/ss") ? rawPathname : `/ss${rawPathname === "/" ? "" : rawPathname}`;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [rawPathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="px-6 sm:px-10 py-6 relative z-50">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href={ssHref("/ss")}
            className="text-sm font-medium tracking-tight text-[#111] hover:text-[#444] transition-colors"
          >
            Selseng & Systaddal
          </Link>

          <nav className="hidden sm:flex items-center gap-1">
            {links.filter((l) => l.path !== "/ss").map((link) => (
              <Link
                key={link.path}
                href={ssHref(link.path)}
                className={`text-sm px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                  pathname === link.path
                    ? "bg-[#f0f0f0] text-[#111]"
                    : "text-[#666] hover:bg-[#f5f5f5] hover:text-[#111]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="mailto:hei@selsengsystaddal.no"
              className="text-sm text-white bg-[#111] rounded-full px-5 py-1.5 ml-3 hover:bg-[#333] transition-colors cursor-pointer"
            >
              Kontakt oss
            </a>
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden flex flex-col justify-center gap-1.5 w-8 h-8 cursor-pointer"
            aria-label={open ? "Lukk meny" : "Opne meny"}
          >
            <span className={`block h-[1.5px] w-5 bg-[#111] transition-all origin-center ${open ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`block h-[1.5px] w-5 bg-[#111] transition-all origin-center ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 bg-white pt-20 px-8 sm:hidden">
          <nav className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.path}
                href={ssHref(link.path)}
                className={`text-2xl font-medium tracking-tight py-2 transition-colors ${
                  pathname === link.path ? "text-[#111]" : "text-[#999] hover:text-[#111]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="mailto:hei@selsengsystaddal.no"
              className="inline-flex items-center gap-2 text-sm text-white bg-[#111] rounded-full px-5 py-2.5 mt-6 w-fit hover:bg-[#333] transition-colors"
            >
              Kontakt oss <span>&rarr;</span>
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
