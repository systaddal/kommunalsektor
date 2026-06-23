"use client";

import { useState } from "react";

export default function SSContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    // HubSpot Forms API (portal 147587677, EU). Feltnamna må stemme med
    // skjemaet i HubSpot: firstname, lastname, email, phone, message.
    const payload = {
      fields: [
        { name: "firstname", value: String(data.get("firstname") ?? "") },
        { name: "lastname", value: String(data.get("lastname") ?? "") },
        { name: "email", value: String(data.get("email") ?? "") },
        { name: "phone", value: String(data.get("phone") ?? "") },
        { name: "message", value: String(data.get("message") ?? "") },
      ].filter((f) => f.value !== ""),
      context: {
        pageUri: typeof window !== "undefined" ? window.location.href : "",
        pageName: "selsengsystaddal.no — kontakt",
      },
    };

    try {
      const res = await fetch(
        "https://api-eu1.hsforms.com/submissions/v3/integration/submit/147587677/01f98400-3813-4600-8135-cc26736437d2",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-[#E4DBCB] bg-[#FAF8F3] px-8 py-10 text-center">
        <p className="text-lg font-medium text-[#2F2B26] mb-1.5">Takk for meldinga.</p>
        <p className="text-sm text-[#6B6860]">Me kjem tilbake til deg så snart me kan.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-[#6B6860] underline hover:text-[#2F2B26] transition-colors cursor-pointer"
        >
          Send ei ny melding
        </button>
      </div>
    );
  }

  const field =
    "w-full px-4 py-3 bg-[#FAF8F3] border border-[#CFC5B2] rounded-xl text-sm text-[#2F2B26] placeholder:text-[#B9B0A2] outline-none focus:border-[#314D3C] transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstname" className="block text-sm text-[#2F2B26] mb-1.5">
            Fornamn
          </label>
          <input type="text" id="firstname" name="firstname" required className={field} placeholder="Ditt fornamn" />
        </div>
        <div>
          <label htmlFor="lastname" className="block text-sm text-[#2F2B26] mb-1.5">
            Etternamn
          </label>
          <input type="text" id="lastname" name="lastname" required className={field} placeholder="Ditt etternamn" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm text-[#2F2B26] mb-1.5">
            E-post
          </label>
          <input type="email" id="email" name="email" required className={field} placeholder="din@epost.no" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm text-[#2F2B26] mb-1.5">
            Telefonnummer
          </label>
          <input type="tel" id="phone" name="phone" className={field} placeholder="Valfritt" />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-[#2F2B26] mb-1.5">
          Melding
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${field} resize-none`}
          placeholder="Kva har de på hjartet?"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-[#b3261e]">
          Noko gjekk gale. Prøv igjen, eller send ein e-post direkte til hei@selsengsystaddal.no.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 text-sm text-[#F6F1E8] bg-[#A65F3D] rounded-full px-6 py-2.5 hover:bg-[#8C4E32] transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {status === "sending" ? "Sender…" : "Send melding"}
      </button>
    </form>
  );
}
