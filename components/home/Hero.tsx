import { ButtonLink } from "@/components/ui/Button";
import { HeroBeeScene } from "@/components/home/HeroBeeScene";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    <section className="px-6 pt-12 pb-8 md:px-8 md:pt-20 md:pb-12">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className="text-center md:text-left">
          <h1 className="font-display text-5xl font-semibold text-cocoa-900 md:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-6 font-bold text-cocoa-900 md:text-lg">
            {hero.taglines[0]}
          </p>
          <p className="font-bold text-cocoa-900 md:text-lg">
            {hero.taglines[1]}
          </p>
          <p className="mt-6 text-base leading-relaxed text-cocoa-900 md:text-lg">
            {hero.intro}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
            <ButtonLink href={hero.primaryCTA.href} variant="primary">
              {hero.primaryCTA.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCTA.href} variant="secondary">
              {hero.secondaryCTA.label}
            </ButtonLink>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <HeroBeeScene />
        </div>
      </div>
    </section>
  );
}
