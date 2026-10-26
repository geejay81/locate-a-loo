import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  heading: string;
  onFindToilets: () => Promise<void>;
  loading?: boolean;
}

export function HeroSection({
  heading,
  onFindToilets,
  loading = false,
}: HeroSectionProps) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 text-center">
      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-blue-100 p-4">
            <MapPin className="h-10 w-10 text-blue-600" />
          </div>
        </div>

        <div className="space-y-4 md:space-y-8">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            {heading}
          </h1>

          <p className="mx-auto max-w-2xl text-muted-foreground">
            Find nearby public toilets using your current location.
            View them on a map, check available facilities,
            and get directions instantly.
          </p>
        </div>

        <Button
          size="lg"
          onClick={onFindToilets}
          disabled={loading}
          className="gap-2 rounded-2xl bg-blue-800 text-white hover:bg-blue-600 focus:ring-yellow-200"
        >
          <Navigation className="h-4 w-4" />

          {loading
            ? "Finding Toilets..."
            : "Find Nearby Toilets"}
        </Button>
      </div>
    </section>
  );
}