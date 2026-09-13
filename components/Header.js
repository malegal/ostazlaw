import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Icon from './Icon';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const menuToggleRef = useRef();

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
  const closeMenu = () => {
    setMenuOpen(false);
    menuToggleRef.current?.focus();
  };

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
            {/* العلامة الإنجليزية تبقى كعنصر بصري، بينما يظهر اسم المحامي كاملًا بالعربية في السطرين التاليين. */}
            <span className="brand-primary">JAD ELRAB</span>
            <span className="brand-secondary">LAW FIRM</span>
          </Link>
          <div className="header-brand-text">
            <span className="name">محمود عبد الحميد جاد الرب</span>
            <span className="sub">المحامي بالنقض والدستورية والإدارية العليا</span>
          </div>
        </div>
        <nav className="header-nav">
          <Link href="/">الرئيسية</Link>
          <Link href="/about">عن المكتب</Link>
          <Link href="/specialties">التخصصات</Link>
          <Link href="/sectors">قطاعات نخدمها</Link>
          {/* تم دمج الأخبار والمكتبة في صفحة واحدة لتقليل تشتت المحتوى مع الحفاظ على مساري المحتوى التفصيليين. */}
          <Link href="/news-archive">الأخبار والمكتبة</Link>
          {/* رابط واضح لصفحة الأسئلة الشائعة الجديدة ضمن التنقل الرئيسي. */}
          <Link href="/faq">الأسئلة الشائعة</Link>
          <Link href="/contact">تواصل معنا</Link>
        </nav>
        <div className="header-actions">
          {/* الهاتف ظاهر في سطح المكتب كإجراء مباشر؛ على الهاتف ينتقل إلى زر عائم لتجنب ازدحام الهيدر. */}
          <a href="tel:+201101076000" className="header-phone" aria-label="اتصل بجاد الرب على الرقم +20 110 107 6000">
            <Icon name="phone" />
            <span dir="ltr">+20 110 107 6000</span>
          </a>
          <button ref={menuToggleRef} className="menu-toggle" onClick={toggleMenu} aria-label="فتح القائمة" aria-expanded={menuOpen} aria-controls="mobile-navigation">
            <Icon name="bars-staggered" />
          </button>
        </div>
      </header>

      <div id="mobile-navigation" className={`mobile-menu ${menuOpen ? 'open' : ''}`} ref={menuRef} role="dialog" aria-modal="true" aria-label="قائمة التنقل">
        <button className="mobile-menu-close" onClick={closeMenu} aria-label="إغلاق القائمة">
          <Icon name="times" />
        </button>
        <nav>
          <Link href="/" onClick={closeMenu}>الرئيسية</Link>
          <Link href="/about" onClick={closeMenu}>عن المكتب</Link>
          <Link href="/specialties" onClick={closeMenu}>التخصصات</Link>
          <Link href="/sectors" onClick={closeMenu}>قطاعات نخدمها</Link>
          {/* توحيد قائمة الهاتف مع الترويسة الرئيسية بعد دمج الأخبار والمكتبة. */}
          <Link href="/news-archive" onClick={closeMenu}>الأخبار والمكتبة</Link>
          {/* توحيد قائمة الهاتف مع قائمة سطح المكتب وإتاحة صفحة FAQ. */}
          <Link href="/faq" onClick={closeMenu}>الأسئلة الشائعة</Link>
          <Link href="/contact" onClick={closeMenu}>تواصل معنا</Link>
        </nav>
      </div>
    </>
  );
}
