# AGENTS.md

React 19 + TypeScript + Vite single-page portfolio with a Three.js (react-three-fiber) background scene. All UI copy is Spanish — keep new user-facing text in Spanish.

## Commands

- `npm run dev` — dev server
- `npm run build` — `tsc -b` (typecheck) then `vite build`. Deploys to Vercel, so `tsc -b` errors break deployment. There is no separate typecheck script; use `npm run build` to verify.
- `npm run lint` — ESLint (eslint .)
- No test framework exists.

## Content lives in src/data.ts

Projects and certificates are data-driven and typed (`Project`/`Certificate` interfaces in the same file). `projects` entries must follow the existing shape: `id, title, subtitle, description, tech[], image, gallery[], link, github, apk?, year`. The `ProjectFullScreen` overlay in `src/ProjectFullScreen.tsx` renders `gallery.slice(1)` and `tech` — missing fields will break rendering.

Image paths are absolute URLs (`/projects/Doctemia/home.WebP`) served from `public/projects/`. Extensions are mixed (`.WebP`, `.png`) — match the actual file exactly. Add new screenshots under `public/projects/<project-name>/`.

## 3D scene

- `src/Scene.tsx` loads `public/astronaut-optimized.glb` via `useGLTF('/astronaut-optimized.glb')` — the sitting astronaut, pivoted at the base (bbox ≈ 0.60×1.03×0.55), so the Y anchor is calibrated as `anchorY − scale·0.5`. The standing `public/models/astronaut-stand.glb` is legacy/unused. New models must be placed in `public/` and referenced with a leading slash. The GLB is already Draco+WebP compressed — recompress with gltf-transform if replacing it.

### Draco decoder is self-hosted — don't point it back at the CDN

`astronaut-optimized.glb` uses `KHR_draco_mesh_compression`, so it needs the DRACO WASM decoder. drei's `useGLTF` **defaults to Google's CDN** (`https://www.gstatic.com/draco/versioned/decoders/1.5.5/`). When that CDN is slow or blocked, the model fails to decode: the loading bar stalls (~86%) and the astronaut never renders (the whole Scene can fall to the `hero.png` error boundary).

The decoder is self-hosted so the model loads offline/deterministically:

- Decoder files live in `public/draco/` (`draco_decoder.js`, `draco_decoder.wasm`, `draco_wasm_wrapper.js`) — copied from `node_modules/three/examples/jsm/libs/draco/`.
- `Scene.tsx` calls `useGLTF.setDecoderPath('/draco/')` at module scope, before any `useGLTF`/`useGLTF.preload` call. Keep it there if you ever swap the model.
- If you replace the GLB and it stays Draco-compressed, no action needed. If you re-encode it WITHOUT Draco, you can drop the `setDecoderPath` line and the `public/draco/` folder.
- The Canvas runs with `dpr={1}` (see App.tsx); keep the scene light. The environment uses drei `Lightformer`s (no external HDR download).
- The Canvas is **unmounted while the project overlay is open** — do NOT "pause" it with `frameloop="never"`: R3F v9 kills its rAF loop (and the hidden canvas can lose its WebGL context), so the background comes back white after closing the overlay. Remount is instant because `useGLTF.preload` caches the GLB.
- Scroll reset when opening/closing the overlay goes through `scrollToTopImmediate()` in `src/scroll.ts` (Lenis `scrollTo` with `immediate: true`) — plain `window.scrollTo(0,0)` animates because of `scroll-behavior: smooth` in `index.css` and lands mid-page.
- `Scene.tsx` detects mobile via UA and reduces Stars/Sparkles/point lights accordingly.
- App.tsx falls back to a static `src/assets/hero.png` background when WebGL is unavailable.
- Smooth scrolling is Lenis wired into GSAP's ticker with `ScrollTrigger.update` in `App.tsx` — new scroll animations should register ScrollTrigger through the existing setup, not a second rAF loop.

## Gotchas

- `tsconfig.app.json` has `noUnusedLocals`/`noUnusedParameters`; unused imports/vars fail the build (git history shows past Vercel build failures from this).
- Code style in `App.tsx` is loose — inline styles, `any`-typed props, no comments required.
- Images are auto-optimized at build (vite-plugin-image-optimizer, quality 80); don't manually compress.
- `resourses/laptop.mb` is an unused Maya binary; ignore it.
- `.agents/skills/` is gitignored and managed via `skills-lock.json` (3d-web-experience, frontend-design skills are available for this project).
