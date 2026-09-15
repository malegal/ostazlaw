import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';
import Icon from '../components/Icon';

export default function Specialties() {
  const [activeSpecialty, setActiveSpecialty] = useState(null);

  const toggleSpecialty = (id) => {
    setActiveSpecialty(activeSpecialty === id ? null : id);
  };

  return (
    <Layout>
      <Head>
        {/* SEO/AEO: الصفحة بوابة تجميع للتخصصات؛ الصفحات المستقلة مستقبلًا يجب أن ترث نفس الاسم والوصف والروابط الداخلية. */}
        <title>تخصصات قانونية في أسوان | عقارات وعقود ومنازعات – جاد الرب</title>
        <meta name="description" content="تخصصات مكتب جاد الرب للمحاماة في أسوان: المنازعات المدنية والعقارية، العقود والملكية والتسجيل، خدمات الشركات والمستثمرين، والمنازعات الإدارية والعمالية والطعون." />
        <link rel="canonical" href="https://ostazlaw.vercel.app/specialties" />
        <meta property="og:title" content="تخصصات قانونية في أسوان | عقارات وعقود ومنازعات – جاد الرب" />
        <meta property="og:description" content="تعرف على تخصصات جاد الرب في المنازعات المدنية والعقارية، العقود، الملكية والتسجيل، خدمات الشركات والمستثمرين والطعون." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ostazlaw.vercel.app/specialties" />
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
                "description": "مكتب محاماة مصري يقدم خدمات المحاماة والاستشارات القانونية للأفراد والشركات والمستثمرين.",
                "url": "https://ostazlaw.vercel.app/",
                "email": "ma.law.firm@outlook.com",
                "telephone": "+201101076000",
                "foundingDate": "2005",
                "areaServed": [{ "@type": "City", "name": "أسوان" }, { "@type": "Country", "name": "مصر" }],
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
                "@type": "CollectionPage",
                "@id": "https://ostazlaw.vercel.app/specialties#webpage",
                "url": "https://ostazlaw.vercel.app/specialties",
                "name": "التخصصات القانونية",
                "description": "قائمة شاملة بتخصصات جاد الرب للمحاماة والاستشارات القانونية",
                "isPartOf": { "@id": "https://ostazlaw.vercel.app/#website" },
                "about": { "@id": "https://ostazlaw.vercel.app/#organization" }
              },
              {
                "@type": "WebSite",
                "@id": "https://ostazlaw.vercel.app/#website",
                "name": "جاد الرب للمحاماة والاستشارات القانونية",
                "url": "https://ostazlaw.vercel.app/",
                "description": "مكتب محاماة مصري يقدم خدمات المحاماة والاستشارات القانونية للأفراد والشركات والمستثمرين."
              }
            ]
          })
        }} />
      </Head>

      <section className="hero-specialties" aria-label="التخصصات القانونية">
        <div className="hero-pattern"></div>
        <div className="hero-glow"></div>
        <div className="hero-glow-2"></div>
        <div className="hero-inner">
          <div className="hero-title-wrap reveal">
            <span className="en-tag">مجالات العمل القانوني</span>
            <h1>تخصصات قانونية <span className="gold-text">تبدأ من فهم المسألة</span></h1>
            <p className="sub">نساعد الأفراد والشركات والمستثمرين على فهم مواقفهم القانونية في العقود والعقارات والمنازعات والاستثمارات. اختر المجال الأقرب إلى مسألتك، أو أرسل لنا ملخصًا عنها إذا لم تكن متأكدًا من التصنيف المناسب.</p>
          </div>
          <div className="hero-badges">
            <span className="hero-badge">المنازعات المدنية</span>
            <span className="hero-badge">المنازعات التجارية</span>
            <span className="hero-badge">قضايا الأسرة</span>
            <span className="hero-badge">الدفاع الجنائي</span>
            <span className="hero-badge">المنازعات الإدارية</span>
            <span className="hero-badge">الطعن الدستوري</span>
            <span className="hero-badge">الطعن بالنقض</span>
            <span className="hero-badge">الطعون الإدارية العليا</span>
            <span className="hero-badge">المنازعات العمالية</span>
          </div>
          <div className="hero-cta">
            <Link href="/contact?tab=consult#service-form" className="btn-gold">ابدأ بطلب استشارة <Icon name="arrow-left" style={{ marginRight: '8px' }} /></Link>
          </div>
        </div>
      </section>

      <section className="section section-gray" aria-label="التخصصات">
        <div className="section-inner">
          <div className="section-head reveal">
            <span className="eyebrow">● تخصصاتنا</span>
            <h2>مجالات الممارسة والخبرة القانونية</h2>
            <p>استعرض الخدمات المرتبطة بكل تخصص، وإذا لم تكن متأكدًا من المجال المناسب، ابدأ باستشارة أولية واشرح لنا ما حدث كما هو.</p>
          </div>

          {/* بيانات التخصصات مركزية هنا حتى تبقى البطاقة، وصفها، خدماتها، وروابط الاستشارة متزامنة. */}
          {[
            { id: 'civil', icon: 'gavel', title: 'المنازعات المدنية والعقارية', desc: 'العقود والملكية والتعويضات والإيجارات والمطالبات المالية', details: 'نساعد الأفراد والشركات في المنازعات المدنية والعقارية بعد دراسة الوقائع والمستندات، وتحديد المركز القانوني والمسار المناسب لكل حالة.', services: ['دعاوى التعويض بجميع أنواعها', 'نزاعات الملكية العقارية والأراضي', 'دعاوى صحة ونفاذ العقود', 'دعاوى الطرد والإيجارات', 'المطالبات المالية والمديونيات'], why: 'نبدأ بفهم الوقائع والأدلة، ثم نوضح الخيارات والإجراءات والمخاطر قبل تحديد الخطوة القانونية المناسبة.' },
            { id: 'commercial', icon: 'balance-scale', title: 'الخدمات القانونية للشركات والمنازعات التجارية', desc: 'العقود التجارية والشراكات والمطالبات والنزاعات', details: 'نساعد الشركات والمنشآت على مراجعة علاقاتها وعقودها، وفهم الالتزامات والمخاطر، والتعامل مع النزاعات التجارية بحسب طبيعة المسألة.', services: ['تأسيس الشركات بجميع أنواعها', 'قضايا الإفلاس والإعسار', 'منازعات الأوراق التجارية', 'قضايا العلامات التجارية', 'التمثيل القانوني للشركات'], why: 'نربط بين فهم النشاط التجاري وقراءة الالتزامات القانونية قبل التوقيع أو عند ظهور النزاع.' },
            { id: 'family', icon: 'users', title: 'قضايا الأسرة والأحوال الشخصية', desc: 'إجراءات وحقوق أسرية مع احترام الخصوصية', details: 'نتعامل مع مسائل الأحوال الشخصية بحساسية واحترام للخصوصية، ونوضح الإجراءات والحقوق والخيارات القانونية وفق وقائع كل حالة.', services: ['دعاوى الطلاق والخلع والفسخ', 'قضايا النفقة بأنواعها', 'دعاوى الرؤية والحضانة', 'إعلام الوراثة وتقسيم التركات', 'تصحيح أسماء ووثائق الزواج'], why: 'نشرح المسألة القانونية والإجراءات المرتبطة بها بوضوح، مع مراعاة خصوصية كل حالة.' },
            { id: 'criminal', icon: 'shield-alt', title: 'الدفاع الجنائي', desc: 'دراسة الاتهام والأدلة والإجراءات وسبل الدفاع', details: 'ندرس ملف الاتهام والأدلة والإجراءات، ونوضح الموقف القانوني وسبل الدفاع المتاحة وفق طبيعة القضية ومرحلتها.', services: ['الدفاع في قضايا الجنايات الكبرى', 'الدفاع في الجنح والمخالفات', 'إعداد مذكرات الطعن بالنقض الجنائي', 'قضايا الأموال العامة والرشوة', 'حضور التحقيقات أمام النيابة العامة'], why: 'نعتمد على دراسة ملف القضية وتقييم الأدلة والإجراءات قبل تحديد نطاق العمل والدفاع المناسب.' },
            { id: 'admin', icon: 'building', title: 'المنازعات الإدارية', desc: 'حماية الحقوق في مواجهة القرارات والإجراءات الإدارية', details: 'ندرس القرارات والإجراءات الإدارية، ونوضح مدى مشروعيتها وطرق التظلم والطعن والتعويض بحسب طبيعة المسألة والجهة المختصة.', services: ['الطعن بإلغاء القرارات الإدارية', 'دعاوى التعويض ضد الجهات الحكومية', 'قضايا الموظفين العموميين', 'منازعات العقود الإدارية', 'تنفيذ الأحكام الصادرة ضد الدولة'], why: 'نراجع القرار والمستندات والمواعيد والإجراءات قبل تحديد الطريق القانوني الأنسب.' },
            { id: 'contracts', icon: 'file-contract', title: 'صياغة ومراجعة العقود', desc: 'فهم الالتزامات والمخاطر قبل التوقيع', details: 'نراجع العقد ونوضح الالتزامات والمخاطر والنقاط التي تحتاج إلى تعديل قبل التوقيع، أو نصوغ الاتفاق بما يناسب طبيعة العلاقة والهدف منها.', services: ['صياغة عقود البيع والشراء', 'صياغة عقود الشراكة والاستثمار', 'مراجعة العقود وتعديلها', 'صياغة مذكرات التفاهم واتفاقيات عدم الإفصاح', 'التفاوض نيابة عنك قبل التوقيع'], why: 'نركز على وضوح الالتزامات وآليات التنفيذ والجزاءات والإنهاء وتسوية النزاع، وفق طبيعة كل عقد.' },
            { id: 'labor', icon: 'briefcase', title: 'المنازعات العمالية', desc: 'نحمي حقوقك في العمل', details: 'العلاقة بين العامل وصاحب العمل قد تشهد توترات ونزاعات. نحن هنا لضمان حقوقك العمالية الكاملة.', services: ['دعاوى الفصل التعسفي', 'المطالبة بالمستحقات العمالية', 'صياغة لوائح العمل الداخلية', 'التحقيق الإداري مع الموظفين', 'إصابات العمل والتأمين الاجتماعي'], why: 'نفهم قانون العمل المصري جيداً، ونمتلك خبرة في قضايا العمال والموظفين، مما يضمن لك دفاعاً قوياً وعادلاً.' },
            { id: 'arbitration', icon: 'hand-holding-usd', title: 'التحكيم والوساطة', desc: 'حلول سريعة وودية', details: 'ليس كل نزاع يحتاج إلى معركة قضائية طويلة. نقدم لك بدائل فعالة لحل النزاعات بسرعة وسرية، من خلال التحكيم والوساطة.', services: ['صياغة شرط التحكيم في العقود', 'التمثيل في هيئات التحكيم', 'تنفيذ أحكام المحكمين', 'الوساطة الودية لتسوية النزاعات', 'دعاوى بطلان حكم التحكيم'], why: 'خبرة واسعة في إجراءات التحكيم المحلي والدولي، نضمن لك سير العملية بسلاسة ووصولاً إلى حل عادل وسريع.' },
            { id: 'appeals', icon: 'university', title: 'الطعون ودرجات التقاضي العليا', desc: 'خبرة في النقض والطعون الإدارية والمسائل الدستورية', details: 'تتطلب الطعون أمام محكمة النقض والمحكمة الإدارية العليا، وكذلك المسائل الدستورية، قراءة دقيقة للحكم وأسبابه والنصوص والإجراءات والمواعيد. ندرس المسألة قبل تحديد مدى ملاءمة الطعن وأسبابه وشروطه.', services: ['إعداد ومراجعة الطعون بالنقض المدنية والجنائية', 'تمثيل العملاء أمام محكمة النقض', 'إعداد الطعون أمام المحكمة الإدارية العليا', 'التمثيل والمتابعة أمام الإدارية العليا', 'إقامة الدعاوى والمسائل الدستورية', 'منازعات التنفيذ أمام المحكمة الدستورية', 'تفسير النصوص وفحص مدى دستوريتها'], why: 'يجمع هذا المجال بين الفهم الدقيق لأحكام النقض والقضاء الإداري والمبادئ الدستورية، مع عناية خاصة بالشروط الشكلية والموضوعية لكل طريق من طرق الطعن.' }
          ].map(spec => {
            const isActive = activeSpecialty === spec.id;
            return (
              <div key={spec.id} className={`specialty-card-wrap gold-underline-card ${isActive ? 'active' : ''}`}>
                {/* رأس البطاقة قابل للوصول بلوحة المفاتيح؛ لا تستبدله بـ div قابل للنقر دون aria-expanded وaria-controls. */}
                <div className="specialty-card-header" role="button" tabIndex="0" aria-expanded={isActive} aria-controls={`${spec.id}-details`} onClick={() => toggleSpecialty(spec.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleSpecialty(spec.id); } }}>
                  <div className="icon-wrap"><Icon name={spec.icon} /></div>
                  <div className="info">
                    <h3>{spec.title}</h3>
                    <p>{spec.desc}</p>
                  </div>
                  <span className="toggle-label">{isActive ? 'إخفاء التفاصيل' : 'استعرض الخدمات'}</span><span className="toggle-icon"><Icon name="chevron-down" /></span>
                </div>
                <div id={`${spec.id}-details`} className="specialty-details" aria-hidden={!isActive}>
                  <p className="desc">{spec.details}</p>
                  <div className="detail-grid">
                    <div className="detail-col">
                      <h5><Icon name="list-ul" style={{ marginLeft: '6px' }} /> الخدمات التي نقدمها</h5>
                      <ul>
                        {spec.services.map((s, idx) => <li key={idx}><Icon name="check-circle" /> {s}</li>)}
                      </ul>
                    </div>
                    <div className="detail-col">
                      <h5><Icon name="star" style={{ marginLeft: '6px' }} /> لماذا تختارنا؟</h5>
                      <p>{spec.why}</p>
                      <h5 style={{ marginTop: '0.8rem' }}><Icon name="clock" style={{ marginLeft: '6px' }} /> خطوات العمل</h5>
                      <ul>
                        <li><Icon name="check-circle" /> فهم قضيتك واحتياجاتك</li>
                        <li><Icon name="check-circle" /> جمع الوثائق والمستندات</li>
                        <li><Icon name="check-circle" /> صياغة الدعوى أو الاتفاق</li>
                        <li><Icon name="check-circle" /> التمثيل أمام المحكمة</li>
                      </ul>
                    </div>
                  </div>
                  <div className="detail-cta">
                    <Link href={`/contact?audience=${spec.id === 'commercial' || spec.id === 'contracts' || spec.id === 'labor' || spec.id === 'arbitration' ? 'business' : 'individual'}&tab=consult&specialty=${encodeURIComponent(spec.title)}#service-form`} className="btn-gold">اعرض مسألتك</Link>
                    <Link href={`/contact?audience=${spec.id === 'commercial' || spec.id === 'contracts' || spec.id === 'labor' || spec.id === 'arbitration' ? 'business' : 'individual'}&tab=visit&specialty=${encodeURIComponent(spec.title)}#service-form`} className="btn-outline-gold">طلب مقابلة في المكتب</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="cta-section" aria-label="طلب استشارة">
        <div className="section-inner reveal">
          <span className="eyebrow" style={{ display: 'block', fontSize: '0.65rem', fontWeight: '800', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--matte-gold)', opacity: '0.5', marginBottom: '0.3rem' }}>● تواصل معنا</span>
          <h2>لست متأكدًا من التخصص المناسب؟</h2>
          <p>أرسل ملخصًا لما حدث، وسنبدأ بفهم المسألة وتحديد المجال القانوني الأقرب والخطوة التالية المناسبة، دون التزام.</p>
          <Link href="/contact?tab=consult#service-form" className="btn-gold">ابدأ استشارتك المجانية <Icon name="arrow-left" style={{ marginRight: '8px' }} /></Link>
        </div>
      </section>

      {/* تم نقل الأسئلة الشائعة إلى /faq لتكون صفحة مستقلة دون تكرار المحتوى داخل التخصصات. */}

      <style jsx>{`
        .hero-specialties { padding: 120px 2rem 4rem; background: var(--very-dark-navy); position: relative; overflow: hidden; min-height: 70vh; display: flex; align-items: center; }
        .hero-specialties::before { content: ''; position: absolute; inset: 0; z-index: 0; background-image: linear-gradient(90deg, rgba(8,20,38,.78) 0%, rgba(8,20,38,.72) 48%, rgba(8,20,38,.48) 100%), url('/specialties-hero.webp'); background-size: cover; background-position: center; opacity: .9; }
        .hero-specialties .hero-pattern { position: absolute; inset: 0; opacity: 0.03; background-image: radial-gradient(circle at 20% 30%, var(--matte-gold) 1px, transparent 1px), radial-gradient(circle at 80% 70%, var(--matte-gold) 1px, transparent 1px); background-size: 60px 60px; pointer-events: none; }
        .hero-specialties .hero-glow { position: absolute; width: 60vw; height: 60vw; border-radius: 50%; background: radial-gradient(circle, rgba(176,141,87,0.04) 0%, transparent 70%); top: -20%; right: -20%; pointer-events: none; animation: orbFloat 20s ease-in-out infinite alternate; }
        .hero-specialties .hero-glow-2 { position: absolute; width: 40vw; height: 40vw; border-radius: 50%; background: radial-gradient(circle, rgba(176,141,87,0.02) 0%, transparent 70%); bottom: -20%; left: -10%; pointer-events: none; animation: orbFloat 25s ease-in-out infinite alternate-reverse; }
        @keyframes orbFloat { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(40px, -30px) scale(1.05); } }
        .hero-specialties .hero-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; width: 100%; }
        .hero-specialties .hero-title-wrap { text-align: center; }
        .hero-specialties .hero-title-wrap .en-tag { font-size: 0.65rem; font-weight: 800; letter-spacing: 0.4em; text-transform: uppercase; color: var(--matte-gold); opacity: 0.5; display: block; margin-bottom: 0.3rem; }
        .hero-specialties .hero-title-wrap h1 { font-size: clamp(2.4rem, 5vw, 4rem); font-weight: 900; color: #fff; line-height: 1.1; }
        .hero-specialties .hero-title-wrap h1 .gold-text { color: var(--matte-gold); }
        .hero-specialties .hero-title-wrap .sub { font-size: clamp(1rem, 1.3vw, 1.2rem); font-weight: 400; color: rgba(255,255,255,0.5); max-width: 700px; margin: 0.8rem auto 0; line-height: 1.7; }
        .hero-specialties .hero-badges { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; margin-top: 1.8rem; }
        .hero-specialties .hero-badge { border: 1px solid rgba(176,141,87,0.28); background: rgba(176,141,87,0.06); padding: 0.4rem 0.85rem; border-radius: 50px; font-size: 0.78rem; font-weight: 700; color: rgba(255,255,255,0.78); letter-spacing: 0; transition: all 0.4s var(--ease-out); cursor: default; }
        .hero-specialties .hero-badge:hover { border-color: rgba(176,141,87,0.2); color: var(--matte-gold); }
        .hero-specialties .hero-cta { text-align: center; margin-top: 2rem; }
        .specialty-card-wrap { margin-bottom: 1.2rem; border-radius: 12px; border: 1px solid rgba(0,0,0,0.04); background: var(--pure-white); box-shadow: 0 2px 10px rgba(0,0,0,0.02); overflow: hidden; transition: all 0.4s var(--ease-out); cursor: pointer; }
        .specialty-card-wrap:hover { border-color: var(--matte-gold); box-shadow: 0 8px 30px rgba(0,0,0,0.04); }
        .specialty-card-wrap.active { border-color: var(--matte-gold); box-shadow: 0 8px 30px rgba(176,141,87,0.04); }
        .specialty-card-header { display: flex; align-items: center; gap: 1.2rem; padding: 1.2rem 1.6rem; transition: background 0.3s ease; background: var(--pure-white); position: relative; outline: none; }
        .specialty-card-header:focus-visible { box-shadow: inset 0 0 0 3px rgba(176,141,87,0.55); }
        .specialty-card-header::after { content: ''; position: absolute; bottom: 0; right: 0; width: 0; height: 2px; background: var(--matte-gold); transition: width 0.6s var(--ease-out); }
        .specialty-card-wrap:hover .specialty-card-header::after, .specialty-card-wrap.active .specialty-card-header::after { width: 100%; }
        .specialty-card-wrap.active .specialty-card-header { background: rgba(176,141,87,0.02); }
        .specialty-card-header .icon-wrap { width: 48px; height: 48px; border-radius: 50%; background: rgba(176,141,87,0.05); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.4s var(--ease-out); }
        .specialty-card-wrap.active .specialty-card-header .icon-wrap { background: var(--matte-gold); }
        .specialty-card-wrap.active .specialty-card-header .icon-wrap .icon-svg { color: #000; }
        .specialty-card-header .icon-wrap .icon-svg { font-size: 1.2rem; color: var(--matte-gold); transition: all 0.4s ease; }
        .specialty-card-header .info { flex: 1; }
        .specialty-card-header .info h3 { font-size: 1.05rem; font-weight: 700; color: var(--charcoal); margin-bottom: 0.1rem; }
        .specialty-card-header .info p { font-size: 0.8rem; color: var(--charcoal); font-weight: 700; margin: 0; }
        .specialty-card-header .toggle-label { font-size: 0.72rem; color: var(--matte-gold); opacity: 0.75; white-space: nowrap; }
        .specialty-card-header .toggle-icon { font-size: 0.8rem; color: var(--matte-gold); opacity: 0.5; transition: transform 0.4s var(--ease-out); flex-shrink: 0; }
        .specialty-card-wrap.active .specialty-card-header .toggle-icon { transform: rotate(180deg); opacity: 0.8; }
        .specialty-details { display: none; padding: 0 1.6rem; }
        .specialty-card-wrap.active .specialty-details { display: block; padding: 0 1.6rem 1.8rem; animation: specialtyReveal .35s ease-out both; }
        @keyframes specialtyReveal { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        .specialty-details .desc { color: var(--charcoal); font-weight: 700; font-size: 0.95rem; line-height: 1.9; margin-bottom: 1.2rem; }
        .specialty-details .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
        .specialty-details .detail-col { background: var(--light-gray); padding: 1.2rem 1.2rem; border-radius: 10px; }
        .specialty-details .detail-col h5 { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: var(--matte-gold); margin-bottom: 0.4rem; }
        .specialty-details .detail-col ul { list-style: none; padding: 0; margin: 0; }
        .specialty-details .detail-col ul li { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: var(--charcoal); font-weight: 700; padding: 0.15rem 0; line-height: 1.5; }
        .specialty-details .detail-col ul li .icon-svg { color: var(--matte-gold); font-size: 0.6rem; opacity: 0.4; }
        .specialty-details .detail-col p { font-size: 0.8rem; color: var(--charcoal); font-weight: 700; line-height: 1.7; }
        .specialty-details .detail-cta { margin-top: 1.2rem; display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; }
        .specialty-details .detail-cta .btn-outline-gold { padding: 8px 24px; font-size: 0.75rem; }
        .specialty-details .detail-cta .btn-gold { padding: 8px 28px; font-size: 0.75rem; }
        .cta-section { text-align: center; padding: 4rem 2rem; background: var(--warm-off-white); border-top: 1px solid rgba(176,141,87,0.06); border-bottom: 1px solid rgba(176,141,87,0.06); }
        .cta-section h2 { font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 900; color: var(--charcoal); }
        .cta-section p { max-width: 640px; margin: 0.4rem auto 1.8rem; color: var(--charcoal); font-weight: 700; font-size: 0.95rem; line-height: 1.8; }
        @media (max-width: 820px) { .hero-specialties { padding: 100px 1rem 3rem; min-height: auto; } .specialty-details .detail-grid { grid-template-columns: 1fr; } .specialty-card-header { padding: 1rem 1.2rem; gap: 0.8rem; } .specialty-card-wrap.active .specialty-details { padding: 0 1.2rem 1.2rem; } .specialty-details .detail-cta { flex-direction: column; align-items: stretch; } }
        @media (max-width: 640px) { .hero-specialties .hero-title-wrap h1 { font-size: clamp(2rem, 8vw, 2.8rem); } .hero-specialties .hero-badges { gap: 0.35rem; } .hero-specialties .hero-badge { font-size: 0.7rem; padding: 0.35rem 0.7rem; } .specialty-card-header .info h3 { font-size: 0.9rem; } .specialty-card-header .info p { font-size: 0.7rem; } .specialty-card-header .icon-wrap { width: 40px; height: 40px; } .specialty-card-header .icon-wrap .icon-svg { font-size: 1rem; } .specialty-card-header .toggle-label { font-size: 0.62rem; } .cta-section { padding: 2.5rem 1rem; } }
        @media (max-width: 400px) { .hero-specialties .hero-badges { gap: 0.25rem; } .hero-specialties .hero-badge { font-size: 0.68rem; padding: 0.3rem 0.6rem; } }
      `}</style>
    </Layout>
  );
}
