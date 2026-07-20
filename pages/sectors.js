import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect } from 'react';

export default function Sectors() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -20px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const sectorsData = [
    {
      id: 'companies',
      icon: 'fa-building',
      title: 'الشركات التجارية',
      desc: 'نقدم الدعم القانوني الشامل للشركات في مختلف مراحل دورة حياتها – من التأسيس إلى التوسع، إعادة الهيكلة، الاندماجات، الاستحواذ، والتصفية – مع ضمان الامتثال القانوني وحماية مصالح العملاء.',
      services: ['تأسيس الشركات', 'اختيار الكيان القانوني', 'النظام الأساسي', 'عقد التأسيس', 'حوكمة الشركات', 'قرارات مجالس الإدارة', 'اتفاقيات المساهمين', 'زيادة وخفض رأس المال', 'إعادة الهيكلة', 'الاندماجات', 'الاستحواذ', 'تصفية الشركات', 'العقود التجارية', 'الامتثال القانوني', 'المنازعات التجارية', 'الاستشارات المستمرة']
    },
    {
      id: 'ngos',
      icon: 'fa-hand-holding-heart',
      title: 'الجمعيات والمؤسسات الأهلية',
      desc: 'نقدم الإرشاد القانوني للجمعيات والمؤسسات الأهلية لضمان الامتثال للوائح المصرية، ودعم الحوكمة المؤسسية المستدامة، وحماية أهدافها المجتمعية.',
      services: ['التأسيس', 'التسجيل', 'النظام الأساسي', 'اللوائح الداخلية', 'إعادة هيكلة مجلس الإدارة', 'الامتثال', 'الرأي القانوني', 'العقود', 'المنازعات الإدارية', 'إجراءات التصفية']
    },
    {
      id: 'investors',
      icon: 'fa-chart-line',
      title: 'المستثمرون',
      desc: 'ندعم المستثمرين من خلال العناية القانونية الواجبة، مراجعة العقود، هيكلة الاستثمارات، تقييم المخاطر، منع النزاعات، والحماية القانونية للاستثمارات.',
      services: ['الاستشارات الاستثمارية', 'العناية القانونية الواجبة', 'مراجعة العقود', 'المشاريع المشتركة', 'تحليل المخاطر', 'المنازعات الاستثمارية']
    },
    {
      id: 'developers',
      icon: 'fa-city',
      title: 'المطورون العقاريون',
      desc: 'نقدم خدمات قانونية متخصصة طوال دورة حياة مشاريع التطوير العقاري – من مراجعة الأراضي إلى تسوية المنازعات – لضمان سير العمل بسلاسة وحماية استثماراتك.',
      services: ['اتفاقيات التطوير', 'عقود البيع', 'المراجعة القانونية للأراضي', 'التحقق من الملكية', 'منازعات المشاريع', 'إدارة العقود']
    },
    {
      id: 'contractors',
      icon: 'fa-hard-hat',
      title: 'المقاولون',
      desc: 'ندعم المقاولين في صياغة العقود، إدارة المطالبات، منازعات المشاريع، استرداد المدفوعات، وتخفيف المخاطر القانونية.',
      services: ['صياغة العقود', 'المطالبات المالية', 'منازعات المشاريع', 'استرداد المدفوعات', 'تخفيف المخاطر', 'الاستشارات المستمرة']
    },
    {
      id: 'individuals',
      icon: 'fa-user',
      title: 'الأفراد',
      desc: 'نمثل الأفراد في القضايا المدنية ونقدم استشارات قانونية مخصصة تلبي احتياجاتهم الشخصية باحترافية، سرية، وتخطيط استراتيجي.',
      services: ['القضايا المدنية', 'مطالبات التعويض', 'منازعات العقود', 'منازعات الملكية', 'استرداد الديون', 'التنفيذ المدني', 'الاستشارات القانونية', 'صياغة العقود', 'تسوية المنازعات']
    },
    {
      id: 'partners',
      icon: 'fa-handshake',
      title: 'الشركاء',
      desc: 'نقدم حلولاً قانونية للنزاعات التي تنشأ بين الشركاء قبل وبعد التأسيس، مع التركيز على حماية الاستثمارات والحفاظ على استمرارية الأعمال كلما أمكن.',
      services: ['اتفاقيات الشراكة', 'منازعات المساهمين', 'انسحاب الشريك', 'طرد الشركاء', 'منازعات توزيع الأرباح', 'منازعات إدارة الشركة', 'حل الشراكة', 'التصفية القضائية', 'الوساطة والتسوية', 'المنازعات التجارية']
    },
    {
      id: 'heirs',
      icon: 'fa-tree',
      title: 'الورثة',
      desc: 'نقدم تمثيلاً قانونياً في قضايا الإرث مع حماية حقوق الأسرة وتقليل النزاعات من خلال إجراءات قانونية دقيقة ومنهجية.',
      services: ['تقسيم التركة', 'إدارة التركة', 'منازعات الميراث', 'إجراءات الإثبات', 'اتفاقيات التسوية', 'نقل ملكية العقارات', 'المنازعات المدنية', 'تنفيذ أحكام الميراث']
    },
    {
      id: 'compensation',
      icon: 'fa-hand-holding-usd',
      title: 'قضايا التعويضات',
      desc: 'نمثل العملاء الذين يطالبون بتعويضات مادية وأدبية ناتجة عن مسؤولية تعاقدية أو تقصيرية، مع العمل على تحقيق أفضل النتائج الممكنة.',
      services: ['إصابات شخصية', 'الأخطاء الطبية', 'حوادث المرور', 'الأضرار التعاقدية', 'المسؤولية التقصيرية', 'منازعات التأمين', 'الأضرار المالية', 'التقاضي', 'التسوية الودية', 'تنفيذ الأحكام']
    },
    {
      id: 'labor_sector',
      icon: 'fa-briefcase',
      title: 'العمال وأصحاب الأعمال',
      desc: 'نقدم تمثيلاً قانونياً متوازناً لكل من أصحاب العمل والعمال في العلاقات العمالية، مع ضمان الامتثال للتشريعات العمالية وحماية الحقوق التعاقدية.',
      services: ['عقود العمل', 'الفصل التعسفي', 'مكافآت نهاية الخدمة', 'منازعات الأجور', 'الإجراءات التأديبية', 'اللوائح الداخلية', 'المنازعات العمالية', 'التسوية الودية', 'الامتثال القانوني', 'الاستشارات العمالية']
    }
  ];

  return (
    <Layout>
    <Head>
    <title>القطاعات التي نخدمها | الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا</title>
    <meta name="description" content="نقدم خدمات قانونية متخصصة للشركات، المستثمرين، المطورين العقاريين، الجمعيات الأهلية، الأفراد، والورثة. فهم عميق لطبيعة كل قطاع." />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://ostazlaw.vercel.app/sectors.html" />
    <link rel="alternate" hreflang="ar-eg" href="https://ostazlaw.vercel.app/sectors.html" />
    <link rel="alternate" hreflang="en" href="https://ostazlaw.vercel.app/en/sectors.html" />
    <meta property="og:title" content="القطاعات التي نخدمها | الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا" />
    <meta property="og:description" content="خدمات قانونية متخصصة تتناسب مع طبيعة كل قطاع: الشركات، المستثمرون، المطورون العقاريون، الأفراد، والورثة." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://ostazlaw.vercel.app/sectors.html" />
    <meta property="og:image" content="https://ostazlaw.vercel.app/mahmoud-abdel-hamid-lawyer-portrait.jpg" />
    <meta property="og:image:width" content="600" />
    <meta property="og:image:height" content="800" />
    <meta property="og:image:alt" content="الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا" />
    <meta property="og:locale" content="ar_EG" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="https://ostazlaw.vercel.app/mahmoud-abdel-hamid-lawyer-portrait.jpg" />
    <meta name="twitter:image:alt" content="الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا" />
    <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "LegalService",
            "@id": "https://ostazlaw.vercel.app/#organization",
            "name": "مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية",
            "alternateName": "OSTAZ LAW",
            "description": "مؤسسة قانونية مصرية تقدم خدمات المحاماة والاستشارات القانونية للأفراد والشركات في قطاعات متنوعة.",
            "url": "https://ostazlaw.vercel.app/",
            "logo": "https://ostazlaw.vercel.app/logo.png",
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
              "addressLocality": "القاهرة",
              "addressCountry": "مصر"
            }
          },
          {
            "@type": "Person",
            "@id": "https://ostazlaw.vercel.app/#founder",
            "name": "محمود عبد الحميد",
            "jobTitle": "المحامي بالنقض والدستورية العليا",
            "worksFor": { "@id": "https://ostazlaw.vercel.app/#organization" },
            "url": "https://ostazlaw.vercel.app/about.html",
            "image": {
              "@type": "ImageObject",
              "url": "https://ostazlaw.vercel.app/mahmoud-abdel-hamid-lawyer-portrait.jpg",
              "caption": "الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا"
            }
          },
          {
            "@type": "CollectionPage",
            "@id": "https://ostazlaw.vercel.app/sectors.html#webpage",
            "url": "https://ostazlaw.vercel.app/sectors.html",
            "name": "القطاعات التي نخدمها",
            "description": "قائمة القطاعات التي تقدم لها مؤسسة الأستاذ محمود عبد الحميد خدماتها القانونية المتخصصة.",
            "isPartOf": { "@id": "https://ostazlaw.vercel.app/#website" },
            "about": { "@id": "https://ostazlaw.vercel.app/#organization" }
          },
          {
            "@type": "WebSite",
            "@id": "https://ostazlaw.vercel.app/#website",
            "name": "مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية",
            "url": "https://ostazlaw.vercel.app/",
            "description": "مؤسسة قانونية مصرية تقدم خدمات المحاماة والاستشارات القانونية."
          }
        ]
      })
    }}
    />
    </Head>

    {/* Hero */}
    <section className="hero-sectors" aria-label="القطاعات التي نخدمها">
    <div className="hero-pattern"></div>
    <div className="hero-glow"></div>
    <div className="hero-glow-2"></div>
    <div className="hero-inner">
    <div className="hero-title-wrap reveal">
    <span className="en-tag">Industries We Serve</span>
    <h1>القطاعات <span className="gold-text">التي نخدمها</span></h1>
    <p className="sub">لكل قطاع تحدياته القانونية الخاصة، ولذلك نعتمد على فهم طبيعة النشاط والبيئة القانونية المحيطة به قبل تقديم الاستشارة أو بناء الاستراتيجية القانونية، بما يضمن حلولاً أكثر دقة وفاعلية.</p>
    </div>
    <div className="hero-cta reveal" style={{ transitionDelay: '0.15s' }}>
    <Link href="/contact?tab=consult" className="btn-gold">اطلب استشارة متخصصة <i className="fas fa-arrow-left" style={{ marginRight: '8px' }}></i></Link>
    </div>
    </div>
    </section>

    {/* Introduction */}
    <section className="section section-light" aria-label="مقدمة">
    <div className="section-inner">
    <div className="intro-text reveal">
    <p>لا يمكن أن تكون الاستشارة القانونية واحدة لجميع العملاء، فلكل قطاع خصوصيته التشغيلية، ولكل نشاط بيئته القانونية التي تختلف عن غيره.</p>
    <p style={{ marginTop: '0.8rem' }}>ولذلك يبدأ نهجنا بفهم عميق لطبيعة عملك، وقطاعك، وتحدياتك، قبل أن نبدأ في صياغة الحلول القانونية. هذا الفهم هو ما يضمن أن تكون استراتيجيتنا القانونية دقيقة، واقعية، وفاعلة.</p>
    </div>
    </div>
    </section>

    {/* Industries Grid */}
    <section className="section section-gray" aria-label="القطاعات">
    <div className="section-inner">
    <div className="section-head reveal">
    <span className="eyebrow">● قطاعاتنا</span>
    <h2>نفهم خصوصية كل قطاع</h2>
    <p>نقدم حلولاً قانونية تتناسب مع طبيعة كل نشاط، وتلبي احتياجات كل عميل.</p>
    </div>

    <div className="grid md:grid-cols-2 gap-6" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
    {sectorsData.map((sector) => (
      <div key={sector.id} className="industry-card gold-underline-card reveal">
      <div className="icon-wrap"><i className={`fas ${sector.icon}`}></i></div>
      <h3>{sector.title}</h3>
      <p className="desc">{sector.desc}</p>
      <ul className="services-list">
      {sector.services.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
      <Link href={`/contact?tab=consult&sector=${encodeURIComponent(sector.title)}`} className="btn-sm">اطلب استشارة</Link>
      </div>
    ))}
    </div>
    </div>
    </section>

    {/* Approach */}
    <section className="section section-light" aria-label="منهج العمل">
    <div className="section-inner">
    <div className="section-head reveal">
    <span className="eyebrow">● منهج العمل</span>
    <h2>نهجنا في التعامل مع كل قطاع</h2>
    <p>خمس مراحل تضمن فهماً عميقاً وحلولاً قانونية دقيقة.</p>
    </div>

    <div className="approach-timeline">
    <div className="approach-step reveal reveal-d1">
    <span className="num">01</span>
    <h4>نفهم</h4>
    <p>ندرس طبيعة نشاطك وقطاعك وتحدياتك القانونية.</p>
    </div>
    <div className="approach-step reveal reveal-d2">
    <span className="num">02</span>
    <h4>نحلل</h4>
    <p>نقيم المخاطر والفرص والمراكز القانونية بدقة.</p>
    </div>
    <div className="approach-step reveal reveal-d3">
    <span className="num">03</span>
    <h4>نخطط</h4>
    <p>نضع استراتيجية قانونية تتناسب مع أهدافك.</p>
    </div>
    <div className="approach-step reveal reveal-d1">
    <span className="num">04</span>
    <h4>نمثل</h4>
    <p>ننفذ الخطة باحترافية ونتابع الإجراءات بدقة.</p>
    </div>
    <div className="approach-step reveal reveal-d2">
    <span className="num">05</span>
    <h4>نواصل</h4>
    <p>نبقى على تواصل ونساندك حتى تحقيق النتيجة.</p>
    </div>
    </div>
    </div>
    </section>

    {/* Why Us */}
    <section className="section section-gray" aria-label="لماذا يثق بنا عملاؤنا">
    <div className="section-inner">
    <div className="section-head reveal">
    <span className="eyebrow">● لماذا نثق بنا</span>
    <h2>لماذا يختار عملاؤنا مؤسستنا؟</h2>
    <p>مزايا تجعلنا الشريك القانوني الموثوق في مختلف القطاعات.</p>
    </div>

    <div className="why-grid">
    <div className="why-card gold-underline-card reveal reveal-d1">
    <span className="icon"><i className="fas fa-industry"></i></span>
    <h4>فهم متخصص لكل قطاع</h4>
    <p>نفهم خصوصية كل نشاط قبل تقديم أي حل قانوني.</p>
    </div>
    <div className="why-card gold-underline-card reveal reveal-d2">
    <span className="icon"><i className="fas fa-chess"></i></span>
    <h4>تخطيط استراتيجي</h4>
    <p>نضع خططاً قانونية مدروسة تسبق أي إجراء.</p>
    </div>
    <div className="why-card gold-underline-card reveal reveal-d3">
    <span className="icon"><i className="fas fa-scroll"></i></span>
    <h4>حلول قانونية مخصصة</h4>
    <p>نصمم حلولاً تتناسب مع احتياجات كل عميل وحالته.</p>
    </div>
    <div className="why-card gold-underline-card reveal reveal-d1">
    <span className="icon"><i className="fas fa-comments"></i></span>
    <h4>تواصل شفاف</h4>
    <p>نبقيك على اطلاع بكل تطور في قضيتك.</p>
    </div>
    <div className="why-card gold-underline-card reveal reveal-d2">
    <span className="icon"><i className="fas fa-gavel"></i></span>
    <h4>تمثيل احترافي</h4>
    <p>نمثل عملاءنا بأعلى معايير المهنة والالتزام.</p>
    </div>
    <div className="why-card gold-underline-card reveal reveal-d3">
    <span className="icon"><i className="fas fa-handshake"></i></span>
    <h4>شراكة قانونية طويلة الأمد</h4>
    <p>نبني علاقات مستدامة تقوم على الثقة والجودة.</p>
    </div>
    </div>
    </div>
    </section>

    {/* Final CTA */}
    <section className="cta-final" aria-label="دعوة للتواصل">
    <div className="section-inner reveal">
    <h2>هل تحتاج إلى استشارة قانونية تتناسب مع طبيعة نشاطك؟</h2>
    <p>ندرس طبيعة نشاطك أولاً، ثم نبني الحل القانوني المناسب لاحتياجاتك، سواء كنت فرداً، شركة، مستثمراً، أو تمثل جهة مؤسسية.</p>
    <div className="cta-actions">
    <Link href="/contact?tab=consult" className="btn-gold">طلب استشارة</Link>
    <a href="https://wa.me/201101076000" target="_blank" rel="noopener noreferrer" className="btn-outline-white">تواصل عبر واتساب</a>
    </div>
    </div>
    </section>

    <style jsx>{`
      .hero-sectors {
        padding: 120px 2rem 4rem;
        background: var(--very-dark-navy);
        position: relative;
        overflow: hidden;
        min-height: 60vh;
        display: flex;
        align-items: center;
      }
      .hero-sectors .hero-pattern {
        position: absolute;
        inset: 0;
        opacity: 0.03;
        background-image: radial-gradient(circle at 20% 30%, var(--matte-gold) 1px, transparent 1px), radial-gradient(circle at 80% 70%, var(--matte-gold) 1px, transparent 1px);
        background-size: 60px 60px;
        pointer-events: none;
      }
      .hero-sectors .hero-glow {
        position: absolute;
        width: 60vw;
        height: 60vw;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(176, 141, 87, 0.04) 0%, transparent 70%);
        top: -20%;
        right: -20%;
        pointer-events: none;
        animation: orbFloat 20s ease-in-out infinite alternate;
      }
      .hero-sectors .hero-glow-2 {
        position: absolute;
        width: 40vw;
        height: 40vw;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(176, 141, 87, 0.02) 0%, transparent 70%);
        bottom: -20%;
        left: -10%;
        pointer-events: none;
        animation: orbFloat 25s ease-in-out infinite alternate-reverse;
      }
      @keyframes orbFloat {
        0% { transform: translate(0,0) scale(1); }
        100% { transform: translate(40px, -30px) scale(1.05); }
      }
      .hero-sectors .hero-inner {
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
        z-index: 1;
        width: 100%;
      }
      .hero-sectors .hero-title-wrap {
        text-align: center;
        max-width: 860px;
        margin: 0 auto;
      }
      .hero-sectors .hero-title-wrap .en-tag {
        font-size: 0.65rem;
        font-weight: 800;
        letter-spacing: 0.4em;
        text-transform: uppercase;
        color: var(--matte-gold);
        opacity: 0.5;
        display: block;
        margin-bottom: 0.3rem;
      }
      .hero-sectors .hero-title-wrap h1 {
        font-family: var(--font-serif);
        font-size: clamp(2.4rem, 5vw, 4rem);
        font-weight: 900;
        color: #fff;
        line-height: 1.1;
      }
      .hero-sectors .hero-title-wrap h1 .gold-text {
        color: var(--matte-gold);
      }
      .hero-sectors .hero-title-wrap .sub {
        font-size: clamp(1rem, 1.3vw, 1.2rem);
        font-weight: 400;
        color: rgba(255, 255, 255, 0.55);
        max-width: 720px;
        margin: 0.8rem auto 0;
        line-height: 1.8;
      }
      .hero-sectors .hero-cta {
        text-align: center;
        margin-top: 2rem;
      }

      .intro-text {
        max-width: 780px;
        margin: 0 auto;
        font-size: 1.05rem;
        color: var(--charcoal);
        font-weight: 700;
        line-height: 1.9;
        text-align: center;
      }
      .intro-text p { margin-bottom: 0.8rem; }

      .industry-card {
        background: var(--pure-white);
        border-radius: 16px;
        border: 1px solid rgba(0, 0, 0, 0.04);
        padding: 2rem 1.8rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
        transition: all 0.4s var(--ease-out);
        position: relative;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .industry-card::after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 0;
        height: 3px;
        background: var(--matte-gold);
        transition: width 0.6s var(--ease-out);
      }
      .industry-card:hover::after { width: 100%; }
      .industry-card:hover {
        border-color: var(--matte-gold);
        transform: translateY(-6px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.04);
      }
      .industry-card .icon-wrap {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        background: rgba(176, 141, 87, 0.05);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
        transition: all 0.4s var(--ease-out);
      }
      .industry-card:hover .icon-wrap { background: var(--matte-gold); }
      .industry-card:hover .icon-wrap i { color: #000; }
      .industry-card .icon-wrap i {
        font-size: 1.3rem;
        color: var(--matte-gold);
        transition: all 0.4s ease;
      }
      .industry-card h3 {
        font-size: 1.1rem;
        font-weight: 800;
        color: var(--charcoal);
        margin-bottom: 0.3rem;
      }
      .industry-card .desc {
        font-size: 0.9rem;
        color: var(--charcoal);
        font-weight: 700;
        line-height: 1.7;
        margin-bottom: 0.8rem;
        flex: 1;
      }
      .industry-card .services-list {
        list-style: none;
        padding: 0;
        margin: 0 0 1rem 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.3rem 0.6rem;
      }
      .industry-card .services-list li {
        font-size: 0.7rem;
        color: var(--charcoal);
        font-weight: 700;
        background: var(--light-gray);
        padding: 0.15rem 0.6rem;
        border-radius: 20px;
        display: inline-block;
      }
      .industry-card .btn-sm {
        display: inline-block;
        font-size: 0.7rem;
        font-weight: 700;
        color: var(--matte-gold);
        border: 1px solid rgba(176, 141, 87, 0.15);
        padding: 4px 16px;
        border-radius: 6px;
        transition: all 0.4s var(--ease-out);
        text-align: center;
        align-self: flex-start;
        background: transparent;
        cursor: pointer;
        text-decoration: none;
      }
      .industry-card .btn-sm:hover {
        background: var(--matte-gold);
        color: #000;
        border-color: var(--matte-gold);
      }

      .approach-timeline {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 1rem;
        margin-top: 2rem;
      }
      .approach-step {
        text-align: center;
        padding: 1.5rem 1rem;
        background: var(--pure-white);
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.04);
        transition: all 0.4s var(--ease-out);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
        position: relative;
      }
      .approach-step::after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 0;
        height: 3px;
        background: var(--matte-gold);
        transition: width 0.6s var(--ease-out);
      }
      .approach-step:hover::after { width: 100%; }
      .approach-step:hover {
        border-color: var(--matte-gold);
        transform: translateY(-4px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
      }
      .approach-step .num {
        font-family: var(--font-serif);
        font-size: 2rem;
        font-weight: 900;
        color: var(--matte-gold);
        opacity: 0.12;
        display: block;
        line-height: 1;
      }
      .approach-step h4 {
        font-size: 0.9rem;
        font-weight: 700;
        color: var(--charcoal);
        margin-top: 0.3rem;
      }
      .approach-step p {
        font-size: 0.75rem;
        color: var(--charcoal);
        font-weight: 700;
        line-height: 1.5;
        margin-top: 0.1rem;
      }

      .why-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.2rem;
      }
      .why-card {
        background: var(--pure-white);
        padding: 1.8rem 1.4rem;
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.04);
        transition: all 0.4s var(--ease-out);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
        text-align: center;
        position: relative;
      }
      .why-card::after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 0;
        height: 3px;
        background: var(--matte-gold);
        transition: width 0.6s var(--ease-out);
      }
      .why-card:hover::after { width: 100%; }
      .why-card:hover {
        border-color: var(--matte-gold);
        transform: translateY(-4px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
      }
      .why-card .icon {
        font-size: 1.6rem;
        color: var(--matte-gold);
        opacity: 0.3;
        margin-bottom: 0.3rem;
        display: block;
      }
      .why-card h4 {
        font-size: 0.9rem;
        font-weight: 700;
        color: var(--charcoal);
        margin-bottom: 0.1rem;
      }
      .why-card p {
        font-size: 0.8rem;
        color: var(--charcoal);
        font-weight: 700;
        line-height: 1.6;
      }

      .cta-final {
        background: var(--very-dark-navy);
        padding: 4.5rem 2rem;
        text-align: center;
        color: #fff;
        border-top: 1px solid rgba(176, 141, 87, 0.06);
      }
      .cta-final h2 {
        font-family: var(--font-serif);
        font-size: clamp(2rem, 3.5vw, 3rem);
        font-weight: 900;
        color: #fff;
        margin-bottom: 0.5rem;
      }
      .cta-final p {
        max-width: 720px;
        margin: 0.4rem auto 2rem;
        color: rgba(255, 255, 255, 0.5);
        font-weight: 300;
        font-size: 1rem;
        line-height: 1.8;
      }
      .cta-final .cta-actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
      }

      .btn-gold {
        display: inline-block;
        background: var(--matte-gold);
        color: #000;
        font-weight: 700;
        padding: 16px 40px;
        border-radius: 8px;
        border: none;
        transition: all 0.4s var(--ease-out);
        text-align: center;
        font-size: 0.95rem;
        letter-spacing: 0.02em;
        box-shadow: 0 2px 20px rgba(176, 141, 87, 0.15);
        position: relative;
        cursor: pointer;
        text-decoration: none;
      }
      .btn-gold:hover {
        background: #c4a06a;
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(176, 141, 87, 0.25);
      }
      .btn-outline-white {
        display: inline-block;
        border: 1px solid rgba(255, 255, 255, 0.25);
        color: #fff;
        font-weight: 700;
        padding: 16px 40px;
        border-radius: 8px;
        transition: all 0.4s var(--ease-out);
        text-align: center;
        font-size: 0.95rem;
        background: transparent;
        cursor: pointer;
        text-decoration: none;
      }
      .btn-outline-white:hover {
        border-color: var(--matte-gold);
        color: var(--matte-gold);
        background: rgba(176, 141, 87, 0.05);
        transform: translateY(-2px);
      }

      @media (max-width: 1024px) {
        .approach-timeline { grid-template-columns: repeat(3, 1fr); }
        .why-grid { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 820px) {
        .hero-sectors { padding: 100px 1rem 3rem; min-height: auto; }
        .approach-timeline { grid-template-columns: 1fr 1fr; }
        .why-grid { grid-template-columns: 1fr 1fr; }
      }
      @media (max-width: 640px) {
        .approach-timeline { grid-template-columns: 1fr; max-width: 280px; margin: 0 auto; }
        .why-grid { grid-template-columns: 1fr; max-width: 320px; margin: 0 auto; }
        .hero-sectors .hero-title-wrap h1 { font-size: clamp(2rem, 8vw, 2.8rem); }
        .industry-card { padding: 1.4rem 1.2rem; }
        .industry-card .services-list li { font-size: 0.6rem; }
        .cta-final .cta-actions { flex-direction: column; align-items: center; }
        .cta-final .cta-actions .btn-gold, .cta-final .cta-actions .btn-outline-white {
          width: 100%; max-width: 300px; text-align: center;
        }
      }
      @media (max-width: 400px) {
        .approach-timeline { max-width: 240px; }
        .why-grid { max-width: 260px; }
      }
      `}</style>
      </Layout>
  );
}
