# AGENTS.md

React 19 + TypeScript + Vite single-page systems engineering & software architecture portfolio. Deployed to Vercel from branch `main`.

## Commands

- `npm run dev` — Vite dev server
- `npm run lint` — ESLint (`eslint .`). Run before building.
- `npm run build` — `tsc -b` (typecheck) followed by `vite build`. Deploys to Vercel, so any type error breaks deployment. There is no standalone typecheck script; use `npm run build` to verify types and build output.
- `npm run build:pdf` — Generates `public/cv.pdf` from `public/cv.md` via headless browser (Edge/Chrome) using `scripts/build-cv-pdf.mjs`.
- `npm run preview` — Vite preview on port 4173.
- No test framework exists. Recommended verification: `npm run lint && npm run build`.

## Internationalization (i18n)

The site is fully bilingual (English and Spanish) via `src/i18n/LanguageContext.tsx` (`Language = 'en' | 'es'`).
- UI labels live in `src/i18n/translations.ts` (`DICTIONARY`). All new UI copy must provide both `en` and `es` entries.
- Hero typewriter roles are localized (`heroRolesEn`, `heroRolesEs` in `src/data.ts`).
- Interactive terminal commands have localized outputs (`COMMANDS_EN`, `COMMANDS_ES` in `src/components/HeroKernelTerminal.tsx`).
- Default language is `'en'`, persisted in `localStorage` as `'dmt_portfolio_lang'`.

## Content & Data (src/data.ts)

- Projects are retrieved via `getProjects(lang: Language)` returning `Project[]`. If you add or modify a project, update both English and Spanish lists in `src/data.ts`.
- `Project` fields: `id, title, subtitle, description, architectureHighlight?, tech[], image, gallery[], link, github, apk?, year, category?`.
  - `category`: `'fullstack' | 'backend' | 'mobile' | 'ai' | 'gamedev'` (powers `SystemsShowcase` filter tabs).
  - `ProjectFullScreen` (`src/ProjectFullScreen.tsx`) renders `gallery.slice(1)` as screenshots, `architectureHighlight`, and `tech` badges — missing fields degrade the modal view.
- Skills are retrieved via `getSkillCategories(lang: Language)`. The `iconKey` on each skill maps to react-icons via `renderSkillIcon()` in `src/App.tsx`.
- Certificates are defined in `mainCertificates` and `otherCertificates` typed as `Certificate` (`id, title, institution?, year?, img`).
- Image paths are absolute URLs (e.g. `/projects/Doctemia/home.WebP`) served from `public/projects/`. Filename extensions are mixed and case-sensitive (`.WebP`, `.png`, `.jpeg`, `.jpg`) — match the disk filename casing exactly or Vercel production deployment will 404.

## Architecture & Visual Stack

- **Background Animation**: `src/components/CyberMatrixBackground.tsx` runs an HTML5 2D Canvas matrix & particle constellation network (desynchronized 2D context). Screen width < 768 reduces node count (32 vs 65) and connection radius.
- **Legacy 3D Assets**: Static GLB models and Draco decoder remain in `public/models/` and `public/draco/` (`astronaut-stand.glb`, `bfr.glb`, `moon.glb`, `planets.glb`, `station.glb`), but Three.js / R3F is not currently loaded in the main UI (`Scene.tsx` was replaced by 2D canvas components).
- **Interactive Technical Components**:
  - `ArchitectureSchematic.tsx`: Interactive SVG diagram demonstrating Clean Architecture, CQRS, and AI agent layers.
  - `AlgorithmVisualizer.tsx`: Graph/Dijkstra step-by-step pathfinding visualizer representing ICPC competitive programming work.
  - `HeroKernelTerminal.tsx`: Simulated interactive cyber terminal with inspect/filter commands.
  - `SystemsShowcase.tsx`: Searchable and category-filterable systems catalog with direct links and modal detail triggers.
- **Scroll & State Signals**:
  - Smooth scrolling is managed by Lenis wired into GSAP's ticker (`ScrollTrigger.update()`) in `App.tsx`. Never start a competing `requestAnimationFrame` loop for scroll logic.
  - Scroll reset and restoration must use `src/scroll.ts` (`scrollToTopImmediate()`, `getScrollPosition()`, `restoreScrollPosition()`). Do NOT call `window.scrollTo(0, 0)` directly; `scroll-behavior: smooth` in `src/index.css` causes it to animate slowly and fail scroll restoration.
  - `src/sectorSignal.ts` tracks active sections (`hero`, `about`, `projects`, `achievements`, `contact`) and scroll/pointer/hover telemetry.
  - When opening `ProjectFullScreen`, the main app is hidden (`display: 'none'`) and page scroll is restored upon close.

## Gotchas & Build Rules

- `tsconfig.app.json` enforces `noUnusedLocals: true`, `noUnusedParameters: true`, and `verbatimModuleSyntax: true`. Unused imports or variables will immediately fail `tsc -b` and break builds.
- `allowImportingTsExtensions: true` is enabled in `tsconfig.app.json`; local relative imports may include `.tsx`/`.ts` extensions.
- Images are automatically optimized during build by `vite-plugin-image-optimizer` (Sharp / SVGO, quality 80); manual image compression before committing is unnecessary.
- `resourses/laptop.mb` is an unused legacy Maya binary; ignore it.
- `.agents/skills/` is gitignored and tracked via `skills-lock.json`.
