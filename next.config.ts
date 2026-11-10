import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/articles/:slug",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/about",
        permanent: true,
      },
      // Specsavers content consolidated into the brand hub (Nov 2026)
      {
        source: "/find/specsavers-eye-test",
        destination: "/opticians/specsavers",
        permanent: true,
      },
      {
        source: "/find/specsavers-eye-test-cost",
        destination: "/opticians/specsavers",
        permanent: true,
      },
      {
        source: "/eye-tests/home-visit-eye-test",
        destination: "/at-home-eye-tests",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
