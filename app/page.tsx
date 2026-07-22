import HeroSection from '@/app/components/HeroSection';
import TrustBar from '@/app/components/TrustBar';
import AboutSection from '@/app/components/AboutSection';
import PracticeAreas from '@/app/components/PracticeAreas';
import ProcessSection from '@/app/components/ProcessSection';
import SectorsSection from '@/app/components/SectorsSection';
import NewsSection from '@/app/components/NewsSection';
import ArticlesSection from '@/app/components/ArticlesSection';
import MapSection from '@/app/components/MapSection';
import CTASection from '@/app/components/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <AboutSection />
      <PracticeAreas />
      <ProcessSection />
      <SectorsSection />
      <NewsSection />
      <ArticlesSection />
      <MapSection />
      <CTASection />
    </>
  );
}
