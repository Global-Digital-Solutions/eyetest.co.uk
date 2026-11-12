import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getQueryByCanonicalPath, getToolQueries } from "@/data/search-queries";
import { QueryPageView, queryMetadata } from "@/components/QueryPageView";

export function generateStaticParams(): { slug: string }[] {
  return getToolQueries().map((q) => ({ slug: (q.canonicalPath as string).replace("/tools/", "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const query = getQueryByCanonicalPath(`/tools/${slug}`);
  return query ? queryMetadata(query) : { title: "Tool not found | eyetest.co.uk" };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const query = getQueryByCanonicalPath(`/tools/${slug}`);
  if (!query) notFound();
  return <QueryPageView query={query} />;
}
