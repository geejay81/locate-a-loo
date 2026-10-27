export interface Toilet {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  building?: string;
  openingHours?: string;
  wheelchair?: string;
  fee?: string;
  changingTable?: string;
  distance?: number;
}