import type { Toilet } from "@/types/toilet";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { formatDistance } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { MapPin } from "lucide-react";

interface ToiletCardProps {
  toilet: Toilet;
}

export function ToiletCard({
  toilet,
}: ToiletCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold md:text-xl">{toilet.name}</CardTitle>

        <CardDescription className="text-md text-muted-foreground md:text-base">
          <MapPin className="h-4 w-4 text-blue-600 inline-block mr-2" />
            {formatDistance(toilet.distance ?? 0)}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center w-full">
        <div className="flex flex-wrap gap-2">
          {toilet.wheelchair === "yes" && (
            <Badge className="bg-blue-100 text-blue-800 shadow-2xl">♿ Accessible</Badge>
          )}

          {toilet.fee === "no" && (
            <Badge className="bg-green-100 text-green-800 shadow-2xl">🆓 Free</Badge>
          )}

          {toilet.changingTable === "yes" && (
            <Badge className="bg-yellow-100 text-yellow-800 shadow-2xl">👶 Baby Changing</Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-center">
        <Button asChild className="gap-2 rounded-2xl bg-blue-800 text-white hover:bg-blue-600 focus:ring-yellow-200">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${toilet.latitude},${toilet.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Directions
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}