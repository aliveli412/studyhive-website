import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactCTA } from "@/components/layout/ContactCTA";
import { SubjectFlashcard } from "@/components/subjects/SubjectFlashcard";
import { SpecialProgrammes } from "@/components/subjects/SpecialProgrammes";
import { FeesTable } from "@/components/subjects/FeesTable";
import { subjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Subjects & Fees",
  description:
    "GCSE, A-Level, IB and KS1–KS3 tutoring in Sciences, Maths, English, German, Spanish, French, History and Economics. Plus Medical Entry and 11+ preparation.",
};

export default function SubjectsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Page header */}
        <section className="px-6 pt-12 pb-8 md:px-8 md:pt-20">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-display text-4xl font-semibold text-cocoa-900 md:text-5xl">
              Subjects & Fees
            </h1>
            <p className="mt-4 text-base text-cocoa-700 md:text-lg">
              Click a card to see the levels we offer. All lessons online.
            </p>
          </div>
        </section>

        {/* Flashcards grid — 8 subjects, symmetrical 4×2 */}
        <section className="px-6 pb-16 md:px-8 md:pb-20">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
            {subjects.map((subject) => (
              <SubjectFlashcard key={subject.name} subject={subject} />
            ))}
          </div>
        </section>

        <SpecialProgrammes />
        <FeesTable />

        {/* Note about new subjects */}
        <section className="px-6 pb-16 md:px-8 md:pb-24">
          <div className="mx-auto max-w-3xl">
            <p className="rounded-2xl border-2 border-cocoa-800/15 bg-cream/60 p-6 text-center text-base text-cocoa-900 md:p-8 md:text-lg">
              If you&apos;d like tutoring for a specific entry exam or subject not mentioned above, please contact us. We often welcome new tutors to our Hive.
            </p>
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
