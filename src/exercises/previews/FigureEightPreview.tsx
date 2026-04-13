import type { ExercisePreviewProps } from '@/exercises/types';

export function FigureEightPreview(props: ExercisePreviewProps) {
  const { isActive } = props;

  return (
    <div
      className="preview"
      data-active={isActive ? 'true' : 'false'}
      data-variant="figure-eight"
    >
      <div className="previewDot" />
    </div>
  );
}
