/**
 * catKinematics.ts
 * Pure math for the side-view silhouette cat: vectors, easing, damping,
 * 2-bone inverse kinematics, gait definitions and SVG path builders.
 *
 * Coordinate system (rig space): cat faces +x, ground at y = 0, up is -y (SVG native).
 * One rig unit ≈ 1/100 of the hip→shoulder torso length.
 */

export interface Vec {
  x: number;
  y: number;
}

export const v = (x: number, y: number): Vec => ({ x, y });
export const add = (a: Vec, b: Vec): Vec => ({ x: a.x + b.x, y: a.y + b.y });
export const sub = (a: Vec, b: Vec): Vec => ({ x: a.x - b.x, y: a.y - b.y });
export const mul = (a: Vec, s: number): Vec => ({ x: a.x * s, y: a.y * s });
export const len = (a: Vec): number => Math.hypot(a.x, a.y);
export const dist = (a: Vec, b: Vec): number => Math.hypot(a.x - b.x, a.y - b.y);
export const norm = (a: Vec): Vec => {
  const l = Math.hypot(a.x, a.y) || 1;
  return { x: a.x / l, y: a.y / l };
};
export const rot = (a: Vec, ang: number): Vec => {
  const c = Math.cos(ang);
  const s = Math.sin(ang);
  return { x: a.x * c - a.y * s, y: a.x * s + a.y * c };
};
export const lerpV = (a: Vec, b: Vec, t: number): Vec => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
});
export const fromAngle = (ang: number, l = 1): Vec => ({ x: Math.cos(ang) * l, y: Math.sin(ang) * l });

export const clamp = (x: number, a: number, b: number): number => (x < a ? a : x > b ? b : x);
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
export const invLerp = (a: number, b: number, x: number): number => clamp((x - a) / (b - a), 0, 1);
export const smoothstep = (t: number): number => {
  const c = clamp(t, 0, 1);
  return c * c * (3 - 2 * c);
};
export const easeInOut = (t: number): number => {
  const c = clamp(t, 0, 1);
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2;
};
export const easeOut = (t: number): number => 1 - Math.pow(1 - clamp(t, 0, 1), 3);
export const easeIn = (t: number): number => Math.pow(clamp(t, 0, 1), 3);
/** 0 → 1 → 0 bump over t ∈ [0,1]. */
export const bump = (t: number): number => (t <= 0 || t >= 1 ? 0 : Math.sin(Math.PI * t));
/** Window that ramps in during [a, a+fade] and out during [b-fade, b]. */
export const windowed = (t: number, a: number, b: number, fade: number): number =>
  smoothstep((t - a) / fade) * smoothstep((b - t) / fade);

/** Frame-rate independent exponential approach. `rate` ≈ 1/time-constant (per second). */
export const damp = (current: number, target: number, rate: number, dt: number): number =>
  target + (current - target) * Math.exp(-rate * dt);
export const dampV = (current: Vec, target: Vec, rate: number, dt: number): Vec => ({
  x: damp(current.x, target.x, rate, dt),
  y: damp(current.y, target.y, rate, dt),
});
export const wrap01 = (x: number): number => x - Math.floor(x);
/** Shortest signed delta on the unit circle (phases in [0,1)). */
export const phaseDelta = (from: number, to: number): number => {
  let d = wrap01(to) - wrap01(from);
  if (d > 0.5) d -= 1;
  if (d < -0.5) d += 1;
  return d;
};

/** Deterministic small PRNG so the lab sheets are reproducible. */
export const makeRng = (seed = 1) => {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/**
 * 2-bone IK. Returns the middle joint and the actually reached end point.
 * bendSign = -1 → joint bends toward +x when the limb points down (knee),
 * bendSign = +1 → joint bends toward -x (elbow).
 */
export const solveIK2 = (
  root: Vec,
  target: Vec,
  l1: number,
  l2: number,
  bendSign: number,
): { joint: Vec; end: Vec } => {
  const d0 = dist(root, target);
  const d = clamp(d0, Math.abs(l1 - l2) + 0.01, l1 + l2 - 0.01);
  const dir = d0 > 1e-6 ? mul(sub(target, root), 1 / d0) : v(0, 1);
  const a = (l1 * l1 - l2 * l2 + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, l1 * l1 - a * a));
  const p = add(root, mul(dir, a));
  const perp = v(-dir.y, dir.x);
  return { joint: add(p, mul(perp, h * bendSign)), end: add(root, mul(dir, d)) };
};

// ─────────────────────────────────────────────────────────────────────────────
// Gaits
// Leg order everywhere: [nearHind, nearFore, farHind, farFore]
// ─────────────────────────────────────────────────────────────────────────────

export interface GaitDef {
  offsets: [number, number, number, number];
  duty: number;
  stride: number; // rig units travelled per full cycle
  lift: number; // swing foot height
}

/** Lateral-sequence walk: LH → LF → RH → RF. */
export const WALK: GaitDef = { offsets: [0, 0.25, 0.5, 0.75], duty: 0.62, stride: 82, lift: 8 };
/** Diagonal trot. */
export const TROT: GaitDef = { offsets: [0, 0.5, 0.5, 1.0], duty: 0.42, stride: 120, lift: 11 };
/** Simplified rotary gallop (hind pair, then fore pair). */
export const DASH: GaitDef = { offsets: [0, 0.52, 0.1, 0.62], duty: 0.3, stride: 200, lift: 14 };

export const GAIT_SPEED = { walk: 120, trot: 280, dash: 560 };

export const blendGait = (speed: number, stealth: boolean): GaitDef => {
  const s = Math.abs(speed);
  const tTrot = invLerp(GAIT_SPEED.walk * 1.15, GAIT_SPEED.trot, s);
  const tDash = invLerp(GAIT_SPEED.trot * 1.1, GAIT_SPEED.dash, s);
  const mix = (a: GaitDef, b: GaitDef, t: number): GaitDef => ({
    offsets: a.offsets.map((o, i) => o + phaseDelta(o, b.offsets[i]) * t) as GaitDef['offsets'],
    duty: lerp(a.duty, b.duty, t),
    stride: lerp(a.stride, b.stride, t),
    lift: lerp(a.lift, b.lift, t),
  });
  let g = mix(mix(WALK, TROT, tTrot), DASH, tDash);
  if (stealth) g = { ...g, stride: g.stride * 0.78, lift: g.lift * 0.75, duty: Math.min(0.7, g.duty + 0.05) };
  return g;
};

// ─────────────────────────────────────────────────────────────────────────────
// SVG path builders
// ─────────────────────────────────────────────────────────────────────────────

const f = (n: number) => (Math.round(n * 100) / 100).toString();

/** Capsule with different end radii from a to b. */
export const capsulePath = (a: Vec, b: Vec, ra: number, rb: number): string => {
  let d = sub(b, a);
  let l = len(d);
  if (l < 0.01) {
    d = v(0, 0.01);
    l = 0.01;
  }
  const u = mul(d, 1 / l);
  const n = v(-u.y, u.x);
  const p1 = add(a, mul(n, ra));
  const p2 = add(b, mul(n, rb));
  const p3 = sub(b, mul(n, rb));
  const p4 = sub(a, mul(n, ra));
  return (
    `M${f(p1.x)} ${f(p1.y)}L${f(p2.x)} ${f(p2.y)}` +
    `A${f(rb)} ${f(rb)} 0 0 0 ${f(p3.x)} ${f(p3.y)}` +
    `L${f(p4.x)} ${f(p4.y)}` +
    `A${f(ra)} ${f(ra)} 0 0 0 ${f(p1.x)} ${f(p1.y)}Z`
  );
};

/** Catmull-Rom spline through points, emitted as cubic Béziers. */
export const catmullRom = (pts: Vec[], closed: boolean, tension = 1): string => {
  const n = pts.length;
  if (n < 2) return '';
  const get = (i: number) => (closed ? pts[(i + n) % n] : pts[clamp(i, 0, n - 1)]);
  let d = `M${f(pts[0].x)} ${f(pts[0].y)}`;
  const segs = closed ? n : n - 1;
  for (let i = 0; i < segs; i++) {
    const p0 = get(i - 1);
    const p1 = get(i);
    const p2 = get(i + 1);
    const p3 = get(i + 2);
    const c1 = add(p1, mul(sub(p2, p0), tension / 6));
    const c2 = sub(p2, mul(sub(p3, p1), tension / 6));
    d += `C${f(c1.x)} ${f(c1.y)} ${f(c2.x)} ${f(c2.y)} ${f(p2.x)} ${f(p2.y)}`;
  }
  return closed ? d + 'Z' : d;
};

/** Tapered tube along a polyline with a rounded tip (used for the tail). */
export const taperedTubePath = (pts: Vec[], w0: number, w1: number): string => {
  const n = pts.length;
  if (n < 2) return '';
  const left: Vec[] = [];
  const right: Vec[] = [];
  for (let i = 0; i < n; i++) {
    const a = pts[Math.max(0, i - 1)];
    const b = pts[Math.min(n - 1, i + 1)];
    const t = norm(sub(b, a));
    const nn = v(-t.y, t.x);
    const w = lerp(w0, w1, i / (n - 1)) / 2;
    left.push(add(pts[i], mul(nn, w)));
    right.push(sub(pts[i], mul(nn, w)));
  }
  const tipR = w1 / 2;
  const leftPath = catmullRom(left, false);
  const rightRev = right.slice().reverse();
  const rightPath = catmullRom(rightRev, false).replace(/^M[^C]*/, '');
  const r0 = rightRev[0];
  return `${leftPath}A${f(tipR)} ${f(tipR)} 0 0 0 ${f(r0.x)} ${f(r0.y)}${rightPath}Z`;
};

export const fmt = f;
