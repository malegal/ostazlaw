import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [router.asPath]);

  const isActive = (path) => router.pathname === path;

  return (
    <>
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`} id="siteHeader">
    <style jsx>{`
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
        transition: all 0.5s var(--ease-out);
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
      }
      .brand-wordmark {
        display: flex;
        flex-direction: column;
        line-height: 1.1;
        font-family: 'Playfair Display', Georgia, serif;
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
        font-family: 'Montserrat', sans-serif;
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
      }
      .header-brand-text .sub {
        font-size: 0.7rem;
        font-weight: 400;
        color: #F0F0F0;
        font-family: 'Montserrat', sans-serif;
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
      .menu-toggle {
        display: none;
        font-size: 1.4rem;
        color: #fff;
        padding: 0.5rem;
      }
      @media (max-width: 820px) {
        .header-nav { display: none; }
        .menu-toggle { display: block; }
        .site-header { padding: 0 1rem; height: 64px; }
        .site-header.scrolled { height: 60px; }
        .header-brand-text .name { font-size: 1.3rem; }
        .brand-primary { font-size: 30px; }
        .brand-secondary { font-size: 12px; letter-spacing: 4px; }
      }
      `}</style>

      <div className="header-brand">
      <Link href="/" className="brand-wordmark" aria-label="OSTAZ LAW – الصفحة الرئيسية">
      <span className="brand-primary">OSTAZ</span>
      <span className="brand-secondary">LAW FIRM</span>
      </Link>
      <div className="header-brand-text">
      <span className="name">محمود عبد الحميد</span>
      <span className="sub">المحامي بالنقض والدستورية العليا</span>
      </div>
      </div>

      <nav className="header-nav" role="navigation" aria-label="القائمة الرئيسية">
      <Link href="/" className={isActive('/') ? 'active' : ''}>الرئيسية</Link>
      <Link href="/about" className={isActive('/about') ? 'active' : ''}>عن المؤسسة</Link>
      <Link href="/specialties" className={isActive('/specialties') ? 'active' : ''}>التخصصات</Link>
      <Link href="/sectors" className={isActive('/sectors') ? 'active' : ''}>قطاعات نخدمها</Link>
      <Link href="/news-archive" className={isActive('/news-archive') ? 'active' : ''}>الأخبار</Link>
      <Link href="/blog" className={isActive('/blog') ? 'active' : ''}>المكتبة</Link>
      <Link href="/client-inquiry" className={isActive('/client-inquiry') ? 'active' : ''}>تابع قضيتك</Link>
      <Link href="/contact" className={isActive('/contact') ? 'active' : ''}>اتصل بنا</Link>
      </nav>

      <div className="header-actions">
      <button className="menu-toggle" id="menuToggle" aria-label="فتح القائمة" onClick={() => setMobileOpen(true)}>
      <i className="fas fa-bars-staggered"></i>
      </button>
      </div>
      </header>

      {/* القائمة المتنقلة للموبايل */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`} role="dialog" aria-modal="true">
      <style jsx>{`
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
        .mobile-menu .divider {
          width: 50px;
          height: 1px;
          background: rgba(176, 141, 87, 0.15);
          margin: 0.5rem 0;
        }
        `}</style>
        <button className="mobile-menu-close" aria-label="إغلاق القائمة" onClick={() => setMobileOpen(false)}>
        <i className="fas fa-times"></i>
        </button>
        <nav>
        <Link href="/">الرئيسية</Link>
        <Link href="/about">عن المؤسسة</Link>
        <Link href="/specialties">التخصصات</Link>
        <Link href="/sectors">قطاعات نخدمها</Link>
        <Link href="/news-archive">الأخبار</Link>
        <Link href="/blog">المكتبة</Link>
        <Link href="/client-inquiry">تابع قضيتك</Link>
        <Link href="/contact">اتصل بنا</Link>
        <div className="divider"></div>
        </nav>
        </div>
        </>
  );
}
