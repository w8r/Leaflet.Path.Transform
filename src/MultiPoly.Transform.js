/**
 * Implements scaling/rotation for multi-layer geometries in leaflet 0.7.x
 */
L.Handler.MultiPathTransform = L.Handler.PathTransform.extend({

  /**
   * @inheritDoc
   */
  _applyTransform: function(matrix) {
    this._path.eachLayer(function(layer) {
      layer._applyTransform(matrix._matrix);
    });

    this._rect._applyTransform(matrix._matrix);

    if (this.options.rotation) {
      this._handleLine._applyTransform(matrix._matrix);
    }
  },


  /**
   * @inheritDoc
   */
  _transformGeometries: function() {
    var origin = this._origin;
    this._rect._resetTransform();

    this._path.eachLayer(function(layer) {
      layer._resetTransform();
      this._transformPoints(layer, this._matrix, origin);
    }, this);

    this._transformPoints(this._rect, this._matrix, origin);

    if (this.options.rotation) {
      this._handleLine._resetTransform();
      this._transformPoints(this._handleLine, this._matrix, origin);
    }
  }

});


// init hooks
(function(klasses) {
  function transformInitHook() {
    if (this._options.transform) {
      this.transform = new L.Handler.MultiPathTransform(
        this, this._options.transform);
    }
  }

  for (var i = klasses.length - 1; i >= 0; i--) {
    klasses[i].addInitHook(transformInitHook);
  }

})([L.MultiPolyline, L.MultiPolygon]);
