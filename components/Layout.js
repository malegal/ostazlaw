import Header from './Header';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';

export default function Layout({ children }) {
  return (
    <>
      {/* رابط تجاوز للمحتوى لمستخدمي قارئات الشاشة */}
      <a
        href="#main-content"
        className="skip-to-content"
        style={{
          position: 'absolute',
          top: '-9999px',
          left: '-9999px',
          background: '#B08D57',
          color: '#000',
          padding: '10px 20px',
          borderRadius: '8px',
          zIndex: '9999',
          fontWeight: '700',
        }}
        onFocus={(e) => (e.target.style.top = '10px')}
        onBlur={(e) => (e.target.style.top = '-9999px')}
      >
        تخطي إلى المحتوى الرئيسي
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
