# 🚽 Locate a Loo

Locate a Loo is a React web application that helps users find nearby public toilets using their current location.

The project was built as a personal portfolio project to explore browser geolocation, mapping technologies, OpenStreetMap data, responsive UI development and modern React tooling.

## Features

- 📍 Uses browser geolocation to determine the user's current location
- 🚻 Finds nearby public toilets using OpenStreetMap data
- 🗺️ Displays toilets on an interactive map
- 📋 Lists nearby facilities sorted by distance
- 🧭 Provides directions via Google Maps
- ♿ Displays available accessibility and facility information where available

## Live Demo

[View the live application](https://YOUR_USERNAME.github.io/locate-a-loo/)

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

### Mapping & Data

- React Leaflet
- Leaflet
- OpenStreetMap
- Overpass API

### Utilities

- geolib

### Hosting

- GitHub Pages

## How It Works

1. The browser requests the user's location using the Geolocation API.
2. Location coordinates are sent to the OpenStreetMap Overpass API.
3. Public toilet amenities (`amenity=toilets`) are retrieved within the configured search radius.
4. Results are displayed on an interactive map and in a searchable list.
5. Users can launch turn-by-turn directions using Google Maps.

## Project Structure

```text
src/
├── components/
├── hooks/
│   └── useGeolocation.ts
├── services/
│   └── overpass.ts
├── types/
│   └── toilet.ts
└── App.tsx
```

## Local Development

Clone the repository:

```bash
git clone https://github.com/geejay81/locate-a-loo.git
```

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

## Data Disclaimer

Locate a Loo relies on community-maintained OpenStreetMap data.

Toilet locations, accessibility details, opening hours, facilities and other metadata may be incomplete, inaccurate or out of date. Information should be independently verified where possible.

This project is intended for demonstration and portfolio purposes and should not be relied upon for emergency, accessibility, medical or time-critical situations.

Data © OpenStreetMap contributors.

## Technical Challenges

During development I explored:

- Browser Geolocation permissions and error handling
- Consuming and mapping OpenStreetMap Overpass API responses
- Rendering geospatial data using Leaflet
- Distance calculations using geographic coordinates
- Static deployment of a React application to GitHub Pages

## Future Enhancements

- Custom map markers
- Search radius selection
- Accessibility filtering
- Opening-hours support
- Search by place name or postcode
- Progressive Web App (PWA) support
- Automated testing with Playwright
