/**
 * Point on the line segment or its extention
 *
 * @param  {L.Point} start
 * @param  {L.Point} final
 * @param  {Number}  distPx
 * @return {L.Point}
 */
export const pointOnLine = (start, final, distPx) => {
  var ratio = 1 + distPx / start.distanceTo(final);
  return new L.Point(
    start.x + (final.x - start.x) * ratio,
    start.y + (final.y - start.y) * ratio,
  );
};

/**
 * Deep merge objects.
 */
export const merge = (...args) => {
  var i = 1;
  var key, val;
  var obj = args[i];

  function isObject(object) {
    return Object.prototype.toString.call(object) === '[object Object]';
  }

  // make sure we don't modify source element and it's properties
  // objects are passed by reference
  var target = args[0];

  while (obj) {
    obj = args[i++];
    for (key in obj) {
      if (!obj.hasOwnProperty(key)) {
        continue;
      }

      val = obj[key];

      if (isObject(val) && isObject(target[key])) {
        target[key] = L.PathTransform.merge(target[key], val);
      } else {
        target[key] = val;
      }
    }
  }
  return target;
};
