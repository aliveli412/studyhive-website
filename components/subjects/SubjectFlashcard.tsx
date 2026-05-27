"use client";

import { useState } from "react";
import type { Subject } from "@/lib/content";

/**
 * Interactive flashcard: front shows the subject name,
 * click (or Enter/Space) to flip and reveal the levels offered.
 *
 * The whole card is a <button> so keyboard activation works
 * without extra handlers. Bottom-right "Flip" hint matches Bee's spec.
 */

export function SubjectFlashcard({ subject }: { subject: Subject }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-expanded={flipped}
      aria-label={
        flipped
          ? `${subject.name} — showing levels. Click to flip back.`
          : `${subject.name} — click to see levels offered.`
      }
      className={`flip-card relative block h-56 w-full text-left md:h-64 ${
        flipped ? "is-flipped" : ""
      }`}
    >
      <div className="flip-card-inner h-full w-full">
        {/* Front */}
        <div
          className="flip-card-face flex flex-col items-center justify-center rounded-2xl bg-cream p-6 shadow-sm transition-shadow hover:shadow-md"
          aria-hidden={flipped}
        >
          <h3 className="text-center font-display text-2xl font-semibold text-cocoa-900 md:text-3xl">
            {subject.name}
          </h3>
          {subject.subtitle && (
            <p className="mt-2 text-center text-sm text-cocoa-700">
              {subject.subtitle}
            </p>
          )}
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 text-xs font-medium text-cocoa-700">
            Flip
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 7L7 3M7 3L11 7M7 3V12C7 14.7614 9.23858 17 12 17H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        {/* Back */}
        <div
          className="flip-card-face flip-card-back flex flex-col justify-start rounded-2xl bg-honey-500 p-5 shadow-sm md:p-6"
          aria-hidden={!flipped}
        >
          <h3 className="font-display text-lg font-semibold text-cocoa-900 md:text-xl">
            {subject.name}
          </h3>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-cocoa-800">
            Levels Offered
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-cocoa-900">
            {subject.levels.map((level) => (
              <li key={level} className="flex items-start gap-2">
                <span
                  className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cocoa-900"
                  aria-hidden="true"
                />
                <span>{level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </button>
  );
}
