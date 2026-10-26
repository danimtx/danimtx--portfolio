/**
 * CatLab.tsx
 * Interactive development & showcase workbench (`?catlab`) to inspect static postures,
 * gaits (walk / trot / dash), jumps, idle behaviors, slow-motion and IK skeleton.
 * Includes a return-to-portfolio perch where the cat poses before heading back.
 */
import React, { useEffect, useRef, useState } from 'react';
import { StealthCatSideRig, type StealthCatSideRigHandle } from './StealthCatSideRig';
import { CatSim, type ActionName } from './catSim';
import { GAIT_SPEED } from './catKinematics';
import type { Posture } from './catPoses';

const POSTURES: { id: Posture; label: string }[] = [
  { id: 'stand', label: 'De pie (Stand)' },
  { id: 'sit', label: 'Sentado (Sit)' },
  { id: 'crouch', label: 'Acecho (Crouch)' },
  { id: 'loaf', label: 'Pancito (Loaf)' },
  { id: 'sleep', label: 'Durmiendo (Sleep)' },
  { id: 'stretch', label: 'Estiramiento (Stretch)' },
];

const ACTIONS: { id: ActionName; label: string }[] = [
  { id: 'lookFront', label: 'Mirar de frente (Look Front)' },
  { id: 'groom', label: 'Lamerse pata (Groom)' },
  { id: 'yawn', label: 'Bostezo (Yawn)' },
  { id: 'swipe', label: 'Zarpazo (Swipe)' },
  { id: 'wiggle', label: 'Meneo pre-salto (Wiggle)' },
  { id: 'sniff', label: 'Olfatear (Sniff)' },
  { id: 'tailFlick', label: 'Coletazo (Tail Flick)' },
  { id: 'lookAround', label: 'Curiosear (Look Around)' },
];

const PoseCard: React.FC<{ posture: Posture; label: string; dark: boolean; debug: boolean }> = ({
  posture,
  label,
  dark,
  debug,
}) => {
  const rigRef = useRef<StealthCatSideRigHandle | null>(null);
  const simRef = useRef<CatSim | null>(null);

  useEffect(() => {
    const sim = new CatSim({ x: 0, y: 0, scale: 1, facing: 1, posture });
    for (let i = 0; i < 72; i++) sim.update(1 / 60);
    simRef.current = sim;
    rigRef.current?.renderFrame(sim.frame, { darkSurface: dark, debugSkeleton: debug });

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      sim.update(dt);
      rigRef.current?.renderFrame(sim.frame, { darkSurface: dark, debugSkeleton: debug });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [posture, dark, debug]);

  return (
    <div
      data-testid={`pose-card-${posture}`}
      className={`rounded-2xl border p-4 flex flex-col justify-between transition-colors ${
        dark ? 'bg-[#111114] border-white/15 text-white' : 'bg-white border-neutral-200 text-neutral-900'
      }`}
    >
      <div className="flex items-center justify-between text-xs font-semibold opacity-75 mb-2">
        <span>{label}</span>
        <span className="font-mono text-[11px]">{posture}</span>
      </div>
      <div className="relative h-36 w-full flex items-end justify-center overflow-visible">
        <div
          className={`absolute bottom-4 left-4 right-4 h-px ${
            dark ? 'bg-white/15' : 'bg-neutral-300'
          }`}
        />
        <StealthCatSideRig
          ref={rigRef}
          localViewBox="-145 -115 245 130"
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

interface CatLabProps {
  onReturnToPortfolio?: () => void;
}

export const CatLab: React.FC<CatLabProps> = ({ onReturnToPortfolio }) => {
  const [dark, setDark] = useState(false);
  const [debug, setDebug] = useState(false);
  const [timeScale, setTimeScale] = useState(1);
  const [activeStatus, setActiveStatus] = useState('sit');

  const stageRef = useRef<HTMLDivElement | null>(null);
  const returnPerchRef = useRef<HTMLDivElement | null>(null);
  const stageRigRef = useRef<StealthCatSideRigHandle | null>(null);
  const simRef = useRef<CatSim | null>(null);
  const clickIdxRef = useRef(0);
  const isBusyRef = useRef(false);

  useEffect(() => {
    const sim = new CatSim({ x: 430, y: 250, scale: 0.95, facing: 1, posture: 'sit' });
    simRef.current = sim;

    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      sim.update(dt);
      stageRigRef.current?.renderFrame(sim.frame, { darkSurface: dark, debugSkeleton: debug });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [dark, debug]);

  useEffect(() => {
    if (simRef.current) simRef.current.timeScale = timeScale;
  }, [timeScale]);

  const commandWalk = (speed: number, stealth = false, label = 'walk') => {
    const sim = simRef.current;
    if (!sim) return;
    isBusyRef.current = false;
    const targetX = sim.x > 450 ? 110 : 790;
    sim.y = 250;
    sim.walkTo(targetX, {
      speed,
      stealth,
      onArrive: () => {
        sim.setPosture('sit');
        setActiveStatus('sit');
      },
    });
    setActiveStatus(label);
  };

  const commandJump = (tx: number, ty: number, wiggle = true, lookFrontOnLand = false) => {
    const sim = simRef.current;
    if (!sim) return;
    isBusyRef.current = false;
    sim.jumpTo(tx, ty, {
      wiggle,
      fastPrep: !wiggle,
      then: 'sit',
      onLand: () => {
        setActiveStatus('perched');
        if (lookFrontOnLand) {
          sim.play('lookFront');
        }
      },
    });
    setActiveStatus('jump');
  };

  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect || !simRef.current) return;
    simRef.current.lookAt({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleReturnClick = (e: React.MouseEvent) => {
    if (onReturnToPortfolio) {
      e.preventDefault();
      onReturnToPortfolio();
    }
  };

  const handlePoseOnReturnPerch = () => {
    const stageRect = stageRef.current?.getBoundingClientRect();
    const perchRect = returnPerchRef.current?.getBoundingClientRect();
    const targetX =
      stageRect && perchRect
        ? perchRect.left - stageRect.left + perchRect.width * 0.5
        : 980;
    commandJump(targetX, 145, false, true);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F0] text-[#111111] p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-300 pb-5">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D4F014] text-black mb-1">
              LABORATORIO INTERACTIVO · CAT LAB
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Stealth Cat Silhouette Rig & Locomotion Workbench
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setDark((d) => !d)}
              data-testid="toggle-dark"
              className="px-3.5 py-2 rounded-xl text-xs font-bold border border-neutral-300 bg-white hover:bg-neutral-100 cursor-pointer"
            >
              Superficie: {dark ? 'Oscura (Rim Light)' : 'Clara'}
            </button>
            <button
              onClick={() => setDebug((d) => !d)}
              data-testid="toggle-debug"
              className="px-3.5 py-2 rounded-xl text-xs font-bold border border-neutral-300 bg-white hover:bg-neutral-100 cursor-pointer"
            >
              Esqueleto IK: {debug ? 'ON' : 'OFF'}
            </button>
            <div className="flex items-center gap-2 bg-white border border-neutral-300 rounded-xl px-3 py-1.5 text-xs font-semibold">
              <span>Velocidad: {timeScale.toFixed(2)}×</span>
              <input
                type="range"
                min={0.1}
                max={1}
                step={0.05}
                value={timeScale}
                onChange={(e) => setTimeScale(parseFloat(e.target.value))}
                className="w-24 accent-black"
              />
            </div>
            <a
              href="/"
              data-testid="return-portfolio-btn"
              onMouseEnter={handlePoseOnReturnPerch}
              onClick={handleReturnClick}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#101010] text-[#D4F014] hover:bg-neutral-800 shadow-sm transition cursor-pointer"
            >
              ← Volver al Portafolio
            </a>
          </div>
        </div>

        {/* Interactive Stage */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500">
              Escenario Interactivo (Haz clic en las repisas, en el suelo o en los controles)
            </h2>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-neutral-200">
              estado: {activeStatus}
            </span>
          </div>

          <div
            ref={stageRef}
            onMouseMove={handleStageMouseMove}
            onMouseLeave={() => simRef.current?.lookAt(null)}
            data-testid="interactive-stage"
            className={`relative h-[320px] w-full rounded-3xl border overflow-hidden select-none transition-colors ${
              dark ? 'bg-[#0E0E11] border-white/15' : 'bg-white border-neutral-200'
            }`}
          >
            {/* Elevated Ledge 1 */}
            <button
              onClick={() => commandJump(220, 155, true, true)}
              className={`absolute left-[120px] top-[155px] w-[195px] h-7 rounded-lg border text-[11px] font-bold flex items-center justify-center cursor-pointer transition ${
                dark
                  ? 'bg-white/10 border-white/20 text-white hover:bg-white/15'
                  : 'bg-neutral-100 border-neutral-300 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Repisa A (Saltar aquí)
            </button>

            {/* Elevated Ledge 2 */}
            <button
              onClick={() => commandJump(590, 120, true, true)}
              className={`absolute left-[490px] top-[120px] w-[195px] h-7 rounded-lg border text-[11px] font-bold flex items-center justify-center cursor-pointer transition ${
                dark
                  ? 'bg-white/10 border-white/20 text-white hover:bg-white/15'
                  : 'bg-neutral-100 border-neutral-300 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Repisa B Alta (Saltar aquí)
            </button>

            {/* Return-to-Portfolio Perch Card inside the Stage */}
            <div
              ref={returnPerchRef}
              onMouseEnter={handlePoseOnReturnPerch}
              className={`absolute right-6 top-[145px] w-[220px] rounded-2xl border p-3 flex flex-col gap-2 transition ${
                dark
                  ? 'bg-white/10 border-[#D4F014]/40 text-white'
                  : 'bg-[#101010] border-black text-white shadow-md'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[#D4F014]">
                <span>🐾 REPISA DE REGRESO</span>
                <span>PORTAL</span>
              </div>
              <p className="text-[11px] text-neutral-300 leading-snug">
                Pasa el cursor aquí para que el gato se pose antes de volver.
              </p>
              <a
                href="/"
                onClick={handleReturnClick}
                className="w-full py-1.5 px-3 rounded-lg bg-[#D4F014] text-black font-extrabold text-[11px] text-center hover:bg-[#bce00e] transition cursor-pointer"
              >
                ← Volver al Portafolio
              </a>
            </div>

            {/* Main Floor Line */}
            <div
              onClick={(e) => {
                const rect = stageRef.current?.getBoundingClientRect();
                if (!rect) return;
                const x = e.clientX - rect.left;
                if (simRef.current && Math.abs(simRef.current.y - 250) > 5) {
                  commandJump(x, 250, false, true);
                } else {
                  simRef.current?.walkTo(x, {
                    speed: GAIT_SPEED.walk,
                    onArrive: () => {
                      simRef.current?.setPosture('sit');
                      simRef.current?.play('lookFront');
                    },
                  });
                }
              }}
              className={`absolute left-6 right-6 top-[250px] h-6 border-t cursor-pointer flex items-center justify-between px-3 text-[11px] font-mono ${
                dark ? 'border-white/20 text-white/40' : 'border-neutral-300 text-neutral-400'
              }`}
            >
              <span>Suelo principal (y = 250px) — clic para caminar o bajar</span>
              <span>IK 4 patas + cadena de cola 10 segs</span>
            </div>

            <StealthCatSideRig ref={stageRigRef} className="w-full h-full pointer-events-none" />
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="bg-white border border-neutral-200 rounded-2xl p-3.5 space-y-2">
              <p className="text-xs font-bold text-neutral-500 uppercase">Locomoción y Giros</p>
              <div className="flex flex-wrap gap-1.5">
                <button
                  data-testid="btn-walk-stealth"
                  onClick={() => commandWalk(GAIT_SPEED.walk * 0.82, true, 'stealth-walk')}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-700 cursor-pointer"
                >
                  Paso Sigiloso
                </button>
                <button
                  data-testid="btn-walk"
                  onClick={() => commandWalk(GAIT_SPEED.walk, false, 'walk')}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-700 cursor-pointer"
                >
                  Caminar
                </button>
                <button
                  data-testid="btn-trot"
                  onClick={() => commandWalk(GAIT_SPEED.trot, false, 'trot')}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-700 cursor-pointer"
                >
                  Trotar
                </button>
                <button
                  data-testid="btn-dash"
                  onClick={() => commandWalk(GAIT_SPEED.dash, false, 'dash')}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-700 cursor-pointer"
                >
                  Correr (Dash)
                </button>
                <button
                  data-testid="btn-turn"
                  onClick={() => {
                    const sim = simRef.current;
                    if (sim) sim.face(sim.facing === 1 ? -1 : 1);
                  }}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-neutral-200 text-neutral-900 hover:bg-neutral-300 cursor-pointer"
                >
                  Girar 180°
                </button>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-3.5 space-y-2">
              <p className="text-xs font-bold text-neutral-500 uppercase">Posturas Base</p>
              <div className="flex flex-wrap gap-1.5">
                {POSTURES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      isBusyRef.current = false;
                      simRef.current?.stopMoving();
                      simRef.current?.setPosture(p.id);
                      setActiveStatus(p.id);
                    }}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-900 cursor-pointer"
                  >
                    {p.id}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-3.5 space-y-2">
              <p className="text-xs font-bold text-neutral-500 uppercase">Micro-Comportamientos</p>
              <div className="flex flex-wrap gap-1.5">
                {ACTIONS.map((a) => (
                  <button
                    key={a.id}
                    data-testid={`btn-action-${a.id}`}
                    onClick={() => {
                      const sim = simRef.current;
                      if (!sim || isBusyRef.current) return;
                      isBusyRef.current = true;
                      const ok = sim.play(a.id, () => {
                        isBusyRef.current = false;
                        setActiveStatus(sim.posture);
                      });
                      if (ok) {
                        setActiveStatus(`action:${a.id}`);
                      } else {
                        isBusyRef.current = false;
                      }
                    }}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#D4F014]/35 hover:bg-[#D4F014]/60 text-black cursor-pointer"
                  >
                    {a.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const sim = simRef.current;
                    if (!sim || isBusyRef.current) return;
                    const next = ACTIONS[clickIdxRef.current % ACTIONS.length];
                    clickIdxRef.current += 1;
                    isBusyRef.current = true;
                    const ok = sim.play(next.id, () => {
                      isBusyRef.current = false;
                      setActiveStatus(sim.posture);
                    });
                    if (ok) {
                      setActiveStatus(`action:${next.id}`);
                    } else {
                      isBusyRef.current = false;
                    }
                  }}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-[#101010] text-[#D4F014] hover:bg-neutral-800 cursor-pointer"
                >
                  🐾 Clic Secuencial (Con bloqueo)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Static Poses Inspection Grid */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500">
            Galería de Poses Base (Inspección de Silueta)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {POSTURES.map((p) => (
              <PoseCard key={p.id} posture={p.id} label={p.label} dark={dark} debug={debug} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
