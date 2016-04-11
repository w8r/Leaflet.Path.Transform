# Leaflet.Path.Transform [![npm version](https://badge.fury.io/js/leaflet-path-transform.svg)](https://badge.fury.io/js/leaflet-path-transform)

Drag/rotate/resize handler for [leaflet](http://leafletjs.com) vector features.

![screenshot 2016-03-21 15 31 48](https://cloud.githubusercontent.com/assets/26884/13921863/4470b97c-ef7a-11e5-8ea2-46161fffaedd.png)

Includes [L.Path.Drag](https://github.com/w8r/Leaflet.Path.Drag), so you don't
need to include it once again.

### Requirements

Leaflet 0.7.3 +

For `Leaflet@^1.0.0` support, see `leaflet-1.0` branch and `1.0.0x` npm versions

### API
```shell
npm install leaflet-path-transform --save
```
or include `dist/L.Path.Transform.js` file

```js
require('leaflet-path-transform');

var map = L.map('map-canvas').setView(center, zoom);
var polygon = L.polygon([..., ...], { transform: true }).addTo(map);

polygon.transform.enable();
// or partially:
polygon.transform.enable({rotation: true, scaling: false});
// or, on an already enabled handler:
polygon.transform.setOptions({rotation: true, scaling: false});
```

### `options`

* **`options.handlerOptions`** - **<[Path_options](http://leafletjs.com/reference.html#path-options)>** - edge markers options
* **`options.boundsOptions`** - **<[Polyline_options](http://leafletjs.com/reference.html#polyline-options)>** - bounding rectangle options
* **`options.rotateHandleOptions`** - **<[Polyline_options](http://leafletjs.com/reference.html#polyline-options)>** - rotation handle line styles
* **`options.handleLength`** - **Number** - Length of the rotation handle in pixels. Defaults to 20.


### Events

Following events are fired on the transformed layer

* **`rotatestart`, `rotate`, `rotateend`** - `{ rotation: <Radians> }`
* **`scalestart`, `scale`, `scaleend`** - `{ scale: <L.Point> }`
* **`transformstart`, `transform`, `transformed`** - `{ rotation: ..., scale: ..., matrix: <L.Matrix> }`


### Dragging

To control features dragging, see
[L.Path.Drag docs](https://github.com/w8r/Leaflet.Path.Drag).

```js
polygon.dragging.disable();
polygon.dragging.enable();
```



### TODO

 - [ ] Tests
 - [ ] Precision fix for rotation
 - [x] Leaflet 1.x support
 - [x] [Leaflet.Editable](https://github.com/Leaflet/Leaflet.Editable) adapter - [Leaflet.Editable.Drag](https://github.com/w8r/Leaflet.Editable.Drag)
 - [ ] [Leaflet.draw](https://github.com/Leaflet/Leaflet.draw) adapter
 - [ ] Canvas renderer support

### License

 Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
