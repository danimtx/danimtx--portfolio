import { useEffect, useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Hero } from './components/Hero';
import { IntroStatement } from './components/IntroStatement';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { CompetitiveHighlight } from './components/CompetitiveHighlight';
import { ProcessSection } from './components/ProcessSection';
import { Footer } from './components/Footer';
import { CatLabSection } from './components/CatLabSection';
import { StealthCatCompanion } from './cat/StealthCatCompanion';
import { CatLab } from './cat/CatLab';

export default function App() {
  const [isCatLab, setIsCatLab] = useState(() =>
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).has('catlab'),
  );

  useEffect(() => {
    const onPopState = () => {
      setIsCatLab(new URLSearchParams(window.location.search).has('catlab'));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const openCatLab = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('catlab', '');
    window.history.pushState({}, '', url.toString());
    setIsCatLab(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const returnToPortfolio = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('catlab');
    window.history.pushState({}, '', url.pathname + url.search);
    setIsCatLab(false);
  };

  if (isCatLab) {
    return <CatLab onReturnToPortfolio={returnToPortfolio} />;
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-[#F8F8F6] text-[#111111] antialiased selection:bg-[#D4F014] selection:text-black scroll-smooth">
        <ScrollProgressBar />
        <Navbar />
        <main className="flex-1">
          <Hero />
          <IntroStatement />
          <ExperienceSection />
          <ProjectsShowcase />
          <CompetitiveHighlight />
          <ProcessSection />
        </main>
        <Footer />
        <CatLabSection onOpenLab={openCatLab} />
        <StealthCatCompanion />
      </div>
    </LanguageProvider>
  );
}
