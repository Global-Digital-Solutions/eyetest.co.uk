import type { MetadataRoute } from "next";
import { getAllSlugs as getAllEyeTestSlugs } from "@/data/eye-tests";
import { getAllConditionSlugs, getAllGuideSlugs } from "@/data/eye-health";
import { getAllArticleSlugs } from "@/data/articles";
import { getAllSlugs as getAllLocationSlugs } from "@/data/locations";
import { getAllSlugs as getAllOpticianSlugs } from "@/data/opticians";
import { getAllSlugs as getAllSearchQuerySlugs } from "@/data/search-queries";

const BASE = "https://eyetest.co.uk";
const NOW = new Date().toISOString();

export default function sitemap(): MetadataRoute.Sitemap {
  /* ------------------------------------------------------------------ */
  /* Static pages                                                        */
  /* ------------------------------------------------------------------ */

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: NOW, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE}/search`, lastModified: NOW, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/find`, lastModified: NOW, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/at-home-eye-tests`, lastModified: NOW, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/eye-tests`, lastModified: NOW, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/eye-health`, lastModified: NOW, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/opticians`, lastModified: NOW, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/locations`, lastModified: NOW, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/offers`, lastModified: NOW, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/get-listed`, lastModified: NOW, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/about`, lastModified: NOW, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/privacy`, lastModified: NOW, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: NOW, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/disclaimer`, lastModified: NOW, changeFrequency: "monthly", priority: 0.3 },
  ];

  /* ------------------------------------------------------------------ */
  /* Eye tests — /eye-tests/[slug]                                       */
  /* ------------------------------------------------------------------ */

  const eyeTestPages: MetadataRoute.Sitemap = getAllEyeTestSlugs().map(
    (slug) => ({
      url: `${BASE}/eye-tests/${slug}`,
      lastModified: NOW,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

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
      lastModified: NOW,
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
      lastModified: NOW,
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
      lastModified: NOW,
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
      lastModified: NOW,
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
      lastModified: NOW,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })
  );

  /* ------------------------------------------------------------------ */
  /* Optician location pages — /opticians/[brand]/[location]             */
  /* ------------------------------------------------------------------ */

  const opticianLocationPages: MetadataRoute.Sitemap =
    getAllOpticianSlugs().flatMap((brand) =>
      getAllLocationSlugs().map((location) => ({
        url: `${BASE}/opticians/${brand}/${location}`,
        lastModified: NOW,
        changeFrequency: "weekly" as const,
        priority: 0.5,
      }))
    );

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
  ];
}
