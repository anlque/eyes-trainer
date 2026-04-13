import { useEffect, useMemo, useRef } from 'react';

import { useAnimationFrame } from '@/hooks/useAnimationFrame';
import { easeInOutSine, pingPong01 } from '@/exercises/motion';

type Props = {
  isRunning: boolean;
  resetKey: number;
};

export function ExpandingCircle(props: Props) {
  const { isRunning, resetKey } = props;

  const ringRef = useRef<HTMLDivElement | null>(null);
  const phaseMsRef = useRef(0);

  const periodMs = useMemo(() => 3000, []);

  const apply = (phase: number) => {
    const el = ringRef.current;
    if (!el) return;

    const u = easeInOutSine(pingPong01(phase));
    const scale = 0.25 + 1.15 * u;
    const opacity = 0.15 + 0.45 * (1 - u);
    el.style.transform = `translate3d(-50%, -50%, 0) scale(${scale})`;
    el.style.opacity = String(opacity);
  };

  useEffect(() => {
    phaseMsRef.current = 0;
    apply(0);
  }, [resetKey]);

  useAnimationFrame({
    enabled: isRunning,
    onFrame: ({ deltaMs }) => {
      phaseMsRef.current += deltaMs;
      apply(phaseMsRef.current / periodMs);
    },
  });

  return (
    <div className="stage" aria-label="Exercise stage">
      <div className="stageBounds">
        <div ref={ringRef} className="ring" />
      </div>
    </div>
  );
}
