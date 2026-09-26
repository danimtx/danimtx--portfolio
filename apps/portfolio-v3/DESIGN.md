---
name: Portfolio V3 Monolith (AFTRDRK)
description: Cyber-Intelligence & Distributed Systems Monolith with Kinetic Particle Matrix and High-Contrast Titanium Bento
colors:
  primary: "#00F2FE"
  primary-hover: "#38BDF8"
  accent-emerald: "#10B981"
  surface-void: "#050505"
  surface-card: "#09090C"
  surface-card-hover: "#121214"
  surface-titanium: "#D4D4D8"
  surface-titanium-bright: "#ECECEE"
  text-primary: "#FFFFFF"
  text-muted: "#A1A1AA"
  text-ghost: "rgba(255, 255, 255, 0.35)"
  border-subtle: "rgba(255, 255, 255, 0.08)"
typography:
  display:
    fontFamily: "Syne, sans-serif"
    fontSize: "clamp(2.5rem, 8vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Syne, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  sm: "6px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  panel: "32px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.text-primary}"
    textColor: "{colors.surface-void}"
    rounded: "{rounded.md}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
  button-secondary:
    backgroundColor: "rgba(255, 255, 255, 0.03)"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "14px 20px"
---

# Design System: Portfolio V3 Monolith (AFTRDRK)

## Overview

**Creative North Star: "The Deep Architecture Monolith"**

Portfolio V3 refuses the predictable web tropes of bubbly cards, generic SaaS purple gradients, and synthetic claims. It creates a space of deep void black (`#050505`) where high-concurrency systems, algorithmic solvers, and offline-first mobile infrastructures operate in silence. Contrast is structural: vast dark fields dramatize tangible, physical execution slabs forged in high-contrast Titanium Platinum (`#D4D4D8`).

The interface operates in **Experience** and **Persuade** modes. The first viewport leads immediately with an interactive 3D WebGL particle wave matrix that responds with physical inertia to cursor dynamics, flanked by a dual-tone ghost headline and a tactile holographic Stealth Cat telemetry reticle.

**Key Characteristics:**
- **Zero Noise, Verifiable Signal**: Grounded in real competitive benchmarks (2x ICPC Regional Finalist) and real production architectures (.NET 10, React Native, PostGIS).
- **Dual Materiality**: Pure dark void for architectural focus; light metallic titanium slabs for tangible engineering delivery.
- **Micro-Telemetry Instrumentation**: Monospace brackets (`[ 01 // ARCHITECTURE ]`), live pinging LEDs, latency readouts, and right-edge vertical scroll tracking.
- **Physical Spring Inertia**: Tactile active press responses and gentle parallax camera tilt.

## Colors

The palette is anchored by deep void black, punctured by surgical cyan optics, titanium white, and cold platinum metallics.

### Primary
- **Laser Cyan** (`#00F2FE`): Used strictly for active telemetry, primary hover highlights, focus rings, and focal focal points. Rare by design.

### Secondary
- **Signal Emerald** (`#10B981`): Operational status badges, verified telemetry, and live system signals (`SYS: ONLINE`).

### Neutral
- **Void Black** (`#050505`): The primary atmospheric ground of the canvas and background.
- **Deep Monolith Charcoal** (`#09090C` / `#121214`): Surface container for dark telemetry cards and carousel items.
- **Titanium Platinum** (`#D4D4D8` / `#ECECEE`): The high-contrast bento slab background providing stark inverted materiality.
- **Pure White** (`#FFFFFF`): Primary typographic headlines and active button fills.
- **Muted Zinc** (`#71717A` / `#A1A1AA`): Supporting technical descriptions and metadata.
- **Ghost White** (`rgba(255, 255, 255, 0.35)`): Secondary word contrast in dual-tone headlines.

### Named Rules
**The Rarity of Cyan Rule.** Cyan is an active optical emitter, never a background wash. It is used on ≤5% of any given screen so that its presence commands immediate focus.

## Typography

**Display Font:** Syne (with -apple-system, sans-serif fallback)  
**Body Font:** Plus Jakarta Sans (with system-ui fallback)  
**Label/Mono Font:** JetBrains Mono (with monospace fallback)  

**Character:** Industrial, geometric, and authoritative. Syne delivers heavy geometric headlines without standard serif nostalgia, Plus Jakarta Sans provides high-density legible documentation, and JetBrains Mono anchors all system telemetry.

### Hierarchy
- **Display** (800, clamp(2.5rem, 8vw, 6rem), 0.95): First-viewport monolith headlines (`ARCHITECTING SYSTEMS IN THE SHADOWS`).
- **Headline** (800, clamp(2rem, 5vw, 3.75rem), 1.05): Section headers (`CAPABILITIES // ARCHITECTURAL SPECIALIZATION`).
- **Title** (700, 1.5rem, 1.25): Card titles and modal headers.
- **Body** (400, 1rem, 1.6): Architectural explanations and project briefs (max line length: 65ch).
- **Label** (600, 0.75rem, 0.08em, uppercase): Bracketed badges, telemetry readouts, status pills.

### Named Rules
**The Ghost Word Rule.** Long headlines must split emphasis: key operative verbs stand in solid white, while atmospheric descriptors step back in ghost tone (`rgba(255, 255, 255, 0.35)`), creating depth before the user reads.

## Layout

- **Grid Architecture**: 12-column responsive layout maxed at 1280px (`max-w-7xl`), centered with fluid horizontal margins (`px-4 sm:px-6 lg:px-8`).
- **Vertical Spacing Rhythm**: 64px to 96px (`py-16` to `py-24`) between major architectural sections.
- **Scroll Tracking**: Right-edge fixed monospace telemetry track (`[ 01 // 05 ] SCROLL` with real-time percentage badge).

## Elevation & Depth

Surfaces do not rely on generic drop shadows. Depth is generated through **luminance hierarchy**, **border contrast**, and **tonal inversion**:
- **Void Ground**: `#050505` with 40px cyber grid and radial vignette.
- **Titanium Bento**: High-contrast light slab (`surface-titanium`) creating an undeniable focal plane.
- **Cyan Glow**: `box-shadow: 0 0 30px rgba(0, 242, 254, 0.35)` on primary actions.

## Shapes

- **Slabs & Bento Panels**: Generous rounded corners (`rounded-[32px]`) with crisp inner hairline borders (`1px solid rgba(255, 255, 255, 0.08)` or `1px solid rgba(0, 0, 0, 0.08)`).
- **Action Buttons**: Modern rounded rectangles (`rounded-xl` / 12px) with snappy spring-press response (`active:scale-[0.975]`).
- **Pills & Badges**: Fully rounded (`rounded-full`) capsule geometry for telemetry tags.

## Components

### CyberNavbar
- **Style**: Floating header with `backdrop-blur-xl` and subtle bottom hairline.
- **Telemetry**: Stealth Cat vector emblem + `SYS: ONLINE` green pulsing indicator + instant `EN / ES` toggle + direct CV link.

### HeroParticleCanvas
- **WebGL 3D Matrix**: Three.js 90x90 particle grid (8,100 points) undulating with harmonic waves, normalized cursor parallax, and smooth edge-fade into `#050505`.

### StealthHoloCard
- **Interactive Hologram**: Concentric counter-rotating cyan rings, orbital tick marks, Stealth Cat vector silhouette, live latency simulation, and 3D mouse tilt.

### TitaniumServicesBento
- **Inverted Metallic Surface**: `#D4D4D8` high-contrast panel featuring an interactive live architecture simulator with tabbed execution views (.NET 10, Offline GIS, Judge0).

### FieldProvenCarousel
- **Monolith Showcase**: Charcoal cards (`#121214`) featuring interactive pagination `[←] [→]`, detailed architecture highlights, and full modal expansion for verified production systems.

### HorizonCtaCard
- **Atmospheric Horizon**: Cyan-blue gradient burst card with one-click email copying micro-interaction and verified dossier access.

## Do's and Don'ts

### Do:
- **Do** anchor every claim in verifiable production metrics (e.g. 2x ICPC Regional Finalist, .NET 10 Clean Architecture).
- **Do** maintain strict high contrast between text and background on both void and titanium surfaces.
- **Do** preserve physical spring inertia on interactive button clicks (`active:scale-[0.975]`).
- **Do** respect `prefers-reduced-motion` with graceful particle dampening.

### Don't:
- **Don't** use generic purple SaaS gradients or decorative 3D floating shapes that convey no technical meaning.
- **Don't** add em-dashes (—) in marketing copy.
- **Don't** use standard colorful bubbly templates that contradict the "AFTRDRK" aesthetic.
