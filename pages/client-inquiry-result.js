import Layout from '../components/Layout';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import Icon from '../components/Icon';

export default function ClientInquiryResult() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('caseData');
      if (!stored) { setError('لا توجد بيانات في الجلسة'); return; }
      const parsed = JSON.parse(stored);
      const now = Date.now();
      const maxAge = 5 * 60 * 1000;
      if (now - parsed._timestamp > maxAge) { setError('انتهت صلاحية البيانات'); return; }
      setData(parsed);
    } catch (e) { setError('بيانات غير صالحة'); }
  }, []);

  const exitSystem = () => {
    Swal.fire({
      icon: 'success',
      title: 'شكراً لك',
      text: 'شكراً لاستخدامكم نظام الاستعلام الإلكتروني لمؤسسة جاد الرب.',
      background: '#FAFAF8',
      color: '#222222',
      confirmButtonColor: '#B08D57',
      confirmButtonText: 'إغلاق',
      timer: 3000
    }).then(() => {
      sessionStorage.removeItem('caseData');
      router.push('/');
    });
  };

  if (error) {
    return (
      <Layout>
        <Head>
          {/* SEO: منع فهرسة حالة الخطأ أيضاً لأن المسار يعرض نتيجة استعلام داخلية. */}
          <meta name="robots" content="noindex, nofollow" />
          <title>خطأ في الاستعلام</title>
        </Head>
        <section className="result-main">
          <div className="inner reveal">
            <div className="result-card">
              <div className="error-container">
                <Icon name="exclamation-triangle" style={{ fontSize: '3rem', color: '#dc2626', marginBottom: '0.5rem' }} />
                <h3>عذراً</h3>
                <p>{error}</p>
                <div className="error-actions">
                  <a href="/client-inquiry" className="btn-gold" style={{ padding: '10px 28px', fontSize: '0.9rem' }}>العودة للاستعلام</a>
                  <button onClick={() => window.location.reload()} className="btn-outline-gold" style={{ padding: '10px 28px', fontSize: '0.9rem' }}>إعادة المحاولة</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <style jsx>{`
          .result-main { flex: 1; padding: 3rem 2rem 5rem; background: var(--warm-off-white); }
          .result-main .inner { max-width: 900px; margin: 0 auto; }
          .result-card { background: var(--pure-white); border-radius: 16px; padding: 2.5rem 2rem; border: 1px solid rgba(0,0,0,0.04); box-shadow: 0 2px 10px rgba(0,0,0,0.02); transition: all 0.4s var(--ease-out); position: relative; overflow: hidden; }
          .result-card::after { content: ''; position: absolute; bottom: 0; right: 0; width: 0; height: 3px; background: var(--matte-gold); transition: width 0.6s var(--ease-out); }
          .result-card:hover::after { width: 100%; }
          .result-card:hover { border-color: var(--matte-gold); box-shadow: 0 8px 30px rgba(0,0,0,0.04); }
          .error-container { padding: 2rem 0; text-align: center; }
          .error-container h3 { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.3rem; color: var(--charcoal); }
          .error-container p { color: rgba(34,34,34,0.5); max-width: 480px; margin: 0 auto; }
          .error-actions { display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap; margin-top: 1.5rem; }
        `}</style>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <Head>
          {/* SEO: منع فهرسة حالة التحميل حتى لا تُحفظ صفحة مؤقتة بلا بيانات في نتائج البحث. */}
          <meta name="robots" content="noindex, nofollow" />
          <title>جاري التحميل...</title>
        </Head>
        <section className="result-main">
          <div className="inner reveal">
            <div className="result-card">
              <div className="loading-container">
                <div className="spinner"></div>
                <p>جاري عرض بيانات القضية...</p>
              </div>
            </div>
          </div>
        </section>
        <style jsx>{`
          .result-main { flex: 1; padding: 3rem 2rem 5rem; background: var(--warm-off-white); }
          .result-main .inner { max-width: 900px; margin: 0 auto; }
          .result-card { background: var(--pure-white); border-radius: 16px; padding: 2.5rem 2rem; border: 1px solid rgba(0,0,0,0.04); box-shadow: 0 2px 10px rgba(0,0,0,0.02); transition: all 0.4s var(--ease-out); position: relative; overflow: hidden; }
          .result-card::after { content: ''; position: absolute; bottom: 0; right: 0; width: 0; height: 3px; background: var(--matte-gold); transition: width 0.6s var(--ease-out); }
          .result-card:hover::after { width: 100%; }
          .result-card:hover { border-color: var(--matte-gold); box-shadow: 0 8px 30px rgba(0,0,0,0.04); }
          .loading-container { padding: 2rem 0; text-align: center; }
          .spinner { display: inline-block; width: 40px; height: 40px; border: 4px solid rgba(176,141,87,0.15); border-radius: 50%; border-top-color: var(--matte-gold); animation: spin 0.8s linear infinite; }
          @keyframes spin { to { transform: rotate(360deg); } }
          .loading-container p { color: rgba(34,34,34,0.5); margin-top: 1rem; }
        `}</style>
      </Layout>
    );
  }

  const fileType = data.file_type || 'judicial';
  const file = data.file || data.case;

  // الخدمات المهنية تستخدم سجل أحداث مختلفًا عن جلسات القضايا القضائية.
  if (fileType !== 'judicial') {
    const events = [...(data.events || [])].sort((a, b) => new Date(b.event_date) - new Date(a.event_date));
    const typeLabels = { real_estate: 'تسجيل عقار - الشهر العقاري', company_formation: 'إنشاء شركة', administrative: 'خدمة مهنية إدارية' };
    return (
      <Layout>
        <Head><title>متابعة الخدمة المهنية | مؤسسة جاد الرب</title><meta name="robots" content="noindex, nofollow" /></Head>
        <section className="hero-result" aria-label="نتيجة متابعة الخدمة المهنية"><div className="hero-pattern"></div><div className="hero-glow"></div><div className="hero-glow-2"></div><div className="hero-inner"><div className="hero-title-wrap reveal"><span className="en-tag">Professional Service</span><h1>متابعة <span className="gold-text">الخدمة المهنية</span></h1><p className="sub">{typeLabels[fileType] || 'ملف مهني'}</p></div></div></section>
        <section className="result-main"><div className="inner reveal"><div className="result-card professional-result-card">
          <div className="result-header"><h2>{file.client_name || 'غير معروف'}</h2><span className="badge-role">{typeLabels[fileType] || 'خدمة مهنية'}</span></div>
          <div className="info-grid">
            <div className="info-item"><span className="info-label">كود الملف</span><span className="info-value">{file.file_code || 'غير متاح'}</span></div>
            <div className="info-item"><span className="info-label">اسم الخدمة</span><span className="info-value">{file.title || 'غير محدد'}</span></div>
            <div className="info-item"><span className="info-label">الحالة الحالية</span><span className="info-value status">{file.status || 'قيد الإجراء'}</span></div>
            <div className="info-item"><span className="info-label">آخر تحديث</span><span className="info-value">{file.updated_at ? new Date(file.updated_at).toLocaleDateString('ar-EG') : 'غير محدد'}</span></div>
            {file.description && <div className="info-item info-item-wide"><span className="info-label">وصف الخدمة</span><span className="info-value">{file.description}</span></div>}
          </div>
          <section className="sessions-history professional-events" aria-labelledby="professional-events-title"><div className="sessions-history-heading"><div><span className="section-kicker">مراحل إنجاز الخدمة</span><h3 id="professional-events-title">سجل المتابعة</h3></div><span className="sessions-count">{events.length} تحديث</span></div>
            {events.length ? <div className="sessions-timeline">{events.map((event, index) => <article className={`session-card ${index === 0 ? 'session-card-latest' : ''}`} key={event.id || index}><div className="session-marker">{events.length - index}</div><div className="session-card-content"><div className="session-card-topline"><time dateTime={event.event_date}>{event.event_date ? new Date(event.event_date).toLocaleDateString('ar-EG', { dateStyle: 'full' }) : 'تاريخ غير محدد'}</time><span className="session-status status-new">{event.status || 'قيد الإجراء'}</span></div><div className="session-decision-label">التحديث</div><p className="session-decision">{event.title}{event.details ? ` — ${event.details}` : ''}</p></div></article>)}</div> : <div className="sessions-empty"><Icon name="briefcase" /><strong>لا توجد تحديثات مسجلة حتى الآن</strong><span>ستظهر مراحل الخدمة هنا عند تحديث الملف.</span></div>}
          </section>
          <div className="modal-actions"><button className="btn-action btn-print" onClick={() => window.print()}><Icon name="print" style={{ marginLeft: '0.4rem' }} /> طباعة</button><a href="/client-inquiry" className="btn-action btn-new"><Icon name="search" style={{ marginLeft: '0.4rem' }} /> بحث جديد</a><button className="btn-action btn-exit" onClick={exitSystem}><Icon name="sign-out-alt" style={{ marginLeft: '0.4rem' }} /> خروج</button></div>
        </div></div></section>
        <style jsx>{`.professional-result-card { border-top: 3px solid var(--matte-gold); } .info-item-wide { grid-column: 1 / -1; }`}</style>
      </Layout>
    );
  }

  const c = file;
  // ترتيب نسخة محلية من الجلسات يضمن أن آخر جلسة فعلية تظهر حتى لو تغيّر ترتيب RPC.
  const sessions = [...(data.sessions || [])].sort((a, b) => new Date(b.session_date) - new Date(a.session_date));
  const lastSession = sessions.length > 0 ? sessions[0] : null;
  const upcomingSession = [...sessions].reverse().find((session) => new Date(session.session_date) > new Date());
  const formatSessionDate = (date) => {
    if (!date) return 'تاريخ غير محدد';
    const parsedDate = new Date(date);
    return Number.isNaN(parsedDate.getTime()) ? 'تاريخ غير محدد' : parsedDate.toLocaleDateString('ar-EG', { dateStyle: 'full' });
  };
  const getStatusClass = (status) => {
    const normalized = String(status || '').trim();
    if (normalized.includes('محكوم')) return 'status-judgment';
    if (normalized.includes('مؤجل')) return 'status-postponed';
    if (normalized.includes('موقوف')) return 'status-stopped';
    if (normalized.includes('مشطوب')) return 'status-closed';
    return 'status-new';
  };

  return (
    <Layout>
      <Head>
        {/* SEO: هذه النتيجة خاصة بالعميل وتعتمد على sessionStorage؛ لا تُفهرس في أي حالة. */}
        <title>نتيجة الاستعلام | الأستاذ محمود عبد الحميد</title>
        <meta name="description" content="نتيجة استعلام قضيتك – مؤسسة جاد الرب للمحاماة." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://ostazlaw.vercel.app/client-inquiry-result" />
        <meta property="og:title" content="نتيجة الاستعلام | الأستاذ محمود عبد الحميد" />
        <meta property="og:description" content="نتيجة استعلام قضيتك." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ostazlaw.vercel.app/client-inquiry-result" />
        <meta property="og:image" content="https://ostazlaw.vercel.app/mahmoud-abdel-hamid-lawyer-portrait.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://ostazlaw.vercel.app/mahmoud-abdel-hamid-lawyer-portrait.webp" />
      </Head>

      <section className="hero-result" aria-label="نتيجة الاستعلام">
        <div className="hero-pattern"></div>
        <div className="hero-glow"></div>
        <div className="hero-glow-2"></div>
        <div className="hero-inner">
          <div className="hero-title-wrap reveal">
            <span className="en-tag">Inquiry Result</span>
            <h1>نتيجة <span className="gold-text">الاستعلام</span></h1>
            <p className="sub">تفاصيل قضيتك</p>
          </div>
        </div>
      </section>

      <section className="result-main">
        <div className="inner reveal">
          <div className="result-card">
            <div className="result-header">
              <h2>{c.client_name || 'غير معروف'}</h2>
              <span className="badge-role">{c.client_role || 'عميل'}</span>
            </div>
            <div className="info-grid">
              {/* عرض case_code يطابق الكود الذي أنشأه qayd ويساعد العميل على تأكيد القضية الصحيحة. */}
              <div className="info-item"><span className="info-label">كود القضية</span><span className="info-value">{c.case_code || 'غير متاح'}</span></div>
              <div className="info-item"><span className="info-label">اسم الخصم</span><span className="info-value">{c.opponent_name || 'غير محدد'}</span></div>
              <div className="info-item"><span className="info-label">المحكمة</span><span className="info-value">{c.court_name || 'غير محدد'}</span></div>
              <div className="info-item"><span className="info-label">رقم القضية</span><span className="info-value">{(c.case_number || '') + (c.case_year ? ' / ' + c.case_year : '')}</span></div>
              <div className="info-item"><span className="info-label">الدائرة</span><span className="info-value">{c.circuit || 'غير محدد'}</span></div>
              <div className="info-item"><span className="info-label">موضوع الدعوى</span><span className="info-value">{c.case_subject || 'غير محدد'}</span></div>
              <div className="info-item"><span className="info-label">حالة القضية</span><span className="info-value status">{lastSession ? lastSession.case_status : 'جديدة'}</span></div>
            </div>
            <div className="last-session-box">
              <h5><Icon name="clock" /> آخر جلسة مسجلة</h5>
              <div className="date">{lastSession ? formatSessionDate(lastSession.session_date) : 'لا توجد جلسات مسجلة'}</div>
              <div className="decision">{lastSession ? lastSession.decision || 'لم يسجل قرار' : 'سيظهر هنا آخر إجراء عند تسجيل جلسة.'}</div>
            </div>

            {/* سجل زمني متتابع يعرض جميع الجلسات التي أعادها RPC من الأحدث إلى الأقدم. */}
            <section className="sessions-history" aria-labelledby="sessions-history-title">
              <div className="sessions-history-heading">
                <div>
                  <span className="section-kicker">التحديثات القضائية</span>
                  <h3 id="sessions-history-title">سجل الجلسات</h3>
                </div>
                <span className="sessions-count">{sessions.length} {sessions.length === 1 ? 'جلسة' : 'جلسات'}</span>
              </div>

              {upcomingSession && (
                <div className="upcoming-session" role="status">
                  <Icon name="calendar" />
                  <span><strong>الجلسة القادمة:</strong> {formatSessionDate(upcomingSession.session_date)}</span>
                </div>
              )}

              {sessions.length > 0 ? (
                <div className="sessions-timeline">
                  {sessions.map((session, index) => {
                    const status = session.case_status || 'جديدة';
                    return (
                      <article className={`session-card ${index === 0 ? 'session-card-latest' : ''}`} key={session.id || `${session.session_date}-${index}`}>
                        <div className="session-marker" aria-hidden="true">{sessions.length - index}</div>
                        <div className="session-card-content">
                          <div className="session-card-topline">
                            <time dateTime={session.session_date || undefined}>{formatSessionDate(session.session_date)}</time>
                            <span className={`session-status ${getStatusClass(status)}`}>{status}</span>
                          </div>
                          <div className="session-decision-label">القرار / الإجراء</div>
                          <p className="session-decision">{session.decision || 'لم يسجل قرار أو إجراء لهذه الجلسة.'}</p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="sessions-empty">
                  <Icon name="calendar" />
                  <strong>لا توجد جلسات مسجلة حتى الآن</strong>
                  <span>ستظهر مواعيد الجلسات والقرارات هنا عند تحديث ملف القضية.</span>
                </div>
              )}
            </section>

            <div className="modal-actions">
              <button className="btn-action btn-print" onClick={() => window.print()}><Icon name="print" style={{ marginLeft: '0.4rem' }} /> طباعة</button>
              <a href="/client-inquiry" className="btn-action btn-new"><Icon name="search" style={{ marginLeft: '0.4rem' }} /> بحث جديد</a>
              <button className="btn-action btn-exit" onClick={exitSystem}><Icon name="sign-out-alt" style={{ marginLeft: '0.4rem' }} /> خروج</button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero-result { padding: 120px 2rem 3rem; background: var(--very-dark-navy); position: relative; overflow: hidden; min-height: 35vh; display: flex; align-items: center; }
        .hero-result .hero-pattern { position: absolute; inset: 0; opacity: 0.03; background-image: radial-gradient(circle at 20% 30%, var(--matte-gold) 1px, transparent 1px), radial-gradient(circle at 80% 70%, var(--matte-gold) 1px, transparent 1px); background-size: 60px 60px; pointer-events: none; }
        .hero-result .hero-glow { position: absolute; width: 60vw; height: 60vw; border-radius: 50%; background: radial-gradient(circle, rgba(176,141,87,0.04) 0%, transparent 70%); top: -20%; right: -20%; pointer-events: none; animation: orbFloat 20s ease-in-out infinite alternate; }
        .hero-result .hero-glow-2 { position: absolute; width: 40vw; height: 40vw; border-radius: 50%; background: radial-gradient(circle, rgba(176,141,87,0.02) 0%, transparent 70%); bottom: -20%; left: -10%; pointer-events: none; animation: orbFloat 25s ease-in-out infinite alternate-reverse; }
        @keyframes orbFloat { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(40px, -30px) scale(1.05); } }
        .hero-result .hero-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; width: 100%; }
        .hero-result .hero-title-wrap { text-align: center; }
        .hero-result .hero-title-wrap .en-tag { font-size: 0.65rem; font-weight: 800; letter-spacing: 0.4em; text-transform: uppercase; color: var(--matte-gold); opacity: 0.5; display: block; margin-bottom: 0.3rem; }
        .hero-result .hero-title-wrap h1 { font-size: clamp(2.4rem, 5vw, 4rem); font-weight: 900; color: #fff; line-height: 1.1; }
        .hero-result .hero-title-wrap h1 .gold-text { color: var(--matte-gold); }
        .hero-result .hero-title-wrap .sub { font-size: clamp(1rem, 1.3vw, 1.2rem); font-weight: 400; color: rgba(255,255,255,0.55); max-width: 700px; margin: 0.8rem auto 0; line-height: 1.7; }
        .result-main { flex: 1; padding: 3rem 2rem 5rem; background: var(--warm-off-white); }
        .result-main .inner { max-width: 900px; margin: 0 auto; }
        .result-card { background: var(--pure-white); border-radius: 16px; padding: 2.5rem 2rem; border: 1px solid rgba(0,0,0,0.04); box-shadow: 0 2px 10px rgba(0,0,0,0.02); transition: all 0.4s var(--ease-out); position: relative; overflow: hidden; }
        .result-card::after { content: ''; position: absolute; bottom: 0; right: 0; width: 0; height: 3px; background: var(--matte-gold); transition: width 0.6s var(--ease-out); }
        .result-card:hover::after { width: 100%; }
        .result-card:hover { border-color: var(--matte-gold); box-shadow: 0 8px 30px rgba(0,0,0,0.04); }
        .result-header { text-align: center; border-bottom: 1px solid rgba(0,0,0,0.04); padding-bottom: 1.2rem; margin-bottom: 1.2rem; }
        .result-header h2 { font-size: 2rem; font-weight: 900; color: var(--matte-gold); margin-bottom: 0.1rem; }
        .badge-role { background: var(--light-gray); color: rgba(34,34,34,0.5); padding: 0.2rem 1rem; border-radius: 50px; font-size: 0.8rem; font-weight: 500; display: inline-block; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; margin-bottom: 1.2rem; }
        .info-item { background: var(--light-gray); padding: 0.8rem 1rem; border-radius: 10px; border: 1px solid rgba(0,0,0,0.02); transition: all 0.3s ease; }
        .info-item:hover { border-color: var(--matte-gold); transform: translateY(-1px); box-shadow: 0 4px 16px rgba(176,141,87,0.04); }
        .info-item .info-label { display: block; font-size: 0.65rem; color: rgba(34,34,34,0.3); font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; }
        .info-item .info-value { font-size: 0.95rem; font-weight: 700; color: var(--charcoal); margin-top: 0.1rem; display: block; word-break: break-word; }
        .info-item .info-value.status { color: var(--matte-gold); }
        .last-session-box { background: rgba(176,141,87,0.03); border-right: 3px solid var(--matte-gold); padding: 1rem 1.2rem; border-radius: 10px; margin-bottom: 1.2rem; }
        .last-session-box h5 { font-size: 0.85rem; font-weight: 700; color: var(--charcoal); margin-bottom: 0.3rem; }
        .last-session-box h5 .icon-svg { color: var(--matte-gold); margin-left: 0.4rem; }
        .last-session-box .date { color: var(--matte-gold); font-weight: 700; font-size: 0.95rem; }
        .last-session-box .decision { color: rgba(34,34,34,0.5); font-weight: 300; font-size: 0.85rem; margin-top: 0.2rem; }
        .sessions-history { margin: 1.6rem 0 1.4rem; padding-top: 1.4rem; border-top: 1px solid rgba(0,0,0,0.05); }
        .sessions-history-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem; margin-bottom: 1rem; }
        .section-kicker { display: block; color: var(--matte-gold); font-size: 0.68rem; font-weight: 800; letter-spacing: 0.08em; margin-bottom: 0.2rem; }
        .sessions-history-heading h3 { margin: 0; color: var(--charcoal); font-size: 1.35rem; font-weight: 900; }
        .sessions-count { color: rgba(34,34,34,0.5); background: var(--light-gray); border-radius: 999px; padding: 0.35rem 0.75rem; font-size: 0.75rem; font-weight: 700; white-space: nowrap; }
        .upcoming-session { display: flex; align-items: center; gap: 0.55rem; margin-bottom: 1rem; padding: 0.75rem 0.9rem; color: var(--charcoal); background: rgba(176,141,87,0.08); border: 1px solid rgba(176,141,87,0.22); border-radius: 10px; font-size: 0.82rem; }
        .upcoming-session .icon-svg { color: var(--matte-gold); }
        .sessions-timeline { position: relative; display: grid; gap: 0.75rem; }
        .sessions-timeline::before { content: ''; position: absolute; top: 1.25rem; bottom: 1.25rem; right: 1rem; width: 1px; background: rgba(176,141,87,0.3); }
        .session-card { position: relative; display: flex; gap: 0.85rem; align-items: stretch; }
        .session-marker { z-index: 1; flex: 0 0 2rem; width: 2rem; height: 2rem; display: grid; place-items: center; border-radius: 50%; background: var(--light-gray); border: 1px solid rgba(176,141,87,0.35); color: var(--matte-gold); font-size: 0.72rem; font-weight: 900; }
        .session-card-content { flex: 1; min-width: 0; padding: 0.85rem 1rem; border: 1px solid rgba(0,0,0,0.05); border-radius: 11px; background: #fff; box-shadow: 0 2px 10px rgba(0,0,0,0.025); }
        .session-card-latest .session-card-content { border-color: rgba(176,141,87,0.38); box-shadow: 0 4px 16px rgba(176,141,87,0.08); }
        .session-card-topline { display: flex; align-items: center; justify-content: space-between; gap: 0.7rem; flex-wrap: wrap; }
        .session-card-topline time { color: var(--charcoal); font-size: 0.82rem; font-weight: 800; }
        .session-status { display: inline-flex; align-items: center; border-radius: 999px; padding: 0.25rem 0.65rem; font-size: 0.7rem; font-weight: 800; }
        .status-new { color: #8a6a20; background: #fff8e7; }
        .status-postponed { color: #8b5e16; background: #fff0d2; }
        .status-stopped { color: #7b3f3f; background: #f9e4e4; }
        .status-closed { color: #5f6368; background: #eef0f2; }
        .status-judgment { color: #276749; background: #e5f5eb; }
        .session-decision-label { margin-top: 0.7rem; color: rgba(34,34,34,0.4); font-size: 0.68rem; font-weight: 800; }
        .session-decision { margin: 0.15rem 0 0; color: rgba(34,34,34,0.72); font-size: 0.88rem; line-height: 1.8; white-space: pre-wrap; overflow-wrap: anywhere; }
        .sessions-empty { display: grid; justify-items: center; gap: 0.45rem; padding: 1.5rem 1rem; border: 1px dashed rgba(176,141,87,0.35); border-radius: 11px; background: rgba(176,141,87,0.03); text-align: center; color: rgba(34,34,34,0.55); font-size: 0.82rem; }
        .sessions-empty .icon-svg { color: var(--matte-gold); font-size: 1.35rem; }
        .sessions-empty strong { color: var(--charcoal); font-size: 0.9rem; }
        .modal-actions { display: flex; gap: 0.8rem; justify-content: center; border-top: 1px solid rgba(0,0,0,0.04); padding-top: 1.2rem; flex-wrap: wrap; }
        .btn-action { flex: 1; padding: 0.6rem; border-radius: 10px; font-weight: 700; font-size: 0.85rem; transition: all 0.4s var(--ease-out); border: 1px solid transparent; cursor: pointer; text-align: center; min-width: 120px; }
        .btn-print { border-color: var(--matte-gold); color: var(--matte-gold); background: transparent; }
        .btn-print:hover { background: var(--matte-gold); color: #000; }
        .btn-new { background: var(--charcoal); color: #fff; }
        .btn-new:hover { background: #333; }
        .btn-exit { background: #dc2626; color: #fff; }
        .btn-exit:hover { background: #b91c1c; }
        @media (max-width: 820px) { .hero-result { padding: 100px 1rem 2rem; min-height: auto; } .result-main { padding: 2rem 1rem 3rem; } .result-card { padding: 1.8rem 1.2rem; } .info-grid { grid-template-columns: 1fr; } .modal-actions { flex-direction: column; align-items: stretch; } .result-header h2 { font-size: 1.6rem; } }
        @media (max-width: 640px) { .result-main { padding: 90px 1rem 2rem; } .result-card { padding: 1.2rem 0.8rem; } .result-header h2 { font-size: 1.4rem; } .info-item .info-value { font-size: 0.85rem; } .last-session-box { padding: 0.8rem 1rem; } .sessions-history-heading { align-items: flex-start; } .sessions-history-heading h3 { font-size: 1.15rem; } .session-card { gap: 0.55rem; } .session-marker { flex-basis: 1.7rem; width: 1.7rem; height: 1.7rem; font-size: 0.65rem; } .sessions-timeline::before { right: 0.85rem; } .session-card-content { padding: 0.75rem; } .session-card-topline { display: grid; justify-content: stretch; gap: 0.45rem; } .session-status { justify-self: start; } .modal-actions .btn-action { font-size: 0.8rem; padding: 0.5rem 0.8rem; min-width: 80px; } }
        @media print { .site-header, .site-footer, .float-whatsapp, .float-main-btn, .float-sub-buttons, .modal-actions { display: none !important; } .result-card { box-shadow: none !important; border: 1px solid rgba(0,0,0,0.04) !important; padding: 1.5rem !important; } .result-card::after { display: none !important; } .result-main { padding-top: 1.5rem !important; background: #fff !important; } .info-item, .session-card-content { background: #f5f5f5 !important; border: 1px solid #eee !important; box-shadow: none !important; } .sessions-timeline::before { background: #bbb !important; } .session-marker { background: #fff !important; } }
      `}</style>
    </Layout>
  );
}
