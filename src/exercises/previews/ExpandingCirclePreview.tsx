import type { ExercisePreviewProps } from '@/exercises/types';

export function ExpandingCirclePreview(props: ExercisePreviewProps) {
  const { isActive } = props;

  return (
    <div
      className="preview"
      data-active={isActive ? 'true' : 'false'}
      data-variant="expanding-circle"
    >
      <div className="previewRing" />
    </div>
  );
}
