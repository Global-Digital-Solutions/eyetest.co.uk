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
        source: "/find/nhs-eye-test",
        destination: "/find/free-eye-test",
        permanent: true,
      },
      {
        source: "/find/free-nhs-eye-test-eligibility",
        destination: "/find/free-eye-test",
        permanent: true,
      },
      {
        source: "/find/eye-test-near-me",
        destination: "/find/opticians-near-me",
        permanent: true,
      },
      {
        source: "/find/best-opticians-near-me",
        destination: "/find/opticians-near-me",
        permanent: true,
      },
      {
        source: "/find/book-eye-test-online",
        destination: "/find/book-eye-test",
        permanent: true,
      },
      {
        source: "/find/boots-eye-test",
        destination: "/opticians/boots-opticians",
        permanent: true,
      },
      {
        source: "/find/boots-eye-test-cost",
        destination: "/opticians/boots-opticians",
        permanent: true,
      },
      {
        source: "/find/vision-express-eye-test",
        destination: "/opticians/vision-express",
        permanent: true,
      },
      {
        source: "/eye-tests/home-visit-eye-test",
        destination: "/at-home-eye-tests",
        permanent: true,
      },
      {
        source: "/eye-tests/colour-vision-test",
        destination: "/find/colour-blind-test",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
