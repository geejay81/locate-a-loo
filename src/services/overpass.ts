/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Toilet } from "@/types/toilet";
import { getDistance } from "geolib";

export async function findNearbyToilets(
  latitude: number,
  longitude: number,
  radius = 2000
): Promise<Toilet[]> {

  const query = queries.nwrQuery
    .replace("{{lat}}", latitude.toString())
    .replace("{{lon}}", longitude.toString())
    .replace("{{rad}}", radius.toString());

  const response = await fetch(
    "https://overpass-api.de/api/interpreter",
    {
      method: "POST",
      body: query,
    }
  );

  const data = await response.json();

  return data.elements
    .filter(
      (element: any) =>
        element.center || (element.lat && element.lon)
    )
    .map((element: any) => {

      const lat = element.center?.lat ?? element.lat;
      const lon = element.center?.lon ?? element.lon;

      const distance = getDistance(
        { latitude, longitude },
        { latitude: lat, longitude: lon }
      );
      
      return ({
        id: element.id,
        name: element.tags?.name ?? "Public Toilet",
        latitude: lat,
        longitude: lon,
        wheelchair: element.tags?.wheelchair,
        building: element.tags?.building,
        openingHours: element.tags?.opening_hours,
        fee: element.tags?.fee,
        changingTable: element.tags?.changing_table,
        distance
      })});
}

const queries = {
  nwrQuery: `
[out:json];
(
  nwr["amenity"="toilets"](around:{{rad}},{{lat}},{{lon}});
);
out center;
`,
nodeQuery: `
[out:json];
(
  node["amenity"="toilets"](around:{{rad}},{{lat}},{{lon}});
);
out body;
`};
