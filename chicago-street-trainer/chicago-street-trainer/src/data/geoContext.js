// Simplified geographic context for the Loop: the Chicago River, Lake Michigan
// shoreline, and the major parks. These provide orientation without revealing
// street names. Coordinates are [lng, lat] (GeoJSON order).

export const chicagoRiver = {
  type: "Feature",
  properties: { name: "Chicago River" },
  geometry: {
    type: "LineString",
    coordinates: [
      // Main stem coming from the lake, then the south branch wrapping the Loop's west side
      [-87.6160, 41.8895],
      [-87.6234, 41.8888],
      [-87.6300, 41.8884],
      [-87.6366, 41.8885],
      [-87.6373, 41.8855],
      [-87.6376, 41.8800],
      [-87.6379, 41.8740],
      [-87.6385, 41.8690],
    ],
  },
};

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
        [-87.6175, 41.8650],
        [-87.6180, 41.8700],
        [-87.6178, 41.8760],
        [-87.6172, 41.8820],
        [-87.6162, 41.8870],
        [-87.6150, 41.8905],
      ],
    ],
  },
};

export const parks = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Millennium & Grant Park" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-87.6243, 41.8885],
            [-87.6175, 41.8870],
            [-87.6178, 41.8760],
            [-87.6185, 41.8690],
            [-87.6243, 41.8700],
            [-87.6242, 41.8800],
            [-87.6243, 41.8885],
          ],
        ],
      },
    },
  ],
};
