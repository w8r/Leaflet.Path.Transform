/**
 * Drag handler
 * @class L.Handler.PathScale
 * @extends {L.Handler}
 */
L.Handler.PathScale = L.Handler.PathDrag.extend({

  // statics: {
  //   // in the future we might use stretching
  //   HandlerTypes: {
  //     SW: 0,
  //     W:  1,
  //     NW: 2,
  //     N:  3,
  //     NE: 4,
  //     E:  5,
  //     SE: 6,
  //     E:  7
  //   }
  // },

  options: {
    radius: 5,
    fillColor: '#fff',
    color: '#555',
    fillOpacity: 1
  },


  /**
   * @param  {L.Path} layer
   */
  initialize: function(layer) {

    /**
     * @type {L.Polygon}
     */
    this._bounds   = null;


    /**
     * @type {Array.<L.CircleMarker>}
     */
    this._handlers = null;


    /**
     * @type {L.CircleMarker}
     */
    this._origin   = null;


    /**
     * @type {L.LayerGroup}
     */
    this._handlersGroup = null;


    L.Handler.PathDrag.prototype.initialize.call(this, layer);
  },


  /**
   * Add handlers and hooks
   */
  addHooks: function() {
    this._createHandlers();

    this._matrix = new L.Matrix(1, 0, 0, 1, 0, 0);
    this._path
      .on('dragstart', this._onDragStart, this)
      .on('dragend', this._onDragEnd, this);
  },


  /**
   * Remove editing hooks
   */
  removeHooks: function() {
    var map = this._path._map;
    map.removeLayer(this._handlersGroup);

    this._bounds = null;
    this._handlers = [];
    this._handlersGroup = null;

    this._path
      .off('dragstart', this._onDragStart, this)
      .off('dragend', this._onDragEnd, this);
  },


  /**
   * Bounding polygon
   * @return {L.Polygon}
   */
  _getBoundingPolygon: function() {
    var bounds = this._path.getBounds();
    return new L.Rectangle(bounds, {
      weight: 1,
      opacity: 1,
      dashArray: [3, 3],
      fill: false
    });
  },


  /**
   * Interaction handles
   */
  _createHandlers: function() {
    var map = this._path._map;

    this._handlersGroup = new L.LayerGroup().addTo(map);
    this._bounds = this._getBoundingPolygon().addTo(this._handlersGroup);

    this._handlers = [];
    for (var i = 0; i < 4; i++) {
      this._handlers.push(
        this._createHandler(this._bounds._latlngs[i], i * 2, i)
        .addTo(this._handlersGroup));
    }
  },


  /**
   * Create corner marker
   * @param  {L.LatLng} latlng
   * @param  {Number}   type one of L.Handler.PathScale.HandlerTypes
   * @param  {Number}   index
   * @return {L.CircleMarker}
   */
  _createHandler: function(latlng, type, index) {
    var marker = new L.CircleMarker(latlng,
      L.Util.extend(this.options, {
        type: type,
        index: index
      })
    );

    marker.on('mousedown', this._onHandlerDragStart, this);
    return marker;
  },


  /**
   * @param  {Event} evt
   */
  _onHandlerDragStart: function(evt) {
    var marker = evt.target;
    var map = marker._map;

    this._handlersGroup.eachLayer(function(layer) {
      layer.bringToFront();
    });

    map.dragging.disable();

    this._marker = marker;
    map
      .on('mousemove', this._onHandlerDrag, this)
      .on('mouseup', this._onHandlerDragEnd, this);

    var counterPart = (marker.options.index + 2) % this._handlers.length;
    this._origin = this._handlers[counterPart];
    this._point = marker._point.clone();

    // hide other points?
    for (var i = 0, len = this._handlers.length; i < len; i++) {
      var handler = this._handlers[i];
      handler._initialPoint = handler._point.clone();
    }

    this._initialDist = L.LineUtil._sqDist(this._origin._point, marker._point);
  },


  /**
   * Dragging
   * @param  {Event} evt
   */
  _onHandlerDrag: function(evt) {
    var ratio = Math.sqrt(L.LineUtil._sqDist(
      this._origin._point, evt.layerPoint) / this._initialDist);

    var matrix = this._matrix._matrix;
    var originPoint = this._origin._point;

    // update matrix
    this._matrix.setScale(ratio).setTranslate(
      new L.Point(originPoint.x - originPoint.x * ratio,
        originPoint.y - originPoint.y * ratio));

    this._path._applyTransform(matrix);
    this._bounds._applyTransform(matrix);

    // update handlers
    for (var i = 0, len = this._handlers.length; i < len; i++) {
      var handler = this._handlers[i];
      if (handler !== this._origin) {
        handler._point = this._matrix.transform(handler._initialPoint);
        handler._updatePath();
      }
    }
  },


  /**
   * Drag stop
   * @param  {Event} evt
   */
  _onHandlerDragEnd: function(evt) {
    var map = this._marker._map;
    var origin = this._origin.getLatLng();

    this._path._resetTransform();
    this._bounds._resetTransform();

    this._transformPoints(this._path, this._matrix, origin);
    this._transformPoints(this._bounds, this._matrix, origin);

    // update handlers
    for (var i = 0, len = this._handlers.length; i < len; i++) {
      var handler = this._handlers[i];
      handler._latlng = map.layerPointToLatLng(handler._point);
      delete handler._initialPoint;
      handler.redraw();
    }

    map
      .off('mousemove', this._onHandlerDrag, this)
      .off('mouseup', this._onHandlerDragEnd, this);
    map.dragging.enable();

    this._marker = null;
    this._origin = null;
  },


  /**
   * Applies transformation, does it in one sweep for performance,
   * so don't be surprised about the code repetition.
   *
   * @param {L.Path}   path
   * @param {L.Matrix} matrix
   */
  _transformPoints: function(path, matrix, origin) {
    var map = path._map;
    var zoom = map.getMaxZoom();
    var originPoint = map.project(origin, zoom);
    var i, len;

    // update matrix
    var ratio = matrix.getScale();
    var projectedMatrix = matrix
      .clone()
      .setTranslate(
        L.point(originPoint.x - originPoint.x * ratio.x,
          originPoint.y - originPoint.y * ratio.y)
      );

    // console.time('transform');

    // all shifts are in-place
    if (path._point) { // L.Circle
      path._latlng =  map.unproject(projectedMatrix.transform(
          map.project(path._latlng, zoom)), zoom);
    } else if (path._originalPoints) { // everything else
      for (i = 0, len = path._originalPoints.length; i < len; i++) {
        path._latlngs[i] = map.unproject(projectedMatrix.transform(
          map.project(path._latlngs[i], zoom)), zoom);
      }
    }

    // holes operations
    if (path._holes) {
      for (i = 0, len = path._holes.length; i < len; i++) {
        for (var j = 0, len2 = path._holes[i].length; j < len2; j++) {
          path._holes[i][j] = map.unproject(projectedMatrix.transform(
            map.project(path._holes[i][j], zoom)), zoom);
        }
      }
    }

    // console.timeEnd('transform');
    path.projectLatlngs();
    path._updatePath();
  },


  /**
   * Hide all handlers on drag
   * @param  {Event} evt
   */
  _onDragStart: function(evt) {
    this._path._map.removeLayer(this._handlersGroup);
  },



  /**
   * Re-create handlers on drag stop
   */
  _onDragEnd: function() {
    this._createHandlers();
  }

});


L.Path.addInitHook(function() {
  if (this.options.scaleable) {
    this.scaling = new L.Handler.PathScale(this);
  }
});
