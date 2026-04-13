import type { ExercisePreviewProps } from '@/exercises/types';

export function RandomSmoothPreview(props: ExercisePreviewProps) {
  const { isActive } = props;

  return (
    <div
      className="preview"
      data-active={isActive ? 'true' : 'false'}
      data-variant="random-smooth"
    >
      <div className="previewDot" />
    </div>
  );
}
