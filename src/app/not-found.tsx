import { redirect } from "next/navigation";

/**
 * Catch-all 404 handler — redirects any unmatched URL back to the homepage.
 * Covers legacy URLs from the old site that would otherwise show a blank 404.
 */
export default function NotFound() {
  redirect("/");
}
