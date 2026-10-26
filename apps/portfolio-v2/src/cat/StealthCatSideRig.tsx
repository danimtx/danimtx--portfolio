/**
 * StealthCatSideRig.tsx
 * Pure silhouette side-view articulated SVG cat (with smooth 3D head turn to look straight at the viewer).
 * Updates DOM attributes imperatively via refs (zero React re-renders per frame).
 */
import { useId, useImperativeHandle, useRef, forwardRef } from 'react';
import {
  type Vec,
  v,
  add,
  mul,
  rot,
  lerp,
  lerpV,
  capsulePath,
  catmullRom,
  taperedTubePath,
  fmt,
} from './catKinematics';
import type { CatFrame, HindLeg, ForeLeg } from './catSim';

export interface StealthCatSideRigHandle {
  renderFrame: (f: CatFrame, opts?: { darkSurface?: boolean; debugSkeleton?: boolean }) => void;
}

interface Props {
  className?: string;
  /** Fixed viewBox mode (used inside CatLab cards). When false, the SVG positions itself in world space. */
  localViewBox?: string;
  onCatClick?: () => void;
  onCatHoverChange?: (hovered: boolean) => void;
}

/** Head scale relative to the original skull (bigger, rounder head reads more "cat"). */
const HEAD_S = 1.15;

/**
 * Build the organic silhouette path of the torso between hip and shoulder.
 * Feline anatomy: high rounded croup, slight rise over the loin, dipping withers,
 * a deep chest behind the elbow and a tucked-up waist in front of the thigh.
 */
const buildTorsoPath = (f: CatFrame): string => {
  const { hip, sh, arch, pitch, breath, scapula } = f;
  const up = v(Math.sin(pitch), -Math.cos(pitch));
  const along = (t: number, n: number) => add(lerpV(hip, sh, t), mul(up, n));
  const H = (lx: number, ly: number) => add(hip, rot(v(lx, ly), pitch));
  const S = (lx: number, ly: number) => add(sh, rot(v(lx, ly), pitch));

  const tailRoot = H(-15, -10);
  const rumpBack = H(-20.5, -0.5);
  const haunchLow = H(-13, 11.5);
  const stifle = H(5, 13.5);
  const tuck = along(0.3, -(9.5 - arch * 0.35 + breath * 12));
  const belly = along(0.56, -(13 - arch * 0.5 + breath * 30));
  const chestLow = S(-5, 17.5 + breath * 18);
  const sternum = S(10.5, 10.5 + breath * 8);
  const chestFront = S(16, -3);
  const withers = S(-4, -16.5 - scapula * 2.6);
  const backMid = along(0.56, 14.5 + arch * 0.9);
  const loin = along(0.22, 16.5 + arch * 0.75);
  const croup = H(-4, -17.5);

  return catmullRom(
    [tailRoot, rumpBack, haunchLow, stifle, tuck, belly, chestLow, sternum, chestFront, withers, backMid, loin, croup],
    true,
    0.95,
  );
};

/** Build neck + head + ears + eyes, blending seamlessly between profile (headYaw=0) and front-facing gaze (headYaw=1). */
const buildHeadAndNeckPath = (f: CatFrame): {
  neckD: string;
  headD: string;
  earNearD: string;
  earFarD: string;
  eyeNearTransform: string;
  eyeFarTransform: string;
  eyeFarOpacity: string;
  pupilTransform: string;
} => {
  const { sh, head, headPitch: hp, headYaw: yaw, headTilt: tilt, earN, earF, jaw, eyeOpen, pupil } = f;
  const ang = lerp(hp, tilt, yaw);

  const neckD = capsulePath(add(sh, v(2, -7)), add(head, rot(v(lerp(-4, 0, yaw), 4), ang)), 13.5, 10.5);

  const H = (lx: number, ly: number): Vec => add(head, rot(v(lx * HEAD_S, ly * HEAD_S), ang));

  // Profile skull (round cranium, short muzzle, soft cheek) vs front-facing rounded feline face.
  const ptsProfile: [number, number][] = [
    [-12.5, -3.5],
    [-5.5, -11.8],
    [4.0, -12.8],
    [11.5, -8.8],
    [16.8, -3.6],
    [19.0, 0.0],
    [17.0, 3.4],
    [10.5, 6.4 + jaw * 6.5],
    [0.0, 8.6 + jaw * 2.5],
    [-10.0, 5.5],
  ];
  const ptsFront: [number, number][] = [
    [-15.5, -3.5],
    [-9.0, -12.2],
    [0.0, -13.4],
    [9.0, -12.2],
    [15.5, -3.5],
    [16.5, 2.5],
    [11.5, 8.0],
    [0.0, 10.0 + jaw * 4.0],
    [-11.5, 8.0],
    [-16.5, 2.5],
  ];

  const headPts = ptsProfile.map((p, i) =>
    H(lerp(p[0], ptsFront[i][0], yaw), lerp(p[1], ptsFront[i][1], yaw)),
  );
  const headD = catmullRom(headPts, true, 0.85);

  const makeEar = (
    baseShiftX: number,
    baseShiftY: number,
    earAngleOffset: number,
    scale: number,
  ): string => {
    const baseCenter = H(baseShiftX, baseShiftY);
    const earAng = ang + earAngleOffset;
    const tip = add(baseCenter, rot(v(19.5 * scale, 0), earAng));
    const bBack = add(baseCenter, rot(v(-5.6 * scale, 1.5 * scale), ang));
    const bFront = add(baseCenter, rot(v(5.6 * scale, 2.0 * scale), ang));
    const midBack = lerpV(bBack, tip, 0.52);
    const midFront = lerpV(bFront, tip, 0.55);
    return catmullRom([bBack, midBack, tip, midFront, bFront], true, 0.65);
  };

  // Near ear (left ear when facing front) & Far ear (right ear when facing front)
  const earNearX = lerp(-2.2, -8.8, yaw);
  const earNearY = lerp(-10.2, -10.8, yaw);
  const earNearAng = lerp(-1.28 + earN * 0.65, -2.06 - earN * 0.35, yaw);

  const earFarX = lerp(2.6, 8.8, yaw);
  const earFarY = lerp(-10.8, -10.8, yaw);
  const earFarAng = lerp(-1.28 + earF * 0.65, -1.08 + earF * 0.35, yaw);

  const earNearD = makeEar(earNearX, earNearY, earNearAng, 1.0);
  const earFarD = makeEar(earFarX, earFarY, earFarAng, lerp(0.88, 1.0, yaw));

  const eyeK = HEAD_S * 0.95;
  const sy = Math.max(0.08, eyeOpen) * lerp(1.0, 1.12, yaw) * eyeK;
  const sx = lerp(1.0, 1.08, yaw) * eyeK;
  const degBase = (ang * 180) / Math.PI;

  // Near eye shifts from profile side (9.8, -4.2) to front-left (-5.8, -1.6)
  const nearEyePos = H(lerp(9.8, -5.8, yaw), lerp(-4.2, -1.6, yaw));
  const nearEyeDeg = degBase + lerp(-8, 10, yaw);
  const eyeNearTransform = `translate(${fmt(nearEyePos.x)} ${fmt(nearEyePos.y)}) rotate(${fmt(nearEyeDeg)}) scale(${fmt(sx)} ${fmt(sy)})`;

  // Far eye emerges on front-right (5.8, -1.6) as head turns toward viewer
  const farEyePos = H(lerp(13.5, 5.8, yaw), lerp(-3.8, -1.6, yaw));
  const farEyeDeg = degBase - 10;
  const farScaleX = Math.max(0.01, yaw * sx);
  const eyeFarTransform = `translate(${fmt(farEyePos.x)} ${fmt(farEyePos.y)}) rotate(${fmt(farEyeDeg)}) scale(${fmt(farScaleX)} ${fmt(sy)})`;
  const eyeFarOpacity = fmt(Math.max(0, (yaw - 0.12) / 0.88));

  const pupilShiftX = lerp(pupil * 1.1, 0, yaw);
  const pupilShiftY = lerp(pupil * 0.45, 0, yaw);
  const pupilTransform = `translate(${fmt(pupilShiftX)} ${fmt(pupilShiftY)})`;

  return {
    neckD,
    headD,
    earNearD,
    earFarD,
    eyeNearTransform,
    eyeFarTransform,
    eyeFarOpacity,
    pupilTransform,
  };
};

/**
 * Hind leg: thick muscular thigh tapering to a slim shin, a fine metatarsus and a
 * small rounded paw (only ~70 % of the toe bone is drawn so feet never look like boots).
 */
const buildHindLegPath = (leg: HindLeg): string => {
  const pawTip = lerpV(leg.ball, leg.toe, 0.62);
  return (
    capsulePath(leg.root, leg.knee, 15.0, 7.4) +
    capsulePath(leg.knee, leg.hock, 6.0, 3.5) +
    capsulePath(leg.hock, leg.ball, 3.5, 3.4) +
    capsulePath(leg.ball, pawTip, 3.9, 3.2)
  );
};

/** Fore leg: shoulder mass into a straight slender forearm and a compact paw. */
const buildForeLegPath = (leg: ForeLeg): string => {
  const pawTip = lerpV(leg.ball, leg.toe, 0.62);
  return (
    capsulePath(leg.root, leg.elbow, 10.5, 5.6) +
    capsulePath(leg.elbow, leg.wrist, 5.0, 3.5) +
    capsulePath(leg.wrist, leg.ball, 3.5, 3.6) +
    capsulePath(leg.ball, pawTip, 3.7, 3.1)
  );
};

export const StealthCatSideRig = forwardRef<StealthCatSideRigHandle, Props>(
  ({ className, localViewBox, onCatClick, onCatHoverChange }, ref) => {
    const rootGRef = useRef<SVGGElement | null>(null);
    const shadowRef = useRef<SVGEllipseElement | null>(null);
    const farHindRef = useRef<SVGPathElement | null>(null);
    const farForeRef = useRef<SVGPathElement | null>(null);
    const tailBackRef = useRef<SVGPathElement | null>(null);
    const tailFrontRef = useRef<SVGPathElement | null>(null);
    const torsoRef = useRef<SVGPathElement | null>(null);
    const neckRef = useRef<SVGPathElement | null>(null);
    const earFarRef = useRef<SVGPathElement | null>(null);
    const headRef = useRef<SVGPathElement | null>(null);
    const earNearRef = useRef<SVGPathElement | null>(null);
    const nearHindRef = useRef<SVGPathElement | null>(null);
    const nearForeRef = useRef<SVGPathElement | null>(null);
    const tailWrapRef = useRef<SVGPathElement | null>(null);
    const eyeNearGRef = useRef<SVGGElement | null>(null);
    const eyeFarGRef = useRef<SVGGElement | null>(null);
    const pupilNearRef = useRef<SVGEllipseElement | null>(null);
    const pupilFarRef = useRef<SVGEllipseElement | null>(null);
    const debugGRef = useRef<SVGGElement | null>(null);

    useImperativeHandle(ref, () => ({
      renderFrame(f: CatFrame, opts) {
        const g = rootGRef.current;
        if (!g) return;

        const isDark = !!opts?.darkSurface;
        g.setAttribute('data-surface', isDark ? 'dark' : 'light');

        if (localViewBox) {
          g.setAttribute('transform', `scale(${fmt(f.flip)} 1)`);
        } else {
          g.setAttribute(
            'transform',
            `translate(${fmt(f.x)} ${fmt(f.y)}) scale(${fmt(f.flip * f.scale)} ${fmt(f.scale)})`,
          );
        }

        if (shadowRef.current) {
          const span = Math.abs(f.sh.x - f.hip.x) + 34;
          const cx = (f.sh.x + f.hip.x) * 0.5;
          shadowRef.current.setAttribute('cx', fmt(cx));
          shadowRef.current.setAttribute('rx', fmt(span * 0.55));
          shadowRef.current.setAttribute('opacity', fmt(0.18 * f.shadow));
        }

          const tailD = taperedTubePath(f.tail, 9.5, 4.2);
          if (tailBackRef.current && tailFrontRef.current) {
            if (f.tailFront) {
              tailBackRef.current.setAttribute('d', '');
              tailFrontRef.current.setAttribute('d', tailD);
            } else {
              tailBackRef.current.setAttribute('d', tailD);
              tailFrontRef.current.setAttribute('d', '');
            }
          }

          // When sitting, the tail wraps around the front of the paws instead of sticking out behind
          if (tailWrapRef.current) {
            const isSit = f.hip.y > -20 && f.sh.y < -45 && !f.airborne;
            if (isSit) {
              tailBackRef.current?.setAttribute('d', '');
              const p0 = v(f.hip.x - 10, -7);
              const p1 = v(f.hip.x + 8, -3.5);
              const p2 = v(f.sh.x + 12, -3.5);
              const p3 = v(f.sh.x + 22, -10.5 + Math.sin(f.breath * 180) * 1.2);
              tailWrapRef.current.setAttribute('d', taperedTubePath([p0, p1, p2, p3], 8.2, 3.8));
            } else {
              tailWrapRef.current.setAttribute('d', '');
            }
          }

        farHindRef.current?.setAttribute('d', buildHindLegPath(f.hind[1]));
        farForeRef.current?.setAttribute('d', buildForeLegPath(f.fore[1]));
        torsoRef.current?.setAttribute('d', buildTorsoPath(f));

        const hn = buildHeadAndNeckPath(f);
        neckRef.current?.setAttribute('d', hn.neckD);
        earFarRef.current?.setAttribute('d', hn.earFarD);
        headRef.current?.setAttribute('d', hn.headD);
        earNearRef.current?.setAttribute('d', hn.earNearD);

        nearHindRef.current?.setAttribute('d', buildHindLegPath(f.hind[0]));
        nearForeRef.current?.setAttribute('d', buildForeLegPath(f.fore[0]));

        eyeNearGRef.current?.setAttribute('transform', hn.eyeNearTransform);
        eyeFarGRef.current?.setAttribute('transform', hn.eyeFarTransform);
        eyeFarGRef.current?.setAttribute('opacity', hn.eyeFarOpacity);
        pupilNearRef.current?.setAttribute('transform', hn.pupilTransform);
        pupilFarRef.current?.setAttribute('transform', hn.pupilTransform);

        if (debugGRef.current) {
          if (opts?.debugSkeleton) {
            const h0 = f.hind[0];
            const h1 = f.hind[1];
            const f0 = f.fore[0];
            const poly = (pts: Vec[]) => pts.map((p) => `${fmt(p.x)},${fmt(p.y)}`).join(' ');
            debugGRef.current.innerHTML =
              `<polyline points="${poly([h1.root, h1.knee, h1.hock, h1.ball, h1.toe])}" fill="none" stroke="#84CC16" stroke-width="1.2" stroke-dasharray="2 2"/>` +
              `<polyline points="${poly([h0.root, h0.knee, h0.hock, h0.ball, h0.toe])}" fill="none" stroke="#D4F014" stroke-width="1.5"/>` +
              `<polyline points="${poly([f0.root, f0.elbow, f0.wrist, f0.ball, f0.toe])}" fill="none" stroke="#38BDF8" stroke-width="1.5"/>` +
              `<polyline points="${poly([f.hip, f.sh, f.neckBase, f.head])}" fill="none" stroke="#F43F5E" stroke-width="1.5"/>` +
              `<polyline points="${poly(f.tail)}" fill="none" stroke="#A855F7" stroke-width="1.2"/>` +
              [h0.root, h0.knee, h0.hock, h0.ball, f0.root, f0.elbow, f0.wrist, f0.ball, f.head]
                .map((p) => `<circle cx="${fmt(p.x)}" cy="${fmt(p.y)}" r="2.2" fill="#fff" stroke="#111" stroke-width="1"/>`)
                .join('');
          } else if (debugGRef.current.innerHTML !== '') {
            debugGRef.current.innerHTML = '';
          }
        }
      },
    }));

    const uid = 'cat' + useId().replace(/[^a-zA-Z0-9_-]/g, '');
    const pid = (name: string) => `${uid}-${name}`;
    const bodyPartIds = ['farHind', 'farFore', 'earFar', 'tailBack', 'torso', 'neck', 'nearHind', 'nearFore', 'head', 'earNear', 'tailFront', 'tailWrap'];
    const maskId = `${uid}-rim-mask`;

    return (
      <svg
        viewBox={localViewBox ?? undefined}
        className={className}
        style={{ overflow: 'visible' }}
        aria-hidden="true"
      >
        <defs>
          {/* Mask that cuts out the interior of the fused silhouette so only the outer contour glows */}
          <mask id={maskId} maskUnits="userSpaceOnUse" x="-400" y="-400" width="800" height="800">
            <rect x="-400" y="-400" width="800" height="800" fill="#ffffff" />
            <g fill="#000000" stroke="#000000" strokeWidth={0.9} strokeLinejoin="round" strokeLinecap="round">
              {bodyPartIds.map((n) => (
                <use key={n} href={`#${pid(n)}`} />
              ))}
            </g>
          </mask>
        </defs>

        <g
          ref={rootGRef}
          className="cat-silhouette-root"
          fill="#111111"
          stroke="#111111"
          strokeWidth={0.9}
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          {/* Ground contact shadow */}
          <ellipse ref={shadowRef} cx="0" cy="0" rx="52" ry="4.2" fill="#000000" opacity="0.18" stroke="none" />

          {/* Unified silhouette group (interactive only on painted silhouette pixels) */}
          <g
            className={`cat-unified-silhouette ${onCatClick ? 'pointer-events-auto cursor-pointer' : ''}`}
            data-testid={onCatClick ? 'companion-cat-hitbox' : undefined}
            onClick={onCatClick}
            onMouseEnter={onCatHoverChange ? () => onCatHoverChange(true) : undefined}
            onMouseLeave={onCatHoverChange ? () => onCatHoverChange(false) : undefined}
          >
            {/* Far legs & far ear (slightly lighter for depth) */}
            <g fill="#1A1A1E" stroke="#1A1A1E">
              <path id={pid('farHind')} ref={farHindRef} />
              <path id={pid('farFore')} ref={farForeRef} />
              <path id={pid('earFar')} ref={earFarRef} />
            </g>

            {/* Tail behind body */}
            <path id={pid('tailBack')} ref={tailBackRef} />

            {/* Main fused silhouette body */}
            <g>
              <path id={pid('torso')} ref={torsoRef} />
              <path id={pid('neck')} ref={neckRef} />
              <path id={pid('nearHind')} ref={nearHindRef} />
              <path id={pid('nearFore')} ref={nearForeRef} />
              <path id={pid('head')} ref={headRef} />
              <path id={pid('earNear')} ref={earNearRef} />
            </g>

            {/* Tail wrapped in front (sit / loaf) */}
            <path id={pid('tailFront')} ref={tailFrontRef} />
            <path id={pid('tailWrap')} ref={tailWrapRef} />
          </g>

          {/* Outer-only rim light on dark surfaces (1.25px visible outer border via mask) */}
          <g
            className="cat-rim-layer"
            mask={`url(#${maskId})`}
            fill="none"
            stroke="#D4F014"
            strokeWidth={2.6}
            strokeOpacity={0.72}
          >
            {bodyPartIds.map((n) => (
              <use key={n} href={`#${pid(n)}`} />
            ))}
          </g>

          {/* Signature Cyber-Lime almond eyes (near eye always visible; far eye appears when looking at viewer) */}
          <g ref={eyeNearGRef} stroke="none">
            <path
              d="M -4.2 0 Q 0 -3.1 4.4 -0.3 Q 0 2.9 -4.2 0 Z"
              fill="#D4F014"
            />
            <ellipse ref={pupilNearRef} cx="0.4" cy="0" rx="1.05" ry="2.1" fill="#111111" />
          </g>

          <g ref={eyeFarGRef} opacity="0" stroke="none">
            <path
              d="M -4.4 -0.3 Q 0 -3.1 4.2 0 Q 0 2.9 -4.4 -0.3 Z"
              fill="#D4F014"
            />
            <ellipse ref={pupilFarRef} cx="-0.4" cy="0" rx="1.05" ry="2.1" fill="#111111" />
          </g>

          {/* Optional debug skeleton overlay */}
          <g ref={debugGRef} stroke="none" />
        </g>
      </svg>
    );
  },
);

StealthCatSideRig.displayName = 'StealthCatSideRig';
