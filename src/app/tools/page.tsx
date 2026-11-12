import { OG_IMAGES } from "@/lib/og";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { getToolQueries } from "@/data/search-queries";

const title = "Free Eye Care Tools: NHS Eye Test Checker and More";
const description =
  "Free tools to check if you get a free NHS eye test and to understand your glasses prescription. Quick, private and based on official UK guidance.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    images: OG_IMAGES,
    title,
    description,
    url: "https://www.eyetest.co.uk/tools",
    siteName: "eyetest.co.uk",
    type: "website",
  },
  alternates: { canonical: "https://www.eyetest.co.uk/tools" },
};

export default function ToolsPage() {
  const tools = getToolQueries();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "Free Eye Care Tools",
              description,
              url: "https://www.eyetest.co.uk/tools",
              mainEntity: {
                "@type": "ItemList",
                itemListElement: tools.map((t, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: t.h1 ?? t.title,
                  url: `https://www.eyetest.co.uk${t.canonicalPath}`,
                })),
              },
            }),
          }}
        />
        <PageHero breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools" }]} compact>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Free Eye Care Tools
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto">
            Quick, private tools based on official UK guidance. Nothing you enter is saved.
          </p>
        </PageHero>
        <section className="py-14 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((t) => (
              <Link
                key={t.slug}
                href={t.canonicalPath as string}
                className="group bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-[var(--color-primary)]/40 transition-all"
              >
                <h2
                  className="text-xl font-bold text-[var(--color-navy)] mb-2 group-hover:text-[var(--color-primary)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {t.h1 ?? t.title}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{t.shortDescription}</p>
                <span className="text-sm font-semibold text-[var(--color-primary)]">Use the tool →</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
