import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from './Icon';

export default function FloatingButtons() {
  const [subOpen, setSubOpen] = useState(false);
  const toggleSub = () => setSubOpen(!subOpen);
  const closeSub = () => setSubOpen(false);

  useEffect(() => {
    const handleEscape = (e) => { if (e.key === 'Escape' && subOpen) closeSub(); };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [subOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.float-main-btn') && !e.target.closest('.float-sub-buttons')) {
        if (subOpen) closeSub();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [subOpen]);

  return (
    <>
      <a href="https://wa.me/201101076000" target="_blank" rel="noopener noreferrer" className="float-whatsapp" aria-label="تواصل عبر واتساب">
        {/* الأيقونة تستخدم مسار واتساب الرسمي، والفئة المخصصة تضبط حجمه داخل الزر العائم فقط. */}
        <Icon name="whatsapp" className="whatsapp-official-icon" />
      </a>
      <button className={`float-main-btn ${subOpen ? 'active' : ''}`} onClick={toggleSub} aria-label="خيارات التواصل">
        <Icon name="plus" />
      </button>
      <div className={`float-sub-buttons ${subOpen ? 'open' : ''}`}>
        <a href="tel:+201101076000" className="float-sub-btn phone" title="اتصال هاتفي">
          <Icon name="phone-alt" />
          <span className="label">اتصال</span>
        </a>
        <Link href="/contact?tab=consult" className="float-sub-btn consult" title="طلب استشارة">
          <Icon name="file-signature" />
          <span className="label">استشارة</span>
        </Link>
        <Link href="/contact?tab=appointment" className="float-sub-btn appointment" title="حجز موعد">
          <Icon name="calendar-check" />
          <span className="label">حجز موعد</span>
        </Link>
      </div>
    </>
  );
}
