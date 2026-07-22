/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com', 'github.com'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  // إضافة output: 'standalone' لتحسين النشر
  output: 'standalone',
  // تحسين تجميع CSS
  experimental: {
    optimizeCss: true,
  },
  // إزالة redirects نهائياً
  async redirects() {
    return [];
  },
};

module.exports = nextConfig;
