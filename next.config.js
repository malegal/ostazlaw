/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com', 'github.com', 'ostazlaw.vercel.app'],
    unoptimized: false,
  },
  async redirects() {
    return [
      {
        source: '/article.html',
        has: [
          {
            type: 'query',
            key: 'slug',
            value: '(?<slug>.*)',
          },
        ],
        destination: '/article/:slug',
        permanent: true,
      },
      {
        source: '/news.html',
        has: [
          {
            type: 'query',
            key: 'slug',
            value: '(?<slug>.*)',
          },
        ],
        destination: '/news/:slug',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
