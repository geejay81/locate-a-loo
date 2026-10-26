import type { Toilet } from "@/types/toilet";

export async function findNearbyToilets(
  latitude: number,
  longitude: number,
  radius = 2000
): Promise<Toilet[]> {
  const query = `
[out:json];
(
  node["amenity"="toilets"](around:${radius},${latitude},${longitude});
);
out body;
`;

  const response = await fetch(
    "https://overpass-api.de/api/interpreter",
    {
      method: "POST",
      body: query,
    }
  );

  const data = await response.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.elements.map((element: any) => ({
    id: element.id,
    name: element.tags?.name ?? "Public Toilet",
    latitude: element.lat,
    longitude: element.lon,
    wheelchair: element.tags?.wheelchair,
    fee: element.tags?.fee,
    changingTable: element.tags?.changing_table,
  }));
}