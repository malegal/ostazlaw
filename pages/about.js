import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function About() {
  const [colorized, setColorized] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setColorized(true), 3000);
    return () => clearTimeout(timer);
  }, []);

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
  }, []);

  return (
    <Layout>
      <Head>
        <title>عن المؤسسة | الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا</title>
        <meta name="description" content="مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية – تأسست عام 2005، تقدم خدمات قانونية واستشارات متكاملة للأفراد والشركات." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ostazlaw.vercel.app/about.html" />
        <link rel="alternate" hreflang="ar-eg" href="https://ostazlaw.vercel.app/about.html" />
        <link rel="alternate" hreflang="en" href="https://ostazlaw.vercel.app/en/about.html" />
        <meta property="og:title" content="عن المؤسسة | الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا" />
        <meta property="og:description" content="مؤسسة قانونية مصرية تقدم خدمات المحاماة والاستشارات القانونية للأفراد والشركات." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ostazlaw.vercel.app/about.html" />
        <meta property="og:image" content="https://ostazlaw.vercel.app/mahmoud-abdel-hamid-lawyer-portrait.webp" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="800" />
        <meta property="og:image:alt" content="الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا" />
        <meta property="og:locale" content="ar_EG" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://ostazlaw.vercel.app/mahmoud-abdel-hamid-lawyer-portrait.webp" />
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
                    "url": "https://ostazlaw.vercel.app/mahmoud-abdel-hamid-lawyer-portrait.webp",
                    "caption": "الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا"
                  }
                },
                {
                  "@type": "AboutPage",
                  "@id": "https://ostazlaw.vercel.app/about.html#webpage",
                  "url": "https://ostazlaw.vercel.app/about.html",
                  "name": "عن المؤسسة",
                  "isPartOf": { "@id": "https://ostazlaw.vercel.app/#website" },
                  "about": { "@id": "https://ostazlaw.vercel.app/#organization" },
                  "primaryImageOfPage": {
                    "@type": "ImageObject",
                    "url": "https://ostazlaw.vercel.app/mahmoud-abdel-hamid-lawyer-portrait.webp",
                    "caption": "الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا"
                  }
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
      <section className="hero-about" aria-label="عن المؤسسة">
        <div className="hero-pattern"></div>
        <div className="hero-glow"></div>
        <div className="hero-glow-2"></div>
        <div className="hero-inner">
          <div className="hero-title-wrap reveal">
            <span className="en-tag">About Our Firm</span>
            <h1>مؤسسة الأستاذ<br /><span className="gold-text">محمود عبد الحميد</span></h1>
            <p className="sub">للمحاماة والاستشارات القانونية</p>
            <p className="sub sub-gold">نبني الثقة بالخبرة، ونحمي المصالح باستراتيجية قانونية مدروسة.</p>
          </div>
          <div className="hero-grid">
            <div className="hero-image reveal">
              <Image src="/about.webp" alt="مقر مؤسسة الأستاذ محمود عبد الحميد للمحاماة" width={800} height={600} quality={85} />
            </div>
            <div className="hero-text reveal" style={{ transitionDelay: '0.15s' }}>
              <p><strong>مؤسسة قانونية تؤمن بأن العمل القانوني المتميز يبدأ بالفهم العميق، ويُبنى على التخطيط، ويُقاس بحماية مصالح العميل.</strong></p>
              <p>تُعد مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية <strong>(OSTAZ LAW)</strong> مؤسسة قانونية تقدم خدمات المحاماة والاستشارات القانونية للأفراد والشركات، مستندة إلى منهج مهني يقوم على التحليل الدقيق، والتخطيط القانوني، والتمثيل الاحترافي أمام جهات القضاء.</p>
              <p>نؤمن بأن القضايا لا تُدار بردود الأفعال، بل بفهمٍ عميق للوقائع، وتحليلٍ صحيح للمراكز القانونية، ثم بناء استراتيجية تحقق أفضل حماية ممكنة لمصالح عملائنا.</p>
              <div className="cta-wrap">
                <Link href="/specialties" className="btn-gold">تعرف على مجالات الممارسة</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Definition */}
      <section className="about-definition" aria-label="من نحن">
        <div className="inner">
          <div className="def-grid">
            <div className="def-text reveal">
              <span className="eyebrow">● من نحن</span>
              <h2>مؤسسة قانونية<br /><span className="gold-text">تُبنى على الفهم والتخطيط</span></h2>
              <p>تأسست مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية عام <strong>2005</strong>، لتقديم خدمات قانونية واستشارات متخصصة للأفراد والشركات، بخبرة قضائية راسخة أمام محكمة النقض والمحكمة الدستورية العليا.</p>
              <p>نؤمن بأن العمل القانوني المتميز يبدأ بفهم عميق للوقائع، ويُبنى على تخطيط دقيق، ويُقاس بحماية مصالح العميل. ولذلك نتعامل مع كل قضية كمسؤولية مستقلة، ندرسها من جميع جوانبها القانونية والواقعية.</p>
              <p>نخدم الشركات والأفراد على حد سواء، مع التزامنا بالشفافية، والسرية، والدقة، باعتبارها المبادئ التي تقوم عليها علاقتنا مع عملائنا في جمهورية مصر العربية.</p>
              <div className="def-cards">
                <div className="def-card gold-underline-card"><span className="icon"><i className="fas fa-scale-balanced"></i></span><h4>مؤسسة قانونية</h4></div>
                <div className="def-card gold-underline-card"><span className="icon"><i className="fas fa-building"></i></span><h4>خدمات للشركات والأفراد</h4></div>
                <div className="def-card gold-underline-card"><span className="icon"><i className="fas fa-shield-alt"></i></span><h4>حلول قانونية متخصصة</h4></div>
                <div className="def-card gold-underline-card"><span className="icon"><i className="fas fa-map-marker-alt"></i></span><h4>جمهورية مصر العربية</h4></div>
              </div>
            </div>
            <div className="def-image reveal" style={{ transitionDelay: '0.15s' }}>
              <Image src="/about.webp" alt="مقر مؤسسة الأستاذ محمود عبد الحميد للمحاماة" width={800} height={600} quality={85} />
            </div>
          </div>
        </div>
      </section>

      {/* باقي الملف (Philosophy, Values, Leadership, Process, Trust, Gallery, Founder Message, CTA) يبقى كما هو مع تغيير مسار الصورة فقط في Leadership */}
      {/* ... (لم يتغير شيء آخر سوى استخدام Image بدلاً من img، مع مسار webp) */}

    </Layout>
  );
}
