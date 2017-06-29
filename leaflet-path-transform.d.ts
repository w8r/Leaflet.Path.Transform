declare module L {

  export interface MatrixStatic {
    new (a: number, b: number, c: number, d: number, e: number, f: number): Matrix;
  }

  export var Matrix: MatrixStatic;

  export interface Matrix {

    /**
     * Apply matrix to the point
     */
    transform (point: L.Point): Matrix;

    /**
     * Reverse transformation
     */
    untransform (point: L.Point): Matrix;

    /**
     * Cloen the matrix
     */
    clone (): Matrix;

    /**
     * Set matrix translation component
     */
    translate (translate?: L.Point): Matrix;

    /**
     * Set matrix translation component
     */
    translate (translate?: number): Matrix;

    /**
     * Set scaling component
     */
    scale (ratio: number, origin?: L.Point): Matrix;

    /**
     * Set scaling component
     */
    scale (ratio: L.Point, origin?: L.Point): Matrix;

    /**
     * Set rotation component
     */
    rotate (angle: number, origin?: L.Point): Matrix;
  }

  /**
   * Matrix factory
   */
  export function matrix(a: number, b: number, c: number, d: number, e: number, f: number): Matrix;


  module PathTransform {

    export interface Handle extends L.CircleMarker {
      CursorsByType: string[];
    }

    export interface RotateHandle extends Handle {

    }
  }

  export interface PathTransormOptions {

    /**
     * Is rotation enabled
     */
    rotation?: boolean,

    /**
     * Is scaling enabled
     */
    scaling?:  boolean,

    /**
     * Maximum zoom for reprojection
     */
    maxZoom?:  number,

    /**
     * Corner handler options
     */
    handlerOptions?: L.CircleMarkerOptions,

    /**
     * Rotation handler options
     */
    rotateHandleOptions?: L.CircleMarkerOptions,

    /**
     * Rotation handle length in pixels
     */
    handleLength?: number,

    /**
     * Corner handle class - you can use your own extended marker
     */
    handleClass?:       Object,

    /**
     * Rotation handle class - you can use your own extended marker
     */
    rotateHandleClass?: Object

  }

  namespace Handler {

    export interface PathTransformStatic extends L.Handler {
      new (path: L.Path): PathTransform;
    }

    export var PathTransform: PathTransformStatic;

    export interface PathTransform {

      /**
       * Set options to the handler
       */
      setOptions (options: PathTransormOptions): PathTransform;

      /**
       * Enables handler optionally with new settings
       */
      enable (options?: PathTransormOptions):void;

      /**
       * Disables the handler
       */
      disable (): void;

      /**
       * Rotate the attached path
       */
      rotate (angle: number, origin?: L.Point): PathTransform;

      /**
       * Scale the attached path
       */
      scale (scale: L.Point, origin: L.Point): PathTransform;

      /**
       * Scale the attached path
       */
      scale (scale: number, origin: L.Point): PathTransform;


      /**
       * Apply transformation to the path
       */
      transform (angle: number, scale: L.Point, rotationOrigin?: L.LatLng, scaleOrigin?: L.LatLng): PathTransform;
    }

  }

  namespace LineUtil {
    export function pointOnLine (start:L.Point, final:L.Point, distPx: number): L.Point;
  }

  namespace Util {

    /**
     * Deep merge objects
     */
    export function merge (dest: any, ...sources: any[]): any;
  }
}
