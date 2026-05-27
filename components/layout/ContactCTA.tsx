import { ButtonLink } from "@/components/ui/Button";
import { contactCTA } from "@/lib/content";

export function ContactCTA() {
  return (
    <section className="bg-cocoa-900 text-cream">
      <div className="mx-auto max-w-4xl px-6 py-16 text-center md:px-8 md:py-20">
        <h2 className="font-display text-3xl font-semibold md:text-4xl">
          {contactCTA.heading}
        </h2>
        <p className="mt-4 text-base text-honey-100 md:text-lg">
          {contactCTA.body}
        </p>
        <div className="mt-8">
          <ButtonLink href={contactCTA.cta.href} variant="primary">
            {contactCTA.cta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
