/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dwarf.dk',
        port: '',
      },
    ],
  },
  
}


module.exports = nextConfig
