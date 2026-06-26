// GameMap: renders the Loop with a neutral basemap, geographic context layers
// (river, lake, parks), all streets dimmed, and the target street highlighted.
// Uses fitBounds to frame the target with surrounding context on each question.

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

// Convert GeoJSON [lng,lat] line coords to Leaflet [lat,lng] for Polyline.
function toLatLng(coords) {
  return coords.map(([lng, lat]) => [lat, lng]);
}

// Pad a set of latlngs into bounds with a little breathing room.
function boundsForCoords(latlngs) {
  const b = L.latLngBounds(latlngs);
  return b.pad(0.45);
}

function MapController({ targetId, phase }) {
  const map = useMap();
  const target = useMemo(
    () => loopStreets.find((s) => s.id === targetId),
    [targetId]
  );

  // Frame the target street when it changes.
  useEffect(() => {
    if (!map) return;
    if (target?.geometry?.coordinates) {
      try {
        const latlngs = toLatLng(target.geometry.coordinates);
        const b = boundsForCoords(latlngs);
        map.fitBounds(b, {
          maxZoom: 16,
          animate: true,
          padding: [30, 30],
        });
      } catch (err) {
        console.warn("Could not fit bounds to target:", err);
        map.setView(LOOP_CENTER, 14);
      }
    } else {
      map.setView(LOOP_CENTER, 14);
    }
    // Keep map sized correctly after layout changes.
    setTimeout(() => map.invalidateSize(), 50);
  }, [map, target]);

  return null;
}

export default function GameMap({ targetId, phase, revealName }) {
  const target = loopStreets.find((s) => s.id === targetId);

  const lakeStyle = {
    color: "#7FB6D9",
    weight: 0,
    fillColor: "#AFD6EC",
    fillOpacity: 0.85,
  };
  const parkStyle = {
    color: "#9CC58A",
    weight: 0,
    fillColor: "#CDE3BE",
    fillOpacity: 0.8,
  };
  const riverStyle = { color: "#5FA8D3", weight: 5, opacity: 0.9 };

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
        {/* Neutral, label-light basemap (CARTO Positron, no API key). */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap &copy; CARTO'
          subdomains="abcd"
        />

        {/* Context: lake + parks under everything, river above. */}
        <GeoJSON data={lakeMichigan} style={lakeStyle} />
        <GeoJSON data={parks} style={parkStyle} />
        <GeoJSON data={chicagoRiver} style={riverStyle} />

        {/* All non-target streets, dimmed and unlabeled. */}
        {loopStreets.map((s) =>
          s.id === targetId ? null : (
            <Polyline
              key={s.id}
              positions={toLatLng(s.geometry.coordinates)}
              pathOptions={{
                color: "#3A4A5E",
                weight: 3,
                opacity: 0.45,
              }}
            />
          )
        )}

        {/* Target street — bright, thick, with a glow underlay. */}
        {target && (
          <>
            <Polyline
              positions={toLatLng(target.geometry.coordinates)}
              pathOptions={{
                color: "#FFB200",
                weight: 14,
                opacity: 0.25,
                lineCap: "round",
              }}
            />
            <Polyline
              positions={toLatLng(target.geometry.coordinates)}
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

        <MapController targetId={targetId} phase={phase} />
      </MapContainer>

      {/* "You are identifying this street" pin badge */}
      <div className="map-target-badge" aria-hidden="true">
        <span className="map-target-dot" />
        Identify the highlighted street
      </div>

      {revealName && (
        <div className="map-reveal" role="status">
          {revealName}
        </div>
      )}
    </div>
  );
}
