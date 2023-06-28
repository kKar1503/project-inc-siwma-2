const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');

esbuild
  .build({
    entryPoints: ['./src/server.ts'],
    outdir: './dist',
    bundle: true,
    platform: 'node',
    sourcemap: true,
    target: 'node18',
    plugins: [nodeExternalsPlugin()],
  })
  .catch(() => process.exit(1));
