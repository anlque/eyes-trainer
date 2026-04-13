import type { ExerciseStageProps } from '@/exercises/types';
import { FigureEightDot } from '@/exercises/renderers/FigureEightDot';

export function FigureEightStage(props: ExerciseStageProps) {
  return <FigureEightDot {...props} />;
}
