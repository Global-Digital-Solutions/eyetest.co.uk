import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getQueryBySlug, getAllSlugs } from "@/data/search-queries";
import { QueryPageView, queryMetadata } from "@/components/QueryPageView";

export function generateStaticParams(): { slug: string }[] {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const query = getQueryBySlug(slug);
  if (!query || query.canonicalPath) {
    return { title: "Page Not Found | eyetest.co.uk" };
  }
  return queryMetadata(query);
}

export default async function SearchQueryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const query = getQueryBySlug(slug);
  if (!query || query.canonicalPath) {
    notFound();
  }
  return <QueryPageView query={query} />;
}
