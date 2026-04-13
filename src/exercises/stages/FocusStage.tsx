import type { ExerciseStageProps } from '@/exercises/types';
import { FocusDot } from '@/exercises/renderers/FocusDot';

export function FocusStage(props: ExerciseStageProps) {
  return <FocusDot {...props} />;
}
