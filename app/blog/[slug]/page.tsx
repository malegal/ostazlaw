import { getArticle, getArticles } from '@/app/lib/github';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map(article => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: 'المقال غير موجود' };
  return {
    title: article.meta.title,
    description: article.meta.description,
    openGraph: {
      title: article.meta.title,
      description: article.meta.description,
      images: article.meta.image ? [{ url: article.meta.image }] : [],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const { meta, content } = article;
  const html = marked(content);
  const sanitizedHtml = DOMPurify.sanitize(html);

  return (
    <div className="article-wrapper">
      <div className="article-header-info">
        <div className="meta-row">
          <span><i className="fas fa-user" style={{ marginLeft: '6px', color: 'var(--matte-gold)' }}></i> {meta.author || 'الأستاذ / محمود عبد الحميد'}</span>
          <span className="divider"></span>
          <span><i className="far fa-calendar-alt" style={{ marginLeft: '6px', color: 'var(--matte-gold)' }}></i> {meta.date ? new Date(meta.date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }) : 'غير محدد'}</span>
          <span className="divider"></span>
          <span><i className="far fa-clock" style={{ marginLeft: '6px', color: 'var(--matte-gold)' }}></i> {Math.ceil(content.split(/\s+/).length / 200) || 1} دقائق قراءة</span>
        </div>
      </div>

      <h1 className="article-title">{meta.title}</h1>

      {meta.image && (
        <div className="article-image">
          <img src={meta.image} alt={meta.title} loading="lazy" />
        </div>
      )}

      {meta.description && (
        <div className="article-intro">
          <span className="intro-label"><i className="fas fa-asterisk"></i> موجز المقال</span>
          <p>{meta.description}</p>
        </div>
      )}

      <div className="article-body" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />

      {meta.seoKeyword || (meta.tags && meta.tags.length > 0) && (
        <div className="seo-footer">
          <h4><i className="fas fa-search"></i> الكلمات المفتاحية والوسوم</h4>
          {meta.seoKeyword && (
            <div>
              <span className="seo-label"><i className="fas fa-key" style={{ marginLeft: '6px' }}></i> الكلمة المفتاحية:</span>
              <span className="seo-keyword">{meta.seoKeyword}</span>
            </div>
          )}
          {meta.tags && meta.tags.length > 0 && (
            <div style={{ marginTop: '0.5rem' }}>
              <span className="seo-label"><i className="fas fa-tags" style={{ marginLeft: '6px' }}></i> الوسوم:</span>
              {meta.tags.map(tag => (
                <span key={tag} className="seo-tag">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(34,34,34,0.05)' }}>
        <Link href="/blog" className="btn-outline-gold" style={{ display: 'inline-block', border: '2px solid var(--matte-gold)', color: 'var(--matte-gold)', padding: '0.6rem 2rem', borderRadius: '8px', fontWeight: 600 }}>
          <i className="fas fa-arrow-right" style={{ marginLeft: '6px' }}></i> العودة إلى المكتبة
        </Link>
      </div>

      <div className="article-cta">
        <h3>هل لديك تساؤل قانوني حول هذا الموضوع؟</h3>
        <p>يمكنك الحصول على استشارة قانونية دقيقة ومباشرة من الأستاذ محمود عبد الحميد</p>
        <Link href="/contact?tab=consult" className="btn-gold">احجز استشارتك الآن</Link>
      </div>
    </div>
  );
}
