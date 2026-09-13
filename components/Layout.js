import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';
import Head from 'next/head';
import { organizationJsonLd } from '../lib/seo';

export default function Layout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const setupObserver = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

      const elements = document.querySelectorAll('.reveal');
      elements.forEach(el => observer.observe(el));
      return observer;
    };

    let observer;
    const timeout = setTimeout(() => {
      observer = setupObserver();
    }, 100);

    const handleRouteChange = () => {
      if (observer) {
        observer.disconnect();
      }
      setTimeout(() => {
        observer = setupObserver();
      }, 150);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      clearTimeout(timeout);
      if (observer) {
        observer.disconnect();
      }
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return (
    <>
      {/* Schema موحد: مقر المكتب في أسوان ونطاق الخدمة مختلف محافظات مصر. */}
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: organizationJsonLd() }} />
      </Head>
      <a className="skip-link" href="#main-content">تخطَّ إلى المحتوى الرئيسي</a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
