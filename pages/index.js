import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { getAllArticles, getAllNews } from '../lib/github';
import ArticleCard from '../components/ArticleCard';
import NewsCard from '../components/NewsCard';
import Icon from '../components/Icon';

export default function Home({ articles, news }) {
  const latestArticles = articles && articles.length > 0 ? articles.slice(0, 3) : [];
  const latestNews = news && news.length > 0 ? news.slice(0, 3) : [];

  return (
    <Layout>
      <Head>
        {/* SEO/AEO: هذه البيانات تستهدف البحث المحلي في أسوان وتشرح للمحركات هوية المكتب وخدماته؛ حافظ على اتساقها مع صفحة خدماتنا والتخصصات عند أي تعديل. */}
        {/* الاسم الرسمي الكامل "مكتب جاد الرب للمحاماة والاستشارات القانونية" يُستخدم في العناصر الرسمية (title, schema)
            بينما يبقى شعار الهيرو "جاد الرب للمحاماة" أخف بصريًا كاسم برانديد ظاهر للزائر */}
        <title>مكتب محاماة في أسوان للاستشارات والعقود والعقارات | جاد الرب</title>
        <meta name="description" content="مكتب جاد الرب للمحاماة في أسوان يقدم الاستشارات القانونية والتمثيل القضائي للأفراد والشركات والمستثمرين في العقود والعقارات والمنازعات المدنية والخدمات القانونية للأعمال في مصر." />
        <link rel="canonical" href="https://ostazlaw.vercel.app/" />
        <meta property="og:title" content="مكتب محاماة في أسوان | جاد الرب للمحاماة والاستشارات القانونية" />
        <meta property="og:description" content="استشارات وتمثيل قانوني للأفراد والشركات والمستثمرين في العقود والعقارات والمنازعات المدنية والخدمات القانونية للأعمال." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ostazlaw.vercel.app/" />
        <meta property="og:image" content="https://ostazlaw.vercel.app/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="ar_EG" />
        <meta property="og:site_name" content="JAD ELRAB" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://ostazlaw.vercel.app/og-image.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              { "@type": "LegalService", "@id": "https://ostazlaw.vercel.app/#organization", "name": "مكتب جاد الرب للمحاماة والاستشارات القانونية", "alternateName": "JAD ELRAB", "description": "مكتب محاماة مصري مقره أسوان، يقدم الاستشارات والتمثيل القانوني وصياغة العقود للأفراد والشركات والمستثمرين في مختلف محافظات مصر.", "url": "https://ostazlaw.vercel.app/", "email": "ma.law.firm@outlook.com", "telephone": "+201101076000", "areaServed": [{ "@type": "City", "name": "أسوان" }, { "@type": "Country", "name": "مصر" }], "availableLanguage": ["Arabic", "English"], "sameAs": ["https://www.facebook.com/malegal", "https://x.com/mahmoud_a_hamyd", "https://www.linkedin.com/in/mahmoud-abdel-hamid-0a4664374"], "address": { "@type": "PostalAddress", "addressLocality": "أسوان", "addressCountry": "EG" }, "priceRange": "$$" },
              { "@type": "Person", "@id": "https://ostazlaw.vercel.app/#founder", "name": "محمود عبد الحميد جاد الرب", "jobTitle": "المحامي بالنقض والدستورية والإدارية العليا", "worksFor": { "@id": "https://ostazlaw.vercel.app/#organization" }, "url": "/about", "image": { "@type": "ImageObject", "url": "/mahmoud-abdel-hamid-lawyer-portrait.webp", "caption": "الأستاذ محمود عبد الحميد جاد الرب – المحامي بالنقض والدستورية والإدارية العليا" } },
              { "@type": "WebPage", "@id": "https://ostazlaw.vercel.app/#webpage", "url": "https://ostazlaw.vercel.app/", "name": "مكتب محاماة في أسوان – جاد الرب للمحاماة", "description": "خدمات قانونية للأفراد والشركات والمستثمرين في أسوان ومختلف محافظات مصر.", "isPartOf": { "@id": "https://ostazlaw.vercel.app/#website" }, "about": { "@id": "https://ostazlaw.vercel.app/#organization" }, "primaryImageOfPage": { "@type": "ImageObject", "url": "/mahmoud-abdel-hamid-lawyer-portrait.webp", "caption": "الأستاذ محمود عبد الحميد جاد الرب – المحامي بالنقض والدستورية والإدارية العليا" } },
              { "@type": "BreadcrumbList", "@id": "https://ostazlaw.vercel.app/#breadcrumb", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "الرئيسية", "item": "https://ostazlaw.vercel.app/" }] },
              { "@type": "WebSite", "@id": "https://ostazlaw.vercel.app/#website", "name": "مكتب جاد الرب للمحاماة والاستشارات القانونية", "url": "https://ostazlaw.vercel.app/", "description": "مكتب محاماة مصري يقدم استشارات وتمثيلاً قضائياً وحلولاً قانونية." },
              {
                "@type": "FAQPage",
                "@id": "https://ostazlaw.vercel.app/#faq-segments",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "هل يقدم مكتب جاد الرب استشارات قانونية للأفراد؟",
                    "acceptedAnswer": { "@type": "Answer", "text": "نعم، نساعد الأفراد على فهم موقفهم في العقود، والملكية، والإيجارات، والمطالبات والمنازعات المدنية." }
                  },
                  {
                    "@type": "Question",
                    "name": "هل يقدم المكتب خدمات قانونية للشركات والمنشآت؟",
                    "acceptedAnswer": { "@type": "Answer", "text": "نعم، نقدم دعمًا قانونيًا في العقود التجارية، الحوكمة، الشراكات، النزاعات التجارية والاستشارات المستمرة." }
                  },
                  {
                    "@type": "Question",
                    "name": "هل يقدم المكتب استشارات للمستثمرين ورجال الأعمال؟",
                    "acceptedAnswer": { "@type": "Answer", "text": "نعم، نراجع الاتفاقات وعقود الشراكة، ونقوم بالفحص القانوني للمشروعات وتقييم المخاطر قبل الاستثمار." }
                  }
                ]
              }
            ]
          })
        }} />
      </Head>

      {/* الهيرو: عنوان واحد + سطر قيمة مدمج + زر إجراء واحد. بلا أي عناصر تفاعلية إضافية،
          وبلا أي أنماط inline على النص الرئيسي حتى يبقى الخط بنفس وضوح النسخة الأصلية
          (نفس الكلاسات hero-title / hero-subtitle / hero-protection-message كما كانت). */}
      <section className="hero" aria-label="الرسالة الرئيسية">
        <div className="hero-bg"><div className="glow"></div><div className="glow-2"></div></div>
        <div className="hero-content">
          <div className="hero-brand-signature">JAD ELRAB</div>
          <h1 className="hero-title"><span>جاد الرب</span><span>للمحاماة والاستشارات القانونية</span></h1>
          <p className="hero-subtitle">محمود عبد الحميد جاد الرب<br />المحامي بالنقض والدستورية والإدارية العليا</p>
          <p className="hero-protection-message">نحمي حقوقك ومصالحك، ونساعدك على تفادي النزاع قبل أن يبدأ.</p>

          <div className="hero-actions">
            <Link href="/contact?tab=consult#service-form" className="btn-gold hero-consultation-cta">ابدأ استشارتك المجانية</Link>
          </div>
          <div className="section-cta"><Link href="/client-inquiry" className="btn-outline-gold case-tracking-cta">عميل حالي؟ تابع ملفك</Link></div>

          {/* شريط الثقة الثلاثي مدمج في سطر واحد أسفل الهيرو مباشرة بدل قسم منفصل بثلاث كتل،
              بخط واضح (لا تعتيم قوي) حتى يبقى مقروءًا بسهولة. */}
          <p className="hero-trust-line" style={{ fontSize: '14px', color: 'inherit', opacity: 0.85, marginTop: '18px' }}>
            <span>خبرة عملية منذ 2005</span>
            <span aria-hidden="true"> · </span>
            <span>فهم للمخاطر قبل الالتزام</span>
            <span aria-hidden="true"> · </span>
            <span>سرية مهنية ووضوح في التعامل</span>
          </p>
        </div>
      </section>

      <section className="section client-segments-section" aria-label="خدماتنا">
        <div className="section-inner">
          <div className="section-head reveal">
            <span className="eyebrow">● خدماتنا</span>
            <h2>حلول قانونية تبدأ من فهم احتياجك</h2>
            <p>اختر الفئة الأقرب إليك لتعرف كيف نخدمك، ثم تواصل معنا عندما تكون مستعدًا لعرض مسألتك.</p>
          </div>
          <div className="client-segments-grid">
            <Link href="/sectors#business" className="client-segment-card client-segment-business reveal">
              <div className="client-segment-image" role="img" aria-label="مبنى يرمز إلى الشركات والأعمال"></div>
              <div className="client-segment-body">
                <span className="client-segment-kicker">للشركات والمنشآت</span>
                <h3>خدمات قانونية للشركات والمؤسسات</h3>
                <p>دعم قانوني في العقود التجارية، الحوكمة، الشراكات، النزاعات التجارية والاستشارات المستمرة.</p>
                <ul><li>استشارات قانونية مستمرة</li><li>دعم اتخاذ القرار القانوني</li><li>قراءة العقود وصياغتها باحتراف</li><li>حماية الاستثمارات والمصالح</li></ul>
                <span className="btn-outline-gold">اعرف أكثر <span aria-hidden="true">←</span></span>
              </div>
            </Link>

            <Link href="/sectors#investor" className="client-segment-card client-segment-entrepreneurs reveal">
              <div className="client-segment-image" role="img" aria-label="أدوات ترمز إلى الاستثمار وريادة الأعمال"></div>
              <div className="client-segment-body">
                <span className="client-segment-kicker">للمستثمرين ورجال الأعمال</span>
                <h3>استشارات قانونية للمستثمرين ورجال الأعمال</h3>
                <p>مراجعة الاتفاقات، عقود الشراكة، الفحص القانوني للمشروعات وتقييم المخاطر قبل الاستثمار.</p>
                <ul><li>مراجعة الاتفاقيات والعقود</li><li>تنظيم الشراكات والعلاقات</li><li>تقييم المخاطر قبل القرار</li></ul>
                <span className="btn-outline-gold">اعرف أكثر <span aria-hidden="true">←</span></span>
              </div>
            </Link>

            <Link href="/sectors#individual" className="client-segment-card client-segment-individuals reveal">
              <div className="client-segment-image" role="img" aria-label="صورة تعبر عن الحقوق والمصالح الشخصية"></div>
              <div className="client-segment-body">
                <span className="client-segment-kicker">للأفراد</span>
                <h3>استشارات قانونية للأفراد في العقارات والعقود والمنازعات</h3>
                <p>نساعدك على فهم موقفك في العقود، والملكية، والإيجارات، والمطالبات والمنازعات المدنية.</p>
                <ul><li>العقود والمستندات</li><li>العقارات والملكية والإيجارات</li><li>المطالبات والمنازعات المدنية</li></ul>
                <span className="btn-outline-gold">اعرف أكثر <span aria-hidden="true">←</span></span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-light" aria-label="عن المكتب">
        <div className="section-inner">
          <div className="about-why-grid">
            <div className="about-image reveal">
              <div className="frame"><Image src="/mahmoud-abdel-hamid-lawyer-portrait.webp" alt="الأستاذ محمود عبد الحميد جاد الرب" width={400} height={533} priority className="about-image-inner" /></div>
              <div className="badge">خبرة مهنية منذ 2005</div>
            </div>
            <div className="about-content reveal">
              <span className="eyebrow">● عن المكتب</span>
              <h2>لا تبدأ كل المسائل القانونية من المحكمة،<br /><span className="gold-text">بل تبدأ أحيانًا من فهم ما لديك</span></h2>
              <p>مكتب جاد الرب للمحاماة والاستشارات القانونية مقره أسوان، وتمتد خدماته إلى العملاء في جميع محافظات مصر. نؤمن بأن دور المحامي لا يبدأ عند وقوع النزاع فقط؛ بل يبدأ قبل ذلك، بمساعدة العميل على فهم موقفه وحماية حقوقه ومصالحه قبل أن تتعقد المسألة أو تنتقل إلى المحكمة.</p>
              <p>ولهذا نبدأ من الوقائع والمستندات، ونقرأ ما قد يترتب على القرار قبل اتخاذه، ثم نوضح الخيارات والخطوة المناسبة. هدفنا أن يحصل العميل على رؤية قانونية عملية تساعده على حماية استثماره وموقفه القانوني، لا على مشورة عامة منفصلة عن واقعه.</p>
              <p>وتستند خبرة المكتب منذ عام <strong>2005</strong> إلى ممارسة عملية وكفاءة في التمثيل القضائي أمام مختلف درجات المحاكم، وصولًا إلى محكمة النقض والمحكمة الدستورية العليا.</p>
              <div className="about-why-points">
                <span className="point"><Icon name="check-circle" /> مشورة قانونية وقائية قبل بدء النزاع أو انتقاله إلى المحكمة.</span>
                <span className="point"><Icon name="check-circle" /> قراءة دقيقة للوقائع والمستندات ودعم اتخاذ القرار.</span>
                <span className="point"><Icon name="check-circle" /> حماية بيانات العملاء وعدم الاعتماد على برامج عامة من السوق.</span>
                <span className="point"><Icon name="check-circle" /> خبرة في التمثيل القضائي أمام أعلى درجات المحاكم.</span>
                <span className="point"><Icon name="check-circle" /> سرية مهنية ومتابعة عملية تناسب كل مسألة.</span>
              </div>
              <p className="qayd-note"><Icon name="shield-alt" /> لأن سرية البيانات جزء من العمل القانوني، طورنا نظام <strong>Qayd</strong> لإدارة أعمال المكتب داخليًا، بدل الاعتماد على برامج جاهزة لا نتحكم في بنيتها أو طريقة تعاملها مع البيانات.</p>
              <div className="signature">
                <div><div className="name">الأستاذ محمود عبد الحميد جاد الرب</div><div className="title">المؤسس – المحامي بالنقض والدستورية والإدارية العليا</div></div>
                <Link href="/about" className="btn-outline-gold">تعرف على المكتب</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-gray" aria-label="مجالات الممارسة القانونية">
        <div className="section-inner">
          <div className="section-head reveal"><span className="eyebrow">● مجالات الممارسة</span><h2>تعرّف على تخصصاتنا ومجالات عملنا</h2><p>نبدأ من فهم الوقائع، ثم نحدد المجال القانوني الأقرب إلى احتياجك والخطوة المناسبة للتعامل معه.</p></div>
          <div className="practice-grid">
            <Link href="/specialties" className="practice-link"><div className="practice-card reveal"><div className="icon-wrap"><Icon name="gavel" /></div><h3>المنازعات المدنية</h3><p>العقود، التعويضات، الملكية والإيجارات.</p></div></Link>
            <Link href="/specialties" className="practice-link"><div className="practice-card reveal"><div className="icon-wrap"><Icon name="chart-pie" /></div><h3>المعاملات التجارية</h3><p>الشركات، الشراكات والعقود التجارية.</p></div></Link>
            <Link href="/specialties" className="practice-link"><div className="practice-card reveal"><div className="icon-wrap"><Icon name="building" /></div><h3>الخدمات القانونية للأعمال</h3><p>الهيكلة، الحوكمة وصياغة العقود.</p></div></Link>
            <Link href="/specialties" className="practice-link"><div className="practice-card reveal"><div className="icon-wrap"><Icon name="landmark" /></div><h3>القضاء الإداري</h3><p>القرارات الإدارية والمنازعات الحكومية.</p></div></Link>
            <Link href="/specialties" className="practice-link"><div className="practice-card reveal"><div className="icon-wrap"><Icon name="scale-balanced" /></div><h3>الطعون القانونية</h3><p>الاستئناف والنقض والطعون الدستورية والإدارية العليا.</p></div></Link>
          </div>
          <div className="section-cta"><Link href="/specialties" className="btn-outline-gold">استعراض مجالات الممارسة</Link></div>
        </div>
      </section>

      <section className="section section-light" aria-label="كيف نبدأ معك">
        <div className="section-inner">
          <div className="section-head reveal"><span className="eyebrow">● كيف نبدأ معك</span><h2>ثلاث خطوات واضحة نحو القرار الصحيح</h2><p>لا تحتاج إلى صياغة قانونية أو ملف كامل في البداية؛ يكفي أن تشرح ما حدث وما الذي تريد الوصول إليه.</p></div>
          <div className="process-timeline">
            <div className="process-step reveal"><span className="num">01</span><div className="step-content"><h4>تشرح ما حدث</h4><p>ترسل ملخصًا بسيطًا للمسألة، دون الحاجة إلى معرفة اسم الدعوى أو الإجراء القانوني.</p></div></div>
            <div className="process-step reveal"><span className="num">02</span><div className="step-content"><h4>نفهم الصورة الأولية</h4><p>نراجع المعلومات الأساسية ونوضح ما يلزم من مستندات أو بيانات لفهم موقفك بدقة أكبر.</p></div></div>
            <div className="process-step reveal"><span className="num">03</span><div className="step-content"><h4>نوضح لك الرأي القانوني والخطوة المناسبة</h4><p>نراجع المعلومات الأساسية ونوضح لك الموقف القانوني الأولي، وما إذا كنت تحتاج إلى مكالمة أو واتساب أو موعد أو مراجعة مستندات.</p></div></div>
          </div>
          <p className="process-note"><Icon name="paperclip" /> لا تحتاج إلى رفع مستند في البداية. وإذا كان لديك عقد أو إنذار أو مستند ذو صلة، يمكنك ذكره أو إرفاقه لاحقًا بحسب طبيعة المسألة.</p>
          {/* نقطة تحويل مبكرة: تمسك نية التواصل وهي في قمتها، بدل ما تنتظر الزائر لحد آخر الصفحة */}
          <div className="section-cta"><Link href="/contact?tab=consult#service-form" className="btn-outline-gold">اعرض مسألتك في استشارة أولية مجانية</Link></div>
        </div>
      </section>

      <section className="section section-gray client-portal-promo" aria-label="متابعة الملف">
        <div className="section-inner section-portal-inner">
          <div><span className="eyebrow">● للعميل الحالي</span><h2>هل لديك ملف لدى المكتب؟</h2><p>تابع آخر التحديثات المتعلقة بملفك باستخدام رقم الهاتف ورمز المتابعة.</p></div>
          <Link href="/client-inquiry" className="btn-outline-gold">متابعة ملفك</Link>
        </div>
      </section>

      <section className="section section-light" aria-label="المكتبة القانونية">
        <div className="section-inner">
          <div className="section-head reveal"><span className="eyebrow">● المكتبة القانونية</span><h2>المكتبة القانونية</h2><p>اطلع على أحدث المقالات القانونية.</p></div>
          <div className="blog-grid">{latestArticles.length > 0 ? latestArticles.map((article) => <ArticleCard key={article.slug} article={article} />) : <div className="col-span-full text-center text-charcoal/50 py-10">لا توجد مقالات حالياً.</div>}</div>
          <div className="section-cta"><Link href="/news-archive" className="btn-outline-gold">تصفح المكتبة القانونية</Link></div>
        </div>
      </section>

      <section className="section section-gray" aria-label="أخبار المكتب">
        <div className="section-inner">
          <div className="section-head reveal"><span className="eyebrow">● من أخبار المكتب</span><h2>مستجدات من الممارسة القانونية</h2><p>أخبار ومشاركات وتطورات من عمل المكتب ومجاله القانوني.</p></div>
          <div className="experience-grid">{latestNews.length > 0 ? latestNews.map((item) => <NewsCard key={item.slug} news={item} />) : <div className="col-span-full text-center text-charcoal/50 py-10">لا توجد أخبار حالياً.</div>}</div>
          <div className="section-cta"><Link href="/news-archive" className="btn-outline-gold">المزيد من الأخبار والمقالات</Link></div>
        </div>
      </section>

      <section className="map-section" aria-label="موقع المكتب">
        <div className="map-container"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1819.3414902100868!2d32.8988582!3d24.0886561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDA1JzE5LjIiTiAzMsKwNTMnNTUuOSJF!5e0!3m2!1sar!2seg!4v1700000000000!5m2!1sar!2seg" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-cross-origin" title="موقع مكتب جاد الرب للمحاماة في أسوان"></iframe></div>
        <div className="map-address"><Icon name="map-marker-alt" /> شارع كسر الحجر، المتفرع من شارع كورنيش النيل، أمام مجمع المحاكم – أسوان، مصر</div>
      </section>

      <section className="cta-section" aria-label="ابدأ الخطوة الأولى">
        <div className="section-inner reveal">
          <span className="eyebrow">● الخطوة الأولى</span>
          <h2>الخطوة الأولى لا تحتاج إلى تعقيد أو تأخير</h2>
          <p>أرسل ملخصًا لما حدث، وابدأ استشارة أولية مجانية دون التزام. فالخطوة المبكرة قد تساعدك على فهم موقفك قبل أن تضيق الخيارات.</p>
          <div className="cta-actions">
            <Link href="/contact?tab=consult#service-form" className="btn-gold">ابدأ الاستشارة المجانية</Link>
            <a href="https://wa.me/201101076000" target="_blank" rel="noopener noreferrer" className="btn-outline-gold">تحدث معنا عبر واتساب</a>
          </div>
          <Link href="/client-inquiry" className="cta-secondary-link">عميل حالي؟ متابعة ملفك</Link>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const articles = await getAllArticles();
  const news = await getAllNews();
  const processedArticles = articles.map((a) => ({ ...a, date: a.date ? new Date(a.date).toISOString() : null }));
  const processedNews = news.map((n) => ({ ...n, date: n.date ? new Date(n.date).toISOString() : null }));
  return { props: { articles: processedArticles, news: processedNews }, revalidate: 60 };
}
