import { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Icon from '../components/Icon';

// الأسئلة والإجابات المنقولة من صفحة التخصصات دون تغيير المحتوى التحريري.
const faqItems = [
  { q: 'ما هي درجات التقاضي التي تمثلون العملاء أمامها؟', a: 'نمثل العملاء أمام جميع درجات التقاضي في مصر، بدءاً من المحاكم الجزئية والابتدائية، مروراً بمحاكم الاستئناف، وصولاً إلى محكمة النقض والمحكمة الدستورية العليا والمحكمة الإدارية العليا.' },
  { q: 'هل تقدمون استشارات قانونية قبل رفع الدعوى؟', a: 'نعم، نؤمن بأن الاستشارة القانونية المبكرة هي خط الدفاع الأول. نقدم تحليلاً قانونياً دقيقاً للوقائع، ونعرض البدائل المتاحة مع بيان الآثار القانونية والمالية لكل خيار.' },
  { q: 'كيف تتعاملون مع سرية معلومات العملاء؟', a: 'نلتزم بأعلى معايير السرية المهنية وفقاً لأخلاقيات مهنة المحاماة. جميع المعلومات والوثائق والبيانات المتعلقة بعملائنا تُحفظ بسرية تامة ولا تُكشف لأي طرف ثالث.' },
  { q: 'كم تستغرق مدة التقاضي في القضايا التي تتبعونها؟', a: 'تختلف مدة التقاضي حسب نوع القضية ودرجة المحكمة. نعمل على تسريع الإجراءات قدر الإمكان مع الالتزام الكامل بالأطر القانونية، ونطلع عملاءنا بانتظام على تطورات قضاياهم.' },
  { q: 'هل تتعاملون مع قضايا التحكيم التجاري؟', a: 'نعم، لدينا خبرة في تمثيل العملاء في إجراءات التحكيم التجاري المحلي والدولي، ونقدم استشارات متخصصة في هذا المجال.' },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Layout>
      <Head>
        <title>الأسئلة الشائعة | مؤسسة جاد الرب للمحاماة والاستشارات القانونية</title>
        <meta name="description" content="إجابات على أكثر الأسئلة التي تهم عملاء مؤسسة جاد الرب للمحاماة والاستشارات القانونية." />
      </Head>

      {/* رأس الصفحة يستخدم نفس الخلفية والهرمية البصرية المعتمدة في الموقع. */}
      <section className="faq-hero" aria-label="الأسئلة الشائعة">
        <div className="faq-hero-pattern" />
        <div className="faq-hero-content">
          <span className="eyebrow">● FAQ</span>
          <h1>الأسئلة <span>الشائعة</span></h1>
          <p>إجابات على أكثر الأسئلة التي تهم عملاءنا.</p>
        </div>
      </section>

      {/* كل سؤال زر مستقل للوصول السهل، مع فتح إجابة واحدة أو إغلاقها عند النقر. */}
      <section className="section section-gray faq-page-section" aria-label="قائمة الأسئلة الشائعة">
        <div className="section-inner">
          <div className="faq-list">
            {faqItems.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <div key={item.q} className={`faq-item ${isActive ? 'active' : ''}`}>
                  <button type="button" className="faq-question" aria-expanded={isActive} onClick={() => setActiveIndex(isActive ? -1 : index)}>
                    <span>{item.q}</span>
                    <span className="icon"><Icon name="chevron-down" /></span>
                  </button>
                  <div className="faq-answer" aria-hidden={!isActive}><p>{item.a}</p></div>
                </div>
              );
            })}
          </div>
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
        .faq-list { max-width: 780px; margin: 0 auto; display: flex; flex-direction: column; gap: 0.6rem; }
        .faq-item { background: var(--pure-white); border-radius: 10px; border: 1px solid rgba(0,0,0,0.04); overflow: hidden; transition: all 0.3s var(--ease-out); box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
        .faq-item:hover, .faq-item.active { border-color: var(--matte-gold); }
        .faq-question { width: 100%; padding: 1rem 1.5rem; display: flex; justify-content: space-between; align-items: center; background: transparent; border: none; color: var(--charcoal); font-size: 0.95rem; font-weight: 700; text-align: right; gap: 1rem; cursor: pointer; }
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
