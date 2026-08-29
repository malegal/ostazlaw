import Head from 'next/head';
import { useEffect } from 'react';

// هذا المسار القديم يبقى متاحًا للتوافق، لكنه يحوّل الزائر إلى صفحة الأخبار والمكتبة الموحّدة.
export default function BlogRedirect() {
  useEffect(() => {
    // التحويل البرمجي يعمل بعد تحميل الصفحة ويحافظ على توافق التصدير الثابت.
    window.location.replace('/news-archive');
  }, []);

  return (
    <>
      {/* التحويل الوصفي يضمن الوصول للوجهة الجديدة حتى قبل تنفيذ JavaScript. */}
      <Head>
        <meta httpEquiv="refresh" content="0;url=/news-archive" />
        <title>المكتبة القانونية | مؤسسة جاد الرب</title>
      </Head>
      <main style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', padding: '2rem' }}>
        <p>جارٍ تحويلك إلى صفحة الأخبار والمكتبة...</p>
      </main>
    </>
  );
}

// لا يحتاج المسار القديم إلى بيانات؛ كل محتواه أصبح معروضًا في الصفحة الموحّدة.
export async function getStaticProps() {
  return { props: {} };
}
