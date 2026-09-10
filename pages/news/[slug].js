import Layout from '../../components/Layout';
import Head from 'next/head';
import Link from 'next/link';
import { getAllNews, getNewsBySlug } from '../../lib/github';
import { remark } from 'remark';
import html from 'remark-html';
import { useState, useEffect } from 'react';
import Icon from '../../components/Icon';
import { SITE_NAME, absoluteUrl } from '../../lib/seo';

export default function NewsPage({ news, contentHtml }) {
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => { if (e.key === 'Escape') setShareOpen(false); };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  if (!news) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <h1 style={{ fontSize: '3rem', color: '#dc2626' }}>404</h1>
          <p style={{ fontSize: '1.2rem' }}>⚠️ الخبر غير موجود أو تم حذفه.</p>
          <Link href="/news-archive" className="btn-gold" style={{ display: 'inline-block', marginTop: '1.5rem' }}>العودة إلى أرشيف الأخبار</Link>
        </div>
      </Layout>
    );
  }

  const newsUrl = `https://ostazlaw.vercel.app/news/${encodeURIComponent(news.slug)}`;
  const newsDescription = news.description || `اقرأ خبر ${news.title} من ${SITE_NAME}.`;
  const newsImage = absoluteUrl(news.image);
  const publishedDate = news.date || undefined;

  return (
    <Layout>
      <Head>
        <title>{news.title} | أخبار مؤسسة جاد الرب</title>
        <meta name="description" content={newsDescription} />
        <meta property="og:title" content={news.title} />
        <meta property="og:description" content={newsDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={newsImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={news.title} />
        <meta property="og:image:type" content="image/jpeg" />
        <link rel="canonical" href={newsUrl} />
        <meta property="og:url" content={newsUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={news.title} />
        <meta name="twitter:description" content={newsDescription} />
        <meta name="twitter:image" content={newsImage} />
        {publishedDate && <meta property="article:published_time" content={publishedDate} />}
        {publishedDate && <meta property="article:modified_time" content={publishedDate} />}
        <meta property="article:author" content={news.author || 'محمود عبد الحميد'} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "mainEntityOfPage": { "@type": "WebPage", "@id": newsUrl },
            "headline": news.title,
            "description": newsDescription,
            "image": [newsImage],
            "datePublished": publishedDate,
            "dateModified": publishedDate,
            "author": { "@type": "Person", "name": news.author || 'محمود عبد الحميد' },
            "publisher": { "@type": "Organization", "name": SITE_NAME, "logo": { "@type": "ImageObject", "url": 'https://ostazlaw.vercel.app/icon-512.png' } },
            "inLanguage": "ar-EG"
          })
        }} />
      </Head>

      <div className="article-wrapper">
        <div className="article-header-info">
          <div className="meta-row">
            <span><Icon name="calendar-alt" style={{ marginLeft: '6px', color: 'var(--matte-gold)' }} /> {news.date ? new Date(news.date).toLocaleDateString('ar-EG') : ''}</span>
          </div>
        </div>
        <h1 className="article-title">{news.title}</h1>
        {news.image && (
          <div className="article-image">
            <img src={news.image} alt={news.title} loading="lazy" />
          </div>
        )}
        <div className="article-body" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/news-archive" className="btn-outline-gold">العودة للأخبار</Link>
        </div>
      </div>

      <style jsx>{`
        .article-wrapper { max-width: 820px; margin: 0 auto; padding: 120px 1.5rem 4rem; }
        .article-title { font-size: clamp(2rem, 5vw, 3rem); text-align: center; margin-bottom: 2rem; color: var(--deep-navy); }
        .article-body { line-height: 2.2; font-size: 1.15rem; color: var(--charcoal); }
        .meta-row { display: flex; justify-content: center; gap: 1.5rem; color: #666; margin-bottom: 1rem; }
        .btn-outline-gold { border: 2px solid var(--matte-gold); color: var(--matte-gold); padding: 0.6rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600; }
      `}</style>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const newsItems = await getAllNews();
    const paths = newsItems.map((n) => ({ params: { slug: n.slug } }));
    return { paths, fallback: 'blocking' };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  try {
    const news = await getNewsBySlug(params.slug);
    if (!news) { return { notFound: true }; }
    const processed = await remark().use(html).process(news.content || '');
    const contentHtml = processed.toString();
    return { props: { news, contentHtml }, revalidate: 60 };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return { notFound: true };
  }
}
