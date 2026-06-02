"use client";

import { useState } from "react";

export default function SSContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xwpodwkn", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

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
      <div className="rounded-2xl border border-[#e2e2e2] bg-[#fafafa] px-8 py-10 text-center">
        <p className="text-lg font-medium text-[#111] mb-1.5">Takk for meldinga.</p>
        <p className="text-sm text-[#666]">Me kjem tilbake til deg så snart me kan.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-[#666] underline hover:text-[#111] transition-colors cursor-pointer"
        >
          Send ei ny melding
        </button>
      </div>
    );
  }

  const field =
    "w-full px-4 py-3 bg-white border border-[#ddd] rounded-xl text-sm text-[#111] placeholder:text-[#aaa] outline-none focus:border-[#111] transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Skjult emnefelt slik at innboksen ser kvar meldinga kjem frå */}
      <input type="hidden" name="_subject" value="Ny melding frå selsengsystaddal.no" />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm text-[#444] mb-1.5">
            Namn
          </label>
          <input type="text" id="name" name="name" required className={field} placeholder="Ditt namn" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-[#444] mb-1.5">
            E-post
          </label>
          <input type="email" id="email" name="email" required className={field} placeholder="din@epost.no" />
        </div>
      </div>

      <div>
        <label htmlFor="org" className="block text-sm text-[#444] mb-1.5">
          Kommune / organisasjon
        </label>
        <input type="text" id="org" name="organization" className={field} placeholder="Valfritt" />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-[#444] mb-1.5">
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
        className="inline-flex items-center gap-2 text-sm text-white bg-[#111] rounded-full px-6 py-2.5 hover:bg-[#333] transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {status === "sending" ? "Sender…" : "Send melding"}
      </button>
    </form>
  );
}
