// /** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'blooming-temple-53462.herokuapp.com',
      'localhost',
      'herokuapp.com',
    ], // <== Domain name
  },
  swcMinify: true,
  webpack: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };

    return config;
  },
};
