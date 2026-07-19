/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ostazlaw.vercel.app',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/404', '/500', '/client-inquiry-result', '/article/*', '/news/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/client-inquiry-result', '/api/*', '/_next/*'],
      },
    ],
    additionalSitemaps: [
      'https://ostazlaw.vercel.app/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // تعيين أولوية مخصصة للصفحات الرئيسية
    const priorityMap = {
      '/': 1.0,
      '/about': 0.9,
      '/specialties': 0.9,
      '/sectors': 0.9,
      '/news-archive': 0.8,
      '/blog': 0.8,
      '/contact': 0.9,
      '/client-inquiry': 0.7,
    };
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorityMap[path] || config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
