import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TutorApplicationForm } from "@/components/forms/TutorApplicationForm";

export const metadata: Metadata = {
  title: "Apply As A Tutor",
  description:
    "Apply to join the Study Hive. You need a prior degree and a minimum of one year of tutoring or teaching experience.",
};

export default function ForTutorsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="px-6 pt-12 pb-4 md:px-8 md:pt-20 md:pb-6">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-display text-4xl font-semibold text-cocoa-900 md:text-5xl">
              Apply As A Tutor
            </h1>
            <p className="mt-4 text-base text-cocoa-700 md:text-lg">
              Please note: to apply you need a prior degree and a minimum of one
              year of tutoring or teaching experience.
            </p>
          </div>
        </section>

        <section className="px-6 pb-20 md:px-8 md:pb-28">
          <div className="mx-auto max-w-2xl rounded-2xl bg-honey-100 p-6 shadow-sm ring-1 ring-cocoa-800/5 md:p-10">
            <TutorApplicationForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
