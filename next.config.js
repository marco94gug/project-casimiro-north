/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // domains: ['images.musement.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.musement.com',
      }
    ],
  }
}

module.exports = nextConfig
