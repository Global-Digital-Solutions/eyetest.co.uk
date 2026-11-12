import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FrameSearch } from "@/components/glasses/FrameSearch";

// Review build: live but unlinked, noindex and not in the sitemap until signed off.
export const metadata: Metadata = {
  title: "Find Glasses Frames: Compare Styles from High Street Opticians",
  robots: { index: false, follow: false },
};

export default function GlassesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <FrameSearch />
      </main>
      <Footer />
    </div>
  );
}
