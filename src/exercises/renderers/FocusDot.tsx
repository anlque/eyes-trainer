import { useEffect, useMemo, useRef } from 'react';

import { useAnimationFrame } from '@/hooks/useAnimationFrame';
import { easeInOutSine, pingPong } from '@/exercises/motion';

type Props = {
  isRunning: boolean;
  resetKey: number;
};

export function FocusDot(props: Props) {
  const { isRunning, resetKey } = props;

  const dotRef = useRef<HTMLDivElement | null>(null);
  const phaseMsRef = useRef(0);

  const periodMs = useMemo(() => 2400, []);

  const apply = (phase: number) => {
    const el = dotRef.current;
    if (!el) return;

    const u = easeInOutSine(pingPong(phase));
    const minScale = 0.65;
    const maxScale = 1.55;
    const s = minScale + (maxScale - minScale) * u;
    el.style.transform = `translate3d(0, 0, 0) scale(${s})`;
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
      <div className="stageBounds stageCenter">
        <div ref={dotRef} className="dot" />
      </div>
    </div>
  );
}
