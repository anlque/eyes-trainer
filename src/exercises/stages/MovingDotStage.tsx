import type { ExerciseId } from '@/exercises/types';
import type { ExerciseStageProps } from '@/exercises/types';
import { MovingDot } from '@/exercises/renderers/MovingDot';

type MovingDotVariant = Extract<
  ExerciseId,
  'dot-left-right' | 'dot-up-down' | 'dot-circle'
>;

type Props = ExerciseStageProps & {
  variant: MovingDotVariant;
};

export function MovingDotStage(props: Props) {
  const { variant, isRunning, resetKey } = props;
  return <MovingDot variant={variant} isRunning={isRunning} resetKey={resetKey} />;
}
