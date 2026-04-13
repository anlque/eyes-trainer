import { useEffect, useMemo, useRef } from 'react';

import { useAnimationFrame } from '@/hooks/useAnimationFrame';

type Props = {
  isRunning: boolean;
  resetKey: number;
};

type Vec2 = { x: number; y: number };

function pickPoint(max: number): Vec2 {
  const x = (Math.random() * 2 - 1) * max;
  const y = (Math.random() * 2 - 1) * max;
  return { x, y };
}

export function SaccadesDot(props: Props) {
  const { isRunning, resetKey } = props;

  const dotRef = useRef<HTMLDivElement | null>(null);
  const sinceJumpMsRef = useRef(0);
  const posRef = useRef<Vec2>({ x: 0, y: 0 });

  const jumpEveryMs = useMemo(() => 520, []);
  const max = 92;

  const apply = () => {
    const el = dotRef.current;
    if (!el) return;
    const { x, y } = posRef.current;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  useEffect(() => {
    sinceJumpMsRef.current = 0;
    posRef.current = { x: -max, y: 0 };
    apply();
  }, [resetKey]);

  useAnimationFrame({
    enabled: isRunning,
    onFrame: ({ deltaMs }) => {
      sinceJumpMsRef.current += deltaMs;
      if (sinceJumpMsRef.current < jumpEveryMs) return;
      sinceJumpMsRef.current = 0;
      posRef.current = pickPoint(max);
      apply();
    },
  });

  return (
    <div className="stage" aria-label="Exercise stage">
      <div className="stageBounds">
        <div ref={dotRef} className="dot dotSaccade" />
      </div>
    </div>
  );
}
