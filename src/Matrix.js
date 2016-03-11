/**
 * @class  L.Matrix
 *
 * @param {Number} a
 * @param {Number} b
 * @param {Number} c
 * @param {Number} d
 * @param {Number} e
 * @param {Number} f
 */
L.Matrix = function(a, b, c, d, e, f) {

  /**
   * @type {Array.<Number>}
   */
  this._matrix = [a, b, c, d, e, f];
};


L.Matrix.prototype = {


  /**
   * @param  {L.Point} point
   * @return {L.Point}
   */
  transform: function(point) {
    return this._transform(point.clone());
  },


  /**
   * Destructive
   *
   * [ x ] = [ a  b  tx ] [ x ] = [ a * x + b * y + tx ]
   * [ y ] = [ c  d  ty ] [ y ] = [ c * x + d * y + ty ]
   *
   * @param  {L.Point} point
   * @return {L.Point}
   */
  _transform: function(point) {
    var matrix = this._matrix;
    var x = point.x, y = point.y;
    point.x = matrix[0] * x + matrix[1] * y + matrix[4];
    point.y = matrix[2] * x + matrix[3] * y + matrix[5];
    return point;
  },


  /**
   * @param  {L.Point} point
   * @return {L.Point}
   */
  untransform: function (point) {
    var matrix = this._matrix;
    return new L.Point(
      (point.x / matrix[0] - matrix[4]) / matrix[0],
      (point.y / matrix[2] - matrix[5]) / matrix[2]
    );
  },


  /**
   * @return {L.Matrix}
   */
  clone: function() {
    var matrix = this._matrix;
    return new L.Matrix(
      matrix[0], matrix[1], matrix[2],
      matrix[3], matrix[4], matrix[5]
    );
  },


  /**
   * @return {L.Point}
   */
  getTranslate: function() {
    return new L.Point(this._matrix[4], this._matrix[5]);
  },


  /**
   * @param {L.Point|Number} translate
   * @return {L.Matrix}
   */
  setTranslate: function(translate) {
    if (typeof translate === 'number') {
      this._matrix[4] = this._matrix[5] = translate;
    } else {
      this._matrix[4] = translate.x;
      this._matrix[5] = translate.y;
    }
    return this;
  },


  /**
   * @return {L.Pooint}
   */
  getScale: function() {
    return new L.Point(this._matrix[0], this._matrix[3]);
  },


  /**
   * @param {L.Point|Number} scale
   * @return {L.Matrix}
   */
  setScale: function(scale) {
    if (typeof scale === 'number') {
      this._matrix[0] = this._matrix[3] = scale;
    } else {
      this._matrix[0] = scale.x;
      this._matrix[3] = scale.y;
    }
    return this;
  },


  /**
   * @param {Number} angle
   * @return {L.Matrix}
   */
  setRotation: function(angle, origin) {
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    var matrix = this._matrix;

    matrix[0] = cos;
    matrix[1] = sin;
    matrix[2] = -sin;
    matrix[3] = cos;

    return this;
  },


  multiply: function(matrix) {
    var a = this.clone()._matrix;
    var b = matrix._matrix;
    var aNumRows = a._matrix.length;
    var aNumCols = a[0].length,
    var bNumRows = b.length;
    var bNumCols = b[0].length;

    var m = new Array(aNumRows);  // initialize array of rows
    for (var i = 0; i < aNumRows; i++) {
      m[i] = new Array(bNumCols); // initialize the current row
      for (var j = 0; j < bNumCols; j++) {
        m[i][j] = 0;             // initialize the current cell
        for (var k = 0; k < aNumCols; k++) {
          m[i][j] += a[i][k] * b[k][i];
        }
      }
    }
    return m;
}
  }


};
