/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    scrollRestoration: true,
  },
  compiler: {
    styledComponents: true
  },
  env: {
    GA_ID: process.env.GA_ID,
  },
}

module.exports = nextConfig
