"use client";

import { useEffect, useState, type ReactNode } from "react";

export default function ModalButton({
  label,
  className,
  panelClassName = "max-w-3xl",
  children,
}: {
  label: string;
  className: string;
  panelClassName?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {label}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={label}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-sm overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full ${panelClassName} my-auto bg-white rounded-2xl shadow-2xl`}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Lukk"
              className="absolute top-3 right-3 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white/90 border border-[#eee] text-[#666] hover:text-[#111] hover:bg-white transition-colors cursor-pointer shadow-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
