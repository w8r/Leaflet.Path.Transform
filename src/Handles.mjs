import { CircleMarker } from 'leaflet';

/**
 * @const
 * @type {Array}
 */
const CursorsByType = [
  'nesw-resize',
  'nwse-resize',
  'nesw-resize',
  'nwse-resize',
];

/**
 * Marker handler
 * @extends {L.CircleMarker}
 */
export const Handle = CircleMarker.extend({
  options: {
    className: 'leaflet-path-transform-handler',
  },

  onAdd: function (map) {
    CircleMarker.prototype.onAdd.call(this, map);
    if (this._path && this.options.setCursor) {
      // SVG/VML
      this._path.style.cursor = CursorsByType[this.options.index];
    }
  },
});

/**
 * @extends {L.Handler.PathTransform.Handle}
 */
export const RotateHandle = Handle.extend({
  options: {
    className: 'leaflet-path-transform-handler transform-handler--rotate',
  },

  onAdd(map) {
    CircleMarker.prototype.onAdd.call(this, map);
    if (this._path && this.options.setCursor) {
      // SVG/VML
      this._path.style.cursor = 'all-scroll';
    }
  },
});
