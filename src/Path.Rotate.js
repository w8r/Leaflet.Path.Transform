
function pointOnLine(start, final, distPx) {
  var ratio = 1 + distPx / start.distanceTo(final);
  return new L.Point(
    start.x + (final.x - start.x) * ratio,
    start.y + (final.y - start.y) * ratio
  );
}


/* Math extensions */
/**
 * Converts degrees to radians.
 *
 * @memberOf Math
 * @param {Number} deg
 * @return {Number}
 */
function degreesToRadians(deg) {
  return (deg * (Math.PI / 180));
}

/**
 * Converts radians to degrees.
 *
 * @memberOf Math
 * @param {Number} rad
 * @return {Number}
 */
function radiansToDegrees(rad) {
  return (rad / (Math.PI / 180));
}


L.Handler.PathRotate = L.Handler.PathScale.extend({


  options: {
    handleLength: 20,
    rotateHandleOptions: {
      weight: 1,
      opacity: 1
    }
  },


  initialize: function(layer) {
    this._handleLine = null;
    this._rotationHandler = null;
    this._rotationOrigin = null;

    L.Handler.PathDrag.prototype.initialize.call(this, layer);
  },


  _createHandlers: function() {
    L.Handler.PathScale.prototype._createHandlers.call(this);

    var map = this._path._map;
    var bounds = this._bounds;
    var bottom = new L.LatLng(bounds._latlngs[0].lat,
      (bounds._latlngs[0].lng + bounds._latlngs[3].lng) / 2);
    var top = new L.LatLng(bounds._latlngs[1].lat,
      (bounds._latlngs[1].lng + bounds._latlngs[2].lng) / 2);

    var handlerPosition = map.layerPointToLatLng(
      pointOnLine(
        map.latLngToLayerPoint(bottom),
        map.latLngToLayerPoint(top), this.options.handleLength)
    );

    this._handlerLine = new L.Polyline([top, handlerPosition],
      this.options.rotateHandleOptions).addTo(this._handlersGroup);
    this._rotationHandler = new L.CircleMarker(handlerPosition,
      this.options.handlerOptions)
      .addTo(this._handlersGroup)
      .on('mousedown', this._onRotateStart, this);
    this._rotationHandler._initialPoint = this._rotationHandler._point.clone();


    this._rotationOriginLatLng = new L.LatLng(
      (top.lat + bottom.lat) / 2,
      (top.lng + bottom.lng) / 2
    );

    this._handlers.push(this._rotationHandler);
  },


  /**
   * @inheritDoc
   */
  _getProjectedMatrix: function(matrix, originPoint) {
    return this._initialMatrix.clone().rotate(this._angle, originPoint).flip();
  },


  /**
   * @inheritDoc
   */
  _transformGeometries: function() {
    L.Handler.PathBounds.prototype._transformGeometries.call(this);

    this._handlerLine._resetTransform();
    this._transformPoints(this._handlerLine, this._matrix, this._rotationOriginLatLng);
  },


  /**
   * Assume we started from scratch
   * @param  {Event} evt
   */
  _onRotateStart: function(evt) {
    this._matrix = new L.Matrix(1, 0, 0, 1, 0, 0);
    this._rotationOrigin = map.latLngToLayerPoint(this._rotationOriginLatLng);
    this._rotationStart = evt.layerPoint;
    this._initialMatrix = this._matrix.clone();
    this._path._map
      .on('mousemove', this._onRotate, this)
      .on('mouseup', this._onRotateStop, this);

    L.Handler.PathBounds.prototype._onHandlerDragStart.call(this, evt);
    this._origin = null;
    this._originMarker = null;
  },


  /**
   * Calculate absolute angle and rotate preview
   * @param  {Object} evt
   */
  _onRotate: function(evt) {
    var pos = evt.layerPoint;
    var previous = this._rotationStart;
    var origin = this._rotationOrigin;

    // rotation step angle
    this._angle = Math.atan2(pos.y - origin.y, pos.x - origin.x) -
                  Math.atan2(previous.y - origin.y, previous.x - origin.x);
    this._matrix = this._initialMatrix
      .clone()
      .rotate(this._angle, origin)
      .flip();

    this._update();
  },


  /**
   * Apply matrix
   * @param  {Event} evt
   */
  _onRotateStop: function(evt) {
    this._path._map
      .off('mousemove', this._onRotate, this)
      .off('mouseup', this._onRotateStop, this);
    this._origin = this._rotationOriginLatLng;
    L.Handler.PathBounds.prototype._onHandlerDragEnd.call(this, evt);
  },


  /**
   * Update preview
   */
  _update: function() {
    L.Handler.PathBounds.prototype._update.call(this);
    this._handlerLine._applyTransform(this._matrix.clone().flip()._matrix);
  }


});


L.Path.addInitHook(function() {
  if (this.options.rotatable) {
    this.rotating = new L.Handler.PathRotate(this);
  }
});
