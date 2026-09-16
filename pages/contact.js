import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Icon from '../components/Icon';

export default function Contact() {
  const [audience, setAudience] = useState('individual');
  const [requestType, setRequestType] = useState('consultation');
  const [channel, setChannel] = useState('whatsapp');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const audienceParam = params.get('audience');
    const audienceMap = { business: 'business', investor: 'investor', individual: 'individual' };
    const initialAudience = audienceParam && audienceMap[audienceParam] ? audienceMap[audienceParam] : 'individual';
    setAudience(initialAudience);
    setChannel(initialAudience === 'business' ? 'email' : 'whatsapp');
    if (params.get('tab') === 'visit') setRequestType('meeting');
    const specialty = params.get('specialty');
    if (specialty) {
      const subject = document.getElementById('subject');
      if (subject) subject.value = `استشارة بخصوص: ${specialty}`;
    }
  }, []);

  const changeAudience = (nextAudience) => {
    setAudience(nextAudience);
    setChannel(nextAudience === 'business' ? 'email' : 'whatsapp');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (key) => String(data.get(key) || '').trim();
    const audienceLabel = { business: 'شركة / مؤسسة / جهة', investor: 'رجل أعمال / مستثمر', individual: 'فرد' }[audience];
    const requestLabel = requestType === 'meeting' ? 'طلب مقابلة في المكتب' : 'طلب استشارة قانونية';
    /* طلب المقابلة يُرسل دائمًا عبر واتساب لأنه يحتاج تأكيد سريع للموعد؛ اختيار قناة البريد/واتساب
       يظهر فقط لعميل الشركة عند طلب استشارة، ونص التفضيل في الرسالة بقى يطابق القناة الفعلية دايمًا. */
    const channelLabel = requestType === 'consultation'
      ? (audience === 'business' ? (channel === 'email' ? 'البريد الإلكتروني' : 'واتساب') : 'واتساب')
      : 'واتساب (لتأكيد الموعد)';
    const lines = [
      `*${requestLabel}*`,
      `الفئة: ${audienceLabel}`,
      `الاسم: ${get('name')}`,
      audience === 'business' ? `البريد الإلكتروني: ${get('email')}` : '',
      audience === 'business' ? `اسم الشركة / المؤسسة / الجهة: ${get('entity')}` : '',
      `المحافظة: ${get('governorate')}`,
      `المدينة: ${get('city')}`,
      `رقم الهاتف: ${get('phone')}`,
      `الموضوع: ${get('subject')}`,
      requestType === 'meeting' ? `التاريخ المقترح للمقابلة: ${get('meetingDate')}` : '',
      requestType === 'meeting' ? `الوقت المقترح للمقابلة: ${get('meetingTime')}` : '',
      requestType === 'consultation' ? `الوقت الأنسب للتواصل: ${get('contactTime')}` : '',
      `طريقة التواصل المفضلة: ${channelLabel}`,
    ].filter(Boolean);
    const body = `${lines.join('\n')}\n\nالتفاصيل:\n${get('details')}`;
    if (requestType === 'consultation' && audience === 'business' && channel === 'email') {
      window.location.href = `mailto:ma.law.firm@outlook.com?subject=${encodeURIComponent(requestLabel)}&body=${encodeURIComponent(body)}`;
    } else {
      window.open(`https://wa.me/201101076000?text=${encodeURIComponent(body)}`, '_blank', 'noopener,noreferrer');
    }
  };

  // حقل موحّد بمظهر بسيط ومتناسق: التسمية أعلى الحقل دائمًا (بدل التخطيط الأفقي
  // القديم تسمية/حقل جنبًا إلى جنب)، بارتفاع وحدود وحالة تركيز واحدة لكل الحقول
  // بلا استثناء (نص، بريد، هاتف، تاريخ، وقت) — هذا هو الفرق الجوهري عن التصميم
  // السابق، وهو أقرب لما تعتمده نماذج Google وMicrosoft: تكديس رأسي بسيط بدل
  // شبكة أفقية بعرض تسمية ثابت.
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
            <span className="en-tag">Contact Us</span>
            <h1>ابدأ بخطوة <span className="gold-text">واضحة</span></h1>
            <p className="sub">استشارة أولية مجانية لفهم مسألتك وتحديد الخطوة التالية — للأفراد والشركات والمستثمرين في أسوان ومختلف محافظات مصر.</p>
          </div>
        </div>
      </section>

      <section className="section-content" aria-label="معلومات التواصل">
        <div className="inner">
          <div className="reveal text-center mb-8">
            <span className="eyebrow" style={{ display: 'block', fontSize: '0.65rem', fontWeight: '800', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--matte-gold)', opacity: '0.5', marginBottom: '0.3rem' }}>● مقرنا</span>
            <h2 className="text-2xl md:text-3xl font-bold serif gold-text">مقر المكتب في أسوان وخدماتنا في مختلف محافظات مصر</h2>
            <p className="text-sm max-w-2xl mx-auto" style={{ color: 'var(--charcoal)', fontWeight: '700' }}>يقع مقر المكتب في أسوان، ونقدم خدماتنا للعملاء في مختلف محافظات مصر بحسب طبيعة الخدمة والقضية والجهة المختصة.</p>
          </div>

          {/* فرع واحد فعليًا، فبقى كارت مفرد بعرض مناسب في المنتصف بدل شبكة ثلاثية فاضية */}
          <div className="branches-grid mb-8">
            <div className="branch-card reveal">
              <div className="branch-icon"><Icon name="flag" /></div>
              <h4>مقر المكتب – أسوان <span className="badge-main">المقر الفعلي</span></h4>
              <p>شارع كسر الحجر، المتفرع من شارع كورنيش النيل، أمام مجمع المحاكم، أسوان</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <div className="reveal">
                <h2 className="text-2xl font-bold serif gold-text mb-1">بيانات التواصل</h2>
                <p className="text-sm" style={{ color: 'var(--charcoal)', fontWeight: '700' }}>تفضل بزيارة مقر المكتب في أسوان، أو ابدأ طلبك عبر الهاتف أو واتساب من أي محافظة في مصر.</p>
              </div>
              <div className="space-y-3">
                <div className="contact-card reveal">
                  <div className="icon-wrap"><Icon name="map-marker-alt" /></div>
                  <div className="info">
                    <h4>المقر الرئيسي (أسوان)</h4>
                    <p>شارع كسر الحجر، أمام مجمع المحاكم، أسوان</p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--charcoal)', fontWeight: '700' }}>تُحدد وسيلة تقديم الخدمة بحسب طبيعة الطلب والجهة القضائية المختصة.</p>
                  </div>
                </div>
                <div className="contact-card reveal" style={{ transitionDelay: '0.08s' }}>
                  <div className="icon-wrap"><Icon name="phone-alt" /></div>
                  <div className="info">
                    <h4>الهاتف والواتساب</h4>
                    <p dir="ltr">+20 110 107 6000</p>
                  </div>
                </div>
                <div className="contact-card reveal" style={{ transitionDelay: '0.16s' }}>
                  <div className="icon-wrap"><Icon name="envelope" /></div>
                  <div className="info">
                    <h4>البريد الإلكتروني</h4>
                    <p dir="ltr">ma.law.firm@outlook.com</p>
                  </div>
                </div>
                <div className="contact-card reveal" style={{ transitionDelay: '0.24s' }}>
                  <div className="icon-wrap"><Icon name="clock" /></div>
                  <div className="info">
                    <h4>ساعات العمل</h4>
                    <p>السبت - الخميس: ٩:٠٠ ص - ١٠:٠٠ م</p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--charcoal)', fontWeight: '700' }}>الجمعة: مغلق</p>
                  </div>
                </div>
              </div>

              <div className="map-container reveal">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3642.4!2d32.9!3d24.09!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDA1JzMxLjIiTiAzMsKwNTMnNDkuMiJF!5e0!3m2!1sen!2seg!4v1600000000000!5m2!1sen!2seg" allowFullScreen="" loading="lazy"></iframe>
                <div className="map-overlay"><span><Icon name="map-pin" style={{ marginRight: '0.5rem' }} /> المقر الرئيسي في أسوان</span></div>
              </div>

              <div className="reveal text-center pt-2">
                <p className="text-sm font-bold" style={{ color: 'var(--charcoal)', marginBottom: '0.75rem' }}>تابعنا على المنصات:</p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <a href="https://www.facebook.com/malegal" target="_blank" rel="noopener noreferrer" className="social-icon-circle"><Icon name="facebook-f" /></a>
                  <a href="https://x.com/mahmoud_a_hamyd" target="_blank" rel="noopener noreferrer" className="social-icon-circle" aria-label="صفحة المكتب على إكس"><Icon name="x" /></a>
                  <a href="https://www.linkedin.com/in/mahmoud-abdel-hamid-0a4664374" target="_blank" rel="noopener noreferrer" className="social-icon-circle"><Icon name="linkedin-in" /></a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 reveal" style={{ transitionDelay: '0.2s' }}>
              <div id="service-form" className="contact-form-shell" style={{ scrollMarginTop: '96px' }}>
                <div className="form-intro">
                  <span className="form-kicker">الخطوة الأولى</span>
                  <h2>اعرض مسألتك في استشارة أولية مجانية</h2>
                  <p>اختر الفئة الأقرب إليك، واكتب ما حدث بكلماتك. سنبدأ من الوقائع ونوجّهك إلى البيانات وطريقة التواصل الأنسب.</p>
                  <div className="consultation-scope-note"><Icon name="shield-alt" /><span><strong>ما الذي يشمله العرض؟</strong> فهم أولي للوقائع وتحديد المسار المناسب. لا تشمل الاستشارة المجانية إعداد مذكرات أو مراجعة ملفات مطولة أو التمثيل القضائي.</span></div>
                </div>

                <form id="serviceForm" onSubmit={handleSubmit} className="contact-form">
                  <fieldset className="form-step">
                    <legend><span className="step-number">01</span><span><strong>من أنت؟</strong><small>يساعدنا ذلك على فهم طبيعة طلبك</small></span></legend>
                    <div className="audience-cards">
                      <button type="button" className={`audience-card ${audience === 'business' ? 'selected' : ''}`} onClick={() => changeAudience('business')} aria-pressed={audience === 'business'}>
                        <span className="audience-icon"><Icon name="building" /></span><span><strong>شركة أو مؤسسة</strong><small>للشركات والجهات والمنشآت</small></span><Icon name="check-circle" />
                      </button>
                      <button type="button" className={`audience-card ${audience === 'investor' ? 'selected' : ''}`} onClick={() => changeAudience('investor')} aria-pressed={audience === 'investor'}>
                        <span className="audience-icon"><Icon name="chart-pie" /></span><span><strong>رجل أعمال أو مستثمر</strong><small>للاستثمار والشراكات والمشروعات</small></span><Icon name="check-circle" />
                      </button>
                      <button type="button" className={`audience-card ${audience === 'individual' ? 'selected' : ''}`} onClick={() => changeAudience('individual')} aria-pressed={audience === 'individual'}>
                        <span className="audience-icon"><Icon name="user" /></span><span><strong>فرد</strong><small>للمسائل والحقوق الشخصية</small></span><Icon name="check-circle" />
                      </button>
                    </div>
                  </fieldset>

                  <fieldset className="form-step">
                    <legend><span className="step-number">02</span><span><strong>بيانات التواصل</strong><small>{audience === 'business' ? 'بيانات الشركة أو الجهة' : 'بياناتك الأساسية'}</small></span></legend>
                    <div className="form-grid">
                      <Field id="name" label="الاسم بالكامل" placeholder="الاسم ثلاثي..." />
                      {audience === 'business' && <Field id="entity" label="اسم الشركة أو المؤسسة أو الجهة" placeholder="اسم الجهة" />}
                      {audience === 'business' && <Field id="email" label="البريد الإلكتروني" type="email" placeholder="name@company.com" />}
                      <Field id="phone" label="رقم الهاتف / الواتساب" type="tel" placeholder="01xxxxxxxxx" />
                      <Field id="governorate" label="المحافظة" placeholder="مثال: أسوان" />
                      <Field id="city" label="المدينة" placeholder="مثال: مدينة أسوان" />
                    </div>
                      <Field id="subject" label="موضوع الطلب" placeholder="مثال: مراجعة عقد أو نزاع عقاري" />
                    {/* اختيار القناة يظهر فقط لطلب الاستشارة (مش المقابلة)، لأن المقابلة بتتأكد دايمًا عبر واتساب لسرعة الرد */}
                    {audience === 'business' && requestType === 'consultation' && <div className="channel-box"><div><strong>طريقة الإرسال المفضلة</strong><small>يمكنك تغييرها قبل الإرسال</small></div><div className="channel-toggle"><button type="button" className={channel === 'email' ? 'active' : ''} onClick={() => setChannel('email')}><Icon name="envelope" /> البريد الإلكتروني</button><button type="button" className={channel === 'whatsapp' ? 'active' : ''} onClick={() => setChannel('whatsapp')}><Icon name="whatsapp" /> واتساب</button></div></div>}
                      <div className="form-field-modern">
                        <label htmlFor="details">تفاصيل الموضوع</label>
                        <div className="field-control">
                          <textarea id="details" name="details" rows="5" placeholder="اكتب ملخصًا للوقائع أو السؤال أو ما تود مناقشته..." aria-label="تفاصيل الموضوع" required></textarea>
                        </div>
                      </div>
                  </fieldset>

                  <fieldset className="form-step">
                    <legend><span className="step-number">03</span><span><strong>كيف نساعدك؟</strong><small>اختر الإجراء المناسب بعد إدخال بياناتك</small></span></legend>
                    <div className="request-options">
                      <label className={`request-option ${requestType === 'consultation' ? 'selected' : ''}`}><input type="radio" name="requestType" value="consultation" checked={requestType === 'consultation'} onChange={() => setRequestType('consultation')} /><span><strong>استشارة قانونية</strong><small>تحديد الخطوة التالية، ثم إرسال الطلب عبر واتساب</small></span></label>
                      <label className={`request-option ${requestType === 'meeting' ? 'selected' : ''}`}><input type="radio" name="requestType" value="meeting" checked={requestType === 'meeting'} onChange={() => setRequestType('meeting')} /><span><strong>مقابلة في المكتب</strong><small>اقتراح موعد في مقر المكتب بأسوان، تأكيد عبر واتساب</small></span></label>
                    </div>
                    {requestType === 'consultation' && <div className="meeting-box">
                      <div className="meeting-heading"><Icon name="clock" /><span><strong>الوقت الأنسب للتواصل</strong><small>سنرسل طلبك ونتواصل معك في الوقت المقترح قدر الإمكان.</small></span></div>
                      <div className="form-grid"><Field id="contactTime" label="الوقت الأنسب للتواصل" type="time" /></div>
                    </div>}
                    {requestType === 'meeting' && <div className="meeting-box">
                      <div className="meeting-heading"><Icon name="calendar-check" /><span><strong>الموعد الأنسب للمقابلة</strong><small>سيتم تأكيد الموعد برسالة عبر واتساب، وإرسال الطلب لا يعني تأكيده تلقائيًا.</small></span></div>
                      <div className="form-grid"><Field id="meetingDate" label="التاريخ المقترح" type="date" /><Field id="meetingTime" label="الوقت المقترح" type="time" /></div>
                    </div>}
                    {requestType === 'consultation' && <div className="whatsapp-note"><Icon name="whatsapp" /><span><strong>الإرسال عبر واتساب</strong><small>اضغط إرسال الطلب لفتح واتساب برسالة جاهزة بالبيانات التي أدخلتها.</small></span></div>}
                    {requestType === 'meeting' && <div className="whatsapp-note"><Icon name="whatsapp" /><span><strong>الإرسال عبر واتساب</strong><small>طلبات المقابلة تُرسل عبر واتساب دائمًا لتأكيد الموعد بسرعة.</small></span></div>}
                  </fieldset>

                  <button type="submit" className="premium-submit"><span>{requestType === 'meeting' ? 'إرسال طلب المقابلة عبر واتساب' : (audience === 'business' && channel === 'email' ? 'إرسال عبر البريد الإلكتروني' : 'إرسال عبر واتساب')}</span><Icon name={requestType === 'meeting' ? 'whatsapp' : (audience === 'business' && channel === 'email' ? 'envelope' : 'whatsapp')} /></button>
                  <p className="form-privacy"><Icon name="shield-alt" /> نحافظ على سرية بياناتك، وسيتم استخدام المعلومات للتواصل بشأن طلبك فقط.</p>
                </form>
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

        /* حقول موحّدة بمظهر مبسّط: تسمية صغيرة أعلى الحقل، ثم صندوق الإدخال كامل
           العرض تحته مباشرة — بلا شبكة أفقية، بلا اختلاف بين نوع وآخر من الحقول.
           هذا هو التغيير الجوهري المطلوب: بديل عن التخطيط القديم (تسمية يسار،
           حقل يمين، عرض تسمية ثابت 145px) بنمط تكديس رأسي يشبه نماذج
           Google وMicrosoft الحديثة. */
        .form-field-modern { display: flex; flex-direction: column; gap: 6px; margin-bottom: 0; }
        .form-field-modern label { color: var(--charcoal); font-size: 0.78rem; font-weight: 700; letter-spacing: 0.01em; padding: 0 0.1rem; transition: color 0.15s ease; }
        .form-field-modern:focus-within label { color: var(--matte-gold); }
        .optional-label { color: rgba(34,34,34,0.4); font-weight: 500; font-size: 0.68rem; }
        .field-control { min-width: 0; }
        .field-control input, .field-control textarea, .field-control select {
          width: 100%;
          height: 48px;
          padding: 0 14px;
          border: 1.5px solid rgba(8,20,38,0.14);
          border-radius: 10px;
          font-size: 0.9rem;
          background: #fff;
          color: var(--charcoal);
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
          outline: none;
          font-weight: 500;
          box-shadow: none;
        }
        .field-control input::placeholder, .field-control textarea::placeholder { color: rgba(34,34,34,0.38); font-weight: 400; }
        .field-control input:hover, .field-control textarea:hover, .field-control select:hover { border-color: rgba(8,20,38,0.32); }
        .field-control input:focus, .field-control textarea:focus, .field-control select:focus { border-color: var(--matte-gold); box-shadow: 0 0 0 3px rgba(176,141,87,0.16); }
        .field-control textarea { height: auto; padding: 0.85rem 14px; resize: vertical; min-height: 140px; line-height: 1.75; }
        .field-hint { display: block; color: rgba(34,34,34,0.42); font-size: 0.66rem; font-weight: 600; margin: 0.35rem 0.2rem 0; }
        .field-control input[type="file"] { height: auto; padding: 0.9rem 1rem; background: var(--pure-white); border: 1.5px dashed rgba(0,0,0,0.16); box-shadow: none; }
        .field-control input[type="file"]:hover { border-color: var(--matte-gold); }
        .field-control input[type="date"], .field-control input[type="time"] { cursor: pointer; }
        .field-control input[type="date"]::-webkit-calendar-picker-indicator, .field-control input[type="time"]::-webkit-calendar-picker-indicator { filter: invert(64%) sepia(23%) saturate(638%) hue-rotate(358deg) brightness(92%) contrast(88%); cursor: pointer; opacity: 0.75; }

        @media (max-width: 820px) { .hero-contact { padding: 100px 1rem 3rem; min-height: auto; } .section-content { padding: 2.5rem 1rem; } .hero-contact .hero-title-wrap h1 { font-size: clamp(2rem, 8vw, 2.8rem); } .contact-card { padding: 1rem; gap: 0.8rem; } .contact-card .icon-wrap { width: 40px; height: 40px; } .contact-card .icon-wrap .icon-svg { font-size: 1rem; } .map-container { height: 200px; } }
        @media (max-width: 640px) {
          .form-grid { grid-template-columns: 1fr; row-gap: 1.1rem; }
          .field-control input, .field-control select { font-size: 0.85rem; height: 46px; padding: 0 0.75rem; }
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
