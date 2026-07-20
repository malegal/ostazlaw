import { useState } from 'react';
import Link from 'next/link';

export default function FloatingButtons() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <style jsx>{`
      .float-whatsapp {
        position: fixed;
        bottom: 2rem;
        left: 2rem;
        z-index: 999;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.25);
        transition: all 0.5s var(--ease-out);
        border: 1px solid rgba(255, 255, 255, 0.15);
        background: var(--whatsapp-green);
        color: #fff;
      }
      .float-whatsapp i {
        font-size: 2rem;
      }
      .float-whatsapp:hover {
        transform: translateY(-4px) scale(1.05);
        background: #1ebe5c;
      }
      .float-main-btn {
        position: fixed;
        bottom: calc(2rem + 56px + 0.8rem);
        left: 2rem;
        z-index: 999;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: var(--matte-gold);
        color: #000;
        box-shadow: 0 4px 30px rgba(176, 141, 87, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.6rem;
        transition: all 0.4s var(--ease-out);
      }
      .float-main-btn.active {
        transform: rotate(45deg);
      }
      .float-sub-buttons {
        position: fixed;
        bottom: calc(2rem + 56px + 0.8rem + 56px + 0.8rem);
        left: 2rem;
        z-index: 998;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        align-items: center;
        opacity: 0;
        transform: translateY(20px) scale(0.9);
        pointer-events: none;
        transition: all 0.4s var(--ease-out);
      }
      .float-sub-buttons.open {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: all;
      }
      .float-sub-btn {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 0.7rem;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        transition: all 0.4s var(--ease-out);
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        flex-direction: column;
        gap: 0.1rem;
        text-align: center;
        line-height: 1.2;
      }
      .float-sub-btn:hover {
        transform: scale(1.1) translateY(-3px);
      }
      .float-sub-btn.phone { background: rgba(5, 150, 105, 0.95); }
      .float-sub-btn.consult { background: rgba(176, 141, 87, 0.98); color: #000; }
      .float-sub-btn.appointment { background: rgba(16, 42, 67, 0.98); }
      .float-sub-btn .label { font-size: 0.5rem; }
      `}</style>

      <a href="https://wa.me/201101076000" target="_blank" rel="noopener noreferrer" class="float-whatsapp" aria-label="تواصل عبر واتساب">
      <i className="fab fa-whatsapp"></i>
      </a>

      <button className={`float-main-btn ${isOpen ? 'active' : ''}`} id="floatMainBtn" aria-label="خيارات التواصل" onClick={() => setIsOpen(!isOpen)}>
      <i className="fas fa-plus"></i>
      </button>

      <div className={`float-sub-buttons ${isOpen ? 'open' : ''}`} id="floatSubBtns">
      <a href="tel:+201101076000" className="float-sub-btn phone" title="اتصال هاتفي">
      <i className="fas fa-phone-alt"></i>
      <span className="label">اتصال</span>
      </a>
      <Link href="/contact?tab=consult" className="float-sub-btn consult" title="طلب استشارة">
      <i className="fas fa-file-signature"></i>
      <span className="label">استشارة</span>
      </Link>
      <Link href="/contact?tab=appointment" className="float-sub-btn appointment" title="حجز موعد">
      <i className="fas fa-calendar-check"></i>
      <span className="label">حجز موعد</span>
      </Link>
      </div>
      </>
  );
}
