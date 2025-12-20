/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is now stable in Next.js 14, no need for experimental.appDir
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'peerly.io',
        port: '',
        pathname: '/favicon.ico',
      },
    ],
  },
}

module.exports = nextConfig