import React, { useState } from 'react';
import { Sparkles, CheckCircle, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations, TranslatedProject } from '../i18n/translations';
import { ProjectDetailModal } from './ProjectDetailModal';

export const ProjectsShowcase: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<TranslatedProject | null>(null);
  const { lang } = useLanguage();
  const t = translations[lang].projects;

  const filteredProjects = selectedFilter === 'all'
    ? t.items
    : t.items.filter(p => p.category.toLowerCase().includes(selectedFilter.toLowerCase()));

  // Apple Spotlight Effect on Pointer Move
  const handleSpotlight = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="proyectos" className="w-full px-4 sm:px-6 lg:px-10 py-12 md:py-24 bg-[#F2F2EE]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-300">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D4F014]" />
              <span>{t.tag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight">
              {t.title}
            </h2>
          </div>
          <p className="text-sm text-[#6E6E73] max-w-md">
            {t.description}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {t.filters.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer apple-press ${
                selectedFilter === tab.id
                  ? 'bg-[#101010] text-[#D4F014] shadow-md'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="space-y-10">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onMouseMove={handleSpotlight}
              className="apple-spotlight apple-spotlight-inner bg-white rounded-[32px] p-6 sm:p-10 lg:p-12 border border-neutral-200/90 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-neutral-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Column: Project Details */}
                <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
                  
                  {/* Category & Status */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs font-extrabold text-[#D4F014] bg-black px-2.5 py-1 rounded-md">
                      {project.number}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold border border-neutral-200">
                      {project.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                      {project.status}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3
                      onClick={() => setActiveModalProject(project)}
                      className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111111] tracking-tight hover:text-neutral-700 cursor-pointer transition-colors"
                    >
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#6E6E73] mt-1">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Narrative: Description, Challenge, Solution */}
                  <div className="space-y-3 text-sm text-[#444444] leading-relaxed">
                    <p>{project.description}</p>
                    <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60 space-y-2">
                      <p className="text-xs text-neutral-700">
                        <strong className="text-black font-semibold">{t.labels.challenge}</strong> {project.challenge}
                      </p>
                      <p className="text-xs text-neutral-700">
                        <strong className="text-black font-semibold">{t.labels.solution}</strong> {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                      {t.labels.highlights}
                    </span>
                    <ul className="space-y-1.5">
                      {project.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                          <CheckCircle className="w-4 h-4 text-black shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-900 text-xs font-semibold border border-neutral-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics Strip if available */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="pt-3 border-t border-neutral-100 grid grid-cols-3 gap-3">
                      {project.metrics.map((metric, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/60">
                          <p className="text-xs text-neutral-500 font-medium">{metric.label}</p>
                          <p className="text-xs sm:text-sm font-extrabold text-neutral-900">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Apple Quick-View Modal Trigger Button */}
                  <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100">
                    <div className="text-xs text-neutral-500 font-medium">
                      <span className="font-semibold text-neutral-800">{t.labels.role}</span> {project.role}
                    </div>

                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#101010] hover:bg-black text-white text-xs font-bold transition-all duration-150 apple-press shadow-xs hover:shadow-md cursor-pointer group/btn"
                    >
                      <span>{lang === 'es' ? 'Ver Especificaciones' : 'View Architecture Specs'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#D4F014] transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>
                  </div>
                </div>

                {/* Right Column: Visual Mockup */}
                <div className="lg:col-span-6 order-1 lg:order-2">
                  <div
                    onClick={() => setActiveModalProject(project)}
                    className="relative rounded-[24px] overflow-hidden bg-neutral-900 border border-neutral-200 shadow-lg group aspect-video sm:aspect-[4/3] flex items-center justify-center p-2 cursor-pointer apple-press"
                  >
                    <img
                      src={project.featuredImage}
                      alt={project.title}
                      className="w-full h-full object-contain object-center rounded-[18px] transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />

                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-semibold border border-white/10">
                      {project.category}
                    </div>

                    <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-[#D4F014] text-black text-xs font-extrabold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                      <span>{lang === 'es' ? 'Abrir Ficha' : 'Expand'}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>

              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Apple-grade Quick-View Architecture Modal */}
      <ProjectDetailModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
