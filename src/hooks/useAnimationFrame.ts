import { useEffect, useRef } from 'react';

type FrameCallback = (params: { timeMs: number; deltaMs: number }) => void;

type UseAnimationFrameParams = {
  enabled: boolean;
  onFrame: FrameCallback;
};

export function useAnimationFrame(params: UseAnimationFrameParams) {
  const { enabled, onFrame } = params;

  const onFrameRef = useRef(onFrame);
  const rafIdRef = useRef<number | null>(null);
  const prevTimeRef = useRef<number | null>(null);

  useEffect(() => {
    onFrameRef.current = onFrame;
  }, [onFrame]);

  useEffect(() => {
    if (!enabled) {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
      prevTimeRef.current = null;
      return;
    }

    const loop = (timeMs: number) => {
      const prev = prevTimeRef.current;
      const deltaMs = prev === null ? 0 : timeMs - prev;
      prevTimeRef.current = timeMs;
      onFrameRef.current({ timeMs, deltaMs });
      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
      prevTimeRef.current = null;
    };
  }, [enabled]);
}
