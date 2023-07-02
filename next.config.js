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
};
