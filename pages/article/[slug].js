import Layout from '../../components/Layout';
import Head from 'next/head';
import Link from 'next/link';
import { getAllArticles, getArticleBySlug } from '../../lib/github';
import { remark } from 'remark';
import html from 'remark-html';
import { useState, useEffect } from 'react';
import Icon from '../../components/Icon';
import { SITE_NAME, absoluteUrl } from '../../lib/seo';

export default function ArticlePage({ article, contentHtml }) {
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => { if (e.key === 'Escape') setShareOpen(false); };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  if (!article) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <h1 style={{ fontSize: '3rem', color: '#dc2626' }}>404</h1>
          <p style={{ fontSize: '1.2rem' }}>⚠️ المقال غير موجود أو تم حذفه.</p>
          {/* العودة إلى الصفحة الموحّدة تضمن استمرار التصفح حتى عند عرض حالة المقال غير الموجود. */}
          <Link href="/news-archive" className="btn-gold" style={{ display: 'inline-block', marginTop: '1.5rem' }}>العودة إلى المكتبة</Link>
        </div>
      </Layout>
    );
  }

  const articleUrl = `https://ostazlaw.vercel.app/article/${encodeURIComponent(article.slug)}`;
  const articleDescription = article.description || `اقرأ مقال ${article.title} من ${SITE_NAME}.`;
  const articleImage = absoluteUrl(article.image);
  const publishedDate = article.date || undefined;

  return (
    <Layout>
      <Head>
        <title>{article.title} | مؤسسة جاد الرب للمحاماة والاستشارات القانونية</title>
        <meta name="description" content={articleDescription} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={articleDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={articleImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={article.title} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={articleDescription} />
        <meta name="twitter:image" content={articleImage} />
        <link rel="canonical" href={articleUrl} />
        <meta property="og:url" content={articleUrl} />
        {publishedDate && <meta property="article:published_time" content={publishedDate} />}
        {publishedDate && <meta property="article:modified_time" content={publishedDate} />}
        <meta property="article:author" content={article.author || 'محمود عبد الحميد جاد الرب'} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "mainEntityOfPage": { "@type": "WebPage", "@id": articleUrl },
            "headline": article.title,
            "description": articleDescription,
            "image": [articleImage],
            "datePublished": publishedDate,
            "dateModified": publishedDate,
            "author": { "@type": "Person", "name": article.author || 'محمود عبد الحميد جاد الرب' },
            "publisher": { "@type": "Organization", "name": SITE_NAME, "logo": { "@type": "ImageObject", "url": 'https://ostazlaw.vercel.app/icon-512.png' } },
            "inLanguage": "ar-EG"
          })
        }} />
      </Head>

      <div className="article-wrapper">
        <div className="article-header-info">
          <div className="meta-row">
            <span><Icon name="user" style={{ marginLeft: '6px', color: 'var(--matte-gold)' }} /> <span style={{ fontWeight: 700 }}>{article.author || 'محمود عبد الحميد جاد الرب'}</span></span>
            <span className="divider"></span>
            <span><Icon name="calendar-alt" style={{ marginLeft: '6px', color: 'var(--matte-gold)' }} /> {article.date ? new Date(article.date).toLocaleDateString('ar-EG') : ''}</span>
          </div>
        </div>
        <h1 className="article-title">{article.title}</h1>
        {article.image && (
          <div className="article-image">
            <img src={article.image} alt={article.title} loading="lazy" />
          </div>
        )}
        <div className="article-body" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          {/* رابط الرجوع الموحد يحافظ على رحلة المستخدم بعد دمج الأخبار والمكتبة. */}
          <Link href="/news-archive" className="btn-outline-gold">العودة للمكتبة</Link>
        </div>
      </div>

      <style jsx>{`
        .article-wrapper { max-width: 820px; margin: 0 auto; padding: 120px 1.5rem 4rem; }
        .article-title { font-size: clamp(2rem, 5vw, 3rem); text-align: center; margin-bottom: 2rem; color: var(--deep-navy); }
        .article-body { line-height: 2.2; font-size: 1.15rem; color: var(--charcoal); }
        .meta-row { display: flex; justify-content: center; gap: 1.5rem; color: #666; margin-bottom: 1rem; }
        .divider { width: 1px; height: 20px; background: #ddd; }
        .btn-outline-gold { border: 2px solid var(--matte-gold); color: var(--matte-gold); padding: 0.6rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600; }
      `}</style>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const articles = await getAllArticles();
    const paths = articles.map((a) => ({ params: { slug: a.slug } }));
    return { paths, fallback: 'blocking' };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  try {
    const decodedSlug = decodeURIComponent(params.slug);
    let article = await getArticleBySlug(decodedSlug);
    if (!article) { article = await getArticleBySlug(params.slug); }
    if (!article) { return { notFound: true }; }
    const processed = await remark().use(html).process(article.content || '');
    const contentHtml = processed.toString();
    return { props: { article, contentHtml }, revalidate: 60 };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return { notFound: true };
  }
}
