import { aboutTutors, tutors } from "@/lib/content";

/**
 * Tutor avatars are initial-circles for v1 — GDPR-safe placeholder.
 * Once Bee secures written consent from each tutor, swap these for
 * real photos via next/image (see docs/BRAND.md notes).
 */

function TutorAvatar({ initial }: { initial: string }) {
  return (
    <div
      className="flex h-24 w-24 items-center justify-center rounded-full bg-honey-400 font-display text-4xl font-bold text-cocoa-900 ring-4 ring-honey-500 md:h-28 md:w-28 md:text-5xl"
      aria-hidden="true"
    >
      {initial}
    </div>
  );
}

export function TutorList() {
  return (
    <section className="border-t border-cocoa-800/10 bg-honey-100 px-6 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-display text-3xl font-semibold uppercase tracking-wide text-cocoa-900 md:text-4xl">
          {aboutTutors.heading}
        </h2>
        <p className="mt-3 text-center text-sm italic text-cocoa-700 md:text-base">
          {aboutTutors.note}
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
          {tutors.map((tutor) => (
            <article
              key={tutor.name}
              className="flex flex-col items-center rounded-2xl bg-cream p-6 text-center md:p-8"
            >
              <TutorAvatar initial={tutor.name.charAt(0)} />
              <h3 className="mt-5 font-display text-2xl font-semibold text-cocoa-900">
                {tutor.name}
              </h3>
              <p className="mt-2 text-sm text-cocoa-700 md:text-base">
                {tutor.tagline}
              </p>
              {tutor.bio && (
                <p className="mt-3 text-sm leading-relaxed text-cocoa-900 md:text-base">
                  {tutor.bio}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
