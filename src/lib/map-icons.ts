import L from "leaflet";

export const toiletIcon = L.divIcon({
  html: "🚻",
  className: "text-2xl",
});

export const userIcon = new L.DivIcon({
  html: "📍",
  className: "text-2xl",
  iconSize: [32, 32],
});