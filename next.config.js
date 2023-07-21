/** @type {import('next').NextConfig} */
require("dotenv").config();
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
  env: {
    NEXT_PUBLIC_WORDPRESS_SITE_URL: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    WC_CONSUMER_KEY: process.env.WC_CONSUMER_KEY,
    WC_CONSUMER_SECRET: process.env.WC_CONSUMER_SECRET,
  },
};
