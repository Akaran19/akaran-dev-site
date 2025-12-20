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
      {
        protocol: 'https',
        hostname: 'akaran19.github.io',
        port: '',
        pathname: '/LUBS2850_flashcards/rapid-recall-favicon.svg',
      },
    ],
  },
}

module.exports = nextConfig