import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { getCaseData } from '../lib/supabase-config';

export default function ClientInquiry() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

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
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!consent) {
      alert('يرجى الموافقة على التنبيه القانوني قبل الاستعلام.');
      return;
    }

    let phoneVal = phone.trim().replace(/[^0-9]/g, '');
    let codeVal = code.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');

    if (phoneVal.startsWith('20')) phoneVal = phoneVal.substring(2);
    if (codeVal.startsWith('MA-')) codeVal = codeVal.substring(3);

    if (!phoneVal || !codeVal) {
      alert('يرجى إدخال البيانات المطلوبة.');
      return;
    }

    const fullPhone = '20' + phoneVal;
    const fullCode = 'MA-' + codeVal;

    setLoading(true);

    try {
      const { data, error } = await getCaseData(fullPhone, fullCode);
      if (error) throw error;
      if (!data || !data.case) throw new Error('NOT_FOUND');

      sessionStorage.setItem('caseData', JSON.stringify(data));
      window.location.href = '/client-inquiry-result';
    } catch (err) {
      console.error(err);
      alert('بيانات الدخول غير صحيحة. يرجى التأكد من الكود ورقم الهاتف.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
    <Head>
    <title>استعلام القضايا | الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا</title>
    <meta name="description" content="نظام استعلام القضايا الإلكتروني – متابعة مستجدات قضيتك لدى مؤسسة الأستاذ محمود عبد الحميد للمحاماة." />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://ostazlaw.vercel.app/client-inquiry.html" />
    <link rel="alternate" hreflang="ar-eg" href="https://ostazlaw.vercel.app/client-inquiry.html" />
    <link rel="alternate" hreflang="en" href="https://ostazlaw.vercel.app/en/client-inquiry.html" />
    <meta property="og:title" content="استعلام القضايا | الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا" />
    <meta property="og:description" content="نظام استعلام القضايا الإلكتروني – متابعة مستجدات قضيتك لدى مؤسسة الأستاذ محمود عبد الحميد للمحاماة." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://ostazlaw.vercel.app/client-inquiry.html" />
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
            "@type": "WebPage",
            "@id": "https://ostazlaw.vercel.app/client-inquiry.html#webpage",
            "url": "https://ostazlaw.vercel.app/client-inquiry.html",
            "name": "استعلام القضايا",
            "description": "نظام استعلام القضايا الإلكتروني – متابعة مستجدات قضيتك.",
            "isPartOf": { "@id": "https://ostazlaw.vercel.app/#website" },
            "about": { "@id": "https://ostazlaw.vercel.app/#organization" }
          },
          {
            "@type": "WebSite",
            "@id": "https://ostazlaw.vercel.app/#website",
            "name": "مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية",
            "url": "https://ostazlaw.vercel.app/",
            "description": "مؤسسة قانونية مصرية تقدم خدمات المحاماة والاستشارات القانونية."
          }
        ]
      })
    }}
    />
    </Head>

    {/* Hero */}
    <section className="hero" aria-label="استعلام القضايا">
    <div className="hero-bg">
    <div className="glow"></div>
    <div className="glow-2"></div>
    </div>
    <div className="hero-content">
    <div className="hero-brand-signature">استعلام القضايا</div>
    <h1 className="hero-title">تابع <span className="gold-text">قضيتك</span></h1>
    <p className="hero-subtitle">نظام الاستعلام الإلكتروني</p>
    <p className="hero-value">أدخل بيانات القضية للاطلاع على آخر المستجدات.<br />الخدمة متاحة لعملائنا المسجلين فقط.</p>
    </div>
    </section>

    {/* Trust Bar */}
    <section className="trust-bar" aria-label="شريط الثقة">
    <div className="trust-bar-inner">
    <div className="trust-item"><i className="fas fa-gavel"></i><span>محامون بالنقض والدستورية العليا</span></div>
    <div className="trust-item"><i className="fas fa-briefcase"></i><span>حلول قانونية للشركات والأفراد</span></div>
    <div className="trust-item"><i className="fas fa-scale-balanced"></i><span>تمثيل واستشارات في مختلف مراحل التقاضي</span></div>
    </div>
    </section>

    {/* Main */}
    <section className="section section-light" aria-label="نموذج استعلام القضايا">
    <div className="section-inner">
    <div className="section-head reveal">
    <span className="eyebrow">● الاستعلام</span>
    <h2>أدخل بيانات القضية</h2>
    <p>للاطلاع على آخر المستجدات، يرجى إدخال رقم الهاتف وكود القضية.</p>
    </div>

    <div className="search-card">
    <div className="icon-header"><i className="fas fa-search"></i></div>
    <h2>استعلام القضايا</h2>
    <p className="sub">أدخل بيانات القضية للاطلاع على آخر المستجدات</p>

    <div className="legal-disclaimer">
    <div className="disclaimer-title"><i className="fas fa-shield-alt"></i> تنبيه قانوني هام</div>
    <div className="disclaimer-text">
    نظام الاستعلام الإلكتروني مخصص حصراً للعملاء المسجلين بمكتبنا للاطلاع على قضاياهم الشخصية.
    <strong>لا يجوز</strong> استخدام النظام للاستعلام عن قضايا الآخرين دون تفويض رسمي.
    المكتب غير مسؤول عن أي استخدام غير مصرح به للمعلومات.
    </div>
    </div>

    <form onSubmit={handleSubmit} autoComplete="off">
    <div className="input-group-custom">
    <input
    type="tel"
    id="phoneInput"
    className="form-control-custom"
    placeholder="رقم الهاتف"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    required
    autoComplete="off"
    />
    <span className="fixed-prefix">20</span>
    </div>

    <div className="input-group-custom">
    <input
    type="text"
    id="codeInput"
    className="form-control-custom"
    placeholder="كود القضية"
    value={code}
    onChange={(e) => setCode(e.target.value.toUpperCase())}
    required
    style={{ textTransform: 'uppercase' }}
    autoComplete="off"
    />
    <span className="fixed-prefix">MA-</span>
    </div>

    <div className="consent-wrapper">
    <input
    type="checkbox"
    id="consentCheck"
    checked={consent}
    onChange={(e) => setConsent(e.target.checked)}
    required
    />
    <label htmlFor="consentCheck" className="consent-label">
    أقر بأنني <strong>صاحب القضية</strong> أو <strong>مفوض قانونياً</strong> بالاستعلام عنها، وأتحمل كامل المسؤولية القانونية عن أي استخدام غير مصرح به.
    </label>
    </div>

    <button type="submit" className="btn-gold btn-search" disabled={!consent || loading}>
    {loading ? (
      <>
      <span className="spinner-border spinner-border-sm" style={{ marginLeft: '0.5rem' }}></span>
      جاري التحقق...
      </>
    ) : (
      <>
      <i className="fas fa-search" style={{ marginLeft: '0.5rem' }}></i> الاطلاع
      </>
    )}
    </button>
    </form>
    </div>
    </div>
    </section>

    <style jsx>{`
      .hero-title {
        margin-bottom: 2.8rem !important;
      }
      .search-card {
        max-width: 600px;
        margin: 0 auto;
        background: var(--pure-white);
        border-radius: 16px;
        padding: 2.5rem 2rem;
        border: 1px solid rgba(0, 0, 0, 0.04);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
        transition: all 0.4s var(--ease-out);
        position: relative;
        overflow: visible;
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      .search-card::after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 0;
        height: 3px;
        background: var(--matte-gold);
        transition: width 0.6s var(--ease-out);
      }
      .search-card:hover::after {
        width: 100%;
      }
      .search-card:hover {
        border-color: var(--matte-gold);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
      }
      .search-card .icon-header {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: rgba(176, 141, 87, 0.05);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1rem;
      }
      .search-card .icon-header i {
        font-size: 1.8rem;
        color: var(--matte-gold);
      }
      .search-card h2 {
        font-family: var(--font-serif);
        font-size: 1.8rem;
        font-weight: 900;
        color: var(--charcoal);
        text-align: center;
        margin-bottom: 0.3rem;
      }
      .search-card .sub {
        text-align: center;
        color: var(--charcoal);
        font-weight: 700;
        font-size: 0.95rem;
        margin-bottom: 1.8rem;
      }

      .legal-disclaimer {
        background: rgba(176, 141, 87, 0.03);
        border-right: 3px solid var(--matte-gold);
        padding: 1rem 1.2rem;
        border-radius: 10px;
        margin-bottom: 1.5rem;
        display: block;
      }
      .legal-disclaimer .disclaimer-title {
        font-weight: 700;
        font-size: 0.8rem;
        color: var(--charcoal);
        margin-bottom: 0.2rem;
        display: flex;
        align-items: center;
        gap: 0.4rem;
      }
      .legal-disclaimer .disclaimer-title i {
        color: var(--matte-gold);
      }
      .legal-disclaimer .disclaimer-text {
        font-size: 0.8rem;
        color: var(--charcoal);
        line-height: 1.8;
        font-weight: 700;
      }
      .legal-disclaimer .disclaimer-text strong {
        color: var(--charcoal);
        font-weight: 700;
      }

      .consent-wrapper {
        display: flex;
        align-items: flex-start;
        gap: 0.6rem;
        margin-bottom: 1.2rem;
        padding: 0.8rem 1rem;
        background: var(--light-gray);
        border-radius: 10px;
        border: 1px solid rgba(0, 0, 0, 0.04);
        transition: all 0.3s ease;
      }
      .consent-wrapper:focus-within {
        border-color: var(--matte-gold);
        box-shadow: 0 0 0 3px rgba(176, 141, 87, 0.05);
      }
      .consent-wrapper input[type="checkbox"] {
        width: 20px;
        height: 20px;
        min-width: 20px;
        margin-top: 0.2rem;
        accent-color: var(--matte-gold);
        cursor: pointer;
      }
      .consent-wrapper .consent-label {
        font-size: 0.8rem;
        color: var(--charcoal);
        font-weight: 700;
        line-height: 1.6;
      }
      .consent-wrapper .consent-label strong {
        color: var(--charcoal);
        font-weight: 700;
      }

      .input-group-custom {
        display: flex;
        align-items: center;
        background: #FFFFFF !important;
        border: 1px solid #D1D1D1 !important;
        border-radius: 10px;
        margin-bottom: 1rem;
        overflow: hidden;
        transition: all 0.3s ease;
      }
      .input-group-custom:focus-within {
        border-color: var(--matte-gold) !important;
        box-shadow: 0 0 0 3px rgba(176, 141, 87, 0.05);
      }
      .input-group-custom .form-control-custom {
        background: #FFFFFF !important;
        border: none !important;
        color: #222222 !important;
        padding: 0.7rem 0.8rem;
        width: 100%;
        font-size: 1rem;
        outline: none;
        text-align: right;
        font-family: var(--font-ar);
        display: block;
        font-weight: 700;
      }
      .input-group-custom .form-control-custom::placeholder {
        color: #999999 !important;
        font-weight: 300;
        opacity: 1;
      }
      .input-group-custom .fixed-prefix {
        background: #F5F5F5 !important;
        color: #555555 !important;
        padding: 0.7rem 0.8rem;
        font-weight: 700;
        font-size: 0.85rem;
        border-left: 1px solid #E5E5E5 !important;
        font-family: monospace;
        flex-shrink: 0;
      }

      .btn-search {
        width: 100%;
        padding: 0.8rem;
        border-radius: 10px;
        font-size: 1rem;
        font-weight: 700;
        margin-top: 0.5rem;
      }
      .btn-search:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none !important;
        box-shadow: none !important;
      }

      .btn-gold {
        display: inline-block;
        background: var(--matte-gold);
        color: #000;
        font-weight: 700;
        padding: 16px 40px;
        border-radius: 8px;
        border: none;
        transition: all 0.4s var(--ease-out);
        text-align: center;
        font-size: 0.95rem;
        letter-spacing: 0.02em;
        box-shadow: 0 2px 20px rgba(176, 141, 87, 0.15);
        position: relative;
        cursor: pointer;
        text-decoration: none;
      }
      .btn-gold:hover {
        background: #c4a06a;
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(176, 141, 87, 0.25);
      }

      .spinner-border {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        border: 0.2em solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        animation: spinner 0.75s linear infinite;
      }
      @keyframes spinner {
        to { transform: rotate(360deg); }
      }

      @media (max-width: 820px) {
        .search-card { padding: 1.8rem 1.2rem; }
        .hero-title { margin-bottom: 1.8rem !important; }
      }
      @media (max-width: 640px) {
        .search-card h2 { font-size: 1.4rem; }
        .input-group-custom .form-control-custom { font-size: 0.9rem; padding: 0.5rem 0.6rem; }
        .input-group-custom .fixed-prefix { padding: 0.5rem 0.6rem; font-size: 0.75rem; }
        .legal-disclaimer { padding: 0.8rem 1rem; }
        .consent-wrapper { padding: 0.6rem 0.8rem; }
        .hero-title { margin-bottom: 1.5rem !important; }
      }
      `}</style>
      </Layout>
  );
}
