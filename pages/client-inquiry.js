import Head from 'next/head';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { getPortalFileData } from '../lib/supabase-config';

const HERO_IMAGE = '/hero-legal-aswan.jpg';
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
        <link rel="preload" as="image" href={HERO_IMAGE} />
      </Head>

      <main className="cp-page" dir="rtl">
        <section
          className="cp-hero"
          aria-labelledby="cp-title"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(11,27,43,.78) 0%, rgba(11,27,43,.50) 42%, rgba(11,27,43,.90) 100%), url(${HERO_IMAGE})`,
          }}
        >
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
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 2rem;
          padding: 2.5rem clamp(2rem, 5vw, 4.5rem);
          color: #fff;
          background-color: #0B1B2B;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
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
          text-shadow: 0 2px 16px rgba(0, 0, 0, 0.35);
        }
        .cp-lead {
          margin: 0 0 2rem;
          font-size: 1.05rem;
          line-height: 1.9;
          color: rgba(255, 255, 255, 0.92);
          max-width: 30rem;
        }
        .cp-list { list-style: none; margin: 0; padding: 0; max-width: 30rem; }
        .cp-list li {
          padding: 0.85rem 0;
          border-top: 1px solid rgba(216, 182, 120, 0.45);
          font-size: 0.98rem;
          font-weight: 600;
        }
        .cp-list li:last-child { border-bottom: 1px solid rgba(216, 182, 120, 0.45); }
        .cp-trust { margin: 0; font-size: 0.88rem; color: rgba(255, 255, 255, 0.82); }

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
          .cp-hero { gap: 1.25rem; padding: 1.5rem 1.25rem 1.75rem; background-position: center 35%; }
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
