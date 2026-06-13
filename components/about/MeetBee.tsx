import Image from "next/image";
import { meetBee } from "@/lib/content";

export function MeetBee() {
  return (
    <section className="px-6 pt-6 pb-16 md:px-8 md:pt-8 md:pb-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-display text-3xl font-semibold text-cocoa-900 md:text-4xl">
          {meetBee.heading}
        </h2>

        {/*
          Bio block — photo floats left on desktop so greeting, lead and the
          first bio sections wrap around it. `flow-root` contains the float
          so the closing card below starts cleanly.
        */}
        <div className="mx-auto mt-10 max-w-3xl flow-root">
          <figure className="mb-6 text-center md:float-left md:mb-3 md:mr-8 md:text-left">
            <div className="inline-block overflow-hidden rounded-2xl bg-cream p-2 shadow-sm ring-1 ring-cocoa-800/10">
              <Image
                src="/bee.jpg"
                alt="Bee, founder of the Study Hive"
                width={520}
                height={650}
                priority
                className="block h-auto w-60 rounded-xl"
              />
            </div>
          </figure>

          <p className="font-display text-2xl font-semibold text-cocoa-900 md:text-3xl">
            {meetBee.greeting}
          </p>
          <p className="mt-4 text-base leading-relaxed text-cocoa-900 md:text-lg">
            {meetBee.lead}
          </p>

          <div className="mt-8 space-y-8">
            {meetBee.sections.map((section) => (
              <div key={section.title}>
                <h3 className="font-display text-xl font-semibold text-cocoa-900 md:text-2xl">
                  {section.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-cocoa-900 md:text-lg">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing + welcome */}
        <div className="mx-auto mt-12 max-w-3xl rounded-2xl bg-cream p-6 text-center md:p-10">
          <p className="text-base leading-relaxed text-cocoa-900 md:text-lg">
            {meetBee.closing}
          </p>
          <p className="mt-4 font-display text-lg font-semibold text-cocoa-900 md:text-xl">
            {meetBee.welcome}
          </p>
        </div>
      </div>
    </section>
  );
}
