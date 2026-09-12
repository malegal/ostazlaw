import { useState } from 'react';
import Icon from './Icon';

export default function ShareButtons({ url, title }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleShare = () => setIsOpen(!isOpen);
  const closeShare = () => setIsOpen(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
  };

  return (
    <div className="share-wrapper">
      <button className={`share-toggle-btn ${isOpen ? 'active' : ''}`} onClick={toggleShare} aria-label="مشاركة" title="مشاركة">
        <Icon name="share-alt" />
      </button>
      <div className={`share-popup ${isOpen ? 'open' : ''}`}>
        <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="share-icon facebook" onClick={closeShare} title="فيسبوك"><Icon name="facebook-f" /></a>
        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="share-icon twitter" onClick={closeShare} title="مشاركة على X"><Icon name="x" /></a>
        <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="share-icon linkedin" onClick={closeShare} title="لينكد إن"><Icon name="linkedin-in" /></a>
        <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="share-icon whatsapp" onClick={closeShare} title="واتساب"><Icon name="whatsapp" /></a>
        <a href={shareLinks.telegram} target="_blank" rel="noopener noreferrer" className="share-icon telegram" onClick={closeShare} title="تليجرام"><Icon name="telegram-plane" /></a>
      </div>
      <style jsx>{`
        .share-wrapper { position: relative; display: inline-block; }
        .share-toggle-btn { width: 48px; height: 48px; border-radius: 50%; background: var(--matte-gold, #B08D57); color: #fff; border: none; font-size: 1.2rem; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(176,141,87,0.25); display: flex; align-items: center; justify-content: center; }
        .share-toggle-btn:hover { transform: scale(1.05); background: #9a7848; }
        .share-toggle-btn.active { background: #333; transform: rotate(45deg); }
        .share-popup { position: absolute; bottom: calc(100% + 12px); left: 50%; transform: translateX(-50%) scale(0.8); display: flex; gap: 8px; background: #fff; padding: 10px 14px; border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.15); opacity: 0; visibility: hidden; transition: all 0.3s cubic-bezier(0.22,1,0.36,1); border: 1px solid rgba(0,0,0,0.05); z-index: 100; }
        .share-popup::after { content: ''; position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 8px solid #fff; }
        .share-popup.open { opacity: 1; visibility: visible; transform: translateX(-50%) scale(1); }
        .share-icon { width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.9rem; transition: all 0.3s ease; text-decoration: none; }
        .share-icon:hover { transform: translateY(-3px); box-shadow: 0 4px 15px rgba(0,0,0,0.15); }
        .share-icon.facebook { background: #1877f2; }
        .share-icon.twitter { background: #000; }
        .share-icon.linkedin { background: #0a66c2; }
        .share-icon.whatsapp { background: #25d366; }
        .share-icon.telegram { background: #0088cc; }
        @media (max-width: 640px) { .share-toggle-btn { width: 40px; height: 40px; font-size: 1rem; } .share-popup { padding: 8px 10px; gap: 6px; bottom: calc(100% + 10px); } .share-icon { width: 32px; height: 32px; font-size: 0.75rem; } }
      `}</style>
    </div>
  );
}
