export default function ProcessSection() {
  const steps = [
    { num: '01', title: 'الاستشارة الأولية', desc: 'مناقشة وقائع القضية وتحليل الموقف القانوني وتحديد المسار الأمثل.' },
    { num: '02', title: 'تحليل الملف وإعداد الاستراتيجية', desc: 'جمع المستندات، تحليل الأدلة، وصياغة الدفوع القانونية المناسبة.' },
    { num: '03', title: 'التمثيل القضائي والمتابعة', desc: 'الترافع أمام المحاكم بكفاءة مع متابعة دقيقة لكل جلسة.' },
    { num: '04', title: 'المتابعة حتى الحكم النهائي', desc: 'متابعة القضية حتى صدور الحكم والاستشارة بشأن الطعن عليه إن لزم.' },
  ];

  return (
    <section className="section section-light" aria-label="سير العمل القانوني">
      <div className="section-inner">
        <div className="section-head reveal">
          <span className="eyebrow">● سير العمل</span>
          <h2>مراحل التعاون القانوني</h2>
          <p>رحلة قانونية واضحة ومنظمة، من الاستشارة الأولى إلى الحكم النهائي.</p>
        </div>

        <div className="process-timeline">
          {steps.map((step, index) => (
            <div key={index} className="process-step reveal" style={{ transitionDelay: `${index * 0.08}s` }}>
              <span className="num">{step.num}</span>
              <div className="step-content">
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
