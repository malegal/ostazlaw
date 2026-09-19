import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Icon from '../components/Icon';

export default function Contact() {
  const [audience, setAudience] = useState('individual');
  const [submitted, setSubmitted] = useState(false);
  const [deliveryChannel, setDeliveryChannel] = useState('email');
  const [sentChannel, setSentChannel] = useState('email');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const audienceParam = params.get('audience');
    if (audienceParam === 'business') setAudience('business');
    const specialty = params.get('specialty');
    if (specialty) {
      const subject = document.getElementById('subject');
      if (subject) subject.value = `استشارة بخصوص: ${specialty}`;
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (key) => String(data.get(key) || '').trim();
    const audienceLabel = audience === 'business' ? 'شركة' : 'شخص طبيعي';
    const attachment = data.get('attachment');
    const attachmentName = attachment && attachment.name ? attachment.name : 'لا يوجد مرفق';
    const lines = [
      'طلب استشارة قانونية - مكتب جاد الرب',
      `صفة مقدم الطلب: ${audienceLabel}`,
      `${audience === 'business' ? 'اسم الشركة' : 'الاسم بالكامل'}: ${get('name')}`,
      `رقم الهاتف: ${get('phone')}`,
      `رقم الواتساب: ${get('whatsapp') || 'نفس رقم الهاتف'}`,
      `نوع المشكلة: ${get('problemType')}`,
      `المحافظة / المدينة: ${get('location')}`,
      `طريقة التواصل المفضلة: ${get('preferredChannel')}`,
      `درجة الاستعجال: ${get('urgency')}`,
      `البريد الإلكتروني: ${get('email') || 'غير مذكور'}`,
      `المرفق: ${attachmentName}${attachmentName !== 'لا يوجد مرفق' ? ' (يرجى إرساله لاحقًا عبر واتساب)' : ''}`,
      '',
      `المشكلة القانونية:
${get('details')}`,
    ];
    const body = lines.join('\n');
    const subject = `طلب استشارة قانونية - ${get('name') || 'طلب جديد'}`;
    setSubmitted(true);
    setSentChannel(get('preferredChannel') === 'واتساب' ? 'whatsapp' : 'email');
    if (get('preferredChannel') === 'واتساب') {
      window.open(`https://wa.me/201101076000?text=${encodeURIComponent(body)}`, '_blank', 'noopener,noreferrer');
    } else {
      window.open(`mailto:ma.law.firm@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank', 'noopener,noreferrer');
    }
  };

  const Field = ({ id, label, type = 'text', placeholder, required = true }) => (
    <div className="form-field-modern">
      <label htmlFor={id}>{label}{!required && <span className="optional-label"> (اختياري)</span>}</label>
      <div className="field-control">
        <input id={id} name={id} type={type} placeholder={placeholder || ''} aria-label={label} required={required} />
      </div>
    </div>
  );

  return (
    <Layout>
      <Head>
        <title>تواصل معنا | مكتب جاد الرب للمحاماة والاستشارات القانونية</title>
        <meta name="description" content="تواصل مع مكتب جاد الرب للمحاماة والاستشارات القانونية، مقره أسوان ويقدم خدماته للعملاء في مختلف محافظات مصر. احجز موعداً أو اطلب استشارة أو تمثيلاً قانونياً." />
        <link rel="canonical" href="https://ostazlaw.vercel.app/contact" />
        <meta property="og:title" content="تواصل معنا | مكتب جاد الرب للمحاماة والاستشارات القانونية" />
        <meta property="og:description" content="تواصل مع مكتب جاد الرب للمحاماة والاستشارات القانونية، مقره أسوان ويقدم خدماته للعملاء في مختلف محافظات مصر." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ostazlaw.vercel.app/contact" />
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
                "name": "مكتب جاد الرب للمحاماة والاستشارات القانونية",
                "alternateName": "JAD ELRAB",
                "description": "مكتب محاماة مصري مقره أسوان ويقدم خدمات المحاماة والاستشارات القانونية للأفراد والشركات في مختلف محافظات مصر.",
                "url": "https://ostazlaw.vercel.app/",
                "email": "ma.law.firm@outlook.com",
                "telephone": "+201101076000",
                "areaServed": [
                  { "@type": "City", "name": "أسوان" },
                  { "@type": "Country", "name": "مصر" }
                ],
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
                "@type": "Person",
                "@id": "https://ostazlaw.vercel.app/#founder",
                "name": "محمود عبد الحميد جاد الرب",
                "jobTitle": "المحامي بالنقض والدستورية والإدارية العليا",
                "worksFor": { "@id": "https://ostazlaw.vercel.app/#organization" },
                "url": "https://ostazlaw.vercel.app/about",
                "image": {
                  "@type": "ImageObject",
                  "url": "https://ostazlaw.vercel.app/mahmoud-abdel-hamid-lawyer-portrait.webp",
                  "caption": "الأستاذ محمود عبد الحميد جاد الرب – المحامي بالنقض والدستورية والإدارية العليا"
                }
              },
              {
                "@type": "ContactPage",
                "@id": "https://ostazlaw.vercel.app/contact#webpage",
                "url": "https://ostazlaw.vercel.app/contact",
                "name": "تواصل معنا",
                "description": "تواصل مع مكتب جاد الرب للمحاماة والاستشارات القانونية.",
                "isPartOf": { "@id": "https://ostazlaw.vercel.app/#website" },
                "about": { "@id": "https://ostazlaw.vercel.app/#organization" }
              },
              {
                "@type": "WebSite",
                "@id": "https://ostazlaw.vercel.app/#website",
                "name": "مكتب جاد الرب للمحاماة والاستشارات القانونية",
                "url": "https://ostazlaw.vercel.app/",
                "description": "مكتب محاماة مصري يقدم خدمات المحاماة والاستشارات القانونية."
              }
            ]
          })
        }} />
      </Head>

      <section className="hero-contact" aria-label="تواصل معنا">
        <div className="hero-pattern"></div>
        <div className="hero-glow"></div>
        <div className="hero-glow-2"></div>
        <div className="hero-inner">
          <div className="hero-title-wrap reveal">
            <span className="en-tag">LEGAL CONSULTATION</span>
            <h1>افهم موقفك القانوني <span className="gold-text">قبل خطوتك التالية</span></h1>
            <p className="sub">ابدأ من الوقائع والمستندات، وسنساعدك على تحديد المسار الأنسب — استشارة، مراجعة مستند، موعد أو تمثيل قانوني.</p>
          </div>
        </div>
      </section>

      <section className="section-content" aria-label="طلب الاستشارة والتواصل">
        <div className="inner">
          <div className="consultation-process reveal" aria-label="مراحل بدء الخدمة">
            <div className="process-heading">
              <span className="form-kicker">كيف نبدأ معك؟</span>
              <h2>مسار واضح من أول رسالة</h2>
              <p>لا تحتاج إلى معرفة اسم الدعوى أو تقديم ملف كامل في البداية. اكتب ما حدث بطريقتك، وسنوضح لك الخطوة التالية.</p>
            </div>
            <div className="process-steps">
              <div className="process-step"><span>01</span><div><strong>تشرح ما حدث</strong><small>ملخص بسيط للمسألة وما تريد الوصول إليه.</small></div></div>
              <div className="process-step"><span>02</span><div><strong>نقرأ الصورة الأولية</strong><small>نراجع البيانات ونحدد ما يلزم لفهم الموقف.</small></div></div>
              <div className="process-step"><span>03</span><div><strong>نوضح المسار المناسب</strong><small>استشارة أو موعد أو مراجعة مستندات أو تمثيل قانوني.</small></div></div>
            </div>
          </div>

          <div id="service-form" className="contact-form-shell consultation-primary reveal" style={{ scrollMarginTop: '96px' }}>
            <div className="form-intro">
              <span className="form-kicker">الخطوة الأولى</span>
              <h2>اعرض مسألتك على المكتب</h2>
              <p>اكتب الوقائع بلغتك، وسنراجع الطلب الأولي ونحدد معك طريقة التواصل والخطوة المناسبة.</p>
              <div className="consultation-scope-note"><Icon name="shield-alt" /><span><strong>قبل الإرسال</strong> هذه الخطوة لا تعني قبول القضية أو نشوء علاقة محاماة. الاستشارة الأولية مخصصة لفهم الوقائع وتحديد المسار، ولا تشمل إعداد مذكرات أو مراجعة ملفات مطولة أو التمثيل القضائي إلا باتفاق مستقل.</span></div>
            </div>

            <form id="serviceForm" onSubmit={handleSubmit} className="contact-form">
              <div className="consultation-form-intro">
                <span className="form-kicker">بداية سهلة وواضحة</span>
                <h3>احكِ لنا مشكلتك القانونية</h3>
                <p>أرسل بياناتك وملخص المشكلة والمستندات المتاحة. يراجع المكتب الطلب أولًا، ثم يتواصل معك ويحدد الخطوة التالية.</p>
              </div>

              <div className="consultation-payment-note"><Icon name="check-circle" /><span><strong>لا يوجد دفع عند إرسال الطلب</strong> يتم تحديد نطاق الخدمة والمقابل بعد مراجعة المكتب والتواصل معك.</span></div>

              <fieldset className="form-step reference-form-step">
                <legend><span className="step-number">01</span><span><strong>بيانات مقدم الطلب</strong><small>الحقول الأساسية حتى يسهل عليك التواصل معنا</small></span></legend>
                <div className="form-grid">
                  <div className="form-field-modern">
                    <label htmlFor="audience">صفة مقدم الطلب *</label>
                    <div className="field-control"><select id="audience" name="audience" value={audience} onChange={(e) => setAudience(e.target.value)} aria-label="صفة مقدم الطلب" required><option value="individual">شخص طبيعي</option><option value="business">شركة</option></select></div>
                  </div>
                  <Field id="name" label={audience === 'business' ? 'اسم الشركة' : 'الاسم بالكامل'} placeholder={audience === 'business' ? 'اسم الشركة' : 'الاسم بالكامل'} />
                  <Field id="phone" label="رقم الهاتف" type="tel" placeholder="01xxxxxxxxx" />
                  <div className="form-field-modern whatsapp-field">
                    <label htmlFor="whatsapp">رقم واتساب <span className="optional-label">اتركه فارغًا إن كان نفس الهاتف</span></label>
                    <div className="field-control"><input id="whatsapp" name="whatsapp" type="tel" placeholder="اتركه فارغًا إن كان نفس الهاتف" aria-label="رقم واتساب" /><label className="same-phone-label"><input type="checkbox" onChange={(e) => { const field = document.getElementById('whatsapp'); if (field) field.value = e.target.checked ? document.getElementById('phone').value : ''; }} /> نفس رقم الهاتف</label></div>
                  </div>
                </div>
              </fieldset>

              <fieldset className="form-step reference-form-step">
                <legend><span className="step-number">02</span><span><strong>تفاصيل الطلب</strong><small>اختر الأقرب واكتب ما حدث بطريقتك</small></span></legend>
                <div className="form-grid">
                  <div className="form-field-modern"><label htmlFor="problemType">نوع المشكلة *</label><div className="field-control"><select id="problemType" name="problemType" required aria-label="نوع المشكلة"><option value="">اختر النوع الأقرب</option><option>أسرة</option><option>جنائي</option><option>مدني</option><option>تجاري</option><option>شركات</option><option>عمالي</option><option>عقاري</option><option>ميراث</option><option>تنفيذ أحكام</option><option>أخرى</option></select></div></div>
                  <Field id="location" label="المحافظة / المدينة" placeholder="مثال: أسوان - أسوان" />
                  <div className="form-field-modern"><label htmlFor="preferredChannel">طريقة إرسال الطلب *</label><div className="field-control"><select id="preferredChannel" name="preferredChannel" value={deliveryChannel === 'email' ? 'بريد إلكتروني' : 'واتساب'} onChange={(e) => setDeliveryChannel(e.target.value === 'واتساب' ? 'whatsapp' : 'email')} required aria-label="طريقة إرسال الطلب"><option value="بريد إلكتروني">البريد الإلكتروني — مناسب للمستندات</option><option value="واتساب">واتساب — أسرع للتواصل</option></select></div></div>
                  <div className="form-field-modern"><label htmlFor="urgency">درجة الاستعجال *</label><div className="field-control"><select id="urgency" name="urgency" required aria-label="درجة الاستعجال"><option>عادية</option><option>مهمة - يوجد موعد قريب</option><option>عاجلة جدًا</option></select></div></div>
                  <Field id="email" label="البريد الإلكتروني" type="email" placeholder="اختياري" required={false} />
                </div>
                <div className="form-field-modern reference-full-field"><label htmlFor="details">ما المشكلة القانونية؟ *</label><div className="field-control"><textarea id="details" name="details" rows="6" placeholder="اكتب الوقائع باختصار: من الأطراف؟ ماذا حدث؟ هل توجد جلسة أو ميعاد قريب؟ وما المطلوب من المكتب؟" aria-label="ما المشكلة القانونية" required></textarea></div><small className="field-hint">لا يلزم استخدام مصطلحات قانونية؛ اكتب ما حدث بطريقتك.</small></div>
              </fieldset>

              <fieldset className="form-step reference-form-step">
                <legend><span className="step-number">03</span><span><strong>المستندات والموافقة</strong><small>يمكنك إرفاق ما يساعد على فهم الحالة</small></span></legend>
                <div className="form-field-modern attachment-field"><label htmlFor="attachment">مستندات تساعد على فهم الحالة <span className="optional-label">اختياري الآن</span></label><div className="field-control"><input id="attachment" name="attachment" type="file" aria-label="مستندات تساعد على فهم الحالة" /></div><small className="field-hint">يمكنك أيضًا ذكر المستندات أو إرسالها لاحقًا عبر واتساب.</small></div>
                <label className="consent-wrapper"><input type="checkbox" name="consent" required /><span className="consent-label">أوافق أن إرسال الطلب لا يعني قبول القضية أو قيام علاقة محاماة، وأن المكتب سيحدد الخطوة التالية ونطاق الخدمة بعد المراجعة.</span></label>
              </fieldset>

              <button type="submit" className="premium-submit"><span>{deliveryChannel === 'email' ? 'إرسال الطلب عبر البريد الإلكتروني' : 'إرسال الطلب عبر واتساب'}</span><Icon name={deliveryChannel === 'email' ? 'envelope' : 'whatsapp'} /></button>
              <p className="form-privacy"><Icon name="shield-alt" /> نحافظ على سرية بياناتك، وسيتم استخدام المعلومات للتواصل بشأن طلبك فقط.</p>
              {submitted && <div className="after-submit-path" role="status">
                <div className="after-submit-icon"><Icon name={sentChannel === 'email' ? 'envelope' : 'whatsapp'} /></div>
                <div><strong>{sentChannel === 'email' ? 'تم تجهيز طلبك للإرسال عبر البريد الإلكتروني' : 'تم تجهيز طلبك للإرسال عبر واتساب'}</strong><p>{sentChannel === 'email' ? 'افتح تطبيق البريد وأرسل الرسالة الجاهزة إلى المكتب. يمكنك إرفاق المستندات من داخل رسالة البريد.' : 'أرسل الرسالة الجاهزة إلى المكتب، ويمكنك إرفاق المستندات مباشرة داخل محادثة واتساب.'}</p><div className="quick-contact-actions"><a href={sentChannel === 'email' ? 'https://wa.me/201101076000' : 'mailto:ma.law.firm@outlook.com'} target="_blank" rel="noopener noreferrer"><Icon name={sentChannel === 'email' ? 'whatsapp' : 'envelope'} /> {sentChannel === 'email' ? 'تواصل سريع عبر واتساب' : 'إرسال المستندات عبر البريد'}</a><a href="tel:+201101076000"><Icon name="phone-alt" /> اتصال سريع بالمكتب</a></div></div>
              </div>}
            </form>
          </div>

          <div className="contact-after-form">
            <div className="contact-after-heading reveal">
              <span className="eyebrow">● مقرنا ووسائل التواصل</span>
              <h2>نلتقي بك في أسوان ونتواصل معك من أي محافظة</h2>
              <p>مقر المكتب في أسوان، وتُحدد وسيلة تقديم الخدمة بحسب طبيعة الطلب والقضية والجهة المختصة.</p>
            </div>
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 space-y-3">
                <div className="contact-card reveal"><div className="icon-wrap"><Icon name="map-marker-alt" /></div><div className="info"><h4>المقر الرئيسي – أسوان</h4><p>شارع كسر الحجر، المتفرع من شارع كورنيش النيل، أمام مجمع المحاكم، أسوان</p></div></div>
                <div className="contact-card reveal"><div className="icon-wrap"><Icon name="phone-alt" /></div><div className="info"><h4>الهاتف والواتساب</h4><p dir="ltr">+20 110 107 6000</p></div></div>
                <div className="contact-card reveal"><div className="icon-wrap"><Icon name="envelope" /></div><div className="info"><h4>البريد الإلكتروني</h4><p dir="ltr">ma.law.firm@outlook.com</p></div></div>
                <div className="contact-card reveal"><div className="icon-wrap"><Icon name="clock" /></div><div className="info"><h4>ساعات العمل</h4><p>السبت - الخميس: ٩:٠٠ ص - ١٠:٠٠ م</p><p className="contact-note">الجمعة: مغلق</p></div></div>
              </div>
              <div className="lg:col-span-7">
                <div className="reveal text-center pt-1 pb-5"><p className="text-sm font-bold" style={{ color: 'var(--charcoal)', marginBottom: '0.75rem' }}>تابع أخبار المكتب ومحتواه القانوني</p><div className="flex gap-3 justify-center flex-wrap"><a href="https://www.facebook.com/malegal" target="_blank" rel="noopener noreferrer" className="social-icon-circle" aria-label="صفحة المكتب على فيسبوك"><Icon name="facebook-f" /></a><a href="https://x.com/mahmoud_a_hamyd" target="_blank" rel="noopener noreferrer" className="social-icon-circle" aria-label="صفحة المكتب على إكس"><Icon name="x" /></a><a href="https://www.linkedin.com/in/mahmoud-abdel-hamid-0a4664374" target="_blank" rel="noopener noreferrer" className="social-icon-circle" aria-label="صفحة الأستاذ محمود عبد الحميد جاد الرب على لينكدإن"><Icon name="linkedin-in" /></a></div></div>
                <div className="map-container reveal"><iframe title="خريطة مقر مكتب جاد الرب في أسوان" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3642.4!2d32.9!3d24.09!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDA1JzMxLjIiTiAzMsKwNTMnNDkuMiJF!5e0!3m2!1sen!2seg!4v1600000000000!5m2!1sen!2seg" allowFullScreen="" loading="lazy"></iframe><div className="map-overlay"><span><Icon name="map-pin" style={{ marginRight: '0.5rem' }} /> المقر الرئيسي في أسوان</span></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style jsx>{`
        .hero-contact { padding: 120px 2rem 4rem; background: var(--very-dark-navy); position: relative; overflow: hidden; min-height: 45vh; display: flex; align-items: center; }
        .hero-contact .hero-pattern { position: absolute; inset: 0; opacity: 0.03; background-image: radial-gradient(circle at 20% 30%, var(--matte-gold) 1px, transparent 1px), radial-gradient(circle at 80% 70%, var(--matte-gold) 1px, transparent 1px); background-size: 60px 60px; pointer-events: none; }
        .hero-contact .hero-glow { position: absolute; width: 60vw; height: 60vw; border-radius: 50%; background: radial-gradient(circle, rgba(176,141,87,0.04) 0%, transparent 70%); top: -20%; right: -20%; pointer-events: none; animation: orbFloat 20s ease-in-out infinite alternate; }
        .hero-contact .hero-glow-2 { position: absolute; width: 40vw; height: 40vw; border-radius: 50%; background: radial-gradient(circle, rgba(176,141,87,0.02) 0%, transparent 70%); bottom: -20%; left: -10%; pointer-events: none; animation: orbFloat 25s ease-in-out infinite alternate-reverse; }
        @keyframes orbFloat { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(40px, -30px) scale(1.05); } }
        .hero-contact .hero-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; width: 100%; }
        .hero-contact .hero-title-wrap { text-align: center; }
        .hero-contact .hero-title-wrap .en-tag { font-size: 0.65rem; font-weight: 800; letter-spacing: 0.4em; text-transform: uppercase; color: var(--matte-gold); opacity: 0.5; display: block; margin-bottom: 0.3rem; }
        .hero-contact .hero-title-wrap h1 { font-size: clamp(2.4rem, 5vw, 4rem); font-weight: 900; color: #fff; line-height: 1.1; }
        .hero-contact .hero-title-wrap h1 .gold-text { color: var(--matte-gold); }
        .hero-contact .hero-title-wrap .sub { font-size: clamp(1rem, 1.3vw, 1.2rem); font-weight: 400; color: rgba(255,255,255,0.55); max-width: 700px; margin: 0.8rem auto 0; line-height: 1.7; }
        .section-content { flex: 1; padding: 5rem 2rem; background: var(--warm-off-white); }
        .section-content .inner { max-width: 1200px; margin: 0 auto; }
        .branches-grid { display: flex; justify-content: center; }
        .branch-card { background: var(--pure-white); border-radius: 12px; padding: 1.5rem 1.2rem; border: 1px solid rgba(0,0,0,0.04); box-shadow: 0 2px 10px rgba(0,0,0,0.02); transition: all 0.4s var(--ease-out); text-align: center; position: relative; overflow: hidden; max-width: 420px; width: 100%; }
        .branch-card::after { content: ''; position: absolute; bottom: 0; right: 0; width: 0; height: 3px; background: var(--matte-gold); transition: width 0.6s var(--ease-out); }
        .branch-card:hover::after { width: 100%; }
        .branch-card:hover { border-color: var(--matte-gold); transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.04); }
        .branch-card .branch-icon { font-size: 1.8rem; color: var(--matte-gold); opacity: 0.3; margin-bottom: 0.3rem; }
        .branch-card h4 { font-size: 0.95rem; font-weight: 700; color: var(--charcoal); margin-bottom: 0.1rem; }
        .branch-card p { font-size: 0.75rem; color: var(--charcoal); font-weight: 700; line-height: 1.6; }
        .branch-card .badge-main { display: inline-block; background: var(--matte-gold); color: #000; font-size: 0.55rem; font-weight: 700; padding: 0.1rem 0.6rem; border-radius: 50px; margin-top: 0.4rem; }
        .contact-card { background: var(--pure-white); border-radius: 12px; padding: 1.5rem 1.2rem; border: 1px solid rgba(0,0,0,0.04); box-shadow: 0 2px 10px rgba(0,0,0,0.02); transition: all 0.4s var(--ease-out); display: flex; align-items: center; gap: 1rem; position: relative; overflow: hidden; }
        .contact-card::after { content: ''; position: absolute; bottom: 0; right: 0; width: 0; height: 3px; background: var(--matte-gold); transition: width 0.6s var(--ease-out); }
        .contact-card:hover::after { width: 100%; }
        .contact-card:hover { border-color: var(--matte-gold); transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.04); }
        .contact-card .icon-wrap { width: 48px; height: 48px; border-radius: 50%; background: rgba(176,141,87,0.05); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.4s var(--ease-out); }
        .contact-card:hover .icon-wrap { background: var(--matte-gold); }
        .contact-card:hover .icon-wrap .icon-svg { color: #000; }
        .contact-card .icon-wrap .icon-svg { font-size: 1.2rem; color: var(--matte-gold); transition: all 0.4s ease; }
        .contact-card .info h4 { font-size: 0.75rem; font-weight: 800; color: var(--matte-gold); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.1rem; }
        .contact-card .info p { font-size: 0.85rem; color: var(--charcoal); font-weight: 700; line-height: 1.5; }
        .social-icon-circle { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(0,0,0,0.04); transition: all 0.4s var(--ease-out); color: var(--charcoal); font-size: 1.2rem; background: var(--pure-white); box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
        .social-icon-circle:hover { border-color: var(--matte-gold); background: var(--matte-gold); color: #000; transform: translateY(-4px); box-shadow: 0 8px 30px rgba(176,141,87,0.15); }
        .map-container { border-radius: 12px; overflow: hidden; border: 1px solid rgba(0,0,0,0.04); box-shadow: 0 2px 10px rgba(0,0,0,0.02); transition: all 0.4s var(--ease-out); position: relative; height: 260px; width: 100%; }
        .map-container:hover { border-color: var(--matte-gold); box-shadow: 0 8px 30px rgba(0,0,0,0.04); }
        .map-container iframe { width: 100%; height: 100%; border: 0; filter: grayscale(100%) invert(90%) contrast(85%); transition: filter 0.4s ease; }
        .map-container:hover iframe { filter: grayscale(0%) invert(0%) contrast(100%); }
        .map-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; opacity: 1; transition: opacity 0.4s ease; pointer-events: none; }
        .map-container:hover .map-overlay { opacity: 0; }
        .map-overlay span { background: var(--matte-gold); color: #000; padding: 0.5rem 1.2rem; border-radius: 8px; font-weight: 700; font-size: 0.8rem; }
        .consultation-process { background: var(--very-dark-navy); color: #fff; border-radius: 18px; padding: clamp(1.25rem, 3vw, 2rem); margin-bottom: 1.25rem; display: grid; grid-template-columns: minmax(220px, 0.85fr) 1.6fr; gap: 1.5rem; align-items: center; }
        .process-heading h2 { color: #fff; font-family: var(--serif-font); font-size: clamp(1.35rem, 2.4vw, 1.9rem); margin: 0.35rem 0 0.55rem; }
        .process-heading p { color: rgba(255,255,255,0.72); font-size: 0.82rem; line-height: 1.85; margin: 0; }
        .process-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.65rem; }
        .process-step { border: 1px solid rgba(255,255,255,0.18); background: rgba(255,255,255,0.055); border-radius: 12px; padding: 0.85rem; min-height: 122px; color: #fff; }
        .process-step > span { display: block; color: var(--matte-gold); font-size: 0.72rem; font-weight: 800; letter-spacing: 0.08em; margin-bottom: 0.65rem; }
        .process-step strong, .process-step small { display: block; }
        .process-step strong { color: #fff; font-size: 0.82rem; margin-bottom: 0.28rem; }
        .process-step small { color: rgba(255,255,255,0.62); font-size: 0.68rem; line-height: 1.65; }
        .consultation-primary { max-width: 980px; margin: 0 auto; }
        .request-options-first { grid-template-columns: repeat(2, 1fr); margin-bottom: 0; }
        .contact-after-form { margin-top: clamp(3rem, 7vw, 5.5rem); border-top: 1px solid rgba(8,20,38,0.1); padding-top: clamp(2rem, 5vw, 3.5rem); }
        .contact-after-heading { text-align: center; max-width: 720px; margin: 0 auto 2rem; }
        .contact-after-heading h2 { color: var(--charcoal); font-family: var(--serif-font); font-size: clamp(1.5rem, 3vw, 2.25rem); margin: 0.35rem 0 0.5rem; }
        .contact-after-heading p { color: var(--charcoal); font-weight: 700; font-size: 0.85rem; line-height: 1.8; margin: 0; }
        .contact-note { font-size: 0.7rem !important; color: var(--charcoal); font-weight: 700; }
        .consultation-form-intro h3 { color: var(--charcoal); font-family: var(--font-serif, Georgia, serif); font-size: clamp(1.55rem, 3vw, 2.15rem); margin: 0.35rem 0 0.45rem; }
        .consultation-form-intro p { color: var(--charcoal); font-size: 0.85rem; font-weight: 700; line-height: 1.8; max-width: 620px; margin: 0; }
        .consultation-payment-note { display: flex; align-items: flex-start; gap: 0.55rem; margin: 1rem 0 1.7rem; padding: 0.8rem 0.9rem; border: 1px solid rgba(58,145,111,0.2); border-radius: 10px; background: rgba(58,145,111,0.07); color: var(--charcoal); font-size: 0.76rem; line-height: 1.8; }
        .consultation-payment-note .icon-svg { color: #2f8d6a; margin-top: 0.2rem; flex: 0 0 auto; }
        .consultation-payment-note strong { display: block; color: #246d52; }
        .reference-form-step { margin-bottom: 2rem; }
        .reference-full-field { margin-top: 1.25rem; }
        .attachment-field { margin-bottom: 1.2rem; }
        .attachment-field .field-control input[type="file"] { height: auto; padding: 0.75rem 0.1rem; border-bottom: 1px dashed rgba(8,20,38,0.24); }
        .same-phone-label { display: flex; align-items: center; gap: 0.4rem; color: var(--charcoal); font-size: 0.7rem; font-weight: 700; margin-top: 0.55rem; }
        .same-phone-label input, .consent-wrapper input { accent-color: var(--matte-gold); }
        .consent-wrapper { display: flex; align-items: flex-start; gap: 0.6rem; margin: 0; padding: 0.8rem 0.9rem; background: rgba(8,20,38,0.035); border: 1px solid rgba(8,20,38,0.08); border-radius: 9px; }
        .consent-wrapper input { width: 18px; height: 18px; min-width: 18px; margin-top: 0.2rem; }
        .consent-label { color: var(--charcoal); font-size: 0.72rem; line-height: 1.7; font-weight: 700; }
        .after-submit-path { display: flex; align-items: flex-start; gap: 0.75rem; margin-top: 1.25rem; padding: 1rem; border: 1px solid rgba(58,145,111,0.24); border-radius: 12px; background: rgba(58,145,111,0.07); color: var(--charcoal); }
        .after-submit-icon { color: #2f8d6a; font-size: 1.25rem; padding-top: 0.1rem; }
        .after-submit-path strong { display: block; color: #246d52; font-size: 0.82rem; margin-bottom: 0.25rem; }
        .after-submit-path p { color: var(--charcoal); font-size: 0.72rem; line-height: 1.7; font-weight: 700; margin: 0; }
        .quick-contact-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.75rem; }
        .quick-contact-actions a { display: inline-flex; align-items: center; gap: 0.35rem; border-radius: 8px; padding: 0.5rem 0.65rem; font-size: 0.68rem; font-weight: 800; text-decoration: none; background: var(--very-dark-navy); color: var(--matte-gold); }
        .quick-contact-actions a:last-child { background: var(--matte-gold); color: #111; }
        .contact-form-shell { background: linear-gradient(145deg, #fff 0%, #fbfaf7 100%); border-radius: 22px; border: 1px solid rgba(176,141,87,0.18); box-shadow: 0 18px 55px rgba(8,20,38,0.08); padding: clamp(1.25rem, 3vw, 2.5rem); position: relative; overflow: hidden; }
        .contact-form-shell::before { content: ''; position: absolute; top: 0; right: 0; width: 38%; height: 4px; background: linear-gradient(90deg, transparent, var(--matte-gold)); }
        .form-intro { margin-bottom: 2rem; }
        .form-kicker { color: var(--matte-gold); font-size: 0.7rem; font-weight: 900; letter-spacing: 0.18em; text-transform: uppercase; }
        .form-intro h2 { color: var(--charcoal); font-size: clamp(1.6rem, 3vw, 2.25rem); margin: 0.35rem 0 0.45rem; font-family: var(--font-serif, Georgia, serif); }
        .form-intro p { color: var(--charcoal); font-size: 0.85rem; font-weight: 700; line-height: 1.8; max-width: 560px; margin: 0; }
        .consultation-scope-note { display: flex; align-items: flex-start; gap: 0.55rem; margin-top: 1rem; padding: 0.75rem 0.9rem; border-right: 3px solid var(--matte-gold); border-radius: 7px; background: rgba(176,141,87,0.07); color: var(--charcoal); font-size: 0.76rem; font-weight: 700; line-height: 1.8; }
        .consultation-scope-note .icon-svg { flex: 0 0 auto; margin-top: 0.25rem; color: var(--matte-gold); }
        .consultation-scope-note strong { color: var(--very-dark-navy); }
        .form-step { border: 0; padding: 0; margin: 0 0 1.8rem; min-width: 0; }
        .form-step legend { width: 100%; display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.9rem; color: var(--charcoal); }
        .form-step legend strong, .form-step legend small { display: block; }
        .form-step legend strong { font-size: 0.95rem; }
        .form-step legend small { color: var(--charcoal); opacity: 0.6; font-size: 0.68rem; font-weight: 700; margin-top: 0.12rem; }
        .step-number { display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 50%; background: var(--very-dark-navy); color: var(--matte-gold); font-size: 0.68rem; font-weight: 900; letter-spacing: 0.04em; }
        .audience-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.7rem; }
        .audience-card { border: 1px solid rgba(8,20,38,0.1); background: rgba(255,255,255,0.7); border-radius: 13px; padding: 0.9rem; min-height: 112px; text-align: right; display: flex; align-items: center; gap: 0.55rem; position: relative; cursor: pointer; transition: all 0.25s ease; color: var(--charcoal); }
        .audience-card:hover, .audience-card.selected { border-color: var(--matte-gold); background: #fff; box-shadow: 0 8px 22px rgba(176,141,87,0.12); transform: translateY(-2px); }
        .audience-card > span:nth-child(2) { flex: 1; }
        .audience-card strong, .audience-card small { display: block; }
        .audience-card strong { font-size: 0.78rem; line-height: 1.45; }
        .audience-card small { color: var(--charcoal); opacity: 0.62; font-size: 0.62rem; line-height: 1.45; margin-top: 0.18rem; }
        .audience-card > .icon-svg:last-child { color: transparent; font-size: 0.85rem; }
        .audience-card.selected > .icon-svg:last-child { color: var(--matte-gold); }
        .audience-icon { flex: 0 0 34px; height: 34px; display: inline-flex; align-items: center; justify-content: center; border-radius: 10px; background: rgba(176,141,87,0.12); color: var(--matte-gold); }
        .request-options { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.7rem; }
        .request-option { display: flex; align-items: center; gap: 0.65rem; border: 1px solid rgba(8,20,38,0.1); border-radius: 12px; padding: 0.8rem 0.9rem; cursor: pointer; transition: all 0.25s ease; }
        .request-option.selected { border-color: var(--matte-gold); background: rgba(176,141,87,0.07); }
        .request-option input { accent-color: var(--matte-gold); }
        .request-option strong, .request-option small { display: block; }
        .request-option strong { font-size: 0.78rem; }
        .request-option small { color: var(--charcoal); opacity: 0.62; font-size: 0.62rem; margin-top: 0.15rem; }
        .form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 1.4rem; column-gap: 1.1rem; }
        .meeting-box, .channel-box, .whatsapp-note { border: 1px solid rgba(176,141,87,0.24); border-radius: 12px; padding: 0.85rem; margin: 0.4rem 0 1rem; background: rgba(176,141,87,0.055); }
        .meeting-heading, .whatsapp-note { display: flex; align-items: center; gap: 0.65rem; color: var(--charcoal); }
        .meeting-heading > .icon-svg, .whatsapp-note > .icon-svg { color: var(--matte-gold); font-size: 1.1rem; }
        .meeting-heading strong, .meeting-heading small, .whatsapp-note strong, .whatsapp-note small { display: block; }
        .meeting-heading strong, .whatsapp-note strong { font-size: 0.75rem; }
        .meeting-heading small, .whatsapp-note small { font-size: 0.62rem; opacity: 0.65; font-weight: 700; margin-top: 0.12rem; }
        .meeting-box .form-grid { margin-top: 0.75rem; }
        .channel-box { display: flex; align-items: center; justify-content: space-between; gap: 0.8rem; }
        .channel-box strong, .channel-box small { display: block; }
        .channel-box strong { font-size: 0.72rem; color: var(--charcoal); }
        .channel-box small { font-size: 0.6rem; color: var(--charcoal); opacity: 0.6; font-weight: 700; margin-top: 0.1rem; }
        .channel-toggle { display: flex; gap: 0.35rem; }
        .channel-toggle button { border: 1px solid rgba(8,20,38,0.12); background: #fff; color: var(--charcoal); border-radius: 8px; padding: 0.45rem 0.55rem; font-size: 0.65rem; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; gap: 0.3rem; }
        .channel-toggle button.active { background: var(--very-dark-navy); border-color: var(--very-dark-navy); color: var(--matte-gold); }
        .premium-submit { width: 100%; border: 0; border-radius: 11px; padding: 0.95rem 1.2rem; display: flex; align-items: center; justify-content: center; gap: 0.6rem; background: linear-gradient(110deg, var(--matte-gold), #d1ad6b); color: #111; font-size: 0.9rem; font-weight: 900; cursor: pointer; box-shadow: 0 9px 22px rgba(176,141,87,0.22); transition: all 0.25s ease; }
        .premium-submit:hover { transform: translateY(-2px); box-shadow: 0 13px 28px rgba(176,141,87,0.3); }
        .form-privacy { display: flex; align-items: center; justify-content: center; gap: 0.35rem; color: var(--charcoal); opacity: 0.58; font-size: 0.62rem; font-weight: 700; margin: 0.8rem 0 0; }
        .form-privacy .icon-svg { color: var(--matte-gold); }

        /* حقول بيضاء واضحة بإطار كامل ومستدير، مع تركيز ذهبي خفيف يطابق هوية المكتب. */
        .form-field-modern { display: flex; flex-direction: column; gap: 6px; margin-bottom: 0; }
        .form-field-modern label { color: var(--charcoal); font-size: 0.78rem; font-weight: 700; letter-spacing: 0.01em; padding: 0 0.1rem; transition: color 0.15s ease; }
        .form-field-modern:focus-within label { color: var(--matte-gold); }
        .optional-label { color: rgba(34,34,34,0.4); font-weight: 500; font-size: 0.68rem; }
        .field-control { min-width: 0; }
        .field-control input, .field-control textarea, .field-control select {
          width: 100%;
          height: 48px;
          padding: 0 0.85rem;
          border: 1px solid rgba(8,20,38,0.14);
          border-radius: 9px;
          font-size: 0.9rem;
          background: #fff;
          color: var(--charcoal);
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
          outline: none;
          font-weight: 500;
          box-shadow: 0 2px 8px rgba(8,20,38,0.025);
        }
        .field-control input::placeholder, .field-control textarea::placeholder { color: rgba(34,34,34,0.38); font-weight: 400; }
        .field-control input:hover, .field-control textarea:hover, .field-control select:hover { border-color: rgba(8,20,38,0.3); }
        .field-control input:focus, .field-control textarea:focus, .field-control select:focus { border-color: var(--matte-gold); box-shadow: 0 0 0 3px rgba(176,141,87,0.11); }
        .field-control textarea { height: auto; padding: 0.75rem 0.85rem; resize: vertical; min-height: 138px; line-height: 1.75; }
        .field-hint { display: block; color: rgba(34,34,34,0.42); font-size: 0.66rem; font-weight: 600; margin: 0.35rem 0.2rem 0; }
        .field-control input[type="file"] { height: auto; padding: 0.9rem 1rem; background: var(--pure-white); border: 1.5px dashed rgba(0,0,0,0.16); box-shadow: none; }
        .field-control input[type="file"]:hover { border-color: var(--matte-gold); }
        .field-control input[type="date"], .field-control input[type="time"] { cursor: pointer; }
        .field-control input[type="date"]::-webkit-calendar-picker-indicator, .field-control input[type="time"]::-webkit-calendar-picker-indicator { filter: invert(64%) sepia(23%) saturate(638%) hue-rotate(358deg) brightness(92%) contrast(88%); cursor: pointer; opacity: 0.75; }

        @media (max-width: 820px) { .consultation-process { grid-template-columns: 1fr; } .process-steps { grid-template-columns: 1fr; } .process-step { min-height: auto; } .request-options-first { grid-template-columns: 1fr; } .contact-after-form { margin-top: 3rem; }
 .hero-contact { padding: 100px 1rem 3rem; min-height: auto; } .section-content { padding: 2.5rem 1rem; } .hero-contact .hero-title-wrap h1 { font-size: clamp(2rem, 8vw, 2.8rem); } .contact-card { padding: 1rem; gap: 0.8rem; } .contact-card .icon-wrap { width: 40px; height: 40px; } .contact-card .icon-wrap .icon-svg { font-size: 1rem; } .map-container { height: 200px; } }
        @media (max-width: 640px) {
          .form-grid { grid-template-columns: 1fr; row-gap: 1.1rem; }
          .field-control input, .field-control select { font-size: 0.85rem; height: 48px; padding: 0 0.75rem; }
          .field-control textarea { font-size: 0.85rem; padding: 0.75rem; }
          .form-field-modern label { font-size: 0.74rem; }
          .field-hint { font-size: 0.6rem; }
          .audience-cards { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.35rem; }
          .audience-card { min-width: 0; min-height: 104px; padding: 0.55rem 0.25rem; flex-direction: column; justify-content: center; text-align: center; gap: 0.35rem; }
          .audience-card > span:nth-child(2) { min-width: 0; width: 100%; }
          .audience-card strong { font-size: 0.63rem; line-height: 1.35; word-break: normal; }
          .audience-card small { font-size: 0.52rem; line-height: 1.3; margin-top: 0.12rem; }
          .audience-icon { flex-basis: 32px; width: 32px; height: 32px; }
          .audience-card > .icon-svg:last-child { position: absolute; top: 0.35rem; left: 0.35rem; font-size: 0.65rem; }
        }
      `}</style>
    </Layout>
  );
}
