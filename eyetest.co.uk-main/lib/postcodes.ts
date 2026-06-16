export interface GeoResult {
  postcode: string;
  lat: number;
  lng: number;
  district: string;
}

export async function geocodePostcode(postcode: string): Promise<GeoResult> {
  const clean = postcode.replace(/\s/g, "").toUpperCase();
  const res = await fetch(`https://api.postcodes.io/postcodes/${clean}`);
  if (!res.ok) throw new Error(`Could not geocode postcode '${postcode}'`);
  const data = await res.json();
  if (data.status !== 200 || !data.result) throw new Error(`Invalid postcode: '${postcode}'`);
  return {
    postcode: data.result.postcode,
    lat: data.result.latitude,
    lng: data.result.longitude,
    district: data.result.admin_district ?? "",
  };
}
