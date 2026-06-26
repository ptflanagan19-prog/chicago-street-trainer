// Chicago Loop street dataset.
// Coordinates are [longitude, latitude] pairs (GeoJSON order) using real-world
// Chicago Loop positions. The grid is anchored on State & Madison (0,0 of the
// Chicago address grid). Values are reasonably accurate, simplified to straight
// segments except where a street genuinely curves (Wacker Drive).
//
// To replace this later with precise OpenStreetMap geometry, swap the
// `geometry.coordinates` arrays — the rest of the app reads only `geometry`,
// `name`, `orientation`, etc., so the structure can stay identical.

// Approximate Loop bounding latitudes / longitudes used across the dataset.
// North river ~41.8895, Roosevelt ~41.8674. State St ~ -87.6278.

export const loopStreets = [
  // ---------- NORTH–SOUTH STREETS (run top to bottom) ----------
  {
    id: "michigan-avenue",
    name: "Michigan Avenue",
    section: "loop",
    orientation: "north-south",
    difficulty: 1,
    clue: "The eastern edge of the Loop's street wall, facing Millennium Park and Grant Park.",
    geometry: {
      type: "LineString",
      coordinates: [
        [-87.6243, 41.8895],
        [-87.6242, 41.8674],
      ],
    },
  },
  {
    id: "wabash-avenue",
    name: "Wabash Avenue",
    section: "loop",
    orientation: "north-south",
    difficulty: 2,
    clue: "The 'L' tracks run directly above it, one block west of Michigan.",
    geometry: {
      type: "LineString",
      coordinates: [
        [-87.6262, 41.8889],
        [-87.6261, 41.8674],
      ],
    },
  },
  {
    id: "state-street",
    name: "State Street",
    section: "loop",
    orientation: "north-south",
    difficulty: 1,
    clue: "That great street — the east-west baseline of Chicago's address grid.",
    geometry: {
      type: "LineString",
      coordinates: [
        [-87.6278, 41.8889],
        [-87.6277, 41.8674],
      ],
    },
  },
  {
    id: "dearborn-street",
    name: "Dearborn Street",
    section: "loop",
    orientation: "north-south",
    difficulty: 2,
    clue: "Lined with landmark towers and the Daley Plaza Picasso, one block west of State.",
    geometry: {
      type: "LineString",
      coordinates: [
        [-87.6296, 41.8889],
        [-87.6295, 41.8674],
      ],
    },
  },
  {
    id: "clark-street",
    name: "Clark Street",
    section: "loop",
    orientation: "north-south",
    difficulty: 2,
    clue: "Passes between City Hall and the County Building in the civic core.",
    geometry: {
      type: "LineString",
      coordinates: [
        [-87.6312, 41.8889],
        [-87.6311, 41.8674],
      ],
    },
  },
  {
    id: "lasalle-street",
    name: "LaSalle Street",
    section: "loop",
    orientation: "north-south",
    difficulty: 2,
    clue: "Chicago's financial canyon, terminating at the Board of Trade building.",
    geometry: {
      type: "LineString",
      coordinates: [
        [-87.6325, 41.8889],
        [-87.6324, 41.8674],
      ],
    },
  },
  {
    id: "wells-street",
    name: "Wells Street",
    section: "loop",
    orientation: "north-south",
    difficulty: 3,
    clue: "The Brown and Purple 'L' lines run overhead on its western edge of downtown.",
    geometry: {
      type: "LineString",
      coordinates: [
        [-87.6340, 41.8889],
        [-87.6339, 41.8674],
      ],
    },
  },
  {
    id: "franklin-street",
    name: "Franklin Street",
    section: "loop",
    orientation: "north-south",
    difficulty: 3,
    clue: "A western Loop street just before the river bends in.",
    geometry: {
      type: "LineString",
      coordinates: [
        [-87.6355, 41.8878],
        [-87.6354, 41.8674],
      ],
    },
  },
  {
    id: "columbus-drive",
    name: "Columbus Drive",
    section: "loop",
    orientation: "north-south",
    difficulty: 3,
    clue: "Cuts through Grant Park east of Michigan, near Buckingham Fountain.",
    geometry: {
      type: "LineString",
      coordinates: [
        [-87.6212, 41.8885],
        [-87.6211, 41.8720],
      ],
    },
  },

  // ---------- EAST–WEST STREETS (run left to right) ----------
  {
    id: "lake-street",
    name: "Lake Street",
    section: "loop",
    orientation: "east-west",
    difficulty: 2,
    clue: "The northern 'L' rail street forming the top of the elevated Loop.",
    geometry: {
      type: "LineString",
      coordinates: [
        [-87.6360, 41.8856],
        [-87.6235, 41.8857],
      ],
    },
  },
  {
    id: "randolph-street",
    name: "Randolph Street",
    section: "loop",
    orientation: "east-west",
    difficulty: 2,
    clue: "The theater and restaurant row along the north edge of the Loop.",
    geometry: {
      type: "LineString",
      coordinates: [
        [-87.6360, 41.8847],
        [-87.6225, 41.8848],
      ],
    },
  },
  {
    id: "washington-street",
    name: "Washington Street",
    section: "loop",
    orientation: "east-west",
    difficulty: 2,
    clue: "Runs past Daley Plaza and the Chicago Cultural Center.",
    geometry: {
      type: "LineString",
      coordinates: [
        [-87.6360, 41.8833],
        [-87.6230, 41.8834],
      ],
    },
  },
  {
    id: "madison-street",
    name: "Madison Street",
    section: "loop",
    orientation: "east-west",
    difficulty: 1,
    clue: "The north-south baseline of the address grid; crosses State at zero-zero.",
    geometry: {
      type: "LineString",
      coordinates: [
        [-87.6360, 41.8820],
        [-87.6230, 41.8821],
      ],
    },
  },
  {
    id: "monroe-street",
    name: "Monroe Street",
    section: "loop",
    orientation: "east-west",
    difficulty: 2,
    clue: "Runs toward the Art Institute and into Millennium Park on the east.",
    geometry: {
      type: "LineString",
      coordinates: [
        [-87.6360, 41.8807],
        [-87.6225, 41.8808],
      ],
    },
  },
  {
    id: "adams-street",
    name: "Adams Street",
    section: "loop",
    orientation: "east-west",
    difficulty: 2,
    clue: "Historic start of Route 66, leading west out of the Loop past Union Station.",
    geometry: {
      type: "LineString",
      coordinates: [
        [-87.6360, 41.8794],
        [-87.6230, 41.8795],
      ],
    },
  },
  {
    id: "jackson-boulevard",
    name: "Jackson Boulevard",
    section: "loop",
    orientation: "east-west",
    difficulty: 2,
    clue: "A boulevard passing the Board of Trade and the Willis Tower entrance.",
    geometry: {
      type: "LineString",
      coordinates: [
        [-87.6360, 41.8781],
        [-87.6228, 41.8782],
      ],
    },
  },
  {
    id: "van-buren-street",
    name: "Van Buren Street",
    section: "loop",
    orientation: "east-west",
    difficulty: 3,
    clue: "The southern 'L' rail street closing the bottom of the elevated Loop.",
    geometry: {
      type: "LineString",
      coordinates: [
        [-87.6358, 41.8768],
        [-87.6232, 41.8769],
      ],
    },
  },
  {
    id: "ida-b-wells-drive",
    name: "Ida B. Wells Drive",
    section: "loop",
    orientation: "east-west",
    difficulty: 3,
    clue: "Formerly Congress Parkway; the wide eastbound gateway under the Old Post Office.",
    geometry: {
      type: "LineString",
      coordinates: [
        [-87.6358, 41.8757],
        [-87.6235, 41.8758],
      ],
    },
  },
  {
    id: "harrison-street",
    name: "Harrison Street",
    section: "loop",
    orientation: "east-west",
    difficulty: 3,
    clue: "Marks the south end of the Loop near Printers Row.",
    geometry: {
      type: "LineString",
      coordinates: [
        [-87.6350, 41.8743],
        [-87.6240, 41.8744],
      ],
    },
  },
  {
    id: "roosevelt-road",
    name: "Roosevelt Road",
    section: "loop",
    orientation: "east-west",
    difficulty: 2,
    clue: "The Loop's southern boundary, running toward the Museum Campus.",
    geometry: {
      type: "LineString",
      coordinates: [
        [-87.6345, 41.8674],
        [-87.6235, 41.8675],
      ],
    },
  },

  // ---------- WACKER DRIVE (curves with the river) ----------
  // Wacker wraps the Loop's north and west edges, changing orientation as it
  // follows the Chicago River. Modeled as a multi-segment L-shaped curve.
  {
    id: "wacker-drive",
    name: "Wacker Drive",
    section: "loop",
    orientation: "curved",
    difficulty: 3,
    clue: "Wraps the river along the Loop's north and west edges, changing direction as it bends.",
    geometry: {
      type: "LineString",
      coordinates: [
        [-87.6234, 41.8879], // East Wacker near Michigan
        [-87.6300, 41.8880],
        [-87.6360, 41.8882], // North Wacker bend
        [-87.6369, 41.8860],
        [-87.6372, 41.8820], // West Wacker heading south
        [-87.6370, 41.8785],
      ],
    },
  },
];

// Quick lookup helpers
export const streetsById = loopStreets.reduce((acc, s) => {
  acc[s.id] = s;
  return acc;
}, {});

export const getStreetById = (id) => streetsById[id];

// Loop playable bounds (Leaflet order: [lat, lng]) with a little padding.
export const LOOP_BOUNDS = [
  [41.8650, -87.6395], // south-west
  [41.8905, -87.6195], // north-east
];

export const LOOP_CENTER = [41.8785, -87.6295];
