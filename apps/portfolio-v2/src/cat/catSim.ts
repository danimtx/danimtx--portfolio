/**
 * catSim.ts
 * Procedural simulation of the silhouette cat: locomotion (walk / trot / dash),
 * foot placement with zero sliding, jumps with anticipation, idle actions,
 * secondary motion (tail chain, breathing, blinking, ear twitches).
 *
 * Framework-agnostic: no React, no DOM. Call `update(dt)` once per frame and read `frame`.
 * World coordinates are CSS pixels (y down). The root is the point on the ground below the body.
 */
import {
  type Vec,
  type GaitDef,
  v,
  add,
  sub,
  mul,
  rot,
  dist,
  fromAngle,
  lerp,
  lerpV,
  clamp,
  damp,
  dampV,
  wrap01,
  bump,
  easeInOut,
  smoothstep,
  windowed,
  invLerp,
  solveIK2,
  blendGait,
  makeRng,
  GAIT_SPEED,
} from './catKinematics';
import {
  DIM,
  NF,
  FF,
  isHind,
  posePreset,
  cloneBody,
  type BodyPose,
  type FootPose,
  type Posture,
} from './catPoses';

export type ActionName =
  | 'groom'
  | 'yawn'
  | 'swipe'
  | 'wiggle'
  | 'sniff'
  | 'tailFlick'
  | 'lookAround'
  | 'lookFront';

const ACTIONS: Record<ActionName, { dur: number; needs?: Posture[]; enter?: Posture }> = {
  groom: { dur: 2.8, needs: ['sit'], enter: 'sit' },
  yawn: { dur: 2.1, needs: ['sit', 'stand', 'crouch', 'loaf'], enter: 'sit' },
  swipe: { dur: 0.85, needs: ['crouch', 'sit'], enter: 'crouch' },
  wiggle: { dur: 0.95, needs: ['crouch'], enter: 'crouch' },
  sniff: { dur: 1.9, needs: ['stand', 'crouch'], enter: 'stand' },
  tailFlick: { dur: 0.7, needs: ['sit', 'stand', 'crouch', 'loaf'], enter: 'sit' },
  lookAround: { dur: 2.3, needs: ['stand', 'sit', 'crouch', 'loaf'], enter: 'sit' },
  lookFront: { dur: 2.4, needs: ['sit', 'stand', 'crouch', 'loaf'], enter: 'sit' },
};

export interface HindLeg {
  root: Vec;
  knee: Vec;
  hock: Vec;
  ball: Vec;
  toe: Vec;
}
export interface ForeLeg {
  root: Vec;
  elbow: Vec;
  wrist: Vec;
  ball: Vec;
  toe: Vec;
}

export interface CatFrame {
  x: number;
  y: number;
  scale: number;
  flip: number;
  hip: Vec;
  sh: Vec;
  arch: number;
  pitch: number;
  breath: number;
  scapula: number;
  hind: [HindLeg, HindLeg]; // [near, far]
  fore: [ForeLeg, ForeLeg];
  neckBase: Vec;
  head: Vec;
  headPitch: number;
  headYaw: number;
  headTilt: number;
  earN: number;
  earF: number;
  eyeOpen: number;
  jaw: number;
  pupil: number;
  tail: Vec[];
  tailFront: boolean;
  shadow: number;
  airborne: boolean;
}

interface Step {
  from: Vec;
  fromAng: number;
  fromCurl: number;
  t: number;
  dur: number;
  lift: number;
}
interface FootState extends FootPose {
  step: Step | null;
}

interface Jump {
  phase: 'prep' | 'launch' | 'flight' | 'land';
  t: number;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  H: number; // px
  T: number; // s
  prep: number;
  wiggle: boolean;
  then: Posture;
  onLand?: () => void;
}

interface ActionState {
  name: ActionName;
  t: number;
  delay: number;
  dur: number;
  onDone?: () => void;
}

export interface WalkOptions {
  speed?: number; // rig units / s (see GAIT_SPEED)
  stealth?: boolean;
  onArrive?: () => void;
}

export interface JumpOptions {
  wiggle?: boolean;
  fastPrep?: boolean;
  instantLaunch?: boolean;
  then?: Posture;
  onLand?: () => void;
}

const approach = (cur: number, target: number, maxDelta: number) =>
  cur < target ? Math.min(target, cur + maxDelta) : Math.max(target, cur - maxDelta);

export class CatSim {
  // World state
  x = 0;
  y = 0;
  scale = 0.75;
  facing: 1 | -1 = 1;
  flip = 1;
  vx = 0;
  timeScale = 1;
  time = 0;
  posture: Posture = 'stand';
  /** Pixels of ground available around the cat (used by the brain, informative only). */

  private moveTarget: number | null = null;
  private moveSpeed = GAIT_SPEED.walk;
  private stealth = false;
  private onArrive: (() => void) | null = null;
  private moveDelay = 0;
  private phase = 0;
  private gaitW = 0;
  private dashW = 0;
  private gait: GaitDef = blendGait(0, false);
  private prevVx = 0;
  private accel = v(0, 0);
  private prevAirVel = v(0, 0);

  private action: ActionState | null = null;
  private turn: { t: number; dur: number; from: 1 | -1; to: 1 | -1; then?: () => void } | null = null;
  private jump: Jump | null = null;
  private pendingJump: { x: number; y: number; opts: JumpOptions } | null = null;

  private body: BodyPose;
  private feet: FootState[];
  private tailA: number[] = [];
  private tailW: number[] = [];
  private look: Vec | null = null;
  private pupil = 0;

  private blinkT = -1;
  private nextBlink = 2;
  private earTwitch: { ear: 0 | 1; t: number } | null = null;
  private nextEar = 4;
  private rng: () => number;

  frame!: CatFrame;

  constructor(opts: { x?: number; y?: number; scale?: number; facing?: 1 | -1; posture?: Posture; seed?: number } = {}) {
    this.rng = makeRng(opts.seed ?? 7);
    this.scale = opts.scale ?? 0.75;
    const p = posePreset(opts.posture ?? 'stand');
    this.body = cloneBody(p.body);
    this.feet = p.feet.map((f) => ({ ...f, step: null }));
    this.teleport(opts.x ?? 0, opts.y ?? 0, opts.facing ?? 1, opts.posture ?? 'stand');
  }

  // ───────────────────────────── Commands ─────────────────────────────

  teleport(x: number, y: number, facing: 1 | -1 = this.facing, posture: Posture = this.posture) {
    this.x = x;
    this.y = y;
    this.facing = facing;
    this.flip = facing;
    this.vx = 0;
    this.prevVx = 0;
    this.posture = posture;
    this.moveTarget = null;
    this.onArrive = null;
    this.action = null;
    this.turn = null;
    this.jump = null;
    this.pendingJump = null;
    const p = posePreset(posture);
    this.body = cloneBody(p.body);
    this.feet = p.feet.map((f) => ({ ...f, step: null }));
    this.tailA = [];
    this.tailW = [];
    const base = Math.PI - p.body.tailBase;
    for (let i = 0; i < DIM.tailN; i++) {
      this.tailA.push(base - (i === 0 ? 0 : p.body.tailCurl * i));
      this.tailW.push(0);
    }
    this.update(0);
  }

  setPosture(p: Posture) {
    this.posture = p;
  }

  walkTo(x: number, opts: WalkOptions = {}) {
    if (this.jump) return;
    this.moveTarget = x;
    this.moveSpeed = opts.speed ?? GAIT_SPEED.walk;
    this.stealth = !!opts.stealth;
    this.onArrive = opts.onArrive ?? null;
    if (this.action) this.cancelAction();
    const wanted: Posture = this.stealth ? 'crouch' : 'stand';
    if (this.posture !== wanted) {
      const slow = this.posture === 'loaf' || this.posture === 'sleep' || this.posture === 'sit';
      if (this.posture !== 'stand' && this.posture !== 'crouch') this.moveDelay = slow ? 0.45 : 0.25;
      this.posture = wanted;
    }
  }

  stopMoving() {
    this.moveTarget = null;
    this.onArrive = null;
  }

  jumpTo(x: number, y: number, opts: JumpOptions = {}) {
    if (this.jump) return;
    this.moveTarget = null;
    this.onArrive = null;
    if (this.action) this.cancelAction();
    const dir: 1 | -1 = x >= this.x ? 1 : -1;
    if (dir !== this.facing && Math.abs(x - this.x) > 4) {
      if (opts.fastPrep || opts.instantLaunch) {
        this.facing = dir;
        this.flip = dir;
      } else {
        this.pendingJump = { x, y, opts };
        this.startTurn(dir);
        return;
      }
    }
    const dPx = Math.hypot(x - this.x, y - this.y);
    const up = this.y - y; // px, positive when target is higher
    let H = clamp(0.35 * dPx, 24, 95);
    if (up > 0) H = Math.max(H, up / 2 + 26);
    const T = clamp(0.28 + 0.0009 * dPx + Math.max(0, up) * 0.0006, 0.36, 0.78);
    const fromLow = this.posture === 'loaf' || this.posture === 'sleep' || this.posture === 'sit';
    const basePrep = opts.instantLaunch ? 0.01 : opts.fastPrep ? 0.14 : fromLow ? 0.55 : 0.32;
    this.jump = {
      phase: 'prep',
      t: 0,
      x0: this.x,
      y0: this.y,
      x1: x,
      y1: y,
      H,
      T,
      prep: basePrep + (opts.wiggle ? 0.75 : 0),
      wiggle: !!opts.wiggle,
      then: opts.then ?? 'stand',
      onLand: opts.onLand,
    };
    this.posture = 'crouch';
  }

  play(name: ActionName, onDone?: () => void): boolean {
    if (this.jump || this.moveTarget !== null || this.turn) return false;
    const def = ACTIONS[name];
    let delay = 0;
    if (def.needs && !def.needs.includes(this.posture)) {
      this.posture = def.enter ?? def.needs[0];
      delay = 0.16;
    }
    this.action = { name, t: 0, delay, dur: def.dur, onDone };
    return true;
  }

  face(dir: 1 | -1, then?: () => void) {
    if (dir === this.facing || this.jump) {
      then?.();
      return;
    }
    this.startTurn(dir, then);
  }

  lookAt(p: Vec | null) {
    this.look = p;
  }

  get isMoving() {
    return this.moveTarget !== null || Math.abs(this.vx) > 1;
  }
  get isAirborne() {
    return !!this.jump && (this.jump.phase === 'flight' || this.jump.phase === 'launch');
  }
  get isJumping() {
    return !!this.jump || !!this.pendingJump;
  }
  get isActing() {
    return !!this.action;
  }
  get isTurning() {
    return !!this.turn;
  }
  get isIdle() {
    return !this.isMoving && !this.isJumping && !this.action && !this.turn;
  }
  get currentAction(): ActionName | null {
    return this.action?.name ?? null;
  }

  private cancelAction() {
    this.action = null;
  }

  private startTurn(to: 1 | -1, then?: () => void) {
    this.turn = { t: 0, dur: 0.28, from: this.facing, to, then };
  }

  // ───────────────────────────── Update ─────────────────────────────

  update(rawDt: number) {
    const dt = Math.min(rawDt, 0.05) * this.timeScale;
    this.time += dt;
    const sc = this.scale;

    // ── Turn ──
    if (this.turn) {
      const tr = this.turn;
      tr.t += dt;
      const s = clamp(tr.t / tr.dur, 0, 1);
      const c = Math.cos(Math.PI * easeInOut(s));
      this.flip = (s < 0.5 ? tr.from : tr.to) * Math.max(0.1, Math.abs(c));
      this.vx = approach(this.vx, 0, 1200 * sc * dt);
      if (s >= 1) {
        this.facing = tr.to;
        this.flip = tr.to;
        this.turn = null;
        tr.then?.();
        if (this.pendingJump) {
          const pj = this.pendingJump;
          this.pendingJump = null;
          this.jumpTo(pj.x, pj.y, pj.opts);
        }
      }
    }

    // ── Locomotion ──
    if (this.moveDelay > 0) this.moveDelay -= dt;
    if (this.moveTarget !== null && !this.jump && !this.turn && this.moveDelay <= 0) {
      const dx = this.moveTarget - this.x;
      const dir: 1 | -1 = dx >= 0 ? 1 : -1;
      if (Math.abs(dx) > 1.5 && dir !== this.facing) {
        if (Math.abs(this.vx) < 30 * sc) this.startTurn(dir);
        else this.vx = approach(this.vx, 0, 900 * sc * dt);
      } else {
        const maxV = this.moveSpeed * sc;
        const decel = 520 * sc;
        const desired = dir * Math.min(maxV, Math.sqrt(2 * decel * Math.abs(dx)));
        this.vx = approach(this.vx, desired, 700 * sc * dt);
        const nx = this.x + this.vx * dt;
        if (Math.abs(dx) < 0.8 || Math.sign(this.moveTarget - nx) !== Math.sign(dx)) {
          this.x = this.moveTarget;
          this.vx = 0;
          this.moveTarget = null;
          const cb = this.onArrive;
          this.onArrive = null;
          cb?.();
        }
      }
    } else if (!this.jump || this.jump.phase === 'prep') {
      this.vx = approach(this.vx, 0, 900 * sc * dt);
    }
    if (!this.jump || this.jump.phase === 'prep' || this.jump.phase === 'land') {
      this.x += this.vx * dt;
    }
    const speedU = Math.abs(this.vx) / sc;
    this.gait = blendGait(speedU, this.stealth);
    this.phase = wrap01(this.phase + (speedU * dt) / this.gait.stride);
    const gaitActive = speedU > 1.5 && !this.jump;
    this.gaitW = damp(this.gaitW, gaitActive ? 1 : 0, 8, dt);
    this.dashW = damp(this.dashW, invLerp(GAIT_SPEED.trot * 1.05, GAIT_SPEED.dash, speedU), 6, dt);
    if (dt > 0) {
      this.accel = v((this.vx - this.prevVx) / dt / sc, 0);
      this.prevVx = this.vx;
    }

    // ── Jump state machine ──
    const j = this.jump;
    let airborne = false;
    let flightS = 0;
    if (j) {
      j.t += dt;
      if (j.phase === 'prep' && j.t >= j.prep) {
        j.phase = 'launch';
        j.t = 0;
      } else if (j.phase === 'launch' && j.t >= 0.09) {
        j.phase = 'flight';
        j.t = 0;
      } else if (j.phase === 'flight') {
        flightS = clamp(j.t / j.T, 0, 1);
        const px = lerp(j.x0, j.x1, flightS);
        const py = lerp(j.y0, j.y1, flightS) - 4 * j.H * flightS * (1 - flightS);
        if (dt > 0) {
          const vel = v((px - this.x) / dt / sc, (py - this.y) / dt / sc);
          this.accel = v((vel.x - this.prevAirVel.x) / dt, (vel.y - this.prevAirVel.y) / dt);
          this.prevAirVel = vel;
        }
        this.x = px;
        this.y = py;
        airborne = true;
        if (flightS >= 1) {
          j.phase = 'land';
          j.t = 0;
          this.x = j.x1;
          this.y = j.y1;
          this.posture = j.then;
          for (const f of this.feet) {
            f.planted = false;
            f.step = null;
          }
          this.accel = v(0, 900);
          j.onLand?.();
        }
      } else if (j.phase === 'land' && j.t >= 0.28) {
        this.jump = null;
      }
      if (j.phase === 'launch') airborne = true;
    }

    // ── Action timing ──
    const act = this.action;
    let actT = -1;
    if (act) {
      if (act.delay > 0) act.delay -= dt;
      else {
        act.t += dt;
        actT = act.t;
        if (act.t >= act.dur) {
          this.action = null;
          act.onDone?.();
        }
      }
    }

    // ── Target pose ──
    const effPosture: Posture = this.posture;
    const preset = posePreset(effPosture);
    const tb = cloneBody(preset.body);
    const ft: FootPose[] = preset.feet.map((f) => ({ ...f }));

    // Locomotion flavour
    if (this.gaitW > 0.001) {
      const w = this.gaitW;
      const stealthy = this.stealth;
      tb.tailBase = lerp(tb.tailBase, stealthy ? -0.12 : lerp(1.2, 0.25, this.dashW), w);
      tb.tailCurl = lerp(tb.tailCurl, stealthy ? 0 : 0.015, w);
      tb.tailTip = lerp(tb.tailTip, stealthy ? 0.12 : lerp(0.42, 0.05, this.dashW), w);
      tb.tailAmp = lerp(tb.tailAmp, 0.05, w);
      tb.tailFreq = lerp(tb.tailFreq, 0.6, w);
      tb.neckAng = lerp(tb.neckAng, stealthy ? -0.12 : lerp(-0.62, -0.32, this.dashW), w);
      tb.headPitch = lerp(tb.headPitch, stealthy ? 0.18 : 0.12, w);
      tb.earN = lerp(tb.earN, lerp(0.05, -0.35, this.dashW), w);
      tb.earF = tb.earN;
    }

    // Jump poses
    let bodyRate = 7;
    let feetAirRate = 15;
    if (j) {
      const toTarget = Math.atan2(j.y1 - j.y0, Math.abs(j.x1 - j.x0) + 1);
      if (j.phase === 'prep') {
        bodyRate = 10;
        tb.hip.y = -37;
        tb.sh.y = -31;
        tb.neckAng = clamp(-0.2 + toTarget * 0.6, -1.2, 0.5);
        tb.headPitch = clamp(toTarget * 0.6, -0.6, 0.6);
        tb.earN = tb.earF = 0.2;
        tb.tailBase = -0.2;
        tb.tailTip = 0.1;
        tb.tailAmp = 0.02;
      } else if (j.phase === 'launch') {
        bodyRate = 32;
        tb.hip = v(-42, -60);
        tb.sh = v(52, -70 + toTarget * 25);
        tb.arch = -3;
        tb.neckAng = -0.4 + toTarget * 0.4;
        tb.earN = tb.earF = -0.4;
        ft[NF] = { x: tb.sh.x + 16, y: -34, ang: -0.6, curl: 0.5, planted: false };
        ft[FF] = { x: tb.sh.x + 10, y: -30, ang: -0.6, curl: 0.5, planted: false };
      } else if (j.phase === 'flight') {
        bodyRate = 13;
        const s = flightS;
        const late = smoothstep((s - 0.45) / 0.3);
        const dyds = j.y1 - j.y0 - 4 * j.H * (1 - 2 * s);
        const pitch = clamp(Math.atan2(dyds, Math.abs(j.x1 - j.x0) + 30) * 0.5, -0.45, 0.45);
        tb.hip = v(-52, -52);
        tb.sh = v(52, -56);
        tb.arch = lerp(-5, 2, late);
        tb.neckAng = lerp(-0.35, -0.05, late);
        tb.headPitch = lerp(0.05, 0.45, late);
        tb.earN = tb.earF = -0.55;
        tb.tailBase = 0.12 - pitch * 0.5;
        tb.tailCurl = 0;
        tb.tailTip = 0.08;
        tb.tailAmp = 0;
        const fN: FootPose = {
          x: lerp(tb.sh.x + 30, tb.sh.x + 14, late),
          y: lerp(-34, -8, late),
          ang: lerp(-0.3, 0.35, late),
          curl: lerp(0.4, 0.05, late),
          planted: false,
        };
        const fF: FootPose = { ...fN, x: fN.x + 6, y: fN.y - 3 };
        const hN: FootPose = {
          x: lerp(tb.hip.x - 32, tb.hip.x - 6, late),
          y: lerp(-28, -18, late),
          ang: lerp(1.45, 0.9, late),
          curl: lerp(0.9, 0.3, late),
          planted: false,
        };
        const hF: FootPose = { ...hN, x: hN.x + 5, y: hN.y - 3 };
        const pivot = v(0, -45);
        const rp = (p: Vec) => add(pivot, rot(sub(p, pivot), pitch));
        tb.hip = rp(tb.hip);
        tb.sh = rp(tb.sh);
        const feetAir = [hN, fN, hF, fF];
        for (let i = 0; i < 4; i++) {
          const p = rp(v(feetAir[i].x, feetAir[i].y));
          ft[i] = { ...feetAir[i], x: p.x, y: p.y };
        }
        feetAirRate = 16;
      } else if (j.phase === 'land') {
        bodyRate = 18;
      }
    }

    // Actions (target layer)
    let additiveHipX = 0;
    let additiveHipY = 0;
    let additivePitch = 0;
    let tailTipAdd = 0;
    if (act && actT >= 0) {
      const t = actT;
      const k = windowed(t, 0, act.dur, 0.35);
      switch (act.name) {
        case 'yawn': {
          const open = smoothstep((t - 0.2) / 0.5) * smoothstep((1.9 - t) / 0.45);
          tb.neckAng -= 0.28 * open;
          tb.headPitch = lerp(tb.headPitch, -0.55, open);
          tb.jaw = open;
          tb.eyeOpen = lerp(tb.eyeOpen, 0.05, open);
          tb.earN = tb.earF = -0.7 * open;
          break;
        }
        case 'sniff': {
          tb.neckAng = lerp(tb.neckAng, 0.62, k);
          tb.neckLen += 2 * k;
          tb.headPitch = lerp(tb.headPitch, 0.62, k);
          tb.earN = tb.earF = 0.18 * k;
          additivePitch = 0.05 * Math.sin(Math.PI * 2 * 7 * t) * windowed(t, 0.4, 1.7, 0.1);
          break;
        }
        case 'wiggle': {
          const w = windowed(t, 0, act.dur, 0.15);
          additiveHipX = 3.5 * Math.sin(Math.PI * 2 * 5.5 * t) * w;
          additiveHipY = -3 * w;
          tailTipAdd = 0.5 * Math.sin(Math.PI * 2 * 6 * t) * w;
          tb.earN = tb.earF = 0.25;
          break;
        }
        case 'tailFlick': {
          tailTipAdd = 0.9 * bump(t / act.dur);
          break;
        }
        case 'lookAround': {
          const u = t / act.dur;
          tb.neckAng += 0.22 * Math.sin(Math.PI * 2 * u) * k;
          tb.headPitch += (-0.35 * bump(u * 2) + 0.25 * bump(u * 2 - 1)) * k;
          tb.earN += 0.2 * Math.sin(Math.PI * 4 * u) * k;
          break;
        }
        case 'lookFront': {
          const turn = windowed(t, 0.08, act.dur - 0.08, 0.42);
          tb.headYaw = turn;
          tb.headPitch = lerp(tb.headPitch, 0.04, turn);
          tb.headTilt = 0.16 * Math.sin(Math.PI * 1.6 * (t / act.dur)) * turn;
          tb.earN = 0.14 * turn;
          tb.earF = 0.14 * turn;
          // Cute slow blink in the middle of looking at the viewer
          const midBlink = bump((t - 1.15) / 0.24);
          tb.eyeOpen = lerp(tb.eyeOpen, 0.1, midBlink);
          tailTipAdd = 0.35 * Math.sin(Math.PI * 2 * (t / act.dur)) * turn;
          break;
        }
        case 'swipe': {
          const raise = smoothstep(t / 0.28);
          const strike = smoothstep((t - 0.3) / 0.1);
          const back = smoothstep((t - 0.52) / 0.2);
          const sh = tb.sh;
          const up = v(sh.x + 8, sh.y - 4);
          const hit = v(sh.x + 36, -9);
          const rest = v(ft[NF].x, ft[NF].y);
          let p = lerpV(rest, up, raise);
          p = lerpV(p, hit, strike);
          p = lerpV(p, rest, back);
          const free = back < 0.98;
          ft[NF] = {
            x: p.x,
            y: p.y,
            ang: lerp(lerp(0.2, -0.9, raise), 1.1, strike * (1 - back)),
            curl: lerp(0.6 * raise, -0.25, strike * (1 - back)),
            planted: !free,
          };
          tb.headPitch += 0.2 * raise * (1 - back);
          tb.earN = tb.earF = 0.3 * (1 - back);
          additiveHipX = -2 * strike * (1 - back);
          tailTipAdd = 0.6 * strike * (1 - back);
          break;
        }
        case 'groom': {
          const raise = smoothstep(t / 0.4) * smoothstep((act.dur - t) / 0.4);
          const lick = windowed(t, 0.4, 2.1, 0.1);
          const wash = windowed(t, 2.1, 3.2, 0.1);
          tb.headPitch = lerp(tb.headPitch, 0.5, raise) + 0.25 * wash * (0.5 - 0.5 * Math.cos(Math.PI * 4 * ((t - 2.1) / 1.1)));
          tb.neckAng = lerp(tb.neckAng, -1.05, raise);
          tb.jaw = lick * (0.16 + 0.14 * Math.sin(Math.PI * 2 * 4.2 * t));
          tb.eyeOpen = lerp(tb.eyeOpen, 0.35, raise);
          // Paw target relative to the (current, smoothed) head
          const cur = this.body;
          const pitchNow = Math.atan2(cur.sh.y - cur.hip.y, cur.sh.x - cur.hip.x);
          const nb = add(cur.sh, rot(v(-1, -13), pitchNow));
          const head = add(nb, fromAngle(cur.neckAng, cur.neckLen));
          const hp = cur.headPitch;
          const mouth = add(head, rot(v(12, 10), hp));
          const lickP = add(mouth, v(2, 5 + 1.6 * Math.sin(Math.PI * 2 * 4.2 * t)));
          const wu = clamp((t - 2.1) / 1.1, 0, 1);
          const ww = 0.5 - 0.5 * Math.cos(Math.PI * 4 * wu);
          const washP = lerpV(add(head, rot(v(14, 6), hp)), add(head, rot(v(-1, -11), hp)), ww);
          const target = wash > lick ? washP : lickP;
          const rest = v(ft[NF].x, ft[NF].y);
          const p = lerpV(rest, target, raise);
          ft[NF] = {
            x: p.x,
            y: p.y,
            ang: lerp(0.1, wash > lick ? -2.2 : -2.5, raise),
            curl: lerp(0.04, 0.9, raise),
            planted: raise < 0.04,
          };
          break;
        }
      }
    }

    // Look at
    if (this.look && (!act || act.name === 'sniff' || act.name === 'tailFlick') && !airborne) {
      const f = this.frame;
      const hx = this.x + this.flip * (f ? f.head.x : 40) * sc;
      const hy = this.y + (f ? f.head.y : -70) * sc;
      const dx = (this.look.x - hx) * this.facing;
      const dy = this.look.y - hy;
      if (dx > -30) {
        const ang = Math.atan2(dy, Math.max(dx, 25));
        tb.headPitch += clamp(ang * 0.55, -0.6, 0.6);
        tb.neckAng += clamp(ang * 0.32, -0.35, 0.35);
        this.pupil = damp(this.pupil, clamp(ang, -1, 1), 10, dt);
      } else {
        this.pupil = damp(this.pupil, 0, 6, dt);
      }
    } else {
      this.pupil = damp(this.pupil, 0, 6, dt);
    }

    // ── Smooth body ──
    const b = this.body;
    b.hip = dampV(b.hip, tb.hip, bodyRate, dt);
    b.sh = dampV(b.sh, tb.sh, bodyRate, dt);
    b.arch = damp(b.arch, tb.arch, bodyRate, dt);
    b.neckAng = damp(b.neckAng, tb.neckAng, bodyRate + 2, dt);
    b.neckLen = damp(b.neckLen, tb.neckLen, bodyRate, dt);
    b.headPitch = damp(b.headPitch, tb.headPitch, 9, dt);
    b.headYaw = damp(b.headYaw, tb.headYaw, 10, dt);
    b.headTilt = damp(b.headTilt, tb.headTilt, 10, dt);
    b.earN = damp(b.earN, tb.earN, 12, dt);
    b.earF = damp(b.earF, tb.earF, 11, dt);
    b.eyeOpen = damp(b.eyeOpen, tb.eyeOpen, 14, dt);
    b.jaw = damp(b.jaw, tb.jaw, 16, dt);
    b.tailBase = damp(b.tailBase, tb.tailBase, 4, dt);
    b.tailCurl = damp(b.tailCurl, tb.tailCurl, 4, dt);
    b.tailTip = damp(b.tailTip, tb.tailTip, 4, dt);
    b.tailAmp = damp(b.tailAmp, tb.tailAmp, 3, dt);
    b.tailFreq = damp(b.tailFreq, tb.tailFreq, 3, dt);
    b.tailFront = tb.tailFront;
    b.breath = damp(b.breath, tb.breath, 2, dt);
    b.breathRate = damp(b.breathRate, tb.breathRate, 2, dt);

    // ── Procedural additive layer ──
    const out = cloneBody(b);
    const ph = this.phase * Math.PI * 2;
    const gw = this.gaitW;
    const bobAmp = lerp(1.0, 2.2, this.dashW) * (this.stealth ? 0.6 : 1);
    const hipBob = gw * bobAmp * Math.sin(2 * ph + 0.4);
    const shBob = gw * bobAmp * Math.sin(2 * ph + 0.4 + Math.PI / 2);
    out.hip.y += hipBob + additiveHipY;
    out.sh.y += shBob;
    out.hip.x += additiveHipX;
    if (this.dashW > 0.01) {
      const fl = Math.sin(ph) * this.dashW;
      out.hip.x += 9 * fl;
      out.sh.x -= 9 * fl;
      out.arch += 9 * Math.cos(ph) * this.dashW;
      out.hip.y -= 3 * this.dashW;
      out.sh.y -= 3 * this.dashW;
    }
    if (j && j.phase === 'land') {
      const c = bump(clamp(j.t / 0.28, 0, 1)) * (1 - j.t / 0.5);
      out.hip.y += 8 * c;
      out.sh.y += 12 * c;
      out.neckAng += 0.15 * c;
    }
    out.headPitch += additivePitch;
    out.tailTip += tailTipAdd;

    // Blink & ear twitch
    if (this.time > this.nextBlink && this.blinkT < 0) this.blinkT = 0;
    let blink = 1;
    if (this.blinkT >= 0) {
      this.blinkT += dt;
      blink = 1 - bump(this.blinkT / 0.16);
      if (this.blinkT > 0.16) {
        this.blinkT = -1;
        this.nextBlink = this.time + (this.rng() < 0.15 ? 0.25 : 2.5 + this.rng() * 4.5);
      }
    }
    out.eyeOpen *= blink;
    if (this.time > this.nextEar && !this.earTwitch) this.earTwitch = { ear: this.rng() < 0.5 ? 0 : 1, t: 0 };
    if (this.earTwitch) {
      this.earTwitch.t += dt;
      const e = -0.6 * bump(this.earTwitch.t / 0.22);
      if (this.earTwitch.ear === 0) out.earN += e;
      else out.earF += e;
      if (this.earTwitch.t > 0.22) {
        this.earTwitch = null;
        this.nextEar = this.time + 3 + this.rng() * 6;
      }
    }

    // ── Feet ──
    const g = this.gait;
    let scap = 0.3;
    if (gaitActive) {
      const reach = (g.stride * g.duty) / 2;
      for (let i = 0; i < 4; i++) {
        const hind = isHind(i);
        const anchor = hind ? b.hip.x + (i === 0 ? 4 : -2) : b.sh.x + (i === NF ? 4 : 9);
        const p = wrap01(this.phase + g.offsets[i]);
        const target: FootPose = { x: 0, y: DIM.pawY, ang: 0, curl: 0.04, planted: true };
        if (p < g.duty) {
          const s = p / g.duty;
          target.x = anchor + reach * (1 - 2 * s);
          target.ang = hind ? lerp(0.25, 0.7, s * s) : lerp(0.32, 0.0, s) - 0.35 * smoothstep((s - 0.8) / 0.2);
          if (i === NF) scap = bump(s);
        } else {
          const s = (p - g.duty) / (1 - g.duty);
          const lift = Math.pow(bump(s), 0.7);
          target.x = anchor - reach + 2 * reach * easeInOut(s);
          target.y = DIM.pawY - g.lift * lift;
          target.ang = hind ? 0.7 + 0.55 * lift : -1.1 * lift + 0.3 * smoothstep((s - 0.7) / 0.3);
          target.curl = 0.9 * lift;
          target.planted = false;
        }
        const fs = this.feet[i];
        fs.step = null;
        fs.x = damp(fs.x, target.x, 34, dt);
        fs.y = damp(fs.y, target.y, 34, dt);
        fs.ang = damp(fs.ang, target.ang, 30, dt);
        fs.curl = damp(fs.curl, target.curl, 30, dt);
        fs.planted = target.planted;
      }
    } else if (airborne) {
      for (let i = 0; i < 4; i++) {
        const fs = this.feet[i];
        const t = ft[i];
        fs.step = null;
        fs.planted = false;
        fs.x = damp(fs.x, t.x, feetAirRate, dt);
        fs.y = damp(fs.y, t.y, feetAirRate, dt);
        fs.ang = damp(fs.ang, t.ang, feetAirRate, dt);
        fs.curl = damp(fs.curl, t.curl, feetAirRate, dt);
      }
      // During launch the hind feet stay planted (they push off)
      if (j && j.phase === 'launch') {
        for (const i of [0, 2]) {
          const fs = this.feet[i];
          fs.y = DIM.pawY;
          fs.planted = true;
          fs.ang = damp(fs.ang, 1.0, 20, dt);
        }
      }
    } else {
      const landing = !!j && j.phase === 'land';
      const order = [0, 1, 2, 3].sort((a, c) => {
        if (landing) return (isHind(a) ? 1 : 0) - (isHind(c) ? 1 : 0);
        return dist(this.feet[c], ft[c]) - dist(this.feet[a], ft[a]);
      });
      for (const i of order) {
        const fs = this.feet[i];
        const t = ft[i];
        if (!t.planted) {
          fs.step = null;
          fs.planted = false;
          fs.x = damp(fs.x, t.x, 13, dt);
          fs.y = damp(fs.y, t.y, 13, dt);
          fs.ang = damp(fs.ang, t.ang, 13, dt);
          fs.curl = damp(fs.curl, t.curl, 13, dt);
          continue;
        }
        if (fs.step) {
          const st = fs.step;
          st.t += dt;
          const s = clamp(st.t / st.dur, 0, 1);
          const e = easeInOut(s);
          fs.x = lerp(st.from.x, t.x, e);
          fs.y = lerp(st.from.y, t.y, e) - st.lift * bump(s);
          fs.ang = lerp(st.fromAng, t.ang, e) + (isHind(i) ? 0.5 : -0.9) * bump(s) * (st.lift > 0 ? 1 : 0);
          fs.curl = lerp(st.fromCurl, t.curl, e) + 0.7 * bump(s) * (st.lift > 0 ? 1 : 0);
          if (s >= 1) {
            fs.step = null;
            fs.planted = true;
          }
          continue;
        }
        const err = dist(fs, t);
        const girdleBusy = this.feet.some((o, k) => k !== i && isHind(k) === isHind(i) && o.step);
        const holdHind = landing && isHind(i) && j!.t < 0.07;
        if ((!fs.planted || err > 5) && !girdleBusy && !holdHind) {
          const onGround = fs.y > DIM.pawY - 1.5 && fs.planted;
          fs.step = {
            from: v(fs.x, fs.y),
            fromAng: fs.ang,
            fromCurl: fs.curl,
            t: 0,
            dur: onGround ? 0.11 + 0.0025 * err : landing ? 0.07 : 0.12,
            lift: onGround ? Math.min(9, 2 + 0.25 * err) : 0,
          };
        } else if (fs.planted) {
          // tiny settling corrections and angle changes (posture shifts)
          fs.x = damp(fs.x, t.x, 2.5, dt);
          fs.y = damp(fs.y, t.y, 12, dt);
          fs.ang = damp(fs.ang, t.ang, 8, dt);
          fs.curl = damp(fs.curl, t.curl, 8, dt);
        }
      }
    }

    // ── Tail physics (local space) ──
    const pitch = Math.atan2(out.sh.y - out.hip.y, out.sh.x - out.hip.x);
    const tailBasePt = add(out.hip, rot(v(-13, -8), pitch));
    const N = DIM.tailN;
    const steps = dt > 1 / 70 ? 2 : 1;
    const h = dt / steps;
    for (let sIdx = 0; sIdx < steps && h > 0; sIdx++) {
      for (let i = 0; i < N; i++) {
        const u = i / (N - 1);
        const tipW = smoothstep((u - 0.55) / 0.45);
        const rel =
          i === 0
            ? 0
            : out.tailCurl +
              out.tailTip * tipW +
              out.tailAmp * Math.sin(Math.PI * 2 * out.tailFreq * this.time - i * 0.55) * (0.3 + u);
        const target = i === 0 ? Math.PI - out.tailBase + pitch * 0.5 : this.tailA[i - 1] + rel;
        let diff = target - this.tailA[i];
        diff = Math.atan2(Math.sin(diff), Math.cos(diff));
        const k = lerp(240, 70, u);
        const c = 2 * Math.sqrt(k) * 0.6;
        const dir = fromAngle(this.tailA[i]);
        const torque = (dir.x * -this.accel.y - dir.y * -this.accel.x) * 0.004 * (0.3 + u);
        const acc = k * diff - c * this.tailW[i] + torque;
        this.tailW[i] += acc * h;
        this.tailA[i] += this.tailW[i] * h;
      }
    }
    const tail: Vec[] = [tailBasePt];
    for (let i = 0; i < N; i++) {
      const p = add(tail[i], fromAngle(this.tailA[i], DIM.tailSeg));
      if (!airborne && p.y > -3.2) p.y = -3.2;
      tail.push(p);
    }

    // ── Build frame ──
    const hind: HindLeg[] = [];
    const fore: ForeLeg[] = [];
    for (const i of [0, 2]) {
      const fs = this.feet[i];
      const ball = v(fs.x, fs.y);
      const md = v(Math.sin(fs.ang), Math.cos(fs.ang));
      const hockT = sub(ball, mul(md, DIM.meta));
      const ik = solveIK2(out.hip, hockT, DIM.femur, DIM.tibia, -1);
      const hock = ik.end;
      const ball2 = add(hock, mul(md, DIM.meta));
      hind.push({ root: out.hip, knee: ik.joint, hock, ball: ball2, toe: add(ball2, fromAngle(fs.curl, DIM.hindToe)) });
    }
    for (const i of [NF, FF]) {
      const fs = this.feet[i];
      const ball = v(fs.x, fs.y);
      const pd = v(Math.sin(fs.ang), Math.cos(fs.ang));
      const wristT = sub(ball, mul(pd, DIM.pastern));
      const ik = solveIK2(out.sh, wristT, DIM.humerus, DIM.radius, 1);
      const wrist = ik.end;
      const ball2 = add(wrist, mul(pd, DIM.pastern));
      const toeAng = fs.ang > 0 ? fs.curl : fs.curl + fs.ang * 0.6;
      fore.push({ root: out.sh, elbow: ik.joint, wrist, ball: ball2, toe: add(ball2, fromAngle(toeAng, DIM.foreToe)) });
    }
    const neckBase = add(out.sh, rot(v(-1, -13), pitch));
    const head = add(add(neckBase, fromAngle(out.neckAng, out.neckLen)), v(0, -shBob * 0.85));
    let shadow = 1;
    if (j && j.phase === 'flight') shadow = 0;
    else if (j && j.phase === 'launch') shadow = 0.5;

    this.frame = {
      x: this.x,
      y: this.y,
      scale: sc,
      flip: this.flip,
      hip: out.hip,
      sh: out.sh,
      arch: out.arch,
      pitch,
      breath: out.breath * Math.sin(Math.PI * 2 * out.breathRate * this.time),
      scapula: lerp(0.3, scap, gw),
      hind: hind as [HindLeg, HindLeg],
      fore: fore as [ForeLeg, ForeLeg],
      neckBase,
      head,
      headPitch: out.headPitch,
      headYaw: clamp(out.headYaw, 0, 1),
      headTilt: out.headTilt,
      earN: out.earN,
      earF: out.earF,
      eyeOpen: clamp(out.eyeOpen, 0, 1),
      jaw: clamp(out.jaw, 0, 1),
      pupil: this.pupil,
      tail,
      tailFront: out.tailFront > 0.5,
      shadow,
      airborne,
    };
  }
}
