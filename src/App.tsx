import { useEffect, useRef, useState, useMemo } from 'react';
import Lenis from 'lenis';
import CyberMatrixBackground from './components/CyberMatrixBackground';
import HeroKernelTerminal from './components/HeroKernelTerminal';
import { setLenis, getScrollPosition, restoreScrollPosition } from './scroll';
import {
  mainCertificates,
  otherCertificates,
  personalInfo,
  heroRolesEn,
  heroRolesEs,
  getSkillCategories,
  type Project
} from './data';
import { useLanguage } from './i18n/LanguageContext';
import Typewriter from './Typewriter';
import ProjectFullScreen from './ProjectFullScreen';
import SystemsShowcase from './components/SystemsShowcase';
import ArchitectureSchematic from './components/ArchitectureSchematic';
import AlgorithmVisualizer from './components/AlgorithmVisualizer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiDownload,
  FiExternalLink,
  FiAward,
  FiSend
} from 'react-icons/fi';
import {
  FaReact,
  FaDocker,
  FaPython,
  FaDatabase,
  FaCode,
  FaServer,
  FaGamepad,
  FaAngular,
  FaHtml5,
  FaMobileAlt,
  FaLayerGroup,
  FaRobot
} from 'react-icons/fa';
import { SiDotnet, SiCplusplus, SiTypescript, SiPostgresql, SiN8N } from 'react-icons/si';
import { sectorSignal, scrollSignal, hoverSignal, type Sector } from './sectorSignal';

gsap.registerPlugin(ScrollTrigger);

// Render icon helper according to skill iconKey
function renderSkillIcon(iconKey: string) {
  switch (iconKey) {
    case 'csharp': return <SiDotnet className="tech-icon" />;
    case 'server': return <FaServer className="tech-icon" />;
    case 'architecture': return <FaLayerGroup className="tech-icon" />;
    case 'python': return <FaPython className="tech-icon" />;
    case 'cpp': return <SiCplusplus className="tech-icon" />;
    case 'node': return <FaServer className="tech-icon" />;
    case 'react': return <FaReact className="tech-icon" />;
    case 'mobile': return <FaMobileAlt className="tech-icon" />;
    case 'angular': return <FaAngular className="tech-icon" />;
    case 'ts': return <SiTypescript className="tech-icon" />;
    case 'webgl': return <FaGamepad className="tech-icon" />;
    case 'css': return <FaHtml5 className="tech-icon" />;
    case 'ai': return <FaRobot className="tech-icon" />;
    case 'workflow': return <SiN8N className="tech-icon" />;
    case 'postgres': return <SiPostgresql className="tech-icon" />;
    case 'sql': return <FaDatabase className="tech-icon" />;
    case 'docker': return <FaDocker className="tech-icon" />;
    case 'unity': return <FaGamepad className="tech-icon" />;
    default: return <FaCode className="tech-icon" />;
  }
}

function App() {
  const { lang, setLang, t } = useLanguage();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const savedScrollRef = useRef(0);
  const prevActiveRef = useRef<Project | null>(null);

  const heroRoles = useMemo(() => lang === 'en' ? heroRolesEn : heroRolesEs, [lang]);
  const skillCategories = useMemo(() => getSkillCategories(lang), [lang]);
  const activeWhatsappLink = lang === 'en' ? personalInfo.whatsappLink : personalInfo.whatsappLinkEs;

  // Al cerrar el overlay, restaurar la posición de scroll previa
  useEffect(() => {
    if (prevActiveRef.current && !activeProject) {
      requestAnimationFrame(() => restoreScrollPosition(savedScrollRef.current));
    }
    prevActiveRef.current = activeProject;
  }, [activeProject]);

  const openProjectDetails = (project: Project) => {
    savedScrollRef.current = getScrollPosition();
    setActiveProject(project);
  };

  const setHover = (s: Sector | null) => ({
    onMouseEnter: () => { hoverSignal.sector = s; },
    onMouseLeave: () => { if (hoverSignal.sector === s) hoverSignal.sector = null; },
  });

  // Smooth Scroll con Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.6,
    });

    lenis.on('scroll', () => {
      scrollSignal.velocity = lenis.velocity;
      ScrollTrigger.update();
    });
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0, 0);
    setLenis(lenis);

    return () => {
      setLenis(null);
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  // Animaciones GSAP
  useEffect(() => {
    const reveals = gsap.utils.toArray('.gsap-reveal') as Element[];
    
    // Configurar detección de sectores
    const sectors = ['hero', 'about', 'projects', 'achievements', 'contact'];
    sectors.forEach(id => {
      ScrollTrigger.create({
        trigger: `[data-sector="${id}"]`,
        start: 'top 40%',
        end: 'bottom 40%',
        onEnter: () => { sectorSignal.current = id as Sector; },
        onEnterBack: () => { sectorSignal.current = id as Sector; },
      });
    });

    reveals.forEach((el: Element) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'expo.out'
        }
      );
    });

    // Staggered Tech Cards
    gsap.fromTo('.tech-card',
      { opacity: 0, y: 30, scale: 0.94 },
      {
        scrollTrigger: {
          trigger: '#skills',
          start: 'top 85%',
        },
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.06,
        ease: 'back.out(1.4)'
      }
    );
  }, []);

  return (
    <>
      <div style={{ display: activeProject ? 'none' : 'block' }}>
        {/* INTERACTIVE CYBER MATRIX CANVAS BACKGROUND */}
        <CyberMatrixBackground />

        <div className="html-content">
          {/* FLOATING NAVIGATION WITH BILINGUAL SWITCHER */}
          <nav className="floating-nav">
            <a href="#hero" className="nav-link">{t.navHome}</a>
            <a href="#skills" className="nav-link">{t.navSkills}</a>
            <a href="#projects" className="nav-link">{t.navProjects}</a>
            <a href="#certificates" className="nav-link">{t.navCertificates}</a>
            <a href="#contact" className="nav-link">{t.navContact}</a>

            {/* Selector de Idioma Cyber-Glass */}
            <div className="lang-switcher-wrap" aria-label="Selector de idioma / Language Switcher">
              <button
                type="button"
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLang('en')}
                aria-label="Switch interface to English"
              >
                EN
              </button>
              <span className="lang-divider">/</span>
              <button
                type="button"
                className={`lang-btn ${lang === 'es' ? 'active' : ''}`}
                onClick={() => setLang('es')}
                aria-label="Cambiar interfaz a Español"
              >
                ES
              </button>
            </div>
          </nav>

          {/* FASE 01: HERO SECTION (Kernel & Mando de Sistemas) */}
          <section className="section" id="hero" data-sector="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 'clamp(6rem, 12vh, 12rem)', paddingBottom: '4rem' }}>
            <div className="hero-cyber-grid gsap-reveal">
              
              {/* Columna Izquierda: Información de Daniel Mancilla */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                <div className="hero-telemetry-badge">
                  <span className="hero-telemetry-dot" />
                  <span>{t.heroKernelLive}</span>
                </div>

                <h1 className="hero-title" style={{ fontSize: 'clamp(2.4rem, 6vw, 5.8rem)', marginTop: '0.2rem' }}>
                  DANIEL MANCILLA<br/>TEJERINA
                </h1>

                <div className="hero-subtitle">
                  <Typewriter words={heroRoles} /><br/><br/>
                  {t.heroBio}
                </div>

                {/* Fila de logros y badges clave */}
                <div className="hero-achievements-row">
                  <div className="hero-achievement-gold" aria-label="ICPC Achievement">
                    <FiAward size={18} />
                    <span>{t.heroAchievementIcpc}</span>
                  </div>

                  <div className="hero-achievement-cyan" aria-label="Architecture Specialization">
                    <FaLayerGroup size={16} />
                    <span>{t.heroAchievementArch}</span>
                  </div>

                  <div className="hero-achievement" aria-label="AI Specialization">
                    <FaRobot size={16} />
                    <span>{t.heroAchievementAi}</span>
                  </div>
                </div>

                {/* Acciones del Hero */}
                <div className="hero-actions">
                  <a href={personalInfo.cvPdf} download className="btn-primary">
                    <FiDownload size={20} />
                    {t.heroBtnCv}
                  </a>
                  <a href={activeWhatsappLink} target="_blank" rel="noreferrer" className="btn-primary" style={{ borderColor: '#00f0ff', color: '#00f0ff' }}>
                    <FiSend size={18} />
                    {t.heroBtnContact}
                  </a>
                  <div className="social-links">
                    <a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub de Daniel Mancilla"><FiGithub size={24} /></a>
                    <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn de Daniel Mancilla"><FiLinkedin size={24} /></a>
                    <a href={personalInfo.instagram} target="_blank" rel="noreferrer" aria-label="Instagram de Daniel Mancilla"><FiInstagram size={24} /></a>
                  </div>
                </div>
              </div>

              {/* Columna Derecha: Monograma DMT & Terminal Interactiva de Inspección */}
              <div>
                <HeroKernelTerminal />
              </div>

            </div>
          </section>

          {/* FASE 02: SOBRE MÍ & NÚCLEO DE PROPULSIÓN (Skills & Arquitectura) */}
          <section className="tech-grid-container section" id="skills" data-sector="about">
            <h2 className="huge-title gsap-reveal" style={{ top: '-5%' }}>{t.coreHeading}</h2>

            <div className="rail-left anchor3d" {...setHover('about')}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10vh' }}>

                {/* Resumen de perfil y Bio */}
                <div className="tech-level" data-about-level="1">
                  <div className="phase-header-badge">
                    <span>{t.corePhaseBadge}</span>
                  </div>

                  <div className="gsap-reveal" style={{ maxWidth: '850px', margin: '0 0 3rem 0', textAlign: 'left' }}>
                    <p style={{ fontSize: '1.25rem', color: '#b0b0c8', lineHeight: 1.85 }}>
                      {t.coreBioP1}
                    </p>
                    <p style={{ fontSize: '1.1rem', color: '#8888a0', lineHeight: 1.75, marginTop: '1rem' }}>
                      {t.coreBioP2}
                    </p>
                  </div>

                  {/* Categoría 1: Backend & Arquitectura */}
                  <div className="tech-group">
                    <h3 className="tech-group-title">
                      <FaServer size={18} />
                      {skillCategories[0].name} — <span style={{ fontSize: '0.8rem', color: '#888' }}>{skillCategories[0].tag}</span>
                    </h3>
                    <p style={{ color: '#8888a0', fontSize: '0.95rem', marginBottom: '1.5rem' }}>{skillCategories[0].description}</p>
                    <div className="tech-grid">
                      {skillCategories[0].skills.map((s) => (
                        <div key={s.name} className="tech-card">
                          {renderSkillIcon(s.iconKey)}
                          <span className="tech-name">{s.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Nivel 2 — Frontend, Móvil & 3D */}
                <div className="tech-level" data-about-level="2">
                  <div className="tech-group">
                    <h3 className="tech-group-title">
                      <FaReact size={18} />
                      {skillCategories[1].name} — <span style={{ fontSize: '0.8rem', color: '#888' }}>{skillCategories[1].tag}</span>
                    </h3>
                    <p style={{ color: '#8888a0', fontSize: '0.95rem', marginBottom: '1.5rem' }}>{skillCategories[1].description}</p>
                    <div className="tech-grid">
                      {skillCategories[1].skills.map((s) => (
                        <div key={s.name} className="tech-card">
                          {renderSkillIcon(s.iconKey)}
                          <span className="tech-name">{s.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Esquema interactivo de Clean Architecture */}
                  <div className="gsap-reveal">
                    <ArchitectureSchematic />
                  </div>
                </div>

                {/* Nivel 3 — IA, Automatización & Datos */}
                <div className="tech-level" data-about-level="3">
                  <div className="tech-group">
                    <h3 className="tech-group-title">
                      <FaRobot size={18} />
                      {skillCategories[2].name} — <span style={{ fontSize: '0.8rem', color: '#888' }}>{skillCategories[2].tag}</span>
                    </h3>
                    <p style={{ color: '#8888a0', fontSize: '0.95rem', marginBottom: '1.5rem' }}>{skillCategories[2].description}</p>
                    <div className="tech-grid">
                      {skillCategories[2].skills.map((s) => (
                        <div key={s.name} className="tech-card">
                          {renderSkillIcon(s.iconKey)}
                          <span className="tech-name">{s.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* FASE 03: PROYECTOS & SISTEMAS (Engineering Blueprints) */}
          <section className="section" id="projects" data-sector="projects" style={{ marginTop: '5vh' }}>
            <h2 className="huge-title gsap-reveal" style={{ top: '-2%' }}>{t.systemsHeading}</h2>

            <div className="phase-header-badge gsap-reveal" style={{ alignSelf: 'flex-start', marginBottom: '2rem' }}>
              <span>{t.systemsPhaseBadge}</span>
            </div>

            <div className="rail-left anchor3d" {...setHover('projects')}>
              <SystemsShowcase 
                onOpenProjectDetails={openProjectDetails} 
              />
            </div>
          </section>

          {/* FASE 04: LOGROS & ICPC (Cinturón de Desafíos Algorítmicos) */}
          <section className="section" id="certificates" data-sector="achievements" style={{ marginTop: '15vh' }}>
            <h2 className="huge-title gsap-reveal" style={{ top: '-5%', left: 'auto', right: '5%' }}>{t.achievementsHeading}</h2>

            <div className="rail-left anchor3d" {...setHover('achievements')}>
              <div className="phase-header-badge gsap-reveal">
                <span>{t.achievementsPhaseBadge}</span>
              </div>

              {/* Visualizador de Grafos & ICPC */}
              <div className="gsap-reveal">
                <AlgorithmVisualizer />
              </div>

              <h3 className="gsap-reveal" style={{ marginBottom: '2rem', fontSize: '2rem', color: 'var(--accent-main)' }}>
                {t.achievementsCertTitle}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '2rem', width: '100%', marginBottom: '4rem' }}>
                {mainCertificates.map((cert) => (
                  <div key={cert.id} className="certificate-card gsap-reveal">
                    <div className="cert-img-wrapper">
                      <img src={cert.img} alt={cert.title} loading="lazy" />
                    </div>
                    <h4>{cert.title}</h4>
                    {cert.institution && (
                      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.75rem', color: '#8888aa', textAlign: 'center', marginTop: '0.4rem' }}>
                        {cert.institution} {cert.year ? `· ${cert.year}` : ''}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <h3 className="gsap-reveal" style={{ marginBottom: '2rem', fontSize: '1.8rem', color: '#00f0ff' }}>
                {t.achievementsTrainingTitle}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))', gap: '2rem', width: '100%' }}>
                {otherCertificates.map((cert) => (
                  <div key={cert.id} className="certificate-card gsap-reveal">
                    <div className="cert-img-wrapper" style={{ height: '200px' }}>
                      <img src={cert.img} alt={cert.title} loading="lazy" />
                    </div>
                    <h4 style={{ fontSize: '0.95rem' }}>{cert.title}</h4>
                    {cert.institution && (
                      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.72rem', color: '#777790', textAlign: 'center', marginTop: '0.3rem' }}>
                        {cert.institution}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="gsap-reveal" style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center', width: '100%' }}>
                <a href={personalInfo.driveCertificates} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                  <FiExternalLink size={22} />
                  {t.achievementsDriveBtn}
                </a>
              </div>
            </div>
          </section>

          {/* FASE 05: CONTACTO (Estación de Transmisión Cuántica) */}
          <section className="section" id="contact" data-sector="contact" style={{ minHeight: '90vh', alignItems: 'center' }}>
            <div className="gsap-reveal contact-panel" {...setHover('contact')}>
              <div className="phase-header-badge" style={{ margin: '0 auto 1.5rem auto' }}>
                <span>{t.contactPhaseBadge}</span>
              </div>

              <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', marginBottom: '1rem', color: '#fff', letterSpacing: '-0.5px' }}>
                {t.contactHeading}
              </h2>
              
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: '"JetBrains Mono", monospace', fontSize: '0.8rem', color: '#00f0ff', marginBottom: '1.5rem' }}>
                <span className="hero-telemetry-dot" />
                <span>{t.contactStatus}</span>
              </div>

              <p style={{ fontSize: '1.15rem', color: '#b0b0c0', lineHeight: 1.75, marginBottom: '2.5rem' }}>
                {t.contactDesc}
              </p>

              <div className="contact-row">
                <a href={`mailto:${personalInfo.email}`} className="view-btn contact-link" style={{ fontSize: '1.05rem' }}>
                  <span style={{ color: 'var(--accent-main)' }}>{t.contactEmailLabel}</span> {personalInfo.email}
                </a>
                <a href={activeWhatsappLink} target="_blank" rel="noreferrer" className="view-btn" style={{ fontSize: '1.05rem', color: '#00f0ff' }}>
                  <span style={{ color: '#00f0ff' }}>{t.contactWhatsappLabel}</span> {personalInfo.whatsapp}
                </a>
              </div>

              <div className="social-links contact-social">
                <a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub de Daniel Mancilla"><FiGithub size={24} /></a>
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn de Daniel Mancilla"><FiLinkedin size={24} /></a>
                <a href={personalInfo.instagram} target="_blank" rel="noreferrer" aria-label="Instagram de Daniel Mancilla"><FiInstagram size={24} /></a>
              </div>

              <div style={{ marginTop: '3rem' }}>
                <a href={personalInfo.cvPdf} download className="btn-primary">
                  <FiDownload size={18} />
                  {t.contactBtnCv}
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

      {activeProject && <ProjectFullScreen project={activeProject} onClose={() => setActiveProject(null)} />}
    </>
  );
}

export default App;


