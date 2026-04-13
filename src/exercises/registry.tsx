import type { ExerciseDefinition, ExerciseId } from '@/exercises/types';
import { ExpandingCirclePreview } from '@/exercises/previews/ExpandingCirclePreview';
import { FigureEightPreview } from '@/exercises/previews/FigureEightPreview';
import { FocusPreview } from '@/exercises/previews/FocusPreview';
import { MovingDotPreview } from '@/exercises/previews/MovingDotPreview';
import { RandomSmoothPreview } from '@/exercises/previews/RandomSmoothPreview';
import { ExpandingCircleStage } from '@/exercises/stages/ExpandingCircleStage';
import { FigureEightStage } from '@/exercises/stages/FigureEightStage';
import { FocusStage } from '@/exercises/stages/FocusStage';
import { MovingDotStage } from '@/exercises/stages/MovingDotStage';
import { RandomSmoothStage } from '@/exercises/stages/RandomSmoothStage';

export const EXERCISES: readonly ExerciseDefinition[] = [
  {
    id: 'dot-left-right',
    title: 'Moving dot: left → right',
    description: 'Follow the dot with your eyes. Keep your head still.',
    defaultDurationMs: 60_000,
    Stage: (props) => <MovingDotStage {...props} variant="dot-left-right" />,
    Preview: (props) => <MovingDotPreview {...props} variant="dot-left-right" />,
  },
  {
    id: 'dot-up-down',
    title: 'Moving dot: up ↕ down',
    description: 'Move only your eyes. Relax your brow and jaw.',
    defaultDurationMs: 60_000,
    Stage: (props) => <MovingDotStage {...props} variant="dot-up-down" />,
    Preview: (props) => <MovingDotPreview {...props} variant="dot-up-down" />,
  },
  {
    id: 'dot-circle',
    title: 'Moving dot: circle',
    description: 'Trace slow circles with your gaze. Breathe steadily.',
    defaultDurationMs: 60_000,
    Stage: (props) => <MovingDotStage {...props} variant="dot-circle" />,
    Preview: (props) => <MovingDotPreview {...props} variant="dot-circle" />,
  },
  {
    id: 'figure-eight',
    title: 'Figure eight (∞)',
    description: 'Trace an infinity loop slowly with your gaze.',
    defaultDurationMs: 60_000,
    Stage: FigureEightStage,
    Preview: FigureEightPreview,
  },
  {
    id: 'focus',
    title: 'Focus (near ↔ far)',
    description: 'Let the dot grow and shrink; softly adjust your focus.',
    defaultDurationMs: 60_000,
    Stage: FocusStage,
    Preview: FocusPreview,
  },
  {
    id: 'random-smooth',
    title: 'Random smooth movement',
    description: 'Follow gentle, unpredictable motion without strain.',
    defaultDurationMs: 60_000,
    Stage: RandomSmoothStage,
    Preview: RandomSmoothPreview,
  },
  {
    id: 'expanding-circle',
    title: 'Expanding circle (peripheral)',
    description: 'Notice the edges expanding while keeping your gaze calm.',
    defaultDurationMs: 60_000,
    Stage: ExpandingCircleStage,
    Preview: ExpandingCirclePreview,
  },
] as const;

export function getExerciseById(id: string | undefined): ExerciseDefinition | null {
  if (!id) return null;
  return (EXERCISES as readonly ExerciseDefinition[]).find((e) => e.id === id) ?? null;
}

export function isExerciseId(value: string): value is ExerciseId {
  return (EXERCISES as readonly ExerciseDefinition[]).some((e) => e.id === value);
}
