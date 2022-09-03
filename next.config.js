// /** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['sangw.in', 'localhost', 'picsum.photos'], // <== Domain name
  },
  swcMinify: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };

    return config;
  },
};