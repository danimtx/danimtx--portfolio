import React, { useEffect } from 'react';
import { X, ExternalLink, FileCode, Download, CheckCircle2, Layers } from 'lucide-react';
import { TranslatedProject } from '../i18n/translations';
import { useLanguage } from '../context/LanguageContext';

interface ProjectDetailModalProps {
  project: TranslatedProject | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const { lang } = useLanguage();

  // Handle ESC key dismiss (Apple Spatial Dismissal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const isEs = lang === 'es';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Apple Dimming Scrim with Heavy Backdrop Blur */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/65 backdrop-blur-xl transition-opacity duration-300 ease-out"
        aria-hidden="true"
      />

      {/* Spring Emergence Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#141414] text-white rounded-[32px] sm:rounded-[40px] border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden my-auto z-10 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          animation: 'modalSpringIn 320ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        <style>{`
          @keyframes modalSpringIn {
            0% {
              opacity: 0;
              transform: scale(0.93) translateY(24px);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}</style>

        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-150 apple-press"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Media Banner */}
        <div className="relative w-full h-64 sm:h-80 bg-neutral-950 overflow-hidden">
          <img
            src={project.featuredImage}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />

          {/* Floating Pill Badges */}
          <div className="absolute bottom-6 left-6 sm:left-8 flex flex-wrap items-center gap-2 z-10">
            <span className="px-3 py-1 rounded-full bg-[#D4F014] text-black font-extrabold text-xs tracking-wider uppercase shadow-md">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white/90 border border-white/20 font-semibold text-xs">
              {project.role}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#D4F014] border border-[#D4F014]/30 font-semibold text-xs">
              {project.status}
            </span>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 lg:p-10 space-y-8 max-h-[70vh] overflow-y-auto">
          {/* Title and Short Overview */}
          <div className="space-y-2">
            <h2 id="modal-title" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-base text-neutral-300 font-medium leading-relaxed">
              {project.subtitle}
            </p>
          </div>

          {/* Metrics Strip if available */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-xl sm:text-2xl font-black text-[#D4F014] tracking-tight">{m.value}</p>
                  <p className="text-xs text-neutral-400 font-medium">{m.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Architecture Problem & Solution Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#D4F014]" />
                <span>{isEs ? 'El Desafío Técnico' : 'The Technical Challenge'}</span>
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4F014] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4F014]" />
                <span>{isEs ? 'Solución Arquitectural' : 'Architectural Solution'}</span>
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Engineering Highlights */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-300">
              {isEs ? 'Aspectos Destacados de Ingeniería' : 'Key Engineering Highlights'}
            </h3>
            <ul className="space-y-2.5">
              {project.highlights.map((h, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4F014] mt-2 shrink-0" />
                  <span className="leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Chips */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400">
              {isEs ? 'Tecnologías y Herramientas' : 'Tech Stack & Tooling'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-white/10 text-white font-mono text-xs border border-white/10 hover:border-[#D4F014]/50 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          {project.links && (
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
              {project.links.swagger && (
                <a
                  href={project.links.swagger}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D4F014] text-black font-bold text-xs hover:bg-[#bce00e] transition-all apple-press"
                >
                  <FileCode className="w-4 h-4" />
                  <span>{isEs ? 'Documentación Swagger' : 'Swagger Documentation'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-xs border border-white/20 transition-all apple-press"
                >
                  <span>{isEs ? 'Ver Demo en Vivo' : 'View Live Demo'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/15 transition-all apple-press"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span>{isEs ? 'Repositorio GitHub' : 'GitHub Repository'}</span>
                </a>
              )}

              {project.links.apk && (
                <a
                  href={project.links.apk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs border border-emerald-500/30 transition-all apple-press"
                >
                  <Download className="w-4 h-4" />
                  <span>{isEs ? 'Descargar APK' : 'Download APK'}</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
