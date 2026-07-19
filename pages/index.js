import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import { getAllArticles, getAllNews } from '../lib/github';
import ArticleCard from '../components/ArticleCard';
import NewsCard from '../components/NewsCard';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// استيراد الخريطة بشكل ديناميكي (لن يتم استخدامها في النهاية ولكن تركناها للاحتياط)
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
        <meta name="description" content="مكتب محاماة متخصص في القانون المدني والتجاري، تأسيس الشركات، والنزاعات العقارية. خبرة راسخة أمام محكمة النقض والدستورية العليا." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ostazlaw.vercel.app/" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "LegalService",
                  "@id": "https://ostazlaw.vercel.app/#organization",
                  "name": "مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية",
                  "alternateName": "OSTAZ LAW",
                  "description": "مكتب محاماة رائد متخصص في القانون المدني والتجاري وتأسيس الشركات في مصر.",
                  "url": "https://ostazlaw.vercel.app/",
                  "logo": "https://ostazlaw.vercel.app/logo.png",
                  "email": "ma.law.firm@outlook.com",
                  "telephone": "+201101076000",
                  "foundingDate": "2005",
                  "knowsAbout": [
                    "القانون المدني",
                    "القانون التجاري",
                    "تأسيس الشركات",
                    "المنازعات الإيجارية",
                    "الطعن بالنقض",
                    "القضاء الدستوري"
                  ],
                  "areaServed": { "@type": "Country", "name": "مصر" },
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "أسوان",
                    "addressCountry": "مصر"
                  }
                }
              ]
            })
          }}
        />
      </Head>

      {/* Hero Section مع تحسين الأداء للصور */}
      <section className="hero" aria-label="الصفحة الرئيسية">
        <div className="hero-content">
          <h1>مؤسسة الأستاذ محمود عبد الحميد</h1>
          <p className="hero-subtitle">للمحاماة والاستشارات القانونية</p>
          <p className="hero-description">
            نقدم تمثيلاً قضائياً واستشارات قانونية متخصصة في القانون المدني والتجاري وتأسيس الشركات، مستندين إلى خبرة راسخة أمام محكمة النقض والمحكمة الدستورية العليا.
          </p>
          <div className="hero-btns">
            <Link href="/contact?tab=consult" className="btn-gold">استشارة قانونية</Link>
            <Link href="/contact?tab=appointment" className="btn-outline">حجز موعد</Link>
          </div>
        </div>
        <div className="hero-image-container">
          <Image 
            src="/mahmoud-abdel-hamid-lawyer-portrait.webp" 
            alt="الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا" 
            width={500} 
            height={600} 
            priority={true}
            className="hero-img"
            quality={85}
          />
        </div>
      </section>

      {/* قسم الأخبار مع الـ Placeholder الذكي */}
      <section className="section section-gray" aria-label="أخبار المؤسسة">
        <div className="section-inner">
          <div className="section-head">
            <span className="eyebrow">● أخبار المؤسسة</span>
            <h2>آخر الأخبار والمستجدات</h2>
          </div>
          
          {hasNews ? (
            <div className="experience-grid">
              {latestNews.map((item) => (
                <NewsCard key={item.slug} news={item} />
              ))}
            </div>
          ) : (
            <div className="news-placeholder">
              <div className="news-placeholder-icon">📢</div>
              <h3>نعمل حالياً على أرشفة أحدث الأحكام القضائية</h3>
              <p>
                نحرص في مؤسستنا على توثيق ونشر أحدث الإنجازات القانونية والمستجدات التشريعية بما يتفق مع مبادئ السرية المهنية.
                <br />
                <strong>سيتم النشر قريباً..</strong>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* قسم الخريطة الثابتة (بديل خفيف عن iframe) */}
      <section className="section section-white" aria-label="موقعنا الجغرافي">
        <div className="section-inner">
          <div className="section-head">
            <span className="eyebrow">● موقعنا الجغرافي</span>
            <h2>تفضلوا بزيارتنا</h2>
          </div>
          <div className="static-map-container">
            <div className="map-overlay">
              <div className="map-card">
                <h3>مقر المؤسسة</h3>
                <p>أسوان، جمهورية مصر العربية</p>
                <a 
                  href="https://maps.google.com/?q=24.0889,32.8998" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-gold"
                  aria-label="فتح الموقع في خرائط Google"
                >
                  فتح في خرائط Google
                </a>
              </div>
            </div>
            <div className="map-placeholder-bg">
              <div className="map-visual-effect"></div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6rem 2rem;
          min-height: 80vh;
          background: var(--very-dark-navy);
          gap: 3rem;
        }
        .hero-content {
          flex: 1;
          max-width: 600px;
        }
        .hero-content h1 {
          font-family: var(--font-serif);
          font-size: clamp(2.8rem, 5vw, 4.5rem);
          color: #fff;
          line-height: 1.2;
          margin-bottom: 0.5rem;
        }
        .hero-subtitle {
          font-size: 1.4rem;
          color: var(--matte-gold-light);
          margin-bottom: 1.5rem;
          font-weight: 700;
        }
        .hero-description {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.85);
          line-height: 1.9;
          margin-bottom: 2rem;
        }
        .hero-btns {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .btn-outline {
          display: inline-block;
          border: 2px solid var(--matte-gold-light);
          color: var(--matte-gold-light);
          padding: 0.8rem 2rem;
          border-radius: 8px;
          font-weight: 700;
          transition: 0.3s;
          text-decoration: none;
        }
        .btn-outline:hover {
          background: var(--matte-gold-light);
          color: #000;
        }
        .hero-image-container {
          flex: 1;
          max-width: 400px;
        }
        .hero-img {
          width: 100%;
          height: auto;
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .news-placeholder {
          background: white;
          padding: 4rem 2rem;
          border-radius: 16px;
          text-align: center;
          border: 1px solid rgba(176, 141, 87, 0.2);
          max-width: 700px;
          margin: 0 auto;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }
        .news-placeholder-icon {
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
          color: var(--matte-gold-light);
        }
        .static-map-container {
          position: relative;
          height: 400px;
          border-radius: 20px;
          overflow: hidden;
          background: var(--very-dark-navy);
        }
        .map-overlay {
          position: absolute;
          z-index: 2;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          max-width: 400px;
        }
        .map-card {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        .map-card h3 {
          font-family: var(--font-serif);
          color: var(--charcoal);
          margin-bottom: 0.5rem;
        }
        .map-card p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }
        .map-placeholder-bg {
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #0B111B, #1a2a43);
          opacity: 0.8;
        }
        .map-visual-effect {
          width: 100%;
          height: 100%;
          background-image: radial-gradient(circle at 2px 2px, rgba(176, 141, 87, 0.1) 1px, transparent 0);
          background-size: 24px 24px;
        }
        @media (max-width: 768px) {
          .hero {
            flex-direction: column-reverse;
            text-align: center;
            padding: 4rem 1rem;
          }
          .hero-btns {
            justify-content: center;
          }
          .hero-image-container {
            max-width: 250px;
          }
          .static-map-container {
            height: 300px;
          }
        }
      `}</style>
    </Layout>
  );
}

export async function getStaticProps() {
  const [articles, news] = await Promise.all([
    getAllArticles().catch(() => []),
    getAllNews().catch(() => []),
  ]);
  return {
    props: { articles, news },
    revalidate: 60,
  };
}
