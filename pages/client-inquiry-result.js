import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const SESSION_KEY = 'caseData';
const MAX_AGE_MS = 5 * 60 * 1000; // مدة الجلسة بعد الدخول (5 دقائق)
const WHATSAPP_NUMBER = '201101076000';

const KIND_LABELS = {
  judicial: 'قضية',
  real_estate: 'تسجيل عقار - الشهر العقاري',
  company_formation: 'إنشاء شركة',
  administrative: 'خدمة مهنية إدارية',
};

const ERRORS = {
  none: {
    title: 'لا توجد جلسة استعلام',
    text: 'لعرض ملفك، أدخل رقم الهاتف والكود من صفحة الدخول.',
  },
  expired: {
    title: 'انتهت جلسة الاستعلام',
    text: 'أُغلقت الجلسة تلقائيًا حفاظًا على خصوصية ملفك. أدخل بياناتك مرة أخرى للاطلاع عليه.',
  },
  invalid: {
    title: 'تعذر قراءة بيانات الملف',
    text: 'حدث خلل في بيانات الجلسة. أدخل بياناتك مرة أخرى من صفحة الدخول.',
  },
};

const val = (v, fallback = 'غير محدد') =>
  v === null || v === undefined || String(v).trim() === '' ? fallback : v;

const toTime = (value) => {
  if (!value) return -Infinity;
  const t = new Date(value).getTime();
  return Number.isNaN(t) ? -Infinity : t;
};

const formatDate = (value) =>
  toTime(value) === -Infinity
    ? 'تاريخ غير محدد'
    : new Date(value).toLocaleDateString('ar-EG', { dateStyle: 'full' });

const sortByDateDesc = (list, key) =>
  [...(list || [])].sort((a, b) => {
    const ta = toTime(a[key]);
    const tb = toTime(b[key]);
    return ta === tb ? 0 : tb - ta;
  });

const clearSession = () => {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {}
};

const getStatusClass = (status) => {
  const s = String(status || '').trim();
  if (s.includes('محكوم')) return 'cr-status-judgment';
  if (s.includes('مؤجل')) return 'cr-status-postponed';
  if (s.includes('موقوف')) return 'cr-status-stopped';
  if (s.includes('مشطوب')) return 'cr-status-closed';
  return 'cr-status-new';
};

function SessionTimer({ expiresAt, onExpire }) {
  const [left, setLeft] = useState(() => Math.max(0, expiresAt - Date.now()));

  useEffect(() => {
    const id = setInterval(() => {
      const remaining = expiresAt - Date.now();
      if (remaining <= 0) {
        clearInterval(id);
        onExpire();
      } else {
        setLeft(remaining);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [expiresAt, onExpire]);

  const total = Math.ceil(left / 1000);
  const mm = String(Math.floor(total / 60)).padStart(2, '0');
  const ss = String(total % 60).padStart(2, '0');

  return (
    <span className="cr-timer" role="timer" aria-label="الوقت المتبقي للجلسة">
      تنتهي الجلسة خلال <bdi dir="ltr">{mm}:{ss}</bdi>
    </span>
  );
}

function Timeline({ title, countLabel, items, emptyTitle, emptyText }) {
  return (
    <section className="cr-history" aria-labelledby="cr-history-title">
      <div className="cr-history-head">
        <h2 className="cr-section-title" id="cr-history-title">{title}</h2>
        <span className="cr-count">{countLabel}</span>
      </div>

      {items.length ? (
        <ol className="cr-timeline">
          {items.map((item, index) => (
            <li className={`cr-item${index === 0 ? ' cr-item-latest' : ''}`} key={item.key}>
              <span className="cr-marker" aria-hidden="true">{items.length - index}</span>
              <div className="cr-item-body">
                <div className="cr-item-top">
                  <span className="cr-item-when">
                    <time dateTime={item.dateTime}>{item.date}</time>
                    {index === 0 && items.length > 1 && <span className="cr-latest">الأحدث</span>}
                  </span>
                  <span className={`cr-chip ${item.statusClass}`}>{item.status}</span>
                </div>
                <div className="cr-item-label">{item.label}</div>
                <p className="cr-item-text">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <div className="cr-empty">
          <strong>{emptyTitle}</strong>
          {emptyText}
        </div>
      )}
    </section>
  );
}

function Frame({ title, extra, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="robots" content="noindex, nofollow, noarchive" />
        <meta name="theme-color" content="#0B1B2B" />
      </Head>

      <div className="cr-root" dir="rtl">
        <header className="cr-bar">
          <div className="cr-bar-inner">
            <div className="cr-brand">
              <strong>مكتب جاد الرب</strong>
              <span>للمحاماة والاستشارات القانونية</span>
            </div>
            {extra}
          </div>
        </header>
        {children}
      </div>

      <style jsx global>{`
        .cr-root {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          min-height: 100dvh;
          background: #FBFAF7;
          color: var(--charcoal, #1F2933);
        }

        /* الشريط العلوي */
        .cr-bar { background: #0B1B2B; color: #fff; }
        .cr-bar-inner {
          max-width: 920px;
          margin: 0 auto;
          padding: 1rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .cr-brand { display: flex; flex-direction: column; gap: 0.1rem; }
        .cr-brand strong { font-size: 1.1rem; font-weight: 800; }
        .cr-brand span { font-size: 0.8rem; color: #D8B678; }
        .cr-timer { font-size: 0.85rem; color: rgba(255, 255, 255, 0.85); white-space: nowrap; }
        .cr-timer bdi {
          margin-inline-start: 0.25rem;
          font-family: ui-monospace, monospace;
          font-weight: 700;
          color: #D8B678;
        }

        .cr-content { flex: 1; width: 100%; max-width: 920px; margin: 0 auto; padding: 2rem 1.25rem 3.5rem; }
        .cr-print-head { display: none; }

        /* العنوان */
        .cr-kind { margin: 0 0 0.3rem; font-size: 0.9rem; font-weight: 700; color: #8A6A36; }
        .cr-title h1 {
          margin: 0;
          font-size: clamp(1.7rem, 4vw, 2.4rem);
          font-weight: 800;
          line-height: 1.3;
          color: var(--charcoal, #1F2933);
        }
        .cr-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem; margin-top: 0.7rem; }
        .cr-badge {
          padding: 0.2rem 0.85rem;
          border-radius: 999px;
          background: #EEF0F2;
          font-size: 0.82rem;
          font-weight: 700;
          color: #3B4550;
        }
        .cr-code { font-family: ui-monospace, monospace; font-size: 0.85rem; color: #4B5560; }

        /* الملخص */
        .cr-summary {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
          margin: 1.5rem 0 2.25rem;
          background: #0B1B2B;
          color: #fff;
          border-radius: 12px;
          overflow: hidden;
        }
        .cr-summary-main {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.5rem;
          padding: 1.5rem 1.6rem;
        }
        .cr-label { font-size: 0.85rem; font-weight: 700; color: #D8B678; }
        .cr-main-value { font-size: clamp(1.3rem, 3vw, 1.75rem); font-weight: 800; line-height: 1.5; }
        .cr-main-note { font-size: 0.88rem; line-height: 1.7; color: rgba(255, 255, 255, 0.75); }
        .cr-summary-side {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin: 0;
          padding: 1.25rem 1.5rem;
          background: rgba(255, 255, 255, 0.06);
          border-inline-start: 1px solid rgba(216, 182, 120, 0.35);
        }
        .cr-summary-side dt { margin-bottom: 0.2rem; font-size: 0.8rem; font-weight: 700; color: #D8B678; }
        .cr-summary-side dd { margin: 0; font-size: 0.95rem; line-height: 1.75; color: #fff; overflow-wrap: anywhere; }
        .cr-side-date { display: block; font-size: 0.8rem; color: rgba(255, 255, 255, 0.72); }

        /* بيانات الملف */
        .cr-section-title { margin: 0 0 0.9rem; font-size: 1.25rem; font-weight: 800; color: var(--charcoal, #1F2933); }
        .cr-facts { display: grid; grid-template-columns: 1fr 1fr; gap: 0 2rem; margin: 0; border-bottom: 1px solid #E3E6EA; }
        .cr-fact { padding: 0.85rem 0; border-top: 1px solid #E3E6EA; }
        .cr-fact-wide { grid-column: 1 / -1; }
        .cr-fact dt { margin-bottom: 0.2rem; font-size: 0.82rem; font-weight: 700; color: #5B6570; }
        .cr-fact dd { margin: 0; font-size: 1rem; font-weight: 700; line-height: 1.7; overflow-wrap: anywhere; }

        /* السجل الزمني */
        .cr-history { margin-top: 2.5rem; }
        .cr-history-head { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; margin-bottom: 1rem; }
        .cr-history-head .cr-section-title { margin: 0; }
        .cr-count { font-size: 0.85rem; font-weight: 700; color: #4B5560; }
        .cr-timeline { position: relative; list-style: none; margin: 0; padding: 0; }
        .cr-timeline::before {
          content: '';
          position: absolute;
          top: 1rem;
          bottom: 1rem;
          inset-inline-start: calc(1rem - 0.5px);
          width: 1px;
          background: rgba(176, 141, 87, 0.5);
        }
        .cr-item { position: relative; display: flex; gap: 0.9rem; margin-bottom: 0.8rem; }
        .cr-marker {
          z-index: 1;
          flex: 0 0 2rem;
          width: 2rem;
          height: 2rem;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #fff;
          border: 1px solid #B08D57;
          color: #8A6A36;
          font-size: 0.78rem;
          font-weight: 800;
        }
        .cr-item-body {
          flex: 1;
          min-width: 0;
          padding: 0.9rem 1rem;
          background: #fff;
          border: 1px solid #E3E6EA;
          border-radius: 10px;
        }
        .cr-item-latest .cr-item-body { border-color: #B08D57; box-shadow: 0 0 0 1px rgba(176, 141, 87, 0.25); }
        .cr-item-top { display: flex; align-items: center; justify-content: space-between; gap: 0.7rem; flex-wrap: wrap; }
        .cr-item-when { display: inline-flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; }
        .cr-item-when time { font-size: 0.92rem; font-weight: 800; }
        .cr-latest { font-size: 0.78rem; font-weight: 800; color: #8A6A36; }
        .cr-chip { display: inline-flex; align-items: center; padding: 0.2rem 0.7rem; border-radius: 999px; font-size: 0.78rem; font-weight: 800; }
        .cr-status-new { color: #7A5A12; background: #FFF3D6; }
        .cr-status-postponed { color: #7A4E0F; background: #FFE7BF; }
        .cr-status-stopped { color: #7B3030; background: #F9E1E1; }
        .cr-status-closed { color: #4A4F55; background: #EAECEF; }
        .cr-status-judgment { color: #1F5E3E; background: #DDF3E6; }
        .cr-item-label { margin-top: 0.6rem; font-size: 0.8rem; font-weight: 700; color: #5B6570; }
        .cr-item-text { margin: 0.15rem 0 0; font-size: 0.95rem; line-height: 1.9; color: #2B333B; white-space: pre-wrap; overflow-wrap: anywhere; }
        .cr-empty {
          padding: 1.5rem 1rem;
          border: 1px dashed rgba(176, 141, 87, 0.5);
          border-radius: 10px;
          text-align: center;
          font-size: 0.9rem;
          line-height: 1.8;
          color: #4B5560;
        }
        .cr-empty strong { display: block; margin-bottom: 0.2rem; font-size: 0.95rem; color: #1F2933; }

        /* الإجراءات */
        .cr-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 2.25rem; padding-top: 1.5rem; border-top: 1px solid #E3E6EA; }
        .cr-btn {
          flex: 1 1 140px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          padding: 0.6rem 1rem;
          border: 1px solid transparent;
          border-radius: 8px;
          font-family: inherit;
          font-size: 0.95rem;
          font-weight: 800;
          text-align: center;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .cr-btn:focus-visible { outline: 3px solid #0B1B2B; outline-offset: 3px; }
        .cr-btn-primary { background: var(--matte-gold, #B08D57); color: #0B1B2B; }
        .cr-btn-primary:hover { background: #C29E64; }
        .cr-btn-outline { background: transparent; border-color: #8A6A36; color: #6E5228; }
        .cr-btn-outline:hover { background: rgba(176, 141, 87, 0.12); }
        .cr-btn-dark { background: #0B1B2B; color: #fff; }
        .cr-btn-dark:hover { background: #16324F; }
        .cr-note { margin: 1.25rem 0 0; font-size: 0.85rem; line-height: 1.8; color: #4B5560; }
        .cr-note a { font-weight: 700; color: #8A6A36; }

        /* حالات الخطأ والتحميل */
        .cr-state { flex: 1; width: 100%; max-width: 520px; margin: 0 auto; padding: 4rem 1.25rem; text-align: center; }
        .cr-state h1 { margin: 0 0 0.6rem; font-size: 1.5rem; font-weight: 800; color: var(--charcoal, #1F2933); }
        .cr-state p { margin: 0 0 1.5rem; line-height: 1.9; color: #4B5560; }
        .cr-state .cr-btn { flex: none; min-width: 220px; }
        .cr-spinner {
          width: 36px;
          height: 36px;
          margin: 0 auto 1rem;
          border: 4px solid rgba(176, 141, 87, 0.2);
          border-top-color: #B08D57;
          border-radius: 50%;
          animation: cr-spin 0.8s linear infinite;
        }
        @keyframes cr-spin { to { transform: rotate(360deg); } }

        @media (max-width: 700px) {
          .cr-bar-inner { padding: 0.85rem 1rem; }
          .cr-timer { font-size: 0.78rem; }
          .cr-content { padding: 1.5rem 1rem 3rem; }
          .cr-summary { grid-template-columns: 1fr; }
          .cr-summary-side { border-inline-start: 0; border-top: 1px solid rgba(216, 182, 120, 0.35); }
          .cr-facts { grid-template-columns: 1fr; }
          .cr-item { gap: 0.6rem; }
          .cr-marker { flex-basis: 1.75rem; width: 1.75rem; height: 1.75rem; font-size: 0.7rem; }
          .cr-timeline::before { inset-inline-start: calc(0.875rem - 0.5px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .cr-spinner { animation-duration: 2.4s; }
          .cr-btn { transition: none; }
        }

        /* الطباعة: ورقة نظيفة بترويسة المكتب دون أزرار */
        @media print {
          .cr-bar, .cr-actions { display: none !important; }
          .cr-root { background: #fff; }
          .cr-content { max-width: none; padding: 0; }
          .cr-print-head {
            display: block;
            margin-bottom: 1.25rem;
            padding-bottom: 0.75rem;
            border-bottom: 2px solid #B08D57;
            font-size: 0.85rem;
            line-height: 1.8;
          }
          .cr-summary { background: #fff; color: #000; border: 1px solid #999; }
          .cr-summary-side { background: #F5F5F5; border-inline-start-color: #bbb; }
          .cr-label, .cr-summary-side dt { color: #6E5228; }
          .cr-main-note, .cr-summary-side dd, .cr-side-date { color: #222; }
          .cr-item { break-inside: avoid; }
          .cr-item-body { box-shadow: none !important; }
        }
      `}</style>
    </>
  );
}

export default function ClientInquiryResult() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [expiresAt, setExpiresAt] = useState(0);

  useEffect(() => {
    let raw = null;
    try {
      raw = sessionStorage.getItem(SESSION_KEY);
    } catch {
      raw = null;
    }
    if (!raw) {
      setError(ERRORS.none);
      return;
    }

    let parsed = null;
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = null;
    }
    if (!parsed || !(parsed.file || parsed.case)) {
      clearSession();
      setError(ERRORS.invalid);
      return;
    }

    // أي جلسة بلا وقت صالح تُعتبر منتهية (حماية للخصوصية).
    const issuedAt = Number(parsed._timestamp);
    if (!issuedAt || Date.now() - issuedAt >= MAX_AGE_MS) {
      clearSession();
      setError(ERRORS.expired);
      return;
    }

    setExpiresAt(issuedAt + MAX_AGE_MS);
    setData(parsed);
  }, []);

  const handleExpire = useCallback(() => {
    clearSession();
    setData(null);
    setError(ERRORS.expired);
  }, []);

  const endSession = (to) => {
    clearSession();
    router.push(to);
  };

  if (error) {
    return (
      <Frame title="تعذر عرض الملف | جاد الرب">
        <main className="cr-state">
          <h1>{error.title}</h1>
          <p>{error.text}</p>
          <a href="/client-inquiry" className="cr-btn cr-btn-primary">العودة لصفحة الدخول</a>
        </main>
      </Frame>
    );
  }

  if (!data) {
    return (
      <Frame title="جاري التحميل | جاد الرب">
        <main className="cr-state" role="status">
          <div className="cr-spinner" aria-hidden="true" />
          <p>جاري عرض بيانات الملف…</p>
        </main>
      </Frame>
    );
  }

  const fileType = data.file_type || 'judicial';
  const file = data.file || data.case;
  const isJudicial = fileType === 'judicial';

  const todayStart = new Date().setHours(0, 0, 0, 0);
  const tomorrowStart = todayStart + 24 * 60 * 60 * 1000;
  // جلسة اليوم تُعد منعقدة إذا سُجل لها قرار، وإلا تبقى "قادمة".
  const isHeld = (s) => {
    const t = toTime(s.session_date);
    return t < todayStart || (t < tomorrowStart && Boolean(String(s.decision || '').trim()));
  };

  let view;

  if (isJudicial) {
    const sessions = sortByDateDesc(data.sessions, 'session_date');
    const status = (sessions[0] && sessions[0].case_status) || 'جديدة';
    const lastHeld = sessions.find(isHeld);
    const upcoming = sessions.filter((s) => !isHeld(s)).pop();
    const upcomingIsToday = upcoming && toTime(upcoming.session_date) < tomorrowStart;
    const caseNo = [file.case_number, file.case_year].filter(Boolean).join(' / ');

    view = {
      pageTitle: 'نتيجة الاستعلام | جاد الرب',
      kind: KIND_LABELS.judicial,
      badge: val(file.client_role, 'عميل'),
      code: file.case_code || '',
      summary: {
        main: {
          label: 'الجلسة القادمة',
          value: upcoming
            ? `${upcomingIsToday ? 'اليوم: ' : ''}${formatDate(upcoming.session_date)}`
            : 'لا توجد جلسة قادمة مسجلة',
          note: upcoming ? null : 'سيظهر موعد الجلسة التالية هنا عند تسجيله.',
        },
        side: [
          {
            label: 'حالة القضية',
            value: <span className={`cr-chip ${getStatusClass(status)}`}>{status}</span>,
          },
          {
            label: 'آخر إجراء',
            value: lastHeld ? (
              <>
                <span className="cr-side-date">{formatDate(lastHeld.session_date)}</span>
                {lastHeld.decision || 'لم يسجل قرار'}
              </>
            ) : (
              'لا توجد جلسات مسجلة'
            ),
          },
        ],
      },
      facts: [
        { label: 'كود القضية', value: val(file.case_code, 'غير متاح'), ltr: true },
        { label: 'رقم القضية', value: val(caseNo) },
        { label: 'المحكمة', value: val(file.court_name) },
        { label: 'الدائرة', value: val(file.circuit) },
        { label: 'اسم الخصم', value: val(file.opponent_name) },
        { label: 'موضوع الدعوى', value: val(file.case_subject), wide: true },
      ],
      timeline: {
        title: 'سجل الجلسات',
        countLabel: `${sessions.length} ${sessions.length === 1 ? 'جلسة' : 'جلسات'}`,
        emptyTitle: 'لا توجد جلسات مسجلة حتى الآن',
        emptyText: 'ستظهر مواعيد الجلسات والقرارات هنا عند تحديث ملف القضية.',
        items: sessions.map((s, i) => {
          const st = s.case_status || 'جديدة';
          return {
            key: s.id || `${s.session_date}-${i}`,
            date: formatDate(s.session_date),
            dateTime: toTime(s.session_date) === -Infinity ? undefined : s.session_date,
            status: st,
            statusClass: getStatusClass(st),
            label: 'القرار / الإجراء',
            text: s.decision || 'لم يسجل قرار أو إجراء لهذه الجلسة.',
          };
        }),
      },
    };
  } else {
    const events = sortByDateDesc(data.events, 'event_date');
    const latest = events[0];

    view = {
      pageTitle: 'متابعة الخدمة المهنية | جاد الرب',
      kind: KIND_LABELS[fileType] || 'ملف مهني',
      badge: 'خدمة مهنية',
      code: file.file_code || '',
      summary: {
        main: { label: 'الحالة الحالية', value: val(file.status, 'قيد الإجراء'), note: null },
        side: [
          { label: 'آخر تحديث', value: file.updated_at ? formatDate(file.updated_at) : 'غير محدد' },
          { label: 'آخر إجراء', value: latest ? val(latest.title, 'تحديث') : 'لا توجد تحديثات مسجلة بعد' },
        ],
      },
      facts: [
        { label: 'كود الملف', value: val(file.file_code, 'غير متاح'), ltr: true },
        { label: 'اسم الخدمة', value: val(file.title) },
        ...(file.description ? [{ label: 'وصف الخدمة', value: file.description, wide: true }] : []),
      ],
      timeline: {
        title: 'سجل المتابعة',
        countLabel: `${events.length} تحديث`,
        emptyTitle: 'لا توجد تحديثات مسجلة حتى الآن',
        emptyText: 'ستظهر مراحل الخدمة هنا عند تحديث الملف.',
        items: events.map((e, i) => ({
          key: e.id || `${e.event_date}-${i}`,
          date: formatDate(e.event_date),
          dateTime: toTime(e.event_date) === -Infinity ? undefined : e.event_date,
          status: e.status || 'قيد الإجراء',
          statusClass: 'cr-status-new',
          label: 'التحديث',
          text: `${val(e.title, 'تحديث')}${e.details ? ` — ${e.details}` : ''}`,
        })),
      },
    };
  }

  const viewedAt = new Date(Number(data._timestamp)).toLocaleString('ar-EG', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'السلام عليكم، لدي استفسار بخصوص ملفي.'
  )}`;

  return (
    <Frame
      title={view.pageTitle}
      extra={<SessionTimer expiresAt={expiresAt} onExpire={handleExpire} />}
    >
      <main className="cr-content">
        <div className="cr-print-head">
          مكتب جاد الرب للمحاماة والاستشارات القانونية. بيانات الملف كما ظهرت وقت الاطلاع في {viewedAt}
        </div>

        <section className="cr-title">
          <p className="cr-kind">{view.kind}</p>
          <h1>{val(file.client_name, 'غير معروف')}</h1>
          <div className="cr-meta">
            <span className="cr-badge">{view.badge}</span>
            {view.code && <span className="cr-code" dir="ltr">{view.code}</span>}
          </div>
        </section>

        <section className="cr-summary" aria-label="ملخص الملف">
          <div className="cr-summary-main">
            <span className="cr-label">{view.summary.main.label}</span>
            <strong className="cr-main-value">{view.summary.main.value}</strong>
            {view.summary.main.note && <span className="cr-main-note">{view.summary.main.note}</span>}
          </div>
          <dl className="cr-summary-side">
            {view.summary.side.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="cr-facts-title">
          <h2 className="cr-section-title" id="cr-facts-title">بيانات الملف</h2>
          <dl className="cr-facts">
            {view.facts.map((f) => (
              <div className={`cr-fact${f.wide ? ' cr-fact-wide' : ''}`} key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.ltr ? <bdi dir="ltr">{f.value}</bdi> : f.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <Timeline {...view.timeline} />

        <div className="cr-actions">
          <button type="button" className="cr-btn cr-btn-outline" onClick={() => window.print()}>
            طباعة
          </button>
          <button type="button" className="cr-btn cr-btn-primary" onClick={() => endSession('/client-inquiry')}>
            بحث جديد
          </button>
          <button type="button" className="cr-btn cr-btn-dark" onClick={() => endSession('/')}>
            خروج
          </button>
        </div>

        <p className="cr-note">
          هذه البيانات هي آخر ما سجله المكتب وقت اطلاعك. للاستفسار عن أي تفصيل{' '}
          <a href={waLink} target="_blank" rel="noopener noreferrer">تواصل مع المكتب عبر واتساب</a>.
        </p>
      </main>
    </Frame>
  );
}
