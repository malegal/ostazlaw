import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
    <style jsx>{`
      .site-footer {
        background: var(--footer-navy);
        padding: 4rem 2rem 1.5rem;
        color: rgba(255, 255, 255, 0.7);
      }
      .footer-inner {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        gap: 2.5rem;
      }
      .footer-brand h3 {
        font-family: var(--font-serif);
        font-size: 1.2rem;
        font-weight: 700;
        color: #fff;
      }
      .footer-brand p {
        font-size: 0.8rem;
        font-weight: 300;
        margin-top: 0.1rem;
        opacity: 0.7;
      }
      .footer-brand .social {
        display: flex;
        gap: 0.6rem;
        margin-top: 1rem;
      }
      .footer-brand .social a {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.4s var(--ease-out);
        color: rgba(255, 255, 255, 0.6);
        font-size: 0.9rem;
      }
      .footer-brand .social a:hover {
        border-color: var(--matte-gold);
        color: var(--matte-gold);
        transform: translateY(-3px);
      }
      .footer-col h4 {
        font-size: 0.75rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: #fff;
        margin-bottom: 1rem;
      }
      .footer-col a {
        display: block;
        font-size: 0.85rem;
        font-weight: 400;
        padding: 0.25rem 0;
        transition: color 0.3s ease;
        opacity: 0.8;
        position: relative;
      }
      .footer-col a:hover {
        color: var(--matte-gold);
        opacity: 1;
      }
      .footer-bottom {
        max-width: 1200px;
        margin: 2rem auto 0;
        padding-top: 1.2rem;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.8rem;
        font-size: 0.75rem;
        opacity: 0.7;
      }
      @media (max-width: 1024px) {
        .footer-inner { grid-template-columns: 1fr 1fr; gap: 1.8rem; }
      }
      @media (max-width: 640px) {
        .footer-inner { grid-template-columns: 1fr; gap: 1.5rem; }
      }
      `}</style>
      <div className="footer-inner">
      <div className="footer-brand">
      <h3>مؤسسة الأستاذ محمود عبد الحميد</h3>
      <p>للمحاماة والاستشارات القانونية</p>
      <div className="social">
      <a href="https://www.facebook.com/malegal" target="_blank" rel="noopener noreferrer" aria-label="فيسبوك"><i className="fab fa-facebook-f"></i></a>
      <a href="https://x.com/mahmoud_a_hamyd" target="_blank" rel="noopener noreferrer" aria-label="تويتر"><i className="fab fa-twitter"></i></a>
      <a href="https://t.me/mahmoud_a_hamyd" target="_blank" rel="noopener noreferrer" aria-label="تليجرام"><i class="fab fa-telegram-plane"></i></a>
      <a href="https://www.linkedin.com/in/mahmoud-abdel-hamid-0a4664374" target="_blank" rel="noopener noreferrer" aria-label="لينكد إن"><i className="fab fa-linkedin-in"></i></a>
      <a href="mailto:ma.law.firm@outlook.com" aria-label="البريد الإلكتروني"><i className="fas fa-envelope"></i></a>
      </div>
      </div>

      <div className="footer-col">
      <h4>روابط سريعة</h4>
      <Link href="/">الرئيسية</Link>
      <Link href="/about">عن المؤسسة</Link>
      <Link href="/specialties">التخصصات</Link>
      <Link href="/sectors">قطاعات نخدمها</Link>
      <Link href="/news-archive">الأخبار</Link>
      <Link href="/blog">المكتبة</Link>
      <Link href="/client-inquiry">تابع قضيتك</Link>
      <Link href="/contact">اتصل بنا</Link>
      </div>

      <div className="footer-col">
      <h4>خدماتنا</h4>
      <Link href="/contact?tab=appointment">حجز موعد</Link>
      <Link href="/contact?tab=consult">استشارة قانونية</Link>
      <Link href="/contact?tab=representation">تمثيل قانوني</Link>
      </div>

      <div className="footer-col">
      <h4>اتصال</h4>
      <a href="tel:+201101076000"><i className="fas fa-phone" style={{ marginLeft: '6px', opacity: 0.6 }}></i> +20 110 107 6000</a>
      <a href="mailto:ma.law.firm@outlook.com"><i className="fas fa-envelope" style={{ marginLeft: '6px', opacity: 0.6 }}></i> ma.law.firm@outlook.com</a>
      <a href="https://maps.app.goo.gl/inYTfr9Js78JwXqx5" target="_blank" rel="noopener noreferrer"><i className="fas fa-map-marker-alt" style={{ marginLeft: '6px', opacity: 0.6 }}></i> الموقع الجغرافي</a>
      </div>
      </div>

      <div className="footer-bottom">
      <p>جميع الحقوق محفوظة © ٢٠٢٦ – مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية</p>
      <p>OSTAZ LAW</p>
      </div>
      </footer>
  );
}
