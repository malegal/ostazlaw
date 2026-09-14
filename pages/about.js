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
        <title>عنا | جاد الرب للمحاماة والاستشارات القانونية</title>
        <meta name="description" content="جاد الرب للمحاماة والاستشارات القانونية، مقرها أسوان، تأسست عام 2005 وتقدم خدماتها للأفراد والشركات في مختلف محافظات مصر." />
        <link rel="canonical" href="https://ostazlaw.vercel.app/about" />
        <meta property="og:title" content="عنا | جاد الرب للمحاماة والاستشارات القانونية" />
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
                "name": "جاد الرب للمحاماة والاستشارات القانونية",
                "alternateName": "JAD ELRAB",
                "description": "مكتب محاماة مصري يقدم خدمات المحاماة والاستشارات القانونية للأفراد والشركات.",
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
                "name": "جاد الرب للمحاماة والاستشارات القانونية",
                "url": "https://ostazlaw.vercel.app/",
                "description": "مكتب محاماة مصرية تقدم خدمات المحاماة والاستشارات القانونية."
              }
            ]
          })
        }} />
      </Head>

      <section className="hero-about" aria-label="عنا">
        <div className="hero-pattern"></div>
        <div className="hero-glow"></div>
        <div className="hero-glow-2"></div>
        <div className="hero-inner">
          <div className="hero-title-wrap reveal">
            <span className="en-tag">About Our Firm</span>
            {/* العنوان يعرّف المكتب باسمه الرسمي، بينما يبقى اسم المحامي المؤسس محفوظًا في بياناته داخل الصفحة. */}
            <h1><span className="gold-text">مكتب جاد الرب</span></h1>
            <p className="sub">للمحاماة والاستشارات القانونية</p>
            <p className="sub sub-gold">خبرة قانونية تبدأ من فهم الوقائع، وتمتد إلى حماية المصالح وتمثيل العملاء.</p>
          </div>
          <div className="hero-grid">
            <div className="hero-image reveal">
              <Image
                src="/about.webp"
                alt="مقر المكتب"
                width={800}
                height={600}
                className="hero-image-inner"
              />
            </div>
            <div className="hero-text reveal" style={{ transitionDelay: '0.15s' }}>
              <p><strong>مكتب محاماة مقره أسوان، تأسس عام 2005، ويخدم الأفراد والشركات والمستثمرين في مختلف محافظات مصر. نؤمن بأن العمل القانوني المتميز يبدأ بالفهم العميق، ويُبنى على التخطيط، ويُقاس بحماية مصالح العميل.</strong></p>
              <p>تُعد جاد الرب للمحاماة والاستشارات القانونية <strong>(JAD ELRAB)</strong> مكتب محاماة يقدم خدمات المحاماة والاستشارات القانونية للأفراد والشركات، مستندة إلى منهج مهني يقوم على التحليل الدقيق، والتخطيط القانوني، والتمثيل الاحترافي أمام جهات القضاء.</p>
              <p>نؤمن بأن القضايا لا تُدار بردود الأفعال، بل بفهمٍ عميق للوقائع، وتحليلٍ صحيح للمراكز القانونية، ثم بناء استراتيجية تحقق أفضل حماية ممكنة لمصالح عملائنا.</p>
              <div className="cta-wrap">
                <Link href="/specialties" className="btn-gold">تعرف على مجالات الممارسة</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-definition" aria-label="من نحن">
        <div className="inner">
          <div className="def-grid">
            <div className="def-text reveal">
              <span className="eyebrow">● من نحن</span>
              <h2>مكتب محاماة<br /><span className="gold-text">تُبنى على الفهم والتخطيط</span></h2>
              <p>تأسست جاد الرب للمحاماة والاستشارات القانونية عام <strong>2005</strong>، لتقديم خدمات قانونية واستشارات متخصصة للأفراد والشركات، بخبرة قضائية راسخة أمام محكمة النقض والمحكمة الدستورية العليا.</p>
            <p>نؤمن بأن العمل القانوني المتميز يبدأ بفهم عميق للوقائع، ويُبنى على تخطيط دقيق، ويُقاس بحماية مصالح العميل. ولذلك نتعامل مع كل قضية كمسؤولية مستقلة، ندرسها من جميع جوانبها القانونية والواقعية.</p>
              <p>نخدم الشركات والأفراد على حد سواء، مع التزامنا بالشفافية، والسرية، والدقة، باعتبارها المبادئ التي تقوم عليها علاقتنا مع عملائنا في جمهورية مصر العربية.</p>
              <div className="def-cards">
                <div className="def-card gold-underline-card"><span className="icon"><Icon name="scale-balanced" /></span><h4>مكتب محاماة</h4></div>
                <div className="def-card gold-underline-card"><span className="icon"><Icon name="building" /></span><h4>خدمات للشركات والأفراد</h4></div>
                <div className="def-card gold-underline-card"><span className="icon"><Icon name="shield-alt" /></span><h4>حلول قانونية متخصصة</h4></div>
                <div className="def-card gold-underline-card"><span className="icon"><Icon name="map-marker-alt" /></span><h4>جمهورية مصر العربية</h4></div>
              </div>
            </div>
            <div className="def-image reveal" style={{ transitionDelay: '0.15s' }}>
              {/* صورة مكتبة قانونية محلية بدل تكرار صورة المكتب، مع بقاء المصدر داخل المشروع. */}
              <Image
                src="/image/legal-library.jpg"
                alt="مكتبة قانونية ورفوف كتب متخصصة"
                width={800}
                height={533}
                className="def-image-inner"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-gray" aria-label="فلسفتنا">
        <div className="section-inner">
          <div className="section-head reveal">
            <span className="eyebrow">● كيف نفكر؟</span>
            <h2>فلسفتنا في العمل القانوني</h2>
            <p>مبادئ توجه منهجنا في التعامل مع كل قضية واستشارة.</p>
          </div>
          <div className="philosophy-grid">
            <div className="philosophy-card gold-underline-card reveal reveal-d1">
              <span className="icon"><Icon name="search" /></span>
              <h4>نفهم أولاً</h4>
              <p>لا نقدم رأيًا قانونيًا قبل دراسة الوقائع وتحليلها بعمق.</p>
            </div>
            <div className="philosophy-card gold-underline-card reveal reveal-d2">
              <span className="icon"><Icon name="microscope" /></span>
              <h4>نحلل بدقة</h4>
              <p>كل ملف قانوني يخضع لتحليل مستقل وشامل.</p>
            </div>
            <div className="philosophy-card gold-underline-card reveal reveal-d3">
              <span className="icon"><Icon name="map" /></span>
              <h4>نخطط باستراتيجية</h4>
              <p>لكل قضية مسار قانوني يناسب طبيعتها وأهدافها.</p>
            </div>
            <div className="philosophy-card gold-underline-card reveal reveal-d4">
              <span className="icon"><Icon name="gavel" /></span>
              <h4>ننفذ باحتراف</h4>
              <p>نمثل عملاءنا بأعلى درجات الالتزام والمسؤولية.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-white" aria-label="قيم المكتب">
        <div className="section-inner">
          <div className="section-head reveal">
            <span className="eyebrow">● قيمنا</span>
            <h2>القيم التي نرتكز عليها</h2>
            <p>مبادئ راسخة توجه تعاملنا مع العملاء والقضايا.</p>
          </div>
          <div className="values-grid">
            <div className="value-card gold-underline-card reveal reveal-d1">
              <span className="icon"><Icon name="scale-balanced" /></span>
              <h4>النزاهة</h4>
              <p>الأمانة والوضوح في كل رأي وإجراء.</p>
            </div>
            <div className="value-card gold-underline-card reveal reveal-d2">
              <span className="icon"><Icon name="lock" /></span>
              <h4>السرية</h4>
              <p>حماية خصوصية معلومات ووثائق العملاء.</p>
            </div>
            <div className="value-card gold-underline-card reveal reveal-d3">
              <span className="icon"><Icon name="briefcase" /></span>
              <h4>الاحتراف</h4>
              <p>أعلى معايير المهنة في كل خدمة نقدمها.</p>
            </div>
            <div className="value-card gold-underline-card reveal reveal-d1">
              <span className="icon"><Icon name="crosshairs" /></span>
              <h4>الدقة</h4>
              <p>التحليل والصياغة والمتابعة بدقة متناهية.</p>
            </div>
            <div className="value-card gold-underline-card reveal reveal-d2">
              <span className="icon"><Icon name="handshake" /></span>
              <h4>المسؤولية</h4>
              <p>الالتزام تجاه عملائنا وقضاياهم.</p>
            </div>
            <div className="value-card gold-underline-card reveal reveal-d3">
              <span className="icon"><Icon name="book" /></span>
              <h4>التعلم المستمر</h4>
              <p>تحديث معرفتنا القانونية باستمرار.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-gray" aria-label="القيادة">
        <div className="section-inner">
          <div className="section-head reveal">
            <span className="eyebrow">● القيادة</span>
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
              <div className="title">محام بالنقض</div>
              <div className="en-title">Founder &amp; Managing Attorney</div>
              <p>يقود المكتب الأستاذ محمود عبد الحميد جاد الرب، المحامي بالنقض، مستندًا إلى رؤية تؤمن بأن النجاح في العمل القانوني يبدأ قبل قاعة المحكمة؛ من خلال الفهم العميق للوقائع، والتحليل القانوني الدقيق، وبناء استراتيجية مدروسة لكل قضية.</p>
              <p>ويشرف على أعمال المكتب لضمان الالتزام بأعلى المعايير المهنية، وتقديم خدمات قانونية تتسم بالدقة والشفافية والاحتراف، مع الحرص على بناء علاقة قائمة على الثقة مع كل عميل.</p>
              <div className="leadership-quote">"نؤمن بأن القرار القانوني الصحيح يبدأ بفهم صحيح للوقائع، وأن أفضل المرافعات هي التي يسبقها أفضل إعداد."</div>
            </div>
            <div className="leadership-side reveal" style={{ transitionDelay: '0.3s' }}>
              <div className="side-label">الصفة</div>
              <div className="side-value">محام بالنقض</div>
              <div className="side-label">مجالات التركيز</div>
              <div className="side-tags">
                <span>القانون المدني</span>
                <span>الشركات</span>
                <span>العقود</span>
                <span>التعويضات</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-light" aria-label="منهج العمل">
        <div className="section-inner">
          <div className="section-head reveal">
            <span className="eyebrow">● منهج العمل</span>
            <h2>كيف نعمل؟</h2>
            <p>خمس مراحل تبدأ بالفهم وتنتهي بالمتابعة.</p>
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

      <section className="section section-white qayd-section" aria-label="التقنية وتنظيم العمل القانوني">
        <div className="section-inner">
          <div className="qayd-grid">
            <div className="qayd-copy reveal">
              <span className="eyebrow">● التقنية في خدمة العمل القانوني</span>
              <h2>نطور أدواتنا بما يحفظ <span className="gold-text">خصوصية ملفاتنا</span></h2>
              <p>حرصًا على تنظيم أعمال المكتب وحماية بيانات العملاء، طورنا نظام <strong>Qayd</strong> لإدارة الملفات والإجراءات الداخلية، بدل الاعتماد على برامج عامة لا تتناسب بالضرورة مع طبيعة العمل القانوني واحتياجاته.</p>
              <p>يأتي ذلك ضمن توجهنا إلى الجمع بين الخبرة القانونية والتنظيم الدقيق، مع تطوير أدوات تساعد العملاء على متابعة مستجدات ملفاتهم بوضوح وسهولة.</p>
              <div className="qayd-points"><span><Icon name="lock" /> حماية وخصوصية</span><span><Icon name="folder-open" /> تنظيم الملفات</span><span><Icon name="chart-line" /> متابعة أوضح</span></div>
            </div>
            <div className="qayd-note reveal" style={{ transitionDelay: '0.15s' }}>
              <span className="qayd-mark">Q</span>
              <h3>خطوة تالية لعملائنا</h3>
              <p>تتم متابعة مستجدات الملفات حاليًا عن طريق موقع المكتب، ونعمل على تطوير تطبيق مخصص لعملاء المكتب يساعدهم على متابعة قضاياهم بصورة أكثر سهولة وتنظيمًا.</p>
              <Link href="/client-inquiry" className="text-link">تابع ملفك عبر الموقع <Icon name="arrow-left" /></Link>
            </div>
          </div>
        </div>
      </section>

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

      <section className="founder-message" aria-label="كلمة المؤسس">
        <div className="inner reveal">
          <span className="quote-icon">"</span>
          <blockquote>نؤمن بأن المحاماة ليست مجرد مهنة للدفاع عن الحقوق، بل مسؤولية تقتضي الفهم، والأمانة، والالتزام. ولذلك نسعى في كل قضية إلى تقديم عمل قانوني يليق بثقة عملائنا ويعكس قيم مكتبنا.</blockquote>
          <div className="signature">Mahmoud Abdel Hamid</div>
          <div className="signature-sub">Founder</div>
        </div>
      </section>

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
        .hero-about { padding: 120px 2rem 4rem; background: var(--very-dark-navy); position: relative; overflow: hidden; min-height: 85vh; display: flex; align-items: center; }
        .hero-about .hero-pattern { position: absolute; inset: 0; opacity: 0.03; background-image: radial-gradient(circle at 20% 30%, var(--matte-gold) 1px, transparent 1px), radial-gradient(circle at 80% 70%, var(--matte-gold) 1px, transparent 1px); background-size: 60px 60px; pointer-events: none; }
        .hero-about .hero-glow { position: absolute; width: 60vw; height: 60vw; border-radius: 50%; background: radial-gradient(circle, rgba(176,141,87,0.04) 0%, transparent 70%); top: -20%; right: -20%; pointer-events: none; animation: orbFloat 20s ease-in-out infinite alternate; }
        .hero-about .hero-glow-2 { position: absolute; width: 40vw; height: 40vw; border-radius: 50%; background: radial-gradient(circle, rgba(176,141,87,0.02) 0%, transparent 70%); bottom: -20%; left: -10%; pointer-events: none; animation: orbFloat 25s ease-in-out infinite alternate-reverse; }
        @keyframes orbFloat { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(40px, -30px) scale(1.05); } }
        .hero-about .hero-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; width: 100%; }
        .hero-about .hero-title-wrap { text-align: center; margin-bottom: 3rem; }
        .hero-about .hero-title-wrap .en-tag { font-size: 0.65rem; font-weight: 800; letter-spacing: 0.4em; text-transform: uppercase; color: var(--matte-gold); opacity: 0.5; display: block; margin-bottom: 0.3rem; }
        .hero-about .hero-title-wrap h1 { font-size: clamp(2.4rem, 5vw, 4rem); font-weight: 900; color: #fff; line-height: 1.1; }
        .hero-about .hero-title-wrap h1 .gold-text { color: var(--matte-gold); }
        .hero-about .hero-title-wrap .sub { font-size: clamp(1rem, 1.3vw, 1.2rem); font-weight: 500; color: rgba(255,255,255,0.8); max-width: 700px; margin: 0.8rem auto 0; line-height: 1.7; }
        .hero-about .hero-title-wrap .sub-gold { font-weight: 500; color: var(--matte-gold); margin-top: 0.2rem; }
        .hero-about .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        .hero-about .hero-image { border-radius: 12px; overflow: hidden; border: 1px solid rgba(176,141,87,0.1); box-shadow: 0 8px 40px rgba(0,0,0,0.3); }
        .hero-about .hero-image :global(img) { width: 100%; height: auto; aspect-ratio: 4/3; object-fit: cover; display: block; }
        .hero-about .hero-text p { color: #fff; font-weight: 600; font-size: 1.05rem; line-height: 1.9; margin-bottom: 0.8rem; }
        .hero-about .hero-text strong { color: #fff; font-weight: 700; }
        .hero-about .cta-wrap { margin-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap; }
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
        .philosophy-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .philosophy-card { background: var(--pure-white); padding: 1.8rem 1.4rem; border-radius: 12px; border: 1px solid rgba(0,0,0,0.04); transition: all 0.4s var(--ease-out); box-shadow: 0 2px 10px rgba(0,0,0,0.02); text-align: center; cursor: default; position: relative; }
        .philosophy-card::after { content: ''; position: absolute; bottom: 0; right: 0; width: 0; height: 2px; background: var(--matte-gold); transition: width 0.6s var(--ease-out); }
        .philosophy-card:hover::after { width: 100%; }
        .philosophy-card:hover { border-color: var(--matte-gold); transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.04); }
        .philosophy-card .icon { font-size: 1.8rem; color: var(--matte-gold); opacity: 0.3; margin-bottom: 0.5rem; display: block; }
        .philosophy-card h4 { font-size: 0.95rem; font-weight: 700; color: var(--charcoal); margin-bottom: 0.2rem; }
        .philosophy-card p { font-size: 0.9rem; color: var(--charcoal); line-height: 1.6; font-weight: 700; }
        .values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
        .value-card { background: var(--pure-white); padding: 1.6rem 1.2rem; border-radius: 10px; border: 1px solid rgba(0,0,0,0.04); transition: all 0.4s var(--ease-out); box-shadow: 0 2px 10px rgba(0,0,0,0.02); text-align: center; cursor: default; position: relative; }
        .value-card::after { content: ''; position: absolute; bottom: 0; right: 0; width: 0; height: 2px; background: var(--matte-gold); transition: width 0.6s var(--ease-out); }
        .value-card:hover::after { width: 100%; }
        .value-card:hover { border-color: var(--matte-gold); transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.04); }
        .value-card .icon { font-size: 1.4rem; color: var(--matte-gold); opacity: 0.3; margin-bottom: 0.2rem; display: block; }
        .value-card h4 { font-size: 0.85rem; font-weight: 700; color: var(--charcoal); margin-bottom: 0.1rem; }
        .value-card p { font-size: 0.85rem; color: var(--charcoal); line-height: 1.5; font-weight: 700; }
        .leadership-grid { display: grid; grid-template-columns: 1fr 1.2fr 0.8fr; gap: 2.5rem; align-items: start; }
        .leadership-image { border-radius: 12px; overflow: hidden; border: 1px solid rgba(176,141,87,0.12); box-shadow: 0 8px 40px rgba(0,0,0,0.04); transition: filter 0.8s ease; }
        .leadership-image :global(img) { width: 100%; height: auto; aspect-ratio: 3/4; object-fit: cover; display: block; filter: grayscale(100%); transition: filter 1.5s ease; }
        .leadership-image.colorized :global(img) { filter: grayscale(0%); }
        .leadership-content h3 { font-size: 1.8rem; font-weight: 900; color: var(--charcoal); margin-bottom: 0.1rem; }
        .leadership-content .title { font-size: 1rem; font-weight: 500; color: var(--matte-gold); margin-bottom: 0.2rem; }
        .leadership-content .en-title { font-size: 0.7rem; font-weight: 300; color: rgba(34,34,34,0.4); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.8rem; }
        .leadership-content p { color: var(--charcoal); font-weight: 700; line-height: 1.8; font-size: 0.95rem; margin-bottom: 0.6rem; }
        .leadership-side { background: var(--light-gray); padding: 1.8rem 1.4rem; border-radius: 12px; border: 1px solid rgba(0,0,0,0.04); }
        .leadership-side .side-label { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: rgba(34,34,34,0.3); margin-bottom: 0.3rem; }
        .leadership-side .side-value { font-size: 1rem; font-weight: 700; color: var(--charcoal); margin-bottom: 1rem; }
        .leadership-side .side-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .leadership-side .side-tags span { background: var(--pure-white); padding: 0.2rem 0.8rem; border-radius: 20px; font-size: 0.7rem; font-weight: 300; color: rgba(34,34,34,0.6); border: 1px solid rgba(0,0,0,0.04); }
        .leadership-quote { margin-top: 1.5rem; padding: 1.5rem 2rem; border-right: 3px solid var(--matte-gold); background: rgba(176,141,87,0.03); border-radius: 8px; font-size: 1.1rem; font-weight: 700; color: var(--charcoal); line-height: 1.8; font-style: italic; }
        .process-footer { max-width: 800px; margin: 1.5rem auto 0; text-align: center; font-size: 0.95rem; color: var(--charcoal); font-weight: 700; line-height: 1.8; padding: 1.2rem 2rem; border-right: 2px solid var(--matte-gold); background: rgba(176,141,87,0.03); border-radius: 8px; }
        .qayd-grid { display: grid; grid-template-columns: 1.25fr .75fr; gap: 2rem; align-items: stretch; }
        .qayd-copy h2 { font-size: clamp(1.8rem, 3vw, 2.7rem); line-height: 1.35; margin: .45rem 0 1rem; }
        .qayd-copy p { color: var(--charcoal); font-weight: 700; line-height: 1.9; font-size: .95rem; max-width: 720px; }
        .qayd-points { display: flex; flex-wrap: wrap; gap: .6rem 1rem; margin-top: 1.1rem; }
        .qayd-points span { display: inline-flex; align-items: center; gap: .35rem; color: var(--charcoal); font-size: .76rem; font-weight: 800; }
        .qayd-points .icon-svg { color: var(--matte-gold); }
        .qayd-note { background: var(--very-dark-navy); color: #fff; border-radius: 14px; padding: 2rem 1.6rem; position: relative; overflow: hidden; }
        .qayd-note::after { content: ''; position: absolute; width: 180px; height: 180px; border-radius: 50%; border: 1px solid rgba(176,141,87,.25); left: -80px; bottom: -80px; }
        .qayd-mark { color: var(--matte-gold); font-size: 3.5rem; font-weight: 900; line-height: 1; opacity: .7; }
        .qayd-note h3 { color: #fff; font-size: 1.2rem; margin: .8rem 0 .5rem; }
        .qayd-note p { color: rgba(255,255,255,.68); line-height: 1.9; font-size: .83rem; font-weight: 600; }
        .qayd-note .text-link { display: inline-flex; align-items: center; gap: .45rem; color: var(--matte-gold); font-size: .78rem; font-weight: 900; margin-top: .8rem; }
        .trust-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
        .trust-card { background: var(--pure-white); padding: 1.6rem 1.2rem; border-radius: 10px; border: 1px solid rgba(0,0,0,0.04); transition: all 0.4s var(--ease-out); box-shadow: 0 2px 10px rgba(0,0,0,0.02); text-align: center; cursor: default; position: relative; }
        .trust-card::after { content: ''; position: absolute; bottom: 0; right: 0; width: 0; height: 2px; background: var(--matte-gold); transition: width 0.6s var(--ease-out); }
        .trust-card:hover::after { width: 100%; }
        .trust-card:hover { border-color: var(--matte-gold); transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.04); }
        .trust-card .icon { font-size: 1.4rem; color: var(--matte-gold); opacity: 0.2; margin-bottom: 0.3rem; display: block; }
        .trust-card h4 { font-size: 0.85rem; font-weight: 700; color: var(--charcoal); }
        .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .gallery-item { border-radius: 10px; overflow: hidden; aspect-ratio: 4/3; background: var(--light-gray); display: flex; align-items: center; justify-content: center; color: rgba(34,34,34,0.15); font-size: 0.8rem; border: 1px solid rgba(0,0,0,0.04); transition: all 0.4s var(--ease-out); cursor: default; }
        .gallery-item:hover { border-color: var(--matte-gold); transform: scale(1.01); box-shadow: 0 8px 30px rgba(0,0,0,0.04); }
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
        @media (max-width: 1024px) { .philosophy-grid { grid-template-columns: repeat(2, 1fr); } .values-grid { grid-template-columns: repeat(2, 1fr); } .trust-grid { grid-template-columns: repeat(2, 1fr); } .gallery-grid { grid-template-columns: repeat(2, 1fr); } .leadership-grid { grid-template-columns: 1fr 1fr; gap: 2rem; } .leadership-side { grid-column: span 2; } .about-definition .def-grid { gap: 2rem; } .hero-about .hero-grid { gap: 2rem; } }
        @media (max-width: 820px) { .hero-about .hero-grid { grid-template-columns: 1fr; gap: 2.5rem; } .hero-about .hero-title-wrap { text-align: center; } .hero-about .hero-title-wrap .sub { margin-left: auto; margin-right: auto; } .about-definition .def-grid { grid-template-columns: 1fr; gap: 2.5rem; } .about-definition .def-cards { grid-template-columns: 1fr 1fr; } .hero-about { padding: 100px 1rem 3rem; min-height: auto; } .philosophy-grid { grid-template-columns: 1fr 1fr; } .values-grid { grid-template-columns: 1fr 1fr; } .trust-grid { grid-template-columns: 1fr 1fr; } .qayd-grid { grid-template-columns: 1fr; } .leadership-grid { grid-template-columns: 1fr; gap: 1.5rem; } .leadership-side { grid-column: span 1; } .leadership-image :global(img) { max-width: 280px; margin: 0 auto; } }
        @media (max-width: 640px) { .philosophy-grid { grid-template-columns: 1fr; } .values-grid { grid-template-columns: 1fr; max-width: 320px; margin: 0 auto; } .trust-grid { grid-template-columns: 1fr; max-width: 320px; margin: 0 auto; } .gallery-grid { grid-template-columns: 1fr; max-width: 320px; margin: 0 auto; } .about-definition .def-cards { grid-template-columns: 1fr; max-width: 280px; margin: 0 auto; } .hero-about .hero-title-wrap h1 { font-size: clamp(2rem, 8vw, 2.8rem); } .cta-final .cta-actions { flex-direction: column; align-items: center; } .cta-final .cta-actions .btn-gold, .cta-final .cta-actions .btn-outline-white { width: 100%; max-width: 300px; text-align: center; } .leadership-quote { padding: 1rem 1.2rem; font-size: 1rem; } .founder-message { padding: 3rem 1rem; } .founder-message blockquote { font-size: 1rem; } }
      `}</style>
    </Layout>
  );
}
