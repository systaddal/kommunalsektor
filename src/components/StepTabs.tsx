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
      {/* Tab bar */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-[#FAF7EF] border border-[rgba(28,28,26,0.09)] rounded-full p-1.5 gap-1 flex-wrap justify-center">
          {steps.map((s, i) => (
            <button
              key={s.num}
              onClick={() => setActive(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === i
                  ? "bg-[#2D4233] text-white"
                  : "text-[#43565A] hover:text-[#18251D] hover:bg-[#FAF7EF]"
              }`}
            >
              <span className="hidden sm:inline">{s.label}</span>
              <span className="sm:hidden">
                {s.num === "X" ? "X" : s.num}
              </span>
            </button>
          ))}
        </div>
      </div>

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
