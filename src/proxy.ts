import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import legacyRedirects from "@/data/legacy-redirects.json";

// Legacy URLs from the pre-replatform site (store listings, old town pages,
// guides) that still rank in Google. Each one gets a 301 to the closest live
// page. Keys are lowercase paths with no trailing slash.
//
// The matcher below limits this proxy to the old URL patterns only, so it
// never runs for live pages, search, admin or API routes. Next's own
// trailing-slash redirect still runs first, so "/old-page/" goes 308 to
// "/old-page" and then 301 to its new home.
const LEGACY = legacyRedirects as Record<string, string>;

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const destination = LEGACY[pathname.toLowerCase().replace(/\/+$/, "")];
  if (destination) {
    return NextResponse.redirect(new URL(destination + search, request.url), 301);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Old multi-segment sections
    "/listings/:path*",
    "/listing-location/:path*",
    "/event/:path*",
    "/customer/:path*",
    // Old single-segment slugs such as /best-opticians-for-eye-test-cambridge.
    // Live sections sharing a prefix (eye-tests, eye-health, eye-surgery) are excluded.
    "/((?!eye-tests$|eye-health$|eye-surgery$)(?:3d|amsler|best|cheap|check|city|contact|eye|eyecare|eyesight|free|glasses|independent|medical|nhs|oct|ocular|ollie|online|optical|optican|optician|opticians|private|reading|specsavers|virtual|vision)-[^/]+)",
  ],
};
