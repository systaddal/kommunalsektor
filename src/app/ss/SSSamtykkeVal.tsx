"use client";

import { useEffect, useState } from "react";

const KEY = "ss-consent";
export const SAMTYKKE_ENDRA = "ss-consent-endra";

// Informasjonskapslane HubSpot set. Blir sletta når samtykket blir trekt tilbake.
const HUBSPOT_KAPSLAR = ["__hstc", "hubspotutk", "__hssc", "__hssrc"];

function slettHubSpotKapslar() {
  const host = window.location.hostname;
  const domene = ["", host, "." + host.replace(/^www\./, "")];
  for (const namn of HUBSPOT_KAPSLAR) {
    for (const d of domene) {
      document.cookie =
        `${namn}=; Max-Age=0; path=/` + (d ? `; domain=${d}` : "");
    }
  }
}

export default function SSSamtykkeVal() {
  const [val, setVal] = useState<string | null | "loading">("loading");

  useEffect(() => {
    const les = () => setVal(localStorage.getItem(KEY));
    les();
    window.addEventListener(SAMTYKKE_ENDRA, les);
    return () => window.removeEventListener(SAMTYKKE_ENDRA, les);
  }, []);

  function vel(nytt: "granted" | "denied") {
    const forre = localStorage.getItem(KEY);
    localStorage.setItem(KEY, nytt);
    setVal(nytt);
    window.dispatchEvent(new Event(SAMTYKKE_ENDRA));
    if (nytt === "denied") {
      slettHubSpotKapslar();
      // HubSpot-skriptet kan vere lasta alt. Ny sidelasting stoppar det.
      if (forre === "granted") window.location.reload();
    }
  }

  if (val === "loading") return null;

  const status =
    val === "granted"
      ? "Du har sagt ja til HubSpot."
      : val === "denied"
        ? "Du har sagt nei til HubSpot."
        : "Du har ikkje valt enno.";

  return (
    <div className="rounded-2xl border border-[#E4DBCB] bg-[#FAF8F3] p-5">
      <p className="text-[15px] mb-4">{status} Du kan endre valet her.</p>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => vel("granted")}
          className="text-sm text-[#F6F1E8] bg-[#314D3C] rounded-full px-5 py-2 hover:bg-[#28402F] transition-colors cursor-pointer"
        >
          Godta HubSpot
        </button>
        <button
          type="button"
          onClick={() => vel("denied")}
          className="text-sm text-[#2F2B26] border border-[#CFC5B2] rounded-full px-5 py-2 hover:bg-[#ECE4D6] transition-colors cursor-pointer"
        >
          Berre nødvendige
        </button>
      </div>
    </div>
  );
}
