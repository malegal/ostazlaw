import Link from 'next/link';
import { useState, useEffect, useCallback, useRef } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const toggleButtonRef = useRef(null);

  // تحسين التمرير باستخدام requestAnimationFrame لتجنب Forced Reflow
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
    if (!menuOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => menuRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      setTimeout(() => toggleButtonRef.current?.focus(), 100);
    }
  }, [menuOpen]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    document.body.style.overflow = '';
    setTimeout(() => toggleButtonRef.current?.focus(), 100);
  }, []);

  // إغلاق القائمة بالضغط على Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && menuOpen) closeMenu();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuOpen, closeMenu]);

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`} id="siteHeader" role="banner" aria-label="رأس الموقع">
        <div className="header-brand">
          <Link href="/" className="brand-wordmark" aria-label="الرئيسية - مؤسسة الأستاذ محمود عبد الحميد">
            <span className="brand-primary">OSTAZ</span>
            <span className="brand-secondary">LAW FIRM</span>
          </Link>
          <div className="header-brand-text">
            <span className="name">محمود عبد الحميد</span>
            <span className="sub">المحامي بالنقض والدستورية العليا</span>
          </div>
        </div>
        <nav className="header-nav" aria-label="القائمة الرئيسية">
          <Link href="/">الرئيسية</Link>
          <Link href="/about">عن المؤسسة</Link>
          <Link href="/specialties">التخصصات</Link>
          <Link href="/sectors">قطاعات نخدمها</Link>
          <Link href="/news-archive">الأخبار</Link>
          <Link href="/blog">المكتبة</Link>
          <Link href="/client-inquiry">تابع قضيتك</Link>
          <Link href="/contact">اتصل بنا</Link>
        </nav>
        <div className="header-actions">
          <button
            ref={toggleButtonRef}
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
          >
            <i className="fas fa-bars-staggered"></i>
          </button>
        </div>
      </header>

      <div
        ref={menuRef}
        className={`mobile-menu ${menuOpen ? 'open' : ''}`}
        id="mobileMenu"
        role="dialog"
        aria-modal="true"
        aria-label="القائمة الرئيسية"
        aria-labelledby="mobileMenuTitle"
        tabIndex="-1"
      >
        <button
          className="mobile-menu-close"
          onClick={closeMenu}
          aria-label="إغلاق القائمة"
        >
          <i className="fas fa-times"></i>
        </button>
        <nav aria-label="القائمة الرئيسية للهواتف">
          <span id="mobileMenuTitle" className="sr-only">القائمة الرئيسية</span>
          <Link href="/" onClick={closeMenu}>الرئيسية</Link>
          <Link href="/about" onClick={closeMenu}>عن المؤسسة</Link>
          <Link href="/specialties" onClick={closeMenu}>التخصصات</Link>
          <Link href="/sectors" onClick={closeMenu}>قطاعات نخدمها</Link>
          <Link href="/news-archive" onClick={closeMenu}>الأخبار</Link>
          <Link href="/blog" onClick={closeMenu}>المكتبة</Link>
          <Link href="/client-inquiry" onClick={closeMenu}>تابع قضيتك</Link>
          <Link href="/contact" onClick={closeMenu}>اتصل بنا</Link>
        </nav>
      </div>

      <style jsx>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        .site-header {
          position: fixed;
          top: 0;
          right: 0;
          left: 0;
          z-index: 1000;
          padding: 0 2rem;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--very-dark-navy);
          border-bottom: 1px solid rgba(176, 141, 87, 0.08);
          transition: background 0.5s var(--ease-out), height 0.5s var(--ease-out), box-shadow 0.5s var(--ease-out);
        }
        .site-header.scrolled {
          background: rgba(11, 17, 27, 0.96);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          height: 68px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
        }
        .header-brand {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          flex-wrap: nowrap;
        }
        .brand-wordmark {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
          text-decoration: none;
          font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
          transition: opacity 0.3s ease;
          flex-shrink: 0;
        }
        .brand-wordmark:hover {
          opacity: 0.85;
        }
        .brand-primary {
          font-size: 38px;
          font-weight: 900;
          color: #D4AF37;
          letter-spacing: 2px;
        }
        .brand-secondary {
          font-size: 14px;
          font-weight: 400;
          color: #F0F0F0;
          letter-spacing: 6px;
          margin-top: 2px;
          font-family: 'Montserrat', Arial, 'Helvetica Neue', sans-serif;
        }
        .header-brand-text {
          display: flex;
          flex-direction: column;
          line-height: 1.15;
        }
        .header-brand-text .name {
          font-size: 1.7rem;
          font-weight: 900;
          color: #fff;
          font-family: var(--font-serif);
          letter-spacing: 0.02em;
        }
        .header-brand-text .sub {
          font-size: 0.7rem;
          font-weight: 400;
          color: #F0F0F0;
          letter-spacing: 0.04em;
          font-family: 'Montserrat', Arial, sans-serif;
        }
        .header-nav {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .header-nav a {
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          transition: color 0.3s ease;
          position: relative;
          padding-bottom: 2px;
          text-decoration: none;
        }
        .header-nav a::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 0;
          height: 2px;
          background: var(--matte-gold);
          transition: width 0.5s var(--ease-out);
        }
        .header-nav a:hover::after,
        .header-nav a.active::after {
          width: 100%;
        }
        .header-nav a:hover,
        .header-nav a.active {
          color: #fff;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .menu-toggle {
          display: none;
          font-size: 1.4rem;
          color: #fff;
          background: none;
          border: none;
          padding: 0.5rem;
          cursor: pointer;
        }

        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: rgba(11, 17, 27, 0.98);
          backdrop-filter: blur(30px);
          transform: translateX(100%);
          transition: transform 0.6s var(--ease-in-out);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        }
        .mobile-menu.open {
          transform: translateX(0);
        }
        .mobile-menu-close {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          font-size: 2rem;
          color: #fff;
          background: none;
          border: none;
          cursor: pointer;
        }
        .mobile-menu nav {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.8rem;
        }
        .mobile-menu nav a {
          font-size: 1.4rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.6);
          transition: color 0.3s ease;
          position: relative;
          text-decoration: none;
          padding-bottom: 2px;
        }
        .mobile-menu nav a::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 0;
          height: 2px;
          background: var(--matte-gold);
          transition: width 0.4s var(--ease-out);
        }
        .mobile-menu nav a:hover::after {
          width: 100%;
        }
        .mobile-menu nav a:hover {
          color: #fff;
        }

        @media (max-width: 820px) {
          .header-nav { display: none; }
          .menu-toggle { display: block; }
          .header-brand { gap: 0.8rem; }
          .header-brand-text .name { font-size: 1.3rem; }
          .header-brand-text .sub { font-size: 0.6rem; }
          .brand-primary { font-size: 30px; }
          .brand-secondary { font-size: 12px; letter-spacing: 4px; }
        }
        @media (max-width: 640px) {
          .header-brand { gap: 0.5rem; }
          .header-brand-text .name { font-size: 1.2rem; }
          .header-brand-text .sub { font-size: 0.55rem; }
          .brand-primary { font-size: 24px; }
          .brand-secondary { font-size: 10px; letter-spacing: 3px; }
        }
        @media (max-width: 400px) {
          .header-brand { gap: 0.3rem; }
          .header-brand-text .name { font-size: 1.05rem; }
          .header-brand-text .sub { font-size: 0.45rem; }
          .brand-primary { font-size: 20px; }
          .brand-secondary { font-size: 9px; letter-spacing: 2px; }
        }
      `}</style>
    </>
  );
}
