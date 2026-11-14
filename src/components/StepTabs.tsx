"use client";

import { useState } from "react";

type Step = {
  num: string;
  label: string;
  title: string;
  activities: string[];
  effects: string[];
};

export default function StepTabs({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const step = steps[active];

  if (!steps || steps.length === 0) return null;

  return (
    <div>
      {/* Stega som ein veg: nummer på rekkje, med piler mellom */}
      <ol className="mb-10 flex flex-wrap items-start justify-center gap-x-1 gap-y-5 sm:justify-between">
        {steps.map((s, i) => (
          <li key={s.num} className="flex items-start">
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-current={active === i ? "step" : undefined}
              className="group flex w-[88px] flex-col items-center gap-2.5 cursor-pointer sm:w-[112px]"
            >
              <span
                className={`flex h-[52px] w-[52px] items-center justify-center rounded-full border-[1.5px] text-[22px] transition-colors ${
                  active === i
                    ? "border-[#2D4233] bg-[#2D4233] text-[#F5F1E8]"
                    : "border-[#D8D2C4] bg-[#FAF7EF] text-[#2D4233] group-hover:border-[#2D4233]"
                }`}
                style={{ fontFamily: "var(--font-serif), 'Fraunces', serif" }}
              >
                {s.num}
              </span>
              <span
                className={`text-center text-sm leading-tight ${
                  active === i
                    ? "font-semibold text-[#18251D]"
                    : "font-medium text-[#43565A] group-hover:text-[#18251D]"
                }`}
              >
                {s.label}
              </span>
            </button>
            {i < steps.length - 1 && (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C7653A"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="mt-4 hidden flex-shrink-0 md:block"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            )}
          </li>
        ))}
      </ol>

      {/* Content area */}
      <div className="bg-[#FAF7EF] border border-[rgba(28,28,26,0.09)] rounded-2xl p-6 sm:p-10 min-h-[400px]">
        <div className="flex items-center gap-4 mb-8">
          <div
            className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-lg ${
              step.num === "X"
                ? "border-2 border-[#2D4233] text-[#2D4233]"
                : "bg-[#2D4233] text-white"
            }`}
            style={{
              fontFamily:
                "var(--font-serif), 'Fraunces', serif",
            }}
          >
            {step.num}
          </div>
          <h3
            className="text-xl sm:text-2xl tracking-tight text-[#18251D]"
            style={{
              fontFamily:
                "var(--font-serif), 'Fraunces', serif",
              fontWeight: 400,
            }}
          >
            {step.title}
          </h3>
        </div>

        <div
          className={`grid gap-8 ${step.effects && step.effects.length > 0 ? "md:grid-cols-2" : ""}`}
        >
          {/* Activities */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#43565A] mb-4">
              Aktivitetar
            </p>
            <ul className="space-y-3">
              {step.activities?.map((a, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[#43565A] text-sm leading-relaxed"
                >
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#2D4233] mt-1.5" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          {/* Effects */}
          {step.effects && step.effects.length > 0 && (
            <div className="bg-[#D8E0D6] border border-[#B8C9B2] rounded-xl p-5 sm:p-6 h-fit">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#2D4233] mb-4">
                Effektar
              </p>
              <ul className="space-y-3">
                {step.effects.map((e, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[#43565A] text-sm leading-relaxed"
                  >
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#2D4233] mt-1.5" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
