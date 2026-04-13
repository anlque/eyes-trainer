import { Link } from 'react-router-dom';

import { formatMs } from '@/utils/time';
import type { ExerciseDefinition } from '@/exercises/types';
import type { ExercisePlayerController } from '@/features/player/useExercisePlayerController';

type Props = {
  exercise: ExerciseDefinition;
  controller: ExercisePlayerController;
};

export function ExercisePlayerView(props: Props) {
  const { exercise, controller } = props;
  const { timer } = controller;

  return (
    <main className="screen screenPlayer">
      <header className="screenHeader">
        <div className="headerRow">
          <Link className="button buttonGhost" to="/exercises">
            ← Exercises
          </Link>
          <span className="pill">{Math.round(exercise.defaultDurationMs / 1000)}s</span>
        </div>

        <h1 className="screenTitle">{exercise.title}</h1>
        <p className="screenSubtitle">{exercise.description}</p>
      </header>

      <section className="exercisePlayerCard">
        <exercise.Stage isRunning={timer.isRunning} resetKey={controller.resetKey} />

        <div className="playerTopRow">
          <div className="timeStack">
            <div className="timeLabel">Remaining</div>
            <div className="timeValue">{formatMs(timer.remainingMs)}</div>
          </div>
          <div className="timeStack timeStackRight">
            <div className="timeLabel">Elapsed</div>
            <div className="timeValue">{formatMs(timer.elapsedMs)}</div>
          </div>
        </div>

        <div
          className="progressTrack"
          role="progressbar"
          aria-label="Exercise progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(timer.progress * 100)}
        >
          <div className="progressFill" style={{ width: `${timer.progress * 100}%` }} />
        </div>

        <div className="actionsRow">
          <button
            className="button buttonPrimary"
            type="button"
            onClick={controller.startOrPauseOrRestart}
          >
            {controller.primaryActionLabel}
          </button>
          <button
            className="button"
            type="button"
            onClick={controller.reset}
            disabled={timer.status === 'idle' && timer.elapsedMs === 0}
          >
            Reset
          </button>
        </div>

        {timer.status === 'finished' ? (
          <p className="muted statusLine">Nice. Take a slow blink and relax your gaze.</p>
        ) : null}
      </section>
    </main>
  );
}
