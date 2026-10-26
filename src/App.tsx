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

    getLocation();

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

        <p className="mt-8 font-semibold">
          Found {resultCount} toilets
        </p>
        {coordinates && resultCount > 0 && (
          <div>
            <ToiletMap
              latitude={coordinates.latitude}
              longitude={coordinates.longitude}
              toilets={toilets} />
            <div className="mt-6 space-y-4">
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