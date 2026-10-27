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
import { MapPin } from "lucide-react";
import TagsList from "./TagsList";

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
        <TagsList toilet={toilet} />
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