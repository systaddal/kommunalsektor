"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const KEY = "ss-consent";
type Consent = "granted" | "denied";

export default function SSConsent() {
  // "loading" til localStorage er lese — hindrar banner-flash og hydration-mismatch
  const [consent, setConsent] = useState<Consent | null | "loading">("loading");

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    setConsent(stored === "granted" ? "granted" : stored === "denied" ? "denied" : null);
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
        <div className="fixed inset-x-4 bottom-4 z-[90] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-sm rounded-2xl bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
          <p className="text-sm text-[#444] leading-relaxed mb-4">
            Me brukar informasjonskapslar for å forstå korleis sida blir brukt. Er
            det greitt?
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => decide("granted")}
              className="text-sm text-white bg-[#111] rounded-full px-5 py-2 hover:bg-[#333] transition-colors cursor-pointer"
            >
              Godta
            </button>
            <button
              type="button"
              onClick={() => decide("denied")}
              className="text-sm text-[#666] rounded-full px-4 py-2 hover:text-[#111] transition-colors cursor-pointer"
            >
              Berre nødvendige
            </button>
          </div>
        </div>
      )}
    </>
  );
}
