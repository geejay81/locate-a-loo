import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/useGeolocation";
import { findNearbyToilets } from "@/services/overpass";
import type { Toilet } from "@/types/toilet";

const pageTitle = "Locate A Loo";

function App() {
  const { coordinates, loading, error, getLocation } = useGeolocation();

  const [toilets, setToilets] = useState<Toilet[]>([]);
  const [searching, setSearching] = useState(false);

  const handleFindToilets = async () => {
    getLocation();
  };

  const loadToilets = async () => {
    if (!coordinates) return;

    setSearching(true);

    try {
      const results = await findNearbyToilets(
        coordinates.latitude,
        coordinates.longitude
      );

      setToilets(results);

      console.log(results);
    } catch (err) {
      console.error(err);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">
        {pageTitle}
      </h1>

      <Button onClick={handleFindToilets} disabled={loading}>
        Find My Location
      </Button>

      {coordinates && (
        <>
          <p className="mt-4">
            Lat: {coordinates.latitude}
          </p>

          <p>
            Lon: {coordinates.longitude}
          </p>

          <Button
            className="mt-4"
            onClick={loadToilets}
          >
            Find Nearby Toilets
          </Button>
        </>
      )}

      {searching && (
        <p className="mt-4">Searching...</p>
      )}

      {error && (
        <p className="mt-4 text-red-500">
          {error}
        </p>
      )}

      <p className="mt-4 font-semibold">
        Found {toilets.length} toilets
      </p>
      <ul className="mt-2">
        {toilets.map((toilet) => (
          <li key={toilet.id}>
            {toilet.name} - Lat: {toilet.latitude}, Lon: {toilet.longitude}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;