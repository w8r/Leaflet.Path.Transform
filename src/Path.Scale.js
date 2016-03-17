/**
 * Drag handler
 * @class L.Handler.PathScale
 * @extends {L.Handler}
 */
L.Handler.PathScale = L.Handler.PathBounds.extend({

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


  /**
   * @inheritDoc
   */
  _onHandlerDragStart: function(evt) {
    L.Handler.PathBounds.prototype._onHandlerDragStart.call(this, evt);
    this._initialMatrix = this._matrix.clone();

    this._marker._map
      .on('mousemove', this._onHandlerDrag, this)
      .on('mouseup', this._onHandlerDragEnd, this);
    this._initialDist = this._originMarker._point
      .distanceTo(this._marker._point);
  },


  /**
   * Dragging
   * @param  {Event} evt
   */
  _onHandlerDrag: function(evt) {
    var originPoint = this._originMarker._point;
    var ratio = originPoint.distanceTo(evt.layerPoint) / this._initialDist;

    // update matrix
    this._matrix = this._initialMatrix
      .clone()
      .scale(ratio, originPoint);

    this._update();
  },


  /**
   * Drag stop
   * @param  {Event} evt
   */
  _onHandlerDragEnd: function(evt) {
    this._marker._map
      .off('mousemove', this._onHandlerDrag, this)
      .off('mouseup', this._onHandlerDragEnd, this);

    L.Handler.PathBounds.prototype._onHandlerDragEnd.call(this, evt);
  },


  /**
   * @inheritDoc
   */
  _getProjectedMatrix: function(matrix, originPoint) {
    // update matrix
    var scale = matrix.scale();

    return L.matrix(1, 0, 0, 1, originPoint.x, originPoint.y)
        ._add(L.matrix(scale.x, 0, 0, scale.y, 0, 0))
        ._add(L.matrix(1, 0, 0, 1, -originPoint.x, -originPoint.y));
  }


});


L.Path.addInitHook(function() {
  if (this.options.scaleable) {
    this.scaling = new L.Handler.PathScale(this);
  }
});
