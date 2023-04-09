/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    scrollRestoration: true,
  },
  compiler: {
    styledComponents: true
  }
}

module.exports = nextConfig
