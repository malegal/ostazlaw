import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ar" dir="rtl">
      <Head>
        <meta name="google-site-verification" content="Uqbjr1w7Q831Lo6JPFEe9_lK86Kp55P79Lwfp1j6EX8" />
        {/* الهوية: favicon وmanifest يستخدمان رمز الموازين وألوان العلامة الحالية دون تغيير الواجهة. */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0B1B2B" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
