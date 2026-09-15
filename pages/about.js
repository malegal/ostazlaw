import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import Icon from '../components/Icon';

export default function About() {
  const leadershipImageRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (leadershipImageRef.current) {
        leadershipImageRef.current.classList.add('colorized');
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <Head>
        <title>عن مكتب جاد الرب للمحاماة في أسوان | خبرة مهنية منذ 2005</title>
        <meta name="description" content="تعرّف على مكتب جاد الرب للمحاماة والاستشارات القانونية في أسوان، ونهجه في فهم الوقائع وتحليل المراكز القانونية وحماية مصالح الأفراد والشركات والمستثمرين في مصر." />
        <link rel="canonical" href="https://ostazlaw.vercel.app/about" />
        <meta property="og:title" content="عنا | مكتب جاد الرب للمحاماة والاستشارات القانونية" />
        <meta property="og:description" content="مكتب محاماة مصري يقدم خدمات المحاماة والاستشارات القانونية للأفراد والشركات." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ostazlaw.vercel.app/about" />
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
                "description": "مكتب محاماة مصري يقدم خدمات المحاماة والاستشارات القانونية للأفراد والشركات.",
                "url": "https://ostazlaw.vercel.app/",
                "email": "ma.law.firm@outlook.com",
                "telephone": "+201101076000",
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
                "@type": "Person",
                "@id": "https://ostazlaw.vercel.app/#founder",
                "name": "محمود عبد الحميد جاد الرب",
                "jobTitle": "المحامي بالنقض والدستورية والإدارية العليا",
                "worksFor": { "@id": "https://ostazlaw.vercel.app/#organization" },
                "url": "/about",
                "image": {
                  "@type": "ImageObject",
                  "url": "/mahmoud-abdel-hamid-lawyer-portrait.webp",
                  "caption": "الأستاذ محمود عبد الحميد جاد الرب – المحامي بالنقض والدستورية والإدارية العليا"
                }
              },
              {
                "@type": "AboutPage",
                "@id": "https://ostazlaw.vercel.app/about#webpage",
                "url": "https://ostazlaw.vercel.app/about",
                "name": "عنا",
                "isPartOf": { "@id": "https://ostazlaw.vercel.app/#website" },
                "about": { "@id": "https://ostazlaw.vercel.app/#organization" },
                "primaryImageOfPage": {
                  "@type": "ImageObject",
                  "url": "/mahmoud-abdel-hamid-lawyer-portrait.webp",
                  "caption": "الأستاذ محمود عبد الحميد جاد الرب – المحامي بالنقض والدستورية والإدارية العليا"
                }
              },
              {
                "@type": "WebSite",
                "@id": "https://ostazlaw.vercel.app/#website",
                "name": "مكتب جاد الرب للمحاماة والاستشارات القانونية",
                "url": "https://ostazlaw.vercel.app/",
                "description": "مكتب محاماة مصري يقدم خدمات المحاماة والاستشارات القانونية للأفراد والشركات والمستثمرين."
              }
            ]
          })
        }} />
      </Head>

      {/* الهيرو: خلفية المكتب نفسه بدل الخلفية التجريدية، مع طبقة تظليل داكنة تحافظ على وضوح النص الأبيض فوقها */}
      <section className="hero-about" aria-label="عنا">
        <div className="hero-glow"></div>
        <div className="hero-glow-2"></div>
        <div className="hero-inner">
          <div className="hero-title-wrap reveal">
            <span className="en-tag">About Our Firm</span>
            <h1><span className="gold-text">مكتب جاد الرب</span></h1>
            <p className="sub">للمحاماة والاستشارات القانونية</p>
            <p className="sub sub-gold">خبرة مهنية منذ 2005، تبدأ من فهم الوقائع وتمتد إلى حماية المصالح وتمثيل العملاء.</p>
            <p className="hero-lead">مكتب محاماة مقره أسوان، يخدم الأفراد والشركات والمستثمرين في مختلف محافظات مصر، بقيادة الأستاذ محمود عبد الحميد جاد الرب.</p>
            <div className="cta-wrap">
              <Link href="/contact?tab=consult#service-form" className="btn-gold">اعرض مسألتك</Link>
              <Link href="/specialties" className="btn-outline-white">تعرف على مجالات الممارسة</Link>
            </div>
          </div>
        </div>
      </section>

      {/* أولاً: عن المكتب — من هو، مقره، ونطاق عمله، قبل الحديث عن الشخص الذي يقوده */}
      <section className="about-definition" aria-label="عن المكتب">
        <div className="inner">
          <div className="def-grid">
            <div className="def-text reveal">
              <span className="eyebrow">● عن المكتب</span>
              <h2>مكتب جاد الرب<br /><span className="gold-text">في أسوان ومختلف محافظات مصر</span></h2>
              <p>مكتب جاد الرب للمحاماة والاستشارات القانونية مقره أسوان، ويقدم خدماته للأفراد والشركات والمستثمرين في مختلف محافظات مصر بحسب طبيعة المسألة والجهة المختصة.</p>
              <p>تستند خبرة المكتب منذ عام <strong>2005</strong> إلى ممارسة عملية في الاستشارات والتمثيل القضائي، مع اهتمام خاص بالقانون المدني والمنازعات العقارية والعقود والملكية، إلى جانب الخدمات القانونية للشركات والمستثمرين.</p>
              <p>ويعمل المكتب على تقديم خدمة قانونية واضحة ومنظمة تبدأ بفهم المسألة قبل تحديد الإجراء المناسب.</p>
              <div className="def-cards">
                <div className="def-card gold-underline-card"><span className="icon"><Icon name="map-marker-alt" /></span><h4>المقر: أسوان</h4></div>
                <div className="def-card gold-underline-card"><span className="icon"><Icon name="briefcase" /></span><h4>أفراد وشركات ومستثمرون</h4></div>
                <div className="def-card gold-underline-card"><span className="icon"><Icon name="gavel" /></span><h4>استشارات وتمثيل قانوني</h4></div>
                <div className="def-card gold-underline-card"><span className="icon"><Icon name="clock" /></span><h4>خبرة مهنية منذ 2005</h4></div>
              </div>
            </div>
            <div className="def-image reveal" style={{ transitionDelay: '0.15s' }}>
              <Image
                src="/about.webp"
                alt="مقر مكتب جاد الرب للمحاماة في أسوان"
                width={800}
                height={533}
                className="def-image-inner"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ثانيًا: عن المؤسس — بعد ما اتعرف الزائر على المكتب، يتعرف على الشخص اللي بيقوده */}
      <section className="section section-gray" aria-label="القيادة">
        <div className="section-inner">
          <div className="section-head reveal">
            <span className="eyebrow">● عن المؤسس</span>
            <h2>قيادة المكتب</h2>
            <p>خبرة قضائية راسخة تقود رؤيتنا القانونية.</p>
          </div>
          <div className="leadership-grid">
            <div className="leadership-image reveal" id="leadershipImage" ref={leadershipImageRef}>
              <Image
                src="/mahmoud-abdel-hamid-lawyer-portrait.webp"
                alt="الأستاذ محمود عبد الحميد جاد الرب"
                width={400}
                height={533}
                className="leadership-image-inner"
                priority
              />
            </div>
            <div className="leadership-content reveal" style={{ transitionDelay: '0.15s' }}>
              <h3>الأستاذ محمود عبد الحميد جاد الرب</h3>
              <div className="title">المحامي بالنقض والدستورية والإدارية العليا</div>
              <div className="en-title">Founder &amp; Managing Attorney</div>
              <p>يقود المكتب الأستاذ محمود عبد الحميد جاد الرب، المحامي بالنقض، مستندًا إلى رؤية تؤمن بأن النجاح في العمل القانوني يبدأ قبل قاعة المحكمة؛ من خلال الفهم العميق للوقائع، والتحليل القانوني الدقيق، وبناء استراتيجية مدروسة لكل قضية.</p>
              <p>ويشرف على أعمال المكتب لضمان الالتزام بأعلى المعايير المهنية، وتقديم خدمات قانونية تتسم بالدقة والشفافية والاحتراف، مع الحرص على بناء علاقة قائمة على الثقة مع كل عميل.</p>
              <div className="leadership-quote">"نؤمن بأن القرار القانوني الصحيح يبدأ بفهم صحيح للوقائع، وأن أفضل المرافعات هي التي يسبقها أفضل إعداد."</div>
            </div>
            <div className="leadership-side reveal" style={{ transitionDelay: '0.3s' }}>
              <div className="side-label">لماذا يطمئن عملاؤنا إلى العمل معنا؟</div>
              <ul className="leadership-trust-list">
                <li><Icon name="check-circle" /> فهم الوقائع قبل اقتراح الإجراء.</li>
                <li><Icon name="check-circle" /> وضوح في الخيارات ونطاق العمل.</li>
                <li><Icon name="check-circle" /> خبرة مهنية وممارسة قضائية.</li>
                <li><Icon name="check-circle" /> سرية في التعامل مع المعلومات والوثائق.</li>
                <li><Icon name="check-circle" /> متابعة منظمة للمستجدات والخطوات التالية.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ثالثًا: فلسفة المكتب — إزاي بيفكر المكتب وبيتعامل مع القضايا، بما فيها نظام Qayd */}
      <section className="section section-gray" aria-label="فلسفة المكتب وتقنية Qayd">
        <div className="section-inner philosophy-layout">
          <div className="philosophy-image reveal"><Image src="/image/legal-library.jpg" alt="مكتبة قانونية ورفوف كتب متخصصة" width={800} height={533} className="philosophy-image-inner" /></div>
          <div className="philosophy-copy">
            <div className="section-head reveal">
              <span className="eyebrow">● فلسفة المكتب</span>
              <h2>فلسفة تقوم على الفهم والتخطيط</h2>
              <p>نؤمن بأن العمل القانوني الجيد لا يبدأ بالحلول الجاهزة، بل بفهم الوقائع ودراسة المستندات وتقدير الخيارات.</p>
            </div>
            <div className="philosophy-grid">
              <div className="philosophy-card gold-underline-card reveal reveal-d1"><span className="icon"><Icon name="search" /></span><h4>نفهم أولاً</h4><p>نبدأ بالوقائع والمستندات قبل تحديد الرأي أو الإجراء.</p></div>
              <div className="philosophy-card gold-underline-card reveal reveal-d2"><span className="icon"><Icon name="microscope" /></span><h4>نحلل بدقة</h4><p>ندرس كل ملف باعتباره مسألة مستقلة لها ظروفها وأدلتها.</p></div>
              <div className="philosophy-card gold-underline-card reveal reveal-d3"><span className="icon"><Icon name="map" /></span><h4>نخطط بوضوح</h4><p>نوضح الخيارات والمخاطر والخطوة المناسبة قبل التنفيذ.</p></div>
              <div className="philosophy-card gold-underline-card reveal reveal-d4"><span className="icon"><Icon name="gavel" /></span><h4>ننفذ باحتراف</h4><p>نحوّل المسار المتفق عليه إلى إجراء قانوني منظم ومتابعة واضحة.</p></div>
            </div>
            <div className="beliefs-note reveal"><h3>قيم نلتزم بها</h3><p>الوضوح، والسرية، والدقة، والمسؤولية معايير نحرص على حضورها في الرأي والإجراء والمتابعة.</p><div className="beliefs-list"><span><Icon name="scale-balanced" /> النزاهة والوضوح</span><span><Icon name="lock" /> السرية</span><span><Icon name="crosshairs" /> الدقة</span><span><Icon name="handshake" /> المسؤولية</span></div></div>
            <div className="qayd-inline reveal"><span className="eyebrow">● التقنية في خدمة العمل القانوني</span><h3>نطور أدواتنا بما يحفظ <span className="gold-text">خصوصية الملفات</span></h3><p>حرصًا على تنظيم أعمال المكتب وحماية بيانات العملاء، طورنا نظام <strong>Qayd</strong> لإدارة الملفات والإجراءات الداخلية، بدل الاعتماد على برامج عامة لا تتناسب بالضرورة مع طبيعة العمل القانوني واحتياجاته.</p><p>يساعد هذا التوجه على تنظيم العمل ومتابعة المستجدات بوضوح، مع بقاء القرار القانوني قائمًا على الفهم المهني للوقائع والمستندات.</p><Link href="/client-inquiry" className="text-link">تابع ملفك عبر الموقع <Icon name="arrow-left" /></Link></div>
          </div>
        </div>
      </section>

      {/* رابعًا: أهدافنا وكيف نعمل — المراحل العملية اللي بتترجم الفلسفة لإجراء ملموس */}
      <section className="section section-light" aria-label="أهدافنا ومنهج العمل">
        <div className="section-inner">
          <div className="section-head reveal">
            <span className="eyebrow">● أهدافنا ومنهجنا</span>
            <h2>كيف نعمل؟</h2>
            <p>هدفنا أن يفهم العميل موقفه القانوني بوضوح قبل أي إجراء، عبر خمس مراحل تبدأ بالفهم وتنتهي بالمتابعة.</p>
          </div>
          <div className="process-timeline">
            <div className="process-step gold-underline-card reveal reveal-d1">
              <span className="num">١</span>
              <div className="step-content"><h4>الاستماع</h4><p>نستمع إلى عميلنا لفهم الوقائع والأهداف والتحديات.</p></div>
            </div>
            <div className="process-step gold-underline-card reveal reveal-d2">
              <span className="num">٢</span>
              <div className="step-content"><h4>التحليل</h4><p>ندرس الموقف القانوني بعمق، ونحلل الأدلة والمستندات.</p></div>
            </div>
            <div className="process-step gold-underline-card reveal reveal-d3">
              <span className="num">٣</span>
              <div className="step-content"><h4>الاستراتيجية</h4><p>نضع خطة قانونية واضحة تتناسب مع طبيعة القضية.</p></div>
            </div>
            <div className="process-step gold-underline-card reveal reveal-d4">
              <span className="num">٤</span>
              <div className="step-content"><h4>التنفيذ</h4><p>ننقل الخطة إلى الإجراء القانوني المتفق عليه باحترافية.</p></div>
            </div>
            <div className="process-step gold-underline-card reveal reveal-d1">
              <span className="num">٥</span>
              <div className="step-content"><h4>المتابعة</h4><p>نوضح المستجدات والخطوات التالية وفق نطاق العمل المتفق عليه.</p></div>
            </div>
          </div>
          <div className="process-footer">لكل قضية ظروفها الخاصة، لذلك لا نعتمد حلولًا جاهزة، بل نبني استراتيجية تتناسب مع طبيعة كل ملف قانوني.</div>
        </div>
      </section>

      {/* خامسًا: لماذا يثق بنا عملاؤنا — خلاصة الثقة بعد ما الزائر فهم المكتب والمؤسس والفلسفة ومنهج العمل */}
      <section className="section section-gray" aria-label="لماذا يثق بنا عملاؤنا">
        <div className="section-inner">
          <div className="section-head reveal">
            <span className="eyebrow">● الثقة</span>
            <h2>لماذا يثق بنا عملاؤنا؟</h2>
            <p>مزايا تجعل مكتبنا الخيار القانوني الموثوق.</p>
          </div>
          <div className="trust-grid">
            <div className="trust-card gold-underline-card reveal reveal-d1"><span className="icon"><Icon name="check-circle" /></span><h4>دراسة دقيقة</h4></div>
            <div className="trust-card gold-underline-card reveal reveal-d2"><span className="icon"><Icon name="check-circle" /></span><h4>شفافية</h4></div>
            <div className="trust-card gold-underline-card reveal reveal-d3"><span className="icon"><Icon name="check-circle" /></span><h4>تواصل مستمر</h4></div>
            <div className="trust-card gold-underline-card reveal reveal-d1"><span className="icon"><Icon name="check-circle" /></span><h4>سرية</h4></div>
            <div className="trust-card gold-underline-card reveal reveal-d2"><span className="icon"><Icon name="check-circle" /></span><h4>تمثيل احترافي</h4></div>
            <div className="trust-card gold-underline-card reveal reveal-d3"><span className="icon"><Icon name="check-circle" /></span><h4>حلول عملية</h4></div>
          </div>
        </div>
      </section>

      {/* جسر عاطفي قصير قبل الدعوة الختامية لاتخاذ إجراء */}
      <section className="founder-message" aria-label="كلمة المؤسس">
        <div className="inner reveal">
          <span className="quote-icon">"</span>
          <blockquote>نؤمن بأن المحاماة ليست مجرد مهنة للدفاع عن الحقوق، بل مسؤولية تقتضي الفهم، والأمانة، والالتزام. ولذلك نسعى في كل قضية إلى تقديم عمل قانوني يليق بثقة عملائنا ويعكس قيم مكتبنا.</blockquote>
          <div className="signature">Mahmoud Abdel Hamid</div>
          <div className="signature-sub">Founder</div>
        </div>
      </section>

      {/* سادسًا وأخيرًا: دعوة لاتخاذ إجراء */}
      <section className="cta-final" aria-label="دعوة للتواصل">
        <div className="section-inner reveal">
          <h2>هل تبحث عن شريك قانوني يمكنك الاعتماد عليه؟</h2>
          <p>يسعدنا مناقشة احتياجاتك القانونية وتقديم المشورة المناسبة بما يتوافق مع ظروف كل حالة وأهدافها.</p>
          <div className="cta-actions">
            <Link href="/contact?tab=consult#service-form" className="btn-gold">اعرض مسألتك</Link>
            <Link href="/specialties" className="btn-outline-white">استكشف مجالات الممارسة</Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero-about { padding: 120px 2rem 4rem; background: linear-gradient(180deg, rgba(11,15,26,0.88), rgba(11,15,26,0.94)), url('/about.webp') center/cover no-repeat; position: relative; overflow: hidden; min-height: 60vh; display: flex; align-items: center; }
        .hero-about .hero-glow { position: absolute; width: 60vw; height: 60vw; border-radius: 50%; background: radial-gradient(circle, rgba(176,141,87,0.05) 0%, transparent 70%); top: -20%; right: -20%; pointer-events: none; animation: orbFloat 20s ease-in-out infinite alternate; }
        .hero-about .hero-glow-2 { position: absolute; width: 40vw; height: 40vw; border-radius: 50%; background: radial-gradient(circle, rgba(176,141,87,0.03) 0%, transparent 70%); bottom: -20%; left: -10%; pointer-events: none; animation: orbFloat 25s ease-in-out infinite alternate-reverse; }
        @keyframes orbFloat { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(40px, -30px) scale(1.05); } }
        .hero-about .hero-inner { max-width: 900px; margin: 0 auto; position: relative; z-index: 1; width: 100%; }
        .hero-about .hero-title-wrap { text-align: center; }
        .hero-about .hero-title-wrap .en-tag { font-size: 0.65rem; font-weight: 800; letter-spacing: 0.4em; text-transform: uppercase; color: var(--matte-gold); opacity: 0.6; display: block; margin-bottom: 0.3rem; }
        .hero-about .hero-title-wrap h1 { font-size: clamp(2.4rem, 5vw, 4rem); font-weight: 900; color: #fff; line-height: 1.1; }
        .hero-about .hero-title-wrap h1 .gold-text { color: var(--matte-gold); }
        .hero-about .hero-title-wrap .sub { font-size: clamp(1rem, 1.3vw, 1.2rem); font-weight: 500; color: rgba(255,255,255,0.85); max-width: 700px; margin: 0.8rem auto 0; line-height: 1.7; }
        .hero-about .hero-title-wrap .sub-gold { font-weight: 500; color: var(--matte-gold); margin-top: 0.2rem; }
        .hero-about .hero-lead { color: rgba(255,255,255,0.82); font-weight: 600; font-size: 1rem; line-height: 1.9; max-width: 650px; margin: 1.2rem auto 0; }
        .hero-about .cta-wrap { margin-top: 1.8rem; display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; }
        .about-definition { padding: 5rem 2rem; background: var(--warm-off-white); }
        .about-definition .inner { max-width: 1200px; margin: 0 auto; }
        .about-definition .def-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        .about-definition .def-text p { color: var(--charcoal); font-weight: 700; font-size: 1.05rem; line-height: 1.9; margin-bottom: 0.8rem; }
        .about-definition .def-text .eyebrow { font-size: 0.65rem; font-weight: 800; letter-spacing: 0.25em; text-transform: uppercase; color: var(--matte-gold); opacity: 0.5; display: block; margin-bottom: 0.3rem; }
        .about-definition .def-text h2 { font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 900; color: var(--charcoal); line-height: 1.15; margin-bottom: 1rem; }
        .about-definition .def-text h2 .gold-text { color: var(--matte-gold); }
        .about-definition .def-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.5rem; }
        .about-definition .def-card { background: var(--pure-white); padding: 1.2rem 1rem; border-radius: 10px; border: 1px solid rgba(0,0,0,0.04); text-align: center; transition: all 0.4s var(--ease-out); cursor: default; position: relative; }
        .about-definition .def-card::after { content: ''; position: absolute; bottom: 0; right: 0; width: 0; height: 2px; background: var(--matte-gold); transition: width 0.5s var(--ease-out); }
        .about-definition .def-card:hover::after { width: 100%; }
        .about-definition .def-card:hover { border-color: var(--matte-gold); transform: translateY(-3px); box-shadow: 0 8px 30px rgba(0,0,0,0.04); }
        .about-definition .def-card .icon { font-size: 1.4rem; color: var(--matte-gold); opacity: 0.3; margin-bottom: 0.2rem; display: block; }
        .about-definition .def-card h4 { font-size: 0.85rem; font-weight: 700; color: var(--charcoal); }
        .about-definition .def-image { border-radius: 12px; overflow: hidden; border: 1px solid rgba(176,141,87,0.1); box-shadow: 0 8px 40px rgba(0,0,0,0.04); }
        .about-definition .def-image :global(img) { width: 100%; height: auto; aspect-ratio: 4/3; object-fit: cover; display: block; }
        .philosophy-layout { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 3rem; align-items: start; }
        .philosophy-image { border-radius: 12px; overflow: hidden; border: 1px solid rgba(176,141,87,0.1); box-shadow: 0 8px 40px rgba(0,0,0,0.04); position: sticky; top: 100px; }
        .philosophy-image-inner { width: 100%; height: auto; aspect-ratio: 4 / 3; object-fit: cover; display: block; }
        .philosophy-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .beliefs-note, .qayd-inline { margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid rgba(176,141,87,0.18); }
        .beliefs-note h3, .qayd-inline h3 { color: var(--charcoal); font-size: 1.25rem; font-weight: 900; margin-bottom: 0.4rem; }
        .beliefs-note p, .qayd-inline p { color: var(--charcoal); font-weight: 700; line-height: 1.8; font-size: 0.9rem; }
        .beliefs-list { display: flex; flex-wrap: wrap; gap: 0.55rem; margin-top: 0.8rem; }
        .beliefs-list span { display: inline-flex; align-items: center; gap: 0.35rem; background: var(--pure-white); border: 1px solid rgba(0,0,0,0.05); border-radius: 20px; padding: 0.35rem 0.7rem; color: var(--charcoal); font-size: 0.75rem; font-weight: 700; }
        .beliefs-list .icon-svg { color: var(--matte-gold); }
        .qayd-inline .eyebrow { display: block; margin-bottom: 0.35rem; }
        .qayd-inline .text-link { display: inline-flex; align-items: center; gap: 0.4rem; margin-top: 0.4rem; }
        .philosophy-card { background: var(--pure-white); padding: 1.8rem 1.4rem; border-radius: 12px; border: 1px solid rgba(0,0,0,0.04); transition: all 0.4s var(--ease-out); box-shadow: 0 2px 10px rgba(0,0,0,0.02); text-align: center; cursor: default; position: relative; }
        .philosophy-card::after { content: ''; position: absolute; bottom: 0; right: 0; width: 0; height: 2px; background: var(--matte-gold); transition: width 0.6s var(--ease-out); }
        .philosophy-card:hover::after { width: 100%; }
        .philosophy-card:hover { border-color: var(--matte-gold); transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.04); }
        .philosophy-card .icon { font-size: 1.8rem; color: var(--matte-gold); opacity: 0.3; margin-bottom: 0.5rem; display: block; }
        .philosophy-card h4 { font-size: 0.95rem; font-weight: 700; color: var(--charcoal); margin-bottom: 0.2rem; }
        .philosophy-card p { font-size: 0.9rem; color: var(--charcoal); line-height: 1.6; font-weight: 700; }
        .leadership-grid { display: grid; grid-template-columns: 1fr 1.2fr 0.8fr; gap: 2.5rem; align-items: start; }
        .leadership-image { border-radius: 12px; overflow: hidden; border: 1px solid rgba(176,141,87,0.12); box-shadow: 0 8px 40px rgba(0,0,0,0.04); transition: filter 0.8s ease; }
        .leadership-image :global(img) { width: 100%; height: auto; aspect-ratio: 3/4; object-fit: cover; display: block; filter: grayscale(100%); transition: filter 1.5s ease; }
        .leadership-image.colorized :global(img) { filter: grayscale(0%); }
        .leadership-content h3 { font-size: 1.8rem; font-weight: 900; color: var(--charcoal); margin-bottom: 0.1rem; }
        .leadership-content .title { font-size: 1rem; font-weight: 500; color: var(--matte-gold); margin-bottom: 0.2rem; }
        .leadership-content .en-title { font-size: 0.7rem; font-weight: 300; color: rgba(34,34,34,0.4); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.8rem; }
        .leadership-content p { color: var(--charcoal); font-weight: 700; line-height: 1.8; font-size: 0.95rem; margin-bottom: 0.6rem; }
        .leadership-side { background: var(--light-gray); padding: 1.8rem 1.4rem; border-radius: 12px; border: 1px solid rgba(0,0,0,0.04); }
        .leadership-side .side-label { font-size: 0.8rem; font-weight: 800; color: var(--charcoal); margin-bottom: 0.8rem; }
        .leadership-trust-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.75rem; }
        .leadership-trust-list li { display: flex; align-items: flex-start; gap: 0.5rem; color: var(--charcoal); font-size: 0.82rem; font-weight: 700; line-height: 1.55; }
        .leadership-trust-list .icon-svg { color: var(--matte-gold); flex-shrink: 0; margin-top: 0.15rem; }
        .leadership-quote { margin-top: 1.5rem; padding: 1.5rem 2rem; border-right: 3px solid var(--matte-gold); background: rgba(176,141,87,0.03); border-radius: 8px; font-size: 1.1rem; font-weight: 700; color: var(--charcoal); line-height: 1.8; font-style: italic; }
        .process-footer { max-width: 800px; margin: 1.5rem auto 0; text-align: center; font-size: 0.95rem; color: var(--charcoal); font-weight: 700; line-height: 1.8; padding: 1.2rem 2rem; border-right: 2px solid var(--matte-gold); background: rgba(176,141,87,0.03); border-radius: 8px; }
        .trust-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
        .trust-card { background: var(--pure-white); padding: 1.6rem 1.2rem; border-radius: 10px; border: 1px solid rgba(0,0,0,0.04); transition: all 0.4s var(--ease-out); box-shadow: 0 2px 10px rgba(0,0,0,0.02); text-align: center; cursor: default; position: relative; }
        .trust-card::after { content: ''; position: absolute; bottom: 0; right: 0; width: 0; height: 2px; background: var(--matte-gold); transition: width 0.6s var(--ease-out); }
        .trust-card:hover::after { width: 100%; }
        .trust-card:hover { border-color: var(--matte-gold); transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.04); }
        .trust-card .icon { font-size: 1.4rem; color: var(--matte-gold); opacity: 0.2; margin-bottom: 0.3rem; display: block; }
        .trust-card h4 { font-size: 0.85rem; font-weight: 700; color: var(--charcoal); }
        .founder-message { padding: 4rem 2rem; background: var(--very-dark-navy); color: #fff; }
        .founder-message .inner { max-width: 800px; margin: 0 auto; text-align: center; }
        .founder-message .quote-icon { font-size: 3rem; color: var(--matte-gold); opacity: 0.15; margin-bottom: 0.5rem; display: block; }
        .founder-message blockquote { font-size: clamp(1.2rem, 2vw, 1.6rem); font-weight: 700; line-height: 1.9; color: rgba(255,255,255,0.9); margin-bottom: 1.5rem; }
        .founder-message .signature { font-size: 1.1rem; font-weight: 700; color: var(--matte-gold); }
        .founder-message .signature-sub { font-size: 0.7rem; font-weight: 300; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.06em; }
        .cta-final { background: var(--very-dark-navy); padding: 4.5rem 2rem; text-align: center; color: #fff; border-top: 1px solid rgba(176,141,87,0.06); }
        .cta-final h2 { font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 900; color: #fff; margin-bottom: 0.5rem; }
        .cta-final p { max-width: 640px; margin: 0.4rem auto 2rem; color: rgba(255,255,255,0.7); font-weight: 500; font-size: 1rem; line-height: 1.8; }
        .cta-final .cta-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; }
        @media (max-width: 1024px) { .philosophy-layout { gap: 2rem; } .philosophy-grid { grid-template-columns: repeat(2, 1fr); } .trust-grid { grid-template-columns: repeat(2, 1fr); } .leadership-grid { grid-template-columns: 1fr 1fr; gap: 2rem; } .leadership-side { grid-column: span 2; } .about-definition .def-grid { gap: 2rem; } }
        @media (max-width: 820px) { .about-definition .def-grid { grid-template-columns: 1fr; gap: 2.5rem; } .about-definition .def-cards { grid-template-columns: 1fr 1fr; } .hero-about { padding: 100px 1rem 3rem; min-height: auto; } .philosophy-layout { grid-template-columns: 1fr; } .philosophy-image { position: static; max-width: 680px; margin: 0 auto; } .philosophy-grid { grid-template-columns: 1fr 1fr; } .trust-grid { grid-template-columns: 1fr 1fr; } .leadership-grid { grid-template-columns: 1fr; gap: 1.5rem; } .leadership-side { grid-column: span 1; } .leadership-image :global(img) { max-width: 280px; margin: 0 auto; } }
        @media (max-width: 640px) { .philosophy-grid { grid-template-columns: 1fr; } .trust-grid { grid-template-columns: 1fr; max-width: 320px; margin: 0 auto; } .about-definition .def-cards { grid-template-columns: 1fr; max-width: 280px; margin: 0 auto; } .hero-about .hero-title-wrap h1 { font-size: clamp(2rem, 8vw, 2.8rem); } .cta-final .cta-actions { flex-direction: column; align-items: center; } .cta-final .cta-actions .btn-gold, .cta-final .cta-actions .btn-outline-white { width: 100%; max-width: 300px; text-align: center; } .leadership-quote { padding: 1rem 1.2rem; font-size: 1rem; } .founder-message { padding: 3rem 1rem; } .founder-message blockquote { font-size: 1rem; } }
      `}</style>
    </Layout>
  );
}
