"use client";

import { useState } from "react";

export default function ContactForm() {
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
      <div className="bg-[#D8E0D6] border border-[#B8C9B2] rounded-2xl p-8 sm:p-10 text-center">
        <p className="text-lg font-medium text-[#2D4233] mb-2">Takk for meldinga!</p>
        <p className="text-sm text-[#43565A]">
          Me kjem tilbake til deg så snart me kan.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-[#43565A] hover:text-[#18251D] underline transition-colors"
        >
          Send ei ny melding
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#18251D] mb-1.5">
            Namn
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 bg-white border border-[rgba(28,28,26,0.14)] rounded-xl text-sm text-[#18251D] placeholder:text-[#B5B2AC] outline-none focus:border-[#2D4233] focus:ring-2 focus:ring-[rgba(45,66,51,0.1)] transition-all"
            placeholder="Ditt namn"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#18251D] mb-1.5">
            E-post
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 bg-white border border-[rgba(28,28,26,0.14)] rounded-xl text-sm text-[#18251D] placeholder:text-[#B5B2AC] outline-none focus:border-[#2D4233] focus:ring-2 focus:ring-[rgba(45,66,51,0.1)] transition-all"
            placeholder="din@epost.no"
          />
        </div>
      </div>

      <div>
        <label htmlFor="org" className="block text-sm font-medium text-[#18251D] mb-1.5">
          Kommune / organisasjon
        </label>
        <input
          type="text"
          id="org"
          name="organization"
          className="w-full px-4 py-3 bg-white border border-[rgba(28,28,26,0.14)] rounded-xl text-sm text-[#18251D] placeholder:text-[#B5B2AC] outline-none focus:border-[#2D4233] focus:ring-2 focus:ring-[rgba(45,66,51,0.1)] transition-all"
          placeholder="Valfritt"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#18251D] mb-1.5">
          Melding
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 bg-white border border-[rgba(28,28,26,0.14)] rounded-xl text-sm text-[#18251D] placeholder:text-[#B5B2AC] outline-none focus:border-[#2D4233] focus:ring-2 focus:ring-[rgba(45,66,51,0.1)] transition-all resize-none"
          placeholder="Kva lurer du på?"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-[#C0392B]">
          Noko gjekk gale. Prøv igjen, eller send ein e-post direkte.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-[#2D4233] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#3A5240] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sender..." : "Send melding"}
      </button>
    </form>
  );
}
