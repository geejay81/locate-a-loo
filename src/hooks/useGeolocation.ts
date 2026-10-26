import { useState } from "react";

interface Coordinates {
  latitude: number;
  longitude: number;
}

export function useGeolocation() {
  const [loading, setLoading] = useState(false);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getLocation = () => {
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  };

  return {
    loading,
    coordinates,
    error,
    getLocation,
  };
}