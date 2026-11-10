"use client";

import ModalButton from "./ModalButton";
import HubSpotMeetings from "./HubSpotMeetings";
import { useSSHref } from "./useSSHref";

const MEETINGS_SRC =
  "https://meetings-eu1.hubspot.com/joakim-systaddal?embed=true";

export default function SSFooter() {
  const ssHref = useSSHref();
  return (
    <footer id="kontakt" className="px-6 sm:px-10 mt-10 sm:mt-14">
      <div className="max-w-3xl mx-auto rounded-2xl bg-[#314D3C] px-8 sm:px-12 py-8 sm:py-10">
        <h2 className="text-lg font-medium text-[#F6F1E8] tracking-tight mb-2">
          Interessert?
        </h2>
        <p className="text-sm text-[#938C7F] leading-relaxed mb-5">
          Fortel oss kva de står i. Me lyttar først, og seier ærleg om me kan
          vere til nytte.
        </p>
        <ModalButton
          label="Book ein første prat"
          panelClassName="max-w-4xl"
          className="inline-flex items-center text-sm text-[#2F2B26] bg-[#FAF8F3] rounded-full px-5 py-2.5 hover:bg-[#ECE4D6] transition-colors cursor-pointer"
        >
          <div className="p-3 sm:p-5">
            <HubSpotMeetings src={MEETINGS_SRC} />
          </div>
        </ModalButton>
        <p className="text-sm text-[#938C7F] leading-relaxed mt-6">
          Ikkje klar for ein prat enno? Bli med i{" "}
          <a
            href="https://handlingsrommet.selsengsystaddal.no"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F6F1E8] underline underline-offset-4 decoration-[#A65F3D] hover:decoration-[#F6F1E8]"
          >
            fellesskapet Handlingsrommet
          </a>
          . Det er gratis.
        </p>
        <p className="text-xs text-[#6B6860] mt-10">
          &copy; {new Date().getFullYear()} Selseng & Systaddal AS ·{" "}
          <a
            href={ssHref("/ss/personvern")}
            className="underline underline-offset-4 hover:text-[#F6F1E8]"
          >
            Personvern og informasjonskapslar
          </a>
        </p>
      </div>
      <div className="h-6 sm:h-10" />
    </footer>
  );
}
