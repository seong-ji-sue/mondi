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
    KAKAO_JS_KEY: process.env.KAKAO_JS_KEY,
    KAKAO_REDIRECT_URI: process.env.KAKAO_REDIRECT_URI,
  },
  async rewrites() {
    return [
      {
        source: '/app/:path*',
        destination: 'https://app.surveydeal.co.kr/:path*',
      },
    ]
  },
}

module.exports = nextConfig
