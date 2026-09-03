// SEO: هذا المسار تاريخي فقط؛ التحويل الخادمي يمنع إنشاء صفحة وسيطة ويُمرر الإشارة للوجهة الموحدة.
export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/news-archive',
      permanent: true,
    },
  };
}

// لا تُعرض واجهة هنا لأن Next.js يعيد التوجيه قبل إرسال صفحة blog للزائر أو لمحرك البحث.
export default function BlogRedirect() {
  return null;
}
