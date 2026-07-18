/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com', 'github.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
  // تحسين الضغط
  compress: true,
  // تمكين التحسينات التلقائية
  swcMinify: true,
};

module.exports = nextConfig;
