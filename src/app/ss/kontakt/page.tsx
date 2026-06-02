import type { Metadata } from "next";
import SSContactForm from "../SSContactForm";
import ModalButton from "../ModalButton";
import HubSpotMeetings from "../HubSpotMeetings";
import SSTag from "../SSTag";

const MEETINGS_SRC =
  "https://meetings-eu1.hubspot.com/joakim-systaddal?embed=true";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Book eit innsiktsmøte med Selseng & Systaddal, eller send oss nokre ord.",
  openGraph: {
    title: "Kontakt — Selseng & Systaddal",
    description:
      "Book eit innsiktsmøte med Selseng & Systaddal, eller send oss nokre ord.",
    url: "https://selsengsystaddal.no/kontakt",
  },
};

export default function SSKontaktPage() {
  return (
    <article className="px-6 sm:px-10 pt-20 pb-16 sm:pt-28 sm:pb-20">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <SSTag>Kontakt</SSTag>
        </div>

        <p className="text-[#444] leading-[1.7] text-lg tracking-tight max-w-xl mb-12">
          Me tar gjerne ein uforpliktande prat om kva me kan bidra med hjå dykk.
          Book eit møte direkte, eller send oss nokre ord.
        </p>

        {/* To vegar inn: book eller skriv */}
        <section className="grid sm:grid-cols-2 gap-4">
          {/* Book eit møte */}
          <div className="flex flex-col rounded-2xl border border-[#eee] bg-[#fafafa] p-8">
            <h2 className="text-xl font-medium text-[#111] tracking-tight mb-2">
              Book eit innsiktsmøte
            </h2>
            <p className="text-sm text-[#666] leading-relaxed mb-7 flex-1">
              Finn eit tidspunkt som passar. Kalenderen opnar seg her på sida.
            </p>
            <ModalButton
              label="Vel tidspunkt"
              panelClassName="max-w-4xl"
              className="self-start inline-flex items-center text-sm text-[#111] bg-white border border-[#ddd] rounded-full px-6 py-3 hover:bg-[#f5f5f5] transition-colors cursor-pointer"
            >
              <div className="p-3 sm:p-5">
                <HubSpotMeetings src={MEETINGS_SRC} />
              </div>
            </ModalButton>
          </div>

          {/* Skriv ein melding */}
          <div className="flex flex-col rounded-2xl border border-[#eee] bg-[#fafafa] p-8">
            <h2 className="text-xl font-medium text-[#111] tracking-tight mb-2">
              Skriv ein melding
            </h2>
            <p className="text-sm text-[#666] leading-relaxed mb-7 flex-1">
              Har du eit spørsmål eller noko på hjartet? Send oss nokre ord, så
              kjem me tilbake til deg.
            </p>
            <ModalButton
              label="Skriv melding"
              panelClassName="max-w-lg"
              className="self-start inline-flex items-center text-sm text-[#111] bg-white border border-[#ddd] rounded-full px-6 py-3 hover:bg-[#f5f5f5] transition-colors cursor-pointer"
            >
              <div className="p-6 sm:p-8">
                <h2 className="text-lg font-medium text-[#111] tracking-tight mb-1 pr-10">
                  Skriv ein melding
                </h2>
                <p className="text-sm text-[#666] mb-6">
                  Send oss nokre ord, så kjem me tilbake til deg.
                </p>
                <SSContactForm />
              </div>
            </ModalButton>
          </div>
        </section>

        <p className="text-sm text-[#999] mt-8 text-center">
          Eller send ein e-post direkte til{" "}
          <a
            href="mailto:hei@selsengsystaddal.no"
            className="text-[#444] underline hover:text-[#111] transition-colors"
          >
            hei@selsengsystaddal.no
          </a>
        </p>
      </div>
    </article>
  );
}
