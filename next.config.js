/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bos-merchant-images.s3-us-west-1.amazonaws.com',
      },
    ],
  },
}

module.exports = nextConfig
