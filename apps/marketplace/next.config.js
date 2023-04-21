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
    domains: [
      'images.unsplash.com',
      'via.placeholder.com',
      'source.unsplash.com',
      'rvndpcxlgtqfvrxhahnm.supabase.co',
      'www.google.com',
      'www.asiamediajournal.com',
      'via.placeholder.com',
    ],
  },
};

module.exports = nextConfig;
