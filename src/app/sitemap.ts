import { SNAPSHOT_DATE } from "@/data/store-snapshot";
import type { MetadataRoute } from "next";
import { getAllSlugs as getAllEyeTestSlugs } from "@/data/eye-tests";
import { getAllConditionSlugs, getAllGuideSlugs } from "@/data/eye-health";
import { getAllArticleSlugs } from "@/data/articles";
import { getAllSlugs as getAllLocationSlugs } from "@/data/locations";
import {
  getAllSlugs as getAllOpticianSlugs,
  getOpticianBySlug,
} from "@/data/opticians";
import {
  getAllSlugs as getAllSearchQuerySlugs,
  getQueryByCanonicalPath,
  getQueryBySlug,
} from "@/data/search-queries";
import { getAllProviderSlugs } from "@/data/surgery-providers";
import { getAllConditionSlugs as getAllSurgeryConditionSlugs } from "@/data/surgery-conditions";

const BASE = "https://www.eyetest.co.uk";
const NOW = "2026-06-23T00:00:00.000Z";
/** Pages whose content changed in the November 2026 accuracy review */
const REVIEWED = "2026-11-11";

export default function sitemap(): MetadataRoute.Sitemap {
  /* ------------------------------------------------------------------ */
  /* Static pages                                                        */
  /* ------------------------------------------------------------------ */

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: REVIEWED, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE}/find`, lastModified: NOW, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/at-home-eye-tests`, lastModified: REVIEWED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/eye-tests`, lastModified: NOW, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/eye-health`, lastModified: NOW, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/opticians`, lastModified: REVIEWED, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/locations`, lastModified: REVIEWED, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/offers`, lastModified: REVIEWED, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/articles`, lastModified: NOW, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/eye-health/conditions`, lastModified: NOW, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/eye-surgery`, lastModified: REVIEWED, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/eye-surgery/enquiry`, lastModified: NOW, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/get-listed`, lastModified: NOW, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/about`, lastModified: NOW, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/privacy`, lastModified: NOW, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: NOW, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/disclaimer`, lastModified: NOW, changeFrequency: "monthly", priority: 0.3 },
  ];

  /* ------------------------------------------------------------------ */
  /* Eye tests — /eye-tests/[slug]                                       */
  /* ------------------------------------------------------------------ */

  /* Exclude slugs that redirect to standalone pages */
  const excludedEyeTestSlugs = new Set(["home-visit-eye-test", "colour-vision-test"]);

  const eyeTestPages: MetadataRoute.Sitemap = getAllEyeTestSlugs()
    .filter((slug) => !excludedEyeTestSlugs.has(slug))
    .map((slug) => ({
      url: `${BASE}/eye-tests/${slug}`,
      lastModified: NOW,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  /* ------------------------------------------------------------------ */
  /* Eye health conditions — /eye-health/conditions/[slug]               */
  /* ------------------------------------------------------------------ */

  const conditionPages: MetadataRoute.Sitemap = getAllConditionSlugs().map(
    (slug) => ({
      url: `${BASE}/eye-health/conditions/${slug}`,
      lastModified: NOW,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  /* ------------------------------------------------------------------ */
  /* Eye health guides — /eye-health/guides/[slug]                       */
  /* ------------------------------------------------------------------ */

  const guidePages: MetadataRoute.Sitemap = getAllGuideSlugs().map(
    (slug) => ({
      url: `${BASE}/eye-health/guides/${slug}`,
      lastModified:
        getQueryByCanonicalPath(`/eye-health/guides/${slug}`)?.dateModified ?? NOW,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  /* ------------------------------------------------------------------ */
  /* Articles — /articles/[slug]                                         */
  /* ------------------------------------------------------------------ */

  const articlePages: MetadataRoute.Sitemap = getAllArticleSlugs().map(
    (slug) => ({
      url: `${BASE}/articles/${slug}`,
      lastModified: getQueryByCanonicalPath(`/articles/${slug}`)?.dateModified ?? NOW,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })
  );

  /* ------------------------------------------------------------------ */
  /* Find / search queries — /find/[slug]                                */
  /* ------------------------------------------------------------------ */

  const findPages: MetadataRoute.Sitemap = getAllSearchQuerySlugs().map(
    (slug) => ({
      url: `${BASE}/find/${slug}`,
      lastModified: getQueryBySlug(slug)?.dateModified ?? NOW,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })
  );

  /* ------------------------------------------------------------------ */
  /* Locations — /locations/[city]                                       */
  /* ------------------------------------------------------------------ */

  const locationPages: MetadataRoute.Sitemap = getAllLocationSlugs().map(
    (slug) => ({
      url: `${BASE}/locations/${slug}`,
      lastModified: REVIEWED,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })
  );

  /* ------------------------------------------------------------------ */
  /* Optician brand pages — /opticians/[slug]                            */
  /* ------------------------------------------------------------------ */

  const opticianBrandPages: MetadataRoute.Sitemap = getAllOpticianSlugs().map(
    (slug) => ({
      url: `${BASE}/opticians/${slug}`,
      // Use the brand's real content date when it has one
      lastModified: getOpticianBySlug(slug)?.dateModified ?? NOW,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  /* ------------------------------------------------------------------ */
  /* Optician location pages — /opticians/[brand]/[location]             */
  /* ------------------------------------------------------------------ */

  const opticianLocationPages: MetadataRoute.Sitemap =
    getAllOpticianSlugs().flatMap((brand) =>
      getAllLocationSlugs().map((location) => ({
        url: `${BASE}/opticians/${brand}/${location}`,
        // Town pages use the brand data and the store snapshot: take the later date
        lastModified: [getOpticianBySlug(brand)?.dateModified ?? SNAPSHOT_DATE, SNAPSHOT_DATE].sort().pop()!,
        changeFrequency: "weekly" as const,
        priority: 0.5,
      }))
    );

  /* ------------------------------------------------------------------ */
  /* Eye surgery conditions — /eye-surgery/[slug]                        */
  /* ------------------------------------------------------------------ */

  const surgeryConditionPages: MetadataRoute.Sitemap =
    getAllSurgeryConditionSlugs().map((slug) => ({
      url: `${BASE}/eye-surgery/${slug}`,
      lastModified: NOW,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  /* ------------------------------------------------------------------ */
  /* Eye surgery providers — /eye-surgery/providers/[slug]               */
  /* ------------------------------------------------------------------ */

  const surgeryProviderPages: MetadataRoute.Sitemap =
    getAllProviderSlugs().map((slug) => ({
      url: `${BASE}/eye-surgery/providers/${slug}`,
      lastModified: REVIEWED,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  /* ------------------------------------------------------------------ */
  /* Combined                                                            */
  /* ------------------------------------------------------------------ */

  return [
    ...staticPages,
    ...eyeTestPages,
    ...conditionPages,
    ...guidePages,
    ...articlePages,
    ...findPages,
    ...locationPages,
    ...opticianBrandPages,
    ...opticianLocationPages,
    ...surgeryConditionPages,
    ...surgeryProviderPages,
  ];
}
