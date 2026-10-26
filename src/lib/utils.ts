export { cn } from "cn"

export function formatDistance(distance: number): string {
  if (distance < 1000) {
    return `${distance} m`;
  } else {
    return `${(distance / 1000).toFixed(1)} km`;
  }
}
