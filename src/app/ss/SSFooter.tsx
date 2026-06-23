"use client";

import ModalButton from "./ModalButton";
import HubSpotMeetings from "./HubSpotMeetings";

const MEETINGS_SRC =
  "https://meetings-eu1.hubspot.com/joakim-systaddal?embed=true";

export default function SSFooter() {
  return (
    <footer id="kontakt" className="px-6 sm:px-10 mt-10 sm:mt-14">
      <div className="max-w-3xl mx-auto rounded-2xl bg-[#314D3C] px-8 sm:px-12 py-8 sm:py-10">
        <h2 className="text-lg font-medium text-[#F6F1E8] tracking-tight mb-2">
          Interessert?
        </h2>
        <p className="text-sm text-[#938C7F] leading-relaxed mb-5">
          Me tar gjerne ein uforpliktande prat om kva me kan bidra med hjå dykk.
        </p>
        <ModalButton
          label="Book eit innsiktsmøte"
          panelClassName="max-w-4xl"
          className="inline-flex items-center text-sm text-[#2F2B26] bg-[#FAF8F3] rounded-full px-5 py-2.5 hover:bg-[#ECE4D6] transition-colors cursor-pointer"
        >
          <div className="p-3 sm:p-5">
            <HubSpotMeetings src={MEETINGS_SRC} />
          </div>
        </ModalButton>
        <p className="text-xs text-[#6B6860] mt-10">
          &copy; {new Date().getFullYear()} Selseng & Systaddal AS
        </p>
      </div>
      <div className="h-6 sm:h-10" />
    </footer>
  );
}
