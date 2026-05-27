import { testimonies } from "@/lib/content";

export function Testimonies() {
  return (
    <section className="px-6 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-display text-3xl font-semibold text-cocoa-900 md:text-4xl">
          Testimonies
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          {testimonies.map((t) => (
            <figure
              key={t.author + t.date}
              className="rounded-2xl bg-cream p-6 md:p-8"
            >
              <blockquote className="text-base italic leading-relaxed text-cocoa-900 md:text-lg">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold text-cocoa-900">{t.author}</span>
                <span className="text-cocoa-700"> · {t.date}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
