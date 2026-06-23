"use client";

import { useEffect, useState } from "react";

const WORDS = ["folk", "system"] as const;
const MIDDLE = "skapar";
const INTERVAL_MS = 5000;

export default function SSAnimatedHeadline() {
  const [swapped, setSwapped] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = setInterval(() => setSwapped((s) => !s), INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const leftText = swapped ? WORDS[1] : WORDS[0];
  const rightText = swapped ? WORDS[0] : WORDS[1];

  return (
    <h1 className="ssh">
      <Word key={`left-${swapped}`} text={leftText} dir={1} />
      <span className="ssh__mid">{MIDDLE}</span>
      <Word key={`right-${swapped}`} text={rightText} dir={-1} />
    </h1>
  );
}

function Word({ text, dir }: { text: string; dir: 1 | -1 }) {
  return (
    <span className="ssh__word">
      {Array.from(text).map((ch, i) => {
        const dx = dir * (0.6 + (i % 3) * 0.3);
        const rot = (i % 2 === 0 ? 1 : -1) * (6 + (i % 3) * 5);
        return (
          <span
            key={i}
            className="ssh__letter"
            style={
              {
                animationDelay: `${i * 55}ms`,
                "--dx": `${dx}em`,
                "--rot": `${rot}deg`,
              } as React.CSSProperties
            }
          >
            {ch}
          </span>
        );
      })}
    </span>
  );
}
