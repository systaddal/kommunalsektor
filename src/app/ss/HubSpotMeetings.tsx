"use client";

import { useEffect, useRef } from "react";

const SCRIPT_SRC =
  "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";

export default function HubSpotMeetings({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.type = "text/javascript";
    document.body.appendChild(script);

    const container = containerRef.current;
    return () => {
      script.remove();
      // Rydd vekk iframe-en HubSpot injiserer, slik at dev-remount ikkje stablar fleire
      if (container) container.innerHTML = "";
    };
  }, []);

  return (
    <div ref={containerRef} className="meetings-iframe-container" data-src={src} />
  );
}
