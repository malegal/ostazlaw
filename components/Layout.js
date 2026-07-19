import Header from './Header';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';

export default function Layout({ children }) {
  return (
    <>
      <a href="#main-content" className="skip-to-content">تخطي إلى المحتوى</a>
      <Header />
      <main id="main-content" role="main">{children}</main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
