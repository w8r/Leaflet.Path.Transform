import { defineConfig } from 'vite';

const extensions = {
  es: 'mjs',
  cjs: 'cjs',
  umd: 'js',
};

const banner = `/**
* Drag/rotate/resize handler for [leaflet](http://leafletjs.com) vector features.
*
* @author Alexander Milevski <info@w8r.name>
* @license MIT
* @preserve
*/
`;

export default defineConfig({
  build: {
    lib: {
      formats: ['es', 'umd', 'cjs'],
      entry: 'src/index.mjs',
      name: require('./package.json').name,
      fileName: (format) => `index.${extensions[format]}`,
    },
    rollupOptions: {
      external: ['leaflet'],
      output: {
        banner,
        name: 'PathTransform',
        globals: { leaflet: 'L' },
      },
    },
  },
  server: {
    open: true,
  },
});
