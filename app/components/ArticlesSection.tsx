import { getArticles } from '@/app/lib/github';
import Link from 'next/link';

export default async function ArticlesSection() {
  const articles = await getArticles();
  const latest = articles.slice(0, 3);

  return (
    <section className="section section-light" aria-label="المكتبة القانونية">
      <div className="section-inner">
        <div className="section-head reveal">
          <span className="eyebrow">● المكتبة القانونية</span>
          <h2>أحدث المقالات القانونية</h2>
          <p>اطلع على أحدث ما ننشره في مجال القانون المصري.</p>
        </div>

        <div className="blog-grid">
          {latest.length === 0 ? (
            <div className="col-span-full text-center text-charcoal/50 py-10">لا توجد مقالات حالياً.</div>
          ) : (
            latest.map((article, index) => (
              <div key={article.slug} className="blog-card reveal" style={{ transitionDelay: `${index * 0.08}s` }}>
                <div className="card-body">
                  <span className="badge">دراسة قانونية</span>
                  <h3>{article.title}</h3>
                  <div className="meta">
                    <span>
                      <i className="far fa-clock" style={{ marginLeft: '4px' }}></i> {Math.ceil(article.title.length / 50) || 1} دقائق قراءة
                    </span>
                    {article.date && (
                      <span>
                        <i className="far fa-calendar-alt" style={{ marginLeft: '4px' }}></i>
                        {new Date(article.date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    )}
                  </div>
                  <Link href={`/blog/${article.slug}`} className="btn-read">
                    استعراض الدراسة <i className="fas fa-arrow-left"></i>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="section-cta">
          <Link href="/blog" className="btn-outline-gold">اطلع على المدونة القانونية</Link>
        </div>
      </div>
    </section>
  );
}
