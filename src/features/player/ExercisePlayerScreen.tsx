import { Link, useParams } from 'react-router-dom';

import { getExerciseById } from '@/exercises/registry';
import { ExercisePlayerView } from '@/features/player/ExercisePlayerView';
import { useExercisePlayerController } from '@/features/player/useExercisePlayerController';

export function ExercisePlayerScreen() {
  const params = useParams();
  const exercise = getExerciseById(params.exerciseId);
  const controller = useExercisePlayerController(exercise);

  if (!exercise) {
    return (
      <main className="screen">
        <section className="exercisePlayerCard">
          <p className="muted">Exercise not found.</p>
          <div className="actionsRow">
            <Link className="button" to="/exercises">
              Back to exercises
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return <ExercisePlayerView exercise={exercise} controller={controller} />;
}
