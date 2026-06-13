import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactCTA } from "@/components/layout/ContactCTA";
import { MeetBee } from "@/components/about/MeetBee";
import { TutorList } from "@/components/about/TutorList";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Bee - Graduate Entry Medical Student with 14 years of tutoring experience - and the team of medical and biomedical-science tutors behind the Study Hive.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Page header */}
        <section className="px-6 pt-12 pb-2 md:px-8 md:pt-20 md:pb-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-display text-4xl font-semibold text-cocoa-900 md:text-5xl">
              About
            </h1>
            <p className="mt-4 text-base text-cocoa-700 md:text-lg">
              The people behind the Hive.
            </p>
          </div>
        </section>

        <MeetBee />
        <TutorList />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
