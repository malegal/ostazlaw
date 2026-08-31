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
        <title>مؤسسة جاد الرب للمحاماة والاستشارات القانونية | JAD ELRAB</title>
        <meta name="description" content="مؤسسة قانونية مصرية تقدم استشارات، تمثيلاً قضائياً، وحلولاً قانونية للشركات والأفراد. خبرة في النقض والدستورية العليا." />
        <link rel="canonical" href="https://ostazlaw.vercel.app/" />
        <meta property="og:title" content="مؤسسة جاد الرب للمحاماة والاستشارات القانونية | JAD ELRAB" />
        <meta property="og:description" content="بوابة الوصول إلى خدمات قانونية متخصصة: استشارات، تمثيل قضائي، وحلول قانونية للشركات والأفراد." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ostazlaw.vercel.app/" />
        <meta property="og:image" content="/mahmoud-abdel-hamid-lawyer-portrait.webp" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="800" />
        <meta property="og:locale" content="ar_EG" />
        <meta property="og:site_name" content="JAD ELRAB" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/mahmoud-abdel-hamid-lawyer-portrait.webp" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              { "@type": "LegalService", "@id": "https://ostazlaw.vercel.app/#organization", "name": "مؤسسة جاد الرب للمحاماة والاستشارات القانونية", "alternateName": "JAD ELRAB", "description": "مؤسسة قانونية مصرية تقدم استشارات وتمثيلاً قضائياً وحلولاً قانونية للشركات والأفراد.", "url": "https://ostazlaw.vercel.app/", "logo": "/logo.png", "email": "ma.law.firm@outlook.com", "telephone": "+201101076000", "foundingDate": "2005", "areaServed": { "@type": "Country", "name": "مصر" }, "availableLanguage": ["Arabic", "English"], "sameAs": ["https://www.facebook.com/malegal", "https://x.com/mahmoud_a_hamyd", "https://www.linkedin.com/in/mahmoud-abdel-hamid-0a4664374"], "address": { "@type": "PostalAddress", "addressLocality": "أسوان", "addressCountry": "مصر" }, "priceRange": "$$" },
              { "@type": "Person", "@id": "https://ostazlaw.vercel.app/#founder", "name": "محمود عبد الحميد", "jobTitle": "المحامي بالنقض والدستورية العليا", "worksFor": { "@id": "https://ostazlaw.vercel.app/#organization" }, "url": "/about", "image": { "@type": "ImageObject", "url": "/mahmoud-abdel-hamid-lawyer-portrait.webp", "caption": "الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا" } },
              { "@type": "WebPage", "@id": "https://ostazlaw.vercel.app/#webpage", "url": "https://ostazlaw.vercel.app/", "name": "الصفحة الرئيسية – مؤسسة جاد الرب للمحاماة", "description": "بوابة الوصول إلى خدمات قانونية متخصصة: استشارات، تمثيل قضائي، وحلول قانونية.", "isPartOf": { "@id": "https://ostazlaw.vercel.app/#website" }, "about": { "@id": "https://ostazlaw.vercel.app/#organization" }, "primaryImageOfPage": { "@type": "ImageObject", "url": "/mahmoud-abdel-hamid-lawyer-portrait.webp", "caption": "الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا" } },
              { "@type": "BreadcrumbList", "@id": "https://ostazlaw.vercel.app/#breadcrumb", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "الرئيسية", "item": "https://ostazlaw.vercel.app/" }] },
              { "@type": "WebSite", "@id": "https://ostazlaw.vercel.app/#website", "name": "مؤسسة جاد الرب للمحاماة والاستشارات القانونية", "url": "https://ostazlaw.vercel.app/", "description": "مؤسسة قانونية مصرية تقدم استشارات وتمثيلاً قضائياً وحلولاً قانونية." }
            ]
          })
        }} />
      </Head>

      <section className="hero" aria-label="الصفحة الرئيسية">
        <div className="hero-bg"><div className="glow"></div><div className="glow-2"></div></div>
        <div className="hero-content">
          <div className="hero-brand-signature">JAD ELRAB</div>
          <h1 className="hero-title">مؤسسة جاد الرب</h1>
          <p className="hero-subtitle">للمحاماة والاستشارات القانونية</p>
          {/* صياغة ترويجية تركز على المنهج القانوني وحماية المصالح دون وعود بنتيجة قضائية مضمونة. */}
          <p className="hero-value">نقدم خدمات قانونية متخصصة للأفراد والشركات، تقوم على فهم دقيق للوقائع، وتحليل المراكز القانونية، وبناء استراتيجية واضحة لحماية الحقوق والمصالح والاستثمارات.</p>
          <div className="hero-actions">
            <Link href="/contact?tab=consult#service-form" className="hero-action-item gold-underline"><span className="icon-wrap"><Icon name="file-signature" /></span><span className="label">ابدأ باستشارة قانونية</span></Link>
            <Link href="/contact?tab=visit#service-form" className="hero-action-item gold-underline"><span className="icon-wrap"><Icon name="calendar-check" /></span><span className="label">حجز موعد</span></Link>
            <Link href="/contact?tab=representation#service-form" className="hero-action-item gold-underline"><span className="icon-wrap"><Icon name="gavel" /></span><span className="label">تمثيل قضائي</span></Link>
          </div>
          {/* زر متابعة القضية موجود أسفل خدمات الـHero، مع الحفاظ على وجهته الحالية إلى صفحة الاستعلام. */}
          {/* الفئة الإضافية توحّد أبعاد الزر مع زر الاستشارة في صفحة التخصصات، بينما تبقي ألوانه الأساسية كما هي. */}
          <div className="section-cta"><Link href="/client-inquiry" className="btn-outline-gold case-tracking-cta">تابع قضيتك</Link></div>
        </div>
      </section>

      <section className="trust-bar" aria-label="شريط الثقة">
        <div className="trust-bar-inner">
          <div className="trust-item"><Icon name="gavel" /><span>خبرة قانونية منذ 2005</span></div>
          <div className="trust-item"><Icon name="briefcase" /><span>استراتيجيات قانونية وإدارة للمخاطر</span></div>
          <div className="trust-item"><Icon name="scale-balanced" /><span>شريك قانوني للشركات والمستثمرين والأفراد</span></div>
        </div>
      </section>

      <section className="section section-light" aria-label="عن المؤسسة">
        <div className="section-inner">
          <div className="about-why-grid">
            <div className="about-image reveal">
              <div className="frame"><Image src="/mahmoud-abdel-hamid-lawyer-portrait.webp" alt="الأستاذ محمود عبد الحميد" width={400} height={533} priority className="about-image-inner" /></div>
              <div className="badge">خبرة قانونية منذ 2005</div>
            </div>
            <div className="about-content reveal">
              <span className="eyebrow">● المؤسس</span>
              {/* العنوان يبرز الثقة والمنهج العملي بدل الاكتفاء بعبارة ترويجية عامة. */}
              <h2>خبرة قانونية تُبنى عليها الثقة،<br /><span className="gold-text">وحلولٌ تحمي المصالح والاستثمارات</span></h2>
              <p>نؤمن بأن العمل القانوني المتميز يبدأ بفهمٍ عميق للوقائع، وصياغة استراتيجية قانونية دقيقة، ثم تقديم تمثيل قانوني مهني ونزيه يهدف إلى حماية الحقوق والمصالح وتحقيق أفضل النتائج الممكنة. ونؤمن كذلك بأن الثقة لا تُبني باستعراض ملفات العملاء و اعلان نتائج قضاياهم بل تُبنى على الكفاءة والالتزام، وعلي ما نقدمه للعملاء لا ما نعلنه عنهم ؛ لذلك نلتزم بعدم الإفصاح عن أسماء عملائنا أو أرقام قضاياهم أو تفاصيلها أو استخدامها في اغراض تسويقية احترامًا لواجب السرية المهنية وآداب مهنة المحاماة، ونحرص بدلاً من ذلك على أن نقدم ما يمكن التحقق منه من خبراتنا ومؤهلاتنا ومحتوانا العلمي، بما يعكس قيمنا المهنية دون الإخلال بحقوق عملائنا أو التزاماتنا القانونية</p>
              <p>تأسست مؤسسة جاد الرب للمحاماة عام <strong>2005</strong>، وتقوم خبرتها العملية على الفهم الدقيق، والتخطيط القانوني، والمتابعة المهنية.</p>
              <div style={{ background: "rgba(176,141,87,0.05)", padding: "1.2rem 1.5rem", borderRight: "4px solid var(--matte-gold)", borderRadius: "8px", margin: "1.2rem 0" }}>
                <p style={{ margin: 0, fontSize: "1.05rem", lineHeight: "1.9", color: "var(--charcoal)", fontWeight: "700" }}>نركز على القضايا القانونية ذات الأهمية والتعقيد، والتي تتطلب خبرة قانونية متخصصة ورؤية استراتيجية. ونقدم خدماتنا للأفراد والشركات والمستثمرين الباحثين عن تمثيل قانوني احترافي وحلول قانونية فعالة.</p>
              </div>
              <div className="about-why-points">
                <span className="point"><Icon name="check-circle" /> خبرة تمتد لأكثر من عشرين عامًا في التقاضي وصياغة الحلول القانونية.</span>
                <span className="point"><Icon name="check-circle" /> استراتيجيات قانونية مصممة لإدارة المخاطر قبل نشوء النزاعات.</span>
                <span className="point"><Icon name="check-circle" /> تمثيل احترافي أمام جميع درجات التقاضي وصولاً إلى محكمتي النقض والدستورية العليا.</span>
                <span className="point"><Icon name="check-circle" /> خبرة في تقديم الخدمات القانونية للشركات والمستثمرين ورواد الأعمال.</span>
                <span className="point"><Icon name="check-circle" /> التزام كامل بالسرية المهنية والشفافية.</span>
                <span className="point"><Icon name="check-circle" /> حلول قانونية عملية تدعم اتخاذ القرار وتحمي مصالح العملاء.</span>
              </div>
              <div className="signature">
                <div><div className="name">الأستاذ محمود عبد الحميد</div><div className="title">المؤسس – المحامي بالنقض والدستورية العليا</div></div>
                <Link href="/about" className="btn-outline-gold">تعرف على المؤسسة</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-gray" aria-label="مجالات الممارسة القانونية">
        <div className="section-inner">
          <div className="section-head reveal">
            <span className="eyebrow">● الممارسة</span>
            <h2>مجالات الممارسة القانونية</h2>
            <p>نقدم حلولاً قانونية استراتيجية تجمع بين الخبرة القضائية والاستشارات الوقائية وإدارة المخاطر، بما يخدم الأفراد والشركات في مختلف القطاعات.</p>
          </div>
          <div className="practice-grid">
            <Link href="/specialties" className="practice-link"><div className="practice-card reveal"><div className="icon-wrap"><Icon name="gavel" /></div><h3>المنازعات المدنية</h3><p>قضايا العقود، التعويضات، الملكية والإيجارات.</p></div></Link>
            <Link href="/specialties" className="practice-link"><div className="practice-card reveal"><div className="icon-wrap"><Icon name="chart-pie" /></div><h3>القانون التجاري</h3><p>الشركات، العقود التجارية، والأوراق المالية.</p></div></Link>
            <Link href="/specialties" className="practice-link"><div className="practice-card reveal"><div className="icon-wrap"><Icon name="building" /></div><h3>الخدمات القانونية للشركات</h3><p>هيكلة الشركات، الحوكمة، وصياغة العقود.</p></div></Link>
            <Link href="/specialties" className="practice-link"><div className="practice-card reveal"><div className="icon-wrap"><Icon name="landmark" /></div><h3>القضاء الإداري</h3><p>الطعن في القرارات الإدارية والمنازعات الحكومية.</p></div></Link>
            <Link href="/specialties" className="practice-link"><div className="practice-card reveal"><div className="icon-wrap"><Icon name="scale-balanced" /></div><h3>الطعن الدستوري</h3><p>الدفع بعدم دستورية القوانين أمام المحكمة الدستورية العليا.</p></div></Link>
          </div>
          <div className="section-cta"><Link href="/specialties" className="btn-outline-gold">استعراض جميع التخصصات</Link></div>
        </div>
      </section>

      <section className="section section-light" aria-label="سير العمل القانوني">
        <div className="section-inner">
          <div className="section-head reveal"><span className="eyebrow">● سير العمل</span><h2>مراحل التعاون القانوني</h2><p>رحلة قانونية واضحة ومنظمة، من الاستشارة الأولى إلى الحكم النهائي.</p></div>
          <div className="process-timeline">
            <div className="process-step reveal"><span className="num">01</span><div className="step-content"><h4>الاستشارة الأولية</h4><p>مناقشة وقائع القضية وتحليل الموقف القانوني وتحديد المسار الأمثل.</p></div></div>
            <div className="process-step reveal"><span className="num">02</span><div className="step-content"><h4>تحليل الملف وإعداد الاستراتيجية</h4><p>جمع المستندات، تحليل الأدلة، وصياغة الدفوع القانونية المناسبة.</p></div></div>
            <div className="process-step reveal"><span className="num">03</span><div className="step-content"><h4>التمثيل القضائي والمتابعة</h4><p>الترافع أمام المحاكم بكفاءة مع متابعة دقيقة لكل جلسة.</p></div></div>
            <div className="process-step reveal"><span className="num">04</span><div className="step-content"><h4>المتابعة حتى الحكم النهائي</h4><p>متابعة القضية حتى صدور الحكم والاستشارة بشأن الطعن عليه إن لزم.</p></div></div>
          </div>
        </div>
      </section>

      <section className="section section-gray" aria-label="القطاعات التي نخدمها">
        <div className="section-inner">
          <div className="section-head reveal"><span className="eyebrow">● القطاعات</span><h2>القطاعات التي نخدمها</h2><p>ندرك أن لكل قطاع تحدياته القانونية الخاصة، لذلك نقدم حلولاً قانونية تتوافق مع طبيعة النشاط وتدعم أهدافه التجارية والاستثمارية.</p></div>
          <div className="experience-grid">
            <Link href="/sectors" className="sector-link"><div className="experience-card reveal"><span className="icon"><Icon name="building" /></span><h4>قطاع الشركات</h4><p>هيكلة الشركات، الحوكمة، وصياغة العقود التجارية.</p></div></Link>
            <Link href="/sectors" className="sector-link"><div className="experience-card reveal"><span className="icon"><Icon name="handshake" /></span><h4>القطاع التجاري</h4><p>صياغة ومراجعة العقود التجارية والمدنية.</p></div></Link>
            <Link href="/sectors" className="sector-link"><div className="experience-card reveal"><span className="icon"><Icon name="gavel" /></span><h4>قطاع التعويضات</h4><p>المطالبة بالتعويضات المادية والأدبية عن الأضرار.</p></div></Link>
          </div>
        </div>
      </section>

      <section className="section section-gray" aria-label="أخبار وإنجازات المؤسسة">
        <div className="section-inner">
          <div className="section-head reveal"><span className="eyebrow">● أخبار المؤسسة</span><h2>آخر الأخبار والمستجدات</h2><p>نوافيكم بأحدث ما توصلنا إليه من أحكام، مشاركات مجتمعية، وتطورات مكتبنا القانوني.</p></div>
          <div className="experience-grid">{latestNews.length > 0 ? latestNews.map((item) => <NewsCard key={item.slug} news={item} />) : <div className="col-span-full text-center text-charcoal/50 py-10">لا توجد أخبار حالياً.</div>}</div>
          {/* رابط الأخبار يوجّه إلى صفحة المحتوى الموحّدة التي تضم الأخبار والمكتبة معًا. */}
          <div className="section-cta"><Link href="/news-archive" className="btn-outline-gold">أرشيف الأخبار والإنجازات</Link></div>
        </div>
      </section>

      <section className="section section-light" aria-label="المكتبة القانونية">
        <div className="section-inner">
          <div className="section-head reveal"><span className="eyebrow">● المكتبة القانونية</span><h2>أحدث المقالات القانونية</h2><p>اطلع على أحدث ما ننشره في مجال القانون المصري.</p></div>
          <div className="blog-grid">{latestArticles.length > 0 ? latestArticles.map((article) => <ArticleCard key={article.slug} article={article} />) : <div className="col-span-full text-center text-charcoal/50 py-10">لا توجد مقالات حالياً.</div>}</div>
          {/* يبقى النص كما هو، لكن الوجهة أصبحت الصفحة الموحّدة للأخبار والمكتبة. */}
          <div className="section-cta"><Link href="/news-archive" className="btn-outline-gold">اطلع على المدونة القانونية</Link></div>
        </div>
      </section>

      <section className="map-section" aria-label="موقع المكتب">
        <div className="map-container"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1819.3414902100868!2d32.8988582!3d24.0886561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDA1JzE5LjIiTiAzMsKwNTMnNTUuOSJF!5e0!3m2!1sar!2seg!4v1700000000000!5m2!1sar!2seg" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-cross-origin" title="موقع مؤسسة جاد الرب للمحاماة في أسوان"></iframe></div>
        <div className="map-address"><Icon name="map-marker-alt" /> شارع كسر الحجر، المتفرع من شارع كورنيش النيل، أمام مجمع المحاكم – أسوان، مصر</div>
      </section>

      <section className="cta-section" aria-label="دعوة للتواصل">
        <div className="section-inner reveal">
          <span className="eyebrow">● تواصل معنا</span>
          <h2>ابدأ شراكة قانونية تحمي مصالحك</h2>
          <p>سواء كنت فرداً أو شركة أو مستثمراً، نحن على استعداد لتقديم الدعم القانوني الذي يناسب احتياجاتك ويساعدك على اتخاذ القرار القانوني بثقة.</p>
          <div className="cta-actions">
            <Link href="/contact?tab=visit#service-form" className="btn-gold">حجز موعد استشارة</Link>
            <Link href="/contact?tab=consult#service-form" className="btn-outline-gold">طلب استشارة قانونية</Link>
            <Link href="/contact?tab=representation#service-form" className="btn-outline-navy">طلب تمثيل قانوني</Link>
          </div>
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
