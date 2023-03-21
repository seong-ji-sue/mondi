/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    scrollRestoration: true,
    externalDir: true
  },
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
