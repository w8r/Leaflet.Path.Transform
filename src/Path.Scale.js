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

    this._marker._map
      .on('mousemove', this._onHandlerDrag, this)
      .on('mouseup', this._onHandlerDragEnd, this);
    this._initialDist = L.LineUtil._sqDist(
      this._originMarker._point, this._marker._point);
  },


  /**
   * Dragging
   * @param  {Event} evt
   */
  _onHandlerDrag: function(evt) {
    var originPoint = this._originMarker._point;
    var ratio = Math.sqrt(L.LineUtil._sqDist(
      originPoint, evt.layerPoint) / this._initialDist);

    // update matrix
    this._matrix.scale(ratio).translate(
      new L.Point(originPoint.x - originPoint.x * ratio,
        originPoint.y - originPoint.y * ratio));

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
    var ratio = matrix.scale();
    return matrix
      .clone()
      .translate(
        L.point(originPoint.x - originPoint.x * ratio.x,
          originPoint.y - originPoint.y * ratio.y)
      );
  }


});


L.Path.addInitHook(function() {
  if (this.options.scaleable) {
    this.scaling = new L.Handler.PathScale(this);
  }
});
