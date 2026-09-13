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
        <title>مكتب جاد الرب للمحاماة والاستشارات القانونية | JAD ELRAB</title>
        <meta name="description" content="مكتب جاد الرب للمحاماة والاستشارات القانونية بأسوان. نقرأ موقفك القانوني قبل أن تتخذ القرار، ونمثلك أمام القضاء إذا استلزم الأمر ذلك، في مختلف محافظات مصر." />
        {/* SEO: الاسم موحّد الآن كـ"مكتب" اتساقًا مع القرار النهائي بشأن التسمية، بدل "مؤسسة" التي كانت في نسخة سابقة. */}
        <link rel="canonical" href="https://ostazlaw.vercel.app" />
        <meta property="og:title" content="مكتب جاد الرب للمحاماة والاستشارات القانونية | JAD ELRAB" />
        <meta property="og:description" content="نقرأ موقفك القانوني قبل أن تتخذ القرار، ونمثلك أمام القضاء إذا استلزم الأمر ذلك، في مختلف محافظات مصر." />
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
              { "@type": "LegalService", "@id": "https://ostazlaw.vercel.app/#organization", "name": "مكتب جاد الرب للمحاماة والاستشارات القانونية", "alternateName": "JAD ELRAB", "description": "مكتب محاماة مصري مقره أسوان، يقدم الاستشارات والتمثيل القانوني وصياغة العقود للأفراد والشركات والمستثمرين في مختلف محافظات مصر.", "url": "https://ostazlaw.vercel.app/", "email": "ma.law.firm@outlook.com", "telephone": "+201101076000", "foundingDate": "2005", "areaServed": { "@type": "Country", "name": "مصر" }, "availableLanguage": ["Arabic", "English"], "sameAs": ["https://www.facebook.com/malegal", "https://x.com/mahmoud_a_hamyd", "https://www.linkedin.com/in/mahmoud-abdel-hamid-0a4664374"], "address": { "@type": "PostalAddress", "addressLocality": "أسوان", "addressCountry": "EG" }, "priceRange": "$$" },
              { "@type": "Person", "@id": "https://ostazlaw.vercel.app/#founder", "name": "محمود عبد الحميد جاد الرب", "jobTitle": "المحامي بالنقض والدستورية والإدارية العليا", "worksFor": { "@id": "https://ostazlaw.vercel.app/#organization" }, "url": "/about", "image": { "@type": "ImageObject", "url": "/mahmoud-abdel-hamid-lawyer-portrait.webp", "caption": "الأستاذ محمود عبد الحميد جاد الرب – المحامي بالنقض والدستورية والإدارية العليا" } },
              { "@type": "WebPage", "@id": "https://ostazlaw.vercel.app/#webpage", "url": "https://ostazlaw.vercel.app/", "name": "الصفحة الرئيسية – مكتب جاد الرب للمحاماة", "description": "بوابة الوصول إلى خدمات قانونية متخصصة للأفراد والشركات والمستثمرين.", "isPartOf": { "@id": "https://ostazlaw.vercel.app/#website" }, "about": { "@id": "https://ostazlaw.vercel.app/#organization" }, "primaryImageOfPage": { "@type": "ImageObject", "url": "/mahmoud-abdel-hamid-lawyer-portrait.webp", "caption": "الأستاذ محمود عبد الحميد جاد الرب – المحامي بالنقض والدستورية والإدارية العليا" } },
              { "@type": "BreadcrumbList", "@id": "https://ostazlaw.vercel.app/#breadcrumb", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "الرئيسية", "item": "https://ostazlaw.vercel.app/" }] },
              { "@type": "WebSite", "@id": "https://ostazlaw.vercel.app/#website", "name": "مكتب جاد الرب للمحاماة والاستشارات القانونية", "url": "https://ostazlaw.vercel.app/", "description": "مكتب محاماة مصري يقدم استشارات وتمثيلاً قضائياً وحلولاً قانونية." }
            ]
          })
        }} />
      </Head>

      {/* الهيرو: البراند أولاً، ثم الاسم والصفة، ثم جملة تزرع الحاجة دون طلبها صراحة، ثم CTA واحد فقط. */}
      <section className="hero" aria-label="الرسالة الرئيسية">
        <div className="hero-bg"><div className="glow"></div><div className="glow-2"></div></div>
        <div className="hero-content">
          <div className="hero-brand-signature">JAD ELRAB</div>
          <h1 className="hero-title"><span>مكتب جاد الرب</span><span>للمحاماة والاستشارات القانونية</span></h1>
          <p className="hero-subtitle">محمود عبد الحميد جاد الرب<br />المحامي بالنقض والدستورية والإدارية العليا</p>
          {/* جملة القيمة: لا تصف المكتب، بل تصف الفرق بين قرار مدروس وقرار متسرّع - القارئ هو من يستنتج أنه يحتاج هذه القراءة. */}
          <p className="hero-value">ليست كل مسألة تحتاج إلى محكمة، لكنها جميعًا تستحق قراءة قانونية دقيقة قبل أن يُتخذ القرار.</p>
          <p className="hero-protection-message">نقرأ التفاصيل التي قد تفوت غيرنا، ونوضح لك ما يترتب على كل خيار قبل أن تلتزم به<br /><span>فالفارق بين موقف قانوني قوي وآخر هشّ غالبًا ما يُحسم في هذه الخطوة الأولى.</span></p>
          <div className="hero-actions">
            <Link href="/contact?tab=consult#service-form" className="btn-gold hero-consultation-cta">تحدث معنا عن مسألتك</Link>
          </div>
          <div className="section-cta"><Link href="/client-inquiry" className="btn-outline-gold case-tracking-cta">عميل للمكتب؟ تابع ملفك لدينا</Link></div>
        </div>
      </section>

      {/* شريط الثقة: وقائع لا صفات - تواريخ وممارسات، بلا كلمة "الأفضل" أو ما يشبهها. */}
      <section className="trust-bar" aria-label="مرتكزات العمل">
        <div className="trust-bar-inner">
          <div className="trust-item"><Icon name="gavel" /><span>خبرة عملية منذ 2005</span></div>
          <div className="trust-item"><Icon name="briefcase" /><span>قراءة المخاطر قبل الالتزام لا بعده</span></div>
          <div className="trust-item"><Icon name="scale-balanced" /><span>سرية تامة، ولا نُفصح عن ملف عميل لأي غرض</span></div>
        </div>
      </section>

      {/* قسم الفئات: كل بطاقة تصف موقفًا يعيشه القارئ فعلاً، فيرى نفسه فيها قبل أن يُطلب منه أي شيء. */}
      <section className="section client-segments-section" aria-label="خدماتنا بحسب فئة العميل">
        <div className="section-inner">
          <div className="section-head reveal">
            <span className="eyebrow">● أين موقعك؟</span>
            <h2>الأسئلة القانونية نادرًا ما تُطرح في الوقت المناسب</h2>
            <p>غالبًا ما يُكتشف الخطأ بعد وقوعه، لا قبله. هذه هي اللحظات التي يصنع فيها الاستشعار المبكر فارقًا حقيقيًا.</p>
          </div>
          <div className="client-segments-grid">
            <article className="client-segment-card client-segment-business reveal">
              <div className="client-segment-image" role="img" aria-label="مبنى يرمز إلى الشركات والأعمال"></div>
              <div className="client-segment-body">
                <span className="client-segment-kicker">للشركات والمؤسسات</span>
                <h3>القرار الذي تتخذه الآن يقيّد شركتك لاحقًا</h3>
                <p>عقد يُوقَّع دون مراجعة، أو قرار إداري يُتخذ دون سند قانوني، غالبًا ما يظهر أثره بعد فوات وقت التصحيح. نساعد الشركات على رؤية ما لا يظهر في المستند.</p>
                <ul><li>مراجعة العقود قبل التوقيع لا بعده</li><li>دعم اتخاذ القرار بمعرفة الأثر القانوني</li><li>تأسيس الشركات وهيكلتها</li></ul>
                <Link href="/contact?tab=consult&audience=business#service-form" className="btn-outline-gold">ناقش احتياج شركتك <span aria-hidden="true">←</span></Link>
              </div>
            </article>

            <article className="client-segment-card client-segment-entrepreneurs reveal">
              <div className="client-segment-image" role="img" aria-label="أدوات ترمز إلى الاستثمار وريادة الأعمال"></div>
              <div className="client-segment-body">
                <span className="client-segment-kicker">للمستثمرين ورجال الأعمال</span>
                <h3>الفرصة والالتزام كثيرًا ما يتشابهان في البداية</h3>
                <p>قبل أن توقّع على شراكة أو تضع رأس مالك في اتفاق، يستحق الأمر قراءة تفصل بين ما هو مكتوب وما هو ملزم فعلاً.</p>
                <ul><li>قراءة الاتفاقيات قبل الالتزام بها</li><li>تنظيم الشراكات وتحديد الحقوق فيها</li><li>تقدير المخاطر بلغة واضحة لا قانونية معقدة</li></ul>
                <Link href="/contact?tab=consult&audience=investor#service-form" className="btn-outline-gold">تحدث عن مشروعك <span aria-hidden="true">←</span></Link>
              </div>
            </article>

            <article className="client-segment-card client-segment-individuals reveal">
              <div className="client-segment-image" role="img" aria-label="صورة تعبر عن الحقوق والمصالح الشخصية"></div>
              <div className="client-segment-body">
                <span className="client-segment-kicker">للأفراد</span>
                <h3>حقك لا يضيع دفعة واحدة، بل خطوة تلو الأخرى</h3>
                <p>عقد إيجار، ميراث، أو نزاع بدأ صغيرًا وكبُر بمرور الوقت - في كل هذه المواقف، معرفة موقفك القانوني أول خطوة نحو حمايته.</p>
                <ul><li>العقود والمستندات الشخصية</li><li>العقارات والملكية والإيجارات</li><li>المطالبات والمنازعات المدنية</li></ul>
                <Link href="/contact?tab=consult&audience=individual#service-form" className="btn-outline-gold">اعرض مسألتك القانونية <span aria-hidden="true">←</span></Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* قسم "عن المكتب": يبني الثقة بالسرد لا بالادعاء - القارئ يصل بنفسه إلى استنتاج الكفاءة. */}
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
              <p>مكتب جاد الرب للمحاماة والاستشارات القانونية مقره أسوان، وتمتد خدماته إلى عملاء في مختلف محافظات مصر. نرى أن دور المحامي الحقيقي يبدأ قبل النزاع لا بعده - في اللحظة التي يُفهم فيها الموقف بدقة، وتُحمى فيها المصلحة قبل أن تتعقد المسألة.</p>
              <p>نبدأ من الوقائع والمستندات كما هي، ونقرأ ما قد يترتب على كل قرار قبل اتخاذه، ثم نوضح الخيارات المتاحة وأثر كل واحد منها. هذا ما يفرّق بين استشارة عامة وبين رؤية قانونية مبنية على واقع القضية بالفعل.</p>
              <p>ومنذ عام <strong>2005</strong>، نعمل وفق هذا النهج، مستندين إلى خبرة عملية في التمثيل القضائي أمام مختلف درجات المحاكم، وصولًا إلى محكمتي النقض والدستورية العليا.</p>
              <div className="about-why-points">
                <span className="point"><Icon name="check-circle" /> مشورة وقائية قبل أن يتحول الخلاف إلى نزاع قضائي.</span>
                <span className="point"><Icon name="check-circle" /> قراءة دقيقة للمستندات قبل، لا بعد، اتخاذ القرار.</span>
                <span className="point"><Icon name="check-circle" /> سرية تامة لبيانات العملاء دون استثناء.</span>
                <span className="point"><Icon name="check-circle" /> تمثيل قضائي أمام أعلى درجات المحاكم.</span>
                <span className="point"><Icon name="check-circle" /> متابعة شخصية لكل ملف حتى نهايته.</span>
              </div>
              <p className="qayd-note"><Icon name="shield-alt" /> حماية بيانات عملائنا جزء لا يتجزأ من العمل القانوني نفسه، ولهذا طوّرنا نظام <strong>Qayd</strong> الداخلي لإدارة الملفات، بدل الاعتماد على برامج جاهزة لا نتحكم في بنيتها.</p>
              <div className="signature">
                <div><div className="name">الأستاذ محمود عبد الحميد جاد الرب</div><div className="title">المحامي بالنقض والدستورية والإدارية العليا</div></div>
                <Link href="/about" className="btn-outline-gold">تعرف على المكتب</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* مجالات الممارسة: عرض محايد وواقعي، القارئ يتعرف على مسألته دون أن يُقال له "احجز الآن". */}
      <section className="section section-gray" aria-label="مجالات الممارسة القانونية">
        <div className="section-inner">
          <div className="section-head reveal"><span className="eyebrow">● مجالات الممارسة</span><h2>قد تبدأ المسألة من أحد هذه المواضع</h2><p>تختلف الخطوة القانونية المناسبة باختلاف الوقائع والمستندات، ولهذا نبدأ دائمًا بفهم المسألة قبل تحديد المسار.</p></div>
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

      {/* البداية: تطمين صريح بأن لا حاجز أمام أول خطوة، وهذا بحد ذاته دافع خفي للتواصل. */}
      <section className="section section-light" aria-label="كيف نبدأ معك">
        <div className="section-inner">
          <div className="section-head reveal"><span className="eyebrow">● البداية</span><h2>لا تحتاج إلى أن تعرف من أين تبدأ</h2><p>اشرح لنا ما حدث وما تريد الوصول إليه، ونتولى نحن تحديد طبيعة المسألة وما يلزم لفهمها.</p></div>
          <div className="process-timeline">
            <div className="process-step reveal"><span className="num">01</span><div className="step-content"><h4>تشرح ما لديك</h4><p>ترسل بياناتك الأساسية وملخصًا مختصرًا للمسألة، دون الحاجة إلى معرفة اسم الإجراء القانوني.</p></div></div>
            <div className="process-step reveal"><span className="num">02</span><div className="step-content"><h4>نقرأ الصورة القانونية</h4><p>نراجع ما ورد في الطلب ونحدد ما قد يلزم من معلومات أو مستندات لفهمه بصورة أدق.</p></div></div>
            <div className="process-step reveal"><span className="num">03</span><div className="step-content"><h4>تتضح الخطوة التالية</h4><p>نحدد سويًا وسيلة التواصل الأنسب - واتساب أو بريد إلكتروني أو موعد - بحسب طبيعة المسألة.</p></div></div>
          </div>
          <p className="process-note"><Icon name="paperclip" /> يمكنك إرسال طلبك دون رفع أي مستند. وإن كان لديك عقد أو إنذار أو مستند ذو صلة، يمكنك إرفاقه اختياريًا ليساعدنا على فهم الصورة بشكل أسرع.</p>
        </div>
      </section>

      {/* قسم العميل الحالي: لا يزاحم مسار العميل الجديد، بل يخدم فئة أخرى بهدوء. */}
      <section className="section section-gray client-portal-promo" aria-label="متابعة الملف">
        <div className="section-inner section-portal-inner">
          <div><span className="eyebrow">● للعميل الحالي</span><h2>هل لديك ملف لدى المكتب؟</h2><p>تابع آخر التحديثات المتعلقة بملفك باستخدام رقم الهاتف ورمز المتابعة.</p></div>
          <Link href="/client-inquiry" className="btn-outline-gold">متابعة ملفك</Link>
        </div>
      </section>

      {/* المكتبة القانونية: تثبت الكفاءة بالمحتوى نفسه لا بوصفه، وتخدم SEO في الوقت ذاته. */}
      <section className="section section-light" aria-label="المكتبة القانونية">
        <div className="section-inner">
          <div className="section-head reveal"><span className="eyebrow">● المكتبة القانونية</span><h2>المكتبة القانونية</h2><p>اطلع على أحدث المقالات القانونية.</p></div>
          <div className="blog-grid">{latestArticles.length > 0 ? latestArticles.map((article) => <ArticleCard key={article.slug} article={article} />) : <div className="col-span-full text-center text-charcoal/50 py-10">لا توجد مقالات حالياً.</div>}</div>
          <div className="section-cta"><Link href="/news-archive" className="btn-outline-gold">تصفح المكتبة القانونية</Link></div>
        </div>
      </section>

      {/* الأخبار: دليل نشاط هادئ، لا مسار تحويل رئيسي. */}
      <section className="section section-gray" aria-label="أخبار المكتب">
        <div className="section-inner">
          <div className="section-head reveal"><span className="eyebrow">● من أخبار المكتب</span><h2>مستجدات من الممارسة القانونية</h2><p>أخبار ومشاركات وتطورات من عمل المكتب ومجاله القانوني.</p></div>
          <div className="experience-grid">{latestNews.length > 0 ? latestNews.map((item) => <NewsCard key={item.slug} news={item} />) : <div className="col-span-full text-center text-charcoal/50 py-10">لا توجد أخبار حالياً.</div>}</div>
          <div className="section-cta"><Link href="/news-archive" className="btn-outline-gold">المزيد من الأخبار والمقالات</Link></div>
        </div>
      </section>

      <section className="map-section" aria-label="موقع المكتب">
        <div className="map-container"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1819.3414902100868!2d32.8988582!3d24.0886561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDA1JzE5LjIiTiAzMsKwNTMnNTUuOSJF!5e0!3m2!1sar!2seg!4v1700000000000!5m2!1sar!2seg" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-cross-origin" title="موقع جاد الرب للمحاماة في أسوان"></iframe></div>
        <div className="map-address"><Icon name="map-marker-alt" /> شارع كسر الحجر، المتفرع من شارع كورنيش النيل، أمام مجمع المحاكم – أسوان، مصر</div>
      </section>

      {/* CTA الختامي: سؤال يفتح الباب لا أمر يدفع للدخول، مع خيار واتساب لمن يفضل التواصل السريع. */}
      <section className="cta-section" aria-label="ابدأ الخطوة الأولى">
        <div className="section-inner reveal">
          <span className="eyebrow">● الخطوة الأولى</span>
          <h2>هل هناك مسألة قانونية تحتاج إلى نظرة واضحة الآن؟</h2>
          <p>أرسل ملخصًا مختصرًا لما تمر به، ونبدأ من الوقائع كما هي، ونوجّهك إلى الطريقة الأنسب للتواصل.</p>
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
  const articles = await getAllArticles();
  const news = await getAllNews();
  const processedArticles = articles.map((a) => ({ ...a, date: a.date ? new Date(a.date).toISOString() : null }));
  const processedNews = news.map((n) => ({ ...n, date: n.date ? new Date(n.date).toISOString() : null }));
  return { props: { articles: processedArticles, news: processedNews }, revalidate: 60 };
}
