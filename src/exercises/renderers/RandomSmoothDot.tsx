import { useEffect, useMemo, useRef } from 'react';

import { useAnimationFrame } from '@/hooks/useAnimationFrame';
import { easeInOutSine, lerp } from '@/exercises/motion';

type Props = {
  isRunning: boolean;
  resetKey: number;
};

type Vec2 = { x: number; y: number };

function randomPoint(max: number): Vec2 {
  return { x: (Math.random() * 2 - 1) * max, y: (Math.random() * 2 - 1) * max };
}

export function RandomSmoothDot(props: Props) {
  const { isRunning, resetKey } = props;

  const dotRef = useRef<HTMLDivElement | null>(null);
  const segMsRef = useRef(0);
  const fromRef = useRef<Vec2>({ x: 0, y: 0 });
  const toRef = useRef<Vec2>({ x: 0, y: 0 });

  const segmentMs = useMemo(() => 1400, []);
  const max = 88;

  const apply = (p: Vec2) => {
    const el = dotRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
  };

  const step = (t01: number) => {
    const u = easeInOutSine(t01);
    const x = lerp(fromRef.current.x, toRef.current.x, u);
    const y = lerp(fromRef.current.y, toRef.current.y, u);
    apply({ x, y });
  };

  useEffect(() => {
    segMsRef.current = 0;
    fromRef.current = { x: -max, y: 0 };
    toRef.current = randomPoint(max);
    step(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  useAnimationFrame({
    enabled: isRunning,
    onFrame: ({ deltaMs }) => {
      segMsRef.current += deltaMs;
      if (segMsRef.current >= segmentMs) {
        segMsRef.current = segMsRef.current % segmentMs;
        fromRef.current = toRef.current;
        toRef.current = randomPoint(max);
      }
      step(segMsRef.current / segmentMs);
    },
  });

  return (
    <div className="stage" aria-label="Exercise stage">
      <div className="stageBounds">
        <div ref={dotRef} className="dot" />
      </div>
    </div>
  );
}
