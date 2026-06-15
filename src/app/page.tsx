import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Partners } from "@/components/Partners";
import { OffersTicker } from "@/components/OffersTicker";
import { HowItWorks } from "@/components/HowItWorks";
import { NHSBanner } from "@/components/NHSBanner";
import { Benefits } from "@/components/Benefits";
import { Testimonials } from "@/components/Testimonials";
import { CTABanner } from "@/components/CTABanner";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Partners />
        <OffersTicker />
        <HowItWorks />
        <NHSBanner />
        <Benefits />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
