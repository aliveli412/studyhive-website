import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactCTA } from "@/components/layout/ContactCTA";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { SubjectsTeaser } from "@/components/home/SubjectsTeaser";
import { Testimonies } from "@/components/home/Testimonies";
import { HoneycombDivider } from "@/components/ui/HoneycombDivider";

export default function HomePage() {
  return (
    <>
      <Header showLogo={false} />
      <main>
        <Hero />
        <HoneycombDivider />
        <HowItWorks />
        <SubjectsTeaser />
        <Testimonies />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
