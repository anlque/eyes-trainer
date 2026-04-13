import { useEffect, useMemo, useRef } from 'react';

import { useAnimationFrame } from '@/hooks/useAnimationFrame';
import type { ExerciseId } from '@/exercises/types';
import { easeInOutSine, pingPong, wrap } from '@/exercises/motion';

type MovingDotVariant = Extract<
  ExerciseId,
  'dot-left-right' | 'dot-up-down' | 'dot-circle'
>;

type Props = {
  variant: MovingDotVariant;
  isRunning: boolean;
  resetKey: number;
};

export function MovingDot(props: Props) {
  const { variant, isRunning, resetKey } = props;

  const dotRef = useRef<HTMLDivElement | null>(null);
  const phaseMsRef = useRef(0);

  useEffect(() => {
    phaseMsRef.current = 0;
  }, [resetKey, variant]);

  const config = useMemo(() => {
    switch (variant) {
      case 'dot-left-right':
        return { kind: 'line' as const, axis: 'x' as const, periodMs: 2400 };
      case 'dot-up-down':
        return { kind: 'line' as const, axis: 'y' as const, periodMs: 2400 };
      case 'dot-circle':
        return { kind: 'circle' as const, periodMs: 3600 };
      default: {
        const _exhaustive: never = variant;
        return _exhaustive;
      }
    }
  }, [variant]);

  const applyTransformForPhase = (phase: number) => {
    const el = dotRef.current;
    if (!el) return;

    const max = 88;

    if (config.kind === 'line') {
      const u = easeInOutSine(pingPong(phase));
      const p = -max + 2 * max * u;
      const x = config.axis === 'x' ? p : 0;
      const y = config.axis === 'y' ? p : 0;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      return;
    }

    const a = 2 * Math.PI * wrap(phase);
    const x = Math.cos(a) * max;
    const y = Math.sin(a) * max;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  useAnimationFrame({
    enabled: isRunning,
    onFrame: ({ deltaMs }) => {
      // Delta-based phase avoids jumps when pausing/resuming.
      phaseMsRef.current += deltaMs;
      const phase = phaseMsRef.current / config.periodMs;
      applyTransformForPhase(phase);
    },
  });

  useEffect(() => {
    // Ensure initial placement matches where the animation starts.
    phaseMsRef.current = 0;
    applyTransformForPhase(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey, variant, config.kind]);

  return (
    <div className="stage" aria-label="Exercise stage">
      <div className="stageBounds">
        <div ref={dotRef} className="dot" />
      </div>
    </div>
  );
}
