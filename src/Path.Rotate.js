
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


    this._rotationOrigin = map.latLngToLayerPoint(new L.LatLng(
      (top.lat + bottom.lat) / 2,
      (top.lng + bottom.lng) / 2
    ));

    this._handlers.push(this._rotationHandler);
  },


  _onRotateStart: function(evt) {
    console.log('rotate start', evt.layerPoint, this._rotationOrigin);
    this._rotationStart = evt.layerPoint;
    this._path._map
      .on('mousemove', this._onRotate, this)
      .on('mouseup', this._onRotateStop, this);

    L.Handler.PathBounds.prototype._onHandlerDragStart.call(this, evt);
    this._origin = null;
  },


  _onRotate: function(evt) {
    var pos = evt.layerPoint;
    var previous = this._rotationStart;
    var origin = this._rotationOrigin;

    // rotation step angle
    var angle = Math.atan2(previous.y - origin.y, previous.x - origin.x) -
                Math.atan2(pos.y - origin.y, pos.x - origin.x);

    this._matrix.setRotation(-angle);
    var scale = this._matrix.getScale();
    this._matrix.setTranslate(new L.Point(
      origin.x - origin.x * scale.x,
      origin.y - origin.y * scale.y
    ));

    console.log(this._rotationOrigin, this._matrix._matrix);

    this._update();
    // console.log(radiansToDegrees(angle));
  },


  _onRotateStop: function(evt) {
    this._path._map
      .off('mousemove', this._onRotate, this)
      .off('mouseup', this._onRotateStop, this);
  }


});


L.Path.addInitHook(function() {
  if (this.options.rotatable) {
    this.rotating = new L.Handler.PathRotate(this);
  }
});
