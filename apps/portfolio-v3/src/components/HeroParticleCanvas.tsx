import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroParticleCanvasProps {
  className?: string;
}

/**
 * HeroParticleCanvas
 * 
 * 1:1 Translation of the AFTRDRK 3D particle tunnel from portfolio-v3.mp4 & portfolio-v3.jpg:
 * - 3D cylindrical tunnel / curved arched perspective grid receding toward the center-horizon.
 * - Discrete concentric rings receding along the Z depth axis (~1,380 crisp particles).
 * - Hypnotic, rhythmic wave pulses traveling through the rings: each pulse expands the ring radius,
 *   scales up the particle size, and ignites bright white/cyan luminance.
 * - Smooth mouse parallax tilt and harmonic influence.
 * - Smooth fade out to pure void black (#050505) at the outer margins.
 * - Lightweight GPU vertex/fragment shaders running at solid 60-120 FPS.
 */
export const HeroParticleCanvas: React.FC<HeroParticleCanvasProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = mediaQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    // Track tab visibility to pause render loop and conserve resources
    let isTabVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Dimensions
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);

    // Camera - placed looking down the cylindrical tunnel axis
    const camera = new THREE.PerspectiveCamera(54, width / height, 0.1, 1000);
    const defaultCamPos = { x: 0, y: 1.5, z: 22 };
    const defaultLookAt = new THREE.Vector3(0, -0.5, -35);
    camera.position.set(defaultCamPos.x, defaultCamPos.y, defaultCamPos.z);
    camera.lookAt(defaultLookAt);

    // Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // Particle Tunnel Geometry Setup
    // 30 rings along depth Z, 46 particles per ring = 1,380 points
    const NUM_RINGS = 30;
    const PARTICLES_PER_RING = 46;
    const TOTAL_PARTICLES = NUM_RINGS * PARTICLES_PER_RING;

    const positions = new Float32Array(TOTAL_PARTICLES * 3);
    const ringIndices = new Float32Array(TOTAL_PARTICLES);
    const angles = new Float32Array(TOTAL_PARTICLES);

    let idx = 0;
    for (let r = 0; r < NUM_RINGS; r++) {
      const ringNorm = r / (NUM_RINGS - 1); // 0.0 near -> 1.0 deep
      for (let p = 0; p < PARTICLES_PER_RING; p++) {
        const angle = (p / PARTICLES_PER_RING) * Math.PI * 2;

        // Base positions in resting elliptical cylinder
        positions[idx * 3 + 0] = 0;
        positions[idx * 3 + 1] = 0;
        positions[idx * 3 + 2] = 0;

        ringIndices[idx] = ringNorm;
        angles[idx] = angle;
        idx++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aRing', new THREE.BufferAttribute(ringIndices, 1));
    geometry.setAttribute('aAngle', new THREE.BufferAttribute(angles, 1));

    // Custom Shader Material for exact AFTRDRK concentric pulses & crisp anti-aliased glowing dots
    const vertexShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uPixelRatio;
      uniform float uReducedMotion;

      attribute float aRing;
      attribute float aAngle;

      varying float vPulse;
      varying float vAlpha;
      varying vec3 vColor;

      void main() {
        // Depth distribution: near z = 10.0 to horizon z = -55.0
        float baseZ = mix(10.0, -55.0, aRing);

        // Base elliptical tunnel radius flaring gently toward the front
        float rx = mix(34.0, 19.0, aRing);
        float ry = mix(19.0, 11.5, aRing);

        // Concentric rhythmic traveling wave pulses
        // Waves travel from depth toward the viewer (or outward)
        float waveSpeed = uReducedMotion > 0.5 ? 0.35 : 1.7;
        float waveFreq = 9.0;
        
        // Primary traveling pulse
        float p1 = sin(aRing * waveFreq - uTime * waveSpeed);
        float pulse1 = pow(max(0.0, p1), 4.2);

        // Secondary harmonic pulse offset in phase
        float p2 = sin(aRing * waveFreq - (uTime * waveSpeed + 1.9));
        float pulse2 = pow(max(0.0, p2), 5.0) * 0.75;

        float totalPulse = clamp(pulse1 + pulse2, 0.0, 1.2);

        // Organic undulating wave around the ring
        float undulation = sin(aAngle * 3.0 + uTime * 0.7 + aRing * 4.0) * (uReducedMotion > 0.5 ? 0.15 : 0.6);

        // Radial expansion when the wave pulse passes through this ring
        float expansion = totalPulse * (uReducedMotion > 0.5 ? 1.5 : 3.8);
        float currentRx = rx + expansion + undulation;
        float currentRy = ry + expansion * 0.7 + undulation * 0.6;

        // Position on the elliptical tunnel
        float x = cos(aAngle) * currentRx;
        float y = sin(aAngle) * currentRy;

        // Subtle mouse influence bending the tunnel gently
        x += uMouse.x * (1.0 - aRing) * 4.0;
        y -= uMouse.y * (1.0 - aRing) * 3.0;

        vec3 displacedPos = vec3(x, y, baseZ);

        vec4 mvPosition = modelViewMatrix * vec4(displacedPos, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        // Point sizing:
        // Base size is crisp (~3.5px), expanding up to 8.5px with bright luminance on pulse crests
        float baseSize = mix(3.8, 2.4, aRing);
        float pulseSize = totalPulse * 6.5;
        gl_PointSize = (baseSize + pulseSize) * uPixelRatio * (48.0 / -mvPosition.z);

        // Depth & boundary fading into pure black #050505
        float nearFade = smoothstep(0.0, 0.12, aRing);
        float farFade = smoothstep(1.0, 0.82, aRing);
        float edgeFade = nearFade * farFade;

        // Vertical arch contrast: top and bottom dots slightly more visible
        float archFactor = 0.8 + 0.2 * abs(sin(aAngle));

        vAlpha = edgeFade * archFactor * mix(0.4, 1.0, totalPulse);
        vPulse = totalPulse;

        // Color blending:
        // Quiescent: tactical luminous cyan (#00d2fe)
        // Wave Crest: brilliant pure titanium white (#ffffff)
        vec3 colCyan = vec3(0.0, 0.88, 1.0);
        vec3 colWhite = vec3(1.0, 1.0, 1.0);
        vColor = mix(colCyan, colWhite, clamp(totalPulse * 1.35, 0.0, 1.0));
      }
    `;

    const fragmentShader = `
      varying float vPulse;
      varying float vAlpha;
      varying vec3 vColor;

      void main() {
        // Precise anti-aliased circular particle
        vec2 centerCoord = gl_PointCoord - vec2(0.5);
        float dist = length(centerCoord);

        if (dist > 0.5) discard;

        // Crisp dot core with smooth antialiased outer fringe
        float core = smoothstep(0.5, 0.32, dist);

        // Dynamic halo glow when pulsed
        float halo = exp(-dist * 4.5) * 0.45 * vPulse;

        float alpha = (core + halo) * vAlpha;
        gl_FragColor = vec4(vColor, alpha);
      }
    `;

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
      uReducedMotion: { value: prefersReducedMotion ? 1.0 : 0.0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse Interaction
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          width = newW;
          height = newH;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
          const pr = Math.min(window.devicePixelRatio || 1, 2);
          renderer.setPixelRatio(pr);
          uniforms.uPixelRatio.value = pr;
        }
      }
    });
    resizeObserver.observe(container);

    // Render loop
    let animationFrameId: number;
    let lastTime = performance.now();
    let clockTime = 0;

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isTabVisible) {
        lastTime = currentTime;
        return;
      }

      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      clockTime += delta;
      uniforms.uTime.value = clockTime;
      uniforms.uReducedMotion.value = prefersReducedMotion ? 1.0 : 0.0;

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.045;
      currentMouseY += (targetMouseY - currentMouseY) * 0.045;
      uniforms.uMouse.value.set(currentMouseX, currentMouseY);

      // Camera parallax tilt
      const camTargetX = defaultCamPos.x + currentMouseX * 6.0;
      const camTargetY = defaultCamPos.y - currentMouseY * 3.5;
      camera.position.x += (camTargetX - camera.position.x) * 0.045;
      camera.position.y += (camTargetY - camera.position.y) * 0.045;
      camera.lookAt(
        defaultLookAt.x + currentMouseX * 1.5,
        defaultLookAt.y - currentMouseY * 1.0,
        defaultLookAt.z
      );

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      mediaQuery.removeEventListener('change', handleMotionChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      resizeObserver.disconnect();

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
