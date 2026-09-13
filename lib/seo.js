// مصدر Schema موحد للمكتب؛ يُستخدم في التخطيط العام حتى تبقى بيانات الاسم والعنوان متسقة.
export const SITE_URL = 'https://ostazlaw.vercel.app';
export const SITE_NAME = 'جاد الرب للمحاماة والاستشارات القانونية';
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export function absoluteUrl(value, fallback = OG_IMAGE) {
  if (!value) return fallback;
  try { return new URL(value, SITE_URL).toString(); } catch { return fallback; }
}
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: 'JAD ELRAB',
  description: 'مكتب محاماة مصري مقره أسوان، يقدم الاستشارات والتمثيل القانوني وصياغة العقود للأفراد والشركات في أسوان ومختلف محافظات مصر بحسب طبيعة الخدمة والقضية.',
  url: `${SITE_URL}/`,
  image: OG_IMAGE,
  telephone: '+201101076000',
  email: 'ma.law.firm@outlook.com',
  foundingDate: '2005',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'أسوان',
    addressCountry: 'EG',
  },
  areaServed: {
    '@type': 'Country',
    name: 'مصر',
  },
  availableLanguage: ['ar', 'en'],
  sameAs: [
    'https://www.facebook.com/malegal',
    'https://x.com/mahmoud_a_hamyd',
    'https://www.linkedin.com/in/mahmoud-abdel-hamid-0a4664374',
  ],
};

export function organizationJsonLd() {
  return JSON.stringify(ORGANIZATION_SCHEMA);
}
