import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ar" dir="rtl">
      <Head>
        {/* ===== Preconnect لتحسين سرعة تحميل الخطوط ===== */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />

        {/* ===== Google Fonts مع display=swap لمنع CLS ===== */}
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&family=Amiri:wght@400;700&display=swap"
          rel="stylesheet"
          media="print"
          onLoad="this.media='all'"
        />

        {/* ===== Font Awesome – تحميل غير متزامن مع display=swap ===== */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        </noscript>

        {/* ===== تحميل CSS الرئيسي مع أولوية عالية ===== */}
        <link rel="stylesheet" href="/style.css" />

        {/* ===== لون شريط المتصفح ===== */}
        <meta name="theme-color" content="#0B111B" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* ===== منع التكبير/التصغير لإصلاح CLS ===== */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        {/* ===== وصف الموقع لتحسين SEO ===== */}
        <meta
          name="description"
          content="مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية – محامون بالنقض والدستورية العليا"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
