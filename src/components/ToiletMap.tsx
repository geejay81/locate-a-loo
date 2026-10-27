import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import type { Toilet } from "@/types/toilet";
import { Button } from "./ui/button";
import { formatDistance } from "@/lib/utils";
import { toiletIcon, userIcon } from "@/lib/map-icons";

interface ToiletMapProps {
    latitude: number;
    longitude: number;
    toilets: Toilet[];
}

export function ToiletMap({
    latitude,
    longitude,
    toilets,
}: ToiletMapProps) {
    return (
        <MapContainer
            center={[latitude, longitude]}
            zoom={14}
            style={{
                height: "400px",
                width: "100%",
            }}
            className="rounded-lg  ring-1 ring-blue-600 mt-8"
        >
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[latitude, longitude]} icon={userIcon}>
                <Popup>You are here</Popup>
            </Marker>

            {toilets.map((toilet) => (
                <Marker
                    key={toilet.id}
                    position={[
                        toilet.latitude,
                        toilet.longitude,
                    ]}
                    icon={toiletIcon}
                >
                    <Popup>
                        <div className="space-y-6">
                            <p className="font-semibold">
                                {toilet.name}
                            </p>

                            {!!toilet.distance && (
                                <p>
                                {formatDistance(toilet.distance!)} away
                                </p>
                            )}

                            {toilet.wheelchair === "yes" && (
                                <p>♿ Accessible</p>
                            )}

                            {toilet.fee === "no" && (
                                <p>🆓 Free</p>
                            )}

                            {toilet.changingTable === "yes" && (
                                <p>👶 Baby Changing</p>
                            )}

                            <Button asChild size="sm">
                                <a
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${toilet.latitude},${toilet.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Directions
                                </a>
                            </Button>
                        </div>
                    </Popup>

                </Marker>
            ))}
            <FitBounds
                latitude={latitude}
                longitude={longitude}
                toilets={toilets}
            />
        </MapContainer>
    );
}

function FitBounds({
    latitude,
    longitude,
    toilets,
}: {
    latitude: number;
    longitude: number;
    toilets: Toilet[];
}) {
    const map = useMap();

    useEffect(() => {
        if (toilets.length === 0) {
            return;
        }

        const points = [
            [latitude, longitude],
            ...toilets.map((toilet) => [
                toilet.latitude,
                toilet.longitude,
            ]),
        ] as [number, number][];

        const bounds = L.latLngBounds(points);

        map.fitBounds(bounds, {
            padding: [50, 50],
        });
    }, [map, latitude, longitude, toilets]);

    return null;
}