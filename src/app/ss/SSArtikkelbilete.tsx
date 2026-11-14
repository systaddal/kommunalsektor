"use client";

import { useState } from "react";

// Forsidebiletet til eit Substack-innlegg. Biletet ligg hos Substack, så me
// styrer ikkje om det svarar. Feilar det, fell ruta bort og kortet står att
// med dato, tittel og samandrag.
export default function SSArtikkelbilete({ src }: { src: string }) {
  const [feila, setFeila] = useState(false);
  if (feila) return null;

  return (
    <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-[#DDD1BE] mb-4">
      {/* Bileta kjem ferdig skalerte frå Substack. Difor vanleg img. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        onError={() => setFeila(true)}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    </div>
  );
}
