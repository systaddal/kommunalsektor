"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useSSHref } from "./useSSHref";
import { SAMTYKKE_ENDRA } from "./SSSamtykkeVal";

const KEY = "ss-consent";
type Consent = "granted" | "denied";

export default function SSConsent() {
  // "loading" til localStorage er lese — hindrar banner-flash og hydration-mismatch
  const [consent, setConsent] = useState<Consent | null | "loading">("loading");

  const ssHref = useSSHref();

  useEffect(() => {
    const les = () => {
      const stored = localStorage.getItem(KEY);
      setConsent(stored === "granted" ? "granted" : stored === "denied" ? "denied" : null);
    };
    les();
    // Valet kan endrast på personvernsida.
    window.addEventListener(SAMTYKKE_ENDRA, les);
    return () => window.removeEventListener(SAMTYKKE_ENDRA, les);
  }, []);

  function decide(value: Consent) {
    localStorage.setItem(KEY, value);
    setConsent(value);
  }

  return (
    <>
      {/* HubSpot tracking — lastast berre etter samtykke */}
      {consent === "granted" && (
        <Script
          id="hs-script-loader"
          strategy="afterInteractive"
          src="https://js-eu1.hs-scripts.com/147587677.js"
        />
      )}

      {consent === null && (
        <div className="fixed inset-x-4 bottom-4 z-[90] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-sm rounded-2xl bg-[#FAF8F3] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
          <p className="text-sm text-[#2F2B26] leading-relaxed mb-4">
            Me vil gjerne bruke HubSpot for å forstå korleis sida blir brukt.
            HubSpot set informasjonskapslar i nettlesaren din. Er det greitt?{" "}
            <a
              href={ssHref("/ss/personvern")}
              className="underline underline-offset-4 decoration-[#A65F3D]"
            >
              Les meir
            </a>
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => decide("granted")}
              className="text-sm text-[#F6F1E8] bg-[#314D3C] rounded-full px-5 py-2 hover:bg-[#28402F] transition-colors cursor-pointer"
            >
              Godta
            </button>
            <button
              type="button"
              onClick={() => decide("denied")}
              className="text-sm text-[#6B6860] rounded-full px-4 py-2 hover:text-[#2F2B26] transition-colors cursor-pointer"
            >
              Berre nødvendige
            </button>
          </div>
        </div>
      )}
    </>
  );
}
