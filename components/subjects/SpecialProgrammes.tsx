import { specialProgrammes } from "@/lib/content";

export function SpecialProgrammes() {
  return (
    <section className="px-6 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-display text-3xl font-semibold text-cocoa-900 md:text-4xl">
          Specialist Programmes
        </h2>
        <p className="mt-3 text-center text-base text-cocoa-700">
          Targeted preparation for entry exams and assessments.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
          {specialProgrammes.map((programme) => (
            <div
              key={programme.name}
              className="rounded-2xl border-2 border-cocoa-800/10 bg-cream p-6 md:p-8"
            >
              <h3 className="font-display text-2xl font-semibold text-cocoa-900">
                {programme.name}
              </h3>
              <ul className="mt-4 space-y-2">
                {programme.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-base text-cocoa-900"
                  >
                    <span
                      className="mt-2 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-honey-500"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
