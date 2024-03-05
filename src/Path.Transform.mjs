import { Path } from 'leaflet';
import { Transform } from './Handler.mjs';

Path.addInitHook(function () {
  if (this.options.transform) {
    this.transform = new Transform(this, this.options.transform);
  }
});

export { Transform };
