import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type TimerStatus = 'idle' | 'running' | 'paused' | 'finished';

type UseTimerParams = {
  durationMs: number;
  tickMs?: number;
};

type UseTimerApi = {
  status: TimerStatus;
  durationMs: number;
  elapsedMs: number;
  remainingMs: number;
  progress: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function useTimer(params: UseTimerParams): UseTimerApi {
  const { durationMs, tickMs = 100 } = params;

  const [elapsedMs, setElapsedMs] = useState(0);
  const [status, setStatus] = useState<TimerStatus>('idle');

  const intervalIdRef = useRef<number | null>(null);
  const startedAtRef = useRef<number | null>(null);
  const accumulatedMsRef = useRef(0);

  const clear = useCallback(() => {
    if (intervalIdRef.current !== null) {
      window.clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  }, []);

  const recomputeElapsed = useCallback(() => {
    if (durationMs <= 0) {
      startedAtRef.current = null;
      accumulatedMsRef.current = 0;
      clear();
      setElapsedMs(0);
      setStatus('idle');
      return;
    }

    const startedAt = startedAtRef.current;
    const base = accumulatedMsRef.current;
    const now = Date.now();
    const extra = startedAt === null ? 0 : now - startedAt;
    const next = Math.min(durationMs, base + extra);
    setElapsedMs(next);

    if (next >= durationMs) {
      accumulatedMsRef.current = durationMs;
      startedAtRef.current = null;
      clear();
      setStatus('finished');
    }
  }, [clear, durationMs]);

  const start = useCallback(() => {
    if (durationMs <= 0) return;

    setStatus((prev) => {
      if (prev === 'finished') {
        accumulatedMsRef.current = 0;
        setElapsedMs(0);
      }
      return 'running';
    });

    if (startedAtRef.current === null) {
      startedAtRef.current = Date.now();
    }

    clear();
    intervalIdRef.current = window.setInterval(recomputeElapsed, tickMs);
    recomputeElapsed();
  }, [clear, durationMs, recomputeElapsed, tickMs]);

  const pause = useCallback(() => {
    if (status !== 'running') return;

    const startedAt = startedAtRef.current;
    if (startedAt !== null) {
      accumulatedMsRef.current = Math.min(
        durationMs,
        accumulatedMsRef.current + (Date.now() - startedAt),
      );
    }
    startedAtRef.current = null;
    clear();
    setElapsedMs(accumulatedMsRef.current);
    setStatus(accumulatedMsRef.current >= durationMs ? 'finished' : 'paused');
  }, [clear, durationMs, status]);

  const reset = useCallback(() => {
    startedAtRef.current = null;
    accumulatedMsRef.current = 0;
    clear();
    setElapsedMs(0);
    setStatus('idle');
  }, [clear]);

  useEffect(() => {
    return () => clear();
  }, [clear]);

  const clampedElapsedMs = Math.min(elapsedMs, durationMs);
  const remainingMs = Math.max(0, durationMs - clampedElapsedMs);
  const progress = useMemo(() => {
    if (durationMs <= 0) return 0;
    return clamp01(clampedElapsedMs / durationMs);
  }, [clampedElapsedMs, durationMs]);

  return {
    status,
    durationMs,
    elapsedMs: clampedElapsedMs,
    remainingMs,
    progress,
    isRunning: status === 'running',
    start,
    pause,
    reset,
  };
}
