import { Button } from "@/components/ui/button";
import { useGeolocation } from "./hooks/useGeolocation";

function App() {
  const {
  loading,
  coordinates,
  error,
  getLocation,
} = useGeolocation();

  return (
    <div className="p-4">
      <Button onClick={getLocation} disabled={loading}>
        {loading ? "Finding Location..." : "Find Toilets Near Me"}
      </Button>
      {coordinates && (
      <div>
        <p>Latitude: {coordinates.latitude}</p>
        <p>Longitude: {coordinates.longitude}</p>
      </div>
    )}
    {error && <p>Error: {error}</p>}  
    </div>
    
  );
}

export default App;