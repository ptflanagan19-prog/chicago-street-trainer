// MapLegend: a compact, collapsible key for the map's symbol categories. Lists
// only categories — never street names. Collapses to a button on mobile.

import { useState } from "react";

export default function MapLegend() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`map-legend ${open ? "map-legend--open" : ""}`}>
      <button
        type="button"
        className="map-legend__toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="map-legend-body"
      >
        <span className="map-legend__toggle-icon" aria-hidden="true">
          {open ? "×" : "?"}
        </span>
        <span className="map-legend__toggle-text">Key</span>
      </button>

      <div className="map-legend__body" id="map-legend-body" hidden={!open}>
        <h3 className="map-legend__title">Map key</h3>
        <ul className="map-legend__list">
          <li className="map-legend__item">
            <span className="map-legend__swatch map-legend__swatch--street" />
            Highlighted street
          </li>
          <li className="map-legend__item">
            <span className="map-legend__swatch map-legend__swatch--park" />
            Park
          </li>
          <li className="map-legend__item">
            <span className="map-legend__swatch map-legend__swatch--river" />
            River
          </li>
          <li className="map-legend__item">
            <span className="map-legend__swatch map-legend__swatch--landmark" />
            Landmark
          </li>
        </ul>
      </div>
    </div>
  );
}
