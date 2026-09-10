import Link from 'next/link';
import Icon from './Icon';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h3>مؤسسة جاد الرب</h3>
          <p>للمحاماة والاستشارات القانونية</p>
          {/* يقتصر هذا الصف على الشبكات الاجتماعية؛ الهاتف والبريد والخريطة في قسم الاتصال أدناه. */}
          <div className="social">
            <a href="https://www.facebook.com/malegal" target="_blank" rel="noopener noreferrer" aria-label="صفحة المؤسسة على فيسبوك"><Icon name="facebook-f" /></a>
            <a href="https://x.com/mahmoud_a_hamyd" target="_blank" rel="noopener noreferrer" aria-label="صفحة المؤسسة على إكس"><Icon name="twitter" /></a>
            <a href="https://www.linkedin.com/in/mahmoud-abdel-hamid-0a4664374" target="_blank" rel="noopener noreferrer" aria-label="صفحة الأستاذ محمود عبد الحميد على لينكدإن"><Icon name="linkedin-in" /></a>
          </div>
        </div>
        <div className="footer-col">
          <h4>روابط</h4>
          <Link href="/">الرئيسية</Link>
          <Link href="/about">عن المؤسسة</Link>
          <Link href="/specialties">التخصصات</Link>
          <Link href="/sectors">قطاعات نخدمها</Link>
          {/* رابط واحد للمحتوى التحريري بعد دمج صفحتي الأخبار والمكتبة. */}
          <Link href="/news-archive">الأخبار والمكتبة</Link>
          {/* رابط مباشر لصفحة الأسئلة الشائعة المستقلة. */}
          <Link href="/faq">الأسئلة الشائعة</Link>
          <Link href="/contact">تواصل معنا</Link>
        </div>
        <div className="footer-col">
          <h4>خدمات</h4>
          <Link href="/contact?tab=consult#service-form">استشارة قانونية</Link>
          <Link href="/contact?tab=visit#service-form">حجز موعد</Link>
          <Link href="/contact?tab=representation#service-form">تمثيل قانوني</Link>
          {/* إظهار خدمة متابعة الملفات القانونية داخل الفوتر. */}
          <Link href="/client-inquiry">تابع ملفك لدينا</Link>
        </div>
        <div className="footer-col">
          <h4>اتصال</h4>
          <a href="tel:+201101076000"><Icon name="phone" /> +20 110 107 6000</a>
          <a href="mailto:ma.law.firm@outlook.com"><Icon name="envelope" /> ma.law.firm@outlook.com</a>
          <a href="https://maps.app.goo.gl/inYTfr9Js78JwXqx5" target="_blank" rel="noopener noreferrer"><Icon name="map-marker-alt" /> الموقع الجغرافي</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>جميع الحقوق محفوظة © {new Date().getFullYear()} – مؤسسة جاد الرب للمحاماة والاستشارات القانونية</p>
        <p>JAD ELRAB – هوية مؤسسية فاخرة</p>
      </div>
    </footer>
  );
}
