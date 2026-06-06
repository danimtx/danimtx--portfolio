import { useEffect, Suspense, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Lenis from 'lenis';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import { Scene } from './Scene';
import { projects, mainCertificates, otherCertificates } from './data';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiGithub, FiLinkedin, FiInstagram, FiDownload, FiExternalLink, FiImage, FiX } from 'react-icons/fi';
import { FaReact, FaDocker, FaPython, FaDatabase, FaCode, FaServer, FaGamepad, FaPhp, FaAngular, FaJs, FaHtml5, FaGitAlt, FaFire, FaMobileAlt, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const ROLES = [
  "Full Stack Developer",
  "Software Engineer",
  "Backend Architect",
  "WebGL Creator"
];

function Typewriter({ words }: { words: string[] }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 40 : 100;
    const word = words[currentWordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === word) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      } else {
        setCurrentText(word.substring(0, currentText.length + (isDeleting ? -1 : 1)));
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span style={{ color: '#bf00ff', fontWeight: 600 }}>
      {currentText}
      <span className="blink-cursor" style={{ borderRight: '2px solid #bf00ff', animation: 'blink 0.7s infinite' }}></span>
    </span>
  );
}

function ProjectFullScreen({ project, onClose }: { project: any; onClose: () => void }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Lock scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedImage]);

  useEffect(() => {
    window.scrollTo(0, 0); 
    document.body.style.overflow = 'auto'; 
    
    // Premium Entrance Animation
    if (containerRef.current && heroImgRef.current && contentRef.current) {
      const tl = gsap.timeline();
      
      // Animate container in (fade + slight slide up)
      tl.fromTo(containerRef.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", clearProps: "transform" }
      );
      
      // Animate hero image scale (Ken Burns style reveal)
      tl.fromTo(heroImgRef.current,
        { scale: 1.1 },
        { scale: 1, duration: 1.5, ease: "power2.out" },
        "-=0.6"
      );
      
      // Stagger animate content elements
      const elements = contentRef.current.querySelectorAll('.animate-up');
      tl.fromTo(elements,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.2)" },
        "-=1.0"
      );
    }
    
    return () => {};
  }, []);

  return (
    <div ref={containerRef} className="project-fullscreen" style={{ position: 'absolute', top: 0, left: 0, width: '100%', minHeight: '100vh', background: '#030305', zIndex: 100 }}>
      {/* Hero Header */}
      <div style={{ position: 'relative', width: '100%', height: '65vh', overflow: 'hidden' }}>
        <img 
          ref={heroImgRef}
          src={project.gallery && project.gallery[0] ? project.gallery[0] : project.image} 
          alt={project.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5, transformOrigin: 'center' }}
        />
        {/* Advanced Gradient Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(3,3,5,0.1) 0%, rgba(3,3,5,0.8) 70%, #030305 100%)' }} />
        
        {/* Content over hero */}
        <div ref={contentRef} style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', padding: '2rem 0', width: '90%', maxWidth: '1200px' }}>
          <button 
            onClick={onClose} 
            className="premium-back-btn animate-up" 
            style={{ marginBottom: '2rem' }}
          >
            <span className="back-icon">←</span>
            VOLVER
          </button>
          
          <h1 className="animate-up" style={{ fontFamily: '"Orbitron", sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#fff', marginBottom: '1rem', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-1px' }}>
            {project.title}
          </h1>
          
          <div className="animate-up" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '1rem' }}>
            {project.tech.map((t: string) => (
              <span key={t} style={{ fontFamily: '"JetBrains Mono", monospace', padding: '0.3rem 0.8rem', background: 'transparent', borderRadius: '4px', fontSize: '0.85rem', color: '#e0e0e0', border: '1px solid rgba(255,255,255,0.15)', textTransform: 'uppercase' }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 5%', color: '#e0e0e0' }}>
        {/* Acciones (Links) */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '4rem', flexWrap: 'wrap', paddingBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="premium-action-btn light">
              <FaGithub size={16} /> VER CÓDIGO
            </a>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer" className="premium-action-btn accent">
              <FaExternalLinkAlt size={16} /> VISITAR WEB
            </a>
          )}
          {project.apk && (
            <a href={project.apk} download target="_blank" rel="noreferrer" className="premium-action-btn accent">
              <FiDownload size={16} /> DESCARGAR APK
            </a>
          )}
          {!project.link && !project.github && !project.apk && (
             <span style={{ color: '#888', fontSize: '1rem', fontStyle: 'italic', display: 'flex', alignItems: 'center', height: '100%', fontFamily: '"JetBrains Mono", monospace' }}>
               * Código fuente privado / Offline
             </span>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '5rem' }}>
          {/* Descripción */}
          <section>
            <h2 style={{ fontFamily: '"Orbitron", sans-serif', fontSize: '2.5rem', color: '#fff', marginBottom: '2rem', fontWeight: 700 }}>
              <span style={{ color: 'var(--accent-main)' }}>//</span> Descripción General
            </h2>
            <p style={{ fontSize: '1.25rem', lineHeight: 1.9, color: '#a0a0b0', whiteSpace: 'pre-line' }}>
              {project.description}
            </p>
          </section>

          {/* Galería Premium */}
          {project.gallery && project.gallery.length > 1 && (
            <section>
              <h2 style={{ fontFamily: '"Orbitron", sans-serif', fontSize: '2.5rem', color: '#fff', marginBottom: '2rem', fontWeight: 700 }}>
                <span style={{ color: 'var(--accent-main)' }}>//</span> Galería del Proyecto
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                {project.gallery.slice(1).map((img: string, i: number) => (
                  <div key={i} className="gallery-item" style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', aspectRatio: '16/9', background: '#111', cursor: 'zoom-in' }}
                       onClick={() => setSelectedImage(img)}
                       onMouseEnter={(e) => {
                         gsap.to(e.currentTarget.querySelector('img'), { scale: 1.05, duration: 0.4, ease: 'power2.out' });
                         gsap.to(e.currentTarget.querySelector('.overlay'), { opacity: 0, duration: 0.3 });
                       }}
                       onMouseLeave={(e) => {
                         gsap.to(e.currentTarget.querySelector('img'), { scale: 1, duration: 0.4, ease: 'power2.out' });
                         gsap.to(e.currentTarget.querySelector('.overlay'), { opacity: 1, duration: 0.3 });
                       }}
                  >
                    <img src={img} alt={`Screenshot ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                    <div className="overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(3,3,5,0.2)', transition: 'opacity 0.3s', pointerEvents: 'none' }} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Lightbox Modal (Estatico y Completo) */}
      {selectedImage && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 99999, background: 'rgba(0,0,0,0.95)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* Botón X gigante */}
          <button 
            onClick={() => setSelectedImage(null)}
            style={{ position: 'absolute', top: '20px', right: '30px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', cursor: 'pointer', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100000, transition: 'background 0.2s' }} 
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'} 
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <FiX size={30} />
          </button>
          
          <img 
            src={selectedImage} 
            alt="Preview Estática" 
            style={{ maxWidth: '95vw', maxHeight: '95vh', objectFit: 'contain', display: 'block', margin: 'auto' }} 
          />
        </div>,
        document.body
      )}
    </div>
  );
}

function App() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<any | null>(null);

  const openProjectDetails = (project: any) => {
    setActiveProject(project);
  };

  // Smooth Scroll con Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0, 0);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  // Animaciones GSAP
  useEffect(() => {
    const reveals = gsap.utils.toArray('.gsap-reveal');
    reveals.forEach((el: any) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 80, rotationX: -10 },
        {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
          y: 0,
          rotationX: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'expo.out'
        }
      );
    });

    // Staggered Tech Cards
    gsap.fromTo('.tech-card', 
      { opacity: 0, y: 50, scale: 0.9 },
      {
        scrollTrigger: {
          trigger: '.tech-grid',
          start: 'top 85%',
        },
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.5)'
      }
    );
  }, []);

  return (
    <>
      <div style={{ display: activeProject ? 'none' : 'block' }}>
        {/* 3D CANVAS */}
        <div id="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
          <Suspense fallback={null}>
            <Canvas 
              camera={{ position: [0, 0, 7], fov: 50 }}
              dpr={1}
              gl={{ powerPreference: "high-performance", antialias: false, precision: "lowp" }}
            >
              <Scene />
            </Canvas>
          </Suspense>
        </div>

        <div className="html-content">
          {/* FLOATING NAVIGATION */}
          <nav className="floating-nav">
            <a href="#hero" className="nav-link">Inicio</a>
            <a href="#skills" className="nav-link">Sobre Mí</a>
            <a href="#projects" className="nav-link">Portafolio</a>
            <a href="#contact" className="nav-link">Contacto</a>
          </nav>

          {/* HERO SECTION */}
          <section className="section" id="hero" style={{ height: '100vh', justifyContent: 'center' }}>
            <div className="gsap-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}>DANIEL MANCILLA<br/>TEJERINA</h1>
              <p className="hero-subtitle">
                <Typewriter words={ROLES} /><br/><br/>
                Ingeniero de Sistemas enfocado en crear arquitecturas robustas, 
                sistemas distribuidos y experiencias inmersivas de alto rendimiento.
              </p>
              
              <div className="hero-actions">
                <a href="/cv.pdf" download className="btn-primary">
                  <FiDownload size={20} />
                  Descargar CV
                </a>
                <div className="social-links">
                  <a href="https://github.com/danimtx" target="_blank" rel="noreferrer"><FiGithub size={24} /></a>
                  <a href="https://www.linkedin.com/in/daniel-mancilla-tejerina-126b07307" target="_blank" rel="noreferrer"><FiLinkedin size={24} /></a>
                  <a href="https://www.instagram.com/daniel.manci12/" target="_blank" rel="noreferrer"><FiInstagram size={24} /></a>
                </div>
              </div>
            </div>
          </section>

          {/* SOBRE MI / TECNOLOGÍAS */}
          <section className="tech-grid-container section" id="skills">
            <h2 className="huge-title gsap-reveal" style={{ top: '-5%' }}>SOBRE MÍ</h2>
            
            <div className="gsap-reveal" style={{ maxWidth: '800px', margin: '0 auto 4rem auto', textAlign: 'center' }}>
              <p style={{ fontSize: '1.2rem', color: '#a0a0b0', lineHeight: 1.8 }}>
                Soy Egresado de Ingeniería de Sistemas (UPDS) con un sólido enfoque en el desarrollo de software y la resolución analítica de problemas. Me apasiona la tecnología y estoy capacitado para diseñar e implementar arquitecturas escalables (Clean Architecture, Microservicios). Cuento con experiencia en programación de alto rendimiento competitivo (Top 20 ICPC Bolivia) y en la creación de flujos de trabajo colaborativos modernos.
              </p>
            </div>

            <div className="tech-grid">
              {/* Backend & Languages */}
              <div className="tech-card"><FaCode className="tech-icon" /><span className="tech-name">C# / C++</span></div>
              <div className="tech-card"><FaServer className="tech-icon" /><span className="tech-name">ASP.NET</span></div>
              <div className="tech-card"><FaPython className="tech-icon" /><span className="tech-name">Python</span></div>
              <div className="tech-card"><FaPhp className="tech-icon" /><span className="tech-name">PHP</span></div>
              
              {/* Frontend & Mobile */}
              <div className="tech-card"><FaReact className="tech-icon" /><span className="tech-name">React</span></div>
              <div className="tech-card"><FaMobileAlt className="tech-icon" /><span className="tech-name">React Native</span></div>
              <div className="tech-card"><FaAngular className="tech-icon" /><span className="tech-name">Angular</span></div>
              <div className="tech-card"><FaJs className="tech-icon" /><span className="tech-name">JavaScript</span></div>
              <div className="tech-card"><FaHtml5 className="tech-icon" /><span className="tech-name">HTML & CSS</span></div>
              
              {/* Databases & Tools */}
              <div className="tech-card"><FaDatabase className="tech-icon" /><span className="tech-name">SQL Server</span></div>
              <div className="tech-card"><FaDatabase className="tech-icon" /><span className="tech-name">MySQL / Postgres</span></div>
              <div className="tech-card"><FaFire className="tech-icon" /><span className="tech-name">Firebase</span></div>
              <div className="tech-card"><FaDocker className="tech-icon" /><span className="tech-name">Docker</span></div>
              <div className="tech-card"><FaGitAlt className="tech-icon" /><span className="tech-name">Git / GitHub</span></div>
              <div className="tech-card"><FaGamepad className="tech-icon" /><span className="tech-name">Unity 3D</span></div>
            </div>
          </section>

          {/* PROJECTS SECTION */}
          <section className="section" id="projects" style={{ marginTop: '5vh' }}>
            <h2 className="huge-title gsap-reveal" style={{ top: '-2%' }}>PROYECTOS</h2>
            
            <div className="projects-container">
              {projects.map((project, index) => (
                <div key={project.id} className="project-row">
                  
                  <div className="project-image-wrapper gsap-reveal">
                    <img src={project.image} alt={project.title} />
                  </div>
                  
                  <div className="project-info gsap-reveal">
                    <span style={{ color: '#666', fontWeight: 800, fontSize: '1.5rem' }}>0{index + 1}</span>
                    <h3>{project.title}</h3>
                    <div className="project-subtitle">{project.subtitle}</div>
                    <p className="project-description">{project.description}</p>
                    
                    <div style={{ marginBottom: '1.5rem' }}>
                      {project.tech.map(tech => (
                        <span key={tech} className="tag">{tech}</span>
                      ))}
                    </div>
                    
                    <div className="project-links">
                      {project.link && (
                        <a href={project.link} className="view-btn" target="_blank" rel="noreferrer">
                          <FiExternalLink size={18} /> Ver Deploy
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} className="view-btn github-btn" target="_blank" rel="noreferrer">
                          <FiGithub size={18} /> Código
                        </a>
                      )}
                      {project.apk && (
                        <a href={project.apk} download className="view-btn" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-main)' }}>
                          <FiDownload size={18} /> Descargar APK
                        </a>
                      )}
                      <button onClick={() => openProjectDetails(project)} className="view-btn" style={{ color: 'var(--accent-main)' }}>
                        <FiImage size={18} /> Ver Detalles
                      </button>
                      {!project.link && !project.github && !project.apk && (
                        <span className="private-code-badge">Código Privado / Offline</span>
                      )}
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>
          </section>

          {/* CERTIFICATES SECTION */}
          <section className="section" id="certificates" style={{ marginTop: '15vh' }}>
            <h2 className="huge-title gsap-reveal" style={{ top: '-5%', left: 'auto', right: '5%' }}>LOGROS</h2>
            
            <h3 className="gsap-reveal" style={{ marginBottom: '2rem', fontSize: '2rem', color: 'var(--accent-main)' }}>Logros Destacados</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', width: '100%', marginBottom: '5rem' }}>
              {mainCertificates.map((cert) => (
                <div key={cert.id} className="certificate-card gsap-reveal">
                  <div className="cert-img-wrapper">
                    <img src={cert.img} alt={cert.title} />
                  </div>
                  <h4>{cert.title}</h4>
                </div>
              ))}
            </div>

            <h3 className="gsap-reveal" style={{ marginBottom: '2rem', fontSize: '2rem', color: 'var(--accent-main)' }}>Otros Certificados</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', width: '100%' }}>
              {otherCertificates.map((cert) => (
                <div key={cert.id} className="certificate-card gsap-reveal">
                  <div className="cert-img-wrapper" style={{ height: '200px' }}>
                    <img src={cert.img} alt={cert.title} />
                  </div>
                  <h4 style={{ fontSize: '1rem' }}>{cert.title}</h4>
                </div>
              ))}
            </div>
            
            <div className="gsap-reveal" style={{ marginTop: '4rem', textAlign: 'center' }}>
              <a href="https://drive.google.com/drive/folders/1y2VGjOfiBiBp704HHIUTN_AKefKXuZR6?usp=sharing" target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>
                <FiExternalLink size={24} />
                Ver Todos Mis Certificados (Drive)
              </a>
            </div>
          </section>
          
          {/* CONTACT SECTION */}
          <section className="section" id="contact" style={{ minHeight: '80vh', alignItems: 'center', textAlign: 'center' }}>
            <div className="gsap-reveal" style={{ background: 'rgba(0,0,0,0.5)', padding: '5rem', borderRadius: '30px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '1rem', color: '#fff' }}>¿Iniciamos?</h2>
              <p style={{ fontSize: '1.2rem', color: '#aaa', marginBottom: '3rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                Si tienes un desafío arquitectónico, un problema algorítmico o un proyecto de alto nivel, hablemos. Resido en Tarija, Bolivia, y estoy listo para crear impacto real.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
                <a href="mailto:daniel.mancilla.tx33@gmail.com" className="view-btn" style={{ fontSize: '1.2rem', width: 'fit-content' }}>
                  <span style={{ color: 'var(--accent-main)' }}>Email:</span> daniel.mancilla.tx33@gmail.com
                </a>
                <a href="https://wa.me/59171168130" target="_blank" rel="noreferrer" className="view-btn" style={{ fontSize: '1.2rem', width: 'fit-content' }}>
                  <span style={{ color: 'var(--accent-main)' }}>WhatsApp:</span> +591 71168130
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

      {activeProject && <ProjectFullScreen project={activeProject} onClose={() => setActiveProject(null)} />}

      <div className="html-content" style={{ display: activeProject ? 'none' : 'block' }}>
        <Loader 
          containerStyles={{ background: '#020205' }}
          innerStyles={{ width: '300px' }}
          barStyles={{ background: '#bf00ff' }}
          dataInterpolation={(p) => `Cargando Experiencia 3D ${p.toFixed(0)}%`}
        />
      </div>
    </>
  );
}

export default App;
