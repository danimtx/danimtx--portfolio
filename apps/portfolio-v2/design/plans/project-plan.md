# Plan de Ejecución Técnico & Creativo (Portfolio V2)

Este plan detalla las fases para inicializar, estructurar, desarrollar y desplegar **Portfolio V2** basándonos en la referencia visual aprobada.

---

## Fase 1: Inicialización del Proyecto en `apps/portfolio-v2`
- Inicializar con **Vite + React 19 + TypeScript + Tailwind CSS**.
- Configurar soporte para fuentes tipográficas neo-grotesque modernas (Satoshi / Plus Jakarta Sans).
- Integrar la imagen generada (`hero-portrait.jpg`) en los assets públicos optimizados.
- Conectar con los datos reales en `packages/shared-data` (CV, certificados, descripciones de proyectos).

## Fase 2: Configuración del Sistema de Diseño (Design Tokens)
- Configurar colores exactos en `tailwind.config`:
  - `brand-dark: #101010`
  - `brand-lime: #D4F014`
  - `brand-light: #F8F8F6`
  - `brand-gray: #6E6E73`
- Configurar radios de curvatura consistentes (`rounded-[32px]`, `rounded-full`).

## Fase 3: Construcción de Componentes UI
1. **Header / Navbar**:
   - Monograma con iniciales.
   - Píldoras con efecto glassmorphism.
   - Botón interactivo "Let's talk".
2. **Hero Section**:
   - Contenedor oscuro curvado.
   - Retrato integrado con viñeta y máscara degradada suave.
   - Tipografía display y botón lima.
   - Métricas y chip de habilidades técnicas.
3. **Intro Section**:
   - Indicador dinámico de disponibilidad y tipografía en dos tonos.
4. **Services Accordion**:
   - Despliegue interactivo con vista previa visual al seleccionar un servicio.
5. **Projects Showcase**:
   - Tarjetas de proyectos reales (adaptando tus proyectos existentes: Dino, Doctemia, Vinus, Sprinter, etc.).
6. **Process & Social Proof**:
   - Pasos de metodología y certificados (ICPC, Google, etc.).
7. **Footer**:
   - Cierre oscuro con enlaces de contacto rápido.

## Fase 4: Micro-interacciones & Animaciones Fluidas
- Animaciones de entrada suaves (Motion / Tailwind transition).
- Hover states físicos y elásticos en botones.
- Scroll suave (Lenis o nativo optimizado).

## Fase 5: QA & Despliegue en Vercel
- Comprobación de responsive design (móvil, tablet, desktop ultra-wide).
- Verificación de rendimiento y accesibilidad (Lighthouse / Core Web Vitals).
- Despliegue apuntando Vercel a `apps/portfolio-v2` cuando esté listo.
