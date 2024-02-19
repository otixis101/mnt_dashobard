/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // setting this for testing purposes
    domains: [
      "images.pexels.com",
      "mnt-core-bucket.s3.eu-north-1.amazonaws.com",
      "avatars.githubusercontent.com",
      "mnt-core-bucket-production.s3.us-east-2.amazonaws.com",
    ],
  },
  async headers() {
    return [
      {
        source: "/account",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups", // "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
          {
            key: "Secure-Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "credentialless",
          },
        ],
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig;
