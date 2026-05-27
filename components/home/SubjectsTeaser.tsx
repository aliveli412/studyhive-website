import { ButtonLink } from "@/components/ui/Button";
import { subjectsTeaser } from "@/lib/content";

export function SubjectsTeaser() {
  return (
    <section className="px-6 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-3xl font-semibold text-cocoa-900 md:text-4xl">
          {subjectsTeaser.heading}
        </h2>
        <p className="mt-6 text-base leading-relaxed text-cocoa-900 md:text-lg">
          {subjectsTeaser.body}
        </p>
        <div className="mt-8">
          <ButtonLink href={subjectsTeaser.cta.href} variant="primary">
            {subjectsTeaser.cta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
