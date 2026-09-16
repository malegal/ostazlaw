import Icon from './Icon';
import { useEffect, useState } from 'react';

export default function FloatingButtons() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollable > 0 && window.scrollY / scrollable >= 0.3);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* يظهر واتساب بعد قراءة جزء من الصفحة حتى لا ينافس دعوة الاستشارة في البداية. */}
      <a href="https://wa.me/201101076000" target="_blank" rel="noopener noreferrer" className={`float-whatsapp ${visible ? 'is-visible' : ''}`} aria-label="تواصل عبر واتساب">
        {/* الأيقونة تستخدم مسار واتساب الرسمي، والفئة المخصصة تضبط حجمه داخل الزر العائم فقط. */}
        <Icon name="whatsapp" className="whatsapp-official-icon" />
      </a>
    </>
  );
}
