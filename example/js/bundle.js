(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var L = require('leaflet');
var DragHandler = require('../../index');

L.Icon.Default.imagePath = "http://cdn.leafletjs.com/leaflet-0.7/images";

////////////////////////////////////////////////////////////////////////////////
var map = global.map = new L.Map('map', {
  // crs: L.CRS.EPSG4326 // that was tested as well
}).setView([22.42658, 114.1952], 11);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; ' +
    '<a href="http://osm.org/copyright">OSM</a> contributors'
}).addTo(map);

////////////////////////////////////////////////////////////////////////////////
function interpolateArr(array, insert) {
  var res = [];
  array.forEach(function(p, i, arr) {
    res.push(p.concat());

    if (i < arr.length - 1) {
      var diff = [arr[i + 1][0] - p[0], arr[i + 1][1] - p[1]];
      for (var i = 1; i < insert; i++) {
        res.push([p[0] + (diff[0] * i) / insert, p[1] + (diff[1] * i) / insert]);
      }
    }
  });

  return res;
}

////////////////////////////////////////////////////////////////////////////////
var polygon = global.polygon = new L.Polygon(
  L.GeoJSON.coordsToLatLngs(

    // ~ 13 000 points
    interpolateArr([
      [113.97697448730469, 22.403410892712124],
      [113.98658752441405, 22.38373008592495],
      [114.01268005371094, 22.369126397545887],
      [114.02778625488281, 22.38563480185718],
      [114.04701232910156, 22.395157990290755],
      [114.06005859375,    22.413567638369805],
      [114.06280517578125, 22.432609534876796],
      [114.04838562011717, 22.444668051657157],
      [114.04289245605469, 22.44847578656544],
      [114.03259277343749, 22.444668051657157],
      [114.01954650878906, 22.447206553211814],
      [113.99620056152344, 22.436417600763114],
      [113.98178100585938, 22.420549970290875],
      [113.97697448730469, 22.403410892712124]
    ], 1000)
  ), {
    color: '#f00',
    draggable: true,
    transform: true
  }).addTo(map);
//polygon.transform.enable();

var polyline = global.polyline = new L.Polyline(
  L.GeoJSON.coordsToLatLngs([
    [114.14314270019531, 22.49479484975443],
    [114.1534423828125,  22.485912942320958],
    [114.15206909179688, 22.4732235144781],
    [114.14932250976561, 22.459898363943893],
    [114.15962219238281, 22.447206553211814],
    [114.169921875,      22.447206553211814],
    [114.19395446777344, 22.459898363943893],
    [114.20631408691406, 22.46116748110935],
    [114.21180725097655, 22.473858013487614],
    [114.22416687011719, 22.471320000009992],
    [114.23721313476562, 22.476395980457973],
    [114.24201965332031, 22.49352604073722],
    [114.2303466796875,  22.51572851830351],
    [114.21798706054688, 22.524608511026262],
    [114.20768737792969, 22.524608511026262],
    [114.20768737792969, 22.536024805886974]
  ]), {
    weight: 15,
    draggable: true,
    transform: true
  })
  .bindPopup("L.Polyline")
  .addTo(map);
// polyline.transform.enable();


var polygonWithHole = global.polygonWithHole = new L.Polygon(
    [
      L.GeoJSON.coordsToLatLngs([
        [114.2749786376953,  22.412932863517717],
        [114.28390502929688, 22.40087159030595],
        [114.29008483886717, 22.38880927045556],
        [114.30107116699219, 22.382460260815716],
        [114.31892395019531, 22.391983666602783],
        [114.32304382324219, 22.380555501421533],
        [114.34295654296875, 22.372936203113838],
        [114.334716796875,   22.384364994133303],
        [114.33059692382812, 22.393888269511194],
        [114.32167053222655, 22.40087159030595],
        [114.32785034179688, 22.413567638369805],
        [114.33197021484375, 22.42499308964722],
        [114.32579040527344, 22.430705462748918],
        [114.33197021484375, 22.43959090917266],
        [114.33746337890624, 22.449110398886106],
        [114.33540344238281, 22.461802035333992],
        [114.32510375976562, 22.464340223177118],
        [114.32922363281249, 22.472589012561954],
        [114.32373046875,    22.477030464933307],
        [114.31961059570312, 22.478933900916928],
        [114.3017578125,     22.466243833549445],
        [114.30244445800781, 22.457360094750083],
        [114.29283142089844, 22.454821779075832],
        [114.28390502929688, 22.45101421842269],
        [114.2749786376953,  22.442764145001707],
        [114.29077148437499, 22.428166659279615],
        [114.27703857421875, 22.420549970290875],
        [114.2749786376953,  22.412932863517717]
      ]),
      L.GeoJSON.coordsToLatLngs([
        [114.30107116699219, 22.43387890178297],
        [114.29351806640625, 22.414202410321302],
        [114.30587768554686, 22.408489358342635],
        [114.32235717773438, 22.421184710331858],
        [114.30107116699219, 22.43387890178297]
      ])
    ], {
      draggable: true,
      transform: true
    }
  )
  .addTo(map);
//polygonWithHole.transform.enable();

var multiPolygon = global.multiPolygon = new L.Polygon([
  L.GeoJSON.coordsToLatLngs([
    [114.20562744140625, 22.32085984100593],
    [114.21592712402344, 22.35261603551215],
    [114.26467895507812, 22.351345926606957],
    [114.2749786376953,  22.32403578584038],
    [114.29214477539062, 22.32721165838893],
    [114.3017578125,     22.311966810977616],
    [114.29420471191406, 22.291002427735325],
    [114.29351806640625, 22.272576585413475],
    [114.28390502929688, 22.26177410097435],
    [114.268798828125,   22.281472122783818],
    [114.2749786376953,  22.294814367780518],
    [114.26948547363281, 22.30243793590448],
    [114.27017211914062, 22.31514295816939],
    [114.2578125,        22.311966810977616],
    [114.24751281738281, 22.299896792751927],
    [114.24545288085938, 22.291002427735325],
    [114.22966003417969, 22.307520083522476],
    [114.22073364257812, 22.305614299837046],
    [114.20562744140625, 22.32085984100593]
  ]),
  L.GeoJSON.coordsToLatLngs([
    [114.31549072265625, 22.33927931468312],
    [114.32029724121094, 22.326576489662482],
    [114.32991027832031, 22.326576489662482],
    [114.33334350585938, 22.332292904091716],
    [114.32304382324219, 22.3424548401465],
    [114.31549072265625, 22.33927931468312]
  ]),
  L.GeoJSON.coordsToLatLngs([
    [114.27909851074219, 22.244615500323064],
    [114.28115844726562, 22.251606295132948],
    [114.28665161132812, 22.255419308858556],
    [114.29969787597656, 22.26113863474449],
    [114.2962646484375,  22.250970782750866],
    [114.29489135742188, 22.24080219246335],
    [114.29008483886717, 22.238895499613232],
    [114.27909851074219, 22.244615500323064]
  ])
], {
  draggable: true,
  transform: true,
  color: '#092'
}).bindPopup('MultiPolygon').addTo(map);
//multiPolygon.transform.enable();

var multiPolyline = global.multiPolyline = new L.Polyline([
  L.GeoJSON.coordsToLatLngs([
    [113.89869689941406, 22.399601921706953],
    [113.89801025390625, 22.422454181709707],
    [113.90350341796875, 22.43324421978117],
    [113.90968322753906, 22.449110398886106],
    [113.90693664550781, 22.478299425162852],
    [113.9234161376953,  22.488450688325408],
    [113.9337158203125,  22.483375149789623],
    [113.9447021484375,  22.492257220085193],
    [113.95225524902344, 22.51255695405145]
  ]),

  L.GeoJSON.coordsToLatLngs([
    [113.8677978515625,  22.39261853713738],
    [113.86917114257811, 22.42753195115699],
    [113.9234161376953,  22.462436586653148],
    [113.94813537597656, 22.473858013487614],
    [113.9783477783203,  22.49923558968306],
    [113.99688720703125, 22.51192263246886],
    [114.01336669921875, 22.501138720300254],
    [114.02503967285155, 22.508116641853675]
  ])
], {
  draggable: true,
  transform: true,
  color: '#e90'
}).bindPopup('MultiPolyline').addTo(map);
// multiPolyline.transform.enable();

var layers = [polygon, polyline, multiPolyline, multiPolygon, polygonWithHole];

function update() {
  L.Util.requestAnimFrame(function() {
    var dragging = document.querySelector('#dragging').checked;
    var scaling = document.querySelector('#scaling').checked;
    var rotation = document.querySelector('#rotation').checked;

    layers.forEach(function(layer) {

      if (layer.dragging) {
        layer.dragging[dragging ? 'enable': 'disable']();
      } else {
        layer.eachLayer(function(sublayer) {
          sublayer.dragging[dragging ? 'enable': 'disable']();
        });
      }


      layer.transform.setOptions({
        scaling: scaling,
        rotation: rotation
      }).enable();
    });
  });
}

[].slice.call(document.querySelectorAll('input[type=checkbox]'))
.forEach(function(checkbox) {
  L.DomEvent.on(checkbox, 'change', update);
});

update();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../index":2,"leaflet":9}],2:[function(require,module,exports){
(function (global){
var L = global.L || require('leaflet');
require('leaflet-path-drag');
require('./src/Util');
require('./src/Matrix');
require('./src/Path.Transform');

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./src/Matrix":10,"./src/Path.Transform":11,"./src/Util":12,"leaflet":9,"leaflet-path-drag":3}],3:[function(require,module,exports){
require('./src/SVG');
require('./src/SVG.VML');
require('./src/Canvas');
require('./src/Path.Transform');
require('./src/Path.Drag');

module.exports = L.Path.Drag;

},{"./src/Canvas":4,"./src/Path.Drag":5,"./src/Path.Transform":6,"./src/SVG":8,"./src/SVG.VML":7}],4:[function(require,module,exports){
L.Util.trueFn = function() {
  return true;
};

L.Canvas.include({

  /**
   * Do nothing
   * @param  {L.Path} layer
   */
  _resetTransformPath: function(layer) {
    if (!this._containerCopy) {
      return;
    }

    delete this._containerCopy;

    if (layer._containsPoint_) {
      layer._containsPoint = layer._containsPoint_;
      delete layer._containsPoint_;

      this._requestRedraw(layer);
      this._draw(true);
    }
  },

  /**
   * Algorithm outline:
   *
   * 1. pre-transform - clear the path out of the canvas, copy canvas state
   * 2. at every frame:
   *    2.1. save
   *    2.2. redraw the canvas from saved one
   *    2.3. transform
   *    2.4. draw path
   *    2.5. restore
   *
   * @param  {L.Path} layer
   * @param  {Array.<Number>} matrix
   */
  transformPath: function(layer, matrix) {
    var copy = this._containerCopy;
    var ctx = this._ctx;
    var m = L.Browser.retina ? 2 : 1;
    var bounds = this._bounds;
    var size = bounds.getSize();
    var pos = bounds.min;

    if (!copy) {
      copy = this._containerCopy = document.createElement('canvas');
      document.body.appendChild(copy);

      copy.width = m * size.x;
      copy.height = m * size.y;

      layer._removed = true;
      this._redraw();

      copy.getContext('2d').translate(m * bounds.min.x, m * bounds.min.y);
      copy.getContext('2d').drawImage(this._container, 0, 0);
      this._initPath(layer);
      layer._containsPoint_ = layer._containsPoint;
      layer._containsPoint = L.Util.trueFn;
    }

    ctx.save();
    ctx.clearRect(pos.x, pos.y, size.x * m, size.y * m);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.restore();
    ctx.save();

    ctx.drawImage(this._containerCopy, 0, 0, size.x, size.y);
    ctx.transform.apply(ctx, matrix);

    var layers = this._layers;
    this._layers = {};

    this._initPath(layer);
    layer._updatePath();

    this._layers = layers;
    ctx.restore();
  }

});

},{}],5:[function(require,module,exports){
/**
 * Drag handler
 * @class L.Path.Drag
 * @extends {L.Handler}
 */
L.Handler.PathDrag = L.Handler.extend( /** @lends  L.Path.Drag.prototype */ {

  statics: {
    DRAGGING_CLS: 'leaflet-path-draggable',
  },


  /**
   * @param  {L.Path} path
   * @constructor
   */
  initialize: function(path) {

    /**
     * @type {L.Path}
     */
    this._path = path;

    /**
     * @type {Array.<Number>}
     */
    this._matrix = null;

    /**
     * @type {L.Point}
     */
    this._startPoint = null;

    /**
     * @type {L.Point}
     */
    this._dragStartPoint = null;

    /**
     * @type {Boolean}
     */
    this._mapDraggingWasEnabled = false;

  },

  /**
   * Enable dragging
   */
  addHooks: function() {
    this._path.on('mousedown', this._onDragStart, this);

    this._path.options.className = this._path.options.className ?
        (this._path.options.className + ' ' + L.Handler.PathDrag.DRAGGING_CLS) :
         L.Handler.PathDrag.DRAGGING_CLS;

    if (this._path._path) {
      L.DomUtil.addClass(this._path._path, L.Handler.PathDrag.DRAGGING_CLS);
    }
  },

  /**
   * Disable dragging
   */
  removeHooks: function() {
    this._path.off('mousedown', this._onDragStart, this);

    this._path.options.className = this._path.options.className
      .replace(new RegExp('\\s+' + L.Handler.PathDrag.DRAGGING_CLS), '');
    if (this._path._path) {
      L.DomUtil.removeClass(this._path._path, L.Handler.PathDrag.DRAGGING_CLS);
    }
  },

  /**
   * @return {Boolean}
   */
  moved: function() {
    return this._path._dragMoved;
  },

  /**
   * Start drag
   * @param  {L.MouseEvent} evt
   */
  _onDragStart: function(evt) {
    var eventType = evt.originalEvent._simulated ? 'touchstart' : evt.originalEvent.type;

    this._mapDraggingWasEnabled = false;
    this._startPoint = evt.containerPoint.clone();
    this._dragStartPoint = evt.containerPoint.clone();
    this._matrix = [1, 0, 0, 1, 0, 0];
    L.DomEvent.stop(evt.originalEvent);

    L.DomUtil.addClass(this._path._renderer._container, 'leaflet-interactive');
    L.DomEvent
      .on(document, L.Draggable.MOVE[eventType], this._onDrag, this)
      .on(document, L.Draggable.END[eventType], this._onDragEnd, this);

    if (this._path._map.dragging.enabled()) {
      // I guess it's required because mousdown gets simulated with a delay
      this._path._map.dragging._draggable._onUp();

      this._path._map.dragging.disable();
      this._mapDraggingWasEnabled = true;
    }
    this._path._dragMoved = false;

    if (this._path._popup) { // that might be a case on touch devices as well
      this._path._popup._close();
    }

    this._replaceCoordGetters(evt);
  },

  /**
   * Dragging
   * @param  {L.MouseEvent} evt
   */
  _onDrag: function(evt) {
    L.DomEvent.stop(evt);

    var first = (evt.touches && evt.touches.length >= 1 ? evt.touches[0] : evt);
    var containerPoint = this._path._map.mouseEventToContainerPoint(first);

    var x = containerPoint.x;
    var y = containerPoint.y;

    var dx = x - this._startPoint.x;
    var dy = y - this._startPoint.y;

    if (!this._path._dragMoved && (dx || dy)) {
      this._path._dragMoved = true;
      this._path.fire('dragstart', evt);
      // we don't want that to happen on click
      this._path.bringToFront();
    }

    this._matrix[4] += dx;
    this._matrix[5] += dy;

    this._startPoint.x = x;
    this._startPoint.y = y;

    this._path.fire('predrag', evt);
    this._path._transform(this._matrix);
    this._path.fire('drag', evt);
  },

  /**
   * Dragging stopped, apply
   * @param  {L.MouseEvent} evt
   */
  _onDragEnd: function(evt) {
    L.DomEvent.stop(evt);
    L.DomEvent._fakeStop({ type: 'click' });

    var containerPoint = this._path._map.mouseEventToContainerPoint(evt);

    // apply matrix
    if (this.moved()) {
      this._transformPoints(this._matrix);
      this._path._updatePath();
      this._path._project();
      this._path._transform(null);
    }

    L.DomEvent
      .off(document, 'mousemove touchmove', this._onDrag, this)
      .off(document, 'mouseup touchend',    this._onDragEnd, this);

    this._restoreCoordGetters();
    // consistency
    this._path.fire('dragend', {
      distance: Math.sqrt(
        L.LineUtil._sqDist(this._dragStartPoint, containerPoint)
      )
    });

    this._matrix         = null;
    this._startPoint     = null;
    this._dragStartPoint = null;

    if (this._mapDraggingWasEnabled) {
      this._path._map.dragging.enable();
    }
  },


  /**
   * Applies transformation, does it in one sweep for performance,
   * so don't be surprised about the code repetition.
   *
   * [ x ]   [ a  b  tx ] [ x ]   [ a * x + b * y + tx ]
   * [ y ] = [ c  d  ty ] [ y ] = [ c * x + d * y + ty ]
   *
   * @param {Array.<Number>} matrix
   */
  _transformPoints: function(matrix, dest) {
    var path = this._path;
    var i, len, latlng;

    var px = L.point(matrix[4], matrix[5]);

    var crs = path._map.options.crs;
    var transformation = crs.transformation;
    var scale = crs.scale(path._map.getZoom());
    var projection = crs.projection;

    var diff = transformation.untransform(px, scale)
      .subtract(transformation.untransform(L.point(0, 0), scale));
    var applyTransform = !dest;

    path._bounds = new L.LatLngBounds();

    // console.time('transform');
    // all shifts are in-place
    if (path._point) { // L.Circle
      dest = projection.unproject(
        projection.project(path._latlng)._add(diff));
      if (applyTransform) {
        path._latlng = dest;
        path._point._add(px);
      }
    } else if (path._rings || path._parts) { // everything else
      var rings   = path._rings || path._parts;
      var latlngs = path._latlngs;
      dest = dest || latlngs;
      if (!L.Util.isArray(latlngs[0])) { // polyline
        latlngs = [latlngs];
        dest    = [dest];
      }
      for (i = 0, len = rings.length; i < len; i++) {
        dest[i] = dest[i] || [];
        for (var j = 0, jj = rings[i].length; j < jj; j++) {
          latlng     = latlngs[i][j];
          dest[i][j] = projection
            .unproject(projection.project(latlng)._add(diff));
          if (applyTransform) {
            path._bounds.extend(latlngs[i][j]);
            rings[i][j]._add(px);
          }
        }
      }
    }
    return dest;
    // console.timeEnd('transform');
  },



  /**
   * If you want to read the latlngs during the drag - your right,
   * but they have to be transformed
   */
  _replaceCoordGetters: function() {
    if (this._path.getLatLng) { // Circle, CircleMarker
      this._path.getLatLng_ = this._path.getLatLng;
      this._path.getLatLng = L.Util.bind(function() {
        return this.dragging._transformPoints(this.dragging._matrix, {});
      }, this._path);
    } else if (this._path.getLatLngs) {
      this._path.getLatLngs_ = this._path.getLatLngs;
      this._path.getLatLngs = L.Util.bind(function() {
        return this.dragging._transformPoints(this.dragging._matrix, []);
      }, this._path);
    }
  },


  /**
   * Put back the getters
   */
  _restoreCoordGetters: function() {
    if (this._path.getLatLng_) {
      this._path.getLatLng = this._path.getLatLng_;
      delete this._path.getLatLng_;
    } else if (this._path.getLatLngs_) {
      this._path.getLatLngs = this._path.getLatLngs_;
      delete this._path.getLatLngs_;
    }
  }

});


/**
 * @param  {L.Path} layer
 * @return {L.Path}
 */
L.Handler.PathDrag.makeDraggable = function(layer) {
  layer.dragging = new L.Handler.PathDrag(layer);
  return layer;
};


/**
 * Also expose as a method
 * @return {L.Path}
 */
L.Path.prototype.makeDraggable = function() {
  return L.Handler.PathDrag.makeDraggable(this);
};


L.Path.addInitHook(function() {
  if (this.options.draggable) {
    // ensure interactive
    this.options.interactive = true;

    if (this.dragging) {
      this.dragging.enable();
    } else {
      L.Handler.PathDrag.makeDraggable(this);
      this.dragging.enable();
    }
  } else if (this.dragging) {
    this.dragging.disable();
  }
});

},{}],6:[function(require,module,exports){
/**
 * Leaflet vector features drag functionality
 * @author Alexander Milevski <info@w8r.name>
 * @preserve
 */

/**
 * Matrix transform path for SVG/VML
 * Renderer-independent
 */
L.Path.include({

	/**
	 * Applies matrix transformation to SVG
	 * @param {Array.<Number>?} matrix
	 */
	_transform: function(matrix) {
		if (this._renderer) {
			if (matrix) {
				this._renderer.transformPath(this, matrix);
			} else {
				// reset transform matrix
				this._renderer._resetTransformPath(this);
				this._update();
			}
		}
		return this;
	},

	/**
	 * Check if the feature was dragged, that'll supress the click event
	 * on mouseup. That fixes popups for example
	 *
	 * @param  {MouseEvent} e
	 */
	_onMouseClick: function(e) {
		if ((this.dragging && this.dragging.moved()) ||
			(this._map.dragging && this._map.dragging.moved())) {
			return;
		}

		this._fireMouseEvent(e);
	}

});

},{}],7:[function(require,module,exports){
L.SVG.include(!L.Browser.vml ? {} : {

	/**
	 * Reset transform matrix
	 */
	_resetTransformPath: function(layer) {
		if (layer._skew) {
			// super important! workaround for a 'jumping' glitch:
			// disable transform before removing it
			layer._skew.on = false;
			layer._path.removeChild(layer._skew);
			layer._skew = null;
		}
	},

	/**
	 * Applies matrix transformation to VML
	 * @param {L.Path}         layer
	 * @param {Array.<Number>} matrix
	 */
	transformPath: function(layer, matrix) {
		var skew = layer._skew;

		if (!skew) {
			skew = L.SVG.create('skew');
			layer._path.appendChild(skew);
			skew.style.behavior = 'url(#default#VML)';
			layer._skew = skew;
		}

		// handle skew/translate separately, cause it's broken
		var mt = matrix[0].toFixed(8) + ' ' + matrix[1].toFixed(8) + ' ' +
			matrix[2].toFixed(8) + ' ' + matrix[3].toFixed(8) + ' 0 0';
		var offset = Math.floor(matrix[4]).toFixed() + ', ' +
			Math.floor(matrix[5]).toFixed() + '';

		var s = this._path.style;
		var l = parseFloat(s.left);
		var t = parseFloat(s.top);
		var w = parseFloat(s.width);
		var h = parseFloat(s.height);

		if (isNaN(l)) { l = 0; }
		if (isNaN(t)) { t = 0; }
		if (isNaN(w) || !w) { w = 1; }
		if (isNaN(h) || !h) { h = 1; }

		var origin = (-l / w - 0.5).toFixed(8) + ' ' + (-t / h - 0.5).toFixed(8);

		skew.on = 'f';
		skew.matrix = mt;
		skew.origin = origin;
		skew.offset = offset;
		skew.on = true;
	}

});

},{}],8:[function(require,module,exports){
L.SVG.include({

	/**
	 * Reset transform matrix
	 */
	_resetTransformPath: function(layer) {
		layer._path.setAttributeNS(null, 'transform', '');
	},

	/**
	 * Applies matrix transformation to SVG
	 * @param {L.Path}         layer
	 * @param {Array.<Number>} matrix
	 */
	transformPath: function(layer, matrix) {
		layer._path.setAttributeNS(null, 'transform',
			'matrix(' + matrix.join(' ') + ')');
	}

});

},{}],9:[function(require,module,exports){
/*
 Leaflet 1.0.0-beta.2 (55fe462), a JS library for interactive maps. http://leafletjs.com
 (c) 2010-2015 Vladimir Agafonkin, (c) 2010-2011 CloudMade
*/
(function (window, document, undefined) {
var L = {
	version: '1.0.0-beta.2'
};

function expose() {
	var oldL = window.L;

	L.noConflict = function () {
		window.L = oldL;
		return this;
	};

	window.L = L;
}

// define Leaflet for Node module pattern loaders, including Browserify
if (typeof module === 'object' && typeof module.exports === 'object') {
	module.exports = L;

// define Leaflet as an AMD module
} else if (typeof define === 'function' && define.amd) {
	define(L);
}

// define Leaflet as a global L variable, saving the original L to restore later if needed
if (typeof window !== 'undefined') {
	expose();
}



/*
 * L.Util contains various utility functions used throughout Leaflet code.
 */

L.Util = {
	// extend an object with properties of one or more other objects
	extend: function (dest) {
		var i, j, len, src;

		for (j = 1, len = arguments.length; j < len; j++) {
			src = arguments[j];
			for (i in src) {
				dest[i] = src[i];
			}
		}
		return dest;
	},

	// create an object from a given prototype
	create: Object.create || (function () {
		function F() {}
		return function (proto) {
			F.prototype = proto;
			return new F();
		};
	})(),

	// bind a function to be called with a given context
	bind: function (fn, obj) {
		var slice = Array.prototype.slice;

		if (fn.bind) {
			return fn.bind.apply(fn, slice.call(arguments, 1));
		}

		var args = slice.call(arguments, 2);

		return function () {
			return fn.apply(obj, args.length ? args.concat(slice.call(arguments)) : arguments);
		};
	},

	// return unique ID of an object
	stamp: function (obj) {
		/*eslint-disable */
		obj._leaflet_id = obj._leaflet_id || ++L.Util.lastId;
		return obj._leaflet_id;
		/*eslint-enable */
	},

	lastId: 0,

	// return a function that won't be called more often than the given interval
	throttle: function (fn, time, context) {
		var lock, args, wrapperFn, later;

		later = function () {
			// reset lock and call if queued
			lock = false;
			if (args) {
				wrapperFn.apply(context, args);
				args = false;
			}
		};

		wrapperFn = function () {
			if (lock) {
				// called too soon, queue to call later
				args = arguments;

			} else {
				// call and lock until later
				fn.apply(context, arguments);
				setTimeout(later, time);
				lock = true;
			}
		};

		return wrapperFn;
	},

	// wrap the given number to lie within a certain range (used for wrapping longitude)
	wrapNum: function (x, range, includeMax) {
		var max = range[1],
		    min = range[0],
		    d = max - min;
		return x === max && includeMax ? x : ((x - min) % d + d) % d + min;
	},

	// do nothing (used as a noop throughout the code)
	falseFn: function () { return false; },

	// round a given number to a given precision
	formatNum: function (num, digits) {
		var pow = Math.pow(10, digits || 5);
		return Math.round(num * pow) / pow;
	},

	// trim whitespace from both sides of a string
	trim: function (str) {
		return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
	},

	// split a string into words
	splitWords: function (str) {
		return L.Util.trim(str).split(/\s+/);
	},

	// set options to an object, inheriting parent's options as well
	setOptions: function (obj, options) {
		if (!obj.hasOwnProperty('options')) {
			obj.options = obj.options ? L.Util.create(obj.options) : {};
		}
		for (var i in options) {
			obj.options[i] = options[i];
		}
		return obj.options;
	},

	// make a URL with GET parameters out of a set of properties/values
	getParamString: function (obj, existingUrl, uppercase) {
		var params = [];
		for (var i in obj) {
			params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + '=' + encodeURIComponent(obj[i]));
		}
		return ((!existingUrl || existingUrl.indexOf('?') === -1) ? '?' : '&') + params.join('&');
	},

	// super-simple templating facility, used for TileLayer URLs
	template: function (str, data) {
		return str.replace(L.Util.templateRe, function (str, key) {
			var value = data[key];

			if (value === undefined) {
				throw new Error('No value provided for variable ' + str);

			} else if (typeof value === 'function') {
				value = value(data);
			}
			return value;
		});
	},

	templateRe: /\{ *([\w_]+) *\}/g,

	isArray: Array.isArray || function (obj) {
		return (Object.prototype.toString.call(obj) === '[object Array]');
	},

	indexOf: function (array, el) {
		for (var i = 0; i < array.length; i++) {
			if (array[i] === el) { return i; }
		}
		return -1;
	},

	// minimal image URI, set to an image when disposing to flush memory
	emptyImageUrl: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
};

(function () {
	// inspired by http://paulirish.com/2011/requestanimationframe-for-smart-animating/

	function getPrefixed(name) {
		return window['webkit' + name] || window['moz' + name] || window['ms' + name];
	}

	var lastTime = 0;

	// fallback for IE 7-8
	function timeoutDefer(fn) {
		var time = +new Date(),
		    timeToCall = Math.max(0, 16 - (time - lastTime));

		lastTime = time + timeToCall;
		return window.setTimeout(fn, timeToCall);
	}

	var requestFn = window.requestAnimationFrame || getPrefixed('RequestAnimationFrame') || timeoutDefer,
	    cancelFn = window.cancelAnimationFrame || getPrefixed('CancelAnimationFrame') ||
	               getPrefixed('CancelRequestAnimationFrame') || function (id) { window.clearTimeout(id); };


	L.Util.requestAnimFrame = function (fn, context, immediate) {
		if (immediate && requestFn === timeoutDefer) {
			fn.call(context);
		} else {
			return requestFn.call(window, L.bind(fn, context));
		}
	};

	L.Util.cancelAnimFrame = function (id) {
		if (id) {
			cancelFn.call(window, id);
		}
	};
})();

// shortcuts for most used utility functions
L.extend = L.Util.extend;
L.bind = L.Util.bind;
L.stamp = L.Util.stamp;
L.setOptions = L.Util.setOptions;



/*
 * L.Class powers the OOP facilities of the library.
 * Thanks to John Resig and Dean Edwards for inspiration!
 */

L.Class = function () {};

L.Class.extend = function (props) {

	// extended class with the new prototype
	var NewClass = function () {

		// call the constructor
		if (this.initialize) {
			this.initialize.apply(this, arguments);
		}

		// call all constructor hooks
		this.callInitHooks();
	};

	var parentProto = NewClass.__super__ = this.prototype;

	var proto = L.Util.create(parentProto);
	proto.constructor = NewClass;

	NewClass.prototype = proto;

	// inherit parent's statics
	for (var i in this) {
		if (this.hasOwnProperty(i) && i !== 'prototype') {
			NewClass[i] = this[i];
		}
	}

	// mix static properties into the class
	if (props.statics) {
		L.extend(NewClass, props.statics);
		delete props.statics;
	}

	// mix includes into the prototype
	if (props.includes) {
		L.Util.extend.apply(null, [proto].concat(props.includes));
		delete props.includes;
	}

	// merge options
	if (proto.options) {
		props.options = L.Util.extend(L.Util.create(proto.options), props.options);
	}

	// mix given properties into the prototype
	L.extend(proto, props);

	proto._initHooks = [];

	// add method for calling all hooks
	proto.callInitHooks = function () {

		if (this._initHooksCalled) { return; }

		if (parentProto.callInitHooks) {
			parentProto.callInitHooks.call(this);
		}

		this._initHooksCalled = true;

		for (var i = 0, len = proto._initHooks.length; i < len; i++) {
			proto._initHooks[i].call(this);
		}
	};

	return NewClass;
};


// method for adding properties to prototype
L.Class.include = function (props) {
	L.extend(this.prototype, props);
};

// merge new default options to the Class
L.Class.mergeOptions = function (options) {
	L.extend(this.prototype.options, options);
};

// add a constructor hook
L.Class.addInitHook = function (fn) { // (Function) || (String, args...)
	var args = Array.prototype.slice.call(arguments, 1);

	var init = typeof fn === 'function' ? fn : function () {
		this[fn].apply(this, args);
	};

	this.prototype._initHooks = this.prototype._initHooks || [];
	this.prototype._initHooks.push(init);
};



/*
 * L.Evented is a base class that Leaflet classes inherit from to handle custom events.
 */

L.Evented = L.Class.extend({

	on: function (types, fn, context) {

		// types can be a map of types/handlers
		if (typeof types === 'object') {
			for (var type in types) {
				// we don't process space-separated events here for performance;
				// it's a hot path since Layer uses the on(obj) syntax
				this._on(type, types[type], fn);
			}

		} else {
			// types can be a string of space-separated words
			types = L.Util.splitWords(types);

			for (var i = 0, len = types.length; i < len; i++) {
				this._on(types[i], fn, context);
			}
		}

		return this;
	},

	off: function (types, fn, context) {

		if (!types) {
			// clear all listeners if called without arguments
			delete this._events;

		} else if (typeof types === 'object') {
			for (var type in types) {
				this._off(type, types[type], fn);
			}

		} else {
			types = L.Util.splitWords(types);

			for (var i = 0, len = types.length; i < len; i++) {
				this._off(types[i], fn, context);
			}
		}

		return this;
	},

	// attach listener (without syntactic sugar now)
	_on: function (type, fn, context) {

		var events = this._events = this._events || {},
		    contextId = context && context !== this && L.stamp(context);

		if (contextId) {
			// store listeners with custom context in a separate hash (if it has an id);
			// gives a major performance boost when firing and removing events (e.g. on map object)

			var indexKey = type + '_idx',
			    indexLenKey = type + '_len',
			    typeIndex = events[indexKey] = events[indexKey] || {},
			    id = L.stamp(fn) + '_' + contextId;

			if (!typeIndex[id]) {
				typeIndex[id] = {fn: fn, ctx: context};

				// keep track of the number of keys in the index to quickly check if it's empty
				events[indexLenKey] = (events[indexLenKey] || 0) + 1;
			}

		} else {
			// individual layers mostly use "this" for context and don't fire listeners too often
			// so simple array makes the memory footprint better while not degrading performance

			events[type] = events[type] || [];
			events[type].push({fn: fn});
		}
	},

	_off: function (type, fn, context) {
		var events = this._events,
		    indexKey = type + '_idx',
		    indexLenKey = type + '_len';

		if (!events) { return; }

		if (!fn) {
			// clear all listeners for a type if function isn't specified
			delete events[type];
			delete events[indexKey];
			delete events[indexLenKey];
			return;
		}

		var contextId = context && context !== this && L.stamp(context),
		    listeners, i, len, listener, id;

		if (contextId) {
			id = L.stamp(fn) + '_' + contextId;
			listeners = events[indexKey];

			if (listeners && listeners[id]) {
				listener = listeners[id];
				delete listeners[id];
				events[indexLenKey]--;
			}

		} else {
			listeners = events[type];

			if (listeners) {
				for (i = 0, len = listeners.length; i < len; i++) {
					if (listeners[i].fn === fn) {
						listener = listeners[i];
						listeners.splice(i, 1);
						break;
					}
				}
			}
		}

		// set the removed listener to noop so that's not called if remove happens in fire
		if (listener) {
			listener.fn = L.Util.falseFn;
		}
	},

	fire: function (type, data, propagate) {
		if (!this.listens(type, propagate)) { return this; }

		var event = L.Util.extend({}, data, {type: type, target: this}),
		    events = this._events;

		if (events) {
			var typeIndex = events[type + '_idx'],
			    i, len, listeners, id;

			if (events[type]) {
				// make sure adding/removing listeners inside other listeners won't cause infinite loop
				listeners = events[type].slice();

				for (i = 0, len = listeners.length; i < len; i++) {
					listeners[i].fn.call(this, event);
				}
			}

			// fire event for the context-indexed listeners as well
			for (id in typeIndex) {
				typeIndex[id].fn.call(typeIndex[id].ctx, event);
			}
		}

		if (propagate) {
			// propagate the event to parents (set with addEventParent)
			this._propagateEvent(event);
		}

		return this;
	},

	listens: function (type, propagate) {
		var events = this._events;

		if (events && (events[type] || events[type + '_len'])) { return true; }

		if (propagate) {
			// also check parents for listeners if event propagates
			for (var id in this._eventParents) {
				if (this._eventParents[id].listens(type, propagate)) { return true; }
			}
		}
		return false;
	},

	once: function (types, fn, context) {

		if (typeof types === 'object') {
			for (var type in types) {
				this.once(type, types[type], fn);
			}
			return this;
		}

		var handler = L.bind(function () {
			this
			    .off(types, fn, context)
			    .off(types, handler, context);
		}, this);

		// add a listener that's executed once and removed after that
		return this
		    .on(types, fn, context)
		    .on(types, handler, context);
	},

	// adds a parent to propagate events to (when you fire with true as a 3rd argument)
	addEventParent: function (obj) {
		this._eventParents = this._eventParents || {};
		this._eventParents[L.stamp(obj)] = obj;
		return this;
	},

	removeEventParent: function (obj) {
		if (this._eventParents) {
			delete this._eventParents[L.stamp(obj)];
		}
		return this;
	},

	_propagateEvent: function (e) {
		for (var id in this._eventParents) {
			this._eventParents[id].fire(e.type, L.extend({layer: e.target}, e), true);
		}
	}
});

var proto = L.Evented.prototype;

// aliases; we should ditch those eventually
proto.addEventListener = proto.on;
proto.removeEventListener = proto.clearAllEventListeners = proto.off;
proto.addOneTimeEventListener = proto.once;
proto.fireEvent = proto.fire;
proto.hasEventListeners = proto.listens;

L.Mixin = {Events: proto};



/*
 * L.Browser handles different browser and feature detections for internal Leaflet use.
 */

(function () {

	var ua = navigator.userAgent.toLowerCase(),
	    doc = document.documentElement,

	    ie = 'ActiveXObject' in window,

	    webkit    = ua.indexOf('webkit') !== -1,
	    phantomjs = ua.indexOf('phantom') !== -1,
	    android23 = ua.search('android [23]') !== -1,
	    chrome    = ua.indexOf('chrome') !== -1,
	    gecko     = ua.indexOf('gecko') !== -1  && !webkit && !window.opera && !ie,

	    mobile = typeof orientation !== 'undefined' || ua.indexOf('mobile') !== -1,
	    msPointer = !window.PointerEvent && window.MSPointerEvent,
	    pointer = (window.PointerEvent && navigator.pointerEnabled) || msPointer,

	    ie3d = ie && ('transition' in doc.style),
	    webkit3d = ('WebKitCSSMatrix' in window) && ('m11' in new window.WebKitCSSMatrix()) && !android23,
	    gecko3d = 'MozPerspective' in doc.style,
	    opera12 = 'OTransition' in doc.style;

	var touch = !window.L_NO_TOUCH && !phantomjs && (pointer || 'ontouchstart' in window ||
			(window.DocumentTouch && document instanceof window.DocumentTouch));

	L.Browser = {
		ie: ie,
		ielt9: ie && !document.addEventListener,
		webkit: webkit,
		gecko: gecko,
		android: ua.indexOf('android') !== -1,
		android23: android23,
		chrome: chrome,
		safari: !chrome && ua.indexOf('safari') !== -1,

		ie3d: ie3d,
		webkit3d: webkit3d,
		gecko3d: gecko3d,
		opera12: opera12,
		any3d: !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d) && !opera12 && !phantomjs,

		mobile: mobile,
		mobileWebkit: mobile && webkit,
		mobileWebkit3d: mobile && webkit3d,
		mobileOpera: mobile && window.opera,
		mobileGecko: mobile && gecko,

		touch: !!touch,
		msPointer: !!msPointer,
		pointer: !!pointer,

		retina: (window.devicePixelRatio || (window.screen.deviceXDPI / window.screen.logicalXDPI)) > 1
	};

}());



/*
 * L.Point represents a point with x and y coordinates.
 */

L.Point = function (x, y, round) {
	this.x = (round ? Math.round(x) : x);
	this.y = (round ? Math.round(y) : y);
};

L.Point.prototype = {

	clone: function () {
		return new L.Point(this.x, this.y);
	},

	// non-destructive, returns a new point
	add: function (point) {
		return this.clone()._add(L.point(point));
	},

	// destructive, used directly for performance in situations where it's safe to modify existing point
	_add: function (point) {
		this.x += point.x;
		this.y += point.y;
		return this;
	},

	subtract: function (point) {
		return this.clone()._subtract(L.point(point));
	},

	_subtract: function (point) {
		this.x -= point.x;
		this.y -= point.y;
		return this;
	},

	divideBy: function (num) {
		return this.clone()._divideBy(num);
	},

	_divideBy: function (num) {
		this.x /= num;
		this.y /= num;
		return this;
	},

	multiplyBy: function (num) {
		return this.clone()._multiplyBy(num);
	},

	_multiplyBy: function (num) {
		this.x *= num;
		this.y *= num;
		return this;
	},

	scaleBy: function (point) {
		return new L.Point(this.x * point.x, this.y * point.y);
	},

	unscaleBy: function (point) {
		return new L.Point(this.x / point.x, this.y / point.y);
	},

	round: function () {
		return this.clone()._round();
	},

	_round: function () {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	},

	floor: function () {
		return this.clone()._floor();
	},

	_floor: function () {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		return this;
	},

	ceil: function () {
		return this.clone()._ceil();
	},

	_ceil: function () {
		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);
		return this;
	},

	distanceTo: function (point) {
		point = L.point(point);

		var x = point.x - this.x,
		    y = point.y - this.y;

		return Math.sqrt(x * x + y * y);
	},

	equals: function (point) {
		point = L.point(point);

		return point.x === this.x &&
		       point.y === this.y;
	},

	contains: function (point) {
		point = L.point(point);

		return Math.abs(point.x) <= Math.abs(this.x) &&
		       Math.abs(point.y) <= Math.abs(this.y);
	},

	toString: function () {
		return 'Point(' +
		        L.Util.formatNum(this.x) + ', ' +
		        L.Util.formatNum(this.y) + ')';
	}
};

L.point = function (x, y, round) {
	if (x instanceof L.Point) {
		return x;
	}
	if (L.Util.isArray(x)) {
		return new L.Point(x[0], x[1]);
	}
	if (x === undefined || x === null) {
		return x;
	}
	return new L.Point(x, y, round);
};



/*
 * L.Bounds represents a rectangular area on the screen in pixel coordinates.
 */

L.Bounds = function (a, b) { // (Point, Point) or Point[]
	if (!a) { return; }

	var points = b ? [a, b] : a;

	for (var i = 0, len = points.length; i < len; i++) {
		this.extend(points[i]);
	}
};

L.Bounds.prototype = {
	// extend the bounds to contain the given point
	extend: function (point) { // (Point)
		point = L.point(point);

		if (!this.min && !this.max) {
			this.min = point.clone();
			this.max = point.clone();
		} else {
			this.min.x = Math.min(point.x, this.min.x);
			this.max.x = Math.max(point.x, this.max.x);
			this.min.y = Math.min(point.y, this.min.y);
			this.max.y = Math.max(point.y, this.max.y);
		}
		return this;
	},

	getCenter: function (round) { // (Boolean) -> Point
		return new L.Point(
		        (this.min.x + this.max.x) / 2,
		        (this.min.y + this.max.y) / 2, round);
	},

	getBottomLeft: function () { // -> Point
		return new L.Point(this.min.x, this.max.y);
	},

	getTopRight: function () { // -> Point
		return new L.Point(this.max.x, this.min.y);
	},

	getSize: function () {
		return this.max.subtract(this.min);
	},

	contains: function (obj) { // (Bounds) or (Point) -> Boolean
		var min, max;

		if (typeof obj[0] === 'number' || obj instanceof L.Point) {
			obj = L.point(obj);
		} else {
			obj = L.bounds(obj);
		}

		if (obj instanceof L.Bounds) {
			min = obj.min;
			max = obj.max;
		} else {
			min = max = obj;
		}

		return (min.x >= this.min.x) &&
		       (max.x <= this.max.x) &&
		       (min.y >= this.min.y) &&
		       (max.y <= this.max.y);
	},

	intersects: function (bounds) { // (Bounds) -> Boolean
		bounds = L.bounds(bounds);

		var min = this.min,
		    max = this.max,
		    min2 = bounds.min,
		    max2 = bounds.max,
		    xIntersects = (max2.x >= min.x) && (min2.x <= max.x),
		    yIntersects = (max2.y >= min.y) && (min2.y <= max.y);

		return xIntersects && yIntersects;
	},

	overlaps: function (bounds) { // (Bounds) -> Boolean
		bounds = L.bounds(bounds);

		var min = this.min,
		    max = this.max,
		    min2 = bounds.min,
		    max2 = bounds.max,
		    xOverlaps = (max2.x > min.x) && (min2.x < max.x),
		    yOverlaps = (max2.y > min.y) && (min2.y < max.y);

		return xOverlaps && yOverlaps;
	},

	isValid: function () {
		return !!(this.min && this.max);
	}
};

L.bounds = function (a, b) { // (Bounds) or (Point, Point) or (Point[])
	if (!a || a instanceof L.Bounds) {
		return a;
	}
	return new L.Bounds(a, b);
};



/*
 * L.Transformation is an utility class to perform simple point transformations through a 2d-matrix.
 */

L.Transformation = function (a, b, c, d) {
	this._a = a;
	this._b = b;
	this._c = c;
	this._d = d;
};

L.Transformation.prototype = {
	transform: function (point, scale) { // (Point, Number) -> Point
		return this._transform(point.clone(), scale);
	},

	// destructive transform (faster)
	_transform: function (point, scale) {
		scale = scale || 1;
		point.x = scale * (this._a * point.x + this._b);
		point.y = scale * (this._c * point.y + this._d);
		return point;
	},

	untransform: function (point, scale) {
		scale = scale || 1;
		return new L.Point(
		        (point.x / scale - this._b) / this._a,
		        (point.y / scale - this._d) / this._c);
	}
};



/*
 * L.DomUtil contains various utility functions for working with DOM.
 */

L.DomUtil = {
	get: function (id) {
		return typeof id === 'string' ? document.getElementById(id) : id;
	},

	getStyle: function (el, style) {

		var value = el.style[style] || (el.currentStyle && el.currentStyle[style]);

		if ((!value || value === 'auto') && document.defaultView) {
			var css = document.defaultView.getComputedStyle(el, null);
			value = css ? css[style] : null;
		}

		return value === 'auto' ? null : value;
	},

	create: function (tagName, className, container) {

		var el = document.createElement(tagName);
		el.className = className;

		if (container) {
			container.appendChild(el);
		}

		return el;
	},

	remove: function (el) {
		var parent = el.parentNode;
		if (parent) {
			parent.removeChild(el);
		}
	},

	empty: function (el) {
		while (el.firstChild) {
			el.removeChild(el.firstChild);
		}
	},

	toFront: function (el) {
		el.parentNode.appendChild(el);
	},

	toBack: function (el) {
		var parent = el.parentNode;
		parent.insertBefore(el, parent.firstChild);
	},

	hasClass: function (el, name) {
		if (el.classList !== undefined) {
			return el.classList.contains(name);
		}
		var className = L.DomUtil.getClass(el);
		return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
	},

	addClass: function (el, name) {
		if (el.classList !== undefined) {
			var classes = L.Util.splitWords(name);
			for (var i = 0, len = classes.length; i < len; i++) {
				el.classList.add(classes[i]);
			}
		} else if (!L.DomUtil.hasClass(el, name)) {
			var className = L.DomUtil.getClass(el);
			L.DomUtil.setClass(el, (className ? className + ' ' : '') + name);
		}
	},

	removeClass: function (el, name) {
		if (el.classList !== undefined) {
			el.classList.remove(name);
		} else {
			L.DomUtil.setClass(el, L.Util.trim((' ' + L.DomUtil.getClass(el) + ' ').replace(' ' + name + ' ', ' ')));
		}
	},

	setClass: function (el, name) {
		if (el.className.baseVal === undefined) {
			el.className = name;
		} else {
			// in case of SVG element
			el.className.baseVal = name;
		}
	},

	getClass: function (el) {
		return el.className.baseVal === undefined ? el.className : el.className.baseVal;
	},

	setOpacity: function (el, value) {

		if ('opacity' in el.style) {
			el.style.opacity = value;

		} else if ('filter' in el.style) {
			L.DomUtil._setOpacityIE(el, value);
		}
	},

	_setOpacityIE: function (el, value) {
		var filter = false,
		    filterName = 'DXImageTransform.Microsoft.Alpha';

		// filters collection throws an error if we try to retrieve a filter that doesn't exist
		try {
			filter = el.filters.item(filterName);
		} catch (e) {
			// don't set opacity to 1 if we haven't already set an opacity,
			// it isn't needed and breaks transparent pngs.
			if (value === 1) { return; }
		}

		value = Math.round(value * 100);

		if (filter) {
			filter.Enabled = (value !== 100);
			filter.Opacity = value;
		} else {
			el.style.filter += ' progid:' + filterName + '(opacity=' + value + ')';
		}
	},

	testProp: function (props) {

		var style = document.documentElement.style;

		for (var i = 0; i < props.length; i++) {
			if (props[i] in style) {
				return props[i];
			}
		}
		return false;
	},

	setTransform: function (el, offset, scale) {
		var pos = offset || new L.Point(0, 0);

		el.style[L.DomUtil.TRANSFORM] =
			(L.Browser.ie3d ?
				'translate(' + pos.x + 'px,' + pos.y + 'px)' :
				'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)') +
			(scale ? ' scale(' + scale + ')' : '');
	},

	setPosition: function (el, point) { // (HTMLElement, Point[, Boolean])

		/*eslint-disable */
		el._leaflet_pos = point;
		/*eslint-enable */

		if (L.Browser.any3d) {
			L.DomUtil.setTransform(el, point);
		} else {
			el.style.left = point.x + 'px';
			el.style.top = point.y + 'px';
		}
	},

	getPosition: function (el) {
		// this method is only used for elements previously positioned using setPosition,
		// so it's safe to cache the position for performance

		return el._leaflet_pos;
	}
};


(function () {
	// prefix style property names

	L.DomUtil.TRANSFORM = L.DomUtil.testProp(
			['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform']);


	// webkitTransition comes first because some browser versions that drop vendor prefix don't do
	// the same for the transitionend event, in particular the Android 4.1 stock browser

	var transition = L.DomUtil.TRANSITION = L.DomUtil.testProp(
			['webkitTransition', 'transition', 'OTransition', 'MozTransition', 'msTransition']);

	L.DomUtil.TRANSITION_END =
			transition === 'webkitTransition' || transition === 'OTransition' ? transition + 'End' : 'transitionend';


	if ('onselectstart' in document) {
		L.DomUtil.disableTextSelection = function () {
			L.DomEvent.on(window, 'selectstart', L.DomEvent.preventDefault);
		};
		L.DomUtil.enableTextSelection = function () {
			L.DomEvent.off(window, 'selectstart', L.DomEvent.preventDefault);
		};

	} else {
		var userSelectProperty = L.DomUtil.testProp(
			['userSelect', 'WebkitUserSelect', 'OUserSelect', 'MozUserSelect', 'msUserSelect']);

		L.DomUtil.disableTextSelection = function () {
			if (userSelectProperty) {
				var style = document.documentElement.style;
				this._userSelect = style[userSelectProperty];
				style[userSelectProperty] = 'none';
			}
		};
		L.DomUtil.enableTextSelection = function () {
			if (userSelectProperty) {
				document.documentElement.style[userSelectProperty] = this._userSelect;
				delete this._userSelect;
			}
		};
	}

	L.DomUtil.disableImageDrag = function () {
		L.DomEvent.on(window, 'dragstart', L.DomEvent.preventDefault);
	};
	L.DomUtil.enableImageDrag = function () {
		L.DomEvent.off(window, 'dragstart', L.DomEvent.preventDefault);
	};

	L.DomUtil.preventOutline = function (element) {
		while (element.tabIndex === -1) {
			element = element.parentNode;
		}
		if (!element || !element.style) { return; }
		L.DomUtil.restoreOutline();
		this._outlineElement = element;
		this._outlineStyle = element.style.outline;
		element.style.outline = 'none';
		L.DomEvent.on(window, 'keydown', L.DomUtil.restoreOutline, this);
	};
	L.DomUtil.restoreOutline = function () {
		if (!this._outlineElement) { return; }
		this._outlineElement.style.outline = this._outlineStyle;
		delete this._outlineElement;
		delete this._outlineStyle;
		L.DomEvent.off(window, 'keydown', L.DomUtil.restoreOutline, this);
	};
})();



/*
 * L.LatLng represents a geographical point with latitude and longitude coordinates.
 */

L.LatLng = function (lat, lng, alt) {
	if (isNaN(lat) || isNaN(lng)) {
		throw new Error('Invalid LatLng object: (' + lat + ', ' + lng + ')');
	}

	this.lat = +lat;
	this.lng = +lng;

	if (alt !== undefined) {
		this.alt = +alt;
	}
};

L.LatLng.prototype = {
	equals: function (obj, maxMargin) {
		if (!obj) { return false; }

		obj = L.latLng(obj);

		var margin = Math.max(
		        Math.abs(this.lat - obj.lat),
		        Math.abs(this.lng - obj.lng));

		return margin <= (maxMargin === undefined ? 1.0E-9 : maxMargin);
	},

	toString: function (precision) {
		return 'LatLng(' +
		        L.Util.formatNum(this.lat, precision) + ', ' +
		        L.Util.formatNum(this.lng, precision) + ')';
	},

	distanceTo: function (other) {
		return L.CRS.Earth.distance(this, L.latLng(other));
	},

	wrap: function () {
		return L.CRS.Earth.wrapLatLng(this);
	},

	toBounds: function (sizeInMeters) {
		var latAccuracy = 180 * sizeInMeters / 40075017,
		    lngAccuracy = latAccuracy / Math.cos((Math.PI / 180) * this.lat);

		return L.latLngBounds(
		        [this.lat - latAccuracy, this.lng - lngAccuracy],
		        [this.lat + latAccuracy, this.lng + lngAccuracy]);
	},

	clone: function () {
		return new L.LatLng(this.lat, this.lng, this.alt);
	}
};


// constructs LatLng with different signatures
// (LatLng) or ([Number, Number]) or (Number, Number) or (Object)

L.latLng = function (a, b, c) {
	if (a instanceof L.LatLng) {
		return a;
	}
	if (L.Util.isArray(a) && typeof a[0] !== 'object') {
		if (a.length === 3) {
			return new L.LatLng(a[0], a[1], a[2]);
		}
		if (a.length === 2) {
			return new L.LatLng(a[0], a[1]);
		}
		return null;
	}
	if (a === undefined || a === null) {
		return a;
	}
	if (typeof a === 'object' && 'lat' in a) {
		return new L.LatLng(a.lat, 'lng' in a ? a.lng : a.lon, a.alt);
	}
	if (b === undefined) {
		return null;
	}
	return new L.LatLng(a, b, c);
};



/*
 * L.LatLngBounds represents a rectangular area on the map in geographical coordinates.
 */

L.LatLngBounds = function (southWest, northEast) { // (LatLng, LatLng) or (LatLng[])
	if (!southWest) { return; }

	var latlngs = northEast ? [southWest, northEast] : southWest;

	for (var i = 0, len = latlngs.length; i < len; i++) {
		this.extend(latlngs[i]);
	}
};

L.LatLngBounds.prototype = {

	// extend the bounds to contain the given point or bounds
	extend: function (obj) { // (LatLng) or (LatLngBounds)
		var sw = this._southWest,
		    ne = this._northEast,
		    sw2, ne2;

		if (obj instanceof L.LatLng) {
			sw2 = obj;
			ne2 = obj;

		} else if (obj instanceof L.LatLngBounds) {
			sw2 = obj._southWest;
			ne2 = obj._northEast;

			if (!sw2 || !ne2) { return this; }

		} else {
			return obj ? this.extend(L.latLng(obj) || L.latLngBounds(obj)) : this;
		}

		if (!sw && !ne) {
			this._southWest = new L.LatLng(sw2.lat, sw2.lng);
			this._northEast = new L.LatLng(ne2.lat, ne2.lng);
		} else {
			sw.lat = Math.min(sw2.lat, sw.lat);
			sw.lng = Math.min(sw2.lng, sw.lng);
			ne.lat = Math.max(ne2.lat, ne.lat);
			ne.lng = Math.max(ne2.lng, ne.lng);
		}

		return this;
	},

	// extend the bounds by a percentage
	pad: function (bufferRatio) { // (Number) -> LatLngBounds
		var sw = this._southWest,
		    ne = this._northEast,
		    heightBuffer = Math.abs(sw.lat - ne.lat) * bufferRatio,
		    widthBuffer = Math.abs(sw.lng - ne.lng) * bufferRatio;

		return new L.LatLngBounds(
		        new L.LatLng(sw.lat - heightBuffer, sw.lng - widthBuffer),
		        new L.LatLng(ne.lat + heightBuffer, ne.lng + widthBuffer));
	},

	getCenter: function () { // -> LatLng
		return new L.LatLng(
		        (this._southWest.lat + this._northEast.lat) / 2,
		        (this._southWest.lng + this._northEast.lng) / 2);
	},

	getSouthWest: function () {
		return this._southWest;
	},

	getNorthEast: function () {
		return this._northEast;
	},

	getNorthWest: function () {
		return new L.LatLng(this.getNorth(), this.getWest());
	},

	getSouthEast: function () {
		return new L.LatLng(this.getSouth(), this.getEast());
	},

	getWest: function () {
		return this._southWest.lng;
	},

	getSouth: function () {
		return this._southWest.lat;
	},

	getEast: function () {
		return this._northEast.lng;
	},

	getNorth: function () {
		return this._northEast.lat;
	},

	contains: function (obj) { // (LatLngBounds) or (LatLng) -> Boolean
		if (typeof obj[0] === 'number' || obj instanceof L.LatLng) {
			obj = L.latLng(obj);
		} else {
			obj = L.latLngBounds(obj);
		}

		var sw = this._southWest,
		    ne = this._northEast,
		    sw2, ne2;

		if (obj instanceof L.LatLngBounds) {
			sw2 = obj.getSouthWest();
			ne2 = obj.getNorthEast();
		} else {
			sw2 = ne2 = obj;
		}

		return (sw2.lat >= sw.lat) && (ne2.lat <= ne.lat) &&
		       (sw2.lng >= sw.lng) && (ne2.lng <= ne.lng);
	},

	intersects: function (bounds) { // (LatLngBounds) -> Boolean
		bounds = L.latLngBounds(bounds);

		var sw = this._southWest,
		    ne = this._northEast,
		    sw2 = bounds.getSouthWest(),
		    ne2 = bounds.getNorthEast(),

		    latIntersects = (ne2.lat >= sw.lat) && (sw2.lat <= ne.lat),
		    lngIntersects = (ne2.lng >= sw.lng) && (sw2.lng <= ne.lng);

		return latIntersects && lngIntersects;
	},

	overlaps: function (bounds) { // (LatLngBounds) -> Boolean
		bounds = L.latLngBounds(bounds);

		var sw = this._southWest,
		    ne = this._northEast,
		    sw2 = bounds.getSouthWest(),
		    ne2 = bounds.getNorthEast(),

		    latOverlaps = (ne2.lat > sw.lat) && (sw2.lat < ne.lat),
		    lngOverlaps = (ne2.lng > sw.lng) && (sw2.lng < ne.lng);

		return latOverlaps && lngOverlaps;
	},

	toBBoxString: function () {
		return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(',');
	},

	equals: function (bounds) { // (LatLngBounds)
		if (!bounds) { return false; }

		bounds = L.latLngBounds(bounds);

		return this._southWest.equals(bounds.getSouthWest()) &&
		       this._northEast.equals(bounds.getNorthEast());
	},

	isValid: function () {
		return !!(this._southWest && this._northEast);
	}
};

// TODO International date line?

L.latLngBounds = function (a, b) { // (LatLngBounds) or (LatLng, LatLng)
	if (!a || a instanceof L.LatLngBounds) {
		return a;
	}
	return new L.LatLngBounds(a, b);
};



/*
 * Simple equirectangular (Plate Carree) projection, used by CRS like EPSG:4326 and Simple.
 */

L.Projection = {};

L.Projection.LonLat = {
	project: function (latlng) {
		return new L.Point(latlng.lng, latlng.lat);
	},

	unproject: function (point) {
		return new L.LatLng(point.y, point.x);
	},

	bounds: L.bounds([-180, -90], [180, 90])
};



/*
 * Spherical Mercator is the most popular map projection, used by EPSG:3857 CRS used by default.
 */

L.Projection.SphericalMercator = {

	R: 6378137,
	MAX_LATITUDE: 85.0511287798,

	project: function (latlng) {
		var d = Math.PI / 180,
		    max = this.MAX_LATITUDE,
		    lat = Math.max(Math.min(max, latlng.lat), -max),
		    sin = Math.sin(lat * d);

		return new L.Point(
				this.R * latlng.lng * d,
				this.R * Math.log((1 + sin) / (1 - sin)) / 2);
	},

	unproject: function (point) {
		var d = 180 / Math.PI;

		return new L.LatLng(
			(2 * Math.atan(Math.exp(point.y / this.R)) - (Math.PI / 2)) * d,
			point.x * d / this.R);
	},

	bounds: (function () {
		var d = 6378137 * Math.PI;
		return L.bounds([-d, -d], [d, d]);
	})()
};



/*
 * L.CRS is the base object for all defined CRS (Coordinate Reference Systems) in Leaflet.
 */

L.CRS = {
	// converts geo coords to pixel ones
	latLngToPoint: function (latlng, zoom) {
		var projectedPoint = this.projection.project(latlng),
		    scale = this.scale(zoom);

		return this.transformation._transform(projectedPoint, scale);
	},

	// converts pixel coords to geo coords
	pointToLatLng: function (point, zoom) {
		var scale = this.scale(zoom),
		    untransformedPoint = this.transformation.untransform(point, scale);

		return this.projection.unproject(untransformedPoint);
	},

	// converts geo coords to projection-specific coords (e.g. in meters)
	project: function (latlng) {
		return this.projection.project(latlng);
	},

	// converts projected coords to geo coords
	unproject: function (point) {
		return this.projection.unproject(point);
	},

	// defines how the world scales with zoom
	scale: function (zoom) {
		return 256 * Math.pow(2, zoom);
	},

	zoom: function (scale) {
		return Math.log(scale / 256) / Math.LN2;
	},

	// returns the bounds of the world in projected coords if applicable
	getProjectedBounds: function (zoom) {
		if (this.infinite) { return null; }

		var b = this.projection.bounds,
		    s = this.scale(zoom),
		    min = this.transformation.transform(b.min, s),
		    max = this.transformation.transform(b.max, s);

		return L.bounds(min, max);
	},

	// whether a coordinate axis wraps in a given range (e.g. longitude from -180 to 180); depends on CRS
	// wrapLng: [min, max],
	// wrapLat: [min, max],

	// if true, the coordinate space will be unbounded (infinite in all directions)
	// infinite: false,

	// wraps geo coords in certain ranges if applicable
	wrapLatLng: function (latlng) {
		var lng = this.wrapLng ? L.Util.wrapNum(latlng.lng, this.wrapLng, true) : latlng.lng,
		    lat = this.wrapLat ? L.Util.wrapNum(latlng.lat, this.wrapLat, true) : latlng.lat,
		    alt = latlng.alt;

		return L.latLng(lat, lng, alt);
	}
};



/*
 * A simple CRS that can be used for flat non-Earth maps like panoramas or game maps.
 */

L.CRS.Simple = L.extend({}, L.CRS, {
	projection: L.Projection.LonLat,
	transformation: new L.Transformation(1, 0, -1, 0),

	scale: function (zoom) {
		return Math.pow(2, zoom);
	},

	zoom: function (scale) {
		return Math.log(scale) / Math.LN2;
	},

	distance: function (latlng1, latlng2) {
		var dx = latlng2.lng - latlng1.lng,
		    dy = latlng2.lat - latlng1.lat;

		return Math.sqrt(dx * dx + dy * dy);
	},

	infinite: true
});



/*
 * L.CRS.Earth is the base class for all CRS representing Earth.
 */

L.CRS.Earth = L.extend({}, L.CRS, {
	wrapLng: [-180, 180],

	R: 6378137,

	// distance between two geographical points using spherical law of cosines approximation
	distance: function (latlng1, latlng2) {
		var rad = Math.PI / 180,
		    lat1 = latlng1.lat * rad,
		    lat2 = latlng2.lat * rad,
		    a = Math.sin(lat1) * Math.sin(lat2) +
		        Math.cos(lat1) * Math.cos(lat2) * Math.cos((latlng2.lng - latlng1.lng) * rad);

		return this.R * Math.acos(Math.min(a, 1));
	}
});



/*
 * L.CRS.EPSG3857 (Spherical Mercator) is the most common CRS for web mapping and is used by Leaflet by default.
 */

L.CRS.EPSG3857 = L.extend({}, L.CRS.Earth, {
	code: 'EPSG:3857',
	projection: L.Projection.SphericalMercator,

	transformation: (function () {
		var scale = 0.5 / (Math.PI * L.Projection.SphericalMercator.R);
		return new L.Transformation(scale, 0.5, -scale, 0.5);
	}())
});

L.CRS.EPSG900913 = L.extend({}, L.CRS.EPSG3857, {
	code: 'EPSG:900913'
});



/*
 * L.CRS.EPSG4326 is a CRS popular among advanced GIS specialists.
 */

L.CRS.EPSG4326 = L.extend({}, L.CRS.Earth, {
	code: 'EPSG:4326',
	projection: L.Projection.LonLat,
	transformation: new L.Transformation(1 / 180, 1, -1 / 180, 0.5)
});



/*
 * L.Map is the central class of the API - it is used to create a map.
 */

L.Map = L.Evented.extend({

	options: {
		crs: L.CRS.EPSG3857,

		/*
		center: LatLng,
		zoom: Number,
		layers: Array,
		*/

		fadeAnimation: true,
		trackResize: true,
		markerZoomAnimation: true,
		maxBoundsViscosity: 0.0,
		transform3DLimit: 8388608 // Precision limit of a 32-bit float
	},

	initialize: function (id, options) { // (HTMLElement or String, Object)
		options = L.setOptions(this, options);

		this._initContainer(id);
		this._initLayout();

		// hack for https://github.com/Leaflet/Leaflet/issues/1980
		this._onResize = L.bind(this._onResize, this);

		this._initEvents();

		if (options.maxBounds) {
			this.setMaxBounds(options.maxBounds);
		}

		if (options.zoom !== undefined) {
			this._zoom = this._limitZoom(options.zoom);
		}

		if (options.center && options.zoom !== undefined) {
			this.setView(L.latLng(options.center), options.zoom, {reset: true});
		}

		this._handlers = [];
		this._layers = {};
		this._zoomBoundLayers = {};
		this._sizeChanged = true;

		this.callInitHooks();

		this._addLayers(this.options.layers);
	},


	// public methods that modify map state

	// replaced by animation-powered implementation in Map.PanAnimation.js
	setView: function (center, zoom) {
		zoom = zoom === undefined ? this.getZoom() : zoom;
		this._resetView(L.latLng(center), zoom);
		return this;
	},

	setZoom: function (zoom, options) {
		if (!this._loaded) {
			this._zoom = zoom;
			return this;
		}
		return this.setView(this.getCenter(), zoom, {zoom: options});
	},

	zoomIn: function (delta, options) {
		return this.setZoom(this._zoom + (delta || 1), options);
	},

	zoomOut: function (delta, options) {
		return this.setZoom(this._zoom - (delta || 1), options);
	},

	setZoomAround: function (latlng, zoom, options) {
		var scale = this.getZoomScale(zoom),
		    viewHalf = this.getSize().divideBy(2),
		    containerPoint = latlng instanceof L.Point ? latlng : this.latLngToContainerPoint(latlng),

		    centerOffset = containerPoint.subtract(viewHalf).multiplyBy(1 - 1 / scale),
		    newCenter = this.containerPointToLatLng(viewHalf.add(centerOffset));

		return this.setView(newCenter, zoom, {zoom: options});
	},

	_getBoundsCenterZoom: function (bounds, options) {

		options = options || {};
		bounds = bounds.getBounds ? bounds.getBounds() : L.latLngBounds(bounds);

		var paddingTL = L.point(options.paddingTopLeft || options.padding || [0, 0]),
		    paddingBR = L.point(options.paddingBottomRight || options.padding || [0, 0]),

		    zoom = this.getBoundsZoom(bounds, false, paddingTL.add(paddingBR));

		zoom = options.maxZoom ? Math.min(options.maxZoom, zoom) : zoom;

		var paddingOffset = paddingBR.subtract(paddingTL).divideBy(2),

		    swPoint = this.project(bounds.getSouthWest(), zoom),
		    nePoint = this.project(bounds.getNorthEast(), zoom),
		    center = this.unproject(swPoint.add(nePoint).divideBy(2).add(paddingOffset), zoom);

		return {
			center: center,
			zoom: zoom
		};
	},

	fitBounds: function (bounds, options) {
		var target = this._getBoundsCenterZoom(bounds, options);
		return this.setView(target.center, target.zoom, options);
	},

	fitWorld: function (options) {
		return this.fitBounds([[-90, -180], [90, 180]], options);
	},

	panTo: function (center, options) { // (LatLng)
		return this.setView(center, this._zoom, {pan: options});
	},

	panBy: function (offset) { // (Point)
		// replaced with animated panBy in Map.PanAnimation.js
		this.fire('movestart');

		this._rawPanBy(L.point(offset));

		this.fire('move');
		return this.fire('moveend');
	},

	setMaxBounds: function (bounds) {
		bounds = L.latLngBounds(bounds);

		if (!bounds) {
			return this.off('moveend', this._panInsideMaxBounds);
		} else if (this.options.maxBounds) {
			this.off('moveend', this._panInsideMaxBounds);
		}

		this.options.maxBounds = bounds;

		if (this._loaded) {
			this._panInsideMaxBounds();
		}

		return this.on('moveend', this._panInsideMaxBounds);
	},

	setMinZoom: function (zoom) {
		this.options.minZoom = zoom;

		if (this._loaded && this.getZoom() < this.options.minZoom) {
			return this.setZoom(zoom);
		}

		return this;
	},

	setMaxZoom: function (zoom) {
		this.options.maxZoom = zoom;

		if (this._loaded && (this.getZoom() > this.options.maxZoom)) {
			return this.setZoom(zoom);
		}

		return this;
	},

	panInsideBounds: function (bounds, options) {
		this._enforcingBounds = true;
		var center = this.getCenter(),
		    newCenter = this._limitCenter(center, this._zoom, L.latLngBounds(bounds));

		if (center.equals(newCenter)) { return this; }

		this.panTo(newCenter, options);
		this._enforcingBounds = false;
		return this;
	},

	invalidateSize: function (options) {
		if (!this._loaded) { return this; }

		options = L.extend({
			animate: false,
			pan: true
		}, options === true ? {animate: true} : options);

		var oldSize = this.getSize();
		this._sizeChanged = true;
		this._lastCenter = null;

		var newSize = this.getSize(),
		    oldCenter = oldSize.divideBy(2).round(),
		    newCenter = newSize.divideBy(2).round(),
		    offset = oldCenter.subtract(newCenter);

		if (!offset.x && !offset.y) { return this; }

		if (options.animate && options.pan) {
			this.panBy(offset);

		} else {
			if (options.pan) {
				this._rawPanBy(offset);
			}

			this.fire('move');

			if (options.debounceMoveend) {
				clearTimeout(this._sizeTimer);
				this._sizeTimer = setTimeout(L.bind(this.fire, this, 'moveend'), 200);
			} else {
				this.fire('moveend');
			}
		}

		return this.fire('resize', {
			oldSize: oldSize,
			newSize: newSize
		});
	},

	stop: function () {
		L.Util.cancelAnimFrame(this._flyToFrame);
		if (this._panAnim) {
			this._panAnim.stop();
		}
		return this;
	},

	// TODO handler.addTo
	addHandler: function (name, HandlerClass) {
		if (!HandlerClass) { return this; }

		var handler = this[name] = new HandlerClass(this);

		this._handlers.push(handler);

		if (this.options[name]) {
			handler.enable();
		}

		return this;
	},

	remove: function () {

		this._initEvents(true);

		try {
			// throws error in IE6-8
			delete this._container._leaflet;
		} catch (e) {
			this._container._leaflet = undefined;
		}

		L.DomUtil.remove(this._mapPane);

		if (this._clearControlPos) {
			this._clearControlPos();
		}

		this._clearHandlers();

		if (this._loaded) {
			this.fire('unload');
		}

		for (var i in this._layers) {
			this._layers[i].remove();
		}

		return this;
	},

	createPane: function (name, container) {
		var className = 'leaflet-pane' + (name ? ' leaflet-' + name.replace('Pane', '') + '-pane' : ''),
		    pane = L.DomUtil.create('div', className, container || this._mapPane);

		if (name) {
			this._panes[name] = pane;
		}
		return pane;
	},


	// public methods for getting map state

	getCenter: function () { // (Boolean) -> LatLng
		this._checkIfLoaded();

		if (this._lastCenter && !this._moved()) {
			return this._lastCenter;
		}
		return this.layerPointToLatLng(this._getCenterLayerPoint());
	},

	getZoom: function () {
		return this._zoom;
	},

	getBounds: function () {
		var bounds = this.getPixelBounds(),
		    sw = this.unproject(bounds.getBottomLeft()),
		    ne = this.unproject(bounds.getTopRight());

		return new L.LatLngBounds(sw, ne);
	},

	getMinZoom: function () {
		return this.options.minZoom === undefined ? this._layersMinZoom || 0 : this.options.minZoom;
	},

	getMaxZoom: function () {
		return this.options.maxZoom === undefined ?
			(this._layersMaxZoom === undefined ? Infinity : this._layersMaxZoom) :
			this.options.maxZoom;
	},

	getBoundsZoom: function (bounds, inside, padding) { // (LatLngBounds[, Boolean, Point]) -> Number
		bounds = L.latLngBounds(bounds);

		var zoom = this.getMinZoom() - (inside ? 1 : 0),
		    maxZoom = this.getMaxZoom(),
		    size = this.getSize(),

		    nw = bounds.getNorthWest(),
		    se = bounds.getSouthEast(),

		    zoomNotFound = true,
		    boundsSize;

		padding = L.point(padding || [0, 0]);

		do {
			zoom++;
			boundsSize = this.project(se, zoom).subtract(this.project(nw, zoom)).add(padding).floor();
			zoomNotFound = !inside ? size.contains(boundsSize) : boundsSize.x < size.x || boundsSize.y < size.y;

		} while (zoomNotFound && zoom <= maxZoom);

		if (zoomNotFound && inside) {
			return null;
		}

		return inside ? zoom : zoom - 1;
	},

	getSize: function () {
		if (!this._size || this._sizeChanged) {
			this._size = new L.Point(
				this._container.clientWidth,
				this._container.clientHeight);

			this._sizeChanged = false;
		}
		return this._size.clone();
	},

	getPixelBounds: function (center, zoom) {
		var topLeftPoint = this._getTopLeftPoint(center, zoom);
		return new L.Bounds(topLeftPoint, topLeftPoint.add(this.getSize()));
	},

	getPixelOrigin: function () {
		this._checkIfLoaded();
		return this._pixelOrigin;
	},

	getPixelWorldBounds: function (zoom) {
		return this.options.crs.getProjectedBounds(zoom === undefined ? this.getZoom() : zoom);
	},

	getPane: function (pane) {
		return typeof pane === 'string' ? this._panes[pane] : pane;
	},

	getPanes: function () {
		return this._panes;
	},

	getContainer: function () {
		return this._container;
	},


	// TODO replace with universal implementation after refactoring projections

	getZoomScale: function (toZoom, fromZoom) {
		var crs = this.options.crs;
		fromZoom = fromZoom === undefined ? this._zoom : fromZoom;
		return crs.scale(toZoom) / crs.scale(fromZoom);
	},

	getScaleZoom: function (scale, fromZoom) {
		var crs = this.options.crs;
		fromZoom = fromZoom === undefined ? this._zoom : fromZoom;
		return crs.zoom(scale * crs.scale(fromZoom));
	},

	// conversion methods

	project: function (latlng, zoom) { // (LatLng[, Number]) -> Point
		zoom = zoom === undefined ? this._zoom : zoom;
		return this.options.crs.latLngToPoint(L.latLng(latlng), zoom);
	},

	unproject: function (point, zoom) { // (Point[, Number]) -> LatLng
		zoom = zoom === undefined ? this._zoom : zoom;
		return this.options.crs.pointToLatLng(L.point(point), zoom);
	},

	layerPointToLatLng: function (point) { // (Point)
		var projectedPoint = L.point(point).add(this.getPixelOrigin());
		return this.unproject(projectedPoint);
	},

	latLngToLayerPoint: function (latlng) { // (LatLng)
		var projectedPoint = this.project(L.latLng(latlng))._round();
		return projectedPoint._subtract(this.getPixelOrigin());
	},

	wrapLatLng: function (latlng) {
		return this.options.crs.wrapLatLng(L.latLng(latlng));
	},

	distance: function (latlng1, latlng2) {
		return this.options.crs.distance(L.latLng(latlng1), L.latLng(latlng2));
	},

	containerPointToLayerPoint: function (point) { // (Point)
		return L.point(point).subtract(this._getMapPanePos());
	},

	layerPointToContainerPoint: function (point) { // (Point)
		return L.point(point).add(this._getMapPanePos());
	},

	containerPointToLatLng: function (point) {
		var layerPoint = this.containerPointToLayerPoint(L.point(point));
		return this.layerPointToLatLng(layerPoint);
	},

	latLngToContainerPoint: function (latlng) {
		return this.layerPointToContainerPoint(this.latLngToLayerPoint(L.latLng(latlng)));
	},

	mouseEventToContainerPoint: function (e) { // (MouseEvent)
		return L.DomEvent.getMousePosition(e, this._container);
	},

	mouseEventToLayerPoint: function (e) { // (MouseEvent)
		return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
	},

	mouseEventToLatLng: function (e) { // (MouseEvent)
		return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
	},


	// map initialization methods

	_initContainer: function (id) {
		var container = this._container = L.DomUtil.get(id);

		if (!container) {
			throw new Error('Map container not found.');
		} else if (container._leaflet) {
			throw new Error('Map container is already initialized.');
		}

		L.DomEvent.addListener(container, 'scroll', this._onScroll, this);
		container._leaflet = true;
	},

	_initLayout: function () {
		var container = this._container;

		this._fadeAnimated = this.options.fadeAnimation && L.Browser.any3d;

		L.DomUtil.addClass(container, 'leaflet-container' +
			(L.Browser.touch ? ' leaflet-touch' : '') +
			(L.Browser.retina ? ' leaflet-retina' : '') +
			(L.Browser.ielt9 ? ' leaflet-oldie' : '') +
			(L.Browser.safari ? ' leaflet-safari' : '') +
			(this._fadeAnimated ? ' leaflet-fade-anim' : ''));

		var position = L.DomUtil.getStyle(container, 'position');

		if (position !== 'absolute' && position !== 'relative' && position !== 'fixed') {
			container.style.position = 'relative';
		}

		this._initPanes();

		if (this._initControlPos) {
			this._initControlPos();
		}
	},

	_initPanes: function () {
		var panes = this._panes = {};
		this._paneRenderers = {};

		this._mapPane = this.createPane('mapPane', this._container);
		L.DomUtil.setPosition(this._mapPane, new L.Point(0, 0));

		this.createPane('tilePane');
		this.createPane('shadowPane');
		this.createPane('overlayPane');
		this.createPane('markerPane');
		this.createPane('popupPane');

		if (!this.options.markerZoomAnimation) {
			L.DomUtil.addClass(panes.markerPane, 'leaflet-zoom-hide');
			L.DomUtil.addClass(panes.shadowPane, 'leaflet-zoom-hide');
		}
	},


	// private methods that modify map state

	_resetView: function (center, zoom) {
		L.DomUtil.setPosition(this._mapPane, new L.Point(0, 0));

		var loading = !this._loaded;
		this._loaded = true;
		zoom = this._limitZoom(zoom);

		var zoomChanged = this._zoom !== zoom;
		this
			._moveStart(zoomChanged)
			._move(center, zoom)
			._moveEnd(zoomChanged);

		this.fire('viewreset');

		if (loading) {
			this.fire('load');
		}
	},

	_moveStart: function (zoomChanged) {
		if (zoomChanged) {
			this.fire('zoomstart');
		}
		return this.fire('movestart');
	},

	_move: function (center, zoom, data) {
		if (zoom === undefined) {
			zoom = this._zoom;
		}

		var zoomChanged = this._zoom !== zoom;

		this._zoom = zoom;
		this._lastCenter = center;
		this._pixelOrigin = this._getNewPixelOrigin(center);

		if (zoomChanged) {
			this.fire('zoom', data);
		}
		return this.fire('move', data);
	},

	_moveEnd: function (zoomChanged) {
		if (zoomChanged) {
			this.fire('zoomend');
		}
		return this.fire('moveend');
	},

	_rawPanBy: function (offset) {
		L.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
	},

	_getZoomSpan: function () {
		return this.getMaxZoom() - this.getMinZoom();
	},

	_panInsideMaxBounds: function () {
		if (!this._enforcingBounds) {
			this.panInsideBounds(this.options.maxBounds);
		}
	},

	_checkIfLoaded: function () {
		if (!this._loaded) {
			throw new Error('Set map center and zoom first.');
		}
	},

	// DOM event handling

	_initEvents: function (remove) {
		if (!L.DomEvent) { return; }

		this._targets = {};
		this._targets[L.stamp(this._container)] = this;

		var onOff = remove ? 'off' : 'on';

		L.DomEvent[onOff](this._container, 'click dblclick mousedown mouseup ' +
			'mouseover mouseout mousemove contextmenu keypress', this._handleDOMEvent, this);

		if (this.options.trackResize) {
			L.DomEvent[onOff](window, 'resize', this._onResize, this);
		}

		if (L.Browser.any3d && this.options.transform3DLimit) {
			this[onOff]('moveend', this._onMoveEnd);
		}
	},

	_onResize: function () {
		L.Util.cancelAnimFrame(this._resizeRequest);
		this._resizeRequest = L.Util.requestAnimFrame(
		        function () { this.invalidateSize({debounceMoveend: true}); }, this);
	},

	_onScroll: function () {
		this._container.scrollTop  = 0;
		this._container.scrollLeft = 0;
	},

	_onMoveEnd: function () {
		var pos = this._getMapPanePos();
		if (Math.max(Math.abs(pos.x), Math.abs(pos.y)) >= this.options.transform3DLimit) {
			// https://bugzilla.mozilla.org/show_bug.cgi?id=1203873 but Webkit also have
			// a pixel offset on very high values, see: http://jsfiddle.net/dg6r5hhb/
			this._resetView(this.getCenter(), this.getZoom());
		}
	},

	_findEventTargets: function (e, type) {
		var targets = [],
		    target,
		    isHover = type === 'mouseout' || type === 'mouseover',
		    src = e.target || e.srcElement;

		while (src) {
			target = this._targets[L.stamp(src)];
			if (target && target.listens(type, true)) {
				if (isHover && !L.DomEvent._isExternalTarget(src, e)) { break; }
				targets.push(target);
				if (isHover) { break; }
			}
			if (src === this._container) { break; }
			src = src.parentNode;
		}
		if (!targets.length && !isHover && L.DomEvent._isExternalTarget(src, e)) {
			targets = [this];
		}
		return targets;
	},

	_handleDOMEvent: function (e) {
		if (!this._loaded || L.DomEvent._skipped(e)) { return; }

		// find the layer the event is propagating from and its parents
		var type = e.type === 'keypress' && e.keyCode === 13 ? 'click' : e.type;

		if (e.type === 'click') {
			// Fire a synthetic 'preclick' event which propagates up (mainly for closing popups).
			var synth = L.Util.extend({}, e);
			synth.type = 'preclick';
			this._handleDOMEvent(synth);
		}

		if (type === 'mousedown') {
			// prevents outline when clicking on keyboard-focusable element
			L.DomUtil.preventOutline(e.target || e.srcElement);
		}

		this._fireDOMEvent(e, type);
	},

	_fireDOMEvent: function (e, type, targets) {

		if (e._stopped) { return; }

		targets = (targets || []).concat(this._findEventTargets(e, type));

		if (!targets.length) { return; }

		var target = targets[0];
		if (type === 'contextmenu' && target.listens(type, true)) {
			L.DomEvent.preventDefault(e);
		}

		// prevents firing click after you just dragged an object
		if ((e.type === 'click' || e.type === 'preclick') && !e._simulated && this._draggableMoved(target)) { return; }

		var data = {
			originalEvent: e
		};

		if (e.type !== 'keypress') {
			var isMarker = target instanceof L.Marker;
			data.containerPoint = isMarker ?
					this.latLngToContainerPoint(target.getLatLng()) : this.mouseEventToContainerPoint(e);
			data.layerPoint = this.containerPointToLayerPoint(data.containerPoint);
			data.latlng = isMarker ? target.getLatLng() : this.layerPointToLatLng(data.layerPoint);
		}

		for (var i = 0; i < targets.length; i++) {
			targets[i].fire(type, data, true);
			if (data.originalEvent._stopped ||
				(targets[i].options.nonBubblingEvents && L.Util.indexOf(targets[i].options.nonBubblingEvents, type) !== -1)) { return; }
		}
	},

	_draggableMoved: function (obj) {
		obj = obj.options.draggable ? obj : this;
		return (obj.dragging && obj.dragging.moved()) || (this.boxZoom && this.boxZoom.moved());
	},

	_clearHandlers: function () {
		for (var i = 0, len = this._handlers.length; i < len; i++) {
			this._handlers[i].disable();
		}
	},

	whenReady: function (callback, context) {
		if (this._loaded) {
			callback.call(context || this, {target: this});
		} else {
			this.on('load', callback, context);
		}
		return this;
	},


	// private methods for getting map state

	_getMapPanePos: function () {
		return L.DomUtil.getPosition(this._mapPane) || new L.Point(0, 0);
	},

	_moved: function () {
		var pos = this._getMapPanePos();
		return pos && !pos.equals([0, 0]);
	},

	_getTopLeftPoint: function (center, zoom) {
		var pixelOrigin = center && zoom !== undefined ?
			this._getNewPixelOrigin(center, zoom) :
			this.getPixelOrigin();
		return pixelOrigin.subtract(this._getMapPanePos());
	},

	_getNewPixelOrigin: function (center, zoom) {
		var viewHalf = this.getSize()._divideBy(2);
		return this.project(center, zoom)._subtract(viewHalf)._add(this._getMapPanePos())._round();
	},

	_latLngToNewLayerPoint: function (latlng, zoom, center) {
		var topLeft = this._getNewPixelOrigin(center, zoom);
		return this.project(latlng, zoom)._subtract(topLeft);
	},

	// layer point of the current center
	_getCenterLayerPoint: function () {
		return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
	},

	// offset of the specified place to the current center in pixels
	_getCenterOffset: function (latlng) {
		return this.latLngToLayerPoint(latlng).subtract(this._getCenterLayerPoint());
	},

	// adjust center for view to get inside bounds
	_limitCenter: function (center, zoom, bounds) {

		if (!bounds) { return center; }

		var centerPoint = this.project(center, zoom),
		    viewHalf = this.getSize().divideBy(2),
		    viewBounds = new L.Bounds(centerPoint.subtract(viewHalf), centerPoint.add(viewHalf)),
		    offset = this._getBoundsOffset(viewBounds, bounds, zoom);

		return this.unproject(centerPoint.add(offset), zoom);
	},

	// adjust offset for view to get inside bounds
	_limitOffset: function (offset, bounds) {
		if (!bounds) { return offset; }

		var viewBounds = this.getPixelBounds(),
		    newBounds = new L.Bounds(viewBounds.min.add(offset), viewBounds.max.add(offset));

		return offset.add(this._getBoundsOffset(newBounds, bounds));
	},

	// returns offset needed for pxBounds to get inside maxBounds at a specified zoom
	_getBoundsOffset: function (pxBounds, maxBounds, zoom) {
		var nwOffset = this.project(maxBounds.getNorthWest(), zoom).subtract(pxBounds.min),
		    seOffset = this.project(maxBounds.getSouthEast(), zoom).subtract(pxBounds.max),

		    dx = this._rebound(nwOffset.x, -seOffset.x),
		    dy = this._rebound(nwOffset.y, -seOffset.y);

		return new L.Point(dx, dy);
	},

	_rebound: function (left, right) {
		return left + right > 0 ?
			Math.round(left - right) / 2 :
			Math.max(0, Math.ceil(left)) - Math.max(0, Math.floor(right));
	},

	_limitZoom: function (zoom) {
		var min = this.getMinZoom(),
		    max = this.getMaxZoom();
		if (!L.Browser.any3d) { zoom = Math.round(zoom); }

		return Math.max(min, Math.min(max, zoom));
	}
});

L.map = function (id, options) {
	return new L.Map(id, options);
};




L.Layer = L.Evented.extend({

	options: {
		pane: 'overlayPane',
		nonBubblingEvents: []  // Array of events that should not be bubbled to DOM parents (like the map)
	},

	addTo: function (map) {
		map.addLayer(this);
		return this;
	},

	remove: function () {
		return this.removeFrom(this._map || this._mapToAdd);
	},

	removeFrom: function (obj) {
		if (obj) {
			obj.removeLayer(this);
		}
		return this;
	},

	getPane: function (name) {
		return this._map.getPane(name ? (this.options[name] || name) : this.options.pane);
	},

	addInteractiveTarget: function (targetEl) {
		this._map._targets[L.stamp(targetEl)] = this;
		return this;
	},

	removeInteractiveTarget: function (targetEl) {
		delete this._map._targets[L.stamp(targetEl)];
		return this;
	},

	_layerAdd: function (e) {
		var map = e.target;

		// check in case layer gets added and then removed before the map is ready
		if (!map.hasLayer(this)) { return; }

		this._map = map;
		this._zoomAnimated = map._zoomAnimated;

		if (this.getEvents) {
			map.on(this.getEvents(), this);
		}

		this.onAdd(map);

		if (this.getAttribution && this._map.attributionControl) {
			this._map.attributionControl.addAttribution(this.getAttribution());
		}

		this.fire('add');
		map.fire('layeradd', {layer: this});
	}
});


L.Map.include({
	addLayer: function (layer) {
		var id = L.stamp(layer);
		if (this._layers[id]) { return layer; }
		this._layers[id] = layer;

		layer._mapToAdd = this;

		if (layer.beforeAdd) {
			layer.beforeAdd(this);
		}

		this.whenReady(layer._layerAdd, layer);

		return this;
	},

	removeLayer: function (layer) {
		var id = L.stamp(layer);

		if (!this._layers[id]) { return this; }

		if (this._loaded) {
			layer.onRemove(this);
		}

		if (layer.getAttribution && this.attributionControl) {
			this.attributionControl.removeAttribution(layer.getAttribution());
		}

		if (layer.getEvents) {
			this.off(layer.getEvents(), layer);
		}

		delete this._layers[id];

		if (this._loaded) {
			this.fire('layerremove', {layer: layer});
			layer.fire('remove');
		}

		layer._map = layer._mapToAdd = null;

		return this;
	},

	hasLayer: function (layer) {
		return !!layer && (L.stamp(layer) in this._layers);
	},

	eachLayer: function (method, context) {
		for (var i in this._layers) {
			method.call(context, this._layers[i]);
		}
		return this;
	},

	_addLayers: function (layers) {
		layers = layers ? (L.Util.isArray(layers) ? layers : [layers]) : [];

		for (var i = 0, len = layers.length; i < len; i++) {
			this.addLayer(layers[i]);
		}
	},

	_addZoomLimit: function (layer) {
		if (isNaN(layer.options.maxZoom) || !isNaN(layer.options.minZoom)) {
			this._zoomBoundLayers[L.stamp(layer)] = layer;
			this._updateZoomLevels();
		}
	},

	_removeZoomLimit: function (layer) {
		var id = L.stamp(layer);

		if (this._zoomBoundLayers[id]) {
			delete this._zoomBoundLayers[id];
			this._updateZoomLevels();
		}
	},

	_updateZoomLevels: function () {
		var minZoom = Infinity,
		    maxZoom = -Infinity,
		    oldZoomSpan = this._getZoomSpan();

		for (var i in this._zoomBoundLayers) {
			var options = this._zoomBoundLayers[i].options;

			minZoom = options.minZoom === undefined ? minZoom : Math.min(minZoom, options.minZoom);
			maxZoom = options.maxZoom === undefined ? maxZoom : Math.max(maxZoom, options.maxZoom);
		}

		this._layersMaxZoom = maxZoom === -Infinity ? undefined : maxZoom;
		this._layersMinZoom = minZoom === Infinity ? undefined : minZoom;

		if (oldZoomSpan !== this._getZoomSpan()) {
			this.fire('zoomlevelschange');
		}
	}
});



/*
 * Mercator projection that takes into account that the Earth is not a perfect sphere.
 * Less popular than spherical mercator; used by projections like EPSG:3395.
 */

L.Projection.Mercator = {
	R: 6378137,
	R_MINOR: 6356752.314245179,

	bounds: L.bounds([-20037508.34279, -15496570.73972], [20037508.34279, 18764656.23138]),

	project: function (latlng) {
		var d = Math.PI / 180,
		    r = this.R,
		    y = latlng.lat * d,
		    tmp = this.R_MINOR / r,
		    e = Math.sqrt(1 - tmp * tmp),
		    con = e * Math.sin(y);

		var ts = Math.tan(Math.PI / 4 - y / 2) / Math.pow((1 - con) / (1 + con), e / 2);
		y = -r * Math.log(Math.max(ts, 1E-10));

		return new L.Point(latlng.lng * d * r, y);
	},

	unproject: function (point) {
		var d = 180 / Math.PI,
		    r = this.R,
		    tmp = this.R_MINOR / r,
		    e = Math.sqrt(1 - tmp * tmp),
		    ts = Math.exp(-point.y / r),
		    phi = Math.PI / 2 - 2 * Math.atan(ts);

		for (var i = 0, dphi = 0.1, con; i < 15 && Math.abs(dphi) > 1e-7; i++) {
			con = e * Math.sin(phi);
			con = Math.pow((1 - con) / (1 + con), e / 2);
			dphi = Math.PI / 2 - 2 * Math.atan(ts * con) - phi;
			phi += dphi;
		}

		return new L.LatLng(phi * d, point.x * d / r);
	}
};



/*
 * L.CRS.EPSG3857 (World Mercator) CRS implementation.
 */

L.CRS.EPSG3395 = L.extend({}, L.CRS.Earth, {
	code: 'EPSG:3395',
	projection: L.Projection.Mercator,

	transformation: (function () {
		var scale = 0.5 / (Math.PI * L.Projection.Mercator.R);
		return new L.Transformation(scale, 0.5, -scale, 0.5);
	}())
});



/*
 * L.GridLayer is used as base class for grid-like layers like TileLayer.
 */

L.GridLayer = L.Layer.extend({

	options: {
		pane: 'tilePane',

		tileSize: 256,
		opacity: 1,
		zIndex: 1,

		updateWhenIdle: L.Browser.mobile,
		updateInterval: 200,

		attribution: null,
		bounds: null,

		minZoom: 0
		// maxZoom: <Number>
		// noWrap: false
	},

	initialize: function (options) {
		options = L.setOptions(this, options);
	},

	onAdd: function () {
		this._initContainer();

		this._levels = {};
		this._tiles = {};

		this._resetView();
		this._update();
	},

	beforeAdd: function (map) {
		map._addZoomLimit(this);
	},

	onRemove: function (map) {
		L.DomUtil.remove(this._container);
		map._removeZoomLimit(this);
		this._container = null;
		this._tileZoom = null;
	},

	bringToFront: function () {
		if (this._map) {
			L.DomUtil.toFront(this._container);
			this._setAutoZIndex(Math.max);
		}
		return this;
	},

	bringToBack: function () {
		if (this._map) {
			L.DomUtil.toBack(this._container);
			this._setAutoZIndex(Math.min);
		}
		return this;
	},

	getAttribution: function () {
		return this.options.attribution;
	},

	getContainer: function () {
		return this._container;
	},

	setOpacity: function (opacity) {
		this.options.opacity = opacity;
		this._updateOpacity();
		return this;
	},

	setZIndex: function (zIndex) {
		this.options.zIndex = zIndex;
		this._updateZIndex();

		return this;
	},

	isLoading: function () {
		return this._loading;
	},

	redraw: function () {
		if (this._map) {
			this._removeAllTiles();
			this._update();
		}
		return this;
	},

	getEvents: function () {
		var events = {
			viewreset: this._resetAll,
			zoom: this._resetView,
			moveend: this._onMoveEnd
		};

		if (!this.options.updateWhenIdle) {
			// update tiles on move, but not more often than once per given interval
			if (!this._onMove) {
				this._onMove = L.Util.throttle(this._onMoveEnd, this.options.updateInterval, this);
			}

			events.move = this._onMove;
		}

		if (this._zoomAnimated) {
			events.zoomanim = this._animateZoom;
		}

		return events;
	},

	createTile: function () {
		return document.createElement('div');
	},

	getTileSize: function () {
		var s = this.options.tileSize;
		return s instanceof L.Point ? s : new L.Point(s, s);
	},

	_updateZIndex: function () {
		if (this._container && this.options.zIndex !== undefined && this.options.zIndex !== null) {
			this._container.style.zIndex = this.options.zIndex;
		}
	},

	_setAutoZIndex: function (compare) {
		// go through all other layers of the same pane, set zIndex to max + 1 (front) or min - 1 (back)

		var layers = this.getPane().children,
		    edgeZIndex = -compare(-Infinity, Infinity); // -Infinity for max, Infinity for min

		for (var i = 0, len = layers.length, zIndex; i < len; i++) {

			zIndex = layers[i].style.zIndex;

			if (layers[i] !== this._container && zIndex) {
				edgeZIndex = compare(edgeZIndex, +zIndex);
			}
		}

		if (isFinite(edgeZIndex)) {
			this.options.zIndex = edgeZIndex + compare(-1, 1);
			this._updateZIndex();
		}
	},

	_updateOpacity: function () {
		if (!this._map) { return; }

		// IE doesn't inherit filter opacity properly, so we're forced to set it on tiles
		if (L.Browser.ielt9 || !this._map._fadeAnimated) {
			return;
		}

		L.DomUtil.setOpacity(this._container, this.options.opacity);

		var now = +new Date(),
		    nextFrame = false,
		    willPrune = false;

		for (var key in this._tiles) {
			var tile = this._tiles[key];
			if (!tile.current || !tile.loaded) { continue; }

			var fade = Math.min(1, (now - tile.loaded) / 200);

			L.DomUtil.setOpacity(tile.el, fade);
			if (fade < 1) {
				nextFrame = true;
			} else {
				if (tile.active) { willPrune = true; }
				tile.active = true;
			}
		}

		if (willPrune && !this._noPrune) { this._pruneTiles(); }

		if (nextFrame) {
			L.Util.cancelAnimFrame(this._fadeFrame);
			this._fadeFrame = L.Util.requestAnimFrame(this._updateOpacity, this);
		}
	},

	_initContainer: function () {
		if (this._container) { return; }

		this._container = L.DomUtil.create('div', 'leaflet-layer');
		this._updateZIndex();

		if (this.options.opacity < 1) {
			this._updateOpacity();
		}

		this.getPane().appendChild(this._container);
	},

	_updateLevels: function () {

		var zoom = this._tileZoom,
		    maxZoom = this.options.maxZoom;

		for (var z in this._levels) {
			if (this._levels[z].el.children.length || z === zoom) {
				this._levels[z].el.style.zIndex = maxZoom - Math.abs(zoom - z);
			} else {
				L.DomUtil.remove(this._levels[z].el);
				delete this._levels[z];
			}
		}

		var level = this._levels[zoom],
		    map = this._map;

		if (!level) {
			level = this._levels[zoom] = {};

			level.el = L.DomUtil.create('div', 'leaflet-tile-container leaflet-zoom-animated', this._container);
			level.el.style.zIndex = maxZoom;

			level.origin = map.project(map.unproject(map.getPixelOrigin()), zoom).round();
			level.zoom = zoom;

			this._setZoomTransform(level, map.getCenter(), map.getZoom());

			// force the browser to consider the newly added element for transition
			L.Util.falseFn(level.el.offsetWidth);
		}

		this._level = level;

		return level;
	},

	_pruneTiles: function () {
		var key, tile;

		var zoom = this._map.getZoom();
		if (zoom > this.options.maxZoom ||
			zoom < this.options.minZoom) { return this._removeAllTiles(); }

		for (key in this._tiles) {
			tile = this._tiles[key];
			tile.retain = tile.current;
		}

		for (key in this._tiles) {
			tile = this._tiles[key];
			if (tile.current && !tile.active) {
				var coords = tile.coords;
				if (!this._retainParent(coords.x, coords.y, coords.z, coords.z - 5)) {
					this._retainChildren(coords.x, coords.y, coords.z, coords.z + 2);
				}
			}
		}

		for (key in this._tiles) {
			if (!this._tiles[key].retain) {
				this._removeTile(key);
			}
		}
	},

	_removeAllTiles: function () {
		for (var key in this._tiles) {
			this._removeTile(key);
		}
	},

	_resetAll: function () {
		for (var z in this._levels) {
			L.DomUtil.remove(this._levels[z].el);
			delete this._levels[z];
		}
		this._removeAllTiles();

		this._tileZoom = null;
		this._resetView();
	},

	_retainParent: function (x, y, z, minZoom) {
		var x2 = Math.floor(x / 2),
		    y2 = Math.floor(y / 2),
		    z2 = z - 1;

		var key = x2 + ':' + y2 + ':' + z2,
		    tile = this._tiles[key];

		if (tile && tile.active) {
			tile.retain = true;
			return true;

		} else if (tile && tile.loaded) {
			tile.retain = true;
		}

		if (z2 > minZoom) {
			return this._retainParent(x2, y2, z2, minZoom);
		}

		return false;
	},

	_retainChildren: function (x, y, z, maxZoom) {

		for (var i = 2 * x; i < 2 * x + 2; i++) {
			for (var j = 2 * y; j < 2 * y + 2; j++) {

				var key = i + ':' + j + ':' + (z + 1),
				    tile = this._tiles[key];

				if (tile && tile.active) {
					tile.retain = true;
					continue;

				} else if (tile && tile.loaded) {
					tile.retain = true;
				}

				if (z + 1 < maxZoom) {
					this._retainChildren(i, j, z + 1, maxZoom);
				}
			}
		}
	},

	_resetView: function (e) {
		var animating = e && (e.pinch || e.flyTo);
		this._setView(this._map.getCenter(), this._map.getZoom(), animating, animating);
	},

	_animateZoom: function (e) {
		this._setView(e.center, e.zoom, true, e.noUpdate);
	},

	_setView: function (center, zoom, noPrune, noUpdate) {
		var tileZoom = Math.round(zoom);
		if ((this.options.maxZoom !== undefined && tileZoom > this.options.maxZoom) ||
		    (this.options.minZoom !== undefined && tileZoom < this.options.minZoom)) {
			tileZoom = undefined;
		}

		var tileZoomChanged = (tileZoom !== this._tileZoom);

		if (!noUpdate || tileZoomChanged) {

			this._tileZoom = tileZoom;

			if (this._abortLoading) {
				this._abortLoading();
			}

			this._updateLevels();
			this._resetGrid();

			if (tileZoom !== undefined) {
				this._update(center);
			}

			if (!noPrune) {
				this._pruneTiles();
			}

			// Flag to prevent _updateOpacity from pruning tiles during
			// a zoom anim or a pinch gesture
			this._noPrune = !!noPrune;
		}

		this._setZoomTransforms(center, zoom);
	},

	_setZoomTransforms: function (center, zoom) {
		for (var i in this._levels) {
			this._setZoomTransform(this._levels[i], center, zoom);
		}
	},

	_setZoomTransform: function (level, center, zoom) {
		var scale = this._map.getZoomScale(zoom, level.zoom),
		    translate = level.origin.multiplyBy(scale)
		        .subtract(this._map._getNewPixelOrigin(center, zoom)).round();

		if (L.Browser.any3d) {
			L.DomUtil.setTransform(level.el, translate, scale);
		} else {
			L.DomUtil.setPosition(level.el, translate);
		}
	},

	_resetGrid: function () {
		var map = this._map,
		    crs = map.options.crs,
		    tileSize = this._tileSize = this.getTileSize(),
		    tileZoom = this._tileZoom;

		var bounds = this._map.getPixelWorldBounds(this._tileZoom);
		if (bounds) {
			this._globalTileRange = this._pxBoundsToTileRange(bounds);
		}

		this._wrapX = crs.wrapLng && !this.options.noWrap && [
			Math.floor(map.project([0, crs.wrapLng[0]], tileZoom).x / tileSize.x),
			Math.ceil(map.project([0, crs.wrapLng[1]], tileZoom).x / tileSize.y)
		];
		this._wrapY = crs.wrapLat && !this.options.noWrap && [
			Math.floor(map.project([crs.wrapLat[0], 0], tileZoom).y / tileSize.x),
			Math.ceil(map.project([crs.wrapLat[1], 0], tileZoom).y / tileSize.y)
		];
	},

	_onMoveEnd: function () {
		if (!this._map || this._map._animatingZoom) { return; }

		this._resetView();
	},

	_getTiledPixelBounds: function (center, zoom, tileZoom) {
		var map = this._map,
		    scale = map.getZoomScale(zoom, tileZoom),
		    pixelCenter = map.project(center, tileZoom).floor(),
		    halfSize = map.getSize().divideBy(scale * 2);

		return new L.Bounds(pixelCenter.subtract(halfSize), pixelCenter.add(halfSize));
	},

	// Private method to load tiles in the grid's active zoom level according to map bounds
	_update: function (center) {
		var map = this._map;
		if (!map) { return; }
		var zoom = map.getZoom();

		if (center === undefined) { center = map.getCenter(); }
		if (this._tileZoom === undefined) { return; }	// if out of minzoom/maxzoom

		var pixelBounds = this._getTiledPixelBounds(center, zoom, this._tileZoom),
		    tileRange = this._pxBoundsToTileRange(pixelBounds),
		    tileCenter = tileRange.getCenter(),
		    queue = [];

		for (var key in this._tiles) {
			this._tiles[key].current = false;
		}

		// _update just loads more tiles. If the tile zoom level differs too much
		// from the map's, let _setView reset levels and prune old tiles.
		if (Math.abs(zoom - this._tileZoom) > 1) { this._setView(center, zoom); return; }

		// create a queue of coordinates to load tiles from
		for (var j = tileRange.min.y; j <= tileRange.max.y; j++) {
			for (var i = tileRange.min.x; i <= tileRange.max.x; i++) {
				var coords = new L.Point(i, j);
				coords.z = this._tileZoom;

				if (!this._isValidTile(coords)) { continue; }

				var tile = this._tiles[this._tileCoordsToKey(coords)];
				if (tile) {
					tile.current = true;
				} else {
					queue.push(coords);
				}
			}
		}

		// sort tile queue to load tiles in order of their distance to center
		queue.sort(function (a, b) {
			return a.distanceTo(tileCenter) - b.distanceTo(tileCenter);
		});

		if (queue.length !== 0) {
			// if its the first batch of tiles to load
			if (!this._loading) {
				this._loading = true;
				this.fire('loading');
			}

			// create DOM fragment to append tiles in one batch
			var fragment = document.createDocumentFragment();

			for (i = 0; i < queue.length; i++) {
				this._addTile(queue[i], fragment);
			}

			this._level.el.appendChild(fragment);
		}
	},

	_isValidTile: function (coords) {
		var crs = this._map.options.crs;

		if (!crs.infinite) {
			// don't load tile if it's out of bounds and not wrapped
			var bounds = this._globalTileRange;
			if ((!crs.wrapLng && (coords.x < bounds.min.x || coords.x > bounds.max.x)) ||
			    (!crs.wrapLat && (coords.y < bounds.min.y || coords.y > bounds.max.y))) { return false; }
		}

		if (!this.options.bounds) { return true; }

		// don't load tile if it doesn't intersect the bounds in options
		var tileBounds = this._tileCoordsToBounds(coords);
		return L.latLngBounds(this.options.bounds).overlaps(tileBounds);
	},

	_keyToBounds: function (key) {
		return this._tileCoordsToBounds(this._keyToTileCoords(key));
	},

	// converts tile coordinates to its geographical bounds
	_tileCoordsToBounds: function (coords) {

		var map = this._map,
		    tileSize = this.getTileSize(),

		    nwPoint = coords.scaleBy(tileSize),
		    sePoint = nwPoint.add(tileSize),

		    nw = map.wrapLatLng(map.unproject(nwPoint, coords.z)),
		    se = map.wrapLatLng(map.unproject(sePoint, coords.z));

		return new L.LatLngBounds(nw, se);
	},

	// converts tile coordinates to key for the tile cache
	_tileCoordsToKey: function (coords) {
		return coords.x + ':' + coords.y + ':' + coords.z;
	},

	// converts tile cache key to coordinates
	_keyToTileCoords: function (key) {
		var k = key.split(':'),
		    coords = new L.Point(+k[0], +k[1]);
		coords.z = +k[2];
		return coords;
	},

	_removeTile: function (key) {
		var tile = this._tiles[key];
		if (!tile) { return; }

		L.DomUtil.remove(tile.el);

		delete this._tiles[key];

		this.fire('tileunload', {
			tile: tile.el,
			coords: this._keyToTileCoords(key)
		});
	},

	_initTile: function (tile) {
		L.DomUtil.addClass(tile, 'leaflet-tile');

		var tileSize = this.getTileSize();
		tile.style.width = tileSize.x + 'px';
		tile.style.height = tileSize.y + 'px';

		tile.onselectstart = L.Util.falseFn;
		tile.onmousemove = L.Util.falseFn;

		// update opacity on tiles in IE7-8 because of filter inheritance problems
		if (L.Browser.ielt9 && this.options.opacity < 1) {
			L.DomUtil.setOpacity(tile, this.options.opacity);
		}

		// without this hack, tiles disappear after zoom on Chrome for Android
		// https://github.com/Leaflet/Leaflet/issues/2078
		if (L.Browser.android && !L.Browser.android23) {
			tile.style.WebkitBackfaceVisibility = 'hidden';
		}
	},

	_addTile: function (coords, container) {
		var tilePos = this._getTilePos(coords),
		    key = this._tileCoordsToKey(coords);

		var tile = this.createTile(this._wrapCoords(coords), L.bind(this._tileReady, this, coords));

		this._initTile(tile);

		// if createTile is defined with a second argument ("done" callback),
		// we know that tile is async and will be ready later; otherwise
		if (this.createTile.length < 2) {
			// mark tile as ready, but delay one frame for opacity animation to happen
			L.Util.requestAnimFrame(L.bind(this._tileReady, this, coords, null, tile));
		}

		L.DomUtil.setPosition(tile, tilePos);

		// save tile in cache
		this._tiles[key] = {
			el: tile,
			coords: coords,
			current: true
		};

		container.appendChild(tile);
		this.fire('tileloadstart', {
			tile: tile,
			coords: coords
		});
	},

	_tileReady: function (coords, err, tile) {
		if (!this._map) { return; }

		if (err) {
			this.fire('tileerror', {
				error: err,
				tile: tile,
				coords: coords
			});
		}

		var key = this._tileCoordsToKey(coords);

		tile = this._tiles[key];
		if (!tile) { return; }

		tile.loaded = +new Date();
		if (this._map._fadeAnimated) {
			L.DomUtil.setOpacity(tile.el, 0);
			L.Util.cancelAnimFrame(this._fadeFrame);
			this._fadeFrame = L.Util.requestAnimFrame(this._updateOpacity, this);
		} else {
			tile.active = true;
			this._pruneTiles();
		}

		L.DomUtil.addClass(tile.el, 'leaflet-tile-loaded');

		this.fire('tileload', {
			tile: tile.el,
			coords: coords
		});

		if (this._noTilesToLoad()) {
			this._loading = false;
			this.fire('load');
		}
	},

	_getTilePos: function (coords) {
		return coords.scaleBy(this.getTileSize()).subtract(this._level.origin);
	},

	_wrapCoords: function (coords) {
		var newCoords = new L.Point(
			this._wrapX ? L.Util.wrapNum(coords.x, this._wrapX) : coords.x,
			this._wrapY ? L.Util.wrapNum(coords.y, this._wrapY) : coords.y);
		newCoords.z = coords.z;
		return newCoords;
	},

	_pxBoundsToTileRange: function (bounds) {
		var tileSize = this.getTileSize();
		return new L.Bounds(
			bounds.min.unscaleBy(tileSize).floor(),
			bounds.max.unscaleBy(tileSize).ceil().subtract([1, 1]));
	},

	_noTilesToLoad: function () {
		for (var key in this._tiles) {
			if (!this._tiles[key].loaded) { return false; }
		}
		return true;
	}
});

L.gridLayer = function (options) {
	return new L.GridLayer(options);
};



/*
 * L.TileLayer is used for standard xyz-numbered tile layers.
 */

L.TileLayer = L.GridLayer.extend({

	options: {
		maxZoom: 18,

		subdomains: 'abc',
		errorTileUrl: '',
		zoomOffset: 0,

		maxNativeZoom: null, // Number
		tms: false,
		zoomReverse: false,
		detectRetina: false,
		crossOrigin: false
	},

	initialize: function (url, options) {

		this._url = url;

		options = L.setOptions(this, options);

		// detecting retina displays, adjusting tileSize and zoom levels
		if (options.detectRetina && L.Browser.retina && options.maxZoom > 0) {

			options.tileSize = Math.floor(options.tileSize / 2);
			options.zoomOffset++;

			options.minZoom = Math.max(0, options.minZoom);
			options.maxZoom--;
		}

		if (typeof options.subdomains === 'string') {
			options.subdomains = options.subdomains.split('');
		}

		// for https://github.com/Leaflet/Leaflet/issues/137
		if (!L.Browser.android) {
			this.on('tileunload', this._onTileRemove);
		}
	},

	setUrl: function (url, noRedraw) {
		this._url = url;

		if (!noRedraw) {
			this.redraw();
		}
		return this;
	},

	createTile: function (coords, done) {
		var tile = document.createElement('img');

		L.DomEvent.on(tile, 'load', L.bind(this._tileOnLoad, this, done, tile));
		L.DomEvent.on(tile, 'error', L.bind(this._tileOnError, this, done, tile));

		if (this.options.crossOrigin) {
			tile.crossOrigin = '';
		}

		/*
		 Alt tag is set to empty string to keep screen readers from reading URL and for compliance reasons
		 http://www.w3.org/TR/WCAG20-TECHS/H67
		*/
		tile.alt = '';

		tile.src = this.getTileUrl(coords);

		return tile;
	},

	getTileUrl: function (coords) {
		return L.Util.template(this._url, L.extend({
			r: this.options.detectRetina && L.Browser.retina && this.options.maxZoom > 0 ? '@2x' : '',
			s: this._getSubdomain(coords),
			x: coords.x,
			y: this.options.tms ? this._globalTileRange.max.y - coords.y : coords.y,
			z: this._getZoomForUrl()
		}, this.options));
	},

	_tileOnLoad: function (done, tile) {
		// For https://github.com/Leaflet/Leaflet/issues/3332
		if (L.Browser.ielt9) {
			setTimeout(L.bind(done, this, null, tile), 0);
		} else {
			done(null, tile);
		}
	},

	_tileOnError: function (done, tile, e) {
		var errorUrl = this.options.errorTileUrl;
		if (errorUrl) {
			tile.src = errorUrl;
		}
		done(e, tile);
	},

	getTileSize: function () {
		var map = this._map,
		    tileSize = L.GridLayer.prototype.getTileSize.call(this),
		    zoom = this._tileZoom + this.options.zoomOffset,
		    zoomN = this.options.maxNativeZoom;

		// increase tile size when overscaling
		return zoomN !== null && zoom > zoomN ?
				tileSize.divideBy(map.getZoomScale(zoomN, zoom)).round() :
				tileSize;
	},

	_onTileRemove: function (e) {
		e.tile.onload = null;
	},

	_getZoomForUrl: function () {

		var options = this.options,
		    zoom = this._tileZoom;

		if (options.zoomReverse) {
			zoom = options.maxZoom - zoom;
		}

		zoom += options.zoomOffset;

		return options.maxNativeZoom !== null ? Math.min(zoom, options.maxNativeZoom) : zoom;
	},

	_getSubdomain: function (tilePoint) {
		var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
		return this.options.subdomains[index];
	},

	// stops loading all tiles in the background layer
	_abortLoading: function () {
		var i, tile;
		for (i in this._tiles) {
			if (this._tiles[i].coords.z !== this._tileZoom) {
				tile = this._tiles[i].el;

				tile.onload = L.Util.falseFn;
				tile.onerror = L.Util.falseFn;

				if (!tile.complete) {
					tile.src = L.Util.emptyImageUrl;
					L.DomUtil.remove(tile);
				}
			}
		}
	}
});

L.tileLayer = function (url, options) {
	return new L.TileLayer(url, options);
};



/*
 * L.TileLayer.WMS is used for WMS tile layers.
 */

L.TileLayer.WMS = L.TileLayer.extend({

	defaultWmsParams: {
		service: 'WMS',
		request: 'GetMap',
		version: '1.1.1',
		layers: '',
		styles: '',
		format: 'image/jpeg',
		transparent: false
	},

	options: {
		crs: null,
		uppercase: false
	},

	initialize: function (url, options) {

		this._url = url;

		var wmsParams = L.extend({}, this.defaultWmsParams);

		// all keys that are not TileLayer options go to WMS params
		for (var i in options) {
			if (!(i in this.options)) {
				wmsParams[i] = options[i];
			}
		}

		options = L.setOptions(this, options);

		wmsParams.width = wmsParams.height = options.tileSize * (options.detectRetina && L.Browser.retina ? 2 : 1);

		this.wmsParams = wmsParams;
	},

	onAdd: function (map) {

		this._crs = this.options.crs || map.options.crs;
		this._wmsVersion = parseFloat(this.wmsParams.version);

		var projectionKey = this._wmsVersion >= 1.3 ? 'crs' : 'srs';
		this.wmsParams[projectionKey] = this._crs.code;

		L.TileLayer.prototype.onAdd.call(this, map);
	},

	getTileUrl: function (coords) {

		var tileBounds = this._tileCoordsToBounds(coords),
		    nw = this._crs.project(tileBounds.getNorthWest()),
		    se = this._crs.project(tileBounds.getSouthEast()),

		    bbox = (this._wmsVersion >= 1.3 && this._crs === L.CRS.EPSG4326 ?
			    [se.y, nw.x, nw.y, se.x] :
			    [nw.x, se.y, se.x, nw.y]).join(','),

		    url = L.TileLayer.prototype.getTileUrl.call(this, coords);

		return url +
			L.Util.getParamString(this.wmsParams, url, this.options.uppercase) +
			(this.options.uppercase ? '&BBOX=' : '&bbox=') + bbox;
	},

	setParams: function (params, noRedraw) {

		L.extend(this.wmsParams, params);

		if (!noRedraw) {
			this.redraw();
		}

		return this;
	}
});

L.tileLayer.wms = function (url, options) {
	return new L.TileLayer.WMS(url, options);
};



/*
 * L.ImageOverlay is used to overlay images over the map (to specific geographical bounds).
 */

L.ImageOverlay = L.Layer.extend({

	options: {
		opacity: 1,
		alt: '',
		interactive: false

		/*
		crossOrigin: <Boolean>,
		*/
	},

	initialize: function (url, bounds, options) { // (String, LatLngBounds, Object)
		this._url = url;
		this._bounds = L.latLngBounds(bounds);

		L.setOptions(this, options);
	},

	onAdd: function () {
		if (!this._image) {
			this._initImage();

			if (this.options.opacity < 1) {
				this._updateOpacity();
			}
		}

		if (this.options.interactive) {
			L.DomUtil.addClass(this._image, 'leaflet-interactive');
			this.addInteractiveTarget(this._image);
		}

		this.getPane().appendChild(this._image);
		this._reset();
	},

	onRemove: function () {
		L.DomUtil.remove(this._image);
		if (this.options.interactive) {
			this.removeInteractiveTarget(this._image);
		}
	},

	setOpacity: function (opacity) {
		this.options.opacity = opacity;

		if (this._image) {
			this._updateOpacity();
		}
		return this;
	},

	setStyle: function (styleOpts) {
		if (styleOpts.opacity) {
			this.setOpacity(styleOpts.opacity);
		}
		return this;
	},

	bringToFront: function () {
		if (this._map) {
			L.DomUtil.toFront(this._image);
		}
		return this;
	},

	bringToBack: function () {
		if (this._map) {
			L.DomUtil.toBack(this._image);
		}
		return this;
	},

	setUrl: function (url) {
		this._url = url;

		if (this._image) {
			this._image.src = url;
		}
		return this;
	},

	setBounds: function (bounds) {
		this._bounds = bounds;

		if (this._map) {
			this._reset();
		}
		return this;
	},

	getAttribution: function () {
		return this.options.attribution;
	},

	getEvents: function () {
		var events = {
			zoom: this._reset,
			viewreset: this._reset
		};

		if (this._zoomAnimated) {
			events.zoomanim = this._animateZoom;
		}

		return events;
	},

	getBounds: function () {
		return this._bounds;
	},

	getElement: function () {
		return this._image;
	},

	_initImage: function () {
		var img = this._image = L.DomUtil.create('img',
				'leaflet-image-layer ' + (this._zoomAnimated ? 'leaflet-zoom-animated' : ''));

		img.onselectstart = L.Util.falseFn;
		img.onmousemove = L.Util.falseFn;

		img.onload = L.bind(this.fire, this, 'load');

		if (this.options.crossOrigin) {
			img.crossOrigin = '';
		}

		img.src = this._url;
		img.alt = this.options.alt;
	},

	_animateZoom: function (e) {
		var scale = this._map.getZoomScale(e.zoom),
		    offset = this._map._latLngToNewLayerPoint(this._bounds.getNorthWest(), e.zoom, e.center);

		L.DomUtil.setTransform(this._image, offset, scale);
	},

	_reset: function () {
		var image = this._image,
		    bounds = new L.Bounds(
		        this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
		        this._map.latLngToLayerPoint(this._bounds.getSouthEast())),
		    size = bounds.getSize();

		L.DomUtil.setPosition(image, bounds.min);

		image.style.width  = size.x + 'px';
		image.style.height = size.y + 'px';
	},

	_updateOpacity: function () {
		L.DomUtil.setOpacity(this._image, this.options.opacity);
	}
});

L.imageOverlay = function (url, bounds, options) {
	return new L.ImageOverlay(url, bounds, options);
};



/*
 * L.Icon is an image-based icon class that you can use with L.Marker for custom markers.
 */

L.Icon = L.Class.extend({
	/*
	options: {
		iconUrl: (String) (required)
		iconRetinaUrl: (String) (optional, used for retina devices if detected)
		iconSize: (Point) (can be set through CSS)
		iconAnchor: (Point) (centered by default, can be set in CSS with negative margins)
		popupAnchor: (Point) (if not specified, popup opens in the anchor point)
		shadowUrl: (String) (no shadow by default)
		shadowRetinaUrl: (String) (optional, used for retina devices if detected)
		shadowSize: (Point)
		shadowAnchor: (Point)
		className: (String)
	},
	*/

	initialize: function (options) {
		L.setOptions(this, options);
	},

	createIcon: function (oldIcon) {
		return this._createIcon('icon', oldIcon);
	},

	createShadow: function (oldIcon) {
		return this._createIcon('shadow', oldIcon);
	},

	_createIcon: function (name, oldIcon) {
		var src = this._getIconUrl(name);

		if (!src) {
			if (name === 'icon') {
				throw new Error('iconUrl not set in Icon options (see the docs).');
			}
			return null;
		}

		var img = this._createImg(src, oldIcon && oldIcon.tagName === 'IMG' ? oldIcon : null);
		this._setIconStyles(img, name);

		return img;
	},

	_setIconStyles: function (img, name) {
		var options = this.options,
		    size = L.point(options[name + 'Size']),
		    anchor = L.point(name === 'shadow' && options.shadowAnchor || options.iconAnchor ||
		            size && size.divideBy(2, true));

		img.className = 'leaflet-marker-' + name + ' ' + (options.className || '');

		if (anchor) {
			img.style.marginLeft = (-anchor.x) + 'px';
			img.style.marginTop  = (-anchor.y) + 'px';
		}

		if (size) {
			img.style.width  = size.x + 'px';
			img.style.height = size.y + 'px';
		}
	},

	_createImg: function (src, el) {
		el = el || document.createElement('img');
		el.src = src;
		return el;
	},

	_getIconUrl: function (name) {
		return L.Browser.retina && this.options[name + 'RetinaUrl'] || this.options[name + 'Url'];
	}
});

L.icon = function (options) {
	return new L.Icon(options);
};



/*
 * L.Icon.Default is the blue marker icon used by default in Leaflet.
 */

L.Icon.Default = L.Icon.extend({

	options: {
		iconSize:    [25, 41],
		iconAnchor:  [12, 41],
		popupAnchor: [1, -34],
		shadowSize:  [41, 41]
	},

	_getIconUrl: function (name) {
		var key = name + 'Url';

		if (this.options[key]) {
			return this.options[key];
		}

		var path = L.Icon.Default.imagePath;

		if (!path) {
			throw new Error('Couldn\'t autodetect L.Icon.Default.imagePath, set it manually.');
		}

		return path + '/marker-' + name + (L.Browser.retina && name === 'icon' ? '-2x' : '') + '.png';
	}
});

L.Icon.Default.imagePath = (function () {
	var scripts = document.getElementsByTagName('script'),
	    leafletRe = /[\/^]leaflet[\-\._]?([\w\-\._]*)\.js\??/;

	var i, len, src, path;

	for (i = 0, len = scripts.length; i < len; i++) {
		src = scripts[i].src || '';

		if (src.match(leafletRe)) {
			path = src.split(leafletRe)[0];
			return (path ? path + '/' : '') + 'images';
		}
	}
}());



/*
 * L.Marker is used to display clickable/draggable icons on the map.
 */

L.Marker = L.Layer.extend({

	options: {
		pane: 'markerPane',
		nonBubblingEvents: ['click', 'dblclick', 'mouseover', 'mouseout', 'contextmenu'],

		icon: new L.Icon.Default(),
		// title: '',
		// alt: '',
		interactive: true,
		// draggable: false,
		keyboard: true,
		zIndexOffset: 0,
		opacity: 1,
		// riseOnHover: false,
		riseOffset: 250
	},

	initialize: function (latlng, options) {
		L.setOptions(this, options);
		this._latlng = L.latLng(latlng);
	},

	onAdd: function (map) {
		this._zoomAnimated = this._zoomAnimated && map.options.markerZoomAnimation;

		this._initIcon();
		this.update();
	},

	onRemove: function () {
		if (this.dragging && this.dragging.enabled()) {
			this.options.draggable = true;
			this.dragging.removeHooks();
		}

		this._removeIcon();
		this._removeShadow();
	},

	getEvents: function () {
		var events = {
			zoom: this.update,
			viewreset: this.update
		};

		if (this._zoomAnimated) {
			events.zoomanim = this._animateZoom;
		}

		return events;
	},

	getLatLng: function () {
		return this._latlng;
	},

	setLatLng: function (latlng) {
		var oldLatLng = this._latlng;
		this._latlng = L.latLng(latlng);
		this.update();
		return this.fire('move', {oldLatLng: oldLatLng, latlng: this._latlng});
	},

	setZIndexOffset: function (offset) {
		this.options.zIndexOffset = offset;
		return this.update();
	},

	setIcon: function (icon) {

		this.options.icon = icon;

		if (this._map) {
			this._initIcon();
			this.update();
		}

		if (this._popup) {
			this.bindPopup(this._popup, this._popup.options);
		}

		return this;
	},

	getElement: function () {
		return this._icon;
	},

	update: function () {

		if (this._icon) {
			var pos = this._map.latLngToLayerPoint(this._latlng).round();
			this._setPos(pos);
		}

		return this;
	},

	_initIcon: function () {
		var options = this.options,
		    classToAdd = 'leaflet-zoom-' + (this._zoomAnimated ? 'animated' : 'hide');

		var icon = options.icon.createIcon(this._icon),
		    addIcon = false;

		// if we're not reusing the icon, remove the old one and init new one
		if (icon !== this._icon) {
			if (this._icon) {
				this._removeIcon();
			}
			addIcon = true;

			if (options.title) {
				icon.title = options.title;
			}
			if (options.alt) {
				icon.alt = options.alt;
			}
		}

		L.DomUtil.addClass(icon, classToAdd);

		if (options.keyboard) {
			icon.tabIndex = '0';
		}

		this._icon = icon;

		if (options.riseOnHover) {
			this.on({
				mouseover: this._bringToFront,
				mouseout: this._resetZIndex
			});
		}

		var newShadow = options.icon.createShadow(this._shadow),
		    addShadow = false;

		if (newShadow !== this._shadow) {
			this._removeShadow();
			addShadow = true;
		}

		if (newShadow) {
			L.DomUtil.addClass(newShadow, classToAdd);
		}
		this._shadow = newShadow;


		if (options.opacity < 1) {
			this._updateOpacity();
		}


		if (addIcon) {
			this.getPane().appendChild(this._icon);
			this._initInteraction();
		}
		if (newShadow && addShadow) {
			this.getPane('shadowPane').appendChild(this._shadow);
		}
	},

	_removeIcon: function () {
		if (this.options.riseOnHover) {
			this.off({
				mouseover: this._bringToFront,
				mouseout: this._resetZIndex
			});
		}

		L.DomUtil.remove(this._icon);
		this.removeInteractiveTarget(this._icon);

		this._icon = null;
	},

	_removeShadow: function () {
		if (this._shadow) {
			L.DomUtil.remove(this._shadow);
		}
		this._shadow = null;
	},

	_setPos: function (pos) {
		L.DomUtil.setPosition(this._icon, pos);

		if (this._shadow) {
			L.DomUtil.setPosition(this._shadow, pos);
		}

		this._zIndex = pos.y + this.options.zIndexOffset;

		this._resetZIndex();
	},

	_updateZIndex: function (offset) {
		this._icon.style.zIndex = this._zIndex + offset;
	},

	_animateZoom: function (opt) {
		var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();

		this._setPos(pos);
	},

	_initInteraction: function () {

		if (!this.options.interactive) { return; }

		L.DomUtil.addClass(this._icon, 'leaflet-interactive');

		this.addInteractiveTarget(this._icon);

		if (L.Handler.MarkerDrag) {
			var draggable = this.options.draggable;
			if (this.dragging) {
				draggable = this.dragging.enabled();
				this.dragging.disable();
			}

			this.dragging = new L.Handler.MarkerDrag(this);

			if (draggable) {
				this.dragging.enable();
			}
		}
	},

	setOpacity: function (opacity) {
		this.options.opacity = opacity;
		if (this._map) {
			this._updateOpacity();
		}

		return this;
	},

	_updateOpacity: function () {
		var opacity = this.options.opacity;

		L.DomUtil.setOpacity(this._icon, opacity);

		if (this._shadow) {
			L.DomUtil.setOpacity(this._shadow, opacity);
		}
	},

	_bringToFront: function () {
		this._updateZIndex(this.options.riseOffset);
	},

	_resetZIndex: function () {
		this._updateZIndex(0);
	}
});

L.marker = function (latlng, options) {
	return new L.Marker(latlng, options);
};



/*
 * L.DivIcon is a lightweight HTML-based icon class (as opposed to the image-based L.Icon)
 * to use with L.Marker.
 */

L.DivIcon = L.Icon.extend({
	options: {
		iconSize: [12, 12], // also can be set through CSS
		/*
		iconAnchor: (Point)
		popupAnchor: (Point)
		html: (String)
		bgPos: (Point)
		*/
		className: 'leaflet-div-icon',
		html: false
	},

	createIcon: function (oldIcon) {
		var div = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : document.createElement('div'),
		    options = this.options;

		div.innerHTML = options.html !== false ? options.html : '';

		if (options.bgPos) {
			div.style.backgroundPosition = (-options.bgPos.x) + 'px ' + (-options.bgPos.y) + 'px';
		}
		this._setIconStyles(div, 'icon');

		return div;
	},

	createShadow: function () {
		return null;
	}
});

L.divIcon = function (options) {
	return new L.DivIcon(options);
};



/*
 * L.Popup is used for displaying popups on the map.
 */

L.Map.mergeOptions({
	closePopupOnClick: true
});

L.Popup = L.Layer.extend({

	options: {
		pane: 'popupPane',

		minWidth: 50,
		maxWidth: 300,
		// maxHeight: <Number>,
		offset: [0, 7],

		autoPan: true,
		autoPanPadding: [5, 5],
		// autoPanPaddingTopLeft: <Point>,
		// autoPanPaddingBottomRight: <Point>,

		closeButton: true,
		autoClose: true,
		// keepInView: false,
		// className: '',
		zoomAnimation: true
	},

	initialize: function (options, source) {
		L.setOptions(this, options);

		this._source = source;
	},

	onAdd: function (map) {
		this._zoomAnimated = this._zoomAnimated && this.options.zoomAnimation;

		if (!this._container) {
			this._initLayout();
		}

		if (map._fadeAnimated) {
			L.DomUtil.setOpacity(this._container, 0);
		}

		clearTimeout(this._removeTimeout);
		this.getPane().appendChild(this._container);
		this.update();

		if (map._fadeAnimated) {
			L.DomUtil.setOpacity(this._container, 1);
		}

		map.fire('popupopen', {popup: this});

		if (this._source) {
			this._source.fire('popupopen', {popup: this}, true);
		}
	},

	openOn: function (map) {
		map.openPopup(this);
		return this;
	},

	onRemove: function (map) {
		if (map._fadeAnimated) {
			L.DomUtil.setOpacity(this._container, 0);
			this._removeTimeout = setTimeout(L.bind(L.DomUtil.remove, L.DomUtil, this._container), 200);
		} else {
			L.DomUtil.remove(this._container);
		}

		map.fire('popupclose', {popup: this});

		if (this._source) {
			this._source.fire('popupclose', {popup: this}, true);
		}
	},

	getLatLng: function () {
		return this._latlng;
	},

	setLatLng: function (latlng) {
		this._latlng = L.latLng(latlng);
		if (this._map) {
			this._updatePosition();
			this._adjustPan();
		}
		return this;
	},

	getContent: function () {
		return this._content;
	},

	setContent: function (content) {
		this._content = content;
		this.update();
		return this;
	},

	getElement: function () {
		return this._container;
	},

	update: function () {
		if (!this._map) { return; }

		this._container.style.visibility = 'hidden';

		this._updateContent();
		this._updateLayout();
		this._updatePosition();

		this._container.style.visibility = '';

		this._adjustPan();
	},

	getEvents: function () {
		var events = {
			zoom: this._updatePosition,
			viewreset: this._updatePosition
		};

		if (this._zoomAnimated) {
			events.zoomanim = this._animateZoom;
		}
		if ('closeOnClick' in this.options ? this.options.closeOnClick : this._map.options.closePopupOnClick) {
			events.preclick = this._close;
		}
		if (this.options.keepInView) {
			events.moveend = this._adjustPan;
		}
		return events;
	},

	isOpen: function () {
		return !!this._map && this._map.hasLayer(this);
	},

	bringToFront: function () {
		if (this._map) {
			L.DomUtil.toFront(this._container);
		}
		return this;
	},

	bringToBack: function () {
		if (this._map) {
			L.DomUtil.toBack(this._container);
		}
		return this;
	},

	_close: function () {
		if (this._map) {
			this._map.closePopup(this);
		}
	},

	_initLayout: function () {
		var prefix = 'leaflet-popup',
		    container = this._container = L.DomUtil.create('div',
			prefix + ' ' + (this.options.className || '') +
			' leaflet-zoom-' + (this._zoomAnimated ? 'animated' : 'hide'));

		if (this.options.closeButton) {
			var closeButton = this._closeButton = L.DomUtil.create('a', prefix + '-close-button', container);
			closeButton.href = '#close';
			closeButton.innerHTML = '&#215;';

			L.DomEvent.on(closeButton, 'click', this._onCloseButtonClick, this);
		}

		var wrapper = this._wrapper = L.DomUtil.create('div', prefix + '-content-wrapper', container);
		this._contentNode = L.DomUtil.create('div', prefix + '-content', wrapper);

		L.DomEvent
			.disableClickPropagation(wrapper)
			.disableScrollPropagation(this._contentNode)
			.on(wrapper, 'contextmenu', L.DomEvent.stopPropagation);

		this._tipContainer = L.DomUtil.create('div', prefix + '-tip-container', container);
		this._tip = L.DomUtil.create('div', prefix + '-tip', this._tipContainer);
	},

	_updateContent: function () {
		if (!this._content) { return; }

		var node = this._contentNode;
		var content = (typeof this._content === 'function') ? this._content(this._source || this) : this._content;

		if (typeof content === 'string') {
			node.innerHTML = content;
		} else {
			while (node.hasChildNodes()) {
				node.removeChild(node.firstChild);
			}
			node.appendChild(content);
		}
		this.fire('contentupdate');
	},

	_updateLayout: function () {
		var container = this._contentNode,
		    style = container.style;

		style.width = '';
		style.whiteSpace = 'nowrap';

		var width = container.offsetWidth;
		width = Math.min(width, this.options.maxWidth);
		width = Math.max(width, this.options.minWidth);

		style.width = (width + 1) + 'px';
		style.whiteSpace = '';

		style.height = '';

		var height = container.offsetHeight,
		    maxHeight = this.options.maxHeight,
		    scrolledClass = 'leaflet-popup-scrolled';

		if (maxHeight && height > maxHeight) {
			style.height = maxHeight + 'px';
			L.DomUtil.addClass(container, scrolledClass);
		} else {
			L.DomUtil.removeClass(container, scrolledClass);
		}

		this._containerWidth = this._container.offsetWidth;
	},

	_updatePosition: function () {
		if (!this._map) { return; }

		var pos = this._map.latLngToLayerPoint(this._latlng),
		    offset = L.point(this.options.offset);

		if (this._zoomAnimated) {
			L.DomUtil.setPosition(this._container, pos);
		} else {
			offset = offset.add(pos);
		}

		var bottom = this._containerBottom = -offset.y,
		    left = this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x;

		// bottom position the popup in case the height of the popup changes (images loading etc)
		this._container.style.bottom = bottom + 'px';
		this._container.style.left = left + 'px';
	},

	_animateZoom: function (e) {
		var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
		L.DomUtil.setPosition(this._container, pos);
	},

	_adjustPan: function () {
		if (!this.options.autoPan || (this._map._panAnim && this._map._panAnim._inProgress)) { return; }

		var map = this._map,
		    containerHeight = this._container.offsetHeight,
		    containerWidth = this._containerWidth,
		    layerPos = new L.Point(this._containerLeft, -containerHeight - this._containerBottom);

		if (this._zoomAnimated) {
			layerPos._add(L.DomUtil.getPosition(this._container));
		}

		var containerPos = map.layerPointToContainerPoint(layerPos),
		    padding = L.point(this.options.autoPanPadding),
		    paddingTL = L.point(this.options.autoPanPaddingTopLeft || padding),
		    paddingBR = L.point(this.options.autoPanPaddingBottomRight || padding),
		    size = map.getSize(),
		    dx = 0,
		    dy = 0;

		if (containerPos.x + containerWidth + paddingBR.x > size.x) { // right
			dx = containerPos.x + containerWidth - size.x + paddingBR.x;
		}
		if (containerPos.x - dx - paddingTL.x < 0) { // left
			dx = containerPos.x - paddingTL.x;
		}
		if (containerPos.y + containerHeight + paddingBR.y > size.y) { // bottom
			dy = containerPos.y + containerHeight - size.y + paddingBR.y;
		}
		if (containerPos.y - dy - paddingTL.y < 0) { // top
			dy = containerPos.y - paddingTL.y;
		}

		if (dx || dy) {
			map
			    .fire('autopanstart')
			    .panBy([dx, dy]);
		}
	},

	_onCloseButtonClick: function (e) {
		this._close();
		L.DomEvent.stop(e);
	}
});

L.popup = function (options, source) {
	return new L.Popup(options, source);
};


L.Map.include({
	openPopup: function (popup, latlng, options) { // (Popup) or (String || HTMLElement, LatLng[, Object])
		if (!(popup instanceof L.Popup)) {
			popup = new L.Popup(options).setContent(popup);
		}

		if (latlng) {
			popup.setLatLng(latlng);
		}

		if (this.hasLayer(popup)) {
			return this;
		}

		if (this._popup && this._popup.options.autoClose) {
			this.closePopup();
		}

		this._popup = popup;
		return this.addLayer(popup);
	},

	closePopup: function (popup) {
		if (!popup || popup === this._popup) {
			popup = this._popup;
			this._popup = null;
		}
		if (popup) {
			this.removeLayer(popup);
		}
		return this;
	}
});



/*
 * Adds popup-related methods to all layers.
 */

L.Layer.include({

	bindPopup: function (content, options) {

		if (content instanceof L.Popup) {
			L.setOptions(content, options);
			this._popup = content;
			content._source = this;
		} else {
			if (!this._popup || options) {
				this._popup = new L.Popup(options, this);
			}
			this._popup.setContent(content);
		}

		if (!this._popupHandlersAdded) {
			this.on({
				click: this._openPopup,
				remove: this.closePopup,
				move: this._movePopup
			});
			this._popupHandlersAdded = true;
		}

		// save the originally passed offset
		this._originalPopupOffset = this._popup.options.offset;

		return this;
	},

	unbindPopup: function () {
		if (this._popup) {
			this.off({
				click: this._openPopup,
				remove: this.closePopup,
				move: this._movePopup
			});
			this._popupHandlersAdded = false;
			this._popup = null;
		}
		return this;
	},

	openPopup: function (layer, latlng) {
		if (!(layer instanceof L.Layer)) {
			latlng = layer;
			layer = this;
		}

		if (layer instanceof L.FeatureGroup) {
			for (var id in this._layers) {
				layer = this._layers[id];
				break;
			}
		}

		if (!latlng) {
			latlng = layer.getCenter ? layer.getCenter() : layer.getLatLng();
		}

		if (this._popup && this._map) {
			// set the popup offset for this layer
			this._popup.options.offset = this._popupAnchor(layer);

			// set popup source to this layer
			this._popup._source = layer;

			// update the popup (content, layout, ect...)
			this._popup.update();

			// open the popup on the map
			this._map.openPopup(this._popup, latlng);
		}

		return this;
	},

	closePopup: function () {
		if (this._popup) {
			this._popup._close();
		}
		return this;
	},

	togglePopup: function (target) {
		if (this._popup) {
			if (this._popup._map) {
				this.closePopup();
			} else {
				this.openPopup(target);
			}
		}
		return this;
	},

	isPopupOpen: function () {
		return this._popup.isOpen();
	},

	setPopupContent: function (content) {
		if (this._popup) {
			this._popup.setContent(content);
		}
		return this;
	},

	getPopup: function () {
		return this._popup;
	},

	_openPopup: function (e) {
		var layer = e.layer || e.target;

		if (!this._popup) {
			return;
		}

		if (!this._map) {
			return;
		}

		// if this inherits from Path its a vector and we can just
		// open the popup at the new location
		if (layer instanceof L.Path) {
			this.openPopup(e.layer || e.target, e.latlng);
			return;
		}

		// otherwise treat it like a marker and figure out
		// if we should toggle it open/closed
		if (this._map.hasLayer(this._popup) && this._popup._source === layer) {
			this.closePopup();
		} else {
			this.openPopup(layer, e.latlng);
		}
	},

	_popupAnchor: function (layer) {
		// where shold we anchor the popup on this layer?
		var anchor = layer._getPopupAnchor ? layer._getPopupAnchor() : [0, 0];

		// add the users passed offset to that
		var offsetToAdd = this._originalPopupOffset || L.Popup.prototype.options.offset;

		// return the final point to anchor the popup
		return L.point(anchor).add(offsetToAdd);
	},

	_movePopup: function (e) {
		this._popup.setLatLng(e.latlng);
	}
});



/*
 * Popup extension to L.Marker, adding popup-related methods.
 */

L.Marker.include({
	_getPopupAnchor: function () {
		return this.options.icon.options.popupAnchor || [0, 0];
	}
});



/*
 * L.LayerGroup is a class to combine several layers into one so that
 * you can manipulate the group (e.g. add/remove it) as one layer.
 */

L.LayerGroup = L.Layer.extend({

	initialize: function (layers) {
		this._layers = {};

		var i, len;

		if (layers) {
			for (i = 0, len = layers.length; i < len; i++) {
				this.addLayer(layers[i]);
			}
		}
	},

	addLayer: function (layer) {
		var id = this.getLayerId(layer);

		this._layers[id] = layer;

		if (this._map) {
			this._map.addLayer(layer);
		}

		return this;
	},

	removeLayer: function (layer) {
		var id = layer in this._layers ? layer : this.getLayerId(layer);

		if (this._map && this._layers[id]) {
			this._map.removeLayer(this._layers[id]);
		}

		delete this._layers[id];

		return this;
	},

	hasLayer: function (layer) {
		return !!layer && (layer in this._layers || this.getLayerId(layer) in this._layers);
	},

	clearLayers: function () {
		for (var i in this._layers) {
			this.removeLayer(this._layers[i]);
		}
		return this;
	},

	invoke: function (methodName) {
		var args = Array.prototype.slice.call(arguments, 1),
		    i, layer;

		for (i in this._layers) {
			layer = this._layers[i];

			if (layer[methodName]) {
				layer[methodName].apply(layer, args);
			}
		}

		return this;
	},

	onAdd: function (map) {
		for (var i in this._layers) {
			map.addLayer(this._layers[i]);
		}
	},

	onRemove: function (map) {
		for (var i in this._layers) {
			map.removeLayer(this._layers[i]);
		}
	},

	eachLayer: function (method, context) {
		for (var i in this._layers) {
			method.call(context, this._layers[i]);
		}
		return this;
	},

	getLayer: function (id) {
		return this._layers[id];
	},

	getLayers: function () {
		var layers = [];

		for (var i in this._layers) {
			layers.push(this._layers[i]);
		}
		return layers;
	},

	setZIndex: function (zIndex) {
		return this.invoke('setZIndex', zIndex);
	},

	getLayerId: function (layer) {
		return L.stamp(layer);
	}
});

L.layerGroup = function (layers) {
	return new L.LayerGroup(layers);
};



/*
 * L.FeatureGroup extends L.LayerGroup by introducing mouse events and additional methods
 * shared between a group of interactive layers (like vectors or markers).
 */

L.FeatureGroup = L.LayerGroup.extend({

	addLayer: function (layer) {
		if (this.hasLayer(layer)) {
			return this;
		}

		layer.addEventParent(this);

		L.LayerGroup.prototype.addLayer.call(this, layer);

		return this.fire('layeradd', {layer: layer});
	},

	removeLayer: function (layer) {
		if (!this.hasLayer(layer)) {
			return this;
		}
		if (layer in this._layers) {
			layer = this._layers[layer];
		}

		layer.removeEventParent(this);

		L.LayerGroup.prototype.removeLayer.call(this, layer);

		return this.fire('layerremove', {layer: layer});
	},

	setStyle: function (style) {
		return this.invoke('setStyle', style);
	},

	bringToFront: function () {
		return this.invoke('bringToFront');
	},

	bringToBack: function () {
		return this.invoke('bringToBack');
	},

	getBounds: function () {
		var bounds = new L.LatLngBounds();

		for (var id in this._layers) {
			var layer = this._layers[id];
			bounds.extend(layer.getBounds ? layer.getBounds() : layer.getLatLng());
		}
		return bounds;
	}
});

L.featureGroup = function (layers) {
	return new L.FeatureGroup(layers);
};



/*
 * L.Renderer is a base class for renderer implementations (SVG, Canvas);
 * handles renderer container, bounds and zoom animation.
 */

L.Renderer = L.Layer.extend({

	options: {
		// how much to extend the clip area around the map view (relative to its size)
		// e.g. 0.1 would be 10% of map view in each direction; defaults to clip with the map view
		padding: 0.1
	},

	initialize: function (options) {
		L.setOptions(this, options);
		L.stamp(this);
	},

	onAdd: function () {
		if (!this._container) {
			this._initContainer(); // defined by renderer implementations

			if (this._zoomAnimated) {
				L.DomUtil.addClass(this._container, 'leaflet-zoom-animated');
			}
		}

		this.getPane().appendChild(this._container);
		this._update();
	},

	onRemove: function () {
		L.DomUtil.remove(this._container);
	},

	getEvents: function () {
		var events = {
			viewreset: this._reset,
			zoomstart: this._onZoomStart,
			zoom: this._onZoom,
			moveend: this._update
		};
		if (this._zoomAnimated) {
			events.zoomanim = this._onAnimZoom;
		}
		return events;
	},

	_onAnimZoom: function (ev) {
		this._updateTransform(ev.center, ev.zoom);
	},

	_onZoom: function () {
		this._updateTransform(this._map.getCenter(), this._map.getZoom());
	},

	_onZoomStart: function () {
		// Drag-then-pinch interactions might mess up the center and zoom.
		// In this case, the easiest way to prevent this is re-do the renderer
		//   bounds and padding when the zooming starts.
		this._update();
	},

	_updateTransform: function (center, zoom) {
		var scale = this._map.getZoomScale(zoom, this._zoom),
		    position = L.DomUtil.getPosition(this._container),
		    viewHalf = this._map.getSize().multiplyBy(0.5 + this.options.padding),
		    currentCenterPoint = this._map.project(this._center, zoom),
		    destCenterPoint = this._map.project(center, zoom),
		    centerOffset = destCenterPoint.subtract(currentCenterPoint),

		    topLeftOffset = viewHalf.multiplyBy(-scale).add(position).add(viewHalf).subtract(centerOffset);

		L.DomUtil.setTransform(this._container, topLeftOffset, scale);
	},

	_reset: function () {
		this._update();
		this._updateTransform(this._center, this._zoom);
	},

	_update: function () {
		// update pixel bounds of renderer container (for positioning/sizing/clipping later)
		var p = this.options.padding,
		    size = this._map.getSize(),
		    min = this._map.containerPointToLayerPoint(size.multiplyBy(-p)).round();

		this._bounds = new L.Bounds(min, min.add(size.multiplyBy(1 + p * 2)).round());

		this._center = this._map.getCenter();
		this._zoom = this._map.getZoom();
	}
});


L.Map.include({
	// used by each vector layer to decide which renderer to use
	getRenderer: function (layer) {
		var renderer = layer.options.renderer || this._getPaneRenderer(layer.options.pane) || this.options.renderer || this._renderer;

		if (!renderer) {
			renderer = this._renderer = (this.options.preferCanvas && L.canvas()) || L.svg();
		}

		if (!this.hasLayer(renderer)) {
			this.addLayer(renderer);
		}
		return renderer;
	},

	_getPaneRenderer: function (name) {
		if (name === 'overlayPane' || name === undefined) {
			return false;
		}

		var renderer = this._paneRenderers[name];
		if (renderer === undefined) {
			renderer = (L.SVG && L.svg({pane: name})) || (L.Canvas && L.canvas({pane: name}));
			this._paneRenderers[name] = renderer;
		}
		return renderer;
	}
});



/*
 * L.Path is the base class for all Leaflet vector layers like polygons and circles.
 */

L.Path = L.Layer.extend({

	options: {
		stroke: true,
		color: '#3388ff',
		weight: 3,
		opacity: 1,
		lineCap: 'round',
		lineJoin: 'round',
		// dashArray: null
		// dashOffset: null

		// fill: false
		// fillColor: same as color by default
		fillOpacity: 0.2,
		fillRule: 'evenodd',

		// className: ''
		interactive: true
	},

	beforeAdd: function (map) {
		// Renderer is set here because we need to call renderer.getEvents
		// before this.getEvents.
		this._renderer = map.getRenderer(this);
	},

	onAdd: function () {
		this._renderer._initPath(this);
		this._reset();
		this._renderer._addPath(this);
	},

	onRemove: function () {
		this._renderer._removePath(this);
	},

	getEvents: function () {
		return {
			zoomend: this._project,
			moveend: this._update,
			viewreset: this._reset
		};
	},

	redraw: function () {
		if (this._map) {
			this._renderer._updatePath(this);
		}
		return this;
	},

	setStyle: function (style) {
		L.setOptions(this, style);
		if (this._renderer) {
			this._renderer._updateStyle(this);
		}
		return this;
	},

	bringToFront: function () {
		if (this._renderer) {
			this._renderer._bringToFront(this);
		}
		return this;
	},

	bringToBack: function () {
		if (this._renderer) {
			this._renderer._bringToBack(this);
		}
		return this;
	},

	getElement: function () {
		return this._path;
	},

	_reset: function () {
		// defined in children classes
		this._project();
		this._update();
	},

	_clickTolerance: function () {
		// used when doing hit detection for Canvas layers
		return (this.options.stroke ? this.options.weight / 2 : 0) + (L.Browser.touch ? 10 : 0);
	}
});



/*
 * L.LineUtil contains different utility functions for line segments
 * and polylines (clipping, simplification, distances, etc.)
 */

L.LineUtil = {

	// Simplify polyline with vertex reduction and Douglas-Peucker simplification.
	// Improves rendering performance dramatically by lessening the number of points to draw.

	simplify: function (points, tolerance) {
		if (!tolerance || !points.length) {
			return points.slice();
		}

		var sqTolerance = tolerance * tolerance;

		// stage 1: vertex reduction
		points = this._reducePoints(points, sqTolerance);

		// stage 2: Douglas-Peucker simplification
		points = this._simplifyDP(points, sqTolerance);

		return points;
	},

	// distance from a point to a segment between two points
	pointToSegmentDistance:  function (p, p1, p2) {
		return Math.sqrt(this._sqClosestPointOnSegment(p, p1, p2, true));
	},

	closestPointOnSegment: function (p, p1, p2) {
		return this._sqClosestPointOnSegment(p, p1, p2);
	},

	// Douglas-Peucker simplification, see http://en.wikipedia.org/wiki/Douglas-Peucker_algorithm
	_simplifyDP: function (points, sqTolerance) {

		var len = points.length,
		    ArrayConstructor = typeof Uint8Array !== undefined + '' ? Uint8Array : Array,
		    markers = new ArrayConstructor(len);

		markers[0] = markers[len - 1] = 1;

		this._simplifyDPStep(points, markers, sqTolerance, 0, len - 1);

		var i,
		    newPoints = [];

		for (i = 0; i < len; i++) {
			if (markers[i]) {
				newPoints.push(points[i]);
			}
		}

		return newPoints;
	},

	_simplifyDPStep: function (points, markers, sqTolerance, first, last) {

		var maxSqDist = 0,
		    index, i, sqDist;

		for (i = first + 1; i <= last - 1; i++) {
			sqDist = this._sqClosestPointOnSegment(points[i], points[first], points[last], true);

			if (sqDist > maxSqDist) {
				index = i;
				maxSqDist = sqDist;
			}
		}

		if (maxSqDist > sqTolerance) {
			markers[index] = 1;

			this._simplifyDPStep(points, markers, sqTolerance, first, index);
			this._simplifyDPStep(points, markers, sqTolerance, index, last);
		}
	},

	// reduce points that are too close to each other to a single point
	_reducePoints: function (points, sqTolerance) {
		var reducedPoints = [points[0]];

		for (var i = 1, prev = 0, len = points.length; i < len; i++) {
			if (this._sqDist(points[i], points[prev]) > sqTolerance) {
				reducedPoints.push(points[i]);
				prev = i;
			}
		}
		if (prev < len - 1) {
			reducedPoints.push(points[len - 1]);
		}
		return reducedPoints;
	},

	// Cohen-Sutherland line clipping algorithm.
	// Used to avoid rendering parts of a polyline that are not currently visible.

	clipSegment: function (a, b, bounds, useLastCode, round) {
		var codeA = useLastCode ? this._lastCode : this._getBitCode(a, bounds),
		    codeB = this._getBitCode(b, bounds),

		    codeOut, p, newCode;

		// save 2nd code to avoid calculating it on the next segment
		this._lastCode = codeB;

		while (true) {
			// if a,b is inside the clip window (trivial accept)
			if (!(codeA | codeB)) { return [a, b]; }

			// if a,b is outside the clip window (trivial reject)
			if (codeA & codeB) { return false; }

			// other cases
			codeOut = codeA || codeB;
			p = this._getEdgeIntersection(a, b, codeOut, bounds, round);
			newCode = this._getBitCode(p, bounds);

			if (codeOut === codeA) {
				a = p;
				codeA = newCode;
			} else {
				b = p;
				codeB = newCode;
			}
		}
	},

	_getEdgeIntersection: function (a, b, code, bounds, round) {
		var dx = b.x - a.x,
		    dy = b.y - a.y,
		    min = bounds.min,
		    max = bounds.max,
		    x, y;

		if (code & 8) { // top
			x = a.x + dx * (max.y - a.y) / dy;
			y = max.y;

		} else if (code & 4) { // bottom
			x = a.x + dx * (min.y - a.y) / dy;
			y = min.y;

		} else if (code & 2) { // right
			x = max.x;
			y = a.y + dy * (max.x - a.x) / dx;

		} else if (code & 1) { // left
			x = min.x;
			y = a.y + dy * (min.x - a.x) / dx;
		}

		return new L.Point(x, y, round);
	},

	_getBitCode: function (p, bounds) {
		var code = 0;

		if (p.x < bounds.min.x) { // left
			code |= 1;
		} else if (p.x > bounds.max.x) { // right
			code |= 2;
		}

		if (p.y < bounds.min.y) { // bottom
			code |= 4;
		} else if (p.y > bounds.max.y) { // top
			code |= 8;
		}

		return code;
	},

	// square distance (to avoid unnecessary Math.sqrt calls)
	_sqDist: function (p1, p2) {
		var dx = p2.x - p1.x,
		    dy = p2.y - p1.y;
		return dx * dx + dy * dy;
	},

	// return closest point on segment or distance to that point
	_sqClosestPointOnSegment: function (p, p1, p2, sqDist) {
		var x = p1.x,
		    y = p1.y,
		    dx = p2.x - x,
		    dy = p2.y - y,
		    dot = dx * dx + dy * dy,
		    t;

		if (dot > 0) {
			t = ((p.x - x) * dx + (p.y - y) * dy) / dot;

			if (t > 1) {
				x = p2.x;
				y = p2.y;
			} else if (t > 0) {
				x += dx * t;
				y += dy * t;
			}
		}

		dx = p.x - x;
		dy = p.y - y;

		return sqDist ? dx * dx + dy * dy : new L.Point(x, y);
	}
};



/*
 * L.Polyline implements polyline vector layer (a set of points connected with lines)
 */

L.Polyline = L.Path.extend({

	options: {
		// how much to simplify the polyline on each zoom level
		// more = better performance and smoother look, less = more accurate
		smoothFactor: 1.0
		// noClip: false
	},

	initialize: function (latlngs, options) {
		L.setOptions(this, options);
		this._setLatLngs(latlngs);
	},

	getLatLngs: function () {
		return this._latlngs;
	},

	setLatLngs: function (latlngs) {
		this._setLatLngs(latlngs);
		return this.redraw();
	},

	isEmpty: function () {
		return !this._latlngs.length;
	},

	closestLayerPoint: function (p) {
		var minDistance = Infinity,
		    minPoint = null,
		    closest = L.LineUtil._sqClosestPointOnSegment,
		    p1, p2;

		for (var j = 0, jLen = this._parts.length; j < jLen; j++) {
			var points = this._parts[j];

			for (var i = 1, len = points.length; i < len; i++) {
				p1 = points[i - 1];
				p2 = points[i];

				var sqDist = closest(p, p1, p2, true);

				if (sqDist < minDistance) {
					minDistance = sqDist;
					minPoint = closest(p, p1, p2);
				}
			}
		}
		if (minPoint) {
			minPoint.distance = Math.sqrt(minDistance);
		}
		return minPoint;
	},

	getCenter: function () {
		var i, halfDist, segDist, dist, p1, p2, ratio,
		    points = this._rings[0],
		    len = points.length;

		if (!len) { return null; }

		// polyline centroid algorithm; only uses the first ring if there are multiple

		for (i = 0, halfDist = 0; i < len - 1; i++) {
			halfDist += points[i].distanceTo(points[i + 1]) / 2;
		}

		// The line is so small in the current view that all points are on the same pixel.
		if (halfDist === 0) {
			return this._map.layerPointToLatLng(points[0]);
		}

		for (i = 0, dist = 0; i < len - 1; i++) {
			p1 = points[i];
			p2 = points[i + 1];
			segDist = p1.distanceTo(p2);
			dist += segDist;

			if (dist > halfDist) {
				ratio = (dist - halfDist) / segDist;
				return this._map.layerPointToLatLng([
					p2.x - ratio * (p2.x - p1.x),
					p2.y - ratio * (p2.y - p1.y)
				]);
			}
		}
	},

	getBounds: function () {
		return this._bounds;
	},

	addLatLng: function (latlng, latlngs) {
		latlngs = latlngs || this._defaultShape();
		latlng = L.latLng(latlng);
		latlngs.push(latlng);
		this._bounds.extend(latlng);
		return this.redraw();
	},

	_setLatLngs: function (latlngs) {
		this._bounds = new L.LatLngBounds();
		this._latlngs = this._convertLatLngs(latlngs);
	},

	_defaultShape: function () {
		return L.Polyline._flat(this._latlngs) ? this._latlngs : this._latlngs[0];
	},

	// recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
	_convertLatLngs: function (latlngs) {
		var result = [],
		    flat = L.Polyline._flat(latlngs);

		for (var i = 0, len = latlngs.length; i < len; i++) {
			if (flat) {
				result[i] = L.latLng(latlngs[i]);
				this._bounds.extend(result[i]);
			} else {
				result[i] = this._convertLatLngs(latlngs[i]);
			}
		}

		return result;
	},

	_project: function () {
		this._rings = [];
		this._projectLatlngs(this._latlngs, this._rings);

		// project bounds as well to use later for Canvas hit detection/etc.
		var w = this._clickTolerance(),
		    p = new L.Point(w, -w);

		if (this._bounds.isValid()) {
			this._pxBounds = new L.Bounds(
				this._map.latLngToLayerPoint(this._bounds.getSouthWest())._subtract(p),
				this._map.latLngToLayerPoint(this._bounds.getNorthEast())._add(p));
		}
	},

	// recursively turns latlngs into a set of rings with projected coordinates
	_projectLatlngs: function (latlngs, result) {

		var flat = latlngs[0] instanceof L.LatLng,
		    len = latlngs.length,
		    i, ring;

		if (flat) {
			ring = [];
			for (i = 0; i < len; i++) {
				ring[i] = this._map.latLngToLayerPoint(latlngs[i]);
			}
			result.push(ring);
		} else {
			for (i = 0; i < len; i++) {
				this._projectLatlngs(latlngs[i], result);
			}
		}
	},

	// clip polyline by renderer bounds so that we have less to render for performance
	_clipPoints: function () {
		var bounds = this._renderer._bounds;

		this._parts = [];
		if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
			return;
		}

		if (this.options.noClip) {
			this._parts = this._rings;
			return;
		}

		var parts = this._parts,
		    i, j, k, len, len2, segment, points;

		for (i = 0, k = 0, len = this._rings.length; i < len; i++) {
			points = this._rings[i];

			for (j = 0, len2 = points.length; j < len2 - 1; j++) {
				segment = L.LineUtil.clipSegment(points[j], points[j + 1], bounds, j, true);

				if (!segment) { continue; }

				parts[k] = parts[k] || [];
				parts[k].push(segment[0]);

				// if segment goes out of screen, or it's the last one, it's the end of the line part
				if ((segment[1] !== points[j + 1]) || (j === len2 - 2)) {
					parts[k].push(segment[1]);
					k++;
				}
			}
		}
	},

	// simplify each clipped part of the polyline for performance
	_simplifyPoints: function () {
		var parts = this._parts,
		    tolerance = this.options.smoothFactor;

		for (var i = 0, len = parts.length; i < len; i++) {
			parts[i] = L.LineUtil.simplify(parts[i], tolerance);
		}
	},

	_update: function () {
		if (!this._map) { return; }

		this._clipPoints();
		this._simplifyPoints();
		this._updatePath();
	},

	_updatePath: function () {
		this._renderer._updatePoly(this);
	}
});

L.polyline = function (latlngs, options) {
	return new L.Polyline(latlngs, options);
};

L.Polyline._flat = function (latlngs) {
	// true if it's a flat array of latlngs; false if nested
	return !L.Util.isArray(latlngs[0]) || (typeof latlngs[0][0] !== 'object' && typeof latlngs[0][0] !== 'undefined');
};



/*
 * L.PolyUtil contains utility functions for polygons (clipping, etc.).
 */

L.PolyUtil = {};

/*
 * Sutherland-Hodgeman polygon clipping algorithm.
 * Used to avoid rendering parts of a polygon that are not currently visible.
 */
L.PolyUtil.clipPolygon = function (points, bounds, round) {
	var clippedPoints,
	    edges = [1, 4, 2, 8],
	    i, j, k,
	    a, b,
	    len, edge, p,
	    lu = L.LineUtil;

	for (i = 0, len = points.length; i < len; i++) {
		points[i]._code = lu._getBitCode(points[i], bounds);
	}

	// for each edge (left, bottom, right, top)
	for (k = 0; k < 4; k++) {
		edge = edges[k];
		clippedPoints = [];

		for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
			a = points[i];
			b = points[j];

			// if a is inside the clip window
			if (!(a._code & edge)) {
				// if b is outside the clip window (a->b goes out of screen)
				if (b._code & edge) {
					p = lu._getEdgeIntersection(b, a, edge, bounds, round);
					p._code = lu._getBitCode(p, bounds);
					clippedPoints.push(p);
				}
				clippedPoints.push(a);

			// else if b is inside the clip window (a->b enters the screen)
			} else if (!(b._code & edge)) {
				p = lu._getEdgeIntersection(b, a, edge, bounds, round);
				p._code = lu._getBitCode(p, bounds);
				clippedPoints.push(p);
			}
		}
		points = clippedPoints;
	}

	return points;
};



/*
 * L.Polygon implements polygon vector layer (closed polyline with a fill inside).
 */

L.Polygon = L.Polyline.extend({

	options: {
		fill: true
	},

	isEmpty: function () {
		return !this._latlngs.length || !this._latlngs[0].length;
	},

	getCenter: function () {
		var i, j, p1, p2, f, area, x, y, center,
		    points = this._rings[0],
		    len = points.length;

		if (!len) { return null; }

		// polygon centroid algorithm; only uses the first ring if there are multiple

		area = x = y = 0;

		for (i = 0, j = len - 1; i < len; j = i++) {
			p1 = points[i];
			p2 = points[j];

			f = p1.y * p2.x - p2.y * p1.x;
			x += (p1.x + p2.x) * f;
			y += (p1.y + p2.y) * f;
			area += f * 3;
		}

		if (area === 0) {
			// Polygon is so small that all points are on same pixel.
			center = points[0];
		} else {
			center = [x / area, y / area];
		}
		return this._map.layerPointToLatLng(center);
	},

	_convertLatLngs: function (latlngs) {
		var result = L.Polyline.prototype._convertLatLngs.call(this, latlngs),
		    len = result.length;

		// remove last point if it equals first one
		if (len >= 2 && result[0] instanceof L.LatLng && result[0].equals(result[len - 1])) {
			result.pop();
		}
		return result;
	},

	_setLatLngs: function (latlngs) {
		L.Polyline.prototype._setLatLngs.call(this, latlngs);
		if (L.Polyline._flat(this._latlngs)) {
			this._latlngs = [this._latlngs];
		}
	},

	_defaultShape: function () {
		return L.Polyline._flat(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
	},

	_clipPoints: function () {
		// polygons need a different clipping algorithm so we redefine that

		var bounds = this._renderer._bounds,
		    w = this.options.weight,
		    p = new L.Point(w, w);

		// increase clip padding by stroke width to avoid stroke on clip edges
		bounds = new L.Bounds(bounds.min.subtract(p), bounds.max.add(p));

		this._parts = [];
		if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
			return;
		}

		if (this.options.noClip) {
			this._parts = this._rings;
			return;
		}

		for (var i = 0, len = this._rings.length, clipped; i < len; i++) {
			clipped = L.PolyUtil.clipPolygon(this._rings[i], bounds, true);
			if (clipped.length) {
				this._parts.push(clipped);
			}
		}
	},

	_updatePath: function () {
		this._renderer._updatePoly(this, true);
	}
});

L.polygon = function (latlngs, options) {
	return new L.Polygon(latlngs, options);
};



/*
 * L.Rectangle extends Polygon and creates a rectangle when passed a LatLngBounds object.
 */

L.Rectangle = L.Polygon.extend({
	initialize: function (latLngBounds, options) {
		L.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(latLngBounds), options);
	},

	setBounds: function (latLngBounds) {
		return this.setLatLngs(this._boundsToLatLngs(latLngBounds));
	},

	_boundsToLatLngs: function (latLngBounds) {
		latLngBounds = L.latLngBounds(latLngBounds);
		return [
			latLngBounds.getSouthWest(),
			latLngBounds.getNorthWest(),
			latLngBounds.getNorthEast(),
			latLngBounds.getSouthEast()
		];
	}
});

L.rectangle = function (latLngBounds, options) {
	return new L.Rectangle(latLngBounds, options);
};



/*
 * L.CircleMarker is a circle overlay with a permanent pixel radius.
 */

L.CircleMarker = L.Path.extend({

	options: {
		fill: true,
		radius: 10
	},

	initialize: function (latlng, options) {
		L.setOptions(this, options);
		this._latlng = L.latLng(latlng);
		this._radius = this.options.radius;
	},

	setLatLng: function (latlng) {
		this._latlng = L.latLng(latlng);
		this.redraw();
		return this.fire('move', {latlng: this._latlng});
	},

	getLatLng: function () {
		return this._latlng;
	},

	setRadius: function (radius) {
		this.options.radius = this._radius = radius;
		return this.redraw();
	},

	getRadius: function () {
		return this._radius;
	},

	setStyle : function (options) {
		var radius = options && options.radius || this._radius;
		L.Path.prototype.setStyle.call(this, options);
		this.setRadius(radius);
		return this;
	},

	_project: function () {
		this._point = this._map.latLngToLayerPoint(this._latlng);
		this._updateBounds();
	},

	_updateBounds: function () {
		var r = this._radius,
		    r2 = this._radiusY || r,
		    w = this._clickTolerance(),
		    p = [r + w, r2 + w];
		this._pxBounds = new L.Bounds(this._point.subtract(p), this._point.add(p));
	},

	_update: function () {
		if (this._map) {
			this._updatePath();
		}
	},

	_updatePath: function () {
		this._renderer._updateCircle(this);
	},

	_empty: function () {
		return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
	}
});

L.circleMarker = function (latlng, options) {
	return new L.CircleMarker(latlng, options);
};



/*
 * L.Circle is a circle overlay (with a certain radius in meters).
 * It's an approximation and starts to diverge from a real circle closer to poles (due to projection distortion)
 */

L.Circle = L.CircleMarker.extend({

	initialize: function (latlng, options) {
		L.setOptions(this, options);
		this._latlng = L.latLng(latlng);
		this._mRadius = this.options.radius;
	},

	setRadius: function (radius) {
		this._mRadius = radius;
		return this.redraw();
	},

	getRadius: function () {
		return this._mRadius;
	},

	getBounds: function () {
		var half = [this._radius, this._radiusY || this._radius];

		return new L.LatLngBounds(
			this._map.layerPointToLatLng(this._point.subtract(half)),
			this._map.layerPointToLatLng(this._point.add(half)));
	},

	setStyle: L.Path.prototype.setStyle,

	_project: function () {

		var lng = this._latlng.lng,
		    lat = this._latlng.lat,
		    map = this._map,
		    crs = map.options.crs;

		if (crs.distance === L.CRS.Earth.distance) {
			var d = Math.PI / 180,
			    latR = (this._mRadius / L.CRS.Earth.R) / d,
			    top = map.project([lat + latR, lng]),
			    bottom = map.project([lat - latR, lng]),
			    p = top.add(bottom).divideBy(2),
			    lat2 = map.unproject(p).lat,
			    lngR = Math.acos((Math.cos(latR * d) - Math.sin(lat * d) * Math.sin(lat2 * d)) /
			            (Math.cos(lat * d) * Math.cos(lat2 * d))) / d;

			this._point = p.subtract(map.getPixelOrigin());
			this._radius = isNaN(lngR) ? 0 : Math.max(Math.round(p.x - map.project([lat2, lng - lngR]).x), 1);
			this._radiusY = Math.max(Math.round(p.y - top.y), 1);

		} else {
			var latlng2 = crs.unproject(crs.project(this._latlng).subtract([this._mRadius, 0]));

			this._point = map.latLngToLayerPoint(this._latlng);
			this._radius = this._point.x - map.latLngToLayerPoint(latlng2).x;
		}

		this._updateBounds();
	}
});

L.circle = function (latlng, options, legacyOptions) {
	if (typeof options === 'number') {
		// Backwards compatibility with 0.7.x factory (latlng, radius, options?)
		options = L.extend({}, legacyOptions, {radius: options});
	}
	return new L.Circle(latlng, options);
};



/*
 * L.SVG renders vector layers with SVG. All SVG-specific code goes here.
 */

L.SVG = L.Renderer.extend({

	_initContainer: function () {
		this._container = L.SVG.create('svg');

		// makes it possible to click through svg root; we'll reset it back in individual paths
		this._container.setAttribute('pointer-events', 'none');

		this._rootGroup = L.SVG.create('g');
		this._container.appendChild(this._rootGroup);
	},

	_update: function () {
		if (this._map._animatingZoom && this._bounds) { return; }

		L.Renderer.prototype._update.call(this);

		var b = this._bounds,
		    size = b.getSize(),
		    container = this._container;

		// set size of svg-container if changed
		if (!this._svgSize || !this._svgSize.equals(size)) {
			this._svgSize = size;
			container.setAttribute('width', size.x);
			container.setAttribute('height', size.y);
		}

		// movement: update container viewBox so that we don't have to change coordinates of individual layers
		L.DomUtil.setPosition(container, b.min);
		container.setAttribute('viewBox', [b.min.x, b.min.y, size.x, size.y].join(' '));
	},

	// methods below are called by vector layers implementations

	_initPath: function (layer) {
		var path = layer._path = L.SVG.create('path');

		if (layer.options.className) {
			L.DomUtil.addClass(path, layer.options.className);
		}

		if (layer.options.interactive) {
			L.DomUtil.addClass(path, 'leaflet-interactive');
		}

		this._updateStyle(layer);
	},

	_addPath: function (layer) {
		this._rootGroup.appendChild(layer._path);
		layer.addInteractiveTarget(layer._path);
	},

	_removePath: function (layer) {
		L.DomUtil.remove(layer._path);
		layer.removeInteractiveTarget(layer._path);
	},

	_updatePath: function (layer) {
		layer._project();
		layer._update();
	},

	_updateStyle: function (layer) {
		var path = layer._path,
		    options = layer.options;

		if (!path) { return; }

		if (options.stroke) {
			path.setAttribute('stroke', options.color);
			path.setAttribute('stroke-opacity', options.opacity);
			path.setAttribute('stroke-width', options.weight);
			path.setAttribute('stroke-linecap', options.lineCap);
			path.setAttribute('stroke-linejoin', options.lineJoin);

			if (options.dashArray) {
				path.setAttribute('stroke-dasharray', options.dashArray);
			} else {
				path.removeAttribute('stroke-dasharray');
			}

			if (options.dashOffset) {
				path.setAttribute('stroke-dashoffset', options.dashOffset);
			} else {
				path.removeAttribute('stroke-dashoffset');
			}
		} else {
			path.setAttribute('stroke', 'none');
		}

		if (options.fill) {
			path.setAttribute('fill', options.fillColor || options.color);
			path.setAttribute('fill-opacity', options.fillOpacity);
			path.setAttribute('fill-rule', options.fillRule || 'evenodd');
		} else {
			path.setAttribute('fill', 'none');
		}

		path.setAttribute('pointer-events', options.pointerEvents || (options.interactive ? 'visiblePainted' : 'none'));
	},

	_updatePoly: function (layer, closed) {
		this._setPath(layer, L.SVG.pointsToPath(layer._parts, closed));
	},

	_updateCircle: function (layer) {
		var p = layer._point,
		    r = layer._radius,
		    r2 = layer._radiusY || r,
		    arc = 'a' + r + ',' + r2 + ' 0 1,0 ';

		// drawing a circle with two half-arcs
		var d = layer._empty() ? 'M0 0' :
				'M' + (p.x - r) + ',' + p.y +
				arc + (r * 2) + ',0 ' +
				arc + (-r * 2) + ',0 ';

		this._setPath(layer, d);
	},

	_setPath: function (layer, path) {
		layer._path.setAttribute('d', path);
	},

	// SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
	_bringToFront: function (layer) {
		L.DomUtil.toFront(layer._path);
	},

	_bringToBack: function (layer) {
		L.DomUtil.toBack(layer._path);
	}
});


L.extend(L.SVG, {
	create: function (name) {
		return document.createElementNS('http://www.w3.org/2000/svg', name);
	},

	// generates SVG path string for multiple rings, with each ring turning into "M..L..L.." instructions
	pointsToPath: function (rings, closed) {
		var str = '',
		    i, j, len, len2, points, p;

		for (i = 0, len = rings.length; i < len; i++) {
			points = rings[i];

			for (j = 0, len2 = points.length; j < len2; j++) {
				p = points[j];
				str += (j ? 'L' : 'M') + p.x + ' ' + p.y;
			}

			// closes the ring for polygons; "x" is VML syntax
			str += closed ? (L.Browser.svg ? 'z' : 'x') : '';
		}

		// SVG complains about empty path strings
		return str || 'M0 0';
	}
});

L.Browser.svg = !!(document.createElementNS && L.SVG.create('svg').createSVGRect);

L.svg = function (options) {
	return L.Browser.svg || L.Browser.vml ? new L.SVG(options) : null;
};



/*
 * Vector rendering for IE7-8 through VML.
 * Thanks to Dmitry Baranovsky and his Raphael library for inspiration!
 */

L.Browser.vml = !L.Browser.svg && (function () {
	try {
		var div = document.createElement('div');
		div.innerHTML = '<v:shape adj="1"/>';

		var shape = div.firstChild;
		shape.style.behavior = 'url(#default#VML)';

		return shape && (typeof shape.adj === 'object');

	} catch (e) {
		return false;
	}
}());

// redefine some SVG methods to handle VML syntax which is similar but with some differences
L.SVG.include(!L.Browser.vml ? {} : {

	_initContainer: function () {
		this._container = L.DomUtil.create('div', 'leaflet-vml-container');
	},

	_update: function () {
		if (this._map._animatingZoom) { return; }
		L.Renderer.prototype._update.call(this);
	},

	_initPath: function (layer) {
		var container = layer._container = L.SVG.create('shape');

		L.DomUtil.addClass(container, 'leaflet-vml-shape ' + (this.options.className || ''));

		container.coordsize = '1 1';

		layer._path = L.SVG.create('path');
		container.appendChild(layer._path);

		this._updateStyle(layer);
	},

	_addPath: function (layer) {
		var container = layer._container;
		this._container.appendChild(container);

		if (layer.options.interactive) {
			layer.addInteractiveTarget(container);
		}
	},

	_removePath: function (layer) {
		var container = layer._container;
		L.DomUtil.remove(container);
		layer.removeInteractiveTarget(container);
	},

	_updateStyle: function (layer) {
		var stroke = layer._stroke,
		    fill = layer._fill,
		    options = layer.options,
		    container = layer._container;

		container.stroked = !!options.stroke;
		container.filled = !!options.fill;

		if (options.stroke) {
			if (!stroke) {
				stroke = layer._stroke = L.SVG.create('stroke');
			}
			container.appendChild(stroke);
			stroke.weight = options.weight + 'px';
			stroke.color = options.color;
			stroke.opacity = options.opacity;

			if (options.dashArray) {
				stroke.dashStyle = L.Util.isArray(options.dashArray) ?
				    options.dashArray.join(' ') :
				    options.dashArray.replace(/( *, *)/g, ' ');
			} else {
				stroke.dashStyle = '';
			}
			stroke.endcap = options.lineCap.replace('butt', 'flat');
			stroke.joinstyle = options.lineJoin;

		} else if (stroke) {
			container.removeChild(stroke);
			layer._stroke = null;
		}

		if (options.fill) {
			if (!fill) {
				fill = layer._fill = L.SVG.create('fill');
			}
			container.appendChild(fill);
			fill.color = options.fillColor || options.color;
			fill.opacity = options.fillOpacity;

		} else if (fill) {
			container.removeChild(fill);
			layer._fill = null;
		}
	},

	_updateCircle: function (layer) {
		var p = layer._point.round(),
		    r = Math.round(layer._radius),
		    r2 = Math.round(layer._radiusY || r);

		this._setPath(layer, layer._empty() ? 'M0 0' :
				'AL ' + p.x + ',' + p.y + ' ' + r + ',' + r2 + ' 0,' + (65535 * 360));
	},

	_setPath: function (layer, path) {
		layer._path.v = path;
	},

	_bringToFront: function (layer) {
		L.DomUtil.toFront(layer._container);
	},

	_bringToBack: function (layer) {
		L.DomUtil.toBack(layer._container);
	}
});

if (L.Browser.vml) {
	L.SVG.create = (function () {
		try {
			document.namespaces.add('lvml', 'urn:schemas-microsoft-com:vml');
			return function (name) {
				return document.createElement('<lvml:' + name + ' class="lvml">');
			};
		} catch (e) {
			return function (name) {
				return document.createElement('<' + name + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
			};
		}
	})();
}



/*
 * L.Canvas handles Canvas vector layers rendering and mouse events handling. All Canvas-specific code goes here.
 */

L.Canvas = L.Renderer.extend({

	onAdd: function () {
		L.Renderer.prototype.onAdd.call(this);

		this._layers = this._layers || {};

		// Redraw vectors since canvas is cleared upon removal,
		// in case of removing the renderer itself from the map.
		this._draw();
	},

	_initContainer: function () {
		var container = this._container = document.createElement('canvas');

		L.DomEvent
			.on(container, 'mousemove', L.Util.throttle(this._onMouseMove, 32, this), this)
			.on(container, 'click dblclick mousedown mouseup contextmenu', this._onClick, this)
			.on(container, 'mouseout', this._handleMouseOut, this);

		this._ctx = container.getContext('2d');
	},

	_update: function () {
		if (this._map._animatingZoom && this._bounds) { return; }

		this._drawnLayers = {};

		L.Renderer.prototype._update.call(this);

		var b = this._bounds,
		    container = this._container,
		    size = b.getSize(),
		    m = L.Browser.retina ? 2 : 1;

		L.DomUtil.setPosition(container, b.min);

		// set canvas size (also clearing it); use double size on retina
		container.width = m * size.x;
		container.height = m * size.y;
		container.style.width = size.x + 'px';
		container.style.height = size.y + 'px';

		if (L.Browser.retina) {
			this._ctx.scale(2, 2);
		}

		// translate so we use the same path coordinates after canvas element moves
		this._ctx.translate(-b.min.x, -b.min.y);
	},

	_initPath: function (layer) {
		this._layers[L.stamp(layer)] = layer;
	},

	_addPath: L.Util.falseFn,

	_removePath: function (layer) {
		layer._removed = true;
		this._requestRedraw(layer);
	},

	_updatePath: function (layer) {
		this._redrawBounds = layer._pxBounds;
		this._draw(true);
		layer._project();
		layer._update();
		this._draw();
		this._redrawBounds = null;
	},

	_updateStyle: function (layer) {
		this._requestRedraw(layer);
	},

	_requestRedraw: function (layer) {
		if (!this._map) { return; }

		var padding = (layer.options.weight || 0) + 1;
		this._redrawBounds = this._redrawBounds || new L.Bounds();
		this._redrawBounds.extend(layer._pxBounds.min.subtract([padding, padding]));
		this._redrawBounds.extend(layer._pxBounds.max.add([padding, padding]));

		this._redrawRequest = this._redrawRequest || L.Util.requestAnimFrame(this._redraw, this);
	},

	_redraw: function () {
		this._redrawRequest = null;

		this._draw(true); // clear layers in redraw bounds
		this._draw(); // draw layers

		this._redrawBounds = null;
	},

	_draw: function (clear) {
		this._clear = clear;
		var layer, bounds = this._redrawBounds;
		this._ctx.save();
		if (bounds) {
			this._ctx.beginPath();
			this._ctx.rect(bounds.min.x, bounds.min.y, bounds.max.x - bounds.min.x, bounds.max.y - bounds.min.y);
			this._ctx.clip();
		}

		for (var id in this._layers) {
			layer = this._layers[id];
			if (!bounds || layer._pxBounds.intersects(bounds)) {
				layer._updatePath();
			}
			if (clear && layer._removed) {
				delete layer._removed;
				delete this._layers[id];
			}
		}
		this._ctx.restore();  // Restore state before clipping.
	},

	_updatePoly: function (layer, closed) {

		var i, j, len2, p,
		    parts = layer._parts,
		    len = parts.length,
		    ctx = this._ctx;

		if (!len) { return; }

		this._drawnLayers[layer._leaflet_id] = layer;

		ctx.beginPath();

		for (i = 0; i < len; i++) {
			for (j = 0, len2 = parts[i].length; j < len2; j++) {
				p = parts[i][j];
				ctx[j ? 'lineTo' : 'moveTo'](p.x, p.y);
			}
			if (closed) {
				ctx.closePath();
			}
		}

		this._fillStroke(ctx, layer);

		// TODO optimization: 1 fill/stroke for all features with equal style instead of 1 for each feature
	},

	_updateCircle: function (layer) {

		if (layer._empty()) { return; }

		var p = layer._point,
		    ctx = this._ctx,
		    r = layer._radius,
		    s = (layer._radiusY || r) / r;

		if (s !== 1) {
			ctx.save();
			ctx.scale(1, s);
		}

		ctx.beginPath();
		ctx.arc(p.x, p.y / s, r, 0, Math.PI * 2, false);

		if (s !== 1) {
			ctx.restore();
		}

		this._fillStroke(ctx, layer);
	},

	_fillStroke: function (ctx, layer) {
		var clear = this._clear,
		    options = layer.options;

		ctx.globalCompositeOperation = clear ? 'destination-out' : 'source-over';

		if (options.fill) {
			ctx.globalAlpha = clear ? 1 : options.fillOpacity;
			ctx.fillStyle = options.fillColor || options.color;
			ctx.fill(options.fillRule || 'evenodd');
		}

		if (options.stroke && options.weight !== 0) {
			ctx.globalAlpha = clear ? 1 : options.opacity;

			// if clearing shape, do it with the previously drawn line width
			layer._prevWeight = ctx.lineWidth = clear ? layer._prevWeight + 1 : options.weight;

			ctx.strokeStyle = options.color;
			ctx.lineCap = options.lineCap;
			ctx.lineJoin = options.lineJoin;
			ctx.stroke();
		}
	},

	// Canvas obviously doesn't have mouse events for individual drawn objects,
	// so we emulate that by calculating what's under the mouse on mousemove/click manually

	_onClick: function (e) {
		var point = this._map.mouseEventToLayerPoint(e), layers = [];

		for (var id in this._layers) {
			if (this._layers[id]._containsPoint(point)) {
				L.DomEvent._fakeStop(e);
				layers.push(this._layers[id]);
			}
		}
		if (layers.length)  {
			this._fireEvent(layers, e);
		}
	},

	_onMouseMove: function (e) {
		if (!this._map || this._map.dragging._draggable._moving || this._map._animatingZoom) { return; }

		var point = this._map.mouseEventToLayerPoint(e);
		this._handleMouseOut(e, point);
		this._handleMouseHover(e, point);
	},


	_handleMouseOut: function (e, point) {
		var layer = this._hoveredLayer;
		if (layer && (e.type === 'mouseout' || !layer._containsPoint(point))) {
			// if we're leaving the layer, fire mouseout
			L.DomUtil.removeClass(this._container, 'leaflet-interactive');
			this._fireEvent([layer], e, 'mouseout');
			this._hoveredLayer = null;
		}
	},

	_handleMouseHover: function (e, point) {
		var id, layer;
		if (!this._hoveredLayer) {
			for (id in this._drawnLayers) {
				layer = this._drawnLayers[id];
				if (layer.options.interactive && layer._containsPoint(point)) {
					L.DomUtil.addClass(this._container, 'leaflet-interactive'); // change cursor
					this._fireEvent([layer], e, 'mouseover');
					this._hoveredLayer = layer;
					break;
				}
			}
		}
		if (this._hoveredLayer) {
			this._fireEvent([this._hoveredLayer], e);
		}
	},

	_fireEvent: function (layers, e, type) {
		this._map._fireDOMEvent(e, type || e.type, layers);
	},

	// TODO _bringToFront & _bringToBack, pretty tricky

	_bringToFront: L.Util.falseFn,
	_bringToBack: L.Util.falseFn
});

L.Browser.canvas = (function () {
	return !!document.createElement('canvas').getContext;
}());

L.canvas = function (options) {
	return L.Browser.canvas ? new L.Canvas(options) : null;
};

L.Polyline.prototype._containsPoint = function (p, closed) {
	var i, j, k, len, len2, part,
	    w = this._clickTolerance();

	if (!this._pxBounds.contains(p)) { return false; }

	// hit detection for polylines
	for (i = 0, len = this._parts.length; i < len; i++) {
		part = this._parts[i];

		for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
			if (!closed && (j === 0)) { continue; }

			if (L.LineUtil.pointToSegmentDistance(p, part[k], part[j]) <= w) {
				return true;
			}
		}
	}
	return false;
};

L.Polygon.prototype._containsPoint = function (p) {
	var inside = false,
	    part, p1, p2, i, j, k, len, len2;

	if (!this._pxBounds.contains(p)) { return false; }

	// ray casting algorithm for detecting if point is in polygon
	for (i = 0, len = this._parts.length; i < len; i++) {
		part = this._parts[i];

		for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
			p1 = part[j];
			p2 = part[k];

			if (((p1.y > p.y) !== (p2.y > p.y)) && (p.x < (p2.x - p1.x) * (p.y - p1.y) / (p2.y - p1.y) + p1.x)) {
				inside = !inside;
			}
		}
	}

	// also check if it's on polygon stroke
	return inside || L.Polyline.prototype._containsPoint.call(this, p, true);
};

L.CircleMarker.prototype._containsPoint = function (p) {
	return p.distanceTo(this._point) <= this._radius + this._clickTolerance();
};



/*
 * L.GeoJSON turns any GeoJSON data into a Leaflet layer.
 */

L.GeoJSON = L.FeatureGroup.extend({

	initialize: function (geojson, options) {
		L.setOptions(this, options);

		this._layers = {};

		if (geojson) {
			this.addData(geojson);
		}
	},

	addData: function (geojson) {
		var features = L.Util.isArray(geojson) ? geojson : geojson.features,
		    i, len, feature;

		if (features) {
			for (i = 0, len = features.length; i < len; i++) {
				// only add this if geometry or geometries are set and not null
				feature = features[i];
				if (feature.geometries || feature.geometry || feature.features || feature.coordinates) {
					this.addData(feature);
				}
			}
			return this;
		}

		var options = this.options;

		if (options.filter && !options.filter(geojson)) { return this; }

		var layer = L.GeoJSON.geometryToLayer(geojson, options);
		if (!layer) {
			return this;
		}
		layer.feature = L.GeoJSON.asFeature(geojson);

		layer.defaultOptions = layer.options;
		this.resetStyle(layer);

		if (options.onEachFeature) {
			options.onEachFeature(geojson, layer);
		}

		return this.addLayer(layer);
	},

	resetStyle: function (layer) {
		// reset any custom styles
		layer.options = layer.defaultOptions;
		this._setLayerStyle(layer, this.options.style);
		return this;
	},

	setStyle: function (style) {
		return this.eachLayer(function (layer) {
			this._setLayerStyle(layer, style);
		}, this);
	},

	_setLayerStyle: function (layer, style) {
		if (typeof style === 'function') {
			style = style(layer.feature);
		}
		if (layer.setStyle) {
			layer.setStyle(style);
		}
	}
});

L.extend(L.GeoJSON, {
	geometryToLayer: function (geojson, options) {

		var geometry = geojson.type === 'Feature' ? geojson.geometry : geojson,
		    coords = geometry ? geometry.coordinates : null,
		    layers = [],
		    pointToLayer = options && options.pointToLayer,
		    coordsToLatLng = options && options.coordsToLatLng || this.coordsToLatLng,
		    latlng, latlngs, i, len;

		if (!coords && !geometry) {
			return null;
		}

		switch (geometry.type) {
		case 'Point':
			latlng = coordsToLatLng(coords);
			return pointToLayer ? pointToLayer(geojson, latlng) : new L.Marker(latlng);

		case 'MultiPoint':
			for (i = 0, len = coords.length; i < len; i++) {
				latlng = coordsToLatLng(coords[i]);
				layers.push(pointToLayer ? pointToLayer(geojson, latlng) : new L.Marker(latlng));
			}
			return new L.FeatureGroup(layers);

		case 'LineString':
		case 'MultiLineString':
			latlngs = this.coordsToLatLngs(coords, geometry.type === 'LineString' ? 0 : 1, coordsToLatLng);
			return new L.Polyline(latlngs, options);

		case 'Polygon':
		case 'MultiPolygon':
			latlngs = this.coordsToLatLngs(coords, geometry.type === 'Polygon' ? 1 : 2, coordsToLatLng);
			return new L.Polygon(latlngs, options);

		case 'GeometryCollection':
			for (i = 0, len = geometry.geometries.length; i < len; i++) {
				var layer = this.geometryToLayer({
					geometry: geometry.geometries[i],
					type: 'Feature',
					properties: geojson.properties
				}, options);

				if (layer) {
					layers.push(layer);
				}
			}
			return new L.FeatureGroup(layers);

		default:
			throw new Error('Invalid GeoJSON object.');
		}
	},

	coordsToLatLng: function (coords) {
		return new L.LatLng(coords[1], coords[0], coords[2]);
	},

	coordsToLatLngs: function (coords, levelsDeep, coordsToLatLng) {
		var latlngs = [];

		for (var i = 0, len = coords.length, latlng; i < len; i++) {
			latlng = levelsDeep ?
			        this.coordsToLatLngs(coords[i], levelsDeep - 1, coordsToLatLng) :
			        (coordsToLatLng || this.coordsToLatLng)(coords[i]);

			latlngs.push(latlng);
		}

		return latlngs;
	},

	latLngToCoords: function (latlng) {
		return latlng.alt !== undefined ?
				[latlng.lng, latlng.lat, latlng.alt] :
				[latlng.lng, latlng.lat];
	},

	latLngsToCoords: function (latlngs, levelsDeep, closed) {
		var coords = [];

		for (var i = 0, len = latlngs.length; i < len; i++) {
			coords.push(levelsDeep ?
				L.GeoJSON.latLngsToCoords(latlngs[i], levelsDeep - 1, closed) :
				L.GeoJSON.latLngToCoords(latlngs[i]));
		}

		if (!levelsDeep && closed) {
			coords.push(coords[0]);
		}

		return coords;
	},

	getFeature: function (layer, newGeometry) {
		return layer.feature ?
				L.extend({}, layer.feature, {geometry: newGeometry}) :
				L.GeoJSON.asFeature(newGeometry);
	},

	asFeature: function (geoJSON) {
		if (geoJSON.type === 'Feature') {
			return geoJSON;
		}

		return {
			type: 'Feature',
			properties: {},
			geometry: geoJSON
		};
	}
});

var PointToGeoJSON = {
	toGeoJSON: function () {
		return L.GeoJSON.getFeature(this, {
			type: 'Point',
			coordinates: L.GeoJSON.latLngToCoords(this.getLatLng())
		});
	}
};

L.Marker.include(PointToGeoJSON);
L.Circle.include(PointToGeoJSON);
L.CircleMarker.include(PointToGeoJSON);

L.Polyline.prototype.toGeoJSON = function () {
	var multi = !L.Polyline._flat(this._latlngs);

	var coords = L.GeoJSON.latLngsToCoords(this._latlngs, multi ? 1 : 0);

	return L.GeoJSON.getFeature(this, {
		type: (multi ? 'Multi' : '') + 'LineString',
		coordinates: coords
	});
};

L.Polygon.prototype.toGeoJSON = function () {
	var holes = !L.Polyline._flat(this._latlngs),
	    multi = holes && !L.Polyline._flat(this._latlngs[0]);

	var coords = L.GeoJSON.latLngsToCoords(this._latlngs, multi ? 2 : holes ? 1 : 0, true);

	if (!holes) {
		coords = [coords];
	}

	return L.GeoJSON.getFeature(this, {
		type: (multi ? 'Multi' : '') + 'Polygon',
		coordinates: coords
	});
};


L.LayerGroup.include({
	toMultiPoint: function () {
		var coords = [];

		this.eachLayer(function (layer) {
			coords.push(layer.toGeoJSON().geometry.coordinates);
		});

		return L.GeoJSON.getFeature(this, {
			type: 'MultiPoint',
			coordinates: coords
		});
	},

	toGeoJSON: function () {

		var type = this.feature && this.feature.geometry && this.feature.geometry.type;

		if (type === 'MultiPoint') {
			return this.toMultiPoint();
		}

		var isGeometryCollection = type === 'GeometryCollection',
		    jsons = [];

		this.eachLayer(function (layer) {
			if (layer.toGeoJSON) {
				var json = layer.toGeoJSON();
				jsons.push(isGeometryCollection ? json.geometry : L.GeoJSON.asFeature(json));
			}
		});

		if (isGeometryCollection) {
			return L.GeoJSON.getFeature(this, {
				geometries: jsons,
				type: 'GeometryCollection'
			});
		}

		return {
			type: 'FeatureCollection',
			features: jsons
		};
	}
});

L.geoJson = function (geojson, options) {
	return new L.GeoJSON(geojson, options);
};



/*
 * L.DomEvent contains functions for working with DOM events.
 * Inspired by John Resig, Dean Edwards and YUI addEvent implementations.
 */

var eventsKey = '_leaflet_events';

L.DomEvent = {

	on: function (obj, types, fn, context) {

		if (typeof types === 'object') {
			for (var type in types) {
				this._on(obj, type, types[type], fn);
			}
		} else {
			types = L.Util.splitWords(types);

			for (var i = 0, len = types.length; i < len; i++) {
				this._on(obj, types[i], fn, context);
			}
		}

		return this;
	},

	off: function (obj, types, fn, context) {

		if (typeof types === 'object') {
			for (var type in types) {
				this._off(obj, type, types[type], fn);
			}
		} else {
			types = L.Util.splitWords(types);

			for (var i = 0, len = types.length; i < len; i++) {
				this._off(obj, types[i], fn, context);
			}
		}

		return this;
	},

	_on: function (obj, type, fn, context) {
		var id = type + L.stamp(fn) + (context ? '_' + L.stamp(context) : '');

		if (obj[eventsKey] && obj[eventsKey][id]) { return this; }

		var handler = function (e) {
			return fn.call(context || obj, e || window.event);
		};

		var originalHandler = handler;

		if (L.Browser.pointer && type.indexOf('touch') === 0) {
			this.addPointerListener(obj, type, handler, id);

		} else if (L.Browser.touch && (type === 'dblclick') && this.addDoubleTapListener) {
			this.addDoubleTapListener(obj, handler, id);

		} else if ('addEventListener' in obj) {

			if (type === 'mousewheel') {
				obj.addEventListener('DOMMouseScroll', handler, false);
				obj.addEventListener(type, handler, false);

			} else if ((type === 'mouseenter') || (type === 'mouseleave')) {
				handler = function (e) {
					e = e || window.event;
					if (L.DomEvent._isExternalTarget(obj, e)) {
						originalHandler(e);
					}
				};
				obj.addEventListener(type === 'mouseenter' ? 'mouseover' : 'mouseout', handler, false);

			} else {
				if (type === 'click' && L.Browser.android) {
					handler = function (e) {
						return L.DomEvent._filterClick(e, originalHandler);
					};
				}
				obj.addEventListener(type, handler, false);
			}

		} else if ('attachEvent' in obj) {
			obj.attachEvent('on' + type, handler);
		}

		obj[eventsKey] = obj[eventsKey] || {};
		obj[eventsKey][id] = handler;

		return this;
	},

	_off: function (obj, type, fn, context) {

		var id = type + L.stamp(fn) + (context ? '_' + L.stamp(context) : ''),
		    handler = obj[eventsKey] && obj[eventsKey][id];

		if (!handler) { return this; }

		if (L.Browser.pointer && type.indexOf('touch') === 0) {
			this.removePointerListener(obj, type, id);

		} else if (L.Browser.touch && (type === 'dblclick') && this.removeDoubleTapListener) {
			this.removeDoubleTapListener(obj, id);

		} else if ('removeEventListener' in obj) {

			if (type === 'mousewheel') {
				obj.removeEventListener('DOMMouseScroll', handler, false);
				obj.removeEventListener(type, handler, false);

			} else {
				obj.removeEventListener(
					type === 'mouseenter' ? 'mouseover' :
					type === 'mouseleave' ? 'mouseout' : type, handler, false);
			}

		} else if ('detachEvent' in obj) {
			obj.detachEvent('on' + type, handler);
		}

		obj[eventsKey][id] = null;

		return this;
	},

	stopPropagation: function (e) {

		if (e.stopPropagation) {
			e.stopPropagation();
		} else if (e.originalEvent) {  // In case of Leaflet event.
			e.originalEvent._stopped = true;
		} else {
			e.cancelBubble = true;
		}
		L.DomEvent._skipped(e);

		return this;
	},

	disableScrollPropagation: function (el) {
		return L.DomEvent.on(el, 'mousewheel MozMousePixelScroll', L.DomEvent.stopPropagation);
	},

	disableClickPropagation: function (el) {
		var stop = L.DomEvent.stopPropagation;

		L.DomEvent.on(el, L.Draggable.START.join(' '), stop);

		return L.DomEvent.on(el, {
			click: L.DomEvent._fakeStop,
			dblclick: stop
		});
	},

	preventDefault: function (e) {

		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
		return this;
	},

	stop: function (e) {
		return L.DomEvent
			.preventDefault(e)
			.stopPropagation(e);
	},

	getMousePosition: function (e, container) {
		if (!container) {
			return new L.Point(e.clientX, e.clientY);
		}

		var rect = container.getBoundingClientRect();

		return new L.Point(
			e.clientX - rect.left - container.clientLeft,
			e.clientY - rect.top - container.clientTop);
	},

	getWheelDelta: function (e) {

		var delta = 0;

		if (e.wheelDelta) {
			delta = e.wheelDelta / 120;
		}
		if (e.detail) {
			delta = -e.detail / 3;
		}
		return delta;
	},

	_skipEvents: {},

	_fakeStop: function (e) {
		// fakes stopPropagation by setting a special event flag, checked/reset with L.DomEvent._skipped(e)
		L.DomEvent._skipEvents[e.type] = true;
	},

	_skipped: function (e) {
		var skipped = this._skipEvents[e.type];
		// reset when checking, as it's only used in map container and propagates outside of the map
		this._skipEvents[e.type] = false;
		return skipped;
	},

	// check if element really left/entered the event target (for mouseenter/mouseleave)
	_isExternalTarget: function (el, e) {

		var related = e.relatedTarget;

		if (!related) { return true; }

		try {
			while (related && (related !== el)) {
				related = related.parentNode;
			}
		} catch (err) {
			return false;
		}
		return (related !== el);
	},

	// this is a horrible workaround for a bug in Android where a single touch triggers two click events
	_filterClick: function (e, handler) {
		var timeStamp = (e.timeStamp || e.originalEvent.timeStamp),
		    elapsed = L.DomEvent._lastClick && (timeStamp - L.DomEvent._lastClick);

		// are they closer together than 500ms yet more than 100ms?
		// Android typically triggers them ~300ms apart while multiple listeners
		// on the same event should be triggered far faster;
		// or check if click is simulated on the element, and if it is, reject any non-simulated events

		if ((elapsed && elapsed > 100 && elapsed < 500) || (e.target._simulatedClick && !e._simulated)) {
			L.DomEvent.stop(e);
			return;
		}
		L.DomEvent._lastClick = timeStamp;

		handler(e);
	}
};

L.DomEvent.addListener = L.DomEvent.on;
L.DomEvent.removeListener = L.DomEvent.off;



/*
 * L.Draggable allows you to add dragging capabilities to any element. Supports mobile devices too.
 */

L.Draggable = L.Evented.extend({

	statics: {
		START: L.Browser.touch ? ['touchstart', 'mousedown'] : ['mousedown'],
		END: {
			mousedown: 'mouseup',
			touchstart: 'touchend',
			pointerdown: 'touchend',
			MSPointerDown: 'touchend'
		},
		MOVE: {
			mousedown: 'mousemove',
			touchstart: 'touchmove',
			pointerdown: 'touchmove',
			MSPointerDown: 'touchmove'
		}
	},

	initialize: function (element, dragStartTarget, preventOutline) {
		this._element = element;
		this._dragStartTarget = dragStartTarget || element;
		this._preventOutline = preventOutline;
	},

	enable: function () {
		if (this._enabled) { return; }

		L.DomEvent.on(this._dragStartTarget, L.Draggable.START.join(' '), this._onDown, this);

		this._enabled = true;
	},

	disable: function () {
		if (!this._enabled) { return; }

		L.DomEvent.off(this._dragStartTarget, L.Draggable.START.join(' '), this._onDown, this);

		this._enabled = false;
		this._moved = false;
	},

	_onDown: function (e) {
		this._moved = false;

		if (L.DomUtil.hasClass(this._element, 'leaflet-zoom-anim')) { return; }

		if (L.Draggable._dragging || e.shiftKey || ((e.which !== 1) && (e.button !== 1) && !e.touches) || !this._enabled) { return; }
		L.Draggable._dragging = true;  // Prevent dragging multiple objects at once.

		if (this._preventOutline) {
			L.DomUtil.preventOutline(this._element);
		}

		L.DomUtil.disableImageDrag();
		L.DomUtil.disableTextSelection();

		if (this._moving) { return; }

		this.fire('down');

		var first = e.touches ? e.touches[0] : e;

		this._startPoint = new L.Point(first.clientX, first.clientY);
		this._startPos = this._newPos = L.DomUtil.getPosition(this._element);

		L.DomEvent
		    .on(document, L.Draggable.MOVE[e.type], this._onMove, this)
		    .on(document, L.Draggable.END[e.type], this._onUp, this);
	},

	_onMove: function (e) {
		if (e.touches && e.touches.length > 1) {
			this._moved = true;
			return;
		}

		var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e),
		    newPoint = new L.Point(first.clientX, first.clientY),
		    offset = newPoint.subtract(this._startPoint);

		if (!offset.x && !offset.y) { return; }
		if (L.Browser.touch && Math.abs(offset.x) + Math.abs(offset.y) < 3) { return; }

		L.DomEvent.preventDefault(e);

		if (!this._moved) {
			this.fire('dragstart');

			this._moved = true;
			this._startPos = L.DomUtil.getPosition(this._element).subtract(offset);

			L.DomUtil.addClass(document.body, 'leaflet-dragging');

			this._lastTarget = e.target || e.srcElement;
			L.DomUtil.addClass(this._lastTarget, 'leaflet-drag-target');
		}

		this._newPos = this._startPos.add(offset);
		this._moving = true;

		L.Util.cancelAnimFrame(this._animRequest);
		this._lastEvent = e;
		this._animRequest = L.Util.requestAnimFrame(this._updatePosition, this, true);
	},

	_updatePosition: function () {
		var e = {originalEvent: this._lastEvent};
		this.fire('predrag', e);
		L.DomUtil.setPosition(this._element, this._newPos);
		this.fire('drag', e);
	},

	_onUp: function () {
		L.DomUtil.removeClass(document.body, 'leaflet-dragging');

		if (this._lastTarget) {
			L.DomUtil.removeClass(this._lastTarget, 'leaflet-drag-target');
			this._lastTarget = null;
		}

		for (var i in L.Draggable.MOVE) {
			L.DomEvent
			    .off(document, L.Draggable.MOVE[i], this._onMove, this)
			    .off(document, L.Draggable.END[i], this._onUp, this);
		}

		L.DomUtil.enableImageDrag();
		L.DomUtil.enableTextSelection();

		if (this._moved && this._moving) {
			// ensure drag is not fired after dragend
			L.Util.cancelAnimFrame(this._animRequest);

			this.fire('dragend', {
				distance: this._newPos.distanceTo(this._startPos)
			});
		}

		this._moving = false;
		L.Draggable._dragging = false;
	}
});



/*
	L.Handler is a base class for handler classes that are used internally to inject
	interaction features like dragging to classes like Map and Marker.
*/

L.Handler = L.Class.extend({
	initialize: function (map) {
		this._map = map;
	},

	enable: function () {
		if (this._enabled) { return; }

		this._enabled = true;
		this.addHooks();
	},

	disable: function () {
		if (!this._enabled) { return; }

		this._enabled = false;
		this.removeHooks();
	},

	enabled: function () {
		return !!this._enabled;
	}
});



/*
 * L.Handler.MapDrag is used to make the map draggable (with panning inertia), enabled by default.
 */

L.Map.mergeOptions({
	dragging: true,

	inertia: !L.Browser.android23,
	inertiaDeceleration: 3400, // px/s^2
	inertiaMaxSpeed: Infinity, // px/s
	easeLinearity: 0.2,

	// TODO refactor, move to CRS
	worldCopyJump: false
});

L.Map.Drag = L.Handler.extend({
	addHooks: function () {
		if (!this._draggable) {
			var map = this._map;

			this._draggable = new L.Draggable(map._mapPane, map._container);

			this._draggable.on({
				down: this._onDown,
				dragstart: this._onDragStart,
				drag: this._onDrag,
				dragend: this._onDragEnd
			}, this);

			this._draggable.on('predrag', this._onPreDragLimit, this);
			if (map.options.worldCopyJump) {
				this._draggable.on('predrag', this._onPreDragWrap, this);
				map.on('zoomend', this._onZoomEnd, this);

				map.whenReady(this._onZoomEnd, this);
			}
		}
		L.DomUtil.addClass(this._map._container, 'leaflet-grab');
		this._draggable.enable();
	},

	removeHooks: function () {
		L.DomUtil.removeClass(this._map._container, 'leaflet-grab');
		this._draggable.disable();
	},

	moved: function () {
		return this._draggable && this._draggable._moved;
	},

	_onDown: function () {
		this._map.stop();
	},

	_onDragStart: function () {
		var map = this._map;

		if (this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
			var bounds = L.latLngBounds(this._map.options.maxBounds);

			this._offsetLimit = L.bounds(
				this._map.latLngToContainerPoint(bounds.getNorthWest()).multiplyBy(-1),
				this._map.latLngToContainerPoint(bounds.getSouthEast()).multiplyBy(-1)
					.add(this._map.getSize()));

			this._viscosity = Math.min(1.0, Math.max(0.0, this._map.options.maxBoundsViscosity));
		} else {
			this._offsetLimit = null;
		}

		map
		    .fire('movestart')
		    .fire('dragstart');

		if (map.options.inertia) {
			this._positions = [];
			this._times = [];
		}
	},

	_onDrag: function (e) {
		if (this._map.options.inertia) {
			var time = this._lastTime = +new Date(),
			    pos = this._lastPos = this._draggable._absPos || this._draggable._newPos;

			this._positions.push(pos);
			this._times.push(time);

			if (time - this._times[0] > 50) {
				this._positions.shift();
				this._times.shift();
			}
		}

		this._map
		    .fire('move', e)
		    .fire('drag', e);
	},

	_onZoomEnd: function () {
		var pxCenter = this._map.getSize().divideBy(2),
		    pxWorldCenter = this._map.latLngToLayerPoint([0, 0]);

		this._initialWorldOffset = pxWorldCenter.subtract(pxCenter).x;
		this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
	},

	_viscousLimit: function (value, threshold) {
		return value - (value - threshold) * this._viscosity;
	},

	_onPreDragLimit: function () {
		if (!this._viscosity || !this._offsetLimit) { return; }

		var offset = this._draggable._newPos.subtract(this._draggable._startPos);

		var limit = this._offsetLimit;
		if (offset.x < limit.min.x) { offset.x = this._viscousLimit(offset.x, limit.min.x); }
		if (offset.y < limit.min.y) { offset.y = this._viscousLimit(offset.y, limit.min.y); }
		if (offset.x > limit.max.x) { offset.x = this._viscousLimit(offset.x, limit.max.x); }
		if (offset.y > limit.max.y) { offset.y = this._viscousLimit(offset.y, limit.max.y); }

		this._draggable._newPos = this._draggable._startPos.add(offset);
	},

	_onPreDragWrap: function () {
		// TODO refactor to be able to adjust map pane position after zoom
		var worldWidth = this._worldWidth,
		    halfWidth = Math.round(worldWidth / 2),
		    dx = this._initialWorldOffset,
		    x = this._draggable._newPos.x,
		    newX1 = (x - halfWidth + dx) % worldWidth + halfWidth - dx,
		    newX2 = (x + halfWidth + dx) % worldWidth - halfWidth - dx,
		    newX = Math.abs(newX1 + dx) < Math.abs(newX2 + dx) ? newX1 : newX2;

		this._draggable._absPos = this._draggable._newPos.clone();
		this._draggable._newPos.x = newX;
	},

	_onDragEnd: function (e) {
		var map = this._map,
		    options = map.options,

		    noInertia = !options.inertia || this._times.length < 2;

		map.fire('dragend', e);

		if (noInertia) {
			map.fire('moveend');

		} else {

			var direction = this._lastPos.subtract(this._positions[0]),
			    duration = (this._lastTime - this._times[0]) / 1000,
			    ease = options.easeLinearity,

			    speedVector = direction.multiplyBy(ease / duration),
			    speed = speedVector.distanceTo([0, 0]),

			    limitedSpeed = Math.min(options.inertiaMaxSpeed, speed),
			    limitedSpeedVector = speedVector.multiplyBy(limitedSpeed / speed),

			    decelerationDuration = limitedSpeed / (options.inertiaDeceleration * ease),
			    offset = limitedSpeedVector.multiplyBy(-decelerationDuration / 2).round();

			if (!offset.x && !offset.y) {
				map.fire('moveend');

			} else {
				offset = map._limitOffset(offset, map.options.maxBounds);

				L.Util.requestAnimFrame(function () {
					map.panBy(offset, {
						duration: decelerationDuration,
						easeLinearity: ease,
						noMoveStart: true,
						animate: true
					});
				});
			}
		}
	}
});

L.Map.addInitHook('addHandler', 'dragging', L.Map.Drag);



/*
 * L.Handler.DoubleClickZoom is used to handle double-click zoom on the map, enabled by default.
 */

L.Map.mergeOptions({
	doubleClickZoom: true
});

L.Map.DoubleClickZoom = L.Handler.extend({
	addHooks: function () {
		this._map.on('dblclick', this._onDoubleClick, this);
	},

	removeHooks: function () {
		this._map.off('dblclick', this._onDoubleClick, this);
	},

	_onDoubleClick: function (e) {
		var map = this._map,
		    oldZoom = map.getZoom(),
		    zoom = e.originalEvent.shiftKey ? Math.ceil(oldZoom) - 1 : Math.floor(oldZoom) + 1;

		if (map.options.doubleClickZoom === 'center') {
			map.setZoom(zoom);
		} else {
			map.setZoomAround(e.containerPoint, zoom);
		}
	}
});

L.Map.addInitHook('addHandler', 'doubleClickZoom', L.Map.DoubleClickZoom);



/*
 * L.Handler.ScrollWheelZoom is used by L.Map to enable mouse scroll wheel zoom on the map.
 */

L.Map.mergeOptions({
	scrollWheelZoom: true,
	wheelDebounceTime: 40
});

L.Map.ScrollWheelZoom = L.Handler.extend({
	addHooks: function () {
		L.DomEvent.on(this._map._container, {
			mousewheel: this._onWheelScroll,
			MozMousePixelScroll: L.DomEvent.preventDefault
		}, this);

		this._delta = 0;
	},

	removeHooks: function () {
		L.DomEvent.off(this._map._container, {
			mousewheel: this._onWheelScroll,
			MozMousePixelScroll: L.DomEvent.preventDefault
		}, this);
	},

	_onWheelScroll: function (e) {
		var delta = L.DomEvent.getWheelDelta(e);
		var debounce = this._map.options.wheelDebounceTime;

		this._delta += delta;
		this._lastMousePos = this._map.mouseEventToContainerPoint(e);

		if (!this._startTime) {
			this._startTime = +new Date();
		}

		var left = Math.max(debounce - (+new Date() - this._startTime), 0);

		clearTimeout(this._timer);
		this._timer = setTimeout(L.bind(this._performZoom, this), left);

		L.DomEvent.stop(e);
	},

	_performZoom: function () {
		var map = this._map,
		    delta = this._delta,
		    zoom = map.getZoom();

		map.stop(); // stop panning and fly animations if any

		delta = delta > 0 ? Math.ceil(delta) : Math.floor(delta);
		delta = Math.max(Math.min(delta, 4), -4);
		delta = map._limitZoom(zoom + delta) - zoom;

		this._delta = 0;
		this._startTime = null;

		if (!delta) { return; }

		if (map.options.scrollWheelZoom === 'center') {
			map.setZoom(zoom + delta);
		} else {
			map.setZoomAround(this._lastMousePos, zoom + delta);
		}
	}
});

L.Map.addInitHook('addHandler', 'scrollWheelZoom', L.Map.ScrollWheelZoom);



/*
 * Extends the event handling code with double tap support for mobile browsers.
 */

L.extend(L.DomEvent, {

	_touchstart: L.Browser.msPointer ? 'MSPointerDown' : L.Browser.pointer ? 'pointerdown' : 'touchstart',
	_touchend: L.Browser.msPointer ? 'MSPointerUp' : L.Browser.pointer ? 'pointerup' : 'touchend',

	// inspired by Zepto touch code by Thomas Fuchs
	addDoubleTapListener: function (obj, handler, id) {
		var last, touch,
		    doubleTap = false,
		    delay = 250;

		function onTouchStart(e) {
			var count;

			if (L.Browser.pointer) {
				count = L.DomEvent._pointersCount;
			} else {
				count = e.touches.length;
			}

			if (count > 1) { return; }

			var now = Date.now(),
			    delta = now - (last || now);

			touch = e.touches ? e.touches[0] : e;
			doubleTap = (delta > 0 && delta <= delay);
			last = now;
		}

		function onTouchEnd() {
			if (doubleTap && !touch.cancelBubble) {
				if (L.Browser.pointer) {
					// work around .type being readonly with MSPointer* events
					var newTouch = {},
					    prop, i;

					for (i in touch) {
						prop = touch[i];
						newTouch[i] = prop && prop.bind ? prop.bind(touch) : prop;
					}
					touch = newTouch;
				}
				touch.type = 'dblclick';
				handler(touch);
				last = null;
			}
		}

		var pre = '_leaflet_',
		    touchstart = this._touchstart,
		    touchend = this._touchend;

		obj[pre + touchstart + id] = onTouchStart;
		obj[pre + touchend + id] = onTouchEnd;

		obj.addEventListener(touchstart, onTouchStart, false);
		obj.addEventListener(touchend, onTouchEnd, false);
		return this;
	},

	removeDoubleTapListener: function (obj, id) {
		var pre = '_leaflet_',
		    touchend = obj[pre + this._touchend + id];

		obj.removeEventListener(this._touchstart, obj[pre + this._touchstart + id], false);
		obj.removeEventListener(this._touchend, touchend, false);

		return this;
	}
});



/*
 * Extends L.DomEvent to provide touch support for Internet Explorer and Windows-based devices.
 */

L.extend(L.DomEvent, {

	POINTER_DOWN:   L.Browser.msPointer ? 'MSPointerDown'   : 'pointerdown',
	POINTER_MOVE:   L.Browser.msPointer ? 'MSPointerMove'   : 'pointermove',
	POINTER_UP:     L.Browser.msPointer ? 'MSPointerUp'     : 'pointerup',
	POINTER_CANCEL: L.Browser.msPointer ? 'MSPointerCancel' : 'pointercancel',

	_pointers: {},
	_pointersCount: 0,

	// Provides a touch events wrapper for (ms)pointer events.
	// ref http://www.w3.org/TR/pointerevents/ https://www.w3.org/Bugs/Public/show_bug.cgi?id=22890

	addPointerListener: function (obj, type, handler, id) {

		if (type === 'touchstart') {
			this._addPointerStart(obj, handler, id);

		} else if (type === 'touchmove') {
			this._addPointerMove(obj, handler, id);

		} else if (type === 'touchend') {
			this._addPointerEnd(obj, handler, id);
		}

		return this;
	},

	removePointerListener: function (obj, type, id) {
		var handler = obj['_leaflet_' + type + id];

		if (type === 'touchstart') {
			obj.removeEventListener(this.POINTER_DOWN, handler, false);

		} else if (type === 'touchmove') {
			obj.removeEventListener(this.POINTER_MOVE, handler, false);

		} else if (type === 'touchend') {
			obj.removeEventListener(this.POINTER_UP, handler, false);
			obj.removeEventListener(this.POINTER_CANCEL, handler, false);
		}

		return this;
	},

	_addPointerStart: function (obj, handler, id) {
		var onDown = L.bind(function (e) {
			if (e.pointerType !== 'mouse' && e.pointerType !== e.MSPOINTER_TYPE_MOUSE) {
				L.DomEvent.preventDefault(e);
			}

			this._handlePointer(e, handler);
		}, this);

		obj['_leaflet_touchstart' + id] = onDown;
		obj.addEventListener(this.POINTER_DOWN, onDown, false);

		// need to keep track of what pointers and how many are active to provide e.touches emulation
		if (!this._pointerDocListener) {
			var pointerUp = L.bind(this._globalPointerUp, this);

			// we listen documentElement as any drags that end by moving the touch off the screen get fired there
			document.documentElement.addEventListener(this.POINTER_DOWN, L.bind(this._globalPointerDown, this), true);
			document.documentElement.addEventListener(this.POINTER_MOVE, L.bind(this._globalPointerMove, this), true);
			document.documentElement.addEventListener(this.POINTER_UP, pointerUp, true);
			document.documentElement.addEventListener(this.POINTER_CANCEL, pointerUp, true);

			this._pointerDocListener = true;
		}
	},

	_globalPointerDown: function (e) {
		this._pointers[e.pointerId] = e;
		this._pointersCount++;
	},

	_globalPointerMove: function (e) {
		if (this._pointers[e.pointerId]) {
			this._pointers[e.pointerId] = e;
		}
	},

	_globalPointerUp: function (e) {
		delete this._pointers[e.pointerId];
		this._pointersCount--;
	},

	_handlePointer: function (e, handler) {
		e.touches = [];
		for (var i in this._pointers) {
			e.touches.push(this._pointers[i]);
		}
		e.changedTouches = [e];

		handler(e);
	},

	_addPointerMove: function (obj, handler, id) {
		var onMove = L.bind(function (e) {
			// don't fire touch moves when mouse isn't down
			if ((e.pointerType === e.MSPOINTER_TYPE_MOUSE || e.pointerType === 'mouse') && e.buttons === 0) { return; }

			this._handlePointer(e, handler);
		}, this);

		obj['_leaflet_touchmove' + id] = onMove;
		obj.addEventListener(this.POINTER_MOVE, onMove, false);
	},

	_addPointerEnd: function (obj, handler, id) {
		var onUp = L.bind(function (e) {
			this._handlePointer(e, handler);
		}, this);

		obj['_leaflet_touchend' + id] = onUp;
		obj.addEventListener(this.POINTER_UP, onUp, false);
		obj.addEventListener(this.POINTER_CANCEL, onUp, false);
	}
});



/*
 * L.Handler.TouchZoom is used by L.Map to add pinch zoom on supported mobile browsers.
 */

L.Map.mergeOptions({
	touchZoom: L.Browser.touch && !L.Browser.android23,
	bounceAtZoomLimits: true
});

L.Map.TouchZoom = L.Handler.extend({
	addHooks: function () {
		L.DomEvent.on(this._map._container, 'touchstart', this._onTouchStart, this);
	},

	removeHooks: function () {
		L.DomEvent.off(this._map._container, 'touchstart', this._onTouchStart, this);
	},

	_onTouchStart: function (e) {
		var map = this._map;

		if (!e.touches || e.touches.length !== 2 || map._animatingZoom || this._zooming) { return; }

		var p1 = map.mouseEventToContainerPoint(e.touches[0]),
		    p2 = map.mouseEventToContainerPoint(e.touches[1]);

		this._centerPoint = map.getSize()._divideBy(2);
		this._startLatLng = map.containerPointToLatLng(this._centerPoint);
		if (map.options.touchZoom !== 'center') {
			this._pinchStartLatLng = map.containerPointToLatLng(p1.add(p2)._divideBy(2));
		}

		this._startDist = p1.distanceTo(p2);
		this._startZoom = map.getZoom();

		this._moved = false;
		this._zooming = true;

		map.stop();

		L.DomEvent
		    .on(document, 'touchmove', this._onTouchMove, this)
		    .on(document, 'touchend', this._onTouchEnd, this);

		L.DomEvent.preventDefault(e);
	},

	_onTouchMove: function (e) {
		if (!e.touches || e.touches.length !== 2 || !this._zooming) { return; }

		var map = this._map,
		    p1 = map.mouseEventToContainerPoint(e.touches[0]),
		    p2 = map.mouseEventToContainerPoint(e.touches[1]),
		    scale = p1.distanceTo(p2) / this._startDist;


		this._zoom = map.getScaleZoom(scale, this._startZoom);

		if (map.options.touchZoom === 'center') {
			this._center = this._startLatLng;
			if (scale === 1) { return; }
		} else {
			// Get delta from pinch to center, so centerLatLng is delta applied to initial pinchLatLng
			var delta = p1._add(p2)._divideBy(2)._subtract(this._centerPoint);
			if (scale === 1 && delta.x === 0 && delta.y === 0) { return; }
			this._center = map.unproject(map.project(this._pinchStartLatLng).subtract(delta));
		}

		if (!map.options.bounceAtZoomLimits) {
			if ((this._zoom <= map.getMinZoom() && scale < 1) ||
		        (this._zoom >= map.getMaxZoom() && scale > 1)) { return; }
		}

		if (!this._moved) {
			map._moveStart(true);
			this._moved = true;
		}

		L.Util.cancelAnimFrame(this._animRequest);

		var moveFn = L.bind(map._move, map, this._center, this._zoom, {pinch: true, round: false});
		this._animRequest = L.Util.requestAnimFrame(moveFn, this, true);

		L.DomEvent.preventDefault(e);
	},

	_onTouchEnd: function () {
		if (!this._moved || !this._zooming) {
			this._zooming = false;
			return;
		}

		this._zooming = false;
		L.Util.cancelAnimFrame(this._animRequest);

		L.DomEvent
		    .off(document, 'touchmove', this._onTouchMove)
		    .off(document, 'touchend', this._onTouchEnd);

		var zoom = this._zoom;
		zoom = this._map._limitZoom(zoom - this._startZoom > 0 ? Math.ceil(zoom) : Math.floor(zoom));


		this._map._animateZoom(this._center, zoom, true, true);
	}
});

L.Map.addInitHook('addHandler', 'touchZoom', L.Map.TouchZoom);



/*
 * L.Map.Tap is used to enable mobile hacks like quick taps and long hold.
 */

L.Map.mergeOptions({
	tap: true,
	tapTolerance: 15
});

L.Map.Tap = L.Handler.extend({
	addHooks: function () {
		L.DomEvent.on(this._map._container, 'touchstart', this._onDown, this);
	},

	removeHooks: function () {
		L.DomEvent.off(this._map._container, 'touchstart', this._onDown, this);
	},

	_onDown: function (e) {
		if (!e.touches) { return; }

		L.DomEvent.preventDefault(e);

		this._fireClick = true;

		// don't simulate click or track longpress if more than 1 touch
		if (e.touches.length > 1) {
			this._fireClick = false;
			clearTimeout(this._holdTimeout);
			return;
		}

		var first = e.touches[0],
		    el = first.target;

		this._startPos = this._newPos = new L.Point(first.clientX, first.clientY);

		// if touching a link, highlight it
		if (el.tagName && el.tagName.toLowerCase() === 'a') {
			L.DomUtil.addClass(el, 'leaflet-active');
		}

		// simulate long hold but setting a timeout
		this._holdTimeout = setTimeout(L.bind(function () {
			if (this._isTapValid()) {
				this._fireClick = false;
				this._onUp();
				this._simulateEvent('contextmenu', first);
			}
		}, this), 1000);

		this._simulateEvent('mousedown', first);

		L.DomEvent.on(document, {
			touchmove: this._onMove,
			touchend: this._onUp
		}, this);
	},

	_onUp: function (e) {
		clearTimeout(this._holdTimeout);

		L.DomEvent.off(document, {
			touchmove: this._onMove,
			touchend: this._onUp
		}, this);

		if (this._fireClick && e && e.changedTouches) {

			var first = e.changedTouches[0],
			    el = first.target;

			if (el && el.tagName && el.tagName.toLowerCase() === 'a') {
				L.DomUtil.removeClass(el, 'leaflet-active');
			}

			this._simulateEvent('mouseup', first);

			// simulate click if the touch didn't move too much
			if (this._isTapValid()) {
				this._simulateEvent('click', first);
			}
		}
	},

	_isTapValid: function () {
		return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
	},

	_onMove: function (e) {
		var first = e.touches[0];
		this._newPos = new L.Point(first.clientX, first.clientY);
		this._simulateEvent('mousemove', first);
	},

	_simulateEvent: function (type, e) {
		var simulatedEvent = document.createEvent('MouseEvents');

		simulatedEvent._simulated = true;
		e.target._simulatedClick = true;

		simulatedEvent.initMouseEvent(
		        type, true, true, window, 1,
		        e.screenX, e.screenY,
		        e.clientX, e.clientY,
		        false, false, false, false, 0, null);

		e.target.dispatchEvent(simulatedEvent);
	}
});

if (L.Browser.touch && !L.Browser.pointer) {
	L.Map.addInitHook('addHandler', 'tap', L.Map.Tap);
}



/*
 * L.Handler.ShiftDragZoom is used to add shift-drag zoom interaction to the map
  * (zoom to a selected bounding box), enabled by default.
 */

L.Map.mergeOptions({
	boxZoom: true
});

L.Map.BoxZoom = L.Handler.extend({
	initialize: function (map) {
		this._map = map;
		this._container = map._container;
		this._pane = map._panes.overlayPane;
	},

	addHooks: function () {
		L.DomEvent.on(this._container, 'mousedown', this._onMouseDown, this);
	},

	removeHooks: function () {
		L.DomEvent.off(this._container, 'mousedown', this._onMouseDown, this);
	},

	moved: function () {
		return this._moved;
	},

	_resetState: function () {
		this._moved = false;
	},

	_onMouseDown: function (e) {
		if (!e.shiftKey || ((e.which !== 1) && (e.button !== 1))) { return false; }

		this._resetState();

		L.DomUtil.disableTextSelection();
		L.DomUtil.disableImageDrag();

		this._startPoint = this._map.mouseEventToContainerPoint(e);

		L.DomEvent.on(document, {
			contextmenu: L.DomEvent.stop,
			mousemove: this._onMouseMove,
			mouseup: this._onMouseUp,
			keydown: this._onKeyDown
		}, this);
	},

	_onMouseMove: function (e) {
		if (!this._moved) {
			this._moved = true;

			this._box = L.DomUtil.create('div', 'leaflet-zoom-box', this._container);
			L.DomUtil.addClass(this._container, 'leaflet-crosshair');

			this._map.fire('boxzoomstart');
		}

		this._point = this._map.mouseEventToContainerPoint(e);

		var bounds = new L.Bounds(this._point, this._startPoint),
		    size = bounds.getSize();

		L.DomUtil.setPosition(this._box, bounds.min);

		this._box.style.width  = size.x + 'px';
		this._box.style.height = size.y + 'px';
	},

	_finish: function () {
		if (this._moved) {
			L.DomUtil.remove(this._box);
			L.DomUtil.removeClass(this._container, 'leaflet-crosshair');
		}

		L.DomUtil.enableTextSelection();
		L.DomUtil.enableImageDrag();

		L.DomEvent.off(document, {
			contextmenu: L.DomEvent.stop,
			mousemove: this._onMouseMove,
			mouseup: this._onMouseUp,
			keydown: this._onKeyDown
		}, this);
	},

	_onMouseUp: function (e) {
		if ((e.which !== 1) && (e.button !== 1)) { return; }

		this._finish();

		if (!this._moved) { return; }
		// Postpone to next JS tick so internal click event handling
		// still see it as "moved".
		setTimeout(L.bind(this._resetState, this), 0);

		var bounds = new L.LatLngBounds(
		        this._map.containerPointToLatLng(this._startPoint),
		        this._map.containerPointToLatLng(this._point));

		this._map
			.fitBounds(bounds)
			.fire('boxzoomend', {boxZoomBounds: bounds});
	},

	_onKeyDown: function (e) {
		if (e.keyCode === 27) {
			this._finish();
		}
	}
});

L.Map.addInitHook('addHandler', 'boxZoom', L.Map.BoxZoom);



/*
 * L.Map.Keyboard is handling keyboard interaction with the map, enabled by default.
 */

L.Map.mergeOptions({
	keyboard: true,
	keyboardPanOffset: 80,
	keyboardZoomOffset: 1
});

L.Map.Keyboard = L.Handler.extend({

	keyCodes: {
		left:    [37],
		right:   [39],
		down:    [40],
		up:      [38],
		zoomIn:  [187, 107, 61, 171],
		zoomOut: [189, 109, 54, 173]
	},

	initialize: function (map) {
		this._map = map;

		this._setPanOffset(map.options.keyboardPanOffset);
		this._setZoomOffset(map.options.keyboardZoomOffset);
	},

	addHooks: function () {
		var container = this._map._container;

		// make the container focusable by tabbing
		if (container.tabIndex <= 0) {
			container.tabIndex = '0';
		}

		L.DomEvent.on(container, {
			focus: this._onFocus,
			blur: this._onBlur,
			mousedown: this._onMouseDown
		}, this);

		this._map.on({
			focus: this._addHooks,
			blur: this._removeHooks
		}, this);
	},

	removeHooks: function () {
		this._removeHooks();

		L.DomEvent.off(this._map._container, {
			focus: this._onFocus,
			blur: this._onBlur,
			mousedown: this._onMouseDown
		}, this);

		this._map.off({
			focus: this._addHooks,
			blur: this._removeHooks
		}, this);
	},

	_onMouseDown: function () {
		if (this._focused) { return; }

		var body = document.body,
		    docEl = document.documentElement,
		    top = body.scrollTop || docEl.scrollTop,
		    left = body.scrollLeft || docEl.scrollLeft;

		this._map._container.focus();

		window.scrollTo(left, top);
	},

	_onFocus: function () {
		this._focused = true;
		this._map.fire('focus');
	},

	_onBlur: function () {
		this._focused = false;
		this._map.fire('blur');
	},

	_setPanOffset: function (pan) {
		var keys = this._panKeys = {},
		    codes = this.keyCodes,
		    i, len;

		for (i = 0, len = codes.left.length; i < len; i++) {
			keys[codes.left[i]] = [-1 * pan, 0];
		}
		for (i = 0, len = codes.right.length; i < len; i++) {
			keys[codes.right[i]] = [pan, 0];
		}
		for (i = 0, len = codes.down.length; i < len; i++) {
			keys[codes.down[i]] = [0, pan];
		}
		for (i = 0, len = codes.up.length; i < len; i++) {
			keys[codes.up[i]] = [0, -1 * pan];
		}
	},

	_setZoomOffset: function (zoom) {
		var keys = this._zoomKeys = {},
		    codes = this.keyCodes,
		    i, len;

		for (i = 0, len = codes.zoomIn.length; i < len; i++) {
			keys[codes.zoomIn[i]] = zoom;
		}
		for (i = 0, len = codes.zoomOut.length; i < len; i++) {
			keys[codes.zoomOut[i]] = -zoom;
		}
	},

	_addHooks: function () {
		L.DomEvent.on(document, 'keydown', this._onKeyDown, this);
	},

	_removeHooks: function () {
		L.DomEvent.off(document, 'keydown', this._onKeyDown, this);
	},

	_onKeyDown: function (e) {
		if (e.altKey || e.ctrlKey || e.metaKey) { return; }

		var key = e.keyCode,
		    map = this._map,
		    offset;

		if (key in this._panKeys) {

			if (map._panAnim && map._panAnim._inProgress) { return; }

			offset = this._panKeys[key];
			if (e.shiftKey) {
				offset = L.point(offset).multiplyBy(3);
			}

			map.panBy(offset);

			if (map.options.maxBounds) {
				map.panInsideBounds(map.options.maxBounds);
			}

		} else if (key in this._zoomKeys) {
			map.setZoom(map.getZoom() + (e.shiftKey ? 3 : 1) * this._zoomKeys[key]);

		} else if (key === 27) {
			map.closePopup();

		} else {
			return;
		}

		L.DomEvent.stop(e);
	}
});

L.Map.addInitHook('addHandler', 'keyboard', L.Map.Keyboard);



/*
 * L.Handler.MarkerDrag is used internally by L.Marker to make the markers draggable.
 */

L.Handler.MarkerDrag = L.Handler.extend({
	initialize: function (marker) {
		this._marker = marker;
	},

	addHooks: function () {
		var icon = this._marker._icon;

		if (!this._draggable) {
			this._draggable = new L.Draggable(icon, icon, true);
		}

		this._draggable.on({
			dragstart: this._onDragStart,
			drag: this._onDrag,
			dragend: this._onDragEnd
		}, this).enable();

		L.DomUtil.addClass(icon, 'leaflet-marker-draggable');
	},

	removeHooks: function () {
		this._draggable.off({
			dragstart: this._onDragStart,
			drag: this._onDrag,
			dragend: this._onDragEnd
		}, this).disable();

		if (this._marker._icon) {
			L.DomUtil.removeClass(this._marker._icon, 'leaflet-marker-draggable');
		}
	},

	moved: function () {
		return this._draggable && this._draggable._moved;
	},

	_onDragStart: function () {
		this._marker
		    .closePopup()
		    .fire('movestart')
		    .fire('dragstart');
	},

	_onDrag: function (e) {
		var marker = this._marker,
		    shadow = marker._shadow,
		    iconPos = L.DomUtil.getPosition(marker._icon),
		    latlng = marker._map.layerPointToLatLng(iconPos);

		// update shadow position
		if (shadow) {
			L.DomUtil.setPosition(shadow, iconPos);
		}

		marker._latlng = latlng;
		e.latlng = latlng;

		marker
		    .fire('move', e)
		    .fire('drag', e);
	},

	_onDragEnd: function (e) {
		this._marker
		    .fire('moveend')
		    .fire('dragend', e);
	}
});



/*
 * L.Control is a base class for implementing map controls. Handles positioning.
 * All other controls extend from this class.
 */

L.Control = L.Class.extend({
	options: {
		position: 'topright'
	},

	initialize: function (options) {
		L.setOptions(this, options);
	},

	getPosition: function () {
		return this.options.position;
	},

	setPosition: function (position) {
		var map = this._map;

		if (map) {
			map.removeControl(this);
		}

		this.options.position = position;

		if (map) {
			map.addControl(this);
		}

		return this;
	},

	getContainer: function () {
		return this._container;
	},

	addTo: function (map) {
		this.remove();
		this._map = map;

		var container = this._container = this.onAdd(map),
		    pos = this.getPosition(),
		    corner = map._controlCorners[pos];

		L.DomUtil.addClass(container, 'leaflet-control');

		if (pos.indexOf('bottom') !== -1) {
			corner.insertBefore(container, corner.firstChild);
		} else {
			corner.appendChild(container);
		}

		return this;
	},

	remove: function () {
		if (!this._map) {
			return this;
		}

		L.DomUtil.remove(this._container);

		if (this.onRemove) {
			this.onRemove(this._map);
		}

		this._map = null;

		return this;
	},

	_refocusOnMap: function (e) {
		// if map exists and event is not a keyboard event
		if (this._map && e && e.screenX > 0 && e.screenY > 0) {
			this._map.getContainer().focus();
		}
	}
});

L.control = function (options) {
	return new L.Control(options);
};


// adds control-related methods to L.Map

L.Map.include({
	addControl: function (control) {
		control.addTo(this);
		return this;
	},

	removeControl: function (control) {
		control.remove();
		return this;
	},

	_initControlPos: function () {
		var corners = this._controlCorners = {},
		    l = 'leaflet-',
		    container = this._controlContainer =
		            L.DomUtil.create('div', l + 'control-container', this._container);

		function createCorner(vSide, hSide) {
			var className = l + vSide + ' ' + l + hSide;

			corners[vSide + hSide] = L.DomUtil.create('div', className, container);
		}

		createCorner('top', 'left');
		createCorner('top', 'right');
		createCorner('bottom', 'left');
		createCorner('bottom', 'right');
	},

	_clearControlPos: function () {
		L.DomUtil.remove(this._controlContainer);
	}
});



/*
 * L.Control.Zoom is used for the default zoom buttons on the map.
 */

L.Control.Zoom = L.Control.extend({
	options: {
		position: 'topleft',
		zoomInText: '+',
		zoomInTitle: 'Zoom in',
		zoomOutText: '-',
		zoomOutTitle: 'Zoom out'
	},

	onAdd: function (map) {
		var zoomName = 'leaflet-control-zoom',
		    container = L.DomUtil.create('div', zoomName + ' leaflet-bar'),
		    options = this.options;

		this._zoomInButton  = this._createButton(options.zoomInText, options.zoomInTitle,
		        zoomName + '-in',  container, this._zoomIn);
		this._zoomOutButton = this._createButton(options.zoomOutText, options.zoomOutTitle,
		        zoomName + '-out', container, this._zoomOut);

		this._updateDisabled();
		map.on('zoomend zoomlevelschange', this._updateDisabled, this);

		return container;
	},

	onRemove: function (map) {
		map.off('zoomend zoomlevelschange', this._updateDisabled, this);
	},

	disable: function () {
		this._disabled = true;
		this._updateDisabled();
		return this;
	},

	enable: function () {
		this._disabled = false;
		this._updateDisabled();
		return this;
	},

	_zoomIn: function (e) {
		if (!this._disabled) {
			this._map.zoomIn(e.shiftKey ? 3 : 1);
		}
	},

	_zoomOut: function (e) {
		if (!this._disabled) {
			this._map.zoomOut(e.shiftKey ? 3 : 1);
		}
	},

	_createButton: function (html, title, className, container, fn) {
		var link = L.DomUtil.create('a', className, container);
		link.innerHTML = html;
		link.href = '#';
		link.title = title;

		L.DomEvent
		    .on(link, 'mousedown dblclick', L.DomEvent.stopPropagation)
		    .on(link, 'click', L.DomEvent.stop)
		    .on(link, 'click', fn, this)
		    .on(link, 'click', this._refocusOnMap, this);

		return link;
	},

	_updateDisabled: function () {
		var map = this._map,
		    className = 'leaflet-disabled';

		L.DomUtil.removeClass(this._zoomInButton, className);
		L.DomUtil.removeClass(this._zoomOutButton, className);

		if (this._disabled || map._zoom === map.getMinZoom()) {
			L.DomUtil.addClass(this._zoomOutButton, className);
		}
		if (this._disabled || map._zoom === map.getMaxZoom()) {
			L.DomUtil.addClass(this._zoomInButton, className);
		}
	}
});

L.Map.mergeOptions({
	zoomControl: true
});

L.Map.addInitHook(function () {
	if (this.options.zoomControl) {
		this.zoomControl = new L.Control.Zoom();
		this.addControl(this.zoomControl);
	}
});

L.control.zoom = function (options) {
	return new L.Control.Zoom(options);
};



/*
 * L.Control.Attribution is used for displaying attribution on the map (added by default).
 */

L.Control.Attribution = L.Control.extend({
	options: {
		position: 'bottomright',
		prefix: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
	},

	initialize: function (options) {
		L.setOptions(this, options);

		this._attributions = {};
	},

	onAdd: function (map) {
		this._container = L.DomUtil.create('div', 'leaflet-control-attribution');
		if (L.DomEvent) {
			L.DomEvent.disableClickPropagation(this._container);
		}

		// TODO ugly, refactor
		for (var i in map._layers) {
			if (map._layers[i].getAttribution) {
				this.addAttribution(map._layers[i].getAttribution());
			}
		}

		this._update();

		return this._container;
	},

	setPrefix: function (prefix) {
		this.options.prefix = prefix;
		this._update();
		return this;
	},

	addAttribution: function (text) {
		if (!text) { return this; }

		if (!this._attributions[text]) {
			this._attributions[text] = 0;
		}
		this._attributions[text]++;

		this._update();

		return this;
	},

	removeAttribution: function (text) {
		if (!text) { return this; }

		if (this._attributions[text]) {
			this._attributions[text]--;
			this._update();
		}

		return this;
	},

	_update: function () {
		if (!this._map) { return; }

		var attribs = [];

		for (var i in this._attributions) {
			if (this._attributions[i]) {
				attribs.push(i);
			}
		}

		var prefixAndAttribs = [];

		if (this.options.prefix) {
			prefixAndAttribs.push(this.options.prefix);
		}
		if (attribs.length) {
			prefixAndAttribs.push(attribs.join(', '));
		}

		this._container.innerHTML = prefixAndAttribs.join(' | ');
	}
});

L.Map.mergeOptions({
	attributionControl: true
});

L.Map.addInitHook(function () {
	if (this.options.attributionControl) {
		this.attributionControl = (new L.Control.Attribution()).addTo(this);
	}
});

L.control.attribution = function (options) {
	return new L.Control.Attribution(options);
};



/*
 * L.Control.Scale is used for displaying metric/imperial scale on the map.
 */

L.Control.Scale = L.Control.extend({
	options: {
		position: 'bottomleft',
		maxWidth: 100,
		metric: true,
		imperial: true
		// updateWhenIdle: false
	},

	onAdd: function (map) {
		var className = 'leaflet-control-scale',
		    container = L.DomUtil.create('div', className),
		    options = this.options;

		this._addScales(options, className + '-line', container);

		map.on(options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
		map.whenReady(this._update, this);

		return container;
	},

	onRemove: function (map) {
		map.off(this.options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
	},

	_addScales: function (options, className, container) {
		if (options.metric) {
			this._mScale = L.DomUtil.create('div', className, container);
		}
		if (options.imperial) {
			this._iScale = L.DomUtil.create('div', className, container);
		}
	},

	_update: function () {
		var map = this._map,
		    y = map.getSize().y / 2;

		var maxMeters = map.distance(
				map.containerPointToLatLng([0, y]),
				map.containerPointToLatLng([this.options.maxWidth, y]));

		this._updateScales(maxMeters);
	},

	_updateScales: function (maxMeters) {
		if (this.options.metric && maxMeters) {
			this._updateMetric(maxMeters);
		}
		if (this.options.imperial && maxMeters) {
			this._updateImperial(maxMeters);
		}
	},

	_updateMetric: function (maxMeters) {
		var meters = this._getRoundNum(maxMeters),
		    label = meters < 1000 ? meters + ' m' : (meters / 1000) + ' km';

		this._updateScale(this._mScale, label, meters / maxMeters);
	},

	_updateImperial: function (maxMeters) {
		var maxFeet = maxMeters * 3.2808399,
		    maxMiles, miles, feet;

		if (maxFeet > 5280) {
			maxMiles = maxFeet / 5280;
			miles = this._getRoundNum(maxMiles);
			this._updateScale(this._iScale, miles + ' mi', miles / maxMiles);

		} else {
			feet = this._getRoundNum(maxFeet);
			this._updateScale(this._iScale, feet + ' ft', feet / maxFeet);
		}
	},

	_updateScale: function (scale, text, ratio) {
		scale.style.width = Math.round(this.options.maxWidth * ratio) + 'px';
		scale.innerHTML = text;
	},

	_getRoundNum: function (num) {
		var pow10 = Math.pow(10, (Math.floor(num) + '').length - 1),
		    d = num / pow10;

		d = d >= 10 ? 10 :
		    d >= 5 ? 5 :
		    d >= 3 ? 3 :
		    d >= 2 ? 2 : 1;

		return pow10 * d;
	}
});

L.control.scale = function (options) {
	return new L.Control.Scale(options);
};



/*
 * L.Control.Layers is a control to allow users to switch between different layers on the map.
 */

L.Control.Layers = L.Control.extend({
	options: {
		collapsed: true,
		position: 'topright',
		autoZIndex: true,
		hideSingleBase: false
	},

	initialize: function (baseLayers, overlays, options) {
		L.setOptions(this, options);

		this._layers = {};
		this._lastZIndex = 0;
		this._handlingClick = false;

		for (var i in baseLayers) {
			this._addLayer(baseLayers[i], i);
		}

		for (i in overlays) {
			this._addLayer(overlays[i], i, true);
		}
	},

	onAdd: function (map) {
		this._initLayout();
		this._update();

		this._map = map;
		map.on('zoomend', this._checkDisabledLayers, this);

		return this._container;
	},

	onRemove: function () {
		this._map.off('zoomend', this._checkDisabledLayers, this);
	},

	addBaseLayer: function (layer, name) {
		this._addLayer(layer, name);
		return this._update();
	},

	addOverlay: function (layer, name) {
		this._addLayer(layer, name, true);
		return this._update();
	},

	removeLayer: function (layer) {
		layer.off('add remove', this._onLayerChange, this);

		delete this._layers[L.stamp(layer)];
		return this._update();
	},

	_initLayout: function () {
		var className = 'leaflet-control-layers',
		    container = this._container = L.DomUtil.create('div', className);

		// makes this work on IE touch devices by stopping it from firing a mouseout event when the touch is released
		container.setAttribute('aria-haspopup', true);

		L.DomEvent.disableClickPropagation(container);
		if (!L.Browser.touch) {
			L.DomEvent.disableScrollPropagation(container);
		}

		var form = this._form = L.DomUtil.create('form', className + '-list');

		if (this.options.collapsed) {
			if (!L.Browser.android) {
				L.DomEvent.on(container, {
					mouseenter: this._expand,
					mouseleave: this._collapse
				}, this);
			}

			var link = this._layersLink = L.DomUtil.create('a', className + '-toggle', container);
			link.href = '#';
			link.title = 'Layers';

			if (L.Browser.touch) {
				L.DomEvent
				    .on(link, 'click', L.DomEvent.stop)
				    .on(link, 'click', this._expand, this);
			} else {
				L.DomEvent.on(link, 'focus', this._expand, this);
			}

			// work around for Firefox Android issue https://github.com/Leaflet/Leaflet/issues/2033
			L.DomEvent.on(form, 'click', function () {
				setTimeout(L.bind(this._onInputClick, this), 0);
			}, this);

			this._map.on('click', this._collapse, this);
			// TODO keyboard accessibility
		} else {
			this._expand();
		}

		this._baseLayersList = L.DomUtil.create('div', className + '-base', form);
		this._separator = L.DomUtil.create('div', className + '-separator', form);
		this._overlaysList = L.DomUtil.create('div', className + '-overlays', form);

		container.appendChild(form);
	},

	_addLayer: function (layer, name, overlay) {
		layer.on('add remove', this._onLayerChange, this);

		var id = L.stamp(layer);

		this._layers[id] = {
			layer: layer,
			name: name,
			overlay: overlay
		};

		if (this.options.autoZIndex && layer.setZIndex) {
			this._lastZIndex++;
			layer.setZIndex(this._lastZIndex);
		}
	},

	_update: function () {
		if (!this._container) { return this; }

		L.DomUtil.empty(this._baseLayersList);
		L.DomUtil.empty(this._overlaysList);

		var baseLayersPresent, overlaysPresent, i, obj, baseLayersCount = 0;

		for (i in this._layers) {
			obj = this._layers[i];
			this._addItem(obj);
			overlaysPresent = overlaysPresent || obj.overlay;
			baseLayersPresent = baseLayersPresent || !obj.overlay;
			baseLayersCount += !obj.overlay ? 1 : 0;
		}

		// Hide base layers section if there's only one layer.
		if (this.options.hideSingleBase) {
			baseLayersPresent = baseLayersPresent && baseLayersCount > 1;
			this._baseLayersList.style.display = baseLayersPresent ? '' : 'none';
		}

		this._separator.style.display = overlaysPresent && baseLayersPresent ? '' : 'none';

		return this;
	},

	_onLayerChange: function (e) {
		if (!this._handlingClick) {
			this._update();
		}

		var obj = this._layers[L.stamp(e.target)];

		var type = obj.overlay ?
			(e.type === 'add' ? 'overlayadd' : 'overlayremove') :
			(e.type === 'add' ? 'baselayerchange' : null);

		if (type) {
			this._map.fire(type, obj);
		}
	},

	// IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see http://bit.ly/PqYLBe)
	_createRadioElement: function (name, checked) {

		var radioHtml = '<input type="radio" class="leaflet-control-layers-selector" name="' +
				name + '"' + (checked ? ' checked="checked"' : '') + '/>';

		var radioFragment = document.createElement('div');
		radioFragment.innerHTML = radioHtml;

		return radioFragment.firstChild;
	},

	_addItem: function (obj) {
		var label = document.createElement('label'),
		    checked = this._map.hasLayer(obj.layer),
		    input;

		if (obj.overlay) {
			input = document.createElement('input');
			input.type = 'checkbox';
			input.className = 'leaflet-control-layers-selector';
			input.defaultChecked = checked;
		} else {
			input = this._createRadioElement('leaflet-base-layers', checked);
		}

		input.layerId = L.stamp(obj.layer);

		L.DomEvent.on(input, 'click', this._onInputClick, this);

		var name = document.createElement('span');
		name.innerHTML = ' ' + obj.name;

		// Helps from preventing layer control flicker when checkboxes are disabled
		// https://github.com/Leaflet/Leaflet/issues/2771
		var holder = document.createElement('div');

		label.appendChild(holder);
		holder.appendChild(input);
		holder.appendChild(name);

		var container = obj.overlay ? this._overlaysList : this._baseLayersList;
		container.appendChild(label);

		this._checkDisabledLayers();
		return label;
	},

	_onInputClick: function () {
		var inputs = this._form.getElementsByTagName('input'),
		    input, layer, hasLayer;
		var addedLayers = [],
		    removedLayers = [];

		this._handlingClick = true;

		for (var i = inputs.length - 1; i >= 0; i--) {
			input = inputs[i];
			layer = this._layers[input.layerId].layer;
			hasLayer = this._map.hasLayer(layer);

			if (input.checked && !hasLayer) {
				addedLayers.push(layer);

			} else if (!input.checked && hasLayer) {
				removedLayers.push(layer);
			}
		}

		// Bugfix issue 2318: Should remove all old layers before readding new ones
		for (i = 0; i < removedLayers.length; i++) {
			this._map.removeLayer(removedLayers[i]);
		}
		for (i = 0; i < addedLayers.length; i++) {
			this._map.addLayer(addedLayers[i]);
		}

		this._handlingClick = false;

		this._refocusOnMap();
	},

	_expand: function () {
		L.DomUtil.addClass(this._container, 'leaflet-control-layers-expanded');
		this._form.style.height = null;
		var acceptableHeight = this._map._size.y - (this._container.offsetTop + 50);
		if (acceptableHeight < this._form.clientHeight) {
			L.DomUtil.addClass(this._form, 'leaflet-control-layers-scrollbar');
			this._form.style.height = acceptableHeight + 'px';
		} else {
			L.DomUtil.removeClass(this._form, 'leaflet-control-layers-scrollbar');
		}
		this._checkDisabledLayers();
	},

	_collapse: function () {
		L.DomUtil.removeClass(this._container, 'leaflet-control-layers-expanded');
	},

	_checkDisabledLayers: function () {
		var inputs = this._form.getElementsByTagName('input'),
		    input,
		    layer,
		    zoom = this._map.getZoom();

		for (var i = inputs.length - 1; i >= 0; i--) {
			input = inputs[i];
			layer = this._layers[input.layerId].layer;
			input.disabled = (layer.options.minZoom !== undefined && zoom < layer.options.minZoom) ||
			                 (layer.options.maxZoom !== undefined && zoom > layer.options.maxZoom);

		}
	}
});

L.control.layers = function (baseLayers, overlays, options) {
	return new L.Control.Layers(baseLayers, overlays, options);
};



/*
 * L.PosAnimation powers Leaflet pan animations internally.
 */

L.PosAnimation = L.Evented.extend({

	run: function (el, newPos, duration, easeLinearity) { // (HTMLElement, Point[, Number, Number])
		this.stop();

		this._el = el;
		this._inProgress = true;
		this._duration = duration || 0.25;
		this._easeOutPower = 1 / Math.max(easeLinearity || 0.5, 0.2);

		this._startPos = L.DomUtil.getPosition(el);
		this._offset = newPos.subtract(this._startPos);
		this._startTime = +new Date();

		this.fire('start');

		this._animate();
	},

	stop: function () {
		if (!this._inProgress) { return; }

		this._step(true);
		this._complete();
	},

	_animate: function () {
		// animation loop
		this._animId = L.Util.requestAnimFrame(this._animate, this);
		this._step();
	},

	_step: function (round) {
		var elapsed = (+new Date()) - this._startTime,
		    duration = this._duration * 1000;

		if (elapsed < duration) {
			this._runFrame(this._easeOut(elapsed / duration), round);
		} else {
			this._runFrame(1);
			this._complete();
		}
	},

	_runFrame: function (progress, round) {
		var pos = this._startPos.add(this._offset.multiplyBy(progress));
		if (round) {
			pos._round();
		}
		L.DomUtil.setPosition(this._el, pos);

		this.fire('step');
	},

	_complete: function () {
		L.Util.cancelAnimFrame(this._animId);

		this._inProgress = false;
		this.fire('end');
	},

	_easeOut: function (t) {
		return 1 - Math.pow(1 - t, this._easeOutPower);
	}
});



/*
 * Extends L.Map to handle panning animations.
 */

L.Map.include({

	setView: function (center, zoom, options) {

		zoom = zoom === undefined ? this._zoom : this._limitZoom(zoom);
		center = this._limitCenter(L.latLng(center), zoom, this.options.maxBounds);
		options = options || {};

		this.stop();

		if (this._loaded && !options.reset && options !== true) {

			if (options.animate !== undefined) {
				options.zoom = L.extend({animate: options.animate}, options.zoom);
				options.pan = L.extend({animate: options.animate, duration: options.duration}, options.pan);
			}

			// try animating pan or zoom
			var moved = (this._zoom !== zoom) ?
				this._tryAnimatedZoom && this._tryAnimatedZoom(center, zoom, options.zoom) :
				this._tryAnimatedPan(center, options.pan);

			if (moved) {
				// prevent resize handler call, the view will refresh after animation anyway
				clearTimeout(this._sizeTimer);
				return this;
			}
		}

		// animation didn't start, just reset the map view
		this._resetView(center, zoom);

		return this;
	},

	panBy: function (offset, options) {
		offset = L.point(offset).round();
		options = options || {};

		if (!offset.x && !offset.y) {
			return this.fire('moveend');
		}
		// If we pan too far, Chrome gets issues with tiles
		// and makes them disappear or appear in the wrong place (slightly offset) #2602
		if (options.animate !== true && !this.getSize().contains(offset)) {
			this._resetView(this.unproject(this.project(this.getCenter()).add(offset)), this.getZoom());
			return this;
		}

		if (!this._panAnim) {
			this._panAnim = new L.PosAnimation();

			this._panAnim.on({
				'step': this._onPanTransitionStep,
				'end': this._onPanTransitionEnd
			}, this);
		}

		// don't fire movestart if animating inertia
		if (!options.noMoveStart) {
			this.fire('movestart');
		}

		// animate pan unless animate: false specified
		if (options.animate !== false) {
			L.DomUtil.addClass(this._mapPane, 'leaflet-pan-anim');

			var newPos = this._getMapPanePos().subtract(offset);
			this._panAnim.run(this._mapPane, newPos, options.duration || 0.25, options.easeLinearity);
		} else {
			this._rawPanBy(offset);
			this.fire('move').fire('moveend');
		}

		return this;
	},

	_onPanTransitionStep: function () {
		this.fire('move');
	},

	_onPanTransitionEnd: function () {
		L.DomUtil.removeClass(this._mapPane, 'leaflet-pan-anim');
		this.fire('moveend');
	},

	_tryAnimatedPan: function (center, options) {
		// difference between the new and current centers in pixels
		var offset = this._getCenterOffset(center)._floor();

		// don't animate too far unless animate: true specified in options
		if ((options && options.animate) !== true && !this.getSize().contains(offset)) { return false; }

		this.panBy(offset, options);

		return true;
	}
});



/*
 * Extends L.Map to handle zoom animations.
 */

L.Map.mergeOptions({
	zoomAnimation: true,
	zoomAnimationThreshold: 4
});

var zoomAnimated = L.DomUtil.TRANSITION && L.Browser.any3d && !L.Browser.mobileOpera;

if (zoomAnimated) {

	L.Map.addInitHook(function () {
		// don't animate on browsers without hardware-accelerated transitions or old Android/Opera
		this._zoomAnimated = this.options.zoomAnimation;

		// zoom transitions run with the same duration for all layers, so if one of transitionend events
		// happens after starting zoom animation (propagating to the map pane), we know that it ended globally
		if (this._zoomAnimated) {

			this._createAnimProxy();

			L.DomEvent.on(this._proxy, L.DomUtil.TRANSITION_END, this._catchTransitionEnd, this);
		}
	});
}

L.Map.include(!zoomAnimated ? {} : {

	_createAnimProxy: function () {

		var proxy = this._proxy = L.DomUtil.create('div', 'leaflet-proxy leaflet-zoom-animated');
		this._panes.mapPane.appendChild(proxy);

		this.on('zoomanim', function (e) {
			var prop = L.DomUtil.TRANSFORM,
			    transform = proxy.style[prop];

			L.DomUtil.setTransform(proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1));

			// workaround for case when transform is the same and so transitionend event is not fired
			if (transform === proxy.style[prop] && this._animatingZoom) {
				this._onZoomTransitionEnd();
			}
		}, this);

		this.on('load moveend', function () {
			var c = this.getCenter(),
			    z = this.getZoom();
			L.DomUtil.setTransform(proxy, this.project(c, z), this.getZoomScale(z, 1));
		}, this);
	},

	_catchTransitionEnd: function (e) {
		if (this._animatingZoom && e.propertyName.indexOf('transform') >= 0) {
			this._onZoomTransitionEnd();
		}
	},

	_nothingToAnimate: function () {
		return !this._container.getElementsByClassName('leaflet-zoom-animated').length;
	},

	_tryAnimatedZoom: function (center, zoom, options) {

		if (this._animatingZoom) { return true; }

		options = options || {};

		// don't animate if disabled, not supported or zoom difference is too large
		if (!this._zoomAnimated || options.animate === false || this._nothingToAnimate() ||
		        Math.abs(zoom - this._zoom) > this.options.zoomAnimationThreshold) { return false; }

		// offset is the pixel coords of the zoom origin relative to the current center
		var scale = this.getZoomScale(zoom),
		    offset = this._getCenterOffset(center)._divideBy(1 - 1 / scale);

		// don't animate if the zoom origin isn't within one screen from the current center, unless forced
		if (options.animate !== true && !this.getSize().contains(offset)) { return false; }

		L.Util.requestAnimFrame(function () {
			this
			    ._moveStart(true)
			    ._animateZoom(center, zoom, true);
		}, this);

		return true;
	},

	_animateZoom: function (center, zoom, startAnim, noUpdate) {
		if (startAnim) {
			this._animatingZoom = true;

			// remember what center/zoom to set after animation
			this._animateToCenter = center;
			this._animateToZoom = zoom;

			L.DomUtil.addClass(this._mapPane, 'leaflet-zoom-anim');
		}

		this.fire('zoomanim', {
			center: center,
			zoom: zoom,
			noUpdate: noUpdate
		});

		// Work around webkit not firing 'transitionend', see https://github.com/Leaflet/Leaflet/issues/3689, 2693
		setTimeout(L.bind(this._onZoomTransitionEnd, this), 250);
	},

	_onZoomTransitionEnd: function () {
		if (!this._animatingZoom) { return; }

		L.DomUtil.removeClass(this._mapPane, 'leaflet-zoom-anim');

		// This anim frame should prevent an obscure iOS webkit tile loading race condition.
		L.Util.requestAnimFrame(function () {
			this._animatingZoom = false;

			this
				._move(this._animateToCenter, this._animateToZoom)
				._moveEnd(true);
		}, this);
	}
});




L.Map.include({
	flyTo: function (targetCenter, targetZoom, options) {

		options = options || {};
		if (options.animate === false || !L.Browser.any3d) {
			return this.setView(targetCenter, targetZoom, options);
		}

		this.stop();

		var from = this.project(this.getCenter()),
		    to = this.project(targetCenter),
		    size = this.getSize(),
		    startZoom = this._zoom;

		targetCenter = L.latLng(targetCenter);
		targetZoom = targetZoom === undefined ? startZoom : targetZoom;

		var w0 = Math.max(size.x, size.y),
		    w1 = w0 * this.getZoomScale(startZoom, targetZoom),
		    u1 = (to.distanceTo(from)) || 1,
		    rho = 1.42,
		    rho2 = rho * rho;

		function r(i) {
			var b = (w1 * w1 - w0 * w0 + (i ? -1 : 1) * rho2 * rho2 * u1 * u1) / (2 * (i ? w1 : w0) * rho2 * u1);
			return Math.log(Math.sqrt(b * b + 1) - b);
		}

		function sinh(n) { return (Math.exp(n) - Math.exp(-n)) / 2; }
		function cosh(n) { return (Math.exp(n) + Math.exp(-n)) / 2; }
		function tanh(n) { return sinh(n) / cosh(n); }

		var r0 = r(0);

		function w(s) { return w0 * (cosh(r0) / cosh(r0 + rho * s)); }
		function u(s) { return w0 * (cosh(r0) * tanh(r0 + rho * s) - sinh(r0)) / rho2; }

		function easeOut(t) { return 1 - Math.pow(1 - t, 1.5); }

		var start = Date.now(),
		    S = (r(1) - r0) / rho,
		    duration = options.duration ? 1000 * options.duration : 1000 * S * 0.8;

		function frame() {
			var t = (Date.now() - start) / duration,
			    s = easeOut(t) * S;

			if (t <= 1) {
				this._flyToFrame = L.Util.requestAnimFrame(frame, this);

				this._move(
					this.unproject(from.add(to.subtract(from).multiplyBy(u(s) / u1)), startZoom),
					this.getScaleZoom(w0 / w(s), startZoom),
					{flyTo: true});

			} else {
				this
					._move(targetCenter, targetZoom)
					._moveEnd(true);
			}
		}

		this._moveStart(true);

		frame.call(this);
		return this;
	},

	flyToBounds: function (bounds, options) {
		var target = this._getBoundsCenterZoom(bounds, options);
		return this.flyTo(target.center, target.zoom, options);
	}
});



/*
 * Provides L.Map with convenient shortcuts for using browser geolocation features.
 */

L.Map.include({
	_defaultLocateOptions: {
		timeout: 10000,
		watch: false
		// setView: false
		// maxZoom: <Number>
		// maximumAge: 0
		// enableHighAccuracy: false
	},

	locate: function (options) {

		options = this._locateOptions = L.extend({}, this._defaultLocateOptions, options);

		if (!('geolocation' in navigator)) {
			this._handleGeolocationError({
				code: 0,
				message: 'Geolocation not supported.'
			});
			return this;
		}

		var onResponse = L.bind(this._handleGeolocationResponse, this),
		    onError = L.bind(this._handleGeolocationError, this);

		if (options.watch) {
			this._locationWatchId =
			        navigator.geolocation.watchPosition(onResponse, onError, options);
		} else {
			navigator.geolocation.getCurrentPosition(onResponse, onError, options);
		}
		return this;
	},

	stopLocate: function () {
		if (navigator.geolocation && navigator.geolocation.clearWatch) {
			navigator.geolocation.clearWatch(this._locationWatchId);
		}
		if (this._locateOptions) {
			this._locateOptions.setView = false;
		}
		return this;
	},

	_handleGeolocationError: function (error) {
		var c = error.code,
		    message = error.message ||
		            (c === 1 ? 'permission denied' :
		            (c === 2 ? 'position unavailable' : 'timeout'));

		if (this._locateOptions.setView && !this._loaded) {
			this.fitWorld();
		}

		this.fire('locationerror', {
			code: c,
			message: 'Geolocation error: ' + message + '.'
		});
	},

	_handleGeolocationResponse: function (pos) {
		var lat = pos.coords.latitude,
		    lng = pos.coords.longitude,
		    latlng = new L.LatLng(lat, lng),
		    bounds = latlng.toBounds(pos.coords.accuracy),
		    options = this._locateOptions;

		if (options.setView) {
			var zoom = this.getBoundsZoom(bounds);
			this.setView(latlng, options.maxZoom ? Math.min(zoom, options.maxZoom) : zoom);
		}

		var data = {
			latlng: latlng,
			bounds: bounds,
			timestamp: pos.timestamp
		};

		for (var i in pos.coords) {
			if (typeof pos.coords[i] === 'number') {
				data[i] = pos.coords[i];
			}
		}

		this.fire('locationfound', data);
	}
});


}(window, document));

},{}],10:[function(require,module,exports){
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
   * @param {L.Point=|Number=} translate
   * @return {L.Matrix|L.Point}
   */
  translate: function(translate) {
    if (translate === undefined) {
      return new L.Point(this._matrix[4], this._matrix[5]);
    }

    var translateX, translateY;
    if (typeof translate === 'number') {
      translateX = translateY = translate;
    } else {
      translateX = translate.x;
      translateY = translate.y;
    }

    return this._add(1, 0, 0, 1, translateX, translateY);
  },


  /**
   * @param {L.Point=|Number=} scale
   * @return {L.Matrix|L.Point}
   */
  scale: function(scale, origin) {
    if (scale === undefined) {
      return new L.Point(this._matrix[0], this._matrix[3]);
    }

    var scaleX, scaleY;
    origin = origin || L.point(0, 0);
    if (typeof scale === 'number') {
      scaleX = scaleY = scale;
    } else {
      scaleX = scale.x;
      scaleY = scale.y;
    }

    return this
      ._add(scaleX, 0, 0, scaleY, origin.x, origin.y)
      ._add(1, 0, 0, 1, -origin.x, -origin.y);
  },


  /**
   * m00  m01  x - m00 * x - m01 * y
   * m10  m11  y - m10 * x - m11 * y
   * @param {Number}   angle
   * @param {L.Point=} origin
   * @return {L.Matrix}
   */
  rotate: function(angle, origin) {
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);

    origin = origin || new L.Point(0, 0);

    return this
      ._add(cos, sin, -sin, cos, origin.x, origin.y)
      ._add(1, 0, 0, 1, -origin.x, -origin.y);
  },


  /**
   * Invert rotation
   * @return {L.Matrix}
   */
  flip: function() {
    this._matrix[1] *= -1;
    this._matrix[2] *= -1;
    return this;
  },


  /**
   * @param {Number|L.Matrix} a
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   * @param {Number} e
   * @param {Number} f
   */
  _add: function(a, b, c, d, e, f) {
    var result = [[], [], []];
    var src = this._matrix;
    var m = [
      [src[0], src[2], src[4]],
      [src[1], src[3], src[5]],
      [     0,      0,     1]
    ];
    var other = [
      [a, c, e],
      [b, d, f],
      [0, 0, 1]
    ], val;


    if (a && a instanceof L.Matrix) {
      src = a._matrix;
      other = [
        [src[0], src[2], src[4]],
        [src[1], src[3], src[5]],
        [     0,      0,     1]];
    }

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        val = 0;
        for (var k = 0; k < 3; k++) {
          val += m[i][k] * other[k][j];
        }
        result[i][j] = val;
      }
    }

    this._matrix = [
      result[0][0], result[1][0], result[0][1],
      result[1][1], result[0][2], result[1][2]
    ];
    return this;
  }


};


L.matrix = function(a, b, c, d, e, f) {
  return new L.Matrix(a, b, c, d, e, f);
};

},{}],11:[function(require,module,exports){
L.Handler.PathTransform = L.Handler.extend({

  options: {
    rotation: true,
    scaling:  true,

    // edge handlers
    handlerOptions: {
      radius:      5,
      fillColor:   '#ffffff',
      color:       '#202020',
      fillOpacity: 1,
      weight:      2,
      opacity:     0.7
    },

    // rectangle
    boundsOptions: {
      weight:    1,
      opacity:   1,
      dashArray: [3, 3],
      fill:      false
    },

    // rotation handler
    rotateHandleOptions: {
      weight: 1,
      opacity: 1
    },
    // rotation handle length
    handleLength: 20,

    // maybe I'll add skewing in the future
    edgesCount:   4
  },


  /**
   * @class L.Handler.PathTransform
   * @constructor
   * @param  {L.Path} path
   */
  initialize: function(path) {
    // references
    this._path = path;
    this._map  = null;

    // handlers
    this._activeMarker   = null;
    this._originMarker   = null;
    this._rotationMarker = null;

    // origins & temporary state
    this._rotationOrigin   = null;
    this._scaleOrigin      = null;
    this._angle            = 0;
    this._scale            = L.point(1, 1);
    this._initialDist      = 0;
    this._rotationStart    = null;
    this._rotationOriginPt = null;

    // preview and transform matrix
    this._matrix          = new L.Matrix(1, 0, 0, 1, 0, 0);
    this._projectedMatrix = new L.Matrix(1, 0, 0, 1, 0, 0);

    // ui elements
    this._handlersGroup  = null;
    this._rect           = null;
    this._handlers       = [];
    this._handleLine     = null;
  },


  /**
   * If the polygon is not rendered, you can transform it yourself
   * in the coordinates, and do it properly.
   * @param {Object=} options
   */
  enable: function(options) {
    if (this._path._map) {
      this._map = this._path._map;
      if (options) {
        this.setOptions(options);
      }
      L.Handler.prototype.enable.call(this);
    }
  },


  /**
   * Init interactions and handlers
   */
  addHooks: function() {
    this._createHandlers();
    this._path
      .on('dragstart', this._onDragStart, this)
      .on('dragend',   this._onDragEnd, this);
  },


  /**
   * Remove handlers
   */
  removeHooks: function() {
    this._hideHandlers();
    this._handlersGroup = null;
    this._rect = null;
    this._handlers = [];
  },


  /**
   * Change editing options
   * @param {Object} options
   */
  setOptions: function(options) {
    var enabled = this._enabled;
    if (enabled) {
      this.disable();
    }

    this.options = L.Util.merge({},
      JSON.parse(JSON.stringify(L.Handler.PathTransform.prototype.options)),
      options);

    if (enabled) {
      this.enable();
    }

    return this;
  },


  /**
   * Update the polygon and handlers preview, no reprojection
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

    this._applyTransform(matrix);
    this._path.fire('transform', { layer: this._path });
  },


  /**
   * @param  {L.Matrix} matrix
   */
  _applyTransform: function(matrix) {
    this._path._transform(matrix._matrix);
    this._rect._transform(matrix._matrix);

    if (this.options.rotation) {
      this._handleLine._transform(matrix._matrix);
    }
  },


  /**
   * Apply final transformation
   */
  _apply: function() {
    //console.group('apply transform');
    var map = this._map;
    var matrix = this._matrix.clone();
    var angle = this._angle;
    var scale = this._scale.clone();

    this._transformGeometries();

    // update handlers
    for (var i = 0, len = this._handlers.length; i < len; i++) {
      var handler = this._handlers[i];
      handler._latlng = map.layerPointToLatLng(handler._point);
      delete handler._initialPoint;
      handler.redraw();
    }

    this._matrix = L.matrix(1, 0, 0, 1, 0, 0);
    this._scale  = L.point(1, 1);
    this._angle  = 0;

    this._updateHandlers();

    map.dragging.enable();
    this._path.fire('transformed', {
      matrix: matrix,
      scale: scale,
      rotation: angle,
      // angle: angle * (180 / Math.PI),
      layer: this._path
    });
    // console.groupEnd('apply transform');
  },


  /**
   * Recalculate rotation handlers position
   */
  _updateHandlers: function() {
    var handlersGroup = this._handlersGroup;

    this._rectShape = this._rect.toGeoJSON();

    handlersGroup.removeLayer(this._handleLine);
    handlersGroup.removeLayer(this._rotationMarker);

    this._handleLine = this._rotationMarker = null;

    for (var i = this._handlers.length - 1; i >= 0; i--) {
      handlersGroup.removeLayer(this._handlers[i]);
    }

    this._createHandlers();
  },


  /**
   * Transform geometries separately
   */
  _transformGeometries: function() {
    var origin = this._origin;
    this._path._transform(null);
    this._rect._transform(null);

    this._transformPoints(this._path, this._matrix, origin);
    this._transformPoints(this._rect, this._matrix, origin);

    if (this.options.rotation) {
      this._handleLine._transform(null);
      this._transformPoints(this._handleLine, this._matrix, origin);
    }
  },


  /**
   * @inheritDoc
   */
  _getProjectedMatrix: function(matrix, originPoint) {
    var map    = this._map;
    var zoom   = map.getMaxZoom();
    var matrix = L.matrix(1, 0, 0, 1, 0, 0);
    var origin;

    if (this._angle) {
      origin = map.project(this._rotationOrigin, zoom);
      matrix = matrix.rotate(this._angle, origin).flip();
    }

    if (!(this._scale.x === 1 && this._scale.y === 1)) {
      origin = map.project(this._scaleOrigin, zoom);
      matrix = matrix
        ._add(L.matrix(1, 0, 0, 1, origin.x, origin.y))
        ._add(L.matrix(this._scale.x, 0, 0, this._scale.y, 0, 0))
        ._add(L.matrix(1, 0, 0, 1, -origin.x, -origin.y));
    }

    return matrix;
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

    var projectedMatrix = this._projectedMatrix = this._getProjectedMatrix();
    // console.time('transform');

    // all shifts are in-place
    if (path._point) { // L.Circle
      path._latlng = this._transformPoint(
        path._latlng, projectedMatrix, map, zoom);
    } else if (path._rings || path._parts) { // everything else
      var rings = path._rings;
      var latlngs = path._latlngs;
      path._bounds = new L.LatLngBounds();

      if (!L.Util.isArray(latlngs[0])) { // polyline
        latlngs = [latlngs];
      }
      for (i = 0, len = rings.length; i < len; i++) {
        for (var j = 0, jj = rings[i].length; j < jj; j++) {
          latlngs[i][j] = this._transformPoint(
            latlngs[i][j], projectedMatrix, map, zoom);
          path._bounds.extend(latlngs[i][j]);
        }
      }
    }

    path._reset();
    //console.timeEnd('transform');
  },


  /**
   * Creates markers and handles
   */
  _createHandlers: function() {
    var map = this._map;
    this._handlersGroup = this._handlersGroup ||
                          new L.LayerGroup().addTo(map);
    this._rect = this._rect ||
                   this._getBoundingPolygon().addTo(this._handlersGroup);

    if (this.options.scaling) {
      this._handlers = [];
      for (var i = 0; i < this.options.edgesCount; i++) {
        // TODO: add stretching
        this._handlers.push(
          this._createHandler(this._rect._latlngs[0][i], i * 2, i)
          .addTo(this._handlersGroup));
      }
    }

    // add bounds
    if (this.options.rotation) {
      //add rotation handler
      this._createRotationHandlers();
    }
  },


  /**
   * Rotation marker and small connectin handle
   */
  _createRotationHandlers: function() {
    var map     = this._map;
    var latlngs = this._rect._latlngs[0];

    var bottom   = new L.LatLng(
      (latlngs[0].lat + latlngs[3].lat) / 2,
      (latlngs[0].lng + latlngs[3].lng) / 2);
    // hehe, top is a reserved word
    var topPoint = new L.LatLng(
      (latlngs[1].lat + latlngs[2].lat) / 2,
      (latlngs[1].lng + latlngs[2].lng) / 2);

    var handlerPosition = map.layerPointToLatLng(
      L.LineUtil.pointOnLine(
        map.latLngToLayerPoint(bottom),
        map.latLngToLayerPoint(topPoint),
        this.options.handleLength)
    );

    this._handleLine = new L.Polyline([topPoint, handlerPosition],
      this.options.rotateHandleOptions).addTo(this._handlersGroup);
    this._rotationMarker = new L.CircleMarker(handlerPosition,
      this.options.handlerOptions)
      .addTo(this._handlersGroup)
      .on('mousedown', this._onRotateStart, this);

    this._rotationOrigin = new L.LatLng(
      (topPoint.lat + bottom.lat) / 2,
      (topPoint.lng + bottom.lng) / 2
    );

    this._handlers.push(this._rotationMarker);
  },


  /**
   * @return {L.LatLng}
   */
  _getRotationOrigin: function() {
    var latlngs = this._rect._latlngs[0];
    var lb = latlngs[0];
    var rt = latlngs[2];

    return new L.LatLng(
      (lb.lat + rt.lat) / 2,
      (lb.lng + rt.lng) / 2
    );
  },


  /**
   * Secure the rotation origin
   * @param  {Event} evt
   */
  _onRotateStart: function(evt) {
    var map = this._map;

    map.dragging.disable();

    this._originMarker     = null;
    this._rotationOriginPt = map.latLngToLayerPoint(this._getRotationOrigin());
    this._rotationStart    = evt.layerPoint;
    this._initialMatrix    = this._matrix.clone();

    this._angle = 0;
    this._path._map
      .on('mousemove', this._onRotate,     this)
      .on('mouseup',   this._onRotateEnd, this);

    this._cachePoints();
    this._path
      .fire('transformstart',   { layer: this._path })
      .fire('rotatestart', { layer: this._path, rotation: 0 });
  },


  /**
   * @param  {Event} evt
   */
  _onRotate: function(evt) {
    var pos = evt.layerPoint;
    var previous = this._rotationStart;
    var origin   = this._rotationOriginPt;

    // rotation step angle
    this._angle = Math.atan2(pos.y - origin.y, pos.x - origin.x) -
                  Math.atan2(previous.y - origin.y, previous.x - origin.x);

    this._matrix = this._initialMatrix
      .clone()
      .rotate(this._angle, origin)
      .flip();

    this._update();
    this._path.fire('rotate', { layer: this._path, rotation: this._angle });
  },


  /**
   * @param  {Event} evt
   */
  _onRotateEnd: function(evt) {
    this._path._map
      .off('mousemove', this._onRotate, this)
      .off('mouseup',   this._onRotateEnd, this);

    this._apply();
    this._path.fire('rotateend', { layer: this._path, rotation: this._angle });
  },


  /**
   * @param  {Event} evt
   */
  _onScaleStart: function(evt) {
    var marker = evt.target;
    var map = this._map;

    map.dragging.disable();

    this._activeMarker = marker;

    this._originMarker = this._handlers[(marker.options.index + 2) % 4];
    this._scaleOrigin  = this._originMarker.getLatLng();

    this._initialMatrix = this._matrix.clone();
    this._cachePoints();

    this._map
      .on('mousemove', this._onScale,    this)
      .on('mouseup',   this._onScaleEnd, this);
    this._initialDist = this._originMarker._point
      .distanceTo(this._activeMarker._point);

    this._path
      .fire('transformstart', { layer: this._path })
      .fire('scalestart', { layer: this._path, scale: L.point(1, 1) });
  },


  /**
   * @param  {Event} evt
   */
  _onScale: function(evt) {
    var originPoint = this._originMarker._point;
    var ratio = originPoint.distanceTo(evt.layerPoint) / this._initialDist;

    this._scale = new L.Point(ratio, ratio);

    // update matrix
    this._matrix = this._initialMatrix
      .clone()
      .scale(ratio, originPoint);

    this._update();
    this._path.fire('scale', {
      layer: this._path, scale: this._scale.clone() });
  },


  /**
   * Scaling complete
   * @param  {Event} evt
   */
  _onScaleEnd: function(evt) {
    this._map
      .off('mousemove', this._onScale,    this)
      .off('mouseup',   this._onScaleEnd, this);

    this._apply();
    this._path.fire('scaleend', {
      layer: this._path, scale: this._scale.clone() });
  },


  /**
   * Cache current handlers positions
   */
  _cachePoints: function() {
    this._handlersGroup.eachLayer(function(layer) {
      layer.bringToFront();
    });
    for (var i = 0, len = this._handlers.length; i < len; i++) {
      var handler = this._handlers[i];
      handler._initialPoint = handler._point.clone();
    }
  },


  /**
   * Bounding polygon
   * @return {L.Polygon}
   */
  _getBoundingPolygon: function() {
    if (this._rectShape) {
      return L.GeoJSON.geometryToLayer(
        this._rectShape, null, null, this.options.boundsOptions);
    } else {
      return new L.Rectangle(
        this._path.getBounds(), this.options.boundsOptions);
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

    marker.on('mousedown', this._onScaleStart, this);
    return marker;
  },


  /**
   * Hide(not remove) the handlers layer
   */
  _hideHandlers: function() {
    this._map.removeLayer(this._handlersGroup);
  },


  /**
   * Hide handlers and rectangle
   */
  _onDragStart: function() {
    this._hideHandlers();
  },


  /**
   * Drag rectangle, re-create handlers
   */
  _onDragEnd: function(evt) {
    var rect = this._rect;
    var matrix = (evt.layer ? evt.layer : this._path).dragging._matrix.slice();

    if (!rect.dragging) {
      rect.dragging = new L.Handler.PathDrag(rect);
    }
    rect.dragging.enable();
    this._map.addLayer(rect);
    rect.dragging._transformPoints(matrix);
    rect._updatePath();
    rect._project();
    rect.dragging.disable();

    this._map.addLayer(this._handlersGroup);
    this._updateHandlers();

    this._path.fire('transformed', {
      scale: L.point(1, 1),
      rotation: 0,
      matrix: L.matrix.apply(undefined, matrix),
      translate: L.point(matrix[4], matrix[5]),
      layer: this._path
    });
  }
});

L.Path.addInitHook(function() {
  if (this.options.transform) {
    this.transform = new L.Handler.PathTransform(this, this.options.transform);
  }
});

},{}],12:[function(require,module,exports){
/**
 * Point on the line segment or its extention
 *
 * @param  {L.Point} start
 * @param  {L.Point} final
 * @param  {Number}  distPx
 * @return {L.Point}
 */
L.LineUtil.pointOnLine = function(start, final, distPx) {
  var ratio = 1 + distPx / start.distanceTo(final);
  return new L.Point(
    start.x + (final.x - start.x) * ratio,
    start.y + (final.y - start.y) * ratio
  );
};


/**
 * Deep merge objects.
 */
L.Util.merge = function() {
  var i = 1;
  var key, val;
  var obj = arguments[i];

  function isObject(object) {
    return Object.prototype.toString.call(object) === '[object Object]';
  }

  // make sure we don't modify source element and it's properties
  // objects are passed by reference
  var target = arguments[0];

  while (obj) {
    obj = arguments[i++];
    for (key in obj) {
      if (!obj.hasOwnProperty(key)) {
        continue;
      }

      val = obj[key];

      if (isObject(val) && isObject(target[key])){
        target[key] = L.Util.merge(target[key], val);
      } else {
        target[key] = val;
      }
    }
  }
  return target;
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL2pzL2FwcC5qcyIsImluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xlYWZsZXQtcGF0aC1kcmFnL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xlYWZsZXQtcGF0aC1kcmFnL3NyYy9DYW52YXMuanMiLCJub2RlX21vZHVsZXMvbGVhZmxldC1wYXRoLWRyYWcvc3JjL1BhdGguRHJhZy5qcyIsIm5vZGVfbW9kdWxlcy9sZWFmbGV0LXBhdGgtZHJhZy9zcmMvUGF0aC5UcmFuc2Zvcm0uanMiLCJub2RlX21vZHVsZXMvbGVhZmxldC1wYXRoLWRyYWcvc3JjL1NWRy5WTUwuanMiLCJub2RlX21vZHVsZXMvbGVhZmxldC1wYXRoLWRyYWcvc3JjL1NWRy5qcyIsIm5vZGVfbW9kdWxlcy9sZWFmbGV0L2Rpc3QvbGVhZmxldC1zcmMuanMiLCJzcmMvTWF0cml4LmpzIiwic3JjL1BhdGguVHJhbnNmb3JtLmpzIiwic3JjL1V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3JQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3o1U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdm5CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgTCA9IHJlcXVpcmUoJ2xlYWZsZXQnKTtcbnZhciBEcmFnSGFuZGxlciA9IHJlcXVpcmUoJy4uLy4uL2luZGV4Jyk7XG5cbkwuSWNvbi5EZWZhdWx0LmltYWdlUGF0aCA9IFwiaHR0cDovL2Nkbi5sZWFmbGV0anMuY29tL2xlYWZsZXQtMC43L2ltYWdlc1wiO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xudmFyIG1hcCA9IGdsb2JhbC5tYXAgPSBuZXcgTC5NYXAoJ21hcCcsIHtcbiAgLy8gY3JzOiBMLkNSUy5FUFNHNDMyNiAvLyB0aGF0IHdhcyB0ZXN0ZWQgYXMgd2VsbFxufSkuc2V0VmlldyhbMjIuNDI2NTgsIDExNC4xOTUyXSwgMTEpO1xuXG5MLnRpbGVMYXllcignaHR0cDovL3tzfS50aWxlLm9zbS5vcmcve3p9L3t4fS97eX0ucG5nJywge1xuICBhdHRyaWJ1dGlvbjogJyZjb3B5OyAnICtcbiAgICAnPGEgaHJlZj1cImh0dHA6Ly9vc20ub3JnL2NvcHlyaWdodFwiPk9TTTwvYT4gY29udHJpYnV0b3JzJ1xufSkuYWRkVG8obWFwKTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmZ1bmN0aW9uIGludGVycG9sYXRlQXJyKGFycmF5LCBpbnNlcnQpIHtcbiAgdmFyIHJlcyA9IFtdO1xuICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uKHAsIGksIGFycikge1xuICAgIHJlcy5wdXNoKHAuY29uY2F0KCkpO1xuXG4gICAgaWYgKGkgPCBhcnIubGVuZ3RoIC0gMSkge1xuICAgICAgdmFyIGRpZmYgPSBbYXJyW2kgKyAxXVswXSAtIHBbMF0sIGFycltpICsgMV1bMV0gLSBwWzFdXTtcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgaW5zZXJ0OyBpKyspIHtcbiAgICAgICAgcmVzLnB1c2goW3BbMF0gKyAoZGlmZlswXSAqIGkpIC8gaW5zZXJ0LCBwWzFdICsgKGRpZmZbMV0gKiBpKSAvIGluc2VydF0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHJlcztcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnZhciBwb2x5Z29uID0gZ2xvYmFsLnBvbHlnb24gPSBuZXcgTC5Qb2x5Z29uKFxuICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFxuXG4gICAgLy8gfiAxMyAwMDAgcG9pbnRzXG4gICAgaW50ZXJwb2xhdGVBcnIoW1xuICAgICAgWzExMy45NzY5NzQ0ODczMDQ2OSwgMjIuNDAzNDEwODkyNzEyMTI0XSxcbiAgICAgIFsxMTMuOTg2NTg3NTI0NDE0MDUsIDIyLjM4MzczMDA4NTkyNDk1XSxcbiAgICAgIFsxMTQuMDEyNjgwMDUzNzEwOTQsIDIyLjM2OTEyNjM5NzU0NTg4N10sXG4gICAgICBbMTE0LjAyNzc4NjI1NDg4MjgxLCAyMi4zODU2MzQ4MDE4NTcxOF0sXG4gICAgICBbMTE0LjA0NzAxMjMyOTEwMTU2LCAyMi4zOTUxNTc5OTAyOTA3NTVdLFxuICAgICAgWzExNC4wNjAwNTg1OTM3NSwgICAgMjIuNDEzNTY3NjM4MzY5ODA1XSxcbiAgICAgIFsxMTQuMDYyODA1MTc1NzgxMjUsIDIyLjQzMjYwOTUzNDg3Njc5Nl0sXG4gICAgICBbMTE0LjA0ODM4NTYyMDExNzE3LCAyMi40NDQ2NjgwNTE2NTcxNTddLFxuICAgICAgWzExNC4wNDI4OTI0NTYwNTQ2OSwgMjIuNDQ4NDc1Nzg2NTY1NDRdLFxuICAgICAgWzExNC4wMzI1OTI3NzM0Mzc0OSwgMjIuNDQ0NjY4MDUxNjU3MTU3XSxcbiAgICAgIFsxMTQuMDE5NTQ2NTA4Nzg5MDYsIDIyLjQ0NzIwNjU1MzIxMTgxNF0sXG4gICAgICBbMTEzLjk5NjIwMDU2MTUyMzQ0LCAyMi40MzY0MTc2MDA3NjMxMTRdLFxuICAgICAgWzExMy45ODE3ODEwMDU4NTkzOCwgMjIuNDIwNTQ5OTcwMjkwODc1XSxcbiAgICAgIFsxMTMuOTc2OTc0NDg3MzA0NjksIDIyLjQwMzQxMDg5MjcxMjEyNF1cbiAgICBdLCAxMDAwKVxuICApLCB7XG4gICAgY29sb3I6ICcjZjAwJyxcbiAgICBkcmFnZ2FibGU6IHRydWUsXG4gICAgdHJhbnNmb3JtOiB0cnVlXG4gIH0pLmFkZFRvKG1hcCk7XG4vL3BvbHlnb24udHJhbnNmb3JtLmVuYWJsZSgpO1xuXG52YXIgcG9seWxpbmUgPSBnbG9iYWwucG9seWxpbmUgPSBuZXcgTC5Qb2x5bGluZShcbiAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgWzExNC4xNDMxNDI3MDAxOTUzMSwgMjIuNDk0Nzk0ODQ5NzU0NDNdLFxuICAgIFsxMTQuMTUzNDQyMzgyODEyNSwgIDIyLjQ4NTkxMjk0MjMyMDk1OF0sXG4gICAgWzExNC4xNTIwNjkwOTE3OTY4OCwgMjIuNDczMjIzNTE0NDc4MV0sXG4gICAgWzExNC4xNDkzMjI1MDk3NjU2MSwgMjIuNDU5ODk4MzYzOTQzODkzXSxcbiAgICBbMTE0LjE1OTYyMjE5MjM4MjgxLCAyMi40NDcyMDY1NTMyMTE4MTRdLFxuICAgIFsxMTQuMTY5OTIxODc1LCAgICAgIDIyLjQ0NzIwNjU1MzIxMTgxNF0sXG4gICAgWzExNC4xOTM5NTQ0Njc3NzM0NCwgMjIuNDU5ODk4MzYzOTQzODkzXSxcbiAgICBbMTE0LjIwNjMxNDA4NjkxNDA2LCAyMi40NjExNjc0ODExMDkzNV0sXG4gICAgWzExNC4yMTE4MDcyNTA5NzY1NSwgMjIuNDczODU4MDEzNDg3NjE0XSxcbiAgICBbMTE0LjIyNDE2Njg3MDExNzE5LCAyMi40NzEzMjAwMDAwMDk5OTJdLFxuICAgIFsxMTQuMjM3MjEzMTM0NzY1NjIsIDIyLjQ3NjM5NTk4MDQ1Nzk3M10sXG4gICAgWzExNC4yNDIwMTk2NTMzMjAzMSwgMjIuNDkzNTI2MDQwNzM3MjJdLFxuICAgIFsxMTQuMjMwMzQ2Njc5Njg3NSwgIDIyLjUxNTcyODUxODMwMzUxXSxcbiAgICBbMTE0LjIxNzk4NzA2MDU0Njg4LCAyMi41MjQ2MDg1MTEwMjYyNjJdLFxuICAgIFsxMTQuMjA3Njg3Mzc3OTI5NjksIDIyLjUyNDYwODUxMTAyNjI2Ml0sXG4gICAgWzExNC4yMDc2ODczNzc5Mjk2OSwgMjIuNTM2MDI0ODA1ODg2OTc0XVxuICBdKSwge1xuICAgIHdlaWdodDogMTUsXG4gICAgZHJhZ2dhYmxlOiB0cnVlLFxuICAgIHRyYW5zZm9ybTogdHJ1ZVxuICB9KVxuICAuYmluZFBvcHVwKFwiTC5Qb2x5bGluZVwiKVxuICAuYWRkVG8obWFwKTtcbi8vIHBvbHlsaW5lLnRyYW5zZm9ybS5lbmFibGUoKTtcblxuXG52YXIgcG9seWdvbldpdGhIb2xlID0gZ2xvYmFsLnBvbHlnb25XaXRoSG9sZSA9IG5ldyBMLlBvbHlnb24oXG4gICAgW1xuICAgICAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgICAgIFsxMTQuMjc0OTc4NjM3Njk1MywgIDIyLjQxMjkzMjg2MzUxNzcxN10sXG4gICAgICAgIFsxMTQuMjgzOTA1MDI5Mjk2ODgsIDIyLjQwMDg3MTU5MDMwNTk1XSxcbiAgICAgICAgWzExNC4yOTAwODQ4Mzg4NjcxNywgMjIuMzg4ODA5MjcwNDU1NTZdLFxuICAgICAgICBbMTE0LjMwMTA3MTE2Njk5MjE5LCAyMi4zODI0NjAyNjA4MTU3MTZdLFxuICAgICAgICBbMTE0LjMxODkyMzk1MDE5NTMxLCAyMi4zOTE5ODM2NjY2MDI3ODNdLFxuICAgICAgICBbMTE0LjMyMzA0MzgyMzI0MjE5LCAyMi4zODA1NTU1MDE0MjE1MzNdLFxuICAgICAgICBbMTE0LjM0Mjk1NjU0Mjk2ODc1LCAyMi4zNzI5MzYyMDMxMTM4MzhdLFxuICAgICAgICBbMTE0LjMzNDcxNjc5Njg3NSwgICAyMi4zODQzNjQ5OTQxMzMzMDNdLFxuICAgICAgICBbMTE0LjMzMDU5NjkyMzgyODEyLCAyMi4zOTM4ODgyNjk1MTExOTRdLFxuICAgICAgICBbMTE0LjMyMTY3MDUzMjIyNjU1LCAyMi40MDA4NzE1OTAzMDU5NV0sXG4gICAgICAgIFsxMTQuMzI3ODUwMzQxNzk2ODgsIDIyLjQxMzU2NzYzODM2OTgwNV0sXG4gICAgICAgIFsxMTQuMzMxOTcwMjE0ODQzNzUsIDIyLjQyNDk5MzA4OTY0NzIyXSxcbiAgICAgICAgWzExNC4zMjU3OTA0MDUyNzM0NCwgMjIuNDMwNzA1NDYyNzQ4OTE4XSxcbiAgICAgICAgWzExNC4zMzE5NzAyMTQ4NDM3NSwgMjIuNDM5NTkwOTA5MTcyNjZdLFxuICAgICAgICBbMTE0LjMzNzQ2MzM3ODkwNjI0LCAyMi40NDkxMTAzOTg4ODYxMDZdLFxuICAgICAgICBbMTE0LjMzNTQwMzQ0MjM4MjgxLCAyMi40NjE4MDIwMzUzMzM5OTJdLFxuICAgICAgICBbMTE0LjMyNTEwMzc1OTc2NTYyLCAyMi40NjQzNDAyMjMxNzcxMThdLFxuICAgICAgICBbMTE0LjMyOTIyMzYzMjgxMjQ5LCAyMi40NzI1ODkwMTI1NjE5NTRdLFxuICAgICAgICBbMTE0LjMyMzczMDQ2ODc1LCAgICAyMi40NzcwMzA0NjQ5MzMzMDddLFxuICAgICAgICBbMTE0LjMxOTYxMDU5NTcwMzEyLCAyMi40Nzg5MzM5MDA5MTY5MjhdLFxuICAgICAgICBbMTE0LjMwMTc1NzgxMjUsICAgICAyMi40NjYyNDM4MzM1NDk0NDVdLFxuICAgICAgICBbMTE0LjMwMjQ0NDQ1ODAwNzgxLCAyMi40NTczNjAwOTQ3NTAwODNdLFxuICAgICAgICBbMTE0LjI5MjgzMTQyMDg5ODQ0LCAyMi40NTQ4MjE3NzkwNzU4MzJdLFxuICAgICAgICBbMTE0LjI4MzkwNTAyOTI5Njg4LCAyMi40NTEwMTQyMTg0MjI2OV0sXG4gICAgICAgIFsxMTQuMjc0OTc4NjM3Njk1MywgIDIyLjQ0Mjc2NDE0NTAwMTcwN10sXG4gICAgICAgIFsxMTQuMjkwNzcxNDg0Mzc0OTksIDIyLjQyODE2NjY1OTI3OTYxNV0sXG4gICAgICAgIFsxMTQuMjc3MDM4NTc0MjE4NzUsIDIyLjQyMDU0OTk3MDI5MDg3NV0sXG4gICAgICAgIFsxMTQuMjc0OTc4NjM3Njk1MywgIDIyLjQxMjkzMjg2MzUxNzcxN11cbiAgICAgIF0pLFxuICAgICAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgICAgIFsxMTQuMzAxMDcxMTY2OTkyMTksIDIyLjQzMzg3ODkwMTc4Mjk3XSxcbiAgICAgICAgWzExNC4yOTM1MTgwNjY0MDYyNSwgMjIuNDE0MjAyNDEwMzIxMzAyXSxcbiAgICAgICAgWzExNC4zMDU4Nzc2ODU1NDY4NiwgMjIuNDA4NDg5MzU4MzQyNjM1XSxcbiAgICAgICAgWzExNC4zMjIzNTcxNzc3MzQzOCwgMjIuNDIxMTg0NzEwMzMxODU4XSxcbiAgICAgICAgWzExNC4zMDEwNzExNjY5OTIxOSwgMjIuNDMzODc4OTAxNzgyOTddXG4gICAgICBdKVxuICAgIF0sIHtcbiAgICAgIGRyYWdnYWJsZTogdHJ1ZSxcbiAgICAgIHRyYW5zZm9ybTogdHJ1ZVxuICAgIH1cbiAgKVxuICAuYWRkVG8obWFwKTtcbi8vcG9seWdvbldpdGhIb2xlLnRyYW5zZm9ybS5lbmFibGUoKTtcblxudmFyIG11bHRpUG9seWdvbiA9IGdsb2JhbC5tdWx0aVBvbHlnb24gPSBuZXcgTC5Qb2x5Z29uKFtcbiAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgWzExNC4yMDU2Mjc0NDE0MDYyNSwgMjIuMzIwODU5ODQxMDA1OTNdLFxuICAgIFsxMTQuMjE1OTI3MTI0MDIzNDQsIDIyLjM1MjYxNjAzNTUxMjE1XSxcbiAgICBbMTE0LjI2NDY3ODk1NTA3ODEyLCAyMi4zNTEzNDU5MjY2MDY5NTddLFxuICAgIFsxMTQuMjc0OTc4NjM3Njk1MywgIDIyLjMyNDAzNTc4NTg0MDM4XSxcbiAgICBbMTE0LjI5MjE0NDc3NTM5MDYyLCAyMi4zMjcyMTE2NTgzODg5M10sXG4gICAgWzExNC4zMDE3NTc4MTI1LCAgICAgMjIuMzExOTY2ODEwOTc3NjE2XSxcbiAgICBbMTE0LjI5NDIwNDcxMTkxNDA2LCAyMi4yOTEwMDI0Mjc3MzUzMjVdLFxuICAgIFsxMTQuMjkzNTE4MDY2NDA2MjUsIDIyLjI3MjU3NjU4NTQxMzQ3NV0sXG4gICAgWzExNC4yODM5MDUwMjkyOTY4OCwgMjIuMjYxNzc0MTAwOTc0MzVdLFxuICAgIFsxMTQuMjY4Nzk4ODI4MTI1LCAgIDIyLjI4MTQ3MjEyMjc4MzgxOF0sXG4gICAgWzExNC4yNzQ5Nzg2Mzc2OTUzLCAgMjIuMjk0ODE0MzY3NzgwNTE4XSxcbiAgICBbMTE0LjI2OTQ4NTQ3MzYzMjgxLCAyMi4zMDI0Mzc5MzU5MDQ0OF0sXG4gICAgWzExNC4yNzAxNzIxMTkxNDA2MiwgMjIuMzE1MTQyOTU4MTY5MzldLFxuICAgIFsxMTQuMjU3ODEyNSwgICAgICAgIDIyLjMxMTk2NjgxMDk3NzYxNl0sXG4gICAgWzExNC4yNDc1MTI4MTczODI4MSwgMjIuMjk5ODk2NzkyNzUxOTI3XSxcbiAgICBbMTE0LjI0NTQ1Mjg4MDg1OTM4LCAyMi4yOTEwMDI0Mjc3MzUzMjVdLFxuICAgIFsxMTQuMjI5NjYwMDM0MTc5NjksIDIyLjMwNzUyMDA4MzUyMjQ3Nl0sXG4gICAgWzExNC4yMjA3MzM2NDI1NzgxMiwgMjIuMzA1NjE0Mjk5ODM3MDQ2XSxcbiAgICBbMTE0LjIwNTYyNzQ0MTQwNjI1LCAyMi4zMjA4NTk4NDEwMDU5M11cbiAgXSksXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgIFsxMTQuMzE1NDkwNzIyNjU2MjUsIDIyLjMzOTI3OTMxNDY4MzEyXSxcbiAgICBbMTE0LjMyMDI5NzI0MTIxMDk0LCAyMi4zMjY1NzY0ODk2NjI0ODJdLFxuICAgIFsxMTQuMzI5OTEwMjc4MzIwMzEsIDIyLjMyNjU3NjQ4OTY2MjQ4Ml0sXG4gICAgWzExNC4zMzMzNDM1MDU4NTkzOCwgMjIuMzMyMjkyOTA0MDkxNzE2XSxcbiAgICBbMTE0LjMyMzA0MzgyMzI0MjE5LCAyMi4zNDI0NTQ4NDAxNDY1XSxcbiAgICBbMTE0LjMxNTQ5MDcyMjY1NjI1LCAyMi4zMzkyNzkzMTQ2ODMxMl1cbiAgXSksXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgIFsxMTQuMjc5MDk4NTEwNzQyMTksIDIyLjI0NDYxNTUwMDMyMzA2NF0sXG4gICAgWzExNC4yODExNTg0NDcyNjU2MiwgMjIuMjUxNjA2Mjk1MTMyOTQ4XSxcbiAgICBbMTE0LjI4NjY1MTYxMTMyODEyLCAyMi4yNTU0MTkzMDg4NTg1NTZdLFxuICAgIFsxMTQuMjk5Njk3ODc1OTc2NTYsIDIyLjI2MTEzODYzNDc0NDQ5XSxcbiAgICBbMTE0LjI5NjI2NDY0ODQzNzUsICAyMi4yNTA5NzA3ODI3NTA4NjZdLFxuICAgIFsxMTQuMjk0ODkxMzU3NDIxODgsIDIyLjI0MDgwMjE5MjQ2MzM1XSxcbiAgICBbMTE0LjI5MDA4NDgzODg2NzE3LCAyMi4yMzg4OTU0OTk2MTMyMzJdLFxuICAgIFsxMTQuMjc5MDk4NTEwNzQyMTksIDIyLjI0NDYxNTUwMDMyMzA2NF1cbiAgXSlcbl0sIHtcbiAgZHJhZ2dhYmxlOiB0cnVlLFxuICB0cmFuc2Zvcm06IHRydWUsXG4gIGNvbG9yOiAnIzA5Midcbn0pLmJpbmRQb3B1cCgnTXVsdGlQb2x5Z29uJykuYWRkVG8obWFwKTtcbi8vbXVsdGlQb2x5Z29uLnRyYW5zZm9ybS5lbmFibGUoKTtcblxudmFyIG11bHRpUG9seWxpbmUgPSBnbG9iYWwubXVsdGlQb2x5bGluZSA9IG5ldyBMLlBvbHlsaW5lKFtcbiAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgWzExMy44OTg2OTY4OTk0MTQwNiwgMjIuMzk5NjAxOTIxNzA2OTUzXSxcbiAgICBbMTEzLjg5ODAxMDI1MzkwNjI1LCAyMi40MjI0NTQxODE3MDk3MDddLFxuICAgIFsxMTMuOTAzNTAzNDE3OTY4NzUsIDIyLjQzMzI0NDIxOTc4MTE3XSxcbiAgICBbMTEzLjkwOTY4MzIyNzUzOTA2LCAyMi40NDkxMTAzOTg4ODYxMDZdLFxuICAgIFsxMTMuOTA2OTM2NjQ1NTA3ODEsIDIyLjQ3ODI5OTQyNTE2Mjg1Ml0sXG4gICAgWzExMy45MjM0MTYxMzc2OTUzLCAgMjIuNDg4NDUwNjg4MzI1NDA4XSxcbiAgICBbMTEzLjkzMzcxNTgyMDMxMjUsICAyMi40ODMzNzUxNDk3ODk2MjNdLFxuICAgIFsxMTMuOTQ0NzAyMTQ4NDM3NSwgIDIyLjQ5MjI1NzIyMDA4NTE5M10sXG4gICAgWzExMy45NTIyNTUyNDkwMjM0NCwgMjIuNTEyNTU2OTU0MDUxNDVdXG4gIF0pLFxuXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgIFsxMTMuODY3Nzk3ODUxNTYyNSwgIDIyLjM5MjYxODUzNzEzNzM4XSxcbiAgICBbMTEzLjg2OTE3MTE0MjU3ODExLCAyMi40Mjc1MzE5NTExNTY5OV0sXG4gICAgWzExMy45MjM0MTYxMzc2OTUzLCAgMjIuNDYyNDM2NTg2NjUzMTQ4XSxcbiAgICBbMTEzLjk0ODEzNTM3NTk3NjU2LCAyMi40NzM4NTgwMTM0ODc2MTRdLFxuICAgIFsxMTMuOTc4MzQ3Nzc4MzIwMywgIDIyLjQ5OTIzNTU4OTY4MzA2XSxcbiAgICBbMTEzLjk5Njg4NzIwNzAzMTI1LCAyMi41MTE5MjI2MzI0Njg4Nl0sXG4gICAgWzExNC4wMTMzNjY2OTkyMTg3NSwgMjIuNTAxMTM4NzIwMzAwMjU0XSxcbiAgICBbMTE0LjAyNTAzOTY3Mjg1MTU1LCAyMi41MDgxMTY2NDE4NTM2NzVdXG4gIF0pXG5dLCB7XG4gIGRyYWdnYWJsZTogdHJ1ZSxcbiAgdHJhbnNmb3JtOiB0cnVlLFxuICBjb2xvcjogJyNlOTAnXG59KS5iaW5kUG9wdXAoJ011bHRpUG9seWxpbmUnKS5hZGRUbyhtYXApO1xuLy8gbXVsdGlQb2x5bGluZS50cmFuc2Zvcm0uZW5hYmxlKCk7XG5cbnZhciBsYXllcnMgPSBbcG9seWdvbiwgcG9seWxpbmUsIG11bHRpUG9seWxpbmUsIG11bHRpUG9seWdvbiwgcG9seWdvbldpdGhIb2xlXTtcblxuZnVuY3Rpb24gdXBkYXRlKCkge1xuICBMLlV0aWwucmVxdWVzdEFuaW1GcmFtZShmdW5jdGlvbigpIHtcbiAgICB2YXIgZHJhZ2dpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZHJhZ2dpbmcnKS5jaGVja2VkO1xuICAgIHZhciBzY2FsaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NjYWxpbmcnKS5jaGVja2VkO1xuICAgIHZhciByb3RhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyb3RhdGlvbicpLmNoZWNrZWQ7XG5cbiAgICBsYXllcnMuZm9yRWFjaChmdW5jdGlvbihsYXllcikge1xuXG4gICAgICBpZiAobGF5ZXIuZHJhZ2dpbmcpIHtcbiAgICAgICAgbGF5ZXIuZHJhZ2dpbmdbZHJhZ2dpbmcgPyAnZW5hYmxlJzogJ2Rpc2FibGUnXSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGF5ZXIuZWFjaExheWVyKGZ1bmN0aW9uKHN1YmxheWVyKSB7XG4gICAgICAgICAgc3VibGF5ZXIuZHJhZ2dpbmdbZHJhZ2dpbmcgPyAnZW5hYmxlJzogJ2Rpc2FibGUnXSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuXG4gICAgICBsYXllci50cmFuc2Zvcm0uc2V0T3B0aW9ucyh7XG4gICAgICAgIHNjYWxpbmc6IHNjYWxpbmcsXG4gICAgICAgIHJvdGF0aW9uOiByb3RhdGlvblxuICAgICAgfSkuZW5hYmxlKCk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5bXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9Y2hlY2tib3hdJykpXG4uZm9yRWFjaChmdW5jdGlvbihjaGVja2JveCkge1xuICBMLkRvbUV2ZW50Lm9uKGNoZWNrYm94LCAnY2hhbmdlJywgdXBkYXRlKTtcbn0pO1xuXG51cGRhdGUoKTtcbiIsInZhciBMID0gZ2xvYmFsLkwgfHwgcmVxdWlyZSgnbGVhZmxldCcpO1xucmVxdWlyZSgnbGVhZmxldC1wYXRoLWRyYWcnKTtcbnJlcXVpcmUoJy4vc3JjL1V0aWwnKTtcbnJlcXVpcmUoJy4vc3JjL01hdHJpeCcpO1xucmVxdWlyZSgnLi9zcmMvUGF0aC5UcmFuc2Zvcm0nKTtcbiIsInJlcXVpcmUoJy4vc3JjL1NWRycpO1xucmVxdWlyZSgnLi9zcmMvU1ZHLlZNTCcpO1xucmVxdWlyZSgnLi9zcmMvQ2FudmFzJyk7XG5yZXF1aXJlKCcuL3NyYy9QYXRoLlRyYW5zZm9ybScpO1xucmVxdWlyZSgnLi9zcmMvUGF0aC5EcmFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTC5QYXRoLkRyYWc7XG4iLCJMLlV0aWwudHJ1ZUZuID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0cnVlO1xufTtcblxuTC5DYW52YXMuaW5jbHVkZSh7XG5cbiAgLyoqXG4gICAqIERvIG5vdGhpbmdcbiAgICogQHBhcmFtICB7TC5QYXRofSBsYXllclxuICAgKi9cbiAgX3Jlc2V0VHJhbnNmb3JtUGF0aDogZnVuY3Rpb24obGF5ZXIpIHtcbiAgICBpZiAoIXRoaXMuX2NvbnRhaW5lckNvcHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkZWxldGUgdGhpcy5fY29udGFpbmVyQ29weTtcblxuICAgIGlmIChsYXllci5fY29udGFpbnNQb2ludF8pIHtcbiAgICAgIGxheWVyLl9jb250YWluc1BvaW50ID0gbGF5ZXIuX2NvbnRhaW5zUG9pbnRfO1xuICAgICAgZGVsZXRlIGxheWVyLl9jb250YWluc1BvaW50XztcblxuICAgICAgdGhpcy5fcmVxdWVzdFJlZHJhdyhsYXllcik7XG4gICAgICB0aGlzLl9kcmF3KHRydWUpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogQWxnb3JpdGhtIG91dGxpbmU6XG4gICAqXG4gICAqIDEuIHByZS10cmFuc2Zvcm0gLSBjbGVhciB0aGUgcGF0aCBvdXQgb2YgdGhlIGNhbnZhcywgY29weSBjYW52YXMgc3RhdGVcbiAgICogMi4gYXQgZXZlcnkgZnJhbWU6XG4gICAqICAgIDIuMS4gc2F2ZVxuICAgKiAgICAyLjIuIHJlZHJhdyB0aGUgY2FudmFzIGZyb20gc2F2ZWQgb25lXG4gICAqICAgIDIuMy4gdHJhbnNmb3JtXG4gICAqICAgIDIuNC4gZHJhdyBwYXRoXG4gICAqICAgIDIuNS4gcmVzdG9yZVxuICAgKlxuICAgKiBAcGFyYW0gIHtMLlBhdGh9IGxheWVyXG4gICAqIEBwYXJhbSAge0FycmF5LjxOdW1iZXI+fSBtYXRyaXhcbiAgICovXG4gIHRyYW5zZm9ybVBhdGg6IGZ1bmN0aW9uKGxheWVyLCBtYXRyaXgpIHtcbiAgICB2YXIgY29weSA9IHRoaXMuX2NvbnRhaW5lckNvcHk7XG4gICAgdmFyIGN0eCA9IHRoaXMuX2N0eDtcbiAgICB2YXIgbSA9IEwuQnJvd3Nlci5yZXRpbmEgPyAyIDogMTtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5fYm91bmRzO1xuICAgIHZhciBzaXplID0gYm91bmRzLmdldFNpemUoKTtcbiAgICB2YXIgcG9zID0gYm91bmRzLm1pbjtcblxuICAgIGlmICghY29weSkge1xuICAgICAgY29weSA9IHRoaXMuX2NvbnRhaW5lckNvcHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29weSk7XG5cbiAgICAgIGNvcHkud2lkdGggPSBtICogc2l6ZS54O1xuICAgICAgY29weS5oZWlnaHQgPSBtICogc2l6ZS55O1xuXG4gICAgICBsYXllci5fcmVtb3ZlZCA9IHRydWU7XG4gICAgICB0aGlzLl9yZWRyYXcoKTtcblxuICAgICAgY29weS5nZXRDb250ZXh0KCcyZCcpLnRyYW5zbGF0ZShtICogYm91bmRzLm1pbi54LCBtICogYm91bmRzLm1pbi55KTtcbiAgICAgIGNvcHkuZ2V0Q29udGV4dCgnMmQnKS5kcmF3SW1hZ2UodGhpcy5fY29udGFpbmVyLCAwLCAwKTtcbiAgICAgIHRoaXMuX2luaXRQYXRoKGxheWVyKTtcbiAgICAgIGxheWVyLl9jb250YWluc1BvaW50XyA9IGxheWVyLl9jb250YWluc1BvaW50O1xuICAgICAgbGF5ZXIuX2NvbnRhaW5zUG9pbnQgPSBMLlV0aWwudHJ1ZUZuO1xuICAgIH1cblxuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LmNsZWFyUmVjdChwb3MueCwgcG9zLnksIHNpemUueCAqIG0sIHNpemUueSAqIG0pO1xuICAgIGN0eC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7XG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgICBjdHguc2F2ZSgpO1xuXG4gICAgY3R4LmRyYXdJbWFnZSh0aGlzLl9jb250YWluZXJDb3B5LCAwLCAwLCBzaXplLngsIHNpemUueSk7XG4gICAgY3R4LnRyYW5zZm9ybS5hcHBseShjdHgsIG1hdHJpeCk7XG5cbiAgICB2YXIgbGF5ZXJzID0gdGhpcy5fbGF5ZXJzO1xuICAgIHRoaXMuX2xheWVycyA9IHt9O1xuXG4gICAgdGhpcy5faW5pdFBhdGgobGF5ZXIpO1xuICAgIGxheWVyLl91cGRhdGVQYXRoKCk7XG5cbiAgICB0aGlzLl9sYXllcnMgPSBsYXllcnM7XG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxuXG59KTtcbiIsIi8qKlxuICogRHJhZyBoYW5kbGVyXG4gKiBAY2xhc3MgTC5QYXRoLkRyYWdcbiAqIEBleHRlbmRzIHtMLkhhbmRsZXJ9XG4gKi9cbkwuSGFuZGxlci5QYXRoRHJhZyA9IEwuSGFuZGxlci5leHRlbmQoIC8qKiBAbGVuZHMgIEwuUGF0aC5EcmFnLnByb3RvdHlwZSAqLyB7XG5cbiAgc3RhdGljczoge1xuICAgIERSQUdHSU5HX0NMUzogJ2xlYWZsZXQtcGF0aC1kcmFnZ2FibGUnLFxuICB9LFxuXG5cbiAgLyoqXG4gICAqIEBwYXJhbSAge0wuUGF0aH0gcGF0aFxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uKHBhdGgpIHtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtMLlBhdGh9XG4gICAgICovXG4gICAgdGhpcy5fcGF0aCA9IHBhdGg7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7QXJyYXkuPE51bWJlcj59XG4gICAgICovXG4gICAgdGhpcy5fbWF0cml4ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtMLlBvaW50fVxuICAgICAqL1xuICAgIHRoaXMuX3N0YXJ0UG9pbnQgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0wuUG9pbnR9XG4gICAgICovXG4gICAgdGhpcy5fZHJhZ1N0YXJ0UG9pbnQgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5fbWFwRHJhZ2dpbmdXYXNFbmFibGVkID0gZmFsc2U7XG5cbiAgfSxcblxuICAvKipcbiAgICogRW5hYmxlIGRyYWdnaW5nXG4gICAqL1xuICBhZGRIb29rczogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fcGF0aC5vbignbW91c2Vkb3duJywgdGhpcy5fb25EcmFnU3RhcnQsIHRoaXMpO1xuXG4gICAgdGhpcy5fcGF0aC5vcHRpb25zLmNsYXNzTmFtZSA9IHRoaXMuX3BhdGgub3B0aW9ucy5jbGFzc05hbWUgP1xuICAgICAgICAodGhpcy5fcGF0aC5vcHRpb25zLmNsYXNzTmFtZSArICcgJyArIEwuSGFuZGxlci5QYXRoRHJhZy5EUkFHR0lOR19DTFMpIDpcbiAgICAgICAgIEwuSGFuZGxlci5QYXRoRHJhZy5EUkFHR0lOR19DTFM7XG5cbiAgICBpZiAodGhpcy5fcGF0aC5fcGF0aCkge1xuICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX3BhdGguX3BhdGgsIEwuSGFuZGxlci5QYXRoRHJhZy5EUkFHR0lOR19DTFMpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogRGlzYWJsZSBkcmFnZ2luZ1xuICAgKi9cbiAgcmVtb3ZlSG9va3M6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3BhdGgub2ZmKCdtb3VzZWRvd24nLCB0aGlzLl9vbkRyYWdTdGFydCwgdGhpcyk7XG5cbiAgICB0aGlzLl9wYXRoLm9wdGlvbnMuY2xhc3NOYW1lID0gdGhpcy5fcGF0aC5vcHRpb25zLmNsYXNzTmFtZVxuICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cCgnXFxcXHMrJyArIEwuSGFuZGxlci5QYXRoRHJhZy5EUkFHR0lOR19DTFMpLCAnJyk7XG4gICAgaWYgKHRoaXMuX3BhdGguX3BhdGgpIHtcbiAgICAgIEwuRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl9wYXRoLl9wYXRoLCBMLkhhbmRsZXIuUGF0aERyYWcuRFJBR0dJTkdfQ0xTKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuICBtb3ZlZDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BhdGguX2RyYWdNb3ZlZDtcbiAgfSxcblxuICAvKipcbiAgICogU3RhcnQgZHJhZ1xuICAgKiBAcGFyYW0gIHtMLk1vdXNlRXZlbnR9IGV2dFxuICAgKi9cbiAgX29uRHJhZ1N0YXJ0OiBmdW5jdGlvbihldnQpIHtcbiAgICB2YXIgZXZlbnRUeXBlID0gZXZ0Lm9yaWdpbmFsRXZlbnQuX3NpbXVsYXRlZCA/ICd0b3VjaHN0YXJ0JyA6IGV2dC5vcmlnaW5hbEV2ZW50LnR5cGU7XG5cbiAgICB0aGlzLl9tYXBEcmFnZ2luZ1dhc0VuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9zdGFydFBvaW50ID0gZXZ0LmNvbnRhaW5lclBvaW50LmNsb25lKCk7XG4gICAgdGhpcy5fZHJhZ1N0YXJ0UG9pbnQgPSBldnQuY29udGFpbmVyUG9pbnQuY2xvbmUoKTtcbiAgICB0aGlzLl9tYXRyaXggPSBbMSwgMCwgMCwgMSwgMCwgMF07XG4gICAgTC5Eb21FdmVudC5zdG9wKGV2dC5vcmlnaW5hbEV2ZW50KTtcblxuICAgIEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9wYXRoLl9yZW5kZXJlci5fY29udGFpbmVyLCAnbGVhZmxldC1pbnRlcmFjdGl2ZScpO1xuICAgIEwuRG9tRXZlbnRcbiAgICAgIC5vbihkb2N1bWVudCwgTC5EcmFnZ2FibGUuTU9WRVtldmVudFR5cGVdLCB0aGlzLl9vbkRyYWcsIHRoaXMpXG4gICAgICAub24oZG9jdW1lbnQsIEwuRHJhZ2dhYmxlLkVORFtldmVudFR5cGVdLCB0aGlzLl9vbkRyYWdFbmQsIHRoaXMpO1xuXG4gICAgaWYgKHRoaXMuX3BhdGguX21hcC5kcmFnZ2luZy5lbmFibGVkKCkpIHtcbiAgICAgIC8vIEkgZ3Vlc3MgaXQncyByZXF1aXJlZCBiZWNhdXNlIG1vdXNkb3duIGdldHMgc2ltdWxhdGVkIHdpdGggYSBkZWxheVxuICAgICAgdGhpcy5fcGF0aC5fbWFwLmRyYWdnaW5nLl9kcmFnZ2FibGUuX29uVXAoKTtcblxuICAgICAgdGhpcy5fcGF0aC5fbWFwLmRyYWdnaW5nLmRpc2FibGUoKTtcbiAgICAgIHRoaXMuX21hcERyYWdnaW5nV2FzRW5hYmxlZCA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuX3BhdGguX2RyYWdNb3ZlZCA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMuX3BhdGguX3BvcHVwKSB7IC8vIHRoYXQgbWlnaHQgYmUgYSBjYXNlIG9uIHRvdWNoIGRldmljZXMgYXMgd2VsbFxuICAgICAgdGhpcy5fcGF0aC5fcG9wdXAuX2Nsb3NlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fcmVwbGFjZUNvb3JkR2V0dGVycyhldnQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEcmFnZ2luZ1xuICAgKiBAcGFyYW0gIHtMLk1vdXNlRXZlbnR9IGV2dFxuICAgKi9cbiAgX29uRHJhZzogZnVuY3Rpb24oZXZ0KSB7XG4gICAgTC5Eb21FdmVudC5zdG9wKGV2dCk7XG5cbiAgICB2YXIgZmlyc3QgPSAoZXZ0LnRvdWNoZXMgJiYgZXZ0LnRvdWNoZXMubGVuZ3RoID49IDEgPyBldnQudG91Y2hlc1swXSA6IGV2dCk7XG4gICAgdmFyIGNvbnRhaW5lclBvaW50ID0gdGhpcy5fcGF0aC5fbWFwLm1vdXNlRXZlbnRUb0NvbnRhaW5lclBvaW50KGZpcnN0KTtcblxuICAgIHZhciB4ID0gY29udGFpbmVyUG9pbnQueDtcbiAgICB2YXIgeSA9IGNvbnRhaW5lclBvaW50Lnk7XG5cbiAgICB2YXIgZHggPSB4IC0gdGhpcy5fc3RhcnRQb2ludC54O1xuICAgIHZhciBkeSA9IHkgLSB0aGlzLl9zdGFydFBvaW50Lnk7XG5cbiAgICBpZiAoIXRoaXMuX3BhdGguX2RyYWdNb3ZlZCAmJiAoZHggfHwgZHkpKSB7XG4gICAgICB0aGlzLl9wYXRoLl9kcmFnTW92ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fcGF0aC5maXJlKCdkcmFnc3RhcnQnLCBldnQpO1xuICAgICAgLy8gd2UgZG9uJ3Qgd2FudCB0aGF0IHRvIGhhcHBlbiBvbiBjbGlja1xuICAgICAgdGhpcy5fcGF0aC5icmluZ1RvRnJvbnQoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9tYXRyaXhbNF0gKz0gZHg7XG4gICAgdGhpcy5fbWF0cml4WzVdICs9IGR5O1xuXG4gICAgdGhpcy5fc3RhcnRQb2ludC54ID0geDtcbiAgICB0aGlzLl9zdGFydFBvaW50LnkgPSB5O1xuXG4gICAgdGhpcy5fcGF0aC5maXJlKCdwcmVkcmFnJywgZXZ0KTtcbiAgICB0aGlzLl9wYXRoLl90cmFuc2Zvcm0odGhpcy5fbWF0cml4KTtcbiAgICB0aGlzLl9wYXRoLmZpcmUoJ2RyYWcnLCBldnQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEcmFnZ2luZyBzdG9wcGVkLCBhcHBseVxuICAgKiBAcGFyYW0gIHtMLk1vdXNlRXZlbnR9IGV2dFxuICAgKi9cbiAgX29uRHJhZ0VuZDogZnVuY3Rpb24oZXZ0KSB7XG4gICAgTC5Eb21FdmVudC5zdG9wKGV2dCk7XG4gICAgTC5Eb21FdmVudC5fZmFrZVN0b3AoeyB0eXBlOiAnY2xpY2snIH0pO1xuXG4gICAgdmFyIGNvbnRhaW5lclBvaW50ID0gdGhpcy5fcGF0aC5fbWFwLm1vdXNlRXZlbnRUb0NvbnRhaW5lclBvaW50KGV2dCk7XG5cbiAgICAvLyBhcHBseSBtYXRyaXhcbiAgICBpZiAodGhpcy5tb3ZlZCgpKSB7XG4gICAgICB0aGlzLl90cmFuc2Zvcm1Qb2ludHModGhpcy5fbWF0cml4KTtcbiAgICAgIHRoaXMuX3BhdGguX3VwZGF0ZVBhdGgoKTtcbiAgICAgIHRoaXMuX3BhdGguX3Byb2plY3QoKTtcbiAgICAgIHRoaXMuX3BhdGguX3RyYW5zZm9ybShudWxsKTtcbiAgICB9XG5cbiAgICBMLkRvbUV2ZW50XG4gICAgICAub2ZmKGRvY3VtZW50LCAnbW91c2Vtb3ZlIHRvdWNobW92ZScsIHRoaXMuX29uRHJhZywgdGhpcylcbiAgICAgIC5vZmYoZG9jdW1lbnQsICdtb3VzZXVwIHRvdWNoZW5kJywgICAgdGhpcy5fb25EcmFnRW5kLCB0aGlzKTtcblxuICAgIHRoaXMuX3Jlc3RvcmVDb29yZEdldHRlcnMoKTtcbiAgICAvLyBjb25zaXN0ZW5jeVxuICAgIHRoaXMuX3BhdGguZmlyZSgnZHJhZ2VuZCcsIHtcbiAgICAgIGRpc3RhbmNlOiBNYXRoLnNxcnQoXG4gICAgICAgIEwuTGluZVV0aWwuX3NxRGlzdCh0aGlzLl9kcmFnU3RhcnRQb2ludCwgY29udGFpbmVyUG9pbnQpXG4gICAgICApXG4gICAgfSk7XG5cbiAgICB0aGlzLl9tYXRyaXggICAgICAgICA9IG51bGw7XG4gICAgdGhpcy5fc3RhcnRQb2ludCAgICAgPSBudWxsO1xuICAgIHRoaXMuX2RyYWdTdGFydFBvaW50ID0gbnVsbDtcblxuICAgIGlmICh0aGlzLl9tYXBEcmFnZ2luZ1dhc0VuYWJsZWQpIHtcbiAgICAgIHRoaXMuX3BhdGguX21hcC5kcmFnZ2luZy5lbmFibGUoKTtcbiAgICB9XG4gIH0sXG5cblxuICAvKipcbiAgICogQXBwbGllcyB0cmFuc2Zvcm1hdGlvbiwgZG9lcyBpdCBpbiBvbmUgc3dlZXAgZm9yIHBlcmZvcm1hbmNlLFxuICAgKiBzbyBkb24ndCBiZSBzdXJwcmlzZWQgYWJvdXQgdGhlIGNvZGUgcmVwZXRpdGlvbi5cbiAgICpcbiAgICogWyB4IF0gICBbIGEgIGIgIHR4IF0gWyB4IF0gICBbIGEgKiB4ICsgYiAqIHkgKyB0eCBdXG4gICAqIFsgeSBdID0gWyBjICBkICB0eSBdIFsgeSBdID0gWyBjICogeCArIGQgKiB5ICsgdHkgXVxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+fSBtYXRyaXhcbiAgICovXG4gIF90cmFuc2Zvcm1Qb2ludHM6IGZ1bmN0aW9uKG1hdHJpeCwgZGVzdCkge1xuICAgIHZhciBwYXRoID0gdGhpcy5fcGF0aDtcbiAgICB2YXIgaSwgbGVuLCBsYXRsbmc7XG5cbiAgICB2YXIgcHggPSBMLnBvaW50KG1hdHJpeFs0XSwgbWF0cml4WzVdKTtcblxuICAgIHZhciBjcnMgPSBwYXRoLl9tYXAub3B0aW9ucy5jcnM7XG4gICAgdmFyIHRyYW5zZm9ybWF0aW9uID0gY3JzLnRyYW5zZm9ybWF0aW9uO1xuICAgIHZhciBzY2FsZSA9IGNycy5zY2FsZShwYXRoLl9tYXAuZ2V0Wm9vbSgpKTtcbiAgICB2YXIgcHJvamVjdGlvbiA9IGNycy5wcm9qZWN0aW9uO1xuXG4gICAgdmFyIGRpZmYgPSB0cmFuc2Zvcm1hdGlvbi51bnRyYW5zZm9ybShweCwgc2NhbGUpXG4gICAgICAuc3VidHJhY3QodHJhbnNmb3JtYXRpb24udW50cmFuc2Zvcm0oTC5wb2ludCgwLCAwKSwgc2NhbGUpKTtcbiAgICB2YXIgYXBwbHlUcmFuc2Zvcm0gPSAhZGVzdDtcblxuICAgIHBhdGguX2JvdW5kcyA9IG5ldyBMLkxhdExuZ0JvdW5kcygpO1xuXG4gICAgLy8gY29uc29sZS50aW1lKCd0cmFuc2Zvcm0nKTtcbiAgICAvLyBhbGwgc2hpZnRzIGFyZSBpbi1wbGFjZVxuICAgIGlmIChwYXRoLl9wb2ludCkgeyAvLyBMLkNpcmNsZVxuICAgICAgZGVzdCA9IHByb2plY3Rpb24udW5wcm9qZWN0KFxuICAgICAgICBwcm9qZWN0aW9uLnByb2plY3QocGF0aC5fbGF0bG5nKS5fYWRkKGRpZmYpKTtcbiAgICAgIGlmIChhcHBseVRyYW5zZm9ybSkge1xuICAgICAgICBwYXRoLl9sYXRsbmcgPSBkZXN0O1xuICAgICAgICBwYXRoLl9wb2ludC5fYWRkKHB4KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHBhdGguX3JpbmdzIHx8IHBhdGguX3BhcnRzKSB7IC8vIGV2ZXJ5dGhpbmcgZWxzZVxuICAgICAgdmFyIHJpbmdzICAgPSBwYXRoLl9yaW5ncyB8fCBwYXRoLl9wYXJ0cztcbiAgICAgIHZhciBsYXRsbmdzID0gcGF0aC5fbGF0bG5ncztcbiAgICAgIGRlc3QgPSBkZXN0IHx8IGxhdGxuZ3M7XG4gICAgICBpZiAoIUwuVXRpbC5pc0FycmF5KGxhdGxuZ3NbMF0pKSB7IC8vIHBvbHlsaW5lXG4gICAgICAgIGxhdGxuZ3MgPSBbbGF0bG5nc107XG4gICAgICAgIGRlc3QgICAgPSBbZGVzdF07XG4gICAgICB9XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSByaW5ncy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBkZXN0W2ldID0gZGVzdFtpXSB8fCBbXTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDAsIGpqID0gcmluZ3NbaV0ubGVuZ3RoOyBqIDwgamo7IGorKykge1xuICAgICAgICAgIGxhdGxuZyAgICAgPSBsYXRsbmdzW2ldW2pdO1xuICAgICAgICAgIGRlc3RbaV1bal0gPSBwcm9qZWN0aW9uXG4gICAgICAgICAgICAudW5wcm9qZWN0KHByb2plY3Rpb24ucHJvamVjdChsYXRsbmcpLl9hZGQoZGlmZikpO1xuICAgICAgICAgIGlmIChhcHBseVRyYW5zZm9ybSkge1xuICAgICAgICAgICAgcGF0aC5fYm91bmRzLmV4dGVuZChsYXRsbmdzW2ldW2pdKTtcbiAgICAgICAgICAgIHJpbmdzW2ldW2pdLl9hZGQocHgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGVzdDtcbiAgICAvLyBjb25zb2xlLnRpbWVFbmQoJ3RyYW5zZm9ybScpO1xuICB9LFxuXG5cblxuICAvKipcbiAgICogSWYgeW91IHdhbnQgdG8gcmVhZCB0aGUgbGF0bG5ncyBkdXJpbmcgdGhlIGRyYWcgLSB5b3VyIHJpZ2h0LFxuICAgKiBidXQgdGhleSBoYXZlIHRvIGJlIHRyYW5zZm9ybWVkXG4gICAqL1xuICBfcmVwbGFjZUNvb3JkR2V0dGVyczogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX3BhdGguZ2V0TGF0TG5nKSB7IC8vIENpcmNsZSwgQ2lyY2xlTWFya2VyXG4gICAgICB0aGlzLl9wYXRoLmdldExhdExuZ18gPSB0aGlzLl9wYXRoLmdldExhdExuZztcbiAgICAgIHRoaXMuX3BhdGguZ2V0TGF0TG5nID0gTC5VdGlsLmJpbmQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRyYWdnaW5nLl90cmFuc2Zvcm1Qb2ludHModGhpcy5kcmFnZ2luZy5fbWF0cml4LCB7fSk7XG4gICAgICB9LCB0aGlzLl9wYXRoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3BhdGguZ2V0TGF0TG5ncykge1xuICAgICAgdGhpcy5fcGF0aC5nZXRMYXRMbmdzXyA9IHRoaXMuX3BhdGguZ2V0TGF0TG5ncztcbiAgICAgIHRoaXMuX3BhdGguZ2V0TGF0TG5ncyA9IEwuVXRpbC5iaW5kKGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kcmFnZ2luZy5fdHJhbnNmb3JtUG9pbnRzKHRoaXMuZHJhZ2dpbmcuX21hdHJpeCwgW10pO1xuICAgICAgfSwgdGhpcy5fcGF0aCk7XG4gICAgfVxuICB9LFxuXG5cbiAgLyoqXG4gICAqIFB1dCBiYWNrIHRoZSBnZXR0ZXJzXG4gICAqL1xuICBfcmVzdG9yZUNvb3JkR2V0dGVyczogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX3BhdGguZ2V0TGF0TG5nXykge1xuICAgICAgdGhpcy5fcGF0aC5nZXRMYXRMbmcgPSB0aGlzLl9wYXRoLmdldExhdExuZ187XG4gICAgICBkZWxldGUgdGhpcy5fcGF0aC5nZXRMYXRMbmdfO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fcGF0aC5nZXRMYXRMbmdzXykge1xuICAgICAgdGhpcy5fcGF0aC5nZXRMYXRMbmdzID0gdGhpcy5fcGF0aC5nZXRMYXRMbmdzXztcbiAgICAgIGRlbGV0ZSB0aGlzLl9wYXRoLmdldExhdExuZ3NfO1xuICAgIH1cbiAgfVxuXG59KTtcblxuXG4vKipcbiAqIEBwYXJhbSAge0wuUGF0aH0gbGF5ZXJcbiAqIEByZXR1cm4ge0wuUGF0aH1cbiAqL1xuTC5IYW5kbGVyLlBhdGhEcmFnLm1ha2VEcmFnZ2FibGUgPSBmdW5jdGlvbihsYXllcikge1xuICBsYXllci5kcmFnZ2luZyA9IG5ldyBMLkhhbmRsZXIuUGF0aERyYWcobGF5ZXIpO1xuICByZXR1cm4gbGF5ZXI7XG59O1xuXG5cbi8qKlxuICogQWxzbyBleHBvc2UgYXMgYSBtZXRob2RcbiAqIEByZXR1cm4ge0wuUGF0aH1cbiAqL1xuTC5QYXRoLnByb3RvdHlwZS5tYWtlRHJhZ2dhYmxlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBMLkhhbmRsZXIuUGF0aERyYWcubWFrZURyYWdnYWJsZSh0aGlzKTtcbn07XG5cblxuTC5QYXRoLmFkZEluaXRIb29rKGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5vcHRpb25zLmRyYWdnYWJsZSkge1xuICAgIC8vIGVuc3VyZSBpbnRlcmFjdGl2ZVxuICAgIHRoaXMub3B0aW9ucy5pbnRlcmFjdGl2ZSA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgdGhpcy5kcmFnZ2luZy5lbmFibGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgTC5IYW5kbGVyLlBhdGhEcmFnLm1ha2VEcmFnZ2FibGUodGhpcyk7XG4gICAgICB0aGlzLmRyYWdnaW5nLmVuYWJsZSgpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgdGhpcy5kcmFnZ2luZy5kaXNhYmxlKCk7XG4gIH1cbn0pO1xuIiwiLyoqXG4gKiBMZWFmbGV0IHZlY3RvciBmZWF0dXJlcyBkcmFnIGZ1bmN0aW9uYWxpdHlcbiAqIEBhdXRob3IgQWxleGFuZGVyIE1pbGV2c2tpIDxpbmZvQHc4ci5uYW1lPlxuICogQHByZXNlcnZlXG4gKi9cblxuLyoqXG4gKiBNYXRyaXggdHJhbnNmb3JtIHBhdGggZm9yIFNWRy9WTUxcbiAqIFJlbmRlcmVyLWluZGVwZW5kZW50XG4gKi9cbkwuUGF0aC5pbmNsdWRlKHtcblxuXHQvKipcblx0ICogQXBwbGllcyBtYXRyaXggdHJhbnNmb3JtYXRpb24gdG8gU1ZHXG5cdCAqIEBwYXJhbSB7QXJyYXkuPE51bWJlcj4/fSBtYXRyaXhcblx0ICovXG5cdF90cmFuc2Zvcm06IGZ1bmN0aW9uKG1hdHJpeCkge1xuXHRcdGlmICh0aGlzLl9yZW5kZXJlcikge1xuXHRcdFx0aWYgKG1hdHJpeCkge1xuXHRcdFx0XHR0aGlzLl9yZW5kZXJlci50cmFuc2Zvcm1QYXRoKHRoaXMsIG1hdHJpeCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyByZXNldCB0cmFuc2Zvcm0gbWF0cml4XG5cdFx0XHRcdHRoaXMuX3JlbmRlcmVyLl9yZXNldFRyYW5zZm9ybVBhdGgodGhpcyk7XG5cdFx0XHRcdHRoaXMuX3VwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHQvKipcblx0ICogQ2hlY2sgaWYgdGhlIGZlYXR1cmUgd2FzIGRyYWdnZWQsIHRoYXQnbGwgc3VwcmVzcyB0aGUgY2xpY2sgZXZlbnRcblx0ICogb24gbW91c2V1cC4gVGhhdCBmaXhlcyBwb3B1cHMgZm9yIGV4YW1wbGVcblx0ICpcblx0ICogQHBhcmFtICB7TW91c2VFdmVudH0gZVxuXHQgKi9cblx0X29uTW91c2VDbGljazogZnVuY3Rpb24oZSkge1xuXHRcdGlmICgodGhpcy5kcmFnZ2luZyAmJiB0aGlzLmRyYWdnaW5nLm1vdmVkKCkpIHx8XG5cdFx0XHQodGhpcy5fbWFwLmRyYWdnaW5nICYmIHRoaXMuX21hcC5kcmFnZ2luZy5tb3ZlZCgpKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRoaXMuX2ZpcmVNb3VzZUV2ZW50KGUpO1xuXHR9XG5cbn0pO1xuIiwiTC5TVkcuaW5jbHVkZSghTC5Ccm93c2VyLnZtbCA/IHt9IDoge1xuXG5cdC8qKlxuXHQgKiBSZXNldCB0cmFuc2Zvcm0gbWF0cml4XG5cdCAqL1xuXHRfcmVzZXRUcmFuc2Zvcm1QYXRoOiBmdW5jdGlvbihsYXllcikge1xuXHRcdGlmIChsYXllci5fc2tldykge1xuXHRcdFx0Ly8gc3VwZXIgaW1wb3J0YW50ISB3b3JrYXJvdW5kIGZvciBhICdqdW1waW5nJyBnbGl0Y2g6XG5cdFx0XHQvLyBkaXNhYmxlIHRyYW5zZm9ybSBiZWZvcmUgcmVtb3ZpbmcgaXRcblx0XHRcdGxheWVyLl9za2V3Lm9uID0gZmFsc2U7XG5cdFx0XHRsYXllci5fcGF0aC5yZW1vdmVDaGlsZChsYXllci5fc2tldyk7XG5cdFx0XHRsYXllci5fc2tldyA9IG51bGw7XG5cdFx0fVxuXHR9LFxuXG5cdC8qKlxuXHQgKiBBcHBsaWVzIG1hdHJpeCB0cmFuc2Zvcm1hdGlvbiB0byBWTUxcblx0ICogQHBhcmFtIHtMLlBhdGh9ICAgICAgICAgbGF5ZXJcblx0ICogQHBhcmFtIHtBcnJheS48TnVtYmVyPn0gbWF0cml4XG5cdCAqL1xuXHR0cmFuc2Zvcm1QYXRoOiBmdW5jdGlvbihsYXllciwgbWF0cml4KSB7XG5cdFx0dmFyIHNrZXcgPSBsYXllci5fc2tldztcblxuXHRcdGlmICghc2tldykge1xuXHRcdFx0c2tldyA9IEwuU1ZHLmNyZWF0ZSgnc2tldycpO1xuXHRcdFx0bGF5ZXIuX3BhdGguYXBwZW5kQ2hpbGQoc2tldyk7XG5cdFx0XHRza2V3LnN0eWxlLmJlaGF2aW9yID0gJ3VybCgjZGVmYXVsdCNWTUwpJztcblx0XHRcdGxheWVyLl9za2V3ID0gc2tldztcblx0XHR9XG5cblx0XHQvLyBoYW5kbGUgc2tldy90cmFuc2xhdGUgc2VwYXJhdGVseSwgY2F1c2UgaXQncyBicm9rZW5cblx0XHR2YXIgbXQgPSBtYXRyaXhbMF0udG9GaXhlZCg4KSArICcgJyArIG1hdHJpeFsxXS50b0ZpeGVkKDgpICsgJyAnICtcblx0XHRcdG1hdHJpeFsyXS50b0ZpeGVkKDgpICsgJyAnICsgbWF0cml4WzNdLnRvRml4ZWQoOCkgKyAnIDAgMCc7XG5cdFx0dmFyIG9mZnNldCA9IE1hdGguZmxvb3IobWF0cml4WzRdKS50b0ZpeGVkKCkgKyAnLCAnICtcblx0XHRcdE1hdGguZmxvb3IobWF0cml4WzVdKS50b0ZpeGVkKCkgKyAnJztcblxuXHRcdHZhciBzID0gdGhpcy5fcGF0aC5zdHlsZTtcblx0XHR2YXIgbCA9IHBhcnNlRmxvYXQocy5sZWZ0KTtcblx0XHR2YXIgdCA9IHBhcnNlRmxvYXQocy50b3ApO1xuXHRcdHZhciB3ID0gcGFyc2VGbG9hdChzLndpZHRoKTtcblx0XHR2YXIgaCA9IHBhcnNlRmxvYXQocy5oZWlnaHQpO1xuXG5cdFx0aWYgKGlzTmFOKGwpKSB7IGwgPSAwOyB9XG5cdFx0aWYgKGlzTmFOKHQpKSB7IHQgPSAwOyB9XG5cdFx0aWYgKGlzTmFOKHcpIHx8ICF3KSB7IHcgPSAxOyB9XG5cdFx0aWYgKGlzTmFOKGgpIHx8ICFoKSB7IGggPSAxOyB9XG5cblx0XHR2YXIgb3JpZ2luID0gKC1sIC8gdyAtIDAuNSkudG9GaXhlZCg4KSArICcgJyArICgtdCAvIGggLSAwLjUpLnRvRml4ZWQoOCk7XG5cblx0XHRza2V3Lm9uID0gJ2YnO1xuXHRcdHNrZXcubWF0cml4ID0gbXQ7XG5cdFx0c2tldy5vcmlnaW4gPSBvcmlnaW47XG5cdFx0c2tldy5vZmZzZXQgPSBvZmZzZXQ7XG5cdFx0c2tldy5vbiA9IHRydWU7XG5cdH1cblxufSk7XG4iLCJMLlNWRy5pbmNsdWRlKHtcblxuXHQvKipcblx0ICogUmVzZXQgdHJhbnNmb3JtIG1hdHJpeFxuXHQgKi9cblx0X3Jlc2V0VHJhbnNmb3JtUGF0aDogZnVuY3Rpb24obGF5ZXIpIHtcblx0XHRsYXllci5fcGF0aC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAndHJhbnNmb3JtJywgJycpO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBBcHBsaWVzIG1hdHJpeCB0cmFuc2Zvcm1hdGlvbiB0byBTVkdcblx0ICogQHBhcmFtIHtMLlBhdGh9ICAgICAgICAgbGF5ZXJcblx0ICogQHBhcmFtIHtBcnJheS48TnVtYmVyPn0gbWF0cml4XG5cdCAqL1xuXHR0cmFuc2Zvcm1QYXRoOiBmdW5jdGlvbihsYXllciwgbWF0cml4KSB7XG5cdFx0bGF5ZXIuX3BhdGguc2V0QXR0cmlidXRlTlMobnVsbCwgJ3RyYW5zZm9ybScsXG5cdFx0XHQnbWF0cml4KCcgKyBtYXRyaXguam9pbignICcpICsgJyknKTtcblx0fVxuXG59KTtcbiIsIi8qXG4gTGVhZmxldCAxLjAuMC1iZXRhLjIgKDU1ZmU0NjIpLCBhIEpTIGxpYnJhcnkgZm9yIGludGVyYWN0aXZlIG1hcHMuIGh0dHA6Ly9sZWFmbGV0anMuY29tXG4gKGMpIDIwMTAtMjAxNSBWbGFkaW1pciBBZ2Fmb25raW4sIChjKSAyMDEwLTIwMTEgQ2xvdWRNYWRlXG4qL1xuKGZ1bmN0aW9uICh3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcclxudmFyIEwgPSB7XHJcblx0dmVyc2lvbjogJzEuMC4wLWJldGEuMidcclxufTtcclxuXHJcbmZ1bmN0aW9uIGV4cG9zZSgpIHtcclxuXHR2YXIgb2xkTCA9IHdpbmRvdy5MO1xyXG5cclxuXHRMLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR3aW5kb3cuTCA9IG9sZEw7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHR3aW5kb3cuTCA9IEw7XHJcbn1cclxuXHJcbi8vIGRlZmluZSBMZWFmbGV0IGZvciBOb2RlIG1vZHVsZSBwYXR0ZXJuIGxvYWRlcnMsIGluY2x1ZGluZyBCcm93c2VyaWZ5XHJcbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XHJcblx0bW9kdWxlLmV4cG9ydHMgPSBMO1xyXG5cclxuLy8gZGVmaW5lIExlYWZsZXQgYXMgYW4gQU1EIG1vZHVsZVxyXG59IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xyXG5cdGRlZmluZShMKTtcclxufVxyXG5cclxuLy8gZGVmaW5lIExlYWZsZXQgYXMgYSBnbG9iYWwgTCB2YXJpYWJsZSwgc2F2aW5nIHRoZSBvcmlnaW5hbCBMIHRvIHJlc3RvcmUgbGF0ZXIgaWYgbmVlZGVkXHJcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG5cdGV4cG9zZSgpO1xyXG59XHJcblxuXG5cbi8qXHJcbiAqIEwuVXRpbCBjb250YWlucyB2YXJpb3VzIHV0aWxpdHkgZnVuY3Rpb25zIHVzZWQgdGhyb3VnaG91dCBMZWFmbGV0IGNvZGUuXHJcbiAqL1xyXG5cclxuTC5VdGlsID0ge1xyXG5cdC8vIGV4dGVuZCBhbiBvYmplY3Qgd2l0aCBwcm9wZXJ0aWVzIG9mIG9uZSBvciBtb3JlIG90aGVyIG9iamVjdHNcclxuXHRleHRlbmQ6IGZ1bmN0aW9uIChkZXN0KSB7XHJcblx0XHR2YXIgaSwgaiwgbGVuLCBzcmM7XHJcblxyXG5cdFx0Zm9yIChqID0gMSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XHJcblx0XHRcdHNyYyA9IGFyZ3VtZW50c1tqXTtcclxuXHRcdFx0Zm9yIChpIGluIHNyYykge1xyXG5cdFx0XHRcdGRlc3RbaV0gPSBzcmNbaV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBkZXN0O1xyXG5cdH0sXHJcblxyXG5cdC8vIGNyZWF0ZSBhbiBvYmplY3QgZnJvbSBhIGdpdmVuIHByb3RvdHlwZVxyXG5cdGNyZWF0ZTogT2JqZWN0LmNyZWF0ZSB8fCAoZnVuY3Rpb24gKCkge1xyXG5cdFx0ZnVuY3Rpb24gRigpIHt9XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKHByb3RvKSB7XHJcblx0XHRcdEYucHJvdG90eXBlID0gcHJvdG87XHJcblx0XHRcdHJldHVybiBuZXcgRigpO1xyXG5cdFx0fTtcclxuXHR9KSgpLFxyXG5cclxuXHQvLyBiaW5kIGEgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdpdGggYSBnaXZlbiBjb250ZXh0XHJcblx0YmluZDogZnVuY3Rpb24gKGZuLCBvYmopIHtcclxuXHRcdHZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcclxuXHJcblx0XHRpZiAoZm4uYmluZCkge1xyXG5cdFx0XHRyZXR1cm4gZm4uYmluZC5hcHBseShmbiwgc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcclxuXHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gZm4uYXBwbHkob2JqLCBhcmdzLmxlbmd0aCA/IGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSkgOiBhcmd1bWVudHMpO1xyXG5cdFx0fTtcclxuXHR9LFxyXG5cclxuXHQvLyByZXR1cm4gdW5pcXVlIElEIG9mIGFuIG9iamVjdFxyXG5cdHN0YW1wOiBmdW5jdGlvbiAob2JqKSB7XHJcblx0XHQvKmVzbGludC1kaXNhYmxlICovXHJcblx0XHRvYmouX2xlYWZsZXRfaWQgPSBvYmouX2xlYWZsZXRfaWQgfHwgKytMLlV0aWwubGFzdElkO1xyXG5cdFx0cmV0dXJuIG9iai5fbGVhZmxldF9pZDtcclxuXHRcdC8qZXNsaW50LWVuYWJsZSAqL1xyXG5cdH0sXHJcblxyXG5cdGxhc3RJZDogMCxcclxuXHJcblx0Ly8gcmV0dXJuIGEgZnVuY3Rpb24gdGhhdCB3b24ndCBiZSBjYWxsZWQgbW9yZSBvZnRlbiB0aGFuIHRoZSBnaXZlbiBpbnRlcnZhbFxyXG5cdHRocm90dGxlOiBmdW5jdGlvbiAoZm4sIHRpbWUsIGNvbnRleHQpIHtcclxuXHRcdHZhciBsb2NrLCBhcmdzLCB3cmFwcGVyRm4sIGxhdGVyO1xyXG5cclxuXHRcdGxhdGVyID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQvLyByZXNldCBsb2NrIGFuZCBjYWxsIGlmIHF1ZXVlZFxyXG5cdFx0XHRsb2NrID0gZmFsc2U7XHJcblx0XHRcdGlmIChhcmdzKSB7XHJcblx0XHRcdFx0d3JhcHBlckZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG5cdFx0XHRcdGFyZ3MgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHR3cmFwcGVyRm4gPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmIChsb2NrKSB7XHJcblx0XHRcdFx0Ly8gY2FsbGVkIHRvbyBzb29uLCBxdWV1ZSB0byBjYWxsIGxhdGVyXHJcblx0XHRcdFx0YXJncyA9IGFyZ3VtZW50cztcclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8gY2FsbCBhbmQgbG9jayB1bnRpbCBsYXRlclxyXG5cdFx0XHRcdGZuLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyk7XHJcblx0XHRcdFx0c2V0VGltZW91dChsYXRlciwgdGltZSk7XHJcblx0XHRcdFx0bG9jayA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIHdyYXBwZXJGbjtcclxuXHR9LFxyXG5cclxuXHQvLyB3cmFwIHRoZSBnaXZlbiBudW1iZXIgdG8gbGllIHdpdGhpbiBhIGNlcnRhaW4gcmFuZ2UgKHVzZWQgZm9yIHdyYXBwaW5nIGxvbmdpdHVkZSlcclxuXHR3cmFwTnVtOiBmdW5jdGlvbiAoeCwgcmFuZ2UsIGluY2x1ZGVNYXgpIHtcclxuXHRcdHZhciBtYXggPSByYW5nZVsxXSxcclxuXHRcdCAgICBtaW4gPSByYW5nZVswXSxcclxuXHRcdCAgICBkID0gbWF4IC0gbWluO1xyXG5cdFx0cmV0dXJuIHggPT09IG1heCAmJiBpbmNsdWRlTWF4ID8geCA6ICgoeCAtIG1pbikgJSBkICsgZCkgJSBkICsgbWluO1xyXG5cdH0sXHJcblxyXG5cdC8vIGRvIG5vdGhpbmcgKHVzZWQgYXMgYSBub29wIHRocm91Z2hvdXQgdGhlIGNvZGUpXHJcblx0ZmFsc2VGbjogZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH0sXHJcblxyXG5cdC8vIHJvdW5kIGEgZ2l2ZW4gbnVtYmVyIHRvIGEgZ2l2ZW4gcHJlY2lzaW9uXHJcblx0Zm9ybWF0TnVtOiBmdW5jdGlvbiAobnVtLCBkaWdpdHMpIHtcclxuXHRcdHZhciBwb3cgPSBNYXRoLnBvdygxMCwgZGlnaXRzIHx8IDUpO1xyXG5cdFx0cmV0dXJuIE1hdGgucm91bmQobnVtICogcG93KSAvIHBvdztcclxuXHR9LFxyXG5cclxuXHQvLyB0cmltIHdoaXRlc3BhY2UgZnJvbSBib3RoIHNpZGVzIG9mIGEgc3RyaW5nXHJcblx0dHJpbTogZnVuY3Rpb24gKHN0cikge1xyXG5cdFx0cmV0dXJuIHN0ci50cmltID8gc3RyLnRyaW0oKSA6IHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XHJcblx0fSxcclxuXHJcblx0Ly8gc3BsaXQgYSBzdHJpbmcgaW50byB3b3Jkc1xyXG5cdHNwbGl0V29yZHM6IGZ1bmN0aW9uIChzdHIpIHtcclxuXHRcdHJldHVybiBMLlV0aWwudHJpbShzdHIpLnNwbGl0KC9cXHMrLyk7XHJcblx0fSxcclxuXHJcblx0Ly8gc2V0IG9wdGlvbnMgdG8gYW4gb2JqZWN0LCBpbmhlcml0aW5nIHBhcmVudCdzIG9wdGlvbnMgYXMgd2VsbFxyXG5cdHNldE9wdGlvbnM6IGZ1bmN0aW9uIChvYmosIG9wdGlvbnMpIHtcclxuXHRcdGlmICghb2JqLmhhc093blByb3BlcnR5KCdvcHRpb25zJykpIHtcclxuXHRcdFx0b2JqLm9wdGlvbnMgPSBvYmoub3B0aW9ucyA/IEwuVXRpbC5jcmVhdGUob2JqLm9wdGlvbnMpIDoge307XHJcblx0XHR9XHJcblx0XHRmb3IgKHZhciBpIGluIG9wdGlvbnMpIHtcclxuXHRcdFx0b2JqLm9wdGlvbnNbaV0gPSBvcHRpb25zW2ldO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG9iai5vcHRpb25zO1xyXG5cdH0sXHJcblxyXG5cdC8vIG1ha2UgYSBVUkwgd2l0aCBHRVQgcGFyYW1ldGVycyBvdXQgb2YgYSBzZXQgb2YgcHJvcGVydGllcy92YWx1ZXNcclxuXHRnZXRQYXJhbVN0cmluZzogZnVuY3Rpb24gKG9iaiwgZXhpc3RpbmdVcmwsIHVwcGVyY2FzZSkge1xyXG5cdFx0dmFyIHBhcmFtcyA9IFtdO1xyXG5cdFx0Zm9yICh2YXIgaSBpbiBvYmopIHtcclxuXHRcdFx0cGFyYW1zLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KHVwcGVyY2FzZSA/IGkudG9VcHBlckNhc2UoKSA6IGkpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtpXSkpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuICgoIWV4aXN0aW5nVXJsIHx8IGV4aXN0aW5nVXJsLmluZGV4T2YoJz8nKSA9PT0gLTEpID8gJz8nIDogJyYnKSArIHBhcmFtcy5qb2luKCcmJyk7XHJcblx0fSxcclxuXHJcblx0Ly8gc3VwZXItc2ltcGxlIHRlbXBsYXRpbmcgZmFjaWxpdHksIHVzZWQgZm9yIFRpbGVMYXllciBVUkxzXHJcblx0dGVtcGxhdGU6IGZ1bmN0aW9uIChzdHIsIGRhdGEpIHtcclxuXHRcdHJldHVybiBzdHIucmVwbGFjZShMLlV0aWwudGVtcGxhdGVSZSwgZnVuY3Rpb24gKHN0ciwga2V5KSB7XHJcblx0XHRcdHZhciB2YWx1ZSA9IGRhdGFba2V5XTtcclxuXHJcblx0XHRcdGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdObyB2YWx1ZSBwcm92aWRlZCBmb3IgdmFyaWFibGUgJyArIHN0cik7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdHZhbHVlID0gdmFsdWUoZGF0YSk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHZhbHVlO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0dGVtcGxhdGVSZTogL1xceyAqKFtcXHdfXSspICpcXH0vZyxcclxuXHJcblx0aXNBcnJheTogQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAob2JqKSB7XHJcblx0XHRyZXR1cm4gKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nKTtcclxuXHR9LFxyXG5cclxuXHRpbmRleE9mOiBmdW5jdGlvbiAoYXJyYXksIGVsKSB7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmIChhcnJheVtpXSA9PT0gZWwpIHsgcmV0dXJuIGk7IH1cclxuXHRcdH1cclxuXHRcdHJldHVybiAtMTtcclxuXHR9LFxyXG5cclxuXHQvLyBtaW5pbWFsIGltYWdlIFVSSSwgc2V0IHRvIGFuIGltYWdlIHdoZW4gZGlzcG9zaW5nIHRvIGZsdXNoIG1lbW9yeVxyXG5cdGVtcHR5SW1hZ2VVcmw6ICdkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhBUUFCQUFEL0FDd0FBQUFBQVFBQkFBQUNBRHM9J1xyXG59O1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuXHQvLyBpbnNwaXJlZCBieSBodHRwOi8vcGF1bGlyaXNoLmNvbS8yMDExL3JlcXVlc3RhbmltYXRpb25mcmFtZS1mb3Itc21hcnQtYW5pbWF0aW5nL1xyXG5cclxuXHRmdW5jdGlvbiBnZXRQcmVmaXhlZChuYW1lKSB7XHJcblx0XHRyZXR1cm4gd2luZG93Wyd3ZWJraXQnICsgbmFtZV0gfHwgd2luZG93Wydtb3onICsgbmFtZV0gfHwgd2luZG93WydtcycgKyBuYW1lXTtcclxuXHR9XHJcblxyXG5cdHZhciBsYXN0VGltZSA9IDA7XHJcblxyXG5cdC8vIGZhbGxiYWNrIGZvciBJRSA3LThcclxuXHRmdW5jdGlvbiB0aW1lb3V0RGVmZXIoZm4pIHtcclxuXHRcdHZhciB0aW1lID0gK25ldyBEYXRlKCksXHJcblx0XHQgICAgdGltZVRvQ2FsbCA9IE1hdGgubWF4KDAsIDE2IC0gKHRpbWUgLSBsYXN0VGltZSkpO1xyXG5cclxuXHRcdGxhc3RUaW1lID0gdGltZSArIHRpbWVUb0NhbGw7XHJcblx0XHRyZXR1cm4gd2luZG93LnNldFRpbWVvdXQoZm4sIHRpbWVUb0NhbGwpO1xyXG5cdH1cclxuXHJcblx0dmFyIHJlcXVlc3RGbiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgZ2V0UHJlZml4ZWQoJ1JlcXVlc3RBbmltYXRpb25GcmFtZScpIHx8IHRpbWVvdXREZWZlcixcclxuXHQgICAgY2FuY2VsRm4gPSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgZ2V0UHJlZml4ZWQoJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJykgfHxcclxuXHQgICAgICAgICAgICAgICBnZXRQcmVmaXhlZCgnQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lJykgfHwgZnVuY3Rpb24gKGlkKSB7IHdpbmRvdy5jbGVhclRpbWVvdXQoaWQpOyB9O1xyXG5cclxuXHJcblx0TC5VdGlsLnJlcXVlc3RBbmltRnJhbWUgPSBmdW5jdGlvbiAoZm4sIGNvbnRleHQsIGltbWVkaWF0ZSkge1xyXG5cdFx0aWYgKGltbWVkaWF0ZSAmJiByZXF1ZXN0Rm4gPT09IHRpbWVvdXREZWZlcikge1xyXG5cdFx0XHRmbi5jYWxsKGNvbnRleHQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIHJlcXVlc3RGbi5jYWxsKHdpbmRvdywgTC5iaW5kKGZuLCBjb250ZXh0KSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0TC5VdGlsLmNhbmNlbEFuaW1GcmFtZSA9IGZ1bmN0aW9uIChpZCkge1xyXG5cdFx0aWYgKGlkKSB7XHJcblx0XHRcdGNhbmNlbEZuLmNhbGwod2luZG93LCBpZCk7XHJcblx0XHR9XHJcblx0fTtcclxufSkoKTtcclxuXHJcbi8vIHNob3J0Y3V0cyBmb3IgbW9zdCB1c2VkIHV0aWxpdHkgZnVuY3Rpb25zXHJcbkwuZXh0ZW5kID0gTC5VdGlsLmV4dGVuZDtcclxuTC5iaW5kID0gTC5VdGlsLmJpbmQ7XHJcbkwuc3RhbXAgPSBMLlV0aWwuc3RhbXA7XHJcbkwuc2V0T3B0aW9ucyA9IEwuVXRpbC5zZXRPcHRpb25zO1xyXG5cblxuXG4vKlxyXG4gKiBMLkNsYXNzIHBvd2VycyB0aGUgT09QIGZhY2lsaXRpZXMgb2YgdGhlIGxpYnJhcnkuXHJcbiAqIFRoYW5rcyB0byBKb2huIFJlc2lnIGFuZCBEZWFuIEVkd2FyZHMgZm9yIGluc3BpcmF0aW9uIVxyXG4gKi9cclxuXHJcbkwuQ2xhc3MgPSBmdW5jdGlvbiAoKSB7fTtcclxuXHJcbkwuQ2xhc3MuZXh0ZW5kID0gZnVuY3Rpb24gKHByb3BzKSB7XHJcblxyXG5cdC8vIGV4dGVuZGVkIGNsYXNzIHdpdGggdGhlIG5ldyBwcm90b3R5cGVcclxuXHR2YXIgTmV3Q2xhc3MgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0Ly8gY2FsbCB0aGUgY29uc3RydWN0b3JcclxuXHRcdGlmICh0aGlzLmluaXRpYWxpemUpIHtcclxuXHRcdFx0dGhpcy5pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gY2FsbCBhbGwgY29uc3RydWN0b3IgaG9va3NcclxuXHRcdHRoaXMuY2FsbEluaXRIb29rcygpO1xyXG5cdH07XHJcblxyXG5cdHZhciBwYXJlbnRQcm90byA9IE5ld0NsYXNzLl9fc3VwZXJfXyA9IHRoaXMucHJvdG90eXBlO1xyXG5cclxuXHR2YXIgcHJvdG8gPSBMLlV0aWwuY3JlYXRlKHBhcmVudFByb3RvKTtcclxuXHRwcm90by5jb25zdHJ1Y3RvciA9IE5ld0NsYXNzO1xyXG5cclxuXHROZXdDbGFzcy5wcm90b3R5cGUgPSBwcm90bztcclxuXHJcblx0Ly8gaW5oZXJpdCBwYXJlbnQncyBzdGF0aWNzXHJcblx0Zm9yICh2YXIgaSBpbiB0aGlzKSB7XHJcblx0XHRpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShpKSAmJiBpICE9PSAncHJvdG90eXBlJykge1xyXG5cdFx0XHROZXdDbGFzc1tpXSA9IHRoaXNbaV07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBtaXggc3RhdGljIHByb3BlcnRpZXMgaW50byB0aGUgY2xhc3NcclxuXHRpZiAocHJvcHMuc3RhdGljcykge1xyXG5cdFx0TC5leHRlbmQoTmV3Q2xhc3MsIHByb3BzLnN0YXRpY3MpO1xyXG5cdFx0ZGVsZXRlIHByb3BzLnN0YXRpY3M7XHJcblx0fVxyXG5cclxuXHQvLyBtaXggaW5jbHVkZXMgaW50byB0aGUgcHJvdG90eXBlXHJcblx0aWYgKHByb3BzLmluY2x1ZGVzKSB7XHJcblx0XHRMLlV0aWwuZXh0ZW5kLmFwcGx5KG51bGwsIFtwcm90b10uY29uY2F0KHByb3BzLmluY2x1ZGVzKSk7XHJcblx0XHRkZWxldGUgcHJvcHMuaW5jbHVkZXM7XHJcblx0fVxyXG5cclxuXHQvLyBtZXJnZSBvcHRpb25zXHJcblx0aWYgKHByb3RvLm9wdGlvbnMpIHtcclxuXHRcdHByb3BzLm9wdGlvbnMgPSBMLlV0aWwuZXh0ZW5kKEwuVXRpbC5jcmVhdGUocHJvdG8ub3B0aW9ucyksIHByb3BzLm9wdGlvbnMpO1xyXG5cdH1cclxuXHJcblx0Ly8gbWl4IGdpdmVuIHByb3BlcnRpZXMgaW50byB0aGUgcHJvdG90eXBlXHJcblx0TC5leHRlbmQocHJvdG8sIHByb3BzKTtcclxuXHJcblx0cHJvdG8uX2luaXRIb29rcyA9IFtdO1xyXG5cclxuXHQvLyBhZGQgbWV0aG9kIGZvciBjYWxsaW5nIGFsbCBob29rc1xyXG5cdHByb3RvLmNhbGxJbml0SG9va3MgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2luaXRIb29rc0NhbGxlZCkgeyByZXR1cm47IH1cclxuXHJcblx0XHRpZiAocGFyZW50UHJvdG8uY2FsbEluaXRIb29rcykge1xyXG5cdFx0XHRwYXJlbnRQcm90by5jYWxsSW5pdEhvb2tzLmNhbGwodGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5faW5pdEhvb2tzQ2FsbGVkID0gdHJ1ZTtcclxuXHJcblx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gcHJvdG8uX2luaXRIb29rcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRwcm90by5faW5pdEhvb2tzW2ldLmNhbGwodGhpcyk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0cmV0dXJuIE5ld0NsYXNzO1xyXG59O1xyXG5cclxuXHJcbi8vIG1ldGhvZCBmb3IgYWRkaW5nIHByb3BlcnRpZXMgdG8gcHJvdG90eXBlXHJcbkwuQ2xhc3MuaW5jbHVkZSA9IGZ1bmN0aW9uIChwcm9wcykge1xyXG5cdEwuZXh0ZW5kKHRoaXMucHJvdG90eXBlLCBwcm9wcyk7XHJcbn07XHJcblxyXG4vLyBtZXJnZSBuZXcgZGVmYXVsdCBvcHRpb25zIHRvIHRoZSBDbGFzc1xyXG5MLkNsYXNzLm1lcmdlT3B0aW9ucyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcblx0TC5leHRlbmQodGhpcy5wcm90b3R5cGUub3B0aW9ucywgb3B0aW9ucyk7XHJcbn07XHJcblxyXG4vLyBhZGQgYSBjb25zdHJ1Y3RvciBob29rXHJcbkwuQ2xhc3MuYWRkSW5pdEhvb2sgPSBmdW5jdGlvbiAoZm4pIHsgLy8gKEZ1bmN0aW9uKSB8fCAoU3RyaW5nLCBhcmdzLi4uKVxyXG5cdHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcclxuXHJcblx0dmFyIGluaXQgPSB0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicgPyBmbiA6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXNbZm5dLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG5cdH07XHJcblxyXG5cdHRoaXMucHJvdG90eXBlLl9pbml0SG9va3MgPSB0aGlzLnByb3RvdHlwZS5faW5pdEhvb2tzIHx8IFtdO1xyXG5cdHRoaXMucHJvdG90eXBlLl9pbml0SG9va3MucHVzaChpbml0KTtcclxufTtcclxuXG5cblxuLypcclxuICogTC5FdmVudGVkIGlzIGEgYmFzZSBjbGFzcyB0aGF0IExlYWZsZXQgY2xhc3NlcyBpbmhlcml0IGZyb20gdG8gaGFuZGxlIGN1c3RvbSBldmVudHMuXHJcbiAqL1xyXG5cclxuTC5FdmVudGVkID0gTC5DbGFzcy5leHRlbmQoe1xyXG5cclxuXHRvbjogZnVuY3Rpb24gKHR5cGVzLCBmbiwgY29udGV4dCkge1xyXG5cclxuXHRcdC8vIHR5cGVzIGNhbiBiZSBhIG1hcCBvZiB0eXBlcy9oYW5kbGVyc1xyXG5cdFx0aWYgKHR5cGVvZiB0eXBlcyA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0Zm9yICh2YXIgdHlwZSBpbiB0eXBlcykge1xyXG5cdFx0XHRcdC8vIHdlIGRvbid0IHByb2Nlc3Mgc3BhY2Utc2VwYXJhdGVkIGV2ZW50cyBoZXJlIGZvciBwZXJmb3JtYW5jZTtcclxuXHRcdFx0XHQvLyBpdCdzIGEgaG90IHBhdGggc2luY2UgTGF5ZXIgdXNlcyB0aGUgb24ob2JqKSBzeW50YXhcclxuXHRcdFx0XHR0aGlzLl9vbih0eXBlLCB0eXBlc1t0eXBlXSwgZm4pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly8gdHlwZXMgY2FuIGJlIGEgc3RyaW5nIG9mIHNwYWNlLXNlcGFyYXRlZCB3b3Jkc1xyXG5cdFx0XHR0eXBlcyA9IEwuVXRpbC5zcGxpdFdvcmRzKHR5cGVzKTtcclxuXHJcblx0XHRcdGZvciAodmFyIGkgPSAwLCBsZW4gPSB0eXBlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRcdHRoaXMuX29uKHR5cGVzW2ldLCBmbiwgY29udGV4dCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRvZmY6IGZ1bmN0aW9uICh0eXBlcywgZm4sIGNvbnRleHQpIHtcclxuXHJcblx0XHRpZiAoIXR5cGVzKSB7XHJcblx0XHRcdC8vIGNsZWFyIGFsbCBsaXN0ZW5lcnMgaWYgY2FsbGVkIHdpdGhvdXQgYXJndW1lbnRzXHJcblx0XHRcdGRlbGV0ZSB0aGlzLl9ldmVudHM7XHJcblxyXG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgdHlwZXMgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdGZvciAodmFyIHR5cGUgaW4gdHlwZXMpIHtcclxuXHRcdFx0XHR0aGlzLl9vZmYodHlwZSwgdHlwZXNbdHlwZV0sIGZuKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHR5cGVzID0gTC5VdGlsLnNwbGl0V29yZHModHlwZXMpO1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IHR5cGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdFx0dGhpcy5fb2ZmKHR5cGVzW2ldLCBmbiwgY29udGV4dCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHQvLyBhdHRhY2ggbGlzdGVuZXIgKHdpdGhvdXQgc3ludGFjdGljIHN1Z2FyIG5vdylcclxuXHRfb246IGZ1bmN0aW9uICh0eXBlLCBmbiwgY29udGV4dCkge1xyXG5cclxuXHRcdHZhciBldmVudHMgPSB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge30sXHJcblx0XHQgICAgY29udGV4dElkID0gY29udGV4dCAmJiBjb250ZXh0ICE9PSB0aGlzICYmIEwuc3RhbXAoY29udGV4dCk7XHJcblxyXG5cdFx0aWYgKGNvbnRleHRJZCkge1xyXG5cdFx0XHQvLyBzdG9yZSBsaXN0ZW5lcnMgd2l0aCBjdXN0b20gY29udGV4dCBpbiBhIHNlcGFyYXRlIGhhc2ggKGlmIGl0IGhhcyBhbiBpZCk7XHJcblx0XHRcdC8vIGdpdmVzIGEgbWFqb3IgcGVyZm9ybWFuY2UgYm9vc3Qgd2hlbiBmaXJpbmcgYW5kIHJlbW92aW5nIGV2ZW50cyAoZS5nLiBvbiBtYXAgb2JqZWN0KVxyXG5cclxuXHRcdFx0dmFyIGluZGV4S2V5ID0gdHlwZSArICdfaWR4JyxcclxuXHRcdFx0ICAgIGluZGV4TGVuS2V5ID0gdHlwZSArICdfbGVuJyxcclxuXHRcdFx0ICAgIHR5cGVJbmRleCA9IGV2ZW50c1tpbmRleEtleV0gPSBldmVudHNbaW5kZXhLZXldIHx8IHt9LFxyXG5cdFx0XHQgICAgaWQgPSBMLnN0YW1wKGZuKSArICdfJyArIGNvbnRleHRJZDtcclxuXHJcblx0XHRcdGlmICghdHlwZUluZGV4W2lkXSkge1xyXG5cdFx0XHRcdHR5cGVJbmRleFtpZF0gPSB7Zm46IGZuLCBjdHg6IGNvbnRleHR9O1xyXG5cclxuXHRcdFx0XHQvLyBrZWVwIHRyYWNrIG9mIHRoZSBudW1iZXIgb2Yga2V5cyBpbiB0aGUgaW5kZXggdG8gcXVpY2tseSBjaGVjayBpZiBpdCdzIGVtcHR5XHJcblx0XHRcdFx0ZXZlbnRzW2luZGV4TGVuS2V5XSA9IChldmVudHNbaW5kZXhMZW5LZXldIHx8IDApICsgMTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdC8vIGluZGl2aWR1YWwgbGF5ZXJzIG1vc3RseSB1c2UgXCJ0aGlzXCIgZm9yIGNvbnRleHQgYW5kIGRvbid0IGZpcmUgbGlzdGVuZXJzIHRvbyBvZnRlblxyXG5cdFx0XHQvLyBzbyBzaW1wbGUgYXJyYXkgbWFrZXMgdGhlIG1lbW9yeSBmb290cHJpbnQgYmV0dGVyIHdoaWxlIG5vdCBkZWdyYWRpbmcgcGVyZm9ybWFuY2VcclxuXHJcblx0XHRcdGV2ZW50c1t0eXBlXSA9IGV2ZW50c1t0eXBlXSB8fCBbXTtcclxuXHRcdFx0ZXZlbnRzW3R5cGVdLnB1c2goe2ZuOiBmbn0pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF9vZmY6IGZ1bmN0aW9uICh0eXBlLCBmbiwgY29udGV4dCkge1xyXG5cdFx0dmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cyxcclxuXHRcdCAgICBpbmRleEtleSA9IHR5cGUgKyAnX2lkeCcsXHJcblx0XHQgICAgaW5kZXhMZW5LZXkgPSB0eXBlICsgJ19sZW4nO1xyXG5cclxuXHRcdGlmICghZXZlbnRzKSB7IHJldHVybjsgfVxyXG5cclxuXHRcdGlmICghZm4pIHtcclxuXHRcdFx0Ly8gY2xlYXIgYWxsIGxpc3RlbmVycyBmb3IgYSB0eXBlIGlmIGZ1bmN0aW9uIGlzbid0IHNwZWNpZmllZFxyXG5cdFx0XHRkZWxldGUgZXZlbnRzW3R5cGVdO1xyXG5cdFx0XHRkZWxldGUgZXZlbnRzW2luZGV4S2V5XTtcclxuXHRcdFx0ZGVsZXRlIGV2ZW50c1tpbmRleExlbktleV07XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgY29udGV4dElkID0gY29udGV4dCAmJiBjb250ZXh0ICE9PSB0aGlzICYmIEwuc3RhbXAoY29udGV4dCksXHJcblx0XHQgICAgbGlzdGVuZXJzLCBpLCBsZW4sIGxpc3RlbmVyLCBpZDtcclxuXHJcblx0XHRpZiAoY29udGV4dElkKSB7XHJcblx0XHRcdGlkID0gTC5zdGFtcChmbikgKyAnXycgKyBjb250ZXh0SWQ7XHJcblx0XHRcdGxpc3RlbmVycyA9IGV2ZW50c1tpbmRleEtleV07XHJcblxyXG5cdFx0XHRpZiAobGlzdGVuZXJzICYmIGxpc3RlbmVyc1tpZF0pIHtcclxuXHRcdFx0XHRsaXN0ZW5lciA9IGxpc3RlbmVyc1tpZF07XHJcblx0XHRcdFx0ZGVsZXRlIGxpc3RlbmVyc1tpZF07XHJcblx0XHRcdFx0ZXZlbnRzW2luZGV4TGVuS2V5XS0tO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdO1xyXG5cclxuXHRcdFx0aWYgKGxpc3RlbmVycykge1xyXG5cdFx0XHRcdGZvciAoaSA9IDAsIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRcdFx0aWYgKGxpc3RlbmVyc1tpXS5mbiA9PT0gZm4pIHtcclxuXHRcdFx0XHRcdFx0bGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XHJcblx0XHRcdFx0XHRcdGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIHNldCB0aGUgcmVtb3ZlZCBsaXN0ZW5lciB0byBub29wIHNvIHRoYXQncyBub3QgY2FsbGVkIGlmIHJlbW92ZSBoYXBwZW5zIGluIGZpcmVcclxuXHRcdGlmIChsaXN0ZW5lcikge1xyXG5cdFx0XHRsaXN0ZW5lci5mbiA9IEwuVXRpbC5mYWxzZUZuO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGZpcmU6IGZ1bmN0aW9uICh0eXBlLCBkYXRhLCBwcm9wYWdhdGUpIHtcclxuXHRcdGlmICghdGhpcy5saXN0ZW5zKHR5cGUsIHByb3BhZ2F0ZSkpIHsgcmV0dXJuIHRoaXM7IH1cclxuXHJcblx0XHR2YXIgZXZlbnQgPSBMLlV0aWwuZXh0ZW5kKHt9LCBkYXRhLCB7dHlwZTogdHlwZSwgdGFyZ2V0OiB0aGlzfSksXHJcblx0XHQgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xyXG5cclxuXHRcdGlmIChldmVudHMpIHtcclxuXHRcdFx0dmFyIHR5cGVJbmRleCA9IGV2ZW50c1t0eXBlICsgJ19pZHgnXSxcclxuXHRcdFx0ICAgIGksIGxlbiwgbGlzdGVuZXJzLCBpZDtcclxuXHJcblx0XHRcdGlmIChldmVudHNbdHlwZV0pIHtcclxuXHRcdFx0XHQvLyBtYWtlIHN1cmUgYWRkaW5nL3JlbW92aW5nIGxpc3RlbmVycyBpbnNpZGUgb3RoZXIgbGlzdGVuZXJzIHdvbid0IGNhdXNlIGluZmluaXRlIGxvb3BcclxuXHRcdFx0XHRsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV0uc2xpY2UoKTtcclxuXHJcblx0XHRcdFx0Zm9yIChpID0gMCwgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdFx0XHRsaXN0ZW5lcnNbaV0uZm4uY2FsbCh0aGlzLCBldmVudCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBmaXJlIGV2ZW50IGZvciB0aGUgY29udGV4dC1pbmRleGVkIGxpc3RlbmVycyBhcyB3ZWxsXHJcblx0XHRcdGZvciAoaWQgaW4gdHlwZUluZGV4KSB7XHJcblx0XHRcdFx0dHlwZUluZGV4W2lkXS5mbi5jYWxsKHR5cGVJbmRleFtpZF0uY3R4LCBldmVudCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAocHJvcGFnYXRlKSB7XHJcblx0XHRcdC8vIHByb3BhZ2F0ZSB0aGUgZXZlbnQgdG8gcGFyZW50cyAoc2V0IHdpdGggYWRkRXZlbnRQYXJlbnQpXHJcblx0XHRcdHRoaXMuX3Byb3BhZ2F0ZUV2ZW50KGV2ZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRsaXN0ZW5zOiBmdW5jdGlvbiAodHlwZSwgcHJvcGFnYXRlKSB7XHJcblx0XHR2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xyXG5cclxuXHRcdGlmIChldmVudHMgJiYgKGV2ZW50c1t0eXBlXSB8fCBldmVudHNbdHlwZSArICdfbGVuJ10pKSB7IHJldHVybiB0cnVlOyB9XHJcblxyXG5cdFx0aWYgKHByb3BhZ2F0ZSkge1xyXG5cdFx0XHQvLyBhbHNvIGNoZWNrIHBhcmVudHMgZm9yIGxpc3RlbmVycyBpZiBldmVudCBwcm9wYWdhdGVzXHJcblx0XHRcdGZvciAodmFyIGlkIGluIHRoaXMuX2V2ZW50UGFyZW50cykge1xyXG5cdFx0XHRcdGlmICh0aGlzLl9ldmVudFBhcmVudHNbaWRdLmxpc3RlbnModHlwZSwgcHJvcGFnYXRlKSkgeyByZXR1cm4gdHJ1ZTsgfVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSxcclxuXHJcblx0b25jZTogZnVuY3Rpb24gKHR5cGVzLCBmbiwgY29udGV4dCkge1xyXG5cclxuXHRcdGlmICh0eXBlb2YgdHlwZXMgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdGZvciAodmFyIHR5cGUgaW4gdHlwZXMpIHtcclxuXHRcdFx0XHR0aGlzLm9uY2UodHlwZSwgdHlwZXNbdHlwZV0sIGZuKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgaGFuZGxlciA9IEwuYmluZChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHRoaXNcclxuXHRcdFx0ICAgIC5vZmYodHlwZXMsIGZuLCBjb250ZXh0KVxyXG5cdFx0XHQgICAgLm9mZih0eXBlcywgaGFuZGxlciwgY29udGV4dCk7XHJcblx0XHR9LCB0aGlzKTtcclxuXHJcblx0XHQvLyBhZGQgYSBsaXN0ZW5lciB0aGF0J3MgZXhlY3V0ZWQgb25jZSBhbmQgcmVtb3ZlZCBhZnRlciB0aGF0XHJcblx0XHRyZXR1cm4gdGhpc1xyXG5cdFx0ICAgIC5vbih0eXBlcywgZm4sIGNvbnRleHQpXHJcblx0XHQgICAgLm9uKHR5cGVzLCBoYW5kbGVyLCBjb250ZXh0KTtcclxuXHR9LFxyXG5cclxuXHQvLyBhZGRzIGEgcGFyZW50IHRvIHByb3BhZ2F0ZSBldmVudHMgdG8gKHdoZW4geW91IGZpcmUgd2l0aCB0cnVlIGFzIGEgM3JkIGFyZ3VtZW50KVxyXG5cdGFkZEV2ZW50UGFyZW50OiBmdW5jdGlvbiAob2JqKSB7XHJcblx0XHR0aGlzLl9ldmVudFBhcmVudHMgPSB0aGlzLl9ldmVudFBhcmVudHMgfHwge307XHJcblx0XHR0aGlzLl9ldmVudFBhcmVudHNbTC5zdGFtcChvYmopXSA9IG9iajtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHJlbW92ZUV2ZW50UGFyZW50OiBmdW5jdGlvbiAob2JqKSB7XHJcblx0XHRpZiAodGhpcy5fZXZlbnRQYXJlbnRzKSB7XHJcblx0XHRcdGRlbGV0ZSB0aGlzLl9ldmVudFBhcmVudHNbTC5zdGFtcChvYmopXTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdF9wcm9wYWdhdGVFdmVudDogZnVuY3Rpb24gKGUpIHtcclxuXHRcdGZvciAodmFyIGlkIGluIHRoaXMuX2V2ZW50UGFyZW50cykge1xyXG5cdFx0XHR0aGlzLl9ldmVudFBhcmVudHNbaWRdLmZpcmUoZS50eXBlLCBMLmV4dGVuZCh7bGF5ZXI6IGUudGFyZ2V0fSwgZSksIHRydWUpO1xyXG5cdFx0fVxyXG5cdH1cclxufSk7XHJcblxyXG52YXIgcHJvdG8gPSBMLkV2ZW50ZWQucHJvdG90eXBlO1xyXG5cclxuLy8gYWxpYXNlczsgd2Ugc2hvdWxkIGRpdGNoIHRob3NlIGV2ZW50dWFsbHlcclxucHJvdG8uYWRkRXZlbnRMaXN0ZW5lciA9IHByb3RvLm9uO1xyXG5wcm90by5yZW1vdmVFdmVudExpc3RlbmVyID0gcHJvdG8uY2xlYXJBbGxFdmVudExpc3RlbmVycyA9IHByb3RvLm9mZjtcclxucHJvdG8uYWRkT25lVGltZUV2ZW50TGlzdGVuZXIgPSBwcm90by5vbmNlO1xyXG5wcm90by5maXJlRXZlbnQgPSBwcm90by5maXJlO1xyXG5wcm90by5oYXNFdmVudExpc3RlbmVycyA9IHByb3RvLmxpc3RlbnM7XHJcblxyXG5MLk1peGluID0ge0V2ZW50czogcHJvdG99O1xyXG5cblxuXG4vKlxyXG4gKiBMLkJyb3dzZXIgaGFuZGxlcyBkaWZmZXJlbnQgYnJvd3NlciBhbmQgZmVhdHVyZSBkZXRlY3Rpb25zIGZvciBpbnRlcm5hbCBMZWFmbGV0IHVzZS5cclxuICovXHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG5cclxuXHR2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCksXHJcblx0ICAgIGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxcclxuXHJcblx0ICAgIGllID0gJ0FjdGl2ZVhPYmplY3QnIGluIHdpbmRvdyxcclxuXHJcblx0ICAgIHdlYmtpdCAgICA9IHVhLmluZGV4T2YoJ3dlYmtpdCcpICE9PSAtMSxcclxuXHQgICAgcGhhbnRvbWpzID0gdWEuaW5kZXhPZigncGhhbnRvbScpICE9PSAtMSxcclxuXHQgICAgYW5kcm9pZDIzID0gdWEuc2VhcmNoKCdhbmRyb2lkIFsyM10nKSAhPT0gLTEsXHJcblx0ICAgIGNocm9tZSAgICA9IHVhLmluZGV4T2YoJ2Nocm9tZScpICE9PSAtMSxcclxuXHQgICAgZ2Vja28gICAgID0gdWEuaW5kZXhPZignZ2Vja28nKSAhPT0gLTEgICYmICF3ZWJraXQgJiYgIXdpbmRvdy5vcGVyYSAmJiAhaWUsXHJcblxyXG5cdCAgICBtb2JpbGUgPSB0eXBlb2Ygb3JpZW50YXRpb24gIT09ICd1bmRlZmluZWQnIHx8IHVhLmluZGV4T2YoJ21vYmlsZScpICE9PSAtMSxcclxuXHQgICAgbXNQb2ludGVyID0gIXdpbmRvdy5Qb2ludGVyRXZlbnQgJiYgd2luZG93Lk1TUG9pbnRlckV2ZW50LFxyXG5cdCAgICBwb2ludGVyID0gKHdpbmRvdy5Qb2ludGVyRXZlbnQgJiYgbmF2aWdhdG9yLnBvaW50ZXJFbmFibGVkKSB8fCBtc1BvaW50ZXIsXHJcblxyXG5cdCAgICBpZTNkID0gaWUgJiYgKCd0cmFuc2l0aW9uJyBpbiBkb2Muc3R5bGUpLFxyXG5cdCAgICB3ZWJraXQzZCA9ICgnV2ViS2l0Q1NTTWF0cml4JyBpbiB3aW5kb3cpICYmICgnbTExJyBpbiBuZXcgd2luZG93LldlYktpdENTU01hdHJpeCgpKSAmJiAhYW5kcm9pZDIzLFxyXG5cdCAgICBnZWNrbzNkID0gJ01velBlcnNwZWN0aXZlJyBpbiBkb2Muc3R5bGUsXHJcblx0ICAgIG9wZXJhMTIgPSAnT1RyYW5zaXRpb24nIGluIGRvYy5zdHlsZTtcclxuXHJcblx0dmFyIHRvdWNoID0gIXdpbmRvdy5MX05PX1RPVUNIICYmICFwaGFudG9tanMgJiYgKHBvaW50ZXIgfHwgJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8XHJcblx0XHRcdCh3aW5kb3cuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIHdpbmRvdy5Eb2N1bWVudFRvdWNoKSk7XHJcblxyXG5cdEwuQnJvd3NlciA9IHtcclxuXHRcdGllOiBpZSxcclxuXHRcdGllbHQ5OiBpZSAmJiAhZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcixcclxuXHRcdHdlYmtpdDogd2Via2l0LFxyXG5cdFx0Z2Vja286IGdlY2tvLFxyXG5cdFx0YW5kcm9pZDogdWEuaW5kZXhPZignYW5kcm9pZCcpICE9PSAtMSxcclxuXHRcdGFuZHJvaWQyMzogYW5kcm9pZDIzLFxyXG5cdFx0Y2hyb21lOiBjaHJvbWUsXHJcblx0XHRzYWZhcmk6ICFjaHJvbWUgJiYgdWEuaW5kZXhPZignc2FmYXJpJykgIT09IC0xLFxyXG5cclxuXHRcdGllM2Q6IGllM2QsXHJcblx0XHR3ZWJraXQzZDogd2Via2l0M2QsXHJcblx0XHRnZWNrbzNkOiBnZWNrbzNkLFxyXG5cdFx0b3BlcmExMjogb3BlcmExMixcclxuXHRcdGFueTNkOiAhd2luZG93LkxfRElTQUJMRV8zRCAmJiAoaWUzZCB8fCB3ZWJraXQzZCB8fCBnZWNrbzNkKSAmJiAhb3BlcmExMiAmJiAhcGhhbnRvbWpzLFxyXG5cclxuXHRcdG1vYmlsZTogbW9iaWxlLFxyXG5cdFx0bW9iaWxlV2Via2l0OiBtb2JpbGUgJiYgd2Via2l0LFxyXG5cdFx0bW9iaWxlV2Via2l0M2Q6IG1vYmlsZSAmJiB3ZWJraXQzZCxcclxuXHRcdG1vYmlsZU9wZXJhOiBtb2JpbGUgJiYgd2luZG93Lm9wZXJhLFxyXG5cdFx0bW9iaWxlR2Vja286IG1vYmlsZSAmJiBnZWNrbyxcclxuXHJcblx0XHR0b3VjaDogISF0b3VjaCxcclxuXHRcdG1zUG9pbnRlcjogISFtc1BvaW50ZXIsXHJcblx0XHRwb2ludGVyOiAhIXBvaW50ZXIsXHJcblxyXG5cdFx0cmV0aW5hOiAod2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgKHdpbmRvdy5zY3JlZW4uZGV2aWNlWERQSSAvIHdpbmRvdy5zY3JlZW4ubG9naWNhbFhEUEkpKSA+IDFcclxuXHR9O1xyXG5cclxufSgpKTtcclxuXG5cblxuLypcclxuICogTC5Qb2ludCByZXByZXNlbnRzIGEgcG9pbnQgd2l0aCB4IGFuZCB5IGNvb3JkaW5hdGVzLlxyXG4gKi9cclxuXHJcbkwuUG9pbnQgPSBmdW5jdGlvbiAoeCwgeSwgcm91bmQpIHtcclxuXHR0aGlzLnggPSAocm91bmQgPyBNYXRoLnJvdW5kKHgpIDogeCk7XHJcblx0dGhpcy55ID0gKHJvdW5kID8gTWF0aC5yb3VuZCh5KSA6IHkpO1xyXG59O1xyXG5cclxuTC5Qb2ludC5wcm90b3R5cGUgPSB7XHJcblxyXG5cdGNsb25lOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gbmV3IEwuUG9pbnQodGhpcy54LCB0aGlzLnkpO1xyXG5cdH0sXHJcblxyXG5cdC8vIG5vbi1kZXN0cnVjdGl2ZSwgcmV0dXJucyBhIG5ldyBwb2ludFxyXG5cdGFkZDogZnVuY3Rpb24gKHBvaW50KSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jbG9uZSgpLl9hZGQoTC5wb2ludChwb2ludCkpO1xyXG5cdH0sXHJcblxyXG5cdC8vIGRlc3RydWN0aXZlLCB1c2VkIGRpcmVjdGx5IGZvciBwZXJmb3JtYW5jZSBpbiBzaXR1YXRpb25zIHdoZXJlIGl0J3Mgc2FmZSB0byBtb2RpZnkgZXhpc3RpbmcgcG9pbnRcclxuXHRfYWRkOiBmdW5jdGlvbiAocG9pbnQpIHtcclxuXHRcdHRoaXMueCArPSBwb2ludC54O1xyXG5cdFx0dGhpcy55ICs9IHBvaW50Lnk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRzdWJ0cmFjdDogZnVuY3Rpb24gKHBvaW50KSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jbG9uZSgpLl9zdWJ0cmFjdChMLnBvaW50KHBvaW50KSk7XHJcblx0fSxcclxuXHJcblx0X3N1YnRyYWN0OiBmdW5jdGlvbiAocG9pbnQpIHtcclxuXHRcdHRoaXMueCAtPSBwb2ludC54O1xyXG5cdFx0dGhpcy55IC09IHBvaW50Lnk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRkaXZpZGVCeTogZnVuY3Rpb24gKG51bSkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY2xvbmUoKS5fZGl2aWRlQnkobnVtKTtcclxuXHR9LFxyXG5cclxuXHRfZGl2aWRlQnk6IGZ1bmN0aW9uIChudW0pIHtcclxuXHRcdHRoaXMueCAvPSBudW07XHJcblx0XHR0aGlzLnkgLz0gbnVtO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0bXVsdGlwbHlCeTogZnVuY3Rpb24gKG51bSkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY2xvbmUoKS5fbXVsdGlwbHlCeShudW0pO1xyXG5cdH0sXHJcblxyXG5cdF9tdWx0aXBseUJ5OiBmdW5jdGlvbiAobnVtKSB7XHJcblx0XHR0aGlzLnggKj0gbnVtO1xyXG5cdFx0dGhpcy55ICo9IG51bTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHNjYWxlQnk6IGZ1bmN0aW9uIChwb2ludCkge1xyXG5cdFx0cmV0dXJuIG5ldyBMLlBvaW50KHRoaXMueCAqIHBvaW50LngsIHRoaXMueSAqIHBvaW50LnkpO1xyXG5cdH0sXHJcblxyXG5cdHVuc2NhbGVCeTogZnVuY3Rpb24gKHBvaW50KSB7XHJcblx0XHRyZXR1cm4gbmV3IEwuUG9pbnQodGhpcy54IC8gcG9pbnQueCwgdGhpcy55IC8gcG9pbnQueSk7XHJcblx0fSxcclxuXHJcblx0cm91bmQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLmNsb25lKCkuX3JvdW5kKCk7XHJcblx0fSxcclxuXHJcblx0X3JvdW5kOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLnggPSBNYXRoLnJvdW5kKHRoaXMueCk7XHJcblx0XHR0aGlzLnkgPSBNYXRoLnJvdW5kKHRoaXMueSk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRmbG9vcjogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY2xvbmUoKS5fZmxvb3IoKTtcclxuXHR9LFxyXG5cclxuXHRfZmxvb3I6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMueCA9IE1hdGguZmxvb3IodGhpcy54KTtcclxuXHRcdHRoaXMueSA9IE1hdGguZmxvb3IodGhpcy55KTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdGNlaWw6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLmNsb25lKCkuX2NlaWwoKTtcclxuXHR9LFxyXG5cclxuXHRfY2VpbDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy54ID0gTWF0aC5jZWlsKHRoaXMueCk7XHJcblx0XHR0aGlzLnkgPSBNYXRoLmNlaWwodGhpcy55KTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdGRpc3RhbmNlVG86IGZ1bmN0aW9uIChwb2ludCkge1xyXG5cdFx0cG9pbnQgPSBMLnBvaW50KHBvaW50KTtcclxuXHJcblx0XHR2YXIgeCA9IHBvaW50LnggLSB0aGlzLngsXHJcblx0XHQgICAgeSA9IHBvaW50LnkgLSB0aGlzLnk7XHJcblxyXG5cdFx0cmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcclxuXHR9LFxyXG5cclxuXHRlcXVhbHM6IGZ1bmN0aW9uIChwb2ludCkge1xyXG5cdFx0cG9pbnQgPSBMLnBvaW50KHBvaW50KTtcclxuXHJcblx0XHRyZXR1cm4gcG9pbnQueCA9PT0gdGhpcy54ICYmXHJcblx0XHQgICAgICAgcG9pbnQueSA9PT0gdGhpcy55O1xyXG5cdH0sXHJcblxyXG5cdGNvbnRhaW5zOiBmdW5jdGlvbiAocG9pbnQpIHtcclxuXHRcdHBvaW50ID0gTC5wb2ludChwb2ludCk7XHJcblxyXG5cdFx0cmV0dXJuIE1hdGguYWJzKHBvaW50LngpIDw9IE1hdGguYWJzKHRoaXMueCkgJiZcclxuXHRcdCAgICAgICBNYXRoLmFicyhwb2ludC55KSA8PSBNYXRoLmFicyh0aGlzLnkpO1xyXG5cdH0sXHJcblxyXG5cdHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gJ1BvaW50KCcgK1xyXG5cdFx0ICAgICAgICBMLlV0aWwuZm9ybWF0TnVtKHRoaXMueCkgKyAnLCAnICtcclxuXHRcdCAgICAgICAgTC5VdGlsLmZvcm1hdE51bSh0aGlzLnkpICsgJyknO1xyXG5cdH1cclxufTtcclxuXHJcbkwucG9pbnQgPSBmdW5jdGlvbiAoeCwgeSwgcm91bmQpIHtcclxuXHRpZiAoeCBpbnN0YW5jZW9mIEwuUG9pbnQpIHtcclxuXHRcdHJldHVybiB4O1xyXG5cdH1cclxuXHRpZiAoTC5VdGlsLmlzQXJyYXkoeCkpIHtcclxuXHRcdHJldHVybiBuZXcgTC5Qb2ludCh4WzBdLCB4WzFdKTtcclxuXHR9XHJcblx0aWYgKHggPT09IHVuZGVmaW5lZCB8fCB4ID09PSBudWxsKSB7XHJcblx0XHRyZXR1cm4geDtcclxuXHR9XHJcblx0cmV0dXJuIG5ldyBMLlBvaW50KHgsIHksIHJvdW5kKTtcclxufTtcclxuXG5cblxuLypcclxuICogTC5Cb3VuZHMgcmVwcmVzZW50cyBhIHJlY3Rhbmd1bGFyIGFyZWEgb24gdGhlIHNjcmVlbiBpbiBwaXhlbCBjb29yZGluYXRlcy5cclxuICovXHJcblxyXG5MLkJvdW5kcyA9IGZ1bmN0aW9uIChhLCBiKSB7IC8vIChQb2ludCwgUG9pbnQpIG9yIFBvaW50W11cclxuXHRpZiAoIWEpIHsgcmV0dXJuOyB9XHJcblxyXG5cdHZhciBwb2ludHMgPSBiID8gW2EsIGJdIDogYTtcclxuXHJcblx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IHBvaW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0dGhpcy5leHRlbmQocG9pbnRzW2ldKTtcclxuXHR9XHJcbn07XHJcblxyXG5MLkJvdW5kcy5wcm90b3R5cGUgPSB7XHJcblx0Ly8gZXh0ZW5kIHRoZSBib3VuZHMgdG8gY29udGFpbiB0aGUgZ2l2ZW4gcG9pbnRcclxuXHRleHRlbmQ6IGZ1bmN0aW9uIChwb2ludCkgeyAvLyAoUG9pbnQpXHJcblx0XHRwb2ludCA9IEwucG9pbnQocG9pbnQpO1xyXG5cclxuXHRcdGlmICghdGhpcy5taW4gJiYgIXRoaXMubWF4KSB7XHJcblx0XHRcdHRoaXMubWluID0gcG9pbnQuY2xvbmUoKTtcclxuXHRcdFx0dGhpcy5tYXggPSBwb2ludC5jbG9uZSgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5taW4ueCA9IE1hdGgubWluKHBvaW50LngsIHRoaXMubWluLngpO1xyXG5cdFx0XHR0aGlzLm1heC54ID0gTWF0aC5tYXgocG9pbnQueCwgdGhpcy5tYXgueCk7XHJcblx0XHRcdHRoaXMubWluLnkgPSBNYXRoLm1pbihwb2ludC55LCB0aGlzLm1pbi55KTtcclxuXHRcdFx0dGhpcy5tYXgueSA9IE1hdGgubWF4KHBvaW50LnksIHRoaXMubWF4LnkpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0Z2V0Q2VudGVyOiBmdW5jdGlvbiAocm91bmQpIHsgLy8gKEJvb2xlYW4pIC0+IFBvaW50XHJcblx0XHRyZXR1cm4gbmV3IEwuUG9pbnQoXHJcblx0XHQgICAgICAgICh0aGlzLm1pbi54ICsgdGhpcy5tYXgueCkgLyAyLFxyXG5cdFx0ICAgICAgICAodGhpcy5taW4ueSArIHRoaXMubWF4LnkpIC8gMiwgcm91bmQpO1xyXG5cdH0sXHJcblxyXG5cdGdldEJvdHRvbUxlZnQ6IGZ1bmN0aW9uICgpIHsgLy8gLT4gUG9pbnRcclxuXHRcdHJldHVybiBuZXcgTC5Qb2ludCh0aGlzLm1pbi54LCB0aGlzLm1heC55KTtcclxuXHR9LFxyXG5cclxuXHRnZXRUb3BSaWdodDogZnVuY3Rpb24gKCkgeyAvLyAtPiBQb2ludFxyXG5cdFx0cmV0dXJuIG5ldyBMLlBvaW50KHRoaXMubWF4LngsIHRoaXMubWluLnkpO1xyXG5cdH0sXHJcblxyXG5cdGdldFNpemU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLm1heC5zdWJ0cmFjdCh0aGlzLm1pbik7XHJcblx0fSxcclxuXHJcblx0Y29udGFpbnM6IGZ1bmN0aW9uIChvYmopIHsgLy8gKEJvdW5kcykgb3IgKFBvaW50KSAtPiBCb29sZWFuXHJcblx0XHR2YXIgbWluLCBtYXg7XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBvYmpbMF0gPT09ICdudW1iZXInIHx8IG9iaiBpbnN0YW5jZW9mIEwuUG9pbnQpIHtcclxuXHRcdFx0b2JqID0gTC5wb2ludChvYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0b2JqID0gTC5ib3VuZHMob2JqKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAob2JqIGluc3RhbmNlb2YgTC5Cb3VuZHMpIHtcclxuXHRcdFx0bWluID0gb2JqLm1pbjtcclxuXHRcdFx0bWF4ID0gb2JqLm1heDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG1pbiA9IG1heCA9IG9iajtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gKG1pbi54ID49IHRoaXMubWluLngpICYmXHJcblx0XHQgICAgICAgKG1heC54IDw9IHRoaXMubWF4LngpICYmXHJcblx0XHQgICAgICAgKG1pbi55ID49IHRoaXMubWluLnkpICYmXHJcblx0XHQgICAgICAgKG1heC55IDw9IHRoaXMubWF4LnkpO1xyXG5cdH0sXHJcblxyXG5cdGludGVyc2VjdHM6IGZ1bmN0aW9uIChib3VuZHMpIHsgLy8gKEJvdW5kcykgLT4gQm9vbGVhblxyXG5cdFx0Ym91bmRzID0gTC5ib3VuZHMoYm91bmRzKTtcclxuXHJcblx0XHR2YXIgbWluID0gdGhpcy5taW4sXHJcblx0XHQgICAgbWF4ID0gdGhpcy5tYXgsXHJcblx0XHQgICAgbWluMiA9IGJvdW5kcy5taW4sXHJcblx0XHQgICAgbWF4MiA9IGJvdW5kcy5tYXgsXHJcblx0XHQgICAgeEludGVyc2VjdHMgPSAobWF4Mi54ID49IG1pbi54KSAmJiAobWluMi54IDw9IG1heC54KSxcclxuXHRcdCAgICB5SW50ZXJzZWN0cyA9IChtYXgyLnkgPj0gbWluLnkpICYmIChtaW4yLnkgPD0gbWF4LnkpO1xyXG5cclxuXHRcdHJldHVybiB4SW50ZXJzZWN0cyAmJiB5SW50ZXJzZWN0cztcclxuXHR9LFxyXG5cclxuXHRvdmVybGFwczogZnVuY3Rpb24gKGJvdW5kcykgeyAvLyAoQm91bmRzKSAtPiBCb29sZWFuXHJcblx0XHRib3VuZHMgPSBMLmJvdW5kcyhib3VuZHMpO1xyXG5cclxuXHRcdHZhciBtaW4gPSB0aGlzLm1pbixcclxuXHRcdCAgICBtYXggPSB0aGlzLm1heCxcclxuXHRcdCAgICBtaW4yID0gYm91bmRzLm1pbixcclxuXHRcdCAgICBtYXgyID0gYm91bmRzLm1heCxcclxuXHRcdCAgICB4T3ZlcmxhcHMgPSAobWF4Mi54ID4gbWluLngpICYmIChtaW4yLnggPCBtYXgueCksXHJcblx0XHQgICAgeU92ZXJsYXBzID0gKG1heDIueSA+IG1pbi55KSAmJiAobWluMi55IDwgbWF4LnkpO1xyXG5cclxuXHRcdHJldHVybiB4T3ZlcmxhcHMgJiYgeU92ZXJsYXBzO1xyXG5cdH0sXHJcblxyXG5cdGlzVmFsaWQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiAhISh0aGlzLm1pbiAmJiB0aGlzLm1heCk7XHJcblx0fVxyXG59O1xyXG5cclxuTC5ib3VuZHMgPSBmdW5jdGlvbiAoYSwgYikgeyAvLyAoQm91bmRzKSBvciAoUG9pbnQsIFBvaW50KSBvciAoUG9pbnRbXSlcclxuXHRpZiAoIWEgfHwgYSBpbnN0YW5jZW9mIEwuQm91bmRzKSB7XHJcblx0XHRyZXR1cm4gYTtcclxuXHR9XHJcblx0cmV0dXJuIG5ldyBMLkJvdW5kcyhhLCBiKTtcclxufTtcclxuXG5cblxuLypcclxuICogTC5UcmFuc2Zvcm1hdGlvbiBpcyBhbiB1dGlsaXR5IGNsYXNzIHRvIHBlcmZvcm0gc2ltcGxlIHBvaW50IHRyYW5zZm9ybWF0aW9ucyB0aHJvdWdoIGEgMmQtbWF0cml4LlxyXG4gKi9cclxuXHJcbkwuVHJhbnNmb3JtYXRpb24gPSBmdW5jdGlvbiAoYSwgYiwgYywgZCkge1xyXG5cdHRoaXMuX2EgPSBhO1xyXG5cdHRoaXMuX2IgPSBiO1xyXG5cdHRoaXMuX2MgPSBjO1xyXG5cdHRoaXMuX2QgPSBkO1xyXG59O1xyXG5cclxuTC5UcmFuc2Zvcm1hdGlvbi5wcm90b3R5cGUgPSB7XHJcblx0dHJhbnNmb3JtOiBmdW5jdGlvbiAocG9pbnQsIHNjYWxlKSB7IC8vIChQb2ludCwgTnVtYmVyKSAtPiBQb2ludFxyXG5cdFx0cmV0dXJuIHRoaXMuX3RyYW5zZm9ybShwb2ludC5jbG9uZSgpLCBzY2FsZSk7XHJcblx0fSxcclxuXHJcblx0Ly8gZGVzdHJ1Y3RpdmUgdHJhbnNmb3JtIChmYXN0ZXIpXHJcblx0X3RyYW5zZm9ybTogZnVuY3Rpb24gKHBvaW50LCBzY2FsZSkge1xyXG5cdFx0c2NhbGUgPSBzY2FsZSB8fCAxO1xyXG5cdFx0cG9pbnQueCA9IHNjYWxlICogKHRoaXMuX2EgKiBwb2ludC54ICsgdGhpcy5fYik7XHJcblx0XHRwb2ludC55ID0gc2NhbGUgKiAodGhpcy5fYyAqIHBvaW50LnkgKyB0aGlzLl9kKTtcclxuXHRcdHJldHVybiBwb2ludDtcclxuXHR9LFxyXG5cclxuXHR1bnRyYW5zZm9ybTogZnVuY3Rpb24gKHBvaW50LCBzY2FsZSkge1xyXG5cdFx0c2NhbGUgPSBzY2FsZSB8fCAxO1xyXG5cdFx0cmV0dXJuIG5ldyBMLlBvaW50KFxyXG5cdFx0ICAgICAgICAocG9pbnQueCAvIHNjYWxlIC0gdGhpcy5fYikgLyB0aGlzLl9hLFxyXG5cdFx0ICAgICAgICAocG9pbnQueSAvIHNjYWxlIC0gdGhpcy5fZCkgLyB0aGlzLl9jKTtcclxuXHR9XHJcbn07XHJcblxuXG5cbi8qXHJcbiAqIEwuRG9tVXRpbCBjb250YWlucyB2YXJpb3VzIHV0aWxpdHkgZnVuY3Rpb25zIGZvciB3b3JraW5nIHdpdGggRE9NLlxyXG4gKi9cclxuXHJcbkwuRG9tVXRpbCA9IHtcclxuXHRnZXQ6IGZ1bmN0aW9uIChpZCkge1xyXG5cdFx0cmV0dXJuIHR5cGVvZiBpZCA9PT0gJ3N0cmluZycgPyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkgOiBpZDtcclxuXHR9LFxyXG5cclxuXHRnZXRTdHlsZTogZnVuY3Rpb24gKGVsLCBzdHlsZSkge1xyXG5cclxuXHRcdHZhciB2YWx1ZSA9IGVsLnN0eWxlW3N0eWxlXSB8fCAoZWwuY3VycmVudFN0eWxlICYmIGVsLmN1cnJlbnRTdHlsZVtzdHlsZV0pO1xyXG5cclxuXHRcdGlmICgoIXZhbHVlIHx8IHZhbHVlID09PSAnYXV0bycpICYmIGRvY3VtZW50LmRlZmF1bHRWaWV3KSB7XHJcblx0XHRcdHZhciBjc3MgPSBkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKTtcclxuXHRcdFx0dmFsdWUgPSBjc3MgPyBjc3Nbc3R5bGVdIDogbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdmFsdWUgPT09ICdhdXRvJyA/IG51bGwgOiB2YWx1ZTtcclxuXHR9LFxyXG5cclxuXHRjcmVhdGU6IGZ1bmN0aW9uICh0YWdOYW1lLCBjbGFzc05hbWUsIGNvbnRhaW5lcikge1xyXG5cclxuXHRcdHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XHJcblx0XHRlbC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XHJcblxyXG5cdFx0aWYgKGNvbnRhaW5lcikge1xyXG5cdFx0XHRjb250YWluZXIuYXBwZW5kQ2hpbGQoZWwpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbDtcclxuXHR9LFxyXG5cclxuXHRyZW1vdmU6IGZ1bmN0aW9uIChlbCkge1xyXG5cdFx0dmFyIHBhcmVudCA9IGVsLnBhcmVudE5vZGU7XHJcblx0XHRpZiAocGFyZW50KSB7XHJcblx0XHRcdHBhcmVudC5yZW1vdmVDaGlsZChlbCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0ZW1wdHk6IGZ1bmN0aW9uIChlbCkge1xyXG5cdFx0d2hpbGUgKGVsLmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0ZWwucmVtb3ZlQ2hpbGQoZWwuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0dG9Gcm9udDogZnVuY3Rpb24gKGVsKSB7XHJcblx0XHRlbC5wYXJlbnROb2RlLmFwcGVuZENoaWxkKGVsKTtcclxuXHR9LFxyXG5cclxuXHR0b0JhY2s6IGZ1bmN0aW9uIChlbCkge1xyXG5cdFx0dmFyIHBhcmVudCA9IGVsLnBhcmVudE5vZGU7XHJcblx0XHRwYXJlbnQuaW5zZXJ0QmVmb3JlKGVsLCBwYXJlbnQuZmlyc3RDaGlsZCk7XHJcblx0fSxcclxuXHJcblx0aGFzQ2xhc3M6IGZ1bmN0aW9uIChlbCwgbmFtZSkge1xyXG5cdFx0aWYgKGVsLmNsYXNzTGlzdCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiBlbC5jbGFzc0xpc3QuY29udGFpbnMobmFtZSk7XHJcblx0XHR9XHJcblx0XHR2YXIgY2xhc3NOYW1lID0gTC5Eb21VdGlsLmdldENsYXNzKGVsKTtcclxuXHRcdHJldHVybiBjbGFzc05hbWUubGVuZ3RoID4gMCAmJiBuZXcgUmVnRXhwKCcoXnxcXFxccyknICsgbmFtZSArICcoXFxcXHN8JCknKS50ZXN0KGNsYXNzTmFtZSk7XHJcblx0fSxcclxuXHJcblx0YWRkQ2xhc3M6IGZ1bmN0aW9uIChlbCwgbmFtZSkge1xyXG5cdFx0aWYgKGVsLmNsYXNzTGlzdCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHZhciBjbGFzc2VzID0gTC5VdGlsLnNwbGl0V29yZHMobmFtZSk7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwLCBsZW4gPSBjbGFzc2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdFx0ZWwuY2xhc3NMaXN0LmFkZChjbGFzc2VzW2ldKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmICghTC5Eb21VdGlsLmhhc0NsYXNzKGVsLCBuYW1lKSkge1xyXG5cdFx0XHR2YXIgY2xhc3NOYW1lID0gTC5Eb21VdGlsLmdldENsYXNzKGVsKTtcclxuXHRcdFx0TC5Eb21VdGlsLnNldENsYXNzKGVsLCAoY2xhc3NOYW1lID8gY2xhc3NOYW1lICsgJyAnIDogJycpICsgbmFtZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0cmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uIChlbCwgbmFtZSkge1xyXG5cdFx0aWYgKGVsLmNsYXNzTGlzdCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRMLkRvbVV0aWwuc2V0Q2xhc3MoZWwsIEwuVXRpbC50cmltKCgnICcgKyBMLkRvbVV0aWwuZ2V0Q2xhc3MoZWwpICsgJyAnKS5yZXBsYWNlKCcgJyArIG5hbWUgKyAnICcsICcgJykpKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRzZXRDbGFzczogZnVuY3Rpb24gKGVsLCBuYW1lKSB7XHJcblx0XHRpZiAoZWwuY2xhc3NOYW1lLmJhc2VWYWwgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRlbC5jbGFzc05hbWUgPSBuYW1lO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly8gaW4gY2FzZSBvZiBTVkcgZWxlbWVudFxyXG5cdFx0XHRlbC5jbGFzc05hbWUuYmFzZVZhbCA9IG5hbWU7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Z2V0Q2xhc3M6IGZ1bmN0aW9uIChlbCkge1xyXG5cdFx0cmV0dXJuIGVsLmNsYXNzTmFtZS5iYXNlVmFsID09PSB1bmRlZmluZWQgPyBlbC5jbGFzc05hbWUgOiBlbC5jbGFzc05hbWUuYmFzZVZhbDtcclxuXHR9LFxyXG5cclxuXHRzZXRPcGFjaXR5OiBmdW5jdGlvbiAoZWwsIHZhbHVlKSB7XHJcblxyXG5cdFx0aWYgKCdvcGFjaXR5JyBpbiBlbC5zdHlsZSkge1xyXG5cdFx0XHRlbC5zdHlsZS5vcGFjaXR5ID0gdmFsdWU7XHJcblxyXG5cdFx0fSBlbHNlIGlmICgnZmlsdGVyJyBpbiBlbC5zdHlsZSkge1xyXG5cdFx0XHRMLkRvbVV0aWwuX3NldE9wYWNpdHlJRShlbCwgdmFsdWUpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF9zZXRPcGFjaXR5SUU6IGZ1bmN0aW9uIChlbCwgdmFsdWUpIHtcclxuXHRcdHZhciBmaWx0ZXIgPSBmYWxzZSxcclxuXHRcdCAgICBmaWx0ZXJOYW1lID0gJ0RYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LkFscGhhJztcclxuXHJcblx0XHQvLyBmaWx0ZXJzIGNvbGxlY3Rpb24gdGhyb3dzIGFuIGVycm9yIGlmIHdlIHRyeSB0byByZXRyaWV2ZSBhIGZpbHRlciB0aGF0IGRvZXNuJ3QgZXhpc3RcclxuXHRcdHRyeSB7XHJcblx0XHRcdGZpbHRlciA9IGVsLmZpbHRlcnMuaXRlbShmaWx0ZXJOYW1lKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Ly8gZG9uJ3Qgc2V0IG9wYWNpdHkgdG8gMSBpZiB3ZSBoYXZlbid0IGFscmVhZHkgc2V0IGFuIG9wYWNpdHksXHJcblx0XHRcdC8vIGl0IGlzbid0IG5lZWRlZCBhbmQgYnJlYWtzIHRyYW5zcGFyZW50IHBuZ3MuXHJcblx0XHRcdGlmICh2YWx1ZSA9PT0gMSkgeyByZXR1cm47IH1cclxuXHRcdH1cclxuXHJcblx0XHR2YWx1ZSA9IE1hdGgucm91bmQodmFsdWUgKiAxMDApO1xyXG5cclxuXHRcdGlmIChmaWx0ZXIpIHtcclxuXHRcdFx0ZmlsdGVyLkVuYWJsZWQgPSAodmFsdWUgIT09IDEwMCk7XHJcblx0XHRcdGZpbHRlci5PcGFjaXR5ID0gdmFsdWU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlbC5zdHlsZS5maWx0ZXIgKz0gJyBwcm9naWQ6JyArIGZpbHRlck5hbWUgKyAnKG9wYWNpdHk9JyArIHZhbHVlICsgJyknO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdHRlc3RQcm9wOiBmdW5jdGlvbiAocHJvcHMpIHtcclxuXHJcblx0XHR2YXIgc3R5bGUgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGU7XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAocHJvcHNbaV0gaW4gc3R5bGUpIHtcclxuXHRcdFx0XHRyZXR1cm4gcHJvcHNbaV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9LFxyXG5cclxuXHRzZXRUcmFuc2Zvcm06IGZ1bmN0aW9uIChlbCwgb2Zmc2V0LCBzY2FsZSkge1xyXG5cdFx0dmFyIHBvcyA9IG9mZnNldCB8fCBuZXcgTC5Qb2ludCgwLCAwKTtcclxuXHJcblx0XHRlbC5zdHlsZVtMLkRvbVV0aWwuVFJBTlNGT1JNXSA9XHJcblx0XHRcdChMLkJyb3dzZXIuaWUzZCA/XHJcblx0XHRcdFx0J3RyYW5zbGF0ZSgnICsgcG9zLnggKyAncHgsJyArIHBvcy55ICsgJ3B4KScgOlxyXG5cdFx0XHRcdCd0cmFuc2xhdGUzZCgnICsgcG9zLnggKyAncHgsJyArIHBvcy55ICsgJ3B4LDApJykgK1xyXG5cdFx0XHQoc2NhbGUgPyAnIHNjYWxlKCcgKyBzY2FsZSArICcpJyA6ICcnKTtcclxuXHR9LFxyXG5cclxuXHRzZXRQb3NpdGlvbjogZnVuY3Rpb24gKGVsLCBwb2ludCkgeyAvLyAoSFRNTEVsZW1lbnQsIFBvaW50WywgQm9vbGVhbl0pXHJcblxyXG5cdFx0Lyplc2xpbnQtZGlzYWJsZSAqL1xyXG5cdFx0ZWwuX2xlYWZsZXRfcG9zID0gcG9pbnQ7XHJcblx0XHQvKmVzbGludC1lbmFibGUgKi9cclxuXHJcblx0XHRpZiAoTC5Ccm93c2VyLmFueTNkKSB7XHJcblx0XHRcdEwuRG9tVXRpbC5zZXRUcmFuc2Zvcm0oZWwsIHBvaW50KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGVsLnN0eWxlLmxlZnQgPSBwb2ludC54ICsgJ3B4JztcclxuXHRcdFx0ZWwuc3R5bGUudG9wID0gcG9pbnQueSArICdweCc7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Z2V0UG9zaXRpb246IGZ1bmN0aW9uIChlbCkge1xyXG5cdFx0Ly8gdGhpcyBtZXRob2QgaXMgb25seSB1c2VkIGZvciBlbGVtZW50cyBwcmV2aW91c2x5IHBvc2l0aW9uZWQgdXNpbmcgc2V0UG9zaXRpb24sXHJcblx0XHQvLyBzbyBpdCdzIHNhZmUgdG8gY2FjaGUgdGhlIHBvc2l0aW9uIGZvciBwZXJmb3JtYW5jZVxyXG5cclxuXHRcdHJldHVybiBlbC5fbGVhZmxldF9wb3M7XHJcblx0fVxyXG59O1xyXG5cclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcblx0Ly8gcHJlZml4IHN0eWxlIHByb3BlcnR5IG5hbWVzXHJcblxyXG5cdEwuRG9tVXRpbC5UUkFOU0ZPUk0gPSBMLkRvbVV0aWwudGVzdFByb3AoXHJcblx0XHRcdFsndHJhbnNmb3JtJywgJ1dlYmtpdFRyYW5zZm9ybScsICdPVHJhbnNmb3JtJywgJ01velRyYW5zZm9ybScsICdtc1RyYW5zZm9ybSddKTtcclxuXHJcblxyXG5cdC8vIHdlYmtpdFRyYW5zaXRpb24gY29tZXMgZmlyc3QgYmVjYXVzZSBzb21lIGJyb3dzZXIgdmVyc2lvbnMgdGhhdCBkcm9wIHZlbmRvciBwcmVmaXggZG9uJ3QgZG9cclxuXHQvLyB0aGUgc2FtZSBmb3IgdGhlIHRyYW5zaXRpb25lbmQgZXZlbnQsIGluIHBhcnRpY3VsYXIgdGhlIEFuZHJvaWQgNC4xIHN0b2NrIGJyb3dzZXJcclxuXHJcblx0dmFyIHRyYW5zaXRpb24gPSBMLkRvbVV0aWwuVFJBTlNJVElPTiA9IEwuRG9tVXRpbC50ZXN0UHJvcChcclxuXHRcdFx0Wyd3ZWJraXRUcmFuc2l0aW9uJywgJ3RyYW5zaXRpb24nLCAnT1RyYW5zaXRpb24nLCAnTW96VHJhbnNpdGlvbicsICdtc1RyYW5zaXRpb24nXSk7XHJcblxyXG5cdEwuRG9tVXRpbC5UUkFOU0lUSU9OX0VORCA9XHJcblx0XHRcdHRyYW5zaXRpb24gPT09ICd3ZWJraXRUcmFuc2l0aW9uJyB8fCB0cmFuc2l0aW9uID09PSAnT1RyYW5zaXRpb24nID8gdHJhbnNpdGlvbiArICdFbmQnIDogJ3RyYW5zaXRpb25lbmQnO1xyXG5cclxuXHJcblx0aWYgKCdvbnNlbGVjdHN0YXJ0JyBpbiBkb2N1bWVudCkge1xyXG5cdFx0TC5Eb21VdGlsLmRpc2FibGVUZXh0U2VsZWN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRMLkRvbUV2ZW50Lm9uKHdpbmRvdywgJ3NlbGVjdHN0YXJ0JywgTC5Eb21FdmVudC5wcmV2ZW50RGVmYXVsdCk7XHJcblx0XHR9O1xyXG5cdFx0TC5Eb21VdGlsLmVuYWJsZVRleHRTZWxlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdEwuRG9tRXZlbnQub2ZmKHdpbmRvdywgJ3NlbGVjdHN0YXJ0JywgTC5Eb21FdmVudC5wcmV2ZW50RGVmYXVsdCk7XHJcblx0XHR9O1xyXG5cclxuXHR9IGVsc2Uge1xyXG5cdFx0dmFyIHVzZXJTZWxlY3RQcm9wZXJ0eSA9IEwuRG9tVXRpbC50ZXN0UHJvcChcclxuXHRcdFx0Wyd1c2VyU2VsZWN0JywgJ1dlYmtpdFVzZXJTZWxlY3QnLCAnT1VzZXJTZWxlY3QnLCAnTW96VXNlclNlbGVjdCcsICdtc1VzZXJTZWxlY3QnXSk7XHJcblxyXG5cdFx0TC5Eb21VdGlsLmRpc2FibGVUZXh0U2VsZWN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodXNlclNlbGVjdFByb3BlcnR5KSB7XHJcblx0XHRcdFx0dmFyIHN0eWxlID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlO1xyXG5cdFx0XHRcdHRoaXMuX3VzZXJTZWxlY3QgPSBzdHlsZVt1c2VyU2VsZWN0UHJvcGVydHldO1xyXG5cdFx0XHRcdHN0eWxlW3VzZXJTZWxlY3RQcm9wZXJ0eV0gPSAnbm9uZSc7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0XHRMLkRvbVV0aWwuZW5hYmxlVGV4dFNlbGVjdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHVzZXJTZWxlY3RQcm9wZXJ0eSkge1xyXG5cdFx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZVt1c2VyU2VsZWN0UHJvcGVydHldID0gdGhpcy5fdXNlclNlbGVjdDtcclxuXHRcdFx0XHRkZWxldGUgdGhpcy5fdXNlclNlbGVjdDtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdEwuRG9tVXRpbC5kaXNhYmxlSW1hZ2VEcmFnID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0TC5Eb21FdmVudC5vbih3aW5kb3csICdkcmFnc3RhcnQnLCBMLkRvbUV2ZW50LnByZXZlbnREZWZhdWx0KTtcclxuXHR9O1xyXG5cdEwuRG9tVXRpbC5lbmFibGVJbWFnZURyYWcgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRMLkRvbUV2ZW50Lm9mZih3aW5kb3csICdkcmFnc3RhcnQnLCBMLkRvbUV2ZW50LnByZXZlbnREZWZhdWx0KTtcclxuXHR9O1xyXG5cclxuXHRMLkRvbVV0aWwucHJldmVudE91dGxpbmUgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cdFx0d2hpbGUgKGVsZW1lbnQudGFiSW5kZXggPT09IC0xKSB7XHJcblx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XHJcblx0XHR9XHJcblx0XHRpZiAoIWVsZW1lbnQgfHwgIWVsZW1lbnQuc3R5bGUpIHsgcmV0dXJuOyB9XHJcblx0XHRMLkRvbVV0aWwucmVzdG9yZU91dGxpbmUoKTtcclxuXHRcdHRoaXMuX291dGxpbmVFbGVtZW50ID0gZWxlbWVudDtcclxuXHRcdHRoaXMuX291dGxpbmVTdHlsZSA9IGVsZW1lbnQuc3R5bGUub3V0bGluZTtcclxuXHRcdGVsZW1lbnQuc3R5bGUub3V0bGluZSA9ICdub25lJztcclxuXHRcdEwuRG9tRXZlbnQub24od2luZG93LCAna2V5ZG93bicsIEwuRG9tVXRpbC5yZXN0b3JlT3V0bGluZSwgdGhpcyk7XHJcblx0fTtcclxuXHRMLkRvbVV0aWwucmVzdG9yZU91dGxpbmUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoIXRoaXMuX291dGxpbmVFbGVtZW50KSB7IHJldHVybjsgfVxyXG5cdFx0dGhpcy5fb3V0bGluZUVsZW1lbnQuc3R5bGUub3V0bGluZSA9IHRoaXMuX291dGxpbmVTdHlsZTtcclxuXHRcdGRlbGV0ZSB0aGlzLl9vdXRsaW5lRWxlbWVudDtcclxuXHRcdGRlbGV0ZSB0aGlzLl9vdXRsaW5lU3R5bGU7XHJcblx0XHRMLkRvbUV2ZW50Lm9mZih3aW5kb3csICdrZXlkb3duJywgTC5Eb21VdGlsLnJlc3RvcmVPdXRsaW5lLCB0aGlzKTtcclxuXHR9O1xyXG59KSgpO1xyXG5cblxuXG4vKlxyXG4gKiBMLkxhdExuZyByZXByZXNlbnRzIGEgZ2VvZ3JhcGhpY2FsIHBvaW50IHdpdGggbGF0aXR1ZGUgYW5kIGxvbmdpdHVkZSBjb29yZGluYXRlcy5cclxuICovXHJcblxyXG5MLkxhdExuZyA9IGZ1bmN0aW9uIChsYXQsIGxuZywgYWx0KSB7XHJcblx0aWYgKGlzTmFOKGxhdCkgfHwgaXNOYU4obG5nKSkge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIExhdExuZyBvYmplY3Q6ICgnICsgbGF0ICsgJywgJyArIGxuZyArICcpJyk7XHJcblx0fVxyXG5cclxuXHR0aGlzLmxhdCA9ICtsYXQ7XHJcblx0dGhpcy5sbmcgPSArbG5nO1xyXG5cclxuXHRpZiAoYWx0ICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdHRoaXMuYWx0ID0gK2FsdDtcclxuXHR9XHJcbn07XHJcblxyXG5MLkxhdExuZy5wcm90b3R5cGUgPSB7XHJcblx0ZXF1YWxzOiBmdW5jdGlvbiAob2JqLCBtYXhNYXJnaW4pIHtcclxuXHRcdGlmICghb2JqKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cclxuXHRcdG9iaiA9IEwubGF0TG5nKG9iaik7XHJcblxyXG5cdFx0dmFyIG1hcmdpbiA9IE1hdGgubWF4KFxyXG5cdFx0ICAgICAgICBNYXRoLmFicyh0aGlzLmxhdCAtIG9iai5sYXQpLFxyXG5cdFx0ICAgICAgICBNYXRoLmFicyh0aGlzLmxuZyAtIG9iai5sbmcpKTtcclxuXHJcblx0XHRyZXR1cm4gbWFyZ2luIDw9IChtYXhNYXJnaW4gPT09IHVuZGVmaW5lZCA/IDEuMEUtOSA6IG1heE1hcmdpbik7XHJcblx0fSxcclxuXHJcblx0dG9TdHJpbmc6IGZ1bmN0aW9uIChwcmVjaXNpb24pIHtcclxuXHRcdHJldHVybiAnTGF0TG5nKCcgK1xyXG5cdFx0ICAgICAgICBMLlV0aWwuZm9ybWF0TnVtKHRoaXMubGF0LCBwcmVjaXNpb24pICsgJywgJyArXHJcblx0XHQgICAgICAgIEwuVXRpbC5mb3JtYXROdW0odGhpcy5sbmcsIHByZWNpc2lvbikgKyAnKSc7XHJcblx0fSxcclxuXHJcblx0ZGlzdGFuY2VUbzogZnVuY3Rpb24gKG90aGVyKSB7XHJcblx0XHRyZXR1cm4gTC5DUlMuRWFydGguZGlzdGFuY2UodGhpcywgTC5sYXRMbmcob3RoZXIpKTtcclxuXHR9LFxyXG5cclxuXHR3cmFwOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gTC5DUlMuRWFydGgud3JhcExhdExuZyh0aGlzKTtcclxuXHR9LFxyXG5cclxuXHR0b0JvdW5kczogZnVuY3Rpb24gKHNpemVJbk1ldGVycykge1xyXG5cdFx0dmFyIGxhdEFjY3VyYWN5ID0gMTgwICogc2l6ZUluTWV0ZXJzIC8gNDAwNzUwMTcsXHJcblx0XHQgICAgbG5nQWNjdXJhY3kgPSBsYXRBY2N1cmFjeSAvIE1hdGguY29zKChNYXRoLlBJIC8gMTgwKSAqIHRoaXMubGF0KTtcclxuXHJcblx0XHRyZXR1cm4gTC5sYXRMbmdCb3VuZHMoXHJcblx0XHQgICAgICAgIFt0aGlzLmxhdCAtIGxhdEFjY3VyYWN5LCB0aGlzLmxuZyAtIGxuZ0FjY3VyYWN5XSxcclxuXHRcdCAgICAgICAgW3RoaXMubGF0ICsgbGF0QWNjdXJhY3ksIHRoaXMubG5nICsgbG5nQWNjdXJhY3ldKTtcclxuXHR9LFxyXG5cclxuXHRjbG9uZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIG5ldyBMLkxhdExuZyh0aGlzLmxhdCwgdGhpcy5sbmcsIHRoaXMuYWx0KTtcclxuXHR9XHJcbn07XHJcblxyXG5cclxuLy8gY29uc3RydWN0cyBMYXRMbmcgd2l0aCBkaWZmZXJlbnQgc2lnbmF0dXJlc1xyXG4vLyAoTGF0TG5nKSBvciAoW051bWJlciwgTnVtYmVyXSkgb3IgKE51bWJlciwgTnVtYmVyKSBvciAoT2JqZWN0KVxyXG5cclxuTC5sYXRMbmcgPSBmdW5jdGlvbiAoYSwgYiwgYykge1xyXG5cdGlmIChhIGluc3RhbmNlb2YgTC5MYXRMbmcpIHtcclxuXHRcdHJldHVybiBhO1xyXG5cdH1cclxuXHRpZiAoTC5VdGlsLmlzQXJyYXkoYSkgJiYgdHlwZW9mIGFbMF0gIT09ICdvYmplY3QnKSB7XHJcblx0XHRpZiAoYS5sZW5ndGggPT09IDMpIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBMLkxhdExuZyhhWzBdLCBhWzFdLCBhWzJdKTtcclxuXHRcdH1cclxuXHRcdGlmIChhLmxlbmd0aCA9PT0gMikge1xyXG5cdFx0XHRyZXR1cm4gbmV3IEwuTGF0TG5nKGFbMF0sIGFbMV0pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cdGlmIChhID09PSB1bmRlZmluZWQgfHwgYSA9PT0gbnVsbCkge1xyXG5cdFx0cmV0dXJuIGE7XHJcblx0fVxyXG5cdGlmICh0eXBlb2YgYSA9PT0gJ29iamVjdCcgJiYgJ2xhdCcgaW4gYSkge1xyXG5cdFx0cmV0dXJuIG5ldyBMLkxhdExuZyhhLmxhdCwgJ2xuZycgaW4gYSA/IGEubG5nIDogYS5sb24sIGEuYWx0KTtcclxuXHR9XHJcblx0aWYgKGIgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cdHJldHVybiBuZXcgTC5MYXRMbmcoYSwgYiwgYyk7XHJcbn07XHJcblxuXG5cbi8qXHJcbiAqIEwuTGF0TG5nQm91bmRzIHJlcHJlc2VudHMgYSByZWN0YW5ndWxhciBhcmVhIG9uIHRoZSBtYXAgaW4gZ2VvZ3JhcGhpY2FsIGNvb3JkaW5hdGVzLlxyXG4gKi9cclxuXHJcbkwuTGF0TG5nQm91bmRzID0gZnVuY3Rpb24gKHNvdXRoV2VzdCwgbm9ydGhFYXN0KSB7IC8vIChMYXRMbmcsIExhdExuZykgb3IgKExhdExuZ1tdKVxyXG5cdGlmICghc291dGhXZXN0KSB7IHJldHVybjsgfVxyXG5cclxuXHR2YXIgbGF0bG5ncyA9IG5vcnRoRWFzdCA/IFtzb3V0aFdlc3QsIG5vcnRoRWFzdF0gOiBzb3V0aFdlc3Q7XHJcblxyXG5cdGZvciAodmFyIGkgPSAwLCBsZW4gPSBsYXRsbmdzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHR0aGlzLmV4dGVuZChsYXRsbmdzW2ldKTtcclxuXHR9XHJcbn07XHJcblxyXG5MLkxhdExuZ0JvdW5kcy5wcm90b3R5cGUgPSB7XHJcblxyXG5cdC8vIGV4dGVuZCB0aGUgYm91bmRzIHRvIGNvbnRhaW4gdGhlIGdpdmVuIHBvaW50IG9yIGJvdW5kc1xyXG5cdGV4dGVuZDogZnVuY3Rpb24gKG9iaikgeyAvLyAoTGF0TG5nKSBvciAoTGF0TG5nQm91bmRzKVxyXG5cdFx0dmFyIHN3ID0gdGhpcy5fc291dGhXZXN0LFxyXG5cdFx0ICAgIG5lID0gdGhpcy5fbm9ydGhFYXN0LFxyXG5cdFx0ICAgIHN3MiwgbmUyO1xyXG5cclxuXHRcdGlmIChvYmogaW5zdGFuY2VvZiBMLkxhdExuZykge1xyXG5cdFx0XHRzdzIgPSBvYmo7XHJcblx0XHRcdG5lMiA9IG9iajtcclxuXHJcblx0XHR9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIEwuTGF0TG5nQm91bmRzKSB7XHJcblx0XHRcdHN3MiA9IG9iai5fc291dGhXZXN0O1xyXG5cdFx0XHRuZTIgPSBvYmouX25vcnRoRWFzdDtcclxuXHJcblx0XHRcdGlmICghc3cyIHx8ICFuZTIpIHsgcmV0dXJuIHRoaXM7IH1cclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gb2JqID8gdGhpcy5leHRlbmQoTC5sYXRMbmcob2JqKSB8fCBMLmxhdExuZ0JvdW5kcyhvYmopKSA6IHRoaXM7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFzdyAmJiAhbmUpIHtcclxuXHRcdFx0dGhpcy5fc291dGhXZXN0ID0gbmV3IEwuTGF0TG5nKHN3Mi5sYXQsIHN3Mi5sbmcpO1xyXG5cdFx0XHR0aGlzLl9ub3J0aEVhc3QgPSBuZXcgTC5MYXRMbmcobmUyLmxhdCwgbmUyLmxuZyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdy5sYXQgPSBNYXRoLm1pbihzdzIubGF0LCBzdy5sYXQpO1xyXG5cdFx0XHRzdy5sbmcgPSBNYXRoLm1pbihzdzIubG5nLCBzdy5sbmcpO1xyXG5cdFx0XHRuZS5sYXQgPSBNYXRoLm1heChuZTIubGF0LCBuZS5sYXQpO1xyXG5cdFx0XHRuZS5sbmcgPSBNYXRoLm1heChuZTIubG5nLCBuZS5sbmcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdC8vIGV4dGVuZCB0aGUgYm91bmRzIGJ5IGEgcGVyY2VudGFnZVxyXG5cdHBhZDogZnVuY3Rpb24gKGJ1ZmZlclJhdGlvKSB7IC8vIChOdW1iZXIpIC0+IExhdExuZ0JvdW5kc1xyXG5cdFx0dmFyIHN3ID0gdGhpcy5fc291dGhXZXN0LFxyXG5cdFx0ICAgIG5lID0gdGhpcy5fbm9ydGhFYXN0LFxyXG5cdFx0ICAgIGhlaWdodEJ1ZmZlciA9IE1hdGguYWJzKHN3LmxhdCAtIG5lLmxhdCkgKiBidWZmZXJSYXRpbyxcclxuXHRcdCAgICB3aWR0aEJ1ZmZlciA9IE1hdGguYWJzKHN3LmxuZyAtIG5lLmxuZykgKiBidWZmZXJSYXRpbztcclxuXHJcblx0XHRyZXR1cm4gbmV3IEwuTGF0TG5nQm91bmRzKFxyXG5cdFx0ICAgICAgICBuZXcgTC5MYXRMbmcoc3cubGF0IC0gaGVpZ2h0QnVmZmVyLCBzdy5sbmcgLSB3aWR0aEJ1ZmZlciksXHJcblx0XHQgICAgICAgIG5ldyBMLkxhdExuZyhuZS5sYXQgKyBoZWlnaHRCdWZmZXIsIG5lLmxuZyArIHdpZHRoQnVmZmVyKSk7XHJcblx0fSxcclxuXHJcblx0Z2V0Q2VudGVyOiBmdW5jdGlvbiAoKSB7IC8vIC0+IExhdExuZ1xyXG5cdFx0cmV0dXJuIG5ldyBMLkxhdExuZyhcclxuXHRcdCAgICAgICAgKHRoaXMuX3NvdXRoV2VzdC5sYXQgKyB0aGlzLl9ub3J0aEVhc3QubGF0KSAvIDIsXHJcblx0XHQgICAgICAgICh0aGlzLl9zb3V0aFdlc3QubG5nICsgdGhpcy5fbm9ydGhFYXN0LmxuZykgLyAyKTtcclxuXHR9LFxyXG5cclxuXHRnZXRTb3V0aFdlc3Q6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLl9zb3V0aFdlc3Q7XHJcblx0fSxcclxuXHJcblx0Z2V0Tm9ydGhFYXN0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fbm9ydGhFYXN0O1xyXG5cdH0sXHJcblxyXG5cdGdldE5vcnRoV2VzdDogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIG5ldyBMLkxhdExuZyh0aGlzLmdldE5vcnRoKCksIHRoaXMuZ2V0V2VzdCgpKTtcclxuXHR9LFxyXG5cclxuXHRnZXRTb3V0aEVhc3Q6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBuZXcgTC5MYXRMbmcodGhpcy5nZXRTb3V0aCgpLCB0aGlzLmdldEVhc3QoKSk7XHJcblx0fSxcclxuXHJcblx0Z2V0V2VzdDogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3NvdXRoV2VzdC5sbmc7XHJcblx0fSxcclxuXHJcblx0Z2V0U291dGg6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLl9zb3V0aFdlc3QubGF0O1xyXG5cdH0sXHJcblxyXG5cdGdldEVhc3Q6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLl9ub3J0aEVhc3QubG5nO1xyXG5cdH0sXHJcblxyXG5cdGdldE5vcnRoOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fbm9ydGhFYXN0LmxhdDtcclxuXHR9LFxyXG5cclxuXHRjb250YWluczogZnVuY3Rpb24gKG9iaikgeyAvLyAoTGF0TG5nQm91bmRzKSBvciAoTGF0TG5nKSAtPiBCb29sZWFuXHJcblx0XHRpZiAodHlwZW9mIG9ialswXSA9PT0gJ251bWJlcicgfHwgb2JqIGluc3RhbmNlb2YgTC5MYXRMbmcpIHtcclxuXHRcdFx0b2JqID0gTC5sYXRMbmcob2JqKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG9iaiA9IEwubGF0TG5nQm91bmRzKG9iaik7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHN3ID0gdGhpcy5fc291dGhXZXN0LFxyXG5cdFx0ICAgIG5lID0gdGhpcy5fbm9ydGhFYXN0LFxyXG5cdFx0ICAgIHN3MiwgbmUyO1xyXG5cclxuXHRcdGlmIChvYmogaW5zdGFuY2VvZiBMLkxhdExuZ0JvdW5kcykge1xyXG5cdFx0XHRzdzIgPSBvYmouZ2V0U291dGhXZXN0KCk7XHJcblx0XHRcdG5lMiA9IG9iai5nZXROb3J0aEVhc3QoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHN3MiA9IG5lMiA9IG9iajtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gKHN3Mi5sYXQgPj0gc3cubGF0KSAmJiAobmUyLmxhdCA8PSBuZS5sYXQpICYmXHJcblx0XHQgICAgICAgKHN3Mi5sbmcgPj0gc3cubG5nKSAmJiAobmUyLmxuZyA8PSBuZS5sbmcpO1xyXG5cdH0sXHJcblxyXG5cdGludGVyc2VjdHM6IGZ1bmN0aW9uIChib3VuZHMpIHsgLy8gKExhdExuZ0JvdW5kcykgLT4gQm9vbGVhblxyXG5cdFx0Ym91bmRzID0gTC5sYXRMbmdCb3VuZHMoYm91bmRzKTtcclxuXHJcblx0XHR2YXIgc3cgPSB0aGlzLl9zb3V0aFdlc3QsXHJcblx0XHQgICAgbmUgPSB0aGlzLl9ub3J0aEVhc3QsXHJcblx0XHQgICAgc3cyID0gYm91bmRzLmdldFNvdXRoV2VzdCgpLFxyXG5cdFx0ICAgIG5lMiA9IGJvdW5kcy5nZXROb3J0aEVhc3QoKSxcclxuXHJcblx0XHQgICAgbGF0SW50ZXJzZWN0cyA9IChuZTIubGF0ID49IHN3LmxhdCkgJiYgKHN3Mi5sYXQgPD0gbmUubGF0KSxcclxuXHRcdCAgICBsbmdJbnRlcnNlY3RzID0gKG5lMi5sbmcgPj0gc3cubG5nKSAmJiAoc3cyLmxuZyA8PSBuZS5sbmcpO1xyXG5cclxuXHRcdHJldHVybiBsYXRJbnRlcnNlY3RzICYmIGxuZ0ludGVyc2VjdHM7XHJcblx0fSxcclxuXHJcblx0b3ZlcmxhcHM6IGZ1bmN0aW9uIChib3VuZHMpIHsgLy8gKExhdExuZ0JvdW5kcykgLT4gQm9vbGVhblxyXG5cdFx0Ym91bmRzID0gTC5sYXRMbmdCb3VuZHMoYm91bmRzKTtcclxuXHJcblx0XHR2YXIgc3cgPSB0aGlzLl9zb3V0aFdlc3QsXHJcblx0XHQgICAgbmUgPSB0aGlzLl9ub3J0aEVhc3QsXHJcblx0XHQgICAgc3cyID0gYm91bmRzLmdldFNvdXRoV2VzdCgpLFxyXG5cdFx0ICAgIG5lMiA9IGJvdW5kcy5nZXROb3J0aEVhc3QoKSxcclxuXHJcblx0XHQgICAgbGF0T3ZlcmxhcHMgPSAobmUyLmxhdCA+IHN3LmxhdCkgJiYgKHN3Mi5sYXQgPCBuZS5sYXQpLFxyXG5cdFx0ICAgIGxuZ092ZXJsYXBzID0gKG5lMi5sbmcgPiBzdy5sbmcpICYmIChzdzIubG5nIDwgbmUubG5nKTtcclxuXHJcblx0XHRyZXR1cm4gbGF0T3ZlcmxhcHMgJiYgbG5nT3ZlcmxhcHM7XHJcblx0fSxcclxuXHJcblx0dG9CQm94U3RyaW5nOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gW3RoaXMuZ2V0V2VzdCgpLCB0aGlzLmdldFNvdXRoKCksIHRoaXMuZ2V0RWFzdCgpLCB0aGlzLmdldE5vcnRoKCldLmpvaW4oJywnKTtcclxuXHR9LFxyXG5cclxuXHRlcXVhbHM6IGZ1bmN0aW9uIChib3VuZHMpIHsgLy8gKExhdExuZ0JvdW5kcylcclxuXHRcdGlmICghYm91bmRzKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cclxuXHRcdGJvdW5kcyA9IEwubGF0TG5nQm91bmRzKGJvdW5kcyk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3NvdXRoV2VzdC5lcXVhbHMoYm91bmRzLmdldFNvdXRoV2VzdCgpKSAmJlxyXG5cdFx0ICAgICAgIHRoaXMuX25vcnRoRWFzdC5lcXVhbHMoYm91bmRzLmdldE5vcnRoRWFzdCgpKTtcclxuXHR9LFxyXG5cclxuXHRpc1ZhbGlkOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gISEodGhpcy5fc291dGhXZXN0ICYmIHRoaXMuX25vcnRoRWFzdCk7XHJcblx0fVxyXG59O1xyXG5cclxuLy8gVE9ETyBJbnRlcm5hdGlvbmFsIGRhdGUgbGluZT9cclxuXHJcbkwubGF0TG5nQm91bmRzID0gZnVuY3Rpb24gKGEsIGIpIHsgLy8gKExhdExuZ0JvdW5kcykgb3IgKExhdExuZywgTGF0TG5nKVxyXG5cdGlmICghYSB8fCBhIGluc3RhbmNlb2YgTC5MYXRMbmdCb3VuZHMpIHtcclxuXHRcdHJldHVybiBhO1xyXG5cdH1cclxuXHRyZXR1cm4gbmV3IEwuTGF0TG5nQm91bmRzKGEsIGIpO1xyXG59O1xyXG5cblxuXG4vKlxyXG4gKiBTaW1wbGUgZXF1aXJlY3Rhbmd1bGFyIChQbGF0ZSBDYXJyZWUpIHByb2plY3Rpb24sIHVzZWQgYnkgQ1JTIGxpa2UgRVBTRzo0MzI2IGFuZCBTaW1wbGUuXHJcbiAqL1xyXG5cclxuTC5Qcm9qZWN0aW9uID0ge307XHJcblxyXG5MLlByb2plY3Rpb24uTG9uTGF0ID0ge1xyXG5cdHByb2plY3Q6IGZ1bmN0aW9uIChsYXRsbmcpIHtcclxuXHRcdHJldHVybiBuZXcgTC5Qb2ludChsYXRsbmcubG5nLCBsYXRsbmcubGF0KTtcclxuXHR9LFxyXG5cclxuXHR1bnByb2plY3Q6IGZ1bmN0aW9uIChwb2ludCkge1xyXG5cdFx0cmV0dXJuIG5ldyBMLkxhdExuZyhwb2ludC55LCBwb2ludC54KTtcclxuXHR9LFxyXG5cclxuXHRib3VuZHM6IEwuYm91bmRzKFstMTgwLCAtOTBdLCBbMTgwLCA5MF0pXHJcbn07XHJcblxuXG5cbi8qXHJcbiAqIFNwaGVyaWNhbCBNZXJjYXRvciBpcyB0aGUgbW9zdCBwb3B1bGFyIG1hcCBwcm9qZWN0aW9uLCB1c2VkIGJ5IEVQU0c6Mzg1NyBDUlMgdXNlZCBieSBkZWZhdWx0LlxyXG4gKi9cclxuXHJcbkwuUHJvamVjdGlvbi5TcGhlcmljYWxNZXJjYXRvciA9IHtcclxuXHJcblx0UjogNjM3ODEzNyxcclxuXHRNQVhfTEFUSVRVREU6IDg1LjA1MTEyODc3OTgsXHJcblxyXG5cdHByb2plY3Q6IGZ1bmN0aW9uIChsYXRsbmcpIHtcclxuXHRcdHZhciBkID0gTWF0aC5QSSAvIDE4MCxcclxuXHRcdCAgICBtYXggPSB0aGlzLk1BWF9MQVRJVFVERSxcclxuXHRcdCAgICBsYXQgPSBNYXRoLm1heChNYXRoLm1pbihtYXgsIGxhdGxuZy5sYXQpLCAtbWF4KSxcclxuXHRcdCAgICBzaW4gPSBNYXRoLnNpbihsYXQgKiBkKTtcclxuXHJcblx0XHRyZXR1cm4gbmV3IEwuUG9pbnQoXHJcblx0XHRcdFx0dGhpcy5SICogbGF0bG5nLmxuZyAqIGQsXHJcblx0XHRcdFx0dGhpcy5SICogTWF0aC5sb2coKDEgKyBzaW4pIC8gKDEgLSBzaW4pKSAvIDIpO1xyXG5cdH0sXHJcblxyXG5cdHVucHJvamVjdDogZnVuY3Rpb24gKHBvaW50KSB7XHJcblx0XHR2YXIgZCA9IDE4MCAvIE1hdGguUEk7XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBMLkxhdExuZyhcclxuXHRcdFx0KDIgKiBNYXRoLmF0YW4oTWF0aC5leHAocG9pbnQueSAvIHRoaXMuUikpIC0gKE1hdGguUEkgLyAyKSkgKiBkLFxyXG5cdFx0XHRwb2ludC54ICogZCAvIHRoaXMuUik7XHJcblx0fSxcclxuXHJcblx0Ym91bmRzOiAoZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGQgPSA2Mzc4MTM3ICogTWF0aC5QSTtcclxuXHRcdHJldHVybiBMLmJvdW5kcyhbLWQsIC1kXSwgW2QsIGRdKTtcclxuXHR9KSgpXHJcbn07XHJcblxuXG5cbi8qXHJcbiAqIEwuQ1JTIGlzIHRoZSBiYXNlIG9iamVjdCBmb3IgYWxsIGRlZmluZWQgQ1JTIChDb29yZGluYXRlIFJlZmVyZW5jZSBTeXN0ZW1zKSBpbiBMZWFmbGV0LlxyXG4gKi9cclxuXHJcbkwuQ1JTID0ge1xyXG5cdC8vIGNvbnZlcnRzIGdlbyBjb29yZHMgdG8gcGl4ZWwgb25lc1xyXG5cdGxhdExuZ1RvUG9pbnQ6IGZ1bmN0aW9uIChsYXRsbmcsIHpvb20pIHtcclxuXHRcdHZhciBwcm9qZWN0ZWRQb2ludCA9IHRoaXMucHJvamVjdGlvbi5wcm9qZWN0KGxhdGxuZyksXHJcblx0XHQgICAgc2NhbGUgPSB0aGlzLnNjYWxlKHpvb20pO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLnRyYW5zZm9ybWF0aW9uLl90cmFuc2Zvcm0ocHJvamVjdGVkUG9pbnQsIHNjYWxlKTtcclxuXHR9LFxyXG5cclxuXHQvLyBjb252ZXJ0cyBwaXhlbCBjb29yZHMgdG8gZ2VvIGNvb3Jkc1xyXG5cdHBvaW50VG9MYXRMbmc6IGZ1bmN0aW9uIChwb2ludCwgem9vbSkge1xyXG5cdFx0dmFyIHNjYWxlID0gdGhpcy5zY2FsZSh6b29tKSxcclxuXHRcdCAgICB1bnRyYW5zZm9ybWVkUG9pbnQgPSB0aGlzLnRyYW5zZm9ybWF0aW9uLnVudHJhbnNmb3JtKHBvaW50LCBzY2FsZSk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMucHJvamVjdGlvbi51bnByb2plY3QodW50cmFuc2Zvcm1lZFBvaW50KTtcclxuXHR9LFxyXG5cclxuXHQvLyBjb252ZXJ0cyBnZW8gY29vcmRzIHRvIHByb2plY3Rpb24tc3BlY2lmaWMgY29vcmRzIChlLmcuIGluIG1ldGVycylcclxuXHRwcm9qZWN0OiBmdW5jdGlvbiAobGF0bG5nKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5wcm9qZWN0aW9uLnByb2plY3QobGF0bG5nKTtcclxuXHR9LFxyXG5cclxuXHQvLyBjb252ZXJ0cyBwcm9qZWN0ZWQgY29vcmRzIHRvIGdlbyBjb29yZHNcclxuXHR1bnByb2plY3Q6IGZ1bmN0aW9uIChwb2ludCkge1xyXG5cdFx0cmV0dXJuIHRoaXMucHJvamVjdGlvbi51bnByb2plY3QocG9pbnQpO1xyXG5cdH0sXHJcblxyXG5cdC8vIGRlZmluZXMgaG93IHRoZSB3b3JsZCBzY2FsZXMgd2l0aCB6b29tXHJcblx0c2NhbGU6IGZ1bmN0aW9uICh6b29tKSB7XHJcblx0XHRyZXR1cm4gMjU2ICogTWF0aC5wb3coMiwgem9vbSk7XHJcblx0fSxcclxuXHJcblx0em9vbTogZnVuY3Rpb24gKHNjYWxlKSB7XHJcblx0XHRyZXR1cm4gTWF0aC5sb2coc2NhbGUgLyAyNTYpIC8gTWF0aC5MTjI7XHJcblx0fSxcclxuXHJcblx0Ly8gcmV0dXJucyB0aGUgYm91bmRzIG9mIHRoZSB3b3JsZCBpbiBwcm9qZWN0ZWQgY29vcmRzIGlmIGFwcGxpY2FibGVcclxuXHRnZXRQcm9qZWN0ZWRCb3VuZHM6IGZ1bmN0aW9uICh6b29tKSB7XHJcblx0XHRpZiAodGhpcy5pbmZpbml0ZSkgeyByZXR1cm4gbnVsbDsgfVxyXG5cclxuXHRcdHZhciBiID0gdGhpcy5wcm9qZWN0aW9uLmJvdW5kcyxcclxuXHRcdCAgICBzID0gdGhpcy5zY2FsZSh6b29tKSxcclxuXHRcdCAgICBtaW4gPSB0aGlzLnRyYW5zZm9ybWF0aW9uLnRyYW5zZm9ybShiLm1pbiwgcyksXHJcblx0XHQgICAgbWF4ID0gdGhpcy50cmFuc2Zvcm1hdGlvbi50cmFuc2Zvcm0oYi5tYXgsIHMpO1xyXG5cclxuXHRcdHJldHVybiBMLmJvdW5kcyhtaW4sIG1heCk7XHJcblx0fSxcclxuXHJcblx0Ly8gd2hldGhlciBhIGNvb3JkaW5hdGUgYXhpcyB3cmFwcyBpbiBhIGdpdmVuIHJhbmdlIChlLmcuIGxvbmdpdHVkZSBmcm9tIC0xODAgdG8gMTgwKTsgZGVwZW5kcyBvbiBDUlNcclxuXHQvLyB3cmFwTG5nOiBbbWluLCBtYXhdLFxyXG5cdC8vIHdyYXBMYXQ6IFttaW4sIG1heF0sXHJcblxyXG5cdC8vIGlmIHRydWUsIHRoZSBjb29yZGluYXRlIHNwYWNlIHdpbGwgYmUgdW5ib3VuZGVkIChpbmZpbml0ZSBpbiBhbGwgZGlyZWN0aW9ucylcclxuXHQvLyBpbmZpbml0ZTogZmFsc2UsXHJcblxyXG5cdC8vIHdyYXBzIGdlbyBjb29yZHMgaW4gY2VydGFpbiByYW5nZXMgaWYgYXBwbGljYWJsZVxyXG5cdHdyYXBMYXRMbmc6IGZ1bmN0aW9uIChsYXRsbmcpIHtcclxuXHRcdHZhciBsbmcgPSB0aGlzLndyYXBMbmcgPyBMLlV0aWwud3JhcE51bShsYXRsbmcubG5nLCB0aGlzLndyYXBMbmcsIHRydWUpIDogbGF0bG5nLmxuZyxcclxuXHRcdCAgICBsYXQgPSB0aGlzLndyYXBMYXQgPyBMLlV0aWwud3JhcE51bShsYXRsbmcubGF0LCB0aGlzLndyYXBMYXQsIHRydWUpIDogbGF0bG5nLmxhdCxcclxuXHRcdCAgICBhbHQgPSBsYXRsbmcuYWx0O1xyXG5cclxuXHRcdHJldHVybiBMLmxhdExuZyhsYXQsIGxuZywgYWx0KTtcclxuXHR9XHJcbn07XHJcblxuXG5cbi8qXG4gKiBBIHNpbXBsZSBDUlMgdGhhdCBjYW4gYmUgdXNlZCBmb3IgZmxhdCBub24tRWFydGggbWFwcyBsaWtlIHBhbm9yYW1hcyBvciBnYW1lIG1hcHMuXG4gKi9cblxuTC5DUlMuU2ltcGxlID0gTC5leHRlbmQoe30sIEwuQ1JTLCB7XG5cdHByb2plY3Rpb246IEwuUHJvamVjdGlvbi5Mb25MYXQsXG5cdHRyYW5zZm9ybWF0aW9uOiBuZXcgTC5UcmFuc2Zvcm1hdGlvbigxLCAwLCAtMSwgMCksXG5cblx0c2NhbGU6IGZ1bmN0aW9uICh6b29tKSB7XG5cdFx0cmV0dXJuIE1hdGgucG93KDIsIHpvb20pO1xuXHR9LFxuXG5cdHpvb206IGZ1bmN0aW9uIChzY2FsZSkge1xuXHRcdHJldHVybiBNYXRoLmxvZyhzY2FsZSkgLyBNYXRoLkxOMjtcblx0fSxcblxuXHRkaXN0YW5jZTogZnVuY3Rpb24gKGxhdGxuZzEsIGxhdGxuZzIpIHtcblx0XHR2YXIgZHggPSBsYXRsbmcyLmxuZyAtIGxhdGxuZzEubG5nLFxuXHRcdCAgICBkeSA9IGxhdGxuZzIubGF0IC0gbGF0bG5nMS5sYXQ7XG5cblx0XHRyZXR1cm4gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcblx0fSxcblxuXHRpbmZpbml0ZTogdHJ1ZVxufSk7XG5cblxuXG4vKlxuICogTC5DUlMuRWFydGggaXMgdGhlIGJhc2UgY2xhc3MgZm9yIGFsbCBDUlMgcmVwcmVzZW50aW5nIEVhcnRoLlxuICovXG5cbkwuQ1JTLkVhcnRoID0gTC5leHRlbmQoe30sIEwuQ1JTLCB7XG5cdHdyYXBMbmc6IFstMTgwLCAxODBdLFxuXG5cdFI6IDYzNzgxMzcsXG5cblx0Ly8gZGlzdGFuY2UgYmV0d2VlbiB0d28gZ2VvZ3JhcGhpY2FsIHBvaW50cyB1c2luZyBzcGhlcmljYWwgbGF3IG9mIGNvc2luZXMgYXBwcm94aW1hdGlvblxuXHRkaXN0YW5jZTogZnVuY3Rpb24gKGxhdGxuZzEsIGxhdGxuZzIpIHtcblx0XHR2YXIgcmFkID0gTWF0aC5QSSAvIDE4MCxcblx0XHQgICAgbGF0MSA9IGxhdGxuZzEubGF0ICogcmFkLFxuXHRcdCAgICBsYXQyID0gbGF0bG5nMi5sYXQgKiByYWQsXG5cdFx0ICAgIGEgPSBNYXRoLnNpbihsYXQxKSAqIE1hdGguc2luKGxhdDIpICtcblx0XHQgICAgICAgIE1hdGguY29zKGxhdDEpICogTWF0aC5jb3MobGF0MikgKiBNYXRoLmNvcygobGF0bG5nMi5sbmcgLSBsYXRsbmcxLmxuZykgKiByYWQpO1xuXG5cdFx0cmV0dXJuIHRoaXMuUiAqIE1hdGguYWNvcyhNYXRoLm1pbihhLCAxKSk7XG5cdH1cbn0pO1xuXG5cblxuLypcclxuICogTC5DUlMuRVBTRzM4NTcgKFNwaGVyaWNhbCBNZXJjYXRvcikgaXMgdGhlIG1vc3QgY29tbW9uIENSUyBmb3Igd2ViIG1hcHBpbmcgYW5kIGlzIHVzZWQgYnkgTGVhZmxldCBieSBkZWZhdWx0LlxyXG4gKi9cclxuXHJcbkwuQ1JTLkVQU0czODU3ID0gTC5leHRlbmQoe30sIEwuQ1JTLkVhcnRoLCB7XHJcblx0Y29kZTogJ0VQU0c6Mzg1NycsXHJcblx0cHJvamVjdGlvbjogTC5Qcm9qZWN0aW9uLlNwaGVyaWNhbE1lcmNhdG9yLFxyXG5cclxuXHR0cmFuc2Zvcm1hdGlvbjogKGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBzY2FsZSA9IDAuNSAvIChNYXRoLlBJICogTC5Qcm9qZWN0aW9uLlNwaGVyaWNhbE1lcmNhdG9yLlIpO1xyXG5cdFx0cmV0dXJuIG5ldyBMLlRyYW5zZm9ybWF0aW9uKHNjYWxlLCAwLjUsIC1zY2FsZSwgMC41KTtcclxuXHR9KCkpXHJcbn0pO1xyXG5cclxuTC5DUlMuRVBTRzkwMDkxMyA9IEwuZXh0ZW5kKHt9LCBMLkNSUy5FUFNHMzg1Nywge1xyXG5cdGNvZGU6ICdFUFNHOjkwMDkxMydcclxufSk7XHJcblxuXG5cbi8qXHJcbiAqIEwuQ1JTLkVQU0c0MzI2IGlzIGEgQ1JTIHBvcHVsYXIgYW1vbmcgYWR2YW5jZWQgR0lTIHNwZWNpYWxpc3RzLlxyXG4gKi9cclxuXHJcbkwuQ1JTLkVQU0c0MzI2ID0gTC5leHRlbmQoe30sIEwuQ1JTLkVhcnRoLCB7XHJcblx0Y29kZTogJ0VQU0c6NDMyNicsXHJcblx0cHJvamVjdGlvbjogTC5Qcm9qZWN0aW9uLkxvbkxhdCxcclxuXHR0cmFuc2Zvcm1hdGlvbjogbmV3IEwuVHJhbnNmb3JtYXRpb24oMSAvIDE4MCwgMSwgLTEgLyAxODAsIDAuNSlcclxufSk7XHJcblxuXG5cbi8qXHJcbiAqIEwuTWFwIGlzIHRoZSBjZW50cmFsIGNsYXNzIG9mIHRoZSBBUEkgLSBpdCBpcyB1c2VkIHRvIGNyZWF0ZSBhIG1hcC5cclxuICovXHJcblxyXG5MLk1hcCA9IEwuRXZlbnRlZC5leHRlbmQoe1xyXG5cclxuXHRvcHRpb25zOiB7XHJcblx0XHRjcnM6IEwuQ1JTLkVQU0czODU3LFxyXG5cclxuXHRcdC8qXHJcblx0XHRjZW50ZXI6IExhdExuZyxcclxuXHRcdHpvb206IE51bWJlcixcclxuXHRcdGxheWVyczogQXJyYXksXHJcblx0XHQqL1xyXG5cclxuXHRcdGZhZGVBbmltYXRpb246IHRydWUsXHJcblx0XHR0cmFja1Jlc2l6ZTogdHJ1ZSxcclxuXHRcdG1hcmtlclpvb21BbmltYXRpb246IHRydWUsXHJcblx0XHRtYXhCb3VuZHNWaXNjb3NpdHk6IDAuMCxcclxuXHRcdHRyYW5zZm9ybTNETGltaXQ6IDgzODg2MDggLy8gUHJlY2lzaW9uIGxpbWl0IG9mIGEgMzItYml0IGZsb2F0XHJcblx0fSxcclxuXHJcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKGlkLCBvcHRpb25zKSB7IC8vIChIVE1MRWxlbWVudCBvciBTdHJpbmcsIE9iamVjdClcclxuXHRcdG9wdGlvbnMgPSBMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XHJcblxyXG5cdFx0dGhpcy5faW5pdENvbnRhaW5lcihpZCk7XHJcblx0XHR0aGlzLl9pbml0TGF5b3V0KCk7XHJcblxyXG5cdFx0Ly8gaGFjayBmb3IgaHR0cHM6Ly9naXRodWIuY29tL0xlYWZsZXQvTGVhZmxldC9pc3N1ZXMvMTk4MFxyXG5cdFx0dGhpcy5fb25SZXNpemUgPSBMLmJpbmQodGhpcy5fb25SZXNpemUsIHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuX2luaXRFdmVudHMoKTtcclxuXHJcblx0XHRpZiAob3B0aW9ucy5tYXhCb3VuZHMpIHtcclxuXHRcdFx0dGhpcy5zZXRNYXhCb3VuZHMob3B0aW9ucy5tYXhCb3VuZHMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChvcHRpb25zLnpvb20gIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR0aGlzLl96b29tID0gdGhpcy5fbGltaXRab29tKG9wdGlvbnMuem9vbSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMuY2VudGVyICYmIG9wdGlvbnMuem9vbSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHRoaXMuc2V0VmlldyhMLmxhdExuZyhvcHRpb25zLmNlbnRlciksIG9wdGlvbnMuem9vbSwge3Jlc2V0OiB0cnVlfSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5faGFuZGxlcnMgPSBbXTtcclxuXHRcdHRoaXMuX2xheWVycyA9IHt9O1xyXG5cdFx0dGhpcy5fem9vbUJvdW5kTGF5ZXJzID0ge307XHJcblx0XHR0aGlzLl9zaXplQ2hhbmdlZCA9IHRydWU7XHJcblxyXG5cdFx0dGhpcy5jYWxsSW5pdEhvb2tzKCk7XHJcblxyXG5cdFx0dGhpcy5fYWRkTGF5ZXJzKHRoaXMub3B0aW9ucy5sYXllcnMpO1xyXG5cdH0sXHJcblxyXG5cclxuXHQvLyBwdWJsaWMgbWV0aG9kcyB0aGF0IG1vZGlmeSBtYXAgc3RhdGVcclxuXHJcblx0Ly8gcmVwbGFjZWQgYnkgYW5pbWF0aW9uLXBvd2VyZWQgaW1wbGVtZW50YXRpb24gaW4gTWFwLlBhbkFuaW1hdGlvbi5qc1xyXG5cdHNldFZpZXc6IGZ1bmN0aW9uIChjZW50ZXIsIHpvb20pIHtcclxuXHRcdHpvb20gPSB6b29tID09PSB1bmRlZmluZWQgPyB0aGlzLmdldFpvb20oKSA6IHpvb207XHJcblx0XHR0aGlzLl9yZXNldFZpZXcoTC5sYXRMbmcoY2VudGVyKSwgem9vbSk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRzZXRab29tOiBmdW5jdGlvbiAoem9vbSwgb3B0aW9ucykge1xyXG5cdFx0aWYgKCF0aGlzLl9sb2FkZWQpIHtcclxuXHRcdFx0dGhpcy5fem9vbSA9IHpvb207XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMuc2V0Vmlldyh0aGlzLmdldENlbnRlcigpLCB6b29tLCB7em9vbTogb3B0aW9uc30pO1xyXG5cdH0sXHJcblxyXG5cdHpvb21JbjogZnVuY3Rpb24gKGRlbHRhLCBvcHRpb25zKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5zZXRab29tKHRoaXMuX3pvb20gKyAoZGVsdGEgfHwgMSksIG9wdGlvbnMpO1xyXG5cdH0sXHJcblxyXG5cdHpvb21PdXQ6IGZ1bmN0aW9uIChkZWx0YSwgb3B0aW9ucykge1xyXG5cdFx0cmV0dXJuIHRoaXMuc2V0Wm9vbSh0aGlzLl96b29tIC0gKGRlbHRhIHx8IDEpLCBvcHRpb25zKTtcclxuXHR9LFxyXG5cclxuXHRzZXRab29tQXJvdW5kOiBmdW5jdGlvbiAobGF0bG5nLCB6b29tLCBvcHRpb25zKSB7XHJcblx0XHR2YXIgc2NhbGUgPSB0aGlzLmdldFpvb21TY2FsZSh6b29tKSxcclxuXHRcdCAgICB2aWV3SGFsZiA9IHRoaXMuZ2V0U2l6ZSgpLmRpdmlkZUJ5KDIpLFxyXG5cdFx0ICAgIGNvbnRhaW5lclBvaW50ID0gbGF0bG5nIGluc3RhbmNlb2YgTC5Qb2ludCA/IGxhdGxuZyA6IHRoaXMubGF0TG5nVG9Db250YWluZXJQb2ludChsYXRsbmcpLFxyXG5cclxuXHRcdCAgICBjZW50ZXJPZmZzZXQgPSBjb250YWluZXJQb2ludC5zdWJ0cmFjdCh2aWV3SGFsZikubXVsdGlwbHlCeSgxIC0gMSAvIHNjYWxlKSxcclxuXHRcdCAgICBuZXdDZW50ZXIgPSB0aGlzLmNvbnRhaW5lclBvaW50VG9MYXRMbmcodmlld0hhbGYuYWRkKGNlbnRlck9mZnNldCkpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLnNldFZpZXcobmV3Q2VudGVyLCB6b29tLCB7em9vbTogb3B0aW9uc30pO1xyXG5cdH0sXHJcblxyXG5cdF9nZXRCb3VuZHNDZW50ZXJab29tOiBmdW5jdGlvbiAoYm91bmRzLCBvcHRpb25zKSB7XHJcblxyXG5cdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0XHRib3VuZHMgPSBib3VuZHMuZ2V0Qm91bmRzID8gYm91bmRzLmdldEJvdW5kcygpIDogTC5sYXRMbmdCb3VuZHMoYm91bmRzKTtcclxuXHJcblx0XHR2YXIgcGFkZGluZ1RMID0gTC5wb2ludChvcHRpb25zLnBhZGRpbmdUb3BMZWZ0IHx8IG9wdGlvbnMucGFkZGluZyB8fCBbMCwgMF0pLFxyXG5cdFx0ICAgIHBhZGRpbmdCUiA9IEwucG9pbnQob3B0aW9ucy5wYWRkaW5nQm90dG9tUmlnaHQgfHwgb3B0aW9ucy5wYWRkaW5nIHx8IFswLCAwXSksXHJcblxyXG5cdFx0ICAgIHpvb20gPSB0aGlzLmdldEJvdW5kc1pvb20oYm91bmRzLCBmYWxzZSwgcGFkZGluZ1RMLmFkZChwYWRkaW5nQlIpKTtcclxuXHJcblx0XHR6b29tID0gb3B0aW9ucy5tYXhab29tID8gTWF0aC5taW4ob3B0aW9ucy5tYXhab29tLCB6b29tKSA6IHpvb207XHJcblxyXG5cdFx0dmFyIHBhZGRpbmdPZmZzZXQgPSBwYWRkaW5nQlIuc3VidHJhY3QocGFkZGluZ1RMKS5kaXZpZGVCeSgyKSxcclxuXHJcblx0XHQgICAgc3dQb2ludCA9IHRoaXMucHJvamVjdChib3VuZHMuZ2V0U291dGhXZXN0KCksIHpvb20pLFxyXG5cdFx0ICAgIG5lUG9pbnQgPSB0aGlzLnByb2plY3QoYm91bmRzLmdldE5vcnRoRWFzdCgpLCB6b29tKSxcclxuXHRcdCAgICBjZW50ZXIgPSB0aGlzLnVucHJvamVjdChzd1BvaW50LmFkZChuZVBvaW50KS5kaXZpZGVCeSgyKS5hZGQocGFkZGluZ09mZnNldCksIHpvb20pO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGNlbnRlcjogY2VudGVyLFxyXG5cdFx0XHR6b29tOiB6b29tXHJcblx0XHR9O1xyXG5cdH0sXHJcblxyXG5cdGZpdEJvdW5kczogZnVuY3Rpb24gKGJvdW5kcywgb3B0aW9ucykge1xyXG5cdFx0dmFyIHRhcmdldCA9IHRoaXMuX2dldEJvdW5kc0NlbnRlclpvb20oYm91bmRzLCBvcHRpb25zKTtcclxuXHRcdHJldHVybiB0aGlzLnNldFZpZXcodGFyZ2V0LmNlbnRlciwgdGFyZ2V0Lnpvb20sIG9wdGlvbnMpO1xyXG5cdH0sXHJcblxyXG5cdGZpdFdvcmxkOiBmdW5jdGlvbiAob3B0aW9ucykge1xyXG5cdFx0cmV0dXJuIHRoaXMuZml0Qm91bmRzKFtbLTkwLCAtMTgwXSwgWzkwLCAxODBdXSwgb3B0aW9ucyk7XHJcblx0fSxcclxuXHJcblx0cGFuVG86IGZ1bmN0aW9uIChjZW50ZXIsIG9wdGlvbnMpIHsgLy8gKExhdExuZylcclxuXHRcdHJldHVybiB0aGlzLnNldFZpZXcoY2VudGVyLCB0aGlzLl96b29tLCB7cGFuOiBvcHRpb25zfSk7XHJcblx0fSxcclxuXHJcblx0cGFuQnk6IGZ1bmN0aW9uIChvZmZzZXQpIHsgLy8gKFBvaW50KVxyXG5cdFx0Ly8gcmVwbGFjZWQgd2l0aCBhbmltYXRlZCBwYW5CeSBpbiBNYXAuUGFuQW5pbWF0aW9uLmpzXHJcblx0XHR0aGlzLmZpcmUoJ21vdmVzdGFydCcpO1xyXG5cclxuXHRcdHRoaXMuX3Jhd1BhbkJ5KEwucG9pbnQob2Zmc2V0KSk7XHJcblxyXG5cdFx0dGhpcy5maXJlKCdtb3ZlJyk7XHJcblx0XHRyZXR1cm4gdGhpcy5maXJlKCdtb3ZlZW5kJyk7XHJcblx0fSxcclxuXHJcblx0c2V0TWF4Qm91bmRzOiBmdW5jdGlvbiAoYm91bmRzKSB7XHJcblx0XHRib3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhib3VuZHMpO1xyXG5cclxuXHRcdGlmICghYm91bmRzKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLm9mZignbW92ZWVuZCcsIHRoaXMuX3Bhbkluc2lkZU1heEJvdW5kcyk7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5tYXhCb3VuZHMpIHtcclxuXHRcdFx0dGhpcy5vZmYoJ21vdmVlbmQnLCB0aGlzLl9wYW5JbnNpZGVNYXhCb3VuZHMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMub3B0aW9ucy5tYXhCb3VuZHMgPSBib3VuZHM7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2xvYWRlZCkge1xyXG5cdFx0XHR0aGlzLl9wYW5JbnNpZGVNYXhCb3VuZHMoKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5vbignbW92ZWVuZCcsIHRoaXMuX3Bhbkluc2lkZU1heEJvdW5kcyk7XHJcblx0fSxcclxuXHJcblx0c2V0TWluWm9vbTogZnVuY3Rpb24gKHpvb20pIHtcclxuXHRcdHRoaXMub3B0aW9ucy5taW5ab29tID0gem9vbTtcclxuXHJcblx0XHRpZiAodGhpcy5fbG9hZGVkICYmIHRoaXMuZ2V0Wm9vbSgpIDwgdGhpcy5vcHRpb25zLm1pblpvb20pIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuc2V0Wm9vbSh6b29tKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRzZXRNYXhab29tOiBmdW5jdGlvbiAoem9vbSkge1xyXG5cdFx0dGhpcy5vcHRpb25zLm1heFpvb20gPSB6b29tO1xyXG5cclxuXHRcdGlmICh0aGlzLl9sb2FkZWQgJiYgKHRoaXMuZ2V0Wm9vbSgpID4gdGhpcy5vcHRpb25zLm1heFpvb20pKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLnNldFpvb20oem9vbSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0cGFuSW5zaWRlQm91bmRzOiBmdW5jdGlvbiAoYm91bmRzLCBvcHRpb25zKSB7XHJcblx0XHR0aGlzLl9lbmZvcmNpbmdCb3VuZHMgPSB0cnVlO1xyXG5cdFx0dmFyIGNlbnRlciA9IHRoaXMuZ2V0Q2VudGVyKCksXHJcblx0XHQgICAgbmV3Q2VudGVyID0gdGhpcy5fbGltaXRDZW50ZXIoY2VudGVyLCB0aGlzLl96b29tLCBMLmxhdExuZ0JvdW5kcyhib3VuZHMpKTtcclxuXHJcblx0XHRpZiAoY2VudGVyLmVxdWFscyhuZXdDZW50ZXIpKSB7IHJldHVybiB0aGlzOyB9XHJcblxyXG5cdFx0dGhpcy5wYW5UbyhuZXdDZW50ZXIsIG9wdGlvbnMpO1xyXG5cdFx0dGhpcy5fZW5mb3JjaW5nQm91bmRzID0gZmFsc2U7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRpbnZhbGlkYXRlU2l6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHRcdGlmICghdGhpcy5fbG9hZGVkKSB7IHJldHVybiB0aGlzOyB9XHJcblxyXG5cdFx0b3B0aW9ucyA9IEwuZXh0ZW5kKHtcclxuXHRcdFx0YW5pbWF0ZTogZmFsc2UsXHJcblx0XHRcdHBhbjogdHJ1ZVxyXG5cdFx0fSwgb3B0aW9ucyA9PT0gdHJ1ZSA/IHthbmltYXRlOiB0cnVlfSA6IG9wdGlvbnMpO1xyXG5cclxuXHRcdHZhciBvbGRTaXplID0gdGhpcy5nZXRTaXplKCk7XHJcblx0XHR0aGlzLl9zaXplQ2hhbmdlZCA9IHRydWU7XHJcblx0XHR0aGlzLl9sYXN0Q2VudGVyID0gbnVsbDtcclxuXHJcblx0XHR2YXIgbmV3U2l6ZSA9IHRoaXMuZ2V0U2l6ZSgpLFxyXG5cdFx0ICAgIG9sZENlbnRlciA9IG9sZFNpemUuZGl2aWRlQnkoMikucm91bmQoKSxcclxuXHRcdCAgICBuZXdDZW50ZXIgPSBuZXdTaXplLmRpdmlkZUJ5KDIpLnJvdW5kKCksXHJcblx0XHQgICAgb2Zmc2V0ID0gb2xkQ2VudGVyLnN1YnRyYWN0KG5ld0NlbnRlcik7XHJcblxyXG5cdFx0aWYgKCFvZmZzZXQueCAmJiAhb2Zmc2V0LnkpIHsgcmV0dXJuIHRoaXM7IH1cclxuXHJcblx0XHRpZiAob3B0aW9ucy5hbmltYXRlICYmIG9wdGlvbnMucGFuKSB7XHJcblx0XHRcdHRoaXMucGFuQnkob2Zmc2V0KTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAob3B0aW9ucy5wYW4pIHtcclxuXHRcdFx0XHR0aGlzLl9yYXdQYW5CeShvZmZzZXQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmZpcmUoJ21vdmUnKTtcclxuXHJcblx0XHRcdGlmIChvcHRpb25zLmRlYm91bmNlTW92ZWVuZCkge1xyXG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aGlzLl9zaXplVGltZXIpO1xyXG5cdFx0XHRcdHRoaXMuX3NpemVUaW1lciA9IHNldFRpbWVvdXQoTC5iaW5kKHRoaXMuZmlyZSwgdGhpcywgJ21vdmVlbmQnKSwgMjAwKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmZpcmUoJ21vdmVlbmQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLmZpcmUoJ3Jlc2l6ZScsIHtcclxuXHRcdFx0b2xkU2l6ZTogb2xkU2l6ZSxcclxuXHRcdFx0bmV3U2l6ZTogbmV3U2l6ZVxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0c3RvcDogZnVuY3Rpb24gKCkge1xyXG5cdFx0TC5VdGlsLmNhbmNlbEFuaW1GcmFtZSh0aGlzLl9mbHlUb0ZyYW1lKTtcclxuXHRcdGlmICh0aGlzLl9wYW5BbmltKSB7XHJcblx0XHRcdHRoaXMuX3BhbkFuaW0uc3RvcCgpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0Ly8gVE9ETyBoYW5kbGVyLmFkZFRvXHJcblx0YWRkSGFuZGxlcjogZnVuY3Rpb24gKG5hbWUsIEhhbmRsZXJDbGFzcykge1xyXG5cdFx0aWYgKCFIYW5kbGVyQ2xhc3MpIHsgcmV0dXJuIHRoaXM7IH1cclxuXHJcblx0XHR2YXIgaGFuZGxlciA9IHRoaXNbbmFtZV0gPSBuZXcgSGFuZGxlckNsYXNzKHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuX2hhbmRsZXJzLnB1c2goaGFuZGxlcik7XHJcblxyXG5cdFx0aWYgKHRoaXMub3B0aW9uc1tuYW1lXSkge1xyXG5cdFx0XHRoYW5kbGVyLmVuYWJsZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHJlbW92ZTogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHRoaXMuX2luaXRFdmVudHModHJ1ZSk7XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Ly8gdGhyb3dzIGVycm9yIGluIElFNi04XHJcblx0XHRcdGRlbGV0ZSB0aGlzLl9jb250YWluZXIuX2xlYWZsZXQ7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdHRoaXMuX2NvbnRhaW5lci5fbGVhZmxldCA9IHVuZGVmaW5lZDtcclxuXHRcdH1cclxuXHJcblx0XHRMLkRvbVV0aWwucmVtb3ZlKHRoaXMuX21hcFBhbmUpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9jbGVhckNvbnRyb2xQb3MpIHtcclxuXHRcdFx0dGhpcy5fY2xlYXJDb250cm9sUG9zKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fY2xlYXJIYW5kbGVycygpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9sb2FkZWQpIHtcclxuXHRcdFx0dGhpcy5maXJlKCd1bmxvYWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKHZhciBpIGluIHRoaXMuX2xheWVycykge1xyXG5cdFx0XHR0aGlzLl9sYXllcnNbaV0ucmVtb3ZlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0Y3JlYXRlUGFuZTogZnVuY3Rpb24gKG5hbWUsIGNvbnRhaW5lcikge1xyXG5cdFx0dmFyIGNsYXNzTmFtZSA9ICdsZWFmbGV0LXBhbmUnICsgKG5hbWUgPyAnIGxlYWZsZXQtJyArIG5hbWUucmVwbGFjZSgnUGFuZScsICcnKSArICctcGFuZScgOiAnJyksXHJcblx0XHQgICAgcGFuZSA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsIGNsYXNzTmFtZSwgY29udGFpbmVyIHx8IHRoaXMuX21hcFBhbmUpO1xyXG5cclxuXHRcdGlmIChuYW1lKSB7XHJcblx0XHRcdHRoaXMuX3BhbmVzW25hbWVdID0gcGFuZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBwYW5lO1xyXG5cdH0sXHJcblxyXG5cclxuXHQvLyBwdWJsaWMgbWV0aG9kcyBmb3IgZ2V0dGluZyBtYXAgc3RhdGVcclxuXHJcblx0Z2V0Q2VudGVyOiBmdW5jdGlvbiAoKSB7IC8vIChCb29sZWFuKSAtPiBMYXRMbmdcclxuXHRcdHRoaXMuX2NoZWNrSWZMb2FkZWQoKTtcclxuXHJcblx0XHRpZiAodGhpcy5fbGFzdENlbnRlciAmJiAhdGhpcy5fbW92ZWQoKSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fbGFzdENlbnRlcjtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLmxheWVyUG9pbnRUb0xhdExuZyh0aGlzLl9nZXRDZW50ZXJMYXllclBvaW50KCkpO1xyXG5cdH0sXHJcblxyXG5cdGdldFpvb206IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLl96b29tO1xyXG5cdH0sXHJcblxyXG5cdGdldEJvdW5kczogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGJvdW5kcyA9IHRoaXMuZ2V0UGl4ZWxCb3VuZHMoKSxcclxuXHRcdCAgICBzdyA9IHRoaXMudW5wcm9qZWN0KGJvdW5kcy5nZXRCb3R0b21MZWZ0KCkpLFxyXG5cdFx0ICAgIG5lID0gdGhpcy51bnByb2plY3QoYm91bmRzLmdldFRvcFJpZ2h0KCkpO1xyXG5cclxuXHRcdHJldHVybiBuZXcgTC5MYXRMbmdCb3VuZHMoc3csIG5lKTtcclxuXHR9LFxyXG5cclxuXHRnZXRNaW5ab29tOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLm1pblpvb20gPT09IHVuZGVmaW5lZCA/IHRoaXMuX2xheWVyc01pblpvb20gfHwgMCA6IHRoaXMub3B0aW9ucy5taW5ab29tO1xyXG5cdH0sXHJcblxyXG5cdGdldE1heFpvb206IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLm9wdGlvbnMubWF4Wm9vbSA9PT0gdW5kZWZpbmVkID9cclxuXHRcdFx0KHRoaXMuX2xheWVyc01heFpvb20gPT09IHVuZGVmaW5lZCA/IEluZmluaXR5IDogdGhpcy5fbGF5ZXJzTWF4Wm9vbSkgOlxyXG5cdFx0XHR0aGlzLm9wdGlvbnMubWF4Wm9vbTtcclxuXHR9LFxyXG5cclxuXHRnZXRCb3VuZHNab29tOiBmdW5jdGlvbiAoYm91bmRzLCBpbnNpZGUsIHBhZGRpbmcpIHsgLy8gKExhdExuZ0JvdW5kc1ssIEJvb2xlYW4sIFBvaW50XSkgLT4gTnVtYmVyXHJcblx0XHRib3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhib3VuZHMpO1xyXG5cclxuXHRcdHZhciB6b29tID0gdGhpcy5nZXRNaW5ab29tKCkgLSAoaW5zaWRlID8gMSA6IDApLFxyXG5cdFx0ICAgIG1heFpvb20gPSB0aGlzLmdldE1heFpvb20oKSxcclxuXHRcdCAgICBzaXplID0gdGhpcy5nZXRTaXplKCksXHJcblxyXG5cdFx0ICAgIG53ID0gYm91bmRzLmdldE5vcnRoV2VzdCgpLFxyXG5cdFx0ICAgIHNlID0gYm91bmRzLmdldFNvdXRoRWFzdCgpLFxyXG5cclxuXHRcdCAgICB6b29tTm90Rm91bmQgPSB0cnVlLFxyXG5cdFx0ICAgIGJvdW5kc1NpemU7XHJcblxyXG5cdFx0cGFkZGluZyA9IEwucG9pbnQocGFkZGluZyB8fCBbMCwgMF0pO1xyXG5cclxuXHRcdGRvIHtcclxuXHRcdFx0em9vbSsrO1xyXG5cdFx0XHRib3VuZHNTaXplID0gdGhpcy5wcm9qZWN0KHNlLCB6b29tKS5zdWJ0cmFjdCh0aGlzLnByb2plY3QobncsIHpvb20pKS5hZGQocGFkZGluZykuZmxvb3IoKTtcclxuXHRcdFx0em9vbU5vdEZvdW5kID0gIWluc2lkZSA/IHNpemUuY29udGFpbnMoYm91bmRzU2l6ZSkgOiBib3VuZHNTaXplLnggPCBzaXplLnggfHwgYm91bmRzU2l6ZS55IDwgc2l6ZS55O1xyXG5cclxuXHRcdH0gd2hpbGUgKHpvb21Ob3RGb3VuZCAmJiB6b29tIDw9IG1heFpvb20pO1xyXG5cclxuXHRcdGlmICh6b29tTm90Rm91bmQgJiYgaW5zaWRlKSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBpbnNpZGUgPyB6b29tIDogem9vbSAtIDE7XHJcblx0fSxcclxuXHJcblx0Z2V0U2l6ZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKCF0aGlzLl9zaXplIHx8IHRoaXMuX3NpemVDaGFuZ2VkKSB7XHJcblx0XHRcdHRoaXMuX3NpemUgPSBuZXcgTC5Qb2ludChcclxuXHRcdFx0XHR0aGlzLl9jb250YWluZXIuY2xpZW50V2lkdGgsXHJcblx0XHRcdFx0dGhpcy5fY29udGFpbmVyLmNsaWVudEhlaWdodCk7XHJcblxyXG5cdFx0XHR0aGlzLl9zaXplQ2hhbmdlZCA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMuX3NpemUuY2xvbmUoKTtcclxuXHR9LFxyXG5cclxuXHRnZXRQaXhlbEJvdW5kczogZnVuY3Rpb24gKGNlbnRlciwgem9vbSkge1xyXG5cdFx0dmFyIHRvcExlZnRQb2ludCA9IHRoaXMuX2dldFRvcExlZnRQb2ludChjZW50ZXIsIHpvb20pO1xyXG5cdFx0cmV0dXJuIG5ldyBMLkJvdW5kcyh0b3BMZWZ0UG9pbnQsIHRvcExlZnRQb2ludC5hZGQodGhpcy5nZXRTaXplKCkpKTtcclxuXHR9LFxyXG5cclxuXHRnZXRQaXhlbE9yaWdpbjogZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy5fY2hlY2tJZkxvYWRlZCgpO1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BpeGVsT3JpZ2luO1xyXG5cdH0sXHJcblxyXG5cdGdldFBpeGVsV29ybGRCb3VuZHM6IGZ1bmN0aW9uICh6b29tKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLmNycy5nZXRQcm9qZWN0ZWRCb3VuZHMoem9vbSA9PT0gdW5kZWZpbmVkID8gdGhpcy5nZXRab29tKCkgOiB6b29tKTtcclxuXHR9LFxyXG5cclxuXHRnZXRQYW5lOiBmdW5jdGlvbiAocGFuZSkge1xyXG5cdFx0cmV0dXJuIHR5cGVvZiBwYW5lID09PSAnc3RyaW5nJyA/IHRoaXMuX3BhbmVzW3BhbmVdIDogcGFuZTtcclxuXHR9LFxyXG5cclxuXHRnZXRQYW5lczogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BhbmVzO1xyXG5cdH0sXHJcblxyXG5cdGdldENvbnRhaW5lcjogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2NvbnRhaW5lcjtcclxuXHR9LFxyXG5cclxuXHJcblx0Ly8gVE9ETyByZXBsYWNlIHdpdGggdW5pdmVyc2FsIGltcGxlbWVudGF0aW9uIGFmdGVyIHJlZmFjdG9yaW5nIHByb2plY3Rpb25zXHJcblxyXG5cdGdldFpvb21TY2FsZTogZnVuY3Rpb24gKHRvWm9vbSwgZnJvbVpvb20pIHtcclxuXHRcdHZhciBjcnMgPSB0aGlzLm9wdGlvbnMuY3JzO1xyXG5cdFx0ZnJvbVpvb20gPSBmcm9tWm9vbSA9PT0gdW5kZWZpbmVkID8gdGhpcy5fem9vbSA6IGZyb21ab29tO1xyXG5cdFx0cmV0dXJuIGNycy5zY2FsZSh0b1pvb20pIC8gY3JzLnNjYWxlKGZyb21ab29tKTtcclxuXHR9LFxyXG5cclxuXHRnZXRTY2FsZVpvb206IGZ1bmN0aW9uIChzY2FsZSwgZnJvbVpvb20pIHtcclxuXHRcdHZhciBjcnMgPSB0aGlzLm9wdGlvbnMuY3JzO1xyXG5cdFx0ZnJvbVpvb20gPSBmcm9tWm9vbSA9PT0gdW5kZWZpbmVkID8gdGhpcy5fem9vbSA6IGZyb21ab29tO1xyXG5cdFx0cmV0dXJuIGNycy56b29tKHNjYWxlICogY3JzLnNjYWxlKGZyb21ab29tKSk7XHJcblx0fSxcclxuXHJcblx0Ly8gY29udmVyc2lvbiBtZXRob2RzXHJcblxyXG5cdHByb2plY3Q6IGZ1bmN0aW9uIChsYXRsbmcsIHpvb20pIHsgLy8gKExhdExuZ1ssIE51bWJlcl0pIC0+IFBvaW50XHJcblx0XHR6b29tID0gem9vbSA9PT0gdW5kZWZpbmVkID8gdGhpcy5fem9vbSA6IHpvb207XHJcblx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLmNycy5sYXRMbmdUb1BvaW50KEwubGF0TG5nKGxhdGxuZyksIHpvb20pO1xyXG5cdH0sXHJcblxyXG5cdHVucHJvamVjdDogZnVuY3Rpb24gKHBvaW50LCB6b29tKSB7IC8vIChQb2ludFssIE51bWJlcl0pIC0+IExhdExuZ1xyXG5cdFx0em9vbSA9IHpvb20gPT09IHVuZGVmaW5lZCA/IHRoaXMuX3pvb20gOiB6b29tO1xyXG5cdFx0cmV0dXJuIHRoaXMub3B0aW9ucy5jcnMucG9pbnRUb0xhdExuZyhMLnBvaW50KHBvaW50KSwgem9vbSk7XHJcblx0fSxcclxuXHJcblx0bGF5ZXJQb2ludFRvTGF0TG5nOiBmdW5jdGlvbiAocG9pbnQpIHsgLy8gKFBvaW50KVxyXG5cdFx0dmFyIHByb2plY3RlZFBvaW50ID0gTC5wb2ludChwb2ludCkuYWRkKHRoaXMuZ2V0UGl4ZWxPcmlnaW4oKSk7XHJcblx0XHRyZXR1cm4gdGhpcy51bnByb2plY3QocHJvamVjdGVkUG9pbnQpO1xyXG5cdH0sXHJcblxyXG5cdGxhdExuZ1RvTGF5ZXJQb2ludDogZnVuY3Rpb24gKGxhdGxuZykgeyAvLyAoTGF0TG5nKVxyXG5cdFx0dmFyIHByb2plY3RlZFBvaW50ID0gdGhpcy5wcm9qZWN0KEwubGF0TG5nKGxhdGxuZykpLl9yb3VuZCgpO1xyXG5cdFx0cmV0dXJuIHByb2plY3RlZFBvaW50Ll9zdWJ0cmFjdCh0aGlzLmdldFBpeGVsT3JpZ2luKCkpO1xyXG5cdH0sXHJcblxyXG5cdHdyYXBMYXRMbmc6IGZ1bmN0aW9uIChsYXRsbmcpIHtcclxuXHRcdHJldHVybiB0aGlzLm9wdGlvbnMuY3JzLndyYXBMYXRMbmcoTC5sYXRMbmcobGF0bG5nKSk7XHJcblx0fSxcclxuXHJcblx0ZGlzdGFuY2U6IGZ1bmN0aW9uIChsYXRsbmcxLCBsYXRsbmcyKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLmNycy5kaXN0YW5jZShMLmxhdExuZyhsYXRsbmcxKSwgTC5sYXRMbmcobGF0bG5nMikpO1xyXG5cdH0sXHJcblxyXG5cdGNvbnRhaW5lclBvaW50VG9MYXllclBvaW50OiBmdW5jdGlvbiAocG9pbnQpIHsgLy8gKFBvaW50KVxyXG5cdFx0cmV0dXJuIEwucG9pbnQocG9pbnQpLnN1YnRyYWN0KHRoaXMuX2dldE1hcFBhbmVQb3MoKSk7XHJcblx0fSxcclxuXHJcblx0bGF5ZXJQb2ludFRvQ29udGFpbmVyUG9pbnQ6IGZ1bmN0aW9uIChwb2ludCkgeyAvLyAoUG9pbnQpXHJcblx0XHRyZXR1cm4gTC5wb2ludChwb2ludCkuYWRkKHRoaXMuX2dldE1hcFBhbmVQb3MoKSk7XHJcblx0fSxcclxuXHJcblx0Y29udGFpbmVyUG9pbnRUb0xhdExuZzogZnVuY3Rpb24gKHBvaW50KSB7XHJcblx0XHR2YXIgbGF5ZXJQb2ludCA9IHRoaXMuY29udGFpbmVyUG9pbnRUb0xheWVyUG9pbnQoTC5wb2ludChwb2ludCkpO1xyXG5cdFx0cmV0dXJuIHRoaXMubGF5ZXJQb2ludFRvTGF0TG5nKGxheWVyUG9pbnQpO1xyXG5cdH0sXHJcblxyXG5cdGxhdExuZ1RvQ29udGFpbmVyUG9pbnQ6IGZ1bmN0aW9uIChsYXRsbmcpIHtcclxuXHRcdHJldHVybiB0aGlzLmxheWVyUG9pbnRUb0NvbnRhaW5lclBvaW50KHRoaXMubGF0TG5nVG9MYXllclBvaW50KEwubGF0TG5nKGxhdGxuZykpKTtcclxuXHR9LFxyXG5cclxuXHRtb3VzZUV2ZW50VG9Db250YWluZXJQb2ludDogZnVuY3Rpb24gKGUpIHsgLy8gKE1vdXNlRXZlbnQpXHJcblx0XHRyZXR1cm4gTC5Eb21FdmVudC5nZXRNb3VzZVBvc2l0aW9uKGUsIHRoaXMuX2NvbnRhaW5lcik7XHJcblx0fSxcclxuXHJcblx0bW91c2VFdmVudFRvTGF5ZXJQb2ludDogZnVuY3Rpb24gKGUpIHsgLy8gKE1vdXNlRXZlbnQpXHJcblx0XHRyZXR1cm4gdGhpcy5jb250YWluZXJQb2ludFRvTGF5ZXJQb2ludCh0aGlzLm1vdXNlRXZlbnRUb0NvbnRhaW5lclBvaW50KGUpKTtcclxuXHR9LFxyXG5cclxuXHRtb3VzZUV2ZW50VG9MYXRMbmc6IGZ1bmN0aW9uIChlKSB7IC8vIChNb3VzZUV2ZW50KVxyXG5cdFx0cmV0dXJuIHRoaXMubGF5ZXJQb2ludFRvTGF0TG5nKHRoaXMubW91c2VFdmVudFRvTGF5ZXJQb2ludChlKSk7XHJcblx0fSxcclxuXHJcblxyXG5cdC8vIG1hcCBpbml0aWFsaXphdGlvbiBtZXRob2RzXHJcblxyXG5cdF9pbml0Q29udGFpbmVyOiBmdW5jdGlvbiAoaWQpIHtcclxuXHRcdHZhciBjb250YWluZXIgPSB0aGlzLl9jb250YWluZXIgPSBMLkRvbVV0aWwuZ2V0KGlkKTtcclxuXHJcblx0XHRpZiAoIWNvbnRhaW5lcikge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ01hcCBjb250YWluZXIgbm90IGZvdW5kLicpO1xyXG5cdFx0fSBlbHNlIGlmIChjb250YWluZXIuX2xlYWZsZXQpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdNYXAgY29udGFpbmVyIGlzIGFscmVhZHkgaW5pdGlhbGl6ZWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0TC5Eb21FdmVudC5hZGRMaXN0ZW5lcihjb250YWluZXIsICdzY3JvbGwnLCB0aGlzLl9vblNjcm9sbCwgdGhpcyk7XHJcblx0XHRjb250YWluZXIuX2xlYWZsZXQgPSB0cnVlO1xyXG5cdH0sXHJcblxyXG5cdF9pbml0TGF5b3V0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgY29udGFpbmVyID0gdGhpcy5fY29udGFpbmVyO1xyXG5cclxuXHRcdHRoaXMuX2ZhZGVBbmltYXRlZCA9IHRoaXMub3B0aW9ucy5mYWRlQW5pbWF0aW9uICYmIEwuQnJvd3Nlci5hbnkzZDtcclxuXHJcblx0XHRMLkRvbVV0aWwuYWRkQ2xhc3MoY29udGFpbmVyLCAnbGVhZmxldC1jb250YWluZXInICtcclxuXHRcdFx0KEwuQnJvd3Nlci50b3VjaCA/ICcgbGVhZmxldC10b3VjaCcgOiAnJykgK1xyXG5cdFx0XHQoTC5Ccm93c2VyLnJldGluYSA/ICcgbGVhZmxldC1yZXRpbmEnIDogJycpICtcclxuXHRcdFx0KEwuQnJvd3Nlci5pZWx0OSA/ICcgbGVhZmxldC1vbGRpZScgOiAnJykgK1xyXG5cdFx0XHQoTC5Ccm93c2VyLnNhZmFyaSA/ICcgbGVhZmxldC1zYWZhcmknIDogJycpICtcclxuXHRcdFx0KHRoaXMuX2ZhZGVBbmltYXRlZCA/ICcgbGVhZmxldC1mYWRlLWFuaW0nIDogJycpKTtcclxuXHJcblx0XHR2YXIgcG9zaXRpb24gPSBMLkRvbVV0aWwuZ2V0U3R5bGUoY29udGFpbmVyLCAncG9zaXRpb24nKTtcclxuXHJcblx0XHRpZiAocG9zaXRpb24gIT09ICdhYnNvbHV0ZScgJiYgcG9zaXRpb24gIT09ICdyZWxhdGl2ZScgJiYgcG9zaXRpb24gIT09ICdmaXhlZCcpIHtcclxuXHRcdFx0Y29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9pbml0UGFuZXMoKTtcclxuXHJcblx0XHRpZiAodGhpcy5faW5pdENvbnRyb2xQb3MpIHtcclxuXHRcdFx0dGhpcy5faW5pdENvbnRyb2xQb3MoKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfaW5pdFBhbmVzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgcGFuZXMgPSB0aGlzLl9wYW5lcyA9IHt9O1xyXG5cdFx0dGhpcy5fcGFuZVJlbmRlcmVycyA9IHt9O1xyXG5cclxuXHRcdHRoaXMuX21hcFBhbmUgPSB0aGlzLmNyZWF0ZVBhbmUoJ21hcFBhbmUnLCB0aGlzLl9jb250YWluZXIpO1xyXG5cdFx0TC5Eb21VdGlsLnNldFBvc2l0aW9uKHRoaXMuX21hcFBhbmUsIG5ldyBMLlBvaW50KDAsIDApKTtcclxuXHJcblx0XHR0aGlzLmNyZWF0ZVBhbmUoJ3RpbGVQYW5lJyk7XHJcblx0XHR0aGlzLmNyZWF0ZVBhbmUoJ3NoYWRvd1BhbmUnKTtcclxuXHRcdHRoaXMuY3JlYXRlUGFuZSgnb3ZlcmxheVBhbmUnKTtcclxuXHRcdHRoaXMuY3JlYXRlUGFuZSgnbWFya2VyUGFuZScpO1xyXG5cdFx0dGhpcy5jcmVhdGVQYW5lKCdwb3B1cFBhbmUnKTtcclxuXHJcblx0XHRpZiAoIXRoaXMub3B0aW9ucy5tYXJrZXJab29tQW5pbWF0aW9uKSB7XHJcblx0XHRcdEwuRG9tVXRpbC5hZGRDbGFzcyhwYW5lcy5tYXJrZXJQYW5lLCAnbGVhZmxldC16b29tLWhpZGUnKTtcclxuXHRcdFx0TC5Eb21VdGlsLmFkZENsYXNzKHBhbmVzLnNoYWRvd1BhbmUsICdsZWFmbGV0LXpvb20taGlkZScpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cclxuXHQvLyBwcml2YXRlIG1ldGhvZHMgdGhhdCBtb2RpZnkgbWFwIHN0YXRlXHJcblxyXG5cdF9yZXNldFZpZXc6IGZ1bmN0aW9uIChjZW50ZXIsIHpvb20pIHtcclxuXHRcdEwuRG9tVXRpbC5zZXRQb3NpdGlvbih0aGlzLl9tYXBQYW5lLCBuZXcgTC5Qb2ludCgwLCAwKSk7XHJcblxyXG5cdFx0dmFyIGxvYWRpbmcgPSAhdGhpcy5fbG9hZGVkO1xyXG5cdFx0dGhpcy5fbG9hZGVkID0gdHJ1ZTtcclxuXHRcdHpvb20gPSB0aGlzLl9saW1pdFpvb20oem9vbSk7XHJcblxyXG5cdFx0dmFyIHpvb21DaGFuZ2VkID0gdGhpcy5fem9vbSAhPT0gem9vbTtcclxuXHRcdHRoaXNcclxuXHRcdFx0Ll9tb3ZlU3RhcnQoem9vbUNoYW5nZWQpXHJcblx0XHRcdC5fbW92ZShjZW50ZXIsIHpvb20pXHJcblx0XHRcdC5fbW92ZUVuZCh6b29tQ2hhbmdlZCk7XHJcblxyXG5cdFx0dGhpcy5maXJlKCd2aWV3cmVzZXQnKTtcclxuXHJcblx0XHRpZiAobG9hZGluZykge1xyXG5cdFx0XHR0aGlzLmZpcmUoJ2xvYWQnKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfbW92ZVN0YXJ0OiBmdW5jdGlvbiAoem9vbUNoYW5nZWQpIHtcclxuXHRcdGlmICh6b29tQ2hhbmdlZCkge1xyXG5cdFx0XHR0aGlzLmZpcmUoJ3pvb21zdGFydCcpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMuZmlyZSgnbW92ZXN0YXJ0Jyk7XHJcblx0fSxcclxuXHJcblx0X21vdmU6IGZ1bmN0aW9uIChjZW50ZXIsIHpvb20sIGRhdGEpIHtcclxuXHRcdGlmICh6b29tID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0em9vbSA9IHRoaXMuX3pvb207XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHpvb21DaGFuZ2VkID0gdGhpcy5fem9vbSAhPT0gem9vbTtcclxuXHJcblx0XHR0aGlzLl96b29tID0gem9vbTtcclxuXHRcdHRoaXMuX2xhc3RDZW50ZXIgPSBjZW50ZXI7XHJcblx0XHR0aGlzLl9waXhlbE9yaWdpbiA9IHRoaXMuX2dldE5ld1BpeGVsT3JpZ2luKGNlbnRlcik7XHJcblxyXG5cdFx0aWYgKHpvb21DaGFuZ2VkKSB7XHJcblx0XHRcdHRoaXMuZmlyZSgnem9vbScsIGRhdGEpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMuZmlyZSgnbW92ZScsIGRhdGEpO1xyXG5cdH0sXHJcblxyXG5cdF9tb3ZlRW5kOiBmdW5jdGlvbiAoem9vbUNoYW5nZWQpIHtcclxuXHRcdGlmICh6b29tQ2hhbmdlZCkge1xyXG5cdFx0XHR0aGlzLmZpcmUoJ3pvb21lbmQnKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLmZpcmUoJ21vdmVlbmQnKTtcclxuXHR9LFxyXG5cclxuXHRfcmF3UGFuQnk6IGZ1bmN0aW9uIChvZmZzZXQpIHtcclxuXHRcdEwuRG9tVXRpbC5zZXRQb3NpdGlvbih0aGlzLl9tYXBQYW5lLCB0aGlzLl9nZXRNYXBQYW5lUG9zKCkuc3VidHJhY3Qob2Zmc2V0KSk7XHJcblx0fSxcclxuXHJcblx0X2dldFpvb21TcGFuOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5nZXRNYXhab29tKCkgLSB0aGlzLmdldE1pblpvb20oKTtcclxuXHR9LFxyXG5cclxuXHRfcGFuSW5zaWRlTWF4Qm91bmRzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoIXRoaXMuX2VuZm9yY2luZ0JvdW5kcykge1xyXG5cdFx0XHR0aGlzLnBhbkluc2lkZUJvdW5kcyh0aGlzLm9wdGlvbnMubWF4Qm91bmRzKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfY2hlY2tJZkxvYWRlZDogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKCF0aGlzLl9sb2FkZWQpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdTZXQgbWFwIGNlbnRlciBhbmQgem9vbSBmaXJzdC4nKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvLyBET00gZXZlbnQgaGFuZGxpbmdcclxuXHJcblx0X2luaXRFdmVudHM6IGZ1bmN0aW9uIChyZW1vdmUpIHtcclxuXHRcdGlmICghTC5Eb21FdmVudCkgeyByZXR1cm47IH1cclxuXHJcblx0XHR0aGlzLl90YXJnZXRzID0ge307XHJcblx0XHR0aGlzLl90YXJnZXRzW0wuc3RhbXAodGhpcy5fY29udGFpbmVyKV0gPSB0aGlzO1xyXG5cclxuXHRcdHZhciBvbk9mZiA9IHJlbW92ZSA/ICdvZmYnIDogJ29uJztcclxuXHJcblx0XHRMLkRvbUV2ZW50W29uT2ZmXSh0aGlzLl9jb250YWluZXIsICdjbGljayBkYmxjbGljayBtb3VzZWRvd24gbW91c2V1cCAnICtcclxuXHRcdFx0J21vdXNlb3ZlciBtb3VzZW91dCBtb3VzZW1vdmUgY29udGV4dG1lbnUga2V5cHJlc3MnLCB0aGlzLl9oYW5kbGVET01FdmVudCwgdGhpcyk7XHJcblxyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy50cmFja1Jlc2l6ZSkge1xyXG5cdFx0XHRMLkRvbUV2ZW50W29uT2ZmXSh3aW5kb3csICdyZXNpemUnLCB0aGlzLl9vblJlc2l6ZSwgdGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKEwuQnJvd3Nlci5hbnkzZCAmJiB0aGlzLm9wdGlvbnMudHJhbnNmb3JtM0RMaW1pdCkge1xyXG5cdFx0XHR0aGlzW29uT2ZmXSgnbW92ZWVuZCcsIHRoaXMuX29uTW92ZUVuZCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X29uUmVzaXplOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRMLlV0aWwuY2FuY2VsQW5pbUZyYW1lKHRoaXMuX3Jlc2l6ZVJlcXVlc3QpO1xyXG5cdFx0dGhpcy5fcmVzaXplUmVxdWVzdCA9IEwuVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKFxyXG5cdFx0ICAgICAgICBmdW5jdGlvbiAoKSB7IHRoaXMuaW52YWxpZGF0ZVNpemUoe2RlYm91bmNlTW92ZWVuZDogdHJ1ZX0pOyB9LCB0aGlzKTtcclxuXHR9LFxyXG5cclxuXHRfb25TY3JvbGw6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMuX2NvbnRhaW5lci5zY3JvbGxUb3AgID0gMDtcclxuXHRcdHRoaXMuX2NvbnRhaW5lci5zY3JvbGxMZWZ0ID0gMDtcclxuXHR9LFxyXG5cclxuXHRfb25Nb3ZlRW5kOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgcG9zID0gdGhpcy5fZ2V0TWFwUGFuZVBvcygpO1xyXG5cdFx0aWYgKE1hdGgubWF4KE1hdGguYWJzKHBvcy54KSwgTWF0aC5hYnMocG9zLnkpKSA+PSB0aGlzLm9wdGlvbnMudHJhbnNmb3JtM0RMaW1pdCkge1xyXG5cdFx0XHQvLyBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xMjAzODczIGJ1dCBXZWJraXQgYWxzbyBoYXZlXHJcblx0XHRcdC8vIGEgcGl4ZWwgb2Zmc2V0IG9uIHZlcnkgaGlnaCB2YWx1ZXMsIHNlZTogaHR0cDovL2pzZmlkZGxlLm5ldC9kZzZyNWhoYi9cclxuXHRcdFx0dGhpcy5fcmVzZXRWaWV3KHRoaXMuZ2V0Q2VudGVyKCksIHRoaXMuZ2V0Wm9vbSgpKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfZmluZEV2ZW50VGFyZ2V0czogZnVuY3Rpb24gKGUsIHR5cGUpIHtcclxuXHRcdHZhciB0YXJnZXRzID0gW10sXHJcblx0XHQgICAgdGFyZ2V0LFxyXG5cdFx0ICAgIGlzSG92ZXIgPSB0eXBlID09PSAnbW91c2VvdXQnIHx8IHR5cGUgPT09ICdtb3VzZW92ZXInLFxyXG5cdFx0ICAgIHNyYyA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcclxuXHJcblx0XHR3aGlsZSAoc3JjKSB7XHJcblx0XHRcdHRhcmdldCA9IHRoaXMuX3RhcmdldHNbTC5zdGFtcChzcmMpXTtcclxuXHRcdFx0aWYgKHRhcmdldCAmJiB0YXJnZXQubGlzdGVucyh0eXBlLCB0cnVlKSkge1xyXG5cdFx0XHRcdGlmIChpc0hvdmVyICYmICFMLkRvbUV2ZW50Ll9pc0V4dGVybmFsVGFyZ2V0KHNyYywgZSkpIHsgYnJlYWs7IH1cclxuXHRcdFx0XHR0YXJnZXRzLnB1c2godGFyZ2V0KTtcclxuXHRcdFx0XHRpZiAoaXNIb3ZlcikgeyBicmVhazsgfVxyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChzcmMgPT09IHRoaXMuX2NvbnRhaW5lcikgeyBicmVhazsgfVxyXG5cdFx0XHRzcmMgPSBzcmMucGFyZW50Tm9kZTtcclxuXHRcdH1cclxuXHRcdGlmICghdGFyZ2V0cy5sZW5ndGggJiYgIWlzSG92ZXIgJiYgTC5Eb21FdmVudC5faXNFeHRlcm5hbFRhcmdldChzcmMsIGUpKSB7XHJcblx0XHRcdHRhcmdldHMgPSBbdGhpc107XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGFyZ2V0cztcclxuXHR9LFxyXG5cclxuXHRfaGFuZGxlRE9NRXZlbnQ6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRpZiAoIXRoaXMuX2xvYWRlZCB8fCBMLkRvbUV2ZW50Ll9za2lwcGVkKGUpKSB7IHJldHVybjsgfVxyXG5cclxuXHRcdC8vIGZpbmQgdGhlIGxheWVyIHRoZSBldmVudCBpcyBwcm9wYWdhdGluZyBmcm9tIGFuZCBpdHMgcGFyZW50c1xyXG5cdFx0dmFyIHR5cGUgPSBlLnR5cGUgPT09ICdrZXlwcmVzcycgJiYgZS5rZXlDb2RlID09PSAxMyA/ICdjbGljaycgOiBlLnR5cGU7XHJcblxyXG5cdFx0aWYgKGUudHlwZSA9PT0gJ2NsaWNrJykge1xyXG5cdFx0XHQvLyBGaXJlIGEgc3ludGhldGljICdwcmVjbGljaycgZXZlbnQgd2hpY2ggcHJvcGFnYXRlcyB1cCAobWFpbmx5IGZvciBjbG9zaW5nIHBvcHVwcykuXHJcblx0XHRcdHZhciBzeW50aCA9IEwuVXRpbC5leHRlbmQoe30sIGUpO1xyXG5cdFx0XHRzeW50aC50eXBlID0gJ3ByZWNsaWNrJztcclxuXHRcdFx0dGhpcy5faGFuZGxlRE9NRXZlbnQoc3ludGgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlID09PSAnbW91c2Vkb3duJykge1xyXG5cdFx0XHQvLyBwcmV2ZW50cyBvdXRsaW5lIHdoZW4gY2xpY2tpbmcgb24ga2V5Ym9hcmQtZm9jdXNhYmxlIGVsZW1lbnRcclxuXHRcdFx0TC5Eb21VdGlsLnByZXZlbnRPdXRsaW5lKGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fZmlyZURPTUV2ZW50KGUsIHR5cGUpO1xyXG5cdH0sXHJcblxyXG5cdF9maXJlRE9NRXZlbnQ6IGZ1bmN0aW9uIChlLCB0eXBlLCB0YXJnZXRzKSB7XHJcblxyXG5cdFx0aWYgKGUuX3N0b3BwZWQpIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0dGFyZ2V0cyA9ICh0YXJnZXRzIHx8IFtdKS5jb25jYXQodGhpcy5fZmluZEV2ZW50VGFyZ2V0cyhlLCB0eXBlKSk7XHJcblxyXG5cdFx0aWYgKCF0YXJnZXRzLmxlbmd0aCkgeyByZXR1cm47IH1cclxuXHJcblx0XHR2YXIgdGFyZ2V0ID0gdGFyZ2V0c1swXTtcclxuXHRcdGlmICh0eXBlID09PSAnY29udGV4dG1lbnUnICYmIHRhcmdldC5saXN0ZW5zKHR5cGUsIHRydWUpKSB7XHJcblx0XHRcdEwuRG9tRXZlbnQucHJldmVudERlZmF1bHQoZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gcHJldmVudHMgZmlyaW5nIGNsaWNrIGFmdGVyIHlvdSBqdXN0IGRyYWdnZWQgYW4gb2JqZWN0XHJcblx0XHRpZiAoKGUudHlwZSA9PT0gJ2NsaWNrJyB8fCBlLnR5cGUgPT09ICdwcmVjbGljaycpICYmICFlLl9zaW11bGF0ZWQgJiYgdGhpcy5fZHJhZ2dhYmxlTW92ZWQodGFyZ2V0KSkgeyByZXR1cm47IH1cclxuXHJcblx0XHR2YXIgZGF0YSA9IHtcclxuXHRcdFx0b3JpZ2luYWxFdmVudDogZVxyXG5cdFx0fTtcclxuXHJcblx0XHRpZiAoZS50eXBlICE9PSAna2V5cHJlc3MnKSB7XHJcblx0XHRcdHZhciBpc01hcmtlciA9IHRhcmdldCBpbnN0YW5jZW9mIEwuTWFya2VyO1xyXG5cdFx0XHRkYXRhLmNvbnRhaW5lclBvaW50ID0gaXNNYXJrZXIgP1xyXG5cdFx0XHRcdFx0dGhpcy5sYXRMbmdUb0NvbnRhaW5lclBvaW50KHRhcmdldC5nZXRMYXRMbmcoKSkgOiB0aGlzLm1vdXNlRXZlbnRUb0NvbnRhaW5lclBvaW50KGUpO1xyXG5cdFx0XHRkYXRhLmxheWVyUG9pbnQgPSB0aGlzLmNvbnRhaW5lclBvaW50VG9MYXllclBvaW50KGRhdGEuY29udGFpbmVyUG9pbnQpO1xyXG5cdFx0XHRkYXRhLmxhdGxuZyA9IGlzTWFya2VyID8gdGFyZ2V0LmdldExhdExuZygpIDogdGhpcy5sYXllclBvaW50VG9MYXRMbmcoZGF0YS5sYXllclBvaW50KTtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRhcmdldHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dGFyZ2V0c1tpXS5maXJlKHR5cGUsIGRhdGEsIHRydWUpO1xyXG5cdFx0XHRpZiAoZGF0YS5vcmlnaW5hbEV2ZW50Ll9zdG9wcGVkIHx8XHJcblx0XHRcdFx0KHRhcmdldHNbaV0ub3B0aW9ucy5ub25CdWJibGluZ0V2ZW50cyAmJiBMLlV0aWwuaW5kZXhPZih0YXJnZXRzW2ldLm9wdGlvbnMubm9uQnViYmxpbmdFdmVudHMsIHR5cGUpICE9PSAtMSkpIHsgcmV0dXJuOyB9XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X2RyYWdnYWJsZU1vdmVkOiBmdW5jdGlvbiAob2JqKSB7XHJcblx0XHRvYmogPSBvYmoub3B0aW9ucy5kcmFnZ2FibGUgPyBvYmogOiB0aGlzO1xyXG5cdFx0cmV0dXJuIChvYmouZHJhZ2dpbmcgJiYgb2JqLmRyYWdnaW5nLm1vdmVkKCkpIHx8ICh0aGlzLmJveFpvb20gJiYgdGhpcy5ib3hab29tLm1vdmVkKCkpO1xyXG5cdH0sXHJcblxyXG5cdF9jbGVhckhhbmRsZXJzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5faGFuZGxlcnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0dGhpcy5faGFuZGxlcnNbaV0uZGlzYWJsZSgpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdHdoZW5SZWFkeTogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XHJcblx0XHRpZiAodGhpcy5fbG9hZGVkKSB7XHJcblx0XHRcdGNhbGxiYWNrLmNhbGwoY29udGV4dCB8fCB0aGlzLCB7dGFyZ2V0OiB0aGlzfSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLm9uKCdsb2FkJywgY2FsbGJhY2ssIGNvbnRleHQpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblxyXG5cdC8vIHByaXZhdGUgbWV0aG9kcyBmb3IgZ2V0dGluZyBtYXAgc3RhdGVcclxuXHJcblx0X2dldE1hcFBhbmVQb3M6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBMLkRvbVV0aWwuZ2V0UG9zaXRpb24odGhpcy5fbWFwUGFuZSkgfHwgbmV3IEwuUG9pbnQoMCwgMCk7XHJcblx0fSxcclxuXHJcblx0X21vdmVkOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgcG9zID0gdGhpcy5fZ2V0TWFwUGFuZVBvcygpO1xyXG5cdFx0cmV0dXJuIHBvcyAmJiAhcG9zLmVxdWFscyhbMCwgMF0pO1xyXG5cdH0sXHJcblxyXG5cdF9nZXRUb3BMZWZ0UG9pbnQ6IGZ1bmN0aW9uIChjZW50ZXIsIHpvb20pIHtcclxuXHRcdHZhciBwaXhlbE9yaWdpbiA9IGNlbnRlciAmJiB6b29tICE9PSB1bmRlZmluZWQgP1xyXG5cdFx0XHR0aGlzLl9nZXROZXdQaXhlbE9yaWdpbihjZW50ZXIsIHpvb20pIDpcclxuXHRcdFx0dGhpcy5nZXRQaXhlbE9yaWdpbigpO1xyXG5cdFx0cmV0dXJuIHBpeGVsT3JpZ2luLnN1YnRyYWN0KHRoaXMuX2dldE1hcFBhbmVQb3MoKSk7XHJcblx0fSxcclxuXHJcblx0X2dldE5ld1BpeGVsT3JpZ2luOiBmdW5jdGlvbiAoY2VudGVyLCB6b29tKSB7XHJcblx0XHR2YXIgdmlld0hhbGYgPSB0aGlzLmdldFNpemUoKS5fZGl2aWRlQnkoMik7XHJcblx0XHRyZXR1cm4gdGhpcy5wcm9qZWN0KGNlbnRlciwgem9vbSkuX3N1YnRyYWN0KHZpZXdIYWxmKS5fYWRkKHRoaXMuX2dldE1hcFBhbmVQb3MoKSkuX3JvdW5kKCk7XHJcblx0fSxcclxuXHJcblx0X2xhdExuZ1RvTmV3TGF5ZXJQb2ludDogZnVuY3Rpb24gKGxhdGxuZywgem9vbSwgY2VudGVyKSB7XHJcblx0XHR2YXIgdG9wTGVmdCA9IHRoaXMuX2dldE5ld1BpeGVsT3JpZ2luKGNlbnRlciwgem9vbSk7XHJcblx0XHRyZXR1cm4gdGhpcy5wcm9qZWN0KGxhdGxuZywgem9vbSkuX3N1YnRyYWN0KHRvcExlZnQpO1xyXG5cdH0sXHJcblxyXG5cdC8vIGxheWVyIHBvaW50IG9mIHRoZSBjdXJyZW50IGNlbnRlclxyXG5cdF9nZXRDZW50ZXJMYXllclBvaW50OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jb250YWluZXJQb2ludFRvTGF5ZXJQb2ludCh0aGlzLmdldFNpemUoKS5fZGl2aWRlQnkoMikpO1xyXG5cdH0sXHJcblxyXG5cdC8vIG9mZnNldCBvZiB0aGUgc3BlY2lmaWVkIHBsYWNlIHRvIHRoZSBjdXJyZW50IGNlbnRlciBpbiBwaXhlbHNcclxuXHRfZ2V0Q2VudGVyT2Zmc2V0OiBmdW5jdGlvbiAobGF0bG5nKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5sYXRMbmdUb0xheWVyUG9pbnQobGF0bG5nKS5zdWJ0cmFjdCh0aGlzLl9nZXRDZW50ZXJMYXllclBvaW50KCkpO1xyXG5cdH0sXHJcblxyXG5cdC8vIGFkanVzdCBjZW50ZXIgZm9yIHZpZXcgdG8gZ2V0IGluc2lkZSBib3VuZHNcclxuXHRfbGltaXRDZW50ZXI6IGZ1bmN0aW9uIChjZW50ZXIsIHpvb20sIGJvdW5kcykge1xyXG5cclxuXHRcdGlmICghYm91bmRzKSB7IHJldHVybiBjZW50ZXI7IH1cclxuXHJcblx0XHR2YXIgY2VudGVyUG9pbnQgPSB0aGlzLnByb2plY3QoY2VudGVyLCB6b29tKSxcclxuXHRcdCAgICB2aWV3SGFsZiA9IHRoaXMuZ2V0U2l6ZSgpLmRpdmlkZUJ5KDIpLFxyXG5cdFx0ICAgIHZpZXdCb3VuZHMgPSBuZXcgTC5Cb3VuZHMoY2VudGVyUG9pbnQuc3VidHJhY3Qodmlld0hhbGYpLCBjZW50ZXJQb2ludC5hZGQodmlld0hhbGYpKSxcclxuXHRcdCAgICBvZmZzZXQgPSB0aGlzLl9nZXRCb3VuZHNPZmZzZXQodmlld0JvdW5kcywgYm91bmRzLCB6b29tKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy51bnByb2plY3QoY2VudGVyUG9pbnQuYWRkKG9mZnNldCksIHpvb20pO1xyXG5cdH0sXHJcblxyXG5cdC8vIGFkanVzdCBvZmZzZXQgZm9yIHZpZXcgdG8gZ2V0IGluc2lkZSBib3VuZHNcclxuXHRfbGltaXRPZmZzZXQ6IGZ1bmN0aW9uIChvZmZzZXQsIGJvdW5kcykge1xyXG5cdFx0aWYgKCFib3VuZHMpIHsgcmV0dXJuIG9mZnNldDsgfVxyXG5cclxuXHRcdHZhciB2aWV3Qm91bmRzID0gdGhpcy5nZXRQaXhlbEJvdW5kcygpLFxyXG5cdFx0ICAgIG5ld0JvdW5kcyA9IG5ldyBMLkJvdW5kcyh2aWV3Qm91bmRzLm1pbi5hZGQob2Zmc2V0KSwgdmlld0JvdW5kcy5tYXguYWRkKG9mZnNldCkpO1xyXG5cclxuXHRcdHJldHVybiBvZmZzZXQuYWRkKHRoaXMuX2dldEJvdW5kc09mZnNldChuZXdCb3VuZHMsIGJvdW5kcykpO1xyXG5cdH0sXHJcblxyXG5cdC8vIHJldHVybnMgb2Zmc2V0IG5lZWRlZCBmb3IgcHhCb3VuZHMgdG8gZ2V0IGluc2lkZSBtYXhCb3VuZHMgYXQgYSBzcGVjaWZpZWQgem9vbVxyXG5cdF9nZXRCb3VuZHNPZmZzZXQ6IGZ1bmN0aW9uIChweEJvdW5kcywgbWF4Qm91bmRzLCB6b29tKSB7XHJcblx0XHR2YXIgbndPZmZzZXQgPSB0aGlzLnByb2plY3QobWF4Qm91bmRzLmdldE5vcnRoV2VzdCgpLCB6b29tKS5zdWJ0cmFjdChweEJvdW5kcy5taW4pLFxyXG5cdFx0ICAgIHNlT2Zmc2V0ID0gdGhpcy5wcm9qZWN0KG1heEJvdW5kcy5nZXRTb3V0aEVhc3QoKSwgem9vbSkuc3VidHJhY3QocHhCb3VuZHMubWF4KSxcclxuXHJcblx0XHQgICAgZHggPSB0aGlzLl9yZWJvdW5kKG53T2Zmc2V0LngsIC1zZU9mZnNldC54KSxcclxuXHRcdCAgICBkeSA9IHRoaXMuX3JlYm91bmQobndPZmZzZXQueSwgLXNlT2Zmc2V0LnkpO1xyXG5cclxuXHRcdHJldHVybiBuZXcgTC5Qb2ludChkeCwgZHkpO1xyXG5cdH0sXHJcblxyXG5cdF9yZWJvdW5kOiBmdW5jdGlvbiAobGVmdCwgcmlnaHQpIHtcclxuXHRcdHJldHVybiBsZWZ0ICsgcmlnaHQgPiAwID9cclxuXHRcdFx0TWF0aC5yb3VuZChsZWZ0IC0gcmlnaHQpIC8gMiA6XHJcblx0XHRcdE1hdGgubWF4KDAsIE1hdGguY2VpbChsZWZ0KSkgLSBNYXRoLm1heCgwLCBNYXRoLmZsb29yKHJpZ2h0KSk7XHJcblx0fSxcclxuXHJcblx0X2xpbWl0Wm9vbTogZnVuY3Rpb24gKHpvb20pIHtcclxuXHRcdHZhciBtaW4gPSB0aGlzLmdldE1pblpvb20oKSxcclxuXHRcdCAgICBtYXggPSB0aGlzLmdldE1heFpvb20oKTtcclxuXHRcdGlmICghTC5Ccm93c2VyLmFueTNkKSB7IHpvb20gPSBNYXRoLnJvdW5kKHpvb20pOyB9XHJcblxyXG5cdFx0cmV0dXJuIE1hdGgubWF4KG1pbiwgTWF0aC5taW4obWF4LCB6b29tKSk7XHJcblx0fVxyXG59KTtcclxuXHJcbkwubWFwID0gZnVuY3Rpb24gKGlkLCBvcHRpb25zKSB7XHJcblx0cmV0dXJuIG5ldyBMLk1hcChpZCwgb3B0aW9ucyk7XHJcbn07XHJcblxuXG5cblxuTC5MYXllciA9IEwuRXZlbnRlZC5leHRlbmQoe1xuXG5cdG9wdGlvbnM6IHtcblx0XHRwYW5lOiAnb3ZlcmxheVBhbmUnLFxuXHRcdG5vbkJ1YmJsaW5nRXZlbnRzOiBbXSAgLy8gQXJyYXkgb2YgZXZlbnRzIHRoYXQgc2hvdWxkIG5vdCBiZSBidWJibGVkIHRvIERPTSBwYXJlbnRzIChsaWtlIHRoZSBtYXApXG5cdH0sXG5cblx0YWRkVG86IGZ1bmN0aW9uIChtYXApIHtcblx0XHRtYXAuYWRkTGF5ZXIodGhpcyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0cmVtb3ZlOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMucmVtb3ZlRnJvbSh0aGlzLl9tYXAgfHwgdGhpcy5fbWFwVG9BZGQpO1xuXHR9LFxuXG5cdHJlbW92ZUZyb206IGZ1bmN0aW9uIChvYmopIHtcblx0XHRpZiAob2JqKSB7XG5cdFx0XHRvYmoucmVtb3ZlTGF5ZXIodGhpcyk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdGdldFBhbmU6IGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0cmV0dXJuIHRoaXMuX21hcC5nZXRQYW5lKG5hbWUgPyAodGhpcy5vcHRpb25zW25hbWVdIHx8IG5hbWUpIDogdGhpcy5vcHRpb25zLnBhbmUpO1xuXHR9LFxuXG5cdGFkZEludGVyYWN0aXZlVGFyZ2V0OiBmdW5jdGlvbiAodGFyZ2V0RWwpIHtcblx0XHR0aGlzLl9tYXAuX3RhcmdldHNbTC5zdGFtcCh0YXJnZXRFbCldID0gdGhpcztcblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRyZW1vdmVJbnRlcmFjdGl2ZVRhcmdldDogZnVuY3Rpb24gKHRhcmdldEVsKSB7XG5cdFx0ZGVsZXRlIHRoaXMuX21hcC5fdGFyZ2V0c1tMLnN0YW1wKHRhcmdldEVsKV07XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0X2xheWVyQWRkOiBmdW5jdGlvbiAoZSkge1xuXHRcdHZhciBtYXAgPSBlLnRhcmdldDtcblxuXHRcdC8vIGNoZWNrIGluIGNhc2UgbGF5ZXIgZ2V0cyBhZGRlZCBhbmQgdGhlbiByZW1vdmVkIGJlZm9yZSB0aGUgbWFwIGlzIHJlYWR5XG5cdFx0aWYgKCFtYXAuaGFzTGF5ZXIodGhpcykpIHsgcmV0dXJuOyB9XG5cblx0XHR0aGlzLl9tYXAgPSBtYXA7XG5cdFx0dGhpcy5fem9vbUFuaW1hdGVkID0gbWFwLl96b29tQW5pbWF0ZWQ7XG5cblx0XHRpZiAodGhpcy5nZXRFdmVudHMpIHtcblx0XHRcdG1hcC5vbih0aGlzLmdldEV2ZW50cygpLCB0aGlzKTtcblx0XHR9XG5cblx0XHR0aGlzLm9uQWRkKG1hcCk7XG5cblx0XHRpZiAodGhpcy5nZXRBdHRyaWJ1dGlvbiAmJiB0aGlzLl9tYXAuYXR0cmlidXRpb25Db250cm9sKSB7XG5cdFx0XHR0aGlzLl9tYXAuYXR0cmlidXRpb25Db250cm9sLmFkZEF0dHJpYnV0aW9uKHRoaXMuZ2V0QXR0cmlidXRpb24oKSk7XG5cdFx0fVxuXG5cdFx0dGhpcy5maXJlKCdhZGQnKTtcblx0XHRtYXAuZmlyZSgnbGF5ZXJhZGQnLCB7bGF5ZXI6IHRoaXN9KTtcblx0fVxufSk7XG5cblxuTC5NYXAuaW5jbHVkZSh7XG5cdGFkZExheWVyOiBmdW5jdGlvbiAobGF5ZXIpIHtcblx0XHR2YXIgaWQgPSBMLnN0YW1wKGxheWVyKTtcblx0XHRpZiAodGhpcy5fbGF5ZXJzW2lkXSkgeyByZXR1cm4gbGF5ZXI7IH1cblx0XHR0aGlzLl9sYXllcnNbaWRdID0gbGF5ZXI7XG5cblx0XHRsYXllci5fbWFwVG9BZGQgPSB0aGlzO1xuXG5cdFx0aWYgKGxheWVyLmJlZm9yZUFkZCkge1xuXHRcdFx0bGF5ZXIuYmVmb3JlQWRkKHRoaXMpO1xuXHRcdH1cblxuXHRcdHRoaXMud2hlblJlYWR5KGxheWVyLl9sYXllckFkZCwgbGF5ZXIpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0cmVtb3ZlTGF5ZXI6IGZ1bmN0aW9uIChsYXllcikge1xuXHRcdHZhciBpZCA9IEwuc3RhbXAobGF5ZXIpO1xuXG5cdFx0aWYgKCF0aGlzLl9sYXllcnNbaWRdKSB7IHJldHVybiB0aGlzOyB9XG5cblx0XHRpZiAodGhpcy5fbG9hZGVkKSB7XG5cdFx0XHRsYXllci5vblJlbW92ZSh0aGlzKTtcblx0XHR9XG5cblx0XHRpZiAobGF5ZXIuZ2V0QXR0cmlidXRpb24gJiYgdGhpcy5hdHRyaWJ1dGlvbkNvbnRyb2wpIHtcblx0XHRcdHRoaXMuYXR0cmlidXRpb25Db250cm9sLnJlbW92ZUF0dHJpYnV0aW9uKGxheWVyLmdldEF0dHJpYnV0aW9uKCkpO1xuXHRcdH1cblxuXHRcdGlmIChsYXllci5nZXRFdmVudHMpIHtcblx0XHRcdHRoaXMub2ZmKGxheWVyLmdldEV2ZW50cygpLCBsYXllcik7XG5cdFx0fVxuXG5cdFx0ZGVsZXRlIHRoaXMuX2xheWVyc1tpZF07XG5cblx0XHRpZiAodGhpcy5fbG9hZGVkKSB7XG5cdFx0XHR0aGlzLmZpcmUoJ2xheWVycmVtb3ZlJywge2xheWVyOiBsYXllcn0pO1xuXHRcdFx0bGF5ZXIuZmlyZSgncmVtb3ZlJyk7XG5cdFx0fVxuXG5cdFx0bGF5ZXIuX21hcCA9IGxheWVyLl9tYXBUb0FkZCA9IG51bGw7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRoYXNMYXllcjogZnVuY3Rpb24gKGxheWVyKSB7XG5cdFx0cmV0dXJuICEhbGF5ZXIgJiYgKEwuc3RhbXAobGF5ZXIpIGluIHRoaXMuX2xheWVycyk7XG5cdH0sXG5cblx0ZWFjaExheWVyOiBmdW5jdGlvbiAobWV0aG9kLCBjb250ZXh0KSB7XG5cdFx0Zm9yICh2YXIgaSBpbiB0aGlzLl9sYXllcnMpIHtcblx0XHRcdG1ldGhvZC5jYWxsKGNvbnRleHQsIHRoaXMuX2xheWVyc1tpXSk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdF9hZGRMYXllcnM6IGZ1bmN0aW9uIChsYXllcnMpIHtcblx0XHRsYXllcnMgPSBsYXllcnMgPyAoTC5VdGlsLmlzQXJyYXkobGF5ZXJzKSA/IGxheWVycyA6IFtsYXllcnNdKSA6IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IGxheWVycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0dGhpcy5hZGRMYXllcihsYXllcnNbaV0pO1xuXHRcdH1cblx0fSxcblxuXHRfYWRkWm9vbUxpbWl0OiBmdW5jdGlvbiAobGF5ZXIpIHtcblx0XHRpZiAoaXNOYU4obGF5ZXIub3B0aW9ucy5tYXhab29tKSB8fCAhaXNOYU4obGF5ZXIub3B0aW9ucy5taW5ab29tKSkge1xuXHRcdFx0dGhpcy5fem9vbUJvdW5kTGF5ZXJzW0wuc3RhbXAobGF5ZXIpXSA9IGxheWVyO1xuXHRcdFx0dGhpcy5fdXBkYXRlWm9vbUxldmVscygpO1xuXHRcdH1cblx0fSxcblxuXHRfcmVtb3ZlWm9vbUxpbWl0OiBmdW5jdGlvbiAobGF5ZXIpIHtcblx0XHR2YXIgaWQgPSBMLnN0YW1wKGxheWVyKTtcblxuXHRcdGlmICh0aGlzLl96b29tQm91bmRMYXllcnNbaWRdKSB7XG5cdFx0XHRkZWxldGUgdGhpcy5fem9vbUJvdW5kTGF5ZXJzW2lkXTtcblx0XHRcdHRoaXMuX3VwZGF0ZVpvb21MZXZlbHMoKTtcblx0XHR9XG5cdH0sXG5cblx0X3VwZGF0ZVpvb21MZXZlbHM6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgbWluWm9vbSA9IEluZmluaXR5LFxuXHRcdCAgICBtYXhab29tID0gLUluZmluaXR5LFxuXHRcdCAgICBvbGRab29tU3BhbiA9IHRoaXMuX2dldFpvb21TcGFuKCk7XG5cblx0XHRmb3IgKHZhciBpIGluIHRoaXMuX3pvb21Cb3VuZExheWVycykge1xuXHRcdFx0dmFyIG9wdGlvbnMgPSB0aGlzLl96b29tQm91bmRMYXllcnNbaV0ub3B0aW9ucztcblxuXHRcdFx0bWluWm9vbSA9IG9wdGlvbnMubWluWm9vbSA9PT0gdW5kZWZpbmVkID8gbWluWm9vbSA6IE1hdGgubWluKG1pblpvb20sIG9wdGlvbnMubWluWm9vbSk7XG5cdFx0XHRtYXhab29tID0gb3B0aW9ucy5tYXhab29tID09PSB1bmRlZmluZWQgPyBtYXhab29tIDogTWF0aC5tYXgobWF4Wm9vbSwgb3B0aW9ucy5tYXhab29tKTtcblx0XHR9XG5cblx0XHR0aGlzLl9sYXllcnNNYXhab29tID0gbWF4Wm9vbSA9PT0gLUluZmluaXR5ID8gdW5kZWZpbmVkIDogbWF4Wm9vbTtcblx0XHR0aGlzLl9sYXllcnNNaW5ab29tID0gbWluWm9vbSA9PT0gSW5maW5pdHkgPyB1bmRlZmluZWQgOiBtaW5ab29tO1xuXG5cdFx0aWYgKG9sZFpvb21TcGFuICE9PSB0aGlzLl9nZXRab29tU3BhbigpKSB7XG5cdFx0XHR0aGlzLmZpcmUoJ3pvb21sZXZlbHNjaGFuZ2UnKTtcblx0XHR9XG5cdH1cbn0pO1xuXG5cblxuLypcclxuICogTWVyY2F0b3IgcHJvamVjdGlvbiB0aGF0IHRha2VzIGludG8gYWNjb3VudCB0aGF0IHRoZSBFYXJ0aCBpcyBub3QgYSBwZXJmZWN0IHNwaGVyZS5cclxuICogTGVzcyBwb3B1bGFyIHRoYW4gc3BoZXJpY2FsIG1lcmNhdG9yOyB1c2VkIGJ5IHByb2plY3Rpb25zIGxpa2UgRVBTRzozMzk1LlxyXG4gKi9cclxuXHJcbkwuUHJvamVjdGlvbi5NZXJjYXRvciA9IHtcclxuXHRSOiA2Mzc4MTM3LFxyXG5cdFJfTUlOT1I6IDYzNTY3NTIuMzE0MjQ1MTc5LFxyXG5cclxuXHRib3VuZHM6IEwuYm91bmRzKFstMjAwMzc1MDguMzQyNzksIC0xNTQ5NjU3MC43Mzk3Ml0sIFsyMDAzNzUwOC4zNDI3OSwgMTg3NjQ2NTYuMjMxMzhdKSxcclxuXHJcblx0cHJvamVjdDogZnVuY3Rpb24gKGxhdGxuZykge1xyXG5cdFx0dmFyIGQgPSBNYXRoLlBJIC8gMTgwLFxyXG5cdFx0ICAgIHIgPSB0aGlzLlIsXHJcblx0XHQgICAgeSA9IGxhdGxuZy5sYXQgKiBkLFxyXG5cdFx0ICAgIHRtcCA9IHRoaXMuUl9NSU5PUiAvIHIsXHJcblx0XHQgICAgZSA9IE1hdGguc3FydCgxIC0gdG1wICogdG1wKSxcclxuXHRcdCAgICBjb24gPSBlICogTWF0aC5zaW4oeSk7XHJcblxyXG5cdFx0dmFyIHRzID0gTWF0aC50YW4oTWF0aC5QSSAvIDQgLSB5IC8gMikgLyBNYXRoLnBvdygoMSAtIGNvbikgLyAoMSArIGNvbiksIGUgLyAyKTtcclxuXHRcdHkgPSAtciAqIE1hdGgubG9nKE1hdGgubWF4KHRzLCAxRS0xMCkpO1xyXG5cclxuXHRcdHJldHVybiBuZXcgTC5Qb2ludChsYXRsbmcubG5nICogZCAqIHIsIHkpO1xyXG5cdH0sXHJcblxyXG5cdHVucHJvamVjdDogZnVuY3Rpb24gKHBvaW50KSB7XHJcblx0XHR2YXIgZCA9IDE4MCAvIE1hdGguUEksXHJcblx0XHQgICAgciA9IHRoaXMuUixcclxuXHRcdCAgICB0bXAgPSB0aGlzLlJfTUlOT1IgLyByLFxyXG5cdFx0ICAgIGUgPSBNYXRoLnNxcnQoMSAtIHRtcCAqIHRtcCksXHJcblx0XHQgICAgdHMgPSBNYXRoLmV4cCgtcG9pbnQueSAvIHIpLFxyXG5cdFx0ICAgIHBoaSA9IE1hdGguUEkgLyAyIC0gMiAqIE1hdGguYXRhbih0cyk7XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGRwaGkgPSAwLjEsIGNvbjsgaSA8IDE1ICYmIE1hdGguYWJzKGRwaGkpID4gMWUtNzsgaSsrKSB7XHJcblx0XHRcdGNvbiA9IGUgKiBNYXRoLnNpbihwaGkpO1xyXG5cdFx0XHRjb24gPSBNYXRoLnBvdygoMSAtIGNvbikgLyAoMSArIGNvbiksIGUgLyAyKTtcclxuXHRcdFx0ZHBoaSA9IE1hdGguUEkgLyAyIC0gMiAqIE1hdGguYXRhbih0cyAqIGNvbikgLSBwaGk7XHJcblx0XHRcdHBoaSArPSBkcGhpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBuZXcgTC5MYXRMbmcocGhpICogZCwgcG9pbnQueCAqIGQgLyByKTtcclxuXHR9XHJcbn07XHJcblxuXG5cbi8qXHJcbiAqIEwuQ1JTLkVQU0czODU3IChXb3JsZCBNZXJjYXRvcikgQ1JTIGltcGxlbWVudGF0aW9uLlxyXG4gKi9cclxuXHJcbkwuQ1JTLkVQU0czMzk1ID0gTC5leHRlbmQoe30sIEwuQ1JTLkVhcnRoLCB7XHJcblx0Y29kZTogJ0VQU0c6MzM5NScsXHJcblx0cHJvamVjdGlvbjogTC5Qcm9qZWN0aW9uLk1lcmNhdG9yLFxyXG5cclxuXHR0cmFuc2Zvcm1hdGlvbjogKGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBzY2FsZSA9IDAuNSAvIChNYXRoLlBJICogTC5Qcm9qZWN0aW9uLk1lcmNhdG9yLlIpO1xyXG5cdFx0cmV0dXJuIG5ldyBMLlRyYW5zZm9ybWF0aW9uKHNjYWxlLCAwLjUsIC1zY2FsZSwgMC41KTtcclxuXHR9KCkpXHJcbn0pO1xyXG5cblxuXG4vKlxuICogTC5HcmlkTGF5ZXIgaXMgdXNlZCBhcyBiYXNlIGNsYXNzIGZvciBncmlkLWxpa2UgbGF5ZXJzIGxpa2UgVGlsZUxheWVyLlxuICovXG5cbkwuR3JpZExheWVyID0gTC5MYXllci5leHRlbmQoe1xuXG5cdG9wdGlvbnM6IHtcblx0XHRwYW5lOiAndGlsZVBhbmUnLFxuXG5cdFx0dGlsZVNpemU6IDI1Nixcblx0XHRvcGFjaXR5OiAxLFxuXHRcdHpJbmRleDogMSxcblxuXHRcdHVwZGF0ZVdoZW5JZGxlOiBMLkJyb3dzZXIubW9iaWxlLFxuXHRcdHVwZGF0ZUludGVydmFsOiAyMDAsXG5cblx0XHRhdHRyaWJ1dGlvbjogbnVsbCxcblx0XHRib3VuZHM6IG51bGwsXG5cblx0XHRtaW5ab29tOiAwXG5cdFx0Ly8gbWF4Wm9vbTogPE51bWJlcj5cblx0XHQvLyBub1dyYXA6IGZhbHNlXG5cdH0sXG5cblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0XHRvcHRpb25zID0gTC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuXHR9LFxuXG5cdG9uQWRkOiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5faW5pdENvbnRhaW5lcigpO1xuXG5cdFx0dGhpcy5fbGV2ZWxzID0ge307XG5cdFx0dGhpcy5fdGlsZXMgPSB7fTtcblxuXHRcdHRoaXMuX3Jlc2V0VmlldygpO1xuXHRcdHRoaXMuX3VwZGF0ZSgpO1xuXHR9LFxuXG5cdGJlZm9yZUFkZDogZnVuY3Rpb24gKG1hcCkge1xuXHRcdG1hcC5fYWRkWm9vbUxpbWl0KHRoaXMpO1xuXHR9LFxuXG5cdG9uUmVtb3ZlOiBmdW5jdGlvbiAobWFwKSB7XG5cdFx0TC5Eb21VdGlsLnJlbW92ZSh0aGlzLl9jb250YWluZXIpO1xuXHRcdG1hcC5fcmVtb3ZlWm9vbUxpbWl0KHRoaXMpO1xuXHRcdHRoaXMuX2NvbnRhaW5lciA9IG51bGw7XG5cdFx0dGhpcy5fdGlsZVpvb20gPSBudWxsO1xuXHR9LFxuXG5cdGJyaW5nVG9Gcm9udDogZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0aGlzLl9tYXApIHtcblx0XHRcdEwuRG9tVXRpbC50b0Zyb250KHRoaXMuX2NvbnRhaW5lcik7XG5cdFx0XHR0aGlzLl9zZXRBdXRvWkluZGV4KE1hdGgubWF4KTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0YnJpbmdUb0JhY2s6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5fbWFwKSB7XG5cdFx0XHRMLkRvbVV0aWwudG9CYWNrKHRoaXMuX2NvbnRhaW5lcik7XG5cdFx0XHR0aGlzLl9zZXRBdXRvWkluZGV4KE1hdGgubWluKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0Z2V0QXR0cmlidXRpb246IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uO1xuXHR9LFxuXG5cdGdldENvbnRhaW5lcjogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLl9jb250YWluZXI7XG5cdH0sXG5cblx0c2V0T3BhY2l0eTogZnVuY3Rpb24gKG9wYWNpdHkpIHtcblx0XHR0aGlzLm9wdGlvbnMub3BhY2l0eSA9IG9wYWNpdHk7XG5cdFx0dGhpcy5fdXBkYXRlT3BhY2l0eSgpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHNldFpJbmRleDogZnVuY3Rpb24gKHpJbmRleCkge1xuXHRcdHRoaXMub3B0aW9ucy56SW5kZXggPSB6SW5kZXg7XG5cdFx0dGhpcy5fdXBkYXRlWkluZGV4KCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRpc0xvYWRpbmc6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5fbG9hZGluZztcblx0fSxcblxuXHRyZWRyYXc6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5fbWFwKSB7XG5cdFx0XHR0aGlzLl9yZW1vdmVBbGxUaWxlcygpO1xuXHRcdFx0dGhpcy5fdXBkYXRlKCk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdGdldEV2ZW50czogZnVuY3Rpb24gKCkge1xuXHRcdHZhciBldmVudHMgPSB7XG5cdFx0XHR2aWV3cmVzZXQ6IHRoaXMuX3Jlc2V0QWxsLFxuXHRcdFx0em9vbTogdGhpcy5fcmVzZXRWaWV3LFxuXHRcdFx0bW92ZWVuZDogdGhpcy5fb25Nb3ZlRW5kXG5cdFx0fTtcblxuXHRcdGlmICghdGhpcy5vcHRpb25zLnVwZGF0ZVdoZW5JZGxlKSB7XG5cdFx0XHQvLyB1cGRhdGUgdGlsZXMgb24gbW92ZSwgYnV0IG5vdCBtb3JlIG9mdGVuIHRoYW4gb25jZSBwZXIgZ2l2ZW4gaW50ZXJ2YWxcblx0XHRcdGlmICghdGhpcy5fb25Nb3ZlKSB7XG5cdFx0XHRcdHRoaXMuX29uTW92ZSA9IEwuVXRpbC50aHJvdHRsZSh0aGlzLl9vbk1vdmVFbmQsIHRoaXMub3B0aW9ucy51cGRhdGVJbnRlcnZhbCwgdGhpcyk7XG5cdFx0XHR9XG5cblx0XHRcdGV2ZW50cy5tb3ZlID0gdGhpcy5fb25Nb3ZlO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl96b29tQW5pbWF0ZWQpIHtcblx0XHRcdGV2ZW50cy56b29tYW5pbSA9IHRoaXMuX2FuaW1hdGVab29tO1xuXHRcdH1cblxuXHRcdHJldHVybiBldmVudHM7XG5cdH0sXG5cblx0Y3JlYXRlVGlsZTogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0fSxcblxuXHRnZXRUaWxlU2l6ZTogZnVuY3Rpb24gKCkge1xuXHRcdHZhciBzID0gdGhpcy5vcHRpb25zLnRpbGVTaXplO1xuXHRcdHJldHVybiBzIGluc3RhbmNlb2YgTC5Qb2ludCA/IHMgOiBuZXcgTC5Qb2ludChzLCBzKTtcblx0fSxcblxuXHRfdXBkYXRlWkluZGV4OiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuX2NvbnRhaW5lciAmJiB0aGlzLm9wdGlvbnMuekluZGV4ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5vcHRpb25zLnpJbmRleCAhPT0gbnVsbCkge1xuXHRcdFx0dGhpcy5fY29udGFpbmVyLnN0eWxlLnpJbmRleCA9IHRoaXMub3B0aW9ucy56SW5kZXg7XG5cdFx0fVxuXHR9LFxuXG5cdF9zZXRBdXRvWkluZGV4OiBmdW5jdGlvbiAoY29tcGFyZSkge1xuXHRcdC8vIGdvIHRocm91Z2ggYWxsIG90aGVyIGxheWVycyBvZiB0aGUgc2FtZSBwYW5lLCBzZXQgekluZGV4IHRvIG1heCArIDEgKGZyb250KSBvciBtaW4gLSAxIChiYWNrKVxuXG5cdFx0dmFyIGxheWVycyA9IHRoaXMuZ2V0UGFuZSgpLmNoaWxkcmVuLFxuXHRcdCAgICBlZGdlWkluZGV4ID0gLWNvbXBhcmUoLUluZmluaXR5LCBJbmZpbml0eSk7IC8vIC1JbmZpbml0eSBmb3IgbWF4LCBJbmZpbml0eSBmb3IgbWluXG5cblx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gbGF5ZXJzLmxlbmd0aCwgekluZGV4OyBpIDwgbGVuOyBpKyspIHtcblxuXHRcdFx0ekluZGV4ID0gbGF5ZXJzW2ldLnN0eWxlLnpJbmRleDtcblxuXHRcdFx0aWYgKGxheWVyc1tpXSAhPT0gdGhpcy5fY29udGFpbmVyICYmIHpJbmRleCkge1xuXHRcdFx0XHRlZGdlWkluZGV4ID0gY29tcGFyZShlZGdlWkluZGV4LCArekluZGV4KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoaXNGaW5pdGUoZWRnZVpJbmRleCkpIHtcblx0XHRcdHRoaXMub3B0aW9ucy56SW5kZXggPSBlZGdlWkluZGV4ICsgY29tcGFyZSgtMSwgMSk7XG5cdFx0XHR0aGlzLl91cGRhdGVaSW5kZXgoKTtcblx0XHR9XG5cdH0sXG5cblx0X3VwZGF0ZU9wYWNpdHk6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoIXRoaXMuX21hcCkgeyByZXR1cm47IH1cblxuXHRcdC8vIElFIGRvZXNuJ3QgaW5oZXJpdCBmaWx0ZXIgb3BhY2l0eSBwcm9wZXJseSwgc28gd2UncmUgZm9yY2VkIHRvIHNldCBpdCBvbiB0aWxlc1xuXHRcdGlmIChMLkJyb3dzZXIuaWVsdDkgfHwgIXRoaXMuX21hcC5fZmFkZUFuaW1hdGVkKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0TC5Eb21VdGlsLnNldE9wYWNpdHkodGhpcy5fY29udGFpbmVyLCB0aGlzLm9wdGlvbnMub3BhY2l0eSk7XG5cblx0XHR2YXIgbm93ID0gK25ldyBEYXRlKCksXG5cdFx0ICAgIG5leHRGcmFtZSA9IGZhbHNlLFxuXHRcdCAgICB3aWxsUHJ1bmUgPSBmYWxzZTtcblxuXHRcdGZvciAodmFyIGtleSBpbiB0aGlzLl90aWxlcykge1xuXHRcdFx0dmFyIHRpbGUgPSB0aGlzLl90aWxlc1trZXldO1xuXHRcdFx0aWYgKCF0aWxlLmN1cnJlbnQgfHwgIXRpbGUubG9hZGVkKSB7IGNvbnRpbnVlOyB9XG5cblx0XHRcdHZhciBmYWRlID0gTWF0aC5taW4oMSwgKG5vdyAtIHRpbGUubG9hZGVkKSAvIDIwMCk7XG5cblx0XHRcdEwuRG9tVXRpbC5zZXRPcGFjaXR5KHRpbGUuZWwsIGZhZGUpO1xuXHRcdFx0aWYgKGZhZGUgPCAxKSB7XG5cdFx0XHRcdG5leHRGcmFtZSA9IHRydWU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAodGlsZS5hY3RpdmUpIHsgd2lsbFBydW5lID0gdHJ1ZTsgfVxuXHRcdFx0XHR0aWxlLmFjdGl2ZSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHdpbGxQcnVuZSAmJiAhdGhpcy5fbm9QcnVuZSkgeyB0aGlzLl9wcnVuZVRpbGVzKCk7IH1cblxuXHRcdGlmIChuZXh0RnJhbWUpIHtcblx0XHRcdEwuVXRpbC5jYW5jZWxBbmltRnJhbWUodGhpcy5fZmFkZUZyYW1lKTtcblx0XHRcdHRoaXMuX2ZhZGVGcmFtZSA9IEwuVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKHRoaXMuX3VwZGF0ZU9wYWNpdHksIHRoaXMpO1xuXHRcdH1cblx0fSxcblxuXHRfaW5pdENvbnRhaW5lcjogZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0aGlzLl9jb250YWluZXIpIHsgcmV0dXJuOyB9XG5cblx0XHR0aGlzLl9jb250YWluZXIgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnbGVhZmxldC1sYXllcicpO1xuXHRcdHRoaXMuX3VwZGF0ZVpJbmRleCgpO1xuXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5vcGFjaXR5IDwgMSkge1xuXHRcdFx0dGhpcy5fdXBkYXRlT3BhY2l0eSgpO1xuXHRcdH1cblxuXHRcdHRoaXMuZ2V0UGFuZSgpLmFwcGVuZENoaWxkKHRoaXMuX2NvbnRhaW5lcik7XG5cdH0sXG5cblx0X3VwZGF0ZUxldmVsczogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHpvb20gPSB0aGlzLl90aWxlWm9vbSxcblx0XHQgICAgbWF4Wm9vbSA9IHRoaXMub3B0aW9ucy5tYXhab29tO1xuXG5cdFx0Zm9yICh2YXIgeiBpbiB0aGlzLl9sZXZlbHMpIHtcblx0XHRcdGlmICh0aGlzLl9sZXZlbHNbel0uZWwuY2hpbGRyZW4ubGVuZ3RoIHx8IHogPT09IHpvb20pIHtcblx0XHRcdFx0dGhpcy5fbGV2ZWxzW3pdLmVsLnN0eWxlLnpJbmRleCA9IG1heFpvb20gLSBNYXRoLmFicyh6b29tIC0geik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRMLkRvbVV0aWwucmVtb3ZlKHRoaXMuX2xldmVsc1t6XS5lbCk7XG5cdFx0XHRcdGRlbGV0ZSB0aGlzLl9sZXZlbHNbel07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFyIGxldmVsID0gdGhpcy5fbGV2ZWxzW3pvb21dLFxuXHRcdCAgICBtYXAgPSB0aGlzLl9tYXA7XG5cblx0XHRpZiAoIWxldmVsKSB7XG5cdFx0XHRsZXZlbCA9IHRoaXMuX2xldmVsc1t6b29tXSA9IHt9O1xuXG5cdFx0XHRsZXZlbC5lbCA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdsZWFmbGV0LXRpbGUtY29udGFpbmVyIGxlYWZsZXQtem9vbS1hbmltYXRlZCcsIHRoaXMuX2NvbnRhaW5lcik7XG5cdFx0XHRsZXZlbC5lbC5zdHlsZS56SW5kZXggPSBtYXhab29tO1xuXG5cdFx0XHRsZXZlbC5vcmlnaW4gPSBtYXAucHJvamVjdChtYXAudW5wcm9qZWN0KG1hcC5nZXRQaXhlbE9yaWdpbigpKSwgem9vbSkucm91bmQoKTtcblx0XHRcdGxldmVsLnpvb20gPSB6b29tO1xuXG5cdFx0XHR0aGlzLl9zZXRab29tVHJhbnNmb3JtKGxldmVsLCBtYXAuZ2V0Q2VudGVyKCksIG1hcC5nZXRab29tKCkpO1xuXG5cdFx0XHQvLyBmb3JjZSB0aGUgYnJvd3NlciB0byBjb25zaWRlciB0aGUgbmV3bHkgYWRkZWQgZWxlbWVudCBmb3IgdHJhbnNpdGlvblxuXHRcdFx0TC5VdGlsLmZhbHNlRm4obGV2ZWwuZWwub2Zmc2V0V2lkdGgpO1xuXHRcdH1cblxuXHRcdHRoaXMuX2xldmVsID0gbGV2ZWw7XG5cblx0XHRyZXR1cm4gbGV2ZWw7XG5cdH0sXG5cblx0X3BydW5lVGlsZXM6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIga2V5LCB0aWxlO1xuXG5cdFx0dmFyIHpvb20gPSB0aGlzLl9tYXAuZ2V0Wm9vbSgpO1xuXHRcdGlmICh6b29tID4gdGhpcy5vcHRpb25zLm1heFpvb20gfHxcblx0XHRcdHpvb20gPCB0aGlzLm9wdGlvbnMubWluWm9vbSkgeyByZXR1cm4gdGhpcy5fcmVtb3ZlQWxsVGlsZXMoKTsgfVxuXG5cdFx0Zm9yIChrZXkgaW4gdGhpcy5fdGlsZXMpIHtcblx0XHRcdHRpbGUgPSB0aGlzLl90aWxlc1trZXldO1xuXHRcdFx0dGlsZS5yZXRhaW4gPSB0aWxlLmN1cnJlbnQ7XG5cdFx0fVxuXG5cdFx0Zm9yIChrZXkgaW4gdGhpcy5fdGlsZXMpIHtcblx0XHRcdHRpbGUgPSB0aGlzLl90aWxlc1trZXldO1xuXHRcdFx0aWYgKHRpbGUuY3VycmVudCAmJiAhdGlsZS5hY3RpdmUpIHtcblx0XHRcdFx0dmFyIGNvb3JkcyA9IHRpbGUuY29vcmRzO1xuXHRcdFx0XHRpZiAoIXRoaXMuX3JldGFpblBhcmVudChjb29yZHMueCwgY29vcmRzLnksIGNvb3Jkcy56LCBjb29yZHMueiAtIDUpKSB7XG5cdFx0XHRcdFx0dGhpcy5fcmV0YWluQ2hpbGRyZW4oY29vcmRzLngsIGNvb3Jkcy55LCBjb29yZHMueiwgY29vcmRzLnogKyAyKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZvciAoa2V5IGluIHRoaXMuX3RpbGVzKSB7XG5cdFx0XHRpZiAoIXRoaXMuX3RpbGVzW2tleV0ucmV0YWluKSB7XG5cdFx0XHRcdHRoaXMuX3JlbW92ZVRpbGUoa2V5KTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0X3JlbW92ZUFsbFRpbGVzOiBmdW5jdGlvbiAoKSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIHRoaXMuX3RpbGVzKSB7XG5cdFx0XHR0aGlzLl9yZW1vdmVUaWxlKGtleSk7XG5cdFx0fVxuXHR9LFxuXG5cdF9yZXNldEFsbDogZnVuY3Rpb24gKCkge1xuXHRcdGZvciAodmFyIHogaW4gdGhpcy5fbGV2ZWxzKSB7XG5cdFx0XHRMLkRvbVV0aWwucmVtb3ZlKHRoaXMuX2xldmVsc1t6XS5lbCk7XG5cdFx0XHRkZWxldGUgdGhpcy5fbGV2ZWxzW3pdO1xuXHRcdH1cblx0XHR0aGlzLl9yZW1vdmVBbGxUaWxlcygpO1xuXG5cdFx0dGhpcy5fdGlsZVpvb20gPSBudWxsO1xuXHRcdHRoaXMuX3Jlc2V0VmlldygpO1xuXHR9LFxuXG5cdF9yZXRhaW5QYXJlbnQ6IGZ1bmN0aW9uICh4LCB5LCB6LCBtaW5ab29tKSB7XG5cdFx0dmFyIHgyID0gTWF0aC5mbG9vcih4IC8gMiksXG5cdFx0ICAgIHkyID0gTWF0aC5mbG9vcih5IC8gMiksXG5cdFx0ICAgIHoyID0geiAtIDE7XG5cblx0XHR2YXIga2V5ID0geDIgKyAnOicgKyB5MiArICc6JyArIHoyLFxuXHRcdCAgICB0aWxlID0gdGhpcy5fdGlsZXNba2V5XTtcblxuXHRcdGlmICh0aWxlICYmIHRpbGUuYWN0aXZlKSB7XG5cdFx0XHR0aWxlLnJldGFpbiA9IHRydWU7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblxuXHRcdH0gZWxzZSBpZiAodGlsZSAmJiB0aWxlLmxvYWRlZCkge1xuXHRcdFx0dGlsZS5yZXRhaW4gPSB0cnVlO1xuXHRcdH1cblxuXHRcdGlmICh6MiA+IG1pblpvb20pIHtcblx0XHRcdHJldHVybiB0aGlzLl9yZXRhaW5QYXJlbnQoeDIsIHkyLCB6MiwgbWluWm9vbSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdF9yZXRhaW5DaGlsZHJlbjogZnVuY3Rpb24gKHgsIHksIHosIG1heFpvb20pIHtcblxuXHRcdGZvciAodmFyIGkgPSAyICogeDsgaSA8IDIgKiB4ICsgMjsgaSsrKSB7XG5cdFx0XHRmb3IgKHZhciBqID0gMiAqIHk7IGogPCAyICogeSArIDI7IGorKykge1xuXG5cdFx0XHRcdHZhciBrZXkgPSBpICsgJzonICsgaiArICc6JyArICh6ICsgMSksXG5cdFx0XHRcdCAgICB0aWxlID0gdGhpcy5fdGlsZXNba2V5XTtcblxuXHRcdFx0XHRpZiAodGlsZSAmJiB0aWxlLmFjdGl2ZSkge1xuXHRcdFx0XHRcdHRpbGUucmV0YWluID0gdHJ1ZTtcblx0XHRcdFx0XHRjb250aW51ZTtcblxuXHRcdFx0XHR9IGVsc2UgaWYgKHRpbGUgJiYgdGlsZS5sb2FkZWQpIHtcblx0XHRcdFx0XHR0aWxlLnJldGFpbiA9IHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoeiArIDEgPCBtYXhab29tKSB7XG5cdFx0XHRcdFx0dGhpcy5fcmV0YWluQ2hpbGRyZW4oaSwgaiwgeiArIDEsIG1heFpvb20pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdF9yZXNldFZpZXc6IGZ1bmN0aW9uIChlKSB7XG5cdFx0dmFyIGFuaW1hdGluZyA9IGUgJiYgKGUucGluY2ggfHwgZS5mbHlUbyk7XG5cdFx0dGhpcy5fc2V0Vmlldyh0aGlzLl9tYXAuZ2V0Q2VudGVyKCksIHRoaXMuX21hcC5nZXRab29tKCksIGFuaW1hdGluZywgYW5pbWF0aW5nKTtcblx0fSxcblxuXHRfYW5pbWF0ZVpvb206IGZ1bmN0aW9uIChlKSB7XG5cdFx0dGhpcy5fc2V0VmlldyhlLmNlbnRlciwgZS56b29tLCB0cnVlLCBlLm5vVXBkYXRlKTtcblx0fSxcblxuXHRfc2V0VmlldzogZnVuY3Rpb24gKGNlbnRlciwgem9vbSwgbm9QcnVuZSwgbm9VcGRhdGUpIHtcblx0XHR2YXIgdGlsZVpvb20gPSBNYXRoLnJvdW5kKHpvb20pO1xuXHRcdGlmICgodGhpcy5vcHRpb25zLm1heFpvb20gIT09IHVuZGVmaW5lZCAmJiB0aWxlWm9vbSA+IHRoaXMub3B0aW9ucy5tYXhab29tKSB8fFxuXHRcdCAgICAodGhpcy5vcHRpb25zLm1pblpvb20gIT09IHVuZGVmaW5lZCAmJiB0aWxlWm9vbSA8IHRoaXMub3B0aW9ucy5taW5ab29tKSkge1xuXHRcdFx0dGlsZVpvb20gPSB1bmRlZmluZWQ7XG5cdFx0fVxuXG5cdFx0dmFyIHRpbGVab29tQ2hhbmdlZCA9ICh0aWxlWm9vbSAhPT0gdGhpcy5fdGlsZVpvb20pO1xuXG5cdFx0aWYgKCFub1VwZGF0ZSB8fCB0aWxlWm9vbUNoYW5nZWQpIHtcblxuXHRcdFx0dGhpcy5fdGlsZVpvb20gPSB0aWxlWm9vbTtcblxuXHRcdFx0aWYgKHRoaXMuX2Fib3J0TG9hZGluZykge1xuXHRcdFx0XHR0aGlzLl9hYm9ydExvYWRpbmcoKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fdXBkYXRlTGV2ZWxzKCk7XG5cdFx0XHR0aGlzLl9yZXNldEdyaWQoKTtcblxuXHRcdFx0aWYgKHRpbGVab29tICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0dGhpcy5fdXBkYXRlKGNlbnRlcik7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghbm9QcnVuZSkge1xuXHRcdFx0XHR0aGlzLl9wcnVuZVRpbGVzKCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEZsYWcgdG8gcHJldmVudCBfdXBkYXRlT3BhY2l0eSBmcm9tIHBydW5pbmcgdGlsZXMgZHVyaW5nXG5cdFx0XHQvLyBhIHpvb20gYW5pbSBvciBhIHBpbmNoIGdlc3R1cmVcblx0XHRcdHRoaXMuX25vUHJ1bmUgPSAhIW5vUHJ1bmU7XG5cdFx0fVxuXG5cdFx0dGhpcy5fc2V0Wm9vbVRyYW5zZm9ybXMoY2VudGVyLCB6b29tKTtcblx0fSxcblxuXHRfc2V0Wm9vbVRyYW5zZm9ybXM6IGZ1bmN0aW9uIChjZW50ZXIsIHpvb20pIHtcblx0XHRmb3IgKHZhciBpIGluIHRoaXMuX2xldmVscykge1xuXHRcdFx0dGhpcy5fc2V0Wm9vbVRyYW5zZm9ybSh0aGlzLl9sZXZlbHNbaV0sIGNlbnRlciwgem9vbSk7XG5cdFx0fVxuXHR9LFxuXG5cdF9zZXRab29tVHJhbnNmb3JtOiBmdW5jdGlvbiAobGV2ZWwsIGNlbnRlciwgem9vbSkge1xuXHRcdHZhciBzY2FsZSA9IHRoaXMuX21hcC5nZXRab29tU2NhbGUoem9vbSwgbGV2ZWwuem9vbSksXG5cdFx0ICAgIHRyYW5zbGF0ZSA9IGxldmVsLm9yaWdpbi5tdWx0aXBseUJ5KHNjYWxlKVxuXHRcdCAgICAgICAgLnN1YnRyYWN0KHRoaXMuX21hcC5fZ2V0TmV3UGl4ZWxPcmlnaW4oY2VudGVyLCB6b29tKSkucm91bmQoKTtcblxuXHRcdGlmIChMLkJyb3dzZXIuYW55M2QpIHtcblx0XHRcdEwuRG9tVXRpbC5zZXRUcmFuc2Zvcm0obGV2ZWwuZWwsIHRyYW5zbGF0ZSwgc2NhbGUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRMLkRvbVV0aWwuc2V0UG9zaXRpb24obGV2ZWwuZWwsIHRyYW5zbGF0ZSk7XG5cdFx0fVxuXHR9LFxuXG5cdF9yZXNldEdyaWQ6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgbWFwID0gdGhpcy5fbWFwLFxuXHRcdCAgICBjcnMgPSBtYXAub3B0aW9ucy5jcnMsXG5cdFx0ICAgIHRpbGVTaXplID0gdGhpcy5fdGlsZVNpemUgPSB0aGlzLmdldFRpbGVTaXplKCksXG5cdFx0ICAgIHRpbGVab29tID0gdGhpcy5fdGlsZVpvb207XG5cblx0XHR2YXIgYm91bmRzID0gdGhpcy5fbWFwLmdldFBpeGVsV29ybGRCb3VuZHModGhpcy5fdGlsZVpvb20pO1xuXHRcdGlmIChib3VuZHMpIHtcblx0XHRcdHRoaXMuX2dsb2JhbFRpbGVSYW5nZSA9IHRoaXMuX3B4Qm91bmRzVG9UaWxlUmFuZ2UoYm91bmRzKTtcblx0XHR9XG5cblx0XHR0aGlzLl93cmFwWCA9IGNycy53cmFwTG5nICYmICF0aGlzLm9wdGlvbnMubm9XcmFwICYmIFtcblx0XHRcdE1hdGguZmxvb3IobWFwLnByb2plY3QoWzAsIGNycy53cmFwTG5nWzBdXSwgdGlsZVpvb20pLnggLyB0aWxlU2l6ZS54KSxcblx0XHRcdE1hdGguY2VpbChtYXAucHJvamVjdChbMCwgY3JzLndyYXBMbmdbMV1dLCB0aWxlWm9vbSkueCAvIHRpbGVTaXplLnkpXG5cdFx0XTtcblx0XHR0aGlzLl93cmFwWSA9IGNycy53cmFwTGF0ICYmICF0aGlzLm9wdGlvbnMubm9XcmFwICYmIFtcblx0XHRcdE1hdGguZmxvb3IobWFwLnByb2plY3QoW2Nycy53cmFwTGF0WzBdLCAwXSwgdGlsZVpvb20pLnkgLyB0aWxlU2l6ZS54KSxcblx0XHRcdE1hdGguY2VpbChtYXAucHJvamVjdChbY3JzLndyYXBMYXRbMV0sIDBdLCB0aWxlWm9vbSkueSAvIHRpbGVTaXplLnkpXG5cdFx0XTtcblx0fSxcblxuXHRfb25Nb3ZlRW5kOiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKCF0aGlzLl9tYXAgfHwgdGhpcy5fbWFwLl9hbmltYXRpbmdab29tKSB7IHJldHVybjsgfVxuXG5cdFx0dGhpcy5fcmVzZXRWaWV3KCk7XG5cdH0sXG5cblx0X2dldFRpbGVkUGl4ZWxCb3VuZHM6IGZ1bmN0aW9uIChjZW50ZXIsIHpvb20sIHRpbGVab29tKSB7XG5cdFx0dmFyIG1hcCA9IHRoaXMuX21hcCxcblx0XHQgICAgc2NhbGUgPSBtYXAuZ2V0Wm9vbVNjYWxlKHpvb20sIHRpbGVab29tKSxcblx0XHQgICAgcGl4ZWxDZW50ZXIgPSBtYXAucHJvamVjdChjZW50ZXIsIHRpbGVab29tKS5mbG9vcigpLFxuXHRcdCAgICBoYWxmU2l6ZSA9IG1hcC5nZXRTaXplKCkuZGl2aWRlQnkoc2NhbGUgKiAyKTtcblxuXHRcdHJldHVybiBuZXcgTC5Cb3VuZHMocGl4ZWxDZW50ZXIuc3VidHJhY3QoaGFsZlNpemUpLCBwaXhlbENlbnRlci5hZGQoaGFsZlNpemUpKTtcblx0fSxcblxuXHQvLyBQcml2YXRlIG1ldGhvZCB0byBsb2FkIHRpbGVzIGluIHRoZSBncmlkJ3MgYWN0aXZlIHpvb20gbGV2ZWwgYWNjb3JkaW5nIHRvIG1hcCBib3VuZHNcblx0X3VwZGF0ZTogZnVuY3Rpb24gKGNlbnRlcikge1xuXHRcdHZhciBtYXAgPSB0aGlzLl9tYXA7XG5cdFx0aWYgKCFtYXApIHsgcmV0dXJuOyB9XG5cdFx0dmFyIHpvb20gPSBtYXAuZ2V0Wm9vbSgpO1xuXG5cdFx0aWYgKGNlbnRlciA9PT0gdW5kZWZpbmVkKSB7IGNlbnRlciA9IG1hcC5nZXRDZW50ZXIoKTsgfVxuXHRcdGlmICh0aGlzLl90aWxlWm9vbSA9PT0gdW5kZWZpbmVkKSB7IHJldHVybjsgfVx0Ly8gaWYgb3V0IG9mIG1pbnpvb20vbWF4em9vbVxuXG5cdFx0dmFyIHBpeGVsQm91bmRzID0gdGhpcy5fZ2V0VGlsZWRQaXhlbEJvdW5kcyhjZW50ZXIsIHpvb20sIHRoaXMuX3RpbGVab29tKSxcblx0XHQgICAgdGlsZVJhbmdlID0gdGhpcy5fcHhCb3VuZHNUb1RpbGVSYW5nZShwaXhlbEJvdW5kcyksXG5cdFx0ICAgIHRpbGVDZW50ZXIgPSB0aWxlUmFuZ2UuZ2V0Q2VudGVyKCksXG5cdFx0ICAgIHF1ZXVlID0gW107XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gdGhpcy5fdGlsZXMpIHtcblx0XHRcdHRoaXMuX3RpbGVzW2tleV0uY3VycmVudCA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIF91cGRhdGUganVzdCBsb2FkcyBtb3JlIHRpbGVzLiBJZiB0aGUgdGlsZSB6b29tIGxldmVsIGRpZmZlcnMgdG9vIG11Y2hcblx0XHQvLyBmcm9tIHRoZSBtYXAncywgbGV0IF9zZXRWaWV3IHJlc2V0IGxldmVscyBhbmQgcHJ1bmUgb2xkIHRpbGVzLlxuXHRcdGlmIChNYXRoLmFicyh6b29tIC0gdGhpcy5fdGlsZVpvb20pID4gMSkgeyB0aGlzLl9zZXRWaWV3KGNlbnRlciwgem9vbSk7IHJldHVybjsgfVxuXG5cdFx0Ly8gY3JlYXRlIGEgcXVldWUgb2YgY29vcmRpbmF0ZXMgdG8gbG9hZCB0aWxlcyBmcm9tXG5cdFx0Zm9yICh2YXIgaiA9IHRpbGVSYW5nZS5taW4ueTsgaiA8PSB0aWxlUmFuZ2UubWF4Lnk7IGorKykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IHRpbGVSYW5nZS5taW4ueDsgaSA8PSB0aWxlUmFuZ2UubWF4Lng7IGkrKykge1xuXHRcdFx0XHR2YXIgY29vcmRzID0gbmV3IEwuUG9pbnQoaSwgaik7XG5cdFx0XHRcdGNvb3Jkcy56ID0gdGhpcy5fdGlsZVpvb207XG5cblx0XHRcdFx0aWYgKCF0aGlzLl9pc1ZhbGlkVGlsZShjb29yZHMpKSB7IGNvbnRpbnVlOyB9XG5cblx0XHRcdFx0dmFyIHRpbGUgPSB0aGlzLl90aWxlc1t0aGlzLl90aWxlQ29vcmRzVG9LZXkoY29vcmRzKV07XG5cdFx0XHRcdGlmICh0aWxlKSB7XG5cdFx0XHRcdFx0dGlsZS5jdXJyZW50ID0gdHJ1ZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRxdWV1ZS5wdXNoKGNvb3Jkcyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBzb3J0IHRpbGUgcXVldWUgdG8gbG9hZCB0aWxlcyBpbiBvcmRlciBvZiB0aGVpciBkaXN0YW5jZSB0byBjZW50ZXJcblx0XHRxdWV1ZS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG5cdFx0XHRyZXR1cm4gYS5kaXN0YW5jZVRvKHRpbGVDZW50ZXIpIC0gYi5kaXN0YW5jZVRvKHRpbGVDZW50ZXIpO1xuXHRcdH0pO1xuXG5cdFx0aWYgKHF1ZXVlLmxlbmd0aCAhPT0gMCkge1xuXHRcdFx0Ly8gaWYgaXRzIHRoZSBmaXJzdCBiYXRjaCBvZiB0aWxlcyB0byBsb2FkXG5cdFx0XHRpZiAoIXRoaXMuX2xvYWRpbmcpIHtcblx0XHRcdFx0dGhpcy5fbG9hZGluZyA9IHRydWU7XG5cdFx0XHRcdHRoaXMuZmlyZSgnbG9hZGluZycpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBjcmVhdGUgRE9NIGZyYWdtZW50IHRvIGFwcGVuZCB0aWxlcyBpbiBvbmUgYmF0Y2hcblx0XHRcdHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHRoaXMuX2FkZFRpbGUocXVldWVbaV0sIGZyYWdtZW50KTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fbGV2ZWwuZWwuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xuXHRcdH1cblx0fSxcblxuXHRfaXNWYWxpZFRpbGU6IGZ1bmN0aW9uIChjb29yZHMpIHtcblx0XHR2YXIgY3JzID0gdGhpcy5fbWFwLm9wdGlvbnMuY3JzO1xuXG5cdFx0aWYgKCFjcnMuaW5maW5pdGUpIHtcblx0XHRcdC8vIGRvbid0IGxvYWQgdGlsZSBpZiBpdCdzIG91dCBvZiBib3VuZHMgYW5kIG5vdCB3cmFwcGVkXG5cdFx0XHR2YXIgYm91bmRzID0gdGhpcy5fZ2xvYmFsVGlsZVJhbmdlO1xuXHRcdFx0aWYgKCghY3JzLndyYXBMbmcgJiYgKGNvb3Jkcy54IDwgYm91bmRzLm1pbi54IHx8IGNvb3Jkcy54ID4gYm91bmRzLm1heC54KSkgfHxcblx0XHRcdCAgICAoIWNycy53cmFwTGF0ICYmIChjb29yZHMueSA8IGJvdW5kcy5taW4ueSB8fCBjb29yZHMueSA+IGJvdW5kcy5tYXgueSkpKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdH1cblxuXHRcdGlmICghdGhpcy5vcHRpb25zLmJvdW5kcykgeyByZXR1cm4gdHJ1ZTsgfVxuXG5cdFx0Ly8gZG9uJ3QgbG9hZCB0aWxlIGlmIGl0IGRvZXNuJ3QgaW50ZXJzZWN0IHRoZSBib3VuZHMgaW4gb3B0aW9uc1xuXHRcdHZhciB0aWxlQm91bmRzID0gdGhpcy5fdGlsZUNvb3Jkc1RvQm91bmRzKGNvb3Jkcyk7XG5cdFx0cmV0dXJuIEwubGF0TG5nQm91bmRzKHRoaXMub3B0aW9ucy5ib3VuZHMpLm92ZXJsYXBzKHRpbGVCb3VuZHMpO1xuXHR9LFxuXG5cdF9rZXlUb0JvdW5kczogZnVuY3Rpb24gKGtleSkge1xuXHRcdHJldHVybiB0aGlzLl90aWxlQ29vcmRzVG9Cb3VuZHModGhpcy5fa2V5VG9UaWxlQ29vcmRzKGtleSkpO1xuXHR9LFxuXG5cdC8vIGNvbnZlcnRzIHRpbGUgY29vcmRpbmF0ZXMgdG8gaXRzIGdlb2dyYXBoaWNhbCBib3VuZHNcblx0X3RpbGVDb29yZHNUb0JvdW5kczogZnVuY3Rpb24gKGNvb3Jkcykge1xuXG5cdFx0dmFyIG1hcCA9IHRoaXMuX21hcCxcblx0XHQgICAgdGlsZVNpemUgPSB0aGlzLmdldFRpbGVTaXplKCksXG5cblx0XHQgICAgbndQb2ludCA9IGNvb3Jkcy5zY2FsZUJ5KHRpbGVTaXplKSxcblx0XHQgICAgc2VQb2ludCA9IG53UG9pbnQuYWRkKHRpbGVTaXplKSxcblxuXHRcdCAgICBudyA9IG1hcC53cmFwTGF0TG5nKG1hcC51bnByb2plY3QobndQb2ludCwgY29vcmRzLnopKSxcblx0XHQgICAgc2UgPSBtYXAud3JhcExhdExuZyhtYXAudW5wcm9qZWN0KHNlUG9pbnQsIGNvb3Jkcy56KSk7XG5cblx0XHRyZXR1cm4gbmV3IEwuTGF0TG5nQm91bmRzKG53LCBzZSk7XG5cdH0sXG5cblx0Ly8gY29udmVydHMgdGlsZSBjb29yZGluYXRlcyB0byBrZXkgZm9yIHRoZSB0aWxlIGNhY2hlXG5cdF90aWxlQ29vcmRzVG9LZXk6IGZ1bmN0aW9uIChjb29yZHMpIHtcblx0XHRyZXR1cm4gY29vcmRzLnggKyAnOicgKyBjb29yZHMueSArICc6JyArIGNvb3Jkcy56O1xuXHR9LFxuXG5cdC8vIGNvbnZlcnRzIHRpbGUgY2FjaGUga2V5IHRvIGNvb3JkaW5hdGVzXG5cdF9rZXlUb1RpbGVDb29yZHM6IGZ1bmN0aW9uIChrZXkpIHtcblx0XHR2YXIgayA9IGtleS5zcGxpdCgnOicpLFxuXHRcdCAgICBjb29yZHMgPSBuZXcgTC5Qb2ludCgra1swXSwgK2tbMV0pO1xuXHRcdGNvb3Jkcy56ID0gK2tbMl07XG5cdFx0cmV0dXJuIGNvb3Jkcztcblx0fSxcblxuXHRfcmVtb3ZlVGlsZTogZnVuY3Rpb24gKGtleSkge1xuXHRcdHZhciB0aWxlID0gdGhpcy5fdGlsZXNba2V5XTtcblx0XHRpZiAoIXRpbGUpIHsgcmV0dXJuOyB9XG5cblx0XHRMLkRvbVV0aWwucmVtb3ZlKHRpbGUuZWwpO1xuXG5cdFx0ZGVsZXRlIHRoaXMuX3RpbGVzW2tleV07XG5cblx0XHR0aGlzLmZpcmUoJ3RpbGV1bmxvYWQnLCB7XG5cdFx0XHR0aWxlOiB0aWxlLmVsLFxuXHRcdFx0Y29vcmRzOiB0aGlzLl9rZXlUb1RpbGVDb29yZHMoa2V5KVxuXHRcdH0pO1xuXHR9LFxuXG5cdF9pbml0VGlsZTogZnVuY3Rpb24gKHRpbGUpIHtcblx0XHRMLkRvbVV0aWwuYWRkQ2xhc3ModGlsZSwgJ2xlYWZsZXQtdGlsZScpO1xuXG5cdFx0dmFyIHRpbGVTaXplID0gdGhpcy5nZXRUaWxlU2l6ZSgpO1xuXHRcdHRpbGUuc3R5bGUud2lkdGggPSB0aWxlU2l6ZS54ICsgJ3B4Jztcblx0XHR0aWxlLnN0eWxlLmhlaWdodCA9IHRpbGVTaXplLnkgKyAncHgnO1xuXG5cdFx0dGlsZS5vbnNlbGVjdHN0YXJ0ID0gTC5VdGlsLmZhbHNlRm47XG5cdFx0dGlsZS5vbm1vdXNlbW92ZSA9IEwuVXRpbC5mYWxzZUZuO1xuXG5cdFx0Ly8gdXBkYXRlIG9wYWNpdHkgb24gdGlsZXMgaW4gSUU3LTggYmVjYXVzZSBvZiBmaWx0ZXIgaW5oZXJpdGFuY2UgcHJvYmxlbXNcblx0XHRpZiAoTC5Ccm93c2VyLmllbHQ5ICYmIHRoaXMub3B0aW9ucy5vcGFjaXR5IDwgMSkge1xuXHRcdFx0TC5Eb21VdGlsLnNldE9wYWNpdHkodGlsZSwgdGhpcy5vcHRpb25zLm9wYWNpdHkpO1xuXHRcdH1cblxuXHRcdC8vIHdpdGhvdXQgdGhpcyBoYWNrLCB0aWxlcyBkaXNhcHBlYXIgYWZ0ZXIgem9vbSBvbiBDaHJvbWUgZm9yIEFuZHJvaWRcblx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vTGVhZmxldC9MZWFmbGV0L2lzc3Vlcy8yMDc4XG5cdFx0aWYgKEwuQnJvd3Nlci5hbmRyb2lkICYmICFMLkJyb3dzZXIuYW5kcm9pZDIzKSB7XG5cdFx0XHR0aWxlLnN0eWxlLldlYmtpdEJhY2tmYWNlVmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuXHRcdH1cblx0fSxcblxuXHRfYWRkVGlsZTogZnVuY3Rpb24gKGNvb3JkcywgY29udGFpbmVyKSB7XG5cdFx0dmFyIHRpbGVQb3MgPSB0aGlzLl9nZXRUaWxlUG9zKGNvb3JkcyksXG5cdFx0ICAgIGtleSA9IHRoaXMuX3RpbGVDb29yZHNUb0tleShjb29yZHMpO1xuXG5cdFx0dmFyIHRpbGUgPSB0aGlzLmNyZWF0ZVRpbGUodGhpcy5fd3JhcENvb3Jkcyhjb29yZHMpLCBMLmJpbmQodGhpcy5fdGlsZVJlYWR5LCB0aGlzLCBjb29yZHMpKTtcblxuXHRcdHRoaXMuX2luaXRUaWxlKHRpbGUpO1xuXG5cdFx0Ly8gaWYgY3JlYXRlVGlsZSBpcyBkZWZpbmVkIHdpdGggYSBzZWNvbmQgYXJndW1lbnQgKFwiZG9uZVwiIGNhbGxiYWNrKSxcblx0XHQvLyB3ZSBrbm93IHRoYXQgdGlsZSBpcyBhc3luYyBhbmQgd2lsbCBiZSByZWFkeSBsYXRlcjsgb3RoZXJ3aXNlXG5cdFx0aWYgKHRoaXMuY3JlYXRlVGlsZS5sZW5ndGggPCAyKSB7XG5cdFx0XHQvLyBtYXJrIHRpbGUgYXMgcmVhZHksIGJ1dCBkZWxheSBvbmUgZnJhbWUgZm9yIG9wYWNpdHkgYW5pbWF0aW9uIHRvIGhhcHBlblxuXHRcdFx0TC5VdGlsLnJlcXVlc3RBbmltRnJhbWUoTC5iaW5kKHRoaXMuX3RpbGVSZWFkeSwgdGhpcywgY29vcmRzLCBudWxsLCB0aWxlKSk7XG5cdFx0fVxuXG5cdFx0TC5Eb21VdGlsLnNldFBvc2l0aW9uKHRpbGUsIHRpbGVQb3MpO1xuXG5cdFx0Ly8gc2F2ZSB0aWxlIGluIGNhY2hlXG5cdFx0dGhpcy5fdGlsZXNba2V5XSA9IHtcblx0XHRcdGVsOiB0aWxlLFxuXHRcdFx0Y29vcmRzOiBjb29yZHMsXG5cdFx0XHRjdXJyZW50OiB0cnVlXG5cdFx0fTtcblxuXHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aWxlKTtcblx0XHR0aGlzLmZpcmUoJ3RpbGVsb2Fkc3RhcnQnLCB7XG5cdFx0XHR0aWxlOiB0aWxlLFxuXHRcdFx0Y29vcmRzOiBjb29yZHNcblx0XHR9KTtcblx0fSxcblxuXHRfdGlsZVJlYWR5OiBmdW5jdGlvbiAoY29vcmRzLCBlcnIsIHRpbGUpIHtcblx0XHRpZiAoIXRoaXMuX21hcCkgeyByZXR1cm47IH1cblxuXHRcdGlmIChlcnIpIHtcblx0XHRcdHRoaXMuZmlyZSgndGlsZWVycm9yJywge1xuXHRcdFx0XHRlcnJvcjogZXJyLFxuXHRcdFx0XHR0aWxlOiB0aWxlLFxuXHRcdFx0XHRjb29yZHM6IGNvb3Jkc1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0dmFyIGtleSA9IHRoaXMuX3RpbGVDb29yZHNUb0tleShjb29yZHMpO1xuXG5cdFx0dGlsZSA9IHRoaXMuX3RpbGVzW2tleV07XG5cdFx0aWYgKCF0aWxlKSB7IHJldHVybjsgfVxuXG5cdFx0dGlsZS5sb2FkZWQgPSArbmV3IERhdGUoKTtcblx0XHRpZiAodGhpcy5fbWFwLl9mYWRlQW5pbWF0ZWQpIHtcblx0XHRcdEwuRG9tVXRpbC5zZXRPcGFjaXR5KHRpbGUuZWwsIDApO1xuXHRcdFx0TC5VdGlsLmNhbmNlbEFuaW1GcmFtZSh0aGlzLl9mYWRlRnJhbWUpO1xuXHRcdFx0dGhpcy5fZmFkZUZyYW1lID0gTC5VdGlsLnJlcXVlc3RBbmltRnJhbWUodGhpcy5fdXBkYXRlT3BhY2l0eSwgdGhpcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRpbGUuYWN0aXZlID0gdHJ1ZTtcblx0XHRcdHRoaXMuX3BydW5lVGlsZXMoKTtcblx0XHR9XG5cblx0XHRMLkRvbVV0aWwuYWRkQ2xhc3ModGlsZS5lbCwgJ2xlYWZsZXQtdGlsZS1sb2FkZWQnKTtcblxuXHRcdHRoaXMuZmlyZSgndGlsZWxvYWQnLCB7XG5cdFx0XHR0aWxlOiB0aWxlLmVsLFxuXHRcdFx0Y29vcmRzOiBjb29yZHNcblx0XHR9KTtcblxuXHRcdGlmICh0aGlzLl9ub1RpbGVzVG9Mb2FkKCkpIHtcblx0XHRcdHRoaXMuX2xvYWRpbmcgPSBmYWxzZTtcblx0XHRcdHRoaXMuZmlyZSgnbG9hZCcpO1xuXHRcdH1cblx0fSxcblxuXHRfZ2V0VGlsZVBvczogZnVuY3Rpb24gKGNvb3Jkcykge1xuXHRcdHJldHVybiBjb29yZHMuc2NhbGVCeSh0aGlzLmdldFRpbGVTaXplKCkpLnN1YnRyYWN0KHRoaXMuX2xldmVsLm9yaWdpbik7XG5cdH0sXG5cblx0X3dyYXBDb29yZHM6IGZ1bmN0aW9uIChjb29yZHMpIHtcblx0XHR2YXIgbmV3Q29vcmRzID0gbmV3IEwuUG9pbnQoXG5cdFx0XHR0aGlzLl93cmFwWCA/IEwuVXRpbC53cmFwTnVtKGNvb3Jkcy54LCB0aGlzLl93cmFwWCkgOiBjb29yZHMueCxcblx0XHRcdHRoaXMuX3dyYXBZID8gTC5VdGlsLndyYXBOdW0oY29vcmRzLnksIHRoaXMuX3dyYXBZKSA6IGNvb3Jkcy55KTtcblx0XHRuZXdDb29yZHMueiA9IGNvb3Jkcy56O1xuXHRcdHJldHVybiBuZXdDb29yZHM7XG5cdH0sXG5cblx0X3B4Qm91bmRzVG9UaWxlUmFuZ2U6IGZ1bmN0aW9uIChib3VuZHMpIHtcblx0XHR2YXIgdGlsZVNpemUgPSB0aGlzLmdldFRpbGVTaXplKCk7XG5cdFx0cmV0dXJuIG5ldyBMLkJvdW5kcyhcblx0XHRcdGJvdW5kcy5taW4udW5zY2FsZUJ5KHRpbGVTaXplKS5mbG9vcigpLFxuXHRcdFx0Ym91bmRzLm1heC51bnNjYWxlQnkodGlsZVNpemUpLmNlaWwoKS5zdWJ0cmFjdChbMSwgMV0pKTtcblx0fSxcblxuXHRfbm9UaWxlc1RvTG9hZDogZnVuY3Rpb24gKCkge1xuXHRcdGZvciAodmFyIGtleSBpbiB0aGlzLl90aWxlcykge1xuXHRcdFx0aWYgKCF0aGlzLl90aWxlc1trZXldLmxvYWRlZCkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cbn0pO1xuXG5MLmdyaWRMYXllciA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdHJldHVybiBuZXcgTC5HcmlkTGF5ZXIob3B0aW9ucyk7XG59O1xuXG5cblxuLypcclxuICogTC5UaWxlTGF5ZXIgaXMgdXNlZCBmb3Igc3RhbmRhcmQgeHl6LW51bWJlcmVkIHRpbGUgbGF5ZXJzLlxyXG4gKi9cclxuXHJcbkwuVGlsZUxheWVyID0gTC5HcmlkTGF5ZXIuZXh0ZW5kKHtcclxuXHJcblx0b3B0aW9uczoge1xyXG5cdFx0bWF4Wm9vbTogMTgsXHJcblxyXG5cdFx0c3ViZG9tYWluczogJ2FiYycsXHJcblx0XHRlcnJvclRpbGVVcmw6ICcnLFxyXG5cdFx0em9vbU9mZnNldDogMCxcclxuXHJcblx0XHRtYXhOYXRpdmVab29tOiBudWxsLCAvLyBOdW1iZXJcclxuXHRcdHRtczogZmFsc2UsXHJcblx0XHR6b29tUmV2ZXJzZTogZmFsc2UsXHJcblx0XHRkZXRlY3RSZXRpbmE6IGZhbHNlLFxyXG5cdFx0Y3Jvc3NPcmlnaW46IGZhbHNlXHJcblx0fSxcclxuXHJcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xyXG5cclxuXHRcdHRoaXMuX3VybCA9IHVybDtcclxuXHJcblx0XHRvcHRpb25zID0gTC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xyXG5cclxuXHRcdC8vIGRldGVjdGluZyByZXRpbmEgZGlzcGxheXMsIGFkanVzdGluZyB0aWxlU2l6ZSBhbmQgem9vbSBsZXZlbHNcclxuXHRcdGlmIChvcHRpb25zLmRldGVjdFJldGluYSAmJiBMLkJyb3dzZXIucmV0aW5hICYmIG9wdGlvbnMubWF4Wm9vbSA+IDApIHtcclxuXHJcblx0XHRcdG9wdGlvbnMudGlsZVNpemUgPSBNYXRoLmZsb29yKG9wdGlvbnMudGlsZVNpemUgLyAyKTtcclxuXHRcdFx0b3B0aW9ucy56b29tT2Zmc2V0Kys7XHJcblxyXG5cdFx0XHRvcHRpb25zLm1pblpvb20gPSBNYXRoLm1heCgwLCBvcHRpb25zLm1pblpvb20pO1xyXG5cdFx0XHRvcHRpb25zLm1heFpvb20tLTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIG9wdGlvbnMuc3ViZG9tYWlucyA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0b3B0aW9ucy5zdWJkb21haW5zID0gb3B0aW9ucy5zdWJkb21haW5zLnNwbGl0KCcnKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBmb3IgaHR0cHM6Ly9naXRodWIuY29tL0xlYWZsZXQvTGVhZmxldC9pc3N1ZXMvMTM3XHJcblx0XHRpZiAoIUwuQnJvd3Nlci5hbmRyb2lkKSB7XHJcblx0XHRcdHRoaXMub24oJ3RpbGV1bmxvYWQnLCB0aGlzLl9vblRpbGVSZW1vdmUpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdHNldFVybDogZnVuY3Rpb24gKHVybCwgbm9SZWRyYXcpIHtcclxuXHRcdHRoaXMuX3VybCA9IHVybDtcclxuXHJcblx0XHRpZiAoIW5vUmVkcmF3KSB7XHJcblx0XHRcdHRoaXMucmVkcmF3KCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRjcmVhdGVUaWxlOiBmdW5jdGlvbiAoY29vcmRzLCBkb25lKSB7XHJcblx0XHR2YXIgdGlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG5cclxuXHRcdEwuRG9tRXZlbnQub24odGlsZSwgJ2xvYWQnLCBMLmJpbmQodGhpcy5fdGlsZU9uTG9hZCwgdGhpcywgZG9uZSwgdGlsZSkpO1xyXG5cdFx0TC5Eb21FdmVudC5vbih0aWxlLCAnZXJyb3InLCBMLmJpbmQodGhpcy5fdGlsZU9uRXJyb3IsIHRoaXMsIGRvbmUsIHRpbGUpKTtcclxuXHJcblx0XHRpZiAodGhpcy5vcHRpb25zLmNyb3NzT3JpZ2luKSB7XHJcblx0XHRcdHRpbGUuY3Jvc3NPcmlnaW4gPSAnJztcclxuXHRcdH1cclxuXHJcblx0XHQvKlxyXG5cdFx0IEFsdCB0YWcgaXMgc2V0IHRvIGVtcHR5IHN0cmluZyB0byBrZWVwIHNjcmVlbiByZWFkZXJzIGZyb20gcmVhZGluZyBVUkwgYW5kIGZvciBjb21wbGlhbmNlIHJlYXNvbnNcclxuXHRcdCBodHRwOi8vd3d3LnczLm9yZy9UUi9XQ0FHMjAtVEVDSFMvSDY3XHJcblx0XHQqL1xyXG5cdFx0dGlsZS5hbHQgPSAnJztcclxuXHJcblx0XHR0aWxlLnNyYyA9IHRoaXMuZ2V0VGlsZVVybChjb29yZHMpO1xyXG5cclxuXHRcdHJldHVybiB0aWxlO1xyXG5cdH0sXHJcblxyXG5cdGdldFRpbGVVcmw6IGZ1bmN0aW9uIChjb29yZHMpIHtcclxuXHRcdHJldHVybiBMLlV0aWwudGVtcGxhdGUodGhpcy5fdXJsLCBMLmV4dGVuZCh7XHJcblx0XHRcdHI6IHRoaXMub3B0aW9ucy5kZXRlY3RSZXRpbmEgJiYgTC5Ccm93c2VyLnJldGluYSAmJiB0aGlzLm9wdGlvbnMubWF4Wm9vbSA+IDAgPyAnQDJ4JyA6ICcnLFxyXG5cdFx0XHRzOiB0aGlzLl9nZXRTdWJkb21haW4oY29vcmRzKSxcclxuXHRcdFx0eDogY29vcmRzLngsXHJcblx0XHRcdHk6IHRoaXMub3B0aW9ucy50bXMgPyB0aGlzLl9nbG9iYWxUaWxlUmFuZ2UubWF4LnkgLSBjb29yZHMueSA6IGNvb3Jkcy55LFxyXG5cdFx0XHR6OiB0aGlzLl9nZXRab29tRm9yVXJsKClcclxuXHRcdH0sIHRoaXMub3B0aW9ucykpO1xyXG5cdH0sXHJcblxyXG5cdF90aWxlT25Mb2FkOiBmdW5jdGlvbiAoZG9uZSwgdGlsZSkge1xyXG5cdFx0Ly8gRm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9MZWFmbGV0L0xlYWZsZXQvaXNzdWVzLzMzMzJcclxuXHRcdGlmIChMLkJyb3dzZXIuaWVsdDkpIHtcclxuXHRcdFx0c2V0VGltZW91dChMLmJpbmQoZG9uZSwgdGhpcywgbnVsbCwgdGlsZSksIDApO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZG9uZShudWxsLCB0aWxlKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfdGlsZU9uRXJyb3I6IGZ1bmN0aW9uIChkb25lLCB0aWxlLCBlKSB7XHJcblx0XHR2YXIgZXJyb3JVcmwgPSB0aGlzLm9wdGlvbnMuZXJyb3JUaWxlVXJsO1xyXG5cdFx0aWYgKGVycm9yVXJsKSB7XHJcblx0XHRcdHRpbGUuc3JjID0gZXJyb3JVcmw7XHJcblx0XHR9XHJcblx0XHRkb25lKGUsIHRpbGUpO1xyXG5cdH0sXHJcblxyXG5cdGdldFRpbGVTaXplOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgbWFwID0gdGhpcy5fbWFwLFxyXG5cdFx0ICAgIHRpbGVTaXplID0gTC5HcmlkTGF5ZXIucHJvdG90eXBlLmdldFRpbGVTaXplLmNhbGwodGhpcyksXHJcblx0XHQgICAgem9vbSA9IHRoaXMuX3RpbGVab29tICsgdGhpcy5vcHRpb25zLnpvb21PZmZzZXQsXHJcblx0XHQgICAgem9vbU4gPSB0aGlzLm9wdGlvbnMubWF4TmF0aXZlWm9vbTtcclxuXHJcblx0XHQvLyBpbmNyZWFzZSB0aWxlIHNpemUgd2hlbiBvdmVyc2NhbGluZ1xyXG5cdFx0cmV0dXJuIHpvb21OICE9PSBudWxsICYmIHpvb20gPiB6b29tTiA/XHJcblx0XHRcdFx0dGlsZVNpemUuZGl2aWRlQnkobWFwLmdldFpvb21TY2FsZSh6b29tTiwgem9vbSkpLnJvdW5kKCkgOlxyXG5cdFx0XHRcdHRpbGVTaXplO1xyXG5cdH0sXHJcblxyXG5cdF9vblRpbGVSZW1vdmU6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRlLnRpbGUub25sb2FkID0gbnVsbDtcclxuXHR9LFxyXG5cclxuXHRfZ2V0Wm9vbUZvclVybDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zLFxyXG5cdFx0ICAgIHpvb20gPSB0aGlzLl90aWxlWm9vbTtcclxuXHJcblx0XHRpZiAob3B0aW9ucy56b29tUmV2ZXJzZSkge1xyXG5cdFx0XHR6b29tID0gb3B0aW9ucy5tYXhab29tIC0gem9vbTtcclxuXHRcdH1cclxuXHJcblx0XHR6b29tICs9IG9wdGlvbnMuem9vbU9mZnNldDtcclxuXHJcblx0XHRyZXR1cm4gb3B0aW9ucy5tYXhOYXRpdmVab29tICE9PSBudWxsID8gTWF0aC5taW4oem9vbSwgb3B0aW9ucy5tYXhOYXRpdmVab29tKSA6IHpvb207XHJcblx0fSxcclxuXHJcblx0X2dldFN1YmRvbWFpbjogZnVuY3Rpb24gKHRpbGVQb2ludCkge1xyXG5cdFx0dmFyIGluZGV4ID0gTWF0aC5hYnModGlsZVBvaW50LnggKyB0aWxlUG9pbnQueSkgJSB0aGlzLm9wdGlvbnMuc3ViZG9tYWlucy5sZW5ndGg7XHJcblx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLnN1YmRvbWFpbnNbaW5kZXhdO1xyXG5cdH0sXHJcblxyXG5cdC8vIHN0b3BzIGxvYWRpbmcgYWxsIHRpbGVzIGluIHRoZSBiYWNrZ3JvdW5kIGxheWVyXHJcblx0X2Fib3J0TG9hZGluZzogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGksIHRpbGU7XHJcblx0XHRmb3IgKGkgaW4gdGhpcy5fdGlsZXMpIHtcclxuXHRcdFx0aWYgKHRoaXMuX3RpbGVzW2ldLmNvb3Jkcy56ICE9PSB0aGlzLl90aWxlWm9vbSkge1xyXG5cdFx0XHRcdHRpbGUgPSB0aGlzLl90aWxlc1tpXS5lbDtcclxuXHJcblx0XHRcdFx0dGlsZS5vbmxvYWQgPSBMLlV0aWwuZmFsc2VGbjtcclxuXHRcdFx0XHR0aWxlLm9uZXJyb3IgPSBMLlV0aWwuZmFsc2VGbjtcclxuXHJcblx0XHRcdFx0aWYgKCF0aWxlLmNvbXBsZXRlKSB7XHJcblx0XHRcdFx0XHR0aWxlLnNyYyA9IEwuVXRpbC5lbXB0eUltYWdlVXJsO1xyXG5cdFx0XHRcdFx0TC5Eb21VdGlsLnJlbW92ZSh0aWxlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn0pO1xyXG5cclxuTC50aWxlTGF5ZXIgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XHJcblx0cmV0dXJuIG5ldyBMLlRpbGVMYXllcih1cmwsIG9wdGlvbnMpO1xyXG59O1xyXG5cblxuXG4vKlxyXG4gKiBMLlRpbGVMYXllci5XTVMgaXMgdXNlZCBmb3IgV01TIHRpbGUgbGF5ZXJzLlxyXG4gKi9cclxuXHJcbkwuVGlsZUxheWVyLldNUyA9IEwuVGlsZUxheWVyLmV4dGVuZCh7XHJcblxyXG5cdGRlZmF1bHRXbXNQYXJhbXM6IHtcclxuXHRcdHNlcnZpY2U6ICdXTVMnLFxyXG5cdFx0cmVxdWVzdDogJ0dldE1hcCcsXHJcblx0XHR2ZXJzaW9uOiAnMS4xLjEnLFxyXG5cdFx0bGF5ZXJzOiAnJyxcclxuXHRcdHN0eWxlczogJycsXHJcblx0XHRmb3JtYXQ6ICdpbWFnZS9qcGVnJyxcclxuXHRcdHRyYW5zcGFyZW50OiBmYWxzZVxyXG5cdH0sXHJcblxyXG5cdG9wdGlvbnM6IHtcclxuXHRcdGNyczogbnVsbCxcclxuXHRcdHVwcGVyY2FzZTogZmFsc2VcclxuXHR9LFxyXG5cclxuXHRpbml0aWFsaXplOiBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XHJcblxyXG5cdFx0dGhpcy5fdXJsID0gdXJsO1xyXG5cclxuXHRcdHZhciB3bXNQYXJhbXMgPSBMLmV4dGVuZCh7fSwgdGhpcy5kZWZhdWx0V21zUGFyYW1zKTtcclxuXHJcblx0XHQvLyBhbGwga2V5cyB0aGF0IGFyZSBub3QgVGlsZUxheWVyIG9wdGlvbnMgZ28gdG8gV01TIHBhcmFtc1xyXG5cdFx0Zm9yICh2YXIgaSBpbiBvcHRpb25zKSB7XHJcblx0XHRcdGlmICghKGkgaW4gdGhpcy5vcHRpb25zKSkge1xyXG5cdFx0XHRcdHdtc1BhcmFtc1tpXSA9IG9wdGlvbnNbaV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRvcHRpb25zID0gTC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xyXG5cclxuXHRcdHdtc1BhcmFtcy53aWR0aCA9IHdtc1BhcmFtcy5oZWlnaHQgPSBvcHRpb25zLnRpbGVTaXplICogKG9wdGlvbnMuZGV0ZWN0UmV0aW5hICYmIEwuQnJvd3Nlci5yZXRpbmEgPyAyIDogMSk7XHJcblxyXG5cdFx0dGhpcy53bXNQYXJhbXMgPSB3bXNQYXJhbXM7XHJcblx0fSxcclxuXHJcblx0b25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcclxuXHJcblx0XHR0aGlzLl9jcnMgPSB0aGlzLm9wdGlvbnMuY3JzIHx8IG1hcC5vcHRpb25zLmNycztcclxuXHRcdHRoaXMuX3dtc1ZlcnNpb24gPSBwYXJzZUZsb2F0KHRoaXMud21zUGFyYW1zLnZlcnNpb24pO1xyXG5cclxuXHRcdHZhciBwcm9qZWN0aW9uS2V5ID0gdGhpcy5fd21zVmVyc2lvbiA+PSAxLjMgPyAnY3JzJyA6ICdzcnMnO1xyXG5cdFx0dGhpcy53bXNQYXJhbXNbcHJvamVjdGlvbktleV0gPSB0aGlzLl9jcnMuY29kZTtcclxuXHJcblx0XHRMLlRpbGVMYXllci5wcm90b3R5cGUub25BZGQuY2FsbCh0aGlzLCBtYXApO1xyXG5cdH0sXHJcblxyXG5cdGdldFRpbGVVcmw6IGZ1bmN0aW9uIChjb29yZHMpIHtcclxuXHJcblx0XHR2YXIgdGlsZUJvdW5kcyA9IHRoaXMuX3RpbGVDb29yZHNUb0JvdW5kcyhjb29yZHMpLFxyXG5cdFx0ICAgIG53ID0gdGhpcy5fY3JzLnByb2plY3QodGlsZUJvdW5kcy5nZXROb3J0aFdlc3QoKSksXHJcblx0XHQgICAgc2UgPSB0aGlzLl9jcnMucHJvamVjdCh0aWxlQm91bmRzLmdldFNvdXRoRWFzdCgpKSxcclxuXHJcblx0XHQgICAgYmJveCA9ICh0aGlzLl93bXNWZXJzaW9uID49IDEuMyAmJiB0aGlzLl9jcnMgPT09IEwuQ1JTLkVQU0c0MzI2ID9cclxuXHRcdFx0ICAgIFtzZS55LCBudy54LCBudy55LCBzZS54XSA6XHJcblx0XHRcdCAgICBbbncueCwgc2UueSwgc2UueCwgbncueV0pLmpvaW4oJywnKSxcclxuXHJcblx0XHQgICAgdXJsID0gTC5UaWxlTGF5ZXIucHJvdG90eXBlLmdldFRpbGVVcmwuY2FsbCh0aGlzLCBjb29yZHMpO1xyXG5cclxuXHRcdHJldHVybiB1cmwgK1xyXG5cdFx0XHRMLlV0aWwuZ2V0UGFyYW1TdHJpbmcodGhpcy53bXNQYXJhbXMsIHVybCwgdGhpcy5vcHRpb25zLnVwcGVyY2FzZSkgK1xyXG5cdFx0XHQodGhpcy5vcHRpb25zLnVwcGVyY2FzZSA/ICcmQkJPWD0nIDogJyZiYm94PScpICsgYmJveDtcclxuXHR9LFxyXG5cclxuXHRzZXRQYXJhbXM6IGZ1bmN0aW9uIChwYXJhbXMsIG5vUmVkcmF3KSB7XHJcblxyXG5cdFx0TC5leHRlbmQodGhpcy53bXNQYXJhbXMsIHBhcmFtcyk7XHJcblxyXG5cdFx0aWYgKCFub1JlZHJhdykge1xyXG5cdFx0XHR0aGlzLnJlZHJhdygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxufSk7XHJcblxyXG5MLnRpbGVMYXllci53bXMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XHJcblx0cmV0dXJuIG5ldyBMLlRpbGVMYXllci5XTVModXJsLCBvcHRpb25zKTtcclxufTtcclxuXG5cblxuLypcclxuICogTC5JbWFnZU92ZXJsYXkgaXMgdXNlZCB0byBvdmVybGF5IGltYWdlcyBvdmVyIHRoZSBtYXAgKHRvIHNwZWNpZmljIGdlb2dyYXBoaWNhbCBib3VuZHMpLlxyXG4gKi9cclxuXHJcbkwuSW1hZ2VPdmVybGF5ID0gTC5MYXllci5leHRlbmQoe1xyXG5cclxuXHRvcHRpb25zOiB7XHJcblx0XHRvcGFjaXR5OiAxLFxyXG5cdFx0YWx0OiAnJyxcclxuXHRcdGludGVyYWN0aXZlOiBmYWxzZVxyXG5cclxuXHRcdC8qXHJcblx0XHRjcm9zc09yaWdpbjogPEJvb2xlYW4+LFxyXG5cdFx0Ki9cclxuXHR9LFxyXG5cclxuXHRpbml0aWFsaXplOiBmdW5jdGlvbiAodXJsLCBib3VuZHMsIG9wdGlvbnMpIHsgLy8gKFN0cmluZywgTGF0TG5nQm91bmRzLCBPYmplY3QpXHJcblx0XHR0aGlzLl91cmwgPSB1cmw7XHJcblx0XHR0aGlzLl9ib3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhib3VuZHMpO1xyXG5cclxuXHRcdEwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcclxuXHR9LFxyXG5cclxuXHRvbkFkZDogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKCF0aGlzLl9pbWFnZSkge1xyXG5cdFx0XHR0aGlzLl9pbml0SW1hZ2UoKTtcclxuXHJcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMub3BhY2l0eSA8IDEpIHtcclxuXHRcdFx0XHR0aGlzLl91cGRhdGVPcGFjaXR5KCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5vcHRpb25zLmludGVyYWN0aXZlKSB7XHJcblx0XHRcdEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9pbWFnZSwgJ2xlYWZsZXQtaW50ZXJhY3RpdmUnKTtcclxuXHRcdFx0dGhpcy5hZGRJbnRlcmFjdGl2ZVRhcmdldCh0aGlzLl9pbWFnZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5nZXRQYW5lKCkuYXBwZW5kQ2hpbGQodGhpcy5faW1hZ2UpO1xyXG5cdFx0dGhpcy5fcmVzZXQoKTtcclxuXHR9LFxyXG5cclxuXHRvblJlbW92ZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0TC5Eb21VdGlsLnJlbW92ZSh0aGlzLl9pbWFnZSk7XHJcblx0XHRpZiAodGhpcy5vcHRpb25zLmludGVyYWN0aXZlKSB7XHJcblx0XHRcdHRoaXMucmVtb3ZlSW50ZXJhY3RpdmVUYXJnZXQodGhpcy5faW1hZ2UpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdHNldE9wYWNpdHk6IGZ1bmN0aW9uIChvcGFjaXR5KSB7XHJcblx0XHR0aGlzLm9wdGlvbnMub3BhY2l0eSA9IG9wYWNpdHk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2ltYWdlKSB7XHJcblx0XHRcdHRoaXMuX3VwZGF0ZU9wYWNpdHkoKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHNldFN0eWxlOiBmdW5jdGlvbiAoc3R5bGVPcHRzKSB7XHJcblx0XHRpZiAoc3R5bGVPcHRzLm9wYWNpdHkpIHtcclxuXHRcdFx0dGhpcy5zZXRPcGFjaXR5KHN0eWxlT3B0cy5vcGFjaXR5KTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdGJyaW5nVG9Gcm9udDogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuX21hcCkge1xyXG5cdFx0XHRMLkRvbVV0aWwudG9Gcm9udCh0aGlzLl9pbWFnZSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRicmluZ1RvQmFjazogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuX21hcCkge1xyXG5cdFx0XHRMLkRvbVV0aWwudG9CYWNrKHRoaXMuX2ltYWdlKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHNldFVybDogZnVuY3Rpb24gKHVybCkge1xyXG5cdFx0dGhpcy5fdXJsID0gdXJsO1xyXG5cclxuXHRcdGlmICh0aGlzLl9pbWFnZSkge1xyXG5cdFx0XHR0aGlzLl9pbWFnZS5zcmMgPSB1cmw7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRzZXRCb3VuZHM6IGZ1bmN0aW9uIChib3VuZHMpIHtcclxuXHRcdHRoaXMuX2JvdW5kcyA9IGJvdW5kcztcclxuXHJcblx0XHRpZiAodGhpcy5fbWFwKSB7XHJcblx0XHRcdHRoaXMuX3Jlc2V0KCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRnZXRBdHRyaWJ1dGlvbjogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMub3B0aW9ucy5hdHRyaWJ1dGlvbjtcclxuXHR9LFxyXG5cclxuXHRnZXRFdmVudHM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBldmVudHMgPSB7XHJcblx0XHRcdHpvb206IHRoaXMuX3Jlc2V0LFxyXG5cdFx0XHR2aWV3cmVzZXQ6IHRoaXMuX3Jlc2V0XHJcblx0XHR9O1xyXG5cclxuXHRcdGlmICh0aGlzLl96b29tQW5pbWF0ZWQpIHtcclxuXHRcdFx0ZXZlbnRzLnpvb21hbmltID0gdGhpcy5fYW5pbWF0ZVpvb207XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGV2ZW50cztcclxuXHR9LFxyXG5cclxuXHRnZXRCb3VuZHM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLl9ib3VuZHM7XHJcblx0fSxcclxuXHJcblx0Z2V0RWxlbWVudDogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2ltYWdlO1xyXG5cdH0sXHJcblxyXG5cdF9pbml0SW1hZ2U6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBpbWcgPSB0aGlzLl9pbWFnZSA9IEwuRG9tVXRpbC5jcmVhdGUoJ2ltZycsXHJcblx0XHRcdFx0J2xlYWZsZXQtaW1hZ2UtbGF5ZXIgJyArICh0aGlzLl96b29tQW5pbWF0ZWQgPyAnbGVhZmxldC16b29tLWFuaW1hdGVkJyA6ICcnKSk7XHJcblxyXG5cdFx0aW1nLm9uc2VsZWN0c3RhcnQgPSBMLlV0aWwuZmFsc2VGbjtcclxuXHRcdGltZy5vbm1vdXNlbW92ZSA9IEwuVXRpbC5mYWxzZUZuO1xyXG5cclxuXHRcdGltZy5vbmxvYWQgPSBMLmJpbmQodGhpcy5maXJlLCB0aGlzLCAnbG9hZCcpO1xyXG5cclxuXHRcdGlmICh0aGlzLm9wdGlvbnMuY3Jvc3NPcmlnaW4pIHtcclxuXHRcdFx0aW1nLmNyb3NzT3JpZ2luID0gJyc7XHJcblx0XHR9XHJcblxyXG5cdFx0aW1nLnNyYyA9IHRoaXMuX3VybDtcclxuXHRcdGltZy5hbHQgPSB0aGlzLm9wdGlvbnMuYWx0O1xyXG5cdH0sXHJcblxyXG5cdF9hbmltYXRlWm9vbTogZnVuY3Rpb24gKGUpIHtcclxuXHRcdHZhciBzY2FsZSA9IHRoaXMuX21hcC5nZXRab29tU2NhbGUoZS56b29tKSxcclxuXHRcdCAgICBvZmZzZXQgPSB0aGlzLl9tYXAuX2xhdExuZ1RvTmV3TGF5ZXJQb2ludCh0aGlzLl9ib3VuZHMuZ2V0Tm9ydGhXZXN0KCksIGUuem9vbSwgZS5jZW50ZXIpO1xyXG5cclxuXHRcdEwuRG9tVXRpbC5zZXRUcmFuc2Zvcm0odGhpcy5faW1hZ2UsIG9mZnNldCwgc2NhbGUpO1xyXG5cdH0sXHJcblxyXG5cdF9yZXNldDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGltYWdlID0gdGhpcy5faW1hZ2UsXHJcblx0XHQgICAgYm91bmRzID0gbmV3IEwuQm91bmRzKFxyXG5cdFx0ICAgICAgICB0aGlzLl9tYXAubGF0TG5nVG9MYXllclBvaW50KHRoaXMuX2JvdW5kcy5nZXROb3J0aFdlc3QoKSksXHJcblx0XHQgICAgICAgIHRoaXMuX21hcC5sYXRMbmdUb0xheWVyUG9pbnQodGhpcy5fYm91bmRzLmdldFNvdXRoRWFzdCgpKSksXHJcblx0XHQgICAgc2l6ZSA9IGJvdW5kcy5nZXRTaXplKCk7XHJcblxyXG5cdFx0TC5Eb21VdGlsLnNldFBvc2l0aW9uKGltYWdlLCBib3VuZHMubWluKTtcclxuXHJcblx0XHRpbWFnZS5zdHlsZS53aWR0aCAgPSBzaXplLnggKyAncHgnO1xyXG5cdFx0aW1hZ2Uuc3R5bGUuaGVpZ2h0ID0gc2l6ZS55ICsgJ3B4JztcclxuXHR9LFxyXG5cclxuXHRfdXBkYXRlT3BhY2l0eTogZnVuY3Rpb24gKCkge1xyXG5cdFx0TC5Eb21VdGlsLnNldE9wYWNpdHkodGhpcy5faW1hZ2UsIHRoaXMub3B0aW9ucy5vcGFjaXR5KTtcclxuXHR9XHJcbn0pO1xyXG5cclxuTC5pbWFnZU92ZXJsYXkgPSBmdW5jdGlvbiAodXJsLCBib3VuZHMsIG9wdGlvbnMpIHtcclxuXHRyZXR1cm4gbmV3IEwuSW1hZ2VPdmVybGF5KHVybCwgYm91bmRzLCBvcHRpb25zKTtcclxufTtcclxuXG5cblxuLypcclxuICogTC5JY29uIGlzIGFuIGltYWdlLWJhc2VkIGljb24gY2xhc3MgdGhhdCB5b3UgY2FuIHVzZSB3aXRoIEwuTWFya2VyIGZvciBjdXN0b20gbWFya2Vycy5cclxuICovXHJcblxyXG5MLkljb24gPSBMLkNsYXNzLmV4dGVuZCh7XHJcblx0LypcclxuXHRvcHRpb25zOiB7XHJcblx0XHRpY29uVXJsOiAoU3RyaW5nKSAocmVxdWlyZWQpXHJcblx0XHRpY29uUmV0aW5hVXJsOiAoU3RyaW5nKSAob3B0aW9uYWwsIHVzZWQgZm9yIHJldGluYSBkZXZpY2VzIGlmIGRldGVjdGVkKVxyXG5cdFx0aWNvblNpemU6IChQb2ludCkgKGNhbiBiZSBzZXQgdGhyb3VnaCBDU1MpXHJcblx0XHRpY29uQW5jaG9yOiAoUG9pbnQpIChjZW50ZXJlZCBieSBkZWZhdWx0LCBjYW4gYmUgc2V0IGluIENTUyB3aXRoIG5lZ2F0aXZlIG1hcmdpbnMpXHJcblx0XHRwb3B1cEFuY2hvcjogKFBvaW50KSAoaWYgbm90IHNwZWNpZmllZCwgcG9wdXAgb3BlbnMgaW4gdGhlIGFuY2hvciBwb2ludClcclxuXHRcdHNoYWRvd1VybDogKFN0cmluZykgKG5vIHNoYWRvdyBieSBkZWZhdWx0KVxyXG5cdFx0c2hhZG93UmV0aW5hVXJsOiAoU3RyaW5nKSAob3B0aW9uYWwsIHVzZWQgZm9yIHJldGluYSBkZXZpY2VzIGlmIGRldGVjdGVkKVxyXG5cdFx0c2hhZG93U2l6ZTogKFBvaW50KVxyXG5cdFx0c2hhZG93QW5jaG9yOiAoUG9pbnQpXHJcblx0XHRjbGFzc05hbWU6IChTdHJpbmcpXHJcblx0fSxcclxuXHQqL1xyXG5cclxuXHRpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xyXG5cdFx0TC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xyXG5cdH0sXHJcblxyXG5cdGNyZWF0ZUljb246IGZ1bmN0aW9uIChvbGRJY29uKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fY3JlYXRlSWNvbignaWNvbicsIG9sZEljb24pO1xyXG5cdH0sXHJcblxyXG5cdGNyZWF0ZVNoYWRvdzogZnVuY3Rpb24gKG9sZEljb24pIHtcclxuXHRcdHJldHVybiB0aGlzLl9jcmVhdGVJY29uKCdzaGFkb3cnLCBvbGRJY29uKTtcclxuXHR9LFxyXG5cclxuXHRfY3JlYXRlSWNvbjogZnVuY3Rpb24gKG5hbWUsIG9sZEljb24pIHtcclxuXHRcdHZhciBzcmMgPSB0aGlzLl9nZXRJY29uVXJsKG5hbWUpO1xyXG5cclxuXHRcdGlmICghc3JjKSB7XHJcblx0XHRcdGlmIChuYW1lID09PSAnaWNvbicpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2ljb25Vcmwgbm90IHNldCBpbiBJY29uIG9wdGlvbnMgKHNlZSB0aGUgZG9jcykuJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGltZyA9IHRoaXMuX2NyZWF0ZUltZyhzcmMsIG9sZEljb24gJiYgb2xkSWNvbi50YWdOYW1lID09PSAnSU1HJyA/IG9sZEljb24gOiBudWxsKTtcclxuXHRcdHRoaXMuX3NldEljb25TdHlsZXMoaW1nLCBuYW1lKTtcclxuXHJcblx0XHRyZXR1cm4gaW1nO1xyXG5cdH0sXHJcblxyXG5cdF9zZXRJY29uU3R5bGVzOiBmdW5jdGlvbiAoaW1nLCBuYW1lKSB7XHJcblx0XHR2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucyxcclxuXHRcdCAgICBzaXplID0gTC5wb2ludChvcHRpb25zW25hbWUgKyAnU2l6ZSddKSxcclxuXHRcdCAgICBhbmNob3IgPSBMLnBvaW50KG5hbWUgPT09ICdzaGFkb3cnICYmIG9wdGlvbnMuc2hhZG93QW5jaG9yIHx8IG9wdGlvbnMuaWNvbkFuY2hvciB8fFxyXG5cdFx0ICAgICAgICAgICAgc2l6ZSAmJiBzaXplLmRpdmlkZUJ5KDIsIHRydWUpKTtcclxuXHJcblx0XHRpbWcuY2xhc3NOYW1lID0gJ2xlYWZsZXQtbWFya2VyLScgKyBuYW1lICsgJyAnICsgKG9wdGlvbnMuY2xhc3NOYW1lIHx8ICcnKTtcclxuXHJcblx0XHRpZiAoYW5jaG9yKSB7XHJcblx0XHRcdGltZy5zdHlsZS5tYXJnaW5MZWZ0ID0gKC1hbmNob3IueCkgKyAncHgnO1xyXG5cdFx0XHRpbWcuc3R5bGUubWFyZ2luVG9wICA9ICgtYW5jaG9yLnkpICsgJ3B4JztcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoc2l6ZSkge1xyXG5cdFx0XHRpbWcuc3R5bGUud2lkdGggID0gc2l6ZS54ICsgJ3B4JztcclxuXHRcdFx0aW1nLnN0eWxlLmhlaWdodCA9IHNpemUueSArICdweCc7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X2NyZWF0ZUltZzogZnVuY3Rpb24gKHNyYywgZWwpIHtcclxuXHRcdGVsID0gZWwgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcblx0XHRlbC5zcmMgPSBzcmM7XHJcblx0XHRyZXR1cm4gZWw7XHJcblx0fSxcclxuXHJcblx0X2dldEljb25Vcmw6IGZ1bmN0aW9uIChuYW1lKSB7XHJcblx0XHRyZXR1cm4gTC5Ccm93c2VyLnJldGluYSAmJiB0aGlzLm9wdGlvbnNbbmFtZSArICdSZXRpbmFVcmwnXSB8fCB0aGlzLm9wdGlvbnNbbmFtZSArICdVcmwnXTtcclxuXHR9XHJcbn0pO1xyXG5cclxuTC5pY29uID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHRyZXR1cm4gbmV3IEwuSWNvbihvcHRpb25zKTtcclxufTtcclxuXG5cblxuLypcbiAqIEwuSWNvbi5EZWZhdWx0IGlzIHRoZSBibHVlIG1hcmtlciBpY29uIHVzZWQgYnkgZGVmYXVsdCBpbiBMZWFmbGV0LlxuICovXG5cbkwuSWNvbi5EZWZhdWx0ID0gTC5JY29uLmV4dGVuZCh7XG5cblx0b3B0aW9uczoge1xuXHRcdGljb25TaXplOiAgICBbMjUsIDQxXSxcblx0XHRpY29uQW5jaG9yOiAgWzEyLCA0MV0sXG5cdFx0cG9wdXBBbmNob3I6IFsxLCAtMzRdLFxuXHRcdHNoYWRvd1NpemU6ICBbNDEsIDQxXVxuXHR9LFxuXG5cdF9nZXRJY29uVXJsOiBmdW5jdGlvbiAobmFtZSkge1xuXHRcdHZhciBrZXkgPSBuYW1lICsgJ1VybCc7XG5cblx0XHRpZiAodGhpcy5vcHRpb25zW2tleV0pIHtcblx0XHRcdHJldHVybiB0aGlzLm9wdGlvbnNba2V5XTtcblx0XHR9XG5cblx0XHR2YXIgcGF0aCA9IEwuSWNvbi5EZWZhdWx0LmltYWdlUGF0aDtcblxuXHRcdGlmICghcGF0aCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdDb3VsZG5cXCd0IGF1dG9kZXRlY3QgTC5JY29uLkRlZmF1bHQuaW1hZ2VQYXRoLCBzZXQgaXQgbWFudWFsbHkuJyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHBhdGggKyAnL21hcmtlci0nICsgbmFtZSArIChMLkJyb3dzZXIucmV0aW5hICYmIG5hbWUgPT09ICdpY29uJyA/ICctMngnIDogJycpICsgJy5wbmcnO1xuXHR9XG59KTtcblxuTC5JY29uLkRlZmF1bHQuaW1hZ2VQYXRoID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JyksXG5cdCAgICBsZWFmbGV0UmUgPSAvW1xcL15dbGVhZmxldFtcXC1cXC5fXT8oW1xcd1xcLVxcLl9dKilcXC5qc1xcPz8vO1xuXG5cdHZhciBpLCBsZW4sIHNyYywgcGF0aDtcblxuXHRmb3IgKGkgPSAwLCBsZW4gPSBzY3JpcHRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0c3JjID0gc2NyaXB0c1tpXS5zcmMgfHwgJyc7XG5cblx0XHRpZiAoc3JjLm1hdGNoKGxlYWZsZXRSZSkpIHtcblx0XHRcdHBhdGggPSBzcmMuc3BsaXQobGVhZmxldFJlKVswXTtcblx0XHRcdHJldHVybiAocGF0aCA/IHBhdGggKyAnLycgOiAnJykgKyAnaW1hZ2VzJztcblx0XHR9XG5cdH1cbn0oKSk7XG5cblxuXG4vKlxyXG4gKiBMLk1hcmtlciBpcyB1c2VkIHRvIGRpc3BsYXkgY2xpY2thYmxlL2RyYWdnYWJsZSBpY29ucyBvbiB0aGUgbWFwLlxyXG4gKi9cclxuXHJcbkwuTWFya2VyID0gTC5MYXllci5leHRlbmQoe1xyXG5cclxuXHRvcHRpb25zOiB7XHJcblx0XHRwYW5lOiAnbWFya2VyUGFuZScsXHJcblx0XHRub25CdWJibGluZ0V2ZW50czogWydjbGljaycsICdkYmxjbGljaycsICdtb3VzZW92ZXInLCAnbW91c2VvdXQnLCAnY29udGV4dG1lbnUnXSxcclxuXHJcblx0XHRpY29uOiBuZXcgTC5JY29uLkRlZmF1bHQoKSxcclxuXHRcdC8vIHRpdGxlOiAnJyxcclxuXHRcdC8vIGFsdDogJycsXHJcblx0XHRpbnRlcmFjdGl2ZTogdHJ1ZSxcclxuXHRcdC8vIGRyYWdnYWJsZTogZmFsc2UsXHJcblx0XHRrZXlib2FyZDogdHJ1ZSxcclxuXHRcdHpJbmRleE9mZnNldDogMCxcclxuXHRcdG9wYWNpdHk6IDEsXHJcblx0XHQvLyByaXNlT25Ib3ZlcjogZmFsc2UsXHJcblx0XHRyaXNlT2Zmc2V0OiAyNTBcclxuXHR9LFxyXG5cclxuXHRpbml0aWFsaXplOiBmdW5jdGlvbiAobGF0bG5nLCBvcHRpb25zKSB7XHJcblx0XHRMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XHJcblx0XHR0aGlzLl9sYXRsbmcgPSBMLmxhdExuZyhsYXRsbmcpO1xyXG5cdH0sXHJcblxyXG5cdG9uQWRkOiBmdW5jdGlvbiAobWFwKSB7XHJcblx0XHR0aGlzLl96b29tQW5pbWF0ZWQgPSB0aGlzLl96b29tQW5pbWF0ZWQgJiYgbWFwLm9wdGlvbnMubWFya2VyWm9vbUFuaW1hdGlvbjtcclxuXHJcblx0XHR0aGlzLl9pbml0SWNvbigpO1xyXG5cdFx0dGhpcy51cGRhdGUoKTtcclxuXHR9LFxyXG5cclxuXHRvblJlbW92ZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuZHJhZ2dpbmcgJiYgdGhpcy5kcmFnZ2luZy5lbmFibGVkKCkpIHtcclxuXHRcdFx0dGhpcy5vcHRpb25zLmRyYWdnYWJsZSA9IHRydWU7XHJcblx0XHRcdHRoaXMuZHJhZ2dpbmcucmVtb3ZlSG9va3MoKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9yZW1vdmVJY29uKCk7XHJcblx0XHR0aGlzLl9yZW1vdmVTaGFkb3coKTtcclxuXHR9LFxyXG5cclxuXHRnZXRFdmVudHM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBldmVudHMgPSB7XHJcblx0XHRcdHpvb206IHRoaXMudXBkYXRlLFxyXG5cdFx0XHR2aWV3cmVzZXQ6IHRoaXMudXBkYXRlXHJcblx0XHR9O1xyXG5cclxuXHRcdGlmICh0aGlzLl96b29tQW5pbWF0ZWQpIHtcclxuXHRcdFx0ZXZlbnRzLnpvb21hbmltID0gdGhpcy5fYW5pbWF0ZVpvb207XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGV2ZW50cztcclxuXHR9LFxyXG5cclxuXHRnZXRMYXRMbmc6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLl9sYXRsbmc7XHJcblx0fSxcclxuXHJcblx0c2V0TGF0TG5nOiBmdW5jdGlvbiAobGF0bG5nKSB7XHJcblx0XHR2YXIgb2xkTGF0TG5nID0gdGhpcy5fbGF0bG5nO1xyXG5cdFx0dGhpcy5fbGF0bG5nID0gTC5sYXRMbmcobGF0bG5nKTtcclxuXHRcdHRoaXMudXBkYXRlKCk7XHJcblx0XHRyZXR1cm4gdGhpcy5maXJlKCdtb3ZlJywge29sZExhdExuZzogb2xkTGF0TG5nLCBsYXRsbmc6IHRoaXMuX2xhdGxuZ30pO1xyXG5cdH0sXHJcblxyXG5cdHNldFpJbmRleE9mZnNldDogZnVuY3Rpb24gKG9mZnNldCkge1xyXG5cdFx0dGhpcy5vcHRpb25zLnpJbmRleE9mZnNldCA9IG9mZnNldDtcclxuXHRcdHJldHVybiB0aGlzLnVwZGF0ZSgpO1xyXG5cdH0sXHJcblxyXG5cdHNldEljb246IGZ1bmN0aW9uIChpY29uKSB7XHJcblxyXG5cdFx0dGhpcy5vcHRpb25zLmljb24gPSBpY29uO1xyXG5cclxuXHRcdGlmICh0aGlzLl9tYXApIHtcclxuXHRcdFx0dGhpcy5faW5pdEljb24oKTtcclxuXHRcdFx0dGhpcy51cGRhdGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5fcG9wdXApIHtcclxuXHRcdFx0dGhpcy5iaW5kUG9wdXAodGhpcy5fcG9wdXAsIHRoaXMuX3BvcHVwLm9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdGdldEVsZW1lbnQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLl9pY29uO1xyXG5cdH0sXHJcblxyXG5cdHVwZGF0ZTogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdGlmICh0aGlzLl9pY29uKSB7XHJcblx0XHRcdHZhciBwb3MgPSB0aGlzLl9tYXAubGF0TG5nVG9MYXllclBvaW50KHRoaXMuX2xhdGxuZykucm91bmQoKTtcclxuXHRcdFx0dGhpcy5fc2V0UG9zKHBvcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0X2luaXRJY29uOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucyxcclxuXHRcdCAgICBjbGFzc1RvQWRkID0gJ2xlYWZsZXQtem9vbS0nICsgKHRoaXMuX3pvb21BbmltYXRlZCA/ICdhbmltYXRlZCcgOiAnaGlkZScpO1xyXG5cclxuXHRcdHZhciBpY29uID0gb3B0aW9ucy5pY29uLmNyZWF0ZUljb24odGhpcy5faWNvbiksXHJcblx0XHQgICAgYWRkSWNvbiA9IGZhbHNlO1xyXG5cclxuXHRcdC8vIGlmIHdlJ3JlIG5vdCByZXVzaW5nIHRoZSBpY29uLCByZW1vdmUgdGhlIG9sZCBvbmUgYW5kIGluaXQgbmV3IG9uZVxyXG5cdFx0aWYgKGljb24gIT09IHRoaXMuX2ljb24pIHtcclxuXHRcdFx0aWYgKHRoaXMuX2ljb24pIHtcclxuXHRcdFx0XHR0aGlzLl9yZW1vdmVJY29uKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0YWRkSWNvbiA9IHRydWU7XHJcblxyXG5cdFx0XHRpZiAob3B0aW9ucy50aXRsZSkge1xyXG5cdFx0XHRcdGljb24udGl0bGUgPSBvcHRpb25zLnRpdGxlO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChvcHRpb25zLmFsdCkge1xyXG5cdFx0XHRcdGljb24uYWx0ID0gb3B0aW9ucy5hbHQ7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRMLkRvbVV0aWwuYWRkQ2xhc3MoaWNvbiwgY2xhc3NUb0FkZCk7XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMua2V5Ym9hcmQpIHtcclxuXHRcdFx0aWNvbi50YWJJbmRleCA9ICcwJztcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9pY29uID0gaWNvbjtcclxuXHJcblx0XHRpZiAob3B0aW9ucy5yaXNlT25Ib3Zlcikge1xyXG5cdFx0XHR0aGlzLm9uKHtcclxuXHRcdFx0XHRtb3VzZW92ZXI6IHRoaXMuX2JyaW5nVG9Gcm9udCxcclxuXHRcdFx0XHRtb3VzZW91dDogdGhpcy5fcmVzZXRaSW5kZXhcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIG5ld1NoYWRvdyA9IG9wdGlvbnMuaWNvbi5jcmVhdGVTaGFkb3codGhpcy5fc2hhZG93KSxcclxuXHRcdCAgICBhZGRTaGFkb3cgPSBmYWxzZTtcclxuXHJcblx0XHRpZiAobmV3U2hhZG93ICE9PSB0aGlzLl9zaGFkb3cpIHtcclxuXHRcdFx0dGhpcy5fcmVtb3ZlU2hhZG93KCk7XHJcblx0XHRcdGFkZFNoYWRvdyA9IHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG5ld1NoYWRvdykge1xyXG5cdFx0XHRMLkRvbVV0aWwuYWRkQ2xhc3MobmV3U2hhZG93LCBjbGFzc1RvQWRkKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuX3NoYWRvdyA9IG5ld1NoYWRvdztcclxuXHJcblxyXG5cdFx0aWYgKG9wdGlvbnMub3BhY2l0eSA8IDEpIHtcclxuXHRcdFx0dGhpcy5fdXBkYXRlT3BhY2l0eSgpO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRpZiAoYWRkSWNvbikge1xyXG5cdFx0XHR0aGlzLmdldFBhbmUoKS5hcHBlbmRDaGlsZCh0aGlzLl9pY29uKTtcclxuXHRcdFx0dGhpcy5faW5pdEludGVyYWN0aW9uKCk7XHJcblx0XHR9XHJcblx0XHRpZiAobmV3U2hhZG93ICYmIGFkZFNoYWRvdykge1xyXG5cdFx0XHR0aGlzLmdldFBhbmUoJ3NoYWRvd1BhbmUnKS5hcHBlbmRDaGlsZCh0aGlzLl9zaGFkb3cpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF9yZW1vdmVJY29uOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAodGhpcy5vcHRpb25zLnJpc2VPbkhvdmVyKSB7XHJcblx0XHRcdHRoaXMub2ZmKHtcclxuXHRcdFx0XHRtb3VzZW92ZXI6IHRoaXMuX2JyaW5nVG9Gcm9udCxcclxuXHRcdFx0XHRtb3VzZW91dDogdGhpcy5fcmVzZXRaSW5kZXhcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0TC5Eb21VdGlsLnJlbW92ZSh0aGlzLl9pY29uKTtcclxuXHRcdHRoaXMucmVtb3ZlSW50ZXJhY3RpdmVUYXJnZXQodGhpcy5faWNvbik7XHJcblxyXG5cdFx0dGhpcy5faWNvbiA9IG51bGw7XHJcblx0fSxcclxuXHJcblx0X3JlbW92ZVNoYWRvdzogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuX3NoYWRvdykge1xyXG5cdFx0XHRMLkRvbVV0aWwucmVtb3ZlKHRoaXMuX3NoYWRvdyk7XHJcblx0XHR9XHJcblx0XHR0aGlzLl9zaGFkb3cgPSBudWxsO1xyXG5cdH0sXHJcblxyXG5cdF9zZXRQb3M6IGZ1bmN0aW9uIChwb3MpIHtcclxuXHRcdEwuRG9tVXRpbC5zZXRQb3NpdGlvbih0aGlzLl9pY29uLCBwb3MpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9zaGFkb3cpIHtcclxuXHRcdFx0TC5Eb21VdGlsLnNldFBvc2l0aW9uKHRoaXMuX3NoYWRvdywgcG9zKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl96SW5kZXggPSBwb3MueSArIHRoaXMub3B0aW9ucy56SW5kZXhPZmZzZXQ7XHJcblxyXG5cdFx0dGhpcy5fcmVzZXRaSW5kZXgoKTtcclxuXHR9LFxyXG5cclxuXHRfdXBkYXRlWkluZGV4OiBmdW5jdGlvbiAob2Zmc2V0KSB7XHJcblx0XHR0aGlzLl9pY29uLnN0eWxlLnpJbmRleCA9IHRoaXMuX3pJbmRleCArIG9mZnNldDtcclxuXHR9LFxyXG5cclxuXHRfYW5pbWF0ZVpvb206IGZ1bmN0aW9uIChvcHQpIHtcclxuXHRcdHZhciBwb3MgPSB0aGlzLl9tYXAuX2xhdExuZ1RvTmV3TGF5ZXJQb2ludCh0aGlzLl9sYXRsbmcsIG9wdC56b29tLCBvcHQuY2VudGVyKS5yb3VuZCgpO1xyXG5cclxuXHRcdHRoaXMuX3NldFBvcyhwb3MpO1xyXG5cdH0sXHJcblxyXG5cdF9pbml0SW50ZXJhY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRpZiAoIXRoaXMub3B0aW9ucy5pbnRlcmFjdGl2ZSkgeyByZXR1cm47IH1cclxuXHJcblx0XHRMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5faWNvbiwgJ2xlYWZsZXQtaW50ZXJhY3RpdmUnKTtcclxuXHJcblx0XHR0aGlzLmFkZEludGVyYWN0aXZlVGFyZ2V0KHRoaXMuX2ljb24pO1xyXG5cclxuXHRcdGlmIChMLkhhbmRsZXIuTWFya2VyRHJhZykge1xyXG5cdFx0XHR2YXIgZHJhZ2dhYmxlID0gdGhpcy5vcHRpb25zLmRyYWdnYWJsZTtcclxuXHRcdFx0aWYgKHRoaXMuZHJhZ2dpbmcpIHtcclxuXHRcdFx0XHRkcmFnZ2FibGUgPSB0aGlzLmRyYWdnaW5nLmVuYWJsZWQoKTtcclxuXHRcdFx0XHR0aGlzLmRyYWdnaW5nLmRpc2FibGUoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5kcmFnZ2luZyA9IG5ldyBMLkhhbmRsZXIuTWFya2VyRHJhZyh0aGlzKTtcclxuXHJcblx0XHRcdGlmIChkcmFnZ2FibGUpIHtcclxuXHRcdFx0XHR0aGlzLmRyYWdnaW5nLmVuYWJsZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0c2V0T3BhY2l0eTogZnVuY3Rpb24gKG9wYWNpdHkpIHtcclxuXHRcdHRoaXMub3B0aW9ucy5vcGFjaXR5ID0gb3BhY2l0eTtcclxuXHRcdGlmICh0aGlzLl9tYXApIHtcclxuXHRcdFx0dGhpcy5fdXBkYXRlT3BhY2l0eSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdF91cGRhdGVPcGFjaXR5OiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgb3BhY2l0eSA9IHRoaXMub3B0aW9ucy5vcGFjaXR5O1xyXG5cclxuXHRcdEwuRG9tVXRpbC5zZXRPcGFjaXR5KHRoaXMuX2ljb24sIG9wYWNpdHkpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9zaGFkb3cpIHtcclxuXHRcdFx0TC5Eb21VdGlsLnNldE9wYWNpdHkodGhpcy5fc2hhZG93LCBvcGFjaXR5KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfYnJpbmdUb0Zyb250OiBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLl91cGRhdGVaSW5kZXgodGhpcy5vcHRpb25zLnJpc2VPZmZzZXQpO1xyXG5cdH0sXHJcblxyXG5cdF9yZXNldFpJbmRleDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy5fdXBkYXRlWkluZGV4KDApO1xyXG5cdH1cclxufSk7XHJcblxyXG5MLm1hcmtlciA9IGZ1bmN0aW9uIChsYXRsbmcsIG9wdGlvbnMpIHtcclxuXHRyZXR1cm4gbmV3IEwuTWFya2VyKGxhdGxuZywgb3B0aW9ucyk7XHJcbn07XHJcblxuXG5cbi8qXG4gKiBMLkRpdkljb24gaXMgYSBsaWdodHdlaWdodCBIVE1MLWJhc2VkIGljb24gY2xhc3MgKGFzIG9wcG9zZWQgdG8gdGhlIGltYWdlLWJhc2VkIEwuSWNvbilcbiAqIHRvIHVzZSB3aXRoIEwuTWFya2VyLlxuICovXG5cbkwuRGl2SWNvbiA9IEwuSWNvbi5leHRlbmQoe1xuXHRvcHRpb25zOiB7XG5cdFx0aWNvblNpemU6IFsxMiwgMTJdLCAvLyBhbHNvIGNhbiBiZSBzZXQgdGhyb3VnaCBDU1Ncblx0XHQvKlxuXHRcdGljb25BbmNob3I6IChQb2ludClcblx0XHRwb3B1cEFuY2hvcjogKFBvaW50KVxuXHRcdGh0bWw6IChTdHJpbmcpXG5cdFx0YmdQb3M6IChQb2ludClcblx0XHQqL1xuXHRcdGNsYXNzTmFtZTogJ2xlYWZsZXQtZGl2LWljb24nLFxuXHRcdGh0bWw6IGZhbHNlXG5cdH0sXG5cblx0Y3JlYXRlSWNvbjogZnVuY3Rpb24gKG9sZEljb24pIHtcblx0XHR2YXIgZGl2ID0gKG9sZEljb24gJiYgb2xkSWNvbi50YWdOYW1lID09PSAnRElWJykgPyBvbGRJY29uIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0ICAgIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cblx0XHRkaXYuaW5uZXJIVE1MID0gb3B0aW9ucy5odG1sICE9PSBmYWxzZSA/IG9wdGlvbnMuaHRtbCA6ICcnO1xuXG5cdFx0aWYgKG9wdGlvbnMuYmdQb3MpIHtcblx0XHRcdGRpdi5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSAoLW9wdGlvbnMuYmdQb3MueCkgKyAncHggJyArICgtb3B0aW9ucy5iZ1Bvcy55KSArICdweCc7XG5cdFx0fVxuXHRcdHRoaXMuX3NldEljb25TdHlsZXMoZGl2LCAnaWNvbicpO1xuXG5cdFx0cmV0dXJuIGRpdjtcblx0fSxcblxuXHRjcmVhdGVTaGFkb3c6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxufSk7XG5cbkwuZGl2SWNvbiA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdHJldHVybiBuZXcgTC5EaXZJY29uKG9wdGlvbnMpO1xufTtcblxuXG5cbi8qXHJcbiAqIEwuUG9wdXAgaXMgdXNlZCBmb3IgZGlzcGxheWluZyBwb3B1cHMgb24gdGhlIG1hcC5cclxuICovXHJcblxyXG5MLk1hcC5tZXJnZU9wdGlvbnMoe1xyXG5cdGNsb3NlUG9wdXBPbkNsaWNrOiB0cnVlXHJcbn0pO1xyXG5cclxuTC5Qb3B1cCA9IEwuTGF5ZXIuZXh0ZW5kKHtcclxuXHJcblx0b3B0aW9uczoge1xyXG5cdFx0cGFuZTogJ3BvcHVwUGFuZScsXHJcblxyXG5cdFx0bWluV2lkdGg6IDUwLFxyXG5cdFx0bWF4V2lkdGg6IDMwMCxcclxuXHRcdC8vIG1heEhlaWdodDogPE51bWJlcj4sXHJcblx0XHRvZmZzZXQ6IFswLCA3XSxcclxuXHJcblx0XHRhdXRvUGFuOiB0cnVlLFxyXG5cdFx0YXV0b1BhblBhZGRpbmc6IFs1LCA1XSxcclxuXHRcdC8vIGF1dG9QYW5QYWRkaW5nVG9wTGVmdDogPFBvaW50PixcclxuXHRcdC8vIGF1dG9QYW5QYWRkaW5nQm90dG9tUmlnaHQ6IDxQb2ludD4sXHJcblxyXG5cdFx0Y2xvc2VCdXR0b246IHRydWUsXHJcblx0XHRhdXRvQ2xvc2U6IHRydWUsXHJcblx0XHQvLyBrZWVwSW5WaWV3OiBmYWxzZSxcclxuXHRcdC8vIGNsYXNzTmFtZTogJycsXHJcblx0XHR6b29tQW5pbWF0aW9uOiB0cnVlXHJcblx0fSxcclxuXHJcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMsIHNvdXJjZSkge1xyXG5cdFx0TC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xyXG5cclxuXHRcdHRoaXMuX3NvdXJjZSA9IHNvdXJjZTtcclxuXHR9LFxyXG5cclxuXHRvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xyXG5cdFx0dGhpcy5fem9vbUFuaW1hdGVkID0gdGhpcy5fem9vbUFuaW1hdGVkICYmIHRoaXMub3B0aW9ucy56b29tQW5pbWF0aW9uO1xyXG5cclxuXHRcdGlmICghdGhpcy5fY29udGFpbmVyKSB7XHJcblx0XHRcdHRoaXMuX2luaXRMYXlvdXQoKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAobWFwLl9mYWRlQW5pbWF0ZWQpIHtcclxuXHRcdFx0TC5Eb21VdGlsLnNldE9wYWNpdHkodGhpcy5fY29udGFpbmVyLCAwKTtcclxuXHRcdH1cclxuXHJcblx0XHRjbGVhclRpbWVvdXQodGhpcy5fcmVtb3ZlVGltZW91dCk7XHJcblx0XHR0aGlzLmdldFBhbmUoKS5hcHBlbmRDaGlsZCh0aGlzLl9jb250YWluZXIpO1xyXG5cdFx0dGhpcy51cGRhdGUoKTtcclxuXHJcblx0XHRpZiAobWFwLl9mYWRlQW5pbWF0ZWQpIHtcclxuXHRcdFx0TC5Eb21VdGlsLnNldE9wYWNpdHkodGhpcy5fY29udGFpbmVyLCAxKTtcclxuXHRcdH1cclxuXHJcblx0XHRtYXAuZmlyZSgncG9wdXBvcGVuJywge3BvcHVwOiB0aGlzfSk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3NvdXJjZSkge1xyXG5cdFx0XHR0aGlzLl9zb3VyY2UuZmlyZSgncG9wdXBvcGVuJywge3BvcHVwOiB0aGlzfSwgdHJ1ZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0b3Blbk9uOiBmdW5jdGlvbiAobWFwKSB7XHJcblx0XHRtYXAub3BlblBvcHVwKHRoaXMpO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0b25SZW1vdmU6IGZ1bmN0aW9uIChtYXApIHtcclxuXHRcdGlmIChtYXAuX2ZhZGVBbmltYXRlZCkge1xyXG5cdFx0XHRMLkRvbVV0aWwuc2V0T3BhY2l0eSh0aGlzLl9jb250YWluZXIsIDApO1xyXG5cdFx0XHR0aGlzLl9yZW1vdmVUaW1lb3V0ID0gc2V0VGltZW91dChMLmJpbmQoTC5Eb21VdGlsLnJlbW92ZSwgTC5Eb21VdGlsLCB0aGlzLl9jb250YWluZXIpLCAyMDApO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0TC5Eb21VdGlsLnJlbW92ZSh0aGlzLl9jb250YWluZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1hcC5maXJlKCdwb3B1cGNsb3NlJywge3BvcHVwOiB0aGlzfSk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3NvdXJjZSkge1xyXG5cdFx0XHR0aGlzLl9zb3VyY2UuZmlyZSgncG9wdXBjbG9zZScsIHtwb3B1cDogdGhpc30sIHRydWUpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGdldExhdExuZzogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2xhdGxuZztcclxuXHR9LFxyXG5cclxuXHRzZXRMYXRMbmc6IGZ1bmN0aW9uIChsYXRsbmcpIHtcclxuXHRcdHRoaXMuX2xhdGxuZyA9IEwubGF0TG5nKGxhdGxuZyk7XHJcblx0XHRpZiAodGhpcy5fbWFwKSB7XHJcblx0XHRcdHRoaXMuX3VwZGF0ZVBvc2l0aW9uKCk7XHJcblx0XHRcdHRoaXMuX2FkanVzdFBhbigpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0Z2V0Q29udGVudDogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2NvbnRlbnQ7XHJcblx0fSxcclxuXHJcblx0c2V0Q29udGVudDogZnVuY3Rpb24gKGNvbnRlbnQpIHtcclxuXHRcdHRoaXMuX2NvbnRlbnQgPSBjb250ZW50O1xyXG5cdFx0dGhpcy51cGRhdGUoKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdGdldEVsZW1lbnQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLl9jb250YWluZXI7XHJcblx0fSxcclxuXHJcblx0dXBkYXRlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoIXRoaXMuX21hcCkgeyByZXR1cm47IH1cclxuXHJcblx0XHR0aGlzLl9jb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xyXG5cclxuXHRcdHRoaXMuX3VwZGF0ZUNvbnRlbnQoKTtcclxuXHRcdHRoaXMuX3VwZGF0ZUxheW91dCgpO1xyXG5cdFx0dGhpcy5fdXBkYXRlUG9zaXRpb24oKTtcclxuXHJcblx0XHR0aGlzLl9jb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9ICcnO1xyXG5cclxuXHRcdHRoaXMuX2FkanVzdFBhbigpO1xyXG5cdH0sXHJcblxyXG5cdGdldEV2ZW50czogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGV2ZW50cyA9IHtcclxuXHRcdFx0em9vbTogdGhpcy5fdXBkYXRlUG9zaXRpb24sXHJcblx0XHRcdHZpZXdyZXNldDogdGhpcy5fdXBkYXRlUG9zaXRpb25cclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKHRoaXMuX3pvb21BbmltYXRlZCkge1xyXG5cdFx0XHRldmVudHMuem9vbWFuaW0gPSB0aGlzLl9hbmltYXRlWm9vbTtcclxuXHRcdH1cclxuXHRcdGlmICgnY2xvc2VPbkNsaWNrJyBpbiB0aGlzLm9wdGlvbnMgPyB0aGlzLm9wdGlvbnMuY2xvc2VPbkNsaWNrIDogdGhpcy5fbWFwLm9wdGlvbnMuY2xvc2VQb3B1cE9uQ2xpY2spIHtcclxuXHRcdFx0ZXZlbnRzLnByZWNsaWNrID0gdGhpcy5fY2xvc2U7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5vcHRpb25zLmtlZXBJblZpZXcpIHtcclxuXHRcdFx0ZXZlbnRzLm1vdmVlbmQgPSB0aGlzLl9hZGp1c3RQYW47XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZXZlbnRzO1xyXG5cdH0sXHJcblxyXG5cdGlzT3BlbjogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuICEhdGhpcy5fbWFwICYmIHRoaXMuX21hcC5oYXNMYXllcih0aGlzKTtcclxuXHR9LFxyXG5cclxuXHRicmluZ1RvRnJvbnQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzLl9tYXApIHtcclxuXHRcdFx0TC5Eb21VdGlsLnRvRnJvbnQodGhpcy5fY29udGFpbmVyKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdGJyaW5nVG9CYWNrOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAodGhpcy5fbWFwKSB7XHJcblx0XHRcdEwuRG9tVXRpbC50b0JhY2sodGhpcy5fY29udGFpbmVyKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdF9jbG9zZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuX21hcCkge1xyXG5cdFx0XHR0aGlzLl9tYXAuY2xvc2VQb3B1cCh0aGlzKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfaW5pdExheW91dDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIHByZWZpeCA9ICdsZWFmbGV0LXBvcHVwJyxcclxuXHRcdCAgICBjb250YWluZXIgPSB0aGlzLl9jb250YWluZXIgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLFxyXG5cdFx0XHRwcmVmaXggKyAnICcgKyAodGhpcy5vcHRpb25zLmNsYXNzTmFtZSB8fCAnJykgK1xyXG5cdFx0XHQnIGxlYWZsZXQtem9vbS0nICsgKHRoaXMuX3pvb21BbmltYXRlZCA/ICdhbmltYXRlZCcgOiAnaGlkZScpKTtcclxuXHJcblx0XHRpZiAodGhpcy5vcHRpb25zLmNsb3NlQnV0dG9uKSB7XHJcblx0XHRcdHZhciBjbG9zZUJ1dHRvbiA9IHRoaXMuX2Nsb3NlQnV0dG9uID0gTC5Eb21VdGlsLmNyZWF0ZSgnYScsIHByZWZpeCArICctY2xvc2UtYnV0dG9uJywgY29udGFpbmVyKTtcclxuXHRcdFx0Y2xvc2VCdXR0b24uaHJlZiA9ICcjY2xvc2UnO1xyXG5cdFx0XHRjbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSAnJiMyMTU7JztcclxuXHJcblx0XHRcdEwuRG9tRXZlbnQub24oY2xvc2VCdXR0b24sICdjbGljaycsIHRoaXMuX29uQ2xvc2VCdXR0b25DbGljaywgdGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHdyYXBwZXIgPSB0aGlzLl93cmFwcGVyID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgcHJlZml4ICsgJy1jb250ZW50LXdyYXBwZXInLCBjb250YWluZXIpO1xyXG5cdFx0dGhpcy5fY29udGVudE5vZGUgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCBwcmVmaXggKyAnLWNvbnRlbnQnLCB3cmFwcGVyKTtcclxuXHJcblx0XHRMLkRvbUV2ZW50XHJcblx0XHRcdC5kaXNhYmxlQ2xpY2tQcm9wYWdhdGlvbih3cmFwcGVyKVxyXG5cdFx0XHQuZGlzYWJsZVNjcm9sbFByb3BhZ2F0aW9uKHRoaXMuX2NvbnRlbnROb2RlKVxyXG5cdFx0XHQub24od3JhcHBlciwgJ2NvbnRleHRtZW51JywgTC5Eb21FdmVudC5zdG9wUHJvcGFnYXRpb24pO1xyXG5cclxuXHRcdHRoaXMuX3RpcENvbnRhaW5lciA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsIHByZWZpeCArICctdGlwLWNvbnRhaW5lcicsIGNvbnRhaW5lcik7XHJcblx0XHR0aGlzLl90aXAgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCBwcmVmaXggKyAnLXRpcCcsIHRoaXMuX3RpcENvbnRhaW5lcik7XHJcblx0fSxcclxuXHJcblx0X3VwZGF0ZUNvbnRlbnQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICghdGhpcy5fY29udGVudCkgeyByZXR1cm47IH1cclxuXHJcblx0XHR2YXIgbm9kZSA9IHRoaXMuX2NvbnRlbnROb2RlO1xyXG5cdFx0dmFyIGNvbnRlbnQgPSAodHlwZW9mIHRoaXMuX2NvbnRlbnQgPT09ICdmdW5jdGlvbicpID8gdGhpcy5fY29udGVudCh0aGlzLl9zb3VyY2UgfHwgdGhpcykgOiB0aGlzLl9jb250ZW50O1xyXG5cclxuXHRcdGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0bm9kZS5pbm5lckhUTUwgPSBjb250ZW50O1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0d2hpbGUgKG5vZGUuaGFzQ2hpbGROb2RlcygpKSB7XHJcblx0XHRcdFx0bm9kZS5yZW1vdmVDaGlsZChub2RlLmZpcnN0Q2hpbGQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdG5vZGUuYXBwZW5kQ2hpbGQoY29udGVudCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLmZpcmUoJ2NvbnRlbnR1cGRhdGUnKTtcclxuXHR9LFxyXG5cclxuXHRfdXBkYXRlTGF5b3V0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgY29udGFpbmVyID0gdGhpcy5fY29udGVudE5vZGUsXHJcblx0XHQgICAgc3R5bGUgPSBjb250YWluZXIuc3R5bGU7XHJcblxyXG5cdFx0c3R5bGUud2lkdGggPSAnJztcclxuXHRcdHN0eWxlLndoaXRlU3BhY2UgPSAnbm93cmFwJztcclxuXHJcblx0XHR2YXIgd2lkdGggPSBjb250YWluZXIub2Zmc2V0V2lkdGg7XHJcblx0XHR3aWR0aCA9IE1hdGgubWluKHdpZHRoLCB0aGlzLm9wdGlvbnMubWF4V2lkdGgpO1xyXG5cdFx0d2lkdGggPSBNYXRoLm1heCh3aWR0aCwgdGhpcy5vcHRpb25zLm1pbldpZHRoKTtcclxuXHJcblx0XHRzdHlsZS53aWR0aCA9ICh3aWR0aCArIDEpICsgJ3B4JztcclxuXHRcdHN0eWxlLndoaXRlU3BhY2UgPSAnJztcclxuXHJcblx0XHRzdHlsZS5oZWlnaHQgPSAnJztcclxuXHJcblx0XHR2YXIgaGVpZ2h0ID0gY29udGFpbmVyLm9mZnNldEhlaWdodCxcclxuXHRcdCAgICBtYXhIZWlnaHQgPSB0aGlzLm9wdGlvbnMubWF4SGVpZ2h0LFxyXG5cdFx0ICAgIHNjcm9sbGVkQ2xhc3MgPSAnbGVhZmxldC1wb3B1cC1zY3JvbGxlZCc7XHJcblxyXG5cdFx0aWYgKG1heEhlaWdodCAmJiBoZWlnaHQgPiBtYXhIZWlnaHQpIHtcclxuXHRcdFx0c3R5bGUuaGVpZ2h0ID0gbWF4SGVpZ2h0ICsgJ3B4JztcclxuXHRcdFx0TC5Eb21VdGlsLmFkZENsYXNzKGNvbnRhaW5lciwgc2Nyb2xsZWRDbGFzcyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRMLkRvbVV0aWwucmVtb3ZlQ2xhc3MoY29udGFpbmVyLCBzY3JvbGxlZENsYXNzKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9jb250YWluZXJXaWR0aCA9IHRoaXMuX2NvbnRhaW5lci5vZmZzZXRXaWR0aDtcclxuXHR9LFxyXG5cclxuXHRfdXBkYXRlUG9zaXRpb246IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICghdGhpcy5fbWFwKSB7IHJldHVybjsgfVxyXG5cclxuXHRcdHZhciBwb3MgPSB0aGlzLl9tYXAubGF0TG5nVG9MYXllclBvaW50KHRoaXMuX2xhdGxuZyksXHJcblx0XHQgICAgb2Zmc2V0ID0gTC5wb2ludCh0aGlzLm9wdGlvbnMub2Zmc2V0KTtcclxuXHJcblx0XHRpZiAodGhpcy5fem9vbUFuaW1hdGVkKSB7XHJcblx0XHRcdEwuRG9tVXRpbC5zZXRQb3NpdGlvbih0aGlzLl9jb250YWluZXIsIHBvcyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRvZmZzZXQgPSBvZmZzZXQuYWRkKHBvcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGJvdHRvbSA9IHRoaXMuX2NvbnRhaW5lckJvdHRvbSA9IC1vZmZzZXQueSxcclxuXHRcdCAgICBsZWZ0ID0gdGhpcy5fY29udGFpbmVyTGVmdCA9IC1NYXRoLnJvdW5kKHRoaXMuX2NvbnRhaW5lcldpZHRoIC8gMikgKyBvZmZzZXQueDtcclxuXHJcblx0XHQvLyBib3R0b20gcG9zaXRpb24gdGhlIHBvcHVwIGluIGNhc2UgdGhlIGhlaWdodCBvZiB0aGUgcG9wdXAgY2hhbmdlcyAoaW1hZ2VzIGxvYWRpbmcgZXRjKVxyXG5cdFx0dGhpcy5fY29udGFpbmVyLnN0eWxlLmJvdHRvbSA9IGJvdHRvbSArICdweCc7XHJcblx0XHR0aGlzLl9jb250YWluZXIuc3R5bGUubGVmdCA9IGxlZnQgKyAncHgnO1xyXG5cdH0sXHJcblxyXG5cdF9hbmltYXRlWm9vbTogZnVuY3Rpb24gKGUpIHtcclxuXHRcdHZhciBwb3MgPSB0aGlzLl9tYXAuX2xhdExuZ1RvTmV3TGF5ZXJQb2ludCh0aGlzLl9sYXRsbmcsIGUuem9vbSwgZS5jZW50ZXIpO1xyXG5cdFx0TC5Eb21VdGlsLnNldFBvc2l0aW9uKHRoaXMuX2NvbnRhaW5lciwgcG9zKTtcclxuXHR9LFxyXG5cclxuXHRfYWRqdXN0UGFuOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoIXRoaXMub3B0aW9ucy5hdXRvUGFuIHx8ICh0aGlzLl9tYXAuX3BhbkFuaW0gJiYgdGhpcy5fbWFwLl9wYW5BbmltLl9pblByb2dyZXNzKSkgeyByZXR1cm47IH1cclxuXHJcblx0XHR2YXIgbWFwID0gdGhpcy5fbWFwLFxyXG5cdFx0ICAgIGNvbnRhaW5lckhlaWdodCA9IHRoaXMuX2NvbnRhaW5lci5vZmZzZXRIZWlnaHQsXHJcblx0XHQgICAgY29udGFpbmVyV2lkdGggPSB0aGlzLl9jb250YWluZXJXaWR0aCxcclxuXHRcdCAgICBsYXllclBvcyA9IG5ldyBMLlBvaW50KHRoaXMuX2NvbnRhaW5lckxlZnQsIC1jb250YWluZXJIZWlnaHQgLSB0aGlzLl9jb250YWluZXJCb3R0b20pO1xyXG5cclxuXHRcdGlmICh0aGlzLl96b29tQW5pbWF0ZWQpIHtcclxuXHRcdFx0bGF5ZXJQb3MuX2FkZChMLkRvbVV0aWwuZ2V0UG9zaXRpb24odGhpcy5fY29udGFpbmVyKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGNvbnRhaW5lclBvcyA9IG1hcC5sYXllclBvaW50VG9Db250YWluZXJQb2ludChsYXllclBvcyksXHJcblx0XHQgICAgcGFkZGluZyA9IEwucG9pbnQodGhpcy5vcHRpb25zLmF1dG9QYW5QYWRkaW5nKSxcclxuXHRcdCAgICBwYWRkaW5nVEwgPSBMLnBvaW50KHRoaXMub3B0aW9ucy5hdXRvUGFuUGFkZGluZ1RvcExlZnQgfHwgcGFkZGluZyksXHJcblx0XHQgICAgcGFkZGluZ0JSID0gTC5wb2ludCh0aGlzLm9wdGlvbnMuYXV0b1BhblBhZGRpbmdCb3R0b21SaWdodCB8fCBwYWRkaW5nKSxcclxuXHRcdCAgICBzaXplID0gbWFwLmdldFNpemUoKSxcclxuXHRcdCAgICBkeCA9IDAsXHJcblx0XHQgICAgZHkgPSAwO1xyXG5cclxuXHRcdGlmIChjb250YWluZXJQb3MueCArIGNvbnRhaW5lcldpZHRoICsgcGFkZGluZ0JSLnggPiBzaXplLngpIHsgLy8gcmlnaHRcclxuXHRcdFx0ZHggPSBjb250YWluZXJQb3MueCArIGNvbnRhaW5lcldpZHRoIC0gc2l6ZS54ICsgcGFkZGluZ0JSLng7XHJcblx0XHR9XHJcblx0XHRpZiAoY29udGFpbmVyUG9zLnggLSBkeCAtIHBhZGRpbmdUTC54IDwgMCkgeyAvLyBsZWZ0XHJcblx0XHRcdGR4ID0gY29udGFpbmVyUG9zLnggLSBwYWRkaW5nVEwueDtcclxuXHRcdH1cclxuXHRcdGlmIChjb250YWluZXJQb3MueSArIGNvbnRhaW5lckhlaWdodCArIHBhZGRpbmdCUi55ID4gc2l6ZS55KSB7IC8vIGJvdHRvbVxyXG5cdFx0XHRkeSA9IGNvbnRhaW5lclBvcy55ICsgY29udGFpbmVySGVpZ2h0IC0gc2l6ZS55ICsgcGFkZGluZ0JSLnk7XHJcblx0XHR9XHJcblx0XHRpZiAoY29udGFpbmVyUG9zLnkgLSBkeSAtIHBhZGRpbmdUTC55IDwgMCkgeyAvLyB0b3BcclxuXHRcdFx0ZHkgPSBjb250YWluZXJQb3MueSAtIHBhZGRpbmdUTC55O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChkeCB8fCBkeSkge1xyXG5cdFx0XHRtYXBcclxuXHRcdFx0ICAgIC5maXJlKCdhdXRvcGFuc3RhcnQnKVxyXG5cdFx0XHQgICAgLnBhbkJ5KFtkeCwgZHldKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfb25DbG9zZUJ1dHRvbkNsaWNrOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dGhpcy5fY2xvc2UoKTtcclxuXHRcdEwuRG9tRXZlbnQuc3RvcChlKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuTC5wb3B1cCA9IGZ1bmN0aW9uIChvcHRpb25zLCBzb3VyY2UpIHtcclxuXHRyZXR1cm4gbmV3IEwuUG9wdXAob3B0aW9ucywgc291cmNlKTtcclxufTtcclxuXHJcblxyXG5MLk1hcC5pbmNsdWRlKHtcclxuXHRvcGVuUG9wdXA6IGZ1bmN0aW9uIChwb3B1cCwgbGF0bG5nLCBvcHRpb25zKSB7IC8vIChQb3B1cCkgb3IgKFN0cmluZyB8fCBIVE1MRWxlbWVudCwgTGF0TG5nWywgT2JqZWN0XSlcclxuXHRcdGlmICghKHBvcHVwIGluc3RhbmNlb2YgTC5Qb3B1cCkpIHtcclxuXHRcdFx0cG9wdXAgPSBuZXcgTC5Qb3B1cChvcHRpb25zKS5zZXRDb250ZW50KHBvcHVwKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAobGF0bG5nKSB7XHJcblx0XHRcdHBvcHVwLnNldExhdExuZyhsYXRsbmcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLmhhc0xheWVyKHBvcHVwKSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5fcG9wdXAgJiYgdGhpcy5fcG9wdXAub3B0aW9ucy5hdXRvQ2xvc2UpIHtcclxuXHRcdFx0dGhpcy5jbG9zZVBvcHVwKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fcG9wdXAgPSBwb3B1cDtcclxuXHRcdHJldHVybiB0aGlzLmFkZExheWVyKHBvcHVwKTtcclxuXHR9LFxyXG5cclxuXHRjbG9zZVBvcHVwOiBmdW5jdGlvbiAocG9wdXApIHtcclxuXHRcdGlmICghcG9wdXAgfHwgcG9wdXAgPT09IHRoaXMuX3BvcHVwKSB7XHJcblx0XHRcdHBvcHVwID0gdGhpcy5fcG9wdXA7XHJcblx0XHRcdHRoaXMuX3BvcHVwID0gbnVsbDtcclxuXHRcdH1cclxuXHRcdGlmIChwb3B1cCkge1xyXG5cdFx0XHR0aGlzLnJlbW92ZUxheWVyKHBvcHVwKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxufSk7XHJcblxuXG5cbi8qXG4gKiBBZGRzIHBvcHVwLXJlbGF0ZWQgbWV0aG9kcyB0byBhbGwgbGF5ZXJzLlxuICovXG5cbkwuTGF5ZXIuaW5jbHVkZSh7XG5cblx0YmluZFBvcHVwOiBmdW5jdGlvbiAoY29udGVudCwgb3B0aW9ucykge1xuXG5cdFx0aWYgKGNvbnRlbnQgaW5zdGFuY2VvZiBMLlBvcHVwKSB7XG5cdFx0XHRMLnNldE9wdGlvbnMoY29udGVudCwgb3B0aW9ucyk7XG5cdFx0XHR0aGlzLl9wb3B1cCA9IGNvbnRlbnQ7XG5cdFx0XHRjb250ZW50Ll9zb3VyY2UgPSB0aGlzO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoIXRoaXMuX3BvcHVwIHx8IG9wdGlvbnMpIHtcblx0XHRcdFx0dGhpcy5fcG9wdXAgPSBuZXcgTC5Qb3B1cChvcHRpb25zLCB0aGlzKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX3BvcHVwLnNldENvbnRlbnQoY29udGVudCk7XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLl9wb3B1cEhhbmRsZXJzQWRkZWQpIHtcblx0XHRcdHRoaXMub24oe1xuXHRcdFx0XHRjbGljazogdGhpcy5fb3BlblBvcHVwLFxuXHRcdFx0XHRyZW1vdmU6IHRoaXMuY2xvc2VQb3B1cCxcblx0XHRcdFx0bW92ZTogdGhpcy5fbW92ZVBvcHVwXG5cdFx0XHR9KTtcblx0XHRcdHRoaXMuX3BvcHVwSGFuZGxlcnNBZGRlZCA9IHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gc2F2ZSB0aGUgb3JpZ2luYWxseSBwYXNzZWQgb2Zmc2V0XG5cdFx0dGhpcy5fb3JpZ2luYWxQb3B1cE9mZnNldCA9IHRoaXMuX3BvcHVwLm9wdGlvbnMub2Zmc2V0O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0dW5iaW5kUG9wdXA6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5fcG9wdXApIHtcblx0XHRcdHRoaXMub2ZmKHtcblx0XHRcdFx0Y2xpY2s6IHRoaXMuX29wZW5Qb3B1cCxcblx0XHRcdFx0cmVtb3ZlOiB0aGlzLmNsb3NlUG9wdXAsXG5cdFx0XHRcdG1vdmU6IHRoaXMuX21vdmVQb3B1cFxuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLl9wb3B1cEhhbmRsZXJzQWRkZWQgPSBmYWxzZTtcblx0XHRcdHRoaXMuX3BvcHVwID0gbnVsbDtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0b3BlblBvcHVwOiBmdW5jdGlvbiAobGF5ZXIsIGxhdGxuZykge1xuXHRcdGlmICghKGxheWVyIGluc3RhbmNlb2YgTC5MYXllcikpIHtcblx0XHRcdGxhdGxuZyA9IGxheWVyO1xuXHRcdFx0bGF5ZXIgPSB0aGlzO1xuXHRcdH1cblxuXHRcdGlmIChsYXllciBpbnN0YW5jZW9mIEwuRmVhdHVyZUdyb3VwKSB7XG5cdFx0XHRmb3IgKHZhciBpZCBpbiB0aGlzLl9sYXllcnMpIHtcblx0XHRcdFx0bGF5ZXIgPSB0aGlzLl9sYXllcnNbaWRdO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoIWxhdGxuZykge1xuXHRcdFx0bGF0bG5nID0gbGF5ZXIuZ2V0Q2VudGVyID8gbGF5ZXIuZ2V0Q2VudGVyKCkgOiBsYXllci5nZXRMYXRMbmcoKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fcG9wdXAgJiYgdGhpcy5fbWFwKSB7XG5cdFx0XHQvLyBzZXQgdGhlIHBvcHVwIG9mZnNldCBmb3IgdGhpcyBsYXllclxuXHRcdFx0dGhpcy5fcG9wdXAub3B0aW9ucy5vZmZzZXQgPSB0aGlzLl9wb3B1cEFuY2hvcihsYXllcik7XG5cblx0XHRcdC8vIHNldCBwb3B1cCBzb3VyY2UgdG8gdGhpcyBsYXllclxuXHRcdFx0dGhpcy5fcG9wdXAuX3NvdXJjZSA9IGxheWVyO1xuXG5cdFx0XHQvLyB1cGRhdGUgdGhlIHBvcHVwIChjb250ZW50LCBsYXlvdXQsIGVjdC4uLilcblx0XHRcdHRoaXMuX3BvcHVwLnVwZGF0ZSgpO1xuXG5cdFx0XHQvLyBvcGVuIHRoZSBwb3B1cCBvbiB0aGUgbWFwXG5cdFx0XHR0aGlzLl9tYXAub3BlblBvcHVwKHRoaXMuX3BvcHVwLCBsYXRsbmcpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdGNsb3NlUG9wdXA6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5fcG9wdXApIHtcblx0XHRcdHRoaXMuX3BvcHVwLl9jbG9zZSgpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHR0b2dnbGVQb3B1cDogZnVuY3Rpb24gKHRhcmdldCkge1xuXHRcdGlmICh0aGlzLl9wb3B1cCkge1xuXHRcdFx0aWYgKHRoaXMuX3BvcHVwLl9tYXApIHtcblx0XHRcdFx0dGhpcy5jbG9zZVBvcHVwKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLm9wZW5Qb3B1cCh0YXJnZXQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRpc1BvcHVwT3BlbjogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLl9wb3B1cC5pc09wZW4oKTtcblx0fSxcblxuXHRzZXRQb3B1cENvbnRlbnQ6IGZ1bmN0aW9uIChjb250ZW50KSB7XG5cdFx0aWYgKHRoaXMuX3BvcHVwKSB7XG5cdFx0XHR0aGlzLl9wb3B1cC5zZXRDb250ZW50KGNvbnRlbnQpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRnZXRQb3B1cDogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLl9wb3B1cDtcblx0fSxcblxuXHRfb3BlblBvcHVwOiBmdW5jdGlvbiAoZSkge1xuXHRcdHZhciBsYXllciA9IGUubGF5ZXIgfHwgZS50YXJnZXQ7XG5cblx0XHRpZiAoIXRoaXMuX3BvcHVwKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLl9tYXApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBpZiB0aGlzIGluaGVyaXRzIGZyb20gUGF0aCBpdHMgYSB2ZWN0b3IgYW5kIHdlIGNhbiBqdXN0XG5cdFx0Ly8gb3BlbiB0aGUgcG9wdXAgYXQgdGhlIG5ldyBsb2NhdGlvblxuXHRcdGlmIChsYXllciBpbnN0YW5jZW9mIEwuUGF0aCkge1xuXHRcdFx0dGhpcy5vcGVuUG9wdXAoZS5sYXllciB8fCBlLnRhcmdldCwgZS5sYXRsbmcpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIG90aGVyd2lzZSB0cmVhdCBpdCBsaWtlIGEgbWFya2VyIGFuZCBmaWd1cmUgb3V0XG5cdFx0Ly8gaWYgd2Ugc2hvdWxkIHRvZ2dsZSBpdCBvcGVuL2Nsb3NlZFxuXHRcdGlmICh0aGlzLl9tYXAuaGFzTGF5ZXIodGhpcy5fcG9wdXApICYmIHRoaXMuX3BvcHVwLl9zb3VyY2UgPT09IGxheWVyKSB7XG5cdFx0XHR0aGlzLmNsb3NlUG9wdXAoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5vcGVuUG9wdXAobGF5ZXIsIGUubGF0bG5nKTtcblx0XHR9XG5cdH0sXG5cblx0X3BvcHVwQW5jaG9yOiBmdW5jdGlvbiAobGF5ZXIpIHtcblx0XHQvLyB3aGVyZSBzaG9sZCB3ZSBhbmNob3IgdGhlIHBvcHVwIG9uIHRoaXMgbGF5ZXI/XG5cdFx0dmFyIGFuY2hvciA9IGxheWVyLl9nZXRQb3B1cEFuY2hvciA/IGxheWVyLl9nZXRQb3B1cEFuY2hvcigpIDogWzAsIDBdO1xuXG5cdFx0Ly8gYWRkIHRoZSB1c2VycyBwYXNzZWQgb2Zmc2V0IHRvIHRoYXRcblx0XHR2YXIgb2Zmc2V0VG9BZGQgPSB0aGlzLl9vcmlnaW5hbFBvcHVwT2Zmc2V0IHx8IEwuUG9wdXAucHJvdG90eXBlLm9wdGlvbnMub2Zmc2V0O1xuXG5cdFx0Ly8gcmV0dXJuIHRoZSBmaW5hbCBwb2ludCB0byBhbmNob3IgdGhlIHBvcHVwXG5cdFx0cmV0dXJuIEwucG9pbnQoYW5jaG9yKS5hZGQob2Zmc2V0VG9BZGQpO1xuXHR9LFxuXG5cdF9tb3ZlUG9wdXA6IGZ1bmN0aW9uIChlKSB7XG5cdFx0dGhpcy5fcG9wdXAuc2V0TGF0TG5nKGUubGF0bG5nKTtcblx0fVxufSk7XG5cblxuXG4vKlxyXG4gKiBQb3B1cCBleHRlbnNpb24gdG8gTC5NYXJrZXIsIGFkZGluZyBwb3B1cC1yZWxhdGVkIG1ldGhvZHMuXHJcbiAqL1xyXG5cclxuTC5NYXJrZXIuaW5jbHVkZSh7XHJcblx0X2dldFBvcHVwQW5jaG9yOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLmljb24ub3B0aW9ucy5wb3B1cEFuY2hvciB8fCBbMCwgMF07XHJcblx0fVxyXG59KTtcclxuXG5cblxuLypcclxuICogTC5MYXllckdyb3VwIGlzIGEgY2xhc3MgdG8gY29tYmluZSBzZXZlcmFsIGxheWVycyBpbnRvIG9uZSBzbyB0aGF0XHJcbiAqIHlvdSBjYW4gbWFuaXB1bGF0ZSB0aGUgZ3JvdXAgKGUuZy4gYWRkL3JlbW92ZSBpdCkgYXMgb25lIGxheWVyLlxyXG4gKi9cclxuXHJcbkwuTGF5ZXJHcm91cCA9IEwuTGF5ZXIuZXh0ZW5kKHtcclxuXHJcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKGxheWVycykge1xyXG5cdFx0dGhpcy5fbGF5ZXJzID0ge307XHJcblxyXG5cdFx0dmFyIGksIGxlbjtcclxuXHJcblx0XHRpZiAobGF5ZXJzKSB7XHJcblx0XHRcdGZvciAoaSA9IDAsIGxlbiA9IGxheWVycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRcdHRoaXMuYWRkTGF5ZXIobGF5ZXJzW2ldKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGFkZExheWVyOiBmdW5jdGlvbiAobGF5ZXIpIHtcclxuXHRcdHZhciBpZCA9IHRoaXMuZ2V0TGF5ZXJJZChsYXllcik7XHJcblxyXG5cdFx0dGhpcy5fbGF5ZXJzW2lkXSA9IGxheWVyO1xyXG5cclxuXHRcdGlmICh0aGlzLl9tYXApIHtcclxuXHRcdFx0dGhpcy5fbWFwLmFkZExheWVyKGxheWVyKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRyZW1vdmVMYXllcjogZnVuY3Rpb24gKGxheWVyKSB7XHJcblx0XHR2YXIgaWQgPSBsYXllciBpbiB0aGlzLl9sYXllcnMgPyBsYXllciA6IHRoaXMuZ2V0TGF5ZXJJZChsYXllcik7XHJcblxyXG5cdFx0aWYgKHRoaXMuX21hcCAmJiB0aGlzLl9sYXllcnNbaWRdKSB7XHJcblx0XHRcdHRoaXMuX21hcC5yZW1vdmVMYXllcih0aGlzLl9sYXllcnNbaWRdKTtcclxuXHRcdH1cclxuXHJcblx0XHRkZWxldGUgdGhpcy5fbGF5ZXJzW2lkXTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRoYXNMYXllcjogZnVuY3Rpb24gKGxheWVyKSB7XHJcblx0XHRyZXR1cm4gISFsYXllciAmJiAobGF5ZXIgaW4gdGhpcy5fbGF5ZXJzIHx8IHRoaXMuZ2V0TGF5ZXJJZChsYXllcikgaW4gdGhpcy5fbGF5ZXJzKTtcclxuXHR9LFxyXG5cclxuXHRjbGVhckxheWVyczogZnVuY3Rpb24gKCkge1xyXG5cdFx0Zm9yICh2YXIgaSBpbiB0aGlzLl9sYXllcnMpIHtcclxuXHRcdFx0dGhpcy5yZW1vdmVMYXllcih0aGlzLl9sYXllcnNbaV0pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0aW52b2tlOiBmdW5jdGlvbiAobWV0aG9kTmFtZSkge1xyXG5cdFx0dmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxyXG5cdFx0ICAgIGksIGxheWVyO1xyXG5cclxuXHRcdGZvciAoaSBpbiB0aGlzLl9sYXllcnMpIHtcclxuXHRcdFx0bGF5ZXIgPSB0aGlzLl9sYXllcnNbaV07XHJcblxyXG5cdFx0XHRpZiAobGF5ZXJbbWV0aG9kTmFtZV0pIHtcclxuXHRcdFx0XHRsYXllclttZXRob2ROYW1lXS5hcHBseShsYXllciwgYXJncyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xyXG5cdFx0Zm9yICh2YXIgaSBpbiB0aGlzLl9sYXllcnMpIHtcclxuXHRcdFx0bWFwLmFkZExheWVyKHRoaXMuX2xheWVyc1tpXSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0b25SZW1vdmU6IGZ1bmN0aW9uIChtYXApIHtcclxuXHRcdGZvciAodmFyIGkgaW4gdGhpcy5fbGF5ZXJzKSB7XHJcblx0XHRcdG1hcC5yZW1vdmVMYXllcih0aGlzLl9sYXllcnNbaV0pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGVhY2hMYXllcjogZnVuY3Rpb24gKG1ldGhvZCwgY29udGV4dCkge1xyXG5cdFx0Zm9yICh2YXIgaSBpbiB0aGlzLl9sYXllcnMpIHtcclxuXHRcdFx0bWV0aG9kLmNhbGwoY29udGV4dCwgdGhpcy5fbGF5ZXJzW2ldKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdGdldExheWVyOiBmdW5jdGlvbiAoaWQpIHtcclxuXHRcdHJldHVybiB0aGlzLl9sYXllcnNbaWRdO1xyXG5cdH0sXHJcblxyXG5cdGdldExheWVyczogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGxheWVycyA9IFtdO1xyXG5cclxuXHRcdGZvciAodmFyIGkgaW4gdGhpcy5fbGF5ZXJzKSB7XHJcblx0XHRcdGxheWVycy5wdXNoKHRoaXMuX2xheWVyc1tpXSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbGF5ZXJzO1xyXG5cdH0sXHJcblxyXG5cdHNldFpJbmRleDogZnVuY3Rpb24gKHpJbmRleCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaW52b2tlKCdzZXRaSW5kZXgnLCB6SW5kZXgpO1xyXG5cdH0sXHJcblxyXG5cdGdldExheWVySWQ6IGZ1bmN0aW9uIChsYXllcikge1xyXG5cdFx0cmV0dXJuIEwuc3RhbXAobGF5ZXIpO1xyXG5cdH1cclxufSk7XHJcblxyXG5MLmxheWVyR3JvdXAgPSBmdW5jdGlvbiAobGF5ZXJzKSB7XHJcblx0cmV0dXJuIG5ldyBMLkxheWVyR3JvdXAobGF5ZXJzKTtcclxufTtcclxuXG5cblxuLypcclxuICogTC5GZWF0dXJlR3JvdXAgZXh0ZW5kcyBMLkxheWVyR3JvdXAgYnkgaW50cm9kdWNpbmcgbW91c2UgZXZlbnRzIGFuZCBhZGRpdGlvbmFsIG1ldGhvZHNcclxuICogc2hhcmVkIGJldHdlZW4gYSBncm91cCBvZiBpbnRlcmFjdGl2ZSBsYXllcnMgKGxpa2UgdmVjdG9ycyBvciBtYXJrZXJzKS5cclxuICovXHJcblxyXG5MLkZlYXR1cmVHcm91cCA9IEwuTGF5ZXJHcm91cC5leHRlbmQoe1xyXG5cclxuXHRhZGRMYXllcjogZnVuY3Rpb24gKGxheWVyKSB7XHJcblx0XHRpZiAodGhpcy5oYXNMYXllcihsYXllcikpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9XHJcblxyXG5cdFx0bGF5ZXIuYWRkRXZlbnRQYXJlbnQodGhpcyk7XHJcblxyXG5cdFx0TC5MYXllckdyb3VwLnByb3RvdHlwZS5hZGRMYXllci5jYWxsKHRoaXMsIGxheWVyKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5maXJlKCdsYXllcmFkZCcsIHtsYXllcjogbGF5ZXJ9KTtcclxuXHR9LFxyXG5cclxuXHRyZW1vdmVMYXllcjogZnVuY3Rpb24gKGxheWVyKSB7XHJcblx0XHRpZiAoIXRoaXMuaGFzTGF5ZXIobGF5ZXIpKSB7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGxheWVyIGluIHRoaXMuX2xheWVycykge1xyXG5cdFx0XHRsYXllciA9IHRoaXMuX2xheWVyc1tsYXllcl07XHJcblx0XHR9XHJcblxyXG5cdFx0bGF5ZXIucmVtb3ZlRXZlbnRQYXJlbnQodGhpcyk7XHJcblxyXG5cdFx0TC5MYXllckdyb3VwLnByb3RvdHlwZS5yZW1vdmVMYXllci5jYWxsKHRoaXMsIGxheWVyKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5maXJlKCdsYXllcnJlbW92ZScsIHtsYXllcjogbGF5ZXJ9KTtcclxuXHR9LFxyXG5cclxuXHRzZXRTdHlsZTogZnVuY3Rpb24gKHN0eWxlKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5pbnZva2UoJ3NldFN0eWxlJywgc3R5bGUpO1xyXG5cdH0sXHJcblxyXG5cdGJyaW5nVG9Gcm9udDogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaW52b2tlKCdicmluZ1RvRnJvbnQnKTtcclxuXHR9LFxyXG5cclxuXHRicmluZ1RvQmFjazogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaW52b2tlKCdicmluZ1RvQmFjaycpO1xyXG5cdH0sXHJcblxyXG5cdGdldEJvdW5kczogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGJvdW5kcyA9IG5ldyBMLkxhdExuZ0JvdW5kcygpO1xyXG5cclxuXHRcdGZvciAodmFyIGlkIGluIHRoaXMuX2xheWVycykge1xyXG5cdFx0XHR2YXIgbGF5ZXIgPSB0aGlzLl9sYXllcnNbaWRdO1xyXG5cdFx0XHRib3VuZHMuZXh0ZW5kKGxheWVyLmdldEJvdW5kcyA/IGxheWVyLmdldEJvdW5kcygpIDogbGF5ZXIuZ2V0TGF0TG5nKCkpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGJvdW5kcztcclxuXHR9XHJcbn0pO1xyXG5cclxuTC5mZWF0dXJlR3JvdXAgPSBmdW5jdGlvbiAobGF5ZXJzKSB7XHJcblx0cmV0dXJuIG5ldyBMLkZlYXR1cmVHcm91cChsYXllcnMpO1xyXG59O1xyXG5cblxuXG4vKlxuICogTC5SZW5kZXJlciBpcyBhIGJhc2UgY2xhc3MgZm9yIHJlbmRlcmVyIGltcGxlbWVudGF0aW9ucyAoU1ZHLCBDYW52YXMpO1xuICogaGFuZGxlcyByZW5kZXJlciBjb250YWluZXIsIGJvdW5kcyBhbmQgem9vbSBhbmltYXRpb24uXG4gKi9cblxuTC5SZW5kZXJlciA9IEwuTGF5ZXIuZXh0ZW5kKHtcblxuXHRvcHRpb25zOiB7XG5cdFx0Ly8gaG93IG11Y2ggdG8gZXh0ZW5kIHRoZSBjbGlwIGFyZWEgYXJvdW5kIHRoZSBtYXAgdmlldyAocmVsYXRpdmUgdG8gaXRzIHNpemUpXG5cdFx0Ly8gZS5nLiAwLjEgd291bGQgYmUgMTAlIG9mIG1hcCB2aWV3IGluIGVhY2ggZGlyZWN0aW9uOyBkZWZhdWx0cyB0byBjbGlwIHdpdGggdGhlIG1hcCB2aWV3XG5cdFx0cGFkZGluZzogMC4xXG5cdH0sXG5cblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0XHRMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG5cdFx0TC5zdGFtcCh0aGlzKTtcblx0fSxcblxuXHRvbkFkZDogZnVuY3Rpb24gKCkge1xuXHRcdGlmICghdGhpcy5fY29udGFpbmVyKSB7XG5cdFx0XHR0aGlzLl9pbml0Q29udGFpbmVyKCk7IC8vIGRlZmluZWQgYnkgcmVuZGVyZXIgaW1wbGVtZW50YXRpb25zXG5cblx0XHRcdGlmICh0aGlzLl96b29tQW5pbWF0ZWQpIHtcblx0XHRcdFx0TC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX2NvbnRhaW5lciwgJ2xlYWZsZXQtem9vbS1hbmltYXRlZCcpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuZ2V0UGFuZSgpLmFwcGVuZENoaWxkKHRoaXMuX2NvbnRhaW5lcik7XG5cdFx0dGhpcy5fdXBkYXRlKCk7XG5cdH0sXG5cblx0b25SZW1vdmU6IGZ1bmN0aW9uICgpIHtcblx0XHRMLkRvbVV0aWwucmVtb3ZlKHRoaXMuX2NvbnRhaW5lcik7XG5cdH0sXG5cblx0Z2V0RXZlbnRzOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGV2ZW50cyA9IHtcblx0XHRcdHZpZXdyZXNldDogdGhpcy5fcmVzZXQsXG5cdFx0XHR6b29tc3RhcnQ6IHRoaXMuX29uWm9vbVN0YXJ0LFxuXHRcdFx0em9vbTogdGhpcy5fb25ab29tLFxuXHRcdFx0bW92ZWVuZDogdGhpcy5fdXBkYXRlXG5cdFx0fTtcblx0XHRpZiAodGhpcy5fem9vbUFuaW1hdGVkKSB7XG5cdFx0XHRldmVudHMuem9vbWFuaW0gPSB0aGlzLl9vbkFuaW1ab29tO1xuXHRcdH1cblx0XHRyZXR1cm4gZXZlbnRzO1xuXHR9LFxuXG5cdF9vbkFuaW1ab29tOiBmdW5jdGlvbiAoZXYpIHtcblx0XHR0aGlzLl91cGRhdGVUcmFuc2Zvcm0oZXYuY2VudGVyLCBldi56b29tKTtcblx0fSxcblxuXHRfb25ab29tOiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fdXBkYXRlVHJhbnNmb3JtKHRoaXMuX21hcC5nZXRDZW50ZXIoKSwgdGhpcy5fbWFwLmdldFpvb20oKSk7XG5cdH0sXG5cblx0X29uWm9vbVN0YXJ0OiBmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gRHJhZy10aGVuLXBpbmNoIGludGVyYWN0aW9ucyBtaWdodCBtZXNzIHVwIHRoZSBjZW50ZXIgYW5kIHpvb20uXG5cdFx0Ly8gSW4gdGhpcyBjYXNlLCB0aGUgZWFzaWVzdCB3YXkgdG8gcHJldmVudCB0aGlzIGlzIHJlLWRvIHRoZSByZW5kZXJlclxuXHRcdC8vICAgYm91bmRzIGFuZCBwYWRkaW5nIHdoZW4gdGhlIHpvb21pbmcgc3RhcnRzLlxuXHRcdHRoaXMuX3VwZGF0ZSgpO1xuXHR9LFxuXG5cdF91cGRhdGVUcmFuc2Zvcm06IGZ1bmN0aW9uIChjZW50ZXIsIHpvb20pIHtcblx0XHR2YXIgc2NhbGUgPSB0aGlzLl9tYXAuZ2V0Wm9vbVNjYWxlKHpvb20sIHRoaXMuX3pvb20pLFxuXHRcdCAgICBwb3NpdGlvbiA9IEwuRG9tVXRpbC5nZXRQb3NpdGlvbih0aGlzLl9jb250YWluZXIpLFxuXHRcdCAgICB2aWV3SGFsZiA9IHRoaXMuX21hcC5nZXRTaXplKCkubXVsdGlwbHlCeSgwLjUgKyB0aGlzLm9wdGlvbnMucGFkZGluZyksXG5cdFx0ICAgIGN1cnJlbnRDZW50ZXJQb2ludCA9IHRoaXMuX21hcC5wcm9qZWN0KHRoaXMuX2NlbnRlciwgem9vbSksXG5cdFx0ICAgIGRlc3RDZW50ZXJQb2ludCA9IHRoaXMuX21hcC5wcm9qZWN0KGNlbnRlciwgem9vbSksXG5cdFx0ICAgIGNlbnRlck9mZnNldCA9IGRlc3RDZW50ZXJQb2ludC5zdWJ0cmFjdChjdXJyZW50Q2VudGVyUG9pbnQpLFxuXG5cdFx0ICAgIHRvcExlZnRPZmZzZXQgPSB2aWV3SGFsZi5tdWx0aXBseUJ5KC1zY2FsZSkuYWRkKHBvc2l0aW9uKS5hZGQodmlld0hhbGYpLnN1YnRyYWN0KGNlbnRlck9mZnNldCk7XG5cblx0XHRMLkRvbVV0aWwuc2V0VHJhbnNmb3JtKHRoaXMuX2NvbnRhaW5lciwgdG9wTGVmdE9mZnNldCwgc2NhbGUpO1xuXHR9LFxuXG5cdF9yZXNldDogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuX3VwZGF0ZSgpO1xuXHRcdHRoaXMuX3VwZGF0ZVRyYW5zZm9ybSh0aGlzLl9jZW50ZXIsIHRoaXMuX3pvb20pO1xuXHR9LFxuXG5cdF91cGRhdGU6IGZ1bmN0aW9uICgpIHtcblx0XHQvLyB1cGRhdGUgcGl4ZWwgYm91bmRzIG9mIHJlbmRlcmVyIGNvbnRhaW5lciAoZm9yIHBvc2l0aW9uaW5nL3NpemluZy9jbGlwcGluZyBsYXRlcilcblx0XHR2YXIgcCA9IHRoaXMub3B0aW9ucy5wYWRkaW5nLFxuXHRcdCAgICBzaXplID0gdGhpcy5fbWFwLmdldFNpemUoKSxcblx0XHQgICAgbWluID0gdGhpcy5fbWFwLmNvbnRhaW5lclBvaW50VG9MYXllclBvaW50KHNpemUubXVsdGlwbHlCeSgtcCkpLnJvdW5kKCk7XG5cblx0XHR0aGlzLl9ib3VuZHMgPSBuZXcgTC5Cb3VuZHMobWluLCBtaW4uYWRkKHNpemUubXVsdGlwbHlCeSgxICsgcCAqIDIpKS5yb3VuZCgpKTtcblxuXHRcdHRoaXMuX2NlbnRlciA9IHRoaXMuX21hcC5nZXRDZW50ZXIoKTtcblx0XHR0aGlzLl96b29tID0gdGhpcy5fbWFwLmdldFpvb20oKTtcblx0fVxufSk7XG5cblxuTC5NYXAuaW5jbHVkZSh7XG5cdC8vIHVzZWQgYnkgZWFjaCB2ZWN0b3IgbGF5ZXIgdG8gZGVjaWRlIHdoaWNoIHJlbmRlcmVyIHRvIHVzZVxuXHRnZXRSZW5kZXJlcjogZnVuY3Rpb24gKGxheWVyKSB7XG5cdFx0dmFyIHJlbmRlcmVyID0gbGF5ZXIub3B0aW9ucy5yZW5kZXJlciB8fCB0aGlzLl9nZXRQYW5lUmVuZGVyZXIobGF5ZXIub3B0aW9ucy5wYW5lKSB8fCB0aGlzLm9wdGlvbnMucmVuZGVyZXIgfHwgdGhpcy5fcmVuZGVyZXI7XG5cblx0XHRpZiAoIXJlbmRlcmVyKSB7XG5cdFx0XHRyZW5kZXJlciA9IHRoaXMuX3JlbmRlcmVyID0gKHRoaXMub3B0aW9ucy5wcmVmZXJDYW52YXMgJiYgTC5jYW52YXMoKSkgfHwgTC5zdmcoKTtcblx0XHR9XG5cblx0XHRpZiAoIXRoaXMuaGFzTGF5ZXIocmVuZGVyZXIpKSB7XG5cdFx0XHR0aGlzLmFkZExheWVyKHJlbmRlcmVyKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlbmRlcmVyO1xuXHR9LFxuXG5cdF9nZXRQYW5lUmVuZGVyZXI6IGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0aWYgKG5hbWUgPT09ICdvdmVybGF5UGFuZScgfHwgbmFtZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0dmFyIHJlbmRlcmVyID0gdGhpcy5fcGFuZVJlbmRlcmVyc1tuYW1lXTtcblx0XHRpZiAocmVuZGVyZXIgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmVuZGVyZXIgPSAoTC5TVkcgJiYgTC5zdmcoe3BhbmU6IG5hbWV9KSkgfHwgKEwuQ2FudmFzICYmIEwuY2FudmFzKHtwYW5lOiBuYW1lfSkpO1xuXHRcdFx0dGhpcy5fcGFuZVJlbmRlcmVyc1tuYW1lXSA9IHJlbmRlcmVyO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVuZGVyZXI7XG5cdH1cbn0pO1xuXG5cblxuLypcbiAqIEwuUGF0aCBpcyB0aGUgYmFzZSBjbGFzcyBmb3IgYWxsIExlYWZsZXQgdmVjdG9yIGxheWVycyBsaWtlIHBvbHlnb25zIGFuZCBjaXJjbGVzLlxuICovXG5cbkwuUGF0aCA9IEwuTGF5ZXIuZXh0ZW5kKHtcblxuXHRvcHRpb25zOiB7XG5cdFx0c3Ryb2tlOiB0cnVlLFxuXHRcdGNvbG9yOiAnIzMzODhmZicsXG5cdFx0d2VpZ2h0OiAzLFxuXHRcdG9wYWNpdHk6IDEsXG5cdFx0bGluZUNhcDogJ3JvdW5kJyxcblx0XHRsaW5lSm9pbjogJ3JvdW5kJyxcblx0XHQvLyBkYXNoQXJyYXk6IG51bGxcblx0XHQvLyBkYXNoT2Zmc2V0OiBudWxsXG5cblx0XHQvLyBmaWxsOiBmYWxzZVxuXHRcdC8vIGZpbGxDb2xvcjogc2FtZSBhcyBjb2xvciBieSBkZWZhdWx0XG5cdFx0ZmlsbE9wYWNpdHk6IDAuMixcblx0XHRmaWxsUnVsZTogJ2V2ZW5vZGQnLFxuXG5cdFx0Ly8gY2xhc3NOYW1lOiAnJ1xuXHRcdGludGVyYWN0aXZlOiB0cnVlXG5cdH0sXG5cblx0YmVmb3JlQWRkOiBmdW5jdGlvbiAobWFwKSB7XG5cdFx0Ly8gUmVuZGVyZXIgaXMgc2V0IGhlcmUgYmVjYXVzZSB3ZSBuZWVkIHRvIGNhbGwgcmVuZGVyZXIuZ2V0RXZlbnRzXG5cdFx0Ly8gYmVmb3JlIHRoaXMuZ2V0RXZlbnRzLlxuXHRcdHRoaXMuX3JlbmRlcmVyID0gbWFwLmdldFJlbmRlcmVyKHRoaXMpO1xuXHR9LFxuXG5cdG9uQWRkOiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fcmVuZGVyZXIuX2luaXRQYXRoKHRoaXMpO1xuXHRcdHRoaXMuX3Jlc2V0KCk7XG5cdFx0dGhpcy5fcmVuZGVyZXIuX2FkZFBhdGgodGhpcyk7XG5cdH0sXG5cblx0b25SZW1vdmU6IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLl9yZW5kZXJlci5fcmVtb3ZlUGF0aCh0aGlzKTtcblx0fSxcblxuXHRnZXRFdmVudHM6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0em9vbWVuZDogdGhpcy5fcHJvamVjdCxcblx0XHRcdG1vdmVlbmQ6IHRoaXMuX3VwZGF0ZSxcblx0XHRcdHZpZXdyZXNldDogdGhpcy5fcmVzZXRcblx0XHR9O1xuXHR9LFxuXG5cdHJlZHJhdzogZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0aGlzLl9tYXApIHtcblx0XHRcdHRoaXMuX3JlbmRlcmVyLl91cGRhdGVQYXRoKHRoaXMpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRzZXRTdHlsZTogZnVuY3Rpb24gKHN0eWxlKSB7XG5cdFx0TC5zZXRPcHRpb25zKHRoaXMsIHN0eWxlKTtcblx0XHRpZiAodGhpcy5fcmVuZGVyZXIpIHtcblx0XHRcdHRoaXMuX3JlbmRlcmVyLl91cGRhdGVTdHlsZSh0aGlzKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0YnJpbmdUb0Zyb250OiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuX3JlbmRlcmVyKSB7XG5cdFx0XHR0aGlzLl9yZW5kZXJlci5fYnJpbmdUb0Zyb250KHRoaXMpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRicmluZ1RvQmFjazogZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0aGlzLl9yZW5kZXJlcikge1xuXHRcdFx0dGhpcy5fcmVuZGVyZXIuX2JyaW5nVG9CYWNrKHRoaXMpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRnZXRFbGVtZW50OiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3BhdGg7XG5cdH0sXG5cblx0X3Jlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gZGVmaW5lZCBpbiBjaGlsZHJlbiBjbGFzc2VzXG5cdFx0dGhpcy5fcHJvamVjdCgpO1xuXHRcdHRoaXMuX3VwZGF0ZSgpO1xuXHR9LFxuXG5cdF9jbGlja1RvbGVyYW5jZTogZnVuY3Rpb24gKCkge1xuXHRcdC8vIHVzZWQgd2hlbiBkb2luZyBoaXQgZGV0ZWN0aW9uIGZvciBDYW52YXMgbGF5ZXJzXG5cdFx0cmV0dXJuICh0aGlzLm9wdGlvbnMuc3Ryb2tlID8gdGhpcy5vcHRpb25zLndlaWdodCAvIDIgOiAwKSArIChMLkJyb3dzZXIudG91Y2ggPyAxMCA6IDApO1xuXHR9XG59KTtcblxuXG5cbi8qXHJcbiAqIEwuTGluZVV0aWwgY29udGFpbnMgZGlmZmVyZW50IHV0aWxpdHkgZnVuY3Rpb25zIGZvciBsaW5lIHNlZ21lbnRzXHJcbiAqIGFuZCBwb2x5bGluZXMgKGNsaXBwaW5nLCBzaW1wbGlmaWNhdGlvbiwgZGlzdGFuY2VzLCBldGMuKVxyXG4gKi9cclxuXHJcbkwuTGluZVV0aWwgPSB7XHJcblxyXG5cdC8vIFNpbXBsaWZ5IHBvbHlsaW5lIHdpdGggdmVydGV4IHJlZHVjdGlvbiBhbmQgRG91Z2xhcy1QZXVja2VyIHNpbXBsaWZpY2F0aW9uLlxyXG5cdC8vIEltcHJvdmVzIHJlbmRlcmluZyBwZXJmb3JtYW5jZSBkcmFtYXRpY2FsbHkgYnkgbGVzc2VuaW5nIHRoZSBudW1iZXIgb2YgcG9pbnRzIHRvIGRyYXcuXHJcblxyXG5cdHNpbXBsaWZ5OiBmdW5jdGlvbiAocG9pbnRzLCB0b2xlcmFuY2UpIHtcclxuXHRcdGlmICghdG9sZXJhbmNlIHx8ICFwb2ludHMubGVuZ3RoKSB7XHJcblx0XHRcdHJldHVybiBwb2ludHMuc2xpY2UoKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgc3FUb2xlcmFuY2UgPSB0b2xlcmFuY2UgKiB0b2xlcmFuY2U7XHJcblxyXG5cdFx0Ly8gc3RhZ2UgMTogdmVydGV4IHJlZHVjdGlvblxyXG5cdFx0cG9pbnRzID0gdGhpcy5fcmVkdWNlUG9pbnRzKHBvaW50cywgc3FUb2xlcmFuY2UpO1xyXG5cclxuXHRcdC8vIHN0YWdlIDI6IERvdWdsYXMtUGV1Y2tlciBzaW1wbGlmaWNhdGlvblxyXG5cdFx0cG9pbnRzID0gdGhpcy5fc2ltcGxpZnlEUChwb2ludHMsIHNxVG9sZXJhbmNlKTtcclxuXHJcblx0XHRyZXR1cm4gcG9pbnRzO1xyXG5cdH0sXHJcblxyXG5cdC8vIGRpc3RhbmNlIGZyb20gYSBwb2ludCB0byBhIHNlZ21lbnQgYmV0d2VlbiB0d28gcG9pbnRzXHJcblx0cG9pbnRUb1NlZ21lbnREaXN0YW5jZTogIGZ1bmN0aW9uIChwLCBwMSwgcDIpIHtcclxuXHRcdHJldHVybiBNYXRoLnNxcnQodGhpcy5fc3FDbG9zZXN0UG9pbnRPblNlZ21lbnQocCwgcDEsIHAyLCB0cnVlKSk7XHJcblx0fSxcclxuXHJcblx0Y2xvc2VzdFBvaW50T25TZWdtZW50OiBmdW5jdGlvbiAocCwgcDEsIHAyKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fc3FDbG9zZXN0UG9pbnRPblNlZ21lbnQocCwgcDEsIHAyKTtcclxuXHR9LFxyXG5cclxuXHQvLyBEb3VnbGFzLVBldWNrZXIgc2ltcGxpZmljYXRpb24sIHNlZSBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0RvdWdsYXMtUGV1Y2tlcl9hbGdvcml0aG1cclxuXHRfc2ltcGxpZnlEUDogZnVuY3Rpb24gKHBvaW50cywgc3FUb2xlcmFuY2UpIHtcclxuXHJcblx0XHR2YXIgbGVuID0gcG9pbnRzLmxlbmd0aCxcclxuXHRcdCAgICBBcnJheUNvbnN0cnVjdG9yID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09IHVuZGVmaW5lZCArICcnID8gVWludDhBcnJheSA6IEFycmF5LFxyXG5cdFx0ICAgIG1hcmtlcnMgPSBuZXcgQXJyYXlDb25zdHJ1Y3RvcihsZW4pO1xyXG5cclxuXHRcdG1hcmtlcnNbMF0gPSBtYXJrZXJzW2xlbiAtIDFdID0gMTtcclxuXHJcblx0XHR0aGlzLl9zaW1wbGlmeURQU3RlcChwb2ludHMsIG1hcmtlcnMsIHNxVG9sZXJhbmNlLCAwLCBsZW4gLSAxKTtcclxuXHJcblx0XHR2YXIgaSxcclxuXHRcdCAgICBuZXdQb2ludHMgPSBbXTtcclxuXHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0aWYgKG1hcmtlcnNbaV0pIHtcclxuXHRcdFx0XHRuZXdQb2ludHMucHVzaChwb2ludHNbaV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG5ld1BvaW50cztcclxuXHR9LFxyXG5cclxuXHRfc2ltcGxpZnlEUFN0ZXA6IGZ1bmN0aW9uIChwb2ludHMsIG1hcmtlcnMsIHNxVG9sZXJhbmNlLCBmaXJzdCwgbGFzdCkge1xyXG5cclxuXHRcdHZhciBtYXhTcURpc3QgPSAwLFxyXG5cdFx0ICAgIGluZGV4LCBpLCBzcURpc3Q7XHJcblxyXG5cdFx0Zm9yIChpID0gZmlyc3QgKyAxOyBpIDw9IGxhc3QgLSAxOyBpKyspIHtcclxuXHRcdFx0c3FEaXN0ID0gdGhpcy5fc3FDbG9zZXN0UG9pbnRPblNlZ21lbnQocG9pbnRzW2ldLCBwb2ludHNbZmlyc3RdLCBwb2ludHNbbGFzdF0sIHRydWUpO1xyXG5cclxuXHRcdFx0aWYgKHNxRGlzdCA+IG1heFNxRGlzdCkge1xyXG5cdFx0XHRcdGluZGV4ID0gaTtcclxuXHRcdFx0XHRtYXhTcURpc3QgPSBzcURpc3Q7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAobWF4U3FEaXN0ID4gc3FUb2xlcmFuY2UpIHtcclxuXHRcdFx0bWFya2Vyc1tpbmRleF0gPSAxO1xyXG5cclxuXHRcdFx0dGhpcy5fc2ltcGxpZnlEUFN0ZXAocG9pbnRzLCBtYXJrZXJzLCBzcVRvbGVyYW5jZSwgZmlyc3QsIGluZGV4KTtcclxuXHRcdFx0dGhpcy5fc2ltcGxpZnlEUFN0ZXAocG9pbnRzLCBtYXJrZXJzLCBzcVRvbGVyYW5jZSwgaW5kZXgsIGxhc3QpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8vIHJlZHVjZSBwb2ludHMgdGhhdCBhcmUgdG9vIGNsb3NlIHRvIGVhY2ggb3RoZXIgdG8gYSBzaW5nbGUgcG9pbnRcclxuXHRfcmVkdWNlUG9pbnRzOiBmdW5jdGlvbiAocG9pbnRzLCBzcVRvbGVyYW5jZSkge1xyXG5cdFx0dmFyIHJlZHVjZWRQb2ludHMgPSBbcG9pbnRzWzBdXTtcclxuXHJcblx0XHRmb3IgKHZhciBpID0gMSwgcHJldiA9IDAsIGxlbiA9IHBvaW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRpZiAodGhpcy5fc3FEaXN0KHBvaW50c1tpXSwgcG9pbnRzW3ByZXZdKSA+IHNxVG9sZXJhbmNlKSB7XHJcblx0XHRcdFx0cmVkdWNlZFBvaW50cy5wdXNoKHBvaW50c1tpXSk7XHJcblx0XHRcdFx0cHJldiA9IGk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmIChwcmV2IDwgbGVuIC0gMSkge1xyXG5cdFx0XHRyZWR1Y2VkUG9pbnRzLnB1c2gocG9pbnRzW2xlbiAtIDFdKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiByZWR1Y2VkUG9pbnRzO1xyXG5cdH0sXHJcblxyXG5cdC8vIENvaGVuLVN1dGhlcmxhbmQgbGluZSBjbGlwcGluZyBhbGdvcml0aG0uXHJcblx0Ly8gVXNlZCB0byBhdm9pZCByZW5kZXJpbmcgcGFydHMgb2YgYSBwb2x5bGluZSB0aGF0IGFyZSBub3QgY3VycmVudGx5IHZpc2libGUuXHJcblxyXG5cdGNsaXBTZWdtZW50OiBmdW5jdGlvbiAoYSwgYiwgYm91bmRzLCB1c2VMYXN0Q29kZSwgcm91bmQpIHtcclxuXHRcdHZhciBjb2RlQSA9IHVzZUxhc3RDb2RlID8gdGhpcy5fbGFzdENvZGUgOiB0aGlzLl9nZXRCaXRDb2RlKGEsIGJvdW5kcyksXHJcblx0XHQgICAgY29kZUIgPSB0aGlzLl9nZXRCaXRDb2RlKGIsIGJvdW5kcyksXHJcblxyXG5cdFx0ICAgIGNvZGVPdXQsIHAsIG5ld0NvZGU7XHJcblxyXG5cdFx0Ly8gc2F2ZSAybmQgY29kZSB0byBhdm9pZCBjYWxjdWxhdGluZyBpdCBvbiB0aGUgbmV4dCBzZWdtZW50XHJcblx0XHR0aGlzLl9sYXN0Q29kZSA9IGNvZGVCO1xyXG5cclxuXHRcdHdoaWxlICh0cnVlKSB7XHJcblx0XHRcdC8vIGlmIGEsYiBpcyBpbnNpZGUgdGhlIGNsaXAgd2luZG93ICh0cml2aWFsIGFjY2VwdClcclxuXHRcdFx0aWYgKCEoY29kZUEgfCBjb2RlQikpIHsgcmV0dXJuIFthLCBiXTsgfVxyXG5cclxuXHRcdFx0Ly8gaWYgYSxiIGlzIG91dHNpZGUgdGhlIGNsaXAgd2luZG93ICh0cml2aWFsIHJlamVjdClcclxuXHRcdFx0aWYgKGNvZGVBICYgY29kZUIpIHsgcmV0dXJuIGZhbHNlOyB9XHJcblxyXG5cdFx0XHQvLyBvdGhlciBjYXNlc1xyXG5cdFx0XHRjb2RlT3V0ID0gY29kZUEgfHwgY29kZUI7XHJcblx0XHRcdHAgPSB0aGlzLl9nZXRFZGdlSW50ZXJzZWN0aW9uKGEsIGIsIGNvZGVPdXQsIGJvdW5kcywgcm91bmQpO1xyXG5cdFx0XHRuZXdDb2RlID0gdGhpcy5fZ2V0Qml0Q29kZShwLCBib3VuZHMpO1xyXG5cclxuXHRcdFx0aWYgKGNvZGVPdXQgPT09IGNvZGVBKSB7XHJcblx0XHRcdFx0YSA9IHA7XHJcblx0XHRcdFx0Y29kZUEgPSBuZXdDb2RlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGIgPSBwO1xyXG5cdFx0XHRcdGNvZGVCID0gbmV3Q29kZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF9nZXRFZGdlSW50ZXJzZWN0aW9uOiBmdW5jdGlvbiAoYSwgYiwgY29kZSwgYm91bmRzLCByb3VuZCkge1xyXG5cdFx0dmFyIGR4ID0gYi54IC0gYS54LFxyXG5cdFx0ICAgIGR5ID0gYi55IC0gYS55LFxyXG5cdFx0ICAgIG1pbiA9IGJvdW5kcy5taW4sXHJcblx0XHQgICAgbWF4ID0gYm91bmRzLm1heCxcclxuXHRcdCAgICB4LCB5O1xyXG5cclxuXHRcdGlmIChjb2RlICYgOCkgeyAvLyB0b3BcclxuXHRcdFx0eCA9IGEueCArIGR4ICogKG1heC55IC0gYS55KSAvIGR5O1xyXG5cdFx0XHR5ID0gbWF4Lnk7XHJcblxyXG5cdFx0fSBlbHNlIGlmIChjb2RlICYgNCkgeyAvLyBib3R0b21cclxuXHRcdFx0eCA9IGEueCArIGR4ICogKG1pbi55IC0gYS55KSAvIGR5O1xyXG5cdFx0XHR5ID0gbWluLnk7XHJcblxyXG5cdFx0fSBlbHNlIGlmIChjb2RlICYgMikgeyAvLyByaWdodFxyXG5cdFx0XHR4ID0gbWF4Lng7XHJcblx0XHRcdHkgPSBhLnkgKyBkeSAqIChtYXgueCAtIGEueCkgLyBkeDtcclxuXHJcblx0XHR9IGVsc2UgaWYgKGNvZGUgJiAxKSB7IC8vIGxlZnRcclxuXHRcdFx0eCA9IG1pbi54O1xyXG5cdFx0XHR5ID0gYS55ICsgZHkgKiAobWluLnggLSBhLngpIC8gZHg7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBMLlBvaW50KHgsIHksIHJvdW5kKTtcclxuXHR9LFxyXG5cclxuXHRfZ2V0Qml0Q29kZTogZnVuY3Rpb24gKHAsIGJvdW5kcykge1xyXG5cdFx0dmFyIGNvZGUgPSAwO1xyXG5cclxuXHRcdGlmIChwLnggPCBib3VuZHMubWluLngpIHsgLy8gbGVmdFxyXG5cdFx0XHRjb2RlIHw9IDE7XHJcblx0XHR9IGVsc2UgaWYgKHAueCA+IGJvdW5kcy5tYXgueCkgeyAvLyByaWdodFxyXG5cdFx0XHRjb2RlIHw9IDI7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHAueSA8IGJvdW5kcy5taW4ueSkgeyAvLyBib3R0b21cclxuXHRcdFx0Y29kZSB8PSA0O1xyXG5cdFx0fSBlbHNlIGlmIChwLnkgPiBib3VuZHMubWF4LnkpIHsgLy8gdG9wXHJcblx0XHRcdGNvZGUgfD0gODtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gY29kZTtcclxuXHR9LFxyXG5cclxuXHQvLyBzcXVhcmUgZGlzdGFuY2UgKHRvIGF2b2lkIHVubmVjZXNzYXJ5IE1hdGguc3FydCBjYWxscylcclxuXHRfc3FEaXN0OiBmdW5jdGlvbiAocDEsIHAyKSB7XHJcblx0XHR2YXIgZHggPSBwMi54IC0gcDEueCxcclxuXHRcdCAgICBkeSA9IHAyLnkgLSBwMS55O1xyXG5cdFx0cmV0dXJuIGR4ICogZHggKyBkeSAqIGR5O1xyXG5cdH0sXHJcblxyXG5cdC8vIHJldHVybiBjbG9zZXN0IHBvaW50IG9uIHNlZ21lbnQgb3IgZGlzdGFuY2UgdG8gdGhhdCBwb2ludFxyXG5cdF9zcUNsb3Nlc3RQb2ludE9uU2VnbWVudDogZnVuY3Rpb24gKHAsIHAxLCBwMiwgc3FEaXN0KSB7XHJcblx0XHR2YXIgeCA9IHAxLngsXHJcblx0XHQgICAgeSA9IHAxLnksXHJcblx0XHQgICAgZHggPSBwMi54IC0geCxcclxuXHRcdCAgICBkeSA9IHAyLnkgLSB5LFxyXG5cdFx0ICAgIGRvdCA9IGR4ICogZHggKyBkeSAqIGR5LFxyXG5cdFx0ICAgIHQ7XHJcblxyXG5cdFx0aWYgKGRvdCA+IDApIHtcclxuXHRcdFx0dCA9ICgocC54IC0geCkgKiBkeCArIChwLnkgLSB5KSAqIGR5KSAvIGRvdDtcclxuXHJcblx0XHRcdGlmICh0ID4gMSkge1xyXG5cdFx0XHRcdHggPSBwMi54O1xyXG5cdFx0XHRcdHkgPSBwMi55O1xyXG5cdFx0XHR9IGVsc2UgaWYgKHQgPiAwKSB7XHJcblx0XHRcdFx0eCArPSBkeCAqIHQ7XHJcblx0XHRcdFx0eSArPSBkeSAqIHQ7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRkeCA9IHAueCAtIHg7XHJcblx0XHRkeSA9IHAueSAtIHk7XHJcblxyXG5cdFx0cmV0dXJuIHNxRGlzdCA/IGR4ICogZHggKyBkeSAqIGR5IDogbmV3IEwuUG9pbnQoeCwgeSk7XHJcblx0fVxyXG59O1xyXG5cblxuXG4vKlxuICogTC5Qb2x5bGluZSBpbXBsZW1lbnRzIHBvbHlsaW5lIHZlY3RvciBsYXllciAoYSBzZXQgb2YgcG9pbnRzIGNvbm5lY3RlZCB3aXRoIGxpbmVzKVxuICovXG5cbkwuUG9seWxpbmUgPSBMLlBhdGguZXh0ZW5kKHtcblxuXHRvcHRpb25zOiB7XG5cdFx0Ly8gaG93IG11Y2ggdG8gc2ltcGxpZnkgdGhlIHBvbHlsaW5lIG9uIGVhY2ggem9vbSBsZXZlbFxuXHRcdC8vIG1vcmUgPSBiZXR0ZXIgcGVyZm9ybWFuY2UgYW5kIHNtb290aGVyIGxvb2ssIGxlc3MgPSBtb3JlIGFjY3VyYXRlXG5cdFx0c21vb3RoRmFjdG9yOiAxLjBcblx0XHQvLyBub0NsaXA6IGZhbHNlXG5cdH0sXG5cblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKGxhdGxuZ3MsIG9wdGlvbnMpIHtcblx0XHRMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG5cdFx0dGhpcy5fc2V0TGF0TG5ncyhsYXRsbmdzKTtcblx0fSxcblxuXHRnZXRMYXRMbmdzOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2xhdGxuZ3M7XG5cdH0sXG5cblx0c2V0TGF0TG5nczogZnVuY3Rpb24gKGxhdGxuZ3MpIHtcblx0XHR0aGlzLl9zZXRMYXRMbmdzKGxhdGxuZ3MpO1xuXHRcdHJldHVybiB0aGlzLnJlZHJhdygpO1xuXHR9LFxuXG5cdGlzRW1wdHk6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gIXRoaXMuX2xhdGxuZ3MubGVuZ3RoO1xuXHR9LFxuXG5cdGNsb3Nlc3RMYXllclBvaW50OiBmdW5jdGlvbiAocCkge1xuXHRcdHZhciBtaW5EaXN0YW5jZSA9IEluZmluaXR5LFxuXHRcdCAgICBtaW5Qb2ludCA9IG51bGwsXG5cdFx0ICAgIGNsb3Nlc3QgPSBMLkxpbmVVdGlsLl9zcUNsb3Nlc3RQb2ludE9uU2VnbWVudCxcblx0XHQgICAgcDEsIHAyO1xuXG5cdFx0Zm9yICh2YXIgaiA9IDAsIGpMZW4gPSB0aGlzLl9wYXJ0cy5sZW5ndGg7IGogPCBqTGVuOyBqKyspIHtcblx0XHRcdHZhciBwb2ludHMgPSB0aGlzLl9wYXJ0c1tqXTtcblxuXHRcdFx0Zm9yICh2YXIgaSA9IDEsIGxlbiA9IHBvaW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0XHRwMSA9IHBvaW50c1tpIC0gMV07XG5cdFx0XHRcdHAyID0gcG9pbnRzW2ldO1xuXG5cdFx0XHRcdHZhciBzcURpc3QgPSBjbG9zZXN0KHAsIHAxLCBwMiwgdHJ1ZSk7XG5cblx0XHRcdFx0aWYgKHNxRGlzdCA8IG1pbkRpc3RhbmNlKSB7XG5cdFx0XHRcdFx0bWluRGlzdGFuY2UgPSBzcURpc3Q7XG5cdFx0XHRcdFx0bWluUG9pbnQgPSBjbG9zZXN0KHAsIHAxLCBwMik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKG1pblBvaW50KSB7XG5cdFx0XHRtaW5Qb2ludC5kaXN0YW5jZSA9IE1hdGguc3FydChtaW5EaXN0YW5jZSk7XG5cdFx0fVxuXHRcdHJldHVybiBtaW5Qb2ludDtcblx0fSxcblxuXHRnZXRDZW50ZXI6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgaSwgaGFsZkRpc3QsIHNlZ0Rpc3QsIGRpc3QsIHAxLCBwMiwgcmF0aW8sXG5cdFx0ICAgIHBvaW50cyA9IHRoaXMuX3JpbmdzWzBdLFxuXHRcdCAgICBsZW4gPSBwb2ludHMubGVuZ3RoO1xuXG5cdFx0aWYgKCFsZW4pIHsgcmV0dXJuIG51bGw7IH1cblxuXHRcdC8vIHBvbHlsaW5lIGNlbnRyb2lkIGFsZ29yaXRobTsgb25seSB1c2VzIHRoZSBmaXJzdCByaW5nIGlmIHRoZXJlIGFyZSBtdWx0aXBsZVxuXG5cdFx0Zm9yIChpID0gMCwgaGFsZkRpc3QgPSAwOyBpIDwgbGVuIC0gMTsgaSsrKSB7XG5cdFx0XHRoYWxmRGlzdCArPSBwb2ludHNbaV0uZGlzdGFuY2VUbyhwb2ludHNbaSArIDFdKSAvIDI7XG5cdFx0fVxuXG5cdFx0Ly8gVGhlIGxpbmUgaXMgc28gc21hbGwgaW4gdGhlIGN1cnJlbnQgdmlldyB0aGF0IGFsbCBwb2ludHMgYXJlIG9uIHRoZSBzYW1lIHBpeGVsLlxuXHRcdGlmIChoYWxmRGlzdCA9PT0gMCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX21hcC5sYXllclBvaW50VG9MYXRMbmcocG9pbnRzWzBdKTtcblx0XHR9XG5cblx0XHRmb3IgKGkgPSAwLCBkaXN0ID0gMDsgaSA8IGxlbiAtIDE7IGkrKykge1xuXHRcdFx0cDEgPSBwb2ludHNbaV07XG5cdFx0XHRwMiA9IHBvaW50c1tpICsgMV07XG5cdFx0XHRzZWdEaXN0ID0gcDEuZGlzdGFuY2VUbyhwMik7XG5cdFx0XHRkaXN0ICs9IHNlZ0Rpc3Q7XG5cblx0XHRcdGlmIChkaXN0ID4gaGFsZkRpc3QpIHtcblx0XHRcdFx0cmF0aW8gPSAoZGlzdCAtIGhhbGZEaXN0KSAvIHNlZ0Rpc3Q7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9tYXAubGF5ZXJQb2ludFRvTGF0TG5nKFtcblx0XHRcdFx0XHRwMi54IC0gcmF0aW8gKiAocDIueCAtIHAxLngpLFxuXHRcdFx0XHRcdHAyLnkgLSByYXRpbyAqIChwMi55IC0gcDEueSlcblx0XHRcdFx0XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdGdldEJvdW5kczogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLl9ib3VuZHM7XG5cdH0sXG5cblx0YWRkTGF0TG5nOiBmdW5jdGlvbiAobGF0bG5nLCBsYXRsbmdzKSB7XG5cdFx0bGF0bG5ncyA9IGxhdGxuZ3MgfHwgdGhpcy5fZGVmYXVsdFNoYXBlKCk7XG5cdFx0bGF0bG5nID0gTC5sYXRMbmcobGF0bG5nKTtcblx0XHRsYXRsbmdzLnB1c2gobGF0bG5nKTtcblx0XHR0aGlzLl9ib3VuZHMuZXh0ZW5kKGxhdGxuZyk7XG5cdFx0cmV0dXJuIHRoaXMucmVkcmF3KCk7XG5cdH0sXG5cblx0X3NldExhdExuZ3M6IGZ1bmN0aW9uIChsYXRsbmdzKSB7XG5cdFx0dGhpcy5fYm91bmRzID0gbmV3IEwuTGF0TG5nQm91bmRzKCk7XG5cdFx0dGhpcy5fbGF0bG5ncyA9IHRoaXMuX2NvbnZlcnRMYXRMbmdzKGxhdGxuZ3MpO1xuXHR9LFxuXG5cdF9kZWZhdWx0U2hhcGU6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gTC5Qb2x5bGluZS5fZmxhdCh0aGlzLl9sYXRsbmdzKSA/IHRoaXMuX2xhdGxuZ3MgOiB0aGlzLl9sYXRsbmdzWzBdO1xuXHR9LFxuXG5cdC8vIHJlY3Vyc2l2ZWx5IGNvbnZlcnQgbGF0bG5ncyBpbnB1dCBpbnRvIGFjdHVhbCBMYXRMbmcgaW5zdGFuY2VzOyBjYWxjdWxhdGUgYm91bmRzIGFsb25nIHRoZSB3YXlcblx0X2NvbnZlcnRMYXRMbmdzOiBmdW5jdGlvbiAobGF0bG5ncykge1xuXHRcdHZhciByZXN1bHQgPSBbXSxcblx0XHQgICAgZmxhdCA9IEwuUG9seWxpbmUuX2ZsYXQobGF0bG5ncyk7XG5cblx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gbGF0bG5ncy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0aWYgKGZsYXQpIHtcblx0XHRcdFx0cmVzdWx0W2ldID0gTC5sYXRMbmcobGF0bG5nc1tpXSk7XG5cdFx0XHRcdHRoaXMuX2JvdW5kcy5leHRlbmQocmVzdWx0W2ldKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlc3VsdFtpXSA9IHRoaXMuX2NvbnZlcnRMYXRMbmdzKGxhdGxuZ3NbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0X3Byb2plY3Q6IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLl9yaW5ncyA9IFtdO1xuXHRcdHRoaXMuX3Byb2plY3RMYXRsbmdzKHRoaXMuX2xhdGxuZ3MsIHRoaXMuX3JpbmdzKTtcblxuXHRcdC8vIHByb2plY3QgYm91bmRzIGFzIHdlbGwgdG8gdXNlIGxhdGVyIGZvciBDYW52YXMgaGl0IGRldGVjdGlvbi9ldGMuXG5cdFx0dmFyIHcgPSB0aGlzLl9jbGlja1RvbGVyYW5jZSgpLFxuXHRcdCAgICBwID0gbmV3IEwuUG9pbnQodywgLXcpO1xuXG5cdFx0aWYgKHRoaXMuX2JvdW5kcy5pc1ZhbGlkKCkpIHtcblx0XHRcdHRoaXMuX3B4Qm91bmRzID0gbmV3IEwuQm91bmRzKFxuXHRcdFx0XHR0aGlzLl9tYXAubGF0TG5nVG9MYXllclBvaW50KHRoaXMuX2JvdW5kcy5nZXRTb3V0aFdlc3QoKSkuX3N1YnRyYWN0KHApLFxuXHRcdFx0XHR0aGlzLl9tYXAubGF0TG5nVG9MYXllclBvaW50KHRoaXMuX2JvdW5kcy5nZXROb3J0aEVhc3QoKSkuX2FkZChwKSk7XG5cdFx0fVxuXHR9LFxuXG5cdC8vIHJlY3Vyc2l2ZWx5IHR1cm5zIGxhdGxuZ3MgaW50byBhIHNldCBvZiByaW5ncyB3aXRoIHByb2plY3RlZCBjb29yZGluYXRlc1xuXHRfcHJvamVjdExhdGxuZ3M6IGZ1bmN0aW9uIChsYXRsbmdzLCByZXN1bHQpIHtcblxuXHRcdHZhciBmbGF0ID0gbGF0bG5nc1swXSBpbnN0YW5jZW9mIEwuTGF0TG5nLFxuXHRcdCAgICBsZW4gPSBsYXRsbmdzLmxlbmd0aCxcblx0XHQgICAgaSwgcmluZztcblxuXHRcdGlmIChmbGF0KSB7XG5cdFx0XHRyaW5nID0gW107XG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdFx0cmluZ1tpXSA9IHRoaXMuX21hcC5sYXRMbmdUb0xheWVyUG9pbnQobGF0bG5nc1tpXSk7XG5cdFx0XHR9XG5cdFx0XHRyZXN1bHQucHVzaChyaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRcdHRoaXMuX3Byb2plY3RMYXRsbmdzKGxhdGxuZ3NbaV0sIHJlc3VsdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdC8vIGNsaXAgcG9seWxpbmUgYnkgcmVuZGVyZXIgYm91bmRzIHNvIHRoYXQgd2UgaGF2ZSBsZXNzIHRvIHJlbmRlciBmb3IgcGVyZm9ybWFuY2Vcblx0X2NsaXBQb2ludHM6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgYm91bmRzID0gdGhpcy5fcmVuZGVyZXIuX2JvdW5kcztcblxuXHRcdHRoaXMuX3BhcnRzID0gW107XG5cdFx0aWYgKCF0aGlzLl9weEJvdW5kcyB8fCAhdGhpcy5fcHhCb3VuZHMuaW50ZXJzZWN0cyhib3VuZHMpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5ub0NsaXApIHtcblx0XHRcdHRoaXMuX3BhcnRzID0gdGhpcy5fcmluZ3M7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dmFyIHBhcnRzID0gdGhpcy5fcGFydHMsXG5cdFx0ICAgIGksIGosIGssIGxlbiwgbGVuMiwgc2VnbWVudCwgcG9pbnRzO1xuXG5cdFx0Zm9yIChpID0gMCwgayA9IDAsIGxlbiA9IHRoaXMuX3JpbmdzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRwb2ludHMgPSB0aGlzLl9yaW5nc1tpXTtcblxuXHRcdFx0Zm9yIChqID0gMCwgbGVuMiA9IHBvaW50cy5sZW5ndGg7IGogPCBsZW4yIC0gMTsgaisrKSB7XG5cdFx0XHRcdHNlZ21lbnQgPSBMLkxpbmVVdGlsLmNsaXBTZWdtZW50KHBvaW50c1tqXSwgcG9pbnRzW2ogKyAxXSwgYm91bmRzLCBqLCB0cnVlKTtcblxuXHRcdFx0XHRpZiAoIXNlZ21lbnQpIHsgY29udGludWU7IH1cblxuXHRcdFx0XHRwYXJ0c1trXSA9IHBhcnRzW2tdIHx8IFtdO1xuXHRcdFx0XHRwYXJ0c1trXS5wdXNoKHNlZ21lbnRbMF0pO1xuXG5cdFx0XHRcdC8vIGlmIHNlZ21lbnQgZ29lcyBvdXQgb2Ygc2NyZWVuLCBvciBpdCdzIHRoZSBsYXN0IG9uZSwgaXQncyB0aGUgZW5kIG9mIHRoZSBsaW5lIHBhcnRcblx0XHRcdFx0aWYgKChzZWdtZW50WzFdICE9PSBwb2ludHNbaiArIDFdKSB8fCAoaiA9PT0gbGVuMiAtIDIpKSB7XG5cdFx0XHRcdFx0cGFydHNba10ucHVzaChzZWdtZW50WzFdKTtcblx0XHRcdFx0XHRrKys7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0Ly8gc2ltcGxpZnkgZWFjaCBjbGlwcGVkIHBhcnQgb2YgdGhlIHBvbHlsaW5lIGZvciBwZXJmb3JtYW5jZVxuXHRfc2ltcGxpZnlQb2ludHM6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgcGFydHMgPSB0aGlzLl9wYXJ0cyxcblx0XHQgICAgdG9sZXJhbmNlID0gdGhpcy5vcHRpb25zLnNtb290aEZhY3RvcjtcblxuXHRcdGZvciAodmFyIGkgPSAwLCBsZW4gPSBwYXJ0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0cGFydHNbaV0gPSBMLkxpbmVVdGlsLnNpbXBsaWZ5KHBhcnRzW2ldLCB0b2xlcmFuY2UpO1xuXHRcdH1cblx0fSxcblxuXHRfdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKCF0aGlzLl9tYXApIHsgcmV0dXJuOyB9XG5cblx0XHR0aGlzLl9jbGlwUG9pbnRzKCk7XG5cdFx0dGhpcy5fc2ltcGxpZnlQb2ludHMoKTtcblx0XHR0aGlzLl91cGRhdGVQYXRoKCk7XG5cdH0sXG5cblx0X3VwZGF0ZVBhdGg6IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLl9yZW5kZXJlci5fdXBkYXRlUG9seSh0aGlzKTtcblx0fVxufSk7XG5cbkwucG9seWxpbmUgPSBmdW5jdGlvbiAobGF0bG5ncywgb3B0aW9ucykge1xuXHRyZXR1cm4gbmV3IEwuUG9seWxpbmUobGF0bG5ncywgb3B0aW9ucyk7XG59O1xuXG5MLlBvbHlsaW5lLl9mbGF0ID0gZnVuY3Rpb24gKGxhdGxuZ3MpIHtcblx0Ly8gdHJ1ZSBpZiBpdCdzIGEgZmxhdCBhcnJheSBvZiBsYXRsbmdzOyBmYWxzZSBpZiBuZXN0ZWRcblx0cmV0dXJuICFMLlV0aWwuaXNBcnJheShsYXRsbmdzWzBdKSB8fCAodHlwZW9mIGxhdGxuZ3NbMF1bMF0gIT09ICdvYmplY3QnICYmIHR5cGVvZiBsYXRsbmdzWzBdWzBdICE9PSAndW5kZWZpbmVkJyk7XG59O1xuXG5cblxuLypcclxuICogTC5Qb2x5VXRpbCBjb250YWlucyB1dGlsaXR5IGZ1bmN0aW9ucyBmb3IgcG9seWdvbnMgKGNsaXBwaW5nLCBldGMuKS5cclxuICovXHJcblxyXG5MLlBvbHlVdGlsID0ge307XHJcblxyXG4vKlxyXG4gKiBTdXRoZXJsYW5kLUhvZGdlbWFuIHBvbHlnb24gY2xpcHBpbmcgYWxnb3JpdGhtLlxyXG4gKiBVc2VkIHRvIGF2b2lkIHJlbmRlcmluZyBwYXJ0cyBvZiBhIHBvbHlnb24gdGhhdCBhcmUgbm90IGN1cnJlbnRseSB2aXNpYmxlLlxyXG4gKi9cclxuTC5Qb2x5VXRpbC5jbGlwUG9seWdvbiA9IGZ1bmN0aW9uIChwb2ludHMsIGJvdW5kcywgcm91bmQpIHtcclxuXHR2YXIgY2xpcHBlZFBvaW50cyxcclxuXHQgICAgZWRnZXMgPSBbMSwgNCwgMiwgOF0sXHJcblx0ICAgIGksIGosIGssXHJcblx0ICAgIGEsIGIsXHJcblx0ICAgIGxlbiwgZWRnZSwgcCxcclxuXHQgICAgbHUgPSBMLkxpbmVVdGlsO1xyXG5cclxuXHRmb3IgKGkgPSAwLCBsZW4gPSBwb2ludHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdHBvaW50c1tpXS5fY29kZSA9IGx1Ll9nZXRCaXRDb2RlKHBvaW50c1tpXSwgYm91bmRzKTtcclxuXHR9XHJcblxyXG5cdC8vIGZvciBlYWNoIGVkZ2UgKGxlZnQsIGJvdHRvbSwgcmlnaHQsIHRvcClcclxuXHRmb3IgKGsgPSAwOyBrIDwgNDsgaysrKSB7XHJcblx0XHRlZGdlID0gZWRnZXNba107XHJcblx0XHRjbGlwcGVkUG9pbnRzID0gW107XHJcblxyXG5cdFx0Zm9yIChpID0gMCwgbGVuID0gcG9pbnRzLmxlbmd0aCwgaiA9IGxlbiAtIDE7IGkgPCBsZW47IGogPSBpKyspIHtcclxuXHRcdFx0YSA9IHBvaW50c1tpXTtcclxuXHRcdFx0YiA9IHBvaW50c1tqXTtcclxuXHJcblx0XHRcdC8vIGlmIGEgaXMgaW5zaWRlIHRoZSBjbGlwIHdpbmRvd1xyXG5cdFx0XHRpZiAoIShhLl9jb2RlICYgZWRnZSkpIHtcclxuXHRcdFx0XHQvLyBpZiBiIGlzIG91dHNpZGUgdGhlIGNsaXAgd2luZG93IChhLT5iIGdvZXMgb3V0IG9mIHNjcmVlbilcclxuXHRcdFx0XHRpZiAoYi5fY29kZSAmIGVkZ2UpIHtcclxuXHRcdFx0XHRcdHAgPSBsdS5fZ2V0RWRnZUludGVyc2VjdGlvbihiLCBhLCBlZGdlLCBib3VuZHMsIHJvdW5kKTtcclxuXHRcdFx0XHRcdHAuX2NvZGUgPSBsdS5fZ2V0Qml0Q29kZShwLCBib3VuZHMpO1xyXG5cdFx0XHRcdFx0Y2xpcHBlZFBvaW50cy5wdXNoKHApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjbGlwcGVkUG9pbnRzLnB1c2goYSk7XHJcblxyXG5cdFx0XHQvLyBlbHNlIGlmIGIgaXMgaW5zaWRlIHRoZSBjbGlwIHdpbmRvdyAoYS0+YiBlbnRlcnMgdGhlIHNjcmVlbilcclxuXHRcdFx0fSBlbHNlIGlmICghKGIuX2NvZGUgJiBlZGdlKSkge1xyXG5cdFx0XHRcdHAgPSBsdS5fZ2V0RWRnZUludGVyc2VjdGlvbihiLCBhLCBlZGdlLCBib3VuZHMsIHJvdW5kKTtcclxuXHRcdFx0XHRwLl9jb2RlID0gbHUuX2dldEJpdENvZGUocCwgYm91bmRzKTtcclxuXHRcdFx0XHRjbGlwcGVkUG9pbnRzLnB1c2gocCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHBvaW50cyA9IGNsaXBwZWRQb2ludHM7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcG9pbnRzO1xyXG59O1xyXG5cblxuXG4vKlxuICogTC5Qb2x5Z29uIGltcGxlbWVudHMgcG9seWdvbiB2ZWN0b3IgbGF5ZXIgKGNsb3NlZCBwb2x5bGluZSB3aXRoIGEgZmlsbCBpbnNpZGUpLlxuICovXG5cbkwuUG9seWdvbiA9IEwuUG9seWxpbmUuZXh0ZW5kKHtcblxuXHRvcHRpb25zOiB7XG5cdFx0ZmlsbDogdHJ1ZVxuXHR9LFxuXG5cdGlzRW1wdHk6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gIXRoaXMuX2xhdGxuZ3MubGVuZ3RoIHx8ICF0aGlzLl9sYXRsbmdzWzBdLmxlbmd0aDtcblx0fSxcblxuXHRnZXRDZW50ZXI6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgaSwgaiwgcDEsIHAyLCBmLCBhcmVhLCB4LCB5LCBjZW50ZXIsXG5cdFx0ICAgIHBvaW50cyA9IHRoaXMuX3JpbmdzWzBdLFxuXHRcdCAgICBsZW4gPSBwb2ludHMubGVuZ3RoO1xuXG5cdFx0aWYgKCFsZW4pIHsgcmV0dXJuIG51bGw7IH1cblxuXHRcdC8vIHBvbHlnb24gY2VudHJvaWQgYWxnb3JpdGhtOyBvbmx5IHVzZXMgdGhlIGZpcnN0IHJpbmcgaWYgdGhlcmUgYXJlIG11bHRpcGxlXG5cblx0XHRhcmVhID0geCA9IHkgPSAwO1xuXG5cdFx0Zm9yIChpID0gMCwgaiA9IGxlbiAtIDE7IGkgPCBsZW47IGogPSBpKyspIHtcblx0XHRcdHAxID0gcG9pbnRzW2ldO1xuXHRcdFx0cDIgPSBwb2ludHNbal07XG5cblx0XHRcdGYgPSBwMS55ICogcDIueCAtIHAyLnkgKiBwMS54O1xuXHRcdFx0eCArPSAocDEueCArIHAyLngpICogZjtcblx0XHRcdHkgKz0gKHAxLnkgKyBwMi55KSAqIGY7XG5cdFx0XHRhcmVhICs9IGYgKiAzO1xuXHRcdH1cblxuXHRcdGlmIChhcmVhID09PSAwKSB7XG5cdFx0XHQvLyBQb2x5Z29uIGlzIHNvIHNtYWxsIHRoYXQgYWxsIHBvaW50cyBhcmUgb24gc2FtZSBwaXhlbC5cblx0XHRcdGNlbnRlciA9IHBvaW50c1swXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2VudGVyID0gW3ggLyBhcmVhLCB5IC8gYXJlYV07XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9tYXAubGF5ZXJQb2ludFRvTGF0TG5nKGNlbnRlcik7XG5cdH0sXG5cblx0X2NvbnZlcnRMYXRMbmdzOiBmdW5jdGlvbiAobGF0bG5ncykge1xuXHRcdHZhciByZXN1bHQgPSBMLlBvbHlsaW5lLnByb3RvdHlwZS5fY29udmVydExhdExuZ3MuY2FsbCh0aGlzLCBsYXRsbmdzKSxcblx0XHQgICAgbGVuID0gcmVzdWx0Lmxlbmd0aDtcblxuXHRcdC8vIHJlbW92ZSBsYXN0IHBvaW50IGlmIGl0IGVxdWFscyBmaXJzdCBvbmVcblx0XHRpZiAobGVuID49IDIgJiYgcmVzdWx0WzBdIGluc3RhbmNlb2YgTC5MYXRMbmcgJiYgcmVzdWx0WzBdLmVxdWFscyhyZXN1bHRbbGVuIC0gMV0pKSB7XG5cdFx0XHRyZXN1bHQucG9wKCk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0X3NldExhdExuZ3M6IGZ1bmN0aW9uIChsYXRsbmdzKSB7XG5cdFx0TC5Qb2x5bGluZS5wcm90b3R5cGUuX3NldExhdExuZ3MuY2FsbCh0aGlzLCBsYXRsbmdzKTtcblx0XHRpZiAoTC5Qb2x5bGluZS5fZmxhdCh0aGlzLl9sYXRsbmdzKSkge1xuXHRcdFx0dGhpcy5fbGF0bG5ncyA9IFt0aGlzLl9sYXRsbmdzXTtcblx0XHR9XG5cdH0sXG5cblx0X2RlZmF1bHRTaGFwZTogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBMLlBvbHlsaW5lLl9mbGF0KHRoaXMuX2xhdGxuZ3NbMF0pID8gdGhpcy5fbGF0bG5nc1swXSA6IHRoaXMuX2xhdGxuZ3NbMF1bMF07XG5cdH0sXG5cblx0X2NsaXBQb2ludHM6IGZ1bmN0aW9uICgpIHtcblx0XHQvLyBwb2x5Z29ucyBuZWVkIGEgZGlmZmVyZW50IGNsaXBwaW5nIGFsZ29yaXRobSBzbyB3ZSByZWRlZmluZSB0aGF0XG5cblx0XHR2YXIgYm91bmRzID0gdGhpcy5fcmVuZGVyZXIuX2JvdW5kcyxcblx0XHQgICAgdyA9IHRoaXMub3B0aW9ucy53ZWlnaHQsXG5cdFx0ICAgIHAgPSBuZXcgTC5Qb2ludCh3LCB3KTtcblxuXHRcdC8vIGluY3JlYXNlIGNsaXAgcGFkZGluZyBieSBzdHJva2Ugd2lkdGggdG8gYXZvaWQgc3Ryb2tlIG9uIGNsaXAgZWRnZXNcblx0XHRib3VuZHMgPSBuZXcgTC5Cb3VuZHMoYm91bmRzLm1pbi5zdWJ0cmFjdChwKSwgYm91bmRzLm1heC5hZGQocCkpO1xuXG5cdFx0dGhpcy5fcGFydHMgPSBbXTtcblx0XHRpZiAoIXRoaXMuX3B4Qm91bmRzIHx8ICF0aGlzLl9weEJvdW5kcy5pbnRlcnNlY3RzKGJvdW5kcykpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5vcHRpb25zLm5vQ2xpcCkge1xuXHRcdFx0dGhpcy5fcGFydHMgPSB0aGlzLl9yaW5ncztcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5fcmluZ3MubGVuZ3RoLCBjbGlwcGVkOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGNsaXBwZWQgPSBMLlBvbHlVdGlsLmNsaXBQb2x5Z29uKHRoaXMuX3JpbmdzW2ldLCBib3VuZHMsIHRydWUpO1xuXHRcdFx0aWYgKGNsaXBwZWQubGVuZ3RoKSB7XG5cdFx0XHRcdHRoaXMuX3BhcnRzLnB1c2goY2xpcHBlZCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdF91cGRhdGVQYXRoOiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fcmVuZGVyZXIuX3VwZGF0ZVBvbHkodGhpcywgdHJ1ZSk7XG5cdH1cbn0pO1xuXG5MLnBvbHlnb24gPSBmdW5jdGlvbiAobGF0bG5ncywgb3B0aW9ucykge1xuXHRyZXR1cm4gbmV3IEwuUG9seWdvbihsYXRsbmdzLCBvcHRpb25zKTtcbn07XG5cblxuXG4vKlxuICogTC5SZWN0YW5nbGUgZXh0ZW5kcyBQb2x5Z29uIGFuZCBjcmVhdGVzIGEgcmVjdGFuZ2xlIHdoZW4gcGFzc2VkIGEgTGF0TG5nQm91bmRzIG9iamVjdC5cbiAqL1xuXG5MLlJlY3RhbmdsZSA9IEwuUG9seWdvbi5leHRlbmQoe1xuXHRpbml0aWFsaXplOiBmdW5jdGlvbiAobGF0TG5nQm91bmRzLCBvcHRpb25zKSB7XG5cdFx0TC5Qb2x5Z29uLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgdGhpcy5fYm91bmRzVG9MYXRMbmdzKGxhdExuZ0JvdW5kcyksIG9wdGlvbnMpO1xuXHR9LFxuXG5cdHNldEJvdW5kczogZnVuY3Rpb24gKGxhdExuZ0JvdW5kcykge1xuXHRcdHJldHVybiB0aGlzLnNldExhdExuZ3ModGhpcy5fYm91bmRzVG9MYXRMbmdzKGxhdExuZ0JvdW5kcykpO1xuXHR9LFxuXG5cdF9ib3VuZHNUb0xhdExuZ3M6IGZ1bmN0aW9uIChsYXRMbmdCb3VuZHMpIHtcblx0XHRsYXRMbmdCb3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhsYXRMbmdCb3VuZHMpO1xuXHRcdHJldHVybiBbXG5cdFx0XHRsYXRMbmdCb3VuZHMuZ2V0U291dGhXZXN0KCksXG5cdFx0XHRsYXRMbmdCb3VuZHMuZ2V0Tm9ydGhXZXN0KCksXG5cdFx0XHRsYXRMbmdCb3VuZHMuZ2V0Tm9ydGhFYXN0KCksXG5cdFx0XHRsYXRMbmdCb3VuZHMuZ2V0U291dGhFYXN0KClcblx0XHRdO1xuXHR9XG59KTtcblxuTC5yZWN0YW5nbGUgPSBmdW5jdGlvbiAobGF0TG5nQm91bmRzLCBvcHRpb25zKSB7XG5cdHJldHVybiBuZXcgTC5SZWN0YW5nbGUobGF0TG5nQm91bmRzLCBvcHRpb25zKTtcbn07XG5cblxuXG4vKlxuICogTC5DaXJjbGVNYXJrZXIgaXMgYSBjaXJjbGUgb3ZlcmxheSB3aXRoIGEgcGVybWFuZW50IHBpeGVsIHJhZGl1cy5cbiAqL1xuXG5MLkNpcmNsZU1hcmtlciA9IEwuUGF0aC5leHRlbmQoe1xuXG5cdG9wdGlvbnM6IHtcblx0XHRmaWxsOiB0cnVlLFxuXHRcdHJhZGl1czogMTBcblx0fSxcblxuXHRpbml0aWFsaXplOiBmdW5jdGlvbiAobGF0bG5nLCBvcHRpb25zKSB7XG5cdFx0TC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuXHRcdHRoaXMuX2xhdGxuZyA9IEwubGF0TG5nKGxhdGxuZyk7XG5cdFx0dGhpcy5fcmFkaXVzID0gdGhpcy5vcHRpb25zLnJhZGl1cztcblx0fSxcblxuXHRzZXRMYXRMbmc6IGZ1bmN0aW9uIChsYXRsbmcpIHtcblx0XHR0aGlzLl9sYXRsbmcgPSBMLmxhdExuZyhsYXRsbmcpO1xuXHRcdHRoaXMucmVkcmF3KCk7XG5cdFx0cmV0dXJuIHRoaXMuZmlyZSgnbW92ZScsIHtsYXRsbmc6IHRoaXMuX2xhdGxuZ30pO1xuXHR9LFxuXG5cdGdldExhdExuZzogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLl9sYXRsbmc7XG5cdH0sXG5cblx0c2V0UmFkaXVzOiBmdW5jdGlvbiAocmFkaXVzKSB7XG5cdFx0dGhpcy5vcHRpb25zLnJhZGl1cyA9IHRoaXMuX3JhZGl1cyA9IHJhZGl1cztcblx0XHRyZXR1cm4gdGhpcy5yZWRyYXcoKTtcblx0fSxcblxuXHRnZXRSYWRpdXM6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5fcmFkaXVzO1xuXHR9LFxuXG5cdHNldFN0eWxlIDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0XHR2YXIgcmFkaXVzID0gb3B0aW9ucyAmJiBvcHRpb25zLnJhZGl1cyB8fCB0aGlzLl9yYWRpdXM7XG5cdFx0TC5QYXRoLnByb3RvdHlwZS5zZXRTdHlsZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXHRcdHRoaXMuc2V0UmFkaXVzKHJhZGl1cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0X3Byb2plY3Q6IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLl9wb2ludCA9IHRoaXMuX21hcC5sYXRMbmdUb0xheWVyUG9pbnQodGhpcy5fbGF0bG5nKTtcblx0XHR0aGlzLl91cGRhdGVCb3VuZHMoKTtcblx0fSxcblxuXHRfdXBkYXRlQm91bmRzOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHIgPSB0aGlzLl9yYWRpdXMsXG5cdFx0ICAgIHIyID0gdGhpcy5fcmFkaXVzWSB8fCByLFxuXHRcdCAgICB3ID0gdGhpcy5fY2xpY2tUb2xlcmFuY2UoKSxcblx0XHQgICAgcCA9IFtyICsgdywgcjIgKyB3XTtcblx0XHR0aGlzLl9weEJvdW5kcyA9IG5ldyBMLkJvdW5kcyh0aGlzLl9wb2ludC5zdWJ0cmFjdChwKSwgdGhpcy5fcG9pbnQuYWRkKHApKTtcblx0fSxcblxuXHRfdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuX21hcCkge1xuXHRcdFx0dGhpcy5fdXBkYXRlUGF0aCgpO1xuXHRcdH1cblx0fSxcblxuXHRfdXBkYXRlUGF0aDogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuX3JlbmRlcmVyLl91cGRhdGVDaXJjbGUodGhpcyk7XG5cdH0sXG5cblx0X2VtcHR5OiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3JhZGl1cyAmJiAhdGhpcy5fcmVuZGVyZXIuX2JvdW5kcy5pbnRlcnNlY3RzKHRoaXMuX3B4Qm91bmRzKTtcblx0fVxufSk7XG5cbkwuY2lyY2xlTWFya2VyID0gZnVuY3Rpb24gKGxhdGxuZywgb3B0aW9ucykge1xuXHRyZXR1cm4gbmV3IEwuQ2lyY2xlTWFya2VyKGxhdGxuZywgb3B0aW9ucyk7XG59O1xuXG5cblxuLypcbiAqIEwuQ2lyY2xlIGlzIGEgY2lyY2xlIG92ZXJsYXkgKHdpdGggYSBjZXJ0YWluIHJhZGl1cyBpbiBtZXRlcnMpLlxuICogSXQncyBhbiBhcHByb3hpbWF0aW9uIGFuZCBzdGFydHMgdG8gZGl2ZXJnZSBmcm9tIGEgcmVhbCBjaXJjbGUgY2xvc2VyIHRvIHBvbGVzIChkdWUgdG8gcHJvamVjdGlvbiBkaXN0b3J0aW9uKVxuICovXG5cbkwuQ2lyY2xlID0gTC5DaXJjbGVNYXJrZXIuZXh0ZW5kKHtcblxuXHRpbml0aWFsaXplOiBmdW5jdGlvbiAobGF0bG5nLCBvcHRpb25zKSB7XG5cdFx0TC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuXHRcdHRoaXMuX2xhdGxuZyA9IEwubGF0TG5nKGxhdGxuZyk7XG5cdFx0dGhpcy5fbVJhZGl1cyA9IHRoaXMub3B0aW9ucy5yYWRpdXM7XG5cdH0sXG5cblx0c2V0UmFkaXVzOiBmdW5jdGlvbiAocmFkaXVzKSB7XG5cdFx0dGhpcy5fbVJhZGl1cyA9IHJhZGl1cztcblx0XHRyZXR1cm4gdGhpcy5yZWRyYXcoKTtcblx0fSxcblxuXHRnZXRSYWRpdXM6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5fbVJhZGl1cztcblx0fSxcblxuXHRnZXRCb3VuZHM6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgaGFsZiA9IFt0aGlzLl9yYWRpdXMsIHRoaXMuX3JhZGl1c1kgfHwgdGhpcy5fcmFkaXVzXTtcblxuXHRcdHJldHVybiBuZXcgTC5MYXRMbmdCb3VuZHMoXG5cdFx0XHR0aGlzLl9tYXAubGF5ZXJQb2ludFRvTGF0TG5nKHRoaXMuX3BvaW50LnN1YnRyYWN0KGhhbGYpKSxcblx0XHRcdHRoaXMuX21hcC5sYXllclBvaW50VG9MYXRMbmcodGhpcy5fcG9pbnQuYWRkKGhhbGYpKSk7XG5cdH0sXG5cblx0c2V0U3R5bGU6IEwuUGF0aC5wcm90b3R5cGUuc2V0U3R5bGUsXG5cblx0X3Byb2plY3Q6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciBsbmcgPSB0aGlzLl9sYXRsbmcubG5nLFxuXHRcdCAgICBsYXQgPSB0aGlzLl9sYXRsbmcubGF0LFxuXHRcdCAgICBtYXAgPSB0aGlzLl9tYXAsXG5cdFx0ICAgIGNycyA9IG1hcC5vcHRpb25zLmNycztcblxuXHRcdGlmIChjcnMuZGlzdGFuY2UgPT09IEwuQ1JTLkVhcnRoLmRpc3RhbmNlKSB7XG5cdFx0XHR2YXIgZCA9IE1hdGguUEkgLyAxODAsXG5cdFx0XHQgICAgbGF0UiA9ICh0aGlzLl9tUmFkaXVzIC8gTC5DUlMuRWFydGguUikgLyBkLFxuXHRcdFx0ICAgIHRvcCA9IG1hcC5wcm9qZWN0KFtsYXQgKyBsYXRSLCBsbmddKSxcblx0XHRcdCAgICBib3R0b20gPSBtYXAucHJvamVjdChbbGF0IC0gbGF0UiwgbG5nXSksXG5cdFx0XHQgICAgcCA9IHRvcC5hZGQoYm90dG9tKS5kaXZpZGVCeSgyKSxcblx0XHRcdCAgICBsYXQyID0gbWFwLnVucHJvamVjdChwKS5sYXQsXG5cdFx0XHQgICAgbG5nUiA9IE1hdGguYWNvcygoTWF0aC5jb3MobGF0UiAqIGQpIC0gTWF0aC5zaW4obGF0ICogZCkgKiBNYXRoLnNpbihsYXQyICogZCkpIC9cblx0XHRcdCAgICAgICAgICAgIChNYXRoLmNvcyhsYXQgKiBkKSAqIE1hdGguY29zKGxhdDIgKiBkKSkpIC8gZDtcblxuXHRcdFx0dGhpcy5fcG9pbnQgPSBwLnN1YnRyYWN0KG1hcC5nZXRQaXhlbE9yaWdpbigpKTtcblx0XHRcdHRoaXMuX3JhZGl1cyA9IGlzTmFOKGxuZ1IpID8gMCA6IE1hdGgubWF4KE1hdGgucm91bmQocC54IC0gbWFwLnByb2plY3QoW2xhdDIsIGxuZyAtIGxuZ1JdKS54KSwgMSk7XG5cdFx0XHR0aGlzLl9yYWRpdXNZID0gTWF0aC5tYXgoTWF0aC5yb3VuZChwLnkgLSB0b3AueSksIDEpO1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBsYXRsbmcyID0gY3JzLnVucHJvamVjdChjcnMucHJvamVjdCh0aGlzLl9sYXRsbmcpLnN1YnRyYWN0KFt0aGlzLl9tUmFkaXVzLCAwXSkpO1xuXG5cdFx0XHR0aGlzLl9wb2ludCA9IG1hcC5sYXRMbmdUb0xheWVyUG9pbnQodGhpcy5fbGF0bG5nKTtcblx0XHRcdHRoaXMuX3JhZGl1cyA9IHRoaXMuX3BvaW50LnggLSBtYXAubGF0TG5nVG9MYXllclBvaW50KGxhdGxuZzIpLng7XG5cdFx0fVxuXG5cdFx0dGhpcy5fdXBkYXRlQm91bmRzKCk7XG5cdH1cbn0pO1xuXG5MLmNpcmNsZSA9IGZ1bmN0aW9uIChsYXRsbmcsIG9wdGlvbnMsIGxlZ2FjeU9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBvcHRpb25zID09PSAnbnVtYmVyJykge1xuXHRcdC8vIEJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IHdpdGggMC43LnggZmFjdG9yeSAobGF0bG5nLCByYWRpdXMsIG9wdGlvbnM/KVxuXHRcdG9wdGlvbnMgPSBMLmV4dGVuZCh7fSwgbGVnYWN5T3B0aW9ucywge3JhZGl1czogb3B0aW9uc30pO1xuXHR9XG5cdHJldHVybiBuZXcgTC5DaXJjbGUobGF0bG5nLCBvcHRpb25zKTtcbn07XG5cblxuXG4vKlxuICogTC5TVkcgcmVuZGVycyB2ZWN0b3IgbGF5ZXJzIHdpdGggU1ZHLiBBbGwgU1ZHLXNwZWNpZmljIGNvZGUgZ29lcyBoZXJlLlxuICovXG5cbkwuU1ZHID0gTC5SZW5kZXJlci5leHRlbmQoe1xuXG5cdF9pbml0Q29udGFpbmVyOiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fY29udGFpbmVyID0gTC5TVkcuY3JlYXRlKCdzdmcnKTtcblxuXHRcdC8vIG1ha2VzIGl0IHBvc3NpYmxlIHRvIGNsaWNrIHRocm91Z2ggc3ZnIHJvb3Q7IHdlJ2xsIHJlc2V0IGl0IGJhY2sgaW4gaW5kaXZpZHVhbCBwYXRoc1xuXHRcdHRoaXMuX2NvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKTtcblxuXHRcdHRoaXMuX3Jvb3RHcm91cCA9IEwuU1ZHLmNyZWF0ZSgnZycpO1xuXHRcdHRoaXMuX2NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLl9yb290R3JvdXApO1xuXHR9LFxuXG5cdF91cGRhdGU6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5fbWFwLl9hbmltYXRpbmdab29tICYmIHRoaXMuX2JvdW5kcykgeyByZXR1cm47IH1cblxuXHRcdEwuUmVuZGVyZXIucHJvdG90eXBlLl91cGRhdGUuY2FsbCh0aGlzKTtcblxuXHRcdHZhciBiID0gdGhpcy5fYm91bmRzLFxuXHRcdCAgICBzaXplID0gYi5nZXRTaXplKCksXG5cdFx0ICAgIGNvbnRhaW5lciA9IHRoaXMuX2NvbnRhaW5lcjtcblxuXHRcdC8vIHNldCBzaXplIG9mIHN2Zy1jb250YWluZXIgaWYgY2hhbmdlZFxuXHRcdGlmICghdGhpcy5fc3ZnU2l6ZSB8fCAhdGhpcy5fc3ZnU2l6ZS5lcXVhbHMoc2l6ZSkpIHtcblx0XHRcdHRoaXMuX3N2Z1NpemUgPSBzaXplO1xuXHRcdFx0Y29udGFpbmVyLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBzaXplLngpO1xuXHRcdFx0Y29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaGVpZ2h0Jywgc2l6ZS55KTtcblx0XHR9XG5cblx0XHQvLyBtb3ZlbWVudDogdXBkYXRlIGNvbnRhaW5lciB2aWV3Qm94IHNvIHRoYXQgd2UgZG9uJ3QgaGF2ZSB0byBjaGFuZ2UgY29vcmRpbmF0ZXMgb2YgaW5kaXZpZHVhbCBsYXllcnNcblx0XHRMLkRvbVV0aWwuc2V0UG9zaXRpb24oY29udGFpbmVyLCBiLm1pbik7XG5cdFx0Y29udGFpbmVyLnNldEF0dHJpYnV0ZSgndmlld0JveCcsIFtiLm1pbi54LCBiLm1pbi55LCBzaXplLngsIHNpemUueV0uam9pbignICcpKTtcblx0fSxcblxuXHQvLyBtZXRob2RzIGJlbG93IGFyZSBjYWxsZWQgYnkgdmVjdG9yIGxheWVycyBpbXBsZW1lbnRhdGlvbnNcblxuXHRfaW5pdFBhdGg6IGZ1bmN0aW9uIChsYXllcikge1xuXHRcdHZhciBwYXRoID0gbGF5ZXIuX3BhdGggPSBMLlNWRy5jcmVhdGUoJ3BhdGgnKTtcblxuXHRcdGlmIChsYXllci5vcHRpb25zLmNsYXNzTmFtZSkge1xuXHRcdFx0TC5Eb21VdGlsLmFkZENsYXNzKHBhdGgsIGxheWVyLm9wdGlvbnMuY2xhc3NOYW1lKTtcblx0XHR9XG5cblx0XHRpZiAobGF5ZXIub3B0aW9ucy5pbnRlcmFjdGl2ZSkge1xuXHRcdFx0TC5Eb21VdGlsLmFkZENsYXNzKHBhdGgsICdsZWFmbGV0LWludGVyYWN0aXZlJyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fdXBkYXRlU3R5bGUobGF5ZXIpO1xuXHR9LFxuXG5cdF9hZGRQYXRoOiBmdW5jdGlvbiAobGF5ZXIpIHtcblx0XHR0aGlzLl9yb290R3JvdXAuYXBwZW5kQ2hpbGQobGF5ZXIuX3BhdGgpO1xuXHRcdGxheWVyLmFkZEludGVyYWN0aXZlVGFyZ2V0KGxheWVyLl9wYXRoKTtcblx0fSxcblxuXHRfcmVtb3ZlUGF0aDogZnVuY3Rpb24gKGxheWVyKSB7XG5cdFx0TC5Eb21VdGlsLnJlbW92ZShsYXllci5fcGF0aCk7XG5cdFx0bGF5ZXIucmVtb3ZlSW50ZXJhY3RpdmVUYXJnZXQobGF5ZXIuX3BhdGgpO1xuXHR9LFxuXG5cdF91cGRhdGVQYXRoOiBmdW5jdGlvbiAobGF5ZXIpIHtcblx0XHRsYXllci5fcHJvamVjdCgpO1xuXHRcdGxheWVyLl91cGRhdGUoKTtcblx0fSxcblxuXHRfdXBkYXRlU3R5bGU6IGZ1bmN0aW9uIChsYXllcikge1xuXHRcdHZhciBwYXRoID0gbGF5ZXIuX3BhdGgsXG5cdFx0ICAgIG9wdGlvbnMgPSBsYXllci5vcHRpb25zO1xuXG5cdFx0aWYgKCFwYXRoKSB7IHJldHVybjsgfVxuXG5cdFx0aWYgKG9wdGlvbnMuc3Ryb2tlKSB7XG5cdFx0XHRwYXRoLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgb3B0aW9ucy5jb2xvcik7XG5cdFx0XHRwYXRoLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLW9wYWNpdHknLCBvcHRpb25zLm9wYWNpdHkpO1xuXHRcdFx0cGF0aC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsIG9wdGlvbnMud2VpZ2h0KTtcblx0XHRcdHBhdGguc2V0QXR0cmlidXRlKCdzdHJva2UtbGluZWNhcCcsIG9wdGlvbnMubGluZUNhcCk7XG5cdFx0XHRwYXRoLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLWxpbmVqb2luJywgb3B0aW9ucy5saW5lSm9pbik7XG5cblx0XHRcdGlmIChvcHRpb25zLmRhc2hBcnJheSkge1xuXHRcdFx0XHRwYXRoLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLWRhc2hhcnJheScsIG9wdGlvbnMuZGFzaEFycmF5KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHBhdGgucmVtb3ZlQXR0cmlidXRlKCdzdHJva2UtZGFzaGFycmF5Jyk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvcHRpb25zLmRhc2hPZmZzZXQpIHtcblx0XHRcdFx0cGF0aC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS1kYXNob2Zmc2V0Jywgb3B0aW9ucy5kYXNoT2Zmc2V0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHBhdGgucmVtb3ZlQXR0cmlidXRlKCdzdHJva2UtZGFzaG9mZnNldCcpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRwYXRoLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgJ25vbmUnKTtcblx0XHR9XG5cblx0XHRpZiAob3B0aW9ucy5maWxsKSB7XG5cdFx0XHRwYXRoLnNldEF0dHJpYnV0ZSgnZmlsbCcsIG9wdGlvbnMuZmlsbENvbG9yIHx8IG9wdGlvbnMuY29sb3IpO1xuXHRcdFx0cGF0aC5zZXRBdHRyaWJ1dGUoJ2ZpbGwtb3BhY2l0eScsIG9wdGlvbnMuZmlsbE9wYWNpdHkpO1xuXHRcdFx0cGF0aC5zZXRBdHRyaWJ1dGUoJ2ZpbGwtcnVsZScsIG9wdGlvbnMuZmlsbFJ1bGUgfHwgJ2V2ZW5vZGQnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cGF0aC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnbm9uZScpO1xuXHRcdH1cblxuXHRcdHBhdGguc2V0QXR0cmlidXRlKCdwb2ludGVyLWV2ZW50cycsIG9wdGlvbnMucG9pbnRlckV2ZW50cyB8fCAob3B0aW9ucy5pbnRlcmFjdGl2ZSA/ICd2aXNpYmxlUGFpbnRlZCcgOiAnbm9uZScpKTtcblx0fSxcblxuXHRfdXBkYXRlUG9seTogZnVuY3Rpb24gKGxheWVyLCBjbG9zZWQpIHtcblx0XHR0aGlzLl9zZXRQYXRoKGxheWVyLCBMLlNWRy5wb2ludHNUb1BhdGgobGF5ZXIuX3BhcnRzLCBjbG9zZWQpKTtcblx0fSxcblxuXHRfdXBkYXRlQ2lyY2xlOiBmdW5jdGlvbiAobGF5ZXIpIHtcblx0XHR2YXIgcCA9IGxheWVyLl9wb2ludCxcblx0XHQgICAgciA9IGxheWVyLl9yYWRpdXMsXG5cdFx0ICAgIHIyID0gbGF5ZXIuX3JhZGl1c1kgfHwgcixcblx0XHQgICAgYXJjID0gJ2EnICsgciArICcsJyArIHIyICsgJyAwIDEsMCAnO1xuXG5cdFx0Ly8gZHJhd2luZyBhIGNpcmNsZSB3aXRoIHR3byBoYWxmLWFyY3Ncblx0XHR2YXIgZCA9IGxheWVyLl9lbXB0eSgpID8gJ00wIDAnIDpcblx0XHRcdFx0J00nICsgKHAueCAtIHIpICsgJywnICsgcC55ICtcblx0XHRcdFx0YXJjICsgKHIgKiAyKSArICcsMCAnICtcblx0XHRcdFx0YXJjICsgKC1yICogMikgKyAnLDAgJztcblxuXHRcdHRoaXMuX3NldFBhdGgobGF5ZXIsIGQpO1xuXHR9LFxuXG5cdF9zZXRQYXRoOiBmdW5jdGlvbiAobGF5ZXIsIHBhdGgpIHtcblx0XHRsYXllci5fcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBwYXRoKTtcblx0fSxcblxuXHQvLyBTVkcgZG9lcyBub3QgaGF2ZSB0aGUgY29uY2VwdCBvZiB6SW5kZXggc28gd2UgcmVzb3J0IHRvIGNoYW5naW5nIHRoZSBET00gb3JkZXIgb2YgZWxlbWVudHNcblx0X2JyaW5nVG9Gcm9udDogZnVuY3Rpb24gKGxheWVyKSB7XG5cdFx0TC5Eb21VdGlsLnRvRnJvbnQobGF5ZXIuX3BhdGgpO1xuXHR9LFxuXG5cdF9icmluZ1RvQmFjazogZnVuY3Rpb24gKGxheWVyKSB7XG5cdFx0TC5Eb21VdGlsLnRvQmFjayhsYXllci5fcGF0aCk7XG5cdH1cbn0pO1xuXG5cbkwuZXh0ZW5kKEwuU1ZHLCB7XG5cdGNyZWF0ZTogZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRyZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIG5hbWUpO1xuXHR9LFxuXG5cdC8vIGdlbmVyYXRlcyBTVkcgcGF0aCBzdHJpbmcgZm9yIG11bHRpcGxlIHJpbmdzLCB3aXRoIGVhY2ggcmluZyB0dXJuaW5nIGludG8gXCJNLi5MLi5MLi5cIiBpbnN0cnVjdGlvbnNcblx0cG9pbnRzVG9QYXRoOiBmdW5jdGlvbiAocmluZ3MsIGNsb3NlZCkge1xuXHRcdHZhciBzdHIgPSAnJyxcblx0XHQgICAgaSwgaiwgbGVuLCBsZW4yLCBwb2ludHMsIHA7XG5cblx0XHRmb3IgKGkgPSAwLCBsZW4gPSByaW5ncy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0cG9pbnRzID0gcmluZ3NbaV07XG5cblx0XHRcdGZvciAoaiA9IDAsIGxlbjIgPSBwb2ludHMubGVuZ3RoOyBqIDwgbGVuMjsgaisrKSB7XG5cdFx0XHRcdHAgPSBwb2ludHNbal07XG5cdFx0XHRcdHN0ciArPSAoaiA/ICdMJyA6ICdNJykgKyBwLnggKyAnICcgKyBwLnk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGNsb3NlcyB0aGUgcmluZyBmb3IgcG9seWdvbnM7IFwieFwiIGlzIFZNTCBzeW50YXhcblx0XHRcdHN0ciArPSBjbG9zZWQgPyAoTC5Ccm93c2VyLnN2ZyA/ICd6JyA6ICd4JykgOiAnJztcblx0XHR9XG5cblx0XHQvLyBTVkcgY29tcGxhaW5zIGFib3V0IGVtcHR5IHBhdGggc3RyaW5nc1xuXHRcdHJldHVybiBzdHIgfHwgJ00wIDAnO1xuXHR9XG59KTtcblxuTC5Ccm93c2VyLnN2ZyA9ICEhKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyAmJiBMLlNWRy5jcmVhdGUoJ3N2ZycpLmNyZWF0ZVNWR1JlY3QpO1xuXG5MLnN2ZyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdHJldHVybiBMLkJyb3dzZXIuc3ZnIHx8IEwuQnJvd3Nlci52bWwgPyBuZXcgTC5TVkcob3B0aW9ucykgOiBudWxsO1xufTtcblxuXG5cbi8qXG4gKiBWZWN0b3IgcmVuZGVyaW5nIGZvciBJRTctOCB0aHJvdWdoIFZNTC5cbiAqIFRoYW5rcyB0byBEbWl0cnkgQmFyYW5vdnNreSBhbmQgaGlzIFJhcGhhZWwgbGlicmFyeSBmb3IgaW5zcGlyYXRpb24hXG4gKi9cblxuTC5Ccm93c2VyLnZtbCA9ICFMLkJyb3dzZXIuc3ZnICYmIChmdW5jdGlvbiAoKSB7XG5cdHRyeSB7XG5cdFx0dmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdi5pbm5lckhUTUwgPSAnPHY6c2hhcGUgYWRqPVwiMVwiLz4nO1xuXG5cdFx0dmFyIHNoYXBlID0gZGl2LmZpcnN0Q2hpbGQ7XG5cdFx0c2hhcGUuc3R5bGUuYmVoYXZpb3IgPSAndXJsKCNkZWZhdWx0I1ZNTCknO1xuXG5cdFx0cmV0dXJuIHNoYXBlICYmICh0eXBlb2Ygc2hhcGUuYWRqID09PSAnb2JqZWN0Jyk7XG5cblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufSgpKTtcblxuLy8gcmVkZWZpbmUgc29tZSBTVkcgbWV0aG9kcyB0byBoYW5kbGUgVk1MIHN5bnRheCB3aGljaCBpcyBzaW1pbGFyIGJ1dCB3aXRoIHNvbWUgZGlmZmVyZW5jZXNcbkwuU1ZHLmluY2x1ZGUoIUwuQnJvd3Nlci52bWwgPyB7fSA6IHtcblxuXHRfaW5pdENvbnRhaW5lcjogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuX2NvbnRhaW5lciA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdsZWFmbGV0LXZtbC1jb250YWluZXInKTtcblx0fSxcblxuXHRfdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuX21hcC5fYW5pbWF0aW5nWm9vbSkgeyByZXR1cm47IH1cblx0XHRMLlJlbmRlcmVyLnByb3RvdHlwZS5fdXBkYXRlLmNhbGwodGhpcyk7XG5cdH0sXG5cblx0X2luaXRQYXRoOiBmdW5jdGlvbiAobGF5ZXIpIHtcblx0XHR2YXIgY29udGFpbmVyID0gbGF5ZXIuX2NvbnRhaW5lciA9IEwuU1ZHLmNyZWF0ZSgnc2hhcGUnKTtcblxuXHRcdEwuRG9tVXRpbC5hZGRDbGFzcyhjb250YWluZXIsICdsZWFmbGV0LXZtbC1zaGFwZSAnICsgKHRoaXMub3B0aW9ucy5jbGFzc05hbWUgfHwgJycpKTtcblxuXHRcdGNvbnRhaW5lci5jb29yZHNpemUgPSAnMSAxJztcblxuXHRcdGxheWVyLl9wYXRoID0gTC5TVkcuY3JlYXRlKCdwYXRoJyk7XG5cdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGxheWVyLl9wYXRoKTtcblxuXHRcdHRoaXMuX3VwZGF0ZVN0eWxlKGxheWVyKTtcblx0fSxcblxuXHRfYWRkUGF0aDogZnVuY3Rpb24gKGxheWVyKSB7XG5cdFx0dmFyIGNvbnRhaW5lciA9IGxheWVyLl9jb250YWluZXI7XG5cdFx0dGhpcy5fY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG5cblx0XHRpZiAobGF5ZXIub3B0aW9ucy5pbnRlcmFjdGl2ZSkge1xuXHRcdFx0bGF5ZXIuYWRkSW50ZXJhY3RpdmVUYXJnZXQoY29udGFpbmVyKTtcblx0XHR9XG5cdH0sXG5cblx0X3JlbW92ZVBhdGg6IGZ1bmN0aW9uIChsYXllcikge1xuXHRcdHZhciBjb250YWluZXIgPSBsYXllci5fY29udGFpbmVyO1xuXHRcdEwuRG9tVXRpbC5yZW1vdmUoY29udGFpbmVyKTtcblx0XHRsYXllci5yZW1vdmVJbnRlcmFjdGl2ZVRhcmdldChjb250YWluZXIpO1xuXHR9LFxuXG5cdF91cGRhdGVTdHlsZTogZnVuY3Rpb24gKGxheWVyKSB7XG5cdFx0dmFyIHN0cm9rZSA9IGxheWVyLl9zdHJva2UsXG5cdFx0ICAgIGZpbGwgPSBsYXllci5fZmlsbCxcblx0XHQgICAgb3B0aW9ucyA9IGxheWVyLm9wdGlvbnMsXG5cdFx0ICAgIGNvbnRhaW5lciA9IGxheWVyLl9jb250YWluZXI7XG5cblx0XHRjb250YWluZXIuc3Ryb2tlZCA9ICEhb3B0aW9ucy5zdHJva2U7XG5cdFx0Y29udGFpbmVyLmZpbGxlZCA9ICEhb3B0aW9ucy5maWxsO1xuXG5cdFx0aWYgKG9wdGlvbnMuc3Ryb2tlKSB7XG5cdFx0XHRpZiAoIXN0cm9rZSkge1xuXHRcdFx0XHRzdHJva2UgPSBsYXllci5fc3Ryb2tlID0gTC5TVkcuY3JlYXRlKCdzdHJva2UnKTtcblx0XHRcdH1cblx0XHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZChzdHJva2UpO1xuXHRcdFx0c3Ryb2tlLndlaWdodCA9IG9wdGlvbnMud2VpZ2h0ICsgJ3B4Jztcblx0XHRcdHN0cm9rZS5jb2xvciA9IG9wdGlvbnMuY29sb3I7XG5cdFx0XHRzdHJva2Uub3BhY2l0eSA9IG9wdGlvbnMub3BhY2l0eTtcblxuXHRcdFx0aWYgKG9wdGlvbnMuZGFzaEFycmF5KSB7XG5cdFx0XHRcdHN0cm9rZS5kYXNoU3R5bGUgPSBMLlV0aWwuaXNBcnJheShvcHRpb25zLmRhc2hBcnJheSkgP1xuXHRcdFx0XHQgICAgb3B0aW9ucy5kYXNoQXJyYXkuam9pbignICcpIDpcblx0XHRcdFx0ICAgIG9wdGlvbnMuZGFzaEFycmF5LnJlcGxhY2UoLyggKiwgKikvZywgJyAnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHN0cm9rZS5kYXNoU3R5bGUgPSAnJztcblx0XHRcdH1cblx0XHRcdHN0cm9rZS5lbmRjYXAgPSBvcHRpb25zLmxpbmVDYXAucmVwbGFjZSgnYnV0dCcsICdmbGF0Jyk7XG5cdFx0XHRzdHJva2Uuam9pbnN0eWxlID0gb3B0aW9ucy5saW5lSm9pbjtcblxuXHRcdH0gZWxzZSBpZiAoc3Ryb2tlKSB7XG5cdFx0XHRjb250YWluZXIucmVtb3ZlQ2hpbGQoc3Ryb2tlKTtcblx0XHRcdGxheWVyLl9zdHJva2UgPSBudWxsO1xuXHRcdH1cblxuXHRcdGlmIChvcHRpb25zLmZpbGwpIHtcblx0XHRcdGlmICghZmlsbCkge1xuXHRcdFx0XHRmaWxsID0gbGF5ZXIuX2ZpbGwgPSBMLlNWRy5jcmVhdGUoJ2ZpbGwnKTtcblx0XHRcdH1cblx0XHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZChmaWxsKTtcblx0XHRcdGZpbGwuY29sb3IgPSBvcHRpb25zLmZpbGxDb2xvciB8fCBvcHRpb25zLmNvbG9yO1xuXHRcdFx0ZmlsbC5vcGFjaXR5ID0gb3B0aW9ucy5maWxsT3BhY2l0eTtcblxuXHRcdH0gZWxzZSBpZiAoZmlsbCkge1xuXHRcdFx0Y29udGFpbmVyLnJlbW92ZUNoaWxkKGZpbGwpO1xuXHRcdFx0bGF5ZXIuX2ZpbGwgPSBudWxsO1xuXHRcdH1cblx0fSxcblxuXHRfdXBkYXRlQ2lyY2xlOiBmdW5jdGlvbiAobGF5ZXIpIHtcblx0XHR2YXIgcCA9IGxheWVyLl9wb2ludC5yb3VuZCgpLFxuXHRcdCAgICByID0gTWF0aC5yb3VuZChsYXllci5fcmFkaXVzKSxcblx0XHQgICAgcjIgPSBNYXRoLnJvdW5kKGxheWVyLl9yYWRpdXNZIHx8IHIpO1xuXG5cdFx0dGhpcy5fc2V0UGF0aChsYXllciwgbGF5ZXIuX2VtcHR5KCkgPyAnTTAgMCcgOlxuXHRcdFx0XHQnQUwgJyArIHAueCArICcsJyArIHAueSArICcgJyArIHIgKyAnLCcgKyByMiArICcgMCwnICsgKDY1NTM1ICogMzYwKSk7XG5cdH0sXG5cblx0X3NldFBhdGg6IGZ1bmN0aW9uIChsYXllciwgcGF0aCkge1xuXHRcdGxheWVyLl9wYXRoLnYgPSBwYXRoO1xuXHR9LFxuXG5cdF9icmluZ1RvRnJvbnQ6IGZ1bmN0aW9uIChsYXllcikge1xuXHRcdEwuRG9tVXRpbC50b0Zyb250KGxheWVyLl9jb250YWluZXIpO1xuXHR9LFxuXG5cdF9icmluZ1RvQmFjazogZnVuY3Rpb24gKGxheWVyKSB7XG5cdFx0TC5Eb21VdGlsLnRvQmFjayhsYXllci5fY29udGFpbmVyKTtcblx0fVxufSk7XG5cbmlmIChMLkJyb3dzZXIudm1sKSB7XG5cdEwuU1ZHLmNyZWF0ZSA9IChmdW5jdGlvbiAoKSB7XG5cdFx0dHJ5IHtcblx0XHRcdGRvY3VtZW50Lm5hbWVzcGFjZXMuYWRkKCdsdm1sJywgJ3VybjpzY2hlbWFzLW1pY3Jvc29mdC1jb206dm1sJyk7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRcdFx0cmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJzxsdm1sOicgKyBuYW1lICsgJyBjbGFzcz1cImx2bWxcIj4nKTtcblx0XHRcdH07XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0XHRcdHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCc8JyArIG5hbWUgKyAnIHhtbG5zPVwidXJuOnNjaGVtYXMtbWljcm9zb2Z0LmNvbTp2bWxcIiBjbGFzcz1cImx2bWxcIj4nKTtcblx0XHRcdH07XG5cdFx0fVxuXHR9KSgpO1xufVxuXG5cblxuLypcbiAqIEwuQ2FudmFzIGhhbmRsZXMgQ2FudmFzIHZlY3RvciBsYXllcnMgcmVuZGVyaW5nIGFuZCBtb3VzZSBldmVudHMgaGFuZGxpbmcuIEFsbCBDYW52YXMtc3BlY2lmaWMgY29kZSBnb2VzIGhlcmUuXG4gKi9cblxuTC5DYW52YXMgPSBMLlJlbmRlcmVyLmV4dGVuZCh7XG5cblx0b25BZGQ6IGZ1bmN0aW9uICgpIHtcblx0XHRMLlJlbmRlcmVyLnByb3RvdHlwZS5vbkFkZC5jYWxsKHRoaXMpO1xuXG5cdFx0dGhpcy5fbGF5ZXJzID0gdGhpcy5fbGF5ZXJzIHx8IHt9O1xuXG5cdFx0Ly8gUmVkcmF3IHZlY3RvcnMgc2luY2UgY2FudmFzIGlzIGNsZWFyZWQgdXBvbiByZW1vdmFsLFxuXHRcdC8vIGluIGNhc2Ugb2YgcmVtb3ZpbmcgdGhlIHJlbmRlcmVyIGl0c2VsZiBmcm9tIHRoZSBtYXAuXG5cdFx0dGhpcy5fZHJhdygpO1xuXHR9LFxuXG5cdF9pbml0Q29udGFpbmVyOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGNvbnRhaW5lciA9IHRoaXMuX2NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXG5cdFx0TC5Eb21FdmVudFxuXHRcdFx0Lm9uKGNvbnRhaW5lciwgJ21vdXNlbW92ZScsIEwuVXRpbC50aHJvdHRsZSh0aGlzLl9vbk1vdXNlTW92ZSwgMzIsIHRoaXMpLCB0aGlzKVxuXHRcdFx0Lm9uKGNvbnRhaW5lciwgJ2NsaWNrIGRibGNsaWNrIG1vdXNlZG93biBtb3VzZXVwIGNvbnRleHRtZW51JywgdGhpcy5fb25DbGljaywgdGhpcylcblx0XHRcdC5vbihjb250YWluZXIsICdtb3VzZW91dCcsIHRoaXMuX2hhbmRsZU1vdXNlT3V0LCB0aGlzKTtcblxuXHRcdHRoaXMuX2N0eCA9IGNvbnRhaW5lci5nZXRDb250ZXh0KCcyZCcpO1xuXHR9LFxuXG5cdF91cGRhdGU6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5fbWFwLl9hbmltYXRpbmdab29tICYmIHRoaXMuX2JvdW5kcykgeyByZXR1cm47IH1cblxuXHRcdHRoaXMuX2RyYXduTGF5ZXJzID0ge307XG5cblx0XHRMLlJlbmRlcmVyLnByb3RvdHlwZS5fdXBkYXRlLmNhbGwodGhpcyk7XG5cblx0XHR2YXIgYiA9IHRoaXMuX2JvdW5kcyxcblx0XHQgICAgY29udGFpbmVyID0gdGhpcy5fY29udGFpbmVyLFxuXHRcdCAgICBzaXplID0gYi5nZXRTaXplKCksXG5cdFx0ICAgIG0gPSBMLkJyb3dzZXIucmV0aW5hID8gMiA6IDE7XG5cblx0XHRMLkRvbVV0aWwuc2V0UG9zaXRpb24oY29udGFpbmVyLCBiLm1pbik7XG5cblx0XHQvLyBzZXQgY2FudmFzIHNpemUgKGFsc28gY2xlYXJpbmcgaXQpOyB1c2UgZG91YmxlIHNpemUgb24gcmV0aW5hXG5cdFx0Y29udGFpbmVyLndpZHRoID0gbSAqIHNpemUueDtcblx0XHRjb250YWluZXIuaGVpZ2h0ID0gbSAqIHNpemUueTtcblx0XHRjb250YWluZXIuc3R5bGUud2lkdGggPSBzaXplLnggKyAncHgnO1xuXHRcdGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBzaXplLnkgKyAncHgnO1xuXG5cdFx0aWYgKEwuQnJvd3Nlci5yZXRpbmEpIHtcblx0XHRcdHRoaXMuX2N0eC5zY2FsZSgyLCAyKTtcblx0XHR9XG5cblx0XHQvLyB0cmFuc2xhdGUgc28gd2UgdXNlIHRoZSBzYW1lIHBhdGggY29vcmRpbmF0ZXMgYWZ0ZXIgY2FudmFzIGVsZW1lbnQgbW92ZXNcblx0XHR0aGlzLl9jdHgudHJhbnNsYXRlKC1iLm1pbi54LCAtYi5taW4ueSk7XG5cdH0sXG5cblx0X2luaXRQYXRoOiBmdW5jdGlvbiAobGF5ZXIpIHtcblx0XHR0aGlzLl9sYXllcnNbTC5zdGFtcChsYXllcildID0gbGF5ZXI7XG5cdH0sXG5cblx0X2FkZFBhdGg6IEwuVXRpbC5mYWxzZUZuLFxuXG5cdF9yZW1vdmVQYXRoOiBmdW5jdGlvbiAobGF5ZXIpIHtcblx0XHRsYXllci5fcmVtb3ZlZCA9IHRydWU7XG5cdFx0dGhpcy5fcmVxdWVzdFJlZHJhdyhsYXllcik7XG5cdH0sXG5cblx0X3VwZGF0ZVBhdGg6IGZ1bmN0aW9uIChsYXllcikge1xuXHRcdHRoaXMuX3JlZHJhd0JvdW5kcyA9IGxheWVyLl9weEJvdW5kcztcblx0XHR0aGlzLl9kcmF3KHRydWUpO1xuXHRcdGxheWVyLl9wcm9qZWN0KCk7XG5cdFx0bGF5ZXIuX3VwZGF0ZSgpO1xuXHRcdHRoaXMuX2RyYXcoKTtcblx0XHR0aGlzLl9yZWRyYXdCb3VuZHMgPSBudWxsO1xuXHR9LFxuXG5cdF91cGRhdGVTdHlsZTogZnVuY3Rpb24gKGxheWVyKSB7XG5cdFx0dGhpcy5fcmVxdWVzdFJlZHJhdyhsYXllcik7XG5cdH0sXG5cblx0X3JlcXVlc3RSZWRyYXc6IGZ1bmN0aW9uIChsYXllcikge1xuXHRcdGlmICghdGhpcy5fbWFwKSB7IHJldHVybjsgfVxuXG5cdFx0dmFyIHBhZGRpbmcgPSAobGF5ZXIub3B0aW9ucy53ZWlnaHQgfHwgMCkgKyAxO1xuXHRcdHRoaXMuX3JlZHJhd0JvdW5kcyA9IHRoaXMuX3JlZHJhd0JvdW5kcyB8fCBuZXcgTC5Cb3VuZHMoKTtcblx0XHR0aGlzLl9yZWRyYXdCb3VuZHMuZXh0ZW5kKGxheWVyLl9weEJvdW5kcy5taW4uc3VidHJhY3QoW3BhZGRpbmcsIHBhZGRpbmddKSk7XG5cdFx0dGhpcy5fcmVkcmF3Qm91bmRzLmV4dGVuZChsYXllci5fcHhCb3VuZHMubWF4LmFkZChbcGFkZGluZywgcGFkZGluZ10pKTtcblxuXHRcdHRoaXMuX3JlZHJhd1JlcXVlc3QgPSB0aGlzLl9yZWRyYXdSZXF1ZXN0IHx8IEwuVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKHRoaXMuX3JlZHJhdywgdGhpcyk7XG5cdH0sXG5cblx0X3JlZHJhdzogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuX3JlZHJhd1JlcXVlc3QgPSBudWxsO1xuXG5cdFx0dGhpcy5fZHJhdyh0cnVlKTsgLy8gY2xlYXIgbGF5ZXJzIGluIHJlZHJhdyBib3VuZHNcblx0XHR0aGlzLl9kcmF3KCk7IC8vIGRyYXcgbGF5ZXJzXG5cblx0XHR0aGlzLl9yZWRyYXdCb3VuZHMgPSBudWxsO1xuXHR9LFxuXG5cdF9kcmF3OiBmdW5jdGlvbiAoY2xlYXIpIHtcblx0XHR0aGlzLl9jbGVhciA9IGNsZWFyO1xuXHRcdHZhciBsYXllciwgYm91bmRzID0gdGhpcy5fcmVkcmF3Qm91bmRzO1xuXHRcdHRoaXMuX2N0eC5zYXZlKCk7XG5cdFx0aWYgKGJvdW5kcykge1xuXHRcdFx0dGhpcy5fY3R4LmJlZ2luUGF0aCgpO1xuXHRcdFx0dGhpcy5fY3R4LnJlY3QoYm91bmRzLm1pbi54LCBib3VuZHMubWluLnksIGJvdW5kcy5tYXgueCAtIGJvdW5kcy5taW4ueCwgYm91bmRzLm1heC55IC0gYm91bmRzLm1pbi55KTtcblx0XHRcdHRoaXMuX2N0eC5jbGlwKCk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaWQgaW4gdGhpcy5fbGF5ZXJzKSB7XG5cdFx0XHRsYXllciA9IHRoaXMuX2xheWVyc1tpZF07XG5cdFx0XHRpZiAoIWJvdW5kcyB8fCBsYXllci5fcHhCb3VuZHMuaW50ZXJzZWN0cyhib3VuZHMpKSB7XG5cdFx0XHRcdGxheWVyLl91cGRhdGVQYXRoKCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoY2xlYXIgJiYgbGF5ZXIuX3JlbW92ZWQpIHtcblx0XHRcdFx0ZGVsZXRlIGxheWVyLl9yZW1vdmVkO1xuXHRcdFx0XHRkZWxldGUgdGhpcy5fbGF5ZXJzW2lkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5fY3R4LnJlc3RvcmUoKTsgIC8vIFJlc3RvcmUgc3RhdGUgYmVmb3JlIGNsaXBwaW5nLlxuXHR9LFxuXG5cdF91cGRhdGVQb2x5OiBmdW5jdGlvbiAobGF5ZXIsIGNsb3NlZCkge1xuXG5cdFx0dmFyIGksIGosIGxlbjIsIHAsXG5cdFx0ICAgIHBhcnRzID0gbGF5ZXIuX3BhcnRzLFxuXHRcdCAgICBsZW4gPSBwYXJ0cy5sZW5ndGgsXG5cdFx0ICAgIGN0eCA9IHRoaXMuX2N0eDtcblxuXHRcdGlmICghbGVuKSB7IHJldHVybjsgfVxuXG5cdFx0dGhpcy5fZHJhd25MYXllcnNbbGF5ZXIuX2xlYWZsZXRfaWRdID0gbGF5ZXI7XG5cblx0XHRjdHguYmVnaW5QYXRoKCk7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGZvciAoaiA9IDAsIGxlbjIgPSBwYXJ0c1tpXS5sZW5ndGg7IGogPCBsZW4yOyBqKyspIHtcblx0XHRcdFx0cCA9IHBhcnRzW2ldW2pdO1xuXHRcdFx0XHRjdHhbaiA/ICdsaW5lVG8nIDogJ21vdmVUbyddKHAueCwgcC55KTtcblx0XHRcdH1cblx0XHRcdGlmIChjbG9zZWQpIHtcblx0XHRcdFx0Y3R4LmNsb3NlUGF0aCgpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuX2ZpbGxTdHJva2UoY3R4LCBsYXllcik7XG5cblx0XHQvLyBUT0RPIG9wdGltaXphdGlvbjogMSBmaWxsL3N0cm9rZSBmb3IgYWxsIGZlYXR1cmVzIHdpdGggZXF1YWwgc3R5bGUgaW5zdGVhZCBvZiAxIGZvciBlYWNoIGZlYXR1cmVcblx0fSxcblxuXHRfdXBkYXRlQ2lyY2xlOiBmdW5jdGlvbiAobGF5ZXIpIHtcblxuXHRcdGlmIChsYXllci5fZW1wdHkoKSkgeyByZXR1cm47IH1cblxuXHRcdHZhciBwID0gbGF5ZXIuX3BvaW50LFxuXHRcdCAgICBjdHggPSB0aGlzLl9jdHgsXG5cdFx0ICAgIHIgPSBsYXllci5fcmFkaXVzLFxuXHRcdCAgICBzID0gKGxheWVyLl9yYWRpdXNZIHx8IHIpIC8gcjtcblxuXHRcdGlmIChzICE9PSAxKSB7XG5cdFx0XHRjdHguc2F2ZSgpO1xuXHRcdFx0Y3R4LnNjYWxlKDEsIHMpO1xuXHRcdH1cblxuXHRcdGN0eC5iZWdpblBhdGgoKTtcblx0XHRjdHguYXJjKHAueCwgcC55IC8gcywgciwgMCwgTWF0aC5QSSAqIDIsIGZhbHNlKTtcblxuXHRcdGlmIChzICE9PSAxKSB7XG5cdFx0XHRjdHgucmVzdG9yZSgpO1xuXHRcdH1cblxuXHRcdHRoaXMuX2ZpbGxTdHJva2UoY3R4LCBsYXllcik7XG5cdH0sXG5cblx0X2ZpbGxTdHJva2U6IGZ1bmN0aW9uIChjdHgsIGxheWVyKSB7XG5cdFx0dmFyIGNsZWFyID0gdGhpcy5fY2xlYXIsXG5cdFx0ICAgIG9wdGlvbnMgPSBsYXllci5vcHRpb25zO1xuXG5cdFx0Y3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IGNsZWFyID8gJ2Rlc3RpbmF0aW9uLW91dCcgOiAnc291cmNlLW92ZXInO1xuXG5cdFx0aWYgKG9wdGlvbnMuZmlsbCkge1xuXHRcdFx0Y3R4Lmdsb2JhbEFscGhhID0gY2xlYXIgPyAxIDogb3B0aW9ucy5maWxsT3BhY2l0eTtcblx0XHRcdGN0eC5maWxsU3R5bGUgPSBvcHRpb25zLmZpbGxDb2xvciB8fCBvcHRpb25zLmNvbG9yO1xuXHRcdFx0Y3R4LmZpbGwob3B0aW9ucy5maWxsUnVsZSB8fCAnZXZlbm9kZCcpO1xuXHRcdH1cblxuXHRcdGlmIChvcHRpb25zLnN0cm9rZSAmJiBvcHRpb25zLndlaWdodCAhPT0gMCkge1xuXHRcdFx0Y3R4Lmdsb2JhbEFscGhhID0gY2xlYXIgPyAxIDogb3B0aW9ucy5vcGFjaXR5O1xuXG5cdFx0XHQvLyBpZiBjbGVhcmluZyBzaGFwZSwgZG8gaXQgd2l0aCB0aGUgcHJldmlvdXNseSBkcmF3biBsaW5lIHdpZHRoXG5cdFx0XHRsYXllci5fcHJldldlaWdodCA9IGN0eC5saW5lV2lkdGggPSBjbGVhciA/IGxheWVyLl9wcmV2V2VpZ2h0ICsgMSA6IG9wdGlvbnMud2VpZ2h0O1xuXG5cdFx0XHRjdHguc3Ryb2tlU3R5bGUgPSBvcHRpb25zLmNvbG9yO1xuXHRcdFx0Y3R4LmxpbmVDYXAgPSBvcHRpb25zLmxpbmVDYXA7XG5cdFx0XHRjdHgubGluZUpvaW4gPSBvcHRpb25zLmxpbmVKb2luO1xuXHRcdFx0Y3R4LnN0cm9rZSgpO1xuXHRcdH1cblx0fSxcblxuXHQvLyBDYW52YXMgb2J2aW91c2x5IGRvZXNuJ3QgaGF2ZSBtb3VzZSBldmVudHMgZm9yIGluZGl2aWR1YWwgZHJhd24gb2JqZWN0cyxcblx0Ly8gc28gd2UgZW11bGF0ZSB0aGF0IGJ5IGNhbGN1bGF0aW5nIHdoYXQncyB1bmRlciB0aGUgbW91c2Ugb24gbW91c2Vtb3ZlL2NsaWNrIG1hbnVhbGx5XG5cblx0X29uQ2xpY2s6IGZ1bmN0aW9uIChlKSB7XG5cdFx0dmFyIHBvaW50ID0gdGhpcy5fbWFwLm1vdXNlRXZlbnRUb0xheWVyUG9pbnQoZSksIGxheWVycyA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaWQgaW4gdGhpcy5fbGF5ZXJzKSB7XG5cdFx0XHRpZiAodGhpcy5fbGF5ZXJzW2lkXS5fY29udGFpbnNQb2ludChwb2ludCkpIHtcblx0XHRcdFx0TC5Eb21FdmVudC5fZmFrZVN0b3AoZSk7XG5cdFx0XHRcdGxheWVycy5wdXNoKHRoaXMuX2xheWVyc1tpZF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAobGF5ZXJzLmxlbmd0aCkgIHtcblx0XHRcdHRoaXMuX2ZpcmVFdmVudChsYXllcnMsIGUpO1xuXHRcdH1cblx0fSxcblxuXHRfb25Nb3VzZU1vdmU6IGZ1bmN0aW9uIChlKSB7XG5cdFx0aWYgKCF0aGlzLl9tYXAgfHwgdGhpcy5fbWFwLmRyYWdnaW5nLl9kcmFnZ2FibGUuX21vdmluZyB8fCB0aGlzLl9tYXAuX2FuaW1hdGluZ1pvb20pIHsgcmV0dXJuOyB9XG5cblx0XHR2YXIgcG9pbnQgPSB0aGlzLl9tYXAubW91c2VFdmVudFRvTGF5ZXJQb2ludChlKTtcblx0XHR0aGlzLl9oYW5kbGVNb3VzZU91dChlLCBwb2ludCk7XG5cdFx0dGhpcy5faGFuZGxlTW91c2VIb3ZlcihlLCBwb2ludCk7XG5cdH0sXG5cblxuXHRfaGFuZGxlTW91c2VPdXQ6IGZ1bmN0aW9uIChlLCBwb2ludCkge1xuXHRcdHZhciBsYXllciA9IHRoaXMuX2hvdmVyZWRMYXllcjtcblx0XHRpZiAobGF5ZXIgJiYgKGUudHlwZSA9PT0gJ21vdXNlb3V0JyB8fCAhbGF5ZXIuX2NvbnRhaW5zUG9pbnQocG9pbnQpKSkge1xuXHRcdFx0Ly8gaWYgd2UncmUgbGVhdmluZyB0aGUgbGF5ZXIsIGZpcmUgbW91c2VvdXRcblx0XHRcdEwuRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl9jb250YWluZXIsICdsZWFmbGV0LWludGVyYWN0aXZlJyk7XG5cdFx0XHR0aGlzLl9maXJlRXZlbnQoW2xheWVyXSwgZSwgJ21vdXNlb3V0Jyk7XG5cdFx0XHR0aGlzLl9ob3ZlcmVkTGF5ZXIgPSBudWxsO1xuXHRcdH1cblx0fSxcblxuXHRfaGFuZGxlTW91c2VIb3ZlcjogZnVuY3Rpb24gKGUsIHBvaW50KSB7XG5cdFx0dmFyIGlkLCBsYXllcjtcblx0XHRpZiAoIXRoaXMuX2hvdmVyZWRMYXllcikge1xuXHRcdFx0Zm9yIChpZCBpbiB0aGlzLl9kcmF3bkxheWVycykge1xuXHRcdFx0XHRsYXllciA9IHRoaXMuX2RyYXduTGF5ZXJzW2lkXTtcblx0XHRcdFx0aWYgKGxheWVyLm9wdGlvbnMuaW50ZXJhY3RpdmUgJiYgbGF5ZXIuX2NvbnRhaW5zUG9pbnQocG9pbnQpKSB7XG5cdFx0XHRcdFx0TC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX2NvbnRhaW5lciwgJ2xlYWZsZXQtaW50ZXJhY3RpdmUnKTsgLy8gY2hhbmdlIGN1cnNvclxuXHRcdFx0XHRcdHRoaXMuX2ZpcmVFdmVudChbbGF5ZXJdLCBlLCAnbW91c2VvdmVyJyk7XG5cdFx0XHRcdFx0dGhpcy5faG92ZXJlZExheWVyID0gbGF5ZXI7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHRoaXMuX2hvdmVyZWRMYXllcikge1xuXHRcdFx0dGhpcy5fZmlyZUV2ZW50KFt0aGlzLl9ob3ZlcmVkTGF5ZXJdLCBlKTtcblx0XHR9XG5cdH0sXG5cblx0X2ZpcmVFdmVudDogZnVuY3Rpb24gKGxheWVycywgZSwgdHlwZSkge1xuXHRcdHRoaXMuX21hcC5fZmlyZURPTUV2ZW50KGUsIHR5cGUgfHwgZS50eXBlLCBsYXllcnMpO1xuXHR9LFxuXG5cdC8vIFRPRE8gX2JyaW5nVG9Gcm9udCAmIF9icmluZ1RvQmFjaywgcHJldHR5IHRyaWNreVxuXG5cdF9icmluZ1RvRnJvbnQ6IEwuVXRpbC5mYWxzZUZuLFxuXHRfYnJpbmdUb0JhY2s6IEwuVXRpbC5mYWxzZUZuXG59KTtcblxuTC5Ccm93c2VyLmNhbnZhcyA9IChmdW5jdGlvbiAoKSB7XG5cdHJldHVybiAhIWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpLmdldENvbnRleHQ7XG59KCkpO1xuXG5MLmNhbnZhcyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdHJldHVybiBMLkJyb3dzZXIuY2FudmFzID8gbmV3IEwuQ2FudmFzKG9wdGlvbnMpIDogbnVsbDtcbn07XG5cbkwuUG9seWxpbmUucHJvdG90eXBlLl9jb250YWluc1BvaW50ID0gZnVuY3Rpb24gKHAsIGNsb3NlZCkge1xuXHR2YXIgaSwgaiwgaywgbGVuLCBsZW4yLCBwYXJ0LFxuXHQgICAgdyA9IHRoaXMuX2NsaWNrVG9sZXJhbmNlKCk7XG5cblx0aWYgKCF0aGlzLl9weEJvdW5kcy5jb250YWlucyhwKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHQvLyBoaXQgZGV0ZWN0aW9uIGZvciBwb2x5bGluZXNcblx0Zm9yIChpID0gMCwgbGVuID0gdGhpcy5fcGFydHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRwYXJ0ID0gdGhpcy5fcGFydHNbaV07XG5cblx0XHRmb3IgKGogPSAwLCBsZW4yID0gcGFydC5sZW5ndGgsIGsgPSBsZW4yIC0gMTsgaiA8IGxlbjI7IGsgPSBqKyspIHtcblx0XHRcdGlmICghY2xvc2VkICYmIChqID09PSAwKSkgeyBjb250aW51ZTsgfVxuXG5cdFx0XHRpZiAoTC5MaW5lVXRpbC5wb2ludFRvU2VnbWVudERpc3RhbmNlKHAsIHBhcnRba10sIHBhcnRbal0pIDw9IHcpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiBmYWxzZTtcbn07XG5cbkwuUG9seWdvbi5wcm90b3R5cGUuX2NvbnRhaW5zUG9pbnQgPSBmdW5jdGlvbiAocCkge1xuXHR2YXIgaW5zaWRlID0gZmFsc2UsXG5cdCAgICBwYXJ0LCBwMSwgcDIsIGksIGosIGssIGxlbiwgbGVuMjtcblxuXHRpZiAoIXRoaXMuX3B4Qm91bmRzLmNvbnRhaW5zKHApKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdC8vIHJheSBjYXN0aW5nIGFsZ29yaXRobSBmb3IgZGV0ZWN0aW5nIGlmIHBvaW50IGlzIGluIHBvbHlnb25cblx0Zm9yIChpID0gMCwgbGVuID0gdGhpcy5fcGFydHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRwYXJ0ID0gdGhpcy5fcGFydHNbaV07XG5cblx0XHRmb3IgKGogPSAwLCBsZW4yID0gcGFydC5sZW5ndGgsIGsgPSBsZW4yIC0gMTsgaiA8IGxlbjI7IGsgPSBqKyspIHtcblx0XHRcdHAxID0gcGFydFtqXTtcblx0XHRcdHAyID0gcGFydFtrXTtcblxuXHRcdFx0aWYgKCgocDEueSA+IHAueSkgIT09IChwMi55ID4gcC55KSkgJiYgKHAueCA8IChwMi54IC0gcDEueCkgKiAocC55IC0gcDEueSkgLyAocDIueSAtIHAxLnkpICsgcDEueCkpIHtcblx0XHRcdFx0aW5zaWRlID0gIWluc2lkZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBhbHNvIGNoZWNrIGlmIGl0J3Mgb24gcG9seWdvbiBzdHJva2Vcblx0cmV0dXJuIGluc2lkZSB8fCBMLlBvbHlsaW5lLnByb3RvdHlwZS5fY29udGFpbnNQb2ludC5jYWxsKHRoaXMsIHAsIHRydWUpO1xufTtcblxuTC5DaXJjbGVNYXJrZXIucHJvdG90eXBlLl9jb250YWluc1BvaW50ID0gZnVuY3Rpb24gKHApIHtcblx0cmV0dXJuIHAuZGlzdGFuY2VUbyh0aGlzLl9wb2ludCkgPD0gdGhpcy5fcmFkaXVzICsgdGhpcy5fY2xpY2tUb2xlcmFuY2UoKTtcbn07XG5cblxuXG4vKlxyXG4gKiBMLkdlb0pTT04gdHVybnMgYW55IEdlb0pTT04gZGF0YSBpbnRvIGEgTGVhZmxldCBsYXllci5cclxuICovXHJcblxyXG5MLkdlb0pTT04gPSBMLkZlYXR1cmVHcm91cC5leHRlbmQoe1xyXG5cclxuXHRpbml0aWFsaXplOiBmdW5jdGlvbiAoZ2VvanNvbiwgb3B0aW9ucykge1xyXG5cdFx0TC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xyXG5cclxuXHRcdHRoaXMuX2xheWVycyA9IHt9O1xyXG5cclxuXHRcdGlmIChnZW9qc29uKSB7XHJcblx0XHRcdHRoaXMuYWRkRGF0YShnZW9qc29uKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRhZGREYXRhOiBmdW5jdGlvbiAoZ2VvanNvbikge1xyXG5cdFx0dmFyIGZlYXR1cmVzID0gTC5VdGlsLmlzQXJyYXkoZ2VvanNvbikgPyBnZW9qc29uIDogZ2VvanNvbi5mZWF0dXJlcyxcclxuXHRcdCAgICBpLCBsZW4sIGZlYXR1cmU7XHJcblxyXG5cdFx0aWYgKGZlYXR1cmVzKSB7XHJcblx0XHRcdGZvciAoaSA9IDAsIGxlbiA9IGZlYXR1cmVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdFx0Ly8gb25seSBhZGQgdGhpcyBpZiBnZW9tZXRyeSBvciBnZW9tZXRyaWVzIGFyZSBzZXQgYW5kIG5vdCBudWxsXHJcblx0XHRcdFx0ZmVhdHVyZSA9IGZlYXR1cmVzW2ldO1xyXG5cdFx0XHRcdGlmIChmZWF0dXJlLmdlb21ldHJpZXMgfHwgZmVhdHVyZS5nZW9tZXRyeSB8fCBmZWF0dXJlLmZlYXR1cmVzIHx8IGZlYXR1cmUuY29vcmRpbmF0ZXMpIHtcclxuXHRcdFx0XHRcdHRoaXMuYWRkRGF0YShmZWF0dXJlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMuZmlsdGVyICYmICFvcHRpb25zLmZpbHRlcihnZW9qc29uKSkgeyByZXR1cm4gdGhpczsgfVxyXG5cclxuXHRcdHZhciBsYXllciA9IEwuR2VvSlNPTi5nZW9tZXRyeVRvTGF5ZXIoZ2VvanNvbiwgb3B0aW9ucyk7XHJcblx0XHRpZiAoIWxheWVyKSB7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fVxyXG5cdFx0bGF5ZXIuZmVhdHVyZSA9IEwuR2VvSlNPTi5hc0ZlYXR1cmUoZ2VvanNvbik7XHJcblxyXG5cdFx0bGF5ZXIuZGVmYXVsdE9wdGlvbnMgPSBsYXllci5vcHRpb25zO1xyXG5cdFx0dGhpcy5yZXNldFN0eWxlKGxheWVyKTtcclxuXHJcblx0XHRpZiAob3B0aW9ucy5vbkVhY2hGZWF0dXJlKSB7XHJcblx0XHRcdG9wdGlvbnMub25FYWNoRmVhdHVyZShnZW9qc29uLCBsYXllcik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuYWRkTGF5ZXIobGF5ZXIpO1xyXG5cdH0sXHJcblxyXG5cdHJlc2V0U3R5bGU6IGZ1bmN0aW9uIChsYXllcikge1xyXG5cdFx0Ly8gcmVzZXQgYW55IGN1c3RvbSBzdHlsZXNcclxuXHRcdGxheWVyLm9wdGlvbnMgPSBsYXllci5kZWZhdWx0T3B0aW9ucztcclxuXHRcdHRoaXMuX3NldExheWVyU3R5bGUobGF5ZXIsIHRoaXMub3B0aW9ucy5zdHlsZSk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRzZXRTdHlsZTogZnVuY3Rpb24gKHN0eWxlKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5lYWNoTGF5ZXIoZnVuY3Rpb24gKGxheWVyKSB7XHJcblx0XHRcdHRoaXMuX3NldExheWVyU3R5bGUobGF5ZXIsIHN0eWxlKTtcclxuXHRcdH0sIHRoaXMpO1xyXG5cdH0sXHJcblxyXG5cdF9zZXRMYXllclN0eWxlOiBmdW5jdGlvbiAobGF5ZXIsIHN0eWxlKSB7XHJcblx0XHRpZiAodHlwZW9mIHN0eWxlID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHN0eWxlID0gc3R5bGUobGF5ZXIuZmVhdHVyZSk7XHJcblx0XHR9XHJcblx0XHRpZiAobGF5ZXIuc2V0U3R5bGUpIHtcclxuXHRcdFx0bGF5ZXIuc2V0U3R5bGUoc3R5bGUpO1xyXG5cdFx0fVxyXG5cdH1cclxufSk7XHJcblxyXG5MLmV4dGVuZChMLkdlb0pTT04sIHtcclxuXHRnZW9tZXRyeVRvTGF5ZXI6IGZ1bmN0aW9uIChnZW9qc29uLCBvcHRpb25zKSB7XHJcblxyXG5cdFx0dmFyIGdlb21ldHJ5ID0gZ2VvanNvbi50eXBlID09PSAnRmVhdHVyZScgPyBnZW9qc29uLmdlb21ldHJ5IDogZ2VvanNvbixcclxuXHRcdCAgICBjb29yZHMgPSBnZW9tZXRyeSA/IGdlb21ldHJ5LmNvb3JkaW5hdGVzIDogbnVsbCxcclxuXHRcdCAgICBsYXllcnMgPSBbXSxcclxuXHRcdCAgICBwb2ludFRvTGF5ZXIgPSBvcHRpb25zICYmIG9wdGlvbnMucG9pbnRUb0xheWVyLFxyXG5cdFx0ICAgIGNvb3Jkc1RvTGF0TG5nID0gb3B0aW9ucyAmJiBvcHRpb25zLmNvb3Jkc1RvTGF0TG5nIHx8IHRoaXMuY29vcmRzVG9MYXRMbmcsXHJcblx0XHQgICAgbGF0bG5nLCBsYXRsbmdzLCBpLCBsZW47XHJcblxyXG5cdFx0aWYgKCFjb29yZHMgJiYgIWdlb21ldHJ5KSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN3aXRjaCAoZ2VvbWV0cnkudHlwZSkge1xyXG5cdFx0Y2FzZSAnUG9pbnQnOlxyXG5cdFx0XHRsYXRsbmcgPSBjb29yZHNUb0xhdExuZyhjb29yZHMpO1xyXG5cdFx0XHRyZXR1cm4gcG9pbnRUb0xheWVyID8gcG9pbnRUb0xheWVyKGdlb2pzb24sIGxhdGxuZykgOiBuZXcgTC5NYXJrZXIobGF0bG5nKTtcclxuXHJcblx0XHRjYXNlICdNdWx0aVBvaW50JzpcclxuXHRcdFx0Zm9yIChpID0gMCwgbGVuID0gY29vcmRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdFx0bGF0bG5nID0gY29vcmRzVG9MYXRMbmcoY29vcmRzW2ldKTtcclxuXHRcdFx0XHRsYXllcnMucHVzaChwb2ludFRvTGF5ZXIgPyBwb2ludFRvTGF5ZXIoZ2VvanNvbiwgbGF0bG5nKSA6IG5ldyBMLk1hcmtlcihsYXRsbmcpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gbmV3IEwuRmVhdHVyZUdyb3VwKGxheWVycyk7XHJcblxyXG5cdFx0Y2FzZSAnTGluZVN0cmluZyc6XHJcblx0XHRjYXNlICdNdWx0aUxpbmVTdHJpbmcnOlxyXG5cdFx0XHRsYXRsbmdzID0gdGhpcy5jb29yZHNUb0xhdExuZ3MoY29vcmRzLCBnZW9tZXRyeS50eXBlID09PSAnTGluZVN0cmluZycgPyAwIDogMSwgY29vcmRzVG9MYXRMbmcpO1xyXG5cdFx0XHRyZXR1cm4gbmV3IEwuUG9seWxpbmUobGF0bG5ncywgb3B0aW9ucyk7XHJcblxyXG5cdFx0Y2FzZSAnUG9seWdvbic6XHJcblx0XHRjYXNlICdNdWx0aVBvbHlnb24nOlxyXG5cdFx0XHRsYXRsbmdzID0gdGhpcy5jb29yZHNUb0xhdExuZ3MoY29vcmRzLCBnZW9tZXRyeS50eXBlID09PSAnUG9seWdvbicgPyAxIDogMiwgY29vcmRzVG9MYXRMbmcpO1xyXG5cdFx0XHRyZXR1cm4gbmV3IEwuUG9seWdvbihsYXRsbmdzLCBvcHRpb25zKTtcclxuXHJcblx0XHRjYXNlICdHZW9tZXRyeUNvbGxlY3Rpb24nOlxyXG5cdFx0XHRmb3IgKGkgPSAwLCBsZW4gPSBnZW9tZXRyeS5nZW9tZXRyaWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdFx0dmFyIGxheWVyID0gdGhpcy5nZW9tZXRyeVRvTGF5ZXIoe1xyXG5cdFx0XHRcdFx0Z2VvbWV0cnk6IGdlb21ldHJ5Lmdlb21ldHJpZXNbaV0sXHJcblx0XHRcdFx0XHR0eXBlOiAnRmVhdHVyZScsXHJcblx0XHRcdFx0XHRwcm9wZXJ0aWVzOiBnZW9qc29uLnByb3BlcnRpZXNcclxuXHRcdFx0XHR9LCBvcHRpb25zKTtcclxuXHJcblx0XHRcdFx0aWYgKGxheWVyKSB7XHJcblx0XHRcdFx0XHRsYXllcnMucHVzaChsYXllcik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBuZXcgTC5GZWF0dXJlR3JvdXAobGF5ZXJzKTtcclxuXHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgR2VvSlNPTiBvYmplY3QuJyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Y29vcmRzVG9MYXRMbmc6IGZ1bmN0aW9uIChjb29yZHMpIHtcclxuXHRcdHJldHVybiBuZXcgTC5MYXRMbmcoY29vcmRzWzFdLCBjb29yZHNbMF0sIGNvb3Jkc1syXSk7XHJcblx0fSxcclxuXHJcblx0Y29vcmRzVG9MYXRMbmdzOiBmdW5jdGlvbiAoY29vcmRzLCBsZXZlbHNEZWVwLCBjb29yZHNUb0xhdExuZykge1xyXG5cdFx0dmFyIGxhdGxuZ3MgPSBbXTtcclxuXHJcblx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gY29vcmRzLmxlbmd0aCwgbGF0bG5nOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0bGF0bG5nID0gbGV2ZWxzRGVlcCA/XHJcblx0XHRcdCAgICAgICAgdGhpcy5jb29yZHNUb0xhdExuZ3MoY29vcmRzW2ldLCBsZXZlbHNEZWVwIC0gMSwgY29vcmRzVG9MYXRMbmcpIDpcclxuXHRcdFx0ICAgICAgICAoY29vcmRzVG9MYXRMbmcgfHwgdGhpcy5jb29yZHNUb0xhdExuZykoY29vcmRzW2ldKTtcclxuXHJcblx0XHRcdGxhdGxuZ3MucHVzaChsYXRsbmcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBsYXRsbmdzO1xyXG5cdH0sXHJcblxyXG5cdGxhdExuZ1RvQ29vcmRzOiBmdW5jdGlvbiAobGF0bG5nKSB7XHJcblx0XHRyZXR1cm4gbGF0bG5nLmFsdCAhPT0gdW5kZWZpbmVkID9cclxuXHRcdFx0XHRbbGF0bG5nLmxuZywgbGF0bG5nLmxhdCwgbGF0bG5nLmFsdF0gOlxyXG5cdFx0XHRcdFtsYXRsbmcubG5nLCBsYXRsbmcubGF0XTtcclxuXHR9LFxyXG5cclxuXHRsYXRMbmdzVG9Db29yZHM6IGZ1bmN0aW9uIChsYXRsbmdzLCBsZXZlbHNEZWVwLCBjbG9zZWQpIHtcclxuXHRcdHZhciBjb29yZHMgPSBbXTtcclxuXHJcblx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gbGF0bG5ncy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRjb29yZHMucHVzaChsZXZlbHNEZWVwID9cclxuXHRcdFx0XHRMLkdlb0pTT04ubGF0TG5nc1RvQ29vcmRzKGxhdGxuZ3NbaV0sIGxldmVsc0RlZXAgLSAxLCBjbG9zZWQpIDpcclxuXHRcdFx0XHRMLkdlb0pTT04ubGF0TG5nVG9Db29yZHMobGF0bG5nc1tpXSkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghbGV2ZWxzRGVlcCAmJiBjbG9zZWQpIHtcclxuXHRcdFx0Y29vcmRzLnB1c2goY29vcmRzWzBdKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gY29vcmRzO1xyXG5cdH0sXHJcblxyXG5cdGdldEZlYXR1cmU6IGZ1bmN0aW9uIChsYXllciwgbmV3R2VvbWV0cnkpIHtcclxuXHRcdHJldHVybiBsYXllci5mZWF0dXJlID9cclxuXHRcdFx0XHRMLmV4dGVuZCh7fSwgbGF5ZXIuZmVhdHVyZSwge2dlb21ldHJ5OiBuZXdHZW9tZXRyeX0pIDpcclxuXHRcdFx0XHRMLkdlb0pTT04uYXNGZWF0dXJlKG5ld0dlb21ldHJ5KTtcclxuXHR9LFxyXG5cclxuXHRhc0ZlYXR1cmU6IGZ1bmN0aW9uIChnZW9KU09OKSB7XHJcblx0XHRpZiAoZ2VvSlNPTi50eXBlID09PSAnRmVhdHVyZScpIHtcclxuXHRcdFx0cmV0dXJuIGdlb0pTT047XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0dHlwZTogJ0ZlYXR1cmUnLFxyXG5cdFx0XHRwcm9wZXJ0aWVzOiB7fSxcclxuXHRcdFx0Z2VvbWV0cnk6IGdlb0pTT05cclxuXHRcdH07XHJcblx0fVxyXG59KTtcclxuXHJcbnZhciBQb2ludFRvR2VvSlNPTiA9IHtcclxuXHR0b0dlb0pTT046IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBMLkdlb0pTT04uZ2V0RmVhdHVyZSh0aGlzLCB7XHJcblx0XHRcdHR5cGU6ICdQb2ludCcsXHJcblx0XHRcdGNvb3JkaW5hdGVzOiBMLkdlb0pTT04ubGF0TG5nVG9Db29yZHModGhpcy5nZXRMYXRMbmcoKSlcclxuXHRcdH0pO1xyXG5cdH1cclxufTtcclxuXHJcbkwuTWFya2VyLmluY2x1ZGUoUG9pbnRUb0dlb0pTT04pO1xyXG5MLkNpcmNsZS5pbmNsdWRlKFBvaW50VG9HZW9KU09OKTtcclxuTC5DaXJjbGVNYXJrZXIuaW5jbHVkZShQb2ludFRvR2VvSlNPTik7XHJcblxyXG5MLlBvbHlsaW5lLnByb3RvdHlwZS50b0dlb0pTT04gPSBmdW5jdGlvbiAoKSB7XHJcblx0dmFyIG11bHRpID0gIUwuUG9seWxpbmUuX2ZsYXQodGhpcy5fbGF0bG5ncyk7XHJcblxyXG5cdHZhciBjb29yZHMgPSBMLkdlb0pTT04ubGF0TG5nc1RvQ29vcmRzKHRoaXMuX2xhdGxuZ3MsIG11bHRpID8gMSA6IDApO1xyXG5cclxuXHRyZXR1cm4gTC5HZW9KU09OLmdldEZlYXR1cmUodGhpcywge1xyXG5cdFx0dHlwZTogKG11bHRpID8gJ011bHRpJyA6ICcnKSArICdMaW5lU3RyaW5nJyxcclxuXHRcdGNvb3JkaW5hdGVzOiBjb29yZHNcclxuXHR9KTtcclxufTtcclxuXHJcbkwuUG9seWdvbi5wcm90b3R5cGUudG9HZW9KU09OID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciBob2xlcyA9ICFMLlBvbHlsaW5lLl9mbGF0KHRoaXMuX2xhdGxuZ3MpLFxyXG5cdCAgICBtdWx0aSA9IGhvbGVzICYmICFMLlBvbHlsaW5lLl9mbGF0KHRoaXMuX2xhdGxuZ3NbMF0pO1xyXG5cclxuXHR2YXIgY29vcmRzID0gTC5HZW9KU09OLmxhdExuZ3NUb0Nvb3Jkcyh0aGlzLl9sYXRsbmdzLCBtdWx0aSA/IDIgOiBob2xlcyA/IDEgOiAwLCB0cnVlKTtcclxuXHJcblx0aWYgKCFob2xlcykge1xyXG5cdFx0Y29vcmRzID0gW2Nvb3Jkc107XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gTC5HZW9KU09OLmdldEZlYXR1cmUodGhpcywge1xyXG5cdFx0dHlwZTogKG11bHRpID8gJ011bHRpJyA6ICcnKSArICdQb2x5Z29uJyxcclxuXHRcdGNvb3JkaW5hdGVzOiBjb29yZHNcclxuXHR9KTtcclxufTtcclxuXHJcblxyXG5MLkxheWVyR3JvdXAuaW5jbHVkZSh7XHJcblx0dG9NdWx0aVBvaW50OiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgY29vcmRzID0gW107XHJcblxyXG5cdFx0dGhpcy5lYWNoTGF5ZXIoZnVuY3Rpb24gKGxheWVyKSB7XHJcblx0XHRcdGNvb3Jkcy5wdXNoKGxheWVyLnRvR2VvSlNPTigpLmdlb21ldHJ5LmNvb3JkaW5hdGVzKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBMLkdlb0pTT04uZ2V0RmVhdHVyZSh0aGlzLCB7XHJcblx0XHRcdHR5cGU6ICdNdWx0aVBvaW50JyxcclxuXHRcdFx0Y29vcmRpbmF0ZXM6IGNvb3Jkc1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0dG9HZW9KU09OOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0dmFyIHR5cGUgPSB0aGlzLmZlYXR1cmUgJiYgdGhpcy5mZWF0dXJlLmdlb21ldHJ5ICYmIHRoaXMuZmVhdHVyZS5nZW9tZXRyeS50eXBlO1xyXG5cclxuXHRcdGlmICh0eXBlID09PSAnTXVsdGlQb2ludCcpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMudG9NdWx0aVBvaW50KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGlzR2VvbWV0cnlDb2xsZWN0aW9uID0gdHlwZSA9PT0gJ0dlb21ldHJ5Q29sbGVjdGlvbicsXHJcblx0XHQgICAganNvbnMgPSBbXTtcclxuXHJcblx0XHR0aGlzLmVhY2hMYXllcihmdW5jdGlvbiAobGF5ZXIpIHtcclxuXHRcdFx0aWYgKGxheWVyLnRvR2VvSlNPTikge1xyXG5cdFx0XHRcdHZhciBqc29uID0gbGF5ZXIudG9HZW9KU09OKCk7XHJcblx0XHRcdFx0anNvbnMucHVzaChpc0dlb21ldHJ5Q29sbGVjdGlvbiA/IGpzb24uZ2VvbWV0cnkgOiBMLkdlb0pTT04uYXNGZWF0dXJlKGpzb24pKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKGlzR2VvbWV0cnlDb2xsZWN0aW9uKSB7XHJcblx0XHRcdHJldHVybiBMLkdlb0pTT04uZ2V0RmVhdHVyZSh0aGlzLCB7XHJcblx0XHRcdFx0Z2VvbWV0cmllczoganNvbnMsXHJcblx0XHRcdFx0dHlwZTogJ0dlb21ldHJ5Q29sbGVjdGlvbidcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0dHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcclxuXHRcdFx0ZmVhdHVyZXM6IGpzb25zXHJcblx0XHR9O1xyXG5cdH1cclxufSk7XHJcblxyXG5MLmdlb0pzb24gPSBmdW5jdGlvbiAoZ2VvanNvbiwgb3B0aW9ucykge1xyXG5cdHJldHVybiBuZXcgTC5HZW9KU09OKGdlb2pzb24sIG9wdGlvbnMpO1xyXG59O1xyXG5cblxuXG4vKlxyXG4gKiBMLkRvbUV2ZW50IGNvbnRhaW5zIGZ1bmN0aW9ucyBmb3Igd29ya2luZyB3aXRoIERPTSBldmVudHMuXHJcbiAqIEluc3BpcmVkIGJ5IEpvaG4gUmVzaWcsIERlYW4gRWR3YXJkcyBhbmQgWVVJIGFkZEV2ZW50IGltcGxlbWVudGF0aW9ucy5cclxuICovXHJcblxyXG52YXIgZXZlbnRzS2V5ID0gJ19sZWFmbGV0X2V2ZW50cyc7XHJcblxyXG5MLkRvbUV2ZW50ID0ge1xyXG5cclxuXHRvbjogZnVuY3Rpb24gKG9iaiwgdHlwZXMsIGZuLCBjb250ZXh0KSB7XHJcblxyXG5cdFx0aWYgKHR5cGVvZiB0eXBlcyA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0Zm9yICh2YXIgdHlwZSBpbiB0eXBlcykge1xyXG5cdFx0XHRcdHRoaXMuX29uKG9iaiwgdHlwZSwgdHlwZXNbdHlwZV0sIGZuKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dHlwZXMgPSBMLlV0aWwuc3BsaXRXb3Jkcyh0eXBlcyk7XHJcblxyXG5cdFx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gdHlwZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0XHR0aGlzLl9vbihvYmosIHR5cGVzW2ldLCBmbiwgY29udGV4dCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRvZmY6IGZ1bmN0aW9uIChvYmosIHR5cGVzLCBmbiwgY29udGV4dCkge1xyXG5cclxuXHRcdGlmICh0eXBlb2YgdHlwZXMgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdGZvciAodmFyIHR5cGUgaW4gdHlwZXMpIHtcclxuXHRcdFx0XHR0aGlzLl9vZmYob2JqLCB0eXBlLCB0eXBlc1t0eXBlXSwgZm4pO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0eXBlcyA9IEwuVXRpbC5zcGxpdFdvcmRzKHR5cGVzKTtcclxuXHJcblx0XHRcdGZvciAodmFyIGkgPSAwLCBsZW4gPSB0eXBlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRcdHRoaXMuX29mZihvYmosIHR5cGVzW2ldLCBmbiwgY29udGV4dCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRfb246IGZ1bmN0aW9uIChvYmosIHR5cGUsIGZuLCBjb250ZXh0KSB7XHJcblx0XHR2YXIgaWQgPSB0eXBlICsgTC5zdGFtcChmbikgKyAoY29udGV4dCA/ICdfJyArIEwuc3RhbXAoY29udGV4dCkgOiAnJyk7XHJcblxyXG5cdFx0aWYgKG9ialtldmVudHNLZXldICYmIG9ialtldmVudHNLZXldW2lkXSkgeyByZXR1cm4gdGhpczsgfVxyXG5cclxuXHRcdHZhciBoYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0cmV0dXJuIGZuLmNhbGwoY29udGV4dCB8fCBvYmosIGUgfHwgd2luZG93LmV2ZW50KTtcclxuXHRcdH07XHJcblxyXG5cdFx0dmFyIG9yaWdpbmFsSGFuZGxlciA9IGhhbmRsZXI7XHJcblxyXG5cdFx0aWYgKEwuQnJvd3Nlci5wb2ludGVyICYmIHR5cGUuaW5kZXhPZigndG91Y2gnKSA9PT0gMCkge1xyXG5cdFx0XHR0aGlzLmFkZFBvaW50ZXJMaXN0ZW5lcihvYmosIHR5cGUsIGhhbmRsZXIsIGlkKTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKEwuQnJvd3Nlci50b3VjaCAmJiAodHlwZSA9PT0gJ2RibGNsaWNrJykgJiYgdGhpcy5hZGREb3VibGVUYXBMaXN0ZW5lcikge1xyXG5cdFx0XHR0aGlzLmFkZERvdWJsZVRhcExpc3RlbmVyKG9iaiwgaGFuZGxlciwgaWQpO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoJ2FkZEV2ZW50TGlzdGVuZXInIGluIG9iaikge1xyXG5cclxuXHRcdFx0aWYgKHR5cGUgPT09ICdtb3VzZXdoZWVsJykge1xyXG5cdFx0XHRcdG9iai5hZGRFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIGhhbmRsZXIsIGZhbHNlKTtcclxuXHRcdFx0XHRvYmouYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBmYWxzZSk7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKCh0eXBlID09PSAnbW91c2VlbnRlcicpIHx8ICh0eXBlID09PSAnbW91c2VsZWF2ZScpKSB7XHJcblx0XHRcdFx0aGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0XHRlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XHJcblx0XHRcdFx0XHRpZiAoTC5Eb21FdmVudC5faXNFeHRlcm5hbFRhcmdldChvYmosIGUpKSB7XHJcblx0XHRcdFx0XHRcdG9yaWdpbmFsSGFuZGxlcihlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdG9iai5hZGRFdmVudExpc3RlbmVyKHR5cGUgPT09ICdtb3VzZWVudGVyJyA/ICdtb3VzZW92ZXInIDogJ21vdXNlb3V0JywgaGFuZGxlciwgZmFsc2UpO1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpZiAodHlwZSA9PT0gJ2NsaWNrJyAmJiBMLkJyb3dzZXIuYW5kcm9pZCkge1xyXG5cdFx0XHRcdFx0aGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBMLkRvbUV2ZW50Ll9maWx0ZXJDbGljayhlLCBvcmlnaW5hbEhhbmRsZXIpO1xyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0b2JqLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgZmFsc2UpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSBlbHNlIGlmICgnYXR0YWNoRXZlbnQnIGluIG9iaikge1xyXG5cdFx0XHRvYmouYXR0YWNoRXZlbnQoJ29uJyArIHR5cGUsIGhhbmRsZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdG9ialtldmVudHNLZXldID0gb2JqW2V2ZW50c0tleV0gfHwge307XHJcblx0XHRvYmpbZXZlbnRzS2V5XVtpZF0gPSBoYW5kbGVyO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdF9vZmY6IGZ1bmN0aW9uIChvYmosIHR5cGUsIGZuLCBjb250ZXh0KSB7XHJcblxyXG5cdFx0dmFyIGlkID0gdHlwZSArIEwuc3RhbXAoZm4pICsgKGNvbnRleHQgPyAnXycgKyBMLnN0YW1wKGNvbnRleHQpIDogJycpLFxyXG5cdFx0ICAgIGhhbmRsZXIgPSBvYmpbZXZlbnRzS2V5XSAmJiBvYmpbZXZlbnRzS2V5XVtpZF07XHJcblxyXG5cdFx0aWYgKCFoYW5kbGVyKSB7IHJldHVybiB0aGlzOyB9XHJcblxyXG5cdFx0aWYgKEwuQnJvd3Nlci5wb2ludGVyICYmIHR5cGUuaW5kZXhPZigndG91Y2gnKSA9PT0gMCkge1xyXG5cdFx0XHR0aGlzLnJlbW92ZVBvaW50ZXJMaXN0ZW5lcihvYmosIHR5cGUsIGlkKTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKEwuQnJvd3Nlci50b3VjaCAmJiAodHlwZSA9PT0gJ2RibGNsaWNrJykgJiYgdGhpcy5yZW1vdmVEb3VibGVUYXBMaXN0ZW5lcikge1xyXG5cdFx0XHR0aGlzLnJlbW92ZURvdWJsZVRhcExpc3RlbmVyKG9iaiwgaWQpO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoJ3JlbW92ZUV2ZW50TGlzdGVuZXInIGluIG9iaikge1xyXG5cclxuXHRcdFx0aWYgKHR5cGUgPT09ICdtb3VzZXdoZWVsJykge1xyXG5cdFx0XHRcdG9iai5yZW1vdmVFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIGhhbmRsZXIsIGZhbHNlKTtcclxuXHRcdFx0XHRvYmoucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBmYWxzZSk7XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG9iai5yZW1vdmVFdmVudExpc3RlbmVyKFxyXG5cdFx0XHRcdFx0dHlwZSA9PT0gJ21vdXNlZW50ZXInID8gJ21vdXNlb3ZlcicgOlxyXG5cdFx0XHRcdFx0dHlwZSA9PT0gJ21vdXNlbGVhdmUnID8gJ21vdXNlb3V0JyA6IHR5cGUsIGhhbmRsZXIsIGZhbHNlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH0gZWxzZSBpZiAoJ2RldGFjaEV2ZW50JyBpbiBvYmopIHtcclxuXHRcdFx0b2JqLmRldGFjaEV2ZW50KCdvbicgKyB0eXBlLCBoYW5kbGVyKTtcclxuXHRcdH1cclxuXHJcblx0XHRvYmpbZXZlbnRzS2V5XVtpZF0gPSBudWxsO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHN0b3BQcm9wYWdhdGlvbjogZnVuY3Rpb24gKGUpIHtcclxuXHJcblx0XHRpZiAoZS5zdG9wUHJvcGFnYXRpb24pIHtcclxuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdH0gZWxzZSBpZiAoZS5vcmlnaW5hbEV2ZW50KSB7ICAvLyBJbiBjYXNlIG9mIExlYWZsZXQgZXZlbnQuXHJcblx0XHRcdGUub3JpZ2luYWxFdmVudC5fc3RvcHBlZCA9IHRydWU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRMLkRvbUV2ZW50Ll9za2lwcGVkKGUpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdGRpc2FibGVTY3JvbGxQcm9wYWdhdGlvbjogZnVuY3Rpb24gKGVsKSB7XHJcblx0XHRyZXR1cm4gTC5Eb21FdmVudC5vbihlbCwgJ21vdXNld2hlZWwgTW96TW91c2VQaXhlbFNjcm9sbCcsIEwuRG9tRXZlbnQuc3RvcFByb3BhZ2F0aW9uKTtcclxuXHR9LFxyXG5cclxuXHRkaXNhYmxlQ2xpY2tQcm9wYWdhdGlvbjogZnVuY3Rpb24gKGVsKSB7XHJcblx0XHR2YXIgc3RvcCA9IEwuRG9tRXZlbnQuc3RvcFByb3BhZ2F0aW9uO1xyXG5cclxuXHRcdEwuRG9tRXZlbnQub24oZWwsIEwuRHJhZ2dhYmxlLlNUQVJULmpvaW4oJyAnKSwgc3RvcCk7XHJcblxyXG5cdFx0cmV0dXJuIEwuRG9tRXZlbnQub24oZWwsIHtcclxuXHRcdFx0Y2xpY2s6IEwuRG9tRXZlbnQuX2Zha2VTdG9wLFxyXG5cdFx0XHRkYmxjbGljazogc3RvcFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0cHJldmVudERlZmF1bHQ6IGZ1bmN0aW9uIChlKSB7XHJcblxyXG5cdFx0aWYgKGUucHJldmVudERlZmF1bHQpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0c3RvcDogZnVuY3Rpb24gKGUpIHtcclxuXHRcdHJldHVybiBMLkRvbUV2ZW50XHJcblx0XHRcdC5wcmV2ZW50RGVmYXVsdChlKVxyXG5cdFx0XHQuc3RvcFByb3BhZ2F0aW9uKGUpO1xyXG5cdH0sXHJcblxyXG5cdGdldE1vdXNlUG9zaXRpb246IGZ1bmN0aW9uIChlLCBjb250YWluZXIpIHtcclxuXHRcdGlmICghY29udGFpbmVyKSB7XHJcblx0XHRcdHJldHVybiBuZXcgTC5Qb2ludChlLmNsaWVudFgsIGUuY2xpZW50WSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBMLlBvaW50KFxyXG5cdFx0XHRlLmNsaWVudFggLSByZWN0LmxlZnQgLSBjb250YWluZXIuY2xpZW50TGVmdCxcclxuXHRcdFx0ZS5jbGllbnRZIC0gcmVjdC50b3AgLSBjb250YWluZXIuY2xpZW50VG9wKTtcclxuXHR9LFxyXG5cclxuXHRnZXRXaGVlbERlbHRhOiBmdW5jdGlvbiAoZSkge1xyXG5cclxuXHRcdHZhciBkZWx0YSA9IDA7XHJcblxyXG5cdFx0aWYgKGUud2hlZWxEZWx0YSkge1xyXG5cdFx0XHRkZWx0YSA9IGUud2hlZWxEZWx0YSAvIDEyMDtcclxuXHRcdH1cclxuXHRcdGlmIChlLmRldGFpbCkge1xyXG5cdFx0XHRkZWx0YSA9IC1lLmRldGFpbCAvIDM7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZGVsdGE7XHJcblx0fSxcclxuXHJcblx0X3NraXBFdmVudHM6IHt9LFxyXG5cclxuXHRfZmFrZVN0b3A6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHQvLyBmYWtlcyBzdG9wUHJvcGFnYXRpb24gYnkgc2V0dGluZyBhIHNwZWNpYWwgZXZlbnQgZmxhZywgY2hlY2tlZC9yZXNldCB3aXRoIEwuRG9tRXZlbnQuX3NraXBwZWQoZSlcclxuXHRcdEwuRG9tRXZlbnQuX3NraXBFdmVudHNbZS50eXBlXSA9IHRydWU7XHJcblx0fSxcclxuXHJcblx0X3NraXBwZWQ6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHR2YXIgc2tpcHBlZCA9IHRoaXMuX3NraXBFdmVudHNbZS50eXBlXTtcclxuXHRcdC8vIHJlc2V0IHdoZW4gY2hlY2tpbmcsIGFzIGl0J3Mgb25seSB1c2VkIGluIG1hcCBjb250YWluZXIgYW5kIHByb3BhZ2F0ZXMgb3V0c2lkZSBvZiB0aGUgbWFwXHJcblx0XHR0aGlzLl9za2lwRXZlbnRzW2UudHlwZV0gPSBmYWxzZTtcclxuXHRcdHJldHVybiBza2lwcGVkO1xyXG5cdH0sXHJcblxyXG5cdC8vIGNoZWNrIGlmIGVsZW1lbnQgcmVhbGx5IGxlZnQvZW50ZXJlZCB0aGUgZXZlbnQgdGFyZ2V0IChmb3IgbW91c2VlbnRlci9tb3VzZWxlYXZlKVxyXG5cdF9pc0V4dGVybmFsVGFyZ2V0OiBmdW5jdGlvbiAoZWwsIGUpIHtcclxuXHJcblx0XHR2YXIgcmVsYXRlZCA9IGUucmVsYXRlZFRhcmdldDtcclxuXHJcblx0XHRpZiAoIXJlbGF0ZWQpIHsgcmV0dXJuIHRydWU7IH1cclxuXHJcblx0XHR0cnkge1xyXG5cdFx0XHR3aGlsZSAocmVsYXRlZCAmJiAocmVsYXRlZCAhPT0gZWwpKSB7XHJcblx0XHRcdFx0cmVsYXRlZCA9IHJlbGF0ZWQucGFyZW50Tm9kZTtcclxuXHRcdFx0fVxyXG5cdFx0fSBjYXRjaCAoZXJyKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiAocmVsYXRlZCAhPT0gZWwpO1xyXG5cdH0sXHJcblxyXG5cdC8vIHRoaXMgaXMgYSBob3JyaWJsZSB3b3JrYXJvdW5kIGZvciBhIGJ1ZyBpbiBBbmRyb2lkIHdoZXJlIGEgc2luZ2xlIHRvdWNoIHRyaWdnZXJzIHR3byBjbGljayBldmVudHNcclxuXHRfZmlsdGVyQ2xpY2s6IGZ1bmN0aW9uIChlLCBoYW5kbGVyKSB7XHJcblx0XHR2YXIgdGltZVN0YW1wID0gKGUudGltZVN0YW1wIHx8IGUub3JpZ2luYWxFdmVudC50aW1lU3RhbXApLFxyXG5cdFx0ICAgIGVsYXBzZWQgPSBMLkRvbUV2ZW50Ll9sYXN0Q2xpY2sgJiYgKHRpbWVTdGFtcCAtIEwuRG9tRXZlbnQuX2xhc3RDbGljayk7XHJcblxyXG5cdFx0Ly8gYXJlIHRoZXkgY2xvc2VyIHRvZ2V0aGVyIHRoYW4gNTAwbXMgeWV0IG1vcmUgdGhhbiAxMDBtcz9cclxuXHRcdC8vIEFuZHJvaWQgdHlwaWNhbGx5IHRyaWdnZXJzIHRoZW0gfjMwMG1zIGFwYXJ0IHdoaWxlIG11bHRpcGxlIGxpc3RlbmVyc1xyXG5cdFx0Ly8gb24gdGhlIHNhbWUgZXZlbnQgc2hvdWxkIGJlIHRyaWdnZXJlZCBmYXIgZmFzdGVyO1xyXG5cdFx0Ly8gb3IgY2hlY2sgaWYgY2xpY2sgaXMgc2ltdWxhdGVkIG9uIHRoZSBlbGVtZW50LCBhbmQgaWYgaXQgaXMsIHJlamVjdCBhbnkgbm9uLXNpbXVsYXRlZCBldmVudHNcclxuXHJcblx0XHRpZiAoKGVsYXBzZWQgJiYgZWxhcHNlZCA+IDEwMCAmJiBlbGFwc2VkIDwgNTAwKSB8fCAoZS50YXJnZXQuX3NpbXVsYXRlZENsaWNrICYmICFlLl9zaW11bGF0ZWQpKSB7XHJcblx0XHRcdEwuRG9tRXZlbnQuc3RvcChlKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0TC5Eb21FdmVudC5fbGFzdENsaWNrID0gdGltZVN0YW1wO1xyXG5cclxuXHRcdGhhbmRsZXIoZSk7XHJcblx0fVxyXG59O1xyXG5cclxuTC5Eb21FdmVudC5hZGRMaXN0ZW5lciA9IEwuRG9tRXZlbnQub247XHJcbkwuRG9tRXZlbnQucmVtb3ZlTGlzdGVuZXIgPSBMLkRvbUV2ZW50Lm9mZjtcclxuXG5cblxuLypcclxuICogTC5EcmFnZ2FibGUgYWxsb3dzIHlvdSB0byBhZGQgZHJhZ2dpbmcgY2FwYWJpbGl0aWVzIHRvIGFueSBlbGVtZW50LiBTdXBwb3J0cyBtb2JpbGUgZGV2aWNlcyB0b28uXHJcbiAqL1xyXG5cclxuTC5EcmFnZ2FibGUgPSBMLkV2ZW50ZWQuZXh0ZW5kKHtcclxuXHJcblx0c3RhdGljczoge1xyXG5cdFx0U1RBUlQ6IEwuQnJvd3Nlci50b3VjaCA/IFsndG91Y2hzdGFydCcsICdtb3VzZWRvd24nXSA6IFsnbW91c2Vkb3duJ10sXHJcblx0XHRFTkQ6IHtcclxuXHRcdFx0bW91c2Vkb3duOiAnbW91c2V1cCcsXHJcblx0XHRcdHRvdWNoc3RhcnQ6ICd0b3VjaGVuZCcsXHJcblx0XHRcdHBvaW50ZXJkb3duOiAndG91Y2hlbmQnLFxyXG5cdFx0XHRNU1BvaW50ZXJEb3duOiAndG91Y2hlbmQnXHJcblx0XHR9LFxyXG5cdFx0TU9WRToge1xyXG5cdFx0XHRtb3VzZWRvd246ICdtb3VzZW1vdmUnLFxyXG5cdFx0XHR0b3VjaHN0YXJ0OiAndG91Y2htb3ZlJyxcclxuXHRcdFx0cG9pbnRlcmRvd246ICd0b3VjaG1vdmUnLFxyXG5cdFx0XHRNU1BvaW50ZXJEb3duOiAndG91Y2htb3ZlJ1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIChlbGVtZW50LCBkcmFnU3RhcnRUYXJnZXQsIHByZXZlbnRPdXRsaW5lKSB7XHJcblx0XHR0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcclxuXHRcdHRoaXMuX2RyYWdTdGFydFRhcmdldCA9IGRyYWdTdGFydFRhcmdldCB8fCBlbGVtZW50O1xyXG5cdFx0dGhpcy5fcHJldmVudE91dGxpbmUgPSBwcmV2ZW50T3V0bGluZTtcclxuXHR9LFxyXG5cclxuXHRlbmFibGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzLl9lbmFibGVkKSB7IHJldHVybjsgfVxyXG5cclxuXHRcdEwuRG9tRXZlbnQub24odGhpcy5fZHJhZ1N0YXJ0VGFyZ2V0LCBMLkRyYWdnYWJsZS5TVEFSVC5qb2luKCcgJyksIHRoaXMuX29uRG93biwgdGhpcyk7XHJcblxyXG5cdFx0dGhpcy5fZW5hYmxlZCA9IHRydWU7XHJcblx0fSxcclxuXHJcblx0ZGlzYWJsZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKCF0aGlzLl9lbmFibGVkKSB7IHJldHVybjsgfVxyXG5cclxuXHRcdEwuRG9tRXZlbnQub2ZmKHRoaXMuX2RyYWdTdGFydFRhcmdldCwgTC5EcmFnZ2FibGUuU1RBUlQuam9pbignICcpLCB0aGlzLl9vbkRvd24sIHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuX2VuYWJsZWQgPSBmYWxzZTtcclxuXHRcdHRoaXMuX21vdmVkID0gZmFsc2U7XHJcblx0fSxcclxuXHJcblx0X29uRG93bjogZnVuY3Rpb24gKGUpIHtcclxuXHRcdHRoaXMuX21vdmVkID0gZmFsc2U7XHJcblxyXG5cdFx0aWYgKEwuRG9tVXRpbC5oYXNDbGFzcyh0aGlzLl9lbGVtZW50LCAnbGVhZmxldC16b29tLWFuaW0nKSkgeyByZXR1cm47IH1cclxuXHJcblx0XHRpZiAoTC5EcmFnZ2FibGUuX2RyYWdnaW5nIHx8IGUuc2hpZnRLZXkgfHwgKChlLndoaWNoICE9PSAxKSAmJiAoZS5idXR0b24gIT09IDEpICYmICFlLnRvdWNoZXMpIHx8ICF0aGlzLl9lbmFibGVkKSB7IHJldHVybjsgfVxyXG5cdFx0TC5EcmFnZ2FibGUuX2RyYWdnaW5nID0gdHJ1ZTsgIC8vIFByZXZlbnQgZHJhZ2dpbmcgbXVsdGlwbGUgb2JqZWN0cyBhdCBvbmNlLlxyXG5cclxuXHRcdGlmICh0aGlzLl9wcmV2ZW50T3V0bGluZSkge1xyXG5cdFx0XHRMLkRvbVV0aWwucHJldmVudE91dGxpbmUodGhpcy5fZWxlbWVudCk7XHJcblx0XHR9XHJcblxyXG5cdFx0TC5Eb21VdGlsLmRpc2FibGVJbWFnZURyYWcoKTtcclxuXHRcdEwuRG9tVXRpbC5kaXNhYmxlVGV4dFNlbGVjdGlvbigpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9tb3ZpbmcpIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0dGhpcy5maXJlKCdkb3duJyk7XHJcblxyXG5cdFx0dmFyIGZpcnN0ID0gZS50b3VjaGVzID8gZS50b3VjaGVzWzBdIDogZTtcclxuXHJcblx0XHR0aGlzLl9zdGFydFBvaW50ID0gbmV3IEwuUG9pbnQoZmlyc3QuY2xpZW50WCwgZmlyc3QuY2xpZW50WSk7XHJcblx0XHR0aGlzLl9zdGFydFBvcyA9IHRoaXMuX25ld1BvcyA9IEwuRG9tVXRpbC5nZXRQb3NpdGlvbih0aGlzLl9lbGVtZW50KTtcclxuXHJcblx0XHRMLkRvbUV2ZW50XHJcblx0XHQgICAgLm9uKGRvY3VtZW50LCBMLkRyYWdnYWJsZS5NT1ZFW2UudHlwZV0sIHRoaXMuX29uTW92ZSwgdGhpcylcclxuXHRcdCAgICAub24oZG9jdW1lbnQsIEwuRHJhZ2dhYmxlLkVORFtlLnR5cGVdLCB0aGlzLl9vblVwLCB0aGlzKTtcclxuXHR9LFxyXG5cclxuXHRfb25Nb3ZlOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0aWYgKGUudG91Y2hlcyAmJiBlLnRvdWNoZXMubGVuZ3RoID4gMSkge1xyXG5cdFx0XHR0aGlzLl9tb3ZlZCA9IHRydWU7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgZmlyc3QgPSAoZS50b3VjaGVzICYmIGUudG91Y2hlcy5sZW5ndGggPT09IDEgPyBlLnRvdWNoZXNbMF0gOiBlKSxcclxuXHRcdCAgICBuZXdQb2ludCA9IG5ldyBMLlBvaW50KGZpcnN0LmNsaWVudFgsIGZpcnN0LmNsaWVudFkpLFxyXG5cdFx0ICAgIG9mZnNldCA9IG5ld1BvaW50LnN1YnRyYWN0KHRoaXMuX3N0YXJ0UG9pbnQpO1xyXG5cclxuXHRcdGlmICghb2Zmc2V0LnggJiYgIW9mZnNldC55KSB7IHJldHVybjsgfVxyXG5cdFx0aWYgKEwuQnJvd3Nlci50b3VjaCAmJiBNYXRoLmFicyhvZmZzZXQueCkgKyBNYXRoLmFicyhvZmZzZXQueSkgPCAzKSB7IHJldHVybjsgfVxyXG5cclxuXHRcdEwuRG9tRXZlbnQucHJldmVudERlZmF1bHQoZSk7XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9tb3ZlZCkge1xyXG5cdFx0XHR0aGlzLmZpcmUoJ2RyYWdzdGFydCcpO1xyXG5cclxuXHRcdFx0dGhpcy5fbW92ZWQgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLl9zdGFydFBvcyA9IEwuRG9tVXRpbC5nZXRQb3NpdGlvbih0aGlzLl9lbGVtZW50KS5zdWJ0cmFjdChvZmZzZXQpO1xyXG5cclxuXHRcdFx0TC5Eb21VdGlsLmFkZENsYXNzKGRvY3VtZW50LmJvZHksICdsZWFmbGV0LWRyYWdnaW5nJyk7XHJcblxyXG5cdFx0XHR0aGlzLl9sYXN0VGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xyXG5cdFx0XHRMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5fbGFzdFRhcmdldCwgJ2xlYWZsZXQtZHJhZy10YXJnZXQnKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9uZXdQb3MgPSB0aGlzLl9zdGFydFBvcy5hZGQob2Zmc2V0KTtcclxuXHRcdHRoaXMuX21vdmluZyA9IHRydWU7XHJcblxyXG5cdFx0TC5VdGlsLmNhbmNlbEFuaW1GcmFtZSh0aGlzLl9hbmltUmVxdWVzdCk7XHJcblx0XHR0aGlzLl9sYXN0RXZlbnQgPSBlO1xyXG5cdFx0dGhpcy5fYW5pbVJlcXVlc3QgPSBMLlV0aWwucmVxdWVzdEFuaW1GcmFtZSh0aGlzLl91cGRhdGVQb3NpdGlvbiwgdGhpcywgdHJ1ZSk7XHJcblx0fSxcclxuXHJcblx0X3VwZGF0ZVBvc2l0aW9uOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgZSA9IHtvcmlnaW5hbEV2ZW50OiB0aGlzLl9sYXN0RXZlbnR9O1xyXG5cdFx0dGhpcy5maXJlKCdwcmVkcmFnJywgZSk7XHJcblx0XHRMLkRvbVV0aWwuc2V0UG9zaXRpb24odGhpcy5fZWxlbWVudCwgdGhpcy5fbmV3UG9zKTtcclxuXHRcdHRoaXMuZmlyZSgnZHJhZycsIGUpO1xyXG5cdH0sXHJcblxyXG5cdF9vblVwOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRMLkRvbVV0aWwucmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ2xlYWZsZXQtZHJhZ2dpbmcnKTtcclxuXHJcblx0XHRpZiAodGhpcy5fbGFzdFRhcmdldCkge1xyXG5cdFx0XHRMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5fbGFzdFRhcmdldCwgJ2xlYWZsZXQtZHJhZy10YXJnZXQnKTtcclxuXHRcdFx0dGhpcy5fbGFzdFRhcmdldCA9IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yICh2YXIgaSBpbiBMLkRyYWdnYWJsZS5NT1ZFKSB7XHJcblx0XHRcdEwuRG9tRXZlbnRcclxuXHRcdFx0ICAgIC5vZmYoZG9jdW1lbnQsIEwuRHJhZ2dhYmxlLk1PVkVbaV0sIHRoaXMuX29uTW92ZSwgdGhpcylcclxuXHRcdFx0ICAgIC5vZmYoZG9jdW1lbnQsIEwuRHJhZ2dhYmxlLkVORFtpXSwgdGhpcy5fb25VcCwgdGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0TC5Eb21VdGlsLmVuYWJsZUltYWdlRHJhZygpO1xyXG5cdFx0TC5Eb21VdGlsLmVuYWJsZVRleHRTZWxlY3Rpb24oKTtcclxuXHJcblx0XHRpZiAodGhpcy5fbW92ZWQgJiYgdGhpcy5fbW92aW5nKSB7XHJcblx0XHRcdC8vIGVuc3VyZSBkcmFnIGlzIG5vdCBmaXJlZCBhZnRlciBkcmFnZW5kXHJcblx0XHRcdEwuVXRpbC5jYW5jZWxBbmltRnJhbWUodGhpcy5fYW5pbVJlcXVlc3QpO1xyXG5cclxuXHRcdFx0dGhpcy5maXJlKCdkcmFnZW5kJywge1xyXG5cdFx0XHRcdGRpc3RhbmNlOiB0aGlzLl9uZXdQb3MuZGlzdGFuY2VUbyh0aGlzLl9zdGFydFBvcylcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fbW92aW5nID0gZmFsc2U7XHJcblx0XHRMLkRyYWdnYWJsZS5fZHJhZ2dpbmcgPSBmYWxzZTtcclxuXHR9XHJcbn0pO1xyXG5cblxuXG4vKlxuXHRMLkhhbmRsZXIgaXMgYSBiYXNlIGNsYXNzIGZvciBoYW5kbGVyIGNsYXNzZXMgdGhhdCBhcmUgdXNlZCBpbnRlcm5hbGx5IHRvIGluamVjdFxuXHRpbnRlcmFjdGlvbiBmZWF0dXJlcyBsaWtlIGRyYWdnaW5nIHRvIGNsYXNzZXMgbGlrZSBNYXAgYW5kIE1hcmtlci5cbiovXG5cbkwuSGFuZGxlciA9IEwuQ2xhc3MuZXh0ZW5kKHtcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKG1hcCkge1xuXHRcdHRoaXMuX21hcCA9IG1hcDtcblx0fSxcblxuXHRlbmFibGU6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5fZW5hYmxlZCkgeyByZXR1cm47IH1cblxuXHRcdHRoaXMuX2VuYWJsZWQgPSB0cnVlO1xuXHRcdHRoaXMuYWRkSG9va3MoKTtcblx0fSxcblxuXHRkaXNhYmxlOiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKCF0aGlzLl9lbmFibGVkKSB7IHJldHVybjsgfVxuXG5cdFx0dGhpcy5fZW5hYmxlZCA9IGZhbHNlO1xuXHRcdHRoaXMucmVtb3ZlSG9va3MoKTtcblx0fSxcblxuXHRlbmFibGVkOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuICEhdGhpcy5fZW5hYmxlZDtcblx0fVxufSk7XG5cblxuXG4vKlxuICogTC5IYW5kbGVyLk1hcERyYWcgaXMgdXNlZCB0byBtYWtlIHRoZSBtYXAgZHJhZ2dhYmxlICh3aXRoIHBhbm5pbmcgaW5lcnRpYSksIGVuYWJsZWQgYnkgZGVmYXVsdC5cbiAqL1xuXG5MLk1hcC5tZXJnZU9wdGlvbnMoe1xuXHRkcmFnZ2luZzogdHJ1ZSxcblxuXHRpbmVydGlhOiAhTC5Ccm93c2VyLmFuZHJvaWQyMyxcblx0aW5lcnRpYURlY2VsZXJhdGlvbjogMzQwMCwgLy8gcHgvc14yXG5cdGluZXJ0aWFNYXhTcGVlZDogSW5maW5pdHksIC8vIHB4L3Ncblx0ZWFzZUxpbmVhcml0eTogMC4yLFxuXG5cdC8vIFRPRE8gcmVmYWN0b3IsIG1vdmUgdG8gQ1JTXG5cdHdvcmxkQ29weUp1bXA6IGZhbHNlXG59KTtcblxuTC5NYXAuRHJhZyA9IEwuSGFuZGxlci5leHRlbmQoe1xuXHRhZGRIb29rczogZnVuY3Rpb24gKCkge1xuXHRcdGlmICghdGhpcy5fZHJhZ2dhYmxlKSB7XG5cdFx0XHR2YXIgbWFwID0gdGhpcy5fbWFwO1xuXG5cdFx0XHR0aGlzLl9kcmFnZ2FibGUgPSBuZXcgTC5EcmFnZ2FibGUobWFwLl9tYXBQYW5lLCBtYXAuX2NvbnRhaW5lcik7XG5cblx0XHRcdHRoaXMuX2RyYWdnYWJsZS5vbih7XG5cdFx0XHRcdGRvd246IHRoaXMuX29uRG93bixcblx0XHRcdFx0ZHJhZ3N0YXJ0OiB0aGlzLl9vbkRyYWdTdGFydCxcblx0XHRcdFx0ZHJhZzogdGhpcy5fb25EcmFnLFxuXHRcdFx0XHRkcmFnZW5kOiB0aGlzLl9vbkRyYWdFbmRcblx0XHRcdH0sIHRoaXMpO1xuXG5cdFx0XHR0aGlzLl9kcmFnZ2FibGUub24oJ3ByZWRyYWcnLCB0aGlzLl9vblByZURyYWdMaW1pdCwgdGhpcyk7XG5cdFx0XHRpZiAobWFwLm9wdGlvbnMud29ybGRDb3B5SnVtcCkge1xuXHRcdFx0XHR0aGlzLl9kcmFnZ2FibGUub24oJ3ByZWRyYWcnLCB0aGlzLl9vblByZURyYWdXcmFwLCB0aGlzKTtcblx0XHRcdFx0bWFwLm9uKCd6b29tZW5kJywgdGhpcy5fb25ab29tRW5kLCB0aGlzKTtcblxuXHRcdFx0XHRtYXAud2hlblJlYWR5KHRoaXMuX29uWm9vbUVuZCwgdGhpcyk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9tYXAuX2NvbnRhaW5lciwgJ2xlYWZsZXQtZ3JhYicpO1xuXHRcdHRoaXMuX2RyYWdnYWJsZS5lbmFibGUoKTtcblx0fSxcblxuXHRyZW1vdmVIb29rczogZnVuY3Rpb24gKCkge1xuXHRcdEwuRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl9tYXAuX2NvbnRhaW5lciwgJ2xlYWZsZXQtZ3JhYicpO1xuXHRcdHRoaXMuX2RyYWdnYWJsZS5kaXNhYmxlKCk7XG5cdH0sXG5cblx0bW92ZWQ6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5fZHJhZ2dhYmxlICYmIHRoaXMuX2RyYWdnYWJsZS5fbW92ZWQ7XG5cdH0sXG5cblx0X29uRG93bjogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuX21hcC5zdG9wKCk7XG5cdH0sXG5cblx0X29uRHJhZ1N0YXJ0OiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIG1hcCA9IHRoaXMuX21hcDtcblxuXHRcdGlmICh0aGlzLl9tYXAub3B0aW9ucy5tYXhCb3VuZHMgJiYgdGhpcy5fbWFwLm9wdGlvbnMubWF4Qm91bmRzVmlzY29zaXR5KSB7XG5cdFx0XHR2YXIgYm91bmRzID0gTC5sYXRMbmdCb3VuZHModGhpcy5fbWFwLm9wdGlvbnMubWF4Qm91bmRzKTtcblxuXHRcdFx0dGhpcy5fb2Zmc2V0TGltaXQgPSBMLmJvdW5kcyhcblx0XHRcdFx0dGhpcy5fbWFwLmxhdExuZ1RvQ29udGFpbmVyUG9pbnQoYm91bmRzLmdldE5vcnRoV2VzdCgpKS5tdWx0aXBseUJ5KC0xKSxcblx0XHRcdFx0dGhpcy5fbWFwLmxhdExuZ1RvQ29udGFpbmVyUG9pbnQoYm91bmRzLmdldFNvdXRoRWFzdCgpKS5tdWx0aXBseUJ5KC0xKVxuXHRcdFx0XHRcdC5hZGQodGhpcy5fbWFwLmdldFNpemUoKSkpO1xuXG5cdFx0XHR0aGlzLl92aXNjb3NpdHkgPSBNYXRoLm1pbigxLjAsIE1hdGgubWF4KDAuMCwgdGhpcy5fbWFwLm9wdGlvbnMubWF4Qm91bmRzVmlzY29zaXR5KSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX29mZnNldExpbWl0ID0gbnVsbDtcblx0XHR9XG5cblx0XHRtYXBcblx0XHQgICAgLmZpcmUoJ21vdmVzdGFydCcpXG5cdFx0ICAgIC5maXJlKCdkcmFnc3RhcnQnKTtcblxuXHRcdGlmIChtYXAub3B0aW9ucy5pbmVydGlhKSB7XG5cdFx0XHR0aGlzLl9wb3NpdGlvbnMgPSBbXTtcblx0XHRcdHRoaXMuX3RpbWVzID0gW107XG5cdFx0fVxuXHR9LFxuXG5cdF9vbkRyYWc6IGZ1bmN0aW9uIChlKSB7XG5cdFx0aWYgKHRoaXMuX21hcC5vcHRpb25zLmluZXJ0aWEpIHtcblx0XHRcdHZhciB0aW1lID0gdGhpcy5fbGFzdFRpbWUgPSArbmV3IERhdGUoKSxcblx0XHRcdCAgICBwb3MgPSB0aGlzLl9sYXN0UG9zID0gdGhpcy5fZHJhZ2dhYmxlLl9hYnNQb3MgfHwgdGhpcy5fZHJhZ2dhYmxlLl9uZXdQb3M7XG5cblx0XHRcdHRoaXMuX3Bvc2l0aW9ucy5wdXNoKHBvcyk7XG5cdFx0XHR0aGlzLl90aW1lcy5wdXNoKHRpbWUpO1xuXG5cdFx0XHRpZiAodGltZSAtIHRoaXMuX3RpbWVzWzBdID4gNTApIHtcblx0XHRcdFx0dGhpcy5fcG9zaXRpb25zLnNoaWZ0KCk7XG5cdFx0XHRcdHRoaXMuX3RpbWVzLnNoaWZ0KCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5fbWFwXG5cdFx0ICAgIC5maXJlKCdtb3ZlJywgZSlcblx0XHQgICAgLmZpcmUoJ2RyYWcnLCBlKTtcblx0fSxcblxuXHRfb25ab29tRW5kOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHB4Q2VudGVyID0gdGhpcy5fbWFwLmdldFNpemUoKS5kaXZpZGVCeSgyKSxcblx0XHQgICAgcHhXb3JsZENlbnRlciA9IHRoaXMuX21hcC5sYXRMbmdUb0xheWVyUG9pbnQoWzAsIDBdKTtcblxuXHRcdHRoaXMuX2luaXRpYWxXb3JsZE9mZnNldCA9IHB4V29ybGRDZW50ZXIuc3VidHJhY3QocHhDZW50ZXIpLng7XG5cdFx0dGhpcy5fd29ybGRXaWR0aCA9IHRoaXMuX21hcC5nZXRQaXhlbFdvcmxkQm91bmRzKCkuZ2V0U2l6ZSgpLng7XG5cdH0sXG5cblx0X3Zpc2NvdXNMaW1pdDogZnVuY3Rpb24gKHZhbHVlLCB0aHJlc2hvbGQpIHtcblx0XHRyZXR1cm4gdmFsdWUgLSAodmFsdWUgLSB0aHJlc2hvbGQpICogdGhpcy5fdmlzY29zaXR5O1xuXHR9LFxuXG5cdF9vblByZURyYWdMaW1pdDogZnVuY3Rpb24gKCkge1xuXHRcdGlmICghdGhpcy5fdmlzY29zaXR5IHx8ICF0aGlzLl9vZmZzZXRMaW1pdCkgeyByZXR1cm47IH1cblxuXHRcdHZhciBvZmZzZXQgPSB0aGlzLl9kcmFnZ2FibGUuX25ld1Bvcy5zdWJ0cmFjdCh0aGlzLl9kcmFnZ2FibGUuX3N0YXJ0UG9zKTtcblxuXHRcdHZhciBsaW1pdCA9IHRoaXMuX29mZnNldExpbWl0O1xuXHRcdGlmIChvZmZzZXQueCA8IGxpbWl0Lm1pbi54KSB7IG9mZnNldC54ID0gdGhpcy5fdmlzY291c0xpbWl0KG9mZnNldC54LCBsaW1pdC5taW4ueCk7IH1cblx0XHRpZiAob2Zmc2V0LnkgPCBsaW1pdC5taW4ueSkgeyBvZmZzZXQueSA9IHRoaXMuX3Zpc2NvdXNMaW1pdChvZmZzZXQueSwgbGltaXQubWluLnkpOyB9XG5cdFx0aWYgKG9mZnNldC54ID4gbGltaXQubWF4LngpIHsgb2Zmc2V0LnggPSB0aGlzLl92aXNjb3VzTGltaXQob2Zmc2V0LngsIGxpbWl0Lm1heC54KTsgfVxuXHRcdGlmIChvZmZzZXQueSA+IGxpbWl0Lm1heC55KSB7IG9mZnNldC55ID0gdGhpcy5fdmlzY291c0xpbWl0KG9mZnNldC55LCBsaW1pdC5tYXgueSk7IH1cblxuXHRcdHRoaXMuX2RyYWdnYWJsZS5fbmV3UG9zID0gdGhpcy5fZHJhZ2dhYmxlLl9zdGFydFBvcy5hZGQob2Zmc2V0KTtcblx0fSxcblxuXHRfb25QcmVEcmFnV3JhcDogZnVuY3Rpb24gKCkge1xuXHRcdC8vIFRPRE8gcmVmYWN0b3IgdG8gYmUgYWJsZSB0byBhZGp1c3QgbWFwIHBhbmUgcG9zaXRpb24gYWZ0ZXIgem9vbVxuXHRcdHZhciB3b3JsZFdpZHRoID0gdGhpcy5fd29ybGRXaWR0aCxcblx0XHQgICAgaGFsZldpZHRoID0gTWF0aC5yb3VuZCh3b3JsZFdpZHRoIC8gMiksXG5cdFx0ICAgIGR4ID0gdGhpcy5faW5pdGlhbFdvcmxkT2Zmc2V0LFxuXHRcdCAgICB4ID0gdGhpcy5fZHJhZ2dhYmxlLl9uZXdQb3MueCxcblx0XHQgICAgbmV3WDEgPSAoeCAtIGhhbGZXaWR0aCArIGR4KSAlIHdvcmxkV2lkdGggKyBoYWxmV2lkdGggLSBkeCxcblx0XHQgICAgbmV3WDIgPSAoeCArIGhhbGZXaWR0aCArIGR4KSAlIHdvcmxkV2lkdGggLSBoYWxmV2lkdGggLSBkeCxcblx0XHQgICAgbmV3WCA9IE1hdGguYWJzKG5ld1gxICsgZHgpIDwgTWF0aC5hYnMobmV3WDIgKyBkeCkgPyBuZXdYMSA6IG5ld1gyO1xuXG5cdFx0dGhpcy5fZHJhZ2dhYmxlLl9hYnNQb3MgPSB0aGlzLl9kcmFnZ2FibGUuX25ld1Bvcy5jbG9uZSgpO1xuXHRcdHRoaXMuX2RyYWdnYWJsZS5fbmV3UG9zLnggPSBuZXdYO1xuXHR9LFxuXG5cdF9vbkRyYWdFbmQ6IGZ1bmN0aW9uIChlKSB7XG5cdFx0dmFyIG1hcCA9IHRoaXMuX21hcCxcblx0XHQgICAgb3B0aW9ucyA9IG1hcC5vcHRpb25zLFxuXG5cdFx0ICAgIG5vSW5lcnRpYSA9ICFvcHRpb25zLmluZXJ0aWEgfHwgdGhpcy5fdGltZXMubGVuZ3RoIDwgMjtcblxuXHRcdG1hcC5maXJlKCdkcmFnZW5kJywgZSk7XG5cblx0XHRpZiAobm9JbmVydGlhKSB7XG5cdFx0XHRtYXAuZmlyZSgnbW92ZWVuZCcpO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0dmFyIGRpcmVjdGlvbiA9IHRoaXMuX2xhc3RQb3Muc3VidHJhY3QodGhpcy5fcG9zaXRpb25zWzBdKSxcblx0XHRcdCAgICBkdXJhdGlvbiA9ICh0aGlzLl9sYXN0VGltZSAtIHRoaXMuX3RpbWVzWzBdKSAvIDEwMDAsXG5cdFx0XHQgICAgZWFzZSA9IG9wdGlvbnMuZWFzZUxpbmVhcml0eSxcblxuXHRcdFx0ICAgIHNwZWVkVmVjdG9yID0gZGlyZWN0aW9uLm11bHRpcGx5QnkoZWFzZSAvIGR1cmF0aW9uKSxcblx0XHRcdCAgICBzcGVlZCA9IHNwZWVkVmVjdG9yLmRpc3RhbmNlVG8oWzAsIDBdKSxcblxuXHRcdFx0ICAgIGxpbWl0ZWRTcGVlZCA9IE1hdGgubWluKG9wdGlvbnMuaW5lcnRpYU1heFNwZWVkLCBzcGVlZCksXG5cdFx0XHQgICAgbGltaXRlZFNwZWVkVmVjdG9yID0gc3BlZWRWZWN0b3IubXVsdGlwbHlCeShsaW1pdGVkU3BlZWQgLyBzcGVlZCksXG5cblx0XHRcdCAgICBkZWNlbGVyYXRpb25EdXJhdGlvbiA9IGxpbWl0ZWRTcGVlZCAvIChvcHRpb25zLmluZXJ0aWFEZWNlbGVyYXRpb24gKiBlYXNlKSxcblx0XHRcdCAgICBvZmZzZXQgPSBsaW1pdGVkU3BlZWRWZWN0b3IubXVsdGlwbHlCeSgtZGVjZWxlcmF0aW9uRHVyYXRpb24gLyAyKS5yb3VuZCgpO1xuXG5cdFx0XHRpZiAoIW9mZnNldC54ICYmICFvZmZzZXQueSkge1xuXHRcdFx0XHRtYXAuZmlyZSgnbW92ZWVuZCcpO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRvZmZzZXQgPSBtYXAuX2xpbWl0T2Zmc2V0KG9mZnNldCwgbWFwLm9wdGlvbnMubWF4Qm91bmRzKTtcblxuXHRcdFx0XHRMLlV0aWwucmVxdWVzdEFuaW1GcmFtZShmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0bWFwLnBhbkJ5KG9mZnNldCwge1xuXHRcdFx0XHRcdFx0ZHVyYXRpb246IGRlY2VsZXJhdGlvbkR1cmF0aW9uLFxuXHRcdFx0XHRcdFx0ZWFzZUxpbmVhcml0eTogZWFzZSxcblx0XHRcdFx0XHRcdG5vTW92ZVN0YXJ0OiB0cnVlLFxuXHRcdFx0XHRcdFx0YW5pbWF0ZTogdHJ1ZVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0pO1xuXG5MLk1hcC5hZGRJbml0SG9vaygnYWRkSGFuZGxlcicsICdkcmFnZ2luZycsIEwuTWFwLkRyYWcpO1xuXG5cblxuLypcbiAqIEwuSGFuZGxlci5Eb3VibGVDbGlja1pvb20gaXMgdXNlZCB0byBoYW5kbGUgZG91YmxlLWNsaWNrIHpvb20gb24gdGhlIG1hcCwgZW5hYmxlZCBieSBkZWZhdWx0LlxuICovXG5cbkwuTWFwLm1lcmdlT3B0aW9ucyh7XG5cdGRvdWJsZUNsaWNrWm9vbTogdHJ1ZVxufSk7XG5cbkwuTWFwLkRvdWJsZUNsaWNrWm9vbSA9IEwuSGFuZGxlci5leHRlbmQoe1xuXHRhZGRIb29rczogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuX21hcC5vbignZGJsY2xpY2snLCB0aGlzLl9vbkRvdWJsZUNsaWNrLCB0aGlzKTtcblx0fSxcblxuXHRyZW1vdmVIb29rczogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuX21hcC5vZmYoJ2RibGNsaWNrJywgdGhpcy5fb25Eb3VibGVDbGljaywgdGhpcyk7XG5cdH0sXG5cblx0X29uRG91YmxlQ2xpY2s6IGZ1bmN0aW9uIChlKSB7XG5cdFx0dmFyIG1hcCA9IHRoaXMuX21hcCxcblx0XHQgICAgb2xkWm9vbSA9IG1hcC5nZXRab29tKCksXG5cdFx0ICAgIHpvb20gPSBlLm9yaWdpbmFsRXZlbnQuc2hpZnRLZXkgPyBNYXRoLmNlaWwob2xkWm9vbSkgLSAxIDogTWF0aC5mbG9vcihvbGRab29tKSArIDE7XG5cblx0XHRpZiAobWFwLm9wdGlvbnMuZG91YmxlQ2xpY2tab29tID09PSAnY2VudGVyJykge1xuXHRcdFx0bWFwLnNldFpvb20oem9vbSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG1hcC5zZXRab29tQXJvdW5kKGUuY29udGFpbmVyUG9pbnQsIHpvb20pO1xuXHRcdH1cblx0fVxufSk7XG5cbkwuTWFwLmFkZEluaXRIb29rKCdhZGRIYW5kbGVyJywgJ2RvdWJsZUNsaWNrWm9vbScsIEwuTWFwLkRvdWJsZUNsaWNrWm9vbSk7XG5cblxuXG4vKlxuICogTC5IYW5kbGVyLlNjcm9sbFdoZWVsWm9vbSBpcyB1c2VkIGJ5IEwuTWFwIHRvIGVuYWJsZSBtb3VzZSBzY3JvbGwgd2hlZWwgem9vbSBvbiB0aGUgbWFwLlxuICovXG5cbkwuTWFwLm1lcmdlT3B0aW9ucyh7XG5cdHNjcm9sbFdoZWVsWm9vbTogdHJ1ZSxcblx0d2hlZWxEZWJvdW5jZVRpbWU6IDQwXG59KTtcblxuTC5NYXAuU2Nyb2xsV2hlZWxab29tID0gTC5IYW5kbGVyLmV4dGVuZCh7XG5cdGFkZEhvb2tzOiBmdW5jdGlvbiAoKSB7XG5cdFx0TC5Eb21FdmVudC5vbih0aGlzLl9tYXAuX2NvbnRhaW5lciwge1xuXHRcdFx0bW91c2V3aGVlbDogdGhpcy5fb25XaGVlbFNjcm9sbCxcblx0XHRcdE1vek1vdXNlUGl4ZWxTY3JvbGw6IEwuRG9tRXZlbnQucHJldmVudERlZmF1bHRcblx0XHR9LCB0aGlzKTtcblxuXHRcdHRoaXMuX2RlbHRhID0gMDtcblx0fSxcblxuXHRyZW1vdmVIb29rczogZnVuY3Rpb24gKCkge1xuXHRcdEwuRG9tRXZlbnQub2ZmKHRoaXMuX21hcC5fY29udGFpbmVyLCB7XG5cdFx0XHRtb3VzZXdoZWVsOiB0aGlzLl9vbldoZWVsU2Nyb2xsLFxuXHRcdFx0TW96TW91c2VQaXhlbFNjcm9sbDogTC5Eb21FdmVudC5wcmV2ZW50RGVmYXVsdFxuXHRcdH0sIHRoaXMpO1xuXHR9LFxuXG5cdF9vbldoZWVsU2Nyb2xsOiBmdW5jdGlvbiAoZSkge1xuXHRcdHZhciBkZWx0YSA9IEwuRG9tRXZlbnQuZ2V0V2hlZWxEZWx0YShlKTtcblx0XHR2YXIgZGVib3VuY2UgPSB0aGlzLl9tYXAub3B0aW9ucy53aGVlbERlYm91bmNlVGltZTtcblxuXHRcdHRoaXMuX2RlbHRhICs9IGRlbHRhO1xuXHRcdHRoaXMuX2xhc3RNb3VzZVBvcyA9IHRoaXMuX21hcC5tb3VzZUV2ZW50VG9Db250YWluZXJQb2ludChlKTtcblxuXHRcdGlmICghdGhpcy5fc3RhcnRUaW1lKSB7XG5cdFx0XHR0aGlzLl9zdGFydFRpbWUgPSArbmV3IERhdGUoKTtcblx0XHR9XG5cblx0XHR2YXIgbGVmdCA9IE1hdGgubWF4KGRlYm91bmNlIC0gKCtuZXcgRGF0ZSgpIC0gdGhpcy5fc3RhcnRUaW1lKSwgMCk7XG5cblx0XHRjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xuXHRcdHRoaXMuX3RpbWVyID0gc2V0VGltZW91dChMLmJpbmQodGhpcy5fcGVyZm9ybVpvb20sIHRoaXMpLCBsZWZ0KTtcblxuXHRcdEwuRG9tRXZlbnQuc3RvcChlKTtcblx0fSxcblxuXHRfcGVyZm9ybVpvb206IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgbWFwID0gdGhpcy5fbWFwLFxuXHRcdCAgICBkZWx0YSA9IHRoaXMuX2RlbHRhLFxuXHRcdCAgICB6b29tID0gbWFwLmdldFpvb20oKTtcblxuXHRcdG1hcC5zdG9wKCk7IC8vIHN0b3AgcGFubmluZyBhbmQgZmx5IGFuaW1hdGlvbnMgaWYgYW55XG5cblx0XHRkZWx0YSA9IGRlbHRhID4gMCA/IE1hdGguY2VpbChkZWx0YSkgOiBNYXRoLmZsb29yKGRlbHRhKTtcblx0XHRkZWx0YSA9IE1hdGgubWF4KE1hdGgubWluKGRlbHRhLCA0KSwgLTQpO1xuXHRcdGRlbHRhID0gbWFwLl9saW1pdFpvb20oem9vbSArIGRlbHRhKSAtIHpvb207XG5cblx0XHR0aGlzLl9kZWx0YSA9IDA7XG5cdFx0dGhpcy5fc3RhcnRUaW1lID0gbnVsbDtcblxuXHRcdGlmICghZGVsdGEpIHsgcmV0dXJuOyB9XG5cblx0XHRpZiAobWFwLm9wdGlvbnMuc2Nyb2xsV2hlZWxab29tID09PSAnY2VudGVyJykge1xuXHRcdFx0bWFwLnNldFpvb20oem9vbSArIGRlbHRhKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bWFwLnNldFpvb21Bcm91bmQodGhpcy5fbGFzdE1vdXNlUG9zLCB6b29tICsgZGVsdGEpO1xuXHRcdH1cblx0fVxufSk7XG5cbkwuTWFwLmFkZEluaXRIb29rKCdhZGRIYW5kbGVyJywgJ3Njcm9sbFdoZWVsWm9vbScsIEwuTWFwLlNjcm9sbFdoZWVsWm9vbSk7XG5cblxuXG4vKlxyXG4gKiBFeHRlbmRzIHRoZSBldmVudCBoYW5kbGluZyBjb2RlIHdpdGggZG91YmxlIHRhcCBzdXBwb3J0IGZvciBtb2JpbGUgYnJvd3NlcnMuXHJcbiAqL1xyXG5cclxuTC5leHRlbmQoTC5Eb21FdmVudCwge1xyXG5cclxuXHRfdG91Y2hzdGFydDogTC5Ccm93c2VyLm1zUG9pbnRlciA/ICdNU1BvaW50ZXJEb3duJyA6IEwuQnJvd3Nlci5wb2ludGVyID8gJ3BvaW50ZXJkb3duJyA6ICd0b3VjaHN0YXJ0JyxcclxuXHRfdG91Y2hlbmQ6IEwuQnJvd3Nlci5tc1BvaW50ZXIgPyAnTVNQb2ludGVyVXAnIDogTC5Ccm93c2VyLnBvaW50ZXIgPyAncG9pbnRlcnVwJyA6ICd0b3VjaGVuZCcsXHJcblxyXG5cdC8vIGluc3BpcmVkIGJ5IFplcHRvIHRvdWNoIGNvZGUgYnkgVGhvbWFzIEZ1Y2hzXHJcblx0YWRkRG91YmxlVGFwTGlzdGVuZXI6IGZ1bmN0aW9uIChvYmosIGhhbmRsZXIsIGlkKSB7XHJcblx0XHR2YXIgbGFzdCwgdG91Y2gsXHJcblx0XHQgICAgZG91YmxlVGFwID0gZmFsc2UsXHJcblx0XHQgICAgZGVsYXkgPSAyNTA7XHJcblxyXG5cdFx0ZnVuY3Rpb24gb25Ub3VjaFN0YXJ0KGUpIHtcclxuXHRcdFx0dmFyIGNvdW50O1xyXG5cclxuXHRcdFx0aWYgKEwuQnJvd3Nlci5wb2ludGVyKSB7XHJcblx0XHRcdFx0Y291bnQgPSBMLkRvbUV2ZW50Ll9wb2ludGVyc0NvdW50O1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNvdW50ID0gZS50b3VjaGVzLmxlbmd0aDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGNvdW50ID4gMSkgeyByZXR1cm47IH1cclxuXHJcblx0XHRcdHZhciBub3cgPSBEYXRlLm5vdygpLFxyXG5cdFx0XHQgICAgZGVsdGEgPSBub3cgLSAobGFzdCB8fCBub3cpO1xyXG5cclxuXHRcdFx0dG91Y2ggPSBlLnRvdWNoZXMgPyBlLnRvdWNoZXNbMF0gOiBlO1xyXG5cdFx0XHRkb3VibGVUYXAgPSAoZGVsdGEgPiAwICYmIGRlbHRhIDw9IGRlbGF5KTtcclxuXHRcdFx0bGFzdCA9IG5vdztcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBvblRvdWNoRW5kKCkge1xyXG5cdFx0XHRpZiAoZG91YmxlVGFwICYmICF0b3VjaC5jYW5jZWxCdWJibGUpIHtcclxuXHRcdFx0XHRpZiAoTC5Ccm93c2VyLnBvaW50ZXIpIHtcclxuXHRcdFx0XHRcdC8vIHdvcmsgYXJvdW5kIC50eXBlIGJlaW5nIHJlYWRvbmx5IHdpdGggTVNQb2ludGVyKiBldmVudHNcclxuXHRcdFx0XHRcdHZhciBuZXdUb3VjaCA9IHt9LFxyXG5cdFx0XHRcdFx0ICAgIHByb3AsIGk7XHJcblxyXG5cdFx0XHRcdFx0Zm9yIChpIGluIHRvdWNoKSB7XHJcblx0XHRcdFx0XHRcdHByb3AgPSB0b3VjaFtpXTtcclxuXHRcdFx0XHRcdFx0bmV3VG91Y2hbaV0gPSBwcm9wICYmIHByb3AuYmluZCA/IHByb3AuYmluZCh0b3VjaCkgOiBwcm9wO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0dG91Y2ggPSBuZXdUb3VjaDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dG91Y2gudHlwZSA9ICdkYmxjbGljayc7XHJcblx0XHRcdFx0aGFuZGxlcih0b3VjaCk7XHJcblx0XHRcdFx0bGFzdCA9IG51bGw7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR2YXIgcHJlID0gJ19sZWFmbGV0XycsXHJcblx0XHQgICAgdG91Y2hzdGFydCA9IHRoaXMuX3RvdWNoc3RhcnQsXHJcblx0XHQgICAgdG91Y2hlbmQgPSB0aGlzLl90b3VjaGVuZDtcclxuXHJcblx0XHRvYmpbcHJlICsgdG91Y2hzdGFydCArIGlkXSA9IG9uVG91Y2hTdGFydDtcclxuXHRcdG9ialtwcmUgKyB0b3VjaGVuZCArIGlkXSA9IG9uVG91Y2hFbmQ7XHJcblxyXG5cdFx0b2JqLmFkZEV2ZW50TGlzdGVuZXIodG91Y2hzdGFydCwgb25Ub3VjaFN0YXJ0LCBmYWxzZSk7XHJcblx0XHRvYmouYWRkRXZlbnRMaXN0ZW5lcih0b3VjaGVuZCwgb25Ub3VjaEVuZCwgZmFsc2UpO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0cmVtb3ZlRG91YmxlVGFwTGlzdGVuZXI6IGZ1bmN0aW9uIChvYmosIGlkKSB7XHJcblx0XHR2YXIgcHJlID0gJ19sZWFmbGV0XycsXHJcblx0XHQgICAgdG91Y2hlbmQgPSBvYmpbcHJlICsgdGhpcy5fdG91Y2hlbmQgKyBpZF07XHJcblxyXG5cdFx0b2JqLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5fdG91Y2hzdGFydCwgb2JqW3ByZSArIHRoaXMuX3RvdWNoc3RhcnQgKyBpZF0sIGZhbHNlKTtcclxuXHRcdG9iai5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuX3RvdWNoZW5kLCB0b3VjaGVuZCwgZmFsc2UpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxufSk7XHJcblxuXG5cbi8qXG4gKiBFeHRlbmRzIEwuRG9tRXZlbnQgdG8gcHJvdmlkZSB0b3VjaCBzdXBwb3J0IGZvciBJbnRlcm5ldCBFeHBsb3JlciBhbmQgV2luZG93cy1iYXNlZCBkZXZpY2VzLlxuICovXG5cbkwuZXh0ZW5kKEwuRG9tRXZlbnQsIHtcblxuXHRQT0lOVEVSX0RPV046ICAgTC5Ccm93c2VyLm1zUG9pbnRlciA/ICdNU1BvaW50ZXJEb3duJyAgIDogJ3BvaW50ZXJkb3duJyxcblx0UE9JTlRFUl9NT1ZFOiAgIEwuQnJvd3Nlci5tc1BvaW50ZXIgPyAnTVNQb2ludGVyTW92ZScgICA6ICdwb2ludGVybW92ZScsXG5cdFBPSU5URVJfVVA6ICAgICBMLkJyb3dzZXIubXNQb2ludGVyID8gJ01TUG9pbnRlclVwJyAgICAgOiAncG9pbnRlcnVwJyxcblx0UE9JTlRFUl9DQU5DRUw6IEwuQnJvd3Nlci5tc1BvaW50ZXIgPyAnTVNQb2ludGVyQ2FuY2VsJyA6ICdwb2ludGVyY2FuY2VsJyxcblxuXHRfcG9pbnRlcnM6IHt9LFxuXHRfcG9pbnRlcnNDb3VudDogMCxcblxuXHQvLyBQcm92aWRlcyBhIHRvdWNoIGV2ZW50cyB3cmFwcGVyIGZvciAobXMpcG9pbnRlciBldmVudHMuXG5cdC8vIHJlZiBodHRwOi8vd3d3LnczLm9yZy9UUi9wb2ludGVyZXZlbnRzLyBodHRwczovL3d3dy53My5vcmcvQnVncy9QdWJsaWMvc2hvd19idWcuY2dpP2lkPTIyODkwXG5cblx0YWRkUG9pbnRlckxpc3RlbmVyOiBmdW5jdGlvbiAob2JqLCB0eXBlLCBoYW5kbGVyLCBpZCkge1xuXG5cdFx0aWYgKHR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xuXHRcdFx0dGhpcy5fYWRkUG9pbnRlclN0YXJ0KG9iaiwgaGFuZGxlciwgaWQpO1xuXG5cdFx0fSBlbHNlIGlmICh0eXBlID09PSAndG91Y2htb3ZlJykge1xuXHRcdFx0dGhpcy5fYWRkUG9pbnRlck1vdmUob2JqLCBoYW5kbGVyLCBpZCk7XG5cblx0XHR9IGVsc2UgaWYgKHR5cGUgPT09ICd0b3VjaGVuZCcpIHtcblx0XHRcdHRoaXMuX2FkZFBvaW50ZXJFbmQob2JqLCBoYW5kbGVyLCBpZCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0cmVtb3ZlUG9pbnRlckxpc3RlbmVyOiBmdW5jdGlvbiAob2JqLCB0eXBlLCBpZCkge1xuXHRcdHZhciBoYW5kbGVyID0gb2JqWydfbGVhZmxldF8nICsgdHlwZSArIGlkXTtcblxuXHRcdGlmICh0eXBlID09PSAndG91Y2hzdGFydCcpIHtcblx0XHRcdG9iai5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuUE9JTlRFUl9ET1dOLCBoYW5kbGVyLCBmYWxzZSk7XG5cblx0XHR9IGVsc2UgaWYgKHR5cGUgPT09ICd0b3VjaG1vdmUnKSB7XG5cdFx0XHRvYmoucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLlBPSU5URVJfTU9WRSwgaGFuZGxlciwgZmFsc2UpO1xuXG5cdFx0fSBlbHNlIGlmICh0eXBlID09PSAndG91Y2hlbmQnKSB7XG5cdFx0XHRvYmoucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLlBPSU5URVJfVVAsIGhhbmRsZXIsIGZhbHNlKTtcblx0XHRcdG9iai5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuUE9JTlRFUl9DQU5DRUwsIGhhbmRsZXIsIGZhbHNlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRfYWRkUG9pbnRlclN0YXJ0OiBmdW5jdGlvbiAob2JqLCBoYW5kbGVyLCBpZCkge1xuXHRcdHZhciBvbkRvd24gPSBMLmJpbmQoZnVuY3Rpb24gKGUpIHtcblx0XHRcdGlmIChlLnBvaW50ZXJUeXBlICE9PSAnbW91c2UnICYmIGUucG9pbnRlclR5cGUgIT09IGUuTVNQT0lOVEVSX1RZUEVfTU9VU0UpIHtcblx0XHRcdFx0TC5Eb21FdmVudC5wcmV2ZW50RGVmYXVsdChlKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5faGFuZGxlUG9pbnRlcihlLCBoYW5kbGVyKTtcblx0XHR9LCB0aGlzKTtcblxuXHRcdG9ialsnX2xlYWZsZXRfdG91Y2hzdGFydCcgKyBpZF0gPSBvbkRvd247XG5cdFx0b2JqLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5QT0lOVEVSX0RPV04sIG9uRG93biwgZmFsc2UpO1xuXG5cdFx0Ly8gbmVlZCB0byBrZWVwIHRyYWNrIG9mIHdoYXQgcG9pbnRlcnMgYW5kIGhvdyBtYW55IGFyZSBhY3RpdmUgdG8gcHJvdmlkZSBlLnRvdWNoZXMgZW11bGF0aW9uXG5cdFx0aWYgKCF0aGlzLl9wb2ludGVyRG9jTGlzdGVuZXIpIHtcblx0XHRcdHZhciBwb2ludGVyVXAgPSBMLmJpbmQodGhpcy5fZ2xvYmFsUG9pbnRlclVwLCB0aGlzKTtcblxuXHRcdFx0Ly8gd2UgbGlzdGVuIGRvY3VtZW50RWxlbWVudCBhcyBhbnkgZHJhZ3MgdGhhdCBlbmQgYnkgbW92aW5nIHRoZSB0b3VjaCBvZmYgdGhlIHNjcmVlbiBnZXQgZmlyZWQgdGhlcmVcblx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHRoaXMuUE9JTlRFUl9ET1dOLCBMLmJpbmQodGhpcy5fZ2xvYmFsUG9pbnRlckRvd24sIHRoaXMpLCB0cnVlKTtcblx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHRoaXMuUE9JTlRFUl9NT1ZFLCBMLmJpbmQodGhpcy5fZ2xvYmFsUG9pbnRlck1vdmUsIHRoaXMpLCB0cnVlKTtcblx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHRoaXMuUE9JTlRFUl9VUCwgcG9pbnRlclVwLCB0cnVlKTtcblx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHRoaXMuUE9JTlRFUl9DQU5DRUwsIHBvaW50ZXJVcCwgdHJ1ZSk7XG5cblx0XHRcdHRoaXMuX3BvaW50ZXJEb2NMaXN0ZW5lciA9IHRydWU7XG5cdFx0fVxuXHR9LFxuXG5cdF9nbG9iYWxQb2ludGVyRG93bjogZnVuY3Rpb24gKGUpIHtcblx0XHR0aGlzLl9wb2ludGVyc1tlLnBvaW50ZXJJZF0gPSBlO1xuXHRcdHRoaXMuX3BvaW50ZXJzQ291bnQrKztcblx0fSxcblxuXHRfZ2xvYmFsUG9pbnRlck1vdmU6IGZ1bmN0aW9uIChlKSB7XG5cdFx0aWYgKHRoaXMuX3BvaW50ZXJzW2UucG9pbnRlcklkXSkge1xuXHRcdFx0dGhpcy5fcG9pbnRlcnNbZS5wb2ludGVySWRdID0gZTtcblx0XHR9XG5cdH0sXG5cblx0X2dsb2JhbFBvaW50ZXJVcDogZnVuY3Rpb24gKGUpIHtcblx0XHRkZWxldGUgdGhpcy5fcG9pbnRlcnNbZS5wb2ludGVySWRdO1xuXHRcdHRoaXMuX3BvaW50ZXJzQ291bnQtLTtcblx0fSxcblxuXHRfaGFuZGxlUG9pbnRlcjogZnVuY3Rpb24gKGUsIGhhbmRsZXIpIHtcblx0XHRlLnRvdWNoZXMgPSBbXTtcblx0XHRmb3IgKHZhciBpIGluIHRoaXMuX3BvaW50ZXJzKSB7XG5cdFx0XHRlLnRvdWNoZXMucHVzaCh0aGlzLl9wb2ludGVyc1tpXSk7XG5cdFx0fVxuXHRcdGUuY2hhbmdlZFRvdWNoZXMgPSBbZV07XG5cblx0XHRoYW5kbGVyKGUpO1xuXHR9LFxuXG5cdF9hZGRQb2ludGVyTW92ZTogZnVuY3Rpb24gKG9iaiwgaGFuZGxlciwgaWQpIHtcblx0XHR2YXIgb25Nb3ZlID0gTC5iaW5kKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHQvLyBkb24ndCBmaXJlIHRvdWNoIG1vdmVzIHdoZW4gbW91c2UgaXNuJ3QgZG93blxuXHRcdFx0aWYgKChlLnBvaW50ZXJUeXBlID09PSBlLk1TUE9JTlRFUl9UWVBFX01PVVNFIHx8IGUucG9pbnRlclR5cGUgPT09ICdtb3VzZScpICYmIGUuYnV0dG9ucyA9PT0gMCkgeyByZXR1cm47IH1cblxuXHRcdFx0dGhpcy5faGFuZGxlUG9pbnRlcihlLCBoYW5kbGVyKTtcblx0XHR9LCB0aGlzKTtcblxuXHRcdG9ialsnX2xlYWZsZXRfdG91Y2htb3ZlJyArIGlkXSA9IG9uTW92ZTtcblx0XHRvYmouYWRkRXZlbnRMaXN0ZW5lcih0aGlzLlBPSU5URVJfTU9WRSwgb25Nb3ZlLCBmYWxzZSk7XG5cdH0sXG5cblx0X2FkZFBvaW50ZXJFbmQ6IGZ1bmN0aW9uIChvYmosIGhhbmRsZXIsIGlkKSB7XG5cdFx0dmFyIG9uVXAgPSBMLmJpbmQoZnVuY3Rpb24gKGUpIHtcblx0XHRcdHRoaXMuX2hhbmRsZVBvaW50ZXIoZSwgaGFuZGxlcik7XG5cdFx0fSwgdGhpcyk7XG5cblx0XHRvYmpbJ19sZWFmbGV0X3RvdWNoZW5kJyArIGlkXSA9IG9uVXA7XG5cdFx0b2JqLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5QT0lOVEVSX1VQLCBvblVwLCBmYWxzZSk7XG5cdFx0b2JqLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5QT0lOVEVSX0NBTkNFTCwgb25VcCwgZmFsc2UpO1xuXHR9XG59KTtcblxuXG5cbi8qXG4gKiBMLkhhbmRsZXIuVG91Y2hab29tIGlzIHVzZWQgYnkgTC5NYXAgdG8gYWRkIHBpbmNoIHpvb20gb24gc3VwcG9ydGVkIG1vYmlsZSBicm93c2Vycy5cbiAqL1xuXG5MLk1hcC5tZXJnZU9wdGlvbnMoe1xuXHR0b3VjaFpvb206IEwuQnJvd3Nlci50b3VjaCAmJiAhTC5Ccm93c2VyLmFuZHJvaWQyMyxcblx0Ym91bmNlQXRab29tTGltaXRzOiB0cnVlXG59KTtcblxuTC5NYXAuVG91Y2hab29tID0gTC5IYW5kbGVyLmV4dGVuZCh7XG5cdGFkZEhvb2tzOiBmdW5jdGlvbiAoKSB7XG5cdFx0TC5Eb21FdmVudC5vbih0aGlzLl9tYXAuX2NvbnRhaW5lciwgJ3RvdWNoc3RhcnQnLCB0aGlzLl9vblRvdWNoU3RhcnQsIHRoaXMpO1xuXHR9LFxuXG5cdHJlbW92ZUhvb2tzOiBmdW5jdGlvbiAoKSB7XG5cdFx0TC5Eb21FdmVudC5vZmYodGhpcy5fbWFwLl9jb250YWluZXIsICd0b3VjaHN0YXJ0JywgdGhpcy5fb25Ub3VjaFN0YXJ0LCB0aGlzKTtcblx0fSxcblxuXHRfb25Ub3VjaFN0YXJ0OiBmdW5jdGlvbiAoZSkge1xuXHRcdHZhciBtYXAgPSB0aGlzLl9tYXA7XG5cblx0XHRpZiAoIWUudG91Y2hlcyB8fCBlLnRvdWNoZXMubGVuZ3RoICE9PSAyIHx8IG1hcC5fYW5pbWF0aW5nWm9vbSB8fCB0aGlzLl96b29taW5nKSB7IHJldHVybjsgfVxuXG5cdFx0dmFyIHAxID0gbWFwLm1vdXNlRXZlbnRUb0NvbnRhaW5lclBvaW50KGUudG91Y2hlc1swXSksXG5cdFx0ICAgIHAyID0gbWFwLm1vdXNlRXZlbnRUb0NvbnRhaW5lclBvaW50KGUudG91Y2hlc1sxXSk7XG5cblx0XHR0aGlzLl9jZW50ZXJQb2ludCA9IG1hcC5nZXRTaXplKCkuX2RpdmlkZUJ5KDIpO1xuXHRcdHRoaXMuX3N0YXJ0TGF0TG5nID0gbWFwLmNvbnRhaW5lclBvaW50VG9MYXRMbmcodGhpcy5fY2VudGVyUG9pbnQpO1xuXHRcdGlmIChtYXAub3B0aW9ucy50b3VjaFpvb20gIT09ICdjZW50ZXInKSB7XG5cdFx0XHR0aGlzLl9waW5jaFN0YXJ0TGF0TG5nID0gbWFwLmNvbnRhaW5lclBvaW50VG9MYXRMbmcocDEuYWRkKHAyKS5fZGl2aWRlQnkoMikpO1xuXHRcdH1cblxuXHRcdHRoaXMuX3N0YXJ0RGlzdCA9IHAxLmRpc3RhbmNlVG8ocDIpO1xuXHRcdHRoaXMuX3N0YXJ0Wm9vbSA9IG1hcC5nZXRab29tKCk7XG5cblx0XHR0aGlzLl9tb3ZlZCA9IGZhbHNlO1xuXHRcdHRoaXMuX3pvb21pbmcgPSB0cnVlO1xuXG5cdFx0bWFwLnN0b3AoKTtcblxuXHRcdEwuRG9tRXZlbnRcblx0XHQgICAgLm9uKGRvY3VtZW50LCAndG91Y2htb3ZlJywgdGhpcy5fb25Ub3VjaE1vdmUsIHRoaXMpXG5cdFx0ICAgIC5vbihkb2N1bWVudCwgJ3RvdWNoZW5kJywgdGhpcy5fb25Ub3VjaEVuZCwgdGhpcyk7XG5cblx0XHRMLkRvbUV2ZW50LnByZXZlbnREZWZhdWx0KGUpO1xuXHR9LFxuXG5cdF9vblRvdWNoTW92ZTogZnVuY3Rpb24gKGUpIHtcblx0XHRpZiAoIWUudG91Y2hlcyB8fCBlLnRvdWNoZXMubGVuZ3RoICE9PSAyIHx8ICF0aGlzLl96b29taW5nKSB7IHJldHVybjsgfVxuXG5cdFx0dmFyIG1hcCA9IHRoaXMuX21hcCxcblx0XHQgICAgcDEgPSBtYXAubW91c2VFdmVudFRvQ29udGFpbmVyUG9pbnQoZS50b3VjaGVzWzBdKSxcblx0XHQgICAgcDIgPSBtYXAubW91c2VFdmVudFRvQ29udGFpbmVyUG9pbnQoZS50b3VjaGVzWzFdKSxcblx0XHQgICAgc2NhbGUgPSBwMS5kaXN0YW5jZVRvKHAyKSAvIHRoaXMuX3N0YXJ0RGlzdDtcblxuXG5cdFx0dGhpcy5fem9vbSA9IG1hcC5nZXRTY2FsZVpvb20oc2NhbGUsIHRoaXMuX3N0YXJ0Wm9vbSk7XG5cblx0XHRpZiAobWFwLm9wdGlvbnMudG91Y2hab29tID09PSAnY2VudGVyJykge1xuXHRcdFx0dGhpcy5fY2VudGVyID0gdGhpcy5fc3RhcnRMYXRMbmc7XG5cdFx0XHRpZiAoc2NhbGUgPT09IDEpIHsgcmV0dXJuOyB9XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIEdldCBkZWx0YSBmcm9tIHBpbmNoIHRvIGNlbnRlciwgc28gY2VudGVyTGF0TG5nIGlzIGRlbHRhIGFwcGxpZWQgdG8gaW5pdGlhbCBwaW5jaExhdExuZ1xuXHRcdFx0dmFyIGRlbHRhID0gcDEuX2FkZChwMikuX2RpdmlkZUJ5KDIpLl9zdWJ0cmFjdCh0aGlzLl9jZW50ZXJQb2ludCk7XG5cdFx0XHRpZiAoc2NhbGUgPT09IDEgJiYgZGVsdGEueCA9PT0gMCAmJiBkZWx0YS55ID09PSAwKSB7IHJldHVybjsgfVxuXHRcdFx0dGhpcy5fY2VudGVyID0gbWFwLnVucHJvamVjdChtYXAucHJvamVjdCh0aGlzLl9waW5jaFN0YXJ0TGF0TG5nKS5zdWJ0cmFjdChkZWx0YSkpO1xuXHRcdH1cblxuXHRcdGlmICghbWFwLm9wdGlvbnMuYm91bmNlQXRab29tTGltaXRzKSB7XG5cdFx0XHRpZiAoKHRoaXMuX3pvb20gPD0gbWFwLmdldE1pblpvb20oKSAmJiBzY2FsZSA8IDEpIHx8XG5cdFx0ICAgICAgICAodGhpcy5fem9vbSA+PSBtYXAuZ2V0TWF4Wm9vbSgpICYmIHNjYWxlID4gMSkpIHsgcmV0dXJuOyB9XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLl9tb3ZlZCkge1xuXHRcdFx0bWFwLl9tb3ZlU3RhcnQodHJ1ZSk7XG5cdFx0XHR0aGlzLl9tb3ZlZCA9IHRydWU7XG5cdFx0fVxuXG5cdFx0TC5VdGlsLmNhbmNlbEFuaW1GcmFtZSh0aGlzLl9hbmltUmVxdWVzdCk7XG5cblx0XHR2YXIgbW92ZUZuID0gTC5iaW5kKG1hcC5fbW92ZSwgbWFwLCB0aGlzLl9jZW50ZXIsIHRoaXMuX3pvb20sIHtwaW5jaDogdHJ1ZSwgcm91bmQ6IGZhbHNlfSk7XG5cdFx0dGhpcy5fYW5pbVJlcXVlc3QgPSBMLlV0aWwucmVxdWVzdEFuaW1GcmFtZShtb3ZlRm4sIHRoaXMsIHRydWUpO1xuXG5cdFx0TC5Eb21FdmVudC5wcmV2ZW50RGVmYXVsdChlKTtcblx0fSxcblxuXHRfb25Ub3VjaEVuZDogZnVuY3Rpb24gKCkge1xuXHRcdGlmICghdGhpcy5fbW92ZWQgfHwgIXRoaXMuX3pvb21pbmcpIHtcblx0XHRcdHRoaXMuX3pvb21pbmcgPSBmYWxzZTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLl96b29taW5nID0gZmFsc2U7XG5cdFx0TC5VdGlsLmNhbmNlbEFuaW1GcmFtZSh0aGlzLl9hbmltUmVxdWVzdCk7XG5cblx0XHRMLkRvbUV2ZW50XG5cdFx0ICAgIC5vZmYoZG9jdW1lbnQsICd0b3VjaG1vdmUnLCB0aGlzLl9vblRvdWNoTW92ZSlcblx0XHQgICAgLm9mZihkb2N1bWVudCwgJ3RvdWNoZW5kJywgdGhpcy5fb25Ub3VjaEVuZCk7XG5cblx0XHR2YXIgem9vbSA9IHRoaXMuX3pvb207XG5cdFx0em9vbSA9IHRoaXMuX21hcC5fbGltaXRab29tKHpvb20gLSB0aGlzLl9zdGFydFpvb20gPiAwID8gTWF0aC5jZWlsKHpvb20pIDogTWF0aC5mbG9vcih6b29tKSk7XG5cblxuXHRcdHRoaXMuX21hcC5fYW5pbWF0ZVpvb20odGhpcy5fY2VudGVyLCB6b29tLCB0cnVlLCB0cnVlKTtcblx0fVxufSk7XG5cbkwuTWFwLmFkZEluaXRIb29rKCdhZGRIYW5kbGVyJywgJ3RvdWNoWm9vbScsIEwuTWFwLlRvdWNoWm9vbSk7XG5cblxuXG4vKlxuICogTC5NYXAuVGFwIGlzIHVzZWQgdG8gZW5hYmxlIG1vYmlsZSBoYWNrcyBsaWtlIHF1aWNrIHRhcHMgYW5kIGxvbmcgaG9sZC5cbiAqL1xuXG5MLk1hcC5tZXJnZU9wdGlvbnMoe1xuXHR0YXA6IHRydWUsXG5cdHRhcFRvbGVyYW5jZTogMTVcbn0pO1xuXG5MLk1hcC5UYXAgPSBMLkhhbmRsZXIuZXh0ZW5kKHtcblx0YWRkSG9va3M6IGZ1bmN0aW9uICgpIHtcblx0XHRMLkRvbUV2ZW50Lm9uKHRoaXMuX21hcC5fY29udGFpbmVyLCAndG91Y2hzdGFydCcsIHRoaXMuX29uRG93biwgdGhpcyk7XG5cdH0sXG5cblx0cmVtb3ZlSG9va3M6IGZ1bmN0aW9uICgpIHtcblx0XHRMLkRvbUV2ZW50Lm9mZih0aGlzLl9tYXAuX2NvbnRhaW5lciwgJ3RvdWNoc3RhcnQnLCB0aGlzLl9vbkRvd24sIHRoaXMpO1xuXHR9LFxuXG5cdF9vbkRvd246IGZ1bmN0aW9uIChlKSB7XG5cdFx0aWYgKCFlLnRvdWNoZXMpIHsgcmV0dXJuOyB9XG5cblx0XHRMLkRvbUV2ZW50LnByZXZlbnREZWZhdWx0KGUpO1xuXG5cdFx0dGhpcy5fZmlyZUNsaWNrID0gdHJ1ZTtcblxuXHRcdC8vIGRvbid0IHNpbXVsYXRlIGNsaWNrIG9yIHRyYWNrIGxvbmdwcmVzcyBpZiBtb3JlIHRoYW4gMSB0b3VjaFxuXHRcdGlmIChlLnRvdWNoZXMubGVuZ3RoID4gMSkge1xuXHRcdFx0dGhpcy5fZmlyZUNsaWNrID0gZmFsc2U7XG5cdFx0XHRjbGVhclRpbWVvdXQodGhpcy5faG9sZFRpbWVvdXQpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHZhciBmaXJzdCA9IGUudG91Y2hlc1swXSxcblx0XHQgICAgZWwgPSBmaXJzdC50YXJnZXQ7XG5cblx0XHR0aGlzLl9zdGFydFBvcyA9IHRoaXMuX25ld1BvcyA9IG5ldyBMLlBvaW50KGZpcnN0LmNsaWVudFgsIGZpcnN0LmNsaWVudFkpO1xuXG5cdFx0Ly8gaWYgdG91Y2hpbmcgYSBsaW5rLCBoaWdobGlnaHQgaXRcblx0XHRpZiAoZWwudGFnTmFtZSAmJiBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdhJykge1xuXHRcdFx0TC5Eb21VdGlsLmFkZENsYXNzKGVsLCAnbGVhZmxldC1hY3RpdmUnKTtcblx0XHR9XG5cblx0XHQvLyBzaW11bGF0ZSBsb25nIGhvbGQgYnV0IHNldHRpbmcgYSB0aW1lb3V0XG5cdFx0dGhpcy5faG9sZFRpbWVvdXQgPSBzZXRUaW1lb3V0KEwuYmluZChmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAodGhpcy5faXNUYXBWYWxpZCgpKSB7XG5cdFx0XHRcdHRoaXMuX2ZpcmVDbGljayA9IGZhbHNlO1xuXHRcdFx0XHR0aGlzLl9vblVwKCk7XG5cdFx0XHRcdHRoaXMuX3NpbXVsYXRlRXZlbnQoJ2NvbnRleHRtZW51JywgZmlyc3QpO1xuXHRcdFx0fVxuXHRcdH0sIHRoaXMpLCAxMDAwKTtcblxuXHRcdHRoaXMuX3NpbXVsYXRlRXZlbnQoJ21vdXNlZG93bicsIGZpcnN0KTtcblxuXHRcdEwuRG9tRXZlbnQub24oZG9jdW1lbnQsIHtcblx0XHRcdHRvdWNobW92ZTogdGhpcy5fb25Nb3ZlLFxuXHRcdFx0dG91Y2hlbmQ6IHRoaXMuX29uVXBcblx0XHR9LCB0aGlzKTtcblx0fSxcblxuXHRfb25VcDogZnVuY3Rpb24gKGUpIHtcblx0XHRjbGVhclRpbWVvdXQodGhpcy5faG9sZFRpbWVvdXQpO1xuXG5cdFx0TC5Eb21FdmVudC5vZmYoZG9jdW1lbnQsIHtcblx0XHRcdHRvdWNobW92ZTogdGhpcy5fb25Nb3ZlLFxuXHRcdFx0dG91Y2hlbmQ6IHRoaXMuX29uVXBcblx0XHR9LCB0aGlzKTtcblxuXHRcdGlmICh0aGlzLl9maXJlQ2xpY2sgJiYgZSAmJiBlLmNoYW5nZWRUb3VjaGVzKSB7XG5cblx0XHRcdHZhciBmaXJzdCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0sXG5cdFx0XHQgICAgZWwgPSBmaXJzdC50YXJnZXQ7XG5cblx0XHRcdGlmIChlbCAmJiBlbC50YWdOYW1lICYmIGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2EnKSB7XG5cdFx0XHRcdEwuRG9tVXRpbC5yZW1vdmVDbGFzcyhlbCwgJ2xlYWZsZXQtYWN0aXZlJyk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX3NpbXVsYXRlRXZlbnQoJ21vdXNldXAnLCBmaXJzdCk7XG5cblx0XHRcdC8vIHNpbXVsYXRlIGNsaWNrIGlmIHRoZSB0b3VjaCBkaWRuJ3QgbW92ZSB0b28gbXVjaFxuXHRcdFx0aWYgKHRoaXMuX2lzVGFwVmFsaWQoKSkge1xuXHRcdFx0XHR0aGlzLl9zaW11bGF0ZUV2ZW50KCdjbGljaycsIGZpcnN0KTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0X2lzVGFwVmFsaWQ6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5fbmV3UG9zLmRpc3RhbmNlVG8odGhpcy5fc3RhcnRQb3MpIDw9IHRoaXMuX21hcC5vcHRpb25zLnRhcFRvbGVyYW5jZTtcblx0fSxcblxuXHRfb25Nb3ZlOiBmdW5jdGlvbiAoZSkge1xuXHRcdHZhciBmaXJzdCA9IGUudG91Y2hlc1swXTtcblx0XHR0aGlzLl9uZXdQb3MgPSBuZXcgTC5Qb2ludChmaXJzdC5jbGllbnRYLCBmaXJzdC5jbGllbnRZKTtcblx0XHR0aGlzLl9zaW11bGF0ZUV2ZW50KCdtb3VzZW1vdmUnLCBmaXJzdCk7XG5cdH0sXG5cblx0X3NpbXVsYXRlRXZlbnQ6IGZ1bmN0aW9uICh0eXBlLCBlKSB7XG5cdFx0dmFyIHNpbXVsYXRlZEV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnRzJyk7XG5cblx0XHRzaW11bGF0ZWRFdmVudC5fc2ltdWxhdGVkID0gdHJ1ZTtcblx0XHRlLnRhcmdldC5fc2ltdWxhdGVkQ2xpY2sgPSB0cnVlO1xuXG5cdFx0c2ltdWxhdGVkRXZlbnQuaW5pdE1vdXNlRXZlbnQoXG5cdFx0ICAgICAgICB0eXBlLCB0cnVlLCB0cnVlLCB3aW5kb3csIDEsXG5cdFx0ICAgICAgICBlLnNjcmVlblgsIGUuc2NyZWVuWSxcblx0XHQgICAgICAgIGUuY2xpZW50WCwgZS5jbGllbnRZLFxuXHRcdCAgICAgICAgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAsIG51bGwpO1xuXG5cdFx0ZS50YXJnZXQuZGlzcGF0Y2hFdmVudChzaW11bGF0ZWRFdmVudCk7XG5cdH1cbn0pO1xuXG5pZiAoTC5Ccm93c2VyLnRvdWNoICYmICFMLkJyb3dzZXIucG9pbnRlcikge1xuXHRMLk1hcC5hZGRJbml0SG9vaygnYWRkSGFuZGxlcicsICd0YXAnLCBMLk1hcC5UYXApO1xufVxuXG5cblxuLypcbiAqIEwuSGFuZGxlci5TaGlmdERyYWdab29tIGlzIHVzZWQgdG8gYWRkIHNoaWZ0LWRyYWcgem9vbSBpbnRlcmFjdGlvbiB0byB0aGUgbWFwXG4gICogKHpvb20gdG8gYSBzZWxlY3RlZCBib3VuZGluZyBib3gpLCBlbmFibGVkIGJ5IGRlZmF1bHQuXG4gKi9cblxuTC5NYXAubWVyZ2VPcHRpb25zKHtcblx0Ym94Wm9vbTogdHJ1ZVxufSk7XG5cbkwuTWFwLkJveFpvb20gPSBMLkhhbmRsZXIuZXh0ZW5kKHtcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKG1hcCkge1xuXHRcdHRoaXMuX21hcCA9IG1hcDtcblx0XHR0aGlzLl9jb250YWluZXIgPSBtYXAuX2NvbnRhaW5lcjtcblx0XHR0aGlzLl9wYW5lID0gbWFwLl9wYW5lcy5vdmVybGF5UGFuZTtcblx0fSxcblxuXHRhZGRIb29rczogZnVuY3Rpb24gKCkge1xuXHRcdEwuRG9tRXZlbnQub24odGhpcy5fY29udGFpbmVyLCAnbW91c2Vkb3duJywgdGhpcy5fb25Nb3VzZURvd24sIHRoaXMpO1xuXHR9LFxuXG5cdHJlbW92ZUhvb2tzOiBmdW5jdGlvbiAoKSB7XG5cdFx0TC5Eb21FdmVudC5vZmYodGhpcy5fY29udGFpbmVyLCAnbW91c2Vkb3duJywgdGhpcy5fb25Nb3VzZURvd24sIHRoaXMpO1xuXHR9LFxuXG5cdG1vdmVkOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX21vdmVkO1xuXHR9LFxuXG5cdF9yZXNldFN0YXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fbW92ZWQgPSBmYWxzZTtcblx0fSxcblxuXHRfb25Nb3VzZURvd246IGZ1bmN0aW9uIChlKSB7XG5cdFx0aWYgKCFlLnNoaWZ0S2V5IHx8ICgoZS53aGljaCAhPT0gMSkgJiYgKGUuYnV0dG9uICE9PSAxKSkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0XHR0aGlzLl9yZXNldFN0YXRlKCk7XG5cblx0XHRMLkRvbVV0aWwuZGlzYWJsZVRleHRTZWxlY3Rpb24oKTtcblx0XHRMLkRvbVV0aWwuZGlzYWJsZUltYWdlRHJhZygpO1xuXG5cdFx0dGhpcy5fc3RhcnRQb2ludCA9IHRoaXMuX21hcC5tb3VzZUV2ZW50VG9Db250YWluZXJQb2ludChlKTtcblxuXHRcdEwuRG9tRXZlbnQub24oZG9jdW1lbnQsIHtcblx0XHRcdGNvbnRleHRtZW51OiBMLkRvbUV2ZW50LnN0b3AsXG5cdFx0XHRtb3VzZW1vdmU6IHRoaXMuX29uTW91c2VNb3ZlLFxuXHRcdFx0bW91c2V1cDogdGhpcy5fb25Nb3VzZVVwLFxuXHRcdFx0a2V5ZG93bjogdGhpcy5fb25LZXlEb3duXG5cdFx0fSwgdGhpcyk7XG5cdH0sXG5cblx0X29uTW91c2VNb3ZlOiBmdW5jdGlvbiAoZSkge1xuXHRcdGlmICghdGhpcy5fbW92ZWQpIHtcblx0XHRcdHRoaXMuX21vdmVkID0gdHJ1ZTtcblxuXHRcdFx0dGhpcy5fYm94ID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2xlYWZsZXQtem9vbS1ib3gnLCB0aGlzLl9jb250YWluZXIpO1xuXHRcdFx0TC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX2NvbnRhaW5lciwgJ2xlYWZsZXQtY3Jvc3NoYWlyJyk7XG5cblx0XHRcdHRoaXMuX21hcC5maXJlKCdib3h6b29tc3RhcnQnKTtcblx0XHR9XG5cblx0XHR0aGlzLl9wb2ludCA9IHRoaXMuX21hcC5tb3VzZUV2ZW50VG9Db250YWluZXJQb2ludChlKTtcblxuXHRcdHZhciBib3VuZHMgPSBuZXcgTC5Cb3VuZHModGhpcy5fcG9pbnQsIHRoaXMuX3N0YXJ0UG9pbnQpLFxuXHRcdCAgICBzaXplID0gYm91bmRzLmdldFNpemUoKTtcblxuXHRcdEwuRG9tVXRpbC5zZXRQb3NpdGlvbih0aGlzLl9ib3gsIGJvdW5kcy5taW4pO1xuXG5cdFx0dGhpcy5fYm94LnN0eWxlLndpZHRoICA9IHNpemUueCArICdweCc7XG5cdFx0dGhpcy5fYm94LnN0eWxlLmhlaWdodCA9IHNpemUueSArICdweCc7XG5cdH0sXG5cblx0X2ZpbmlzaDogZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0aGlzLl9tb3ZlZCkge1xuXHRcdFx0TC5Eb21VdGlsLnJlbW92ZSh0aGlzLl9ib3gpO1xuXHRcdFx0TC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX2NvbnRhaW5lciwgJ2xlYWZsZXQtY3Jvc3NoYWlyJyk7XG5cdFx0fVxuXG5cdFx0TC5Eb21VdGlsLmVuYWJsZVRleHRTZWxlY3Rpb24oKTtcblx0XHRMLkRvbVV0aWwuZW5hYmxlSW1hZ2VEcmFnKCk7XG5cblx0XHRMLkRvbUV2ZW50Lm9mZihkb2N1bWVudCwge1xuXHRcdFx0Y29udGV4dG1lbnU6IEwuRG9tRXZlbnQuc3RvcCxcblx0XHRcdG1vdXNlbW92ZTogdGhpcy5fb25Nb3VzZU1vdmUsXG5cdFx0XHRtb3VzZXVwOiB0aGlzLl9vbk1vdXNlVXAsXG5cdFx0XHRrZXlkb3duOiB0aGlzLl9vbktleURvd25cblx0XHR9LCB0aGlzKTtcblx0fSxcblxuXHRfb25Nb3VzZVVwOiBmdW5jdGlvbiAoZSkge1xuXHRcdGlmICgoZS53aGljaCAhPT0gMSkgJiYgKGUuYnV0dG9uICE9PSAxKSkgeyByZXR1cm47IH1cblxuXHRcdHRoaXMuX2ZpbmlzaCgpO1xuXG5cdFx0aWYgKCF0aGlzLl9tb3ZlZCkgeyByZXR1cm47IH1cblx0XHQvLyBQb3N0cG9uZSB0byBuZXh0IEpTIHRpY2sgc28gaW50ZXJuYWwgY2xpY2sgZXZlbnQgaGFuZGxpbmdcblx0XHQvLyBzdGlsbCBzZWUgaXQgYXMgXCJtb3ZlZFwiLlxuXHRcdHNldFRpbWVvdXQoTC5iaW5kKHRoaXMuX3Jlc2V0U3RhdGUsIHRoaXMpLCAwKTtcblxuXHRcdHZhciBib3VuZHMgPSBuZXcgTC5MYXRMbmdCb3VuZHMoXG5cdFx0ICAgICAgICB0aGlzLl9tYXAuY29udGFpbmVyUG9pbnRUb0xhdExuZyh0aGlzLl9zdGFydFBvaW50KSxcblx0XHQgICAgICAgIHRoaXMuX21hcC5jb250YWluZXJQb2ludFRvTGF0TG5nKHRoaXMuX3BvaW50KSk7XG5cblx0XHR0aGlzLl9tYXBcblx0XHRcdC5maXRCb3VuZHMoYm91bmRzKVxuXHRcdFx0LmZpcmUoJ2JveHpvb21lbmQnLCB7Ym94Wm9vbUJvdW5kczogYm91bmRzfSk7XG5cdH0sXG5cblx0X29uS2V5RG93bjogZnVuY3Rpb24gKGUpIHtcblx0XHRpZiAoZS5rZXlDb2RlID09PSAyNykge1xuXHRcdFx0dGhpcy5fZmluaXNoKCk7XG5cdFx0fVxuXHR9XG59KTtcblxuTC5NYXAuYWRkSW5pdEhvb2soJ2FkZEhhbmRsZXInLCAnYm94Wm9vbScsIEwuTWFwLkJveFpvb20pO1xuXG5cblxuLypcbiAqIEwuTWFwLktleWJvYXJkIGlzIGhhbmRsaW5nIGtleWJvYXJkIGludGVyYWN0aW9uIHdpdGggdGhlIG1hcCwgZW5hYmxlZCBieSBkZWZhdWx0LlxuICovXG5cbkwuTWFwLm1lcmdlT3B0aW9ucyh7XG5cdGtleWJvYXJkOiB0cnVlLFxuXHRrZXlib2FyZFBhbk9mZnNldDogODAsXG5cdGtleWJvYXJkWm9vbU9mZnNldDogMVxufSk7XG5cbkwuTWFwLktleWJvYXJkID0gTC5IYW5kbGVyLmV4dGVuZCh7XG5cblx0a2V5Q29kZXM6IHtcblx0XHRsZWZ0OiAgICBbMzddLFxuXHRcdHJpZ2h0OiAgIFszOV0sXG5cdFx0ZG93bjogICAgWzQwXSxcblx0XHR1cDogICAgICBbMzhdLFxuXHRcdHpvb21JbjogIFsxODcsIDEwNywgNjEsIDE3MV0sXG5cdFx0em9vbU91dDogWzE4OSwgMTA5LCA1NCwgMTczXVxuXHR9LFxuXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIChtYXApIHtcblx0XHR0aGlzLl9tYXAgPSBtYXA7XG5cblx0XHR0aGlzLl9zZXRQYW5PZmZzZXQobWFwLm9wdGlvbnMua2V5Ym9hcmRQYW5PZmZzZXQpO1xuXHRcdHRoaXMuX3NldFpvb21PZmZzZXQobWFwLm9wdGlvbnMua2V5Ym9hcmRab29tT2Zmc2V0KTtcblx0fSxcblxuXHRhZGRIb29rczogZnVuY3Rpb24gKCkge1xuXHRcdHZhciBjb250YWluZXIgPSB0aGlzLl9tYXAuX2NvbnRhaW5lcjtcblxuXHRcdC8vIG1ha2UgdGhlIGNvbnRhaW5lciBmb2N1c2FibGUgYnkgdGFiYmluZ1xuXHRcdGlmIChjb250YWluZXIudGFiSW5kZXggPD0gMCkge1xuXHRcdFx0Y29udGFpbmVyLnRhYkluZGV4ID0gJzAnO1xuXHRcdH1cblxuXHRcdEwuRG9tRXZlbnQub24oY29udGFpbmVyLCB7XG5cdFx0XHRmb2N1czogdGhpcy5fb25Gb2N1cyxcblx0XHRcdGJsdXI6IHRoaXMuX29uQmx1cixcblx0XHRcdG1vdXNlZG93bjogdGhpcy5fb25Nb3VzZURvd25cblx0XHR9LCB0aGlzKTtcblxuXHRcdHRoaXMuX21hcC5vbih7XG5cdFx0XHRmb2N1czogdGhpcy5fYWRkSG9va3MsXG5cdFx0XHRibHVyOiB0aGlzLl9yZW1vdmVIb29rc1xuXHRcdH0sIHRoaXMpO1xuXHR9LFxuXG5cdHJlbW92ZUhvb2tzOiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fcmVtb3ZlSG9va3MoKTtcblxuXHRcdEwuRG9tRXZlbnQub2ZmKHRoaXMuX21hcC5fY29udGFpbmVyLCB7XG5cdFx0XHRmb2N1czogdGhpcy5fb25Gb2N1cyxcblx0XHRcdGJsdXI6IHRoaXMuX29uQmx1cixcblx0XHRcdG1vdXNlZG93bjogdGhpcy5fb25Nb3VzZURvd25cblx0XHR9LCB0aGlzKTtcblxuXHRcdHRoaXMuX21hcC5vZmYoe1xuXHRcdFx0Zm9jdXM6IHRoaXMuX2FkZEhvb2tzLFxuXHRcdFx0Ymx1cjogdGhpcy5fcmVtb3ZlSG9va3Ncblx0XHR9LCB0aGlzKTtcblx0fSxcblxuXHRfb25Nb3VzZURvd246IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5fZm9jdXNlZCkgeyByZXR1cm47IH1cblxuXHRcdHZhciBib2R5ID0gZG9jdW1lbnQuYm9keSxcblx0XHQgICAgZG9jRWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG5cdFx0ICAgIHRvcCA9IGJvZHkuc2Nyb2xsVG9wIHx8IGRvY0VsLnNjcm9sbFRvcCxcblx0XHQgICAgbGVmdCA9IGJvZHkuc2Nyb2xsTGVmdCB8fCBkb2NFbC5zY3JvbGxMZWZ0O1xuXG5cdFx0dGhpcy5fbWFwLl9jb250YWluZXIuZm9jdXMoKTtcblxuXHRcdHdpbmRvdy5zY3JvbGxUbyhsZWZ0LCB0b3ApO1xuXHR9LFxuXG5cdF9vbkZvY3VzOiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fZm9jdXNlZCA9IHRydWU7XG5cdFx0dGhpcy5fbWFwLmZpcmUoJ2ZvY3VzJyk7XG5cdH0sXG5cblx0X29uQmx1cjogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuX2ZvY3VzZWQgPSBmYWxzZTtcblx0XHR0aGlzLl9tYXAuZmlyZSgnYmx1cicpO1xuXHR9LFxuXG5cdF9zZXRQYW5PZmZzZXQ6IGZ1bmN0aW9uIChwYW4pIHtcblx0XHR2YXIga2V5cyA9IHRoaXMuX3BhbktleXMgPSB7fSxcblx0XHQgICAgY29kZXMgPSB0aGlzLmtleUNvZGVzLFxuXHRcdCAgICBpLCBsZW47XG5cblx0XHRmb3IgKGkgPSAwLCBsZW4gPSBjb2Rlcy5sZWZ0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRrZXlzW2NvZGVzLmxlZnRbaV1dID0gWy0xICogcGFuLCAwXTtcblx0XHR9XG5cdFx0Zm9yIChpID0gMCwgbGVuID0gY29kZXMucmlnaHQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGtleXNbY29kZXMucmlnaHRbaV1dID0gW3BhbiwgMF07XG5cdFx0fVxuXHRcdGZvciAoaSA9IDAsIGxlbiA9IGNvZGVzLmRvd24ubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGtleXNbY29kZXMuZG93bltpXV0gPSBbMCwgcGFuXTtcblx0XHR9XG5cdFx0Zm9yIChpID0gMCwgbGVuID0gY29kZXMudXAubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGtleXNbY29kZXMudXBbaV1dID0gWzAsIC0xICogcGFuXTtcblx0XHR9XG5cdH0sXG5cblx0X3NldFpvb21PZmZzZXQ6IGZ1bmN0aW9uICh6b29tKSB7XG5cdFx0dmFyIGtleXMgPSB0aGlzLl96b29tS2V5cyA9IHt9LFxuXHRcdCAgICBjb2RlcyA9IHRoaXMua2V5Q29kZXMsXG5cdFx0ICAgIGksIGxlbjtcblxuXHRcdGZvciAoaSA9IDAsIGxlbiA9IGNvZGVzLnpvb21Jbi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0a2V5c1tjb2Rlcy56b29tSW5baV1dID0gem9vbTtcblx0XHR9XG5cdFx0Zm9yIChpID0gMCwgbGVuID0gY29kZXMuem9vbU91dC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0a2V5c1tjb2Rlcy56b29tT3V0W2ldXSA9IC16b29tO1xuXHRcdH1cblx0fSxcblxuXHRfYWRkSG9va3M6IGZ1bmN0aW9uICgpIHtcblx0XHRMLkRvbUV2ZW50Lm9uKGRvY3VtZW50LCAna2V5ZG93bicsIHRoaXMuX29uS2V5RG93biwgdGhpcyk7XG5cdH0sXG5cblx0X3JlbW92ZUhvb2tzOiBmdW5jdGlvbiAoKSB7XG5cdFx0TC5Eb21FdmVudC5vZmYoZG9jdW1lbnQsICdrZXlkb3duJywgdGhpcy5fb25LZXlEb3duLCB0aGlzKTtcblx0fSxcblxuXHRfb25LZXlEb3duOiBmdW5jdGlvbiAoZSkge1xuXHRcdGlmIChlLmFsdEtleSB8fCBlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSB7IHJldHVybjsgfVxuXG5cdFx0dmFyIGtleSA9IGUua2V5Q29kZSxcblx0XHQgICAgbWFwID0gdGhpcy5fbWFwLFxuXHRcdCAgICBvZmZzZXQ7XG5cblx0XHRpZiAoa2V5IGluIHRoaXMuX3BhbktleXMpIHtcblxuXHRcdFx0aWYgKG1hcC5fcGFuQW5pbSAmJiBtYXAuX3BhbkFuaW0uX2luUHJvZ3Jlc3MpIHsgcmV0dXJuOyB9XG5cblx0XHRcdG9mZnNldCA9IHRoaXMuX3BhbktleXNba2V5XTtcblx0XHRcdGlmIChlLnNoaWZ0S2V5KSB7XG5cdFx0XHRcdG9mZnNldCA9IEwucG9pbnQob2Zmc2V0KS5tdWx0aXBseUJ5KDMpO1xuXHRcdFx0fVxuXG5cdFx0XHRtYXAucGFuQnkob2Zmc2V0KTtcblxuXHRcdFx0aWYgKG1hcC5vcHRpb25zLm1heEJvdW5kcykge1xuXHRcdFx0XHRtYXAucGFuSW5zaWRlQm91bmRzKG1hcC5vcHRpb25zLm1heEJvdW5kcyk7XG5cdFx0XHR9XG5cblx0XHR9IGVsc2UgaWYgKGtleSBpbiB0aGlzLl96b29tS2V5cykge1xuXHRcdFx0bWFwLnNldFpvb20obWFwLmdldFpvb20oKSArIChlLnNoaWZ0S2V5ID8gMyA6IDEpICogdGhpcy5fem9vbUtleXNba2V5XSk7XG5cblx0XHR9IGVsc2UgaWYgKGtleSA9PT0gMjcpIHtcblx0XHRcdG1hcC5jbG9zZVBvcHVwKCk7XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdEwuRG9tRXZlbnQuc3RvcChlKTtcblx0fVxufSk7XG5cbkwuTWFwLmFkZEluaXRIb29rKCdhZGRIYW5kbGVyJywgJ2tleWJvYXJkJywgTC5NYXAuS2V5Ym9hcmQpO1xuXG5cblxuLypcbiAqIEwuSGFuZGxlci5NYXJrZXJEcmFnIGlzIHVzZWQgaW50ZXJuYWxseSBieSBMLk1hcmtlciB0byBtYWtlIHRoZSBtYXJrZXJzIGRyYWdnYWJsZS5cbiAqL1xuXG5MLkhhbmRsZXIuTWFya2VyRHJhZyA9IEwuSGFuZGxlci5leHRlbmQoe1xuXHRpbml0aWFsaXplOiBmdW5jdGlvbiAobWFya2VyKSB7XG5cdFx0dGhpcy5fbWFya2VyID0gbWFya2VyO1xuXHR9LFxuXG5cdGFkZEhvb2tzOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGljb24gPSB0aGlzLl9tYXJrZXIuX2ljb247XG5cblx0XHRpZiAoIXRoaXMuX2RyYWdnYWJsZSkge1xuXHRcdFx0dGhpcy5fZHJhZ2dhYmxlID0gbmV3IEwuRHJhZ2dhYmxlKGljb24sIGljb24sIHRydWUpO1xuXHRcdH1cblxuXHRcdHRoaXMuX2RyYWdnYWJsZS5vbih7XG5cdFx0XHRkcmFnc3RhcnQ6IHRoaXMuX29uRHJhZ1N0YXJ0LFxuXHRcdFx0ZHJhZzogdGhpcy5fb25EcmFnLFxuXHRcdFx0ZHJhZ2VuZDogdGhpcy5fb25EcmFnRW5kXG5cdFx0fSwgdGhpcykuZW5hYmxlKCk7XG5cblx0XHRMLkRvbVV0aWwuYWRkQ2xhc3MoaWNvbiwgJ2xlYWZsZXQtbWFya2VyLWRyYWdnYWJsZScpO1xuXHR9LFxuXG5cdHJlbW92ZUhvb2tzOiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fZHJhZ2dhYmxlLm9mZih7XG5cdFx0XHRkcmFnc3RhcnQ6IHRoaXMuX29uRHJhZ1N0YXJ0LFxuXHRcdFx0ZHJhZzogdGhpcy5fb25EcmFnLFxuXHRcdFx0ZHJhZ2VuZDogdGhpcy5fb25EcmFnRW5kXG5cdFx0fSwgdGhpcykuZGlzYWJsZSgpO1xuXG5cdFx0aWYgKHRoaXMuX21hcmtlci5faWNvbikge1xuXHRcdFx0TC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX21hcmtlci5faWNvbiwgJ2xlYWZsZXQtbWFya2VyLWRyYWdnYWJsZScpO1xuXHRcdH1cblx0fSxcblxuXHRtb3ZlZDogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLl9kcmFnZ2FibGUgJiYgdGhpcy5fZHJhZ2dhYmxlLl9tb3ZlZDtcblx0fSxcblxuXHRfb25EcmFnU3RhcnQ6IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLl9tYXJrZXJcblx0XHQgICAgLmNsb3NlUG9wdXAoKVxuXHRcdCAgICAuZmlyZSgnbW92ZXN0YXJ0Jylcblx0XHQgICAgLmZpcmUoJ2RyYWdzdGFydCcpO1xuXHR9LFxuXG5cdF9vbkRyYWc6IGZ1bmN0aW9uIChlKSB7XG5cdFx0dmFyIG1hcmtlciA9IHRoaXMuX21hcmtlcixcblx0XHQgICAgc2hhZG93ID0gbWFya2VyLl9zaGFkb3csXG5cdFx0ICAgIGljb25Qb3MgPSBMLkRvbVV0aWwuZ2V0UG9zaXRpb24obWFya2VyLl9pY29uKSxcblx0XHQgICAgbGF0bG5nID0gbWFya2VyLl9tYXAubGF5ZXJQb2ludFRvTGF0TG5nKGljb25Qb3MpO1xuXG5cdFx0Ly8gdXBkYXRlIHNoYWRvdyBwb3NpdGlvblxuXHRcdGlmIChzaGFkb3cpIHtcblx0XHRcdEwuRG9tVXRpbC5zZXRQb3NpdGlvbihzaGFkb3csIGljb25Qb3MpO1xuXHRcdH1cblxuXHRcdG1hcmtlci5fbGF0bG5nID0gbGF0bG5nO1xuXHRcdGUubGF0bG5nID0gbGF0bG5nO1xuXG5cdFx0bWFya2VyXG5cdFx0ICAgIC5maXJlKCdtb3ZlJywgZSlcblx0XHQgICAgLmZpcmUoJ2RyYWcnLCBlKTtcblx0fSxcblxuXHRfb25EcmFnRW5kOiBmdW5jdGlvbiAoZSkge1xuXHRcdHRoaXMuX21hcmtlclxuXHRcdCAgICAuZmlyZSgnbW92ZWVuZCcpXG5cdFx0ICAgIC5maXJlKCdkcmFnZW5kJywgZSk7XG5cdH1cbn0pO1xuXG5cblxuLypcclxuICogTC5Db250cm9sIGlzIGEgYmFzZSBjbGFzcyBmb3IgaW1wbGVtZW50aW5nIG1hcCBjb250cm9scy4gSGFuZGxlcyBwb3NpdGlvbmluZy5cclxuICogQWxsIG90aGVyIGNvbnRyb2xzIGV4dGVuZCBmcm9tIHRoaXMgY2xhc3MuXHJcbiAqL1xyXG5cclxuTC5Db250cm9sID0gTC5DbGFzcy5leHRlbmQoe1xyXG5cdG9wdGlvbnM6IHtcclxuXHRcdHBvc2l0aW9uOiAndG9wcmlnaHQnXHJcblx0fSxcclxuXHJcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHRcdEwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcclxuXHR9LFxyXG5cclxuXHRnZXRQb3NpdGlvbjogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMub3B0aW9ucy5wb3NpdGlvbjtcclxuXHR9LFxyXG5cclxuXHRzZXRQb3NpdGlvbjogZnVuY3Rpb24gKHBvc2l0aW9uKSB7XHJcblx0XHR2YXIgbWFwID0gdGhpcy5fbWFwO1xyXG5cclxuXHRcdGlmIChtYXApIHtcclxuXHRcdFx0bWFwLnJlbW92ZUNvbnRyb2wodGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5vcHRpb25zLnBvc2l0aW9uID0gcG9zaXRpb247XHJcblxyXG5cdFx0aWYgKG1hcCkge1xyXG5cdFx0XHRtYXAuYWRkQ29udHJvbCh0aGlzKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRnZXRDb250YWluZXI6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLl9jb250YWluZXI7XHJcblx0fSxcclxuXHJcblx0YWRkVG86IGZ1bmN0aW9uIChtYXApIHtcclxuXHRcdHRoaXMucmVtb3ZlKCk7XHJcblx0XHR0aGlzLl9tYXAgPSBtYXA7XHJcblxyXG5cdFx0dmFyIGNvbnRhaW5lciA9IHRoaXMuX2NvbnRhaW5lciA9IHRoaXMub25BZGQobWFwKSxcclxuXHRcdCAgICBwb3MgPSB0aGlzLmdldFBvc2l0aW9uKCksXHJcblx0XHQgICAgY29ybmVyID0gbWFwLl9jb250cm9sQ29ybmVyc1twb3NdO1xyXG5cclxuXHRcdEwuRG9tVXRpbC5hZGRDbGFzcyhjb250YWluZXIsICdsZWFmbGV0LWNvbnRyb2wnKTtcclxuXHJcblx0XHRpZiAocG9zLmluZGV4T2YoJ2JvdHRvbScpICE9PSAtMSkge1xyXG5cdFx0XHRjb3JuZXIuaW5zZXJ0QmVmb3JlKGNvbnRhaW5lciwgY29ybmVyLmZpcnN0Q2hpbGQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29ybmVyLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0cmVtb3ZlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoIXRoaXMuX21hcCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH1cclxuXHJcblx0XHRMLkRvbVV0aWwucmVtb3ZlKHRoaXMuX2NvbnRhaW5lcik7XHJcblxyXG5cdFx0aWYgKHRoaXMub25SZW1vdmUpIHtcclxuXHRcdFx0dGhpcy5vblJlbW92ZSh0aGlzLl9tYXApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX21hcCA9IG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0X3JlZm9jdXNPbk1hcDogZnVuY3Rpb24gKGUpIHtcclxuXHRcdC8vIGlmIG1hcCBleGlzdHMgYW5kIGV2ZW50IGlzIG5vdCBhIGtleWJvYXJkIGV2ZW50XHJcblx0XHRpZiAodGhpcy5fbWFwICYmIGUgJiYgZS5zY3JlZW5YID4gMCAmJiBlLnNjcmVlblkgPiAwKSB7XHJcblx0XHRcdHRoaXMuX21hcC5nZXRDb250YWluZXIoKS5mb2N1cygpO1xyXG5cdFx0fVxyXG5cdH1cclxufSk7XHJcblxyXG5MLmNvbnRyb2wgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG5cdHJldHVybiBuZXcgTC5Db250cm9sKG9wdGlvbnMpO1xyXG59O1xyXG5cclxuXHJcbi8vIGFkZHMgY29udHJvbC1yZWxhdGVkIG1ldGhvZHMgdG8gTC5NYXBcclxuXHJcbkwuTWFwLmluY2x1ZGUoe1xyXG5cdGFkZENvbnRyb2w6IGZ1bmN0aW9uIChjb250cm9sKSB7XHJcblx0XHRjb250cm9sLmFkZFRvKHRoaXMpO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0cmVtb3ZlQ29udHJvbDogZnVuY3Rpb24gKGNvbnRyb2wpIHtcclxuXHRcdGNvbnRyb2wucmVtb3ZlKCk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRfaW5pdENvbnRyb2xQb3M6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBjb3JuZXJzID0gdGhpcy5fY29udHJvbENvcm5lcnMgPSB7fSxcclxuXHRcdCAgICBsID0gJ2xlYWZsZXQtJyxcclxuXHRcdCAgICBjb250YWluZXIgPSB0aGlzLl9jb250cm9sQ29udGFpbmVyID1cclxuXHRcdCAgICAgICAgICAgIEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsIGwgKyAnY29udHJvbC1jb250YWluZXInLCB0aGlzLl9jb250YWluZXIpO1xyXG5cclxuXHRcdGZ1bmN0aW9uIGNyZWF0ZUNvcm5lcih2U2lkZSwgaFNpZGUpIHtcclxuXHRcdFx0dmFyIGNsYXNzTmFtZSA9IGwgKyB2U2lkZSArICcgJyArIGwgKyBoU2lkZTtcclxuXHJcblx0XHRcdGNvcm5lcnNbdlNpZGUgKyBoU2lkZV0gPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCBjbGFzc05hbWUsIGNvbnRhaW5lcik7XHJcblx0XHR9XHJcblxyXG5cdFx0Y3JlYXRlQ29ybmVyKCd0b3AnLCAnbGVmdCcpO1xyXG5cdFx0Y3JlYXRlQ29ybmVyKCd0b3AnLCAncmlnaHQnKTtcclxuXHRcdGNyZWF0ZUNvcm5lcignYm90dG9tJywgJ2xlZnQnKTtcclxuXHRcdGNyZWF0ZUNvcm5lcignYm90dG9tJywgJ3JpZ2h0Jyk7XHJcblx0fSxcclxuXHJcblx0X2NsZWFyQ29udHJvbFBvczogZnVuY3Rpb24gKCkge1xyXG5cdFx0TC5Eb21VdGlsLnJlbW92ZSh0aGlzLl9jb250cm9sQ29udGFpbmVyKTtcclxuXHR9XHJcbn0pO1xyXG5cblxuXG4vKlxyXG4gKiBMLkNvbnRyb2wuWm9vbSBpcyB1c2VkIGZvciB0aGUgZGVmYXVsdCB6b29tIGJ1dHRvbnMgb24gdGhlIG1hcC5cclxuICovXHJcblxyXG5MLkNvbnRyb2wuWm9vbSA9IEwuQ29udHJvbC5leHRlbmQoe1xyXG5cdG9wdGlvbnM6IHtcclxuXHRcdHBvc2l0aW9uOiAndG9wbGVmdCcsXHJcblx0XHR6b29tSW5UZXh0OiAnKycsXHJcblx0XHR6b29tSW5UaXRsZTogJ1pvb20gaW4nLFxyXG5cdFx0em9vbU91dFRleHQ6ICctJyxcclxuXHRcdHpvb21PdXRUaXRsZTogJ1pvb20gb3V0J1xyXG5cdH0sXHJcblxyXG5cdG9uQWRkOiBmdW5jdGlvbiAobWFwKSB7XHJcblx0XHR2YXIgem9vbU5hbWUgPSAnbGVhZmxldC1jb250cm9sLXpvb20nLFxyXG5cdFx0ICAgIGNvbnRhaW5lciA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsIHpvb21OYW1lICsgJyBsZWFmbGV0LWJhcicpLFxyXG5cdFx0ICAgIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XHJcblxyXG5cdFx0dGhpcy5fem9vbUluQnV0dG9uICA9IHRoaXMuX2NyZWF0ZUJ1dHRvbihvcHRpb25zLnpvb21JblRleHQsIG9wdGlvbnMuem9vbUluVGl0bGUsXHJcblx0XHQgICAgICAgIHpvb21OYW1lICsgJy1pbicsICBjb250YWluZXIsIHRoaXMuX3pvb21Jbik7XHJcblx0XHR0aGlzLl96b29tT3V0QnV0dG9uID0gdGhpcy5fY3JlYXRlQnV0dG9uKG9wdGlvbnMuem9vbU91dFRleHQsIG9wdGlvbnMuem9vbU91dFRpdGxlLFxyXG5cdFx0ICAgICAgICB6b29tTmFtZSArICctb3V0JywgY29udGFpbmVyLCB0aGlzLl96b29tT3V0KTtcclxuXHJcblx0XHR0aGlzLl91cGRhdGVEaXNhYmxlZCgpO1xyXG5cdFx0bWFwLm9uKCd6b29tZW5kIHpvb21sZXZlbHNjaGFuZ2UnLCB0aGlzLl91cGRhdGVEaXNhYmxlZCwgdGhpcyk7XHJcblxyXG5cdFx0cmV0dXJuIGNvbnRhaW5lcjtcclxuXHR9LFxyXG5cclxuXHRvblJlbW92ZTogZnVuY3Rpb24gKG1hcCkge1xyXG5cdFx0bWFwLm9mZignem9vbWVuZCB6b29tbGV2ZWxzY2hhbmdlJywgdGhpcy5fdXBkYXRlRGlzYWJsZWQsIHRoaXMpO1xyXG5cdH0sXHJcblxyXG5cdGRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMuX2Rpc2FibGVkID0gdHJ1ZTtcclxuXHRcdHRoaXMuX3VwZGF0ZURpc2FibGVkKCk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRlbmFibGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMuX2Rpc2FibGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLl91cGRhdGVEaXNhYmxlZCgpO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0X3pvb21JbjogZnVuY3Rpb24gKGUpIHtcclxuXHRcdGlmICghdGhpcy5fZGlzYWJsZWQpIHtcclxuXHRcdFx0dGhpcy5fbWFwLnpvb21JbihlLnNoaWZ0S2V5ID8gMyA6IDEpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF96b29tT3V0OiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0aWYgKCF0aGlzLl9kaXNhYmxlZCkge1xyXG5cdFx0XHR0aGlzLl9tYXAuem9vbU91dChlLnNoaWZ0S2V5ID8gMyA6IDEpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF9jcmVhdGVCdXR0b246IGZ1bmN0aW9uIChodG1sLCB0aXRsZSwgY2xhc3NOYW1lLCBjb250YWluZXIsIGZuKSB7XHJcblx0XHR2YXIgbGluayA9IEwuRG9tVXRpbC5jcmVhdGUoJ2EnLCBjbGFzc05hbWUsIGNvbnRhaW5lcik7XHJcblx0XHRsaW5rLmlubmVySFRNTCA9IGh0bWw7XHJcblx0XHRsaW5rLmhyZWYgPSAnIyc7XHJcblx0XHRsaW5rLnRpdGxlID0gdGl0bGU7XHJcblxyXG5cdFx0TC5Eb21FdmVudFxyXG5cdFx0ICAgIC5vbihsaW5rLCAnbW91c2Vkb3duIGRibGNsaWNrJywgTC5Eb21FdmVudC5zdG9wUHJvcGFnYXRpb24pXHJcblx0XHQgICAgLm9uKGxpbmssICdjbGljaycsIEwuRG9tRXZlbnQuc3RvcClcclxuXHRcdCAgICAub24obGluaywgJ2NsaWNrJywgZm4sIHRoaXMpXHJcblx0XHQgICAgLm9uKGxpbmssICdjbGljaycsIHRoaXMuX3JlZm9jdXNPbk1hcCwgdGhpcyk7XHJcblxyXG5cdFx0cmV0dXJuIGxpbms7XHJcblx0fSxcclxuXHJcblx0X3VwZGF0ZURpc2FibGVkOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgbWFwID0gdGhpcy5fbWFwLFxyXG5cdFx0ICAgIGNsYXNzTmFtZSA9ICdsZWFmbGV0LWRpc2FibGVkJztcclxuXHJcblx0XHRMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5fem9vbUluQnV0dG9uLCBjbGFzc05hbWUpO1xyXG5cdFx0TC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX3pvb21PdXRCdXR0b24sIGNsYXNzTmFtZSk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2Rpc2FibGVkIHx8IG1hcC5fem9vbSA9PT0gbWFwLmdldE1pblpvb20oKSkge1xyXG5cdFx0XHRMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5fem9vbU91dEJ1dHRvbiwgY2xhc3NOYW1lKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLl9kaXNhYmxlZCB8fCBtYXAuX3pvb20gPT09IG1hcC5nZXRNYXhab29tKCkpIHtcclxuXHRcdFx0TC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX3pvb21JbkJ1dHRvbiwgY2xhc3NOYW1lKTtcclxuXHRcdH1cclxuXHR9XHJcbn0pO1xyXG5cclxuTC5NYXAubWVyZ2VPcHRpb25zKHtcclxuXHR6b29tQ29udHJvbDogdHJ1ZVxyXG59KTtcclxuXHJcbkwuTWFwLmFkZEluaXRIb29rKGZ1bmN0aW9uICgpIHtcclxuXHRpZiAodGhpcy5vcHRpb25zLnpvb21Db250cm9sKSB7XHJcblx0XHR0aGlzLnpvb21Db250cm9sID0gbmV3IEwuQ29udHJvbC5ab29tKCk7XHJcblx0XHR0aGlzLmFkZENvbnRyb2wodGhpcy56b29tQ29udHJvbCk7XHJcblx0fVxyXG59KTtcclxuXHJcbkwuY29udHJvbC56b29tID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHRyZXR1cm4gbmV3IEwuQ29udHJvbC5ab29tKG9wdGlvbnMpO1xyXG59O1xyXG5cblxuXG4vKlxyXG4gKiBMLkNvbnRyb2wuQXR0cmlidXRpb24gaXMgdXNlZCBmb3IgZGlzcGxheWluZyBhdHRyaWJ1dGlvbiBvbiB0aGUgbWFwIChhZGRlZCBieSBkZWZhdWx0KS5cclxuICovXHJcblxyXG5MLkNvbnRyb2wuQXR0cmlidXRpb24gPSBMLkNvbnRyb2wuZXh0ZW5kKHtcclxuXHRvcHRpb25zOiB7XHJcblx0XHRwb3NpdGlvbjogJ2JvdHRvbXJpZ2h0JyxcclxuXHRcdHByZWZpeDogJzxhIGhyZWY9XCJodHRwOi8vbGVhZmxldGpzLmNvbVwiIHRpdGxlPVwiQSBKUyBsaWJyYXJ5IGZvciBpbnRlcmFjdGl2ZSBtYXBzXCI+TGVhZmxldDwvYT4nXHJcblx0fSxcclxuXHJcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHRcdEwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcclxuXHJcblx0XHR0aGlzLl9hdHRyaWJ1dGlvbnMgPSB7fTtcclxuXHR9LFxyXG5cclxuXHRvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xyXG5cdFx0dGhpcy5fY29udGFpbmVyID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2xlYWZsZXQtY29udHJvbC1hdHRyaWJ1dGlvbicpO1xyXG5cdFx0aWYgKEwuRG9tRXZlbnQpIHtcclxuXHRcdFx0TC5Eb21FdmVudC5kaXNhYmxlQ2xpY2tQcm9wYWdhdGlvbih0aGlzLl9jb250YWluZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFRPRE8gdWdseSwgcmVmYWN0b3JcclxuXHRcdGZvciAodmFyIGkgaW4gbWFwLl9sYXllcnMpIHtcclxuXHRcdFx0aWYgKG1hcC5fbGF5ZXJzW2ldLmdldEF0dHJpYnV0aW9uKSB7XHJcblx0XHRcdFx0dGhpcy5hZGRBdHRyaWJ1dGlvbihtYXAuX2xheWVyc1tpXS5nZXRBdHRyaWJ1dGlvbigpKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX3VwZGF0ZSgpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9jb250YWluZXI7XHJcblx0fSxcclxuXHJcblx0c2V0UHJlZml4OiBmdW5jdGlvbiAocHJlZml4KSB7XHJcblx0XHR0aGlzLm9wdGlvbnMucHJlZml4ID0gcHJlZml4O1xyXG5cdFx0dGhpcy5fdXBkYXRlKCk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRhZGRBdHRyaWJ1dGlvbjogZnVuY3Rpb24gKHRleHQpIHtcclxuXHRcdGlmICghdGV4dCkgeyByZXR1cm4gdGhpczsgfVxyXG5cclxuXHRcdGlmICghdGhpcy5fYXR0cmlidXRpb25zW3RleHRdKSB7XHJcblx0XHRcdHRoaXMuX2F0dHJpYnV0aW9uc1t0ZXh0XSA9IDA7XHJcblx0XHR9XHJcblx0XHR0aGlzLl9hdHRyaWJ1dGlvbnNbdGV4dF0rKztcclxuXHJcblx0XHR0aGlzLl91cGRhdGUoKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRyZW1vdmVBdHRyaWJ1dGlvbjogZnVuY3Rpb24gKHRleHQpIHtcclxuXHRcdGlmICghdGV4dCkgeyByZXR1cm4gdGhpczsgfVxyXG5cclxuXHRcdGlmICh0aGlzLl9hdHRyaWJ1dGlvbnNbdGV4dF0pIHtcclxuXHRcdFx0dGhpcy5fYXR0cmlidXRpb25zW3RleHRdLS07XHJcblx0XHRcdHRoaXMuX3VwZGF0ZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdF91cGRhdGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICghdGhpcy5fbWFwKSB7IHJldHVybjsgfVxyXG5cclxuXHRcdHZhciBhdHRyaWJzID0gW107XHJcblxyXG5cdFx0Zm9yICh2YXIgaSBpbiB0aGlzLl9hdHRyaWJ1dGlvbnMpIHtcclxuXHRcdFx0aWYgKHRoaXMuX2F0dHJpYnV0aW9uc1tpXSkge1xyXG5cdFx0XHRcdGF0dHJpYnMucHVzaChpKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBwcmVmaXhBbmRBdHRyaWJzID0gW107XHJcblxyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5wcmVmaXgpIHtcclxuXHRcdFx0cHJlZml4QW5kQXR0cmlicy5wdXNoKHRoaXMub3B0aW9ucy5wcmVmaXgpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGF0dHJpYnMubGVuZ3RoKSB7XHJcblx0XHRcdHByZWZpeEFuZEF0dHJpYnMucHVzaChhdHRyaWJzLmpvaW4oJywgJykpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX2NvbnRhaW5lci5pbm5lckhUTUwgPSBwcmVmaXhBbmRBdHRyaWJzLmpvaW4oJyB8ICcpO1xyXG5cdH1cclxufSk7XHJcblxyXG5MLk1hcC5tZXJnZU9wdGlvbnMoe1xyXG5cdGF0dHJpYnV0aW9uQ29udHJvbDogdHJ1ZVxyXG59KTtcclxuXHJcbkwuTWFwLmFkZEluaXRIb29rKGZ1bmN0aW9uICgpIHtcclxuXHRpZiAodGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uQ29udHJvbCkge1xyXG5cdFx0dGhpcy5hdHRyaWJ1dGlvbkNvbnRyb2wgPSAobmV3IEwuQ29udHJvbC5BdHRyaWJ1dGlvbigpKS5hZGRUbyh0aGlzKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuTC5jb250cm9sLmF0dHJpYnV0aW9uID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHRyZXR1cm4gbmV3IEwuQ29udHJvbC5BdHRyaWJ1dGlvbihvcHRpb25zKTtcclxufTtcclxuXG5cblxuLypcbiAqIEwuQ29udHJvbC5TY2FsZSBpcyB1c2VkIGZvciBkaXNwbGF5aW5nIG1ldHJpYy9pbXBlcmlhbCBzY2FsZSBvbiB0aGUgbWFwLlxuICovXG5cbkwuQ29udHJvbC5TY2FsZSA9IEwuQ29udHJvbC5leHRlbmQoe1xuXHRvcHRpb25zOiB7XG5cdFx0cG9zaXRpb246ICdib3R0b21sZWZ0Jyxcblx0XHRtYXhXaWR0aDogMTAwLFxuXHRcdG1ldHJpYzogdHJ1ZSxcblx0XHRpbXBlcmlhbDogdHJ1ZVxuXHRcdC8vIHVwZGF0ZVdoZW5JZGxlOiBmYWxzZVxuXHR9LFxuXG5cdG9uQWRkOiBmdW5jdGlvbiAobWFwKSB7XG5cdFx0dmFyIGNsYXNzTmFtZSA9ICdsZWFmbGV0LWNvbnRyb2wtc2NhbGUnLFxuXHRcdCAgICBjb250YWluZXIgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCBjbGFzc05hbWUpLFxuXHRcdCAgICBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXG5cdFx0dGhpcy5fYWRkU2NhbGVzKG9wdGlvbnMsIGNsYXNzTmFtZSArICctbGluZScsIGNvbnRhaW5lcik7XG5cblx0XHRtYXAub24ob3B0aW9ucy51cGRhdGVXaGVuSWRsZSA/ICdtb3ZlZW5kJyA6ICdtb3ZlJywgdGhpcy5fdXBkYXRlLCB0aGlzKTtcblx0XHRtYXAud2hlblJlYWR5KHRoaXMuX3VwZGF0ZSwgdGhpcyk7XG5cblx0XHRyZXR1cm4gY29udGFpbmVyO1xuXHR9LFxuXG5cdG9uUmVtb3ZlOiBmdW5jdGlvbiAobWFwKSB7XG5cdFx0bWFwLm9mZih0aGlzLm9wdGlvbnMudXBkYXRlV2hlbklkbGUgPyAnbW92ZWVuZCcgOiAnbW92ZScsIHRoaXMuX3VwZGF0ZSwgdGhpcyk7XG5cdH0sXG5cblx0X2FkZFNjYWxlczogZnVuY3Rpb24gKG9wdGlvbnMsIGNsYXNzTmFtZSwgY29udGFpbmVyKSB7XG5cdFx0aWYgKG9wdGlvbnMubWV0cmljKSB7XG5cdFx0XHR0aGlzLl9tU2NhbGUgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCBjbGFzc05hbWUsIGNvbnRhaW5lcik7XG5cdFx0fVxuXHRcdGlmIChvcHRpb25zLmltcGVyaWFsKSB7XG5cdFx0XHR0aGlzLl9pU2NhbGUgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCBjbGFzc05hbWUsIGNvbnRhaW5lcik7XG5cdFx0fVxuXHR9LFxuXG5cdF91cGRhdGU6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgbWFwID0gdGhpcy5fbWFwLFxuXHRcdCAgICB5ID0gbWFwLmdldFNpemUoKS55IC8gMjtcblxuXHRcdHZhciBtYXhNZXRlcnMgPSBtYXAuZGlzdGFuY2UoXG5cdFx0XHRcdG1hcC5jb250YWluZXJQb2ludFRvTGF0TG5nKFswLCB5XSksXG5cdFx0XHRcdG1hcC5jb250YWluZXJQb2ludFRvTGF0TG5nKFt0aGlzLm9wdGlvbnMubWF4V2lkdGgsIHldKSk7XG5cblx0XHR0aGlzLl91cGRhdGVTY2FsZXMobWF4TWV0ZXJzKTtcblx0fSxcblxuXHRfdXBkYXRlU2NhbGVzOiBmdW5jdGlvbiAobWF4TWV0ZXJzKSB7XG5cdFx0aWYgKHRoaXMub3B0aW9ucy5tZXRyaWMgJiYgbWF4TWV0ZXJzKSB7XG5cdFx0XHR0aGlzLl91cGRhdGVNZXRyaWMobWF4TWV0ZXJzKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMub3B0aW9ucy5pbXBlcmlhbCAmJiBtYXhNZXRlcnMpIHtcblx0XHRcdHRoaXMuX3VwZGF0ZUltcGVyaWFsKG1heE1ldGVycyk7XG5cdFx0fVxuXHR9LFxuXG5cdF91cGRhdGVNZXRyaWM6IGZ1bmN0aW9uIChtYXhNZXRlcnMpIHtcblx0XHR2YXIgbWV0ZXJzID0gdGhpcy5fZ2V0Um91bmROdW0obWF4TWV0ZXJzKSxcblx0XHQgICAgbGFiZWwgPSBtZXRlcnMgPCAxMDAwID8gbWV0ZXJzICsgJyBtJyA6IChtZXRlcnMgLyAxMDAwKSArICcga20nO1xuXG5cdFx0dGhpcy5fdXBkYXRlU2NhbGUodGhpcy5fbVNjYWxlLCBsYWJlbCwgbWV0ZXJzIC8gbWF4TWV0ZXJzKTtcblx0fSxcblxuXHRfdXBkYXRlSW1wZXJpYWw6IGZ1bmN0aW9uIChtYXhNZXRlcnMpIHtcblx0XHR2YXIgbWF4RmVldCA9IG1heE1ldGVycyAqIDMuMjgwODM5OSxcblx0XHQgICAgbWF4TWlsZXMsIG1pbGVzLCBmZWV0O1xuXG5cdFx0aWYgKG1heEZlZXQgPiA1MjgwKSB7XG5cdFx0XHRtYXhNaWxlcyA9IG1heEZlZXQgLyA1MjgwO1xuXHRcdFx0bWlsZXMgPSB0aGlzLl9nZXRSb3VuZE51bShtYXhNaWxlcyk7XG5cdFx0XHR0aGlzLl91cGRhdGVTY2FsZSh0aGlzLl9pU2NhbGUsIG1pbGVzICsgJyBtaScsIG1pbGVzIC8gbWF4TWlsZXMpO1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdGZlZXQgPSB0aGlzLl9nZXRSb3VuZE51bShtYXhGZWV0KTtcblx0XHRcdHRoaXMuX3VwZGF0ZVNjYWxlKHRoaXMuX2lTY2FsZSwgZmVldCArICcgZnQnLCBmZWV0IC8gbWF4RmVldCk7XG5cdFx0fVxuXHR9LFxuXG5cdF91cGRhdGVTY2FsZTogZnVuY3Rpb24gKHNjYWxlLCB0ZXh0LCByYXRpbykge1xuXHRcdHNjYWxlLnN0eWxlLndpZHRoID0gTWF0aC5yb3VuZCh0aGlzLm9wdGlvbnMubWF4V2lkdGggKiByYXRpbykgKyAncHgnO1xuXHRcdHNjYWxlLmlubmVySFRNTCA9IHRleHQ7XG5cdH0sXG5cblx0X2dldFJvdW5kTnVtOiBmdW5jdGlvbiAobnVtKSB7XG5cdFx0dmFyIHBvdzEwID0gTWF0aC5wb3coMTAsIChNYXRoLmZsb29yKG51bSkgKyAnJykubGVuZ3RoIC0gMSksXG5cdFx0ICAgIGQgPSBudW0gLyBwb3cxMDtcblxuXHRcdGQgPSBkID49IDEwID8gMTAgOlxuXHRcdCAgICBkID49IDUgPyA1IDpcblx0XHQgICAgZCA+PSAzID8gMyA6XG5cdFx0ICAgIGQgPj0gMiA/IDIgOiAxO1xuXG5cdFx0cmV0dXJuIHBvdzEwICogZDtcblx0fVxufSk7XG5cbkwuY29udHJvbC5zY2FsZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdHJldHVybiBuZXcgTC5Db250cm9sLlNjYWxlKG9wdGlvbnMpO1xufTtcblxuXG5cbi8qXHJcbiAqIEwuQ29udHJvbC5MYXllcnMgaXMgYSBjb250cm9sIHRvIGFsbG93IHVzZXJzIHRvIHN3aXRjaCBiZXR3ZWVuIGRpZmZlcmVudCBsYXllcnMgb24gdGhlIG1hcC5cclxuICovXHJcblxyXG5MLkNvbnRyb2wuTGF5ZXJzID0gTC5Db250cm9sLmV4dGVuZCh7XHJcblx0b3B0aW9uczoge1xyXG5cdFx0Y29sbGFwc2VkOiB0cnVlLFxyXG5cdFx0cG9zaXRpb246ICd0b3ByaWdodCcsXHJcblx0XHRhdXRvWkluZGV4OiB0cnVlLFxyXG5cdFx0aGlkZVNpbmdsZUJhc2U6IGZhbHNlXHJcblx0fSxcclxuXHJcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKGJhc2VMYXllcnMsIG92ZXJsYXlzLCBvcHRpb25zKSB7XHJcblx0XHRMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XHJcblxyXG5cdFx0dGhpcy5fbGF5ZXJzID0ge307XHJcblx0XHR0aGlzLl9sYXN0WkluZGV4ID0gMDtcclxuXHRcdHRoaXMuX2hhbmRsaW5nQ2xpY2sgPSBmYWxzZTtcclxuXHJcblx0XHRmb3IgKHZhciBpIGluIGJhc2VMYXllcnMpIHtcclxuXHRcdFx0dGhpcy5fYWRkTGF5ZXIoYmFzZUxheWVyc1tpXSwgaSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yIChpIGluIG92ZXJsYXlzKSB7XHJcblx0XHRcdHRoaXMuX2FkZExheWVyKG92ZXJsYXlzW2ldLCBpLCB0cnVlKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xyXG5cdFx0dGhpcy5faW5pdExheW91dCgpO1xyXG5cdFx0dGhpcy5fdXBkYXRlKCk7XHJcblxyXG5cdFx0dGhpcy5fbWFwID0gbWFwO1xyXG5cdFx0bWFwLm9uKCd6b29tZW5kJywgdGhpcy5fY2hlY2tEaXNhYmxlZExheWVycywgdGhpcyk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX2NvbnRhaW5lcjtcclxuXHR9LFxyXG5cclxuXHRvblJlbW92ZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy5fbWFwLm9mZignem9vbWVuZCcsIHRoaXMuX2NoZWNrRGlzYWJsZWRMYXllcnMsIHRoaXMpO1xyXG5cdH0sXHJcblxyXG5cdGFkZEJhc2VMYXllcjogZnVuY3Rpb24gKGxheWVyLCBuYW1lKSB7XHJcblx0XHR0aGlzLl9hZGRMYXllcihsYXllciwgbmFtZSk7XHJcblx0XHRyZXR1cm4gdGhpcy5fdXBkYXRlKCk7XHJcblx0fSxcclxuXHJcblx0YWRkT3ZlcmxheTogZnVuY3Rpb24gKGxheWVyLCBuYW1lKSB7XHJcblx0XHR0aGlzLl9hZGRMYXllcihsYXllciwgbmFtZSwgdHJ1ZSk7XHJcblx0XHRyZXR1cm4gdGhpcy5fdXBkYXRlKCk7XHJcblx0fSxcclxuXHJcblx0cmVtb3ZlTGF5ZXI6IGZ1bmN0aW9uIChsYXllcikge1xyXG5cdFx0bGF5ZXIub2ZmKCdhZGQgcmVtb3ZlJywgdGhpcy5fb25MYXllckNoYW5nZSwgdGhpcyk7XHJcblxyXG5cdFx0ZGVsZXRlIHRoaXMuX2xheWVyc1tMLnN0YW1wKGxheWVyKV07XHJcblx0XHRyZXR1cm4gdGhpcy5fdXBkYXRlKCk7XHJcblx0fSxcclxuXHJcblx0X2luaXRMYXlvdXQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBjbGFzc05hbWUgPSAnbGVhZmxldC1jb250cm9sLWxheWVycycsXHJcblx0XHQgICAgY29udGFpbmVyID0gdGhpcy5fY29udGFpbmVyID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgY2xhc3NOYW1lKTtcclxuXHJcblx0XHQvLyBtYWtlcyB0aGlzIHdvcmsgb24gSUUgdG91Y2ggZGV2aWNlcyBieSBzdG9wcGluZyBpdCBmcm9tIGZpcmluZyBhIG1vdXNlb3V0IGV2ZW50IHdoZW4gdGhlIHRvdWNoIGlzIHJlbGVhc2VkXHJcblx0XHRjb250YWluZXIuc2V0QXR0cmlidXRlKCdhcmlhLWhhc3BvcHVwJywgdHJ1ZSk7XHJcblxyXG5cdFx0TC5Eb21FdmVudC5kaXNhYmxlQ2xpY2tQcm9wYWdhdGlvbihjb250YWluZXIpO1xyXG5cdFx0aWYgKCFMLkJyb3dzZXIudG91Y2gpIHtcclxuXHRcdFx0TC5Eb21FdmVudC5kaXNhYmxlU2Nyb2xsUHJvcGFnYXRpb24oY29udGFpbmVyKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgZm9ybSA9IHRoaXMuX2Zvcm0gPSBMLkRvbVV0aWwuY3JlYXRlKCdmb3JtJywgY2xhc3NOYW1lICsgJy1saXN0Jyk7XHJcblxyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5jb2xsYXBzZWQpIHtcclxuXHRcdFx0aWYgKCFMLkJyb3dzZXIuYW5kcm9pZCkge1xyXG5cdFx0XHRcdEwuRG9tRXZlbnQub24oY29udGFpbmVyLCB7XHJcblx0XHRcdFx0XHRtb3VzZWVudGVyOiB0aGlzLl9leHBhbmQsXHJcblx0XHRcdFx0XHRtb3VzZWxlYXZlOiB0aGlzLl9jb2xsYXBzZVxyXG5cdFx0XHRcdH0sIHRoaXMpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgbGluayA9IHRoaXMuX2xheWVyc0xpbmsgPSBMLkRvbVV0aWwuY3JlYXRlKCdhJywgY2xhc3NOYW1lICsgJy10b2dnbGUnLCBjb250YWluZXIpO1xyXG5cdFx0XHRsaW5rLmhyZWYgPSAnIyc7XHJcblx0XHRcdGxpbmsudGl0bGUgPSAnTGF5ZXJzJztcclxuXHJcblx0XHRcdGlmIChMLkJyb3dzZXIudG91Y2gpIHtcclxuXHRcdFx0XHRMLkRvbUV2ZW50XHJcblx0XHRcdFx0ICAgIC5vbihsaW5rLCAnY2xpY2snLCBMLkRvbUV2ZW50LnN0b3ApXHJcblx0XHRcdFx0ICAgIC5vbihsaW5rLCAnY2xpY2snLCB0aGlzLl9leHBhbmQsIHRoaXMpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdEwuRG9tRXZlbnQub24obGluaywgJ2ZvY3VzJywgdGhpcy5fZXhwYW5kLCB0aGlzKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gd29yayBhcm91bmQgZm9yIEZpcmVmb3ggQW5kcm9pZCBpc3N1ZSBodHRwczovL2dpdGh1Yi5jb20vTGVhZmxldC9MZWFmbGV0L2lzc3Vlcy8yMDMzXHJcblx0XHRcdEwuRG9tRXZlbnQub24oZm9ybSwgJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoTC5iaW5kKHRoaXMuX29uSW5wdXRDbGljaywgdGhpcyksIDApO1xyXG5cdFx0XHR9LCB0aGlzKTtcclxuXHJcblx0XHRcdHRoaXMuX21hcC5vbignY2xpY2snLCB0aGlzLl9jb2xsYXBzZSwgdGhpcyk7XHJcblx0XHRcdC8vIFRPRE8ga2V5Ym9hcmQgYWNjZXNzaWJpbGl0eVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5fZXhwYW5kKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fYmFzZUxheWVyc0xpc3QgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCBjbGFzc05hbWUgKyAnLWJhc2UnLCBmb3JtKTtcclxuXHRcdHRoaXMuX3NlcGFyYXRvciA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsIGNsYXNzTmFtZSArICctc2VwYXJhdG9yJywgZm9ybSk7XHJcblx0XHR0aGlzLl9vdmVybGF5c0xpc3QgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCBjbGFzc05hbWUgKyAnLW92ZXJsYXlzJywgZm9ybSk7XHJcblxyXG5cdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGZvcm0pO1xyXG5cdH0sXHJcblxyXG5cdF9hZGRMYXllcjogZnVuY3Rpb24gKGxheWVyLCBuYW1lLCBvdmVybGF5KSB7XHJcblx0XHRsYXllci5vbignYWRkIHJlbW92ZScsIHRoaXMuX29uTGF5ZXJDaGFuZ2UsIHRoaXMpO1xyXG5cclxuXHRcdHZhciBpZCA9IEwuc3RhbXAobGF5ZXIpO1xyXG5cclxuXHRcdHRoaXMuX2xheWVyc1tpZF0gPSB7XHJcblx0XHRcdGxheWVyOiBsYXllcixcclxuXHRcdFx0bmFtZTogbmFtZSxcclxuXHRcdFx0b3ZlcmxheTogb3ZlcmxheVxyXG5cdFx0fTtcclxuXHJcblx0XHRpZiAodGhpcy5vcHRpb25zLmF1dG9aSW5kZXggJiYgbGF5ZXIuc2V0WkluZGV4KSB7XHJcblx0XHRcdHRoaXMuX2xhc3RaSW5kZXgrKztcclxuXHRcdFx0bGF5ZXIuc2V0WkluZGV4KHRoaXMuX2xhc3RaSW5kZXgpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF91cGRhdGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICghdGhpcy5fY29udGFpbmVyKSB7IHJldHVybiB0aGlzOyB9XHJcblxyXG5cdFx0TC5Eb21VdGlsLmVtcHR5KHRoaXMuX2Jhc2VMYXllcnNMaXN0KTtcclxuXHRcdEwuRG9tVXRpbC5lbXB0eSh0aGlzLl9vdmVybGF5c0xpc3QpO1xyXG5cclxuXHRcdHZhciBiYXNlTGF5ZXJzUHJlc2VudCwgb3ZlcmxheXNQcmVzZW50LCBpLCBvYmosIGJhc2VMYXllcnNDb3VudCA9IDA7XHJcblxyXG5cdFx0Zm9yIChpIGluIHRoaXMuX2xheWVycykge1xyXG5cdFx0XHRvYmogPSB0aGlzLl9sYXllcnNbaV07XHJcblx0XHRcdHRoaXMuX2FkZEl0ZW0ob2JqKTtcclxuXHRcdFx0b3ZlcmxheXNQcmVzZW50ID0gb3ZlcmxheXNQcmVzZW50IHx8IG9iai5vdmVybGF5O1xyXG5cdFx0XHRiYXNlTGF5ZXJzUHJlc2VudCA9IGJhc2VMYXllcnNQcmVzZW50IHx8ICFvYmoub3ZlcmxheTtcclxuXHRcdFx0YmFzZUxheWVyc0NvdW50ICs9ICFvYmoub3ZlcmxheSA/IDEgOiAwO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEhpZGUgYmFzZSBsYXllcnMgc2VjdGlvbiBpZiB0aGVyZSdzIG9ubHkgb25lIGxheWVyLlxyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5oaWRlU2luZ2xlQmFzZSkge1xyXG5cdFx0XHRiYXNlTGF5ZXJzUHJlc2VudCA9IGJhc2VMYXllcnNQcmVzZW50ICYmIGJhc2VMYXllcnNDb3VudCA+IDE7XHJcblx0XHRcdHRoaXMuX2Jhc2VMYXllcnNMaXN0LnN0eWxlLmRpc3BsYXkgPSBiYXNlTGF5ZXJzUHJlc2VudCA/ICcnIDogJ25vbmUnO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX3NlcGFyYXRvci5zdHlsZS5kaXNwbGF5ID0gb3ZlcmxheXNQcmVzZW50ICYmIGJhc2VMYXllcnNQcmVzZW50ID8gJycgOiAnbm9uZSc7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0X29uTGF5ZXJDaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRpZiAoIXRoaXMuX2hhbmRsaW5nQ2xpY2spIHtcclxuXHRcdFx0dGhpcy5fdXBkYXRlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIG9iaiA9IHRoaXMuX2xheWVyc1tMLnN0YW1wKGUudGFyZ2V0KV07XHJcblxyXG5cdFx0dmFyIHR5cGUgPSBvYmoub3ZlcmxheSA/XHJcblx0XHRcdChlLnR5cGUgPT09ICdhZGQnID8gJ292ZXJsYXlhZGQnIDogJ292ZXJsYXlyZW1vdmUnKSA6XHJcblx0XHRcdChlLnR5cGUgPT09ICdhZGQnID8gJ2Jhc2VsYXllcmNoYW5nZScgOiBudWxsKTtcclxuXHJcblx0XHRpZiAodHlwZSkge1xyXG5cdFx0XHR0aGlzLl9tYXAuZmlyZSh0eXBlLCBvYmopO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8vIElFNyBidWdzIG91dCBpZiB5b3UgY3JlYXRlIGEgcmFkaW8gZHluYW1pY2FsbHksIHNvIHlvdSBoYXZlIHRvIGRvIGl0IHRoaXMgaGFja3kgd2F5IChzZWUgaHR0cDovL2JpdC5seS9QcVlMQmUpXHJcblx0X2NyZWF0ZVJhZGlvRWxlbWVudDogZnVuY3Rpb24gKG5hbWUsIGNoZWNrZWQpIHtcclxuXHJcblx0XHR2YXIgcmFkaW9IdG1sID0gJzxpbnB1dCB0eXBlPVwicmFkaW9cIiBjbGFzcz1cImxlYWZsZXQtY29udHJvbC1sYXllcnMtc2VsZWN0b3JcIiBuYW1lPVwiJyArXHJcblx0XHRcdFx0bmFtZSArICdcIicgKyAoY2hlY2tlZCA/ICcgY2hlY2tlZD1cImNoZWNrZWRcIicgOiAnJykgKyAnLz4nO1xyXG5cclxuXHRcdHZhciByYWRpb0ZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0XHRyYWRpb0ZyYWdtZW50LmlubmVySFRNTCA9IHJhZGlvSHRtbDtcclxuXHJcblx0XHRyZXR1cm4gcmFkaW9GcmFnbWVudC5maXJzdENoaWxkO1xyXG5cdH0sXHJcblxyXG5cdF9hZGRJdGVtOiBmdW5jdGlvbiAob2JqKSB7XHJcblx0XHR2YXIgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpLFxyXG5cdFx0ICAgIGNoZWNrZWQgPSB0aGlzLl9tYXAuaGFzTGF5ZXIob2JqLmxheWVyKSxcclxuXHRcdCAgICBpbnB1dDtcclxuXHJcblx0XHRpZiAob2JqLm92ZXJsYXkpIHtcclxuXHRcdFx0aW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG5cdFx0XHRpbnB1dC50eXBlID0gJ2NoZWNrYm94JztcclxuXHRcdFx0aW5wdXQuY2xhc3NOYW1lID0gJ2xlYWZsZXQtY29udHJvbC1sYXllcnMtc2VsZWN0b3InO1xyXG5cdFx0XHRpbnB1dC5kZWZhdWx0Q2hlY2tlZCA9IGNoZWNrZWQ7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpbnB1dCA9IHRoaXMuX2NyZWF0ZVJhZGlvRWxlbWVudCgnbGVhZmxldC1iYXNlLWxheWVycycsIGNoZWNrZWQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlucHV0LmxheWVySWQgPSBMLnN0YW1wKG9iai5sYXllcik7XHJcblxyXG5cdFx0TC5Eb21FdmVudC5vbihpbnB1dCwgJ2NsaWNrJywgdGhpcy5fb25JbnB1dENsaWNrLCB0aGlzKTtcclxuXHJcblx0XHR2YXIgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdG5hbWUuaW5uZXJIVE1MID0gJyAnICsgb2JqLm5hbWU7XHJcblxyXG5cdFx0Ly8gSGVscHMgZnJvbSBwcmV2ZW50aW5nIGxheWVyIGNvbnRyb2wgZmxpY2tlciB3aGVuIGNoZWNrYm94ZXMgYXJlIGRpc2FibGVkXHJcblx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vTGVhZmxldC9MZWFmbGV0L2lzc3Vlcy8yNzcxXHJcblx0XHR2YXIgaG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG5cdFx0bGFiZWwuYXBwZW5kQ2hpbGQoaG9sZGVyKTtcclxuXHRcdGhvbGRlci5hcHBlbmRDaGlsZChpbnB1dCk7XHJcblx0XHRob2xkZXIuYXBwZW5kQ2hpbGQobmFtZSk7XHJcblxyXG5cdFx0dmFyIGNvbnRhaW5lciA9IG9iai5vdmVybGF5ID8gdGhpcy5fb3ZlcmxheXNMaXN0IDogdGhpcy5fYmFzZUxheWVyc0xpc3Q7XHJcblx0XHRjb250YWluZXIuYXBwZW5kQ2hpbGQobGFiZWwpO1xyXG5cclxuXHRcdHRoaXMuX2NoZWNrRGlzYWJsZWRMYXllcnMoKTtcclxuXHRcdHJldHVybiBsYWJlbDtcclxuXHR9LFxyXG5cclxuXHRfb25JbnB1dENsaWNrOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgaW5wdXRzID0gdGhpcy5fZm9ybS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKSxcclxuXHRcdCAgICBpbnB1dCwgbGF5ZXIsIGhhc0xheWVyO1xyXG5cdFx0dmFyIGFkZGVkTGF5ZXJzID0gW10sXHJcblx0XHQgICAgcmVtb3ZlZExheWVycyA9IFtdO1xyXG5cclxuXHRcdHRoaXMuX2hhbmRsaW5nQ2xpY2sgPSB0cnVlO1xyXG5cclxuXHRcdGZvciAodmFyIGkgPSBpbnB1dHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuXHRcdFx0aW5wdXQgPSBpbnB1dHNbaV07XHJcblx0XHRcdGxheWVyID0gdGhpcy5fbGF5ZXJzW2lucHV0LmxheWVySWRdLmxheWVyO1xyXG5cdFx0XHRoYXNMYXllciA9IHRoaXMuX21hcC5oYXNMYXllcihsYXllcik7XHJcblxyXG5cdFx0XHRpZiAoaW5wdXQuY2hlY2tlZCAmJiAhaGFzTGF5ZXIpIHtcclxuXHRcdFx0XHRhZGRlZExheWVycy5wdXNoKGxheWVyKTtcclxuXHJcblx0XHRcdH0gZWxzZSBpZiAoIWlucHV0LmNoZWNrZWQgJiYgaGFzTGF5ZXIpIHtcclxuXHRcdFx0XHRyZW1vdmVkTGF5ZXJzLnB1c2gobGF5ZXIpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQnVnZml4IGlzc3VlIDIzMTg6IFNob3VsZCByZW1vdmUgYWxsIG9sZCBsYXllcnMgYmVmb3JlIHJlYWRkaW5nIG5ldyBvbmVzXHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgcmVtb3ZlZExheWVycy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR0aGlzLl9tYXAucmVtb3ZlTGF5ZXIocmVtb3ZlZExheWVyc1tpXSk7XHJcblx0XHR9XHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgYWRkZWRMYXllcnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dGhpcy5fbWFwLmFkZExheWVyKGFkZGVkTGF5ZXJzW2ldKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9oYW5kbGluZ0NsaWNrID0gZmFsc2U7XHJcblxyXG5cdFx0dGhpcy5fcmVmb2N1c09uTWFwKCk7XHJcblx0fSxcclxuXHJcblx0X2V4cGFuZDogZnVuY3Rpb24gKCkge1xyXG5cdFx0TC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX2NvbnRhaW5lciwgJ2xlYWZsZXQtY29udHJvbC1sYXllcnMtZXhwYW5kZWQnKTtcclxuXHRcdHRoaXMuX2Zvcm0uc3R5bGUuaGVpZ2h0ID0gbnVsbDtcclxuXHRcdHZhciBhY2NlcHRhYmxlSGVpZ2h0ID0gdGhpcy5fbWFwLl9zaXplLnkgLSAodGhpcy5fY29udGFpbmVyLm9mZnNldFRvcCArIDUwKTtcclxuXHRcdGlmIChhY2NlcHRhYmxlSGVpZ2h0IDwgdGhpcy5fZm9ybS5jbGllbnRIZWlnaHQpIHtcclxuXHRcdFx0TC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX2Zvcm0sICdsZWFmbGV0LWNvbnRyb2wtbGF5ZXJzLXNjcm9sbGJhcicpO1xyXG5cdFx0XHR0aGlzLl9mb3JtLnN0eWxlLmhlaWdodCA9IGFjY2VwdGFibGVIZWlnaHQgKyAncHgnO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0TC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX2Zvcm0sICdsZWFmbGV0LWNvbnRyb2wtbGF5ZXJzLXNjcm9sbGJhcicpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5fY2hlY2tEaXNhYmxlZExheWVycygpO1xyXG5cdH0sXHJcblxyXG5cdF9jb2xsYXBzZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0TC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX2NvbnRhaW5lciwgJ2xlYWZsZXQtY29udHJvbC1sYXllcnMtZXhwYW5kZWQnKTtcclxuXHR9LFxyXG5cclxuXHRfY2hlY2tEaXNhYmxlZExheWVyczogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGlucHV0cyA9IHRoaXMuX2Zvcm0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JyksXHJcblx0XHQgICAgaW5wdXQsXHJcblx0XHQgICAgbGF5ZXIsXHJcblx0XHQgICAgem9vbSA9IHRoaXMuX21hcC5nZXRab29tKCk7XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IGlucHV0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG5cdFx0XHRpbnB1dCA9IGlucHV0c1tpXTtcclxuXHRcdFx0bGF5ZXIgPSB0aGlzLl9sYXllcnNbaW5wdXQubGF5ZXJJZF0ubGF5ZXI7XHJcblx0XHRcdGlucHV0LmRpc2FibGVkID0gKGxheWVyLm9wdGlvbnMubWluWm9vbSAhPT0gdW5kZWZpbmVkICYmIHpvb20gPCBsYXllci5vcHRpb25zLm1pblpvb20pIHx8XHJcblx0XHRcdCAgICAgICAgICAgICAgICAgKGxheWVyLm9wdGlvbnMubWF4Wm9vbSAhPT0gdW5kZWZpbmVkICYmIHpvb20gPiBsYXllci5vcHRpb25zLm1heFpvb20pO1xyXG5cclxuXHRcdH1cclxuXHR9XHJcbn0pO1xyXG5cclxuTC5jb250cm9sLmxheWVycyA9IGZ1bmN0aW9uIChiYXNlTGF5ZXJzLCBvdmVybGF5cywgb3B0aW9ucykge1xyXG5cdHJldHVybiBuZXcgTC5Db250cm9sLkxheWVycyhiYXNlTGF5ZXJzLCBvdmVybGF5cywgb3B0aW9ucyk7XHJcbn07XHJcblxuXG5cbi8qXG4gKiBMLlBvc0FuaW1hdGlvbiBwb3dlcnMgTGVhZmxldCBwYW4gYW5pbWF0aW9ucyBpbnRlcm5hbGx5LlxuICovXG5cbkwuUG9zQW5pbWF0aW9uID0gTC5FdmVudGVkLmV4dGVuZCh7XG5cblx0cnVuOiBmdW5jdGlvbiAoZWwsIG5ld1BvcywgZHVyYXRpb24sIGVhc2VMaW5lYXJpdHkpIHsgLy8gKEhUTUxFbGVtZW50LCBQb2ludFssIE51bWJlciwgTnVtYmVyXSlcblx0XHR0aGlzLnN0b3AoKTtcblxuXHRcdHRoaXMuX2VsID0gZWw7XG5cdFx0dGhpcy5faW5Qcm9ncmVzcyA9IHRydWU7XG5cdFx0dGhpcy5fZHVyYXRpb24gPSBkdXJhdGlvbiB8fCAwLjI1O1xuXHRcdHRoaXMuX2Vhc2VPdXRQb3dlciA9IDEgLyBNYXRoLm1heChlYXNlTGluZWFyaXR5IHx8IDAuNSwgMC4yKTtcblxuXHRcdHRoaXMuX3N0YXJ0UG9zID0gTC5Eb21VdGlsLmdldFBvc2l0aW9uKGVsKTtcblx0XHR0aGlzLl9vZmZzZXQgPSBuZXdQb3Muc3VidHJhY3QodGhpcy5fc3RhcnRQb3MpO1xuXHRcdHRoaXMuX3N0YXJ0VGltZSA9ICtuZXcgRGF0ZSgpO1xuXG5cdFx0dGhpcy5maXJlKCdzdGFydCcpO1xuXG5cdFx0dGhpcy5fYW5pbWF0ZSgpO1xuXHR9LFxuXG5cdHN0b3A6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoIXRoaXMuX2luUHJvZ3Jlc3MpIHsgcmV0dXJuOyB9XG5cblx0XHR0aGlzLl9zdGVwKHRydWUpO1xuXHRcdHRoaXMuX2NvbXBsZXRlKCk7XG5cdH0sXG5cblx0X2FuaW1hdGU6IGZ1bmN0aW9uICgpIHtcblx0XHQvLyBhbmltYXRpb24gbG9vcFxuXHRcdHRoaXMuX2FuaW1JZCA9IEwuVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKHRoaXMuX2FuaW1hdGUsIHRoaXMpO1xuXHRcdHRoaXMuX3N0ZXAoKTtcblx0fSxcblxuXHRfc3RlcDogZnVuY3Rpb24gKHJvdW5kKSB7XG5cdFx0dmFyIGVsYXBzZWQgPSAoK25ldyBEYXRlKCkpIC0gdGhpcy5fc3RhcnRUaW1lLFxuXHRcdCAgICBkdXJhdGlvbiA9IHRoaXMuX2R1cmF0aW9uICogMTAwMDtcblxuXHRcdGlmIChlbGFwc2VkIDwgZHVyYXRpb24pIHtcblx0XHRcdHRoaXMuX3J1bkZyYW1lKHRoaXMuX2Vhc2VPdXQoZWxhcHNlZCAvIGR1cmF0aW9uKSwgcm91bmQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9ydW5GcmFtZSgxKTtcblx0XHRcdHRoaXMuX2NvbXBsZXRlKCk7XG5cdFx0fVxuXHR9LFxuXG5cdF9ydW5GcmFtZTogZnVuY3Rpb24gKHByb2dyZXNzLCByb3VuZCkge1xuXHRcdHZhciBwb3MgPSB0aGlzLl9zdGFydFBvcy5hZGQodGhpcy5fb2Zmc2V0Lm11bHRpcGx5QnkocHJvZ3Jlc3MpKTtcblx0XHRpZiAocm91bmQpIHtcblx0XHRcdHBvcy5fcm91bmQoKTtcblx0XHR9XG5cdFx0TC5Eb21VdGlsLnNldFBvc2l0aW9uKHRoaXMuX2VsLCBwb3MpO1xuXG5cdFx0dGhpcy5maXJlKCdzdGVwJyk7XG5cdH0sXG5cblx0X2NvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0TC5VdGlsLmNhbmNlbEFuaW1GcmFtZSh0aGlzLl9hbmltSWQpO1xuXG5cdFx0dGhpcy5faW5Qcm9ncmVzcyA9IGZhbHNlO1xuXHRcdHRoaXMuZmlyZSgnZW5kJyk7XG5cdH0sXG5cblx0X2Vhc2VPdXQ6IGZ1bmN0aW9uICh0KSB7XG5cdFx0cmV0dXJuIDEgLSBNYXRoLnBvdygxIC0gdCwgdGhpcy5fZWFzZU91dFBvd2VyKTtcblx0fVxufSk7XG5cblxuXG4vKlxuICogRXh0ZW5kcyBMLk1hcCB0byBoYW5kbGUgcGFubmluZyBhbmltYXRpb25zLlxuICovXG5cbkwuTWFwLmluY2x1ZGUoe1xuXG5cdHNldFZpZXc6IGZ1bmN0aW9uIChjZW50ZXIsIHpvb20sIG9wdGlvbnMpIHtcblxuXHRcdHpvb20gPSB6b29tID09PSB1bmRlZmluZWQgPyB0aGlzLl96b29tIDogdGhpcy5fbGltaXRab29tKHpvb20pO1xuXHRcdGNlbnRlciA9IHRoaXMuX2xpbWl0Q2VudGVyKEwubGF0TG5nKGNlbnRlciksIHpvb20sIHRoaXMub3B0aW9ucy5tYXhCb3VuZHMpO1xuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdFx0dGhpcy5zdG9wKCk7XG5cblx0XHRpZiAodGhpcy5fbG9hZGVkICYmICFvcHRpb25zLnJlc2V0ICYmIG9wdGlvbnMgIT09IHRydWUpIHtcblxuXHRcdFx0aWYgKG9wdGlvbnMuYW5pbWF0ZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdG9wdGlvbnMuem9vbSA9IEwuZXh0ZW5kKHthbmltYXRlOiBvcHRpb25zLmFuaW1hdGV9LCBvcHRpb25zLnpvb20pO1xuXHRcdFx0XHRvcHRpb25zLnBhbiA9IEwuZXh0ZW5kKHthbmltYXRlOiBvcHRpb25zLmFuaW1hdGUsIGR1cmF0aW9uOiBvcHRpb25zLmR1cmF0aW9ufSwgb3B0aW9ucy5wYW4pO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyB0cnkgYW5pbWF0aW5nIHBhbiBvciB6b29tXG5cdFx0XHR2YXIgbW92ZWQgPSAodGhpcy5fem9vbSAhPT0gem9vbSkgP1xuXHRcdFx0XHR0aGlzLl90cnlBbmltYXRlZFpvb20gJiYgdGhpcy5fdHJ5QW5pbWF0ZWRab29tKGNlbnRlciwgem9vbSwgb3B0aW9ucy56b29tKSA6XG5cdFx0XHRcdHRoaXMuX3RyeUFuaW1hdGVkUGFuKGNlbnRlciwgb3B0aW9ucy5wYW4pO1xuXG5cdFx0XHRpZiAobW92ZWQpIHtcblx0XHRcdFx0Ly8gcHJldmVudCByZXNpemUgaGFuZGxlciBjYWxsLCB0aGUgdmlldyB3aWxsIHJlZnJlc2ggYWZ0ZXIgYW5pbWF0aW9uIGFueXdheVxuXHRcdFx0XHRjbGVhclRpbWVvdXQodGhpcy5fc2l6ZVRpbWVyKTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gYW5pbWF0aW9uIGRpZG4ndCBzdGFydCwganVzdCByZXNldCB0aGUgbWFwIHZpZXdcblx0XHR0aGlzLl9yZXNldFZpZXcoY2VudGVyLCB6b29tKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHBhbkJ5OiBmdW5jdGlvbiAob2Zmc2V0LCBvcHRpb25zKSB7XG5cdFx0b2Zmc2V0ID0gTC5wb2ludChvZmZzZXQpLnJvdW5kKCk7XG5cdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0XHRpZiAoIW9mZnNldC54ICYmICFvZmZzZXQueSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZmlyZSgnbW92ZWVuZCcpO1xuXHRcdH1cblx0XHQvLyBJZiB3ZSBwYW4gdG9vIGZhciwgQ2hyb21lIGdldHMgaXNzdWVzIHdpdGggdGlsZXNcblx0XHQvLyBhbmQgbWFrZXMgdGhlbSBkaXNhcHBlYXIgb3IgYXBwZWFyIGluIHRoZSB3cm9uZyBwbGFjZSAoc2xpZ2h0bHkgb2Zmc2V0KSAjMjYwMlxuXHRcdGlmIChvcHRpb25zLmFuaW1hdGUgIT09IHRydWUgJiYgIXRoaXMuZ2V0U2l6ZSgpLmNvbnRhaW5zKG9mZnNldCkpIHtcblx0XHRcdHRoaXMuX3Jlc2V0Vmlldyh0aGlzLnVucHJvamVjdCh0aGlzLnByb2plY3QodGhpcy5nZXRDZW50ZXIoKSkuYWRkKG9mZnNldCkpLCB0aGlzLmdldFpvb20oKSk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHRpZiAoIXRoaXMuX3BhbkFuaW0pIHtcblx0XHRcdHRoaXMuX3BhbkFuaW0gPSBuZXcgTC5Qb3NBbmltYXRpb24oKTtcblxuXHRcdFx0dGhpcy5fcGFuQW5pbS5vbih7XG5cdFx0XHRcdCdzdGVwJzogdGhpcy5fb25QYW5UcmFuc2l0aW9uU3RlcCxcblx0XHRcdFx0J2VuZCc6IHRoaXMuX29uUGFuVHJhbnNpdGlvbkVuZFxuXHRcdFx0fSwgdGhpcyk7XG5cdFx0fVxuXG5cdFx0Ly8gZG9uJ3QgZmlyZSBtb3Zlc3RhcnQgaWYgYW5pbWF0aW5nIGluZXJ0aWFcblx0XHRpZiAoIW9wdGlvbnMubm9Nb3ZlU3RhcnQpIHtcblx0XHRcdHRoaXMuZmlyZSgnbW92ZXN0YXJ0Jyk7XG5cdFx0fVxuXG5cdFx0Ly8gYW5pbWF0ZSBwYW4gdW5sZXNzIGFuaW1hdGU6IGZhbHNlIHNwZWNpZmllZFxuXHRcdGlmIChvcHRpb25zLmFuaW1hdGUgIT09IGZhbHNlKSB7XG5cdFx0XHRMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5fbWFwUGFuZSwgJ2xlYWZsZXQtcGFuLWFuaW0nKTtcblxuXHRcdFx0dmFyIG5ld1BvcyA9IHRoaXMuX2dldE1hcFBhbmVQb3MoKS5zdWJ0cmFjdChvZmZzZXQpO1xuXHRcdFx0dGhpcy5fcGFuQW5pbS5ydW4odGhpcy5fbWFwUGFuZSwgbmV3UG9zLCBvcHRpb25zLmR1cmF0aW9uIHx8IDAuMjUsIG9wdGlvbnMuZWFzZUxpbmVhcml0eSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3Jhd1BhbkJ5KG9mZnNldCk7XG5cdFx0XHR0aGlzLmZpcmUoJ21vdmUnKS5maXJlKCdtb3ZlZW5kJyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0X29uUGFuVHJhbnNpdGlvblN0ZXA6IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLmZpcmUoJ21vdmUnKTtcblx0fSxcblxuXHRfb25QYW5UcmFuc2l0aW9uRW5kOiBmdW5jdGlvbiAoKSB7XG5cdFx0TC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX21hcFBhbmUsICdsZWFmbGV0LXBhbi1hbmltJyk7XG5cdFx0dGhpcy5maXJlKCdtb3ZlZW5kJyk7XG5cdH0sXG5cblx0X3RyeUFuaW1hdGVkUGFuOiBmdW5jdGlvbiAoY2VudGVyLCBvcHRpb25zKSB7XG5cdFx0Ly8gZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSBuZXcgYW5kIGN1cnJlbnQgY2VudGVycyBpbiBwaXhlbHNcblx0XHR2YXIgb2Zmc2V0ID0gdGhpcy5fZ2V0Q2VudGVyT2Zmc2V0KGNlbnRlcikuX2Zsb29yKCk7XG5cblx0XHQvLyBkb24ndCBhbmltYXRlIHRvbyBmYXIgdW5sZXNzIGFuaW1hdGU6IHRydWUgc3BlY2lmaWVkIGluIG9wdGlvbnNcblx0XHRpZiAoKG9wdGlvbnMgJiYgb3B0aW9ucy5hbmltYXRlKSAhPT0gdHJ1ZSAmJiAhdGhpcy5nZXRTaXplKCkuY29udGFpbnMob2Zmc2V0KSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRcdHRoaXMucGFuQnkob2Zmc2V0LCBvcHRpb25zKTtcblxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG59KTtcblxuXG5cbi8qXG4gKiBFeHRlbmRzIEwuTWFwIHRvIGhhbmRsZSB6b29tIGFuaW1hdGlvbnMuXG4gKi9cblxuTC5NYXAubWVyZ2VPcHRpb25zKHtcblx0em9vbUFuaW1hdGlvbjogdHJ1ZSxcblx0em9vbUFuaW1hdGlvblRocmVzaG9sZDogNFxufSk7XG5cbnZhciB6b29tQW5pbWF0ZWQgPSBMLkRvbVV0aWwuVFJBTlNJVElPTiAmJiBMLkJyb3dzZXIuYW55M2QgJiYgIUwuQnJvd3Nlci5tb2JpbGVPcGVyYTtcblxuaWYgKHpvb21BbmltYXRlZCkge1xuXG5cdEwuTWFwLmFkZEluaXRIb29rKGZ1bmN0aW9uICgpIHtcblx0XHQvLyBkb24ndCBhbmltYXRlIG9uIGJyb3dzZXJzIHdpdGhvdXQgaGFyZHdhcmUtYWNjZWxlcmF0ZWQgdHJhbnNpdGlvbnMgb3Igb2xkIEFuZHJvaWQvT3BlcmFcblx0XHR0aGlzLl96b29tQW5pbWF0ZWQgPSB0aGlzLm9wdGlvbnMuem9vbUFuaW1hdGlvbjtcblxuXHRcdC8vIHpvb20gdHJhbnNpdGlvbnMgcnVuIHdpdGggdGhlIHNhbWUgZHVyYXRpb24gZm9yIGFsbCBsYXllcnMsIHNvIGlmIG9uZSBvZiB0cmFuc2l0aW9uZW5kIGV2ZW50c1xuXHRcdC8vIGhhcHBlbnMgYWZ0ZXIgc3RhcnRpbmcgem9vbSBhbmltYXRpb24gKHByb3BhZ2F0aW5nIHRvIHRoZSBtYXAgcGFuZSksIHdlIGtub3cgdGhhdCBpdCBlbmRlZCBnbG9iYWxseVxuXHRcdGlmICh0aGlzLl96b29tQW5pbWF0ZWQpIHtcblxuXHRcdFx0dGhpcy5fY3JlYXRlQW5pbVByb3h5KCk7XG5cblx0XHRcdEwuRG9tRXZlbnQub24odGhpcy5fcHJveHksIEwuRG9tVXRpbC5UUkFOU0lUSU9OX0VORCwgdGhpcy5fY2F0Y2hUcmFuc2l0aW9uRW5kLCB0aGlzKTtcblx0XHR9XG5cdH0pO1xufVxuXG5MLk1hcC5pbmNsdWRlKCF6b29tQW5pbWF0ZWQgPyB7fSA6IHtcblxuXHRfY3JlYXRlQW5pbVByb3h5OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgcHJveHkgPSB0aGlzLl9wcm94eSA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdsZWFmbGV0LXByb3h5IGxlYWZsZXQtem9vbS1hbmltYXRlZCcpO1xuXHRcdHRoaXMuX3BhbmVzLm1hcFBhbmUuYXBwZW5kQ2hpbGQocHJveHkpO1xuXG5cdFx0dGhpcy5vbignem9vbWFuaW0nLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0dmFyIHByb3AgPSBMLkRvbVV0aWwuVFJBTlNGT1JNLFxuXHRcdFx0ICAgIHRyYW5zZm9ybSA9IHByb3h5LnN0eWxlW3Byb3BdO1xuXG5cdFx0XHRMLkRvbVV0aWwuc2V0VHJhbnNmb3JtKHByb3h5LCB0aGlzLnByb2plY3QoZS5jZW50ZXIsIGUuem9vbSksIHRoaXMuZ2V0Wm9vbVNjYWxlKGUuem9vbSwgMSkpO1xuXG5cdFx0XHQvLyB3b3JrYXJvdW5kIGZvciBjYXNlIHdoZW4gdHJhbnNmb3JtIGlzIHRoZSBzYW1lIGFuZCBzbyB0cmFuc2l0aW9uZW5kIGV2ZW50IGlzIG5vdCBmaXJlZFxuXHRcdFx0aWYgKHRyYW5zZm9ybSA9PT0gcHJveHkuc3R5bGVbcHJvcF0gJiYgdGhpcy5fYW5pbWF0aW5nWm9vbSkge1xuXHRcdFx0XHR0aGlzLl9vblpvb21UcmFuc2l0aW9uRW5kKCk7XG5cdFx0XHR9XG5cdFx0fSwgdGhpcyk7XG5cblx0XHR0aGlzLm9uKCdsb2FkIG1vdmVlbmQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgYyA9IHRoaXMuZ2V0Q2VudGVyKCksXG5cdFx0XHQgICAgeiA9IHRoaXMuZ2V0Wm9vbSgpO1xuXHRcdFx0TC5Eb21VdGlsLnNldFRyYW5zZm9ybShwcm94eSwgdGhpcy5wcm9qZWN0KGMsIHopLCB0aGlzLmdldFpvb21TY2FsZSh6LCAxKSk7XG5cdFx0fSwgdGhpcyk7XG5cdH0sXG5cblx0X2NhdGNoVHJhbnNpdGlvbkVuZDogZnVuY3Rpb24gKGUpIHtcblx0XHRpZiAodGhpcy5fYW5pbWF0aW5nWm9vbSAmJiBlLnByb3BlcnR5TmFtZS5pbmRleE9mKCd0cmFuc2Zvcm0nKSA+PSAwKSB7XG5cdFx0XHR0aGlzLl9vblpvb21UcmFuc2l0aW9uRW5kKCk7XG5cdFx0fVxuXHR9LFxuXG5cdF9ub3RoaW5nVG9BbmltYXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuICF0aGlzLl9jb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZmxldC16b29tLWFuaW1hdGVkJykubGVuZ3RoO1xuXHR9LFxuXG5cdF90cnlBbmltYXRlZFpvb206IGZ1bmN0aW9uIChjZW50ZXIsIHpvb20sIG9wdGlvbnMpIHtcblxuXHRcdGlmICh0aGlzLl9hbmltYXRpbmdab29tKSB7IHJldHVybiB0cnVlOyB9XG5cblx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRcdC8vIGRvbid0IGFuaW1hdGUgaWYgZGlzYWJsZWQsIG5vdCBzdXBwb3J0ZWQgb3Igem9vbSBkaWZmZXJlbmNlIGlzIHRvbyBsYXJnZVxuXHRcdGlmICghdGhpcy5fem9vbUFuaW1hdGVkIHx8IG9wdGlvbnMuYW5pbWF0ZSA9PT0gZmFsc2UgfHwgdGhpcy5fbm90aGluZ1RvQW5pbWF0ZSgpIHx8XG5cdFx0ICAgICAgICBNYXRoLmFicyh6b29tIC0gdGhpcy5fem9vbSkgPiB0aGlzLm9wdGlvbnMuem9vbUFuaW1hdGlvblRocmVzaG9sZCkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRcdC8vIG9mZnNldCBpcyB0aGUgcGl4ZWwgY29vcmRzIG9mIHRoZSB6b29tIG9yaWdpbiByZWxhdGl2ZSB0byB0aGUgY3VycmVudCBjZW50ZXJcblx0XHR2YXIgc2NhbGUgPSB0aGlzLmdldFpvb21TY2FsZSh6b29tKSxcblx0XHQgICAgb2Zmc2V0ID0gdGhpcy5fZ2V0Q2VudGVyT2Zmc2V0KGNlbnRlcikuX2RpdmlkZUJ5KDEgLSAxIC8gc2NhbGUpO1xuXG5cdFx0Ly8gZG9uJ3QgYW5pbWF0ZSBpZiB0aGUgem9vbSBvcmlnaW4gaXNuJ3Qgd2l0aGluIG9uZSBzY3JlZW4gZnJvbSB0aGUgY3VycmVudCBjZW50ZXIsIHVubGVzcyBmb3JjZWRcblx0XHRpZiAob3B0aW9ucy5hbmltYXRlICE9PSB0cnVlICYmICF0aGlzLmdldFNpemUoKS5jb250YWlucyhvZmZzZXQpKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdFx0TC5VdGlsLnJlcXVlc3RBbmltRnJhbWUoZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpc1xuXHRcdFx0ICAgIC5fbW92ZVN0YXJ0KHRydWUpXG5cdFx0XHQgICAgLl9hbmltYXRlWm9vbShjZW50ZXIsIHpvb20sIHRydWUpO1xuXHRcdH0sIHRoaXMpO1xuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0X2FuaW1hdGVab29tOiBmdW5jdGlvbiAoY2VudGVyLCB6b29tLCBzdGFydEFuaW0sIG5vVXBkYXRlKSB7XG5cdFx0aWYgKHN0YXJ0QW5pbSkge1xuXHRcdFx0dGhpcy5fYW5pbWF0aW5nWm9vbSA9IHRydWU7XG5cblx0XHRcdC8vIHJlbWVtYmVyIHdoYXQgY2VudGVyL3pvb20gdG8gc2V0IGFmdGVyIGFuaW1hdGlvblxuXHRcdFx0dGhpcy5fYW5pbWF0ZVRvQ2VudGVyID0gY2VudGVyO1xuXHRcdFx0dGhpcy5fYW5pbWF0ZVRvWm9vbSA9IHpvb207XG5cblx0XHRcdEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9tYXBQYW5lLCAnbGVhZmxldC16b29tLWFuaW0nKTtcblx0XHR9XG5cblx0XHR0aGlzLmZpcmUoJ3pvb21hbmltJywge1xuXHRcdFx0Y2VudGVyOiBjZW50ZXIsXG5cdFx0XHR6b29tOiB6b29tLFxuXHRcdFx0bm9VcGRhdGU6IG5vVXBkYXRlXG5cdFx0fSk7XG5cblx0XHQvLyBXb3JrIGFyb3VuZCB3ZWJraXQgbm90IGZpcmluZyAndHJhbnNpdGlvbmVuZCcsIHNlZSBodHRwczovL2dpdGh1Yi5jb20vTGVhZmxldC9MZWFmbGV0L2lzc3Vlcy8zNjg5LCAyNjkzXG5cdFx0c2V0VGltZW91dChMLmJpbmQodGhpcy5fb25ab29tVHJhbnNpdGlvbkVuZCwgdGhpcyksIDI1MCk7XG5cdH0sXG5cblx0X29uWm9vbVRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoIXRoaXMuX2FuaW1hdGluZ1pvb20pIHsgcmV0dXJuOyB9XG5cblx0XHRMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5fbWFwUGFuZSwgJ2xlYWZsZXQtem9vbS1hbmltJyk7XG5cblx0XHQvLyBUaGlzIGFuaW0gZnJhbWUgc2hvdWxkIHByZXZlbnQgYW4gb2JzY3VyZSBpT1Mgd2Via2l0IHRpbGUgbG9hZGluZyByYWNlIGNvbmRpdGlvbi5cblx0XHRMLlV0aWwucmVxdWVzdEFuaW1GcmFtZShmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLl9hbmltYXRpbmdab29tID0gZmFsc2U7XG5cblx0XHRcdHRoaXNcblx0XHRcdFx0Ll9tb3ZlKHRoaXMuX2FuaW1hdGVUb0NlbnRlciwgdGhpcy5fYW5pbWF0ZVRvWm9vbSlcblx0XHRcdFx0Ll9tb3ZlRW5kKHRydWUpO1xuXHRcdH0sIHRoaXMpO1xuXHR9XG59KTtcblxuXG5cblxuTC5NYXAuaW5jbHVkZSh7XG5cdGZseVRvOiBmdW5jdGlvbiAodGFyZ2V0Q2VudGVyLCB0YXJnZXRab29tLCBvcHRpb25zKSB7XG5cblx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblx0XHRpZiAob3B0aW9ucy5hbmltYXRlID09PSBmYWxzZSB8fCAhTC5Ccm93c2VyLmFueTNkKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5zZXRWaWV3KHRhcmdldENlbnRlciwgdGFyZ2V0Wm9vbSwgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5zdG9wKCk7XG5cblx0XHR2YXIgZnJvbSA9IHRoaXMucHJvamVjdCh0aGlzLmdldENlbnRlcigpKSxcblx0XHQgICAgdG8gPSB0aGlzLnByb2plY3QodGFyZ2V0Q2VudGVyKSxcblx0XHQgICAgc2l6ZSA9IHRoaXMuZ2V0U2l6ZSgpLFxuXHRcdCAgICBzdGFydFpvb20gPSB0aGlzLl96b29tO1xuXG5cdFx0dGFyZ2V0Q2VudGVyID0gTC5sYXRMbmcodGFyZ2V0Q2VudGVyKTtcblx0XHR0YXJnZXRab29tID0gdGFyZ2V0Wm9vbSA9PT0gdW5kZWZpbmVkID8gc3RhcnRab29tIDogdGFyZ2V0Wm9vbTtcblxuXHRcdHZhciB3MCA9IE1hdGgubWF4KHNpemUueCwgc2l6ZS55KSxcblx0XHQgICAgdzEgPSB3MCAqIHRoaXMuZ2V0Wm9vbVNjYWxlKHN0YXJ0Wm9vbSwgdGFyZ2V0Wm9vbSksXG5cdFx0ICAgIHUxID0gKHRvLmRpc3RhbmNlVG8oZnJvbSkpIHx8IDEsXG5cdFx0ICAgIHJobyA9IDEuNDIsXG5cdFx0ICAgIHJobzIgPSByaG8gKiByaG87XG5cblx0XHRmdW5jdGlvbiByKGkpIHtcblx0XHRcdHZhciBiID0gKHcxICogdzEgLSB3MCAqIHcwICsgKGkgPyAtMSA6IDEpICogcmhvMiAqIHJobzIgKiB1MSAqIHUxKSAvICgyICogKGkgPyB3MSA6IHcwKSAqIHJobzIgKiB1MSk7XG5cdFx0XHRyZXR1cm4gTWF0aC5sb2coTWF0aC5zcXJ0KGIgKiBiICsgMSkgLSBiKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBzaW5oKG4pIHsgcmV0dXJuIChNYXRoLmV4cChuKSAtIE1hdGguZXhwKC1uKSkgLyAyOyB9XG5cdFx0ZnVuY3Rpb24gY29zaChuKSB7IHJldHVybiAoTWF0aC5leHAobikgKyBNYXRoLmV4cCgtbikpIC8gMjsgfVxuXHRcdGZ1bmN0aW9uIHRhbmgobikgeyByZXR1cm4gc2luaChuKSAvIGNvc2gobik7IH1cblxuXHRcdHZhciByMCA9IHIoMCk7XG5cblx0XHRmdW5jdGlvbiB3KHMpIHsgcmV0dXJuIHcwICogKGNvc2gocjApIC8gY29zaChyMCArIHJobyAqIHMpKTsgfVxuXHRcdGZ1bmN0aW9uIHUocykgeyByZXR1cm4gdzAgKiAoY29zaChyMCkgKiB0YW5oKHIwICsgcmhvICogcykgLSBzaW5oKHIwKSkgLyByaG8yOyB9XG5cblx0XHRmdW5jdGlvbiBlYXNlT3V0KHQpIHsgcmV0dXJuIDEgLSBNYXRoLnBvdygxIC0gdCwgMS41KTsgfVxuXG5cdFx0dmFyIHN0YXJ0ID0gRGF0ZS5ub3coKSxcblx0XHQgICAgUyA9IChyKDEpIC0gcjApIC8gcmhvLFxuXHRcdCAgICBkdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb24gPyAxMDAwICogb3B0aW9ucy5kdXJhdGlvbiA6IDEwMDAgKiBTICogMC44O1xuXG5cdFx0ZnVuY3Rpb24gZnJhbWUoKSB7XG5cdFx0XHR2YXIgdCA9IChEYXRlLm5vdygpIC0gc3RhcnQpIC8gZHVyYXRpb24sXG5cdFx0XHQgICAgcyA9IGVhc2VPdXQodCkgKiBTO1xuXG5cdFx0XHRpZiAodCA8PSAxKSB7XG5cdFx0XHRcdHRoaXMuX2ZseVRvRnJhbWUgPSBMLlV0aWwucmVxdWVzdEFuaW1GcmFtZShmcmFtZSwgdGhpcyk7XG5cblx0XHRcdFx0dGhpcy5fbW92ZShcblx0XHRcdFx0XHR0aGlzLnVucHJvamVjdChmcm9tLmFkZCh0by5zdWJ0cmFjdChmcm9tKS5tdWx0aXBseUJ5KHUocykgLyB1MSkpLCBzdGFydFpvb20pLFxuXHRcdFx0XHRcdHRoaXMuZ2V0U2NhbGVab29tKHcwIC8gdyhzKSwgc3RhcnRab29tKSxcblx0XHRcdFx0XHR7Zmx5VG86IHRydWV9KTtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpc1xuXHRcdFx0XHRcdC5fbW92ZSh0YXJnZXRDZW50ZXIsIHRhcmdldFpvb20pXG5cdFx0XHRcdFx0Ll9tb3ZlRW5kKHRydWUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuX21vdmVTdGFydCh0cnVlKTtcblxuXHRcdGZyYW1lLmNhbGwodGhpcyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0Zmx5VG9Cb3VuZHM6IGZ1bmN0aW9uIChib3VuZHMsIG9wdGlvbnMpIHtcblx0XHR2YXIgdGFyZ2V0ID0gdGhpcy5fZ2V0Qm91bmRzQ2VudGVyWm9vbShib3VuZHMsIG9wdGlvbnMpO1xuXHRcdHJldHVybiB0aGlzLmZseVRvKHRhcmdldC5jZW50ZXIsIHRhcmdldC56b29tLCBvcHRpb25zKTtcblx0fVxufSk7XG5cblxuXG4vKlxyXG4gKiBQcm92aWRlcyBMLk1hcCB3aXRoIGNvbnZlbmllbnQgc2hvcnRjdXRzIGZvciB1c2luZyBicm93c2VyIGdlb2xvY2F0aW9uIGZlYXR1cmVzLlxyXG4gKi9cclxuXHJcbkwuTWFwLmluY2x1ZGUoe1xyXG5cdF9kZWZhdWx0TG9jYXRlT3B0aW9uczoge1xyXG5cdFx0dGltZW91dDogMTAwMDAsXHJcblx0XHR3YXRjaDogZmFsc2VcclxuXHRcdC8vIHNldFZpZXc6IGZhbHNlXHJcblx0XHQvLyBtYXhab29tOiA8TnVtYmVyPlxyXG5cdFx0Ly8gbWF4aW11bUFnZTogMFxyXG5cdFx0Ly8gZW5hYmxlSGlnaEFjY3VyYWN5OiBmYWxzZVxyXG5cdH0sXHJcblxyXG5cdGxvY2F0ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHJcblx0XHRvcHRpb25zID0gdGhpcy5fbG9jYXRlT3B0aW9ucyA9IEwuZXh0ZW5kKHt9LCB0aGlzLl9kZWZhdWx0TG9jYXRlT3B0aW9ucywgb3B0aW9ucyk7XHJcblxyXG5cdFx0aWYgKCEoJ2dlb2xvY2F0aW9uJyBpbiBuYXZpZ2F0b3IpKSB7XHJcblx0XHRcdHRoaXMuX2hhbmRsZUdlb2xvY2F0aW9uRXJyb3Ioe1xyXG5cdFx0XHRcdGNvZGU6IDAsXHJcblx0XHRcdFx0bWVzc2FnZTogJ0dlb2xvY2F0aW9uIG5vdCBzdXBwb3J0ZWQuJ1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIG9uUmVzcG9uc2UgPSBMLmJpbmQodGhpcy5faGFuZGxlR2VvbG9jYXRpb25SZXNwb25zZSwgdGhpcyksXHJcblx0XHQgICAgb25FcnJvciA9IEwuYmluZCh0aGlzLl9oYW5kbGVHZW9sb2NhdGlvbkVycm9yLCB0aGlzKTtcclxuXHJcblx0XHRpZiAob3B0aW9ucy53YXRjaCkge1xyXG5cdFx0XHR0aGlzLl9sb2NhdGlvbldhdGNoSWQgPVxyXG5cdFx0XHQgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi53YXRjaFBvc2l0aW9uKG9uUmVzcG9uc2UsIG9uRXJyb3IsIG9wdGlvbnMpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihvblJlc3BvbnNlLCBvbkVycm9yLCBvcHRpb25zKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHN0b3BMb2NhdGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmIChuYXZpZ2F0b3IuZ2VvbG9jYXRpb24gJiYgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmNsZWFyV2F0Y2gpIHtcclxuXHRcdFx0bmF2aWdhdG9yLmdlb2xvY2F0aW9uLmNsZWFyV2F0Y2godGhpcy5fbG9jYXRpb25XYXRjaElkKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLl9sb2NhdGVPcHRpb25zKSB7XHJcblx0XHRcdHRoaXMuX2xvY2F0ZU9wdGlvbnMuc2V0VmlldyA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0X2hhbmRsZUdlb2xvY2F0aW9uRXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xyXG5cdFx0dmFyIGMgPSBlcnJvci5jb2RlLFxyXG5cdFx0ICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlIHx8XHJcblx0XHQgICAgICAgICAgICAoYyA9PT0gMSA/ICdwZXJtaXNzaW9uIGRlbmllZCcgOlxyXG5cdFx0ICAgICAgICAgICAgKGMgPT09IDIgPyAncG9zaXRpb24gdW5hdmFpbGFibGUnIDogJ3RpbWVvdXQnKSk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2xvY2F0ZU9wdGlvbnMuc2V0VmlldyAmJiAhdGhpcy5fbG9hZGVkKSB7XHJcblx0XHRcdHRoaXMuZml0V29ybGQoKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmZpcmUoJ2xvY2F0aW9uZXJyb3InLCB7XHJcblx0XHRcdGNvZGU6IGMsXHJcblx0XHRcdG1lc3NhZ2U6ICdHZW9sb2NhdGlvbiBlcnJvcjogJyArIG1lc3NhZ2UgKyAnLidcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdF9oYW5kbGVHZW9sb2NhdGlvblJlc3BvbnNlOiBmdW5jdGlvbiAocG9zKSB7XHJcblx0XHR2YXIgbGF0ID0gcG9zLmNvb3Jkcy5sYXRpdHVkZSxcclxuXHRcdCAgICBsbmcgPSBwb3MuY29vcmRzLmxvbmdpdHVkZSxcclxuXHRcdCAgICBsYXRsbmcgPSBuZXcgTC5MYXRMbmcobGF0LCBsbmcpLFxyXG5cdFx0ICAgIGJvdW5kcyA9IGxhdGxuZy50b0JvdW5kcyhwb3MuY29vcmRzLmFjY3VyYWN5KSxcclxuXHRcdCAgICBvcHRpb25zID0gdGhpcy5fbG9jYXRlT3B0aW9ucztcclxuXHJcblx0XHRpZiAob3B0aW9ucy5zZXRWaWV3KSB7XHJcblx0XHRcdHZhciB6b29tID0gdGhpcy5nZXRCb3VuZHNab29tKGJvdW5kcyk7XHJcblx0XHRcdHRoaXMuc2V0VmlldyhsYXRsbmcsIG9wdGlvbnMubWF4Wm9vbSA/IE1hdGgubWluKHpvb20sIG9wdGlvbnMubWF4Wm9vbSkgOiB6b29tKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgZGF0YSA9IHtcclxuXHRcdFx0bGF0bG5nOiBsYXRsbmcsXHJcblx0XHRcdGJvdW5kczogYm91bmRzLFxyXG5cdFx0XHR0aW1lc3RhbXA6IHBvcy50aW1lc3RhbXBcclxuXHRcdH07XHJcblxyXG5cdFx0Zm9yICh2YXIgaSBpbiBwb3MuY29vcmRzKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgcG9zLmNvb3Jkc1tpXSA9PT0gJ251bWJlcicpIHtcclxuXHRcdFx0XHRkYXRhW2ldID0gcG9zLmNvb3Jkc1tpXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZmlyZSgnbG9jYXRpb25mb3VuZCcsIGRhdGEpO1xyXG5cdH1cclxufSk7XHJcblxuXG59KHdpbmRvdywgZG9jdW1lbnQpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxlYWZsZXQtc3JjLm1hcCIsIi8qKlxuICogQGNsYXNzICBMLk1hdHJpeFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBhXG4gKiBAcGFyYW0ge051bWJlcn0gYlxuICogQHBhcmFtIHtOdW1iZXJ9IGNcbiAqIEBwYXJhbSB7TnVtYmVyfSBkXG4gKiBAcGFyYW0ge051bWJlcn0gZVxuICogQHBhcmFtIHtOdW1iZXJ9IGZcbiAqL1xuTC5NYXRyaXggPSBmdW5jdGlvbihhLCBiLCBjLCBkLCBlLCBmKSB7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtBcnJheS48TnVtYmVyPn1cbiAgICovXG4gIHRoaXMuX21hdHJpeCA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbn07XG5cblxuTC5NYXRyaXgucHJvdG90eXBlID0ge1xuXG5cbiAgLyoqXG4gICAqIEBwYXJhbSAge0wuUG9pbnR9IHBvaW50XG4gICAqIEByZXR1cm4ge0wuUG9pbnR9XG4gICAqL1xuICB0cmFuc2Zvcm06IGZ1bmN0aW9uKHBvaW50KSB7XG4gICAgcmV0dXJuIHRoaXMuX3RyYW5zZm9ybShwb2ludC5jbG9uZSgpKTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBEZXN0cnVjdGl2ZVxuICAgKlxuICAgKiBbIHggXSA9IFsgYSAgYiAgdHggXSBbIHggXSA9IFsgYSAqIHggKyBiICogeSArIHR4IF1cbiAgICogWyB5IF0gPSBbIGMgIGQgIHR5IF0gWyB5IF0gPSBbIGMgKiB4ICsgZCAqIHkgKyB0eSBdXG4gICAqXG4gICAqIEBwYXJhbSAge0wuUG9pbnR9IHBvaW50XG4gICAqIEByZXR1cm4ge0wuUG9pbnR9XG4gICAqL1xuICBfdHJhbnNmb3JtOiBmdW5jdGlvbihwb2ludCkge1xuICAgIHZhciBtYXRyaXggPSB0aGlzLl9tYXRyaXg7XG4gICAgdmFyIHggPSBwb2ludC54LCB5ID0gcG9pbnQueTtcbiAgICBwb2ludC54ID0gbWF0cml4WzBdICogeCArIG1hdHJpeFsxXSAqIHkgKyBtYXRyaXhbNF07XG4gICAgcG9pbnQueSA9IG1hdHJpeFsyXSAqIHggKyBtYXRyaXhbM10gKiB5ICsgbWF0cml4WzVdO1xuICAgIHJldHVybiBwb2ludDtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBAcGFyYW0gIHtMLlBvaW50fSBwb2ludFxuICAgKiBAcmV0dXJuIHtMLlBvaW50fVxuICAgKi9cbiAgdW50cmFuc2Zvcm06IGZ1bmN0aW9uIChwb2ludCkge1xuICAgIHZhciBtYXRyaXggPSB0aGlzLl9tYXRyaXg7XG4gICAgcmV0dXJuIG5ldyBMLlBvaW50KFxuICAgICAgKHBvaW50LnggLyBtYXRyaXhbMF0gLSBtYXRyaXhbNF0pIC8gbWF0cml4WzBdLFxuICAgICAgKHBvaW50LnkgLyBtYXRyaXhbMl0gLSBtYXRyaXhbNV0pIC8gbWF0cml4WzJdXG4gICAgKTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtMLk1hdHJpeH1cbiAgICovXG4gIGNsb25lOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbWF0cml4ID0gdGhpcy5fbWF0cml4O1xuICAgIHJldHVybiBuZXcgTC5NYXRyaXgoXG4gICAgICBtYXRyaXhbMF0sIG1hdHJpeFsxXSwgbWF0cml4WzJdLFxuICAgICAgbWF0cml4WzNdLCBtYXRyaXhbNF0sIG1hdHJpeFs1XVxuICAgICk7XG4gIH0sXG5cblxuICAvKipcbiAgICogQHBhcmFtIHtMLlBvaW50PXxOdW1iZXI9fSB0cmFuc2xhdGVcbiAgICogQHJldHVybiB7TC5NYXRyaXh8TC5Qb2ludH1cbiAgICovXG4gIHRyYW5zbGF0ZTogZnVuY3Rpb24odHJhbnNsYXRlKSB7XG4gICAgaWYgKHRyYW5zbGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gbmV3IEwuUG9pbnQodGhpcy5fbWF0cml4WzRdLCB0aGlzLl9tYXRyaXhbNV0pO1xuICAgIH1cblxuICAgIHZhciB0cmFuc2xhdGVYLCB0cmFuc2xhdGVZO1xuICAgIGlmICh0eXBlb2YgdHJhbnNsYXRlID09PSAnbnVtYmVyJykge1xuICAgICAgdHJhbnNsYXRlWCA9IHRyYW5zbGF0ZVkgPSB0cmFuc2xhdGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYW5zbGF0ZVggPSB0cmFuc2xhdGUueDtcbiAgICAgIHRyYW5zbGF0ZVkgPSB0cmFuc2xhdGUueTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fYWRkKDEsIDAsIDAsIDEsIHRyYW5zbGF0ZVgsIHRyYW5zbGF0ZVkpO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7TC5Qb2ludD18TnVtYmVyPX0gc2NhbGVcbiAgICogQHJldHVybiB7TC5NYXRyaXh8TC5Qb2ludH1cbiAgICovXG4gIHNjYWxlOiBmdW5jdGlvbihzY2FsZSwgb3JpZ2luKSB7XG4gICAgaWYgKHNjYWxlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBuZXcgTC5Qb2ludCh0aGlzLl9tYXRyaXhbMF0sIHRoaXMuX21hdHJpeFszXSk7XG4gICAgfVxuXG4gICAgdmFyIHNjYWxlWCwgc2NhbGVZO1xuICAgIG9yaWdpbiA9IG9yaWdpbiB8fCBMLnBvaW50KDAsIDApO1xuICAgIGlmICh0eXBlb2Ygc2NhbGUgPT09ICdudW1iZXInKSB7XG4gICAgICBzY2FsZVggPSBzY2FsZVkgPSBzY2FsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2NhbGVYID0gc2NhbGUueDtcbiAgICAgIHNjYWxlWSA9IHNjYWxlLnk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgICAgIC5fYWRkKHNjYWxlWCwgMCwgMCwgc2NhbGVZLCBvcmlnaW4ueCwgb3JpZ2luLnkpXG4gICAgICAuX2FkZCgxLCAwLCAwLCAxLCAtb3JpZ2luLngsIC1vcmlnaW4ueSk7XG4gIH0sXG5cblxuICAvKipcbiAgICogbTAwICBtMDEgIHggLSBtMDAgKiB4IC0gbTAxICogeVxuICAgKiBtMTAgIG0xMSAgeSAtIG0xMCAqIHggLSBtMTEgKiB5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgIGFuZ2xlXG4gICAqIEBwYXJhbSB7TC5Qb2ludD19IG9yaWdpblxuICAgKiBAcmV0dXJuIHtMLk1hdHJpeH1cbiAgICovXG4gIHJvdGF0ZTogZnVuY3Rpb24oYW5nbGUsIG9yaWdpbikge1xuICAgIHZhciBjb3MgPSBNYXRoLmNvcyhhbmdsZSk7XG4gICAgdmFyIHNpbiA9IE1hdGguc2luKGFuZ2xlKTtcblxuICAgIG9yaWdpbiA9IG9yaWdpbiB8fCBuZXcgTC5Qb2ludCgwLCAwKTtcblxuICAgIHJldHVybiB0aGlzXG4gICAgICAuX2FkZChjb3MsIHNpbiwgLXNpbiwgY29zLCBvcmlnaW4ueCwgb3JpZ2luLnkpXG4gICAgICAuX2FkZCgxLCAwLCAwLCAxLCAtb3JpZ2luLngsIC1vcmlnaW4ueSk7XG4gIH0sXG5cblxuICAvKipcbiAgICogSW52ZXJ0IHJvdGF0aW9uXG4gICAqIEByZXR1cm4ge0wuTWF0cml4fVxuICAgKi9cbiAgZmxpcDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fbWF0cml4WzFdICo9IC0xO1xuICAgIHRoaXMuX21hdHJpeFsyXSAqPSAtMTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge051bWJlcnxMLk1hdHJpeH0gYVxuICAgKiBAcGFyYW0ge051bWJlcn0gYlxuICAgKiBAcGFyYW0ge051bWJlcn0gY1xuICAgKiBAcGFyYW0ge051bWJlcn0gZFxuICAgKiBAcGFyYW0ge051bWJlcn0gZVxuICAgKiBAcGFyYW0ge051bWJlcn0gZlxuICAgKi9cbiAgX2FkZDogZnVuY3Rpb24oYSwgYiwgYywgZCwgZSwgZikge1xuICAgIHZhciByZXN1bHQgPSBbW10sIFtdLCBbXV07XG4gICAgdmFyIHNyYyA9IHRoaXMuX21hdHJpeDtcbiAgICB2YXIgbSA9IFtcbiAgICAgIFtzcmNbMF0sIHNyY1syXSwgc3JjWzRdXSxcbiAgICAgIFtzcmNbMV0sIHNyY1szXSwgc3JjWzVdXSxcbiAgICAgIFsgICAgIDAsICAgICAgMCwgICAgIDFdXG4gICAgXTtcbiAgICB2YXIgb3RoZXIgPSBbXG4gICAgICBbYSwgYywgZV0sXG4gICAgICBbYiwgZCwgZl0sXG4gICAgICBbMCwgMCwgMV1cbiAgICBdLCB2YWw7XG5cblxuICAgIGlmIChhICYmIGEgaW5zdGFuY2VvZiBMLk1hdHJpeCkge1xuICAgICAgc3JjID0gYS5fbWF0cml4O1xuICAgICAgb3RoZXIgPSBbXG4gICAgICAgIFtzcmNbMF0sIHNyY1syXSwgc3JjWzRdXSxcbiAgICAgICAgW3NyY1sxXSwgc3JjWzNdLCBzcmNbNV1dLFxuICAgICAgICBbICAgICAwLCAgICAgIDAsICAgICAxXV07XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgMzsgaisrKSB7XG4gICAgICAgIHZhbCA9IDA7XG4gICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgMzsgaysrKSB7XG4gICAgICAgICAgdmFsICs9IG1baV1ba10gKiBvdGhlcltrXVtqXTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHRbaV1bal0gPSB2YWw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fbWF0cml4ID0gW1xuICAgICAgcmVzdWx0WzBdWzBdLCByZXN1bHRbMV1bMF0sIHJlc3VsdFswXVsxXSxcbiAgICAgIHJlc3VsdFsxXVsxXSwgcmVzdWx0WzBdWzJdLCByZXN1bHRbMV1bMl1cbiAgICBdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cblxufTtcblxuXG5MLm1hdHJpeCA9IGZ1bmN0aW9uKGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgcmV0dXJuIG5ldyBMLk1hdHJpeChhLCBiLCBjLCBkLCBlLCBmKTtcbn07XG4iLCJMLkhhbmRsZXIuUGF0aFRyYW5zZm9ybSA9IEwuSGFuZGxlci5leHRlbmQoe1xuXG4gIG9wdGlvbnM6IHtcbiAgICByb3RhdGlvbjogdHJ1ZSxcbiAgICBzY2FsaW5nOiAgdHJ1ZSxcblxuICAgIC8vIGVkZ2UgaGFuZGxlcnNcbiAgICBoYW5kbGVyT3B0aW9uczoge1xuICAgICAgcmFkaXVzOiAgICAgIDUsXG4gICAgICBmaWxsQ29sb3I6ICAgJyNmZmZmZmYnLFxuICAgICAgY29sb3I6ICAgICAgICcjMjAyMDIwJyxcbiAgICAgIGZpbGxPcGFjaXR5OiAxLFxuICAgICAgd2VpZ2h0OiAgICAgIDIsXG4gICAgICBvcGFjaXR5OiAgICAgMC43XG4gICAgfSxcblxuICAgIC8vIHJlY3RhbmdsZVxuICAgIGJvdW5kc09wdGlvbnM6IHtcbiAgICAgIHdlaWdodDogICAgMSxcbiAgICAgIG9wYWNpdHk6ICAgMSxcbiAgICAgIGRhc2hBcnJheTogWzMsIDNdLFxuICAgICAgZmlsbDogICAgICBmYWxzZVxuICAgIH0sXG5cbiAgICAvLyByb3RhdGlvbiBoYW5kbGVyXG4gICAgcm90YXRlSGFuZGxlT3B0aW9uczoge1xuICAgICAgd2VpZ2h0OiAxLFxuICAgICAgb3BhY2l0eTogMVxuICAgIH0sXG4gICAgLy8gcm90YXRpb24gaGFuZGxlIGxlbmd0aFxuICAgIGhhbmRsZUxlbmd0aDogMjAsXG5cbiAgICAvLyBtYXliZSBJJ2xsIGFkZCBza2V3aW5nIGluIHRoZSBmdXR1cmVcbiAgICBlZGdlc0NvdW50OiAgIDRcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBAY2xhc3MgTC5IYW5kbGVyLlBhdGhUcmFuc2Zvcm1cbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSAge0wuUGF0aH0gcGF0aFxuICAgKi9cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ocGF0aCkge1xuICAgIC8vIHJlZmVyZW5jZXNcbiAgICB0aGlzLl9wYXRoID0gcGF0aDtcbiAgICB0aGlzLl9tYXAgID0gbnVsbDtcblxuICAgIC8vIGhhbmRsZXJzXG4gICAgdGhpcy5fYWN0aXZlTWFya2VyICAgPSBudWxsO1xuICAgIHRoaXMuX29yaWdpbk1hcmtlciAgID0gbnVsbDtcbiAgICB0aGlzLl9yb3RhdGlvbk1hcmtlciA9IG51bGw7XG5cbiAgICAvLyBvcmlnaW5zICYgdGVtcG9yYXJ5IHN0YXRlXG4gICAgdGhpcy5fcm90YXRpb25PcmlnaW4gICA9IG51bGw7XG4gICAgdGhpcy5fc2NhbGVPcmlnaW4gICAgICA9IG51bGw7XG4gICAgdGhpcy5fYW5nbGUgICAgICAgICAgICA9IDA7XG4gICAgdGhpcy5fc2NhbGUgICAgICAgICAgICA9IEwucG9pbnQoMSwgMSk7XG4gICAgdGhpcy5faW5pdGlhbERpc3QgICAgICA9IDA7XG4gICAgdGhpcy5fcm90YXRpb25TdGFydCAgICA9IG51bGw7XG4gICAgdGhpcy5fcm90YXRpb25PcmlnaW5QdCA9IG51bGw7XG5cbiAgICAvLyBwcmV2aWV3IGFuZCB0cmFuc2Zvcm0gbWF0cml4XG4gICAgdGhpcy5fbWF0cml4ICAgICAgICAgID0gbmV3IEwuTWF0cml4KDEsIDAsIDAsIDEsIDAsIDApO1xuICAgIHRoaXMuX3Byb2plY3RlZE1hdHJpeCA9IG5ldyBMLk1hdHJpeCgxLCAwLCAwLCAxLCAwLCAwKTtcblxuICAgIC8vIHVpIGVsZW1lbnRzXG4gICAgdGhpcy5faGFuZGxlcnNHcm91cCAgPSBudWxsO1xuICAgIHRoaXMuX3JlY3QgICAgICAgICAgID0gbnVsbDtcbiAgICB0aGlzLl9oYW5kbGVycyAgICAgICA9IFtdO1xuICAgIHRoaXMuX2hhbmRsZUxpbmUgICAgID0gbnVsbDtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBJZiB0aGUgcG9seWdvbiBpcyBub3QgcmVuZGVyZWQsIHlvdSBjYW4gdHJhbnNmb3JtIGl0IHlvdXJzZWxmXG4gICAqIGluIHRoZSBjb29yZGluYXRlcywgYW5kIGRvIGl0IHByb3Blcmx5LlxuICAgKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcbiAgICovXG4gIGVuYWJsZTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIGlmICh0aGlzLl9wYXRoLl9tYXApIHtcbiAgICAgIHRoaXMuX21hcCA9IHRoaXMuX3BhdGguX21hcDtcbiAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIEwuSGFuZGxlci5wcm90b3R5cGUuZW5hYmxlLmNhbGwodGhpcyk7XG4gICAgfVxuICB9LFxuXG5cbiAgLyoqXG4gICAqIEluaXQgaW50ZXJhY3Rpb25zIGFuZCBoYW5kbGVyc1xuICAgKi9cbiAgYWRkSG9va3M6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2NyZWF0ZUhhbmRsZXJzKCk7XG4gICAgdGhpcy5fcGF0aFxuICAgICAgLm9uKCdkcmFnc3RhcnQnLCB0aGlzLl9vbkRyYWdTdGFydCwgdGhpcylcbiAgICAgIC5vbignZHJhZ2VuZCcsICAgdGhpcy5fb25EcmFnRW5kLCB0aGlzKTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBSZW1vdmUgaGFuZGxlcnNcbiAgICovXG4gIHJlbW92ZUhvb2tzOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9oaWRlSGFuZGxlcnMoKTtcbiAgICB0aGlzLl9oYW5kbGVyc0dyb3VwID0gbnVsbDtcbiAgICB0aGlzLl9yZWN0ID0gbnVsbDtcbiAgICB0aGlzLl9oYW5kbGVycyA9IFtdO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIENoYW5nZSBlZGl0aW5nIG9wdGlvbnNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICovXG4gIHNldE9wdGlvbnM6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICB2YXIgZW5hYmxlZCA9IHRoaXMuX2VuYWJsZWQ7XG4gICAgaWYgKGVuYWJsZWQpIHtcbiAgICAgIHRoaXMuZGlzYWJsZSgpO1xuICAgIH1cblxuICAgIHRoaXMub3B0aW9ucyA9IEwuVXRpbC5tZXJnZSh7fSxcbiAgICAgIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoTC5IYW5kbGVyLlBhdGhUcmFuc2Zvcm0ucHJvdG90eXBlLm9wdGlvbnMpKSxcbiAgICAgIG9wdGlvbnMpO1xuXG4gICAgaWYgKGVuYWJsZWQpIHtcbiAgICAgIHRoaXMuZW5hYmxlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBwb2x5Z29uIGFuZCBoYW5kbGVycyBwcmV2aWV3LCBubyByZXByb2plY3Rpb25cbiAgICovXG4gIF91cGRhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBtYXRyaXggPSB0aGlzLl9tYXRyaXg7XG5cbiAgICAvLyB1cGRhdGUgaGFuZGxlcnNcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5faGFuZGxlcnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHZhciBoYW5kbGVyID0gdGhpcy5faGFuZGxlcnNbaV07XG4gICAgICBpZiAoaGFuZGxlciAhPT0gdGhpcy5fb3JpZ2luTWFya2VyKSB7XG4gICAgICAgIGhhbmRsZXIuX3BvaW50ID0gbWF0cml4LnRyYW5zZm9ybShoYW5kbGVyLl9pbml0aWFsUG9pbnQpO1xuICAgICAgICBoYW5kbGVyLl91cGRhdGVQYXRoKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWF0cml4ID0gbWF0cml4LmNsb25lKCkuZmxpcCgpO1xuXG4gICAgdGhpcy5fYXBwbHlUcmFuc2Zvcm0obWF0cml4KTtcbiAgICB0aGlzLl9wYXRoLmZpcmUoJ3RyYW5zZm9ybScsIHsgbGF5ZXI6IHRoaXMuX3BhdGggfSk7XG4gIH0sXG5cblxuICAvKipcbiAgICogQHBhcmFtICB7TC5NYXRyaXh9IG1hdHJpeFxuICAgKi9cbiAgX2FwcGx5VHJhbnNmb3JtOiBmdW5jdGlvbihtYXRyaXgpIHtcbiAgICB0aGlzLl9wYXRoLl90cmFuc2Zvcm0obWF0cml4Ll9tYXRyaXgpO1xuICAgIHRoaXMuX3JlY3QuX3RyYW5zZm9ybShtYXRyaXguX21hdHJpeCk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnJvdGF0aW9uKSB7XG4gICAgICB0aGlzLl9oYW5kbGVMaW5lLl90cmFuc2Zvcm0obWF0cml4Ll9tYXRyaXgpO1xuICAgIH1cbiAgfSxcblxuXG4gIC8qKlxuICAgKiBBcHBseSBmaW5hbCB0cmFuc2Zvcm1hdGlvblxuICAgKi9cbiAgX2FwcGx5OiBmdW5jdGlvbigpIHtcbiAgICAvL2NvbnNvbGUuZ3JvdXAoJ2FwcGx5IHRyYW5zZm9ybScpO1xuICAgIHZhciBtYXAgPSB0aGlzLl9tYXA7XG4gICAgdmFyIG1hdHJpeCA9IHRoaXMuX21hdHJpeC5jbG9uZSgpO1xuICAgIHZhciBhbmdsZSA9IHRoaXMuX2FuZ2xlO1xuICAgIHZhciBzY2FsZSA9IHRoaXMuX3NjYWxlLmNsb25lKCk7XG5cbiAgICB0aGlzLl90cmFuc2Zvcm1HZW9tZXRyaWVzKCk7XG5cbiAgICAvLyB1cGRhdGUgaGFuZGxlcnNcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5faGFuZGxlcnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHZhciBoYW5kbGVyID0gdGhpcy5faGFuZGxlcnNbaV07XG4gICAgICBoYW5kbGVyLl9sYXRsbmcgPSBtYXAubGF5ZXJQb2ludFRvTGF0TG5nKGhhbmRsZXIuX3BvaW50KTtcbiAgICAgIGRlbGV0ZSBoYW5kbGVyLl9pbml0aWFsUG9pbnQ7XG4gICAgICBoYW5kbGVyLnJlZHJhdygpO1xuICAgIH1cblxuICAgIHRoaXMuX21hdHJpeCA9IEwubWF0cml4KDEsIDAsIDAsIDEsIDAsIDApO1xuICAgIHRoaXMuX3NjYWxlICA9IEwucG9pbnQoMSwgMSk7XG4gICAgdGhpcy5fYW5nbGUgID0gMDtcblxuICAgIHRoaXMuX3VwZGF0ZUhhbmRsZXJzKCk7XG5cbiAgICBtYXAuZHJhZ2dpbmcuZW5hYmxlKCk7XG4gICAgdGhpcy5fcGF0aC5maXJlKCd0cmFuc2Zvcm1lZCcsIHtcbiAgICAgIG1hdHJpeDogbWF0cml4LFxuICAgICAgc2NhbGU6IHNjYWxlLFxuICAgICAgcm90YXRpb246IGFuZ2xlLFxuICAgICAgLy8gYW5nbGU6IGFuZ2xlICogKDE4MCAvIE1hdGguUEkpLFxuICAgICAgbGF5ZXI6IHRoaXMuX3BhdGhcbiAgICB9KTtcbiAgICAvLyBjb25zb2xlLmdyb3VwRW5kKCdhcHBseSB0cmFuc2Zvcm0nKTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBSZWNhbGN1bGF0ZSByb3RhdGlvbiBoYW5kbGVycyBwb3NpdGlvblxuICAgKi9cbiAgX3VwZGF0ZUhhbmRsZXJzOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgaGFuZGxlcnNHcm91cCA9IHRoaXMuX2hhbmRsZXJzR3JvdXA7XG5cbiAgICB0aGlzLl9yZWN0U2hhcGUgPSB0aGlzLl9yZWN0LnRvR2VvSlNPTigpO1xuXG4gICAgaGFuZGxlcnNHcm91cC5yZW1vdmVMYXllcih0aGlzLl9oYW5kbGVMaW5lKTtcbiAgICBoYW5kbGVyc0dyb3VwLnJlbW92ZUxheWVyKHRoaXMuX3JvdGF0aW9uTWFya2VyKTtcblxuICAgIHRoaXMuX2hhbmRsZUxpbmUgPSB0aGlzLl9yb3RhdGlvbk1hcmtlciA9IG51bGw7XG5cbiAgICBmb3IgKHZhciBpID0gdGhpcy5faGFuZGxlcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGhhbmRsZXJzR3JvdXAucmVtb3ZlTGF5ZXIodGhpcy5faGFuZGxlcnNbaV0pO1xuICAgIH1cblxuICAgIHRoaXMuX2NyZWF0ZUhhbmRsZXJzKCk7XG4gIH0sXG5cblxuICAvKipcbiAgICogVHJhbnNmb3JtIGdlb21ldHJpZXMgc2VwYXJhdGVseVxuICAgKi9cbiAgX3RyYW5zZm9ybUdlb21ldHJpZXM6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvcmlnaW4gPSB0aGlzLl9vcmlnaW47XG4gICAgdGhpcy5fcGF0aC5fdHJhbnNmb3JtKG51bGwpO1xuICAgIHRoaXMuX3JlY3QuX3RyYW5zZm9ybShudWxsKTtcblxuICAgIHRoaXMuX3RyYW5zZm9ybVBvaW50cyh0aGlzLl9wYXRoLCB0aGlzLl9tYXRyaXgsIG9yaWdpbik7XG4gICAgdGhpcy5fdHJhbnNmb3JtUG9pbnRzKHRoaXMuX3JlY3QsIHRoaXMuX21hdHJpeCwgb3JpZ2luKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMucm90YXRpb24pIHtcbiAgICAgIHRoaXMuX2hhbmRsZUxpbmUuX3RyYW5zZm9ybShudWxsKTtcbiAgICAgIHRoaXMuX3RyYW5zZm9ybVBvaW50cyh0aGlzLl9oYW5kbGVMaW5lLCB0aGlzLl9tYXRyaXgsIG9yaWdpbik7XG4gICAgfVxuICB9LFxuXG5cbiAgLyoqXG4gICAqIEBpbmhlcml0RG9jXG4gICAqL1xuICBfZ2V0UHJvamVjdGVkTWF0cml4OiBmdW5jdGlvbihtYXRyaXgsIG9yaWdpblBvaW50KSB7XG4gICAgdmFyIG1hcCAgICA9IHRoaXMuX21hcDtcbiAgICB2YXIgem9vbSAgID0gbWFwLmdldE1heFpvb20oKTtcbiAgICB2YXIgbWF0cml4ID0gTC5tYXRyaXgoMSwgMCwgMCwgMSwgMCwgMCk7XG4gICAgdmFyIG9yaWdpbjtcblxuICAgIGlmICh0aGlzLl9hbmdsZSkge1xuICAgICAgb3JpZ2luID0gbWFwLnByb2plY3QodGhpcy5fcm90YXRpb25PcmlnaW4sIHpvb20pO1xuICAgICAgbWF0cml4ID0gbWF0cml4LnJvdGF0ZSh0aGlzLl9hbmdsZSwgb3JpZ2luKS5mbGlwKCk7XG4gICAgfVxuXG4gICAgaWYgKCEodGhpcy5fc2NhbGUueCA9PT0gMSAmJiB0aGlzLl9zY2FsZS55ID09PSAxKSkge1xuICAgICAgb3JpZ2luID0gbWFwLnByb2plY3QodGhpcy5fc2NhbGVPcmlnaW4sIHpvb20pO1xuICAgICAgbWF0cml4ID0gbWF0cml4XG4gICAgICAgIC5fYWRkKEwubWF0cml4KDEsIDAsIDAsIDEsIG9yaWdpbi54LCBvcmlnaW4ueSkpXG4gICAgICAgIC5fYWRkKEwubWF0cml4KHRoaXMuX3NjYWxlLngsIDAsIDAsIHRoaXMuX3NjYWxlLnksIDAsIDApKVxuICAgICAgICAuX2FkZChMLm1hdHJpeCgxLCAwLCAwLCAxLCAtb3JpZ2luLngsIC1vcmlnaW4ueSkpO1xuICAgIH1cblxuICAgIHJldHVybiBtYXRyaXg7XG4gIH0sXG5cblxuICAvKipcbiAgICogQHBhcmFtICB7TC5MYXRMbmd9IGxhdGxuZ1xuICAgKiBAcGFyYW0gIHtMLk1hdHJpeH0gbWF0cml4XG4gICAqIEBwYXJhbSAge0wuTWFwfSAgICBtYXBcbiAgICogQHBhcmFtICB7TnVtYmVyfSAgIHpvb21cbiAgICogQHJldHVybiB7TC5MYXRMbmd9XG4gICAqL1xuICBfdHJhbnNmb3JtUG9pbnQ6IGZ1bmN0aW9uKGxhdGxuZywgbWF0cml4LCBtYXAsIHpvb20pIHtcbiAgICByZXR1cm4gbWFwLnVucHJvamVjdChtYXRyaXgudHJhbnNmb3JtKFxuICAgICAgbWFwLnByb2plY3QobGF0bG5nLCB6b29tKSksIHpvb20pO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgdHJhbnNmb3JtYXRpb24sIGRvZXMgaXQgaW4gb25lIHN3ZWVwIGZvciBwZXJmb3JtYW5jZSxcbiAgICogc28gZG9uJ3QgYmUgc3VycHJpc2VkIGFib3V0IHRoZSBjb2RlIHJlcGV0aXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7TC5QYXRofSAgIHBhdGhcbiAgICogQHBhcmFtIHtMLk1hdHJpeH0gbWF0cml4XG4gICAqL1xuICBfdHJhbnNmb3JtUG9pbnRzOiBmdW5jdGlvbihwYXRoLCBtYXRyaXgsIG9yaWdpbikge1xuICAgIHZhciBtYXAgPSBwYXRoLl9tYXA7XG4gICAgdmFyIHpvb20gPSBtYXAuZ2V0TWF4Wm9vbSgpO1xuICAgIHZhciBpLCBsZW47XG5cbiAgICB2YXIgcHJvamVjdGVkTWF0cml4ID0gdGhpcy5fcHJvamVjdGVkTWF0cml4ID0gdGhpcy5fZ2V0UHJvamVjdGVkTWF0cml4KCk7XG4gICAgLy8gY29uc29sZS50aW1lKCd0cmFuc2Zvcm0nKTtcblxuICAgIC8vIGFsbCBzaGlmdHMgYXJlIGluLXBsYWNlXG4gICAgaWYgKHBhdGguX3BvaW50KSB7IC8vIEwuQ2lyY2xlXG4gICAgICBwYXRoLl9sYXRsbmcgPSB0aGlzLl90cmFuc2Zvcm1Qb2ludChcbiAgICAgICAgcGF0aC5fbGF0bG5nLCBwcm9qZWN0ZWRNYXRyaXgsIG1hcCwgem9vbSk7XG4gICAgfSBlbHNlIGlmIChwYXRoLl9yaW5ncyB8fCBwYXRoLl9wYXJ0cykgeyAvLyBldmVyeXRoaW5nIGVsc2VcbiAgICAgIHZhciByaW5ncyA9IHBhdGguX3JpbmdzO1xuICAgICAgdmFyIGxhdGxuZ3MgPSBwYXRoLl9sYXRsbmdzO1xuICAgICAgcGF0aC5fYm91bmRzID0gbmV3IEwuTGF0TG5nQm91bmRzKCk7XG5cbiAgICAgIGlmICghTC5VdGlsLmlzQXJyYXkobGF0bG5nc1swXSkpIHsgLy8gcG9seWxpbmVcbiAgICAgICAgbGF0bG5ncyA9IFtsYXRsbmdzXTtcbiAgICAgIH1cbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHJpbmdzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwLCBqaiA9IHJpbmdzW2ldLmxlbmd0aDsgaiA8IGpqOyBqKyspIHtcbiAgICAgICAgICBsYXRsbmdzW2ldW2pdID0gdGhpcy5fdHJhbnNmb3JtUG9pbnQoXG4gICAgICAgICAgICBsYXRsbmdzW2ldW2pdLCBwcm9qZWN0ZWRNYXRyaXgsIG1hcCwgem9vbSk7XG4gICAgICAgICAgcGF0aC5fYm91bmRzLmV4dGVuZChsYXRsbmdzW2ldW2pdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHBhdGguX3Jlc2V0KCk7XG4gICAgLy9jb25zb2xlLnRpbWVFbmQoJ3RyYW5zZm9ybScpO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgbWFya2VycyBhbmQgaGFuZGxlc1xuICAgKi9cbiAgX2NyZWF0ZUhhbmRsZXJzOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbWFwID0gdGhpcy5fbWFwO1xuICAgIHRoaXMuX2hhbmRsZXJzR3JvdXAgPSB0aGlzLl9oYW5kbGVyc0dyb3VwIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBMLkxheWVyR3JvdXAoKS5hZGRUbyhtYXApO1xuICAgIHRoaXMuX3JlY3QgPSB0aGlzLl9yZWN0IHx8XG4gICAgICAgICAgICAgICAgICAgdGhpcy5fZ2V0Qm91bmRpbmdQb2x5Z29uKCkuYWRkVG8odGhpcy5faGFuZGxlcnNHcm91cCk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnNjYWxpbmcpIHtcbiAgICAgIHRoaXMuX2hhbmRsZXJzID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMub3B0aW9ucy5lZGdlc0NvdW50OyBpKyspIHtcbiAgICAgICAgLy8gVE9ETzogYWRkIHN0cmV0Y2hpbmdcbiAgICAgICAgdGhpcy5faGFuZGxlcnMucHVzaChcbiAgICAgICAgICB0aGlzLl9jcmVhdGVIYW5kbGVyKHRoaXMuX3JlY3QuX2xhdGxuZ3NbMF1baV0sIGkgKiAyLCBpKVxuICAgICAgICAgIC5hZGRUbyh0aGlzLl9oYW5kbGVyc0dyb3VwKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gYWRkIGJvdW5kc1xuICAgIGlmICh0aGlzLm9wdGlvbnMucm90YXRpb24pIHtcbiAgICAgIC8vYWRkIHJvdGF0aW9uIGhhbmRsZXJcbiAgICAgIHRoaXMuX2NyZWF0ZVJvdGF0aW9uSGFuZGxlcnMoKTtcbiAgICB9XG4gIH0sXG5cblxuICAvKipcbiAgICogUm90YXRpb24gbWFya2VyIGFuZCBzbWFsbCBjb25uZWN0aW4gaGFuZGxlXG4gICAqL1xuICBfY3JlYXRlUm90YXRpb25IYW5kbGVyczogZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1hcCAgICAgPSB0aGlzLl9tYXA7XG4gICAgdmFyIGxhdGxuZ3MgPSB0aGlzLl9yZWN0Ll9sYXRsbmdzWzBdO1xuXG4gICAgdmFyIGJvdHRvbSAgID0gbmV3IEwuTGF0TG5nKFxuICAgICAgKGxhdGxuZ3NbMF0ubGF0ICsgbGF0bG5nc1szXS5sYXQpIC8gMixcbiAgICAgIChsYXRsbmdzWzBdLmxuZyArIGxhdGxuZ3NbM10ubG5nKSAvIDIpO1xuICAgIC8vIGhlaGUsIHRvcCBpcyBhIHJlc2VydmVkIHdvcmRcbiAgICB2YXIgdG9wUG9pbnQgPSBuZXcgTC5MYXRMbmcoXG4gICAgICAobGF0bG5nc1sxXS5sYXQgKyBsYXRsbmdzWzJdLmxhdCkgLyAyLFxuICAgICAgKGxhdGxuZ3NbMV0ubG5nICsgbGF0bG5nc1syXS5sbmcpIC8gMik7XG5cbiAgICB2YXIgaGFuZGxlclBvc2l0aW9uID0gbWFwLmxheWVyUG9pbnRUb0xhdExuZyhcbiAgICAgIEwuTGluZVV0aWwucG9pbnRPbkxpbmUoXG4gICAgICAgIG1hcC5sYXRMbmdUb0xheWVyUG9pbnQoYm90dG9tKSxcbiAgICAgICAgbWFwLmxhdExuZ1RvTGF5ZXJQb2ludCh0b3BQb2ludCksXG4gICAgICAgIHRoaXMub3B0aW9ucy5oYW5kbGVMZW5ndGgpXG4gICAgKTtcblxuICAgIHRoaXMuX2hhbmRsZUxpbmUgPSBuZXcgTC5Qb2x5bGluZShbdG9wUG9pbnQsIGhhbmRsZXJQb3NpdGlvbl0sXG4gICAgICB0aGlzLm9wdGlvbnMucm90YXRlSGFuZGxlT3B0aW9ucykuYWRkVG8odGhpcy5faGFuZGxlcnNHcm91cCk7XG4gICAgdGhpcy5fcm90YXRpb25NYXJrZXIgPSBuZXcgTC5DaXJjbGVNYXJrZXIoaGFuZGxlclBvc2l0aW9uLFxuICAgICAgdGhpcy5vcHRpb25zLmhhbmRsZXJPcHRpb25zKVxuICAgICAgLmFkZFRvKHRoaXMuX2hhbmRsZXJzR3JvdXApXG4gICAgICAub24oJ21vdXNlZG93bicsIHRoaXMuX29uUm90YXRlU3RhcnQsIHRoaXMpO1xuXG4gICAgdGhpcy5fcm90YXRpb25PcmlnaW4gPSBuZXcgTC5MYXRMbmcoXG4gICAgICAodG9wUG9pbnQubGF0ICsgYm90dG9tLmxhdCkgLyAyLFxuICAgICAgKHRvcFBvaW50LmxuZyArIGJvdHRvbS5sbmcpIC8gMlxuICAgICk7XG5cbiAgICB0aGlzLl9oYW5kbGVycy5wdXNoKHRoaXMuX3JvdGF0aW9uTWFya2VyKTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtMLkxhdExuZ31cbiAgICovXG4gIF9nZXRSb3RhdGlvbk9yaWdpbjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxhdGxuZ3MgPSB0aGlzLl9yZWN0Ll9sYXRsbmdzWzBdO1xuICAgIHZhciBsYiA9IGxhdGxuZ3NbMF07XG4gICAgdmFyIHJ0ID0gbGF0bG5nc1syXTtcblxuICAgIHJldHVybiBuZXcgTC5MYXRMbmcoXG4gICAgICAobGIubGF0ICsgcnQubGF0KSAvIDIsXG4gICAgICAobGIubG5nICsgcnQubG5nKSAvIDJcbiAgICApO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIFNlY3VyZSB0aGUgcm90YXRpb24gb3JpZ2luXG4gICAqIEBwYXJhbSAge0V2ZW50fSBldnRcbiAgICovXG4gIF9vblJvdGF0ZVN0YXJ0OiBmdW5jdGlvbihldnQpIHtcbiAgICB2YXIgbWFwID0gdGhpcy5fbWFwO1xuXG4gICAgbWFwLmRyYWdnaW5nLmRpc2FibGUoKTtcblxuICAgIHRoaXMuX29yaWdpbk1hcmtlciAgICAgPSBudWxsO1xuICAgIHRoaXMuX3JvdGF0aW9uT3JpZ2luUHQgPSBtYXAubGF0TG5nVG9MYXllclBvaW50KHRoaXMuX2dldFJvdGF0aW9uT3JpZ2luKCkpO1xuICAgIHRoaXMuX3JvdGF0aW9uU3RhcnQgICAgPSBldnQubGF5ZXJQb2ludDtcbiAgICB0aGlzLl9pbml0aWFsTWF0cml4ICAgID0gdGhpcy5fbWF0cml4LmNsb25lKCk7XG5cbiAgICB0aGlzLl9hbmdsZSA9IDA7XG4gICAgdGhpcy5fcGF0aC5fbWFwXG4gICAgICAub24oJ21vdXNlbW92ZScsIHRoaXMuX29uUm90YXRlLCAgICAgdGhpcylcbiAgICAgIC5vbignbW91c2V1cCcsICAgdGhpcy5fb25Sb3RhdGVFbmQsIHRoaXMpO1xuXG4gICAgdGhpcy5fY2FjaGVQb2ludHMoKTtcbiAgICB0aGlzLl9wYXRoXG4gICAgICAuZmlyZSgndHJhbnNmb3Jtc3RhcnQnLCAgIHsgbGF5ZXI6IHRoaXMuX3BhdGggfSlcbiAgICAgIC5maXJlKCdyb3RhdGVzdGFydCcsIHsgbGF5ZXI6IHRoaXMuX3BhdGgsIHJvdGF0aW9uOiAwIH0pO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIEBwYXJhbSAge0V2ZW50fSBldnRcbiAgICovXG4gIF9vblJvdGF0ZTogZnVuY3Rpb24oZXZ0KSB7XG4gICAgdmFyIHBvcyA9IGV2dC5sYXllclBvaW50O1xuICAgIHZhciBwcmV2aW91cyA9IHRoaXMuX3JvdGF0aW9uU3RhcnQ7XG4gICAgdmFyIG9yaWdpbiAgID0gdGhpcy5fcm90YXRpb25PcmlnaW5QdDtcblxuICAgIC8vIHJvdGF0aW9uIHN0ZXAgYW5nbGVcbiAgICB0aGlzLl9hbmdsZSA9IE1hdGguYXRhbjIocG9zLnkgLSBvcmlnaW4ueSwgcG9zLnggLSBvcmlnaW4ueCkgLVxuICAgICAgICAgICAgICAgICAgTWF0aC5hdGFuMihwcmV2aW91cy55IC0gb3JpZ2luLnksIHByZXZpb3VzLnggLSBvcmlnaW4ueCk7XG5cbiAgICB0aGlzLl9tYXRyaXggPSB0aGlzLl9pbml0aWFsTWF0cml4XG4gICAgICAuY2xvbmUoKVxuICAgICAgLnJvdGF0ZSh0aGlzLl9hbmdsZSwgb3JpZ2luKVxuICAgICAgLmZsaXAoKTtcblxuICAgIHRoaXMuX3VwZGF0ZSgpO1xuICAgIHRoaXMuX3BhdGguZmlyZSgncm90YXRlJywgeyBsYXllcjogdGhpcy5fcGF0aCwgcm90YXRpb246IHRoaXMuX2FuZ2xlIH0pO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIEBwYXJhbSAge0V2ZW50fSBldnRcbiAgICovXG4gIF9vblJvdGF0ZUVuZDogZnVuY3Rpb24oZXZ0KSB7XG4gICAgdGhpcy5fcGF0aC5fbWFwXG4gICAgICAub2ZmKCdtb3VzZW1vdmUnLCB0aGlzLl9vblJvdGF0ZSwgdGhpcylcbiAgICAgIC5vZmYoJ21vdXNldXAnLCAgIHRoaXMuX29uUm90YXRlRW5kLCB0aGlzKTtcblxuICAgIHRoaXMuX2FwcGx5KCk7XG4gICAgdGhpcy5fcGF0aC5maXJlKCdyb3RhdGVlbmQnLCB7IGxheWVyOiB0aGlzLl9wYXRoLCByb3RhdGlvbjogdGhpcy5fYW5nbGUgfSk7XG4gIH0sXG5cblxuICAvKipcbiAgICogQHBhcmFtICB7RXZlbnR9IGV2dFxuICAgKi9cbiAgX29uU2NhbGVTdGFydDogZnVuY3Rpb24oZXZ0KSB7XG4gICAgdmFyIG1hcmtlciA9IGV2dC50YXJnZXQ7XG4gICAgdmFyIG1hcCA9IHRoaXMuX21hcDtcblxuICAgIG1hcC5kcmFnZ2luZy5kaXNhYmxlKCk7XG5cbiAgICB0aGlzLl9hY3RpdmVNYXJrZXIgPSBtYXJrZXI7XG5cbiAgICB0aGlzLl9vcmlnaW5NYXJrZXIgPSB0aGlzLl9oYW5kbGVyc1sobWFya2VyLm9wdGlvbnMuaW5kZXggKyAyKSAlIDRdO1xuICAgIHRoaXMuX3NjYWxlT3JpZ2luICA9IHRoaXMuX29yaWdpbk1hcmtlci5nZXRMYXRMbmcoKTtcblxuICAgIHRoaXMuX2luaXRpYWxNYXRyaXggPSB0aGlzLl9tYXRyaXguY2xvbmUoKTtcbiAgICB0aGlzLl9jYWNoZVBvaW50cygpO1xuXG4gICAgdGhpcy5fbWFwXG4gICAgICAub24oJ21vdXNlbW92ZScsIHRoaXMuX29uU2NhbGUsICAgIHRoaXMpXG4gICAgICAub24oJ21vdXNldXAnLCAgIHRoaXMuX29uU2NhbGVFbmQsIHRoaXMpO1xuICAgIHRoaXMuX2luaXRpYWxEaXN0ID0gdGhpcy5fb3JpZ2luTWFya2VyLl9wb2ludFxuICAgICAgLmRpc3RhbmNlVG8odGhpcy5fYWN0aXZlTWFya2VyLl9wb2ludCk7XG5cbiAgICB0aGlzLl9wYXRoXG4gICAgICAuZmlyZSgndHJhbnNmb3Jtc3RhcnQnLCB7IGxheWVyOiB0aGlzLl9wYXRoIH0pXG4gICAgICAuZmlyZSgnc2NhbGVzdGFydCcsIHsgbGF5ZXI6IHRoaXMuX3BhdGgsIHNjYWxlOiBMLnBvaW50KDEsIDEpIH0pO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIEBwYXJhbSAge0V2ZW50fSBldnRcbiAgICovXG4gIF9vblNjYWxlOiBmdW5jdGlvbihldnQpIHtcbiAgICB2YXIgb3JpZ2luUG9pbnQgPSB0aGlzLl9vcmlnaW5NYXJrZXIuX3BvaW50O1xuICAgIHZhciByYXRpbyA9IG9yaWdpblBvaW50LmRpc3RhbmNlVG8oZXZ0LmxheWVyUG9pbnQpIC8gdGhpcy5faW5pdGlhbERpc3Q7XG5cbiAgICB0aGlzLl9zY2FsZSA9IG5ldyBMLlBvaW50KHJhdGlvLCByYXRpbyk7XG5cbiAgICAvLyB1cGRhdGUgbWF0cml4XG4gICAgdGhpcy5fbWF0cml4ID0gdGhpcy5faW5pdGlhbE1hdHJpeFxuICAgICAgLmNsb25lKClcbiAgICAgIC5zY2FsZShyYXRpbywgb3JpZ2luUG9pbnQpO1xuXG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgdGhpcy5fcGF0aC5maXJlKCdzY2FsZScsIHtcbiAgICAgIGxheWVyOiB0aGlzLl9wYXRoLCBzY2FsZTogdGhpcy5fc2NhbGUuY2xvbmUoKSB9KTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBTY2FsaW5nIGNvbXBsZXRlXG4gICAqIEBwYXJhbSAge0V2ZW50fSBldnRcbiAgICovXG4gIF9vblNjYWxlRW5kOiBmdW5jdGlvbihldnQpIHtcbiAgICB0aGlzLl9tYXBcbiAgICAgIC5vZmYoJ21vdXNlbW92ZScsIHRoaXMuX29uU2NhbGUsICAgIHRoaXMpXG4gICAgICAub2ZmKCdtb3VzZXVwJywgICB0aGlzLl9vblNjYWxlRW5kLCB0aGlzKTtcblxuICAgIHRoaXMuX2FwcGx5KCk7XG4gICAgdGhpcy5fcGF0aC5maXJlKCdzY2FsZWVuZCcsIHtcbiAgICAgIGxheWVyOiB0aGlzLl9wYXRoLCBzY2FsZTogdGhpcy5fc2NhbGUuY2xvbmUoKSB9KTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBDYWNoZSBjdXJyZW50IGhhbmRsZXJzIHBvc2l0aW9uc1xuICAgKi9cbiAgX2NhY2hlUG9pbnRzOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9oYW5kbGVyc0dyb3VwLmVhY2hMYXllcihmdW5jdGlvbihsYXllcikge1xuICAgICAgbGF5ZXIuYnJpbmdUb0Zyb250KCk7XG4gICAgfSk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMuX2hhbmRsZXJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB2YXIgaGFuZGxlciA9IHRoaXMuX2hhbmRsZXJzW2ldO1xuICAgICAgaGFuZGxlci5faW5pdGlhbFBvaW50ID0gaGFuZGxlci5fcG9pbnQuY2xvbmUoKTtcbiAgICB9XG4gIH0sXG5cblxuICAvKipcbiAgICogQm91bmRpbmcgcG9seWdvblxuICAgKiBAcmV0dXJuIHtMLlBvbHlnb259XG4gICAqL1xuICBfZ2V0Qm91bmRpbmdQb2x5Z29uOiBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5fcmVjdFNoYXBlKSB7XG4gICAgICByZXR1cm4gTC5HZW9KU09OLmdlb21ldHJ5VG9MYXllcihcbiAgICAgICAgdGhpcy5fcmVjdFNoYXBlLCBudWxsLCBudWxsLCB0aGlzLm9wdGlvbnMuYm91bmRzT3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgTC5SZWN0YW5nbGUoXG4gICAgICAgIHRoaXMuX3BhdGguZ2V0Qm91bmRzKCksIHRoaXMub3B0aW9ucy5ib3VuZHNPcHRpb25zKTtcbiAgICB9XG4gIH0sXG5cblxuICAvKipcbiAgICogQ3JlYXRlIGNvcm5lciBtYXJrZXJcbiAgICogQHBhcmFtICB7TC5MYXRMbmd9IGxhdGxuZ1xuICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICAgdHlwZSBvbmUgb2YgTC5IYW5kbGVyLlBhdGhTY2FsZS5IYW5kbGVyVHlwZXNcbiAgICogQHBhcmFtICB7TnVtYmVyfSAgIGluZGV4XG4gICAqIEByZXR1cm4ge0wuQ2lyY2xlTWFya2VyfVxuICAgKi9cbiAgX2NyZWF0ZUhhbmRsZXI6IGZ1bmN0aW9uKGxhdGxuZywgdHlwZSwgaW5kZXgpIHtcbiAgICB2YXIgbWFya2VyID0gbmV3IEwuQ2lyY2xlTWFya2VyKGxhdGxuZyxcbiAgICAgIEwuVXRpbC5leHRlbmQodGhpcy5vcHRpb25zLmhhbmRsZXJPcHRpb25zLCB7XG4gICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgIGluZGV4OiBpbmRleFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgbWFya2VyLm9uKCdtb3VzZWRvd24nLCB0aGlzLl9vblNjYWxlU3RhcnQsIHRoaXMpO1xuICAgIHJldHVybiBtYXJrZXI7XG4gIH0sXG5cblxuICAvKipcbiAgICogSGlkZShub3QgcmVtb3ZlKSB0aGUgaGFuZGxlcnMgbGF5ZXJcbiAgICovXG4gIF9oaWRlSGFuZGxlcnM6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX21hcC5yZW1vdmVMYXllcih0aGlzLl9oYW5kbGVyc0dyb3VwKTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBIaWRlIGhhbmRsZXJzIGFuZCByZWN0YW5nbGVcbiAgICovXG4gIF9vbkRyYWdTdGFydDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5faGlkZUhhbmRsZXJzKCk7XG4gIH0sXG5cblxuICAvKipcbiAgICogRHJhZyByZWN0YW5nbGUsIHJlLWNyZWF0ZSBoYW5kbGVyc1xuICAgKi9cbiAgX29uRHJhZ0VuZDogZnVuY3Rpb24oZXZ0KSB7XG4gICAgdmFyIHJlY3QgPSB0aGlzLl9yZWN0O1xuICAgIHZhciBtYXRyaXggPSAoZXZ0LmxheWVyID8gZXZ0LmxheWVyIDogdGhpcy5fcGF0aCkuZHJhZ2dpbmcuX21hdHJpeC5zbGljZSgpO1xuXG4gICAgaWYgKCFyZWN0LmRyYWdnaW5nKSB7XG4gICAgICByZWN0LmRyYWdnaW5nID0gbmV3IEwuSGFuZGxlci5QYXRoRHJhZyhyZWN0KTtcbiAgICB9XG4gICAgcmVjdC5kcmFnZ2luZy5lbmFibGUoKTtcbiAgICB0aGlzLl9tYXAuYWRkTGF5ZXIocmVjdCk7XG4gICAgcmVjdC5kcmFnZ2luZy5fdHJhbnNmb3JtUG9pbnRzKG1hdHJpeCk7XG4gICAgcmVjdC5fdXBkYXRlUGF0aCgpO1xuICAgIHJlY3QuX3Byb2plY3QoKTtcbiAgICByZWN0LmRyYWdnaW5nLmRpc2FibGUoKTtcblxuICAgIHRoaXMuX21hcC5hZGRMYXllcih0aGlzLl9oYW5kbGVyc0dyb3VwKTtcbiAgICB0aGlzLl91cGRhdGVIYW5kbGVycygpO1xuXG4gICAgdGhpcy5fcGF0aC5maXJlKCd0cmFuc2Zvcm1lZCcsIHtcbiAgICAgIHNjYWxlOiBMLnBvaW50KDEsIDEpLFxuICAgICAgcm90YXRpb246IDAsXG4gICAgICBtYXRyaXg6IEwubWF0cml4LmFwcGx5KHVuZGVmaW5lZCwgbWF0cml4KSxcbiAgICAgIHRyYW5zbGF0ZTogTC5wb2ludChtYXRyaXhbNF0sIG1hdHJpeFs1XSksXG4gICAgICBsYXllcjogdGhpcy5fcGF0aFxuICAgIH0pO1xuICB9XG59KTtcblxuTC5QYXRoLmFkZEluaXRIb29rKGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5vcHRpb25zLnRyYW5zZm9ybSkge1xuICAgIHRoaXMudHJhbnNmb3JtID0gbmV3IEwuSGFuZGxlci5QYXRoVHJhbnNmb3JtKHRoaXMsIHRoaXMub3B0aW9ucy50cmFuc2Zvcm0pO1xuICB9XG59KTtcbiIsIi8qKlxuICogUG9pbnQgb24gdGhlIGxpbmUgc2VnbWVudCBvciBpdHMgZXh0ZW50aW9uXG4gKlxuICogQHBhcmFtICB7TC5Qb2ludH0gc3RhcnRcbiAqIEBwYXJhbSAge0wuUG9pbnR9IGZpbmFsXG4gKiBAcGFyYW0gIHtOdW1iZXJ9ICBkaXN0UHhcbiAqIEByZXR1cm4ge0wuUG9pbnR9XG4gKi9cbkwuTGluZVV0aWwucG9pbnRPbkxpbmUgPSBmdW5jdGlvbihzdGFydCwgZmluYWwsIGRpc3RQeCkge1xuICB2YXIgcmF0aW8gPSAxICsgZGlzdFB4IC8gc3RhcnQuZGlzdGFuY2VUbyhmaW5hbCk7XG4gIHJldHVybiBuZXcgTC5Qb2ludChcbiAgICBzdGFydC54ICsgKGZpbmFsLnggLSBzdGFydC54KSAqIHJhdGlvLFxuICAgIHN0YXJ0LnkgKyAoZmluYWwueSAtIHN0YXJ0LnkpICogcmF0aW9cbiAgKTtcbn07XG5cblxuLyoqXG4gKiBEZWVwIG1lcmdlIG9iamVjdHMuXG4gKi9cbkwuVXRpbC5tZXJnZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaSA9IDE7XG4gIHZhciBrZXksIHZhbDtcbiAgdmFyIG9iaiA9IGFyZ3VtZW50c1tpXTtcblxuICBmdW5jdGlvbiBpc09iamVjdChvYmplY3QpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xuICB9XG5cbiAgLy8gbWFrZSBzdXJlIHdlIGRvbid0IG1vZGlmeSBzb3VyY2UgZWxlbWVudCBhbmQgaXQncyBwcm9wZXJ0aWVzXG4gIC8vIG9iamVjdHMgYXJlIHBhc3NlZCBieSByZWZlcmVuY2VcbiAgdmFyIHRhcmdldCA9IGFyZ3VtZW50c1swXTtcblxuICB3aGlsZSAob2JqKSB7XG4gICAgb2JqID0gYXJndW1lbnRzW2krK107XG4gICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICB2YWwgPSBvYmpba2V5XTtcblxuICAgICAgaWYgKGlzT2JqZWN0KHZhbCkgJiYgaXNPYmplY3QodGFyZ2V0W2tleV0pKXtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBMLlV0aWwubWVyZ2UodGFyZ2V0W2tleV0sIHZhbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhcmdldDtcbn07XG4iXX0=
