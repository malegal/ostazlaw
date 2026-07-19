import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleButtonRef = useRef(null);

  // تأثير التمرير لإضافة خلفية شفافة
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // التركيز على القائمة عند الفتح
    if (!menuOpen) {
      setTimeout(() => menuRef.current?.focus(), 100);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    // إعادة التركيز على زر القائمة عند الإغلاق
    setTimeout(() => toggleButtonRef.current?.focus(), 100);
  };

  // إغلاق القائمة بالضغط على Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && menuOpen) closeMenu();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);

  // منع تمرير الصفحة عند فتح القائمة
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/about', label: 'عن المؤسسة' },
    { href: '/specialties', label: 'التخصصات' },
    { href: '/sectors', label: 'قطاعات نخدمها' },
    { href: '/news-archive', label: 'الأخبار' },
    { href: '/blog', label: 'المكتبة' },
    { href: '/client-inquiry', label: 'تابع قضيتك' },
    { href: '/contact', label: 'اتصل بنا' },
  ];

  return (
    <>
      <header id="siteHeader" className="site-header" role="banner">
        <div className="container header-inner">
          {/* ===== الشعار ===== */}
          <div className="header-logo">
            <Link href="/" aria-label="الرئيسية - مؤسسة الأستاذ محمود عبد الحميد">
              <span className="logo-text">OSTAZ LAW</span>
              <span className="logo-sub">محمود عبد الحميد <br />المحامي بالنقض والدستورية العليا</span>
            </Link>
          </div>

          {/* ===== زر فتح/إغلاق القائمة للهواتف ===== */}
          <button
            ref={toggleButtonRef}
            className="menu-toggle"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
            aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          {/* ===== القائمة الرئيسية (سطح المكتب) ===== */}
          <nav className="nav-desktop" aria-label="القائمة الرئيسية">
            <ul className="nav-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ===== القائمة المنبثقة للهواتف (دور dialog) ===== */}
        <div
          ref={menuRef}
          id="mobileMenu"
          className={`mobile-menu ${menuOpen ? 'open' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="القائمة الرئيسية"
          tabIndex="-1"
        >
          <div className="mobile-menu-header">
            <span className="mobile-menu-title">القائمة</span>
            <button
              className="mobile-menu-close"
              onClick={closeMenu}
              aria-label="إغلاق القائمة"
            >
              ✕
            </button>
          </div>
          <nav aria-label="القائمة الرئيسية للهواتف">
            <ul className="mobile-nav-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={closeMenu}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ===== طبقة خلفية داكنة عند فتح القائمة ===== */}
        {menuOpen && (
          <div
            className="mobile-overlay"
            onClick={closeMenu}
            aria-hidden="true"
          ></div>
        )}
      </header>

      <style jsx>{`
        /* ===== الهوية البصرية ===== */
        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: transparent;
          transition: background 0.3s ease, box-shadow 0.3s ease;
          padding: 0.5rem 0;
        }
        .site-header.scrolled {
          background: var(--very-dark-navy, #0B111B);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }
        .header-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .header-logo a {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }
        .logo-text {
          font-family: 'Amiri', serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--matte-gold, #B08D57);
          letter-spacing: 1px;
        }
        .logo-sub {
          font-size: 0.7rem;
          color: var(--warm-off-white, #FAFAF8);
          opacity: 0.8;
          line-height: 1.3;
          display: none;
        }
        @media (min-width: 768px) {
          .logo-sub { display: block; }
        }

        /* ===== القائمة سطح المكتب ===== */
        .nav-desktop {
          display: none;
        }
        @media (min-width: 992px) {
          .nav-desktop { display: block; }
          .menu-toggle { display: none; }
        }
        .nav-list {
          display: flex;
          gap: 1.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-list a {
          color: var(--warm-off-white, #FAFAF8);
          font-size: 0.95rem;
          font-weight: 500;
          transition: color 0.3s ease;
          text-decoration: none;
          padding: 0.5rem 0;
          border-bottom: 2px solid transparent;
        }
        .nav-list a:hover,
        .nav-list a:focus-visible {
          color: var(--matte-gold, #B08D57);
          border-bottom-color: var(--matte-gold, #B08D57);
        }

        /* ===== زر الهامبرغر ===== */
        .menu-toggle {
          display: flex;
          flex-direction: column;
          gap: 5px;
          background: transparent;
          border: none;
          padding: 10px 5px;
          cursor: pointer;
          z-index: 1100;
        }
        .hamburger-line {
          width: 28px;
          height: 3px;
          background: var(--warm-off-white, #FAFAF8);
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .menu-toggle[aria-expanded="true"] .hamburger-line:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        .menu-toggle[aria-expanded="true"] .hamburger-line:nth-child(2) {
          opacity: 0;
        }
        .menu-toggle[aria-expanded="true"] .hamburger-line:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        /* ===== القائمة المنبثقة للهواتف ===== */
        .mobile-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: 85%;
          max-width: 360px;
          height: 100vh;
          background: var(--very-dark-navy, #0B111B);
          padding: 2rem 1.5rem;
          transition: right 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 1050;
          overflow-y: auto;
          box-shadow: -8px 0 30px rgba(0, 0, 0, 0.5);
        }
        .mobile-menu.open {
          right: 0;
        }
        .mobile-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(176, 141, 87, 0.3);
        }
        .mobile-menu-title {
          font-family: 'Amiri', serif;
          font-size: 1.4rem;
          color: var(--matte-gold, #B08D57);
        }
        .mobile-menu-close {
          background: transparent;
          border: none;
          color: var(--warm-off-white, #FAFAF8);
          font-size: 1.8rem;
          cursor: pointer;
          padding: 0 8px;
          transition: transform 0.3s ease;
        }
        .mobile-menu-close:hover {
          transform: rotate(90deg);
        }
        .mobile-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .mobile-nav-list li {
          margin-bottom: 0.25rem;
        }
        .mobile-nav-list a {
          display: block;
          padding: 0.8rem 1rem;
          color: var(--warm-off-white, #FAFAF8);
          font-size: 1.1rem;
          border-radius: 8px;
          transition: background 0.2s ease, color 0.2s ease;
          text-decoration: none;
        }
        .mobile-nav-list a:hover,
        .mobile-nav-list a:focus-visible {
          background: rgba(176, 141, 87, 0.15);
          color: var(--matte-gold, #B08D57);
        }
        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: 1040;
          backdrop-filter: blur(4px);
        }

        /* ===== تحسين التباين والتركيز ===== */
        .nav-list a:focus-visible,
        .mobile-nav-list a:focus-visible,
        .menu-toggle:focus-visible,
        .mobile-menu-close:focus-visible {
          outline: 3px solid var(--matte-gold, #B08D57);
          outline-offset: 2px;
        }
      `}</style>
    </>
  );
}
