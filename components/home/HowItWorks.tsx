import { howItWorks } from "@/lib/content";

export function HowItWorks() {
  return (
    <section className="px-6 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="font-display text-3xl font-semibold text-cocoa-900 md:text-4xl">
            {howItWorks.heading}
          </h2>
          <p className="mt-4 text-base text-cocoa-700 md:text-lg">
            {howItWorks.subhead}
          </p>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {howItWorks.steps.map((step, i) => (
            <li
              key={step.title}
              className="flex flex-col items-center rounded-2xl bg-cream p-6 text-center md:p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-honey-500 font-display text-xl font-bold text-cocoa-900">
                {i + 1}
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-cocoa-900 md:text-2xl">
                {step.title}
              </h3>
              <p className="mt-3 text-base text-cocoa-700">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
