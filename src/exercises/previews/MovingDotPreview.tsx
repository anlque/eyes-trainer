import type { ExerciseId, ExercisePreviewProps } from '@/exercises/types';

type Variant = Extract<ExerciseId, 'dot-left-right' | 'dot-up-down' | 'dot-circle'>;

type Props = ExercisePreviewProps & {
  variant: Variant;
};

export function MovingDotPreview(props: Props) {
  const { variant, isActive } = props;

  return (
    <div
      className="preview"
      data-active={isActive ? 'true' : 'false'}
      data-variant={variant}
    >
      <div className="previewDot" />
    </div>
  );
}
