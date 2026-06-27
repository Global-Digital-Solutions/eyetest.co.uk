import { Suspense } from "react";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import SurgerySearchClient from "./SurgerySearchClient";

export const metadata: Metadata = {
  title: "Find Eye Surgery Clinics Near You — eyetest.co.uk",
  description:
    "Search 156+ eye surgery clinics across the UK. Compare providers including Newmedica, SpaMedica, Optegra and more. Find clinics near you by postcode.",
  alternates: {
    canonical: "https://www.eyetest.co.uk/eye-surgery/search",
  },
  openGraph: {
    title: "Find Eye Surgery Clinics Near You — eyetest.co.uk",
    description:
      "Search 156+ eye surgery clinics across the UK. Compare providers including Newmedica, SpaMedica, Optegra and more.",
    url: "https://www.eyetest.co.uk/eye-surgery/search",
    siteName: "eyetest.co.uk",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Find Eye Surgery Clinics Near You — eyetest.co.uk",
    description:
      "Search 156+ eye surgery clinics across the UK. Compare providers including Newmedica, SpaMedica, Optegra and more.",
  },
};

function SearchFallback() {
  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-10">
        <h1
          className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-2 text-center"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Find Eye Surgery Clinics
        </h1>
        <p className="text-gray-600 text-center mb-6 text-sm sm:text-base">
          Loading search...
        </p>
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[var(--color-primary)] rounded-full animate-spin" />
        </div>
      </div>
    </section>
  );
}

export default function SurgerySearchPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50">
        <Suspense fallback={<SearchFallback />}>
          <SurgerySearchClient />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
