/**
 * catPoses.ts
 * Skeleton dimensions and posture presets for the silhouette cat.
 * All values are in rig units (see catKinematics.ts for the coordinate system).
 */
import type { Vec } from './catKinematics';

export const DIM = {
  hipX: -47,
  shX: 47,
  femur: 25,
  tibia: 27,
  meta: 19,
  hindToe: 8.5,
  humerus: 24,
  radius: 26,
  pastern: 6,
  foreToe: 8.5,
  pawY: -3, // ball-of-foot height when planted
  tailSeg: 9.4,
  tailN: 10,
} as const;

/** Leg order everywhere: [nearHind, nearFore, farHind, farFore]. */
export const NH = 0;
export const NF = 1;
export const FH = 2;
export const FF = 3;
export const isHind = (i: number) => i === NH || i === FH;

export interface FootPose {
  x: number;
  y: number;
  /** hind: metatarsus angle from vertical (+ = hock behind ball). fore: pastern angle (+ = paw ahead of wrist, − = flexed). */
  ang: number;
  /** toe angle relative to horizontal-forward (+ = curled down). */
  curl: number;
  planted: boolean;
}

export interface BodyPose {
  hip: Vec;
  sh: Vec;
  arch: number;
  neckAng: number; // absolute local angle from neck base to head center (0 = forward, −π/2 = up)
  neckLen: number;
  headPitch: number; // + = nose down
  headYaw: number; // 0 = profile, 1 = looking straight at the viewer (front face)
  headTilt: number; // cute head roll when looking at the viewer
  earN: number; // + = forward, − = flattened back
  earF: number;
  eyeOpen: number;
  jaw: number;
  tailBase: number; // absolute: 0 = straight back, +π/2 = straight up, −π/2 = straight down
  tailCurl: number; // even curl per segment
  tailTip: number; // extra curl on the last 40 %
  tailAmp: number;
  tailFreq: number;
  tailFront: number; // 1 = draw tail in front of the body (wrapped)
  breath: number;
  breathRate: number;
}

export interface Pose {
  body: BodyPose;
  feet: [FootPose, FootPose, FootPose, FootPose];
}

export type Posture = 'stand' | 'sit' | 'crouch' | 'loaf' | 'sleep' | 'stretch';

const foot = (x: number, ang: number, planted = true, y: number = DIM.pawY, curl = 0.04): FootPose => ({
  x,
  y,
  ang,
  curl,
  planted,
});

const baseBody = (): BodyPose => ({
  hip: { x: DIM.hipX, y: -58 },
  sh: { x: DIM.shX, y: -56 },
  arch: 3,
  neckAng: -0.78,
  neckLen: 25,
  headPitch: 0.08,
  headYaw: 0,
  headTilt: 0,
  earN: 0,
  earF: 0,
  eyeOpen: 1,
  jaw: 0,
  tailBase: -0.95,
  tailCurl: 0.02,
  tailTip: 0.32,
  tailAmp: 0.05,
  tailFreq: 0.35,
  tailFront: 0,
  breath: 0.018,
  breathRate: 0.42,
});

export const posePreset = (p: Posture): Pose => {
  const b = baseBody();
  switch (p) {
    case 'stand': {
      return {
        body: b,
        feet: [
          foot(b.hip.x + 4, 0.32),
          foot(b.sh.x + 3, 0.18),
          foot(b.hip.x - 4, 0.32),
          foot(b.sh.x + 9, 0.18),
        ],
      };
    }
    case 'sit': {
      const body: BodyPose = {
        ...b,
        hip: { x: -34, y: -17 },
        sh: { x: 15, y: -55 },
        arch: 9,
        neckAng: -1.32,
        neckLen: 23,
        headPitch: 0.06,
        tailBase: -1.5,
        tailCurl: -0.17,
        tailTip: -0.12,
        tailAmp: 0.03,
        tailFreq: 0.25,
        tailFront: 1,
      };
      return {
        body,
        feet: [
          foot(body.hip.x + 19, 1.5),
          foot(body.sh.x + 2, 0.08),
          foot(body.hip.x + 15, 1.5),
          foot(body.sh.x + 8, 0.08),
        ],
      };
    }
    case 'crouch': {
      const body: BodyPose = {
        ...b,
        hip: { x: -46, y: -41 },
        sh: { x: 41, y: -34 },
        arch: -1,
        neckAng: -0.18,
        neckLen: 22,
        headPitch: 0.14,
        earN: 0.12,
        earF: 0.12,
        tailBase: -0.18,
        tailCurl: 0,
        tailTip: 0.12,
        tailAmp: 0.03,
        tailFreq: 0.5,
      };
      return {
        body,
        feet: [
          foot(body.hip.x + 7, 0.85),
          foot(body.sh.x + 3, 0.35),
          foot(body.hip.x + 1, 0.85),
          foot(body.sh.x + 9, 0.35),
        ],
      };
    }
    case 'loaf':
    case 'sleep': {
      const sleeping = p === 'sleep';
      const body: BodyPose = {
        ...b,
        hip: { x: -40, y: -21 },
        sh: { x: 33, y: -21 },
        arch: 10,
        neckAng: sleeping ? -0.42 : -0.95,
        neckLen: sleeping ? 15 : 19,
        headPitch: sleeping ? 0.34 : 0.1,
        earN: sleeping ? -0.25 : 0,
        earF: sleeping ? -0.25 : 0,
        eyeOpen: sleeping ? 0 : 0.85,
        tailBase: -0.22,
        tailCurl: -0.06,
        tailTip: 0.18,
        tailAmp: sleeping ? 0.008 : 0.02,
        tailFreq: 0.2,
        tailFront: 1,
        breath: sleeping ? 0.04 : 0.022,
        breathRate: sleeping ? 0.3 : 0.4,
      };
      return {
        body,
        feet: [
          foot(body.hip.x + 18, 1.5),
          foot(body.sh.x + 1, -1.55, false, DIM.pawY - 1, -0.1),
          foot(body.hip.x + 14, 1.5),
          foot(body.sh.x + 7, -1.55, false, DIM.pawY - 1, -0.1),
        ],
      };
    }
    case 'stretch': {
      const body: BodyPose = {
        ...b,
        hip: { x: -44, y: -60 },
        sh: { x: 44, y: -25 },
        arch: -11,
        neckAng: -0.4,
        neckLen: 22,
        headPitch: -0.12,
        tailBase: 1.1,
        tailCurl: 0.04,
        tailTip: 0.3,
      };
      return {
        body,
        feet: [
          foot(body.hip.x + 2, 0.25),
          foot(body.sh.x + 31, 1.25, true, DIM.pawY, 0),
          foot(body.hip.x - 4, 0.25),
          foot(body.sh.x + 25, 1.25, true, DIM.pawY, 0),
        ],
      };
    }
  }
};

export const cloneBody = (b: BodyPose): BodyPose => ({ ...b, hip: { ...b.hip }, sh: { ...b.sh } });
export const cloneFoot = (f: FootPose): FootPose => ({ ...f });
