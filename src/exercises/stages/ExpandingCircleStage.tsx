import type { ExerciseStageProps } from '@/exercises/types';
import { ExpandingCircle } from '@/exercises/renderers/ExpandingCircle';

export function ExpandingCircleStage(props: ExerciseStageProps) {
  return <ExpandingCircle {...props} />;
}
