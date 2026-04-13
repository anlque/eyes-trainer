import type { ExercisePreviewProps } from '@/exercises/types';

export function FocusPreview(props: ExercisePreviewProps) {
  const { isActive } = props;

  return (
    <div
      className="preview"
      data-active={isActive ? 'true' : 'false'}
      data-variant="focus"
    >
      <div className="previewDot previewDotFocus" />
    </div>
  );
}
