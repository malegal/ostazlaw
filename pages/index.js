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
        <title>جاد الرب للمحاماة والاستشارات القانونية | JAD ELRAB</title>
        <meta name="description" content="جاد الرب للمحاماة والاستشارات القانونية. نحمي استثماراتك وموقفك القانوني بالعلم والخبرة، ونقدم الاستشارات والتمثيل القضائي للأفراد والشركات في جميع أنحاء مصر." />
        {/* SEO: تبقى بيانات المؤسسة موحّدة مع النسخة السابقة، بينما تعكس الصفحة الجديدة رسالتها الهادئة القائمة على الوضوح. */}
        <link rel="canonical" href="https://ostazlaw.vercel.app" />
        <meta property="og:title" content="جاد الرب للمحاماة والاستشارات القانونية | JAD ELRAB" />
        <meta property="og:description" content="نحمي استثماراتك وموقفك القانوني بالعلم والخبرة، ونقدم الاستشارات والتمثيل القضائي للأفراد والشركات في جميع أنحاء مصر." />
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
              { "@type": "LegalService", "@id": "https://ostazlaw.vercel.app/#organization", "name": "جاد الرب للمحاماة والاستشارات القانونية", "alternateName": "JAD ELRAB", "description": "مكتب محاماة مصرية مقرها أسوان، تقدم الاستشارات والتمثيل القانوني وصياغة العقود للأفراد والشركات والمستثمرين في مختلف محافظات مصر.", "url": "https://ostazlaw.vercel.app/", "email": "ma.law.firm@outlook.com", "telephone": "+201101076000", "foundingDate": "2005", "areaServed": { "@type": "Country", "name": "مصر" }, "availableLanguage": ["Arabic", "English"], "sameAs": ["https://www.facebook.com/malegal", "https://x.com/mahmoud_a_hamyd", "https://www.linkedin.com/in/mahmoud-abdel-hamid-0a4664374"], "address": { "@type": "PostalAddress", "addressLocality": "أسوان", "addressCountry": "EG" }, "priceRange": "$$" },
              { "@type": "Person", "@id": "https://ostazlaw.vercel.app/#founder", "name": "محمود عبد الحميد جاد الرب", "jobTitle": "المحامي بالنقض والدستورية والإدارية العليا", "worksFor": { "@id": "https://ostazlaw.vercel.app/#organization" }, "url": "/about", "image": { "@type": "ImageObject", "url": "/mahmoud-abdel-hamid-lawyer-portrait.webp", "caption": "الأستاذ محمود عبد الحميد جاد الرب – المحامي بالنقض والدستورية والإدارية العليا" } },
              { "@type": "WebPage", "@id": "https://ostazlaw.vercel.app/#webpage", "url": "https://ostazlaw.vercel.app/", "name": "الصفحة الرئيسية – جاد الرب للمحاماة", "description": "بوابة الوصول إلى خدمات قانونية متخصصة للأفراد والشركات والمستثمرين.", "isPartOf": { "@id": "https://ostazlaw.vercel.app/#website" }, "about": { "@id": "https://ostazlaw.vercel.app/#organization" }, "primaryImageOfPage": { "@type": "ImageObject", "url": "/mahmoud-abdel-hamid-lawyer-portrait.webp", "caption": "الأستاذ محمود عبد الحميد جاد الرب – المحامي بالنقض والدستورية والإدارية العليا" } },
              { "@type": "BreadcrumbList", "@id": "https://ostazlaw.vercel.app/#breadcrumb", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "الرئيسية", "item": "https://ostazlaw.vercel.app/" }] },
              { "@type": "WebSite", "@id": "https://ostazlaw.vercel.app/#website", "name": "جاد الرب للمحاماة والاستشارات القانونية", "url": "https://ostazlaw.vercel.app/", "description": "مكتب محاماة مصرية تقدم استشارات وتمثيلاً قضائياً وحلولاً قانونية." }
            ]
          })
        }} />
      </Head>

      {/* القسم الأول: نعيد ترتيب هوية المكتب كما طلب صاحب الموقع، ثم نضع الرسالة التسويقية بوضوح دون ادعاء التفوق. */}
      <section className="hero" aria-label="الرسالة الرئيسية">
        <div className="hero-bg"><div className="glow"></div><div className="glow-2"></div></div>
        <div className="hero-content">
          <div className="hero-brand-signature">JAD ELRAB</div>
          <h1 className="hero-title"><span>جاد الرب</span><span>للمحاماة والاستشارات القانونية</span></h1>
          <p className="hero-subtitle">محمود عبد الحميد جاد الرب<br />المحامي بالنقض والدستورية والإدارية العليا</p>
          <p className="hero-value">مكتب محاماة نقدم خدمات الاستشارات القانونية والتمثيل القضائي للأفراد والشركات في جميع أنحاء مصر.</p>
          {/* الرسالة التسويقية الأساسية: حماية مصالح العميل بصياغة وجدانية ومهنية، دون وعود بنتيجة أو ادعاء أننا الأفضل. */}
          <p className="hero-protection-message">نحمي استثماراتك وموقفك القانوني بكل ما نملك من علمٍ وخبرة<br /><span>ونساعدك على تفادي النزاع قبل أن يبدأ، وتعزيز مركزك القانوني منذ الخطوة الأولى.</span></p>
          {/* الإجراء الرئيسي واضح، بينما متابعة الملف تبقى مسارًا منفصلًا للعميل الحالي. */}
          <div className="hero-actions">
            {/* الزر الرئيسي بحجم زر متابعة الملف نفسه حتى تكون الدعوة إلى الإجراء واضحة على الهاتف وسطح المكتب. */}
            <Link href="/contact?tab=consult#service-form" className="btn-gold hero-consultation-cta">اطلب استشارة قانونية</Link>
          </div>
          {/* متابعة الملف لا تختلط بطلب الاستشارة، لكنها تبقى ظاهرة لمن لديه علاقة قائمة بالمكتب. */}
          <div className="section-cta"><Link href="/client-inquiry" className="btn-outline-gold case-tracking-cta">عميل للمكتب؟ تابع ملفك لدينا</Link></div>
        </div>
      </section>

      {/* هذا الشريط يثبت عناصر الثقة دون عبارات مثل الأفضل أو الأقوى أو ضمان النتائج. */}
      <section className="trust-bar" aria-label="مرتكزات العمل">
        <div className="trust-bar-inner">
          <div className="trust-item"><Icon name="gavel" /><span>خبرة عملية منذ 2005</span></div>
          <div className="trust-item"><Icon name="briefcase" /><span>فهم للمخاطر قبل الالتزام</span></div>
          <div className="trust-item"><Icon name="scale-balanced" /><span>سرية مهنية ووضوح في التعامل</span></div>
        </div>
      </section>

      {/* هذا هو قسم الخدمات بحسب الفئة: كل بطاقة تتحدث بلغة الاحتياج وتوجه إلى النموذج المناسب. */}
      <section className="section client-segments-section" aria-label="خدماتنا بحسب فئة العميل">
        <div className="section-inner">
          <div className="section-head reveal">
            <span className="eyebrow">● خدماتنا</span>
            <h2>حلول قانونية تبدأ من فهم احتياجك</h2>
            <p>لكل قرار أو مسألة طريقها القانوني. اختر الفئة الأقرب إليك، واتخذ الخطوة الأولى بثقة.</p>
          </div>
          <div className="client-segments-grid">
            {/* الشركات: المسار التجاري، مع إحالة لاحقة إلى نموذج يجمع البريد وواتساب. */}
            <article className="client-segment-card client-segment-business reveal">
              <div className="client-segment-image" role="img" aria-label="مبنى يرمز إلى الشركات والأعمال"></div>
              <div className="client-segment-body">
                <span className="client-segment-kicker">للشركات والمؤسسات</span>
                <h3>نفهم احتياجات الشركات وقراراتها</h3>
                <p>نقدم للشركات والمؤسسات دعمًا قانونيًا يواكب أعمالها، ويساعدها على اتخاذ قرارات أكثر وضوحًا وحماية مصالحها قبل الالتزام.</p>
                <ul><li>استشارات قانونية مستمرة</li><li>دعم اتخاذ القرار القانوني</li><li>مراجعة العقود وتأسيس الشركات</li><li>حماية الاستثمارات والمصالح</li></ul>
                <Link href="/contact?tab=consult&audience=business#service-form" className="btn-outline-gold">ناقش احتياج شركتك <span aria-hidden="true">←</span></Link>
              </div>
            </article>

            {/* المستثمرون: مسار يركز على القرار قبل الشراكة أو الصفقة، وواتساب هو القناة السريعة. */}
            <article className="client-segment-card client-segment-entrepreneurs reveal">
              <div className="client-segment-image" role="img" aria-label="أدوات ترمز إلى الاستثمار وريادة الأعمال"></div>
              <div className="client-segment-body">
                <span className="client-segment-kicker">للمستثمرين ورجال الأعمال</span>
                <h3>وضوح قانوني قبل الاستثمار أو الشراكة</h3>
                <p>نساعد المستثمرين ورجال الأعمال على قراءة الاتفاقات، فهم الالتزامات، وتقدير المخاطر قبل أن تتحول الفرصة إلى التزام.</p>
                <ul><li>مراجعة الاتفاقيات والعقود</li><li>تنظيم الشراكات والعلاقات</li><li>تقييم المخاطر قبل القرار</li></ul>
                <Link href="/contact?tab=consult&audience=investor#service-form" className="btn-outline-gold">تحدث عن مشروعك <span aria-hidden="true">←</span></Link>
              </div>
            </article>

            {/* الأفراد تشمل داخليًا العقارات والملكية والإيجارات دون تقديم ملاك العقارات كتصنيف مستقل. */}
            <article className="client-segment-card client-segment-individuals reveal">
              <div className="client-segment-image" role="img" aria-label="صورة تعبر عن الحقوق والمصالح الشخصية"></div>
              <div className="client-segment-body">
                <span className="client-segment-kicker">للأفراد</span>
                <h3>نوضح لك موقفك قبل خطوتك التالية</h3>
                <p>من عقد أو مستند إلى عقار أو مطالبة أو نزاع، نبدأ من الوقائع كما هي ونساعدك على فهم ما يمكنك فعله.</p>
                <ul><li>العقود والمستندات</li><li>العقارات والملكية والإيجارات</li><li>المطالبات والمنازعات المدنية</li></ul>
                <Link href="/contact?tab=consult&audience=individual#service-form" className="btn-outline-gold">اعرض مسألتك القانونية <span aria-hidden="true">←</span></Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* نبني الثقة بعد أن يفهم الزائر أن له مسارًا مناسبًا، مع اختصار النص الطويل الموجود سابقًا. */}
      <section className="section section-light" aria-label="عن المكتب">
        <div className="section-inner">
          <div className="about-why-grid">
            <div className="about-image reveal">
              <div className="frame"><Image src="/mahmoud-abdel-hamid-lawyer-portrait.webp" alt="الأستاذ محمود عبد الحميد جاد الرب" width={400} height={533} priority className="about-image-inner" /></div>
              <div className="badge">خبرة قانونية منذ 2005</div>
            </div>
            <div className="about-content reveal">
              <span className="eyebrow">● عن المكتب</span>
              <h2>لا تبدأ كل المسائل القانونية من المحكمة،<br /><span className="gold-text">بل تبدأ أحيانًا من فهم ما لديك</span></h2>
              {/* نوضح هنا التميز من خلال طريقة العمل والقيمة المقدمة، لا من خلال ادعاء أننا الأفضل. */}
              <p>مكتب جاد الرب للمحاماة والاستشارات القانونية مقره أسوان، وتمتد خدماته إلى العملاء في جميع محافظات مصر. نؤمن بأن دور المحامي لا يبدأ عند وقوع النزاع فقط؛ بل يبدأ قبل ذلك، بمساعدة العميل على فهم موقفه وحماية حقوقه ومصالحه قبل أن تتعقد المسألة أو تنتقل إلى المحكمة.</p>
              <p>ولهذا نبدأ من الوقائع والمستندات، ونقرأ ما قد يترتب على القرار قبل اتخاذه، ثم نوضح الخيارات والخطوة المناسبة. هدفنا أن يحصل العميل على رؤية قانونية عملية تساعده على حماية استثماره وموقفه القانوني، لا على مشورة عامة منفصلة عن واقعه.</p>
              <p>ومنذ عام <strong>2005</strong>، نعمل وفق هذا النهج، مستندين إلى خبرة عملية وكفاءة في التمثيل القضائي أمام مختلف درجات المحاكم، وصولًا إلى محكمتي النقض والدستورية العليا.</p>
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

      {/* نعرض الخدمات كخريطة مختصرة لمن لا يستطيع تصنيف نفسه ضمن الفئات الثلاث. */}
      <section className="section section-gray" aria-label="مجالات الممارسة القانونية">
        <div className="section-inner">
          <div className="section-head reveal"><span className="eyebrow">● مجالات الممارسة</span><h2>قد تبدأ المسألة من أحد هذه المواضع</h2><p>تتغير الخطوة القانونية باختلاف الوقائع والمستندات، لذلك نبدأ بفهم المسألة قبل تحديد المسار.</p></div>
          <div className="practice-grid">
            <Link href="/specialties" className="practice-link"><div className="practice-card reveal"><div className="icon-wrap"><Icon name="gavel" /></div><h3>المنازعات المدنية</h3><p>العقود، التعويضات، الملكية والإيجارات.</p></div></Link>
            <Link href="/specialties" className="practice-link"><div className="practice-card reveal"><div className="icon-wrap"><Icon name="chart-pie" /></div><h3>المعاملات التجارية</h3><p>الشركات، الشراكات والعقود التجارية.</p></div></Link>
            <Link href="/specialties" className="practice-link"><div className="practice-card reveal"><div className="icon-wrap"><Icon name="building" /></div><h3>الخدمات القانونية للأعمال</h3><p>الهيكلة، الحوكمة وصياغة العقود.</p></div></Link>
            <Link href="/specialties" className="practice-link"><div className="practice-card reveal"><div className="icon-wrap"><Icon name="landmark" /></div><h3>القضاء الإداري</h3><p>القرارات الإدارية والمنازعات الحكومية.</p></div></Link>
            <Link href="/specialties" className="practice-link"><div className="practice-card reveal"><div className="icon-wrap"><Icon name="scale-balanced" /></div><h3>الطعن الدستوري</h3><p>المسائل الدستورية أمام المحكمة المختصة.</p></div></Link>
          </div>
          <div className="section-cta"><Link href="/specialties" className="btn-outline-gold">استعراض مجالات الممارسة</Link></div>
        </div>
      </section>

      {/* هذا القسم يطمئن الزائر إلى أن البداية بسيطة ولا تتطلب تجهيز ملف كامل. */}
      <section className="section section-light" aria-label="كيف نبدأ معك">
        <div className="section-inner">
          <div className="section-head reveal"><span className="eyebrow">● البداية</span><h2>لا تحتاج إلى أن تعرف من أين تبدأ</h2><p>اشرح لنا ما حدث وما الذي تريد الوصول إليه، وسنبدأ بتحديد طبيعة المسألة وما يلزم لفهمها.</p></div>
          <div className="process-timeline">
            <div className="process-step reveal"><span className="num">01</span><div className="step-content"><h4>تشرح ما لديك</h4><p>ترسل بياناتك الأساسية وملخصًا مختصرًا للمسألة، دون الحاجة إلى معرفة اسم الإجراء القانوني.</p></div></div>
            <div className="process-step reveal"><span className="num">02</span><div className="step-content"><h4>نقرأ الصورة القانونية</h4><p>نراجع ما ورد في الطلب ونحدد المعلومات أو المستندات التي قد تساعد على فهمه بصورة أفضل.</p></div></div>
            <div className="process-step reveal"><span className="num">03</span><div className="step-content"><h4>تتضح الخطوة التالية</h4><p>يُحدد مسار التواصل الأنسب: واتساب أو بريد إلكتروني أو اتصال أو طلب موعد بحسب طبيعة المسألة.</p></div></div>
          </div>
          {/* رفع المستند اختياري حتى لا يشعر الزائر أن التواصل متاح فقط لمن يملك ملفًا مكتملًا. */}
          <p className="process-note"><Icon name="paperclip" /> يمكنك إرسال الطلب دون رفع مستند. وإذا كان لديك عقد أو إنذار أو مستند ذو صلة، يمكنك إرفاقه اختياريًا ليساعد في فهم الصورة.</p>
        </div>
      </section>

      {/* العميل الحالي له مسار مستقل وواضح، لكنه لا ينافس CTA اكتساب العميل الجديد. */}
      <section className="section section-gray client-portal-promo" aria-label="متابعة الملف">
        <div className="section-inner section-portal-inner">
          <div><span className="eyebrow">● للعميل الحالي</span><h2>هل لديك ملف لدى المكتب؟</h2><p>تابع آخر التحديثات المتعلقة بملفك باستخدام رقم الهاتف ورمز المتابعة.</p></div>
          <Link href="/client-inquiry" className="btn-outline-gold">متابعة ملفك</Link>
        </div>
      </section>

      {/* المحتوى يثبت المعرفة ويخدم SEO، لكنه يأتي بعد مسار التحويل الأساسي حتى لا يؤخر التواصل. */}
      <section className="section section-light" aria-label="المكتبة القانونية">
        <div className="section-inner">
          <div className="section-head reveal"><span className="eyebrow">● المكتبة القانونية</span><h2>المكتبة القانونية</h2><p>اطلع على أحدث المقالات القانونية.</p></div>
          <div className="blog-grid">{latestArticles.length > 0 ? latestArticles.map((article) => <ArticleCard key={article.slug} article={article} />) : <div className="col-span-full text-center text-charcoal/50 py-10">لا توجد مقالات حالياً.</div>}</div>
          <div className="section-cta"><Link href="/news-archive" className="btn-outline-gold">تصفح المكتبة القانونية</Link></div>
        </div>
      </section>

      {/* الأخبار أقل أولوية من طلب الاستشارة؛ لذلك تبقى مختصرة كدليل نشاط لا كمسار رئيسي. */}
      <section className="section section-gray" aria-label="أخبار المكتب">
        <div className="section-inner">
          <div className="section-head reveal"><span className="eyebrow">● من أخبار المكتب</span><h2>مستجدات من الممارسة القانونية</h2><p>أخبار ومشاركات وتطورات من عمل المكتب ومجاله القانوني.</p></div>
          <div className="experience-grid">{latestNews.length > 0 ? latestNews.map((item) => <NewsCard key={item.slug} news={item} />) : <div className="col-span-full text-center text-charcoal/50 py-10">لا توجد أخبار حالياً.</div>}</div>
          <div className="section-cta"><Link href="/news-archive" className="btn-outline-gold">المزيد من الأخبار والمقالات</Link></div>
        </div>
      </section>

      {/* الموقع الجغرافي يثبت وجود المقر، مع إبقاء الخريطة كسياق للتواصل لا كعنصر تحويل رئيسي. */}
      <section className="map-section" aria-label="موقع المكتب">
        <div className="map-container"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1819.3414902100868!2d32.8988582!3d24.0886561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDA1JzE5LjIiTiAzMsKwNTMnNTUuOSJF!5e0!3m2!1sar!2seg!4v1700000000000!5m2!1sar!2seg" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-cross-origin" title="موقع جاد الرب للمحاماة في أسوان"></iframe></div>
        <div className="map-address"><Icon name="map-marker-alt" /> شارع كسر الحجر، المتفرع من شارع كورنيش النيل، أمام مجمع المحاكم – أسوان، مصر</div>
      </section>

      {/* CTA الختامي يكرر المسارين الفعليين فقط؛ حجز الموعد يبقى خيارًا داخل النموذج لا زرًا منافسًا. */}
      <section className="cta-section" aria-label="ابدأ الخطوة الأولى">
        <div className="section-inner reveal">
          <span className="eyebrow">● الخطوة الأولى</span>
          <h2>هل لديك مسألة قانونية تحتاج إلى فهم واضح؟</h2>
          <p>أرسل ملخصًا مختصرًا لاحتياجك، وسنبدأ من الوقائع ونوجّهك إلى طريقة التواصل المناسبة.</p>
          <div className="cta-actions">
            <Link href="/contact?tab=consult#service-form" className="btn-gold">اعرض مسألتك</Link>
            <a href="https://wa.me/201101076000" target="_blank" rel="noopener noreferrer" className="btn-outline-gold">تحدث معنا عبر واتساب</a>
          </div>
          <Link href="/client-inquiry" className="cta-secondary-link">عميل حالي؟ متابعة ملفك</Link>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  // نحتفظ بآلية جلب المحتوى الحالية وISR حتى لا يؤثر التعديل التحريري على الأخبار والمقالات.
  const articles = await getAllArticles();
  const news = await getAllNews();
  const processedArticles = articles.map((a) => ({ ...a, date: a.date ? new Date(a.date).toISOString() : null }));
  const processedNews = news.map((n) => ({ ...n, date: n.date ? new Date(n.date).toISOString() : null }));
  return { props: { articles: processedArticles, news: processedNews }, revalidate: 60 };
}
