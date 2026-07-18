import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import { getAllArticles } from '../lib/github';
import ArticleCard from '../components/ArticleCard';
import SkeletonCard from '../components/SkeletonCard';

export default function Blog({ initialArticles }) {
  const [articles, setArticles] = useState(initialArticles || []);
  const [loading, setLoading] = useState(!initialArticles);

  useEffect(() => {
    if (!initialArticles) {
      const fetchArticles = async () => {
        try {
          const res = await fetch('/api/articles');
          const data = await res.json();
          setArticles(data);
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      };
      fetchArticles();
    } else {
      setLoading(false);
    }
  }, [initialArticles]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -20px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [articles]);

  // مكون الصف للقائمة الافتراضية
  const Row = ({ index, style, data }) => {
    const article = data[index];
    return (
      <div style={style} className="blog-list-item">
        <ArticleCard article={article} />
      </div>
    );
  };

  if (loading) {
    return (
      <Layout>
        <div className="blog-section">
          <div className="inner">
            <div className="blog-grid">
              {Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>المكتبة القانونية | الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا</title>
        <meta name="description" content="المكتبة القانونية لمؤسسة الأستاذ محمود عبد الحميد – مقالات وتحليلات قانونية متخصصة في مختلف مجالات القانون المصري." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ostazlaw.vercel.app/blog.html" />
        <link rel="alternate" hreflang="ar-eg" href="https://ostazlaw.vercel.app/blog.html" />
        <link rel="alternate" hreflang="en" href="https://ostazlaw.vercel.app/en/blog.html" />
        <meta property="og:title" content="المكتبة القانونية | الأستاذ محمود عبد الحميد" />
        <meta property="og:description" content="مقالات وتحليلات قانونية متخصصة في مختلف مجالات القانون المصري." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ostazlaw.vercel.app/blog.html" />
        <meta property="og:image" content="https://ostazlaw.vercel.app/mahmoud-abdel-hamid-lawyer-portrait.jpg" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="800" />
        <meta property="og:image:alt" content="الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا" />
        <meta property="og:locale" content="ar_EG" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://ostazlaw.vercel.app/mahmoud-abdel-hamid-lawyer-portrait.jpg" />
        <meta name="twitter:image:alt" content="الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا" />
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
                  "description": "مؤسسة قانونية مصرية تقدم خدمات المحاماة والاستشارات القانونية للأفراد والشركات.",
                  "url": "https://ostazlaw.vercel.app/",
                  "logo": "https://ostazlaw.vercel.app/logo.png",
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
                  "url": "https://ostazlaw.vercel.app/about.html",
                  "image": {
                    "@type": "ImageObject",
                    "url": "https://ostazlaw.vercel.app/mahmoud-abdel-hamid-lawyer-portrait.jpg",
                    "caption": "الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا"
                  }
                },
                {
                  "@type": "CollectionPage",
                  "@id": "https://ostazlaw.vercel.app/blog.html#webpage",
                  "url": "https://ostazlaw.vercel.app/blog.html",
                  "name": "المكتبة القانونية",
                  "description": "مقالات وتحليلات قانونية متخصصة في مختلف مجالات القانون المصري.",
                  "isPartOf": { "@id": "https://ostazlaw.vercel.app/#website" },
                  "about": { "@id": "https://ostazlaw.vercel.app/#organization" }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://ostazlaw.vercel.app/#website",
                  "name": "مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية",
                  "url": "https://ostazlaw.vercel.app/",
                  "description": "مؤسسة قانونية مصرية تقدم خدمات المحاماة والاستشارات القانونية للأفراد والشركات."
                }
              ]
            })
          }}
        />
      </Head>

      {/* Hero */}
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

      {/* Blog Grid with Virtualization */}
      <section className="blog-section" aria-label="قائمة المقالات">
        <div className="inner">
          {articles.length === 0 ? (
            <div className="text-center py-16">
              <i className="fas fa-book-open text-4xl text-matte-gold/30 mb-4"></i>
              <p className="text-charcoal/50">لا توجد مقالات قانونية حالياً</p>
              <p className="text-charcoal/30 text-sm mt-2">سيتم نشر محتوى جديد قريباً</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <span className="text-sm text-charcoal/40 border-b border-matte-gold/20 pb-2 inline-block">
                  <i className="far fa-file-alt ml-2"></i>
                  {articles.length} مقالة قانونية
                </span>
              </div>
              <List
                height={800}
                itemCount={articles.length}
                itemSize={280}
                width="100%"
                itemData={articles}
                className="virtualized-list"
              >
                {Row}
              </List>
            </>
          )}
        </div>
      </section>

      <style jsx>{`
        .hero-blog {
          padding: 120px 2rem 4rem;
          background: var(--very-dark-navy);
          position: relative;
          overflow: hidden;
          min-height: 45vh;
          display: flex;
          align-items: center;
        }
        .hero-blog .hero-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image: radial-gradient(circle at 20% 30%, var(--matte-gold) 1px, transparent 1px), radial-gradient(circle at 80% 70%, var(--matte-gold) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .hero-blog .hero-glow {
          position: absolute;
          width: 60vw;
          height: 60vw;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(176, 141, 87, 0.04) 0%, transparent 70%);
          top: -20%;
          right: -20%;
          pointer-events: none;
          animation: orbFloat 20s ease-in-out infinite alternate;
        }
        .hero-blog .hero-glow-2 {
          position: absolute;
          width: 40vw;
          height: 40vw;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(176, 141, 87, 0.02) 0%, transparent 70%);
          bottom: -20%;
          left: -10%;
          pointer-events: none;
          animation: orbFloat 25s ease-in-out infinite alternate-reverse;
        }
        @keyframes orbFloat {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(40px, -30px) scale(1.05); }
        }
        .hero-blog .hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          width: 100%;
        }
        .hero-blog .hero-title-wrap {
          text-align: center;
        }
        .hero-blog .hero-title-wrap .en-tag {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--matte-gold);
          opacity: 0.5;
          display: block;
          margin-bottom: 0.3rem;
        }
        .hero-blog .hero-title-wrap h1 {
          font-family: var(--font-serif);
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 900;
          color: #fff;
          line-height: 1.1;
        }
        .hero-blog .hero-title-wrap h1 .gold-text {
          color: var(--matte-gold);
        }
        .hero-blog .hero-title-wrap .sub {
          font-size: clamp(1rem, 1.3vw, 1.2rem);
          font-weight: 400;
          color: rgba(255, 255, 255, 0.5);
          max-width: 700px;
          margin: 0.8rem auto 0;
          line-height: 1.7;
        }
        .blog-section {
          padding: 5rem 2rem;
          background: var(--warm-off-white);
        }
        .blog-section .inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .text-center { text-align: center; }
        .py-16 { padding: 4rem 0; }
        .text-4xl { font-size: 2.5rem; }
        .text-matte-gold\\/30 { color: rgba(176, 141, 87, 0.3); }
        .mb-4 { margin-bottom: 1rem; }
        .text-charcoal\\/50 { color: rgba(34, 34, 34, 0.5); }
        .text-charcoal\\/30 { color: rgba(34, 34, 34, 0.3); }
        .text-sm { font-size: 0.875rem; }
        .mt-2 { margin-top: 0.5rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .text-charcoal\\/40 { color: rgba(34, 34, 34, 0.4); }
        .border-b { border-bottom: 1px solid; }
        .border-matte-gold\\/20 { border-color: rgba(176, 141, 87, 0.2); }
        .pb-2 { padding-bottom: 0.5rem; }
        .inline-block { display: inline-block; }
        .ml-2 { margin-right: 0.5rem; }
        @media (max-width: 820px) {
          .hero-blog { padding: 100px 1rem 3rem; min-height: 35vh; }
          .blog-section { padding: 2.5rem 1rem; }
        }
      `}</style>
    </Layout>
  );
}

export async function getStaticProps() {
  const articles = await getAllArticles();
  return {
    props: {
      initialArticles: articles,
    },
    revalidate: 60,
  };
}
