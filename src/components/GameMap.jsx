// GameMap: renders the Loop with a neutral basemap, geographic context layers
// (lake, river, parks), orientation landmarks, all streets dimmed, and the
// target street highlighted. Uses Leaflet panes for strict back-to-front layer
// ordering, and fitBounds (capped maxZoom) to keep context visible.

import { useEffect, useMemo, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { loopStreets, LOOP_BOUNDS, LOOP_CENTER } from "../data/loopStreets.js";
import { chicagoRiver, lakeMichigan, parks } from "../data/geoContext.js";
import LandmarkLayer from "./LandmarkLayer.jsx";
import MapLegend from "./MapLegend.jsx";

// Convert GeoJSON [lng,lat] line coords to Leaflet [lat,lng] for Polyline.
function toLatLng(coords) {
  return coords.map(([lng, lat]) => [lat, lng]);
}

// Pad a set of latlngs into bounds with a little breathing room.
function boundsForCoords(latlngs) {
  const b = L.latLngBounds(latlngs);
  return b.pad(0.55);
}

// Create custom panes once so layers stack in a deliberate order:
// geography (lake/river) < parks < streets < landmarks < target glow < target.
function PaneSetup() {
  const map = useMap();
  const done = useRef(false);
  if (map && !done.current) {
    const panes = [
      ["geographyPane", 410],
      ["parkPane", 420],
      ["streetPane", 430],
      ["landmarkPane", 620],
      ["targetGlowPane", 640],
      ["targetStreetPane", 650],
    ];
    panes.forEach(([name, z]) => {
      if (!map.getPane(name)) {
        const p = map.createPane(name);
        p.style.zIndex = z;
        if (name !== "landmarkPane") p.style.pointerEvents = "none";
      }
    });
    done.current = true;
  }
  return null;
}

function MapController({ targetId }) {
  const map = useMap();
  const target = useMemo(
    () => loopStreets.find((s) => s.id === targetId),
    [targetId]
  );

  // Frame the target street when it changes. Capped maxZoom keeps orientation
  // landmarks and geography in view rather than zooming in too tight.
  useEffect(() => {
    if (!map) return;
    if (target?.geometry?.coordinates) {
      try {
        const latlngs = toLatLng(target.geometry.coordinates);
        const b = boundsForCoords(latlngs);
        map.fitBounds(b, {
          maxZoom: 15,
          animate: true,
          padding: [34, 34],
        });
      } catch (err) {
        console.warn("Could not fit bounds to target:", err);
        map.setView(LOOP_CENTER, 14);
      }
    } else {
      map.setView(LOOP_CENTER, 14);
    }
    setTimeout(() => map.invalidateSize(), 50);
  }, [map, target]);

  return null;
}

export default function GameMap({ targetId, phase, revealName }) {
  const target = loopStreets.find((s) => s.id === targetId);

  const lakeStyle = {
    color: "#7FB6D9",
    weight: 0,
    fillColor: "#AECEE0",
    fillOpacity: 0.85,
    pane: "geographyPane",
  };
  const riverStyle = {
    color: "#6FA8C9",
    weight: 1,
    fillColor: "#9CC4DC",
    fillOpacity: 0.92,
    pane: "geographyPane",
  };
  const parkStyle = {
    color: "#9CC58A",
    weight: 0,
    fillColor: "#CFE3BD",
    fillOpacity: 0.75,
    pane: "parkPane",
  };

  return (
    <div className="map-wrap">
      <MapContainer
        center={LOOP_CENTER}
        zoom={14}
        className="leaflet-root"
        maxBounds={LOOP_BOUNDS}
        maxBoundsViscosity={0.9}
        minZoom={13}
        maxZoom={17}
        zoomControl={true}
        attributionControl={true}
      >
        <PaneSetup />

        {/* Neutral, label-light basemap (CARTO Positron, no API key). */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap &copy; CARTO'
          subdomains="abcd"
        />

        {/* Geography: lake + river (geographyPane), parks (parkPane). */}
        <GeoJSON data={lakeMichigan} style={lakeStyle} />
        <GeoJSON data={chicagoRiver} style={riverStyle} />
        <GeoJSON data={parks} style={parkStyle} />

        {/* Landmarks (landmarkPane) — orientation aids, no street names. */}
        <LandmarkLayer />

        {/* All non-target streets, dimmed and unlabeled (streetPane). */}
        {loopStreets.map((s) =>
          s.id === targetId ? null : (
            <Polyline
              key={s.id}
              positions={toLatLng(s.geometry.coordinates)}
              pane="streetPane"
              pathOptions={{
                color: "#3A4A5E",
                weight: 3,
                opacity: 0.4,
              }}
            />
          )
        )}

        {/* Target street — glow underlay then bright main line, top panes. */}
        {target && (
          <>
            <Polyline
              positions={toLatLng(target.geometry.coordinates)}
              pane="targetGlowPane"
              pathOptions={{
                color: "#FFB200",
                weight: 14,
                opacity: 0.25,
                lineCap: "round",
              }}
            />
            <Polyline
              positions={toLatLng(target.geometry.coordinates)}
              pane="targetStreetPane"
              pathOptions={{
                color: "#FFB200",
                weight: 6,
                opacity: 1,
                lineCap: "round",
              }}
              className="target-street-line"
            />
          </>
        )}

        <MapController targetId={targetId} />
      </MapContainer>

      <div className="map-target-badge" aria-hidden="true">
        <span className="map-target-dot" />
        Identify the highlighted street
      </div>

      <MapLegend />

      {revealName && (
        <div className="map-reveal" role="status">
          {revealName}
        </div>
      )}
    </div>
  );
}
