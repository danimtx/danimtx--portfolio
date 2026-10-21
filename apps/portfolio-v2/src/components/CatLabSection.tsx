import React from 'react';
import { Sparkles, ArrowUpRight, FlaskConical } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CatLabSectionProps {
  onOpenLab: () => void;
}

export const CatLabSection: React.FC<CatLabSectionProps> = ({ onOpenLab }) => {
  const { lang } = useLanguage();
  const isEs = lang === 'es';

  return (
    <section
      id="cat-lab-section"
      className="w-full px-4 sm:px-6 lg:px-10 pt-10 pb-16"
    >
      <div className="max-w-7xl mx-auto">
        <div
          data-cat-ledge="true"
          data-cat-ledge-id="cat-lab-card"
          data-cat-surface="light"
          data-cat-behavior="curious"
          className="relative rounded-[28px] bg-white border border-neutral-200/90 shadow-lg px-6 py-6 sm:px-10 sm:py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all duration-300 hover:border-neutral-300 hover:shadow-xl"
        >
          {/* Left: Badge & Description */}
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101010] text-[#D4F014] text-[11px] font-bold uppercase tracking-wider">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>{isEs ? 'Laboratorio Interactivo · IK & Física 2D' : 'Interactive Lab · 2D IK & Physics'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight flex items-center gap-2">
              <span>
                {isEs
                  ? '¿Quieres probar todas las animaciones del gato?'
                  : 'Want to test all of the cat’s animations?'}
              </span>
              <Sparkles className="w-4 h-4 text-[#96D600] shrink-0" />
            </h3>
            <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
              {isEs
                ? 'Explora el banco de pruebas interactivo donde el gato se posa en repisas, camina en sigilo, trota, mira de frente, bosteza y muestra su esqueleto cinemático en cámara lenta.'
                : 'Explore the interactive workbench where the cat perches on ledges, stealth-walks, trots, looks at the camera, yawns, and reveals its kinematic skeleton in slow motion.'}
            </p>
          </div>

          {/* Right: Action Button to open CatLab */}
          <div className="flex items-center gap-3 self-stretch md:self-center shrink-0">
            <a
              href="/?catlab"
              data-testid="open-catlab-btn"
              onClick={(e) => {
                e.preventDefault();
                onOpenLab();
              }}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#101010] text-[#D4F014] font-bold text-xs sm:text-sm hover:bg-neutral-800 shadow-md hover:shadow-lg transition-all duration-200 group apple-press cursor-pointer"
            >
              <span>{isEs ? 'Ir al Laboratorio del Gato' : 'Open Cat Animation Lab'}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
