export default function ProcessSteps() {
  const steps = [
    {
      num: '01',
      title: 'الاستشارة الأولية',
      desc: 'مناقشة وقائع القضية وتحليل الموقف القانوني وتحديد المسار الأمثل.'
    },
    {
      num: '02',
      title: 'تحليل الملف وإعداد الاستراتيجية',
      desc: 'جمع المستندات، تحليل الأدلة، وصياغة الدفوع القانونية المناسبة.'
    },
    {
      num: '03',
      title: 'التمثيل القضائي والمتابعة',
      desc: 'الترافع أمام المحاكم بكفاءة مع متابعة دقيقة لكل جلسة.'
    },
    {
      num: '04',
      title: 'المتابعة حتى الحكم النهائي',
      desc: 'متابعة القضية حتى صدور الحكم والاستشارة بشأن الطعن عليه إن لزم.'
    }
  ];

  return (
    <section className="section section-light" aria-label="مراحل التعاون القانوني">
      <div className="section-inner">
        <div className="section-head reveal">
          <span className="eyebrow">● سير العمل</span>
          <h2>مراحل التعاون القانوني</h2>
          <p>رحلة قانونية واضحة ومنظمة، من الاستشارة الأولى إلى الحكم النهائي.</p>
        </div>
        <div className="process-timeline">
          {steps.map((step) => (
            <div key={step.num} className="process-step reveal">
              <span className="num">{step.num}</span>
              <div className="step-content">
                <h3>{step.title}</h3> {/* تم تغيير h4 إلى h3 */}
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .section {
          padding: 5rem 2rem;
        }
        .section-light {
          background: var(--warm-off-white);
        }
        .section-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .section-head {
          text-align: center;
          margin-bottom: 3rem;
        }
        .section-head .eyebrow {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--matte-gold-light, #D4AF37);
          display: block;
          margin-bottom: 0.4rem;
        }
        .section-head h2 {
          font-family: var(--font-serif);
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 900;
          color: var(--charcoal, #1A1A1A);
          line-height: 1.2;
        }
        .section-head p {
          max-width: 720px;
          margin: 0.6rem auto 0;
          color: var(--text-secondary, #2D2D2D);
          font-weight: 700;
          font-size: 1.05rem;
          line-height: 1.9;
        }
        .process-timeline {
          max-width: 780px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .process-step {
          display: flex;
          align-items: flex-start;
          gap: 1.2rem;
          padding: 1.2rem 1.8rem;
          background: var(--pure-white);
          border-radius: 10px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          transition: all 0.4s var(--ease-out);
          position: relative;
          cursor: default;
        }
        .process-step::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 0;
          height: 3px;
          background: var(--matte-gold-light, #D4AF37);
          transition: width 0.6s var(--ease-out);
          border-radius: 0 0 10px 10px;
        }
        .process-step:hover::after {
          width: 100%;
        }
        .process-step:hover {
          border-color: var(--matte-gold-light, #D4AF37);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          transform: translateX(-4px);
        }
        .process-step .num {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          font-weight: 900;
          color: var(--matte-gold-light, #D4AF37);
          opacity: 0.25;
          line-height: 1;
          min-width: 36px;
          text-align: center;
        }
        .process-step .step-content h3 {
          font-size: 1rem;
          font-weight: 700;
          color: var(--charcoal, #1A1A1A);
          margin-bottom: 0.2rem;
        }
        .process-step .step-content p {
          font-size: 0.95rem;
          color: var(--text-secondary, #2D2D2D);
          font-weight: 700;
          line-height: 1.7;
        }
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s var(--ease-out);
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 640px) {
          .process-step {
            padding: 0.8rem 1rem;
            flex-direction: column;
            align-items: stretch;
            gap: 0.2rem;
          }
          .process-step .num {
            font-size: 1.3rem;
            text-align: right;
            min-width: auto;
          }
        }
      `}</style>
    </section>
  );
}
