import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Icon from '../components/Icon';

const SITE = 'https://ostazlaw.vercel.app';
const OFFICE_NAME = 'مكتب جاد الرب للمحاماة والاستشارات القانونية';
const WHATSAPP_URL = 'https://wa.me/201101076000';

// أسئلة شائعة: تظهر في الصفحة وتُبنى منها بيانات FAQPage تلقائيًا حتى يبقى النصان متطابقين
const faqs = [
  {
    q: 'هل الاستشارة مجانية؟',
    a: 'نعم، إرسال طلب الاستشارة عبر هذه الصفحة لا يتطلب دفع أي مبلغ. يراجع المكتب طلبك أولًا، ثم يتواصل معك ويحدد الخطوة التالية.',
  },
  {
    q: 'هل إرسال الطلب يعني قبول القضية؟',
    a: 'لا. إرسال الطلب لا يعني قبول القضية أو قيام علاقة محاماة، ويحدد المكتب الخطوة التالية ونطاق الخدمة بعد مراجعة الطلب.',
  },
  {
    q: 'هل يمكنني تقديم طلبي من خارج أسوان؟',
    a: 'نعم. مقر المكتب في أسوان، ويقدم خدماته للعملاء في مختلف محافظات مصر، وتُحدد وسيلة تقديم الخدمة بحسب طبيعة الطلب والقضية والجهة المختصة.',
  },
  {
    q: 'لا أعرف نوع قضيتي، فماذا أكتب؟',
    a: 'لا تحتاج إلى تحديد نوع القضية أو معرفة اسم الدعوى. اكتب من هم الأطراف، وماذا حدث، وهل توجد جلسة أو ميعاد قريب، وما المطلوب من المكتب، ويحدد المكتب التصنيف والمسار المناسب بعد المراجعة.',
  },
  {
    q: 'هل يلزمني إرفاق مستندات؟',
    a: 'لا. يمكنك إرسال الطلب دون أي مستند. ويفيد إرسال ما يتوفر لديك من عقود أو إنذارات أو محاضر أو أحكام، ويمكنك إرساله مع الرسالة أو لاحقًا عبر واتساب المكتب أو البريد.',
  },
  {
    q: 'هل بياناتي سرية؟',
    a: 'نحافظ على سرية بياناتك، ونستخدم المعلومات للتواصل بشأن طلبك فقط.',
  },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LegalService',
      '@id': `${SITE}/#organization`,
      name: OFFICE_NAME,
      alternateName: 'JAD ELRAB',
      description: 'مكتب محاماة مصري مقره أسوان ويقدم خدمات المحاماة والاستشارات القانونية للأفراد والشركات في مختلف محافظات مصر.',
      url: `${SITE}/`,
      email: 'ma.law.firm@outlook.com',
      telephone: '+201101076000',
      foundingDate: '2005',
      areaServed: [
        { '@type': 'City', name: 'أسوان' },
        { '@type': 'Country', name: 'مصر' },
      ],
      availableLanguage: ['Arabic', 'English'],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
          opens: '09:00',
          closes: '22:00',
        },
      ],
      sameAs: [
        'https://www.facebook.com/malegal',
        'https://x.com/mahmoud_a_hamyd',
        'https://www.linkedin.com/in/mahmoud-abdel-hamid-0a4664374',
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'شارع كسر الحجر، المتفرع من شارع كورنيش النيل، أمام مجمع المحاكم',
        addressLocality: 'أسوان',
        addressCountry: 'مصر',
      },
    },
    {
      '@type': 'Person',
      '@id': `${SITE}/#founder`,
      name: 'محمود عبد الحميد جاد الرب',
      jobTitle: 'المحامي بالنقض والدستورية والإدارية العليا',
      worksFor: { '@id': `${SITE}/#organization` },
      url: `${SITE}/about`,
      image: {
        '@type': 'ImageObject',
        url: `${SITE}/mahmoud-abdel-hamid-lawyer-portrait.webp`,
        caption: 'الأستاذ محمود عبد الحميد جاد الرب – المحامي بالنقض والدستورية والإدارية العليا',
      },
    },
    {
      '@type': 'ContactPage',
      '@id': `${SITE}/contact#webpage`,
      url: `${SITE}/contact`,
      name: 'تواصل معنا',
      description: 'تواصل مع مكتب جاد الرب للمحاماة والاستشارات القانونية.',
      isPartOf: { '@id': `${SITE}/#website` },
      about: { '@id': `${SITE}/#organization` },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE}/contact#faq`,
      isPartOf: { '@id': `${SITE}/contact#webpage` },
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      name: OFFICE_NAME,
      url: `${SITE}/`,
      description: 'مكتب محاماة مصري يقدم خدمات المحاماة والاستشارات القانونية.',
    },
  ],
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [deliveryChannel, setDeliveryChannel] = useState('email');
  const [sentChannel, setSentChannel] = useState('email');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const specialty = params.get('specialty');
    if (specialty) {
      // النموذج لا يسأل عن نوع القضية؛ لذلك يُكتب الموضوع القادم من الرابط في أول التفاصيل
      const details = document.getElementById('details');
      if (details && !details.value) details.value = `بخصوص: ${specialty}\n`;
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (key) => String(data.get(key) || '').trim();
    const attachment = data.get('attachment');
    const attachmentName = attachment && attachment.name ? attachment.name : 'لا يوجد مرفق';
    const lines = [
      'طلب استشارة قانونية - مكتب جاد الرب',
      `الاسم / اسم الشركة: ${get('name')}`,
      `رقم الهاتف: ${get('phone')}`,
      `رقم الواتساب: ${get('whatsapp') || 'نفس رقم الهاتف'}`,
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
      window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(body)}`, '_blank', 'noopener,noreferrer');
    } else {
      // فتح البريد في نفس النافذة يتجنب ترك تبويب فارغ بعد تشغيل تطبيق البريد
      window.location.href = `mailto:ma.law.firm@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  };

  // دالة عرض وليست مكوّنًا: تعريف مكوّن داخل مكوّن آخر يعيد بناء الحقول عند كل تغيير حالة (تبديل الصفة أو وسيلة التواصل) فتضيع القيم المكتوبة
  const renderField = ({ id, label, type = 'text', placeholder, required = true }) => (
    <div className="form-field-modern" key={id}>
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
        <link rel="canonical" href={`${SITE}/contact`} />
        <meta property="og:title" content="تواصل معنا | مكتب جاد الرب للمحاماة والاستشارات القانونية" />
        <meta property="og:description" content="تواصل مع مكتب جاد الرب للمحاماة والاستشارات القانونية، مقره أسوان ويقدم خدماته للعملاء في مختلف محافظات مصر." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE}/contact`} />
        <meta property="og:image" content={`${SITE}/og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${SITE}/og-image.jpg`} />
        <script key="contact-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      {/* ١) الواجهة: العنوان + إجراءان واضحان + ما يطمئن الزائر قبل أن يكتب */}
      <section className="hero-contact" aria-label="تواصل معنا">
        <div className="hero-pattern"></div>
        <div className="hero-glow"></div>
        <div className="hero-glow-2"></div>
        <div className="hero-inner">
          <div className="hero-title-wrap reveal">
            <span className="en-tag">LEGAL CONSULTATION</span>
            <h1>افهم موقفك القانوني <span className="gold-text">قبل خطوتك التالية</span></h1>
            <p className="sub">ابدأ من الوقائع والمستندات، وسنساعدك على تحديد المسار الأنسب — استشارة، مراجعة مستند، موعد أو تمثيل قانوني.</p>
            <div className="hero-actions">
              <a href="#service-form" className="action-btn primary">اطلب استشارة مجانية</a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="action-btn ghost"><Icon name="whatsapp" /> واتساب المكتب</a>
            </div>
            <ul className="trust-row" aria-label="ما يميز طلب الاستشارة">
              <li><Icon name="check-circle" /> الاستشارة مجانية</li>
              <li><Icon name="check-circle" /> سرية بياناتك محفوظة</li>
              <li><Icon name="check-circle" /> نراجع طلبك ثم نتواصل معك</li>
              <li><Icon name="check-circle" /> نخدم مختلف محافظات مصر</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-content" aria-label="طلب الاستشارة والتواصل">
        <div className="inner">

          {/* ٢) مسار الخدمة: ثلاث خطوات فقط قبل النموذج */}
          <div className="consultation-process reveal" aria-label="مراحل بدء الخدمة">
            <div className="process-heading">
              <span className="form-kicker">كيف نبدأ معك؟</span>
              <h2>مسار واضح من أول خطوة</h2>
              <p>لا تحتاج إلى معرفة اسم الدعوى أو تقديم ملف كامل في البداية. اكتب ما حدث بطريقتك، وسنوضح لك الخطوة التالية.</p>
            </div>
            <div className="process-steps">
              <div className="process-step"><span>01</span><div><strong>تشرح ما حدث</strong><small>ملخص بسيط للمسألة وما تريد الوصول إليه.</small></div></div>
              <div className="process-step"><span>02</span><div><strong>نقرأ الصورة الأولية</strong><small>نراجع البيانات ونحدد ما يلزم لفهم الموقف.</small></div></div>
              <div className="process-step"><span>03</span><div><strong>نوضح المسار المناسب</strong><small>استشارة أو موعد أو مراجعة مستندات أو تمثيل قانوني.</small></div></div>
            </div>
            <div className="process-outcome"><Icon name="check-circle" /><p><strong>ماذا يحدث بعد الإرسال؟</strong> سنفحص طلبك ونرد عليك بالوسيلة التي اخترتها، ونوضح لك الخطوة المناسبة. إرسال الطلب مجاني ولا يلزمك بشيء.</p></div>
          </div>

          {/* ٣) النموذج */}
          <div className="form-head reveal">
            <span className="form-kicker">أرسل طلبك</span>
            <h2>احكِ لنا المشكلة</h2>
            <div className="free-consultation-line"><Icon name="check-circle" /><strong>الاستشارة مجانية</strong><span>إرسال الطلب لا يتطلب دفع أي مبلغ.</span></div>
          </div>

          <div id="service-form" className="contact-form-shell consultation-primary reveal" style={{ scrollMarginTop: '96px' }}>
            <form id="serviceForm" onSubmit={handleSubmit} className="contact-form">
              <div className="consultation-payment-note"><Icon name="check-circle" /><span><strong>بداية سهلة وواضحة</strong> أرسل بياناتك وملخص المشكلة والمستندات المتاحة. يراجع المكتب الطلب أولًا، ثم يتواصل معك ويحدد الخطوة التالية.</span></div>

              <fieldset className="form-step reference-form-step">
                <legend><span className="step-number">01</span><span><strong>بيانات التواصل</strong><small>الاسم ووسيلة نصل بها إليك</small></span></legend>
                <div className="form-grid">
                  {renderField({ id: 'name', label: 'الاسم بالكامل أو اسم الشركة', placeholder: 'الاسم بالكامل أو اسم الشركة' })}
                  {renderField({ id: 'phone', label: 'رقم الهاتف', type: 'tel', placeholder: '01xxxxxxxxx' })}
                  <div className="form-field-modern whatsapp-field">
                    <label htmlFor="whatsapp">رقم واتساب <span className="optional-label">اتركه فارغًا إن كان نفس الهاتف</span></label>
                    <div className="field-control"><input id="whatsapp" name="whatsapp" type="tel" placeholder="اتركه فارغًا إن كان نفس الهاتف" aria-label="رقم واتساب" /><label className="same-phone-label"><input type="checkbox" onChange={(e) => { const field = document.getElementById('whatsapp'); if (field) field.value = e.target.checked ? document.getElementById('phone').value : ''; }} /> نفس رقم الهاتف</label></div>
                  </div>
                  {renderField({ id: 'email', label: 'البريد الإلكتروني', type: 'email', placeholder: 'اختياري', required: false })}
                </div>
              </fieldset>

              <fieldset className="form-step reference-form-step">
                <legend><span className="step-number">02</span><span><strong>مسألتك</strong><small>اكتب ما حدث بطريقتك، ولا تحتاج إلى تحديد نوع القضية</small></span></legend>
                <div className="form-grid">
                  {renderField({ id: 'location', label: 'المحافظة / المدينة', placeholder: 'مثال: أسوان - أسوان' })}
                  <div className="form-field-modern"><label htmlFor="urgency">درجة الاستعجال *</label><div className="field-control"><select id="urgency" name="urgency" required aria-label="درجة الاستعجال"><option>عادية</option><option>مهمة - يوجد موعد قريب</option><option>عاجلة جدًا</option></select></div></div>
                  <div className="form-field-modern form-field-full"><label>طريقة التواصل المفضلة *</label><input type="hidden" name="preferredChannel" value={deliveryChannel === 'email' ? 'بريد إلكتروني' : 'واتساب'} /><div className="delivery-choice" role="group" aria-label="طريقة التواصل المفضلة"><button type="button" className={deliveryChannel === 'email' ? 'selected' : ''} onClick={() => setDeliveryChannel('email')} aria-pressed={deliveryChannel === 'email'}><Icon name="envelope" /><span>البريد الإلكتروني</span><small>مناسب للمستندات</small></button><button type="button" className={deliveryChannel === 'whatsapp' ? 'selected' : ''} onClick={() => setDeliveryChannel('whatsapp')} aria-pressed={deliveryChannel === 'whatsapp'}><Icon name="whatsapp" /><span>واتساب</span><small>أسرع للتواصل</small></button></div></div>
                </div>
                <div className="form-field-modern reference-full-field"><label htmlFor="details">ما المشكلة القانونية؟ *</label><div className="field-control"><textarea id="details" name="details" rows="6" placeholder="اكتب الوقائع باختصار: من الأطراف؟ ماذا حدث؟ هل توجد جلسة أو ميعاد قريب؟ وما المطلوب من المكتب؟" aria-label="ما المشكلة القانونية" required></textarea></div><small className="field-hint">لا يلزم استخدام مصطلحات قانونية؛ اكتب ما حدث بطريقتك.</small></div>
              </fieldset>

              <fieldset className="form-step reference-form-step">
                <legend><span className="step-number">03</span><span><strong>المستندات والموافقة</strong><small>المستندات اختيارية ولا يلزم إرفاق شيء</small></span></legend>
                <div className="form-field-modern attachment-field">
                  <label htmlFor="attachment">مستندات تساعدنا على فهم الحالة <span className="optional-badge">اختياري — يمكنك الإرسال بدونها</span></label>
                  <div className="field-control"><input id="attachment" name="attachment" type="file" aria-label="مستندات اختيارية تساعد على فهم الحالة" /></div>
                  <small className="field-hint">لا يلزم إرفاق أي شيء لإرسال طلبك. إن اخترت ملفًا فسيُذكر اسمه في الرسالة، ويمكنك إرساله مع الرسالة أو لاحقًا عبر واتساب المكتب.</small>
                </div>
                <label className="consent-wrapper"><input type="checkbox" name="consent" required /><span className="consent-label">أوافق أن إرسال الطلب لا يعني قبول القضية أو قيام علاقة محاماة، وأن المكتب سيحدد الخطوة التالية ونطاق الخدمة بعد المراجعة.</span></label>
              </fieldset>

              <button type="submit" className="premium-submit"><span>{deliveryChannel === 'email' ? 'إرسال الطلب عبر البريد الإلكتروني' : 'إرسال الطلب عبر واتساب'}</span><Icon name={deliveryChannel === 'email' ? 'envelope' : 'whatsapp'} /></button>
              <p className="form-privacy"><Icon name="shield-alt" /> نحافظ على سرية بياناتك، وسيتم استخدام المعلومات للتواصل بشأن طلبك فقط.</p>
              {submitted && <div className="after-submit-path" role="status">
                <div className="after-submit-icon"><Icon name={sentChannel === 'email' ? 'envelope' : 'whatsapp'} /></div>
                <div><strong>{sentChannel === 'email' ? 'تم تجهيز طلبك للإرسال عبر البريد الإلكتروني' : 'تم تجهيز طلبك للإرسال عبر واتساب'}</strong><p>{sentChannel === 'email' ? 'افتح تطبيق البريد وأرسل الرسالة الجاهزة إلى المكتب. يمكنك إرفاق المستندات من داخل رسالة البريد.' : 'أرسل الرسالة الجاهزة إلى المكتب، ويمكنك إرفاق المستندات مباشرة داخل محادثة واتساب.'}</p><div className="quick-contact-actions"><a href={sentChannel === 'email' ? WHATSAPP_URL : 'mailto:ma.law.firm@outlook.com'} target="_blank" rel="noopener noreferrer"><Icon name={sentChannel === 'email' ? 'whatsapp' : 'envelope'} /> {sentChannel === 'email' ? 'تواصل سريع عبر واتساب' : 'إرسال المستندات عبر البريد'}</a><a href="tel:+201101076000"><Icon name="phone-alt" /> اتصال سريع بالمكتب</a></div></div>
              </div>}
            </form>
          </div>

          {/* ٤) أسئلة تجيب عن التردد قبل الإرسال (وتدعم الظهور في نتائج البحث ومساعدات الذكاء الاصطناعي) */}
          <section className="faq-section" aria-labelledby="faq-title">
            <div className="faq-heading">
              <span className="form-kicker">قبل أن ترسل</span>
              <h2 id="faq-title">أسئلة يطرحها العملاء عادة</h2>
            </div>
            <div className="faq-list">
              {faqs.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* ٥) المقر ووسائل التواصل المباشرة */}
          <div className="contact-after-form">
            <div className="contact-after-heading reveal">
              <span className="eyebrow">● مقرنا ووسائل التواصل</span>
              <h2>نلتقي بك في أسوان ونتواصل معك من أي محافظة</h2>
              <p>مقر المكتب في أسوان، وتُحدد وسيلة تقديم الخدمة بحسب طبيعة الطلب والقضية والجهة المختصة.</p>
            </div>
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 space-y-3">
                <div className="contact-card reveal"><div className="icon-wrap"><Icon name="map-marker-alt" /></div><div className="info"><h4>المقر الرئيسي – أسوان</h4><p>شارع كسر الحجر، المتفرع من شارع كورنيش النيل، أمام مجمع المحاكم، أسوان</p></div></div>
                <a className="contact-card reveal contact-card-link" href="tel:+201101076000"><div className="icon-wrap"><Icon name="phone-alt" /></div><div className="info"><h4>الهاتف والواتساب</h4><p dir="ltr">+20 110 107 6000</p></div></a>
                <a className="contact-card reveal contact-card-link" href="mailto:ma.law.firm@outlook.com"><div className="icon-wrap"><Icon name="envelope" /></div><div className="info"><h4>البريد الإلكتروني</h4><p dir="ltr">ma.law.firm@outlook.com</p></div></a>
                <div className="contact-card reveal"><div className="icon-wrap"><Icon name="clock" /></div><div className="info"><h4>ساعات العمل</h4><p>السبت - الخميس: ٩:٠٠ ص - ١٠:٠٠ م</p><p className="contact-note">الجمعة: مغلق</p></div></div>
              </div>
              <div className="lg:col-span-7">
                <div className="reveal text-center pt-1 pb-5"><p className="text-sm font-bold" style={{ color: 'var(--charcoal)', marginBottom: '0.75rem' }}>تابع أخبار المكتب ومحتواه القانوني</p><div className="flex gap-3 justify-center flex-wrap"><a href="https://www.facebook.com/malegal" target="_blank" rel="noopener noreferrer" className="social-icon-circle" aria-label="صفحة المكتب على فيسبوك"><Icon name="facebook-f" /></a><a href="https://x.com/mahmoud_a_hamyd" target="_blank" rel="noopener noreferrer" className="social-icon-circle" aria-label="صفحة المكتب على إكس"><Icon name="x" /></a><a href="https://www.linkedin.com/in/mahmoud-abdel-hamid-0a4664374" target="_blank" rel="noopener noreferrer" className="social-icon-circle" aria-label="صفحة الأستاذ محمود عبد الحميد جاد الرب على لينكدإن"><Icon name="linkedin-in" /></a></div></div>
                <div className="map-container reveal"><iframe title="خريطة مقر مكتب جاد الرب في أسوان" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3642.4!2d32.9!3d24.09!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDA1JzMxLjIiTiAzMsKwNTMnNDkuMiJF!5e0!3m2!1sen!2seg!4v1600000000000!5m2!1sen!2seg" allowFullScreen="" loading="lazy"></iframe><div className="map-overlay"><span><Icon name="map-pin" style={{ marginRight: '0.5rem' }} /> المقر الرئيسي في أسوان</span></div></div>
                <a className="map-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('مجمع محاكم أسوان شارع كسر الحجر')}`} target="_blank" rel="noopener noreferrer"><Icon name="map-marker-alt" /> افتح الموقع في خرائط جوجل</a>
              </div>
            </div>
          </div>

          {/* ٦) خاتمة بإجراء واحد واضح */}
          <div className="closing-cta reveal">
            <div>
              <h2>ابدأ بخطوة بسيطة</h2>
              <p>أرسل ملخصًا واضحًا للمشكلة. سيراجع المكتب طلبك ويحدد الخطوة التالية، وتعرّف على المكتب إن أردت قبل أن تكتب لنا: <Link href="/about">عن المكتب</Link>.</p>
            </div>
            <div className="closing-actions">
              <a href="#service-form" className="action-btn primary">اطلب استشارة مجانية</a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="action-btn ghost"><Icon name="whatsapp" /> واتساب</a>
              <a href="tel:+201101076000" className="action-btn ghost"><Icon name="phone-alt" /> <span dir="ltr">+20 110 107 6000</span></a>
            </div>
          </div>

        </div>
      </section>

      <style jsx>{`
        /* ===== الواجهة ===== */
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
        .hero-actions { display: flex; justify-content: center; flex-wrap: wrap; gap: 0.7rem; margin-top: 1.6rem; }
        .trust-row { list-style: none; display: flex; justify-content: center; flex-wrap: wrap; gap: 0.4rem 1.4rem; margin: 1.6rem 0 0; padding: 0; }
        .trust-row li { display: inline-flex; align-items: center; gap: 0.4rem; color: rgba(255,255,255,0.72); font-size: 0.78rem; font-weight: 700; }
        .trust-row li :global(.icon-svg) { color: var(--matte-gold); }

        /* أزرار الإجراء (الواجهة + الخاتمة) */
        .action-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.45rem; border-radius: 9px; padding: 0.75rem 1.4rem; font-size: 0.85rem; font-weight: 900; text-decoration: none; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease; }
        .action-btn.primary { background: linear-gradient(110deg, var(--matte-gold), #d1ad6b); color: #111; box-shadow: 0 9px 22px rgba(176,141,87,0.22); }
        .action-btn.primary:hover { transform: translateY(-2px); box-shadow: 0 13px 28px rgba(176,141,87,0.3); }
        .action-btn.ghost { border: 1px solid rgba(255,255,255,0.28); color: #fff; background: transparent; }
        .action-btn.ghost:hover { border-color: var(--matte-gold); background: rgba(176,141,87,0.12); }
        .action-btn :global(.icon-svg) { font-size: 1rem; }
        .action-btn:focus-visible, .delivery-choice button:focus-visible, .faq-list summary:focus-visible, .map-link:focus-visible, .contact-card-link:focus-visible { outline: 2px solid var(--matte-gold); outline-offset: 3px; }

        .section-content { flex: 1; padding: 5rem 2rem; background: var(--warm-off-white); }
        .section-content .inner { max-width: 1200px; margin: 0 auto; }

        /* ===== مسار الخدمة ===== */
        .consultation-process { background: var(--very-dark-navy); color: #fff; border-radius: 18px; padding: clamp(1.25rem, 3vw, 2rem); margin-bottom: 3rem; display: grid; grid-template-columns: minmax(220px, 0.85fr) 1.6fr; gap: 1.5rem; align-items: center; }
        .process-heading h2 { color: #fff; font-family: var(--serif-font); font-size: clamp(1.35rem, 2.4vw, 1.9rem); margin: 0.35rem 0 0.55rem; }
        .process-heading p { color: rgba(255,255,255,0.72); font-size: 0.82rem; line-height: 1.85; margin: 0; }
        .process-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.65rem; }
        .process-step { border: 1px solid rgba(255,255,255,0.18); background: rgba(255,255,255,0.055); border-radius: 12px; padding: 0.85rem; min-height: 122px; color: #fff; }
        .process-step > span { display: block; color: var(--matte-gold); font-size: 0.72rem; font-weight: 800; letter-spacing: 0.08em; margin-bottom: 0.65rem; }
        .process-step strong, .process-step small { display: block; }
        .process-step strong { color: #fff; font-size: 0.82rem; margin-bottom: 0.28rem; }
        .process-step small { color: rgba(255,255,255,0.62); font-size: 0.68rem; line-height: 1.65; }

        .process-outcome { grid-column: 1 / -1; display: flex; align-items: flex-start; gap: 0.6rem; padding: 0.85rem 1rem; border-radius: 12px; background: rgba(176,141,87,0.14); border: 1px solid rgba(176,141,87,0.35); }
        .process-outcome :global(.icon-svg) { color: var(--matte-gold); margin-top: 0.25rem; flex: 0 0 auto; }
        .process-outcome p { margin: 0; color: #fff; font-size: 0.82rem; line-height: 1.85; }
        .process-outcome strong { color: var(--matte-gold); margin-inline-end: 0.35rem; }

        /* ===== عنوان النموذج ===== */
        .form-head { max-width: 980px; margin: 0 auto 0.9rem; }
        .form-head h2 { color: var(--charcoal); font-family: var(--serif-font); font-size: clamp(1.65rem, 3vw, 2.3rem); margin: 0.35rem 0 0; }
        .form-kicker { color: var(--matte-gold); font-size: 0.7rem; font-weight: 900; letter-spacing: 0.18em; text-transform: uppercase; }
        .free-consultation-line { display: flex; align-items: center; flex-wrap: wrap; gap: 0.45rem; width: fit-content; margin-top: 0.75rem; padding: 0.45rem 0.8rem; border-right: 3px solid #2f8d6a; color: #246d52; background: rgba(58,145,111,0.08); border-radius: 5px; font-size: 0.75rem; }
        .free-consultation-line :global(.icon-svg) { color: #2f8d6a; }
        .free-consultation-line strong { font-weight: 900; }
        .free-consultation-line span { color: var(--charcoal); font-weight: 700; }
        /* ===== النموذج (كما هو) ===== */
        .consultation-primary { max-width: 980px; margin: 0 auto; }
        .contact-form-shell { background: linear-gradient(145deg, #fff 0%, #fbfaf7 100%); border-radius: 22px; border: 1px solid rgba(176,141,87,0.18); box-shadow: 0 18px 55px rgba(8,20,38,0.08); padding: clamp(1.25rem, 3vw, 2.5rem); position: relative; overflow: hidden; }
        .contact-form-shell::before { content: ''; position: absolute; top: 0; right: 0; width: 38%; height: 4px; background: linear-gradient(90deg, transparent, var(--matte-gold)); }
        .consultation-payment-note { display: flex; align-items: flex-start; gap: 0.55rem; margin: 1rem 0 1.7rem; padding: 0.8rem 0.9rem; border: 1px solid rgba(58,145,111,0.2); border-radius: 10px; background: rgba(58,145,111,0.07); color: var(--charcoal); font-size: 0.76rem; line-height: 1.8; }
        .consultation-payment-note :global(.icon-svg) { color: #2f8d6a; margin-top: 0.2rem; flex: 0 0 auto; }
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
        .form-step { border: 0; padding: 0; margin: 0 0 1.8rem; min-width: 0; }
        .form-step legend { width: 100%; display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.9rem; color: var(--charcoal); }
        .form-step legend strong, .form-step legend small { display: block; }
        .form-step legend strong { font-size: 0.95rem; }
        .form-step legend small { color: var(--charcoal); opacity: 0.6; font-size: 0.68rem; font-weight: 700; margin-top: 0.12rem; }
        .step-number { display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 50%; background: var(--very-dark-navy); color: var(--matte-gold); font-size: 0.68rem; font-weight: 900; letter-spacing: 0.04em; }
        .form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 1.4rem; column-gap: 1.1rem; }
        .delivery-choice { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.45rem; }
        .delivery-choice button { min-height: 58px; border: 1px solid #B8B8B8; border-radius: 7px; background: #fff; color: var(--charcoal); padding: 0.5rem 0.55rem; display: grid; grid-template-columns: auto 1fr; grid-template-rows: auto auto; column-gap: 0.35rem; align-items: center; text-align: right; cursor: pointer; }
        .delivery-choice button :global(.icon-svg) { grid-row: 1 / span 2; color: #777; }
        .delivery-choice button span { font-size: 0.7rem; font-weight: 900; }
        .delivery-choice button small { font-size: 0.58rem; color: rgba(34,34,34,0.55); font-weight: 700; }
        .delivery-choice button.selected { border: 2px solid var(--matte-gold); background: rgba(176,141,87,0.07); }
        .delivery-choice button.selected :global(.icon-svg) { color: var(--matte-gold); }
        .premium-submit { width: 100%; border: 0; border-radius: 11px; padding: 0.95rem 1.2rem; display: flex; align-items: center; justify-content: center; gap: 0.6rem; background: linear-gradient(110deg, var(--matte-gold), #d1ad6b); color: #111; font-size: 0.9rem; font-weight: 900; cursor: pointer; box-shadow: 0 9px 22px rgba(176,141,87,0.22); transition: all 0.25s ease; }
        .premium-submit:hover { transform: translateY(-2px); box-shadow: 0 13px 28px rgba(176,141,87,0.3); }
        .form-privacy { display: flex; align-items: center; justify-content: center; gap: 0.35rem; color: var(--charcoal); opacity: 0.58; font-size: 0.62rem; font-weight: 700; margin: 0.8rem 0 0; }
        .form-privacy :global(.icon-svg) { color: var(--matte-gold); }

        .form-field-full { grid-column: 1 / -1; }
        .optional-badge { display: inline-block; margin-inline-start: 0.45rem; padding: 0.1rem 0.6rem; border-radius: 999px; background: rgba(58,145,111,0.1); color: #246d52; font-size: 0.68rem; font-weight: 800; }
        .attachment-field .field-hint { color: var(--charcoal); opacity: 0.75; font-size: 0.72rem; line-height: 1.8; }

        /* ===== حقول النموذج: هذه القواعد وحدها تحدد شكل الحقول وقياساتها ===== */
        .form-field-modern { display: flex; flex-direction: column; gap: 6px; margin-bottom: 0; }
        .form-field-modern label { color: var(--charcoal); font-size: 0.78rem; font-weight: 700; letter-spacing: 0.01em; padding: 0 0.1rem; transition: color 0.15s ease; }
        .form-field-modern:focus-within label { color: var(--matte-gold); }
        .optional-label { color: rgba(34,34,34,0.4); font-weight: 500; font-size: 0.68rem; }
        .field-control { min-width: 0; }
        .field-control input, .field-control textarea, .field-control select {
          width: 100%;
          height: 44px;
          padding: 0.85rem 0.8rem;
          border: 1px solid #B8B8B8;
          border-radius: 7px;
          font-size: 0.9rem;
          background: #fff;
          color: var(--charcoal);
          transition: border-color 0.18s ease, box-shadow 0.18s ease;
          outline: none;
          font-weight: 500;
          box-shadow: none;
        }
        .field-control input::placeholder, .field-control textarea::placeholder { color: rgba(34,34,34,0.38); font-weight: 400; }
        .field-control input:hover, .field-control textarea:hover, .field-control select:hover { border-color: #6F6F6F; }
        .field-control input:focus, .field-control textarea:focus, .field-control select:focus { border: 2px solid var(--matte-gold); box-shadow: none; }
        .field-control textarea { height: auto; padding: 0.85rem 0.8rem; resize: vertical; min-height: 138px; line-height: 1.75; }
        .field-hint { display: block; color: rgba(34,34,34,0.42); font-size: 0.66rem; font-weight: 600; margin: 0.35rem 0.2rem 0; }
        .field-control input[type="file"] { height: auto; padding: 0.9rem 1rem; background: var(--pure-white); border: 1.5px dashed rgba(0,0,0,0.16); box-shadow: none; }
        .field-control input[type="file"]:hover { border-color: var(--matte-gold); }

        /* ===== الأسئلة الشائعة ===== */
        .faq-section { max-width: 980px; margin: clamp(3rem, 7vw, 5rem) auto 0; }
        .faq-heading h2 { color: var(--charcoal); font-family: var(--serif-font); font-size: clamp(1.4rem, 2.6vw, 2rem); margin: 0.35rem 0 1rem; }
        .faq-list { border-top: 1px solid rgba(8,20,38,0.12); }
        .faq-list details { border-bottom: 1px solid rgba(8,20,38,0.12); }
        .faq-list summary { list-style: none; cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem 0.1rem; color: var(--charcoal); font-size: 0.9rem; font-weight: 800; }
        .faq-list summary::-webkit-details-marker { display: none; }
        .faq-list summary::after { content: '+'; color: var(--matte-gold); font-size: 1.3rem; font-weight: 400; line-height: 1; flex: 0 0 auto; }
        .faq-list details[open] summary::after { content: '−'; }
        .faq-list details p { margin: 0 0 1.1rem; padding: 0 0.1rem; max-width: 720px; color: var(--charcoal); font-size: 0.82rem; font-weight: 600; line-height: 1.9; opacity: 0.85; }

        /* ===== المقر ووسائل التواصل ===== */
        .contact-after-form { margin-top: clamp(3rem, 7vw, 5.5rem); border-top: 1px solid rgba(8,20,38,0.1); padding-top: clamp(2rem, 5vw, 3.5rem); }
        .contact-after-heading { text-align: center; max-width: 720px; margin: 0 auto 2rem; }
        .contact-after-heading h2 { color: var(--charcoal); font-family: var(--serif-font); font-size: clamp(1.5rem, 3vw, 2.25rem); margin: 0.35rem 0 0.5rem; }
        .contact-after-heading p { color: var(--charcoal); font-weight: 700; font-size: 0.85rem; line-height: 1.8; margin: 0; }
        .contact-card { background: var(--pure-white); border-radius: 12px; padding: 1.5rem 1.2rem; border: 1px solid rgba(0,0,0,0.04); box-shadow: 0 2px 10px rgba(0,0,0,0.02); transition: border-color 0.3s ease, box-shadow 0.3s ease; display: flex; align-items: center; gap: 1rem; position: relative; overflow: hidden; text-decoration: none; }
        .contact-card::after { content: ''; position: absolute; bottom: 0; right: 0; width: 0; height: 3px; background: var(--matte-gold); transition: width 0.6s var(--ease-out); }
        .contact-card:hover::after { width: 100%; }
        .contact-card:hover { border-color: var(--matte-gold); box-shadow: 0 8px 30px rgba(0,0,0,0.04); }
        .contact-card .icon-wrap { width: 48px; height: 48px; border-radius: 50%; background: rgba(176,141,87,0.05); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.3s ease; }
        .contact-card:hover .icon-wrap { background: var(--matte-gold); }
        .contact-card:hover .icon-wrap :global(.icon-svg) { color: #000; }
        .contact-card .icon-wrap :global(.icon-svg) { font-size: 1.2rem; color: var(--matte-gold); transition: color 0.3s ease; }
        .contact-card .info h4 { font-size: 0.75rem; font-weight: 800; color: var(--matte-gold); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.1rem; }
        .contact-card .info p { font-size: 0.85rem; color: var(--charcoal); font-weight: 700; line-height: 1.5; }
        .contact-note { font-size: 0.7rem !important; color: var(--charcoal); font-weight: 700; }
        .social-icon-circle { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(0,0,0,0.04); transition: all 0.4s var(--ease-out); color: var(--charcoal); font-size: 1.2rem; background: var(--pure-white); box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
        .social-icon-circle:hover { border-color: var(--matte-gold); background: var(--matte-gold); color: #000; transform: translateY(-4px); box-shadow: 0 8px 30px rgba(176,141,87,0.15); }
        .map-container { border-radius: 12px; overflow: hidden; border: 1px solid rgba(0,0,0,0.04); box-shadow: 0 2px 10px rgba(0,0,0,0.02); transition: all 0.4s var(--ease-out); position: relative; height: 260px; width: 100%; }
        .map-container:hover { border-color: var(--matte-gold); box-shadow: 0 8px 30px rgba(0,0,0,0.04); }
        .map-container iframe { width: 100%; height: 100%; border: 0; filter: grayscale(100%) invert(90%) contrast(85%); transition: filter 0.4s ease; }
        .map-container:hover iframe { filter: grayscale(0%) invert(0%) contrast(100%); }
        .map-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; opacity: 1; transition: opacity 0.4s ease; pointer-events: none; }
        .map-container:hover .map-overlay { opacity: 0; }
        .map-overlay span { background: var(--matte-gold); color: #000; padding: 0.5rem 1.2rem; border-radius: 8px; font-weight: 700; font-size: 0.8rem; }
        .map-link { display: inline-flex; align-items: center; gap: 0.4rem; margin-top: 0.75rem; color: var(--charcoal); font-size: 0.76rem; font-weight: 800; text-decoration: underline; text-underline-offset: 4px; }
        .map-link :global(.icon-svg) { color: var(--matte-gold); }

        /* ===== الخاتمة ===== */
        .closing-cta { margin-top: clamp(3rem, 7vw, 5rem); background: var(--very-dark-navy); color: #fff; border-radius: 18px; padding: clamp(1.5rem, 4vw, 2.5rem); display: grid; grid-template-columns: 1.3fr 1fr; gap: 1.5rem; align-items: center; }
        .closing-cta h2 { color: #fff; font-family: var(--serif-font); font-size: clamp(1.4rem, 2.6vw, 2rem); margin: 0 0 0.5rem; }
        .closing-cta p { color: rgba(255,255,255,0.72); font-size: 0.85rem; line-height: 1.9; margin: 0; }
        .closing-cta p :global(a) { color: var(--matte-gold); text-decoration: underline; text-underline-offset: 4px; }
        .closing-actions { display: flex; flex-direction: column; gap: 0.6rem; }

        /* ===== الشاشات الصغيرة ===== */
        @media (max-width: 820px) {
          .consultation-process { grid-template-columns: 1fr; }
          .process-steps { grid-template-columns: 1fr; }
          .process-step { min-height: auto; }
          .contact-after-form { margin-top: 3rem; }
          .hero-contact { padding: 100px 1rem 3rem; min-height: auto; }
          .section-content { padding: 2.5rem 1rem; }
          .hero-contact .hero-title-wrap h1 { font-size: clamp(2rem, 8vw, 2.8rem); }
          .contact-card { padding: 1rem; gap: 0.8rem; }
          .contact-card .icon-wrap { width: 40px; height: 40px; }
          .contact-card .icon-wrap :global(.icon-svg) { font-size: 1rem; }
          .map-container { height: 200px; }
          .closing-cta { grid-template-columns: 1fr; }
          .trust-row { flex-direction: column; align-items: center; }
        }
        @media (max-width: 640px) {
          .form-grid { grid-template-columns: 1fr; row-gap: 1.1rem; }
          .field-control input, .field-control select { font-size: 0.85rem; height: 44px; padding: 0.85rem 0.6rem; }
          .field-control textarea { font-size: 0.85rem; padding: 0.75rem; }
          .form-field-modern label { font-size: 0.74rem; }
          .field-hint { font-size: 0.6rem; }
          .hero-actions .action-btn { width: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-contact .hero-glow, .hero-contact .hero-glow-2 { animation: none; }
          .action-btn, .premium-submit { transition: none; }
        }
      `}</style>
    </Layout>
  );
}
