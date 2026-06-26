// LandmarkLayer: renders orientation landmarks (points) and park labels onto
// dedicated Leaflet panes so they sit above parks/streets but below the target
// street glow. Icons are inline SVG in Leaflet divIcons — no icon dependency.
//
// Landmarks are purely informational: their click/drag events are stopped so
// they never interfere with the quiz or map panning.

import { useMemo, useRef } from "react";
import { Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import { loopLandmarks, parkLabels } from "../data/loopLandmarks.js";

// Inline SVG glyphs per landmark type. Kept tiny and high-contrast with a soft
// white halo so they read over both green parks and the light basemap.
const ICONS = {
  building: `<path d="M4 13 L4 5 L8 5 L8 13 Z M9 13 L9 2 L13 2 L13 13 Z" />`,
  fountain: `<circle cx="8" cy="8" r="3.2" /><path d="M8 4.8 L8 2.5 M5.8 6 L4.4 4.6 M10.2 6 L11.6 4.6" stroke-width="1.1" stroke-linecap="round" fill="none" />`,
  museum: `<path d="M8 2 L14 6 L2 6 Z" /><rect x="3.5" y="6.5" width="1.6" height="5" /><rect x="7.2" y="6.5" width="1.6" height="5" /><rect x="10.9" y="6.5" width="1.6" height="5" /><rect x="2" y="12" width="12" height="1.4" />`,
  sculpture: `<ellipse cx="8" cy="8" rx="5" ry="3.4" />`,
  plaza: `<rect x="3" y="3" width="10" height="10" rx="1.5" /><circle cx="8" cy="8" r="2" fill="#EFE9DC" />`,
};

function landmarkDivIcon(landmark) {
  const glyph = ICONS[landmark.type] || ICONS.building;
  const isMajor = landmark.importance === "major";
  const labelDir = landmark.labelDir || "right";
  const showLabel = isMajor;

  const labelHtml = showLabel
    ? `<span class="lm-label lm-label--${labelDir}">${landmark.name}</span>`
    : "";

  const html = `
    <div class="lm-icon lm-icon--${landmark.type} ${isMajor ? "lm-icon--major" : "lm-icon--minor"}">
      <svg viewBox="0 0 16 16" aria-hidden="true">${glyph}</svg>
      ${labelHtml}
    </div>`;

  return L.divIcon({
    className: "lm-divicon",
    html,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

function parkLabelIcon(name) {
  return L.divIcon({
    className: "lm-divicon",
    html: `<span class="park-label">${name}</span>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

export default function LandmarkLayer() {
  const map = useMap();
  const panesReady = useRef(false);

  // Create the landmark pane once. Sits above streets, below target glow.
  if (map && !panesReady.current) {
    if (!map.getPane("landmarkPane")) {
      const pane = map.createPane("landmarkPane");
      pane.style.zIndex = 620;
      pane.style.pointerEvents = "auto";
    }
    panesReady.current = true;
  }

  // Memoize icons so we don't rebuild divIcons on every render.
  const landmarkIcons = useMemo(
    () => loopLandmarks.map((l) => ({ landmark: l, icon: landmarkDivIcon(l) })),
    []
  );
  const parkIcons = useMemo(
    () => parkLabels.map((p) => ({ park: p, icon: parkLabelIcon(p.name) })),
    []
  );

  // Stop landmark interactions from affecting the quiz/map.
  const eventHandlers = useMemo(
    () => ({
      click: (e) => {
        L.DomEvent.stopPropagation(e);
      },
    }),
    []
  );

  return (
    <>
      {parkIcons.map(({ park, icon }) => (
        <Marker
          key={park.id}
          position={park.anchor}
          icon={icon}
          interactive={false}
          keyboard={false}
          pane="landmarkPane"
        />
      ))}

      {landmarkIcons.map(({ landmark, icon }) => (
        <Marker
          key={landmark.id}
          position={landmark.coordinates}
          icon={icon}
          pane="landmarkPane"
          keyboard={true}
          alt={landmark.name}
          eventHandlers={eventHandlers}
          title={landmark.name}
        >
          {landmark.importance !== "major" && (
            <Tooltip direction="top" offset={[0, -8]} opacity={1} className="lm-tooltip">
              {landmark.name}
            </Tooltip>
          )}
        </Marker>
      ))}
    </>
  );
}
