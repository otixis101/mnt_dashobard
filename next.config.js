/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // setting this for testing purposes
    domains: [
      "images.pexels.com",
      "mnt-core-bucket.s3.eu-north-1.amazonaws.com",
      "avatars.githubusercontent.com"
    ],
  },
  async headers() {
    return [
      {
        source: "/dashboard/account",
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
            value: "credentialless"
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;