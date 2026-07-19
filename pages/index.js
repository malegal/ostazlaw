import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { getAllArticles, getAllNews } from '../lib/github';
import ArticleCard from '../components/ArticleCard';
import NewsCard from '../components/NewsCard';

// تحميل الخريطة بشكل كسول (لتحسين الأداء)
const MapSection = dynamic(() => import('../components/MapSection'), {
  loading: () => <div className="map-loading">جاري تحميل الخريطة...</div>,
  ssr: false,
});

export default function Home({ articles, news }) {
  const latestArticles = articles.slice(0, 3);
  const latestNews = news.slice(0, 3);
  const hasNews = latestNews.length > 0;

  return (
    <Layout>
      <Head>
        <title>مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية | OSTAZ LAW</title>
        <meta
          name="description"
          content="مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية – محامون بالنقض والدستورية العليا"
        />
      </Head>

      {/* ===== Hero ===== */}
      <section className="hero" aria-label="الصفحة الرئيسية">
        <div className="container hero-content">
          <div className="hero-brand-signature">
            <span className="hero-brand">OSTAZ LAW</span>
            <h1 className="hero-title">
              مؤسسة الأستاذ محمود عبد الحميد
              <br />
              للمحاماة والاستشارات القانونية
            </h1>
            <p className="hero-text">
              نقدم تمثيلًا قضائيًا واستشارات قانونية للشركات والأفراد، مستندين إلى خبرة راسخة
              أمام محكمة النقض والمحكمة الدستورية العليا، لحماية الحقوق والمصالح والاستثمارات.
            </p>
            <div className="hero-actions">
              <Link href="/contact" className="btn-gold">استشارة قانونية</Link>
              <Link href="/contact" className="btn-outline-gold">حجز موعد</Link>
              <Link href="/contact" className="btn-outline-gold">تمثيل قضائي</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Trust Bar ===== */}
      <div className="trust-bar" role="presentation">
        <div className="container trust-inner">
          <span>⚖️ محامون بالنقض والدستورية العليا</span>
          <span>📋 حلول قانونية للشركات والأفراد</span>
          <span>🏛️ تمثيل واستشارات في مختلف مراحل التقاضي</span>
        </div>
      </div>

      {/* ===== About ===== */}
      <section className="section about-section" aria-label="عن المؤسسة">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <span className="section-tag">● المؤسس</span>
              <h2>خبرة قانونية تُرسخ الثقة،<br />وحلولٌ تحمي المصالح والاستثمارات</h2>
              <p>
                نؤمن بأن العمل القانوني المتميز يبدأ بفهمٍ عميق للوقائع، وصياغة استراتيجية
                قانونية دقيقة، ثم تقديم تمثيل قانوني مهني ونزيه يهدف إلى حماية الحقوق والمصالح
                وتحقيق أفضل النتائج الممكنة.
              </p>
              <p>
                تأسست مؤسسة الأستاذ محمود عبد الحميد للمحاماة عام 2005 واكتسبت منذ ذلك الحين
                خبرة عملية متراكمة تقوم على: الخبرة المتراكمة في مختلف مجالات الممارسة القانونية،
                والقدرة على تقديم حلول قانونية متخصصة للشركات والمستثمرين، والالتزام بالسرية
                التامة والشفافية الكاملة.
              </p>
              <div className="founder-info">
                <strong>الأستاذ محمود عبد الحميد</strong>
                <span>المؤسس – المحامي بالنقض والدستورية العليا</span>
              </div>
              <Link href="/about" className="btn-outline-gold">تعرف على المؤسسة</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Practice Areas ===== */}
      <section className="section section-gray" aria-label="مجالات الممارسة القانونية">
        <div className="container">
          <span className="section-tag">● الممارسة</span>
          <h2>مجالات الممارسة القانونية</h2>
          <p className="section-sub">
            نقدم حلولاً قانونية متكاملة في التخصصات التالية، بدءاً من الاستشارة وصولاً إلى التمثيل القضائي.
          </p>
          <div className="practice-grid">
            <div className="practice-card">
              <h3>المنازعات المدنية</h3>
              <p>قضايا العقود، التعويضات، الملكية والإيجارات.</p>
            </div>
            <div className="practice-card">
              <h3>القانون التجاري</h3>
              <p>الشركات، العقود التجارية، والأوراق المالية.</p>
            </div>
            <div className="practice-card">
              <h3>الخدمات القانونية للشركات</h3>
              <p>هيكلة الشركات، الحوكمة، وصياغة العقود.</p>
            </div>
            <div className="practice-card">
              <h3>القضاء الإداري</h3>
              <p>الطعن في القرارات الإدارية والمنازعات الحكومية.</p>
            </div>
            <div className="practice-card">
              <h3>الطعن الدستوري</h3>
              <p>الدفع بعدم دستورية القوانين أمام المحكمة الدستورية العليا.</p>
            </div>
          </div>
          <div className="section-cta">
            <Link href="/specialties" className="btn-outline-gold">استعراض جميع التخصصات</Link>
          </div>
        </div>
      </section>

      {/* ===== Process ===== */}
      <section className="section" aria-label="مراحل التعاون القانوني">
        <div className="container">
          <span className="section-tag">● سير العمل</span>
          <h2>مراحل التعاون القانوني</h2>
          <p className="section-sub">رحلة قانونية واضحة ومنظمة، من الاستشارة الأولى إلى الحكم النهائي.</p>
          <div className="process-grid">
            <div className="process-step">
              <span className="step-number">01</span>
              <h3>الاستشارة الأولية</h3>
              <p>مناقشة وقائع القضية وتحليل الموقف القانوني وتحديد المسار الأمثل.</p>
            </div>
            <div className="process-step">
              <span className="step-number">02</span>
              <h3>تحليل الملف وإعداد الاستراتيجية</h3>
              <p>جمع المستندات، تحليل الأدلة، وصياغة الدفوع القانونية المناسبة.</p>
            </div>
            <div className="process-step">
              <span className="step-number">03</span>
              <h3>التمثيل القضائي والمتابعة</h3>
              <p>الترافع أمام المحاكم بكفاءة مع متابعة دقيقة لكل جلسة.</p>
            </div>
            <div className="process-step">
              <span className="step-number">04</span>
              <h3>المتابعة حتى الحكم النهائي</h3>
              <p>متابعة القضية حتى صدور الحكم والاستشارة بشأن الطعن عليه إن لزم.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Sectors ===== */}
      <section className="section section-gray" aria-label="القطاعات التي نخدمها">
        <div className="container">
          <span className="section-tag">● القطاعات</span>
          <h2>القطاعات التي نخدمها</h2>
          <p className="section-sub">
            نفهم الطبيعة القانونية والعملية للقطاعات التي نعمل معها، ونقدم حلولًا قانونية تتناسب مع احتياجات كل قطاع.
          </p>
          <div className="sectors-grid">
            <div className="sector-card">
              <h3>قطاع الشركات</h3>
              <p>هيكلة الشركات، الحوكمة، وصياغة العقود التجارية.</p>
            </div>
            <div className="sector-card">
              <h3>القطاع التجاري</h3>
              <p>صياغة ومراجعة العقود التجارية والمدنية.</p>
            </div>
            <div className="sector-card">
              <h3>قطاع التعويضات</h3>
              <p>المطالبة بالتعويضات المادية والأدبية عن الأضرار.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== News Section ===== */}
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
      </section>

      {/* ===== Articles ===== */}
      <section className="section section-gray" aria-label="المكتبة القانونية">
        <div className="container">
          <span className="section-tag">● المكتبة القانونية</span>
          <h2>أحدث المقالات القانونية</h2>
          <p className="section-sub">اطلع على أحدث ما ننشره في مجال القانون المصري.</p>
          <div className="articles-grid">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
          <div className="section-cta">
            <Link href="/blog" className="btn-outline-gold">اطلع على المدونة القانونية</Link>
          </div>
        </div>
      </section>

      {/* ===== Map ===== */}
      <MapSection />

      {/* ===== CTA ===== */}
      <section className="section cta-section" aria-label="تواصل معنا">
        <div className="container">
          <span className="section-tag">● تواصل معنا</span>
          <h2>كيف تود أن نخدمك؟</h2>
          <p className="section-sub">فريقنا القانوني المتخصص ينتظرك. اختر ما يناسبك من الخيارات أدناه.</p>
          <div className="cta-actions">
            <Link href="/contact" className="btn-gold">حجز موعد استشارة</Link>
            <Link href="/contact" className="btn-outline-gold">طلب استشارة قانونية</Link>
            <Link href="/contact" className="btn-outline-gold">طلب تمثيل قانوني</Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* ===== Hero ===== */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, var(--very-dark-navy, #0B111B) 0%, var(--deep-navy, #102A43) 100%);
          padding-top: 80px;
          position: relative;
          overflow: hidden;
        }
        .hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 70% 30%, rgba(176, 141, 87, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-content {
          position: relative;
          z-index: 1;
          padding: 3rem 0;
        }
        .hero-brand-signature {
          max-width: 800px;
        }
        .hero-brand {
          display: inline-block;
          font-family: 'Amiri', serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--matte-gold, #B08D57);
          letter-spacing: 2px;
          margin-bottom: 0.5rem;
          border-bottom: 2px solid var(--matte-gold, #B08D57);
          padding-bottom: 0.25rem;
        }
        .hero-title {
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 700;
          color: var(--warm-off-white, #FAFAF8);
          line-height: 1.3;
          margin: 1rem 0;
        }
        .hero-text {
          font-size: clamp(1rem, 1.2vw, 1.25rem);
          color: rgba(250, 250, 248, 0.85);
          max-width: 650px;
          line-height: 1.9;
          margin-bottom: 2rem;
        }
        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .btn-gold {
          display: inline-block;
          padding: 0.8rem 2rem;
          background: var(--matte-gold, #B08D57);
          color: #0B111B;
          font-weight: 700;
          border-radius: 8px;
          transition: all 0.3s ease;
          text-decoration: none;
          border: 2px solid var(--matte-gold, #B08D57);
        }
        .btn-gold:hover,
        .btn-gold:focus-visible {
          background: transparent;
          color: var(--matte-gold, #B08D57);
        }
        .btn-outline-gold {
          display: inline-block;
          padding: 0.8rem 2rem;
          background: transparent;
          color: var(--matte-gold, #B08D57);
          font-weight: 700;
          border-radius: 8px;
          border: 2px solid var(--matte-gold, #B08D57);
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .btn-outline-gold:hover,
        .btn-outline-gold:focus-visible {
          background: var(--matte-gold, #B08D57);
          color: #0B111B;
        }

        /* ===== Trust Bar ===== */
        .trust-bar {
          background: var(--deep-navy, #102A43);
          padding: 1rem 0;
          border-top: 1px solid rgba(176, 141, 87, 0.2);
          border-bottom: 1px solid rgba(176, 141, 87, 0.2);
        }
        .trust-inner {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 2rem;
          color: var(--warm-off-white, #FAFAF8);
          font-size: 0.95rem;
        }
        .trust-inner span {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* ===== Sections ===== */
        .section {
          padding: 4rem 0;
        }
        .section-gray {
          background: var(--light-gray, #ECECEC);
        }
        .section-tag {
          display: inline-block;
          color: var(--matte-gold, #B08D57);
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 2px;
          margin-bottom: 0.5rem;
        }
        .section h2 {
          font-size: clamp(1.8rem, 3vw, 2.8rem);
          font-weight: 700;
          color: var(--charcoal, #0B111B);
          margin-bottom: 0.5rem;
        }
        .section-sub {
          font-size: 1.1rem;
          color: var(--text-secondary, #0B111B);
          opacity: 0.8;
          max-width: 600px;
          margin-bottom: 2rem;
        }
        .section-cta {
          margin-top: 2rem;
          text-align: center;
        }

        /* ===== Practice Grid ===== */
        .practice-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }
        .practice-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .practice-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }
        .practice-card h3 {
          font-size: 1.1rem;
          color: var(--deep-navy, #102A43);
          margin-bottom: 0.5rem;
        }
        .practice-card p {
          font-size: 0.95rem;
          color: var(--text-secondary, #0B111B);
          opacity: 0.8;
        }

        /* ===== Process Grid ===== */
        .process-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 2rem;
        }
        .process-step {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          border-right: 4px solid var(--matte-gold, #B08D57);
        }
        .step-number {
          font-family: 'Amiri', serif;
          font-size: 2rem;
          font-weight: 700;
          color: var(--matte-gold, #B08D57);
          opacity: 0.4;
          display: block;
          margin-bottom: 0.25rem;
        }
        .process-step h3 {
          font-size: 1.1rem;
          color: var(--deep-navy, #102A43);
          margin-bottom: 0.5rem;
        }
        .process-step p {
          font-size: 0.95rem;
          color: var(--text-secondary, #0B111B);
          opacity: 0.8;
        }

        /* ===== Sectors Grid ===== */
        .sectors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }
        .sector-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        }
        .sector-card h3 {
          font-size: 1.1rem;
          color: var(--deep-navy, #102A43);
          margin-bottom: 0.5rem;
        }
        .sector-card p {
          font-size: 0.95rem;
          color: var(--text-secondary, #0B111B);
          opacity: 0.8;
        }

        /* ===== News Placeholder ===== */
        .news-placeholder {
          background: white;
          padding: 3rem 2rem;
          border-radius: 16px;
          text-align: center;
          border: 2px dashed var(--matte-gold, #B08D57);
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
          color: var(--text-secondary, #0B111B);
          opacity: 0.8;
          line-height: 1.8;
        }
        .news-placeholder-badge {
          display: inline-block;
          margin-top: 1rem;
          padding: 0.3rem 1.5rem;
          background: var(--matte-gold, #B08D57);
          color: #0B111B;
          font-weight: 700;
          border-radius: 20px;
          font-size: 0.8rem;
        }

        /* ===== News Grid ===== */
        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        /* ===== Articles Grid ===== */
        .articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        /* ===== CTA ===== */
        .cta-section {
          background: var(--deep-navy, #102A43);
          color: var(--warm-off-white, #FAFAF8);
        }
        .cta-section .section-tag {
          color: var(--matte-gold, #B08D57);
        }
        .cta-section h2 {
          color: var(--warm-off-white, #FAFAF8);
        }
        .cta-section .section-sub {
          color: rgba(250, 250, 248, 0.8);
        }
        .cta-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
          margin-top: 1.5rem;
        }
        .cta-section .btn-gold {
          background: var(--matte-gold, #B08D57);
          color: #0B111B;
        }
        .cta-section .btn-gold:hover {
          background: transparent;
          color: var(--matte-gold, #B08D57);
        }
        .cta-section .btn-outline-gold {
          color: var(--matte-gold, #B08D57);
          border-color: var(--matte-gold, #B08D57);
        }
        .cta-section .btn-outline-gold:hover {
          background: var(--matte-gold, #B08D57);
          color: #0B111B;
        }

        /* ===== Responsive ===== */
        @media (max-width: 768px) {
          .hero-actions,
          .cta-actions {
            flex-direction: column;
            align-items: stretch;
          }
          .hero-actions .btn-gold,
          .hero-actions .btn-outline-gold,
          .cta-actions .btn-gold,
          .cta-actions .btn-outline-gold {
            text-align: center;
          }
          .trust-inner {
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </Layout>
  );
}

export async function getStaticProps() {
  let articles = [];
  let news = [];

  try {
    articles = await getAllArticles();
  } catch (error) {
    console.error('خطأ في جلب المقالات:', error);
    articles = [];
  }

  try {
    news = await getAllNews();
  } catch (error) {
    console.error('خطأ في جلب الأخبار:', error);
    news = [];
  }

  return {
    props: { articles, news },
    revalidate: 60,
  };
}
