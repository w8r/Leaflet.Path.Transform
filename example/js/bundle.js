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
        console.log(111);
        return this.dragging._transformPoints(this.dragging._matrix, {});
      }, this._path);
    } else if (this._path.getLatLngs) {
      this._path.getLatLngs_ = this._path.getLatLngs;
      this._path.getLatLngs = L.Util.bind(function() {
        console.log(222);
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

      if (!L.Util.isArray(latlngs[0])) { // polyline
        latlngs = [latlngs];
      }
      for (i = 0, len = rings.length; i < len; i++) {
        for (var j = 0, jj = rings[i].length; j < jj; j++) {
          latlngs[i][j] = this._transformPoint(
            latlngs[i][j], projectedMatrix, map, zoom);
          //path._bounds.extend(latlngs[i][j]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL2pzL2FwcC5qcyIsImluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xlYWZsZXQtcGF0aC1kcmFnL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xlYWZsZXQtcGF0aC1kcmFnL3NyYy9DYW52YXMuanMiLCJub2RlX21vZHVsZXMvbGVhZmxldC1wYXRoLWRyYWcvc3JjL1BhdGguRHJhZy5qcyIsIm5vZGVfbW9kdWxlcy9sZWFmbGV0LXBhdGgtZHJhZy9zcmMvUGF0aC5UcmFuc2Zvcm0uanMiLCJub2RlX21vZHVsZXMvbGVhZmxldC1wYXRoLWRyYWcvc3JjL1NWRy5WTUwuanMiLCJub2RlX21vZHVsZXMvbGVhZmxldC1wYXRoLWRyYWcvc3JjL1NWRy5qcyIsIm5vZGVfbW9kdWxlcy9sZWFmbGV0L2Rpc3QvbGVhZmxldC1zcmMuanMiLCJzcmMvTWF0cml4LmpzIiwic3JjL1BhdGguVHJhbnNmb3JtLmpzIiwic3JjL1V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3JQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6NVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIEwgPSByZXF1aXJlKCdsZWFmbGV0Jyk7XG52YXIgRHJhZ0hhbmRsZXIgPSByZXF1aXJlKCcuLi8uLi9pbmRleCcpO1xuXG5MLkljb24uRGVmYXVsdC5pbWFnZVBhdGggPSBcImh0dHA6Ly9jZG4ubGVhZmxldGpzLmNvbS9sZWFmbGV0LTAuNy9pbWFnZXNcIjtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnZhciBtYXAgPSBnbG9iYWwubWFwID0gbmV3IEwuTWFwKCdtYXAnLCB7XG4gIC8vIGNyczogTC5DUlMuRVBTRzQzMjYgLy8gdGhhdCB3YXMgdGVzdGVkIGFzIHdlbGxcbn0pLnNldFZpZXcoWzIyLjQyNjU4LCAxMTQuMTk1Ml0sIDExKTtcblxuTC50aWxlTGF5ZXIoJ2h0dHA6Ly97c30udGlsZS5vc20ub3JnL3t6fS97eH0ve3l9LnBuZycsIHtcbiAgYXR0cmlidXRpb246ICcmY29weTsgJyArXG4gICAgJzxhIGhyZWY9XCJodHRwOi8vb3NtLm9yZy9jb3B5cmlnaHRcIj5PU008L2E+IGNvbnRyaWJ1dG9ycydcbn0pLmFkZFRvKG1hcCk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5mdW5jdGlvbiBpbnRlcnBvbGF0ZUFycihhcnJheSwgaW5zZXJ0KSB7XG4gIHZhciByZXMgPSBbXTtcbiAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbihwLCBpLCBhcnIpIHtcbiAgICByZXMucHVzaChwLmNvbmNhdCgpKTtcblxuICAgIGlmIChpIDwgYXJyLmxlbmd0aCAtIDEpIHtcbiAgICAgIHZhciBkaWZmID0gW2FycltpICsgMV1bMF0gLSBwWzBdLCBhcnJbaSArIDFdWzFdIC0gcFsxXV07XG4gICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGluc2VydDsgaSsrKSB7XG4gICAgICAgIHJlcy5wdXNoKFtwWzBdICsgKGRpZmZbMF0gKiBpKSAvIGluc2VydCwgcFsxXSArIChkaWZmWzFdICogaSkgLyBpbnNlcnRdKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiByZXM7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgcG9seWdvbiA9IGdsb2JhbC5wb2x5Z29uID0gbmV3IEwuUG9seWdvbihcbiAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhcblxuICAgIC8vIH4gMTMgMDAwIHBvaW50c1xuICAgIGludGVycG9sYXRlQXJyKFtcbiAgICAgIFsxMTMuOTc2OTc0NDg3MzA0NjksIDIyLjQwMzQxMDg5MjcxMjEyNF0sXG4gICAgICBbMTEzLjk4NjU4NzUyNDQxNDA1LCAyMi4zODM3MzAwODU5MjQ5NV0sXG4gICAgICBbMTE0LjAxMjY4MDA1MzcxMDk0LCAyMi4zNjkxMjYzOTc1NDU4ODddLFxuICAgICAgWzExNC4wMjc3ODYyNTQ4ODI4MSwgMjIuMzg1NjM0ODAxODU3MThdLFxuICAgICAgWzExNC4wNDcwMTIzMjkxMDE1NiwgMjIuMzk1MTU3OTkwMjkwNzU1XSxcbiAgICAgIFsxMTQuMDYwMDU4NTkzNzUsICAgIDIyLjQxMzU2NzYzODM2OTgwNV0sXG4gICAgICBbMTE0LjA2MjgwNTE3NTc4MTI1LCAyMi40MzI2MDk1MzQ4NzY3OTZdLFxuICAgICAgWzExNC4wNDgzODU2MjAxMTcxNywgMjIuNDQ0NjY4MDUxNjU3MTU3XSxcbiAgICAgIFsxMTQuMDQyODkyNDU2MDU0NjksIDIyLjQ0ODQ3NTc4NjU2NTQ0XSxcbiAgICAgIFsxMTQuMDMyNTkyNzczNDM3NDksIDIyLjQ0NDY2ODA1MTY1NzE1N10sXG4gICAgICBbMTE0LjAxOTU0NjUwODc4OTA2LCAyMi40NDcyMDY1NTMyMTE4MTRdLFxuICAgICAgWzExMy45OTYyMDA1NjE1MjM0NCwgMjIuNDM2NDE3NjAwNzYzMTE0XSxcbiAgICAgIFsxMTMuOTgxNzgxMDA1ODU5MzgsIDIyLjQyMDU0OTk3MDI5MDg3NV0sXG4gICAgICBbMTEzLjk3Njk3NDQ4NzMwNDY5LCAyMi40MDM0MTA4OTI3MTIxMjRdXG4gICAgXSwgMTAwMClcbiAgKSwge1xuICAgIGNvbG9yOiAnI2YwMCcsXG4gICAgZHJhZ2dhYmxlOiB0cnVlLFxuICAgIHRyYW5zZm9ybTogdHJ1ZVxuICB9KS5hZGRUbyhtYXApO1xuLy9wb2x5Z29uLnRyYW5zZm9ybS5lbmFibGUoKTtcblxudmFyIHBvbHlsaW5lID0gZ2xvYmFsLnBvbHlsaW5lID0gbmV3IEwuUG9seWxpbmUoXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgIFsxMTQuMTQzMTQyNzAwMTk1MzEsIDIyLjQ5NDc5NDg0OTc1NDQzXSxcbiAgICBbMTE0LjE1MzQ0MjM4MjgxMjUsICAyMi40ODU5MTI5NDIzMjA5NThdLFxuICAgIFsxMTQuMTUyMDY5MDkxNzk2ODgsIDIyLjQ3MzIyMzUxNDQ3ODFdLFxuICAgIFsxMTQuMTQ5MzIyNTA5NzY1NjEsIDIyLjQ1OTg5ODM2Mzk0Mzg5M10sXG4gICAgWzExNC4xNTk2MjIxOTIzODI4MSwgMjIuNDQ3MjA2NTUzMjExODE0XSxcbiAgICBbMTE0LjE2OTkyMTg3NSwgICAgICAyMi40NDcyMDY1NTMyMTE4MTRdLFxuICAgIFsxMTQuMTkzOTU0NDY3NzczNDQsIDIyLjQ1OTg5ODM2Mzk0Mzg5M10sXG4gICAgWzExNC4yMDYzMTQwODY5MTQwNiwgMjIuNDYxMTY3NDgxMTA5MzVdLFxuICAgIFsxMTQuMjExODA3MjUwOTc2NTUsIDIyLjQ3Mzg1ODAxMzQ4NzYxNF0sXG4gICAgWzExNC4yMjQxNjY4NzAxMTcxOSwgMjIuNDcxMzIwMDAwMDA5OTkyXSxcbiAgICBbMTE0LjIzNzIxMzEzNDc2NTYyLCAyMi40NzYzOTU5ODA0NTc5NzNdLFxuICAgIFsxMTQuMjQyMDE5NjUzMzIwMzEsIDIyLjQ5MzUyNjA0MDczNzIyXSxcbiAgICBbMTE0LjIzMDM0NjY3OTY4NzUsICAyMi41MTU3Mjg1MTgzMDM1MV0sXG4gICAgWzExNC4yMTc5ODcwNjA1NDY4OCwgMjIuNTI0NjA4NTExMDI2MjYyXSxcbiAgICBbMTE0LjIwNzY4NzM3NzkyOTY5LCAyMi41MjQ2MDg1MTEwMjYyNjJdLFxuICAgIFsxMTQuMjA3Njg3Mzc3OTI5NjksIDIyLjUzNjAyNDgwNTg4Njk3NF1cbiAgXSksIHtcbiAgICB3ZWlnaHQ6IDE1LFxuICAgIGRyYWdnYWJsZTogdHJ1ZSxcbiAgICB0cmFuc2Zvcm06IHRydWVcbiAgfSlcbiAgLmJpbmRQb3B1cChcIkwuUG9seWxpbmVcIilcbiAgLmFkZFRvKG1hcCk7XG4vLyBwb2x5bGluZS50cmFuc2Zvcm0uZW5hYmxlKCk7XG5cblxudmFyIHBvbHlnb25XaXRoSG9sZSA9IGdsb2JhbC5wb2x5Z29uV2l0aEhvbGUgPSBuZXcgTC5Qb2x5Z29uKFxuICAgIFtcbiAgICAgIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgICAgICBbMTE0LjI3NDk3ODYzNzY5NTMsICAyMi40MTI5MzI4NjM1MTc3MTddLFxuICAgICAgICBbMTE0LjI4MzkwNTAyOTI5Njg4LCAyMi40MDA4NzE1OTAzMDU5NV0sXG4gICAgICAgIFsxMTQuMjkwMDg0ODM4ODY3MTcsIDIyLjM4ODgwOTI3MDQ1NTU2XSxcbiAgICAgICAgWzExNC4zMDEwNzExNjY5OTIxOSwgMjIuMzgyNDYwMjYwODE1NzE2XSxcbiAgICAgICAgWzExNC4zMTg5MjM5NTAxOTUzMSwgMjIuMzkxOTgzNjY2NjAyNzgzXSxcbiAgICAgICAgWzExNC4zMjMwNDM4MjMyNDIxOSwgMjIuMzgwNTU1NTAxNDIxNTMzXSxcbiAgICAgICAgWzExNC4zNDI5NTY1NDI5Njg3NSwgMjIuMzcyOTM2MjAzMTEzODM4XSxcbiAgICAgICAgWzExNC4zMzQ3MTY3OTY4NzUsICAgMjIuMzg0MzY0OTk0MTMzMzAzXSxcbiAgICAgICAgWzExNC4zMzA1OTY5MjM4MjgxMiwgMjIuMzkzODg4MjY5NTExMTk0XSxcbiAgICAgICAgWzExNC4zMjE2NzA1MzIyMjY1NSwgMjIuNDAwODcxNTkwMzA1OTVdLFxuICAgICAgICBbMTE0LjMyNzg1MDM0MTc5Njg4LCAyMi40MTM1Njc2MzgzNjk4MDVdLFxuICAgICAgICBbMTE0LjMzMTk3MDIxNDg0Mzc1LCAyMi40MjQ5OTMwODk2NDcyMl0sXG4gICAgICAgIFsxMTQuMzI1NzkwNDA1MjczNDQsIDIyLjQzMDcwNTQ2Mjc0ODkxOF0sXG4gICAgICAgIFsxMTQuMzMxOTcwMjE0ODQzNzUsIDIyLjQzOTU5MDkwOTE3MjY2XSxcbiAgICAgICAgWzExNC4zMzc0NjMzNzg5MDYyNCwgMjIuNDQ5MTEwMzk4ODg2MTA2XSxcbiAgICAgICAgWzExNC4zMzU0MDM0NDIzODI4MSwgMjIuNDYxODAyMDM1MzMzOTkyXSxcbiAgICAgICAgWzExNC4zMjUxMDM3NTk3NjU2MiwgMjIuNDY0MzQwMjIzMTc3MTE4XSxcbiAgICAgICAgWzExNC4zMjkyMjM2MzI4MTI0OSwgMjIuNDcyNTg5MDEyNTYxOTU0XSxcbiAgICAgICAgWzExNC4zMjM3MzA0Njg3NSwgICAgMjIuNDc3MDMwNDY0OTMzMzA3XSxcbiAgICAgICAgWzExNC4zMTk2MTA1OTU3MDMxMiwgMjIuNDc4OTMzOTAwOTE2OTI4XSxcbiAgICAgICAgWzExNC4zMDE3NTc4MTI1LCAgICAgMjIuNDY2MjQzODMzNTQ5NDQ1XSxcbiAgICAgICAgWzExNC4zMDI0NDQ0NTgwMDc4MSwgMjIuNDU3MzYwMDk0NzUwMDgzXSxcbiAgICAgICAgWzExNC4yOTI4MzE0MjA4OTg0NCwgMjIuNDU0ODIxNzc5MDc1ODMyXSxcbiAgICAgICAgWzExNC4yODM5MDUwMjkyOTY4OCwgMjIuNDUxMDE0MjE4NDIyNjldLFxuICAgICAgICBbMTE0LjI3NDk3ODYzNzY5NTMsICAyMi40NDI3NjQxNDUwMDE3MDddLFxuICAgICAgICBbMTE0LjI5MDc3MTQ4NDM3NDk5LCAyMi40MjgxNjY2NTkyNzk2MTVdLFxuICAgICAgICBbMTE0LjI3NzAzODU3NDIxODc1LCAyMi40MjA1NDk5NzAyOTA4NzVdLFxuICAgICAgICBbMTE0LjI3NDk3ODYzNzY5NTMsICAyMi40MTI5MzI4NjM1MTc3MTddXG4gICAgICBdKSxcbiAgICAgIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgICAgICBbMTE0LjMwMTA3MTE2Njk5MjE5LCAyMi40MzM4Nzg5MDE3ODI5N10sXG4gICAgICAgIFsxMTQuMjkzNTE4MDY2NDA2MjUsIDIyLjQxNDIwMjQxMDMyMTMwMl0sXG4gICAgICAgIFsxMTQuMzA1ODc3Njg1NTQ2ODYsIDIyLjQwODQ4OTM1ODM0MjYzNV0sXG4gICAgICAgIFsxMTQuMzIyMzU3MTc3NzM0MzgsIDIyLjQyMTE4NDcxMDMzMTg1OF0sXG4gICAgICAgIFsxMTQuMzAxMDcxMTY2OTkyMTksIDIyLjQzMzg3ODkwMTc4Mjk3XVxuICAgICAgXSlcbiAgICBdLCB7XG4gICAgICBkcmFnZ2FibGU6IHRydWUsXG4gICAgICB0cmFuc2Zvcm06IHRydWVcbiAgICB9XG4gIClcbiAgLmFkZFRvKG1hcCk7XG4vL3BvbHlnb25XaXRoSG9sZS50cmFuc2Zvcm0uZW5hYmxlKCk7XG5cbnZhciBtdWx0aVBvbHlnb24gPSBnbG9iYWwubXVsdGlQb2x5Z29uID0gbmV3IEwuUG9seWdvbihbXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgIFsxMTQuMjA1NjI3NDQxNDA2MjUsIDIyLjMyMDg1OTg0MTAwNTkzXSxcbiAgICBbMTE0LjIxNTkyNzEyNDAyMzQ0LCAyMi4zNTI2MTYwMzU1MTIxNV0sXG4gICAgWzExNC4yNjQ2Nzg5NTUwNzgxMiwgMjIuMzUxMzQ1OTI2NjA2OTU3XSxcbiAgICBbMTE0LjI3NDk3ODYzNzY5NTMsICAyMi4zMjQwMzU3ODU4NDAzOF0sXG4gICAgWzExNC4yOTIxNDQ3NzUzOTA2MiwgMjIuMzI3MjExNjU4Mzg4OTNdLFxuICAgIFsxMTQuMzAxNzU3ODEyNSwgICAgIDIyLjMxMTk2NjgxMDk3NzYxNl0sXG4gICAgWzExNC4yOTQyMDQ3MTE5MTQwNiwgMjIuMjkxMDAyNDI3NzM1MzI1XSxcbiAgICBbMTE0LjI5MzUxODA2NjQwNjI1LCAyMi4yNzI1NzY1ODU0MTM0NzVdLFxuICAgIFsxMTQuMjgzOTA1MDI5Mjk2ODgsIDIyLjI2MTc3NDEwMDk3NDM1XSxcbiAgICBbMTE0LjI2ODc5ODgyODEyNSwgICAyMi4yODE0NzIxMjI3ODM4MThdLFxuICAgIFsxMTQuMjc0OTc4NjM3Njk1MywgIDIyLjI5NDgxNDM2Nzc4MDUxOF0sXG4gICAgWzExNC4yNjk0ODU0NzM2MzI4MSwgMjIuMzAyNDM3OTM1OTA0NDhdLFxuICAgIFsxMTQuMjcwMTcyMTE5MTQwNjIsIDIyLjMxNTE0Mjk1ODE2OTM5XSxcbiAgICBbMTE0LjI1NzgxMjUsICAgICAgICAyMi4zMTE5NjY4MTA5Nzc2MTZdLFxuICAgIFsxMTQuMjQ3NTEyODE3MzgyODEsIDIyLjI5OTg5Njc5Mjc1MTkyN10sXG4gICAgWzExNC4yNDU0NTI4ODA4NTkzOCwgMjIuMjkxMDAyNDI3NzM1MzI1XSxcbiAgICBbMTE0LjIyOTY2MDAzNDE3OTY5LCAyMi4zMDc1MjAwODM1MjI0NzZdLFxuICAgIFsxMTQuMjIwNzMzNjQyNTc4MTIsIDIyLjMwNTYxNDI5OTgzNzA0Nl0sXG4gICAgWzExNC4yMDU2Mjc0NDE0MDYyNSwgMjIuMzIwODU5ODQxMDA1OTNdXG4gIF0pLFxuICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICBbMTE0LjMxNTQ5MDcyMjY1NjI1LCAyMi4zMzkyNzkzMTQ2ODMxMl0sXG4gICAgWzExNC4zMjAyOTcyNDEyMTA5NCwgMjIuMzI2NTc2NDg5NjYyNDgyXSxcbiAgICBbMTE0LjMyOTkxMDI3ODMyMDMxLCAyMi4zMjY1NzY0ODk2NjI0ODJdLFxuICAgIFsxMTQuMzMzMzQzNTA1ODU5MzgsIDIyLjMzMjI5MjkwNDA5MTcxNl0sXG4gICAgWzExNC4zMjMwNDM4MjMyNDIxOSwgMjIuMzQyNDU0ODQwMTQ2NV0sXG4gICAgWzExNC4zMTU0OTA3MjI2NTYyNSwgMjIuMzM5Mjc5MzE0NjgzMTJdXG4gIF0pLFxuICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICBbMTE0LjI3OTA5ODUxMDc0MjE5LCAyMi4yNDQ2MTU1MDAzMjMwNjRdLFxuICAgIFsxMTQuMjgxMTU4NDQ3MjY1NjIsIDIyLjI1MTYwNjI5NTEzMjk0OF0sXG4gICAgWzExNC4yODY2NTE2MTEzMjgxMiwgMjIuMjU1NDE5MzA4ODU4NTU2XSxcbiAgICBbMTE0LjI5OTY5Nzg3NTk3NjU2LCAyMi4yNjExMzg2MzQ3NDQ0OV0sXG4gICAgWzExNC4yOTYyNjQ2NDg0Mzc1LCAgMjIuMjUwOTcwNzgyNzUwODY2XSxcbiAgICBbMTE0LjI5NDg5MTM1NzQyMTg4LCAyMi4yNDA4MDIxOTI0NjMzNV0sXG4gICAgWzExNC4yOTAwODQ4Mzg4NjcxNywgMjIuMjM4ODk1NDk5NjEzMjMyXSxcbiAgICBbMTE0LjI3OTA5ODUxMDc0MjE5LCAyMi4yNDQ2MTU1MDAzMjMwNjRdXG4gIF0pXG5dLCB7XG4gIGRyYWdnYWJsZTogdHJ1ZSxcbiAgdHJhbnNmb3JtOiB0cnVlLFxuICBjb2xvcjogJyMwOTInXG59KS5iaW5kUG9wdXAoJ011bHRpUG9seWdvbicpLmFkZFRvKG1hcCk7XG4vL211bHRpUG9seWdvbi50cmFuc2Zvcm0uZW5hYmxlKCk7XG5cbnZhciBtdWx0aVBvbHlsaW5lID0gZ2xvYmFsLm11bHRpUG9seWxpbmUgPSBuZXcgTC5Qb2x5bGluZShbXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgIFsxMTMuODk4Njk2ODk5NDE0MDYsIDIyLjM5OTYwMTkyMTcwNjk1M10sXG4gICAgWzExMy44OTgwMTAyNTM5MDYyNSwgMjIuNDIyNDU0MTgxNzA5NzA3XSxcbiAgICBbMTEzLjkwMzUwMzQxNzk2ODc1LCAyMi40MzMyNDQyMTk3ODExN10sXG4gICAgWzExMy45MDk2ODMyMjc1MzkwNiwgMjIuNDQ5MTEwMzk4ODg2MTA2XSxcbiAgICBbMTEzLjkwNjkzNjY0NTUwNzgxLCAyMi40NzgyOTk0MjUxNjI4NTJdLFxuICAgIFsxMTMuOTIzNDE2MTM3Njk1MywgIDIyLjQ4ODQ1MDY4ODMyNTQwOF0sXG4gICAgWzExMy45MzM3MTU4MjAzMTI1LCAgMjIuNDgzMzc1MTQ5Nzg5NjIzXSxcbiAgICBbMTEzLjk0NDcwMjE0ODQzNzUsICAyMi40OTIyNTcyMjAwODUxOTNdLFxuICAgIFsxMTMuOTUyMjU1MjQ5MDIzNDQsIDIyLjUxMjU1Njk1NDA1MTQ1XVxuICBdKSxcblxuICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICBbMTEzLjg2Nzc5Nzg1MTU2MjUsICAyMi4zOTI2MTg1MzcxMzczOF0sXG4gICAgWzExMy44NjkxNzExNDI1NzgxMSwgMjIuNDI3NTMxOTUxMTU2OTldLFxuICAgIFsxMTMuOTIzNDE2MTM3Njk1MywgIDIyLjQ2MjQzNjU4NjY1MzE0OF0sXG4gICAgWzExMy45NDgxMzUzNzU5NzY1NiwgMjIuNDczODU4MDEzNDg3NjE0XSxcbiAgICBbMTEzLjk3ODM0Nzc3ODMyMDMsICAyMi40OTkyMzU1ODk2ODMwNl0sXG4gICAgWzExMy45OTY4ODcyMDcwMzEyNSwgMjIuNTExOTIyNjMyNDY4ODZdLFxuICAgIFsxMTQuMDEzMzY2Njk5MjE4NzUsIDIyLjUwMTEzODcyMDMwMDI1NF0sXG4gICAgWzExNC4wMjUwMzk2NzI4NTE1NSwgMjIuNTA4MTE2NjQxODUzNjc1XVxuICBdKVxuXSwge1xuICBkcmFnZ2FibGU6IHRydWUsXG4gIHRyYW5zZm9ybTogdHJ1ZSxcbiAgY29sb3I6ICcjZTkwJ1xufSkuYmluZFBvcHVwKCdNdWx0aVBvbHlsaW5lJykuYWRkVG8obWFwKTtcbi8vIG11bHRpUG9seWxpbmUudHJhbnNmb3JtLmVuYWJsZSgpO1xuXG52YXIgbGF5ZXJzID0gW3BvbHlnb24sIHBvbHlsaW5lLCBtdWx0aVBvbHlsaW5lLCBtdWx0aVBvbHlnb24sIHBvbHlnb25XaXRoSG9sZV07XG5cbmZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgTC5VdGlsLnJlcXVlc3RBbmltRnJhbWUoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRyYWdnaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RyYWdnaW5nJykuY2hlY2tlZDtcbiAgICB2YXIgc2NhbGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzY2FsaW5nJykuY2hlY2tlZDtcbiAgICB2YXIgcm90YXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcm90YXRpb24nKS5jaGVja2VkO1xuXG4gICAgbGF5ZXJzLmZvckVhY2goZnVuY3Rpb24obGF5ZXIpIHtcblxuICAgICAgaWYgKGxheWVyLmRyYWdnaW5nKSB7XG4gICAgICAgIGxheWVyLmRyYWdnaW5nW2RyYWdnaW5nID8gJ2VuYWJsZSc6ICdkaXNhYmxlJ10oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxheWVyLmVhY2hMYXllcihmdW5jdGlvbihzdWJsYXllcikge1xuICAgICAgICAgIHN1YmxheWVyLmRyYWdnaW5nW2RyYWdnaW5nID8gJ2VuYWJsZSc6ICdkaXNhYmxlJ10oKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cblxuICAgICAgbGF5ZXIudHJhbnNmb3JtLnNldE9wdGlvbnMoe1xuICAgICAgICBzY2FsaW5nOiBzY2FsaW5nLFxuICAgICAgICByb3RhdGlvbjogcm90YXRpb25cbiAgICAgIH0pLmVuYWJsZSgpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPWNoZWNrYm94XScpKVxuLmZvckVhY2goZnVuY3Rpb24oY2hlY2tib3gpIHtcbiAgTC5Eb21FdmVudC5vbihjaGVja2JveCwgJ2NoYW5nZScsIHVwZGF0ZSk7XG59KTtcblxudXBkYXRlKCk7XG4iLCJ2YXIgTCA9IGdsb2JhbC5MIHx8IHJlcXVpcmUoJ2xlYWZsZXQnKTtcbnJlcXVpcmUoJ2xlYWZsZXQtcGF0aC1kcmFnJyk7XG5yZXF1aXJlKCcuL3NyYy9VdGlsJyk7XG5yZXF1aXJlKCcuL3NyYy9NYXRyaXgnKTtcbnJlcXVpcmUoJy4vc3JjL1BhdGguVHJhbnNmb3JtJyk7XG4iLCJyZXF1aXJlKCcuL3NyYy9TVkcnKTtcbnJlcXVpcmUoJy4vc3JjL1NWRy5WTUwnKTtcbnJlcXVpcmUoJy4vc3JjL0NhbnZhcycpO1xucmVxdWlyZSgnLi9zcmMvUGF0aC5UcmFuc2Zvcm0nKTtcbnJlcXVpcmUoJy4vc3JjL1BhdGguRHJhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEwuUGF0aC5EcmFnO1xuIiwiTC5VdGlsLnRydWVGbiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbkwuQ2FudmFzLmluY2x1ZGUoe1xuXG4gIC8qKlxuICAgKiBEbyBub3RoaW5nXG4gICAqIEBwYXJhbSAge0wuUGF0aH0gbGF5ZXJcbiAgICovXG4gIF9yZXNldFRyYW5zZm9ybVBhdGg6IGZ1bmN0aW9uKGxheWVyKSB7XG4gICAgaWYgKCF0aGlzLl9jb250YWluZXJDb3B5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZGVsZXRlIHRoaXMuX2NvbnRhaW5lckNvcHk7XG5cbiAgICBpZiAobGF5ZXIuX2NvbnRhaW5zUG9pbnRfKSB7XG4gICAgICBsYXllci5fY29udGFpbnNQb2ludCA9IGxheWVyLl9jb250YWluc1BvaW50XztcbiAgICAgIGRlbGV0ZSBsYXllci5fY29udGFpbnNQb2ludF87XG5cbiAgICAgIHRoaXMuX3JlcXVlc3RSZWRyYXcobGF5ZXIpO1xuICAgICAgdGhpcy5fZHJhdyh0cnVlKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEFsZ29yaXRobSBvdXRsaW5lOlxuICAgKlxuICAgKiAxLiBwcmUtdHJhbnNmb3JtIC0gY2xlYXIgdGhlIHBhdGggb3V0IG9mIHRoZSBjYW52YXMsIGNvcHkgY2FudmFzIHN0YXRlXG4gICAqIDIuIGF0IGV2ZXJ5IGZyYW1lOlxuICAgKiAgICAyLjEuIHNhdmVcbiAgICogICAgMi4yLiByZWRyYXcgdGhlIGNhbnZhcyBmcm9tIHNhdmVkIG9uZVxuICAgKiAgICAyLjMuIHRyYW5zZm9ybVxuICAgKiAgICAyLjQuIGRyYXcgcGF0aFxuICAgKiAgICAyLjUuIHJlc3RvcmVcbiAgICpcbiAgICogQHBhcmFtICB7TC5QYXRofSBsYXllclxuICAgKiBAcGFyYW0gIHtBcnJheS48TnVtYmVyPn0gbWF0cml4XG4gICAqL1xuICB0cmFuc2Zvcm1QYXRoOiBmdW5jdGlvbihsYXllciwgbWF0cml4KSB7XG4gICAgdmFyIGNvcHkgPSB0aGlzLl9jb250YWluZXJDb3B5O1xuICAgIHZhciBjdHggPSB0aGlzLl9jdHg7XG4gICAgdmFyIG0gPSBMLkJyb3dzZXIucmV0aW5hID8gMiA6IDE7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuX2JvdW5kcztcbiAgICB2YXIgc2l6ZSA9IGJvdW5kcy5nZXRTaXplKCk7XG4gICAgdmFyIHBvcyA9IGJvdW5kcy5taW47XG5cbiAgICBpZiAoIWNvcHkpIHtcbiAgICAgIGNvcHkgPSB0aGlzLl9jb250YWluZXJDb3B5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvcHkpO1xuXG4gICAgICBjb3B5LndpZHRoID0gbSAqIHNpemUueDtcbiAgICAgIGNvcHkuaGVpZ2h0ID0gbSAqIHNpemUueTtcblxuICAgICAgbGF5ZXIuX3JlbW92ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fcmVkcmF3KCk7XG5cbiAgICAgIGNvcHkuZ2V0Q29udGV4dCgnMmQnKS50cmFuc2xhdGUobSAqIGJvdW5kcy5taW4ueCwgbSAqIGJvdW5kcy5taW4ueSk7XG4gICAgICBjb3B5LmdldENvbnRleHQoJzJkJykuZHJhd0ltYWdlKHRoaXMuX2NvbnRhaW5lciwgMCwgMCk7XG4gICAgICB0aGlzLl9pbml0UGF0aChsYXllcik7XG4gICAgICBsYXllci5fY29udGFpbnNQb2ludF8gPSBsYXllci5fY29udGFpbnNQb2ludDtcbiAgICAgIGxheWVyLl9jb250YWluc1BvaW50ID0gTC5VdGlsLnRydWVGbjtcbiAgICB9XG5cbiAgICBjdHguc2F2ZSgpO1xuICAgIGN0eC5jbGVhclJlY3QocG9zLngsIHBvcy55LCBzaXplLnggKiBtLCBzaXplLnkgKiBtKTtcbiAgICBjdHguc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xuICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgY3R4LnNhdmUoKTtcblxuICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5fY29udGFpbmVyQ29weSwgMCwgMCwgc2l6ZS54LCBzaXplLnkpO1xuICAgIGN0eC50cmFuc2Zvcm0uYXBwbHkoY3R4LCBtYXRyaXgpO1xuXG4gICAgdmFyIGxheWVycyA9IHRoaXMuX2xheWVycztcbiAgICB0aGlzLl9sYXllcnMgPSB7fTtcblxuICAgIHRoaXMuX2luaXRQYXRoKGxheWVyKTtcbiAgICBsYXllci5fdXBkYXRlUGF0aCgpO1xuXG4gICAgdGhpcy5fbGF5ZXJzID0gbGF5ZXJzO1xuICAgIGN0eC5yZXN0b3JlKCk7XG4gIH1cblxufSk7XG4iLCIvKipcbiAqIERyYWcgaGFuZGxlclxuICogQGNsYXNzIEwuUGF0aC5EcmFnXG4gKiBAZXh0ZW5kcyB7TC5IYW5kbGVyfVxuICovXG5MLkhhbmRsZXIuUGF0aERyYWcgPSBMLkhhbmRsZXIuZXh0ZW5kKCAvKiogQGxlbmRzICBMLlBhdGguRHJhZy5wcm90b3R5cGUgKi8ge1xuXG4gIHN0YXRpY3M6IHtcbiAgICBEUkFHR0lOR19DTFM6ICdsZWFmbGV0LXBhdGgtZHJhZ2dhYmxlJyxcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBAcGFyYW0gIHtMLlBhdGh9IHBhdGhcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICBpbml0aWFsaXplOiBmdW5jdGlvbihwYXRoKSB7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7TC5QYXRofVxuICAgICAqL1xuICAgIHRoaXMuX3BhdGggPSBwYXRoO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0FycmF5LjxOdW1iZXI+fVxuICAgICAqL1xuICAgIHRoaXMuX21hdHJpeCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7TC5Qb2ludH1cbiAgICAgKi9cbiAgICB0aGlzLl9zdGFydFBvaW50ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtMLlBvaW50fVxuICAgICAqL1xuICAgIHRoaXMuX2RyYWdTdGFydFBvaW50ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuX21hcERyYWdnaW5nV2FzRW5hYmxlZCA9IGZhbHNlO1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIEVuYWJsZSBkcmFnZ2luZ1xuICAgKi9cbiAgYWRkSG9va3M6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3BhdGgub24oJ21vdXNlZG93bicsIHRoaXMuX29uRHJhZ1N0YXJ0LCB0aGlzKTtcblxuICAgIHRoaXMuX3BhdGgub3B0aW9ucy5jbGFzc05hbWUgPSB0aGlzLl9wYXRoLm9wdGlvbnMuY2xhc3NOYW1lID9cbiAgICAgICAgKHRoaXMuX3BhdGgub3B0aW9ucy5jbGFzc05hbWUgKyAnICcgKyBMLkhhbmRsZXIuUGF0aERyYWcuRFJBR0dJTkdfQ0xTKSA6XG4gICAgICAgICBMLkhhbmRsZXIuUGF0aERyYWcuRFJBR0dJTkdfQ0xTO1xuXG4gICAgaWYgKHRoaXMuX3BhdGguX3BhdGgpIHtcbiAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9wYXRoLl9wYXRoLCBMLkhhbmRsZXIuUGF0aERyYWcuRFJBR0dJTkdfQ0xTKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIERpc2FibGUgZHJhZ2dpbmdcbiAgICovXG4gIHJlbW92ZUhvb2tzOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9wYXRoLm9mZignbW91c2Vkb3duJywgdGhpcy5fb25EcmFnU3RhcnQsIHRoaXMpO1xuXG4gICAgdGhpcy5fcGF0aC5vcHRpb25zLmNsYXNzTmFtZSA9IHRoaXMuX3BhdGgub3B0aW9ucy5jbGFzc05hbWVcbiAgICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAoJ1xcXFxzKycgKyBMLkhhbmRsZXIuUGF0aERyYWcuRFJBR0dJTkdfQ0xTKSwgJycpO1xuICAgIGlmICh0aGlzLl9wYXRoLl9wYXRoKSB7XG4gICAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5fcGF0aC5fcGF0aCwgTC5IYW5kbGVyLlBhdGhEcmFnLkRSQUdHSU5HX0NMUyk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgbW92ZWQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9wYXRoLl9kcmFnTW92ZWQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFN0YXJ0IGRyYWdcbiAgICogQHBhcmFtICB7TC5Nb3VzZUV2ZW50fSBldnRcbiAgICovXG4gIF9vbkRyYWdTdGFydDogZnVuY3Rpb24oZXZ0KSB7XG4gICAgdmFyIGV2ZW50VHlwZSA9IGV2dC5vcmlnaW5hbEV2ZW50Ll9zaW11bGF0ZWQgPyAndG91Y2hzdGFydCcgOiBldnQub3JpZ2luYWxFdmVudC50eXBlO1xuXG4gICAgdGhpcy5fbWFwRHJhZ2dpbmdXYXNFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5fc3RhcnRQb2ludCA9IGV2dC5jb250YWluZXJQb2ludC5jbG9uZSgpO1xuICAgIHRoaXMuX2RyYWdTdGFydFBvaW50ID0gZXZ0LmNvbnRhaW5lclBvaW50LmNsb25lKCk7XG4gICAgdGhpcy5fbWF0cml4ID0gWzEsIDAsIDAsIDEsIDAsIDBdO1xuICAgIEwuRG9tRXZlbnQuc3RvcChldnQub3JpZ2luYWxFdmVudCk7XG5cbiAgICBMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5fcGF0aC5fcmVuZGVyZXIuX2NvbnRhaW5lciwgJ2xlYWZsZXQtaW50ZXJhY3RpdmUnKTtcbiAgICBMLkRvbUV2ZW50XG4gICAgICAub24oZG9jdW1lbnQsIEwuRHJhZ2dhYmxlLk1PVkVbZXZlbnRUeXBlXSwgdGhpcy5fb25EcmFnLCB0aGlzKVxuICAgICAgLm9uKGRvY3VtZW50LCBMLkRyYWdnYWJsZS5FTkRbZXZlbnRUeXBlXSwgdGhpcy5fb25EcmFnRW5kLCB0aGlzKTtcblxuICAgIGlmICh0aGlzLl9wYXRoLl9tYXAuZHJhZ2dpbmcuZW5hYmxlZCgpKSB7XG4gICAgICAvLyBJIGd1ZXNzIGl0J3MgcmVxdWlyZWQgYmVjYXVzZSBtb3VzZG93biBnZXRzIHNpbXVsYXRlZCB3aXRoIGEgZGVsYXlcbiAgICAgIHRoaXMuX3BhdGguX21hcC5kcmFnZ2luZy5fZHJhZ2dhYmxlLl9vblVwKCk7XG5cbiAgICAgIHRoaXMuX3BhdGguX21hcC5kcmFnZ2luZy5kaXNhYmxlKCk7XG4gICAgICB0aGlzLl9tYXBEcmFnZ2luZ1dhc0VuYWJsZWQgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLl9wYXRoLl9kcmFnTW92ZWQgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLl9wYXRoLl9wb3B1cCkgeyAvLyB0aGF0IG1pZ2h0IGJlIGEgY2FzZSBvbiB0b3VjaCBkZXZpY2VzIGFzIHdlbGxcbiAgICAgIHRoaXMuX3BhdGguX3BvcHVwLl9jbG9zZSgpO1xuICAgIH1cblxuICAgIHRoaXMuX3JlcGxhY2VDb29yZEdldHRlcnMoZXZ0KTtcbiAgfSxcblxuICAvKipcbiAgICogRHJhZ2dpbmdcbiAgICogQHBhcmFtICB7TC5Nb3VzZUV2ZW50fSBldnRcbiAgICovXG4gIF9vbkRyYWc6IGZ1bmN0aW9uKGV2dCkge1xuICAgIEwuRG9tRXZlbnQuc3RvcChldnQpO1xuXG4gICAgdmFyIGZpcnN0ID0gKGV2dC50b3VjaGVzICYmIGV2dC50b3VjaGVzLmxlbmd0aCA+PSAxID8gZXZ0LnRvdWNoZXNbMF0gOiBldnQpO1xuICAgIHZhciBjb250YWluZXJQb2ludCA9IHRoaXMuX3BhdGguX21hcC5tb3VzZUV2ZW50VG9Db250YWluZXJQb2ludChmaXJzdCk7XG5cbiAgICB2YXIgeCA9IGNvbnRhaW5lclBvaW50Lng7XG4gICAgdmFyIHkgPSBjb250YWluZXJQb2ludC55O1xuXG4gICAgdmFyIGR4ID0geCAtIHRoaXMuX3N0YXJ0UG9pbnQueDtcbiAgICB2YXIgZHkgPSB5IC0gdGhpcy5fc3RhcnRQb2ludC55O1xuXG4gICAgaWYgKCF0aGlzLl9wYXRoLl9kcmFnTW92ZWQgJiYgKGR4IHx8IGR5KSkge1xuICAgICAgdGhpcy5fcGF0aC5fZHJhZ01vdmVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX3BhdGguZmlyZSgnZHJhZ3N0YXJ0JywgZXZ0KTtcbiAgICAgIC8vIHdlIGRvbid0IHdhbnQgdGhhdCB0byBoYXBwZW4gb24gY2xpY2tcbiAgICAgIHRoaXMuX3BhdGguYnJpbmdUb0Zyb250KCk7XG4gICAgfVxuXG4gICAgdGhpcy5fbWF0cml4WzRdICs9IGR4O1xuICAgIHRoaXMuX21hdHJpeFs1XSArPSBkeTtcblxuICAgIHRoaXMuX3N0YXJ0UG9pbnQueCA9IHg7XG4gICAgdGhpcy5fc3RhcnRQb2ludC55ID0geTtcblxuICAgIHRoaXMuX3BhdGguZmlyZSgncHJlZHJhZycsIGV2dCk7XG4gICAgdGhpcy5fcGF0aC5fdHJhbnNmb3JtKHRoaXMuX21hdHJpeCk7XG4gICAgdGhpcy5fcGF0aC5maXJlKCdkcmFnJywgZXZ0KTtcbiAgfSxcblxuICAvKipcbiAgICogRHJhZ2dpbmcgc3RvcHBlZCwgYXBwbHlcbiAgICogQHBhcmFtICB7TC5Nb3VzZUV2ZW50fSBldnRcbiAgICovXG4gIF9vbkRyYWdFbmQ6IGZ1bmN0aW9uKGV2dCkge1xuICAgIEwuRG9tRXZlbnQuc3RvcChldnQpO1xuICAgIEwuRG9tRXZlbnQuX2Zha2VTdG9wKHsgdHlwZTogJ2NsaWNrJyB9KTtcblxuICAgIHZhciBjb250YWluZXJQb2ludCA9IHRoaXMuX3BhdGguX21hcC5tb3VzZUV2ZW50VG9Db250YWluZXJQb2ludChldnQpO1xuXG4gICAgLy8gYXBwbHkgbWF0cml4XG4gICAgaWYgKHRoaXMubW92ZWQoKSkge1xuICAgICAgdGhpcy5fdHJhbnNmb3JtUG9pbnRzKHRoaXMuX21hdHJpeCk7XG4gICAgICB0aGlzLl9wYXRoLl91cGRhdGVQYXRoKCk7XG4gICAgICB0aGlzLl9wYXRoLl9wcm9qZWN0KCk7XG4gICAgICB0aGlzLl9wYXRoLl90cmFuc2Zvcm0obnVsbCk7XG4gICAgfVxuXG4gICAgTC5Eb21FdmVudFxuICAgICAgLm9mZihkb2N1bWVudCwgJ21vdXNlbW92ZSB0b3VjaG1vdmUnLCB0aGlzLl9vbkRyYWcsIHRoaXMpXG4gICAgICAub2ZmKGRvY3VtZW50LCAnbW91c2V1cCB0b3VjaGVuZCcsICAgIHRoaXMuX29uRHJhZ0VuZCwgdGhpcyk7XG5cbiAgICB0aGlzLl9yZXN0b3JlQ29vcmRHZXR0ZXJzKCk7XG4gICAgLy8gY29uc2lzdGVuY3lcbiAgICB0aGlzLl9wYXRoLmZpcmUoJ2RyYWdlbmQnLCB7XG4gICAgICBkaXN0YW5jZTogTWF0aC5zcXJ0KFxuICAgICAgICBMLkxpbmVVdGlsLl9zcURpc3QodGhpcy5fZHJhZ1N0YXJ0UG9pbnQsIGNvbnRhaW5lclBvaW50KVxuICAgICAgKVxuICAgIH0pO1xuXG4gICAgdGhpcy5fbWF0cml4ICAgICAgICAgPSBudWxsO1xuICAgIHRoaXMuX3N0YXJ0UG9pbnQgICAgID0gbnVsbDtcbiAgICB0aGlzLl9kcmFnU3RhcnRQb2ludCA9IG51bGw7XG5cbiAgICBpZiAodGhpcy5fbWFwRHJhZ2dpbmdXYXNFbmFibGVkKSB7XG4gICAgICB0aGlzLl9wYXRoLl9tYXAuZHJhZ2dpbmcuZW5hYmxlKCk7XG4gICAgfVxuICB9LFxuXG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgdHJhbnNmb3JtYXRpb24sIGRvZXMgaXQgaW4gb25lIHN3ZWVwIGZvciBwZXJmb3JtYW5jZSxcbiAgICogc28gZG9uJ3QgYmUgc3VycHJpc2VkIGFib3V0IHRoZSBjb2RlIHJlcGV0aXRpb24uXG4gICAqXG4gICAqIFsgeCBdICAgWyBhICBiICB0eCBdIFsgeCBdICAgWyBhICogeCArIGIgKiB5ICsgdHggXVxuICAgKiBbIHkgXSA9IFsgYyAgZCAgdHkgXSBbIHkgXSA9IFsgYyAqIHggKyBkICogeSArIHR5IF1cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheS48TnVtYmVyPn0gbWF0cml4XG4gICAqL1xuICBfdHJhbnNmb3JtUG9pbnRzOiBmdW5jdGlvbihtYXRyaXgsIGRlc3QpIHtcbiAgICB2YXIgcGF0aCA9IHRoaXMuX3BhdGg7XG4gICAgdmFyIGksIGxlbiwgbGF0bG5nO1xuXG4gICAgdmFyIHB4ID0gTC5wb2ludChtYXRyaXhbNF0sIG1hdHJpeFs1XSk7XG5cbiAgICB2YXIgY3JzID0gcGF0aC5fbWFwLm9wdGlvbnMuY3JzO1xuICAgIHZhciB0cmFuc2Zvcm1hdGlvbiA9IGNycy50cmFuc2Zvcm1hdGlvbjtcbiAgICB2YXIgc2NhbGUgPSBjcnMuc2NhbGUocGF0aC5fbWFwLmdldFpvb20oKSk7XG4gICAgdmFyIHByb2plY3Rpb24gPSBjcnMucHJvamVjdGlvbjtcblxuICAgIHZhciBkaWZmID0gdHJhbnNmb3JtYXRpb24udW50cmFuc2Zvcm0ocHgsIHNjYWxlKVxuICAgICAgLnN1YnRyYWN0KHRyYW5zZm9ybWF0aW9uLnVudHJhbnNmb3JtKEwucG9pbnQoMCwgMCksIHNjYWxlKSk7XG4gICAgdmFyIGFwcGx5VHJhbnNmb3JtID0gIWRlc3Q7XG5cbiAgICBwYXRoLl9ib3VuZHMgPSBuZXcgTC5MYXRMbmdCb3VuZHMoKTtcblxuICAgIC8vIGNvbnNvbGUudGltZSgndHJhbnNmb3JtJyk7XG4gICAgLy8gYWxsIHNoaWZ0cyBhcmUgaW4tcGxhY2VcbiAgICBpZiAocGF0aC5fcG9pbnQpIHsgLy8gTC5DaXJjbGVcbiAgICAgIGRlc3QgPSBwcm9qZWN0aW9uLnVucHJvamVjdChcbiAgICAgICAgcHJvamVjdGlvbi5wcm9qZWN0KHBhdGguX2xhdGxuZykuX2FkZChkaWZmKSk7XG4gICAgICBpZiAoYXBwbHlUcmFuc2Zvcm0pIHtcbiAgICAgICAgcGF0aC5fbGF0bG5nID0gZGVzdDtcbiAgICAgICAgcGF0aC5fcG9pbnQuX2FkZChweCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChwYXRoLl9yaW5ncyB8fCBwYXRoLl9wYXJ0cykgeyAvLyBldmVyeXRoaW5nIGVsc2VcbiAgICAgIHZhciByaW5ncyAgID0gcGF0aC5fcmluZ3MgfHwgcGF0aC5fcGFydHM7XG4gICAgICB2YXIgbGF0bG5ncyA9IHBhdGguX2xhdGxuZ3M7XG4gICAgICBkZXN0ID0gZGVzdCB8fCBsYXRsbmdzO1xuICAgICAgaWYgKCFMLlV0aWwuaXNBcnJheShsYXRsbmdzWzBdKSkgeyAvLyBwb2x5bGluZVxuICAgICAgICBsYXRsbmdzID0gW2xhdGxuZ3NdO1xuICAgICAgICBkZXN0ICAgID0gW2Rlc3RdO1xuICAgICAgfVxuICAgICAgZm9yIChpID0gMCwgbGVuID0gcmluZ3MubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZGVzdFtpXSA9IGRlc3RbaV0gfHwgW107XG4gICAgICAgIGZvciAodmFyIGogPSAwLCBqaiA9IHJpbmdzW2ldLmxlbmd0aDsgaiA8IGpqOyBqKyspIHtcbiAgICAgICAgICBsYXRsbmcgICAgID0gbGF0bG5nc1tpXVtqXTtcbiAgICAgICAgICBkZXN0W2ldW2pdID0gcHJvamVjdGlvblxuICAgICAgICAgICAgLnVucHJvamVjdChwcm9qZWN0aW9uLnByb2plY3QobGF0bG5nKS5fYWRkKGRpZmYpKTtcbiAgICAgICAgICBpZiAoYXBwbHlUcmFuc2Zvcm0pIHtcbiAgICAgICAgICAgIHBhdGguX2JvdW5kcy5leHRlbmQobGF0bG5nc1tpXVtqXSk7XG4gICAgICAgICAgICByaW5nc1tpXVtqXS5fYWRkKHB4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRlc3Q7XG4gICAgLy8gY29uc29sZS50aW1lRW5kKCd0cmFuc2Zvcm0nKTtcbiAgfSxcblxuXG5cbiAgLyoqXG4gICAqIElmIHlvdSB3YW50IHRvIHJlYWQgdGhlIGxhdGxuZ3MgZHVyaW5nIHRoZSBkcmFnIC0geW91ciByaWdodCxcbiAgICogYnV0IHRoZXkgaGF2ZSB0byBiZSB0cmFuc2Zvcm1lZFxuICAgKi9cbiAgX3JlcGxhY2VDb29yZEdldHRlcnM6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLl9wYXRoLmdldExhdExuZykgeyAvLyBDaXJjbGUsIENpcmNsZU1hcmtlclxuICAgICAgdGhpcy5fcGF0aC5nZXRMYXRMbmdfID0gdGhpcy5fcGF0aC5nZXRMYXRMbmc7XG4gICAgICB0aGlzLl9wYXRoLmdldExhdExuZyA9IEwuVXRpbC5iaW5kKGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZygxMTEpO1xuICAgICAgICByZXR1cm4gdGhpcy5kcmFnZ2luZy5fdHJhbnNmb3JtUG9pbnRzKHRoaXMuZHJhZ2dpbmcuX21hdHJpeCwge30pO1xuICAgICAgfSwgdGhpcy5fcGF0aCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9wYXRoLmdldExhdExuZ3MpIHtcbiAgICAgIHRoaXMuX3BhdGguZ2V0TGF0TG5nc18gPSB0aGlzLl9wYXRoLmdldExhdExuZ3M7XG4gICAgICB0aGlzLl9wYXRoLmdldExhdExuZ3MgPSBMLlV0aWwuYmluZChmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coMjIyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHJhZ2dpbmcuX3RyYW5zZm9ybVBvaW50cyh0aGlzLmRyYWdnaW5nLl9tYXRyaXgsIFtdKTtcbiAgICAgIH0sIHRoaXMuX3BhdGgpO1xuICAgIH1cbiAgfSxcblxuXG4gIC8qKlxuICAgKiBQdXQgYmFjayB0aGUgZ2V0dGVyc1xuICAgKi9cbiAgX3Jlc3RvcmVDb29yZEdldHRlcnM6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLl9wYXRoLmdldExhdExuZ18pIHtcbiAgICAgIHRoaXMuX3BhdGguZ2V0TGF0TG5nID0gdGhpcy5fcGF0aC5nZXRMYXRMbmdfO1xuICAgICAgZGVsZXRlIHRoaXMuX3BhdGguZ2V0TGF0TG5nXztcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3BhdGguZ2V0TGF0TG5nc18pIHtcbiAgICAgIHRoaXMuX3BhdGguZ2V0TGF0TG5ncyA9IHRoaXMuX3BhdGguZ2V0TGF0TG5nc187XG4gICAgICBkZWxldGUgdGhpcy5fcGF0aC5nZXRMYXRMbmdzXztcbiAgICB9XG4gIH1cblxufSk7XG5cblxuLyoqXG4gKiBAcGFyYW0gIHtMLlBhdGh9IGxheWVyXG4gKiBAcmV0dXJuIHtMLlBhdGh9XG4gKi9cbkwuSGFuZGxlci5QYXRoRHJhZy5tYWtlRHJhZ2dhYmxlID0gZnVuY3Rpb24obGF5ZXIpIHtcbiAgbGF5ZXIuZHJhZ2dpbmcgPSBuZXcgTC5IYW5kbGVyLlBhdGhEcmFnKGxheWVyKTtcbiAgcmV0dXJuIGxheWVyO1xufTtcblxuXG4vKipcbiAqIEFsc28gZXhwb3NlIGFzIGEgbWV0aG9kXG4gKiBAcmV0dXJuIHtMLlBhdGh9XG4gKi9cbkwuUGF0aC5wcm90b3R5cGUubWFrZURyYWdnYWJsZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gTC5IYW5kbGVyLlBhdGhEcmFnLm1ha2VEcmFnZ2FibGUodGhpcyk7XG59O1xuXG5cbkwuUGF0aC5hZGRJbml0SG9vayhmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMub3B0aW9ucy5kcmFnZ2FibGUpIHtcbiAgICAvLyBlbnN1cmUgaW50ZXJhY3RpdmVcbiAgICB0aGlzLm9wdGlvbnMuaW50ZXJhY3RpdmUgPSB0cnVlO1xuXG4gICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuZHJhZ2dpbmcuZW5hYmxlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIEwuSGFuZGxlci5QYXRoRHJhZy5tYWtlRHJhZ2dhYmxlKHRoaXMpO1xuICAgICAgdGhpcy5kcmFnZ2luZy5lbmFibGUoKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgIHRoaXMuZHJhZ2dpbmcuZGlzYWJsZSgpO1xuICB9XG59KTtcbiIsIi8qKlxuICogTGVhZmxldCB2ZWN0b3IgZmVhdHVyZXMgZHJhZyBmdW5jdGlvbmFsaXR5XG4gKiBAYXV0aG9yIEFsZXhhbmRlciBNaWxldnNraSA8aW5mb0B3OHIubmFtZT5cbiAqIEBwcmVzZXJ2ZVxuICovXG5cbi8qKlxuICogTWF0cml4IHRyYW5zZm9ybSBwYXRoIGZvciBTVkcvVk1MXG4gKiBSZW5kZXJlci1pbmRlcGVuZGVudFxuICovXG5MLlBhdGguaW5jbHVkZSh7XG5cblx0LyoqXG5cdCAqIEFwcGxpZXMgbWF0cml4IHRyYW5zZm9ybWF0aW9uIHRvIFNWR1xuXHQgKiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+P30gbWF0cml4XG5cdCAqL1xuXHRfdHJhbnNmb3JtOiBmdW5jdGlvbihtYXRyaXgpIHtcblx0XHRpZiAodGhpcy5fcmVuZGVyZXIpIHtcblx0XHRcdGlmIChtYXRyaXgpIHtcblx0XHRcdFx0dGhpcy5fcmVuZGVyZXIudHJhbnNmb3JtUGF0aCh0aGlzLCBtYXRyaXgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gcmVzZXQgdHJhbnNmb3JtIG1hdHJpeFxuXHRcdFx0XHR0aGlzLl9yZW5kZXJlci5fcmVzZXRUcmFuc2Zvcm1QYXRoKHRoaXMpO1xuXHRcdFx0XHR0aGlzLl91cGRhdGUoKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0LyoqXG5cdCAqIENoZWNrIGlmIHRoZSBmZWF0dXJlIHdhcyBkcmFnZ2VkLCB0aGF0J2xsIHN1cHJlc3MgdGhlIGNsaWNrIGV2ZW50XG5cdCAqIG9uIG1vdXNldXAuIFRoYXQgZml4ZXMgcG9wdXBzIGZvciBleGFtcGxlXG5cdCAqXG5cdCAqIEBwYXJhbSAge01vdXNlRXZlbnR9IGVcblx0ICovXG5cdF9vbk1vdXNlQ2xpY2s6IGZ1bmN0aW9uKGUpIHtcblx0XHRpZiAoKHRoaXMuZHJhZ2dpbmcgJiYgdGhpcy5kcmFnZ2luZy5tb3ZlZCgpKSB8fFxuXHRcdFx0KHRoaXMuX21hcC5kcmFnZ2luZyAmJiB0aGlzLl9tYXAuZHJhZ2dpbmcubW92ZWQoKSkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLl9maXJlTW91c2VFdmVudChlKTtcblx0fVxuXG59KTtcbiIsIkwuU1ZHLmluY2x1ZGUoIUwuQnJvd3Nlci52bWwgPyB7fSA6IHtcblxuXHQvKipcblx0ICogUmVzZXQgdHJhbnNmb3JtIG1hdHJpeFxuXHQgKi9cblx0X3Jlc2V0VHJhbnNmb3JtUGF0aDogZnVuY3Rpb24obGF5ZXIpIHtcblx0XHRpZiAobGF5ZXIuX3NrZXcpIHtcblx0XHRcdC8vIHN1cGVyIGltcG9ydGFudCEgd29ya2Fyb3VuZCBmb3IgYSAnanVtcGluZycgZ2xpdGNoOlxuXHRcdFx0Ly8gZGlzYWJsZSB0cmFuc2Zvcm0gYmVmb3JlIHJlbW92aW5nIGl0XG5cdFx0XHRsYXllci5fc2tldy5vbiA9IGZhbHNlO1xuXHRcdFx0bGF5ZXIuX3BhdGgucmVtb3ZlQ2hpbGQobGF5ZXIuX3NrZXcpO1xuXHRcdFx0bGF5ZXIuX3NrZXcgPSBudWxsO1xuXHRcdH1cblx0fSxcblxuXHQvKipcblx0ICogQXBwbGllcyBtYXRyaXggdHJhbnNmb3JtYXRpb24gdG8gVk1MXG5cdCAqIEBwYXJhbSB7TC5QYXRofSAgICAgICAgIGxheWVyXG5cdCAqIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IG1hdHJpeFxuXHQgKi9cblx0dHJhbnNmb3JtUGF0aDogZnVuY3Rpb24obGF5ZXIsIG1hdHJpeCkge1xuXHRcdHZhciBza2V3ID0gbGF5ZXIuX3NrZXc7XG5cblx0XHRpZiAoIXNrZXcpIHtcblx0XHRcdHNrZXcgPSBMLlNWRy5jcmVhdGUoJ3NrZXcnKTtcblx0XHRcdGxheWVyLl9wYXRoLmFwcGVuZENoaWxkKHNrZXcpO1xuXHRcdFx0c2tldy5zdHlsZS5iZWhhdmlvciA9ICd1cmwoI2RlZmF1bHQjVk1MKSc7XG5cdFx0XHRsYXllci5fc2tldyA9IHNrZXc7XG5cdFx0fVxuXG5cdFx0Ly8gaGFuZGxlIHNrZXcvdHJhbnNsYXRlIHNlcGFyYXRlbHksIGNhdXNlIGl0J3MgYnJva2VuXG5cdFx0dmFyIG10ID0gbWF0cml4WzBdLnRvRml4ZWQoOCkgKyAnICcgKyBtYXRyaXhbMV0udG9GaXhlZCg4KSArICcgJyArXG5cdFx0XHRtYXRyaXhbMl0udG9GaXhlZCg4KSArICcgJyArIG1hdHJpeFszXS50b0ZpeGVkKDgpICsgJyAwIDAnO1xuXHRcdHZhciBvZmZzZXQgPSBNYXRoLmZsb29yKG1hdHJpeFs0XSkudG9GaXhlZCgpICsgJywgJyArXG5cdFx0XHRNYXRoLmZsb29yKG1hdHJpeFs1XSkudG9GaXhlZCgpICsgJyc7XG5cblx0XHR2YXIgcyA9IHRoaXMuX3BhdGguc3R5bGU7XG5cdFx0dmFyIGwgPSBwYXJzZUZsb2F0KHMubGVmdCk7XG5cdFx0dmFyIHQgPSBwYXJzZUZsb2F0KHMudG9wKTtcblx0XHR2YXIgdyA9IHBhcnNlRmxvYXQocy53aWR0aCk7XG5cdFx0dmFyIGggPSBwYXJzZUZsb2F0KHMuaGVpZ2h0KTtcblxuXHRcdGlmIChpc05hTihsKSkgeyBsID0gMDsgfVxuXHRcdGlmIChpc05hTih0KSkgeyB0ID0gMDsgfVxuXHRcdGlmIChpc05hTih3KSB8fCAhdykgeyB3ID0gMTsgfVxuXHRcdGlmIChpc05hTihoKSB8fCAhaCkgeyBoID0gMTsgfVxuXG5cdFx0dmFyIG9yaWdpbiA9ICgtbCAvIHcgLSAwLjUpLnRvRml4ZWQoOCkgKyAnICcgKyAoLXQgLyBoIC0gMC41KS50b0ZpeGVkKDgpO1xuXG5cdFx0c2tldy5vbiA9ICdmJztcblx0XHRza2V3Lm1hdHJpeCA9IG10O1xuXHRcdHNrZXcub3JpZ2luID0gb3JpZ2luO1xuXHRcdHNrZXcub2Zmc2V0ID0gb2Zmc2V0O1xuXHRcdHNrZXcub24gPSB0cnVlO1xuXHR9XG5cbn0pO1xuIiwiTC5TVkcuaW5jbHVkZSh7XG5cblx0LyoqXG5cdCAqIFJlc2V0IHRyYW5zZm9ybSBtYXRyaXhcblx0ICovXG5cdF9yZXNldFRyYW5zZm9ybVBhdGg6IGZ1bmN0aW9uKGxheWVyKSB7XG5cdFx0bGF5ZXIuX3BhdGguc2V0QXR0cmlidXRlTlMobnVsbCwgJ3RyYW5zZm9ybScsICcnKTtcblx0fSxcblxuXHQvKipcblx0ICogQXBwbGllcyBtYXRyaXggdHJhbnNmb3JtYXRpb24gdG8gU1ZHXG5cdCAqIEBwYXJhbSB7TC5QYXRofSAgICAgICAgIGxheWVyXG5cdCAqIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IG1hdHJpeFxuXHQgKi9cblx0dHJhbnNmb3JtUGF0aDogZnVuY3Rpb24obGF5ZXIsIG1hdHJpeCkge1xuXHRcdGxheWVyLl9wYXRoLnNldEF0dHJpYnV0ZU5TKG51bGwsICd0cmFuc2Zvcm0nLFxuXHRcdFx0J21hdHJpeCgnICsgbWF0cml4LmpvaW4oJyAnKSArICcpJyk7XG5cdH1cblxufSk7XG4iLCIvKlxuIExlYWZsZXQgMS4wLjAtYmV0YS4yICg1NWZlNDYyKSwgYSBKUyBsaWJyYXJ5IGZvciBpbnRlcmFjdGl2ZSBtYXBzLiBodHRwOi8vbGVhZmxldGpzLmNvbVxuIChjKSAyMDEwLTIwMTUgVmxhZGltaXIgQWdhZm9ua2luLCAoYykgMjAxMC0yMDExIENsb3VkTWFkZVxuKi9cbihmdW5jdGlvbiAod2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKSB7XHJcbnZhciBMID0ge1xyXG5cdHZlcnNpb246ICcxLjAuMC1iZXRhLjInXHJcbn07XHJcblxyXG5mdW5jdGlvbiBleHBvc2UoKSB7XHJcblx0dmFyIG9sZEwgPSB3aW5kb3cuTDtcclxuXHJcblx0TC5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0d2luZG93LkwgPSBvbGRMO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0d2luZG93LkwgPSBMO1xyXG59XHJcblxyXG4vLyBkZWZpbmUgTGVhZmxldCBmb3IgTm9kZSBtb2R1bGUgcGF0dGVybiBsb2FkZXJzLCBpbmNsdWRpbmcgQnJvd3NlcmlmeVxyXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xyXG5cdG1vZHVsZS5leHBvcnRzID0gTDtcclxuXHJcbi8vIGRlZmluZSBMZWFmbGV0IGFzIGFuIEFNRCBtb2R1bGVcclxufSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcclxuXHRkZWZpbmUoTCk7XHJcbn1cclxuXHJcbi8vIGRlZmluZSBMZWFmbGV0IGFzIGEgZ2xvYmFsIEwgdmFyaWFibGUsIHNhdmluZyB0aGUgb3JpZ2luYWwgTCB0byByZXN0b3JlIGxhdGVyIGlmIG5lZWRlZFxyXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRleHBvc2UoKTtcclxufVxyXG5cblxuXG4vKlxyXG4gKiBMLlV0aWwgY29udGFpbnMgdmFyaW91cyB1dGlsaXR5IGZ1bmN0aW9ucyB1c2VkIHRocm91Z2hvdXQgTGVhZmxldCBjb2RlLlxyXG4gKi9cclxuXHJcbkwuVXRpbCA9IHtcclxuXHQvLyBleHRlbmQgYW4gb2JqZWN0IHdpdGggcHJvcGVydGllcyBvZiBvbmUgb3IgbW9yZSBvdGhlciBvYmplY3RzXHJcblx0ZXh0ZW5kOiBmdW5jdGlvbiAoZGVzdCkge1xyXG5cdFx0dmFyIGksIGosIGxlbiwgc3JjO1xyXG5cclxuXHRcdGZvciAoaiA9IDEsIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGogPCBsZW47IGorKykge1xyXG5cdFx0XHRzcmMgPSBhcmd1bWVudHNbal07XHJcblx0XHRcdGZvciAoaSBpbiBzcmMpIHtcclxuXHRcdFx0XHRkZXN0W2ldID0gc3JjW2ldO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZGVzdDtcclxuXHR9LFxyXG5cclxuXHQvLyBjcmVhdGUgYW4gb2JqZWN0IGZyb20gYSBnaXZlbiBwcm90b3R5cGVcclxuXHRjcmVhdGU6IE9iamVjdC5jcmVhdGUgfHwgKGZ1bmN0aW9uICgpIHtcclxuXHRcdGZ1bmN0aW9uIEYoKSB7fVxyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uIChwcm90bykge1xyXG5cdFx0XHRGLnByb3RvdHlwZSA9IHByb3RvO1xyXG5cdFx0XHRyZXR1cm4gbmV3IEYoKTtcclxuXHRcdH07XHJcblx0fSkoKSxcclxuXHJcblx0Ly8gYmluZCBhIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aXRoIGEgZ2l2ZW4gY29udGV4dFxyXG5cdGJpbmQ6IGZ1bmN0aW9uIChmbiwgb2JqKSB7XHJcblx0XHR2YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XHJcblxyXG5cdFx0aWYgKGZuLmJpbmQpIHtcclxuXHRcdFx0cmV0dXJuIGZuLmJpbmQuYXBwbHkoZm4sIHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XHJcblxyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIGZuLmFwcGx5KG9iaiwgYXJncy5sZW5ndGggPyBhcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpIDogYXJndW1lbnRzKTtcclxuXHRcdH07XHJcblx0fSxcclxuXHJcblx0Ly8gcmV0dXJuIHVuaXF1ZSBJRCBvZiBhbiBvYmplY3RcclxuXHRzdGFtcDogZnVuY3Rpb24gKG9iaikge1xyXG5cdFx0Lyplc2xpbnQtZGlzYWJsZSAqL1xyXG5cdFx0b2JqLl9sZWFmbGV0X2lkID0gb2JqLl9sZWFmbGV0X2lkIHx8ICsrTC5VdGlsLmxhc3RJZDtcclxuXHRcdHJldHVybiBvYmouX2xlYWZsZXRfaWQ7XHJcblx0XHQvKmVzbGludC1lbmFibGUgKi9cclxuXHR9LFxyXG5cclxuXHRsYXN0SWQ6IDAsXHJcblxyXG5cdC8vIHJldHVybiBhIGZ1bmN0aW9uIHRoYXQgd29uJ3QgYmUgY2FsbGVkIG1vcmUgb2Z0ZW4gdGhhbiB0aGUgZ2l2ZW4gaW50ZXJ2YWxcclxuXHR0aHJvdHRsZTogZnVuY3Rpb24gKGZuLCB0aW1lLCBjb250ZXh0KSB7XHJcblx0XHR2YXIgbG9jaywgYXJncywgd3JhcHBlckZuLCBsYXRlcjtcclxuXHJcblx0XHRsYXRlciA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Ly8gcmVzZXQgbG9jayBhbmQgY2FsbCBpZiBxdWV1ZWRcclxuXHRcdFx0bG9jayA9IGZhbHNlO1xyXG5cdFx0XHRpZiAoYXJncykge1xyXG5cdFx0XHRcdHdyYXBwZXJGbi5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuXHRcdFx0XHRhcmdzID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0d3JhcHBlckZuID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAobG9jaykge1xyXG5cdFx0XHRcdC8vIGNhbGxlZCB0b28gc29vbiwgcXVldWUgdG8gY2FsbCBsYXRlclxyXG5cdFx0XHRcdGFyZ3MgPSBhcmd1bWVudHM7XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIGNhbGwgYW5kIGxvY2sgdW50aWwgbGF0ZXJcclxuXHRcdFx0XHRmbi5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpO1xyXG5cdFx0XHRcdHNldFRpbWVvdXQobGF0ZXIsIHRpbWUpO1xyXG5cdFx0XHRcdGxvY2sgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiB3cmFwcGVyRm47XHJcblx0fSxcclxuXHJcblx0Ly8gd3JhcCB0aGUgZ2l2ZW4gbnVtYmVyIHRvIGxpZSB3aXRoaW4gYSBjZXJ0YWluIHJhbmdlICh1c2VkIGZvciB3cmFwcGluZyBsb25naXR1ZGUpXHJcblx0d3JhcE51bTogZnVuY3Rpb24gKHgsIHJhbmdlLCBpbmNsdWRlTWF4KSB7XHJcblx0XHR2YXIgbWF4ID0gcmFuZ2VbMV0sXHJcblx0XHQgICAgbWluID0gcmFuZ2VbMF0sXHJcblx0XHQgICAgZCA9IG1heCAtIG1pbjtcclxuXHRcdHJldHVybiB4ID09PSBtYXggJiYgaW5jbHVkZU1heCA/IHggOiAoKHggLSBtaW4pICUgZCArIGQpICUgZCArIG1pbjtcclxuXHR9LFxyXG5cclxuXHQvLyBkbyBub3RoaW5nICh1c2VkIGFzIGEgbm9vcCB0aHJvdWdob3V0IHRoZSBjb2RlKVxyXG5cdGZhbHNlRm46IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9LFxyXG5cclxuXHQvLyByb3VuZCBhIGdpdmVuIG51bWJlciB0byBhIGdpdmVuIHByZWNpc2lvblxyXG5cdGZvcm1hdE51bTogZnVuY3Rpb24gKG51bSwgZGlnaXRzKSB7XHJcblx0XHR2YXIgcG93ID0gTWF0aC5wb3coMTAsIGRpZ2l0cyB8fCA1KTtcclxuXHRcdHJldHVybiBNYXRoLnJvdW5kKG51bSAqIHBvdykgLyBwb3c7XHJcblx0fSxcclxuXHJcblx0Ly8gdHJpbSB3aGl0ZXNwYWNlIGZyb20gYm90aCBzaWRlcyBvZiBhIHN0cmluZ1xyXG5cdHRyaW06IGZ1bmN0aW9uIChzdHIpIHtcclxuXHRcdHJldHVybiBzdHIudHJpbSA/IHN0ci50cmltKCkgOiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xyXG5cdH0sXHJcblxyXG5cdC8vIHNwbGl0IGEgc3RyaW5nIGludG8gd29yZHNcclxuXHRzcGxpdFdvcmRzOiBmdW5jdGlvbiAoc3RyKSB7XHJcblx0XHRyZXR1cm4gTC5VdGlsLnRyaW0oc3RyKS5zcGxpdCgvXFxzKy8pO1xyXG5cdH0sXHJcblxyXG5cdC8vIHNldCBvcHRpb25zIHRvIGFuIG9iamVjdCwgaW5oZXJpdGluZyBwYXJlbnQncyBvcHRpb25zIGFzIHdlbGxcclxuXHRzZXRPcHRpb25zOiBmdW5jdGlvbiAob2JqLCBvcHRpb25zKSB7XHJcblx0XHRpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eSgnb3B0aW9ucycpKSB7XHJcblx0XHRcdG9iai5vcHRpb25zID0gb2JqLm9wdGlvbnMgPyBMLlV0aWwuY3JlYXRlKG9iai5vcHRpb25zKSA6IHt9O1xyXG5cdFx0fVxyXG5cdFx0Zm9yICh2YXIgaSBpbiBvcHRpb25zKSB7XHJcblx0XHRcdG9iai5vcHRpb25zW2ldID0gb3B0aW9uc1tpXTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBvYmoub3B0aW9ucztcclxuXHR9LFxyXG5cclxuXHQvLyBtYWtlIGEgVVJMIHdpdGggR0VUIHBhcmFtZXRlcnMgb3V0IG9mIGEgc2V0IG9mIHByb3BlcnRpZXMvdmFsdWVzXHJcblx0Z2V0UGFyYW1TdHJpbmc6IGZ1bmN0aW9uIChvYmosIGV4aXN0aW5nVXJsLCB1cHBlcmNhc2UpIHtcclxuXHRcdHZhciBwYXJhbXMgPSBbXTtcclxuXHRcdGZvciAodmFyIGkgaW4gb2JqKSB7XHJcblx0XHRcdHBhcmFtcy5wdXNoKGVuY29kZVVSSUNvbXBvbmVudCh1cHBlcmNhc2UgPyBpLnRvVXBwZXJDYXNlKCkgOiBpKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmpbaV0pKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiAoKCFleGlzdGluZ1VybCB8fCBleGlzdGluZ1VybC5pbmRleE9mKCc/JykgPT09IC0xKSA/ICc/JyA6ICcmJykgKyBwYXJhbXMuam9pbignJicpO1xyXG5cdH0sXHJcblxyXG5cdC8vIHN1cGVyLXNpbXBsZSB0ZW1wbGF0aW5nIGZhY2lsaXR5LCB1c2VkIGZvciBUaWxlTGF5ZXIgVVJMc1xyXG5cdHRlbXBsYXRlOiBmdW5jdGlvbiAoc3RyLCBkYXRhKSB7XHJcblx0XHRyZXR1cm4gc3RyLnJlcGxhY2UoTC5VdGlsLnRlbXBsYXRlUmUsIGZ1bmN0aW9uIChzdHIsIGtleSkge1xyXG5cdFx0XHR2YXIgdmFsdWUgPSBkYXRhW2tleV07XHJcblxyXG5cdFx0XHRpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignTm8gdmFsdWUgcHJvdmlkZWQgZm9yIHZhcmlhYmxlICcgKyBzdHIpO1xyXG5cclxuXHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHR2YWx1ZSA9IHZhbHVlKGRhdGEpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB2YWx1ZTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdHRlbXBsYXRlUmU6IC9cXHsgKihbXFx3X10rKSAqXFx9L2csXHJcblxyXG5cdGlzQXJyYXk6IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKG9iaikge1xyXG5cdFx0cmV0dXJuIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJyk7XHJcblx0fSxcclxuXHJcblx0aW5kZXhPZjogZnVuY3Rpb24gKGFycmF5LCBlbCkge1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAoYXJyYXlbaV0gPT09IGVsKSB7IHJldHVybiBpOyB9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gLTE7XHJcblx0fSxcclxuXHJcblx0Ly8gbWluaW1hbCBpbWFnZSBVUkksIHNldCB0byBhbiBpbWFnZSB3aGVuIGRpc3Bvc2luZyB0byBmbHVzaCBtZW1vcnlcclxuXHRlbXB0eUltYWdlVXJsOiAnZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFBRC9BQ3dBQUFBQUFRQUJBQUFDQURzPSdcclxufTtcclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcblx0Ly8gaW5zcGlyZWQgYnkgaHR0cDovL3BhdWxpcmlzaC5jb20vMjAxMS9yZXF1ZXN0YW5pbWF0aW9uZnJhbWUtZm9yLXNtYXJ0LWFuaW1hdGluZy9cclxuXHJcblx0ZnVuY3Rpb24gZ2V0UHJlZml4ZWQobmFtZSkge1xyXG5cdFx0cmV0dXJuIHdpbmRvd1snd2Via2l0JyArIG5hbWVdIHx8IHdpbmRvd1snbW96JyArIG5hbWVdIHx8IHdpbmRvd1snbXMnICsgbmFtZV07XHJcblx0fVxyXG5cclxuXHR2YXIgbGFzdFRpbWUgPSAwO1xyXG5cclxuXHQvLyBmYWxsYmFjayBmb3IgSUUgNy04XHJcblx0ZnVuY3Rpb24gdGltZW91dERlZmVyKGZuKSB7XHJcblx0XHR2YXIgdGltZSA9ICtuZXcgRGF0ZSgpLFxyXG5cdFx0ICAgIHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCAxNiAtICh0aW1lIC0gbGFzdFRpbWUpKTtcclxuXHJcblx0XHRsYXN0VGltZSA9IHRpbWUgKyB0aW1lVG9DYWxsO1xyXG5cdFx0cmV0dXJuIHdpbmRvdy5zZXRUaW1lb3V0KGZuLCB0aW1lVG9DYWxsKTtcclxuXHR9XHJcblxyXG5cdHZhciByZXF1ZXN0Rm4gPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IGdldFByZWZpeGVkKCdSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnKSB8fCB0aW1lb3V0RGVmZXIsXHJcblx0ICAgIGNhbmNlbEZuID0gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IGdldFByZWZpeGVkKCdDYW5jZWxBbmltYXRpb25GcmFtZScpIHx8XHJcblx0ICAgICAgICAgICAgICAgZ2V0UHJlZml4ZWQoJ0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZScpIHx8IGZ1bmN0aW9uIChpZCkgeyB3aW5kb3cuY2xlYXJUaW1lb3V0KGlkKTsgfTtcclxuXHJcblxyXG5cdEwuVXRpbC5yZXF1ZXN0QW5pbUZyYW1lID0gZnVuY3Rpb24gKGZuLCBjb250ZXh0LCBpbW1lZGlhdGUpIHtcclxuXHRcdGlmIChpbW1lZGlhdGUgJiYgcmVxdWVzdEZuID09PSB0aW1lb3V0RGVmZXIpIHtcclxuXHRcdFx0Zm4uY2FsbChjb250ZXh0KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiByZXF1ZXN0Rm4uY2FsbCh3aW5kb3csIEwuYmluZChmbiwgY29udGV4dCkpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdEwuVXRpbC5jYW5jZWxBbmltRnJhbWUgPSBmdW5jdGlvbiAoaWQpIHtcclxuXHRcdGlmIChpZCkge1xyXG5cdFx0XHRjYW5jZWxGbi5jYWxsKHdpbmRvdywgaWQpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn0pKCk7XHJcblxyXG4vLyBzaG9ydGN1dHMgZm9yIG1vc3QgdXNlZCB1dGlsaXR5IGZ1bmN0aW9uc1xyXG5MLmV4dGVuZCA9IEwuVXRpbC5leHRlbmQ7XHJcbkwuYmluZCA9IEwuVXRpbC5iaW5kO1xyXG5MLnN0YW1wID0gTC5VdGlsLnN0YW1wO1xyXG5MLnNldE9wdGlvbnMgPSBMLlV0aWwuc2V0T3B0aW9ucztcclxuXG5cblxuLypcclxuICogTC5DbGFzcyBwb3dlcnMgdGhlIE9PUCBmYWNpbGl0aWVzIG9mIHRoZSBsaWJyYXJ5LlxyXG4gKiBUaGFua3MgdG8gSm9obiBSZXNpZyBhbmQgRGVhbiBFZHdhcmRzIGZvciBpbnNwaXJhdGlvbiFcclxuICovXHJcblxyXG5MLkNsYXNzID0gZnVuY3Rpb24gKCkge307XHJcblxyXG5MLkNsYXNzLmV4dGVuZCA9IGZ1bmN0aW9uIChwcm9wcykge1xyXG5cclxuXHQvLyBleHRlbmRlZCBjbGFzcyB3aXRoIHRoZSBuZXcgcHJvdG90eXBlXHJcblx0dmFyIE5ld0NsYXNzID0gZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdC8vIGNhbGwgdGhlIGNvbnN0cnVjdG9yXHJcblx0XHRpZiAodGhpcy5pbml0aWFsaXplKSB7XHJcblx0XHRcdHRoaXMuaW5pdGlhbGl6ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGNhbGwgYWxsIGNvbnN0cnVjdG9yIGhvb2tzXHJcblx0XHR0aGlzLmNhbGxJbml0SG9va3MoKTtcclxuXHR9O1xyXG5cclxuXHR2YXIgcGFyZW50UHJvdG8gPSBOZXdDbGFzcy5fX3N1cGVyX18gPSB0aGlzLnByb3RvdHlwZTtcclxuXHJcblx0dmFyIHByb3RvID0gTC5VdGlsLmNyZWF0ZShwYXJlbnRQcm90byk7XHJcblx0cHJvdG8uY29uc3RydWN0b3IgPSBOZXdDbGFzcztcclxuXHJcblx0TmV3Q2xhc3MucHJvdG90eXBlID0gcHJvdG87XHJcblxyXG5cdC8vIGluaGVyaXQgcGFyZW50J3Mgc3RhdGljc1xyXG5cdGZvciAodmFyIGkgaW4gdGhpcykge1xyXG5cdFx0aWYgKHRoaXMuaGFzT3duUHJvcGVydHkoaSkgJiYgaSAhPT0gJ3Byb3RvdHlwZScpIHtcclxuXHRcdFx0TmV3Q2xhc3NbaV0gPSB0aGlzW2ldO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gbWl4IHN0YXRpYyBwcm9wZXJ0aWVzIGludG8gdGhlIGNsYXNzXHJcblx0aWYgKHByb3BzLnN0YXRpY3MpIHtcclxuXHRcdEwuZXh0ZW5kKE5ld0NsYXNzLCBwcm9wcy5zdGF0aWNzKTtcclxuXHRcdGRlbGV0ZSBwcm9wcy5zdGF0aWNzO1xyXG5cdH1cclxuXHJcblx0Ly8gbWl4IGluY2x1ZGVzIGludG8gdGhlIHByb3RvdHlwZVxyXG5cdGlmIChwcm9wcy5pbmNsdWRlcykge1xyXG5cdFx0TC5VdGlsLmV4dGVuZC5hcHBseShudWxsLCBbcHJvdG9dLmNvbmNhdChwcm9wcy5pbmNsdWRlcykpO1xyXG5cdFx0ZGVsZXRlIHByb3BzLmluY2x1ZGVzO1xyXG5cdH1cclxuXHJcblx0Ly8gbWVyZ2Ugb3B0aW9uc1xyXG5cdGlmIChwcm90by5vcHRpb25zKSB7XHJcblx0XHRwcm9wcy5vcHRpb25zID0gTC5VdGlsLmV4dGVuZChMLlV0aWwuY3JlYXRlKHByb3RvLm9wdGlvbnMpLCBwcm9wcy5vcHRpb25zKTtcclxuXHR9XHJcblxyXG5cdC8vIG1peCBnaXZlbiBwcm9wZXJ0aWVzIGludG8gdGhlIHByb3RvdHlwZVxyXG5cdEwuZXh0ZW5kKHByb3RvLCBwcm9wcyk7XHJcblxyXG5cdHByb3RvLl9pbml0SG9va3MgPSBbXTtcclxuXHJcblx0Ly8gYWRkIG1ldGhvZCBmb3IgY2FsbGluZyBhbGwgaG9va3NcclxuXHRwcm90by5jYWxsSW5pdEhvb2tzID0gZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdGlmICh0aGlzLl9pbml0SG9va3NDYWxsZWQpIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0aWYgKHBhcmVudFByb3RvLmNhbGxJbml0SG9va3MpIHtcclxuXHRcdFx0cGFyZW50UHJvdG8uY2FsbEluaXRIb29rcy5jYWxsKHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX2luaXRIb29rc0NhbGxlZCA9IHRydWU7XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IHByb3RvLl9pbml0SG9va3MubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0cHJvdG8uX2luaXRIb29rc1tpXS5jYWxsKHRoaXMpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdHJldHVybiBOZXdDbGFzcztcclxufTtcclxuXHJcblxyXG4vLyBtZXRob2QgZm9yIGFkZGluZyBwcm9wZXJ0aWVzIHRvIHByb3RvdHlwZVxyXG5MLkNsYXNzLmluY2x1ZGUgPSBmdW5jdGlvbiAocHJvcHMpIHtcclxuXHRMLmV4dGVuZCh0aGlzLnByb3RvdHlwZSwgcHJvcHMpO1xyXG59O1xyXG5cclxuLy8gbWVyZ2UgbmV3IGRlZmF1bHQgb3B0aW9ucyB0byB0aGUgQ2xhc3NcclxuTC5DbGFzcy5tZXJnZU9wdGlvbnMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG5cdEwuZXh0ZW5kKHRoaXMucHJvdG90eXBlLm9wdGlvbnMsIG9wdGlvbnMpO1xyXG59O1xyXG5cclxuLy8gYWRkIGEgY29uc3RydWN0b3IgaG9va1xyXG5MLkNsYXNzLmFkZEluaXRIb29rID0gZnVuY3Rpb24gKGZuKSB7IC8vIChGdW5jdGlvbikgfHwgKFN0cmluZywgYXJncy4uLilcclxuXHR2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XHJcblxyXG5cdHZhciBpbml0ID0gdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nID8gZm4gOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzW2ZuXS5hcHBseSh0aGlzLCBhcmdzKTtcclxuXHR9O1xyXG5cclxuXHR0aGlzLnByb3RvdHlwZS5faW5pdEhvb2tzID0gdGhpcy5wcm90b3R5cGUuX2luaXRIb29rcyB8fCBbXTtcclxuXHR0aGlzLnByb3RvdHlwZS5faW5pdEhvb2tzLnB1c2goaW5pdCk7XHJcbn07XHJcblxuXG5cbi8qXHJcbiAqIEwuRXZlbnRlZCBpcyBhIGJhc2UgY2xhc3MgdGhhdCBMZWFmbGV0IGNsYXNzZXMgaW5oZXJpdCBmcm9tIHRvIGhhbmRsZSBjdXN0b20gZXZlbnRzLlxyXG4gKi9cclxuXHJcbkwuRXZlbnRlZCA9IEwuQ2xhc3MuZXh0ZW5kKHtcclxuXHJcblx0b246IGZ1bmN0aW9uICh0eXBlcywgZm4sIGNvbnRleHQpIHtcclxuXHJcblx0XHQvLyB0eXBlcyBjYW4gYmUgYSBtYXAgb2YgdHlwZXMvaGFuZGxlcnNcclxuXHRcdGlmICh0eXBlb2YgdHlwZXMgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdGZvciAodmFyIHR5cGUgaW4gdHlwZXMpIHtcclxuXHRcdFx0XHQvLyB3ZSBkb24ndCBwcm9jZXNzIHNwYWNlLXNlcGFyYXRlZCBldmVudHMgaGVyZSBmb3IgcGVyZm9ybWFuY2U7XHJcblx0XHRcdFx0Ly8gaXQncyBhIGhvdCBwYXRoIHNpbmNlIExheWVyIHVzZXMgdGhlIG9uKG9iaikgc3ludGF4XHJcblx0XHRcdFx0dGhpcy5fb24odHlwZSwgdHlwZXNbdHlwZV0sIGZuKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdC8vIHR5cGVzIGNhbiBiZSBhIHN0cmluZyBvZiBzcGFjZS1zZXBhcmF0ZWQgd29yZHNcclxuXHRcdFx0dHlwZXMgPSBMLlV0aWwuc3BsaXRXb3Jkcyh0eXBlcyk7XHJcblxyXG5cdFx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gdHlwZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0XHR0aGlzLl9vbih0eXBlc1tpXSwgZm4sIGNvbnRleHQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0b2ZmOiBmdW5jdGlvbiAodHlwZXMsIGZuLCBjb250ZXh0KSB7XHJcblxyXG5cdFx0aWYgKCF0eXBlcykge1xyXG5cdFx0XHQvLyBjbGVhciBhbGwgbGlzdGVuZXJzIGlmIGNhbGxlZCB3aXRob3V0IGFyZ3VtZW50c1xyXG5cdFx0XHRkZWxldGUgdGhpcy5fZXZlbnRzO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAodHlwZW9mIHR5cGVzID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRmb3IgKHZhciB0eXBlIGluIHR5cGVzKSB7XHJcblx0XHRcdFx0dGhpcy5fb2ZmKHR5cGUsIHR5cGVzW3R5cGVdLCBmbik7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0eXBlcyA9IEwuVXRpbC5zcGxpdFdvcmRzKHR5cGVzKTtcclxuXHJcblx0XHRcdGZvciAodmFyIGkgPSAwLCBsZW4gPSB0eXBlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRcdHRoaXMuX29mZih0eXBlc1tpXSwgZm4sIGNvbnRleHQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0Ly8gYXR0YWNoIGxpc3RlbmVyICh3aXRob3V0IHN5bnRhY3RpYyBzdWdhciBub3cpXHJcblx0X29uOiBmdW5jdGlvbiAodHlwZSwgZm4sIGNvbnRleHQpIHtcclxuXHJcblx0XHR2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9LFxyXG5cdFx0ICAgIGNvbnRleHRJZCA9IGNvbnRleHQgJiYgY29udGV4dCAhPT0gdGhpcyAmJiBMLnN0YW1wKGNvbnRleHQpO1xyXG5cclxuXHRcdGlmIChjb250ZXh0SWQpIHtcclxuXHRcdFx0Ly8gc3RvcmUgbGlzdGVuZXJzIHdpdGggY3VzdG9tIGNvbnRleHQgaW4gYSBzZXBhcmF0ZSBoYXNoIChpZiBpdCBoYXMgYW4gaWQpO1xyXG5cdFx0XHQvLyBnaXZlcyBhIG1ham9yIHBlcmZvcm1hbmNlIGJvb3N0IHdoZW4gZmlyaW5nIGFuZCByZW1vdmluZyBldmVudHMgKGUuZy4gb24gbWFwIG9iamVjdClcclxuXHJcblx0XHRcdHZhciBpbmRleEtleSA9IHR5cGUgKyAnX2lkeCcsXHJcblx0XHRcdCAgICBpbmRleExlbktleSA9IHR5cGUgKyAnX2xlbicsXHJcblx0XHRcdCAgICB0eXBlSW5kZXggPSBldmVudHNbaW5kZXhLZXldID0gZXZlbnRzW2luZGV4S2V5XSB8fCB7fSxcclxuXHRcdFx0ICAgIGlkID0gTC5zdGFtcChmbikgKyAnXycgKyBjb250ZXh0SWQ7XHJcblxyXG5cdFx0XHRpZiAoIXR5cGVJbmRleFtpZF0pIHtcclxuXHRcdFx0XHR0eXBlSW5kZXhbaWRdID0ge2ZuOiBmbiwgY3R4OiBjb250ZXh0fTtcclxuXHJcblx0XHRcdFx0Ly8ga2VlcCB0cmFjayBvZiB0aGUgbnVtYmVyIG9mIGtleXMgaW4gdGhlIGluZGV4IHRvIHF1aWNrbHkgY2hlY2sgaWYgaXQncyBlbXB0eVxyXG5cdFx0XHRcdGV2ZW50c1tpbmRleExlbktleV0gPSAoZXZlbnRzW2luZGV4TGVuS2V5XSB8fCAwKSArIDE7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyBpbmRpdmlkdWFsIGxheWVycyBtb3N0bHkgdXNlIFwidGhpc1wiIGZvciBjb250ZXh0IGFuZCBkb24ndCBmaXJlIGxpc3RlbmVycyB0b28gb2Z0ZW5cclxuXHRcdFx0Ly8gc28gc2ltcGxlIGFycmF5IG1ha2VzIHRoZSBtZW1vcnkgZm9vdHByaW50IGJldHRlciB3aGlsZSBub3QgZGVncmFkaW5nIHBlcmZvcm1hbmNlXHJcblxyXG5cdFx0XHRldmVudHNbdHlwZV0gPSBldmVudHNbdHlwZV0gfHwgW107XHJcblx0XHRcdGV2ZW50c1t0eXBlXS5wdXNoKHtmbjogZm59KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfb2ZmOiBmdW5jdGlvbiAodHlwZSwgZm4sIGNvbnRleHQpIHtcclxuXHRcdHZhciBldmVudHMgPSB0aGlzLl9ldmVudHMsXHJcblx0XHQgICAgaW5kZXhLZXkgPSB0eXBlICsgJ19pZHgnLFxyXG5cdFx0ICAgIGluZGV4TGVuS2V5ID0gdHlwZSArICdfbGVuJztcclxuXHJcblx0XHRpZiAoIWV2ZW50cykgeyByZXR1cm47IH1cclxuXHJcblx0XHRpZiAoIWZuKSB7XHJcblx0XHRcdC8vIGNsZWFyIGFsbCBsaXN0ZW5lcnMgZm9yIGEgdHlwZSBpZiBmdW5jdGlvbiBpc24ndCBzcGVjaWZpZWRcclxuXHRcdFx0ZGVsZXRlIGV2ZW50c1t0eXBlXTtcclxuXHRcdFx0ZGVsZXRlIGV2ZW50c1tpbmRleEtleV07XHJcblx0XHRcdGRlbGV0ZSBldmVudHNbaW5kZXhMZW5LZXldO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGNvbnRleHRJZCA9IGNvbnRleHQgJiYgY29udGV4dCAhPT0gdGhpcyAmJiBMLnN0YW1wKGNvbnRleHQpLFxyXG5cdFx0ICAgIGxpc3RlbmVycywgaSwgbGVuLCBsaXN0ZW5lciwgaWQ7XHJcblxyXG5cdFx0aWYgKGNvbnRleHRJZCkge1xyXG5cdFx0XHRpZCA9IEwuc3RhbXAoZm4pICsgJ18nICsgY29udGV4dElkO1xyXG5cdFx0XHRsaXN0ZW5lcnMgPSBldmVudHNbaW5kZXhLZXldO1xyXG5cclxuXHRcdFx0aWYgKGxpc3RlbmVycyAmJiBsaXN0ZW5lcnNbaWRdKSB7XHJcblx0XHRcdFx0bGlzdGVuZXIgPSBsaXN0ZW5lcnNbaWRdO1xyXG5cdFx0XHRcdGRlbGV0ZSBsaXN0ZW5lcnNbaWRdO1xyXG5cdFx0XHRcdGV2ZW50c1tpbmRleExlbktleV0tLTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcclxuXHJcblx0XHRcdGlmIChsaXN0ZW5lcnMpIHtcclxuXHRcdFx0XHRmb3IgKGkgPSAwLCBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0XHRcdGlmIChsaXN0ZW5lcnNbaV0uZm4gPT09IGZuKSB7XHJcblx0XHRcdFx0XHRcdGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xyXG5cdFx0XHRcdFx0XHRsaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBzZXQgdGhlIHJlbW92ZWQgbGlzdGVuZXIgdG8gbm9vcCBzbyB0aGF0J3Mgbm90IGNhbGxlZCBpZiByZW1vdmUgaGFwcGVucyBpbiBmaXJlXHJcblx0XHRpZiAobGlzdGVuZXIpIHtcclxuXHRcdFx0bGlzdGVuZXIuZm4gPSBMLlV0aWwuZmFsc2VGbjtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRmaXJlOiBmdW5jdGlvbiAodHlwZSwgZGF0YSwgcHJvcGFnYXRlKSB7XHJcblx0XHRpZiAoIXRoaXMubGlzdGVucyh0eXBlLCBwcm9wYWdhdGUpKSB7IHJldHVybiB0aGlzOyB9XHJcblxyXG5cdFx0dmFyIGV2ZW50ID0gTC5VdGlsLmV4dGVuZCh7fSwgZGF0YSwge3R5cGU6IHR5cGUsIHRhcmdldDogdGhpc30pLFxyXG5cdFx0ICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcclxuXHJcblx0XHRpZiAoZXZlbnRzKSB7XHJcblx0XHRcdHZhciB0eXBlSW5kZXggPSBldmVudHNbdHlwZSArICdfaWR4J10sXHJcblx0XHRcdCAgICBpLCBsZW4sIGxpc3RlbmVycywgaWQ7XHJcblxyXG5cdFx0XHRpZiAoZXZlbnRzW3R5cGVdKSB7XHJcblx0XHRcdFx0Ly8gbWFrZSBzdXJlIGFkZGluZy9yZW1vdmluZyBsaXN0ZW5lcnMgaW5zaWRlIG90aGVyIGxpc3RlbmVycyB3b24ndCBjYXVzZSBpbmZpbml0ZSBsb29wXHJcblx0XHRcdFx0bGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdLnNsaWNlKCk7XHJcblxyXG5cdFx0XHRcdGZvciAoaSA9IDAsIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRcdFx0bGlzdGVuZXJzW2ldLmZuLmNhbGwodGhpcywgZXZlbnQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gZmlyZSBldmVudCBmb3IgdGhlIGNvbnRleHQtaW5kZXhlZCBsaXN0ZW5lcnMgYXMgd2VsbFxyXG5cdFx0XHRmb3IgKGlkIGluIHR5cGVJbmRleCkge1xyXG5cdFx0XHRcdHR5cGVJbmRleFtpZF0uZm4uY2FsbCh0eXBlSW5kZXhbaWRdLmN0eCwgZXZlbnQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHByb3BhZ2F0ZSkge1xyXG5cdFx0XHQvLyBwcm9wYWdhdGUgdGhlIGV2ZW50IHRvIHBhcmVudHMgKHNldCB3aXRoIGFkZEV2ZW50UGFyZW50KVxyXG5cdFx0XHR0aGlzLl9wcm9wYWdhdGVFdmVudChldmVudCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0bGlzdGVuczogZnVuY3Rpb24gKHR5cGUsIHByb3BhZ2F0ZSkge1xyXG5cdFx0dmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcclxuXHJcblx0XHRpZiAoZXZlbnRzICYmIChldmVudHNbdHlwZV0gfHwgZXZlbnRzW3R5cGUgKyAnX2xlbiddKSkgeyByZXR1cm4gdHJ1ZTsgfVxyXG5cclxuXHRcdGlmIChwcm9wYWdhdGUpIHtcclxuXHRcdFx0Ly8gYWxzbyBjaGVjayBwYXJlbnRzIGZvciBsaXN0ZW5lcnMgaWYgZXZlbnQgcHJvcGFnYXRlc1xyXG5cdFx0XHRmb3IgKHZhciBpZCBpbiB0aGlzLl9ldmVudFBhcmVudHMpIHtcclxuXHRcdFx0XHRpZiAodGhpcy5fZXZlbnRQYXJlbnRzW2lkXS5saXN0ZW5zKHR5cGUsIHByb3BhZ2F0ZSkpIHsgcmV0dXJuIHRydWU7IH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0sXHJcblxyXG5cdG9uY2U6IGZ1bmN0aW9uICh0eXBlcywgZm4sIGNvbnRleHQpIHtcclxuXHJcblx0XHRpZiAodHlwZW9mIHR5cGVzID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRmb3IgKHZhciB0eXBlIGluIHR5cGVzKSB7XHJcblx0XHRcdFx0dGhpcy5vbmNlKHR5cGUsIHR5cGVzW3R5cGVdLCBmbik7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGhhbmRsZXIgPSBMLmJpbmQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR0aGlzXHJcblx0XHRcdCAgICAub2ZmKHR5cGVzLCBmbiwgY29udGV4dClcclxuXHRcdFx0ICAgIC5vZmYodHlwZXMsIGhhbmRsZXIsIGNvbnRleHQpO1xyXG5cdFx0fSwgdGhpcyk7XHJcblxyXG5cdFx0Ly8gYWRkIGEgbGlzdGVuZXIgdGhhdCdzIGV4ZWN1dGVkIG9uY2UgYW5kIHJlbW92ZWQgYWZ0ZXIgdGhhdFxyXG5cdFx0cmV0dXJuIHRoaXNcclxuXHRcdCAgICAub24odHlwZXMsIGZuLCBjb250ZXh0KVxyXG5cdFx0ICAgIC5vbih0eXBlcywgaGFuZGxlciwgY29udGV4dCk7XHJcblx0fSxcclxuXHJcblx0Ly8gYWRkcyBhIHBhcmVudCB0byBwcm9wYWdhdGUgZXZlbnRzIHRvICh3aGVuIHlvdSBmaXJlIHdpdGggdHJ1ZSBhcyBhIDNyZCBhcmd1bWVudClcclxuXHRhZGRFdmVudFBhcmVudDogZnVuY3Rpb24gKG9iaikge1xyXG5cdFx0dGhpcy5fZXZlbnRQYXJlbnRzID0gdGhpcy5fZXZlbnRQYXJlbnRzIHx8IHt9O1xyXG5cdFx0dGhpcy5fZXZlbnRQYXJlbnRzW0wuc3RhbXAob2JqKV0gPSBvYmo7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRyZW1vdmVFdmVudFBhcmVudDogZnVuY3Rpb24gKG9iaikge1xyXG5cdFx0aWYgKHRoaXMuX2V2ZW50UGFyZW50cykge1xyXG5cdFx0XHRkZWxldGUgdGhpcy5fZXZlbnRQYXJlbnRzW0wuc3RhbXAob2JqKV07XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRfcHJvcGFnYXRlRXZlbnQ6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRmb3IgKHZhciBpZCBpbiB0aGlzLl9ldmVudFBhcmVudHMpIHtcclxuXHRcdFx0dGhpcy5fZXZlbnRQYXJlbnRzW2lkXS5maXJlKGUudHlwZSwgTC5leHRlbmQoe2xheWVyOiBlLnRhcmdldH0sIGUpLCB0cnVlKTtcclxuXHRcdH1cclxuXHR9XHJcbn0pO1xyXG5cclxudmFyIHByb3RvID0gTC5FdmVudGVkLnByb3RvdHlwZTtcclxuXHJcbi8vIGFsaWFzZXM7IHdlIHNob3VsZCBkaXRjaCB0aG9zZSBldmVudHVhbGx5XHJcbnByb3RvLmFkZEV2ZW50TGlzdGVuZXIgPSBwcm90by5vbjtcclxucHJvdG8ucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IHByb3RvLmNsZWFyQWxsRXZlbnRMaXN0ZW5lcnMgPSBwcm90by5vZmY7XHJcbnByb3RvLmFkZE9uZVRpbWVFdmVudExpc3RlbmVyID0gcHJvdG8ub25jZTtcclxucHJvdG8uZmlyZUV2ZW50ID0gcHJvdG8uZmlyZTtcclxucHJvdG8uaGFzRXZlbnRMaXN0ZW5lcnMgPSBwcm90by5saXN0ZW5zO1xyXG5cclxuTC5NaXhpbiA9IHtFdmVudHM6IHByb3RvfTtcclxuXG5cblxuLypcclxuICogTC5Ccm93c2VyIGhhbmRsZXMgZGlmZmVyZW50IGJyb3dzZXIgYW5kIGZlYXR1cmUgZGV0ZWN0aW9ucyBmb3IgaW50ZXJuYWwgTGVhZmxldCB1c2UuXHJcbiAqL1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuXHJcblx0dmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLFxyXG5cdCAgICBkb2MgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXHJcblxyXG5cdCAgICBpZSA9ICdBY3RpdmVYT2JqZWN0JyBpbiB3aW5kb3csXHJcblxyXG5cdCAgICB3ZWJraXQgICAgPSB1YS5pbmRleE9mKCd3ZWJraXQnKSAhPT0gLTEsXHJcblx0ICAgIHBoYW50b21qcyA9IHVhLmluZGV4T2YoJ3BoYW50b20nKSAhPT0gLTEsXHJcblx0ICAgIGFuZHJvaWQyMyA9IHVhLnNlYXJjaCgnYW5kcm9pZCBbMjNdJykgIT09IC0xLFxyXG5cdCAgICBjaHJvbWUgICAgPSB1YS5pbmRleE9mKCdjaHJvbWUnKSAhPT0gLTEsXHJcblx0ICAgIGdlY2tvICAgICA9IHVhLmluZGV4T2YoJ2dlY2tvJykgIT09IC0xICAmJiAhd2Via2l0ICYmICF3aW5kb3cub3BlcmEgJiYgIWllLFxyXG5cclxuXHQgICAgbW9iaWxlID0gdHlwZW9mIG9yaWVudGF0aW9uICE9PSAndW5kZWZpbmVkJyB8fCB1YS5pbmRleE9mKCdtb2JpbGUnKSAhPT0gLTEsXHJcblx0ICAgIG1zUG9pbnRlciA9ICF3aW5kb3cuUG9pbnRlckV2ZW50ICYmIHdpbmRvdy5NU1BvaW50ZXJFdmVudCxcclxuXHQgICAgcG9pbnRlciA9ICh3aW5kb3cuUG9pbnRlckV2ZW50ICYmIG5hdmlnYXRvci5wb2ludGVyRW5hYmxlZCkgfHwgbXNQb2ludGVyLFxyXG5cclxuXHQgICAgaWUzZCA9IGllICYmICgndHJhbnNpdGlvbicgaW4gZG9jLnN0eWxlKSxcclxuXHQgICAgd2Via2l0M2QgPSAoJ1dlYktpdENTU01hdHJpeCcgaW4gd2luZG93KSAmJiAoJ20xMScgaW4gbmV3IHdpbmRvdy5XZWJLaXRDU1NNYXRyaXgoKSkgJiYgIWFuZHJvaWQyMyxcclxuXHQgICAgZ2Vja28zZCA9ICdNb3pQZXJzcGVjdGl2ZScgaW4gZG9jLnN0eWxlLFxyXG5cdCAgICBvcGVyYTEyID0gJ09UcmFuc2l0aW9uJyBpbiBkb2Muc3R5bGU7XHJcblxyXG5cdHZhciB0b3VjaCA9ICF3aW5kb3cuTF9OT19UT1VDSCAmJiAhcGhhbnRvbWpzICYmIChwb2ludGVyIHx8ICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyB8fFxyXG5cdFx0XHQod2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiB3aW5kb3cuRG9jdW1lbnRUb3VjaCkpO1xyXG5cclxuXHRMLkJyb3dzZXIgPSB7XHJcblx0XHRpZTogaWUsXHJcblx0XHRpZWx0OTogaWUgJiYgIWRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIsXHJcblx0XHR3ZWJraXQ6IHdlYmtpdCxcclxuXHRcdGdlY2tvOiBnZWNrbyxcclxuXHRcdGFuZHJvaWQ6IHVhLmluZGV4T2YoJ2FuZHJvaWQnKSAhPT0gLTEsXHJcblx0XHRhbmRyb2lkMjM6IGFuZHJvaWQyMyxcclxuXHRcdGNocm9tZTogY2hyb21lLFxyXG5cdFx0c2FmYXJpOiAhY2hyb21lICYmIHVhLmluZGV4T2YoJ3NhZmFyaScpICE9PSAtMSxcclxuXHJcblx0XHRpZTNkOiBpZTNkLFxyXG5cdFx0d2Via2l0M2Q6IHdlYmtpdDNkLFxyXG5cdFx0Z2Vja28zZDogZ2Vja28zZCxcclxuXHRcdG9wZXJhMTI6IG9wZXJhMTIsXHJcblx0XHRhbnkzZDogIXdpbmRvdy5MX0RJU0FCTEVfM0QgJiYgKGllM2QgfHwgd2Via2l0M2QgfHwgZ2Vja28zZCkgJiYgIW9wZXJhMTIgJiYgIXBoYW50b21qcyxcclxuXHJcblx0XHRtb2JpbGU6IG1vYmlsZSxcclxuXHRcdG1vYmlsZVdlYmtpdDogbW9iaWxlICYmIHdlYmtpdCxcclxuXHRcdG1vYmlsZVdlYmtpdDNkOiBtb2JpbGUgJiYgd2Via2l0M2QsXHJcblx0XHRtb2JpbGVPcGVyYTogbW9iaWxlICYmIHdpbmRvdy5vcGVyYSxcclxuXHRcdG1vYmlsZUdlY2tvOiBtb2JpbGUgJiYgZ2Vja28sXHJcblxyXG5cdFx0dG91Y2g6ICEhdG91Y2gsXHJcblx0XHRtc1BvaW50ZXI6ICEhbXNQb2ludGVyLFxyXG5cdFx0cG9pbnRlcjogISFwb2ludGVyLFxyXG5cclxuXHRcdHJldGluYTogKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8ICh3aW5kb3cuc2NyZWVuLmRldmljZVhEUEkgLyB3aW5kb3cuc2NyZWVuLmxvZ2ljYWxYRFBJKSkgPiAxXHJcblx0fTtcclxuXHJcbn0oKSk7XHJcblxuXG5cbi8qXHJcbiAqIEwuUG9pbnQgcmVwcmVzZW50cyBhIHBvaW50IHdpdGggeCBhbmQgeSBjb29yZGluYXRlcy5cclxuICovXHJcblxyXG5MLlBvaW50ID0gZnVuY3Rpb24gKHgsIHksIHJvdW5kKSB7XHJcblx0dGhpcy54ID0gKHJvdW5kID8gTWF0aC5yb3VuZCh4KSA6IHgpO1xyXG5cdHRoaXMueSA9IChyb3VuZCA/IE1hdGgucm91bmQoeSkgOiB5KTtcclxufTtcclxuXHJcbkwuUG9pbnQucHJvdG90eXBlID0ge1xyXG5cclxuXHRjbG9uZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIG5ldyBMLlBvaW50KHRoaXMueCwgdGhpcy55KTtcclxuXHR9LFxyXG5cclxuXHQvLyBub24tZGVzdHJ1Y3RpdmUsIHJldHVybnMgYSBuZXcgcG9pbnRcclxuXHRhZGQ6IGZ1bmN0aW9uIChwb2ludCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY2xvbmUoKS5fYWRkKEwucG9pbnQocG9pbnQpKTtcclxuXHR9LFxyXG5cclxuXHQvLyBkZXN0cnVjdGl2ZSwgdXNlZCBkaXJlY3RseSBmb3IgcGVyZm9ybWFuY2UgaW4gc2l0dWF0aW9ucyB3aGVyZSBpdCdzIHNhZmUgdG8gbW9kaWZ5IGV4aXN0aW5nIHBvaW50XHJcblx0X2FkZDogZnVuY3Rpb24gKHBvaW50KSB7XHJcblx0XHR0aGlzLnggKz0gcG9pbnQueDtcclxuXHRcdHRoaXMueSArPSBwb2ludC55O1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0c3VidHJhY3Q6IGZ1bmN0aW9uIChwb2ludCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY2xvbmUoKS5fc3VidHJhY3QoTC5wb2ludChwb2ludCkpO1xyXG5cdH0sXHJcblxyXG5cdF9zdWJ0cmFjdDogZnVuY3Rpb24gKHBvaW50KSB7XHJcblx0XHR0aGlzLnggLT0gcG9pbnQueDtcclxuXHRcdHRoaXMueSAtPSBwb2ludC55O1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0ZGl2aWRlQnk6IGZ1bmN0aW9uIChudW0pIHtcclxuXHRcdHJldHVybiB0aGlzLmNsb25lKCkuX2RpdmlkZUJ5KG51bSk7XHJcblx0fSxcclxuXHJcblx0X2RpdmlkZUJ5OiBmdW5jdGlvbiAobnVtKSB7XHJcblx0XHR0aGlzLnggLz0gbnVtO1xyXG5cdFx0dGhpcy55IC89IG51bTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdG11bHRpcGx5Qnk6IGZ1bmN0aW9uIChudW0pIHtcclxuXHRcdHJldHVybiB0aGlzLmNsb25lKCkuX211bHRpcGx5QnkobnVtKTtcclxuXHR9LFxyXG5cclxuXHRfbXVsdGlwbHlCeTogZnVuY3Rpb24gKG51bSkge1xyXG5cdFx0dGhpcy54ICo9IG51bTtcclxuXHRcdHRoaXMueSAqPSBudW07XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRzY2FsZUJ5OiBmdW5jdGlvbiAocG9pbnQpIHtcclxuXHRcdHJldHVybiBuZXcgTC5Qb2ludCh0aGlzLnggKiBwb2ludC54LCB0aGlzLnkgKiBwb2ludC55KTtcclxuXHR9LFxyXG5cclxuXHR1bnNjYWxlQnk6IGZ1bmN0aW9uIChwb2ludCkge1xyXG5cdFx0cmV0dXJuIG5ldyBMLlBvaW50KHRoaXMueCAvIHBvaW50LngsIHRoaXMueSAvIHBvaW50LnkpO1xyXG5cdH0sXHJcblxyXG5cdHJvdW5kOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jbG9uZSgpLl9yb3VuZCgpO1xyXG5cdH0sXHJcblxyXG5cdF9yb3VuZDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy54ID0gTWF0aC5yb3VuZCh0aGlzLngpO1xyXG5cdFx0dGhpcy55ID0gTWF0aC5yb3VuZCh0aGlzLnkpO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0Zmxvb3I6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLmNsb25lKCkuX2Zsb29yKCk7XHJcblx0fSxcclxuXHJcblx0X2Zsb29yOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLnggPSBNYXRoLmZsb29yKHRoaXMueCk7XHJcblx0XHR0aGlzLnkgPSBNYXRoLmZsb29yKHRoaXMueSk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRjZWlsOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jbG9uZSgpLl9jZWlsKCk7XHJcblx0fSxcclxuXHJcblx0X2NlaWw6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMueCA9IE1hdGguY2VpbCh0aGlzLngpO1xyXG5cdFx0dGhpcy55ID0gTWF0aC5jZWlsKHRoaXMueSk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRkaXN0YW5jZVRvOiBmdW5jdGlvbiAocG9pbnQpIHtcclxuXHRcdHBvaW50ID0gTC5wb2ludChwb2ludCk7XHJcblxyXG5cdFx0dmFyIHggPSBwb2ludC54IC0gdGhpcy54LFxyXG5cdFx0ICAgIHkgPSBwb2ludC55IC0gdGhpcy55O1xyXG5cclxuXHRcdHJldHVybiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSk7XHJcblx0fSxcclxuXHJcblx0ZXF1YWxzOiBmdW5jdGlvbiAocG9pbnQpIHtcclxuXHRcdHBvaW50ID0gTC5wb2ludChwb2ludCk7XHJcblxyXG5cdFx0cmV0dXJuIHBvaW50LnggPT09IHRoaXMueCAmJlxyXG5cdFx0ICAgICAgIHBvaW50LnkgPT09IHRoaXMueTtcclxuXHR9LFxyXG5cclxuXHRjb250YWluczogZnVuY3Rpb24gKHBvaW50KSB7XHJcblx0XHRwb2ludCA9IEwucG9pbnQocG9pbnQpO1xyXG5cclxuXHRcdHJldHVybiBNYXRoLmFicyhwb2ludC54KSA8PSBNYXRoLmFicyh0aGlzLngpICYmXHJcblx0XHQgICAgICAgTWF0aC5hYnMocG9pbnQueSkgPD0gTWF0aC5hYnModGhpcy55KTtcclxuXHR9LFxyXG5cclxuXHR0b1N0cmluZzogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuICdQb2ludCgnICtcclxuXHRcdCAgICAgICAgTC5VdGlsLmZvcm1hdE51bSh0aGlzLngpICsgJywgJyArXHJcblx0XHQgICAgICAgIEwuVXRpbC5mb3JtYXROdW0odGhpcy55KSArICcpJztcclxuXHR9XHJcbn07XHJcblxyXG5MLnBvaW50ID0gZnVuY3Rpb24gKHgsIHksIHJvdW5kKSB7XHJcblx0aWYgKHggaW5zdGFuY2VvZiBMLlBvaW50KSB7XHJcblx0XHRyZXR1cm4geDtcclxuXHR9XHJcblx0aWYgKEwuVXRpbC5pc0FycmF5KHgpKSB7XHJcblx0XHRyZXR1cm4gbmV3IEwuUG9pbnQoeFswXSwgeFsxXSk7XHJcblx0fVxyXG5cdGlmICh4ID09PSB1bmRlZmluZWQgfHwgeCA9PT0gbnVsbCkge1xyXG5cdFx0cmV0dXJuIHg7XHJcblx0fVxyXG5cdHJldHVybiBuZXcgTC5Qb2ludCh4LCB5LCByb3VuZCk7XHJcbn07XHJcblxuXG5cbi8qXHJcbiAqIEwuQm91bmRzIHJlcHJlc2VudHMgYSByZWN0YW5ndWxhciBhcmVhIG9uIHRoZSBzY3JlZW4gaW4gcGl4ZWwgY29vcmRpbmF0ZXMuXHJcbiAqL1xyXG5cclxuTC5Cb3VuZHMgPSBmdW5jdGlvbiAoYSwgYikgeyAvLyAoUG9pbnQsIFBvaW50KSBvciBQb2ludFtdXHJcblx0aWYgKCFhKSB7IHJldHVybjsgfVxyXG5cclxuXHR2YXIgcG9pbnRzID0gYiA/IFthLCBiXSA6IGE7XHJcblxyXG5cdGZvciAodmFyIGkgPSAwLCBsZW4gPSBwb2ludHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdHRoaXMuZXh0ZW5kKHBvaW50c1tpXSk7XHJcblx0fVxyXG59O1xyXG5cclxuTC5Cb3VuZHMucHJvdG90eXBlID0ge1xyXG5cdC8vIGV4dGVuZCB0aGUgYm91bmRzIHRvIGNvbnRhaW4gdGhlIGdpdmVuIHBvaW50XHJcblx0ZXh0ZW5kOiBmdW5jdGlvbiAocG9pbnQpIHsgLy8gKFBvaW50KVxyXG5cdFx0cG9pbnQgPSBMLnBvaW50KHBvaW50KTtcclxuXHJcblx0XHRpZiAoIXRoaXMubWluICYmICF0aGlzLm1heCkge1xyXG5cdFx0XHR0aGlzLm1pbiA9IHBvaW50LmNsb25lKCk7XHJcblx0XHRcdHRoaXMubWF4ID0gcG9pbnQuY2xvbmUoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMubWluLnggPSBNYXRoLm1pbihwb2ludC54LCB0aGlzLm1pbi54KTtcclxuXHRcdFx0dGhpcy5tYXgueCA9IE1hdGgubWF4KHBvaW50LngsIHRoaXMubWF4LngpO1xyXG5cdFx0XHR0aGlzLm1pbi55ID0gTWF0aC5taW4ocG9pbnQueSwgdGhpcy5taW4ueSk7XHJcblx0XHRcdHRoaXMubWF4LnkgPSBNYXRoLm1heChwb2ludC55LCB0aGlzLm1heC55KTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdGdldENlbnRlcjogZnVuY3Rpb24gKHJvdW5kKSB7IC8vIChCb29sZWFuKSAtPiBQb2ludFxyXG5cdFx0cmV0dXJuIG5ldyBMLlBvaW50KFxyXG5cdFx0ICAgICAgICAodGhpcy5taW4ueCArIHRoaXMubWF4LngpIC8gMixcclxuXHRcdCAgICAgICAgKHRoaXMubWluLnkgKyB0aGlzLm1heC55KSAvIDIsIHJvdW5kKTtcclxuXHR9LFxyXG5cclxuXHRnZXRCb3R0b21MZWZ0OiBmdW5jdGlvbiAoKSB7IC8vIC0+IFBvaW50XHJcblx0XHRyZXR1cm4gbmV3IEwuUG9pbnQodGhpcy5taW4ueCwgdGhpcy5tYXgueSk7XHJcblx0fSxcclxuXHJcblx0Z2V0VG9wUmlnaHQ6IGZ1bmN0aW9uICgpIHsgLy8gLT4gUG9pbnRcclxuXHRcdHJldHVybiBuZXcgTC5Qb2ludCh0aGlzLm1heC54LCB0aGlzLm1pbi55KTtcclxuXHR9LFxyXG5cclxuXHRnZXRTaXplOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5tYXguc3VidHJhY3QodGhpcy5taW4pO1xyXG5cdH0sXHJcblxyXG5cdGNvbnRhaW5zOiBmdW5jdGlvbiAob2JqKSB7IC8vIChCb3VuZHMpIG9yIChQb2ludCkgLT4gQm9vbGVhblxyXG5cdFx0dmFyIG1pbiwgbWF4O1xyXG5cclxuXHRcdGlmICh0eXBlb2Ygb2JqWzBdID09PSAnbnVtYmVyJyB8fCBvYmogaW5zdGFuY2VvZiBMLlBvaW50KSB7XHJcblx0XHRcdG9iaiA9IEwucG9pbnQob2JqKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG9iaiA9IEwuYm91bmRzKG9iaik7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG9iaiBpbnN0YW5jZW9mIEwuQm91bmRzKSB7XHJcblx0XHRcdG1pbiA9IG9iai5taW47XHJcblx0XHRcdG1heCA9IG9iai5tYXg7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRtaW4gPSBtYXggPSBvYmo7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIChtaW4ueCA+PSB0aGlzLm1pbi54KSAmJlxyXG5cdFx0ICAgICAgIChtYXgueCA8PSB0aGlzLm1heC54KSAmJlxyXG5cdFx0ICAgICAgIChtaW4ueSA+PSB0aGlzLm1pbi55KSAmJlxyXG5cdFx0ICAgICAgIChtYXgueSA8PSB0aGlzLm1heC55KTtcclxuXHR9LFxyXG5cclxuXHRpbnRlcnNlY3RzOiBmdW5jdGlvbiAoYm91bmRzKSB7IC8vIChCb3VuZHMpIC0+IEJvb2xlYW5cclxuXHRcdGJvdW5kcyA9IEwuYm91bmRzKGJvdW5kcyk7XHJcblxyXG5cdFx0dmFyIG1pbiA9IHRoaXMubWluLFxyXG5cdFx0ICAgIG1heCA9IHRoaXMubWF4LFxyXG5cdFx0ICAgIG1pbjIgPSBib3VuZHMubWluLFxyXG5cdFx0ICAgIG1heDIgPSBib3VuZHMubWF4LFxyXG5cdFx0ICAgIHhJbnRlcnNlY3RzID0gKG1heDIueCA+PSBtaW4ueCkgJiYgKG1pbjIueCA8PSBtYXgueCksXHJcblx0XHQgICAgeUludGVyc2VjdHMgPSAobWF4Mi55ID49IG1pbi55KSAmJiAobWluMi55IDw9IG1heC55KTtcclxuXHJcblx0XHRyZXR1cm4geEludGVyc2VjdHMgJiYgeUludGVyc2VjdHM7XHJcblx0fSxcclxuXHJcblx0b3ZlcmxhcHM6IGZ1bmN0aW9uIChib3VuZHMpIHsgLy8gKEJvdW5kcykgLT4gQm9vbGVhblxyXG5cdFx0Ym91bmRzID0gTC5ib3VuZHMoYm91bmRzKTtcclxuXHJcblx0XHR2YXIgbWluID0gdGhpcy5taW4sXHJcblx0XHQgICAgbWF4ID0gdGhpcy5tYXgsXHJcblx0XHQgICAgbWluMiA9IGJvdW5kcy5taW4sXHJcblx0XHQgICAgbWF4MiA9IGJvdW5kcy5tYXgsXHJcblx0XHQgICAgeE92ZXJsYXBzID0gKG1heDIueCA+IG1pbi54KSAmJiAobWluMi54IDwgbWF4LngpLFxyXG5cdFx0ICAgIHlPdmVybGFwcyA9IChtYXgyLnkgPiBtaW4ueSkgJiYgKG1pbjIueSA8IG1heC55KTtcclxuXHJcblx0XHRyZXR1cm4geE92ZXJsYXBzICYmIHlPdmVybGFwcztcclxuXHR9LFxyXG5cclxuXHRpc1ZhbGlkOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gISEodGhpcy5taW4gJiYgdGhpcy5tYXgpO1xyXG5cdH1cclxufTtcclxuXHJcbkwuYm91bmRzID0gZnVuY3Rpb24gKGEsIGIpIHsgLy8gKEJvdW5kcykgb3IgKFBvaW50LCBQb2ludCkgb3IgKFBvaW50W10pXHJcblx0aWYgKCFhIHx8IGEgaW5zdGFuY2VvZiBMLkJvdW5kcykge1xyXG5cdFx0cmV0dXJuIGE7XHJcblx0fVxyXG5cdHJldHVybiBuZXcgTC5Cb3VuZHMoYSwgYik7XHJcbn07XHJcblxuXG5cbi8qXHJcbiAqIEwuVHJhbnNmb3JtYXRpb24gaXMgYW4gdXRpbGl0eSBjbGFzcyB0byBwZXJmb3JtIHNpbXBsZSBwb2ludCB0cmFuc2Zvcm1hdGlvbnMgdGhyb3VnaCBhIDJkLW1hdHJpeC5cclxuICovXHJcblxyXG5MLlRyYW5zZm9ybWF0aW9uID0gZnVuY3Rpb24gKGEsIGIsIGMsIGQpIHtcclxuXHR0aGlzLl9hID0gYTtcclxuXHR0aGlzLl9iID0gYjtcclxuXHR0aGlzLl9jID0gYztcclxuXHR0aGlzLl9kID0gZDtcclxufTtcclxuXHJcbkwuVHJhbnNmb3JtYXRpb24ucHJvdG90eXBlID0ge1xyXG5cdHRyYW5zZm9ybTogZnVuY3Rpb24gKHBvaW50LCBzY2FsZSkgeyAvLyAoUG9pbnQsIE51bWJlcikgLT4gUG9pbnRcclxuXHRcdHJldHVybiB0aGlzLl90cmFuc2Zvcm0ocG9pbnQuY2xvbmUoKSwgc2NhbGUpO1xyXG5cdH0sXHJcblxyXG5cdC8vIGRlc3RydWN0aXZlIHRyYW5zZm9ybSAoZmFzdGVyKVxyXG5cdF90cmFuc2Zvcm06IGZ1bmN0aW9uIChwb2ludCwgc2NhbGUpIHtcclxuXHRcdHNjYWxlID0gc2NhbGUgfHwgMTtcclxuXHRcdHBvaW50LnggPSBzY2FsZSAqICh0aGlzLl9hICogcG9pbnQueCArIHRoaXMuX2IpO1xyXG5cdFx0cG9pbnQueSA9IHNjYWxlICogKHRoaXMuX2MgKiBwb2ludC55ICsgdGhpcy5fZCk7XHJcblx0XHRyZXR1cm4gcG9pbnQ7XHJcblx0fSxcclxuXHJcblx0dW50cmFuc2Zvcm06IGZ1bmN0aW9uIChwb2ludCwgc2NhbGUpIHtcclxuXHRcdHNjYWxlID0gc2NhbGUgfHwgMTtcclxuXHRcdHJldHVybiBuZXcgTC5Qb2ludChcclxuXHRcdCAgICAgICAgKHBvaW50LnggLyBzY2FsZSAtIHRoaXMuX2IpIC8gdGhpcy5fYSxcclxuXHRcdCAgICAgICAgKHBvaW50LnkgLyBzY2FsZSAtIHRoaXMuX2QpIC8gdGhpcy5fYyk7XHJcblx0fVxyXG59O1xyXG5cblxuXG4vKlxyXG4gKiBMLkRvbVV0aWwgY29udGFpbnMgdmFyaW91cyB1dGlsaXR5IGZ1bmN0aW9ucyBmb3Igd29ya2luZyB3aXRoIERPTS5cclxuICovXHJcblxyXG5MLkRvbVV0aWwgPSB7XHJcblx0Z2V0OiBmdW5jdGlvbiAoaWQpIHtcclxuXHRcdHJldHVybiB0eXBlb2YgaWQgPT09ICdzdHJpbmcnID8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpIDogaWQ7XHJcblx0fSxcclxuXHJcblx0Z2V0U3R5bGU6IGZ1bmN0aW9uIChlbCwgc3R5bGUpIHtcclxuXHJcblx0XHR2YXIgdmFsdWUgPSBlbC5zdHlsZVtzdHlsZV0gfHwgKGVsLmN1cnJlbnRTdHlsZSAmJiBlbC5jdXJyZW50U3R5bGVbc3R5bGVdKTtcclxuXHJcblx0XHRpZiAoKCF2YWx1ZSB8fCB2YWx1ZSA9PT0gJ2F1dG8nKSAmJiBkb2N1bWVudC5kZWZhdWx0Vmlldykge1xyXG5cdFx0XHR2YXIgY3NzID0gZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCk7XHJcblx0XHRcdHZhbHVlID0gY3NzID8gY3NzW3N0eWxlXSA6IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHZhbHVlID09PSAnYXV0bycgPyBudWxsIDogdmFsdWU7XHJcblx0fSxcclxuXHJcblx0Y3JlYXRlOiBmdW5jdGlvbiAodGFnTmFtZSwgY2xhc3NOYW1lLCBjb250YWluZXIpIHtcclxuXHJcblx0XHR2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xyXG5cdFx0ZWwuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xyXG5cclxuXHRcdGlmIChjb250YWluZXIpIHtcclxuXHRcdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGVsKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWw7XHJcblx0fSxcclxuXHJcblx0cmVtb3ZlOiBmdW5jdGlvbiAoZWwpIHtcclxuXHRcdHZhciBwYXJlbnQgPSBlbC5wYXJlbnROb2RlO1xyXG5cdFx0aWYgKHBhcmVudCkge1xyXG5cdFx0XHRwYXJlbnQucmVtb3ZlQ2hpbGQoZWwpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGVtcHR5OiBmdW5jdGlvbiAoZWwpIHtcclxuXHRcdHdoaWxlIChlbC5maXJzdENoaWxkKSB7XHJcblx0XHRcdGVsLnJlbW92ZUNoaWxkKGVsLmZpcnN0Q2hpbGQpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdHRvRnJvbnQ6IGZ1bmN0aW9uIChlbCkge1xyXG5cdFx0ZWwucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChlbCk7XHJcblx0fSxcclxuXHJcblx0dG9CYWNrOiBmdW5jdGlvbiAoZWwpIHtcclxuXHRcdHZhciBwYXJlbnQgPSBlbC5wYXJlbnROb2RlO1xyXG5cdFx0cGFyZW50Lmluc2VydEJlZm9yZShlbCwgcGFyZW50LmZpcnN0Q2hpbGQpO1xyXG5cdH0sXHJcblxyXG5cdGhhc0NsYXNzOiBmdW5jdGlvbiAoZWwsIG5hbWUpIHtcclxuXHRcdGlmIChlbC5jbGFzc0xpc3QgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpO1xyXG5cdFx0fVxyXG5cdFx0dmFyIGNsYXNzTmFtZSA9IEwuRG9tVXRpbC5nZXRDbGFzcyhlbCk7XHJcblx0XHRyZXR1cm4gY2xhc3NOYW1lLmxlbmd0aCA+IDAgJiYgbmV3IFJlZ0V4cCgnKF58XFxcXHMpJyArIG5hbWUgKyAnKFxcXFxzfCQpJykudGVzdChjbGFzc05hbWUpO1xyXG5cdH0sXHJcblxyXG5cdGFkZENsYXNzOiBmdW5jdGlvbiAoZWwsIG5hbWUpIHtcclxuXHRcdGlmIChlbC5jbGFzc0xpc3QgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR2YXIgY2xhc3NlcyA9IEwuVXRpbC5zcGxpdFdvcmRzKG5hbWUpO1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gY2xhc3Nlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRcdGVsLmNsYXNzTGlzdC5hZGQoY2xhc3Nlc1tpXSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoIUwuRG9tVXRpbC5oYXNDbGFzcyhlbCwgbmFtZSkpIHtcclxuXHRcdFx0dmFyIGNsYXNzTmFtZSA9IEwuRG9tVXRpbC5nZXRDbGFzcyhlbCk7XHJcblx0XHRcdEwuRG9tVXRpbC5zZXRDbGFzcyhlbCwgKGNsYXNzTmFtZSA/IGNsYXNzTmFtZSArICcgJyA6ICcnKSArIG5hbWUpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdHJlbW92ZUNsYXNzOiBmdW5jdGlvbiAoZWwsIG5hbWUpIHtcclxuXHRcdGlmIChlbC5jbGFzc0xpc3QgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRlbC5jbGFzc0xpc3QucmVtb3ZlKG5hbWUpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0TC5Eb21VdGlsLnNldENsYXNzKGVsLCBMLlV0aWwudHJpbSgoJyAnICsgTC5Eb21VdGlsLmdldENsYXNzKGVsKSArICcgJykucmVwbGFjZSgnICcgKyBuYW1lICsgJyAnLCAnICcpKSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0c2V0Q2xhc3M6IGZ1bmN0aW9uIChlbCwgbmFtZSkge1xyXG5cdFx0aWYgKGVsLmNsYXNzTmFtZS5iYXNlVmFsID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0ZWwuY2xhc3NOYW1lID0gbmFtZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdC8vIGluIGNhc2Ugb2YgU1ZHIGVsZW1lbnRcclxuXHRcdFx0ZWwuY2xhc3NOYW1lLmJhc2VWYWwgPSBuYW1lO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGdldENsYXNzOiBmdW5jdGlvbiAoZWwpIHtcclxuXHRcdHJldHVybiBlbC5jbGFzc05hbWUuYmFzZVZhbCA9PT0gdW5kZWZpbmVkID8gZWwuY2xhc3NOYW1lIDogZWwuY2xhc3NOYW1lLmJhc2VWYWw7XHJcblx0fSxcclxuXHJcblx0c2V0T3BhY2l0eTogZnVuY3Rpb24gKGVsLCB2YWx1ZSkge1xyXG5cclxuXHRcdGlmICgnb3BhY2l0eScgaW4gZWwuc3R5bGUpIHtcclxuXHRcdFx0ZWwuc3R5bGUub3BhY2l0eSA9IHZhbHVlO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoJ2ZpbHRlcicgaW4gZWwuc3R5bGUpIHtcclxuXHRcdFx0TC5Eb21VdGlsLl9zZXRPcGFjaXR5SUUoZWwsIHZhbHVlKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfc2V0T3BhY2l0eUlFOiBmdW5jdGlvbiAoZWwsIHZhbHVlKSB7XHJcblx0XHR2YXIgZmlsdGVyID0gZmFsc2UsXHJcblx0XHQgICAgZmlsdGVyTmFtZSA9ICdEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5BbHBoYSc7XHJcblxyXG5cdFx0Ly8gZmlsdGVycyBjb2xsZWN0aW9uIHRocm93cyBhbiBlcnJvciBpZiB3ZSB0cnkgdG8gcmV0cmlldmUgYSBmaWx0ZXIgdGhhdCBkb2Vzbid0IGV4aXN0XHJcblx0XHR0cnkge1xyXG5cdFx0XHRmaWx0ZXIgPSBlbC5maWx0ZXJzLml0ZW0oZmlsdGVyTmFtZSk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdC8vIGRvbid0IHNldCBvcGFjaXR5IHRvIDEgaWYgd2UgaGF2ZW4ndCBhbHJlYWR5IHNldCBhbiBvcGFjaXR5LFxyXG5cdFx0XHQvLyBpdCBpc24ndCBuZWVkZWQgYW5kIGJyZWFrcyB0cmFuc3BhcmVudCBwbmdzLlxyXG5cdFx0XHRpZiAodmFsdWUgPT09IDEpIHsgcmV0dXJuOyB9XHJcblx0XHR9XHJcblxyXG5cdFx0dmFsdWUgPSBNYXRoLnJvdW5kKHZhbHVlICogMTAwKTtcclxuXHJcblx0XHRpZiAoZmlsdGVyKSB7XHJcblx0XHRcdGZpbHRlci5FbmFibGVkID0gKHZhbHVlICE9PSAxMDApO1xyXG5cdFx0XHRmaWx0ZXIuT3BhY2l0eSA9IHZhbHVlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZWwuc3R5bGUuZmlsdGVyICs9ICcgcHJvZ2lkOicgKyBmaWx0ZXJOYW1lICsgJyhvcGFjaXR5PScgKyB2YWx1ZSArICcpJztcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHR0ZXN0UHJvcDogZnVuY3Rpb24gKHByb3BzKSB7XHJcblxyXG5cdFx0dmFyIHN0eWxlID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlO1xyXG5cclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKHByb3BzW2ldIGluIHN0eWxlKSB7XHJcblx0XHRcdFx0cmV0dXJuIHByb3BzW2ldO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSxcclxuXHJcblx0c2V0VHJhbnNmb3JtOiBmdW5jdGlvbiAoZWwsIG9mZnNldCwgc2NhbGUpIHtcclxuXHRcdHZhciBwb3MgPSBvZmZzZXQgfHwgbmV3IEwuUG9pbnQoMCwgMCk7XHJcblxyXG5cdFx0ZWwuc3R5bGVbTC5Eb21VdGlsLlRSQU5TRk9STV0gPVxyXG5cdFx0XHQoTC5Ccm93c2VyLmllM2QgP1xyXG5cdFx0XHRcdCd0cmFuc2xhdGUoJyArIHBvcy54ICsgJ3B4LCcgKyBwb3MueSArICdweCknIDpcclxuXHRcdFx0XHQndHJhbnNsYXRlM2QoJyArIHBvcy54ICsgJ3B4LCcgKyBwb3MueSArICdweCwwKScpICtcclxuXHRcdFx0KHNjYWxlID8gJyBzY2FsZSgnICsgc2NhbGUgKyAnKScgOiAnJyk7XHJcblx0fSxcclxuXHJcblx0c2V0UG9zaXRpb246IGZ1bmN0aW9uIChlbCwgcG9pbnQpIHsgLy8gKEhUTUxFbGVtZW50LCBQb2ludFssIEJvb2xlYW5dKVxyXG5cclxuXHRcdC8qZXNsaW50LWRpc2FibGUgKi9cclxuXHRcdGVsLl9sZWFmbGV0X3BvcyA9IHBvaW50O1xyXG5cdFx0Lyplc2xpbnQtZW5hYmxlICovXHJcblxyXG5cdFx0aWYgKEwuQnJvd3Nlci5hbnkzZCkge1xyXG5cdFx0XHRMLkRvbVV0aWwuc2V0VHJhbnNmb3JtKGVsLCBwb2ludCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlbC5zdHlsZS5sZWZ0ID0gcG9pbnQueCArICdweCc7XHJcblx0XHRcdGVsLnN0eWxlLnRvcCA9IHBvaW50LnkgKyAncHgnO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGdldFBvc2l0aW9uOiBmdW5jdGlvbiAoZWwpIHtcclxuXHRcdC8vIHRoaXMgbWV0aG9kIGlzIG9ubHkgdXNlZCBmb3IgZWxlbWVudHMgcHJldmlvdXNseSBwb3NpdGlvbmVkIHVzaW5nIHNldFBvc2l0aW9uLFxyXG5cdFx0Ly8gc28gaXQncyBzYWZlIHRvIGNhY2hlIHRoZSBwb3NpdGlvbiBmb3IgcGVyZm9ybWFuY2VcclxuXHJcblx0XHRyZXR1cm4gZWwuX2xlYWZsZXRfcG9zO1xyXG5cdH1cclxufTtcclxuXHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG5cdC8vIHByZWZpeCBzdHlsZSBwcm9wZXJ0eSBuYW1lc1xyXG5cclxuXHRMLkRvbVV0aWwuVFJBTlNGT1JNID0gTC5Eb21VdGlsLnRlc3RQcm9wKFxyXG5cdFx0XHRbJ3RyYW5zZm9ybScsICdXZWJraXRUcmFuc2Zvcm0nLCAnT1RyYW5zZm9ybScsICdNb3pUcmFuc2Zvcm0nLCAnbXNUcmFuc2Zvcm0nXSk7XHJcblxyXG5cclxuXHQvLyB3ZWJraXRUcmFuc2l0aW9uIGNvbWVzIGZpcnN0IGJlY2F1c2Ugc29tZSBicm93c2VyIHZlcnNpb25zIHRoYXQgZHJvcCB2ZW5kb3IgcHJlZml4IGRvbid0IGRvXHJcblx0Ly8gdGhlIHNhbWUgZm9yIHRoZSB0cmFuc2l0aW9uZW5kIGV2ZW50LCBpbiBwYXJ0aWN1bGFyIHRoZSBBbmRyb2lkIDQuMSBzdG9jayBicm93c2VyXHJcblxyXG5cdHZhciB0cmFuc2l0aW9uID0gTC5Eb21VdGlsLlRSQU5TSVRJT04gPSBMLkRvbVV0aWwudGVzdFByb3AoXHJcblx0XHRcdFsnd2Via2l0VHJhbnNpdGlvbicsICd0cmFuc2l0aW9uJywgJ09UcmFuc2l0aW9uJywgJ01velRyYW5zaXRpb24nLCAnbXNUcmFuc2l0aW9uJ10pO1xyXG5cclxuXHRMLkRvbVV0aWwuVFJBTlNJVElPTl9FTkQgPVxyXG5cdFx0XHR0cmFuc2l0aW9uID09PSAnd2Via2l0VHJhbnNpdGlvbicgfHwgdHJhbnNpdGlvbiA9PT0gJ09UcmFuc2l0aW9uJyA/IHRyYW5zaXRpb24gKyAnRW5kJyA6ICd0cmFuc2l0aW9uZW5kJztcclxuXHJcblxyXG5cdGlmICgnb25zZWxlY3RzdGFydCcgaW4gZG9jdW1lbnQpIHtcclxuXHRcdEwuRG9tVXRpbC5kaXNhYmxlVGV4dFNlbGVjdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0TC5Eb21FdmVudC5vbih3aW5kb3csICdzZWxlY3RzdGFydCcsIEwuRG9tRXZlbnQucHJldmVudERlZmF1bHQpO1xyXG5cdFx0fTtcclxuXHRcdEwuRG9tVXRpbC5lbmFibGVUZXh0U2VsZWN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRMLkRvbUV2ZW50Lm9mZih3aW5kb3csICdzZWxlY3RzdGFydCcsIEwuRG9tRXZlbnQucHJldmVudERlZmF1bHQpO1xyXG5cdFx0fTtcclxuXHJcblx0fSBlbHNlIHtcclxuXHRcdHZhciB1c2VyU2VsZWN0UHJvcGVydHkgPSBMLkRvbVV0aWwudGVzdFByb3AoXHJcblx0XHRcdFsndXNlclNlbGVjdCcsICdXZWJraXRVc2VyU2VsZWN0JywgJ09Vc2VyU2VsZWN0JywgJ01velVzZXJTZWxlY3QnLCAnbXNVc2VyU2VsZWN0J10pO1xyXG5cclxuXHRcdEwuRG9tVXRpbC5kaXNhYmxlVGV4dFNlbGVjdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHVzZXJTZWxlY3RQcm9wZXJ0eSkge1xyXG5cdFx0XHRcdHZhciBzdHlsZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZTtcclxuXHRcdFx0XHR0aGlzLl91c2VyU2VsZWN0ID0gc3R5bGVbdXNlclNlbGVjdFByb3BlcnR5XTtcclxuXHRcdFx0XHRzdHlsZVt1c2VyU2VsZWN0UHJvcGVydHldID0gJ25vbmUnO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFx0TC5Eb21VdGlsLmVuYWJsZVRleHRTZWxlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh1c2VyU2VsZWN0UHJvcGVydHkpIHtcclxuXHRcdFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGVbdXNlclNlbGVjdFByb3BlcnR5XSA9IHRoaXMuX3VzZXJTZWxlY3Q7XHJcblx0XHRcdFx0ZGVsZXRlIHRoaXMuX3VzZXJTZWxlY3Q7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRMLkRvbVV0aWwuZGlzYWJsZUltYWdlRHJhZyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdEwuRG9tRXZlbnQub24od2luZG93LCAnZHJhZ3N0YXJ0JywgTC5Eb21FdmVudC5wcmV2ZW50RGVmYXVsdCk7XHJcblx0fTtcclxuXHRMLkRvbVV0aWwuZW5hYmxlSW1hZ2VEcmFnID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0TC5Eb21FdmVudC5vZmYod2luZG93LCAnZHJhZ3N0YXJ0JywgTC5Eb21FdmVudC5wcmV2ZW50RGVmYXVsdCk7XHJcblx0fTtcclxuXHJcblx0TC5Eb21VdGlsLnByZXZlbnRPdXRsaW5lID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHRcdHdoaWxlIChlbGVtZW50LnRhYkluZGV4ID09PSAtMSkge1xyXG5cdFx0XHRlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCFlbGVtZW50IHx8ICFlbGVtZW50LnN0eWxlKSB7IHJldHVybjsgfVxyXG5cdFx0TC5Eb21VdGlsLnJlc3RvcmVPdXRsaW5lKCk7XHJcblx0XHR0aGlzLl9vdXRsaW5lRWxlbWVudCA9IGVsZW1lbnQ7XHJcblx0XHR0aGlzLl9vdXRsaW5lU3R5bGUgPSBlbGVtZW50LnN0eWxlLm91dGxpbmU7XHJcblx0XHRlbGVtZW50LnN0eWxlLm91dGxpbmUgPSAnbm9uZSc7XHJcblx0XHRMLkRvbUV2ZW50Lm9uKHdpbmRvdywgJ2tleWRvd24nLCBMLkRvbVV0aWwucmVzdG9yZU91dGxpbmUsIHRoaXMpO1xyXG5cdH07XHJcblx0TC5Eb21VdGlsLnJlc3RvcmVPdXRsaW5lID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKCF0aGlzLl9vdXRsaW5lRWxlbWVudCkgeyByZXR1cm47IH1cclxuXHRcdHRoaXMuX291dGxpbmVFbGVtZW50LnN0eWxlLm91dGxpbmUgPSB0aGlzLl9vdXRsaW5lU3R5bGU7XHJcblx0XHRkZWxldGUgdGhpcy5fb3V0bGluZUVsZW1lbnQ7XHJcblx0XHRkZWxldGUgdGhpcy5fb3V0bGluZVN0eWxlO1xyXG5cdFx0TC5Eb21FdmVudC5vZmYod2luZG93LCAna2V5ZG93bicsIEwuRG9tVXRpbC5yZXN0b3JlT3V0bGluZSwgdGhpcyk7XHJcblx0fTtcclxufSkoKTtcclxuXG5cblxuLypcclxuICogTC5MYXRMbmcgcmVwcmVzZW50cyBhIGdlb2dyYXBoaWNhbCBwb2ludCB3aXRoIGxhdGl0dWRlIGFuZCBsb25naXR1ZGUgY29vcmRpbmF0ZXMuXHJcbiAqL1xyXG5cclxuTC5MYXRMbmcgPSBmdW5jdGlvbiAobGF0LCBsbmcsIGFsdCkge1xyXG5cdGlmIChpc05hTihsYXQpIHx8IGlzTmFOKGxuZykpIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBMYXRMbmcgb2JqZWN0OiAoJyArIGxhdCArICcsICcgKyBsbmcgKyAnKScpO1xyXG5cdH1cclxuXHJcblx0dGhpcy5sYXQgPSArbGF0O1xyXG5cdHRoaXMubG5nID0gK2xuZztcclxuXHJcblx0aWYgKGFsdCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHR0aGlzLmFsdCA9ICthbHQ7XHJcblx0fVxyXG59O1xyXG5cclxuTC5MYXRMbmcucHJvdG90eXBlID0ge1xyXG5cdGVxdWFsczogZnVuY3Rpb24gKG9iaiwgbWF4TWFyZ2luKSB7XHJcblx0XHRpZiAoIW9iaikgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcblx0XHRvYmogPSBMLmxhdExuZyhvYmopO1xyXG5cclxuXHRcdHZhciBtYXJnaW4gPSBNYXRoLm1heChcclxuXHRcdCAgICAgICAgTWF0aC5hYnModGhpcy5sYXQgLSBvYmoubGF0KSxcclxuXHRcdCAgICAgICAgTWF0aC5hYnModGhpcy5sbmcgLSBvYmoubG5nKSk7XHJcblxyXG5cdFx0cmV0dXJuIG1hcmdpbiA8PSAobWF4TWFyZ2luID09PSB1bmRlZmluZWQgPyAxLjBFLTkgOiBtYXhNYXJnaW4pO1xyXG5cdH0sXHJcblxyXG5cdHRvU3RyaW5nOiBmdW5jdGlvbiAocHJlY2lzaW9uKSB7XHJcblx0XHRyZXR1cm4gJ0xhdExuZygnICtcclxuXHRcdCAgICAgICAgTC5VdGlsLmZvcm1hdE51bSh0aGlzLmxhdCwgcHJlY2lzaW9uKSArICcsICcgK1xyXG5cdFx0ICAgICAgICBMLlV0aWwuZm9ybWF0TnVtKHRoaXMubG5nLCBwcmVjaXNpb24pICsgJyknO1xyXG5cdH0sXHJcblxyXG5cdGRpc3RhbmNlVG86IGZ1bmN0aW9uIChvdGhlcikge1xyXG5cdFx0cmV0dXJuIEwuQ1JTLkVhcnRoLmRpc3RhbmNlKHRoaXMsIEwubGF0TG5nKG90aGVyKSk7XHJcblx0fSxcclxuXHJcblx0d3JhcDogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIEwuQ1JTLkVhcnRoLndyYXBMYXRMbmcodGhpcyk7XHJcblx0fSxcclxuXHJcblx0dG9Cb3VuZHM6IGZ1bmN0aW9uIChzaXplSW5NZXRlcnMpIHtcclxuXHRcdHZhciBsYXRBY2N1cmFjeSA9IDE4MCAqIHNpemVJbk1ldGVycyAvIDQwMDc1MDE3LFxyXG5cdFx0ICAgIGxuZ0FjY3VyYWN5ID0gbGF0QWNjdXJhY3kgLyBNYXRoLmNvcygoTWF0aC5QSSAvIDE4MCkgKiB0aGlzLmxhdCk7XHJcblxyXG5cdFx0cmV0dXJuIEwubGF0TG5nQm91bmRzKFxyXG5cdFx0ICAgICAgICBbdGhpcy5sYXQgLSBsYXRBY2N1cmFjeSwgdGhpcy5sbmcgLSBsbmdBY2N1cmFjeV0sXHJcblx0XHQgICAgICAgIFt0aGlzLmxhdCArIGxhdEFjY3VyYWN5LCB0aGlzLmxuZyArIGxuZ0FjY3VyYWN5XSk7XHJcblx0fSxcclxuXHJcblx0Y2xvbmU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBuZXcgTC5MYXRMbmcodGhpcy5sYXQsIHRoaXMubG5nLCB0aGlzLmFsdCk7XHJcblx0fVxyXG59O1xyXG5cclxuXHJcbi8vIGNvbnN0cnVjdHMgTGF0TG5nIHdpdGggZGlmZmVyZW50IHNpZ25hdHVyZXNcclxuLy8gKExhdExuZykgb3IgKFtOdW1iZXIsIE51bWJlcl0pIG9yIChOdW1iZXIsIE51bWJlcikgb3IgKE9iamVjdClcclxuXHJcbkwubGF0TG5nID0gZnVuY3Rpb24gKGEsIGIsIGMpIHtcclxuXHRpZiAoYSBpbnN0YW5jZW9mIEwuTGF0TG5nKSB7XHJcblx0XHRyZXR1cm4gYTtcclxuXHR9XHJcblx0aWYgKEwuVXRpbC5pc0FycmF5KGEpICYmIHR5cGVvZiBhWzBdICE9PSAnb2JqZWN0Jykge1xyXG5cdFx0aWYgKGEubGVuZ3RoID09PSAzKSB7XHJcblx0XHRcdHJldHVybiBuZXcgTC5MYXRMbmcoYVswXSwgYVsxXSwgYVsyXSk7XHJcblx0XHR9XHJcblx0XHRpZiAoYS5sZW5ndGggPT09IDIpIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBMLkxhdExuZyhhWzBdLCBhWzFdKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHRpZiAoYSA9PT0gdW5kZWZpbmVkIHx8IGEgPT09IG51bGwpIHtcclxuXHRcdHJldHVybiBhO1xyXG5cdH1cclxuXHRpZiAodHlwZW9mIGEgPT09ICdvYmplY3QnICYmICdsYXQnIGluIGEpIHtcclxuXHRcdHJldHVybiBuZXcgTC5MYXRMbmcoYS5sYXQsICdsbmcnIGluIGEgPyBhLmxuZyA6IGEubG9uLCBhLmFsdCk7XHJcblx0fVxyXG5cdGlmIChiID09PSB1bmRlZmluZWQpIHtcclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHRyZXR1cm4gbmV3IEwuTGF0TG5nKGEsIGIsIGMpO1xyXG59O1xyXG5cblxuXG4vKlxyXG4gKiBMLkxhdExuZ0JvdW5kcyByZXByZXNlbnRzIGEgcmVjdGFuZ3VsYXIgYXJlYSBvbiB0aGUgbWFwIGluIGdlb2dyYXBoaWNhbCBjb29yZGluYXRlcy5cclxuICovXHJcblxyXG5MLkxhdExuZ0JvdW5kcyA9IGZ1bmN0aW9uIChzb3V0aFdlc3QsIG5vcnRoRWFzdCkgeyAvLyAoTGF0TG5nLCBMYXRMbmcpIG9yIChMYXRMbmdbXSlcclxuXHRpZiAoIXNvdXRoV2VzdCkgeyByZXR1cm47IH1cclxuXHJcblx0dmFyIGxhdGxuZ3MgPSBub3J0aEVhc3QgPyBbc291dGhXZXN0LCBub3J0aEVhc3RdIDogc291dGhXZXN0O1xyXG5cclxuXHRmb3IgKHZhciBpID0gMCwgbGVuID0gbGF0bG5ncy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0dGhpcy5leHRlbmQobGF0bG5nc1tpXSk7XHJcblx0fVxyXG59O1xyXG5cclxuTC5MYXRMbmdCb3VuZHMucHJvdG90eXBlID0ge1xyXG5cclxuXHQvLyBleHRlbmQgdGhlIGJvdW5kcyB0byBjb250YWluIHRoZSBnaXZlbiBwb2ludCBvciBib3VuZHNcclxuXHRleHRlbmQ6IGZ1bmN0aW9uIChvYmopIHsgLy8gKExhdExuZykgb3IgKExhdExuZ0JvdW5kcylcclxuXHRcdHZhciBzdyA9IHRoaXMuX3NvdXRoV2VzdCxcclxuXHRcdCAgICBuZSA9IHRoaXMuX25vcnRoRWFzdCxcclxuXHRcdCAgICBzdzIsIG5lMjtcclxuXHJcblx0XHRpZiAob2JqIGluc3RhbmNlb2YgTC5MYXRMbmcpIHtcclxuXHRcdFx0c3cyID0gb2JqO1xyXG5cdFx0XHRuZTIgPSBvYmo7XHJcblxyXG5cdFx0fSBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBMLkxhdExuZ0JvdW5kcykge1xyXG5cdFx0XHRzdzIgPSBvYmouX3NvdXRoV2VzdDtcclxuXHRcdFx0bmUyID0gb2JqLl9ub3J0aEVhc3Q7XHJcblxyXG5cdFx0XHRpZiAoIXN3MiB8fCAhbmUyKSB7IHJldHVybiB0aGlzOyB9XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIG9iaiA/IHRoaXMuZXh0ZW5kKEwubGF0TG5nKG9iaikgfHwgTC5sYXRMbmdCb3VuZHMob2JqKSkgOiB0aGlzO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghc3cgJiYgIW5lKSB7XHJcblx0XHRcdHRoaXMuX3NvdXRoV2VzdCA9IG5ldyBMLkxhdExuZyhzdzIubGF0LCBzdzIubG5nKTtcclxuXHRcdFx0dGhpcy5fbm9ydGhFYXN0ID0gbmV3IEwuTGF0TG5nKG5lMi5sYXQsIG5lMi5sbmcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c3cubGF0ID0gTWF0aC5taW4oc3cyLmxhdCwgc3cubGF0KTtcclxuXHRcdFx0c3cubG5nID0gTWF0aC5taW4oc3cyLmxuZywgc3cubG5nKTtcclxuXHRcdFx0bmUubGF0ID0gTWF0aC5tYXgobmUyLmxhdCwgbmUubGF0KTtcclxuXHRcdFx0bmUubG5nID0gTWF0aC5tYXgobmUyLmxuZywgbmUubG5nKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHQvLyBleHRlbmQgdGhlIGJvdW5kcyBieSBhIHBlcmNlbnRhZ2VcclxuXHRwYWQ6IGZ1bmN0aW9uIChidWZmZXJSYXRpbykgeyAvLyAoTnVtYmVyKSAtPiBMYXRMbmdCb3VuZHNcclxuXHRcdHZhciBzdyA9IHRoaXMuX3NvdXRoV2VzdCxcclxuXHRcdCAgICBuZSA9IHRoaXMuX25vcnRoRWFzdCxcclxuXHRcdCAgICBoZWlnaHRCdWZmZXIgPSBNYXRoLmFicyhzdy5sYXQgLSBuZS5sYXQpICogYnVmZmVyUmF0aW8sXHJcblx0XHQgICAgd2lkdGhCdWZmZXIgPSBNYXRoLmFicyhzdy5sbmcgLSBuZS5sbmcpICogYnVmZmVyUmF0aW87XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBMLkxhdExuZ0JvdW5kcyhcclxuXHRcdCAgICAgICAgbmV3IEwuTGF0TG5nKHN3LmxhdCAtIGhlaWdodEJ1ZmZlciwgc3cubG5nIC0gd2lkdGhCdWZmZXIpLFxyXG5cdFx0ICAgICAgICBuZXcgTC5MYXRMbmcobmUubGF0ICsgaGVpZ2h0QnVmZmVyLCBuZS5sbmcgKyB3aWR0aEJ1ZmZlcikpO1xyXG5cdH0sXHJcblxyXG5cdGdldENlbnRlcjogZnVuY3Rpb24gKCkgeyAvLyAtPiBMYXRMbmdcclxuXHRcdHJldHVybiBuZXcgTC5MYXRMbmcoXHJcblx0XHQgICAgICAgICh0aGlzLl9zb3V0aFdlc3QubGF0ICsgdGhpcy5fbm9ydGhFYXN0LmxhdCkgLyAyLFxyXG5cdFx0ICAgICAgICAodGhpcy5fc291dGhXZXN0LmxuZyArIHRoaXMuX25vcnRoRWFzdC5sbmcpIC8gMik7XHJcblx0fSxcclxuXHJcblx0Z2V0U291dGhXZXN0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fc291dGhXZXN0O1xyXG5cdH0sXHJcblxyXG5cdGdldE5vcnRoRWFzdDogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX25vcnRoRWFzdDtcclxuXHR9LFxyXG5cclxuXHRnZXROb3J0aFdlc3Q6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBuZXcgTC5MYXRMbmcodGhpcy5nZXROb3J0aCgpLCB0aGlzLmdldFdlc3QoKSk7XHJcblx0fSxcclxuXHJcblx0Z2V0U291dGhFYXN0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gbmV3IEwuTGF0TG5nKHRoaXMuZ2V0U291dGgoKSwgdGhpcy5nZXRFYXN0KCkpO1xyXG5cdH0sXHJcblxyXG5cdGdldFdlc3Q6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLl9zb3V0aFdlc3QubG5nO1xyXG5cdH0sXHJcblxyXG5cdGdldFNvdXRoOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fc291dGhXZXN0LmxhdDtcclxuXHR9LFxyXG5cclxuXHRnZXRFYXN0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fbm9ydGhFYXN0LmxuZztcclxuXHR9LFxyXG5cclxuXHRnZXROb3J0aDogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX25vcnRoRWFzdC5sYXQ7XHJcblx0fSxcclxuXHJcblx0Y29udGFpbnM6IGZ1bmN0aW9uIChvYmopIHsgLy8gKExhdExuZ0JvdW5kcykgb3IgKExhdExuZykgLT4gQm9vbGVhblxyXG5cdFx0aWYgKHR5cGVvZiBvYmpbMF0gPT09ICdudW1iZXInIHx8IG9iaiBpbnN0YW5jZW9mIEwuTGF0TG5nKSB7XHJcblx0XHRcdG9iaiA9IEwubGF0TG5nKG9iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRvYmogPSBMLmxhdExuZ0JvdW5kcyhvYmopO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBzdyA9IHRoaXMuX3NvdXRoV2VzdCxcclxuXHRcdCAgICBuZSA9IHRoaXMuX25vcnRoRWFzdCxcclxuXHRcdCAgICBzdzIsIG5lMjtcclxuXHJcblx0XHRpZiAob2JqIGluc3RhbmNlb2YgTC5MYXRMbmdCb3VuZHMpIHtcclxuXHRcdFx0c3cyID0gb2JqLmdldFNvdXRoV2VzdCgpO1xyXG5cdFx0XHRuZTIgPSBvYmouZ2V0Tm9ydGhFYXN0KCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdzIgPSBuZTIgPSBvYmo7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIChzdzIubGF0ID49IHN3LmxhdCkgJiYgKG5lMi5sYXQgPD0gbmUubGF0KSAmJlxyXG5cdFx0ICAgICAgIChzdzIubG5nID49IHN3LmxuZykgJiYgKG5lMi5sbmcgPD0gbmUubG5nKTtcclxuXHR9LFxyXG5cclxuXHRpbnRlcnNlY3RzOiBmdW5jdGlvbiAoYm91bmRzKSB7IC8vIChMYXRMbmdCb3VuZHMpIC0+IEJvb2xlYW5cclxuXHRcdGJvdW5kcyA9IEwubGF0TG5nQm91bmRzKGJvdW5kcyk7XHJcblxyXG5cdFx0dmFyIHN3ID0gdGhpcy5fc291dGhXZXN0LFxyXG5cdFx0ICAgIG5lID0gdGhpcy5fbm9ydGhFYXN0LFxyXG5cdFx0ICAgIHN3MiA9IGJvdW5kcy5nZXRTb3V0aFdlc3QoKSxcclxuXHRcdCAgICBuZTIgPSBib3VuZHMuZ2V0Tm9ydGhFYXN0KCksXHJcblxyXG5cdFx0ICAgIGxhdEludGVyc2VjdHMgPSAobmUyLmxhdCA+PSBzdy5sYXQpICYmIChzdzIubGF0IDw9IG5lLmxhdCksXHJcblx0XHQgICAgbG5nSW50ZXJzZWN0cyA9IChuZTIubG5nID49IHN3LmxuZykgJiYgKHN3Mi5sbmcgPD0gbmUubG5nKTtcclxuXHJcblx0XHRyZXR1cm4gbGF0SW50ZXJzZWN0cyAmJiBsbmdJbnRlcnNlY3RzO1xyXG5cdH0sXHJcblxyXG5cdG92ZXJsYXBzOiBmdW5jdGlvbiAoYm91bmRzKSB7IC8vIChMYXRMbmdCb3VuZHMpIC0+IEJvb2xlYW5cclxuXHRcdGJvdW5kcyA9IEwubGF0TG5nQm91bmRzKGJvdW5kcyk7XHJcblxyXG5cdFx0dmFyIHN3ID0gdGhpcy5fc291dGhXZXN0LFxyXG5cdFx0ICAgIG5lID0gdGhpcy5fbm9ydGhFYXN0LFxyXG5cdFx0ICAgIHN3MiA9IGJvdW5kcy5nZXRTb3V0aFdlc3QoKSxcclxuXHRcdCAgICBuZTIgPSBib3VuZHMuZ2V0Tm9ydGhFYXN0KCksXHJcblxyXG5cdFx0ICAgIGxhdE92ZXJsYXBzID0gKG5lMi5sYXQgPiBzdy5sYXQpICYmIChzdzIubGF0IDwgbmUubGF0KSxcclxuXHRcdCAgICBsbmdPdmVybGFwcyA9IChuZTIubG5nID4gc3cubG5nKSAmJiAoc3cyLmxuZyA8IG5lLmxuZyk7XHJcblxyXG5cdFx0cmV0dXJuIGxhdE92ZXJsYXBzICYmIGxuZ092ZXJsYXBzO1xyXG5cdH0sXHJcblxyXG5cdHRvQkJveFN0cmluZzogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIFt0aGlzLmdldFdlc3QoKSwgdGhpcy5nZXRTb3V0aCgpLCB0aGlzLmdldEVhc3QoKSwgdGhpcy5nZXROb3J0aCgpXS5qb2luKCcsJyk7XHJcblx0fSxcclxuXHJcblx0ZXF1YWxzOiBmdW5jdGlvbiAoYm91bmRzKSB7IC8vIChMYXRMbmdCb3VuZHMpXHJcblx0XHRpZiAoIWJvdW5kcykgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcblx0XHRib3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhib3VuZHMpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9zb3V0aFdlc3QuZXF1YWxzKGJvdW5kcy5nZXRTb3V0aFdlc3QoKSkgJiZcclxuXHRcdCAgICAgICB0aGlzLl9ub3J0aEVhc3QuZXF1YWxzKGJvdW5kcy5nZXROb3J0aEVhc3QoKSk7XHJcblx0fSxcclxuXHJcblx0aXNWYWxpZDogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuICEhKHRoaXMuX3NvdXRoV2VzdCAmJiB0aGlzLl9ub3J0aEVhc3QpO1xyXG5cdH1cclxufTtcclxuXHJcbi8vIFRPRE8gSW50ZXJuYXRpb25hbCBkYXRlIGxpbmU/XHJcblxyXG5MLmxhdExuZ0JvdW5kcyA9IGZ1bmN0aW9uIChhLCBiKSB7IC8vIChMYXRMbmdCb3VuZHMpIG9yIChMYXRMbmcsIExhdExuZylcclxuXHRpZiAoIWEgfHwgYSBpbnN0YW5jZW9mIEwuTGF0TG5nQm91bmRzKSB7XHJcblx0XHRyZXR1cm4gYTtcclxuXHR9XHJcblx0cmV0dXJuIG5ldyBMLkxhdExuZ0JvdW5kcyhhLCBiKTtcclxufTtcclxuXG5cblxuLypcclxuICogU2ltcGxlIGVxdWlyZWN0YW5ndWxhciAoUGxhdGUgQ2FycmVlKSBwcm9qZWN0aW9uLCB1c2VkIGJ5IENSUyBsaWtlIEVQU0c6NDMyNiBhbmQgU2ltcGxlLlxyXG4gKi9cclxuXHJcbkwuUHJvamVjdGlvbiA9IHt9O1xyXG5cclxuTC5Qcm9qZWN0aW9uLkxvbkxhdCA9IHtcclxuXHRwcm9qZWN0OiBmdW5jdGlvbiAobGF0bG5nKSB7XHJcblx0XHRyZXR1cm4gbmV3IEwuUG9pbnQobGF0bG5nLmxuZywgbGF0bG5nLmxhdCk7XHJcblx0fSxcclxuXHJcblx0dW5wcm9qZWN0OiBmdW5jdGlvbiAocG9pbnQpIHtcclxuXHRcdHJldHVybiBuZXcgTC5MYXRMbmcocG9pbnQueSwgcG9pbnQueCk7XHJcblx0fSxcclxuXHJcblx0Ym91bmRzOiBMLmJvdW5kcyhbLTE4MCwgLTkwXSwgWzE4MCwgOTBdKVxyXG59O1xyXG5cblxuXG4vKlxyXG4gKiBTcGhlcmljYWwgTWVyY2F0b3IgaXMgdGhlIG1vc3QgcG9wdWxhciBtYXAgcHJvamVjdGlvbiwgdXNlZCBieSBFUFNHOjM4NTcgQ1JTIHVzZWQgYnkgZGVmYXVsdC5cclxuICovXHJcblxyXG5MLlByb2plY3Rpb24uU3BoZXJpY2FsTWVyY2F0b3IgPSB7XHJcblxyXG5cdFI6IDYzNzgxMzcsXHJcblx0TUFYX0xBVElUVURFOiA4NS4wNTExMjg3Nzk4LFxyXG5cclxuXHRwcm9qZWN0OiBmdW5jdGlvbiAobGF0bG5nKSB7XHJcblx0XHR2YXIgZCA9IE1hdGguUEkgLyAxODAsXHJcblx0XHQgICAgbWF4ID0gdGhpcy5NQVhfTEFUSVRVREUsXHJcblx0XHQgICAgbGF0ID0gTWF0aC5tYXgoTWF0aC5taW4obWF4LCBsYXRsbmcubGF0KSwgLW1heCksXHJcblx0XHQgICAgc2luID0gTWF0aC5zaW4obGF0ICogZCk7XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBMLlBvaW50KFxyXG5cdFx0XHRcdHRoaXMuUiAqIGxhdGxuZy5sbmcgKiBkLFxyXG5cdFx0XHRcdHRoaXMuUiAqIE1hdGgubG9nKCgxICsgc2luKSAvICgxIC0gc2luKSkgLyAyKTtcclxuXHR9LFxyXG5cclxuXHR1bnByb2plY3Q6IGZ1bmN0aW9uIChwb2ludCkge1xyXG5cdFx0dmFyIGQgPSAxODAgLyBNYXRoLlBJO1xyXG5cclxuXHRcdHJldHVybiBuZXcgTC5MYXRMbmcoXHJcblx0XHRcdCgyICogTWF0aC5hdGFuKE1hdGguZXhwKHBvaW50LnkgLyB0aGlzLlIpKSAtIChNYXRoLlBJIC8gMikpICogZCxcclxuXHRcdFx0cG9pbnQueCAqIGQgLyB0aGlzLlIpO1xyXG5cdH0sXHJcblxyXG5cdGJvdW5kczogKGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBkID0gNjM3ODEzNyAqIE1hdGguUEk7XHJcblx0XHRyZXR1cm4gTC5ib3VuZHMoWy1kLCAtZF0sIFtkLCBkXSk7XHJcblx0fSkoKVxyXG59O1xyXG5cblxuXG4vKlxyXG4gKiBMLkNSUyBpcyB0aGUgYmFzZSBvYmplY3QgZm9yIGFsbCBkZWZpbmVkIENSUyAoQ29vcmRpbmF0ZSBSZWZlcmVuY2UgU3lzdGVtcykgaW4gTGVhZmxldC5cclxuICovXHJcblxyXG5MLkNSUyA9IHtcclxuXHQvLyBjb252ZXJ0cyBnZW8gY29vcmRzIHRvIHBpeGVsIG9uZXNcclxuXHRsYXRMbmdUb1BvaW50OiBmdW5jdGlvbiAobGF0bG5nLCB6b29tKSB7XHJcblx0XHR2YXIgcHJvamVjdGVkUG9pbnQgPSB0aGlzLnByb2plY3Rpb24ucHJvamVjdChsYXRsbmcpLFxyXG5cdFx0ICAgIHNjYWxlID0gdGhpcy5zY2FsZSh6b29tKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy50cmFuc2Zvcm1hdGlvbi5fdHJhbnNmb3JtKHByb2plY3RlZFBvaW50LCBzY2FsZSk7XHJcblx0fSxcclxuXHJcblx0Ly8gY29udmVydHMgcGl4ZWwgY29vcmRzIHRvIGdlbyBjb29yZHNcclxuXHRwb2ludFRvTGF0TG5nOiBmdW5jdGlvbiAocG9pbnQsIHpvb20pIHtcclxuXHRcdHZhciBzY2FsZSA9IHRoaXMuc2NhbGUoem9vbSksXHJcblx0XHQgICAgdW50cmFuc2Zvcm1lZFBvaW50ID0gdGhpcy50cmFuc2Zvcm1hdGlvbi51bnRyYW5zZm9ybShwb2ludCwgc2NhbGUpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLnByb2plY3Rpb24udW5wcm9qZWN0KHVudHJhbnNmb3JtZWRQb2ludCk7XHJcblx0fSxcclxuXHJcblx0Ly8gY29udmVydHMgZ2VvIGNvb3JkcyB0byBwcm9qZWN0aW9uLXNwZWNpZmljIGNvb3JkcyAoZS5nLiBpbiBtZXRlcnMpXHJcblx0cHJvamVjdDogZnVuY3Rpb24gKGxhdGxuZykge1xyXG5cdFx0cmV0dXJuIHRoaXMucHJvamVjdGlvbi5wcm9qZWN0KGxhdGxuZyk7XHJcblx0fSxcclxuXHJcblx0Ly8gY29udmVydHMgcHJvamVjdGVkIGNvb3JkcyB0byBnZW8gY29vcmRzXHJcblx0dW5wcm9qZWN0OiBmdW5jdGlvbiAocG9pbnQpIHtcclxuXHRcdHJldHVybiB0aGlzLnByb2plY3Rpb24udW5wcm9qZWN0KHBvaW50KTtcclxuXHR9LFxyXG5cclxuXHQvLyBkZWZpbmVzIGhvdyB0aGUgd29ybGQgc2NhbGVzIHdpdGggem9vbVxyXG5cdHNjYWxlOiBmdW5jdGlvbiAoem9vbSkge1xyXG5cdFx0cmV0dXJuIDI1NiAqIE1hdGgucG93KDIsIHpvb20pO1xyXG5cdH0sXHJcblxyXG5cdHpvb206IGZ1bmN0aW9uIChzY2FsZSkge1xyXG5cdFx0cmV0dXJuIE1hdGgubG9nKHNjYWxlIC8gMjU2KSAvIE1hdGguTE4yO1xyXG5cdH0sXHJcblxyXG5cdC8vIHJldHVybnMgdGhlIGJvdW5kcyBvZiB0aGUgd29ybGQgaW4gcHJvamVjdGVkIGNvb3JkcyBpZiBhcHBsaWNhYmxlXHJcblx0Z2V0UHJvamVjdGVkQm91bmRzOiBmdW5jdGlvbiAoem9vbSkge1xyXG5cdFx0aWYgKHRoaXMuaW5maW5pdGUpIHsgcmV0dXJuIG51bGw7IH1cclxuXHJcblx0XHR2YXIgYiA9IHRoaXMucHJvamVjdGlvbi5ib3VuZHMsXHJcblx0XHQgICAgcyA9IHRoaXMuc2NhbGUoem9vbSksXHJcblx0XHQgICAgbWluID0gdGhpcy50cmFuc2Zvcm1hdGlvbi50cmFuc2Zvcm0oYi5taW4sIHMpLFxyXG5cdFx0ICAgIG1heCA9IHRoaXMudHJhbnNmb3JtYXRpb24udHJhbnNmb3JtKGIubWF4LCBzKTtcclxuXHJcblx0XHRyZXR1cm4gTC5ib3VuZHMobWluLCBtYXgpO1xyXG5cdH0sXHJcblxyXG5cdC8vIHdoZXRoZXIgYSBjb29yZGluYXRlIGF4aXMgd3JhcHMgaW4gYSBnaXZlbiByYW5nZSAoZS5nLiBsb25naXR1ZGUgZnJvbSAtMTgwIHRvIDE4MCk7IGRlcGVuZHMgb24gQ1JTXHJcblx0Ly8gd3JhcExuZzogW21pbiwgbWF4XSxcclxuXHQvLyB3cmFwTGF0OiBbbWluLCBtYXhdLFxyXG5cclxuXHQvLyBpZiB0cnVlLCB0aGUgY29vcmRpbmF0ZSBzcGFjZSB3aWxsIGJlIHVuYm91bmRlZCAoaW5maW5pdGUgaW4gYWxsIGRpcmVjdGlvbnMpXHJcblx0Ly8gaW5maW5pdGU6IGZhbHNlLFxyXG5cclxuXHQvLyB3cmFwcyBnZW8gY29vcmRzIGluIGNlcnRhaW4gcmFuZ2VzIGlmIGFwcGxpY2FibGVcclxuXHR3cmFwTGF0TG5nOiBmdW5jdGlvbiAobGF0bG5nKSB7XHJcblx0XHR2YXIgbG5nID0gdGhpcy53cmFwTG5nID8gTC5VdGlsLndyYXBOdW0obGF0bG5nLmxuZywgdGhpcy53cmFwTG5nLCB0cnVlKSA6IGxhdGxuZy5sbmcsXHJcblx0XHQgICAgbGF0ID0gdGhpcy53cmFwTGF0ID8gTC5VdGlsLndyYXBOdW0obGF0bG5nLmxhdCwgdGhpcy53cmFwTGF0LCB0cnVlKSA6IGxhdGxuZy5sYXQsXHJcblx0XHQgICAgYWx0ID0gbGF0bG5nLmFsdDtcclxuXHJcblx0XHRyZXR1cm4gTC5sYXRMbmcobGF0LCBsbmcsIGFsdCk7XHJcblx0fVxyXG59O1xyXG5cblxuXG4vKlxuICogQSBzaW1wbGUgQ1JTIHRoYXQgY2FuIGJlIHVzZWQgZm9yIGZsYXQgbm9uLUVhcnRoIG1hcHMgbGlrZSBwYW5vcmFtYXMgb3IgZ2FtZSBtYXBzLlxuICovXG5cbkwuQ1JTLlNpbXBsZSA9IEwuZXh0ZW5kKHt9LCBMLkNSUywge1xuXHRwcm9qZWN0aW9uOiBMLlByb2plY3Rpb24uTG9uTGF0LFxuXHR0cmFuc2Zvcm1hdGlvbjogbmV3IEwuVHJhbnNmb3JtYXRpb24oMSwgMCwgLTEsIDApLFxuXG5cdHNjYWxlOiBmdW5jdGlvbiAoem9vbSkge1xuXHRcdHJldHVybiBNYXRoLnBvdygyLCB6b29tKTtcblx0fSxcblxuXHR6b29tOiBmdW5jdGlvbiAoc2NhbGUpIHtcblx0XHRyZXR1cm4gTWF0aC5sb2coc2NhbGUpIC8gTWF0aC5MTjI7XG5cdH0sXG5cblx0ZGlzdGFuY2U6IGZ1bmN0aW9uIChsYXRsbmcxLCBsYXRsbmcyKSB7XG5cdFx0dmFyIGR4ID0gbGF0bG5nMi5sbmcgLSBsYXRsbmcxLmxuZyxcblx0XHQgICAgZHkgPSBsYXRsbmcyLmxhdCAtIGxhdGxuZzEubGF0O1xuXG5cdFx0cmV0dXJuIE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cdH0sXG5cblx0aW5maW5pdGU6IHRydWVcbn0pO1xuXG5cblxuLypcbiAqIEwuQ1JTLkVhcnRoIGlzIHRoZSBiYXNlIGNsYXNzIGZvciBhbGwgQ1JTIHJlcHJlc2VudGluZyBFYXJ0aC5cbiAqL1xuXG5MLkNSUy5FYXJ0aCA9IEwuZXh0ZW5kKHt9LCBMLkNSUywge1xuXHR3cmFwTG5nOiBbLTE4MCwgMTgwXSxcblxuXHRSOiA2Mzc4MTM3LFxuXG5cdC8vIGRpc3RhbmNlIGJldHdlZW4gdHdvIGdlb2dyYXBoaWNhbCBwb2ludHMgdXNpbmcgc3BoZXJpY2FsIGxhdyBvZiBjb3NpbmVzIGFwcHJveGltYXRpb25cblx0ZGlzdGFuY2U6IGZ1bmN0aW9uIChsYXRsbmcxLCBsYXRsbmcyKSB7XG5cdFx0dmFyIHJhZCA9IE1hdGguUEkgLyAxODAsXG5cdFx0ICAgIGxhdDEgPSBsYXRsbmcxLmxhdCAqIHJhZCxcblx0XHQgICAgbGF0MiA9IGxhdGxuZzIubGF0ICogcmFkLFxuXHRcdCAgICBhID0gTWF0aC5zaW4obGF0MSkgKiBNYXRoLnNpbihsYXQyKSArXG5cdFx0ICAgICAgICBNYXRoLmNvcyhsYXQxKSAqIE1hdGguY29zKGxhdDIpICogTWF0aC5jb3MoKGxhdGxuZzIubG5nIC0gbGF0bG5nMS5sbmcpICogcmFkKTtcblxuXHRcdHJldHVybiB0aGlzLlIgKiBNYXRoLmFjb3MoTWF0aC5taW4oYSwgMSkpO1xuXHR9XG59KTtcblxuXG5cbi8qXHJcbiAqIEwuQ1JTLkVQU0czODU3IChTcGhlcmljYWwgTWVyY2F0b3IpIGlzIHRoZSBtb3N0IGNvbW1vbiBDUlMgZm9yIHdlYiBtYXBwaW5nIGFuZCBpcyB1c2VkIGJ5IExlYWZsZXQgYnkgZGVmYXVsdC5cclxuICovXHJcblxyXG5MLkNSUy5FUFNHMzg1NyA9IEwuZXh0ZW5kKHt9LCBMLkNSUy5FYXJ0aCwge1xyXG5cdGNvZGU6ICdFUFNHOjM4NTcnLFxyXG5cdHByb2plY3Rpb246IEwuUHJvamVjdGlvbi5TcGhlcmljYWxNZXJjYXRvcixcclxuXHJcblx0dHJhbnNmb3JtYXRpb246IChmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgc2NhbGUgPSAwLjUgLyAoTWF0aC5QSSAqIEwuUHJvamVjdGlvbi5TcGhlcmljYWxNZXJjYXRvci5SKTtcclxuXHRcdHJldHVybiBuZXcgTC5UcmFuc2Zvcm1hdGlvbihzY2FsZSwgMC41LCAtc2NhbGUsIDAuNSk7XHJcblx0fSgpKVxyXG59KTtcclxuXHJcbkwuQ1JTLkVQU0c5MDA5MTMgPSBMLmV4dGVuZCh7fSwgTC5DUlMuRVBTRzM4NTcsIHtcclxuXHRjb2RlOiAnRVBTRzo5MDA5MTMnXHJcbn0pO1xyXG5cblxuXG4vKlxyXG4gKiBMLkNSUy5FUFNHNDMyNiBpcyBhIENSUyBwb3B1bGFyIGFtb25nIGFkdmFuY2VkIEdJUyBzcGVjaWFsaXN0cy5cclxuICovXHJcblxyXG5MLkNSUy5FUFNHNDMyNiA9IEwuZXh0ZW5kKHt9LCBMLkNSUy5FYXJ0aCwge1xyXG5cdGNvZGU6ICdFUFNHOjQzMjYnLFxyXG5cdHByb2plY3Rpb246IEwuUHJvamVjdGlvbi5Mb25MYXQsXHJcblx0dHJhbnNmb3JtYXRpb246IG5ldyBMLlRyYW5zZm9ybWF0aW9uKDEgLyAxODAsIDEsIC0xIC8gMTgwLCAwLjUpXHJcbn0pO1xyXG5cblxuXG4vKlxyXG4gKiBMLk1hcCBpcyB0aGUgY2VudHJhbCBjbGFzcyBvZiB0aGUgQVBJIC0gaXQgaXMgdXNlZCB0byBjcmVhdGUgYSBtYXAuXHJcbiAqL1xyXG5cclxuTC5NYXAgPSBMLkV2ZW50ZWQuZXh0ZW5kKHtcclxuXHJcblx0b3B0aW9uczoge1xyXG5cdFx0Y3JzOiBMLkNSUy5FUFNHMzg1NyxcclxuXHJcblx0XHQvKlxyXG5cdFx0Y2VudGVyOiBMYXRMbmcsXHJcblx0XHR6b29tOiBOdW1iZXIsXHJcblx0XHRsYXllcnM6IEFycmF5LFxyXG5cdFx0Ki9cclxuXHJcblx0XHRmYWRlQW5pbWF0aW9uOiB0cnVlLFxyXG5cdFx0dHJhY2tSZXNpemU6IHRydWUsXHJcblx0XHRtYXJrZXJab29tQW5pbWF0aW9uOiB0cnVlLFxyXG5cdFx0bWF4Qm91bmRzVmlzY29zaXR5OiAwLjAsXHJcblx0XHR0cmFuc2Zvcm0zRExpbWl0OiA4Mzg4NjA4IC8vIFByZWNpc2lvbiBsaW1pdCBvZiBhIDMyLWJpdCBmbG9hdFxyXG5cdH0sXHJcblxyXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIChpZCwgb3B0aW9ucykgeyAvLyAoSFRNTEVsZW1lbnQgb3IgU3RyaW5nLCBPYmplY3QpXHJcblx0XHRvcHRpb25zID0gTC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xyXG5cclxuXHRcdHRoaXMuX2luaXRDb250YWluZXIoaWQpO1xyXG5cdFx0dGhpcy5faW5pdExheW91dCgpO1xyXG5cclxuXHRcdC8vIGhhY2sgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9MZWFmbGV0L0xlYWZsZXQvaXNzdWVzLzE5ODBcclxuXHRcdHRoaXMuX29uUmVzaXplID0gTC5iaW5kKHRoaXMuX29uUmVzaXplLCB0aGlzKTtcclxuXHJcblx0XHR0aGlzLl9pbml0RXZlbnRzKCk7XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMubWF4Qm91bmRzKSB7XHJcblx0XHRcdHRoaXMuc2V0TWF4Qm91bmRzKG9wdGlvbnMubWF4Qm91bmRzKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAob3B0aW9ucy56b29tICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0dGhpcy5fem9vbSA9IHRoaXMuX2xpbWl0Wm9vbShvcHRpb25zLnpvb20pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChvcHRpb25zLmNlbnRlciAmJiBvcHRpb25zLnpvb20gIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR0aGlzLnNldFZpZXcoTC5sYXRMbmcob3B0aW9ucy5jZW50ZXIpLCBvcHRpb25zLnpvb20sIHtyZXNldDogdHJ1ZX0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX2hhbmRsZXJzID0gW107XHJcblx0XHR0aGlzLl9sYXllcnMgPSB7fTtcclxuXHRcdHRoaXMuX3pvb21Cb3VuZExheWVycyA9IHt9O1xyXG5cdFx0dGhpcy5fc2l6ZUNoYW5nZWQgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMuY2FsbEluaXRIb29rcygpO1xyXG5cclxuXHRcdHRoaXMuX2FkZExheWVycyh0aGlzLm9wdGlvbnMubGF5ZXJzKTtcclxuXHR9LFxyXG5cclxuXHJcblx0Ly8gcHVibGljIG1ldGhvZHMgdGhhdCBtb2RpZnkgbWFwIHN0YXRlXHJcblxyXG5cdC8vIHJlcGxhY2VkIGJ5IGFuaW1hdGlvbi1wb3dlcmVkIGltcGxlbWVudGF0aW9uIGluIE1hcC5QYW5BbmltYXRpb24uanNcclxuXHRzZXRWaWV3OiBmdW5jdGlvbiAoY2VudGVyLCB6b29tKSB7XHJcblx0XHR6b29tID0gem9vbSA9PT0gdW5kZWZpbmVkID8gdGhpcy5nZXRab29tKCkgOiB6b29tO1xyXG5cdFx0dGhpcy5fcmVzZXRWaWV3KEwubGF0TG5nKGNlbnRlciksIHpvb20pO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0c2V0Wm9vbTogZnVuY3Rpb24gKHpvb20sIG9wdGlvbnMpIHtcclxuXHRcdGlmICghdGhpcy5fbG9hZGVkKSB7XHJcblx0XHRcdHRoaXMuX3pvb20gPSB6b29tO1xyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLnNldFZpZXcodGhpcy5nZXRDZW50ZXIoKSwgem9vbSwge3pvb206IG9wdGlvbnN9KTtcclxuXHR9LFxyXG5cclxuXHR6b29tSW46IGZ1bmN0aW9uIChkZWx0YSwgb3B0aW9ucykge1xyXG5cdFx0cmV0dXJuIHRoaXMuc2V0Wm9vbSh0aGlzLl96b29tICsgKGRlbHRhIHx8IDEpLCBvcHRpb25zKTtcclxuXHR9LFxyXG5cclxuXHR6b29tT3V0OiBmdW5jdGlvbiAoZGVsdGEsIG9wdGlvbnMpIHtcclxuXHRcdHJldHVybiB0aGlzLnNldFpvb20odGhpcy5fem9vbSAtIChkZWx0YSB8fCAxKSwgb3B0aW9ucyk7XHJcblx0fSxcclxuXHJcblx0c2V0Wm9vbUFyb3VuZDogZnVuY3Rpb24gKGxhdGxuZywgem9vbSwgb3B0aW9ucykge1xyXG5cdFx0dmFyIHNjYWxlID0gdGhpcy5nZXRab29tU2NhbGUoem9vbSksXHJcblx0XHQgICAgdmlld0hhbGYgPSB0aGlzLmdldFNpemUoKS5kaXZpZGVCeSgyKSxcclxuXHRcdCAgICBjb250YWluZXJQb2ludCA9IGxhdGxuZyBpbnN0YW5jZW9mIEwuUG9pbnQgPyBsYXRsbmcgOiB0aGlzLmxhdExuZ1RvQ29udGFpbmVyUG9pbnQobGF0bG5nKSxcclxuXHJcblx0XHQgICAgY2VudGVyT2Zmc2V0ID0gY29udGFpbmVyUG9pbnQuc3VidHJhY3Qodmlld0hhbGYpLm11bHRpcGx5QnkoMSAtIDEgLyBzY2FsZSksXHJcblx0XHQgICAgbmV3Q2VudGVyID0gdGhpcy5jb250YWluZXJQb2ludFRvTGF0TG5nKHZpZXdIYWxmLmFkZChjZW50ZXJPZmZzZXQpKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5zZXRWaWV3KG5ld0NlbnRlciwgem9vbSwge3pvb206IG9wdGlvbnN9KTtcclxuXHR9LFxyXG5cclxuXHRfZ2V0Qm91bmRzQ2VudGVyWm9vbTogZnVuY3Rpb24gKGJvdW5kcywgb3B0aW9ucykge1xyXG5cclxuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdFx0Ym91bmRzID0gYm91bmRzLmdldEJvdW5kcyA/IGJvdW5kcy5nZXRCb3VuZHMoKSA6IEwubGF0TG5nQm91bmRzKGJvdW5kcyk7XHJcblxyXG5cdFx0dmFyIHBhZGRpbmdUTCA9IEwucG9pbnQob3B0aW9ucy5wYWRkaW5nVG9wTGVmdCB8fCBvcHRpb25zLnBhZGRpbmcgfHwgWzAsIDBdKSxcclxuXHRcdCAgICBwYWRkaW5nQlIgPSBMLnBvaW50KG9wdGlvbnMucGFkZGluZ0JvdHRvbVJpZ2h0IHx8IG9wdGlvbnMucGFkZGluZyB8fCBbMCwgMF0pLFxyXG5cclxuXHRcdCAgICB6b29tID0gdGhpcy5nZXRCb3VuZHNab29tKGJvdW5kcywgZmFsc2UsIHBhZGRpbmdUTC5hZGQocGFkZGluZ0JSKSk7XHJcblxyXG5cdFx0em9vbSA9IG9wdGlvbnMubWF4Wm9vbSA/IE1hdGgubWluKG9wdGlvbnMubWF4Wm9vbSwgem9vbSkgOiB6b29tO1xyXG5cclxuXHRcdHZhciBwYWRkaW5nT2Zmc2V0ID0gcGFkZGluZ0JSLnN1YnRyYWN0KHBhZGRpbmdUTCkuZGl2aWRlQnkoMiksXHJcblxyXG5cdFx0ICAgIHN3UG9pbnQgPSB0aGlzLnByb2plY3QoYm91bmRzLmdldFNvdXRoV2VzdCgpLCB6b29tKSxcclxuXHRcdCAgICBuZVBvaW50ID0gdGhpcy5wcm9qZWN0KGJvdW5kcy5nZXROb3J0aEVhc3QoKSwgem9vbSksXHJcblx0XHQgICAgY2VudGVyID0gdGhpcy51bnByb2plY3Qoc3dQb2ludC5hZGQobmVQb2ludCkuZGl2aWRlQnkoMikuYWRkKHBhZGRpbmdPZmZzZXQpLCB6b29tKTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRjZW50ZXI6IGNlbnRlcixcclxuXHRcdFx0em9vbTogem9vbVxyXG5cdFx0fTtcclxuXHR9LFxyXG5cclxuXHRmaXRCb3VuZHM6IGZ1bmN0aW9uIChib3VuZHMsIG9wdGlvbnMpIHtcclxuXHRcdHZhciB0YXJnZXQgPSB0aGlzLl9nZXRCb3VuZHNDZW50ZXJab29tKGJvdW5kcywgb3B0aW9ucyk7XHJcblx0XHRyZXR1cm4gdGhpcy5zZXRWaWV3KHRhcmdldC5jZW50ZXIsIHRhcmdldC56b29tLCBvcHRpb25zKTtcclxuXHR9LFxyXG5cclxuXHRmaXRXb3JsZDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHRcdHJldHVybiB0aGlzLmZpdEJvdW5kcyhbWy05MCwgLTE4MF0sIFs5MCwgMTgwXV0sIG9wdGlvbnMpO1xyXG5cdH0sXHJcblxyXG5cdHBhblRvOiBmdW5jdGlvbiAoY2VudGVyLCBvcHRpb25zKSB7IC8vIChMYXRMbmcpXHJcblx0XHRyZXR1cm4gdGhpcy5zZXRWaWV3KGNlbnRlciwgdGhpcy5fem9vbSwge3Bhbjogb3B0aW9uc30pO1xyXG5cdH0sXHJcblxyXG5cdHBhbkJ5OiBmdW5jdGlvbiAob2Zmc2V0KSB7IC8vIChQb2ludClcclxuXHRcdC8vIHJlcGxhY2VkIHdpdGggYW5pbWF0ZWQgcGFuQnkgaW4gTWFwLlBhbkFuaW1hdGlvbi5qc1xyXG5cdFx0dGhpcy5maXJlKCdtb3Zlc3RhcnQnKTtcclxuXHJcblx0XHR0aGlzLl9yYXdQYW5CeShMLnBvaW50KG9mZnNldCkpO1xyXG5cclxuXHRcdHRoaXMuZmlyZSgnbW92ZScpO1xyXG5cdFx0cmV0dXJuIHRoaXMuZmlyZSgnbW92ZWVuZCcpO1xyXG5cdH0sXHJcblxyXG5cdHNldE1heEJvdW5kczogZnVuY3Rpb24gKGJvdW5kcykge1xyXG5cdFx0Ym91bmRzID0gTC5sYXRMbmdCb3VuZHMoYm91bmRzKTtcclxuXHJcblx0XHRpZiAoIWJvdW5kcykge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5vZmYoJ21vdmVlbmQnLCB0aGlzLl9wYW5JbnNpZGVNYXhCb3VuZHMpO1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLm9wdGlvbnMubWF4Qm91bmRzKSB7XHJcblx0XHRcdHRoaXMub2ZmKCdtb3ZlZW5kJywgdGhpcy5fcGFuSW5zaWRlTWF4Qm91bmRzKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLm9wdGlvbnMubWF4Qm91bmRzID0gYm91bmRzO1xyXG5cclxuXHRcdGlmICh0aGlzLl9sb2FkZWQpIHtcclxuXHRcdFx0dGhpcy5fcGFuSW5zaWRlTWF4Qm91bmRzKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMub24oJ21vdmVlbmQnLCB0aGlzLl9wYW5JbnNpZGVNYXhCb3VuZHMpO1xyXG5cdH0sXHJcblxyXG5cdHNldE1pblpvb206IGZ1bmN0aW9uICh6b29tKSB7XHJcblx0XHR0aGlzLm9wdGlvbnMubWluWm9vbSA9IHpvb207XHJcblxyXG5cdFx0aWYgKHRoaXMuX2xvYWRlZCAmJiB0aGlzLmdldFpvb20oKSA8IHRoaXMub3B0aW9ucy5taW5ab29tKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLnNldFpvb20oem9vbSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0c2V0TWF4Wm9vbTogZnVuY3Rpb24gKHpvb20pIHtcclxuXHRcdHRoaXMub3B0aW9ucy5tYXhab29tID0gem9vbTtcclxuXHJcblx0XHRpZiAodGhpcy5fbG9hZGVkICYmICh0aGlzLmdldFpvb20oKSA+IHRoaXMub3B0aW9ucy5tYXhab29tKSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5zZXRab29tKHpvb20pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHBhbkluc2lkZUJvdW5kczogZnVuY3Rpb24gKGJvdW5kcywgb3B0aW9ucykge1xyXG5cdFx0dGhpcy5fZW5mb3JjaW5nQm91bmRzID0gdHJ1ZTtcclxuXHRcdHZhciBjZW50ZXIgPSB0aGlzLmdldENlbnRlcigpLFxyXG5cdFx0ICAgIG5ld0NlbnRlciA9IHRoaXMuX2xpbWl0Q2VudGVyKGNlbnRlciwgdGhpcy5fem9vbSwgTC5sYXRMbmdCb3VuZHMoYm91bmRzKSk7XHJcblxyXG5cdFx0aWYgKGNlbnRlci5lcXVhbHMobmV3Q2VudGVyKSkgeyByZXR1cm4gdGhpczsgfVxyXG5cclxuXHRcdHRoaXMucGFuVG8obmV3Q2VudGVyLCBvcHRpb25zKTtcclxuXHRcdHRoaXMuX2VuZm9yY2luZ0JvdW5kcyA9IGZhbHNlO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0aW52YWxpZGF0ZVNpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcblx0XHRpZiAoIXRoaXMuX2xvYWRlZCkgeyByZXR1cm4gdGhpczsgfVxyXG5cclxuXHRcdG9wdGlvbnMgPSBMLmV4dGVuZCh7XHJcblx0XHRcdGFuaW1hdGU6IGZhbHNlLFxyXG5cdFx0XHRwYW46IHRydWVcclxuXHRcdH0sIG9wdGlvbnMgPT09IHRydWUgPyB7YW5pbWF0ZTogdHJ1ZX0gOiBvcHRpb25zKTtcclxuXHJcblx0XHR2YXIgb2xkU2l6ZSA9IHRoaXMuZ2V0U2l6ZSgpO1xyXG5cdFx0dGhpcy5fc2l6ZUNoYW5nZWQgPSB0cnVlO1xyXG5cdFx0dGhpcy5fbGFzdENlbnRlciA9IG51bGw7XHJcblxyXG5cdFx0dmFyIG5ld1NpemUgPSB0aGlzLmdldFNpemUoKSxcclxuXHRcdCAgICBvbGRDZW50ZXIgPSBvbGRTaXplLmRpdmlkZUJ5KDIpLnJvdW5kKCksXHJcblx0XHQgICAgbmV3Q2VudGVyID0gbmV3U2l6ZS5kaXZpZGVCeSgyKS5yb3VuZCgpLFxyXG5cdFx0ICAgIG9mZnNldCA9IG9sZENlbnRlci5zdWJ0cmFjdChuZXdDZW50ZXIpO1xyXG5cclxuXHRcdGlmICghb2Zmc2V0LnggJiYgIW9mZnNldC55KSB7IHJldHVybiB0aGlzOyB9XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMuYW5pbWF0ZSAmJiBvcHRpb25zLnBhbikge1xyXG5cdFx0XHR0aGlzLnBhbkJ5KG9mZnNldCk7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKG9wdGlvbnMucGFuKSB7XHJcblx0XHRcdFx0dGhpcy5fcmF3UGFuQnkob2Zmc2V0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5maXJlKCdtb3ZlJyk7XHJcblxyXG5cdFx0XHRpZiAob3B0aW9ucy5kZWJvdW5jZU1vdmVlbmQpIHtcclxuXHRcdFx0XHRjbGVhclRpbWVvdXQodGhpcy5fc2l6ZVRpbWVyKTtcclxuXHRcdFx0XHR0aGlzLl9zaXplVGltZXIgPSBzZXRUaW1lb3V0KEwuYmluZCh0aGlzLmZpcmUsIHRoaXMsICdtb3ZlZW5kJyksIDIwMCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5maXJlKCdtb3ZlZW5kJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5maXJlKCdyZXNpemUnLCB7XHJcblx0XHRcdG9sZFNpemU6IG9sZFNpemUsXHJcblx0XHRcdG5ld1NpemU6IG5ld1NpemVcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdHN0b3A6IGZ1bmN0aW9uICgpIHtcclxuXHRcdEwuVXRpbC5jYW5jZWxBbmltRnJhbWUodGhpcy5fZmx5VG9GcmFtZSk7XHJcblx0XHRpZiAodGhpcy5fcGFuQW5pbSkge1xyXG5cdFx0XHR0aGlzLl9wYW5BbmltLnN0b3AoKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdC8vIFRPRE8gaGFuZGxlci5hZGRUb1xyXG5cdGFkZEhhbmRsZXI6IGZ1bmN0aW9uIChuYW1lLCBIYW5kbGVyQ2xhc3MpIHtcclxuXHRcdGlmICghSGFuZGxlckNsYXNzKSB7IHJldHVybiB0aGlzOyB9XHJcblxyXG5cdFx0dmFyIGhhbmRsZXIgPSB0aGlzW25hbWVdID0gbmV3IEhhbmRsZXJDbGFzcyh0aGlzKTtcclxuXHJcblx0XHR0aGlzLl9oYW5kbGVycy5wdXNoKGhhbmRsZXIpO1xyXG5cclxuXHRcdGlmICh0aGlzLm9wdGlvbnNbbmFtZV0pIHtcclxuXHRcdFx0aGFuZGxlci5lbmFibGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRyZW1vdmU6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHR0aGlzLl9pbml0RXZlbnRzKHRydWUpO1xyXG5cclxuXHRcdHRyeSB7XHJcblx0XHRcdC8vIHRocm93cyBlcnJvciBpbiBJRTYtOFxyXG5cdFx0XHRkZWxldGUgdGhpcy5fY29udGFpbmVyLl9sZWFmbGV0O1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHR0aGlzLl9jb250YWluZXIuX2xlYWZsZXQgPSB1bmRlZmluZWQ7XHJcblx0XHR9XHJcblxyXG5cdFx0TC5Eb21VdGlsLnJlbW92ZSh0aGlzLl9tYXBQYW5lKTtcclxuXHJcblx0XHRpZiAodGhpcy5fY2xlYXJDb250cm9sUG9zKSB7XHJcblx0XHRcdHRoaXMuX2NsZWFyQ29udHJvbFBvcygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX2NsZWFySGFuZGxlcnMoKTtcclxuXHJcblx0XHRpZiAodGhpcy5fbG9hZGVkKSB7XHJcblx0XHRcdHRoaXMuZmlyZSgndW5sb2FkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yICh2YXIgaSBpbiB0aGlzLl9sYXllcnMpIHtcclxuXHRcdFx0dGhpcy5fbGF5ZXJzW2ldLnJlbW92ZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdGNyZWF0ZVBhbmU6IGZ1bmN0aW9uIChuYW1lLCBjb250YWluZXIpIHtcclxuXHRcdHZhciBjbGFzc05hbWUgPSAnbGVhZmxldC1wYW5lJyArIChuYW1lID8gJyBsZWFmbGV0LScgKyBuYW1lLnJlcGxhY2UoJ1BhbmUnLCAnJykgKyAnLXBhbmUnIDogJycpLFxyXG5cdFx0ICAgIHBhbmUgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCBjbGFzc05hbWUsIGNvbnRhaW5lciB8fCB0aGlzLl9tYXBQYW5lKTtcclxuXHJcblx0XHRpZiAobmFtZSkge1xyXG5cdFx0XHR0aGlzLl9wYW5lc1tuYW1lXSA9IHBhbmU7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcGFuZTtcclxuXHR9LFxyXG5cclxuXHJcblx0Ly8gcHVibGljIG1ldGhvZHMgZm9yIGdldHRpbmcgbWFwIHN0YXRlXHJcblxyXG5cdGdldENlbnRlcjogZnVuY3Rpb24gKCkgeyAvLyAoQm9vbGVhbikgLT4gTGF0TG5nXHJcblx0XHR0aGlzLl9jaGVja0lmTG9hZGVkKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2xhc3RDZW50ZXIgJiYgIXRoaXMuX21vdmVkKCkpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2xhc3RDZW50ZXI7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5sYXllclBvaW50VG9MYXRMbmcodGhpcy5fZ2V0Q2VudGVyTGF5ZXJQb2ludCgpKTtcclxuXHR9LFxyXG5cclxuXHRnZXRab29tOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fem9vbTtcclxuXHR9LFxyXG5cclxuXHRnZXRCb3VuZHM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBib3VuZHMgPSB0aGlzLmdldFBpeGVsQm91bmRzKCksXHJcblx0XHQgICAgc3cgPSB0aGlzLnVucHJvamVjdChib3VuZHMuZ2V0Qm90dG9tTGVmdCgpKSxcclxuXHRcdCAgICBuZSA9IHRoaXMudW5wcm9qZWN0KGJvdW5kcy5nZXRUb3BSaWdodCgpKTtcclxuXHJcblx0XHRyZXR1cm4gbmV3IEwuTGF0TG5nQm91bmRzKHN3LCBuZSk7XHJcblx0fSxcclxuXHJcblx0Z2V0TWluWm9vbTogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMub3B0aW9ucy5taW5ab29tID09PSB1bmRlZmluZWQgPyB0aGlzLl9sYXllcnNNaW5ab29tIHx8IDAgOiB0aGlzLm9wdGlvbnMubWluWm9vbTtcclxuXHR9LFxyXG5cclxuXHRnZXRNYXhab29tOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLm1heFpvb20gPT09IHVuZGVmaW5lZCA/XHJcblx0XHRcdCh0aGlzLl9sYXllcnNNYXhab29tID09PSB1bmRlZmluZWQgPyBJbmZpbml0eSA6IHRoaXMuX2xheWVyc01heFpvb20pIDpcclxuXHRcdFx0dGhpcy5vcHRpb25zLm1heFpvb207XHJcblx0fSxcclxuXHJcblx0Z2V0Qm91bmRzWm9vbTogZnVuY3Rpb24gKGJvdW5kcywgaW5zaWRlLCBwYWRkaW5nKSB7IC8vIChMYXRMbmdCb3VuZHNbLCBCb29sZWFuLCBQb2ludF0pIC0+IE51bWJlclxyXG5cdFx0Ym91bmRzID0gTC5sYXRMbmdCb3VuZHMoYm91bmRzKTtcclxuXHJcblx0XHR2YXIgem9vbSA9IHRoaXMuZ2V0TWluWm9vbSgpIC0gKGluc2lkZSA/IDEgOiAwKSxcclxuXHRcdCAgICBtYXhab29tID0gdGhpcy5nZXRNYXhab29tKCksXHJcblx0XHQgICAgc2l6ZSA9IHRoaXMuZ2V0U2l6ZSgpLFxyXG5cclxuXHRcdCAgICBudyA9IGJvdW5kcy5nZXROb3J0aFdlc3QoKSxcclxuXHRcdCAgICBzZSA9IGJvdW5kcy5nZXRTb3V0aEVhc3QoKSxcclxuXHJcblx0XHQgICAgem9vbU5vdEZvdW5kID0gdHJ1ZSxcclxuXHRcdCAgICBib3VuZHNTaXplO1xyXG5cclxuXHRcdHBhZGRpbmcgPSBMLnBvaW50KHBhZGRpbmcgfHwgWzAsIDBdKTtcclxuXHJcblx0XHRkbyB7XHJcblx0XHRcdHpvb20rKztcclxuXHRcdFx0Ym91bmRzU2l6ZSA9IHRoaXMucHJvamVjdChzZSwgem9vbSkuc3VidHJhY3QodGhpcy5wcm9qZWN0KG53LCB6b29tKSkuYWRkKHBhZGRpbmcpLmZsb29yKCk7XHJcblx0XHRcdHpvb21Ob3RGb3VuZCA9ICFpbnNpZGUgPyBzaXplLmNvbnRhaW5zKGJvdW5kc1NpemUpIDogYm91bmRzU2l6ZS54IDwgc2l6ZS54IHx8IGJvdW5kc1NpemUueSA8IHNpemUueTtcclxuXHJcblx0XHR9IHdoaWxlICh6b29tTm90Rm91bmQgJiYgem9vbSA8PSBtYXhab29tKTtcclxuXHJcblx0XHRpZiAoem9vbU5vdEZvdW5kICYmIGluc2lkZSkge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaW5zaWRlID8gem9vbSA6IHpvb20gLSAxO1xyXG5cdH0sXHJcblxyXG5cdGdldFNpemU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICghdGhpcy5fc2l6ZSB8fCB0aGlzLl9zaXplQ2hhbmdlZCkge1xyXG5cdFx0XHR0aGlzLl9zaXplID0gbmV3IEwuUG9pbnQoXHJcblx0XHRcdFx0dGhpcy5fY29udGFpbmVyLmNsaWVudFdpZHRoLFxyXG5cdFx0XHRcdHRoaXMuX2NvbnRhaW5lci5jbGllbnRIZWlnaHQpO1xyXG5cclxuXHRcdFx0dGhpcy5fc2l6ZUNoYW5nZWQgPSBmYWxzZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLl9zaXplLmNsb25lKCk7XHJcblx0fSxcclxuXHJcblx0Z2V0UGl4ZWxCb3VuZHM6IGZ1bmN0aW9uIChjZW50ZXIsIHpvb20pIHtcclxuXHRcdHZhciB0b3BMZWZ0UG9pbnQgPSB0aGlzLl9nZXRUb3BMZWZ0UG9pbnQoY2VudGVyLCB6b29tKTtcclxuXHRcdHJldHVybiBuZXcgTC5Cb3VuZHModG9wTGVmdFBvaW50LCB0b3BMZWZ0UG9pbnQuYWRkKHRoaXMuZ2V0U2l6ZSgpKSk7XHJcblx0fSxcclxuXHJcblx0Z2V0UGl4ZWxPcmlnaW46IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMuX2NoZWNrSWZMb2FkZWQoKTtcclxuXHRcdHJldHVybiB0aGlzLl9waXhlbE9yaWdpbjtcclxuXHR9LFxyXG5cclxuXHRnZXRQaXhlbFdvcmxkQm91bmRzOiBmdW5jdGlvbiAoem9vbSkge1xyXG5cdFx0cmV0dXJuIHRoaXMub3B0aW9ucy5jcnMuZ2V0UHJvamVjdGVkQm91bmRzKHpvb20gPT09IHVuZGVmaW5lZCA/IHRoaXMuZ2V0Wm9vbSgpIDogem9vbSk7XHJcblx0fSxcclxuXHJcblx0Z2V0UGFuZTogZnVuY3Rpb24gKHBhbmUpIHtcclxuXHRcdHJldHVybiB0eXBlb2YgcGFuZSA9PT0gJ3N0cmluZycgPyB0aGlzLl9wYW5lc1twYW5lXSA6IHBhbmU7XHJcblx0fSxcclxuXHJcblx0Z2V0UGFuZXM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLl9wYW5lcztcclxuXHR9LFxyXG5cclxuXHRnZXRDb250YWluZXI6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLl9jb250YWluZXI7XHJcblx0fSxcclxuXHJcblxyXG5cdC8vIFRPRE8gcmVwbGFjZSB3aXRoIHVuaXZlcnNhbCBpbXBsZW1lbnRhdGlvbiBhZnRlciByZWZhY3RvcmluZyBwcm9qZWN0aW9uc1xyXG5cclxuXHRnZXRab29tU2NhbGU6IGZ1bmN0aW9uICh0b1pvb20sIGZyb21ab29tKSB7XHJcblx0XHR2YXIgY3JzID0gdGhpcy5vcHRpb25zLmNycztcclxuXHRcdGZyb21ab29tID0gZnJvbVpvb20gPT09IHVuZGVmaW5lZCA/IHRoaXMuX3pvb20gOiBmcm9tWm9vbTtcclxuXHRcdHJldHVybiBjcnMuc2NhbGUodG9ab29tKSAvIGNycy5zY2FsZShmcm9tWm9vbSk7XHJcblx0fSxcclxuXHJcblx0Z2V0U2NhbGVab29tOiBmdW5jdGlvbiAoc2NhbGUsIGZyb21ab29tKSB7XHJcblx0XHR2YXIgY3JzID0gdGhpcy5vcHRpb25zLmNycztcclxuXHRcdGZyb21ab29tID0gZnJvbVpvb20gPT09IHVuZGVmaW5lZCA/IHRoaXMuX3pvb20gOiBmcm9tWm9vbTtcclxuXHRcdHJldHVybiBjcnMuem9vbShzY2FsZSAqIGNycy5zY2FsZShmcm9tWm9vbSkpO1xyXG5cdH0sXHJcblxyXG5cdC8vIGNvbnZlcnNpb24gbWV0aG9kc1xyXG5cclxuXHRwcm9qZWN0OiBmdW5jdGlvbiAobGF0bG5nLCB6b29tKSB7IC8vIChMYXRMbmdbLCBOdW1iZXJdKSAtPiBQb2ludFxyXG5cdFx0em9vbSA9IHpvb20gPT09IHVuZGVmaW5lZCA/IHRoaXMuX3pvb20gOiB6b29tO1xyXG5cdFx0cmV0dXJuIHRoaXMub3B0aW9ucy5jcnMubGF0TG5nVG9Qb2ludChMLmxhdExuZyhsYXRsbmcpLCB6b29tKTtcclxuXHR9LFxyXG5cclxuXHR1bnByb2plY3Q6IGZ1bmN0aW9uIChwb2ludCwgem9vbSkgeyAvLyAoUG9pbnRbLCBOdW1iZXJdKSAtPiBMYXRMbmdcclxuXHRcdHpvb20gPSB6b29tID09PSB1bmRlZmluZWQgPyB0aGlzLl96b29tIDogem9vbTtcclxuXHRcdHJldHVybiB0aGlzLm9wdGlvbnMuY3JzLnBvaW50VG9MYXRMbmcoTC5wb2ludChwb2ludCksIHpvb20pO1xyXG5cdH0sXHJcblxyXG5cdGxheWVyUG9pbnRUb0xhdExuZzogZnVuY3Rpb24gKHBvaW50KSB7IC8vIChQb2ludClcclxuXHRcdHZhciBwcm9qZWN0ZWRQb2ludCA9IEwucG9pbnQocG9pbnQpLmFkZCh0aGlzLmdldFBpeGVsT3JpZ2luKCkpO1xyXG5cdFx0cmV0dXJuIHRoaXMudW5wcm9qZWN0KHByb2plY3RlZFBvaW50KTtcclxuXHR9LFxyXG5cclxuXHRsYXRMbmdUb0xheWVyUG9pbnQ6IGZ1bmN0aW9uIChsYXRsbmcpIHsgLy8gKExhdExuZylcclxuXHRcdHZhciBwcm9qZWN0ZWRQb2ludCA9IHRoaXMucHJvamVjdChMLmxhdExuZyhsYXRsbmcpKS5fcm91bmQoKTtcclxuXHRcdHJldHVybiBwcm9qZWN0ZWRQb2ludC5fc3VidHJhY3QodGhpcy5nZXRQaXhlbE9yaWdpbigpKTtcclxuXHR9LFxyXG5cclxuXHR3cmFwTGF0TG5nOiBmdW5jdGlvbiAobGF0bG5nKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLmNycy53cmFwTGF0TG5nKEwubGF0TG5nKGxhdGxuZykpO1xyXG5cdH0sXHJcblxyXG5cdGRpc3RhbmNlOiBmdW5jdGlvbiAobGF0bG5nMSwgbGF0bG5nMikge1xyXG5cdFx0cmV0dXJuIHRoaXMub3B0aW9ucy5jcnMuZGlzdGFuY2UoTC5sYXRMbmcobGF0bG5nMSksIEwubGF0TG5nKGxhdGxuZzIpKTtcclxuXHR9LFxyXG5cclxuXHRjb250YWluZXJQb2ludFRvTGF5ZXJQb2ludDogZnVuY3Rpb24gKHBvaW50KSB7IC8vIChQb2ludClcclxuXHRcdHJldHVybiBMLnBvaW50KHBvaW50KS5zdWJ0cmFjdCh0aGlzLl9nZXRNYXBQYW5lUG9zKCkpO1xyXG5cdH0sXHJcblxyXG5cdGxheWVyUG9pbnRUb0NvbnRhaW5lclBvaW50OiBmdW5jdGlvbiAocG9pbnQpIHsgLy8gKFBvaW50KVxyXG5cdFx0cmV0dXJuIEwucG9pbnQocG9pbnQpLmFkZCh0aGlzLl9nZXRNYXBQYW5lUG9zKCkpO1xyXG5cdH0sXHJcblxyXG5cdGNvbnRhaW5lclBvaW50VG9MYXRMbmc6IGZ1bmN0aW9uIChwb2ludCkge1xyXG5cdFx0dmFyIGxheWVyUG9pbnQgPSB0aGlzLmNvbnRhaW5lclBvaW50VG9MYXllclBvaW50KEwucG9pbnQocG9pbnQpKTtcclxuXHRcdHJldHVybiB0aGlzLmxheWVyUG9pbnRUb0xhdExuZyhsYXllclBvaW50KTtcclxuXHR9LFxyXG5cclxuXHRsYXRMbmdUb0NvbnRhaW5lclBvaW50OiBmdW5jdGlvbiAobGF0bG5nKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5sYXllclBvaW50VG9Db250YWluZXJQb2ludCh0aGlzLmxhdExuZ1RvTGF5ZXJQb2ludChMLmxhdExuZyhsYXRsbmcpKSk7XHJcblx0fSxcclxuXHJcblx0bW91c2VFdmVudFRvQ29udGFpbmVyUG9pbnQ6IGZ1bmN0aW9uIChlKSB7IC8vIChNb3VzZUV2ZW50KVxyXG5cdFx0cmV0dXJuIEwuRG9tRXZlbnQuZ2V0TW91c2VQb3NpdGlvbihlLCB0aGlzLl9jb250YWluZXIpO1xyXG5cdH0sXHJcblxyXG5cdG1vdXNlRXZlbnRUb0xheWVyUG9pbnQ6IGZ1bmN0aW9uIChlKSB7IC8vIChNb3VzZUV2ZW50KVxyXG5cdFx0cmV0dXJuIHRoaXMuY29udGFpbmVyUG9pbnRUb0xheWVyUG9pbnQodGhpcy5tb3VzZUV2ZW50VG9Db250YWluZXJQb2ludChlKSk7XHJcblx0fSxcclxuXHJcblx0bW91c2VFdmVudFRvTGF0TG5nOiBmdW5jdGlvbiAoZSkgeyAvLyAoTW91c2VFdmVudClcclxuXHRcdHJldHVybiB0aGlzLmxheWVyUG9pbnRUb0xhdExuZyh0aGlzLm1vdXNlRXZlbnRUb0xheWVyUG9pbnQoZSkpO1xyXG5cdH0sXHJcblxyXG5cclxuXHQvLyBtYXAgaW5pdGlhbGl6YXRpb24gbWV0aG9kc1xyXG5cclxuXHRfaW5pdENvbnRhaW5lcjogZnVuY3Rpb24gKGlkKSB7XHJcblx0XHR2YXIgY29udGFpbmVyID0gdGhpcy5fY29udGFpbmVyID0gTC5Eb21VdGlsLmdldChpZCk7XHJcblxyXG5cdFx0aWYgKCFjb250YWluZXIpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdNYXAgY29udGFpbmVyIG5vdCBmb3VuZC4nKTtcclxuXHRcdH0gZWxzZSBpZiAoY29udGFpbmVyLl9sZWFmbGV0KSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcignTWFwIGNvbnRhaW5lciBpcyBhbHJlYWR5IGluaXRpYWxpemVkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIoY29udGFpbmVyLCAnc2Nyb2xsJywgdGhpcy5fb25TY3JvbGwsIHRoaXMpO1xyXG5cdFx0Y29udGFpbmVyLl9sZWFmbGV0ID0gdHJ1ZTtcclxuXHR9LFxyXG5cclxuXHRfaW5pdExheW91dDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGNvbnRhaW5lciA9IHRoaXMuX2NvbnRhaW5lcjtcclxuXHJcblx0XHR0aGlzLl9mYWRlQW5pbWF0ZWQgPSB0aGlzLm9wdGlvbnMuZmFkZUFuaW1hdGlvbiAmJiBMLkJyb3dzZXIuYW55M2Q7XHJcblxyXG5cdFx0TC5Eb21VdGlsLmFkZENsYXNzKGNvbnRhaW5lciwgJ2xlYWZsZXQtY29udGFpbmVyJyArXHJcblx0XHRcdChMLkJyb3dzZXIudG91Y2ggPyAnIGxlYWZsZXQtdG91Y2gnIDogJycpICtcclxuXHRcdFx0KEwuQnJvd3Nlci5yZXRpbmEgPyAnIGxlYWZsZXQtcmV0aW5hJyA6ICcnKSArXHJcblx0XHRcdChMLkJyb3dzZXIuaWVsdDkgPyAnIGxlYWZsZXQtb2xkaWUnIDogJycpICtcclxuXHRcdFx0KEwuQnJvd3Nlci5zYWZhcmkgPyAnIGxlYWZsZXQtc2FmYXJpJyA6ICcnKSArXHJcblx0XHRcdCh0aGlzLl9mYWRlQW5pbWF0ZWQgPyAnIGxlYWZsZXQtZmFkZS1hbmltJyA6ICcnKSk7XHJcblxyXG5cdFx0dmFyIHBvc2l0aW9uID0gTC5Eb21VdGlsLmdldFN0eWxlKGNvbnRhaW5lciwgJ3Bvc2l0aW9uJyk7XHJcblxyXG5cdFx0aWYgKHBvc2l0aW9uICE9PSAnYWJzb2x1dGUnICYmIHBvc2l0aW9uICE9PSAncmVsYXRpdmUnICYmIHBvc2l0aW9uICE9PSAnZml4ZWQnKSB7XHJcblx0XHRcdGNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5faW5pdFBhbmVzKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2luaXRDb250cm9sUG9zKSB7XHJcblx0XHRcdHRoaXMuX2luaXRDb250cm9sUG9zKCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X2luaXRQYW5lczogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIHBhbmVzID0gdGhpcy5fcGFuZXMgPSB7fTtcclxuXHRcdHRoaXMuX3BhbmVSZW5kZXJlcnMgPSB7fTtcclxuXHJcblx0XHR0aGlzLl9tYXBQYW5lID0gdGhpcy5jcmVhdGVQYW5lKCdtYXBQYW5lJywgdGhpcy5fY29udGFpbmVyKTtcclxuXHRcdEwuRG9tVXRpbC5zZXRQb3NpdGlvbih0aGlzLl9tYXBQYW5lLCBuZXcgTC5Qb2ludCgwLCAwKSk7XHJcblxyXG5cdFx0dGhpcy5jcmVhdGVQYW5lKCd0aWxlUGFuZScpO1xyXG5cdFx0dGhpcy5jcmVhdGVQYW5lKCdzaGFkb3dQYW5lJyk7XHJcblx0XHR0aGlzLmNyZWF0ZVBhbmUoJ292ZXJsYXlQYW5lJyk7XHJcblx0XHR0aGlzLmNyZWF0ZVBhbmUoJ21hcmtlclBhbmUnKTtcclxuXHRcdHRoaXMuY3JlYXRlUGFuZSgncG9wdXBQYW5lJyk7XHJcblxyXG5cdFx0aWYgKCF0aGlzLm9wdGlvbnMubWFya2VyWm9vbUFuaW1hdGlvbikge1xyXG5cdFx0XHRMLkRvbVV0aWwuYWRkQ2xhc3MocGFuZXMubWFya2VyUGFuZSwgJ2xlYWZsZXQtem9vbS1oaWRlJyk7XHJcblx0XHRcdEwuRG9tVXRpbC5hZGRDbGFzcyhwYW5lcy5zaGFkb3dQYW5lLCAnbGVhZmxldC16b29tLWhpZGUnKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0Ly8gcHJpdmF0ZSBtZXRob2RzIHRoYXQgbW9kaWZ5IG1hcCBzdGF0ZVxyXG5cclxuXHRfcmVzZXRWaWV3OiBmdW5jdGlvbiAoY2VudGVyLCB6b29tKSB7XHJcblx0XHRMLkRvbVV0aWwuc2V0UG9zaXRpb24odGhpcy5fbWFwUGFuZSwgbmV3IEwuUG9pbnQoMCwgMCkpO1xyXG5cclxuXHRcdHZhciBsb2FkaW5nID0gIXRoaXMuX2xvYWRlZDtcclxuXHRcdHRoaXMuX2xvYWRlZCA9IHRydWU7XHJcblx0XHR6b29tID0gdGhpcy5fbGltaXRab29tKHpvb20pO1xyXG5cclxuXHRcdHZhciB6b29tQ2hhbmdlZCA9IHRoaXMuX3pvb20gIT09IHpvb207XHJcblx0XHR0aGlzXHJcblx0XHRcdC5fbW92ZVN0YXJ0KHpvb21DaGFuZ2VkKVxyXG5cdFx0XHQuX21vdmUoY2VudGVyLCB6b29tKVxyXG5cdFx0XHQuX21vdmVFbmQoem9vbUNoYW5nZWQpO1xyXG5cclxuXHRcdHRoaXMuZmlyZSgndmlld3Jlc2V0Jyk7XHJcblxyXG5cdFx0aWYgKGxvYWRpbmcpIHtcclxuXHRcdFx0dGhpcy5maXJlKCdsb2FkJyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X21vdmVTdGFydDogZnVuY3Rpb24gKHpvb21DaGFuZ2VkKSB7XHJcblx0XHRpZiAoem9vbUNoYW5nZWQpIHtcclxuXHRcdFx0dGhpcy5maXJlKCd6b29tc3RhcnQnKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLmZpcmUoJ21vdmVzdGFydCcpO1xyXG5cdH0sXHJcblxyXG5cdF9tb3ZlOiBmdW5jdGlvbiAoY2VudGVyLCB6b29tLCBkYXRhKSB7XHJcblx0XHRpZiAoem9vbSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHpvb20gPSB0aGlzLl96b29tO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciB6b29tQ2hhbmdlZCA9IHRoaXMuX3pvb20gIT09IHpvb207XHJcblxyXG5cdFx0dGhpcy5fem9vbSA9IHpvb207XHJcblx0XHR0aGlzLl9sYXN0Q2VudGVyID0gY2VudGVyO1xyXG5cdFx0dGhpcy5fcGl4ZWxPcmlnaW4gPSB0aGlzLl9nZXROZXdQaXhlbE9yaWdpbihjZW50ZXIpO1xyXG5cclxuXHRcdGlmICh6b29tQ2hhbmdlZCkge1xyXG5cdFx0XHR0aGlzLmZpcmUoJ3pvb20nLCBkYXRhKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLmZpcmUoJ21vdmUnLCBkYXRhKTtcclxuXHR9LFxyXG5cclxuXHRfbW92ZUVuZDogZnVuY3Rpb24gKHpvb21DaGFuZ2VkKSB7XHJcblx0XHRpZiAoem9vbUNoYW5nZWQpIHtcclxuXHRcdFx0dGhpcy5maXJlKCd6b29tZW5kJyk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5maXJlKCdtb3ZlZW5kJyk7XHJcblx0fSxcclxuXHJcblx0X3Jhd1BhbkJ5OiBmdW5jdGlvbiAob2Zmc2V0KSB7XHJcblx0XHRMLkRvbVV0aWwuc2V0UG9zaXRpb24odGhpcy5fbWFwUGFuZSwgdGhpcy5fZ2V0TWFwUGFuZVBvcygpLnN1YnRyYWN0KG9mZnNldCkpO1xyXG5cdH0sXHJcblxyXG5cdF9nZXRab29tU3BhbjogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuZ2V0TWF4Wm9vbSgpIC0gdGhpcy5nZXRNaW5ab29tKCk7XHJcblx0fSxcclxuXHJcblx0X3Bhbkluc2lkZU1heEJvdW5kczogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKCF0aGlzLl9lbmZvcmNpbmdCb3VuZHMpIHtcclxuXHRcdFx0dGhpcy5wYW5JbnNpZGVCb3VuZHModGhpcy5vcHRpb25zLm1heEJvdW5kcyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X2NoZWNrSWZMb2FkZWQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICghdGhpcy5fbG9hZGVkKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcignU2V0IG1hcCBjZW50ZXIgYW5kIHpvb20gZmlyc3QuJyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Ly8gRE9NIGV2ZW50IGhhbmRsaW5nXHJcblxyXG5cdF9pbml0RXZlbnRzOiBmdW5jdGlvbiAocmVtb3ZlKSB7XHJcblx0XHRpZiAoIUwuRG9tRXZlbnQpIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0dGhpcy5fdGFyZ2V0cyA9IHt9O1xyXG5cdFx0dGhpcy5fdGFyZ2V0c1tMLnN0YW1wKHRoaXMuX2NvbnRhaW5lcildID0gdGhpcztcclxuXHJcblx0XHR2YXIgb25PZmYgPSByZW1vdmUgPyAnb2ZmJyA6ICdvbic7XHJcblxyXG5cdFx0TC5Eb21FdmVudFtvbk9mZl0odGhpcy5fY29udGFpbmVyLCAnY2xpY2sgZGJsY2xpY2sgbW91c2Vkb3duIG1vdXNldXAgJyArXHJcblx0XHRcdCdtb3VzZW92ZXIgbW91c2VvdXQgbW91c2Vtb3ZlIGNvbnRleHRtZW51IGtleXByZXNzJywgdGhpcy5faGFuZGxlRE9NRXZlbnQsIHRoaXMpO1xyXG5cclxuXHRcdGlmICh0aGlzLm9wdGlvbnMudHJhY2tSZXNpemUpIHtcclxuXHRcdFx0TC5Eb21FdmVudFtvbk9mZl0od2luZG93LCAncmVzaXplJywgdGhpcy5fb25SZXNpemUsIHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChMLkJyb3dzZXIuYW55M2QgJiYgdGhpcy5vcHRpb25zLnRyYW5zZm9ybTNETGltaXQpIHtcclxuXHRcdFx0dGhpc1tvbk9mZl0oJ21vdmVlbmQnLCB0aGlzLl9vbk1vdmVFbmQpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF9vblJlc2l6ZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0TC5VdGlsLmNhbmNlbEFuaW1GcmFtZSh0aGlzLl9yZXNpemVSZXF1ZXN0KTtcclxuXHRcdHRoaXMuX3Jlc2l6ZVJlcXVlc3QgPSBMLlV0aWwucmVxdWVzdEFuaW1GcmFtZShcclxuXHRcdCAgICAgICAgZnVuY3Rpb24gKCkgeyB0aGlzLmludmFsaWRhdGVTaXplKHtkZWJvdW5jZU1vdmVlbmQ6IHRydWV9KTsgfSwgdGhpcyk7XHJcblx0fSxcclxuXHJcblx0X29uU2Nyb2xsOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLl9jb250YWluZXIuc2Nyb2xsVG9wICA9IDA7XHJcblx0XHR0aGlzLl9jb250YWluZXIuc2Nyb2xsTGVmdCA9IDA7XHJcblx0fSxcclxuXHJcblx0X29uTW92ZUVuZDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIHBvcyA9IHRoaXMuX2dldE1hcFBhbmVQb3MoKTtcclxuXHRcdGlmIChNYXRoLm1heChNYXRoLmFicyhwb3MueCksIE1hdGguYWJzKHBvcy55KSkgPj0gdGhpcy5vcHRpb25zLnRyYW5zZm9ybTNETGltaXQpIHtcclxuXHRcdFx0Ly8gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTIwMzg3MyBidXQgV2Via2l0IGFsc28gaGF2ZVxyXG5cdFx0XHQvLyBhIHBpeGVsIG9mZnNldCBvbiB2ZXJ5IGhpZ2ggdmFsdWVzLCBzZWU6IGh0dHA6Ly9qc2ZpZGRsZS5uZXQvZGc2cjVoaGIvXHJcblx0XHRcdHRoaXMuX3Jlc2V0Vmlldyh0aGlzLmdldENlbnRlcigpLCB0aGlzLmdldFpvb20oKSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X2ZpbmRFdmVudFRhcmdldHM6IGZ1bmN0aW9uIChlLCB0eXBlKSB7XHJcblx0XHR2YXIgdGFyZ2V0cyA9IFtdLFxyXG5cdFx0ICAgIHRhcmdldCxcclxuXHRcdCAgICBpc0hvdmVyID0gdHlwZSA9PT0gJ21vdXNlb3V0JyB8fCB0eXBlID09PSAnbW91c2VvdmVyJyxcclxuXHRcdCAgICBzcmMgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XHJcblxyXG5cdFx0d2hpbGUgKHNyYykge1xyXG5cdFx0XHR0YXJnZXQgPSB0aGlzLl90YXJnZXRzW0wuc3RhbXAoc3JjKV07XHJcblx0XHRcdGlmICh0YXJnZXQgJiYgdGFyZ2V0Lmxpc3RlbnModHlwZSwgdHJ1ZSkpIHtcclxuXHRcdFx0XHRpZiAoaXNIb3ZlciAmJiAhTC5Eb21FdmVudC5faXNFeHRlcm5hbFRhcmdldChzcmMsIGUpKSB7IGJyZWFrOyB9XHJcblx0XHRcdFx0dGFyZ2V0cy5wdXNoKHRhcmdldCk7XHJcblx0XHRcdFx0aWYgKGlzSG92ZXIpIHsgYnJlYWs7IH1cclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoc3JjID09PSB0aGlzLl9jb250YWluZXIpIHsgYnJlYWs7IH1cclxuXHRcdFx0c3JjID0gc3JjLnBhcmVudE5vZGU7XHJcblx0XHR9XHJcblx0XHRpZiAoIXRhcmdldHMubGVuZ3RoICYmICFpc0hvdmVyICYmIEwuRG9tRXZlbnQuX2lzRXh0ZXJuYWxUYXJnZXQoc3JjLCBlKSkge1xyXG5cdFx0XHR0YXJnZXRzID0gW3RoaXNdO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRhcmdldHM7XHJcblx0fSxcclxuXHJcblx0X2hhbmRsZURPTUV2ZW50OiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0aWYgKCF0aGlzLl9sb2FkZWQgfHwgTC5Eb21FdmVudC5fc2tpcHBlZChlKSkgeyByZXR1cm47IH1cclxuXHJcblx0XHQvLyBmaW5kIHRoZSBsYXllciB0aGUgZXZlbnQgaXMgcHJvcGFnYXRpbmcgZnJvbSBhbmQgaXRzIHBhcmVudHNcclxuXHRcdHZhciB0eXBlID0gZS50eXBlID09PSAna2V5cHJlc3MnICYmIGUua2V5Q29kZSA9PT0gMTMgPyAnY2xpY2snIDogZS50eXBlO1xyXG5cclxuXHRcdGlmIChlLnR5cGUgPT09ICdjbGljaycpIHtcclxuXHRcdFx0Ly8gRmlyZSBhIHN5bnRoZXRpYyAncHJlY2xpY2snIGV2ZW50IHdoaWNoIHByb3BhZ2F0ZXMgdXAgKG1haW5seSBmb3IgY2xvc2luZyBwb3B1cHMpLlxyXG5cdFx0XHR2YXIgc3ludGggPSBMLlV0aWwuZXh0ZW5kKHt9LCBlKTtcclxuXHRcdFx0c3ludGgudHlwZSA9ICdwcmVjbGljayc7XHJcblx0XHRcdHRoaXMuX2hhbmRsZURPTUV2ZW50KHN5bnRoKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZSA9PT0gJ21vdXNlZG93bicpIHtcclxuXHRcdFx0Ly8gcHJldmVudHMgb3V0bGluZSB3aGVuIGNsaWNraW5nIG9uIGtleWJvYXJkLWZvY3VzYWJsZSBlbGVtZW50XHJcblx0XHRcdEwuRG9tVXRpbC5wcmV2ZW50T3V0bGluZShlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX2ZpcmVET01FdmVudChlLCB0eXBlKTtcclxuXHR9LFxyXG5cclxuXHRfZmlyZURPTUV2ZW50OiBmdW5jdGlvbiAoZSwgdHlwZSwgdGFyZ2V0cykge1xyXG5cclxuXHRcdGlmIChlLl9zdG9wcGVkKSB7IHJldHVybjsgfVxyXG5cclxuXHRcdHRhcmdldHMgPSAodGFyZ2V0cyB8fCBbXSkuY29uY2F0KHRoaXMuX2ZpbmRFdmVudFRhcmdldHMoZSwgdHlwZSkpO1xyXG5cclxuXHRcdGlmICghdGFyZ2V0cy5sZW5ndGgpIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0dmFyIHRhcmdldCA9IHRhcmdldHNbMF07XHJcblx0XHRpZiAodHlwZSA9PT0gJ2NvbnRleHRtZW51JyAmJiB0YXJnZXQubGlzdGVucyh0eXBlLCB0cnVlKSkge1xyXG5cdFx0XHRMLkRvbUV2ZW50LnByZXZlbnREZWZhdWx0KGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIHByZXZlbnRzIGZpcmluZyBjbGljayBhZnRlciB5b3UganVzdCBkcmFnZ2VkIGFuIG9iamVjdFxyXG5cdFx0aWYgKChlLnR5cGUgPT09ICdjbGljaycgfHwgZS50eXBlID09PSAncHJlY2xpY2snKSAmJiAhZS5fc2ltdWxhdGVkICYmIHRoaXMuX2RyYWdnYWJsZU1vdmVkKHRhcmdldCkpIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0dmFyIGRhdGEgPSB7XHJcblx0XHRcdG9yaWdpbmFsRXZlbnQ6IGVcclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKGUudHlwZSAhPT0gJ2tleXByZXNzJykge1xyXG5cdFx0XHR2YXIgaXNNYXJrZXIgPSB0YXJnZXQgaW5zdGFuY2VvZiBMLk1hcmtlcjtcclxuXHRcdFx0ZGF0YS5jb250YWluZXJQb2ludCA9IGlzTWFya2VyID9cclxuXHRcdFx0XHRcdHRoaXMubGF0TG5nVG9Db250YWluZXJQb2ludCh0YXJnZXQuZ2V0TGF0TG5nKCkpIDogdGhpcy5tb3VzZUV2ZW50VG9Db250YWluZXJQb2ludChlKTtcclxuXHRcdFx0ZGF0YS5sYXllclBvaW50ID0gdGhpcy5jb250YWluZXJQb2ludFRvTGF5ZXJQb2ludChkYXRhLmNvbnRhaW5lclBvaW50KTtcclxuXHRcdFx0ZGF0YS5sYXRsbmcgPSBpc01hcmtlciA/IHRhcmdldC5nZXRMYXRMbmcoKSA6IHRoaXMubGF5ZXJQb2ludFRvTGF0TG5nKGRhdGEubGF5ZXJQb2ludCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHRhcmdldHNbaV0uZmlyZSh0eXBlLCBkYXRhLCB0cnVlKTtcclxuXHRcdFx0aWYgKGRhdGEub3JpZ2luYWxFdmVudC5fc3RvcHBlZCB8fFxyXG5cdFx0XHRcdCh0YXJnZXRzW2ldLm9wdGlvbnMubm9uQnViYmxpbmdFdmVudHMgJiYgTC5VdGlsLmluZGV4T2YodGFyZ2V0c1tpXS5vcHRpb25zLm5vbkJ1YmJsaW5nRXZlbnRzLCB0eXBlKSAhPT0gLTEpKSB7IHJldHVybjsgfVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF9kcmFnZ2FibGVNb3ZlZDogZnVuY3Rpb24gKG9iaikge1xyXG5cdFx0b2JqID0gb2JqLm9wdGlvbnMuZHJhZ2dhYmxlID8gb2JqIDogdGhpcztcclxuXHRcdHJldHVybiAob2JqLmRyYWdnaW5nICYmIG9iai5kcmFnZ2luZy5tb3ZlZCgpKSB8fCAodGhpcy5ib3hab29tICYmIHRoaXMuYm94Wm9vbS5tb3ZlZCgpKTtcclxuXHR9LFxyXG5cclxuXHRfY2xlYXJIYW5kbGVyczogZnVuY3Rpb24gKCkge1xyXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMuX2hhbmRsZXJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdHRoaXMuX2hhbmRsZXJzW2ldLmRpc2FibGUoKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHR3aGVuUmVhZHk6IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xyXG5cdFx0aWYgKHRoaXMuX2xvYWRlZCkge1xyXG5cdFx0XHRjYWxsYmFjay5jYWxsKGNvbnRleHQgfHwgdGhpcywge3RhcmdldDogdGhpc30pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5vbignbG9hZCcsIGNhbGxiYWNrLCBjb250ZXh0KTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cclxuXHQvLyBwcml2YXRlIG1ldGhvZHMgZm9yIGdldHRpbmcgbWFwIHN0YXRlXHJcblxyXG5cdF9nZXRNYXBQYW5lUG9zOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gTC5Eb21VdGlsLmdldFBvc2l0aW9uKHRoaXMuX21hcFBhbmUpIHx8IG5ldyBMLlBvaW50KDAsIDApO1xyXG5cdH0sXHJcblxyXG5cdF9tb3ZlZDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIHBvcyA9IHRoaXMuX2dldE1hcFBhbmVQb3MoKTtcclxuXHRcdHJldHVybiBwb3MgJiYgIXBvcy5lcXVhbHMoWzAsIDBdKTtcclxuXHR9LFxyXG5cclxuXHRfZ2V0VG9wTGVmdFBvaW50OiBmdW5jdGlvbiAoY2VudGVyLCB6b29tKSB7XHJcblx0XHR2YXIgcGl4ZWxPcmlnaW4gPSBjZW50ZXIgJiYgem9vbSAhPT0gdW5kZWZpbmVkID9cclxuXHRcdFx0dGhpcy5fZ2V0TmV3UGl4ZWxPcmlnaW4oY2VudGVyLCB6b29tKSA6XHJcblx0XHRcdHRoaXMuZ2V0UGl4ZWxPcmlnaW4oKTtcclxuXHRcdHJldHVybiBwaXhlbE9yaWdpbi5zdWJ0cmFjdCh0aGlzLl9nZXRNYXBQYW5lUG9zKCkpO1xyXG5cdH0sXHJcblxyXG5cdF9nZXROZXdQaXhlbE9yaWdpbjogZnVuY3Rpb24gKGNlbnRlciwgem9vbSkge1xyXG5cdFx0dmFyIHZpZXdIYWxmID0gdGhpcy5nZXRTaXplKCkuX2RpdmlkZUJ5KDIpO1xyXG5cdFx0cmV0dXJuIHRoaXMucHJvamVjdChjZW50ZXIsIHpvb20pLl9zdWJ0cmFjdCh2aWV3SGFsZikuX2FkZCh0aGlzLl9nZXRNYXBQYW5lUG9zKCkpLl9yb3VuZCgpO1xyXG5cdH0sXHJcblxyXG5cdF9sYXRMbmdUb05ld0xheWVyUG9pbnQ6IGZ1bmN0aW9uIChsYXRsbmcsIHpvb20sIGNlbnRlcikge1xyXG5cdFx0dmFyIHRvcExlZnQgPSB0aGlzLl9nZXROZXdQaXhlbE9yaWdpbihjZW50ZXIsIHpvb20pO1xyXG5cdFx0cmV0dXJuIHRoaXMucHJvamVjdChsYXRsbmcsIHpvb20pLl9zdWJ0cmFjdCh0b3BMZWZ0KTtcclxuXHR9LFxyXG5cclxuXHQvLyBsYXllciBwb2ludCBvZiB0aGUgY3VycmVudCBjZW50ZXJcclxuXHRfZ2V0Q2VudGVyTGF5ZXJQb2ludDogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY29udGFpbmVyUG9pbnRUb0xheWVyUG9pbnQodGhpcy5nZXRTaXplKCkuX2RpdmlkZUJ5KDIpKTtcclxuXHR9LFxyXG5cclxuXHQvLyBvZmZzZXQgb2YgdGhlIHNwZWNpZmllZCBwbGFjZSB0byB0aGUgY3VycmVudCBjZW50ZXIgaW4gcGl4ZWxzXHJcblx0X2dldENlbnRlck9mZnNldDogZnVuY3Rpb24gKGxhdGxuZykge1xyXG5cdFx0cmV0dXJuIHRoaXMubGF0TG5nVG9MYXllclBvaW50KGxhdGxuZykuc3VidHJhY3QodGhpcy5fZ2V0Q2VudGVyTGF5ZXJQb2ludCgpKTtcclxuXHR9LFxyXG5cclxuXHQvLyBhZGp1c3QgY2VudGVyIGZvciB2aWV3IHRvIGdldCBpbnNpZGUgYm91bmRzXHJcblx0X2xpbWl0Q2VudGVyOiBmdW5jdGlvbiAoY2VudGVyLCB6b29tLCBib3VuZHMpIHtcclxuXHJcblx0XHRpZiAoIWJvdW5kcykgeyByZXR1cm4gY2VudGVyOyB9XHJcblxyXG5cdFx0dmFyIGNlbnRlclBvaW50ID0gdGhpcy5wcm9qZWN0KGNlbnRlciwgem9vbSksXHJcblx0XHQgICAgdmlld0hhbGYgPSB0aGlzLmdldFNpemUoKS5kaXZpZGVCeSgyKSxcclxuXHRcdCAgICB2aWV3Qm91bmRzID0gbmV3IEwuQm91bmRzKGNlbnRlclBvaW50LnN1YnRyYWN0KHZpZXdIYWxmKSwgY2VudGVyUG9pbnQuYWRkKHZpZXdIYWxmKSksXHJcblx0XHQgICAgb2Zmc2V0ID0gdGhpcy5fZ2V0Qm91bmRzT2Zmc2V0KHZpZXdCb3VuZHMsIGJvdW5kcywgem9vbSk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMudW5wcm9qZWN0KGNlbnRlclBvaW50LmFkZChvZmZzZXQpLCB6b29tKTtcclxuXHR9LFxyXG5cclxuXHQvLyBhZGp1c3Qgb2Zmc2V0IGZvciB2aWV3IHRvIGdldCBpbnNpZGUgYm91bmRzXHJcblx0X2xpbWl0T2Zmc2V0OiBmdW5jdGlvbiAob2Zmc2V0LCBib3VuZHMpIHtcclxuXHRcdGlmICghYm91bmRzKSB7IHJldHVybiBvZmZzZXQ7IH1cclxuXHJcblx0XHR2YXIgdmlld0JvdW5kcyA9IHRoaXMuZ2V0UGl4ZWxCb3VuZHMoKSxcclxuXHRcdCAgICBuZXdCb3VuZHMgPSBuZXcgTC5Cb3VuZHModmlld0JvdW5kcy5taW4uYWRkKG9mZnNldCksIHZpZXdCb3VuZHMubWF4LmFkZChvZmZzZXQpKTtcclxuXHJcblx0XHRyZXR1cm4gb2Zmc2V0LmFkZCh0aGlzLl9nZXRCb3VuZHNPZmZzZXQobmV3Qm91bmRzLCBib3VuZHMpKTtcclxuXHR9LFxyXG5cclxuXHQvLyByZXR1cm5zIG9mZnNldCBuZWVkZWQgZm9yIHB4Qm91bmRzIHRvIGdldCBpbnNpZGUgbWF4Qm91bmRzIGF0IGEgc3BlY2lmaWVkIHpvb21cclxuXHRfZ2V0Qm91bmRzT2Zmc2V0OiBmdW5jdGlvbiAocHhCb3VuZHMsIG1heEJvdW5kcywgem9vbSkge1xyXG5cdFx0dmFyIG53T2Zmc2V0ID0gdGhpcy5wcm9qZWN0KG1heEJvdW5kcy5nZXROb3J0aFdlc3QoKSwgem9vbSkuc3VidHJhY3QocHhCb3VuZHMubWluKSxcclxuXHRcdCAgICBzZU9mZnNldCA9IHRoaXMucHJvamVjdChtYXhCb3VuZHMuZ2V0U291dGhFYXN0KCksIHpvb20pLnN1YnRyYWN0KHB4Qm91bmRzLm1heCksXHJcblxyXG5cdFx0ICAgIGR4ID0gdGhpcy5fcmVib3VuZChud09mZnNldC54LCAtc2VPZmZzZXQueCksXHJcblx0XHQgICAgZHkgPSB0aGlzLl9yZWJvdW5kKG53T2Zmc2V0LnksIC1zZU9mZnNldC55KTtcclxuXHJcblx0XHRyZXR1cm4gbmV3IEwuUG9pbnQoZHgsIGR5KTtcclxuXHR9LFxyXG5cclxuXHRfcmVib3VuZDogZnVuY3Rpb24gKGxlZnQsIHJpZ2h0KSB7XHJcblx0XHRyZXR1cm4gbGVmdCArIHJpZ2h0ID4gMCA/XHJcblx0XHRcdE1hdGgucm91bmQobGVmdCAtIHJpZ2h0KSAvIDIgOlxyXG5cdFx0XHRNYXRoLm1heCgwLCBNYXRoLmNlaWwobGVmdCkpIC0gTWF0aC5tYXgoMCwgTWF0aC5mbG9vcihyaWdodCkpO1xyXG5cdH0sXHJcblxyXG5cdF9saW1pdFpvb206IGZ1bmN0aW9uICh6b29tKSB7XHJcblx0XHR2YXIgbWluID0gdGhpcy5nZXRNaW5ab29tKCksXHJcblx0XHQgICAgbWF4ID0gdGhpcy5nZXRNYXhab29tKCk7XHJcblx0XHRpZiAoIUwuQnJvd3Nlci5hbnkzZCkgeyB6b29tID0gTWF0aC5yb3VuZCh6b29tKTsgfVxyXG5cclxuXHRcdHJldHVybiBNYXRoLm1heChtaW4sIE1hdGgubWluKG1heCwgem9vbSkpO1xyXG5cdH1cclxufSk7XHJcblxyXG5MLm1hcCA9IGZ1bmN0aW9uIChpZCwgb3B0aW9ucykge1xyXG5cdHJldHVybiBuZXcgTC5NYXAoaWQsIG9wdGlvbnMpO1xyXG59O1xyXG5cblxuXG5cbkwuTGF5ZXIgPSBMLkV2ZW50ZWQuZXh0ZW5kKHtcblxuXHRvcHRpb25zOiB7XG5cdFx0cGFuZTogJ292ZXJsYXlQYW5lJyxcblx0XHRub25CdWJibGluZ0V2ZW50czogW10gIC8vIEFycmF5IG9mIGV2ZW50cyB0aGF0IHNob3VsZCBub3QgYmUgYnViYmxlZCB0byBET00gcGFyZW50cyAobGlrZSB0aGUgbWFwKVxuXHR9LFxuXG5cdGFkZFRvOiBmdW5jdGlvbiAobWFwKSB7XG5cdFx0bWFwLmFkZExheWVyKHRoaXMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHJlbW92ZTogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLnJlbW92ZUZyb20odGhpcy5fbWFwIHx8IHRoaXMuX21hcFRvQWRkKTtcblx0fSxcblxuXHRyZW1vdmVGcm9tOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0aWYgKG9iaikge1xuXHRcdFx0b2JqLnJlbW92ZUxheWVyKHRoaXMpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRnZXRQYW5lOiBmdW5jdGlvbiAobmFtZSkge1xuXHRcdHJldHVybiB0aGlzLl9tYXAuZ2V0UGFuZShuYW1lID8gKHRoaXMub3B0aW9uc1tuYW1lXSB8fCBuYW1lKSA6IHRoaXMub3B0aW9ucy5wYW5lKTtcblx0fSxcblxuXHRhZGRJbnRlcmFjdGl2ZVRhcmdldDogZnVuY3Rpb24gKHRhcmdldEVsKSB7XG5cdFx0dGhpcy5fbWFwLl90YXJnZXRzW0wuc3RhbXAodGFyZ2V0RWwpXSA9IHRoaXM7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0cmVtb3ZlSW50ZXJhY3RpdmVUYXJnZXQ6IGZ1bmN0aW9uICh0YXJnZXRFbCkge1xuXHRcdGRlbGV0ZSB0aGlzLl9tYXAuX3RhcmdldHNbTC5zdGFtcCh0YXJnZXRFbCldO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdF9sYXllckFkZDogZnVuY3Rpb24gKGUpIHtcblx0XHR2YXIgbWFwID0gZS50YXJnZXQ7XG5cblx0XHQvLyBjaGVjayBpbiBjYXNlIGxheWVyIGdldHMgYWRkZWQgYW5kIHRoZW4gcmVtb3ZlZCBiZWZvcmUgdGhlIG1hcCBpcyByZWFkeVxuXHRcdGlmICghbWFwLmhhc0xheWVyKHRoaXMpKSB7IHJldHVybjsgfVxuXG5cdFx0dGhpcy5fbWFwID0gbWFwO1xuXHRcdHRoaXMuX3pvb21BbmltYXRlZCA9IG1hcC5fem9vbUFuaW1hdGVkO1xuXG5cdFx0aWYgKHRoaXMuZ2V0RXZlbnRzKSB7XG5cdFx0XHRtYXAub24odGhpcy5nZXRFdmVudHMoKSwgdGhpcyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5vbkFkZChtYXApO1xuXG5cdFx0aWYgKHRoaXMuZ2V0QXR0cmlidXRpb24gJiYgdGhpcy5fbWFwLmF0dHJpYnV0aW9uQ29udHJvbCkge1xuXHRcdFx0dGhpcy5fbWFwLmF0dHJpYnV0aW9uQ29udHJvbC5hZGRBdHRyaWJ1dGlvbih0aGlzLmdldEF0dHJpYnV0aW9uKCkpO1xuXHRcdH1cblxuXHRcdHRoaXMuZmlyZSgnYWRkJyk7XG5cdFx0bWFwLmZpcmUoJ2xheWVyYWRkJywge2xheWVyOiB0aGlzfSk7XG5cdH1cbn0pO1xuXG5cbkwuTWFwLmluY2x1ZGUoe1xuXHRhZGRMYXllcjogZnVuY3Rpb24gKGxheWVyKSB7XG5cdFx0dmFyIGlkID0gTC5zdGFtcChsYXllcik7XG5cdFx0aWYgKHRoaXMuX2xheWVyc1tpZF0pIHsgcmV0dXJuIGxheWVyOyB9XG5cdFx0dGhpcy5fbGF5ZXJzW2lkXSA9IGxheWVyO1xuXG5cdFx0bGF5ZXIuX21hcFRvQWRkID0gdGhpcztcblxuXHRcdGlmIChsYXllci5iZWZvcmVBZGQpIHtcblx0XHRcdGxheWVyLmJlZm9yZUFkZCh0aGlzKTtcblx0XHR9XG5cblx0XHR0aGlzLndoZW5SZWFkeShsYXllci5fbGF5ZXJBZGQsIGxheWVyKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHJlbW92ZUxheWVyOiBmdW5jdGlvbiAobGF5ZXIpIHtcblx0XHR2YXIgaWQgPSBMLnN0YW1wKGxheWVyKTtcblxuXHRcdGlmICghdGhpcy5fbGF5ZXJzW2lkXSkgeyByZXR1cm4gdGhpczsgfVxuXG5cdFx0aWYgKHRoaXMuX2xvYWRlZCkge1xuXHRcdFx0bGF5ZXIub25SZW1vdmUodGhpcyk7XG5cdFx0fVxuXG5cdFx0aWYgKGxheWVyLmdldEF0dHJpYnV0aW9uICYmIHRoaXMuYXR0cmlidXRpb25Db250cm9sKSB7XG5cdFx0XHR0aGlzLmF0dHJpYnV0aW9uQ29udHJvbC5yZW1vdmVBdHRyaWJ1dGlvbihsYXllci5nZXRBdHRyaWJ1dGlvbigpKTtcblx0XHR9XG5cblx0XHRpZiAobGF5ZXIuZ2V0RXZlbnRzKSB7XG5cdFx0XHR0aGlzLm9mZihsYXllci5nZXRFdmVudHMoKSwgbGF5ZXIpO1xuXHRcdH1cblxuXHRcdGRlbGV0ZSB0aGlzLl9sYXllcnNbaWRdO1xuXG5cdFx0aWYgKHRoaXMuX2xvYWRlZCkge1xuXHRcdFx0dGhpcy5maXJlKCdsYXllcnJlbW92ZScsIHtsYXllcjogbGF5ZXJ9KTtcblx0XHRcdGxheWVyLmZpcmUoJ3JlbW92ZScpO1xuXHRcdH1cblxuXHRcdGxheWVyLl9tYXAgPSBsYXllci5fbWFwVG9BZGQgPSBudWxsO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0aGFzTGF5ZXI6IGZ1bmN0aW9uIChsYXllcikge1xuXHRcdHJldHVybiAhIWxheWVyICYmIChMLnN0YW1wKGxheWVyKSBpbiB0aGlzLl9sYXllcnMpO1xuXHR9LFxuXG5cdGVhY2hMYXllcjogZnVuY3Rpb24gKG1ldGhvZCwgY29udGV4dCkge1xuXHRcdGZvciAodmFyIGkgaW4gdGhpcy5fbGF5ZXJzKSB7XG5cdFx0XHRtZXRob2QuY2FsbChjb250ZXh0LCB0aGlzLl9sYXllcnNbaV0pO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRfYWRkTGF5ZXJzOiBmdW5jdGlvbiAobGF5ZXJzKSB7XG5cdFx0bGF5ZXJzID0gbGF5ZXJzID8gKEwuVXRpbC5pc0FycmF5KGxheWVycykgPyBsYXllcnMgOiBbbGF5ZXJzXSkgOiBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwLCBsZW4gPSBsYXllcnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdHRoaXMuYWRkTGF5ZXIobGF5ZXJzW2ldKTtcblx0XHR9XG5cdH0sXG5cblx0X2FkZFpvb21MaW1pdDogZnVuY3Rpb24gKGxheWVyKSB7XG5cdFx0aWYgKGlzTmFOKGxheWVyLm9wdGlvbnMubWF4Wm9vbSkgfHwgIWlzTmFOKGxheWVyLm9wdGlvbnMubWluWm9vbSkpIHtcblx0XHRcdHRoaXMuX3pvb21Cb3VuZExheWVyc1tMLnN0YW1wKGxheWVyKV0gPSBsYXllcjtcblx0XHRcdHRoaXMuX3VwZGF0ZVpvb21MZXZlbHMoKTtcblx0XHR9XG5cdH0sXG5cblx0X3JlbW92ZVpvb21MaW1pdDogZnVuY3Rpb24gKGxheWVyKSB7XG5cdFx0dmFyIGlkID0gTC5zdGFtcChsYXllcik7XG5cblx0XHRpZiAodGhpcy5fem9vbUJvdW5kTGF5ZXJzW2lkXSkge1xuXHRcdFx0ZGVsZXRlIHRoaXMuX3pvb21Cb3VuZExheWVyc1tpZF07XG5cdFx0XHR0aGlzLl91cGRhdGVab29tTGV2ZWxzKCk7XG5cdFx0fVxuXHR9LFxuXG5cdF91cGRhdGVab29tTGV2ZWxzOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIG1pblpvb20gPSBJbmZpbml0eSxcblx0XHQgICAgbWF4Wm9vbSA9IC1JbmZpbml0eSxcblx0XHQgICAgb2xkWm9vbVNwYW4gPSB0aGlzLl9nZXRab29tU3BhbigpO1xuXG5cdFx0Zm9yICh2YXIgaSBpbiB0aGlzLl96b29tQm91bmRMYXllcnMpIHtcblx0XHRcdHZhciBvcHRpb25zID0gdGhpcy5fem9vbUJvdW5kTGF5ZXJzW2ldLm9wdGlvbnM7XG5cblx0XHRcdG1pblpvb20gPSBvcHRpb25zLm1pblpvb20gPT09IHVuZGVmaW5lZCA/IG1pblpvb20gOiBNYXRoLm1pbihtaW5ab29tLCBvcHRpb25zLm1pblpvb20pO1xuXHRcdFx0bWF4Wm9vbSA9IG9wdGlvbnMubWF4Wm9vbSA9PT0gdW5kZWZpbmVkID8gbWF4Wm9vbSA6IE1hdGgubWF4KG1heFpvb20sIG9wdGlvbnMubWF4Wm9vbSk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fbGF5ZXJzTWF4Wm9vbSA9IG1heFpvb20gPT09IC1JbmZpbml0eSA/IHVuZGVmaW5lZCA6IG1heFpvb207XG5cdFx0dGhpcy5fbGF5ZXJzTWluWm9vbSA9IG1pblpvb20gPT09IEluZmluaXR5ID8gdW5kZWZpbmVkIDogbWluWm9vbTtcblxuXHRcdGlmIChvbGRab29tU3BhbiAhPT0gdGhpcy5fZ2V0Wm9vbVNwYW4oKSkge1xuXHRcdFx0dGhpcy5maXJlKCd6b29tbGV2ZWxzY2hhbmdlJyk7XG5cdFx0fVxuXHR9XG59KTtcblxuXG5cbi8qXHJcbiAqIE1lcmNhdG9yIHByb2plY3Rpb24gdGhhdCB0YWtlcyBpbnRvIGFjY291bnQgdGhhdCB0aGUgRWFydGggaXMgbm90IGEgcGVyZmVjdCBzcGhlcmUuXHJcbiAqIExlc3MgcG9wdWxhciB0aGFuIHNwaGVyaWNhbCBtZXJjYXRvcjsgdXNlZCBieSBwcm9qZWN0aW9ucyBsaWtlIEVQU0c6MzM5NS5cclxuICovXHJcblxyXG5MLlByb2plY3Rpb24uTWVyY2F0b3IgPSB7XHJcblx0UjogNjM3ODEzNyxcclxuXHRSX01JTk9SOiA2MzU2NzUyLjMxNDI0NTE3OSxcclxuXHJcblx0Ym91bmRzOiBMLmJvdW5kcyhbLTIwMDM3NTA4LjM0Mjc5LCAtMTU0OTY1NzAuNzM5NzJdLCBbMjAwMzc1MDguMzQyNzksIDE4NzY0NjU2LjIzMTM4XSksXHJcblxyXG5cdHByb2plY3Q6IGZ1bmN0aW9uIChsYXRsbmcpIHtcclxuXHRcdHZhciBkID0gTWF0aC5QSSAvIDE4MCxcclxuXHRcdCAgICByID0gdGhpcy5SLFxyXG5cdFx0ICAgIHkgPSBsYXRsbmcubGF0ICogZCxcclxuXHRcdCAgICB0bXAgPSB0aGlzLlJfTUlOT1IgLyByLFxyXG5cdFx0ICAgIGUgPSBNYXRoLnNxcnQoMSAtIHRtcCAqIHRtcCksXHJcblx0XHQgICAgY29uID0gZSAqIE1hdGguc2luKHkpO1xyXG5cclxuXHRcdHZhciB0cyA9IE1hdGgudGFuKE1hdGguUEkgLyA0IC0geSAvIDIpIC8gTWF0aC5wb3coKDEgLSBjb24pIC8gKDEgKyBjb24pLCBlIC8gMik7XHJcblx0XHR5ID0gLXIgKiBNYXRoLmxvZyhNYXRoLm1heCh0cywgMUUtMTApKTtcclxuXHJcblx0XHRyZXR1cm4gbmV3IEwuUG9pbnQobGF0bG5nLmxuZyAqIGQgKiByLCB5KTtcclxuXHR9LFxyXG5cclxuXHR1bnByb2plY3Q6IGZ1bmN0aW9uIChwb2ludCkge1xyXG5cdFx0dmFyIGQgPSAxODAgLyBNYXRoLlBJLFxyXG5cdFx0ICAgIHIgPSB0aGlzLlIsXHJcblx0XHQgICAgdG1wID0gdGhpcy5SX01JTk9SIC8gcixcclxuXHRcdCAgICBlID0gTWF0aC5zcXJ0KDEgLSB0bXAgKiB0bXApLFxyXG5cdFx0ICAgIHRzID0gTWF0aC5leHAoLXBvaW50LnkgLyByKSxcclxuXHRcdCAgICBwaGkgPSBNYXRoLlBJIC8gMiAtIDIgKiBNYXRoLmF0YW4odHMpO1xyXG5cclxuXHRcdGZvciAodmFyIGkgPSAwLCBkcGhpID0gMC4xLCBjb247IGkgPCAxNSAmJiBNYXRoLmFicyhkcGhpKSA+IDFlLTc7IGkrKykge1xyXG5cdFx0XHRjb24gPSBlICogTWF0aC5zaW4ocGhpKTtcclxuXHRcdFx0Y29uID0gTWF0aC5wb3coKDEgLSBjb24pIC8gKDEgKyBjb24pLCBlIC8gMik7XHJcblx0XHRcdGRwaGkgPSBNYXRoLlBJIC8gMiAtIDIgKiBNYXRoLmF0YW4odHMgKiBjb24pIC0gcGhpO1xyXG5cdFx0XHRwaGkgKz0gZHBoaTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbmV3IEwuTGF0TG5nKHBoaSAqIGQsIHBvaW50LnggKiBkIC8gcik7XHJcblx0fVxyXG59O1xyXG5cblxuXG4vKlxyXG4gKiBMLkNSUy5FUFNHMzg1NyAoV29ybGQgTWVyY2F0b3IpIENSUyBpbXBsZW1lbnRhdGlvbi5cclxuICovXHJcblxyXG5MLkNSUy5FUFNHMzM5NSA9IEwuZXh0ZW5kKHt9LCBMLkNSUy5FYXJ0aCwge1xyXG5cdGNvZGU6ICdFUFNHOjMzOTUnLFxyXG5cdHByb2plY3Rpb246IEwuUHJvamVjdGlvbi5NZXJjYXRvcixcclxuXHJcblx0dHJhbnNmb3JtYXRpb246IChmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgc2NhbGUgPSAwLjUgLyAoTWF0aC5QSSAqIEwuUHJvamVjdGlvbi5NZXJjYXRvci5SKTtcclxuXHRcdHJldHVybiBuZXcgTC5UcmFuc2Zvcm1hdGlvbihzY2FsZSwgMC41LCAtc2NhbGUsIDAuNSk7XHJcblx0fSgpKVxyXG59KTtcclxuXG5cblxuLypcbiAqIEwuR3JpZExheWVyIGlzIHVzZWQgYXMgYmFzZSBjbGFzcyBmb3IgZ3JpZC1saWtlIGxheWVycyBsaWtlIFRpbGVMYXllci5cbiAqL1xuXG5MLkdyaWRMYXllciA9IEwuTGF5ZXIuZXh0ZW5kKHtcblxuXHRvcHRpb25zOiB7XG5cdFx0cGFuZTogJ3RpbGVQYW5lJyxcblxuXHRcdHRpbGVTaXplOiAyNTYsXG5cdFx0b3BhY2l0eTogMSxcblx0XHR6SW5kZXg6IDEsXG5cblx0XHR1cGRhdGVXaGVuSWRsZTogTC5Ccm93c2VyLm1vYmlsZSxcblx0XHR1cGRhdGVJbnRlcnZhbDogMjAwLFxuXG5cdFx0YXR0cmlidXRpb246IG51bGwsXG5cdFx0Ym91bmRzOiBudWxsLFxuXG5cdFx0bWluWm9vbTogMFxuXHRcdC8vIG1heFpvb206IDxOdW1iZXI+XG5cdFx0Ly8gbm9XcmFwOiBmYWxzZVxuXHR9LFxuXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdFx0b3B0aW9ucyA9IEwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcblx0fSxcblxuXHRvbkFkZDogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuX2luaXRDb250YWluZXIoKTtcblxuXHRcdHRoaXMuX2xldmVscyA9IHt9O1xuXHRcdHRoaXMuX3RpbGVzID0ge307XG5cblx0XHR0aGlzLl9yZXNldFZpZXcoKTtcblx0XHR0aGlzLl91cGRhdGUoKTtcblx0fSxcblxuXHRiZWZvcmVBZGQ6IGZ1bmN0aW9uIChtYXApIHtcblx0XHRtYXAuX2FkZFpvb21MaW1pdCh0aGlzKTtcblx0fSxcblxuXHRvblJlbW92ZTogZnVuY3Rpb24gKG1hcCkge1xuXHRcdEwuRG9tVXRpbC5yZW1vdmUodGhpcy5fY29udGFpbmVyKTtcblx0XHRtYXAuX3JlbW92ZVpvb21MaW1pdCh0aGlzKTtcblx0XHR0aGlzLl9jb250YWluZXIgPSBudWxsO1xuXHRcdHRoaXMuX3RpbGVab29tID0gbnVsbDtcblx0fSxcblxuXHRicmluZ1RvRnJvbnQ6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5fbWFwKSB7XG5cdFx0XHRMLkRvbVV0aWwudG9Gcm9udCh0aGlzLl9jb250YWluZXIpO1xuXHRcdFx0dGhpcy5fc2V0QXV0b1pJbmRleChNYXRoLm1heCk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdGJyaW5nVG9CYWNrOiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuX21hcCkge1xuXHRcdFx0TC5Eb21VdGlsLnRvQmFjayh0aGlzLl9jb250YWluZXIpO1xuXHRcdFx0dGhpcy5fc2V0QXV0b1pJbmRleChNYXRoLm1pbik7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdGdldEF0dHJpYnV0aW9uOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMub3B0aW9ucy5hdHRyaWJ1dGlvbjtcblx0fSxcblxuXHRnZXRDb250YWluZXI6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5fY29udGFpbmVyO1xuXHR9LFxuXG5cdHNldE9wYWNpdHk6IGZ1bmN0aW9uIChvcGFjaXR5KSB7XG5cdFx0dGhpcy5vcHRpb25zLm9wYWNpdHkgPSBvcGFjaXR5O1xuXHRcdHRoaXMuX3VwZGF0ZU9wYWNpdHkoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRzZXRaSW5kZXg6IGZ1bmN0aW9uICh6SW5kZXgpIHtcblx0XHR0aGlzLm9wdGlvbnMuekluZGV4ID0gekluZGV4O1xuXHRcdHRoaXMuX3VwZGF0ZVpJbmRleCgpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0aXNMb2FkaW5nOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRpbmc7XG5cdH0sXG5cblx0cmVkcmF3OiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuX21hcCkge1xuXHRcdFx0dGhpcy5fcmVtb3ZlQWxsVGlsZXMoKTtcblx0XHRcdHRoaXMuX3VwZGF0ZSgpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRnZXRFdmVudHM6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgZXZlbnRzID0ge1xuXHRcdFx0dmlld3Jlc2V0OiB0aGlzLl9yZXNldEFsbCxcblx0XHRcdHpvb206IHRoaXMuX3Jlc2V0Vmlldyxcblx0XHRcdG1vdmVlbmQ6IHRoaXMuX29uTW92ZUVuZFxuXHRcdH07XG5cblx0XHRpZiAoIXRoaXMub3B0aW9ucy51cGRhdGVXaGVuSWRsZSkge1xuXHRcdFx0Ly8gdXBkYXRlIHRpbGVzIG9uIG1vdmUsIGJ1dCBub3QgbW9yZSBvZnRlbiB0aGFuIG9uY2UgcGVyIGdpdmVuIGludGVydmFsXG5cdFx0XHRpZiAoIXRoaXMuX29uTW92ZSkge1xuXHRcdFx0XHR0aGlzLl9vbk1vdmUgPSBMLlV0aWwudGhyb3R0bGUodGhpcy5fb25Nb3ZlRW5kLCB0aGlzLm9wdGlvbnMudXBkYXRlSW50ZXJ2YWwsIHRoaXMpO1xuXHRcdFx0fVxuXG5cdFx0XHRldmVudHMubW92ZSA9IHRoaXMuX29uTW92ZTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fem9vbUFuaW1hdGVkKSB7XG5cdFx0XHRldmVudHMuem9vbWFuaW0gPSB0aGlzLl9hbmltYXRlWm9vbTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZXZlbnRzO1xuXHR9LFxuXG5cdGNyZWF0ZVRpbGU6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdH0sXG5cblx0Z2V0VGlsZVNpemU6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgcyA9IHRoaXMub3B0aW9ucy50aWxlU2l6ZTtcblx0XHRyZXR1cm4gcyBpbnN0YW5jZW9mIEwuUG9pbnQgPyBzIDogbmV3IEwuUG9pbnQocywgcyk7XG5cdH0sXG5cblx0X3VwZGF0ZVpJbmRleDogZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0aGlzLl9jb250YWluZXIgJiYgdGhpcy5vcHRpb25zLnpJbmRleCAhPT0gdW5kZWZpbmVkICYmIHRoaXMub3B0aW9ucy56SW5kZXggIT09IG51bGwpIHtcblx0XHRcdHRoaXMuX2NvbnRhaW5lci5zdHlsZS56SW5kZXggPSB0aGlzLm9wdGlvbnMuekluZGV4O1xuXHRcdH1cblx0fSxcblxuXHRfc2V0QXV0b1pJbmRleDogZnVuY3Rpb24gKGNvbXBhcmUpIHtcblx0XHQvLyBnbyB0aHJvdWdoIGFsbCBvdGhlciBsYXllcnMgb2YgdGhlIHNhbWUgcGFuZSwgc2V0IHpJbmRleCB0byBtYXggKyAxIChmcm9udCkgb3IgbWluIC0gMSAoYmFjaylcblxuXHRcdHZhciBsYXllcnMgPSB0aGlzLmdldFBhbmUoKS5jaGlsZHJlbixcblx0XHQgICAgZWRnZVpJbmRleCA9IC1jb21wYXJlKC1JbmZpbml0eSwgSW5maW5pdHkpOyAvLyAtSW5maW5pdHkgZm9yIG1heCwgSW5maW5pdHkgZm9yIG1pblxuXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IGxheWVycy5sZW5ndGgsIHpJbmRleDsgaSA8IGxlbjsgaSsrKSB7XG5cblx0XHRcdHpJbmRleCA9IGxheWVyc1tpXS5zdHlsZS56SW5kZXg7XG5cblx0XHRcdGlmIChsYXllcnNbaV0gIT09IHRoaXMuX2NvbnRhaW5lciAmJiB6SW5kZXgpIHtcblx0XHRcdFx0ZWRnZVpJbmRleCA9IGNvbXBhcmUoZWRnZVpJbmRleCwgK3pJbmRleCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGlzRmluaXRlKGVkZ2VaSW5kZXgpKSB7XG5cdFx0XHR0aGlzLm9wdGlvbnMuekluZGV4ID0gZWRnZVpJbmRleCArIGNvbXBhcmUoLTEsIDEpO1xuXHRcdFx0dGhpcy5fdXBkYXRlWkluZGV4KCk7XG5cdFx0fVxuXHR9LFxuXG5cdF91cGRhdGVPcGFjaXR5OiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKCF0aGlzLl9tYXApIHsgcmV0dXJuOyB9XG5cblx0XHQvLyBJRSBkb2Vzbid0IGluaGVyaXQgZmlsdGVyIG9wYWNpdHkgcHJvcGVybHksIHNvIHdlJ3JlIGZvcmNlZCB0byBzZXQgaXQgb24gdGlsZXNcblx0XHRpZiAoTC5Ccm93c2VyLmllbHQ5IHx8ICF0aGlzLl9tYXAuX2ZhZGVBbmltYXRlZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdEwuRG9tVXRpbC5zZXRPcGFjaXR5KHRoaXMuX2NvbnRhaW5lciwgdGhpcy5vcHRpb25zLm9wYWNpdHkpO1xuXG5cdFx0dmFyIG5vdyA9ICtuZXcgRGF0ZSgpLFxuXHRcdCAgICBuZXh0RnJhbWUgPSBmYWxzZSxcblx0XHQgICAgd2lsbFBydW5lID0gZmFsc2U7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gdGhpcy5fdGlsZXMpIHtcblx0XHRcdHZhciB0aWxlID0gdGhpcy5fdGlsZXNba2V5XTtcblx0XHRcdGlmICghdGlsZS5jdXJyZW50IHx8ICF0aWxlLmxvYWRlZCkgeyBjb250aW51ZTsgfVxuXG5cdFx0XHR2YXIgZmFkZSA9IE1hdGgubWluKDEsIChub3cgLSB0aWxlLmxvYWRlZCkgLyAyMDApO1xuXG5cdFx0XHRMLkRvbVV0aWwuc2V0T3BhY2l0eSh0aWxlLmVsLCBmYWRlKTtcblx0XHRcdGlmIChmYWRlIDwgMSkge1xuXHRcdFx0XHRuZXh0RnJhbWUgPSB0cnVlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHRpbGUuYWN0aXZlKSB7IHdpbGxQcnVuZSA9IHRydWU7IH1cblx0XHRcdFx0dGlsZS5hY3RpdmUgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICh3aWxsUHJ1bmUgJiYgIXRoaXMuX25vUHJ1bmUpIHsgdGhpcy5fcHJ1bmVUaWxlcygpOyB9XG5cblx0XHRpZiAobmV4dEZyYW1lKSB7XG5cdFx0XHRMLlV0aWwuY2FuY2VsQW5pbUZyYW1lKHRoaXMuX2ZhZGVGcmFtZSk7XG5cdFx0XHR0aGlzLl9mYWRlRnJhbWUgPSBMLlV0aWwucmVxdWVzdEFuaW1GcmFtZSh0aGlzLl91cGRhdGVPcGFjaXR5LCB0aGlzKTtcblx0XHR9XG5cdH0sXG5cblx0X2luaXRDb250YWluZXI6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5fY29udGFpbmVyKSB7IHJldHVybjsgfVxuXG5cdFx0dGhpcy5fY29udGFpbmVyID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2xlYWZsZXQtbGF5ZXInKTtcblx0XHR0aGlzLl91cGRhdGVaSW5kZXgoKTtcblxuXHRcdGlmICh0aGlzLm9wdGlvbnMub3BhY2l0eSA8IDEpIHtcblx0XHRcdHRoaXMuX3VwZGF0ZU9wYWNpdHkoKTtcblx0XHR9XG5cblx0XHR0aGlzLmdldFBhbmUoKS5hcHBlbmRDaGlsZCh0aGlzLl9jb250YWluZXIpO1xuXHR9LFxuXG5cdF91cGRhdGVMZXZlbHM6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB6b29tID0gdGhpcy5fdGlsZVpvb20sXG5cdFx0ICAgIG1heFpvb20gPSB0aGlzLm9wdGlvbnMubWF4Wm9vbTtcblxuXHRcdGZvciAodmFyIHogaW4gdGhpcy5fbGV2ZWxzKSB7XG5cdFx0XHRpZiAodGhpcy5fbGV2ZWxzW3pdLmVsLmNoaWxkcmVuLmxlbmd0aCB8fCB6ID09PSB6b29tKSB7XG5cdFx0XHRcdHRoaXMuX2xldmVsc1t6XS5lbC5zdHlsZS56SW5kZXggPSBtYXhab29tIC0gTWF0aC5hYnMoem9vbSAtIHopO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0TC5Eb21VdGlsLnJlbW92ZSh0aGlzLl9sZXZlbHNbel0uZWwpO1xuXHRcdFx0XHRkZWxldGUgdGhpcy5fbGV2ZWxzW3pdO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhciBsZXZlbCA9IHRoaXMuX2xldmVsc1t6b29tXSxcblx0XHQgICAgbWFwID0gdGhpcy5fbWFwO1xuXG5cdFx0aWYgKCFsZXZlbCkge1xuXHRcdFx0bGV2ZWwgPSB0aGlzLl9sZXZlbHNbem9vbV0gPSB7fTtcblxuXHRcdFx0bGV2ZWwuZWwgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnbGVhZmxldC10aWxlLWNvbnRhaW5lciBsZWFmbGV0LXpvb20tYW5pbWF0ZWQnLCB0aGlzLl9jb250YWluZXIpO1xuXHRcdFx0bGV2ZWwuZWwuc3R5bGUuekluZGV4ID0gbWF4Wm9vbTtcblxuXHRcdFx0bGV2ZWwub3JpZ2luID0gbWFwLnByb2plY3QobWFwLnVucHJvamVjdChtYXAuZ2V0UGl4ZWxPcmlnaW4oKSksIHpvb20pLnJvdW5kKCk7XG5cdFx0XHRsZXZlbC56b29tID0gem9vbTtcblxuXHRcdFx0dGhpcy5fc2V0Wm9vbVRyYW5zZm9ybShsZXZlbCwgbWFwLmdldENlbnRlcigpLCBtYXAuZ2V0Wm9vbSgpKTtcblxuXHRcdFx0Ly8gZm9yY2UgdGhlIGJyb3dzZXIgdG8gY29uc2lkZXIgdGhlIG5ld2x5IGFkZGVkIGVsZW1lbnQgZm9yIHRyYW5zaXRpb25cblx0XHRcdEwuVXRpbC5mYWxzZUZuKGxldmVsLmVsLm9mZnNldFdpZHRoKTtcblx0XHR9XG5cblx0XHR0aGlzLl9sZXZlbCA9IGxldmVsO1xuXG5cdFx0cmV0dXJuIGxldmVsO1xuXHR9LFxuXG5cdF9wcnVuZVRpbGVzOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGtleSwgdGlsZTtcblxuXHRcdHZhciB6b29tID0gdGhpcy5fbWFwLmdldFpvb20oKTtcblx0XHRpZiAoem9vbSA+IHRoaXMub3B0aW9ucy5tYXhab29tIHx8XG5cdFx0XHR6b29tIDwgdGhpcy5vcHRpb25zLm1pblpvb20pIHsgcmV0dXJuIHRoaXMuX3JlbW92ZUFsbFRpbGVzKCk7IH1cblxuXHRcdGZvciAoa2V5IGluIHRoaXMuX3RpbGVzKSB7XG5cdFx0XHR0aWxlID0gdGhpcy5fdGlsZXNba2V5XTtcblx0XHRcdHRpbGUucmV0YWluID0gdGlsZS5jdXJyZW50O1xuXHRcdH1cblxuXHRcdGZvciAoa2V5IGluIHRoaXMuX3RpbGVzKSB7XG5cdFx0XHR0aWxlID0gdGhpcy5fdGlsZXNba2V5XTtcblx0XHRcdGlmICh0aWxlLmN1cnJlbnQgJiYgIXRpbGUuYWN0aXZlKSB7XG5cdFx0XHRcdHZhciBjb29yZHMgPSB0aWxlLmNvb3Jkcztcblx0XHRcdFx0aWYgKCF0aGlzLl9yZXRhaW5QYXJlbnQoY29vcmRzLngsIGNvb3Jkcy55LCBjb29yZHMueiwgY29vcmRzLnogLSA1KSkge1xuXHRcdFx0XHRcdHRoaXMuX3JldGFpbkNoaWxkcmVuKGNvb3Jkcy54LCBjb29yZHMueSwgY29vcmRzLnosIGNvb3Jkcy56ICsgMik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRmb3IgKGtleSBpbiB0aGlzLl90aWxlcykge1xuXHRcdFx0aWYgKCF0aGlzLl90aWxlc1trZXldLnJldGFpbikge1xuXHRcdFx0XHR0aGlzLl9yZW1vdmVUaWxlKGtleSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdF9yZW1vdmVBbGxUaWxlczogZnVuY3Rpb24gKCkge1xuXHRcdGZvciAodmFyIGtleSBpbiB0aGlzLl90aWxlcykge1xuXHRcdFx0dGhpcy5fcmVtb3ZlVGlsZShrZXkpO1xuXHRcdH1cblx0fSxcblxuXHRfcmVzZXRBbGw6IGZ1bmN0aW9uICgpIHtcblx0XHRmb3IgKHZhciB6IGluIHRoaXMuX2xldmVscykge1xuXHRcdFx0TC5Eb21VdGlsLnJlbW92ZSh0aGlzLl9sZXZlbHNbel0uZWwpO1xuXHRcdFx0ZGVsZXRlIHRoaXMuX2xldmVsc1t6XTtcblx0XHR9XG5cdFx0dGhpcy5fcmVtb3ZlQWxsVGlsZXMoKTtcblxuXHRcdHRoaXMuX3RpbGVab29tID0gbnVsbDtcblx0XHR0aGlzLl9yZXNldFZpZXcoKTtcblx0fSxcblxuXHRfcmV0YWluUGFyZW50OiBmdW5jdGlvbiAoeCwgeSwgeiwgbWluWm9vbSkge1xuXHRcdHZhciB4MiA9IE1hdGguZmxvb3IoeCAvIDIpLFxuXHRcdCAgICB5MiA9IE1hdGguZmxvb3IoeSAvIDIpLFxuXHRcdCAgICB6MiA9IHogLSAxO1xuXG5cdFx0dmFyIGtleSA9IHgyICsgJzonICsgeTIgKyAnOicgKyB6Mixcblx0XHQgICAgdGlsZSA9IHRoaXMuX3RpbGVzW2tleV07XG5cblx0XHRpZiAodGlsZSAmJiB0aWxlLmFjdGl2ZSkge1xuXHRcdFx0dGlsZS5yZXRhaW4gPSB0cnVlO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cblx0XHR9IGVsc2UgaWYgKHRpbGUgJiYgdGlsZS5sb2FkZWQpIHtcblx0XHRcdHRpbGUucmV0YWluID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAoejIgPiBtaW5ab29tKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fcmV0YWluUGFyZW50KHgyLCB5MiwgejIsIG1pblpvb20pO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHRfcmV0YWluQ2hpbGRyZW46IGZ1bmN0aW9uICh4LCB5LCB6LCBtYXhab29tKSB7XG5cblx0XHRmb3IgKHZhciBpID0gMiAqIHg7IGkgPCAyICogeCArIDI7IGkrKykge1xuXHRcdFx0Zm9yICh2YXIgaiA9IDIgKiB5OyBqIDwgMiAqIHkgKyAyOyBqKyspIHtcblxuXHRcdFx0XHR2YXIga2V5ID0gaSArICc6JyArIGogKyAnOicgKyAoeiArIDEpLFxuXHRcdFx0XHQgICAgdGlsZSA9IHRoaXMuX3RpbGVzW2tleV07XG5cblx0XHRcdFx0aWYgKHRpbGUgJiYgdGlsZS5hY3RpdmUpIHtcblx0XHRcdFx0XHR0aWxlLnJldGFpbiA9IHRydWU7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cblx0XHRcdFx0fSBlbHNlIGlmICh0aWxlICYmIHRpbGUubG9hZGVkKSB7XG5cdFx0XHRcdFx0dGlsZS5yZXRhaW4gPSB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHogKyAxIDwgbWF4Wm9vbSkge1xuXHRcdFx0XHRcdHRoaXMuX3JldGFpbkNoaWxkcmVuKGksIGosIHogKyAxLCBtYXhab29tKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRfcmVzZXRWaWV3OiBmdW5jdGlvbiAoZSkge1xuXHRcdHZhciBhbmltYXRpbmcgPSBlICYmIChlLnBpbmNoIHx8IGUuZmx5VG8pO1xuXHRcdHRoaXMuX3NldFZpZXcodGhpcy5fbWFwLmdldENlbnRlcigpLCB0aGlzLl9tYXAuZ2V0Wm9vbSgpLCBhbmltYXRpbmcsIGFuaW1hdGluZyk7XG5cdH0sXG5cblx0X2FuaW1hdGVab29tOiBmdW5jdGlvbiAoZSkge1xuXHRcdHRoaXMuX3NldFZpZXcoZS5jZW50ZXIsIGUuem9vbSwgdHJ1ZSwgZS5ub1VwZGF0ZSk7XG5cdH0sXG5cblx0X3NldFZpZXc6IGZ1bmN0aW9uIChjZW50ZXIsIHpvb20sIG5vUHJ1bmUsIG5vVXBkYXRlKSB7XG5cdFx0dmFyIHRpbGVab29tID0gTWF0aC5yb3VuZCh6b29tKTtcblx0XHRpZiAoKHRoaXMub3B0aW9ucy5tYXhab29tICE9PSB1bmRlZmluZWQgJiYgdGlsZVpvb20gPiB0aGlzLm9wdGlvbnMubWF4Wm9vbSkgfHxcblx0XHQgICAgKHRoaXMub3B0aW9ucy5taW5ab29tICE9PSB1bmRlZmluZWQgJiYgdGlsZVpvb20gPCB0aGlzLm9wdGlvbnMubWluWm9vbSkpIHtcblx0XHRcdHRpbGVab29tID0gdW5kZWZpbmVkO1xuXHRcdH1cblxuXHRcdHZhciB0aWxlWm9vbUNoYW5nZWQgPSAodGlsZVpvb20gIT09IHRoaXMuX3RpbGVab29tKTtcblxuXHRcdGlmICghbm9VcGRhdGUgfHwgdGlsZVpvb21DaGFuZ2VkKSB7XG5cblx0XHRcdHRoaXMuX3RpbGVab29tID0gdGlsZVpvb207XG5cblx0XHRcdGlmICh0aGlzLl9hYm9ydExvYWRpbmcpIHtcblx0XHRcdFx0dGhpcy5fYWJvcnRMb2FkaW5nKCk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX3VwZGF0ZUxldmVscygpO1xuXHRcdFx0dGhpcy5fcmVzZXRHcmlkKCk7XG5cblx0XHRcdGlmICh0aWxlWm9vbSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHRoaXMuX3VwZGF0ZShjZW50ZXIpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIW5vUHJ1bmUpIHtcblx0XHRcdFx0dGhpcy5fcHJ1bmVUaWxlcygpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBGbGFnIHRvIHByZXZlbnQgX3VwZGF0ZU9wYWNpdHkgZnJvbSBwcnVuaW5nIHRpbGVzIGR1cmluZ1xuXHRcdFx0Ly8gYSB6b29tIGFuaW0gb3IgYSBwaW5jaCBnZXN0dXJlXG5cdFx0XHR0aGlzLl9ub1BydW5lID0gISFub1BydW5lO1xuXHRcdH1cblxuXHRcdHRoaXMuX3NldFpvb21UcmFuc2Zvcm1zKGNlbnRlciwgem9vbSk7XG5cdH0sXG5cblx0X3NldFpvb21UcmFuc2Zvcm1zOiBmdW5jdGlvbiAoY2VudGVyLCB6b29tKSB7XG5cdFx0Zm9yICh2YXIgaSBpbiB0aGlzLl9sZXZlbHMpIHtcblx0XHRcdHRoaXMuX3NldFpvb21UcmFuc2Zvcm0odGhpcy5fbGV2ZWxzW2ldLCBjZW50ZXIsIHpvb20pO1xuXHRcdH1cblx0fSxcblxuXHRfc2V0Wm9vbVRyYW5zZm9ybTogZnVuY3Rpb24gKGxldmVsLCBjZW50ZXIsIHpvb20pIHtcblx0XHR2YXIgc2NhbGUgPSB0aGlzLl9tYXAuZ2V0Wm9vbVNjYWxlKHpvb20sIGxldmVsLnpvb20pLFxuXHRcdCAgICB0cmFuc2xhdGUgPSBsZXZlbC5vcmlnaW4ubXVsdGlwbHlCeShzY2FsZSlcblx0XHQgICAgICAgIC5zdWJ0cmFjdCh0aGlzLl9tYXAuX2dldE5ld1BpeGVsT3JpZ2luKGNlbnRlciwgem9vbSkpLnJvdW5kKCk7XG5cblx0XHRpZiAoTC5Ccm93c2VyLmFueTNkKSB7XG5cdFx0XHRMLkRvbVV0aWwuc2V0VHJhbnNmb3JtKGxldmVsLmVsLCB0cmFuc2xhdGUsIHNjYWxlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0TC5Eb21VdGlsLnNldFBvc2l0aW9uKGxldmVsLmVsLCB0cmFuc2xhdGUpO1xuXHRcdH1cblx0fSxcblxuXHRfcmVzZXRHcmlkOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIG1hcCA9IHRoaXMuX21hcCxcblx0XHQgICAgY3JzID0gbWFwLm9wdGlvbnMuY3JzLFxuXHRcdCAgICB0aWxlU2l6ZSA9IHRoaXMuX3RpbGVTaXplID0gdGhpcy5nZXRUaWxlU2l6ZSgpLFxuXHRcdCAgICB0aWxlWm9vbSA9IHRoaXMuX3RpbGVab29tO1xuXG5cdFx0dmFyIGJvdW5kcyA9IHRoaXMuX21hcC5nZXRQaXhlbFdvcmxkQm91bmRzKHRoaXMuX3RpbGVab29tKTtcblx0XHRpZiAoYm91bmRzKSB7XG5cdFx0XHR0aGlzLl9nbG9iYWxUaWxlUmFuZ2UgPSB0aGlzLl9weEJvdW5kc1RvVGlsZVJhbmdlKGJvdW5kcyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fd3JhcFggPSBjcnMud3JhcExuZyAmJiAhdGhpcy5vcHRpb25zLm5vV3JhcCAmJiBbXG5cdFx0XHRNYXRoLmZsb29yKG1hcC5wcm9qZWN0KFswLCBjcnMud3JhcExuZ1swXV0sIHRpbGVab29tKS54IC8gdGlsZVNpemUueCksXG5cdFx0XHRNYXRoLmNlaWwobWFwLnByb2plY3QoWzAsIGNycy53cmFwTG5nWzFdXSwgdGlsZVpvb20pLnggLyB0aWxlU2l6ZS55KVxuXHRcdF07XG5cdFx0dGhpcy5fd3JhcFkgPSBjcnMud3JhcExhdCAmJiAhdGhpcy5vcHRpb25zLm5vV3JhcCAmJiBbXG5cdFx0XHRNYXRoLmZsb29yKG1hcC5wcm9qZWN0KFtjcnMud3JhcExhdFswXSwgMF0sIHRpbGVab29tKS55IC8gdGlsZVNpemUueCksXG5cdFx0XHRNYXRoLmNlaWwobWFwLnByb2plY3QoW2Nycy53cmFwTGF0WzFdLCAwXSwgdGlsZVpvb20pLnkgLyB0aWxlU2l6ZS55KVxuXHRcdF07XG5cdH0sXG5cblx0X29uTW92ZUVuZDogZnVuY3Rpb24gKCkge1xuXHRcdGlmICghdGhpcy5fbWFwIHx8IHRoaXMuX21hcC5fYW5pbWF0aW5nWm9vbSkgeyByZXR1cm47IH1cblxuXHRcdHRoaXMuX3Jlc2V0VmlldygpO1xuXHR9LFxuXG5cdF9nZXRUaWxlZFBpeGVsQm91bmRzOiBmdW5jdGlvbiAoY2VudGVyLCB6b29tLCB0aWxlWm9vbSkge1xuXHRcdHZhciBtYXAgPSB0aGlzLl9tYXAsXG5cdFx0ICAgIHNjYWxlID0gbWFwLmdldFpvb21TY2FsZSh6b29tLCB0aWxlWm9vbSksXG5cdFx0ICAgIHBpeGVsQ2VudGVyID0gbWFwLnByb2plY3QoY2VudGVyLCB0aWxlWm9vbSkuZmxvb3IoKSxcblx0XHQgICAgaGFsZlNpemUgPSBtYXAuZ2V0U2l6ZSgpLmRpdmlkZUJ5KHNjYWxlICogMik7XG5cblx0XHRyZXR1cm4gbmV3IEwuQm91bmRzKHBpeGVsQ2VudGVyLnN1YnRyYWN0KGhhbGZTaXplKSwgcGl4ZWxDZW50ZXIuYWRkKGhhbGZTaXplKSk7XG5cdH0sXG5cblx0Ly8gUHJpdmF0ZSBtZXRob2QgdG8gbG9hZCB0aWxlcyBpbiB0aGUgZ3JpZCdzIGFjdGl2ZSB6b29tIGxldmVsIGFjY29yZGluZyB0byBtYXAgYm91bmRzXG5cdF91cGRhdGU6IGZ1bmN0aW9uIChjZW50ZXIpIHtcblx0XHR2YXIgbWFwID0gdGhpcy5fbWFwO1xuXHRcdGlmICghbWFwKSB7IHJldHVybjsgfVxuXHRcdHZhciB6b29tID0gbWFwLmdldFpvb20oKTtcblxuXHRcdGlmIChjZW50ZXIgPT09IHVuZGVmaW5lZCkgeyBjZW50ZXIgPSBtYXAuZ2V0Q2VudGVyKCk7IH1cblx0XHRpZiAodGhpcy5fdGlsZVpvb20gPT09IHVuZGVmaW5lZCkgeyByZXR1cm47IH1cdC8vIGlmIG91dCBvZiBtaW56b29tL21heHpvb21cblxuXHRcdHZhciBwaXhlbEJvdW5kcyA9IHRoaXMuX2dldFRpbGVkUGl4ZWxCb3VuZHMoY2VudGVyLCB6b29tLCB0aGlzLl90aWxlWm9vbSksXG5cdFx0ICAgIHRpbGVSYW5nZSA9IHRoaXMuX3B4Qm91bmRzVG9UaWxlUmFuZ2UocGl4ZWxCb3VuZHMpLFxuXHRcdCAgICB0aWxlQ2VudGVyID0gdGlsZVJhbmdlLmdldENlbnRlcigpLFxuXHRcdCAgICBxdWV1ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIHRoaXMuX3RpbGVzKSB7XG5cdFx0XHR0aGlzLl90aWxlc1trZXldLmN1cnJlbnQgPSBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBfdXBkYXRlIGp1c3QgbG9hZHMgbW9yZSB0aWxlcy4gSWYgdGhlIHRpbGUgem9vbSBsZXZlbCBkaWZmZXJzIHRvbyBtdWNoXG5cdFx0Ly8gZnJvbSB0aGUgbWFwJ3MsIGxldCBfc2V0VmlldyByZXNldCBsZXZlbHMgYW5kIHBydW5lIG9sZCB0aWxlcy5cblx0XHRpZiAoTWF0aC5hYnMoem9vbSAtIHRoaXMuX3RpbGVab29tKSA+IDEpIHsgdGhpcy5fc2V0VmlldyhjZW50ZXIsIHpvb20pOyByZXR1cm47IH1cblxuXHRcdC8vIGNyZWF0ZSBhIHF1ZXVlIG9mIGNvb3JkaW5hdGVzIHRvIGxvYWQgdGlsZXMgZnJvbVxuXHRcdGZvciAodmFyIGogPSB0aWxlUmFuZ2UubWluLnk7IGogPD0gdGlsZVJhbmdlLm1heC55OyBqKyspIHtcblx0XHRcdGZvciAodmFyIGkgPSB0aWxlUmFuZ2UubWluLng7IGkgPD0gdGlsZVJhbmdlLm1heC54OyBpKyspIHtcblx0XHRcdFx0dmFyIGNvb3JkcyA9IG5ldyBMLlBvaW50KGksIGopO1xuXHRcdFx0XHRjb29yZHMueiA9IHRoaXMuX3RpbGVab29tO1xuXG5cdFx0XHRcdGlmICghdGhpcy5faXNWYWxpZFRpbGUoY29vcmRzKSkgeyBjb250aW51ZTsgfVxuXG5cdFx0XHRcdHZhciB0aWxlID0gdGhpcy5fdGlsZXNbdGhpcy5fdGlsZUNvb3Jkc1RvS2V5KGNvb3JkcyldO1xuXHRcdFx0XHRpZiAodGlsZSkge1xuXHRcdFx0XHRcdHRpbGUuY3VycmVudCA9IHRydWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cXVldWUucHVzaChjb29yZHMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gc29ydCB0aWxlIHF1ZXVlIHRvIGxvYWQgdGlsZXMgaW4gb3JkZXIgb2YgdGhlaXIgZGlzdGFuY2UgdG8gY2VudGVyXG5cdFx0cXVldWUuc29ydChmdW5jdGlvbiAoYSwgYikge1xuXHRcdFx0cmV0dXJuIGEuZGlzdGFuY2VUbyh0aWxlQ2VudGVyKSAtIGIuZGlzdGFuY2VUbyh0aWxlQ2VudGVyKTtcblx0XHR9KTtcblxuXHRcdGlmIChxdWV1ZS5sZW5ndGggIT09IDApIHtcblx0XHRcdC8vIGlmIGl0cyB0aGUgZmlyc3QgYmF0Y2ggb2YgdGlsZXMgdG8gbG9hZFxuXHRcdFx0aWYgKCF0aGlzLl9sb2FkaW5nKSB7XG5cdFx0XHRcdHRoaXMuX2xvYWRpbmcgPSB0cnVlO1xuXHRcdFx0XHR0aGlzLmZpcmUoJ2xvYWRpbmcnKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gY3JlYXRlIERPTSBmcmFnbWVudCB0byBhcHBlbmQgdGlsZXMgaW4gb25lIGJhdGNoXG5cdFx0XHR2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cblx0XHRcdGZvciAoaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR0aGlzLl9hZGRUaWxlKHF1ZXVlW2ldLCBmcmFnbWVudCk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX2xldmVsLmVsLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcblx0XHR9XG5cdH0sXG5cblx0X2lzVmFsaWRUaWxlOiBmdW5jdGlvbiAoY29vcmRzKSB7XG5cdFx0dmFyIGNycyA9IHRoaXMuX21hcC5vcHRpb25zLmNycztcblxuXHRcdGlmICghY3JzLmluZmluaXRlKSB7XG5cdFx0XHQvLyBkb24ndCBsb2FkIHRpbGUgaWYgaXQncyBvdXQgb2YgYm91bmRzIGFuZCBub3Qgd3JhcHBlZFxuXHRcdFx0dmFyIGJvdW5kcyA9IHRoaXMuX2dsb2JhbFRpbGVSYW5nZTtcblx0XHRcdGlmICgoIWNycy53cmFwTG5nICYmIChjb29yZHMueCA8IGJvdW5kcy5taW4ueCB8fCBjb29yZHMueCA+IGJvdW5kcy5tYXgueCkpIHx8XG5cdFx0XHQgICAgKCFjcnMud3JhcExhdCAmJiAoY29vcmRzLnkgPCBib3VuZHMubWluLnkgfHwgY29vcmRzLnkgPiBib3VuZHMubWF4LnkpKSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR9XG5cblx0XHRpZiAoIXRoaXMub3B0aW9ucy5ib3VuZHMpIHsgcmV0dXJuIHRydWU7IH1cblxuXHRcdC8vIGRvbid0IGxvYWQgdGlsZSBpZiBpdCBkb2Vzbid0IGludGVyc2VjdCB0aGUgYm91bmRzIGluIG9wdGlvbnNcblx0XHR2YXIgdGlsZUJvdW5kcyA9IHRoaXMuX3RpbGVDb29yZHNUb0JvdW5kcyhjb29yZHMpO1xuXHRcdHJldHVybiBMLmxhdExuZ0JvdW5kcyh0aGlzLm9wdGlvbnMuYm91bmRzKS5vdmVybGFwcyh0aWxlQm91bmRzKTtcblx0fSxcblxuXHRfa2V5VG9Cb3VuZHM6IGZ1bmN0aW9uIChrZXkpIHtcblx0XHRyZXR1cm4gdGhpcy5fdGlsZUNvb3Jkc1RvQm91bmRzKHRoaXMuX2tleVRvVGlsZUNvb3JkcyhrZXkpKTtcblx0fSxcblxuXHQvLyBjb252ZXJ0cyB0aWxlIGNvb3JkaW5hdGVzIHRvIGl0cyBnZW9ncmFwaGljYWwgYm91bmRzXG5cdF90aWxlQ29vcmRzVG9Cb3VuZHM6IGZ1bmN0aW9uIChjb29yZHMpIHtcblxuXHRcdHZhciBtYXAgPSB0aGlzLl9tYXAsXG5cdFx0ICAgIHRpbGVTaXplID0gdGhpcy5nZXRUaWxlU2l6ZSgpLFxuXG5cdFx0ICAgIG53UG9pbnQgPSBjb29yZHMuc2NhbGVCeSh0aWxlU2l6ZSksXG5cdFx0ICAgIHNlUG9pbnQgPSBud1BvaW50LmFkZCh0aWxlU2l6ZSksXG5cblx0XHQgICAgbncgPSBtYXAud3JhcExhdExuZyhtYXAudW5wcm9qZWN0KG53UG9pbnQsIGNvb3Jkcy56KSksXG5cdFx0ICAgIHNlID0gbWFwLndyYXBMYXRMbmcobWFwLnVucHJvamVjdChzZVBvaW50LCBjb29yZHMueikpO1xuXG5cdFx0cmV0dXJuIG5ldyBMLkxhdExuZ0JvdW5kcyhudywgc2UpO1xuXHR9LFxuXG5cdC8vIGNvbnZlcnRzIHRpbGUgY29vcmRpbmF0ZXMgdG8ga2V5IGZvciB0aGUgdGlsZSBjYWNoZVxuXHRfdGlsZUNvb3Jkc1RvS2V5OiBmdW5jdGlvbiAoY29vcmRzKSB7XG5cdFx0cmV0dXJuIGNvb3Jkcy54ICsgJzonICsgY29vcmRzLnkgKyAnOicgKyBjb29yZHMuejtcblx0fSxcblxuXHQvLyBjb252ZXJ0cyB0aWxlIGNhY2hlIGtleSB0byBjb29yZGluYXRlc1xuXHRfa2V5VG9UaWxlQ29vcmRzOiBmdW5jdGlvbiAoa2V5KSB7XG5cdFx0dmFyIGsgPSBrZXkuc3BsaXQoJzonKSxcblx0XHQgICAgY29vcmRzID0gbmV3IEwuUG9pbnQoK2tbMF0sICtrWzFdKTtcblx0XHRjb29yZHMueiA9ICtrWzJdO1xuXHRcdHJldHVybiBjb29yZHM7XG5cdH0sXG5cblx0X3JlbW92ZVRpbGU6IGZ1bmN0aW9uIChrZXkpIHtcblx0XHR2YXIgdGlsZSA9IHRoaXMuX3RpbGVzW2tleV07XG5cdFx0aWYgKCF0aWxlKSB7IHJldHVybjsgfVxuXG5cdFx0TC5Eb21VdGlsLnJlbW92ZSh0aWxlLmVsKTtcblxuXHRcdGRlbGV0ZSB0aGlzLl90aWxlc1trZXldO1xuXG5cdFx0dGhpcy5maXJlKCd0aWxldW5sb2FkJywge1xuXHRcdFx0dGlsZTogdGlsZS5lbCxcblx0XHRcdGNvb3JkczogdGhpcy5fa2V5VG9UaWxlQ29vcmRzKGtleSlcblx0XHR9KTtcblx0fSxcblxuXHRfaW5pdFRpbGU6IGZ1bmN0aW9uICh0aWxlKSB7XG5cdFx0TC5Eb21VdGlsLmFkZENsYXNzKHRpbGUsICdsZWFmbGV0LXRpbGUnKTtcblxuXHRcdHZhciB0aWxlU2l6ZSA9IHRoaXMuZ2V0VGlsZVNpemUoKTtcblx0XHR0aWxlLnN0eWxlLndpZHRoID0gdGlsZVNpemUueCArICdweCc7XG5cdFx0dGlsZS5zdHlsZS5oZWlnaHQgPSB0aWxlU2l6ZS55ICsgJ3B4JztcblxuXHRcdHRpbGUub25zZWxlY3RzdGFydCA9IEwuVXRpbC5mYWxzZUZuO1xuXHRcdHRpbGUub25tb3VzZW1vdmUgPSBMLlV0aWwuZmFsc2VGbjtcblxuXHRcdC8vIHVwZGF0ZSBvcGFjaXR5IG9uIHRpbGVzIGluIElFNy04IGJlY2F1c2Ugb2YgZmlsdGVyIGluaGVyaXRhbmNlIHByb2JsZW1zXG5cdFx0aWYgKEwuQnJvd3Nlci5pZWx0OSAmJiB0aGlzLm9wdGlvbnMub3BhY2l0eSA8IDEpIHtcblx0XHRcdEwuRG9tVXRpbC5zZXRPcGFjaXR5KHRpbGUsIHRoaXMub3B0aW9ucy5vcGFjaXR5KTtcblx0XHR9XG5cblx0XHQvLyB3aXRob3V0IHRoaXMgaGFjaywgdGlsZXMgZGlzYXBwZWFyIGFmdGVyIHpvb20gb24gQ2hyb21lIGZvciBBbmRyb2lkXG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL0xlYWZsZXQvTGVhZmxldC9pc3N1ZXMvMjA3OFxuXHRcdGlmIChMLkJyb3dzZXIuYW5kcm9pZCAmJiAhTC5Ccm93c2VyLmFuZHJvaWQyMykge1xuXHRcdFx0dGlsZS5zdHlsZS5XZWJraXRCYWNrZmFjZVZpc2liaWxpdHkgPSAnaGlkZGVuJztcblx0XHR9XG5cdH0sXG5cblx0X2FkZFRpbGU6IGZ1bmN0aW9uIChjb29yZHMsIGNvbnRhaW5lcikge1xuXHRcdHZhciB0aWxlUG9zID0gdGhpcy5fZ2V0VGlsZVBvcyhjb29yZHMpLFxuXHRcdCAgICBrZXkgPSB0aGlzLl90aWxlQ29vcmRzVG9LZXkoY29vcmRzKTtcblxuXHRcdHZhciB0aWxlID0gdGhpcy5jcmVhdGVUaWxlKHRoaXMuX3dyYXBDb29yZHMoY29vcmRzKSwgTC5iaW5kKHRoaXMuX3RpbGVSZWFkeSwgdGhpcywgY29vcmRzKSk7XG5cblx0XHR0aGlzLl9pbml0VGlsZSh0aWxlKTtcblxuXHRcdC8vIGlmIGNyZWF0ZVRpbGUgaXMgZGVmaW5lZCB3aXRoIGEgc2Vjb25kIGFyZ3VtZW50IChcImRvbmVcIiBjYWxsYmFjayksXG5cdFx0Ly8gd2Uga25vdyB0aGF0IHRpbGUgaXMgYXN5bmMgYW5kIHdpbGwgYmUgcmVhZHkgbGF0ZXI7IG90aGVyd2lzZVxuXHRcdGlmICh0aGlzLmNyZWF0ZVRpbGUubGVuZ3RoIDwgMikge1xuXHRcdFx0Ly8gbWFyayB0aWxlIGFzIHJlYWR5LCBidXQgZGVsYXkgb25lIGZyYW1lIGZvciBvcGFjaXR5IGFuaW1hdGlvbiB0byBoYXBwZW5cblx0XHRcdEwuVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKEwuYmluZCh0aGlzLl90aWxlUmVhZHksIHRoaXMsIGNvb3JkcywgbnVsbCwgdGlsZSkpO1xuXHRcdH1cblxuXHRcdEwuRG9tVXRpbC5zZXRQb3NpdGlvbih0aWxlLCB0aWxlUG9zKTtcblxuXHRcdC8vIHNhdmUgdGlsZSBpbiBjYWNoZVxuXHRcdHRoaXMuX3RpbGVzW2tleV0gPSB7XG5cdFx0XHRlbDogdGlsZSxcblx0XHRcdGNvb3JkczogY29vcmRzLFxuXHRcdFx0Y3VycmVudDogdHJ1ZVxuXHRcdH07XG5cblx0XHRjb250YWluZXIuYXBwZW5kQ2hpbGQodGlsZSk7XG5cdFx0dGhpcy5maXJlKCd0aWxlbG9hZHN0YXJ0Jywge1xuXHRcdFx0dGlsZTogdGlsZSxcblx0XHRcdGNvb3JkczogY29vcmRzXG5cdFx0fSk7XG5cdH0sXG5cblx0X3RpbGVSZWFkeTogZnVuY3Rpb24gKGNvb3JkcywgZXJyLCB0aWxlKSB7XG5cdFx0aWYgKCF0aGlzLl9tYXApIHsgcmV0dXJuOyB9XG5cblx0XHRpZiAoZXJyKSB7XG5cdFx0XHR0aGlzLmZpcmUoJ3RpbGVlcnJvcicsIHtcblx0XHRcdFx0ZXJyb3I6IGVycixcblx0XHRcdFx0dGlsZTogdGlsZSxcblx0XHRcdFx0Y29vcmRzOiBjb29yZHNcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHZhciBrZXkgPSB0aGlzLl90aWxlQ29vcmRzVG9LZXkoY29vcmRzKTtcblxuXHRcdHRpbGUgPSB0aGlzLl90aWxlc1trZXldO1xuXHRcdGlmICghdGlsZSkgeyByZXR1cm47IH1cblxuXHRcdHRpbGUubG9hZGVkID0gK25ldyBEYXRlKCk7XG5cdFx0aWYgKHRoaXMuX21hcC5fZmFkZUFuaW1hdGVkKSB7XG5cdFx0XHRMLkRvbVV0aWwuc2V0T3BhY2l0eSh0aWxlLmVsLCAwKTtcblx0XHRcdEwuVXRpbC5jYW5jZWxBbmltRnJhbWUodGhpcy5fZmFkZUZyYW1lKTtcblx0XHRcdHRoaXMuX2ZhZGVGcmFtZSA9IEwuVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKHRoaXMuX3VwZGF0ZU9wYWNpdHksIHRoaXMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aWxlLmFjdGl2ZSA9IHRydWU7XG5cdFx0XHR0aGlzLl9wcnVuZVRpbGVzKCk7XG5cdFx0fVxuXG5cdFx0TC5Eb21VdGlsLmFkZENsYXNzKHRpbGUuZWwsICdsZWFmbGV0LXRpbGUtbG9hZGVkJyk7XG5cblx0XHR0aGlzLmZpcmUoJ3RpbGVsb2FkJywge1xuXHRcdFx0dGlsZTogdGlsZS5lbCxcblx0XHRcdGNvb3JkczogY29vcmRzXG5cdFx0fSk7XG5cblx0XHRpZiAodGhpcy5fbm9UaWxlc1RvTG9hZCgpKSB7XG5cdFx0XHR0aGlzLl9sb2FkaW5nID0gZmFsc2U7XG5cdFx0XHR0aGlzLmZpcmUoJ2xvYWQnKTtcblx0XHR9XG5cdH0sXG5cblx0X2dldFRpbGVQb3M6IGZ1bmN0aW9uIChjb29yZHMpIHtcblx0XHRyZXR1cm4gY29vcmRzLnNjYWxlQnkodGhpcy5nZXRUaWxlU2l6ZSgpKS5zdWJ0cmFjdCh0aGlzLl9sZXZlbC5vcmlnaW4pO1xuXHR9LFxuXG5cdF93cmFwQ29vcmRzOiBmdW5jdGlvbiAoY29vcmRzKSB7XG5cdFx0dmFyIG5ld0Nvb3JkcyA9IG5ldyBMLlBvaW50KFxuXHRcdFx0dGhpcy5fd3JhcFggPyBMLlV0aWwud3JhcE51bShjb29yZHMueCwgdGhpcy5fd3JhcFgpIDogY29vcmRzLngsXG5cdFx0XHR0aGlzLl93cmFwWSA/IEwuVXRpbC53cmFwTnVtKGNvb3Jkcy55LCB0aGlzLl93cmFwWSkgOiBjb29yZHMueSk7XG5cdFx0bmV3Q29vcmRzLnogPSBjb29yZHMuejtcblx0XHRyZXR1cm4gbmV3Q29vcmRzO1xuXHR9LFxuXG5cdF9weEJvdW5kc1RvVGlsZVJhbmdlOiBmdW5jdGlvbiAoYm91bmRzKSB7XG5cdFx0dmFyIHRpbGVTaXplID0gdGhpcy5nZXRUaWxlU2l6ZSgpO1xuXHRcdHJldHVybiBuZXcgTC5Cb3VuZHMoXG5cdFx0XHRib3VuZHMubWluLnVuc2NhbGVCeSh0aWxlU2l6ZSkuZmxvb3IoKSxcblx0XHRcdGJvdW5kcy5tYXgudW5zY2FsZUJ5KHRpbGVTaXplKS5jZWlsKCkuc3VidHJhY3QoWzEsIDFdKSk7XG5cdH0sXG5cblx0X25vVGlsZXNUb0xvYWQ6IGZ1bmN0aW9uICgpIHtcblx0XHRmb3IgKHZhciBrZXkgaW4gdGhpcy5fdGlsZXMpIHtcblx0XHRcdGlmICghdGhpcy5fdGlsZXNba2V5XS5sb2FkZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG59KTtcblxuTC5ncmlkTGF5ZXIgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXHRyZXR1cm4gbmV3IEwuR3JpZExheWVyKG9wdGlvbnMpO1xufTtcblxuXG5cbi8qXHJcbiAqIEwuVGlsZUxheWVyIGlzIHVzZWQgZm9yIHN0YW5kYXJkIHh5ei1udW1iZXJlZCB0aWxlIGxheWVycy5cclxuICovXHJcblxyXG5MLlRpbGVMYXllciA9IEwuR3JpZExheWVyLmV4dGVuZCh7XHJcblxyXG5cdG9wdGlvbnM6IHtcclxuXHRcdG1heFpvb206IDE4LFxyXG5cclxuXHRcdHN1YmRvbWFpbnM6ICdhYmMnLFxyXG5cdFx0ZXJyb3JUaWxlVXJsOiAnJyxcclxuXHRcdHpvb21PZmZzZXQ6IDAsXHJcblxyXG5cdFx0bWF4TmF0aXZlWm9vbTogbnVsbCwgLy8gTnVtYmVyXHJcblx0XHR0bXM6IGZhbHNlLFxyXG5cdFx0em9vbVJldmVyc2U6IGZhbHNlLFxyXG5cdFx0ZGV0ZWN0UmV0aW5hOiBmYWxzZSxcclxuXHRcdGNyb3NzT3JpZ2luOiBmYWxzZVxyXG5cdH0sXHJcblxyXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcclxuXHJcblx0XHR0aGlzLl91cmwgPSB1cmw7XHJcblxyXG5cdFx0b3B0aW9ucyA9IEwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcclxuXHJcblx0XHQvLyBkZXRlY3RpbmcgcmV0aW5hIGRpc3BsYXlzLCBhZGp1c3RpbmcgdGlsZVNpemUgYW5kIHpvb20gbGV2ZWxzXHJcblx0XHRpZiAob3B0aW9ucy5kZXRlY3RSZXRpbmEgJiYgTC5Ccm93c2VyLnJldGluYSAmJiBvcHRpb25zLm1heFpvb20gPiAwKSB7XHJcblxyXG5cdFx0XHRvcHRpb25zLnRpbGVTaXplID0gTWF0aC5mbG9vcihvcHRpb25zLnRpbGVTaXplIC8gMik7XHJcblx0XHRcdG9wdGlvbnMuem9vbU9mZnNldCsrO1xyXG5cclxuXHRcdFx0b3B0aW9ucy5taW5ab29tID0gTWF0aC5tYXgoMCwgb3B0aW9ucy5taW5ab29tKTtcclxuXHRcdFx0b3B0aW9ucy5tYXhab29tLS07XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBvcHRpb25zLnN1YmRvbWFpbnMgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdG9wdGlvbnMuc3ViZG9tYWlucyA9IG9wdGlvbnMuc3ViZG9tYWlucy5zcGxpdCgnJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9MZWFmbGV0L0xlYWZsZXQvaXNzdWVzLzEzN1xyXG5cdFx0aWYgKCFMLkJyb3dzZXIuYW5kcm9pZCkge1xyXG5cdFx0XHR0aGlzLm9uKCd0aWxldW5sb2FkJywgdGhpcy5fb25UaWxlUmVtb3ZlKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRzZXRVcmw6IGZ1bmN0aW9uICh1cmwsIG5vUmVkcmF3KSB7XHJcblx0XHR0aGlzLl91cmwgPSB1cmw7XHJcblxyXG5cdFx0aWYgKCFub1JlZHJhdykge1xyXG5cdFx0XHR0aGlzLnJlZHJhdygpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0Y3JlYXRlVGlsZTogZnVuY3Rpb24gKGNvb3JkcywgZG9uZSkge1xyXG5cdFx0dmFyIHRpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuXHJcblx0XHRMLkRvbUV2ZW50Lm9uKHRpbGUsICdsb2FkJywgTC5iaW5kKHRoaXMuX3RpbGVPbkxvYWQsIHRoaXMsIGRvbmUsIHRpbGUpKTtcclxuXHRcdEwuRG9tRXZlbnQub24odGlsZSwgJ2Vycm9yJywgTC5iaW5kKHRoaXMuX3RpbGVPbkVycm9yLCB0aGlzLCBkb25lLCB0aWxlKSk7XHJcblxyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5jcm9zc09yaWdpbikge1xyXG5cdFx0XHR0aWxlLmNyb3NzT3JpZ2luID0gJyc7XHJcblx0XHR9XHJcblxyXG5cdFx0LypcclxuXHRcdCBBbHQgdGFnIGlzIHNldCB0byBlbXB0eSBzdHJpbmcgdG8ga2VlcCBzY3JlZW4gcmVhZGVycyBmcm9tIHJlYWRpbmcgVVJMIGFuZCBmb3IgY29tcGxpYW5jZSByZWFzb25zXHJcblx0XHQgaHR0cDovL3d3dy53My5vcmcvVFIvV0NBRzIwLVRFQ0hTL0g2N1xyXG5cdFx0Ki9cclxuXHRcdHRpbGUuYWx0ID0gJyc7XHJcblxyXG5cdFx0dGlsZS5zcmMgPSB0aGlzLmdldFRpbGVVcmwoY29vcmRzKTtcclxuXHJcblx0XHRyZXR1cm4gdGlsZTtcclxuXHR9LFxyXG5cclxuXHRnZXRUaWxlVXJsOiBmdW5jdGlvbiAoY29vcmRzKSB7XHJcblx0XHRyZXR1cm4gTC5VdGlsLnRlbXBsYXRlKHRoaXMuX3VybCwgTC5leHRlbmQoe1xyXG5cdFx0XHRyOiB0aGlzLm9wdGlvbnMuZGV0ZWN0UmV0aW5hICYmIEwuQnJvd3Nlci5yZXRpbmEgJiYgdGhpcy5vcHRpb25zLm1heFpvb20gPiAwID8gJ0AyeCcgOiAnJyxcclxuXHRcdFx0czogdGhpcy5fZ2V0U3ViZG9tYWluKGNvb3JkcyksXHJcblx0XHRcdHg6IGNvb3Jkcy54LFxyXG5cdFx0XHR5OiB0aGlzLm9wdGlvbnMudG1zID8gdGhpcy5fZ2xvYmFsVGlsZVJhbmdlLm1heC55IC0gY29vcmRzLnkgOiBjb29yZHMueSxcclxuXHRcdFx0ejogdGhpcy5fZ2V0Wm9vbUZvclVybCgpXHJcblx0XHR9LCB0aGlzLm9wdGlvbnMpKTtcclxuXHR9LFxyXG5cclxuXHRfdGlsZU9uTG9hZDogZnVuY3Rpb24gKGRvbmUsIHRpbGUpIHtcclxuXHRcdC8vIEZvciBodHRwczovL2dpdGh1Yi5jb20vTGVhZmxldC9MZWFmbGV0L2lzc3Vlcy8zMzMyXHJcblx0XHRpZiAoTC5Ccm93c2VyLmllbHQ5KSB7XHJcblx0XHRcdHNldFRpbWVvdXQoTC5iaW5kKGRvbmUsIHRoaXMsIG51bGwsIHRpbGUpLCAwKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGRvbmUobnVsbCwgdGlsZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X3RpbGVPbkVycm9yOiBmdW5jdGlvbiAoZG9uZSwgdGlsZSwgZSkge1xyXG5cdFx0dmFyIGVycm9yVXJsID0gdGhpcy5vcHRpb25zLmVycm9yVGlsZVVybDtcclxuXHRcdGlmIChlcnJvclVybCkge1xyXG5cdFx0XHR0aWxlLnNyYyA9IGVycm9yVXJsO1xyXG5cdFx0fVxyXG5cdFx0ZG9uZShlLCB0aWxlKTtcclxuXHR9LFxyXG5cclxuXHRnZXRUaWxlU2l6ZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIG1hcCA9IHRoaXMuX21hcCxcclxuXHRcdCAgICB0aWxlU2l6ZSA9IEwuR3JpZExheWVyLnByb3RvdHlwZS5nZXRUaWxlU2l6ZS5jYWxsKHRoaXMpLFxyXG5cdFx0ICAgIHpvb20gPSB0aGlzLl90aWxlWm9vbSArIHRoaXMub3B0aW9ucy56b29tT2Zmc2V0LFxyXG5cdFx0ICAgIHpvb21OID0gdGhpcy5vcHRpb25zLm1heE5hdGl2ZVpvb207XHJcblxyXG5cdFx0Ly8gaW5jcmVhc2UgdGlsZSBzaXplIHdoZW4gb3ZlcnNjYWxpbmdcclxuXHRcdHJldHVybiB6b29tTiAhPT0gbnVsbCAmJiB6b29tID4gem9vbU4gP1xyXG5cdFx0XHRcdHRpbGVTaXplLmRpdmlkZUJ5KG1hcC5nZXRab29tU2NhbGUoem9vbU4sIHpvb20pKS5yb3VuZCgpIDpcclxuXHRcdFx0XHR0aWxlU2l6ZTtcclxuXHR9LFxyXG5cclxuXHRfb25UaWxlUmVtb3ZlOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0ZS50aWxlLm9ubG9hZCA9IG51bGw7XHJcblx0fSxcclxuXHJcblx0X2dldFpvb21Gb3JVcmw6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHR2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucyxcclxuXHRcdCAgICB6b29tID0gdGhpcy5fdGlsZVpvb207XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMuem9vbVJldmVyc2UpIHtcclxuXHRcdFx0em9vbSA9IG9wdGlvbnMubWF4Wm9vbSAtIHpvb207XHJcblx0XHR9XHJcblxyXG5cdFx0em9vbSArPSBvcHRpb25zLnpvb21PZmZzZXQ7XHJcblxyXG5cdFx0cmV0dXJuIG9wdGlvbnMubWF4TmF0aXZlWm9vbSAhPT0gbnVsbCA/IE1hdGgubWluKHpvb20sIG9wdGlvbnMubWF4TmF0aXZlWm9vbSkgOiB6b29tO1xyXG5cdH0sXHJcblxyXG5cdF9nZXRTdWJkb21haW46IGZ1bmN0aW9uICh0aWxlUG9pbnQpIHtcclxuXHRcdHZhciBpbmRleCA9IE1hdGguYWJzKHRpbGVQb2ludC54ICsgdGlsZVBvaW50LnkpICUgdGhpcy5vcHRpb25zLnN1YmRvbWFpbnMubGVuZ3RoO1xyXG5cdFx0cmV0dXJuIHRoaXMub3B0aW9ucy5zdWJkb21haW5zW2luZGV4XTtcclxuXHR9LFxyXG5cclxuXHQvLyBzdG9wcyBsb2FkaW5nIGFsbCB0aWxlcyBpbiB0aGUgYmFja2dyb3VuZCBsYXllclxyXG5cdF9hYm9ydExvYWRpbmc6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBpLCB0aWxlO1xyXG5cdFx0Zm9yIChpIGluIHRoaXMuX3RpbGVzKSB7XHJcblx0XHRcdGlmICh0aGlzLl90aWxlc1tpXS5jb29yZHMueiAhPT0gdGhpcy5fdGlsZVpvb20pIHtcclxuXHRcdFx0XHR0aWxlID0gdGhpcy5fdGlsZXNbaV0uZWw7XHJcblxyXG5cdFx0XHRcdHRpbGUub25sb2FkID0gTC5VdGlsLmZhbHNlRm47XHJcblx0XHRcdFx0dGlsZS5vbmVycm9yID0gTC5VdGlsLmZhbHNlRm47XHJcblxyXG5cdFx0XHRcdGlmICghdGlsZS5jb21wbGV0ZSkge1xyXG5cdFx0XHRcdFx0dGlsZS5zcmMgPSBMLlV0aWwuZW1wdHlJbWFnZVVybDtcclxuXHRcdFx0XHRcdEwuRG9tVXRpbC5yZW1vdmUodGlsZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59KTtcclxuXHJcbkwudGlsZUxheWVyID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xyXG5cdHJldHVybiBuZXcgTC5UaWxlTGF5ZXIodXJsLCBvcHRpb25zKTtcclxufTtcclxuXG5cblxuLypcclxuICogTC5UaWxlTGF5ZXIuV01TIGlzIHVzZWQgZm9yIFdNUyB0aWxlIGxheWVycy5cclxuICovXHJcblxyXG5MLlRpbGVMYXllci5XTVMgPSBMLlRpbGVMYXllci5leHRlbmQoe1xyXG5cclxuXHRkZWZhdWx0V21zUGFyYW1zOiB7XHJcblx0XHRzZXJ2aWNlOiAnV01TJyxcclxuXHRcdHJlcXVlc3Q6ICdHZXRNYXAnLFxyXG5cdFx0dmVyc2lvbjogJzEuMS4xJyxcclxuXHRcdGxheWVyczogJycsXHJcblx0XHRzdHlsZXM6ICcnLFxyXG5cdFx0Zm9ybWF0OiAnaW1hZ2UvanBlZycsXHJcblx0XHR0cmFuc3BhcmVudDogZmFsc2VcclxuXHR9LFxyXG5cclxuXHRvcHRpb25zOiB7XHJcblx0XHRjcnM6IG51bGwsXHJcblx0XHR1cHBlcmNhc2U6IGZhbHNlXHJcblx0fSxcclxuXHJcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xyXG5cclxuXHRcdHRoaXMuX3VybCA9IHVybDtcclxuXHJcblx0XHR2YXIgd21zUGFyYW1zID0gTC5leHRlbmQoe30sIHRoaXMuZGVmYXVsdFdtc1BhcmFtcyk7XHJcblxyXG5cdFx0Ly8gYWxsIGtleXMgdGhhdCBhcmUgbm90IFRpbGVMYXllciBvcHRpb25zIGdvIHRvIFdNUyBwYXJhbXNcclxuXHRcdGZvciAodmFyIGkgaW4gb3B0aW9ucykge1xyXG5cdFx0XHRpZiAoIShpIGluIHRoaXMub3B0aW9ucykpIHtcclxuXHRcdFx0XHR3bXNQYXJhbXNbaV0gPSBvcHRpb25zW2ldO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0b3B0aW9ucyA9IEwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcclxuXHJcblx0XHR3bXNQYXJhbXMud2lkdGggPSB3bXNQYXJhbXMuaGVpZ2h0ID0gb3B0aW9ucy50aWxlU2l6ZSAqIChvcHRpb25zLmRldGVjdFJldGluYSAmJiBMLkJyb3dzZXIucmV0aW5hID8gMiA6IDEpO1xyXG5cclxuXHRcdHRoaXMud21zUGFyYW1zID0gd21zUGFyYW1zO1xyXG5cdH0sXHJcblxyXG5cdG9uQWRkOiBmdW5jdGlvbiAobWFwKSB7XHJcblxyXG5cdFx0dGhpcy5fY3JzID0gdGhpcy5vcHRpb25zLmNycyB8fCBtYXAub3B0aW9ucy5jcnM7XHJcblx0XHR0aGlzLl93bXNWZXJzaW9uID0gcGFyc2VGbG9hdCh0aGlzLndtc1BhcmFtcy52ZXJzaW9uKTtcclxuXHJcblx0XHR2YXIgcHJvamVjdGlvbktleSA9IHRoaXMuX3dtc1ZlcnNpb24gPj0gMS4zID8gJ2NycycgOiAnc3JzJztcclxuXHRcdHRoaXMud21zUGFyYW1zW3Byb2plY3Rpb25LZXldID0gdGhpcy5fY3JzLmNvZGU7XHJcblxyXG5cdFx0TC5UaWxlTGF5ZXIucHJvdG90eXBlLm9uQWRkLmNhbGwodGhpcywgbWFwKTtcclxuXHR9LFxyXG5cclxuXHRnZXRUaWxlVXJsOiBmdW5jdGlvbiAoY29vcmRzKSB7XHJcblxyXG5cdFx0dmFyIHRpbGVCb3VuZHMgPSB0aGlzLl90aWxlQ29vcmRzVG9Cb3VuZHMoY29vcmRzKSxcclxuXHRcdCAgICBudyA9IHRoaXMuX2Nycy5wcm9qZWN0KHRpbGVCb3VuZHMuZ2V0Tm9ydGhXZXN0KCkpLFxyXG5cdFx0ICAgIHNlID0gdGhpcy5fY3JzLnByb2plY3QodGlsZUJvdW5kcy5nZXRTb3V0aEVhc3QoKSksXHJcblxyXG5cdFx0ICAgIGJib3ggPSAodGhpcy5fd21zVmVyc2lvbiA+PSAxLjMgJiYgdGhpcy5fY3JzID09PSBMLkNSUy5FUFNHNDMyNiA/XHJcblx0XHRcdCAgICBbc2UueSwgbncueCwgbncueSwgc2UueF0gOlxyXG5cdFx0XHQgICAgW253LngsIHNlLnksIHNlLngsIG53LnldKS5qb2luKCcsJyksXHJcblxyXG5cdFx0ICAgIHVybCA9IEwuVGlsZUxheWVyLnByb3RvdHlwZS5nZXRUaWxlVXJsLmNhbGwodGhpcywgY29vcmRzKTtcclxuXHJcblx0XHRyZXR1cm4gdXJsICtcclxuXHRcdFx0TC5VdGlsLmdldFBhcmFtU3RyaW5nKHRoaXMud21zUGFyYW1zLCB1cmwsIHRoaXMub3B0aW9ucy51cHBlcmNhc2UpICtcclxuXHRcdFx0KHRoaXMub3B0aW9ucy51cHBlcmNhc2UgPyAnJkJCT1g9JyA6ICcmYmJveD0nKSArIGJib3g7XHJcblx0fSxcclxuXHJcblx0c2V0UGFyYW1zOiBmdW5jdGlvbiAocGFyYW1zLCBub1JlZHJhdykge1xyXG5cclxuXHRcdEwuZXh0ZW5kKHRoaXMud21zUGFyYW1zLCBwYXJhbXMpO1xyXG5cclxuXHRcdGlmICghbm9SZWRyYXcpIHtcclxuXHRcdFx0dGhpcy5yZWRyYXcoKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcbn0pO1xyXG5cclxuTC50aWxlTGF5ZXIud21zID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xyXG5cdHJldHVybiBuZXcgTC5UaWxlTGF5ZXIuV01TKHVybCwgb3B0aW9ucyk7XHJcbn07XHJcblxuXG5cbi8qXHJcbiAqIEwuSW1hZ2VPdmVybGF5IGlzIHVzZWQgdG8gb3ZlcmxheSBpbWFnZXMgb3ZlciB0aGUgbWFwICh0byBzcGVjaWZpYyBnZW9ncmFwaGljYWwgYm91bmRzKS5cclxuICovXHJcblxyXG5MLkltYWdlT3ZlcmxheSA9IEwuTGF5ZXIuZXh0ZW5kKHtcclxuXHJcblx0b3B0aW9uczoge1xyXG5cdFx0b3BhY2l0eTogMSxcclxuXHRcdGFsdDogJycsXHJcblx0XHRpbnRlcmFjdGl2ZTogZmFsc2VcclxuXHJcblx0XHQvKlxyXG5cdFx0Y3Jvc3NPcmlnaW46IDxCb29sZWFuPixcclxuXHRcdCovXHJcblx0fSxcclxuXHJcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKHVybCwgYm91bmRzLCBvcHRpb25zKSB7IC8vIChTdHJpbmcsIExhdExuZ0JvdW5kcywgT2JqZWN0KVxyXG5cdFx0dGhpcy5fdXJsID0gdXJsO1xyXG5cdFx0dGhpcy5fYm91bmRzID0gTC5sYXRMbmdCb3VuZHMoYm91bmRzKTtcclxuXHJcblx0XHRMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XHJcblx0fSxcclxuXHJcblx0b25BZGQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICghdGhpcy5faW1hZ2UpIHtcclxuXHRcdFx0dGhpcy5faW5pdEltYWdlKCk7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLm9wYWNpdHkgPCAxKSB7XHJcblx0XHRcdFx0dGhpcy5fdXBkYXRlT3BhY2l0eSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5pbnRlcmFjdGl2ZSkge1xyXG5cdFx0XHRMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5faW1hZ2UsICdsZWFmbGV0LWludGVyYWN0aXZlJyk7XHJcblx0XHRcdHRoaXMuYWRkSW50ZXJhY3RpdmVUYXJnZXQodGhpcy5faW1hZ2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZ2V0UGFuZSgpLmFwcGVuZENoaWxkKHRoaXMuX2ltYWdlKTtcclxuXHRcdHRoaXMuX3Jlc2V0KCk7XHJcblx0fSxcclxuXHJcblx0b25SZW1vdmU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdEwuRG9tVXRpbC5yZW1vdmUodGhpcy5faW1hZ2UpO1xyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5pbnRlcmFjdGl2ZSkge1xyXG5cdFx0XHR0aGlzLnJlbW92ZUludGVyYWN0aXZlVGFyZ2V0KHRoaXMuX2ltYWdlKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRzZXRPcGFjaXR5OiBmdW5jdGlvbiAob3BhY2l0eSkge1xyXG5cdFx0dGhpcy5vcHRpb25zLm9wYWNpdHkgPSBvcGFjaXR5O1xyXG5cclxuXHRcdGlmICh0aGlzLl9pbWFnZSkge1xyXG5cdFx0XHR0aGlzLl91cGRhdGVPcGFjaXR5KCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRzZXRTdHlsZTogZnVuY3Rpb24gKHN0eWxlT3B0cykge1xyXG5cdFx0aWYgKHN0eWxlT3B0cy5vcGFjaXR5KSB7XHJcblx0XHRcdHRoaXMuc2V0T3BhY2l0eShzdHlsZU9wdHMub3BhY2l0eSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRicmluZ1RvRnJvbnQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzLl9tYXApIHtcclxuXHRcdFx0TC5Eb21VdGlsLnRvRnJvbnQodGhpcy5faW1hZ2UpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0YnJpbmdUb0JhY2s6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzLl9tYXApIHtcclxuXHRcdFx0TC5Eb21VdGlsLnRvQmFjayh0aGlzLl9pbWFnZSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRzZXRVcmw6IGZ1bmN0aW9uICh1cmwpIHtcclxuXHRcdHRoaXMuX3VybCA9IHVybDtcclxuXHJcblx0XHRpZiAodGhpcy5faW1hZ2UpIHtcclxuXHRcdFx0dGhpcy5faW1hZ2Uuc3JjID0gdXJsO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0c2V0Qm91bmRzOiBmdW5jdGlvbiAoYm91bmRzKSB7XHJcblx0XHR0aGlzLl9ib3VuZHMgPSBib3VuZHM7XHJcblxyXG5cdFx0aWYgKHRoaXMuX21hcCkge1xyXG5cdFx0XHR0aGlzLl9yZXNldCgpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0Z2V0QXR0cmlidXRpb246IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLm9wdGlvbnMuYXR0cmlidXRpb247XHJcblx0fSxcclxuXHJcblx0Z2V0RXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgZXZlbnRzID0ge1xyXG5cdFx0XHR6b29tOiB0aGlzLl9yZXNldCxcclxuXHRcdFx0dmlld3Jlc2V0OiB0aGlzLl9yZXNldFxyXG5cdFx0fTtcclxuXHJcblx0XHRpZiAodGhpcy5fem9vbUFuaW1hdGVkKSB7XHJcblx0XHRcdGV2ZW50cy56b29tYW5pbSA9IHRoaXMuX2FuaW1hdGVab29tO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBldmVudHM7XHJcblx0fSxcclxuXHJcblx0Z2V0Qm91bmRzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fYm91bmRzO1xyXG5cdH0sXHJcblxyXG5cdGdldEVsZW1lbnQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLl9pbWFnZTtcclxuXHR9LFxyXG5cclxuXHRfaW5pdEltYWdlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgaW1nID0gdGhpcy5faW1hZ2UgPSBMLkRvbVV0aWwuY3JlYXRlKCdpbWcnLFxyXG5cdFx0XHRcdCdsZWFmbGV0LWltYWdlLWxheWVyICcgKyAodGhpcy5fem9vbUFuaW1hdGVkID8gJ2xlYWZsZXQtem9vbS1hbmltYXRlZCcgOiAnJykpO1xyXG5cclxuXHRcdGltZy5vbnNlbGVjdHN0YXJ0ID0gTC5VdGlsLmZhbHNlRm47XHJcblx0XHRpbWcub25tb3VzZW1vdmUgPSBMLlV0aWwuZmFsc2VGbjtcclxuXHJcblx0XHRpbWcub25sb2FkID0gTC5iaW5kKHRoaXMuZmlyZSwgdGhpcywgJ2xvYWQnKTtcclxuXHJcblx0XHRpZiAodGhpcy5vcHRpb25zLmNyb3NzT3JpZ2luKSB7XHJcblx0XHRcdGltZy5jcm9zc09yaWdpbiA9ICcnO1xyXG5cdFx0fVxyXG5cclxuXHRcdGltZy5zcmMgPSB0aGlzLl91cmw7XHJcblx0XHRpbWcuYWx0ID0gdGhpcy5vcHRpb25zLmFsdDtcclxuXHR9LFxyXG5cclxuXHRfYW5pbWF0ZVpvb206IGZ1bmN0aW9uIChlKSB7XHJcblx0XHR2YXIgc2NhbGUgPSB0aGlzLl9tYXAuZ2V0Wm9vbVNjYWxlKGUuem9vbSksXHJcblx0XHQgICAgb2Zmc2V0ID0gdGhpcy5fbWFwLl9sYXRMbmdUb05ld0xheWVyUG9pbnQodGhpcy5fYm91bmRzLmdldE5vcnRoV2VzdCgpLCBlLnpvb20sIGUuY2VudGVyKTtcclxuXHJcblx0XHRMLkRvbVV0aWwuc2V0VHJhbnNmb3JtKHRoaXMuX2ltYWdlLCBvZmZzZXQsIHNjYWxlKTtcclxuXHR9LFxyXG5cclxuXHRfcmVzZXQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBpbWFnZSA9IHRoaXMuX2ltYWdlLFxyXG5cdFx0ICAgIGJvdW5kcyA9IG5ldyBMLkJvdW5kcyhcclxuXHRcdCAgICAgICAgdGhpcy5fbWFwLmxhdExuZ1RvTGF5ZXJQb2ludCh0aGlzLl9ib3VuZHMuZ2V0Tm9ydGhXZXN0KCkpLFxyXG5cdFx0ICAgICAgICB0aGlzLl9tYXAubGF0TG5nVG9MYXllclBvaW50KHRoaXMuX2JvdW5kcy5nZXRTb3V0aEVhc3QoKSkpLFxyXG5cdFx0ICAgIHNpemUgPSBib3VuZHMuZ2V0U2l6ZSgpO1xyXG5cclxuXHRcdEwuRG9tVXRpbC5zZXRQb3NpdGlvbihpbWFnZSwgYm91bmRzLm1pbik7XHJcblxyXG5cdFx0aW1hZ2Uuc3R5bGUud2lkdGggID0gc2l6ZS54ICsgJ3B4JztcclxuXHRcdGltYWdlLnN0eWxlLmhlaWdodCA9IHNpemUueSArICdweCc7XHJcblx0fSxcclxuXHJcblx0X3VwZGF0ZU9wYWNpdHk6IGZ1bmN0aW9uICgpIHtcclxuXHRcdEwuRG9tVXRpbC5zZXRPcGFjaXR5KHRoaXMuX2ltYWdlLCB0aGlzLm9wdGlvbnMub3BhY2l0eSk7XHJcblx0fVxyXG59KTtcclxuXHJcbkwuaW1hZ2VPdmVybGF5ID0gZnVuY3Rpb24gKHVybCwgYm91bmRzLCBvcHRpb25zKSB7XHJcblx0cmV0dXJuIG5ldyBMLkltYWdlT3ZlcmxheSh1cmwsIGJvdW5kcywgb3B0aW9ucyk7XHJcbn07XHJcblxuXG5cbi8qXHJcbiAqIEwuSWNvbiBpcyBhbiBpbWFnZS1iYXNlZCBpY29uIGNsYXNzIHRoYXQgeW91IGNhbiB1c2Ugd2l0aCBMLk1hcmtlciBmb3IgY3VzdG9tIG1hcmtlcnMuXHJcbiAqL1xyXG5cclxuTC5JY29uID0gTC5DbGFzcy5leHRlbmQoe1xyXG5cdC8qXHJcblx0b3B0aW9uczoge1xyXG5cdFx0aWNvblVybDogKFN0cmluZykgKHJlcXVpcmVkKVxyXG5cdFx0aWNvblJldGluYVVybDogKFN0cmluZykgKG9wdGlvbmFsLCB1c2VkIGZvciByZXRpbmEgZGV2aWNlcyBpZiBkZXRlY3RlZClcclxuXHRcdGljb25TaXplOiAoUG9pbnQpIChjYW4gYmUgc2V0IHRocm91Z2ggQ1NTKVxyXG5cdFx0aWNvbkFuY2hvcjogKFBvaW50KSAoY2VudGVyZWQgYnkgZGVmYXVsdCwgY2FuIGJlIHNldCBpbiBDU1Mgd2l0aCBuZWdhdGl2ZSBtYXJnaW5zKVxyXG5cdFx0cG9wdXBBbmNob3I6IChQb2ludCkgKGlmIG5vdCBzcGVjaWZpZWQsIHBvcHVwIG9wZW5zIGluIHRoZSBhbmNob3IgcG9pbnQpXHJcblx0XHRzaGFkb3dVcmw6IChTdHJpbmcpIChubyBzaGFkb3cgYnkgZGVmYXVsdClcclxuXHRcdHNoYWRvd1JldGluYVVybDogKFN0cmluZykgKG9wdGlvbmFsLCB1c2VkIGZvciByZXRpbmEgZGV2aWNlcyBpZiBkZXRlY3RlZClcclxuXHRcdHNoYWRvd1NpemU6IChQb2ludClcclxuXHRcdHNoYWRvd0FuY2hvcjogKFBvaW50KVxyXG5cdFx0Y2xhc3NOYW1lOiAoU3RyaW5nKVxyXG5cdH0sXHJcblx0Ki9cclxuXHJcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHRcdEwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcclxuXHR9LFxyXG5cclxuXHRjcmVhdGVJY29uOiBmdW5jdGlvbiAob2xkSWNvbikge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2NyZWF0ZUljb24oJ2ljb24nLCBvbGRJY29uKTtcclxuXHR9LFxyXG5cclxuXHRjcmVhdGVTaGFkb3c6IGZ1bmN0aW9uIChvbGRJY29uKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fY3JlYXRlSWNvbignc2hhZG93Jywgb2xkSWNvbik7XHJcblx0fSxcclxuXHJcblx0X2NyZWF0ZUljb246IGZ1bmN0aW9uIChuYW1lLCBvbGRJY29uKSB7XHJcblx0XHR2YXIgc3JjID0gdGhpcy5fZ2V0SWNvblVybChuYW1lKTtcclxuXHJcblx0XHRpZiAoIXNyYykge1xyXG5cdFx0XHRpZiAobmFtZSA9PT0gJ2ljb24nKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdpY29uVXJsIG5vdCBzZXQgaW4gSWNvbiBvcHRpb25zIChzZWUgdGhlIGRvY3MpLicpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBpbWcgPSB0aGlzLl9jcmVhdGVJbWcoc3JjLCBvbGRJY29uICYmIG9sZEljb24udGFnTmFtZSA9PT0gJ0lNRycgPyBvbGRJY29uIDogbnVsbCk7XHJcblx0XHR0aGlzLl9zZXRJY29uU3R5bGVzKGltZywgbmFtZSk7XHJcblxyXG5cdFx0cmV0dXJuIGltZztcclxuXHR9LFxyXG5cclxuXHRfc2V0SWNvblN0eWxlczogZnVuY3Rpb24gKGltZywgbmFtZSkge1xyXG5cdFx0dmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMsXHJcblx0XHQgICAgc2l6ZSA9IEwucG9pbnQob3B0aW9uc1tuYW1lICsgJ1NpemUnXSksXHJcblx0XHQgICAgYW5jaG9yID0gTC5wb2ludChuYW1lID09PSAnc2hhZG93JyAmJiBvcHRpb25zLnNoYWRvd0FuY2hvciB8fCBvcHRpb25zLmljb25BbmNob3IgfHxcclxuXHRcdCAgICAgICAgICAgIHNpemUgJiYgc2l6ZS5kaXZpZGVCeSgyLCB0cnVlKSk7XHJcblxyXG5cdFx0aW1nLmNsYXNzTmFtZSA9ICdsZWFmbGV0LW1hcmtlci0nICsgbmFtZSArICcgJyArIChvcHRpb25zLmNsYXNzTmFtZSB8fCAnJyk7XHJcblxyXG5cdFx0aWYgKGFuY2hvcikge1xyXG5cdFx0XHRpbWcuc3R5bGUubWFyZ2luTGVmdCA9ICgtYW5jaG9yLngpICsgJ3B4JztcclxuXHRcdFx0aW1nLnN0eWxlLm1hcmdpblRvcCAgPSAoLWFuY2hvci55KSArICdweCc7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHNpemUpIHtcclxuXHRcdFx0aW1nLnN0eWxlLndpZHRoICA9IHNpemUueCArICdweCc7XHJcblx0XHRcdGltZy5zdHlsZS5oZWlnaHQgPSBzaXplLnkgKyAncHgnO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF9jcmVhdGVJbWc6IGZ1bmN0aW9uIChzcmMsIGVsKSB7XHJcblx0XHRlbCA9IGVsIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG5cdFx0ZWwuc3JjID0gc3JjO1xyXG5cdFx0cmV0dXJuIGVsO1xyXG5cdH0sXHJcblxyXG5cdF9nZXRJY29uVXJsOiBmdW5jdGlvbiAobmFtZSkge1xyXG5cdFx0cmV0dXJuIEwuQnJvd3Nlci5yZXRpbmEgJiYgdGhpcy5vcHRpb25zW25hbWUgKyAnUmV0aW5hVXJsJ10gfHwgdGhpcy5vcHRpb25zW25hbWUgKyAnVXJsJ107XHJcblx0fVxyXG59KTtcclxuXHJcbkwuaWNvbiA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcblx0cmV0dXJuIG5ldyBMLkljb24ob3B0aW9ucyk7XHJcbn07XHJcblxuXG5cbi8qXG4gKiBMLkljb24uRGVmYXVsdCBpcyB0aGUgYmx1ZSBtYXJrZXIgaWNvbiB1c2VkIGJ5IGRlZmF1bHQgaW4gTGVhZmxldC5cbiAqL1xuXG5MLkljb24uRGVmYXVsdCA9IEwuSWNvbi5leHRlbmQoe1xuXG5cdG9wdGlvbnM6IHtcblx0XHRpY29uU2l6ZTogICAgWzI1LCA0MV0sXG5cdFx0aWNvbkFuY2hvcjogIFsxMiwgNDFdLFxuXHRcdHBvcHVwQW5jaG9yOiBbMSwgLTM0XSxcblx0XHRzaGFkb3dTaXplOiAgWzQxLCA0MV1cblx0fSxcblxuXHRfZ2V0SWNvblVybDogZnVuY3Rpb24gKG5hbWUpIHtcblx0XHR2YXIga2V5ID0gbmFtZSArICdVcmwnO1xuXG5cdFx0aWYgKHRoaXMub3B0aW9uc1trZXldKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25zW2tleV07XG5cdFx0fVxuXG5cdFx0dmFyIHBhdGggPSBMLkljb24uRGVmYXVsdC5pbWFnZVBhdGg7XG5cblx0XHRpZiAoIXBhdGgpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignQ291bGRuXFwndCBhdXRvZGV0ZWN0IEwuSWNvbi5EZWZhdWx0LmltYWdlUGF0aCwgc2V0IGl0IG1hbnVhbGx5LicpO1xuXHRcdH1cblxuXHRcdHJldHVybiBwYXRoICsgJy9tYXJrZXItJyArIG5hbWUgKyAoTC5Ccm93c2VyLnJldGluYSAmJiBuYW1lID09PSAnaWNvbicgPyAnLTJ4JyA6ICcnKSArICcucG5nJztcblx0fVxufSk7XG5cbkwuSWNvbi5EZWZhdWx0LmltYWdlUGF0aCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpLFxuXHQgICAgbGVhZmxldFJlID0gL1tcXC9eXWxlYWZsZXRbXFwtXFwuX10/KFtcXHdcXC1cXC5fXSopXFwuanNcXD8/LztcblxuXHR2YXIgaSwgbGVuLCBzcmMsIHBhdGg7XG5cblx0Zm9yIChpID0gMCwgbGVuID0gc2NyaXB0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdHNyYyA9IHNjcmlwdHNbaV0uc3JjIHx8ICcnO1xuXG5cdFx0aWYgKHNyYy5tYXRjaChsZWFmbGV0UmUpKSB7XG5cdFx0XHRwYXRoID0gc3JjLnNwbGl0KGxlYWZsZXRSZSlbMF07XG5cdFx0XHRyZXR1cm4gKHBhdGggPyBwYXRoICsgJy8nIDogJycpICsgJ2ltYWdlcyc7XG5cdFx0fVxuXHR9XG59KCkpO1xuXG5cblxuLypcclxuICogTC5NYXJrZXIgaXMgdXNlZCB0byBkaXNwbGF5IGNsaWNrYWJsZS9kcmFnZ2FibGUgaWNvbnMgb24gdGhlIG1hcC5cclxuICovXHJcblxyXG5MLk1hcmtlciA9IEwuTGF5ZXIuZXh0ZW5kKHtcclxuXHJcblx0b3B0aW9uczoge1xyXG5cdFx0cGFuZTogJ21hcmtlclBhbmUnLFxyXG5cdFx0bm9uQnViYmxpbmdFdmVudHM6IFsnY2xpY2snLCAnZGJsY2xpY2snLCAnbW91c2VvdmVyJywgJ21vdXNlb3V0JywgJ2NvbnRleHRtZW51J10sXHJcblxyXG5cdFx0aWNvbjogbmV3IEwuSWNvbi5EZWZhdWx0KCksXHJcblx0XHQvLyB0aXRsZTogJycsXHJcblx0XHQvLyBhbHQ6ICcnLFxyXG5cdFx0aW50ZXJhY3RpdmU6IHRydWUsXHJcblx0XHQvLyBkcmFnZ2FibGU6IGZhbHNlLFxyXG5cdFx0a2V5Ym9hcmQ6IHRydWUsXHJcblx0XHR6SW5kZXhPZmZzZXQ6IDAsXHJcblx0XHRvcGFjaXR5OiAxLFxyXG5cdFx0Ly8gcmlzZU9uSG92ZXI6IGZhbHNlLFxyXG5cdFx0cmlzZU9mZnNldDogMjUwXHJcblx0fSxcclxuXHJcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKGxhdGxuZywgb3B0aW9ucykge1xyXG5cdFx0TC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xyXG5cdFx0dGhpcy5fbGF0bG5nID0gTC5sYXRMbmcobGF0bG5nKTtcclxuXHR9LFxyXG5cclxuXHRvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xyXG5cdFx0dGhpcy5fem9vbUFuaW1hdGVkID0gdGhpcy5fem9vbUFuaW1hdGVkICYmIG1hcC5vcHRpb25zLm1hcmtlclpvb21BbmltYXRpb247XHJcblxyXG5cdFx0dGhpcy5faW5pdEljb24oKTtcclxuXHRcdHRoaXMudXBkYXRlKCk7XHJcblx0fSxcclxuXHJcblx0b25SZW1vdmU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzLmRyYWdnaW5nICYmIHRoaXMuZHJhZ2dpbmcuZW5hYmxlZCgpKSB7XHJcblx0XHRcdHRoaXMub3B0aW9ucy5kcmFnZ2FibGUgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLmRyYWdnaW5nLnJlbW92ZUhvb2tzKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fcmVtb3ZlSWNvbigpO1xyXG5cdFx0dGhpcy5fcmVtb3ZlU2hhZG93KCk7XHJcblx0fSxcclxuXHJcblx0Z2V0RXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgZXZlbnRzID0ge1xyXG5cdFx0XHR6b29tOiB0aGlzLnVwZGF0ZSxcclxuXHRcdFx0dmlld3Jlc2V0OiB0aGlzLnVwZGF0ZVxyXG5cdFx0fTtcclxuXHJcblx0XHRpZiAodGhpcy5fem9vbUFuaW1hdGVkKSB7XHJcblx0XHRcdGV2ZW50cy56b29tYW5pbSA9IHRoaXMuX2FuaW1hdGVab29tO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBldmVudHM7XHJcblx0fSxcclxuXHJcblx0Z2V0TGF0TG5nOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fbGF0bG5nO1xyXG5cdH0sXHJcblxyXG5cdHNldExhdExuZzogZnVuY3Rpb24gKGxhdGxuZykge1xyXG5cdFx0dmFyIG9sZExhdExuZyA9IHRoaXMuX2xhdGxuZztcclxuXHRcdHRoaXMuX2xhdGxuZyA9IEwubGF0TG5nKGxhdGxuZyk7XHJcblx0XHR0aGlzLnVwZGF0ZSgpO1xyXG5cdFx0cmV0dXJuIHRoaXMuZmlyZSgnbW92ZScsIHtvbGRMYXRMbmc6IG9sZExhdExuZywgbGF0bG5nOiB0aGlzLl9sYXRsbmd9KTtcclxuXHR9LFxyXG5cclxuXHRzZXRaSW5kZXhPZmZzZXQ6IGZ1bmN0aW9uIChvZmZzZXQpIHtcclxuXHRcdHRoaXMub3B0aW9ucy56SW5kZXhPZmZzZXQgPSBvZmZzZXQ7XHJcblx0XHRyZXR1cm4gdGhpcy51cGRhdGUoKTtcclxuXHR9LFxyXG5cclxuXHRzZXRJY29uOiBmdW5jdGlvbiAoaWNvbikge1xyXG5cclxuXHRcdHRoaXMub3B0aW9ucy5pY29uID0gaWNvbjtcclxuXHJcblx0XHRpZiAodGhpcy5fbWFwKSB7XHJcblx0XHRcdHRoaXMuX2luaXRJY29uKCk7XHJcblx0XHRcdHRoaXMudXBkYXRlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuX3BvcHVwKSB7XHJcblx0XHRcdHRoaXMuYmluZFBvcHVwKHRoaXMuX3BvcHVwLCB0aGlzLl9wb3B1cC5vcHRpb25zKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRnZXRFbGVtZW50OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5faWNvbjtcclxuXHR9LFxyXG5cclxuXHR1cGRhdGU6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRpZiAodGhpcy5faWNvbikge1xyXG5cdFx0XHR2YXIgcG9zID0gdGhpcy5fbWFwLmxhdExuZ1RvTGF5ZXJQb2ludCh0aGlzLl9sYXRsbmcpLnJvdW5kKCk7XHJcblx0XHRcdHRoaXMuX3NldFBvcyhwb3MpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdF9pbml0SWNvbjogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMsXHJcblx0XHQgICAgY2xhc3NUb0FkZCA9ICdsZWFmbGV0LXpvb20tJyArICh0aGlzLl96b29tQW5pbWF0ZWQgPyAnYW5pbWF0ZWQnIDogJ2hpZGUnKTtcclxuXHJcblx0XHR2YXIgaWNvbiA9IG9wdGlvbnMuaWNvbi5jcmVhdGVJY29uKHRoaXMuX2ljb24pLFxyXG5cdFx0ICAgIGFkZEljb24gPSBmYWxzZTtcclxuXHJcblx0XHQvLyBpZiB3ZSdyZSBub3QgcmV1c2luZyB0aGUgaWNvbiwgcmVtb3ZlIHRoZSBvbGQgb25lIGFuZCBpbml0IG5ldyBvbmVcclxuXHRcdGlmIChpY29uICE9PSB0aGlzLl9pY29uKSB7XHJcblx0XHRcdGlmICh0aGlzLl9pY29uKSB7XHJcblx0XHRcdFx0dGhpcy5fcmVtb3ZlSWNvbigpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGFkZEljb24gPSB0cnVlO1xyXG5cclxuXHRcdFx0aWYgKG9wdGlvbnMudGl0bGUpIHtcclxuXHRcdFx0XHRpY29uLnRpdGxlID0gb3B0aW9ucy50aXRsZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAob3B0aW9ucy5hbHQpIHtcclxuXHRcdFx0XHRpY29uLmFsdCA9IG9wdGlvbnMuYWx0O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0TC5Eb21VdGlsLmFkZENsYXNzKGljb24sIGNsYXNzVG9BZGQpO1xyXG5cclxuXHRcdGlmIChvcHRpb25zLmtleWJvYXJkKSB7XHJcblx0XHRcdGljb24udGFiSW5kZXggPSAnMCc7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5faWNvbiA9IGljb247XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMucmlzZU9uSG92ZXIpIHtcclxuXHRcdFx0dGhpcy5vbih7XHJcblx0XHRcdFx0bW91c2VvdmVyOiB0aGlzLl9icmluZ1RvRnJvbnQsXHJcblx0XHRcdFx0bW91c2VvdXQ6IHRoaXMuX3Jlc2V0WkluZGV4XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBuZXdTaGFkb3cgPSBvcHRpb25zLmljb24uY3JlYXRlU2hhZG93KHRoaXMuX3NoYWRvdyksXHJcblx0XHQgICAgYWRkU2hhZG93ID0gZmFsc2U7XHJcblxyXG5cdFx0aWYgKG5ld1NoYWRvdyAhPT0gdGhpcy5fc2hhZG93KSB7XHJcblx0XHRcdHRoaXMuX3JlbW92ZVNoYWRvdygpO1xyXG5cdFx0XHRhZGRTaGFkb3cgPSB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChuZXdTaGFkb3cpIHtcclxuXHRcdFx0TC5Eb21VdGlsLmFkZENsYXNzKG5ld1NoYWRvdywgY2xhc3NUb0FkZCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLl9zaGFkb3cgPSBuZXdTaGFkb3c7XHJcblxyXG5cclxuXHRcdGlmIChvcHRpb25zLm9wYWNpdHkgPCAxKSB7XHJcblx0XHRcdHRoaXMuX3VwZGF0ZU9wYWNpdHkoKTtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0aWYgKGFkZEljb24pIHtcclxuXHRcdFx0dGhpcy5nZXRQYW5lKCkuYXBwZW5kQ2hpbGQodGhpcy5faWNvbik7XHJcblx0XHRcdHRoaXMuX2luaXRJbnRlcmFjdGlvbigpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKG5ld1NoYWRvdyAmJiBhZGRTaGFkb3cpIHtcclxuXHRcdFx0dGhpcy5nZXRQYW5lKCdzaGFkb3dQYW5lJykuYXBwZW5kQ2hpbGQodGhpcy5fc2hhZG93KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfcmVtb3ZlSWNvbjogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5yaXNlT25Ib3Zlcikge1xyXG5cdFx0XHR0aGlzLm9mZih7XHJcblx0XHRcdFx0bW91c2VvdmVyOiB0aGlzLl9icmluZ1RvRnJvbnQsXHJcblx0XHRcdFx0bW91c2VvdXQ6IHRoaXMuX3Jlc2V0WkluZGV4XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdEwuRG9tVXRpbC5yZW1vdmUodGhpcy5faWNvbik7XHJcblx0XHR0aGlzLnJlbW92ZUludGVyYWN0aXZlVGFyZ2V0KHRoaXMuX2ljb24pO1xyXG5cclxuXHRcdHRoaXMuX2ljb24gPSBudWxsO1xyXG5cdH0sXHJcblxyXG5cdF9yZW1vdmVTaGFkb3c6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzLl9zaGFkb3cpIHtcclxuXHRcdFx0TC5Eb21VdGlsLnJlbW92ZSh0aGlzLl9zaGFkb3cpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5fc2hhZG93ID0gbnVsbDtcclxuXHR9LFxyXG5cclxuXHRfc2V0UG9zOiBmdW5jdGlvbiAocG9zKSB7XHJcblx0XHRMLkRvbVV0aWwuc2V0UG9zaXRpb24odGhpcy5faWNvbiwgcG9zKTtcclxuXHJcblx0XHRpZiAodGhpcy5fc2hhZG93KSB7XHJcblx0XHRcdEwuRG9tVXRpbC5zZXRQb3NpdGlvbih0aGlzLl9zaGFkb3csIHBvcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fekluZGV4ID0gcG9zLnkgKyB0aGlzLm9wdGlvbnMuekluZGV4T2Zmc2V0O1xyXG5cclxuXHRcdHRoaXMuX3Jlc2V0WkluZGV4KCk7XHJcblx0fSxcclxuXHJcblx0X3VwZGF0ZVpJbmRleDogZnVuY3Rpb24gKG9mZnNldCkge1xyXG5cdFx0dGhpcy5faWNvbi5zdHlsZS56SW5kZXggPSB0aGlzLl96SW5kZXggKyBvZmZzZXQ7XHJcblx0fSxcclxuXHJcblx0X2FuaW1hdGVab29tOiBmdW5jdGlvbiAob3B0KSB7XHJcblx0XHR2YXIgcG9zID0gdGhpcy5fbWFwLl9sYXRMbmdUb05ld0xheWVyUG9pbnQodGhpcy5fbGF0bG5nLCBvcHQuem9vbSwgb3B0LmNlbnRlcikucm91bmQoKTtcclxuXHJcblx0XHR0aGlzLl9zZXRQb3MocG9zKTtcclxuXHR9LFxyXG5cclxuXHRfaW5pdEludGVyYWN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0aWYgKCF0aGlzLm9wdGlvbnMuaW50ZXJhY3RpdmUpIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0TC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX2ljb24sICdsZWFmbGV0LWludGVyYWN0aXZlJyk7XHJcblxyXG5cdFx0dGhpcy5hZGRJbnRlcmFjdGl2ZVRhcmdldCh0aGlzLl9pY29uKTtcclxuXHJcblx0XHRpZiAoTC5IYW5kbGVyLk1hcmtlckRyYWcpIHtcclxuXHRcdFx0dmFyIGRyYWdnYWJsZSA9IHRoaXMub3B0aW9ucy5kcmFnZ2FibGU7XHJcblx0XHRcdGlmICh0aGlzLmRyYWdnaW5nKSB7XHJcblx0XHRcdFx0ZHJhZ2dhYmxlID0gdGhpcy5kcmFnZ2luZy5lbmFibGVkKCk7XHJcblx0XHRcdFx0dGhpcy5kcmFnZ2luZy5kaXNhYmxlKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuZHJhZ2dpbmcgPSBuZXcgTC5IYW5kbGVyLk1hcmtlckRyYWcodGhpcyk7XHJcblxyXG5cdFx0XHRpZiAoZHJhZ2dhYmxlKSB7XHJcblx0XHRcdFx0dGhpcy5kcmFnZ2luZy5lbmFibGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdHNldE9wYWNpdHk6IGZ1bmN0aW9uIChvcGFjaXR5KSB7XHJcblx0XHR0aGlzLm9wdGlvbnMub3BhY2l0eSA9IG9wYWNpdHk7XHJcblx0XHRpZiAodGhpcy5fbWFwKSB7XHJcblx0XHRcdHRoaXMuX3VwZGF0ZU9wYWNpdHkoKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRfdXBkYXRlT3BhY2l0eTogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIG9wYWNpdHkgPSB0aGlzLm9wdGlvbnMub3BhY2l0eTtcclxuXHJcblx0XHRMLkRvbVV0aWwuc2V0T3BhY2l0eSh0aGlzLl9pY29uLCBvcGFjaXR5KTtcclxuXHJcblx0XHRpZiAodGhpcy5fc2hhZG93KSB7XHJcblx0XHRcdEwuRG9tVXRpbC5zZXRPcGFjaXR5KHRoaXMuX3NoYWRvdywgb3BhY2l0eSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X2JyaW5nVG9Gcm9udDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy5fdXBkYXRlWkluZGV4KHRoaXMub3B0aW9ucy5yaXNlT2Zmc2V0KTtcclxuXHR9LFxyXG5cclxuXHRfcmVzZXRaSW5kZXg6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMuX3VwZGF0ZVpJbmRleCgwKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuTC5tYXJrZXIgPSBmdW5jdGlvbiAobGF0bG5nLCBvcHRpb25zKSB7XHJcblx0cmV0dXJuIG5ldyBMLk1hcmtlcihsYXRsbmcsIG9wdGlvbnMpO1xyXG59O1xyXG5cblxuXG4vKlxuICogTC5EaXZJY29uIGlzIGEgbGlnaHR3ZWlnaHQgSFRNTC1iYXNlZCBpY29uIGNsYXNzIChhcyBvcHBvc2VkIHRvIHRoZSBpbWFnZS1iYXNlZCBMLkljb24pXG4gKiB0byB1c2Ugd2l0aCBMLk1hcmtlci5cbiAqL1xuXG5MLkRpdkljb24gPSBMLkljb24uZXh0ZW5kKHtcblx0b3B0aW9uczoge1xuXHRcdGljb25TaXplOiBbMTIsIDEyXSwgLy8gYWxzbyBjYW4gYmUgc2V0IHRocm91Z2ggQ1NTXG5cdFx0Lypcblx0XHRpY29uQW5jaG9yOiAoUG9pbnQpXG5cdFx0cG9wdXBBbmNob3I6IChQb2ludClcblx0XHRodG1sOiAoU3RyaW5nKVxuXHRcdGJnUG9zOiAoUG9pbnQpXG5cdFx0Ki9cblx0XHRjbGFzc05hbWU6ICdsZWFmbGV0LWRpdi1pY29uJyxcblx0XHRodG1sOiBmYWxzZVxuXHR9LFxuXG5cdGNyZWF0ZUljb246IGZ1bmN0aW9uIChvbGRJY29uKSB7XG5cdFx0dmFyIGRpdiA9IChvbGRJY29uICYmIG9sZEljb24udGFnTmFtZSA9PT0gJ0RJVicpID8gb2xkSWNvbiA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuXHRcdCAgICBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXG5cdFx0ZGl2LmlubmVySFRNTCA9IG9wdGlvbnMuaHRtbCAhPT0gZmFsc2UgPyBvcHRpb25zLmh0bWwgOiAnJztcblxuXHRcdGlmIChvcHRpb25zLmJnUG9zKSB7XG5cdFx0XHRkaXYuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gKC1vcHRpb25zLmJnUG9zLngpICsgJ3B4ICcgKyAoLW9wdGlvbnMuYmdQb3MueSkgKyAncHgnO1xuXHRcdH1cblx0XHR0aGlzLl9zZXRJY29uU3R5bGVzKGRpdiwgJ2ljb24nKTtcblxuXHRcdHJldHVybiBkaXY7XG5cdH0sXG5cblx0Y3JlYXRlU2hhZG93OiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cbn0pO1xuXG5MLmRpdkljb24gPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXHRyZXR1cm4gbmV3IEwuRGl2SWNvbihvcHRpb25zKTtcbn07XG5cblxuXG4vKlxyXG4gKiBMLlBvcHVwIGlzIHVzZWQgZm9yIGRpc3BsYXlpbmcgcG9wdXBzIG9uIHRoZSBtYXAuXHJcbiAqL1xyXG5cclxuTC5NYXAubWVyZ2VPcHRpb25zKHtcclxuXHRjbG9zZVBvcHVwT25DbGljazogdHJ1ZVxyXG59KTtcclxuXHJcbkwuUG9wdXAgPSBMLkxheWVyLmV4dGVuZCh7XHJcblxyXG5cdG9wdGlvbnM6IHtcclxuXHRcdHBhbmU6ICdwb3B1cFBhbmUnLFxyXG5cclxuXHRcdG1pbldpZHRoOiA1MCxcclxuXHRcdG1heFdpZHRoOiAzMDAsXHJcblx0XHQvLyBtYXhIZWlnaHQ6IDxOdW1iZXI+LFxyXG5cdFx0b2Zmc2V0OiBbMCwgN10sXHJcblxyXG5cdFx0YXV0b1BhbjogdHJ1ZSxcclxuXHRcdGF1dG9QYW5QYWRkaW5nOiBbNSwgNV0sXHJcblx0XHQvLyBhdXRvUGFuUGFkZGluZ1RvcExlZnQ6IDxQb2ludD4sXHJcblx0XHQvLyBhdXRvUGFuUGFkZGluZ0JvdHRvbVJpZ2h0OiA8UG9pbnQ+LFxyXG5cclxuXHRcdGNsb3NlQnV0dG9uOiB0cnVlLFxyXG5cdFx0YXV0b0Nsb3NlOiB0cnVlLFxyXG5cdFx0Ly8ga2VlcEluVmlldzogZmFsc2UsXHJcblx0XHQvLyBjbGFzc05hbWU6ICcnLFxyXG5cdFx0em9vbUFuaW1hdGlvbjogdHJ1ZVxyXG5cdH0sXHJcblxyXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zLCBzb3VyY2UpIHtcclxuXHRcdEwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcclxuXHJcblx0XHR0aGlzLl9zb3VyY2UgPSBzb3VyY2U7XHJcblx0fSxcclxuXHJcblx0b25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcclxuXHRcdHRoaXMuX3pvb21BbmltYXRlZCA9IHRoaXMuX3pvb21BbmltYXRlZCAmJiB0aGlzLm9wdGlvbnMuem9vbUFuaW1hdGlvbjtcclxuXHJcblx0XHRpZiAoIXRoaXMuX2NvbnRhaW5lcikge1xyXG5cdFx0XHR0aGlzLl9pbml0TGF5b3V0KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG1hcC5fZmFkZUFuaW1hdGVkKSB7XHJcblx0XHRcdEwuRG9tVXRpbC5zZXRPcGFjaXR5KHRoaXMuX2NvbnRhaW5lciwgMCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2xlYXJUaW1lb3V0KHRoaXMuX3JlbW92ZVRpbWVvdXQpO1xyXG5cdFx0dGhpcy5nZXRQYW5lKCkuYXBwZW5kQ2hpbGQodGhpcy5fY29udGFpbmVyKTtcclxuXHRcdHRoaXMudXBkYXRlKCk7XHJcblxyXG5cdFx0aWYgKG1hcC5fZmFkZUFuaW1hdGVkKSB7XHJcblx0XHRcdEwuRG9tVXRpbC5zZXRPcGFjaXR5KHRoaXMuX2NvbnRhaW5lciwgMSk7XHJcblx0XHR9XHJcblxyXG5cdFx0bWFwLmZpcmUoJ3BvcHVwb3BlbicsIHtwb3B1cDogdGhpc30pO1xyXG5cclxuXHRcdGlmICh0aGlzLl9zb3VyY2UpIHtcclxuXHRcdFx0dGhpcy5fc291cmNlLmZpcmUoJ3BvcHVwb3BlbicsIHtwb3B1cDogdGhpc30sIHRydWUpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdG9wZW5PbjogZnVuY3Rpb24gKG1hcCkge1xyXG5cdFx0bWFwLm9wZW5Qb3B1cCh0aGlzKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdG9uUmVtb3ZlOiBmdW5jdGlvbiAobWFwKSB7XHJcblx0XHRpZiAobWFwLl9mYWRlQW5pbWF0ZWQpIHtcclxuXHRcdFx0TC5Eb21VdGlsLnNldE9wYWNpdHkodGhpcy5fY29udGFpbmVyLCAwKTtcclxuXHRcdFx0dGhpcy5fcmVtb3ZlVGltZW91dCA9IHNldFRpbWVvdXQoTC5iaW5kKEwuRG9tVXRpbC5yZW1vdmUsIEwuRG9tVXRpbCwgdGhpcy5fY29udGFpbmVyKSwgMjAwKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdEwuRG9tVXRpbC5yZW1vdmUodGhpcy5fY29udGFpbmVyKTtcclxuXHRcdH1cclxuXHJcblx0XHRtYXAuZmlyZSgncG9wdXBjbG9zZScsIHtwb3B1cDogdGhpc30pO1xyXG5cclxuXHRcdGlmICh0aGlzLl9zb3VyY2UpIHtcclxuXHRcdFx0dGhpcy5fc291cmNlLmZpcmUoJ3BvcHVwY2xvc2UnLCB7cG9wdXA6IHRoaXN9LCB0cnVlKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRnZXRMYXRMbmc6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLl9sYXRsbmc7XHJcblx0fSxcclxuXHJcblx0c2V0TGF0TG5nOiBmdW5jdGlvbiAobGF0bG5nKSB7XHJcblx0XHR0aGlzLl9sYXRsbmcgPSBMLmxhdExuZyhsYXRsbmcpO1xyXG5cdFx0aWYgKHRoaXMuX21hcCkge1xyXG5cdFx0XHR0aGlzLl91cGRhdGVQb3NpdGlvbigpO1xyXG5cdFx0XHR0aGlzLl9hZGp1c3RQYW4oKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdGdldENvbnRlbnQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLl9jb250ZW50O1xyXG5cdH0sXHJcblxyXG5cdHNldENvbnRlbnQ6IGZ1bmN0aW9uIChjb250ZW50KSB7XHJcblx0XHR0aGlzLl9jb250ZW50ID0gY29udGVudDtcclxuXHRcdHRoaXMudXBkYXRlKCk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRnZXRFbGVtZW50OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fY29udGFpbmVyO1xyXG5cdH0sXHJcblxyXG5cdHVwZGF0ZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKCF0aGlzLl9tYXApIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0dGhpcy5fY29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcclxuXHJcblx0XHR0aGlzLl91cGRhdGVDb250ZW50KCk7XHJcblx0XHR0aGlzLl91cGRhdGVMYXlvdXQoKTtcclxuXHRcdHRoaXMuX3VwZGF0ZVBvc2l0aW9uKCk7XHJcblxyXG5cdFx0dGhpcy5fY29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSAnJztcclxuXHJcblx0XHR0aGlzLl9hZGp1c3RQYW4oKTtcclxuXHR9LFxyXG5cclxuXHRnZXRFdmVudHM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBldmVudHMgPSB7XHJcblx0XHRcdHpvb206IHRoaXMuX3VwZGF0ZVBvc2l0aW9uLFxyXG5cdFx0XHR2aWV3cmVzZXQ6IHRoaXMuX3VwZGF0ZVBvc2l0aW9uXHJcblx0XHR9O1xyXG5cclxuXHRcdGlmICh0aGlzLl96b29tQW5pbWF0ZWQpIHtcclxuXHRcdFx0ZXZlbnRzLnpvb21hbmltID0gdGhpcy5fYW5pbWF0ZVpvb207XHJcblx0XHR9XHJcblx0XHRpZiAoJ2Nsb3NlT25DbGljaycgaW4gdGhpcy5vcHRpb25zID8gdGhpcy5vcHRpb25zLmNsb3NlT25DbGljayA6IHRoaXMuX21hcC5vcHRpb25zLmNsb3NlUG9wdXBPbkNsaWNrKSB7XHJcblx0XHRcdGV2ZW50cy5wcmVjbGljayA9IHRoaXMuX2Nsb3NlO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5rZWVwSW5WaWV3KSB7XHJcblx0XHRcdGV2ZW50cy5tb3ZlZW5kID0gdGhpcy5fYWRqdXN0UGFuO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGV2ZW50cztcclxuXHR9LFxyXG5cclxuXHRpc09wZW46IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiAhIXRoaXMuX21hcCAmJiB0aGlzLl9tYXAuaGFzTGF5ZXIodGhpcyk7XHJcblx0fSxcclxuXHJcblx0YnJpbmdUb0Zyb250OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAodGhpcy5fbWFwKSB7XHJcblx0XHRcdEwuRG9tVXRpbC50b0Zyb250KHRoaXMuX2NvbnRhaW5lcik7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRicmluZ1RvQmFjazogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuX21hcCkge1xyXG5cdFx0XHRMLkRvbVV0aWwudG9CYWNrKHRoaXMuX2NvbnRhaW5lcik7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRfY2xvc2U6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzLl9tYXApIHtcclxuXHRcdFx0dGhpcy5fbWFwLmNsb3NlUG9wdXAodGhpcyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X2luaXRMYXlvdXQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBwcmVmaXggPSAnbGVhZmxldC1wb3B1cCcsXHJcblx0XHQgICAgY29udGFpbmVyID0gdGhpcy5fY29udGFpbmVyID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JyxcclxuXHRcdFx0cHJlZml4ICsgJyAnICsgKHRoaXMub3B0aW9ucy5jbGFzc05hbWUgfHwgJycpICtcclxuXHRcdFx0JyBsZWFmbGV0LXpvb20tJyArICh0aGlzLl96b29tQW5pbWF0ZWQgPyAnYW5pbWF0ZWQnIDogJ2hpZGUnKSk7XHJcblxyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5jbG9zZUJ1dHRvbikge1xyXG5cdFx0XHR2YXIgY2xvc2VCdXR0b24gPSB0aGlzLl9jbG9zZUJ1dHRvbiA9IEwuRG9tVXRpbC5jcmVhdGUoJ2EnLCBwcmVmaXggKyAnLWNsb3NlLWJ1dHRvbicsIGNvbnRhaW5lcik7XHJcblx0XHRcdGNsb3NlQnV0dG9uLmhyZWYgPSAnI2Nsb3NlJztcclxuXHRcdFx0Y2xvc2VCdXR0b24uaW5uZXJIVE1MID0gJyYjMjE1Oyc7XHJcblxyXG5cdFx0XHRMLkRvbUV2ZW50Lm9uKGNsb3NlQnV0dG9uLCAnY2xpY2snLCB0aGlzLl9vbkNsb3NlQnV0dG9uQ2xpY2ssIHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciB3cmFwcGVyID0gdGhpcy5fd3JhcHBlciA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsIHByZWZpeCArICctY29udGVudC13cmFwcGVyJywgY29udGFpbmVyKTtcclxuXHRcdHRoaXMuX2NvbnRlbnROb2RlID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgcHJlZml4ICsgJy1jb250ZW50Jywgd3JhcHBlcik7XHJcblxyXG5cdFx0TC5Eb21FdmVudFxyXG5cdFx0XHQuZGlzYWJsZUNsaWNrUHJvcGFnYXRpb24od3JhcHBlcilcclxuXHRcdFx0LmRpc2FibGVTY3JvbGxQcm9wYWdhdGlvbih0aGlzLl9jb250ZW50Tm9kZSlcclxuXHRcdFx0Lm9uKHdyYXBwZXIsICdjb250ZXh0bWVudScsIEwuRG9tRXZlbnQuc3RvcFByb3BhZ2F0aW9uKTtcclxuXHJcblx0XHR0aGlzLl90aXBDb250YWluZXIgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCBwcmVmaXggKyAnLXRpcC1jb250YWluZXInLCBjb250YWluZXIpO1xyXG5cdFx0dGhpcy5fdGlwID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgcHJlZml4ICsgJy10aXAnLCB0aGlzLl90aXBDb250YWluZXIpO1xyXG5cdH0sXHJcblxyXG5cdF91cGRhdGVDb250ZW50OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoIXRoaXMuX2NvbnRlbnQpIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0dmFyIG5vZGUgPSB0aGlzLl9jb250ZW50Tm9kZTtcclxuXHRcdHZhciBjb250ZW50ID0gKHR5cGVvZiB0aGlzLl9jb250ZW50ID09PSAnZnVuY3Rpb24nKSA/IHRoaXMuX2NvbnRlbnQodGhpcy5fc291cmNlIHx8IHRoaXMpIDogdGhpcy5fY29udGVudDtcclxuXHJcblx0XHRpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdG5vZGUuaW5uZXJIVE1MID0gY29udGVudDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHdoaWxlIChub2RlLmhhc0NoaWxkTm9kZXMoKSkge1xyXG5cdFx0XHRcdG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5maXJzdENoaWxkKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRub2RlLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5maXJlKCdjb250ZW50dXBkYXRlJyk7XHJcblx0fSxcclxuXHJcblx0X3VwZGF0ZUxheW91dDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGNvbnRhaW5lciA9IHRoaXMuX2NvbnRlbnROb2RlLFxyXG5cdFx0ICAgIHN0eWxlID0gY29udGFpbmVyLnN0eWxlO1xyXG5cclxuXHRcdHN0eWxlLndpZHRoID0gJyc7XHJcblx0XHRzdHlsZS53aGl0ZVNwYWNlID0gJ25vd3JhcCc7XHJcblxyXG5cdFx0dmFyIHdpZHRoID0gY29udGFpbmVyLm9mZnNldFdpZHRoO1xyXG5cdFx0d2lkdGggPSBNYXRoLm1pbih3aWR0aCwgdGhpcy5vcHRpb25zLm1heFdpZHRoKTtcclxuXHRcdHdpZHRoID0gTWF0aC5tYXgod2lkdGgsIHRoaXMub3B0aW9ucy5taW5XaWR0aCk7XHJcblxyXG5cdFx0c3R5bGUud2lkdGggPSAod2lkdGggKyAxKSArICdweCc7XHJcblx0XHRzdHlsZS53aGl0ZVNwYWNlID0gJyc7XHJcblxyXG5cdFx0c3R5bGUuaGVpZ2h0ID0gJyc7XHJcblxyXG5cdFx0dmFyIGhlaWdodCA9IGNvbnRhaW5lci5vZmZzZXRIZWlnaHQsXHJcblx0XHQgICAgbWF4SGVpZ2h0ID0gdGhpcy5vcHRpb25zLm1heEhlaWdodCxcclxuXHRcdCAgICBzY3JvbGxlZENsYXNzID0gJ2xlYWZsZXQtcG9wdXAtc2Nyb2xsZWQnO1xyXG5cclxuXHRcdGlmIChtYXhIZWlnaHQgJiYgaGVpZ2h0ID4gbWF4SGVpZ2h0KSB7XHJcblx0XHRcdHN0eWxlLmhlaWdodCA9IG1heEhlaWdodCArICdweCc7XHJcblx0XHRcdEwuRG9tVXRpbC5hZGRDbGFzcyhjb250YWluZXIsIHNjcm9sbGVkQ2xhc3MpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0TC5Eb21VdGlsLnJlbW92ZUNsYXNzKGNvbnRhaW5lciwgc2Nyb2xsZWRDbGFzcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fY29udGFpbmVyV2lkdGggPSB0aGlzLl9jb250YWluZXIub2Zmc2V0V2lkdGg7XHJcblx0fSxcclxuXHJcblx0X3VwZGF0ZVBvc2l0aW9uOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoIXRoaXMuX21hcCkgeyByZXR1cm47IH1cclxuXHJcblx0XHR2YXIgcG9zID0gdGhpcy5fbWFwLmxhdExuZ1RvTGF5ZXJQb2ludCh0aGlzLl9sYXRsbmcpLFxyXG5cdFx0ICAgIG9mZnNldCA9IEwucG9pbnQodGhpcy5vcHRpb25zLm9mZnNldCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3pvb21BbmltYXRlZCkge1xyXG5cdFx0XHRMLkRvbVV0aWwuc2V0UG9zaXRpb24odGhpcy5fY29udGFpbmVyLCBwb3MpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0b2Zmc2V0ID0gb2Zmc2V0LmFkZChwb3MpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBib3R0b20gPSB0aGlzLl9jb250YWluZXJCb3R0b20gPSAtb2Zmc2V0LnksXHJcblx0XHQgICAgbGVmdCA9IHRoaXMuX2NvbnRhaW5lckxlZnQgPSAtTWF0aC5yb3VuZCh0aGlzLl9jb250YWluZXJXaWR0aCAvIDIpICsgb2Zmc2V0Lng7XHJcblxyXG5cdFx0Ly8gYm90dG9tIHBvc2l0aW9uIHRoZSBwb3B1cCBpbiBjYXNlIHRoZSBoZWlnaHQgb2YgdGhlIHBvcHVwIGNoYW5nZXMgKGltYWdlcyBsb2FkaW5nIGV0YylcclxuXHRcdHRoaXMuX2NvbnRhaW5lci5zdHlsZS5ib3R0b20gPSBib3R0b20gKyAncHgnO1xyXG5cdFx0dGhpcy5fY29udGFpbmVyLnN0eWxlLmxlZnQgPSBsZWZ0ICsgJ3B4JztcclxuXHR9LFxyXG5cclxuXHRfYW5pbWF0ZVpvb206IGZ1bmN0aW9uIChlKSB7XHJcblx0XHR2YXIgcG9zID0gdGhpcy5fbWFwLl9sYXRMbmdUb05ld0xheWVyUG9pbnQodGhpcy5fbGF0bG5nLCBlLnpvb20sIGUuY2VudGVyKTtcclxuXHRcdEwuRG9tVXRpbC5zZXRQb3NpdGlvbih0aGlzLl9jb250YWluZXIsIHBvcyk7XHJcblx0fSxcclxuXHJcblx0X2FkanVzdFBhbjogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKCF0aGlzLm9wdGlvbnMuYXV0b1BhbiB8fCAodGhpcy5fbWFwLl9wYW5BbmltICYmIHRoaXMuX21hcC5fcGFuQW5pbS5faW5Qcm9ncmVzcykpIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0dmFyIG1hcCA9IHRoaXMuX21hcCxcclxuXHRcdCAgICBjb250YWluZXJIZWlnaHQgPSB0aGlzLl9jb250YWluZXIub2Zmc2V0SGVpZ2h0LFxyXG5cdFx0ICAgIGNvbnRhaW5lcldpZHRoID0gdGhpcy5fY29udGFpbmVyV2lkdGgsXHJcblx0XHQgICAgbGF5ZXJQb3MgPSBuZXcgTC5Qb2ludCh0aGlzLl9jb250YWluZXJMZWZ0LCAtY29udGFpbmVySGVpZ2h0IC0gdGhpcy5fY29udGFpbmVyQm90dG9tKTtcclxuXHJcblx0XHRpZiAodGhpcy5fem9vbUFuaW1hdGVkKSB7XHJcblx0XHRcdGxheWVyUG9zLl9hZGQoTC5Eb21VdGlsLmdldFBvc2l0aW9uKHRoaXMuX2NvbnRhaW5lcikpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBjb250YWluZXJQb3MgPSBtYXAubGF5ZXJQb2ludFRvQ29udGFpbmVyUG9pbnQobGF5ZXJQb3MpLFxyXG5cdFx0ICAgIHBhZGRpbmcgPSBMLnBvaW50KHRoaXMub3B0aW9ucy5hdXRvUGFuUGFkZGluZyksXHJcblx0XHQgICAgcGFkZGluZ1RMID0gTC5wb2ludCh0aGlzLm9wdGlvbnMuYXV0b1BhblBhZGRpbmdUb3BMZWZ0IHx8IHBhZGRpbmcpLFxyXG5cdFx0ICAgIHBhZGRpbmdCUiA9IEwucG9pbnQodGhpcy5vcHRpb25zLmF1dG9QYW5QYWRkaW5nQm90dG9tUmlnaHQgfHwgcGFkZGluZyksXHJcblx0XHQgICAgc2l6ZSA9IG1hcC5nZXRTaXplKCksXHJcblx0XHQgICAgZHggPSAwLFxyXG5cdFx0ICAgIGR5ID0gMDtcclxuXHJcblx0XHRpZiAoY29udGFpbmVyUG9zLnggKyBjb250YWluZXJXaWR0aCArIHBhZGRpbmdCUi54ID4gc2l6ZS54KSB7IC8vIHJpZ2h0XHJcblx0XHRcdGR4ID0gY29udGFpbmVyUG9zLnggKyBjb250YWluZXJXaWR0aCAtIHNpemUueCArIHBhZGRpbmdCUi54O1xyXG5cdFx0fVxyXG5cdFx0aWYgKGNvbnRhaW5lclBvcy54IC0gZHggLSBwYWRkaW5nVEwueCA8IDApIHsgLy8gbGVmdFxyXG5cdFx0XHRkeCA9IGNvbnRhaW5lclBvcy54IC0gcGFkZGluZ1RMLng7XHJcblx0XHR9XHJcblx0XHRpZiAoY29udGFpbmVyUG9zLnkgKyBjb250YWluZXJIZWlnaHQgKyBwYWRkaW5nQlIueSA+IHNpemUueSkgeyAvLyBib3R0b21cclxuXHRcdFx0ZHkgPSBjb250YWluZXJQb3MueSArIGNvbnRhaW5lckhlaWdodCAtIHNpemUueSArIHBhZGRpbmdCUi55O1xyXG5cdFx0fVxyXG5cdFx0aWYgKGNvbnRhaW5lclBvcy55IC0gZHkgLSBwYWRkaW5nVEwueSA8IDApIHsgLy8gdG9wXHJcblx0XHRcdGR5ID0gY29udGFpbmVyUG9zLnkgLSBwYWRkaW5nVEwueTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZHggfHwgZHkpIHtcclxuXHRcdFx0bWFwXHJcblx0XHRcdCAgICAuZmlyZSgnYXV0b3BhbnN0YXJ0JylcclxuXHRcdFx0ICAgIC5wYW5CeShbZHgsIGR5XSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X29uQ2xvc2VCdXR0b25DbGljazogZnVuY3Rpb24gKGUpIHtcclxuXHRcdHRoaXMuX2Nsb3NlKCk7XHJcblx0XHRMLkRvbUV2ZW50LnN0b3AoZSk7XHJcblx0fVxyXG59KTtcclxuXHJcbkwucG9wdXAgPSBmdW5jdGlvbiAob3B0aW9ucywgc291cmNlKSB7XHJcblx0cmV0dXJuIG5ldyBMLlBvcHVwKG9wdGlvbnMsIHNvdXJjZSk7XHJcbn07XHJcblxyXG5cclxuTC5NYXAuaW5jbHVkZSh7XHJcblx0b3BlblBvcHVwOiBmdW5jdGlvbiAocG9wdXAsIGxhdGxuZywgb3B0aW9ucykgeyAvLyAoUG9wdXApIG9yIChTdHJpbmcgfHwgSFRNTEVsZW1lbnQsIExhdExuZ1ssIE9iamVjdF0pXHJcblx0XHRpZiAoIShwb3B1cCBpbnN0YW5jZW9mIEwuUG9wdXApKSB7XHJcblx0XHRcdHBvcHVwID0gbmV3IEwuUG9wdXAob3B0aW9ucykuc2V0Q29udGVudChwb3B1cCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGxhdGxuZykge1xyXG5cdFx0XHRwb3B1cC5zZXRMYXRMbmcobGF0bG5nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5oYXNMYXllcihwb3B1cCkpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuX3BvcHVwICYmIHRoaXMuX3BvcHVwLm9wdGlvbnMuYXV0b0Nsb3NlKSB7XHJcblx0XHRcdHRoaXMuY2xvc2VQb3B1cCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX3BvcHVwID0gcG9wdXA7XHJcblx0XHRyZXR1cm4gdGhpcy5hZGRMYXllcihwb3B1cCk7XHJcblx0fSxcclxuXHJcblx0Y2xvc2VQb3B1cDogZnVuY3Rpb24gKHBvcHVwKSB7XHJcblx0XHRpZiAoIXBvcHVwIHx8IHBvcHVwID09PSB0aGlzLl9wb3B1cCkge1xyXG5cdFx0XHRwb3B1cCA9IHRoaXMuX3BvcHVwO1xyXG5cdFx0XHR0aGlzLl9wb3B1cCA9IG51bGw7XHJcblx0XHR9XHJcblx0XHRpZiAocG9wdXApIHtcclxuXHRcdFx0dGhpcy5yZW1vdmVMYXllcihwb3B1cCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcbn0pO1xyXG5cblxuXG4vKlxuICogQWRkcyBwb3B1cC1yZWxhdGVkIG1ldGhvZHMgdG8gYWxsIGxheWVycy5cbiAqL1xuXG5MLkxheWVyLmluY2x1ZGUoe1xuXG5cdGJpbmRQb3B1cDogZnVuY3Rpb24gKGNvbnRlbnQsIG9wdGlvbnMpIHtcblxuXHRcdGlmIChjb250ZW50IGluc3RhbmNlb2YgTC5Qb3B1cCkge1xuXHRcdFx0TC5zZXRPcHRpb25zKGNvbnRlbnQsIG9wdGlvbnMpO1xuXHRcdFx0dGhpcy5fcG9wdXAgPSBjb250ZW50O1xuXHRcdFx0Y29udGVudC5fc291cmNlID0gdGhpcztcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKCF0aGlzLl9wb3B1cCB8fCBvcHRpb25zKSB7XG5cdFx0XHRcdHRoaXMuX3BvcHVwID0gbmV3IEwuUG9wdXAob3B0aW9ucywgdGhpcyk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9wb3B1cC5zZXRDb250ZW50KGNvbnRlbnQpO1xuXHRcdH1cblxuXHRcdGlmICghdGhpcy5fcG9wdXBIYW5kbGVyc0FkZGVkKSB7XG5cdFx0XHR0aGlzLm9uKHtcblx0XHRcdFx0Y2xpY2s6IHRoaXMuX29wZW5Qb3B1cCxcblx0XHRcdFx0cmVtb3ZlOiB0aGlzLmNsb3NlUG9wdXAsXG5cdFx0XHRcdG1vdmU6IHRoaXMuX21vdmVQb3B1cFxuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLl9wb3B1cEhhbmRsZXJzQWRkZWQgPSB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIHNhdmUgdGhlIG9yaWdpbmFsbHkgcGFzc2VkIG9mZnNldFxuXHRcdHRoaXMuX29yaWdpbmFsUG9wdXBPZmZzZXQgPSB0aGlzLl9wb3B1cC5vcHRpb25zLm9mZnNldDtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHVuYmluZFBvcHVwOiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuX3BvcHVwKSB7XG5cdFx0XHR0aGlzLm9mZih7XG5cdFx0XHRcdGNsaWNrOiB0aGlzLl9vcGVuUG9wdXAsXG5cdFx0XHRcdHJlbW92ZTogdGhpcy5jbG9zZVBvcHVwLFxuXHRcdFx0XHRtb3ZlOiB0aGlzLl9tb3ZlUG9wdXBcblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5fcG9wdXBIYW5kbGVyc0FkZGVkID0gZmFsc2U7XG5cdFx0XHR0aGlzLl9wb3B1cCA9IG51bGw7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdG9wZW5Qb3B1cDogZnVuY3Rpb24gKGxheWVyLCBsYXRsbmcpIHtcblx0XHRpZiAoIShsYXllciBpbnN0YW5jZW9mIEwuTGF5ZXIpKSB7XG5cdFx0XHRsYXRsbmcgPSBsYXllcjtcblx0XHRcdGxheWVyID0gdGhpcztcblx0XHR9XG5cblx0XHRpZiAobGF5ZXIgaW5zdGFuY2VvZiBMLkZlYXR1cmVHcm91cCkge1xuXHRcdFx0Zm9yICh2YXIgaWQgaW4gdGhpcy5fbGF5ZXJzKSB7XG5cdFx0XHRcdGxheWVyID0gdGhpcy5fbGF5ZXJzW2lkXTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCFsYXRsbmcpIHtcblx0XHRcdGxhdGxuZyA9IGxheWVyLmdldENlbnRlciA/IGxheWVyLmdldENlbnRlcigpIDogbGF5ZXIuZ2V0TGF0TG5nKCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX3BvcHVwICYmIHRoaXMuX21hcCkge1xuXHRcdFx0Ly8gc2V0IHRoZSBwb3B1cCBvZmZzZXQgZm9yIHRoaXMgbGF5ZXJcblx0XHRcdHRoaXMuX3BvcHVwLm9wdGlvbnMub2Zmc2V0ID0gdGhpcy5fcG9wdXBBbmNob3IobGF5ZXIpO1xuXG5cdFx0XHQvLyBzZXQgcG9wdXAgc291cmNlIHRvIHRoaXMgbGF5ZXJcblx0XHRcdHRoaXMuX3BvcHVwLl9zb3VyY2UgPSBsYXllcjtcblxuXHRcdFx0Ly8gdXBkYXRlIHRoZSBwb3B1cCAoY29udGVudCwgbGF5b3V0LCBlY3QuLi4pXG5cdFx0XHR0aGlzLl9wb3B1cC51cGRhdGUoKTtcblxuXHRcdFx0Ly8gb3BlbiB0aGUgcG9wdXAgb24gdGhlIG1hcFxuXHRcdFx0dGhpcy5fbWFwLm9wZW5Qb3B1cCh0aGlzLl9wb3B1cCwgbGF0bG5nKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRjbG9zZVBvcHVwOiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuX3BvcHVwKSB7XG5cdFx0XHR0aGlzLl9wb3B1cC5fY2xvc2UoKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0dG9nZ2xlUG9wdXA6IGZ1bmN0aW9uICh0YXJnZXQpIHtcblx0XHRpZiAodGhpcy5fcG9wdXApIHtcblx0XHRcdGlmICh0aGlzLl9wb3B1cC5fbWFwKSB7XG5cdFx0XHRcdHRoaXMuY2xvc2VQb3B1cCgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5vcGVuUG9wdXAodGFyZ2V0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0aXNQb3B1cE9wZW46IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5fcG9wdXAuaXNPcGVuKCk7XG5cdH0sXG5cblx0c2V0UG9wdXBDb250ZW50OiBmdW5jdGlvbiAoY29udGVudCkge1xuXHRcdGlmICh0aGlzLl9wb3B1cCkge1xuXHRcdFx0dGhpcy5fcG9wdXAuc2V0Q29udGVudChjb250ZW50KTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0Z2V0UG9wdXA6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5fcG9wdXA7XG5cdH0sXG5cblx0X29wZW5Qb3B1cDogZnVuY3Rpb24gKGUpIHtcblx0XHR2YXIgbGF5ZXIgPSBlLmxheWVyIHx8IGUudGFyZ2V0O1xuXG5cdFx0aWYgKCF0aGlzLl9wb3B1cCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICghdGhpcy5fbWFwKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gaWYgdGhpcyBpbmhlcml0cyBmcm9tIFBhdGggaXRzIGEgdmVjdG9yIGFuZCB3ZSBjYW4ganVzdFxuXHRcdC8vIG9wZW4gdGhlIHBvcHVwIGF0IHRoZSBuZXcgbG9jYXRpb25cblx0XHRpZiAobGF5ZXIgaW5zdGFuY2VvZiBMLlBhdGgpIHtcblx0XHRcdHRoaXMub3BlblBvcHVwKGUubGF5ZXIgfHwgZS50YXJnZXQsIGUubGF0bG5nKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBvdGhlcndpc2UgdHJlYXQgaXQgbGlrZSBhIG1hcmtlciBhbmQgZmlndXJlIG91dFxuXHRcdC8vIGlmIHdlIHNob3VsZCB0b2dnbGUgaXQgb3Blbi9jbG9zZWRcblx0XHRpZiAodGhpcy5fbWFwLmhhc0xheWVyKHRoaXMuX3BvcHVwKSAmJiB0aGlzLl9wb3B1cC5fc291cmNlID09PSBsYXllcikge1xuXHRcdFx0dGhpcy5jbG9zZVBvcHVwKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMub3BlblBvcHVwKGxheWVyLCBlLmxhdGxuZyk7XG5cdFx0fVxuXHR9LFxuXG5cdF9wb3B1cEFuY2hvcjogZnVuY3Rpb24gKGxheWVyKSB7XG5cdFx0Ly8gd2hlcmUgc2hvbGQgd2UgYW5jaG9yIHRoZSBwb3B1cCBvbiB0aGlzIGxheWVyP1xuXHRcdHZhciBhbmNob3IgPSBsYXllci5fZ2V0UG9wdXBBbmNob3IgPyBsYXllci5fZ2V0UG9wdXBBbmNob3IoKSA6IFswLCAwXTtcblxuXHRcdC8vIGFkZCB0aGUgdXNlcnMgcGFzc2VkIG9mZnNldCB0byB0aGF0XG5cdFx0dmFyIG9mZnNldFRvQWRkID0gdGhpcy5fb3JpZ2luYWxQb3B1cE9mZnNldCB8fCBMLlBvcHVwLnByb3RvdHlwZS5vcHRpb25zLm9mZnNldDtcblxuXHRcdC8vIHJldHVybiB0aGUgZmluYWwgcG9pbnQgdG8gYW5jaG9yIHRoZSBwb3B1cFxuXHRcdHJldHVybiBMLnBvaW50KGFuY2hvcikuYWRkKG9mZnNldFRvQWRkKTtcblx0fSxcblxuXHRfbW92ZVBvcHVwOiBmdW5jdGlvbiAoZSkge1xuXHRcdHRoaXMuX3BvcHVwLnNldExhdExuZyhlLmxhdGxuZyk7XG5cdH1cbn0pO1xuXG5cblxuLypcclxuICogUG9wdXAgZXh0ZW5zaW9uIHRvIEwuTWFya2VyLCBhZGRpbmcgcG9wdXAtcmVsYXRlZCBtZXRob2RzLlxyXG4gKi9cclxuXHJcbkwuTWFya2VyLmluY2x1ZGUoe1xyXG5cdF9nZXRQb3B1cEFuY2hvcjogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMub3B0aW9ucy5pY29uLm9wdGlvbnMucG9wdXBBbmNob3IgfHwgWzAsIDBdO1xyXG5cdH1cclxufSk7XHJcblxuXG5cbi8qXHJcbiAqIEwuTGF5ZXJHcm91cCBpcyBhIGNsYXNzIHRvIGNvbWJpbmUgc2V2ZXJhbCBsYXllcnMgaW50byBvbmUgc28gdGhhdFxyXG4gKiB5b3UgY2FuIG1hbmlwdWxhdGUgdGhlIGdyb3VwIChlLmcuIGFkZC9yZW1vdmUgaXQpIGFzIG9uZSBsYXllci5cclxuICovXHJcblxyXG5MLkxheWVyR3JvdXAgPSBMLkxheWVyLmV4dGVuZCh7XHJcblxyXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIChsYXllcnMpIHtcclxuXHRcdHRoaXMuX2xheWVycyA9IHt9O1xyXG5cclxuXHRcdHZhciBpLCBsZW47XHJcblxyXG5cdFx0aWYgKGxheWVycykge1xyXG5cdFx0XHRmb3IgKGkgPSAwLCBsZW4gPSBsYXllcnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0XHR0aGlzLmFkZExheWVyKGxheWVyc1tpXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRhZGRMYXllcjogZnVuY3Rpb24gKGxheWVyKSB7XHJcblx0XHR2YXIgaWQgPSB0aGlzLmdldExheWVySWQobGF5ZXIpO1xyXG5cclxuXHRcdHRoaXMuX2xheWVyc1tpZF0gPSBsYXllcjtcclxuXHJcblx0XHRpZiAodGhpcy5fbWFwKSB7XHJcblx0XHRcdHRoaXMuX21hcC5hZGRMYXllcihsYXllcik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0cmVtb3ZlTGF5ZXI6IGZ1bmN0aW9uIChsYXllcikge1xyXG5cdFx0dmFyIGlkID0gbGF5ZXIgaW4gdGhpcy5fbGF5ZXJzID8gbGF5ZXIgOiB0aGlzLmdldExheWVySWQobGF5ZXIpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbGF5ZXJzW2lkXSkge1xyXG5cdFx0XHR0aGlzLl9tYXAucmVtb3ZlTGF5ZXIodGhpcy5fbGF5ZXJzW2lkXSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZGVsZXRlIHRoaXMuX2xheWVyc1tpZF07XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0aGFzTGF5ZXI6IGZ1bmN0aW9uIChsYXllcikge1xyXG5cdFx0cmV0dXJuICEhbGF5ZXIgJiYgKGxheWVyIGluIHRoaXMuX2xheWVycyB8fCB0aGlzLmdldExheWVySWQobGF5ZXIpIGluIHRoaXMuX2xheWVycyk7XHJcblx0fSxcclxuXHJcblx0Y2xlYXJMYXllcnM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGZvciAodmFyIGkgaW4gdGhpcy5fbGF5ZXJzKSB7XHJcblx0XHRcdHRoaXMucmVtb3ZlTGF5ZXIodGhpcy5fbGF5ZXJzW2ldKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdGludm9rZTogZnVuY3Rpb24gKG1ldGhvZE5hbWUpIHtcclxuXHRcdHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcclxuXHRcdCAgICBpLCBsYXllcjtcclxuXHJcblx0XHRmb3IgKGkgaW4gdGhpcy5fbGF5ZXJzKSB7XHJcblx0XHRcdGxheWVyID0gdGhpcy5fbGF5ZXJzW2ldO1xyXG5cclxuXHRcdFx0aWYgKGxheWVyW21ldGhvZE5hbWVdKSB7XHJcblx0XHRcdFx0bGF5ZXJbbWV0aG9kTmFtZV0uYXBwbHkobGF5ZXIsIGFyZ3MpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0b25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcclxuXHRcdGZvciAodmFyIGkgaW4gdGhpcy5fbGF5ZXJzKSB7XHJcblx0XHRcdG1hcC5hZGRMYXllcih0aGlzLl9sYXllcnNbaV0pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdG9uUmVtb3ZlOiBmdW5jdGlvbiAobWFwKSB7XHJcblx0XHRmb3IgKHZhciBpIGluIHRoaXMuX2xheWVycykge1xyXG5cdFx0XHRtYXAucmVtb3ZlTGF5ZXIodGhpcy5fbGF5ZXJzW2ldKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRlYWNoTGF5ZXI6IGZ1bmN0aW9uIChtZXRob2QsIGNvbnRleHQpIHtcclxuXHRcdGZvciAodmFyIGkgaW4gdGhpcy5fbGF5ZXJzKSB7XHJcblx0XHRcdG1ldGhvZC5jYWxsKGNvbnRleHQsIHRoaXMuX2xheWVyc1tpXSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRnZXRMYXllcjogZnVuY3Rpb24gKGlkKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fbGF5ZXJzW2lkXTtcclxuXHR9LFxyXG5cclxuXHRnZXRMYXllcnM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBsYXllcnMgPSBbXTtcclxuXHJcblx0XHRmb3IgKHZhciBpIGluIHRoaXMuX2xheWVycykge1xyXG5cdFx0XHRsYXllcnMucHVzaCh0aGlzLl9sYXllcnNbaV0pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGxheWVycztcclxuXHR9LFxyXG5cclxuXHRzZXRaSW5kZXg6IGZ1bmN0aW9uICh6SW5kZXgpIHtcclxuXHRcdHJldHVybiB0aGlzLmludm9rZSgnc2V0WkluZGV4JywgekluZGV4KTtcclxuXHR9LFxyXG5cclxuXHRnZXRMYXllcklkOiBmdW5jdGlvbiAobGF5ZXIpIHtcclxuXHRcdHJldHVybiBMLnN0YW1wKGxheWVyKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuTC5sYXllckdyb3VwID0gZnVuY3Rpb24gKGxheWVycykge1xyXG5cdHJldHVybiBuZXcgTC5MYXllckdyb3VwKGxheWVycyk7XHJcbn07XHJcblxuXG5cbi8qXHJcbiAqIEwuRmVhdHVyZUdyb3VwIGV4dGVuZHMgTC5MYXllckdyb3VwIGJ5IGludHJvZHVjaW5nIG1vdXNlIGV2ZW50cyBhbmQgYWRkaXRpb25hbCBtZXRob2RzXHJcbiAqIHNoYXJlZCBiZXR3ZWVuIGEgZ3JvdXAgb2YgaW50ZXJhY3RpdmUgbGF5ZXJzIChsaWtlIHZlY3RvcnMgb3IgbWFya2VycykuXHJcbiAqL1xyXG5cclxuTC5GZWF0dXJlR3JvdXAgPSBMLkxheWVyR3JvdXAuZXh0ZW5kKHtcclxuXHJcblx0YWRkTGF5ZXI6IGZ1bmN0aW9uIChsYXllcikge1xyXG5cdFx0aWYgKHRoaXMuaGFzTGF5ZXIobGF5ZXIpKSB7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxheWVyLmFkZEV2ZW50UGFyZW50KHRoaXMpO1xyXG5cclxuXHRcdEwuTGF5ZXJHcm91cC5wcm90b3R5cGUuYWRkTGF5ZXIuY2FsbCh0aGlzLCBsYXllcik7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuZmlyZSgnbGF5ZXJhZGQnLCB7bGF5ZXI6IGxheWVyfSk7XHJcblx0fSxcclxuXHJcblx0cmVtb3ZlTGF5ZXI6IGZ1bmN0aW9uIChsYXllcikge1xyXG5cdFx0aWYgKCF0aGlzLmhhc0xheWVyKGxheWVyKSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH1cclxuXHRcdGlmIChsYXllciBpbiB0aGlzLl9sYXllcnMpIHtcclxuXHRcdFx0bGF5ZXIgPSB0aGlzLl9sYXllcnNbbGF5ZXJdO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxheWVyLnJlbW92ZUV2ZW50UGFyZW50KHRoaXMpO1xyXG5cclxuXHRcdEwuTGF5ZXJHcm91cC5wcm90b3R5cGUucmVtb3ZlTGF5ZXIuY2FsbCh0aGlzLCBsYXllcik7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuZmlyZSgnbGF5ZXJyZW1vdmUnLCB7bGF5ZXI6IGxheWVyfSk7XHJcblx0fSxcclxuXHJcblx0c2V0U3R5bGU6IGZ1bmN0aW9uIChzdHlsZSkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaW52b2tlKCdzZXRTdHlsZScsIHN0eWxlKTtcclxuXHR9LFxyXG5cclxuXHRicmluZ1RvRnJvbnQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLmludm9rZSgnYnJpbmdUb0Zyb250Jyk7XHJcblx0fSxcclxuXHJcblx0YnJpbmdUb0JhY2s6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLmludm9rZSgnYnJpbmdUb0JhY2snKTtcclxuXHR9LFxyXG5cclxuXHRnZXRCb3VuZHM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBib3VuZHMgPSBuZXcgTC5MYXRMbmdCb3VuZHMoKTtcclxuXHJcblx0XHRmb3IgKHZhciBpZCBpbiB0aGlzLl9sYXllcnMpIHtcclxuXHRcdFx0dmFyIGxheWVyID0gdGhpcy5fbGF5ZXJzW2lkXTtcclxuXHRcdFx0Ym91bmRzLmV4dGVuZChsYXllci5nZXRCb3VuZHMgPyBsYXllci5nZXRCb3VuZHMoKSA6IGxheWVyLmdldExhdExuZygpKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBib3VuZHM7XHJcblx0fVxyXG59KTtcclxuXHJcbkwuZmVhdHVyZUdyb3VwID0gZnVuY3Rpb24gKGxheWVycykge1xyXG5cdHJldHVybiBuZXcgTC5GZWF0dXJlR3JvdXAobGF5ZXJzKTtcclxufTtcclxuXG5cblxuLypcbiAqIEwuUmVuZGVyZXIgaXMgYSBiYXNlIGNsYXNzIGZvciByZW5kZXJlciBpbXBsZW1lbnRhdGlvbnMgKFNWRywgQ2FudmFzKTtcbiAqIGhhbmRsZXMgcmVuZGVyZXIgY29udGFpbmVyLCBib3VuZHMgYW5kIHpvb20gYW5pbWF0aW9uLlxuICovXG5cbkwuUmVuZGVyZXIgPSBMLkxheWVyLmV4dGVuZCh7XG5cblx0b3B0aW9uczoge1xuXHRcdC8vIGhvdyBtdWNoIHRvIGV4dGVuZCB0aGUgY2xpcCBhcmVhIGFyb3VuZCB0aGUgbWFwIHZpZXcgKHJlbGF0aXZlIHRvIGl0cyBzaXplKVxuXHRcdC8vIGUuZy4gMC4xIHdvdWxkIGJlIDEwJSBvZiBtYXAgdmlldyBpbiBlYWNoIGRpcmVjdGlvbjsgZGVmYXVsdHMgdG8gY2xpcCB3aXRoIHRoZSBtYXAgdmlld1xuXHRcdHBhZGRpbmc6IDAuMVxuXHR9LFxuXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdFx0TC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuXHRcdEwuc3RhbXAodGhpcyk7XG5cdH0sXG5cblx0b25BZGQ6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoIXRoaXMuX2NvbnRhaW5lcikge1xuXHRcdFx0dGhpcy5faW5pdENvbnRhaW5lcigpOyAvLyBkZWZpbmVkIGJ5IHJlbmRlcmVyIGltcGxlbWVudGF0aW9uc1xuXG5cdFx0XHRpZiAodGhpcy5fem9vbUFuaW1hdGVkKSB7XG5cdFx0XHRcdEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9jb250YWluZXIsICdsZWFmbGV0LXpvb20tYW5pbWF0ZWQnKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLmdldFBhbmUoKS5hcHBlbmRDaGlsZCh0aGlzLl9jb250YWluZXIpO1xuXHRcdHRoaXMuX3VwZGF0ZSgpO1xuXHR9LFxuXG5cdG9uUmVtb3ZlOiBmdW5jdGlvbiAoKSB7XG5cdFx0TC5Eb21VdGlsLnJlbW92ZSh0aGlzLl9jb250YWluZXIpO1xuXHR9LFxuXG5cdGdldEV2ZW50czogZnVuY3Rpb24gKCkge1xuXHRcdHZhciBldmVudHMgPSB7XG5cdFx0XHR2aWV3cmVzZXQ6IHRoaXMuX3Jlc2V0LFxuXHRcdFx0em9vbXN0YXJ0OiB0aGlzLl9vblpvb21TdGFydCxcblx0XHRcdHpvb206IHRoaXMuX29uWm9vbSxcblx0XHRcdG1vdmVlbmQ6IHRoaXMuX3VwZGF0ZVxuXHRcdH07XG5cdFx0aWYgKHRoaXMuX3pvb21BbmltYXRlZCkge1xuXHRcdFx0ZXZlbnRzLnpvb21hbmltID0gdGhpcy5fb25BbmltWm9vbTtcblx0XHR9XG5cdFx0cmV0dXJuIGV2ZW50cztcblx0fSxcblxuXHRfb25BbmltWm9vbTogZnVuY3Rpb24gKGV2KSB7XG5cdFx0dGhpcy5fdXBkYXRlVHJhbnNmb3JtKGV2LmNlbnRlciwgZXYuem9vbSk7XG5cdH0sXG5cblx0X29uWm9vbTogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuX3VwZGF0ZVRyYW5zZm9ybSh0aGlzLl9tYXAuZ2V0Q2VudGVyKCksIHRoaXMuX21hcC5nZXRab29tKCkpO1xuXHR9LFxuXG5cdF9vblpvb21TdGFydDogZnVuY3Rpb24gKCkge1xuXHRcdC8vIERyYWctdGhlbi1waW5jaCBpbnRlcmFjdGlvbnMgbWlnaHQgbWVzcyB1cCB0aGUgY2VudGVyIGFuZCB6b29tLlxuXHRcdC8vIEluIHRoaXMgY2FzZSwgdGhlIGVhc2llc3Qgd2F5IHRvIHByZXZlbnQgdGhpcyBpcyByZS1kbyB0aGUgcmVuZGVyZXJcblx0XHQvLyAgIGJvdW5kcyBhbmQgcGFkZGluZyB3aGVuIHRoZSB6b29taW5nIHN0YXJ0cy5cblx0XHR0aGlzLl91cGRhdGUoKTtcblx0fSxcblxuXHRfdXBkYXRlVHJhbnNmb3JtOiBmdW5jdGlvbiAoY2VudGVyLCB6b29tKSB7XG5cdFx0dmFyIHNjYWxlID0gdGhpcy5fbWFwLmdldFpvb21TY2FsZSh6b29tLCB0aGlzLl96b29tKSxcblx0XHQgICAgcG9zaXRpb24gPSBMLkRvbVV0aWwuZ2V0UG9zaXRpb24odGhpcy5fY29udGFpbmVyKSxcblx0XHQgICAgdmlld0hhbGYgPSB0aGlzLl9tYXAuZ2V0U2l6ZSgpLm11bHRpcGx5QnkoMC41ICsgdGhpcy5vcHRpb25zLnBhZGRpbmcpLFxuXHRcdCAgICBjdXJyZW50Q2VudGVyUG9pbnQgPSB0aGlzLl9tYXAucHJvamVjdCh0aGlzLl9jZW50ZXIsIHpvb20pLFxuXHRcdCAgICBkZXN0Q2VudGVyUG9pbnQgPSB0aGlzLl9tYXAucHJvamVjdChjZW50ZXIsIHpvb20pLFxuXHRcdCAgICBjZW50ZXJPZmZzZXQgPSBkZXN0Q2VudGVyUG9pbnQuc3VidHJhY3QoY3VycmVudENlbnRlclBvaW50KSxcblxuXHRcdCAgICB0b3BMZWZ0T2Zmc2V0ID0gdmlld0hhbGYubXVsdGlwbHlCeSgtc2NhbGUpLmFkZChwb3NpdGlvbikuYWRkKHZpZXdIYWxmKS5zdWJ0cmFjdChjZW50ZXJPZmZzZXQpO1xuXG5cdFx0TC5Eb21VdGlsLnNldFRyYW5zZm9ybSh0aGlzLl9jb250YWluZXIsIHRvcExlZnRPZmZzZXQsIHNjYWxlKTtcblx0fSxcblxuXHRfcmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLl91cGRhdGUoKTtcblx0XHR0aGlzLl91cGRhdGVUcmFuc2Zvcm0odGhpcy5fY2VudGVyLCB0aGlzLl96b29tKTtcblx0fSxcblxuXHRfdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gdXBkYXRlIHBpeGVsIGJvdW5kcyBvZiByZW5kZXJlciBjb250YWluZXIgKGZvciBwb3NpdGlvbmluZy9zaXppbmcvY2xpcHBpbmcgbGF0ZXIpXG5cdFx0dmFyIHAgPSB0aGlzLm9wdGlvbnMucGFkZGluZyxcblx0XHQgICAgc2l6ZSA9IHRoaXMuX21hcC5nZXRTaXplKCksXG5cdFx0ICAgIG1pbiA9IHRoaXMuX21hcC5jb250YWluZXJQb2ludFRvTGF5ZXJQb2ludChzaXplLm11bHRpcGx5QnkoLXApKS5yb3VuZCgpO1xuXG5cdFx0dGhpcy5fYm91bmRzID0gbmV3IEwuQm91bmRzKG1pbiwgbWluLmFkZChzaXplLm11bHRpcGx5QnkoMSArIHAgKiAyKSkucm91bmQoKSk7XG5cblx0XHR0aGlzLl9jZW50ZXIgPSB0aGlzLl9tYXAuZ2V0Q2VudGVyKCk7XG5cdFx0dGhpcy5fem9vbSA9IHRoaXMuX21hcC5nZXRab29tKCk7XG5cdH1cbn0pO1xuXG5cbkwuTWFwLmluY2x1ZGUoe1xuXHQvLyB1c2VkIGJ5IGVhY2ggdmVjdG9yIGxheWVyIHRvIGRlY2lkZSB3aGljaCByZW5kZXJlciB0byB1c2Vcblx0Z2V0UmVuZGVyZXI6IGZ1bmN0aW9uIChsYXllcikge1xuXHRcdHZhciByZW5kZXJlciA9IGxheWVyLm9wdGlvbnMucmVuZGVyZXIgfHwgdGhpcy5fZ2V0UGFuZVJlbmRlcmVyKGxheWVyLm9wdGlvbnMucGFuZSkgfHwgdGhpcy5vcHRpb25zLnJlbmRlcmVyIHx8IHRoaXMuX3JlbmRlcmVyO1xuXG5cdFx0aWYgKCFyZW5kZXJlcikge1xuXHRcdFx0cmVuZGVyZXIgPSB0aGlzLl9yZW5kZXJlciA9ICh0aGlzLm9wdGlvbnMucHJlZmVyQ2FudmFzICYmIEwuY2FudmFzKCkpIHx8IEwuc3ZnKCk7XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLmhhc0xheWVyKHJlbmRlcmVyKSkge1xuXHRcdFx0dGhpcy5hZGRMYXllcihyZW5kZXJlcik7XG5cdFx0fVxuXHRcdHJldHVybiByZW5kZXJlcjtcblx0fSxcblxuXHRfZ2V0UGFuZVJlbmRlcmVyOiBmdW5jdGlvbiAobmFtZSkge1xuXHRcdGlmIChuYW1lID09PSAnb3ZlcmxheVBhbmUnIHx8IG5hbWUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHZhciByZW5kZXJlciA9IHRoaXMuX3BhbmVSZW5kZXJlcnNbbmFtZV07XG5cdFx0aWYgKHJlbmRlcmVyID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJlbmRlcmVyID0gKEwuU1ZHICYmIEwuc3ZnKHtwYW5lOiBuYW1lfSkpIHx8IChMLkNhbnZhcyAmJiBMLmNhbnZhcyh7cGFuZTogbmFtZX0pKTtcblx0XHRcdHRoaXMuX3BhbmVSZW5kZXJlcnNbbmFtZV0gPSByZW5kZXJlcjtcblx0XHR9XG5cdFx0cmV0dXJuIHJlbmRlcmVyO1xuXHR9XG59KTtcblxuXG5cbi8qXG4gKiBMLlBhdGggaXMgdGhlIGJhc2UgY2xhc3MgZm9yIGFsbCBMZWFmbGV0IHZlY3RvciBsYXllcnMgbGlrZSBwb2x5Z29ucyBhbmQgY2lyY2xlcy5cbiAqL1xuXG5MLlBhdGggPSBMLkxheWVyLmV4dGVuZCh7XG5cblx0b3B0aW9uczoge1xuXHRcdHN0cm9rZTogdHJ1ZSxcblx0XHRjb2xvcjogJyMzMzg4ZmYnLFxuXHRcdHdlaWdodDogMyxcblx0XHRvcGFjaXR5OiAxLFxuXHRcdGxpbmVDYXA6ICdyb3VuZCcsXG5cdFx0bGluZUpvaW46ICdyb3VuZCcsXG5cdFx0Ly8gZGFzaEFycmF5OiBudWxsXG5cdFx0Ly8gZGFzaE9mZnNldDogbnVsbFxuXG5cdFx0Ly8gZmlsbDogZmFsc2Vcblx0XHQvLyBmaWxsQ29sb3I6IHNhbWUgYXMgY29sb3IgYnkgZGVmYXVsdFxuXHRcdGZpbGxPcGFjaXR5OiAwLjIsXG5cdFx0ZmlsbFJ1bGU6ICdldmVub2RkJyxcblxuXHRcdC8vIGNsYXNzTmFtZTogJydcblx0XHRpbnRlcmFjdGl2ZTogdHJ1ZVxuXHR9LFxuXG5cdGJlZm9yZUFkZDogZnVuY3Rpb24gKG1hcCkge1xuXHRcdC8vIFJlbmRlcmVyIGlzIHNldCBoZXJlIGJlY2F1c2Ugd2UgbmVlZCB0byBjYWxsIHJlbmRlcmVyLmdldEV2ZW50c1xuXHRcdC8vIGJlZm9yZSB0aGlzLmdldEV2ZW50cy5cblx0XHR0aGlzLl9yZW5kZXJlciA9IG1hcC5nZXRSZW5kZXJlcih0aGlzKTtcblx0fSxcblxuXHRvbkFkZDogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuX3JlbmRlcmVyLl9pbml0UGF0aCh0aGlzKTtcblx0XHR0aGlzLl9yZXNldCgpO1xuXHRcdHRoaXMuX3JlbmRlcmVyLl9hZGRQYXRoKHRoaXMpO1xuXHR9LFxuXG5cdG9uUmVtb3ZlOiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fcmVuZGVyZXIuX3JlbW92ZVBhdGgodGhpcyk7XG5cdH0sXG5cblx0Z2V0RXZlbnRzOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHpvb21lbmQ6IHRoaXMuX3Byb2plY3QsXG5cdFx0XHRtb3ZlZW5kOiB0aGlzLl91cGRhdGUsXG5cdFx0XHR2aWV3cmVzZXQ6IHRoaXMuX3Jlc2V0XG5cdFx0fTtcblx0fSxcblxuXHRyZWRyYXc6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5fbWFwKSB7XG5cdFx0XHR0aGlzLl9yZW5kZXJlci5fdXBkYXRlUGF0aCh0aGlzKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0c2V0U3R5bGU6IGZ1bmN0aW9uIChzdHlsZSkge1xuXHRcdEwuc2V0T3B0aW9ucyh0aGlzLCBzdHlsZSk7XG5cdFx0aWYgKHRoaXMuX3JlbmRlcmVyKSB7XG5cdFx0XHR0aGlzLl9yZW5kZXJlci5fdXBkYXRlU3R5bGUodGhpcyk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdGJyaW5nVG9Gcm9udDogZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0aGlzLl9yZW5kZXJlcikge1xuXHRcdFx0dGhpcy5fcmVuZGVyZXIuX2JyaW5nVG9Gcm9udCh0aGlzKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0YnJpbmdUb0JhY2s6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5fcmVuZGVyZXIpIHtcblx0XHRcdHRoaXMuX3JlbmRlcmVyLl9icmluZ1RvQmFjayh0aGlzKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0Z2V0RWxlbWVudDogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLl9wYXRoO1xuXHR9LFxuXG5cdF9yZXNldDogZnVuY3Rpb24gKCkge1xuXHRcdC8vIGRlZmluZWQgaW4gY2hpbGRyZW4gY2xhc3Nlc1xuXHRcdHRoaXMuX3Byb2plY3QoKTtcblx0XHR0aGlzLl91cGRhdGUoKTtcblx0fSxcblxuXHRfY2xpY2tUb2xlcmFuY2U6IGZ1bmN0aW9uICgpIHtcblx0XHQvLyB1c2VkIHdoZW4gZG9pbmcgaGl0IGRldGVjdGlvbiBmb3IgQ2FudmFzIGxheWVyc1xuXHRcdHJldHVybiAodGhpcy5vcHRpb25zLnN0cm9rZSA/IHRoaXMub3B0aW9ucy53ZWlnaHQgLyAyIDogMCkgKyAoTC5Ccm93c2VyLnRvdWNoID8gMTAgOiAwKTtcblx0fVxufSk7XG5cblxuXG4vKlxyXG4gKiBMLkxpbmVVdGlsIGNvbnRhaW5zIGRpZmZlcmVudCB1dGlsaXR5IGZ1bmN0aW9ucyBmb3IgbGluZSBzZWdtZW50c1xyXG4gKiBhbmQgcG9seWxpbmVzIChjbGlwcGluZywgc2ltcGxpZmljYXRpb24sIGRpc3RhbmNlcywgZXRjLilcclxuICovXHJcblxyXG5MLkxpbmVVdGlsID0ge1xyXG5cclxuXHQvLyBTaW1wbGlmeSBwb2x5bGluZSB3aXRoIHZlcnRleCByZWR1Y3Rpb24gYW5kIERvdWdsYXMtUGV1Y2tlciBzaW1wbGlmaWNhdGlvbi5cclxuXHQvLyBJbXByb3ZlcyByZW5kZXJpbmcgcGVyZm9ybWFuY2UgZHJhbWF0aWNhbGx5IGJ5IGxlc3NlbmluZyB0aGUgbnVtYmVyIG9mIHBvaW50cyB0byBkcmF3LlxyXG5cclxuXHRzaW1wbGlmeTogZnVuY3Rpb24gKHBvaW50cywgdG9sZXJhbmNlKSB7XHJcblx0XHRpZiAoIXRvbGVyYW5jZSB8fCAhcG9pbnRzLmxlbmd0aCkge1xyXG5cdFx0XHRyZXR1cm4gcG9pbnRzLnNsaWNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHNxVG9sZXJhbmNlID0gdG9sZXJhbmNlICogdG9sZXJhbmNlO1xyXG5cclxuXHRcdC8vIHN0YWdlIDE6IHZlcnRleCByZWR1Y3Rpb25cclxuXHRcdHBvaW50cyA9IHRoaXMuX3JlZHVjZVBvaW50cyhwb2ludHMsIHNxVG9sZXJhbmNlKTtcclxuXHJcblx0XHQvLyBzdGFnZSAyOiBEb3VnbGFzLVBldWNrZXIgc2ltcGxpZmljYXRpb25cclxuXHRcdHBvaW50cyA9IHRoaXMuX3NpbXBsaWZ5RFAocG9pbnRzLCBzcVRvbGVyYW5jZSk7XHJcblxyXG5cdFx0cmV0dXJuIHBvaW50cztcclxuXHR9LFxyXG5cclxuXHQvLyBkaXN0YW5jZSBmcm9tIGEgcG9pbnQgdG8gYSBzZWdtZW50IGJldHdlZW4gdHdvIHBvaW50c1xyXG5cdHBvaW50VG9TZWdtZW50RGlzdGFuY2U6ICBmdW5jdGlvbiAocCwgcDEsIHAyKSB7XHJcblx0XHRyZXR1cm4gTWF0aC5zcXJ0KHRoaXMuX3NxQ2xvc2VzdFBvaW50T25TZWdtZW50KHAsIHAxLCBwMiwgdHJ1ZSkpO1xyXG5cdH0sXHJcblxyXG5cdGNsb3Nlc3RQb2ludE9uU2VnbWVudDogZnVuY3Rpb24gKHAsIHAxLCBwMikge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3NxQ2xvc2VzdFBvaW50T25TZWdtZW50KHAsIHAxLCBwMik7XHJcblx0fSxcclxuXHJcblx0Ly8gRG91Z2xhcy1QZXVja2VyIHNpbXBsaWZpY2F0aW9uLCBzZWUgaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Eb3VnbGFzLVBldWNrZXJfYWxnb3JpdGhtXHJcblx0X3NpbXBsaWZ5RFA6IGZ1bmN0aW9uIChwb2ludHMsIHNxVG9sZXJhbmNlKSB7XHJcblxyXG5cdFx0dmFyIGxlbiA9IHBvaW50cy5sZW5ndGgsXHJcblx0XHQgICAgQXJyYXlDb25zdHJ1Y3RvciA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSB1bmRlZmluZWQgKyAnJyA/IFVpbnQ4QXJyYXkgOiBBcnJheSxcclxuXHRcdCAgICBtYXJrZXJzID0gbmV3IEFycmF5Q29uc3RydWN0b3IobGVuKTtcclxuXHJcblx0XHRtYXJrZXJzWzBdID0gbWFya2Vyc1tsZW4gLSAxXSA9IDE7XHJcblxyXG5cdFx0dGhpcy5fc2ltcGxpZnlEUFN0ZXAocG9pbnRzLCBtYXJrZXJzLCBzcVRvbGVyYW5jZSwgMCwgbGVuIC0gMSk7XHJcblxyXG5cdFx0dmFyIGksXHJcblx0XHQgICAgbmV3UG9pbnRzID0gW107XHJcblxyXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdGlmIChtYXJrZXJzW2ldKSB7XHJcblx0XHRcdFx0bmV3UG9pbnRzLnB1c2gocG9pbnRzW2ldKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBuZXdQb2ludHM7XHJcblx0fSxcclxuXHJcblx0X3NpbXBsaWZ5RFBTdGVwOiBmdW5jdGlvbiAocG9pbnRzLCBtYXJrZXJzLCBzcVRvbGVyYW5jZSwgZmlyc3QsIGxhc3QpIHtcclxuXHJcblx0XHR2YXIgbWF4U3FEaXN0ID0gMCxcclxuXHRcdCAgICBpbmRleCwgaSwgc3FEaXN0O1xyXG5cclxuXHRcdGZvciAoaSA9IGZpcnN0ICsgMTsgaSA8PSBsYXN0IC0gMTsgaSsrKSB7XHJcblx0XHRcdHNxRGlzdCA9IHRoaXMuX3NxQ2xvc2VzdFBvaW50T25TZWdtZW50KHBvaW50c1tpXSwgcG9pbnRzW2ZpcnN0XSwgcG9pbnRzW2xhc3RdLCB0cnVlKTtcclxuXHJcblx0XHRcdGlmIChzcURpc3QgPiBtYXhTcURpc3QpIHtcclxuXHRcdFx0XHRpbmRleCA9IGk7XHJcblx0XHRcdFx0bWF4U3FEaXN0ID0gc3FEaXN0O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG1heFNxRGlzdCA+IHNxVG9sZXJhbmNlKSB7XHJcblx0XHRcdG1hcmtlcnNbaW5kZXhdID0gMTtcclxuXHJcblx0XHRcdHRoaXMuX3NpbXBsaWZ5RFBTdGVwKHBvaW50cywgbWFya2Vycywgc3FUb2xlcmFuY2UsIGZpcnN0LCBpbmRleCk7XHJcblx0XHRcdHRoaXMuX3NpbXBsaWZ5RFBTdGVwKHBvaW50cywgbWFya2Vycywgc3FUb2xlcmFuY2UsIGluZGV4LCBsYXN0KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvLyByZWR1Y2UgcG9pbnRzIHRoYXQgYXJlIHRvbyBjbG9zZSB0byBlYWNoIG90aGVyIHRvIGEgc2luZ2xlIHBvaW50XHJcblx0X3JlZHVjZVBvaW50czogZnVuY3Rpb24gKHBvaW50cywgc3FUb2xlcmFuY2UpIHtcclxuXHRcdHZhciByZWR1Y2VkUG9pbnRzID0gW3BvaW50c1swXV07XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDEsIHByZXYgPSAwLCBsZW4gPSBwb2ludHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0aWYgKHRoaXMuX3NxRGlzdChwb2ludHNbaV0sIHBvaW50c1twcmV2XSkgPiBzcVRvbGVyYW5jZSkge1xyXG5cdFx0XHRcdHJlZHVjZWRQb2ludHMucHVzaChwb2ludHNbaV0pO1xyXG5cdFx0XHRcdHByZXYgPSBpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAocHJldiA8IGxlbiAtIDEpIHtcclxuXHRcdFx0cmVkdWNlZFBvaW50cy5wdXNoKHBvaW50c1tsZW4gLSAxXSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVkdWNlZFBvaW50cztcclxuXHR9LFxyXG5cclxuXHQvLyBDb2hlbi1TdXRoZXJsYW5kIGxpbmUgY2xpcHBpbmcgYWxnb3JpdGhtLlxyXG5cdC8vIFVzZWQgdG8gYXZvaWQgcmVuZGVyaW5nIHBhcnRzIG9mIGEgcG9seWxpbmUgdGhhdCBhcmUgbm90IGN1cnJlbnRseSB2aXNpYmxlLlxyXG5cclxuXHRjbGlwU2VnbWVudDogZnVuY3Rpb24gKGEsIGIsIGJvdW5kcywgdXNlTGFzdENvZGUsIHJvdW5kKSB7XHJcblx0XHR2YXIgY29kZUEgPSB1c2VMYXN0Q29kZSA/IHRoaXMuX2xhc3RDb2RlIDogdGhpcy5fZ2V0Qml0Q29kZShhLCBib3VuZHMpLFxyXG5cdFx0ICAgIGNvZGVCID0gdGhpcy5fZ2V0Qml0Q29kZShiLCBib3VuZHMpLFxyXG5cclxuXHRcdCAgICBjb2RlT3V0LCBwLCBuZXdDb2RlO1xyXG5cclxuXHRcdC8vIHNhdmUgMm5kIGNvZGUgdG8gYXZvaWQgY2FsY3VsYXRpbmcgaXQgb24gdGhlIG5leHQgc2VnbWVudFxyXG5cdFx0dGhpcy5fbGFzdENvZGUgPSBjb2RlQjtcclxuXHJcblx0XHR3aGlsZSAodHJ1ZSkge1xyXG5cdFx0XHQvLyBpZiBhLGIgaXMgaW5zaWRlIHRoZSBjbGlwIHdpbmRvdyAodHJpdmlhbCBhY2NlcHQpXHJcblx0XHRcdGlmICghKGNvZGVBIHwgY29kZUIpKSB7IHJldHVybiBbYSwgYl07IH1cclxuXHJcblx0XHRcdC8vIGlmIGEsYiBpcyBvdXRzaWRlIHRoZSBjbGlwIHdpbmRvdyAodHJpdmlhbCByZWplY3QpXHJcblx0XHRcdGlmIChjb2RlQSAmIGNvZGVCKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cclxuXHRcdFx0Ly8gb3RoZXIgY2FzZXNcclxuXHRcdFx0Y29kZU91dCA9IGNvZGVBIHx8IGNvZGVCO1xyXG5cdFx0XHRwID0gdGhpcy5fZ2V0RWRnZUludGVyc2VjdGlvbihhLCBiLCBjb2RlT3V0LCBib3VuZHMsIHJvdW5kKTtcclxuXHRcdFx0bmV3Q29kZSA9IHRoaXMuX2dldEJpdENvZGUocCwgYm91bmRzKTtcclxuXHJcblx0XHRcdGlmIChjb2RlT3V0ID09PSBjb2RlQSkge1xyXG5cdFx0XHRcdGEgPSBwO1xyXG5cdFx0XHRcdGNvZGVBID0gbmV3Q29kZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRiID0gcDtcclxuXHRcdFx0XHRjb2RlQiA9IG5ld0NvZGU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfZ2V0RWRnZUludGVyc2VjdGlvbjogZnVuY3Rpb24gKGEsIGIsIGNvZGUsIGJvdW5kcywgcm91bmQpIHtcclxuXHRcdHZhciBkeCA9IGIueCAtIGEueCxcclxuXHRcdCAgICBkeSA9IGIueSAtIGEueSxcclxuXHRcdCAgICBtaW4gPSBib3VuZHMubWluLFxyXG5cdFx0ICAgIG1heCA9IGJvdW5kcy5tYXgsXHJcblx0XHQgICAgeCwgeTtcclxuXHJcblx0XHRpZiAoY29kZSAmIDgpIHsgLy8gdG9wXHJcblx0XHRcdHggPSBhLnggKyBkeCAqIChtYXgueSAtIGEueSkgLyBkeTtcclxuXHRcdFx0eSA9IG1heC55O1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoY29kZSAmIDQpIHsgLy8gYm90dG9tXHJcblx0XHRcdHggPSBhLnggKyBkeCAqIChtaW4ueSAtIGEueSkgLyBkeTtcclxuXHRcdFx0eSA9IG1pbi55O1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoY29kZSAmIDIpIHsgLy8gcmlnaHRcclxuXHRcdFx0eCA9IG1heC54O1xyXG5cdFx0XHR5ID0gYS55ICsgZHkgKiAobWF4LnggLSBhLngpIC8gZHg7XHJcblxyXG5cdFx0fSBlbHNlIGlmIChjb2RlICYgMSkgeyAvLyBsZWZ0XHJcblx0XHRcdHggPSBtaW4ueDtcclxuXHRcdFx0eSA9IGEueSArIGR5ICogKG1pbi54IC0gYS54KSAvIGR4O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBuZXcgTC5Qb2ludCh4LCB5LCByb3VuZCk7XHJcblx0fSxcclxuXHJcblx0X2dldEJpdENvZGU6IGZ1bmN0aW9uIChwLCBib3VuZHMpIHtcclxuXHRcdHZhciBjb2RlID0gMDtcclxuXHJcblx0XHRpZiAocC54IDwgYm91bmRzLm1pbi54KSB7IC8vIGxlZnRcclxuXHRcdFx0Y29kZSB8PSAxO1xyXG5cdFx0fSBlbHNlIGlmIChwLnggPiBib3VuZHMubWF4LngpIHsgLy8gcmlnaHRcclxuXHRcdFx0Y29kZSB8PSAyO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChwLnkgPCBib3VuZHMubWluLnkpIHsgLy8gYm90dG9tXHJcblx0XHRcdGNvZGUgfD0gNDtcclxuXHRcdH0gZWxzZSBpZiAocC55ID4gYm91bmRzLm1heC55KSB7IC8vIHRvcFxyXG5cdFx0XHRjb2RlIHw9IDg7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGNvZGU7XHJcblx0fSxcclxuXHJcblx0Ly8gc3F1YXJlIGRpc3RhbmNlICh0byBhdm9pZCB1bm5lY2Vzc2FyeSBNYXRoLnNxcnQgY2FsbHMpXHJcblx0X3NxRGlzdDogZnVuY3Rpb24gKHAxLCBwMikge1xyXG5cdFx0dmFyIGR4ID0gcDIueCAtIHAxLngsXHJcblx0XHQgICAgZHkgPSBwMi55IC0gcDEueTtcclxuXHRcdHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeTtcclxuXHR9LFxyXG5cclxuXHQvLyByZXR1cm4gY2xvc2VzdCBwb2ludCBvbiBzZWdtZW50IG9yIGRpc3RhbmNlIHRvIHRoYXQgcG9pbnRcclxuXHRfc3FDbG9zZXN0UG9pbnRPblNlZ21lbnQ6IGZ1bmN0aW9uIChwLCBwMSwgcDIsIHNxRGlzdCkge1xyXG5cdFx0dmFyIHggPSBwMS54LFxyXG5cdFx0ICAgIHkgPSBwMS55LFxyXG5cdFx0ICAgIGR4ID0gcDIueCAtIHgsXHJcblx0XHQgICAgZHkgPSBwMi55IC0geSxcclxuXHRcdCAgICBkb3QgPSBkeCAqIGR4ICsgZHkgKiBkeSxcclxuXHRcdCAgICB0O1xyXG5cclxuXHRcdGlmIChkb3QgPiAwKSB7XHJcblx0XHRcdHQgPSAoKHAueCAtIHgpICogZHggKyAocC55IC0geSkgKiBkeSkgLyBkb3Q7XHJcblxyXG5cdFx0XHRpZiAodCA+IDEpIHtcclxuXHRcdFx0XHR4ID0gcDIueDtcclxuXHRcdFx0XHR5ID0gcDIueTtcclxuXHRcdFx0fSBlbHNlIGlmICh0ID4gMCkge1xyXG5cdFx0XHRcdHggKz0gZHggKiB0O1xyXG5cdFx0XHRcdHkgKz0gZHkgKiB0O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0ZHggPSBwLnggLSB4O1xyXG5cdFx0ZHkgPSBwLnkgLSB5O1xyXG5cclxuXHRcdHJldHVybiBzcURpc3QgPyBkeCAqIGR4ICsgZHkgKiBkeSA6IG5ldyBMLlBvaW50KHgsIHkpO1xyXG5cdH1cclxufTtcclxuXG5cblxuLypcbiAqIEwuUG9seWxpbmUgaW1wbGVtZW50cyBwb2x5bGluZSB2ZWN0b3IgbGF5ZXIgKGEgc2V0IG9mIHBvaW50cyBjb25uZWN0ZWQgd2l0aCBsaW5lcylcbiAqL1xuXG5MLlBvbHlsaW5lID0gTC5QYXRoLmV4dGVuZCh7XG5cblx0b3B0aW9uczoge1xuXHRcdC8vIGhvdyBtdWNoIHRvIHNpbXBsaWZ5IHRoZSBwb2x5bGluZSBvbiBlYWNoIHpvb20gbGV2ZWxcblx0XHQvLyBtb3JlID0gYmV0dGVyIHBlcmZvcm1hbmNlIGFuZCBzbW9vdGhlciBsb29rLCBsZXNzID0gbW9yZSBhY2N1cmF0ZVxuXHRcdHNtb290aEZhY3RvcjogMS4wXG5cdFx0Ly8gbm9DbGlwOiBmYWxzZVxuXHR9LFxuXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIChsYXRsbmdzLCBvcHRpb25zKSB7XG5cdFx0TC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuXHRcdHRoaXMuX3NldExhdExuZ3MobGF0bG5ncyk7XG5cdH0sXG5cblx0Z2V0TGF0TG5nczogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLl9sYXRsbmdzO1xuXHR9LFxuXG5cdHNldExhdExuZ3M6IGZ1bmN0aW9uIChsYXRsbmdzKSB7XG5cdFx0dGhpcy5fc2V0TGF0TG5ncyhsYXRsbmdzKTtcblx0XHRyZXR1cm4gdGhpcy5yZWRyYXcoKTtcblx0fSxcblxuXHRpc0VtcHR5OiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuICF0aGlzLl9sYXRsbmdzLmxlbmd0aDtcblx0fSxcblxuXHRjbG9zZXN0TGF5ZXJQb2ludDogZnVuY3Rpb24gKHApIHtcblx0XHR2YXIgbWluRGlzdGFuY2UgPSBJbmZpbml0eSxcblx0XHQgICAgbWluUG9pbnQgPSBudWxsLFxuXHRcdCAgICBjbG9zZXN0ID0gTC5MaW5lVXRpbC5fc3FDbG9zZXN0UG9pbnRPblNlZ21lbnQsXG5cdFx0ICAgIHAxLCBwMjtcblxuXHRcdGZvciAodmFyIGogPSAwLCBqTGVuID0gdGhpcy5fcGFydHMubGVuZ3RoOyBqIDwgakxlbjsgaisrKSB7XG5cdFx0XHR2YXIgcG9pbnRzID0gdGhpcy5fcGFydHNbal07XG5cblx0XHRcdGZvciAodmFyIGkgPSAxLCBsZW4gPSBwb2ludHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdFx0cDEgPSBwb2ludHNbaSAtIDFdO1xuXHRcdFx0XHRwMiA9IHBvaW50c1tpXTtcblxuXHRcdFx0XHR2YXIgc3FEaXN0ID0gY2xvc2VzdChwLCBwMSwgcDIsIHRydWUpO1xuXG5cdFx0XHRcdGlmIChzcURpc3QgPCBtaW5EaXN0YW5jZSkge1xuXHRcdFx0XHRcdG1pbkRpc3RhbmNlID0gc3FEaXN0O1xuXHRcdFx0XHRcdG1pblBvaW50ID0gY2xvc2VzdChwLCBwMSwgcDIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChtaW5Qb2ludCkge1xuXHRcdFx0bWluUG9pbnQuZGlzdGFuY2UgPSBNYXRoLnNxcnQobWluRGlzdGFuY2UpO1xuXHRcdH1cblx0XHRyZXR1cm4gbWluUG9pbnQ7XG5cdH0sXG5cblx0Z2V0Q2VudGVyOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGksIGhhbGZEaXN0LCBzZWdEaXN0LCBkaXN0LCBwMSwgcDIsIHJhdGlvLFxuXHRcdCAgICBwb2ludHMgPSB0aGlzLl9yaW5nc1swXSxcblx0XHQgICAgbGVuID0gcG9pbnRzLmxlbmd0aDtcblxuXHRcdGlmICghbGVuKSB7IHJldHVybiBudWxsOyB9XG5cblx0XHQvLyBwb2x5bGluZSBjZW50cm9pZCBhbGdvcml0aG07IG9ubHkgdXNlcyB0aGUgZmlyc3QgcmluZyBpZiB0aGVyZSBhcmUgbXVsdGlwbGVcblxuXHRcdGZvciAoaSA9IDAsIGhhbGZEaXN0ID0gMDsgaSA8IGxlbiAtIDE7IGkrKykge1xuXHRcdFx0aGFsZkRpc3QgKz0gcG9pbnRzW2ldLmRpc3RhbmNlVG8ocG9pbnRzW2kgKyAxXSkgLyAyO1xuXHRcdH1cblxuXHRcdC8vIFRoZSBsaW5lIGlzIHNvIHNtYWxsIGluIHRoZSBjdXJyZW50IHZpZXcgdGhhdCBhbGwgcG9pbnRzIGFyZSBvbiB0aGUgc2FtZSBwaXhlbC5cblx0XHRpZiAoaGFsZkRpc3QgPT09IDApIHtcblx0XHRcdHJldHVybiB0aGlzLl9tYXAubGF5ZXJQb2ludFRvTGF0TG5nKHBvaW50c1swXSk7XG5cdFx0fVxuXG5cdFx0Zm9yIChpID0gMCwgZGlzdCA9IDA7IGkgPCBsZW4gLSAxOyBpKyspIHtcblx0XHRcdHAxID0gcG9pbnRzW2ldO1xuXHRcdFx0cDIgPSBwb2ludHNbaSArIDFdO1xuXHRcdFx0c2VnRGlzdCA9IHAxLmRpc3RhbmNlVG8ocDIpO1xuXHRcdFx0ZGlzdCArPSBzZWdEaXN0O1xuXG5cdFx0XHRpZiAoZGlzdCA+IGhhbGZEaXN0KSB7XG5cdFx0XHRcdHJhdGlvID0gKGRpc3QgLSBoYWxmRGlzdCkgLyBzZWdEaXN0O1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fbWFwLmxheWVyUG9pbnRUb0xhdExuZyhbXG5cdFx0XHRcdFx0cDIueCAtIHJhdGlvICogKHAyLnggLSBwMS54KSxcblx0XHRcdFx0XHRwMi55IC0gcmF0aW8gKiAocDIueSAtIHAxLnkpXG5cdFx0XHRcdF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRnZXRCb3VuZHM6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5fYm91bmRzO1xuXHR9LFxuXG5cdGFkZExhdExuZzogZnVuY3Rpb24gKGxhdGxuZywgbGF0bG5ncykge1xuXHRcdGxhdGxuZ3MgPSBsYXRsbmdzIHx8IHRoaXMuX2RlZmF1bHRTaGFwZSgpO1xuXHRcdGxhdGxuZyA9IEwubGF0TG5nKGxhdGxuZyk7XG5cdFx0bGF0bG5ncy5wdXNoKGxhdGxuZyk7XG5cdFx0dGhpcy5fYm91bmRzLmV4dGVuZChsYXRsbmcpO1xuXHRcdHJldHVybiB0aGlzLnJlZHJhdygpO1xuXHR9LFxuXG5cdF9zZXRMYXRMbmdzOiBmdW5jdGlvbiAobGF0bG5ncykge1xuXHRcdHRoaXMuX2JvdW5kcyA9IG5ldyBMLkxhdExuZ0JvdW5kcygpO1xuXHRcdHRoaXMuX2xhdGxuZ3MgPSB0aGlzLl9jb252ZXJ0TGF0TG5ncyhsYXRsbmdzKTtcblx0fSxcblxuXHRfZGVmYXVsdFNoYXBlOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIEwuUG9seWxpbmUuX2ZsYXQodGhpcy5fbGF0bG5ncykgPyB0aGlzLl9sYXRsbmdzIDogdGhpcy5fbGF0bG5nc1swXTtcblx0fSxcblxuXHQvLyByZWN1cnNpdmVseSBjb252ZXJ0IGxhdGxuZ3MgaW5wdXQgaW50byBhY3R1YWwgTGF0TG5nIGluc3RhbmNlczsgY2FsY3VsYXRlIGJvdW5kcyBhbG9uZyB0aGUgd2F5XG5cdF9jb252ZXJ0TGF0TG5nczogZnVuY3Rpb24gKGxhdGxuZ3MpIHtcblx0XHR2YXIgcmVzdWx0ID0gW10sXG5cdFx0ICAgIGZsYXQgPSBMLlBvbHlsaW5lLl9mbGF0KGxhdGxuZ3MpO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IGxhdGxuZ3MubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGlmIChmbGF0KSB7XG5cdFx0XHRcdHJlc3VsdFtpXSA9IEwubGF0TG5nKGxhdGxuZ3NbaV0pO1xuXHRcdFx0XHR0aGlzLl9ib3VuZHMuZXh0ZW5kKHJlc3VsdFtpXSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXN1bHRbaV0gPSB0aGlzLl9jb252ZXJ0TGF0TG5ncyhsYXRsbmdzW2ldKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdF9wcm9qZWN0OiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fcmluZ3MgPSBbXTtcblx0XHR0aGlzLl9wcm9qZWN0TGF0bG5ncyh0aGlzLl9sYXRsbmdzLCB0aGlzLl9yaW5ncyk7XG5cblx0XHQvLyBwcm9qZWN0IGJvdW5kcyBhcyB3ZWxsIHRvIHVzZSBsYXRlciBmb3IgQ2FudmFzIGhpdCBkZXRlY3Rpb24vZXRjLlxuXHRcdHZhciB3ID0gdGhpcy5fY2xpY2tUb2xlcmFuY2UoKSxcblx0XHQgICAgcCA9IG5ldyBMLlBvaW50KHcsIC13KTtcblxuXHRcdGlmICh0aGlzLl9ib3VuZHMuaXNWYWxpZCgpKSB7XG5cdFx0XHR0aGlzLl9weEJvdW5kcyA9IG5ldyBMLkJvdW5kcyhcblx0XHRcdFx0dGhpcy5fbWFwLmxhdExuZ1RvTGF5ZXJQb2ludCh0aGlzLl9ib3VuZHMuZ2V0U291dGhXZXN0KCkpLl9zdWJ0cmFjdChwKSxcblx0XHRcdFx0dGhpcy5fbWFwLmxhdExuZ1RvTGF5ZXJQb2ludCh0aGlzLl9ib3VuZHMuZ2V0Tm9ydGhFYXN0KCkpLl9hZGQocCkpO1xuXHRcdH1cblx0fSxcblxuXHQvLyByZWN1cnNpdmVseSB0dXJucyBsYXRsbmdzIGludG8gYSBzZXQgb2YgcmluZ3Mgd2l0aCBwcm9qZWN0ZWQgY29vcmRpbmF0ZXNcblx0X3Byb2plY3RMYXRsbmdzOiBmdW5jdGlvbiAobGF0bG5ncywgcmVzdWx0KSB7XG5cblx0XHR2YXIgZmxhdCA9IGxhdGxuZ3NbMF0gaW5zdGFuY2VvZiBMLkxhdExuZyxcblx0XHQgICAgbGVuID0gbGF0bG5ncy5sZW5ndGgsXG5cdFx0ICAgIGksIHJpbmc7XG5cblx0XHRpZiAoZmxhdCkge1xuXHRcdFx0cmluZyA9IFtdO1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRcdHJpbmdbaV0gPSB0aGlzLl9tYXAubGF0TG5nVG9MYXllclBvaW50KGxhdGxuZ3NbaV0pO1xuXHRcdFx0fVxuXHRcdFx0cmVzdWx0LnB1c2gocmluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0XHR0aGlzLl9wcm9qZWN0TGF0bG5ncyhsYXRsbmdzW2ldLCByZXN1bHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHQvLyBjbGlwIHBvbHlsaW5lIGJ5IHJlbmRlcmVyIGJvdW5kcyBzbyB0aGF0IHdlIGhhdmUgbGVzcyB0byByZW5kZXIgZm9yIHBlcmZvcm1hbmNlXG5cdF9jbGlwUG9pbnRzOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGJvdW5kcyA9IHRoaXMuX3JlbmRlcmVyLl9ib3VuZHM7XG5cblx0XHR0aGlzLl9wYXJ0cyA9IFtdO1xuXHRcdGlmICghdGhpcy5fcHhCb3VuZHMgfHwgIXRoaXMuX3B4Qm91bmRzLmludGVyc2VjdHMoYm91bmRzKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLm9wdGlvbnMubm9DbGlwKSB7XG5cdFx0XHR0aGlzLl9wYXJ0cyA9IHRoaXMuX3JpbmdzO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHZhciBwYXJ0cyA9IHRoaXMuX3BhcnRzLFxuXHRcdCAgICBpLCBqLCBrLCBsZW4sIGxlbjIsIHNlZ21lbnQsIHBvaW50cztcblxuXHRcdGZvciAoaSA9IDAsIGsgPSAwLCBsZW4gPSB0aGlzLl9yaW5ncy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0cG9pbnRzID0gdGhpcy5fcmluZ3NbaV07XG5cblx0XHRcdGZvciAoaiA9IDAsIGxlbjIgPSBwb2ludHMubGVuZ3RoOyBqIDwgbGVuMiAtIDE7IGorKykge1xuXHRcdFx0XHRzZWdtZW50ID0gTC5MaW5lVXRpbC5jbGlwU2VnbWVudChwb2ludHNbal0sIHBvaW50c1tqICsgMV0sIGJvdW5kcywgaiwgdHJ1ZSk7XG5cblx0XHRcdFx0aWYgKCFzZWdtZW50KSB7IGNvbnRpbnVlOyB9XG5cblx0XHRcdFx0cGFydHNba10gPSBwYXJ0c1trXSB8fCBbXTtcblx0XHRcdFx0cGFydHNba10ucHVzaChzZWdtZW50WzBdKTtcblxuXHRcdFx0XHQvLyBpZiBzZWdtZW50IGdvZXMgb3V0IG9mIHNjcmVlbiwgb3IgaXQncyB0aGUgbGFzdCBvbmUsIGl0J3MgdGhlIGVuZCBvZiB0aGUgbGluZSBwYXJ0XG5cdFx0XHRcdGlmICgoc2VnbWVudFsxXSAhPT0gcG9pbnRzW2ogKyAxXSkgfHwgKGogPT09IGxlbjIgLSAyKSkge1xuXHRcdFx0XHRcdHBhcnRzW2tdLnB1c2goc2VnbWVudFsxXSk7XG5cdFx0XHRcdFx0aysrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdC8vIHNpbXBsaWZ5IGVhY2ggY2xpcHBlZCBwYXJ0IG9mIHRoZSBwb2x5bGluZSBmb3IgcGVyZm9ybWFuY2Vcblx0X3NpbXBsaWZ5UG9pbnRzOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHBhcnRzID0gdGhpcy5fcGFydHMsXG5cdFx0ICAgIHRvbGVyYW5jZSA9IHRoaXMub3B0aW9ucy5zbW9vdGhGYWN0b3I7XG5cblx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gcGFydHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdHBhcnRzW2ldID0gTC5MaW5lVXRpbC5zaW1wbGlmeShwYXJ0c1tpXSwgdG9sZXJhbmNlKTtcblx0XHR9XG5cdH0sXG5cblx0X3VwZGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdGlmICghdGhpcy5fbWFwKSB7IHJldHVybjsgfVxuXG5cdFx0dGhpcy5fY2xpcFBvaW50cygpO1xuXHRcdHRoaXMuX3NpbXBsaWZ5UG9pbnRzKCk7XG5cdFx0dGhpcy5fdXBkYXRlUGF0aCgpO1xuXHR9LFxuXG5cdF91cGRhdGVQYXRoOiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fcmVuZGVyZXIuX3VwZGF0ZVBvbHkodGhpcyk7XG5cdH1cbn0pO1xuXG5MLnBvbHlsaW5lID0gZnVuY3Rpb24gKGxhdGxuZ3MsIG9wdGlvbnMpIHtcblx0cmV0dXJuIG5ldyBMLlBvbHlsaW5lKGxhdGxuZ3MsIG9wdGlvbnMpO1xufTtcblxuTC5Qb2x5bGluZS5fZmxhdCA9IGZ1bmN0aW9uIChsYXRsbmdzKSB7XG5cdC8vIHRydWUgaWYgaXQncyBhIGZsYXQgYXJyYXkgb2YgbGF0bG5nczsgZmFsc2UgaWYgbmVzdGVkXG5cdHJldHVybiAhTC5VdGlsLmlzQXJyYXkobGF0bG5nc1swXSkgfHwgKHR5cGVvZiBsYXRsbmdzWzBdWzBdICE9PSAnb2JqZWN0JyAmJiB0eXBlb2YgbGF0bG5nc1swXVswXSAhPT0gJ3VuZGVmaW5lZCcpO1xufTtcblxuXG5cbi8qXHJcbiAqIEwuUG9seVV0aWwgY29udGFpbnMgdXRpbGl0eSBmdW5jdGlvbnMgZm9yIHBvbHlnb25zIChjbGlwcGluZywgZXRjLikuXHJcbiAqL1xyXG5cclxuTC5Qb2x5VXRpbCA9IHt9O1xyXG5cclxuLypcclxuICogU3V0aGVybGFuZC1Ib2RnZW1hbiBwb2x5Z29uIGNsaXBwaW5nIGFsZ29yaXRobS5cclxuICogVXNlZCB0byBhdm9pZCByZW5kZXJpbmcgcGFydHMgb2YgYSBwb2x5Z29uIHRoYXQgYXJlIG5vdCBjdXJyZW50bHkgdmlzaWJsZS5cclxuICovXHJcbkwuUG9seVV0aWwuY2xpcFBvbHlnb24gPSBmdW5jdGlvbiAocG9pbnRzLCBib3VuZHMsIHJvdW5kKSB7XHJcblx0dmFyIGNsaXBwZWRQb2ludHMsXHJcblx0ICAgIGVkZ2VzID0gWzEsIDQsIDIsIDhdLFxyXG5cdCAgICBpLCBqLCBrLFxyXG5cdCAgICBhLCBiLFxyXG5cdCAgICBsZW4sIGVkZ2UsIHAsXHJcblx0ICAgIGx1ID0gTC5MaW5lVXRpbDtcclxuXHJcblx0Zm9yIChpID0gMCwgbGVuID0gcG9pbnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRwb2ludHNbaV0uX2NvZGUgPSBsdS5fZ2V0Qml0Q29kZShwb2ludHNbaV0sIGJvdW5kcyk7XHJcblx0fVxyXG5cclxuXHQvLyBmb3IgZWFjaCBlZGdlIChsZWZ0LCBib3R0b20sIHJpZ2h0LCB0b3ApXHJcblx0Zm9yIChrID0gMDsgayA8IDQ7IGsrKykge1xyXG5cdFx0ZWRnZSA9IGVkZ2VzW2tdO1xyXG5cdFx0Y2xpcHBlZFBvaW50cyA9IFtdO1xyXG5cclxuXHRcdGZvciAoaSA9IDAsIGxlbiA9IHBvaW50cy5sZW5ndGgsIGogPSBsZW4gLSAxOyBpIDwgbGVuOyBqID0gaSsrKSB7XHJcblx0XHRcdGEgPSBwb2ludHNbaV07XHJcblx0XHRcdGIgPSBwb2ludHNbal07XHJcblxyXG5cdFx0XHQvLyBpZiBhIGlzIGluc2lkZSB0aGUgY2xpcCB3aW5kb3dcclxuXHRcdFx0aWYgKCEoYS5fY29kZSAmIGVkZ2UpKSB7XHJcblx0XHRcdFx0Ly8gaWYgYiBpcyBvdXRzaWRlIHRoZSBjbGlwIHdpbmRvdyAoYS0+YiBnb2VzIG91dCBvZiBzY3JlZW4pXHJcblx0XHRcdFx0aWYgKGIuX2NvZGUgJiBlZGdlKSB7XHJcblx0XHRcdFx0XHRwID0gbHUuX2dldEVkZ2VJbnRlcnNlY3Rpb24oYiwgYSwgZWRnZSwgYm91bmRzLCByb3VuZCk7XHJcblx0XHRcdFx0XHRwLl9jb2RlID0gbHUuX2dldEJpdENvZGUocCwgYm91bmRzKTtcclxuXHRcdFx0XHRcdGNsaXBwZWRQb2ludHMucHVzaChwKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y2xpcHBlZFBvaW50cy5wdXNoKGEpO1xyXG5cclxuXHRcdFx0Ly8gZWxzZSBpZiBiIGlzIGluc2lkZSB0aGUgY2xpcCB3aW5kb3cgKGEtPmIgZW50ZXJzIHRoZSBzY3JlZW4pXHJcblx0XHRcdH0gZWxzZSBpZiAoIShiLl9jb2RlICYgZWRnZSkpIHtcclxuXHRcdFx0XHRwID0gbHUuX2dldEVkZ2VJbnRlcnNlY3Rpb24oYiwgYSwgZWRnZSwgYm91bmRzLCByb3VuZCk7XHJcblx0XHRcdFx0cC5fY29kZSA9IGx1Ll9nZXRCaXRDb2RlKHAsIGJvdW5kcyk7XHJcblx0XHRcdFx0Y2xpcHBlZFBvaW50cy5wdXNoKHApO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRwb2ludHMgPSBjbGlwcGVkUG9pbnRzO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHBvaW50cztcclxufTtcclxuXG5cblxuLypcbiAqIEwuUG9seWdvbiBpbXBsZW1lbnRzIHBvbHlnb24gdmVjdG9yIGxheWVyIChjbG9zZWQgcG9seWxpbmUgd2l0aCBhIGZpbGwgaW5zaWRlKS5cbiAqL1xuXG5MLlBvbHlnb24gPSBMLlBvbHlsaW5lLmV4dGVuZCh7XG5cblx0b3B0aW9uczoge1xuXHRcdGZpbGw6IHRydWVcblx0fSxcblxuXHRpc0VtcHR5OiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuICF0aGlzLl9sYXRsbmdzLmxlbmd0aCB8fCAhdGhpcy5fbGF0bG5nc1swXS5sZW5ndGg7XG5cdH0sXG5cblx0Z2V0Q2VudGVyOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGksIGosIHAxLCBwMiwgZiwgYXJlYSwgeCwgeSwgY2VudGVyLFxuXHRcdCAgICBwb2ludHMgPSB0aGlzLl9yaW5nc1swXSxcblx0XHQgICAgbGVuID0gcG9pbnRzLmxlbmd0aDtcblxuXHRcdGlmICghbGVuKSB7IHJldHVybiBudWxsOyB9XG5cblx0XHQvLyBwb2x5Z29uIGNlbnRyb2lkIGFsZ29yaXRobTsgb25seSB1c2VzIHRoZSBmaXJzdCByaW5nIGlmIHRoZXJlIGFyZSBtdWx0aXBsZVxuXG5cdFx0YXJlYSA9IHggPSB5ID0gMDtcblxuXHRcdGZvciAoaSA9IDAsIGogPSBsZW4gLSAxOyBpIDwgbGVuOyBqID0gaSsrKSB7XG5cdFx0XHRwMSA9IHBvaW50c1tpXTtcblx0XHRcdHAyID0gcG9pbnRzW2pdO1xuXG5cdFx0XHRmID0gcDEueSAqIHAyLnggLSBwMi55ICogcDEueDtcblx0XHRcdHggKz0gKHAxLnggKyBwMi54KSAqIGY7XG5cdFx0XHR5ICs9IChwMS55ICsgcDIueSkgKiBmO1xuXHRcdFx0YXJlYSArPSBmICogMztcblx0XHR9XG5cblx0XHRpZiAoYXJlYSA9PT0gMCkge1xuXHRcdFx0Ly8gUG9seWdvbiBpcyBzbyBzbWFsbCB0aGF0IGFsbCBwb2ludHMgYXJlIG9uIHNhbWUgcGl4ZWwuXG5cdFx0XHRjZW50ZXIgPSBwb2ludHNbMF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNlbnRlciA9IFt4IC8gYXJlYSwgeSAvIGFyZWFdO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fbWFwLmxheWVyUG9pbnRUb0xhdExuZyhjZW50ZXIpO1xuXHR9LFxuXG5cdF9jb252ZXJ0TGF0TG5nczogZnVuY3Rpb24gKGxhdGxuZ3MpIHtcblx0XHR2YXIgcmVzdWx0ID0gTC5Qb2x5bGluZS5wcm90b3R5cGUuX2NvbnZlcnRMYXRMbmdzLmNhbGwodGhpcywgbGF0bG5ncyksXG5cdFx0ICAgIGxlbiA9IHJlc3VsdC5sZW5ndGg7XG5cblx0XHQvLyByZW1vdmUgbGFzdCBwb2ludCBpZiBpdCBlcXVhbHMgZmlyc3Qgb25lXG5cdFx0aWYgKGxlbiA+PSAyICYmIHJlc3VsdFswXSBpbnN0YW5jZW9mIEwuTGF0TG5nICYmIHJlc3VsdFswXS5lcXVhbHMocmVzdWx0W2xlbiAtIDFdKSkge1xuXHRcdFx0cmVzdWx0LnBvcCgpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdF9zZXRMYXRMbmdzOiBmdW5jdGlvbiAobGF0bG5ncykge1xuXHRcdEwuUG9seWxpbmUucHJvdG90eXBlLl9zZXRMYXRMbmdzLmNhbGwodGhpcywgbGF0bG5ncyk7XG5cdFx0aWYgKEwuUG9seWxpbmUuX2ZsYXQodGhpcy5fbGF0bG5ncykpIHtcblx0XHRcdHRoaXMuX2xhdGxuZ3MgPSBbdGhpcy5fbGF0bG5nc107XG5cdFx0fVxuXHR9LFxuXG5cdF9kZWZhdWx0U2hhcGU6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gTC5Qb2x5bGluZS5fZmxhdCh0aGlzLl9sYXRsbmdzWzBdKSA/IHRoaXMuX2xhdGxuZ3NbMF0gOiB0aGlzLl9sYXRsbmdzWzBdWzBdO1xuXHR9LFxuXG5cdF9jbGlwUG9pbnRzOiBmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gcG9seWdvbnMgbmVlZCBhIGRpZmZlcmVudCBjbGlwcGluZyBhbGdvcml0aG0gc28gd2UgcmVkZWZpbmUgdGhhdFxuXG5cdFx0dmFyIGJvdW5kcyA9IHRoaXMuX3JlbmRlcmVyLl9ib3VuZHMsXG5cdFx0ICAgIHcgPSB0aGlzLm9wdGlvbnMud2VpZ2h0LFxuXHRcdCAgICBwID0gbmV3IEwuUG9pbnQodywgdyk7XG5cblx0XHQvLyBpbmNyZWFzZSBjbGlwIHBhZGRpbmcgYnkgc3Ryb2tlIHdpZHRoIHRvIGF2b2lkIHN0cm9rZSBvbiBjbGlwIGVkZ2VzXG5cdFx0Ym91bmRzID0gbmV3IEwuQm91bmRzKGJvdW5kcy5taW4uc3VidHJhY3QocCksIGJvdW5kcy5tYXguYWRkKHApKTtcblxuXHRcdHRoaXMuX3BhcnRzID0gW107XG5cdFx0aWYgKCF0aGlzLl9weEJvdW5kcyB8fCAhdGhpcy5fcHhCb3VuZHMuaW50ZXJzZWN0cyhib3VuZHMpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5ub0NsaXApIHtcblx0XHRcdHRoaXMuX3BhcnRzID0gdGhpcy5fcmluZ3M7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMuX3JpbmdzLmxlbmd0aCwgY2xpcHBlZDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRjbGlwcGVkID0gTC5Qb2x5VXRpbC5jbGlwUG9seWdvbih0aGlzLl9yaW5nc1tpXSwgYm91bmRzLCB0cnVlKTtcblx0XHRcdGlmIChjbGlwcGVkLmxlbmd0aCkge1xuXHRcdFx0XHR0aGlzLl9wYXJ0cy5wdXNoKGNsaXBwZWQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRfdXBkYXRlUGF0aDogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuX3JlbmRlcmVyLl91cGRhdGVQb2x5KHRoaXMsIHRydWUpO1xuXHR9XG59KTtcblxuTC5wb2x5Z29uID0gZnVuY3Rpb24gKGxhdGxuZ3MsIG9wdGlvbnMpIHtcblx0cmV0dXJuIG5ldyBMLlBvbHlnb24obGF0bG5ncywgb3B0aW9ucyk7XG59O1xuXG5cblxuLypcbiAqIEwuUmVjdGFuZ2xlIGV4dGVuZHMgUG9seWdvbiBhbmQgY3JlYXRlcyBhIHJlY3RhbmdsZSB3aGVuIHBhc3NlZCBhIExhdExuZ0JvdW5kcyBvYmplY3QuXG4gKi9cblxuTC5SZWN0YW5nbGUgPSBMLlBvbHlnb24uZXh0ZW5kKHtcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKGxhdExuZ0JvdW5kcywgb3B0aW9ucykge1xuXHRcdEwuUG9seWdvbi5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIHRoaXMuX2JvdW5kc1RvTGF0TG5ncyhsYXRMbmdCb3VuZHMpLCBvcHRpb25zKTtcblx0fSxcblxuXHRzZXRCb3VuZHM6IGZ1bmN0aW9uIChsYXRMbmdCb3VuZHMpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRMYXRMbmdzKHRoaXMuX2JvdW5kc1RvTGF0TG5ncyhsYXRMbmdCb3VuZHMpKTtcblx0fSxcblxuXHRfYm91bmRzVG9MYXRMbmdzOiBmdW5jdGlvbiAobGF0TG5nQm91bmRzKSB7XG5cdFx0bGF0TG5nQm91bmRzID0gTC5sYXRMbmdCb3VuZHMobGF0TG5nQm91bmRzKTtcblx0XHRyZXR1cm4gW1xuXHRcdFx0bGF0TG5nQm91bmRzLmdldFNvdXRoV2VzdCgpLFxuXHRcdFx0bGF0TG5nQm91bmRzLmdldE5vcnRoV2VzdCgpLFxuXHRcdFx0bGF0TG5nQm91bmRzLmdldE5vcnRoRWFzdCgpLFxuXHRcdFx0bGF0TG5nQm91bmRzLmdldFNvdXRoRWFzdCgpXG5cdFx0XTtcblx0fVxufSk7XG5cbkwucmVjdGFuZ2xlID0gZnVuY3Rpb24gKGxhdExuZ0JvdW5kcywgb3B0aW9ucykge1xuXHRyZXR1cm4gbmV3IEwuUmVjdGFuZ2xlKGxhdExuZ0JvdW5kcywgb3B0aW9ucyk7XG59O1xuXG5cblxuLypcbiAqIEwuQ2lyY2xlTWFya2VyIGlzIGEgY2lyY2xlIG92ZXJsYXkgd2l0aCBhIHBlcm1hbmVudCBwaXhlbCByYWRpdXMuXG4gKi9cblxuTC5DaXJjbGVNYXJrZXIgPSBMLlBhdGguZXh0ZW5kKHtcblxuXHRvcHRpb25zOiB7XG5cdFx0ZmlsbDogdHJ1ZSxcblx0XHRyYWRpdXM6IDEwXG5cdH0sXG5cblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKGxhdGxuZywgb3B0aW9ucykge1xuXHRcdEwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcblx0XHR0aGlzLl9sYXRsbmcgPSBMLmxhdExuZyhsYXRsbmcpO1xuXHRcdHRoaXMuX3JhZGl1cyA9IHRoaXMub3B0aW9ucy5yYWRpdXM7XG5cdH0sXG5cblx0c2V0TGF0TG5nOiBmdW5jdGlvbiAobGF0bG5nKSB7XG5cdFx0dGhpcy5fbGF0bG5nID0gTC5sYXRMbmcobGF0bG5nKTtcblx0XHR0aGlzLnJlZHJhdygpO1xuXHRcdHJldHVybiB0aGlzLmZpcmUoJ21vdmUnLCB7bGF0bG5nOiB0aGlzLl9sYXRsbmd9KTtcblx0fSxcblxuXHRnZXRMYXRMbmc6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5fbGF0bG5nO1xuXHR9LFxuXG5cdHNldFJhZGl1czogZnVuY3Rpb24gKHJhZGl1cykge1xuXHRcdHRoaXMub3B0aW9ucy5yYWRpdXMgPSB0aGlzLl9yYWRpdXMgPSByYWRpdXM7XG5cdFx0cmV0dXJuIHRoaXMucmVkcmF3KCk7XG5cdH0sXG5cblx0Z2V0UmFkaXVzOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3JhZGl1cztcblx0fSxcblxuXHRzZXRTdHlsZSA6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdFx0dmFyIHJhZGl1cyA9IG9wdGlvbnMgJiYgb3B0aW9ucy5yYWRpdXMgfHwgdGhpcy5fcmFkaXVzO1xuXHRcdEwuUGF0aC5wcm90b3R5cGUuc2V0U3R5bGUuY2FsbCh0aGlzLCBvcHRpb25zKTtcblx0XHR0aGlzLnNldFJhZGl1cyhyYWRpdXMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdF9wcm9qZWN0OiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fcG9pbnQgPSB0aGlzLl9tYXAubGF0TG5nVG9MYXllclBvaW50KHRoaXMuX2xhdGxuZyk7XG5cdFx0dGhpcy5fdXBkYXRlQm91bmRzKCk7XG5cdH0sXG5cblx0X3VwZGF0ZUJvdW5kczogZnVuY3Rpb24gKCkge1xuXHRcdHZhciByID0gdGhpcy5fcmFkaXVzLFxuXHRcdCAgICByMiA9IHRoaXMuX3JhZGl1c1kgfHwgcixcblx0XHQgICAgdyA9IHRoaXMuX2NsaWNrVG9sZXJhbmNlKCksXG5cdFx0ICAgIHAgPSBbciArIHcsIHIyICsgd107XG5cdFx0dGhpcy5fcHhCb3VuZHMgPSBuZXcgTC5Cb3VuZHModGhpcy5fcG9pbnQuc3VidHJhY3QocCksIHRoaXMuX3BvaW50LmFkZChwKSk7XG5cdH0sXG5cblx0X3VwZGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0aGlzLl9tYXApIHtcblx0XHRcdHRoaXMuX3VwZGF0ZVBhdGgoKTtcblx0XHR9XG5cdH0sXG5cblx0X3VwZGF0ZVBhdGg6IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLl9yZW5kZXJlci5fdXBkYXRlQ2lyY2xlKHRoaXMpO1xuXHR9LFxuXG5cdF9lbXB0eTogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLl9yYWRpdXMgJiYgIXRoaXMuX3JlbmRlcmVyLl9ib3VuZHMuaW50ZXJzZWN0cyh0aGlzLl9weEJvdW5kcyk7XG5cdH1cbn0pO1xuXG5MLmNpcmNsZU1hcmtlciA9IGZ1bmN0aW9uIChsYXRsbmcsIG9wdGlvbnMpIHtcblx0cmV0dXJuIG5ldyBMLkNpcmNsZU1hcmtlcihsYXRsbmcsIG9wdGlvbnMpO1xufTtcblxuXG5cbi8qXG4gKiBMLkNpcmNsZSBpcyBhIGNpcmNsZSBvdmVybGF5ICh3aXRoIGEgY2VydGFpbiByYWRpdXMgaW4gbWV0ZXJzKS5cbiAqIEl0J3MgYW4gYXBwcm94aW1hdGlvbiBhbmQgc3RhcnRzIHRvIGRpdmVyZ2UgZnJvbSBhIHJlYWwgY2lyY2xlIGNsb3NlciB0byBwb2xlcyAoZHVlIHRvIHByb2plY3Rpb24gZGlzdG9ydGlvbilcbiAqL1xuXG5MLkNpcmNsZSA9IEwuQ2lyY2xlTWFya2VyLmV4dGVuZCh7XG5cblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKGxhdGxuZywgb3B0aW9ucykge1xuXHRcdEwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcblx0XHR0aGlzLl9sYXRsbmcgPSBMLmxhdExuZyhsYXRsbmcpO1xuXHRcdHRoaXMuX21SYWRpdXMgPSB0aGlzLm9wdGlvbnMucmFkaXVzO1xuXHR9LFxuXG5cdHNldFJhZGl1czogZnVuY3Rpb24gKHJhZGl1cykge1xuXHRcdHRoaXMuX21SYWRpdXMgPSByYWRpdXM7XG5cdFx0cmV0dXJuIHRoaXMucmVkcmF3KCk7XG5cdH0sXG5cblx0Z2V0UmFkaXVzOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX21SYWRpdXM7XG5cdH0sXG5cblx0Z2V0Qm91bmRzOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGhhbGYgPSBbdGhpcy5fcmFkaXVzLCB0aGlzLl9yYWRpdXNZIHx8IHRoaXMuX3JhZGl1c107XG5cblx0XHRyZXR1cm4gbmV3IEwuTGF0TG5nQm91bmRzKFxuXHRcdFx0dGhpcy5fbWFwLmxheWVyUG9pbnRUb0xhdExuZyh0aGlzLl9wb2ludC5zdWJ0cmFjdChoYWxmKSksXG5cdFx0XHR0aGlzLl9tYXAubGF5ZXJQb2ludFRvTGF0TG5nKHRoaXMuX3BvaW50LmFkZChoYWxmKSkpO1xuXHR9LFxuXG5cdHNldFN0eWxlOiBMLlBhdGgucHJvdG90eXBlLnNldFN0eWxlLFxuXG5cdF9wcm9qZWN0OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgbG5nID0gdGhpcy5fbGF0bG5nLmxuZyxcblx0XHQgICAgbGF0ID0gdGhpcy5fbGF0bG5nLmxhdCxcblx0XHQgICAgbWFwID0gdGhpcy5fbWFwLFxuXHRcdCAgICBjcnMgPSBtYXAub3B0aW9ucy5jcnM7XG5cblx0XHRpZiAoY3JzLmRpc3RhbmNlID09PSBMLkNSUy5FYXJ0aC5kaXN0YW5jZSkge1xuXHRcdFx0dmFyIGQgPSBNYXRoLlBJIC8gMTgwLFxuXHRcdFx0ICAgIGxhdFIgPSAodGhpcy5fbVJhZGl1cyAvIEwuQ1JTLkVhcnRoLlIpIC8gZCxcblx0XHRcdCAgICB0b3AgPSBtYXAucHJvamVjdChbbGF0ICsgbGF0UiwgbG5nXSksXG5cdFx0XHQgICAgYm90dG9tID0gbWFwLnByb2plY3QoW2xhdCAtIGxhdFIsIGxuZ10pLFxuXHRcdFx0ICAgIHAgPSB0b3AuYWRkKGJvdHRvbSkuZGl2aWRlQnkoMiksXG5cdFx0XHQgICAgbGF0MiA9IG1hcC51bnByb2plY3QocCkubGF0LFxuXHRcdFx0ICAgIGxuZ1IgPSBNYXRoLmFjb3MoKE1hdGguY29zKGxhdFIgKiBkKSAtIE1hdGguc2luKGxhdCAqIGQpICogTWF0aC5zaW4obGF0MiAqIGQpKSAvXG5cdFx0XHQgICAgICAgICAgICAoTWF0aC5jb3MobGF0ICogZCkgKiBNYXRoLmNvcyhsYXQyICogZCkpKSAvIGQ7XG5cblx0XHRcdHRoaXMuX3BvaW50ID0gcC5zdWJ0cmFjdChtYXAuZ2V0UGl4ZWxPcmlnaW4oKSk7XG5cdFx0XHR0aGlzLl9yYWRpdXMgPSBpc05hTihsbmdSKSA/IDAgOiBNYXRoLm1heChNYXRoLnJvdW5kKHAueCAtIG1hcC5wcm9qZWN0KFtsYXQyLCBsbmcgLSBsbmdSXSkueCksIDEpO1xuXHRcdFx0dGhpcy5fcmFkaXVzWSA9IE1hdGgubWF4KE1hdGgucm91bmQocC55IC0gdG9wLnkpLCAxKTtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgbGF0bG5nMiA9IGNycy51bnByb2plY3QoY3JzLnByb2plY3QodGhpcy5fbGF0bG5nKS5zdWJ0cmFjdChbdGhpcy5fbVJhZGl1cywgMF0pKTtcblxuXHRcdFx0dGhpcy5fcG9pbnQgPSBtYXAubGF0TG5nVG9MYXllclBvaW50KHRoaXMuX2xhdGxuZyk7XG5cdFx0XHR0aGlzLl9yYWRpdXMgPSB0aGlzLl9wb2ludC54IC0gbWFwLmxhdExuZ1RvTGF5ZXJQb2ludChsYXRsbmcyKS54O1xuXHRcdH1cblxuXHRcdHRoaXMuX3VwZGF0ZUJvdW5kcygpO1xuXHR9XG59KTtcblxuTC5jaXJjbGUgPSBmdW5jdGlvbiAobGF0bG5nLCBvcHRpb25zLCBsZWdhY3lPcHRpb25zKSB7XG5cdGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ251bWJlcicpIHtcblx0XHQvLyBCYWNrd2FyZHMgY29tcGF0aWJpbGl0eSB3aXRoIDAuNy54IGZhY3RvcnkgKGxhdGxuZywgcmFkaXVzLCBvcHRpb25zPylcblx0XHRvcHRpb25zID0gTC5leHRlbmQoe30sIGxlZ2FjeU9wdGlvbnMsIHtyYWRpdXM6IG9wdGlvbnN9KTtcblx0fVxuXHRyZXR1cm4gbmV3IEwuQ2lyY2xlKGxhdGxuZywgb3B0aW9ucyk7XG59O1xuXG5cblxuLypcbiAqIEwuU1ZHIHJlbmRlcnMgdmVjdG9yIGxheWVycyB3aXRoIFNWRy4gQWxsIFNWRy1zcGVjaWZpYyBjb2RlIGdvZXMgaGVyZS5cbiAqL1xuXG5MLlNWRyA9IEwuUmVuZGVyZXIuZXh0ZW5kKHtcblxuXHRfaW5pdENvbnRhaW5lcjogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuX2NvbnRhaW5lciA9IEwuU1ZHLmNyZWF0ZSgnc3ZnJyk7XG5cblx0XHQvLyBtYWtlcyBpdCBwb3NzaWJsZSB0byBjbGljayB0aHJvdWdoIHN2ZyByb290OyB3ZSdsbCByZXNldCBpdCBiYWNrIGluIGluZGl2aWR1YWwgcGF0aHNcblx0XHR0aGlzLl9jb250YWluZXIuc2V0QXR0cmlidXRlKCdwb2ludGVyLWV2ZW50cycsICdub25lJyk7XG5cblx0XHR0aGlzLl9yb290R3JvdXAgPSBMLlNWRy5jcmVhdGUoJ2cnKTtcblx0XHR0aGlzLl9jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5fcm9vdEdyb3VwKTtcblx0fSxcblxuXHRfdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuX21hcC5fYW5pbWF0aW5nWm9vbSAmJiB0aGlzLl9ib3VuZHMpIHsgcmV0dXJuOyB9XG5cblx0XHRMLlJlbmRlcmVyLnByb3RvdHlwZS5fdXBkYXRlLmNhbGwodGhpcyk7XG5cblx0XHR2YXIgYiA9IHRoaXMuX2JvdW5kcyxcblx0XHQgICAgc2l6ZSA9IGIuZ2V0U2l6ZSgpLFxuXHRcdCAgICBjb250YWluZXIgPSB0aGlzLl9jb250YWluZXI7XG5cblx0XHQvLyBzZXQgc2l6ZSBvZiBzdmctY29udGFpbmVyIGlmIGNoYW5nZWRcblx0XHRpZiAoIXRoaXMuX3N2Z1NpemUgfHwgIXRoaXMuX3N2Z1NpemUuZXF1YWxzKHNpemUpKSB7XG5cdFx0XHR0aGlzLl9zdmdTaXplID0gc2l6ZTtcblx0XHRcdGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgc2l6ZS54KTtcblx0XHRcdGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHNpemUueSk7XG5cdFx0fVxuXG5cdFx0Ly8gbW92ZW1lbnQ6IHVwZGF0ZSBjb250YWluZXIgdmlld0JveCBzbyB0aGF0IHdlIGRvbid0IGhhdmUgdG8gY2hhbmdlIGNvb3JkaW5hdGVzIG9mIGluZGl2aWR1YWwgbGF5ZXJzXG5cdFx0TC5Eb21VdGlsLnNldFBvc2l0aW9uKGNvbnRhaW5lciwgYi5taW4pO1xuXHRcdGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCBbYi5taW4ueCwgYi5taW4ueSwgc2l6ZS54LCBzaXplLnldLmpvaW4oJyAnKSk7XG5cdH0sXG5cblx0Ly8gbWV0aG9kcyBiZWxvdyBhcmUgY2FsbGVkIGJ5IHZlY3RvciBsYXllcnMgaW1wbGVtZW50YXRpb25zXG5cblx0X2luaXRQYXRoOiBmdW5jdGlvbiAobGF5ZXIpIHtcblx0XHR2YXIgcGF0aCA9IGxheWVyLl9wYXRoID0gTC5TVkcuY3JlYXRlKCdwYXRoJyk7XG5cblx0XHRpZiAobGF5ZXIub3B0aW9ucy5jbGFzc05hbWUpIHtcblx0XHRcdEwuRG9tVXRpbC5hZGRDbGFzcyhwYXRoLCBsYXllci5vcHRpb25zLmNsYXNzTmFtZSk7XG5cdFx0fVxuXG5cdFx0aWYgKGxheWVyLm9wdGlvbnMuaW50ZXJhY3RpdmUpIHtcblx0XHRcdEwuRG9tVXRpbC5hZGRDbGFzcyhwYXRoLCAnbGVhZmxldC1pbnRlcmFjdGl2ZScpO1xuXHRcdH1cblxuXHRcdHRoaXMuX3VwZGF0ZVN0eWxlKGxheWVyKTtcblx0fSxcblxuXHRfYWRkUGF0aDogZnVuY3Rpb24gKGxheWVyKSB7XG5cdFx0dGhpcy5fcm9vdEdyb3VwLmFwcGVuZENoaWxkKGxheWVyLl9wYXRoKTtcblx0XHRsYXllci5hZGRJbnRlcmFjdGl2ZVRhcmdldChsYXllci5fcGF0aCk7XG5cdH0sXG5cblx0X3JlbW92ZVBhdGg6IGZ1bmN0aW9uIChsYXllcikge1xuXHRcdEwuRG9tVXRpbC5yZW1vdmUobGF5ZXIuX3BhdGgpO1xuXHRcdGxheWVyLnJlbW92ZUludGVyYWN0aXZlVGFyZ2V0KGxheWVyLl9wYXRoKTtcblx0fSxcblxuXHRfdXBkYXRlUGF0aDogZnVuY3Rpb24gKGxheWVyKSB7XG5cdFx0bGF5ZXIuX3Byb2plY3QoKTtcblx0XHRsYXllci5fdXBkYXRlKCk7XG5cdH0sXG5cblx0X3VwZGF0ZVN0eWxlOiBmdW5jdGlvbiAobGF5ZXIpIHtcblx0XHR2YXIgcGF0aCA9IGxheWVyLl9wYXRoLFxuXHRcdCAgICBvcHRpb25zID0gbGF5ZXIub3B0aW9ucztcblxuXHRcdGlmICghcGF0aCkgeyByZXR1cm47IH1cblxuXHRcdGlmIChvcHRpb25zLnN0cm9rZSkge1xuXHRcdFx0cGF0aC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsIG9wdGlvbnMuY29sb3IpO1xuXHRcdFx0cGF0aC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS1vcGFjaXR5Jywgb3B0aW9ucy5vcGFjaXR5KTtcblx0XHRcdHBhdGguc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCBvcHRpb25zLndlaWdodCk7XG5cdFx0XHRwYXRoLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLWxpbmVjYXAnLCBvcHRpb25zLmxpbmVDYXApO1xuXHRcdFx0cGF0aC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS1saW5lam9pbicsIG9wdGlvbnMubGluZUpvaW4pO1xuXG5cdFx0XHRpZiAob3B0aW9ucy5kYXNoQXJyYXkpIHtcblx0XHRcdFx0cGF0aC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS1kYXNoYXJyYXknLCBvcHRpb25zLmRhc2hBcnJheSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwYXRoLnJlbW92ZUF0dHJpYnV0ZSgnc3Ryb2tlLWRhc2hhcnJheScpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAob3B0aW9ucy5kYXNoT2Zmc2V0KSB7XG5cdFx0XHRcdHBhdGguc2V0QXR0cmlidXRlKCdzdHJva2UtZGFzaG9mZnNldCcsIG9wdGlvbnMuZGFzaE9mZnNldCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwYXRoLnJlbW92ZUF0dHJpYnV0ZSgnc3Ryb2tlLWRhc2hvZmZzZXQnKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0cGF0aC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICdub25lJyk7XG5cdFx0fVxuXG5cdFx0aWYgKG9wdGlvbnMuZmlsbCkge1xuXHRcdFx0cGF0aC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCBvcHRpb25zLmZpbGxDb2xvciB8fCBvcHRpb25zLmNvbG9yKTtcblx0XHRcdHBhdGguc2V0QXR0cmlidXRlKCdmaWxsLW9wYWNpdHknLCBvcHRpb25zLmZpbGxPcGFjaXR5KTtcblx0XHRcdHBhdGguc2V0QXR0cmlidXRlKCdmaWxsLXJ1bGUnLCBvcHRpb25zLmZpbGxSdWxlIHx8ICdldmVub2RkJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHBhdGguc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcblx0XHR9XG5cblx0XHRwYXRoLnNldEF0dHJpYnV0ZSgncG9pbnRlci1ldmVudHMnLCBvcHRpb25zLnBvaW50ZXJFdmVudHMgfHwgKG9wdGlvbnMuaW50ZXJhY3RpdmUgPyAndmlzaWJsZVBhaW50ZWQnIDogJ25vbmUnKSk7XG5cdH0sXG5cblx0X3VwZGF0ZVBvbHk6IGZ1bmN0aW9uIChsYXllciwgY2xvc2VkKSB7XG5cdFx0dGhpcy5fc2V0UGF0aChsYXllciwgTC5TVkcucG9pbnRzVG9QYXRoKGxheWVyLl9wYXJ0cywgY2xvc2VkKSk7XG5cdH0sXG5cblx0X3VwZGF0ZUNpcmNsZTogZnVuY3Rpb24gKGxheWVyKSB7XG5cdFx0dmFyIHAgPSBsYXllci5fcG9pbnQsXG5cdFx0ICAgIHIgPSBsYXllci5fcmFkaXVzLFxuXHRcdCAgICByMiA9IGxheWVyLl9yYWRpdXNZIHx8IHIsXG5cdFx0ICAgIGFyYyA9ICdhJyArIHIgKyAnLCcgKyByMiArICcgMCAxLDAgJztcblxuXHRcdC8vIGRyYXdpbmcgYSBjaXJjbGUgd2l0aCB0d28gaGFsZi1hcmNzXG5cdFx0dmFyIGQgPSBsYXllci5fZW1wdHkoKSA/ICdNMCAwJyA6XG5cdFx0XHRcdCdNJyArIChwLnggLSByKSArICcsJyArIHAueSArXG5cdFx0XHRcdGFyYyArIChyICogMikgKyAnLDAgJyArXG5cdFx0XHRcdGFyYyArICgtciAqIDIpICsgJywwICc7XG5cblx0XHR0aGlzLl9zZXRQYXRoKGxheWVyLCBkKTtcblx0fSxcblxuXHRfc2V0UGF0aDogZnVuY3Rpb24gKGxheWVyLCBwYXRoKSB7XG5cdFx0bGF5ZXIuX3BhdGguc2V0QXR0cmlidXRlKCdkJywgcGF0aCk7XG5cdH0sXG5cblx0Ly8gU1ZHIGRvZXMgbm90IGhhdmUgdGhlIGNvbmNlcHQgb2YgekluZGV4IHNvIHdlIHJlc29ydCB0byBjaGFuZ2luZyB0aGUgRE9NIG9yZGVyIG9mIGVsZW1lbnRzXG5cdF9icmluZ1RvRnJvbnQ6IGZ1bmN0aW9uIChsYXllcikge1xuXHRcdEwuRG9tVXRpbC50b0Zyb250KGxheWVyLl9wYXRoKTtcblx0fSxcblxuXHRfYnJpbmdUb0JhY2s6IGZ1bmN0aW9uIChsYXllcikge1xuXHRcdEwuRG9tVXRpbC50b0JhY2sobGF5ZXIuX3BhdGgpO1xuXHR9XG59KTtcblxuXG5MLmV4dGVuZChMLlNWRywge1xuXHRjcmVhdGU6IGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0cmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCBuYW1lKTtcblx0fSxcblxuXHQvLyBnZW5lcmF0ZXMgU1ZHIHBhdGggc3RyaW5nIGZvciBtdWx0aXBsZSByaW5ncywgd2l0aCBlYWNoIHJpbmcgdHVybmluZyBpbnRvIFwiTS4uTC4uTC4uXCIgaW5zdHJ1Y3Rpb25zXG5cdHBvaW50c1RvUGF0aDogZnVuY3Rpb24gKHJpbmdzLCBjbG9zZWQpIHtcblx0XHR2YXIgc3RyID0gJycsXG5cdFx0ICAgIGksIGosIGxlbiwgbGVuMiwgcG9pbnRzLCBwO1xuXG5cdFx0Zm9yIChpID0gMCwgbGVuID0gcmluZ3MubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdHBvaW50cyA9IHJpbmdzW2ldO1xuXG5cdFx0XHRmb3IgKGogPSAwLCBsZW4yID0gcG9pbnRzLmxlbmd0aDsgaiA8IGxlbjI7IGorKykge1xuXHRcdFx0XHRwID0gcG9pbnRzW2pdO1xuXHRcdFx0XHRzdHIgKz0gKGogPyAnTCcgOiAnTScpICsgcC54ICsgJyAnICsgcC55O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBjbG9zZXMgdGhlIHJpbmcgZm9yIHBvbHlnb25zOyBcInhcIiBpcyBWTUwgc3ludGF4XG5cdFx0XHRzdHIgKz0gY2xvc2VkID8gKEwuQnJvd3Nlci5zdmcgPyAneicgOiAneCcpIDogJyc7XG5cdFx0fVxuXG5cdFx0Ly8gU1ZHIGNvbXBsYWlucyBhYm91dCBlbXB0eSBwYXRoIHN0cmluZ3Ncblx0XHRyZXR1cm4gc3RyIHx8ICdNMCAwJztcblx0fVxufSk7XG5cbkwuQnJvd3Nlci5zdmcgPSAhIShkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMgJiYgTC5TVkcuY3JlYXRlKCdzdmcnKS5jcmVhdGVTVkdSZWN0KTtcblxuTC5zdmcgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXHRyZXR1cm4gTC5Ccm93c2VyLnN2ZyB8fCBMLkJyb3dzZXIudm1sID8gbmV3IEwuU1ZHKG9wdGlvbnMpIDogbnVsbDtcbn07XG5cblxuXG4vKlxuICogVmVjdG9yIHJlbmRlcmluZyBmb3IgSUU3LTggdGhyb3VnaCBWTUwuXG4gKiBUaGFua3MgdG8gRG1pdHJ5IEJhcmFub3Zza3kgYW5kIGhpcyBSYXBoYWVsIGxpYnJhcnkgZm9yIGluc3BpcmF0aW9uIVxuICovXG5cbkwuQnJvd3Nlci52bWwgPSAhTC5Ccm93c2VyLnN2ZyAmJiAoZnVuY3Rpb24gKCkge1xuXHR0cnkge1xuXHRcdHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRkaXYuaW5uZXJIVE1MID0gJzx2OnNoYXBlIGFkaj1cIjFcIi8+JztcblxuXHRcdHZhciBzaGFwZSA9IGRpdi5maXJzdENoaWxkO1xuXHRcdHNoYXBlLnN0eWxlLmJlaGF2aW9yID0gJ3VybCgjZGVmYXVsdCNWTUwpJztcblxuXHRcdHJldHVybiBzaGFwZSAmJiAodHlwZW9mIHNoYXBlLmFkaiA9PT0gJ29iamVjdCcpO1xuXG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn0oKSk7XG5cbi8vIHJlZGVmaW5lIHNvbWUgU1ZHIG1ldGhvZHMgdG8gaGFuZGxlIFZNTCBzeW50YXggd2hpY2ggaXMgc2ltaWxhciBidXQgd2l0aCBzb21lIGRpZmZlcmVuY2VzXG5MLlNWRy5pbmNsdWRlKCFMLkJyb3dzZXIudm1sID8ge30gOiB7XG5cblx0X2luaXRDb250YWluZXI6IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLl9jb250YWluZXIgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnbGVhZmxldC12bWwtY29udGFpbmVyJyk7XG5cdH0sXG5cblx0X3VwZGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0aGlzLl9tYXAuX2FuaW1hdGluZ1pvb20pIHsgcmV0dXJuOyB9XG5cdFx0TC5SZW5kZXJlci5wcm90b3R5cGUuX3VwZGF0ZS5jYWxsKHRoaXMpO1xuXHR9LFxuXG5cdF9pbml0UGF0aDogZnVuY3Rpb24gKGxheWVyKSB7XG5cdFx0dmFyIGNvbnRhaW5lciA9IGxheWVyLl9jb250YWluZXIgPSBMLlNWRy5jcmVhdGUoJ3NoYXBlJyk7XG5cblx0XHRMLkRvbVV0aWwuYWRkQ2xhc3MoY29udGFpbmVyLCAnbGVhZmxldC12bWwtc2hhcGUgJyArICh0aGlzLm9wdGlvbnMuY2xhc3NOYW1lIHx8ICcnKSk7XG5cblx0XHRjb250YWluZXIuY29vcmRzaXplID0gJzEgMSc7XG5cblx0XHRsYXllci5fcGF0aCA9IEwuU1ZHLmNyZWF0ZSgncGF0aCcpO1xuXHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZChsYXllci5fcGF0aCk7XG5cblx0XHR0aGlzLl91cGRhdGVTdHlsZShsYXllcik7XG5cdH0sXG5cblx0X2FkZFBhdGg6IGZ1bmN0aW9uIChsYXllcikge1xuXHRcdHZhciBjb250YWluZXIgPSBsYXllci5fY29udGFpbmVyO1xuXHRcdHRoaXMuX2NvbnRhaW5lci5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuXG5cdFx0aWYgKGxheWVyLm9wdGlvbnMuaW50ZXJhY3RpdmUpIHtcblx0XHRcdGxheWVyLmFkZEludGVyYWN0aXZlVGFyZ2V0KGNvbnRhaW5lcik7XG5cdFx0fVxuXHR9LFxuXG5cdF9yZW1vdmVQYXRoOiBmdW5jdGlvbiAobGF5ZXIpIHtcblx0XHR2YXIgY29udGFpbmVyID0gbGF5ZXIuX2NvbnRhaW5lcjtcblx0XHRMLkRvbVV0aWwucmVtb3ZlKGNvbnRhaW5lcik7XG5cdFx0bGF5ZXIucmVtb3ZlSW50ZXJhY3RpdmVUYXJnZXQoY29udGFpbmVyKTtcblx0fSxcblxuXHRfdXBkYXRlU3R5bGU6IGZ1bmN0aW9uIChsYXllcikge1xuXHRcdHZhciBzdHJva2UgPSBsYXllci5fc3Ryb2tlLFxuXHRcdCAgICBmaWxsID0gbGF5ZXIuX2ZpbGwsXG5cdFx0ICAgIG9wdGlvbnMgPSBsYXllci5vcHRpb25zLFxuXHRcdCAgICBjb250YWluZXIgPSBsYXllci5fY29udGFpbmVyO1xuXG5cdFx0Y29udGFpbmVyLnN0cm9rZWQgPSAhIW9wdGlvbnMuc3Ryb2tlO1xuXHRcdGNvbnRhaW5lci5maWxsZWQgPSAhIW9wdGlvbnMuZmlsbDtcblxuXHRcdGlmIChvcHRpb25zLnN0cm9rZSkge1xuXHRcdFx0aWYgKCFzdHJva2UpIHtcblx0XHRcdFx0c3Ryb2tlID0gbGF5ZXIuX3N0cm9rZSA9IEwuU1ZHLmNyZWF0ZSgnc3Ryb2tlJyk7XG5cdFx0XHR9XG5cdFx0XHRjb250YWluZXIuYXBwZW5kQ2hpbGQoc3Ryb2tlKTtcblx0XHRcdHN0cm9rZS53ZWlnaHQgPSBvcHRpb25zLndlaWdodCArICdweCc7XG5cdFx0XHRzdHJva2UuY29sb3IgPSBvcHRpb25zLmNvbG9yO1xuXHRcdFx0c3Ryb2tlLm9wYWNpdHkgPSBvcHRpb25zLm9wYWNpdHk7XG5cblx0XHRcdGlmIChvcHRpb25zLmRhc2hBcnJheSkge1xuXHRcdFx0XHRzdHJva2UuZGFzaFN0eWxlID0gTC5VdGlsLmlzQXJyYXkob3B0aW9ucy5kYXNoQXJyYXkpID9cblx0XHRcdFx0ICAgIG9wdGlvbnMuZGFzaEFycmF5LmpvaW4oJyAnKSA6XG5cdFx0XHRcdCAgICBvcHRpb25zLmRhc2hBcnJheS5yZXBsYWNlKC8oICosICopL2csICcgJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzdHJva2UuZGFzaFN0eWxlID0gJyc7XG5cdFx0XHR9XG5cdFx0XHRzdHJva2UuZW5kY2FwID0gb3B0aW9ucy5saW5lQ2FwLnJlcGxhY2UoJ2J1dHQnLCAnZmxhdCcpO1xuXHRcdFx0c3Ryb2tlLmpvaW5zdHlsZSA9IG9wdGlvbnMubGluZUpvaW47XG5cblx0XHR9IGVsc2UgaWYgKHN0cm9rZSkge1xuXHRcdFx0Y29udGFpbmVyLnJlbW92ZUNoaWxkKHN0cm9rZSk7XG5cdFx0XHRsYXllci5fc3Ryb2tlID0gbnVsbDtcblx0XHR9XG5cblx0XHRpZiAob3B0aW9ucy5maWxsKSB7XG5cdFx0XHRpZiAoIWZpbGwpIHtcblx0XHRcdFx0ZmlsbCA9IGxheWVyLl9maWxsID0gTC5TVkcuY3JlYXRlKCdmaWxsJyk7XG5cdFx0XHR9XG5cdFx0XHRjb250YWluZXIuYXBwZW5kQ2hpbGQoZmlsbCk7XG5cdFx0XHRmaWxsLmNvbG9yID0gb3B0aW9ucy5maWxsQ29sb3IgfHwgb3B0aW9ucy5jb2xvcjtcblx0XHRcdGZpbGwub3BhY2l0eSA9IG9wdGlvbnMuZmlsbE9wYWNpdHk7XG5cblx0XHR9IGVsc2UgaWYgKGZpbGwpIHtcblx0XHRcdGNvbnRhaW5lci5yZW1vdmVDaGlsZChmaWxsKTtcblx0XHRcdGxheWVyLl9maWxsID0gbnVsbDtcblx0XHR9XG5cdH0sXG5cblx0X3VwZGF0ZUNpcmNsZTogZnVuY3Rpb24gKGxheWVyKSB7XG5cdFx0dmFyIHAgPSBsYXllci5fcG9pbnQucm91bmQoKSxcblx0XHQgICAgciA9IE1hdGgucm91bmQobGF5ZXIuX3JhZGl1cyksXG5cdFx0ICAgIHIyID0gTWF0aC5yb3VuZChsYXllci5fcmFkaXVzWSB8fCByKTtcblxuXHRcdHRoaXMuX3NldFBhdGgobGF5ZXIsIGxheWVyLl9lbXB0eSgpID8gJ00wIDAnIDpcblx0XHRcdFx0J0FMICcgKyBwLnggKyAnLCcgKyBwLnkgKyAnICcgKyByICsgJywnICsgcjIgKyAnIDAsJyArICg2NTUzNSAqIDM2MCkpO1xuXHR9LFxuXG5cdF9zZXRQYXRoOiBmdW5jdGlvbiAobGF5ZXIsIHBhdGgpIHtcblx0XHRsYXllci5fcGF0aC52ID0gcGF0aDtcblx0fSxcblxuXHRfYnJpbmdUb0Zyb250OiBmdW5jdGlvbiAobGF5ZXIpIHtcblx0XHRMLkRvbVV0aWwudG9Gcm9udChsYXllci5fY29udGFpbmVyKTtcblx0fSxcblxuXHRfYnJpbmdUb0JhY2s6IGZ1bmN0aW9uIChsYXllcikge1xuXHRcdEwuRG9tVXRpbC50b0JhY2sobGF5ZXIuX2NvbnRhaW5lcik7XG5cdH1cbn0pO1xuXG5pZiAoTC5Ccm93c2VyLnZtbCkge1xuXHRMLlNWRy5jcmVhdGUgPSAoZnVuY3Rpb24gKCkge1xuXHRcdHRyeSB7XG5cdFx0XHRkb2N1bWVudC5uYW1lc3BhY2VzLmFkZCgnbHZtbCcsICd1cm46c2NoZW1hcy1taWNyb3NvZnQtY29tOnZtbCcpO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0XHRcdHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCc8bHZtbDonICsgbmFtZSArICcgY2xhc3M9XCJsdm1sXCI+Jyk7XG5cdFx0XHR9O1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAobmFtZSkge1xuXHRcdFx0XHRyZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnPCcgKyBuYW1lICsgJyB4bWxucz1cInVybjpzY2hlbWFzLW1pY3Jvc29mdC5jb206dm1sXCIgY2xhc3M9XCJsdm1sXCI+Jyk7XG5cdFx0XHR9O1xuXHRcdH1cblx0fSkoKTtcbn1cblxuXG5cbi8qXG4gKiBMLkNhbnZhcyBoYW5kbGVzIENhbnZhcyB2ZWN0b3IgbGF5ZXJzIHJlbmRlcmluZyBhbmQgbW91c2UgZXZlbnRzIGhhbmRsaW5nLiBBbGwgQ2FudmFzLXNwZWNpZmljIGNvZGUgZ29lcyBoZXJlLlxuICovXG5cbkwuQ2FudmFzID0gTC5SZW5kZXJlci5leHRlbmQoe1xuXG5cdG9uQWRkOiBmdW5jdGlvbiAoKSB7XG5cdFx0TC5SZW5kZXJlci5wcm90b3R5cGUub25BZGQuY2FsbCh0aGlzKTtcblxuXHRcdHRoaXMuX2xheWVycyA9IHRoaXMuX2xheWVycyB8fCB7fTtcblxuXHRcdC8vIFJlZHJhdyB2ZWN0b3JzIHNpbmNlIGNhbnZhcyBpcyBjbGVhcmVkIHVwb24gcmVtb3ZhbCxcblx0XHQvLyBpbiBjYXNlIG9mIHJlbW92aW5nIHRoZSByZW5kZXJlciBpdHNlbGYgZnJvbSB0aGUgbWFwLlxuXHRcdHRoaXMuX2RyYXcoKTtcblx0fSxcblxuXHRfaW5pdENvbnRhaW5lcjogZnVuY3Rpb24gKCkge1xuXHRcdHZhciBjb250YWluZXIgPSB0aGlzLl9jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuXHRcdEwuRG9tRXZlbnRcblx0XHRcdC5vbihjb250YWluZXIsICdtb3VzZW1vdmUnLCBMLlV0aWwudGhyb3R0bGUodGhpcy5fb25Nb3VzZU1vdmUsIDMyLCB0aGlzKSwgdGhpcylcblx0XHRcdC5vbihjb250YWluZXIsICdjbGljayBkYmxjbGljayBtb3VzZWRvd24gbW91c2V1cCBjb250ZXh0bWVudScsIHRoaXMuX29uQ2xpY2ssIHRoaXMpXG5cdFx0XHQub24oY29udGFpbmVyLCAnbW91c2VvdXQnLCB0aGlzLl9oYW5kbGVNb3VzZU91dCwgdGhpcyk7XG5cblx0XHR0aGlzLl9jdHggPSBjb250YWluZXIuZ2V0Q29udGV4dCgnMmQnKTtcblx0fSxcblxuXHRfdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuX21hcC5fYW5pbWF0aW5nWm9vbSAmJiB0aGlzLl9ib3VuZHMpIHsgcmV0dXJuOyB9XG5cblx0XHR0aGlzLl9kcmF3bkxheWVycyA9IHt9O1xuXG5cdFx0TC5SZW5kZXJlci5wcm90b3R5cGUuX3VwZGF0ZS5jYWxsKHRoaXMpO1xuXG5cdFx0dmFyIGIgPSB0aGlzLl9ib3VuZHMsXG5cdFx0ICAgIGNvbnRhaW5lciA9IHRoaXMuX2NvbnRhaW5lcixcblx0XHQgICAgc2l6ZSA9IGIuZ2V0U2l6ZSgpLFxuXHRcdCAgICBtID0gTC5Ccm93c2VyLnJldGluYSA/IDIgOiAxO1xuXG5cdFx0TC5Eb21VdGlsLnNldFBvc2l0aW9uKGNvbnRhaW5lciwgYi5taW4pO1xuXG5cdFx0Ly8gc2V0IGNhbnZhcyBzaXplIChhbHNvIGNsZWFyaW5nIGl0KTsgdXNlIGRvdWJsZSBzaXplIG9uIHJldGluYVxuXHRcdGNvbnRhaW5lci53aWR0aCA9IG0gKiBzaXplLng7XG5cdFx0Y29udGFpbmVyLmhlaWdodCA9IG0gKiBzaXplLnk7XG5cdFx0Y29udGFpbmVyLnN0eWxlLndpZHRoID0gc2l6ZS54ICsgJ3B4Jztcblx0XHRjb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gc2l6ZS55ICsgJ3B4JztcblxuXHRcdGlmIChMLkJyb3dzZXIucmV0aW5hKSB7XG5cdFx0XHR0aGlzLl9jdHguc2NhbGUoMiwgMik7XG5cdFx0fVxuXG5cdFx0Ly8gdHJhbnNsYXRlIHNvIHdlIHVzZSB0aGUgc2FtZSBwYXRoIGNvb3JkaW5hdGVzIGFmdGVyIGNhbnZhcyBlbGVtZW50IG1vdmVzXG5cdFx0dGhpcy5fY3R4LnRyYW5zbGF0ZSgtYi5taW4ueCwgLWIubWluLnkpO1xuXHR9LFxuXG5cdF9pbml0UGF0aDogZnVuY3Rpb24gKGxheWVyKSB7XG5cdFx0dGhpcy5fbGF5ZXJzW0wuc3RhbXAobGF5ZXIpXSA9IGxheWVyO1xuXHR9LFxuXG5cdF9hZGRQYXRoOiBMLlV0aWwuZmFsc2VGbixcblxuXHRfcmVtb3ZlUGF0aDogZnVuY3Rpb24gKGxheWVyKSB7XG5cdFx0bGF5ZXIuX3JlbW92ZWQgPSB0cnVlO1xuXHRcdHRoaXMuX3JlcXVlc3RSZWRyYXcobGF5ZXIpO1xuXHR9LFxuXG5cdF91cGRhdGVQYXRoOiBmdW5jdGlvbiAobGF5ZXIpIHtcblx0XHR0aGlzLl9yZWRyYXdCb3VuZHMgPSBsYXllci5fcHhCb3VuZHM7XG5cdFx0dGhpcy5fZHJhdyh0cnVlKTtcblx0XHRsYXllci5fcHJvamVjdCgpO1xuXHRcdGxheWVyLl91cGRhdGUoKTtcblx0XHR0aGlzLl9kcmF3KCk7XG5cdFx0dGhpcy5fcmVkcmF3Qm91bmRzID0gbnVsbDtcblx0fSxcblxuXHRfdXBkYXRlU3R5bGU6IGZ1bmN0aW9uIChsYXllcikge1xuXHRcdHRoaXMuX3JlcXVlc3RSZWRyYXcobGF5ZXIpO1xuXHR9LFxuXG5cdF9yZXF1ZXN0UmVkcmF3OiBmdW5jdGlvbiAobGF5ZXIpIHtcblx0XHRpZiAoIXRoaXMuX21hcCkgeyByZXR1cm47IH1cblxuXHRcdHZhciBwYWRkaW5nID0gKGxheWVyLm9wdGlvbnMud2VpZ2h0IHx8IDApICsgMTtcblx0XHR0aGlzLl9yZWRyYXdCb3VuZHMgPSB0aGlzLl9yZWRyYXdCb3VuZHMgfHwgbmV3IEwuQm91bmRzKCk7XG5cdFx0dGhpcy5fcmVkcmF3Qm91bmRzLmV4dGVuZChsYXllci5fcHhCb3VuZHMubWluLnN1YnRyYWN0KFtwYWRkaW5nLCBwYWRkaW5nXSkpO1xuXHRcdHRoaXMuX3JlZHJhd0JvdW5kcy5leHRlbmQobGF5ZXIuX3B4Qm91bmRzLm1heC5hZGQoW3BhZGRpbmcsIHBhZGRpbmddKSk7XG5cblx0XHR0aGlzLl9yZWRyYXdSZXF1ZXN0ID0gdGhpcy5fcmVkcmF3UmVxdWVzdCB8fCBMLlV0aWwucmVxdWVzdEFuaW1GcmFtZSh0aGlzLl9yZWRyYXcsIHRoaXMpO1xuXHR9LFxuXG5cdF9yZWRyYXc6IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLl9yZWRyYXdSZXF1ZXN0ID0gbnVsbDtcblxuXHRcdHRoaXMuX2RyYXcodHJ1ZSk7IC8vIGNsZWFyIGxheWVycyBpbiByZWRyYXcgYm91bmRzXG5cdFx0dGhpcy5fZHJhdygpOyAvLyBkcmF3IGxheWVyc1xuXG5cdFx0dGhpcy5fcmVkcmF3Qm91bmRzID0gbnVsbDtcblx0fSxcblxuXHRfZHJhdzogZnVuY3Rpb24gKGNsZWFyKSB7XG5cdFx0dGhpcy5fY2xlYXIgPSBjbGVhcjtcblx0XHR2YXIgbGF5ZXIsIGJvdW5kcyA9IHRoaXMuX3JlZHJhd0JvdW5kcztcblx0XHR0aGlzLl9jdHguc2F2ZSgpO1xuXHRcdGlmIChib3VuZHMpIHtcblx0XHRcdHRoaXMuX2N0eC5iZWdpblBhdGgoKTtcblx0XHRcdHRoaXMuX2N0eC5yZWN0KGJvdW5kcy5taW4ueCwgYm91bmRzLm1pbi55LCBib3VuZHMubWF4LnggLSBib3VuZHMubWluLngsIGJvdW5kcy5tYXgueSAtIGJvdW5kcy5taW4ueSk7XG5cdFx0XHR0aGlzLl9jdHguY2xpcCgpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGlkIGluIHRoaXMuX2xheWVycykge1xuXHRcdFx0bGF5ZXIgPSB0aGlzLl9sYXllcnNbaWRdO1xuXHRcdFx0aWYgKCFib3VuZHMgfHwgbGF5ZXIuX3B4Qm91bmRzLmludGVyc2VjdHMoYm91bmRzKSkge1xuXHRcdFx0XHRsYXllci5fdXBkYXRlUGF0aCgpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGNsZWFyICYmIGxheWVyLl9yZW1vdmVkKSB7XG5cdFx0XHRcdGRlbGV0ZSBsYXllci5fcmVtb3ZlZDtcblx0XHRcdFx0ZGVsZXRlIHRoaXMuX2xheWVyc1tpZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX2N0eC5yZXN0b3JlKCk7ICAvLyBSZXN0b3JlIHN0YXRlIGJlZm9yZSBjbGlwcGluZy5cblx0fSxcblxuXHRfdXBkYXRlUG9seTogZnVuY3Rpb24gKGxheWVyLCBjbG9zZWQpIHtcblxuXHRcdHZhciBpLCBqLCBsZW4yLCBwLFxuXHRcdCAgICBwYXJ0cyA9IGxheWVyLl9wYXJ0cyxcblx0XHQgICAgbGVuID0gcGFydHMubGVuZ3RoLFxuXHRcdCAgICBjdHggPSB0aGlzLl9jdHg7XG5cblx0XHRpZiAoIWxlbikgeyByZXR1cm47IH1cblxuXHRcdHRoaXMuX2RyYXduTGF5ZXJzW2xheWVyLl9sZWFmbGV0X2lkXSA9IGxheWVyO1xuXG5cdFx0Y3R4LmJlZ2luUGF0aCgpO1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRmb3IgKGogPSAwLCBsZW4yID0gcGFydHNbaV0ubGVuZ3RoOyBqIDwgbGVuMjsgaisrKSB7XG5cdFx0XHRcdHAgPSBwYXJ0c1tpXVtqXTtcblx0XHRcdFx0Y3R4W2ogPyAnbGluZVRvJyA6ICdtb3ZlVG8nXShwLngsIHAueSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoY2xvc2VkKSB7XG5cdFx0XHRcdGN0eC5jbG9zZVBhdGgoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLl9maWxsU3Ryb2tlKGN0eCwgbGF5ZXIpO1xuXG5cdFx0Ly8gVE9ETyBvcHRpbWl6YXRpb246IDEgZmlsbC9zdHJva2UgZm9yIGFsbCBmZWF0dXJlcyB3aXRoIGVxdWFsIHN0eWxlIGluc3RlYWQgb2YgMSBmb3IgZWFjaCBmZWF0dXJlXG5cdH0sXG5cblx0X3VwZGF0ZUNpcmNsZTogZnVuY3Rpb24gKGxheWVyKSB7XG5cblx0XHRpZiAobGF5ZXIuX2VtcHR5KCkpIHsgcmV0dXJuOyB9XG5cblx0XHR2YXIgcCA9IGxheWVyLl9wb2ludCxcblx0XHQgICAgY3R4ID0gdGhpcy5fY3R4LFxuXHRcdCAgICByID0gbGF5ZXIuX3JhZGl1cyxcblx0XHQgICAgcyA9IChsYXllci5fcmFkaXVzWSB8fCByKSAvIHI7XG5cblx0XHRpZiAocyAhPT0gMSkge1xuXHRcdFx0Y3R4LnNhdmUoKTtcblx0XHRcdGN0eC5zY2FsZSgxLCBzKTtcblx0XHR9XG5cblx0XHRjdHguYmVnaW5QYXRoKCk7XG5cdFx0Y3R4LmFyYyhwLngsIHAueSAvIHMsIHIsIDAsIE1hdGguUEkgKiAyLCBmYWxzZSk7XG5cblx0XHRpZiAocyAhPT0gMSkge1xuXHRcdFx0Y3R4LnJlc3RvcmUoKTtcblx0XHR9XG5cblx0XHR0aGlzLl9maWxsU3Ryb2tlKGN0eCwgbGF5ZXIpO1xuXHR9LFxuXG5cdF9maWxsU3Ryb2tlOiBmdW5jdGlvbiAoY3R4LCBsYXllcikge1xuXHRcdHZhciBjbGVhciA9IHRoaXMuX2NsZWFyLFxuXHRcdCAgICBvcHRpb25zID0gbGF5ZXIub3B0aW9ucztcblxuXHRcdGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBjbGVhciA/ICdkZXN0aW5hdGlvbi1vdXQnIDogJ3NvdXJjZS1vdmVyJztcblxuXHRcdGlmIChvcHRpb25zLmZpbGwpIHtcblx0XHRcdGN0eC5nbG9iYWxBbHBoYSA9IGNsZWFyID8gMSA6IG9wdGlvbnMuZmlsbE9wYWNpdHk7XG5cdFx0XHRjdHguZmlsbFN0eWxlID0gb3B0aW9ucy5maWxsQ29sb3IgfHwgb3B0aW9ucy5jb2xvcjtcblx0XHRcdGN0eC5maWxsKG9wdGlvbnMuZmlsbFJ1bGUgfHwgJ2V2ZW5vZGQnKTtcblx0XHR9XG5cblx0XHRpZiAob3B0aW9ucy5zdHJva2UgJiYgb3B0aW9ucy53ZWlnaHQgIT09IDApIHtcblx0XHRcdGN0eC5nbG9iYWxBbHBoYSA9IGNsZWFyID8gMSA6IG9wdGlvbnMub3BhY2l0eTtcblxuXHRcdFx0Ly8gaWYgY2xlYXJpbmcgc2hhcGUsIGRvIGl0IHdpdGggdGhlIHByZXZpb3VzbHkgZHJhd24gbGluZSB3aWR0aFxuXHRcdFx0bGF5ZXIuX3ByZXZXZWlnaHQgPSBjdHgubGluZVdpZHRoID0gY2xlYXIgPyBsYXllci5fcHJldldlaWdodCArIDEgOiBvcHRpb25zLndlaWdodDtcblxuXHRcdFx0Y3R4LnN0cm9rZVN0eWxlID0gb3B0aW9ucy5jb2xvcjtcblx0XHRcdGN0eC5saW5lQ2FwID0gb3B0aW9ucy5saW5lQ2FwO1xuXHRcdFx0Y3R4LmxpbmVKb2luID0gb3B0aW9ucy5saW5lSm9pbjtcblx0XHRcdGN0eC5zdHJva2UoKTtcblx0XHR9XG5cdH0sXG5cblx0Ly8gQ2FudmFzIG9idmlvdXNseSBkb2Vzbid0IGhhdmUgbW91c2UgZXZlbnRzIGZvciBpbmRpdmlkdWFsIGRyYXduIG9iamVjdHMsXG5cdC8vIHNvIHdlIGVtdWxhdGUgdGhhdCBieSBjYWxjdWxhdGluZyB3aGF0J3MgdW5kZXIgdGhlIG1vdXNlIG9uIG1vdXNlbW92ZS9jbGljayBtYW51YWxseVxuXG5cdF9vbkNsaWNrOiBmdW5jdGlvbiAoZSkge1xuXHRcdHZhciBwb2ludCA9IHRoaXMuX21hcC5tb3VzZUV2ZW50VG9MYXllclBvaW50KGUpLCBsYXllcnMgPSBbXTtcblxuXHRcdGZvciAodmFyIGlkIGluIHRoaXMuX2xheWVycykge1xuXHRcdFx0aWYgKHRoaXMuX2xheWVyc1tpZF0uX2NvbnRhaW5zUG9pbnQocG9pbnQpKSB7XG5cdFx0XHRcdEwuRG9tRXZlbnQuX2Zha2VTdG9wKGUpO1xuXHRcdFx0XHRsYXllcnMucHVzaCh0aGlzLl9sYXllcnNbaWRdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKGxheWVycy5sZW5ndGgpICB7XG5cdFx0XHR0aGlzLl9maXJlRXZlbnQobGF5ZXJzLCBlKTtcblx0XHR9XG5cdH0sXG5cblx0X29uTW91c2VNb3ZlOiBmdW5jdGlvbiAoZSkge1xuXHRcdGlmICghdGhpcy5fbWFwIHx8IHRoaXMuX21hcC5kcmFnZ2luZy5fZHJhZ2dhYmxlLl9tb3ZpbmcgfHwgdGhpcy5fbWFwLl9hbmltYXRpbmdab29tKSB7IHJldHVybjsgfVxuXG5cdFx0dmFyIHBvaW50ID0gdGhpcy5fbWFwLm1vdXNlRXZlbnRUb0xheWVyUG9pbnQoZSk7XG5cdFx0dGhpcy5faGFuZGxlTW91c2VPdXQoZSwgcG9pbnQpO1xuXHRcdHRoaXMuX2hhbmRsZU1vdXNlSG92ZXIoZSwgcG9pbnQpO1xuXHR9LFxuXG5cblx0X2hhbmRsZU1vdXNlT3V0OiBmdW5jdGlvbiAoZSwgcG9pbnQpIHtcblx0XHR2YXIgbGF5ZXIgPSB0aGlzLl9ob3ZlcmVkTGF5ZXI7XG5cdFx0aWYgKGxheWVyICYmIChlLnR5cGUgPT09ICdtb3VzZW91dCcgfHwgIWxheWVyLl9jb250YWluc1BvaW50KHBvaW50KSkpIHtcblx0XHRcdC8vIGlmIHdlJ3JlIGxlYXZpbmcgdGhlIGxheWVyLCBmaXJlIG1vdXNlb3V0XG5cdFx0XHRMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5fY29udGFpbmVyLCAnbGVhZmxldC1pbnRlcmFjdGl2ZScpO1xuXHRcdFx0dGhpcy5fZmlyZUV2ZW50KFtsYXllcl0sIGUsICdtb3VzZW91dCcpO1xuXHRcdFx0dGhpcy5faG92ZXJlZExheWVyID0gbnVsbDtcblx0XHR9XG5cdH0sXG5cblx0X2hhbmRsZU1vdXNlSG92ZXI6IGZ1bmN0aW9uIChlLCBwb2ludCkge1xuXHRcdHZhciBpZCwgbGF5ZXI7XG5cdFx0aWYgKCF0aGlzLl9ob3ZlcmVkTGF5ZXIpIHtcblx0XHRcdGZvciAoaWQgaW4gdGhpcy5fZHJhd25MYXllcnMpIHtcblx0XHRcdFx0bGF5ZXIgPSB0aGlzLl9kcmF3bkxheWVyc1tpZF07XG5cdFx0XHRcdGlmIChsYXllci5vcHRpb25zLmludGVyYWN0aXZlICYmIGxheWVyLl9jb250YWluc1BvaW50KHBvaW50KSkge1xuXHRcdFx0XHRcdEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9jb250YWluZXIsICdsZWFmbGV0LWludGVyYWN0aXZlJyk7IC8vIGNoYW5nZSBjdXJzb3Jcblx0XHRcdFx0XHR0aGlzLl9maXJlRXZlbnQoW2xheWVyXSwgZSwgJ21vdXNlb3ZlcicpO1xuXHRcdFx0XHRcdHRoaXMuX2hvdmVyZWRMYXllciA9IGxheWVyO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICh0aGlzLl9ob3ZlcmVkTGF5ZXIpIHtcblx0XHRcdHRoaXMuX2ZpcmVFdmVudChbdGhpcy5faG92ZXJlZExheWVyXSwgZSk7XG5cdFx0fVxuXHR9LFxuXG5cdF9maXJlRXZlbnQ6IGZ1bmN0aW9uIChsYXllcnMsIGUsIHR5cGUpIHtcblx0XHR0aGlzLl9tYXAuX2ZpcmVET01FdmVudChlLCB0eXBlIHx8IGUudHlwZSwgbGF5ZXJzKTtcblx0fSxcblxuXHQvLyBUT0RPIF9icmluZ1RvRnJvbnQgJiBfYnJpbmdUb0JhY2ssIHByZXR0eSB0cmlja3lcblxuXHRfYnJpbmdUb0Zyb250OiBMLlV0aWwuZmFsc2VGbixcblx0X2JyaW5nVG9CYWNrOiBMLlV0aWwuZmFsc2VGblxufSk7XG5cbkwuQnJvd3Nlci5jYW52YXMgPSAoZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gISFkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKS5nZXRDb250ZXh0O1xufSgpKTtcblxuTC5jYW52YXMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXHRyZXR1cm4gTC5Ccm93c2VyLmNhbnZhcyA/IG5ldyBMLkNhbnZhcyhvcHRpb25zKSA6IG51bGw7XG59O1xuXG5MLlBvbHlsaW5lLnByb3RvdHlwZS5fY29udGFpbnNQb2ludCA9IGZ1bmN0aW9uIChwLCBjbG9zZWQpIHtcblx0dmFyIGksIGosIGssIGxlbiwgbGVuMiwgcGFydCxcblx0ICAgIHcgPSB0aGlzLl9jbGlja1RvbGVyYW5jZSgpO1xuXG5cdGlmICghdGhpcy5fcHhCb3VuZHMuY29udGFpbnMocCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0Ly8gaGl0IGRldGVjdGlvbiBmb3IgcG9seWxpbmVzXG5cdGZvciAoaSA9IDAsIGxlbiA9IHRoaXMuX3BhcnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0cGFydCA9IHRoaXMuX3BhcnRzW2ldO1xuXG5cdFx0Zm9yIChqID0gMCwgbGVuMiA9IHBhcnQubGVuZ3RoLCBrID0gbGVuMiAtIDE7IGogPCBsZW4yOyBrID0gaisrKSB7XG5cdFx0XHRpZiAoIWNsb3NlZCAmJiAoaiA9PT0gMCkpIHsgY29udGludWU7IH1cblxuXHRcdFx0aWYgKEwuTGluZVV0aWwucG9pbnRUb1NlZ21lbnREaXN0YW5jZShwLCBwYXJ0W2tdLCBwYXJ0W2pdKSA8PSB3KSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gZmFsc2U7XG59O1xuXG5MLlBvbHlnb24ucHJvdG90eXBlLl9jb250YWluc1BvaW50ID0gZnVuY3Rpb24gKHApIHtcblx0dmFyIGluc2lkZSA9IGZhbHNlLFxuXHQgICAgcGFydCwgcDEsIHAyLCBpLCBqLCBrLCBsZW4sIGxlbjI7XG5cblx0aWYgKCF0aGlzLl9weEJvdW5kcy5jb250YWlucyhwKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHQvLyByYXkgY2FzdGluZyBhbGdvcml0aG0gZm9yIGRldGVjdGluZyBpZiBwb2ludCBpcyBpbiBwb2x5Z29uXG5cdGZvciAoaSA9IDAsIGxlbiA9IHRoaXMuX3BhcnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0cGFydCA9IHRoaXMuX3BhcnRzW2ldO1xuXG5cdFx0Zm9yIChqID0gMCwgbGVuMiA9IHBhcnQubGVuZ3RoLCBrID0gbGVuMiAtIDE7IGogPCBsZW4yOyBrID0gaisrKSB7XG5cdFx0XHRwMSA9IHBhcnRbal07XG5cdFx0XHRwMiA9IHBhcnRba107XG5cblx0XHRcdGlmICgoKHAxLnkgPiBwLnkpICE9PSAocDIueSA+IHAueSkpICYmIChwLnggPCAocDIueCAtIHAxLngpICogKHAueSAtIHAxLnkpIC8gKHAyLnkgLSBwMS55KSArIHAxLngpKSB7XG5cdFx0XHRcdGluc2lkZSA9ICFpbnNpZGU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gYWxzbyBjaGVjayBpZiBpdCdzIG9uIHBvbHlnb24gc3Ryb2tlXG5cdHJldHVybiBpbnNpZGUgfHwgTC5Qb2x5bGluZS5wcm90b3R5cGUuX2NvbnRhaW5zUG9pbnQuY2FsbCh0aGlzLCBwLCB0cnVlKTtcbn07XG5cbkwuQ2lyY2xlTWFya2VyLnByb3RvdHlwZS5fY29udGFpbnNQb2ludCA9IGZ1bmN0aW9uIChwKSB7XG5cdHJldHVybiBwLmRpc3RhbmNlVG8odGhpcy5fcG9pbnQpIDw9IHRoaXMuX3JhZGl1cyArIHRoaXMuX2NsaWNrVG9sZXJhbmNlKCk7XG59O1xuXG5cblxuLypcclxuICogTC5HZW9KU09OIHR1cm5zIGFueSBHZW9KU09OIGRhdGEgaW50byBhIExlYWZsZXQgbGF5ZXIuXHJcbiAqL1xyXG5cclxuTC5HZW9KU09OID0gTC5GZWF0dXJlR3JvdXAuZXh0ZW5kKHtcclxuXHJcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKGdlb2pzb24sIG9wdGlvbnMpIHtcclxuXHRcdEwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcclxuXHJcblx0XHR0aGlzLl9sYXllcnMgPSB7fTtcclxuXHJcblx0XHRpZiAoZ2VvanNvbikge1xyXG5cdFx0XHR0aGlzLmFkZERhdGEoZ2VvanNvbik7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0YWRkRGF0YTogZnVuY3Rpb24gKGdlb2pzb24pIHtcclxuXHRcdHZhciBmZWF0dXJlcyA9IEwuVXRpbC5pc0FycmF5KGdlb2pzb24pID8gZ2VvanNvbiA6IGdlb2pzb24uZmVhdHVyZXMsXHJcblx0XHQgICAgaSwgbGVuLCBmZWF0dXJlO1xyXG5cclxuXHRcdGlmIChmZWF0dXJlcykge1xyXG5cdFx0XHRmb3IgKGkgPSAwLCBsZW4gPSBmZWF0dXJlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRcdC8vIG9ubHkgYWRkIHRoaXMgaWYgZ2VvbWV0cnkgb3IgZ2VvbWV0cmllcyBhcmUgc2V0IGFuZCBub3QgbnVsbFxyXG5cdFx0XHRcdGZlYXR1cmUgPSBmZWF0dXJlc1tpXTtcclxuXHRcdFx0XHRpZiAoZmVhdHVyZS5nZW9tZXRyaWVzIHx8IGZlYXR1cmUuZ2VvbWV0cnkgfHwgZmVhdHVyZS5mZWF0dXJlcyB8fCBmZWF0dXJlLmNvb3JkaW5hdGVzKSB7XHJcblx0XHRcdFx0XHR0aGlzLmFkZERhdGEoZmVhdHVyZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xyXG5cclxuXHRcdGlmIChvcHRpb25zLmZpbHRlciAmJiAhb3B0aW9ucy5maWx0ZXIoZ2VvanNvbikpIHsgcmV0dXJuIHRoaXM7IH1cclxuXHJcblx0XHR2YXIgbGF5ZXIgPSBMLkdlb0pTT04uZ2VvbWV0cnlUb0xheWVyKGdlb2pzb24sIG9wdGlvbnMpO1xyXG5cdFx0aWYgKCFsYXllcikge1xyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH1cclxuXHRcdGxheWVyLmZlYXR1cmUgPSBMLkdlb0pTT04uYXNGZWF0dXJlKGdlb2pzb24pO1xyXG5cclxuXHRcdGxheWVyLmRlZmF1bHRPcHRpb25zID0gbGF5ZXIub3B0aW9ucztcclxuXHRcdHRoaXMucmVzZXRTdHlsZShsYXllcik7XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMub25FYWNoRmVhdHVyZSkge1xyXG5cdFx0XHRvcHRpb25zLm9uRWFjaEZlYXR1cmUoZ2VvanNvbiwgbGF5ZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLmFkZExheWVyKGxheWVyKTtcclxuXHR9LFxyXG5cclxuXHRyZXNldFN0eWxlOiBmdW5jdGlvbiAobGF5ZXIpIHtcclxuXHRcdC8vIHJlc2V0IGFueSBjdXN0b20gc3R5bGVzXHJcblx0XHRsYXllci5vcHRpb25zID0gbGF5ZXIuZGVmYXVsdE9wdGlvbnM7XHJcblx0XHR0aGlzLl9zZXRMYXllclN0eWxlKGxheWVyLCB0aGlzLm9wdGlvbnMuc3R5bGUpO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0c2V0U3R5bGU6IGZ1bmN0aW9uIChzdHlsZSkge1xyXG5cdFx0cmV0dXJuIHRoaXMuZWFjaExheWVyKGZ1bmN0aW9uIChsYXllcikge1xyXG5cdFx0XHR0aGlzLl9zZXRMYXllclN0eWxlKGxheWVyLCBzdHlsZSk7XHJcblx0XHR9LCB0aGlzKTtcclxuXHR9LFxyXG5cclxuXHRfc2V0TGF5ZXJTdHlsZTogZnVuY3Rpb24gKGxheWVyLCBzdHlsZSkge1xyXG5cdFx0aWYgKHR5cGVvZiBzdHlsZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRzdHlsZSA9IHN0eWxlKGxheWVyLmZlYXR1cmUpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGxheWVyLnNldFN0eWxlKSB7XHJcblx0XHRcdGxheWVyLnNldFN0eWxlKHN0eWxlKTtcclxuXHRcdH1cclxuXHR9XHJcbn0pO1xyXG5cclxuTC5leHRlbmQoTC5HZW9KU09OLCB7XHJcblx0Z2VvbWV0cnlUb0xheWVyOiBmdW5jdGlvbiAoZ2VvanNvbiwgb3B0aW9ucykge1xyXG5cclxuXHRcdHZhciBnZW9tZXRyeSA9IGdlb2pzb24udHlwZSA9PT0gJ0ZlYXR1cmUnID8gZ2VvanNvbi5nZW9tZXRyeSA6IGdlb2pzb24sXHJcblx0XHQgICAgY29vcmRzID0gZ2VvbWV0cnkgPyBnZW9tZXRyeS5jb29yZGluYXRlcyA6IG51bGwsXHJcblx0XHQgICAgbGF5ZXJzID0gW10sXHJcblx0XHQgICAgcG9pbnRUb0xheWVyID0gb3B0aW9ucyAmJiBvcHRpb25zLnBvaW50VG9MYXllcixcclxuXHRcdCAgICBjb29yZHNUb0xhdExuZyA9IG9wdGlvbnMgJiYgb3B0aW9ucy5jb29yZHNUb0xhdExuZyB8fCB0aGlzLmNvb3Jkc1RvTGF0TG5nLFxyXG5cdFx0ICAgIGxhdGxuZywgbGF0bG5ncywgaSwgbGVuO1xyXG5cclxuXHRcdGlmICghY29vcmRzICYmICFnZW9tZXRyeSkge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRzd2l0Y2ggKGdlb21ldHJ5LnR5cGUpIHtcclxuXHRcdGNhc2UgJ1BvaW50JzpcclxuXHRcdFx0bGF0bG5nID0gY29vcmRzVG9MYXRMbmcoY29vcmRzKTtcclxuXHRcdFx0cmV0dXJuIHBvaW50VG9MYXllciA/IHBvaW50VG9MYXllcihnZW9qc29uLCBsYXRsbmcpIDogbmV3IEwuTWFya2VyKGxhdGxuZyk7XHJcblxyXG5cdFx0Y2FzZSAnTXVsdGlQb2ludCc6XHJcblx0XHRcdGZvciAoaSA9IDAsIGxlbiA9IGNvb3Jkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRcdGxhdGxuZyA9IGNvb3Jkc1RvTGF0TG5nKGNvb3Jkc1tpXSk7XHJcblx0XHRcdFx0bGF5ZXJzLnB1c2gocG9pbnRUb0xheWVyID8gcG9pbnRUb0xheWVyKGdlb2pzb24sIGxhdGxuZykgOiBuZXcgTC5NYXJrZXIobGF0bG5nKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG5ldyBMLkZlYXR1cmVHcm91cChsYXllcnMpO1xyXG5cclxuXHRcdGNhc2UgJ0xpbmVTdHJpbmcnOlxyXG5cdFx0Y2FzZSAnTXVsdGlMaW5lU3RyaW5nJzpcclxuXHRcdFx0bGF0bG5ncyA9IHRoaXMuY29vcmRzVG9MYXRMbmdzKGNvb3JkcywgZ2VvbWV0cnkudHlwZSA9PT0gJ0xpbmVTdHJpbmcnID8gMCA6IDEsIGNvb3Jkc1RvTGF0TG5nKTtcclxuXHRcdFx0cmV0dXJuIG5ldyBMLlBvbHlsaW5lKGxhdGxuZ3MsIG9wdGlvbnMpO1xyXG5cclxuXHRcdGNhc2UgJ1BvbHlnb24nOlxyXG5cdFx0Y2FzZSAnTXVsdGlQb2x5Z29uJzpcclxuXHRcdFx0bGF0bG5ncyA9IHRoaXMuY29vcmRzVG9MYXRMbmdzKGNvb3JkcywgZ2VvbWV0cnkudHlwZSA9PT0gJ1BvbHlnb24nID8gMSA6IDIsIGNvb3Jkc1RvTGF0TG5nKTtcclxuXHRcdFx0cmV0dXJuIG5ldyBMLlBvbHlnb24obGF0bG5ncywgb3B0aW9ucyk7XHJcblxyXG5cdFx0Y2FzZSAnR2VvbWV0cnlDb2xsZWN0aW9uJzpcclxuXHRcdFx0Zm9yIChpID0gMCwgbGVuID0gZ2VvbWV0cnkuZ2VvbWV0cmllcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRcdHZhciBsYXllciA9IHRoaXMuZ2VvbWV0cnlUb0xheWVyKHtcclxuXHRcdFx0XHRcdGdlb21ldHJ5OiBnZW9tZXRyeS5nZW9tZXRyaWVzW2ldLFxyXG5cdFx0XHRcdFx0dHlwZTogJ0ZlYXR1cmUnLFxyXG5cdFx0XHRcdFx0cHJvcGVydGllczogZ2VvanNvbi5wcm9wZXJ0aWVzXHJcblx0XHRcdFx0fSwgb3B0aW9ucyk7XHJcblxyXG5cdFx0XHRcdGlmIChsYXllcikge1xyXG5cdFx0XHRcdFx0bGF5ZXJzLnB1c2gobGF5ZXIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gbmV3IEwuRmVhdHVyZUdyb3VwKGxheWVycyk7XHJcblxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIEdlb0pTT04gb2JqZWN0LicpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGNvb3Jkc1RvTGF0TG5nOiBmdW5jdGlvbiAoY29vcmRzKSB7XHJcblx0XHRyZXR1cm4gbmV3IEwuTGF0TG5nKGNvb3Jkc1sxXSwgY29vcmRzWzBdLCBjb29yZHNbMl0pO1xyXG5cdH0sXHJcblxyXG5cdGNvb3Jkc1RvTGF0TG5nczogZnVuY3Rpb24gKGNvb3JkcywgbGV2ZWxzRGVlcCwgY29vcmRzVG9MYXRMbmcpIHtcclxuXHRcdHZhciBsYXRsbmdzID0gW107XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IGNvb3Jkcy5sZW5ndGgsIGxhdGxuZzsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdGxhdGxuZyA9IGxldmVsc0RlZXAgP1xyXG5cdFx0XHQgICAgICAgIHRoaXMuY29vcmRzVG9MYXRMbmdzKGNvb3Jkc1tpXSwgbGV2ZWxzRGVlcCAtIDEsIGNvb3Jkc1RvTGF0TG5nKSA6XHJcblx0XHRcdCAgICAgICAgKGNvb3Jkc1RvTGF0TG5nIHx8IHRoaXMuY29vcmRzVG9MYXRMbmcpKGNvb3Jkc1tpXSk7XHJcblxyXG5cdFx0XHRsYXRsbmdzLnB1c2gobGF0bG5nKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbGF0bG5ncztcclxuXHR9LFxyXG5cclxuXHRsYXRMbmdUb0Nvb3JkczogZnVuY3Rpb24gKGxhdGxuZykge1xyXG5cdFx0cmV0dXJuIGxhdGxuZy5hbHQgIT09IHVuZGVmaW5lZCA/XHJcblx0XHRcdFx0W2xhdGxuZy5sbmcsIGxhdGxuZy5sYXQsIGxhdGxuZy5hbHRdIDpcclxuXHRcdFx0XHRbbGF0bG5nLmxuZywgbGF0bG5nLmxhdF07XHJcblx0fSxcclxuXHJcblx0bGF0TG5nc1RvQ29vcmRzOiBmdW5jdGlvbiAobGF0bG5ncywgbGV2ZWxzRGVlcCwgY2xvc2VkKSB7XHJcblx0XHR2YXIgY29vcmRzID0gW107XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IGxhdGxuZ3MubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0Y29vcmRzLnB1c2gobGV2ZWxzRGVlcCA/XHJcblx0XHRcdFx0TC5HZW9KU09OLmxhdExuZ3NUb0Nvb3JkcyhsYXRsbmdzW2ldLCBsZXZlbHNEZWVwIC0gMSwgY2xvc2VkKSA6XHJcblx0XHRcdFx0TC5HZW9KU09OLmxhdExuZ1RvQ29vcmRzKGxhdGxuZ3NbaV0pKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIWxldmVsc0RlZXAgJiYgY2xvc2VkKSB7XHJcblx0XHRcdGNvb3Jkcy5wdXNoKGNvb3Jkc1swXSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGNvb3JkcztcclxuXHR9LFxyXG5cclxuXHRnZXRGZWF0dXJlOiBmdW5jdGlvbiAobGF5ZXIsIG5ld0dlb21ldHJ5KSB7XHJcblx0XHRyZXR1cm4gbGF5ZXIuZmVhdHVyZSA/XHJcblx0XHRcdFx0TC5leHRlbmQoe30sIGxheWVyLmZlYXR1cmUsIHtnZW9tZXRyeTogbmV3R2VvbWV0cnl9KSA6XHJcblx0XHRcdFx0TC5HZW9KU09OLmFzRmVhdHVyZShuZXdHZW9tZXRyeSk7XHJcblx0fSxcclxuXHJcblx0YXNGZWF0dXJlOiBmdW5jdGlvbiAoZ2VvSlNPTikge1xyXG5cdFx0aWYgKGdlb0pTT04udHlwZSA9PT0gJ0ZlYXR1cmUnKSB7XHJcblx0XHRcdHJldHVybiBnZW9KU09OO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHR5cGU6ICdGZWF0dXJlJyxcclxuXHRcdFx0cHJvcGVydGllczoge30sXHJcblx0XHRcdGdlb21ldHJ5OiBnZW9KU09OXHJcblx0XHR9O1xyXG5cdH1cclxufSk7XHJcblxyXG52YXIgUG9pbnRUb0dlb0pTT04gPSB7XHJcblx0dG9HZW9KU09OOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gTC5HZW9KU09OLmdldEZlYXR1cmUodGhpcywge1xyXG5cdFx0XHR0eXBlOiAnUG9pbnQnLFxyXG5cdFx0XHRjb29yZGluYXRlczogTC5HZW9KU09OLmxhdExuZ1RvQ29vcmRzKHRoaXMuZ2V0TGF0TG5nKCkpXHJcblx0XHR9KTtcclxuXHR9XHJcbn07XHJcblxyXG5MLk1hcmtlci5pbmNsdWRlKFBvaW50VG9HZW9KU09OKTtcclxuTC5DaXJjbGUuaW5jbHVkZShQb2ludFRvR2VvSlNPTik7XHJcbkwuQ2lyY2xlTWFya2VyLmluY2x1ZGUoUG9pbnRUb0dlb0pTT04pO1xyXG5cclxuTC5Qb2x5bGluZS5wcm90b3R5cGUudG9HZW9KU09OID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciBtdWx0aSA9ICFMLlBvbHlsaW5lLl9mbGF0KHRoaXMuX2xhdGxuZ3MpO1xyXG5cclxuXHR2YXIgY29vcmRzID0gTC5HZW9KU09OLmxhdExuZ3NUb0Nvb3Jkcyh0aGlzLl9sYXRsbmdzLCBtdWx0aSA/IDEgOiAwKTtcclxuXHJcblx0cmV0dXJuIEwuR2VvSlNPTi5nZXRGZWF0dXJlKHRoaXMsIHtcclxuXHRcdHR5cGU6IChtdWx0aSA/ICdNdWx0aScgOiAnJykgKyAnTGluZVN0cmluZycsXHJcblx0XHRjb29yZGluYXRlczogY29vcmRzXHJcblx0fSk7XHJcbn07XHJcblxyXG5MLlBvbHlnb24ucHJvdG90eXBlLnRvR2VvSlNPTiA9IGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgaG9sZXMgPSAhTC5Qb2x5bGluZS5fZmxhdCh0aGlzLl9sYXRsbmdzKSxcclxuXHQgICAgbXVsdGkgPSBob2xlcyAmJiAhTC5Qb2x5bGluZS5fZmxhdCh0aGlzLl9sYXRsbmdzWzBdKTtcclxuXHJcblx0dmFyIGNvb3JkcyA9IEwuR2VvSlNPTi5sYXRMbmdzVG9Db29yZHModGhpcy5fbGF0bG5ncywgbXVsdGkgPyAyIDogaG9sZXMgPyAxIDogMCwgdHJ1ZSk7XHJcblxyXG5cdGlmICghaG9sZXMpIHtcclxuXHRcdGNvb3JkcyA9IFtjb29yZHNdO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIEwuR2VvSlNPTi5nZXRGZWF0dXJlKHRoaXMsIHtcclxuXHRcdHR5cGU6IChtdWx0aSA/ICdNdWx0aScgOiAnJykgKyAnUG9seWdvbicsXHJcblx0XHRjb29yZGluYXRlczogY29vcmRzXHJcblx0fSk7XHJcbn07XHJcblxyXG5cclxuTC5MYXllckdyb3VwLmluY2x1ZGUoe1xyXG5cdHRvTXVsdGlQb2ludDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGNvb3JkcyA9IFtdO1xyXG5cclxuXHRcdHRoaXMuZWFjaExheWVyKGZ1bmN0aW9uIChsYXllcikge1xyXG5cdFx0XHRjb29yZHMucHVzaChsYXllci50b0dlb0pTT04oKS5nZW9tZXRyeS5jb29yZGluYXRlcyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gTC5HZW9KU09OLmdldEZlYXR1cmUodGhpcywge1xyXG5cdFx0XHR0eXBlOiAnTXVsdGlQb2ludCcsXHJcblx0XHRcdGNvb3JkaW5hdGVzOiBjb29yZHNcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdHRvR2VvSlNPTjogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHZhciB0eXBlID0gdGhpcy5mZWF0dXJlICYmIHRoaXMuZmVhdHVyZS5nZW9tZXRyeSAmJiB0aGlzLmZlYXR1cmUuZ2VvbWV0cnkudHlwZTtcclxuXHJcblx0XHRpZiAodHlwZSA9PT0gJ011bHRpUG9pbnQnKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLnRvTXVsdGlQb2ludCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBpc0dlb21ldHJ5Q29sbGVjdGlvbiA9IHR5cGUgPT09ICdHZW9tZXRyeUNvbGxlY3Rpb24nLFxyXG5cdFx0ICAgIGpzb25zID0gW107XHJcblxyXG5cdFx0dGhpcy5lYWNoTGF5ZXIoZnVuY3Rpb24gKGxheWVyKSB7XHJcblx0XHRcdGlmIChsYXllci50b0dlb0pTT04pIHtcclxuXHRcdFx0XHR2YXIganNvbiA9IGxheWVyLnRvR2VvSlNPTigpO1xyXG5cdFx0XHRcdGpzb25zLnB1c2goaXNHZW9tZXRyeUNvbGxlY3Rpb24gPyBqc29uLmdlb21ldHJ5IDogTC5HZW9KU09OLmFzRmVhdHVyZShqc29uKSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmIChpc0dlb21ldHJ5Q29sbGVjdGlvbikge1xyXG5cdFx0XHRyZXR1cm4gTC5HZW9KU09OLmdldEZlYXR1cmUodGhpcywge1xyXG5cdFx0XHRcdGdlb21ldHJpZXM6IGpzb25zLFxyXG5cdFx0XHRcdHR5cGU6ICdHZW9tZXRyeUNvbGxlY3Rpb24nXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXHJcblx0XHRcdGZlYXR1cmVzOiBqc29uc1xyXG5cdFx0fTtcclxuXHR9XHJcbn0pO1xyXG5cclxuTC5nZW9Kc29uID0gZnVuY3Rpb24gKGdlb2pzb24sIG9wdGlvbnMpIHtcclxuXHRyZXR1cm4gbmV3IEwuR2VvSlNPTihnZW9qc29uLCBvcHRpb25zKTtcclxufTtcclxuXG5cblxuLypcclxuICogTC5Eb21FdmVudCBjb250YWlucyBmdW5jdGlvbnMgZm9yIHdvcmtpbmcgd2l0aCBET00gZXZlbnRzLlxyXG4gKiBJbnNwaXJlZCBieSBKb2huIFJlc2lnLCBEZWFuIEVkd2FyZHMgYW5kIFlVSSBhZGRFdmVudCBpbXBsZW1lbnRhdGlvbnMuXHJcbiAqL1xyXG5cclxudmFyIGV2ZW50c0tleSA9ICdfbGVhZmxldF9ldmVudHMnO1xyXG5cclxuTC5Eb21FdmVudCA9IHtcclxuXHJcblx0b246IGZ1bmN0aW9uIChvYmosIHR5cGVzLCBmbiwgY29udGV4dCkge1xyXG5cclxuXHRcdGlmICh0eXBlb2YgdHlwZXMgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdGZvciAodmFyIHR5cGUgaW4gdHlwZXMpIHtcclxuXHRcdFx0XHR0aGlzLl9vbihvYmosIHR5cGUsIHR5cGVzW3R5cGVdLCBmbik7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHR5cGVzID0gTC5VdGlsLnNwbGl0V29yZHModHlwZXMpO1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IHR5cGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdFx0dGhpcy5fb24ob2JqLCB0eXBlc1tpXSwgZm4sIGNvbnRleHQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0b2ZmOiBmdW5jdGlvbiAob2JqLCB0eXBlcywgZm4sIGNvbnRleHQpIHtcclxuXHJcblx0XHRpZiAodHlwZW9mIHR5cGVzID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRmb3IgKHZhciB0eXBlIGluIHR5cGVzKSB7XHJcblx0XHRcdFx0dGhpcy5fb2ZmKG9iaiwgdHlwZSwgdHlwZXNbdHlwZV0sIGZuKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dHlwZXMgPSBMLlV0aWwuc3BsaXRXb3Jkcyh0eXBlcyk7XHJcblxyXG5cdFx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gdHlwZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0XHR0aGlzLl9vZmYob2JqLCB0eXBlc1tpXSwgZm4sIGNvbnRleHQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0X29uOiBmdW5jdGlvbiAob2JqLCB0eXBlLCBmbiwgY29udGV4dCkge1xyXG5cdFx0dmFyIGlkID0gdHlwZSArIEwuc3RhbXAoZm4pICsgKGNvbnRleHQgPyAnXycgKyBMLnN0YW1wKGNvbnRleHQpIDogJycpO1xyXG5cclxuXHRcdGlmIChvYmpbZXZlbnRzS2V5XSAmJiBvYmpbZXZlbnRzS2V5XVtpZF0pIHsgcmV0dXJuIHRoaXM7IH1cclxuXHJcblx0XHR2YXIgaGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdHJldHVybiBmbi5jYWxsKGNvbnRleHQgfHwgb2JqLCBlIHx8IHdpbmRvdy5ldmVudCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHZhciBvcmlnaW5hbEhhbmRsZXIgPSBoYW5kbGVyO1xyXG5cclxuXHRcdGlmIChMLkJyb3dzZXIucG9pbnRlciAmJiB0eXBlLmluZGV4T2YoJ3RvdWNoJykgPT09IDApIHtcclxuXHRcdFx0dGhpcy5hZGRQb2ludGVyTGlzdGVuZXIob2JqLCB0eXBlLCBoYW5kbGVyLCBpZCk7XHJcblxyXG5cdFx0fSBlbHNlIGlmIChMLkJyb3dzZXIudG91Y2ggJiYgKHR5cGUgPT09ICdkYmxjbGljaycpICYmIHRoaXMuYWRkRG91YmxlVGFwTGlzdGVuZXIpIHtcclxuXHRcdFx0dGhpcy5hZGREb3VibGVUYXBMaXN0ZW5lcihvYmosIGhhbmRsZXIsIGlkKTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKCdhZGRFdmVudExpc3RlbmVyJyBpbiBvYmopIHtcclxuXHJcblx0XHRcdGlmICh0eXBlID09PSAnbW91c2V3aGVlbCcpIHtcclxuXHRcdFx0XHRvYmouYWRkRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBoYW5kbGVyLCBmYWxzZSk7XHJcblx0XHRcdFx0b2JqLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgZmFsc2UpO1xyXG5cclxuXHRcdFx0fSBlbHNlIGlmICgodHlwZSA9PT0gJ21vdXNlZW50ZXInKSB8fCAodHlwZSA9PT0gJ21vdXNlbGVhdmUnKSkge1xyXG5cdFx0XHRcdGhhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdFx0ZSA9IGUgfHwgd2luZG93LmV2ZW50O1xyXG5cdFx0XHRcdFx0aWYgKEwuRG9tRXZlbnQuX2lzRXh0ZXJuYWxUYXJnZXQob2JqLCBlKSkge1xyXG5cdFx0XHRcdFx0XHRvcmlnaW5hbEhhbmRsZXIoZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHRvYmouYWRkRXZlbnRMaXN0ZW5lcih0eXBlID09PSAnbW91c2VlbnRlcicgPyAnbW91c2VvdmVyJyA6ICdtb3VzZW91dCcsIGhhbmRsZXIsIGZhbHNlKTtcclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aWYgKHR5cGUgPT09ICdjbGljaycgJiYgTC5Ccm93c2VyLmFuZHJvaWQpIHtcclxuXHRcdFx0XHRcdGhhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gTC5Eb21FdmVudC5fZmlsdGVyQ2xpY2soZSwgb3JpZ2luYWxIYW5kbGVyKTtcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdG9iai5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIGZhbHNlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH0gZWxzZSBpZiAoJ2F0dGFjaEV2ZW50JyBpbiBvYmopIHtcclxuXHRcdFx0b2JqLmF0dGFjaEV2ZW50KCdvbicgKyB0eXBlLCBoYW5kbGVyKTtcclxuXHRcdH1cclxuXHJcblx0XHRvYmpbZXZlbnRzS2V5XSA9IG9ialtldmVudHNLZXldIHx8IHt9O1xyXG5cdFx0b2JqW2V2ZW50c0tleV1baWRdID0gaGFuZGxlcjtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRfb2ZmOiBmdW5jdGlvbiAob2JqLCB0eXBlLCBmbiwgY29udGV4dCkge1xyXG5cclxuXHRcdHZhciBpZCA9IHR5cGUgKyBMLnN0YW1wKGZuKSArIChjb250ZXh0ID8gJ18nICsgTC5zdGFtcChjb250ZXh0KSA6ICcnKSxcclxuXHRcdCAgICBoYW5kbGVyID0gb2JqW2V2ZW50c0tleV0gJiYgb2JqW2V2ZW50c0tleV1baWRdO1xyXG5cclxuXHRcdGlmICghaGFuZGxlcikgeyByZXR1cm4gdGhpczsgfVxyXG5cclxuXHRcdGlmIChMLkJyb3dzZXIucG9pbnRlciAmJiB0eXBlLmluZGV4T2YoJ3RvdWNoJykgPT09IDApIHtcclxuXHRcdFx0dGhpcy5yZW1vdmVQb2ludGVyTGlzdGVuZXIob2JqLCB0eXBlLCBpZCk7XHJcblxyXG5cdFx0fSBlbHNlIGlmIChMLkJyb3dzZXIudG91Y2ggJiYgKHR5cGUgPT09ICdkYmxjbGljaycpICYmIHRoaXMucmVtb3ZlRG91YmxlVGFwTGlzdGVuZXIpIHtcclxuXHRcdFx0dGhpcy5yZW1vdmVEb3VibGVUYXBMaXN0ZW5lcihvYmosIGlkKTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKCdyZW1vdmVFdmVudExpc3RlbmVyJyBpbiBvYmopIHtcclxuXHJcblx0XHRcdGlmICh0eXBlID09PSAnbW91c2V3aGVlbCcpIHtcclxuXHRcdFx0XHRvYmoucmVtb3ZlRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBoYW5kbGVyLCBmYWxzZSk7XHJcblx0XHRcdFx0b2JqLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgZmFsc2UpO1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRvYmoucmVtb3ZlRXZlbnRMaXN0ZW5lcihcclxuXHRcdFx0XHRcdHR5cGUgPT09ICdtb3VzZWVudGVyJyA/ICdtb3VzZW92ZXInIDpcclxuXHRcdFx0XHRcdHR5cGUgPT09ICdtb3VzZWxlYXZlJyA/ICdtb3VzZW91dCcgOiB0eXBlLCBoYW5kbGVyLCBmYWxzZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9IGVsc2UgaWYgKCdkZXRhY2hFdmVudCcgaW4gb2JqKSB7XHJcblx0XHRcdG9iai5kZXRhY2hFdmVudCgnb24nICsgdHlwZSwgaGFuZGxlcik7XHJcblx0XHR9XHJcblxyXG5cdFx0b2JqW2V2ZW50c0tleV1baWRdID0gbnVsbDtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRzdG9wUHJvcGFnYXRpb246IGZ1bmN0aW9uIChlKSB7XHJcblxyXG5cdFx0aWYgKGUuc3RvcFByb3BhZ2F0aW9uKSB7XHJcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHR9IGVsc2UgaWYgKGUub3JpZ2luYWxFdmVudCkgeyAgLy8gSW4gY2FzZSBvZiBMZWFmbGV0IGV2ZW50LlxyXG5cdFx0XHRlLm9yaWdpbmFsRXZlbnQuX3N0b3BwZWQgPSB0cnVlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZS5jYW5jZWxCdWJibGUgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0TC5Eb21FdmVudC5fc2tpcHBlZChlKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRkaXNhYmxlU2Nyb2xsUHJvcGFnYXRpb246IGZ1bmN0aW9uIChlbCkge1xyXG5cdFx0cmV0dXJuIEwuRG9tRXZlbnQub24oZWwsICdtb3VzZXdoZWVsIE1vek1vdXNlUGl4ZWxTY3JvbGwnLCBMLkRvbUV2ZW50LnN0b3BQcm9wYWdhdGlvbik7XHJcblx0fSxcclxuXHJcblx0ZGlzYWJsZUNsaWNrUHJvcGFnYXRpb246IGZ1bmN0aW9uIChlbCkge1xyXG5cdFx0dmFyIHN0b3AgPSBMLkRvbUV2ZW50LnN0b3BQcm9wYWdhdGlvbjtcclxuXHJcblx0XHRMLkRvbUV2ZW50Lm9uKGVsLCBMLkRyYWdnYWJsZS5TVEFSVC5qb2luKCcgJyksIHN0b3ApO1xyXG5cclxuXHRcdHJldHVybiBMLkRvbUV2ZW50Lm9uKGVsLCB7XHJcblx0XHRcdGNsaWNrOiBMLkRvbUV2ZW50Ll9mYWtlU3RvcCxcclxuXHRcdFx0ZGJsY2xpY2s6IHN0b3BcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdHByZXZlbnREZWZhdWx0OiBmdW5jdGlvbiAoZSkge1xyXG5cclxuXHRcdGlmIChlLnByZXZlbnREZWZhdWx0KSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHN0b3A6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRyZXR1cm4gTC5Eb21FdmVudFxyXG5cdFx0XHQucHJldmVudERlZmF1bHQoZSlcclxuXHRcdFx0LnN0b3BQcm9wYWdhdGlvbihlKTtcclxuXHR9LFxyXG5cclxuXHRnZXRNb3VzZVBvc2l0aW9uOiBmdW5jdGlvbiAoZSwgY29udGFpbmVyKSB7XHJcblx0XHRpZiAoIWNvbnRhaW5lcikge1xyXG5cdFx0XHRyZXR1cm4gbmV3IEwuUG9pbnQoZS5jbGllbnRYLCBlLmNsaWVudFkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciByZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuXHRcdHJldHVybiBuZXcgTC5Qb2ludChcclxuXHRcdFx0ZS5jbGllbnRYIC0gcmVjdC5sZWZ0IC0gY29udGFpbmVyLmNsaWVudExlZnQsXHJcblx0XHRcdGUuY2xpZW50WSAtIHJlY3QudG9wIC0gY29udGFpbmVyLmNsaWVudFRvcCk7XHJcblx0fSxcclxuXHJcblx0Z2V0V2hlZWxEZWx0YTogZnVuY3Rpb24gKGUpIHtcclxuXHJcblx0XHR2YXIgZGVsdGEgPSAwO1xyXG5cclxuXHRcdGlmIChlLndoZWVsRGVsdGEpIHtcclxuXHRcdFx0ZGVsdGEgPSBlLndoZWVsRGVsdGEgLyAxMjA7XHJcblx0XHR9XHJcblx0XHRpZiAoZS5kZXRhaWwpIHtcclxuXHRcdFx0ZGVsdGEgPSAtZS5kZXRhaWwgLyAzO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGRlbHRhO1xyXG5cdH0sXHJcblxyXG5cdF9za2lwRXZlbnRzOiB7fSxcclxuXHJcblx0X2Zha2VTdG9wOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0Ly8gZmFrZXMgc3RvcFByb3BhZ2F0aW9uIGJ5IHNldHRpbmcgYSBzcGVjaWFsIGV2ZW50IGZsYWcsIGNoZWNrZWQvcmVzZXQgd2l0aCBMLkRvbUV2ZW50Ll9za2lwcGVkKGUpXHJcblx0XHRMLkRvbUV2ZW50Ll9za2lwRXZlbnRzW2UudHlwZV0gPSB0cnVlO1xyXG5cdH0sXHJcblxyXG5cdF9za2lwcGVkOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dmFyIHNraXBwZWQgPSB0aGlzLl9za2lwRXZlbnRzW2UudHlwZV07XHJcblx0XHQvLyByZXNldCB3aGVuIGNoZWNraW5nLCBhcyBpdCdzIG9ubHkgdXNlZCBpbiBtYXAgY29udGFpbmVyIGFuZCBwcm9wYWdhdGVzIG91dHNpZGUgb2YgdGhlIG1hcFxyXG5cdFx0dGhpcy5fc2tpcEV2ZW50c1tlLnR5cGVdID0gZmFsc2U7XHJcblx0XHRyZXR1cm4gc2tpcHBlZDtcclxuXHR9LFxyXG5cclxuXHQvLyBjaGVjayBpZiBlbGVtZW50IHJlYWxseSBsZWZ0L2VudGVyZWQgdGhlIGV2ZW50IHRhcmdldCAoZm9yIG1vdXNlZW50ZXIvbW91c2VsZWF2ZSlcclxuXHRfaXNFeHRlcm5hbFRhcmdldDogZnVuY3Rpb24gKGVsLCBlKSB7XHJcblxyXG5cdFx0dmFyIHJlbGF0ZWQgPSBlLnJlbGF0ZWRUYXJnZXQ7XHJcblxyXG5cdFx0aWYgKCFyZWxhdGVkKSB7IHJldHVybiB0cnVlOyB9XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0d2hpbGUgKHJlbGF0ZWQgJiYgKHJlbGF0ZWQgIT09IGVsKSkge1xyXG5cdFx0XHRcdHJlbGF0ZWQgPSByZWxhdGVkLnBhcmVudE5vZGU7XHJcblx0XHRcdH1cclxuXHRcdH0gY2F0Y2ggKGVycikge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gKHJlbGF0ZWQgIT09IGVsKTtcclxuXHR9LFxyXG5cclxuXHQvLyB0aGlzIGlzIGEgaG9ycmlibGUgd29ya2Fyb3VuZCBmb3IgYSBidWcgaW4gQW5kcm9pZCB3aGVyZSBhIHNpbmdsZSB0b3VjaCB0cmlnZ2VycyB0d28gY2xpY2sgZXZlbnRzXHJcblx0X2ZpbHRlckNsaWNrOiBmdW5jdGlvbiAoZSwgaGFuZGxlcikge1xyXG5cdFx0dmFyIHRpbWVTdGFtcCA9IChlLnRpbWVTdGFtcCB8fCBlLm9yaWdpbmFsRXZlbnQudGltZVN0YW1wKSxcclxuXHRcdCAgICBlbGFwc2VkID0gTC5Eb21FdmVudC5fbGFzdENsaWNrICYmICh0aW1lU3RhbXAgLSBMLkRvbUV2ZW50Ll9sYXN0Q2xpY2spO1xyXG5cclxuXHRcdC8vIGFyZSB0aGV5IGNsb3NlciB0b2dldGhlciB0aGFuIDUwMG1zIHlldCBtb3JlIHRoYW4gMTAwbXM/XHJcblx0XHQvLyBBbmRyb2lkIHR5cGljYWxseSB0cmlnZ2VycyB0aGVtIH4zMDBtcyBhcGFydCB3aGlsZSBtdWx0aXBsZSBsaXN0ZW5lcnNcclxuXHRcdC8vIG9uIHRoZSBzYW1lIGV2ZW50IHNob3VsZCBiZSB0cmlnZ2VyZWQgZmFyIGZhc3RlcjtcclxuXHRcdC8vIG9yIGNoZWNrIGlmIGNsaWNrIGlzIHNpbXVsYXRlZCBvbiB0aGUgZWxlbWVudCwgYW5kIGlmIGl0IGlzLCByZWplY3QgYW55IG5vbi1zaW11bGF0ZWQgZXZlbnRzXHJcblxyXG5cdFx0aWYgKChlbGFwc2VkICYmIGVsYXBzZWQgPiAxMDAgJiYgZWxhcHNlZCA8IDUwMCkgfHwgKGUudGFyZ2V0Ll9zaW11bGF0ZWRDbGljayAmJiAhZS5fc2ltdWxhdGVkKSkge1xyXG5cdFx0XHRMLkRvbUV2ZW50LnN0b3AoZSk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdEwuRG9tRXZlbnQuX2xhc3RDbGljayA9IHRpbWVTdGFtcDtcclxuXHJcblx0XHRoYW5kbGVyKGUpO1xyXG5cdH1cclxufTtcclxuXHJcbkwuRG9tRXZlbnQuYWRkTGlzdGVuZXIgPSBMLkRvbUV2ZW50Lm9uO1xyXG5MLkRvbUV2ZW50LnJlbW92ZUxpc3RlbmVyID0gTC5Eb21FdmVudC5vZmY7XHJcblxuXG5cbi8qXHJcbiAqIEwuRHJhZ2dhYmxlIGFsbG93cyB5b3UgdG8gYWRkIGRyYWdnaW5nIGNhcGFiaWxpdGllcyB0byBhbnkgZWxlbWVudC4gU3VwcG9ydHMgbW9iaWxlIGRldmljZXMgdG9vLlxyXG4gKi9cclxuXHJcbkwuRHJhZ2dhYmxlID0gTC5FdmVudGVkLmV4dGVuZCh7XHJcblxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdFNUQVJUOiBMLkJyb3dzZXIudG91Y2ggPyBbJ3RvdWNoc3RhcnQnLCAnbW91c2Vkb3duJ10gOiBbJ21vdXNlZG93biddLFxyXG5cdFx0RU5EOiB7XHJcblx0XHRcdG1vdXNlZG93bjogJ21vdXNldXAnLFxyXG5cdFx0XHR0b3VjaHN0YXJ0OiAndG91Y2hlbmQnLFxyXG5cdFx0XHRwb2ludGVyZG93bjogJ3RvdWNoZW5kJyxcclxuXHRcdFx0TVNQb2ludGVyRG93bjogJ3RvdWNoZW5kJ1xyXG5cdFx0fSxcclxuXHRcdE1PVkU6IHtcclxuXHRcdFx0bW91c2Vkb3duOiAnbW91c2Vtb3ZlJyxcclxuXHRcdFx0dG91Y2hzdGFydDogJ3RvdWNobW92ZScsXHJcblx0XHRcdHBvaW50ZXJkb3duOiAndG91Y2htb3ZlJyxcclxuXHRcdFx0TVNQb2ludGVyRG93bjogJ3RvdWNobW92ZSdcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRpbml0aWFsaXplOiBmdW5jdGlvbiAoZWxlbWVudCwgZHJhZ1N0YXJ0VGFyZ2V0LCBwcmV2ZW50T3V0bGluZSkge1xyXG5cdFx0dGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XHJcblx0XHR0aGlzLl9kcmFnU3RhcnRUYXJnZXQgPSBkcmFnU3RhcnRUYXJnZXQgfHwgZWxlbWVudDtcclxuXHRcdHRoaXMuX3ByZXZlbnRPdXRsaW5lID0gcHJldmVudE91dGxpbmU7XHJcblx0fSxcclxuXHJcblx0ZW5hYmxlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAodGhpcy5fZW5hYmxlZCkgeyByZXR1cm47IH1cclxuXHJcblx0XHRMLkRvbUV2ZW50Lm9uKHRoaXMuX2RyYWdTdGFydFRhcmdldCwgTC5EcmFnZ2FibGUuU1RBUlQuam9pbignICcpLCB0aGlzLl9vbkRvd24sIHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuX2VuYWJsZWQgPSB0cnVlO1xyXG5cdH0sXHJcblxyXG5cdGRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICghdGhpcy5fZW5hYmxlZCkgeyByZXR1cm47IH1cclxuXHJcblx0XHRMLkRvbUV2ZW50Lm9mZih0aGlzLl9kcmFnU3RhcnRUYXJnZXQsIEwuRHJhZ2dhYmxlLlNUQVJULmpvaW4oJyAnKSwgdGhpcy5fb25Eb3duLCB0aGlzKTtcclxuXHJcblx0XHR0aGlzLl9lbmFibGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLl9tb3ZlZCA9IGZhbHNlO1xyXG5cdH0sXHJcblxyXG5cdF9vbkRvd246IGZ1bmN0aW9uIChlKSB7XHJcblx0XHR0aGlzLl9tb3ZlZCA9IGZhbHNlO1xyXG5cclxuXHRcdGlmIChMLkRvbVV0aWwuaGFzQ2xhc3ModGhpcy5fZWxlbWVudCwgJ2xlYWZsZXQtem9vbS1hbmltJykpIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0aWYgKEwuRHJhZ2dhYmxlLl9kcmFnZ2luZyB8fCBlLnNoaWZ0S2V5IHx8ICgoZS53aGljaCAhPT0gMSkgJiYgKGUuYnV0dG9uICE9PSAxKSAmJiAhZS50b3VjaGVzKSB8fCAhdGhpcy5fZW5hYmxlZCkgeyByZXR1cm47IH1cclxuXHRcdEwuRHJhZ2dhYmxlLl9kcmFnZ2luZyA9IHRydWU7ICAvLyBQcmV2ZW50IGRyYWdnaW5nIG11bHRpcGxlIG9iamVjdHMgYXQgb25jZS5cclxuXHJcblx0XHRpZiAodGhpcy5fcHJldmVudE91dGxpbmUpIHtcclxuXHRcdFx0TC5Eb21VdGlsLnByZXZlbnRPdXRsaW5lKHRoaXMuX2VsZW1lbnQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdEwuRG9tVXRpbC5kaXNhYmxlSW1hZ2VEcmFnKCk7XHJcblx0XHRMLkRvbVV0aWwuZGlzYWJsZVRleHRTZWxlY3Rpb24oKTtcclxuXHJcblx0XHRpZiAodGhpcy5fbW92aW5nKSB7IHJldHVybjsgfVxyXG5cclxuXHRcdHRoaXMuZmlyZSgnZG93bicpO1xyXG5cclxuXHRcdHZhciBmaXJzdCA9IGUudG91Y2hlcyA/IGUudG91Y2hlc1swXSA6IGU7XHJcblxyXG5cdFx0dGhpcy5fc3RhcnRQb2ludCA9IG5ldyBMLlBvaW50KGZpcnN0LmNsaWVudFgsIGZpcnN0LmNsaWVudFkpO1xyXG5cdFx0dGhpcy5fc3RhcnRQb3MgPSB0aGlzLl9uZXdQb3MgPSBMLkRvbVV0aWwuZ2V0UG9zaXRpb24odGhpcy5fZWxlbWVudCk7XHJcblxyXG5cdFx0TC5Eb21FdmVudFxyXG5cdFx0ICAgIC5vbihkb2N1bWVudCwgTC5EcmFnZ2FibGUuTU9WRVtlLnR5cGVdLCB0aGlzLl9vbk1vdmUsIHRoaXMpXHJcblx0XHQgICAgLm9uKGRvY3VtZW50LCBMLkRyYWdnYWJsZS5FTkRbZS50eXBlXSwgdGhpcy5fb25VcCwgdGhpcyk7XHJcblx0fSxcclxuXHJcblx0X29uTW92ZTogZnVuY3Rpb24gKGUpIHtcclxuXHRcdGlmIChlLnRvdWNoZXMgJiYgZS50b3VjaGVzLmxlbmd0aCA+IDEpIHtcclxuXHRcdFx0dGhpcy5fbW92ZWQgPSB0cnVlO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGZpcnN0ID0gKGUudG91Y2hlcyAmJiBlLnRvdWNoZXMubGVuZ3RoID09PSAxID8gZS50b3VjaGVzWzBdIDogZSksXHJcblx0XHQgICAgbmV3UG9pbnQgPSBuZXcgTC5Qb2ludChmaXJzdC5jbGllbnRYLCBmaXJzdC5jbGllbnRZKSxcclxuXHRcdCAgICBvZmZzZXQgPSBuZXdQb2ludC5zdWJ0cmFjdCh0aGlzLl9zdGFydFBvaW50KTtcclxuXHJcblx0XHRpZiAoIW9mZnNldC54ICYmICFvZmZzZXQueSkgeyByZXR1cm47IH1cclxuXHRcdGlmIChMLkJyb3dzZXIudG91Y2ggJiYgTWF0aC5hYnMob2Zmc2V0LngpICsgTWF0aC5hYnMob2Zmc2V0LnkpIDwgMykgeyByZXR1cm47IH1cclxuXHJcblx0XHRMLkRvbUV2ZW50LnByZXZlbnREZWZhdWx0KGUpO1xyXG5cclxuXHRcdGlmICghdGhpcy5fbW92ZWQpIHtcclxuXHRcdFx0dGhpcy5maXJlKCdkcmFnc3RhcnQnKTtcclxuXHJcblx0XHRcdHRoaXMuX21vdmVkID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5fc3RhcnRQb3MgPSBMLkRvbVV0aWwuZ2V0UG9zaXRpb24odGhpcy5fZWxlbWVudCkuc3VidHJhY3Qob2Zmc2V0KTtcclxuXHJcblx0XHRcdEwuRG9tVXRpbC5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAnbGVhZmxldC1kcmFnZ2luZycpO1xyXG5cclxuXHRcdFx0dGhpcy5fbGFzdFRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcclxuXHRcdFx0TC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX2xhc3RUYXJnZXQsICdsZWFmbGV0LWRyYWctdGFyZ2V0Jyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fbmV3UG9zID0gdGhpcy5fc3RhcnRQb3MuYWRkKG9mZnNldCk7XHJcblx0XHR0aGlzLl9tb3ZpbmcgPSB0cnVlO1xyXG5cclxuXHRcdEwuVXRpbC5jYW5jZWxBbmltRnJhbWUodGhpcy5fYW5pbVJlcXVlc3QpO1xyXG5cdFx0dGhpcy5fbGFzdEV2ZW50ID0gZTtcclxuXHRcdHRoaXMuX2FuaW1SZXF1ZXN0ID0gTC5VdGlsLnJlcXVlc3RBbmltRnJhbWUodGhpcy5fdXBkYXRlUG9zaXRpb24sIHRoaXMsIHRydWUpO1xyXG5cdH0sXHJcblxyXG5cdF91cGRhdGVQb3NpdGlvbjogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGUgPSB7b3JpZ2luYWxFdmVudDogdGhpcy5fbGFzdEV2ZW50fTtcclxuXHRcdHRoaXMuZmlyZSgncHJlZHJhZycsIGUpO1xyXG5cdFx0TC5Eb21VdGlsLnNldFBvc2l0aW9uKHRoaXMuX2VsZW1lbnQsIHRoaXMuX25ld1Bvcyk7XHJcblx0XHR0aGlzLmZpcmUoJ2RyYWcnLCBlKTtcclxuXHR9LFxyXG5cclxuXHRfb25VcDogZnVuY3Rpb24gKCkge1xyXG5cdFx0TC5Eb21VdGlsLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksICdsZWFmbGV0LWRyYWdnaW5nJyk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2xhc3RUYXJnZXQpIHtcclxuXHRcdFx0TC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX2xhc3RUYXJnZXQsICdsZWFmbGV0LWRyYWctdGFyZ2V0Jyk7XHJcblx0XHRcdHRoaXMuX2xhc3RUYXJnZXQgPSBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAodmFyIGkgaW4gTC5EcmFnZ2FibGUuTU9WRSkge1xyXG5cdFx0XHRMLkRvbUV2ZW50XHJcblx0XHRcdCAgICAub2ZmKGRvY3VtZW50LCBMLkRyYWdnYWJsZS5NT1ZFW2ldLCB0aGlzLl9vbk1vdmUsIHRoaXMpXHJcblx0XHRcdCAgICAub2ZmKGRvY3VtZW50LCBMLkRyYWdnYWJsZS5FTkRbaV0sIHRoaXMuX29uVXAsIHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdEwuRG9tVXRpbC5lbmFibGVJbWFnZURyYWcoKTtcclxuXHRcdEwuRG9tVXRpbC5lbmFibGVUZXh0U2VsZWN0aW9uKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX21vdmVkICYmIHRoaXMuX21vdmluZykge1xyXG5cdFx0XHQvLyBlbnN1cmUgZHJhZyBpcyBub3QgZmlyZWQgYWZ0ZXIgZHJhZ2VuZFxyXG5cdFx0XHRMLlV0aWwuY2FuY2VsQW5pbUZyYW1lKHRoaXMuX2FuaW1SZXF1ZXN0KTtcclxuXHJcblx0XHRcdHRoaXMuZmlyZSgnZHJhZ2VuZCcsIHtcclxuXHRcdFx0XHRkaXN0YW5jZTogdGhpcy5fbmV3UG9zLmRpc3RhbmNlVG8odGhpcy5fc3RhcnRQb3MpXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX21vdmluZyA9IGZhbHNlO1xyXG5cdFx0TC5EcmFnZ2FibGUuX2RyYWdnaW5nID0gZmFsc2U7XHJcblx0fVxyXG59KTtcclxuXG5cblxuLypcblx0TC5IYW5kbGVyIGlzIGEgYmFzZSBjbGFzcyBmb3IgaGFuZGxlciBjbGFzc2VzIHRoYXQgYXJlIHVzZWQgaW50ZXJuYWxseSB0byBpbmplY3Rcblx0aW50ZXJhY3Rpb24gZmVhdHVyZXMgbGlrZSBkcmFnZ2luZyB0byBjbGFzc2VzIGxpa2UgTWFwIGFuZCBNYXJrZXIuXG4qL1xuXG5MLkhhbmRsZXIgPSBMLkNsYXNzLmV4dGVuZCh7XG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIChtYXApIHtcblx0XHR0aGlzLl9tYXAgPSBtYXA7XG5cdH0sXG5cblx0ZW5hYmxlOiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuX2VuYWJsZWQpIHsgcmV0dXJuOyB9XG5cblx0XHR0aGlzLl9lbmFibGVkID0gdHJ1ZTtcblx0XHR0aGlzLmFkZEhvb2tzKCk7XG5cdH0sXG5cblx0ZGlzYWJsZTogZnVuY3Rpb24gKCkge1xuXHRcdGlmICghdGhpcy5fZW5hYmxlZCkgeyByZXR1cm47IH1cblxuXHRcdHRoaXMuX2VuYWJsZWQgPSBmYWxzZTtcblx0XHR0aGlzLnJlbW92ZUhvb2tzKCk7XG5cdH0sXG5cblx0ZW5hYmxlZDogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiAhIXRoaXMuX2VuYWJsZWQ7XG5cdH1cbn0pO1xuXG5cblxuLypcbiAqIEwuSGFuZGxlci5NYXBEcmFnIGlzIHVzZWQgdG8gbWFrZSB0aGUgbWFwIGRyYWdnYWJsZSAod2l0aCBwYW5uaW5nIGluZXJ0aWEpLCBlbmFibGVkIGJ5IGRlZmF1bHQuXG4gKi9cblxuTC5NYXAubWVyZ2VPcHRpb25zKHtcblx0ZHJhZ2dpbmc6IHRydWUsXG5cblx0aW5lcnRpYTogIUwuQnJvd3Nlci5hbmRyb2lkMjMsXG5cdGluZXJ0aWFEZWNlbGVyYXRpb246IDM0MDAsIC8vIHB4L3NeMlxuXHRpbmVydGlhTWF4U3BlZWQ6IEluZmluaXR5LCAvLyBweC9zXG5cdGVhc2VMaW5lYXJpdHk6IDAuMixcblxuXHQvLyBUT0RPIHJlZmFjdG9yLCBtb3ZlIHRvIENSU1xuXHR3b3JsZENvcHlKdW1wOiBmYWxzZVxufSk7XG5cbkwuTWFwLkRyYWcgPSBMLkhhbmRsZXIuZXh0ZW5kKHtcblx0YWRkSG9va3M6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoIXRoaXMuX2RyYWdnYWJsZSkge1xuXHRcdFx0dmFyIG1hcCA9IHRoaXMuX21hcDtcblxuXHRcdFx0dGhpcy5fZHJhZ2dhYmxlID0gbmV3IEwuRHJhZ2dhYmxlKG1hcC5fbWFwUGFuZSwgbWFwLl9jb250YWluZXIpO1xuXG5cdFx0XHR0aGlzLl9kcmFnZ2FibGUub24oe1xuXHRcdFx0XHRkb3duOiB0aGlzLl9vbkRvd24sXG5cdFx0XHRcdGRyYWdzdGFydDogdGhpcy5fb25EcmFnU3RhcnQsXG5cdFx0XHRcdGRyYWc6IHRoaXMuX29uRHJhZyxcblx0XHRcdFx0ZHJhZ2VuZDogdGhpcy5fb25EcmFnRW5kXG5cdFx0XHR9LCB0aGlzKTtcblxuXHRcdFx0dGhpcy5fZHJhZ2dhYmxlLm9uKCdwcmVkcmFnJywgdGhpcy5fb25QcmVEcmFnTGltaXQsIHRoaXMpO1xuXHRcdFx0aWYgKG1hcC5vcHRpb25zLndvcmxkQ29weUp1bXApIHtcblx0XHRcdFx0dGhpcy5fZHJhZ2dhYmxlLm9uKCdwcmVkcmFnJywgdGhpcy5fb25QcmVEcmFnV3JhcCwgdGhpcyk7XG5cdFx0XHRcdG1hcC5vbignem9vbWVuZCcsIHRoaXMuX29uWm9vbUVuZCwgdGhpcyk7XG5cblx0XHRcdFx0bWFwLndoZW5SZWFkeSh0aGlzLl9vblpvb21FbmQsIHRoaXMpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5fbWFwLl9jb250YWluZXIsICdsZWFmbGV0LWdyYWInKTtcblx0XHR0aGlzLl9kcmFnZ2FibGUuZW5hYmxlKCk7XG5cdH0sXG5cblx0cmVtb3ZlSG9va3M6IGZ1bmN0aW9uICgpIHtcblx0XHRMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5fbWFwLl9jb250YWluZXIsICdsZWFmbGV0LWdyYWInKTtcblx0XHR0aGlzLl9kcmFnZ2FibGUuZGlzYWJsZSgpO1xuXHR9LFxuXG5cdG1vdmVkOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2RyYWdnYWJsZSAmJiB0aGlzLl9kcmFnZ2FibGUuX21vdmVkO1xuXHR9LFxuXG5cdF9vbkRvd246IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLl9tYXAuc3RvcCgpO1xuXHR9LFxuXG5cdF9vbkRyYWdTdGFydDogZnVuY3Rpb24gKCkge1xuXHRcdHZhciBtYXAgPSB0aGlzLl9tYXA7XG5cblx0XHRpZiAodGhpcy5fbWFwLm9wdGlvbnMubWF4Qm91bmRzICYmIHRoaXMuX21hcC5vcHRpb25zLm1heEJvdW5kc1Zpc2Nvc2l0eSkge1xuXHRcdFx0dmFyIGJvdW5kcyA9IEwubGF0TG5nQm91bmRzKHRoaXMuX21hcC5vcHRpb25zLm1heEJvdW5kcyk7XG5cblx0XHRcdHRoaXMuX29mZnNldExpbWl0ID0gTC5ib3VuZHMoXG5cdFx0XHRcdHRoaXMuX21hcC5sYXRMbmdUb0NvbnRhaW5lclBvaW50KGJvdW5kcy5nZXROb3J0aFdlc3QoKSkubXVsdGlwbHlCeSgtMSksXG5cdFx0XHRcdHRoaXMuX21hcC5sYXRMbmdUb0NvbnRhaW5lclBvaW50KGJvdW5kcy5nZXRTb3V0aEVhc3QoKSkubXVsdGlwbHlCeSgtMSlcblx0XHRcdFx0XHQuYWRkKHRoaXMuX21hcC5nZXRTaXplKCkpKTtcblxuXHRcdFx0dGhpcy5fdmlzY29zaXR5ID0gTWF0aC5taW4oMS4wLCBNYXRoLm1heCgwLjAsIHRoaXMuX21hcC5vcHRpb25zLm1heEJvdW5kc1Zpc2Nvc2l0eSkpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9vZmZzZXRMaW1pdCA9IG51bGw7XG5cdFx0fVxuXG5cdFx0bWFwXG5cdFx0ICAgIC5maXJlKCdtb3Zlc3RhcnQnKVxuXHRcdCAgICAuZmlyZSgnZHJhZ3N0YXJ0Jyk7XG5cblx0XHRpZiAobWFwLm9wdGlvbnMuaW5lcnRpYSkge1xuXHRcdFx0dGhpcy5fcG9zaXRpb25zID0gW107XG5cdFx0XHR0aGlzLl90aW1lcyA9IFtdO1xuXHRcdH1cblx0fSxcblxuXHRfb25EcmFnOiBmdW5jdGlvbiAoZSkge1xuXHRcdGlmICh0aGlzLl9tYXAub3B0aW9ucy5pbmVydGlhKSB7XG5cdFx0XHR2YXIgdGltZSA9IHRoaXMuX2xhc3RUaW1lID0gK25ldyBEYXRlKCksXG5cdFx0XHQgICAgcG9zID0gdGhpcy5fbGFzdFBvcyA9IHRoaXMuX2RyYWdnYWJsZS5fYWJzUG9zIHx8IHRoaXMuX2RyYWdnYWJsZS5fbmV3UG9zO1xuXG5cdFx0XHR0aGlzLl9wb3NpdGlvbnMucHVzaChwb3MpO1xuXHRcdFx0dGhpcy5fdGltZXMucHVzaCh0aW1lKTtcblxuXHRcdFx0aWYgKHRpbWUgLSB0aGlzLl90aW1lc1swXSA+IDUwKSB7XG5cdFx0XHRcdHRoaXMuX3Bvc2l0aW9ucy5zaGlmdCgpO1xuXHRcdFx0XHR0aGlzLl90aW1lcy5zaGlmdCgpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuX21hcFxuXHRcdCAgICAuZmlyZSgnbW92ZScsIGUpXG5cdFx0ICAgIC5maXJlKCdkcmFnJywgZSk7XG5cdH0sXG5cblx0X29uWm9vbUVuZDogZnVuY3Rpb24gKCkge1xuXHRcdHZhciBweENlbnRlciA9IHRoaXMuX21hcC5nZXRTaXplKCkuZGl2aWRlQnkoMiksXG5cdFx0ICAgIHB4V29ybGRDZW50ZXIgPSB0aGlzLl9tYXAubGF0TG5nVG9MYXllclBvaW50KFswLCAwXSk7XG5cblx0XHR0aGlzLl9pbml0aWFsV29ybGRPZmZzZXQgPSBweFdvcmxkQ2VudGVyLnN1YnRyYWN0KHB4Q2VudGVyKS54O1xuXHRcdHRoaXMuX3dvcmxkV2lkdGggPSB0aGlzLl9tYXAuZ2V0UGl4ZWxXb3JsZEJvdW5kcygpLmdldFNpemUoKS54O1xuXHR9LFxuXG5cdF92aXNjb3VzTGltaXQ6IGZ1bmN0aW9uICh2YWx1ZSwgdGhyZXNob2xkKSB7XG5cdFx0cmV0dXJuIHZhbHVlIC0gKHZhbHVlIC0gdGhyZXNob2xkKSAqIHRoaXMuX3Zpc2Nvc2l0eTtcblx0fSxcblxuXHRfb25QcmVEcmFnTGltaXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoIXRoaXMuX3Zpc2Nvc2l0eSB8fCAhdGhpcy5fb2Zmc2V0TGltaXQpIHsgcmV0dXJuOyB9XG5cblx0XHR2YXIgb2Zmc2V0ID0gdGhpcy5fZHJhZ2dhYmxlLl9uZXdQb3Muc3VidHJhY3QodGhpcy5fZHJhZ2dhYmxlLl9zdGFydFBvcyk7XG5cblx0XHR2YXIgbGltaXQgPSB0aGlzLl9vZmZzZXRMaW1pdDtcblx0XHRpZiAob2Zmc2V0LnggPCBsaW1pdC5taW4ueCkgeyBvZmZzZXQueCA9IHRoaXMuX3Zpc2NvdXNMaW1pdChvZmZzZXQueCwgbGltaXQubWluLngpOyB9XG5cdFx0aWYgKG9mZnNldC55IDwgbGltaXQubWluLnkpIHsgb2Zmc2V0LnkgPSB0aGlzLl92aXNjb3VzTGltaXQob2Zmc2V0LnksIGxpbWl0Lm1pbi55KTsgfVxuXHRcdGlmIChvZmZzZXQueCA+IGxpbWl0Lm1heC54KSB7IG9mZnNldC54ID0gdGhpcy5fdmlzY291c0xpbWl0KG9mZnNldC54LCBsaW1pdC5tYXgueCk7IH1cblx0XHRpZiAob2Zmc2V0LnkgPiBsaW1pdC5tYXgueSkgeyBvZmZzZXQueSA9IHRoaXMuX3Zpc2NvdXNMaW1pdChvZmZzZXQueSwgbGltaXQubWF4LnkpOyB9XG5cblx0XHR0aGlzLl9kcmFnZ2FibGUuX25ld1BvcyA9IHRoaXMuX2RyYWdnYWJsZS5fc3RhcnRQb3MuYWRkKG9mZnNldCk7XG5cdH0sXG5cblx0X29uUHJlRHJhZ1dyYXA6IGZ1bmN0aW9uICgpIHtcblx0XHQvLyBUT0RPIHJlZmFjdG9yIHRvIGJlIGFibGUgdG8gYWRqdXN0IG1hcCBwYW5lIHBvc2l0aW9uIGFmdGVyIHpvb21cblx0XHR2YXIgd29ybGRXaWR0aCA9IHRoaXMuX3dvcmxkV2lkdGgsXG5cdFx0ICAgIGhhbGZXaWR0aCA9IE1hdGgucm91bmQod29ybGRXaWR0aCAvIDIpLFxuXHRcdCAgICBkeCA9IHRoaXMuX2luaXRpYWxXb3JsZE9mZnNldCxcblx0XHQgICAgeCA9IHRoaXMuX2RyYWdnYWJsZS5fbmV3UG9zLngsXG5cdFx0ICAgIG5ld1gxID0gKHggLSBoYWxmV2lkdGggKyBkeCkgJSB3b3JsZFdpZHRoICsgaGFsZldpZHRoIC0gZHgsXG5cdFx0ICAgIG5ld1gyID0gKHggKyBoYWxmV2lkdGggKyBkeCkgJSB3b3JsZFdpZHRoIC0gaGFsZldpZHRoIC0gZHgsXG5cdFx0ICAgIG5ld1ggPSBNYXRoLmFicyhuZXdYMSArIGR4KSA8IE1hdGguYWJzKG5ld1gyICsgZHgpID8gbmV3WDEgOiBuZXdYMjtcblxuXHRcdHRoaXMuX2RyYWdnYWJsZS5fYWJzUG9zID0gdGhpcy5fZHJhZ2dhYmxlLl9uZXdQb3MuY2xvbmUoKTtcblx0XHR0aGlzLl9kcmFnZ2FibGUuX25ld1Bvcy54ID0gbmV3WDtcblx0fSxcblxuXHRfb25EcmFnRW5kOiBmdW5jdGlvbiAoZSkge1xuXHRcdHZhciBtYXAgPSB0aGlzLl9tYXAsXG5cdFx0ICAgIG9wdGlvbnMgPSBtYXAub3B0aW9ucyxcblxuXHRcdCAgICBub0luZXJ0aWEgPSAhb3B0aW9ucy5pbmVydGlhIHx8IHRoaXMuX3RpbWVzLmxlbmd0aCA8IDI7XG5cblx0XHRtYXAuZmlyZSgnZHJhZ2VuZCcsIGUpO1xuXG5cdFx0aWYgKG5vSW5lcnRpYSkge1xuXHRcdFx0bWFwLmZpcmUoJ21vdmVlbmQnKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHZhciBkaXJlY3Rpb24gPSB0aGlzLl9sYXN0UG9zLnN1YnRyYWN0KHRoaXMuX3Bvc2l0aW9uc1swXSksXG5cdFx0XHQgICAgZHVyYXRpb24gPSAodGhpcy5fbGFzdFRpbWUgLSB0aGlzLl90aW1lc1swXSkgLyAxMDAwLFxuXHRcdFx0ICAgIGVhc2UgPSBvcHRpb25zLmVhc2VMaW5lYXJpdHksXG5cblx0XHRcdCAgICBzcGVlZFZlY3RvciA9IGRpcmVjdGlvbi5tdWx0aXBseUJ5KGVhc2UgLyBkdXJhdGlvbiksXG5cdFx0XHQgICAgc3BlZWQgPSBzcGVlZFZlY3Rvci5kaXN0YW5jZVRvKFswLCAwXSksXG5cblx0XHRcdCAgICBsaW1pdGVkU3BlZWQgPSBNYXRoLm1pbihvcHRpb25zLmluZXJ0aWFNYXhTcGVlZCwgc3BlZWQpLFxuXHRcdFx0ICAgIGxpbWl0ZWRTcGVlZFZlY3RvciA9IHNwZWVkVmVjdG9yLm11bHRpcGx5QnkobGltaXRlZFNwZWVkIC8gc3BlZWQpLFxuXG5cdFx0XHQgICAgZGVjZWxlcmF0aW9uRHVyYXRpb24gPSBsaW1pdGVkU3BlZWQgLyAob3B0aW9ucy5pbmVydGlhRGVjZWxlcmF0aW9uICogZWFzZSksXG5cdFx0XHQgICAgb2Zmc2V0ID0gbGltaXRlZFNwZWVkVmVjdG9yLm11bHRpcGx5QnkoLWRlY2VsZXJhdGlvbkR1cmF0aW9uIC8gMikucm91bmQoKTtcblxuXHRcdFx0aWYgKCFvZmZzZXQueCAmJiAhb2Zmc2V0LnkpIHtcblx0XHRcdFx0bWFwLmZpcmUoJ21vdmVlbmQnKTtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b2Zmc2V0ID0gbWFwLl9saW1pdE9mZnNldChvZmZzZXQsIG1hcC5vcHRpb25zLm1heEJvdW5kcyk7XG5cblx0XHRcdFx0TC5VdGlsLnJlcXVlc3RBbmltRnJhbWUoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdG1hcC5wYW5CeShvZmZzZXQsIHtcblx0XHRcdFx0XHRcdGR1cmF0aW9uOiBkZWNlbGVyYXRpb25EdXJhdGlvbixcblx0XHRcdFx0XHRcdGVhc2VMaW5lYXJpdHk6IGVhc2UsXG5cdFx0XHRcdFx0XHRub01vdmVTdGFydDogdHJ1ZSxcblx0XHRcdFx0XHRcdGFuaW1hdGU6IHRydWVcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59KTtcblxuTC5NYXAuYWRkSW5pdEhvb2soJ2FkZEhhbmRsZXInLCAnZHJhZ2dpbmcnLCBMLk1hcC5EcmFnKTtcblxuXG5cbi8qXG4gKiBMLkhhbmRsZXIuRG91YmxlQ2xpY2tab29tIGlzIHVzZWQgdG8gaGFuZGxlIGRvdWJsZS1jbGljayB6b29tIG9uIHRoZSBtYXAsIGVuYWJsZWQgYnkgZGVmYXVsdC5cbiAqL1xuXG5MLk1hcC5tZXJnZU9wdGlvbnMoe1xuXHRkb3VibGVDbGlja1pvb206IHRydWVcbn0pO1xuXG5MLk1hcC5Eb3VibGVDbGlja1pvb20gPSBMLkhhbmRsZXIuZXh0ZW5kKHtcblx0YWRkSG9va3M6IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLl9tYXAub24oJ2RibGNsaWNrJywgdGhpcy5fb25Eb3VibGVDbGljaywgdGhpcyk7XG5cdH0sXG5cblx0cmVtb3ZlSG9va3M6IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLl9tYXAub2ZmKCdkYmxjbGljaycsIHRoaXMuX29uRG91YmxlQ2xpY2ssIHRoaXMpO1xuXHR9LFxuXG5cdF9vbkRvdWJsZUNsaWNrOiBmdW5jdGlvbiAoZSkge1xuXHRcdHZhciBtYXAgPSB0aGlzLl9tYXAsXG5cdFx0ICAgIG9sZFpvb20gPSBtYXAuZ2V0Wm9vbSgpLFxuXHRcdCAgICB6b29tID0gZS5vcmlnaW5hbEV2ZW50LnNoaWZ0S2V5ID8gTWF0aC5jZWlsKG9sZFpvb20pIC0gMSA6IE1hdGguZmxvb3Iob2xkWm9vbSkgKyAxO1xuXG5cdFx0aWYgKG1hcC5vcHRpb25zLmRvdWJsZUNsaWNrWm9vbSA9PT0gJ2NlbnRlcicpIHtcblx0XHRcdG1hcC5zZXRab29tKHpvb20pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRtYXAuc2V0Wm9vbUFyb3VuZChlLmNvbnRhaW5lclBvaW50LCB6b29tKTtcblx0XHR9XG5cdH1cbn0pO1xuXG5MLk1hcC5hZGRJbml0SG9vaygnYWRkSGFuZGxlcicsICdkb3VibGVDbGlja1pvb20nLCBMLk1hcC5Eb3VibGVDbGlja1pvb20pO1xuXG5cblxuLypcbiAqIEwuSGFuZGxlci5TY3JvbGxXaGVlbFpvb20gaXMgdXNlZCBieSBMLk1hcCB0byBlbmFibGUgbW91c2Ugc2Nyb2xsIHdoZWVsIHpvb20gb24gdGhlIG1hcC5cbiAqL1xuXG5MLk1hcC5tZXJnZU9wdGlvbnMoe1xuXHRzY3JvbGxXaGVlbFpvb206IHRydWUsXG5cdHdoZWVsRGVib3VuY2VUaW1lOiA0MFxufSk7XG5cbkwuTWFwLlNjcm9sbFdoZWVsWm9vbSA9IEwuSGFuZGxlci5leHRlbmQoe1xuXHRhZGRIb29rczogZnVuY3Rpb24gKCkge1xuXHRcdEwuRG9tRXZlbnQub24odGhpcy5fbWFwLl9jb250YWluZXIsIHtcblx0XHRcdG1vdXNld2hlZWw6IHRoaXMuX29uV2hlZWxTY3JvbGwsXG5cdFx0XHRNb3pNb3VzZVBpeGVsU2Nyb2xsOiBMLkRvbUV2ZW50LnByZXZlbnREZWZhdWx0XG5cdFx0fSwgdGhpcyk7XG5cblx0XHR0aGlzLl9kZWx0YSA9IDA7XG5cdH0sXG5cblx0cmVtb3ZlSG9va3M6IGZ1bmN0aW9uICgpIHtcblx0XHRMLkRvbUV2ZW50Lm9mZih0aGlzLl9tYXAuX2NvbnRhaW5lciwge1xuXHRcdFx0bW91c2V3aGVlbDogdGhpcy5fb25XaGVlbFNjcm9sbCxcblx0XHRcdE1vek1vdXNlUGl4ZWxTY3JvbGw6IEwuRG9tRXZlbnQucHJldmVudERlZmF1bHRcblx0XHR9LCB0aGlzKTtcblx0fSxcblxuXHRfb25XaGVlbFNjcm9sbDogZnVuY3Rpb24gKGUpIHtcblx0XHR2YXIgZGVsdGEgPSBMLkRvbUV2ZW50LmdldFdoZWVsRGVsdGEoZSk7XG5cdFx0dmFyIGRlYm91bmNlID0gdGhpcy5fbWFwLm9wdGlvbnMud2hlZWxEZWJvdW5jZVRpbWU7XG5cblx0XHR0aGlzLl9kZWx0YSArPSBkZWx0YTtcblx0XHR0aGlzLl9sYXN0TW91c2VQb3MgPSB0aGlzLl9tYXAubW91c2VFdmVudFRvQ29udGFpbmVyUG9pbnQoZSk7XG5cblx0XHRpZiAoIXRoaXMuX3N0YXJ0VGltZSkge1xuXHRcdFx0dGhpcy5fc3RhcnRUaW1lID0gK25ldyBEYXRlKCk7XG5cdFx0fVxuXG5cdFx0dmFyIGxlZnQgPSBNYXRoLm1heChkZWJvdW5jZSAtICgrbmV3IERhdGUoKSAtIHRoaXMuX3N0YXJ0VGltZSksIDApO1xuXG5cdFx0Y2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcblx0XHR0aGlzLl90aW1lciA9IHNldFRpbWVvdXQoTC5iaW5kKHRoaXMuX3BlcmZvcm1ab29tLCB0aGlzKSwgbGVmdCk7XG5cblx0XHRMLkRvbUV2ZW50LnN0b3AoZSk7XG5cdH0sXG5cblx0X3BlcmZvcm1ab29tOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIG1hcCA9IHRoaXMuX21hcCxcblx0XHQgICAgZGVsdGEgPSB0aGlzLl9kZWx0YSxcblx0XHQgICAgem9vbSA9IG1hcC5nZXRab29tKCk7XG5cblx0XHRtYXAuc3RvcCgpOyAvLyBzdG9wIHBhbm5pbmcgYW5kIGZseSBhbmltYXRpb25zIGlmIGFueVxuXG5cdFx0ZGVsdGEgPSBkZWx0YSA+IDAgPyBNYXRoLmNlaWwoZGVsdGEpIDogTWF0aC5mbG9vcihkZWx0YSk7XG5cdFx0ZGVsdGEgPSBNYXRoLm1heChNYXRoLm1pbihkZWx0YSwgNCksIC00KTtcblx0XHRkZWx0YSA9IG1hcC5fbGltaXRab29tKHpvb20gKyBkZWx0YSkgLSB6b29tO1xuXG5cdFx0dGhpcy5fZGVsdGEgPSAwO1xuXHRcdHRoaXMuX3N0YXJ0VGltZSA9IG51bGw7XG5cblx0XHRpZiAoIWRlbHRhKSB7IHJldHVybjsgfVxuXG5cdFx0aWYgKG1hcC5vcHRpb25zLnNjcm9sbFdoZWVsWm9vbSA9PT0gJ2NlbnRlcicpIHtcblx0XHRcdG1hcC5zZXRab29tKHpvb20gKyBkZWx0YSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG1hcC5zZXRab29tQXJvdW5kKHRoaXMuX2xhc3RNb3VzZVBvcywgem9vbSArIGRlbHRhKTtcblx0XHR9XG5cdH1cbn0pO1xuXG5MLk1hcC5hZGRJbml0SG9vaygnYWRkSGFuZGxlcicsICdzY3JvbGxXaGVlbFpvb20nLCBMLk1hcC5TY3JvbGxXaGVlbFpvb20pO1xuXG5cblxuLypcclxuICogRXh0ZW5kcyB0aGUgZXZlbnQgaGFuZGxpbmcgY29kZSB3aXRoIGRvdWJsZSB0YXAgc3VwcG9ydCBmb3IgbW9iaWxlIGJyb3dzZXJzLlxyXG4gKi9cclxuXHJcbkwuZXh0ZW5kKEwuRG9tRXZlbnQsIHtcclxuXHJcblx0X3RvdWNoc3RhcnQ6IEwuQnJvd3Nlci5tc1BvaW50ZXIgPyAnTVNQb2ludGVyRG93bicgOiBMLkJyb3dzZXIucG9pbnRlciA/ICdwb2ludGVyZG93bicgOiAndG91Y2hzdGFydCcsXHJcblx0X3RvdWNoZW5kOiBMLkJyb3dzZXIubXNQb2ludGVyID8gJ01TUG9pbnRlclVwJyA6IEwuQnJvd3Nlci5wb2ludGVyID8gJ3BvaW50ZXJ1cCcgOiAndG91Y2hlbmQnLFxyXG5cclxuXHQvLyBpbnNwaXJlZCBieSBaZXB0byB0b3VjaCBjb2RlIGJ5IFRob21hcyBGdWNoc1xyXG5cdGFkZERvdWJsZVRhcExpc3RlbmVyOiBmdW5jdGlvbiAob2JqLCBoYW5kbGVyLCBpZCkge1xyXG5cdFx0dmFyIGxhc3QsIHRvdWNoLFxyXG5cdFx0ICAgIGRvdWJsZVRhcCA9IGZhbHNlLFxyXG5cdFx0ICAgIGRlbGF5ID0gMjUwO1xyXG5cclxuXHRcdGZ1bmN0aW9uIG9uVG91Y2hTdGFydChlKSB7XHJcblx0XHRcdHZhciBjb3VudDtcclxuXHJcblx0XHRcdGlmIChMLkJyb3dzZXIucG9pbnRlcikge1xyXG5cdFx0XHRcdGNvdW50ID0gTC5Eb21FdmVudC5fcG9pbnRlcnNDb3VudDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjb3VudCA9IGUudG91Y2hlcy5sZW5ndGg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChjb3VudCA+IDEpIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0XHR2YXIgbm93ID0gRGF0ZS5ub3coKSxcclxuXHRcdFx0ICAgIGRlbHRhID0gbm93IC0gKGxhc3QgfHwgbm93KTtcclxuXHJcblx0XHRcdHRvdWNoID0gZS50b3VjaGVzID8gZS50b3VjaGVzWzBdIDogZTtcclxuXHRcdFx0ZG91YmxlVGFwID0gKGRlbHRhID4gMCAmJiBkZWx0YSA8PSBkZWxheSk7XHJcblx0XHRcdGxhc3QgPSBub3c7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gb25Ub3VjaEVuZCgpIHtcclxuXHRcdFx0aWYgKGRvdWJsZVRhcCAmJiAhdG91Y2guY2FuY2VsQnViYmxlKSB7XHJcblx0XHRcdFx0aWYgKEwuQnJvd3Nlci5wb2ludGVyKSB7XHJcblx0XHRcdFx0XHQvLyB3b3JrIGFyb3VuZCAudHlwZSBiZWluZyByZWFkb25seSB3aXRoIE1TUG9pbnRlciogZXZlbnRzXHJcblx0XHRcdFx0XHR2YXIgbmV3VG91Y2ggPSB7fSxcclxuXHRcdFx0XHRcdCAgICBwcm9wLCBpO1xyXG5cclxuXHRcdFx0XHRcdGZvciAoaSBpbiB0b3VjaCkge1xyXG5cdFx0XHRcdFx0XHRwcm9wID0gdG91Y2hbaV07XHJcblx0XHRcdFx0XHRcdG5ld1RvdWNoW2ldID0gcHJvcCAmJiBwcm9wLmJpbmQgPyBwcm9wLmJpbmQodG91Y2gpIDogcHJvcDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHRvdWNoID0gbmV3VG91Y2g7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRvdWNoLnR5cGUgPSAnZGJsY2xpY2snO1xyXG5cdFx0XHRcdGhhbmRsZXIodG91Y2gpO1xyXG5cdFx0XHRcdGxhc3QgPSBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHByZSA9ICdfbGVhZmxldF8nLFxyXG5cdFx0ICAgIHRvdWNoc3RhcnQgPSB0aGlzLl90b3VjaHN0YXJ0LFxyXG5cdFx0ICAgIHRvdWNoZW5kID0gdGhpcy5fdG91Y2hlbmQ7XHJcblxyXG5cdFx0b2JqW3ByZSArIHRvdWNoc3RhcnQgKyBpZF0gPSBvblRvdWNoU3RhcnQ7XHJcblx0XHRvYmpbcHJlICsgdG91Y2hlbmQgKyBpZF0gPSBvblRvdWNoRW5kO1xyXG5cclxuXHRcdG9iai5hZGRFdmVudExpc3RlbmVyKHRvdWNoc3RhcnQsIG9uVG91Y2hTdGFydCwgZmFsc2UpO1xyXG5cdFx0b2JqLmFkZEV2ZW50TGlzdGVuZXIodG91Y2hlbmQsIG9uVG91Y2hFbmQsIGZhbHNlKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHJlbW92ZURvdWJsZVRhcExpc3RlbmVyOiBmdW5jdGlvbiAob2JqLCBpZCkge1xyXG5cdFx0dmFyIHByZSA9ICdfbGVhZmxldF8nLFxyXG5cdFx0ICAgIHRvdWNoZW5kID0gb2JqW3ByZSArIHRoaXMuX3RvdWNoZW5kICsgaWRdO1xyXG5cclxuXHRcdG9iai5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuX3RvdWNoc3RhcnQsIG9ialtwcmUgKyB0aGlzLl90b3VjaHN0YXJ0ICsgaWRdLCBmYWxzZSk7XHJcblx0XHRvYmoucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLl90b3VjaGVuZCwgdG91Y2hlbmQsIGZhbHNlKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcbn0pO1xyXG5cblxuXG4vKlxuICogRXh0ZW5kcyBMLkRvbUV2ZW50IHRvIHByb3ZpZGUgdG91Y2ggc3VwcG9ydCBmb3IgSW50ZXJuZXQgRXhwbG9yZXIgYW5kIFdpbmRvd3MtYmFzZWQgZGV2aWNlcy5cbiAqL1xuXG5MLmV4dGVuZChMLkRvbUV2ZW50LCB7XG5cblx0UE9JTlRFUl9ET1dOOiAgIEwuQnJvd3Nlci5tc1BvaW50ZXIgPyAnTVNQb2ludGVyRG93bicgICA6ICdwb2ludGVyZG93bicsXG5cdFBPSU5URVJfTU9WRTogICBMLkJyb3dzZXIubXNQb2ludGVyID8gJ01TUG9pbnRlck1vdmUnICAgOiAncG9pbnRlcm1vdmUnLFxuXHRQT0lOVEVSX1VQOiAgICAgTC5Ccm93c2VyLm1zUG9pbnRlciA/ICdNU1BvaW50ZXJVcCcgICAgIDogJ3BvaW50ZXJ1cCcsXG5cdFBPSU5URVJfQ0FOQ0VMOiBMLkJyb3dzZXIubXNQb2ludGVyID8gJ01TUG9pbnRlckNhbmNlbCcgOiAncG9pbnRlcmNhbmNlbCcsXG5cblx0X3BvaW50ZXJzOiB7fSxcblx0X3BvaW50ZXJzQ291bnQ6IDAsXG5cblx0Ly8gUHJvdmlkZXMgYSB0b3VjaCBldmVudHMgd3JhcHBlciBmb3IgKG1zKXBvaW50ZXIgZXZlbnRzLlxuXHQvLyByZWYgaHR0cDovL3d3dy53My5vcmcvVFIvcG9pbnRlcmV2ZW50cy8gaHR0cHM6Ly93d3cudzMub3JnL0J1Z3MvUHVibGljL3Nob3dfYnVnLmNnaT9pZD0yMjg5MFxuXG5cdGFkZFBvaW50ZXJMaXN0ZW5lcjogZnVuY3Rpb24gKG9iaiwgdHlwZSwgaGFuZGxlciwgaWQpIHtcblxuXHRcdGlmICh0eXBlID09PSAndG91Y2hzdGFydCcpIHtcblx0XHRcdHRoaXMuX2FkZFBvaW50ZXJTdGFydChvYmosIGhhbmRsZXIsIGlkKTtcblxuXHRcdH0gZWxzZSBpZiAodHlwZSA9PT0gJ3RvdWNobW92ZScpIHtcblx0XHRcdHRoaXMuX2FkZFBvaW50ZXJNb3ZlKG9iaiwgaGFuZGxlciwgaWQpO1xuXG5cdFx0fSBlbHNlIGlmICh0eXBlID09PSAndG91Y2hlbmQnKSB7XG5cdFx0XHR0aGlzLl9hZGRQb2ludGVyRW5kKG9iaiwgaGFuZGxlciwgaWQpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHJlbW92ZVBvaW50ZXJMaXN0ZW5lcjogZnVuY3Rpb24gKG9iaiwgdHlwZSwgaWQpIHtcblx0XHR2YXIgaGFuZGxlciA9IG9ialsnX2xlYWZsZXRfJyArIHR5cGUgKyBpZF07XG5cblx0XHRpZiAodHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XG5cdFx0XHRvYmoucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLlBPSU5URVJfRE9XTiwgaGFuZGxlciwgZmFsc2UpO1xuXG5cdFx0fSBlbHNlIGlmICh0eXBlID09PSAndG91Y2htb3ZlJykge1xuXHRcdFx0b2JqLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5QT0lOVEVSX01PVkUsIGhhbmRsZXIsIGZhbHNlKTtcblxuXHRcdH0gZWxzZSBpZiAodHlwZSA9PT0gJ3RvdWNoZW5kJykge1xuXHRcdFx0b2JqLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5QT0lOVEVSX1VQLCBoYW5kbGVyLCBmYWxzZSk7XG5cdFx0XHRvYmoucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLlBPSU5URVJfQ0FOQ0VMLCBoYW5kbGVyLCBmYWxzZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0X2FkZFBvaW50ZXJTdGFydDogZnVuY3Rpb24gKG9iaiwgaGFuZGxlciwgaWQpIHtcblx0XHR2YXIgb25Eb3duID0gTC5iaW5kKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRpZiAoZS5wb2ludGVyVHlwZSAhPT0gJ21vdXNlJyAmJiBlLnBvaW50ZXJUeXBlICE9PSBlLk1TUE9JTlRFUl9UWVBFX01PVVNFKSB7XG5cdFx0XHRcdEwuRG9tRXZlbnQucHJldmVudERlZmF1bHQoZSk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX2hhbmRsZVBvaW50ZXIoZSwgaGFuZGxlcik7XG5cdFx0fSwgdGhpcyk7XG5cblx0XHRvYmpbJ19sZWFmbGV0X3RvdWNoc3RhcnQnICsgaWRdID0gb25Eb3duO1xuXHRcdG9iai5hZGRFdmVudExpc3RlbmVyKHRoaXMuUE9JTlRFUl9ET1dOLCBvbkRvd24sIGZhbHNlKTtcblxuXHRcdC8vIG5lZWQgdG8ga2VlcCB0cmFjayBvZiB3aGF0IHBvaW50ZXJzIGFuZCBob3cgbWFueSBhcmUgYWN0aXZlIHRvIHByb3ZpZGUgZS50b3VjaGVzIGVtdWxhdGlvblxuXHRcdGlmICghdGhpcy5fcG9pbnRlckRvY0xpc3RlbmVyKSB7XG5cdFx0XHR2YXIgcG9pbnRlclVwID0gTC5iaW5kKHRoaXMuX2dsb2JhbFBvaW50ZXJVcCwgdGhpcyk7XG5cblx0XHRcdC8vIHdlIGxpc3RlbiBkb2N1bWVudEVsZW1lbnQgYXMgYW55IGRyYWdzIHRoYXQgZW5kIGJ5IG1vdmluZyB0aGUgdG91Y2ggb2ZmIHRoZSBzY3JlZW4gZ2V0IGZpcmVkIHRoZXJlXG5cdFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLlBPSU5URVJfRE9XTiwgTC5iaW5kKHRoaXMuX2dsb2JhbFBvaW50ZXJEb3duLCB0aGlzKSwgdHJ1ZSk7XG5cdFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLlBPSU5URVJfTU9WRSwgTC5iaW5kKHRoaXMuX2dsb2JhbFBvaW50ZXJNb3ZlLCB0aGlzKSwgdHJ1ZSk7XG5cdFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLlBPSU5URVJfVVAsIHBvaW50ZXJVcCwgdHJ1ZSk7XG5cdFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLlBPSU5URVJfQ0FOQ0VMLCBwb2ludGVyVXAsIHRydWUpO1xuXG5cdFx0XHR0aGlzLl9wb2ludGVyRG9jTGlzdGVuZXIgPSB0cnVlO1xuXHRcdH1cblx0fSxcblxuXHRfZ2xvYmFsUG9pbnRlckRvd246IGZ1bmN0aW9uIChlKSB7XG5cdFx0dGhpcy5fcG9pbnRlcnNbZS5wb2ludGVySWRdID0gZTtcblx0XHR0aGlzLl9wb2ludGVyc0NvdW50Kys7XG5cdH0sXG5cblx0X2dsb2JhbFBvaW50ZXJNb3ZlOiBmdW5jdGlvbiAoZSkge1xuXHRcdGlmICh0aGlzLl9wb2ludGVyc1tlLnBvaW50ZXJJZF0pIHtcblx0XHRcdHRoaXMuX3BvaW50ZXJzW2UucG9pbnRlcklkXSA9IGU7XG5cdFx0fVxuXHR9LFxuXG5cdF9nbG9iYWxQb2ludGVyVXA6IGZ1bmN0aW9uIChlKSB7XG5cdFx0ZGVsZXRlIHRoaXMuX3BvaW50ZXJzW2UucG9pbnRlcklkXTtcblx0XHR0aGlzLl9wb2ludGVyc0NvdW50LS07XG5cdH0sXG5cblx0X2hhbmRsZVBvaW50ZXI6IGZ1bmN0aW9uIChlLCBoYW5kbGVyKSB7XG5cdFx0ZS50b3VjaGVzID0gW107XG5cdFx0Zm9yICh2YXIgaSBpbiB0aGlzLl9wb2ludGVycykge1xuXHRcdFx0ZS50b3VjaGVzLnB1c2godGhpcy5fcG9pbnRlcnNbaV0pO1xuXHRcdH1cblx0XHRlLmNoYW5nZWRUb3VjaGVzID0gW2VdO1xuXG5cdFx0aGFuZGxlcihlKTtcblx0fSxcblxuXHRfYWRkUG9pbnRlck1vdmU6IGZ1bmN0aW9uIChvYmosIGhhbmRsZXIsIGlkKSB7XG5cdFx0dmFyIG9uTW92ZSA9IEwuYmluZChmdW5jdGlvbiAoZSkge1xuXHRcdFx0Ly8gZG9uJ3QgZmlyZSB0b3VjaCBtb3ZlcyB3aGVuIG1vdXNlIGlzbid0IGRvd25cblx0XHRcdGlmICgoZS5wb2ludGVyVHlwZSA9PT0gZS5NU1BPSU5URVJfVFlQRV9NT1VTRSB8fCBlLnBvaW50ZXJUeXBlID09PSAnbW91c2UnKSAmJiBlLmJ1dHRvbnMgPT09IDApIHsgcmV0dXJuOyB9XG5cblx0XHRcdHRoaXMuX2hhbmRsZVBvaW50ZXIoZSwgaGFuZGxlcik7XG5cdFx0fSwgdGhpcyk7XG5cblx0XHRvYmpbJ19sZWFmbGV0X3RvdWNobW92ZScgKyBpZF0gPSBvbk1vdmU7XG5cdFx0b2JqLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5QT0lOVEVSX01PVkUsIG9uTW92ZSwgZmFsc2UpO1xuXHR9LFxuXG5cdF9hZGRQb2ludGVyRW5kOiBmdW5jdGlvbiAob2JqLCBoYW5kbGVyLCBpZCkge1xuXHRcdHZhciBvblVwID0gTC5iaW5kKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHR0aGlzLl9oYW5kbGVQb2ludGVyKGUsIGhhbmRsZXIpO1xuXHRcdH0sIHRoaXMpO1xuXG5cdFx0b2JqWydfbGVhZmxldF90b3VjaGVuZCcgKyBpZF0gPSBvblVwO1xuXHRcdG9iai5hZGRFdmVudExpc3RlbmVyKHRoaXMuUE9JTlRFUl9VUCwgb25VcCwgZmFsc2UpO1xuXHRcdG9iai5hZGRFdmVudExpc3RlbmVyKHRoaXMuUE9JTlRFUl9DQU5DRUwsIG9uVXAsIGZhbHNlKTtcblx0fVxufSk7XG5cblxuXG4vKlxuICogTC5IYW5kbGVyLlRvdWNoWm9vbSBpcyB1c2VkIGJ5IEwuTWFwIHRvIGFkZCBwaW5jaCB6b29tIG9uIHN1cHBvcnRlZCBtb2JpbGUgYnJvd3NlcnMuXG4gKi9cblxuTC5NYXAubWVyZ2VPcHRpb25zKHtcblx0dG91Y2hab29tOiBMLkJyb3dzZXIudG91Y2ggJiYgIUwuQnJvd3Nlci5hbmRyb2lkMjMsXG5cdGJvdW5jZUF0Wm9vbUxpbWl0czogdHJ1ZVxufSk7XG5cbkwuTWFwLlRvdWNoWm9vbSA9IEwuSGFuZGxlci5leHRlbmQoe1xuXHRhZGRIb29rczogZnVuY3Rpb24gKCkge1xuXHRcdEwuRG9tRXZlbnQub24odGhpcy5fbWFwLl9jb250YWluZXIsICd0b3VjaHN0YXJ0JywgdGhpcy5fb25Ub3VjaFN0YXJ0LCB0aGlzKTtcblx0fSxcblxuXHRyZW1vdmVIb29rczogZnVuY3Rpb24gKCkge1xuXHRcdEwuRG9tRXZlbnQub2ZmKHRoaXMuX21hcC5fY29udGFpbmVyLCAndG91Y2hzdGFydCcsIHRoaXMuX29uVG91Y2hTdGFydCwgdGhpcyk7XG5cdH0sXG5cblx0X29uVG91Y2hTdGFydDogZnVuY3Rpb24gKGUpIHtcblx0XHR2YXIgbWFwID0gdGhpcy5fbWFwO1xuXG5cdFx0aWYgKCFlLnRvdWNoZXMgfHwgZS50b3VjaGVzLmxlbmd0aCAhPT0gMiB8fCBtYXAuX2FuaW1hdGluZ1pvb20gfHwgdGhpcy5fem9vbWluZykgeyByZXR1cm47IH1cblxuXHRcdHZhciBwMSA9IG1hcC5tb3VzZUV2ZW50VG9Db250YWluZXJQb2ludChlLnRvdWNoZXNbMF0pLFxuXHRcdCAgICBwMiA9IG1hcC5tb3VzZUV2ZW50VG9Db250YWluZXJQb2ludChlLnRvdWNoZXNbMV0pO1xuXG5cdFx0dGhpcy5fY2VudGVyUG9pbnQgPSBtYXAuZ2V0U2l6ZSgpLl9kaXZpZGVCeSgyKTtcblx0XHR0aGlzLl9zdGFydExhdExuZyA9IG1hcC5jb250YWluZXJQb2ludFRvTGF0TG5nKHRoaXMuX2NlbnRlclBvaW50KTtcblx0XHRpZiAobWFwLm9wdGlvbnMudG91Y2hab29tICE9PSAnY2VudGVyJykge1xuXHRcdFx0dGhpcy5fcGluY2hTdGFydExhdExuZyA9IG1hcC5jb250YWluZXJQb2ludFRvTGF0TG5nKHAxLmFkZChwMikuX2RpdmlkZUJ5KDIpKTtcblx0XHR9XG5cblx0XHR0aGlzLl9zdGFydERpc3QgPSBwMS5kaXN0YW5jZVRvKHAyKTtcblx0XHR0aGlzLl9zdGFydFpvb20gPSBtYXAuZ2V0Wm9vbSgpO1xuXG5cdFx0dGhpcy5fbW92ZWQgPSBmYWxzZTtcblx0XHR0aGlzLl96b29taW5nID0gdHJ1ZTtcblxuXHRcdG1hcC5zdG9wKCk7XG5cblx0XHRMLkRvbUV2ZW50XG5cdFx0ICAgIC5vbihkb2N1bWVudCwgJ3RvdWNobW92ZScsIHRoaXMuX29uVG91Y2hNb3ZlLCB0aGlzKVxuXHRcdCAgICAub24oZG9jdW1lbnQsICd0b3VjaGVuZCcsIHRoaXMuX29uVG91Y2hFbmQsIHRoaXMpO1xuXG5cdFx0TC5Eb21FdmVudC5wcmV2ZW50RGVmYXVsdChlKTtcblx0fSxcblxuXHRfb25Ub3VjaE1vdmU6IGZ1bmN0aW9uIChlKSB7XG5cdFx0aWYgKCFlLnRvdWNoZXMgfHwgZS50b3VjaGVzLmxlbmd0aCAhPT0gMiB8fCAhdGhpcy5fem9vbWluZykgeyByZXR1cm47IH1cblxuXHRcdHZhciBtYXAgPSB0aGlzLl9tYXAsXG5cdFx0ICAgIHAxID0gbWFwLm1vdXNlRXZlbnRUb0NvbnRhaW5lclBvaW50KGUudG91Y2hlc1swXSksXG5cdFx0ICAgIHAyID0gbWFwLm1vdXNlRXZlbnRUb0NvbnRhaW5lclBvaW50KGUudG91Y2hlc1sxXSksXG5cdFx0ICAgIHNjYWxlID0gcDEuZGlzdGFuY2VUbyhwMikgLyB0aGlzLl9zdGFydERpc3Q7XG5cblxuXHRcdHRoaXMuX3pvb20gPSBtYXAuZ2V0U2NhbGVab29tKHNjYWxlLCB0aGlzLl9zdGFydFpvb20pO1xuXG5cdFx0aWYgKG1hcC5vcHRpb25zLnRvdWNoWm9vbSA9PT0gJ2NlbnRlcicpIHtcblx0XHRcdHRoaXMuX2NlbnRlciA9IHRoaXMuX3N0YXJ0TGF0TG5nO1xuXHRcdFx0aWYgKHNjYWxlID09PSAxKSB7IHJldHVybjsgfVxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBHZXQgZGVsdGEgZnJvbSBwaW5jaCB0byBjZW50ZXIsIHNvIGNlbnRlckxhdExuZyBpcyBkZWx0YSBhcHBsaWVkIHRvIGluaXRpYWwgcGluY2hMYXRMbmdcblx0XHRcdHZhciBkZWx0YSA9IHAxLl9hZGQocDIpLl9kaXZpZGVCeSgyKS5fc3VidHJhY3QodGhpcy5fY2VudGVyUG9pbnQpO1xuXHRcdFx0aWYgKHNjYWxlID09PSAxICYmIGRlbHRhLnggPT09IDAgJiYgZGVsdGEueSA9PT0gMCkgeyByZXR1cm47IH1cblx0XHRcdHRoaXMuX2NlbnRlciA9IG1hcC51bnByb2plY3QobWFwLnByb2plY3QodGhpcy5fcGluY2hTdGFydExhdExuZykuc3VidHJhY3QoZGVsdGEpKTtcblx0XHR9XG5cblx0XHRpZiAoIW1hcC5vcHRpb25zLmJvdW5jZUF0Wm9vbUxpbWl0cykge1xuXHRcdFx0aWYgKCh0aGlzLl96b29tIDw9IG1hcC5nZXRNaW5ab29tKCkgJiYgc2NhbGUgPCAxKSB8fFxuXHRcdCAgICAgICAgKHRoaXMuX3pvb20gPj0gbWFwLmdldE1heFpvb20oKSAmJiBzY2FsZSA+IDEpKSB7IHJldHVybjsgfVxuXHRcdH1cblxuXHRcdGlmICghdGhpcy5fbW92ZWQpIHtcblx0XHRcdG1hcC5fbW92ZVN0YXJ0KHRydWUpO1xuXHRcdFx0dGhpcy5fbW92ZWQgPSB0cnVlO1xuXHRcdH1cblxuXHRcdEwuVXRpbC5jYW5jZWxBbmltRnJhbWUodGhpcy5fYW5pbVJlcXVlc3QpO1xuXG5cdFx0dmFyIG1vdmVGbiA9IEwuYmluZChtYXAuX21vdmUsIG1hcCwgdGhpcy5fY2VudGVyLCB0aGlzLl96b29tLCB7cGluY2g6IHRydWUsIHJvdW5kOiBmYWxzZX0pO1xuXHRcdHRoaXMuX2FuaW1SZXF1ZXN0ID0gTC5VdGlsLnJlcXVlc3RBbmltRnJhbWUobW92ZUZuLCB0aGlzLCB0cnVlKTtcblxuXHRcdEwuRG9tRXZlbnQucHJldmVudERlZmF1bHQoZSk7XG5cdH0sXG5cblx0X29uVG91Y2hFbmQ6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoIXRoaXMuX21vdmVkIHx8ICF0aGlzLl96b29taW5nKSB7XG5cdFx0XHR0aGlzLl96b29taW5nID0gZmFsc2U7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGhpcy5fem9vbWluZyA9IGZhbHNlO1xuXHRcdEwuVXRpbC5jYW5jZWxBbmltRnJhbWUodGhpcy5fYW5pbVJlcXVlc3QpO1xuXG5cdFx0TC5Eb21FdmVudFxuXHRcdCAgICAub2ZmKGRvY3VtZW50LCAndG91Y2htb3ZlJywgdGhpcy5fb25Ub3VjaE1vdmUpXG5cdFx0ICAgIC5vZmYoZG9jdW1lbnQsICd0b3VjaGVuZCcsIHRoaXMuX29uVG91Y2hFbmQpO1xuXG5cdFx0dmFyIHpvb20gPSB0aGlzLl96b29tO1xuXHRcdHpvb20gPSB0aGlzLl9tYXAuX2xpbWl0Wm9vbSh6b29tIC0gdGhpcy5fc3RhcnRab29tID4gMCA/IE1hdGguY2VpbCh6b29tKSA6IE1hdGguZmxvb3Ioem9vbSkpO1xuXG5cblx0XHR0aGlzLl9tYXAuX2FuaW1hdGVab29tKHRoaXMuX2NlbnRlciwgem9vbSwgdHJ1ZSwgdHJ1ZSk7XG5cdH1cbn0pO1xuXG5MLk1hcC5hZGRJbml0SG9vaygnYWRkSGFuZGxlcicsICd0b3VjaFpvb20nLCBMLk1hcC5Ub3VjaFpvb20pO1xuXG5cblxuLypcbiAqIEwuTWFwLlRhcCBpcyB1c2VkIHRvIGVuYWJsZSBtb2JpbGUgaGFja3MgbGlrZSBxdWljayB0YXBzIGFuZCBsb25nIGhvbGQuXG4gKi9cblxuTC5NYXAubWVyZ2VPcHRpb25zKHtcblx0dGFwOiB0cnVlLFxuXHR0YXBUb2xlcmFuY2U6IDE1XG59KTtcblxuTC5NYXAuVGFwID0gTC5IYW5kbGVyLmV4dGVuZCh7XG5cdGFkZEhvb2tzOiBmdW5jdGlvbiAoKSB7XG5cdFx0TC5Eb21FdmVudC5vbih0aGlzLl9tYXAuX2NvbnRhaW5lciwgJ3RvdWNoc3RhcnQnLCB0aGlzLl9vbkRvd24sIHRoaXMpO1xuXHR9LFxuXG5cdHJlbW92ZUhvb2tzOiBmdW5jdGlvbiAoKSB7XG5cdFx0TC5Eb21FdmVudC5vZmYodGhpcy5fbWFwLl9jb250YWluZXIsICd0b3VjaHN0YXJ0JywgdGhpcy5fb25Eb3duLCB0aGlzKTtcblx0fSxcblxuXHRfb25Eb3duOiBmdW5jdGlvbiAoZSkge1xuXHRcdGlmICghZS50b3VjaGVzKSB7IHJldHVybjsgfVxuXG5cdFx0TC5Eb21FdmVudC5wcmV2ZW50RGVmYXVsdChlKTtcblxuXHRcdHRoaXMuX2ZpcmVDbGljayA9IHRydWU7XG5cblx0XHQvLyBkb24ndCBzaW11bGF0ZSBjbGljayBvciB0cmFjayBsb25ncHJlc3MgaWYgbW9yZSB0aGFuIDEgdG91Y2hcblx0XHRpZiAoZS50b3VjaGVzLmxlbmd0aCA+IDEpIHtcblx0XHRcdHRoaXMuX2ZpcmVDbGljayA9IGZhbHNlO1xuXHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMuX2hvbGRUaW1lb3V0KTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR2YXIgZmlyc3QgPSBlLnRvdWNoZXNbMF0sXG5cdFx0ICAgIGVsID0gZmlyc3QudGFyZ2V0O1xuXG5cdFx0dGhpcy5fc3RhcnRQb3MgPSB0aGlzLl9uZXdQb3MgPSBuZXcgTC5Qb2ludChmaXJzdC5jbGllbnRYLCBmaXJzdC5jbGllbnRZKTtcblxuXHRcdC8vIGlmIHRvdWNoaW5nIGEgbGluaywgaGlnaGxpZ2h0IGl0XG5cdFx0aWYgKGVsLnRhZ05hbWUgJiYgZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnYScpIHtcblx0XHRcdEwuRG9tVXRpbC5hZGRDbGFzcyhlbCwgJ2xlYWZsZXQtYWN0aXZlJyk7XG5cdFx0fVxuXG5cdFx0Ly8gc2ltdWxhdGUgbG9uZyBob2xkIGJ1dCBzZXR0aW5nIGEgdGltZW91dFxuXHRcdHRoaXMuX2hvbGRUaW1lb3V0ID0gc2V0VGltZW91dChMLmJpbmQoZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKHRoaXMuX2lzVGFwVmFsaWQoKSkge1xuXHRcdFx0XHR0aGlzLl9maXJlQ2xpY2sgPSBmYWxzZTtcblx0XHRcdFx0dGhpcy5fb25VcCgpO1xuXHRcdFx0XHR0aGlzLl9zaW11bGF0ZUV2ZW50KCdjb250ZXh0bWVudScsIGZpcnN0KTtcblx0XHRcdH1cblx0XHR9LCB0aGlzKSwgMTAwMCk7XG5cblx0XHR0aGlzLl9zaW11bGF0ZUV2ZW50KCdtb3VzZWRvd24nLCBmaXJzdCk7XG5cblx0XHRMLkRvbUV2ZW50Lm9uKGRvY3VtZW50LCB7XG5cdFx0XHR0b3VjaG1vdmU6IHRoaXMuX29uTW92ZSxcblx0XHRcdHRvdWNoZW5kOiB0aGlzLl9vblVwXG5cdFx0fSwgdGhpcyk7XG5cdH0sXG5cblx0X29uVXA6IGZ1bmN0aW9uIChlKSB7XG5cdFx0Y2xlYXJUaW1lb3V0KHRoaXMuX2hvbGRUaW1lb3V0KTtcblxuXHRcdEwuRG9tRXZlbnQub2ZmKGRvY3VtZW50LCB7XG5cdFx0XHR0b3VjaG1vdmU6IHRoaXMuX29uTW92ZSxcblx0XHRcdHRvdWNoZW5kOiB0aGlzLl9vblVwXG5cdFx0fSwgdGhpcyk7XG5cblx0XHRpZiAodGhpcy5fZmlyZUNsaWNrICYmIGUgJiYgZS5jaGFuZ2VkVG91Y2hlcykge1xuXG5cdFx0XHR2YXIgZmlyc3QgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLFxuXHRcdFx0ICAgIGVsID0gZmlyc3QudGFyZ2V0O1xuXG5cdFx0XHRpZiAoZWwgJiYgZWwudGFnTmFtZSAmJiBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdhJykge1xuXHRcdFx0XHRMLkRvbVV0aWwucmVtb3ZlQ2xhc3MoZWwsICdsZWFmbGV0LWFjdGl2ZScpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9zaW11bGF0ZUV2ZW50KCdtb3VzZXVwJywgZmlyc3QpO1xuXG5cdFx0XHQvLyBzaW11bGF0ZSBjbGljayBpZiB0aGUgdG91Y2ggZGlkbid0IG1vdmUgdG9vIG11Y2hcblx0XHRcdGlmICh0aGlzLl9pc1RhcFZhbGlkKCkpIHtcblx0XHRcdFx0dGhpcy5fc2ltdWxhdGVFdmVudCgnY2xpY2snLCBmaXJzdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdF9pc1RhcFZhbGlkOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX25ld1Bvcy5kaXN0YW5jZVRvKHRoaXMuX3N0YXJ0UG9zKSA8PSB0aGlzLl9tYXAub3B0aW9ucy50YXBUb2xlcmFuY2U7XG5cdH0sXG5cblx0X29uTW92ZTogZnVuY3Rpb24gKGUpIHtcblx0XHR2YXIgZmlyc3QgPSBlLnRvdWNoZXNbMF07XG5cdFx0dGhpcy5fbmV3UG9zID0gbmV3IEwuUG9pbnQoZmlyc3QuY2xpZW50WCwgZmlyc3QuY2xpZW50WSk7XG5cdFx0dGhpcy5fc2ltdWxhdGVFdmVudCgnbW91c2Vtb3ZlJywgZmlyc3QpO1xuXHR9LFxuXG5cdF9zaW11bGF0ZUV2ZW50OiBmdW5jdGlvbiAodHlwZSwgZSkge1xuXHRcdHZhciBzaW11bGF0ZWRFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50cycpO1xuXG5cdFx0c2ltdWxhdGVkRXZlbnQuX3NpbXVsYXRlZCA9IHRydWU7XG5cdFx0ZS50YXJnZXQuX3NpbXVsYXRlZENsaWNrID0gdHJ1ZTtcblxuXHRcdHNpbXVsYXRlZEV2ZW50LmluaXRNb3VzZUV2ZW50KFxuXHRcdCAgICAgICAgdHlwZSwgdHJ1ZSwgdHJ1ZSwgd2luZG93LCAxLFxuXHRcdCAgICAgICAgZS5zY3JlZW5YLCBlLnNjcmVlblksXG5cdFx0ICAgICAgICBlLmNsaWVudFgsIGUuY2xpZW50WSxcblx0XHQgICAgICAgIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAwLCBudWxsKTtcblxuXHRcdGUudGFyZ2V0LmRpc3BhdGNoRXZlbnQoc2ltdWxhdGVkRXZlbnQpO1xuXHR9XG59KTtcblxuaWYgKEwuQnJvd3Nlci50b3VjaCAmJiAhTC5Ccm93c2VyLnBvaW50ZXIpIHtcblx0TC5NYXAuYWRkSW5pdEhvb2soJ2FkZEhhbmRsZXInLCAndGFwJywgTC5NYXAuVGFwKTtcbn1cblxuXG5cbi8qXG4gKiBMLkhhbmRsZXIuU2hpZnREcmFnWm9vbSBpcyB1c2VkIHRvIGFkZCBzaGlmdC1kcmFnIHpvb20gaW50ZXJhY3Rpb24gdG8gdGhlIG1hcFxuICAqICh6b29tIHRvIGEgc2VsZWN0ZWQgYm91bmRpbmcgYm94KSwgZW5hYmxlZCBieSBkZWZhdWx0LlxuICovXG5cbkwuTWFwLm1lcmdlT3B0aW9ucyh7XG5cdGJveFpvb206IHRydWVcbn0pO1xuXG5MLk1hcC5Cb3hab29tID0gTC5IYW5kbGVyLmV4dGVuZCh7XG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIChtYXApIHtcblx0XHR0aGlzLl9tYXAgPSBtYXA7XG5cdFx0dGhpcy5fY29udGFpbmVyID0gbWFwLl9jb250YWluZXI7XG5cdFx0dGhpcy5fcGFuZSA9IG1hcC5fcGFuZXMub3ZlcmxheVBhbmU7XG5cdH0sXG5cblx0YWRkSG9va3M6IGZ1bmN0aW9uICgpIHtcblx0XHRMLkRvbUV2ZW50Lm9uKHRoaXMuX2NvbnRhaW5lciwgJ21vdXNlZG93bicsIHRoaXMuX29uTW91c2VEb3duLCB0aGlzKTtcblx0fSxcblxuXHRyZW1vdmVIb29rczogZnVuY3Rpb24gKCkge1xuXHRcdEwuRG9tRXZlbnQub2ZmKHRoaXMuX2NvbnRhaW5lciwgJ21vdXNlZG93bicsIHRoaXMuX29uTW91c2VEb3duLCB0aGlzKTtcblx0fSxcblxuXHRtb3ZlZDogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLl9tb3ZlZDtcblx0fSxcblxuXHRfcmVzZXRTdGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuX21vdmVkID0gZmFsc2U7XG5cdH0sXG5cblx0X29uTW91c2VEb3duOiBmdW5jdGlvbiAoZSkge1xuXHRcdGlmICghZS5zaGlmdEtleSB8fCAoKGUud2hpY2ggIT09IDEpICYmIChlLmJ1dHRvbiAhPT0gMSkpKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdFx0dGhpcy5fcmVzZXRTdGF0ZSgpO1xuXG5cdFx0TC5Eb21VdGlsLmRpc2FibGVUZXh0U2VsZWN0aW9uKCk7XG5cdFx0TC5Eb21VdGlsLmRpc2FibGVJbWFnZURyYWcoKTtcblxuXHRcdHRoaXMuX3N0YXJ0UG9pbnQgPSB0aGlzLl9tYXAubW91c2VFdmVudFRvQ29udGFpbmVyUG9pbnQoZSk7XG5cblx0XHRMLkRvbUV2ZW50Lm9uKGRvY3VtZW50LCB7XG5cdFx0XHRjb250ZXh0bWVudTogTC5Eb21FdmVudC5zdG9wLFxuXHRcdFx0bW91c2Vtb3ZlOiB0aGlzLl9vbk1vdXNlTW92ZSxcblx0XHRcdG1vdXNldXA6IHRoaXMuX29uTW91c2VVcCxcblx0XHRcdGtleWRvd246IHRoaXMuX29uS2V5RG93blxuXHRcdH0sIHRoaXMpO1xuXHR9LFxuXG5cdF9vbk1vdXNlTW92ZTogZnVuY3Rpb24gKGUpIHtcblx0XHRpZiAoIXRoaXMuX21vdmVkKSB7XG5cdFx0XHR0aGlzLl9tb3ZlZCA9IHRydWU7XG5cblx0XHRcdHRoaXMuX2JveCA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdsZWFmbGV0LXpvb20tYm94JywgdGhpcy5fY29udGFpbmVyKTtcblx0XHRcdEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9jb250YWluZXIsICdsZWFmbGV0LWNyb3NzaGFpcicpO1xuXG5cdFx0XHR0aGlzLl9tYXAuZmlyZSgnYm94em9vbXN0YXJ0Jyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fcG9pbnQgPSB0aGlzLl9tYXAubW91c2VFdmVudFRvQ29udGFpbmVyUG9pbnQoZSk7XG5cblx0XHR2YXIgYm91bmRzID0gbmV3IEwuQm91bmRzKHRoaXMuX3BvaW50LCB0aGlzLl9zdGFydFBvaW50KSxcblx0XHQgICAgc2l6ZSA9IGJvdW5kcy5nZXRTaXplKCk7XG5cblx0XHRMLkRvbVV0aWwuc2V0UG9zaXRpb24odGhpcy5fYm94LCBib3VuZHMubWluKTtcblxuXHRcdHRoaXMuX2JveC5zdHlsZS53aWR0aCAgPSBzaXplLnggKyAncHgnO1xuXHRcdHRoaXMuX2JveC5zdHlsZS5oZWlnaHQgPSBzaXplLnkgKyAncHgnO1xuXHR9LFxuXG5cdF9maW5pc2g6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5fbW92ZWQpIHtcblx0XHRcdEwuRG9tVXRpbC5yZW1vdmUodGhpcy5fYm94KTtcblx0XHRcdEwuRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl9jb250YWluZXIsICdsZWFmbGV0LWNyb3NzaGFpcicpO1xuXHRcdH1cblxuXHRcdEwuRG9tVXRpbC5lbmFibGVUZXh0U2VsZWN0aW9uKCk7XG5cdFx0TC5Eb21VdGlsLmVuYWJsZUltYWdlRHJhZygpO1xuXG5cdFx0TC5Eb21FdmVudC5vZmYoZG9jdW1lbnQsIHtcblx0XHRcdGNvbnRleHRtZW51OiBMLkRvbUV2ZW50LnN0b3AsXG5cdFx0XHRtb3VzZW1vdmU6IHRoaXMuX29uTW91c2VNb3ZlLFxuXHRcdFx0bW91c2V1cDogdGhpcy5fb25Nb3VzZVVwLFxuXHRcdFx0a2V5ZG93bjogdGhpcy5fb25LZXlEb3duXG5cdFx0fSwgdGhpcyk7XG5cdH0sXG5cblx0X29uTW91c2VVcDogZnVuY3Rpb24gKGUpIHtcblx0XHRpZiAoKGUud2hpY2ggIT09IDEpICYmIChlLmJ1dHRvbiAhPT0gMSkpIHsgcmV0dXJuOyB9XG5cblx0XHR0aGlzLl9maW5pc2goKTtcblxuXHRcdGlmICghdGhpcy5fbW92ZWQpIHsgcmV0dXJuOyB9XG5cdFx0Ly8gUG9zdHBvbmUgdG8gbmV4dCBKUyB0aWNrIHNvIGludGVybmFsIGNsaWNrIGV2ZW50IGhhbmRsaW5nXG5cdFx0Ly8gc3RpbGwgc2VlIGl0IGFzIFwibW92ZWRcIi5cblx0XHRzZXRUaW1lb3V0KEwuYmluZCh0aGlzLl9yZXNldFN0YXRlLCB0aGlzKSwgMCk7XG5cblx0XHR2YXIgYm91bmRzID0gbmV3IEwuTGF0TG5nQm91bmRzKFxuXHRcdCAgICAgICAgdGhpcy5fbWFwLmNvbnRhaW5lclBvaW50VG9MYXRMbmcodGhpcy5fc3RhcnRQb2ludCksXG5cdFx0ICAgICAgICB0aGlzLl9tYXAuY29udGFpbmVyUG9pbnRUb0xhdExuZyh0aGlzLl9wb2ludCkpO1xuXG5cdFx0dGhpcy5fbWFwXG5cdFx0XHQuZml0Qm91bmRzKGJvdW5kcylcblx0XHRcdC5maXJlKCdib3h6b29tZW5kJywge2JveFpvb21Cb3VuZHM6IGJvdW5kc30pO1xuXHR9LFxuXG5cdF9vbktleURvd246IGZ1bmN0aW9uIChlKSB7XG5cdFx0aWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcblx0XHRcdHRoaXMuX2ZpbmlzaCgpO1xuXHRcdH1cblx0fVxufSk7XG5cbkwuTWFwLmFkZEluaXRIb29rKCdhZGRIYW5kbGVyJywgJ2JveFpvb20nLCBMLk1hcC5Cb3hab29tKTtcblxuXG5cbi8qXG4gKiBMLk1hcC5LZXlib2FyZCBpcyBoYW5kbGluZyBrZXlib2FyZCBpbnRlcmFjdGlvbiB3aXRoIHRoZSBtYXAsIGVuYWJsZWQgYnkgZGVmYXVsdC5cbiAqL1xuXG5MLk1hcC5tZXJnZU9wdGlvbnMoe1xuXHRrZXlib2FyZDogdHJ1ZSxcblx0a2V5Ym9hcmRQYW5PZmZzZXQ6IDgwLFxuXHRrZXlib2FyZFpvb21PZmZzZXQ6IDFcbn0pO1xuXG5MLk1hcC5LZXlib2FyZCA9IEwuSGFuZGxlci5leHRlbmQoe1xuXG5cdGtleUNvZGVzOiB7XG5cdFx0bGVmdDogICAgWzM3XSxcblx0XHRyaWdodDogICBbMzldLFxuXHRcdGRvd246ICAgIFs0MF0sXG5cdFx0dXA6ICAgICAgWzM4XSxcblx0XHR6b29tSW46ICBbMTg3LCAxMDcsIDYxLCAxNzFdLFxuXHRcdHpvb21PdXQ6IFsxODksIDEwOSwgNTQsIDE3M11cblx0fSxcblxuXHRpbml0aWFsaXplOiBmdW5jdGlvbiAobWFwKSB7XG5cdFx0dGhpcy5fbWFwID0gbWFwO1xuXG5cdFx0dGhpcy5fc2V0UGFuT2Zmc2V0KG1hcC5vcHRpb25zLmtleWJvYXJkUGFuT2Zmc2V0KTtcblx0XHR0aGlzLl9zZXRab29tT2Zmc2V0KG1hcC5vcHRpb25zLmtleWJvYXJkWm9vbU9mZnNldCk7XG5cdH0sXG5cblx0YWRkSG9va3M6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgY29udGFpbmVyID0gdGhpcy5fbWFwLl9jb250YWluZXI7XG5cblx0XHQvLyBtYWtlIHRoZSBjb250YWluZXIgZm9jdXNhYmxlIGJ5IHRhYmJpbmdcblx0XHRpZiAoY29udGFpbmVyLnRhYkluZGV4IDw9IDApIHtcblx0XHRcdGNvbnRhaW5lci50YWJJbmRleCA9ICcwJztcblx0XHR9XG5cblx0XHRMLkRvbUV2ZW50Lm9uKGNvbnRhaW5lciwge1xuXHRcdFx0Zm9jdXM6IHRoaXMuX29uRm9jdXMsXG5cdFx0XHRibHVyOiB0aGlzLl9vbkJsdXIsXG5cdFx0XHRtb3VzZWRvd246IHRoaXMuX29uTW91c2VEb3duXG5cdFx0fSwgdGhpcyk7XG5cblx0XHR0aGlzLl9tYXAub24oe1xuXHRcdFx0Zm9jdXM6IHRoaXMuX2FkZEhvb2tzLFxuXHRcdFx0Ymx1cjogdGhpcy5fcmVtb3ZlSG9va3Ncblx0XHR9LCB0aGlzKTtcblx0fSxcblxuXHRyZW1vdmVIb29rczogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuX3JlbW92ZUhvb2tzKCk7XG5cblx0XHRMLkRvbUV2ZW50Lm9mZih0aGlzLl9tYXAuX2NvbnRhaW5lciwge1xuXHRcdFx0Zm9jdXM6IHRoaXMuX29uRm9jdXMsXG5cdFx0XHRibHVyOiB0aGlzLl9vbkJsdXIsXG5cdFx0XHRtb3VzZWRvd246IHRoaXMuX29uTW91c2VEb3duXG5cdFx0fSwgdGhpcyk7XG5cblx0XHR0aGlzLl9tYXAub2ZmKHtcblx0XHRcdGZvY3VzOiB0aGlzLl9hZGRIb29rcyxcblx0XHRcdGJsdXI6IHRoaXMuX3JlbW92ZUhvb2tzXG5cdFx0fSwgdGhpcyk7XG5cdH0sXG5cblx0X29uTW91c2VEb3duOiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuX2ZvY3VzZWQpIHsgcmV0dXJuOyB9XG5cblx0XHR2YXIgYm9keSA9IGRvY3VtZW50LmJvZHksXG5cdFx0ICAgIGRvY0VsID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxuXHRcdCAgICB0b3AgPSBib2R5LnNjcm9sbFRvcCB8fCBkb2NFbC5zY3JvbGxUb3AsXG5cdFx0ICAgIGxlZnQgPSBib2R5LnNjcm9sbExlZnQgfHwgZG9jRWwuc2Nyb2xsTGVmdDtcblxuXHRcdHRoaXMuX21hcC5fY29udGFpbmVyLmZvY3VzKCk7XG5cblx0XHR3aW5kb3cuc2Nyb2xsVG8obGVmdCwgdG9wKTtcblx0fSxcblxuXHRfb25Gb2N1czogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuX2ZvY3VzZWQgPSB0cnVlO1xuXHRcdHRoaXMuX21hcC5maXJlKCdmb2N1cycpO1xuXHR9LFxuXG5cdF9vbkJsdXI6IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLl9mb2N1c2VkID0gZmFsc2U7XG5cdFx0dGhpcy5fbWFwLmZpcmUoJ2JsdXInKTtcblx0fSxcblxuXHRfc2V0UGFuT2Zmc2V0OiBmdW5jdGlvbiAocGFuKSB7XG5cdFx0dmFyIGtleXMgPSB0aGlzLl9wYW5LZXlzID0ge30sXG5cdFx0ICAgIGNvZGVzID0gdGhpcy5rZXlDb2Rlcyxcblx0XHQgICAgaSwgbGVuO1xuXG5cdFx0Zm9yIChpID0gMCwgbGVuID0gY29kZXMubGVmdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0a2V5c1tjb2Rlcy5sZWZ0W2ldXSA9IFstMSAqIHBhbiwgMF07XG5cdFx0fVxuXHRcdGZvciAoaSA9IDAsIGxlbiA9IGNvZGVzLnJpZ2h0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRrZXlzW2NvZGVzLnJpZ2h0W2ldXSA9IFtwYW4sIDBdO1xuXHRcdH1cblx0XHRmb3IgKGkgPSAwLCBsZW4gPSBjb2Rlcy5kb3duLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRrZXlzW2NvZGVzLmRvd25baV1dID0gWzAsIHBhbl07XG5cdFx0fVxuXHRcdGZvciAoaSA9IDAsIGxlbiA9IGNvZGVzLnVwLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRrZXlzW2NvZGVzLnVwW2ldXSA9IFswLCAtMSAqIHBhbl07XG5cdFx0fVxuXHR9LFxuXG5cdF9zZXRab29tT2Zmc2V0OiBmdW5jdGlvbiAoem9vbSkge1xuXHRcdHZhciBrZXlzID0gdGhpcy5fem9vbUtleXMgPSB7fSxcblx0XHQgICAgY29kZXMgPSB0aGlzLmtleUNvZGVzLFxuXHRcdCAgICBpLCBsZW47XG5cblx0XHRmb3IgKGkgPSAwLCBsZW4gPSBjb2Rlcy56b29tSW4ubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGtleXNbY29kZXMuem9vbUluW2ldXSA9IHpvb207XG5cdFx0fVxuXHRcdGZvciAoaSA9IDAsIGxlbiA9IGNvZGVzLnpvb21PdXQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGtleXNbY29kZXMuem9vbU91dFtpXV0gPSAtem9vbTtcblx0XHR9XG5cdH0sXG5cblx0X2FkZEhvb2tzOiBmdW5jdGlvbiAoKSB7XG5cdFx0TC5Eb21FdmVudC5vbihkb2N1bWVudCwgJ2tleWRvd24nLCB0aGlzLl9vbktleURvd24sIHRoaXMpO1xuXHR9LFxuXG5cdF9yZW1vdmVIb29rczogZnVuY3Rpb24gKCkge1xuXHRcdEwuRG9tRXZlbnQub2ZmKGRvY3VtZW50LCAna2V5ZG93bicsIHRoaXMuX29uS2V5RG93biwgdGhpcyk7XG5cdH0sXG5cblx0X29uS2V5RG93bjogZnVuY3Rpb24gKGUpIHtcblx0XHRpZiAoZS5hbHRLZXkgfHwgZS5jdHJsS2V5IHx8IGUubWV0YUtleSkgeyByZXR1cm47IH1cblxuXHRcdHZhciBrZXkgPSBlLmtleUNvZGUsXG5cdFx0ICAgIG1hcCA9IHRoaXMuX21hcCxcblx0XHQgICAgb2Zmc2V0O1xuXG5cdFx0aWYgKGtleSBpbiB0aGlzLl9wYW5LZXlzKSB7XG5cblx0XHRcdGlmIChtYXAuX3BhbkFuaW0gJiYgbWFwLl9wYW5BbmltLl9pblByb2dyZXNzKSB7IHJldHVybjsgfVxuXG5cdFx0XHRvZmZzZXQgPSB0aGlzLl9wYW5LZXlzW2tleV07XG5cdFx0XHRpZiAoZS5zaGlmdEtleSkge1xuXHRcdFx0XHRvZmZzZXQgPSBMLnBvaW50KG9mZnNldCkubXVsdGlwbHlCeSgzKTtcblx0XHRcdH1cblxuXHRcdFx0bWFwLnBhbkJ5KG9mZnNldCk7XG5cblx0XHRcdGlmIChtYXAub3B0aW9ucy5tYXhCb3VuZHMpIHtcblx0XHRcdFx0bWFwLnBhbkluc2lkZUJvdW5kcyhtYXAub3B0aW9ucy5tYXhCb3VuZHMpO1xuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIGlmIChrZXkgaW4gdGhpcy5fem9vbUtleXMpIHtcblx0XHRcdG1hcC5zZXRab29tKG1hcC5nZXRab29tKCkgKyAoZS5zaGlmdEtleSA/IDMgOiAxKSAqIHRoaXMuX3pvb21LZXlzW2tleV0pO1xuXG5cdFx0fSBlbHNlIGlmIChrZXkgPT09IDI3KSB7XG5cdFx0XHRtYXAuY2xvc2VQb3B1cCgpO1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRMLkRvbUV2ZW50LnN0b3AoZSk7XG5cdH1cbn0pO1xuXG5MLk1hcC5hZGRJbml0SG9vaygnYWRkSGFuZGxlcicsICdrZXlib2FyZCcsIEwuTWFwLktleWJvYXJkKTtcblxuXG5cbi8qXG4gKiBMLkhhbmRsZXIuTWFya2VyRHJhZyBpcyB1c2VkIGludGVybmFsbHkgYnkgTC5NYXJrZXIgdG8gbWFrZSB0aGUgbWFya2VycyBkcmFnZ2FibGUuXG4gKi9cblxuTC5IYW5kbGVyLk1hcmtlckRyYWcgPSBMLkhhbmRsZXIuZXh0ZW5kKHtcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKG1hcmtlcikge1xuXHRcdHRoaXMuX21hcmtlciA9IG1hcmtlcjtcblx0fSxcblxuXHRhZGRIb29rczogZnVuY3Rpb24gKCkge1xuXHRcdHZhciBpY29uID0gdGhpcy5fbWFya2VyLl9pY29uO1xuXG5cdFx0aWYgKCF0aGlzLl9kcmFnZ2FibGUpIHtcblx0XHRcdHRoaXMuX2RyYWdnYWJsZSA9IG5ldyBMLkRyYWdnYWJsZShpY29uLCBpY29uLCB0cnVlKTtcblx0XHR9XG5cblx0XHR0aGlzLl9kcmFnZ2FibGUub24oe1xuXHRcdFx0ZHJhZ3N0YXJ0OiB0aGlzLl9vbkRyYWdTdGFydCxcblx0XHRcdGRyYWc6IHRoaXMuX29uRHJhZyxcblx0XHRcdGRyYWdlbmQ6IHRoaXMuX29uRHJhZ0VuZFxuXHRcdH0sIHRoaXMpLmVuYWJsZSgpO1xuXG5cdFx0TC5Eb21VdGlsLmFkZENsYXNzKGljb24sICdsZWFmbGV0LW1hcmtlci1kcmFnZ2FibGUnKTtcblx0fSxcblxuXHRyZW1vdmVIb29rczogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuX2RyYWdnYWJsZS5vZmYoe1xuXHRcdFx0ZHJhZ3N0YXJ0OiB0aGlzLl9vbkRyYWdTdGFydCxcblx0XHRcdGRyYWc6IHRoaXMuX29uRHJhZyxcblx0XHRcdGRyYWdlbmQ6IHRoaXMuX29uRHJhZ0VuZFxuXHRcdH0sIHRoaXMpLmRpc2FibGUoKTtcblxuXHRcdGlmICh0aGlzLl9tYXJrZXIuX2ljb24pIHtcblx0XHRcdEwuRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl9tYXJrZXIuX2ljb24sICdsZWFmbGV0LW1hcmtlci1kcmFnZ2FibGUnKTtcblx0XHR9XG5cdH0sXG5cblx0bW92ZWQ6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5fZHJhZ2dhYmxlICYmIHRoaXMuX2RyYWdnYWJsZS5fbW92ZWQ7XG5cdH0sXG5cblx0X29uRHJhZ1N0YXJ0OiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fbWFya2VyXG5cdFx0ICAgIC5jbG9zZVBvcHVwKClcblx0XHQgICAgLmZpcmUoJ21vdmVzdGFydCcpXG5cdFx0ICAgIC5maXJlKCdkcmFnc3RhcnQnKTtcblx0fSxcblxuXHRfb25EcmFnOiBmdW5jdGlvbiAoZSkge1xuXHRcdHZhciBtYXJrZXIgPSB0aGlzLl9tYXJrZXIsXG5cdFx0ICAgIHNoYWRvdyA9IG1hcmtlci5fc2hhZG93LFxuXHRcdCAgICBpY29uUG9zID0gTC5Eb21VdGlsLmdldFBvc2l0aW9uKG1hcmtlci5faWNvbiksXG5cdFx0ICAgIGxhdGxuZyA9IG1hcmtlci5fbWFwLmxheWVyUG9pbnRUb0xhdExuZyhpY29uUG9zKTtcblxuXHRcdC8vIHVwZGF0ZSBzaGFkb3cgcG9zaXRpb25cblx0XHRpZiAoc2hhZG93KSB7XG5cdFx0XHRMLkRvbVV0aWwuc2V0UG9zaXRpb24oc2hhZG93LCBpY29uUG9zKTtcblx0XHR9XG5cblx0XHRtYXJrZXIuX2xhdGxuZyA9IGxhdGxuZztcblx0XHRlLmxhdGxuZyA9IGxhdGxuZztcblxuXHRcdG1hcmtlclxuXHRcdCAgICAuZmlyZSgnbW92ZScsIGUpXG5cdFx0ICAgIC5maXJlKCdkcmFnJywgZSk7XG5cdH0sXG5cblx0X29uRHJhZ0VuZDogZnVuY3Rpb24gKGUpIHtcblx0XHR0aGlzLl9tYXJrZXJcblx0XHQgICAgLmZpcmUoJ21vdmVlbmQnKVxuXHRcdCAgICAuZmlyZSgnZHJhZ2VuZCcsIGUpO1xuXHR9XG59KTtcblxuXG5cbi8qXHJcbiAqIEwuQ29udHJvbCBpcyBhIGJhc2UgY2xhc3MgZm9yIGltcGxlbWVudGluZyBtYXAgY29udHJvbHMuIEhhbmRsZXMgcG9zaXRpb25pbmcuXHJcbiAqIEFsbCBvdGhlciBjb250cm9scyBleHRlbmQgZnJvbSB0aGlzIGNsYXNzLlxyXG4gKi9cclxuXHJcbkwuQ29udHJvbCA9IEwuQ2xhc3MuZXh0ZW5kKHtcclxuXHRvcHRpb25zOiB7XHJcblx0XHRwb3NpdGlvbjogJ3RvcHJpZ2h0J1xyXG5cdH0sXHJcblxyXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcblx0XHRMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XHJcblx0fSxcclxuXHJcblx0Z2V0UG9zaXRpb246IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLm9wdGlvbnMucG9zaXRpb247XHJcblx0fSxcclxuXHJcblx0c2V0UG9zaXRpb246IGZ1bmN0aW9uIChwb3NpdGlvbikge1xyXG5cdFx0dmFyIG1hcCA9IHRoaXMuX21hcDtcclxuXHJcblx0XHRpZiAobWFwKSB7XHJcblx0XHRcdG1hcC5yZW1vdmVDb250cm9sKHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMub3B0aW9ucy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG5cclxuXHRcdGlmIChtYXApIHtcclxuXHRcdFx0bWFwLmFkZENvbnRyb2wodGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0Z2V0Q29udGFpbmVyOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fY29udGFpbmVyO1xyXG5cdH0sXHJcblxyXG5cdGFkZFRvOiBmdW5jdGlvbiAobWFwKSB7XHJcblx0XHR0aGlzLnJlbW92ZSgpO1xyXG5cdFx0dGhpcy5fbWFwID0gbWFwO1xyXG5cclxuXHRcdHZhciBjb250YWluZXIgPSB0aGlzLl9jb250YWluZXIgPSB0aGlzLm9uQWRkKG1hcCksXHJcblx0XHQgICAgcG9zID0gdGhpcy5nZXRQb3NpdGlvbigpLFxyXG5cdFx0ICAgIGNvcm5lciA9IG1hcC5fY29udHJvbENvcm5lcnNbcG9zXTtcclxuXHJcblx0XHRMLkRvbVV0aWwuYWRkQ2xhc3MoY29udGFpbmVyLCAnbGVhZmxldC1jb250cm9sJyk7XHJcblxyXG5cdFx0aWYgKHBvcy5pbmRleE9mKCdib3R0b20nKSAhPT0gLTEpIHtcclxuXHRcdFx0Y29ybmVyLmluc2VydEJlZm9yZShjb250YWluZXIsIGNvcm5lci5maXJzdENoaWxkKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvcm5lci5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHJlbW92ZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKCF0aGlzLl9tYXApIHtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9XHJcblxyXG5cdFx0TC5Eb21VdGlsLnJlbW92ZSh0aGlzLl9jb250YWluZXIpO1xyXG5cclxuXHRcdGlmICh0aGlzLm9uUmVtb3ZlKSB7XHJcblx0XHRcdHRoaXMub25SZW1vdmUodGhpcy5fbWFwKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9tYXAgPSBudWxsO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdF9yZWZvY3VzT25NYXA6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHQvLyBpZiBtYXAgZXhpc3RzIGFuZCBldmVudCBpcyBub3QgYSBrZXlib2FyZCBldmVudFxyXG5cdFx0aWYgKHRoaXMuX21hcCAmJiBlICYmIGUuc2NyZWVuWCA+IDAgJiYgZS5zY3JlZW5ZID4gMCkge1xyXG5cdFx0XHR0aGlzLl9tYXAuZ2V0Q29udGFpbmVyKCkuZm9jdXMoKTtcclxuXHRcdH1cclxuXHR9XHJcbn0pO1xyXG5cclxuTC5jb250cm9sID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHRyZXR1cm4gbmV3IEwuQ29udHJvbChvcHRpb25zKTtcclxufTtcclxuXHJcblxyXG4vLyBhZGRzIGNvbnRyb2wtcmVsYXRlZCBtZXRob2RzIHRvIEwuTWFwXHJcblxyXG5MLk1hcC5pbmNsdWRlKHtcclxuXHRhZGRDb250cm9sOiBmdW5jdGlvbiAoY29udHJvbCkge1xyXG5cdFx0Y29udHJvbC5hZGRUbyh0aGlzKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHJlbW92ZUNvbnRyb2w6IGZ1bmN0aW9uIChjb250cm9sKSB7XHJcblx0XHRjb250cm9sLnJlbW92ZSgpO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0X2luaXRDb250cm9sUG9zOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgY29ybmVycyA9IHRoaXMuX2NvbnRyb2xDb3JuZXJzID0ge30sXHJcblx0XHQgICAgbCA9ICdsZWFmbGV0LScsXHJcblx0XHQgICAgY29udGFpbmVyID0gdGhpcy5fY29udHJvbENvbnRhaW5lciA9XHJcblx0XHQgICAgICAgICAgICBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCBsICsgJ2NvbnRyb2wtY29udGFpbmVyJywgdGhpcy5fY29udGFpbmVyKTtcclxuXHJcblx0XHRmdW5jdGlvbiBjcmVhdGVDb3JuZXIodlNpZGUsIGhTaWRlKSB7XHJcblx0XHRcdHZhciBjbGFzc05hbWUgPSBsICsgdlNpZGUgKyAnICcgKyBsICsgaFNpZGU7XHJcblxyXG5cdFx0XHRjb3JuZXJzW3ZTaWRlICsgaFNpZGVdID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgY2xhc3NOYW1lLCBjb250YWluZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNyZWF0ZUNvcm5lcigndG9wJywgJ2xlZnQnKTtcclxuXHRcdGNyZWF0ZUNvcm5lcigndG9wJywgJ3JpZ2h0Jyk7XHJcblx0XHRjcmVhdGVDb3JuZXIoJ2JvdHRvbScsICdsZWZ0Jyk7XHJcblx0XHRjcmVhdGVDb3JuZXIoJ2JvdHRvbScsICdyaWdodCcpO1xyXG5cdH0sXHJcblxyXG5cdF9jbGVhckNvbnRyb2xQb3M6IGZ1bmN0aW9uICgpIHtcclxuXHRcdEwuRG9tVXRpbC5yZW1vdmUodGhpcy5fY29udHJvbENvbnRhaW5lcik7XHJcblx0fVxyXG59KTtcclxuXG5cblxuLypcclxuICogTC5Db250cm9sLlpvb20gaXMgdXNlZCBmb3IgdGhlIGRlZmF1bHQgem9vbSBidXR0b25zIG9uIHRoZSBtYXAuXHJcbiAqL1xyXG5cclxuTC5Db250cm9sLlpvb20gPSBMLkNvbnRyb2wuZXh0ZW5kKHtcclxuXHRvcHRpb25zOiB7XHJcblx0XHRwb3NpdGlvbjogJ3RvcGxlZnQnLFxyXG5cdFx0em9vbUluVGV4dDogJysnLFxyXG5cdFx0em9vbUluVGl0bGU6ICdab29tIGluJyxcclxuXHRcdHpvb21PdXRUZXh0OiAnLScsXHJcblx0XHR6b29tT3V0VGl0bGU6ICdab29tIG91dCdcclxuXHR9LFxyXG5cclxuXHRvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xyXG5cdFx0dmFyIHpvb21OYW1lID0gJ2xlYWZsZXQtY29udHJvbC16b29tJyxcclxuXHRcdCAgICBjb250YWluZXIgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCB6b29tTmFtZSArICcgbGVhZmxldC1iYXInKSxcclxuXHRcdCAgICBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xyXG5cclxuXHRcdHRoaXMuX3pvb21JbkJ1dHRvbiAgPSB0aGlzLl9jcmVhdGVCdXR0b24ob3B0aW9ucy56b29tSW5UZXh0LCBvcHRpb25zLnpvb21JblRpdGxlLFxyXG5cdFx0ICAgICAgICB6b29tTmFtZSArICctaW4nLCAgY29udGFpbmVyLCB0aGlzLl96b29tSW4pO1xyXG5cdFx0dGhpcy5fem9vbU91dEJ1dHRvbiA9IHRoaXMuX2NyZWF0ZUJ1dHRvbihvcHRpb25zLnpvb21PdXRUZXh0LCBvcHRpb25zLnpvb21PdXRUaXRsZSxcclxuXHRcdCAgICAgICAgem9vbU5hbWUgKyAnLW91dCcsIGNvbnRhaW5lciwgdGhpcy5fem9vbU91dCk7XHJcblxyXG5cdFx0dGhpcy5fdXBkYXRlRGlzYWJsZWQoKTtcclxuXHRcdG1hcC5vbignem9vbWVuZCB6b29tbGV2ZWxzY2hhbmdlJywgdGhpcy5fdXBkYXRlRGlzYWJsZWQsIHRoaXMpO1xyXG5cclxuXHRcdHJldHVybiBjb250YWluZXI7XHJcblx0fSxcclxuXHJcblx0b25SZW1vdmU6IGZ1bmN0aW9uIChtYXApIHtcclxuXHRcdG1hcC5vZmYoJ3pvb21lbmQgem9vbWxldmVsc2NoYW5nZScsIHRoaXMuX3VwZGF0ZURpc2FibGVkLCB0aGlzKTtcclxuXHR9LFxyXG5cclxuXHRkaXNhYmxlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLl9kaXNhYmxlZCA9IHRydWU7XHJcblx0XHR0aGlzLl91cGRhdGVEaXNhYmxlZCgpO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0ZW5hYmxlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLl9kaXNhYmxlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5fdXBkYXRlRGlzYWJsZWQoKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdF96b29tSW46IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRpZiAoIXRoaXMuX2Rpc2FibGVkKSB7XHJcblx0XHRcdHRoaXMuX21hcC56b29tSW4oZS5zaGlmdEtleSA/IDMgOiAxKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfem9vbU91dDogZnVuY3Rpb24gKGUpIHtcclxuXHRcdGlmICghdGhpcy5fZGlzYWJsZWQpIHtcclxuXHRcdFx0dGhpcy5fbWFwLnpvb21PdXQoZS5zaGlmdEtleSA/IDMgOiAxKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfY3JlYXRlQnV0dG9uOiBmdW5jdGlvbiAoaHRtbCwgdGl0bGUsIGNsYXNzTmFtZSwgY29udGFpbmVyLCBmbikge1xyXG5cdFx0dmFyIGxpbmsgPSBMLkRvbVV0aWwuY3JlYXRlKCdhJywgY2xhc3NOYW1lLCBjb250YWluZXIpO1xyXG5cdFx0bGluay5pbm5lckhUTUwgPSBodG1sO1xyXG5cdFx0bGluay5ocmVmID0gJyMnO1xyXG5cdFx0bGluay50aXRsZSA9IHRpdGxlO1xyXG5cclxuXHRcdEwuRG9tRXZlbnRcclxuXHRcdCAgICAub24obGluaywgJ21vdXNlZG93biBkYmxjbGljaycsIEwuRG9tRXZlbnQuc3RvcFByb3BhZ2F0aW9uKVxyXG5cdFx0ICAgIC5vbihsaW5rLCAnY2xpY2snLCBMLkRvbUV2ZW50LnN0b3ApXHJcblx0XHQgICAgLm9uKGxpbmssICdjbGljaycsIGZuLCB0aGlzKVxyXG5cdFx0ICAgIC5vbihsaW5rLCAnY2xpY2snLCB0aGlzLl9yZWZvY3VzT25NYXAsIHRoaXMpO1xyXG5cclxuXHRcdHJldHVybiBsaW5rO1xyXG5cdH0sXHJcblxyXG5cdF91cGRhdGVEaXNhYmxlZDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIG1hcCA9IHRoaXMuX21hcCxcclxuXHRcdCAgICBjbGFzc05hbWUgPSAnbGVhZmxldC1kaXNhYmxlZCc7XHJcblxyXG5cdFx0TC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX3pvb21JbkJ1dHRvbiwgY2xhc3NOYW1lKTtcclxuXHRcdEwuRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl96b29tT3V0QnV0dG9uLCBjbGFzc05hbWUpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9kaXNhYmxlZCB8fCBtYXAuX3pvb20gPT09IG1hcC5nZXRNaW5ab29tKCkpIHtcclxuXHRcdFx0TC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX3pvb21PdXRCdXR0b24sIGNsYXNzTmFtZSk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5fZGlzYWJsZWQgfHwgbWFwLl96b29tID09PSBtYXAuZ2V0TWF4Wm9vbSgpKSB7XHJcblx0XHRcdEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl96b29tSW5CdXR0b24sIGNsYXNzTmFtZSk7XHJcblx0XHR9XHJcblx0fVxyXG59KTtcclxuXHJcbkwuTWFwLm1lcmdlT3B0aW9ucyh7XHJcblx0em9vbUNvbnRyb2w6IHRydWVcclxufSk7XHJcblxyXG5MLk1hcC5hZGRJbml0SG9vayhmdW5jdGlvbiAoKSB7XHJcblx0aWYgKHRoaXMub3B0aW9ucy56b29tQ29udHJvbCkge1xyXG5cdFx0dGhpcy56b29tQ29udHJvbCA9IG5ldyBMLkNvbnRyb2wuWm9vbSgpO1xyXG5cdFx0dGhpcy5hZGRDb250cm9sKHRoaXMuem9vbUNvbnRyb2wpO1xyXG5cdH1cclxufSk7XHJcblxyXG5MLmNvbnRyb2wuem9vbSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcblx0cmV0dXJuIG5ldyBMLkNvbnRyb2wuWm9vbShvcHRpb25zKTtcclxufTtcclxuXG5cblxuLypcclxuICogTC5Db250cm9sLkF0dHJpYnV0aW9uIGlzIHVzZWQgZm9yIGRpc3BsYXlpbmcgYXR0cmlidXRpb24gb24gdGhlIG1hcCAoYWRkZWQgYnkgZGVmYXVsdCkuXHJcbiAqL1xyXG5cclxuTC5Db250cm9sLkF0dHJpYnV0aW9uID0gTC5Db250cm9sLmV4dGVuZCh7XHJcblx0b3B0aW9uczoge1xyXG5cdFx0cG9zaXRpb246ICdib3R0b21yaWdodCcsXHJcblx0XHRwcmVmaXg6ICc8YSBocmVmPVwiaHR0cDovL2xlYWZsZXRqcy5jb21cIiB0aXRsZT1cIkEgSlMgbGlicmFyeSBmb3IgaW50ZXJhY3RpdmUgbWFwc1wiPkxlYWZsZXQ8L2E+J1xyXG5cdH0sXHJcblxyXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcblx0XHRMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XHJcblxyXG5cdFx0dGhpcy5fYXR0cmlidXRpb25zID0ge307XHJcblx0fSxcclxuXHJcblx0b25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcclxuXHRcdHRoaXMuX2NvbnRhaW5lciA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdsZWFmbGV0LWNvbnRyb2wtYXR0cmlidXRpb24nKTtcclxuXHRcdGlmIChMLkRvbUV2ZW50KSB7XHJcblx0XHRcdEwuRG9tRXZlbnQuZGlzYWJsZUNsaWNrUHJvcGFnYXRpb24odGhpcy5fY29udGFpbmVyKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBUT0RPIHVnbHksIHJlZmFjdG9yXHJcblx0XHRmb3IgKHZhciBpIGluIG1hcC5fbGF5ZXJzKSB7XHJcblx0XHRcdGlmIChtYXAuX2xheWVyc1tpXS5nZXRBdHRyaWJ1dGlvbikge1xyXG5cdFx0XHRcdHRoaXMuYWRkQXR0cmlidXRpb24obWFwLl9sYXllcnNbaV0uZ2V0QXR0cmlidXRpb24oKSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl91cGRhdGUoKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fY29udGFpbmVyO1xyXG5cdH0sXHJcblxyXG5cdHNldFByZWZpeDogZnVuY3Rpb24gKHByZWZpeCkge1xyXG5cdFx0dGhpcy5vcHRpb25zLnByZWZpeCA9IHByZWZpeDtcclxuXHRcdHRoaXMuX3VwZGF0ZSgpO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0YWRkQXR0cmlidXRpb246IGZ1bmN0aW9uICh0ZXh0KSB7XHJcblx0XHRpZiAoIXRleHQpIHsgcmV0dXJuIHRoaXM7IH1cclxuXHJcblx0XHRpZiAoIXRoaXMuX2F0dHJpYnV0aW9uc1t0ZXh0XSkge1xyXG5cdFx0XHR0aGlzLl9hdHRyaWJ1dGlvbnNbdGV4dF0gPSAwO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5fYXR0cmlidXRpb25zW3RleHRdKys7XHJcblxyXG5cdFx0dGhpcy5fdXBkYXRlKCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0cmVtb3ZlQXR0cmlidXRpb246IGZ1bmN0aW9uICh0ZXh0KSB7XHJcblx0XHRpZiAoIXRleHQpIHsgcmV0dXJuIHRoaXM7IH1cclxuXHJcblx0XHRpZiAodGhpcy5fYXR0cmlidXRpb25zW3RleHRdKSB7XHJcblx0XHRcdHRoaXMuX2F0dHJpYnV0aW9uc1t0ZXh0XS0tO1xyXG5cdFx0XHR0aGlzLl91cGRhdGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRfdXBkYXRlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoIXRoaXMuX21hcCkgeyByZXR1cm47IH1cclxuXHJcblx0XHR2YXIgYXR0cmlicyA9IFtdO1xyXG5cclxuXHRcdGZvciAodmFyIGkgaW4gdGhpcy5fYXR0cmlidXRpb25zKSB7XHJcblx0XHRcdGlmICh0aGlzLl9hdHRyaWJ1dGlvbnNbaV0pIHtcclxuXHRcdFx0XHRhdHRyaWJzLnB1c2goaSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR2YXIgcHJlZml4QW5kQXR0cmlicyA9IFtdO1xyXG5cclxuXHRcdGlmICh0aGlzLm9wdGlvbnMucHJlZml4KSB7XHJcblx0XHRcdHByZWZpeEFuZEF0dHJpYnMucHVzaCh0aGlzLm9wdGlvbnMucHJlZml4KTtcclxuXHRcdH1cclxuXHRcdGlmIChhdHRyaWJzLmxlbmd0aCkge1xyXG5cdFx0XHRwcmVmaXhBbmRBdHRyaWJzLnB1c2goYXR0cmlicy5qb2luKCcsICcpKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9jb250YWluZXIuaW5uZXJIVE1MID0gcHJlZml4QW5kQXR0cmlicy5qb2luKCcgfCAnKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuTC5NYXAubWVyZ2VPcHRpb25zKHtcclxuXHRhdHRyaWJ1dGlvbkNvbnRyb2w6IHRydWVcclxufSk7XHJcblxyXG5MLk1hcC5hZGRJbml0SG9vayhmdW5jdGlvbiAoKSB7XHJcblx0aWYgKHRoaXMub3B0aW9ucy5hdHRyaWJ1dGlvbkNvbnRyb2wpIHtcclxuXHRcdHRoaXMuYXR0cmlidXRpb25Db250cm9sID0gKG5ldyBMLkNvbnRyb2wuQXR0cmlidXRpb24oKSkuYWRkVG8odGhpcyk7XHJcblx0fVxyXG59KTtcclxuXHJcbkwuY29udHJvbC5hdHRyaWJ1dGlvbiA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcblx0cmV0dXJuIG5ldyBMLkNvbnRyb2wuQXR0cmlidXRpb24ob3B0aW9ucyk7XHJcbn07XHJcblxuXG5cbi8qXG4gKiBMLkNvbnRyb2wuU2NhbGUgaXMgdXNlZCBmb3IgZGlzcGxheWluZyBtZXRyaWMvaW1wZXJpYWwgc2NhbGUgb24gdGhlIG1hcC5cbiAqL1xuXG5MLkNvbnRyb2wuU2NhbGUgPSBMLkNvbnRyb2wuZXh0ZW5kKHtcblx0b3B0aW9uczoge1xuXHRcdHBvc2l0aW9uOiAnYm90dG9tbGVmdCcsXG5cdFx0bWF4V2lkdGg6IDEwMCxcblx0XHRtZXRyaWM6IHRydWUsXG5cdFx0aW1wZXJpYWw6IHRydWVcblx0XHQvLyB1cGRhdGVXaGVuSWRsZTogZmFsc2Vcblx0fSxcblxuXHRvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xuXHRcdHZhciBjbGFzc05hbWUgPSAnbGVhZmxldC1jb250cm9sLXNjYWxlJyxcblx0XHQgICAgY29udGFpbmVyID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgY2xhc3NOYW1lKSxcblx0XHQgICAgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblxuXHRcdHRoaXMuX2FkZFNjYWxlcyhvcHRpb25zLCBjbGFzc05hbWUgKyAnLWxpbmUnLCBjb250YWluZXIpO1xuXG5cdFx0bWFwLm9uKG9wdGlvbnMudXBkYXRlV2hlbklkbGUgPyAnbW92ZWVuZCcgOiAnbW92ZScsIHRoaXMuX3VwZGF0ZSwgdGhpcyk7XG5cdFx0bWFwLndoZW5SZWFkeSh0aGlzLl91cGRhdGUsIHRoaXMpO1xuXG5cdFx0cmV0dXJuIGNvbnRhaW5lcjtcblx0fSxcblxuXHRvblJlbW92ZTogZnVuY3Rpb24gKG1hcCkge1xuXHRcdG1hcC5vZmYodGhpcy5vcHRpb25zLnVwZGF0ZVdoZW5JZGxlID8gJ21vdmVlbmQnIDogJ21vdmUnLCB0aGlzLl91cGRhdGUsIHRoaXMpO1xuXHR9LFxuXG5cdF9hZGRTY2FsZXM6IGZ1bmN0aW9uIChvcHRpb25zLCBjbGFzc05hbWUsIGNvbnRhaW5lcikge1xuXHRcdGlmIChvcHRpb25zLm1ldHJpYykge1xuXHRcdFx0dGhpcy5fbVNjYWxlID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgY2xhc3NOYW1lLCBjb250YWluZXIpO1xuXHRcdH1cblx0XHRpZiAob3B0aW9ucy5pbXBlcmlhbCkge1xuXHRcdFx0dGhpcy5faVNjYWxlID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgY2xhc3NOYW1lLCBjb250YWluZXIpO1xuXHRcdH1cblx0fSxcblxuXHRfdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIG1hcCA9IHRoaXMuX21hcCxcblx0XHQgICAgeSA9IG1hcC5nZXRTaXplKCkueSAvIDI7XG5cblx0XHR2YXIgbWF4TWV0ZXJzID0gbWFwLmRpc3RhbmNlKFxuXHRcdFx0XHRtYXAuY29udGFpbmVyUG9pbnRUb0xhdExuZyhbMCwgeV0pLFxuXHRcdFx0XHRtYXAuY29udGFpbmVyUG9pbnRUb0xhdExuZyhbdGhpcy5vcHRpb25zLm1heFdpZHRoLCB5XSkpO1xuXG5cdFx0dGhpcy5fdXBkYXRlU2NhbGVzKG1heE1ldGVycyk7XG5cdH0sXG5cblx0X3VwZGF0ZVNjYWxlczogZnVuY3Rpb24gKG1heE1ldGVycykge1xuXHRcdGlmICh0aGlzLm9wdGlvbnMubWV0cmljICYmIG1heE1ldGVycykge1xuXHRcdFx0dGhpcy5fdXBkYXRlTWV0cmljKG1heE1ldGVycyk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLm9wdGlvbnMuaW1wZXJpYWwgJiYgbWF4TWV0ZXJzKSB7XG5cdFx0XHR0aGlzLl91cGRhdGVJbXBlcmlhbChtYXhNZXRlcnMpO1xuXHRcdH1cblx0fSxcblxuXHRfdXBkYXRlTWV0cmljOiBmdW5jdGlvbiAobWF4TWV0ZXJzKSB7XG5cdFx0dmFyIG1ldGVycyA9IHRoaXMuX2dldFJvdW5kTnVtKG1heE1ldGVycyksXG5cdFx0ICAgIGxhYmVsID0gbWV0ZXJzIDwgMTAwMCA/IG1ldGVycyArICcgbScgOiAobWV0ZXJzIC8gMTAwMCkgKyAnIGttJztcblxuXHRcdHRoaXMuX3VwZGF0ZVNjYWxlKHRoaXMuX21TY2FsZSwgbGFiZWwsIG1ldGVycyAvIG1heE1ldGVycyk7XG5cdH0sXG5cblx0X3VwZGF0ZUltcGVyaWFsOiBmdW5jdGlvbiAobWF4TWV0ZXJzKSB7XG5cdFx0dmFyIG1heEZlZXQgPSBtYXhNZXRlcnMgKiAzLjI4MDgzOTksXG5cdFx0ICAgIG1heE1pbGVzLCBtaWxlcywgZmVldDtcblxuXHRcdGlmIChtYXhGZWV0ID4gNTI4MCkge1xuXHRcdFx0bWF4TWlsZXMgPSBtYXhGZWV0IC8gNTI4MDtcblx0XHRcdG1pbGVzID0gdGhpcy5fZ2V0Um91bmROdW0obWF4TWlsZXMpO1xuXHRcdFx0dGhpcy5fdXBkYXRlU2NhbGUodGhpcy5faVNjYWxlLCBtaWxlcyArICcgbWknLCBtaWxlcyAvIG1heE1pbGVzKTtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHRmZWV0ID0gdGhpcy5fZ2V0Um91bmROdW0obWF4RmVldCk7XG5cdFx0XHR0aGlzLl91cGRhdGVTY2FsZSh0aGlzLl9pU2NhbGUsIGZlZXQgKyAnIGZ0JywgZmVldCAvIG1heEZlZXQpO1xuXHRcdH1cblx0fSxcblxuXHRfdXBkYXRlU2NhbGU6IGZ1bmN0aW9uIChzY2FsZSwgdGV4dCwgcmF0aW8pIHtcblx0XHRzY2FsZS5zdHlsZS53aWR0aCA9IE1hdGgucm91bmQodGhpcy5vcHRpb25zLm1heFdpZHRoICogcmF0aW8pICsgJ3B4Jztcblx0XHRzY2FsZS5pbm5lckhUTUwgPSB0ZXh0O1xuXHR9LFxuXG5cdF9nZXRSb3VuZE51bTogZnVuY3Rpb24gKG51bSkge1xuXHRcdHZhciBwb3cxMCA9IE1hdGgucG93KDEwLCAoTWF0aC5mbG9vcihudW0pICsgJycpLmxlbmd0aCAtIDEpLFxuXHRcdCAgICBkID0gbnVtIC8gcG93MTA7XG5cblx0XHRkID0gZCA+PSAxMCA/IDEwIDpcblx0XHQgICAgZCA+PSA1ID8gNSA6XG5cdFx0ICAgIGQgPj0gMyA/IDMgOlxuXHRcdCAgICBkID49IDIgPyAyIDogMTtcblxuXHRcdHJldHVybiBwb3cxMCAqIGQ7XG5cdH1cbn0pO1xuXG5MLmNvbnRyb2wuc2NhbGUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXHRyZXR1cm4gbmV3IEwuQ29udHJvbC5TY2FsZShvcHRpb25zKTtcbn07XG5cblxuXG4vKlxyXG4gKiBMLkNvbnRyb2wuTGF5ZXJzIGlzIGEgY29udHJvbCB0byBhbGxvdyB1c2VycyB0byBzd2l0Y2ggYmV0d2VlbiBkaWZmZXJlbnQgbGF5ZXJzIG9uIHRoZSBtYXAuXHJcbiAqL1xyXG5cclxuTC5Db250cm9sLkxheWVycyA9IEwuQ29udHJvbC5leHRlbmQoe1xyXG5cdG9wdGlvbnM6IHtcclxuXHRcdGNvbGxhcHNlZDogdHJ1ZSxcclxuXHRcdHBvc2l0aW9uOiAndG9wcmlnaHQnLFxyXG5cdFx0YXV0b1pJbmRleDogdHJ1ZSxcclxuXHRcdGhpZGVTaW5nbGVCYXNlOiBmYWxzZVxyXG5cdH0sXHJcblxyXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIChiYXNlTGF5ZXJzLCBvdmVybGF5cywgb3B0aW9ucykge1xyXG5cdFx0TC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xyXG5cclxuXHRcdHRoaXMuX2xheWVycyA9IHt9O1xyXG5cdFx0dGhpcy5fbGFzdFpJbmRleCA9IDA7XHJcblx0XHR0aGlzLl9oYW5kbGluZ0NsaWNrID0gZmFsc2U7XHJcblxyXG5cdFx0Zm9yICh2YXIgaSBpbiBiYXNlTGF5ZXJzKSB7XHJcblx0XHRcdHRoaXMuX2FkZExheWVyKGJhc2VMYXllcnNbaV0sIGkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAoaSBpbiBvdmVybGF5cykge1xyXG5cdFx0XHR0aGlzLl9hZGRMYXllcihvdmVybGF5c1tpXSwgaSwgdHJ1ZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0b25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcclxuXHRcdHRoaXMuX2luaXRMYXlvdXQoKTtcclxuXHRcdHRoaXMuX3VwZGF0ZSgpO1xyXG5cclxuXHRcdHRoaXMuX21hcCA9IG1hcDtcclxuXHRcdG1hcC5vbignem9vbWVuZCcsIHRoaXMuX2NoZWNrRGlzYWJsZWRMYXllcnMsIHRoaXMpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9jb250YWluZXI7XHJcblx0fSxcclxuXHJcblx0b25SZW1vdmU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMuX21hcC5vZmYoJ3pvb21lbmQnLCB0aGlzLl9jaGVja0Rpc2FibGVkTGF5ZXJzLCB0aGlzKTtcclxuXHR9LFxyXG5cclxuXHRhZGRCYXNlTGF5ZXI6IGZ1bmN0aW9uIChsYXllciwgbmFtZSkge1xyXG5cdFx0dGhpcy5fYWRkTGF5ZXIobGF5ZXIsIG5hbWUpO1xyXG5cdFx0cmV0dXJuIHRoaXMuX3VwZGF0ZSgpO1xyXG5cdH0sXHJcblxyXG5cdGFkZE92ZXJsYXk6IGZ1bmN0aW9uIChsYXllciwgbmFtZSkge1xyXG5cdFx0dGhpcy5fYWRkTGF5ZXIobGF5ZXIsIG5hbWUsIHRydWUpO1xyXG5cdFx0cmV0dXJuIHRoaXMuX3VwZGF0ZSgpO1xyXG5cdH0sXHJcblxyXG5cdHJlbW92ZUxheWVyOiBmdW5jdGlvbiAobGF5ZXIpIHtcclxuXHRcdGxheWVyLm9mZignYWRkIHJlbW92ZScsIHRoaXMuX29uTGF5ZXJDaGFuZ2UsIHRoaXMpO1xyXG5cclxuXHRcdGRlbGV0ZSB0aGlzLl9sYXllcnNbTC5zdGFtcChsYXllcildO1xyXG5cdFx0cmV0dXJuIHRoaXMuX3VwZGF0ZSgpO1xyXG5cdH0sXHJcblxyXG5cdF9pbml0TGF5b3V0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgY2xhc3NOYW1lID0gJ2xlYWZsZXQtY29udHJvbC1sYXllcnMnLFxyXG5cdFx0ICAgIGNvbnRhaW5lciA9IHRoaXMuX2NvbnRhaW5lciA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsIGNsYXNzTmFtZSk7XHJcblxyXG5cdFx0Ly8gbWFrZXMgdGhpcyB3b3JrIG9uIElFIHRvdWNoIGRldmljZXMgYnkgc3RvcHBpbmcgaXQgZnJvbSBmaXJpbmcgYSBtb3VzZW91dCBldmVudCB3aGVuIHRoZSB0b3VjaCBpcyByZWxlYXNlZFxyXG5cdFx0Y29udGFpbmVyLnNldEF0dHJpYnV0ZSgnYXJpYS1oYXNwb3B1cCcsIHRydWUpO1xyXG5cclxuXHRcdEwuRG9tRXZlbnQuZGlzYWJsZUNsaWNrUHJvcGFnYXRpb24oY29udGFpbmVyKTtcclxuXHRcdGlmICghTC5Ccm93c2VyLnRvdWNoKSB7XHJcblx0XHRcdEwuRG9tRXZlbnQuZGlzYWJsZVNjcm9sbFByb3BhZ2F0aW9uKGNvbnRhaW5lcik7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGZvcm0gPSB0aGlzLl9mb3JtID0gTC5Eb21VdGlsLmNyZWF0ZSgnZm9ybScsIGNsYXNzTmFtZSArICctbGlzdCcpO1xyXG5cclxuXHRcdGlmICh0aGlzLm9wdGlvbnMuY29sbGFwc2VkKSB7XHJcblx0XHRcdGlmICghTC5Ccm93c2VyLmFuZHJvaWQpIHtcclxuXHRcdFx0XHRMLkRvbUV2ZW50Lm9uKGNvbnRhaW5lciwge1xyXG5cdFx0XHRcdFx0bW91c2VlbnRlcjogdGhpcy5fZXhwYW5kLFxyXG5cdFx0XHRcdFx0bW91c2VsZWF2ZTogdGhpcy5fY29sbGFwc2VcclxuXHRcdFx0XHR9LCB0aGlzKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGxpbmsgPSB0aGlzLl9sYXllcnNMaW5rID0gTC5Eb21VdGlsLmNyZWF0ZSgnYScsIGNsYXNzTmFtZSArICctdG9nZ2xlJywgY29udGFpbmVyKTtcclxuXHRcdFx0bGluay5ocmVmID0gJyMnO1xyXG5cdFx0XHRsaW5rLnRpdGxlID0gJ0xheWVycyc7XHJcblxyXG5cdFx0XHRpZiAoTC5Ccm93c2VyLnRvdWNoKSB7XHJcblx0XHRcdFx0TC5Eb21FdmVudFxyXG5cdFx0XHRcdCAgICAub24obGluaywgJ2NsaWNrJywgTC5Eb21FdmVudC5zdG9wKVxyXG5cdFx0XHRcdCAgICAub24obGluaywgJ2NsaWNrJywgdGhpcy5fZXhwYW5kLCB0aGlzKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRMLkRvbUV2ZW50Lm9uKGxpbmssICdmb2N1cycsIHRoaXMuX2V4cGFuZCwgdGhpcyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIHdvcmsgYXJvdW5kIGZvciBGaXJlZm94IEFuZHJvaWQgaXNzdWUgaHR0cHM6Ly9naXRodWIuY29tL0xlYWZsZXQvTGVhZmxldC9pc3N1ZXMvMjAzM1xyXG5cdFx0XHRMLkRvbUV2ZW50Lm9uKGZvcm0sICdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KEwuYmluZCh0aGlzLl9vbklucHV0Q2xpY2ssIHRoaXMpLCAwKTtcclxuXHRcdFx0fSwgdGhpcyk7XHJcblxyXG5cdFx0XHR0aGlzLl9tYXAub24oJ2NsaWNrJywgdGhpcy5fY29sbGFwc2UsIHRoaXMpO1xyXG5cdFx0XHQvLyBUT0RPIGtleWJvYXJkIGFjY2Vzc2liaWxpdHlcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuX2V4cGFuZCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX2Jhc2VMYXllcnNMaXN0ID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgY2xhc3NOYW1lICsgJy1iYXNlJywgZm9ybSk7XHJcblx0XHR0aGlzLl9zZXBhcmF0b3IgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCBjbGFzc05hbWUgKyAnLXNlcGFyYXRvcicsIGZvcm0pO1xyXG5cdFx0dGhpcy5fb3ZlcmxheXNMaXN0ID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgY2xhc3NOYW1lICsgJy1vdmVybGF5cycsIGZvcm0pO1xyXG5cclxuXHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtKTtcclxuXHR9LFxyXG5cclxuXHRfYWRkTGF5ZXI6IGZ1bmN0aW9uIChsYXllciwgbmFtZSwgb3ZlcmxheSkge1xyXG5cdFx0bGF5ZXIub24oJ2FkZCByZW1vdmUnLCB0aGlzLl9vbkxheWVyQ2hhbmdlLCB0aGlzKTtcclxuXHJcblx0XHR2YXIgaWQgPSBMLnN0YW1wKGxheWVyKTtcclxuXHJcblx0XHR0aGlzLl9sYXllcnNbaWRdID0ge1xyXG5cdFx0XHRsYXllcjogbGF5ZXIsXHJcblx0XHRcdG5hbWU6IG5hbWUsXHJcblx0XHRcdG92ZXJsYXk6IG92ZXJsYXlcclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5hdXRvWkluZGV4ICYmIGxheWVyLnNldFpJbmRleCkge1xyXG5cdFx0XHR0aGlzLl9sYXN0WkluZGV4Kys7XHJcblx0XHRcdGxheWVyLnNldFpJbmRleCh0aGlzLl9sYXN0WkluZGV4KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfdXBkYXRlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoIXRoaXMuX2NvbnRhaW5lcikgeyByZXR1cm4gdGhpczsgfVxyXG5cclxuXHRcdEwuRG9tVXRpbC5lbXB0eSh0aGlzLl9iYXNlTGF5ZXJzTGlzdCk7XHJcblx0XHRMLkRvbVV0aWwuZW1wdHkodGhpcy5fb3ZlcmxheXNMaXN0KTtcclxuXHJcblx0XHR2YXIgYmFzZUxheWVyc1ByZXNlbnQsIG92ZXJsYXlzUHJlc2VudCwgaSwgb2JqLCBiYXNlTGF5ZXJzQ291bnQgPSAwO1xyXG5cclxuXHRcdGZvciAoaSBpbiB0aGlzLl9sYXllcnMpIHtcclxuXHRcdFx0b2JqID0gdGhpcy5fbGF5ZXJzW2ldO1xyXG5cdFx0XHR0aGlzLl9hZGRJdGVtKG9iaik7XHJcblx0XHRcdG92ZXJsYXlzUHJlc2VudCA9IG92ZXJsYXlzUHJlc2VudCB8fCBvYmoub3ZlcmxheTtcclxuXHRcdFx0YmFzZUxheWVyc1ByZXNlbnQgPSBiYXNlTGF5ZXJzUHJlc2VudCB8fCAhb2JqLm92ZXJsYXk7XHJcblx0XHRcdGJhc2VMYXllcnNDb3VudCArPSAhb2JqLm92ZXJsYXkgPyAxIDogMDtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBIaWRlIGJhc2UgbGF5ZXJzIHNlY3Rpb24gaWYgdGhlcmUncyBvbmx5IG9uZSBsYXllci5cclxuXHRcdGlmICh0aGlzLm9wdGlvbnMuaGlkZVNpbmdsZUJhc2UpIHtcclxuXHRcdFx0YmFzZUxheWVyc1ByZXNlbnQgPSBiYXNlTGF5ZXJzUHJlc2VudCAmJiBiYXNlTGF5ZXJzQ291bnQgPiAxO1xyXG5cdFx0XHR0aGlzLl9iYXNlTGF5ZXJzTGlzdC5zdHlsZS5kaXNwbGF5ID0gYmFzZUxheWVyc1ByZXNlbnQgPyAnJyA6ICdub25lJztcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9zZXBhcmF0b3Iuc3R5bGUuZGlzcGxheSA9IG92ZXJsYXlzUHJlc2VudCAmJiBiYXNlTGF5ZXJzUHJlc2VudCA/ICcnIDogJ25vbmUnO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdF9vbkxheWVyQ2hhbmdlOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0aWYgKCF0aGlzLl9oYW5kbGluZ0NsaWNrKSB7XHJcblx0XHRcdHRoaXMuX3VwZGF0ZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBvYmogPSB0aGlzLl9sYXllcnNbTC5zdGFtcChlLnRhcmdldCldO1xyXG5cclxuXHRcdHZhciB0eXBlID0gb2JqLm92ZXJsYXkgP1xyXG5cdFx0XHQoZS50eXBlID09PSAnYWRkJyA/ICdvdmVybGF5YWRkJyA6ICdvdmVybGF5cmVtb3ZlJykgOlxyXG5cdFx0XHQoZS50eXBlID09PSAnYWRkJyA/ICdiYXNlbGF5ZXJjaGFuZ2UnIDogbnVsbCk7XHJcblxyXG5cdFx0aWYgKHR5cGUpIHtcclxuXHRcdFx0dGhpcy5fbWFwLmZpcmUodHlwZSwgb2JqKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvLyBJRTcgYnVncyBvdXQgaWYgeW91IGNyZWF0ZSBhIHJhZGlvIGR5bmFtaWNhbGx5LCBzbyB5b3UgaGF2ZSB0byBkbyBpdCB0aGlzIGhhY2t5IHdheSAoc2VlIGh0dHA6Ly9iaXQubHkvUHFZTEJlKVxyXG5cdF9jcmVhdGVSYWRpb0VsZW1lbnQ6IGZ1bmN0aW9uIChuYW1lLCBjaGVja2VkKSB7XHJcblxyXG5cdFx0dmFyIHJhZGlvSHRtbCA9ICc8aW5wdXQgdHlwZT1cInJhZGlvXCIgY2xhc3M9XCJsZWFmbGV0LWNvbnRyb2wtbGF5ZXJzLXNlbGVjdG9yXCIgbmFtZT1cIicgK1xyXG5cdFx0XHRcdG5hbWUgKyAnXCInICsgKGNoZWNrZWQgPyAnIGNoZWNrZWQ9XCJjaGVja2VkXCInIDogJycpICsgJy8+JztcclxuXHJcblx0XHR2YXIgcmFkaW9GcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdFx0cmFkaW9GcmFnbWVudC5pbm5lckhUTUwgPSByYWRpb0h0bWw7XHJcblxyXG5cdFx0cmV0dXJuIHJhZGlvRnJhZ21lbnQuZmlyc3RDaGlsZDtcclxuXHR9LFxyXG5cclxuXHRfYWRkSXRlbTogZnVuY3Rpb24gKG9iaikge1xyXG5cdFx0dmFyIGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKSxcclxuXHRcdCAgICBjaGVja2VkID0gdGhpcy5fbWFwLmhhc0xheWVyKG9iai5sYXllciksXHJcblx0XHQgICAgaW5wdXQ7XHJcblxyXG5cdFx0aWYgKG9iai5vdmVybGF5KSB7XHJcblx0XHRcdGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuXHRcdFx0aW5wdXQudHlwZSA9ICdjaGVja2JveCc7XHJcblx0XHRcdGlucHV0LmNsYXNzTmFtZSA9ICdsZWFmbGV0LWNvbnRyb2wtbGF5ZXJzLXNlbGVjdG9yJztcclxuXHRcdFx0aW5wdXQuZGVmYXVsdENoZWNrZWQgPSBjaGVja2VkO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aW5wdXQgPSB0aGlzLl9jcmVhdGVSYWRpb0VsZW1lbnQoJ2xlYWZsZXQtYmFzZS1sYXllcnMnLCBjaGVja2VkKTtcclxuXHRcdH1cclxuXHJcblx0XHRpbnB1dC5sYXllcklkID0gTC5zdGFtcChvYmoubGF5ZXIpO1xyXG5cclxuXHRcdEwuRG9tRXZlbnQub24oaW5wdXQsICdjbGljaycsIHRoaXMuX29uSW5wdXRDbGljaywgdGhpcyk7XHJcblxyXG5cdFx0dmFyIG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHRuYW1lLmlubmVySFRNTCA9ICcgJyArIG9iai5uYW1lO1xyXG5cclxuXHRcdC8vIEhlbHBzIGZyb20gcHJldmVudGluZyBsYXllciBjb250cm9sIGZsaWNrZXIgd2hlbiBjaGVja2JveGVzIGFyZSBkaXNhYmxlZFxyXG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL0xlYWZsZXQvTGVhZmxldC9pc3N1ZXMvMjc3MVxyXG5cdFx0dmFyIGhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuXHRcdGxhYmVsLmFwcGVuZENoaWxkKGhvbGRlcik7XHJcblx0XHRob2xkZXIuYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG5cdFx0aG9sZGVyLmFwcGVuZENoaWxkKG5hbWUpO1xyXG5cclxuXHRcdHZhciBjb250YWluZXIgPSBvYmoub3ZlcmxheSA/IHRoaXMuX292ZXJsYXlzTGlzdCA6IHRoaXMuX2Jhc2VMYXllcnNMaXN0O1xyXG5cdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGxhYmVsKTtcclxuXHJcblx0XHR0aGlzLl9jaGVja0Rpc2FibGVkTGF5ZXJzKCk7XHJcblx0XHRyZXR1cm4gbGFiZWw7XHJcblx0fSxcclxuXHJcblx0X29uSW5wdXRDbGljazogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGlucHV0cyA9IHRoaXMuX2Zvcm0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JyksXHJcblx0XHQgICAgaW5wdXQsIGxheWVyLCBoYXNMYXllcjtcclxuXHRcdHZhciBhZGRlZExheWVycyA9IFtdLFxyXG5cdFx0ICAgIHJlbW92ZWRMYXllcnMgPSBbXTtcclxuXHJcblx0XHR0aGlzLl9oYW5kbGluZ0NsaWNrID0gdHJ1ZTtcclxuXHJcblx0XHRmb3IgKHZhciBpID0gaW5wdXRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcblx0XHRcdGlucHV0ID0gaW5wdXRzW2ldO1xyXG5cdFx0XHRsYXllciA9IHRoaXMuX2xheWVyc1tpbnB1dC5sYXllcklkXS5sYXllcjtcclxuXHRcdFx0aGFzTGF5ZXIgPSB0aGlzLl9tYXAuaGFzTGF5ZXIobGF5ZXIpO1xyXG5cclxuXHRcdFx0aWYgKGlucHV0LmNoZWNrZWQgJiYgIWhhc0xheWVyKSB7XHJcblx0XHRcdFx0YWRkZWRMYXllcnMucHVzaChsYXllcik7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKCFpbnB1dC5jaGVja2VkICYmIGhhc0xheWVyKSB7XHJcblx0XHRcdFx0cmVtb3ZlZExheWVycy5wdXNoKGxheWVyKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEJ1Z2ZpeCBpc3N1ZSAyMzE4OiBTaG91bGQgcmVtb3ZlIGFsbCBvbGQgbGF5ZXJzIGJlZm9yZSByZWFkZGluZyBuZXcgb25lc1xyXG5cdFx0Zm9yIChpID0gMDsgaSA8IHJlbW92ZWRMYXllcnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dGhpcy5fbWFwLnJlbW92ZUxheWVyKHJlbW92ZWRMYXllcnNbaV0pO1xyXG5cdFx0fVxyXG5cdFx0Zm9yIChpID0gMDsgaSA8IGFkZGVkTGF5ZXJzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHRoaXMuX21hcC5hZGRMYXllcihhZGRlZExheWVyc1tpXSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5faGFuZGxpbmdDbGljayA9IGZhbHNlO1xyXG5cclxuXHRcdHRoaXMuX3JlZm9jdXNPbk1hcCgpO1xyXG5cdH0sXHJcblxyXG5cdF9leHBhbmQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9jb250YWluZXIsICdsZWFmbGV0LWNvbnRyb2wtbGF5ZXJzLWV4cGFuZGVkJyk7XHJcblx0XHR0aGlzLl9mb3JtLnN0eWxlLmhlaWdodCA9IG51bGw7XHJcblx0XHR2YXIgYWNjZXB0YWJsZUhlaWdodCA9IHRoaXMuX21hcC5fc2l6ZS55IC0gKHRoaXMuX2NvbnRhaW5lci5vZmZzZXRUb3AgKyA1MCk7XHJcblx0XHRpZiAoYWNjZXB0YWJsZUhlaWdodCA8IHRoaXMuX2Zvcm0uY2xpZW50SGVpZ2h0KSB7XHJcblx0XHRcdEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9mb3JtLCAnbGVhZmxldC1jb250cm9sLWxheWVycy1zY3JvbGxiYXInKTtcclxuXHRcdFx0dGhpcy5fZm9ybS5zdHlsZS5oZWlnaHQgPSBhY2NlcHRhYmxlSGVpZ2h0ICsgJ3B4JztcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdEwuRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl9mb3JtLCAnbGVhZmxldC1jb250cm9sLWxheWVycy1zY3JvbGxiYXInKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuX2NoZWNrRGlzYWJsZWRMYXllcnMoKTtcclxuXHR9LFxyXG5cclxuXHRfY29sbGFwc2U6IGZ1bmN0aW9uICgpIHtcclxuXHRcdEwuRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl9jb250YWluZXIsICdsZWFmbGV0LWNvbnRyb2wtbGF5ZXJzLWV4cGFuZGVkJyk7XHJcblx0fSxcclxuXHJcblx0X2NoZWNrRGlzYWJsZWRMYXllcnM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBpbnB1dHMgPSB0aGlzLl9mb3JtLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpLFxyXG5cdFx0ICAgIGlucHV0LFxyXG5cdFx0ICAgIGxheWVyLFxyXG5cdFx0ICAgIHpvb20gPSB0aGlzLl9tYXAuZ2V0Wm9vbSgpO1xyXG5cclxuXHRcdGZvciAodmFyIGkgPSBpbnB1dHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuXHRcdFx0aW5wdXQgPSBpbnB1dHNbaV07XHJcblx0XHRcdGxheWVyID0gdGhpcy5fbGF5ZXJzW2lucHV0LmxheWVySWRdLmxheWVyO1xyXG5cdFx0XHRpbnB1dC5kaXNhYmxlZCA9IChsYXllci5vcHRpb25zLm1pblpvb20gIT09IHVuZGVmaW5lZCAmJiB6b29tIDwgbGF5ZXIub3B0aW9ucy5taW5ab29tKSB8fFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgIChsYXllci5vcHRpb25zLm1heFpvb20gIT09IHVuZGVmaW5lZCAmJiB6b29tID4gbGF5ZXIub3B0aW9ucy5tYXhab29tKTtcclxuXHJcblx0XHR9XHJcblx0fVxyXG59KTtcclxuXHJcbkwuY29udHJvbC5sYXllcnMgPSBmdW5jdGlvbiAoYmFzZUxheWVycywgb3ZlcmxheXMsIG9wdGlvbnMpIHtcclxuXHRyZXR1cm4gbmV3IEwuQ29udHJvbC5MYXllcnMoYmFzZUxheWVycywgb3ZlcmxheXMsIG9wdGlvbnMpO1xyXG59O1xyXG5cblxuXG4vKlxuICogTC5Qb3NBbmltYXRpb24gcG93ZXJzIExlYWZsZXQgcGFuIGFuaW1hdGlvbnMgaW50ZXJuYWxseS5cbiAqL1xuXG5MLlBvc0FuaW1hdGlvbiA9IEwuRXZlbnRlZC5leHRlbmQoe1xuXG5cdHJ1bjogZnVuY3Rpb24gKGVsLCBuZXdQb3MsIGR1cmF0aW9uLCBlYXNlTGluZWFyaXR5KSB7IC8vIChIVE1MRWxlbWVudCwgUG9pbnRbLCBOdW1iZXIsIE51bWJlcl0pXG5cdFx0dGhpcy5zdG9wKCk7XG5cblx0XHR0aGlzLl9lbCA9IGVsO1xuXHRcdHRoaXMuX2luUHJvZ3Jlc3MgPSB0cnVlO1xuXHRcdHRoaXMuX2R1cmF0aW9uID0gZHVyYXRpb24gfHwgMC4yNTtcblx0XHR0aGlzLl9lYXNlT3V0UG93ZXIgPSAxIC8gTWF0aC5tYXgoZWFzZUxpbmVhcml0eSB8fCAwLjUsIDAuMik7XG5cblx0XHR0aGlzLl9zdGFydFBvcyA9IEwuRG9tVXRpbC5nZXRQb3NpdGlvbihlbCk7XG5cdFx0dGhpcy5fb2Zmc2V0ID0gbmV3UG9zLnN1YnRyYWN0KHRoaXMuX3N0YXJ0UG9zKTtcblx0XHR0aGlzLl9zdGFydFRpbWUgPSArbmV3IERhdGUoKTtcblxuXHRcdHRoaXMuZmlyZSgnc3RhcnQnKTtcblxuXHRcdHRoaXMuX2FuaW1hdGUoKTtcblx0fSxcblxuXHRzdG9wOiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKCF0aGlzLl9pblByb2dyZXNzKSB7IHJldHVybjsgfVxuXG5cdFx0dGhpcy5fc3RlcCh0cnVlKTtcblx0XHR0aGlzLl9jb21wbGV0ZSgpO1xuXHR9LFxuXG5cdF9hbmltYXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gYW5pbWF0aW9uIGxvb3Bcblx0XHR0aGlzLl9hbmltSWQgPSBMLlV0aWwucmVxdWVzdEFuaW1GcmFtZSh0aGlzLl9hbmltYXRlLCB0aGlzKTtcblx0XHR0aGlzLl9zdGVwKCk7XG5cdH0sXG5cblx0X3N0ZXA6IGZ1bmN0aW9uIChyb3VuZCkge1xuXHRcdHZhciBlbGFwc2VkID0gKCtuZXcgRGF0ZSgpKSAtIHRoaXMuX3N0YXJ0VGltZSxcblx0XHQgICAgZHVyYXRpb24gPSB0aGlzLl9kdXJhdGlvbiAqIDEwMDA7XG5cblx0XHRpZiAoZWxhcHNlZCA8IGR1cmF0aW9uKSB7XG5cdFx0XHR0aGlzLl9ydW5GcmFtZSh0aGlzLl9lYXNlT3V0KGVsYXBzZWQgLyBkdXJhdGlvbiksIHJvdW5kKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fcnVuRnJhbWUoMSk7XG5cdFx0XHR0aGlzLl9jb21wbGV0ZSgpO1xuXHRcdH1cblx0fSxcblxuXHRfcnVuRnJhbWU6IGZ1bmN0aW9uIChwcm9ncmVzcywgcm91bmQpIHtcblx0XHR2YXIgcG9zID0gdGhpcy5fc3RhcnRQb3MuYWRkKHRoaXMuX29mZnNldC5tdWx0aXBseUJ5KHByb2dyZXNzKSk7XG5cdFx0aWYgKHJvdW5kKSB7XG5cdFx0XHRwb3MuX3JvdW5kKCk7XG5cdFx0fVxuXHRcdEwuRG9tVXRpbC5zZXRQb3NpdGlvbih0aGlzLl9lbCwgcG9zKTtcblxuXHRcdHRoaXMuZmlyZSgnc3RlcCcpO1xuXHR9LFxuXG5cdF9jb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuXHRcdEwuVXRpbC5jYW5jZWxBbmltRnJhbWUodGhpcy5fYW5pbUlkKTtcblxuXHRcdHRoaXMuX2luUHJvZ3Jlc3MgPSBmYWxzZTtcblx0XHR0aGlzLmZpcmUoJ2VuZCcpO1xuXHR9LFxuXG5cdF9lYXNlT3V0OiBmdW5jdGlvbiAodCkge1xuXHRcdHJldHVybiAxIC0gTWF0aC5wb3coMSAtIHQsIHRoaXMuX2Vhc2VPdXRQb3dlcik7XG5cdH1cbn0pO1xuXG5cblxuLypcbiAqIEV4dGVuZHMgTC5NYXAgdG8gaGFuZGxlIHBhbm5pbmcgYW5pbWF0aW9ucy5cbiAqL1xuXG5MLk1hcC5pbmNsdWRlKHtcblxuXHRzZXRWaWV3OiBmdW5jdGlvbiAoY2VudGVyLCB6b29tLCBvcHRpb25zKSB7XG5cblx0XHR6b29tID0gem9vbSA9PT0gdW5kZWZpbmVkID8gdGhpcy5fem9vbSA6IHRoaXMuX2xpbWl0Wm9vbSh6b29tKTtcblx0XHRjZW50ZXIgPSB0aGlzLl9saW1pdENlbnRlcihMLmxhdExuZyhjZW50ZXIpLCB6b29tLCB0aGlzLm9wdGlvbnMubWF4Qm91bmRzKTtcblx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRcdHRoaXMuc3RvcCgpO1xuXG5cdFx0aWYgKHRoaXMuX2xvYWRlZCAmJiAhb3B0aW9ucy5yZXNldCAmJiBvcHRpb25zICE9PSB0cnVlKSB7XG5cblx0XHRcdGlmIChvcHRpb25zLmFuaW1hdGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRvcHRpb25zLnpvb20gPSBMLmV4dGVuZCh7YW5pbWF0ZTogb3B0aW9ucy5hbmltYXRlfSwgb3B0aW9ucy56b29tKTtcblx0XHRcdFx0b3B0aW9ucy5wYW4gPSBMLmV4dGVuZCh7YW5pbWF0ZTogb3B0aW9ucy5hbmltYXRlLCBkdXJhdGlvbjogb3B0aW9ucy5kdXJhdGlvbn0sIG9wdGlvbnMucGFuKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gdHJ5IGFuaW1hdGluZyBwYW4gb3Igem9vbVxuXHRcdFx0dmFyIG1vdmVkID0gKHRoaXMuX3pvb20gIT09IHpvb20pID9cblx0XHRcdFx0dGhpcy5fdHJ5QW5pbWF0ZWRab29tICYmIHRoaXMuX3RyeUFuaW1hdGVkWm9vbShjZW50ZXIsIHpvb20sIG9wdGlvbnMuem9vbSkgOlxuXHRcdFx0XHR0aGlzLl90cnlBbmltYXRlZFBhbihjZW50ZXIsIG9wdGlvbnMucGFuKTtcblxuXHRcdFx0aWYgKG1vdmVkKSB7XG5cdFx0XHRcdC8vIHByZXZlbnQgcmVzaXplIGhhbmRsZXIgY2FsbCwgdGhlIHZpZXcgd2lsbCByZWZyZXNoIGFmdGVyIGFuaW1hdGlvbiBhbnl3YXlcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMuX3NpemVUaW1lcik7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIGFuaW1hdGlvbiBkaWRuJ3Qgc3RhcnQsIGp1c3QgcmVzZXQgdGhlIG1hcCB2aWV3XG5cdFx0dGhpcy5fcmVzZXRWaWV3KGNlbnRlciwgem9vbSk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRwYW5CeTogZnVuY3Rpb24gKG9mZnNldCwgb3B0aW9ucykge1xuXHRcdG9mZnNldCA9IEwucG9pbnQob2Zmc2V0KS5yb3VuZCgpO1xuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdFx0aWYgKCFvZmZzZXQueCAmJiAhb2Zmc2V0LnkpIHtcblx0XHRcdHJldHVybiB0aGlzLmZpcmUoJ21vdmVlbmQnKTtcblx0XHR9XG5cdFx0Ly8gSWYgd2UgcGFuIHRvbyBmYXIsIENocm9tZSBnZXRzIGlzc3VlcyB3aXRoIHRpbGVzXG5cdFx0Ly8gYW5kIG1ha2VzIHRoZW0gZGlzYXBwZWFyIG9yIGFwcGVhciBpbiB0aGUgd3JvbmcgcGxhY2UgKHNsaWdodGx5IG9mZnNldCkgIzI2MDJcblx0XHRpZiAob3B0aW9ucy5hbmltYXRlICE9PSB0cnVlICYmICF0aGlzLmdldFNpemUoKS5jb250YWlucyhvZmZzZXQpKSB7XG5cdFx0XHR0aGlzLl9yZXNldFZpZXcodGhpcy51bnByb2plY3QodGhpcy5wcm9qZWN0KHRoaXMuZ2V0Q2VudGVyKCkpLmFkZChvZmZzZXQpKSwgdGhpcy5nZXRab29tKCkpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLl9wYW5BbmltKSB7XG5cdFx0XHR0aGlzLl9wYW5BbmltID0gbmV3IEwuUG9zQW5pbWF0aW9uKCk7XG5cblx0XHRcdHRoaXMuX3BhbkFuaW0ub24oe1xuXHRcdFx0XHQnc3RlcCc6IHRoaXMuX29uUGFuVHJhbnNpdGlvblN0ZXAsXG5cdFx0XHRcdCdlbmQnOiB0aGlzLl9vblBhblRyYW5zaXRpb25FbmRcblx0XHRcdH0sIHRoaXMpO1xuXHRcdH1cblxuXHRcdC8vIGRvbid0IGZpcmUgbW92ZXN0YXJ0IGlmIGFuaW1hdGluZyBpbmVydGlhXG5cdFx0aWYgKCFvcHRpb25zLm5vTW92ZVN0YXJ0KSB7XG5cdFx0XHR0aGlzLmZpcmUoJ21vdmVzdGFydCcpO1xuXHRcdH1cblxuXHRcdC8vIGFuaW1hdGUgcGFuIHVubGVzcyBhbmltYXRlOiBmYWxzZSBzcGVjaWZpZWRcblx0XHRpZiAob3B0aW9ucy5hbmltYXRlICE9PSBmYWxzZSkge1xuXHRcdFx0TC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX21hcFBhbmUsICdsZWFmbGV0LXBhbi1hbmltJyk7XG5cblx0XHRcdHZhciBuZXdQb3MgPSB0aGlzLl9nZXRNYXBQYW5lUG9zKCkuc3VidHJhY3Qob2Zmc2V0KTtcblx0XHRcdHRoaXMuX3BhbkFuaW0ucnVuKHRoaXMuX21hcFBhbmUsIG5ld1Bvcywgb3B0aW9ucy5kdXJhdGlvbiB8fCAwLjI1LCBvcHRpb25zLmVhc2VMaW5lYXJpdHkpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9yYXdQYW5CeShvZmZzZXQpO1xuXHRcdFx0dGhpcy5maXJlKCdtb3ZlJykuZmlyZSgnbW92ZWVuZCcpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdF9vblBhblRyYW5zaXRpb25TdGVwOiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5maXJlKCdtb3ZlJyk7XG5cdH0sXG5cblx0X29uUGFuVHJhbnNpdGlvbkVuZDogZnVuY3Rpb24gKCkge1xuXHRcdEwuRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl9tYXBQYW5lLCAnbGVhZmxldC1wYW4tYW5pbScpO1xuXHRcdHRoaXMuZmlyZSgnbW92ZWVuZCcpO1xuXHR9LFxuXG5cdF90cnlBbmltYXRlZFBhbjogZnVuY3Rpb24gKGNlbnRlciwgb3B0aW9ucykge1xuXHRcdC8vIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgbmV3IGFuZCBjdXJyZW50IGNlbnRlcnMgaW4gcGl4ZWxzXG5cdFx0dmFyIG9mZnNldCA9IHRoaXMuX2dldENlbnRlck9mZnNldChjZW50ZXIpLl9mbG9vcigpO1xuXG5cdFx0Ly8gZG9uJ3QgYW5pbWF0ZSB0b28gZmFyIHVubGVzcyBhbmltYXRlOiB0cnVlIHNwZWNpZmllZCBpbiBvcHRpb25zXG5cdFx0aWYgKChvcHRpb25zICYmIG9wdGlvbnMuYW5pbWF0ZSkgIT09IHRydWUgJiYgIXRoaXMuZ2V0U2l6ZSgpLmNvbnRhaW5zKG9mZnNldCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0XHR0aGlzLnBhbkJ5KG9mZnNldCwgb3B0aW9ucyk7XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxufSk7XG5cblxuXG4vKlxuICogRXh0ZW5kcyBMLk1hcCB0byBoYW5kbGUgem9vbSBhbmltYXRpb25zLlxuICovXG5cbkwuTWFwLm1lcmdlT3B0aW9ucyh7XG5cdHpvb21BbmltYXRpb246IHRydWUsXG5cdHpvb21BbmltYXRpb25UaHJlc2hvbGQ6IDRcbn0pO1xuXG52YXIgem9vbUFuaW1hdGVkID0gTC5Eb21VdGlsLlRSQU5TSVRJT04gJiYgTC5Ccm93c2VyLmFueTNkICYmICFMLkJyb3dzZXIubW9iaWxlT3BlcmE7XG5cbmlmICh6b29tQW5pbWF0ZWQpIHtcblxuXHRMLk1hcC5hZGRJbml0SG9vayhmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gZG9uJ3QgYW5pbWF0ZSBvbiBicm93c2VycyB3aXRob3V0IGhhcmR3YXJlLWFjY2VsZXJhdGVkIHRyYW5zaXRpb25zIG9yIG9sZCBBbmRyb2lkL09wZXJhXG5cdFx0dGhpcy5fem9vbUFuaW1hdGVkID0gdGhpcy5vcHRpb25zLnpvb21BbmltYXRpb247XG5cblx0XHQvLyB6b29tIHRyYW5zaXRpb25zIHJ1biB3aXRoIHRoZSBzYW1lIGR1cmF0aW9uIGZvciBhbGwgbGF5ZXJzLCBzbyBpZiBvbmUgb2YgdHJhbnNpdGlvbmVuZCBldmVudHNcblx0XHQvLyBoYXBwZW5zIGFmdGVyIHN0YXJ0aW5nIHpvb20gYW5pbWF0aW9uIChwcm9wYWdhdGluZyB0byB0aGUgbWFwIHBhbmUpLCB3ZSBrbm93IHRoYXQgaXQgZW5kZWQgZ2xvYmFsbHlcblx0XHRpZiAodGhpcy5fem9vbUFuaW1hdGVkKSB7XG5cblx0XHRcdHRoaXMuX2NyZWF0ZUFuaW1Qcm94eSgpO1xuXG5cdFx0XHRMLkRvbUV2ZW50Lm9uKHRoaXMuX3Byb3h5LCBMLkRvbVV0aWwuVFJBTlNJVElPTl9FTkQsIHRoaXMuX2NhdGNoVHJhbnNpdGlvbkVuZCwgdGhpcyk7XG5cdFx0fVxuXHR9KTtcbn1cblxuTC5NYXAuaW5jbHVkZSghem9vbUFuaW1hdGVkID8ge30gOiB7XG5cblx0X2NyZWF0ZUFuaW1Qcm94eTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHByb3h5ID0gdGhpcy5fcHJveHkgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnbGVhZmxldC1wcm94eSBsZWFmbGV0LXpvb20tYW5pbWF0ZWQnKTtcblx0XHR0aGlzLl9wYW5lcy5tYXBQYW5lLmFwcGVuZENoaWxkKHByb3h5KTtcblxuXHRcdHRoaXMub24oJ3pvb21hbmltJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdHZhciBwcm9wID0gTC5Eb21VdGlsLlRSQU5TRk9STSxcblx0XHRcdCAgICB0cmFuc2Zvcm0gPSBwcm94eS5zdHlsZVtwcm9wXTtcblxuXHRcdFx0TC5Eb21VdGlsLnNldFRyYW5zZm9ybShwcm94eSwgdGhpcy5wcm9qZWN0KGUuY2VudGVyLCBlLnpvb20pLCB0aGlzLmdldFpvb21TY2FsZShlLnpvb20sIDEpKTtcblxuXHRcdFx0Ly8gd29ya2Fyb3VuZCBmb3IgY2FzZSB3aGVuIHRyYW5zZm9ybSBpcyB0aGUgc2FtZSBhbmQgc28gdHJhbnNpdGlvbmVuZCBldmVudCBpcyBub3QgZmlyZWRcblx0XHRcdGlmICh0cmFuc2Zvcm0gPT09IHByb3h5LnN0eWxlW3Byb3BdICYmIHRoaXMuX2FuaW1hdGluZ1pvb20pIHtcblx0XHRcdFx0dGhpcy5fb25ab29tVHJhbnNpdGlvbkVuZCgpO1xuXHRcdFx0fVxuXHRcdH0sIHRoaXMpO1xuXG5cdFx0dGhpcy5vbignbG9hZCBtb3ZlZW5kJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGMgPSB0aGlzLmdldENlbnRlcigpLFxuXHRcdFx0ICAgIHogPSB0aGlzLmdldFpvb20oKTtcblx0XHRcdEwuRG9tVXRpbC5zZXRUcmFuc2Zvcm0ocHJveHksIHRoaXMucHJvamVjdChjLCB6KSwgdGhpcy5nZXRab29tU2NhbGUoeiwgMSkpO1xuXHRcdH0sIHRoaXMpO1xuXHR9LFxuXG5cdF9jYXRjaFRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uIChlKSB7XG5cdFx0aWYgKHRoaXMuX2FuaW1hdGluZ1pvb20gJiYgZS5wcm9wZXJ0eU5hbWUuaW5kZXhPZigndHJhbnNmb3JtJykgPj0gMCkge1xuXHRcdFx0dGhpcy5fb25ab29tVHJhbnNpdGlvbkVuZCgpO1xuXHRcdH1cblx0fSxcblxuXHRfbm90aGluZ1RvQW5pbWF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiAhdGhpcy5fY29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWZsZXQtem9vbS1hbmltYXRlZCcpLmxlbmd0aDtcblx0fSxcblxuXHRfdHJ5QW5pbWF0ZWRab29tOiBmdW5jdGlvbiAoY2VudGVyLCB6b29tLCBvcHRpb25zKSB7XG5cblx0XHRpZiAodGhpcy5fYW5pbWF0aW5nWm9vbSkgeyByZXR1cm4gdHJ1ZTsgfVxuXG5cdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0XHQvLyBkb24ndCBhbmltYXRlIGlmIGRpc2FibGVkLCBub3Qgc3VwcG9ydGVkIG9yIHpvb20gZGlmZmVyZW5jZSBpcyB0b28gbGFyZ2Vcblx0XHRpZiAoIXRoaXMuX3pvb21BbmltYXRlZCB8fCBvcHRpb25zLmFuaW1hdGUgPT09IGZhbHNlIHx8IHRoaXMuX25vdGhpbmdUb0FuaW1hdGUoKSB8fFxuXHRcdCAgICAgICAgTWF0aC5hYnMoem9vbSAtIHRoaXMuX3pvb20pID4gdGhpcy5vcHRpb25zLnpvb21BbmltYXRpb25UaHJlc2hvbGQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0XHQvLyBvZmZzZXQgaXMgdGhlIHBpeGVsIGNvb3JkcyBvZiB0aGUgem9vbSBvcmlnaW4gcmVsYXRpdmUgdG8gdGhlIGN1cnJlbnQgY2VudGVyXG5cdFx0dmFyIHNjYWxlID0gdGhpcy5nZXRab29tU2NhbGUoem9vbSksXG5cdFx0ICAgIG9mZnNldCA9IHRoaXMuX2dldENlbnRlck9mZnNldChjZW50ZXIpLl9kaXZpZGVCeSgxIC0gMSAvIHNjYWxlKTtcblxuXHRcdC8vIGRvbid0IGFuaW1hdGUgaWYgdGhlIHpvb20gb3JpZ2luIGlzbid0IHdpdGhpbiBvbmUgc2NyZWVuIGZyb20gdGhlIGN1cnJlbnQgY2VudGVyLCB1bmxlc3MgZm9yY2VkXG5cdFx0aWYgKG9wdGlvbnMuYW5pbWF0ZSAhPT0gdHJ1ZSAmJiAhdGhpcy5nZXRTaXplKCkuY29udGFpbnMob2Zmc2V0KSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRcdEwuVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXNcblx0XHRcdCAgICAuX21vdmVTdGFydCh0cnVlKVxuXHRcdFx0ICAgIC5fYW5pbWF0ZVpvb20oY2VudGVyLCB6b29tLCB0cnVlKTtcblx0XHR9LCB0aGlzKTtcblxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXG5cdF9hbmltYXRlWm9vbTogZnVuY3Rpb24gKGNlbnRlciwgem9vbSwgc3RhcnRBbmltLCBub1VwZGF0ZSkge1xuXHRcdGlmIChzdGFydEFuaW0pIHtcblx0XHRcdHRoaXMuX2FuaW1hdGluZ1pvb20gPSB0cnVlO1xuXG5cdFx0XHQvLyByZW1lbWJlciB3aGF0IGNlbnRlci96b29tIHRvIHNldCBhZnRlciBhbmltYXRpb25cblx0XHRcdHRoaXMuX2FuaW1hdGVUb0NlbnRlciA9IGNlbnRlcjtcblx0XHRcdHRoaXMuX2FuaW1hdGVUb1pvb20gPSB6b29tO1xuXG5cdFx0XHRMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5fbWFwUGFuZSwgJ2xlYWZsZXQtem9vbS1hbmltJyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5maXJlKCd6b29tYW5pbScsIHtcblx0XHRcdGNlbnRlcjogY2VudGVyLFxuXHRcdFx0em9vbTogem9vbSxcblx0XHRcdG5vVXBkYXRlOiBub1VwZGF0ZVxuXHRcdH0pO1xuXG5cdFx0Ly8gV29yayBhcm91bmQgd2Via2l0IG5vdCBmaXJpbmcgJ3RyYW5zaXRpb25lbmQnLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL0xlYWZsZXQvTGVhZmxldC9pc3N1ZXMvMzY4OSwgMjY5M1xuXHRcdHNldFRpbWVvdXQoTC5iaW5kKHRoaXMuX29uWm9vbVRyYW5zaXRpb25FbmQsIHRoaXMpLCAyNTApO1xuXHR9LFxuXG5cdF9vblpvb21UcmFuc2l0aW9uRW5kOiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKCF0aGlzLl9hbmltYXRpbmdab29tKSB7IHJldHVybjsgfVxuXG5cdFx0TC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX21hcFBhbmUsICdsZWFmbGV0LXpvb20tYW5pbScpO1xuXG5cdFx0Ly8gVGhpcyBhbmltIGZyYW1lIHNob3VsZCBwcmV2ZW50IGFuIG9ic2N1cmUgaU9TIHdlYmtpdCB0aWxlIGxvYWRpbmcgcmFjZSBjb25kaXRpb24uXG5cdFx0TC5VdGlsLnJlcXVlc3RBbmltRnJhbWUoZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5fYW5pbWF0aW5nWm9vbSA9IGZhbHNlO1xuXG5cdFx0XHR0aGlzXG5cdFx0XHRcdC5fbW92ZSh0aGlzLl9hbmltYXRlVG9DZW50ZXIsIHRoaXMuX2FuaW1hdGVUb1pvb20pXG5cdFx0XHRcdC5fbW92ZUVuZCh0cnVlKTtcblx0XHR9LCB0aGlzKTtcblx0fVxufSk7XG5cblxuXG5cbkwuTWFwLmluY2x1ZGUoe1xuXHRmbHlUbzogZnVuY3Rpb24gKHRhcmdldENlbnRlciwgdGFyZ2V0Wm9vbSwgb3B0aW9ucykge1xuXG5cdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cdFx0aWYgKG9wdGlvbnMuYW5pbWF0ZSA9PT0gZmFsc2UgfHwgIUwuQnJvd3Nlci5hbnkzZCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuc2V0Vmlldyh0YXJnZXRDZW50ZXIsIHRhcmdldFpvb20sIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdHRoaXMuc3RvcCgpO1xuXG5cdFx0dmFyIGZyb20gPSB0aGlzLnByb2plY3QodGhpcy5nZXRDZW50ZXIoKSksXG5cdFx0ICAgIHRvID0gdGhpcy5wcm9qZWN0KHRhcmdldENlbnRlciksXG5cdFx0ICAgIHNpemUgPSB0aGlzLmdldFNpemUoKSxcblx0XHQgICAgc3RhcnRab29tID0gdGhpcy5fem9vbTtcblxuXHRcdHRhcmdldENlbnRlciA9IEwubGF0TG5nKHRhcmdldENlbnRlcik7XG5cdFx0dGFyZ2V0Wm9vbSA9IHRhcmdldFpvb20gPT09IHVuZGVmaW5lZCA/IHN0YXJ0Wm9vbSA6IHRhcmdldFpvb207XG5cblx0XHR2YXIgdzAgPSBNYXRoLm1heChzaXplLngsIHNpemUueSksXG5cdFx0ICAgIHcxID0gdzAgKiB0aGlzLmdldFpvb21TY2FsZShzdGFydFpvb20sIHRhcmdldFpvb20pLFxuXHRcdCAgICB1MSA9ICh0by5kaXN0YW5jZVRvKGZyb20pKSB8fCAxLFxuXHRcdCAgICByaG8gPSAxLjQyLFxuXHRcdCAgICByaG8yID0gcmhvICogcmhvO1xuXG5cdFx0ZnVuY3Rpb24gcihpKSB7XG5cdFx0XHR2YXIgYiA9ICh3MSAqIHcxIC0gdzAgKiB3MCArIChpID8gLTEgOiAxKSAqIHJobzIgKiByaG8yICogdTEgKiB1MSkgLyAoMiAqIChpID8gdzEgOiB3MCkgKiByaG8yICogdTEpO1xuXHRcdFx0cmV0dXJuIE1hdGgubG9nKE1hdGguc3FydChiICogYiArIDEpIC0gYik7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2luaChuKSB7IHJldHVybiAoTWF0aC5leHAobikgLSBNYXRoLmV4cCgtbikpIC8gMjsgfVxuXHRcdGZ1bmN0aW9uIGNvc2gobikgeyByZXR1cm4gKE1hdGguZXhwKG4pICsgTWF0aC5leHAoLW4pKSAvIDI7IH1cblx0XHRmdW5jdGlvbiB0YW5oKG4pIHsgcmV0dXJuIHNpbmgobikgLyBjb3NoKG4pOyB9XG5cblx0XHR2YXIgcjAgPSByKDApO1xuXG5cdFx0ZnVuY3Rpb24gdyhzKSB7IHJldHVybiB3MCAqIChjb3NoKHIwKSAvIGNvc2gocjAgKyByaG8gKiBzKSk7IH1cblx0XHRmdW5jdGlvbiB1KHMpIHsgcmV0dXJuIHcwICogKGNvc2gocjApICogdGFuaChyMCArIHJobyAqIHMpIC0gc2luaChyMCkpIC8gcmhvMjsgfVxuXG5cdFx0ZnVuY3Rpb24gZWFzZU91dCh0KSB7IHJldHVybiAxIC0gTWF0aC5wb3coMSAtIHQsIDEuNSk7IH1cblxuXHRcdHZhciBzdGFydCA9IERhdGUubm93KCksXG5cdFx0ICAgIFMgPSAocigxKSAtIHIwKSAvIHJobyxcblx0XHQgICAgZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uID8gMTAwMCAqIG9wdGlvbnMuZHVyYXRpb24gOiAxMDAwICogUyAqIDAuODtcblxuXHRcdGZ1bmN0aW9uIGZyYW1lKCkge1xuXHRcdFx0dmFyIHQgPSAoRGF0ZS5ub3coKSAtIHN0YXJ0KSAvIGR1cmF0aW9uLFxuXHRcdFx0ICAgIHMgPSBlYXNlT3V0KHQpICogUztcblxuXHRcdFx0aWYgKHQgPD0gMSkge1xuXHRcdFx0XHR0aGlzLl9mbHlUb0ZyYW1lID0gTC5VdGlsLnJlcXVlc3RBbmltRnJhbWUoZnJhbWUsIHRoaXMpO1xuXG5cdFx0XHRcdHRoaXMuX21vdmUoXG5cdFx0XHRcdFx0dGhpcy51bnByb2plY3QoZnJvbS5hZGQodG8uc3VidHJhY3QoZnJvbSkubXVsdGlwbHlCeSh1KHMpIC8gdTEpKSwgc3RhcnRab29tKSxcblx0XHRcdFx0XHR0aGlzLmdldFNjYWxlWm9vbSh3MCAvIHcocyksIHN0YXJ0Wm9vbSksXG5cdFx0XHRcdFx0e2ZseVRvOiB0cnVlfSk7XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXNcblx0XHRcdFx0XHQuX21vdmUodGFyZ2V0Q2VudGVyLCB0YXJnZXRab29tKVxuXHRcdFx0XHRcdC5fbW92ZUVuZCh0cnVlKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLl9tb3ZlU3RhcnQodHJ1ZSk7XG5cblx0XHRmcmFtZS5jYWxsKHRoaXMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdGZseVRvQm91bmRzOiBmdW5jdGlvbiAoYm91bmRzLCBvcHRpb25zKSB7XG5cdFx0dmFyIHRhcmdldCA9IHRoaXMuX2dldEJvdW5kc0NlbnRlclpvb20oYm91bmRzLCBvcHRpb25zKTtcblx0XHRyZXR1cm4gdGhpcy5mbHlUbyh0YXJnZXQuY2VudGVyLCB0YXJnZXQuem9vbSwgb3B0aW9ucyk7XG5cdH1cbn0pO1xuXG5cblxuLypcclxuICogUHJvdmlkZXMgTC5NYXAgd2l0aCBjb252ZW5pZW50IHNob3J0Y3V0cyBmb3IgdXNpbmcgYnJvd3NlciBnZW9sb2NhdGlvbiBmZWF0dXJlcy5cclxuICovXHJcblxyXG5MLk1hcC5pbmNsdWRlKHtcclxuXHRfZGVmYXVsdExvY2F0ZU9wdGlvbnM6IHtcclxuXHRcdHRpbWVvdXQ6IDEwMDAwLFxyXG5cdFx0d2F0Y2g6IGZhbHNlXHJcblx0XHQvLyBzZXRWaWV3OiBmYWxzZVxyXG5cdFx0Ly8gbWF4Wm9vbTogPE51bWJlcj5cclxuXHRcdC8vIG1heGltdW1BZ2U6IDBcclxuXHRcdC8vIGVuYWJsZUhpZ2hBY2N1cmFjeTogZmFsc2VcclxuXHR9LFxyXG5cclxuXHRsb2NhdGU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcblxyXG5cdFx0b3B0aW9ucyA9IHRoaXMuX2xvY2F0ZU9wdGlvbnMgPSBMLmV4dGVuZCh7fSwgdGhpcy5fZGVmYXVsdExvY2F0ZU9wdGlvbnMsIG9wdGlvbnMpO1xyXG5cclxuXHRcdGlmICghKCdnZW9sb2NhdGlvbicgaW4gbmF2aWdhdG9yKSkge1xyXG5cdFx0XHR0aGlzLl9oYW5kbGVHZW9sb2NhdGlvbkVycm9yKHtcclxuXHRcdFx0XHRjb2RlOiAwLFxyXG5cdFx0XHRcdG1lc3NhZ2U6ICdHZW9sb2NhdGlvbiBub3Qgc3VwcG9ydGVkLidcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBvblJlc3BvbnNlID0gTC5iaW5kKHRoaXMuX2hhbmRsZUdlb2xvY2F0aW9uUmVzcG9uc2UsIHRoaXMpLFxyXG5cdFx0ICAgIG9uRXJyb3IgPSBMLmJpbmQodGhpcy5faGFuZGxlR2VvbG9jYXRpb25FcnJvciwgdGhpcyk7XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMud2F0Y2gpIHtcclxuXHRcdFx0dGhpcy5fbG9jYXRpb25XYXRjaElkID1cclxuXHRcdFx0ICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24ud2F0Y2hQb3NpdGlvbihvblJlc3BvbnNlLCBvbkVycm9yLCBvcHRpb25zKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24ob25SZXNwb25zZSwgb25FcnJvciwgb3B0aW9ucyk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRzdG9wTG9jYXRlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAobmF2aWdhdG9yLmdlb2xvY2F0aW9uICYmIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5jbGVhcldhdGNoKSB7XHJcblx0XHRcdG5hdmlnYXRvci5nZW9sb2NhdGlvbi5jbGVhcldhdGNoKHRoaXMuX2xvY2F0aW9uV2F0Y2hJZCk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5fbG9jYXRlT3B0aW9ucykge1xyXG5cdFx0XHR0aGlzLl9sb2NhdGVPcHRpb25zLnNldFZpZXcgPSBmYWxzZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdF9oYW5kbGVHZW9sb2NhdGlvbkVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcclxuXHRcdHZhciBjID0gZXJyb3IuY29kZSxcclxuXHRcdCAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZSB8fFxyXG5cdFx0ICAgICAgICAgICAgKGMgPT09IDEgPyAncGVybWlzc2lvbiBkZW5pZWQnIDpcclxuXHRcdCAgICAgICAgICAgIChjID09PSAyID8gJ3Bvc2l0aW9uIHVuYXZhaWxhYmxlJyA6ICd0aW1lb3V0JykpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9sb2NhdGVPcHRpb25zLnNldFZpZXcgJiYgIXRoaXMuX2xvYWRlZCkge1xyXG5cdFx0XHR0aGlzLmZpdFdvcmxkKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5maXJlKCdsb2NhdGlvbmVycm9yJywge1xyXG5cdFx0XHRjb2RlOiBjLFxyXG5cdFx0XHRtZXNzYWdlOiAnR2VvbG9jYXRpb24gZXJyb3I6ICcgKyBtZXNzYWdlICsgJy4nXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRfaGFuZGxlR2VvbG9jYXRpb25SZXNwb25zZTogZnVuY3Rpb24gKHBvcykge1xyXG5cdFx0dmFyIGxhdCA9IHBvcy5jb29yZHMubGF0aXR1ZGUsXHJcblx0XHQgICAgbG5nID0gcG9zLmNvb3Jkcy5sb25naXR1ZGUsXHJcblx0XHQgICAgbGF0bG5nID0gbmV3IEwuTGF0TG5nKGxhdCwgbG5nKSxcclxuXHRcdCAgICBib3VuZHMgPSBsYXRsbmcudG9Cb3VuZHMocG9zLmNvb3Jkcy5hY2N1cmFjeSksXHJcblx0XHQgICAgb3B0aW9ucyA9IHRoaXMuX2xvY2F0ZU9wdGlvbnM7XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMuc2V0Vmlldykge1xyXG5cdFx0XHR2YXIgem9vbSA9IHRoaXMuZ2V0Qm91bmRzWm9vbShib3VuZHMpO1xyXG5cdFx0XHR0aGlzLnNldFZpZXcobGF0bG5nLCBvcHRpb25zLm1heFpvb20gPyBNYXRoLm1pbih6b29tLCBvcHRpb25zLm1heFpvb20pIDogem9vbSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGRhdGEgPSB7XHJcblx0XHRcdGxhdGxuZzogbGF0bG5nLFxyXG5cdFx0XHRib3VuZHM6IGJvdW5kcyxcclxuXHRcdFx0dGltZXN0YW1wOiBwb3MudGltZXN0YW1wXHJcblx0XHR9O1xyXG5cclxuXHRcdGZvciAodmFyIGkgaW4gcG9zLmNvb3Jkcykge1xyXG5cdFx0XHRpZiAodHlwZW9mIHBvcy5jb29yZHNbaV0gPT09ICdudW1iZXInKSB7XHJcblx0XHRcdFx0ZGF0YVtpXSA9IHBvcy5jb29yZHNbaV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmZpcmUoJ2xvY2F0aW9uZm91bmQnLCBkYXRhKTtcclxuXHR9XHJcbn0pO1xyXG5cblxufSh3aW5kb3csIGRvY3VtZW50KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sZWFmbGV0LXNyYy5tYXAiLCIvKipcbiAqIEBjbGFzcyAgTC5NYXRyaXhcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gYVxuICogQHBhcmFtIHtOdW1iZXJ9IGJcbiAqIEBwYXJhbSB7TnVtYmVyfSBjXG4gKiBAcGFyYW0ge051bWJlcn0gZFxuICogQHBhcmFtIHtOdW1iZXJ9IGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBmXG4gKi9cbkwuTWF0cml4ID0gZnVuY3Rpb24oYSwgYiwgYywgZCwgZSwgZikge1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7QXJyYXkuPE51bWJlcj59XG4gICAqL1xuICB0aGlzLl9tYXRyaXggPSBbYSwgYiwgYywgZCwgZSwgZl07XG59O1xuXG5cbkwuTWF0cml4LnByb3RvdHlwZSA9IHtcblxuXG4gIC8qKlxuICAgKiBAcGFyYW0gIHtMLlBvaW50fSBwb2ludFxuICAgKiBAcmV0dXJuIHtMLlBvaW50fVxuICAgKi9cbiAgdHJhbnNmb3JtOiBmdW5jdGlvbihwb2ludCkge1xuICAgIHJldHVybiB0aGlzLl90cmFuc2Zvcm0ocG9pbnQuY2xvbmUoKSk7XG4gIH0sXG5cblxuICAvKipcbiAgICogRGVzdHJ1Y3RpdmVcbiAgICpcbiAgICogWyB4IF0gPSBbIGEgIGIgIHR4IF0gWyB4IF0gPSBbIGEgKiB4ICsgYiAqIHkgKyB0eCBdXG4gICAqIFsgeSBdID0gWyBjICBkICB0eSBdIFsgeSBdID0gWyBjICogeCArIGQgKiB5ICsgdHkgXVxuICAgKlxuICAgKiBAcGFyYW0gIHtMLlBvaW50fSBwb2ludFxuICAgKiBAcmV0dXJuIHtMLlBvaW50fVxuICAgKi9cbiAgX3RyYW5zZm9ybTogZnVuY3Rpb24ocG9pbnQpIHtcbiAgICB2YXIgbWF0cml4ID0gdGhpcy5fbWF0cml4O1xuICAgIHZhciB4ID0gcG9pbnQueCwgeSA9IHBvaW50Lnk7XG4gICAgcG9pbnQueCA9IG1hdHJpeFswXSAqIHggKyBtYXRyaXhbMV0gKiB5ICsgbWF0cml4WzRdO1xuICAgIHBvaW50LnkgPSBtYXRyaXhbMl0gKiB4ICsgbWF0cml4WzNdICogeSArIG1hdHJpeFs1XTtcbiAgICByZXR1cm4gcG9pbnQ7XG4gIH0sXG5cblxuICAvKipcbiAgICogQHBhcmFtICB7TC5Qb2ludH0gcG9pbnRcbiAgICogQHJldHVybiB7TC5Qb2ludH1cbiAgICovXG4gIHVudHJhbnNmb3JtOiBmdW5jdGlvbiAocG9pbnQpIHtcbiAgICB2YXIgbWF0cml4ID0gdGhpcy5fbWF0cml4O1xuICAgIHJldHVybiBuZXcgTC5Qb2ludChcbiAgICAgIChwb2ludC54IC8gbWF0cml4WzBdIC0gbWF0cml4WzRdKSAvIG1hdHJpeFswXSxcbiAgICAgIChwb2ludC55IC8gbWF0cml4WzJdIC0gbWF0cml4WzVdKSAvIG1hdHJpeFsyXVxuICAgICk7XG4gIH0sXG5cblxuICAvKipcbiAgICogQHJldHVybiB7TC5NYXRyaXh9XG4gICAqL1xuICBjbG9uZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1hdHJpeCA9IHRoaXMuX21hdHJpeDtcbiAgICByZXR1cm4gbmV3IEwuTWF0cml4KFxuICAgICAgbWF0cml4WzBdLCBtYXRyaXhbMV0sIG1hdHJpeFsyXSxcbiAgICAgIG1hdHJpeFszXSwgbWF0cml4WzRdLCBtYXRyaXhbNV1cbiAgICApO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7TC5Qb2ludD18TnVtYmVyPX0gdHJhbnNsYXRlXG4gICAqIEByZXR1cm4ge0wuTWF0cml4fEwuUG9pbnR9XG4gICAqL1xuICB0cmFuc2xhdGU6IGZ1bmN0aW9uKHRyYW5zbGF0ZSkge1xuICAgIGlmICh0cmFuc2xhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIG5ldyBMLlBvaW50KHRoaXMuX21hdHJpeFs0XSwgdGhpcy5fbWF0cml4WzVdKTtcbiAgICB9XG5cbiAgICB2YXIgdHJhbnNsYXRlWCwgdHJhbnNsYXRlWTtcbiAgICBpZiAodHlwZW9mIHRyYW5zbGF0ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRyYW5zbGF0ZVggPSB0cmFuc2xhdGVZID0gdHJhbnNsYXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cmFuc2xhdGVYID0gdHJhbnNsYXRlLng7XG4gICAgICB0cmFuc2xhdGVZID0gdHJhbnNsYXRlLnk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2FkZCgxLCAwLCAwLCAxLCB0cmFuc2xhdGVYLCB0cmFuc2xhdGVZKTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0wuUG9pbnQ9fE51bWJlcj19IHNjYWxlXG4gICAqIEByZXR1cm4ge0wuTWF0cml4fEwuUG9pbnR9XG4gICAqL1xuICBzY2FsZTogZnVuY3Rpb24oc2NhbGUsIG9yaWdpbikge1xuICAgIGlmIChzY2FsZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gbmV3IEwuUG9pbnQodGhpcy5fbWF0cml4WzBdLCB0aGlzLl9tYXRyaXhbM10pO1xuICAgIH1cblxuICAgIHZhciBzY2FsZVgsIHNjYWxlWTtcbiAgICBvcmlnaW4gPSBvcmlnaW4gfHwgTC5wb2ludCgwLCAwKTtcbiAgICBpZiAodHlwZW9mIHNjYWxlID09PSAnbnVtYmVyJykge1xuICAgICAgc2NhbGVYID0gc2NhbGVZID0gc2NhbGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNjYWxlWCA9IHNjYWxlLng7XG4gICAgICBzY2FsZVkgPSBzY2FsZS55O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gICAgICAuX2FkZChzY2FsZVgsIDAsIDAsIHNjYWxlWSwgb3JpZ2luLngsIG9yaWdpbi55KVxuICAgICAgLl9hZGQoMSwgMCwgMCwgMSwgLW9yaWdpbi54LCAtb3JpZ2luLnkpO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIG0wMCAgbTAxICB4IC0gbTAwICogeCAtIG0wMSAqIHlcbiAgICogbTEwICBtMTEgIHkgLSBtMTAgKiB4IC0gbTExICogeVxuICAgKiBAcGFyYW0ge051bWJlcn0gICBhbmdsZVxuICAgKiBAcGFyYW0ge0wuUG9pbnQ9fSBvcmlnaW5cbiAgICogQHJldHVybiB7TC5NYXRyaXh9XG4gICAqL1xuICByb3RhdGU6IGZ1bmN0aW9uKGFuZ2xlLCBvcmlnaW4pIHtcbiAgICB2YXIgY29zID0gTWF0aC5jb3MoYW5nbGUpO1xuICAgIHZhciBzaW4gPSBNYXRoLnNpbihhbmdsZSk7XG5cbiAgICBvcmlnaW4gPSBvcmlnaW4gfHwgbmV3IEwuUG9pbnQoMCwgMCk7XG5cbiAgICByZXR1cm4gdGhpc1xuICAgICAgLl9hZGQoY29zLCBzaW4sIC1zaW4sIGNvcywgb3JpZ2luLngsIG9yaWdpbi55KVxuICAgICAgLl9hZGQoMSwgMCwgMCwgMSwgLW9yaWdpbi54LCAtb3JpZ2luLnkpO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIEludmVydCByb3RhdGlvblxuICAgKiBAcmV0dXJuIHtMLk1hdHJpeH1cbiAgICovXG4gIGZsaXA6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX21hdHJpeFsxXSAqPSAtMTtcbiAgICB0aGlzLl9tYXRyaXhbMl0gKj0gLTE7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cblxuICAvKipcbiAgICogQHBhcmFtIHtOdW1iZXJ8TC5NYXRyaXh9IGFcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZcbiAgICovXG4gIF9hZGQ6IGZ1bmN0aW9uKGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgICB2YXIgcmVzdWx0ID0gW1tdLCBbXSwgW11dO1xuICAgIHZhciBzcmMgPSB0aGlzLl9tYXRyaXg7XG4gICAgdmFyIG0gPSBbXG4gICAgICBbc3JjWzBdLCBzcmNbMl0sIHNyY1s0XV0sXG4gICAgICBbc3JjWzFdLCBzcmNbM10sIHNyY1s1XV0sXG4gICAgICBbICAgICAwLCAgICAgIDAsICAgICAxXVxuICAgIF07XG4gICAgdmFyIG90aGVyID0gW1xuICAgICAgW2EsIGMsIGVdLFxuICAgICAgW2IsIGQsIGZdLFxuICAgICAgWzAsIDAsIDFdXG4gICAgXSwgdmFsO1xuXG5cbiAgICBpZiAoYSAmJiBhIGluc3RhbmNlb2YgTC5NYXRyaXgpIHtcbiAgICAgIHNyYyA9IGEuX21hdHJpeDtcbiAgICAgIG90aGVyID0gW1xuICAgICAgICBbc3JjWzBdLCBzcmNbMl0sIHNyY1s0XV0sXG4gICAgICAgIFtzcmNbMV0sIHNyY1szXSwgc3JjWzVdXSxcbiAgICAgICAgWyAgICAgMCwgICAgICAwLCAgICAgMV1dO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDM7IGorKykge1xuICAgICAgICB2YWwgPSAwO1xuICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IDM7IGsrKykge1xuICAgICAgICAgIHZhbCArPSBtW2ldW2tdICogb3RoZXJba11bal07XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0W2ldW2pdID0gdmFsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX21hdHJpeCA9IFtcbiAgICAgIHJlc3VsdFswXVswXSwgcmVzdWx0WzFdWzBdLCByZXN1bHRbMF1bMV0sXG4gICAgICByZXN1bHRbMV1bMV0sIHJlc3VsdFswXVsyXSwgcmVzdWx0WzFdWzJdXG4gICAgXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG5cbn07XG5cblxuTC5tYXRyaXggPSBmdW5jdGlvbihhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIHJldHVybiBuZXcgTC5NYXRyaXgoYSwgYiwgYywgZCwgZSwgZik7XG59O1xuIiwiTC5IYW5kbGVyLlBhdGhUcmFuc2Zvcm0gPSBMLkhhbmRsZXIuZXh0ZW5kKHtcblxuICBvcHRpb25zOiB7XG4gICAgcm90YXRpb246IHRydWUsXG4gICAgc2NhbGluZzogIHRydWUsXG5cbiAgICAvLyBlZGdlIGhhbmRsZXJzXG4gICAgaGFuZGxlck9wdGlvbnM6IHtcbiAgICAgIHJhZGl1czogICAgICA1LFxuICAgICAgZmlsbENvbG9yOiAgICcjZmZmZmZmJyxcbiAgICAgIGNvbG9yOiAgICAgICAnIzIwMjAyMCcsXG4gICAgICBmaWxsT3BhY2l0eTogMSxcbiAgICAgIHdlaWdodDogICAgICAyLFxuICAgICAgb3BhY2l0eTogICAgIDAuN1xuICAgIH0sXG5cbiAgICAvLyByZWN0YW5nbGVcbiAgICBib3VuZHNPcHRpb25zOiB7XG4gICAgICB3ZWlnaHQ6ICAgIDEsXG4gICAgICBvcGFjaXR5OiAgIDEsXG4gICAgICBkYXNoQXJyYXk6IFszLCAzXSxcbiAgICAgIGZpbGw6ICAgICAgZmFsc2VcbiAgICB9LFxuXG4gICAgLy8gcm90YXRpb24gaGFuZGxlclxuICAgIHJvdGF0ZUhhbmRsZU9wdGlvbnM6IHtcbiAgICAgIHdlaWdodDogMSxcbiAgICAgIG9wYWNpdHk6IDFcbiAgICB9LFxuICAgIC8vIHJvdGF0aW9uIGhhbmRsZSBsZW5ndGhcbiAgICBoYW5kbGVMZW5ndGg6IDIwLFxuXG4gICAgLy8gbWF5YmUgSSdsbCBhZGQgc2tld2luZyBpbiB0aGUgZnV0dXJlXG4gICAgZWRnZXNDb3VudDogICA0XG4gIH0sXG5cblxuICAvKipcbiAgICogQGNsYXNzIEwuSGFuZGxlci5QYXRoVHJhbnNmb3JtXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gIHtMLlBhdGh9IHBhdGhcbiAgICovXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICAvLyByZWZlcmVuY2VzXG4gICAgdGhpcy5fcGF0aCA9IHBhdGg7XG4gICAgdGhpcy5fbWFwICA9IG51bGw7XG5cbiAgICAvLyBoYW5kbGVyc1xuICAgIHRoaXMuX2FjdGl2ZU1hcmtlciAgID0gbnVsbDtcbiAgICB0aGlzLl9vcmlnaW5NYXJrZXIgICA9IG51bGw7XG4gICAgdGhpcy5fcm90YXRpb25NYXJrZXIgPSBudWxsO1xuXG4gICAgLy8gb3JpZ2lucyAmIHRlbXBvcmFyeSBzdGF0ZVxuICAgIHRoaXMuX3JvdGF0aW9uT3JpZ2luICAgPSBudWxsO1xuICAgIHRoaXMuX3NjYWxlT3JpZ2luICAgICAgPSBudWxsO1xuICAgIHRoaXMuX2FuZ2xlICAgICAgICAgICAgPSAwO1xuICAgIHRoaXMuX3NjYWxlICAgICAgICAgICAgPSBMLnBvaW50KDEsIDEpO1xuICAgIHRoaXMuX2luaXRpYWxEaXN0ICAgICAgPSAwO1xuICAgIHRoaXMuX3JvdGF0aW9uU3RhcnQgICAgPSBudWxsO1xuICAgIHRoaXMuX3JvdGF0aW9uT3JpZ2luUHQgPSBudWxsO1xuXG4gICAgLy8gcHJldmlldyBhbmQgdHJhbnNmb3JtIG1hdHJpeFxuICAgIHRoaXMuX21hdHJpeCAgICAgICAgICA9IG5ldyBMLk1hdHJpeCgxLCAwLCAwLCAxLCAwLCAwKTtcbiAgICB0aGlzLl9wcm9qZWN0ZWRNYXRyaXggPSBuZXcgTC5NYXRyaXgoMSwgMCwgMCwgMSwgMCwgMCk7XG5cbiAgICAvLyB1aSBlbGVtZW50c1xuICAgIHRoaXMuX2hhbmRsZXJzR3JvdXAgID0gbnVsbDtcbiAgICB0aGlzLl9yZWN0ICAgICAgICAgICA9IG51bGw7XG4gICAgdGhpcy5faGFuZGxlcnMgICAgICAgPSBbXTtcbiAgICB0aGlzLl9oYW5kbGVMaW5lICAgICA9IG51bGw7XG4gIH0sXG5cblxuICAvKipcbiAgICogSWYgdGhlIHBvbHlnb24gaXMgbm90IHJlbmRlcmVkLCB5b3UgY2FuIHRyYW5zZm9ybSBpdCB5b3Vyc2VsZlxuICAgKiBpbiB0aGUgY29vcmRpbmF0ZXMsIGFuZCBkbyBpdCBwcm9wZXJseS5cbiAgICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXG4gICAqL1xuICBlbmFibGU6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBpZiAodGhpcy5fcGF0aC5fbWFwKSB7XG4gICAgICB0aGlzLl9tYXAgPSB0aGlzLl9wYXRoLl9tYXA7XG4gICAgICBpZiAob3B0aW9ucykge1xuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgICB9XG4gICAgICBMLkhhbmRsZXIucHJvdG90eXBlLmVuYWJsZS5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfSxcblxuXG4gIC8qKlxuICAgKiBJbml0IGludGVyYWN0aW9ucyBhbmQgaGFuZGxlcnNcbiAgICovXG4gIGFkZEhvb2tzOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9jcmVhdGVIYW5kbGVycygpO1xuICAgIHRoaXMuX3BhdGhcbiAgICAgIC5vbignZHJhZ3N0YXJ0JywgdGhpcy5fb25EcmFnU3RhcnQsIHRoaXMpXG4gICAgICAub24oJ2RyYWdlbmQnLCAgIHRoaXMuX29uRHJhZ0VuZCwgdGhpcyk7XG4gIH0sXG5cblxuICAvKipcbiAgICogUmVtb3ZlIGhhbmRsZXJzXG4gICAqL1xuICByZW1vdmVIb29rczogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5faGlkZUhhbmRsZXJzKCk7XG4gICAgdGhpcy5faGFuZGxlcnNHcm91cCA9IG51bGw7XG4gICAgdGhpcy5fcmVjdCA9IG51bGw7XG4gICAgdGhpcy5faGFuZGxlcnMgPSBbXTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBDaGFuZ2UgZWRpdGluZyBvcHRpb25zXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqL1xuICBzZXRPcHRpb25zOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgdmFyIGVuYWJsZWQgPSB0aGlzLl9lbmFibGVkO1xuICAgIGlmIChlbmFibGVkKSB7XG4gICAgICB0aGlzLmRpc2FibGUoKTtcbiAgICB9XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBMLlV0aWwubWVyZ2Uoe30sXG4gICAgICBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KEwuSGFuZGxlci5QYXRoVHJhbnNmb3JtLnByb3RvdHlwZS5vcHRpb25zKSksXG4gICAgICBvcHRpb25zKTtcblxuICAgIGlmIChlbmFibGVkKSB7XG4gICAgICB0aGlzLmVuYWJsZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgcG9seWdvbiBhbmQgaGFuZGxlcnMgcHJldmlldywgbm8gcmVwcm9qZWN0aW9uXG4gICAqL1xuICBfdXBkYXRlOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbWF0cml4ID0gdGhpcy5fbWF0cml4O1xuXG4gICAgLy8gdXBkYXRlIGhhbmRsZXJzXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMuX2hhbmRsZXJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB2YXIgaGFuZGxlciA9IHRoaXMuX2hhbmRsZXJzW2ldO1xuICAgICAgaWYgKGhhbmRsZXIgIT09IHRoaXMuX29yaWdpbk1hcmtlcikge1xuICAgICAgICBoYW5kbGVyLl9wb2ludCA9IG1hdHJpeC50cmFuc2Zvcm0oaGFuZGxlci5faW5pdGlhbFBvaW50KTtcbiAgICAgICAgaGFuZGxlci5fdXBkYXRlUGF0aCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1hdHJpeCA9IG1hdHJpeC5jbG9uZSgpLmZsaXAoKTtcblxuICAgIHRoaXMuX2FwcGx5VHJhbnNmb3JtKG1hdHJpeCk7XG4gICAgdGhpcy5fcGF0aC5maXJlKCd0cmFuc2Zvcm0nLCB7IGxheWVyOiB0aGlzLl9wYXRoIH0pO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIEBwYXJhbSAge0wuTWF0cml4fSBtYXRyaXhcbiAgICovXG4gIF9hcHBseVRyYW5zZm9ybTogZnVuY3Rpb24obWF0cml4KSB7XG4gICAgdGhpcy5fcGF0aC5fdHJhbnNmb3JtKG1hdHJpeC5fbWF0cml4KTtcbiAgICB0aGlzLl9yZWN0Ll90cmFuc2Zvcm0obWF0cml4Ll9tYXRyaXgpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5yb3RhdGlvbikge1xuICAgICAgdGhpcy5faGFuZGxlTGluZS5fdHJhbnNmb3JtKG1hdHJpeC5fbWF0cml4KTtcbiAgICB9XG4gIH0sXG5cblxuICAvKipcbiAgICogQXBwbHkgZmluYWwgdHJhbnNmb3JtYXRpb25cbiAgICovXG4gIF9hcHBseTogZnVuY3Rpb24oKSB7XG4gICAgLy9jb25zb2xlLmdyb3VwKCdhcHBseSB0cmFuc2Zvcm0nKTtcbiAgICB2YXIgbWFwID0gdGhpcy5fbWFwO1xuICAgIHZhciBtYXRyaXggPSB0aGlzLl9tYXRyaXguY2xvbmUoKTtcbiAgICB2YXIgYW5nbGUgPSB0aGlzLl9hbmdsZTtcbiAgICB2YXIgc2NhbGUgPSB0aGlzLl9zY2FsZS5jbG9uZSgpO1xuXG4gICAgdGhpcy5fdHJhbnNmb3JtR2VvbWV0cmllcygpO1xuXG4gICAgLy8gdXBkYXRlIGhhbmRsZXJzXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMuX2hhbmRsZXJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB2YXIgaGFuZGxlciA9IHRoaXMuX2hhbmRsZXJzW2ldO1xuICAgICAgaGFuZGxlci5fbGF0bG5nID0gbWFwLmxheWVyUG9pbnRUb0xhdExuZyhoYW5kbGVyLl9wb2ludCk7XG4gICAgICBkZWxldGUgaGFuZGxlci5faW5pdGlhbFBvaW50O1xuICAgICAgaGFuZGxlci5yZWRyYXcoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9tYXRyaXggPSBMLm1hdHJpeCgxLCAwLCAwLCAxLCAwLCAwKTtcbiAgICB0aGlzLl9zY2FsZSAgPSBMLnBvaW50KDEsIDEpO1xuICAgIHRoaXMuX2FuZ2xlICA9IDA7XG5cbiAgICB0aGlzLl91cGRhdGVIYW5kbGVycygpO1xuXG4gICAgbWFwLmRyYWdnaW5nLmVuYWJsZSgpO1xuICAgIHRoaXMuX3BhdGguZmlyZSgndHJhbnNmb3JtZWQnLCB7XG4gICAgICBtYXRyaXg6IG1hdHJpeCxcbiAgICAgIHNjYWxlOiBzY2FsZSxcbiAgICAgIHJvdGF0aW9uOiBhbmdsZSxcbiAgICAgIC8vIGFuZ2xlOiBhbmdsZSAqICgxODAgLyBNYXRoLlBJKSxcbiAgICAgIGxheWVyOiB0aGlzLl9wYXRoXG4gICAgfSk7XG4gICAgLy8gY29uc29sZS5ncm91cEVuZCgnYXBwbHkgdHJhbnNmb3JtJyk7XG4gIH0sXG5cblxuICAvKipcbiAgICogUmVjYWxjdWxhdGUgcm90YXRpb24gaGFuZGxlcnMgcG9zaXRpb25cbiAgICovXG4gIF91cGRhdGVIYW5kbGVyczogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGhhbmRsZXJzR3JvdXAgPSB0aGlzLl9oYW5kbGVyc0dyb3VwO1xuXG4gICAgdGhpcy5fcmVjdFNoYXBlID0gdGhpcy5fcmVjdC50b0dlb0pTT04oKTtcblxuICAgIGhhbmRsZXJzR3JvdXAucmVtb3ZlTGF5ZXIodGhpcy5faGFuZGxlTGluZSk7XG4gICAgaGFuZGxlcnNHcm91cC5yZW1vdmVMYXllcih0aGlzLl9yb3RhdGlvbk1hcmtlcik7XG5cbiAgICB0aGlzLl9oYW5kbGVMaW5lID0gdGhpcy5fcm90YXRpb25NYXJrZXIgPSBudWxsO1xuXG4gICAgZm9yICh2YXIgaSA9IHRoaXMuX2hhbmRsZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBoYW5kbGVyc0dyb3VwLnJlbW92ZUxheWVyKHRoaXMuX2hhbmRsZXJzW2ldKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jcmVhdGVIYW5kbGVycygpO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIFRyYW5zZm9ybSBnZW9tZXRyaWVzIHNlcGFyYXRlbHlcbiAgICovXG4gIF90cmFuc2Zvcm1HZW9tZXRyaWVzOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgb3JpZ2luID0gdGhpcy5fb3JpZ2luO1xuICAgIHRoaXMuX3BhdGguX3RyYW5zZm9ybShudWxsKTtcbiAgICB0aGlzLl9yZWN0Ll90cmFuc2Zvcm0obnVsbCk7XG5cbiAgICB0aGlzLl90cmFuc2Zvcm1Qb2ludHModGhpcy5fcGF0aCwgdGhpcy5fbWF0cml4LCBvcmlnaW4pO1xuICAgIHRoaXMuX3RyYW5zZm9ybVBvaW50cyh0aGlzLl9yZWN0LCB0aGlzLl9tYXRyaXgsIG9yaWdpbik7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnJvdGF0aW9uKSB7XG4gICAgICB0aGlzLl9oYW5kbGVMaW5lLl90cmFuc2Zvcm0obnVsbCk7XG4gICAgICB0aGlzLl90cmFuc2Zvcm1Qb2ludHModGhpcy5faGFuZGxlTGluZSwgdGhpcy5fbWF0cml4LCBvcmlnaW4pO1xuICAgIH1cbiAgfSxcblxuXG4gIC8qKlxuICAgKiBAaW5oZXJpdERvY1xuICAgKi9cbiAgX2dldFByb2plY3RlZE1hdHJpeDogZnVuY3Rpb24obWF0cml4LCBvcmlnaW5Qb2ludCkge1xuICAgIHZhciBtYXAgICAgPSB0aGlzLl9tYXA7XG4gICAgdmFyIHpvb20gICA9IG1hcC5nZXRNYXhab29tKCk7XG4gICAgdmFyIG1hdHJpeCA9IEwubWF0cml4KDEsIDAsIDAsIDEsIDAsIDApO1xuICAgIHZhciBvcmlnaW47XG5cbiAgICBpZiAodGhpcy5fYW5nbGUpIHtcbiAgICAgIG9yaWdpbiA9IG1hcC5wcm9qZWN0KHRoaXMuX3JvdGF0aW9uT3JpZ2luLCB6b29tKTtcbiAgICAgIG1hdHJpeCA9IG1hdHJpeC5yb3RhdGUodGhpcy5fYW5nbGUsIG9yaWdpbikuZmxpcCgpO1xuICAgIH1cblxuICAgIGlmICghKHRoaXMuX3NjYWxlLnggPT09IDEgJiYgdGhpcy5fc2NhbGUueSA9PT0gMSkpIHtcbiAgICAgIG9yaWdpbiA9IG1hcC5wcm9qZWN0KHRoaXMuX3NjYWxlT3JpZ2luLCB6b29tKTtcbiAgICAgIG1hdHJpeCA9IG1hdHJpeFxuICAgICAgICAuX2FkZChMLm1hdHJpeCgxLCAwLCAwLCAxLCBvcmlnaW4ueCwgb3JpZ2luLnkpKVxuICAgICAgICAuX2FkZChMLm1hdHJpeCh0aGlzLl9zY2FsZS54LCAwLCAwLCB0aGlzLl9zY2FsZS55LCAwLCAwKSlcbiAgICAgICAgLl9hZGQoTC5tYXRyaXgoMSwgMCwgMCwgMSwgLW9yaWdpbi54LCAtb3JpZ2luLnkpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWF0cml4O1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIEBwYXJhbSAge0wuTGF0TG5nfSBsYXRsbmdcbiAgICogQHBhcmFtICB7TC5NYXRyaXh9IG1hdHJpeFxuICAgKiBAcGFyYW0gIHtMLk1hcH0gICAgbWFwXG4gICAqIEBwYXJhbSAge051bWJlcn0gICB6b29tXG4gICAqIEByZXR1cm4ge0wuTGF0TG5nfVxuICAgKi9cbiAgX3RyYW5zZm9ybVBvaW50OiBmdW5jdGlvbihsYXRsbmcsIG1hdHJpeCwgbWFwLCB6b29tKSB7XG4gICAgcmV0dXJuIG1hcC51bnByb2plY3QobWF0cml4LnRyYW5zZm9ybShcbiAgICAgIG1hcC5wcm9qZWN0KGxhdGxuZywgem9vbSkpLCB6b29tKTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIHRyYW5zZm9ybWF0aW9uLCBkb2VzIGl0IGluIG9uZSBzd2VlcCBmb3IgcGVyZm9ybWFuY2UsXG4gICAqIHNvIGRvbid0IGJlIHN1cnByaXNlZCBhYm91dCB0aGUgY29kZSByZXBldGl0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge0wuUGF0aH0gICBwYXRoXG4gICAqIEBwYXJhbSB7TC5NYXRyaXh9IG1hdHJpeFxuICAgKi9cbiAgX3RyYW5zZm9ybVBvaW50czogZnVuY3Rpb24ocGF0aCwgbWF0cml4LCBvcmlnaW4pIHtcbiAgICB2YXIgbWFwID0gcGF0aC5fbWFwO1xuICAgIHZhciB6b29tID0gbWFwLmdldE1heFpvb20oKTtcbiAgICB2YXIgaSwgbGVuO1xuXG4gICAgdmFyIHByb2plY3RlZE1hdHJpeCA9IHRoaXMuX3Byb2plY3RlZE1hdHJpeCA9IHRoaXMuX2dldFByb2plY3RlZE1hdHJpeCgpO1xuICAgIC8vIGNvbnNvbGUudGltZSgndHJhbnNmb3JtJyk7XG5cbiAgICAvLyBhbGwgc2hpZnRzIGFyZSBpbi1wbGFjZVxuICAgIGlmIChwYXRoLl9wb2ludCkgeyAvLyBMLkNpcmNsZVxuICAgICAgcGF0aC5fbGF0bG5nID0gdGhpcy5fdHJhbnNmb3JtUG9pbnQoXG4gICAgICAgIHBhdGguX2xhdGxuZywgcHJvamVjdGVkTWF0cml4LCBtYXAsIHpvb20pO1xuICAgIH0gZWxzZSBpZiAocGF0aC5fcmluZ3MgfHwgcGF0aC5fcGFydHMpIHsgLy8gZXZlcnl0aGluZyBlbHNlXG4gICAgICB2YXIgcmluZ3MgPSBwYXRoLl9yaW5ncztcbiAgICAgIHZhciBsYXRsbmdzID0gcGF0aC5fbGF0bG5ncztcblxuICAgICAgaWYgKCFMLlV0aWwuaXNBcnJheShsYXRsbmdzWzBdKSkgeyAvLyBwb2x5bGluZVxuICAgICAgICBsYXRsbmdzID0gW2xhdGxuZ3NdO1xuICAgICAgfVxuICAgICAgZm9yIChpID0gMCwgbGVuID0gcmluZ3MubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDAsIGpqID0gcmluZ3NbaV0ubGVuZ3RoOyBqIDwgamo7IGorKykge1xuICAgICAgICAgIGxhdGxuZ3NbaV1bal0gPSB0aGlzLl90cmFuc2Zvcm1Qb2ludChcbiAgICAgICAgICAgIGxhdGxuZ3NbaV1bal0sIHByb2plY3RlZE1hdHJpeCwgbWFwLCB6b29tKTtcbiAgICAgICAgICAvL3BhdGguX2JvdW5kcy5leHRlbmQobGF0bG5nc1tpXVtqXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBwYXRoLl9yZXNldCgpO1xuICAgIC8vY29uc29sZS50aW1lRW5kKCd0cmFuc2Zvcm0nKTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIG1hcmtlcnMgYW5kIGhhbmRsZXNcbiAgICovXG4gIF9jcmVhdGVIYW5kbGVyczogZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1hcCA9IHRoaXMuX21hcDtcbiAgICB0aGlzLl9oYW5kbGVyc0dyb3VwID0gdGhpcy5faGFuZGxlcnNHcm91cCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgTC5MYXllckdyb3VwKCkuYWRkVG8obWFwKTtcbiAgICB0aGlzLl9yZWN0ID0gdGhpcy5fcmVjdCB8fFxuICAgICAgICAgICAgICAgICAgIHRoaXMuX2dldEJvdW5kaW5nUG9seWdvbigpLmFkZFRvKHRoaXMuX2hhbmRsZXJzR3JvdXApO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5zY2FsaW5nKSB7XG4gICAgICB0aGlzLl9oYW5kbGVycyA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm9wdGlvbnMuZWRnZXNDb3VudDsgaSsrKSB7XG4gICAgICAgIC8vIFRPRE86IGFkZCBzdHJldGNoaW5nXG4gICAgICAgIHRoaXMuX2hhbmRsZXJzLnB1c2goXG4gICAgICAgICAgdGhpcy5fY3JlYXRlSGFuZGxlcih0aGlzLl9yZWN0Ll9sYXRsbmdzWzBdW2ldLCBpICogMiwgaSlcbiAgICAgICAgICAuYWRkVG8odGhpcy5faGFuZGxlcnNHcm91cCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGFkZCBib3VuZHNcbiAgICBpZiAodGhpcy5vcHRpb25zLnJvdGF0aW9uKSB7XG4gICAgICAvL2FkZCByb3RhdGlvbiBoYW5kbGVyXG4gICAgICB0aGlzLl9jcmVhdGVSb3RhdGlvbkhhbmRsZXJzKCk7XG4gICAgfVxuICB9LFxuXG5cbiAgLyoqXG4gICAqIFJvdGF0aW9uIG1hcmtlciBhbmQgc21hbGwgY29ubmVjdGluIGhhbmRsZVxuICAgKi9cbiAgX2NyZWF0ZVJvdGF0aW9uSGFuZGxlcnM6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBtYXAgICAgID0gdGhpcy5fbWFwO1xuICAgIHZhciBsYXRsbmdzID0gdGhpcy5fcmVjdC5fbGF0bG5nc1swXTtcblxuICAgIHZhciBib3R0b20gICA9IG5ldyBMLkxhdExuZyhcbiAgICAgIChsYXRsbmdzWzBdLmxhdCArIGxhdGxuZ3NbM10ubGF0KSAvIDIsXG4gICAgICAobGF0bG5nc1swXS5sbmcgKyBsYXRsbmdzWzNdLmxuZykgLyAyKTtcbiAgICAvLyBoZWhlLCB0b3AgaXMgYSByZXNlcnZlZCB3b3JkXG4gICAgdmFyIHRvcFBvaW50ID0gbmV3IEwuTGF0TG5nKFxuICAgICAgKGxhdGxuZ3NbMV0ubGF0ICsgbGF0bG5nc1syXS5sYXQpIC8gMixcbiAgICAgIChsYXRsbmdzWzFdLmxuZyArIGxhdGxuZ3NbMl0ubG5nKSAvIDIpO1xuXG4gICAgdmFyIGhhbmRsZXJQb3NpdGlvbiA9IG1hcC5sYXllclBvaW50VG9MYXRMbmcoXG4gICAgICBMLkxpbmVVdGlsLnBvaW50T25MaW5lKFxuICAgICAgICBtYXAubGF0TG5nVG9MYXllclBvaW50KGJvdHRvbSksXG4gICAgICAgIG1hcC5sYXRMbmdUb0xheWVyUG9pbnQodG9wUG9pbnQpLFxuICAgICAgICB0aGlzLm9wdGlvbnMuaGFuZGxlTGVuZ3RoKVxuICAgICk7XG5cbiAgICB0aGlzLl9oYW5kbGVMaW5lID0gbmV3IEwuUG9seWxpbmUoW3RvcFBvaW50LCBoYW5kbGVyUG9zaXRpb25dLFxuICAgICAgdGhpcy5vcHRpb25zLnJvdGF0ZUhhbmRsZU9wdGlvbnMpLmFkZFRvKHRoaXMuX2hhbmRsZXJzR3JvdXApO1xuICAgIHRoaXMuX3JvdGF0aW9uTWFya2VyID0gbmV3IEwuQ2lyY2xlTWFya2VyKGhhbmRsZXJQb3NpdGlvbixcbiAgICAgIHRoaXMub3B0aW9ucy5oYW5kbGVyT3B0aW9ucylcbiAgICAgIC5hZGRUbyh0aGlzLl9oYW5kbGVyc0dyb3VwKVxuICAgICAgLm9uKCdtb3VzZWRvd24nLCB0aGlzLl9vblJvdGF0ZVN0YXJ0LCB0aGlzKTtcblxuICAgIHRoaXMuX3JvdGF0aW9uT3JpZ2luID0gbmV3IEwuTGF0TG5nKFxuICAgICAgKHRvcFBvaW50LmxhdCArIGJvdHRvbS5sYXQpIC8gMixcbiAgICAgICh0b3BQb2ludC5sbmcgKyBib3R0b20ubG5nKSAvIDJcbiAgICApO1xuXG4gICAgdGhpcy5faGFuZGxlcnMucHVzaCh0aGlzLl9yb3RhdGlvbk1hcmtlcik7XG4gIH0sXG5cblxuICAvKipcbiAgICogQHJldHVybiB7TC5MYXRMbmd9XG4gICAqL1xuICBfZ2V0Um90YXRpb25PcmlnaW46IGZ1bmN0aW9uKCkge1xuICAgIHZhciBsYXRsbmdzID0gdGhpcy5fcmVjdC5fbGF0bG5nc1swXTtcbiAgICB2YXIgbGIgPSBsYXRsbmdzWzBdO1xuICAgIHZhciBydCA9IGxhdGxuZ3NbMl07XG5cbiAgICByZXR1cm4gbmV3IEwuTGF0TG5nKFxuICAgICAgKGxiLmxhdCArIHJ0LmxhdCkgLyAyLFxuICAgICAgKGxiLmxuZyArIHJ0LmxuZykgLyAyXG4gICAgKTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBTZWN1cmUgdGhlIHJvdGF0aW9uIG9yaWdpblxuICAgKiBAcGFyYW0gIHtFdmVudH0gZXZ0XG4gICAqL1xuICBfb25Sb3RhdGVTdGFydDogZnVuY3Rpb24oZXZ0KSB7XG4gICAgdmFyIG1hcCA9IHRoaXMuX21hcDtcblxuICAgIG1hcC5kcmFnZ2luZy5kaXNhYmxlKCk7XG5cbiAgICB0aGlzLl9vcmlnaW5NYXJrZXIgICAgID0gbnVsbDtcbiAgICB0aGlzLl9yb3RhdGlvbk9yaWdpblB0ID0gbWFwLmxhdExuZ1RvTGF5ZXJQb2ludCh0aGlzLl9nZXRSb3RhdGlvbk9yaWdpbigpKTtcbiAgICB0aGlzLl9yb3RhdGlvblN0YXJ0ICAgID0gZXZ0LmxheWVyUG9pbnQ7XG4gICAgdGhpcy5faW5pdGlhbE1hdHJpeCAgICA9IHRoaXMuX21hdHJpeC5jbG9uZSgpO1xuXG4gICAgdGhpcy5fYW5nbGUgPSAwO1xuICAgIHRoaXMuX3BhdGguX21hcFxuICAgICAgLm9uKCdtb3VzZW1vdmUnLCB0aGlzLl9vblJvdGF0ZSwgICAgIHRoaXMpXG4gICAgICAub24oJ21vdXNldXAnLCAgIHRoaXMuX29uUm90YXRlRW5kLCB0aGlzKTtcblxuICAgIHRoaXMuX2NhY2hlUG9pbnRzKCk7XG4gICAgdGhpcy5fcGF0aFxuICAgICAgLmZpcmUoJ3RyYW5zZm9ybXN0YXJ0JywgICB7IGxheWVyOiB0aGlzLl9wYXRoIH0pXG4gICAgICAuZmlyZSgncm90YXRlc3RhcnQnLCB7IGxheWVyOiB0aGlzLl9wYXRoLCByb3RhdGlvbjogMCB9KTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBAcGFyYW0gIHtFdmVudH0gZXZ0XG4gICAqL1xuICBfb25Sb3RhdGU6IGZ1bmN0aW9uKGV2dCkge1xuICAgIHZhciBwb3MgPSBldnQubGF5ZXJQb2ludDtcbiAgICB2YXIgcHJldmlvdXMgPSB0aGlzLl9yb3RhdGlvblN0YXJ0O1xuICAgIHZhciBvcmlnaW4gICA9IHRoaXMuX3JvdGF0aW9uT3JpZ2luUHQ7XG5cbiAgICAvLyByb3RhdGlvbiBzdGVwIGFuZ2xlXG4gICAgdGhpcy5fYW5nbGUgPSBNYXRoLmF0YW4yKHBvcy55IC0gb3JpZ2luLnksIHBvcy54IC0gb3JpZ2luLngpIC1cbiAgICAgICAgICAgICAgICAgIE1hdGguYXRhbjIocHJldmlvdXMueSAtIG9yaWdpbi55LCBwcmV2aW91cy54IC0gb3JpZ2luLngpO1xuXG4gICAgdGhpcy5fbWF0cml4ID0gdGhpcy5faW5pdGlhbE1hdHJpeFxuICAgICAgLmNsb25lKClcbiAgICAgIC5yb3RhdGUodGhpcy5fYW5nbGUsIG9yaWdpbilcbiAgICAgIC5mbGlwKCk7XG5cbiAgICB0aGlzLl91cGRhdGUoKTtcbiAgICB0aGlzLl9wYXRoLmZpcmUoJ3JvdGF0ZScsIHsgbGF5ZXI6IHRoaXMuX3BhdGgsIHJvdGF0aW9uOiB0aGlzLl9hbmdsZSB9KTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBAcGFyYW0gIHtFdmVudH0gZXZ0XG4gICAqL1xuICBfb25Sb3RhdGVFbmQ6IGZ1bmN0aW9uKGV2dCkge1xuICAgIHRoaXMuX3BhdGguX21hcFxuICAgICAgLm9mZignbW91c2Vtb3ZlJywgdGhpcy5fb25Sb3RhdGUsIHRoaXMpXG4gICAgICAub2ZmKCdtb3VzZXVwJywgICB0aGlzLl9vblJvdGF0ZUVuZCwgdGhpcyk7XG5cbiAgICB0aGlzLl9hcHBseSgpO1xuICAgIHRoaXMuX3BhdGguZmlyZSgncm90YXRlZW5kJywgeyBsYXllcjogdGhpcy5fcGF0aCwgcm90YXRpb246IHRoaXMuX2FuZ2xlIH0pO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIEBwYXJhbSAge0V2ZW50fSBldnRcbiAgICovXG4gIF9vblNjYWxlU3RhcnQ6IGZ1bmN0aW9uKGV2dCkge1xuICAgIHZhciBtYXJrZXIgPSBldnQudGFyZ2V0O1xuICAgIHZhciBtYXAgPSB0aGlzLl9tYXA7XG5cbiAgICBtYXAuZHJhZ2dpbmcuZGlzYWJsZSgpO1xuXG4gICAgdGhpcy5fYWN0aXZlTWFya2VyID0gbWFya2VyO1xuXG4gICAgdGhpcy5fb3JpZ2luTWFya2VyID0gdGhpcy5faGFuZGxlcnNbKG1hcmtlci5vcHRpb25zLmluZGV4ICsgMikgJSA0XTtcbiAgICB0aGlzLl9zY2FsZU9yaWdpbiAgPSB0aGlzLl9vcmlnaW5NYXJrZXIuZ2V0TGF0TG5nKCk7XG5cbiAgICB0aGlzLl9pbml0aWFsTWF0cml4ID0gdGhpcy5fbWF0cml4LmNsb25lKCk7XG4gICAgdGhpcy5fY2FjaGVQb2ludHMoKTtcblxuICAgIHRoaXMuX21hcFxuICAgICAgLm9uKCdtb3VzZW1vdmUnLCB0aGlzLl9vblNjYWxlLCAgICB0aGlzKVxuICAgICAgLm9uKCdtb3VzZXVwJywgICB0aGlzLl9vblNjYWxlRW5kLCB0aGlzKTtcbiAgICB0aGlzLl9pbml0aWFsRGlzdCA9IHRoaXMuX29yaWdpbk1hcmtlci5fcG9pbnRcbiAgICAgIC5kaXN0YW5jZVRvKHRoaXMuX2FjdGl2ZU1hcmtlci5fcG9pbnQpO1xuXG4gICAgdGhpcy5fcGF0aFxuICAgICAgLmZpcmUoJ3RyYW5zZm9ybXN0YXJ0JywgeyBsYXllcjogdGhpcy5fcGF0aCB9KVxuICAgICAgLmZpcmUoJ3NjYWxlc3RhcnQnLCB7IGxheWVyOiB0aGlzLl9wYXRoLCBzY2FsZTogTC5wb2ludCgxLCAxKSB9KTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBAcGFyYW0gIHtFdmVudH0gZXZ0XG4gICAqL1xuICBfb25TY2FsZTogZnVuY3Rpb24oZXZ0KSB7XG4gICAgdmFyIG9yaWdpblBvaW50ID0gdGhpcy5fb3JpZ2luTWFya2VyLl9wb2ludDtcbiAgICB2YXIgcmF0aW8gPSBvcmlnaW5Qb2ludC5kaXN0YW5jZVRvKGV2dC5sYXllclBvaW50KSAvIHRoaXMuX2luaXRpYWxEaXN0O1xuXG4gICAgdGhpcy5fc2NhbGUgPSBuZXcgTC5Qb2ludChyYXRpbywgcmF0aW8pO1xuXG4gICAgLy8gdXBkYXRlIG1hdHJpeFxuICAgIHRoaXMuX21hdHJpeCA9IHRoaXMuX2luaXRpYWxNYXRyaXhcbiAgICAgIC5jbG9uZSgpXG4gICAgICAuc2NhbGUocmF0aW8sIG9yaWdpblBvaW50KTtcblxuICAgIHRoaXMuX3VwZGF0ZSgpO1xuICAgIHRoaXMuX3BhdGguZmlyZSgnc2NhbGUnLCB7XG4gICAgICBsYXllcjogdGhpcy5fcGF0aCwgc2NhbGU6IHRoaXMuX3NjYWxlLmNsb25lKCkgfSk7XG4gIH0sXG5cblxuICAvKipcbiAgICogU2NhbGluZyBjb21wbGV0ZVxuICAgKiBAcGFyYW0gIHtFdmVudH0gZXZ0XG4gICAqL1xuICBfb25TY2FsZUVuZDogZnVuY3Rpb24oZXZ0KSB7XG4gICAgdGhpcy5fbWFwXG4gICAgICAub2ZmKCdtb3VzZW1vdmUnLCB0aGlzLl9vblNjYWxlLCAgICB0aGlzKVxuICAgICAgLm9mZignbW91c2V1cCcsICAgdGhpcy5fb25TY2FsZUVuZCwgdGhpcyk7XG5cbiAgICB0aGlzLl9hcHBseSgpO1xuICAgIHRoaXMuX3BhdGguZmlyZSgnc2NhbGVlbmQnLCB7XG4gICAgICBsYXllcjogdGhpcy5fcGF0aCwgc2NhbGU6IHRoaXMuX3NjYWxlLmNsb25lKCkgfSk7XG4gIH0sXG5cblxuICAvKipcbiAgICogQ2FjaGUgY3VycmVudCBoYW5kbGVycyBwb3NpdGlvbnNcbiAgICovXG4gIF9jYWNoZVBvaW50czogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5faGFuZGxlcnNHcm91cC5lYWNoTGF5ZXIoZnVuY3Rpb24obGF5ZXIpIHtcbiAgICAgIGxheWVyLmJyaW5nVG9Gcm9udCgpO1xuICAgIH0pO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLl9oYW5kbGVycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgdmFyIGhhbmRsZXIgPSB0aGlzLl9oYW5kbGVyc1tpXTtcbiAgICAgIGhhbmRsZXIuX2luaXRpYWxQb2ludCA9IGhhbmRsZXIuX3BvaW50LmNsb25lKCk7XG4gICAgfVxuICB9LFxuXG5cbiAgLyoqXG4gICAqIEJvdW5kaW5nIHBvbHlnb25cbiAgICogQHJldHVybiB7TC5Qb2x5Z29ufVxuICAgKi9cbiAgX2dldEJvdW5kaW5nUG9seWdvbjogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX3JlY3RTaGFwZSkge1xuICAgICAgcmV0dXJuIEwuR2VvSlNPTi5nZW9tZXRyeVRvTGF5ZXIoXG4gICAgICAgIHRoaXMuX3JlY3RTaGFwZSwgbnVsbCwgbnVsbCwgdGhpcy5vcHRpb25zLmJvdW5kc09wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IEwuUmVjdGFuZ2xlKFxuICAgICAgICB0aGlzLl9wYXRoLmdldEJvdW5kcygpLCB0aGlzLm9wdGlvbnMuYm91bmRzT3B0aW9ucyk7XG4gICAgfVxuICB9LFxuXG5cbiAgLyoqXG4gICAqIENyZWF0ZSBjb3JuZXIgbWFya2VyXG4gICAqIEBwYXJhbSAge0wuTGF0TG5nfSBsYXRsbmdcbiAgICogQHBhcmFtICB7TnVtYmVyfSAgIHR5cGUgb25lIG9mIEwuSGFuZGxlci5QYXRoU2NhbGUuSGFuZGxlclR5cGVzXG4gICAqIEBwYXJhbSAge051bWJlcn0gICBpbmRleFxuICAgKiBAcmV0dXJuIHtMLkNpcmNsZU1hcmtlcn1cbiAgICovXG4gIF9jcmVhdGVIYW5kbGVyOiBmdW5jdGlvbihsYXRsbmcsIHR5cGUsIGluZGV4KSB7XG4gICAgdmFyIG1hcmtlciA9IG5ldyBMLkNpcmNsZU1hcmtlcihsYXRsbmcsXG4gICAgICBMLlV0aWwuZXh0ZW5kKHRoaXMub3B0aW9ucy5oYW5kbGVyT3B0aW9ucywge1xuICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICBpbmRleDogaW5kZXhcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIG1hcmtlci5vbignbW91c2Vkb3duJywgdGhpcy5fb25TY2FsZVN0YXJ0LCB0aGlzKTtcbiAgICByZXR1cm4gbWFya2VyO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIEhpZGUobm90IHJlbW92ZSkgdGhlIGhhbmRsZXJzIGxheWVyXG4gICAqL1xuICBfaGlkZUhhbmRsZXJzOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9tYXAucmVtb3ZlTGF5ZXIodGhpcy5faGFuZGxlcnNHcm91cCk7XG4gIH0sXG5cblxuICAvKipcbiAgICogSGlkZSBoYW5kbGVycyBhbmQgcmVjdGFuZ2xlXG4gICAqL1xuICBfb25EcmFnU3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2hpZGVIYW5kbGVycygpO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIERyYWcgcmVjdGFuZ2xlLCByZS1jcmVhdGUgaGFuZGxlcnNcbiAgICovXG4gIF9vbkRyYWdFbmQ6IGZ1bmN0aW9uKGV2dCkge1xuICAgIHZhciByZWN0ID0gdGhpcy5fcmVjdDtcbiAgICB2YXIgbWF0cml4ID0gKGV2dC5sYXllciA/IGV2dC5sYXllciA6IHRoaXMuX3BhdGgpLmRyYWdnaW5nLl9tYXRyaXguc2xpY2UoKTtcblxuICAgIGlmICghcmVjdC5kcmFnZ2luZykge1xuICAgICAgcmVjdC5kcmFnZ2luZyA9IG5ldyBMLkhhbmRsZXIuUGF0aERyYWcocmVjdCk7XG4gICAgfVxuICAgIHJlY3QuZHJhZ2dpbmcuZW5hYmxlKCk7XG4gICAgdGhpcy5fbWFwLmFkZExheWVyKHJlY3QpO1xuICAgIHJlY3QuZHJhZ2dpbmcuX3RyYW5zZm9ybVBvaW50cyhtYXRyaXgpO1xuICAgIHJlY3QuZHJhZ2dpbmcuZGlzYWJsZSgpO1xuXG4gICAgdGhpcy5fbWFwLmFkZExheWVyKHRoaXMuX2hhbmRsZXJzR3JvdXApO1xuICAgIHRoaXMuX3VwZGF0ZUhhbmRsZXJzKCk7XG5cbiAgICB0aGlzLl9wYXRoLmZpcmUoJ3RyYW5zZm9ybWVkJywge1xuICAgICAgc2NhbGU6IEwucG9pbnQoMSwgMSksXG4gICAgICByb3RhdGlvbjogMCxcbiAgICAgIG1hdHJpeDogTC5tYXRyaXguYXBwbHkodW5kZWZpbmVkLCBtYXRyaXgpLFxuICAgICAgdHJhbnNsYXRlOiBMLnBvaW50KG1hdHJpeFs0XSwgbWF0cml4WzVdKSxcbiAgICAgIGxheWVyOiB0aGlzLl9wYXRoXG4gICAgfSk7XG4gIH1cbn0pO1xuXG5MLlBhdGguYWRkSW5pdEhvb2soZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLm9wdGlvbnMudHJhbnNmb3JtKSB7XG4gICAgdGhpcy50cmFuc2Zvcm0gPSBuZXcgTC5IYW5kbGVyLlBhdGhUcmFuc2Zvcm0odGhpcywgdGhpcy5vcHRpb25zLnRyYW5zZm9ybSk7XG4gIH1cbn0pO1xuIiwiLyoqXG4gKiBQb2ludCBvbiB0aGUgbGluZSBzZWdtZW50IG9yIGl0cyBleHRlbnRpb25cbiAqXG4gKiBAcGFyYW0gIHtMLlBvaW50fSBzdGFydFxuICogQHBhcmFtICB7TC5Qb2ludH0gZmluYWxcbiAqIEBwYXJhbSAge051bWJlcn0gIGRpc3RQeFxuICogQHJldHVybiB7TC5Qb2ludH1cbiAqL1xuTC5MaW5lVXRpbC5wb2ludE9uTGluZSA9IGZ1bmN0aW9uKHN0YXJ0LCBmaW5hbCwgZGlzdFB4KSB7XG4gIHZhciByYXRpbyA9IDEgKyBkaXN0UHggLyBzdGFydC5kaXN0YW5jZVRvKGZpbmFsKTtcbiAgcmV0dXJuIG5ldyBMLlBvaW50KFxuICAgIHN0YXJ0LnggKyAoZmluYWwueCAtIHN0YXJ0LngpICogcmF0aW8sXG4gICAgc3RhcnQueSArIChmaW5hbC55IC0gc3RhcnQueSkgKiByYXRpb1xuICApO1xufTtcblxuXG4vKipcbiAqIERlZXAgbWVyZ2Ugb2JqZWN0cy5cbiAqL1xuTC5VdGlsLm1lcmdlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBpID0gMTtcbiAgdmFyIGtleSwgdmFsO1xuICB2YXIgb2JqID0gYXJndW1lbnRzW2ldO1xuXG4gIGZ1bmN0aW9uIGlzT2JqZWN0KG9iamVjdCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgT2JqZWN0XSc7XG4gIH1cblxuICAvLyBtYWtlIHN1cmUgd2UgZG9uJ3QgbW9kaWZ5IHNvdXJjZSBlbGVtZW50IGFuZCBpdCdzIHByb3BlcnRpZXNcbiAgLy8gb2JqZWN0cyBhcmUgcGFzc2VkIGJ5IHJlZmVyZW5jZVxuICB2YXIgdGFyZ2V0ID0gYXJndW1lbnRzWzBdO1xuXG4gIHdoaWxlIChvYmopIHtcbiAgICBvYmogPSBhcmd1bWVudHNbaSsrXTtcbiAgICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoaXNPYmplY3QodmFsKSAmJiBpc09iamVjdCh0YXJnZXRba2V5XSkpe1xuICAgICAgICB0YXJnZXRba2V5XSA9IEwuVXRpbC5tZXJnZSh0YXJnZXRba2V5XSwgdmFsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufTtcbiJdfQ==
