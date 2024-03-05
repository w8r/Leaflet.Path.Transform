import { Point } from 'leaflet';

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
export class Matrix {
  constructor(a, b, c, d, e, f) {
    /**
     * @type {Array.<Number>}
     */
    this._matrix = [a, b, c, d, e, f];
  }
  /**
   * @param  {L.Point} point
   * @return {L.Point}
   */
  transform(point) {
    return this._transform(point.clone());
  }

  /**
   * Destructive
   *
   * [ x ] = [ a  b  tx ] [ x ] = [ a * x + b * y + tx ]
   * [ y ] = [ c  d  ty ] [ y ] = [ c * x + d * y + ty ]
   *
   * @param  {L.Point} point
   * @return {L.Point}
   */
  _transform(point) {
    const matrix = this._matrix;
    const x = point.x;
    const y = point.y;
    point.x = matrix[0] * x + matrix[1] * y + matrix[4];
    point.y = matrix[2] * x + matrix[3] * y + matrix[5];
    return point;
  }

  /**
   * @param  {L.Point} point
   * @return {L.Point}
   */
  untransform(point) {
    const matrix = this._matrix;
    return new Point(
      (point.x / matrix[0] - matrix[4]) / matrix[0],
      (point.y / matrix[2] - matrix[5]) / matrix[2],
    );
  }

  /**
   * @return {L.Matrix}
   */
  clone() {
    const matrix = this._matrix;
    return new Matrix(
      matrix[0],
      matrix[1],
      matrix[2],
      matrix[3],
      matrix[4],
      matrix[5],
    );
  }

  /**
   * @param {L.Point=|Number=} translate
   * @return {L.Matrix|L.Point}
   */
  translate(translate) {
    if (translate === undefined) {
      return new Point(this._matrix[4], this._matrix[5]);
    }

    let translateX, translateY;
    if (typeof translate === 'number') {
      translateX = translateY = translate;
    } else {
      translateX = translate.x;
      translateY = translate.y;
    }

    return this._add(1, 0, 0, 1, translateX, translateY);
  }

  /**
   * @param {L.Point=|Number=} scale
   * @return {L.Matrix|L.Point}
   */
  scale(scale, origin) {
    if (scale === undefined) {
      return new Point(this._matrix[0], this._matrix[3]);
    }

    let scaleX, scaleY;
    origin = origin || new Point(0, 0);
    if (typeof scale === 'number') {
      scaleX = scaleY = scale;
    } else {
      scaleX = scale.x;
      scaleY = scale.y;
    }

    return this._add(scaleX, 0, 0, scaleY, origin.x, origin.y)._add(
      1,
      0,
      0,
      1,
      -origin.x,
      -origin.y,
    );
  }

  /**
   * m00  m01  x - m00 * x - m01 * y
   * m10  m11  y - m10 * x - m11 * y
   * @param {Number}   angle
   * @param {L.Point=} origin
   * @return {L.Matrix}
   */
  rotate(angle, origin) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    origin = origin || new Point(0, 0);

    return this._add(cos, sin, -sin, cos, origin.x, origin.y)._add(
      1,
      0,
      0,
      1,
      -origin.x,
      -origin.y,
    );
  }

  /**
   * Invert rotation
   * @return {L.Matrix}
   */
  flip() {
    this._matrix[1] *= -1;
    this._matrix[2] *= -1;
    return this;
  }

  /**
   * @param {Number|L.Matrix} a
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   * @param {Number} e
   * @param {Number} f
   */
  _add(a, b, c, d, e, f) {
    const result = [[], [], []];
    let src = this._matrix;
    const m = [
      [src[0], src[2], src[4]],
      [src[1], src[3], src[5]],
      [0, 0, 1],
    ];
    let other = [
      [a, c, e],
      [b, d, f],
      [0, 0, 1],
    ];
    let val;

    if (a && a instanceof Matrix) {
      src = a._matrix;
      other = [
        [src[0], src[2], src[4]],
        [src[1], src[3], src[5]],
        [0, 0, 1],
      ];
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        val = 0;
        for (let k = 0; k < 3; k++) {
          val += m[i][k] * other[k][j];
        }
        result[i][j] = val;
      }
    }

    this._matrix = [
      result[0][0],
      result[1][0],
      result[0][1],
      result[1][1],
      result[0][2],
      result[1][2],
    ];
    return this;
  }
}

export const matrix = (a, b, c, d, e, f) => new Matrix(a, b, c, d, e, f);
