import React, { useState, useMemo } from 'react';
import {
  FiExternalLink,
  FiGithub,
  FiDownload,
  FiImage,
  FiLayers,
  FiCpu,
  FiServer,
  FiSmartphone,
  FiGrid
} from 'react-icons/fi';
import { FaRobot, FaGamepad, FaShieldAlt } from 'react-icons/fa';
import { useLanguage } from '../i18n/LanguageContext';
import { getProjects, type Project } from '../data';

interface SystemsShowcaseProps {
  projects?: Project[];
  onOpenProjectDetails: (project: Project) => void;
}

type FilterCategory = 'all' | 'backend' | 'ai' | 'mobile' | 'fullstack' | 'gamedev';

interface FilterOption {
  key: FilterCategory;
  label: string;
  count: number;
  icon: React.ReactNode;
}

export const SystemsShowcase: React.FC<SystemsShowcaseProps> = ({ onOpenProjectDetails }) => {
  const { lang } = useLanguage();
  const projects = useMemo(() => getProjects(lang), [lang]);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterOptions: FilterOption[] = useMemo(() => {
    if (lang === 'en') {
      return [
        { key: 'all', label: 'All Systems', count: projects.length, icon: <FiGrid size={13} /> },
        { key: 'backend', label: 'Backend & Clean Arch', count: projects.filter(p => p.category === 'backend').length, icon: <FiServer size={13} /> },
        { key: 'ai', label: 'AI & Computer Vision', count: projects.filter(p => p.category === 'ai').length, icon: <FaRobot size={13} /> },
        { key: 'mobile', label: 'Mobile & Geospatial', count: projects.filter(p => p.category === 'mobile').length, icon: <FiSmartphone size={13} /> },
        { key: 'fullstack', label: 'Fullstack & SaaS', count: projects.filter(p => p.category === 'fullstack').length, icon: <FiLayers size={13} /> },
        { key: 'gamedev', label: 'Games & 3D', count: projects.filter(p => p.category === 'gamedev').length, icon: <FaGamepad size={13} /> },
      ];
    }
    return [
      { key: 'all', label: 'Todos los Sistemas', count: projects.length, icon: <FiGrid size={13} /> },
      { key: 'backend', label: 'Backend & Clean Arch', count: projects.filter(p => p.category === 'backend').length, icon: <FiServer size={13} /> },
      { key: 'ai', label: 'IA & Computer Vision', count: projects.filter(p => p.category === 'ai').length, icon: <FaRobot size={13} /> },
      { key: 'mobile', label: 'Mobile & Geoespacial', count: projects.filter(p => p.category === 'mobile').length, icon: <FiSmartphone size={13} /> },
      { key: 'fullstack', label: 'Fullstack & SaaS', count: projects.filter(p => p.category === 'fullstack').length, icon: <FiLayers size={13} /> },
      { key: 'gamedev', label: 'Videojuegos & 3D', count: projects.filter(p => p.category === 'gamedev').length, icon: <FaGamepad size={13} /> },
    ];
  }, [projects, lang]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesCategory = activeFilter === 'all' || p.category === activeFilter;
      const matchesSearch = searchQuery === '' || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.architectureHighlight && p.architectureHighlight.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [projects, activeFilter, searchQuery]);

  return (
    <div className="systems-showcase-wrapper">
      {/* Barra de Filtros & Búsqueda Tecnológica */}
      <div className="systems-controls-bar">
        <div className="systems-filters-tabs">
          {filterOptions.map((opt) => (
            <button
              key={opt.key}
              type="button"
              className={`systems-filter-btn ${activeFilter === opt.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(opt.key)}
            >
              {opt.icon}
              <span>{opt.label}</span>
              <span className="systems-filter-count">{opt.count}</span>
            </button>
          ))}
        </div>

        {/* Input de Búsqueda Rápida */}
        <div className="systems-search-box">
          <input
            type="text"
            placeholder={lang === 'en' ? "Search tech stack (e.g., .NET, React, PostgreSQL, CQRS)..." : "Filtrar por tecnología (ej: .NET, React, PostgreSQL, CQRS)..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="systems-search-input"
          />
          {searchQuery && (
            <button
              type="button"
              className="systems-search-clear"
              onClick={() => setSearchQuery('')}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Grid de Blueprints de Ingeniería */}
      <div className="systems-blueprint-grid">
        {filteredProjects.map((project) => {
          const sysId = `SYS-${String(project.id).padStart(2, '0')}`;
          return (
            <article key={project.id} className="system-blueprint-card gsap-reveal">
              {/* Barra superior de telemetría de la tarjeta */}
              <div className="system-card-topbar">
                <div className="system-sysid">
                  <FiCpu size={12} style={{ color: '#00f0ff' }} />
                  <span>{sysId}</span>
                </div>
                <div className="system-health-pill">
                  <span className="system-pulse-dot" />
                  <span>PROD · {project.year}</span>
                </div>
                {project.category && (
                  <span className="system-cat-badge">{project.category}</span>
                )}
              </div>

              {/* Contenedor de Imagen con Efecto Cyber-Glass */}
              <div 
                className="system-media-box"
                onClick={() => onOpenProjectDetails(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpenProjectDetails(project); }}
                aria-label={lang === 'en' ? `View screenshots of ${project.title}` : `Ver capturas de ${project.title}`}
              >
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="system-media-overlay">
                  <span className="system-inspect-btn">
                    <FiImage size={15} />
                    <span>{lang === 'en' ? `View Gallery (${project.gallery.length} shots)` : `Ver Galería (${project.gallery.length} capturas)`}</span>
                  </span>
                </div>
              </div>

              {/* Cuerpo de Especificaciones Técnicas */}
              <div className="system-card-body">
                <h3 className="system-title">{project.title}</h3>
                <div className="system-subtitle">{project.subtitle}</div>

                {project.architectureHighlight && (
                  <div className="system-arch-pill">
                    <FaShieldAlt size={12} style={{ color: '#00f0ff', flexShrink: 0 }} />
                    <span>{project.architectureHighlight}</span>
                  </div>
                )}

                <p className="system-desc">
                  {project.description.split('\n\n')[0]}
                </p>

                {/* Stack de Tecnologías */}
                <div className="system-tech-tags">
                  {project.tech.map((t) => (
                    <span key={t} className="system-tech-tag">{t}</span>
                  ))}
                </div>

                {/* Botones de Acción de Ingeniería */}
                <div className="system-actions-footer">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="system-action-btn primary"
                    >
                      <FiExternalLink size={14} />
                      <span>{lang === 'en' ? 'Live Demo' : 'Deploy'}</span>
                    </a>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="system-action-btn github"
                    >
                      <FiGithub size={14} />
                      <span>{lang === 'en' ? 'Source' : 'GitHub'}</span>
                    </a>
                  )}

                  {project.apk && (
                    <a
                      href={project.apk}
                      target="_blank"
                      rel="noreferrer"
                      className="system-action-btn apk"
                    >
                      <FiDownload size={14} />
                      <span>APK</span>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => onOpenProjectDetails(project)}
                    className="system-action-btn inspect"
                  >
                    <FiImage size={14} />
                    <span>{lang === 'en' ? 'Details' : 'Detalles'}</span>
                  </button>

                  {!project.link && !project.github && !project.apk && (
                    <span className="system-private-label">{lang === 'en' ? 'Private / Corporate Code' : 'Código Privado / Corporativo'}</span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="systems-empty-state">
          <p>{lang === 'en' ? `No systems found matching "${searchQuery}".` : `No se encontraron sistemas con el filtro actual "${searchQuery}".`}</p>
          <button
            type="button"
            className="systems-filter-btn"
            onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
          >
            {lang === 'en' ? 'Reset Filters' : 'Restablecer Filtros'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SystemsShowcase;

