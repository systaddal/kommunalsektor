import type { ReactNode } from "react";

// Liten «chip» øvst på SS-sidene — kvit med mjuk skugge så han løftar seg frå sida.
export default function SSTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block text-[14px] text-[#333] bg-white rounded-full px-4 py-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.05]">
      {children}
    </span>
  );
}
