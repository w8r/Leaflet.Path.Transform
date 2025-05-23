import * as L from 'leaflet';
import '.';

L.Icon.Default.imagePath = 'http://cdn.leafletjs.com/leaflet-0.7/images';

////////////////////////////////////////////////////////////////////////////////
const map = (window.map = new L.Map('map', {
  // crs: L.CRS.EPSG4326 // that was tested as well
}).setView([22.42658, 114.1952], 11));

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; ' + '<a href="http://osm.org/copyright">OSM</a> contributors',
}).addTo(map);

////////////////////////////////////////////////////////////////////////////////
function interpolateArr(array, insert) {
  const res = [];
  array.forEach(function (p, i, arr) {
    res.push(p.concat());

    if (i < arr.length - 1) {
      const diff = [arr[i + 1][0] - p[0], arr[i + 1][1] - p[1]];
      for (let i = 1; i < insert; i++) {
        res.push([
          p[0] + (diff[0] * i) / insert,
          p[1] + (diff[1] * i) / insert,
        ]);
      }
    }
  });

  return res;
}

////////////////////////////////////////////////////////////////////////////////
const polyGonLatLong = L.GeoJSON.coordsToLatLngs(
  // ~ 13 000 points
  interpolateArr(
    [
      [113.97697448730469, 22.403410892712124],
      [113.98658752441405, 22.38373008592495],
      [114.01268005371094, 22.369126397545887],
      [114.02778625488281, 22.38563480185718],
      [114.04701232910156, 22.395157990290755],
      [114.06005859375, 22.413567638369805],
      [114.06280517578125, 22.432609534876796],
      [114.04838562011717, 22.444668051657157],
      [114.04289245605469, 22.44847578656544],
      [114.03259277343749, 22.444668051657157],
      [114.01954650878906, 22.447206553211814],
      [113.99620056152344, 22.436417600763114],
      [113.98178100585938, 22.420549970290875],
      [113.97697448730469, 22.403410892712124],
    ],
    1000,
  ),
);
const polygon = (window.polygon = new L.Polygon(polyGonLatLong, {
  color: '#f00',
  interactive: true,
  draggable: true,
  transform: true,
}).addTo(map));
//polygon.transform.enable();

const polylineLatLong = L.GeoJSON.coordsToLatLngs([
  [114.14314270019531, 22.49479484975443],
  [114.1534423828125, 22.485912942320958],
  [114.15206909179688, 22.4732235144781],
  [114.14932250976561, 22.459898363943893],
  [114.15962219238281, 22.447206553211814],
  [114.169921875, 22.447206553211814],
  [114.19395446777344, 22.459898363943893],
  [114.20631408691406, 22.46116748110935],
  [114.21180725097655, 22.473858013487614],
  [114.22416687011719, 22.471320000009992],
  [114.23721313476562, 22.476395980457973],
  [114.24201965332031, 22.49352604073722],
  [114.2303466796875, 22.51572851830351],
  [114.21798706054688, 22.524608511026262],
  [114.20768737792969, 22.524608511026262],
  [114.20768737792969, 22.536024805886974],
]);
const polyline = (window.polyline = new L.Polyline(polylineLatLong, {
  weight: 15,
  draggable: true,
  transform: true,
})
  .bindPopup('L.Polyline')
  .addTo(map));
// polyline.transform.enable();

const rectangleLatLongBounds = L.latLngBounds([
  [22.334833457530486, 114.0154266357422],
  [22.244615500323064, 114.14108276367189],
]);
const rectangle = (window.rectangle = new L.Rectangle(rectangleLatLongBounds, {
  weight: 2,
  draggable: true,
  transform: true,
})
  .bindPopup('L.Rectangle')
  .addTo(map));

const polygonWithHoleLatLong = [
  L.GeoJSON.coordsToLatLngs([
    [114.2749786376953, 22.412932863517717],
    [114.28390502929688, 22.40087159030595],
    [114.29008483886717, 22.38880927045556],
    [114.30107116699219, 22.382460260815716],
    [114.31892395019531, 22.391983666602783],
    [114.32304382324219, 22.380555501421533],
    [114.34295654296875, 22.372936203113838],
    [114.334716796875, 22.384364994133303],
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
    [114.32373046875, 22.477030464933307],
    [114.31961059570312, 22.478933900916928],
    [114.3017578125, 22.466243833549445],
    [114.30244445800781, 22.457360094750083],
    [114.29283142089844, 22.454821779075832],
    [114.28390502929688, 22.45101421842269],
    [114.2749786376953, 22.442764145001707],
    [114.29077148437499, 22.428166659279615],
    [114.27703857421875, 22.420549970290875],
    [114.2749786376953, 22.412932863517717],
  ]),
  L.GeoJSON.coordsToLatLngs([
    [114.30107116699219, 22.43387890178297],
    [114.29351806640625, 22.414202410321302],
    [114.30587768554686, 22.408489358342635],
    [114.32235717773438, 22.421184710331858],
    [114.30107116699219, 22.43387890178297],
  ]),
];
const polygonWithHole = (window.polygonWithHole = new L.Polygon(
  polygonWithHoleLatLong,
  {
    draggable: true,
    transform: true,
  },
).addTo(map));
//polygonWithHole.transform.enable();

const multiPolygonLatLong = [
  L.GeoJSON.coordsToLatLngs([
    [114.20562744140625, 22.32085984100593],
    [114.21592712402344, 22.35261603551215],
    [114.26467895507812, 22.351345926606957],
    [114.2749786376953, 22.32403578584038],
    [114.29214477539062, 22.32721165838893],
    [114.3017578125, 22.311966810977616],
    [114.29420471191406, 22.291002427735325],
    [114.29351806640625, 22.272576585413475],
    [114.28390502929688, 22.26177410097435],
    [114.268798828125, 22.281472122783818],
    [114.2749786376953, 22.294814367780518],
    [114.26948547363281, 22.30243793590448],
    [114.27017211914062, 22.31514295816939],
    [114.2578125, 22.311966810977616],
    [114.24751281738281, 22.299896792751927],
    [114.24545288085938, 22.291002427735325],
    [114.22966003417969, 22.307520083522476],
    [114.22073364257812, 22.305614299837046],
    [114.20562744140625, 22.32085984100593],
  ]),
  L.GeoJSON.coordsToLatLngs([
    [114.31549072265625, 22.33927931468312],
    [114.32029724121094, 22.326576489662482],
    [114.32991027832031, 22.326576489662482],
    [114.33334350585938, 22.332292904091716],
    [114.32304382324219, 22.3424548401465],
    [114.31549072265625, 22.33927931468312],
  ]),
  L.GeoJSON.coordsToLatLngs([
    [114.27909851074219, 22.244615500323064],
    [114.28115844726562, 22.251606295132948],
    [114.28665161132812, 22.255419308858556],
    [114.29969787597656, 22.26113863474449],
    [114.2962646484375, 22.250970782750866],
    [114.29489135742188, 22.24080219246335],
    [114.29008483886717, 22.238895499613232],
    [114.27909851074219, 22.244615500323064],
  ]),
];
const multiPolygon = (window.multiPolygon = new L.Polygon(multiPolygonLatLong, {
  draggable: true,
  transform: true,
  color: '#092',
})
  .bindPopup('MultiPolygon')
  .addTo(map));
//multiPolygon.transform.enable();

const multiPolylineLatLong = [
  L.GeoJSON.coordsToLatLngs([
    [113.89869689941406, 22.399601921706953],
    [113.89801025390625, 22.422454181709707],
    [113.90350341796875, 22.43324421978117],
    [113.90968322753906, 22.449110398886106],
    [113.90693664550781, 22.478299425162852],
    [113.9234161376953, 22.488450688325408],
    [113.9337158203125, 22.483375149789623],
    [113.9447021484375, 22.492257220085193],
    [113.95225524902344, 22.51255695405145],
  ]),

  L.GeoJSON.coordsToLatLngs([
    [113.8677978515625, 22.39261853713738],
    [113.86917114257811, 22.42753195115699],
    [113.9234161376953, 22.462436586653148],
    [113.94813537597656, 22.473858013487614],
    [113.9783477783203, 22.49923558968306],
    [113.99688720703125, 22.51192263246886],
    [114.01336669921875, 22.501138720300254],
    [114.02503967285155, 22.508116641853675],
  ]),
];
const multiPolyline = (window.multiPolyline = new L.Polyline(
  multiPolylineLatLong,
  {
    draggable: true,
    transform: true,
    color: '#e90',
  },
)
  .bindPopup('MultiPolyline')
  .addTo(map));
// multiPolyline.transform.enable();

const layers = [
  polygon,
  polyline,
  rectangle,
  multiPolyline,
  multiPolygon,
  polygonWithHole,
];

function update() {
  L.Util.requestAnimFrame(function () {
    const dragging = document.querySelector('#dragging').checked;
    const scaling = document.querySelector('#scaling').checked;
    const rotation = document.querySelector('#rotation').checked;
    const uniform = document.querySelector('#uniform').checked;

    layers.forEach(function (layer) {
      if (layer.dragging) {
        layer.dragging[dragging ? 'enable' : 'disable']();
      } else {
        layer.eachLayer(function (sublayer) {
          sublayer.dragging[dragging ? 'enable' : 'disable']();
        });
      }

      layer.transform
        .setOptions({
          scaling: scaling,
          rotation: rotation,
          uniformScaling: uniform,
        })
        .enable();
    });
  });
}

function init() {
  update();
  const resetButton = document.querySelector('#reset-button');
  resetButton.addEventListener('click', function () {
    polygon.setLatLngs(polyGonLatLong);
    polyline.setLatLngs(polylineLatLong);
    rectangle.setBounds(rectangleLatLongBounds);
    multiPolyline.setLatLngs(multiPolylineLatLong);
    multiPolygon.setLatLngs(multiPolygonLatLong);
    polygonWithHole.setLatLngs(polygonWithHoleLatLong);
    layers.forEach(function (layer) {
      layer.transform.reset();
    });
  });
}

[].slice
  .call(document.querySelectorAll('input[type=checkbox]'))
  .forEach(function (checkbox) {
    L.DomEvent.on(checkbox, 'change', update);
  });

init();
