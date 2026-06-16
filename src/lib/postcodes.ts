export interface GeoResult {
  postcode: string;
  lat: number;
  lng: number;
  district: string;
}

// Matches a full UK postcode: e.g. SW1A 1AA, TW11 8AB, M1 1AA, EC1A 1BB
const FULL_POSTCODE_RE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

export async function geocodePostcode(postcode: string): Promise<GeoResult> {
  const clean = postcode.replace(/\s/g, "").toUpperCase();

  if (!clean) {
    throw new Error(
      "Please enter your full UK postcode (e.g. SW1A 1AA) so we can find eye tests near you."
    );
  }

  if (!FULL_POSTCODE_RE.test(clean)) {
    throw new Error(
      `It looks like "${postcode.trim()}" is only a partial postcode. Please enter your full postcode including the second half (e.g. ${clean} 1AA) so we can find the closest opticians to you.`
    );
  }

  const res = await fetch(`https://api.postcodes.io/postcodes/${clean}`);
  if (!res.ok) {
    throw new Error(
      `We couldn't recognise "${postcode.trim()}" as a valid UK postcode. Please double-check and try again.`
    );
  }
  const data = await res.json();
  if (data.status !== 200 || !data.result) {
    throw new Error(
      `We couldn't recognise "${postcode.trim()}" as a valid UK postcode. Please double-check and try again.`
    );
  }
  return {
    postcode: data.result.postcode,
    lat: data.result.latitude,
    lng: data.result.longitude,
    district: data.result.admin_district ?? "",
  };
}
