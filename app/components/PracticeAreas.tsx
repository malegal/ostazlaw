import Link from 'next/link';

export default function PracticeAreas() {
  const areas = [
    { icon: 'fa-gavel', title: 'المنازعات المدنية', desc: 'قضايا العقود، التعويضات، الملكية والإيجارات.' },
    { icon: 'fa-chart-pie', title: 'القانون التجاري', desc: 'الشركات، العقود التجارية، والأوراق المالية.' },
    { icon: 'fa-building', title: 'الخدمات القانونية للشركات', desc: 'هيكلة الشركات، الحوكمة، وصياغة العقود.' },
    { icon: 'fa-landmark', title: 'القضاء الإداري', desc: 'الطعن في القرارات الإدارية والمنازعات الحكومية.' },
    { icon: 'fa-scale-balanced', title: 'الطعن الدستوري', desc: 'الدفع بعدم دستورية القوانين أمام المحكمة الدستورية العليا.' },
  ];

  return (
    <section className="section section-gray" aria-label="مجالات الممارسة القانونية">
      <div className="section-inner">
        <div className="section-head reveal">
          <span className="eyebrow">● الممارسة</span>
          <h2>مجالات الممارسة القانونية</h2>
          <p>نقدم حلولاً قانونية متكاملة في التخصصات التالية، بدءاً من الاستشارة وصولاً إلى التمثيل القضائي.</p>
        </div>

        <div className="practice-grid">
          {areas.map((area, index) => (
            <Link key={index} href="/specialties" className="practice-link">
              <div className="practice-card reveal" style={{ transitionDelay: `${index * 0.05}s` }}>
                <div className="icon-wrap">
                  <i className={`fas ${area.icon}`}></i>
                </div>
                <h3>{area.title}</h3>
                <p>{area.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="section-cta">
          <Link href="/specialties" className="btn-outline-gold">استعراض جميع التخصصات</Link>
        </div>
      </div>
    </section>
  );
}
