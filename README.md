# Chicago Street Trainer

A browser game for memorizing the streets of the Chicago Loop. A street lights
up on the map; you pick its name from four choices. Built with React + Vite +
Leaflet, no backend.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
```

Production build:

```bash
npm run build
npm run preview
```

## How it works

- **Map** — Leaflet with a free, label-free CARTO basemap. Streets, the Chicago
  River, Lake Michigan, and Grant/Millennium Park are drawn as local vector
  layers so no street labels can give away the answer. The target street is a
  thick amber line; `fitBounds` frames it with surrounding context each round.
- **Quiz** — 10 questions, weighted toward streets you've struggled with.
  Distractors match the target's orientation (north-south vs east-west).
- **Progress** — per-street stats, mastery, and best score persist in
  LocalStorage. Practice Mistakes mode prioritizes streets you've missed.

## Controls

- Number keys **1–4** select an answer.
- **Enter** advances after feedback.

## Street geometry

Loop streets use real-world, simplified straight-segment coordinates anchored on
the Chicago address grid (State & Madison = 0,0). Wacker Drive is modeled as a
multi-segment curve following the river. To upgrade to precise geometry, replace
the `geometry.coordinates` arrays in `src/data/loopStreets.js` (or load
`src/data/loopStreets.geojson`) with OpenStreetMap data — the structure stays
identical.
