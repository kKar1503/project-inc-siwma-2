/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin');
const path = require('node:path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // TODO: To change back to true when all socket server is done
  reactStrictMode: false,
  transpilePackages: ['@inc/db'],
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  typescript: {
    ignoreBuildErrors: process.env.NEXT_BUILD_OPTION === 'ignoreType',
  },
  eslint: {
    ignoreDuringBuilds: process.env.NEXT_ESLINT_OPTION === 'ignoreLint',
  },
  output: 'standalone',
  outputFileTracing: process.env.NODE_ENV === 'production',
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // eslint-disable-next-line no-param-reassign
      config.resolve.fallback = { ...config.resolve.fallback, fs: false };
    }

    if (isServer) {
      config.plugins.push(new PrismaPlugin());
    }

    config.module.rules.push({
      test: /\.html$/,
      loader: 'html-loader',
    });

    return config;
  },
  images: {
    domains:
      process.env.NODE_ENV === 'development'
        ? [
          'images.unsplash.com',
          'via.placeholder.com',
          'source.unsplash.com',
          'rvndpcxlgtqfvrxhahnm.supabase.co',
          'www.google.com',
          'www.asiamediajournal.com',
          'via.placeholder.com',
          'siwma.org.sg',
          's3.ap-southeast-1.amazonaws.com',
        ]
        : [],
  },
  resolve: {
    alias: {
      'aws-crt': path.resolve(__dirname, '../../node_modules/.pnpm/aws-crt'),
    },
  },
};

module.exports = nextConfig;
