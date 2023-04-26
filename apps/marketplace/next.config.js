const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  typescript: {
    ignoreBuildErrors: process.env.NEXT_BUILD_OPTION === 'ignoreType',
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
          ]
        : [],
  },
  webpack: (config, { isServer }) => {
    const modifiedConfig = config;

    if (isServer) {
      modifiedConfig.plugins = [...config.plugins, new PrismaPlugin()];
    }

    return modifiedConfig;
  },
};

module.exports = nextConfig;
