// Geographic context for the Loop. The river and parks now come from traced
// GeoJSON files (chicagoRiver.json, loopParks.json) for accuracy; the
// lake remains a simple local polygon. All provide orientation without
// revealing street names. Coordinates in the imported files are [lng, lat].

import riverData from "./chicagoRiver.json";
import parksData from "./loopParks.json";

// Accurate Chicago River polygon (main stem + south branch) traced to the
// basemap. Exported as a FeatureCollection.
export const chicagoRiver = riverData;

// Distinct park polygons: Grant, Millennium, Maggie Daley.
export const parks = parksData;

export const lakeMichigan = {
  type: "Feature",
  properties: { name: "Lake Michigan" },
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-87.6150, 41.8905],
        [-87.6000, 41.8905],
        [-87.6000, 41.8650],
        [-87.6168, 41.8650],
        [-87.6172, 41.8700],
        [-87.6168, 41.8760],
        [-87.6160, 41.8820],
        [-87.6152, 41.8870],
        [-87.6150, 41.8905],
      ],
    ],
  },
};
