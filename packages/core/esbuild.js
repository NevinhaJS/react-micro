const { build } = require('esbuild');
const { peerDependencies } = require('./package.json');
const { Generator } = require('npm-dts');

new Generator({
  entry: 'src/index.ts',
  output: 'dist/index.d.ts',
}).generate();

const sharedConfig = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  sourcemap: true,
  minify: true,
  external: Object.keys(peerDependencies),
  watch: {
    onRebuild(err, result) {
      if (err) console.error('error');
      else {
        console.log(`\n some files have changed.`);
        console.log(result);
      }
    },
  },
};

build({
  ...sharedConfig,
  platform: 'node', // for CJS
  outfile: 'dist/index.js',
});

build({
  ...sharedConfig,
  outfile: 'dist/index.esm.js',
  platform: 'neutral', // for ESM
  format: 'esm',
});
