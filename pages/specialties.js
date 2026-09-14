import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';
import Icon from '../components/Icon';

const groups = [
  {
    id: 'advisory',
    number: '01',
    icon: 'compass',
    title: 'الاستشارات والوقاية القانونية',
    intro: 'قرارات أوضح قبل أن يتحول الخلاف إلى نزاع.',
    items: [
      { id: 'contracts', icon: 'file-contract', title: 'صياغة ومراجعة العقود', desc: 'صياغة العقود ومراجعتها والتفاوض على بنودها قبل التوقيع.', audience: 'business', specialty: 'صياغة ومراجعة العقود', services: ['عقود البيع والشراء', 'عقود الشراكة والاستثمار', 'مذكرات التفاهم واتفاقيات عدم الإفصاح', 'التفاوض قبل التوقيع'], detail: 'نراجع العقد في ضوء العلاقة التي ينظمها والمخاطر التي قد تظهر أثناء التنفيذ، ونوضح البنود التي تحتاج إلى تعديل أو تفاوض.' },
      { id: 'arbitration', icon: 'handshake', title: 'التحكيم والوساطة', desc: 'بدائل عملية لتسوية النزاعات بوضوح وسرية متى كان ذلك مناسبًا.', audience: 'business', specialty: 'التحكيم والوساطة', services: ['صياغة شرط التحكيم', 'التمثيل في إجراءات التحكيم', 'تنفيذ أحكام المحكمين', 'الوساطة والتسوية الودية'], detail: 'ندرس اتفاق التحكيم وطبيعة النزاع، ثم نوضح المسار الإجرائي المناسب وما يترتب عليه من التزامات ومواعيد.' },
    ],
  },
  {
    id: 'disputes',
    number: '02',
    icon: 'scale-balanced',
    title: 'المنازعات والتمثيل',
    intro: 'دراسة دقيقة للموقف قبل اتخاذ الإجراء أو تولي المتابعة.',
    items: [
      { id: 'civil', icon: 'gavel', title: 'المنازعات المدنية', desc: 'النزاعات المالية والعقارية والتعاقدية والمطالبات المدنية.', audience: 'individual', specialty: 'منازعة مدنية', services: ['التعويضات', 'الملكية والعقارات', 'صحة ونفاذ العقود', 'الطرد والإيجارات', 'المطالبات والمديونيات'], detail: 'نبدأ بفهم الوقائع والمستندات والمركز القانوني، ثم نحدد الخيارات الإجرائية المتاحة بدل البدء في النزاع دون تصور واضح.' },
      { id: 'commercial', icon: 'building', title: 'المنازعات التجارية', desc: 'حماية مصالح الشركات والشركاء والمستثمرين في النزاعات التجارية.', audience: 'business', specialty: 'منازعة تجارية', services: ['منازعات الشركاء', 'الأوراق التجارية', 'التزامات الشركات', 'المطالبات التجارية', 'التمثيل والمتابعة'], detail: 'نحلل العلاقة التجارية والعقود والالتزامات المتبادلة، ونوضح المسار القانوني الأنسب للتفاوض أو التسوية أو التقاضي.' },
      { id: 'criminal', icon: 'shield-alt', title: 'الدفاع الجنائي', desc: 'استشارات وتمثيل قانوني في مراحل التحقيق والمحاكمة والطعن.', audience: 'individual', specialty: 'دفاع جنائي', services: ['الجنح والجنايات', 'الحضور أمام النيابة', 'مذكرات الدفاع', 'القضايا المالية', 'الطعن الجنائي'], detail: 'نتعامل مع المسائل الجنائية بجدية وسرية، ونراجع الوقائع وأدلة الاتهام والإجراءات قبل تحديد نطاق العمل المناسب.' },
      { id: 'labor', icon: 'briefcase', title: 'المنازعات العمالية', desc: 'مسائل العمل وحقوق العامل وصاحب العمل والالتزامات التعاقدية.', audience: 'business', specialty: 'منازعة عمالية', services: ['عقود العمل', 'المستحقات العمالية', 'الفصل وإنهاء الخدمة', 'اللوائح الداخلية', 'إصابات العمل'], detail: 'نساعد على فهم الالتزامات العمالية والوثائق والإجراءات اللازمة، مع مراعاة طبيعة العلاقة بين العامل وصاحب العمل.' },
    ],
  },
  {
    id: 'public',
    number: '03',
    icon: 'landmark',
    title: 'القانون العام ودرجات التقاضي العليا',
    intro: 'خبرة قانونية في المسائل الإدارية والدستورية والطعون العليا.',
    items: [
      { id: 'admin', icon: 'building', title: 'المنازعات الإدارية', desc: 'القرارات الإدارية والعقود الإدارية وحقوق الموظفين والجهات.', audience: 'individual', specialty: 'منازعة إدارية', services: ['إلغاء القرارات الإدارية', 'التعويض ضد الجهات', 'منازعات الموظفين', 'العقود الإدارية', 'متابعة التنفيذ'], detail: 'نراجع القرار أو الإجراء الإداري وأثره والمواعيد المرتبطة به، ثم نوضح المسار القانوني المتاح أمام الجهة المختصة.' },
      { id: 'constitutional', icon: 'university', title: 'المسائل الدستورية', desc: 'دراسة الدفوع والمسائل المرتبطة بدستورية النصوص وتطبيقها.', audience: 'individual', specialty: 'مسألة دستورية', services: ['الدفوع بعدم الدستورية', 'المذكرات القانونية', 'منازعات التنفيذ', 'تفسير النصوص', 'الفحص الدستوري'], detail: 'تحتاج المسائل الدستورية إلى قراءة دقيقة للنصوص والوقائع وأحكام القضاء، ولذلك تبدأ الخدمة بتقييم المسألة قبل تحديد الإجراء.' },
      { id: 'cassation', icon: 'gavel', title: 'الطعن بالنقض', desc: 'إعداد ومراجعة الطعون المدنية والجنائية وفق أسبابها وشروطها.', audience: 'individual', specialty: 'طعن بالنقض', services: ['دراسة الحكم', 'تحديد أسباب الطعن', 'إعداد المذكرات', 'الطعون المدنية والجنائية', 'المتابعة أمام النقض'], detail: 'نراجع الحكم وأسبابه وأوراق الدعوى لتقييم مدى توافر أسباب الطعن وشروطه الشكلية والموضوعية قبل اتخاذ الإجراء.' },
      { id: 'admin_appeal', icon: 'landmark', title: 'الطعون أمام الإدارية العليا', desc: 'استشارات وتمثيل في الطعون أمام المحكمة الإدارية العليا.', audience: 'individual', specialty: 'طعن أمام الإدارية العليا', services: ['دراسة الحكم الإداري', 'إعداد مذكرة الطعن', 'الطعون الإدارية العليا', 'الدفوع الإدارية', 'متابعة الإجراءات'], detail: 'نوضح طبيعة الحكم الإداري وأسباب الطعن والمواعيد والإجراءات اللازمة قبل إعداد المذكرة أو بدء المتابعة.' },
    ],
  },
  {
    id: 'personal',
    number: '04',
    icon: 'users',
    title: 'الأسرة والحقوق الشخصية',
    intro: 'خصوصية واحترام وفهم واضح للحقوق والإجراءات الأسرية.',
    items: [
      { id: 'family', icon: 'users', title: 'الأحوال الشخصية', desc: 'مسائل الأسرة والحقوق الأسرية والإجراءات المرتبطة بها.', audience: 'individual', specialty: 'مسائل الأحوال الشخصية', services: ['الطلاق والخلع والفسخ', 'النفقة', 'الرؤية والحضانة', 'إعلام الوراثة والتركات', 'وثائق الزواج والأسماء'], detail: 'نتعامل مع مسائل الأسرة بخصوصية واحترام، ونوضح الحقوق والإجراءات والخيارات القانونية المتاحة وفق ظروف كل حالة.' },
    ],
  },
];

function contactHref(audience, specialty, type = 'consult') {
  return `/contact?audience=${audience}&tab=${type}&specialty=${encodeURIComponent(specialty)}#service-form`;
}

export default function Specialties() {
  const [activeSpecialty, setActiveSpecialty] = useState(null);
  const toggleSpecialty = (id) => setActiveSpecialty(activeSpecialty === id ? null : id);

  return (
    <Layout>
      <Head>
        <title>التخصصات القانونية | مكتب جاد الرب للمحاماة في أسوان</title>
        <meta name="description" content="مكتب جاد الرب للمحاماة والاستشارات القانونية في أسوان يقدم الاستشارات وصياغة العقود والتمثيل في المنازعات المدنية والتجارية والجنائية والإدارية والأحوال الشخصية والطعون العليا." />
        <link rel="canonical" href="https://ostazlaw.vercel.app/specialties" />
        <meta property="og:title" content="التخصصات القانونية | مكتب جاد الرب للمحاماة في أسوان" />
        <meta property="og:description" content="تعرف على مجالات الممارسة القانونية التي يقدمها مكتب جاد الرب للأفراد والشركات والمستثمرين في مختلف محافظات مصر." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ostazlaw.vercel.app/specialties" />
        <meta property="og:image" content="https://ostazlaw.vercel.app/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://ostazlaw.vercel.app/og-image.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            { '@type': 'LegalService', '@id': 'https://ostazlaw.vercel.app/#organization', name: 'مكتب جاد الرب للمحاماة والاستشارات القانونية', alternateName: 'JAD ELRAB', description: 'مكتب محاماة مقره أسوان ويقدم خدماته للأفراد والشركات والمستثمرين في مختلف محافظات مصر.', url: 'https://ostazlaw.vercel.app/', email: 'ma.law.firm@outlook.com', telephone: '+201101076000', foundingDate: '2005', areaServed: { '@type': 'Country', name: 'مصر' }, address: { '@type': 'PostalAddress', addressLocality: 'أسوان', addressCountry: 'مصر' }, sameAs: ['https://www.facebook.com/malegal', 'https://x.com/mahmoud_a_hamyd', 'https://www.linkedin.com/in/mahmoud-abdel-hamid-0a4664374'] },
            { '@type': 'CollectionPage', '@id': 'https://ostazlaw.vercel.app/specialties#webpage', url: 'https://ostazlaw.vercel.app/specialties', name: 'التخصصات القانونية', description: 'مجالات الممارسة القانونية لدى مكتب جاد الرب للمحاماة والاستشارات القانونية.', isPartOf: { '@id': 'https://ostazlaw.vercel.app/#website' }, about: { '@id': 'https://ostazlaw.vercel.app/#organization' } },
          ],
        }) }} />
      </Head>

      <section className="hero-specialties" aria-label="التخصصات القانونية">
        <div className="hero-pattern" /><div className="hero-glow" /><div className="hero-glow-2" />
        <div className="hero-inner">
          <div className="hero-title-wrap reveal"><span className="en-tag">LEGAL PRACTICE</span><h1>من المسألة الأولى إلى <span className="gold-text">الخطوة المناسبة</span></h1><p className="sub">يقدم مكتب جاد الرب للمحاماة والاستشارات القانونية، مقره أسوان، خدماته للأفراد والشركات والمستثمرين في مختلف محافظات مصر بحسب طبيعة المسألة والجهة المختصة.</p></div>
          <div className="hero-badges"><span className="hero-badge">استشارات ووقاية</span><span className="hero-badge">منازعات وتمثيل</span><span className="hero-badge">طعون عليا</span><span className="hero-badge">أحوال شخصية</span></div>
          <div className="hero-cta"><Link href="/contact#service-form" className="btn-gold">ابدأ بطلب استشارة <Icon name="arrow-left" style={{ marginRight: '8px' }} /></Link></div>
        </div>
      </section>

      <section className="section section-light specialties-intro"><div className="section-inner"><div className="intro-layout reveal"><div><span className="eyebrow">● مجالات الممارسة</span><h2>اختر المجال الأقرب إلى مسألتك</h2></div><p>لا تحتاج إلى معرفة الوصف القانوني الدقيق لما حدث. اقرأ الملخص، واختر المجال الأقرب، ثم اعرض مسألتك ليصل طلبك إلى نموذج التواصل مهيأً بالفئة والتخصص.</p></div></div></section>

      <section className="section section-gray" aria-label="مجالات الممارسة القانونية"><div className="section-inner">
        {groups.map((group) => <section className="specialty-group" key={group.id}>
          <div className="group-heading reveal"><span className="group-number">{group.number}</span><div><span className="eyebrow">● {group.title}</span><h2>{group.title}</h2><p>{group.intro}</p></div></div>
          <div className="specialty-grid">
            {group.items.map((spec, index) => {
              const active = activeSpecialty === spec.id;
              return <article className={`specialty-card ${active ? 'active' : ''} reveal reveal-d${(index % 3) + 1}`} key={spec.id}>
                <button type="button" className="specialty-card-header" onClick={() => toggleSpecialty(spec.id)} aria-expanded={active}>
                  <span className="specialty-icon"><Icon name={spec.icon} /></span><span className="specialty-title"><strong>{spec.title}</strong><small>{spec.desc}</small></span><Icon name="chevron-down" className="toggle-icon" />
                </button>
                <div className="specialty-preview"><span>يشمل:</span>{spec.services.slice(0, 3).map((service) => <span className="preview-item" key={service}><Icon name="check-circle" />{service}</span>)}</div>
                <div className="specialty-details" hidden={!active}><p>{spec.detail}</p><div className="service-list"><h4>الخدمات ذات الصلة</h4><ul>{spec.services.map((service) => <li key={service}><Icon name="check-circle" />{service}</li>)}</ul></div><div className="detail-cta"><Link href={contactHref(spec.audience, spec.specialty, 'consult')} className="btn-gold">اعرض مسألتك</Link><Link href={contactHref(spec.audience, spec.specialty, 'visit')} className="btn-outline-gold">طلب مقابلة في المكتب</Link></div></div>
              </article>;
            })}
          </div>
        </section>)}
      </div></section>

      <section className="section section-light approach-section"><div className="section-inner"><div className="section-head reveal"><span className="eyebrow">● منهج العمل</span><h2>نفهم، ثم نوضح الخطوة التالية</h2><p>لا يبدأ العمل بإجراء قبل فهم الوقائع والمستندات والهدف الذي تريد الوصول إليه.</p></div><div className="approach-timeline">{[['01','نفهم','ندرس الوقائع والهدف.'],['02','نحلل','نراجع المراكز والمخاطر.'],['03','نوضح','نشرح الخيارات والآثار.'],['04','نحدد','نختار الإجراء المناسب.'],['05','نتابع','نبقى على تواصل واضح.']].map(([num,title,text]) => <div className="approach-step reveal" key={num}><span>{num}</span><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>

      <section className="specialties-cta"><div className="section-inner reveal"><span className="eyebrow">● الخطوة الأولى</span><h2>هل لم تجد مسألتك ضمن القائمة؟</h2><p>أرسل ملخصًا لما حدث، وسنبدأ من فهمه وتحديد المسار الأقرب إلى احتياجك.</p><Link href="/contact#service-form" className="btn-gold">اعرض مسألتك الآن <Icon name="arrow-left" style={{ marginRight: '8px' }} /></Link></div></section>

      <style jsx>{`
        .hero-specialties { padding: 135px 2rem 5rem; background: var(--very-dark-navy); position: relative; overflow: hidden; min-height: 66vh; display: flex; align-items: center; }
        .hero-specialties::before { content: ''; position: absolute; inset: 0; z-index: 0; background-image: linear-gradient(90deg, rgba(8,20,38,.82), rgba(8,20,38,.68) 52%, rgba(8,20,38,.52)), url('/specialties-hero.webp'); background-size: cover; background-position: center; opacity: .92; }
        .hero-specialties .hero-pattern { position: absolute; inset: 0; opacity: .03; background-image: radial-gradient(circle at 20% 30%, var(--matte-gold) 1px, transparent 1px), radial-gradient(circle at 80% 70%, var(--matte-gold) 1px, transparent 1px); background-size: 60px 60px; }
        .hero-specialties .hero-glow { position: absolute; width: 60vw; height: 60vw; border-radius: 50%; background: radial-gradient(circle, rgba(176,141,87,.08), transparent 70%); top: -22%; right: -20%; }
        .hero-inner { max-width: 1000px; margin: 0 auto; position: relative; z-index: 1; width: 100%; }.hero-title-wrap { text-align: center; max-width: 900px; margin: auto; }.hero-title-wrap .en-tag { color: var(--matte-gold); opacity: .8; font-size: .65rem; letter-spacing: .38em; }.hero-title-wrap h1 { color: #fff; font-size: clamp(2.25rem, 5vw, 4.3rem); line-height: 1.18; margin: .5rem 0 1rem; }.gold-text { color: var(--matte-gold); }.hero-title-wrap .sub { color: rgba(255,255,255,.7); max-width: 760px; margin: auto; line-height: 2; font-size: 1.05rem; font-weight: 600; }.hero-badges { display: flex; justify-content: center; gap: .5rem; flex-wrap: wrap; margin-top: 1.5rem; }.hero-badge { color: rgba(255,255,255,.82); border: 1px solid rgba(176,141,87,.42); border-radius: 30px; padding: .35rem .8rem; font-size: .68rem; font-weight: 800; }.hero-cta { text-align: center; margin-top: 2rem; }
        .specialties-intro { border-bottom: 1px solid rgba(8,20,38,.06); }.intro-layout { max-width: 980px; margin: auto; display: grid; grid-template-columns: .9fr 1.1fr; gap: 3rem; align-items: center; }.intro-layout h2 { font-size: clamp(1.8rem, 3vw, 2.7rem); line-height: 1.35; margin-top: .4rem; }.intro-layout p { font-size: 1rem; line-height: 2; font-weight: 700; color: var(--charcoal); }
        .specialty-group { margin-bottom: 4rem; }.specialty-group:last-child { margin-bottom: 0; }.group-heading { display: flex; gap: 1.1rem; align-items: flex-start; margin-bottom: 1.3rem; }.group-number { color: var(--matte-gold); font-size: 2.4rem; font-weight: 900; line-height: 1; opacity: .6; }.group-heading h2 { font-size: clamp(1.35rem, 2.3vw, 2rem); margin: .15rem 0 .25rem; }.group-heading p { color: var(--charcoal); font-weight: 700; font-size: .88rem; }
        .specialty-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: .85rem; }.specialty-card { background: var(--pure-white); border: 1px solid rgba(8,20,38,.08); border-radius: 15px; overflow: hidden; box-shadow: 0 5px 20px rgba(8,20,38,.035); transition: box-shadow .3s ease, transform .3s ease, border-color .3s ease; }.specialty-card:hover, .specialty-card.active { border-color: rgba(176,141,87,.55); box-shadow: 0 12px 30px rgba(8,20,38,.08); }.specialty-card-header { width: 100%; border: 0; background: transparent; display: flex; align-items: center; gap: .75rem; padding: 1rem 1.1rem .75rem; text-align: right; cursor: pointer; color: var(--charcoal); }.specialty-icon { flex: 0 0 42px; width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: rgba(176,141,87,.1); color: var(--matte-gold); }.specialty-title { flex: 1; }.specialty-title strong, .specialty-title small { display: block; }.specialty-title strong { font-size: 1rem; line-height: 1.4; }.specialty-title small { color: var(--charcoal); opacity: .7; font-size: .73rem; line-height: 1.5; margin-top: .15rem; font-weight: 700; }.toggle-icon { color: var(--matte-gold); opacity: .6; transition: transform .3s ease; }.specialty-card.active .toggle-icon { transform: rotate(180deg); }.specialty-preview { display: flex; flex-wrap: wrap; gap: .35rem .65rem; padding: 0 1.1rem .95rem 4rem; color: var(--charcoal); font-size: .68rem; font-weight: 800; }.specialty-preview > span:first-child { color: var(--matte-gold); }.preview-item { display: inline-flex; align-items: center; gap: .25rem; }.preview-item .icon-svg { color: var(--matte-gold); font-size: .58rem; }.specialty-details { border-top: 1px solid rgba(8,20,38,.07); padding: 1rem 1.1rem 1.15rem; }.specialty-details > p { color: var(--charcoal); font-weight: 700; font-size: .83rem; line-height: 1.9; margin-bottom: .8rem; }.service-list { background: var(--light-gray); border-radius: 10px; padding: .85rem 1rem; }.service-list h4 { color: var(--matte-gold); font-size: .72rem; margin-bottom: .4rem; }.service-list ul { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: 1fr 1fr; gap: .25rem .7rem; }.service-list li { display: flex; gap: .35rem; align-items: flex-start; font-size: .7rem; line-height: 1.55; font-weight: 700; }.service-list li .icon-svg { color: var(--matte-gold); font-size: .55rem; margin-top: .25rem; }.detail-cta { display: flex; gap: .65rem; flex-wrap: wrap; margin-top: 1rem; }.detail-cta a { font-size: .72rem; padding: .55rem 1rem; }
        .approach-section { border-top: 1px solid rgba(8,20,38,.06); }.approach-timeline { display: grid; grid-template-columns: repeat(5, 1fr); gap: .8rem; }.approach-step { text-align: center; background: var(--pure-white); border: 1px solid rgba(8,20,38,.07); border-radius: 13px; padding: 1.2rem .8rem; }.approach-step span { color: var(--matte-gold); font-size: 1.5rem; font-weight: 900; opacity: .65; }.approach-step h3 { font-size: .9rem; margin: .25rem 0; }.approach-step p { color: var(--charcoal); font-size: .72rem; font-weight: 700; line-height: 1.6; }.specialties-cta { background: var(--very-dark-navy); color: #fff; text-align: center; padding: 4.5rem 2rem; }.specialties-cta h2 { color: #fff; font-size: clamp(1.9rem, 4vw, 3rem); margin: .5rem 0; }.specialties-cta p { color: rgba(255,255,255,.62); font-weight: 600; line-height: 1.9; margin: 0 auto 1.5rem; max-width: 620px; }
        @media (max-width: 900px) { .specialty-grid { grid-template-columns: 1fr; }.approach-timeline { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 640px) { .hero-specialties { padding: 112px 1rem 3.5rem; min-height: auto; }.hero-title-wrap h1 { font-size: clamp(2rem, 9vw, 3rem); }.hero-title-wrap .sub { font-size: .88rem; }.intro-layout { grid-template-columns: 1fr; gap: 1rem; }.group-heading { gap: .7rem; }.group-number { font-size: 1.8rem; }.group-heading h2 { font-size: 1.35rem; }.specialty-preview { padding-right: 1.1rem; padding-left: 1.1rem; }.service-list ul { grid-template-columns: 1fr; }.detail-cta { flex-direction: column; }.detail-cta a { width: 100%; text-align: center; }.approach-timeline { grid-template-columns: 1fr; }.approach-step { display: grid; grid-template-columns: 45px 1fr; text-align: right; align-items: center; }.approach-step span { grid-row: span 2; text-align: center; }.specialties-cta { padding: 3.5rem 1rem; } }
      `}</style>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
