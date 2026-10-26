import type { Toilet } from "@/types/toilet";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

          {toilet.wheelchair === "yes" && (
            <p>♿ Accessible</p>
          )}

          {toilet.fee === "no" && (
            <p>🆓 Free</p>
          )}

          {toilet.changingTable === "yes" && (
            <p>👶 Baby Changing</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}