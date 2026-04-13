import { useCallback, useState } from 'react';

import type { ExerciseDefinition } from '@/exercises/types';
import { useTimer } from '@/hooks/useTimer';

export type ExercisePlayerController = {
  timer: ReturnType<typeof useTimer>;
  resetKey: number;
  primaryActionLabel: 'Start' | 'Pause' | 'Restart';
  startOrPauseOrRestart: () => void;
  reset: () => void;
};

export function useExercisePlayerController(exercise: ExerciseDefinition | null) {
  const [resetKey, setResetKey] = useState(0);
  const timer = useTimer({ durationMs: exercise?.defaultDurationMs ?? 0, tickMs: 100 });

  const primaryActionLabel: ExercisePlayerController['primaryActionLabel'] =
    timer.isRunning ? 'Pause' : timer.status === 'finished' ? 'Restart' : 'Start';

  const reset = useCallback(() => {
    timer.reset();
    setResetKey((k) => k + 1);
  }, [timer]);

  const startOrPauseOrRestart = useCallback(() => {
    if (timer.isRunning) {
      timer.pause();
      return;
    }

    if (timer.status === 'finished') {
      reset();
    }

    timer.start();
  }, [reset, timer]);

  return {
    timer,
    resetKey,
    primaryActionLabel,
    startOrPauseOrRestart,
    reset,
  } satisfies ExercisePlayerController;
}
