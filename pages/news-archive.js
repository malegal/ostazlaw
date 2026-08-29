import Layout from '../components/Layout';
import Head from 'next/head';
import Link from 'next/link';
// نستخدم مصدري المحتوى الحاليين دون نقل أو تغيير ملفات الأخبار والمقالات.
import { getAllArticles, getAllNews } from '../lib/github';
import Icon from '../components/Icon';

// الصفحة الموحّدة تعرض الأخبار والمكتبة في وجهة واحدة مع الحفاظ على بطاقات كل قسم.
export default function NewsArchive({ newsItems, articles }) {
  return (
    <Layout>
      <Head>
        <title>أرشيف الأخبار والإنجازات | الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا</title>
        <meta name="description" content="أرشيف أخبار وإنجازات مؤسسة جاد الرب – أحدث الأحكام، المشاركات المجتمعية، وتطورات المكتب القانوني." />
        <link rel="canonical" href="https://ostazlaw.vercel.app/news-archive.html" />
        <meta property="og:title" content="أرشيف الأخبار والإنجازات | الأستاذ محمود عبد الحميد" />
        <meta property="og:description" content="أرشيف أخبار وإنجازات مؤسسة جاد الرب – أحدث الأحكام والمشاركات المجتمعية." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ostazlaw.vercel.app/news-archive.html" />
        <meta property="og:image" content="/mahmoud-abdel-hamid-lawyer-portrait.webp" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="800" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/mahmoud-abdel-hamid-lawyer-portrait.webp" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "LegalService",
                "@id": "https://ostazlaw.vercel.app/#organization",
                "name": "مؤسسة جاد الرب للمحاماة والاستشارات القانونية",
                "alternateName": "JAD ELRAB",
                "description": "مؤسسة قانونية مصرية تقدم خدمات المحاماة والاستشارات القانونية للأفراد والشركات.",
                "url": "https://ostazlaw.vercel.app/",
                "logo": "/logo.png",
                "email": "ma.law.firm@outlook.com",
                "telephone": "+201101076000",
                "foundingDate": "2005",
                "areaServed": { "@type": "Country", "name": "مصر" },
                "availableLanguage": ["Arabic", "English"],
                "sameAs": [
                  "https://www.facebook.com/malegal",
                  "https://x.com/mahmoud_a_hamyd",
                  "https://www.linkedin.com/in/mahmoud-abdel-hamid-0a4664374"
                ],
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "القاهرة",
                  "addressCountry": "مصر"
                }
              },
              {
                "@type": "Person",
                "@id": "https://ostazlaw.vercel.app/#founder",
                "name": "محمود عبد الحميد",
                "jobTitle": "المحامي بالنقض والدستورية العليا",
                "worksFor": { "@id": "https://ostazlaw.vercel.app/#organization" },
                "url": "/about",
                "image": {
                  "@type": "ImageObject",
                  "url": "/mahmoud-abdel-hamid-lawyer-portrait.webp",
                  "caption": "الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا"
                }
              },
              {
                "@type": "CollectionPage",
                "@id": "https://ostazlaw.vercel.app/news-archive.html#webpage",
                "url": "https://ostazlaw.vercel.app/news-archive.html",
                "name": "أرشيف الأخبار والإنجازات",
                "description": "أرشيف أخبار وإنجازات مؤسسة جاد الرب.",
                "isPartOf": { "@id": "https://ostazlaw.vercel.app/#website" },
                "about": { "@id": "https://ostazlaw.vercel.app/#organization" }
              },
              {
                "@type": "WebSite",
                "@id": "https://ostazlaw.vercel.app/#website",
                "name": "مؤسسة جاد الرب للمحاماة والاستشارات القانونية",
                "url": "https://ostazlaw.vercel.app/",
                "description": "مؤسسة قانونية مصرية تقدم خدمات المحاماة والاستشارات القانونية."
              }
            ]
          })
        }} />
      </Head>

      <section className="hero-blog" aria-label="أرشيف الأخبار والإنجازات">
        <div className="hero-pattern"></div>
        <div className="hero-glow"></div>
        <div className="hero-glow-2"></div>
        <div className="hero-inner">
          <div className="hero-title-wrap reveal">
            <span className="en-tag">News Archive</span>
            <h1>أرشيف <span className="gold-text">الأخبار</span></h1>
            <p className="sub">جميع أخبار وإنجازات مؤسسة جاد الرب – أحكام، مشاركات، وتطورات.</p>
          </div>
        </div>
      </section>

      <section className="blog-section" aria-label="قائمة الأخبار">
        <div className="inner">
          <div className="experience-grid">
            {newsItems.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <Icon name="newspaper" style={{ fontSize: '3rem', opacity: '0.3', marginBottom: '1rem' }} />
                <p className="text-charcoal/50">لا توجد أخبار حالياً.</p>
              </div>
            ) : (
              newsItems.map((item) => {
                const badgeColors = {
                  'إنجاز قضائي': { background: 'var(--matte-gold)', color: '#000' },
                  'فعالية': { background: 'var(--deep-navy)', color: '#fff' },
                  'تطوير': { background: 'var(--very-dark-navy)', color: '#fff' },
                };
                const badgeStyle = badgeColors[item.category] || { background: 'var(--matte-gold)', color: '#000' };

                return (
                  <div key={item.slug} className="sector-link">
                    <Link href={`/news/${item.slug}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                      <div className="experience-card reveal" style={{ textAlign: 'right', position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <span style={{ ...badgeStyle, padding: '0.1rem 0.8rem', borderRadius: '20px', fontSize: '0.6rem', fontWeight: '800' }}>{item.category || 'خبر'}</span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{item.date ? new Date(item.date).toLocaleDateString('ar-EG') : ''}</span>
                        </div>
                        <span className="icon"><Icon name="newspaper" style={{ fontSize: '1.5rem' }} /></span>
                        <h4>{item.title}</h4>
                        <p>{item.description || ''}</p>
                        <span style={{ color: 'var(--matte-gold)', fontWeight: '700', fontSize: '0.8rem', marginTop: '0.5rem', display: 'inline-block' }}>اقرأ التفاصيل ←</span>
                      </div>
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* قسم المكتبة القانونية داخل نفس الصفحة لتجميع المحتوى التحريري في وجهة واحدة. */}
      <section className="blog-section library-section" aria-label="المكتبة القانونية">
        <div className="inner">
          <div className="section-heading">
            <span className="eyebrow">● المكتبة القانونية</span>
            <h2>أحدث المقالات القانونية</h2>
            <p>اطلع على أحدث ما ننشره في مجال القانون المصري.</p>
          </div>
          <div className="blog-grid">
            {articles.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <Icon name="book-open" style={{ fontSize: '3rem', opacity: '0.3', marginBottom: '1rem' }} />
                <p className="text-charcoal/50">لا توجد مقالات قانونية حالياً</p>
              </div>
            ) : (
              articles.map((article) => (
                <div key={article.slug} className="blog-card reveal">
                  <div className="card-body">
                    <span className="badge">دراسة قانونية</span>
                    <h3>{article.title}</h3>
                    <div className="meta">
                      <span><Icon name="clock" style={{ marginLeft: '4px' }} /> {Math.ceil(article.title.length / 40) || 1} دقائق قراءة</span>
                      {article.date && <span><Icon name="calendar-alt" style={{ marginLeft: '4px' }} /> {new Date(article.date).toLocaleDateString('ar-EG')}</span>}
                    </div>
                    <Link href={`/article/${article.slug}`} className="btn-read">استعراض الدراسة <Icon name="arrow-left" /></Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero-blog { padding: 120px 2rem 4rem; background: var(--very-dark-navy); position: relative; overflow: hidden; min-height: 45vh; display: flex; align-items: center; }
        .hero-blog .hero-pattern { position: absolute; inset: 0; opacity: 0.03; background-image: radial-gradient(circle at 20% 30%, var(--matte-gold) 1px, transparent 1px), radial-gradient(circle at 80% 70%, var(--matte-gold) 1px, transparent 1px); background-size: 60px 60px; pointer-events: none; }
        .hero-blog .hero-glow { position: absolute; width: 60vw; height: 60vw; border-radius: 50%; background: radial-gradient(circle, rgba(176,141,87,0.04) 0%, transparent 70%); top: -20%; right: -20%; pointer-events: none; animation: orbFloat 20s ease-in-out infinite alternate; }
        .hero-blog .hero-glow-2 { position: absolute; width: 40vw; height: 40vw; border-radius: 50%; background: radial-gradient(circle, rgba(176,141,87,0.02) 0%, transparent 70%); bottom: -20%; left: -10%; pointer-events: none; animation: orbFloat 25s ease-in-out infinite alternate-reverse; }
        @keyframes orbFloat { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(40px, -30px) scale(1.05); } }
        .hero-blog .hero-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; width: 100%; }
        .hero-blog .hero-title-wrap { text-align: center; }
        .hero-blog .hero-title-wrap .en-tag { font-size: 0.65rem; font-weight: 800; letter-spacing: 0.4em; text-transform: uppercase; color: var(--matte-gold); opacity: 0.5; display: block; margin-bottom: 0.3rem; }
        .hero-blog .hero-title-wrap h1 { font-size: clamp(2.4rem, 5vw, 4rem); font-weight: 900; color: #fff; line-height: 1.1; }
        .hero-blog .hero-title-wrap h1 .gold-text { color: var(--matte-gold); }
        .hero-blog .hero-title-wrap .sub { font-size: clamp(1rem, 1.3vw, 1.2rem); font-weight: 400; color: rgba(255,255,255,0.5); max-width: 700px; margin: 0.8rem auto 0; line-height: 1.7; }
        .blog-section { padding: 5rem 2rem; background: var(--warm-off-white); }
        /* يفصل بصريًا بين الأخبار والمكتبة مع إبقاء الصفحة والهوية البصرية موحّدة. */
        .library-section { background: var(--section-light, #fff); }
        .section-heading { max-width: 1200px; margin: 0 auto 2rem; text-align: center; }
        .section-heading .eyebrow { color: var(--matte-gold); font-weight: 700; }
        .section-heading h2 { color: var(--charcoal); margin: 0.5rem 0; }
        .section-heading p { color: var(--charcoal); opacity: 0.7; }
        .blog-section .inner { max-width: 1200px; margin: 0 auto; }
        .experience-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
        .sector-link { display: block; text-decoration: none; color: inherit; transition: all 0.4s var(--ease-out); position: relative; cursor: pointer; }
        .sector-link::after { content: ''; position: absolute; bottom: 0; right: 0; width: 0; height: 3px; background: var(--matte-gold); transition: width 0.6s var(--ease-out); border-radius: 0 0 10px 10px; }
        .sector-link:hover::after { width: 100%; }
        .sector-link:hover .experience-card { border-color: var(--matte-gold); transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.06); }
        .experience-card { background: var(--pure-white); padding: 1.6rem 1.2rem; border-radius: 10px; border: 1px solid rgba(0,0,0,0.06); transition: all 0.4s var(--ease-out); box-shadow: 0 2px 12px rgba(0,0,0,0.03); text-align: center; cursor: pointer; height: 100%; position: relative; }
        .experience-card .icon-svg { font-size: 1.8rem; color: var(--matte-gold); opacity: 0.8; margin-bottom: 0.6rem; display: block; }
        .experience-card h4 { font-size: 1rem; font-weight: 700; color: var(--charcoal); margin-bottom: 0.4rem; }
        .experience-card p { font-size: 0.9rem; color: var(--charcoal); font-weight: 700; line-height: 1.7; }
        .blog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .blog-card { background: var(--pure-white); border-radius: 12px; border: 1px solid rgba(0,0,0,0.04); transition: all 0.4s var(--ease-out); box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
        .blog-card:hover { border-color: var(--matte-gold); transform: translateY(-6px); box-shadow: 0 12px 40px rgba(0,0,0,0.04); }
        .blog-card .card-body { padding: 1.5rem 1.4rem; }
        .blog-card .badge { color: var(--matte-gold); font-size: 0.65rem; font-weight: 700; }
        .blog-card h3 { color: var(--charcoal); font-size: 1.05rem; line-height: 1.5; }
        .blog-card .meta { color: var(--charcoal); font-size: 0.7rem; display: flex; gap: 0.8rem; flex-wrap: wrap; }
        .btn-read { display: inline-flex; gap: 0.4rem; color: var(--matte-gold); font-weight: 700; font-size: 0.75rem; margin-top: 0.8rem; }
        @media (max-width: 820px) { .hero-blog { padding: 100px 1rem 3rem; min-height: 35vh; } .blog-section { padding: 2.5rem 1rem; } .experience-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 1024px) { .blog-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .experience-grid, .blog-grid { grid-template-columns: 1fr; max-width: 360px; margin: 0 auto; } }
      `}</style>
    </Layout>
  );
}

export async function getStaticProps() {
  // تحميل المصدرين معًا يحافظ على ملفات المحتوى الحالية ويجمع عرضهما في صفحة واحدة.
  const [newsItems, articles] = await Promise.all([getAllNews(), getAllArticles()]);
  const processedNews = newsItems.map((n) => ({ ...n, date: n.date ? new Date(n.date).toISOString() : null }));
  const processedArticles = articles.map((a) => ({ ...a, date: a.date ? new Date(a.date).toISOString() : null }));
  return { props: { newsItems: processedNews, articles: processedArticles }, revalidate: 60 };
}
