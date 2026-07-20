/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com', 'github.com'],
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/article.html',
        destination: '/article/:slug',
        permanent: true,
      },
      {
        source: '/news.html',
        destination: '/news/:slug',
        permanent: true,
      },
    ];
  },
  // تحسين الأداء
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
};

module.exports = nextConfig;
