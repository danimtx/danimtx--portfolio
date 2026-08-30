import { useEffect, useRef } from 'react';
import { scrollSignal } from '../sectorSignal';

interface NodeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  alpha: number;
  pulsePhase: number;
  layer: number; // 1 = foreground, 0 = background
}

interface Packet {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

export default function CyberMatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Cached gradient
    let bgGradient: CanvasGradient | null = null;

    const updateGradient = () => {
      bgGradient = ctx.createRadialGradient(
        width * 0.75,
        height * 0.3,
        20,
        width * 0.75,
        height * 0.3,
        width * 0.6
      );
      bgGradient.addColorStop(0, 'rgba(191, 0, 255, 0.045)');
      bgGradient.addColorStop(0.5, 'rgba(0, 240, 255, 0.025)');
      bgGradient.addColorStop(1, 'rgba(2, 2, 7, 0)');
    };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      updateGradient();
    };
    window.addEventListener('resize', resize, { passive: true });
    updateGradient();

    const pointer = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      active: false,
      radius: 150,
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      pointer.targetX = clientX;
      pointer.targetY = clientY;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('mouseleave', onPointerLeave, { passive: true });

    // Inicializar nodos optimizados
    const isMobile = width < 768;
    const NODE_COUNT = isMobile ? 32 : 65;
    const CONNECT_DIST = isMobile ? 90 : 130;
    const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;
    const colors = ['#00f0ff', '#bf00ff', '#4d94ff', '#00ff88'];

    const nodes: NodeParticle[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const layer = Math.random() > 0.65 ? 1 : 0;
      const baseRadius = layer === 1 ? Math.random() * 1.8 + 1.2 : Math.random() * 1.0 + 0.6;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (layer === 1 ? 0.6 : 0.3),
        vy: (Math.random() - 0.5) * (layer === 1 ? 0.6 : 0.3),
        radius: baseRadius,
        baseRadius,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: layer === 1 ? 0.7 : 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        layer,
      });
    }

    // Paquetes de datos livianos
    const packets: Packet[] = [];
    const maxPackets = isMobile ? 6 : 14;

    const spawnPacket = () => {
      if (packets.length >= maxPackets) return;
      const from = Math.floor(Math.random() * nodes.length);
      let nearest = -1;
      let minSq = CONNECT_DIST_SQ;
      for (let j = 0; j < nodes.length; j++) {
        if (from === j) continue;
        const dx = nodes[from].x - nodes[j].x;
        const dy = nodes[from].y - nodes[j].y;
        const distSq = dx * dx + dy * dy;
        if (distSq < minSq) {
          minSq = distSq;
          nearest = j;
        }
      }
      if (nearest !== -1) {
        packets.push({
          fromNode: from,
          toNode: nearest,
          progress: 0,
          speed: 0.016 + Math.random() * 0.02,
          color: Math.random() > 0.5 ? '#00f0ff' : '#bf00ff',
        });
      }
    };

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      // Suavizado del puntero
      pointer.x += (pointer.targetX - pointer.x) * 0.15;
      pointer.y += (pointer.targetY - pointer.y) * 0.15;

      const scrollVel = Math.abs(scrollSignal.velocity || 0);
      const scrollBoost = Math.min(scrollVel / 20, 2.0);

      // Fondo dark obsidian
      ctx.fillStyle = '#020207';
      ctx.fillRect(0, 0, width, height);

      // Resplandor nebular pre-calculado
      if (bgGradient) {
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Cuadrícula sutil batched
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.012)';
      ctx.lineWidth = 1;
      const gridSize = 90;
      const offsetX = (time * 0.004) % gridSize;
      const offsetY = (time * 0.006) % gridSize;

      ctx.beginPath();
      for (let x = offsetX; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = offsetY; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Spawn periódico de paquetes
      if (Math.random() < 0.12) spawnPacket();

      // Actualizar posiciones de nodos
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.pulsePhase += dt * 2.0;

        node.x += node.vx * (1 + scrollBoost * 1.2);
        node.y += (node.vy - scrollBoost * 0.3) * (1 + scrollBoost * 1.2);

        if (node.x < 0) node.x = width;
        else if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        else if (node.y > height) node.y = 0;

        if (pointer.active) {
          const dx = node.x - pointer.x;
          const dy = node.y - pointer.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < pointer.radius * pointer.radius && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / pointer.radius) * 1.5;
            node.x += (dx / dist) * force;
            node.y += (dy / dist) * force;
          }
        }

        node.radius = node.baseRadius + Math.sin(node.pulsePhase) * 0.3;
      }

      // Dibujar líneas batcheadas por opacidad media
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
      ctx.beginPath();
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < CONNECT_DIST_SQ) {
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
          }
        }
      }
      ctx.stroke();

      // Conexiones al puntero si está activo
      if (pointer.active) {
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.22)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        const pRadSq = pointer.radius * pointer.radius;
        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i];
          const dx = a.x - pointer.x;
          const dy = a.y - pointer.y;
          if (dx * dx + dy * dy < pRadSq) {
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(pointer.x, pointer.y);
          }
        }
        ctx.stroke();
      }

      // Dibujar paquetes de datos
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.progress += p.speed * (1 + scrollBoost);
        if (p.progress >= 1) {
          packets.splice(i, 1);
          continue;
        }

        const nodeA = nodes[p.fromNode];
        const nodeB = nodes[p.toNode];
        if (!nodeA || !nodeB) {
          packets.splice(i, 1);
          continue;
        }

        const px = nodeA.x + (nodeB.x - nodeA.x) * p.progress;
        const py = nodeA.y + (nodeB.y - nodeA.y) * p.progress;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(px, py, 2.0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Dibujar nodos (2 pasadas rápidas: halo suave + núcleo sólido, SIN shadowBlur)
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Halo suave exterior
        ctx.fillStyle = node.color;
        ctx.globalAlpha = node.layer === 1 ? 0.25 : 0.12;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Núcleo brillante
        ctx.globalAlpha = node.alpha;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('mouseleave', onPointerLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}
