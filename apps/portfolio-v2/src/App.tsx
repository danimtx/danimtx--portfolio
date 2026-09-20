import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Hero } from './components/Hero';
import { IntroStatement } from './components/IntroStatement';
import { ExperienceSection } from './components/ExperienceSection';
import { ServicesAccordion } from './components/ServicesAccordion';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { CompetitiveHighlight } from './components/CompetitiveHighlight';
import { ProcessSection } from './components/ProcessSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-[#F8F8F6] text-[#111111] antialiased selection:bg-[#D4F014] selection:text-black scroll-smooth">
        <ScrollProgressBar />
        <Navbar />
        <main className="flex-1">
          <Hero />
          <IntroStatement />
          <ExperienceSection />
          <ServicesAccordion />
          <ProjectsShowcase />
          <CompetitiveHighlight />
          <ProcessSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
