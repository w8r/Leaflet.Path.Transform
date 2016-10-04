import tape from 'tape';
import L from 'leaflet';
import utils from '../src/Util';

tape('Utils', (t) => {

  t.test('L.LineUtil.pointOnLine', (t) => {
    const start = L.point(0,0);
    const end = L.point(10, 10);
    t.ok(L.LineUtil.pointOnLine(start, end, -7).round().equals(L.point(5,5)));
    t.end();
  });

  t.test('L.Util.merge', (t) => {
    t.deepEquals(L.Util.merge({}, {
      a: 2,
      b: {
        c: 1
      },
      e: 3
    }, {
      a: false,
      b: {
        d: 2
      }
    }), {
      a: false,
      b: {
        c: 1,
        d: 2
      },
      e: 3
    });
    t.end();
  });

  t.end();
});
