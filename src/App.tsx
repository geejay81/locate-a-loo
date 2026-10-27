import { useMemo, useState } from "react";
import { useGeolocation } from "@/hooks/useGeolocation";
import { findNearbyToilets } from "@/services/overpass";
import { ToiletCard } from "@/components/ToiletCard";
import type { Toilet } from "@/types/toilet";
import { ToiletMap } from "./components/ToiletMap";
import { HeroSection } from "./components/HeroSection";
import { Spinner } from "./components/ui/spinner";

const pageTitle = "Locate a Loo";

function App() {
  const { coordinates, loading, error, getLocation } = useGeolocation();

  const [toilets, setToilets] = useState<Toilet[]>([]);
  const [searching, setSearching] = useState(false);

  const resultCount = useMemo(() => {
    return toilets.length;
  }, [toilets]);

  const loadToilets = async () => {

    const location = await getLocation();

    if (!location) {
      console.log("Coordinates not available yet. Waiting for geolocation...");
      return;
    }

    const { latitude, longitude } = location;

    setSearching(true);

    try {
      const results = await findNearbyToilets(
        latitude,
        longitude
      );

      const sortedResults = results.sort((a, b) => {
        if (a.distance === undefined) return 1;
        if (b.distance === undefined) return -1;
        return a.distance - b.distance;
      });

      setToilets(sortedResults);
    } catch (err) {
      console.error(err);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection
        heading={pageTitle}
        onFindToilets={loadToilets}
        loading={loading || searching}
      />
      <div className="p-6 mx-auto max-w-4xl px-4 py-4 text-center">

        {searching && (
          <Spinner className="mx-auto mt-8" />
        )}

        {error && (
          <p className="mt-8 text-red-500">
            {error}
          </p>
        )}

        {coordinates && resultCount > 0 && (
          <div>
            <p className="mt-8 font-semibold">
              Found {resultCount} toilets
            </p>
            <ToiletMap
              latitude={coordinates.latitude}
              longitude={coordinates.longitude}
              toilets={toilets} />
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {toilets.map((toilet) => (
                <ToiletCard
                  key={toilet.id}
                  toilet={toilet} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;