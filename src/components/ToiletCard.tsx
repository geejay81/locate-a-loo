import type { Toilet } from "@/types/toilet";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

interface ToiletCardProps {
  toilet: Toilet;
}

export function ToiletCard({
  toilet,
}: ToiletCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {toilet.name}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-1 text-sm">
          <p>
            Latitude: {toilet.latitude}
          </p>

          <p>
            Longitude: {toilet.longitude}
          </p>

          <p>
            {(toilet.distance ?? 0).toLocaleString()} metres away
          </p>

          {toilet.wheelchair === "yes" && (
            <p>♿ Accessible</p>
          )}

          {toilet.fee === "no" && (
            <p>🆓 Free</p>
          )}

          {toilet.changingTable === "yes" && (
            <p>👶 Baby Changing</p>
          )}

          <Button asChild>
            <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${toilet.latitude},${toilet.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                Directions
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}