/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ostazlaw.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
  exclude: ['/admin', '/api/*', '/server-sitemap.xml', '/client-inquiry', '/client-inquiry-result'],
  transform: async (config, path) => {
    let priority = 0.5;
    let changefreq = 'daily';
    if (path === '/') { priority = 1.0; changefreq = 'daily'; }
    else if (path.startsWith('/article/')) { priority = 0.8; changefreq = 'weekly'; }
    else if (path.startsWith('/news/')) { priority = 0.8; changefreq = 'weekly'; }
    else if (['/about', '/specialties', '/contact', '/sectors'].includes(path)) { priority = 0.7; changefreq = 'monthly'; }
    return { loc: path, changefreq, priority, lastmod: new Date().toISOString() };
  },
};
