import { useEffect, useMemo, useRef } from 'react';

import { useAnimationFrame } from '@/hooks/useAnimationFrame';
import { wrap } from '@/exercises/motion';

type Props = {
  isRunning: boolean;
  resetKey: number;
};

export function FigureEightDot(props: Props) {
  const { isRunning, resetKey } = props;

  const dotRef = useRef<HTMLDivElement | null>(null);
  const phaseMsRef = useRef(0);

  useEffect(() => {
    phaseMsRef.current = 0;
  }, [resetKey]);

  const periodMs = useMemo(() => 4200, []);

  const apply = (phase: number) => {
    const el = dotRef.current;
    if (!el) return;

    const t = 2 * Math.PI * wrap(phase);
    const max = 86;
    
    const x = Math.sin(t) * max;
    const y = Math.sin(2 * t) * (max * 0.55);
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  useAnimationFrame({
    enabled: isRunning,
    onFrame: ({ deltaMs }) => {
      phaseMsRef.current += deltaMs;
      apply(phaseMsRef.current / periodMs);
    },
  });

  useEffect(() => {
    phaseMsRef.current = 0;
    apply(0);
  }, [resetKey]);

  return (
    <div className="stage" aria-label="Exercise stage">
      <div className="stageBounds">
        <div ref={dotRef} className="dot" />
      </div>
    </div>
  );
}
