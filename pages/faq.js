import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import Icon from '../components/Icon';

// أسئلة عملية تساعد الزائر على فهم الخطوة التالية قبل التواصل مع المكتب، دون وعود بنتيجة قضائية محددة.
const faqItems = [
  { q: 'ما الذي أحتاج إلى إرساله قبل طلب الاستشارة؟', a: 'يكفي إرسال ملخص واضح للوقائع، وتحديد المطلوب، وإرفاق المستندات الأساسية إن وجدت. ولا ترسل مستندات حساسة غير ضرورية قبل توجيهك إلى القناة المناسبة.' },
  { q: 'هل يمكن طلب استشارة قبل رفع دعوى؟', a: 'نعم، وتساعد الاستشارة السابقة على رفع الدعوى في تقييم الموقف القانوني، ومعرفة البدائل المتاحة، وتقدير المستندات والخطوات المطلوبة قبل اتخاذ القرار.' },
  { q: 'هل تبدأ الاستشارة بتقييم نهائي للقضية؟', a: 'تبدأ الاستشارة بفهم الوقائع ومراجعة المستندات المتاحة وتحديد المسائل القانونية الأولية. ولا يُعتد برأي نهائي قبل اكتمال البيانات اللازمة ودراسة الملف بصورة مناسبة.' },
  { q: 'هل تحافظ المكتب على سرية بيانات العملاء؟', a: 'نعم، تلتزم المكتب بالحفاظ على سرية المعلومات والمستندات التي يتم استلامها في إطار العمل المهني، ولا تُستخدم بيانات العملاء لأغراض دعائية دون موافقة مناسبة.' },
  { q: 'كيف تتم متابعة القضية؟', a: 'بعد قبول الملف وتحديد وسيلة المتابعة، يتم إطلاع العميل على المستجدات والإجراءات المهمة عبر القنوات المعتمدة، مع مراعاة سرية المعلومات وخصوصية الملف.' },
  { q: 'هل يمكنني متابعة ملفي القانوني إلكترونيًا؟', a: 'إذا كانت خدمة المتابعة الإلكترونية مفعلة لملفك، يمكنك استخدام صفحة «تابع ملفك القانوني» وإدخال البيانات المطلوبة. وفي حال عدم ظهور المعلومات، يُرجى التواصل مع المكتب عبر القنوات الرسمية.' },
  { q: 'هل تمثل المكتب الأفراد والشركات؟', a: 'نعم، تقدم المكتب خدماتها للأفراد والشركات والمستثمرين، بحسب طبيعة الموضوع ودرجة التعقيد والمسار القانوني المطلوب.' },
  { q: 'هل تقدمون خدمات صياغة ومراجعة العقود؟', a: 'نعم، تشمل الخدمات صياغة العقود ومراجعتها وتحليل الالتزامات والمخاطر المحتملة، مع اقتراح التعديلات التي تناسب طبيعة العلاقة أو المعاملة.' },
  { q: 'هل تقدمون خدمات التحكيم والوساطة؟', a: 'نعم، يمكن تقديم الاستشارات والتمثيل في مسائل التحكيم والوساطة بحسب الاتفاق وطبيعة النزاع والجهة المختصة.' },
  { q: 'هل قبول طلب التواصل يعني قبول القضية؟', a: 'لا. إرسال الطلب أو إجراء التواصل الأولي لا يعني قبول التوكيل أو الالتزام بتمثيل القضية. يتم اتخاذ قرار القبول بعد مراجعة المعلومات اللازمة والتأكد من إمكانية تقديم الخدمة.' },
  { q: 'كيف أعرف الخدمة المناسبة لي؟', a: 'ابدأ بوصف مختصر للموضوع والهدف الذي تريد الوصول إليه. بعد مراجعة البيانات الأولية، يمكن توجيهك إلى الاستشارة أو التمثيل أو صياغة العقود أو خدمة المتابعة المناسبة.' },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Layout>
      <Head>
        <title>الأسئلة الشائعة | جاد الرب للمحاماة والاستشارات القانونية</title>
        <meta name="description" content="إجابات على أكثر الأسئلة التي تهم عملاء جاد الرب للمحاماة والاستشارات القانونية." />
        <link rel="canonical" href="https://ostazlaw.vercel.app/faq" />
        <meta property="og:title" content="الأسئلة الشائعة | جاد الرب للمحاماة والاستشارات القانونية" />
        <meta property="og:description" content="إجابات واضحة على الأسئلة التي تسبق طلب الاستشارة أو بدء المتابعة." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ostazlaw.vercel.app/faq" />
        <meta property="og:image" content="https://ostazlaw.vercel.app/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="الأسئلة الشائعة | جاد الرب للمحاماة والاستشارات القانونية" />
        <meta name="twitter:description" content="إجابات واضحة على الأسئلة التي تسبق طلب الاستشارة أو بدء المتابعة." />
        <meta name="twitter:image" content="https://ostazlaw.vercel.app/og-image.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map((item) => ({
              "@type": "Question",
              "name": item.q,
              "acceptedAnswer": { "@type": "Answer", "text": item.a }
            }))
          })
        }} />
      </Head>

      {/* رأس الصفحة يستخدم نفس الخلفية والهرمية البصرية المعتمدة في الموقع. */}
      <section className="faq-hero" aria-label="الأسئلة الشائعة">
        <div className="faq-hero-pattern" />
        <div className="faq-hero-content">
          <span className="eyebrow">● FAQ</span>
          <h1>الأسئلة <span>الشائعة</span></h1>
          <p>إجابات واضحة على الأسئلة التي تسبق طلب الاستشارة أو بدء المتابعة.</p>
        </div>
      </section>

      {/* كل سؤال عنوان h3 يحتوي زرًا؛ هذا يحافظ على الدلالة والوصول دون التضحية بتصميم الأكورديون. */}
      <section className="section section-gray faq-page-section" aria-label="قائمة الأسئلة الشائعة">
        <div className="section-inner">
          {/* تمهيد مختصر يوضح وظيفة الصفحة ويقود الزائر إلى الأسئلة الأكثر عملية. */}
          <p className="faq-intro">إجابات واضحة على الأسئلة التي تسبق طلب الاستشارة أو بدء المتابعة.</p>
          <div className="faq-list">
            {faqItems.map((item, index) => {
              const isActive = activeIndex === index;
              const answerId = `faq-answer-${index}`;
              return (
                <div key={item.q} className={`faq-item ${isActive ? 'active' : ''}`}>
                  <h3 className="faq-heading">
                    <button type="button" className="faq-question" aria-expanded={isActive} aria-controls={answerId} onClick={() => setActiveIndex(isActive ? -1 : index)}>
                      <span>{item.q}</span>
                      <span className="icon"><Icon name="chevron-down" /></span>
                    </button>
                  </h3>
                  <div id={answerId} className="faq-answer" aria-hidden={!isActive}><p>{item.a}</p></div>
                </div>
              );
            })}
          </div>
          {/* دعوة ختامية واحدة تمنع تكرار الأزرار وتحول الزائر إلى قناة التواصل المناسبة. */}
          <div className="section-cta"><Link href="/contact" className="btn-outline-gold">لم تجد إجابتك؟ تواصل معنا</Link></div>
        </div>
      </section>

      <style jsx>{`
        /* تنسيقات الصفحة الجديدة معتمدة على بطاقات وألوان الموقع الأصلية. */
        .faq-hero { padding: 120px 2rem 4rem; background: var(--very-dark-navy); min-height: 45vh; display: flex; align-items: center; position: relative; overflow: hidden; }
        .faq-hero-pattern { position: absolute; inset: 0; opacity: 0.03; background-image: radial-gradient(circle at 20% 30%, var(--matte-gold) 1px, transparent 1px), radial-gradient(circle at 80% 70%, var(--matte-gold) 1px, transparent 1px); background-size: 60px 60px; }
        .faq-hero-content { width: 100%; max-width: 900px; margin: 0 auto; position: relative; z-index: 1; text-align: center; }
        .faq-hero .eyebrow { color: var(--matte-gold); opacity: 0.6; letter-spacing: 0.25em; font-size: 0.7rem; font-weight: 800; }
        .faq-hero h1 { color: #fff; font-size: clamp(2.4rem, 5vw, 4rem); margin: 0.5rem 0; }
        .faq-hero h1 span { color: var(--matte-gold); }
        .faq-hero p { color: rgba(255,255,255,0.6); font-size: 1.05rem; }
        .faq-page-section { min-height: 55vh; }
        .faq-intro { max-width: 780px; margin: 0 auto 1.5rem; color: var(--charcoal); text-align: center; line-height: 1.8; font-weight: 700; }
        .faq-list { max-width: 780px; margin: 0 auto; display: flex; flex-direction: column; gap: 0.6rem; }
        .faq-item { background: var(--pure-white); border-radius: 10px; border: 1px solid rgba(0,0,0,0.04); overflow: hidden; transition: all 0.3s var(--ease-out); box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
        .faq-item:hover, .faq-item.active { border-color: var(--matte-gold); }
        .faq-question { width: 100%; padding: 1rem 1.5rem; display: flex; justify-content: space-between; align-items: center; background: transparent; border: none; color: var(--charcoal); font-size: 0.95rem; font-weight: 700; text-align: right; gap: 1rem; cursor: pointer; }
        .faq-heading { margin: 0; font: inherit; }
        .faq-question:hover { color: var(--matte-gold); }
        .faq-question .icon { flex-shrink: 0; font-size: 0.7rem; color: var(--matte-gold); opacity: 0.5; transition: transform 0.4s var(--ease-out); }
        .faq-item.active .faq-question .icon { transform: rotate(180deg); opacity: 0.9; }
        .faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.5s var(--ease-in-out), padding 0.5s var(--ease-in-out); padding: 0 1.5rem; }
        .faq-item.active .faq-answer { max-height: 280px; padding: 0 1.5rem 1.2rem; }
        .faq-answer p { font-size: 0.85rem; color: var(--charcoal); line-height: 1.8; font-weight: 700; }
        @media (max-width: 640px) { .faq-hero { padding: 100px 1rem 3rem; min-height: 35vh; } .faq-page-section { padding: 2.5rem 1rem; } .faq-question { padding: 0.8rem 1rem; font-size: 0.85rem; } .faq-answer { padding: 0 1rem; } .faq-item.active .faq-answer { padding: 0 1rem 1rem; } }
      `}</style>
    </Layout>
  );
}
