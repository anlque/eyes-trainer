import { Link } from 'react-router-dom';

import type { ExerciseDefinition } from '@/exercises/types';

type Props = {
  exercise: ExerciseDefinition;
  isActive: boolean;
  onActivate: (exerciseId: string) => void;
  onDeactivate: () => void;
  to?: string;
};

export function ExerciseCard(props: Props) {
  const { exercise, isActive, onActivate, onDeactivate, to } = props;
  const Preview = exercise.Preview;

  return (
    <Link
      className="exerciseCard"
      to={to ?? `/exercise/${exercise.id}`}
      onMouseEnter={() => onActivate(exercise.id)}
      onMouseLeave={onDeactivate}
      onFocus={() => onActivate(exercise.id)}
      onBlur={onDeactivate}
    >
      <div className="exerciseCardTop">
        <div className="exercisePreviewWrap">
          {Preview ? <Preview isActive={isActive} /> : <div className="preview" />}
        </div>
      </div>

      <div className="exerciseCardBody">
        <div className="exerciseCardTitle">
          {exercise.title}
          <span className="pill">{Math.round(exercise.defaultDurationMs / 1000)}s</span>
        </div>
        <div className="exerciseCardDescription">{exercise.description}</div>
      </div>
    </Link>
  );
}
