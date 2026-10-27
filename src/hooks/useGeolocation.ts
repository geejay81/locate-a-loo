import { useState } from "react";

interface Coordinates {
  latitude: number;
  longitude: number;
}

export function useGeolocation() {
  const [loading, setLoading] = useState(false);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getLocation = async (): Promise<Coordinates | null> => {
    setLoading(true);
    setError(null);

    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
      return null;
    }

    return new Promise((resolve) => {
      try {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };

            setCoordinates(coords);
            setLoading(false);
            resolve(coords);
          },
          (err) => {
            setError(`${err.message} (code ${err.code})`);
            setLoading(false);
            resolve(null);
          },
          { timeout: 10_000 },
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to retrieve your location.",
        );
        setLoading(false);
        resolve(null);
      }
    });
  };

  return {
    loading,
    coordinates,
    error,
    getLocation,
  };
}
