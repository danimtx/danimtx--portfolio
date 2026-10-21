/**
 * StealthCatSideRig.tsx
 * Pure silhouette side-view articulated SVG cat (with smooth 3D head turn to look straight at the viewer).
 * Updates DOM attributes imperatively via refs (zero React re-renders per frame).
 */
import { useImperativeHandle, useRef, forwardRef } from 'react';
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
}

/** Build the organic silhouette path of the torso between hip and shoulder. */
const buildTorsoPath = (f: CatFrame): string => {
  const { hip, sh, arch, pitch, breath, scapula } = f;
  const mid = lerpV(hip, sh, 0.5);
  const up = v(Math.sin(pitch), -Math.cos(pitch));

  const rump = add(hip, rot(v(-15, -7), pitch));
  const hipTop = add(hip, rot(v(-2, -16), pitch));
  const spineMid = add(mid, add(mul(up, 17 + arch * 0.9), rot(v(0, 0), pitch)));
  const withers = add(sh, rot(v(-3, -17 - scapula * 2.6), pitch));
  const chestFront = add(sh, rot(v(16, -4), pitch));
  const sternum = add(sh, rot(v(11, 12 + breath * 18), pitch));
  const bellyMid = add(mid, mul(up, -(13.5 - arch * 0.55 + breath * 30)));
  const groin = add(hip, rot(v(7, 10), pitch));
  const ischium = add(hip, rot(v(-12, 5), pitch));

  return catmullRom(
    [rump, hipTop, spineMid, withers, chestFront, sternum, bellyMid, groin, ischium],
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

  const H = (lx: number, ly: number): Vec => add(head, rot(v(lx, ly), ang));

  // Profile skull points vs Front-facing rounded feline face points
  const ptsProfile: [number, number][] = [
    [-12, -4],
    [-3, -12.5],
    [8.5, -10.2],
    [16.2, -5.0],
    [19.5, -2.0],
    [17.5, 3.2],
    [11.0, 5.8 + jaw * 6.5],
    [-2.0, 7.2 + jaw * 2.5],
    [-11.0, 3.5],
  ];
  const ptsFront: [number, number][] = [
    [-15.0, -3.5],
    [-7.5, -12.6],
    [7.5, -12.6],
    [15.0, -3.5],
    [15.5, 2.2],
    [11.2, 7.5],
    [0.0, 9.2 + jaw * 4.0],
    [-11.2, 7.5],
    [-15.5, 2.2],
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

  const sy = Math.max(0.08, eyeOpen) * lerp(1.0, 1.12, yaw);
  const sx = lerp(1.0, 1.08, yaw);
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

const buildHindLegPath = (leg: HindLeg): string => {
  return (
    capsulePath(leg.root, leg.knee, 13.0, 8.2) +
    capsulePath(leg.knee, leg.hock, 8.0, 4.6) +
    capsulePath(leg.hock, leg.ball, 4.5, 3.8) +
    capsulePath(leg.ball, leg.toe, 4.2, 3.4)
  );
};

const buildForeLegPath = (leg: ForeLeg): string => {
  return (
    capsulePath(leg.root, leg.elbow, 9.8, 6.6) +
    capsulePath(leg.elbow, leg.wrist, 6.2, 4.2) +
    capsulePath(leg.wrist, leg.ball, 4.2, 3.8) +
    capsulePath(leg.ball, leg.toe, 4.0, 3.3)
  );
};

export const StealthCatSideRig = forwardRef<StealthCatSideRigHandle, Props>(
  ({ className, localViewBox }, ref) => {
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
            const f0 = f.fore[0];
            const poly = (pts: Vec[]) => pts.map((p) => `${fmt(p.x)},${fmt(p.y)}`).join(' ');
            debugGRef.current.innerHTML =
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

    return (
      <svg
        viewBox={localViewBox ?? undefined}
        className={className}
        style={{ overflow: 'visible' }}
        aria-hidden="true"
      >
        <g
          ref={rootGRef}
          className="cat-silhouette-root"
          fill="#111111"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          {/* Ground contact shadow */}
          <ellipse ref={shadowRef} cx="0" cy="0" rx="52" ry="4.2" fill="#000000" opacity="0.18" stroke="none" />

          {/* Unified silhouette group: outer rim light applies to the fused silhouette as a whole */}
          <g className="cat-unified-silhouette">
            {/* Far legs & far ear */}
            <g fill="#1A1A1E">
              <path ref={farHindRef} />
              <path ref={farForeRef} />
              <path ref={earFarRef} />
            </g>

            {/* Tail behind body */}
            <path ref={tailBackRef} />

            {/* Main fused silhouette body */}
            <g>
              <path ref={torsoRef} />
              <path ref={neckRef} />
              <path ref={nearHindRef} />
              <path ref={nearForeRef} />
              <path ref={headRef} />
              <path ref={earNearRef} />
            </g>

            {/* Tail wrapped in front (sit / loaf) */}
            <path ref={tailFrontRef} />
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
