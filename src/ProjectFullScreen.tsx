import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { FiDownload, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { scrollToTopImmediate } from './scroll';
import { useLanguage } from './i18n/LanguageContext';
import type { Project } from './data';

const REDUCED_MOTION = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function ProjectFullScreen({ project, onClose }: { project: Project; onClose: () => void }) {
  const { lang } = useLanguage();
  const galleryImages = project.gallery.slice(1);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [closing, setClosing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const backBtnRef = useRef<HTMLButtonElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const lightboxPrevRef = useRef<HTMLButtonElement>(null);
  const lightboxNextRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const lightboxOpenerRef = useRef<HTMLElement | null>(null);

  // Swipe state
  const pointerStartX = useRef<number>(0);
  const pointerStartTime = useRef<number>(0);
  const [dragOffset, setDragOffset] = useState(0);

  const runCloseAnimation = useCallback(() => {
    if (closing) return;
    setClosing(true);
    if (containerRef.current && !REDUCED_MOTION) {
      gsap.to(containerRef.current, { opacity: 0, y: -40, scale: 0.98, duration: 0.35, ease: 'power3.in', onComplete: onClose });
    } else {
      onClose();
    }
  }, [closing, onClose]);

  // Save focus, autofocus back button, restore focus on unmount
  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;

    // El overlay arranca arriba (el scroll de la página se restaura al cerrar desde App)
    scrollToTopImmediate();

    // Premium Entrance Animation
    if (containerRef.current && heroImgRef.current && contentRef.current && !REDUCED_MOTION) {
      const tl = gsap.timeline();

      tl.fromTo(containerRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.1)", clearProps: "transform" }
      );

      tl.fromTo(heroImgRef.current,
        { scale: 1.1 },
        { scale: 1, duration: 1.5, ease: "power2.out" },
        "-=0.6"
      );

      const elements = contentRef.current.querySelectorAll('.animate-up');
      tl.fromTo(elements,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.2)" },
        "-=1.0"
      );
    }

    backBtnRef.current?.focus();

    return () => {
      previouslyFocusedRef.current?.focus();
    };
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    lightboxOpenerRef.current?.focus();
  }, []);

  const stepImage = useCallback((dir: 1 | -1) => {
    setSelectedIndex((prev) => {
      if (prev === null || galleryImages.length === 0) return prev;
      return (prev + dir + galleryImages.length) % galleryImages.length;
    });
  }, [galleryImages.length]);

  // Keyboard: Esc, ArrowLeft/ArrowRight (solo navegan cuando el lightbox está abierto)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (selectedIndex !== null) {
          closeLightbox();
        } else {
          runCloseAnimation();
        }
      } else if (selectedIndex !== null && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        e.preventDefault();
        stepImage(e.key === 'ArrowLeft' ? -1 : 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedIndex, closeLightbox, runCloseAnimation, stepImage]);

  // Focus lightbox close button when opening
  useEffect(() => {
    if (selectedIndex !== null) {
      lightboxCloseRef.current?.focus();
    }
  }, [selectedIndex]);

  // Focus trap for lightbox
  useEffect(() => {
    if (selectedIndex === null) return;
    const trap = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const focusables = [lightboxCloseRef.current, lightboxPrevRef.current, lightboxNextRef.current].filter(Boolean) as HTMLElement[];
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', trap);
    return () => window.removeEventListener('keydown', trap);
  }, [selectedIndex]);

  // Lock scroll when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedIndex]);

  const selectedImage = selectedIndex !== null ? galleryImages[selectedIndex] : null;

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
            ref={backBtnRef}
            type="button"
            onClick={runCloseAnimation}
            className="premium-back-btn animate-up"
            style={{ marginBottom: '2rem' }}
            aria-label={lang === 'en' ? "Back to portfolio" : "Volver al portafolio"}
          >
            <span className="back-icon">←</span>
            {lang === 'en' ? 'BACK' : 'VOLVER'}
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
              <FaGithub size={16} /> {lang === 'en' ? 'VIEW SOURCE' : 'VER CÓDIGO'}
            </a>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer" className="premium-action-btn accent">
              <FaExternalLinkAlt size={16} /> {lang === 'en' ? 'LIVE WEBSITE' : 'VISITAR WEB'}
            </a>
          )}
          {project.apk && (
            <a href={project.apk} download target="_blank" rel="noreferrer" className="premium-action-btn accent">
              <FiDownload size={16} /> {lang === 'en' ? 'DOWNLOAD APK' : 'DESCARGAR APK'}
            </a>
          )}
          {!project.link && !project.github && !project.apk && (
             <span style={{ color: '#888', fontSize: '1rem', fontStyle: 'italic', display: 'flex', alignItems: 'center', height: '100%', fontFamily: '"JetBrains Mono", monospace' }}>
               * {lang === 'en' ? 'Private enterprise code / Offline' : 'Código fuente privado / Offline'}
             </span>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '5rem' }}>
          {/* Descripción */}
          <section>
            <h2 style={{ fontFamily: '"Orbitron", sans-serif', fontSize: '2.5rem', color: '#fff', marginBottom: '1.5rem', fontWeight: 700 }}>
              <span style={{ color: 'var(--accent-main)' }}>//</span> {lang === 'en' ? 'General Overview' : 'Descripción General'}
            </h2>
            {project.architectureHighlight && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem 1rem', background: 'rgba(0, 240, 255, 0.08)', border: '1px solid rgba(0, 240, 255, 0.3)', borderRadius: '6px', color: '#00f0ff', fontFamily: '"JetBrains Mono", monospace', fontSize: '0.85rem', marginBottom: '1.5rem', letterSpacing: '0.5px' }}>
                <span>⚡ {project.architectureHighlight}</span>
              </div>
            )}
            <p style={{ fontSize: '1.25rem', lineHeight: 1.9, color: '#a0a0b0', whiteSpace: 'pre-line' }}>
              {project.description}
            </p>
          </section>

          {/* Galería Premium */}
          {galleryImages.length > 0 && (
            <section>
              <h2 style={{ fontFamily: '"Orbitron", sans-serif', fontSize: '2.5rem', color: '#fff', marginBottom: '2rem', fontWeight: 700 }}>
                <span style={{ color: 'var(--accent-main)' }}>//</span> {lang === 'en' ? 'Project Gallery' : 'Galería del Proyecto'}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(350px, 100%), 1fr))', gap: '2rem' }}>
                {galleryImages.map((img, i) => (
                  <div
                    key={i}
                    className="gallery-item"
                    role="button"
                    tabIndex={0}
                    aria-label={`Abrir captura ${i + 2} de ${galleryImages.length + 1} de ${project.title}`}
                    onClick={() => {
                      lightboxOpenerRef.current = document.activeElement as HTMLElement;
                      setSelectedIndex(i);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        lightboxOpenerRef.current = e.currentTarget;
                        setSelectedIndex(i);
                      }
                    }}
                    style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', aspectRatio: '16/9', background: '#111', cursor: 'zoom-in' }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget.querySelector('img'), { scale: 1.05, duration: 0.4, ease: 'power2.out' });
                      gsap.to(e.currentTarget.querySelector('.overlay'), { opacity: 0, duration: 0.3 });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget.querySelector('img'), { scale: 1, duration: 0.4, ease: 'power2.out' });
                      gsap.to(e.currentTarget.querySelector('.overlay'), { opacity: 1, duration: 0.3 });
                    }}
                  >
                    <img src={img} alt={`Captura ${i + 2} de ${project.title}`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                    <div className="overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(3,3,5,0.2)', transition: 'opacity 0.3s', pointerEvents: 'none' }} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Vista ampliada de ${project.title}`}
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 99999, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(30px) saturate(150%)', display: 'flex', justifyContent: 'center', alignItems: 'center', touchAction: 'none' }}
          onClick={closeLightbox}
          onPointerDown={(e) => {
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
            pointerStartX.current = e.clientX;
            pointerStartTime.current = performance.now();
          }}
          onPointerMove={(e) => {
            if (e.buttons !== 1) return;
            setDragOffset(e.clientX - pointerStartX.current);
          }}
          onPointerUp={(e) => {
            (e.target as HTMLElement).releasePointerCapture(e.pointerId);
            const distance = e.clientX - pointerStartX.current;
            const time = performance.now() - pointerStartTime.current;
            const velocity = distance / (time || 1);
            setDragOffset(0);

            if (velocity > 0.5 || distance > 80) {
              stepImage(-1);
            } else if (velocity < -0.5 || distance < -80) {
              stepImage(1);
            }
          }}
        >
          {/* Botón X gigante */}
          <button
            ref={lightboxCloseRef}
            type="button"
            aria-label="Cerrar imagen"
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            style={{ position: 'absolute', top: '20px', right: '30px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', cursor: 'pointer', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100000, transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <FiX size={30} />
          </button>

          {galleryImages.length > 1 && (
            <>
              <button
                ref={lightboxPrevRef}
                type="button"
                aria-label="Imagen anterior"
                onClick={(e) => { e.stopPropagation(); stepImage(-1); }}
                style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', cursor: 'pointer', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100000, transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              >
                <FiChevronLeft size={28} />
              </button>
              <button
                ref={lightboxNextRef}
                type="button"
                aria-label="Imagen siguiente"
                onClick={(e) => { e.stopPropagation(); stepImage(1); }}
                style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', cursor: 'pointer', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100000, transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              >
                <FiChevronRight size={28} />
              </button>
            </>
          )}

          <img
            src={selectedImage}
            alt={`Imagen ${selectedIndex! + 2} de ${galleryImages.length + 1} de ${project.title}`}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '95vw', maxHeight: '95vh', objectFit: 'contain', display: 'block', margin: 'auto', transform: `translateX(${dragOffset}px)`, transition: dragOffset === 0 ? 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none' }}
          />
        </div>,
        document.body
      )}
    </div>
  );
}

export default ProjectFullScreen;
