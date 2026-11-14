"use client";

import { useState } from "react";

// Omslaget ligg hos Riverside. Svarar det ikkje, fell biletet bort.
// Omslaget er det grøne skjoldet på gjennomsiktig botn, så det treng ei lys
// flate bak seg for å synast på den grøne podkastflata.
export default function PodcastOmslag({ src }: { src: string }) {
  const [feila, setFeila] = useState(false);
  if (feila) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Omslaget til podcasten Samfunnsoppdraget"
      width={168}
      height={168}
      loading="lazy"
      decoding="async"
      onError={() => setFeila(true)}
      className="h-[168px] w-[168px] rounded-2xl bg-[#F5F1E8] object-contain p-7"
    />
  );
}
