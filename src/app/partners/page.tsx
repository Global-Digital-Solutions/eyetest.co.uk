import { redirect } from "next/navigation";

/**
 * /partners redirects to /get-listed — both routes serve the same purpose:
 * informing opticians about getting listed on eyetest.co.uk.
 */
export default function PartnersPage() {
  redirect("/get-listed");
}
