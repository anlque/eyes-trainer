import type { ExerciseStageProps } from '@/exercises/types';
import { RandomSmoothDot } from '@/exercises/renderers/RandomSmoothDot';

export function RandomSmoothStage(props: ExerciseStageProps) {
  return <RandomSmoothDot {...props} />;
}
