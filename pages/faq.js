import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import Icon from '../components/Icon';

// أسئلة عملية مرتبة وفق رحلة العميل، بإجابات واضحة دون وعود بنتيجة قضائية محددة.
const faqItems = [
  { q: 'كيف أعرف الخدمة القانونية المناسبة لمسألتي؟', a: 'أرسل ملخصًا واضحًا لما حدث وما تريد الوصول إليه. بعد الاطلاع على البيانات الأولية، نوضح لك ما إذا كانت حاجتك إلى استشارة، أو مراجعة مستندات، أو صياغة عقد، أو تمثيل ومتابعة قانونية.' },
  { q: 'كيف أطلب استشارة قانونية من المكتب؟', a: 'يمكنك إرسال طلبك عبر نموذج التواصل في الموقع أو عبر واتساب، مع ذكر الاسم ووسيلة التواصل وملخص مختصر للمسألة. بعد مراجعة البيانات الأولية، نوضح لك الخطوة التالية ووسيلة التواصل الأنسب.' },
  { q: 'ما المعلومات أو المستندات المطلوبة لبدء الاستشارة؟', a: 'يكفي في البداية إرسال الاسم ووسيلة التواصل وملخص واضح للوقائع وما تحتاج إلى معرفته. لا يشترط إرسال مستندات لبدء التواصل، ويمكن إرفاق المستندات الأساسية إذا كانت ستساعد على فهم الموضوع، مع تجنب إرسال مستندات حساسة غير ضرورية قبل توجيهك.' },
  { q: 'ماذا تشمل الاستشارة الأولية المجانية؟', a: 'تهدف الاستشارة الأولية المجانية إلى فهم المسألة بصورة أولية وتحديد طبيعة الاحتياج والخطوة التالية المناسبة. ولا تشمل إعداد المذكرات أو مراجعة ملف كامل أو مباشرة إجراءات قضائية ما لم يتم الاتفاق على نطاق عمل مستقل.' },
  { q: 'هل يمكن طلب استشارة قبل رفع دعوى أو بدء نزاع؟', a: 'نعم. تساعد الاستشارة المبكرة على فهم المركز القانوني، وتقييم البدائل والمخاطر، وتحديد المستندات والخطوات المطلوبة قبل اتخاذ قرار قد يصعب تداركه.' },
  { q: 'هل تبدأ الاستشارة برأي نهائي في القضية؟', a: 'تبدأ الاستشارة بفهم الوقائع ومراجعة البيانات والمستندات المتاحة وتحديد المسائل القانونية الأولية. ولا يصدر رأي نهائي قبل اكتمال المعلومات اللازمة ودراسة الملف بالقدر الذي تتطلبه طبيعته.' },
  { q: 'متى يرد المكتب على طلب التواصل؟', a: 'يحرص المكتب على مراجعة الطلبات والرد عليها في أقرب وقت ممكن خلال ساعات العمل. وقد يختلف وقت الرد بحسب عدد الطلبات وطبيعة المسألة والبيانات المرسلة، ولا يُعد إرسال الطلب وحده حجزًا لموعد أو قبولًا للتوكيل.' },
  { q: 'هل يحافظ المكتب على سرية بيانات العملاء؟', a: 'نعم. يلتزم المكتب بالحفاظ على سرية المعلومات والمستندات التي يتسلمها في إطار العمل المهني، ولا تُستخدم بيانات العملاء لأغراض دعائية دون موافقة مناسبة.' },
  { q: 'كيف يمكنني متابعة ملفي القانوني؟', a: 'يمكن لعملاء المكتب متابعة مستجدات ملفاتهم من خلال صفحة «تابع ملفك القانوني» على الموقع باستخدام البيانات المخصصة لهم. ويستخدم المكتب منظومة Qayd لتنظيم الملفات والإجراءات وتحديث بيانات المتابعة، مع استمرار تطوير أدوات العمل الداخلية بما يحسن سرعة التنظيم ووضوح المتابعة.' },
  { q: 'هل يقدم المكتب خدماته خارج أسوان؟', a: 'مقر مكتب جاد الرب للمحاماة والاستشارات القانونية في أسوان، وتمتد خدماته إلى العملاء في مختلف محافظات مصر بحسب طبيعة المسألة والجهة المختصة.' },
  { q: 'هل يمثل المكتب الأفراد والشركات والمستثمرين؟', a: 'نعم. يقدم المكتب خدماته للأفراد والشركات والمستثمرين ورجال الأعمال، مع تحديد نطاق الخدمة والمسار القانوني بحسب طبيعة الموضوع ودرجة تعقيده.' },
  { q: 'هل يقدم المكتب خدمات قانونية للشركات قبل وقوع النزاع؟', a: 'نعم. تشمل الخدمات الوقائية للشركات مراجعة وصياغة العقود، وتقييم المخاطر القانونية، ومراجعة بعض المعاملات والإجراءات، وتقديم الرأي القانوني قبل اتخاذ القرارات، بحسب طبيعة النشاط والطلب.' },
  { q: 'هل يمكن للشركة طلب مراجعة عقد قبل التوقيع؟', a: 'نعم. يمكن مراجعة العقد قبل التوقيع لتوضيح الالتزامات والحقوق والمخاطر المحتملة، واقتراح التعديلات التي تتناسب مع طبيعة المعاملة ومصلحة الشركة.' },
  { q: 'ما الخدمات القانونية التي تحتاجها الشركات عادة؟', a: 'تختلف الحاجة من شركة إلى أخرى، وقد تشمل تأسيس ومراجعة العلاقات التعاقدية، وصياغة العقود، وتقييم المخاطر، وتسوية المنازعات، ومراجعة الإجراءات والمعاملات، وتقديم المشورة القانونية المرتبطة بالنشاط.' },
  { q: 'هل يقدم المكتب خدمات للمستثمرين ورجال الأعمال؟', a: 'نعم. يقدم المكتب دعمًا قانونيًا للمستثمرين ورجال الأعمال في مراجعة العقود والمعاملات، والمسائل العقارية والاستثمارية، وتقييم المخاطر القانونية، بحسب طبيعة المشروع والوثائق المتاحة.' },
  { q: 'هل يقدم المكتب خدمات في تسجيل العقارات والمنازعات العقارية؟', a: 'نعم. يتعامل المكتب مع المسائل المرتبطة بالملكية والعقارات وتسجيلها والمنازعات الناشئة عنها، بما في ذلك فحص المستندات وتقييم المركز القانوني وتحديد الإجراء المناسب بحسب كل حالة.' },
  { q: 'هل يقدم المكتب خدمات في المنازعات الإدارية والعمالية؟', a: 'نعم. يدرس المكتب المنازعات الإدارية والعمالية بحسب الوقائع والجهة المختصة والمستندات المتاحة، ويحدد بعد المراجعة نطاق الخدمة والمسار القانوني المناسب.' },
  { q: 'هل يقدم المكتب خدمات في الأحوال الشخصية؟', a: 'نعم. يتعامل المكتب مع مسائل الأحوال الشخصية والحقوق الأسرية والإجراءات المرتبطة بها، ومنها الطلاق والخلع والفسخ والنفقة والحضانة والرؤية والميراث والتركات، وفق طبيعة كل حالة ووقائعها ومستنداتها.' },
  { q: 'هل تقدمون خدمات صياغة ومراجعة العقود؟', a: 'نعم. تشمل الخدمات صياغة العقود ومراجعتها وتحليل الالتزامات والمخاطر المحتملة، مع اقتراح التعديلات التي تناسب طبيعة العلاقة أو المعاملة.' },
  { q: 'هل تقدمون خدمات التحكيم والوساطة؟', a: 'نعم. يمكن تقديم الاستشارات والتمثيل في مسائل التحكيم والوساطة بحسب الاتفاق وطبيعة النزاع والجهة المختصة.' },
  { q: 'هل يمكن تحديد موعد لمقابلة المكتب؟', a: 'نعم. يمكنك طلب مقابلة في المكتب وتحديد الوقت الأنسب لك، ويظل الموعد المقترح غير مؤكد إلى أن يتم تأكيده برسالة عبر واتساب أو وسيلة التواصل المعتمدة.' },
  { q: 'كيف يتم تحديد أتعاب الاستشارة أو العمل القانوني؟', a: 'تختلف الأتعاب بحسب طبيعة المسألة ودرجة تعقيدها والوقت المطلوب لدراستها ونطاق العمل المتفق عليه، ويتم توضيح ذلك قبل بدء العمل المهني.' },
  { q: 'هل قبول طلب التواصل يعني قبول القضية؟', a: 'لا. إرسال الطلب أو إجراء التواصل الأولي لا يعني قبول التوكيل أو الالتزام بتمثيل القضية. يتم اتخاذ قرار القبول بعد مراجعة المعلومات اللازمة والتأكد من إمكانية تقديم الخدمة.' },
  { q: 'هل تضمن الاستشارة أو التوكيل نتيجة قضائية معينة؟', a: 'لا يمكن ضمان نتيجة قضائية محددة؛ فالنتيجة تتأثر بالوقائع والمستندات والقواعد القانونية وإجراءات الجهة المختصة. يلتزم المكتب بدراسة المسألة بعناية وتوضيح المركز القانوني والخيارات والمخاطر بقدر ما تسمح به المعلومات المتاحة.' },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Layout>
      <Head>
        <title>الأسئلة الشائعة | جاد الرب للمحاماة والاستشارات القانونية</title>
        <meta name="description" content="إجابات عملية عن الاستشارات القانونية، متابعة الملفات، العقود، العقارات، وخدمات الشركات لدى مكتب جاد الرب للمحاماة والاستشارات القانونية في أسوان ومختلف محافظات مصر." />
        <link rel="canonical" href="https://ostazlaw.vercel.app/faq" />
        <meta property="og:title" content="الأسئلة الشائعة | جاد الرب للمحاماة والاستشارات القانونية" />
        <meta property="og:description" content="إجابات عملية عن الاستشارات القانونية وخدمات الأفراد والشركات والمستثمرين وطرق التواصل والمتابعة." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ostazlaw.vercel.app/faq" />
        <meta property="og:image" content="https://ostazlaw.vercel.app/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="الأسئلة الشائعة | جاد الرب للمحاماة والاستشارات القانونية" />
        <meta name="twitter:description" content="إجابات عملية عن الاستشارات القانونية وخدمات الأفراد والشركات والمستثمرين وطرق التواصل والمتابعة." />
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

      {/* مدخل مختصر يوضح قيمة الصفحة قبل عرض الأسئلة العملية. */}
      <section className="faq-hero" aria-label="الأسئلة الشائعة">
        <div className="faq-hero-pattern" />
        <div className="faq-hero-content">
          <span className="eyebrow">● FAQ</span>
          <h1>الأسئلة <span>الشائعة</span></h1>
          <p>إجابات عملية تساعدك على فهم الاستشارة والخدمة المناسبة والخطوة التالية بثقة ووضوح.</p>
        </div>
      </section>

      {/* كل سؤال عنوان h3 يحتوي زرًا؛ هذا يحافظ على الدلالة والوصول دون التضحية بتصميم الأكورديون. */}
      <section className="section section-gray faq-page-section" aria-label="قائمة الأسئلة الشائعة">
        <div className="section-inner">
          {/* الأسئلة مرتبة وفق رحلة العميل: من التواصل الأولي إلى الخدمة والمتابعة. */}
          <p className="faq-intro">جمعنا أكثر الأسئلة شيوعًا حول الاستشارات القانونية، خدمات الشركات، العقود والعقارات، وطرق التواصل والمتابعة.</p>
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
          <div className="section-cta"><Link href="/contact#service-form" className="btn-outline-gold">لم تجد إجابتك؟ اعرض مسألتك</Link></div>
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
        .faq-item.active .faq-answer { max-height: 520px; padding: 0 1.5rem 1.2rem; }
        .faq-answer p { font-size: 0.85rem; color: var(--charcoal); line-height: 1.8; font-weight: 700; }
        @media (max-width: 640px) { .faq-hero { padding: 100px 1rem 3rem; min-height: 35vh; } .faq-page-section { padding: 2.5rem 1rem; } .faq-question { padding: 0.8rem 1rem; font-size: 0.85rem; } .faq-answer { padding: 0 1rem; } .faq-item.active .faq-answer { max-height: 700px; padding: 0 1rem 1rem; } }
      `}</style>
    </Layout>
  );
}
