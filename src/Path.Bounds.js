/**
 * Drag handler
 * @class L.Handler.PathScale
 * @extends {L.Handler}
 */
L.Handler.PathBounds = L.Handler.PathDrag.extend({

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
    handlerOptions: {
      radius: 5,
      fillColor: '#fff',
      color: '#555',
      fillOpacity: 1
    },
    boundsOptions: {
      weight: 1,
      opacity: 1,
      dashArray: [3, 3],
      fill: false
    },
    edgesCount: 4
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
     * @type {L.LatLng}
     */
    this._origin   = null;


    /**
     * @type {L.CircleMarker}
     */
    this._originMarker  = null;


    /**
     * @type {L.LayerGroup}
     */
    this._handlersGroup = null;


    /**
     * @type {L.CircleMarker}
     */
    this._marker = null;


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
    return new L.Rectangle(bounds, this.options.boundsOptions);
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
      L.Util.extend(this.options.handlerOptions, {
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

    var counterPart = (marker.options.index + 2) % 4;
    this._originMarker = this._handlers[counterPart];
    this._origin = this._originMarker.getLatLng();
    this._point = marker._point.clone();

    // cache other points
    for (var i = 0, len = this._handlers.length; i < len; i++) {
      var handler = this._handlers[i];
      handler._initialPoint = handler._point.clone();
    }
  },


  /**
   * Dragging
   * @param  {Event} evt
   */
  _onHandlerDrag: function(evt) {},


  /**
   * Update preview
   */
  _update: function() {
    var matrix = this._matrix;

    // update handlers
    for (var i = 0, len = this._handlers.length; i < len; i++) {
      var handler = this._handlers[i];
      if (handler !== this._originMarker) {
        handler._point = matrix.transform(handler._initialPoint);
        handler._updatePath();
      }
    }

    matrix = matrix.clone().flip();

    this._path._applyTransform(matrix._matrix);
    this._bounds._applyTransform(matrix._matrix);
  },


  /**
   * Transform geometries separately
   */
  _transformGeometries: function() {
    var origin = this._origin;
    this._path._resetTransform();
    this._bounds._resetTransform();

    this._transformPoints(this._path, this._matrix, origin);
    this._transformPoints(this._bounds, this._matrix, origin);
  },


  /**
   * Drag stop
   * @param  {Event} evt
   */
  _onHandlerDragEnd: function(evt) {
    var map = this._marker._map;
    var origin = this._origin;

    this._transformGeometries();

    // update handlers
    for (var i = 0, len = this._handlers.length; i < len; i++) {
      var handler = this._handlers[i];
      handler._latlng = map.layerPointToLatLng(handler._point);
      delete handler._initialPoint;
      handler.redraw();
    }

    map.dragging.enable();

    this._marker = null;
    this._origin = null;
    this._originMarker = null;
  },


  /**
   * @param  {L.LatLng} latlng
   * @param  {L.Matrix} matrix
   * @param  {L.Map}    map
   * @param  {Number}   zoom
   * @return {L.LatLng}
   */
  _transformPoint: function(latlng, matrix, map, zoom) {
    return map.unproject(matrix.transform(
      map.project(latlng, zoom)), zoom);
  },


  /**
   * @param  {L.Matrix} matrix
   * @param  {L.Point}  originPoint
   * @return {L.Matrix}
   */
  _getProjectedMatrix: function(matrix, originPoint) {},


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
    var i, len;

    var projectedMatrix = this._projectedMatrix = this._getProjectedMatrix(
      matrix, map.project(origin, zoom));

    // console.time('transform');

    // all shifts are in-place
    if (path._point) { // L.Circle
      path._latlng = this._transformPoint(
        path._latlng, projectedMatrix, map, zoom);
    } else if (path._originalPoints) { // everything else
      for (i = 0, len = path._originalPoints.length; i < len; i++) {
        path._latlngs[i] = this._transformPoint(
          path._latlngs[i], projectedMatrix, map, zoom);
      }
    }

    // holes operations
    if (path._holes) {
      for (i = 0, len = path._holes.length; i < len; i++) {
        for (var j = 0, len2 = path._holes[i].length; j < len2; j++) {
          path._holes[i][j] = this._transformPoint(
            path._holes[i][j], projectedMatrix, map, zoom);
        }
      }
    }

    path.projectLatlngs();
    path._updatePath();

    //console.timeEnd('transform');
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
