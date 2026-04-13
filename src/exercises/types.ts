import type { ComponentType } from 'react';

export type ExerciseId =
  | 'dot-left-right'
  | 'dot-up-down'
  | 'dot-circle'
  | 'figure-eight'
  | 'focus'
  | 'random-smooth'
  | 'expanding-circle';

export type ExerciseStageProps = {
  isRunning: boolean;
  resetKey: number;
};

export type ExercisePreviewProps = {
  isActive?: boolean;
};

export type ExerciseDefinition = {
  id: ExerciseId;
  title: string;
  description: string;
  defaultDurationMs: number;
  Stage: ComponentType<ExerciseStageProps>;
  Preview?: ComponentType<ExercisePreviewProps>;
};
