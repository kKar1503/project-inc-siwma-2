const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');

esbuild
  .build({
    entryPoints: ['./index.ts'],
    outfile: './dist/index.js',
    bundle: true,
    minify: true,
    platform: 'node',
    sourcemap: true,
    target: 'node18',
    plugins: [nodeExternalsPlugin()],
  })
  .catch(() => process.exit(1));
