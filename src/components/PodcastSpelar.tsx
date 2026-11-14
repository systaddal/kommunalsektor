"use client";

import { useEffect, useRef, useState } from "react";
import type { Episode } from "@/lib/podcast";

const mono = {
  fontFamily: "var(--font-mono), ui-monospace, monospace",
};
const serif = {
  fontFamily: "var(--font-serif), 'Fraunces', serif",
  fontWeight: 400 as const,
};

function klokke(sek: number): string {
  if (!Number.isFinite(sek) || sek < 0) return "0:00";
  const m = Math.floor(sek / 60);
  const s = Math.floor(sek % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function Ikon({ spelar }: { spelar: boolean }) {
  return spelar ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 4.5v15l13-7.5z" />
    </svg>
  );
}

// Siste episode stort, dei neste som rader. Éin felles avspelar: trykkjer du
// på ei rad, byter lyden til den episoden. Lyden blir ikkje henta før nokon
// trykkjer på spel av. Datoane kjem ferdig skrivne frå serveren, fordi ikkje
// alle nettlesarar kan nynorske månadsnamn.
export type EpisodeMedDato = Episode & { datoTekst: string | null };

export default function PodcastSpelar({ episodes }: { episodes: EpisodeMedDato[] }) {
  const lyd = useRef<HTMLAudioElement | null>(null);
  const [aktiv, setAktiv] = useState(0);
  const [spelar, setSpelar] = useState(false);
  const [tid, setTid] = useState(0);
  const [lengd, setLengd] = useState(0);

  useEffect(() => {
    const el = lyd.current;
    if (!el) return;
    const påTid = () => setTid(el.currentTime);
    const påLengd = () => setLengd(el.duration);
    const påSpel = () => setSpelar(true);
    const påPause = () => setSpelar(false);
    el.addEventListener("timeupdate", påTid);
    el.addEventListener("loadedmetadata", påLengd);
    el.addEventListener("play", påSpel);
    el.addEventListener("pause", påPause);
    el.addEventListener("ended", påPause);
    return () => {
      el.removeEventListener("timeupdate", påTid);
      el.removeEventListener("loadedmetadata", påLengd);
      el.removeEventListener("play", påSpel);
      el.removeEventListener("pause", påPause);
      el.removeEventListener("ended", påPause);
    };
  }, []);

  if (episodes.length === 0) return null;

  function trykk(i: number) {
    const el = lyd.current;
    const ep = episodes[i];
    if (!el || !ep?.audioUrl) return;
    if (i === aktiv && el.src) {
      if (el.paused) void el.play();
      else el.pause();
      return;
    }
    setAktiv(i);
    setTid(0);
    setLengd(0);
    el.src = ep.audioUrl;
    void el.play();
  }

  function spol(e: React.ChangeEvent<HTMLInputElement>) {
    const el = lyd.current;
    if (!el || !lengd) return;
    el.currentTime = (Number(e.target.value) / 1000) * lengd;
  }

  const [siste, ...resten] = episodes;
  const sisteAktiv = aktiv === 0;
  const framdrift = sisteAktiv && lengd ? Math.round((tid / lengd) * 1000) : 0;

  return (
    <div className="flex flex-col">
      <audio ref={lyd} preload="none" />

      <div className="rounded-2xl bg-[#18251D] p-6 sm:p-7 mb-3">
        <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#C49A5A]" style={mono}>
          {["Siste episode", siste.episode != null ? `Episode ${siste.episode}` : null, siste.datoTekst]
            .filter(Boolean)
            .join(" · ")}
        </p>
        <h3 className="mt-3 text-2xl sm:text-[1.75rem] leading-snug text-[#F5F1E8]" style={serif}>
          {siste.title}
        </h3>
        <div className="mt-5 flex items-center gap-4">
          <button
            type="button"
            onClick={() => trykk(0)}
            aria-label={sisteAktiv && spelar ? "Set siste episode på pause" : "Spel av siste episode"}
            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#A8542F] text-[#FAF7EF] hover:bg-[#C7653A] transition-colors cursor-pointer"
          >
            <Ikon spelar={sisteAktiv && spelar} />
          </button>
          <input
            type="range"
            min={0}
            max={1000}
            value={framdrift}
            onChange={spol}
            disabled={!sisteAktiv || !lengd}
            aria-label="Spol i siste episode"
            className="ks-spol min-w-0 flex-1"
          />
          <span className="flex-shrink-0 text-xs font-medium tracking-[0.06em] text-[#B8C9B2] tabular-nums" style={mono}>
            {sisteAktiv && lengd ? `${klokke(tid)} / ${klokke(lengd)}` : siste.durationLabel}
          </span>
        </div>
      </div>

      {resten.map((ep, n) => {
        const i = n + 1;
        const denne = aktiv === i;
        return (
          <div key={ep.id} className="flex items-center gap-4 border-t border-[#44594A] py-4">
            <button
              type="button"
              onClick={() => trykk(i)}
              aria-label={`${denne && spelar ? "Set på pause" : "Spel av"}: ${ep.title}`}
              className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border transition-colors cursor-pointer ${
                denne
                  ? "border-[#C49A5A] bg-[#C49A5A] text-[#18251D]"
                  : "border-[#B8C9B2] text-[#F5F1E8] hover:bg-[#3A5240]"
              }`}
            >
              <Ikon spelar={denne && spelar} />
            </button>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#B8C9B2]" style={mono}>
                {[ep.episode != null ? `Episode ${ep.episode}` : null, ep.datoTekst]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              <p className="mt-1 font-medium leading-snug text-[#F5F1E8]">{ep.title}</p>
            </div>
            <span className="flex-shrink-0 text-xs font-medium tracking-[0.06em] text-[#B8C9B2] tabular-nums" style={mono}>
              {denne && lengd ? `${klokke(tid)} / ${klokke(lengd)}` : ep.durationLabel}
            </span>
          </div>
        );
      })}
    </div>
  );
}
