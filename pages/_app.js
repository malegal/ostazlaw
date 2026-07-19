import '../styles/globals.css';
import { Cairo } from 'next/font/google';

// استدعاء الخط الرسمي للمؤسسة (Cairo) بجميع الأوزان المطلوبة
// خاصية swap تضمن ظهور النص فوراً وتحل مشكلة PageSpeed
const cairo = Cairo({ 
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default function App({ Component, pageProps }) {
  return (
    // تطبيق الخط على كامل الموقع بأسلوب حديث يمنع انزياح التخطيط (CLS)
    <main className={cairo.className}>
      <Component {...pageProps} />
    </main>
  );
}
