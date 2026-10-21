import React, { useState, useEffect, useRef, useCallback } from 'react';
import { catStore, useCatStore } from '../cat/catStore';

interface StealthCat3DProps {
  lang?: 'es' | 'en';
}

const SPEECH_MESSAGES = {
  es: [
    '¡Holaaa! 👋🐾',
    '¡Miauu! 🐱✨',
    '¿Cómo estás? 😊',
    '¡Contáctame! 💬🚀',
    '¡Qué bueno verte por aquí! ✨',
    '¿Viste mis proyectos? 💻',
    '¡Haz clic de nuevo! 🐾',
    'Soy danimtx'
  ],
  en: [
    'Hellooo! 👋🐾',
    'Meowww! 🐱✨',
    'How are you doing? 😊',
    'Get in touch! 💬🚀',
    'Nice seeing you here! ✨',
    'Checked out my projects? 💻',
    'Click me again! 🐾',
    'I\'m danimtx'
  ],
};

export const StealthCat3D: React.FC<StealthCat3DProps> = ({ lang = 'es' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { dismissed: companionDismissed } = useCatStore();

  // Parallax & global cursor gaze
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [gaze, setGaze] = useState({ x: 0, y: 0 });

  const [isHovered, setIsHovered] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isWinkingRight, setIsWinkingRight] = useState(false);
  const [isLickingPaw, setIsLickingPaw] = useState(false);
  const [isLeftEarTwitching, setIsLeftEarTwitching] = useState(false);
  const [isRightEarTwitching, setIsRightEarTwitching] = useState(false);

  // Cute Head Tilt & Affection (Carita feliz ^ ^ y ladeo de cabeza)
  const [isHappyFace, setIsHappyFace] = useState(false);

  // Animation Lock: ensures an animation completes before another can start on click
  const isBusyRef = useRef<boolean>(false);
  const clickIndexRef = useRef<number>(0);

  // Speech Bubble State
  const [isBubbleVisible, setIsBubbleVisible] = useState(false);
  const [speechIndex, setSpeechIndex] = useState(0);

  // 60 FPS Procedural Pícaro S-Curve Travelling Tail Coordinates
  const [tailCoords, setTailCoords] = useState({
    cp1X: 148,
    cp1Y: 186,
    cp2X: 168,
    cp2Y: 170,
    tipX: 162,
    tipY: 145,
  });

  // Interactive Yarn Ball Physics State
  const [isPlayingWithYarn, setIsPlayingWithYarn] = useState(false);
  const [yarnBall, setYarnBall] = useState({
    active: false,
    x: 114,
    y: 182,
    rotation: 0,
    opacity: 1,
    isBatting: false,
    threadD: '',
  });

  // Animation & Loop Refs
  const rafRef = useRef<number | null>(null);
  const tailPhaseRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());
  const yarnStartTimeRef = useRef<number | null>(null);

  // Smooth Eye-Tracking LERP Target and Current Refs
  const targetGazeRef = useRef({ x: 0, y: 0 });
  const smoothGazeRef = useRef({ x: 0, y: 0 });

  const winkTimeoutRef = useRef<number | null>(null);
  const lickTimeoutRef = useRef<number | null>(null);
  const happyTimeoutRef = useRef<number | null>(null);
  const earTwitchTimeoutRef = useRef<number | null>(null);
  const bubbleTimeoutRef = useRef<number | null>(null);

  // Show Specific Speech Bubble
  const triggerSpeech = useCallback((idx: number) => {
    setSpeechIndex(idx % SPEECH_MESSAGES[lang].length);
    setIsBubbleVisible(true);
    if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
    bubbleTimeoutRef.current = window.setTimeout(() => {
      setIsBubbleVisible(false);
    }, 3200);
  }, [lang]);

  // 1. Action: Cute Inquisitive Head Tilt & Happy Face (~2200ms)
  const triggerHappyFace = useCallback(() => {
    isBusyRef.current = true;
    setIsHappyFace(true);
    triggerSpeech(1); // "¡Miauu! 🐱✨"

    if (happyTimeoutRef.current) clearTimeout(happyTimeoutRef.current);
    happyTimeoutRef.current = window.setTimeout(() => {
      setIsHappyFace(false);
      isBusyRef.current = false;
    }, 2200);
  }, [triggerSpeech]);

  // 2. Action: Elaborate Ultra-Crisp Paw Grooming (~2400ms)
  const triggerPawLick = useCallback(() => {
    isBusyRef.current = true;
    setIsLickingPaw(true);
    triggerSpeech(2); // "¿Cómo estás? 😊"

    if (lickTimeoutRef.current) clearTimeout(lickTimeoutRef.current);
    lickTimeoutRef.current = window.setTimeout(() => {
      setIsLickingPaw(false);
      isBusyRef.current = false;
    }, 2400);
  }, [triggerSpeech]);

  // 3. Action: Yarn Ball Drop & Play (~2750ms)
  const triggerYarnPlay = useCallback(() => {
    isBusyRef.current = true;
    yarnStartTimeRef.current = performance.now();
    setIsPlayingWithYarn(true);
    triggerSpeech(4); // "¡Qué bueno verte por aquí! ✨"
    setYarnBall({
      active: true,
      x: 114,
      y: -25,
      rotation: 0,
      opacity: 1,
      isBatting: false,
      threadD: 'M 114 -25 Q 114 40 114 100',
    });

    setIsLeftEarTwitching(true);
    setIsRightEarTwitching(true);
    window.setTimeout(() => {
      setIsLeftEarTwitching(false);
      setIsRightEarTwitching(false);
    }, 450);
  }, [triggerSpeech]);

  // 4. Action: Double Wink & Ear Twitch -> Specifically says "¡Contáctame! 💬🚀" (~750ms)
  const triggerWinkAction = useCallback(() => {
    isBusyRef.current = true;
    setIsWinkingRight(true);
    setIsLeftEarTwitching(true);
    setIsRightEarTwitching(true);
    triggerSpeech(3); // "¡Contáctame! 💬🚀"

    if (winkTimeoutRef.current) clearTimeout(winkTimeoutRef.current);
    winkTimeoutRef.current = window.setTimeout(() => {
      setIsWinkingRight(false);
      setIsLeftEarTwitching(false);
      setIsRightEarTwitching(false);
      isBusyRef.current = false;
    }, 750);
  }, [triggerSpeech]);

  // Click on Cat Body: Executes the next action in sequence, strictly ignoring clicks while busy!
  const handleCatClick = () => {
    if (isBusyRef.current) return;

    const actionIndex = clickIndexRef.current % 4;
    clickIndexRef.current += 1;

    switch (actionIndex) {
      case 0:
        triggerHappyFace();
        break;
      case 1:
        triggerPawLick();
        break;
      case 2:
        triggerYarnPlay();
        break;
      case 3:
      default:
        triggerWinkAction();
        break;
    }
  };

  // Global window mouse tracker: updates the target gaze vector smoothly
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || isPlayingWithYarn || isHappyFace) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rawX = (e.clientX - centerX) / (window.innerWidth * 0.45);
      const rawY = (e.clientY - centerY) / (window.innerHeight * 0.45);
      const clampedX = Math.max(-1, Math.min(1, rawX));
      const clampedY = Math.max(-1, Math.min(1, rawY));

      targetGazeRef.current = { x: clampedX, y: clampedY };
    };

    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [isPlayingWithYarn, isHappyFace]);

  // 60 FPS Procedural Pícaro Sine-Wave Tail, Fluid Eye LERP & Yarn Ball Physics Loop
  useEffect(() => {
    let animationFrameId: number;

    const loop = (now: number) => {
      const dt = Math.min(0.06, (now - lastTimeRef.current) / 1000);
      lastTimeRef.current = now;

      // 1. Procedural Sine-Wave Tail: Pícaro S-Curve with low hip-wrap & cheeky whip-flick
      const tailSpeed = isPlayingWithYarn ? 5.2 : isHovered ? 4.2 : isHappyFace ? 3.8 : 2.7;
      tailPhaseRef.current += dt * tailSpeed;
      const phase = tailPhaseRef.current;

      // Base anchor is at (132, 188)
      // cp1 sways low along the ground
      const cp1X = 148 + Math.sin(phase) * 8;
      const cp1Y = 186 + Math.cos(phase) * 2.5;

      // cp2 loops out low and playful
      const cp2X = 168 + Math.sin(phase - 1.2) * 16;
      const cp2Y = 170 + Math.cos(phase - 1.2) * 6;

      // tip has a playful feline hook with compound harmonic whip-flick (latigazo pícaro)
      const tipX = 162 + Math.sin(phase - 2.3) * 22 + Math.cos(phase * 2) * 6;
      const tipY = 145 + Math.cos(phase - 2.3) * 12 - Math.sin(phase * 2) * 5;

      setTailCoords({ cp1X, cp1Y, cp2X, cp2Y, tipX, tipY });

      // 2. Ultra-Fluid Eye LERP
      const gazeLerp = isPlayingWithYarn ? 0.22 : 0.088;
      smoothGazeRef.current.x += (targetGazeRef.current.x - smoothGazeRef.current.x) * gazeLerp;
      smoothGazeRef.current.y += (targetGazeRef.current.y - smoothGazeRef.current.y) * gazeLerp;

      setGaze({
        x: smoothGazeRef.current.x,
        y: smoothGazeRef.current.y,
      });

      // 3. Interactive Yarn Ball Physics Animation
      if (yarnStartTimeRef.current !== null) {
        const elapsed = now - yarnStartTimeRef.current;
        const totalDuration = 2750;

        if (elapsed < totalDuration) {
          let currX = 114;
          let currY = 182;
          let rot = 0;
          let op = 1;
          let isBatting = false;

          if (elapsed < 550) {
            // Phase 1: High elastic drop from ceiling & energetic ground bounce
            const p = elapsed / 550;
            if (p <= 0.7) {
              const fallP = p / 0.7;
              currY = -25 + 207 * (fallP * fallP);
              currX = 118 - 4 * fallP;
            } else {
              const bounceP = (p - 0.7) / 0.3;
              currY = 182 - Math.sin(bounceP * Math.PI) * 24;
              currX = 114;
            }
            rot = p * 360;
          } else if (elapsed < 1900) {
            // Phase 2: Cat bats at ball with playful paw swats
            isBatting = true;
            if (elapsed < 1000) {
              // Swat 1 (paw swipes forward & right)
              const batP = (elapsed - 550) / 450;
              currX = 114 + 18 * batP;
              currY = 182 - Math.sin(batP * Math.PI) * 16;
              rot = 360 + batP * 280;
            } else if (elapsed < 1450) {
              // Swat 2 (playfully hooks it back inward)
              const batP = (elapsed - 1000) / 450;
              currX = 132 - 24 * batP;
              currY = 182 - Math.sin(batP * Math.PI) * 14;
              rot = 640 - batP * 320;
            } else {
              // Swat 3 (power swipe forward-right!)
              const batP = (elapsed - 1450) / 450;
              currX = 108 + 26 * batP;
              currY = 182 - Math.sin(batP * Math.PI) * 18;
              rot = 320 + batP * 400;
            }
          } else {
            // Phase 3: Rolls fast off-screen to the right!
            const rollP = (elapsed - 1900) / 850;
            currX = 134 + 90 * Math.sqrt(rollP);
            currY = 182;
            rot = 720 + rollP * 850;
            op = Math.max(0, 1 - Math.pow(rollP, 2));
          }

          // Trailing loose cyber yarn thread
          const threadD = `M ${currX - 16} 184 Q ${currX - 8} 178 ${currX - 4} 182 T ${currX} ${currY + 5}`;

          setYarnBall({
            active: true,
            x: currX,
            y: currY,
            rotation: rot,
            opacity: op,
            isBatting,
            threadD,
          });

          // Cat eyes lock and track the yarn ball directly during play
          const eyeFollowX = Math.max(-0.9, Math.min(0.9, (currX - 90) / 45));
          const eyeFollowY = Math.max(-0.3, Math.min(1.0, (currY - 68) / 90));
          targetGazeRef.current = { x: eyeFollowX, y: eyeFollowY };
        } else {
          // Yarn ball has finished rolling away
          yarnStartTimeRef.current = null;
          setIsPlayingWithYarn(false);
          setYarnBall((prev) => ({ ...prev, active: false }));
          isBusyRef.current = false;
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlayingWithYarn, isHovered, isHappyFace, isLickingPaw]);

  // Autonomous Natural Blink (every ~3.5-5.5s)
  useEffect(() => {
    let blinkTimer: number;
    let openTimer: number;

    const scheduleBlink = () => {
      const nextDelay = 3500 + Math.random() * 2000;
      blinkTimer = window.setTimeout(() => {
        if (!isHappyFace) {
          setIsBlinking(true);
          openTimer = window.setTimeout(() => {
            setIsBlinking(false);
            scheduleBlink();
          }, 120);
        } else {
          scheduleBlink();
        }
      }, nextDelay);
    };

    scheduleBlink();
    return () => {
      clearTimeout(blinkTimer);
      clearTimeout(openTimer);
    };
  }, [isHappyFace]);

  // Autonomous Proactive Behavior: Welcome after only 1.4s, and regular actions every ~4.2s - 6.8s
  useEffect(() => {
    let idleTimer: number;

    const scheduleAutonomousAction = () => {
      const nextDelay = 4200 + Math.random() * 2600;
      idleTimer = window.setTimeout(() => {
        if (!isBusyRef.current) {
          const r = Math.random();
          if (r < 0.32) {
            // Wink and say "¡Contáctame! 💬🚀"
            triggerWinkAction();
          } else if (r < 0.62) {
            // Cute head tilt and say "¡Miauu! 🐱✨"
            triggerHappyFace();
          } else if (r < 0.82) {
            // Elaborate paw grooming and say "¿Cómo estás? 😊"
            triggerPawLick();
          } else {
            // Play with yarn ball and say "¡Qué bueno verte por aquí! ✨"
            triggerYarnPlay();
          }
        }
        scheduleAutonomousAction();
      }, nextDelay);
    };

    // Fast initial welcome greeting 1.4s after load
    const initialWelcomeTimer = window.setTimeout(() => {
      if (!isBusyRef.current) {
        triggerSpeech(0); // "¡Holaaa! 👋🐾"
        setIsLeftEarTwitching(true);
        setIsRightEarTwitching(true);
        window.setTimeout(() => {
          setIsLeftEarTwitching(false);
          setIsRightEarTwitching(false);
        }, 400);
      }
      scheduleAutonomousAction();
    }, 1400);

    return () => {
      clearTimeout(initialWelcomeTimer);
      clearTimeout(idleTimer);
    };
  }, [triggerHappyFace, triggerPawLick, triggerWinkAction, triggerYarnPlay, triggerSpeech]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (winkTimeoutRef.current) clearTimeout(winkTimeoutRef.current);
      if (lickTimeoutRef.current) clearTimeout(lickTimeoutRef.current);
      if (happyTimeoutRef.current) clearTimeout(happyTimeoutRef.current);
      if (earTwitchTimeoutRef.current) clearTimeout(earTwitchTimeoutRef.current);
      if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Local pointer tracking for 3D card tilt
  const updateLocalParallax = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const normX = Math.max(-1, Math.min(1, (x - centerX) / centerX));
    const normY = Math.max(-1, Math.min(1, (y - centerY) / centerY));

    setParallax({ x: normX, y: normY });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateLocalParallax(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    updateLocalParallax(touch.clientX, touch.clientY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isBusyRef.current) {
      setIsLeftEarTwitching(true);
      window.setTimeout(() => setIsLeftEarTwitching(false), 380);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setParallax({ x: 0, y: 0 });
  };

  // Parallax vectors
  const px = isHovered ? parallax.x : gaze.x * 0.25;
  const py = isHovered ? parallax.y : gaze.y * 0.25;

  const tiltX = (-py * 6).toFixed(2);
  const tiltY = (px * 8).toFixed(2);

  // Global Cursor Eye-Tracking Offsets
  const irisX = (gaze.x * 1.9).toFixed(2);
  const irisY = (gaze.y * 1.1).toFixed(2);
  const pupilX = (gaze.x * 2.8).toFixed(2);
  const pupilY = (gaze.y * 1.5).toFixed(2);

  // Alert ear dynamic follow angles
  const leftEarHoverAngle = (px < 0 ? -px * 4 : -px * 1.5).toFixed(2);
  const rightEarHoverAngle = (px > 0 ? px * 4 : px * 1.5).toFixed(2);

  const layerShift = (factor: number) => ({
    transform: `translate(${(px * factor).toFixed(2)}px, ${(py * factor).toFixed(2)}px)`,
    transition: isHovered
      ? 'transform 70ms linear'
      : 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1)',
  });

  const currentSpeech = SPEECH_MESSAGES[lang][speechIndex] || SPEECH_MESSAGES[lang][0];

  return (
    <div
      ref={containerRef}
      data-cat-home="true"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCatClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCatClick();
        }
      }}
      aria-label={
        lang === 'es'
          ? 'Gato Stealth 2D interactivo de danimtx. Haz clic para interactuar.'
          : "danimtx's interactive 2D Stealth Cat. Click to interact."
      }
      className="lg:col-span-5 relative flex flex-col items-center justify-center py-4 sm:py-6 lg:py-0 select-none cursor-pointer group outline-none"
    >
      {/* Speech Bubble: Positioned safely in upper-right quadrant without card clipping */}
      {isBubbleVisible && (
        <div
          key={`speech-${speechIndex}`}
          className="absolute top-1 sm:top-5 right-2 sm:right-4 z-30 flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-[#161618]/95 border border-[#D4F014]/60 text-white shadow-[0_8px_30px_rgba(212,240,20,0.25)] backdrop-blur-md animate-bubble-pop max-w-[190px] sm:max-w-[230px] text-xs font-medium text-left leading-relaxed pointer-events-none"
        >
          <span className="w-full tracking-tight">{currentSpeech}</span>
          {/* Pointer arrow on bottom-left pointing toward the cat's cheek */}
          <div className="absolute -bottom-1.5 left-5 w-3 h-3 bg-[#161618] border-b border-l border-[#D4F014]/60 rotate-[-45deg]" />
        </div>
      )}

      {/* Ambient Cyber Lime Radial Aura behind the Sitting Cat */}
      <div
        className={`absolute w-60 h-60 sm:w-80 sm:h-80 md:w-92 md:h-92 rounded-full pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isHappyFace
            ? 'bg-[#D4F014]/28 blur-[75px] scale-110'
            : isPlayingWithYarn
              ? 'bg-[#D4F014]/24 blur-[80px] scale-105'
              : 'bg-[#D4F014]/14 blur-[90px] sm:blur-[110px] group-hover:bg-[#D4F014]/22 group-hover:scale-105'
          }`}
        style={{
          transform: `translate(${(px * 14).toFixed(1)}px, ${(py * 14).toFixed(1)}px)`,
        }}
      />

      {/* 3D Perspective Card Tilt Container */}
      <div
        className={`relative w-56 h-64 sm:w-72 sm:h-84 md:w-84 md:h-98 lg:w-92 lg:h-108 transition-all duration-300 ease-out ${
          !isHovered
            ? 'animate-cat-float opacity-100 scale-100 translate-y-0'
            : 'opacity-100 scale-100 translate-y-0'
        }`}
        style={{
          perspective: '1000px',
        }}
      >
        <div
          className="w-full h-full"
          style={{
            transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${isHovered ? 1.025 : 1
              }, ${isHovered ? 1.025 : 1}, 1)`,
            transformStyle: 'preserve-3d',
            transition: isHovered
              ? 'transform 90ms ease-out'
              : 'transform 550ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Ultra-Crisp 180x210 Native Vector Canvas (Zero Squircle Box, Free-Floating Full Body) */}
          <svg
            viewBox="0 0 180 210"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            className="w-full h-full overflow-visible"
          >
            <defs>
              {/* Rich Cyber Lime Gradient */}
              <linearGradient id="heroStealthGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E8FF38" />
                <stop offset="50%" stopColor="#D4F014" />
                <stop offset="100%" stopColor="#96D600" />
              </linearGradient>

              {/* Dynamic Eye Glow Aura */}
              <radialGradient id="eyeGlowRadial" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#D4F014" stopOpacity={isHappyFace ? '0.6' : '0.32'} />
                <stop offset="100%" stopColor="#D4F014" stopOpacity="0" />
              </radialGradient>

              {/* Ground Shadow Radial Gradient */}
              <radialGradient id="catFloorShadow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Ground Contact Shadow */}
            <g style={layerShift(0.6)}>
              <ellipse cx="90" cy="196" rx={54} ry="8" fill="url(#catFloorShadow)" />
            </g>

            {/* =====================================================================
                LAYER 0: Pícaro S-Curve Travelling Bezier Tail (60 FPS Procedural)
            ===================================================================== */}
            <g style={layerShift(1.2)}>
              {/* Outer Lime Gradient Rim */}
              <path
                d={`M 132 188 C ${tailCoords.cp1X} ${tailCoords.cp1Y}, ${tailCoords.cp2X} ${tailCoords.cp2Y}, ${tailCoords.tipX} ${tailCoords.tipY}`}
                stroke="url(#heroStealthGrad)"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
              {/* Dark Core Spine */}
              <path
                d={`M 132 188 C ${tailCoords.cp1X} ${tailCoords.cp1Y}, ${tailCoords.cp2X} ${tailCoords.cp2Y}, ${tailCoords.tipX} ${tailCoords.tipY}`}
                stroke="#121214"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              {/* Neon Cyber Tip Light */}
              <circle
                cx={tailCoords.tipX}
                cy={tailCoords.tipY}
                r="3.2"
                fill="#D4F014"
              />
              <circle
                cx={tailCoords.tipX}
                cy={tailCoords.tipY}
                r="1.4"
                fill="#FFFFFF"
              />
            </g>

            {/* =====================================================================
                LAYER 1: Torso, Broad Haunches, Cyber Spine & Sitting Base
            ===================================================================== */}
            <g style={layerShift(2.0)}>
              {/* Left Sitting Haunch / Thigh */}
              <path
                d="M58,162 C46,168 44,186 52,192 C58,196 74,196 78,190 C78,178 72,166 58,162 Z"
                fill="#121214"
                stroke="url(#heroStealthGrad)"
                strokeWidth="2.2"
              />
              {/* Right Sitting Haunch / Thigh */}
              <path
                d="M122,162 C134,168 136,186 128,192 C122,196 106,196 102,190 C102,178 108,166 122,162 Z"
                fill="#121214"
                stroke="url(#heroStealthGrad)"
                strokeWidth="2.2"
              />

              {/* Streamlined Sitting Torso Chassis */}
              <polygon
                points="76,104 104,104 116,146 122,176 114,190 66,190 58,176 64,146"
                fill="#141414"
                stroke="url(#heroStealthGrad)"
                strokeWidth="2.8"
              />

              {/* Chest Armor Facet Plate */}
              <polygon
                points="80,114 100,114 96,150 90,166 84,150"
                fill="#18181B"
                stroke="#FFFFFF"
                strokeOpacity="0.08"
                strokeWidth="1"
              />

              {/* Cyber Spine Seam Line */}
              <line
                x1="90"
                y1="116"
                x2="90"
                y2="174"
                stroke="url(#heroStealthGrad)"
                strokeWidth="1.2"
                strokeOpacity="0.4"
                strokeDasharray="3 3"
              />

              {/* Sleek Cyber Collar V-Line & Reactor Node */}
              <path
                d="M78,102 L90,114 L102,102"
                stroke="#D4F014"
                strokeWidth={isHappyFace ? '3.0' : '2.5'}
                strokeLinecap="round"
                fill="none"
              />
              <circle
                cx="90"
                cy="114"
                r={isHappyFace ? '3.4' : '2.5'}
                fill="#D4F014"
                className="transition-all duration-300"
              />
              <circle
                cx="90"
                cy="114"
                r={isHappyFace ? '1.7' : '1.1'}
                fill="#F7FF9E"
                className="transition-all duration-300"
              />
            </g>

            {/* =====================================================================
                LAYER 2: Front Paws & Articulated Forelegs
            ===================================================================== */}
            <g style={layerShift(3.2)}>
              {/* Left Foreleg & Paw */}
              <g strokeLinejoin="round">
                <path
                  d="M78,142 L74,180 L70,182 C67,185 67,192 73,192 C77,192 80,188 82,185 L84,146 Z"
                  fill="#161618"
                  stroke="url(#heroStealthGrad)"
                  strokeWidth="2.2"
                />
                <line x1="72" y1="188" x2="72" y2="191" stroke="#D4F014" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="76" y1="188" x2="76" y2="191" stroke="#D4F014" strokeWidth="1.5" strokeLinecap="round" />
              </g>

              {/* Right Foreleg & Paw: Swaps between Resting, Ultra-HD Grooming, and Playful Yarn Batting */}
              {isLickingPaw ? (
                // Ultra-Crisp HD Grooming Paw Raised to Face!
                <g
                  className="animate-paw-groom"
                  style={{ transformOrigin: '100px 144px' }}
                >
                  {/* Forearm & Paw Structure */}
                  <polygon
                    points="98,142 112,116 115,96 109,91 101,93 95,102 93,118 92,144"
                    fill="#141416"
                    stroke="url(#heroStealthGrad)"
                    strokeWidth="2.4"
                    strokeLinejoin="round"
                  />
                  {/* Wrist Cyber Circuit Band */}
                  <line
                    x1="94"
                    y1="120"
                    x2="108"
                    y2="114"
                    stroke="#D4F014"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  {/* Main High-Definition Heart Paw Pad */}
                  <path
                    d="M 100 97 C 100 94.5 102.5 93.5 104.5 94.5 C 106.5 93.5 109 94.5 109 97 C 109 100.5 104.5 102.5 104.5 102.5 C 104.5 102.5 100 100.5 100 97 Z"
                    fill="#FF5E8A"
                    stroke="#E03E6D"
                    strokeWidth="0.8"
                  />
                  <circle cx="103" cy="96.5" r="1.1" fill="#FFFFFF" fillOpacity="0.8" />
                  {/* 3 Crisp Digital Cyber Toe Beans */}
                  <circle cx="100.5" cy="92.5" r="1.5" fill="#FF5E8A" stroke="#E03E6D" strokeWidth="0.6" />
                  <circle cx="104.5" cy="91" r="1.5" fill="#FF5E8A" stroke="#E03E6D" strokeWidth="0.6" />
                  <circle cx="108.5" cy="92.5" r="1.5" fill="#FF5E8A" stroke="#E03E6D" strokeWidth="0.6" />
                  {/* Sharp Cyber Claws */}
                  <line x1="100.5" y1="91" x2="100" y2="88" stroke="#D4F014" strokeWidth="1.6" strokeLinecap="round" />
                  <line x1="104.5" y1="89.5" x2="104.5" y2="86.5" stroke="#D4F014" strokeWidth="1.6" strokeLinecap="round" />
                  <line x1="108.5" y1="91" x2="109" y2="88" stroke="#D4F014" strokeWidth="1.6" strokeLinecap="round" />

                  {/* Razor-Sharp Pure Vector Diamond Sparkles */}
                  <g className="pointer-events-none select-none">
                    <polygon
                      points="104,80 105.2,83.8 109,85 105.2,86.2 104,90 102.8,86.2 99,85 102.8,83.8"
                      fill="#D4F014"
                      className="animate-lick-sparkle-1"
                    />
                    <polygon
                      points="112,89 113,91.8 116,92.5 113,93.2 112,96 111,93.2 108,92.5 111,91.8"
                      fill="#FFFFFF"
                      className="animate-lick-sparkle-2"
                    />
                  </g>
                </g>
              ) : yarnBall.active && yarnBall.isBatting ? (
                // Batting Foreleg Reaching Cleanly Toward Yarn Ball!
                <g strokeLinejoin="round">
                  <path
                    d={`M 102 142 L 108 160 L ${Math.min(142, yarnBall.x - 4)} ${Math.min(186, yarnBall.y - 2)} L ${Math.min(138, yarnBall.x - 10)} ${Math.min(188, yarnBall.y + 4)} L 96 150 Z`}
                    fill="#141416"
                    stroke="url(#heroStealthGrad)"
                    strokeWidth="2.2"
                  />
                  <circle cx={Math.min(140, yarnBall.x - 6)} cy={Math.min(186, yarnBall.y)} r="2.8" fill="#FF5E8A" />
                  <line
                    x1={Math.min(140, yarnBall.x - 5)}
                    y1={Math.min(184, yarnBall.y - 2)}
                    x2={Math.min(142, yarnBall.x - 2)}
                    y2={Math.min(183, yarnBall.y - 4)}
                    stroke="#D4F014"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1={Math.min(141, yarnBall.x - 4)}
                    y1={Math.min(186, yarnBall.y)}
                    x2={Math.min(144, yarnBall.x - 1)}
                    y2={Math.min(185, yarnBall.y - 2)}
                    stroke="#D4F014"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </g>
              ) : (
                // Calm Resting Right Paw
                <g strokeLinejoin="round">
                  <path
                    d="M102,142 L106,180 L110,182 C113,185 113,192 107,192 C103,192 100,188 98,185 L96,146 Z"
                    fill="#161618"
                    stroke="url(#heroStealthGrad)"
                    strokeWidth="2.2"
                  />
                  <line x1="104" y1="188" x2="104" y2="191" stroke="#D4F014" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="108" y1="188" x2="108" y2="191" stroke="#D4F014" strokeWidth="1.5" strokeLinecap="round" />
                </g>
              )}
            </g>

            {/* =====================================================================
                LAYER 3: Head Section
            ===================================================================== */}
            <g
              style={{
                ...layerShift(4.4),
                transformOrigin: '90px 102px',
                transform: isPlayingWithYarn && yarnBall.x > 120
                  ? 'rotate(4deg) translate(1px, 1px)'
                  : (layerShift(4.4).transform as string),
                transition: 'transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
              className={
                isHappyFace
                  ? 'animate-cat-head-tilt'
                  : isLickingPaw
                    ? 'animate-head-groom'
                    : ''
              }
            >
              {/* Alert Feline Ears (With Independent Interactive Twitch & Happy Relax) */}
              {/* Left Ear */}
              <g
                style={{
                  transformOrigin: '67px 52px',
                  transform: isHappyFace ? 'rotate(-8deg)' : `rotate(${leftEarHoverAngle}deg)`,
                  transition: 'transform 240ms ease-out',
                }}
                className={isLeftEarTwitching ? 'animate-ear-twitch-left' : ''}
              >
                <polygon
                  points="60,22 78,52 56,52"
                  fill="url(#heroStealthGrad)"
                  strokeLinejoin="round"
                />
                <polygon points="63,28 75,50 58.5,50" fill="#141414" />
                <circle cx="66" cy="42" r="1.1" fill="#D4F014" fillOpacity="0.75" />
              </g>

              {/* Right Ear */}
              <g
                style={{
                  transformOrigin: '113px 52px',
                  transform: isHappyFace ? 'rotate(8deg)' : `rotate(${rightEarHoverAngle}deg)`,
                  transition: 'transform 240ms ease-out',
                }}
                className={isRightEarTwitching ? 'animate-ear-twitch-right' : ''}
              >
                <polygon
                  points="120,22 124,52 102,52"
                  fill="url(#heroStealthGrad)"
                  strokeLinejoin="round"
                />
                <polygon points="117,28 121.5,50 105,50" fill="#141414" />
                <circle cx="114" cy="42" r="1.1" fill="#D4F014" fillOpacity="0.75" />
              </g>

              {/* Crown Bridge Between Ears */}
              <path
                d="M78,52 L102,52 L90,62 Z"
                fill="#1C1C1E"
                stroke="url(#heroStealthGrad)"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              {/* Forehead Diamond Reactor */}
              <polygon
                points="90,45 95,52 90,59 85,52"
                fill="#18181A"
                stroke="url(#heroStealthGrad)"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <circle
                cx="90"
                cy="52"
                r="1.5"
                fill="#D4F014"
              />

              {/* Sleek Cat Mask Outline */}
              <polygon
                points="56,52 90,38 124,52 120,84 90,102 60,84"
                fill="#141414"
                stroke="url(#heroStealthGrad)"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              {/* Subtle Inner Cheek/Chin Contour Line */}
              <polygon
                points="61,56 90,43 119,56 115.5,81 90,96 64.5,81"
                fill="none"
                stroke="#FFFFFF"
                strokeOpacity={isHovered ? '0.1' : '0.07'}
                strokeWidth="1"
                strokeLinejoin="round"
              />

              {/* Crisp High-Definition Lapping Tongue */}
              {isLickingPaw && (
                <g
                  className="animate-tongue-groom"
                  style={{ transformOrigin: '90px 92px' }}
                >
                  <path
                    d="M89,92 C93,88.5 100,87.5 102,92.5 C102,96 95,97.5 90,95 Z"
                    fill="#FF5E8A"
                    stroke="#FF2A6D"
                    strokeWidth="1.1"
                    strokeLinejoin="round"
                  />
                  <circle cx="99.5" cy="92" r="1" fill="#FFFFFF" fillOpacity="0.85" />
                </g>
              )}

              {/* Eyes Rendering: Swaps to adorable curved Happy Eyes (^ ^) when Happy Face */}
              {isHappyFace ? (
                // Happy Eyes (^ ^)
                <g>
                  {/* Left Happy Eye Crescent */}
                  <path
                    d="M 68 70 Q 76 60 84 70"
                    stroke="#D4F014"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Right Happy Eye Crescent */}
                  <path
                    d="M 96 70 Q 104 60 112 70"
                    stroke="#D4F014"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>
              ) : (
                // High-Tech Slit Eyes (Tracks Cursor / Yarn Ball via smooth 60 FPS LERP)
                <g>
                  <circle cx="76" cy="68" r="10" fill="url(#eyeGlowRadial)" />
                  <circle cx="104" cy="68" r="10" fill="url(#eyeGlowRadial)" />

                  {/* LEFT EYE */}
                  <g
                    style={{
                      transform: isBlinking || isLickingPaw ? 'scaleY(0.12)' : 'scaleY(1)',
                      transformOrigin: '76px 68px',
                      transition: 'transform 110ms cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    <polygon
                      points="68,63 84,66 73,74"
                      fill="url(#heroStealthGrad)"
                    />
                    {/* Glowing Hot Iris Core */}
                    <g
                      style={{
                        transform: `translate(${irisX}px, ${irisY}px)`,
                      }}
                    >
                      <polygon
                        points="71,64.5 81,66.5 74,72"
                        fill="#F7FF9E"
                      />
                    </g>
                    {/* Vertical Slit Pupil + Catchlight */}
                    <g
                      style={{
                        transform: `translate(${pupilX}px, ${pupilY}px)`,
                      }}
                    >
                      <line
                        x1="76.5"
                        y1="65"
                        x2="75"
                        y2="71"
                        stroke="#101010"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <circle cx="75.5" cy="67" r="0.7" fill="#FFFFFF" />
                    </g>
                  </g>

                  {/* RIGHT EYE */}
                  <g
                    style={{
                      transform:
                        isBlinking || isWinkingRight || isLickingPaw ? 'scaleY(0.12)' : 'scaleY(1)',
                      transformOrigin: '104px 68px',
                      transition: isWinkingRight
                        ? 'transform 140ms cubic-bezier(0.34, 1.56, 0.64, 1)'
                        : 'transform 110ms cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    <polygon
                      points="112,63 96,66 107,74"
                      fill="url(#heroStealthGrad)"
                    />
                    {/* Glowing Hot Iris Core */}
                    <g
                      style={{
                        transform: `translate(${irisX}px, ${irisY}px)`,
                      }}
                    >
                      <polygon
                        points="109,64.5 99,66.5 106,72"
                        fill="#F7FF9E"
                      />
                    </g>
                    {/* Vertical Slit Pupil + Catchlight */}
                    <g
                      style={{
                        transform: `translate(${pupilX}px, ${pupilY}px)`,
                      }}
                    >
                      <line
                        x1="103.5"
                        y1="65"
                        x2="105"
                        y2="71"
                        stroke="#101010"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <circle cx="104.5" cy="67" r="0.7" fill="#FFFFFF" />
                    </g>
                  </g>
                </g>
              )}

              {/* Nose Prompt Terminal */}
              <circle
                cx="90"
                cy="80"
                r="2.6"
                fill="#D4F014"
              />

              {/* Whiskers as Code Indent Slashes (//) */}
              <g
                stroke="#D4F014"
                strokeWidth="2"
                strokeLinecap="round"
                strokeOpacity={isHovered ? '1' : '0.85'}
              >
                {/* Left Whiskers */}
                <line
                  x1={isHovered ? '48' : '50'}
                  y1="72"
                  x2="66"
                  y2="72"
                  className="transition-all duration-200"
                />
                <line
                  x1={isHovered ? '50' : '52'}
                  y1="80"
                  x2="68"
                  y2="78"
                  className="transition-all duration-200"
                />

                {/* Right Whiskers */}
                <line
                  x1={isHovered ? '132' : '130'}
                  y1="72"
                  x2="114"
                  y2="72"
                  className="transition-all duration-200"
                />
                <line
                  x1={isHovered ? '130' : '128'}
                  y1="80"
                  x2="112"
                  y2="78"
                  className="transition-all duration-200"
                />
              </g>
            </g>

            {/* =====================================================================
                LAYER 4: Floating Affection Particles (♥, ♫)
            ===================================================================== */}
            {isHappyFace && (
              <g className="pointer-events-none select-none">
                <text
                  x="72"
                  y="94"
                  fill="#D4F014"
                  fontSize="8"
                  fontWeight="bold"
                  className="animate-purr-heart-1"
                >
                  ♥
                </text>
                <text
                  x="108"
                  y="90"
                  fill="#D4F014"
                  fontSize="7"
                  fontWeight="bold"
                  className="animate-purr-heart-2"
                >
                  ♫
                </text>
                <text
                  x="90"
                  y="80"
                  fill="#F7FF9E"
                  fontSize="9"
                  fontWeight="bold"
                  className="animate-purr-heart-3"
                >
                  ♥
                </text>
              </g>
            )}

            {/* =====================================================================
                LAYER 5: Interactive Cyber-Lime Yarn Ball & Trailing Thread
            ===================================================================== */}
            {yarnBall.active && (
              <g style={{ opacity: yarnBall.opacity }}>
                {/* Trailing loose yarn thread */}
                {yarnBall.threadD && (
                  <path
                    d={yarnBall.threadD}
                    stroke="#D4F014"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeOpacity="0.75"
                    fill="none"
                  />
                )}

                {/* Yarn Ball Ground Contact Shadow */}
                <ellipse
                  cx={yarnBall.x}
                  cy="195"
                  rx="9"
                  ry="3"
                  fill="#000000"
                  fillOpacity="0.4"
                />

                {/* Detailed Cyber Yarn Ball Sphere */}
                <g
                  transform={`translate(${yarnBall.x}, ${yarnBall.y}) rotate(${yarnBall.rotation})`}
                >
                  <circle cx="0" cy="0" r="10.5" fill="#D4F014" />
                  <circle cx="0" cy="0" r="10" fill="url(#heroStealthGrad)" />
                  {/* Curved Criss-Cross Yarn Thread Lines */}
                  <path d="M-8,-4 C-3,-9 4,-9 8,-4" stroke="#121214" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                  <path d="M-9,1 C-4,-4 5,-4 9,1" stroke="#121214" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                  <path d="M-7,6 C-2,2 5,2 8,6" stroke="#121214" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                  <path d="M-4,-8 C-8,-3 -8,4 -4,8" stroke="#121214" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                  <path d="M1,-9 C-3,-4 -3,5 1,9" stroke="#121214" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                  <path d="M6,-7 C2,-2 2,5 6,7" stroke="#121214" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                  {/* Specular wool highlight */}
                  <circle cx="-3" cy="-4" r="1.6" fill="#FFFFFF" fillOpacity="0.8" />
                </g>
              </g>
            )}
          </svg>
        </div>
      </div>

      {companionDismissed && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            catStore.setDismissed(false);
          }}
          className="mt-2 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/10 hover:bg-white/20 text-[#D4F014] border border-[#D4F014]/30 transition cursor-pointer"
        >
          {lang === 'es' ? '🐾 Dejar que camine por la web' : '🐾 Let cat roam the page'}
        </button>
      )}
    </div>
  );
};
