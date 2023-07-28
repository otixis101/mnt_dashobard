/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // setting this for testing purposes
    domains: [
      "images.pexels.com",
      "avatars.githubusercontent.com",
      "mnt-core-bucket.s3.eu-north-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
