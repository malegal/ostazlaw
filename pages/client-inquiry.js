import Head from 'next/head';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { getPortalFileData } from '../lib/supabase-config';

const WHATSAPP_NUMBER = '201101076000';
const MAX_ATTEMPTS = 5;
const LOCK_MS = 60 * 1000;

const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';
const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

// تحويل الأرقام العربية والفارسية إلى إنجليزية.
const toEnglishDigits = (s) =>
  s.replace(/[٠-٩۰-۹]/g, (d) => {
    const i = ARABIC_DIGITS.indexOf(d);
    return String(i > -1 ? i : PERSIAN_DIGITS.indexOf(d));
  });

// يقبل: 01101076000 أو 1101076000 أو 201101076000 أو +20 110 107 6000 أو أرقامًا عربية.
const normalizePhone = (raw) =>
  toEnglishDigits(raw)
    .replace(/\D/g, '')
    .replace(/^(00)?20/, '')
    .replace(/^0+/, '');

// يقبل كود القضية JELR أو كود الخدمة المهنية RE/CO/AD، ويوحّد الشرطات المنسوخة.
const normalizeCode = (raw) => {
  const cleaned = toEnglishDigits(raw)
    .trim()
    .toUpperCase()
    .replace(/[\u2010-\u2015\u2212]/g, '-')
    .replace(/\s+/g, '');
  return /^(JELR|MA|RE|CO|AD)-/.test(cleaned) ? cleaned : `JELR-${cleaned}`;
};

// خلفية أسوان مرسومة بالكود: نيل ليلي وقمر ومركب شراعي.
function AswanArt() {
  return (
    <svg
      className="cp-art"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="cp-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#050C15" />
          <stop offset="0.55" stopColor="#0B1B2B" />
          <stop offset="1" stopColor="#1B3F5E" />
        </linearGradient>
        <linearGradient id="cp-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#12324D" />
          <stop offset="1" stopColor="#050C15" />
        </linearGradient>
        <radialGradient id="cp-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#F3E6C4" stopOpacity="0.35" />
          <stop offset="1" stopColor="#F3E6C4" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="800" fill="url(#cp-sky)" />

      <g fill="#F3E6C4" opacity="0.7">
        <circle cx="90" cy="70" r="1.6" />
        <circle cx="180" cy="120" r="1.2" />
        <circle cx="420" cy="60" r="1.5" />
        <circle cx="520" cy="150" r="1.1" />
        <circle cx="640" cy="80" r="1.6" />
        <circle cx="760" cy="140" r="1.2" />
        <circle cx="880" cy="60" r="1.5" />
        <circle cx="990" cy="130" r="1.3" />
        <circle cx="1100" cy="90" r="1.6" />
        <circle cx="1150" cy="220" r="1.1" />
        <circle cx="560" cy="250" r="1" />
        <circle cx="340" cy="240" r="1.2" />
      </g>

      <circle cx="250" cy="180" r="150" fill="url(#cp-glow)" />
      <circle cx="250" cy="180" r="42" fill="#F3E6C4" />

      <path
        d="M0 470 L0 432 C90 402 160 446 260 421 C360 396 420 441 520 426 C640 406 720 451 830 429 C940 406 1040 441 1200 411 L1200 470 Z"
        fill="#07111C"
      />

      <rect y="470" width="1200" height="330" fill="url(#cp-water)" />

      <g fill="#D8B678">
        <circle cx="120" cy="462" r="2.2" />
        <circle cx="205" cy="455" r="1.8" />
        <circle cx="330" cy="452" r="2.2" />
        <circle cx="455" cy="458" r="1.8" />
        <circle cx="590" cy="452" r="2.2" />
        <circle cx="700" cy="462" r="1.8" />
        <circle cx="860" cy="455" r="2.2" />
        <circle cx="990" cy="450" r="1.8" />
        <circle cx="1090" cy="446" r="2.2" />
      </g>
      <g fill="#D8B678" opacity="0.28">
        <rect x="119" y="474" width="2.4" height="46" rx="1.2" />
        <rect x="204" y="474" width="2.4" height="34" rx="1.2" />
        <rect x="329" y="474" width="2.4" height="52" rx="1.2" />
        <rect x="454" y="474" width="2.4" height="38" rx="1.2" />
        <rect x="589" y="474" width="2.4" height="50" rx="1.2" />
        <rect x="699" y="474" width="2.4" height="34" rx="1.2" />
        <rect x="859" y="474" width="2.4" height="48" rx="1.2" />
        <rect x="989" y="474" width="2.4" height="36" rx="1.2" />
        <rect x="1089" y="474" width="2.4" height="54" rx="1.2" />
      </g>

      <g stroke="#F3E6C4" strokeLinecap="round" opacity="0.32">
        <line x1="205" y1="492" x2="295" y2="492" strokeWidth="3" />
        <line x1="185" y1="512" x2="315" y2="512" strokeWidth="3" />
        <line x1="215" y1="534" x2="285" y2="534" strokeWidth="2.5" />
        <line x1="170" y1="558" x2="330" y2="558" strokeWidth="2.5" />
        <line x1="205" y1="586" x2="295" y2="586" strokeWidth="2" />
        <line x1="180" y1="618" x2="320" y2="618" strokeWidth="2" />
      </g>

      <g stroke="#D8B678" strokeLinecap="round" opacity="0.12">
        <line x1="60" y1="640" x2="240" y2="640" strokeWidth="2" />
        <line x1="420" y1="660" x2="640" y2="660" strokeWidth="2" />
        <line x1="760" y1="690" x2="1010" y2="690" strokeWidth="2" />
        <line x1="120" y1="720" x2="360" y2="720" strokeWidth="2" />
        <line x1="520" y1="740" x2="820" y2="740" strokeWidth="2" />
        <line x1="900" y1="620" x2="1120" y2="620" strokeWidth="2" />
      </g>

      <g transform="translate(790 566)">
        <ellipse cx="0" cy="44" rx="110" ry="8" fill="#050C15" opacity="0.5" />
        <path d="M-100 0 L100 0 L70 24 L-78 24 Z" fill="#050C15" />
        <line x1="6" y1="0" x2="6" y2="-160" stroke="#E9DFC6" strokeWidth="3" />
        <path d="M10 -158 L122 -8 L10 -8 Z" fill="#E9DFC6" opacity="0.88" />
        <path d="M2 -120 L-70 -8 L2 -8 Z" fill="#D8B678" opacity="0.8" />
      </g>
    </svg>
  );
}

export default function ClientInquiry() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const phoneRef = useRef(null);
  const codeRef = useRef(null);
  const consentRef = useRef(null);
  const attempts = useRef(0);
  const lockUntil = useRef(0);

  // ملاحظة: هذا تقييد شكلي في المتصفح فقط. الحماية الفعلية من التخمين
  // يجب أن تكون في الخادم (تحديد عدد المحاولات لكل IP ولكل رقم هاتف).
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'السلام عليكم، أرغب في الحصول على كود متابعة ملفي.'
  )}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const now = Date.now();
    if (lockUntil.current > now) {
      const secs = Math.ceil((lockUntil.current - now) / 1000);
      setErrors({ form: `تكررت المحاولات غير الصحيحة. حاول مرة أخرى بعد ${secs} ثانية.` });
      return;
    }

    const national = normalizePhone(phone);
    const next = {};
    if (!/^\d{8,10}$/.test(national)) next.phone = 'أدخل رقم الهاتف المسجل لدى المكتب كاملًا.';
    if (!code.trim()) next.code = 'أدخل الكود كما وصلك من المكتب.';
    if (!consent) next.consent = 'يلزم الإقرار قبل عرض الملف.';

    if (Object.keys(next).length) {
      setErrors(next);
      const target = next.phone ? phoneRef : next.code ? codeRef : consentRef;
      target.current?.focus();
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      const { data, error } = await getPortalFileData('20' + national, normalizeCode(code));
      if (error || !data || !data.file) throw new Error('not-found');

      try {
        // تُخزَّن الجلسة مع وقتها لتنتهي تلقائيًا بعد مدة قصيرة في صفحة النتيجة.
        sessionStorage.setItem('caseData', JSON.stringify({ ...data, _timestamp: Date.now() }));
      } catch {
        throw new Error('storage');
      }

      attempts.current = 0;
      await router.push('/client-inquiry-result');
    } catch (err) {
      if (err && err.message === 'storage') {
        setErrors({ form: 'المتصفح يمنع حفظ بيانات الجلسة. فعّل التخزين أو جرّب متصفحًا آخر.' });
      } else {
        attempts.current += 1;
        if (attempts.current >= MAX_ATTEMPTS) {
          lockUntil.current = Date.now() + LOCK_MS;
          attempts.current = 0;
          setErrors({ form: 'تكررت المحاولات غير الصحيحة. حاول مرة أخرى بعد دقيقة، أو اطلب الكود من المكتب.' });
        } else {
          setErrors({ form: 'لم نجد ملفًا بهذه البيانات. تأكد من رقم الهاتف والكود ثم حاول مرة أخرى.' });
        }
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>متابعة الملف | جاد الرب للمحاماة والاستشارات القانونية</title>
        <meta name="description" content="متابعة الملف القانوني أو الخدمة المهنية لعملاء مكتب جاد الرب المسجلين." />
        <meta name="robots" content="noindex, nofollow, noarchive" />
        <meta name="theme-color" content="#0B1B2B" />
      </Head>

      <main className="cp-page" dir="rtl">
        <section className="cp-hero" aria-labelledby="cp-title">
          <AswanArt />
          <div className="cp-shade" aria-hidden="true" />

          <div className="cp-brand">
            <span className="cp-brand-name">مكتب جاد الرب</span>
            <span className="cp-brand-sub">للمحاماة والاستشارات القانونية</span>
          </div>

          <div className="cp-hero-body">
            <h1 id="cp-title">تابع ملفك القانوني</h1>
            <p className="cp-lead">
              أدخل رقم هاتفك والكود الذي استلمته من المكتب لمتابعة قضيتك أو خدمتك المهنية.
            </p>
            <ul className="cp-list">
              <li>آخر مستجدات قضيتك أو خدمتك المهنية</li>
              <li>مواعيد الجلسات والقرارات</li>
              <li>المستندات التي أتاحها المكتب</li>
            </ul>
          </div>

          <p className="cp-trust">محامون بالنقض والدستورية العليا</p>
        </section>

        <section className="cp-panel" aria-label="بيانات الدخول">
          <a className="cp-back" href="/">العودة للموقع الرئيسي</a>

          <div className="cp-panel-inner">
            <h2>أدخل بيانات ملفك</h2>
            <p className="cp-sub">الخدمة متاحة للعملاء المسجلين لدى المكتب فقط.</p>

            <form onSubmit={handleSubmit} noValidate aria-busy={loading}>
              <div className="cp-field">
                <label htmlFor="cp-phone">رقم الهاتف</label>
                <div className={`cp-input${errors.phone ? ' is-invalid' : ''}`} dir="ltr">
                  <span className="cp-prefix" aria-hidden="true">+20</span>
                  <input
                    id="cp-phone"
                    ref={phoneRef}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    placeholder="10 1234 5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    aria-invalid={errors.phone ? 'true' : undefined}
                    aria-describedby={errors.phone ? 'cp-phone-err' : undefined}
                  />
                </div>
                {errors.phone && <p id="cp-phone-err" className="cp-error">{errors.phone}</p>}
              </div>

              <div className="cp-field">
                <label htmlFor="cp-code">كود الملف</label>
                <div className={`cp-input${errors.code ? ' is-invalid' : ''}`}>
                  <input
                    id="cp-code"
                    ref={codeRef}
                    type="text"
                    dir="ltr"
                    autoComplete="off"
                    autoCapitalize="characters"
                    spellCheck={false}
                    placeholder="JELR-26-0001-ABC123"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    aria-invalid={errors.code ? 'true' : undefined}
                    aria-describedby={errors.code ? 'cp-code-err cp-code-hint' : 'cp-code-hint'}
                  />
                </div>
                <p id="cp-code-hint" className="cp-hint">
                  كود القضية يبدأ بـ <bdi>JELR</bdi>، وكود الخدمة المهنية يبدأ بـ <bdi>RE</bdi> أو <bdi>CO</bdi> أو <bdi>AD</bdi>.
                </p>
                {errors.code && <p id="cp-code-err" className="cp-error">{errors.code}</p>}
              </div>

              <div className="cp-field">
                <label className="cp-consent" htmlFor="cp-consent">
                  <input
                    id="cp-consent"
                    ref={consentRef}
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    aria-invalid={errors.consent ? 'true' : undefined}
                    aria-describedby={errors.consent ? 'cp-consent-err' : undefined}
                  />
                  <span>
                    أقر بأنني صاحب الملف أو مفوض رسميًا بالاطلاع عليه، وأن الاستعلام عن ملفات الآخرين
                    دون تفويض غير جائز وأتحمل مسؤوليته القانونية.
                  </span>
                </label>
                {errors.consent && <p id="cp-consent-err" className="cp-error">{errors.consent}</p>}
              </div>

              {errors.form && <div className="cp-form-error" role="alert">{errors.form}</div>}

              <button type="submit" className="cp-submit" disabled={loading}>
                {loading ? 'جاري التحقق…' : 'عرض ملفي'}
              </button>
            </form>

            <p className="cp-help">
              لا تملك الكود أو فقدته؟{' '}
              <a href={waLink} target="_blank" rel="noopener noreferrer">اطلبه من المكتب عبر واتساب</a>
            </p>
          </div>
        </section>
      </main>

      <style jsx>{`
        .cp-page {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(380px, 460px);
          min-height: 100vh;
          min-height: 100dvh;
          background: #FBFAF7;
          color: var(--charcoal, #1F2933);
        }

        /* لوحة الهوية */
        .cp-hero {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 2rem;
          padding: 2.5rem clamp(2rem, 5vw, 4.5rem);
          color: #fff;
          background-color: #0B1B2B;
        }
        .cp-hero :global(.cp-art) {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        .cp-shade {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: linear-gradient(180deg, rgba(11, 27, 43, 0.72) 0%, rgba(11, 27, 43, 0.38) 45%, rgba(11, 27, 43, 0.82) 100%);
        }
        .cp-brand, .cp-hero-body, .cp-trust { position: relative; z-index: 1; }
        .cp-brand { display: flex; flex-direction: column; gap: 0.15rem; }
        .cp-brand-name { font-size: 1.25rem; font-weight: 800; }
        .cp-brand-sub { font-size: 0.85rem; color: #D8B678; }
        .cp-hero-body { max-width: 34rem; }
        .cp-hero h1 {
          margin: 0 0 1rem;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 800;
          line-height: 1.3;
          color: #fff;
        }
        .cp-lead {
          margin: 0 0 2rem;
          font-size: 1.05rem;
          line-height: 1.9;
          color: rgba(255, 255, 255, 0.9);
          max-width: 30rem;
        }
        .cp-list { list-style: none; margin: 0; padding: 0; max-width: 30rem; }
        .cp-list li {
          padding: 0.85rem 0;
          border-top: 1px solid rgba(216, 182, 120, 0.4);
          font-size: 0.98rem;
          font-weight: 600;
        }
        .cp-list li:last-child { border-bottom: 1px solid rgba(216, 182, 120, 0.4); }
        .cp-trust { margin: 0; font-size: 0.88rem; color: rgba(255, 255, 255, 0.8); }

        /* لوحة النموذج */
        .cp-panel {
          display: flex;
          flex-direction: column;
          padding: 1.5rem clamp(1.5rem, 3vw, 2.5rem) 2rem;
        }
        .cp-back {
          align-self: flex-start;
          font-size: 0.9rem;
          font-weight: 700;
          color: #8A6A36;
          text-decoration: none;
          padding: 0.25rem 0;
        }
        .cp-back:hover { text-decoration: underline; }
        .cp-panel-inner { width: 100%; max-width: 400px; margin: auto; padding: 2rem 0; }
        .cp-panel h2 { margin: 0 0 0.35rem; font-size: 1.7rem; font-weight: 800; color: var(--charcoal, #1F2933); }
        .cp-sub { margin: 0 0 1.75rem; font-size: 0.95rem; color: #4B5560; }

        .cp-field { margin-bottom: 1.15rem; }
        .cp-field label:not(.cp-consent) {
          display: block;
          margin-bottom: 0.4rem;
          font-size: 0.92rem;
          font-weight: 700;
        }
        .cp-input {
          display: flex;
          align-items: center;
          min-height: 48px;
          background: #fff;
          border: 1px solid #8E969F;
          border-radius: 8px;
          overflow: hidden;
          transition: border-color 0.18s ease, box-shadow 0.18s ease;
        }
        .cp-input:hover { border-color: #5B6570; }
        .cp-input:focus-within {
          border-color: var(--matte-gold, #B08D57);
          box-shadow: 0 0 0 3px rgba(176, 141, 87, 0.28);
        }
        .cp-input.is-invalid { border-color: #B42318; }
        .cp-input input {
          flex: 1;
          min-width: 0;
          border: 0;
          outline: none;
          background: transparent;
          padding: 0.75rem 0.9rem;
          font-family: inherit;
          font-size: 16px;
          font-weight: 600;
          color: #1F2933;
          text-align: left;
        }
        .cp-input input::placeholder { color: #6B747E; font-weight: 500; opacity: 1; }
        .cp-prefix {
          display: flex;
          align-items: center;
          align-self: stretch;
          padding: 0 0.9rem;
          font-family: ui-monospace, monospace;
          font-size: 0.95rem;
          font-weight: 700;
          color: #4B5560;
          background: #F3F4F6;
          border-inline-end: 1px solid #DDE1E6;
        }
        .cp-hint { margin: 0.4rem 0 0; font-size: 0.82rem; line-height: 1.7; color: #4B5560; }
        .cp-error { margin: 0.4rem 0 0; font-size: 0.85rem; font-weight: 600; color: #B42318; }

        .cp-consent {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          padding: 0.8rem 0.9rem;
          background: #F3F4F6;
          border-radius: 8px;
          font-size: 0.84rem;
          line-height: 1.7;
          font-weight: 600;
          cursor: pointer;
        }
        .cp-consent input {
          flex: 0 0 20px;
          width: 20px;
          height: 20px;
          margin-top: 0.15rem;
          accent-color: var(--matte-gold, #B08D57);
          cursor: pointer;
        }
        .cp-consent input:focus-visible { outline: 2px solid #0B1B2B; outline-offset: 2px; }

        .cp-form-error {
          margin-bottom: 1rem;
          padding: 0.75rem 1rem;
          background: #FDF1F0;
          border: 1px solid #F1B8B2;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          line-height: 1.7;
          color: #8A1C13;
        }

        .cp-submit {
          width: 100%;
          min-height: 50px;
          border: 0;
          border-radius: 8px;
          background: var(--matte-gold, #B08D57);
          color: #0B1B2B;
          font-family: inherit;
          font-size: 1rem;
          font-weight: 800;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .cp-submit:hover:not(:disabled) { background: #C29E64; }
        .cp-submit:focus-visible { outline: 3px solid #0B1B2B; outline-offset: 3px; }
        .cp-submit:disabled { opacity: 0.75; cursor: progress; }

        .cp-help { margin: 1.25rem 0 0; font-size: 0.88rem; color: #4B5560; }
        .cp-help a { font-weight: 700; color: #8A6A36; }

        /* الجوال والتابلت: الهوية مضغوطة فوق النموذج */
        @media (max-width: 900px) {
          .cp-page { grid-template-columns: 1fr; }
          .cp-hero { gap: 1.25rem; padding: 1.5rem 1.25rem 1.75rem; }
          .cp-hero h1 { font-size: 1.75rem; margin-bottom: 0.5rem; }
          .cp-lead { margin: 0; font-size: 0.95rem; line-height: 1.8; }
          .cp-list, .cp-trust { display: none; }
          .cp-panel { padding: 1.25rem 1.25rem 2rem; }
          .cp-panel-inner { padding: 1.25rem 0 0; }
          .cp-panel h2 { font-size: 1.4rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cp-input, .cp-submit { transition: none; }
        }
      `}</style>
    </>
  );
}
