import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Icon from './Icon';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('siteHeader');
      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 50);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && menuOpen) closeMenu();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  return (
    <>
      <header className="site-header" id="siteHeader">
        <div className="header-brand">
          <Link href="/" className="brand-wordmark">
            {/* اسم العلامة التجارية الجديد، مع بقاء اسم المحامي المؤسس في النص المجاور دون تغيير. */}
            <span className="brand-primary">JAD ELRAB</span>
            <span className="brand-secondary">LAW FIRM</span>
          </Link>
          <div className="header-brand-text">
            <span className="name">محمود عبد الحميد</span>
            <span className="sub">المحامي بالنقض والدستورية العليا</span>
          </div>
        </div>
        <nav className="header-nav">
          <Link href="/">الرئيسية</Link>
          <Link href="/about">عن المؤسسة</Link>
          <Link href="/specialties">التخصصات</Link>
          <Link href="/sectors">قطاعات نخدمها</Link>
          {/* تم دمج الأخبار والمكتبة في صفحة واحدة لتقليل تشتت المحتوى مع الحفاظ على مساري المحتوى التفصيليين. */}
          <Link href="/news-archive">الأخبار والمكتبة</Link>
          <Link href="/contact">اتصل بنا</Link>
        </nav>
        <div className="header-actions">
          <button className="menu-toggle" onClick={toggleMenu} aria-label="فتح القائمة">
            <Icon name="bars-staggered" />
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} ref={menuRef}>
        <button className="mobile-menu-close" onClick={closeMenu} aria-label="إغلاق القائمة">
          <Icon name="times" />
        </button>
        <nav>
          <Link href="/" onClick={closeMenu}>الرئيسية</Link>
          <Link href="/about" onClick={closeMenu}>عن المؤسسة</Link>
          <Link href="/specialties" onClick={closeMenu}>التخصصات</Link>
          <Link href="/sectors" onClick={closeMenu}>قطاعات نخدمها</Link>
          {/* توحيد قائمة الهاتف مع الترويسة الرئيسية بعد دمج الأخبار والمكتبة. */}
          <Link href="/news-archive" onClick={closeMenu}>الأخبار والمكتبة</Link>
          <Link href="/contact" onClick={closeMenu}>اتصل بنا</Link>
        </nav>
      </div>
    </>
  );
}
