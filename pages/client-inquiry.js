import Layout from '../components/Layout';
import Head from 'next/head';
import { useState } from 'react';
import { getPortalFileData } from '../lib/supabase-config';
import Icon from '../components/Icon';

export default function ClientInquiry() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!consent) {
      alert('يرجى الموافقة على التنبيه القانوني قبل الاستعلام.');
      return;
    }
    setLoading(true);
    try {
      const fullPhone = '20' + phone.replace(/^20/, '');
      // قبول كود القضية JELR أو كود الخدمة المهنية RE/CO/AD كما أنشأه qayd.
      const normalizedCode = code.trim().toUpperCase().replace(/\s+/g, '');
      const hasKnownPrefix = /^(JELR|MA|RE|CO|AD)-/.test(normalizedCode);
      const fullCode = hasKnownPrefix ? normalizedCode : `JELR-${normalizedCode}`;
      const { data, error } = await getPortalFileData(fullPhone, fullCode);
      if (error || !data || !data.file) {
        throw new Error('بيانات الدخول غير صحيحة');
      }
      // تخزين وقت النتيجة حتى تنتهي جلسة الاستعلام تلقائيًا بعد مدة قصيرة.
      sessionStorage.setItem('caseData', JSON.stringify({ ...data, _timestamp: Date.now() }));
      window.location.href = '/client-inquiry-result';
    } catch (err) {
      alert('بيانات الدخول غير صحيحة. يرجى التأكد من الكود ورقم الهاتف.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>بوابة متابعة ملفات العملاء | جاد الرب للمحاماة والاستشارات القانونية</title>
        <meta name="description" content="نظام بوابة متابعة ملفات العملاء – متابعة مستجدات ملفك القانوني لدى جاد الرب للمحاماة." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://ostazlaw.vercel.app/client-inquiry" />
        <meta property="og:title" content="بوابة متابعة ملفات العملاء | جاد الرب للمحاماة والاستشارات القانونية" />
        <meta property="og:description" content="نظام بوابة متابعة ملفات العملاء – متابعة مستجدات ملفك القانوني لدى جاد الرب للمحاماة." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ostazlaw.vercel.app/client-inquiry" />
        <meta property="og:image" content="https://ostazlaw.vercel.app/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://ostazlaw.vercel.app/og-image.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "LegalService",
                "@id": "https://ostazlaw.vercel.app/#organization",
                "name": "جاد الرب للمحاماة والاستشارات القانونية",
                "alternateName": "JAD ELRAB",
                "description": "مكتب محاماة مصرية تقدم خدمات المحاماة والاستشارات القانونية للأفراد والشركات.",
                "url": "https://ostazlaw.vercel.app/",
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
                  "addressLocality": "أسوان",
                  "addressCountry": "مصر"
                }
              },
              {
                "@type": "WebPage",
                "@id": "https://ostazlaw.vercel.app/client-inquiry#webpage",
                "url": "https://ostazlaw.vercel.app/client-inquiry",
                "name": "بوابة متابعة ملفات العملاء",
                "description": "نظام بوابة متابعة ملفات العملاء – متابعة مستجدات ملفك القانوني.",
                "isPartOf": { "@id": "https://ostazlaw.vercel.app/#website" },
                "about": { "@id": "https://ostazlaw.vercel.app/#organization" }
              },
              {
                "@type": "WebSite",
                "@id": "https://ostazlaw.vercel.app/#website",
                "name": "جاد الرب للمحاماة والاستشارات القانونية",
                "url": "https://ostazlaw.vercel.app/",
                "description": "مكتب محاماة مصرية تقدم خدمات المحاماة والاستشارات القانونية."
              }
            ]
          })
        }} />
      </Head>

        <section className="hero" aria-label="بوابة متابعة ملفات العملاء والخدمات المهنية">
        <div className="hero-bg"><div className="glow"></div><div className="glow-2"></div></div>
        <div className="hero-content">
          <div className="hero-brand-signature">بوابة متابعة ملفات العملاء</div>
          <h1 className="hero-title">تابع <span className="gold-text">ملفك القانوني</span></h1>
          <p className="hero-subtitle">نظام الاستعلام الإلكتروني</p>
          <p className="hero-value">أدخل بيانات الهاتف والكود لمتابعة ملفك القانوني أو خدمتك المهنية.<br />الخدمة متاحة لعملائنا المسجلين فقط.</p>
        </div>
      </section>

      <section className="trust-bar" aria-label="شريط الثقة">
        <div className="trust-bar-inner">
          <div className="trust-item"><Icon name="gavel" /><span>محامون بالنقض والدستورية العليا</span></div>
          <div className="trust-item"><Icon name="briefcase" /><span>حلول قانونية للشركات والأفراد</span></div>
          <div className="trust-item"><Icon name="scale-balanced" /><span>تمثيل واستشارات في مختلف مراحل التقاضي</span></div>
        </div>
      </section>

      <section className="section section-light" aria-label="نموذج بوابة متابعة ملفات العملاء">
        <div className="section-inner">
          <div className="section-head reveal">
            <span className="eyebrow">● الاستعلام</span>
            <h2>أدخل بيانات الملف</h2>
            <p>للاطلاع على آخر المستجدات، يرجى إدخال رقم الهاتف والكود الخاص بالقضية أو الخدمة.</p>
          </div>

          <div className="search-card">
            <div className="icon-header"><Icon name="search" /></div>
            <h2>استعلام موحد</h2>
            <p className="sub">تابع ملفك القانوني أو خدمتك المهنية من مكان واحد</p>

              <div className="legal-disclaimer">
                <div className="disclaimer-title"><Icon name="shield-alt" /> تنبيه قانوني هام</div>
                <div className="disclaimer-text">نظام الاستعلام الإلكتروني مخصص حصراً للعملاء المسجلين بمكتبنا لمتابعة قضاياهم أو خدماتهم المهنية. <strong>لا يجوز</strong> استخدام النظام للاستعلام عن ملفات الآخرين دون تفويض رسمي.</div>
              </div>

            <form onSubmit={handleSubmit}>
              <div className="input-group-custom">
                <input type="tel" className="form-control-custom" placeholder="رقم الهاتف" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                <span className="fixed-prefix">20</span>
              </div>
              <div className="input-group-custom">
                <input type="text" className="form-control-custom" placeholder="JELR-26-0001-ABC123 أو RE-26-000001-ABC123" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} required style={{ textTransform: 'uppercase' }} />
              </div>
              <div className="consent-wrapper">
                <input type="checkbox" id="consentCheck" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
                <label htmlFor="consentCheck" className="consent-label">أقر بأنني <strong>صاحب القضية</strong> أو <strong>مفوض قانونياً</strong> بالاستعلام عنها، وأتحمل كامل المسؤولية القانونية عن أي استخدام غير مصرح به.</label>
              </div>
              <button type="submit" className="btn-gold btn-search" disabled={!consent || loading}>
                {loading ? 'جاري التحقق...' : <><Icon name="search" style={{ marginLeft: '0.5rem' }} /> الاطلاع</>}
              </button>
            </form>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero-title { margin-bottom: 2.8rem !important; }
        .search-card { max-width: 600px; margin: 0 auto; background: var(--pure-white); border-radius: 16px; padding: 2.5rem 2rem; border: 1px solid rgba(0,0,0,0.04); box-shadow: 0 2px 10px rgba(0,0,0,0.02); transition: all 0.4s var(--ease-out); position: relative; overflow: visible; }
        .search-card::after { content: ''; position: absolute; bottom: 0; right: 0; width: 0; height: 3px; background: var(--matte-gold); transition: width 0.6s var(--ease-out); }
        .search-card:hover::after { width: 100%; }
        .search-card:hover { border-color: var(--matte-gold); box-shadow: 0 8px 30px rgba(0,0,0,0.04); }
        .search-card .icon-header { width: 64px; height: 64px; border-radius: 50%; background: rgba(176,141,87,0.05); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; }
        .search-card .icon-header .icon-svg { font-size: 1.8rem; color: var(--matte-gold); }
        .search-card h2 { font-size: 1.8rem; font-weight: 900; color: var(--charcoal); text-align: center; margin-bottom: 0.3rem; }
        .search-card .sub { text-align: center; color: var(--charcoal); font-weight: 700; font-size: 0.95rem; margin-bottom: 1.8rem; }
        .legal-disclaimer { background: rgba(176,141,87,0.03); border-right: 3px solid var(--matte-gold); padding: 1rem 1.2rem; border-radius: 10px; margin-bottom: 1.5rem; display: block; }
        .legal-disclaimer .disclaimer-title { font-weight: 700; font-size: 0.8rem; color: var(--charcoal); margin-bottom: 0.2rem; display: flex; align-items: center; gap: 0.4rem; }
        .legal-disclaimer .disclaimer-title .icon-svg { color: var(--matte-gold); }
        .legal-disclaimer .disclaimer-text { font-size: 0.8rem; color: var(--charcoal); line-height: 1.8; font-weight: 700; }
        .legal-disclaimer .disclaimer-text strong { color: var(--charcoal); font-weight: 700; }
        .consent-wrapper { display: flex; align-items: flex-start; gap: 0.6rem; margin-bottom: 1.2rem; padding: 0.8rem 1rem; background: var(--light-gray); border-radius: 10px; border: 1px solid rgba(0,0,0,0.04); transition: all 0.3s ease; }
        .consent-wrapper:focus-within { border-color: var(--matte-gold); box-shadow: 0 0 0 3px rgba(176,141,87,0.05); }
        .consent-wrapper input[type="checkbox"] { width: 20px; height: 20px; min-width: 20px; margin-top: 0.2rem; accent-color: var(--matte-gold); cursor: pointer; }
        .consent-wrapper .consent-label { font-size: 0.8rem; color: var(--charcoal); font-weight: 700; line-height: 1.6; }
        .consent-wrapper .consent-label strong { color: var(--charcoal); font-weight: 700; }
        .input-group-custom { display: flex; align-items: center; background: #FFFFFF !important; border: 1px solid #D1D1D1 !important; border-radius: 10px; margin-bottom: 1rem; overflow: hidden; transition: all 0.3s ease; }
        .input-group-custom:focus-within { border-color: var(--matte-gold) !important; box-shadow: 0 0 0 3px rgba(176,141,87,0.05); }
        .input-group-custom .form-control-custom { background: #FFFFFF !important; border: none !important; color: #222222 !important; padding: 0.7rem 0.8rem; width: 100%; font-size: 1rem; outline: none; text-align: right; display: block; font-weight: 700; }
        .input-group-custom .form-control-custom::placeholder { color: #999999 !important; font-weight: 300; opacity: 1; }
        .input-group-custom .fixed-prefix { background: #F5F5F5 !important; color: #555555 !important; padding: 0.7rem 0.8rem; font-weight: 700; font-size: 0.85rem; border-left: 1px solid #E5E5E5 !important; font-family: monospace; flex-shrink: 0; }
        .btn-search { width: 100%; padding: 0.8rem; border-radius: 10px; font-size: 1rem; font-weight: 700; margin-top: 0.5rem; }
        .btn-search:disabled { opacity: 0.5; cursor: not-allowed; transform: none !important; box-shadow: none !important; }
        @media (max-width: 820px) { .search-card { padding: 1.8rem 1.2rem; } .hero-title { margin-bottom: 1.8rem !important; } }
        @media (max-width: 640px) { .search-card h2 { font-size: 1.4rem; } .input-group-custom .form-control-custom { font-size: 0.9rem; padding: 0.5rem 0.6rem; } .input-group-custom .fixed-prefix { padding: 0.5rem 0.6rem; font-size: 0.75rem; } .legal-disclaimer { padding: 0.8rem 1rem; } .consent-wrapper { padding: 0.6rem 0.8rem; } .hero-title { margin-bottom: 1.5rem !important; } }
      `}</style>
    </Layout>
  );
}
