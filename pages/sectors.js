import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import Icon from '../components/Icon';

const paths = [
  {
    id: 'business',
    image: '/sector-business.webp',
    alt: 'مكتب مؤسسي وملفات عقود بإطلالة على النيل في أسوان',
    icon: 'building',
    label: 'شركة أو مؤسسة',
    title: 'قرارات قانونية أوضح لشركتك',
    description: 'نساعد الشركات والمؤسسات على فهم التزاماتها، وتنظيم علاقاتها، واتخاذ قرارات قانونية أكثر وضوحًا قبل أن تتحول المخاطر إلى نزاعات.',
    topics: [
      ['تأسيس وتعديل الشركات', 'تأسيس الشركات'],
      ['العقود التجارية', 'مراجعة العقود للشركات'],
      ['الحوكمة والامتثال', 'حوكمة الشركات'],
      ['الشركاء والمساهمون', 'اتفاقيات الشركاء'],
      ['النزاعات التجارية', 'نزاع تجاري'],
      ['استشارات مستمرة', 'استشارات الشركات'],
    ],
  },
  {
    id: 'investor',
    image: '/sector-investors.webp',
    alt: 'اجتماع تخطيط استثماري ومخطط مشروع على طاولة عمل',
    icon: 'chart-line',
    label: 'رجل أعمال أو مستثمر',
    title: 'قبل أن تضع رأس مالك، افهم مركزك القانوني',
    description: 'نساعد المستثمرين ورجال الأعمال على قراءة الاتفاقات، وفهم المخاطر، وبناء الشراكات والاستثمارات على أساس قانوني أوضح.',
    topics: [
      ['استثمار أو مشروع', 'استثمار أو مشروع'],
      ['عقود الشراكة', 'عقد شراكة'],
      ['المشروعات المشتركة', 'مشروع مشترك'],
      ['مراجعة الاتفاقات', 'مراجعة اتفاقية'],
      ['الفحص القانوني', 'فحص قانوني قبل الاستثمار'],
      ['نزاع تجاري أو استثماري', 'نزاع استثماري'],
    ],
  },
  {
    id: 'individual',
    image: '/sector-individuals.webp',
    alt: 'مكتب هادئ يحتوي على ملف قانوني ومفتاح عقار ومستندات',
    icon: 'user',
    label: 'فرد',
    title: 'مسائل شخصية تحتاج إلى فهم قانوني واضح',
    description: 'نبدأ مع الأفراد من فهم الوقائع والحقوق، سواء تعلقت المسألة بعقار أو عقد أو مطالبة أو مسألة من مسائل الأحوال الشخصية.',
    topics: [
      ['العقارات والملكية', 'العقارات والملكية'],
      ['العقود والاتفاقات', 'عقد أو اتفاق'],
      ['الإيجارات والبيع والشراء', 'إيجار أو بيع وشراء'],
      ['المطالبات والتعويضات', 'مطالبة أو تعويض'],
      ['الميراث والتركات', 'ميراث أو تركة'],
      ['الأحوال الشخصية', 'مسائل الأحوال الشخصية'],
      ['المنازعات المدنية', 'نزاع مدني'],
    ],
  },
];

function contactHref(audience, specialty) {
  return `/contact?audience=${audience}&specialty=${encodeURIComponent(specialty)}#service-form`;
}

export default function Sectors() {
  return (
    <Layout>
      <Head>
        <title>قطاعات ومسائل نخدمها | مكتب جاد الرب للمحاماة في أسوان</title>
        <meta name="description" content="مكتب جاد الرب للمحاماة والاستشارات القانونية في أسوان يقدم خدماته للشركات والمؤسسات، والمستثمرين ورجال الأعمال، والأفراد، بما في ذلك العقارات والعقود والأحوال الشخصية في مختلف محافظات مصر." />
        <link rel="canonical" href="https://ostazlaw.vercel.app/sectors" />
        <meta property="og:title" content="قطاعات ومسائل نخدمها | مكتب جاد الرب للمحاماة في أسوان" />
        <meta property="og:description" content="تعرف على المسار القانوني الأقرب إلى احتياجك: شركة أو مؤسسة، رجل أعمال أو مستثمر، أو فرد." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ostazlaw.vercel.app/sectors" />
        <meta property="og:image" content="https://ostazlaw.vercel.app/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'LegalService',
              '@id': 'https://ostazlaw.vercel.app/#organization',
              name: 'مكتب جاد الرب للمحاماة والاستشارات القانونية',
              alternateName: 'JAD ELRAB',
              description: 'مكتب محاماة مقره أسوان ويقدم خدماته للأفراد والشركات والمستثمرين في مختلف محافظات مصر.',
              url: 'https://ostazlaw.vercel.app/',
              email: 'ma.law.firm@outlook.com',
              telephone: '+201101076000',
              foundingDate: '2005',
              areaServed: { '@type': 'Country', name: 'مصر' },
              address: { '@type': 'PostalAddress', addressLocality: 'أسوان', addressCountry: 'مصر' },
              sameAs: ['https://www.facebook.com/malegal', 'https://x.com/mahmoud_a_hamyd', 'https://www.linkedin.com/in/mahmoud-abdel-hamid-0a4664374'],
            },
            {
              '@type': 'CollectionPage',
              '@id': 'https://ostazlaw.vercel.app/sectors#webpage',
              url: 'https://ostazlaw.vercel.app/sectors',
              name: 'قطاعات ومسائل نخدمها',
              description: 'المسارات القانونية التي يقدمها مكتب جاد الرب للشركات والمستثمرين والأفراد.',
              isPartOf: { '@id': 'https://ostazlaw.vercel.app/#website' },
              about: { '@id': 'https://ostazlaw.vercel.app/#organization' },
            },
            {
              '@type': 'FAQPage',
              mainEntity: [
                { '@type': 'Question', name: 'هل يقدم مكتب جاد الرب خدمات قانونية في مسائل الأحوال الشخصية؟', acceptedAnswer: { '@type': 'Answer', text: 'نعم، يدرس المكتب مسائل الأحوال الشخصية والحقوق الأسرية والإجراءات المرتبطة بها وفق طبيعة كل حالة ووقائعها ومستنداتها.' } },
                { '@type': 'Question', name: 'هل تقتصر خدمات مكتب جاد الرب على أسوان؟', acceptedAnswer: { '@type': 'Answer', text: 'مقر المكتب في أسوان، وتمتد خدماته إلى العملاء في مختلف محافظات مصر بحسب طبيعة المسألة والجهة المختصة.' } },
                { '@type': 'Question', name: 'هل يمكن طلب استشارة قبل بدء النزاع؟', acceptedAnswer: { '@type': 'Answer', text: 'نعم، يبدأ المكتب بفهم المسألة وتقدير المخاطر وتحديد الخطوة القانونية المناسبة قبل أن يتحول الخلاف إلى نزاع متكامل متى كان ذلك ممكنًا.' } },
              ],
            },
          ],
        }) }} />
      </Head>

      <section className="sectors-hero">
        <div className="hero-pattern" />
        <div className="hero-glow" />
        <div className="hero-inner">
          <div className="hero-title-wrap reveal">
            <span className="en-tag">LEGAL PATHS</span>
            <h1>أينما تبدأ مسألتك، <span className="gold-text">نبدأ بفهمها</span></h1>
            <p className="sub">يقدم مكتب جاد الرب للمحاماة والاستشارات القانونية خدماته من مقره في أسوان إلى مختلف محافظات مصر، عبر مسار واضح للشركات والمؤسسات، والمستثمرين ورجال الأعمال، والأفراد.</p>
          </div>
          <div className="hero-cta reveal"><Link href="/contact#service-form" className="btn-gold">اختر المسار الأقرب إليك <Icon name="arrow-left" style={{ marginRight: '8px' }} /></Link></div>
        </div>
      </section>

      <section className="section section-light sectors-intro">
        <div className="section-inner">
          <div className="intro-layout reveal">
            <div><span className="eyebrow">● كيف نبدأ</span><h2>لا تحتاج إلى معرفة المصطلح القانوني المناسب</h2></div>
            <p>يكفي أن تشرح ما حدث وما تريد الوصول إليه. نساعدك على تحديد المسار القانوني الأقرب، ثم نوجهك إلى نموذج تواصل مهيأ للفئة والموضوع الذي اخترته.</p>
          </div>
        </div>
      </section>

      <section className="section section-gray" aria-label="المسارات القانونية">
        <div className="section-inner">
          <div className="section-head reveal"><span className="eyebrow">● اختر مسارك</span><h2>ثلاثة مسارات، وكل مسألة لها بداية</h2><p>اختر الفئة الأقرب إلى وضعك، أو ابدأ مباشرة من الموضوع الذي تريد مناقشته.</p></div>
          <div className="path-grid">
            {paths.map((path, index) => (
              <article className={`path-card reveal reveal-d${(index % 3) + 1}`} key={path.id}>
                <div className="path-image-wrap"><img src={path.image} alt={path.alt} loading="lazy" /><div className="path-image-overlay" /></div>
                <div className="path-card-body">
                  <div className="path-icon"><Icon name={path.icon} /></div>
                  <span className="path-label">{path.label}</span>
                  <h3>{path.title}</h3>
                  <p>{path.description}</p>
                  <ul className="topic-links">
                    {path.topics.map(([label, specialty]) => <li key={specialty}><Link href={contactHref(path.id, specialty)}><Icon name="check-circle" /> <span>{label}</span></Link></li>)}
                  </ul>
                  <Link href={contactHref(path.id, path.label)} className="path-cta">اعرض مسألتك <Icon name="arrow-left" /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="section-inner">
          <div className="section-head reveal"><span className="eyebrow">● منهج العمل</span><h2>نفهم، ثم نوضح الخطوة التالية</h2><p>منهج يبدأ قبل النزاع، ويتغير بحسب طبيعة المسألة ونطاق العمل المتفق عليه.</p></div>
          <div className="approach-timeline">
            {[['01', 'نفهم', 'ندرس الوقائع والهدف وما تريد الوصول إليه.'], ['02', 'نحلل', 'نراجع المراكز القانونية والمخاطر والمستندات.'], ['03', 'نوضح', 'نشرح الخيارات والآثار والخطوة المناسبة.'], ['04', 'نحدد', 'ننتقل إلى الاستشارة أو المقابلة أو المتابعة بحسب الحاجة.'], ['05', 'نتابع', 'نبقى على تواصل واضح بشأن الإجراء المتفق عليه.']].map(([num, title, text], index) => <div className={`approach-step reveal reveal-d${(index % 3) + 1}`} key={num}><span className="num">{num}</span><h4>{title}</h4><p>{text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section section-gray faq-section" aria-label="أسئلة شائعة عن القطاعات والخدمات">
        <div className="section-inner">
          <div className="section-head reveal"><span className="eyebrow">● أسئلة شائعة</span><h2>إجابات قبل أن تبدأ</h2></div>
          <div className="faq-grid">
            <div className="faq-card reveal"><h3>هل يقدم المكتب خدمات في الأحوال الشخصية؟</h3><p>نعم، يدرس المكتب مسائل الأحوال الشخصية والحقوق الأسرية والإجراءات المرتبطة بها وفق طبيعة كل حالة.</p></div>
            <div className="faq-card reveal reveal-d1"><h3>هل تقتصر الخدمات على أسوان؟</h3><p>مقر المكتب في أسوان، وتمتد خدماته إلى مختلف محافظات مصر بحسب طبيعة المسألة والجهة المختصة.</p></div>
            <div className="faq-card reveal reveal-d2"><h3>هل يمكن طلب استشارة قبل النزاع؟</h3><p>نعم، يبدأ العمل بفهم المخاطر وتحديد الخطوة المناسبة قبل تحول الخلاف إلى نزاع متكامل متى كان ذلك ممكنًا.</p></div>
          </div>
        </div>
      </section>

      <section className="cta-final"><div className="section-inner reveal"><span className="eyebrow">● الخطوة الأولى</span><h2>اعرض مسألتك لنبدأ من فهمها</h2><p>اختر الفئة الأقرب، أو أرسل ملخصًا لما تحتاج إلى مناقشته. المقر في أسوان والخدمات متاحة للعملاء في مختلف محافظات مصر.</p><div className="cta-actions"><Link href="/contact#service-form" className="btn-gold">ابدأ طلبك</Link><Link href="/about" className="btn-outline-white">تعرف على المكتب</Link></div></div></section>

      <style jsx>{`
        .sectors-hero { padding: 140px 2rem 5rem; background: var(--very-dark-navy); position: relative; overflow: hidden; min-height: 62vh; display: flex; align-items: center; }
        .sectors-hero .hero-pattern { position: absolute; inset: 0; opacity: .03; background-image: radial-gradient(circle at 20% 30%, var(--matte-gold) 1px, transparent 1px), radial-gradient(circle at 80% 70%, var(--matte-gold) 1px, transparent 1px); background-size: 60px 60px; }
        .sectors-hero .hero-glow { position: absolute; width: 70vw; height: 70vw; border-radius: 50%; background: radial-gradient(circle, rgba(176,141,87,.08) 0%, transparent 68%); top: -35%; right: -28%; }
        .sectors-hero .hero-inner { max-width: 1000px; margin: 0 auto; position: relative; z-index: 1; width: 100%; }
        .sectors-hero .hero-title-wrap { text-align: center; max-width: 900px; margin: 0 auto; }
        .sectors-hero .en-tag { color: var(--matte-gold); font-size: .65rem; letter-spacing: .4em; opacity: .7; }
        .sectors-hero h1 { color: #fff; font-size: clamp(2.4rem, 5.5vw, 4.6rem); line-height: 1.15; font-weight: 900; margin-top: .5rem; }
        .sectors-hero .gold-text { color: var(--matte-gold); }
        .sectors-hero .sub { color: rgba(255,255,255,.66); max-width: 760px; margin: 1.2rem auto 0; line-height: 2; font-size: 1.05rem; font-weight: 600; }
        .sectors-hero .hero-cta { text-align: center; margin-top: 2rem; }
        .sectors-intro { border-bottom: 1px solid rgba(8,20,38,.06); }
        .intro-layout { display: grid; grid-template-columns: .9fr 1.1fr; gap: 3rem; align-items: center; max-width: 980px; margin: auto; }
        .intro-layout h2 { font-size: clamp(1.7rem, 3vw, 2.6rem); line-height: 1.35; margin-top: .35rem; }
        .intro-layout p { font-size: 1.05rem; line-height: 2; font-weight: 700; color: var(--charcoal); }
        .path-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; align-items: stretch; }
        .path-card { background: var(--pure-white); border-radius: 18px; overflow: hidden; border: 1px solid rgba(8,20,38,.08); box-shadow: 0 8px 30px rgba(8,20,38,.05); display: flex; flex-direction: column; transition: transform .35s ease, box-shadow .35s ease; }
        .path-card:hover { transform: translateY(-6px); box-shadow: 0 18px 45px rgba(8,20,38,.12); }
        .path-image-wrap { height: 220px; position: relative; overflow: hidden; }
        .path-image-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .6s ease; }
        .path-card:hover .path-image-wrap img { transform: scale(1.04); }
        .path-image-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(8,20,38,.08), rgba(8,20,38,.55)); }
        .path-card-body { padding: 1.25rem 1.35rem 1.4rem; display: flex; flex-direction: column; flex: 1; }
        .path-icon { width: 42px; height: 42px; margin-top: -2.7rem; margin-bottom: .65rem; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: var(--very-dark-navy); color: var(--matte-gold); border: 3px solid var(--pure-white); position: relative; z-index: 1; }
        .path-label { color: var(--matte-gold); font-weight: 900; font-size: .72rem; }
        .path-card h3 { font-size: 1.35rem; margin: .35rem 0 .6rem; line-height: 1.4; }
        .path-card-body > p { color: var(--charcoal); font-weight: 700; line-height: 1.8; font-size: .86rem; margin-bottom: .9rem; }
        .topic-links { list-style: none; padding: 0; margin: auto 0 0; display: grid; gap: .45rem; }
        .topic-links li { margin: 0; }
        .topic-links a { display: flex; align-items: center; gap: .45rem; color: var(--charcoal); padding: .2rem 0; font-size: .76rem; font-weight: 800; transition: color .25s ease, transform .25s ease; }
        .topic-links a .icon-svg { color: var(--matte-gold); font-size: .7rem; flex: 0 0 auto; }
        .topic-links a:hover { color: var(--matte-gold); transform: translateX(-3px); }
        .path-cta { display: flex; align-items: center; justify-content: center; gap: .4rem; border-top: 1px solid rgba(8,20,38,.08); margin-top: 1.1rem; padding-top: .9rem; color: var(--matte-gold); font-weight: 900; font-size: .8rem; }
        .path-cta .icon-svg { font-size: .7rem; }
        .approach-timeline { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; }
        .approach-step, .faq-card { background: var(--pure-white); border-radius: 14px; border: 1px solid rgba(8,20,38,.06); padding: 1.35rem 1rem; text-align: center; box-shadow: 0 4px 18px rgba(8,20,38,.04); }
        .approach-step .num { color: var(--matte-gold); font-size: 1.7rem; font-weight: 900; opacity: .65; }
        .approach-step h4 { margin: .3rem 0 .2rem; font-size: .95rem; }
        .approach-step p, .faq-card p { color: var(--charcoal); font-weight: 700; line-height: 1.7; font-size: .75rem; }
        .faq-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .faq-card { text-align: right; padding: 1.4rem; }
        .faq-card h3 { font-size: .95rem; line-height: 1.5; margin-bottom: .45rem; }
        .cta-final { background: var(--very-dark-navy); padding: 4.5rem 2rem; text-align: center; color: #fff; }
        .cta-final h2 { color: #fff; font-size: clamp(2rem, 4vw, 3.2rem); margin: .5rem 0; }
        .cta-final p { color: rgba(255,255,255,.62); max-width: 700px; margin: 0 auto 1.6rem; line-height: 1.9; font-weight: 600; }
        .cta-actions { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
        @media (max-width: 1024px) { .path-grid { grid-template-columns: 1fr 1fr; } .path-card:last-child { grid-column: 1 / -1; max-width: 520px; width: 100%; justify-self: center; } .approach-timeline { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 700px) { .sectors-hero { padding: 110px 1rem 3.5rem; min-height: auto; } .sectors-hero h1 { font-size: clamp(2.15rem, 10vw, 3.1rem); } .sectors-hero .sub { font-size: .9rem; } .intro-layout { grid-template-columns: 1fr; gap: 1rem; } .path-grid { grid-template-columns: 1fr; } .path-card:last-child { grid-column: auto; max-width: none; } .path-image-wrap { height: 190px; } .approach-timeline, .faq-grid { grid-template-columns: 1fr; } .approach-step { display: grid; grid-template-columns: 45px 1fr; text-align: right; align-items: center; column-gap: .7rem; } .approach-step .num { grid-row: span 2; text-align: center; } .approach-step p { margin-top: -.25rem; } .cta-actions { flex-direction: column; align-items: center; } .cta-actions a { width: 100%; max-width: 300px; text-align: center; } }
      `}</style>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
