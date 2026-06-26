// Orientation landmarks for the Loop map. These are reference points only —
// they never name or imply a street. Coordinates are [latitude, longitude]
// (Leaflet order) to match how the LandmarkLayer consumes them.
//
// `importance: "major"` landmarks get a permanent label; "minor" landmarks
// show their name only on hover/focus. `labelOffset` nudges a label so it
// doesn't collide with the icon or another label.

export const loopLandmarks = [
  {
    id: "willis-tower",
    name: "Willis Tower",
    alternateName: "Sears Tower",
    type: "building",
    coordinates: [41.8788, -87.6359],
    importance: "major",
    minZoom: 13,
    labelDir: "left",
  },
  {
    id: "buckingham-fountain",
    name: "Buckingham Fountain",
    type: "fountain",
    coordinates: [41.8756, -87.6196],
    importance: "major",
    minZoom: 13,
    labelDir: "bottom",
  },
  {
    id: "art-institute",
    name: "Art Institute",
    type: "museum",
    coordinates: [41.8796, -87.6237],
    importance: "major",
    minZoom: 13,
    labelDir: "bottom",
  },
  {
    id: "cloud-gate",
    name: "Cloud Gate",
    type: "sculpture",
    coordinates: [41.8827, -87.6233],
    importance: "major",
    minZoom: 14,
    labelDir: "top",
  },
  {
    id: "board-of-trade",
    name: "Board of Trade",
    type: "building",
    coordinates: [41.8777, -87.6325],
    importance: "minor",
    minZoom: 14,
    labelDir: "right",
  },
  {
    id: "daley-plaza",
    name: "Daley Plaza",
    type: "plaza",
    coordinates: [41.8840, -87.6300],
    importance: "minor",
    minZoom: 14,
    labelDir: "top",
  },
  {
    id: "harold-washington-library",
    name: "Harold Washington Library",
    type: "building",
    coordinates: [41.8763, -87.6285],
    importance: "minor",
    minZoom: 15,
    labelDir: "bottom",
  },
];

// Park polygons that should carry a permanent text label, with a representative
// label anchor point [lat, lng]. The polygons themselves live in
// loopParks.geojson; this just controls where the name is drawn.
export const parkLabels = [
  { id: "grant-park", name: "Grant Park", anchor: [41.8735, -87.6205] },
  { id: "millennium-park", name: "Millennium Park", anchor: [41.8825, -87.6222] },
];
