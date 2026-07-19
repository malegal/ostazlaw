import Link from 'next/link';
import NewsCard from './NewsCard';

export default function NewsSection({ news }) {
  const hasNews = news && news.length > 0;
  const latestNews = hasNews ? news.slice(0, 3) : [];

  return (
    <section className="section" aria-label="أخبار وإنجازات المؤسسة">
      <div className="container">
        <span className="section-tag">● أخبار المؤسسة</span>
        <h2>آخر الأخبار والمستجدات</h2>
        <p className="section-sub">
          نوافيكم بأحدث ما توصلنا إليه من أحكام، مشاركات مجتمعية، وتطورات مكتبنا القانوني.
        </p>

        {hasNews ? (
          <div className="news-grid">
            {latestNews.map((item) => (
              <NewsCard key={item.slug} news={item} />
            ))}
          </div>
        ) : (
          <div className="news-placeholder">
            <div className="news-placeholder-icon">📢</div>
            <h3>جارٍ إعداد وتجهيز قسم الأخبار</h3>
            <p>
              نعمل حاليًا على تجهيز قسم الأخبار بأحدث المستجدات والإنجازات القانونية.
              <br />
              <strong>سيتم نشر الخبر الأول قريباً، وعندها سيختفي هذا التنبيه تلقائياً.</strong>
            </p>
            <span className="news-placeholder-badge">قريباً</span>
          </div>
        )}

        <div className="section-cta">
          <Link href="/news-archive" className="btn-outline-gold">
            أرشيف الأخبار والإنجازات
          </Link>
        </div>
      </div>

      <style jsx>{`
        .section {
          padding: 4rem 0;
        }
        .section-tag {
          display: inline-block;
          color: var(--matte-gold-light, #D4AF37);
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 2px;
          margin-bottom: 0.5rem;
        }
        .section h2 {
          font-size: clamp(1.8rem, 3vw, 2.8rem);
          font-weight: 700;
          color: var(--charcoal, #1A1A1A);
          margin-bottom: 0.5rem;
        }
        .section-sub {
          font-size: 1.1rem;
          color: var(--text-secondary, #2D2D2D);
          opacity: 0.85;
          max-width: 600px;
          margin-bottom: 2rem;
        }
        .section-cta {
          margin-top: 2rem;
          text-align: center;
        }
        .btn-outline-gold {
          display: inline-block;
          padding: 0.8rem 2rem;
          background: transparent;
          color: var(--matte-gold-light, #D4AF37);
          font-weight: 700;
          border-radius: 8px;
          border: 2px solid var(--matte-gold-light, #D4AF37);
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .btn-outline-gold:hover,
        .btn-outline-gold:focus-visible {
          background: var(--matte-gold-light, #D4AF37);
          color: #0B111B;
        }

        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .news-placeholder {
          background: white;
          padding: 3rem 2rem;
          border-radius: 16px;
          text-align: center;
          border: 2px dashed var(--matte-gold-light, #D4AF37);
          max-width: 600px;
          margin: 0 auto;
        }
        .news-placeholder-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .news-placeholder h3 {
          font-size: 1.4rem;
          color: var(--deep-navy, #102A43);
          margin-bottom: 0.5rem;
        }
        .news-placeholder p {
          color: var(--text-secondary, #2D2D2D);
          opacity: 0.85;
          line-height: 1.8;
        }
        .news-placeholder-badge {
          display: inline-block;
          margin-top: 1rem;
          padding: 0.3rem 1.5rem;
          background: var(--matte-gold-light, #D4AF37);
          color: #0B111B;
          font-weight: 700;
          border-radius: 20px;
          font-size: 0.8rem;
        }
      `}</style>
    </section>
  );
}
