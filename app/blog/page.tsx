import { getArticles } from '@/app/lib/github';
import Link from 'next/link';

export const metadata = {
  title: 'المكتبة القانونية',
  description: 'مقالات وتحليلات قانونية متخصصة في مختلف مجالات القانون المصري.',
};

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <>
      <section className="hero-blog" aria-label="المكتبة القانونية">
        <div className="hero-pattern"></div>
        <div className="hero-glow"></div>
        <div className="hero-glow-2"></div>
        <div className="hero-inner">
          <div className="hero-title-wrap reveal">
            <span className="en-tag">Legal Library</span>
            <h1>المكتبة <span className="gold-text">القانونية</span></h1>
            <p className="sub">مقالات وتحليلات قانونية متخصصة، كتبها الأستاذ محمود عبد الحميد المحامي بالنقض والدستورية العليا.</p>
          </div>
        </div>
      </section>

      <section className="blog-section" aria-label="قائمة المقالات">
        <div className="inner">
          <div className="blog-grid">
            {articles.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <p className="text-charcoal/50">لا توجد مقالات قانونية حالياً</p>
              </div>
            ) : (
              articles.map((article, index) => (
                <div key={article.slug} className="blog-card reveal" style={{ transitionDelay: `${index * 0.05}s` }}>
                  <div className="card-body">
                    <span className="badge">📘 دراسة قانونية</span>
                    <h3>{article.title}</h3>
                    <div className="meta">
                      <span><i className="far fa-clock" style={{ marginLeft: '4px' }}></i> {Math.ceil(article.title.length / 40) || 1} دقائق قراءة</span>
                      {article.date && (
                        <span><i className="far fa-calendar-alt" style={{ marginLeft: '4px' }}></i> {new Date(article.date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
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
        </div>
      </section>
    </>
  );
}
