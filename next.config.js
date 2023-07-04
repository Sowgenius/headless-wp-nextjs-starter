/** @type {import('next').NextConfig} */
const path = require("path");
const allowedImageWordPressDomain = new URL(
  process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL
).hostname;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  trailingSlash: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: [
      allowedImageWordPressDomain,
      "via.placeholder.com",
      "secure.gravatar.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Adjust this value according to your requirements
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Requested-With, Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};
