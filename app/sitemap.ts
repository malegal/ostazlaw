import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ostazlaw.vercel.app';
  const pages = [
    '',
    '/about',
    '/specialties',
    '/sectors',
    '/contact',
    '/blog',
    '/news-archive',
    '/client-inquiry',
    '/client-inquiry-result',
  ];
  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === '' ? 'weekly' : 'monthly',
    priority: page === '' ? 1 : 0.8,
  }));
}
