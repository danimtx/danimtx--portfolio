/**
 * catBrain.ts
 * Autonomous state machine driving the silhouette cat across portfolio ledges.
 * - Lateral screen-edge jump entry: always leaps in from outside the left or right
 *   edge of the viewport (never popping out of blank white pixels).
 * - Normal scroll: continuous ledge-to-ledge jumps/walks (zero teleports).
 * - Fast scroll: waits ~1s after scroll settles, then leaps smoothly into view
 *   from the lateral edge (angled from above or below depending on scroll direction).
 * - Click interaction: cycles through all 8 animations with an active lock so the
 *   current animation always finishes even if clicked repeatedly.
 * - Frequent autonomous animations while perched, including `lookFront`.
 */
import { clamp, GAIT_SPEED } from './catKinematics';
import { CatSim, type ActionName } from './catSim';
import type { CatLedge, LedgeRegistry } from './useCatLedges';
import type { Posture } from './catPoses';

const CLICK_ACTIONS: ActionName[] = [
  'lookFront',
  'groom',
  'yawn',
  'swipe',
  'wiggle',
  'sniff',
  'tailFlick',
  'lookAround',
];

export class CatBrain {
  readonly sim: CatSim;
  currentLedge: CatLedge | null = null;
  targetLedge: CatLedge | null = null;
  darkSurface = false;

  private decisionCooldown = 0;
  private idleTimer = 0;
  private nextIdleActionIn = 0.9;
  private actionCycleIndex = 0;
  private stepVisitedIds = new Set<string>();

  private isClickBusy = false;
  private clickIndex = 0;

  private lastScrollY = 0;
  private scrollVelocity = 0;
  private catchUpState: { dir: 'above' | 'below'; timer: number } | null = null;

  constructor(sim: CatSim) {
    this.sim = sim;
  }

  /** Pick the best ledge inside the current viewport comfort band [15%, 82%]. */
  pickBestLedge(reg: LedgeRegistry, scrollY: number): CatLedge | null {
    const { ledges, viewportH } = reg;
    if (!ledges.length) return null;

    const bandTop = scrollY + viewportH * 0.15;
    const bandBot = scrollY + viewportH * 0.82;
    const idealY = scrollY + viewportH * 0.46;

    // If near the very bottom of the page, prefer the Cat Lab teaser ledge (or footer ledge)
    if (scrollY + viewportH >= reg.docHeight - 140) {
      const labLedge = ledges.find((l) => l.id === 'cat-lab-card');
      if (labLedge) return labLedge;
      const footerLedge = [...ledges].reverse().find((l) => l.behavior === 'sleep');
      if (footerLedge) return footerLedge;
    }

    const inBand = ledges.filter((l) => l.y >= bandTop && l.y <= bandBot);
    const pool = inBand.length > 0 ? inBand : ledges;

    let best = pool[0];
    let bestScore = Infinity;
    for (const l of pool) {
      const dy = Math.abs(l.y - idealY);
      const dx = Math.abs((l.xStart + l.xEnd) * 0.5 - this.sim.x) * 0.18;
      // Hysteresis bonus for staying on current ledge while it remains inside the comfort band
      const stayBonus = this.currentLedge?.id === l.id && inBand.includes(l) ? -155 : 0;
      const score = dy + dx + stayBonus;
      if (score < bestScore) {
        bestScore = score;
        best = l;
      }
    }
    return best;
  }

  /**
   * Called when the two Hero CTA buttons ("Trabajemos Juntos" / "Explorar Proyectos")
   * are no longer visible in the viewport.
   * - Normal scroll speed: cat immediately leaps in from the lateral edge of the screen
   *   onto the first ledge below the Hero.
   * - Fast scroll / jump: waits ~1s after scroll settles, then leaps in from the lateral edge.
   */
  enterFromHero(reg: LedgeRegistry, scrollY: number) {
    this.lastScrollY = scrollY;
    this.scrollVelocity = 0;
    this.isClickBusy = false;
    const triggerY = reg.home ? reg.home.ctaBottomY : 450;

    if (scrollY > triggerY + 420) {
      // User jumped or scrolled very fast far past the Hero -> use ~1s delayed catch-up entry
      this.currentLedge = null;
      this.targetLedge = null;
      this.catchUpState = { dir: 'above', timer: 0 };
      this.sim.teleport(-220, scrollY + 200, 1, 'crouch');
      return;
    }

    // Normal scroll past the Hero buttons -> leap in from outside the lateral edge of the screen
    this.catchUpState = null;
    const firstLedge = reg.ledges[0] ?? this.pickBestLedge(reg, scrollY);
    if (!firstLedge) return;

    this.launchFromLateralEdge(reg, firstLedge, 'normal');
  }

  /**
   * Launches the cat from completely outside the left or right lateral edge of the screen
   * onto `target`, so it never appears out of thin air / blank white pixels.
   */
  private launchFromLateralEdge(
    reg: LedgeRegistry,
    target: CatLedge,
    verticalAngle: 'normal' | 'above' | 'below',
  ) {
    const ledgeCenter = (target.xStart + target.xEnd) * 0.5;
    const fromLeft = ledgeCenter <= reg.viewportW * 0.54;
    const margin = Math.min(48, (target.xEnd - target.xStart) * 0.22);

    const landX = fromLeft
      ? clamp(target.xStart + 82, target.xStart + margin, target.xEnd - margin)
      : clamp(target.xEnd - 82, target.xStart + margin, target.xEnd - margin);
    const landY = target.y;

    // Start completely off-screen outside the left (-88px) or right (viewportW + 88px) border
    const entryX = fromLeft ? -88 : reg.viewportW + 88;
    const entryY =
      verticalAngle === 'above'
        ? landY - 95
        : verticalAngle === 'below'
          ? landY + 95
          : landY - 32;

    const facing: 1 | -1 = fromLeft ? 1 : -1;
    this.sim.teleport(entryX, entryY, facing, 'crouch');
    this.darkSurface = target.surface === 'dark';
    this.targetLedge = target;

    const arrivalPosture = this.postureForBehavior(target.behavior);
    this.sim.jumpTo(landX, landY, {
      wiggle: false,
      instantLaunch: true,
      then: arrivalPosture,
      onLand: () => {
        this.currentLedge = target;
        this.targetLedge = null;
        this.darkSurface = target.surface === 'dark';
        this.idleTimer = 0;
        this.nextIdleActionIn = 0.8 + Math.random() * 0.6;
        this.triggerSectionArrivalBehavior(target);
      },
    });
  }

  /**
   * Leaps smoothly into the current viewport from the lateral edge (angled from above or below)
   * onto a visible ledge after a fast scroll (~1s delay).
   */
  private performCatchUpEntry(reg: LedgeRegistry, scrollY: number, dir: 'above' | 'below') {
    const visible = reg.ledges.filter(
      (l) => l.y >= scrollY + 80 && l.y <= scrollY + reg.viewportH - 60,
    );
    let target: CatLedge | null = null;
    if (visible.length > 0) {
      target = dir === 'above' ? visible[0] : visible[visible.length - 1];
    } else {
      target = this.pickBestLedge(reg, scrollY) ?? reg.ledges[0] ?? null;
    }
    if (!target) return;

    this.launchFromLateralEdge(reg, target, dir);
  }

  /**
   * Moves or jumps continuously from current position toward `goal` without ever teleporting.
   * If `goal` is far away and an intermediate ledge exists along the way, hops to the
   * intermediate ledge first so the user sees the cat travel step-by-step.
   */
  stepTowardLedge(reg: LedgeRegistry, goal: CatLedge) {
    let target = goal;
    const totalDy = goal.y - this.sim.y;

    // If vertical gap is large (> 460px), look for an intermediate stepping-stone ledge
    if (Math.abs(totalDy) > 460) {
      const dir = Math.sign(totalDy);
      const candidates = reg.ledges.filter((l) => {
        const dy = (l.y - this.sim.y) * dir;
        return dy >= 110 && dy <= 450;
      });
      if (candidates.length > 0) {
        candidates.sort((a, b) => Math.abs(b.y - this.sim.y) - Math.abs(a.y - this.sim.y));
        target = candidates[0];
      }
    }

    const isIntermediate = target.id !== goal.id;
    this.moveToLedge(target, isIntermediate);
  }

  /** Move or jump from current position to a target ledge (zero teleports). */
  moveToLedge(target: CatLedge, isIntermediateStep = false) {
    const margin = Math.min(48, (target.xEnd - target.xStart) * 0.25);
    const landX = clamp(this.sim.x, target.xStart + margin, target.xEnd - margin);
    const landY = target.y;

    const arrivalPosture = isIntermediateStep
      ? 'crouch'
      : this.postureForBehavior(target.behavior);

    this.targetLedge = target;
    this.isClickBusy = false;

    const finishOnLedge = () => {
      this.currentLedge = target;
      this.targetLedge = null;
      this.darkSurface = target.surface === 'dark';
      this.idleTimer = 0;
      this.nextIdleActionIn = 0.85 + Math.random() * 0.75;
      if (isIntermediateStep) {
        this.decisionCooldown = 0.06;
      } else {
        this.triggerSectionArrivalBehavior(target);
      }
    };

    const dy = Math.abs(landY - this.sim.y);
    const dx = Math.abs(landX - this.sim.x);

    // Same horizontal ledge level -> walk/trot across
    if (!isIntermediateStep && dy < 14 && dx < 460) {
      this.currentLedge = target;
      this.darkSurface = target.surface === 'dark';
      const speed = dx > 220 ? GAIT_SPEED.trot : GAIT_SPEED.walk;
      this.sim.walkTo(landX, {
        speed,
        stealth: target.behavior === 'stalk',
        onArrive: () => {
          this.sim.setPosture(arrivalPosture);
          finishOnLedge();
        },
      });
      return;
    }

    // Continuous parabolic jump directly from current position to target ledge
    this.sim.jumpTo(landX, landY, {
      wiggle: false,
      fastPrep: true,
      then: arrivalPosture,
      onLand: finishOnLedge,
    });
  }

  private postureForBehavior(b: CatLedge['behavior']): Posture {
    switch (b) {
      case 'sleep':
        return 'sit';
      case 'stalk':
        return 'crouch';
      case 'sniff':
        return 'stand';
      case 'stepping':
        return 'sit';
      case 'alert':
      case 'curious':
      default:
        return 'sit';
    }
  }

  private triggerSectionArrivalBehavior(ledge: CatLedge) {
    if (this.isClickBusy) return;
    this.actionCycleIndex++;
    // Frequently look toward the viewer (`lookFront`) when stopping on a ledge to "read"
    if (this.actionCycleIndex % 2 === 1) {
      this.sim.play('lookFront', () => {
        if (ledge.behavior === 'stalk') this.sim.setPosture('crouch');
        else this.sim.setPosture('sit');
      });
      return;
    }

    switch (ledge.behavior) {
      case 'sniff':
        this.sim.play('sniff', () => this.sim.setPosture('sit'));
        break;
      case 'stalk':
        this.sim.setPosture('crouch');
        this.sim.play('wiggle');
        break;
      case 'curious':
        this.sim.play('lookFront');
        break;
      case 'stepping':
        this.sim.play('tailFlick');
        break;
      case 'sleep':
        this.sim.play('yawn', () => this.sim.setPosture('loaf'));
        break;
      case 'alert':
        this.sim.play('lookAround');
        break;
    }
  }

  /**
   * Click on the silhouette cat:
   * Strictly ignores clicks while a click animation or jump is already in progress,
   * ensuring the current animation always finishes completely before another can start.
   */
  handleCatClick() {
    if (this.isClickBusy || this.sim.isJumping || this.sim.isTurning) return;
    if (this.sim.isMoving) {
      this.sim.stopMoving();
    }

    const action = CLICK_ACTIONS[this.clickIndex % CLICK_ACTIONS.length];
    this.clickIndex += 1;
    this.isClickBusy = true;

    const started = this.sim.play(action, () => {
      this.isClickBusy = false;
      this.idleTimer = 0;
      this.nextIdleActionIn = 0.95 + Math.random() * 0.75;
    });

    if (!started) {
      this.isClickBusy = false;
    }
  }

  /** Triggered when the user hovers near the cat or on its active card. */
  notifyCardHover() {
    if (this.isClickBusy || !this.sim.isIdle) return;
    this.sim.play(Math.random() < 0.5 ? 'lookFront' : 'swipe');
  }

  update(dt: number, reg: LedgeRegistry, scrollY: number) {
    this.decisionCooldown = Math.max(0, this.decisionCooldown - dt);

    // Track scroll velocity (px/s), decaying quickly when scroll stops
    const dScroll = scrollY - this.lastScrollY;
    this.lastScrollY = scrollY;
    const instVel = Math.abs(dScroll) / Math.max(dt, 0.008);
    if (Math.abs(dScroll) < 1.5) {
      this.scrollVelocity *= 0.25;
    } else {
      this.scrollVelocity = this.scrollVelocity * 0.55 + instVel * 0.45;
    }

    // 1. Handle ~1-second delayed catch-up entry after a fast scroll
    if (this.catchUpState) {
      // Keep parked completely off-screen laterally so it never shows on blank pixels
      this.sim.x = -220;
      this.sim.y = scrollY + reg.viewportH * 0.4;

      if (this.scrollVelocity > 520) {
        this.catchUpState.timer = 0;
      } else {
        this.catchUpState.timer += dt;
      }

      if (this.catchUpState.timer >= 0.90) {
        const dir = this.catchUpState.dir;
        this.catchUpState = null;
        this.performCatchUpEntry(reg, scrollY, dir);
      }

      this.sim.update(dt);
      return;
    }

    // 2. Detect if user scrolled so fast that the cat was left far off-screen
    const refY = this.targetLedge ? this.targetLedge.y : this.sim.y;
    const offAbove = this.sim.y < scrollY - 190 && refY < scrollY - 120;
    const offBelow =
      this.sim.y > scrollY + reg.viewportH + 190 &&
      refY > scrollY + reg.viewportH + 120;

    if (offAbove || offBelow) {
      const dir: 'above' | 'below' = offAbove ? 'above' : 'below';
      this.currentLedge = null;
      this.targetLedge = null;
      this.isClickBusy = false;
      this.catchUpState = { dir, timer: 0 };
      this.sim.teleport(-220, scrollY + reg.viewportH * 0.4, 1, 'crouch');
      this.sim.update(dt);
      return;
    }

    // 3. Keep Y synced if the ledge moved slightly due to layout/accordion resize
    if (this.currentLedge && !this.sim.isJumping && !this.sim.isMoving) {
      const updated = reg.ledges.find((l) => l.id === this.currentLedge!.id);
      if (updated) {
        this.currentLedge = updated;
        this.sim.y = updated.y;
        this.darkSurface = updated.surface === 'dark';
      }
    }

    // 4. Normal scroll: continuously hop to the best ledge in the viewport
    if (this.decisionCooldown <= 0 && !this.sim.isJumping) {
      const best = this.pickBestLedge(reg, scrollY);
      if (best && (!this.currentLedge || best.id !== this.currentLedge.id)) {
        this.sim.stopMoving();
        this.decisionCooldown = 0.18;
        this.stepTowardLedge(reg, best);
      }
    }

    // 5. Autonomous idle behaviors while perched (short intervals between animations)
    if (this.sim.isIdle && !this.isClickBusy && this.currentLedge) {
      this.idleTimer += dt;

      // In Process ('stepping') section, occasionally hop to an adjacent process step ledge
      if (
        this.currentLedge.behavior === 'stepping' &&
        this.idleTimer > 2.2 &&
        this.decisionCooldown <= 0
      ) {
        const siblings = reg.ledges.filter(
          (l) =>
            l.behavior === 'stepping' &&
            l.id !== this.currentLedge!.id &&
            Math.abs(l.y - this.currentLedge!.y) < 180,
        );
        const unvisited = siblings.filter((s) => !this.stepVisitedIds.has(s.id));
        const nextStep = (unvisited.length ? unvisited : siblings)[0];
        if (nextStep) {
          this.stepVisitedIds.add(nextStep.id);
          if (this.stepVisitedIds.size > 4) this.stepVisitedIds.clear();
          this.decisionCooldown = 2.2;
          this.idleTimer = 0;
          this.moveToLedge(nextStep);
          this.sim.update(dt);
          return;
        }
      }

      if (this.idleTimer >= this.nextIdleActionIn) {
        this.nextIdleActionIn = this.idleTimer + 0.95 + Math.random() * 0.85;
        const pool: ActionName[] =
          this.currentLedge.behavior === 'stalk'
            ? ['lookFront', 'swipe', 'wiggle', 'tailFlick', 'lookAround', 'lookFront', 'groom']
            : [
                'lookFront',
                'groom',
                'yawn',
                'lookAround',
                'tailFlick',
                'sniff',
                'swipe',
                'wiggle',
                'lookFront',
              ];
        const pick = pool[Math.floor(Math.random() * pool.length)];

        // 18% chance to take a short stroll along the current ledge if wide enough
        const span = this.currentLedge.xEnd - this.currentLedge.xStart;
        if (span > 220 && Math.random() < 0.18) {
          const nx =
            this.currentLedge.xStart + 44 + Math.random() * Math.max(20, span - 88);
          if (Math.abs(nx - this.sim.x) > 55) {
            this.sim.walkTo(nx, {
              speed: GAIT_SPEED.walk * 0.9,
              stealth: this.currentLedge.behavior === 'stalk',
              onArrive: () => {
                this.sim.setPosture('sit');
                this.sim.play('lookFront');
              },
            });
          } else {
            if (!this.sim.play(pick)) {
              this.nextIdleActionIn = this.idleTimer + 0.25;
            }
          }
        } else {
          if (!this.sim.play(pick)) {
            this.nextIdleActionIn = this.idleTimer + 0.25;
          }
        }
      }
    }

    this.sim.update(dt);
  }
}
